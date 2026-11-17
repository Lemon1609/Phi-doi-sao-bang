'use strict';
// V307 · 24 MỐC KỸ NĂNG PHI CÔNG (Gemini lượt 3, mục "Chỉnh sửa Hạng & Mốc kỹ năng"; chủ dự án đồng ý 17/11/2026)
//  Mỗi phi công CHÍNH mở 3 mốc theo bậc: Lam (bậc ≥ 2) · Tím (≥ 6) · Tím+5 (11). Chỉ dùng cơ chế game đã có.
//  "1 lớp Khiên Chắn Đạn" = bật khiên chắn đạn sẵn có của game trong SHIELD giây.
//  Tắt: window.PSK307=false (đặt trước khi tải) · bảng số: PSK307CFG.
const PSK307CFG={SHIELD:3,
 lp:{gz:.10,supCd:20,chain:3,win:4,chainCd:15},          // Lâm Phương
 hv:{r:180,ext:.8,extCd:10,dmg:.12},                    // Hạ Vy
 ka:{r:150,cut:3,cutCd:25,drone:.15},                   // Kiều An
 bn:{hp:2,cd:30,mag:1.25,inv:1.5},                      // Bảo Ngọc
 tl:{crit:.08,iv:8,pct:.012,cap:2,low:.25,gear:.12},     // Thiên Lam
 mm:{rad:220,critM:.10,dur:5,tmp:.15,tmpDur:8},          // Mộc Miên
 hs:{crit:.10,every:5,extra:1.0,sup:.20},               // Hàn Sương (Tím: mỗi loạt thứ 5 thêm 2 quả × 50% = +100% sát thương lượt trúng đó)
 td:{gz:.15,sss:3,gear:.12,drone:4}};                   // Tử Dạ
const PSK307=(()=>{
 if(window.PSK307===false||typeof Pilot67==='undefined')return null;
 const C=PSK307CFG;
 const M=()=>{try{return Pilot67.main()||0;}catch{return 0;}};
 const T=id=>{try{return Pilot67.tierOf(id);}catch{return 0;}};
 const at=(id,need)=>M()===id&&T(id)>=need&&typeof mode!=='undefined'&&mode==='play';
 const L=id=>at(id,2),P=id=>at(id,6),P5=id=>at(id,11);
 const now=()=>{try{return time;}catch{return 0;}};
 const cd={};const ready=(k,s)=>{if(now()-(cd[k]??-1e9)<s)return false;cd[k]=now();return true;};
 const log=[];const note=k=>{log.push(k);if(log.length>60)log.shift();};
 const shieldOn=s=>{try{bulletShieldTime=Math.max(bulletShieldTime,s);ring(player.x,player.y,'#a4ecff',50);}catch{}};
 const clearR=r=>{try{const n=bullets.length;bullets=bullets.filter(b=>Math.hypot(b.x-player.x,b.y-player.y)>r);ring(player.x,player.y,'#ffe08a',r*.6);return n-bullets.length;}catch{return 0;}};
 const sssN=()=>{let n=0;try{for(const k of ['missiles','sidearm']){const d=Gear44.activeDef(k);if(d&&d.tier==='sss')n++;}if(activeRobot&&activeRobot.super)n++;}catch{}return n;};
 const isGear=s=>s==='gear'||s==='missiles'||s==='missile'||s==='sidearm'||s==='drone';
 let gzT=[],used5=false,tmp=null,prevSh=null,hs5=0,lastBomb=-9;
 // ---------- Graze ----------
 try{const og=Combat26.graze;Combat26.graze=function(){const r=og.apply(this,arguments);try{if(r){
   if(L(1)){Combat26.addCharge07(5*C.lp.gz);note('lp_l');}
   if(P5(1)){const t=now();gzT=gzT.filter(x=>t-x<C.lp.win);gzT.push(t);if(gzT.length>=C.lp.chain&&ready('lp5',C.lp.chainCd)){gzT=[];shieldOn(C.SHIELD);note('lp_5');}}}}catch{}return r;};}catch{}
 // ---------- Bạo Tẩu ----------
 try{const oa=activateSuper;activateSuper=function(){const r=oa.apply(this,arguments);try{
   if(P(1)&&ready('lp_t',C.lp.supCd)){shieldOn(C.SHIELD);note('lp_t');}
   if(L(2)){clearR(C.hv.r);note('hv_l');}
   if(P5(8)){drone=Math.max(drone,C.td.drone);note('td_5');}}catch{}return r;};}catch{}
 // ---------- hạ địch ----------
 try{const ok=kill;kill=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(was&&e&&e.dead){
   if(P(2)&&superTime>0&&(e.elite||e===boss||e.miniBoss)&&ready('hv_t',C.hv.extCd)){superTime+=C.hv.ext;note('hv_t');}
   if(L(8)&&(superTime>0||now()-lastBomb<.4)){Combat26.addCharge07(1*C.td.gz*4);note('td_l');}}}catch{}return r;};}catch{}
 try{const ob=bomb;bomb=function(){const b0=bombs;const r=ob.apply(this,arguments);try{if(bombs<b0)lastBomb=now();}catch{}return r;};}catch{}
 // ---------- sát thương phe ta ----------
 try{const od=allyDamageScale;allyDamageScale=function(){let m=od.apply(this,arguments);try{if(P5(2)&&superTime>0)m*=1+C.hv.dmg;}catch{}return m;};}catch{}
 try{const odb=damageBoss;damageBoss=function(amount,source,part){try{if(amount>0&&boss){
   if(L(4)&&Math.random()<C.tl.crit){let cm=2;try{cm=CRIT66.mult||2;}catch{}amount*=cm;note('tl_l');}
   if(P5(4)&&isGear(source)&&boss.hp<boss.maxHp*C.tl.low){amount*=1+C.tl.gear;note('tl_5');}}}catch{}return odb.call(this,amount,source,part);};}catch{}
 try{const oh=Arsenal30.hit;Arsenal30.hit=function(s,e){const r=oh.apply(this,arguments);try{if(s&&e&&!e.dead&&(s.gearKind==='missiles'||s.gearKind==='sidearm')){let x=0;
   if(s.gearKind==='missiles'){if(L(7)&&Math.random()<C.hs.crit){let cm=2;try{cm=CRIT66.mult||2;}catch{}x+=s.damage*(cm-1);note('hs_l');}
    if(P(7)){hs5++;if(hs5>=C.hs.every){hs5=0;x+=s.damage*C.hs.extra;note('hs_t');}}}
   if(P(8)&&sssN()>=C.td.sss){x+=s.damage*C.td.gear;note('td_t');}
   if(x>0){if(e===boss||e.bossPart)damageBoss(x,'gear',e);else{e.hp-=x;if(e.hp<=0)kill(e);}}}}catch{}return r;};}catch{}
 // ---------- trúng đòn ----------
 try{const odm=damage;damage=function(){
   try{if(P5(5)&&!used5&&hp<=1&&shield<=0&&invuln<=0&&bulletShieldTime<=0){used5=true;invuln=C.bn.inv;hp=Math.max(hp,1);ring(player.x,player.y,'#ffd166',80);toast('✦ BẤT KHUẤT · miễn 1 đòn chí tử');note('bn_5');return;}}catch{}
   const s0=shield;const r=odm.apply(this,arguments);
   try{if(L(5)&&hp<=C.bn.hp&&hp>0&&ready('bn_l',C.bn.cd)){shieldOn(C.SHIELD);note('bn_l');}
    if(P(3)&&s0>0&&shield<=0&&ready('ka_t',C.ka.cutCd)&&window.__p67regen){window.__p67regen.set(window.__p67regen.get()+C.ka.cut);note('ka_t');}}catch{}return r;};}catch{}
 // ---------- nhặt đồ ----------
 try{const oc=collect;collect=function(d){const full=hp>=maxHp;const r=oc.apply(this,arguments);try{if(d&&d.type!=='star'&&d.type!=='none'){
   if(P(6)){window.__crit307m={v:C.mm.critM,until:now()+C.mm.dur};note('mm_t');}
   if(P5(6)&&full&&d.type==='heal'){const add=Math.max(1,Math.round(maxHp*C.mm.tmp*10)/10);shield+=add;tmp={add,until:now()+C.mm.tmpDur};note('mm_5');}}}catch{}return r;};}catch{}
 // ---------- mỗi khung ----------
 try{const ou=update;update=function(dt){const r=ou.apply(this,arguments);try{if(mode!=='play'){return r;}
   const pull=(R,sp)=>{for(const d of drops){if(d.dead||d.type==='star'||d.type==='none')continue;const D=Math.hypot(d.x-player.x,d.y-player.y);if(D<R&&D>30){const a=Math.atan2(player.y-d.y,player.x-d.x);d.x+=Math.cos(a)*sp*dt;d.y+=Math.sin(a)*sp*dt;}}};
   if(L(6))pull(150+C.mm.rad,300);
   if(P(5)&&hp<=C.bn.hp)pull(150*C.bn.mag,260);
   if(L(3)&&prevSh!=null&&shield>prevSh&&ready('ka_l',1)){clearR(C.ka.r);note('ka_l');}
   prevSh=shield;
   if(tmp&&now()>tmp.until){shield=Math.max(0,Math.min(shield,maxShield));tmp=null;}
   if(P(4)&&boss&&boss.hp>0&&ready('tl_t',C.tl.iv)){let avg=0,n=0;try{for(const s of shots)if(s.main66&&!s.dead){avg+=s.damage;n++;}}catch{}const base=Math.max(1,n?avg:1);
    const x=Math.min(boss.hp*C.tl.pct,base*C.tl.cap);damageBoss(x,'evo',null);note('tl_t');}
  }catch{}return r;};}catch{}
 // ---------- đầu trận ----------
 try{const ors=reset;reset=function(){const r=ors.apply(this,arguments);used5=false;tmp=null;gzT=[];hs5=0;prevSh=null;return r;};}catch{}
 function rate(k){let m=1;try{if(k!=='missiles'&&P5(3)&&shield>0)m/=1+C.ka.drone;if(k==='missiles'&&P5(7)&&superTime>0)m/=1+C.hs.sup;}catch{}return m;}
 // ---------- bảng mốc (cho giao diện) ----------
 const TXT={1:['Graze nạp thêm +10% thanh Bạo Tẩu','Vào Bạo Tẩu: bật Khiên Chắn Đạn (hồi 20 s)','3 lần Graze trong 4 s: bật Khiên Chắn Đạn (hồi 15 s)'],
  2:['Vào Bạo Tẩu: sóng xung kích xóa đạn bán kính 180','Hạ tinh anh/boss khi Bạo Tẩu: +0,8 s Bạo Tẩu (hồi 10 s)','Bạo Tẩu: sát thương +12%'],
  3:['Hồi giáp: xóa đạn quanh tàu bán kính 150','Mất hết giáp: rút ngắn 3 s lần hồi giáp kế (hồi 25 s)','Còn giáp: tàu con bắn nhanh +15%'],
  4:['Đánh boss: +8% chí mạng','Mỗi 8 s: phát xuyên phá 1,2% máu hiện tại của boss (trần 200% công)','Boss dưới 25% máu: tên lửa + tàu con +12% sát thương lên boss'],
  5:['Máu ≤ 2: bật Khiên Chắn Đạn (hồi 30 s)','Máu ≤ 2: hút vật phẩm xa hơn 25%','Bất Khuất: miễn 1 đòn chí tử mỗi trận, bất tử 1,5 s'],
  6:['Hút vật phẩm xa thêm 220 px','Nhặt buff: +10% sát thương chí mạng trong 5 s','Đầy máu nhặt hồi máu: thành giáp tạm (15% máu tối đa, 8 s)'],
  7:['Tên lửa +10% chí mạng','Mỗi loạt tên lửa thứ 5 thêm 2 quả phụ (50%)','Bạo Tẩu: tên lửa bắn nhanh +20%'],
  8:['Hạ địch bằng bom / khi Bạo Tẩu: +15% nạp Bạo Tẩu','Có ≥ 3 món SSS: tàu con + tên lửa +12% sát thương','Vào Bạo Tẩu: thêm tàu con bóng tối 4 s']};
 return {rate,TXT,log:()=>log.slice(),open:id=>[2,6,11].map(n=>T(id)>=n),cfg:C};
})();
if(PSK307)window.PSK307=PSK307;
