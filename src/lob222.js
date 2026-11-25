'use strict';
// V2.2.2 · SẢNH KIỂU CỔ ĐIỂN (sân khấu mở giữa) + 4 tấm nút kim loại 3D (90047.png → src/lob222img, global LOB222_IMG)
//  • Đầu trang 1 hàng: avatar + khung (chạm = HỒ SƠ, qua #lb68-pp) · tên + dòng phụ | 3 ô tài nguyên + ô CÀI ĐẶT
//  • Ray trái: NHIỆM VỤ · PHÚC LỢI · BỘ SƯU TẬP · BÁCH KHOA (ô vuông, nhãn 1 dòng, chấm đỏ chép từ #hdr9)
//  • Ray phải: CỬA HÀNG (viền vàng) · BỘ 1/2/3 · LƯU (bỏ thẻ "? PHI CÔNG")
//  • Giữa: sân khấu tàu mở, mũi tên ‹ › sát ray, bảng tên hologram trong suốt
//  • Đáy 2 tầng: KHO ĐỒ | PHI CÔNG | VKTT  ·  VÔ TẬN | CHIẾN ĐẤU · ẢI X
//  Mọi nút MỚI chỉ chuyển tiếp sang nút/ hàm cũ (giữ nguyên id, data-*, luồng mở màn) → test cũ vẫn bấm được nút cũ.
//  Chỉ bật khi đang ở Sảnh (mode menu, #hgr41 hiện, không có Kho/Bản đồ). Tắt: window.LOB222=false
(()=>{
 const ON=()=>window.LOB222!==false;
 const $=s=>document.querySelector(s);
 const BOOK22='data:image/svg+xml,'+'%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2064%2064%27%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27m%27%20x1%3D%270%27%20y1%3D%270%27%20x2%3D%270%27%20y2%3D%271%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27%23f4f8ff%27/%3E%3Cstop%20offset%3D%27.45%27%20stop-color%3D%27%239fb3cc%27/%3E%3Cstop%20offset%3D%27.55%27%20stop-color%3D%27%235d7290%27/%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%23c9d6e8%27/%3E%3C/linearGradient%3E%3ClinearGradient%20id%3D%27p%27%20x1%3D%270%27%20y1%3D%270%27%20x2%3D%271%27%20y2%3D%271%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27%230b2a55%27/%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%23123f7a%27/%3E%3C/linearGradient%3E%3Cfilter%20id%3D%27g%27%3E%3CfeGaussianBlur%20stdDeviation%3D%271.6%27/%3E%3C/filter%3E%3C/defs%3E%3Cpath%20d%3D%27M8%2016%20Q20%2011%2031%2017%20L31%2052%20Q20%2046%208%2051Z%20M56%2016%20Q44%2011%2033%2017%20L33%2052%20Q44%2046%2056%2051Z%27%20fill%3D%27url%28%23p%29%27%20stroke%3D%27url%28%23m%29%27%20stroke-width%3D%273%27%20stroke-linejoin%3D%27round%27/%3E%3Cpath%20d%3D%27M13%2023%20Q20%2020%2027%2024%20M13%2030%20Q20%2027%2027%2031%20M13%2037%20Q20%2034%2027%2038%20M37%2024%20Q44%2020%2051%2023%20M37%2031%20Q44%2027%2051%2030%20M37%2038%20Q44%2034%2051%2037%27%20stroke%3D%27%235fe0ff%27%20stroke-width%3D%272%27%20fill%3D%27none%27%20stroke-linecap%3D%27round%27%20filter%3D%27url%28%23g%29%27/%3E%3Cpath%20d%3D%27M13%2023%20Q20%2020%2027%2024%20M13%2030%20Q20%2027%2027%2031%20M13%2037%20Q20%2034%2027%2038%20M37%2024%20Q44%2020%2051%2023%20M37%2031%20Q44%2027%2051%2030%20M37%2038%20Q44%2034%2051%2037%27%20stroke%3D%27%23d9f7ff%27%20stroke-width%3D%271.1%27%20fill%3D%27none%27%20stroke-linecap%3D%27round%27/%3E%3Cpath%20d%3D%27M32%2017%20L32%2053%27%20stroke%3D%27%23ffd36a%27%20stroke-width%3D%272.4%27/%3E%3Ccircle%20cx%3D%2732%27%20cy%3D%2711%27%20r%3D%274%27%20fill%3D%27%23ffd36a%27%20stroke%3D%27%23fff4cc%27%20stroke-width%3D%271.2%27/%3E%3C/svg%3E';
 const IMG=()=>window.LOB222_IMG||{};
 const H=document.documentElement;
 const modeOf=()=>{try{return mode;}catch{return 'menu';}};
 const shown=e=>!!e&&!e.hidden&&e.style.display!=='none'&&getComputedStyle(e).display!=='none';
 function inLobby(){if(!ON()||modeOf()!=='menu')return false;const r=$('#hgr41');if(!r||!shown(r))return false;if(shown($('#hub40'))||shown($('#cmap')))return false;try{if(window.Nav74&&Nav74.state&&Nav74.state().cur&&Nav74.state().cur!=='home')return false;}catch{}return true;}
 const toastS=s=>{try{toast(s);}catch{}};
 const tap=sel=>{const b=$(sel);if(b){b.click();return true;}return false;};
 const imgOf=sel=>{const i=$(sel);return i&&i.src?i.src:'';};
 // ---------- dựng khung ----------
 let root=null;
 const RAIL_L=[['mis','NHIỆM VỤ','#hdr9 [data-h9b=mis]'],['pl','PHÚC LỢI','#hdr9 [data-h9b=pl]'],['bst','BỘ SƯU TẬP','#hdr9 [data-h9b=bst]'],['codex','BÁCH KHOA','#lb68 [data-ck9=codex]'],['pat','TUẦN TRA','#hgr41 .pt10']];/* V2.2.2: Tuần tra mini (q10309 .pt10) đè bảng tên → thành ô thứ 5 ray trái */
 function el(tag,cls,html){const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
 function btn(cls,key,html){const e=el('div',cls,html);e.setAttribute('role','button');e.tabIndex=0;e.dataset.l22=key;return e;}
 function build(){
  root=el('div','');root.id='lob22';root.hidden=true;
  const top=el('div','l22top');
  const av=btn('l22av','profile','<span class="l22pp"></span><span class="l22nm"><b></b><small></small></span>');
  const res=el('div','l22res');for(const k of ['en','cr','dm'])res.appendChild(btn('l22pill '+k,'res:'+k,'<i></i><b>0</b><em>+</em>'));
  const gear=btn('l22dock l22gear','gear','<i></i>');
  top.append(av,res,gear);
  const tip=btn('l22tip','tip','');
  const L=el('div','l22rail l22L');for(const [k,n] of RAIL_L)L.appendChild(btn('l22dock','go:'+k,`<i></i><small>${n}</small><em class="l22dot"></em>`));
  const R=el('div','l22rail l22R');R.appendChild(btn('l22dock l22shop','go:shop','<i></i><small>CỬA HÀNG</small><em class="l22dot"></em>'));
  const ld=el('div','l22ld');for(const k of ['0','1','2','s'])ld.appendChild(btn('l22set','ld:'+k,k==='s'?'<b>LƯU</b>':`<b>BỘ ${+k+1}</b><small>+ lưu</small>`));R.appendChild(ld);
  const plate=el('div','l22plate','');
  const deck=el('div','l22deck');
  const row1=el('div','l22row1');for(const [k,n] of [['kho','KHO ĐỒ'],['pilot','PHI CÔNG'],['ult','VKTT']])row1.appendChild(btn('l22nav','go:'+k,`<i></i><b>${n}</b>`));
  const row2=el('div','l22row2');row2.appendChild(btn('l22cta crim','go:endless','<b>VÔ TẬN</b><small></small>'));row2.appendChild(btn('l22cta g22c','go:camp','<b>CHIẾN ĐẤU</b><small>ẢI 1</small><span class="l22sh"></span>'));
  deck.append(plate,row1,row2);
  root.append(top,tip,L,R,deck);document.body.appendChild(root);
  root.addEventListener('click',onTap);
  root.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onTap(e);}});
 }
 function onTap(e){const b=e.target.closest('[data-l22]');if(!b)return;e.stopPropagation();const k=b.dataset.l22;
  try{
   if(k==='profile'){const pp=$('#lb68-pp');if(pp)pp.click();return;}
   if(k==='gear'){tap('#lb68 [data-ck9=gear]')||(()=>{try{Nav74.page('gear');}catch{}})();return;}
   if(k==='tip'){tap('#hgr41 .nx66');return;}
   if(k.startsWith('res:')){tap('#hdr9 [data-h9b='+k.slice(4)+']');return;}
   if(k.startsWith('ld:')){tap('#lb68 .ld7 [data-ld7="'+k.slice(3)+'"]');return;}
   const g=k.slice(3);
   if(g==='mis'||g==='pl'||g==='bst'||g==='shop'){tap('#hdr9 [data-h9b='+g+']');return;}
   if(g==='pat'){tap('#hgr41 .pt10')||(()=>{try{Nav74.F.patrol.go();}catch{}})();return;}
   if(g==='codex'){tap('#lb68 [data-ck9=codex]')||(()=>{try{L7309.open();}catch{}})();return;}
   if(g==='kho'){tap('#lb68 [data-ck9=kho]')||(()=>{try{Nav74.tab('equip');}catch{}})();return;}
   if(g==='pilot'){tap('#lb68 [data-ck9=pilot]');return;}
   if(g==='ult'){const f=window.Nav74&&Nav74.F&&Nav74.F.ult;if(f&&f.lk&&!f.lk()){toastS('VŨ KHÍ TỐI THƯỢNG MỞ Ở ẢI '+(f.lv||90));return;}if(f&&f.go)f.go();else{try{Ult72.open();}catch{}}return;}
   if(g==='endless'){tap('#lb68 .cta.e');return;}
   if(g==='camp'){tap('#lb68 .cta.c');return;}
  }catch(err){}
 }
 // ---------- đồng bộ chữ / icon / chấm đỏ từ nút cũ (chỉ ghi khi đổi) ----------
 const setH=(e,h)=>{if(e&&e.__h!==h){e.__h=h;e.innerHTML=h;}};
 const setT=(e,t)=>{t=String(t==null?'':t);if(e&&e.textContent!==t)e.textContent=t;};
 const setBg=(e,u)=>{if(e&&u&&e.__u!==u){e.__u=u;e.style.backgroundImage='url("'+u+'")';}};
 const setCls=(e,c,v)=>{if(e&&e.classList.contains(c)!==!!v)e.classList.toggle(c,!!v);};
 function icons(){if(!root||root.__ic)return;const I=IMG();let ok=true;
  const put=(sel,u)=>{const e=root.querySelector(sel+' > i');if(!e||!u){ok=false;return;}if(!e.firstChild){const im=new Image();im.alt='';im.src=u;e.appendChild(im);}};
  put('[data-l22="go:mis"]',imgOf('#hdr9 [data-h9b=mis] img'));put('[data-l22="go:pl"]',imgOf('#hdr9 [data-h9b=pl] img'));put('[data-l22="go:bst"]',imgOf('#hdr9 [data-h9b=bst] img'));
  put('[data-l22="go:codex"]',BOOK22);/* V2.2.2: BÁCH KHOA = sách mở ánh kim (khác cúp Bộ sưu tập) */put('[data-l22="go:pat"]',(typeof ICON74!=='undefined'&&ICON74.ic_tuan_tra)||imgOf('#hgr41 .pt10 img'));put('[data-l22="go:shop"]',imgOf('#hdr9 [data-h9b=shop] img'));put('[data-l22=gear]',imgOf('#lb68 [data-ck9=gear] img'));
  put('[data-l22="go:kho"]',imgOf('#lb68 [data-ck9=kho] img'));put('[data-l22="go:pilot"]',imgOf('#lb68 [data-ck9=pilot] img'));
  let vk='';try{const V=window.VKTT307_IMG||{};vk=V.void_greatsword_d1||V.void_greatsword||Object.values(V)[0]||'';}catch{}put('[data-l22="go:ult"]',vk);
  for(const k of ['en','cr','dm'])put('.l22pill.'+k,imgOf('#hdr9 .ch9.'+k+' img'));
  // tấm nút
  for(const e of root.querySelectorAll('.l22dock'))setBg(e,I.btn_dock_sq);for(const e of root.querySelectorAll('.l22nav'))setBg(e,I.btn_nav_navy);
  setBg(root.querySelector('.l22cta.g22c'),I.btn_cta_gold);setBg(root.querySelector('.l22cta.crim'),I.btn_cta_crimson);
  for(const e of root.querySelectorAll('.l22set'))setBg(e,I.btn_dock_sq);
  if(ok)root.__ic=1;}
 function sync(){
  {const pt=document.querySelector('#hgr41 .pt10');if(pt&&pt.style.display!=='none')pt.style.display='none';const em=pt&&pt.querySelector('em');setCls(root.querySelector('[data-l22="go:pat"]'),'dot',!!(em&&!em.hidden));}
  // tài nguyên
  for(const k of ['en','cr','dm']){const v=$('#hdr9 [data-v='+k+']');setT(root.querySelector('.l22pill.'+k+' > b'),v?v.textContent:'');}
  // avatar + tên
  const pp=$('#lb68-pp'),av=root.querySelector('.l22pp');if(pp&&av){setH(av,pp.innerHTML);const pc=pp.style.getPropertyValue('--pc');if(av.style.getPropertyValue('--pc')!==pc)av.style.setProperty('--pc',pc);const fr=pp.dataset.fr22||'';if(av.dataset.fr22!==fr)av.dataset.fr22=fr;const c8=[...pp.classList].filter(c=>/^fr8/.test(c)).join(' ');if(av.__c8!==c8){av.__c8=c8;av.className='l22pp '+c8;}}
  setT(root.querySelector('.l22nm > b'),($('#lb68-pnm')||{}).textContent||'PHI CÔNG');
  const tg=$('#hgr41 .tt8')||$('#lb68-ptg');setT(root.querySelector('.l22nm > small'),tg?tg.textContent:'');
  // mẹo mở khóa
  const nx=$('#hgr41 .nx66'),tip=root.querySelector('.l22tip');const tt=nx?(nx.textContent||'').trim():'';setT(tip,tt);setCls(tip,'off',!tt);
  // chấm đỏ: <em> của nút #hdr9 đang hiện
  for(const k of ['mis','pl','bst','shop']){const em=$('#hdr9 [data-h9b='+k+'] em');const on=!!em&&getComputedStyle(em).display!=='none'&&(em.offsetWidth>0||em.textContent.trim()!=='');setCls(root.querySelector('[data-l22="go:'+k+'"]'),'dot',on);}
  // bộ trang bị
  for(const k of ['0','1','2','s']){const o=$('#lb68 .ld7 [data-ld7="'+k+'"]'),n=root.querySelector('[data-l22="ld:'+k+'"]');if(!o||!n)continue;setCls(n,'on',o.classList.contains('on'));setCls(n,'em',o.classList.contains('em'));if(k!=='s'){const sm=o.querySelector('small');setT(n.querySelector('small'),sm?sm.textContent:'');}}
  // bảng tên
  const nm=$('#hgr41 .nm9');setH(root.querySelector('.l22plate'),nm?nm.innerHTML:'');
  // CTA
  const c=$('#lb68 .cta.c'),cs=c&&c.querySelector('small,em,i');let st='';if(c){const m=(c.textContent||'').match(/ẢI\s*\d+/i);st=m?m[0].toUpperCase():'';}setT(root.querySelector('.l22cta.g22c small'),st||'ẢI 1');
  const e=$('#lb68 .cta.e');let es='';if(e){const m=(e.textContent||'').match(/KỶ LỤC[^Ả]*?\d+/i);es=m?m[0]:'';}setT(root.querySelector('.l22cta.crim small'),es);
  const f=window.Nav74&&Nav74.F&&Nav74.F.ult;setCls(root.querySelector('[data-l22="go:ult"]'),'lk',!!(f&&f.lk&&!f.lk()));
 }
 let last=null;
 function tick(){if(!document.body)return;if(!root)build();const on=inLobby();if(on!==last){last=on;root.hidden=!on;setCls(H,'lob222',on);if(!on){const pt=document.querySelector('#hgr41 .pt10');if(pt)pt.style.display='';}}
  if(!on)return;try{icons();sync();}catch(e){}}
 // ---------- CSS ----------
 const P='html.lob222 body'+':not(#_l22)'.repeat(70);
 const css=`
${P} #hdr9,${P} #hgr41 .nx66,${P} #hgr41 .nm9,${P} #lb68 .lb68-card,${P} #lb68 .ld7,${P} #lb68 .ck9,${P} #lb68 .lb68-cta,${P} #lb68 .cp12,${P} #hgr41 .h1-count{display:none!important}
${P} #lb68{pointer-events:none!important;background:none!important;border:0!important;box-shadow:none!important}
${P} #hgr41 .h1-stage{top:0!important;left:0!important;right:0!important;bottom:0!important;width:auto!important;height:auto!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important}
${P} #hgr41 .h1-chev{position:fixed!important;top:calc(var(--sat42,0px) + 46%)!important;width:28px!important;height:48px!important;z-index:79!important;opacity:.85}
${P} #hgr41 .h1-chev.l{left:64px!important;right:auto!important}
${P} #hgr41 .h1-chev.r{right:64px!important;left:auto!important}
#lob22{position:fixed;inset:0;z-index:79;pointer-events:none;font-family:inherit;color:#eaf6ff;-webkit-user-select:none;user-select:none}
#lob22[hidden]{display:none}
#lob22 [role=button]{pointer-events:auto;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:scale .08s}
#lob22 [role=button]:active{scale:.95}
#lob22 .l22top{position:absolute;left:6px;right:6px;top:calc(var(--sat42,0px) + 6px);height:40px;display:flex;align-items:center;gap:6px}
#lob22 .l22av{display:flex;align-items:center;gap:6px;min-width:0;flex:1 1 auto}
#lob22 .l22pp{position:relative;flex:none;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;overflow:visible;background:radial-gradient(circle at 50% 40%,#21436e,#0a1830 75%);box-shadow:0 0 0 2px var(--pc,#5d7894),0 2px 6px #000a;font:800 15px/1 inherit;color:#bfe3ff}
#lob22 .l22pp .fi22{position:absolute;inset:-26%;background:center/contain no-repeat;pointer-events:none}
#lob22 .l22pp img{width:100%;height:100%;border-radius:50%;object-fit:cover}
#lob22 .l22nm{display:flex;flex-direction:column;min-width:0;line-height:1.1}
#lob22 .l22nm b{font-size:11.5px;font-weight:900;letter-spacing:.3px;color:#eaf6ff;text-shadow:0 1px 2px #000;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#lob22 .l22nm small{font-size:9px;color:#9fd8ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 2px #000}
#lob22 .l22res{display:flex;gap:4px;flex:none}
#lob22 .l22pill{display:flex;align-items:center;height:24px;padding:0 0 0 2px;border-radius:12px;background:linear-gradient(180deg,#0d2342e6,#061428e6);box-shadow:inset 0 0 0 1px #6fb7ff55,0 2px 4px #0008;min-width:62px}
#lob22 .l22pill i{width:20px;height:20px;flex:none;display:grid;place-items:center}
#lob22 .l22pill i img{width:20px;height:20px;object-fit:contain}
#lob22 .l22pill b{flex:1;font-size:10.5px;font-weight:800;color:#fff;text-align:center;padding:0 2px;white-space:nowrap;text-shadow:0 1px 2px #000}
#lob22 .l22pill em{flex:none;width:16px;height:16px;margin-right:3px;border-radius:4px;display:grid;place-items:center;font:900 12px/1 inherit;font-style:normal;color:#06213a;background:linear-gradient(#bdf3ff,#45c6ff)}
#lob22 .l22dock{position:relative;width:50px;height:50px;background:center/100% 100% no-repeat;display:grid;place-items:center}
#lob22 .l22dock > i{width:30px;height:30px;display:grid;place-items:center}
#lob22 .l22dock > i img{width:30px;height:30px;object-fit:contain;filter:drop-shadow(0 1px 2px #000)}
#lob22 .l22dock > small{position:absolute;top:calc(100% + 1px);left:50%;translate:-50% 0;font-size:8.8px;font-weight:900;letter-spacing:.2px;color:#eaf6ff;white-space:nowrap;text-shadow:0 0 3px #000,0 1px 2px #000}
#lob22 .l22dock .l22dot{position:absolute;top:2px;right:2px;width:9px;height:9px;border-radius:50%;background:#ff3b3b;box-shadow:0 0 0 1.5px #2a0606,0 0 5px #ff3b3b;display:none}
#lob22 .l22dock.dot .l22dot{display:block}
#lob22 .l22gear{width:36px;height:36px;flex:none}
#lob22 .l22gear > i,#lob22 .l22gear > i img{width:22px;height:22px}
#lob22 .l22tip{position:absolute;top:calc(var(--sat42,0px) + 52px);left:50%;translate:-50% 0;max-width:calc(100% - 132px);padding:3px 10px;border-radius:11px;font-size:10px;font-weight:700;color:#ffe9a8;background:#04101fb3;box-shadow:inset 0 0 0 1px #ffd36a55;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#lob22 .l22tip.off{display:none}
#lob22 .l22rail{position:absolute;top:calc(var(--sat42,0px) + 84px);display:flex;flex-direction:column;align-items:center;gap:20px}
#lob22 .l22L{left:6px}
#lob22 .l22R{right:6px}
#lob22 .l22shop{filter:drop-shadow(0 0 4px #ffcc4d99)}
#lob22 .l22shop::after{content:'';position:absolute;inset:3px;border-radius:6px;box-shadow:inset 0 0 0 1.5px #ffd36acc;pointer-events:none}
#lob22 .l22shop > small{color:#ffe9a8}
#lob22 .l22ld{display:flex;flex-direction:column;gap:4px;margin-top:-4px}
#lob22 .l22set{width:50px;height:34px;background:center/100% 100% no-repeat;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}
#lob22 .l22set b{font-size:9.5px;font-weight:900;color:#eaf6ff;text-shadow:0 1px 2px #000}
#lob22 .l22set small{font-size:7.5px;color:#9fd8ff;margin-top:1px;max-width:44px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
#lob22 .l22set.on{filter:drop-shadow(0 0 5px #45e1ff)}
#lob22 .l22set.on b{color:#7ff0ff}
#lob22 .l22set[data-l22="ld:s"] b{color:#8dffcf}
#lob22 .l22deck{position:absolute;left:10px;right:10px;bottom:calc(var(--sab42,0px) + 14px);display:flex;flex-direction:column;gap:8px}
#lob22 .l22plate{align-self:center;text-align:center;line-height:1.15;pointer-events:none;margin-bottom:2px}
#lob22 .l22plate b{display:block;font-size:13px;font-weight:900;letter-spacing:.4px;color:#eaf6ff;text-shadow:0 0 8px #3fb6ff,0 1px 2px #000}
#lob22 .l22plate small{display:block;font-size:10px;font-weight:700;color:#bfe3ff;text-shadow:0 1px 2px #000}
#lob22 .l22plate small i{font-style:normal;color:#ffd76a}
#lob22 .l22row1{display:flex;gap:8px;justify-content:center}
#lob22 .l22nav{flex:1 1 0;max-width:124px;height:38px;background:center/100% 100% no-repeat;display:flex;align-items:center;justify-content:center;gap:5px}
#lob22 .l22nav i{width:20px;height:20px;display:grid;place-items:center}
#lob22 .l22nav i img{width:20px;height:20px;object-fit:contain;filter:drop-shadow(0 1px 1px #000)}
#lob22 .l22nav b{font-size:12px;font-weight:900;letter-spacing:.4px;color:#eaf6ff;text-shadow:0 0 6px #45c6ff88,0 1px 2px #000;white-space:nowrap}
#lob22 .l22nav.lk{filter:saturate(.35) brightness(.8)}
#lob22 .l22row2{display:flex;gap:8px}
#lob22 .l22cta{position:relative;flex:1 1 0;height:52px;background:center/100% 100% no-repeat;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.05;overflow:hidden}
#lob22 .l22cta b{font-size:16px;font-weight:900;letter-spacing:.8px;white-space:nowrap}
#lob22 .l22cta small{font-size:9.5px;font-weight:800;letter-spacing:.6px;margin-top:2px;white-space:nowrap}
#lob22 .l22cta.g22c b,#lob22 .l22cta.g22c small{color:#fff4cc;text-shadow:0 0 6px #d98a16,0 0 2px #d98a16,0 2px 2px #000}
#lob22 .l22cta.crim b,#lob22 .l22cta.crim small{color:#fff5f5;text-shadow:0 0 5px #b3122a,0 2px 2px #000}
#lob22 .l22cta.crim small:empty{display:none}
#lob22 .l22sh{position:absolute;top:8px;bottom:8px;left:12px;width:26px;background:linear-gradient(100deg,#fff0,#fff5 50%,#fff0);transform:translateX(-60px) skewX(-18deg);animation:l22sh 4s ease-in-out infinite;pointer-events:none}
@keyframes l22sh{0%,70%{transform:translateX(-60px) skewX(-18deg)}100%{transform:translateX(200px) skewX(-18deg)}}
@media (prefers-reduced-motion:reduce){#lob22 .l22sh{animation:none;display:none}}
`;
 function addCss(){if($('#lob222-css'))return;const s=el('style');s.id='lob222-css';s.textContent=css;document.head.appendChild(s);}
 function init(){addCss();build();tick();setInterval(()=>{try{tick();}catch(e){}},300);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 window.LOB222={tick,inLobby,sync:()=>{try{sync();}catch(e){}}};
})();
