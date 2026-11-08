// V86 · GHÉP REVIEW85 CỦA GEMINI (cân bằng theo số đo thật V85)
//  G1 SHIP_BAL85: nhân sát thương đạn chính theo chiến cơ (gắn 1 lần lên mỗi viên đạn mới có art28, không phải đạn trang bị). #2: tia rộng ×1,2.
//  G2 GEAR_BAL85: nhân sát thương trang bị theo bộ (lên boss: trong damageBoss · lên quái: phần chênh cộng thêm tại Feedback31.damage).
//  G7 WING_BOSS_UX85: còn 2 cánh lõi nhận 25%, còn 1 cánh 55% (trước đây 0%); phá xong cánh thứ 2 → lõi +15% trong 5 s.
//     Vẽ dây năng lượng cánh → lõi, nhãn "▼ PHÁ CÁNH", chữ nổi "KHIÊN CÁNH −75% ST", nhắc giữa màn khi bắn lõi > 2 s.
//  G8 Nứt Giáp (Quang Thương lance36 — REVIEW81 đặt hiệu ứng này cho món trang bị lance36; game không có phi công tên Lance):
//     trúng cùng mục tiêu 12 lần hoặc vừa bật Bạo Tẩu → mục tiêu nhận +18% sát thương trong 6 s; lõi boss còn cánh nhận thêm +10%.
//  Cài TRƯỚC event83 để lớp đo sát thương boss cuối tuần (bọc ngoài) đếm đúng sát thương sau cân bằng. Tắt: window.BAL86=false
const BAL86={
 // Hệ số Gemini, đã hiệu chỉnh lại theo số đo thật để đạt đúng mục tiêu ST/s của Gemini: #6 2,05→2,48 · #7 2,55→3,25 · #12 1,05→0,98 · #13 1,30→1,39
 ship:{1:.85,2:1.6,3:1.25,4:1.05,5:1.2,6:2.48,7:3.25,8:1.32,9:1,10:1,11:1.2,12:.98,13:1.39},   // id chiến cơ 1–13 (art28 = id−1)
 ship2Width:1.2,
 // Đúng bảng Gemini. Đo trang bị trong 8 s dao động ±35% (kỹ năng theo nhịp) nên không hiệu chỉnh thêm. Bộ 9: tiêm kích gần như không đánh boss
 //  (lỗi hành vi, hệ số không cứu được) → báo Gemini.
 gear:[1,1.45,2.44,2.15,1.65,1.9,1,1.47,1.2,1,1.31,3.77,1.15],   // V87 H3: bộ 2/7/10/11 dưới dải chấp nhận (trung bình 3 lần) → kéo lên giữa dải;   // V87: bộ 9 về 1,0 (REVIEW86 H1 sửa cách chọn mục tiêu)                                  // theo bộ 0–12
 wing:{two:.25,one:.55,bonus:1.15,bonusSec:5,crackBypass:.10},
 crack:{hits:12,sec:6,mult:1.18,item:'lance36'}};
const Bal86=(()=>{
 const on=()=>window.BAL86!==false;
 const C=BAL86;const T=()=>{try{return time;}catch{return performance.now()/1000;}};
 // ---------- bộ của từng mẫu trang bị ----------
 let setOf=null;function sets(){if(setOf)return setOf;setOf={};try{Campaign36.sets.forEach((s,i)=>{for(const m of s)setOf[m]=i;});}catch{}return setOf;}
 function eqModels(){const out={};try{const eq=Progress.v70.equipped();for(const [k,id] of Object.entries(eq)){const it=Progress.v70.get(id);if(it)out[k]=it.variant;}}catch{}return out;}
 let eqCache={t:-1,v:{}};const eqm=()=>{const n=performance.now();if(n-eqCache.t>1000){eqCache={t:n,v:eqModels()};}return eqCache.v;};
 const multOfModel=m=>{const s=sets()[m];return s==null?1:(C.gear[s]||1);};
 function gearMult(src){if(src&&typeof src==='object'&&src.gearModel)return multOfModel(src.gearModel);const L=Object.entries(eqm()).filter(([k])=>k!=='armor'||true).map(([,m])=>multOfModel(m));return L.length?L.reduce((a,b)=>a+b,0)/L.length:1;}
 const isGear=s=>s==='gear'||(s&&typeof s==='object'&&!!s.gearKind&&s.gearKind!=='auxiliary85');
 // tia (ray28) và đạn không nằm trong mảng shots lúc gắn hệ số → nhân tại điểm gây sát thương
 const rayMult=s=>(s&&typeof s==='object'&&!s.gearKind&&s.art28!=null&&!s.__s85)?(C.ship[(s.art28|0)+1]||1):1;
 const lanceOn=()=>Object.values(eqm()).includes(C.crack.item);
 const cracked=e=>!!(e&&e.__crk85&&e.__crk85>T());
 // ---------- cánh boss ----------
 let FORCE=false;const obw=window.bossHasWings,oob=window.openBossCore;
 const wingsAlive=b=>{try{return (b.parts||[]).filter(p=>!p.dead&&p.hp>0).length;}catch{return 0;}};
 const UX={coreHitAt:0,coreHitT:0,txtAt:0,warnAt:-99,pops:[]};
 function install(){if(!on())return;
  try{if(typeof obw==='function'){window.bossHasWings=function(b){if(FORCE)return false;return obw(b);};try{bossHasWings=window.bossHasWings;}catch{}}}catch{}
  try{if(typeof oob==='function'){window.openBossCore=function(b){if(FORCE)return;return oob(b);};try{openBossCore=window.openBossCore;}catch{}}}catch{}
  // damageBoss lớp trong
  try{const o=window.damageBoss;const f=function(amount,source,part){const b=boss;if(!on()||!b||!b.bossHealthReady||b.defeatStarted||!(amount>0))return o.apply(this,arguments);
    let a=amount;try{if(isGear(source))a*=gearMult(source);else a*=rayMult(source);}catch{}
    const crk=cracked(b);if(crk)a*=C.crack.mult;
    const nw=wingsAlive(b);if(!b.__hw85&&nw>0)b.__hw85=1;if(b.__hw85&&nw===0&&!b.__wb85)b.__wb85=T();
    if(nw===0&&b.__wb85&&T()-b.__wb85<C.wing.bonusSec)a*=C.wing.bonus;
    const area=source==='bomb'||source==='bastion'||source==='pair';
    if(!area&&!(part&&part!==b&&part.bossPart)&&nw>0){// bắn vào lõi khi còn cánh
     let r=nw>=2?C.wing.two:C.wing.one;if(crk)r+=C.wing.crackBypass;UX.coreHitAt=T();
     const cap=Math.max(0,(b.coreHp||0)-1),x=Math.min(a*r,cap);if(!(x>0)){b.coreShieldFlashUntil=T()+.12;return 0;}
     FORCE=true;let res=0;try{res=o.call(this,x,source,b);}finally{FORCE=false;}try{b.coreShieldFlashUntil=T()+.12;}catch{}
     if(T()-UX.txtAt>1.2){UX.txtAt=T();UX.pops.push({x:b.x,y:b.y+10,t:0,s:'KHIÊN CÁNH −'+Math.round((1-r)*100)+'% ST',c:'#9fb7c9'});}
     return res;}
    return o.call(this,a,source,part);};
   window.damageBoss=f;try{damageBoss=f;}catch{}}catch{}
  // quái thường: cộng phần chênh của trang bị + nứt giáp
  try{const od=Feedback31.damage;Feedback31.damage=function(e,amount,src){const r=od.apply(this,arguments);try{if(on()&&e&&!e.dead&&e!==boss&&!e.bossPart&&amount>0&&!(src&&src.__x85)){let k=1;if(src&&typeof src==='object'&&src.gearKind)k*=gearMult(src);else k*=rayMult(src);if(cracked(e))k*=C.crack.mult;
     if(k>1.0001){const x=amount*(k-1);e.hp-=x;if(e.hp<=0)kill(e);}}}catch{}return r;};}catch{}
  // nứt giáp: đếm trúng
  try{const oh=Arsenal30.hit;Arsenal30.hit=function(s,e){const r=oh.apply(this,arguments);try{if(on()&&e&&lanceOn()){e.__lh85=(e.__lh85|0)+1;if(e.__lh85>=C.crack.hits){e.__lh85=0;crack(e);}}}catch{}return r;};}catch{}
  // vòng cập nhật: gắn hệ số chiến cơ cho đạn mới + Bạo Tẩu kích nứt giáp + nhắc phá cánh
  function w134(){if(window.WING87===true||window.W134!==true)return 1;/* V154: chủ dự án bỏ hẳn đồng đội bay kèm → bỏ luôn phần bù +30%. Bật lại phần bù: window.W134=true */const t=performance.now();if(!w134.t||t-w134.t>2000){w134.t=t;try{w134.v=Progress.getState().cleared.length>=40?1.3:1;}catch{w134.v=1;}}return w134.v;}/* V134: bù 30% sát thương đồng đội đã bỏ (mở từ ải 40) */
  try{const ou=window.update;let sup0=false;const f=function(dt){const r=ou.apply(this,arguments);if(!on())return r;
    try{const k87=(window.SSS87&&SSS87.mult)?SSS87.mult():1,k134=w134();for(const s of shots){if(s.__s85||s.dead)continue;s.__s85=1;if(k87!==1&&s.damage>0&&!s.wing87)s.damage*=k87;if(s.gearKind||s.art28==null)continue;const id=(s.art28|0)+1,m=(C.ship[id]||1)*(window.SS90M?SS90M.mult(id):1)*k134;if(m!==1&&s.damage>0)s.damage*=m;if(id===2&&s.r)s.r*=C.ship2Width;}}catch{}
    try{const su=superTime>0;if(su&&!sup0&&lanceOn()){const tg=boss&&!boss.dead?boss:null;if(tg)crack(tg);}sup0=su;}catch{}
    try{const b=boss;if(b&&!b.dead&&wingsAlive(b)>0&&T()-UX.coreHitAt<.3){UX.coreHitT+=dt;if(UX.coreHitT>2&&T()-UX.warnAt>8){UX.warnAt=T();toast('⚠ HÃY PHÁ 2 CÁNH ĐỂ MỞ KHIÊN LÕI!');}}else if(T()-UX.coreHitAt>1)UX.coreHitT=0;}catch{}
    for(const p of UX.pops)p.t+=dt;UX.pops=UX.pops.filter(p=>p.t<1);return r;};window.update=f;try{update=f;}catch{}}catch{}
  try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{if(on())draw();}catch{}return r;};}catch{}}
 function crack(e){e.__crk85=T()+C.crack.sec;UX.pops.push({x:e.x,y:e.y-20,t:0,s:'NỨT GIÁP +18%',c:'#FF5722'});}
 function draw(){let m='';try{m=mode;}catch{}if(m!=='play'&&m!=='pause')return;const b=boss;const t=T();ctx.save();
  if(b&&!b.dead&&b.bossHealthReady){const ws=(b.parts||[]).filter(p=>!p.dead&&p.hp>0);
   if(ws.length){ctx.setLineDash([7,6]);ctx.lineDashOffset=-t*40;ctx.strokeStyle='#00E5FF';ctx.lineWidth=2.5;ctx.globalAlpha=.65;for(const p of ws){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(b.x,b.y);ctx.stroke();}ctx.setLineDash([]);
    ctx.globalAlpha=.55;ctx.beginPath();for(let i=0;i<=6;i++){const q=i*Math.PI/3+t*.6;const x=b.x+Math.cos(q)*26,y=b.y+Math.sin(q)*26;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();
    // nhãn phá cánh: đầu trận boss (6 s) hoặc khi đang bắn lõi
    if(!b.__lab85)b.__lab85=t;if(window.MSG88===false&&(t-b.__lab85<6||t-UX.coreHitAt<.6)){ctx.globalAlpha=.6+.4*Math.abs(Math.sin(t*6));ctx.fillStyle='#FFB020';ctx.font="900 12px system-ui,sans-serif";ctx.textAlign='center';for(const p of ws)ctx.fillText('▼ PHÁ CÁNH',p.x,p.y-34);}}
   if(cracked(b)){ctx.globalAlpha=.8;ctx.strokeStyle='#FF5722';ctx.lineWidth=2;ctx.beginPath();ctx.arc(b.x,b.y,40+3*Math.sin(t*8),0,Math.PI*2);ctx.stroke();}}
  if(window.MSG88===false){ctx.textAlign='center';ctx.font="800 11px system-ui,sans-serif";}if(window.MSG88===false)for(const p of UX.pops){ctx.globalAlpha=1-p.t;ctx.fillStyle=p.c;ctx.fillText(p.s,p.x,p.y-p.t*26);}
  ctx.restore();}
 install();
 return {on,gearMult,state:()=>({eq:eqm(),lance:lanceOn(),bossCrack:cracked(boss),wings:boss?wingsAlive(boss):-1,wb:boss&&boss.__wb85}),C};
})();
window.Bal86=Bal86;
