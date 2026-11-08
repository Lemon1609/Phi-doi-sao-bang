// V78 · ĐÁM MÂY: lưu tiến trình theo tài khoản Claude + bảng xếp hạng chung + số liệu cân bằng (chỉ chạy khi mở bản online)
const Cloud78=(()=>{
 const ST='saobang-cloud78',TL='saobang-tele78',CH=180000;
 const SKIP=new Set(['saobang-gfx-v66','saobang-audio-v1','saobang-device-v1','saobang-telemetry-v66',ST]);
 let db=null,user=null,uid=null,col=null,status='offline',lastHash='',lastAt=0,busy=false,lbLast='',teleDirty=false;
 const T=m=>{try{toast(m);}catch{}};
 const ls=k=>{try{return localStorage.getItem(k);}catch{return null;}};
 const keys=()=>{try{return Object.keys(localStorage).filter(k=>(k.startsWith('saobang-')||k.startsWith('PLAYER_'))&&!SKIP.has(k));}catch{return [];}};
 const snap=()=>{const o={};for(const k of keys())o[k]=ls(k);return o;};
 const hash=o=>{const s=JSON.stringify(o);let x=0x811c9dc5;for(let i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)>>>0;}return x.toString(36)+':'+s.length;};
 const J=(k,d)=>{try{return JSON.parse(ls(k)||'null')||d;}catch{return d;}};
 const stamp=()=>J(ST,{});
 const setStamp=o=>{try{localStorage.setItem(ST,JSON.stringify(o));}catch{}};
 const prog=o=>{try{return (JSON.parse(o['saobang-hangar-v1']||'{}').cleared||[]).length;}catch{return 0;}};
 const playing=()=>typeof mode!=='undefined'&&['play','pause'].includes(mode);
 // ---------- đồng bộ ----------
 async function init(){
  if(!window.claude||typeof window.claude.use!=='function'){status='offline';return;}
  try{[db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);}catch{}
  if(!db||!user){status='local';paint();return;}
  try{uid=await user.id();}catch{}
  if(!uid){status='local';paint();return;}
  col=db.collection('data/users/'+uid);status='sync';paint();
  let m=null;try{m=await col.doc('meta').get();}catch(e){status='err';paint();return;}
  const loc=stamp(),cur=snap();
  if(m.exists){const md=m.data();
   if((md.ts||0)>(loc.ts||0)){
    // máy này chưa từng đồng bộ mà tiến trình nhiều hơn bản đám mây → giữ máy này
    if(!loc.ts&&prog(cur)>(md.p|0)){await push(true,true);}
    else{const g=+(sessionStorage.getItem('cl78r')||0);if(Date.now()-g>20000){await pull(md);return;}}
   }
  }else await push(true);
  if(status==='sync')status='ok';lastHash=hash(snap());paint();
  setInterval(()=>{tick();},45000);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')tick(true);});
  watchMode();board(true).catch(()=>{});
 }
 async function pull(md){
  try{const o={};for(let i=0;i<(md.n|0);i++){const d=await col.doc('s'+i).get();if(!d.exists)throw new Error('thiếu phần '+i);Object.assign(o,d.data().kv||{});}
   if(!Object.keys(o).length)throw new Error('rỗng');
   for(const k of keys())if(!(k in o))localStorage.removeItem(k);
   for(const k in o)localStorage.setItem(k,o[k]);
   setStamp({ts:md.ts});sessionStorage.setItem('cl78r',String(Date.now()));
   T('☁ Đang tải tiến trình từ đám mây…');window.__adm66=true;setTimeout(()=>location.reload(),400);
  }catch(e){status='err';paint();}
 }
 async function push(force,override){
  if(!col||busy)return;busy=true;
  try{
   const o=snap(),h=hash(o);if(!force&&h===lastHash){busy=false;return;}
   // máy khác vừa lưu bản mới hơn → tải bản đó về thay vì ghi đè
   const m=await col.doc('meta').get();const loc=stamp();
   // V79D: kể cả khi bấm LƯU thủ công cũng KHÔNG ghi đè bản mới hơn của máy khác (trước đây force bỏ qua kiểm tra → mất tiến trình/quà bộ)
   if(!override&&m.exists&&(m.data().ts||0)>(loc.ts||0)){busy=false;if(!playing())await pull(m.data());else T('☁ Máy khác vừa lưu bản mới hơn · sẽ tải về khi kết thúc trận');return;}
   const parts=[];let cur={},sz=0;for(const k in o){const n=k.length+(o[k]||'').length+8;if(sz+n>CH&&sz){parts.push(cur);cur={};sz=0;}cur[k]=o[k];sz+=n;}parts.push(cur);
   for(let i=0;i<parts.length;i++)await col.doc('s'+i).set({kv:parts[i]});
   const ts=Date.now();await col.doc('meta').set({ts,n:parts.length,p:prog(o),v:1});
   setStamp({ts});lastHash=h;lastAt=ts;status='ok';
  }catch(e){status=(e&&e.code==='invalid_argument')?'noperm':'err';}
  busy=false;paint();
  try{await pushBoard();}catch{}
 }
 function tick(now){if(!col||status==='noperm')return;if(playing()&&!now)return;push(false);}
 // ---------- bảng xếp hạng ----------
 function entry(){const o={stage:0,stars:0,bk:0,seed:0,seedDay:'',cp:0,ew:0};
  try{o.ew=Campaign36.getState().endlessBest|0;}catch{}
  try{o.stage=Math.max(0,...(J('saobang-hangar-v1',{}).cleared||[0]));}catch{}
  try{const s=J('saobang-campaign-v36',{}).stars||{};o.stars=Object.values(s).reduce((a,b)=>a+(+b||0),0);}catch{}
  try{const b=BK78.state();o.bk=b.best|0;o.seed=b.sd&&b.sd.best|0;o.seedDay=b.sd&&b.sd.d||'';}catch{}
  try{o.cp=Math.round(Combat.stats().cp)||0;}catch{}
  return o;}
 async function pushBoard(){if(!db||!uid||status==='noperm')return;const e=entry(),k=JSON.stringify(e);
  if(k!==lbLast){await db.doc('lb/'+uid).set({...e,ts:Date.now()});lbLast=k;}
  if(teleDirty){await db.doc('tele/'+uid).set({v:1,st:J(TL,{}),cp:e.cp,stage:e.stage,ts:Date.now()});teleDirty=false;}}
 let rows=[];
 async function board(silent){if(!db)return [];const s=await db.collection('lb').limit(500).get();rows=s.docs.map(d=>({id:d.id,...d.data()}));return rows;}
 const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
 async function openBoard(tab='stage'){
  const wrap=document.body.classList.contains('play-screen')&&document.querySelector('.game-wrap')||document.body;
  let el=document.getElementById('lb78');if(!el){el=document.createElement('div');el.id='lb78';wrap.appendChild(el);
   el.addEventListener('click',e=>{const t=e.target.closest('[data-lbt]');if(t)openBoard(t.dataset.lbt);else if(e.target.closest('[data-lbx]')||e.target===el)el.remove();});}
  const TABS=[['stage','Ải cao nhất'],['stars','Tổng sao'],['cp','Lực chiến'],['ew','Vô tận'],['bk','Phá Vây'],['seed','Hạt giống hôm nay']];   // V79B: nhóm tích lũy · nhóm kỹ năng
  el.innerHTML='<div class="lb78c"><div class="lb78h"><b>🏆 BẢNG XẾP HẠNG</b><button data-lbx aria-label="Đóng">✕</button></div><div class="lb78t">'+TABS.map(([k,n])=>'<button data-lbt="'+k+'"'+(k===tab?' class="on"':'')+'>'+n+'</button>').join('')+'</div><div class="lb78l"><p class="lb78n">Đang tải…</p></div><p class="lb78f"></p></div>';
  const L=el.querySelector('.lb78l'),F=el.querySelector('.lb78f');
  if(!db){L.innerHTML='<p class="lb78n">Bảng xếp hạng chỉ có ở bản online, khi bạn đăng nhập Claude.</p>';return;}
  try{await pushBoard();}catch{}
  let R=[];try{R=await board();}catch{L.innerHTML='<p class="lb78n">Không tải được bảng xếp hạng. Thử lại sau ít phút.</p>';return;}
  const td=today();
  const val=r=>tab==='stage'?r.stage:tab==='stars'?(r.stars|0):tab==='ew'?(r.ew|0):tab==='bk'?r.bk:tab==='cp'?r.cp:(r.seedDay===td?r.seed:0);
  R=R.filter(r=>val(r)>0).sort((a,b)=>val(b)-val(a)||(tab==='stage'?(b.stars|0)-(a.stars|0):0)).slice(0,50);
  let ps={};try{ps=R.length?await user.profiles(R.map(r=>r.id)):{};}catch{}
  L.innerHTML='';
  if(!R.length){L.innerHTML='<p class="lb78n">Chưa có ai trong bảng này. Chơi một trận để ghi tên!</p>';}
  R.forEach((r,i)=>{const p=ps[r.id]||{};const row=document.createElement('div');row.className='lb78r'+(r.id===uid?' me':'');
   const sub=tab==='stage'?'★ '+(r.stars|0):tab==='cp'?'Ải '+(r.stage|0):'';
   row.innerHTML='<span class="lb78k">'+(i+1)+'</span><img alt=""><span class="lb78p"><b></b><small></small></span><span class="lb78v"></span>';
   const img=row.querySelector('img');if(p.avatarUrl)img.src=p.avatarUrl;else img.style.visibility='hidden';
   row.querySelector('b').textContent=r.id===uid?((p.name||'Bạn')+' (bạn)'):(p.name||'Phi công');row.querySelector('small').textContent=sub;
   row.querySelector('.lb78v').textContent=tab==='stage'?'Ải '+val(r):Number(val(r)).toLocaleString('vi-VN');L.appendChild(row);});
  const mine=rows.find(r=>r.id===uid);F.textContent=status==='noperm'?'Bạn đang ở chế độ chỉ xem nên chưa ghi được điểm của mình.':(mine?'':'Điểm của bạn sẽ xuất hiện sau lần lưu đầu tiên.')+' 🏅 Thưởng tuần (0:00 thứ Hai): hạng cao nhất ở nhóm Ải · Sao · Lực chiến và nhóm Vô tận · Phá Vây, mỗi nhóm 1 phần quà, top 100.';
 }
 // ---------- V79B · THƯỞNG BẢNG XẾP HẠNG HẰNG TUẦN (Gemini REVIEW79B §6) ----------
 //  Chốt khi người chơi mở game lần đầu trong tuần mới (giờ VN, tuần bắt đầu thứ Hai): hạng tính trên bảng lúc chốt.
 //  Nhóm tích lũy (Ải cao nhất · Tổng sao · Lực chiến) và nhóm kỹ năng (Vô tận · Phá Vây): mỗi nhóm lấy hạng cao nhất → 1 phần quà.
 const WK='saobang-wk79';
 const weekK=()=>{const d=new Date(Date.now()+7*3600000);const dn=(d.getUTCDay()+6)%7;return new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()-dn)).toISOString().slice(0,10);};
 const WR={prog:[[1,{gem:200,alloy:50000,tim:1}],[3,{gem:150,alloy:35000,lam:2}],[10,{gem:100,alloy:20000,lam:1}],[30,{gem:60,alloy:12000,stone:80}],[100,{gem:30,alloy:6000,stone:40}]],
  skill:[[1,{gem:150,tok:25,shard:150}],[3,{gem:100,tok:18,shard:100}],[10,{gem:70,tok:12,shard:60}],[30,{gem:40,tok:8,shard:35}],[100,{gem:25,tok:4,shard:20}]]};
 let wkBusy=false;
 async function weekly(){if(wkBusy||!db||!uid||status==='noperm')return;const cur=weekK();let W={};try{W=JSON.parse(localStorage.getItem(WK)||'{}')||{};}catch{}
  if(W.w===cur)return;if(!W.w){W.w=cur;try{localStorage.setItem(WK,JSON.stringify(W));}catch{}return;}
  wkBusy=true;try{let R=[];try{R=await board(true);}catch{wkBusy=false;return;}const me=R.find(r=>r.id===uid);const out=[];
   const rank=(k)=>{if(!me||!((me[k]|0)>0))return 0;return 1+R.filter(r=>(r[k]|0)>(me[k]|0)).length;};
   const best=ks=>{let b=0;for(const k of ks){const x=rank(k);if(x&&(!b||x<b))b=x;}return b;};
   const give=(grp,rk)=>{if(!rk)return;const row=WR[grp].find(([m])=>rk<=m);if(!row)return;const g=row[1];
    try{if(g.gem)Econ74.add(g.gem,'thưởng BXH tuần');}catch{}try{if(g.alloy)Progress.grantCredits(g.alloy);}catch{}try{if(g.stone)Workshop.grant({exp:g.stone});}catch{}
    let c=0;try{c=launchCraft|0;}catch{}try{if(g.tim)V70.phAdd('craft',c,3,g.tim);if(g.lam)V70.phAdd('craft',c,2,g.lam);}catch{}
    try{if(g.tok){const s=V77.state();V77._set({tok:(s.tok|0)+g.tok});}}catch{}try{if(g.shard){const s=BK78.state();BK78._set({shards:(s.shards|0)+g.shard});}}catch{}
    out.push((grp==='prog'?'Tích lũy':'Kỹ năng')+' hạng '+rk);};
   const bp=best(['stage','stars','cp']),bs=best(['ew','bk']);give('prog',bp);give('skill',bs);
   // V79D (Gemini): danh hiệu tuần top 10 · +3% / +2% / +1% sức công trong 7 ngày (lấy hạng tốt nhất của 2 nhóm)
   const top=[bp,bs].filter(Boolean).sort((a,b)=>a-b)[0];
   if(top&&top<=10){const T=top===1?['BÁ CHỦ THIÊN HÀ',3,'#ff5a5a']:top<=3?['THỐNG SOÁI TINH HÀ',2,'#ff9a3d']:['PHI CÔNG VƯƠNG BÀI',1,'#b45cff'];W.title={n:T[0],pct:T[1],c:T[2],rank:top,until:Date.now()+7*86400000};out.push('danh hiệu '+T[0]+' +'+T[1]+'% sức công');}else W.title=null;
   W.w=cur;W.last=out;try{localStorage.setItem(WK,JSON.stringify(W));}catch{}
   if(out.length)setTimeout(()=>{try{toast('🏅 THƯỞNG BẢNG XẾP HẠNG TUẦN · '+out.join(' · '));}catch{}},2500);
  }finally{wkBusy=false;}}
 function title(){try{const W=JSON.parse(localStorage.getItem(WK)||'{}')||{};const t=W.title;return t&&t.until>Date.now()?t:null;}catch{return null;}}
 setTimeout(()=>{try{const f0=Combat.factor;Combat.factor=function(){const v=f0.apply(this,arguments);const t=title();return t?v*(1+t.pct/100):v;};}catch{}},150);
 setInterval(()=>{try{const t=title();const b=document.querySelector('#hgr41 .h1-badge');if(!b)return;let el=document.getElementById('tt79');if(!t){if(el)el.remove();return;}
   if(!el){el=document.createElement('span');el.id='tt79';b.after(el);}const txt='🏅 '+t.n+' · +'+t.pct+'% sức công';if(el.textContent!==txt){el.textContent=txt;el.style.setProperty('--tc',t.c);}}catch{}},1500);
 setInterval(()=>{try{weekly();}catch{}},20000);setTimeout(()=>{try{weekly();}catch{}},6000);
 // ---------- số liệu cân bằng: thắng/thua từng ải ----------
 function watchMode(){let prev=null,st=0,t0=0;setInterval(()=>{try{const m=typeof mode!=='undefined'?mode:'';
   if(m==='play'&&prev!=='play'&&prev!=='pause'){st=(typeof gameMode!=='undefined'&&gameMode==='campaign'&&!window.__m78)?(+document.getElementById('mission-select').value||0):0;t0=Date.now();}
   if(prev&&['play','pause'].includes(prev)&&!['play','pause'].includes(m)){
    if(st){const s=J(TL,{});const k=String(st),r=s[k]||{w:0,l:0,t:0};if(typeof stageFinished36!=='undefined'&&stageFinished36)r.w++;else r.l++;r.t+=Math.round((Date.now()-t0)/1000);s[k]=r;
     const ks=Object.keys(s);if(ks.length>220)delete s[ks.sort((a,b)=>a-b)[0]];try{localStorage.setItem(TL,JSON.stringify(s));}catch{}teleDirty=true;}
    st=0;setTimeout(()=>tick(true),1500);}
   prev=m;}catch{}},500);}
 // ---------- mục trong Cài đặt ----------
 const fmt=t=>{const d=new Date(t);return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');};
 function text(){return status==='offline'?'Bản offline · tiến trình lưu trên máy này.':status==='local'?'Chưa đăng nhập Claude · tiến trình chỉ lưu trên trình duyệt này.':status==='sync'?'☁ Đang đồng bộ…':status==='noperm'?'Tài khoản đang ở chế độ chỉ xem · tiến trình lưu trên trình duyệt này.':status==='err'?'⚠ Chưa kết nối được đám mây · sẽ thử lại.':'☁ Đã lưu đám mây'+(lastAt?' lúc '+fmt(lastAt):'')+' · đổi máy vẫn chơi tiếp được.';}
 function paint(){const s=document.getElementById('cl78s');if(s)s.textContent=text();}
 function mount(){const c=document.getElementById('st66-code');if(!c||document.getElementById('cl78'))return;const lab=c.closest('.st66-row')?.previousElementSibling;if(!lab)return;
  const d=document.createElement('div');d.id='cl78';d.innerHTML='<div class="st66-l">TÀI KHOẢN &amp; XẾP HẠNG</div><p class="st66-now" id="cl78s"></p><div class="st66-row"><button data-cl78="lb">🏆 BẢNG XẾP HẠNG</button>'+(col?'<button data-cl78="save">☁ LƯU NGAY</button>':'')+'</div>';
  lab.parentNode.insertBefore(d,lab);paint();
  d.addEventListener('click',e=>{const b=e.target.closest('[data-cl78]');if(!b)return;e.stopPropagation();if(b.dataset.cl78==='lb')openBoard();else push(true).then(()=>T(status==='ok'?'☁ Đã lưu lên đám mây':'⚠ Chưa lưu được, thử lại sau'));});}
 setInterval(()=>{try{mount();}catch{}},600);
 setTimeout(()=>{init().catch(()=>{status='err';paint();});},800);
 return {state:()=>({status,uid:!!uid,lastAt}),push:()=>push(true),open:openBoard,entry,_board:board,_weekly:weekly,_wk:weekK,title};
})();
