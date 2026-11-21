'use strict';
// V183 · HIỆU NĂNG + ĐỌC TRẬN (việc 1 sau kiểm tra V182; Gemini/GPT đồng thuận "bỏ vệt rơi dọc", "giảm số sao giữ tổng điểm")
//  • Tắt vệt sáng dọc dưới sao/vật phẩm (RV75_BEAM) — làm sao trông như đạn đang rơi.
//  • Sao điểm: ít hơn (giữ tổng điểm qua giá trị d.val), trần 10 sao trên màn, vẽ bằng canvas dựng sẵn (không xoay, không thu nhỏ ảnh 192 px mỗi khung).
//  • Viên buff: bỏ cột sáng, vòng quỹ đạo, vòng lan, nhãn chữ (luật: không vòng, không chữ trong trận); giữ tranh Pickup51 + nhún.
//  • Chế độ nhẹ tự bật (không lưu) khi độ phân giải đã hạ hết mà vẫn < 30 FPS 4 giây liền.
//  Tắt cả: window.DROP183=false (đặt trước khi vào trận).
window.RV75_BEAM=false;
const STAR185IM=(()=>{try{if(typeof SAO185==='undefined')return null;const i=new Image();i.src=SAO185;return i;}catch{return null;}})();
const STAR183=(()=>{const C={};return (big,s)=>{if(window.DROP183===false)return null;let im=null,gpt=false,n9=0;if(window.DROP309!==false&&window.DROP309IM&&DROP309IM.complete&&DROP309IM.naturalWidth){im=DROP309IM;gpt=true;n9=4;}/* V309 Lượt 5: sao mới */else if(window.SAO185!==false&&STAR185IM&&STAR185IM.complete&&STAR185IM.naturalWidth){im=STAR185IM;gpt=true;}else{try{im=Pickup51.img('star');}catch{}}if(!im)return null;
  const k=(big?1:0)+(gpt?2:0)+n9;if(C[k])return C[k];const w=Math.round(s*(n9?1.1:.92)),r=2,c=document.createElement('canvas');c.width=c.height=w*r;const g=c.getContext('2d');g.imageSmoothingQuality='high';g.drawImage(im,0,0,w*r,w*r);
  /* chủ dự án chốt: vàng dịu (GPT #D5A13B, lõi #FFE49A) — phủ màu lên tranh, giữ lõi sáng */if(gpt){c.w=w;C[k]=c;return c;}/* V185: tranh GPT đã đúng màu vàng dịu → không phủ màu */g.globalCompositeOperation='source-atop';const gr=g.createRadialGradient(w,w,0,w,w,w);gr.addColorStop(0,'rgba(255,228,154,.35)');gr.addColorStop(.45,'rgba(213,161,59,.55)');gr.addColorStop(1,'rgba(213,161,59,.7)');g.fillStyle=gr;g.fillRect(0,0,w*r,w*r);c.w=w;C[k]=c;return c;};})();
(()=>{let low=0,last=0,fr=0,acc=0,done=false;
  function tick(t){requestAnimationFrame(tick);const dt=last?(t-last)/1000:0;last=t;let p=false;try{p=mode==='play';}catch{}if(!p||done||document.hidden||!(dt>0&&dt<.5)){fr=0;acc=0;return;}
   fr++;acc+=dt;if(acc<1)return;const f=fr/acc;fr=0;acc=0;let atMin=false;try{const s=V105.state();atMin=s.scale<=1.5;}catch{}
   if(f<30&&atMin){if(++low>=4){done=true;try{if(VisualFX.counts().quality!=='light')VisualFX.setQuality('auto-light');}catch{}}}else low=0;}
  requestAnimationFrame(tick);window.V183={state:()=>({autoLight:done})};})();

// ---- V183b · Boss vào màn: 1 dải duy nhất ở trên (cảnh báo + tên boss), bỏ băng tên giữa màn và viền đỏ phủ màn,
//  xóa đạn địch khi bắt đầu cảnh báo, lời đe dọa boss chỉ hiện SAU pha cảnh báo. Tắt: window.BOSS183=false
(()=>{try{const st=document.createElement('style');st.textContent='body:not(.boss183-off) #game-field.boss-warn::after{display:none!important}';document.head.appendChild(st);}catch{}
  let was=false;setInterval(()=>{try{document.body.classList.toggle('boss183-off',window.BOSS183===false);const p=Feedback31.state().pending;if(p&&!was&&window.BOSS183!==false){for(const b of bullets)b.dead=true;}was=p;}catch{}},100);})();
function BOSSNM183(){try{if(typeof BOSSNAME80!=='undefined'&&BOSSNAME80[level])return BOSSNAME80[level];}catch{}try{return Bosses28.intro().name;}catch{return '';}}
// ---- V184 · Hào quang Danh hiệu (title84, lục giác dưới tàu) KHÔNG vẽ trong trận — luật "không vòng quanh tàu". Sảnh/màn khác giữ nguyên. Tắt: window.AURA184=false
(()=>{const t=setInterval(()=>{try{if(!window.AURA85||AURA85.__184)return;const o=AURA85.allow;AURA85.allow=function(k){try{if(window.AURA184!==false&&k==='title84'&&(mode==='play'||mode==='pause'))return false;}catch{}return o.apply(this,arguments);};AURA85.__184=1;clearInterval(t);}catch{}},300);})();

// ---- V185 · icon mảnh chiến cơ (GPT) cho ô Ngày 4 / Ngày 7 điểm danh (ký tự ✈ trước đây dùng tạm icon "phụ trợ"). Tắt: window.MANH185=false
setInterval(()=>{try{if(window.MANH185===false||typeof MANH185==='undefined')return;for(const d of document.querySelectorAll('#m40 .day')){const i=d.querySelector('i');if(!i||i.dataset.m185)continue;const b=(d.querySelector('b')||{}).textContent||'';if(!/NGÀY 4/i.test(b))continue;i.dataset.m185=1;i.innerHTML='<img alt="" src="'+MANH185+'" style="width:44px;height:44px;object-fit:contain">';}}catch{}},400);
