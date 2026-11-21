'use strict';
// V309 Lượt 7 · môi trường động (ENV7), bộ trang bị nhanh (LOAD7), Bách Khoa (CODEX7), nhiệm vụ mới gắn vào hệ q77 (QUEST7: cờ đọc trong q77.js).
//  Tắt từng phần: window.ENV7=false · window.LOAD7=false · window.CODEX7=false · window.QUEST7=false. Không dùng ctx.filter / shadowBlur trong trận.
//  • ENV7: chiến dịch ải ≥ 6 có số ải chia 4 dư 2 (6, 10, 14…) và Vô tận mỗi 70 s: 1 sự kiện 18 s, không chạy khi có boss.
//    Loại theo số ải: Bão thiên thạch (đá rơi chéo, 3 phát vỡ → sao, 20 % P; chạm tàu = trúng đòn) · Bão điện từ (sét mảnh vẽ ngay sau nền,
//    nạp Bạo Tẩu ×1,25 qua Combat26.addCharge07) · Trường trọng lực (hạt trôi ngang, vật phẩm rơi trôi 28 px/s, đạn thường của địch lệch 16 px/s).
//    Thông báo 1,5 s ở mép trên.
//  • LOAD7: hàng BỘ 1 | BỘ 2 | BỘ 3 | LƯU trên thẻ phi công ở Sảnh (khóa saobang-load7-v1): chiến cơ / Chiến Thần + 3 trang bị + SSS đang gắn + đội phi công.
//    Chạm bộ trống = lưu đội hình hiện tại; chạm bộ đã có = chuyển sang bộ đó; LƯU = ghi đè bộ đang chọn.
//  • CODEX7: ô BÁCH KHOA ở cột trái Sảnh → 3 tab (13 chiến cơ · 7 Chiến Thần trước/lưng · 21 SSS); chưa có = bóng tối.
//    Thưởng sưu tầm vĩnh viễn: mỗi chiến cơ +1 % Công · mỗi Chiến Thần +2 % Công & Máu · mỗi món SSS +1 % Máu (Công nhân vào Combat.factor + lực chiến,
//    Máu nhân maxHp lúc vào trận).
const L7309=(()=>{
 const TAU=Math.PI*2,now=()=>performance.now();
 const play=()=>{try{return mode==='play';}catch{return false;}};
 const quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 const T=t=>{try{toast(t);}catch{}};
 const TT=()=>{try{return time;}catch{return now()/1000;}};
 // =============== ENV7 ===============
 const E={on:false,type:'',t0:0,dur:18,next:25,banner:0,rocks:[],bolts:[],dir:1,parts:[],stage:-1,done:false,cnt:{rock:0,hit:0,bolt:0}};
 const NAME={rock:'BÃO THIÊN THẠCH',em:'BÃO ĐIỆN TỪ',grav:'TRƯỜNG TRỌNG LỰC'},TYPES=['rock','em','grav'];
 const envOn=()=>window.ENV7!==false;
 function start(type){E.on=true;E.type=type;E.t0=TT();E.banner=TT();E.rocks=[];E.bolts=[];E.dir=Math.random()<.5?-1:1;E.spawn=0;E.parts=[];
   if(type==='grav')for(let i=0;i<46;i++)E.parts.push({x:Math.random()*W,y:Math.random()*H,v:30+Math.random()*60,l:8+Math.random()*22,a:.25+Math.random()*.3});}
 function stop(){E.on=false;E.rocks=[];E.bolts=[];E.parts=[];}
 function sched(){let gm='',lv=1,st=0,bs=null;try{gm=gameMode;lv=level;st=stageTime;bs=boss;}catch{}
   if(bs){if(E.on)stop();return;}
   if(gm==='campaign'){if(E.stage!==lv){E.stage=lv;E.done=false;if(E.on)stop();}
     if(!E.on&&!E.done&&lv>=6&&lv%4===2&&st>6){E.done=true;start(TYPES[Math.floor(lv/4)%3]);}}
   else if(gm==='endless'){if(!E.on&&st>E.next){E.next=st+70;start(TYPES[Math.floor(st/70)%3]);}}
   if(E.on&&TT()-E.t0>E.dur)stop();}
 const RK=[];function rockImg(i){if(RK[i])return RK[i];const n=64,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2;let s=7+i*13;const rnd=()=>{s=(s*9301+49297)%233280;return s/233280;};
   g.beginPath();const k=11;for(let j=0;j<k;j++){const a=j/k*TAU,r=h*(.72+rnd()*.24);j?g.lineTo(h+Math.cos(a)*r,h+Math.sin(a)*r):g.moveTo(h+Math.cos(a)*r,h+Math.sin(a)*r);}g.closePath();
   const gr=g.createRadialGradient(h*.7,h*.6,2,h,h,h);gr.addColorStop(0,'#c9a27e');gr.addColorStop(.55,'#7a5a43');gr.addColorStop(1,'#2e2119');g.fillStyle=gr;g.fill();g.strokeStyle='rgba(255,170,90,.55)';g.lineWidth=2;g.stroke();
   for(let j=0;j<4;j++){g.fillStyle='rgba(30,20,14,.55)';g.beginPath();g.arc(h+(rnd()-.5)*h,h+(rnd()-.5)*h,3+rnd()*5,0,TAU);g.fill();}
   return RK[i]=c;}
 function envTick(dt){if(!envOn()||!play()){if(E.on&&!play())return;return;}sched();if(!E.on)return;
   if(E.type==='rock'){E.spawn-=dt;if(E.spawn<=0&&E.rocks.length<8){E.spawn=.55+Math.random()*.35;const fromL=Math.random()<.5;E.rocks.push({x:fromL?-20+Math.random()*W*.5:W*.5+Math.random()*W*.5+20,y:-24,vx:(fromL?1:-1)*(70+Math.random()*50),vy:170+Math.random()*60,r:14+Math.random()*7,hp:3,a:Math.random()*TAU,va:(Math.random()-.5)*3,k:Math.floor(Math.random()*3)});}
     for(const m of E.rocks){m.x+=m.vx*dt;m.y+=m.vy*dt;m.a+=m.va*dt;
       try{for(const s of shots){if(s.dead||m.hp<=0)continue;if(s.ray28){if(m.y<s.y&&Math.abs(s.x-m.x)<(s.r||6)+m.r)m.hp-=dt*6;continue;}if(Math.abs(s.x-m.x)<m.r+5&&Math.abs(s.y-m.y)<m.r+8){m.hp-=1;s.dead=true;}}}catch{}
       if(m.hp<=0&&!m.dead){m.dead=true;E.cnt.rock++;try{VisualFX.explode(m.x,m.y,.8,'enemy');}catch{}try{for(let k=0;k<2;k++)Safety31.push(drops,100,{x:m.x+(k-.5)*12,y:m.y,type:'star',t:0,vy:-60});if(Math.random()<.2)Safety31.push(drops,100,{x:m.x,y:m.y,type:'power',t:0,vy:-80});}catch{}}
       try{if(!m.dead&&Math.hypot(m.x-player.x,m.y-player.y)<m.r+8){m.dead=true;E.cnt.hit++;try{VisualFX.explode(m.x,m.y,.8,'enemy');}catch{}if(!(invuln>0))damage('bullet');}}catch{}}
     E.rocks=E.rocks.filter(m=>!m.dead&&m.y<H+40&&m.x>-60&&m.x<W+60);}
   else if(E.type==='em'){if(Math.random()<dt*2.2&&E.bolts.length<3){const p=[];let x=Math.random()*W,y=-10;const yE=H*(.35+Math.random()*.5);while(y<yE){p.push(x,y);x+=(Math.random()-.5)*46;y+=18+Math.random()*24;}E.bolts.push({p,t:0,l:.18+Math.random()*.1});E.cnt.bolt++;}
     for(const b of E.bolts)b.t+=dt;E.bolts=E.bolts.filter(b=>b.t<b.l);}
   else if(E.type==='grav'){for(const p of E.parts){p.x+=E.dir*p.v*dt;if(p.x<-30)p.x=W+20;if(p.x>W+30)p.x=-20;}
     try{for(const d of drops)if(!d.dead)d.x=Math.max(14,Math.min(W-14,d.x+E.dir*28*dt));}catch{}
     try{for(const b of bullets)if(!b.dead&&!b.turret&&!b.sp75)b.x+=E.dir*16*dt;}catch{}}}
 function drawBack(){if(!E.on||!envOn())return;const g=ctx;
   if(E.type==='em'&&!quiet()){g.save();g.globalCompositeOperation='lighter';for(const b of E.bolts){const a=1-b.t/b.l;g.beginPath();for(let i=0;i<b.p.length;i+=2)i?g.lineTo(b.p[i],b.p[i+1]):g.moveTo(b.p[i],b.p[i+1]);
     g.globalAlpha=.24*a;g.strokeStyle='#38bdf8';g.lineWidth=7;g.stroke();g.globalAlpha=.85*a;g.strokeStyle='#e0faff';g.lineWidth=1.8;g.stroke();}
     g.globalAlpha=.05+.04*Math.sin(TT()*9);g.fillStyle='#38bdf8';g.fillRect(0,0,W,H);g.restore();}
   if(E.type==='grav'){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='#c4b5fd';g.lineWidth=1.7;for(const p of E.parts){g.globalAlpha=p.a;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x-E.dir*p.l,p.y);g.stroke();}g.restore();}}
 function drawFront(){if(!envOn())return;const g=ctx;
   if(E.on&&E.type==='rock')for(const m of E.rocks){const s=m.r*2.3;g.save();g.translate(m.x,m.y);
     g.globalCompositeOperation='lighter';g.globalAlpha=.35;g.strokeStyle='#fb923c';g.lineWidth=m.r*.7;g.lineCap='round';g.beginPath();g.moveTo(0,0);g.lineTo(-m.vx*.18,-m.vy*.18);g.stroke();
     g.globalCompositeOperation='source-over';g.globalAlpha=1;g.rotate(m.a);g.drawImage(rockImg(m.k),-s/2,-s/2,s,s);g.restore();}
   const u=TT()-E.banner;if(E.on&&u>=0&&u<1.5){const a=u<.2?u/.2:u>1.2?(1.5-u)/.3:1,txt='⚠ '+NAME[E.type]+(E.type==='em'?' · BẠO TẨU NẠP +25%':E.type==='rock'?' · BẮN VỠ ĐỂ NHẶT SAO':' · VẬT PHẨM TRÔI');
     g.save();g.globalAlpha=a;g.font='bold 13px sans-serif';const w=g.measureText(txt).width+26,x=W/2-w/2,y=132;g.fillStyle='rgba(8,14,26,.82)';g.fillRect(x,y,w,24);g.fillStyle=E.type==='em'?'#38bdf8':E.type==='rock'?'#fb923c':'#a78bfa';g.fillRect(x,y,w,2);g.fillRect(x,y+22,w,2);
     g.fillStyle='#f1f5f9';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,W/2,y+12.5);g.restore();}}
 // =============== nhiệm vụ: sự kiện ===============
 const Q=(ev,n)=>{try{if(window.QUEST7!==false&&typeof Q77!=='undefined')Q77.track(ev,n||1);}catch{}};
 let wasS=false,escW='';
 function qTick(){let st=0;try{st=superTime;}catch{}if(play()&&st>0&&!wasS)Q('super7');wasS=st>0;
   try{if(play()&&gameMode==='endless'){const thr=(()=>{try{return V92.CFG.rank.tiers[1].min||60000;}catch{return 60000;}})();const wk=Q77.state().w;if(score>=thr&&escW!==wk){escW=wk;Q('escore7');}}}catch{}}
 // =============== LOAD7 ===============
 const LK='saobang-load7-v1';let LS={act:0,sets:[null,null,null]};try{const o=JSON.parse(localStorage.getItem(LK)||'null');if(o&&Array.isArray(o.sets))LS=o;}catch{}
 const lsave=()=>{try{localStorage.setItem(LK,JSON.stringify(LS));}catch{}};
 function snap(){const o={craft:0,fus:null,eq:{},sss:{},team:[]};try{o.craft=selected;}catch{}try{const r=Fusion.getSelected();o.fus=r&&r.key||null;}catch{}
   try{o.eq=Object.assign({},Progress.getState().equipped);}catch{}try{for(const k of Progress.kinds){const id=Gear44.activeId(k);if(id&&/^sss_/.test(id))o.sss[k]=id;}}catch{}try{o.team=Pilot67.state().team.slice();}catch{}o.at=Date.now();return o;}
 function apply(o){if(!o)return false;try{if(['play','pause','reward'].includes(mode))return false;}catch{}
   try{if(o.fus&&Fusion.resolve(o.fus)){Fusion.select(o.fus);}else{Fusion.select(null,false);try{activeRobot=null;}catch{}selectCraft(o.craft|0);}}catch{}
   try{const items=Progress.getState().items||[];for(const k in o.eq){const id=o.eq[k];if(items.some(i=>i.id===id))Progress.equip(id);}}catch{}
   try{for(const k of Progress.kinds){if(o.sss[k]&&Gear44.owns(o.sss[k]))Gear44.equipSSS(k,o.sss[k]);}}catch{}
   try{const st=Pilot67.state();(o.team||[]).forEach((id,i)=>{if(id==null||st.own[id])Pilot67.setSlot(i,id);});}catch{}
   try{gear=Progress.stats();}catch{}try{Combat.render();}catch{}try{Progress.render();}catch{}return true;}
 function lbtn(i){LS.act=i;if(!LS.sets[i]){LS.sets[i]=snap();lsave();T('ĐÃ LƯU ĐỘI HÌNH VÀO BỘ '+(i+1));}else{const ok=apply(LS.sets[i]);lsave();T(ok?'ĐÃ CHUYỂN SANG BỘ '+(i+1):'KHÔNG ĐỔI ĐƯỢC LÚC ĐANG CHƠI');}lpaint();}
 function lsaveAct(){LS.sets[LS.act]=snap();lsave();T('ĐÃ GHI ĐÈ BỘ '+(LS.act+1));lpaint();}
 let lrow=null;
 function lmount(){if(window.LOAD7===false){if(lrow)lrow.hidden=true;return;}const card=document.querySelector('#lb68 .lb68-card');if(!card)return;
   if(!lrow){lrow=document.createElement('div');lrow.className='ld7';lrow.innerHTML=[0,1,2].map(i=>`<button type="button" data-ld7="${i}"></button>`).join('')+'<button type="button" data-ld7="s" class="sv">LƯU</button>';
     lrow.addEventListener('click',e=>{const b=e.target.closest('[data-ld7]');if(!b)return;e.stopPropagation();if(b.dataset.ld7==='s')lsaveAct();else lbtn(+b.dataset.ld7);});}
   if(lrow.parentNode!==card.parentNode||lrow.nextSibling!==card)card.parentNode.insertBefore(lrow,card);lrow.hidden=false;lpaint();}
 function lpaint(){if(!lrow)return;lrow.querySelectorAll('[data-ld7]').forEach(b=>{const k=b.dataset.ld7;if(k==='s')return;const i=+k,o=LS.sets[i];b.classList.toggle('on',i===LS.act&&!!o);b.classList.toggle('em',!o);
   let sub='';if(o){try{sub=o.fus&&Fusion.resolve(o.fus)?(FusionBlueprints.names[Fusion.resolve(o.fus).model]||'Chiến Thần'):(Fighters28.profiles[o.craft]||{}).name||'';}catch{}}
   b.innerHTML=`<b>BỘ ${i+1}</b><small>${o?sub:'+ lưu'}</small>`;});}
 // =============== CODEX7 ===============
 const IMG=typeof CODEX7_IMG!=='undefined'?CODEX7_IMG:{};
 const cOn=()=>window.CODEX7!==false;
 function owned(){const o={ship:[],rob:[],sss:[]};try{for(let i=0;i<13;i++)if(Campaign36.ownsCraft(i))o.ship.push(i);}catch{}
   try{const sup=Fusion.getState().supers||[];for(let i=0;i<7;i++)if(sup.some(q=>q.model===i))o.rob.push(i);}catch{}
   try{for(const d of Gear44.defs())if(Gear44.owns(d.id))o.sss.push(d.id);}catch{}return o;}
 let BC=null,BT=0;function bonus(){const n=now();if(BC&&n-BT<2000)return BC;const o=owned();BC={atk:o.ship.length*.01+o.rob.length*.02,hp:o.rob.length*.02+o.sss.length*.01,o};BT=n;return BC;}
 function cHooks(){if(cHooks.d)return;cHooks.d=1;
   try{const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);try{return cOn()?v*(1+bonus().atk):v;}catch{return v;}};}catch{}
   try{const ost=Combat.stats;Combat.stats=function(){const r=ost.apply(this,arguments);try{if(cOn()&&r){const b=bonus(),a0=r.attack,h0=r.hp;r.attack*=1+b.atk;r.hp*=1+b.hp;r.cp=Math.round(r.cp+(r.attack-a0)*24+(r.hp-h0)*55);}}catch{}return r;};}catch{}
   try{const or=reset;const nr=function(){const r=or.apply(this,arguments);try{if(cOn()){const b=bonus();if(b.hp>0){maxHp=Math.round(maxHp*(1+b.hp)*10)/10;hp=maxHp;}}}catch{}return r;};window.reset=nr;try{reset=nr;}catch{}}catch{}}
 let cel=null,ctab='ship',csel=null;
 function shipImg(i,big){try{const s=SHIP118[String(i)];return s&&(s.tim||s.thuong||Object.values(s)[0]);}catch{return '';}}
 function cards(){const o=owned();
   if(ctab==='ship'){let P=[];try{P=Fighters28.profiles;}catch{}return P.slice(0,13).map((p,i)=>({k:'s'+i,img:shipImg(i),name:p.name,own:o.ship.includes(i)}));}
   if(ctab==='rob'){let N=[];try{N=FusionBlueprints.names;}catch{}return N.slice(0,7).map((n,i)=>({k:'r'+i,img:IMG['r'+i+'f'],img2:IMG['r'+i+'b'],name:n,own:o.rob.includes(i)}));}
   let D=[];try{D=Gear44.defs();}catch{}return D.map(d=>({k:'x'+d.id,img:IMG['x_'+d.id],name:d.name,own:o.sss.includes(d.id),d}));}
 const KN={armor:'Giáp',missiles:'Tên lửa',sidearm:'Tàu con'};
 function detail(c){if(!c)return '<p class="cx7-hint">Chạm một mẫu để xem phóng to và chỉ số gốc.</p>';let rows='';
   try{if(c.k[0]==='s'){const i=+c.k.slice(1),p=Fighters28.profiles[i],cp=craftProfile(i);rows=`<li>Vũ khí: <b>${p.weapon||'—'}</b></li><li>Máu gốc: <b>${cp.hp}</b> · Khiên: <b>${cp.shield}</b></li><li>Tốc độ: <b>${cp.speed}</b> · Nhịp bắn: <b>${p.rate}s</b></li>`;}
     else if(c.k[0]==='r'){const i=+c.k.slice(1),pr=FusionBlueprints.pairs[i],sk=FusionBlueprints.skills[i];const nm=j=>(Fighters28.profiles[j]||{}).name||('Tàu '+(j+1));
       rows=`<li>Công thức: <b>${nm(pr[0])}</b> + <b>${pr[0]===pr[1]?'tự thức tỉnh':nm(pr[1])}</b></li><li>Đặc kỹ: <b>${(sk&&(sk.name||sk))||'—'}</b></li><li>Sát thương dạng robot ×1,35 · đứng 5,0–8,5 s theo bậc</li>`;}
     else{const d=c.d,nm=id=>{try{return Progress.kindName?id:id;}catch{return id;}};rows=`<li>Loại: <b>${KN[d.kind]||d.kind}</b>${d.solo?' · TỰ THỨC TỈNH':''}</li><li>Hệ số sát thương SSS ×1,35</li><li>${(d.desc||d.effect||'').toString().slice(0,120)}</li>`;}}catch{}
   return `<div class="cx7-big ${c.own?'':'lk'}"><img src="${c.img||''}" alt="">${c.img2?`<img src="${c.img2}" alt="">`:''}</div><div class="cx7-dt"><h4>${c.name}${c.own?'':' <em>CHƯA CÓ</em>'}</h4><ul>${rows}</ul></div>`;}
 function render(){if(!cel)return;const b=bonus(),o=b.o;const pct=v=>'+'+Math.round(v*100)+'%';
   const C=cards();const cur=C.find(c=>c.k===csel)||null;
   cel.querySelector('.cx7-bonus').innerHTML=`<b>THƯỞNG SƯU TẦM</b><span>Công <i>${pct(b.atk)}</i></span><span>Máu <i>${pct(b.hp)}</i></span><small>Chiến cơ ${o.ship.length}/13 · Chiến Thần ${o.rob.length}/7 · SSS ${o.sss.length}/21</small>`;
   cel.querySelectorAll('[data-cx7t]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.cx7t===ctab)));
   cel.querySelector('.cx7-detail').innerHTML=detail(cur);
   cel.querySelector('.cx7-grid').className='cx7-grid t-'+ctab;
   cel.querySelector('.cx7-grid').innerHTML=C.map(c=>`<button type="button" class="cx7-c ${c.own?'':'lk'} ${c.k===csel?'sel':''}" data-cx7="${c.k}"><span>${c.img?`<img src="${c.img}" alt="">`:''}${c.img2&&ctab==='rob'?`<img class="b" src="${c.img2}" alt="">`:''}</span><small>${c.own?c.name:'???'}</small></button>`).join('');}
 function open(){if(!cOn())return;if(!cel){cel=document.createElement('div');cel.className='m63 cx7';cel.hidden=true;cel.innerHTML=`<div class="m63-card"><div class="m63-eye">BÁCH KHOA TOÀN THƯ</div><button class="m63-x" data-cx7x="1" aria-label="Đóng">×</button>
   <div class="cx7-bonus"></div><div class="cx7-tabs"><button data-cx7t="ship">13 CHIẾN CƠ</button><button data-cx7t="rob">7 CHIẾN THẦN</button><button data-cx7t="sss">21 TRANG BỊ SSS</button></div>
   <div class="cx7-detail"></div><div class="cx7-grid"></div><p class="cx7-note">Mỗi chiến cơ +1% Công · mỗi Chiến Thần +2% Công & Máu · mỗi món SSS +1% Máu (cộng vĩnh viễn cho cả đội).</p></div>`;
   cel.addEventListener('click',e=>{const t=e.target;if(t===cel||t.closest('[data-cx7x]')){cel.hidden=true;return;}const tb=t.closest('[data-cx7t]');if(tb){ctab=tb.dataset.cx7t;csel=null;render();return;}const c=t.closest('[data-cx7]');if(c){csel=c.dataset.cx7;render();}});document.body.appendChild(cel);}
   BC=null;render();cel.hidden=false;}
 function tile(){if(!cOn())return;const L=document.querySelector('#lb68 .l74.l74-l')||document.querySelector('.l74.l74-l');if(!L||L.querySelector('[data-cx7o]'))return;
   const b=document.createElement('button');b.type='button';b.className='l74-b cx7o';b.dataset.cx7o='1';b.style.setProperty('--lc','#7dd3fc');b.innerHTML='<i><b>📖</b></i><small>BÁCH KHOA</small>';
   b.addEventListener('click',e=>{e.stopPropagation();open();});L.appendChild(b);}
 // =============== móc chung ===============
 function hooks(){
  try{if(typeof update==='function'&&!update.__l7){const ou=update;const nu=function(dt){const r=ou.apply(this,arguments);try{envTick(Math.min(.05,dt||0));qTick();}catch{}return r;};nu.__l7=1;window.update=nu;try{update=nu;}catch{}}}catch{}
  try{if(typeof NEN194!=='undefined'&&!NEN194.__l7){NEN194.__l7=1;const od=NEN194.draw;NEN194.draw=function(){const r=od.apply(this,arguments);try{drawBack();}catch{}return r;};}}catch{}
  try{if(!VisualFX.__l7){VisualFX.__l7=1;const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{drawFront();}catch{}return r;};}}catch{}
  try{if(!Combat26.__l7){Combat26.__l7=1;const oc=Combat26.addCharge07;if(oc)Combat26.addCharge07=function(v){const a=[].slice.call(arguments);try{if(envOn()&&E.on&&E.type==='em'&&typeof a[0]==='number')a[0]*=1.25;}catch{}return oc.apply(this,a);};
    const ob=Combat26.breakWing;Combat26.breakWing=function(p){const was=p&&!p.dead;const r=ob.apply(this,arguments);try{if(was&&p.dead)Q('part7');}catch{}return r;};}}catch{}
  try{if(typeof kill==='function'&&!kill.__l7){const ok=kill;const f=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(was&&e.dead&&play()){let isB=false;try{isB=e===boss;}catch{}if(!isB)Q('kill7');}}catch{}return r;};f.__l7=1;kill=f;}}catch{}
  cHooks();}
 hooks();setTimeout(hooks,0);setTimeout(hooks,1500);
 setInterval(()=>{try{lmount();tile();}catch{}},500);
 return {E,start,stop,open,owned,bonus,snap,apply,LS,lpaint,render};
})();
