// V90 · CÂN BẰNG 13 CHIẾN CƠ Ở BẬC SS KHI ĐÁNH BOSS CÓ CÁNH (Gemini REVIEW90 §1 · SS_WING_BOSS_BAL_V90)
//  • ssTierMult: chỉ nhân khi chiến cơ đang lái có bậc SS (khung Trắng Lv1 đầu game không đổi). Nhân vào đạn chính lúc sinh ra (cùng chỗ bal86).
//  • Sửa cơ chế: #2 tia chạm lõi đang có khiên cánh → 2 tia khúc xạ 45% vào 2 cánh · #4 đạn trúng lõi có khiên → nảy sang cánh gần nhất 100%
//    · #10 2 viên plasma ngoài cùng mỗi loạt tự lệch tìm cánh còn sống · #13 đạn/tia xuyên nhiều bộ phận cùng boss: bộ phận thứ 2 trở đi 35%.
//  Claude chỉnh theo quyền Gemini cho (đo lại 1 lượt, kéo về targetDpsEst): bảng gốc 1.08/2.35/.68/1.75/.68/1.22/1.06/.92/1.20/2.10/.80/1.32/.72
//  → đo sau sửa cơ chế: 4792/3498/5355/7548/6557/3995/5502/6309/6375/6079/6686/7062/2434 ST/s (#13 bị giảm xuyên 35% mạnh hơn dự tính).
//  Lượt 2 (tia ray28 nhân tại damageBoss): chỉnh tiếp về targetDpsEst; #10 dao động rất mạnh giữa các lần đo (xem báo cáo).
//  Lượt 3: bot nhắm cánh còn sống (như người chơi giỏi) thay vì đứng giữa lõi → #9/#10 hết dao động; chỉnh về trung vị × vai trò
//   (tàu boss ×1,1 · dọn quái ×0,9). Số đo lượt 3 trước chỉnh: 10099/9659/5188/7467/4824/9150/11052/9058/13350/14640/7011/12805/17338.
//  Tắt: window.SS90=false
const SS90={mult:{1:1.4,2:1.76,3:0.8,4:1.22,5:0.86,6:1.26,7:1.12,8:1.21,9:0.98,10:1.67,11:0.74,12:0.63,13:0.52},refract:.45,ricochet:1,decay13:.10,homing10:520};
window.SS90_DATA=SS90;// V94 (REVIEW94 SS_RANK_VERIFY_V94): đo boss 160 (235.000) thời gian hạ: 25,1/20,3/18,7/16,1/17,5/22,4/20,7/34,5/19,6/25,3/22,3/18,9/14,4 s → tàu <19 s hoặc >34 s: hệ số × ttk/26,5
// V92 · Gemini REVIEW92 S_RANK_BAL_V92: hệ số riêng khi chiến cơ đang lái ở BẬC S (đo trên boss ải 120, tài khoản mẫu ải 120). Tắt: window.S92=false
const S92={mult:{1:1.35,2:1.19,3:0.65,4:0.9,5:1.03,6:0.78,7:0.54,8:1.05,9:1.09,10:0.93,11:0.42,12:0.48,13:0.42}};// V93 (REVIEW93): máu boss 100/120 ×1,5 → hệ số ×1,5 giữ thời gian hạ boss// vòng 1 (hệ số Gemini) đo: 2001/2767/4429/3763/2771/3231/2002/2042/1849/3371/4498/4278/4012 ST/s → chỉnh về 1.500 ST/s (hạ boss 120 ~23 s) · vòng 2: 1429/1495/1142/1522/1170/1632/1442/1522/1794/1348/1547/1747/1185 → chỉnh nhẹ #3 #5 #13 lên, #9 xuống
window.S92_DATA=S92;
const SS90M=(()=>{
 const on=()=>window.SS90!==false;
 let gT=-1,gV=false,gG='';
 function isSS(){let t=0;try{t=time;}catch{}if(Math.abs(t-gT)<1&&gT>=0)return gV;gT=t;try{const c=(typeof launchCraft!=='undefined'&&launchCraft!=null)?launchCraft:selected;gG=Workshop.craftProgress(c).grade||'';gV=gG==='SS';}catch{gV=false;gG='';}return gV;}
 function mult(id){if(!on())return 1;if(isSS())return SS90.mult[id]||1;if(gG==='S'&&window.S92!==false)return S92.mult[id]||1;return 1;}
 const alive=p=>p&&!p.dead&&!(p.hp>0===false);
 const wings=()=>{try{return (boss.parts||[]).filter(p=>!p.dead&&p.hp>0);}catch{return [];}};
 let nRef=0,nRic=0,nDec=0,nHom=0;
 // đạn mới của #10: 2 viên ngoài cùng mỗi loạt lệch tìm cánh
 function tagNew(){if(!on()||!isSS())return;let W=null;try{for(const s of shots){if(s.__ss90||s.dead)continue;s.__ss90=1;if((s.art28|0)!==9||s.gearKind||s.art28==null||s.type!=='plasma')continue;
   if(W===null)W=boss&&!boss.dead?wings():[];if(!W.length)continue;const off=s.x-player.x;if(Math.abs(off)<20)continue;const w=W.reduce((a,b)=>Math.abs(b.x-s.x)<Math.abs(a.x-s.x)?b:a);s.__t86=w;s.homing=true;s.homingSpeed=SS90.homing10;nHom++;}}catch{}}
 let F=-1,seenF=null;
 let INS=false;function install(){try{if(INS||typeof window.damageBoss!=='function')return;INS=true;const ob=window.damageBoss;const f=function(a,src,part){try{if(on()&&src&&typeof src==='object'&&src.ray28&&src.art28!=null&&!src.gearKind&&a>0&&boss&&!isSS()&&gG==='S'&&window.S92!==false)a*=S92.mult[(src.art28|0)+1]||1;}catch{}try{if(on()&&src&&typeof src==='object'&&src.art28!=null&&!src.gearKind&&a>0&&boss&&isSS()){const id=(src.art28|0)+1,W=wings(),core=(part==null||part===boss);
     if(src.ray28){const m=SS90.mult[id]||1;a*=m;}// tia (ray28) không dùng s.damage lúc sinh → nhân ở đây
     if(id===13&&src.piercing){let t=0;try{t=time;}catch{}const k=part||boss;if(src.ray28){if(src.__f13!==t){src.__f13=t;src.__p13=new Set();}}else if(!src.__p13)src.__p13=new Set();if(!src.__p13.has(k)){src.__p13.add(k);if(src.__p13.size>1){a*=SS90.decay13;nDec++;}}}
     if(core&&W.length){if(id===4){const w=W.reduce((x,y)=>Math.abs(y.x-(src.x||boss.x))<Math.abs(x.x-(src.x||boss.x))?y:x);nRic++;return ob.call(this,a*SS90.ricochet,src,w);}
      if(id===2){for(const w of W){nRef++;ob.call(this,a*SS90.refract,{__x85:1,ss90:1},w);}}}}}catch{}return ob.apply(this,[a,src,part]);};
   f.__ss90=1;window.damageBoss=f;try{damageBoss=f;}catch{}}catch{}}
 let FH=false;function hookFb(){if(FH)return;try{const of=Feedback31.damage;FH=true;Feedback31.damage=function(e,amount,src){const r=of.apply(this,arguments);try{if(on()&&src&&typeof src==='object'&&src.ray28&&!src.gearKind&&e&&!e.dead&&e!==boss&&!e.bossPart&&amount>0&&isSS()){const m=SS90.mult[(src.art28|0)+1]||1;if(m!==1){e.hp-=amount*(m-1);if(e.hp<=0)try{kill(e);}catch{}}}}catch{}return r;};}catch{}}
 let H=false;function hookUpd(){if(H)return;H=true;const o=window.update;const f=function(dt){const r=o.apply(this,arguments);try{tagNew();}catch{}return r;};window.update=f;try{update=f;}catch{}}
 setTimeout(install,1500);setTimeout(hookFb,1500);hookUpd();// lớp NGOÀI bal86 (bal86 giảm sát thương lõi khi còn cánh): cài sau khi mọi module đã bọc
 return {on,mult,isSS,state:()=>({ss:isSS(),nRef,nRic,nDec,nHom})};
})();
window.SS90M=SS90M;
