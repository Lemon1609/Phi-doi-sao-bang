'use strict';
// V92 · Gemini REVIEW92
//  §3.1 Phá Vây: lượt có thưởng thêm bản sao Trắng/Lục/Lam ở mốc chặng 4/8/12 (không Tím) · Thưởng Chinh Phục Tuần (chặng 12, 1 lần/tuần từ thứ Hai)
//  §4.1 Bậc hạng Vô tận theo mùa S77 (14 ngày, cùng mã mùa với S77): xếp theo kỷ lục điểm 1 lượt Vô tận trong mùa; hết mùa tự gửi quà
//       (◈, Bụi Tinh Vân, vé càn quét, bản sao) — không đá nâng cấp, không 💎. Khung danh hiệu: chưa có tranh → chỉ hiện tên hạng.
//  §4.2 Đặc quyền thành tựu theo tổng sao ★ đã nhận ở bảng Thành tựu (12 dòng, tối đa 39★).
//  Tắt: window.V92=false
const V92CFG={
 bk:{key:'saobang-bk78-weekly92',
  daily:{4:[[0,1],[1,.30]],8:[[1,1],[2,.25]],12:[[1,1],[2,.50]]},   // [bậc bản sao, tỉ lệ]: 0 Trắng · 1 Lục · 2 Lam
  weekly:{blue:1,purple:.15,alloy:20000}},
 rank:{key:'saobang-endless-rank92',
  tiers:[{id:'bronze',n:'Đồng',ic:'🥉',min:0,r:{alloy:15000,dust:100,tk:3,cp:[[1,1]]}},
   {id:'silver',n:'Bạc',ic:'🥈',min:60000,r:{alloy:30000,dust:250,tk:5,cp:[[1,2]]}},
   {id:'gold',n:'Vàng',ic:'🥇',min:150000,r:{alloy:50000,dust:500,tk:8,cp:[[2,1]]}},
   {id:'platinum',n:'Bạch Kim',ic:'💠',min:350000,r:{alloy:80000,dust:900,tk:12,cp:[[2,2]]}},
   {id:'diamond',n:'Kim Cương',ic:'💎',min:750000,r:{alloy:120000,dust:1500,tk:20,cp:[[6,1]]}}]},
 perks:{key:'saobang-ach-perks92',
  tiers:[{s:6,n:'Tân Tinh',d:'+10 thể lực tối đa (130 🔋) · +2 lượt càn quét miễn phí/ngày (12)'},
   {s:12,n:'Tiên Phong',d:'Giảm 8% ◈ khi nâng cấp trang bị · hồi 1 🔋 mỗi 4 phút 30 giây'},
   {s:20,n:'Chỉ Huy',d:'+20 thể lực tối đa (140 🔋) · hồi chiêu Vũ khí tối thượng và bom thời gian/lưới −2 giây'},
   {s:28,n:'Thống Soái',d:'15 lượt càn quét miễn phí/ngày · +1 hồi sinh miễn phí/ngày · hồi sinh trả phí 200 ◈'},
   {s:36,n:'Huyền Thoại',d:'+12% ◈ nhặt và nhận trong trận · +1 lượt Vòng quay miễn phí/ngày'}]}};
const V92=(()=>{
 const on=()=>window.V92!==false;
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');const T=m=>{try{toast(m);}catch{}};
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const vn=()=>new Date(Date.now()+7*3600000);const day=()=>vn().toISOString().slice(0,10);
 const week=()=>{const d=vn();const k=(d.getUTCDay()+6)%7;d.setUTCDate(d.getUTCDate()-k);return d.toISOString().slice(0,10);};
 const ld=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')||{};}catch{return {};}};
 const sv=(k,o)=>{try{localStorage.setItem(k,JSON.stringify(o));}catch{}};
 const TN=['Trắng','Lục','Lam','','','','Tím'];
 // ---------- bản sao ngẫu nhiên: 50% chiến cơ đã có, 50% trang bị bộ theo tiến độ ----------
 function giveCopy(t){try{if(!(window.Evo82&&Evo82.on()))return '';let cl=0;try{cl=Progress.getState().cleared.length;}catch{}
   if(Math.random()<.5){const own=[];for(let i=0;i<13;i++)try{if(Campaign36.ownsCraft(i))own.push(i);}catch{}const m=own.length?own[Math.floor(Math.random()*own.length)]:0;
    Evo82.addCopy('craft',m,t,1,true);let nm='chiến cơ';try{nm=crafts[m].name;}catch{}return 'Bản sao '+TN[t]+' Lv1 · '+nm;}
   const si=Math.max(1,Math.min(12,Math.ceil(cl/20)||1));const set=Campaign36.sets[si]||Campaign36.sets[1];const m=set[Math.floor(Math.random()*set.length)];
   Evo82.addCopy('gear',m,t,1,true);let nm=m;try{nm=GearCatalog[m].name;}catch{}return 'Bản sao '+TN[t]+' Lv1 · '+nm;}catch{return '';}}
 // =================== §3.1 Phá Vây ===================
 let BW=ld(V92CFG.bk.key);
 window.BKR92=function(reached,win,paid){if(!on())return [];const out=[];
  if(paid){const ms=reached>=12?12:reached>=8?8:reached>=4?4:0;const L=V92CFG.bk.daily[ms];if(L)for(const [t,p] of L)if(Math.random()<p){const x=giveCopy(t);if(x)out.push('+'+x);}}
  if(win&&BW.w!==week()){BW={w:week()};sv(V92CFG.bk.key,BW);const W=V92CFG.bk.weekly;const t=Math.random()<W.purple?6:2;const x=giveCopy(t);if(x)out.push('🏆 Chinh Phục Tuần: +'+x);try{Progress.grantCredits(W.alloy);}catch{}out.push('🏆 Chinh Phục Tuần: +'+fmt(W.alloy)+' ◈');}
  return out;};
 function bkNote(){for(const p of document.querySelectorAll('.m63:not([hidden]) p.v75-s')){if(!/Lượt có thưởng hôm nay/.test(p.textContent)||p.querySelector('.bkw92'))continue;
  const s=document.createElement('span');s.className='bkw92';s.style.cssText='display:block;margin-top:4px;color:#ffd36a';s.textContent='🏆 Thưởng Chinh Phục Tuần (chặng 12): '+(BW.w===week()?'ĐÃ NHẬN':'CHƯA NHẬN')+' · bản sao Lam Lv1 (15% thành Tím) + 20.000 ◈';p.appendChild(s);}}
 // =================== §4.1 Bậc hạng Vô tận ===================
 const sid=()=>{try{return Math.floor(Date.now()/SEASON_CONFIG_V77.CYCLE_MS);}catch{return Math.floor(Date.now()/(14*864e5));}};
 let RK=Object.assign({sid:sid(),best:0},ld(V92CFG.rank.key));
 const tierOf=b=>{let t=V92CFG.rank.tiers[0];for(const x of V92CFG.rank.tiers)if(b>=x.min)t=x;return t;};
 function grantR(r){const out=[];try{Progress.grantCredits(r.alloy);out.push(fmt(r.alloy)+' ◈');}catch{}try{Dust67.add(r.dust);out.push(r.dust+' Bụi Tinh Vân');}catch{}try{V75.addTk(r.tk);out.push(r.tk+' 🎫');}catch{}
  for(const [t,n] of r.cp)for(let i=0;i<n;i++){const x=giveCopy(t);if(x)out.push(x);}return out;}
 function rollSeason(){const id=sid();if(RK.sid>=id)return;const old=RK;RK={sid:id,best:0};sv(V92CFG.rank.key,RK);
  if(old.played){const t=tierOf(old.best|0);const got=grantR(t.r);try{if(window.FR93&&FR93.give(t.id))got.push('Khung '+t.n);}catch{}setTimeout(()=>T('🏁 HẾT MÙA VÔ TẬN · Hạng '+t.n+' · '+got.join(' · ')),1500);}}
 function recordEndless(sc){if(!on())return;rollSeason();RK.played=1;if(sc>(RK.best|0))RK.best=Math.round(sc);sv(V92CFG.rank.key,RK);}
 let endH=false;function hookEnd(){if(endH||typeof end!=='function')return;endH=true;const o=end;const f=function(){let gm='',sc=0;try{gm=gameMode;sc=score;}catch{}const r=o.apply(this,arguments);try{if(gm==='endless'&&sc>0)recordEndless(sc);}catch{}return r;};window.end=f;try{end=f;}catch{}}
 function rankHtml(){const t=tierOf(RK.best|0),i=V92CFG.rank.tiers.indexOf(t),nx=V92CFG.rank.tiers[i+1];const left=Math.max(0,(RK.sid+1)*(SEASON_CONFIG_V77.CYCLE_MS)-Date.now());
  const r=t.r;return `<div class="rk92" style="margin:8px 0;padding:8px;border:1px solid #3e6f98;border-radius:8px;background:rgba(8,24,44,.85);font-size:11px;color:#dcecff">
   <b style="font-size:12px">${t.ic} HẠNG VÔ TẬN MÙA NÀY: ${esc(t.n.toUpperCase())}</b> <small>· còn ${Math.ceil(left/864e5)} ngày</small><br>
   Kỷ lục 1 lượt: <b>${fmt(RK.best|0)}</b> điểm${nx?` · lên ${esc(nx.n)} ở ${fmt(nx.min)}`:' · hạng cao nhất'}<br>
   Quà hết mùa (tự gửi): ${fmt(r.alloy)} ◈ · ${r.dust} Bụi Tinh Vân · ${r.tk} 🎫 · ${r.cp.map(([t,n])=>n+' bản sao '+TN[t]+' Lv1').join(' · ')}${RK.played?'':' <i>(cần chơi ít nhất 1 lượt Vô tận)</i>'}
   <div style="display:flex;gap:3px;margin-top:5px">${V92CFG.rank.tiers.map(x=>{const fi=window.FR93&&FR93.img(x.id);return `<span style="flex:1;text-align:center;padding:3px 0;border-radius:5px;background:${x===t?'#1f5a8a':'rgba(255,255,255,.05)'};font-size:10px">${fi?`<img src="${fi}" alt="" style="width:34px;height:34px;display:block;margin:0 auto">`:x.ic+'<br>'}${fmt(x.min/1000)}k</span>`;}).join('')}</div>${window.FR93?`<small style="display:block;margin-top:4px;color:#9fc0da">Hạng Vàng trở lên tặng khung ảnh phi công (đeo tự động ở Sảnh, khung cao nhất đã có).</small>`:''}</div>`;}
 function rankUI(){const el=document.querySelector('.s77p:not([hidden])');if(!el||el.querySelector('.rk92'))return;const h=el.querySelector('.s77-hd');if(!h)return;rollSeason();const d=document.createElement('div');d.innerHTML=rankHtml();h.before(d.firstElementChild);}
 // =================== §4.2 Đặc quyền thành tựu ===================
 let PK=Object.assign({wd:'',rv:{d:'',n:0}},ld(V92CFG.perks.key));const svP=()=>sv(V92CFG.perks.key,PK);
 function stars(){try{const a=Meta40.state().S.ach||{};let n=0;for(const k in a)n+=a[k]|0;return n;}catch{return 0;}}
 let tC=-1,tV=0;function tier(){if(!on())return 0;const n=performance.now();if(n-tC<1500)return tV;tC=n;const s=stars();let t=0;V92CFG.perks.tiers.forEach((x,i)=>{if(s>=x.s)t=i+1;});tV=t;return t;}
 window.SWEEP92=()=>{const t=tier();return t>=4?15:t>=1?12:10;};
 window.GDISC92=()=>tier()>=2?.92:1;
 window.REVC92=()=>tier()>=4?200:300;
 window.REVFREE92=use=>{if(tier()<4)return false;const d=day();if(PK.rv.d!==d)PK.rv={d,n:0};if(PK.rv.n>=1)return false;if(use){PK.rv.n++;svP();}return true;};
 function hookStamina(){try{const E=PLAN75.ENERGY;if(E.__p92)return;E.__p92=1;const M=E.MAX,R=E.REGEN_MIN;
   Object.defineProperty(E,'MAX',{get:()=>{const t=tier();return M+(t>=3?20:t>=1?10:0);},configurable:true});
   Object.defineProperty(E,'REGEN_MIN',{get:()=>tier()>=2?R-.5:R,configurable:true});}catch{}}
 let ultBase=null;function ultPerk(){try{const C=Ult72.C;if(!ultBase){ultBase={u:C.ultCd,w:C.sk.world.cd.slice(),b:C.sk.web.cd.slice()};}const k=tier()>=3?2:0;
   C.ultCd=Math.max(1,ultBase.u-k);C.sk.world.cd=ultBase.w.map(v=>v-k);C.sk.web.cd=ultBase.b.map(v=>v-k);}catch{}}
 let gcH=false;function hookCredits(){if(gcH)return;try{const o=Progress.grantCredits;gcH=true;Progress.grantCredits=function(n){try{let m='';try{m=mode;}catch{}if(n>0&&tier()>=5&&(m==='play'||m==='reward'||m==='over'))n=Math.round(n*1.12);}catch{}return o.call(this,n,...[].slice.call(arguments,1));};}catch{}}
 function wheelPerk(){if(tier()<5)return;const d=day();if(PK.wd===d)return;PK.wd=d;svP();try{Econ74.addSpin(1);}catch{}}
 function perkUI(){const rows=document.querySelectorAll('.ach');if(!rows.length)return;const box=rows[0].parentElement;if(!box||box.querySelector('.pk92'))return;const s=stars(),t=tier();
  const d=document.createElement('div');d.className='pk92';d.style.cssText='margin:0 0 8px;padding:8px;border:1px solid #6a4fb0;border-radius:8px;background:rgba(28,14,52,.85);font-size:11px;color:#eadcff';
  d.innerHTML=`<b style="font-size:12px">✦ ĐẶC QUYỀN THÀNH TỰU · ${s}★</b><small> (mỗi mốc thành tựu đã nhận = 1★)</small>`+V92CFG.perks.tiers.map((x,i)=>`<div style="margin-top:4px;opacity:${i<t?1:.55}"><b style="color:${i<t?'#7dffb2':'#c9b8ff'}">${i<t?'✓':'🔒'} ${x.s}★ · ${esc(x.n)}</b> — ${esc(x.d)}</div>`).join('');
  box.insertBefore(d,rows[0]);}
 // =================== vòng lặp ===================
 function boot(){hookEnd();hookStamina();hookCredits();rollSeason();}
 boot();setTimeout(boot,800);setTimeout(boot,3000);
 setInterval(()=>{if(!on())return;try{bkNote();}catch{}try{rankUI();}catch{}try{perkUI();}catch{}try{ultPerk();}catch{}try{wheelPerk();}catch{}},700);
 return {stars,tier,rank:()=>({...RK,tier:tierOf(RK.best|0).n}),_rank:o=>{Object.assign(RK,o);sv(V92CFG.rank.key,RK);},_bw:()=>BW,giveCopy,rollSeason,CFG:V92CFG};
})();
window.V92=V92;
