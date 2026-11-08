'use strict';
// V74 · Sảnh gọn + sáng (theo góp ý: quá nhiều ô/chữ → gộp vào trang TIỆN ÍCH; màu tối → rực hơn).
// Không xóa nút gốc: ẩn đi, nút mới chỉ gọi .click() của nút gốc nên mọi chức năng giữ nguyên.
const Lobby74=(()=>{
 const root=()=>document.getElementById('hgr41');
 const norm=t=>String(t||'').replace(/\s+/g,' ').trim().toUpperCase();
 const GROUPS=[
  ['CHIẾN ĐẤU',['VIỄN CHINH','THỬ THÁCH NGÀY','TUẦN TRA','SẢNH SSS','TRANG BỊ SSS','VŨ KHÍ TT']],
  ['PHÁT TRIỂN',['HỢP THỂ','ĐỘT PHÁ SSS','ĐÁ KHẢM','NGUYÊN LIỆU','PHỤ TRỢ','PHI CÔNG','SKIN','TỦ SKIN']],
  ['GIAO LƯU',['GIAO DỊCH','KHOE']],
  ['HỆ THỐNG',['SỔ TAY','CÀI ĐẶT','SAO LƯU']],
  ['XEM CHIẾN CƠ',['TỰ DIỄN: BẬT','TỰ DIỄN: TẮT','THỬ KỸ NĂNG','SIÊU CẤP / MAX']]];
 const RIGHT=['HỢP THỂ','VŨ KHÍ TT','THỬ THÁCH NGÀY'],LEFT=['VIỄN CHINH','GIAO DỊCH'];
 const COL={'VIỄN CHINH':'#c77dff','THỬ THÁCH NGÀY':'#ff5d8f','SẢNH SSS':'#ffd166','TRANG BỊ SSS':'#ffb703','VŨ KHÍ TT':'#ff7b00','HỢP THỂ':'#b388ff','PHỤ TRỢ':'#4cc9f0','PHI CÔNG':'#00f5d4','SKIN':'#90e0ef','GIAO DỊCH':'#ffd166','KHOE':'#80ed99','CÀI ĐẶT':'#a9c1d9','SAO LƯU':'#7bf1a8','SỔ TAY':'#4cc9f0','TUẦN TRA':'#4cc9f0','ĐỘT PHÁ SSS':'#ff9e00','ĐÁ KHẢM':'#00f59b','NGUYÊN LIỆU':'#ffd166','TỦ SKIN':'#90e0ef','TỰ DIỄN: BẬT':'#5a8ab8','TỰ DIỄN: TẮT':'#5a8ab8','THỬ KỸ NĂNG':'#c77dff','SIÊU CẤP / MAX':'#ff5d8f'};
 // gom nút gốc theo nhãn
 function sources(){const r=root();if(!r)return {};const m={};
  r.querySelectorAll('.h1-side button,.dk67 .dk67b,.h1-fx button,.adv69b').forEach(b=>{if(b.closest('.l74'))return;const t=norm(b.querySelector('small')?.textContent||b.textContent).replace(/\s*»$/,'').replace(/^VŨ KHÍ TT.*/,'VŨ KHÍ TT');if(t&&!m[t])m[t]=b;});return m;}
 function iconOf(b){const sv=b.querySelector('svg');if(sv)return sv.outerHTML;const i=b.querySelector('i');if(i&&i.innerHTML.trim())return i.innerHTML;return '';}
 const GLYPH={'SẢNH SSS':'✦','TRANG BỊ SSS':'★','VŨ KHÍ TT':'✸','HỢP THỂ':'◆','PHỤ TRỢ':'⚙','CÀI ĐẶT':'⚙','SAO LƯU':'⇩','THỬ THÁCH NGÀY':'⚑','KHOE':'📸','SỔ TAY':'📖','TUẦN TRA':'⌖','ĐỘT PHÁ SSS':'⇧','ĐÁ KHẢM':'◆','NGUYÊN LIỆU':'◈','TỦ SKIN':'✧','TỰ DIỄN: BẬT':'▶','TỰ DIỄN: TẮT':'▶','THỬ KỸ NĂNG':'✦','SIÊU CẤP / MAX':'⚡'};
 function tile(name,b,cls){const lk=b&&(b.classList.contains('lk66')||b.classList.contains('lk67')||b.disabled);const dot=b&&(b.classList.contains('m63-dot')||b.querySelector('.h1-dot,.m63-dot,.dot'));const ic=b?iconOf(b):'';
  return `<button type="button" class="${cls} ${lk?'lk':''}" data-l74="${name}" style="--lc:${COL[name]||'#4cc9f0'}"><i>${ic||'<b>'+(GLYPH[name]||'•')+'</b>'}</i><small>${name}</small>${dot?'<em class="l74-dot">!</em>':''}</button>`;}
 let built=false,last='';
 function build(){const r=root();if(!r)return;const st=r.querySelector('.h1-stage');if(!st)return;const S=sources();const key=Object.keys(S).sort().join('|')+Object.values(S).map(b=>(b.className.includes('dot')?1:0)+(b.className.includes('lk6')?2:0)).join('');
  if(built&&key===last)return;last=key;built=true;r.classList.add('l74on');
  if(!st.querySelector('.l74-rays')){const y=document.createElement('div');y.className='l74-rays';y.innerHTML='<i></i><i></i><i></i><b></b>';st.insertBefore(y,st.firstChild.nextSibling);}
  if(window.NAV74ON)return;
  let L=st.querySelector('.l74.l74-l'),R=st.querySelector('.l74.l74-r');
  if(!L){L=document.createElement('div');L.className='l74 l74-l';st.appendChild(L);}
  if(!R){R=document.createElement('div');R.className='l74 l74-r';st.appendChild(R);}
  if(!st.querySelector('.l74-rays')){const y=document.createElement('div');y.className='l74-rays';y.innerHTML='<i></i><i></i><i></i><b></b>';st.insertBefore(y,st.firstChild.nextSibling);}
  L.innerHTML=LEFT.filter(n=>S[n]&&!(n==='GIAO DỊCH'&&S['VIỄN CHINH']&&window.V98!==false)).map(n=>tile(n,S[n],'l74-b')).join('');
  const hidden=Object.keys(S).filter(n=>!RIGHT.includes(n)&&!LEFT.includes(n)),moreDot=hidden.some(n=>S[n].classList.contains('m63-dot')||S[n].querySelector('.h1-dot,.m63-dot'));
  R.innerHTML=RIGHT.filter(n=>S[n]).map(n=>tile(n,S[n],'l74-b')).join('')+`<button type="button" class="l74-b more" data-l74="__more" style="--lc:#ffd166"><i><b>☰</b></i><small>TIỆN ÍCH</small>${moreDot?'<em class="l74-dot">!</em>':''}</button>`;}
 function page(){const S=sources();let el=document.getElementById('l74-more');if(!el){el=document.createElement('div');el.id='l74-more';el.className='l74pg';document.body.appendChild(el);el.addEventListener('click',e=>{const t=e.target.closest('[data-l74]');if(!t){if(e.target===el)el.hidden=true;return;}const n=t.dataset.l74;if(n==='__close'){el.hidden=true;return;}const b=sources()[n];el.hidden=true;if(b)b.click();});}
  const used=new Set();const grp=GROUPS.map(([g,list])=>{const items=list.filter(n=>S[n]);items.forEach(n=>used.add(n));return items.length?`<h4>${g}</h4><div class="l74g">${items.map(n=>tile(n,S[n],'l74-t')).join('')}</div>`:'';}).join('');
  const rest=Object.keys(S).filter(n=>!used.has(n));
  el.innerHTML=`<div class="l74pg-card"><div class="l74pg-top"><b>TIỆN ÍCH</b><button type="button" data-l74="__close" class="l74pg-x">✕</button></div>${grp}${rest.length?`<h4>KHÁC</h4><div class="l74g">${rest.map(n=>tile(n,S[n],'l74-t')).join('')}</div>`:''}</div>`;el.hidden=false;}
 document.addEventListener('click',e=>{const t=e.target.closest('#hgr41 .l74 [data-l74]');if(!t)return;e.stopPropagation();e.preventDefault();const n=t.dataset.l74;if(n==='__more'){page();return;}const b=sources()[n];if(b)b.click();},true);
 setInterval(()=>{try{build();}catch(e){}},800);
 return {build,page,sources:()=>Object.keys(sources()),src:sources,tile,COL,GLYPH};
})();
