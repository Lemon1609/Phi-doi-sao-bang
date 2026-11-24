/* V2.2 · U22 — đồng bộ giao diện theo Sảnh (chủ dự án 24/11 09:24):
   1 hệ nút vát 45° viền kim loại (vàng = hành động chính · xanh = phụ · ngọc = cải tạo · cam = trang phục · navy = tab chưa chọn),
   khung hộp #040D21 viền kép #2496FF vát góc cho Kết quả / Tạm dừng, thẻ con gradient + vát sáng, thanh trượt năng lượng cyan,
   Kho: đạn xem trước không đè dải đầu, màn VKTT + Tiến bậc chỉnh lại. Chỉ CSS + vài dòng JS, không đổi chức năng.
   Tắt: window.U22=false (hoặc window.V22=false). */
(()=>{
 const ON=()=>window.V22!==false&&window.U22!==false;
 const NOT=':not(#_u22)'.repeat(100),P='html.u22 body'+NOT+' ';
 const CH=k=>`polygon(${k}px 0,100% 0,100% calc(100% - ${k}px),calc(100% - ${k}px) 100%,0 100%,0 ${k}px)`;
 const CH4=k=>`polygon(${k}px 0,calc(100% - ${k}px) 0,100% ${k}px,100% calc(100% - ${k}px),calc(100% - ${k}px) 100%,${k}px 100%,0 calc(100% - ${k}px),0 ${k}px)`;
 // ---- nhóm nút ----
 const GOLD=['#e22a .e22g','#overlay #start','.c9bar .up','#as22 .tl22','.u72 .sr-go','#fr22 .tl22:not(.dis)'];
 const BLUE=['#e22a .e22s','#overlay #dock-return','#overlay #pz66','.c9bar button:not(.up):not(.cai)','#hs22 .fbt22','#hs22 .vgo22','.u72 .sr-sd','.u72 .sr-tk','#hub40 .bk22','.st66 .st66-row button','.st66 #perf15b','.st66 .st66-row label + button'];
 const TEAL=['.c9bar .cai'];
 const ABS=['#hub40 .c9tp','#hub40 .bk22','#overlay #pz66'];/* nút vốn định vị tuyệt đối/cố định: không ép position */
 const ORNG=['#hub40 .c9tp'];
 const GREY=['#fr22 .tl22.dis','#as22 .tl22.dis'];
 const TABS=['#hs22 .hstab22 button','#fr22 .ftab22 button','.st66 .st66-seg button','.u72 .vk7-tabs button','#hub40 .tb22 button'];
 const ALL=[...GOLD,...BLUE,...TEAL,...ORNG,...GREY,...TABS];
 const is=a=>`:is(${a.join(',')})`,wh=a=>`:where(${a.join(',')})`;/* nền chung dùng :where để tông màu từng nhóm (:is) luôn thắng */
 const CARD=`background:radial-gradient(120% 70% at 50% 0,rgba(96,165,250,.18),transparent 60%),linear-gradient(180deg,#14336a 0,#0b2149 46%,#06122b 100%)!important;box-shadow:inset 0 1px 0 rgba(191,219,254,.55),inset 0 0 0 1px #1d5aa3,inset 0 -2px 0 rgba(0,0,0,.35)!important;clip-path:${CH4(7)}!important;border:0!important;border-radius:0!important`;
 const SHELL=`background:radial-gradient(120% 40% at 50% 0,rgba(36,150,255,.16),transparent 70%) padding-box,repeating-linear-gradient(0deg,rgba(36,150,255,.045) 0 1px,transparent 1px 24px) padding-box,linear-gradient(180deg,#071634,#040d21) padding-box,linear-gradient(180deg,#2a6bb0,#164e87 40%,#0e3864) border-box!important;border:3px solid transparent!important;border-image:none!important;border-radius:0!important;clip-path:${CH4(14)}!important;box-shadow:inset 0 0 0 1px #2496ff,inset 0 0 0 3px rgba(4,13,33,.6),inset 0 2px 0 3px rgba(125,211,252,.25)!important;backdrop-filter:none!important`;
 const css=`
${P}${wh(ALL)}{--k:10px;--a1:#38bdf8;--a2:#0b4a8f;--ac:#fff;--r1:#f1f5f9;--r2:#64748b;--r3:#cbd5e1;
 isolation:isolate!important;overflow:visible!important;border:0!important;border-image:none!important;border-radius:0!important;outline:0!important;
 background:linear-gradient(180deg,var(--r1) 0,var(--r2) 50%,var(--r3) 100%)!important;clip-path:${CH('var(--k)').replace(/var\(--k\)px/g,'var(--k)')}!important;
 box-shadow:none!important;color:var(--ac)!important;-webkit-text-fill-color:var(--ac)!important;text-shadow:0 1px 1px rgba(0,0,0,.45)!important;font-weight:900!important;letter-spacing:.05em!important;filter:none!important;transition:transform .06s,filter .06s!important}
${P}${wh(ALL)}::before{content:''!important;position:absolute!important;inset:2px!important;z-index:-1!important;display:block!important;border:0!important;border-radius:0!important;margin:0!important;width:auto!important;height:auto!important;transform:none!important;opacity:1!important;animation:none!important;
 clip-path:polygon(calc(var(--k) - 1px) 0,100% 0,100% calc(100% - var(--k) + 1px),calc(100% - var(--k) + 1px) 100%,0 100%,0 calc(var(--k) - 1px))!important;
 background:linear-gradient(180deg,rgba(255,255,255,.5) 0,rgba(255,255,255,.14) 46%,rgba(255,255,255,0) 52%,rgba(0,0,0,.2) 100%),linear-gradient(180deg,var(--a1),var(--a2))!important;
 box-shadow:inset 0 1px 0 rgba(255,255,255,.85),inset 0 -2px 0 rgba(0,0,0,.32)!important}
${P}${wh(ALL.filter(x=>!ABS.includes(x)))}{position:relative!important}
${P}${wh(ALL)}:active{transform:translateY(1px) scale(.98)!important;filter:brightness(.9)!important}
${P}${is(GOLD)}{--a1:#fde047;--a2:#d97706;--ac:#2b1300;--r1:#fff7cc;--r2:#a16207;--r3:#fde68a;text-shadow:0 1px 0 rgba(255,255,255,.4)!important}
${P}${is(TEAL)}{--a1:#5eead4;--a2:#0d7d72;--r2:#115e59}
${P}${is(ORNG)}{--a1:#fdba74;--a2:#c2410c;--r1:#ffedd5;--r2:#9a3412;--r3:#fed7aa}
${P}${is(GREY)}{--a1:#64748b;--a2:#1e293b;--ac:#cbd5e1;--r2:#334155}
${P}${is(TABS)}{--k:8px;--a1:#1e3a8a;--a2:#0a1a3f;--ac:#bfdbfe;--r1:#64748b;--r2:#1e293b;--r3:#475569;text-shadow:none!important}
${P}:is(#hs22 .hstab22 button[aria-pressed=true],#fr22 .ftab22 button[aria-pressed=true],.st66 .st66-seg button[aria-pressed=true],.u72 .vk7-tabs button.on,#hub40 .tb22 button[aria-pressed=true]){--a1:#38bdf8;--a2:#0369a1;--ac:#fff;--r1:#fef9c3;--r2:#ca8a04;--r3:#fde68a;text-shadow:0 1px 1px rgba(0,0,0,.5)!important}
${P}.st66 .st66-row button[aria-pressed=false]{--a1:#334155;--a2:#0f172a;--ac:#cbd5e1}
${P}:is(.c9bar button,#e22a button){--k:12px}
/* ---- khung hộp #040D21 viền kép ---- */
${P}#overlay :is(#rs,.pz12){background:none!important;border:0!important;border-image:none!important;box-shadow:none!important;clip-path:none!important;isolation:isolate!important;overflow:visible!important}
${P}#overlay :is(#rs,.pz12)::before{content:''!important;display:block!important;position:absolute!important;inset:0!important;z-index:-1!important;pointer-events:none!important;opacity:1!important;transform:none!important;animation:none!important;${SHELL}}
${P}#overlay :is(#rs,.pz12)::after{display:none!important}
${P}#overlay #rs .rs-rib{z-index:3!important}
${P}#overlay #rs.lose{padding-bottom:14px!important}
${P}#overlay #rs .v77r{${CARD}}
${P}#overlay .pz12 ~ * #badge,${P}#overlay #badge{clip-path:${CH4(6)}!important;border-radius:0!important;background:linear-gradient(180deg,#0f2b57,#081a3a)!important;box-shadow:inset 0 0 0 1px #2496ff!important}
/* ---- thẻ con: Hồ sơ / Trang phục / Cài đặt ---- */
${P}:is(#hs22 .hgc,#hs22 .ct22 > *,#hs22 .cr22,#fr22 .cd22,#fr22 .dt22,#hs22 .hs22top,.st66 .st66-row,.st66 .st66-seg,.st66 .st206 .st66-row){${CARD};padding:8px!important}
${P}#hs22 .hgc{padding:6px 4px 5px!important}
${P}.st66 .st66-seg{display:flex!important;gap:6px!important}
${P}.st66 .st66-row{gap:6px!important}
${P}#fr22 .cd22.on,${P}#fr22 .cd22[aria-pressed=true]{box-shadow:inset 0 1px 0 rgba(254,240,138,.7),inset 0 0 0 2px #fbbf24!important}
/* ---- thanh trượt năng lượng cyan ---- */
${P}.st66 input[type=range]{-webkit-appearance:none!important;appearance:none!important;height:10px!important;padding:0!important;border:0!important;background:linear-gradient(90deg,#67e8f9 0,#22d3ee calc(var(--p,50%) - 2px),#0e7490 var(--p,50%),#0b1b38 var(--p,50%),#06122b 100%)!important;clip-path:${CH4(3)}!important;box-shadow:inset 0 0 0 1px #1d5aa3!important;outline:0!important}
${P}.st66 input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:20px;border:0;background:linear-gradient(180deg,#ecfeff,#22d3ee 55%,#0e7490);clip-path:${CH4(4)};box-shadow:0 0 8px #22d3ee}
${P}.st66 input[type=range]::-moz-range-thumb{width:16px;height:20px;border:0;border-radius:0;background:linear-gradient(180deg,#ecfeff,#22d3ee 55%,#0e7490)}
/* ---- Kho: đạn xem trước không đè dải đầu; thẻ trang bị giàu màu hơn ---- */
${P}#hub40 .stg9 canvas{-webkit-mask-image:linear-gradient(180deg,transparent 0,transparent 74px,#000 108px)!important;mask-image:linear-gradient(180deg,transparent 0,transparent 74px,#000 108px)!important}
${P}#hub40 .k22 .hb-slot.c22::before{background:radial-gradient(90% 55% at 50% 12%,rgba(255,255,255,.28),transparent 62%),radial-gradient(70% 50% at 50% 100%,rgba(0,0,0,.45),transparent 70%),var(--rf22)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.45)}
${P}#hub40 .k22 .r22-tr{--rf22:linear-gradient(160deg,#8a9bb0,#3b4758 55%,#1c232d)}
${P}#hub40 .k22 .r22-luc{--rf22:linear-gradient(160deg,#34d399,#0f7a4d 55%,#06291c)}
${P}#hub40 .k22 .r22-lam{--rf22:linear-gradient(160deg,#60a5fa,#1d4ed8 55%,#0a1f4d)}
${P}#hub40 .k22 .r22-tim{--rf22:linear-gradient(160deg,#c084fc,#7e22ce 55%,#2b0b55)}
${P}#hub40 .k22 .r22-tim5{--rf22:linear-gradient(160deg,#f0abfc,#c026d3 55%,#3f0a4d)}
${P}#hub40 .k22 .r22-ss{--rf22:linear-gradient(160deg,#fde68a,#d97706 55%,#552800)}
${P}#hub40 .hb-doll .hb-slot.c22{margin-top:6px!important}
/* ---- màn VKTT ---- */
${P}.u72 .sr-top{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;position:relative!important;height:40px!important;padding:0 4px 0 10px!important;${CARD}}
${P}.u72 .sr-top .sr-title{position:static!important;transform:none!important;flex:1 1 auto!important;min-width:0!important;text-align:left!important;font:900 14px/1 inherit!important;letter-spacing:.1em!important;color:#fff!important;-webkit-text-fill-color:#fff!important;text-decoration:none!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;background:none!important}
${P}.u72 .sr-top .sr-tk{position:relative!important;left:auto!important;top:auto!important;right:auto!important;transform:none!important;flex:0 0 auto!important;height:30px!important;padding:0 12px!important;font-size:11px!important;--k:7px}
${P}.u72 .sr-top .sr-tk i{position:absolute!important;top:2px!important;right:2px!important;min-width:14px;height:14px;border-radius:7px;background:#ef4444;color:#fff;-webkit-text-fill-color:#fff;font:900 9px/14px inherit;text-align:center;font-style:normal}
${P}.u72 .vk7-tabs{gap:5px!important}
${P}.u72 .sr-slot.sup{clip-path:polygon(25% 2%,75% 2%,99% 50%,75% 98%,25% 98%,1% 50%)!important;border-radius:0!important}
${P}.u72 .sr-slot.main{border-radius:50%!important;clip-path:none!important}
${P}.u72 .sr-name > b{display:inline-block!important;padding:7px 26px!important;border:0!important;border-radius:0!important;clip-path:${CH4(9)}!important;
 background:linear-gradient(180deg,rgba(255,255,255,.45) 0,rgba(255,255,255,.1) 48%,rgba(0,0,0,0) 52%,rgba(0,0,0,.2) 100%),linear-gradient(180deg,#fde047,#d97706)!important;
 box-shadow:inset 0 1px 0 rgba(255,255,255,.8),inset 0 0 0 2px #fff7cc,inset 0 -2px 0 rgba(0,0,0,.3)!important;color:#2b1300!important;-webkit-text-fill-color:#2b1300!important;text-shadow:0 1px 0 rgba(255,255,255,.35)!important;font:900 17px/1 inherit!important;letter-spacing:.06em!important;filter:none!important}
${P}.u72 :is(.sr-nav,.sr-sk,.sr-chip){clip-path:${CH4(8)}!important;border-radius:0!important}
/* ---- Tiến bậc thành công ---- */
${P}#as22 .as22b{${SHELL};overflow:hidden!important}
${P}#as22 .as22b::before{content:'';position:absolute;left:50%;top:150px;width:330px;height:330px;margin:-165px 0 0 -165px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--vc,#ffd23f) 55%,transparent) 0,color-mix(in srgb,var(--vc,#ffd23f) 18%,transparent) 42%,transparent 70%);pointer-events:none;z-index:0}
${P}#as22 .as22b > *{position:relative;z-index:1}
${P}#as22 .wm22{position:absolute!important;left:0!important;right:0!important;top:118px!important;z-index:0!important;text-align:center!important;font:900 58px/1 inherit!important;letter-spacing:.04em!important;white-space:nowrap!important;overflow:hidden!important;color:var(--vc,#ffd23f)!important;-webkit-text-fill-color:var(--vc,#ffd23f)!important;opacity:.2!important;pointer-events:none!important;transform:none!important}
${P}#as22 .asg22{gap:6px!important}
${P}#as22 .asg22 > div{${CARD};padding:7px 6px!important}
${P}#as22 .asc22 > div{${CARD};padding:8px!important}
${P}#as22 .asc22 > .od{box-shadow:inset 0 1px 0 rgba(254,240,138,.6),inset 0 0 0 1px #f59e0b,inset 0 -2px 0 rgba(0,0,0,.35)!important}
${P}#as22 .tl22{min-width:170px!important;height:44px!important;--k:12px}
`;
 function paint(){try{for(const r of document.querySelectorAll('.st66 input[type=range]')){const mn=+r.min||0,mx=+r.max||100,p=((+r.value-mn)/((mx-mn)||1)*100).toFixed(1)+'%';if(r.style.getPropertyValue('--p')!==p)r.style.setProperty('--p',p);}}catch{}}
 function boot(){if(!ON())return;document.documentElement.classList.add('u22');if(!document.getElementById('u22-css')){const st=document.createElement('style');st.id='u22-css';st.textContent=css;document.head.appendChild(st);}
  document.addEventListener('input',e=>{if(e.target&&e.target.matches&&e.target.matches('.st66 input[type=range]'))paint();},true);setInterval(()=>{if(ON())paint();},500);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
 window.U22UI={css:()=>css};
})();
