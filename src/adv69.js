'use strict';
// V69 · ĐỘT PHÁ (thay Cường hóa) theo game gốc — người dùng chốt 22/10/2026:
//  • Trang bị / chiến cơ thường: đạt trần level → ĐỘT PHÁ +1. Mỗi bậc cần 4 loại nguyên liệu khác nhau, nguyên liệu có 3 bậc màu
//    Lục / Lam / Tím theo bậc đột phá; bậc cao cần thêm mảnh của chính món đó; tốn hợp kim. Nguyên liệu rơi ở ải mini-boss & boss.
//  • SSS (trang bị SSS + siêu chiến cơ SSS): nguyên liệu riêng "Tinh Hạch Siêu Việt" rơi ở màn khó (Nguyệt Thực, Chương 9);
//    đột phá ★1→★10, bậc càng cao càng tốn.
//  SỐ LIỆU TẠM (chờ Gemini cân: PROMPT_GEMINI_DOT_PHA_V69.md) — chỉ cần thay bảng ADV69 / DROP69.
const MAT69={
 types:[{id:'alloy',n:'Lõi Hợp Kim'},{id:'crystal',n:'Tinh Thể Năng Lượng'},{id:'circuit',n:'Mạch Lượng Tử'},{id:'plasma',n:'Sợi Plasma'}],
 tiers:[{n:'Lục',c:'#3ee08f'},{n:'Lam',c:'#3aa8ff'},{n:'Tím',c:'#b45cff'}],
 sss:{id:'sss_core',n:'Tinh Hạch Siêu Việt',c:'#ffb43a'}};
const ADV69={
 // mỗi dòng = đột phá lên +n: t = bậc màu (1 Lục, 2 Lam, 3 Tím), q = số lượng 4 loại [alloy,crystal,circuit,plasma], f = mảnh của món, c = hợp kim
 gear:[{t:1,q:[2,2,2,2],f:0,c:1500},{t:1,q:[4,4,3,3],f:0,c:3000},{t:2,q:[3,3,3,3],f:6,c:6000},{t:2,q:[5,5,4,4],f:9,c:10000},{t:3,q:[4,4,4,4],f:12,c:16000}],
 craft:[{t:1,q:[3,3,3,3],f:0,c:2000},{t:1,q:[5,5,5,5],f:2,c:4000},{t:2,q:[4,4,4,4],f:6,c:8000},{t:2,q:[6,6,6,6],f:9,c:12000},{t:3,q:[5,5,5,5],f:12,c:18000}],
 // SSS ★1..★10: số Tinh Hạch, hợp kim; mỗi ★ +4% sát thương món đó (siêu chiến cơ: +5% toàn bộ sát thương)
 sss:[{k:10,c:10000},{k:15,c:15000},{k:20,c:20000},{k:30,c:26000},{k:40,c:32000},{k:55,c:40000},{k:70,c:48000},{k:90,c:58000},{k:115,c:70000},{k:140,c:85000}],
 sssGear:.04,sssShip:.05};
const DROP69={
 // bảng bậc màu theo chương (1..9): xác suất [Lục, Lam, Tím]
 tier:[[1,0,0],[1,0,0],[.7,.3,0],[.55,.45,0],[.3,.5,.2],[.2,.5,.3],[0,.5,.5],[0,.4,.6],[0,.2,.8]],
 mini:2,boss:4,qty:ch=>1+Math.floor((ch-1)/3),sweepK:.5,normalChance:.25,
 sss:{ecl:[1,2,3],ch9:[2,3,5],eclSweep:window.ECON203===false?[1,1,2]:[1,2,3]/* V203 */}};  // [ải thường, mini-boss, boss]
const Adv69=(()=>{
 const KEY='saobang-adv69-v1';
 const LS={get(d){try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&typeof v==='object'?v:d;}catch{return d;}},set(v){try{localStorage.setItem(KEY,JSON.stringify(v));}catch{}}};
 const S=Object.assign({m:{},star:{}},LS.get({}));S.m=S.m||{};S.star=S.star||{};
 const save=()=>LS.set(S);
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const mid=(type,t)=>type+t;
 const have=id=>S.m[id]|0;
 function add(id,n){n=n|0;if(!n)return;S.m[id]=Math.max(0,have(id)+n);save();}
 const matName=id=>{if(id===MAT69.sss.id)return MAT69.sss.n;const t=+id.slice(-1),ty=MAT69.types.find(x=>x.id===id.slice(0,-1));return (ty?ty.n:id)+' '+(MAT69.tiers[t-1]?.n||'');};
 const matCol=id=>id===MAT69.sss.id?MAT69.sss.c:(MAT69.tiers[(+id.slice(-1))-1]?.c||'#fff');
 // ---------- icon (tạm vẽ bằng canvas; có tranh GPT thì dùng MAT69_ART) ----------
 const iconCache={};
 function icon(id){if(typeof MAT69_ART!=='undefined'&&MAT69_ART&&MAT69_ART[id])return MAT69_ART[id];if(iconCache[id])return iconCache[id];
  const c=document.createElement('canvas');c.width=c.height=96;const g=c.getContext('2d');const col=matCol(id),ty=id===MAT69.sss.id?'sss':id.slice(0,-1),t=id===MAT69.sss.id?3:+id.slice(-1);g.translate(48,48);
  const glow=g.createRadialGradient(0,0,4,0,0,46);glow.addColorStop(0,col+'aa');glow.addColorStop(1,col+'00');g.fillStyle=glow;g.fillRect(-48,-48,96,96);
  const body=g.createLinearGradient(-30,-30,30,30);body.addColorStop(0,'#ffffff');body.addColorStop(.25,col);body.addColorStop(1,'#0b1a2c');g.fillStyle=body;g.strokeStyle='#ffffffcc';g.lineWidth=2;
  const s=1+(t-1)*.12;g.scale(s,s);
  if(ty==='alloy'){g.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3+Math.PI/6;g.lineTo(Math.cos(a)*26,Math.sin(a)*26);}g.closePath();g.fill();g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(0,0,8,0,Math.PI*2);g.fill();g.fillStyle=col;g.beginPath();g.arc(0,0,5,0,Math.PI*2);g.fill();}
  else if(ty==='crystal'){for(const [x,h,w] of [[-12,22,8],[12,20,8],[0,30,11]]){g.beginPath();g.moveTo(x,-h);g.lineTo(x+w,6);g.lineTo(x,22);g.lineTo(x-w,6);g.closePath();g.fill();g.stroke();}}
  else if(ty==='circuit'){g.beginPath();g.rect(-22,-22,44,44);g.fill();g.stroke();g.strokeStyle='#fff';g.lineWidth=2;for(const [a,b,c2,d] of [[-22,-8,-8,-8],[8,8,22,8],[-8,-22,-8,-8],[8,22,8,8]]){g.beginPath();g.moveTo(a,b);g.lineTo(c2,d);g.stroke();}g.fillStyle='#fff';g.beginPath();g.arc(0,0,6,0,Math.PI*2);g.fill();}
  else if(ty==='plasma'){g.beginPath();g.moveTo(-10,-28);g.lineTo(10,-28);g.quadraticCurveTo(16,0,10,28);g.lineTo(-10,28);g.quadraticCurveTo(-16,0,-10,-28);g.fill();g.stroke();g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();for(let y=-22;y<=22;y+=2)g.lineTo(Math.sin(y*.35)*6,y);g.stroke();}
  else{g.beginPath();g.arc(0,0,22,0,Math.PI*2);g.fill();g.stroke();g.strokeStyle='#fff6c0';g.lineWidth=2;g.beginPath();g.ellipse(0,0,32,11,.5,0,Math.PI*2);g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(-6,-6,6,0,Math.PI*2);g.fill();}
  for(let k=1;k<t;k++){g.fillStyle='#fff';g.beginPath();g.arc(-24+k*10,-30,2.4,0,Math.PI*2);g.fill();}
  return iconCache[id]=c.toDataURL();}
 // ---------- yêu cầu ----------
 const isGear=o=>!!(o&&o.kind);
 function rowOf(kind,o){const e=Math.max(0,o.enhance|0);const T=ADV69[kind];return e<T.length?T[e]:null;}
 function req(kind,o){const r=rowOf(kind,o);if(!r)return null;return {row:r,mats:MAT69.types.map((ty,k)=>({id:mid(ty.id,r.t),n:r.q[k]})),f:r.f,c:r.c};}
 function fragHave(kind,o){try{const W=Workshop.getState();if(kind==='gear')return W.gearFragments[o.variant]|0;return W.craftFragments[o.idx]|0;}catch{return 0;}}
 function lacks(kind,o){const q=req(kind,o);if(!q)return ['max'];const L=[];for(const m of q.mats)if(have(m.id)<m.n)L.push(m.id);if(q.f&&(kind==='gear'||o.idx!=null)&&fragHave(kind,o)<q.f)L.push('frag');try{if(Progress.balance()<q.c)L.push('credits');}catch{}return L;}
 // móc từ lõi game (build69 rep): cost() hỏi số mảnh; promote kiểm & trả nguyên liệu
 window.ADV69C=function(i){if(!i||typeof i!=='object')return null;if(i.key)return null;const kind=isGear(i)?'gear':'craft';const r=rowOf(kind,i);return r?r.f:0;};
 window.ADV69G=function(kind,o){if(kind==='craft'&&o&&o.idx==null)o=Object.assign({},o);const L=lacks(kind,o);if(L.length){if(!quiet)try{lackToast(L);}catch{}return false;}return true;};
 window.ADV69P=function(kind,o){const q=req(kind,o);if(!q)return;for(const m of q.mats)add(m.id,-m.n);try{if(q.c)Progress.spendCredits(q.c);}catch{}};
 let quiet=false;
 function lackToast(L){const n=L.filter(x=>x!=='max').map(x=>x==='frag'?'mảnh':x==='credits'?'hợp kim':matName(x));if(n.length)toast('THIẾU: '+n.slice(0,3).join(', ')+(n.length>3?'…':''));}
 // ---------- rơi nguyên liệu ----------
 function rollTier(ch){const p=DROP69.tier[Math.max(0,Math.min(8,ch-1))],r=Math.random();return r<p[0]?1:r<p[0]+p[1]?2:3;}
 function dropFor(stage,k=1){const ch=Math.max(1,Math.ceil(stage/20)),boss=stage%10===0,mini=!boss&&stage%5===0;let picks=boss?DROP69.boss:mini?DROP69.mini:(Math.random()<DROP69.normalChance?1:0);picks=Math.max(picks?1:0,Math.round(picks*k));const got={};
  for(let i=0;i<picks;i++){const ty=MAT69.types[Math.floor(Math.random()*4)].id,t=rollTier(ch),id=mid(ty,t);got[id]=(got[id]||0)+DROP69.qty(ch);}
  for(const id in got)add(id,got[id]);return got;}
 function sssFor(stage,tbl){const boss=stage%10===0,mini=!boss&&stage%5===0;const n=tbl[boss?2:mini?1:0];if(n)add(MAT69.sss.id,n);return n;}
 const lines=got=>Object.entries(got).map(([id,n])=>'+'+n+' '+matName(id));
 try{const ors=Workshop.rollStage;Workshop.rollStage=function(stage){const r=ors.apply(this,arguments);try{if(gameMode==='endless')return r;let ecl=false;try{ecl=Eclipse67.active();}catch{}
   const sweep=!['play','pause','reward'].includes(mode);let out=[];
   if(stage>160){const n=sssFor(stage,DROP69.sss.ch9);if(n)out.push('+'+n+' '+MAT69.sss.n);}
   if(ecl){const n=sssFor(stage,DROP69.sss.ecl);if(n)out.push('+'+n+' '+MAT69.sss.n);}
   out=out.concat(lines(dropFor(Math.min(stage,180),sweep?DROP69.sweepK:1)));if(Array.isArray(r))return r.concat(out);}catch(e){}return r;};}catch{}
 try{const osw=Eclipse67.sweep;Eclipse67.sweep=function(s){const r=osw.apply(this,arguments);try{if(r){r.sss=sssFor(s,DROP69.sss.eclSweep);}}catch{}return r;};}catch{}
 // ---------- SSS ★ ----------
 const starOf=key=>S.star[key]|0;
 function sssList(){const L=[];try{for(const k of ['armor','missiles','sidearm']){const id=Gear44.activeId(k);if(id){const d=Gear44.activeDef(k);L.push({key:'g:'+id,name:d?d.name:id,kind:k,col:d?.color||'#ffd56a',eff:ADV69.sssGear});}}}catch{}
  try{const st=Fusion.getState();const keys=new Set();const sel=Fusion.getSelected();if(sel&&String(sel.key).startsWith('sss:'))keys.add(sel.key);for(const r of (st.robots||st.owned||[]))if(r&&String(r.key||'').startsWith('sss:'))keys.add(r.key);for(const k of keys){let nm=k;try{if(sel&&sel.key===k)nm=sel.name;}catch{}L.push({key:'r:'+k,name:nm,kind:'ship',col:'#ffb43a',eff:ADV69.sssShip});}}catch{}return L;}
 function sssUp(key){const s=starOf(key);if(s>=ADV69.sss.length)return false;const r=ADV69.sss[s];if(have(MAT69.sss.id)<r.k){toast('THIẾU '+MAT69.sss.n+' · '+have(MAT69.sss.id)+'/'+r.k);return false;}if(Progress.balance()<r.c){toast('THIẾU HỢP KIM · cần '+fmt(r.c));return false;}
  if(!Progress.spendCredits(r.c))return false;add(MAT69.sss.id,-r.k);S.star[key]=s+1;save();try{Combat.render&&Combat.render();}catch{}return true;}
 function sssMult(){let m=1;try{for(const k of ['armor','missiles','sidearm']){const id=Gear44.activeId(k);if(id)m*=1+ADV69.sssGear*starOf('g:'+id)/3;}const sel=Fusion.getSelected();if(sel&&String(sel.key).startsWith('sss:'))m*=1+ADV69.sssShip*starOf('r:'+sel.key);}catch{}return m;}
 try{const ods=allyDamageScale;allyDamageScale=function(){return ods.apply(this,arguments)*sssMult();};}catch{}
 try{const ost=Combat.stats;Combat.stats=function(){const r=ost.apply(this,arguments);try{const m=sssMult();if(m>1&&r){r.attack*=m;r.cp=Math.round(r.cp*(1+(m-1)*.6));}}catch{}return r;};}catch{}
 // ---------- giao diện ----------
 let el=null,ctx69=null;
 function build(){el=document.createElement('div');el.className='m63 adv69';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t){if(e.target===el)close();return;}const a=t.dataset.a;
   if(a==='close')close();else if(a==='go')doIt();else if(a==='src')src(t.dataset.v);else if(a==='back')render();else if(a==='inv')inv();else if(a==='sss')sss();else if(a==='sup'){if(sssUp(t.dataset.v)){band('ĐỘT PHÁ SSS THÀNH CÔNG');}sss();}
   else if(a==='nav')nav(t.dataset.v);});}
 function close(){if(el)el.hidden=true;}
 function cardOf(kind,o){if(kind==='gear'){let art='',title='';try{art=Progress.art(o);title=Progress.title(o);}catch{}return {art,title,cap:Workshop.cap(o),capN:Workshop.cap({...o,enhance:(o.enhance|0)+1}),cur:(()=>{try{return Progress.statText(o);}catch{return '';}})(),nxt:(()=>{try{return Progress.statText({...o,enhance:(o.enhance|0)+1});}catch{return '';}})()};}
  let nm='Chiến cơ';try{nm=Fighters28.profiles[o.idx].name;}catch{}let art='';try{art=Hangar28&&Hangar28.thumb?Hangar28.thumb(o.idx):'';}catch{}
  const f0=Workshop.levelFactor(o),f1=Workshop.levelFactor({...o,enhance:(o.enhance|0)+1}),gf=Campaign36.factor(o.grade);
  return {art,title:nm+' +'+(o.enhance|0),cap:Workshop.cap(o),capN:Workshop.cap({...o,enhance:(o.enhance|0)+1}),cur:'Sát thương ×'+(gf*f0).toFixed(2),nxt:'Sát thương ×'+(gf*f1).toFixed(2)};}
 function fresh(){if(!ctx69)return null;if(ctx69.kind==='gear'){const it=Progress.getState().items.find(x=>x.id===ctx69.id);return it||null;}const v=Workshop.craftProgress(ctx69.idx);return Object.assign({},v,{idx:ctx69.idx});}
 function render(){if(!el)build();const o=fresh();if(!o){close();return;}const kind=ctx69.kind,q=req(kind,o),C=cardOf(kind,o),e=o.enhance|0;
  const atCap=(o.level|0)>=Workshop.cap(o);
  let body='';
  if(!q){body='<p class="adv-max">Đã đột phá tối đa.</p>';}
  else{const fh=fragHave(kind,o);
   body=`<div class="adv-cards"><div class="adv-c"><div class="adv-art">${C.art}</div><b>+${e}</b><small>Trần level ${C.cap}</small></div><div class="adv-lock">${atCap?'⇢':'🔒'}</div><div class="adv-c nx"><div class="adv-art">${C.art}</div><b>+${e+1}</b><small>Trần level <em>${C.capN}</em></small></div></div>
   <div class="adv-cmp"><div><i>HIỆN TẠI</i>${C.cur}</div><div><i>SAU ĐỘT PHÁ</i><span class="up">${C.nxt}</span></div></div>
   <div class="adv-req-t">NGUYÊN LIỆU <span style="color:${MAT69.tiers[q.row.t-1].c}">· BẬC ${MAT69.tiers[q.row.t-1].n.toUpperCase()}</span><button data-a="inv">KHO NGUYÊN LIỆU ›</button></div>
   <div class="adv-req">${q.mats.map(m=>{const h=have(m.id),ok=h>=m.n;return `<button class="adv-m ${ok?'ok':'no'}" data-a="src" data-v="${m.id}" style="--mc:${matCol(m.id)}"><img src="${icon(m.id)}" alt=""><small>${esc(matName(m.id))}</small><b>${h}/${m.n}</b></button>`;}).join('')}
    ${q.f?`<button class="adv-m ${fh>=q.f?'ok':'no'}" data-a="src" data-v="frag" style="--mc:#ffd56a"><span class="adv-fr">◈</span><small>Mảnh ${kind==='gear'?'trang bị':'chiến cơ'}</small><b>${fh}/${q.f}</b></button>`:''}</div>
   <p class="adv-cost">Hợp kim: <b class="${Progress.balance()>=q.c?'':'no'}">${fmt(Progress.balance())} / ${fmt(q.c)}</b>${atCap?'':' · <span class="no">cần đạt trần level '+Workshop.cap(o)+' trước (đang '+o.level+')</span>'}</p>`;}
  const L=q?lacks(kind,o):['max'],can=q&&atCap&&!L.length;
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">ĐỘT PHÁ</div><h3>${esc(C.title)}</h3>${body}
   <div class="adv-btns"><button class="m63-go ${can?'':'off'}" data-a="go">${can?'ĐỘT PHÁ +'+(e+1):!q?'TỐI ĐA':!atCap?'CHƯA ĐẠT TRẦN':'THIẾU NGUYÊN LIỆU'}</button><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;
  el.hidden=false;}
 function band(t){const b=document.createElement('div');b.className='adv-band';b.textContent=t;document.body.appendChild(b);setTimeout(()=>b.remove(),1600);try{Audio393.vibrate?.(30);}catch{}try{tone(880,.18,'triangle',.06);}catch{}}
 function doIt(){const o=fresh();if(!o)return;const kind=ctx69.kind,e0=o.enhance|0;let ok=false;
  if(kind==='gear')ok=Progress.promote(o.id);else ok=Workshop.promoteCraft(ctx69.idx);
  if(ok){band('ĐỘT PHÁ THÀNH CÔNG · +'+(e0+1));try{const h=document.getElementById('hub40');if(h&&!h.hidden){if(kind==='gear')h.querySelector('[data-it="'+o.id+'"]')?.click();else h.querySelector('#hb-strip [data-c="'+ctx69.idx+'"]')?.click();}}catch{}}render();}
 const SRC={norm:t=>[[`Ải mini-boss (ải 5, 15, 25…) và ải boss (ải 10, 20…)`,'Bậc '+MAT69.tiers[t-1].n+': '+(t===1?'chương 1–6':t===2?'chương 3–9':'chương 5–9'),'map'],['Càn quét ải mini-boss / boss đã 3★','Nhận ~½ lượng rơi, 10 lượt/ngày','map'],['Ải thường','25% rơi 1 nguyên liệu','map']],
  frag:[['Vượt ải & càn quét ải 3★','Mỗi ải rơi mảnh trang bị / chiến cơ','map'],['Phó bản Nguyên liệu','Nhiều mảnh, theo độ khó','dungeon'],['Chợ Đen','Có thể bán mảnh','market']],
  credits:[['Phó bản Vàng','Nhiều hợp kim nhất','dungeon'],['Vượt ải & càn quét','Mỗi ải 150–600 ◈','map']],
  sss:[['Nguyệt Thực','Ải thường 1 · mini-boss 2 · boss 3 (càn quét cũng vậy)','ecl'],['Chương 9 · Tinh Vân Đen','Ải thường 2 · mini-boss 3 · boss 5','ch9']]};
 function src(id){const t=id==='frag'||id==='credits'?0:id===MAT69.sss.id?0:+id.slice(-1);const list=id==='frag'?SRC.frag:id==='credits'?SRC.credits:id===MAT69.sss.id?SRC.sss:SRC.norm(t);
  const nm=id==='frag'?'Mảnh':id==='credits'?'Hợp kim':matName(id);
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">LẤY Ở ĐÂU</div><h3>${id==='frag'||id==='credits'?'':`<img class="adv-hi" src="${icon(id)}" alt="">`}${esc(nm)}</h3>${id!=='frag'&&id!=='credits'?`<p class="adv-cost">Đang có: <b>${have(id)}</b></p>`:''}
   <div class="adv-src">${list.map(r=>`<div class="adv-s"><div><b>${esc(r[0])}</b><small>${esc(r[1])}</small></div><button data-a="nav" data-v="${r[2]}">ĐI ›</button></div>`).join('')}</div>
   <div class="adv-btns"><button class="adv-x" data-a="${ctx69?'back':'close'}">‹ QUAY LẠI</button></div></div>`;el.hidden=false;}
 function nav(v){close();try{Hub40.close&&Hub40.close();}catch{}
  if(v==='ecl'){try{Expedition67.open('ecl');}catch{}return;}if(v==='ch9'){try{Expedition67.open('ch9');}catch{}return;}
  if(v==='market'){try{Trade67.open();}catch{}return;}
  if(v==='dungeon'){try{Lobby.show();document.querySelector('#hgr41 [data-go="map"]')?.click();setTimeout(()=>document.querySelector('.dungeon-panel')?.scrollIntoView({behavior:'smooth',block:'start'}),120);}catch{}return;}
  try{Lobby.show();document.querySelector('#hgr41 [data-go="map"]')?.click();}catch{}}
 function inv(){const rows=MAT69.types.map(ty=>`<div class="adv-ir"><b>${esc(ty.n)}</b>${[1,2,3].map(t=>{const id=mid(ty.id,t);return `<button class="adv-m sm" data-a="src" data-v="${id}" style="--mc:${matCol(id)}"><img src="${icon(id)}" alt=""><b>${have(id)}</b></button>`;}).join('')}</div>`).join('');
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">KHO NGUYÊN LIỆU</div><h3>Nguyên liệu đột phá</h3><div class="adv-inv">${rows}<div class="adv-ir"><b>${MAT69.sss.n}</b><button class="adv-m sm" data-a="src" data-v="${MAT69.sss.id}" style="--mc:${MAT69.sss.c}"><img src="${icon(MAT69.sss.id)}" alt=""><b>${have(MAT69.sss.id)}</b></button></div></div>
   <div class="adv-btns"><button class="adv-x" data-a="${ctx69?'back':'close'}">‹ QUAY LẠI</button></div></div>`;el.hidden=false;}
 function sss(){if(!el)build();ctx69=null;const L=sssList(),core=have(MAT69.sss.id);
  const rows=L.length?L.map(x=>{const s=starOf(x.key),r=ADV69.sss[s];return `<div class="adv-sr"><div><b style="color:${x.col}">${esc(x.name)}</b><small>${x.kind==='ship'?'Siêu chiến cơ':'Trang bị SSS'} · <span class="st">${'★'.repeat(s)}${'☆'.repeat(10-s)}</span> · +${Math.round(s*x.eff*100)}% sát thương</small></div>${r?`<button data-a="sup" data-v="${esc(x.key)}" class="${core>=r.k&&Progress.balance()>=r.c?'hot':''}">★${s+1}<small>${r.k} hạch · ${fmt(r.c)} ◈</small></button>`:'<em>TỐI ĐA</em>'}</div>`;}).join(''):'<p class="adv-max">Chưa có trang bị / siêu chiến cơ SSS nào đang dùng. Hợp thể SSS trước.</p>';
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">ĐỘT PHÁ SSS</div><h3><img class="adv-hi" src="${icon(MAT69.sss.id)}" alt="">${MAT69.sss.n}: <span style="color:#ffd56a">${core}</span></h3><div class="adv-sss">${rows}</div>
   <div class="adv-btns"><button class="adv-x" data-a="src" data-v="${MAT69.sss.id}">LẤY Ở ĐÂU ›</button><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function open(kind,ref){if(!el)build();ctx69=kind==='gear'?{kind,id:ref}:{kind:'craft',idx:ref|0};render();}
 // ---------- thay nút CƯỜNG HÓA trong Hub40 bằng ĐỘT PHÁ ----------
 function patchHub(){const h=document.getElementById('hub40');if(!h)return;
  const se=h.querySelector('#sh-en');if(se&&!se.dataset.adv){const sh=se.closest('.hb-sheet'),id=sh&&sh.dataset.item,it=id&&Progress.getState().items.find(x=>x.id===id);if(it){se.dataset.adv=1;const e=it.enhance|0,mx=e>=5,ready=!mx&&it.level>=Workshop.cap(it);quiet=true;const L=mx?[]:lacks('gear',it);quiet=false;
    se.disabled=mx;se.classList.toggle('adv-rdy',ready&&!L.length);se.innerHTML=mx?'ĐỘT PHÁ<small>Tối đa</small>':'ĐỘT PHÁ +'+(e+1)+'<small>'+(ready?(L.length?'Thiếu nguyên liệu · xem':'Đủ nguyên liệu!'):'Đạt trần level '+Workshop.cap(it)+' trước')+'</small>';se.onclick=ev=>{ev.preventDefault();open('gear',it.id);};}}
  const he=h.querySelector('#hb-en');if(he&&!he.dataset.adv){const cur=h.querySelector('#hb-strip [aria-current="true"]'),idx=cur?+cur.dataset.c:0;const v=Object.assign({},Workshop.craftProgress(idx),{idx});he.dataset.adv=1;const e=v.enhance|0,mx=e>=5,ready=!mx&&v.level>=Workshop.cap(v);const L=mx?[]:lacks('craft',v);
   he.disabled=mx;he.classList.toggle('adv-rdy',ready&&!L.length);he.innerHTML=mx?'ĐỘT PHÁ<small>Tối đa</small>':'ĐỘT PHÁ +'+(e+1)+'<small>'+(ready?(L.length?'Thiếu nguyên liệu · xem':'Đủ nguyên liệu!'):'Đạt trần level '+Workshop.cap(v)+' trước')+'</small>';he.onclick=ev=>{ev.preventDefault();open('craft',idx);};}}
 function watch(){const h=document.getElementById('hub40');if(!h){setTimeout(watch,500);return;}new MutationObserver(()=>{try{patchHub();}catch{}}).observe(h,{childList:true,subtree:true});patchHub();}
 watch();
 // nút ĐỘT PHÁ SSS + KHO NGUYÊN LIỆU trong màn KHO (#hgr41 .h1-fx)
 setInterval(()=>{try{const fx=document.querySelector('#hgr41 .h1-fx');if(fx&&!fx.querySelector('[data-adv69]')){const b=document.createElement('button');b.dataset.adv69='sss';b.className='adv69b';b.textContent='ĐỘT PHÁ SSS';b.addEventListener('click',e=>{e.stopPropagation();sss();});fx.appendChild(b);const b2=document.createElement('button');b2.dataset.adv69='inv';b2.className='adv69b';b2.textContent='NGUYÊN LIỆU';b2.addEventListener('click',e=>{e.stopPropagation();if(!el)build();ctx69=null;inv();});fx.appendChild(b2);}}catch{}},800);
 return {open,sss,inv,have,add,state:()=>JSON.parse(JSON.stringify(S)),req,lacks,dropFor,sssMult,star:starOf,sssUp,icon,matName};
})();
