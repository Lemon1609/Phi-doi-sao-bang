'use strict';
// V2.2.3 · BẢN ĐỒ SAO (Chọn ải) đồng bộ Sảnh cổ điển lob222 · dùng lại 4 tấm nút kim loại LOB222_IMG (không thêm ảnh nặng)
//  • Thanh đầu mảnh: ← SẢNH + 3 ô tài nguyên (thay hàng 5 nút #hdr9 khi đang ở bản đồ; bấm chuyển tiếp nút cũ)
//  • Băng chương vát góc 45° kim loại navy + mũi tên ‹ › · mục tiêu ải dạng viên mảnh giữa
//  • CÀN QUÉT NHANH tấm vuông btn_dock_sq · THƯỜNG | ANH HÙNG công tắc vát góc
//  • Đáy: XUẤT KÍCH NHANH tấm vàng + vệt sáng · THÁP BOSS / THỬ THÁCH tấm navy
//  • Ô ải: đã qua = lõi vàng + 3 sao · đang tới = vòng ngắm kép (vòng ngoài nét đứt xoay, tâm đứng yên) · khóa = kim loại chìm · boss = vòng đỏ + bảng BOSS · N
//  • Tâm ô ải KHÔNG nhảy: mọi nhịp chỉ trên lớp giả ::before/::after (tự căn bằng margin), ô ngoài giữ translate(-50%,-50%)
//  Mọi nút cũ giữ nguyên id / data-* / luồng mở màn. Tắt: window.MAP222=false
(()=>{
 const ON=()=>window.MAP222!==false;
 const $=s=>document.querySelector(s);
 const H=document.documentElement;
 const vis=e=>!!e&&!e.hidden&&getComputedStyle(e).display!=='none'&&e.getClientRects().length>0;
 const modeOf=()=>{try{return mode;}catch{return '';}};
 let bar=null,last=null,wk='';
 function el(t,c,h){const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
 function build(){if(bar||!document.body)return;
  bar=el('div','');bar.id='map22';bar.hidden=true;
  bar.innerHTML='<button type="button" class="m22back" data-m22="home"><i>←</i><b>SẢNH</b></button><div class="m22res">'+
   ['en','cr','dm'].map(k=>`<button type="button" class="m22pill ${k}" data-m22="${k}"><i></i><b>0</b><em>+</em></button>`).join('')+'</div>';
  bar.addEventListener('click',e=>{const b=e.target.closest('[data-m22]');if(!b)return;e.stopPropagation();const k=b.dataset.m22;
   const t=$('#hdr9 [data-h9b="'+k+'"]');if(t){t.click();return;}
   if(k==='home'){try{ChapterMap.close();}catch{}try{Nav74.tab('home');}catch{}}});
  document.body.appendChild(bar);}
 const imgOf=s=>{const i=$(s);return i&&i.getAttribute('src')||'';};
 let ik='';
 function sync(){
  for(const k of ['en','cr','dm']){const v=$('#hdr9 [data-v='+k+']'),b=bar.querySelector('.m22pill.'+k+' > b'),t=v?v.textContent:'';if(b&&b.textContent!==t)b.textContent=t;}
  const key=['en','cr','dm'].map(k=>imgOf('#hdr9 .ch9.'+k+' img')).join('|');
  if(key!==ik){ik=key;for(const k of ['en','cr','dm']){const s=imgOf('#hdr9 .ch9.'+k+' img'),i=bar.querySelector('.m22pill.'+k+' > i');if(i&&s)i.innerHTML='<img alt="" src="'+s+'">';}}
  // ô ải: bảng BOSS · N
  const w=$('#cmap #cm-world');if(!w)return;
  const ns=w.querySelectorAll(':scope>.cm-node');const k2=ns.length+':'+(ns[0]&&ns[0].dataset.stage)+':'+[...ns].map(n=>n.className.length).join(',');
  if(k2===wk)return;wk=k2;
  ns.forEach(n=>{const boss=n.classList.contains('major')||n.classList.contains('sk10');let p=n.querySelector(':scope>.m22boss');
   if(boss&&!p){p=el('span','m22boss');p.textContent='BOSS · '+(n.dataset.stage||'');n.appendChild(p);}else if(!boss&&p)p.remove();});
 }
 function tick(){if(!document.body)return;if(!bar)build();
  const on=ON()&&modeOf()==='menu'&&vis($('#cmap'));
  if(on!==last){last=on;bar.hidden=!on;H.classList.toggle('map22',on);wk='';}
  if(on)try{sync();}catch(e){}}
 // ---------- CSS ----------
 const P='html.map22 body'+':not(#_m22)'.repeat(80);
 const U=k=>{const I=window.LOB222_IMG||{};return I[k]?`url(${I[k]})`:'none';};
 const CH='polygon(14px 0,calc(100% - 14px) 0,100% 14px,100% calc(100% - 14px),calc(100% - 14px) 100%,14px 100%,0 calc(100% - 14px),0 14px)';
 const CHS='polygon(8px 0,calc(100% - 8px) 0,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0 calc(100% - 8px),0 8px)';
 const css=()=>`
html.map22{--h9:calc(48px + var(--sat42,0px))!important}
${P} #hdr9{display:none!important}
#map22{position:fixed;left:0;right:0;top:0;z-index:81;height:calc(48px + var(--sat42,0px));box-sizing:border-box;padding:calc(6px + var(--sat42,0px)) 8px 0;display:flex;align-items:center;gap:6px;
 background:linear-gradient(180deg,#0a1a3c,#061128 92%);box-shadow:0 1px 0 #5fb4ff55,0 2px 0 #02060f;font-family:inherit;color:#eaf6ff;-webkit-user-select:none;user-select:none}
#map22[hidden]{display:none}
#map22 button{all:unset;box-sizing:border-box;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:scale .08s}
#map22 button:active{scale:.95}
#map22 .m22back{flex:none;height:34px;padding:0 10px 0 7px;display:flex;align-items:center;gap:5px;clip-path:${CHS};
 background:linear-gradient(180deg,#f2f7ff 0,#9fb3cc 46%,#5d7290 54%,#c9d6e8 100%);position:relative}
#map22 .m22back::before{content:'';position:absolute;inset:2px;clip-path:${CHS};background:linear-gradient(180deg,#1c4a8c,#0b2552 60%,#0a1d40);z-index:0}
#map22 .m22back>*{position:relative;z-index:1}
#map22 .m22back i{font:900 16px/1 sans-serif;font-style:normal;color:#9fe6ff}
#map22 .m22back b{font:900 12.5px/1 inherit;letter-spacing:1.2px;color:#f1f8ff;text-shadow:0 1px 2px #000}
#map22 .m22res{flex:1;display:flex;justify-content:flex-end;gap:4px;min-width:0}
#map22 .m22pill{display:flex;align-items:center;height:26px;min-width:0;flex:1 1 0;max-width:118px;padding:0 0 0 2px;border-radius:13px;background:linear-gradient(180deg,#0d2342,#061428);box-shadow:inset 0 0 0 1px #6fb7ff66,0 2px 4px #0008}
#map22 .m22pill i{width:22px;height:22px;flex:none;display:grid;place-items:center}
#map22 .m22pill i img{width:22px;height:22px;object-fit:contain}
#map22 .m22pill b{flex:1;min-width:0;font-size:10.5px;letter-spacing:-.2px;font-weight:800;color:#fff;text-align:center;padding:0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 2px #000}
#map22 .m22pill em{flex:none;width:16px;height:16px;margin-right:3px;border-radius:4px;display:grid;place-items:center;font:900 12px/1 sans-serif;font-style:normal;color:#06213a;background:linear-gradient(#bdf3ff,#45c6ff)}
/* ---- băng chương ---- */
${P} #cmap .cm-head{position:relative!important;height:96px!important;min-height:0!important;padding:0!important;margin:0!important;background:none!important;border:0!important;box-shadow:none!important;overflow:visible!important}
${P} #cmap .cm-head::before{content:''!important;display:block!important;position:absolute!important;left:6px!important;right:6px!important;top:6px!important;height:62px!important;inset:auto;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;transform:none!important;opacity:1!important;
 clip-path:${CH}!important;background:linear-gradient(180deg,#eef5ff 0,#93a8c4 40%,#4b6080 52%,#b8c7dc 100%)!important;z-index:0!important;pointer-events:none!important}
${P} #cmap .cm-head::after{content:''!important;display:block!important;position:absolute!important;left:8px!important;right:8px!important;top:8px!important;height:58px!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;transform:none!important;opacity:1!important;
 clip-path:${CH}!important;background:linear-gradient(180deg,#5fb4ff22 0,transparent 30%),linear-gradient(180deg,#123a78,#0a2654 55%,#071a3c)!important;z-index:0!important;pointer-events:none!important}
${P} #cmap .cm-head>div:not(.cm-dots){position:absolute!important;left:52px!important;right:52px!important;top:9px!important;height:56px!important;margin:0!important;padding:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:1px!important;z-index:2!important;background:none!important;border:0!important;box-shadow:none!important}
${P} #cmap .cm-head #cm-small{display:block!important;font:800 9px/1.1 inherit!important;letter-spacing:1.6px!important;color:#9fd8ff!important;text-transform:uppercase;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;max-width:100%!important;margin:0!important;background:none!important}
${P} #cmap .cm-head #cm-name{display:block!important;margin:0!important;padding:0!important;font:900 17px/1.15 inherit!important;letter-spacing:1.4px!important;text-transform:uppercase!important;color:#fff4cc!important;text-shadow:0 0 6px #d98a16,0 2px 2px #000!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;max-width:100%!important;background:none!important;border:0!important;box-shadow:none!important}
${P} #cmap .cm-head #cm-name::before,${P} #cmap .cm-head #cm-name::after{display:none!important}
${P} #cmap .cm-head #cm-info{display:block!important;margin:0!important;padding:0!important;font:700 10px/1.2 inherit!important;color:#cfe6ff!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;max-width:100%!important;background:none!important;text-shadow:0 1px 2px #000!important}
${P} #cmap .cm-head .cm-nav{position:absolute!important;top:17px!important;width:36px!important;height:40px!important;min-height:0!important;margin:0!important;padding:0!important;z-index:3!important;display:grid!important;place-items:center!important;border:0!important;border-radius:0!important;box-shadow:none!important;transform:none!important;
 clip-path:${CHS}!important;background:linear-gradient(180deg,#f2f7ff 0,#9fb3cc 46%,#5d7290 54%,#c9d6e8 100%)!important;color:#0a2654!important;font:900 24px/1 sans-serif!important;text-shadow:0 1px 0 #fff8!important;filter:none!important;opacity:1}
${P} #cmap .cm-head .cm-nav::before{content:''!important;position:absolute!important;inset:2px!important;clip-path:${CHS}!important;background:linear-gradient(180deg,#1c4a8c,#0b2552 60%,#0a1d40)!important;z-index:-1!important;display:block!important;border:0!important;box-shadow:none!important;transform:none!important;margin:0!important;width:auto!important;height:auto!important}
${P} #cmap .cm-head .cm-nav{isolation:isolate;color:#bfeaff!important;text-shadow:0 0 6px #38bdf8!important}
${P} #cmap .cm-head .cm-nav::after{display:none!important}
${P} #cmap .cm-head .cm-nav[disabled],${P} #cmap .cm-head .cm-nav:disabled{opacity:.35!important}
${P} #cmap .cm-head #cm-prev{left:12px!important;right:auto!important}
${P} #cmap .cm-head #cm-next{right:12px!important;left:auto!important}
${P} #cmap .cm-head .cm-dots{position:absolute!important;left:0!important;right:0!important;top:74px!important;margin:0!important;height:6px!important;z-index:2!important;display:flex!important;justify-content:center!important;gap:5px!important}
${P} #cmap .cm-head .cm-dots i{width:6px!important;height:6px!important;border-radius:3px!important;background:#5d7894!important;box-shadow:none!important}
${P} #cmap .cm-head .cm-dots i.on{width:16px!important;background:linear-gradient(90deg,#ffe9a8,#ffb62e)!important}
${P} #cmap .goal94{top:84px!important;left:50%!important;transform:translateX(-50%)!important;max-width:calc(100% - 160px)!important;padding:2px 10px!important;border-radius:11px!important;border:1px solid #ffd36a99!important;background:linear-gradient(180deg,#1b1306f0,#0d0a03f0)!important;box-shadow:0 2px 4px #0008!important;font:800 10px/16px inherit!important;color:#ffe9a8!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;z-index:7!important}
${P} #cmap .cm-head #cm-lock113{position:absolute!important;left:-40px!important;right:-40px!important;top:73px!important;margin:0!important;padding:3px 10px!important;border-radius:9px!important;background:linear-gradient(180deg,#2a0a12f2,#14050af2)!important;box-shadow:inset 0 0 0 1px #ff8a9688,0 2px 4px #0008!important;font:800 9.5px/1.25 inherit!important;color:#ffd27a!important;text-align:center!important;z-index:4!important}
${P} #cmap .cm-head #cm-lock113[hidden]{display:none!important}
${P} #cmap:has(#cm-lock113:not([hidden])) .goal94{display:none!important}
${P} #cmap:has(#cm-lock113:not([hidden])) :is(.qs10b,.hm11){margin-top:22px!important}
${P} #cmap .mb10::before{content:'';position:absolute;left:-8px;right:-8px;top:-14px;bottom:-90px;background:linear-gradient(180deg,#02040d00,#02040de6 22%,#02040d);z-index:-1;pointer-events:none}
${P} #cmap .goal94 img{width:12px!important;height:12px!important;vertical-align:-2px}
/* ---- nút góc ---- */
${P} #cmap .qs10b{left:8px!important;top:110px!important;width:64px!important;height:62px!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:${U('btn_dock_sq')} center/100% 100% no-repeat!important;filter:drop-shadow(0 3px 4px #000a)!important}
${P} #cmap .qs10b i{color:#ffe08a!important;font-size:16px!important;text-shadow:0 0 6px #ffb62e!important}
${P} #cmap .qs10b b{color:#eaf6ff!important;font:900 8.5px/1.1 inherit!important;letter-spacing:.3px;text-shadow:0 1px 2px #000!important}
${P} #cmap .hm11{top:112px!important;right:8px!important;padding:2px!important;border:0!important;border-radius:0!important;clip-path:${CHS};background:linear-gradient(180deg,#eef5ff 0,#93a8c4 40%,#4b6080 52%,#b8c7dc 100%)!important;box-shadow:none!important;gap:0!important}
${P} #cmap .hm11 b{clip-path:${CHS};border-radius:0!important;padding:0 10px!important;height:24px!important;line-height:24px!important;font:900 10.5px/24px inherit!important;letter-spacing:.8px!important;color:#9fb8d4!important;background:linear-gradient(180deg,#0e2a55,#071a3c)!important;box-shadow:none!important;text-shadow:0 1px 2px #000!important}
${P} #cmap .hm11 b.on{color:#06213a!important;background:linear-gradient(180deg,#d6f6ff,#5fd0ff 55%,#2a9fe0)!important;text-shadow:0 1px 0 #fff8!important}
html.map22.hero11 body${':not(#_m22)'.repeat(81)} #cmap .hm11 b.on{color:#fff!important;background:linear-gradient(180deg,#ff9bb5,#d6234f 55%,#8a0f30)!important;text-shadow:0 1px 2px #000!important}
${P} #cmap .hi11{top:142px!important;right:8px!important}
/* ---- nút đáy ---- */
${P} #cmap .mb10{bottom:calc(10px + var(--sab42,0px))!important;gap:6px!important}
${P} #cmap .mb10 button{border:0!important;border-radius:0!important;box-shadow:none!important;background:transparent center/100% 100% no-repeat!important;filter:drop-shadow(0 3px 4px #000b)}
${P} #cmap .mb10 .go10{color:#fff7d6!important;-webkit-text-fill-color:#fff7d6!important;height:56px!important;background-image:${U('btn_cta_gold')}!important;overflow:hidden!important}
${P} #cmap .mb10 .go10 b{font:italic 900 19px/1 inherit!important;letter-spacing:1.6px!important;color:#fff7d6!important;-webkit-text-fill-color:#fff7d6!important;text-shadow:0 0 8px #ffb62e,0 0 2px #d98a16,0 2px 2px #000!important}
${P} #cmap .mb10 .go10 small{font:800 10px/1 inherit!important;letter-spacing:1px!important;color:#ffefb8!important;-webkit-text-fill-color:#ffefb8!important;text-shadow:0 1px 2px #000,0 0 4px #b86a06!important;margin-top:2px;opacity:1!important}
${P} #cmap .mb10 .go10::after{content:'';position:absolute;top:9px;bottom:9px;left:16px;width:30px;background:linear-gradient(100deg,#fff0,#fff6 50%,#fff0);transform:translateX(-70px) skewX(-18deg);animation:m22sh 4.2s ease-in-out infinite;pointer-events:none}
@keyframes m22sh{0%,72%{transform:translateX(-70px) skewX(-18deg)}100%{transform:translateX(380px) skewX(-18deg)}}
${P} #cmap .mb10 .mb10r button{height:48px!important;background-image:${U('btn_nav_navy')}!important}
${P} #cmap .mb10 .mb10r b{color:#eef8ff!important;-webkit-text-fill-color:#eef8ff!important;font:900 11px/1.1 inherit!important;letter-spacing:.3px!important;white-space:nowrap!important;text-shadow:0 0 5px #3aa8ff,0 2px 2px #000!important}
${P} #cmap .mb10 button:active{transform:none!important;scale:.96}
${P} #cmap #cm-scroll{padding-bottom:128px!important}
/* ---- đường đi ---- */
${P} #cmap svg.cs10s line.dg{stroke:#ffcf5a;stroke-opacity:.5;stroke-width:6.5}
${P} #cmap svg.cs10s line.d{stroke:#bff4ff;stroke-width:2.2;stroke-dasharray:none}
${P} #cmap svg.cs10s line.u{stroke:#4aa8ff;stroke-opacity:.6;stroke-width:1.6;stroke-dasharray:4 6}
/* ---- ô ải: tâm cố định ---- */
${P} #cmap .cm-node{animation:none!important;background:radial-gradient(circle at 50% 38%,#3a4d66 0,#1a2638 55%,#0b121e 100%)!important;background-image:radial-gradient(circle at 50% 38%,#3a4d66 0,#1a2638 55%,#0b121e 100%)!important;border:2px solid #5a6b82!important;box-shadow:inset 0 3px 6px #000c,inset 0 -1px 0 #8ea2bd55,0 2px 4px #000a!important;filter:none!important;opacity:1!important}
${P} #cmap .cm-node:not(.mini):not(.major):not(.sk10){width:46px!important;height:46px!important;border-radius:50%!important}
${P} #cmap .cm-node b{color:#8ea2bd!important;font:900 15px/1 inherit!important;text-shadow:0 1px 1px #000!important}
${P} #cmap .cm-node::before{content:''!important;position:absolute!important;left:50%!important;top:50%!important;width:56px!important;height:56px!important;margin:-28px 0 0 -28px!important;border-radius:50%!important;border:1.5px solid #5a6b8266!important;box-shadow:none!important;background:none!important;transform:none!important;animation:none!important;pointer-events:none!important;display:block!important}
${P} #cmap .cm-node::after{display:none!important}
${P} #cmap .cm-node.lock b{opacity:.75}
${P} #cmap .cm-node.done{border-color:#ffe08a!important;background:radial-gradient(circle at 50% 35%,#fff3c4 0,#ffcf5a 30%,#c47a12 70%,#6b3d02 100%)!important;background-image:radial-gradient(circle at 50% 35%,#fff3c4 0,#ffcf5a 30%,#c47a12 70%,#6b3d02 100%)!important;box-shadow:0 0 10px #ffb62e88,inset 0 -2px 3px #6b3d02,0 2px 4px #000a!important}
${P} #cmap .cm-node.done b{color:#3a1d00!important;text-shadow:0 1px 0 #fff6!important}
${P} #cmap .cm-node.done::before{border-color:#7fe8ff99!important}
${P} #cmap .cm-st{transform:translate(-50%,-50%)!important;padding:0 5px!important;border-radius:7px!important;background:#0a1a33e6!important;box-shadow:inset 0 0 0 1px #ffd36a88!important;color:#ffd36a!important;font:900 10px/13px sans-serif!important;letter-spacing:1px!important;white-space:nowrap}
${P} #cmap .cm-st s{color:#5d7894!important;text-decoration:none!important}
${P} #cmap .cm-node.cur{border-color:#e8fbff!important;background:radial-gradient(circle at 50% 40%,#ffffff 0,#bff4ff 22%,#38bdf8 55%,#0b4f8a 100%)!important;background-image:radial-gradient(circle at 50% 40%,#ffffff 0,#bff4ff 22%,#38bdf8 55%,#0b4f8a 100%)!important;box-shadow:0 0 14px #38bdf8,0 2px 4px #000a!important}
${P} #cmap .cm-node.cur b{color:#062645!important;text-shadow:0 1px 0 #fff8!important}
${P} #cmap .cm-node.cur::before{width:60px!important;height:60px!important;margin:-30px 0 0 -30px!important;border:2px solid #bff4ff!important;box-shadow:0 0 8px #38bdf8aa!important}
${P} #cmap .cm-node.cur::after{content:''!important;display:block!important;position:absolute!important;left:50%!important;top:50%!important;width:78px!important;height:78px!important;margin:-39px 0 0 -39px!important;border-radius:50%!important;border:2px dashed #7fe8ff!important;background:none!important;box-shadow:none!important;text-shadow:none!important;font-size:0!important;transform:none;animation:m22rot 9s linear infinite!important;pointer-events:none!important;opacity:.9!important;z-index:0!important}
@keyframes m22rot{to{rotate:360deg}}
${P} #cmap .cm-node.mini{border-radius:4px!important;border-color:#d68a3a!important}
${P} #cmap .cm-node.mini::before{width:62px!important;height:62px!important;margin:-31px 0 0 -31px!important;border-color:#fb923c99!important;border-radius:6px!important}
${P} #cmap .cm-node.mini.done{border-color:#ffe08a!important}
${P} #cmap .cm-node:is(.major,.sk10){border-radius:50%!important;border:3px solid #ff3b4f!important;background:radial-gradient(circle at 50% 38%,#5a0f1c 0,#2a0710 60%,#12030a 100%)!important;background-image:radial-gradient(circle at 50% 38%,#5a0f1c 0,#2a0710 60%,#12030a 100%)!important;box-shadow:0 0 14px #ff2a3f99,inset 0 0 10px #000,0 2px 4px #000a!important}
${P} #cmap .cm-node:is(.major,.sk10)::before{width:104px!important;height:104px!important;margin:-52px 0 0 -52px!important;border:2px solid #ff4d5ecc!important;box-shadow:0 0 10px #ff2a3f88,inset 0 0 8px #ff2a3f55!important}
${P} #cmap .cm-node:is(.major,.sk10).done{border-color:#ffe08a!important}
${P} #cmap .cm-node:is(.major,.sk10).cur::after{width:118px!important;height:118px!important;margin:-59px 0 0 -59px!important;border-color:#ff8a96!important}
${P} #cmap .cm-node .m22boss{position:absolute!important;left:50%!important;bottom:-24px!important;transform:translateX(-50%)!important;z-index:3!important;padding:0 8px!important;height:17px!important;line-height:17px!important;font:900 10px/17px sans-serif!important;letter-spacing:1px!important;color:#fff!important;white-space:nowrap!important;background:linear-gradient(180deg,#ff4d5e,#a3122a)!important;clip-path:polygon(6px 0,calc(100% - 6px) 0,100% 50%,calc(100% - 6px) 100%,6px 100%,0 50%);text-shadow:0 1px 1px #000!important;pointer-events:none!important}
${P} #cmap .cm-node.mini .m22boss{display:none!important}
${P} #cmap .cm-node:is(.major,.sk10):not(.mini)>b{display:none!important}
/* ---- chiến cơ chỉ đường: thẳng tâm ô, chỉ nhún dọc ±3 px ---- */
${P} #cmap .cm-ship{animation:m22bob 2.2s ease-in-out infinite!important;margin:0!important}
@keyframes m22bob{0%,100%{translate:0 -2px}50%{translate:0 -8px}}
@media (prefers-reduced-motion:reduce){${P} #cmap .cm-node.cur::after,${P} #cmap .cm-ship,${P} #cmap .mb10 .go10::after{animation:none!important}}
`;
 function addCss(){if($('#map222-css'))return;const s=el('style');s.id='map222-css';s.textContent=css();document.head.appendChild(s);}
 function init(){addCss();build();tick();setInterval(()=>{try{tick();}catch(e){}},250);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 window.MAP222S={tick};
})();
