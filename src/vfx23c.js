'use strict';
// V2.2.3 · VFX đợt 3 (chủ dự án 25/11). Tắt toàn bộ: window.VFX23C=false (đặt trước khi trang tải)
//  1) Khiên tổ ong: 1 sprite 128×128 dựng sẵn (vòng vòm lục giác lam trong suốt) xoay chậm quanh tàu khi có khiên (thay vành tb309);
//     đỡ 1 đòn (số khiên giảm / khiên chặn đạn tắt) → 6–8 mảnh lục giác lam văng ra 250 ms.
//  2) Máu < 25 %: viền đỏ mép màn nhịp α .12–.28 (DOM) + tia lửa lam/hổ phách nhỏ thỉnh thoảng bật khỏi thân.
//  3) Giáp: Kính Phản / Long Viêm / Dịch Pha (phản đòn) → vòng xung kích đỏ khi trúng đòn · Nano (hồi) → mũi tên lục bảo bay lên khi hồi máu
//     · Thành Trì / Quỹ Đạo (tạo khiên) → cung nạp khép quanh tàu khi được thêm khiên. Giáp khác: theo sự kiện tương ứng.
//  4) Thẻ trang bị theo bậc (khung f17x ui17): Trắng thép xước · Lục viền ngọc · Lam viền lam sáng · Tím/OC+5/SSS vệt sáng chéo tím–vàng mỗi 3,5 s (không backdrop-filter).
//  5) Tiến bậc (Cường hóa, sự kiện nc10 'adv'): 0,9 s ánh sáng hội tụ → chớp → hình món mới bật lên + chữ +CÔNG +MÁU bay lên.
//  Không ctx.filter / shadowBlur; mọi sprite dựng 1 lần; bể mảnh 48.
(()=>{
 const ON=()=>window.VFX23C!==false;
 if(!ON())return;
 window.HEX23=true;
 const now=()=>performance.now()/(window.__fx23slow||1); // __fx23slow chỉ để chụp ảnh
 const play=()=>{try{return mode==='play';}catch{return false;}};
 // ---------- sprite ----------
 const HEX=(()=>{const S=128,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d'),R=60,cx=64,cy=64;
  const rg=g.createRadialGradient(cx,cy,R*.55,cx,cy,R);rg.addColorStop(0,'rgba(80,200,255,0)');rg.addColorStop(.8,'rgba(80,200,255,.10)');rg.addColorStop(1,'rgba(150,235,255,.32)');g.fillStyle=rg;g.beginPath();g.arc(cx,cy,R,0,6.283);g.fill();
  g.save();g.beginPath();g.arc(cx,cy,R-1,0,6.283);g.clip();g.strokeStyle='rgba(150,235,255,.38)';g.lineWidth=1;const s=9,h=s*Math.sqrt(3);
  for(let row=-8;row<=8;row++)for(let col=-8;col<=8;col++){const x=cx+col*s*1.5,y=cy+row*h+(col&1?h/2:0);const d=Math.hypot(x-cx,y-cy);if(d<R*.45)continue;g.globalAlpha=Math.min(1,(d-R*.45)/(R*.5));g.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;const X=x+Math.cos(a)*s*.92,Y=y+Math.sin(a)*s*.92;k?g.lineTo(X,Y):g.moveTo(X,Y);}g.closePath();g.stroke();}
  g.restore();g.globalAlpha=1;g.strokeStyle='rgba(190,245,255,.55)';g.lineWidth=1.4;g.beginPath();g.arc(cx,cy,R-.7,0,6.283);g.stroke();return c;})();
 const SHARD=(()=>{const c=document.createElement('canvas');c.width=c.height=20;const g=c.getContext('2d');g.strokeStyle='rgba(170,240,255,.95)';g.fillStyle='rgba(90,210,255,.35)';g.lineWidth=1.5;g.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;const X=10+Math.cos(a)*7,Y=10+Math.sin(a)*7;k?g.lineTo(X,Y):g.moveTo(X,Y);}g.closePath();g.fill();g.stroke();return c;})();
 const CHEV=(()=>{const c=document.createElement('canvas');c.width=24;c.height=18;const g=c.getContext('2d');g.lineCap='round';g.lineJoin='round';const P=()=>{g.beginPath();g.moveTo(4,14);g.lineTo(12,5);g.lineTo(20,14);g.stroke();};g.strokeStyle='rgba(16,90,48,.85)';g.lineWidth=5.2;P();g.strokeStyle='#5dff9c';g.lineWidth=3;P();g.strokeStyle='#eafff1';g.lineWidth=1.1;P();return c;})(); // Gói A: mũi tên hồi máu sáng + viền tối dễ nhìn
 const DOT=(()=>{const c=document.createElement('canvas');c.width=c.height=12;const g=c.getContext('2d');const r=g.createRadialGradient(6,6,0,6,6,6);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,12,12);return c;})();
 // ---------- bể hạt ----------
 const N=48,P=[];for(let i=0;i<N;i++)P.push({on:0});let pi=0;
 function add(k,x,y,vx,vy,life,col){const p=P[pi=(pi+1)%N];p.on=1;p.k=k;p.x=x;p.y=y;p.vx=vx;p.vy=vy;p.t0=now();p.l=life;p.c=col||null;p.r=Math.random()*6;}
 const FX=[];// vòng / cung
 function armorId(){try{const L=(gear.equipment||[]).concat(gear.auxiliary||[]);const a=L.find(i=>i&&i.kind==='armor');return a?(a.variant||a.id||''):'';}catch{return '';}}
 const REFLECT=/mirror|reactive|phase|kinh|long|dich/i,REGEN=/nanite|nano|seraph|thien/i,SHGEN=/aegis|orbital|bastion|abyss|thanh|quy/i;
 // ---------- theo dõi trạng thái ----------
 const S={sh:null,bs:0,hp:null,low:false,spark:0,bub:null};
 function bubOn(){try{return typeof Shield78!=='undefined'&&!!Shield78.state().bub;}catch{return false;}}
 function shieldOn(){try{return bubOn()||(bulletShieldTime>0)||(shield>0);}catch{return false;}}
 function track(){let sh=0,bs=0,h=0,mh=1;try{sh=shield|0;bs=bulletShieldTime||0;h=hp;mh=maxHp||1;}catch{return;}const x=player.x,y=player.y,ar=armorId(),bb=bubOn();
  if(S.bub!==null){if(S.bub&&!bb){const n=6+(Math.random()*3|0);for(let k=0;k<n;k++){const a=k/n*6.283+Math.random()*.4;add('shard',x+Math.cos(a)*40,y+Math.sin(a)*40,Math.cos(a)*170,Math.sin(a)*170,250);}}if(!S.bub&&bb&&SHGEN.test(ar))FX.push({k:'arc',t0:now(),l:520});}S.bub=bb;
  if(S.sh!==null){if(sh<S.sh||(S.bs>0&&bs<=0&&S.bs>.05)){const n=6+(Math.random()*3|0);for(let k=0;k<n;k++){const a=k/n*6.283+Math.random()*.4;add('shard',x+Math.cos(a)*40,y+Math.sin(a)*40,Math.cos(a)*170,Math.sin(a)*170,250);}}
   if(sh>S.sh&&SHGEN.test(ar))FX.push({k:'arc',t0:now(),l:520});}
  if(S.hp!==null){if(h<S.hp-1e-6&&REFLECT.test(ar))FX.push({k:'ring',t0:now(),l:300});if(h>S.hp+1e-6&&REGEN.test(ar))for(let k=0;k<6;k++)add('chev',x+(Math.random()-.5)*60,y+14+Math.random()*24,0,-70-Math.random()*50,800);}
  S.sh=sh;S.bs=bs;S.hp=h;S.low=h>0&&h/mh<.25;
  if(S.low&&now()-S.spark>160+Math.random()*260){S.spark=now();const a=Math.random()*6.283;add('sp',x+Math.cos(a)*14,y+Math.sin(a)*14,Math.cos(a)*120,Math.sin(a)*120-40,260,Math.random()<.5?'#7fdcff':'#ffc163');}
  if(FX.length>8)FX.shift();}
 // ---------- vẽ ----------
 function draw(g){const t=now();let x=240,y=700;try{x=player.x;y=player.y;}catch{}
  if(shieldOn()){let sz=0;try{sz=(window.Rig23&&Rig23.last&&Rig23.last.size)||0;}catch{}const R=Math.max(48,Math.min(78,sz*.62||52));g.save();g.translate(x,y);g.rotate(t/1000*.35);g.globalCompositeOperation='lighter';g.globalAlpha=.62+.12*Math.sin(t/180);g.drawImage(HEX,-R,-R,R*2,R*2);g.restore();}
  for(let i=FX.length-1;i>=0;i--){const f=FX[i],u=(t-f.t0)/f.l;if(u>=1){FX.splice(i,1);continue;}g.save();g.globalCompositeOperation='lighter';
   if(f.k==='ring'){g.globalAlpha=.75*(1-u);g.strokeStyle='#ff4d5e';g.lineWidth=3*(1-u)+1;g.beginPath();g.arc(x,y,24+70*u,0,6.283);g.stroke();}
   else{g.globalAlpha=.8*(u<.8?1:(1-u)/.2);g.strokeStyle='#7fdcff';g.lineWidth=3.5;g.beginPath();g.arc(x,y,44,-Math.PI/2,-Math.PI/2+6.283*Math.min(1,u/.8));g.stroke();}g.restore();}
  let any=false;for(const p of P){if(!p.on)continue;const u=(t-p.t0)/p.l;if(u>=1){p.on=0;continue;}if(!any){g.save();g.globalCompositeOperation='lighter';any=true;}const dt=(t-p.t0)/1000;const px=p.x+p.vx*dt,py=p.y+p.vy*dt;g.globalAlpha=1-u;
   if(p.k==='shard'){g.save();g.translate(px,py);g.rotate(p.r+u*4);g.drawImage(SHARD,-7,-7,14,14);g.restore();}else if(p.k==='chev'){g.globalCompositeOperation='source-over';g.globalAlpha=Math.min(1,(1-u)*1.35);g.drawImage(CHEV,px-13,py-10,26,19);g.globalCompositeOperation='lighter';}else g.drawImage(DOT,px-3,py-3,6,6);}
  if(any)g.restore();}
 // tắt vành khiên tb309 khi dùng khiên tổ ong (tb309 đọc window.HEX23)
 // ---------- viền đỏ máu thấp (DOM) ----------
 let vg=null;
 function host(){return document.fullscreenElement||document.webkitFullscreenElement||document.body;}
 function lowDom(){const on=play()&&S.low;if(!vg){if(!on)return;vg=document.createElement('div');vg.id='lh23';}const h=host();if(vg.parentNode!==h)h.appendChild(vg);vg.classList.toggle('on',on);}
 // ---------- 5) tiến bậc ----------
 let ev=null;
 function reveal(){try{let ca=document.querySelector('#nc307 .nc307-cards .nc307-art img, #nc307 .nc307-cards .nc307-art canvas, #nc307 .nc307-ac img');if(!ca){let best=0;for(const el of document.querySelectorAll('#nc307 img, #nc307 canvas')){const r=el.getBoundingClientRect();const a=r.width*r.height;if(a>best&&r.width>40&&r.top<innerHeight*.6){best=a;ca=el;}}}let src='';if(ca){if(ca.tagName==='CANVAS'){try{src=ca.toDataURL();}catch{}}else src=ca.currentSrc||ca.src;}if(!ev){ev=document.createElement('div');ev.id='ev23';}document.body.appendChild(ev);
  ev.innerHTML='<i class="r"></i><i class="f"></i>'+(src?'<img alt="" src="'+src+'">':'')+'<b class="a">+CÔNG</b><b class="b">+MÁU</b><span>TIẾN BẬC THÀNH CÔNG</span>';ev.classList.remove('on');void ev.offsetWidth;ev.classList.add('on');clearTimeout(ev._t);ev._t=setTimeout(()=>{ev.classList.remove('on');},1400);}catch{}}
 document.addEventListener('nc10',e=>{try{if(e.detail==='adv')reveal();}catch{}});
 // ---------- CSS ----------
 function css(){if(document.getElementById('vfx23c-css'))return;const s=document.createElement('style');s.id='vfx23c-css';
  s.textContent='#lh23{position:fixed;inset:0;z-index:2147483030;pointer-events:none;opacity:0;background:radial-gradient(ellipse at center,#0000 55%,#ff1f3d 100%);transition:opacity .3s}#lh23.on{opacity:.2;animation:lh23 1.1s ease-in-out infinite}@keyframes lh23{0%,100%{opacity:.12}50%{opacity:.28}}'+
   'html body .f17h > i.f17x{overflow:hidden}'+
   'html body .f17h > i.f17x[data-f="0"]::before{content:"";position:absolute;inset:3px;border-radius:6px;background:repeating-linear-gradient(100deg,#ffffff00 0 3px,#ffffff10 3px 4px);pointer-events:none}'+
   'html body .f17h > i.f17x[data-f="1"]::before{content:"";position:absolute;inset:2px;border-radius:7px;box-shadow:inset 0 0 0 1px #4ade8088,inset 0 0 10px #22c55e55;pointer-events:none}'+
   'html body .f17h > i.f17x[data-f="2"]::before{content:"";position:absolute;inset:2px;border-radius:7px;box-shadow:inset 0 0 0 1px #60a5fa99,inset 0 0 12px #3b82f677;pointer-events:none;animation:f23b 2.4s ease-in-out infinite}@keyframes f23b{50%{opacity:.55}}'+
   'html body .f17h > i.f17x:is([data-f="3"],[data-f="4"],[data-f="5"])::after{content:"";position:absolute;top:-20%;bottom:-20%;left:-60%;width:38%;background:linear-gradient(100deg,#fff0,#f5d0fe66 40%,#fde68a88 55%,#fff0);transform:translateX(0) skewX(-18deg);animation:f23s 3.5s ease-in-out infinite;pointer-events:none}'+
   '@keyframes f23s{0%,62%{transform:translateX(0) skewX(-18deg)}100%{transform:translateX(420%) skewX(-18deg)}}'+
   'html body .f17h > i.f17x:is([data-f="3"],[data-f="4"],[data-f="5"])::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 6% 6%,#fff8 0 2px,#0000 4px),radial-gradient(circle at 94% 6%,#fff8 0 2px,#0000 4px),radial-gradient(circle at 6% 94%,#fff6 0 2px,#0000 4px),radial-gradient(circle at 94% 94%,#fff6 0 2px,#0000 4px);pointer-events:none}'+
   '#ev23{position:fixed;inset:0;z-index:2147483600;pointer-events:none;display:none;align-items:center;justify-content:center;background:radial-gradient(circle,#0a0f22cc 0,#05081add 60%,#05081a00 100%);animation:ev23bg 1.3s ease-out forwards}@keyframes ev23bg{0%{opacity:0}10%{opacity:1}80%{opacity:1}100%{opacity:0}}#ev23.on{display:flex}'+
   '#ev23 .r{position:absolute;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,#fff0 30%,#a78bfa66 55%,#fff0 70%);animation:ev23r .45s ease-in forwards}@keyframes ev23r{from{transform:scale(1.9);opacity:0}to{transform:scale(.2);opacity:1}}'+
   '#ev23 .f{position:absolute;inset:0;background:radial-gradient(circle,#fffbe8 0,#ffffffcc 18%,#fff0 60%);opacity:0;animation:ev23f .9s ease-out forwards}@keyframes ev23f{0%,45%{opacity:0}52%{opacity:1}100%{opacity:0}}'+
   '#ev23 img{position:relative;width:150px;height:150px;object-fit:contain;opacity:0;animation:ev23i .9s cubic-bezier(.2,1.6,.4,1) forwards}@keyframes ev23i{0%,48%{opacity:0;transform:scale(.4)}70%{opacity:1;transform:scale(1.12)}100%{opacity:1;transform:scale(1)}}'+
   '#ev23 b{position:absolute;top:calc(50% - 30px);font:900 18px/1 sans-serif;color:#fde68a;text-shadow:0 2px 0 #000,0 0 8px #f59e0b;opacity:0;animation:ev23t 1.3s ease-out .55s forwards}#ev23 b.a{left:auto;right:calc(50% + 6px);top:calc(50% + 66px)}#ev23 b.b{left:calc(50% + 6px);top:calc(50% + 66px);color:#86efac;text-shadow:0 2px 0 #000,0 0 8px #22c55e}'+
   '@keyframes ev23t{0%{opacity:0;transform:translateY(10px)}25%{opacity:1}100%{opacity:0;transform:translateY(-34px)}}'+
   '#ev23 span{position:absolute;top:calc(50% + 98px);font:900 16px/1 sans-serif;letter-spacing:2px;color:#fff;text-shadow:0 2px 0 #000,0 0 10px #a78bfa;opacity:0;animation:ev23t 1.2s ease-out .5s forwards}';
  (document.head||document.documentElement).appendChild(s);}
 function hookFx(){try{if(typeof VisualFX==='undefined'||VisualFX.__v23c)return;const o=VisualFX.draw;let lf=-1;VisualFX.draw=function(){const r=o.apply(this,arguments);try{let tm=0;try{tm=time;}catch{}if(tm===lf)return r;lf=tm;if(play()&&!(typeof FX40!=='undefined'&&FX40.__v23c)&&!(typeof BloomQualityC!=='undefined'&&BloomQualityC.__v23c)){track();draw(ctx);}lowDom();}catch{}return r;};VisualFX.__v23c=1;}catch{}}
 function hookUnder(){try{if(typeof FX40==='undefined'||!FX40.under||FX40.__v23c)return;const o=FX40.under;FX40.under=function(){const r=o.apply(this,arguments);try{if(play()){track();draw(ctx);}}catch{}return r;};FX40.__v23c=1;}catch{}}
 // vẽ SAU thân tàu, TRƯỚC đạn địch (đạn địch luôn nằm trên cùng)
 function hookOver(){try{if(typeof BloomQualityC==='undefined'||!BloomQualityC.draw||BloomQualityC.__v23c)return;const o=BloomQualityC.draw;BloomQualityC.draw=function(){const r=o.apply(this,arguments);try{if(play()){track();draw(ctx);}}catch{}return r;};BloomQualityC.__v23c=1;}catch{}}
 function all(){hookOver();if(!(typeof BloomQualityC!=='undefined'&&BloomQualityC.__v23c))hookUnder();hookFx();css();}
 all();setTimeout(all,0);setTimeout(all,1500);setInterval(()=>{all();if(!play()&&vg)vg.classList.remove('on');},1000);
 window.VFX23C={state:()=>({low:S.low,sh:S.sh,fx:FX.length}),reveal};
})();
