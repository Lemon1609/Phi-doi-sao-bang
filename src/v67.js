'use strict';
// V67 · C4: CHƯƠNG 9 "TINH VÂN ĐEN" (ải 161–180) + chế độ NGUYỆT THỰC (E1–E160) + BỤI TINH VÂN.
//  Thiết kế: Gemini (GEMINI_TRA_LOI_DAN_C4.md). Claude chỉnh số cho khớp cân đối cuối game (Endgame66):
//   • Lực chiến đề nghị Chương 9 nối tiếp đường cũ (ải 160: 14.000 → ải 180: ~21.000) thay vì 3.065–3.920 của Gemini.
//   • Nguyệt Thực: lực chiến đề nghị = ải thường cùng số × 1,6 (Gemini: 1.850 + 18·(s−1), dựa đường cũ).
//   • Mở Chương 9: vượt ải 160 VÀ (có ≥ 1 món SSS hoặc siêu chiến cơ, HOẶC lực chiến ≥ 12.000).
//  Tranh: GPT Đợt 8 (src/ch9/*).
const CH9_ART=typeof CH9_ASSETS!=='undefined'?CH9_ASSETS:{};
const CH9={from:161,to:180,unlockCP:12000,
 chapter:{name:'Tinh Vân Đen',set:'NEBULA',hazard:'nebula',bg:'#07040d',glow:'#5a1d7a55',story:'Vượt qua lõi sao, phi đội chạm trán thực thể nuốt ánh sáng. Phá vỡ Tinh Vân Đen để kết thúc cơn ác mộng của dải ngân hà.'},
 hazard:{vortexEvery:14,vortexLife:5,vortexR:48,vortexPull:55,vortexClear:140,meteorEvery:9,meteorWarn:1.2,meteorSpeed:420},
 // thưởng THÊM so với ải thường (lần đầu / lặp lại) — Gemini: 1.200…6.000 HK lần đầu
 first:n=>({credits:n===180?4500:500+30*(n-160)+(n%10===0?900:n%5===0?400:0),exp:n===180?120:20+(n%5===0?20:0),dust:n===180?15:n%10===0?5:n%5===0?3:1}),
 again:n=>({credits:n===180?400:60+8*(n-160),dust:n===180?1:n%5===0?(Math.random()<.5?1:0):0})};
const ECL={req:1.6,hp:2.2,hpElite:2.6,hpBoss:2.4,dmg:1.5,speed:1.18,burst:1,cap:30,sweep:5,
 unlockCleared:60,chapStars:45,dustPer:10,dustPct:.01,dustCap:.25};

// ---------- V67 · hàng biểu tượng VIỄN CHINH / PHI CÔNG / GIAO DỊCH trong khung chiến cơ ở Kho (thay vì thêm nút vào cột phải) ----------
const DOCK67_ICON={ex67:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10.5" ry="3.6" transform="rotate(-24 12 12)"/></svg>',
 pl67:'<svg viewBox="0 0 24 24"><path d="M5 13a7 7 0 0 1 14 0v3H5z"/><path d="M8 13h8v3H8z"/><path d="M12 6V3"/></svg>',
 tr67:'<svg viewBox="0 0 24 24"><path d="M5 9h14l-1.5 11h-11z"/><path d="M9 9a3 3 0 0 1 6 0"/><path d="M12 13v4"/></svg>'};
function dock67(){const st=document.querySelector('#hgr41 .h1-stage');if(!st)return null;let d=st.querySelector('.dk67');if(!d){d=document.createElement('div');d.className='dk67';st.appendChild(d);}return d;}
function dock67btn(key,label,fn){const d=dock67();if(!d)return null;let b=d.querySelector(`[data-${key}]`);if(!b){b=document.createElement('button');b.dataset[key]='1';b.className='dk67b';b.innerHTML=`<i>${DOCK67_ICON[key]||''}</i><small>${label}</small>`;b.addEventListener('click',e=>{e.stopPropagation();fn();});const order=['ex67','pl67','tr67'];const after=[...d.children].find(c=>order.indexOf(Object.keys(c.dataset)[0])>order.indexOf(key));d.insertBefore(b,after||null);}return b;}

// ---------- Bụi Tinh Vân (tiền tệ mới + nội tại) ----------
const Dust67=(()=>{const KEY='saobang-nebula-v67';let S={dust:0,titles:[]};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const bonus=()=>Math.min(ECL.dustCap,Math.floor((S.dust||0)/ECL.dustPer)*ECL.dustPct);
 function add(n){n=Math.max(0,n|0);if(!n)return;S.dust=(S.dust||0)+n;save();}
 function spend(n){if((S.dust||0)<n)return false;S.dust-=n;save();return true;}
 function title(t){if(!S.titles.includes(t)){S.titles.push(t);save();}}
 // +1% sát thương & +1% giáp mỗi 10 bụi (tối đa +25%)
 const ods=allyDamageScale;allyDamageScale=function(){return ods.apply(this,arguments)*(1+bonus());};
 const ors=reset;reset=function(){const r=ors.apply(this,arguments);try{const b=bonus();if(b>0&&mode==='play'){maxShield*=1+b;shield=Math.min(maxShield,shield*(1+b));}}catch{}return r;};
 return {get:()=>S.dust||0,add,spend,bonus,title,titles:()=>[...S.titles]};})();

// ---------- Chương 9 ----------
const Ch9=(()=>{
 // nối CHAPTERS36 / MISSIONS
 try{if(CHAPTERS36.length<9)CHAPTERS36.push(CH9.chapter);}catch{}
 try{if(MISSIONS.length<180){const c=CH9.chapter;for(let id=161;id<=180;id++)MISSIONS.push({id,name:c.name+' · Ải '+id,short:'ẢI '+id,duration:30,bg:c.bg,glow:c.glow,hazard:c.hazard,icon:id%10===0?'♛':id%5===0?'◆':'✧',desc:c.story,boss:id%10===0?'MAJOR DREADNOUGHT':'PHÁO HẠM TINH ANH',kind:2,credits:45+id*3,rates:[100,0,0,0]});}}catch{}
 let oAt=0,oVal=false;
 function ownsSSS(){try{if(Object.keys(Gear44.state().owned||{}).length)return true;}catch{}try{if((Fusion.getState().supers||[]).length)return true;}catch{}return false;}
 function open(){const now=Date.now();if(now-oAt<1500)return oVal;oAt=now;let v=false;try{v=Progress.getState().cleared.includes(160)&&(ownsSSS()||Combat.stats().cp>=CH9.unlockCP);}catch{}oVal=v;return v;}
 const is=lv=>lv>=CH9.from&&lv<=CH9.to;
 const inCh9=()=>{try{return gameMode==='campaign'&&!Dungeons.active()&&is(level)&&!Eclipse67.active();}catch{return false;}};
 // ảnh
 const IM={};for(const k of ['body','rage','wl','wr','bg'])if(CH9_ART[k]){const im=new Image();im.src=CH9_ART[k];IM[k]=im;}
 const ok=k=>IM[k]&&IM[k].complete&&IM[k].naturalWidth>0;
 function bgFor(lv){try{if(gameMode==='campaign'&&is(lv)&&ok('bg'))return IM.bg;}catch{}return null;}
 // Campaign36.chapter: ải 161–180 là chương 9 (chỉ số 8)
 try{const och=Campaign36.chapter;Campaign36.chapter=function(n){return n>160?8:och.apply(this,arguments);};}catch{}
 // Campaign36.render: chương 9 không có bộ mảnh → hiển thị như ải 160
 try{const orn=Campaign36.render;Campaign36.render=function(stage){return orn.call(this,stage>160?160:stage);};}catch{}
 // thêm lựa chọn ải 161–180 vào ô chọn ải (nếu bảng được vẽ trước khi MISSIONS nối thêm)
 function ensureOptions(){const sel=document.getElementById('mission-select');if(!sel)return;for(let id=161;id<=180;id++){if(!sel.querySelector(`option[value="${id}"]`)){const o=document.createElement('option');o.value=String(id);o.textContent='Ch.9 · Ải '+id;sel.appendChild(o);}const o=sel.querySelector(`option[value="${id}"]`);o.disabled=!Progress.canStart(id);}}
 // ---------- thưởng thêm ----------
 const orw=Progress.rewardStage;Progress.rewardStage=function(stage){if(typeof Eclipse67!=='undefined'&&Eclipse67.active())return Eclipse67.reward(stage);
  const first=is(stage)&&!Progress.getState().cleared.includes(stage);const r=orw.apply(this,arguments);
  try{if(r&&is(stage)){const x=first?CH9.first(stage):CH9.again(stage);if(x.credits){Progress.grantCredits(x.credits);r.credits+=x.credits;}if(x.exp){Workshop.grant({exp:x.exp});}if(x.dust){Dust67.add(x.dust);(r.materials=r.materials||[]).push(x.dust+' Bụi Tinh Vân');}
   if(first&&stage===180){Dust67.title('Chúa Tể Tinh Vân');try{toast('★ DANH HIỆU: CHÚA TỂ TINH VÂN');}catch{}}}}catch{}return r;};
 // ---------- môi trường: xoáy hố đen + mưa phản vật chất ----------
 let vT=8,mT=5,meteors=[],cols=[];
 function resetHaz(){vT=8;mT=5;meteors=[];cols=[];}
 function hazards(dt){if(!inCh9()||boss||Waves30.state().wave<1)return;const H9=CH9.hazard;
  vT-=dt;if(vT<=0){vT=H9.vortexEvery;const B=Bullet66.cur();const e=addEnemy({x:60+Math.random()*(W-120),y:180+Math.random()*280,v:0,type:0,large:false,elite:false,guard:0,hp:4.5*2.5,fire:1e9,age:0,phase:0,dead:false,vortex67:true,life67:H9.vortexLife});e.burst30=0;}
  mT-=dt;if(mT<=0){mT=H9.meteorEvery;for(let k=0;k<2;k++)cols.push({x:40+Math.random()*(W-80),t:0});}
  for(const c of cols){c.t+=dt;if(c.t>=H9.meteorWarn&&!c.done){c.done=true;meteors.push({x:c.x,y:-40,r:18});}}cols=cols.filter(c=>c.t<H9.meteorWarn+.1);
  for(const m of meteors){m.y+=H9.meteorSpeed*dt;if(!m.hit&&Math.hypot(m.x-player.x,m.y-player.y)<m.r+10){m.hit=true;try{damage('bullet');}catch{}}}meteors=meteors.filter(m=>m.y<H+60);
  for(const e of enemies){if(!e.vortex67||e.dead)continue;e.x=clamp(e.x,30,W-30);e.life67-=dt;const d=Math.hypot(e.x-player.x,e.y-player.y);if(d>8&&d<320){const a=Math.atan2(e.y-player.y,e.x-player.x);player.x+=Math.cos(a)*H9.vortexPull*dt;player.y+=Math.sin(a)*H9.vortexPull*dt;}
   if(e.life67<=0){e.dead=true;}}}
 const okl=kill;kill=function(e){const was=e&&e.dead;const r=okl.apply(this,arguments);try{if(e&&e.vortex67&&!was&&e.life67>0&&Math.hypot(e.x-player.x,e.y-player.y)>34){bullets=bullets.filter(b=>Math.hypot(b.x-e.x,b.y-e.y)>CH9.hazard.vortexClear);ring(e.x,e.y,'#c77dff',CH9.hazard.vortexClear);if(superTime<=0)Safety31.push(drops,100,{x:e.x,y:e.y,type:'super',t:0,vx:0,vy:-90,ph:0,v40:true});}}catch{}return r;};
 // ---------- Boss tối thượng ải 180 ----------
 const isBoss180=b=>b&&b===boss&&gameMode==='campaign'&&level===180&&!Eclipse67.active();
 let laser=null,lasT=7,orbT=3.2,orbs=[],raged=false,dropAt=[.2,.1],stunGuard=0;
 function resetBoss(){laser=null;lasT=7;orbT=3.2;orbs=[];raged=false;dropAt=[.2,.1];}
 try{const osb=Combat26.setupBoss;Combat26.setupBoss=function(b){try{if(b&&!b.bossHealthReady&&gameMode==='campaign'&&level===180&&!Eclipse67.active()){b.max*=2.1;b.hp=b.max;b.hitW=110;b.hitH=70;b.ch9=true;}}catch{}const r=osb.apply(this,arguments);try{if(b&&b.ch9)for(const p of b.parts||[]){p.hitW=42;p.hitH=42;}}catch{}return r;};}catch{}
 try{const osp=Combat26.syncParts;Combat26.syncParts=function(b){const r=osp.apply(this,arguments);try{if(b&&b.ch9)for(const p of b.parts||[]){p.x=b.x+p.side*143;p.y=b.y-4;}}catch{}return r;};}catch{}
 function bossUpdate(dt){const b=boss;if(!isBoss180(b)||!b.bossHealthReady)return;const f=b.hp/b.max;
  if(stunGuard>0){stunGuard-=dt;b.stun66=0;}
  if(f<.3&&!raged){raged=true;b.rage67=true;b.noStun67=true;invuln=Math.max(invuln,.3);b.frozen=0;try{for(const p of b.parts||[])if(!p.dead)Combat26.breakWing(p);}catch{}stunGuard=.3;ring(b.x,b.y,'#ff3b4f',160);try{toast('⚠ THỰC THỂ THỨC TỈNH · DẠNG CUỒNG NỘ');}catch{}}
  for(let i=0;i<dropAt.length;i++)if(f<dropAt[i]){dropAt.splice(i,1);if(window.Bal787&&Bal787.bossDrop)Bal787.bossDrop(b.x,b.y+40,'low');else Safety31.push(drops,100,{x:b.x,y:b.y+40,type:'super',t:0,vx:0,vy:-90,ph:0,v40:true});break;}
  if((b.stun66||0)>0)return;
  if(f<.65){lasT-=dt;if(lasT<=0&&!laser){lasT=7;laser={x:player.x,t:0,warn:.9,on:1.5,tick:0};}}
  if(laser){laser.t+=dt;if(laser.t>laser.warn){laser.tick-=dt;if(laser.tick<=0&&Math.abs(player.x-laser.x)<32&&player.y>b.y){laser.tick=.25;try{damage('bullet');}catch{}}}if(laser.t>laser.warn+laser.on)laser=null;}
  if(raged){orbT-=dt;if(orbT<=0){orbT=3.2;for(const s of [-1,1])orbs.push({x:b.x+s*40,y:b.y+30,vx:s*40,vy:190,t:0});}
   for(const o of orbs){o.t+=dt;o.x+=o.vx*dt;o.y+=o.vy*dt;if(!o.split&&o.t>1.4){o.split=true;for(let k=0;k<8;k++)try{emit(o.x,o.y,k*TAU/8,340/enemyScale(),'orb');}catch{}}
    if(!o.split&&Math.hypot(o.x-player.x,o.y-player.y)<20){o.split=true;try{damage('bullet');}catch{}}}orbs=orbs.filter(o=>!o.split&&o.y<H+40);}}
 function drawBoss180(b){const R=b.rage67&&ok('rage')?IM.rage:IM.body;const s=.4,w=640*s,h=512*s;
  for(const p of b.parts||[]){if(p.dead)continue;const im=p.side<0?IM.wl:IM.wr;if(im&&im.complete)ctx.drawImage(im,p.x-128*s*1.15,p.y-128*s*1.15,256*s*1.15,256*s*1.15);}
  ctx.drawImage(R,b.x-w/2,b.y-h/2+14,w,h);return true;}
 try{const omd=Major36.draw;Major36.draw=function(b){try{if(b&&b.ch9&&ok('body')){drawBoss180(b);return true;}}catch{}return omd.apply(this,arguments);};}catch{}
 try{const obd=BossBake3D.draw;BossBake3D.draw=function(b){try{if(b&&b.ch9&&ok('body')){drawBoss180(b);return true;}}catch{}return obd.apply(this,arguments);};}catch{}
 function draw(){if(!(mode==='play'||mode==='pause'))return;ctx.save();ctx.globalCompositeOperation='source-over';
  for(const c of cols){const a=.25+.35*Math.abs(Math.sin(c.t*14));ctx.fillStyle=`rgba(199,125,255,${a})`;ctx.fillRect(c.x-22,0,44,H);ctx.strokeStyle='#e9c4ff';ctx.lineWidth=1.5;ctx.strokeRect(c.x-22,0,44,H);}
  for(const m of meteors){const g=ctx.createRadialGradient(m.x,m.y,2,m.x,m.y,m.r+8);g.addColorStop(0,'#ffe9ff');g.addColorStop(.4,'#b5179e');g.addColorStop(1,'#2a0a3a00');ctx.fillStyle=g;ctx.beginPath();ctx.arc(m.x,m.y,m.r+8,0,TAU);ctx.fill();ctx.fillStyle='#1a0820';ctx.beginPath();ctx.arc(m.x,m.y,m.r*.6,0,TAU);ctx.fill();}
  for(const e of enemies){if(!e.vortex67||e.dead)continue;const r=CH9.hazard.vortexR;ctx.save();ctx.translate(e.x,e.y);ctx.rotate(time*3);for(let k=0;k<3;k++){ctx.strokeStyle=k?'#7b2cbf':'#e0aaff';ctx.globalAlpha=.8-k*.2;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r-k*12,k,k+4.2);ctx.stroke();}ctx.globalAlpha=1;ctx.fillStyle='#05010a';ctx.beginPath();ctx.arc(0,0,14,0,TAU);ctx.fill();ctx.restore();}
  if(laser){if(laser.t<laser.warn){ctx.fillStyle=`rgba(255,40,60,${.18+.2*Math.abs(Math.sin(laser.t*20))})`;ctx.fillRect(laser.x-32,boss?boss.y:0,64,H);ctx.strokeStyle='#ff3b4f';ctx.lineWidth=2;ctx.setLineDash([10,8]);ctx.strokeRect(laser.x-32,boss?boss.y:0,64,H);ctx.setLineDash([]);}
   else{const g=ctx.createLinearGradient(laser.x-32,0,laser.x+32,0);g.addColorStop(0,'#ff3b4f00');g.addColorStop(.3,'#ff3b4fcc');g.addColorStop(.5,'#fff0f0');g.addColorStop(.7,'#ff3b4fcc');g.addColorStop(1,'#ff3b4f00');ctx.fillStyle=g;ctx.fillRect(laser.x-32,boss?boss.y:0,64,H);}}
  for(const o of orbs){ctx.fillStyle='#ff3b4f';ctx.beginPath();ctx.arc(o.x,o.y,14,0,TAU);ctx.fill();ctx.fillStyle='#fff3c4';ctx.beginPath();ctx.arc(o.x,o.y,6,0,TAU);ctx.fill();ctx.strokeStyle='#1a0408';ctx.lineWidth=2;ctx.beginPath();ctx.arc(o.x,o.y,15,0,TAU);ctx.stroke();}
  ctx.restore();}
 const ovd=VisualFX.draw;VisualFX.draw=function(){const r=ovd.apply(this,arguments);try{draw();}catch{}return r;};
 const oup=update;update=function(dt){const r=oup.apply(this,arguments);try{if(mode==='play'){hazards(dt);bossUpdate(dt);}}catch(e){try{Safety31.report(e);}catch{}}return r;};
 const orr=reset;reset=function(){resetHaz();resetBoss();return orr.apply(this,arguments);};
 const ons=nextStage;nextStage=function(){resetHaz();resetBoss();return ons.apply(this,arguments);};
 setInterval(()=>{try{if(!['play','pause'].includes(mode))ensureOptions();}catch{}},1500);
 return {open,is,inCh9,bgFor,ok,IM,ensureOptions,state:()=>({laser:!!laser,orbs:orbs.length,meteors:meteors.length,raged})};
})();

// ---------- NGUYỆT THỰC ----------
const Eclipse67=(()=>{
 const KEY='saobang-eclipse-v67';let S={cleared:[],stars:{},sweep:{day:'',used:0},claims:[]};
 try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 let act=false,pending=false;
 const day=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 const ch=s=>Math.floor((s-1)/20);
 // V95 (REVIEW95): Nguyệt Thực 161–200 mở khi đã vượt ải 200 Chiến dịch
 const eMax=()=>{try{return window.V95!==false&&Progress.getState().cleared.includes(200)?200:160;}catch{return 160;}};
 function normalStars(c){try{const st=Campaign36.getState().stars||{};let n=0;for(let s=c*20+1;s<=c*20+20;s++)n+=st[s]||0;return n;}catch{return 0;}}
 function hasEvo3(){try{const P=Progress.getState();if(P.items.some(i=>(i.enhance||0)>=3))return true;const w=Workshop.getState();if((w.craftEnhancements||[]).some(e=>e>=3))return true;}catch{}return false;}
 function unlocked(){try{const cl=Progress.getState().cleared;return cl.includes(ECL.unlockCleared)&&hasEvo3();}catch{return false;}}
 function chapterOpen(c){try{const cl=Progress.getState().cleared;for(let s=c*20+1;s<=c*20+20;s++)if(!cl.includes(s))return false;return normalStars(c)>=ECL.chapStars;}catch{return false;}}
 function canStart(s){if(!unlocked()||s<1||s>eMax())return false;if(!chapterOpen(ch(s)))return false;return s%20===1||S.cleared.includes(s-1);}
 function eStars(c){let n=0;for(let s=c*20+1;s<=c*20+20;s++)n+=S.stars[s]||0;return n;}
 const active=()=>act;
 // vào/ra chế độ
 const orr=reset;reset=function(){if(pending){act=true;pending=false;}else{const hg=document.getElementById('hgr41'),lb=document.getElementById('lobby');if((hg&&!hg.hidden)||(lb&&!lb.hidden))act=false;}
  const r=orr.apply(this,arguments);try{if(act&&mode==='play'){try{Combat.begin(Combat.stageRequirement(level));}catch{}toast('🌑 NGUYỆT THỰC · ẢI E'+level);}}catch{}return r;};
 const ons=nextStage;nextStage=function(){if(act&&mode==='reward'&&!canStart(level+1)){try{end(true);}catch{}return;}return ons.apply(this,arguments);};
 function launch(s){if(!canStart(s))return false;pending=true;try{Hangar41.stop&&Hangar41.stop();}catch{}try{Hangar41.close();}catch{}try{Lobby.hide();}catch{}const gm=document.getElementById('gamemode');gm.value='campaign';try{syncModeSetup();}catch{}const sel=document.getElementById('mission-select');sel.value=String(s);try{document.getElementById('tutorial392')?.remove();}catch{}document.getElementById('start').click();return true;}
 // hệ số trận
 try{const ocur=Bullet66.cur;Bullet66.cur=function(){const o=ocur.apply(this,arguments);if(!act)return o;return {...o,burst:o.burst+ECL.burst,cap:o.cap+ECL.cap,speed:Math.min(1.6,o.speed*ECL.speed),dmg:o.dmg*ECL.dmg};};}catch{}
 const oae=addEnemy;addEnemy=function(e){const r=oae.apply(this,arguments);try{if(act&&e&&!e.rescue28&&!e.bossPart&&!e.vortex67){const m=(e.elite||e.large)?ECL.hpElite:ECL.hp;e.hp*=m;e.maxHp=e.hp;if(e.guard)e.guard*=m;if(e.elite)e.ecl67=true;}}catch{}return r;};
 try{const osb=Combat26.setupBoss;Combat26.setupBoss=function(b){try{if(act&&b&&!b.bossHealthReady&&!b.ecl67){b.ecl67=1;b.max*=ECL.hpBoss;b.hp=b.max;}}catch{}return osb.apply(this,arguments);};}catch{}
 const okl=kill;kill=function(e){const was=e&&e.dead;const r=okl.apply(this,arguments);try{if(act&&e&&e.elite&&!was&&mode==='play'){for(const a of [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4])emit(e.x,e.y,a,260/enemyScale(),'orb',{tint30:'#c77dff'});}}catch{}return r;};
 // phần thưởng riêng (không đụng tiến trình Chiến dịch)
 function reward(s){const first=!S.cleared.includes(s),c=ch(s),m=missionFor(s),credits=(45+3*s)*2,exp=12+4*(c+1),dust=s%10===0?4:s%5===0?2:1;
  Progress.grantCredits(credits);Workshop.grant({exp});const pk=Campaign36.fragments(Math.random);if(Math.random()<.8)Workshop.grant({model:pk.model,gearFragments:2});Dust67.add(dust);
  if(first)S.cleared.push(s);let star=1;try{star=Report392.starScore();}catch{}S.stars[s]=Math.max(S.stars[s]||0,Math.min(3,Math.max(1,star|0)));save();
  try{Missions393.add('stages');Missions393.flush();}catch{}
  return {credits,item:null,unlocked:null,first,mission:m,materials:[exp+' đá nâng cấp',dust+' Bụi Tinh Vân','mảnh trang bị (80%)']};}
 function sweep(s){const d=day();if(S.sweep.day!==d)S.sweep={day:d,used:0};if(S.sweep.used>=ECL.sweep||(S.stars[s]||0)<3)return null;S.sweep.used++;save();const c=ch(s),credits=(45+3*s)*2,exp=12+4*(c+1),dust=s%10===0?4:s%5===0?2:1;Progress.grantCredits(credits);Workshop.grant({exp});Dust67.add(dust);return {credits,exp,dust};}
 const MILE=[[20,{credits:1500,exp:40}],[40,{credits:3000,exp:60,dust:5}],[60,{credits:5000,exp:100,dust:10}]];
 function claim(c,k){const key=c+':'+k;if(S.claims.includes(key)||eStars(c)<MILE[k][0])return false;S.claims.push(key);save();const g=MILE[k][1];if(g.credits)Progress.grantCredits(g.credits);if(g.exp)Workshop.grant({exp:g.exp});if(g.dust)Dust67.add(g.dust);return true;}
 // nền: phủ tím đỏ
 function tint(src){const c=document.createElement('canvas');c.width=src.width;c.height=src.height;const g=c.getContext('2d');g.drawImage(src,0,0);g.globalCompositeOperation='multiply';g.fillStyle='#b0306a';g.fillRect(0,0,c.width,c.height);g.globalCompositeOperation='source-over';g.globalAlpha=.18;g.fillStyle='#ff2a4d';g.fillRect(0,0,c.width,c.height);return c;}
 function draw(){if(!act||!(mode==='play'||mode==='pause'))return;ctx.save();ctx.globalCompositeOperation='source-over';ctx.font='800 10px sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';const t='🌑 NGUYỆT THỰC · E'+level;const w=ctx.measureText(t).width+14;ctx.fillStyle='#2a0410e0';ctx.strokeStyle='#ff4d6a';ctx.lineWidth=1.2;ctx.beginPath();ctx.roundRect?ctx.roundRect(W-10-w,62,w,18,9):ctx.rect(W-10-w,62,w,18);ctx.fill();ctx.stroke();ctx.fillStyle='#ffb3c1';ctx.fillText(t,W-17,71.5);ctx.restore();}
 const ovd=VisualFX.draw;VisualFX.draw=function(){const r=ovd.apply(this,arguments);try{draw();}catch{}return r;};
 return {maxCh:()=>eMax()/20,active,unlocked,chapterOpen,canStart,launch,reward,sweep,claim,eStars,normalStars,tint,MILE,state:()=>JSON.parse(JSON.stringify(S)),sweepLeft:()=>{const d=day();return S.sweep.day===d?ECL.sweep-S.sweep.used:ECL.sweep;},_act:v=>{act=!!v;}};
})();

// ---------- Bảng "VIỄN CHINH" ở Kho chiến cơ: Chương 9 + Nguyệt Thực ----------
const Expedition67=(()=>{
 let el=null,tab='ch9',ec=0;
 const star=n=>'★'.repeat(n)+'☆'.repeat(3-n);
 function build(){el=document.createElement('div');el.className='m63 ex67';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-x]');if(!t){if(e.target===el)close();return;}const a=t.dataset.x;
   if(a==='close')close();else if(a==='tab'){tab=t.dataset.v;render();}else if(a==='ec'){ec=+t.dataset.v;render();}
   else if(a==='go9'){close();launch9(+t.dataset.v);}else if(a==='goE'){close();Eclipse67.launch(+t.dataset.v);}
   else if(a==='sw'){const r=Eclipse67.sweep(+t.dataset.v);try{toast(r?'CÀN QUÉT NGUYỆT THỰC · +'+r.credits+' HK · +'+r.exp+' ĐÁ · +'+r.dust+' BỤI':'HẾT LƯỢT HOẶC CHƯA ĐỦ 3★');}catch{}render();}
   else if(a==='claim'){Eclipse67.claim(ec,+t.dataset.v);render();}});}
 function launch9(s){if(!Progress.canStart(s))return;try{Eclipse67._act(false);}catch{}try{Hangar41.stop&&Hangar41.stop();}catch{}try{Hangar41.close();}catch{}try{Lobby.hide();}catch{}document.getElementById('gamemode').value='campaign';try{syncModeSetup();}catch{}Ch9.ensureOptions();document.getElementById('mission-select').value=String(s);document.getElementById('start').click();}
 function render(){const st=Campaign36.getState().stars||{},cl=Progress.getState().cleared,dust=Dust67.get(),bon=Math.round(Dust67.bonus()*100);
  let body='';
  if(tab==='ch9'){if(!Ch9.open())body=`<p class="ex67-lock">Mở khi vượt ải 160 và có ít nhất 1 món SSS / siêu chiến cơ (hoặc lực chiến ≥ ${CH9.unlockCP.toLocaleString('vi-VN')}).</p>`;
   else{body='<div class="ex67-grid">';for(let s=161;s<=180;s++){const can=Progress.canStart(s),done=cl.includes(s),k=s%10===0?'boss':s%5===0?'mini':'';body+=`<button data-x="go9" data-v="${s}" class="${k} ${done?'done':''}" ${can?'':'disabled'}><b>${s}</b><i>${done?star(st[s]||0):can?'MỞ':'🔒'}</i></button>`;}body+='</div>';}}
  else{if(!Eclipse67.unlocked())body='<p class="ex67-lock">Mở khi vượt ải 60 và có ít nhất 1 trang bị / chiến cơ đạt +3.</p>';
   else{body='<div class="ex67-chs">';for(let c=0;c<Eclipse67.maxCh();c++)body+=`<button data-x="ec" data-v="${c}" aria-pressed="${c===ec}" ${Eclipse67.chapterOpen(c)?'':'class="lk"'}>C${c+1}</button>`;body+='</div>';
    const E=Eclipse67.state();if(!Eclipse67.chapterOpen(ec))body+=`<p class="ex67-lock">Cần vượt đủ 20 ải Chương ${ec+1} và đạt ${ECL.chapStars}★ (hiện ${Eclipse67.normalStars(ec)}★).</p>`;
    else{body+='<div class="ex67-grid">';for(let s=ec*20+1;s<=ec*20+20;s++){const can=Eclipse67.canStart(s),done=E.cleared.includes(s),k=s%10===0?'boss':s%5===0?'mini':'',sw=(E.stars[s]||0)>=3;body+=`<button data-x="goE" data-v="${s}" class="ecl ${k} ${done?'done':''}" ${can?'':'disabled'}><b>E${s}</b><i>${done?star(E.stars[s]||0):can?'MỞ':'🔒'}</i></button>`;}body+='</div>';
     const es=Eclipse67.eStars(ec);body+=`<div class="ex67-row"><span>Sao Nguyệt Thực chương: <b>${es}/60</b></span>${Eclipse67.MILE.map((m,k)=>`<button data-x="claim" data-v="${k}" ${es>=m[0]&&!E.claims.includes(ec+':'+k)?'':'disabled'}>${E.claims.includes(ec+':'+k)?'✓':m[0]+'★'}</button>`).join('')}</div>`;
     const sws=[];for(let s=ec*20+1;s<=ec*20+20;s++)if((E.stars[s]||0)>=3)sws.push(s);body+=`<div class="ex67-row"><span>Càn quét (còn ${Eclipse67.sweepLeft()}/${ECL.sweep} lượt):</span>${sws.slice(-4).map(s=>`<button data-x="sw" data-v="${s}">E${s}</button>`).join('')||'<em>cần 3★</em>'}</div>`;}}}
  const badge=CH9_ART.badge?`<img class="ex67-badge" src="${CH9_ART.badge}" alt="">`:'';
  el.innerHTML=`<div class="m63-card ex67-card"><div class="m63-eye">VIỄN CHINH</div><h3>${tab==='ch9'?'CHƯƠNG 9 · TINH VÂN ĐEN':'NGUYỆT THỰC'}</h3>${tab==='ecl'?badge:''}
   <div class="ex67-tabs"><button data-x="tab" data-v="ch9" aria-pressed="${tab==='ch9'}">CHƯƠNG 9</button><button data-x="tab" data-v="ecl" aria-pressed="${tab==='ecl'}">NGUYỆT THỰC</button></div>
   <p class="ex67-dust">✦ Bụi Tinh Vân: <b>${dust}</b> · nội tại +${bon}% sát thương & giáp (tối đa +25%)</p>${body}
   <div class="m63-btns" style="display:flex;margin-top:12px"><button class="m63-go" data-x="close">ĐÓNG</button></div></div>`;}
 function open(t){if(!el)build();if(t)tab=t;el.hidden=false;render();}
 function close(){if(el)el.hidden=true;}
 setInterval(()=>{try{const b=dock67btn('ex67','VIỄN CHINH',()=>open());if(b){const lock=!Ch9.open()&&!Eclipse67.unlocked();b.classList.toggle('lk67',lock);}}catch{}},700);
 return {open,close,launch9};
})();
