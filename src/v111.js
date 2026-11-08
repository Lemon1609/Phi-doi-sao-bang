// V111 · tàu không chui xuống dưới các nút góc (Tên lửa, Bom, Kỹ năng, ảnh phi công): khi vào vùng nút thì bị đẩy lên trên nút,
//  để ngón tay luôn kéo được tàu ra. Vẫn bay sát mép trái/phải/dưới ở những chỗ không có nút.
(()=>{
  const SEL='#missile-action,#bomb,#robot-skill,.st80p';let Z=[],zt=0;
  function zones(){const now=performance.now();if(now-zt<500)return Z;zt=now;Z=[];try{const c=document.getElementById('game');if(!c)return Z;const R=c.getBoundingClientRect();if(!R.width)return Z;const sx=W/R.width,sy=H/R.height;
    const seen=new Set();for(const e of document.querySelectorAll(SEL+',button,[role=button]')){const r=e.getBoundingClientRect();if(r.width<20||r.height<20||r.width>140||r.height>140)continue;if(r.top<R.top+R.height*.7||r.bottom>R.bottom+40)continue;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||cs.pointerEvents==='none'||+cs.opacity<.05||e.closest('[hidden]'))continue;const k=Math.round(r.left)+'|'+Math.round(r.top);if(seen.has(k))continue;seen.add(k);
     Z.push({l:(r.left-R.left)*sx,r:(r.right-R.left)*sx,t:(r.top-R.top)*sy,b:(r.bottom-R.top)*sy});}}catch{}return Z;}
  const PAD=30;
  function fix(o){if(!o)return;for(const z of zones()){if(o.x>z.l-PAD&&o.x<z.r+PAD&&o.y>z.t-PAD){o.y=Math.min(o.y,z.t-PAD);}}}
  function install(){try{const ou=update;const nu=function(dt){const r=ou.apply(this,arguments);try{if(window.BTN111!==false&&mode==='play'){fix(player);fix(pointerTarget);}}catch{}return r;};window.update=nu;try{update=nu;}catch{}}catch(e){console.warn('V111',e);}}
  setTimeout(install,0);
  window.V111={zones:()=>{zt=0;return zones();}};
})();
