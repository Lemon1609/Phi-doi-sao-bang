'use strict';
// V306s · hàng 3 ô thưởng ở màn kết quả: HỢP KIM / TRANG BỊ / RƯƠNG của chuyến bay (đọc runCredits, runItems, runChests game đã tính; không thêm phần thưởng).
(()=>{try{
 const g=n=>{try{return Math.max(0,Math.floor(+eval(n))||0);}catch{return 0;}};
 function run(){
  const rs=document.getElementById('rs');if(!rs||rs.querySelector('.rw306'))return;
  const grid=rs.querySelector('.rs-grid');if(!grid)return;
  const L=[['o_vat_pham_lam','vang','HỢP KIM',g('runCredits')],['o_vat_pham_tim','trang_bi','TRANG BỊ',g('runItems')],['o_vat_pham_vang','qua','RƯƠNG',g('runChests')]];
  const w=document.createElement('div');w.className='rw306';
  w.innerHTML=L.map(([bg,ic,t,n])=>`<div class="rw306-c${n?'':' zero'}"><span class="rw306-s ${bg}"><i class="${ic}"></i></span><b>${n>999?'999+':n}</b><small>${t}</small></div>`).join('');
  grid.before(w);
 }
 new MutationObserver(()=>setTimeout(run,0)).observe(document.body,{childList:true,subtree:true});
}catch(e){}})();
