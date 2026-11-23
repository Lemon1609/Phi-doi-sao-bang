'use strict';
// V309 LƯỢT 15B · ĐỒNG BỘ ICON (Gemini, chủ dự án chuyển 22/11). Tắt: window.ICON15B=false
//  • window.UI_ICONS: kho icon dùng chung — ảnh 3D sẵn có (rương B9307_IMG, tài nguyên / đá XP UI307_IMG) + SVG ánh kim chrome tự vẽ.
//  • Thay emoji HÌNH của hệ điều hành trong chữ giao diện (🔒 📅 🏆 🔋 📦 🎁 🎯 🎵 ⚔ 🛡 ✈ ☝) bằng icon cùng phong cách.
//    KHÔNG đụng ◈ ⬢ 💎 🎫 ⚡: nhiều mô-đun đọc các ký tự này trong chữ để tự vẽ icon / quy đổi (đổi sẽ hỏng chúng).
//  • Huy hiệu Chiến Lệnh (thay vòng "CL"), thẻ rương trong kho phóng to ảnh 3D. Không chạy trong trận.
const UI_ICONS=(()=>{
 const on=()=>window.ICON15B!==false;
 const U=k=>{try{return (typeof UI307_IMG!=='undefined'&&UI307_IMG[k])||'';}catch{return '';}};
 const R=k=>{try{return (window.B9307_IMG||{})[k]||'';}catch{return '';}};
 let gid=0;
 // SVG ánh kim: thân chrome (trắng → xám xanh → thép) + viền tối mảnh + điểm nhấn vàng
 function svg(body,accent){const id='c15'+(gid++);return 'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#b9cde0"/><stop offset=".55" stop-color="#7f97ad"/><stop offset="1" stop-color="#dfeaf5"/></linearGradient><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#ffc53d"/><stop offset="1" stop-color="#c47a00"/></linearGradient></defs><g fill="url(#${id})" stroke="#0b1a2c" stroke-width="1.4" stroke-linejoin="round">${body}</g>${accent?`<g fill="url(#${id}g)" stroke="#3a2200" stroke-width="1">${accent}</g>`:''}</svg>`);}
 const S={
  lock:svg('<rect x="7" y="14" width="18" height="14" rx="2.5"/><path d="M11 14v-4a5 5 0 0 1 10 0v4h-3v-4a2 2 0 0 0-4 0v4z"/>','<circle cx="16" cy="21" r="2.2"/>'),
  calendar:svg('<rect x="5" y="7" width="22" height="20" rx="3"/><path d="M5 12h22" fill="none"/><rect x="9" y="4" width="3" height="6" rx="1"/><rect x="20" y="4" width="3" height="6" rx="1"/>','<rect x="10" y="16" width="5" height="4" rx="1"/><rect x="17" y="16" width="5" height="4" rx="1"/><rect x="10" y="21.5" width="5" height="3.5" rx="1"/>'),
  trophy:svg('<path d="M10 5h12v6a6 6 0 0 1-12 0z"/><path d="M10 7H6a4 4 0 0 0 4 6M22 7h4a4 4 0 0 1-4 6" fill="none"/><rect x="14" y="16" width="4" height="5"/><rect x="10" y="21" width="12" height="5" rx="1.5"/>','<path d="M16 6.5l1.2 2.5 2.7.4-2 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-2-1.9 2.7-.4z"/>'),
  target:svg('<circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="6.5"/>','<circle cx="16" cy="16" r="2.6"/>'),
  music:svg('<path d="M12 7l13-3v16a3.5 3 0 1 1-2-2.7V9l-9 2v12a3.5 3 0 1 1-2-2.7z"/>'),
  swords:svg('<path d="M5 5l3 0 13 13-3 3L5 8z"/><path d="M27 5l-3 0-13 13 3 3L27 8z"/>','<rect x="5" y="22" width="6" height="2.6" rx="1" transform="rotate(-45 8 23)"/><rect x="21" y="22" width="6" height="2.6" rx="1" transform="rotate(45 24 23)"/>'),
  shield:svg('<path d="M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7z"/>','<path d="M16 9l5 2v4c0 3.5-2.3 6-5 7-2.7-1-5-3.5-5-7v-4z"/>'),
  plane:svg('<path d="M16 3c1.4 0 2 2 2 4v6l9 5v3l-9-2.5V25l3 2v2l-5-1.3L11 29v-2l3-2v-6.5L5 21v-3l9-5V7c0-2 .6-4 2-4z"/>'),
  hand:svg('<path d="M13 4a2 2 0 0 1 4 0v9h1a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v6c0 5-3 8-8 8h-2c-3 0-5-2-7-5l-3-5a2 2 0 0 1 3-2l2 2V4z"/>'),
  // V309 L16 · Đá Nội Tại
  crystal:svg('<path d="M16 2l9 9-9 19-9-19z"/><path d="M7 11h18M16 2l-3 9 3 19 3-19z" fill="none"/>','<path d="M16 5l2.5 6H13.5z"/>'),
  slot_atk:svg('<path d="M16 3l3 10h-6zM13 13h6v12l-3 4-3-4z"/><path d="M9 14h14v3H9z"/>'),
  slot_def:svg('<path d="M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7z"/>','<path d="M14 10h4v4h4v4h-4v4h-4v-4h-4v-4h4z"/>'),
  slot_tac:svg('<circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="4"/>','<path d="M16 4l2 8-2 2-2-2zM28 16l-8 2-2-2 2-2zM16 28l-2-8 2-2 2 2zM4 16l8-2 2 2-2 2z"/>'),
  pha_giap:svg('<path d="M16 3l10 4v8c0 7-4.5 11.5-10 14C10.5 26.5 6 22 6 15V7z"/>','<path d="M17 6l-4 9h4l-3 11 8-13h-4l3-7z"/>'),
  phan_cong:svg('<path d="M3 23l9-9 4 4 6.5-6.5-3-3H29v9.5l-3-3-10 10-4-4-6 6z"/>','<path d="M4 27h24v2.5H4z"/>'),
  xung_kich:svg('<path d="M16 1.5l3.2 7.8 7.6-3.1-3.1 7.6 7.8 3.2-7.8 3.2 3.1 7.6-7.6-3.1-3.2 7.8-3.2-7.8-7.6 3.1 3.1-7.6L.5 16.1l7.8-3.2-3.1-7.6 7.6 3.1z"/>','<circle cx="16" cy="16" r="4.6"/>'),
  hap_thu:svg('<path d="M16 29C6 22 2.5 16 2.5 10.5a7 7 0 0 1 13.5-2.6 7 7 0 0 1 13.5 2.6C29.5 16 26 22 16 29z"/>','<path d="M13.5 8.5h5v5h5v5h-5v5h-5v-5h-5v-5h5z"/>'),
  xung_chan:svg('<path fill-rule="evenodd" d="M16 2a14 14 0 1 0 .01 0zM16 5a11 11 0 1 0 .01 0zM16 7.5a8.5 8.5 0 1 0 .01 0zM16 10.5a5.5 5.5 0 1 0 .01 0z"/>','<circle cx="16" cy="16" r="3"/>'),
  vo_nl:svg('<path d="M16 3c7 0 12 5 12 12s-5 14-12 14S4 22 4 15 9 3 16 3z"/><path d="M10 15a6 6 0 0 1 12 0" fill="none"/>','<circle cx="16" cy="18" r="3"/>'),
  duy_tri:svg('<path d="M16 2c2 5 8 7 8 15a8 8 0 0 1-16 0c0-4 2-6 3-9 1 3 3 4 3 4 0-5 1-7 2-10z"/>','<path d="M16 15v6l4 2" fill="none" stroke="#3a2200" stroke-width="2"/>'),
  tu_truong:svg('<path d="M5 3h8v12a3 3 0 0 0 6 0V3h8v12.5a11 11 0 0 1-22 0z"/>','<path d="M5 3h8v5H5zM19 3h8v5h-8z"/><path d="M14.5 30l1.5-3 1.5 3-1.5 1.6z"/>'),
  nap_nhanh:svg('<circle cx="16" cy="17" r="12"/>','<path d="M18 5l-8 13h6l-2 10 8-13h-6z"/>'),
  badge:svg('<path d="M16 2l10 4v9c0 7-4.5 11.5-10 14C10.5 26.5 6 22 6 15V6z"/><path d="M6 11L1 9l2 6 3 1M26 11l5-2-2 6-3 1"/>','<path d="M11 12l5-3 5 3v2l-5-3-5 3zM11 16l5-3 5 3v2l-5-3-5 3zM16 20l1.3 2.6 2.9.4-2.1 2 .5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2 2.9-.4z"/>')};
 const I={stamina:()=>U('icon_stamina'),alloy:()=>U('icon_alloy'),diamond:()=>U('icon_diamond'),pilot:()=>U('icon_pilot_shard'),
  xp1:()=>U('icon_xp_crystal_white'),xp2:()=>U('icon_xp_crystal_green'),xp3:()=>U('icon_xp_crystal_purple'),xp4:()=>U('icon_xp_crystal_gold'),
  chest_tb:()=>R('ruong_trang_bi'),chest_cc:()=>R('ruong_chien_co'),chest_boss:()=>R('ruong_boss'),chest_tb_open:()=>R('ruong_trang_bi_mo'),chest_cc_open:()=>R('ruong_chien_co_mo'),chest_boss_open:()=>R('ruong_boss_mo'),
  swords:()=>U('icon_crossed_swords')||S.swords};
 const src=k=>{const f=I[k];if(f){const v=f();if(v)return v;}return S[k]||'';};
 const img=(k,cls='',alt='')=>{const s=src(k);return s?`<img class="ic15 ${cls}" src="${s}" alt="${alt}" draggable="false">`:'';};
 // emoji → icon (bỏ cả ký tự chọn kiểu U+FE0F theo sau)
 const MAP={'🔒':'lock','📅':'calendar','🏆':'trophy','🔋':'stamina','📦':'chest_tb','🎁':'chest_tb','🎯':'target','🎵':'music','⚔':'swords','🛡':'shield','✈':'plane','☝':'hand'};
 const RX=new RegExp('('+Object.keys(MAP).map(c=>c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')\\uFE0F?','gu');
 const RXT=new RegExp(RX.source,'u');
 const SKIP='script,style,textarea,input,select,option,[contenteditable],#perf15,.ic15,svg,canvas';
 function swapNode(n){const t=n.nodeValue;if(!t||!RXT.test(t))return;const p=n.parentElement;if(!p||p.closest(SKIP))return;
  RX.lastIndex=0;const frag=document.createDocumentFragment();let last=0,m;
  while((m=RX.exec(t))){if(m.index>last)frag.appendChild(document.createTextNode(t.slice(last,m.index)));const k=MAP[m[1]],s=src(k);
   if(s){const e=document.createElement('img');e.className='ic15 ic15e';e.src=s;e.alt='';e.draggable=false;e.dataset.e=m[1];frag.appendChild(e);}else frag.appendChild(document.createTextNode(m[0]));last=m.index+m[0].length;}
  if(last<t.length)frag.appendChild(document.createTextNode(t.slice(last)));p.replaceChild(frag,n);}
 function walk(root){if(!root)return;if(root.nodeType===3){swapNode(root);return;}if(root.nodeType!==1||root.closest&&root.closest(SKIP))return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const L=[];let n;while((n=w.nextNode()))if(RXT.test(n.nodeValue))L.push(n);for(const x of L)swapNode(x);}
 const play=()=>{try{return mode==='play';}catch{return false;}};
 let pend=new Set(),timer=0;
 function flush(){timer=0;if(!on()||play()){pend.clear();return;}const a=[...pend];pend.clear();for(const n of a){try{if(n.isConnected)walk(n);}catch{}}extra();}
 const mo=new MutationObserver(rs=>{if(!on())return;for(const r of rs){if(r.type==='characterData')pend.add(r.target);else for(const n of r.addedNodes)pend.add(n);}if(!timer)timer=setTimeout(flush,90);});
 // ---------- các chỗ riêng ----------
 function extra(){
  // huy hiệu Chiến Lệnh (l11309 .sl11 > i "CL")
  for(const i of document.querySelectorAll('.sl11 > i')){if(i.textContent.trim()==='CL'&&!i.querySelector('img')){i.innerHTML=img('badge','ic15cl','Chiến lệnh');i.classList.add('cl15');}}
  // thẻ rương trong kho: ảnh 3D to (cả rương Vô tận)
  let st=null;try{st=Chests.getState();}catch{}const map={};if(st)for(const c of st.crates)map[c.id]=c;
  for(const b of document.querySelectorAll('#chest-inventory [data-chest]')){const c=map[b.dataset.chest];const ic=b.querySelector('.chest-icon');if(!ic)continue;
   const k=!c?'chest_tb':c.k14?({boss:'chest_boss',cc:'chest_cc',tb:'chest_tb'}[c.k14]||'chest_tb'):(['A','C'].includes(c.grade)?'chest_boss':c.type==='craft'?'chest_cc':'chest_tb');/* Vô tận bậc A = «Rương Boss» như nhãn b9307 */
   if(ic.dataset.i15!==k||!ic.querySelector('img.ic15big')){ic.dataset.i15=k;ic.innerHTML=img(k,'ic15big','');}b.classList.add('i15card');}}
 const css=`img.ic15{display:inline-block;width:1.2em;height:1.2em;object-fit:contain;vertical-align:-.24em;margin:0 .08em;filter:drop-shadow(0 1px 1px #0008)}
html.i15on #chest-inventory .i15card .chest-icon{display:flex!important;align-items:center;justify-content:center;width:100%!important;height:78px!important;margin:0 auto 4px!important;font-size:0!important;background:none!important}
html.i15on #chest-inventory .i15card img.ic15big{width:76px!important;height:76px!important;margin:0;vertical-align:0;filter:drop-shadow(0 4px 8px #000a) drop-shadow(0 0 10px #3fe6ff44)}
html.i15on #chest-inventory .i15card{min-height:150px!important}
.q77-ms.q15{background:none!important;border:0!important;box-shadow:none!important;overflow:visible!important;width:38px!important;height:38px!important;padding:0!important;margin-left:-19px!important;top:-12px!important}
.q77-ms.q15::before,.q77-ms.q15::after{display:none!important}
.q77-ms.q15 img.q15c{width:38px;height:38px;object-fit:contain;filter:grayscale(.7) brightness(.55) drop-shadow(0 2px 3px #000c);transition:filter .2s}
.q77-ms.q15.ok:not(.got) img.q15c{filter:drop-shadow(0 0 5px #ffd56a) drop-shadow(0 0 9px #3fe6ffaa);animation:q15b .7s ease-in-out infinite alternate}
.q77-ms.q15.got img.q15c{filter:saturate(.5) drop-shadow(0 2px 3px #000c);opacity:.55}
.q77-ms.q15 .q15t{position:absolute;right:-2px;top:-2px;color:#46ffb2;font:900 13px/1 sans-serif;text-shadow:0 0 3px #000,0 0 2px #000}
.q77-ms.q15 small{position:absolute;left:50%;transform:translateX(-50%);top:38px;white-space:nowrap}
@keyframes q15b{to{transform:translateY(-3px) scale(1.06)}}
.sl11 > i.cl15{background:none!important;border:0!important;box-shadow:none!important;display:flex!important;align-items:center;justify-content:center}
.sl11 > i.cl15 img.ic15cl{width:40px;height:40px;margin:0;vertical-align:0;filter:drop-shadow(0 2px 4px #000c) drop-shadow(0 0 6px #ffd56a66)}`;
 function init(){const s=document.createElement('style');s.id='l15b-css';s.textContent=css;document.head.appendChild(s);
  const tick=()=>{document.documentElement.classList.toggle('i15on',on());};tick();setInterval(tick,1000);
  mo.observe(document.body,{childList:true,subtree:true,characterData:true});setTimeout(()=>{if(on()){walk(document.body);extra();}},600);setInterval(()=>{if(on()&&!play())extra();},1500);}
 if(document.body)init();else window.addEventListener('DOMContentLoaded',init,{once:true});
 return {src,img,svg:k=>S[k],MAP,walk};
})();window.UI_ICONS=UI_ICONS;
