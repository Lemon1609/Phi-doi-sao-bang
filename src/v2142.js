'use strict';
// V2.1.42 · Final Polish (chủ dự án 23/11/2026). Tắt toàn bộ: window.V2142=false (đặt trước khi trang tải). window.EVO21=false vẫn quay về V2.0.
//  Chỉ drawImage sprite dựng sẵn (bộ đệm theo màu), KHÔNG ctx.filter / shadowBlur.
//  1) Flow42   — dòng năng lượng chạy dọc VIỀN cánh Bạo Tẩu (đường viền dò 1 lần/ảnh, 18 điểm), theo hệ: lửa · băng · điện · hư không / thiên giới.  Tắt: window.FLOW42=false
//  2) FXK42    — FX cộng sáng của người chơi giảm 15 % khi Bạo Tẩu + (robot +3/+10 hoặc mặc SSS) và có đạn địch → đạn địch luôn nổi.     Tắt: window.FXK42OFF=true
//  3) Cảm giác trận — 2 lớp vệt sao tốc độ (×1,8 khi Bạo Tẩu) · tia lửa trúng đích (đạn + tia Pháo Điện Từ) · chớp nòng pháo chính
//                     · rung nhẹ 60–110 ms / 2–4 px khi nổ quái lớn / boss / tên lửa nổ / vào Bạo Tẩu (tắt theo nút Rung và chế độ hình NHẸ).  Tắt: window.FEEL42=false
//  4) Tự động hút vật phẩm — nút TỰ ĐỘNG bật + ngón không chạm màn ≥ 0,5 s: tàu lượn tới [P] / [+] gần nhất nếu đường an toàn.  Tắt: window.AUTO42=false
//  5) Kho không nháy — dựng xong bố cục Kho ngay khi #hub40 hiện (trước đây chờ vòng lặp 300–700 ms nên thẻ trôi ~1 s).               Tắt: window.KHO42=false
//  6) Vùng an toàn Android — biến --sat42 = max(env(safe-area-inset-top), --satn do app Android báo); HUD trận + đầu Sảnh dời theo.   Tắt: window.SAFE42=false
//  7) Âm thanh — chuông nhặt [P] / [+] riêng, sóng dâng khi vào Bạo Tẩu (evo21_sfx), nhạc hạ 25 % khi nổ lớn / Tuyệt kỹ E.
(()=>{
 const ON=()=>window.V2142!==false;
 const play=()=>{try{return mode==='play';}catch{return false;}};
 const NOW=()=>performance.now()/1000;
 const reduced=()=>{try{return VisualFX.reduced()||VisualFX.counts().quality==='light';}catch{return false;}};
 const sup=()=>{try{return superTime>0;}catch{return false;}};
 const rgb=h=>{h=String(h||'#7dd3fc').replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');const n=parseInt(h.slice(0,6),16);return isNaN(n)?[125,211,252]:[n>>16&255,n>>8&255,n&255];};
 const rgba=(h,a)=>{const [r,g,b]=rgb(h);return `rgba(${r},${g},${b},${a})`;};
 const C={};function mk(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);return c;}
 function flare(col){const k='f'+col;return C[k]||(C[k]=mk(48,48,g=>{const r=g.createRadialGradient(24,24,0,24,24,24);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.18,rgba(col,.9));r.addColorStop(.55,rgba(col,.25));r.addColorStop(1,rgba(col,0));g.fillStyle=r;g.fillRect(0,0,48,48);}));}
 function streak(col){const k='s'+col;return C[k]||(C[k]=mk(96,12,g=>{g.save();g.translate(48,6);g.scale(1,.125);const r=g.createRadialGradient(0,0,0,0,0,48);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.3,rgba(col,.85));r.addColorStop(1,rgba(col,0));g.fillStyle=r;g.fillRect(-48,-48,96,96);g.restore();}));}
 function diamond(col){const k='d'+col;return C[k]||(C[k]=mk(32,32,g=>{g.translate(16,16);const r=g.createRadialGradient(0,0,0,0,0,15);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.35,rgba(col,.9));r.addColorStop(1,rgba(col,0));g.fillStyle=r;g.beginPath();g.moveTo(0,-15);g.lineTo(4,0);g.lineTo(0,15);g.lineTo(-4,0);g.closePath();g.fill();g.beginPath();g.moveTo(-15,0);g.lineTo(0,3);g.lineTo(15,0);g.lineTo(0,-3);g.closePath();g.fill();}));}
 function line(col){const k='l'+col;return C[k]||(C[k]=mk(4,64,g=>{const r=g.createLinearGradient(0,0,0,64);r.addColorStop(0,rgba(col,0));r.addColorStop(.75,rgba(col,.9));r.addColorStop(1,'rgba(255,255,255,1)');g.fillStyle=r;g.fillRect(0,0,4,64);}));}

 // ======================= 2) FXK42 =======================
 let heavy=false;
 const robOn=()=>{try{return !!(activeRobot&&activeRobot.super&&superTime>0);}catch{return false;}};
 const sssEq=()=>{try{return ['armor','missiles','sidearm'].some(k=>String(Gear44.activeId(k)||'').startsWith('sss_'));}catch{return false;}};
 setInterval(()=>{try{if(!ON()||window.FXK42OFF===true||!play()){heavy=false;return;}let rm=0;try{rm=window.Evo21?Evo21.robM():0;}catch{}
   heavy=sup()&&((robOn()&&rm>=2)||sssEq())&&(typeof bullets!=='undefined'&&bullets.length>0);}catch{heavy=false;}},200);
 window.FXK42=()=>heavy?.85:1;

 // ======================= 1) Flow42 · dòng năng lượng dọc viền cánh =======================
 const EL={phoenix:'fire',cryo:'ice',seraph:'sky',void:'void',cyber:'zap',chrono:'void'};
 const PAL={fire:['#ff3b1f','#ffb020','#fff1c2'],ice:['#4fe3ff','#c9fbff','#ffffff'],zap:['#38f2ff','#fff56b','#ffffff'],void:['#c026d3','#ff5fd2','#ffe4fb'],sky:['#ffd66b','#a5f3fc','#ffffff']};
 const elOfShip=id=>{try{return EL[(window.Wing309&&Wing309.MAP||{})[id]]||'sky';}catch{return 'sky';}};
 const elOfKey=k=>{k=String(k||'');if(/inferno|solar|stellar|comet|nova|flame/.test(k))return 'fire';if(/cryo|prism|ricochet|frost|ice/.test(k))return 'ice';if(/thunder|rail|lance/.test(k))return 'zap';if(/void|singular|devour|chrono|gravity|swarm/.test(k))return 'void';return 'sky';};
 const CT=new WeakMap();
 // đường viền ngoài nửa PHẢI (tia từ trọng tâm, alpha > 80), 18 điểm theo thứ tự trên → phải → dưới; nửa trái = đối xứng gương
 function contour(im){let c=CT.get(im);if(c!==undefined)return c;c=null;try{const iw=im.naturalWidth||im.width,ih=im.naturalHeight||im.height;const N=128,sc=N/Math.max(iw,ih),w=Math.max(8,Math.round(iw*sc)),h=Math.max(8,Math.round(ih*sc));
   const d=mk(w,h,g=>g.drawImage(im,0,0,w,h)).getContext('2d').getImageData(0,0,w,h).data;const A=(x,y)=>x>=0&&y>=0&&x<w&&y<h&&d[(y*w+(x|0))*4+3]>80;
   let sy=0,n=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(d[(y*w+x)*4+3]>80){sy+=y;n++;}if(n<20){CT.set(im,null);return null;}
   const cx=w/2,cy=sy/n,R=Math.hypot(w,h),hits=[];
   for(let k=0;k<=48;k++){const th=-Math.PI/2+Math.PI*k/48,dx=Math.cos(th),dy=Math.sin(th);let far=-1;for(let r=2;r<R;r+=1){const x=cx+dx*r,y=cy+dy*r;if(x<0||y<0||x>=w||y>=h)break;if(A(x|0,y|0))far=r;}if(far>4)hits.push([(cx+dx*far)/w,(cy+dy*far)/h]);}
   if(hits.length>=6){const P=[];for(let i=0;i<18;i++)P.push(hits[Math.round(i*(hits.length-1)/17)]);let L=0;const S=[0];for(let i=1;i<P.length;i++){L+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);S.push(L);}c={P,S,L};}}catch{c=null;}CT.set(im,c);return c;}
 function at(c,u){u=((u%1)+1)%1;const T=u*c.L,P=c.P,S=c.S;let i=1;while(i<S.length-1&&S[i]<T)i++;const a=P[i-1],b=P[i],seg=S[i]-S[i-1]||1e-6,k=(T-S[i-1])/seg;return [a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,Math.atan2(b[1]-a[1],b[0]-a[0])];}
 // vẽ trong hệ toạ độ đã đặt của cánh: ảnh ở (x,y,w,h)
 function wing(g,im,x,y,w,h,id,now,FK,I){if(!ON()||window.FLOW42===false||window.EVO21===false)return;const c=contour(im);if(!c)return;const el=I?elOfKey((I.sss&&I.sss.id)||I.v):elOfShip(id),P=PAL[el],pod=!!I;
   const heads=pod?1:(reduced()?2:3),sp=el==='zap'?.95:el==='fire'?.55:.42,L=Math.max(7,w*(pod?.2:.15)),al=(pod?.55:.85)*(FK||1),t=now||NOW();
   g.save();g.globalCompositeOperation='lighter';
   for(let hd=0;hd<heads;hd++){let u=(t*sp+hd/heads)%1;if(el==='zap'){/* điện: nhảy giật giữa các nút viền */u=Math.round(u*17)/17;if(Math.sin(t*47+hd*3)<-.2)continue;}
     for(const side of [1,-1]){const [px,py,ang]=at(c,u),X=side>0?x+px*w:x+(1-px)*w,Y=y+py*h,A=side>0?ang:Math.PI-ang;
       // vệt đuôi 3 chấm mờ dần
       for(let k=2;k>=1;k--){const [qx,qy]=at(c,u-k*.024),QX=side>0?x+qx*w:x+(1-qx)*w,QY=y+qy*h;g.globalAlpha=al*(.22*(3-k));const r=L*(.22-.05*k);g.drawImage(flare(P[0]),QX-r,QY-r,r*2,r*2);}
       g.save();g.translate(X,Y);g.rotate(A);g.globalAlpha=al;g.drawImage(streak(P[1]),-L/2,-L*.09,L,L*.18);g.restore();
       g.globalAlpha=al;const r=L*.32;g.drawImage(el==='ice'?diamond(P[2]):flare(P[1]),X-r,Y-r,r*2,r*2);
       if(!pod&&(el==='fire'||el==='ice')&&!reduced()){/* lửa: tàn lửa trôi ra sau · băng: hạt sương */const e=(t*3+hd+side)%1;g.globalAlpha=al*(1-e)*.7;const ex=X+side*e*L*.5,ey=Y+e*L*.8,er=L*.08;g.drawImage(flare(P[2]),ex-er,ey-er,er*2,er*2);}}}
   g.restore();}
 window.Flow42={wing,contour,elOfShip};

 // ======================= 3) Cảm giác trận =======================
 const F=()=>ON()&&window.FEEL42!==false&&window.EVO21!==false;
 // 3a) 2 lớp vệt sao tốc độ — vẽ ngay sau nền chương (dưới quái / đạn)
 const ST=[];function seed(){ST.length=0;for(let i=0;i<22;i++)ST.push({x:Math.random(),y:Math.random(),l:i<15?0:1,s:.7+Math.random()*.6});}seed();
 let lastT=0,spd=1;
 function stars(){if(!F()||!play())return;let W0=480,H0=854;try{W0=W;H0=H;}catch{}const t=NOW(),dt=Math.min(.05,lastT?t-lastT:0);lastT=t;const tg=sup()?1.8:1;spd+=(tg-spd)*Math.min(1,dt*4);const q=reduced(),g=ctx;
   g.save();g.globalCompositeOperation='lighter';for(const s of ST){if(q&&s.l===0&&(s.s>1))continue;const v=(s.l?1500:760)*s.s*spd,len=(s.l?34:13)*s.s*(.6+.4*spd);s.y+=v*dt/H0;if(s.y>1.08){s.y=-.08;s.x=Math.random();}
     g.globalAlpha=(s.l?.26:.15)*(sup()?1.15:1);g.drawImage(line(s.l?'#bfe6ff':'#8fb8ff'),s.x*W0-1,s.y*H0-len,s.l?2:1.4,len);}g.restore();}
 function hookBg(){try{if(typeof NEN194==='undefined'||!NEN194.draw||NEN194.draw.__f42)return typeof NEN194!=='undefined'&&NEN194.draw&&NEN194.draw.__f42;const od=NEN194.draw;const f=function(){const r=od.apply(this,arguments);try{stars();}catch{}return r;};for(const k of Object.keys(od))try{f[k]=od[k];}catch{}f.__f42=1;NEN194.draw=f;return true;}catch{return false;}}
 // 3b) tia lửa trúng đích + chớp nòng — vẽ sau VisualFX
 const SP=[],MZ={t:-9};const lastHit=new WeakMap();
 const tone=()=>{try{const i=typeof launchCraft==='number'?launchCraft:selected;return (window.FX18&&FX18.tone&&FX18.tone(i))||'#9ad8ff';}catch{return '#9ad8ff';}};
 function hit(e,amount,s){if(!F()||!play()||!e||!(amount>0))return;const n=performance.now(),l=lastHit.get(e)||0;if(n-l<(e===boss||e.bossPart?40:55))return;lastHit.set(e,n);if(SP.length>56)return;
   let col=tone();try{if(s&&(s.gearKind||s.gearItem))col=s.rail||/rail|lance|thunder/.test(String(s.gearItem||''))?'#7df9ff':'#ffd27a';}catch{}
   const r=Math.min(30,(e.r||e.radius||18)),x=e.x+(Math.random()-.5)*r*.8,y=e.y+r*.45,k=reduced()?2:4;for(let i=0;i<k;i++){const a=-Math.PI/2+(Math.random()-.5)*2.4;SP.push({x,y,vx:Math.cos(a)*(160+Math.random()*180),vy:Math.sin(a)*(160+Math.random()*180),t:0,d:.13+Math.random()*.07,col});}
   SP.push({x,y,vx:0,vy:0,t:0,d:.09,col,f:1});}
 function drawFx(){if(!F()||!play())return;const g=ctx,t=NOW(),dt=Math.min(.05,t-(drawFx.t||t));drawFx.t=t;const FK=window.FXK42();
   if(SP.length){g.save();g.globalCompositeOperation='lighter';for(let i=SP.length-1;i>=0;i--){const p=SP[i];p.t+=dt;if(p.t>=p.d){SP.splice(i,1);continue;}const u=p.t/p.d;
     if(p.f){const R=7+12*u;g.globalAlpha=(1-u)*.9*FK;g.drawImage(flare(p.col),p.x-R,p.y-R,R*2,R*2);continue;}
     p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.9;p.vy*=.9;const L=9*(1-u)+3;g.save();g.translate(p.x,p.y);g.rotate(Math.atan2(p.vy,p.vx)+Math.PI/2);g.globalAlpha=(1-u)*FK;g.drawImage(line(p.col),-1,-L,2,L);g.restore();}g.restore();}
   const mu=t-MZ.t;if(mu>=0&&mu<.06){let x=0,y=0;try{x=player.x;y=player.y;}catch{return;}const u=mu/.06,R=(sup()?20:15)*(1-.4*u),col=tone();g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.85*(1-u)*FK;
     const ny=window.__L42&&window.SCALE42!==false?58:48;for(const dx of [-8,8]){g.drawImage(flare(col),x+dx-R/2,y-ny-R/2,R,R);}g.globalAlpha=.6*(1-u)*FK;g.drawImage(diamond('#ffffff'),x-R*.6,y-ny-4-R*.6,R*1.2,R*1.2);g.restore();}}
 function hookFx(){let a=false,b=false,c=false;
   try{if(typeof Feedback31!=='undefined'&&Feedback31.damage){if(!Feedback31.__f42){const fd=Feedback31.damage;Feedback31.damage=function(e,amount,s){const r=fd.apply(this,arguments);try{hit(e,amount,s);}catch{}return r;};Feedback31.__f42=1;}a=true;}}catch{}
   try{if(typeof VisualFX!=='undefined'&&VisualFX.draw){if(!VisualFX.draw.__f42){const od=VisualFX.draw;const f=function(){const r=od.apply(this,arguments);try{drawFx();}catch{}return r;};for(const k of Object.keys(od))try{f[k]=od[k];}catch{}f.__f42=1;VisualFX.draw=f;}b=true;}}catch{}
   try{if(typeof Arsenal30!=='undefined'&&Arsenal30.fire){if(!Arsenal30.fire.__f42){const of=Arsenal30.fire;const f=function(){const r=of.apply(this,arguments);try{if(F()&&play()&&NOW()-MZ.t>.07)MZ.t=NOW();}catch{}return r;};for(const k of Object.keys(of))try{f[k]=of[k];}catch{}f.__f42=1;Arsenal30.fire=f;}c=true;}}catch{}
   return a&&b&&c&&hookBg();}
 // 3c) rung nhẹ
 const kick=(a,d)=>{try{if(F()&&!reduced()&&typeof L6309!=='undefined')L6309.kick(a,d);}catch{}};
 let shT=0;function shake(a,d,gap){const n=performance.now();if(n-shT<(gap||150))return;shT=n;kick(a,d);}
 function hookKill(){try{if(typeof kill!=='function')return false;if(kill.__f42)return true;const ok=kill;const f=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(was&&e.dead&&play()&&F()){let b=false;try{b=e===boss;}catch{}if(b)shake(4,.11,0);else if(e.elite||e.large)shake(2.2,.07);}}catch{}return r;};
   for(const k of Object.keys(ok))try{f[k]=ok[k];}catch{}f.__f42=1;f.__l6=ok.__l6;kill=f;return true;}catch{return false;}}
 function hookSfx(){try{if(!window.EvoSFX||EvoSFX.__f42)return !!(window.EvoSFX&&EvoSFX.__f42);const oh=EvoSFX.hit;EvoSFX.hit=function(key,big,mis){try{if(mis&&play())shake(big?3.4:2.4,big?.1:.07,140);}catch{}return oh.apply(this,arguments);};EvoSFX.__f42=1;return true;}catch{return false;}}
 let wasSup=false;setInterval(()=>{try{const s=sup()&&play();if(s&&!wasSup){shake(3.6,.11,0);try{window.EvoSFX&&EvoSFX.surge&&EvoSFX.surge();}catch{}}wasSup=s;}catch{}},50);

 // ======================= 7) chuông nhặt [P] / [+] =======================
 const seen=new Map();
 setInterval(()=>{if(!ON()||!play())return;try{const cur=new Set(drops);for(const [d,ds] of seen){if(!cur.has(d)||d.dead||d.taken){seen.delete(d);if(ds<80&&window.EvoSFX&&EvoSFX.pick)try{EvoSFX.pick(d.type);}catch{}}}
   const px=player.x,py=player.y;for(const d of drops){if(d.dead)continue;seen.set(d,Math.hypot(d.x-px,d.y-py));}}catch{}},40);

 // ======================= 4) Tự động hút vật phẩm =======================
 const PTR={n:0,t:0};
 window.addEventListener('pointerdown',()=>{PTR.n++;PTR.t=performance.now();},{capture:true,passive:true});
 for(const ev of ['pointerup','pointercancel'])window.addEventListener(ev,()=>{PTR.n=Math.max(0,PTR.n-1);PTR.t=performance.now();},{capture:true,passive:true});
 const AU={tgt:null,n:0,last:0};
 function autoOn(){try{return ON()&&window.AUTO42!==false&&typeof L6309!=='undefined'&&L6309.S&&L6309.S.auto&&play();}catch{return false;}}
 function danger(x,y,r){try{for(const b of bullets){if(b.dead)continue;const bx=b.x+(b.vx||0)*.12,by=b.y+(b.vy||0)*.12;if(Math.hypot(bx-x,by-y)<r+(b.r||5))return true;}for(const e of enemies){if(!e.dead&&Math.hypot(e.x-x,e.y-y)<(e.r||18)+r+6)return true;}}catch{}return false;}
 function autoStep(dt){if(!autoOn()||PTR.n>0||performance.now()-PTR.t<500)return;let px,py;try{px=player.x;py=player.y;}catch{return;}let W0=480,H0=854;try{W0=W;H0=H;}catch{}
   let best=null,bs=1e9;try{for(const d of drops){if(d.dead||!(d.type==='power'||d.type==='heal'))continue;if(d.y<H0*.28||d.y>H0-20)continue;const dist=Math.hypot(d.x-px,d.y-py);if(dist>300)continue;
     const sc=dist*(d.type==='power'?.8:1)*(d.type==='heal'&&typeof hp==='number'&&typeof maxHp==='number'&&hp<maxHp*.6?.6:1);if(sc<bs&&!danger(d.x,d.y,24)){bs=sc;best=d;}}}catch{}
   if(!best)return;const dx=best.x-px,dy=best.y-py,L=Math.hypot(dx,dy);if(L<4)return;const v=Math.min(L,340*dt),nx=px+dx/L*v,ny=py+dy/L*v;if(danger(nx,ny,20))return;
   try{player.x=Math.max(20,Math.min(W0-20,nx));player.y=Math.max(H0*.3,Math.min(H0-30,ny));AU.n++;}catch{}}
 let aT=0;function aLoop(t){requestAnimationFrame(aLoop);const dt=Math.min(.05,aT?(t-aT)/1000:0);aT=t;try{autoStep(dt);}catch{}}requestAnimationFrame(aLoop);

 // ======================= 5) Kho không nháy =======================
 const KH={busy:false,t:0};
 const visHub=()=>{const h=document.getElementById('hub40');if(!h||h.hidden)return false;const cs=getComputedStyle(h);return cs.display!=='none'&&cs.visibility!=='hidden';};
 function khoNow(){if(!ON()||window.KHO42===false||KH.busy||play())return;if(!visHub())return;const body=document.getElementById('hb-body');if(!body||!body.querySelector(':scope>.hb-doll'))return;
   const n=performance.now(),doll=body.querySelector(':scope>.hb-doll'),fresh=!doll.classList.contains('d9b');if(!fresh&&n-KH.t<250)return;KH.busy=true;KH.t=n;
   try{try{KHO307.patch();}catch{}try{L9309.kho();}catch{}try{L9B309.kho();}catch{}try{if(typeof UI17!=='undefined'&&UI17.frames)UI17.frames();}catch{}}finally{try{mo&&mo.takeRecords();}catch{}KH.busy=false;}
}
 let mo=null;try{mo=new MutationObserver(()=>{try{khoNow();}catch{}});mo.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','style','class']});}catch{}

 // ======================= 10) Giao diện mượt: dựng bảng trong 1 khung · dừng canvas nền khi có bảng · sân khấu 30 FPS =======================
 const MSEL='.m63,#nc307,#k307,#hub40,#nav74p,#m40,#cmap,#q307,#cd9,#ch10,#cp9,.cx7';
 const shown=e=>{if(!e||e.hidden)return false;if(!e.isConnected)return false;const cs=getComputedStyle(e);return cs.display!=='none'&&cs.visibility!=='hidden'&&+cs.opacity>.02;};
 const VS=new WeakMap();let UB=false,uiRuns=0,uiMs=0;
 function runUI(){const R=window.__iv42||[];const t0=performance.now();for(const r of R.slice()){try{r.fn();}catch(e){}}uiRuns++;uiMs=performance.now()-t0;}
 function uiNow(){if(!ON()||window.UI42===false||UB||play())return;let opened=[];for(const e of document.querySelectorAll(MSEL)){const v=shown(e);if(v&&!VS.get(e))opened.push(e);VS.set(e,v);}
   if(!opened.length)return;UB=true;try{for(const e of opened)e.classList.add('v42hold');runUI();try{khoNow();}catch{}}finally{for(const e of opened)e.classList.remove('v42hold');try{mo2&&mo2.takeRecords();mo&&mo.takeRecords();}catch{}UB=false;}}
 let mo2=null;try{mo2=new MutationObserver(()=>{try{uiNow();}catch{}});mo2.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','style','class']});}catch{}
 // bảng che sân khấu? (điểm giữa màn hình không thuộc sân khấu Sảnh / Kho)
 function modalOpen(){try{const e=document.elementFromPoint(innerWidth/2,innerHeight*.45);if(!e)return false;return !e.closest('#hgr41,#hub40 .stg9,#hub40 .hb-doll,canvas#game,#hdr9,#lb68');}catch{return false;}}
 setInterval(()=>{try{window.__modal42=ON()&&window.UI42!==false&&!play()&&modalOpen();window.__hub42=ON()&&!play()&&shown(document.getElementById('hub40'));}catch{window.__modal42=false;}},150);
 // vòng lặp chính ngoài trận (sân khấu Sảnh chép từ canvas trận): 30 FPS, dừng hẳn khi có bảng / Kho / Bản đồ che
 let mAcc=0,mLast=0;function hookMain(){try{if(typeof runGameFrameC!=='function')return false;if(runGameFrameC.__m42)return true;const o=runGameFrameC;const f=function(){let m='';try{m=mode;}catch{}if(!ON()||window.UI42===false||m==='play'||m==='pause'||m==='win'||m==='lose'||m==='reward')return o.apply(this,arguments);
     try{mAcc+=frameDtC;}catch{}if(window.__modal42||window.__hub42)return;const n=performance.now();if(n-mLast<31)return;mLast=n;try{frameDtC=Math.min(.1,mAcc);}catch{}mAcc=0;return o.apply(this,arguments);};f.__m42=1;runGameFrameC=f;return true;}catch{return false;}}
 // ======================= 12–14) Kho sàn bay · huy hiệu gọn · ngăn chọn trang bị =======================
 const UIB=()=>ON()&&window.UI42B!==false;
 const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const items=()=>{try{return Progress.v70.items();}catch{try{return Progress.getState().items;}catch{return [];}}};
 const equipped=()=>{try{return Progress.v70.equipped()||Progress.getState().equipped||{};}catch{try{return Progress.getState().equipped||{};}catch{return {};}}};
 function sc(i){try{const s=Progress.stat(i),sp=gearSpec(i);return i.kind==='armor'?(s.armor+s.hp):(s.auxDamage/sp.interval)*sp.count;}catch{return 0;}}
 function stOf(i){try{const s=Progress.stat(i),sp=gearSpec(i);return i.kind==='armor'?{hp:s.hp||0,ar:s.armor||0}:{atk:(s.auxDamage/sp.interval)*sp.count};}catch{return {};}}
 const lvUp=i=>{try{return Workshop.canLevel(i)&&Progress.cost(i)<=Progress.balance();}catch{return false;}};
 function badges(){const E=equipped(),all=items();for(const sl of document.querySelectorAll('#hub40 .hb-slot')){const k=sl.dataset.k307k;let t='';
   if(k){const id=E[k],cur=all.find(x=>x.id===id),cs=cur?sc(cur):-1;if(all.some(x=>x.kind===k&&x.id!==id&&!String(x.variant||'').startsWith('sss_')&&sc(x)>cs+1e-6))t='up';
     else{const d=sl.querySelector('i.hb-dot');if((d&&!d.hidden&&getComputedStyle(d).display!=='none'&&d.offsetWidth)||(cur&&lvUp(cur)))t='dot';}}
   else if(sl.classList.contains('c9ship')){const d=sl.querySelector('i.hb-dot');if(d)t='dot';}
   let b=sl.querySelector(':scope>i.bd42');if(!t){if(b)b.remove();continue;}if(!b){b=document.createElement('i');b.className='bd42';sl.appendChild(b);}if(b.dataset.t!==t){b.dataset.t=t;b.className='bd42 '+t;}}}
 function khoDeck(){if(!UIB()||play())return;const doll=document.querySelector('#hub40 #hb-body>.hb-doll.d9b');if(!doll)return;const sg=doll.querySelector('.stg9');if(!sg)return;
   let kh=sg.querySelector('.kh42');if(!kh){kh=document.createElement('div');kh.className='kh42';kh.innerHTML='<div class="l42"><span class="n42"></span><span class="s42"></span></div><div class="r42"><div class="cp42"><small>LỰC CHIẾN</small><b></b></div></div>';sg.appendChild(kh);}
   const np=sg.querySelector('.np9'),nm=(np&&np.textContent)||'';const n=kh.querySelector('.n42');if(n.textContent!==nm)n.textContent=nm;
   let cp=0;try{cp=Combat.stats().cp;}catch{}const cps=Math.round(cp).toLocaleString('vi-VN'),cb=kh.querySelector('.cp42 b');if(cb.textContent!==cps)cb.textContent=cps;
   let tn='';try{const lc=typeof launchCraft==='number'?launchCraft:0,v=Workshop.craftProgress(lc);tn='Lv.'+(v.level|0);}catch{}const s2=kh.querySelector('.s42');if(s2.textContent!==tn)s2.textContent=tn;
   const st=sg.querySelector('.c9st');let sb=sg.querySelector('.st42');if(st){if(!sb){sb=document.createElement('div');sb.className='st42';sg.appendChild(sb);}
     const L=['CÔNG','MÁU · GIÁP','TÊN LỬA','TÀU CON'],v=[...st.querySelectorAll(':scope>span')].map(x=>(x.querySelector('b')||{}).textContent||'');const h=v.map((x,i)=>`<span><small>${L[i]||''}</small><b>${esc(x)}</b></span>`).join('');if(sb.dataset.k!==h){sb.dataset.k=h;sb.innerHTML=h;}}
   const scb=doll.querySelector('.c9sc');if(scb&&!scb.querySelector('[data-c9g=ssss]')){const b=document.createElement('button');b.type='button';b.dataset.c9g='ssss';b.innerHTML='<small>XƯỞNG SSS</small>';
     b.addEventListener('click',e=>{e.stopPropagation();try{Gear44.open();}catch{}},true);const ref=scb.querySelector('[data-c9g=stones]');scb.insertBefore(b,ref||null);}
   badges();}
 setInterval(()=>{try{if(window.__hub42)khoDeck();}catch{}},500);
 // ngăn chọn trang bị: chạm ô Giáp / Tên lửa / Tàu con ở Kho → danh sách món cùng loại (khung màu bậc, chênh lệch +CÔNG / +MÁU), TRANG BỊ hoặc CƯỜNG HÓA
 let P42=null;const KN={armor:'GIÁP',missiles:'TÊN LỬA',sidearm:'TÀU CON'};
 function pick(kind){const E=equipped(),cur=items().find(x=>x.id===E[kind]),c0=cur?stOf(cur):{},L=items().filter(x=>x.kind===kind).sort((a,b)=>(b.id===E[kind])-(a.id===E[kind])||sc(b)-sc(a));
   const fmt=v=>Math.abs(v)>=100?Math.round(v).toLocaleString('vi-VN'):(Math.round(v*10)/10).toLocaleString('vi-VN');
   const dl=x=>{if(x.id===E[kind])return '<em class="z">Đang trang bị</em>';const s=stOf(x);const P=[];if(kind==='armor'){const a=(s.hp||0)-(c0.hp||0),b=(s.ar||0)-(c0.ar||0);P.push(`<em class="${a>0?'u':a<0?'d':'z'}">${a>=0?'+':'−'}MÁU ${fmt(Math.abs(a))}</em>`,`<em class="${b>0?'u':b<0?'d':'z'}">${b>=0?'+':'−'}GIÁP ${fmt(Math.abs(b))}</em>`);}else{const a=(s.atk||0)-(c0.atk||0);P.push(`<em class="${a>0?'u':a<0?'d':'z'}">${a>=0?'+':'−'}CÔNG ${fmt(Math.abs(a))}</em>`);}return P.join(' ');};
   const col=x=>{try{return V70C(x);}catch{return '#94a3b8';}},tl=x=>{try{return Progress.title(x);}catch{return x.id;}},art=x=>{try{return String(Progress.art(x));}catch{return '';}};
   const rows=L.map(x=>`<div class="p42c${x.id===E[kind]?' on':''}" style="--rc:${col(x)}"><div class="p42i">${art(x)}</div><div class="p42t"><b>${esc(tl(x))}</b><small>Lv.${x.level|0}</small>${dl(x)}</div>${x.id===E[kind]?`<button type="button" class="p42b gd" data-p42u="${esc(x.id)}">CƯỜNG HÓA</button>`:`<button type="button" class="p42b st" data-p42e="${esc(x.id)}">TRANG BỊ</button>`}</div>`).join('')||'<p style="color:#9fc0da;text-align:center">Chưa có món nào.</p>';
   if(!P42){P42=document.createElement('div');P42.id='p42';P42.hidden=true;document.body.appendChild(P42);P42.addEventListener('click',e=>{if(e.target===P42||e.target.closest('.p42x')){P42.hidden=true;return;}const eb=e.target.closest('[data-p42e]'),ub=e.target.closest('[data-p42u]');
     if(eb){try{Progress.equip(eb.dataset.p42e);}catch{}try{toast('ĐÃ TRANG BỊ');}catch{}const k=P42.dataset.k;try{KHO307.patch();L9B309.kho();}catch{}pick(k);try{khoDeck();}catch{}}
     else if(ub){P42.hidden=true;setTimeout(()=>{try{NC307.open(ub.dataset.p42u);}catch{}},20);}});}
   P42.dataset.k=kind;P42.innerHTML=`<div class="p42"><div class="p42h"><b>CHỌN ${KN[kind]||''}</b><button type="button" class="p42x" aria-label="Đóng">✕</button></div><div class="p42l">${rows}</div></div>`;P42.hidden=false;}
 document.addEventListener('click',e=>{try{if(!UIB()||window.PICK42===false)return;const s=e.target.closest&&e.target.closest('#hub40 .hb-doll.d9b .hb-slot[data-k307k]');if(!s)return;e.stopPropagation();e.preventDefault();pick(s.dataset.k307k);}catch{}},true);
 window.Pick42=pick;
 // ======================= 7) giải mã trước ảnh V2.1 của chiến cơ / Chiến Thần đang dùng (tránh khựng 1 khung lúc vào trận / biến hình) =======================
 const WARM=[];let warmK='';
 function warm(){if(!ON()||!window.EVO21_IMG)return;let n=0;try{n=(typeof launchCraft==='number'?launchCraft:selected)+1;}catch{}const k='t'+n;if(k===warmK)return;warmK=k;WARM.length=0;
   const keys=Object.keys(EVO21_IMG).filter(x=>x.startsWith('tau'+n+'_')||/^ct\d_(r|f)\d$/.test(x)).slice(0,40);let i=0;
   const step=()=>{const t0=performance.now();while(i<keys.length&&performance.now()-t0<6){const im=new Image();im.src=EVO21_IMG[keys[i++]];WARM.push(im);if(im.decode)im.decode().catch(()=>{});}if(i<keys.length)(window.requestIdleCallback||setTimeout)(step,{timeout:300});};step();}
 setInterval(()=>{try{if(!play())warm();}catch{}},2000);
 // ======================= 6) Vùng an toàn Android =======================
 function safe(){try{if(!ON()||window.SAFE42===false)return;const de=document.documentElement,n=+window.__satn||0;de.style.setProperty('--satn',Math.max(0,Math.min(80,n))+'px');}catch{}}
 window.Safe42=v=>{window.__satn=+v||0;safe();};safe();
 try{const cap=window.Capacitor,SB=cap&&cap.Plugins&&cap.Plugins.StatusBar;if(cap&&cap.isNativePlatform&&cap.isNativePlatform()&&SB){const hide=()=>{try{if(window.SAFE42!==false){SB.setOverlaysWebView&&SB.setOverlaysWebView({overlay:true});SB.hide&&SB.hide();}}catch{}};
   document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(hide,120);});window.addEventListener('focus',()=>setTimeout(hide,120));}}catch{}
 try{const st=document.createElement('style');st.id='v2142-css';st.textContent=`
:root{--sat42:max(env(safe-area-inset-top,0px),var(--satn,0px))}
:root{--sab42:max(env(safe-area-inset-bottom,0px),var(--sabn,0px))}
html.v2142 #tele07,html.v2142 #pause,html.v2142 #auto6x{translate:0 var(--sat42)}
html.v2142 body #hub9{top:var(--sat42)!important}
html.hub9on.v2142 body :is(.m63:not([hidden]),#nav74p,#w74,#m40){padding-top:calc(46px + var(--sat42))!important}
html.v2142:not(.hub9on) body :is(.m63:not([hidden]),#nav74p,#w74,#m40,#k307,#cd9,#ch10,#cp9,#q307){border-top:var(--sat42) solid transparent!important;box-sizing:border-box!important}
html.v2142 *{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}
html.v2142 .m63,html.v2142 #nav74p,html.v2142 #k307,html.v2142 #nc307{-webkit-overflow-scrolling:touch}
html.v2142 .v42hold{visibility:hidden!important}
html.ux9b.v2142 #hub40 #hb-body>.hb-doll:not(.d9b){visibility:hidden}`;(document.head||document.documentElement).appendChild(st);}catch{}

 if(ON())document.documentElement.classList.add('v2142');if(ON()&&window.UI42B!==false)document.documentElement.classList.add('ui42');
 // cờ dùng chung: tắt nét vẽ vector cũ V2.0 khi V2.1 bật (giữ nguyên khi window.EVO21=false hoặc V2142=false)
 setInterval(()=>{window.__L42=ON()&&window.EVO21!==false;},500);window.__L42=ON()&&window.EVO21!==false;
 // ======================= 9) Phóng to chiến cơ ×1,22 (cả dạng chiến cơ Chiến Thần), hitbox giữ nguyên =======================
 //  bọc NGOÀI CÙNG SuperGame.drawShip / SSSGame.draw: scale quanh tâm tàu → thân, cánh Bạo Tẩu, LED, lửa động cơ cùng to. Tắt: window.SCALE42=false
 const SK=()=>window.__L42&&window.SCALE42!==false&&(()=>{try{return mode==='play'||mode==='pause';}catch{return false;}})();
 function hookScale(){let a=false,b=false;
   try{if(typeof SuperGame!=='undefined'&&SuperGame.drawShip&&SuperGame.drawShip.__led){const od=SuperGame.drawShip;if(od.__s42)a=true;else{const f=function(){if(!SK())return od.apply(this,arguments);ctx.save();ctx.translate(player.x,player.y);ctx.scale(1.22,1.22);ctx.translate(-player.x,-player.y);try{return od.apply(this,arguments);}finally{ctx.restore();}};for(const k of Object.keys(od))try{f[k]=od[k];}catch{}f.__s42=1;f.__led=1;SuperGame.drawShip=f;a=true;}}}catch{}
   try{if(typeof SSSGame!=='undefined'&&SSSGame.draw&&SSSGame.draw.__led){const od=SSSGame.draw;if(od.__s42)b=true;else{const f=function(){if(!SK()||robOn())return od.apply(this,arguments);ctx.save();ctx.translate(player.x,player.y);ctx.scale(1.22,1.22);ctx.translate(-player.x,-player.y);try{return od.apply(this,arguments);}finally{ctx.restore();}};for(const k of Object.keys(od))try{f[k]=od[k];}catch{}f.__s42=1;f.__led=1;SSSGame.draw=f;b=true;}}}catch{}
   return a&&b;}
 const hk=setInterval(()=>{let ok=true;ok=hookMain()&&ok;ok=hookScale()&&ok;ok=hookFx()&&ok;ok=hookKill()&&ok;ok=hookSfx()&&ok;if(ok)clearInterval(hk);},400);setTimeout(()=>clearInterval(hk),60000);
 window.V2142API={state:()=>({ui:[uiRuns,Math.round(uiMs*10)/10,(window.__iv42||[]).length],modal:!!window.__modal42,heavy,sp:SP.length,auto:AU.n,ptr:PTR.n,stars:ST.length,spd,kho:KH.t,bg:!!(typeof NEN194!=='undefined'&&NEN194.draw&&NEN194.draw.__f42),hit:typeof Feedback31!=='undefined'&&!!Feedback31.__f42}),contour,wing};
})();
