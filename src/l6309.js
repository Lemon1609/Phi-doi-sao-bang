'use strict';
// V309 Lượt 6 · cảm giác bắn + âm thanh (FEEL6), chiều sâu đấu boss (BOSS6), trải nghiệm điện thoại (TOUCH6).
//  Tắt từng nhóm: window.FEEL6=false · window.BOSS6=false · window.TOUCH6=false. Không dùng ctx.filter / shadowBlur.
//  Cài đặt người chơi (khóa saobang-feel6-v1): rung màn hình, độ lệch ngón tay (0 / 50 / 70 px), tự động Tuyệt kỹ.
//  • FEEL6: rung camera 2–3 px 0,12 s (Bạo Tẩu / robot / Tuyệt kỹ / VKTT), 4–5 px 0,22 s (nổ boss, phá cánh boss); tắt rung trong Cài đặt = tắt mọi rung khung trận.
//    Chớp trúng boss / tinh anh 0,04 s α .35 (fx16 đọc L6309.hf). Âm WebAudio tổng hợp: rít laser, tên lửa trầm, nổ quái / boss có bass,
//    nhặt vật phẩm liên tiếp +4 % cao độ mỗi món (về gốc sau 1,5 s), nhạc nền nhanh hơn khi cảnh báo boss (×1,15) và khi Bạo Tẩu / robot (×1,12).
//  • BOSS6: tia laser boss báo trước 0,6 s thêm vạch đỏ–cam nhấp nháy cộng sáng + 1 tiếng bíp; cánh boss < 35 % máu có vệt rạn đỏ nhấp nháy;
//    phá cánh: nổ lớn + 2 vòng xung kích + rung (vật phẩm hồi khiên thay hồi máu: rep trong build74_mau.py).
//  • TOUCH6: đặt ngón lên chính tàu (cách ≤ 80 px) → tàu trượt lên trên ngón 50 / 70 px; nút gạt TỰ ĐỘNG trong trận bấm Tuyệt kỹ / VKTT khi sẵn sàng.
const L6309=(()=>{
 const KEY='saobang-feel6-v1';let S={shake:1,off:50,auto:0};
 try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o)S=Object.assign(S,o);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const F6=()=>window.FEEL6!==false,B6=()=>window.BOSS6!==false,T6=()=>window.TOUCH6!==false;
 const now=()=>performance.now(),play=()=>{try{return mode==='play';}catch{return false;}};
 const quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 const TT=()=>{try{return time;}catch{return now()/1000;}};
 // ---------- rung ----------
 let shA=0,shU=0;
 function kick(a,d){if(!F6()||!S.shake)return;const n=now();if(n>shU)shA=0;shA=Math.max(shA,a);shU=Math.max(shU,n+d*1000);}
 // null = để luật cũ quyết; 0 = không rung; >0 = biên độ px
 function shk(){if(window.FEEL6===false)return null;if(!S.shake)return 0;if(!play()||quiet())return null;return now()<shU?shA:null;}
 // ---------- chớp trúng ----------
 function hf(e){if(!F6())return null;try{if(e===boss||e.bossPart||e.elite)return [40,.35];}catch{}return null;}
 // ---------- âm thanh ----------
 let ac=null,out=null,nb=null;const soundOn=()=>/BẬT/.test((document.getElementById('sound')||{}).textContent||'');
 function A(){if(ac)return ac;const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;try{ac=new C();out=ac.createGain();out.gain.value=.55;out.connect(ac.destination);
   nb=ac.createBuffer(1,Math.ceil(ac.sampleRate*.6),ac.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}catch{ac=null;}return ac;}
 ['pointerdown','touchstart','keydown'].forEach(ev=>window.addEventListener(ev,()=>{try{const c=A();if(c&&c.state!=='running')c.resume();}catch{}},{passive:true,capture:true}));
 const ok=()=>F6()&&soundOn()&&!document.hidden&&A()&&ac.state==='running';
 function osc(type,f0,f1,t,d,v){const x=ac.createOscillator(),g=ac.createGain();x.type=type;x.frequency.setValueAtTime(f0,t);if(f1&&f1!==f0)x.frequency.exponentialRampToValueAtTime(f1,t+d);
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);x.connect(g);g.connect(out);x.start(t);x.stop(t+d+.02);x.onended=()=>{x.disconnect();g.disconnect();};}
 function noi(t,d,v,type,f,q){const s=ac.createBufferSource(),fl=ac.createBiquadFilter(),g=ac.createGain();s.buffer=nb;fl.type=type;fl.frequency.value=f;if(q)fl.Q.value=q;
   g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);g.connect(out);s.start(t);s.stop(t+d+.02);s.onended=()=>{s.disconnect();fl.disconnect();g.disconnect();};}
 const last={},cnt={};function cd(k,ms){const n=now();if(n-(last[k]||-1e9)<ms)return false;last[k]=n;cnt[k]=(cnt[k]||0)+1;return true;}
 const SND={
  laser:t=>{noi(t,.14,.018,'bandpass',3200,6);osc('sine',2400,1800,t,.12,.008);},
  missile:t=>{osc('sine',130,48,t,.22,.06);noi(t,.2,.035,'lowpass',420);},
  boom:t=>{osc('sine',105,42,t,.18,.05);noi(t,.14,.03,'lowpass',650);},
  boomBig:t=>{osc('sine',90,34,t,.32,.075);noi(t,.3,.05,'lowpass',520);osc('triangle',180,60,t,.2,.02);},
  boss:t=>{osc('sine',72,26,t,.75,.11);noi(t,.9,.07,'lowpass',420);osc('sawtooth',140,40,t+.05,.5,.02);noi(t+.25,.6,.04,'lowpass',300);},
  beep:t=>{osc('square',1250,1250,t,.06,.022);osc('square',1250,1250,t+.09,.05,.018);},
 };
 function snd(k,ms){if(!cd(k,ms||0))return;if(!ok())return;try{SND[k](ac.currentTime+.01);}catch{}}
 let pn=0,pt=-1e9;
 function pickup(){const n=now();if(n-pt>1500)pn=0;pt=n;const k=Math.pow(1.04,Math.min(pn++,18));cnt.pick=(cnt.pick||0)+1;if(!ok())return;try{const t=ac.currentTime+.01;osc('triangle',560*k,920*k,t,.07,.07);osc('sine',1120*k,1120*k,t+.05,.09,.035);}catch{}}
 // ---------- nhạc nền ----------
 window.__bpm6=function(){if(!F6())return 1;try{if(Feedback31.state().pending)return 1.15;}catch{}try{if(superTime>0||(activeRobot&&activeRobot.super))return 1.12;}catch{}return 1;};
 // ---------- vẽ: vạch báo laser, vệt rạn cánh ----------
 function tele(b){if(!B6()||!b||!(b.age<b.warn))return;const g=ctx,t=TT(),on=Math.sin(t*38)>0;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=on?.75:.28;
   const L=b.length28||(H-b.y),a=b.angle28!==undefined?b.angle28+(b.sweep28||0)*0:Math.PI/2;g.translate(b.x,b.y);g.rotate(a);
   g.fillStyle='#ff3b1f';g.fillRect(0,-1.6,L,3.2);g.fillStyle='#ffb36b';g.fillRect(0,-.6,L,1.2);
   const u=b.age/b.warn;g.globalAlpha=(on?.5:.2)*(.4+.6*u);g.fillStyle='#ff6a2e';g.fillRect(0,-(b.width||12)/2*u,L,(b.width||12)*u);g.restore();}
 const CR={};function crack(){if(CR.c)return CR.c;const n=96,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2;g.lineCap='round';
   const R=[[0,-34],[-6,-12],[8,4],[-4,22],[2,38]],B=[[-6,-12],[-26,-18],[-38,-8]],B2=[[8,4],[30,0],[40,14]],B3=[[-4,22],[-22,30]];
   for(const [w,col] of [[5,'rgba(255,70,30,.55)'],[2,'#ffd2a0']])for(const P of [R,B,B2,B3]){g.strokeStyle=col;g.lineWidth=w;g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(h+x,h+y):g.moveTo(h+x,h+y));g.stroke();}
   return CR.c=c;}
 function drawParts(){if(!B6())return;let b=null;try{b=boss;}catch{}if(!b||!b.parts)return;const g=ctx,t=TT();
   for(const p of b.parts){if(p.dead||!(p.max>0)||p.hp/p.max>=.35)continue;const k=1-p.hp/p.max/.35;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,(.55+.45*k)*(.7+.3*Math.sin(t*14)));
     const s=72+24*k;g.drawImage(crack(),p.x-s/2,p.y-s/2,s,s);g.restore();}}
 // ---------- móc ----------
 let wasS=false,wasR=false,hadB=false;
 function tick(){if(!play()){wasS=false;wasR=false;hadB=false;return;}
   let st=0,rs=false,bb=null;try{st=superTime;}catch{}try{rs=!!(activeRobot&&activeRobot.super);}catch{}try{bb=boss;}catch{}
   if(st>0&&!wasS)kick(2.5,.12);if(rs&&!wasR)kick(3,.12);wasS=st>0;wasR=rs;
   if(hadB&&!bb){kick(5,.22);snd('boss',800);}hadB=!!bb;
   try{for(const b of beams){if(b&&b.age<b.warn&&!b.__bp6&&B6()){b.__bp6=1;snd('beep',260);}}}catch{}
   try{let r=false;for(const s of shots){if(s.ray28&&!s.dead&&s.age<.12){r=true;break;}}if(r)snd('laser',320);}catch{}}
 function hooks(){
  try{if(typeof update==='function'&&!update.__l6){const ou=update;const nu=function(){const r=ou.apply(this,arguments);try{tick();}catch{}return r;};nu.__l6=1;window.update=nu;try{update=nu;}catch{}}}catch{}
  try{if(!Bosses28.__l6){Bosses28.__l6=1;const od=Bosses28.drawBeam;Bosses28.drawBeam=function(b){const r=od.apply(this,arguments);try{tele(b);}catch{}return r;};}}catch{}
  try{if(!Bosses28.__l6b){Bosses28.__l6b=1;const db=Bosses28.drawBoss;Bosses28.drawBoss=function(){const r=db.apply(this,arguments);try{drawParts();}catch{}return r;};}}catch{}
  try{if(!Combat26.__l6){Combat26.__l6=1;const ob=Combat26.breakWing;Combat26.breakWing=function(p){const was=p&&!p.dead;const r=ob.apply(this,arguments);
    try{if(was&&B6()){VisualFX.explode(p.x,p.y,2.6,'enemy');kick(4.5,.22);snd('boomBig',150);if(typeof L5309!=='undefined'&&L5309.FX){const t=TT();L5309.FX.push({x:p.x,y:p.y,t0:t,r:40,el:true,big:true});}}}catch{}return r;};}}catch{}
  try{if(!Equipment25.__l6){Equipment25.__l6=1;const ob=Equipment25.barrage;Equipment25.barrage=function(){const r=ob.apply(this,arguments);try{if(play())snd('missile',120);}catch{}return r;};}}catch{}
  try{if(!Audio393.__l6){Audio393.__l6=1;const os=Audio393.sfx;Audio393.sfx=function(k){if(k==='pickup'&&F6()){pickup();return;}return os.apply(this,arguments);};}}catch{}
  try{if(typeof kill==='function'&&!kill.__l6){const ok2=kill;const f=function(e){const was=e&&!e.dead;const r=ok2.apply(this,arguments);try{if(was&&e.dead&&play()){let isB=false;try{isB=e===boss;}catch{}if(!isB){if(e.elite||e.large)snd('boomBig',90);else snd('boom',110);}}}catch{}return r;};f.__l6=1;kill=f;}}catch{}
 }
 // Tuyệt kỹ / VKTT: rung nhẹ khi bấm
 document.addEventListener('pointerdown',e=>{const b=e.target&&e.target.closest&&e.target.closest('#robot-skill,#ult72-btn');if(b&&play()&&!b.disabled)setTimeout(()=>kick(2.5,.12),30);},true);
 // ---------- ngón tay ----------
 function touchDown(e){if(!T6()||!S.off||e.pointerType==='mouse'||!play())return;try{if(!pointerAnchor||pointer!==e.pointerId)return;const c=document.getElementById('game');const r=c.getBoundingClientRect();
   const fx=(e.clientX-r.left)/r.width*W,fy=(e.clientY-r.top)/r.height*H;if(Math.hypot(fx-player.x,fy-player.y)>80)return;
   const e0=typeof pilotEdge==='function'?pilotEdge():20,ty=Math.max(e0,fy-S.off),tx=Math.max(e0,Math.min(W-e0,fx));
   pointerAnchor.px=tx;pointerAnchor.py=ty;pointerAnchor.x=e.clientX;pointerAnchor.y=e.clientY;pointerTarget={x:tx,y:ty};cnt.touch=(cnt.touch||0)+1;}catch{}}
 function bindTouch(){const c=document.getElementById('game');if(!c||c.__l6)return;c.__l6=1;c.addEventListener('pointerdown',touchDown);}
 // ---------- tự động Tuyệt kỹ ----------
 let ab=null;
 function autoBtn(){if(!T6()){if(ab)ab.hidden=true;return;}let m='';try{m=mode;}catch{}const show=m==='play'||m==='pause';
   if(!ab){ab=document.createElement('button');ab.id='auto6';ab.type='button';ab.innerHTML='<i></i><b>TỰ ĐỘNG</b>';ab.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();S.auto=S.auto?0:1;save();paint();try{toast('TỰ ĐỘNG TUYỆT KỸ: '+(S.auto?'BẬT':'TẮT'));}catch{}});document.body.appendChild(ab);}
   const p=document.getElementById('pause'),cv=document.getElementById('game');
   ab.hidden=!show;if(show&&p&&cv){const P=p.getBoundingClientRect(),R=cv.getBoundingClientRect();ab.style.position='fixed';ab.style.zIndex='60';{const host=p.parentElement;if(host&&ab.parentNode!==host)host.appendChild(ab);}ab.style.top=Math.round(P.bottom+40)+'px';ab.style.left=Math.round(R.left+12)+'px';ab.style.right='auto';/* góc trái dưới dải tên ải, không đè thanh máu boss */}ab.classList.toggle('on',!!S.auto);}
 function autoRun(){if(!T6()||!S.auto||!play())return;
   const r=document.getElementById('robot-skill');if(r&&!r.disabled&&r.offsetParent&&!/HỒI|\d+s/.test(r.textContent||'')){r.click();cnt.auto=(cnt.auto||0)+1;}
   const u=document.getElementById('ult72-btn');if(u&&!u.hidden&&u.classList.contains('rdy')){u.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,cancelable:true}));cnt.auto=(cnt.auto||0)+1;}}
 // ---------- cài đặt ----------
 function paint(){const el=document.querySelector('.st66');if(el){el.querySelectorAll('[data-s6]').forEach(b=>{const k=b.dataset.s6,v=!!S[k];b.textContent=(k==='shake'?'RUNG MÀN HÌNH':'TỰ ĐỘNG TUYỆT KỸ')+': '+(v?'BẬT':'TẮT');b.setAttribute('aria-pressed',String(v));});
   el.querySelectorAll('[data-off6]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.off6===S.off)));}if(ab)ab.classList.toggle('on',!!S.auto);}
 function setRows(){const el=document.querySelector('.st66 .m63-card');if(!el||el.querySelector('.st6x'))return;const ref=[...el.querySelectorAll('.st66-l')].find(x=>/MÃ QUÀ/.test(x.textContent));
   const d=document.createElement('div');d.className='st6x';d.innerHTML=`<div class="st66-l">ĐIỀU KHIỂN & RUNG</div><div class="st66-row"><button data-s6="shake"></button><button data-s6="auto"></button></div>
   <div class="st66-l">ĐỘ LỆCH NGÓN TAY</div><div class="st66-seg"><button data-off6="0">TẮT</button><button data-off6="50">VỪA 50px</button><button data-off6="70">CAO 70px</button></div>
   <p class="st66-d">Đặt ngón lên tàu: tàu trượt lên trên đầu ngón để không bị che. Rung màn hình: rung khung trận khi Bạo Tẩu, Tuyệt kỹ, nổ boss.</p>`;
   d.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.s6){S[b.dataset.s6]=S[b.dataset.s6]?0:1;}else if(b.dataset.off6!=null){S.off=+b.dataset.off6;}save();paint();});
   if(ref)el.insertBefore(d,ref);else el.appendChild(d);paint();}
 function boot(){hooks();bindTouch();}
 boot();setTimeout(boot,0);setTimeout(boot,1500);
 setInterval(()=>{try{autoBtn();autoRun();setRows();bindTouch();}catch{}},250);
 // cánh boss vỡ: rơi hồi khiên (đầy khiên → Siêu cấp), vẫn theo trần rơi boss của Bal787
 function wingDrop(x,y){if(!B6())return (window.Bal787&&Bal787.bossDrop)?Bal787.bossDrop(x,y,'wing'):(Safety31.push(drops,100,{x,y,type:'power',t:0}),'power');
   try{if(window.Bal787&&Bal787.bossTake&&!Bal787.bossTake())return '';}catch{}let k='shield';try{if(shield>=maxShield-.01)k='super';}catch{}try{Safety31.push(drops,100,{x,y,type:k,t:0,vy:-90});}catch{}return k;}
 return {shk,hf,kick,S,cnt,save,paint,snd,wingDrop};
})();
