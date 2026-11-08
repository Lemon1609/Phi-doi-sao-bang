// V78.2 · RUNG MÀN HÌNH chỉ khi tàu bị trúng đòn (hoặc tự bấm bom) — bỏ rung do boss nổ, vùng va chạm, vỡ bộ phận, nổ lớn
const Shake78=(()=>{
 let hitAt=-1e9,bombAt=-1e9;const now=()=>performance.now();
 const ok=()=>now()-hitAt<450||now()-bombAt<350;
 function install(){
  if(window.SHAKE78===false)return;
  try{const d0=damage;damage=function(){const iv=typeof invuln==='number'?invuln:0;const r=d0.apply(this,arguments);try{if(invuln>iv+.05)hitAt=now();}catch{}return r;};}catch{}
  try{const b0=bomb;bomb=function(){const n=typeof bombs==='number'?bombs:0;const r=b0.apply(this,arguments);try{if(bombs<n)bombAt=now();}catch{}return r;};}catch{}
  try{const u0=update;update=function(){const r=u0.apply(this,arguments);try{if(!ok()&&shake>0)shake=0;}catch{}return r;};}catch{}
  try{const v0=Audio393.vibrate;Audio393.vibrate=function(){if(typeof mode!=='undefined'&&mode==='play'&&!ok())return;return v0.apply(this,arguments);};}catch{}
 }
 setTimeout(install,60);
 return {state:()=>({sinceHit:Math.round(now()-hitAt)})};
})();
