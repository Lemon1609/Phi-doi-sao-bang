'use strict';
// V307 · HỆ THỐNG DẠNG LƯỚI (tranh GPT B7, 18/11/2026): trang ⚙ HỆ THỐNG (Nav74.page('gear')) đổi từ danh sách sang lưới ô biểu tượng như game cùng thể loại.
//  Ô Âm thanh / Hình ảnh / Mã quản trị mở bảng Cài đặt (Gfx66); ô Rung bật/tắt ngay (hiện BẬT/TẮT); các ô còn lại dùng lại lệnh cũ của nav74 (data-go74).
//  Tắt: window.SET307=false.
(function(){
 const I=window.SET307_IMG||{};if(!I.am_thanh)return;
 const im=k=>I[k]?`<img src="${I[k]}" alt="">`:'';
 const vib=()=>{const b=document.getElementById('vibration393');return b?/BẬT/i.test(b.textContent):null;};
 const T=(k,ic,n,go,s7,st)=>`<button type="button" class="s307t" ${go?`data-go74="${go}"`:`data-s7="${s7}"`}><i>${im(ic)}</i><b>${n}</b>${st!=null?`<em class="${st?'on':''}">${st?'BẬT':'TẮT'}</em>`:''}</button>`;
 function grid(){const v=vib();
  return `<h4 class="s307h">CÀI ĐẶT · THÔNG TIN</h4><div class="s307g">${T(1,'am_thanh','ÂM THANH',0,'snd')}${T(2,'hinh_anh','HÌNH ẢNH',0,'gfx')}${v==null?'':T(3,'rung','RUNG',0,'vib',v)}${T(4,'ma_quan_tri','MÃ QUÀ TẶNG',0,'code')}${T(5,'sao_luu','SAO LƯU','g_save')}${T(6,'so_tay','SỔ TAY','g_guide')}${T(7,'nhat_ky','NHẬT KÝ','g_story')}</div>
   <h4 class="s307h">XEM CHIẾN CƠ Ở SẢNH</h4><div class="s307g">${T(8,'tu_dien','TỰ DIỄN','g_auto')}${T(9,'thu_ky_nang','THỬ KỸ NĂNG','g_skill')}${T(10,'xem_max','XEM MAX','g_max')}${T(11,'khoe','KHOE','g_share')}</div>`;}
 function tick(){if(window.SET307===false)return;const el=document.getElementById('nav74p');if(!el||el.hidden)return;const c=el.querySelector('.n74pc');if(!c||c.dataset.s307)return;
  const h=c.querySelector('.n74ph b');if(!h||h.textContent.trim()!=='HỆ THỐNG'||!c.querySelector('[data-go74="g_set"]'))return;
  c.dataset.s307='1';c.classList.add('s307');[...c.children].forEach(x=>{if(!x.classList.contains('n74ph'))x.remove();});c.insertAdjacentHTML('beforeend',grid());}
 function openSet(focus){try{document.getElementById('nav74p').hidden=true;}catch{}try{Gfx66.open();}catch{}setTimeout(()=>{try{const p=document.querySelector('.st66:not([hidden]) .m63-card');if(!p)return;if(focus==='code'){const i=document.getElementById('st66-code');i&&i.scrollIntoView({block:'center'});i&&i.focus();}else if(focus==='snd'){const b=p.querySelector('[data-px=sound]');b&&b.scrollIntoView({block:'center'});}}catch{}},120);}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-s7]');if(!b||window.SET307===false)return;const k=b.dataset.s7;e.preventDefault();
  if(k==='vib'){const v=document.getElementById('vibration393');if(v){v.click();const on=vib();const em=b.querySelector('em');if(em){em.textContent=on?'BẬT':'TẮT';em.classList.toggle('on',!!on);}try{toast('RUNG: '+(on?'BẬT':'TẮT'));}catch{}}return;}
  openSet(k);},true);
 setInterval(()=>{try{tick();}catch{}},200);
})();
