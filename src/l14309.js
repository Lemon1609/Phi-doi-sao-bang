'use strict';
// V309 LƯỢT 14 (Gemini, chủ dự án chuyển 22/11): RƯƠNG NGẪU NHIÊN dùng chung Kho Rương · ĐĂNG NHẬP TÍCH LŨY không reset · THÀNH TỰU 5 BẬC.
//  (mốc năng động ngày/tuần nằm trong q77.js, loại extra 'R14')
//  1. Rương: 3 loại Rương Trang Bị (tb) / Rương Chiến Cơ (cc) / Rương Boss (boss) cộng vào kho `Chests` (Cửa hàng › Mở rương), có nhãn k14
//     → KHÔNG tính trần 30/ngày của Vô tận, mở bằng bảng riêng: KHÔNG BAO GIỜ ra Tím; đồ mạnh/VIP (nhóm S/SS/APEX = chiến cơ 6–13, bộ 6–13)
//     chỉ ra Trắng/Lục; không mảnh — chưa có món thì mở khóa luôn, đã có thì 1 bản sao. Hợp thể SSS không bao giờ rơi.
//     Rương Vô tận (không nhãn) giữ nguyên luật cũ.
//  2. Đăng nhập: đếm TỔNG ngày (bỏ ngày không mất tiến độ). Ngày 1–7 bộ Lam (Giáp Quỹ Đạo, Tên Lửa Hàn Sương, Đĩa Nguyệt Nhận, X-Dực Băng Hà);
//     ngày 8+ 4 tầng × quà xoay A/B/C + mốc bé (10, 20, 25, 35…) + mốc lớn (15, 30, 45…; mốc 30/60/90 thêm 1 Rương Boss).
//     Save cũ: tổng ngày = chuỗi đang có. 💎 điểm danh ngày 3/7 của econ74 (theo chuỗi % 7) giữ nguyên.
//  3. Thành tựu: 12 dòng × 5 bậc, thưởng theo thang Gemini (thay ◈/⬢/phôi cũ); bậc đã nhận ở save cũ quy đổi theo mốc cũ (không nhận lại).
//  Tắt: window.L14=false (cả 3) · window.RUONG14 / LOGIN14 / ACH14 = false (từng phần).
const L14309=(()=>{
 const on=k=>window.L14!==false&&(!k||window[k]!==false);
 const fmt=n=>Number(n).toLocaleString('vi-VN');
 const T=s=>{try{toast(s);}catch{}};
 const KEY='saobang-l14309';
 let S={v:1,days:0,last:-1,mig:0,ach:{},achMig:0,open:{tb:0,cc:0,boss:0}};
 try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&o.v===1)S=Object.assign(S,o);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}try{DeviceSave.flush();}catch{}};
 const today=()=>Math.floor((Date.now()+7*3600000)/86400000);
 const pick=a=>a[Math.floor(Math.random()*a.length)];
 const wpick=w=>{const s=w.reduce((a,b)=>a+b,0);let x=Math.random()*s,i=0;for(;i<w.length-1;i++){if(x<w[i])break;x-=w[i];}return i;};
 const TN=['Trắng','Lục','Lam'];

 // ================= 1 · RƯƠNG =================
 //  w = tỉ lệ Trắng/Lục/Lam đồ thường · vip = xác suất ra đồ mạnh/VIP · vw = tỉ lệ Trắng/Lục của đồ VIP (Gemini chỉ nói "thấp/khá/cao": số vip/vw do Claude đặt, chờ Gemini chốt)
 const RK={tb:{n:'RƯƠNG TRANG BỊ',img:'ruong_trang_bi',type:'gear',grade:'B',kinds:['gear'],w:[80,18,2],vip:.04,vw:[1,0]},
  cc:{n:'RƯƠNG CHIẾN CƠ',img:'ruong_chien_co',type:'craft',grade:'B',kinds:['craft'],w:[50,42,8],vip:.10,vw:[.7,.3]},
  boss:{n:'RƯƠNG BOSS',img:'ruong_boss',type:'gear',grade:'A',kinds:['gear','craft'],w:[0,75,25],vip:.20,vw:[.5,.5]}};
 const isSSS=v=>/^sss|_sss|^hop/i.test(String(v));
 function grp(kind,m){let si=-1;if(kind==='craft')si=m|0;else{try{Campaign36.sets.forEach((st,i)=>{if(st&&st.includes(m))si=i;});}catch{}}return si>=5?'VIP':si>=0?'':'X';}
 function pool(kind,vip){const out=[];if(kind==='craft'){for(let i=0;i<13;i++)if((grp('craft',i)==='VIP')===vip)out.push(['craft',i]);}
  else{try{for(const v of Object.keys(GearCatalog)){if(isSSS(v))continue;const g=grp('gear',v);if(g==='X')continue;if((g==='VIP')===vip)out.push(['gear',v]);}}catch{}}return out;}
 const owns=(k,m)=>{try{return k==='craft'?Campaign36.ownsCraft(m):Campaign36.ownsModel(m)&&(Progress.getState().items||[]).some(x=>x.variant===m);}catch{return false;}};
 // trao 1 món ở bậc f (0 Trắng · 1 Lục · 2 Lam). Chưa có → mở khóa + đặt bậc · đã có → 1 bản sao bậc f. f bị kẹp ≤ 2 (không Tím).
 function grantItem(kind,model,f,src){f=Math.max(0,Math.min(2,f|0));const ev=!!(window.Evo82&&Evo82.on());const t=ev?(EVO82.phTier[f]|0):f;
  if(!owns(kind,model)){let ok=null;try{ok=Campaign36.acquire(kind,model,'',window.NOBS22!==false?'equipment':(src||'l14'));/* V2.2.1: nguồn 'l14' bị Campaign36.permitted chặn → món rơi vào bản sao */}catch{}
   if(ok){if(t>0){try{V70.setTier(kind,kind==='craft'?model:ok.item&&ok.item.id,t);}catch{}}return {kind,model,unlock:1,f};}}
  try{if(ev)Evo82.addCopy(kind,model,t,1,true);else V70.phAdd(kind,model,f,1);}catch{}return {kind,model,copy:1,f};}
 function roll(k){const R=RK[k];const vip=Math.random()<R.vip;let kinds=R.kinds;let P=[];for(const kd of kinds)P=P.concat(pool(kd,vip));
  if(!P.length){for(const kd of kinds)P=P.concat(pool(kd,false));}
  const [kind,model]=pick(P);const f=vip?wpick(R.vw):wpick(R.w);return {kind,model,f:Math.min(2,f),vip};}
 function chestOpen(c){const k=c.k14;if(!RK[k])return null;const r=roll(k);const g=grantItem(r.kind,r.model,r.f,'chest14');S.open[k]=(S.open[k]|0)+1;save();
  return {type:r.kind==='craft'?'craft':'gear',v70:true,kind:r.kind,model:r.model,index:r.kind==='craft'?r.model:undefined,
   out:[g.unlock?{unlock:1,kind:r.kind,model:r.model}:{cp:r.f,kind:r.kind,model:r.model}],got:[{kind:r.kind,model:r.model,unlock:g.unlock,t:r.f,ph:r.f,copy:!g.unlock,rare:r.vip?'S':''}],fragments:0,cr:0,mats:[],k14:k,f:r.f};}
 function addChest(k,n=1){if(!RK[k]||!(n>0))return 0;let c=0;for(let i=0;i<n;i++){try{Chests.add14({id:'q14-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8)+i,type:RK[k].type,grade:RK[k].grade,k14:k});c++;}catch(e){console.warn('L14 rương',e);break;}}return c;}
 const cname=c=>c&&RK[c.k14]?RK[c.k14].n:'';
 const cimg=c=>{try{return (window.B9307_IMG||{})[RK[c.k14].img]||'';}catch{return '';}};
 const unopened=()=>{try{return Chests.getState().crates.length;}catch{return 0;}};
 // bọc Chest74V70 (Chests.open gọi theo tên toàn cục): rương có nhãn k14 đi bảng riêng
 function hookChest(){try{if(typeof Chest74V70!=='function'||Chest74V70.__l14)return;const o=Chest74V70;const f=function(c){if(c&&c.k14&&on('RUONG14'))return chestOpen(c);if(c&&c.k14){/* tắt: mở như rương Vô tận B/A */}return o.apply(this,arguments);};f.__l14=1;Chest74V70=f;}catch(e){console.warn('L14 hook rương',e);}}
 // nhãn + ảnh thẻ rương trong kho
 function paintCards(){const root=document.getElementById('chest-inventory');if(!root)return;let st=null;try{st=Chests.getState();}catch{return;}const m={};for(const c of st.crates)if(c.k14)m[c.id]=c;
  for(const b of root.querySelectorAll('[data-chest]')){const c=m[b.dataset.chest];if(!c||b.dataset.l14===c.k14)continue;b.dataset.l14=c.k14;b.classList.add('l14c','l14-'+c.k14);
   const bb=b.querySelector('b');if(bb)bb.textContent=cname(c);const sm=b.querySelector('small');if(sm)sm.textContent=c.k14==='boss'?'Lục / Lam · không Tím':c.k14==='cc'?'Chiến cơ · Trắng / Lục / Lam':'Trang bị · Trắng / Lục / Lam';
   const ic=b.querySelector('.chest-icon'),src=cimg(c);if(ic&&src&&window.ICON15B===false)ic.innerHTML=`<img src="${src}" alt="" style="width:34px;height:34px;object-fit:contain">`;}}
 // chấm đỏ: Cửa hàng › Mở rương (Cot307.items: k 'chest')
 function hookDot(){try{if(typeof Cot307==='undefined'||Cot307.__l14)return;const o=Cot307.items;Cot307.items=function(){const a=o.apply(this,arguments);try{if(on('RUONG14')&&unopened()>0){const x=a.find(y=>y.k==='chest');if(x)x.dot=true;}}catch{}return a;};Cot307.__l14=1;}catch{}}

 // ================= 2 · ĐĂNG NHẬP TÍCH LŨY =================
 //  r: hk ◈ · xp{2:n,3:n,4:n} · tb/cc/boss rương · pc mảnh phi công chính · vl{1|2|3:n} nguyên liệu (n món ngẫu nhiên trong 4 loại) · it [kind,model,f]
 const SETLAM={a:['gear','orbital',2],m:['gear','cryo',2],s:['gear','disc',2],c:['craft',2,2]};
 // V2.3 (chủ dự án 27/11): quà đăng nhập là RƯƠNG thay cho trang bị Lam (ngày 1/2/4: +1 Rương Trang Bị; ngày 7: +1 Rương Boss thay chiến cơ Lam). Tắt: window.L14CHEST=false
 const P1=window.L14CHEST===false?[{it:SETLAM.a,hk:1500,xp:{2:2}},{it:SETLAM.m,hk:2000,tb:1},{hk:3000,xp:{2:3},tb:1,pc:2},{it:SETLAM.s,hk:3500,vl:{1:2}},
  {hk:4500,xp:{3:2},cc:1,pc:3},{hk:5500,xp:{3:3},tb:2,vl:{2:2}},{it:SETLAM.c,hk:8000,xp:{4:2},cc:1}]
  :[{tb:1,hk:1500,xp:{2:2}},{tb:2,hk:2000},{hk:3000,xp:{2:3},tb:1,pc:2},{tb:1,hk:3500,vl:{1:2}},
  {hk:4500,xp:{3:2},cc:1,pc:3},{hk:5500,xp:{3:3},tb:2,vl:{2:2}},{boss:1,hk:8000,xp:{4:2},cc:1}];
 const ROT=[[{hk:2500,xp:{3:2}},{tb:1,pc:2},{hk:3000,vl:{1:2}}],[{hk:3800,xp:{3:2}},{tb:1,pc:3},{hk:4500,vl:{2:2}}],
  [{hk:5500,xp:{3:3}},{cc:1,pc:3},{hk:6500,vl:{3:2}}],[{hk:7500,xp:{4:2}},{cc:1,pc:4},{hk:9000,vl:{3:3}}]];
 const SMALL=[{hk:4000,tb:2,cc:1,xp:{3:3},pc:3},{hk:6000,tb:2,cc:1,vl:{2:2},pc:4},{hk:9000,tb:2,cc:2,vl:{3:2},pc:4},{hk:12000,tb:2,cc:2,vl:{3:3},pc:5}];
 const BIG=[{hk:10000,boss:1,cc:2,xp:{4:3},vl:{1:3},pc:6},{hk:15000,boss:1,cc:2,tb:2,xp:{4:4},vl:{2:4},pc:8},{hk:22000,boss:2,cc:2,xp:{4:4},vl:{3:4},pc:10},{hk:30000,boss:2,cc:3,xp:{4:5},vl:{3:6},pc:12}];
 const maxStage=()=>{try{const c=Progress.getState().cleared||[];return c.length?Math.max(...c):0;}catch{return 0;}};
 const tierStage=s=>s>=121?4:s>=81?3:s>=41?2:1;
 const tierDay=d=>d>=76?4:d>=46?3:d>=23?2:1;
 const tierOf=d=>Math.max(tierStage(maxStage()),tierDay(d));
 const isSmall=d=>d>=10&&d%5===0&&d%15!==0;
 const isBig=d=>d>=15&&d%15===0;
 function dayPack(d){// quà của ngày d (1-based): {base, extra[], tier}
  if(d<=7)return {base:P1[d-1],extra:[],tier:0,lab:'NGÀY '+d};
  const t=tierOf(d),base=ROT[t-1][(d-8)%3],extra=[];
  if(isSmall(d))extra.push(Object.assign({mk:'MỐC BÉ'},SMALL[t-1]));
  if(isBig(d)){const b=Object.assign({mk:'MỐC LỚN'},BIG[t-1]);if(d%30===0)b.boss=(b.boss|0)+1;if(window.L14GEM!==false)b.gem=[50,60,80,100][t-1]+(d%30===0?50:0);/* V2.3: kim cương ở mốc lớn (chủ dự án duyệt 27/11) */extra.push(b);}
  return {base,extra,tier:t,lab:'NGÀY '+d+' · TẦNG '+t};}
 function mainPilot(){try{const st=Pilot67.state(),own=Object.keys(st.own).map(Number);return st.team[0]&&st.own[st.team[0]]?st.team[0]:own[0];}catch{return 0;}}
 const itName=([k,m])=>{try{return k==='craft'?Fighters28.profiles[m].name:GearCatalog[m].name;}catch{return k==='craft'?'Chiến cơ':'Trang bị';}};
 function rtext(r){const a=[];if(r.it)a.push(itName(r.it)+' '+TN[r.it[2]]+' Lv1');if(r.hk)a.push(fmt(r.hk)+' ◈');if(r.xp)for(const k in r.xp)a.push(r.xp[k]+' Đá XP '+['','I','II','III','IV'][k]);
  if(r.tb)a.push(r.tb+' Rương TB');if(r.cc)a.push(r.cc+' Rương CC');if(r.boss)a.push(r.boss+' Rương Boss');if(r.pc)a.push(r.pc+' Mảnh PC');if(r.gem)a.push(r.gem+' 💎');if(r.vl)for(const k in r.vl)a.push(r.vl[k]+' VL '+['','Lục','Lam','Tím'][k]);return a.join(' · ');}
 function give(r,why){const out=[];if(!r)return out;
  try{if(r.it){const g=grantItem(r.it[0],r.it[1],r.it[2],'login14');out.push(itName(r.it)+(g.unlock?' (mở khóa)':' (bản sao)'));}}catch(e){console.warn('L14 it',e);}
  try{if(r.hk)Progress.grantCredits(r.hk);}catch{}
  try{if(r.xp)for(const k in r.xp)XPDA307.add(+k,r.xp[k]);}catch{}
  for(const k of ['tb','cc','boss'])if(r[k])addChest(k,r[k]);
  try{if(r.gem)Econ74.add(r.gem,why||'Điểm danh mốc lớn');}catch{}
  try{if(r.pc){const mp=mainPilot();if(mp)Pilot67._piece(mp,r.pc);else Progress.grantCredits(r.pc*900);}}catch{}
  try{if(r.vl)for(const k in r.vl)for(let i=0;i<r.vl[k];i++)V70.add(pick(MAT69.types).id+k,1);}catch{}
  try{Progress.render();Lobby.paint();Hub40.dots();}catch{}return out;}
 function migrate(){if(S.mig)return;let st=0,last=-1;try{const d=Meta40.state().S.daily;st=d.streak|0;last=d.last;}catch{}S.days=Math.max(S.days|0,st);S.last=last===today()?today():S.last;S.mig=1;save();}
 // gọi từ Meta40.claimDaily (rep build): trả false nếu hôm nay đã nhận
 function claim(){migrate();const d=today();if(S.last===d)return false;S.days=(S.days|0)+1;S.last=d;save();const P=dayPack(S.days);give(P.base);for(const x of P.extra)give(x);
  T('ĐIỂM DANH · '+P.lab+' · '+rtext(P.base)+(P.extra.length?' · + '+P.extra.map(x=>x.mk).join(' + '):''));return true;}
 const claimedToday=()=>{migrate();return S.last===today();};

 // ================= 3 · THÀNH TỰU 5 BẬC =================
 const AR=[{hk:3000,tb:2,xp:{2:3}},{hk:6000,tb:2,cc:1,pc:3},{hk:12000,cc:2,xp:{3:4},vl:{2:2},pc:5},{hk:22000,boss:1,cc:2,xp:{4:3},vl:{3:3},pc:8},{hk:35000,boss:2,cc:3,xp:{4:5},vl:{3:5},pc:12}];
 const g0=f=>{try{return f()|0;}catch{return 0;}};
 const sumStars=()=>g0(()=>Object.values(Campaign36.getState().stars||{}).reduce((a,b)=>a+(b|0),0));
 const ar79=id=>{try{const r=Ach79.ROWS.find(x=>x[0]===id);return r?r[3]():0;}catch{return 0;}};
 // [id, tên, mốc cũ (quy đổi save), 5 mốc mới (giữ nguyên mốc cũ, chèn/thêm cho đủ 5), getter, mô tả]
 const ACH=[
  ['clear','Chinh phục',[10,40,80,160],[10,40,80,120,160],()=>g0(()=>Progress.getState().cleared.length),'Vượt {n} ải cốt truyện'],
  ['boss','Thợ săn boss',[10,50,150],[10,50,150,300,500],()=>g0(()=>Progress.getState().bosses),'Hạ {n} boss'],
  ['kill','Phi công át chủ',[500,3000,15000],[500,3000,15000,50000,150000],()=>g0(()=>Progress.getState().totalKills),'Hạ {n} địch'],
  ['star','Sao băng',[30,150,480],[30,150,300,400,480],sumStars,'Thu {n} sao'],
  ['ss','Huyền thoại SS',[1,5],[1,3,5,9,13],()=>g0(()=>{let n=0;for(let i=0;i<13;i++)if(Workshop.craftProgress(i).grade==='SS')n++;return n;}),'{n} chiến cơ bậc SS'],
  ['robot','Kỹ sư hợp thể',[2,5,10],[2,4,6,8,10],()=>g0(()=>Array.from({length:10},(_,i)=>i).filter(i=>Fusion.componentReady(i)).length),'Có {n} chiến cơ thành phần đạt +1'],
  ['sss','Chiến thần SSS',[1,4,7],[1,2,4,6,7],()=>g0(()=>Fusion.getState().supers.length),'{n} siêu chiến cơ SSS'],
  ['tower','Chinh phục tháp',[5,15,32],[5,10,15,25,32],()=>g0(()=>Meta40.state().S.tower.best),'Đạt tầng {n} Tháp Boss'],
  ['endless','Vô tận',[10,30,60],[10,20,30,45,60],()=>g0(()=>Campaign36.getState().endlessBest),'Đợt {n} chế độ Vô tận'],
  ['star3','Chinh phục tinh tú',[15,45,90,130],[15,45,90,130,160],()=>ar79('star3'),'Đạt 3★ tại {n} ải chiến dịch'],
  ['tim5','Thợ rèn tối thượng',[1,2,4,8],[1,2,4,8,13],()=>ar79('tim5'),'Nâng {n} chiến cơ / trang bị lên Tím +5'],
  ['bossrun','Thợ săn nguyên liệu',[10,30,75,150],[10,30,75,150,300],()=>ar79('bossrun'),'Thắng hoặc càn quét ải boss {n} lượt']];
 function achMigrate(){if(S.achMig)return;let old={};try{old=Meta40.state().S.ach||{};}catch{}for(const [id,,oth,nth] of ACH){const c=Math.min(old[id]|0,oth.length);if(c>0){const v=oth[c-1];S.ach[id]=Math.max(S.ach[id]|0,nth.filter(x=>x<=v).length);}}S.achMig=1;save();}
 function achRows(){achMigrate();return ACH.map(([id,name,,th,get,desc])=>{const v=get(),done=S.ach[id]|0,fin=done>=th.length,t=Math.min(done,th.length-1),n=th[t];return {id,name,desc:desc.replace('{n}',fmt(n)),v,n,tier:t,fin,can:!fin&&v>=n,r:AR[t]};});}
 const achReady=()=>achRows().some(r=>r.can);
 function claimAch(id){const r=achRows().find(x=>x.id===id);if(!r||!r.can)return false;give(r.r);S.ach[id]=(S.ach[id]|0)+1;save();T('THÀNH TỰU · '+r.name+' bậc '+(r.tier+1)+' · '+rtext(r.r));return true;}

 // ================= GIAO DIỆN (thay bảng Điểm danh / Thành tựu của Meta40, dùng khung #m40 sẵn có) =================
 const css=`#m40 .l14h{display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin:0 0 8px;font-size:11.5px;color:#9fc0da}#m40 .l14h b{color:#ffd56a;font-size:13px;letter-spacing:1px}
#m40 .l14d{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
#m40 .l14d .day{min-height:92px;font-size:10px;line-height:1.25}#m40 .l14d .day b{font-size:10.5px}#m40 .l14d .day img{width:46px;height:46px;object-fit:contain;margin:0 auto;filter:drop-shadow(0 3px 4px #000a)}#m40 .l14d .day img.ic15{width:1.2em;height:1.2em;margin:0 .08em;filter:none}
#m40 .l14d .day.d7{grid-column:span 2}
#m40 .l14ms{position:relative;height:30px;margin:12px 6px 4px;background:#06101e;border:1px solid #2a4a6a}
#m40 .l14ms i.f{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#0ab4ff,#3fe6ff)}
#m40 .l14ms span{position:absolute;top:-3px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;font-size:9.5px;color:#cfe3f5;font-style:normal}
#m40 .l14ms span em{display:block;width:12px;height:12px;margin-bottom:2px;border:2px solid #3fe6ff;background:#0a1a2e;transform:rotate(45deg)}
#m40 .l14ms span img{display:block;width:24px;height:24px;object-fit:contain;margin:-6px 0 1px;filter:brightness(.6) saturate(.6) drop-shadow(0 2px 3px #000a)}#m40 .l14ms span.bg14 img{width:32px;height:32px;margin-top:-10px}#m40 .l14ms span.got img{filter:none;opacity:.55}#m40 .l14ms span.got::after{content:'✓';position:absolute;top:2px;right:-6px;color:#46ffb2;font-weight:900;font-size:12px}#m40 .l14ms span.now img{filter:drop-shadow(0 0 6px #ffd56a);animation:l14b .8s ease-in-out infinite alternate}@keyframes l14b{to{transform:translateY(-3px)}}
#m40 .l14ms{margin-top:22px!important}#m40 .l14ms span.bg14 em{width:16px;height:16px;border-color:#ffd56a;background:#3a2a08}#m40 .l14ms span.got em{background:#46ffb2;border-color:#46ffb2}
#m40 .l14nx{margin-top:8px;padding:8px;background:#0a1a2e;border:1px solid #2a4a6a;font-size:11px;color:#cfe3f5}#m40 .l14nx b{color:#ffd56a}
#m40 .l14r{display:grid;grid-template-columns:auto 1fr;gap:4px 8px;margin-top:6px;font-size:11px}#m40 .l14r b{color:#3fe6ff;white-space:nowrap}
#m40 .tabs img{width:18px;height:18px;object-fit:contain;vertical-align:-4px;margin-right:2px}
#m40 .ach .l14t{color:#ffd56a;letter-spacing:1px}
#chest-inventory .l14c{border-color:#ffd56a!important}#chest-inventory .l14-boss{box-shadow:0 0 12px #ff9a3d66}`;
 function ensureCss(){if(document.getElementById('l14css'))return;const s=document.createElement('style');s.id='l14css';s.textContent=css;document.head.appendChild(s);}
 const I15=(k,fb)=>{try{if(window.ICON15B!==false&&window.UI_ICONS){const u=UI_ICONS.src(k);if(u)return `<img src="${u}" alt="">`;}}catch{}return fb;};
 const icoOf=r=>{if(r.it){try{if(r.it[0]==='craft'){const n17=(window.UI17!==false&&typeof window.SHIPCUR17==='function'&&SHIPCUR17(r.it[1]));if(n17)return `<img src="${n17}" alt="">`;/* V309 L17B */const im=fighterAtlasV22,w=(im.naturalWidth||im.width)/5,h=(im.naturalHeight||im.height)/4,c=document.createElement('canvas');c.width=c.height=68;c.getContext('2d').drawImage(im,r.it[1]%5*w,Math.floor(r.it[1]/5)*h,w,h,0,0,68,68);return `<img src="${c.toDataURL()}" alt="">`;}
   const A=typeof GEAR44_ASSETS!=='undefined'?GEAR44_ASSETS:{};const src=A[r.it[1]+'_icon']||A[(GearCatalog[r.it[1]]&&GearCatalog[r.it[1]].behavior||'')+'_icon'];if(src)return `<img src="${src}" alt="">`;}catch{}return '<i>✈</i>';}
  if(r.boss)return I15('chest_boss',src9('ruong_boss','🎁'));if(r.cc)return I15('chest_cc',src9('ruong_chien_co','🎁'));if(r.tb)return I15('chest_tb',src9('ruong_trang_bi','🎁'));
  if(r.xp){const lv=Math.max(...Object.keys(r.xp).map(Number));return I15('xp'+lv,'<i>◈</i>');}if(r.pc)return I15('pilot','<i>◈</i>');return I15('alloy','<i>◈</i>');};
 const src9=(k,fb)=>{const s=(window.B9307_IMG||{})[k];return s?`<img src="${s}" alt="">`:'<i>'+fb+'</i>';};
 function panel(tab,ctx){ensureCss();migrate();const claimed=claimedToday(),days=S.days|0,next=claimed?days:days+1;
  const tabs=`<div class="tabs"><button data-t="daily" aria-pressed="${tab==='daily'}">${I15('calendar','📅')} Điểm danh${!claimed?' •':''}</button><button data-t="ach" aria-pressed="${tab==='ach'}">${I15('trophy','🏆')} Thành tựu${achReady()?' •':''}</button></div>`;
  let body='',title='',sub='';
  if(tab==='daily'){title='Điểm danh';
   if(claimed?days<=7:next<=7){sub='7 ngày đầu · đủ 1 bộ Lam (chiến cơ + giáp + tên lửa + tàu con). Bỏ ngày không mất tiến độ.';
    body=`<div class="l14h"><span>Tổng ngày đã nhận: <b>${days}</b></span><span>${claimed?'Hôm nay đã nhận':'Hôm nay: NGÀY '+next}</span></div><div class="l14d">${P1.map((r,i)=>{const d=i+1,got=d<=days,now=!claimed&&d===next;return `<div class="day ${got?'got':''} ${now?'now':''} ${d===7?'d7':''}"><b>NGÀY ${d}</b>${icoOf(r)}${rtext(r)}</div>`;}).join('')}</div>`;}
   else{const P=dayPack(next),t=P.tier;sub='Từ ngày 8: quà xoay vòng A · B · C theo tầng; tầng = mức cao hơn giữa ải đã vượt và tổng ngày.';
    const lo=Math.max(8,next-((next-8)%15)),hi=lo+15,ms=[];for(let d=lo+1;d<=hi;d++)if(isSmall(d)||isBig(d))ms.push(d);
    const fill=Math.max(0,Math.min(100,(days-lo)/(hi-lo)*100));
    const nextM=(()=>{for(let d=next;d<next+30;d++)if(isSmall(d)||isBig(d))return d;return 0;})();const nm=nextM?dayPack(nextM).extra:[];
    body=`<div class="l14h"><span>Tổng ngày: <b>${days}</b> · Tầng <b>${tierOf(next)}</b></span><span>Ải cao nhất ${maxStage()}</span></div>
     <div class="l14nx"><b>${claimed?'Ngày mai':'Hôm nay'} · ${P.lab}</b><div class="l14r"><b>Quà ngày ${'ABC'[(next-8)%3]}</b><span>${rtext(P.base)}</span>${P.extra.map(x=>`<b>${x.mk}</b><span>${rtext(x)}</span>`).join('')}</div></div>
     <div class="l14ms"><i class="f" style="width:${fill}%"></i>${ms.map(d=>`<span class="${isBig(d)?'bg14':''} ${d<=days?'got':''} ${d===next&&!claimed?'now':''}" style="left:${(d-lo)/(hi-lo)*100}%">${I15(isBig(d)?'chest_boss':'chest_cc','<em></em>')}${d}</span>`).join('')}</div>
     ${nextM&&nextM!==next?`<div class="l14nx"><b>Mốc kế tiếp · ngày ${nextM}</b><div class="l14r">${nm.map(x=>`<b>${x.mk}</b><span>${rtext(x)}</span>`).join('')}</div></div>`:''}
     <div class="l14nx" style="font-size:10.5px;color:#9fc0da">Mốc bé ngày 10, 20, 25, 35, 40, 50… · mốc lớn ngày 15, 30, 45… (mốc 30, 60, 90 thêm 1 Rương Boss). Rương vào Cửa hàng › Mở rương.</div>`;}
   body+=`<button class="big" id="r-claim" ${claimed?'disabled':''}>${claimed?'✓ ĐÃ ĐIỂM DANH HÔM NAY':'NHẬN QUÀ NGÀY '+next}</button>`;}
  else{title='Thành tựu';sub='5 bậc mỗi dòng · thưởng hợp kim, rương, Đá XP, nguyên liệu, mảnh phi công';
   body=achRows().map(r=>`<div class="ach ${r.can?'ok':''} ${r.fin?'done':''}"><b>${r.name} <span class="l14t">${'★'.repeat(r.tier+(r.fin?1:0))}</span><span class="l14t" style="opacity:.25">${'★'.repeat(5-r.tier-(r.fin?1:0))}</span></b><button data-a="${r.id}" ${r.can?'':'disabled'} class="${r.can?'gold-btn':''}">${r.fin?'XONG':r.can?'NHẬN':fmt(Math.min(r.v,r.n))+'/'+fmt(r.n)}</button><small>${r.fin?'Đã hoàn thành cả 5 bậc':'Bậc '+(r.tier+1)+': '+r.desc+' · '+rtext(r.r)}</small><div class="bar"><i style="width:${r.fin?100:Math.min(100,r.v/r.n*100)}%"></i></div></div>`).join('');}
  const m=ctx.modal(`<h3>${title}</h3><p class="sub">${sub}</p>${tabs}${body}`);m.classList.add('l14m');
  m.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>ctx.again(b.dataset.t));
  const c=m.querySelector('#r-claim');if(c)c.onclick=()=>{try{ctx.claimDaily();}catch(e){console.warn(e);}ctx.again('daily');};
  m.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{claimAch(b.dataset.a);ctx.again('ach');});}

 // ================= mốc năng động (q77 extra 'R14') =================
 function giveX(x){if(!on())return;give(x.r||{});}
 const txtX=x=>on()?rtext(x.r||{}):'';

 function tick(){hookChest();hookDot();if(window.Login14Hook&&Login14Hook.achOn())achMigrate();if(on('RUONG14'))paintCards();}
 setTimeout(()=>{tick();setInterval(()=>{try{tick();}catch{}},700);},300);
 return {RK,addChest,roll,chestOpen,grantItem,cname,dayPack,claim,claimedToday,panel,achRows,achReady,claimAch,rtext,giveX,txtX,tierOf,
  state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();}};
})();window.L14309=L14309;
// cầu nối cho Meta40 (rep trong build74_mau.py)
window.Login14Hook={on:()=>window.L14!==false&&window.LOGIN14!==false,claim:()=>L14309.claim(),panel:(t,c)=>L14309.panel(t,c),
 achOn:()=>window.L14!==false&&window.ACH14!==false,achReady:()=>L14309.achReady()};
