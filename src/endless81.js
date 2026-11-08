// V81 (chủ dự án 25/10) · LUẬT RƠI VÔ TẬN MỚI
//  • Không rơi đá nâng cấp, nguyên liệu nâng cấp (chặn Workshop.rollStage + đá/nguyên liệu trong trận Vô tận).
//  • Mảnh phi công: ngẫu nhiên mọi phi công, mọi cấp bậc, tối đa 5 mảnh/ngày (25% mỗi đợt qua).
//  • Chiến cơ / trang bị: qua rương (Chest81 trong chest74.js) + rơi S/SS ở đợt boss, chung trần 30 món/ngày.
//  Tắt: window.ENDLESS81=false
const Endless81=(()=>{
 const on=()=>window.ENDLESS81!==false;
 const inRun=()=>{try{return on()&&gameMode==='endless'&&(mode==='play'||mode==='pause'||mode==='over');}catch{return false;}};
 function givePilot(){try{if(!(window.EL81&&EL81.ppLeft()>0))return;const P=PILOTS67||[];if(!P.length)return;const p=P[Math.floor(Math.random()*P.length)];
  Pilot67._piece(p.id,1);EL81.ppUse();toast('🧑‍✈️ +1 MẢNH PHI CÔNG · '+p.name.toUpperCase()+' ('+(5-EL81.ppLeft())+'/5 hôm nay)');}catch{}}
 function install(){
  try{if(!Workshop.rollStage.__e81){const rs=Workshop.rollStage;const f=function(){if(inRun())return [];return rs.apply(this,arguments);};f.__e81=1;Workshop.rollStage=f;}}catch{}
  try{if(!Workshop.grant.__e81){const g=Workshop.grant;const f=function(r){if(inRun()&&r&&typeof r==='object'&&(r.exp||r.aux)){r=Object.assign({},r);delete r.exp;delete r.aux;}return g.call(this,r);};f.__e81=1;Workshop.grant=f;}}catch{}
  try{if(Workshop.exp70&&!Workshop.exp70.__e81){const g=Workshop.exp70;const f=function(){if(inRun())return false;return g.apply(this,arguments);};f.__e81=1;Workshop.exp70=f;}}catch{}
  try{if(!V70.add.__e81){const g=V70.add;const f=function(id){if(inRun()&&typeof id==='string'&&/^[a-z]+[0-9]$|_[0-9]$|sss/i.test(id))return false;return g.apply(this,arguments);};f.__e81=1;V70.add=f;}}catch{}
  try{if(!Campaign36.loot.__e81){const g=Campaign36.loot;const f=function(src){if(on()&&src==='endless'){if(!(window.EL81&&EL81.left()>0))return null;const r=g.apply(this,arguments);if(r)EL81.use();return r;}return g.apply(this,arguments);};f.__e81=1;Campaign36.loot=f;}}catch{}
  try{if(!Progress.rewardEndless.__e81){const g=Progress.rewardEndless;const f=function(){const r=g.apply(this,arguments);try{if(on()&&Math.random()<.25)givePilot();}catch{}return r;};f.__e81=1;Progress.rewardEndless=f;}}catch{}}
 setTimeout(install,400);setTimeout(install,2000);
 return {state:()=>({on:on(),day:window.EL81?EL81.state():null}),givePilot};
})();
window.Endless81=Endless81;
