/* V2.2 · U22 — đồng bộ giao diện toàn game theo Sảnh (chủ dự án 24/11 09:24 + 10:03 + 10:10). Chỉ hình, không đổi chức năng.
   (1) 1 hệ nút vát 45° MATTE-METALLIC: vàng #D98A16→#F5C249 chữ navy · thép-cyan #0D2852→#184888 viền #38BDF8 1,5 px + vạch sáng đáy ·
       ngọc · đỏ thẫm · tab navy (đang chọn = thép-cyan). Bộ phân loại tự gắn data-u22=<tông> cho mọi nút chữ ở màn menu
       (bỏ qua Sảnh, HUD trận, ô vật phẩm / thẻ / avatar / nút ✕ / nút tròn biểu tượng).
   (2) Nền: khung hộp #040D21 viền kép; forge_bg (bệ tròn dưới hero) cho Cường hóa / VKTT / Chiến Thần / Phi công; starmap_bg cho Chọn ải.
   (3) Kho: bỏ nút VKTT trùng tab; hàng thẻ danh sách có dải màu bậc trái; ô 7 ngày; khung trưng bày phi công; Bách khoa tên 2 dòng.
   (4) Vùng an toàn: dải nút đáy nâng ≥ 20 px, đầu Cường hóa xuống dưới --sat42; 6 khung avatar giới hạn tranh vuông.
   Tắt: window.U22=false (hoặc window.V22=false). Tắt riêng bộ phân loại: window.U22B=false; nền: window.U22BG=false. */
(()=>{
 const ON=()=>window.V22!==false&&window.U22!==false;
 const NOT=':not(#_u22)'.repeat(100),P='html.u22 body'+NOT+' ',PB='html.u22.u22bg body'+NOT+' ';
 const CH4=k=>`polygon(${k}px 0,calc(100% - ${k}px) 0,100% ${k}px,100% calc(100% - ${k}px),calc(100% - ${k}px) 100%,${k}px 100%,0 calc(100% - ${k}px),0 ${k}px)`;
 const IMG=k=>{try{return (window.UI22_IMG||{})[k]||'';}catch{return '';}};
 const MID='linear-gradient(180deg,#040d21 0,#0a1b38 100%)';
 const CARD=`background:radial-gradient(120% 70% at 50% 0,rgba(56,189,248,.10),transparent 60%),linear-gradient(180deg,#10284f 0,#0a1b38 50%,#06122b 100%)!important;box-shadow:inset 0 1px 0 rgba(148,197,255,.45),inset 0 0 0 1px #1d4f8f,inset 0 -2px 0 rgba(0,0,0,.35)!important;clip-path:${CH4(7)}!important;border:0!important;border-radius:0!important`;
 const SHELL=`background:radial-gradient(120% 40% at 50% 0,rgba(36,150,255,.12),transparent 70%) padding-box,repeating-linear-gradient(0deg,rgba(36,150,255,.035) 0 1px,transparent 1px 24px) padding-box,${MID} padding-box,linear-gradient(180deg,#2a6bb0,#164e87 40%,#0e3864) border-box!important;border:3px solid transparent!important;border-image:none!important;border-radius:0!important;clip-path:${CH4(14)}!important;box-shadow:inset 0 0 0 1px #2496ff,inset 0 0 0 3px rgba(4,13,33,.6),inset 0 2px 0 3px rgba(125,211,252,.18)!important;backdrop-filter:none!important`;
 /* ---------- bộ phân loại nút ---------- */
 const SKIP_IN='#hdr9,#lb68,.ck9,#game-field,.hud,.mobile-crafts,.stg9,#tele07,.w74wrap,.sr-slots,.sr-stage,#hb-strip,.cm-world,svg';
 const SKIP_SELF='.x22,.m63-x,.nc307-x,.h9x,.e74x,[data-cd9x],[data-cp9x],.hb-slot,.k307-row,.cd22,.vk22,.hsav,.cx7-c,.sr-slot,.sr-nav,.sr-sk,.sr-chip,.ar9,.hgc,.day,.cm-node,.rd9,.q9,#pause,#fullscreen-toggle,#auto6,#robot-skill,#missile-action,#bomb,#ult72-btn,#robot-control,[data-craft],.w74hub,.st71-row,.st71-sk,.pl67-node,.u22-no';
 const hue=c=>{const m=(c||'').match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);if(!m)return null;const r=+m[1]/255,g=+m[2]/255,b=+m[3]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;if(mx<.12)return {h:0,s:0,v:mx};let h=0;if(d){h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360;}return {h,s:mx?d/mx:0,v:mx};};
 function toneOf(b,cs){
  const t=(b.textContent||'').trim().toUpperCase();
  if(b.disabled||b.classList.contains('dis'))return 'x';
  const pc=b.parentElement?(b.parentElement.className+''):'';
  const tabby=b.hasAttribute('aria-pressed')||b.getAttribute('role')==='tab'||(b.parentElement&&b.parentElement.children.length>=2&&/tab|seg|tb22|ftab|hstab|vk7-tabs|k307-foot|h9t|cx7-tabs|nc307-tb|s77-t|q77-t|st71-t|hub9|h9b/i.test(pc));
  const sib=b.parentElement?[...b.parentElement.children].filter(x=>x.tagName==='BUTTON'):[];
  if(tabby||(sib.length>=2&&sib.some(x=>/(^|\s)(on|sel|active|cur)(\s|$)/.test(x.className+'')||x.getAttribute('aria-pressed')==='true'||x.getAttribute('aria-selected')==='true')))return 'n';
  if(/QUAY LẠI|HỦY|ĐÓNG|ĐỂ SAU|THÔI|TRỞ|VỀ /.test(t))return 's';
  const src=cs.backgroundImage&&cs.backgroundImage!=='none'?(cs.backgroundImage.match(/rgba?\([^)]*\)/g)||[])[0]:cs.backgroundColor;const h=hue(src);
  if(h&&h.s>.35&&h.v>.35){if(h.h>=20&&h.h<62)return 'g';if(h.h>=150&&h.h<200)return 't';if(h.h<20||h.h>=335)return 'r';}
  if(/NÂNG CẤP|XUẤT KÍCH|NHẬN|TIẾN BẬC|CƯỜNG HÓA|HỢP THỂ|KÍCH HOẠT|MUA|XÁC NHẬN|LÊN CẤP|LÊN HUYỀN|ĐỘT PHÁ/.test(t))return 'g';
  return 's';}
 function classify(root){if(!ON()||window.U22B===false)return;
  for(const b of (root||document).querySelectorAll('button:not([data-u22]),[role=tab]:not([data-u22])')){
   if(!b.isConnected||!b.offsetParent)continue;b.dataset.u22='0';
   if(b.closest(SKIP_IN)||b.matches(SKIP_SELF))continue;
   const t=(b.textContent||'').trim();if(!t||/^[✕×✖+−\-‹›<>⇄⇅↻]$/.test(t))continue;
   const big=[...b.querySelectorAll('img,canvas,.gear25-art,.av22,.k307-ic,.vb')].some(x=>{const r=x.getBoundingClientRect();return r.width>30&&r.height>30;});if(big)continue;
   const r=b.getBoundingClientRect();if(r.height>70||r.height<16)continue;
   const cs=getComputedStyle(b);if(cs.position==='static')b.dataset.u22rel='1';b.dataset.u22=toneOf(b,cs);}}
 let qd=0;const sched=()=>{if(qd)return;qd=setTimeout(()=>{qd=0;try{if(typeof mode!=='undefined'&&mode==='play')return;}catch{}classify();},120);};
 /* ---------- CSS ---------- */
 const B='[data-u22]:not([data-u22="0"])';
 const css=`
${P}:where(${B}){--k:9px;--f1:#0d2852;--f2:#184888;--rim:#38bdf8;--ac:#e8f6ff;--bar:#38bdf8;
 isolation:isolate!important;border:0!important;border-image:none!important;border-radius:0!important;outline:0!important;filter:none!important;
 background:var(--rim)!important;clip-path:${CH4('var(--k)').replace(/var\(--k\)px/g,'var(--k)')}!important;box-shadow:none!important;
 color:var(--ac)!important;-webkit-text-fill-color:var(--ac)!important;text-shadow:0 1px 1px rgba(0,0,0,.55)!important;font-weight:900!important;letter-spacing:.04em!important;transition:transform .06s,filter .06s!important}
${P}:where(${B})::before{content:''!important;position:absolute!important;inset:1.5px!important;z-index:-1!important;display:block!important;border:0!important;border-radius:0!important;margin:0!important;width:auto!important;height:auto!important;transform:none!important;opacity:1!important;animation:none!important;
 clip-path:polygon(calc(var(--k) - .6px) 0,calc(100% - var(--k) + .6px) 0,100% calc(var(--k) - .6px),100% calc(100% - var(--k) + .6px),calc(100% - var(--k) + .6px) 100%,calc(var(--k) - .6px) 100%,0 calc(100% - var(--k) + .6px),0 calc(var(--k) - .6px))!important;
 background:linear-gradient(180deg,rgba(255,255,255,.32) 0,rgba(255,255,255,.32) 1px,rgba(255,255,255,.05) 1px,transparent 45%),linear-gradient(0deg,var(--bar) 0,var(--bar) 2px,transparent 2px),radial-gradient(70% 55% at 50% 100%,color-mix(in srgb,var(--bar) 32%,transparent),transparent 70%),linear-gradient(180deg,var(--f2),var(--f1))!important;
 box-shadow:none!important}
${P}[data-u22rel]{position:relative!important}
${P}:where(${B})::after{content:none!important}
${P}:where(${B}):active{transform:translateY(1px) scale(.98)!important;filter:brightness(.88)!important}
${P}[data-u22=g]{--f1:#d98a16;--f2:#f5c249;--rim:#fde68a;--ac:#0b1a33;--bar:#9a5b07;text-shadow:0 1px 0 rgba(255,255,255,.3)!important}
${P}[data-u22=t]{--f1:#0b4f4a;--f2:#0f766e;--rim:#5eead4;--bar:#5eead4}
${P}[data-u22=r]{--f1:#5c0d14;--f2:#a3171f;--rim:#f87171;--bar:#fb7185}
${P}[data-u22=x]{--f1:#1e293b;--f2:#334155;--rim:#475569;--ac:#94a3b8;--bar:transparent;text-shadow:none!important}
${P}[data-u22=n]{--k:7px;--f1:#071430;--f2:#0d2147;--rim:#1e4a80;--ac:#8fb6e2;--bar:transparent;text-shadow:none!important}
${P}[data-u22=n]:is([aria-pressed=true],.on,.sel,.active,.cur,[aria-selected=true]){--f1:#0d2852;--f2:#184888;--rim:#38bdf8;--ac:#fff;--bar:#38bdf8;text-shadow:0 0 6px rgba(56,189,248,.6)!important}
${P}:where(${B}):disabled{--f1:#1e293b;--f2:#334155;--rim:#475569;--ac:#94a3b8;--bar:transparent}
/* ---------- khung hộp + nền tối #040D21 ---------- */
${P}#overlay :is(#rs,.pz12){background:none!important;border:0!important;border-image:none!important;box-shadow:none!important;clip-path:none!important;isolation:isolate!important;overflow:visible!important}
${P}#overlay :is(#rs,.pz12)::before{content:''!important;display:block!important;position:absolute!important;inset:0!important;z-index:-1!important;pointer-events:none!important;opacity:1!important;transform:none!important;animation:none!important;${SHELL}}
${P}#overlay :is(#rs,.pz12)::after{display:none!important}
${P}#overlay #rs .rs-rib{z-index:3!important}
${P}#overlay #rs .v77r{${CARD}}
${P}#overlay #badge{clip-path:${CH4(6)}!important;border-radius:0!important;background:linear-gradient(180deg,#0f2b57,#081a3a)!important;box-shadow:inset 0 0 0 1px #2496ff!important}
${P}:is(.m63 > .m63-card,#nav74p .n74pc,#m40 .mm,.e74p .e74c,#k307 .k307-in,#cd9 .cd9c,#ch10 .cd9c,#cp9 .cp9c)::before{${SHELL};opacity:1!important;filter:none!important}
${P}:is(#k307 .k307-in,#nc307 .nc307-in){background:${MID}!important}
${P}#hub9{background:linear-gradient(180deg,#071634,#040d21)!important;box-shadow:inset 0 -1px 0 #2496ff,0 4px 10px rgba(0,0,0,.5)!important;border:0!important;border-image:none!important}
${P}#hub40 #hb-body{background:${MID}!important}
${P}:is(.nc307-card,.k307-hop,.st71-socks,.pl67-team,.pl67-sum,.cx7-bonus,.cx7-detail,.l14h,.sl11){${CARD}}
/* ---------- nền forge / starmap ---------- */
${PB}#nc307 .nc307-in{background:linear-gradient(180deg,rgba(4,13,33,.15) 0,rgba(4,13,33,0) 22%,rgba(4,13,33,.55) 44%,#040d21 60%),url(${IMG('forge_bg')}) center -150px/100% auto no-repeat,${MID}!important}
${PB}#nc307 .nc307-pn{background:none!important;box-shadow:none!important;clip-path:none!important}
${PB}.u72 .sr.vk7{background:linear-gradient(180deg,rgba(4,13,33,.35) 0,rgba(4,13,33,0) 30%,rgba(4,13,33,0) 62%,rgba(4,13,33,.85) 74%,#040d21 86%),url(${IMG('forge_bg')}) center 12px/100% auto no-repeat,${MID}!important}
${PB}.u72 .sr-ring,${PB}.u72 .sr-plat{opacity:.35!important}
${PB}#hub40 .ht197{background:linear-gradient(180deg,rgba(4,13,33,.2) 0,rgba(4,13,33,0) 25%,rgba(4,13,33,0) 50%,rgba(4,13,33,.9) 62%,#040d21 72%),url(${IMG('forge_bg')}) center -205px/100% auto no-repeat,${MID}!important}
${PB}#hub40 .ht-hero{background:none!important}
${PB}.pl67 .pl67-card{background:linear-gradient(180deg,rgba(4,13,33,.25) 0,rgba(4,13,33,0) 25%,rgba(4,13,33,0) 54%,rgba(4,13,33,.92) 70%,#040d21 82%),url(${IMG('forge_bg')}) center -120px/100% auto no-repeat,${MID}!important;clip-path:${CH4(12)}!important;box-shadow:inset 0 0 0 1.5px #38bdf8,inset 0 0 22px rgba(56,189,248,.25)!important;border-radius:0!important}
${PB}#cmap{background:radial-gradient(55% 35% at 50% 50%,rgba(56,189,248,.10),transparent 70%),url(${IMG('starmap_bg')}) center top/cover no-repeat,#040d21!important}
${PB}#cmap .cm-bg{background:none!important;filter:none!important}
${PB}#cmap svg.cs10s :is(line,path,polyline){filter:drop-shadow(0 0 3px rgba(125,211,252,.75))}
/* ---------- Kho: nút VKTT trùng tab · hàng lối tắt gọn ---------- */
${P}#hub40 [data-c9g=ult]{display:none!important}
${P}#hub40 .c9sc{gap:6px!important}
${P}#hub40 .c9sc button{height:28px!important;min-height:0!important;padding:0 8px!important;font-size:10px!important}
${P}#hub40 .c9sc button img{max-height:18px!important}
${P}#hub40 .stg9 canvas{-webkit-mask-image:linear-gradient(180deg,transparent 0,transparent 74px,#000 108px)!important;mask-image:linear-gradient(180deg,transparent 0,transparent 74px,#000 108px)!important}
${P}#hub40 .k22 .hb-slot.c22::before{background:radial-gradient(90% 55% at 50% 12%,rgba(255,255,255,.26),transparent 62%),radial-gradient(70% 50% at 50% 100%,rgba(0,0,0,.45),transparent 70%),var(--rf22)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.45)}
${P}#hub40 .k22 .r22-tr{--rf22:linear-gradient(160deg,#8a9bb0,#3b4758 55%,#1c232d)}
${P}#hub40 .k22 .r22-luc{--rf22:linear-gradient(160deg,#34d399,#0f7a4d 55%,#06291c)}
${P}#hub40 .k22 .r22-lam{--rf22:linear-gradient(160deg,#60a5fa,#1d4ed8 55%,#0a1f4d)}
${P}#hub40 .k22 .r22-tim{--rf22:linear-gradient(160deg,#c084fc,#7e22ce 55%,#2b0b55)}
${P}#hub40 .k22 .r22-tim5{--rf22:linear-gradient(160deg,#f0abfc,#c026d3 55%,#3f0a4d)}
${P}#hub40 .k22 .r22-ss{--rf22:linear-gradient(160deg,#fde68a,#d97706 55%,#552800)}
/* ---------- thẻ danh sách có dải màu bậc ---------- */
${P}.st71-row{position:relative!important;${CARD.replace('border:0!important;','')};min-height:54px!important}
${P}.st71-row::before{content:''!important;position:absolute!important;left:3px!important;top:6px!important;bottom:6px!important;width:4px!important;background:var(--c,#38bdf8)!important;box-shadow:0 0 8px var(--c,#38bdf8)!important;border-radius:2px!important;display:block!important;z-index:1!important}
${P}#k307 .k307-row .k307-ri > small{white-space:nowrap!important;overflow:visible!important;text-overflow:clip!important}
${P}#k307 .k307-row .k307-ri > small{font-size:9.5px!important;letter-spacing:.02em!important}
${P}#k307 .k307-row .k307-ic > .gear25-art{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important}
${P}#k307 .k307-row .k307-ic .c9e{right:3px!important;left:auto!important;max-width:calc(100% - 6px)!important}
${P}#k307 :is(.k307-row,.k307-rr) button{min-height:24px!important;height:auto!important;padding:4px 8px!important;font-size:10px!important}
/* Túi đồ (chủ dự án 11:29): bỏ nhãn +X ở góc ô (đã có TÍM +N ở cột giữa) · ϟ Siêu Tần Tuần thành dấu cạnh tên · cột phải chừa lề 6 px · nút + nhãn vát 45° · đơn vị s viết thường */
${P}#k307 .k307-row .k307-ic :is(.c9e,.c9s){display:none!important}
${P}#k307 .k307-row .k307-ic > .oc10i{display:none!important}
${P}#k307 .k307-row:has(.oc10i) .k307-ri > b::after{content:' ϟ';color:#fde047;-webkit-text-fill-color:#fde047;text-shadow:0 0 6px rgba(253,224,71,.6)}
${P}#k307 .k307-row .u22s{font-style:normal!important;text-transform:none!important;margin-left:1px}
${P}#k307 .k307-row .k307-rr{display:flex!important;flex-direction:column!important;align-items:flex-end!important;justify-content:center!important;gap:4px!important;padding:6px 2px 6px 0!important;box-sizing:border-box!important;align-self:stretch!important}
${P}#k307 .k307-row[data-f]{min-height:86px!important;padding-top:8px!important;padding-bottom:8px!important}
${P}#k307 .k307-row .k307-rr > *{flex-shrink:0!important}
${P}#k307 .k307-row .k307-rr > b{font-size:13px!important;line-height:1!important;margin:0!important}
${P}#k307 .k307-row .k307-rr > s{display:inline-block!important;text-decoration:none!important;margin:0!important;padding:2px 8px!important;font:900 9px/1.1 inherit!important;letter-spacing:.06em!important;border-radius:0!important;clip-path:${CH4(4)}!important;background:linear-gradient(180deg,#15803d,#0b4f27)!important;box-shadow:inset 0 0 0 1px #4ade80!important;color:#dcfce7!important;-webkit-text-fill-color:#dcfce7!important}
${P}#k307 .k307-row .k307-rr > .k9a{margin:0!important;height:20px!important;min-height:0!important;line-height:20px!important;padding:0 10px!important;font:900 9.5px/20px inherit!important;letter-spacing:.06em!important;border:0!important;border-radius:0!important;clip-path:${CH4(5)}!important;background:linear-gradient(180deg,rgba(255,255,255,.3) 0,rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(180deg,#f5c249,#d98a16)!important;box-shadow:inset 0 0 0 1px #fde68a!important;color:#0b1a33!important;-webkit-text-fill-color:#0b1a33!important;text-shadow:none!important}
${P}#k307 .k307-row .k307-rr > .k9a.m{background:linear-gradient(180deg,#334155,#1e293b)!important;box-shadow:inset 0 0 0 1px #64748b!important;color:#cbd5e1!important;-webkit-text-fill-color:#cbd5e1!important}
${P}#k307 .k307-row .k307-rr > .k9a.b{background:linear-gradient(180deg,rgba(255,255,255,.22) 0,rgba(255,255,255,.22) 1px,transparent 1px),linear-gradient(180deg,#184888,#0d2852)!important;box-shadow:inset 0 0 0 1px #38bdf8!important;color:#e8f6ff!important;-webkit-text-fill-color:#e8f6ff!important}
/* ---------- Phúc lợi: ô 7 ngày ---------- */
${P}.l14d .day{position:relative!important;${CARD};box-shadow:inset 0 1px 0 rgba(148,197,255,.45),inset 0 0 0 1.5px var(--dc,#1d4f8f)!important;padding:6px 4px!important;gap:3px!important;font-size:9.5px!important;line-height:1.2!important}
${P}.l14d .day:nth-child(-n+2){--dc:#3b82f6}${P}.l14d .day:nth-child(3),${P}.l14d .day:nth-child(4){--dc:#22c55e}${P}.l14d .day:nth-child(5),${P}.l14d .day:nth-child(6){--dc:#a855f7}${P}.l14d .day.d7{--dc:#f59e0b}
${P}.l14d .day.now{box-shadow:inset 0 1px 0 rgba(254,240,138,.7),inset 0 0 0 2px #fbbf24!important}
${P}.l14d .day.got{opacity:.62}
${P}.l14d .day img{width:52px!important;height:52px!important;object-fit:contain!important}
${P}.l14d .day > b{font:900 10px/1 inherit!important;letter-spacing:.06em!important;color:#fde68a!important}
/* ---------- Phi công: huy hiệu chỉ số ---------- */
${P}.pl67 .pl67-st{display:flex!important;flex-wrap:wrap!important;gap:4px!important}
${P}.pl67 .pl67-st > *{${CARD};padding:3px 7px!important;font-size:10px!important}
/* ---------- Bách khoa: bớt khoảng trống, tên 2 dòng không cắt ---------- */
${P}.cx7-detail{min-height:0!important;padding:8px!important}
${P}.cx7-c small{white-space:normal!important;overflow:hidden!important;text-overflow:clip!important;display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;line-height:1.12!important;text-align:center!important;font-size:8.5px!important;min-height:2.3em!important;word-break:normal!important}
/* ---------- Cửa hàng: nút quay không tràn ---------- */
${P}.w74btns .e74go{font-size:11px!important;letter-spacing:.02em!important;white-space:nowrap!important;padding:0 6px!important}
/* ---------- thanh trượt: tia laser mảnh + núm kim loại vát ---------- */
${P}.st66 input[type=range]{-webkit-appearance:none!important;appearance:none!important;height:4px!important;min-height:0!important;max-height:4px!important;align-self:center!important;padding:0!important;border:0!important;background:linear-gradient(90deg,#67e8f9 0,#22d3ee var(--p,50%),#0b1b38 var(--p,50%),#0b1b38 100%)!important;box-shadow:0 0 6px rgba(34,211,238,.55),inset 0 0 0 1px rgba(56,189,248,.35)!important;border-radius:2px!important;outline:0!important}
${P}.st66 input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:18px;border:0;background:linear-gradient(180deg,#e2e8f0,#64748b 48%,#cbd5e1);clip-path:${CH4(4)};box-shadow:0 0 6px #22d3ee}
${P}.st66 input[type=range]::-moz-range-thumb{width:14px;height:18px;border:0;border-radius:0;background:linear-gradient(180deg,#e2e8f0,#64748b 48%,#cbd5e1)}
/* ---------- thẻ con Hồ sơ / Trang phục / Cài đặt ---------- */
${P}:is(#hs22 .hgc,#hs22 .ct22 > *,#hs22 .cr22,#fr22 .cd22,#fr22 .dt22,#hs22 .hs22top,.st66 .st66-row,.st66 .st66-seg){${CARD};padding:8px!important}
${P}#hs22 .hgc{padding:6px 4px 5px!important}
${P}.st66 .st66-seg{display:flex!important;gap:6px!important}
${P}.st66 .st66-row{gap:6px!important}
/* ---------- VKTT ---------- */
${P}.u72 .sr-top{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:8px!important;position:relative!important;height:40px!important;padding:0 10px!important;${CARD}}
${P}.u72 .sr-top .sr-title{position:static!important;transform:none!important;flex:1 1 auto!important;min-width:0!important;text-align:left!important;font:900 14px/1 inherit!important;letter-spacing:.1em!important;color:#fff!important;-webkit-text-fill-color:#fff!important;background:none!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
${P}.u72 .sr-top .sr-tk{display:none!important}
${P}.u72 .sr-slot.sup{clip-path:polygon(25% 2%,75% 2%,99% 50%,75% 98%,25% 98%,1% 50%)!important;border-radius:0!important}
${P}.u72 .sr-slot.main{border-radius:50%!important;clip-path:none!important}
${P}.u72 .sr-name > b{display:inline-block!important;padding:7px 26px!important;border:0!important;border-radius:0!important;clip-path:${CH4(9)}!important;background:linear-gradient(180deg,rgba(255,255,255,.3) 0,rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(180deg,#f5c249,#d98a16)!important;box-shadow:inset 0 0 0 1.5px #fde68a!important;color:#0b1a33!important;-webkit-text-fill-color:#0b1a33!important;text-shadow:none!important;font:900 17px/1 inherit!important;letter-spacing:.06em!important;filter:none!important}
${P}.u72 :is(.sr-nav,.sr-sk,.sr-chip){clip-path:${CH4(8)}!important;border-radius:0!important}
/* ---------- Tiến bậc thành công ---------- */
${P}#as22 .as22b{${SHELL};overflow:hidden!important}
${P}#as22 .as22b::before{content:'';position:absolute;left:50%;top:150px;width:330px;height:330px;margin:-165px 0 0 -165px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--vc,#ffd23f) 55%,transparent) 0,color-mix(in srgb,var(--vc,#ffd23f) 18%,transparent) 42%,transparent 70%);pointer-events:none;z-index:0}
${P}#as22 .as22b > *{position:relative;z-index:1}
${P}#as22 .wm22{position:absolute!important;left:0!important;right:0!important;top:118px!important;z-index:0!important;text-align:center!important;font:900 58px/1 inherit!important;letter-spacing:.04em!important;white-space:nowrap!important;overflow:hidden!important;color:var(--vc,#ffd23f)!important;-webkit-text-fill-color:var(--vc,#ffd23f)!important;opacity:.2!important;pointer-events:none!important;transform:none!important}
${P}#as22 .asg22{gap:6px!important}
${P}#as22 :is(.asg22,.asc22) > div{${CARD};padding:7px 6px!important}
${P}#as22 .asc22 > .od{box-shadow:inset 0 1px 0 rgba(254,240,138,.6),inset 0 0 0 1px #f59e0b,inset 0 -2px 0 rgba(0,0,0,.35)!important}
${P}#as22 .tl22{min-width:170px!important;height:44px!important}
/* ---------- 6 khung avatar giới hạn (tranh vuông; ô cửa sổ ≈ 17–83 % × 16–81 %) ---------- */
${P}.av22:is(.fr22-phoenix,.fr22-ice,.fr22-thunder,.fr22-void,.fr22-holy,.fr22-jade) > :is(img,b){width:77%!important;height:77%!important;border-radius:5%!important;transform:translateY(-1.6%)!important;box-shadow:none!important;object-fit:cover!important}
${P}.av22:is(.fr22-phoenix,.fr22-ice,.fr22-thunder,.fr22-void,.fr22-holy,.fr22-jade) .fi22{z-index:2!important}
${P}#lb68-pp:is([data-fr22=phoenix],[data-fr22=ice],[data-fr22=thunder],[data-fr22=void],[data-fr22=holy],[data-fr22=jade]) .fi22{inset:-26% -26% -24% -26%!important;z-index:3!important}
${P}#lb68-pp:is([data-fr22=phoenix],[data-fr22=ice],[data-fr22=thunder],[data-fr22=void],[data-fr22=holy],[data-fr22=jade]) img{border-radius:6%!important;object-fit:cover!important}
/* ---------- vùng an toàn (đáy ≥ 20 px, đầu theo --sat42) ---------- */
html.u22{--sb22:max(env(safe-area-inset-bottom,0px),20px)}
${P}#hgr41 #lb68{padding-bottom:var(--sb22)!important;box-sizing:border-box!important}
${P}#hub40 .c9bar{align-items:flex-start!important;padding-top:6px!important}
${P}#hub40 .c9bar button{height:42px!important;min-height:0!important}
${P}#k307 .k307-in{padding-bottom:var(--sb22)!important;box-sizing:border-box!important}
${P}#nc307 .nc307-in{padding-top:calc(var(--sat42,0px) + 4px)!important;padding-bottom:var(--sb22)!important;box-sizing:border-box!important}
${P}#cmap .mb10{bottom:var(--sb22)!important}
${P}#cmap{box-sizing:border-box!important;border-bottom:var(--sb22) solid #040d21!important;overflow:hidden!important}
${P}#hub40 .c9bar{transform:translateY(-12px)!important}
html.hub9on body${NOT} .m22:not([hidden]){padding-top:calc(var(--sat42,0px) + 56px)!important}
${P}.m63:not([hidden]){box-sizing:border-box!important;border-bottom:var(--sb22) solid rgba(2,6,14,.94)!important}
${P}:is(#missile-action,#bomb,#ult72-btn,#robot-skill,#robot-control){margin-bottom:var(--sb22)!important}
`;
 function paint(){try{for(const r of document.querySelectorAll('.st66 input[type=range]')){const mn=+r.min||0,mx=+r.max||100,p=((+r.value-mn)/((mx-mn)||1)*100).toFixed(1)+'%';if(r.style.getPropertyValue('--p')!==p)r.style.setProperty('--p',p);}}catch{}}
 function boot(){if(!ON())return;const h=document.documentElement;h.classList.add('u22');if(window.U22BG!==false)h.classList.add('u22bg');
  if(!document.getElementById('u22-css')){const st=document.createElement('style');st.id='u22-css';st.textContent=css;document.head.appendChild(st);}
  document.addEventListener('input',e=>{if(e.target&&e.target.matches&&e.target.matches('.st66 input[type=range]'))paint();},true);
  try{new MutationObserver(sched).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','class']});}catch{}
  setInterval(()=>{if(ON()){paint();sched();}},700);sched();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
 window.U22UI={css:()=>css,classify};
})();
