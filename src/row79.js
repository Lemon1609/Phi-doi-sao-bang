// V79 · ĐỒ HỌA UI18b CÒN LẠI
//  1) DANH SÁCH CHIẾN CƠ dạng hàng (như game gốc): nút ☰ đầu dải chiến cơ → bảng hàng: ảnh · tên · Lv · khung · bậc · nút CHỌN.
//     Khung hàng theo màu: Trắng/Lục = thường · Lam = hiếm · Tím = huyền thoại (list_row_*).
//  2) BANNER MỤC TIÊU đầu trận (objective_banner): hiện 2,8 s rồi thu gọn, không che đạn.
//  Tắt: window.ROW79=false
const Row79=(()=>{
 const on=()=>window.ROW79!==false;
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const FC=['#d6e0ea','#3ee08f','#3aa8ff','#b45cff'];
 const frameOf=n=>{try{return TIER70.frame[n]|0;}catch{return n>=6?3:n>=2?2:n>=1?1:0;}};
 const tierName=n=>{try{return TIER70.name[n];}catch{return '';}};
 const nameOf=i=>{try{return crafts[i].name;}catch{try{return Fighters28.profiles[i].name;}catch{return 'Chiến cơ '+(i+1);}}};
 // ---------- 1 · danh sách chiến cơ ----------
 function addBtn(){const st=document.getElementById('hb-strip');if(!st||st.querySelector('.r79b'))return;const b=document.createElement('button');b.type='button';b.className='r79b';b.innerHTML='<span>☰</span><small>DANH SÁCH</small>';st.insertBefore(b,st.firstChild);}
 function rows(){const out=[];const ths=[...document.querySelectorAll('#hb-strip .hb-th[data-c]')];
  for(const th of ths){const i=+th.dataset.c;const lock=th.classList.contains('lock');let n=0;try{n=V70.craftN(i);}catch{}const f=frameOf(n);
   let grade='';try{grade=Workshop.craftGrade(i)||'';}catch{}let lv='';try{lv=(th.querySelector('small')||{}).textContent||'';}catch{}
   let cond='';if(lock){try{cond=Campaign36.craftCondition(i);}catch{}}
   const img=(th.querySelector('img')||{}).src||'';const cur=th.getAttribute('aria-current')==='true';
   out.push({i,lock,n,f,grade,lv,cond,img,cur});}
  return out;}
 function sheet(){let el=document.getElementById('r79');if(el)el.remove();el=document.createElement('div');el.id='r79';
  const R=rows();
  el.innerHTML=`<div class="r79c"><div class="r79h"><b>DANH SÁCH CHIẾN CƠ</b><button class="r79x v75-x" data-r79="x" aria-label="Đóng">✕</button></div><div class="r79l">${R.map(r=>`
   <div class="r79r ${r.f>=3?'leg':r.f>=2?'rare':''} ${r.lock?'lk':''} ${r.cur?'cur':''}" data-r79="pick" data-c="${r.i}">
    <span class="r79i"><img alt="" src="${r.img}"></span>
    <span class="r79t"><b>${esc(nameOf(r.i))}</b><small>${r.lock?esc(r.cond||'Chưa mở khóa'):`${esc(r.lv)} · <em style="color:${FC[r.f]}">${esc(tierName(r.n))}</em>${r.grade?' · Bậc '+esc(r.grade):''}`}</small></span>
    <span class="r79a">${r.lock?'🔒':r.cur?'ĐANG DÙNG':'CHỌN'}</span></div>`).join('')}</div></div>`;
  document.body.appendChild(el);}
 document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;
  if(t.closest('.r79b')){e.preventDefault();e.stopPropagation();sheet();return;}
  const el=document.getElementById('r79');if(!el||!el.contains(t))return;
  const x=t.closest('[data-r79="x"]');if(x||t===el){el.remove();return;}
  const r=t.closest('[data-r79="pick"]');if(r){if(r.classList.contains('lk')){try{toast('🔒 '+(r.querySelector('small')||{}).textContent);}catch{}return;}
   const th=document.querySelector('#hb-strip .hb-th[data-c="'+r.dataset.c+'"]');el.remove();if(th)th.click();}},true);
 // ---------- 2 · banner trong trận (mục tiêu ★ đầu ải và các dải thông báo lớn của Play63) ----------
 let bn=null;
 function banner(lines,dur,col){if(!on()||!document.body.classList.contains('play-screen'))return false;lines=(lines||[]).filter(Boolean);if(!lines.length)return false;
  if(!bn){bn=document.createElement('div');bn.id='obj79';}{const host=(document.getElementById('game-field')||{}).parentElement||document.body;if(bn.parentElement!==host)host.appendChild(bn);}
  bn.innerHTML='';const b=document.createElement('b');b.textContent=lines[0];if(col)b.style.color=col;bn.appendChild(b);for(const l of lines.slice(1)){const s=document.createElement('small');s.textContent=l;bn.appendChild(s);}
  bn.className='';void bn.offsetWidth;bn.className='open';clearTimeout(bn._t);bn._t=setTimeout(()=>{bn.className='';},Math.max(1200,(dur||3)*1000-350));return true;}
 setInterval(()=>{try{if(!on())return;addBtn();if(bn&&bn.className&&!['play','pause'].includes(mode))bn.className='';}catch{}},300);
 return {sheet,banner};
})();
window.Row79=Row79;
