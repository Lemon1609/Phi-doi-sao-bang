'use strict';
// V44 · HỆ TRANG BỊ SSS (tranh + GEAR_FX của GPT V3/V4, duyệt ở bản giám định V6)
//  • Tên lửa / Vũ khí phụ: bắn bằng GEAR_FX (đường đạn, đuôi, nổ 8 khung, kỹ năng, siêu cấp, Tuyệt kỹ SSS).
//    Sát thương được QUY ĐỔI về đúng mức sát thương phụ trợ cũ của game (auxDamage) → không lệch cân bằng; SSS ×1,35.
//  • Giáp: giữ nguyên cơ chế Equipment25 (đã cân bằng), thay hình: vòm giáp vẽ tay phía sau tàu + hoạt ảnh kích hoạt 8 khung.
//    Giáp SSS chạy cả 2 đặc kỹ của 2 giáp gốc.
//  • Hợp thể: 2 món CÙNG LOẠI, cả hai ≥ +1, theo vòng dây chuyền (18 công thức) → 1 trang bị SSS; món gốc được giữ lại.
//    Cường hóa SSS = 2 × min(cường hóa 2 món gốc), tối đa +10 (giống quy tắc chiến cơ SSS).
//  • Lưu riêng ở 'saobang-gear-sss-v1' → save cũ không đổi.
const Gear44=(()=>{
 const KEY='saobang-gear-sss-v1',TAU=Math.PI*2,KINDS=['armor','missiles','sidearm'],KN={armor:'Giáp',missiles:'Tên lửa',sidearm:'Vũ khí phụ'};
 const D=GEAR_FX.data,BY=GEAR_FX.byId,SSS=D.filter(d=>d.tier==='sss');
 const quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 // ================= tranh (giải mã lười, chỉ khi cần) =================
 const IMG={};const assets=new Proxy({},{get:(_,k)=>{if(typeof k!=='string')return undefined;if(IMG[k])return IMG[k].complete&&IMG[k].naturalWidth?IMG[k]:undefined;const src=GEAR44_ASSETS[k];if(!src)return undefined;const im=new Image();im.decoding='async';im.src=src;IMG[k]=im;return undefined;}});
 const glows={};for(const d of D)for(const col of [d.color,d.second])if(col&&!glows[col]){const c=document.createElement('canvas');c.width=c.height=96;const g=c.getContext('2d'),r=g.createRadialGradient(48,48,0,48,48,47);r.addColorStop(0,col+'cc');r.addColorStop(.4,col+'66');r.addColorStop(1,col+'00');g.fillStyle=r;g.fillRect(0,0,96,96);glows[col]=c;}
 function warm(id){const d=BY[id];if(!d)return;const ids=d.parents||[id];const keys=[];for(const b of ids)for(const s of ['_projectile_normal','_projectile_super','_impact_normal','_impact_super','_muzzle','_trail','_beam_normal','_beam_super','_pod_normal','_pod_super','_shell_idle','_shell_proc'])keys.push(b+s);if(d.tier==='sss')for(const s of ['_pod_normal','_pod_super','_shell_idle','_shell_max','_shell_proc','_ult_a','_ult_b'])keys.push(id+s);keys.push('orbital_satellite');for(const k of keys)void assets[k];}
 // ================= dữ liệu người chơi =================
 let S=load();
 function load(){try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&o.v===1)return {v:1,owned:o.owned||{},equip:Object.assign({armor:null,missiles:null,sidearm:null},o.equip||{})};}catch{}return {v:1,owned:{},equip:{armor:null,missiles:null,sidearm:null}};}
 function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}}
 const items=()=>{try{return Progress.getState().items||[];}catch{return [];}};
 const equippedItem=k=>{try{const P=Progress.getState();return P.items.find(x=>x.id===P.equipped[k])||null;}catch{return null;}};
 const bestOf=base=>items().filter(i=>i.variant===base).sort((a,b)=>(b.enhance||0)-(a.enhance||0)||b.level-a.level)[0]||null;
 const enhOf=base=>{const i=bestOf(base);return i?(i.enhance||0):-1;};
 const owns=id=>!!S.owned[id];
 function canFuse(id){const d=BY[id];if(!d||!d.parents)return {ok:false,why:'Không phải công thức'};const [a,b]=d.parents,ea=enhOf(a),eb=enhOf(b);if(ea<0||eb<0)return {ok:false,why:'Thiếu '+(ea<0?BY[a].name:BY[b].name)};if(ea<1||eb<1)return {ok:false,why:'Cần cả hai món ≥ +1'};return {ok:true,why:''};}
 const sssEnh=id=>{const d=BY[id];if(!d||!d.parents)return 0;return Math.min(10,2*Math.min(...d.parents.map(p=>Math.max(0,enhOf(p)))));};
 // SSS chỉ hoạt động khi đang lắp 1 trong 2 món gốc của nó ở ô đó
 function activeId(kind){const it=equippedItem(kind);if(!it)return null;const sid=S.equip[kind];if(sid&&owns(sid)&&BY[sid]&&BY[sid].parents.includes(it.variant))return sid;return it.variant;}
 const activeDef=kind=>{const id=activeId(kind);return id?BY[id]:null;};
 const dmgMult=kind=>{const d=activeDef(kind);return d&&d.tier==='sss'?1.35*(1+.03*sssEnh(d.id)):1;};
 function fuse(id){if(owns(id))return false;if(['play','pause','reward'].includes(mode))return false;const c=canFuse(id);if(!c.ok)return false;S.owned[id]={at:Date.now()};save();try{Audio393.sfx('pickup');}catch{}rite(id);return true;}
 function equipSSS(kind,id){if(['play','pause','reward'].includes(mode))return false;if(id===null){S.equip[kind]=null;save();return true;}const d=BY[id];if(!d||d.kind!==kind||!owns(id))return false;S.equip[kind]=id;const it=equippedItem(kind);if(!it||!d.parents.includes(it.variant)){const best=d.parents.map(bestOf).filter(Boolean).sort((a,b)=>(b.enhance||0)-(a.enhance||0)||b.level-a.level)[0];if(best)try{Progress.equip(best.id);}catch{}}save();try{gear=Progress.stats();}catch{}return true;}
 // ================= trận đấu =================
 const R={};let loadKey='',demoTargets=null;
 function mkMirror(){return {slots:[],map:new Map()};}
 function build(){const key=KINDS.map(k=>activeId(k)+':'+(equippedItem(k)?.id||'')).join('|');if(key===loadKey)return;loadKey=key;for(const k of KINDS){const id=activeId(k);if(!id||!BY[id]){delete R[k];continue;}if(R[k]&&R[k].id===id)continue;warm(id);const st=GEAR_FX.create(id,{assets,glows,targets:[],player:{x:240,y:560,hp:1,maxHp:1},enhance:BY[id].tier==='sss'?sssEnh(id):5,demo:false,numbers:false,light:true,reduced:quiet(),shake:false});R[k]={id,st,mir:mkMirror(),armorT:0,lastTimer:null,secondT:.5};}}
 const bridged=k=>!!R[k]&&(k!=='armor');
 function radius(e){return e===boss?70:e.large?40:e.elite?32:22;}
 function syncTargets(r){const st=r.st,m=r.mir;for(const s of m.slots){s.seen=false;}
  let list=[];if(window.HANGAR_DEMO||mode!=='play'){if(!demoTargets)demoTargets=[70,170,310,410].map(x=>({obj:null,x,y:-60}));list=demoTargets;}
  else{for(const e of enemies)if(!e.dead&&!e.rescue28&&e.y>-30&&e.y<H)list.push({obj:e});if(boss&&!boss.dead)list.push({obj:boss});}
  for(const it of list){let s=it.obj?m.map.get(it.obj):m.map.get(it);if(!s){s=m.slots.find(z=>!z.obj&&!z.key&&z.hp<=0)||null;if(!s){if(m.slots.length>=40)continue;s={};m.slots.push(s);}s.obj=it.obj;s.key=it.obj?null:it;m.map.set(it.obj||it,s);}
   const src=it.obj||it;s.x=src.x;s.y=src.y;s.r=it.obj?radius(it.obj):24;s.boss=it.obj===boss;s.vx=0;s.hp=1e9;s.maxHp=1e9;s.seen=true;}
  for(const s of m.slots)if(!s.seen){if(s.obj||s.key)m.map.delete(s.obj||s.key);s.obj=null;s.key=null;s.hp=0;s.dead=1;}
  st.targets=m.slots;return list.length>0;}
 function refDPS(k){const i=(gear.equipment||[]).find(x=>x.kind===k);if(!i||!i.interval)return 0;const pu=powerUpgrades||0,dmg=1+pu*.12,rate=1+pu*.1,extra=Math.floor(pu/2);return i.auxDamage*(((i.spec&&i.spec.count)||1)+extra)*dmg*rate*(gear.damage||1)*BALANCE.allyStats/i.interval*dmgMult(k);}
 function nominal(r){const d=r.st.def,st=GEAR_FX.stats(d,r.st.enhance);return Math.max(1e-6,st.main*(d.combat?.damageScale||0));}
 function hurt(e,d){if(!e||e.dead||!(d>0))return;const amount=d*BALANCE.allyDamage*Combat.factor();if(e===boss||e.bossPart){damageBoss(amount,'gear',e);return;}e.hp-=amount;try{Feedback31.damage(e,amount,{gearKind:'auxiliary'});}catch{}if(e.hp<=0)kill(e);}
 function setMode(r,m){const st=r.st;if(st.mode===m)return;GEAR_FX.setMode(st,m,m==='normal'||m==='super');}
 function modeTick(r){const st=r.st,d=st.def,sup=superTime>0;if(st.mode==='ult'){if(st.age>=(d.ult?.duration||3)){setMode(r,sup?'super':'normal');}else if(st.age>=.55&&!r.cleared){r.cleared=true;if(mode==='play'){bullets=[];beams=[];invuln=Math.max(invuln,.6);}}return;}
  if(st.mode==='skill'){if(st.age>=(d.skill?.duration||2))setMode(r,sup?'super':'normal');return;}setMode(r,sup?'super':'normal');}
 function shellProc(r){const st=r.st;for(const p of st.pool){if(p.on)continue;Object.assign(p,{on:true,type:'shellproc',id:st.id,x:st.player.x,y:st.player.y,life:.75,full:.75,age:0,variant:st.mode==='normal'?'normal':'super'});break;}}
 function tick(dt){if(mode!=='play'&&!window.HANGAR_DEMO)return;build();
  for(const k of KINDS){const r=R[k];if(!r)continue;const st=r.st;st.player.x=player.x;st.player.y=player.y;st.reduced=quiet();modeTick(r);
   if(k==='armor'){// đặc kỹ giáp: phát hiện lúc Equipment25 kích hoạt → hoạt ảnh vòm; giáp SSS chạy thêm đặc kỹ thứ hai
    const ai=gear.armorItem;try{const t=Equipment25.getState().timers[ai?.id];if(r.lastTimer!==null&&t>r.lastTimer+.05)shellProc(r);r.lastTimer=t??null;}catch{}
    if(st.def.parents&&ai&&mode==='play'){const other=st.def.parents.find(p=>p!==ai.variant);if(other&&other!=='reactive'){r.secondT-=dt;if(r.secondT<=0){r.secondT=(ai.spec?.cd||6)/BALANCE.allyStats;try{Equipment25.armorSkill({...ai,variant:other});shellProc(r);}catch{}}}}
    GEAR_FX.update(st,dt,st.mode);continue;}
   const alive=syncTargets(r);if(!alive){st.fire=0;for(const p of st.pool)if(p.on&&(p.type==='shot'||p.type==='beamShot'))p.on=false;}
   GEAR_FX.update(st,dt,st.mode);
   if(mode==='play'){const kk=refDPS(k)/nominal(r);for(const s of r.mir.slots){if(!s.obj)continue;const d=1e9-s.hp;if(d>0&&s.hp>0)hurt(s.obj,d*kk);s.hp=1e9;}}}}
 // ================= gắn vào game =================
 function install(){
  const ou=Equipment25.update;Equipment25.update=function(dt){const all=gear.equipment;if(all)gear.equipment=all.filter(i=>!bridged(i.kind));try{return ou.apply(this,arguments);}finally{gear.equipment=all;try{tick(dt);}catch(e){}}};
  const od=Equipment25.draw;Equipment25.draw=function(){const all=gear.equipment;if(all)gear.equipment=all.filter(i=>!R[i.kind]);try{od.apply(this,arguments);}finally{gear.equipment=all;}if(mode==='over')return;try{if(R.armor)GEAR_FX.draw(ctx,R.armor.st,'armor');if(R.missiles)GEAR_FX.draw(ctx,R.missiles.st,'hardware');for(const k of ['missiles','sidearm'])if(R[k]){GEAR_FX.draw(ctx,R[k].st,'projectiles');GEAR_FX.draw(ctx,R[k].st,'hits');}if(R.armor)GEAR_FX.draw(ctx,R.armor.st,'hits');}catch(e){}};
  const os=Equipment25.supportSprite;Equipment25.supportSprite=function(g,x,y,size){const r=R.sidearm;if(!r)return os.apply(this,arguments);const st=r.st,sup=st.mode!=='normal',key=(st.def.tier==='sss'?st.id:st.id)+'_pod_'+(sup?'super':'normal'),im=assets[key];if(!im)return os.apply(this,arguments);const w=sup?Math.max(size,64):Math.max(size,40);g.save();if(sup&&glows[st.def.color]){g.globalCompositeOperation='lighter';g.globalAlpha=.45;g.drawImage(glows[st.def.color],x-w,y-w,w*2,w*2);g.globalCompositeOperation='source-over';g.globalAlpha=1;}g.drawImage(im,x-w/2,y-w/2,w,w);g.restore();};
  const ob=Equipment25.barrage;Equipment25.barrage=function(){const r=R.missiles;if(!r)return ob.apply(this,arguments);if(mode!=='play'||r.st.cooldowns.skill>0)return false;setMode(r,'skill');try{Rank36.shock();}catch{}return true;};
  const oc=Equipment25.cooldown;Equipment25.cooldown=function(){const r=R.missiles;return r?r.st.cooldowns.skill:oc.apply(this,arguments);};
  const oo=Equipment25.onDamage;Equipment25.onDamage=function(){const r=R.armor;if(r)shellProc(r);if(r&&r.st.def.parents&&r.st.def.parents.includes('reactive')&&gear.armorItem&&gear.armorItem.variant!=='reactive'){const a=gear.armorItem;gear.armorItem={...a,variant:'reactive'};try{return oo.apply(this,arguments);}finally{gear.armorItem=a;}}return oo.apply(this,arguments);};
  const or=Equipment25.reset;Equipment25.reset=function(){loadKey='';for(const k in R)delete R[k];return or.apply(this,arguments);};
  const oa=Rank36.activate;Rank36.activate=function(){const ok=oa.apply(this,arguments);if(ok)for(const k of ['missiles','sidearm']){const r=R[k];if(r&&r.st.cooldowns.skill<=0)setMode(r,'skill');}return ok;};
  const ow=window.activateSuper;if(typeof activateSuper==='function'){activateSuper=function(){const v=ow.apply(this,arguments);for(const k of ['missiles','sidearm','armor']){const r=R[k];if(r&&r.st.def.tier==='sss'&&r.st.def.ult&&r.st.cooldowns.ult<=0){r.cleared=false;GEAR_FX.setMode(r.st,'ult');break;}}return v;};}
  const ov=VisualFX.draw;VisualFX.draw=function(){const v=ov.apply(this,arguments);try{for(const k of KINDS){const r=R[k];if(r&&r.st.mode==='ult')GEAR_FX.draw(ctx,r.st,'ult');}}catch{}return v;};
  // icon riêng cho từng mẫu trang bị
  const oart=Progress.art;Progress.art=function(i,extra=''){const h=oart.apply(this,arguments);return i&&BY[i.variant]?h.replace('class="gear25-art','class="gear25-art g44-ic g44-'+i.variant):h;};
  const css=document.createElement('style');css.id='g44-icons';css.textContent=D.filter(d=>d.tier==='base').map(d=>`.gear25-art.g44-${d.id}{background-image:url(${GEAR44_ASSETS[d.id+'_icon']})!important;background-size:82% auto!important;background-position:50% 42%!important;background-repeat:no-repeat!important}`).join('');document.head.appendChild(css);
 }
 // ================= XƯỞNG TRANG BỊ SSS (giao diện) =================
 let root=null,tabK='armor',sel=null,rv=null;
 function atlasCell(d,row,size){const k='atlas_'+d.kind,src=GEAR44_ASSETS[k];return `<span class="g44-cell" style="--sz:${size}px;background-image:url(${src});background-position:${d.ring*20}% ${row*100}%"></span>`;}
 const iconOf=id=>`<img class="g44-ico" alt="" src="${GEAR44_ASSETS[id+'_icon']}">`;
 function buildUI(){root=document.createElement('section');root.id='g44';root.hidden=true;root.setAttribute('role','dialog');root.setAttribute('aria-label','Xưởng trang bị SSS');
  root.innerHTML=`<div class="g44-box"><header><h2>XƯỞNG TRANG BỊ SSS</h2><small>Hợp thể 2 món cùng loại (cả hai ≥ +1) · món gốc được giữ lại</small><button class="g44-x" data-g="close" aria-label="Đóng">✕</button></header>
  <nav>${KINDS.map(k=>`<button data-tab="${k}">${KN[k]}</button>`).join('')}</nav><div class="g44-ring" id="g44-ring"></div><div class="g44-list" id="g44-list"></div><div class="g44-det" id="g44-det"></div></div><canvas class="g44-rite" hidden></canvas>`;
  document.body.appendChild(root);rv=root.querySelector('.g44-rite');
  root.addEventListener('click',e=>{const t=e.target.closest('[data-tab]');if(t){tabK=t.dataset.tab;sel=null;render();return;}const c=e.target.closest('[data-pick]');if(c){sel=c.dataset.pick;render();return;}const b=e.target.closest('[data-g]');if(!b)return;const g=b.dataset.g,id=b.dataset.id;
   if(g==='close')close();else if(g==='fuse'){if(fuse(id))render();}else if(g==='equip'){equipSSS(BY[id].kind,id);render();toastG('Đã lắp '+BY[id].name);}else if(g==='unequip'){equipSSS(BY[id].kind,null);render();}});
  root.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}
 function toastG(t){try{toast(t);}catch{}}
 function render(){if(!root)return;for(const b of root.querySelectorAll('[data-tab]'))b.setAttribute('aria-pressed',String(b.dataset.tab===tabK));
  const base=D.filter(d=>d.tier==='base'&&d.kind===tabK).sort((a,b)=>a.ring-b.ring),list=SSS.filter(d=>d.kind===tabK).sort((a,b)=>a.ring-b.ring);
  root.querySelector('#g44-ring').innerHTML=base.map(d=>{const e=enhOf(d.id);return `<div class="g44-b ${e<0?'none':e>=1?'ok':''}" title="${d.name}">${iconOf(d.id)}<b>${e<0?'Chưa có':'+'+e}</b><small>${d.name}</small></div>`;}).join('');
  if(!sel||!BY[sel]||BY[sel].kind!==tabK)sel=list[0].id;
  root.querySelector('#g44-list').innerHTML=list.map(d=>{const c=canFuse(d.id),own=owns(d.id),on=activeId(tabK)===d.id,eq=S.equip[tabK]===d.id;return `<button class="g44-r ${own?'own':''} ${on?'on':''} ${d.id===sel?'sel':''}" data-pick="${d.id}">${iconOf(d.parents[0])}<i>+</i>${iconOf(d.parents[1])}<i>→</i>${atlasCell(d,own?1:0,54)}<span><b>${d.name}</b><small>${own?(on?'ĐANG DÙNG · +'+sssEnh(d.id):eq?'Đã chọn · cần lắp món gốc':'Đã sở hữu · +'+sssEnh(d.id)):c.ok?'Sẵn sàng hợp thể':c.why}</small></span></button>`;}).join('');
  const d=BY[sel],c=canFuse(d.id),own=owns(d.id),eq=S.equip[tabK]===d.id,traits=(d.traits||[]).map(t=>t.name||t).join(' + ');
  root.querySelector('#g44-det').innerHTML=`<div class="g44-art">${atlasCell(d,0,120)}${atlasCell(d,1,120)}</div><div class="g44-txt"><h3 style="color:${d.color}">${d.name} <em>SSS</em></h3><p class="g44-tr">Đặc kỹ: <b>${traits}</b></p><p>Kỹ năng · <b>${d.skill?.name||''}</b>: ${d.skill?.effect||''}</p><p>Siêu cấp · <b>${d.super?.name||''}</b>: ${d.super?.effect||''}</p>${d.ult?`<p>Tuyệt kỹ · <b>${d.ult.name}</b> (khi Bạo Tẩu): ${d.ult.effect||''}</p>`:''}<p class="g44-fl">${d.flavor||''}</p><p class="g44-st">${tabK==='armor'?'Giáp':'Hỏa lực'} ×1,35 · thêm 3%/cấp cường hóa · Cường hóa = 2 × min(2 món gốc) = <b>+${sssEnh(d.id)}</b></p>
   <div class="g44-act">${own?(eq?`<button data-g="unequip" data-id="${d.id}">GỠ SSS</button>`:`<button class="main" data-g="equip" data-id="${d.id}">LẮP TRANG BỊ SSS</button>`):`<button class="main" data-g="fuse" data-id="${d.id}" ${c.ok?'':'disabled'}>${c.ok?'HỢP THỂ':c.why}</button>`}</div></div>`;}
 function open(kind){if(['play','pause','reward'].includes(mode))return false;if(!root)buildUI();if(kind&&KINDS.includes(kind))tabK=kind;sel=null;render();root.hidden=false;document.body.classList.add('g44-on');return true;}
 function close(){if(root){root.hidden=true;document.body.classList.remove('g44-on');}try{CCHT_LOBBY_API.refresh();}catch{}try{Hangar41.paint(true);}catch{}}
 // nghi thức hợp thể: 2 món gốc lao vào nhau → chớp → SSS dạng thường → MAX
 function rite(id){if(!root)buildUI();const d=BY[id];const pa=new Image(),pb=new Image(),at=new Image();pa.src=GEAR44_ASSETS[d.parents[0]+'_icon'];pb.src=GEAR44_ASSETS[d.parents[1]+'_icon'];at.src=GEAR44_ASSETS['atlas_'+d.kind];rv.hidden=false;const t0=performance.now(),g=rv.getContext('2d');
  const step=()=>{const t=(performance.now()-t0)/1000,r=rv.getBoundingClientRect(),dp=Math.min(2,devicePixelRatio||1);if(rv.width!==Math.round(r.width*dp)){rv.width=Math.round(r.width*dp);rv.height=Math.round(r.height*dp);}g.setTransform(dp,0,0,dp,0,0);const W2=r.width,H2=r.height,cx=W2/2,cy=H2*.42;g.clearRect(0,0,W2,H2);g.fillStyle='rgba(2,4,12,.92)';g.fillRect(0,0,W2,H2);
   const e=u=>u<0?0:u>1?1:1-Math.pow(1-u,3),u=e(t/1);if(t<1.05)[pa,pb].forEach((im,k)=>{const s=Math.min(130,W2*.3),x=cx+(k?1:-1)*(1-u)*W2*.3;g.save();g.translate(x,cy);g.rotate((k?-1:1)*(1-u)*.5);if(im.complete)g.drawImage(im,-s/2,-s/2,s,s);g.restore();});
   const fl=t>.95&&t<1.5?1-(t-.95)/.55:0;if(fl>0&&!quiet()){g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(cx,cy,0,cx,cy,60+(1-fl)*W2);gr.addColorStop(0,'rgba(255,255,255,'+fl+')');gr.addColorStop(.4,d.color+'aa');gr.addColorStop(1,d.color+'00');g.fillStyle=gr;g.fillRect(0,0,W2,H2);g.restore();}
   if(t>1&&at.complete&&at.naturalWidth){const v=e((t-1)/.6),cw=at.naturalWidth/6,ch=at.naturalHeight/2,row=t>1.9?1:0,s=Math.min(300,W2*.8)*(.7+.3*v);g.globalAlpha=v;g.drawImage(at,d.ring*cw,row*ch,cw,ch,cx-s/2,cy-s/2,s,s);g.globalAlpha=1;}
   if(t>1.2){g.fillStyle='#ffd56a';g.textAlign='center';g.font="900 22px 'Be Vietnam Pro',sans-serif";g.fillText(d.name.toUpperCase(),cx,H2*.78);g.fillStyle='#bfe9ff';g.font="600 13px 'Be Vietnam Pro',sans-serif";g.fillText(d.parents.map(p=>BY[p].name).join('  ✚  '),cx,H2*.78+24);g.fillText('Chạm để tiếp tục',cx,H2*.78+50);}
   if(t<4&&!rv.hidden)requestAnimationFrame(step);else rv.hidden=true;};
  rv.onclick=()=>{if(performance.now()-t0>600)rv.hidden=true;};requestAnimationFrame(step);}
 // ảnh SSS cho ô trang bị (sảnh, kho chiến cơ)
 function slotPic(kind){const d=activeDef(kind);if(!d||d.tier!=='sss')return '';return atlasCell(d,0,52);}
 function hangarSync(){const hg=document.getElementById('hgr41');if(!hg||hg.hidden)return;
  const side=hg.querySelector('.h1-side');if(side&&!side.querySelector('[data-g44]')){const b=document.createElement('button');b.dataset.g44='1';b.textContent='TRANG BỊ SSS';b.addEventListener('click',e=>{e.stopPropagation();open('armor');});side.appendChild(b);}}
 install();setInterval(hangarSync,700);
 return {open,close,fuse,equipSSS,activeId,activeDef,dmgMult,slotPic,canFuse,owns,sssEnh,state:()=>JSON.parse(JSON.stringify(S)),runtime:()=>Object.fromEntries(Object.entries(R).map(([k,r])=>[k,{id:r.id,mode:r.st.mode,live:r.st.live,slots:r.mir.slots.length,skillCd:r.st.cooldowns.skill,ultCd:r.st.cooldowns.ult,dmg:r.st.metrics.damage}]))};
})();
