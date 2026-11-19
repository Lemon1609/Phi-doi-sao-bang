'use strict';
// V307 bước 4 · ráp gói UI GPT vào các màn nhiều chữ (ui307b.css, ảnh UI307_IMG):
//  • Phó bản: băng tranh Tiếp tế & Săn Boss + Phó bản Vàng + Săn trang bị; • Sự kiện tuần: băng tranh theo loại sự kiện;
//  • Cây tiềm năng: biểu tượng nút (hỏa lực / giáp / máu / sượt / vũ khí phụ / cộng hưởng / bạo tẩu / chí mạng) + khung hàng + đường nối;
//  • Rương / Phó bản / Sự kiện: đoạn luật dài thu còn 2 dòng, chạm "Chi tiết ▾" để mở (nhớ trạng thái theo nội dung).
// Chỉ đổi hiển thị, không đổi số. Tắt: window.UI307B=false
(()=>{const I=window.UI307_IMG||{};const OPEN=new Set();let st=0;
 const key=t=>t.slice(0,48);
 function ban(anchor,k,where){if(!anchor||!I[k])return;const prev=where==='after'?anchor.nextElementSibling:anchor.previousElementSibling;if(prev&&prev.classList.contains('u7-ban')){if(prev.dataset.k!==k){prev.src=I[k];prev.dataset.k=k;}return;}
  const im=document.createElement('img');im.className='u7-ban';im.src=I[k];im.dataset.k=k;im.alt='';anchor.insertAdjacentElement(where==='after'?'afterend':'beforebegin',im);}
 function clamp(el,min){if(!el||el.dataset.u7c==='1')return;const t=(el.textContent||'').trim();if(t.length<(min||150))return;el.dataset.u7c='1';const k=key(t);el.classList.add('u7-cl');if(OPEN.has(k))el.classList.add('u7-op');
  const b=document.createElement('button');b.type='button';b.className='u7-more';b.textContent=OPEN.has(k)?'Thu gọn ▴':'Chi tiết ▾';b.onclick=ev=>{ev.stopPropagation();const o=!el.classList.contains('u7-op');el.classList.toggle('u7-op',o);o?OPEN.add(k):OPEN.delete(k);b.textContent=o?'Thu gọn ▴':'Chi tiết ▾';};el.insertAdjacentElement('afterend',b);}
 // nút cây tiềm năng → biểu tượng
 const ND=[[/Hỏa Lực|ATK|Hỏa lực/,'node_firepower'],[/Giáp|Lớp Đệm|Khiên/,'node_armor'],[/Khoang Lái|Máu|Sinh/,'node_hp'],[/Phản Xạ|Graze|Sượt/,'node_graze'],[/Vũ Khí Phụ|tên lửa|tàu con/,'node_subweapon'],[/Cộng Hưởng/,'node_resonance'],[/Bạo Tẩu|Giác Quan|chí tử/,'node_berserk'],[/Chí Mạng|chí mạng/,'node_crit']];
 function tree(){for(const n of document.querySelectorAll('.pl67-tree .pl67-node')){if(n.querySelector(':scope>.u7-nd'))continue;const t=n.textContent;const m=ND.find(([r])=>r.test(t));const k=m?m[1]:'node_resonance';if(!I[k])continue;const im=document.createElement('img');im.className='u7-nd';im.src=I[k];im.alt='';n.prepend(im);n.classList.add('u7-node');}
  const tr=document.querySelector('.pl67-tree');if(tr)tr.classList.add('u7-tree');}
 function dungeon(){const p=document.querySelector('section.dungeon-panel');if(!p||!p.getClientRects().length)return;const ey=p.querySelector(':scope>.eyebrow');ban(ey||p.querySelector(':scope>h2'),'banner_supply_boss','before');
  for(const h of p.querySelectorAll('#dungeon-cards h4')){if(/VÀNG/.test(h.textContent))ban(h,'banner_gold_vault','before');}
  const eq=p.querySelector('.equipment36>h3');if(eq)ban(eq,'banner_arena_duel','before');
  for(const e of p.querySelectorAll(':scope>p:not(#dungeon-status),#dungeon-cards article>p,#dungeon-cards article>small'))clamp(e,110);}
 function chest(){const c=document.getElementById('chest-lab');if(!c||!c.getClientRects().length)return;for(const e of c.querySelectorAll(':scope>p:not(#chest-counter):not(#chest-message)'))clamp(e,120);}
 function event(){const k=document.querySelector('.ev83k');if(!k||!k.getClientRects().length)return;const h=k.querySelector(':scope>h3');if(h){const t=h.textContent;const b=/Vô Tận|Vô tận/.test(t)?'banner_endless_vortex':/Vàng|Hợp kim|Kho/.test(t)?'banner_gold_vault':/Boss|Tiếp Tế|Săn/.test(t)?'banner_supply_boss':'banner_arena_duel';ban(h,b,'before');}
  for(const e of k.querySelectorAll('.ev83r>p.ev83n,.ev204>p.ev83n'))clamp(e,120);}
 function s(){const on=window.UI307B!==false;const r=document.documentElement;r.classList.toggle('ui307b',on);if(!on)return;
  if(!st&&I.card_row_frame){st=1;r.style.setProperty('--u7-row','url('+I.card_row_frame+')');}
  if(typeof mode!=='undefined'&&mode==='play')return;try{tree();dungeon();chest();event();}catch(e){}}
 s();setInterval(s,500);})();
