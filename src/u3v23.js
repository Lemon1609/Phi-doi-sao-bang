'use strict';
// V2.3 U3 (v23-ui-meta): ĐIỂM DANH TÍCH LŨY + RƯƠNG MỐC · THÁM HIỂM TINH TẾ (offline) · THẺ KỲ CỰU (0 IAP, 0 quảng cáo)
//  • Điểm danh: dùng ĐÚNG bộ đếm tổng ngày của L14 (L14309.state().days) — không bộ đếm thứ 2; quà ngày giữ nguyên (L14309.dayPack).
//    Rương mốc mới (chủ dự án chọn 27/11 "Thêm bộ rương mốc mới"): mỗi 5 ngày tích lũy 1 rương nhận 1 lần (lưu S.ms), có ít kim cương
//    (chủ dự án duyệt ngoại lệ luật kim cương 27/11).
//  • Thám hiểm: 1 chuyến 2 / 4 / 8 giờ theo Date.now() (chạy cả khi tắt game), không khóa tàu; Thám hiểm nhanh 1 lượt miễn phí/ngày (+1 Thẻ Kỳ Cựu);
//    TRẦN CỨNG 4 lần nhận / ngày lịch (gồm cả nhanh). Sản lượng ≈ 1–2 ải thường (missionFor(ải cao nhất).credits).
//  • Thẻ Kỳ Cựu: 600 💎 / 30 ngày (cộng dồn), kích hoạt nhận ngay 300 💎 + 10.000 ◈, quà ngày 30 💎 + 5 Đá XP II, +20 % Thám hiểm, +1 lượt nhanh,
//    mở CÀN QUÉT NHANH (chủ dự án chọn 27/11 "Khóa sau thẻ": Campaign36.sweep cần thẻ; vẫn trừ thể lực + trần ngày như cũ).
//    KHÔNG đụng điểm Vô tận (không bọc score / Combat.factor).
//  Lưu: saobang-u3-v1. Tắt toàn bộ: window.U3V23=false (cả khóa càn quét). Tắt riêng khóa càn quét: window.U3SWEEP=false.
const U3V23M=(()=>{
 const on=()=>window.U3V23!==false;
 const KEY='saobang-u3-v1';
 const fmt=n=>Number(n).toLocaleString('vi-VN');
 const T=s=>{try{toast(s);}catch{}};
 const today=()=>Math.floor((Date.now()+7*3600000)/86400000);/* cùng mốc ngày với L14 (GMT+7) */
 let S={v:1,ms:[],ex:{run:null,day:-1,n:0,q:0},vet:{until:-1,daily:-1,buys:0}};
 try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&o.v===1){S=Object.assign(S,o);S.ex=Object.assign({run:null,day:-1,n:0,q:0},o.ex||{});S.vet=Object.assign({until:-1,daily:-1,buys:0},o.vet||{});if(!Array.isArray(S.ms))S.ms=[];}}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}try{DeviceSave.flush();}catch{}};
 const IC=k=>{try{return (window.UI_ICONS&&UI_ICONS.src(k))||'';}catch{return '';}};
 const im=(k,c='')=>{const s=IC(k);return s?`<img class="u3i ${c}" src="${s}" alt="" draggable="false">`:'';};
 const mainPilot=()=>{try{const st=Pilot67.state(),own=Object.keys(st.own).map(Number);return st.team[0]&&st.own[st.team[0]]?st.team[0]:own[0];}catch{return 0;}};
 const maxStage=()=>{try{const c=Progress.getState().cleared||[];return c.length?Math.max(...c):0;}catch{return 0;}};
 const repaint=()=>{try{Progress.render();}catch{}try{Lobby.paint();}catch{}try{Hub40.dots();}catch{}};

 // ================= THẺ KỲ CỰU =================
 const VET={price:600,days:30,backGem:300,backHk:10000,dGem:30,dXp:5,dXpT:2,exp:1.2};
 const vetLeft=()=>Math.max(0,(S.vet.until|0)-today());
 const vetOn=()=>on()&&vetLeft()>0;
 function vetBuy(){if(!on())return false;let ok=false;try{ok=Econ74.spend(VET.price);}catch{}if(!ok)return false;
  S.vet.until=Math.max(S.vet.until|0,today())+VET.days;S.vet.buys=(S.vet.buys|0)+1;save();
  try{Econ74.add(VET.backGem,'Thẻ Kỳ Cựu · quà kích hoạt');}catch{}try{Progress.grantCredits(VET.backHk);}catch{}
  repaint();T('THẺ KỲ CỰU · hiệu lực còn '+vetLeft()+' ngày · +'+VET.backGem+' 💎 · +'+fmt(VET.backHk)+' ◈');return true;}
 const vetDailyOk=()=>vetOn()&&S.vet.daily!==today();
 function vetDaily(){if(!vetDailyOk())return false;S.vet.daily=today();save();try{Econ74.add(VET.dGem,'Thẻ Kỳ Cựu · quà ngày');}catch{}try{XPDA307.add(VET.dXpT,VET.dXp);}catch{}repaint();T('THẺ KỲ CỰU · quà ngày · +'+VET.dGem+' 💎 · +'+VET.dXp+' Đá XP II');return true;}

 // ================= THÁM HIỂM TINH TẾ =================
 const CAP=4,HRS=[2,4,8],MUL={2:1,4:1.5,8:2},XPR={2:{2:1},4:{2:2},8:{3:1,2:1}},PC={2:.1,4:.15,8:.25};
 const XPV={1:15,2:60,3:240,4:1000};
 function exDay(){const d=today();if(S.ex.day!==d){S.ex.day=d;S.ex.n=0;S.ex.q=0;save();}}
 const quickMax=()=>1+(vetOn()?1:0);
 const quickLeft=()=>{exDay();return Math.max(0,quickMax()-(S.ex.q|0));};
 const capLeft=()=>{exDay();return Math.max(0,CAP-(S.ex.n|0));};
 function baseCr(){let c=0;try{c=missionFor(Math.max(1,maxStage())).credits|0;}catch{}return c>0?c:600;}
 function reward(h){const k=vetOn()?VET.exp:1,hk=Math.round(baseCr()*MUL[h]*k),xp=Object.assign({},XPR[h]);let bonus=0;
  if(k>1){const v=Object.entries(xp).reduce((a,[t,n])=>a+XPV[t]*n,0);bonus=Math.round(v*(k-1)/XPV[1]);if(bonus>0)xp[1]=(xp[1]|0)+bonus;}
  return {hk,xp,pc:PC[h],h};}
 const rText=r=>[fmt(r.hk)+' ◈',...Object.entries(r.xp).sort((a,b)=>b[0]-a[0]).map(([t,n])=>n+' Đá XP '+['','I','II','III','IV'][t]),Math.round(r.pc*100)+'% Mảnh PC'].join(' · ');
 function grant(r){try{Progress.grantCredits(r.hk);}catch{}try{for(const t in r.xp)XPDA307.add(+t,r.xp[t]);}catch{}let pc=0;if(Math.random()<r.pc){const mp=mainPilot();try{if(mp){Pilot67._piece(mp,1);pc=1;}}catch{}}repaint();return pc;}
 const runLeft=()=>{const R=S.ex.run;if(!R)return -1;return Math.max(0,R.t0+R.h*3600000-Date.now());};
 const exDone=()=>!!S.ex.run&&runLeft()===0;
 function exStart(h){if(!on()||!HRS.includes(h)||S.ex.run)return false;if(capLeft()<=0){T('ĐÃ ĐỦ '+CAP+' LẦN NHẬN THÁM HIỂM HÔM NAY · quay lại ngày mai');return false;}S.ex.run={h,t0:Date.now()};save();T('ĐỘI TÀU XUẤT PHÁT · THÁM HIỂM '+h+' GIỜ');return true;}
 function exClaim(){if(!exDone())return false;if(capLeft()<=0){T('ĐÃ ĐỦ '+CAP+' LẦN NHẬN THÁM HIỂM HÔM NAY · quay lại ngày mai');return false;}const r=reward(S.ex.run.h);S.ex.run=null;S.ex.n++;save();const pc=grant(r);
  T('THÁM HIỂM HOÀN THÀNH · +'+fmt(r.hk)+' ◈ · '+Object.entries(r.xp).map(([t,n])=>n+' Đá XP '+['','I','II','III','IV'][t]).join(' · ')+(pc?' · +1 Mảnh PC':''));return r;}
 function exQuick(){if(!on())return false;if(quickLeft()<=0){T('HẾT LƯỢT THÁM HIỂM NHANH HÔM NAY');return false;}if(capLeft()<=0){T('ĐÃ ĐỦ '+CAP+' LẦN NHẬN THÁM HIỂM HÔM NAY · quay lại ngày mai');return false;}
  const r=reward(2);S.ex.q++;S.ex.n++;save();const pc=grant(r);T('THÁM HIỂM NHANH · +'+fmt(r.hk)+' ◈ · '+Object.entries(r.xp).map(([t,n])=>n+' Đá XP '+['','I','II','III','IV'][t]).join(' · ')+(pc?' · +1 Mảnh PC':''));return r;}
 const exDot=()=>on()&&capLeft()>0&&(exDone()||quickLeft()>0);

 // ================= RƯƠNG MỐC ĐIỂM DANH (mỗi 5 ngày tích lũy) =================
 const days=()=>{try{return L14309.state().days|0;}catch{return 0;}};
 function MS(m){const k=m/5;return {hk:Math.min(15000,2000+1000*k),xp:k>=4?{2:2,3:1}:{2:2},pc:2+(k>=6?1:0),gem:k%5===0?50:20};}
 const msText=r=>[fmt(r.hk)+' ◈',...Object.entries(r.xp).sort((a,b)=>b[0]-a[0]).map(([t,n])=>n+' Đá XP '+['','I','II','III','IV'][t]),r.pc+' Mảnh PC',r.gem+' 💎'].join(' · ');
 const msGot=m=>S.ms.includes(m);
 const msCan=m=>m>0&&m%5===0&&days()>=m&&!msGot(m);
 function msWin(){let f=5;while(msGot(f))f+=5;const w0=Math.floor((f-5)/25)*25+5;return [0,1,2,3,4].map(i=>w0+5*i);}
 function msClaim(m){if(!msCan(m))return false;S.ms.push(m);S.ms.sort((a,b)=>a-b);save();const r=MS(m);try{Progress.grantCredits(r.hk);}catch{}try{for(const t in r.xp)XPDA307.add(+t,r.xp[t]);}catch{}
  try{const mp=mainPilot();if(mp)Pilot67._piece(mp,r.pc);else Progress.grantCredits(r.pc*900);}catch{}try{Econ74.add(r.gem,'Rương mốc '+m+' ngày');}catch{}repaint();T('RƯƠNG MỐC '+m+' NGÀY · '+msText(r));return true;}
 const msDot=()=>on()&&msWin().some(msCan);

 // ================= màn ĐIỂM DANH TÍCH LŨY (thay tab Điểm danh của bảng L14, dùng khung #m40) =================
 const RN=['','I','II','III','IV'];
 function itemImg([k,m]){try{if(k==='craft'){const u=typeof window.SHIPCUR17==='function'&&SHIPCUR17(m);if(u)return u;}const A=typeof GEAR44_ASSETS!=='undefined'?GEAR44_ASSETS:{};return A[m+'_icon']||A[((GearCatalog[m]||{}).behavior||'')+'_icon']||'';}catch{return '';}}
 const itName=([k,m])=>{try{return k==='craft'?Fighters28.profiles[m].name:GearCatalog[m].name;}catch{return '';}};
 function parts(r){const a=[];if(!r)return a;
  if(r.it)a.push({u:itemImg(r.it),t:'Lam',n:itName(r.it)});
  if(r.hk)a.push({u:IC('alloy'),t:fmt(r.hk)});
  if(r.xp)for(const t of Object.keys(r.xp).sort((x,y)=>y-x))a.push({u:IC('xp'+t),t:'×'+r.xp[t],n:'Đá XP '+RN[t]});
  for(const [k,ik,nm] of [['boss','chest_boss','Rương Boss'],['cc','chest_cc','Rương CC'],['tb','chest_tb','Rương TB']])if(r[k])a.push({u:IC(ik),t:'×'+r[k],n:nm});
  if(r.pc)a.push({u:IC('pilot'),t:'×'+r.pc,n:'Mảnh PC'});
  if(r.vl)for(const t of Object.keys(r.vl))a.push({u:IC('crystal'),t:'×'+r.vl[t],n:'VL '+['','Lục','Lam','Tím'][t]});
  return a;}
 function dayCell(d,cur,claimed){let P=null;try{P=L14309.dayPack(d);}catch{}const all=P?[P.base,...(P.extra||[])]:[];const ps=all.flatMap(parts);
  const got=claimed?d<=cur:d<cur,now=!claimed&&d===cur,d7=d%7===0;
  const show=d7?ps.slice(0,3):ps.slice(0,1);let tx='';try{tx=L14309.rtext(P.base)+(P.extra&&P.extra.length?' + '+P.extra.map(x=>x.mk).join(' + '):'');}catch{}
  return `<div class="u3d ${d7?'d7':''} ${got?'got':''} ${now?'now':''}" title="${tx.replace(/"/g,'')}"><b>NGÀY ${d}</b><span class="u3dp">${show.map(p=>`<span class="u3pt"><i style="background-image:url('${p.u}')"></i><em>${p.t}</em></span>`).join('')}</span>${got?'<s class="u3ok">✓</s>':''}</div>`;}
 function dailyHTML(){let L={};try{L=L14309.state();}catch{}let claimed=false;try{claimed=L14309.claimedToday();}catch{}const dd=L.days|0,cur=claimed?Math.max(1,dd):dd+1;
  const w0=Math.floor((cur-1)/7)*7;const W=msWin(),lo=W[0]-5,fill=Math.max(0,Math.min(100,(dd-lo)/(W[4]-lo)*100));
  return `<div class="u3bn"><h3>ĐIỂM DANH TÍCH LŨY</h3><button type="button" class="u3x" data-u3="x" aria-label="Đóng">×</button></div>
  <div class="u3msr"><div class="u3tot"><small>TỔNG NGÀY</small><b>${dd}</b></div><div class="u3trk"><i class="u3f" style="width:${fill}%"></i>${W.map((m,i)=>`<button type="button" class="u3ch ${msGot(m)?'got':''} ${msCan(m)?'can':''}" data-u3="ms" data-m="${m}" style="left:${(i+1)*20-10}%" aria-label="Rương mốc ${m} ngày"><i></i><em>${m}</em></button>`).join('')}</div></div>
  <div class="u3g">${[1,2,3,4,5,6,7].map(i=>dayCell(w0+i,cur,claimed)).join('')}</div>
  <p class="u3nt">Cộng dồn ngày · bỏ ngày không mất tiến độ · rương mốc mỗi 5 ngày (chạm để nhận)</p>
  <button type="button" class="u3cl u3p ${claimed?'u3ps':'u3pg'}" id="r-claim" ${claimed?'disabled':''}>${claimed?'ĐÃ NHẬN':'NHẬN QUÀ'}</button>`;}
 function dailyPanel(ctx){const m=ctx.modal(dailyHTML());m.classList.add('l14m','u3dm');
  // tab Điểm danh | Thành tựu của L14: giữ (đặt dưới băng rôn)
  try{const ar=L14309.achReady();const tb=document.createElement('div');tb.className='tabs u3tabs';tb.innerHTML=`<button data-t="daily" aria-pressed="true">Điểm danh</button><button data-t="ach" aria-pressed="false">Thành tựu${ar?' •':''}</button>`;m.querySelector('.u3msr').before(tb);tb.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>ctx.again(b.dataset.t));}catch{}
  m.addEventListener('click',e=>{const b=e.target.closest('[data-u3]');if(!b)return;const k=b.dataset.u3;
   if(k==='x'){const hx=document.querySelector('#hub9 .h9x');if(hx&&hx.offsetParent)hx.click();else ctx.closeM();return;}
   if(k==='ms'){const mm=+b.dataset.m;if(msCan(mm)){msClaim(mm);ctx.again('daily');}else T((msGot(mm)?'ĐÃ NHẬN · ':'RƯƠNG MỐC '+mm+' NGÀY · ')+msText(MS(mm)));}});
  const c=m.querySelector('#r-claim');if(c)c.onclick=()=>{try{ctx.claimDaily();}catch(e){console.warn(e);}ctx.again('daily');};}
 function hookPanel(){const H=window.Login14Hook;if(!H||H.__u3)return;const o=H.panel;H.panel=function(tab,ctx){if(on()&&tab!=='ach'){try{return dailyPanel(ctx);}catch(e){console.warn('U3 điểm danh',e);}}return o.apply(this,arguments);};H.__u3=1;}

 // ================= màn THÁM HIỂM / THẺ KỲ CỰU (hộp riêng #u3m) =================
 let box=null,tick=0,cur='';
 function close(){if(box){box.hidden=true;box.innerHTML='';}cur='';clearInterval(tick);tick=0;paintRail();}
 function open(k){if(!on())return;if(!box){box=document.createElement('div');box.id='u3m';document.body.appendChild(box);box.addEventListener('click',onBox);}cur=k;box.hidden=false;render();clearInterval(tick);tick=setInterval(()=>{if(cur==='exp')liveExp();},1000);}
 const hhmmss=ms=>{const s=Math.ceil(ms/1000),h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return [h,m,x].map(v=>String(v).padStart(2,'0')).join(':');};
 const shipName=()=>{try{return Fighters28.profiles[selected].name;}catch{return 'Chiến cơ';}};
 function expHTML(){exDay();const R=S.ex.run,left=runLeft(),done=exDone(),cap=capLeft(),q=quickLeft();
  const st=!R?'<b class="u3s0">SẴN SÀNG</b> · chọn thời gian rồi cử đội tàu':done?'<b class="u3s2">HOÀN THÀNH</b> · thám hiểm '+R.h+' giờ':`<b class="u3s1">ĐANG THÁM HIỂM ${R.h} GIỜ</b> · còn <span class="u3cd">${hhmmss(left)}</span>`;
  const pct=R?Math.round(100*(1-left/(R.h*3600000))):0;
  return `<div class="u3c u3ce"><div class="u3hd"><b>THÁM HIỂM TINH TẾ</b><button type="button" class="u3x" data-u3="x" aria-label="Đóng">×</button></div>
  <div class="u3hero"><i class="u3probe"></i><div><p>Đội tàu: <b>${shipName()}</b> · đội hình hiện tại</p><p class="u3sm">Nhàn rỗi · không khóa tàu khỏi chiến đấu · tính theo giờ thực, chạy cả khi tắt game</p><p class="u3st">${st}</p><div class="u3bar"><i style="width:${pct}%"></i></div></div></div>
  <div class="u3hr">${HRS.map(h=>{const r=reward(h);return `<div class="u3o ${R&&R.h===h?'on':''}"><b>${h} GIỜ</b><p>${im('alloy')}${fmt(r.hk)}</p><p>${Object.entries(r.xp).sort((a,b)=>b[0]-a[0]).map(([t,n])=>im('xp'+t)+'×'+n).join(' ')}</p><p class="u3sm">${im('pilot')}${Math.round(r.pc*100)}% mảnh</p><button type="button" class="u3p ${R||cap<=0?'u3ps':'u3pb'}" data-u3="go" data-h="${h}" ${R||cap<=0?'disabled':''}>CỬ ĐI</button></div>`;}).join('')}</div>
  <div class="u3row"><button type="button" class="u3p ${done&&cap>0?'u3pg':'u3ps'} u3big" data-u3="claim" ${done&&cap>0?'':'disabled'}>${done?'NHẬN THƯỞNG':R?'ĐANG THÁM HIỂM…':'CHƯA CÓ CHUYẾN'}</button>
   <button type="button" class="u3p ${q>0&&cap>0?'u3pe':'u3ps'} u3big" data-u3="quick" ${q>0&&cap>0?'':'disabled'}>THÁM HIỂM NHANH<small>Miễn phí ${q}/${quickMax()}</small></button></div>
  <p class="u3ft">Đã nhận hôm nay <b>${CAP-cap}/${CAP}</b> · trần cứng ${CAP} lần/ngày${vetOn()?' · <span class="u3v">Thẻ Kỳ Cựu +20 % sản lượng</span>':''}</p></div>`;}
 function liveExp(){if(!box||box.hidden)return;const R=S.ex.run;if(!R)return;const cd=box.querySelector('.u3cd'),bar=box.querySelector('.u3bar i');const left=runLeft();if(left===0){render();return;}if(cd)cd.textContent=hhmmss(left);if(bar)bar.style.width=Math.round(100*(1-left/(R.h*3600000)))+'%';}
 function vetHTML(){const l=vetLeft(),act=l>0,dok=vetDailyOk(),dg=(()=>{try{return Econ74.gems()|0;}catch{return 0;}})();
  const P=[['+20%','Sản lượng Thám hiểm Tinh tế'],['+1','Lượt Thám hiểm nhanh miễn phí mỗi ngày'],['MỞ','CÀN QUÉT NHANH ải 3★ (vẫn trừ thể lực, đúng trần ngày)'],[VET.backGem+'💎','Quà kích hoạt + '+fmt(VET.backHk)+' Hợp kim (mỗi chu kỳ 30 ngày)'],[VET.dGem+'💎','Quà ngày + '+VET.dXp+' Đá XP II']];
  return `<div class="u3c u3cv"><div class="u3hd"><b>THẺ KỲ CỰU</b><button type="button" class="u3x" data-u3="x" aria-label="Đóng">×</button></div>
  <div class="u3vt"><div class="u3pk">${P.map(([a,b],i)=>`<p><b>${a}</b><span>${b}</span></p>`).join('')}</div><div class="u3vc"><b>KỲ CỰU</b><small>30 NGÀY</small></div></div>
  <p class="u3vs ${act?'on':''}">${act?`Đang hiệu lực · Còn <b>${l}</b> ngày`:'Chưa kích hoạt'} · ${VET.price} 💎 / ${VET.days} ngày · cộng dồn khi gia hạn</p>
  <button type="button" class="u3p ${act?'u3pe':'u3pg'} u3big u3buy" data-u3="buy" ${dg>=VET.price?'':'aria-disabled="true"'}>${act?'GIA HẠN':'KÍCH HOẠT'} · ${VET.price} 💎</button>
  <div class="u3dg"><span>Quà ngày: <b>${VET.dGem} 💎 + ${VET.dXp} Đá XP II</b></span><button type="button" class="u3p ${dok?'u3pg':'u3ps'}" data-u3="vday" ${dok?'':'disabled'}>${act&&!dok?'ĐÃ NHẬN':'NHẬN'}</button></div>
  <p class="u3ft">Kích hoạt hoàn toàn bằng kim cương trong game · 0 nạp tiền · 0 quảng cáo · không cộng điểm Vô tận</p></div>`;}
 function render(){if(!box||box.hidden)return;box.innerHTML=cur==='exp'?expHTML():cur==='vet'?vetHTML():'';}
 function onBox(e){if(e.target===box){close();return;}const b=e.target.closest('[data-u3]');if(!b||b.disabled)return;const k=b.dataset.u3;
  if(k==='x'){close();return;}
  if(k==='go')exStart(+b.dataset.h);else if(k==='claim')exClaim();else if(k==='quick')exQuick();
  else if(k==='buy'){let g=0;try{g=Econ74.gems()|0;}catch{}if(g<VET.price){T('THIẾU KIM CƯƠNG · cần '+VET.price+' 💎');return;}vetBuy();}
  else if(k==='vday')vetDaily();
  render();paintRail();}

 // ================= 2 lối tắt cột trái Sảnh (#lob22 .l22L) =================
 function railItem(k,lab){const e=document.createElement('div');e.className='l22dock u3dk';e.setAttribute('role','button');e.tabIndex=0;e.dataset.u3r=k;e.innerHTML=`<i class="u3ri ${k}"></i><small>${lab}</small><em class="l22dot"></em>`;
  e.addEventListener('click',ev=>{ev.stopPropagation();open(k);});e.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();open(k);}});return e;}
 function paintRail(){const L=document.querySelector('#lob22 .l22L');if(!L)return;if(!on()){L.classList.remove('u3r7');L.querySelectorAll('.u3dk').forEach(e=>e.remove());return;}
  if(!L.querySelector('[data-u3r=exp]')){L.append(railItem('exp','THÁM HIỂM'),railItem('vet','THẺ KỲ CỰU'));L.classList.add('u3r7');
   const bg=(window.LOB222_IMG||{}).btn_dock_sq;if(bg)L.querySelectorAll('.u3dk').forEach(e=>e.style.backgroundImage='url("'+bg+'")');}
  const ex=L.querySelector('[data-u3r=exp]'),vt=L.querySelector('[data-u3r=vet]');const done=exDone()&&capLeft()>0;
  ex.classList.toggle('u3on',exDot());ex.classList.toggle('done',done);const s=ex.querySelector('small'),t=done?'HOÀN THÀNH':'THÁM HIỂM';if(s.textContent!==t)s.textContent=t;
  vt.classList.toggle('u3on',vetDailyOk());vt.classList.toggle('act',vetOn());}

 // ================= khóa CÀN QUÉT NHANH sau Thẻ Kỳ Cựu =================
 function hookSweep(){try{if(typeof Campaign36==='undefined'||Campaign36.__u3)return;const o=Campaign36.sweep;Campaign36.sweep=function(n){if(on()&&window.U3SWEEP!==false&&!vetOn()){T('CÀN QUÉT NHANH cần THẺ KỲ CỰU · Sảnh › THẺ KỲ CỰU');return false;}return o.apply(this,arguments);};Campaign36.__u3=1;}catch(e){console.warn('U3 càn quét',e);}}

 function boot(){if(!on())return;document.documentElement.classList.add('u3v23');hookPanel();hookSweep();paintRail();}
 setTimeout(boot,0);setInterval(()=>{if(!on())return;let m='menu';try{m=mode;}catch{}if(m==='play'||m==='pause')return;hookPanel();hookSweep();paintRail();},1000);
 return {state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();},open,close,
  vetOn,vetLeft,vetBuy,vetDaily,vetDailyOk,exStart,exClaim,exQuick,exDone,runLeft,capLeft,quickLeft,reward,msWin,msCan,msClaim,MS,days,CAP,VET};
})();window.U3V23S=U3V23M;
