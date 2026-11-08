'use strict';
// V46 · màu nhấn theo chiến cơ, nhãn +N, tia sáng dịu · V43 · SẢNH NÂNG CẤP CCHT (module Gemini "Sanh_Nang_Cap_CCHT_V4") — đã tích hợp vào game:
//  • giữ nguyên khung #ccht-lobby-root và các lớp CSS của bản thiết kế (chỉ đặt phạm vi, thêm lớp phủ toàn màn);
//  • SSS_SETS dựng từ dữ liệu THẬT của người chơi: chiến cơ SSS sở hữu (Fusion) + chiến cơ thường + 3 trang bị đang lắp (Progress);
//    khi có GEAR_FX (hệ trang bị SSS mới) thì ô trang bị đọc thêm bậc/tên SSS từ GEAR_FX;
//  • tài nguyên, lực chiến, 4 thanh chỉ số lấy từ save (Workshop / Progress / Meta407 / Combat), không có nút "+" cộng tài nguyên miễn phí;
//  • TRỞ VỀ → phát sự kiện "ccht:lobby-close" → ẩn sảnh, chọn bộ đang xem và vào thẳng màn bắn máy bay.
(()=>{
 const TAU=Math.PI*2,$=id=>document.getElementById(id);
 const busy=()=>['play','pause','reward'].includes(mode);
 const fmt=n=>Math.round(n||0).toLocaleString('vi-VN');
 const quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 let wrap,root,canvas,ctx,raf=0,tick=0,last=0,SSS_SETS=[];
 const state={setIndex:0,selectedSlot:0,ultFlash:0,floatingTexts:[],power:0,scoreBonus:0};
 const stars=Array.from({length:55},()=>({x:Math.random(),y:Math.random(),s:.6+Math.random()*1.8,spd:.4+Math.random()*1.5}));

 // ================= dữ liệu thật =================
 function equipped(){try{const P=Progress.getState(),o={};for(const k of Progress.kinds)o[k]=P.items.find(x=>x.id===P.equipped[k])||null;return o;}catch{return {};}}
 function gearSSS(it){try{if(it&&typeof Gear44!=='undefined'){const d=Gear44.activeDef(it.kind);if(d)return d;}}catch{}return null;}
 function selectedKey(){try{const r=Fusion.getSelected();if(r&&r.super)return r.key;}catch{}return 'craft:'+launchCraft;}
 function buildSets(){const out=[];let supers=[];try{supers=Fusion.getState().supers||[];}catch{}
  for(const q of supers){const M=SSS_MODELS[q.model];if(!M)continue;out.push({key:q.key,sss:true,model:q.model,title:M.name,primary:M.color,secondary:M.second||M.color,beamColor:M.second||M.color,lightningColor:M.color,ult:M.ult,rec:q});}
  for(let i=0;i<10;i++){if(!Campaign36.ownsCraft(i))continue;const P=Fighters28.profiles[i]||{};out.push({key:'craft:'+i,sss:false,craft:i,title:crafts[i].name,primary:P.color||'#38bdf8',secondary:P.color2||'#a855f7',beamColor:P.color||'#e879f9',lightningColor:'#facc15'});}
  return out;}
 function statsNow(){let main=0,hp=0,mis=0,side=0,cp=0,dmg=0;try{const r=Fusion.getSelected(),v=r||Workshop.craftProgress(launchCraft),gs=Progress.stats();
   main=12*Workshop.factor(v.grade)*Workshop.levelFactor(v)*Campaign36.rate(v.grade)*(r?1.25:1)*.81*24;
   for(const it of gs.auxiliary||[]){let d=it.auxDamage*it.spec.count/it.interval*.81*24;try{d*=Gear44.dmgMult(it.kind);}catch{}if(it.kind==='missiles')mis+=d;else side+=d;}
   const s=Combat.stats();hp=s.hp*55+s.armor*65;cp=s.cp;dmg=Math.round((gs.damage-1)*100);}catch{}return {main,hp,mis,side,cp,dmg};}
 // chọn bộ trong game thật (chiến cơ SSS hoặc chiến cơ thường) — trang bị Giáp/Tên lửa/Tàu con dùng chung kho của người chơi
 function applySet(set){if(!set||busy())return false;try{if(set.sss){Fusion.select(set.key);}else{if(Fusion.getSelected())Fusion.select(null);selectCraft(set.craft);}}catch(e){return false;}
  try{if(typeof Hangar41!=='undefined')Hangar41.paint(true);}catch{}return true;}

 // ================= ảnh =================
 let sssAtlas=null;const cache={};
 function sssImg(i,row){if(!sssAtlas){sssAtlas=new Image();sssAtlas.src=SSS_ATLAS;}const im=sssAtlas;if(!im.complete||!im.naturalWidth)return null;const k='s'+i+row;if(cache[k])return cache[k];const cw=im.naturalWidth/7,ch=im.naturalHeight/2,c=document.createElement('canvas');c.width=c.height=360;c.getContext('2d').drawImage(im,i*cw,row*ch,cw,ch,0,0,360,360);return cache[k]=c;}
 function craftImg(i){let im=null,cell=true;try{if(window.Ship83&&Ship83.isNew(i)){im=Ship83.hull(i,false);cell=false;}else if(typeof Evo53!=='undefined'&&Evo53.hull)im=Evo53.hull(i);}catch{}if(!im||!(im.naturalWidth||im.width)){im=fighterAtlasV22;cell=true;}if(!im||!(im.naturalWidth||im.width))return null;const k='c'+i,o=cache[k];if(o&&o.__src===im)return o;const W0=im.naturalWidth||im.width,H0=im.naturalHeight||im.height,c=document.createElement('canvas');c.width=c.height=300;const g=c.getContext('2d');if(cell){const w=W0/5,h=H0/4;g.drawImage(im,i%5*w,Math.floor(i/5)*h,w,h,0,0,300,300);}else g.drawImage(im,0,0,300,300);c.__src=im;return cache[k]=c;}/* V129: sảnh dùng tranh tàu mới */
 function thumb(set){const im=set.sss?sssImg(set.model,0):craftImg(set.craft);return im?im.toDataURL('image/webp',.85):'';}

 // ================= giao diện (giữ cấu trúc DOM của bản Gemini) =================
 const NAV=[['daily','📅','ĐIỂM DANH'],['missions','📋','NHIỆM VỤ'],['tower','🗼','THÁP BOSS'],['ach','🏆','THÀNH TỰU'],['chest','🎁','KHO BÁU']];
 function build(){
  wrap=document.createElement('div');wrap.id='ccht-lobby-wrap';wrap.hidden=true;
  wrap.innerHTML=`<div id="ccht-lobby-root" role="dialog" aria-label="Sảnh nâng cấp chiến cơ">
  <div class="top-status-bar">
   <div class="score-box"><div class="score-line">ĐIỂM: <span id="ui-score-bonus">+0%</span></div><div class="power-line">LỰC CHIẾN: <span id="ui-total-power">0</span></div></div>
   <div class="res-pill" title="Đá nâng cấp"><span style="color:#facc15">💠</span><span class="res-energy" id="ui-stamina">0</span><div class="plus-btn" data-cc="farm" aria-label="Kiếm đá">+</div></div>
   <div class="res-pill" title="Hợp kim"><span>🪙</span><span class="res-val gold" id="ui-gold">0</span><div class="plus-btn" data-cc="farm" aria-label="Kiếm hợp kim">+</div></div>
   <div class="res-pill" title="Lõi Siêu Hợp"><span>💎</span><span class="res-val" id="ui-diamond">0</span><div class="plus-btn" data-cc="tower" aria-label="Kiếm lõi">+</div></div>
  </div>
  <div class="sub-nav-row">${NAV.map(([k,ic,lb])=>`<div class="nav-icon-btn" data-cc="${k}" role="button" tabindex="0"><span class="ico">${ic}</span><span class="lbl">${lb}</span><span class="badge-dot" data-dot="${k}" hidden>!</span></div>`).join('')}
   <button class="btn-khoe-top" data-cc="share">KHOE <span>➔</span></button></div>
  <div class="hangar-viewport">
   <div class="hangar-top-frame"><div class="hangar-title-plate" id="ui-set-title">Kho</div></div>
   <div class="arrow-switch left" data-cc="prev" role="button" aria-label="Bộ trước">❮</div>
   <div class="arrow-switch right" data-cc="next" role="button" aria-label="Bộ sau">❯</div>
   <canvas id="hangarCanvas" width="430" height="465"></canvas>
   <div class="v4-audit-holo"><div class="holo-title" id="holo-title">HỒ SƠ CHIẾN CƠ</div><div class="holo-line" id="holo-set-id">—</div><div class="holo-line" id="holo-l2">—</div><div class="holo-line" id="holo-l3">—</div><div class="holo-line" id="holo-dps">—</div></div>
   <div class="stats-overlay">
    ${[['fighter','Chiến cơ'],['armor','Giáp'],['missile','Vũ khí'],['wingman','Tàu con']].map(([k,l])=>`<div class="stat-row"><span class="stat-label">${l}:</span><span class="stat-num" id="stat-val-${k}">0</span><div class="stat-bar-bg"><div class="stat-bar-fill" id="stat-bar-${k}" style="width:0%"></div></div></div>`).join('')}
    <div class="pagination-dots" id="ui-dots"></div></div>
  </div>
  <div class="bottom-deck"><div class="equip-slots-row" id="ui-equip-slots"></div>
   <div class="action-buttons-row"><button class="mech-btn side" data-cc="arsenal">KHO</button><button class="mech-btn" data-cc="upgrade">CƯỜNG HÓA<span class="badge-dot" id="cc-dot-up" style="top:-5px;right:6px;" hidden>!</span></button><button class="mech-btn" data-cc="fuse">GHÉP<span class="badge-dot" id="cc-dot-fu" style="top:-5px;right:6px;" hidden>!</span></button><button class="mech-btn side" data-cc="back">XUẤT KÍCH</button></div></div>
  <div id="lobby-toast">Thông báo</div>
  <button class="cc-x" data-cc="close" aria-label="Đóng sảnh">✕</button>
 </div>`;
  document.body.appendChild(wrap);root=$('ccht-lobby-root');canvas=$('hangarCanvas');ctx=canvas.getContext('2d');
  root.addEventListener('click',e=>{const s=e.target.closest('.equip-slot');if(s){state.selectedSlot=+s.dataset.i;renderUI();return;}const b=e.target.closest('[data-cc]');if(b)act(b.dataset.cc);});
  root.addEventListener('keydown',e=>{if(e.key==='Escape')close();if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-cc]')){e.preventDefault();act(e.target.dataset.cc);}});
  let sx=null;canvas.addEventListener('pointerdown',e=>{sx=e.clientX;});canvas.addEventListener('pointerup',e=>{if(sx!==null&&Math.abs(e.clientX-sx)>50)API.switchSet(e.clientX<sx?1:-1);else state.ultFlash=Math.max(state.ultFlash,30);sx=null;});
  window.addEventListener('ccht:lobby-close',onLobbyClose);
  // nút mở sảnh trong Kho chiến cơ V42
  const side=document.querySelector('#hgr41 .h1-side');if(side&&!side.querySelector('[data-cc-open]')){const b=document.createElement('button');b.dataset.ccOpen='1';b.textContent='SẢNH SSS';b.addEventListener('click',e=>{e.stopPropagation();API.open();});side.prepend(b);}
 }
 function renderUI(){if(!root)return;SSS_SETS=buildSets();if(!SSS_SETS.length)return;const sk=selectedKey();let k=SSS_SETS.findIndex(s=>s.key===sk);if(k<0)k=0;state.setIndex=k;
  const cur=SSS_SETS[k],st=statsNow(),eq=equipped();state.power=st.cp;state.scoreBonus=st.dmg;
  // V46: màu nhấn của skin = màu chiến cơ đang xem
  if(root.dataset.acc!==cur.primary){root.dataset.acc=cur.primary||'';root.style.setProperty('--cc-accent',/^#[0-9a-f]{3,8}$/i.test(cur.primary||'')?cur.primary:'#38bdf8');}
  const set=(id,v)=>{const e=$(id);if(e&&e.textContent!==String(v))e.textContent=v;};
  set('ui-set-title',cur.title);set('ui-total-power',fmt(st.cp));set('ui-score-bonus',(st.dmg>=0?'+':'')+st.dmg+'%');
  try{set('ui-stamina',fmt(Workshop.getState().exp));}catch{}try{set('ui-gold',fmt(Progress.balance()));}catch{}try{set('ui-diamond',fmt(Meta407.cores()));}catch{}
  // hồ sơ (thay bảng "giám định" của bản mẫu bằng thông tin thật)
  if(cur.sss){const r=cur.rec;let sn=0;try{sn=Meta407.stars(cur.model);}catch{}set('holo-title','CHIẾN CƠ SSS · '+'★'.repeat(sn)+'☆'.repeat(5-sn));set('holo-set-id','Lv.'+(r.level||1)+' · Cường hóa +'+(r.enhance||0));set('holo-l2','Hợp thể: '+(FusionBlueprints.pairs[cur.model]||[]).map(c=>crafts[c].name).join(' + '));set('holo-l3','Tuyệt kỹ: '+cur.ult);}
  else{const v=Workshop.craftProgress(cur.craft);set('holo-title','CHIẾN CƠ · BẬC '+(v.grade||'A'));set('holo-set-id','Lv.'+v.level+'/'+Workshop.cap(v)+' · Cường hóa +'+v.enhance);let w='';try{w=Fighters28.profiles[cur.craft].weapon+' · '+Core407.SCHOOLS[Core407.schoolOf(cur.craft)].name;}catch{}set('holo-l2',w||'—');set('holo-l3','Kỹ năng: Xung Hội Tụ');}
  set('holo-dps','Sát thương '+((st.dmg>=0?'+':'')+st.dmg)+'% · Lực chiến '+fmt(st.cp));
  const vals={fighter:st.main,armor:st.hp,missile:st.mis,wingman:st.side},mx=Math.max(1,...Object.values(vals))*1.08;
  for(const [kk,v] of Object.entries(vals)){set('stat-val-'+kk,fmt(v));const b=$('stat-bar-'+kk);if(b)b.style.width=Math.max(2,v/mx*100).toFixed(1)+'%';}
  const dots=$('ui-dots'),dh=SSS_SETS.map((s,i)=>`<div class="dot-diamond${i===k?' active':''}"${s.sss?' style="border-color:#fde047"':''}></div>`).join('');if(dots.innerHTML!==dh)dots.innerHTML=dh;
  // 4 ô: chiến cơ + Giáp / Tên lửa / Tàu con đang lắp
  const slots=[{type:'fighter',name:cur.title,tag:cur.sss?'SSS':(Workshop.craftProgress(cur.craft).grade||'A'),lv:cur.sss?'Lv. '+(cur.rec.level||1):'Lv. '+Workshop.craftProgress(cur.craft).level+'/'+Workshop.cap(Workshop.craftProgress(cur.craft)),pill:'+'+(cur.sss?(cur.rec.enhance||0):Workshop.craftProgress(cur.craft).enhance),pic:`<img alt="" src="${thumb(cur)}">`,key:cur.key}];
  const RK={legendary:'SS',epic:'S',rare:'A',normal:'B'};
  for(const kind of ['armor','missiles','sidearm']){const it=eq[kind],g=gearSSS(it);slots.push(it?{type:kind,name:g?g.name:(GearCatalog[it.variant]?.name||kind),tag:g&&g.tier==='sss'?'SSS':(it.grade||RK[it.rarity]||''),lv:'Lv. '+it.level+'/'+Workshop.cap(it),pill:g&&g.tier==='sss'?'+'+Gear44.sssEnh(g.id):'+'+(it.enhance||0)+((it.enhance||0)>=1?' · ghép được':''),pic:(g&&g.tier==='sss'?Gear44.slotPic(kind):'')||Progress.art(it),key:it.id+':'+it.level+':'+(it.enhance||0)+':'+(g?g.id:'')}:{type:kind,name:'Trống',tag:'',lv:'Trống',pill:'Lắp trang bị',pic:'<span class="cc-empty">＋</span>',key:'none'});}
  const wrapS=$('ui-equip-slots');if(wrapS.children.length!==4)wrapS.innerHTML=slots.map((_,i)=>`<div class="equip-slot" data-i="${i}" role="button" tabindex="0"><span class="sss-tag"></span><div class="slot-canvas-icon"></div><div class="slot-lvl"></div><div class="upgrade-pill"></div></div>`).join('');
  slots.forEach((s,i)=>{const el=wrapS.children[i];el.classList.toggle('selected',i===state.selectedSlot);el.classList.toggle('is-sss',s.tag==='SSS');el.title=s.name;el.querySelector('.sss-tag').textContent=s.tag;const ic=el.querySelector('.slot-canvas-icon');if(ic.dataset.k!==s.key){ic.dataset.k=s.key;ic.innerHTML=s.pic;}el.querySelector('.slot-lvl').textContent=s.lv;el.querySelector('.upgrade-pill').textContent=s.pill;});
  // chấm báo: lấy đúng nguồn của sảnh V42
  const tb=n=>!!document.querySelector(`#tabbar [data-tb="${n}"] .hb-dot`);$('cc-dot-up').hidden=!tb('hangar');$('cc-dot-fu').hidden=!tb('gems');
  const mir={daily:'#lb-daily i',ach:'#lb-ach i'};for(const d of root.querySelectorAll('[data-dot]')){const sel=mir[d.dataset.dot];d.hidden=!(sel&&document.querySelector(sel));}
 }
 function toast(msg){const t=$('lobby-toast');if(!t)return;t.textContent=msg;t.style.opacity='1';clearTimeout(toast.t);toast.t=setTimeout(()=>{t.style.opacity='0';},1800);}
 function tab(name){const b=document.querySelector(`#tabbar [data-tb="${name}"]`);if(b)b.click();}
 // mở một màn khác của game: ẩn sảnh trước (màn đó nằm dưới lớp phủ)
 function leave(fn){hide();try{fn();}catch{}}
 function act(k){if(busy())return;const cur=SSS_SETS[state.setIndex];switch(k){
  case 'prev':API.switchSet(-1);break;case 'next':API.switchSet(1);break;
  case 'upgrade':API.upgradeSelectedSlot();break;case 'fuse':API.triggerResonanceUlt();break;case 'share':API.triggerShowcase();break;
  case 'back':API.onBack();break;case 'close':hide();break;
  case 'arsenal':leave(()=>tab('arsenal'));break;
  case 'farm':leave(()=>{try{Hub40.openSeg('dungeon');}catch{tab('map');}});break;
  case 'tower':leave(()=>Meta40.towerPanel());break;
  case 'daily':leave(()=>Meta40.rewardsPanel('daily'));break;case 'ach':leave(()=>Meta40.rewardsPanel('ach'));break;
  case 'chest':leave(()=>{try{Hub40.openSeg('chest');}catch{tab('chests');}});break;
  case 'missions':leave(()=>{tab('map');setTimeout(()=>{const m=document.querySelector('.missions393,#missions393');if(m)m.scrollIntoView({behavior:'smooth',block:'start'});},120);});break;}}

 // ================= vẽ sân khấu (hiệu ứng của bản Gemini, chiến cơ là tranh thật trong game) =================
 function drawLightningBolt(x1,y1,x2,y2,color,width){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.shadowBlur=12;ctx.shadowColor=color;ctx.beginPath();ctx.moveTo(x1,y1);for(let i=1;i<6;i++){const t=i/6;ctx.lineTo(x1+(x2-x1)*t+(Math.random()-.5)*18,y1+(y2-y1)*t);}ctx.lineTo(x2,y2);ctx.stroke();ctx.restore();}
 function frame(ms){if(!wrap||wrap.hidden){raf=0;return;}raf=requestAnimationFrame(frame);if(document.hidden)return;tick++;
  const r=canvas.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);if(!r.width||!r.height)return;const w=Math.round(r.width*d),h=Math.round(r.height*d);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
  const W2=r.width,H2=r.height;ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,W2,H2);const cur=SSS_SETS[state.setIndex];if(!cur)return;const q=quiet();
  // nền: hành tinh + sao trôi
  const pg=ctx.createRadialGradient(55,80,10,55,80,95);pg.addColorStop(0,'#334155');pg.addColorStop(.7,'#0f172a');pg.addColorStop(1,'rgba(4,7,16,0)');ctx.fillStyle=pg;ctx.beginPath();ctx.arc(55,80,95,0,TAU);ctx.fill();
  ctx.fillStyle='#e2e8f0';for(const s of stars){if(!q){s.y+=s.spd/H2;if(s.y>1){s.y=0;s.x=Math.random();}}ctx.globalAlpha=.4+Math.sin(tick*.05+s.x*99)*.3;ctx.beginPath();ctx.arc(s.x*W2,s.y*H2,s.s,0,TAU);ctx.fill();}ctx.globalAlpha=1;
  const shipX=W2/2,size=Math.min(W2*.62,H2*.5),shipY=H2*.47+(q?0:Math.sin(tick*.05)*5),padY=shipY+size*.42;
  // bệ hologram
  ctx.save();ctx.strokeStyle=cur.primary+'55';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(shipX,padY,W2*.38,34,0,0,TAU);ctx.stroke();ctx.beginPath();ctx.ellipse(shipX,padY,W2*.26,20,0,0,TAU);ctx.stroke();ctx.restore();
  // cột năng lượng + tia song song + sét
  ctx.save();ctx.globalCompositeOperation='lighter';const bg=ctx.createLinearGradient(shipX,shipY-20,shipX,0);bg.addColorStop(0,'#ffffff');bg.addColorStop(.3,cur.beamColor);bg.addColorStop(.8,cur.secondary);bg.addColorStop(1,'rgba(0,0,0,0)');
  ctx.globalAlpha=.3;ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(shipX-24,shipY-size*.3);ctx.lineTo(shipX-50,0);ctx.lineTo(shipX+50,0);ctx.lineTo(shipX+24,shipY-size*.3);ctx.closePath();ctx.fill();ctx.globalAlpha=1;
  for(const o of [-18,18]){ctx.fillStyle=cur.primary;ctx.globalAlpha=.32;ctx.fillRect(shipX+o-3,20,6,shipY-size*.3-20);}for(const o of [-42,42]){ctx.fillStyle='#fde047';ctx.globalAlpha=.24;ctx.fillRect(shipX+o-2,0,4,shipY-size*.35);}ctx.globalAlpha=1;
  if(!q&&tick%2===0){drawLightningBolt(shipX-size*.42,shipY-25,shipX-55,10,cur.lightningColor,2.2);drawLightningBolt(shipX+size*.42,shipY-25,shipX+55,10,cur.lightningColor,2.2);}
  if(state.ultFlash>0){state.ultFlash--;const rr=(45-state.ultFlash)*4.5;ctx.strokeStyle='#ffffff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(shipX,shipY,rr,0,TAU);ctx.stroke();}
  ctx.restore();
  // chiến cơ: tranh thật (SSS: dạng thường; chạm/GHÉP/KHOE: dạng MAX)
  const max=cur.sss&&state.ultFlash>0,im=cur.sss?sssImg(cur.model,max?1:0):craftImg(cur.craft);
  if(im){ctx.save();ctx.shadowBlur=24;ctx.shadowColor=cur.primary;const s=size*(cur.sss?1.12:.92);ctx.drawImage(im,shipX-s/2,shipY-s/2,s,s);ctx.restore();}
  // chữ nổi "+lực chiến"
  for(let i=state.floatingTexts.length-1;i>=0;i--){const ft=state.floatingTexts[i];ctx.save();ctx.globalAlpha=Math.max(0,ft.alpha);ctx.font="900 28px 'Be Vietnam Pro',sans-serif";ctx.fillStyle='#67e8f9';ctx.shadowBlur=14;ctx.shadowColor='#00e5ff';ctx.fillText(ft.text,ft.x,ft.y);ctx.font="800 15px 'Be Vietnam Pro',sans-serif";ctx.fillStyle='#e0f2fe';ctx.fillText(ft.sub,ft.x+2,ft.y+20);ctx.restore();ft.y-=.7;ft.alpha-=.015;if(ft.alpha<=0)state.floatingTexts.splice(i,1);}
 }

 // ================= mở / đóng / vào trận =================
 function show(){if(!wrap)build();if(busy())return false;renderUI();wrap.hidden=false;document.body.classList.add('ccht-on');if(!raf)raf=requestAnimationFrame(frame);clearInterval(show.iv);show.iv=setInterval(()=>{if(!wrap.hidden)renderUI();},1500);return true;}
 function hide(){if(!wrap)return;wrap.hidden=true;document.body.classList.remove('ccht-on');clearInterval(show.iv);}
 function close(){hide();}
 function onLobbyClose(e){const det=e&&e.detail||{};hide();const set=SSS_SETS.find(s=>s.key===det.setKey)||SSS_SETS[state.setIndex];applySet(set);
  // nạp bộ đang chọn rồi vào thẳng màn bắn máy bay (đi qua nút XUẤT KÍCH của sảnh gốc: đúng ải, đúng chế độ, đúng lượt chơi)
  try{if(typeof Hangar41!=='undefined'&&Hangar41.stop)Hangar41.stop();}catch{}
  try{gear=Progress.stats();}catch{}
  setTimeout(()=>{const b=$('lb-go');if(b)b.click();else{try{Lobby.hide();reset();}catch{}}},30);}

 const API={
  open:show,close:hide,isOpen:()=>!!wrap&&!wrap.hidden,
  getState:()=>{const cur=SSS_SETS[state.setIndex]||{};return {setIndex:state.setIndex,setKey:cur.key,sss:!!cur.sss,title:cur.title,selectedSlot:state.selectedSlot,power:state.power,scoreBonus:state.scoreBonus,sets:SSS_SETS.map(s=>({key:s.key,title:s.title,sss:s.sss})),equipped:Object.fromEntries(Object.entries(equipped()).map(([k,v])=>[k,v?{id:v.id,variant:v.variant,level:v.level,enhance:v.enhance||0,sss:!!gearSSS(v)}:null]))};},
  sets:()=>SSS_SETS.slice(),
  setSetByKey:key=>{const s=buildSets().find(x=>x.key===key);if(s&&applySet(s)){renderUI();return true;}return false;},
  switchSet:dir=>{if(busy())return;const L=buildSets();if(!L.length)return;let k=L.findIndex(s=>s.key===selectedKey());k=(k+dir+L.length)%L.length;const before=statsNow().cp;if(applySet(L[k])){state.ultFlash=25;renderUI();const diff=Math.round(state.power-before);if(diff)state.floatingTexts.push({text:(diff>0?'+':'')+fmt(diff),sub:'Lực chiến',x:canvas.getBoundingClientRect().width-130,y:150,alpha:1});try{Audio393.sfx('pickup');}catch{}}},
  upgradeSelectedSlot:()=>{const cur=SSS_SETS[state.setIndex];if(!cur)return;const i=state.selectedSlot;
   if(i===0){if(cur.sss)leave(()=>tab('gems'));else leave(()=>{try{Hub40.openCraft(cur.craft);}catch{tab('hangar');}});return;}
   const it=equipped()[['armor','missiles','sidearm'][i-1]];leave(()=>{if(it){try{Hub40.openItem(it.id);return;}catch{}}tab('arsenal');});},
  triggerResonanceUlt:()=>{if(state.selectedSlot>0&&typeof Gear44!=='undefined'){const k=['armor','missiles','sidearm'][state.selectedSlot-1];state.ultFlash=45;toast('Mở Xưởng trang bị SSS · '+({armor:'Giáp',missiles:'Tên lửa',sidearm:'Vũ khí phụ'})[k]);setTimeout(()=>{hide();Gear44.open(k);},450);return;}state.ultFlash=45;const cur=SSS_SETS[state.setIndex];toast(cur&&cur.sss?'Cộng Hưởng SSS: '+cur.title+' · mở Phòng Hợp Thể':'Mở Phòng Hợp Thể SSS');setTimeout(()=>leave(()=>tab('gems')),650);},
  triggerShowcase:()=>{state.ultFlash=45;setTimeout(()=>{try{const s=canvas.width/canvas.getBoundingClientRect().width,c=document.createElement('canvas');c.width=canvas.width;c.height=canvas.height+Math.round(80*s);const x=c.getContext('2d');x.fillStyle='#040710';x.fillRect(0,0,c.width,c.height);x.drawImage(canvas,0,0);x.fillStyle='#ffd84a';x.textAlign='center';x.font=`900 ${Math.round(20*s)}px 'Be Vietnam Pro',sans-serif`;x.fillText(($('ui-set-title').textContent||'').toUpperCase(),c.width/2,canvas.height+32*s);x.fillStyle='#9fe8ff';x.font=`700 ${Math.round(13*s)}px 'Be Vietnam Pro',sans-serif`;x.fillText('Lực chiến '+$('ui-total-power').textContent+' · Phi Đội Sao Băng',c.width/2,canvas.height+58*s);const a=document.createElement('a');a.download='Sao_Bang_khoe_SSS.png';a.href=c.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove();toast('📸 Đã lưu ảnh khoe chiến cơ');}catch{toast('Trình duyệt không cho lưu ảnh');}},700);},
  addResource:type=>act(type==='diamond'?'tower':'farm'),
  notify:toast,
  onBack:()=>{toast('Đang vào màn chiến đấu…');const st=API.getState();window.dispatchEvent(new CustomEvent('ccht:lobby-close',{detail:st}));},
  refresh:renderUI};
 window.CCHT_LOBBY_API=API;
 Object.defineProperty(window,'SSS_SETS',{get:()=>buildSets(),configurable:true});
 const boot=()=>{try{build();}catch(e){console.warn('CCHT lobby',e);}};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
