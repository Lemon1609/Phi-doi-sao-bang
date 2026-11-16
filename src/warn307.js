'use strict';
// V307 · DẤU CẢNH BÁO ▲ đỏ ở mép trên khi quái LỚN / TINH ANH sắp vào màn (ký hiệu, không chữ; chủ dự án duyệt 16/11/2026).
// Chỉ đọc mảng enemies (large / elite, vừa sinh ở ngoài màn); không đổi logic trận. Tắt: window.WARN307=false
(()=>{try{
 const f=document.getElementById('game-field');if(!f)return;
 const seen=new WeakSet();let live=0;
 function mark(e){
  const cv=(typeof ctx!=='undefined'&&ctx.canvas)||null;if(!cv)return;
  const r=cv.getBoundingClientRect(),fr=f.getBoundingClientRect();
  const x=(e.x/W)*r.width+(r.left-fr.left);
  const d=document.createElement('div');d.className='wt307'+(e.elite?' el':'');d.setAttribute('aria-hidden','true');
  d.style.left=Math.max(14,Math.min(fr.width-14,x))+'px';f.appendChild(d);live++;
  setTimeout(()=>{d.remove();live--;},1500);
 }
 setInterval(()=>{
  if(window.WARN307===false||typeof mode==='undefined'||mode!=='play'||typeof enemies==='undefined')return;
  for(const e of enemies){if(!e||e.dead||seen.has(e)||!(e.large||e.elite)||e.y>-4||e.age>2)continue;seen.add(e);if(live<3)mark(e);}
 },120);
}catch(e){}})();
