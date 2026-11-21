'use strict';
// V197 · Làm gọn khu HỢP THỂ (chủ dự án 07/11: "phần hợp thể khá rối mắt").
//  1) Màn Hợp thể chiến cơ: 1 robot lớn (tranh chân dung V196B) + công thức A + B → SSS + 1 nút chính + dải chọn 7 robot.
//     Bỏ lưới 13 chiến cơ thành phần; kỹ năng / đột phá gập trong "Kỹ năng & chi tiết". Tắt: window.HT197=false
//  2) Rút gọn số dài ở thanh tài nguyên sảnh (104.504.399 → 104,5M). Tắt: window.NUM197=false
//  (Điều hướng gộp: nav74.js NAV197 · Trang bị SSS gọn: gear45.js DET197)
const HT197V=(()=>{
 let pick=null;
 const short=n=>String(n).split(' ').slice(-2).join(' ');
 function view(c){
  const {body,title,F_,toast,re,timg,openCraft}=c;
  title.textContent='Hợp thể';
  const f=F_(),sel=f.selected,R=SSS_RECIPES,M=SSS_MODELS;
  const own=k=>f.supers.find(q=>q.model===k);
  const usingIdx=R.findIndex((p,k)=>{const o=own(k);return o&&o.key===sel;});
  if(pick==null||pick>=R.length)pick=usingIdx>=0?usingIdx:Math.max(0,R.findIndex((p,k)=>own(k)));
  const i=pick,pair=R[i],solo=pair[0]===pair[1],o=own(i),m=M[i],ready=pair.every(Fusion.componentReady),using=!!(o&&sel===o.key);
  let r=null;try{r=o?Fusion.resolve(o.key):null;}catch{}
  const st=using?['ĐANG XUẤT CHIẾN','on']:o?['ĐÃ SỞ HỮU','own']:ready?['SẴN SÀNG HỢP THỂ','rdy']:['CHƯA ĐỦ THÀNH PHẦN','lk'];
  const comp=k=>{const ok=Fusion.componentReady(k),ow=Campaign36.ownsCraft(k);let v={enhance:0};try{v=Workshop.craftProgress(k);}catch{}
   return `<button type="button" class="ht-c ${ok?'ok':''}" data-cr="${k}"><span class="pic">${timg(k)}</span><b>${short(crafts[k].name)}</b><small>${ow?(ok?'✓ +'+v.enhance:'cần +1'):'🔒 chưa có'}</small></button>`;};
  const pos=k=>`${k*100/6}%`;
  body.innerHTML=`<div class="ht197">
   <div class="ht-hero"><div class="hb-sss ht-pic" style="background-position:${pos(i)} 100%"></div>
    <div class="ht-name"><b>${m.name}</b><span class="ht-st ${st[1]}">${st[0]}</span>${r?`<small>Lv ${r.level} · Cường hóa +${r.enhance}</small>`:''}</div></div>
   <div class="ht-rec">${comp(pair[0])}${solo?'<i>✦</i><button type="button" class="ht-c ok ht-solo" disabled><span class="pic" style="display:grid;place-items:center;font-size:26px;color:#fde047">✦</span><b>TỰ THỨC TỈNH</b><small>chỉ cần 1 tàu</small></button>':'<i>+</i>'+comp(pair[1])}<i>→</i><div class="ht-out"><span class="pic"><span class="hb-sss" style="background-position:${pos(i)} 0"></span></span><b>SSS</b></div></div>
   <button type="button" class="hb-btn ${o?'cyan':'gold'} ht-main ${window.HOP4309!==false?'u7-pri':''}" id="ht-x" ${using||(!o&&!ready)?'disabled':''}>${using?'✓ ĐANG XUẤT CHIẾN':o?'CHỌN XUẤT CHIẾN':solo?(ready?'✦ THỨC TỈNH ĐẾ VƯƠNG':'CẦN '+short(crafts[pair[0]].name).toUpperCase()+' CƯỜNG HÓA +1'):ready?'✦ HỢP THỂ 2 CHIẾN CƠ':'CẦN 2 CHIẾN CƠ CƯỜNG HÓA +1'}</button>
   <div class="ht-strip">${R.map((p,k)=>{const ok=own(k),rd=p.every(Fusion.componentReady),us=!!(ok&&sel===ok.key);
     return `<button type="button" class="ht-s ${k===i?'sel':''} ${ok?'own':''} ${us?'us':''}" data-k="${k}"><span class="hb-sss" style="background-position:${pos(k)} 100%"></span><b>${short(M[k].name)}</b>${!ok&&rd?'<i class="hb-dot"></i>':''}</button>`;}).join('')}</div>
   <details class="ht-more"><summary>Kỹ năng &amp; chi tiết</summary><p class="hb-desc">✦ ${m.skills}<br><b>MAX:</b> ${m.max}<br><b>Tuyệt kỹ:</b> ${m.ult}</p>
    <p class="hb-desc">Hợp thể miễn phí, giữ nguyên 2 chiến cơ gốc. Level và cường hóa lấy từ 2 chiến cơ thành phần.</p><div class="ht-meta">${typeof Meta407!=='undefined'?Meta407.sssCard(i,!!o):''}</div></details>
   ${typeof TapBan200!=='undefined'&&TapBan200.on()?TapBan200.btn:''}
   <button type="button" class="ht-lnk" id="ht-n" ${sel?'':'disabled'}>${sel?'Dùng chiến cơ thường':'✓ Đang dùng chiến cơ thường'}</button></div>`;
  body.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{pick=+b.dataset.k;re();});
  body.querySelectorAll('[data-cr]').forEach(b=>b.onclick=()=>openCraft(+b.dataset.cr));
  body.querySelector('#ht-x').onclick=()=>{const res=o?Fusion.select(o.key):Fusion.mergeSSS(...pair);try{toast(res?'✦ SSS SẴN SÀNG · '+m.name:'CHƯA ĐỦ ĐIỀU KIỆN');}catch{}try{SSSLab.paint();}catch{}re();};
  body.querySelector('#ht-n').onclick=()=>{Fusion.select(null);re();};
  try{Meta407.bindSSS(body.querySelector('.ht-meta'),i,re);}catch{}
  try{body.scrollTop=0;}catch{}
 }
 return {on:()=>window.HT197!==false,view};
})();
// ---- số gọn ở thanh tài nguyên ----
(()=>{const fmt=n=>n>=1e9?(n/1e9).toFixed(1).replace('.',',')+'B':n>=1e6?(n/1e6).toFixed(1).replace('.',',')+'M':n>=1e5?Math.round(n/1e3)+'K':null;
 function fix(el){if(window.NUM197===false||!el)return;const t=el.textContent.trim();if(!/^[\d.\s]+$/.test(t))return;const n=+t.replace(/[.\s]/g,'');if(!isFinite(n))return;const s=fmt(n);if(s&&s!==t){el.title=t;el.textContent=s;}}
 function hook(){for(const el of [...['lb-credits','lb-exp','lb-gems'].map(id=>document.getElementById(id)),...document.querySelectorAll('#hub40 .hb-top b,#hub40 .hb-top span,#hb-res i,.arsenal-link span,.arsenal-heading .wallet span,.ht-meta .m7-row b')]){if(!el||el.__n197)continue;el.__n197=1;fix(el);new MutationObserver(()=>fix(el)).observe(el,{childList:true,characterData:true,subtree:true});}}
 setTimeout(hook,1500);setInterval(hook,1000);})();
