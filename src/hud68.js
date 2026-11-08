'use strict';
// V68-A · Giao diện trận đấu gọn theo game gốc (người dùng gửi video, duyệt 21/10/2026):
//  (1) Thông báo trong trận → hàng đợi chữ nổi ngắn phía trên chiến cơ, tối đa 3 dòng, không bao giờ chồng lên dải Play63.
//  (2) HUD trên một dòng: máu + giáp thành thanh đôi, ẩn số lẻ (chỉ hiện khi máu thấp); cảnh báo "thiếu lực chiến" chỉ khi THỰC SỰ thiếu
//      (trước đây hiện "⚠ ST 19%" cả khi dư lực chiến vì hệ số nén cuối game bị tính nhầm là thiếu).
//  (3) Laser boss báo trước ≥ 0,9 s: tam giác ⚠ ở mép màn hình + vạch đỏ mảnh dọc đường bắn.
//  (4) Màn thua: chẩn đoán lực chiến + nút CƯỜNG HÓA / PHI CÔNG / THỬ LẠI đi thẳng tới chỗ cần.
const HUD68={warn:.9,floatDur:1.7,floatMax:3,floatGap:.42};
const Hud68=(()=>{
 const $=id=>document.getElementById(id),TAU=Math.PI*2;
 const playing=()=>mode==='play';
 // ---------- (1) hàng đợi chữ nổi ----------
 let box=null;const q=[];let lastSpawn=0;
 function ensure(){if(box&&box.isConnected)return box;const f=$('game-field');if(!f)return null;box=document.createElement('div');box.id='fq68';box.setAttribute('aria-live','polite');f.appendChild(box);return box;}
 function tone68(s){return /BẠO TẨU|SIÊU|NÂNG|LÊN CẤP|LV/i.test(s)?'up':/KHIÊN|GIÁP|HỒI|MÁU/i.test(s)?'sh':/CẢNH BÁO|⚠|HẾT|MẤT|PHÁ GIÁP/i.test(s)?'wn':'';}
 function spawn(s){const b=ensure();if(!b)return;while(b.children.length>=HUD68.floatMax)b.firstChild.remove();const d=document.createElement('div');d.className='fq68 '+tone68(s);d.textContent=s;d.style.animationDuration=HUD68.floatDur+'s';b.appendChild(d);setTimeout(()=>d.remove(),HUD68.floatDur*1000+60);lastSpawn=performance.now();}
 function pump(){if(!q.length)return;if(!playing()){q.length=0;return;}if(performance.now()-lastSpawn<HUD68.floatGap*1000)return;spawn(q.shift());}
 const ot=toast;
 toast=function(s){if(!playing())return ot.apply(this,arguments);s=String(s==null?'':s).trim();if(!s)return;
  if(q.includes(s))return;const b=ensure();if(b&&[...b.children].some(c=>c.textContent===s&&!c.dataset.old)){return;}
  q.push(s);if(q.length>4)q.shift();pump();};
 // ---------- (2) HUD gọn + cảnh báo lực chiến đúng nghĩa ----------
 function rawFactor(){try{const fl=Combat.flight();if(!fl)return 1;return Combat.multiplier(fl.cp,Combat.requirement());}catch{return 1;}}
 function fixTele(){const t=$('tele07');if(!t||t.hidden)return;const cp=t.querySelector('.t7-cp'),sc=t.querySelector('.t7-sc');if(sc)sc.hidden=true;if(!cp)return;
  const f=rawFactor();if(f>=.999){cp.hidden=true;return;}cp.hidden=false;const v='⚠ ST '+Math.round(f*100)+'%';cp.title='Thiếu lực chiến: sát thương còn '+Math.round(f*100)+'%';if(cp.textContent!==v)cp.textContent=v;}
 // ---------- (3) báo trước laser ----------
 function stretch(){try{for(const b of beams){if(b.w68)continue;b.w68=1;if(b.warn!=null&&b.age<b.warn*.5&&b.warn<HUD68.warn)b.warn=HUD68.warn;}}catch{}}
 function tri(x,y,s,a){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.beginPath();ctx.moveTo(0,-s);ctx.lineTo(s*.95,s*.72);ctx.lineTo(-s*.95,s*.72);ctx.closePath();ctx.fillStyle='rgba(40,0,6,.82)';ctx.fill();ctx.lineWidth=2.4;ctx.strokeStyle='#ff3348';ctx.stroke();ctx.fillStyle='#ffd0d6';ctx.font="900 "+Math.round(s*1.05)+"px Neo,'Be Vietnam Pro',sans-serif";ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('!',0,s*.12);ctx.restore();}
 function drawWarn(){let list;try{list=beams;}catch{return;}if(!list||!list.length)return;ctx.save();ctx.globalCompositeOperation='source-over';
  for(const b of list){if(!(b.age<b.warn))continue;const u=Math.max(0,Math.min(1,b.age/b.warn)),blink=VisualFX.reduced()?1:.55+.45*Math.abs(Math.sin(time*16));
   const ang=b.angle28!==undefined?b.angle28+(b.sweep28||0)*0:Math.PI/2,len=b.angle28!==undefined?(b.length28||900):Math.max(0,H-(b.y||0)),x0=b.x,y0=b.y||0;
   // vạch đỏ mảnh
   ctx.save();ctx.globalAlpha=.5+.4*blink;ctx.strokeStyle='#ff2e44';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x0+Math.cos(ang)*len,y0+Math.sin(ang)*len);ctx.stroke();ctx.restore();
   // tam giác ⚠ ở điểm vào màn hình (kẹp trong khung)
   let tx,ty;const sn=Math.sin(ang),cl=(v,a,b2)=>Math.max(a,Math.min(b2,v));
   if(sn>.3){const yy=Math.max(52,y0);tx=cl(x0+Math.cos(ang)*(yy-y0)/sn,20,W-20);ty=cl(yy+(y0>=52?18:0),52,H-40);}else{tx=cl(x0+(Math.cos(ang)>=0?20:-20),20,W-20);ty=cl(y0,52,H-40);}
   tri(tx,ty,13+3*u,(.65+.35*blink));}
  ctx.restore();}
 // ---------- (4) màn thua ----------
 function failBox(card){if(!card||card.dataset.fx68)return;card.dataset.fx68=1;let cp=0,req=0;try{const fl=Combat.flight();cp=fl?fl.cp:Combat.stats().cp;req=Combat.requirement();}catch{}
  const camp=gameMode==='campaign';const lack=req>0&&cp<req;const pct=req>0?Math.round(cp/req*100):100;
  let pilotOk=false;try{pilotOk=Onboard66.open('pilot');}catch{}
  const msg=lack?`Lực chiến <b>${cp.toLocaleString('vi-VN')}</b> / đề nghị <b>${req.toLocaleString('vi-VN')}</b> (${pct}%) · cường hóa trang bị rồi quay lại!`
   :`Lực chiến đã đủ (${cp.toLocaleString('vi-VN')}). Mẹo: bay <b>sát đạn</b> để nạp GRAZE, giữ <b>bom</b> cho lúc boss xả đạn, né khi thấy <b>⚠ vạch đỏ</b>.`;
  const d=document.createElement('div');d.className='fx68';
  d.innerHTML=`<div class="fx68-t">${lack?'THIẾU LỰC CHIẾN':'GẦN LẮM RỒI!'}</div>${req>0&&camp?`<div class="fx68-bar"><i style="width:${Math.min(100,pct)}%"></i></div>`:''}<p>${msg}</p><div class="fx68-b"><button data-f68="craft" class="${lack?'hot':''}">⬆ CƯỜNG HÓA</button>${pilotOk?'<button data-f68="pilot">◉ PHI CÔNG</button>':''}<button data-f68="retry" class="${lack?'':'hot'}">↻ THỬ LẠI</button></div>`;
  const old=card.querySelector('.rs-hint');if(old)old.replaceWith(d);else card.appendChild(d);
  d.addEventListener('click',e=>{const k=e.target.closest('[data-f68]')?.dataset.f68;if(!k)return;e.stopPropagation();
   if(k==='retry'){$('start')?.click();return;}
   ($('lobby-back')||$('dock-return'))?.click();setTimeout(()=>{try{if(k==='craft')document.querySelector('#hgr41 [data-go="craft"]')?.click();else Pilot67.open();}catch{}},260);});}
 function watch(){const ov=$('overlay');if(!ov)return;new MutationObserver(()=>{const c=ov.querySelector('#rs.lose');if(c)failBox(c);}).observe(ov,{childList:true,subtree:true});}
 // ---------- cài ----------
 const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{if(mode==='play'||mode==='pause'){stretch();drawWarn();fixTele();pump();}}catch{}return r;};
 watch();
 return {queue:()=>q.slice(),spawn,rawFactor,failBox};
})();
// V68-A2: thân đạn đã vẽ 'source-over' (không cộng dồn thành trắng) → bớt giảm độ mờ cho đạn người chơi.
try{if(typeof GLOW66!=='undefined'&&typeof VIVID68!=='undefined'&&VIVID68.on){GLOW66.shot=1;GLOW66.shotSuper=.94;}}catch(e){}
