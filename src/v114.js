// V114 · REVIEW114 giao diện: nút SKIN/KHOE không đè NÂNG CẤP · đệm đáy Chợ Đen · bản đồ chừa chỗ hộp TUẦN TRA · tiêu đề kết quả có nền tối
(()=>{
  const st=document.createElement('style');st.id='v114-css';
  st.textContent=`.n74c.n114{display:none!important}
#sk114{position:fixed;top:138px;right:12px;z-index:2147483200;display:flex;flex-direction:column;gap:6px}
#sk114 button{min-width:70px;padding:6px 8px;font:800 11px 'Neo',sans-serif;color:#e8f4ff;border-radius:16px;border:1px solid #6fb6e8;background:rgba(10,30,56,.88)}
.tr67-slot:last-of-type{margin-bottom:40px}
#cm-scroll{padding-bottom:96px;box-sizing:border-box}
#rs .rs-rib{top:-74px!important;padding:3px 16px!important;background:rgba(4,10,22,.92)!important;border-radius:8px!important;box-shadow:0 0 0 1px #f3d48a55}`;
  document.head.appendChild(st);
  let box=null;setInterval(()=>{try{let src=null;for(const c of document.querySelectorAll('.n74c')){const t=c.textContent||'';const on=/SKIN/.test(t)&&/KHOE/.test(t)&&c.children.length<=3&&window.UI114!==false;c.classList.toggle('n114',on);if(on&&c.closest('#nav74s')&&getComputedStyle(c.closest('#nav74s')).display!=='none')src=c;}
    if(src){try{const was=box&&!box.hidden;if(box)box.hidden=true;const el=document.elementFromPoint(innerWidth/2,200);if(box)box.hidden=!was;if(!el||!el.closest('[class*="hb-"],[id^="hb"]'))src=null;}catch{}}
    // V117 (REVIEW117 §4.1): chỉ hiện ở Phi đội › Chiến cơ (có nút ĐỘT PHÁ của chiến cơ)
    if(src){try{const cur=Nav74.state().cur,hb=document.getElementById('hb-en');if(cur!=='fleet'||!hb||!hb.offsetParent)src=null;}catch{}}
    if(!src){if(box)box.hidden=true;return;}if(!box){box=document.createElement('div');box.id='sk114';document.body.appendChild(box);box.addEventListener('click',e=>{const b=e.target.closest('[data-c114]');if(!b)return;e.stopPropagation();try{Nav74.closeAll();}catch{}try{Nav74.F[b.dataset.c114].go();}catch{}});}
    const key=[...src.querySelectorAll('[data-c]')].map(b=>b.dataset.c).join();if(box.dataset.k!==key){box.dataset.k=key;box.innerHTML=[...src.querySelectorAll('[data-c]')].map(b=>`<button type="button" data-c114="${b.dataset.c}">${b.textContent.trim()}</button>`).join('');}box.hidden=false;}catch{}},400);
})();
// REVIEW114 cộng hưởng khung Tím/Lam: +8%/+5% giáp → nhân chỉ số giáp trong lực chiến
(()=>{function inst(){try{if(Combat.__a114)return;Combat.__a114=1;const os=Combat.stats;Combat.stats=function(){const r=os.apply(this,arguments);try{if(window.RES114!==false&&r){const b=Meta407.bonuses();const p=b&&b.armorPct114;if(p){const a0=r.armor;const o={...r,armor:r.armor*(1+p)};o.cp=Math.round(r.cp+(o.armor-a0)*65);return o;}}}catch{}return r;};}catch{}}setTimeout(inst,0);})();
