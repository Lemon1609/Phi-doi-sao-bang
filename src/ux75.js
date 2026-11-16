'use strict';
// UX75 · REVIEW75 (Gemini 23/10) — tiện ích giảm thao tác:
//  • Càn quét ×5 (bảng ải trên bản đồ): quét liên tiếp tới 5 lần, dừng khi hết lượt/vé/thể lực, gộp 1 thông báo.
//  • Ẩn mềm tab cho người mới: TRANG BỊ sau ải 3, CỬA HÀNG sau ải 6, PHI ĐỘI sau ải 12 (người đã qua thì không ảnh hưởng).
//  • Gợi ý khi thua: 1 dòng lý do + 1 nút dẫn thẳng tới chỗ cần nâng (lực chiến thấp → Kho trang bị; đủ lực → mẹo né/Graze/bom).
//  Không làm (ghi chú Claude): Prologue lái thử SSS ở ải 1, mở Đá khảm ở ải 25 (game đang mở ở ải 70 — Gemini tự mâu thuẫn), đổi quà ngày 4 (game không có "trang bị Tím S tự chọn").
const UX75=(()=>{
 const T=m=>{try{toast(m);}catch{}};
 const cleared=()=>{try{return Progress.getState().cleared.length|0;}catch{return 999;}};
 // ---- càn quét ×5 ----
 function sweep5(n){let k=0,cr=0;for(let i=0;i<5;i++){let r=null;try{r=Campaign36.sweep(n);}catch{}if(!r)break;k++;cr+=r.credits|0;}
  if(k){T('CÀN QUÉT ẢI '+n+' ×'+k+' · +'+cr.toLocaleString('vi-VN')+' HỢP KIM');try{DeviceSave.flush();}catch{}}else T('HẾT LƯỢT / VÉ / THỂ LỰC ĐỂ CÀN QUÉT');return k;}
 // ---- ẩn mềm tab ----
 const GATE={equip:0,shop:6,fleet:12};   // V307: Trang bị mở ngay từ đầu; Cửa hàng/Phi đội hiện luôn nhưng khóa (như game gốc)
 function tabs(){const c=cleared();for(const [id,need] of Object.entries(GATE)){const b=document.querySelector('#nav74 [data-t="'+id+'"]');if(b){b.classList.toggle('ux75-lk',c<need);b.dataset.need=need;}}}
 // ---- gợi ý khi thua ----
 let card=null;
 function hint(){if(window.__m78)return;/* V78.4: chỉ hiện khi thật sự đang ở màn THUA (không hiện khi thắng rồi bấm về sảnh) */try{if(mode!=='over'||(typeof stageFinished36!=='undefined'&&stageFinished36))return;}catch{}try{if(gameMode!=='campaign')return;}catch{return;}let n=0,me=0,rq=0;try{n=+document.getElementById('mission-select').value||level;me=Math.round(Combat.stats().cp);rq=Math.round(Meta40.reqCP(n));}catch{}
  let why,btn='',act=null;
  if(rq&&me<rq*.92){why=`Lực chiến <b>${me.toLocaleString('vi-VN')}</b> thấp hơn đề nghị <b>${rq.toLocaleString('vi-VN')}</b> (${Math.round(me/rq*100)}%).`;btn='NÂNG TRANG BỊ NGAY ›';act=()=>{try{Nav74.tab('equip');setTimeout(()=>Nav74.sub('armory'),80);}catch{}};}
  else{why='Đủ lực chiến — trận này thua do trúng đạn. Lướt sát rìa đạn để nạp Graze/Bạo Tẩu, bấm BOM khi bị kẹp.';}
  if(!card){card=document.createElement('div');card.className='ux75d';document.body.appendChild(card);card.addEventListener('click',e=>{const b=e.target.closest('[data-ux]');if(!b)return;card.hidden=true;if(b.dataset.ux==='go'&&card._act)card._act();});}
  card._act=act;card.innerHTML=`<b>VÌ SAO THUA?</b><p>${why}</p><div>${btn?`<button data-ux="go">${btn}</button>`:''}<button data-ux="x" class="g">ĐÃ HIỂU</button></div>`;card.hidden=false;}
 // ---- GPT V75 #5: rút gọn số tài nguyên lớn (12.348.278 → 12,3M) ở chip đầu trang; số đầy đủ trong title ----
 const AB='.h1-chip b,#hub40 .hb-res i,#hub40 .hb-res b,.hb-res span';
 function abbr(){for(const el of document.querySelectorAll(AB)){if(el.children.length)continue;const t=el.textContent.trim();if(!/^\d{1,3}([.,]\d{3})+$/.test(t))continue;const n=+t.replace(/[.,]/g,'');if(n<100000)continue;
   el.title=t;el.textContent=n>=1e6?(Math.floor(n/1e5)/10).toLocaleString('vi-VN')+'M':Math.floor(n/1e3).toLocaleString('vi-VN')+'K';}}
 function install(){
  try{const oe=end;end=function(win){const r=oe.apply(this,arguments);try{if(!win&&card)card.hidden=true;if(!win)setTimeout(hint,350);}catch{}return r;};}catch{}
  try{const ors=reset;reset=function(){if(card)card.hidden=true;return ors.apply(this,arguments);};}catch{}
  setInterval(()=>{try{abbr();}catch{}},300);
  setInterval(()=>{try{tabs();if(card&&!card.hidden&&typeof mode!=='undefined'&&mode==='play')card.hidden=true;}catch{}},800);}
 setTimeout(()=>{try{install();}catch(e){console.warn('UX75',e);}},0);
 return {sweep5,tabs,hint,GATE};
})();
