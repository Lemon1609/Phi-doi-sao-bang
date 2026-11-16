'use strict';
// V307 · Nút VÔ TẬN ở sảnh chỉ còn chữ "VÔ TẬN"; kỷ lục / đợt / rương hôm nay chuyển sang màn kết quả khi kết thúc Vô tận. Tắt: window.VT307=false
(()=>{try{
 if(window.VT307===false)return;
 const st=document.createElement('style');st.textContent='html body #lb68#lb68 .cta.e small,html body #lb68#lb68 .cta.e .ch78,html body #lb68#lb68 .cta.e .ch78,html body #lb68#lb68 .cta.e>:not(b){display:none!important}'+
 '#rs .vt307{margin:8px auto 4px;max-width:290px;display:grid;grid-template-columns:1fr 1fr;gap:6px;font-family:inherit}#rs .vt307 div{padding:6px 8px;border-radius:8px;background:linear-gradient(180deg,rgba(10,26,60,.9),rgba(4,12,32,.9));border:1.5px solid rgba(80,170,255,.6);text-align:center;line-height:1.15}#rs .vt307 div:last-child{grid-column:1/3}#rs .vt307 small{display:block;font-size:9px;letter-spacing:.06em;color:#9fd2ff;font-weight:700}#rs .vt307 b{display:block;font-size:16px;color:#ffd56a;font-weight:800;text-shadow:0 1px 2px #000}';
 document.head.appendChild(st);
 const fmt=n=>(n|0).toLocaleString('vi-VN');
 function show(wave,sc){
  const rs=document.getElementById('rs');if(!rs)return;let best=0,ch=null;
  try{best=Campaign36.getState().endlessBest|0;}catch{}try{ch=UI78.count();}catch{}
  let el=rs.querySelector('.vt307');if(!el){el=document.createElement('div');el.className='vt307';
   const a=rs.querySelector('.rw306');if(a&&a.parentNode)a.parentNode.insertBefore(el,a.nextSibling);else rs.appendChild(el);}
  el.innerHTML='<div><small>ĐỢT NÀY</small><b>'+(wave|0)+'</b></div><div><small>KỶ LỤC ĐỢT</small><b>'+Math.max(best,wave|0)+'</b></div>'+(ch==null?'':'<div><small>RƯƠNG HÔM NAY</small><b>📦 '+ch+'/30</b></div>');
 }
 let hk=false;function hook(){if(hk||typeof end!=='function')return;hk=true;const o=end;
  end=function(){let gm='',w=0,sc=0;try{gm=gameMode;w=endlessWave|0;sc=score|0;}catch{}const r=o.apply(this,arguments);
   try{if(gm==='endless'){setTimeout(()=>show(w,sc),500);setTimeout(()=>show(w,sc),1500);}}catch{}return r;};}
 setTimeout(hook,0);setTimeout(hook,3000);
}catch(e){console.warn('VT307',e);}})();
