'use strict';
// V77 · TỦ ĐỒ GIÁM + BỘ CỘNG HƯỞNG SSS + DANH HIỆU BỘ SKIN (Gemini COLLECTION_RESONANCE_V77, 23/10).
//  Chỉnh cho đúng game:
//  • Game có 18 món SSS (6 giáp, 6 tên lửa, 6 tàu con), không phải 12 → chia 4 hệ theo món gốc, mỗi hệ có ≥1 món mỗi loại. Cộng hưởng tính trên SSS ĐANG KÍCH HOẠT ở 3 ô.
//  • Đồ giám = 10 chiến cơ + 27 trang bị (đạt Tím) + 18 SSS + 8 phi công (Tím +5) = 63 mục (Gemini tính 85).
//    Để giữ trần của Gemini: SSS 0,67%/món (18 món = 12%), phi công Tím+5 0,75%/người (8 người = 6%).
//  • Mốc 50% "hồi sinh miễn phí": mỗi ngày 1 lần đỡ đòn chí tử (hồi đầy máu, bất tử 2 s).
//  • Bộ Băng 3 món: bỏ "xuyên +1" (đạn chính không có cơ chế xuyên chung), giữ đóng băng đạn.
const CODEX77={
 SETS:{
  FIRE:{n:'Hỏa Diễm Nhiệt Hạch',ic:'🔥',col:'#ff6a1a',items:['sss_phase_reactive','sss_reactive_nanite','sss_stellar_inferno','sss_disc_solar','sss_solar_gravity'],
   two:{burnChance:.20,burnSec:3,burnPct:.15*1.15},three:{radius:85,dps:.30,fireballEvery:2,fireballPct:2.5}},
  ICE:{n:'Băng Phong Tuyệt Đối',ic:'❄',col:'#7fdcff',items:['sss_aegis_mirror','sss_inferno_cryo','sss_ricochet_prism','sss_prism_rail'],
   two:{slow:.12,maxShield:.10},three:{hp:.30,freeze:1.8,cd:45}},
  THUNDER:{n:'Lôi Đình Quang Phổ',ic:'⚡',col:'#ffe14a',items:['sss_nanite_aegis','sss_cryo_thunder','sss_spiral_stellar','sss_rail_disc'],
   two:{crit:.12,critMult:.30},three:{hits:8,targets:4,pct:1.8,graze:.5}},
  VOID:{n:'Hư Không Trọng Lực',ic:'🌀',col:'#b06cff',items:['sss_mirror_orbital','sss_orbital_phase','sss_thunder_singularity','sss_singularity_spiral','sss_gravity_ricochet'],
   two:{super:2,magnet:true},three:{every:15,dur:2.5,radius:110,dps:.8}}},
 CODEX:{ship:{atk:.01,hpPurple:.015},gearPurple:{sh:.003},sss:{atk:.0067,sh:.0067},pilotMax:{atk:.0075,hp:.0075},
  ms:{25:{drop:.05},50:{revive:1},75:{energy:.10},100:{all:.05,title:'Huyền Thoại Thiên Hà'}}},
 SKINSETS:[{n:'Hoàng Kim Thái Dương',title:'Quang Huy Tinh Quân',col:'#ffd166',items:['bul_gold','frm_wings','bom_supernova'],perk:'Tâm nhận đạn nhỏ hơn 0,5 px'},
  {n:'Hắc Ám Vô Tận',title:'Bóng Ma Hư Không',col:'#b06cff',items:['bul_void','frm_nebula','bom_blackhole'],perk:'Graze combo giữ 4,2 s (thay 3,5 s)'},
  {n:'Băng Tâm Bắc Cực',title:'Hàn Băng Thần Tướng',col:'#9fe8ff',items:['bul_frost','frm_cobalt','bom_shatter'],perk:'+8% tốc độ di chuyển'}]};
const Codex77=(()=>{
 const TAU=Math.PI*2,C=CODEX77,KEY='saobang-codex77';
 let S={rv:''};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const dayK=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 const k=()=>(typeof W!=='undefined'?W:480)/412;
 const playing=()=>typeof mode!=='undefined'&&mode==='play';
 // ---------- đồ giám ----------
 let cache=null,cacheT=0;
 function scan(){const now=Date.now();if(cache&&now-cacheT<1500)return cache;const o={ships:0,shipPurple:0,gearPurple:0,sss:0,pilotMax:0,total:63,list:{}};
  try{const cr=(Campaign36.getState().crafts||Progress.getState().crafts||[0]);o.ships=Math.min(10,new Set(cr).size);for(const i of cr){if(V70.craftN(i)>=3)o.shipPurple++;}}catch{}
  try{const seen=new Set();for(const it of Progress.v70.items()){if(!it||!it.variant||it.kind==='craft')continue;let n=null;try{n=V70.nOf(it);}catch{}if(n>=3)seen.add(it.variant);}o.gearPurple=Math.min(27,seen.size);}catch{}
  try{o.sss=Math.min(18,Object.keys(Gear44.state().owned||{}).length);}catch{}
  try{const st=Pilot67.state();for(const id in st.own){if(Pilot67.tierOf(+id)>=11)o.pilotMax++;}}catch{}
  o.done=o.ships+o.gearPurple+o.sss+o.pilotMax;o.pct=Math.min(100,Math.floor(o.done/o.total*100));
  const X=C.CODEX;o.atk=o.ships*X.ship.atk+o.sss*X.sss.atk+o.pilotMax*X.pilotMax.atk;o.hp=o.shipPurple*X.ship.hpPurple+o.pilotMax*X.pilotMax.hp;o.sh=o.gearPurple*X.gearPurple.sh+o.sss*X.sss.sh;
  if(o.pct>=100){o.atk+=X.ms[100].all;o.hp+=X.ms[100].all;o.sh+=X.ms[100].all;}
  o.drop=o.pct>=25?X.ms[25].drop:0;o.revive=o.pct>=50;o.energy=o.pct>=75?X.ms[75].energy:0;o.title=o.pct>=100?X.ms[100].title:'';
  cache=o;cacheT=now;return o;}
 // ---------- cộng hưởng ----------
 function activeSSS(){const L=[];try{for(const kd of ['armor','missiles','sidearm']){const d=Gear44.activeDef(kd);if(d&&d.tier==='sss')L.push(d.id);}}catch{}return L;}
 function sets(){const a=activeSSS(),out={};for(const [id,s] of Object.entries(C.SETS)){const n=s.items.filter(x=>a.includes(x)).length;if(n>=2)out[id]=n>=3?3:2;}return out;}
 const elemOf=id=>{for(const [k,s] of Object.entries(C.SETS))if(s.items.includes(id))return k;return null;};
 function skinSets(){let own=[];try{own=Trade67.state().owned||[];}catch{}return C.SKINSETS.map(s=>({...s,done:s.items.every(i=>own.includes(i)),have:s.items.filter(i=>own.includes(i)).length}));}
 // ---------- áp vào chỉ số ----------
 try{const ost=Combat.stats;Combat.stats=function(){const r=ost.apply(this,arguments);try{if(r){const o=scan();if(o.atk||o.hp||o.sh){const x={...r,attack:r.attack*(1+o.atk),hp:r.hp*(1+o.hp),armor:r.armor*(1+o.sh)};x.cp=Math.round(x.attack*24+x.hp*55+x.armor*65);return x;}}}catch{}return r;};}catch{}
 try{const ods=allyDamageScale;allyDamageScale=function(){let m=1;try{m=1+scan().atk;}catch{}return ods.apply(this,arguments)*m;};}catch{}
 // ---------- trạng thái trong trận ----------
 const R={act:{},burn:new Map(),fb:0,hitN:0,frz:0,frzCd:-99,vT:0,holes:[],arcs:[],prev:null,rvUsed:false};
 function onReset(){R.act=sets();R.burn.clear();R.fb=0;R.hitN=0;R.frz=0;R.frzCd=-99;R.vT=0;R.holes=[];R.arcs=[];R.prev=null;R.rvUsed=false;const o=scan();
  try{if(o.hp){maxHp=Math.round(maxHp*(1+o.hp)*10)/10;hp=maxHp;}let shm=1+o.sh+(R.act.ICE?C.SETS.ICE.two.maxShield:0);if(shm>1){maxShield=Math.round(maxShield*shm*10)/10;shield=Math.min(maxShield,Math.round(shield*shm*10)/10);}hud();}catch{}
  // danh hiệu bộ skin
  const ss=skinSets();window.HURT77=ss[0].done?.5:0;try{C76.GRAZE.WINDOW=ss[1].done?4.2:3.5;}catch{}R.speed=ss[2].done?1.08:1;
  try{CRIT77=R.act.THUNDER?C.SETS.THUNDER.two:null;}catch{}
  if(Object.keys(R.act).length)try{toast('CỘNG HƯỞNG · '+Object.entries(R.act).map(([k,n])=>C.SETS[k].ic+' '+C.SETS[k].n+' '+n+'/3').join(' · '));}catch{}}
 const avgAtk=()=>{let a=0,n=0;try{for(const s of shots)if(s.main66&&!s.dead&&s.damage>0){a+=s.damage;n++;}}catch{}return n?a/n:2;};
 function hurt(e,d){if(!e||e.dead||!(d>0))return;try{if(e===boss||e.bossPart){damageBoss(d,'set77',e);return;}e.hp-=d;Feedback31.damage(e,d,{gearKind:'auxiliary'});if(e.hp<=0)kill(e);}catch{}}
 function onHit(s,e){if(!s||!e||e.dead||!s.main66)return;
  if(R.act.FIRE&&Math.random()<C.SETS.FIRE.two.burnChance)R.burn.set(e,{t:C.SETS.FIRE.two.burnSec,d:(s.damage||1)*C.SETS.FIRE.two.burnPct});
  if(R.act.THUNDER===3){R.hitN++;if(R.hitN>=C.SETS.THUNDER.three.hits){R.hitN=0;const T=C.SETS.THUNDER.three;let from=e;const seen=new Set([e]);for(let i=0;i<T.targets;i++){const n=enemies.filter(x=>!x.dead&&!seen.has(x)&&Math.hypot(x.x-from.x,x.y-from.y)<170).sort((a,b)=>Math.hypot(a.x-from.x,a.y-from.y)-Math.hypot(b.x-from.x,b.y-from.y))[0];if(!n)break;seen.add(n);R.arcs.push({x:from.x,y:from.y,tx:n.x,ty:n.y,t:.18});hurt(n,(s.damage||1)*T.pct);from=n;}}}}
 function upd77(dt){if(!playing())return;const K=k();
  // bỏng
  for(const [e,b] of R.burn){if(e.dead){R.burn.delete(e);continue;}b.t-=dt;hurt(e,b.d*dt);if(b.t<=0)R.burn.delete(e);}
  if(R.act.FIRE===3){const T=C.SETS.FIRE.three,a=avgAtk();for(const e of enemies)if(!e.dead&&Math.hypot(e.x-player.x,e.y-player.y)<T.radius*K)hurt(e,a*T.dps*dt);
   if(superTime>0){R.fb-=dt;if(R.fb<=0){R.fb=T.fireballEvery;const L=enemies.filter(e=>!e.dead).sort((x,y)=>Math.hypot(x.x-player.x,x.y-player.y)-Math.hypot(y.x-player.x,y.y-player.y)).slice(0,2);if(boss&&!boss.dead&&L.length<2)L.push(boss);
    for(const t of L){try{FX16Run.addFx&&FX16Run.onKill({x:t.x,y:t.y,r:24,elite:1});}catch{}hurt(t,a*T.fireballPct);for(const e of enemies)if(!e.dead&&e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<60*K)hurt(e,a*T.fireballPct*.5);}}}}
  // băng
  if(R.act.ICE){for(const b of bullets)if(!b.ice77){b.ice77=1;b.vx*=1-C.SETS.ICE.two.slow;b.vy*=1-C.SETS.ICE.two.slow;}for(const e of enemies)if(!e.ice77&&e.v){e.ice77=1;e.v*=1-C.SETS.ICE.two.slow;}
   if(R.act.ICE===3){const T=C.SETS.ICE.three;if(R.frz>0){R.frz-=dt;if(R.frz<=0)for(const b of bullets)if(b.fz77){b.vx=b.fz77[0];b.vy=b.fz77[1];delete b.fz77;}}
    else if(time-R.frzCd>T.cd&&(hp/maxHp<T.hp||(maxShield>0&&shield/maxShield<T.hp&&hp<maxHp))){R.frzCd=time;R.frz=T.freeze;for(const b of bullets)if(!b.dead){b.fz77=[b.vx,b.vy];b.vx=0;b.vy=0;}try{toast('❄ BĂNG TÂM TUYỆT ĐỐI · ĐÓNG BĂNG ĐẠN');}catch{}}
    if(R.frz>0)for(const b of bullets)if(!b.dead&&!b.fz77){b.fz77=[b.vx,b.vy];b.vx=0;b.vy=0;}}}
  // hư vô
  if(R.act.VOID){for(const d of drops){if(d.dead)continue;const a=Math.atan2(player.y-d.y,player.x-d.x);d.x+=Math.cos(a)*420*dt;d.y+=Math.sin(a)*420*dt;}
   if(R.act.VOID===3){R.vT+=dt;if(R.vT>=C.SETS.VOID.three.every){R.vT=0;hole(player.x,player.y-160*K);}}}
  for(const h of R.holes){h.t+=dt;const T=C.SETS.VOID.three,r=T.radius*K;for(const b of bullets)if(!b.dead){const d=Math.hypot(b.x-h.x,b.y-h.y);if(d<r){if(d<16)b.dead=true;else{b.x+=(h.x-b.x)*dt*4;b.y+=(h.y-b.y)*dt*4;}}}
   const a=avgAtk();for(const e of enemies)if(!e.dead&&!e.elite&&!e.large&&Math.hypot(e.x-h.x,e.y-h.y)<r)hurt(e,a*T.dps*dt);}
  R.holes=R.holes.filter(h=>h.t<C.SETS.VOID.three.dur);for(const a of R.arcs)a.t-=dt;R.arcs=R.arcs.filter(a=>a.t>0);
  // tốc độ (bộ skin Băng)
  if(R.speed>1&&R.prev){player.x=Math.max(10,Math.min(W-10,R.prev.x+(player.x-R.prev.x)*R.speed));player.y=Math.max(10,Math.min(H-10,R.prev.y+(player.y-R.prev.y)*R.speed));}R.prev={x:player.x,y:player.y};}
 function hole(x,y){R.holes.push({x,y,t:0});try{FX16Run.addFx('shockwave_02',x,y,40*k(),C.SETS.VOID.three.radius*2.2*k(),700,{col:'#b06cff'});}catch{}}
 function draw(){if(!playing()&&mode!=='pause')return;const K=k();ctx.save();
  if(R.act.FIRE===3){const r=C.SETS.FIRE.three.radius*K,g=ctx.createRadialGradient(player.x,player.y,r*.4,player.x,player.y,r);g.addColorStop(0,'rgba(255,68,0,0)');g.addColorStop(.8,'rgba(255,120,0,.18)');g.addColorStop(1,'rgba(255,200,0,.45)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(player.x,player.y,r,0,TAU);ctx.fill();
   ctx.strokeStyle='rgba(255,100,0,.7)';ctx.lineWidth=2;ctx.setLineDash([12,8]);ctx.lineDashOffset=-time*60;ctx.beginPath();ctx.arc(player.x,player.y,r,0,TAU);ctx.stroke();ctx.setLineDash([]);}
  for(const [e] of R.burn){if(e.dead)continue;ctx.globalAlpha=.6;ctx.fillStyle='#ff6a1a';ctx.beginPath();ctx.arc(e.x+Math.sin(time*9+e.x)*6,e.y-10,3,0,TAU);ctx.fill();}
  ctx.globalAlpha=1;ctx.strokeStyle='#fff6a0';ctx.lineWidth=2;for(const a of R.arcs){ctx.globalAlpha=a.t/.18;ctx.beginPath();ctx.moveTo(a.x,a.y);for(let i=1;i<=5;i++){const u=i/5;ctx.lineTo(a.x+(a.tx-a.x)*u+(i<5?(Math.random()-.5)*14:0),a.y+(a.ty-a.y)*u+(i<5?(Math.random()-.5)*14:0));}ctx.stroke();}
  for(const h of R.holes){const u=h.t/C.SETS.VOID.three.dur,r=C.SETS.VOID.three.radius*K;ctx.globalAlpha=.55*(1-u*.5);const g=ctx.createRadialGradient(h.x,h.y,4,h.x,h.y,r);g.addColorStop(0,'#000');g.addColorStop(.35,'rgba(60,0,110,.8)');g.addColorStop(1,'rgba(176,108,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(h.x,h.y,r,0,TAU);ctx.fill();}
  if(R.frz>0){ctx.globalAlpha=.12;ctx.fillStyle='#9fe8ff';ctx.fillRect(0,0,W,H);}
  // huy hiệu cộng hưởng dưới thanh máu
  const A=Object.entries(R.act);if(A.length){ctx.globalAlpha=1;ctx.font=`800 ${Math.round(10*K)}px sans-serif`;ctx.textAlign='left';let x=12*K;for(const [kk,n] of A){const s=C.SETS[kk];const t=s.ic+' '+n+'/3';ctx.fillStyle='#06111bcc';ctx.fillRect(x-3,64*K,ctx.measureText(t).width+8,15*K);ctx.fillStyle=s.col;ctx.fillText(t,x+1,75*K);x+=ctx.measureText(t).width+14;}}
  ctx.restore();}
 // ---------- cài đặt ----------
 function install(){
  try{const ors=reset;reset=function(){const r=ors.apply(this,arguments);try{if(mode==='play')onReset();}catch(e){console.warn('Codex77',e);}return r;};}catch{}
  try{const oh=Arsenal30.hit;Arsenal30.hit=function(s,e){const r=oh.apply(this,arguments);try{onHit(s,e);}catch{}return r;};}catch{}
  try{const ou=window.update;window.update=function(dt){const r=ou.apply(this,arguments);try{upd77(dt);}catch(e){}return r;};}catch{}
  try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{draw();}catch{}return r;};}catch{}
  try{const oas=activateSuper;activateSuper=function(){const r=oas.apply(this,arguments);try{if(R.act.VOID)superTime=Math.min(14,superTime+C.SETS.VOID.two.super);}catch{}return r;};}catch{}
  try{const og=Combat26.graze;Combat26.graze=function(){const r=og.apply(this,arguments);try{if(r&&R.act.THUNDER===3)Combat26.addCharge07(5*C.SETS.THUNDER.three.graze);}catch{}return r;};}catch{}
  try{const ok=kill;kill=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(was&&e.dead&&R.act.VOID===3&&(e.elite||e.aff76))hole(e.x,e.y);}catch{}return r;};}catch{}
  // mốc 50%: đỡ 1 đòn chí tử mỗi ngày
  try{const od=damage;damage=function(){try{if(playing()&&!window.__norv91&&!R.rvUsed&&hp<=1&&shield<=0&&invuln<=0&&scan().revive&&S.rv!==dayK()){S.rv=dayK();save();R.rvUsed=true;hp=maxHp;invuln=2;try{ring(player.x,player.y,'#ffe28a',90);toast('✦ ĐỒ GIÁM 50% · HỒI SINH MIỄN PHÍ (1 lần/ngày)');hud();}catch{}return;}}catch{}return od.apply(this,arguments);};}catch{}
  // mốc 25%: +5% hợp kim & đá từ ải
  try{const orw=Progress.rewardStage;Progress.rewardStage=function(){const b0=Progress.balance();let e0=0;try{e0=Workshop.expBalance();}catch{}const r=orw.apply(this,arguments);try{const dr=scan().drop;if(dr){const dc=Progress.balance()-b0,de=Workshop.expBalance()-e0;if(dc>0)Progress.grantCredits(Math.round(dc*dr));if(de>0)Workshop.grant({exp:Math.round(de*dr)});}}catch{}return r;};}catch{}
  // mốc 75%: −10% thể lực chơi lại
  try{window.ENERGY77=()=>1-scan().energy;}catch{}}
 setTimeout(()=>{try{install();}catch(e){console.warn('Codex77 install',e);}},0);
 // ---------- giao diện ----------
 let el=null,tab='codex';
 function open(t){if(t)tab=t;if(!el){el=document.createElement('div');el.className='m63 cx77p';document.body.appendChild(el);el.addEventListener('click',e=>{const b=e.target.closest('[data-cx]');if(!b){if(e.target===el)el.hidden=true;return;}if(b.dataset.cx==='x')el.hidden=true;else if(b.dataset.cx==='tab'){tab=b.dataset.t;render();}});}cache=null;render();el.hidden=false;}
 const pc=x=>(x*100).toFixed(x*100<10?1:0).replace('.',',')+'%';
 function render(){if(!el)return;const o=scan();let body='';
  if(tab==='codex'){const row=(n,have,max,eff)=>`<div class="cx-r"><b>${n}</b><div class="cx-pb"><i style="width:${have/max*100}%"></i></div><em>${have}/${max}</em><small>${eff}</small></div>`;
   body=`<div class="cx-big"><b>${o.pct}%</b><small>${o.done}/${o.total} mục · Công +${pc(o.atk)} · Máu +${pc(o.hp)} · Giáp +${pc(o.sh)}</small></div>
    ${row('Chiến cơ sở hữu',o.ships,10,'+1% Công mỗi chiếc · đạt Tím +1,5% Máu ('+o.shipPurple+' chiếc Tím)')}
    ${row('Trang bị đạt Tím',o.gearPurple,27,'+0,3% Giáp mỗi mẫu')}${row('Trang bị SSS',o.sss,18,'+0,67% Công & Giáp mỗi món')}${row('Phi công Tím +5',o.pilotMax,8,'+0,75% Công & Máu mỗi người')}
    <div class="cx-ms">${[[25,'+5% hợp kim & đá từ ải'],[50,'Hồi sinh miễn phí 1 lần/ngày'],[75,'−10% thể lực chơi lại ải'],[100,'Danh hiệu Huyền Thoại Thiên Hà · +5% Công/Máu/Giáp']].map(([p,t])=>`<span class="${o.pct>=p?'on':''}"><b>${p}%</b> ${t}</span>`).join('')}</div>`;}
  else if(tab==='set'){const act=sets(),a=activeSSS();
   body=`<p class="cx-s">Lắp 2 hoặc 3 món SSS cùng hệ ở 3 ô (giáp, tên lửa, tàu con) để mở cộng hưởng trong trận.</p>`+Object.entries(C.SETS).map(([id,s])=>{const n=s.items.filter(x=>a.includes(x)).length;const nm=s.items.map(x=>{let nn=x;try{nn=(GEAR_FX.defs?GEAR_FX.defs[x]:null)?.name||x;}catch{}return `<i class="${a.includes(x)?'on':''}">${nameOf(x)}</i>`;}).join('');
    const T2=id==='FIRE'?'Mọi đòn đạn chính 20% thiêu đốt 3 s':id==='ICE'?'Quái & đạn địch chậm 12% · +10% Giáp tối đa':id==='THUNDER'?'+12% tỉ lệ chí mạng · +30% sát thương chí mạng':'Bạo Tẩu +2 s · hút vật phẩm toàn màn';
    const T3=id==='FIRE'?'Quầng lửa 85 px đốt 30% Công/giây; Bạo Tẩu bắn 2 cầu lửa 250%':id==='ICE'?'Máu/giáp dưới 30%: đóng băng toàn bộ đạn 1,8 s (hồi 45 s)':id==='THUNDER'?'Mỗi 8 đòn trúng: sét lan 4 mục tiêu 180% · Graze nạp thêm 50%':'Hạ tinh anh hoặc mỗi 15 s: hố đen 2,5 s hút đạn, đốt lính nhỏ 80%';
    return `<div class="cx-set ${act[id]?'on':''}" style="--sc:${s.col}"><b>${s.ic} ${s.n} <em>${n}/3</em></b><div class="cx-it">${nm}</div><small class="${n>=2?'on':''}">2 món: ${T2}</small><small class="${n>=3?'on':''}">3 món: ${T3}</small></div>`;}).join('');}
  else{body=skinSets().map(s=>`<div class="cx-set ${s.done?'on':''}" style="--sc:${s.col}"><b>${s.n} <em>${s.have}/3</em></b><small>Danh hiệu: <b>${s.title}</b></small><small class="${s.done?'on':''}">Đặc quyền: ${s.perk}</small></div>`).join('')+(o.title?`<p class="cx-s">🏆 Danh hiệu Đồ giám: <b>${o.title}</b></p>`:'');}
  el.innerHTML=`<div class="m63-card cx-card"><div class="cx-top"><b>ĐỒ GIÁM & CỘNG HƯỞNG</b><button data-cx="x" class="cx-x">✕</button></div>
   <div class="cx-tabs">${[['codex','📚 Đồ giám'],['set','⚛ Cộng hưởng SSS'],['skin','👑 Bộ skin']].map(([kk,n])=>`<button data-cx="tab" data-t="${kk}" aria-pressed="${kk===tab}">${n}</button>`).join('')}</div>${body}</div>`;}
 function nameOf(id){try{const d=GEAR_FX.byId[id];if(d&&d.name)return d.name;}catch{}return id;}
 // tiêu đề dưới tên ở sảnh
 setInterval(()=>{try{const c=document.querySelector('#lb68 .lb68-card');if(!c)return;const ts=skinSets().filter(s=>s.done).map(s=>s.title);const o=scan();if(o.title)ts.unshift(o.title);let t=c.querySelector('.cx-title');if(!ts.length){if(t)t.remove();return;}if(!t){t=document.createElement('small');t.className='cx-title';c.appendChild(t);}t.textContent='👑 '+ts.join(' · ');}catch{}},2000);
 return {scan,sets,elemOf,skinSets,open,state:()=>({act:R.act,frz:R.frz,holes:R.holes.length,burn:R.burn.size})};
})();
var CRIT77=null;
