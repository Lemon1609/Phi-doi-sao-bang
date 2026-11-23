'use strict';
// V307 · màn Hợp thể (SSS) theo chỉ thị chủ dự án / Gemini 19/11 (sss307.css):
//  phủ tối nền hầm chứa · vòng ma trận năng lượng xoay dưới Chiến Thần · Chiến Thần nhún lơ lửng + tự bắn thử đạn của 2 tàu thành phần (canvas, chỉ để xem)
//  2 tàu thành phần đặt đối xứng hai bên, tia plasma chạy vào lõi · bấm HỢP THỂ / CƯỜNG HÓA: 2 tàu lao vào tâm → chớp vàng + sóng xung kích → Chiến Thần rung (0,8 s)
//  ảnh thẻ chọn không răng cưa · "Kỹ năng & chi tiết" và "TẬP BẮN 30 GIÂY" chung 1 hàng. Không đổi số, không đổi luồng bấm. Tắt: window.SSS307=false
(()=>{const SPR={0:'phoenix_feather',1:'ice_lance',2:'ice_lance',3:'void_fang',4:'radiant_dart',5:'quantum_shard',6:'crescent_slash',7:'thermobaric_sabot',8:'wing_blade',9:'star_spindle',10:'gravity_lance',11:'chrono_needle',12:'void_scythe'};
 const COL=['#ff7a2a','#7fdcff','#9fe8ff','#ff4b6e','#ffd166','#c77dff','#ff3355','#ff9e2c','#5cf2ff','#b388ff','#a06bff','#ffe066','#d86bff'];
 const IM={};const img=k=>{if(!k||!window.DAN307_IMG||!DAN307_IMG[k])return null;if(!IM[k]){IM[k]=new Image();IM[k].src=DAN307_IMG[k];}return IM[k];};
 const RING='<svg viewBox="0 0 200 200" aria-hidden="true"><g fill="none"><circle cx="100" cy="100" r="92" stroke="#FFD600" stroke-width="1.6"/><circle cx="100" cy="100" r="84" stroke="#FFD600" stroke-width="5" stroke-dasharray="1.2 5.4"/><circle cx="100" cy="100" r="66" stroke="#18C8FF" stroke-width="1.4"/><circle cx="100" cy="100" r="58" stroke="#18C8FF" stroke-width="4" stroke-dasharray="8 6"/></g></svg>';
 let cv=null,ctx=null,bul=[],last=0,raf=0,ids=[1,4],fx=0;
 function loop(t){raf=requestAnimationFrame(loop);if(window.V2142!==false){if(window.__modal42&&!document.querySelector('.ht197 .ht-hero'))return;const n42=performance.now();if(n42-(loop.l42||0)<31)return;loop.l42=n42;}/* V2.1.42: 30 FPS */const hero=document.querySelector('.ht197 .ht-hero');if(!hero||!cv||!cv.isConnected||!hero.offsetParent){cancelAnimationFrame(raf);raf=0;return;}
  const W=cv.clientWidth,H=cv.clientHeight;if(cv.width!==W*2){cv.width=W*2;cv.height=H*2;}const dt=Math.min(.05,(t-(last||t))/1000);last=t;ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,W,H);
  fx+=dt;if(fx>.16){fx=0;ids.forEach((id,j)=>{const side=j?1:-1;for(const dx of [-8,8])bul.push({x:W/2+side*26+dx*.5,y:110+(H-110)*.18,vy:-560,vx:side*12+dx*.6,id,a:0});});}
  ctx.globalCompositeOperation='lighter';
  for(const b of bul){b.y+=b.vy*dt;b.x+=b.vx*dt;b.a=Math.min(1,b.a+dt*8);const im=img(SPR[b.id]);ctx.globalAlpha=.8*b.a*Math.min(1,b.y/40);
   if(im&&im.complete&&im.naturalWidth){const h=46,w=h*im.naturalWidth/im.naturalHeight;ctx.drawImage(im,b.x-w/2,b.y-h/2,w,h);}
   else{const g=ctx.createLinearGradient(b.x,b.y-22,b.x,b.y+10);g.addColorStop(0,'#ffffff00');g.addColorStop(.5,COL[b.id]||'#7fdcff');g.addColorStop(1,'#ffffff');ctx.fillStyle=g;ctx.fillRect(b.x-2.5,b.y-22,5,32);}}
  bul=bul.filter(b=>b.y>-40);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';}
 function fuse(hero){hero.classList.remove('u7s-fuse');void hero.offsetWidth;hero.classList.add('u7s-fuse');setTimeout(()=>hero.classList.remove('u7s-fuse'),900);}
 function tick(){const on=window.SSS307!==false;document.documentElement.classList.toggle('sss307',on);if(!on)return;let m='';try{m=mode;}catch{}if(m==='play')return;
  const root=document.querySelector('.ht197');if(!root||!root.offsetParent)return;const hero=root.querySelector('.ht-hero'),rec=root.querySelector('.ht-rec');if(!hero)return;
  if(!root.querySelector(':scope>.u7s-dim')){const d=document.createElement('div');d.className='u7s-dim';root.prepend(d);}
  if(!hero.querySelector('.u7s-ring')){const r=document.createElement('div');r.className='u7s-ring';r.innerHTML=RING;hero.prepend(r);}{const pic=hero.querySelector('.ht-pic');if(pic)hero.style.setProperty('--u7s-ry',(pic.offsetTop+pic.offsetHeight*.93-125)+'px');}
  if(!hero.querySelector('canvas.u7s-cv')){cv=document.createElement('canvas');cv.className='u7s-cv';hero.appendChild(cv);ctx=cv.getContext('2d');bul=[];}else{cv=hero.querySelector('canvas.u7s-cv');ctx=cv.getContext('2d');}
  if(rec&&rec.parentElement!==hero){hero.appendChild(rec);rec.classList.add('u7s-rec');if(!rec.querySelector('.u7s-beam')){for(const s of ['l','r']){const b=document.createElement('i');b.className='u7s-beam '+s;rec.appendChild(b);}}}
  const cs=[...hero.querySelectorAll('.ht-c[data-cr]')].map(b=>+b.dataset.cr);if(cs.length===2)ids=cs;
  const mx=document.getElementById('ht-x');if(mx&&!mx.__u7s){mx.__u7s=1;mx.addEventListener('click',()=>{if(/HỢP THỂ|CƯỜNG HÓA/i.test(mx.textContent))fuse(hero);},true);}
  const more=root.querySelector(':scope>details.ht-more'),tb=root.querySelector(':scope>.tb200-btn');if(more&&tb&&!root.querySelector(':scope>.u7s-row')){const row=document.createElement('div');row.className='u7s-row';more.before(row);row.append(more,tb);}
  if(!raf)raf=requestAnimationFrame(loop);}
 tick();setInterval(tick,400);})();
