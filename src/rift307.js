'use strict';
// V307 · KHE NỨT HƯ KHÔNG (Gemini 6 hệ thống lượt 1 mục 5 + lượt 2; chủ dự án đồng ý 19/11 22:00). Tắt: window.RIFT307=false
//  • 50 tầng, mở ở ải 110, không tốn thể lực, 3 lượt/ngày — chỉ tính lượt THẮNG (thua không mất lượt).
//  • Mỗi tầng = 1 ải boss chiến dịch tương đương (tầng 1–5 → ải 110, 6–10 → 120 … 46–50 → 200) + máu quái tăng theo tầng, ~35% quái thường thành tinh anh (máu ×1,8),
//    sau 35 giây gọi Thủ Vệ Hư Không (boss của ải). Hạ Thủ Vệ = qua tầng.
//  • Tầng cao nhất quyết định CẤP RƠI CHIP 1–5 (mốc 0/10/20/35/50) thay ngưỡng ải cũ; tỉ lệ phẩm theo bảng 5 Gemini.
//    Người đang có cấp rơi cũ cao hơn được giữ (chụp 1 lần lúc mở Khe Nứt), không tụt cấp.
//  • Thưởng vượt tầng lần đầu mỗi 5 tầng · càn quét 1 lần/ngày · Rương Hư Không (chip theo cấp rơi + mảnh lõi phi công + 50 XP chip).
//  • Càn quét còn cho 2 linh kiện VKTT + 4 Thẻ EXP VKTT (tầng ≤15: loại vũ khí chủ chiến cần · 16–35: C · 36+: D).
//  • Mảnh Lõi Phi Công: cất trong kho Khe Nứt (S.core) chờ hệ Lõi phi công (việc kế tiếp).
const RIFT307={unlock:110,floors:50,free:3,warm:35,minWin:25,eliteP:.35,eliteHp:1.8,hpK:.03,
 lvAt:[0,10,20,35,50],
 // bảng 5 Gemini: tỉ lệ phẩm 7 bậc chip (Chế thức · Cải lương · Nguyên mẫu · GƯ.NM · Chiến lược · GƯ.CL · Tuyệt mật)
 qual:[[.70,.30,0,0,0,0,0],[.35,.50,.15,0,0,0,0],[0,.45,.40,.15,0,0,0],[0,0,.40,.35,.20,.05,0],[0,0,0,.30,.40,.25,.05]],
 first:[{cry:200,core:3,chest:0},{cry:350,core:5,chest:1},{cry:500,core:8,chest:1},{cry:750,core:12,chest:2},{cry:1200,core:20,chest:3}],
 sweep:[{cry:80,cr:300},{cry:120,cr:450},{cry:160,cr:600},{cry:210,cr:800},{cry:280,cr:1000}],
 sweepVk:{lk:2,th:4},
 chest:{chips:1,core:2,xp:50}};
const Rift307=(()=>{
 const C=RIFT307,KEY='saobang-rift307-v1';
 const ON=()=>window.RIFT307!==false;
 const rd=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&typeof v==='object'?v:{};}catch{return {};}};
 const S=Object.assign({v:1,best:0,day:'',used:0,swept:0,chest:0,core:0,legacy:-1,runs:0},rd());
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const T=m=>{try{toast(m);}catch{}};
 const today=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 function roll(){if(S.day!==today()){S.day=today();S.used=0;S.swept=0;save();}}
 const maxStage=()=>{try{const c=Progress.v70.cleared();return c.length?Math.max(...c):0;}catch{return 0;}};
 const unlocked=()=>maxStage()>=C.unlock||S.best>0;
 const lvOf=b=>{let k=0;C.lvAt.forEach((t,i)=>{if(b>=t)k=i;});return k;};
 const riftLv=()=>lvOf(S.best);
 const dropLv=()=>Math.max(riftLv(),S.legacy|0);
 const stageOf=f=>Math.min(200,C.unlock+10*Math.floor((Math.max(1,f)-1)/5));/* ải boss 110,120…200 (mỗi 5 tầng), startBoss chỉ chạy ở ải có boss */
 const hpMul=f=>1+C.hpK*f;
 const reqCp=f=>{try{return Math.round(Combat.stageRequirement(stageOf(f))*hpMul(f));}catch{return 0;}};
 // ---------- cấp rơi chip: sửa bảng CHIP72.drop tại chỗ (Chip72 đọc cùng đối tượng) ----------
 function applyDrop(){if(!ON()||typeof CHIP72==='undefined')return;
  if(S.legacy<0&&unlocked()){try{S.legacy=Chip72.dropLv();}catch{S.legacy=0;}save();}
  const L=dropLv();
  CHIP72.drop.forEach((d,i)=>{const q=C.qual[i]||C.qual[0];d.xp=0;d.st=i<=L?0:99999;
   if(window.CHIP23!==false&&typeof Chip72!=='undefined'&&Chip72.C23){d.q=q4(q);d.mut=[0,0,0];return;}/* V2.3 U4: 4 phẩm Lục · Lam · Tím · Cam */
   const b2=q[2]+q[3],b3=q[4]+q[5]+q[6];d.q=[q[0],q[1],b2,b3];d.mut=[b2?q[3]/b2:0,b3?(q[5]+q[6])/b3:0,(q[5]+q[6])?q[6]/(q[5]+q[6]):0];});}
 const q4=q=>[q[0]+q[1],q[2]+q[3],q[4]+q[5],q[6]];
 // ---------- trận ----------
 let run=null;
 function start(){roll();if(!ON())return;if(!unlocked()){T('MỞ Ở ẢI '+C.unlock);return;}if(S.best>=C.floors){T('ĐÃ CHINH PHỤC 50 TẦNG');return;}
  if(S.used>=C.free){T('HẾT LƯỢT HÔM NAY · MAI QUAY LẠI');return;}
  const f=S.best+1,st=stageOf(f);close();try{Nav74.closeAll();}catch{}try{Lobby.hide();ChapterMap.close();Hub40.close();}catch{}
  run={f,st,t0:performance.now(),boss:false,done:false};
  try{document.getElementById('gamemode').value='campaign';syncModeSetup();}catch{}
  try{document.getElementById('mission-select').value=String(st);reset();}catch(e){console.warn('RIFT307 start',e);}
  if(typeof mode==='undefined'||mode!=='play'){run=null;T('CHƯA VÀO ĐƯỢC TRẬN');return;}
  S.runs++;save();T('🌀 KHE NỨT HƯ KHÔNG · TẦNG '+f);}
 // ải tương đương có thể chưa mở trong Chiến dịch → chỉ trong lúc vào trận Khe Nứt, cho phép đúng ải đó (không ghi tiến độ chiến dịch: kết thúc bằng end(false))
 try{const oc=Progress.canStart;Progress.canStart=function(n){try{if(run&&!run.done&&Number(n)===run.st)return true;}catch{}return oc.apply(this,arguments);};}catch{}
 // quái trong Khe Nứt: máu theo tầng + một phần thành tinh anh
 try{const oa=addEnemy;const fn=function(e){const r=oa.apply(this,arguments);try{if(run&&!run.done&&e&&!e.__r307&&!e.bossPart&&e!==boss){e.__r307=1;let m=hpMul(run.f);
   if(!e.elite&&!e.large&&!e.rescue28&&Math.random()<C.eliteP){e.elite=true;m*=C.eliteHp;}e.hp*=m;e.maxHp=e.hp;if(e.guard)e.guard*=m;}}catch{}return r;};window.addEnemy=fn;try{addEnemy=fn;}catch{}}catch{}
 function tick(){if(!run)return;if(typeof mode==='undefined')return;
  if(mode!=='play'&&mode!=='pause'){if(!run.done){run.done=true;T('KHE NỨT · CHƯA QUA TẦNG '+run.f+' · KHÔNG MẤT LƯỢT');}run=null;return;}
  if(mode==='pause')return;const el=(performance.now()-run.t0)/1000;
  if(!run.boss&&boss&&!boss.__r307){boss.__r307=1;run.boss=true;const m=hpMul(run.f);if(boss.max)boss.max*=m;if(boss.maxHp)boss.maxHp*=m;boss.hp*=m;try{flashBanner&&flashBanner('THỦ VỆ HƯ KHÔNG');}catch{}}
  if(!boss&&el>=C.warm&&!run.called){run.called=true;enemies=enemies.filter(e=>e.elite);try{startBoss();}catch{}}
  if(boss&&boss.defeatStarted&&!run.done&&el>=C.minWin){run.done=true;const r=run;run=null;win(r.f);setTimeout(()=>{try{end(false);}catch{}setTimeout(()=>{try{End78.goLobby();}catch{}try{document.body.classList.remove('res78');}catch{}const hide=()=>document.querySelectorAll('.ux75d').forEach(e=>e.hidden=true);[200,600,1000,1500].forEach(t=>setTimeout(hide,t));setTimeout(()=>result(r.f),1100);},350);},900);/* end(false) để không ghi tiến độ chiến dịch → đóng ngay màn thất bại, về sảnh */}}
 setInterval(()=>{try{tick();}catch{}},200);
 let last=null;
 function win(f){roll();S.used++;const out={f,cry:0,core:0,chest:0,first:false,lv0:dropLv()};
  if(f>S.best){S.best=f;out.first=true;if(f%5===0){const row=C.first[lvOf(f)];out.cry+=row.cry;out.core+=row.core;out.chest+=row.chest;}}
  if(out.cry)try{Ult72.X.crystal(out.cry);}catch{}S.core+=out.core;S.chest+=out.chest;save();applyDrop();out.lv1=dropLv();last=out;}
 function result(f){const o=last||{f};open();const box=el.querySelector('.r307-res');if(!box)return;
  box.innerHTML=`<b style="display:block;color:#46ffb2;font-size:14px">✓ QUA TẦNG ${f}</b>${o.first&&f%5===0?`<small style="display:block">Thưởng mốc: +${fmt(o.cry)} tinh thể chip · +${o.core} mảnh lõi phi công${o.chest?' · +'+o.chest+' Rương Hư Không':''}</small>`:'<small style="display:block">Mốc thưởng mỗi 5 tầng</small>'}${o.lv1>o.lv0?`<b style="display:block;color:#ffd56a">CẤP RƠI CHIP ${o.lv0+1} → ${o.lv1+1}</b>`:''}`;box.hidden=false;}
 // ---------- càn quét / rương ----------
 function sweep(){roll();if(S.best<1){T('QUA ÍT NHẤT 1 TẦNG ĐỂ CÀN QUÉT');return false;}if(S.swept){T('HÔM NAY ĐÃ CÀN QUÉT');return false;}
  const row=C.sweep[riftLv()];S.swept=1;save();try{Ult72.X.crystal(row.cry);}catch{}try{Progress.grantCredits(row.cr);}catch{}
  const k=S.best<=15?undefined:S.best<=35?'C':'D';try{Ult72.give({c:C.sweepVk.lk,k,th:C.sweepVk.th});}catch{}
  T('CÀN QUÉT · +'+row.cry+' TINH THỂ CHIP · +'+fmt(row.cr)+' ◈ · +'+C.sweepVk.lk+' LINH KIỆN · +'+C.sweepVk.th+' THẺ EXP VKTT');return true;}
 function openChest(){if(S.chest<1)return false;let chips=[];try{for(let i=0;i<C.chest.chips;i++){const c=Chip72.gen();Chip72._give(c);chips.push(c);}}catch{}
  S.chest--;S.core+=C.chest.core;save();try{const st=Chip72.state();Chip72._set({xp:(st.xp|0)+C.chest.xp});}catch{}
  let q='';try{q=chips.map(c=>CHIP72.q[c.q].n).join(', ');}catch{}T('RƯƠNG HƯ KHÔNG · CHIP '+(q||'?').toUpperCase()+' · +'+C.chest.core+' MẢNH LÕI PHI CÔNG');return true;}
 // ---------- giao diện ----------
 let el=null;
 function build(){el=document.createElement('div');el.className='m63 adv69 r307';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-r]');if(!t){if(e.target===el)close();return;}const a=t.dataset.r;
   if(a==='x')close();else if(a==='go')start();else if(a==='sw'){sweep();render();}else if(a==='ch'){openChest();render();}});}
 function close(){if(el)el.hidden=true;}
 function render(){roll();applyDrop();const f=Math.min(C.floors,S.best+1),L=dropLv(),RL=riftLv(),nxt=C.lvAt.find(t=>t>S.best);
  const left=Math.max(0,C.free-S.used),done=S.best>=C.floors;let cp=0;try{cp=Combat.stats().cp;}catch{}const rq=reqCp(f);
  const ms=Math.ceil(f/5)*5,row=C.first[lvOf(ms)];
  const lvRows=C.lvAt.map((t,i)=>{const q=((typeof Chip72!=='undefined'&&Chip72.C23)?q4(C.qual[i]):C.qual[i]).map((v,j)=>v?(CHIP72.q[j].n+' '+Math.round(v*100)+'%'):'').filter(Boolean).join(' · ');
   return `<div class="adv-s ${i===L?'r307-on':''}"><div><b>Cấp rơi ${i+1}${i===L?' · ĐANG Ở':''}</b><small>${i?'Vượt tầng '+t:'Mặc định'} · ${q}</small></div>${i<=L?'<em>✓</em>':'<em class="no">🔒</em>'}</div>`;}).join('');
  el.innerHTML=`<div class="m63-card adv-card r307-card"><div class="m63-eye">KHE NỨT HƯ KHÔNG</div>
   <div style="display:flex;gap:10px;margin:6px 0 4px"><div style="flex:1;padding:8px 10px;border:1px solid #7b5cff66;border-radius:8px;background:#1a1240aa"><small style="display:block;font-size:11px;opacity:.8">TẦNG CAO NHẤT</small><b style="font-size:20px;color:#c9a2ff">${S.best}/${C.floors}</b></div><div style="flex:1;padding:8px 10px;border:1px solid #ffd56a55;border-radius:8px;background:#2a2410aa"><small style="display:block;font-size:11px;opacity:.8">CẤP RƠI CHIP</small><b style="font-size:20px;color:#ffd56a">${L+1}</b><small style="font-size:11px;opacity:.75"> / 5</small></div></div>
   <p class="adv-sub" style="margin:2px 0 8px;font-size:12px;opacity:.9">Lượt hôm nay <b>${left}/${C.free}</b> (thua không mất lượt) · Lực chiến <b>${fmt(cp)}</b> · Mảnh lõi phi công <b>${S.core}</b> <small style="opacity:.7">(dùng ở hệ Lõi phi công sắp mở)</small>${L>RL?' · <small style="opacity:.7">giữ cấp rơi cũ '+(L+1)+'</small>':''}</p>
   <div class="r307-res" hidden style="margin:6px 0;padding:8px 10px;border:1px solid #46ffb266;border-radius:8px;background:#0d2a22cc;font-size:12px;line-height:1.5"></div>
   ${done?'<p class="adv-cost">Đã chinh phục cả 50 tầng.</p>':`<div class="adv-s r307-next"><div><b>TẦNG ${f}</b><small>Tương đương ải ${stageOf(f)} · máu quái ×${hpMul(f).toFixed(2).replace('.',',')} · lực chiến đề nghị ${fmt(rq)}${nxt?' · tầng '+nxt+' mở cấp rơi '+(lvOf(nxt)+1):''}</small><small>Mốc tầng ${ms}: +${fmt(row.cry)} tinh thể chip · +${row.core} mảnh lõi phi công${row.chest?' · +'+row.chest+' Rương Hư Không':''}</small></div><button data-r="go" ${left?'':'disabled'} class="${cp>=rq*.85?'':'weak'}">${left?'KHIÊU CHIẾN':'HẾT LƯỢT'}</button></div>`}
   <div class="adv-s"><div><b>Càn quét ngày</b><small>+${C.sweep[RL].cry} tinh thể chip · +${fmt(C.sweep[RL].cr)} ◈ · +${C.sweepVk.lk} linh kiện VKTT · +${C.sweepVk.th} Thẻ EXP VKTT</small></div>${S.swept?'<em>ĐÃ NHẬN</em>':`<button data-r="sw" ${S.best?'':'disabled'}>CÀN QUÉT</button>`}</div>
   <div class="adv-s"><div><b>Rương Hư Không · ${S.chest}</b><small>1 chip theo cấp rơi hiện tại · +${C.chest.core} mảnh lõi phi công · +${C.chest.xp} XP chip</small></div><button data-r="ch" ${S.chest?'':'disabled'}>MỞ</button></div>
   <div class="adv-req-t">CẤP RƠI CHIP (sản xuất chip &amp; Rương Hư Không)</div><div class="adv-src">${lvRows}</div>
   <div class="adv-btns"><button class="adv-x" data-r="x">ĐÓNG</button></div></div>`;}
 function open(){if(!ON())return;if(!el)build();render();el.hidden=false;}
 setTimeout(()=>{try{applyDrop();}catch{}},1500);setInterval(()=>{try{applyDrop();}catch{}},15000);
 return {open,close,start,sweep,openChest,dropLv,riftLv,stageOf,hpMul,unlocked,open_:()=>unlocked(),dot:()=>{roll();return unlocked()&&(!S.swept&&S.best>0||S.chest>0||S.used<C.free);},state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();applyDrop();},_run:()=>run,C};
})();
