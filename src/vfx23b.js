'use strict';
// V2.2.3 · VFX đợt 2 (chủ dự án 25/11). Tắt toàn bộ: window.VFX23B=false (đặt trước khi trang tải). Cánh sống nằm ở rig23.js (window.CANH23=false).
//  1) Hợp thể Chiến Thần 1,3 s (phát hiện activeRobot.super bật):
//     0–0,45 s chậm 0,35× + 2 luồng năng lượng xoáy vào tàu + vòng lục giác thu lại · 0,45 s sóng nổ + rung 4 px 180 ms + xóa mọi đạn địch → tia sáng bay về tàu
//     · 0,85–1,3 s Chiến Thần chốt cỡ 1,18× (hop4309 KR23) + nhịp hào quang · bất tử suốt 1,3 s + 0,8 s.
//  2) Dải chèn hình chéo 0,55 s (DOM, không dừng trận): BOM · XUNG HỘI TỤ (kỹ năng) · TỐI THƯỢNG (VKTT) + rung 3–4 px 200 ms; đạn địch bị xóa → tia thưởng bay về tàu.
//  3) CẢNH BÁO · BOSS XUẤT HIỆN 1,1 s: băng đỏ trong suốt có mũi tên chạy, ngay dưới HUD trên (thay băng bw306 khi bật).
//  4) Sảnh: Chiến Thần đang chọn có quầng sáng tròn + hạt sáng bay lên (chỉ ở sân khấu Sảnh).
//  Không ctx.filter / shadowBlur; sprite dựng 1 lần; bể tia 120.
(()=>{
 const ON=()=>window.VFX23B!==false;
 if(!ON())return;
 window.KR23=1.18;
 const now=()=>performance.now();
 const play=()=>{try{return mode==='play';}catch{return false;}};
 const SPR=(()=>{const c=document.createElement('canvas');c.width=c.height=32;const g=c.getContext('2d');const r=g.createRadialGradient(16,16,0,16,16,15);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.3,'rgba(255,240,190,.9)');r.addColorStop(1,'rgba(255,200,90,0)');g.fillStyle=r;g.fillRect(0,0,32,32);return c;})();
 const HALO=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const r=g.createRadialGradient(64,64,4,64,64,63);r.addColorStop(0,'rgba(255,236,170,.55)');r.addColorStop(.45,'rgba(255,200,90,.22)');r.addColorStop(1,'rgba(255,180,60,0)');g.fillStyle=r;g.fillRect(0,0,128,128);return c;})();
 // ---------- tia thưởng bay về tàu ----------
 const N=120,HP=[];for(let i=0;i<N;i++)HP.push({on:0});let hi=0;
 function homing(list){let n=0;for(const b of list){if(n>=N)break;if(!b||!Number.isFinite(b.x))continue;const p=HP[hi=(hi+1)%N];p.on=1;p.x=b.x;p.y=b.y;const a=Math.random()*6.283;p.vx=Math.cos(a)*120;p.vy=Math.sin(a)*120-60;p.t=0;n++;}return n;}
 let lastH=0,nHome=0;
 function drawHoming(g){const t=now(),dt=lastH?Math.min(.05,(t-lastH)/1000):0;lastH=t;let px=240,py=700;try{px=player.x;py=player.y;}catch{}let any=false;
  for(const p of HP){if(!p.on)continue;p.t+=dt;const dx=px-p.x,dy=py-p.y,d=Math.hypot(dx,dy)||1,acc=900+p.t*2600;p.vx+=dx/d*acc*dt;p.vy+=dy/d*acc*dt;const sp=Math.hypot(p.vx,p.vy),mx=300+p.t*1400;if(sp>mx){p.vx*=mx/sp;p.vy*=mx/sp;}
   p.x+=p.vx*dt;p.y+=p.vy*dt;if(d<18||p.t>1.6){p.on=0;nHome++;try{if(play())score+=5;}catch{}continue;}
   if(!any){g.save();g.globalCompositeOperation='lighter';any=true;}g.globalAlpha=.9;g.drawImage(SPR,p.x-6,p.y-6,12,12);}
  if(any)g.restore();}
 // ---------- rung nhẹ ----------
 function shakeMs(ms){try{shake=Math.max(shake,ms/1000);}catch{}}
 // ---------- 1) hợp thể 1,3 s ----------
 const F={t0:0,on:false,was:false,cleared:false};
 function fusionTick(){let sup=false;try{sup=!!(activeRobot&&activeRobot.super&&superTime>0);}catch{}
  if(sup&&!F.was&&play()){F.t0=now();F.on=true;F.cleared=false;try{invuln=Math.max(invuln,2.1);}catch{}}F.was=sup;
  if(F.on){const u=(now()-F.t0)/1000;if(u>=.45&&!F.cleared){F.cleared=true;try{const L=bullets.slice();homing(L);bullets.length=0;}catch{}shakeMs(180);}if(u>1.3)F.on=false;}}
 function slow(){try{if(typeof update!=='function'||update.__v23b)return;const o=update;const f=function(dt){try{if(F.on&&(now()-F.t0)<450&&Number.isFinite(dt))arguments[0]=dt*.35;}catch{}return o.apply(this,arguments);};f.__v23b=1;update=f;}catch{}}
 function drawFusion(g){if(!F.on)return;const u=(now()-F.t0)/1000;let x=240,y=700;try{x=player.x;y=player.y;}catch{}g.save();g.globalCompositeOperation='lighter';
  if(u<.45){const q=u/.45;// 2 luồng xoáy + vòng lục giác thu lại
   for(const sd of [-1,1]){g.strokeStyle=sd<0?'rgba(120,220,255,.75)':'rgba(255,200,110,.75)';g.lineWidth=3;g.beginPath();for(let k=0;k<=24;k++){const v=k/24,r=(1-q)*220*(1-v)+18,a=sd*(v*5+q*4);const X=x+sd*Math.cos(a)*r,Y=y+Math.sin(a)*r*.6;k?g.lineTo(X,Y):g.moveTo(X,Y);}g.stroke();}
   const R=150*(1-q)+40;g.strokeStyle='rgba(180,240,255,'+(.4+.4*q)+')';g.lineWidth=2;g.beginPath();for(let k=0;k<=6;k++){const a=k/6*6.283+q*1.5;k?g.lineTo(x+Math.cos(a)*R,y+Math.sin(a)*R):g.moveTo(x+Math.cos(a)*R,y+Math.sin(a)*R);}g.stroke();}
  else if(u<.85){const q=(u-.45)/.4;g.strokeStyle='rgba(255,250,230,'+(.8*(1-q))+')';g.lineWidth=4*(1-q)+1;g.beginPath();g.arc(x,y,30+260*q,0,6.283);g.stroke();}
  else{const q=(u-.85)/.45;g.globalAlpha=.55*(1-q);g.drawImage(HALO,x-110,y-120,220,220);}
  g.restore();}
 // ---------- 2) dải chèn hình ----------
 let cut=null;
 function host(){return document.fullscreenElement||document.webkitFullscreenElement||document.body;}
 function cutIn(title,sub,img,col){try{if(!cut){cut=document.createElement('div');cut.id='ci23';}const h=host();if(cut.parentNode!==h)h.appendChild(cut);
  cut.style.setProperty('--c23',col||'#38bdf8');cut.innerHTML=(img?'<i style="background-image:url('+img+')"></i>':'')+'<b>'+title+'</b><small>'+(sub||'')+'</small><em></em>';cut.classList.remove('on');void cut.offsetWidth;cut.classList.add('on');}catch{}}
 function pilotImg(){try{const T=window.TRANH307||{};const i=(typeof Pilot67!=='undefined'&&Pilot67.main&&Pilot67.main())||0;return T['phi_cong_'+((i|0)+1)]||'';}catch{return '';}}
 function afterClear(b0){try{const alive=new Set(bullets);const gone=b0.filter(b=>!alive.has(b));if(gone.length)homing(gone);}catch{}}
 function hooks(){
  if(typeof bomb==='function'&&!bomb.__v23b){const o=bomb;const f=function(){let n0=0;try{n0=bombs;}catch{}const b0=(()=>{try{return bullets.slice();}catch{return [];}})();const r=o.apply(this,arguments);try{if(play()&&bombs<n0){cutIn('BOM HỦY DIỆT','QUÉT SẠCH ĐẠN ĐỊCH','', '#ff7a3a');shakeMs(200);afterClear(b0);}}catch{}return r;};f.__v23b=1;bomb=f;}
  try{if(typeof Rank36!=='undefined'&&!Rank36.__v23b){const o=Rank36.activate;Rank36.activate=function(){const b0=(()=>{try{return bullets.slice();}catch{return [];}})();const r=o.apply(this,arguments);try{if(r){cutIn('XUNG HỘI TỤ','KỸ NĂNG CHIẾN CƠ',pilotImg(),'#a78bfa');shakeMs(200);afterClear(b0);}}catch{}return r;};Rank36.__v23b=1;}}catch{}
  try{if(typeof Ult72!=='undefined'&&Ult72.useUlt&&!Ult72.__v23b){const o=Ult72.useUlt;Ult72.useUlt=function(){const b0=(()=>{try{return bullets.slice();}catch{return [];}})();const r=o.apply(this,arguments);try{if(r){let im='';try{const b=document.querySelector('#ult72-btn');im=b?(getComputedStyle(b).backgroundImage.match(/url\("?([^")]+)"?\)/)||[])[1]||'':'';}catch{}cutIn('TỐI THƯỢNG','VŨ KHÍ TỐI THƯỢNG KÍCH HOẠT',im,'#fbbf24');shakeMs(200);afterClear(b0);}}catch{}return r;};Ult72.__v23b=1;}}catch{}
  // 3) cảnh báo boss
  if(typeof startBoss==='function'&&!startBoss.__v23b){const o=startBoss;const f=function(){const r=o.apply(this,arguments);try{if(play())warnBoss();}catch{}return r;};f.__v23b=1;startBoss=f;}
  slow();}
 let wb=null;
 function warnBoss(){try{if(!wb){wb=document.createElement('div');wb.id='wb23';wb.innerHTML='<i></i><b>CẢNH BÁO · BOSS XUẤT HIỆN</b><i></i>';}const h=host();if(wb.parentNode!==h)h.appendChild(wb);wb.classList.remove('on');void wb.offsetWidth;wb.classList.add('on');}catch{}}
 // ---------- 4) Sảnh: hào quang Chiến Thần ----------
 const MO=[];for(let i=0;i<14;i++)MO.push({x:(Math.random()-.5)*120,y:Math.random()*120,v:18+Math.random()*26,s:1+Math.random()*1.6});let lm=0;
 function lobbyHalo(r){try{if(!(window.HANGAR_DEMO&&mode==='menu'&&r))return;const g=ctx,t=now(),dt=lm?Math.min(.05,(t-lm)/1000):0;lm=t;const x=player.x,y=player.y-8;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.5+.12*Math.sin(t/600);g.drawImage(HALO,x-120,y-120,240,240);
  g.globalAlpha=.8;for(const m of MO){m.y-=m.v*dt;if(m.y<-20){m.y=120;m.x=(Math.random()-.5)*120;}const a=Math.max(0,Math.min(1,(120-m.y)/40))*Math.max(0,Math.min(1,(m.y+20)/40));g.globalAlpha=a*.8;g.drawImage(SPR,x+m.x-m.s*3,y+m.y-60-m.s*3,m.s*6,m.s*6);}g.restore();}catch{}}
 function hookSSS(){try{if(typeof SSSGame==='undefined'||!SSSGame.draw||SSSGame.draw.__v23b)return;const o=SSSGame.draw;const f=function(r){try{lobbyHalo(r);}catch{}return o.apply(this,arguments);};f.__v23b=1;SSSGame.draw=f;}catch{}}
 // ---------- vẽ ----------
 function hookFx(){try{if(typeof VisualFX==='undefined'||VisualFX.__v23b)return;const o=VisualFX.draw;let lf=-1;VisualFX.draw=function(){const r=o.apply(this,arguments);try{let tm=0;try{tm=time;}catch{}if(tm===lf)return r;lf=tm;if(play()){fusionTick();drawFusion(ctx);drawHoming(ctx);}}catch{}return r;};VisualFX.__v23b=1;}catch{}}
 function css(){if(document.getElementById('vfx23b-css'))return;const s=document.createElement('style');s.id='vfx23b-css';
  s.textContent='#ci23{position:fixed;left:0;right:0;top:calc(var(--sat42,0px) + 92px);height:74px;z-index:2147483060;pointer-events:none;opacity:0;overflow:hidden}'+
   '#ci23.on{animation:ci23 .55s cubic-bezier(.2,.8,.2,1) forwards}@keyframes ci23{0%{opacity:0;transform:translateX(70%) skewY(-6deg)}18%{opacity:1;transform:translateX(0) skewY(-6deg)}78%{opacity:1;transform:translateX(-4%) skewY(-6deg)}100%{opacity:0;transform:translateX(-80%) skewY(-6deg)}}'+
   '#ci23::before{content:"";position:absolute;inset:8px 0;background:linear-gradient(90deg,#060b18e8,color-mix(in srgb,var(--c23) 55%,#060b18) 55%,#060b18e8);border-top:2px solid var(--c23);border-bottom:2px solid var(--c23)}'+
   '#ci23 i{position:absolute;left:14px;top:0;width:74px;height:74px;background:center/cover no-repeat;border-radius:8px;box-shadow:0 0 0 2px var(--c23)}'+
   '#ci23 b{position:absolute;right:18px;top:16px;font:italic 900 24px/1 sans-serif;color:#fff;letter-spacing:1.5px;text-shadow:0 2px 0 #000}#ci23 small{position:absolute;right:18px;top:46px;font:800 11px/1 sans-serif;color:var(--c23);letter-spacing:1px}'+
   '#ci23 em{position:absolute;top:0;bottom:0;width:40px;left:-60px;background:linear-gradient(100deg,#fff0,#fffc,#fff0);transform:skewX(-20deg);animation:ci23e .55s ease-out forwards}@keyframes ci23e{to{left:110%}}'+
   '#wb23{position:fixed;left:0;right:0;top:calc(var(--sat42,0px) + 44px);height:36px;z-index:2147483055;pointer-events:none;opacity:0;display:flex;align-items:center;justify-content:center;gap:10px;'+
   'background:linear-gradient(90deg,#7f0d1a00,#b1122ad0 15%,#b1122ad0 85%,#7f0d1a00);border-top:1px solid #ff6b7a;border-bottom:1px solid #ff6b7a}'+
   '#wb23.on{animation:wb23 1.1s ease-out forwards}@keyframes wb23{0%{opacity:0}12%{opacity:1}85%{opacity:1}100%{opacity:0}}'+
   '#wb23 b{font:900 14px/1 sans-serif;color:#fff;letter-spacing:1.5px;text-shadow:0 1px 0 #000}#wb23 i{width:64px;height:14px;background:repeating-linear-gradient(-60deg,#ffd166 0 6px,#0000 6px 12px);animation:wb23c .4s linear infinite}@keyframes wb23c{to{background-position:24px 0}}'+
   'html body #bw306{display:none!important}';
  (document.head||document.documentElement).appendChild(s);}
 function all(){hooks();hookFx();hookSSS();css();}
 all();setTimeout(all,0);setTimeout(all,1500);setInterval(all,3000);
 window.VFX23B={state:()=>({fusion:F.on,home:nHome,act:HP.filter(p=>p.on).length}),cutIn,warnBoss,homing};
})();
