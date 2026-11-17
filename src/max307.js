'use strict';
// V307 · Chiến cơ / trang bị đã Tím+5 thì KHÔNG RƠI bản sao của mẫu đó nữa (chủ dự án chốt 17/11/2026).
//  • Mọi nguồn bản sao đi qua Evo82.addCopy → nếu mẫu đã Tím+5: đổi sang mẫu khác cùng loại chưa tối đa
//    (ưu tiên chiến cơ đã sở hữu / trang bị cùng ô); nếu mọi mẫu đều tối đa → đổi ra Đá XP theo bảng Gemini lượt 3
//    (Trắng 60 · Lục 150 · Lam 300 · Tím 750 XP; Đá XP Nhỏ tạm = đá nâng cấp cũ, 15 XP/viên).
//  • Tắt: window.MAX307=false.
(function(){
 const XP={0:60,1:150,2:300,6:750},xpOf=t=>t>=6?750:t>=2?300:t>=1?150:60;
 const nC=i=>{try{return V70.craftN(i|0);}catch{return 0;}};
 function gearMax(m){try{return Progress.v70.items().some(i=>i.variant===m&&V70.nOf(i)>=11);}catch{return false;}}
 const isMax=(k,m)=>k==='craft'?nC(m)>=11:gearMax(m);
 function alt(k,m){
  if(k==='craft'){const all=Array.from({length:13},(_,i)=>i).filter(i=>!isMax('craft',i));
   const own=all.filter(i=>{try{return Campaign36.ownsCraft(i);}catch{return false;}});const p=own.length?own:all;return p.length?p[Math.floor(Math.random()*p.length)]:null;}
  let kind=null;try{kind=GearCatalog[m].kind;}catch{}
  const all=Object.keys(GearCatalog).filter(v=>!isMax('gear',v));const same=all.filter(v=>GearCatalog[v].kind===kind);const p=same.length?same:all;
  return p.length?p[Math.floor(Math.random()*p.length)]:null;}
 function hook(){if(typeof Evo82==='undefined'||!Evo82.addCopy||Evo82.addCopy.__m307)return false;
  const o=Evo82.addCopy;
  const f=function(k,m,t,lv,quiet){if(window.MAX307===false)return o.apply(this,arguments);
   try{if(isMax(k==='craft'?'craft':'gear',k==='craft'?m|0:m)){const a=alt(k==='craft'?'craft':'gear',m);
     if(a!=null){window.__max307=(window.__max307||0)+1;return o.call(this,k,a,t,lv,quiet);}
     const xp=xpOf(t|0),n=Math.max(1,Math.round(xp/15));try{Workshop.grant({exp:n});}catch{}window.__max307x=(window.__max307x||0)+n;
     if(!quiet)try{toast('Mẫu đã Tím +5 · đổi thành '+n+' Đá XP');}catch{}return null;}}catch{}
   return o.apply(this,arguments);};
  f.__m307=1;Evo82.addCopy=f;
  // fromPh gọi addCopy nội bộ → viết lại để đi qua bộ lọc
  Evo82.fromPh=function(kind,model,col,n){for(let i=0;i<(n|0);i++)Evo82.addCopy(kind==='craft'?'craft':'gear',model,(typeof EVO82!=='undefined'&&EVO82.phTier[col]!=null)?EVO82.phTier[col]:0,1,true);};
  return true;}
 if(!hook()){const t=setInterval(()=>{if(hook())clearInterval(t);},500);setTimeout(()=>clearInterval(t),30000);}
 window.MAX307API={isMax,alt};
})();
