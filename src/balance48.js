'use strict';
// V48 · Cân đối phần thưởng với độ khó V47 (ải 4–6 biên đội, qua ải làm lại từ W1).
//  1) Quà theo đợt: dọn sạch 1 biên đội (chưa phải đợt cuối) → rơi chắc chắn 1 món hỗ trợ đúng thứ đang thiếu.
//  2) Tiếp tế trước boss: hết biên đội ở ải có boss → rơi máu (nếu thiếu) + 1 bom; trong trận boss cứ mất 25% máu boss → 1 món.
//  3) Vật liệu theo độ dài ải: ải chiến dịch k biên đội → vật liệu ×round(k/2) (thu nhập/phút giữ như trước V47).
//  4) Van an toàn: thua cùng một ải 2 lần liên tiếp → lần sau xuất phát W2 + 1 bom; 4 lần → W3 + 2 bom. Qua ải → xóa.
//     V64: chỉ đếm lần thua khi trụ ≥ 20 s hoặc qua đợt 1; không áp cho Thử thách ngày; lượt có hỗ trợ tối đa 2★ (Play63).
//     Lưu ở key mới 'saobang-assist-v48' → save cũ không đổi.
const Balance48=(()=>{
 const KEY='saobang-assist-v48';
 let A=load();function load(){try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&typeof o==='object')return {stage:o.stage|0,fails:o.fails|0};}catch{}return {stage:0,fails:0};}
 function save(){try{localStorage.setItem(KEY,JSON.stringify(A));}catch{}}
 const campaign=()=>gameMode==='campaign'&&!Dungeons.active();
 function drop(type,x,y){Safety31.push(drops,100,{x,y,type,t:0,vx:(Math.random()-.5)*30,vy:-70,ph:Math.random()*6.28,v40:true,gift48:true});}
 function need(){if(hp<maxHp*.75)return 'heal';if(power<5)return 'power';if(window.SHIELD78!==false?!(bulletShieldTime>0):shield<maxShield-.01)return 'shield';if(bombs<3)return 'bomb';return hp<maxHp-.01?'heal':'power';}
 const stats={waveGifts:0,bossGifts:0};
 // 1) + 2) bọc Waves30.update: phát hiện lúc chuyển biên đội
 const ou=Waves30.update;Waves30.update=function(dt){const w=endlessWave;const r=ou.apply(this,arguments);
  try{if(mode==='play'&&gameMode!=='endless'&&endlessWave>w){const total=Waves30.total();
   if(endlessWave<total){drop(need(),240,150);stats.waveGifts++;}
   else if(Dungeons.active()||Campaign36.bossKind(level)){if(hp<maxHp-.01)drop('heal',210,150);drop('bomb',270,150);stats.bossGifts++;toast('TIẾP TẾ TRƯỚC BOSS');}}}catch(e){}
  return r;};
 // 2b) tiếp tế giữa trận boss: mỗi khi boss mất thêm 25% máu → 1 món đúng thứ đang thiếu
 let bossRef=null,bossStep=0;setInterval(()=>{try{if(mode!=='play'||!boss||boss.dead||!(boss.max>0)){if(!boss)bossRef=null;return;}if(boss!==bossRef){bossRef=boss;bossStep=0;}
  const lost=1-boss.hp/boss.max;while(bossStep<3&&lost>=(bossStep+1)*.25){bossStep++;drop(need(),Math.max(60,Math.min(420,boss.x)),Math.min(320,boss.y+60));stats.bossGifts++;}}catch{}},250);
 // 3) vật liệu theo độ dài ải
 const orl=Workshop.rollStage;Workshop.rollStage=function(stage,craft,random){let k=1;try{if(campaign())k=Math.max(1,Math.round(Waves30.total()/2));}catch{}
  const lists=[];for(let i=0;i<k;i++)lists.push(orl.call(this,stage,craft,random));if(k===1)return lists[0];
  return lists[0].map((s,j)=>{const n=lists.reduce((a,l)=>a+(parseInt(l[j],10)||0),0);return String(s).replace(/^\d+/,String(n));});};
 // 4) van an toàn
 let counted=false,lastLevel=0,lastT=0,lastW=0,assistedLv=0;
 const dailyNow=()=>{try{return typeof Play63!=='undefined'&&Play63.Daily.recent();}catch{return false;}};
 setInterval(()=>{try{if(!campaign()){counted=false;return;}
  if(mode==='play'){counted=false;lastLevel=level;try{lastT=stageTime;lastW=endlessWave;}catch{}}
  // V64 (Gemini): chỉ tính 1 lần thua khi đã trụ ≥ 20 s hoặc qua hết đợt 1; thử thách ngày không tính
  if(mode==='over'&&!counted){counted=true;if(!dailyNow()&&(lastT>=20||lastW>=1)){if(A.stage===level)A.fails++;else{A.stage=level;A.fails=1;}save();}}
  if(mode==='reward'&&A.stage&&A.stage===level){A={stage:0,fails:0};save();}}catch{}},400);
 const assistLevel=()=>A.fails>=4?2:A.fails>=2?1:0;
 const orst=window.reset;if(typeof reset==='function'){reset=function(){const r=orst.apply(this,arguments);
  try{assistedLv=0;if(mode==='play'&&campaign()&&!dailyNow()&&A.stage===level){const a=assistLevel();if(a>0){assistedLv=level;power=Math.min(5,1+a);powerUpgrades=power-1;bombs=Math.min(5,bombs+a);toast('HỖ TRỢ VƯỢT ẢI · KHỞI ĐẦU W'+power+' · +'+a+' BOM');}}}catch{}
  return r;};}
 return {assisted:()=>assistedLv,state:()=>({...A,assist:assistLevel(),assistedLv,...stats}),clear:()=>{A={stage:0,fails:0};save();}};
})();
