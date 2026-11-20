'use strict';
// V307 · LÕI PHI CÔNG (Gemini 6 hệ thống lượt 2 bảng 2; chủ dự án đồng ý 20/11 07:33). Tắt: window.CORE307=false
//  • 8 lõi = 8 phi công. Lõi của phi công X có (Lv1) khi đã chiêu mộ X.
//  • Phi công CHÍNH có 4 ô lõi (mỗi phi công chính một bộ lắp riêng): ô 1 sẵn · ô 2 bậc Lam · ô 3 bậc Tím · ô 4 bậc Tím+5 hoặc qua ải 140.
//    Không lắp lõi của chính phi công đang làm phi công chính.
//  • Lõi Lv1→5: phi công chính nhận 4,5/6,3/8,1/9,9/11,25 % chỉ số (Gemini 10→25 % co theo trần CP) (công, máu, khiên nền) của phi công chủ lõi (cộng trong Pilot67 teamStats → CP + trận)
//    + hiệu ứng riêng theo nghề (bảng dưới, nội suy Lv1 → Lv5).
//  • Nâng Lv: [5,10,20,35] mảnh lõi cùng loại + [500,1.200,2.500,5.000] ◈; thiếu mảnh cùng loại thì dùng Mảnh Lõi tự chọn (rơi ở Khe Nứt Hư Không).
//  • Mở ở ải 125 (lộ trình Gemini). Mảnh lõi rơi ở Khe Nứt (tự chọn) — mùa giải / đổi điểm Tháp Boss: chưa làm.
const CORE307={unlock:125,pct:[.045,.063,.081,.099,.1125],/* Gemini 10/14/18/22/25 % co ×0,456: đo 4 lõi Lv5 (phi công Tím+5 cấp 60) = +3.073 CP, mục tiêu Gemini ~1.400 CP */cost:[[5,500],[10,1200],[20,2500],[35,5000]],slotTier:[0,2,6,11],slot4Stage:140,
 fx:{1:{a:[4,.2],b:[12,.6],t:v=>`Nạp Bạo Tẩu +${v[0]}% · thời gian Bạo Tẩu +${v[1].toFixed(1).replace('.',',')} giây`},
     2:{a:[3],b:[9],t:v=>`Sát thương trang bị (tên lửa, tàu con, nổ vùng) +${v[0]}%`},
     3:{a:[1],b:[3],t:v=>`Khiên nội tại hồi nhanh hơn ${v[0].toFixed(1).replace('.',',')} giây`},
     4:{a:[2,4],b:[6,12],t:v=>`Sát thương lên boss +${v[0]}% · sát thương chí mạng +${v[1]}%`},
     5:{a:[8],b:[25],t:v=>`Bán kính hút vật phẩm +${v[0]}% · Vô tận: mỗi 15 đợt hồi 1 máu (tối đa 2 lần/trận)`},
     6:{a:[3],b:[8],t:v=>`Nhặt tăng lực hoặc vào Bạo Tẩu: +${v[0]}% tỉ lệ chí mạng 4 giây`},
     7:{a:[10,4],b:[30,12],t:v=>`Làm chậm / đóng băng lâu hơn ${v[0]}% · địch bị làm chậm chịu thêm ${v[1]}% sát thương`},
     8:{a:[4],b:[12],t:v=>`Sát thương lên địch dưới 40% máu +${v[0]}%`}}};
const Core307=(()=>{
 const C=CORE307,KEY='saobang-core307-v1';
 const ON=()=>window.CORE307!==false;
 const rd=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&typeof v==='object'?v:{};}catch{return {};}};
 const S=Object.assign({v:1,lv:{},sh:{},lo:{}},rd());S.lv=S.lv||{};S.sh=S.sh||{};S.lo=S.lo||{};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const T=m=>{try{toast(m);}catch{}};const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const ps=()=>{try{return Pilot67.state();}catch{return {own:{},team:[]};}};
 const P=id=>PILOTS67.find(p=>p.id===+id);
 const maxStage=()=>{try{const c=Progress.v70.cleared();return c.length?Math.max(...c):0;}catch{return 0;}};
 const unlocked=()=>ON()&&maxStage()>=C.unlock;
 const owned=id=>!!ps().own[id];
 const lvOf=id=>owned(id)?Math.max(1,S.lv[id]|0):0;
 const mainId=()=>{try{return Pilot67.main();}catch{return null;}};
 const slots=m=>{if(!m)return 0;let t=0;try{t=Pilot67.tierOf(m);}catch{}let n=0;C.slotTier.forEach((need,i)=>{if(t>=need||(i===3&&maxStage()>=C.slot4Stage))n=i+1;});return n;};
 const lo=m=>{const a=(S.lo[m]||[null,null,null,null]).slice(0,4);while(a.length<4)a.push(null);return a;};
 const active=()=>{if(!unlocked())return [];const m=mainId();if(!m)return [];const n=slots(m);return lo(m).slice(0,n).filter(id=>id&&id!==m&&owned(id));};
 const val=(id,lv)=>{const f=C.fx[id];if(!f||!lv)return null;const k=(lv-1)/4;return f.a.map((a,i)=>a+(f.b[i]-a)*k);};
 const fxv=(id,i)=>{if(!active().includes(id))return 0;const v=val(id,lvOf(id));return v?v[i]:0;};
 const rift=()=>{try{return Rift307.state().core|0;}catch{return 0;}};
 const useRift=n=>{try{const s=Rift307.state();Rift307._set({core:Math.max(0,(s.core|0)-n)});}catch{}};
 // ---- chỉ số kế thừa (gọi từ Pilot67.teamStats) ----
 function add(m,base){const o={atk:0,hp:0,sh:0};try{if(!unlocked()||!m)return o;for(const id of active()){const b=base(id),p=C.pct[lvOf(id)-1]||0;o.atk+=b.atk*p;o.hp+=b.hp*p;o.sh+=b.sh*p;}}catch{}return o;}
 // ---- thao tác ----
 function upgrade(id){if(!owned(id)){T('CHƯA CHIÊU MỘ PHI CÔNG NÀY');return false;}const lv=lvOf(id);if(lv>=5){T('LÕI ĐÃ TỐI ĐA');return false;}
  const [need,cr]=C.cost[lv-1],own=S.sh[id]|0,gen=rift();if(own+gen<need){T('THIẾU MẢNH LÕI · '+(own+gen)+'/'+need);return false;}
  if(Progress.balance()<cr){T('THIẾU HỢP KIM · cần '+fmt(cr)+' ◈');return false;}if(!Progress.spendCredits(cr))return false;
  const a=Math.min(own,need);S.sh[id]=own-a;if(need-a>0)useRift(need-a);S.lv[id]=lv+1;save();T('LÕI '+P(id).name.toUpperCase()+' · LV '+(lv+1));return true;}
 function equip(slot,id){const m=mainId();if(!m)return false;if(slot>=slots(m)){T('Ô CHƯA MỞ');return false;}if(id&&(id===m||!owned(id)))return false;
  const a=lo(m);const j=id?a.indexOf(id):-1;if(j>=0)a[j]=a[slot];a[slot]=id||null;S.lo[m]=a;save();return true;}
 // ---- hiệu ứng trong trận ----
 const playing=()=>typeof mode!=='undefined'&&mode==='play';
 // sát thương thêm lên quái thường (sau mỗi phát trúng): Hạ Vy (trang bị), Hàn Sương (địch bị làm chậm), Tử Dạ (dưới 40% máu)
 try{const fd=Feedback31.damage;Feedback31.damage=function(e,amount,s){const r=fd.apply(this,arguments);try{if(playing()&&ON()&&e&&!e.dead&&e!==boss&&!e.bossPart&&amount>0){let m=0;
   if(s&&(s.gearKind||s.gearItem))m+=fxv(2,0)/100;if(e.frozen>0)m+=fxv(7,1)/100;if(e.hp<.4*(e.maxHp||e.hp+amount))m+=fxv(8,0)/100;
   if(m>0){const ex=amount*m;e.hp-=ex;if(e.hp<=0)try{kill(e);}catch{}}}}catch{}return r;};}catch{}
 // boss: Thiên Lam +boss, Tử Dạ dưới 40% máu
 try{const db=damageBoss;const f=function(amount,source,part){try{if(playing()&&ON()&&boss){let m=fxv(4,0)/100;const mx=boss.max||boss.maxHp||0;if(mx&&boss.hp<.4*mx)m+=fxv(8,0)/100;if(m>0)amount*=1+m;}}catch{}return db.call(this,amount,source,part);};window.damageBoss=f;try{damageBoss=f;}catch{}}catch{}
 // chí mạng: Thiên Lam (+sát thương chí mạng, nhân riêng vì CRIT66 chuẩn hóa trung bình)
 try{const os=shot;shot=function(){const r=os.apply(this,arguments);try{const sh=shots.at(-1);if(ON()&&sh&&sh.crit66&&!sh.k307){sh.k307=1;const v=fxv(4,1);if(v>0)sh.damage*=1+v/100;}}catch{}return r;};}catch{}
 // Mộc Miên: chí mạng tạm thời → quy ra sát thương kỳ vọng (Δtỉ lệ × (hệ số−1)) trong 4 giây
 let mmUntil=0;const mmF=()=>{if(performance.now()>mmUntil)return 1;let mult=2;try{mult=CRIT66.mult||2;}catch{}return 1+fxv(6,0)/100*(mult-1);};
 try{const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);try{return v*mmF();}catch{return v;}};}catch{}
 // Lâm Phương: nạp Bạo Tẩu
 try{const oc=Combat26.addCharge07;Combat26.addCharge07=function(n){try{const v=fxv(1,0);if(v>0&&n>0)n*=1+v/100;}catch{}return oc.call(this,n);};}catch{}
 // Kiều An: khiên nội tại hồi nhanh hơn (Shield78 đọc window.__core307gap)
 let prevSup=0,prevPow=0,prevWave=0,heals=0,magDone=false,frozenPrev=new WeakMap();
 try{const r0=reset;reset=function(){const r=r0.apply(this,arguments);try{heals=0;prevWave=0;magDone=false;prevSup=0;mmUntil=0;
   if(playing()&&ON()){const v=fxv(5,0);if(v>0&&typeof gear!=='undefined'&&gear.magnet){gear.magnet*=1+v/100;magDone=true;}}}catch{}return r;};}catch{}
 setInterval(()=>{try{window.__core307gap=ON()?fxv(3,0):0;if(!playing()||!ON())return;
   // Lâm Phương: kéo dài Bạo Tẩu khi vừa vào
   const st=typeof superTime!=='undefined'?superTime:0;if(st>0&&prevSup<=0){const v=fxv(1,1);if(v>0)superTime+=v;if(fxv(6,0)>0)mmUntil=performance.now()+4000;}prevSup=st;
   // Mộc Miên: nhặt tăng lực
   const pw=typeof power!=='undefined'?power:0;if(pw>prevPow&&fxv(6,0)>0)mmUntil=performance.now()+4000;prevPow=pw;
   // Hàn Sương: kéo dài làm chậm mới áp
   const k7=fxv(7,0)/100;if(k7>0)for(const e of enemies){const p=frozenPrev.get(e)||0;if(e.frozen>p+.05)e.frozen=p+(e.frozen-p)*(1+k7);frozenPrev.set(e,e.frozen||0);}
   // Bảo Ngọc: Vô tận mỗi 15 đợt hồi 1 máu (tối đa 2)
   if(fxv(5,0)>0&&typeof gameMode!=='undefined'&&gameMode==='endless'&&typeof endlessWave!=='undefined'){if(Math.floor(endlessWave/15)>Math.floor(prevWave/15)&&heals<2){heals++;hp=Math.min(maxHp,hp+1);try{hud();}catch{}}prevWave=endlessWave;}
  }catch{}},100);

 // ---- kiểu dáng ----
 (()=>{const N=':not(#_k1)'.repeat(34);const st=document.createElement('style');st.id='core307-css';st.textContent=`
 .k307c .k307-mat${N}{position:relative;height:262px;margin:6px auto 2px;max-width:300px}
 .k307c .k307-core${N}{position:absolute;left:50%;top:50%;width:88px;height:88px;margin:-44px 0 0 -44px;border-radius:50%;border:2px solid #ffd56a;box-shadow:0 0 18px #ffd56a66,inset 0 0 14px #000;background:#0b1430;overflow:hidden;display:flex;align-items:flex-end;justify-content:center}
 .k307c .k307-core>i${N}{position:absolute;inset:0;border-radius:50%;overflow:hidden}
 .k307c .k307-core>small${N}{position:relative;z-index:1;font-size:10px;background:#000a;padding:1px 6px;border-radius:6px;margin-bottom:6px;color:#ffe7a3}
 .k307c .k307-hex${N}{position:absolute;width:72px;height:80px;padding:0;margin:0;border:0;background:linear-gradient(160deg,#1b2b55,#0b1230);clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#9fb6e8;cursor:pointer;min-width:0;min-height:0;box-shadow:none}
 .k307c .k307-hex::before${N}{content:'';position:absolute;inset:3px;clip-path:inherit;background:#0a1128;z-index:0}
 .k307c .k307-hex>*${N}{position:relative;z-index:1}
 .k307c .k307-hex.on${N}{background:linear-gradient(160deg,var(--c),#ffffff55)}
 .k307c .k307-hex.on>i${N}{width:52px;height:52px;border-radius:50%;overflow:hidden;display:block;border:2px solid var(--c)}
 .k307c .k307-hex.lk${N}{opacity:.55}
 .k307c .k307-hex>span${N}{font-size:20px;line-height:1}
 .k307c .k307-hex>small${N}{font-size:9px;margin-top:2px;text-align:center;line-height:1.1;max-width:62px}
 .k307c .k307-hex:nth-of-type(1)${N}{left:calc(50% - 36px);top:0}
 .k307c .k307-hex:nth-of-type(2)${N}{right:6px;top:91px}
 .k307c .k307-hex:nth-of-type(3)${N}{left:calc(50% - 36px);bottom:0}
 .k307c .k307-hex:nth-of-type(4)${N}{left:6px;top:91px}
 .k307c .k307-row${N}{display:flex;align-items:center;gap:8px;cursor:pointer;border-left:3px solid var(--c)}
 .k307c .k307-row.k307-sel${N}{background:#2a3d7a99;outline:1px solid #ffd56a88}
 .k307c .k307-pt${N}{flex:0 0 40px;width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid var(--c);display:flex;align-items:center;justify-content:center;background:#0b1430}
 .k307c .k307-row>div${N}{flex:1;min-width:0}
 .k307c .k307-row small${N}{display:block;font-size:11px;line-height:1.35;opacity:.85}
 .k307c .k307-row>button${N}{flex:0 0 auto}
 .m63.pl67 .k307-open${N}{display:block;width:calc(100% - 24px);margin:8px 12px 4px;padding:10px;border-radius:10px;border:1px solid #ffd56a;background:linear-gradient(180deg,#3a2a6a,#1b1440);color:#ffe7a3;font-weight:800;letter-spacing:.5px}
 `;document.head.appendChild(st);})();
 // ---- giao diện ----
 let el=null,sel=null;
 const portrait=id=>{const p=P(id);if(!p)return '';try{if(PILOT_ART['p'+id])return `<img src="${PILOT_ART['p'+id]}" alt="" style="width:100%;height:100%;object-fit:cover;object-position:50% 18%;border-radius:inherit">`;}catch{}return `<b style="color:${p.col}">${p.name[0]}</b>`;};
 const tierName=t=>{try{return PILOT75.tiers[t].n;}catch{return '';}};
 function build(){el=document.createElement('div');el.className='m63 adv69 k307c';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-k]');if(!t){if(e.target===el)close();return;}const a=t.dataset.k,v=t.dataset.v;
   if(a==='x')close();else if(a==='pick'){sel=+v;render();}else if(a==='up'){upgrade(+v);render();}
   else if(a==='slot'){const m=mainId(),i=+v,cur=lo(m)[i];if(i>=slots(m)){T('Ô MỞ Ở BẬC '+tierName(C.slotTier[i])+(i===3?' HOẶC QUA ẢI '+C.slot4Stage:''));return;}if(sel&&sel!==m&&owned(sel)&&cur!==sel)equip(i,sel);else if(cur)equip(i,null);render();}});}
 function close(){if(el)el.hidden=true;}
 function render(){const m=mainId(),n=slots(m),a=lo(m),own=Object.keys(ps().own).map(Number);if(!sel||!owned(sel))sel=own.find(id=>id!==m)||own[0]||null;
  let add0={atk:0,hp:0,sh:0};try{add0=add(m,id=>Pilot67.base(id));}catch{}
  const hex=(i)=>{const id=a[i],lk=i>=n,on=id&&!lk&&id!==m;return `<button data-k="slot" data-v="${i}" class="k307-hex ${lk?'lk':''} ${on?'on':''}" style="${on?'--c:'+P(id).col:''}">${lk?`<span>🔒</span><small>${i===3?'Tím+5 / ải '+C.slot4Stage:tierName(C.slotTier[i])}</small>`:on?`<i>${portrait(id)}</i><small>Lv ${lvOf(id)}</small>`:'<span>＋</span><small>Trống</small>'}</button>`;};
  const rows=PILOTS67.map(p=>{const o=owned(p.id),lv=lvOf(p.id),v=val(p.id,Math.max(1,lv)),c=lv&&lv<5?C.cost[lv-1]:null,eq=a.slice(0,n).includes(p.id),me=p.id===m;
   return `<div class="adv-s k307-row ${sel===p.id?'k307-sel':''}" data-k="pick" data-v="${p.id}" style="--c:${p.col}"><i class="k307-pt">${portrait(p.id)}</i><div><b>Lõi ${p.name}${o?' · Lv '+lv:''}${eq?' · ĐANG LẮP':''}${me?' · phi công chính':''}</b><small>${o?'Kế thừa '+Math.round(C.pct[lv-1]*100)+'% chỉ số · ':'Chiêu mộ '+p.name+' để mở · '}${C.fx[p.id].t(v)}</small>${o?`<small>Mảnh lõi ${S.sh[p.id]|0} (+${rift()} tự chọn)${c?' · lên Lv '+(lv+1)+': '+c[0]+' mảnh · '+fmt(c[1])+' ◈':''}</small>`:''}</div>${o&&c?`<button data-k="up" data-v="${p.id}">NÂNG</button>`:o?'<em>MAX</em>':'<em class="no">🔒</em>'}</div>`;}).join('');
  el.innerHTML=`<div class="m63-card adv-card k307-card"><div class="m63-eye">LÕI PHI CÔNG</div>
   ${unlocked()?'':`<p class="adv-cost">Mở khi vượt ải ${C.unlock}. Mảnh lõi vẫn tích từ Khe Nứt Hư Không.</p>`}
   <div class="k307-mat"><div class="k307-core">${m?`<i>${portrait(m)}</i><small>${P(m).name}</small>`:'<small>Chưa có phi công chính</small>'}</div>${[0,1,2,3].map(hex).join('')}</div>
   <p class="adv-sub" style="font-size:12px;margin:4px 0 8px">Chọn lõi ở danh sách rồi chạm ô để lắp · chạm ô đang lắp để tháo. Kế thừa: công +${add0.atk.toFixed(1).replace('.',',')} · máu +${add0.hp.toFixed(1).replace('.',',')} · khiên +${add0.sh.toFixed(1).replace('.',',')}</p>
   <div class="adv-src k307-list">${rows}</div>
   <div class="adv-btns"><button class="adv-x" data-k="x">ĐÓNG</button></div></div>`;}
 function open(){if(!ON())return;if(!el)build();render();el.hidden=false;}
 // nút mở trong màn Phi công
 setInterval(()=>{try{if(!ON())return;const pl=document.querySelector('.m63.pl67:not([hidden]) .m63-card');if(!pl||pl.querySelector('.k307-open'))return;const b=document.createElement('button');b.className='k307-open';b.type='button';b.innerHTML='◈ LÕI PHI CÔNG'+(unlocked()?'':' · ải '+C.unlock);b.onclick=e=>{e.stopPropagation();open();};pl.appendChild(b);}catch{}},600);
 const giveShard=(id,n)=>{S.sh[id]=(S.sh[id]|0)+(n|0);save();};
 return {open,close,add,active,slots,lvOf,upgrade,equip,giveShard,unlocked,fxv,state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();},C};
})();
