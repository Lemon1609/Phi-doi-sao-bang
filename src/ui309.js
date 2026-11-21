'use strict';
// V309 Lượt 2 · (1) Khung thẻ icon trang bị thống nhất: viền neon 2 px + nền tỏa sáng theo bậc, hàng sao trên đỉnh, mức cường hóa góc dưới-phải (+n / MAX),
//  vương miện vàng góc trên-trái cho đồ Hợp thể SSS. Bọc Progress.art (mọi nơi dùng icon trang bị). Tắt: window.THE309=false
//  (2) Khung bắn thử 280×180 trong bảng chi tiết trang bị (Hub40 gearSheet): lưới radar, bóng tàu mờ giữa, chạy demo món đang xem
//  bằng chính hàm vẽ trận (TB309: đạn / tên lửa / tàu con / khiên). Tắt: window.PV309=false
(()=>{
 const TC=['#5bc0eb','#10b981','#0284c7','#9333ea','#d946ef','#f59e0b'];
 const css=`.c309{position:relative!important;overflow:visible!important;border-radius:9px;box-shadow:inset 0 0 0 2px var(--c9),0 0 8px color-mix(in srgb,var(--c9) 55%,transparent);background-image:radial-gradient(circle at 50% 55%,color-mix(in srgb,var(--c9) 38%,transparent),transparent 70%)!important;background-color:rgba(8,14,26,.55)}
 .c309>b{display:none!important}
 .c309 .c9s{position:absolute;left:50%;top:-7px;transform:translateX(-50%);font:900 9px/1 sans-serif;letter-spacing:-1px;color:#fde047;text-shadow:0 0 2px #000,0 1px 0 #7c4a03;white-space:nowrap;pointer-events:none;z-index:2}
 .c309 .c9e{position:absolute;right:-3px;bottom:-4px;font:900 10px/1 sans-serif;color:#fff;background:linear-gradient(#1e293b,#0b1220);border:1px solid var(--c9);border-radius:5px;padding:1px 3px;pointer-events:none;z-index:2}
 .c309 .c9c{position:absolute;left:-5px;top:-6px;width:15px;height:11px;background:linear-gradient(#fff3a6,#f59e0b 60%,#b45309);clip-path:polygon(0 100%,0 25%,25% 60%,50% 0,75% 60%,100% 25%,100% 100%);filter:drop-shadow(0 0 2px #000);pointer-events:none;z-index:2}
 .c309.sss{--c9:#f59e0b;box-shadow:inset 0 0 0 2px #f59e0b,0 0 10px #a855f7aa}
 html body .c309 i.c9s,html body .c309 i.c9e,html body .c309 i.c9c{font-style:normal!important;line-height:1!important;background-size:auto!important;min-width:0!important;max-width:none!important;transform:none!important;opacity:1!important;margin:0!important}
 html body .c309 i.c9s{font-size:9px!important;width:auto!important;height:auto!important;background:none!important;color:#fde047!important;display:block!important;left:50%!important;top:-7px!important;transform:translateX(-50%)!important;position:absolute!important}
 html body .c309 i.c9e{font-size:10px!important;width:auto!important;height:auto!important;color:#fff!important;display:block!important;right:-3px!important;bottom:-4px!important;left:auto!important;top:auto!important;position:absolute!important;padding:1px 3px!important}
 html body .c309 i.c9c{display:block!important;width:15px!important;height:11px!important;position:absolute!important;left:-5px!important;top:-6px!important}
 .pv309{display:block;width:280px;height:180px;margin:8px auto 4px;border-radius:10px;border:1px solid #22d3ee55;box-shadow:0 0 12px #0891b244;background:#04101c}`;
 function addCss(){if(document.getElementById('ui309-css'))return;const s=document.createElement('style');s.id='ui309-css';s.textContent=css;document.head.appendChild(s);}
 function tierName(i){try{return String(V70T(i)||'');}catch{return '';}}
 // bậc theo tên hiển thị (Trắng / Lục / Lam / Tím / Tím+n / SS) — cùng nguồn với Kho; không có thì theo spec.rank
 function rankOf(i){const n=tierName(i);if(n){if(/SS/.test(n))return 5;if(/Tím/.test(n))return /\+\s*5/.test(n)?4:3;if(/Lam/.test(n))return 2;if(/Lục/.test(n))return 1;return 0;}let r=0;try{r=(i.spec||gearSpec(i)).rank|0;}catch{}return Math.max(0,Math.min(5,r));}
 function plusOf(i){const m=tierName(i).match(/\+\s*(\d+)/);return m?+m[1]:(i.enhance|0);}
 function hookArt(){try{if(typeof Progress==='undefined'||!Progress.art||Progress.art.__u309)return false;const o=Progress.art;
  const f=function(i){const h=o.apply(this,arguments);try{if(window.THE309===false||!i||typeof i!=='object'||!i.kind)return h;const r=rankOf(i),en=plusOf(i),sss0=/^sss_/.test(i.variant||'')||!!i.sss;let sid=null;try{if(typeof Gear44!=='undefined'&&Progress.getState().equipped[i.kind]===i.id){const a=Gear44.activeId(i.kind);if(a&&/^sss_/.test(a))sid=a;}}catch{}/* món đang mặc đã hợp thể SSS → vương miện */
    const sss=sss0||!!sid,cap=sid?10:(i.key?10:5);
    let en2=en;if(sid){try{en2=Gear44.sssEnh(sid)|0;}catch{}}const stars='★'.repeat(sss?5:Math.min(5,r+1)),e=en2>=cap?'MAX':en2>0?'+'+en2:'';
    return String(h).replace(/class="gear25-art/,'class="gear25-art c309'+(sss?' sss':'')).replace(/style="/,'style="--c9:'+TC[r]+';').replace(/<\/span>\s*$/,`<i class="c9s">${stars}</i>${e?`<i class="c9e">${e}</i>`:''}${sss?'<i class="c9c"></i>':''}</span>`);}catch{return h;}};
  f.__u309=1;Progress.art=f;return true;}catch{return false;}}
 // ---------- khung bắn thử ----------
 let RAF=0;
 function preview(cv,it){const g=cv.getContext('2d'),W=280,H=180,DPR=Math.min(2,window.devicePixelRatio||1);cv.width=W*DPR;cv.height=H*DPR;g.scale(DPR,DPR);
  const T=window.TB309;if(!T)return;const kind=it.kind,v=it.variant,I=T.info(v,kind);const S={b:[],t0:performance.now()/1000,last:0,acc:0,sh:0};
  const ship=T.img&&T.img('c_s_mini_drone');
  function frame(){if(!cv.isConnected){RAF=0;return;}RAF=requestAnimationFrame(frame);const t=performance.now()/1000,dt=Math.min(.05,t-(S.last||t));S.last=t;
   g.setTransform(DPR,0,0,DPR,0,0);g.clearRect(0,0,W,H);g.fillStyle='#04101c';g.fillRect(0,0,W,H);
   g.strokeStyle='rgba(34,211,238,.10)';g.lineWidth=1;for(let x=10;x<W;x+=20){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=10;y<H;y+=20){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
   g.strokeStyle='rgba(34,211,238,.18)';for(const r of [40,80,120]){g.beginPath();g.arc(140,150,r,Math.PI,2*Math.PI);g.stroke();}
   const sx=140,sy=146;
   if(ship){g.save();g.globalAlpha=.35;g.drawImage(ship,sx-22,sy-22,44,44);g.restore();}else{g.fillStyle='rgba(120,170,220,.3)';g.beginPath();g.moveTo(sx,sy-20);g.lineTo(sx+16,sy+14);g.lineTo(sx-16,sy+14);g.closePath();g.fill();}
   g.save();g.translate(sx,sy);g.scale(.8,.8);g.translate(-sx,-sy);
   if(kind==='sidearm'){const P=[{x:sx-58,y:sy+4},{x:sx+58,y:sy+4}];S.acc+=dt;if(S.acc>.28){S.acc=0;for(const p of P)S.b.push({x:p.x,y:p.y-18,vx:0,vy:-420,age:0});}
    for(const p of P)try{T.pod(g,it,p,false,true);}catch{}}
   else if(kind==='missiles'){S.acc+=dt;if(S.acc>.7){S.acc=0;for(const sd of [-1,1])S.b.push({x:sx+sd*26,y:sy,vx:sd*190,vy:-120,age:0,sd,m:1});}}
   else if(kind==='armor'){const c=(t-S.t0)%3.2,key=(T.SHF&&T.SHF[v])||'shield_hex',im=T.tint(key,I.pal),R=40;
    if(c<2.4){if(im){g.save();g.globalAlpha=.6;g.translate(sx,sy);g.rotate(t*.6);g.drawImage(im,-R-2,-R-2,R*2+4,R*2+4);g.restore();}if(c<.35){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.7*(1-c/.35);g.strokeStyle=I.pal[0];g.lineWidth=2;g.beginPath();g.arc(sx,sy,70-30*c/.35,0,6.283);g.stroke();g.restore();}}
    else{const q=(c-2.4)/.8;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.8*(1-q);g.strokeStyle=I.pal[1];g.lineWidth=5*(1-q)+1;g.beginPath();g.arc(sx,sy,40+55*q,0,6.283);g.stroke();
     g.fillStyle=I.pal[0];for(let k=0;k<7;k++){const a=k/7*6.283,d=40+q*70;g.beginPath();g.arc(sx+Math.cos(a)*d,sy+Math.sin(a)*d,2.5,0,6.283);g.fill();}g.restore();}}
   for(const b of S.b){b.age+=dt;if(b.m){const a=Math.atan2(-1,0);b.vx+=(Math.cos(a)*360-b.vx)*Math.min(1,dt*3);b.vy+=(Math.sin(a)*360-b.vy)*Math.min(1,dt*3);}b.x+=b.vx*dt;b.y+=b.vy*dt;
    try{T.put(g,b,I,!!b.m,false,b.age,b);}catch{}}
   S.b=S.b.filter(b=>b.y>-60&&b.age<2.5);g.restore();
   g.fillStyle='rgba(165,243,252,.7)';g.font='700 10px sans-serif';g.fillText('BẮN THỬ',8,14);}
  if(RAF)cancelAnimationFrame(RAF);frame();}
 function watch(){const mo=new MutationObserver(()=>{if(window.PV309===false)return;for(const sh of document.querySelectorAll('[data-item]')){if(!sh.querySelector('#sh-eq')||sh.querySelector('.pv309'))continue;
    let it=null;try{it=Progress.getState().items.find(x=>x.id===sh.dataset.item);}catch{}if(!it)continue;const cv=document.createElement('canvas');cv.className='pv309';
    const hd=sh.querySelector('div');if(hd&&hd.nextSibling)sh.insertBefore(cv,hd.nextSibling);else sh.appendChild(cv);preview(cv,it);}});
  mo.observe(document.body,{childList:true,subtree:true});}
 function hookSSS(){try{if(typeof Gear44==='undefined'||!Gear44.slotPic||Gear44.slotPic.__u309)return typeof Gear44!=='undefined'&&!!(Gear44.slotPic&&Gear44.slotPic.__u309);const o=Gear44.slotPic;
  const f=function(kind){const h=o.apply(this,arguments);if(!h||window.THE309===false)return h;let e='';try{const id=Gear44.activeId(kind),n=Gear44.sssEnh(id)|0;e=n>=10?'MAX':n>0?'+'+n:'';}catch{}
   return `<span class="c309 sss" style="--c9:#f59e0b;display:inline-block">${h}<i class="c9s">★★★★★</i>${e?`<i class="c9e">${e}</i>`:''}<i class="c9c"></i></span>`;};f.__u309=1;Gear44.slotPic=f;return true;}catch{return false;}}
 function init(){addCss();if(!hookArt()){const t=setInterval(()=>{if(hookArt())clearInterval(t);},300);}if(!hookSSS()){const t3=setInterval(()=>{if(hookSSS())clearInterval(t3);},300);}watch();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 window.UI309={preview,rankOf};
})();
