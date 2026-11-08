// V79 · THÀNH TỰU theo Gemini REVIEW79 (ACH79)
//  • 9 dòng cũ: thưởng ◈ 2.000 / 5.000 / 12.000 / 30.000 · ⬢ 40 / 100 / 250 / 600 · bậc 3 +1 phôi Lam ngẫu nhiên · bậc 4 +1 phôi Tím ngẫu nhiên
//  • 3 dòng mới: Chinh Phục Tinh Tú (số ải 3★) · Thợ Rèn Tối Thượng (số món Tím +5) · Thợ Săn Nguyên Liệu (thắng/quét ải boss ÷5)
//  • Phôi "tự chọn" của Gemini: tặng cho chiến cơ đang dùng (chưa có bảng chọn).
//  • Bù phôi đã bỏ ở ải thường: phó bản trang bị chắc chắn 1 phôi Trắng/Lục/Lam (cấp 3–4 có thể 2, không Tím) · Vô tận: chỉ rương (Trắng/Lục/Lam)
//  Tắt: window.ACH79=false
const Ach79=(()=>{
 const KEY='saobang-ach79';let S={boss:0,pity:0,ew:{}};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const on=()=>window.ACH79!==false;
 const STD={credits:[2000,5000,12000,30000],stones:[40,100,250,600]};
 const NEW={
  star3:{credits:[3000,8000,18000,40000],stones:[50,120,300,700],ph:[null,['lam',1,'rand'],['tim',1,'main'],['tim',2,'main']]},
  tim5:{credits:[5000,12000,25000,50000],stones:[80,180,400,900],ph:[['tim',1,'main'],['tim',1,'main'],['tim',1,'main'],['tim',2,'main']]},
  bossrun:{credits:[2000,5000,12000,25000],stones:[40,100,250,500],mat:[0,2,3,3]}};
 function star3(){try{const o=Campaign36.getState().stars||{};let n=0;for(const k in o)if((o[k]|0)>=3)n++;return n;}catch{return 0;}}
 function tim5(){let n=0;try{for(let i=0;i<13;i++)if(V70.craftN(i)>=11)n++;}catch{}try{for(const it of Progress.getState().items||[])if((V70.nOf(it)|0)>=11)n++;}catch{}return n;}
 const bossRuns=()=>S.boss|0;
 const ROWS=[['star3','Chinh phục tinh tú',[15,45,90,130],star3,'Đạt 3★ tại {n} ải chiến dịch'],
  ['tim5','Thợ rèn tối thượng',[1,2,4,8],tim5,'Nâng {n} chiến cơ / trang bị lên Tím +5'],
  ['bossrun','Thợ săn nguyên liệu',[10,30,75,150],bossRuns,'Thắng hoặc càn quét ải boss {n} lượt']];
 function reward(id,t){if(!on())return null;const R=NEW[id]||STD;return {credits:R.credits[t]|0,stones:R.stones[t]|0};}
 function mainShip(){try{return Campaign36.ownsCraft(selected)?selected:0;}catch{return 0;}}
 function bonus(id,t){if(!on())return '';const out=[];try{
   if(NEW[id]){const R=NEW[id];const p=R.ph&&R.ph[t];if(p){const [col,k,who]=p;for(let i=0;i<k;i++){if(who==='main'){V70.phAdd('craft',mainShip(),col==='tim'?3:2,1);out.push('phôi '+(col==='tim'?'Tím':'Lam')+' chiến cơ chính');}else{const r=V70.dropPhoi({p:1,w:[0,0,1,0]},col);if(r)out.push(r.replace(/^\+1 /,''));}}}
    const m=R.mat&&R.mat[t];if(m){for(const ty of MAT69.types)V70.add(ty.id+m,1);out.push('1 bộ nguyên liệu '+(m===3?'Tím':'Lam'));}}
   else if(t>=2){const col=t>=3?'tim':'lam';const r=V70.dropPhoi({p:1,w:[0,0,1,0]},col);if(r)out.push(r.replace(/^\+1 /,''));}}catch{}
  if(out.length)setTimeout(()=>{try{toast('🎁 THƯỞNG THÊM · '+out.join(' · '));}catch{}},900);return out.join(' · ');}
 // đếm lượt thắng / càn quét ải boss (÷5) — qua lượt chia nguyên liệu chiến dịch
 function install(){
  try{const rs=Workshop.rollStage;Workshop.rollStage=function(stage){const r=rs.apply(this,arguments);try{if(on()&&(stage|0)%5===0&&(stage|0)<=160&&gameMode==='campaign'&&!(typeof Dungeons!=='undefined'&&Dungeons.active())&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active())){S.boss=(S.boss|0)+1;save();}}catch{}return r;};}catch{}
  // V79B (Gemini): lần đầu thắng ải 5 tặng đủ bộ nguyên liệu Lục còn lại (ải 5 đã rơi Lõi Hợp Kim) → người mới bấm thử nâng khung Lục ngay
  try{const rs=Progress.rewardStage;Progress.rewardStage=function(stage){let first=false;try{first=(stage|0)===5&&!(Progress.getState().cleared||[]).includes(5);}catch{}const r=rs.apply(this,arguments);
    try{if(on()&&first&&r&&!S.st5){S.st5=1;save();for(const t of MAT69.types)if(t.id!=='alloy')V70.add(t.id+'1',1);setTimeout(()=>{try{toast('🎁 QUÀ TÂN THỦ · đủ bộ nguyên liệu Lục — vào Trang bị › Nâng khung thử ngay');}catch{}},1800);}}catch{}return r;};}catch{}
  // phó bản trang bị (chủ dự án 24/10): KHÔNG ra phôi Tím · 35% ra 1 phôi Trắng / Lục / Lam, độ khó càng cao càng dễ ra Lam (Lam 8→25%)
  //  (trang bị / chiến cơ bậc S rơi ra mặc định ở khung Lam — giữ nguyên luật đồng bộ V70)
  // V79B (chủ dự án chọn theo Gemini): phó bản trang bị CHẮC CHẮN ra phôi · cấp 3: 30% thêm phôi thứ 2 · cấp 4: 60% · không có Tím
  try{const lo=Campaign36.loot;Campaign36.loot=function(source,depth){const r=lo.apply(this,arguments);try{if(on()&&source==='equipment'){const d=Math.max(0,Math.min(3,(depth|0)-1));
     const W=((window.Evo82&&Evo82.on())?EVO82.drop.equipment:[[60,32,8],[48,38,14],[35,45,20],[20,50,30]])[d],n=1+(Math.random()<[0,0,.3,.6][d]?1:0),got=[];
     for(let k=0;k<n;k++){const x=V70.dropPhoi({p:1,w:[W[0],W[1],W[2],0]},null);if(x)got.push(x);}
     if(got.length)setTimeout(()=>{try{toast('PHÓ BẢN TRANG BỊ · '+got.join(' · '));}catch{}},1200);}}catch{}return r;};}catch{}
  // Vô tận (chủ dự án 24/10): không ra phôi Tím, không thêm thưởng phôi theo đợt — phôi chỉ từ rương Vô tận (Trắng/Lục/Lam, đã hạ tỉ lệ ở chest74.js)
 }
 setTimeout(install,90);
 return {ROWS,reward,bonus,state:()=>({...S,star3:star3(),tim5:tim5()})};
})();
window.Ach79=Ach79;
