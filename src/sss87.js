// V87 · CHIẾN CƠ THẦN HÓA (BẬC SSS, V89 đổi tên theo REVIEW89 C8) #11–#13 BẰNG 2 CHIẾN CƠ (Gemini REVIEW86 H2 · kỹ năng theo REVIEW85 G5) · tranh GPT đợt V86 (craft86)
//  • #11 Thôn Tinh (chính, Tím+5) + #8 Phần Thiên (phụ, Tím) → Huyết Tinh Thôn Phệ Giả · +8% sát thương · Hố Đen Huyết Tinh
//  • #12 Thời Không + #9 Thiên Khung → Vĩnh Hằng Thời Không · +8% · Lăng Kính Ngưng Đọng
//  • #13 Hư Không + #10 Tinh Hà → Chân Thần Hư Không · +10% · Phán Quyết Hư Không
//  • Chi phí: 1 bản sao chiến cơ chính + 2 bản sao chiến cơ phụ (bất kỳ khung, ưu tiên bản thấp nhất, không lấy bản đã khóa)
//    + ◈ hợp kim 250k/250k/300k + đá khảm Tím 15/15/20 (không lắp). 0 kim cương. Hai chiến cơ gốc giữ nguyên.
//  • Sau hợp thể: lái chiến cơ chính sẽ đổi thân sang dạng SSS (bật/tắt được), +sát thương nội tại, kỹ năng tự tung theo hồi chiêu.
//    "Lượt bắn gốc" = tổng sát thương 1 loạt đạn chính của chính tàu đó, đo trong trận.
//  Khóa lưu mới: saobang-sss-fusion86. Tắt: window.SSS87=false
const SSS87_DATA={req:{main:11,sub:6},
 R:[{i:10,sub:7,name:'Huyết Tinh Thôn Phệ Giả',img:'sss11_huyettinh',bonus:.08,cost:{main:1,sub:2,cr:250000,gem:15},col:'#ff3048',
     sk:{n:'Hố Đen Huyết Tinh',cd:10,cdS:7,r:135,rS:165,dur:2.5,ticks:10,tick:.85,burst:4.5,pull:65,heal:.02,healKills:5},
     d:'Hố đen 2,5 giây hút quái về tâm, 10 nhịp ×0,85 + nổ cuối ×4,5 lượt bắn gốc. Nổ hạ ≥5 quái: hồi 2% máu.'},
    {i:11,sub:8,name:'Vĩnh Hằng Thời Không',img:'sss12_vinhhang',bonus:.08,cost:{main:1,sub:2,cr:250000,gem:15},col:'#9fe8ff',
     sk:{n:'Lăng Kính Ngưng Đọng',cd:11,cdS:7.5,blades:8,per:1.75,boom:70,r:150,rS:185,dur:2,slow:.5},
     d:'8 lưỡi đao khóa mục tiêu máu cao nhất (×1,75 mỗi lưỡi, xuyên khiên cánh boss) + trường 150 px làm chậm 50% đạn địch trong 2 giây.'},
    {i:12,sub:9,name:'Chân Thần Hư Không',img:'sss13_chanthan',bonus:.10,cost:{main:1,sub:2,cr:300000,gem:20},col:'#c07bff',
     sk:{n:'Phán Quyết Hư Không',cd:6,cdS:4.5,beams:12,per:2.15,focusBonus:1.25,r:220,rS:260,focus:110,dur:2.2,shield:2.5},   // V87 REVIEW87 Câu 2 (trước: hồi 12 s, ×1,35)
     d:'2 cổng hư không xả 12 tia hội tụ (×2,15 mỗi tia; từ tia thứ 2 trúng cùng bộ phận boss +25%) trong 2,2 giây + khiên chặn 1 đòn.'}]};
window.SSS87_DATA=SSS87_DATA;
const SSS87=(()=>{
 const on=()=>window.SSS87!==false;const D=SSS87_DATA,KEY='saobang-sss-fusion86';
 let S={v:1,done:{},off:{},n:{}};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const nm=i=>{try{return Fighters28.profiles[i].name;}catch{return '#'+(i+1);}};
 const rOf=i=>D.R.find(r=>r.i===i)||null;
 const playing=()=>{try{return mode==='play';}catch{return false;}};
 function cur(){try{if(playing()&&typeof launchCraft!=='undefined'&&launchCraft!=null)return launchCraft|0;}catch{}try{return selected|0;}catch{return -1;}}
 const fused=i=>!!S.done[i];const form=i=>fused(i)&&!S.off[i];
 function active(){try{return on()&&!activeRobot&&form(cur());}catch{return on()&&form(cur());}}
 function mult(){if(!active())return 1;const r=rOf(cur());return r?1+r.bonus:1;}
 function img(k){try{return Art86.img(k);}catch{return null;}}
 function hull(i,sup){if(!on()||!form(i))return null;const r=rOf(i);if(!r)return null;return (sup&&img(r.img+'_super'))||img(r.img);}
 // ---------- điều kiện + chi phí ----------
 const copies=m=>{try{return Evo82.list().filter(c=>c.k==='craft'&&(c.m|0)===m&&!c.lk).sort((a,b)=>a.t-b.t||a.lv-b.lv);}catch{return [];}};
 const tierN=i=>{try{return V70.craftN(i)|0;}catch{return 0;}};
 const owns=i=>{try{return Campaign36.ownsCraft(i);}catch{return false;}};
 const bal=()=>{try{return Progress.balance()|0;}catch{return 0;}};
 const gems=()=>{try{return Stone71.haveT(3)|0;}catch{return 0;}};
 function check(r){const c=r.cost,L=[];
  const a={own:owns(r.i)&&owns(r.sub),mt:tierN(r.i),st:tierN(r.sub),mc:copies(r.i).length,sc:copies(r.sub).length,cr:bal(),gem:gems()};
  if(!a.own)L.push('Cần sở hữu cả 2 chiến cơ');if(a.mt<D.req.main)L.push('#'+(r.i+1)+' cần khung Tím+5');if(a.st<D.req.sub)L.push('#'+(r.sub+1)+' cần khung Tím');
  if(a.mc<c.main)L.push('Thiếu bản sao #'+(r.i+1));if(a.sc<c.sub)L.push('Thiếu bản sao #'+(r.sub+1));if(a.cr<c.cr)L.push('Thiếu hợp kim');if(a.gem<c.gem)L.push('Thiếu đá khảm Tím');
  return {a,L,ok:!L.length};}
 function fuse(i){const r=rOf(i);if(!r||fused(i))return false;const k=check(r);if(!k.ok){try{toast(k.L[0].toUpperCase());}catch{}return false;}
  const pm=copies(r.i).slice(0,r.cost.main),ps=copies(r.sub).slice(0,r.cost.sub);
  if(!Progress.spendCredits(r.cost.cr))return false;
  if(!Stone71.spendT(3,r.cost.gem)){try{Progress.grantCredits(r.cost.cr);}catch{}return false;}
  for(const c of [...pm,...ps])try{Evo82.take(c.u);}catch{}
  S.done[i]=Date.now();delete S.off[i];save();try{Audio393&&Audio393.vibrate&&Audio393.vibrate([20,40,20,40,90]);}catch{}
  try{toast('✦ THẦN HÓA THÀNH CÔNG · '+r.name.toUpperCase());}catch{}rite(r);return true;}
 // ---------- giao diện ----------
 let el=null,view=10;
 function css(){if(document.getElementById('sss87-css'))return;const st=document.createElement('style');st.id='sss87-css';st.textContent=`
.sss87 .s7-tabs{display:flex;gap:6px;margin:8px 0}.sss87 .s7-tabs button{flex:1;padding:7px 4px;font-size:11px;background:rgba(14,40,72,.8);border:1px solid rgba(120,200,255,.3);color:#cfe6ff}
.sss87 .s7-tabs button[aria-pressed="true"]{border-color:var(--sc);box-shadow:inset 0 -2px var(--sc);color:#fff}
.sss87 .s7-hero{display:grid;grid-template-columns:132px 1fr;gap:10px;align-items:center}.sss87 .s7-hero img{width:132px;height:132px;object-fit:contain;filter:drop-shadow(0 0 14px var(--sc))}
.sss87 .s7-hero b{display:block;font-size:15px;color:#fff;letter-spacing:.5px}.sss87 .s7-hero small{display:block;color:#bcd6ec;font-size:11px;line-height:1.45}
.sss87 .s7-eq{display:flex;align-items:center;gap:6px;font-size:11px;color:#cfe6ff;margin:8px 0}.sss87 .s7-eq span{padding:4px 7px;border:1px solid rgba(120,200,255,.3)}
.sss87 ul{list-style:none;margin:6px 0;padding:0;display:grid;gap:4px}.sss87 li{display:flex;justify-content:space-between;font-size:12px;padding:5px 8px;background:rgba(8,20,38,.7);border-left:3px solid #ff6a6a}
.sss87 li.ok{border-left-color:#46ffb2}.sss87 li i{font-style:normal;color:#9fc0da}.sss87 .s7-sk{font-size:12px;color:#e8f4ff;padding:8px;border:1px dashed var(--sc);margin:6px 0}
.sss87 .s7-go{width:100%;padding:11px;font-weight:700;letter-spacing:1px;background:linear-gradient(90deg,#3a1460,#7a2ab0);border:1px solid var(--sc);color:#fff}.sss87 .s7-go[disabled]{opacity:.45}
#s87rite{position:fixed;inset:0;z-index:99995;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(40,10,60,.92),rgba(0,0,0,.94));color:#fff;text-align:center;transition:opacity .5s}
#s87rite img{width:min(62vw,300px);animation:s87p 1.6s ease-out both;filter:drop-shadow(0 0 30px var(--sc))}#s87rite b{font-size:20px;letter-spacing:2px;margin-top:10px;text-shadow:0 0 14px var(--sc)}#s87rite small{color:#cfe6ff;margin-top:4px}
@keyframes s87p{0%{transform:scale(.3) rotate(-30deg);opacity:0}60%{transform:scale(1.12);opacity:1}100%{transform:scale(1)}}`;document.head.appendChild(st);}
 function rite(r){try{css();const d=document.createElement('div');d.id='s87rite';d.style.setProperty('--sc',r.col);const src=(img(r.img+'_super')||{}).src||'';
   d.innerHTML=`<small>THẦN HÓA THÀNH CÔNG</small>${src?`<img src="${src}" alt="">`:''}<b>${esc(r.name.toUpperCase())}</b><small>${esc(nm(r.i))} ✚ ${esc(nm(r.sub))}</small><small style="opacity:.7;margin-top:14px">Chạm để tiếp tục</small>`;
   d.onclick=()=>{d.style.opacity='0';setTimeout(()=>d.remove(),500);};document.body.appendChild(d);setTimeout(()=>{if(d.isConnected)d.onclick();},6000);}catch{}}
 function render(){if(!el){css();el=document.createElement('div');el.className='m63 sss87';el.hidden=true;document.body.appendChild(el);
   el.addEventListener('click',e=>{const t=e.target.closest('[data-k]');if(!t)return;const k=t.dataset.k;if(k==='close'){el.hidden=true;return;}if(k==='v'){view=+t.dataset.v;}if(k==='fuse'){fuse(view);}if(k==='form'){if(S.off[view])delete S.off[view];else S.off[view]=1;save();}render();});}
  const r=rOf(view),k=check(r),c=r.cost,a=k.a,src=(img(r.img)||{}).src||'',done=fused(r.i);
  const row=(ok,t,v)=>`<li class="${ok?'ok':''}"><span>${t}</span><i>${v}</i></li>`;
  el.style.setProperty('--sc',r.col);
  el.innerHTML=`<div class="m63-card"><div class="m63-eye">CHIẾN CƠ THẦN HÓA · BẬC SSS</div><h3>${esc(r.name)}</h3>
   <div class="s7-tabs">${D.R.map(x=>`<button data-k="v" data-v="${x.i}" aria-pressed="${x.i===view}" style="--sc:${x.col}">${fused(x.i)?'✦ ':''}#${x.i+1} + #${x.sub+1}</button>`).join('')}</div>
   <div class="s7-hero">${src?`<img src="${src}" alt="">`:'<div></div>'}<div><b>+${Math.round(r.bonus*100)}% tổng sát thương</b><small>Chiến cơ chính: <b style="display:inline;font-size:12px">#${r.i+1} ${esc(nm(r.i))}</b> (Tím+5)<br>Chiến cơ phụ: #${r.sub+1} ${esc(nm(r.sub))} (Tím)<br>Hai chiến cơ gốc giữ nguyên. Lái #${r.i+1} để dùng dạng SSS.</small></div></div>
   <div class="s7-sk"><b>✦ ${esc(r.sk.n)}</b> · hồi ${String(r.sk.cd).replace('.',',')} giây (Bạo Tẩu ${String(r.sk.cdS).replace('.',',')} giây), tự tung khi có mục tiêu.<br>${esc(r.d)}</div>
   ${done?`<p style="font-size:12px;color:#46ffb2;margin:8px 0">✦ ĐÃ THẦN HÓA · dạng SSS đang ${S.off[r.i]?'TẮT':'BẬT'}</p><button class="s7-go" data-k="form">${S.off[r.i]?'BẬT DẠNG SSS':'TẮT DẠNG SSS (về thân gốc, mất +% và kỹ năng)'}</button>`:
   `<ul>${row(a.own,'Sở hữu cả 2 chiến cơ',a.own?'✓':'✗')}${row(a.mt>=D.req.main,'#'+(r.i+1)+' khung Tím+5',a.mt>=D.req.main?'✓':'chưa đủ')}${row(a.st>=D.req.sub,'#'+(r.sub+1)+' khung Tím',a.st>=D.req.sub?'✓':'chưa đủ')}
    ${row(a.mc>=c.main,'Bản sao #'+(r.i+1),a.mc+' / '+c.main)}${row(a.sc>=c.sub,'Bản sao #'+(r.sub+1),a.sc+' / '+c.sub)}${row(a.cr>=c.cr,'◈ Hợp kim',fmt(a.cr)+' / '+fmt(c.cr))}${row(a.gem>=c.gem,'Đá khảm Tím (chưa lắp)',a.gem+' / '+c.gem)}</ul>
    <p style="font-size:11px;color:#9fc0da;margin:4px 0 8px">Bản sao lấy từ mốc Boss cuối tuần, thưởng lần đầu boss ải 120–180, lộ trình chiến cơ. Không tốn kim cương.</p>
    <button class="s7-go" data-k="fuse" ${k.ok?'':'disabled'}>${k.ok?'THẦN HÓA':esc(k.L[0])}</button>`}
   <div class="adv-btns" style="display:flex;margin-top:10px;gap:8px"><button class="m63-go" data-k="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function open(i){if(i!=null&&rOf(i))view=i;else{const c=cur();if(rOf(c))view=c;}render();}
 setInterval(()=>{try{if(!on())return;const fx=document.querySelector('#hgr41 .h1-fx');if(fx&&!fx.querySelector('[data-s87]')){const b=document.createElement('button');b.dataset.s87=1;b.className='adv69b';b.textContent='THẦN HÓA SSS';b.addEventListener('click',e=>{e.stopPropagation();open();});fx.appendChild(b);}}catch{}},1500);
 // ---------- đo "lượt bắn gốc" trong trận ----------
 let V=0,acc=0,accT=0,RATE=0;
 function track(dt){try{let sum=0;for(const s of shots){if(s.__v87)continue;s.__v87=1;if(s.dead||s.gearKind||s.art28==null||s.wing87||s.rescued28||s.sss87)continue;sum+=s.damage||0;}
   if(sum>0){V=V?V+(sum-V)*.15:sum;acc+=sum;}accT+=dt;if(accT>=.5){const r=acc/accT;RATE=RATE?RATE+(r-RATE)*.35:r;acc=0;accT=0;}}catch{}}
 // ---------- kỹ năng ----------
 let cd=3,FX=[],cast=null,nCast=0,dealt=0;
 const sup=()=>{try{return superTime>0;}catch{return false;}};
 const alive=p=>p&&!p.dead&&!(p.hp<=0);
 const bossOn=()=>{try{return !!boss&&!boss.dead&&!boss.defeatStarted&&(boss.y||0)>40;}catch{return false;}};
 const mobs=()=>{try{return enemies.filter(e=>!e.dead&&!e.rescue28&&e!==boss&&!e.bossPart&&e.y>-10&&e.y<H-30);}catch{return [];}};
 const bossPts=()=>{if(!bossOn())return [];const w=(boss.parts||[]).filter(alive);return w.length?w:[boss];};
 function dealE(e,d){if(!e||e.dead||!Number.isFinite(e.hp))return;try{Report392.hit(Math.min(e.hp,d),'skill');}catch{}dealt+=d;e.hp-=d;try{Feedback31.damage(e,d,{__x85:1});}catch{}if(e.hp<=0)try{kill(e);}catch{}}
 function coreRatio(){try{const n=(boss.parts||[]).filter(alive).length;const C=Bal86.C.wing;return n>=2?C.two:n===1?C.one:1;}catch{return 1;}}
 function dealB(d,part,pierce){try{if(!bossOn())return;let a=d;if(pierce&&(part===boss||!part))a=d/Math.max(.1,coreRatio());dealt+=d;damageBoss(a,'sss',part||boss);}catch{}}
 function dense(r){const M=mobs();let best=null,bn=0;for(const e of M){let n=0;for(const o of M)if(Math.hypot(o.x-e.x,o.y-e.y)<r)n++;if(n>bn){bn=n;best=e;}}return {p:best,n:bn};}
 function pickCenter(r){const d=dense(r),B=bossPts();if(B.length&&d.n<3){const p=B.reduce((a,b)=>Math.hypot(b.x-player.x,b.y-player.y)<Math.hypot(a.x-player.x,a.y-player.y)?b:a);return {x:p.x,y:p.y,t:p};}if(d.p)return {x:d.p.x,y:d.p.y};return null;}
 function startCast(r){const k=r.sk,S2=sup(),rad=S2?k.rS:k.r,v=Math.max(.5,V);
  if(r.i===10){const c=pickCenter(rad);if(!c)return false;cast={i:10,x:c.x,y:c.y,t:0,dur:k.dur,rad,v,tk:0,n:0,kills0:0};}
  else if(r.i===11){const T=[...bossPts(),...mobs()].filter(alive).sort((a,b)=>(b.hp||0)-(a.hp||0));if(!T.length)return false;const L=[];for(let j=0;j<k.blades;j++)L.push({tg:T[j%T.length],x:player.x+(j-3.5)*14,y:player.y-20,t:-j*.06});cast={i:11,t:0,dur:k.dur,rad,v,blades:L};}
  else{let c=null;const B=bossPts();if(B.length){const p=B.reduce((a,b)=>Math.abs(b.x-player.x)<Math.abs(a.x-player.x)?b:a);c={x:p.x,y:p.y,t:p};}else c=pickCenter(k.focus);if(!c)return false;cast={i:12,x:c.x,y:c.y,tg:c.t,t:0,dur:k.dur,rad,v,n:0,hits:new Map()};try{shield=Math.min(maxShield,shield+1);}catch{}}
  nCast++;if(window.MSG88===false)FX.push({txt:k.n,x:player.x,y:player.y-60,life:1.2,col:r.col});return true;}
 function stepCast(dt,r){const c=cast,k=r.sk;c.t+=dt;
  if(c.i===10){if(c.t<c.dur){// hút + nhịp
    for(const e of mobs()){const d=Math.hypot(e.x-c.x,e.y-c.y);if(d<c.rad&&d>4&&!e.large){e.x+=(c.x-e.x)/d*k.pull*dt;e.y+=(c.y-e.y)/d*k.pull*dt;}}
    const iv=c.dur/k.ticks;c.tk+=dt;while(c.tk>=iv&&c.n<k.ticks){c.tk-=iv;c.n++;const d=k.tick*c.v;for(const e of mobs())if(Math.hypot(e.x-c.x,e.y-c.y)<c.rad)dealE(e,d);hitBossIn(c.x,c.y,c.rad,d,false);}}
   else{let kl=0;const d=k.burst*c.v;for(const e of mobs())if(Math.hypot(e.x-c.x,e.y-c.y)<c.rad){dealE(e,d);if(e.dead)kl++;}hitBossIn(c.x,c.y,c.rad,d,false);
    if(kl>=k.healKills)try{hp=Math.min(maxHp,hp+Math.max(1,Math.round(maxHp*k.heal)));}catch{}FX.push({ring:1,x:c.x,y:c.y,r:c.rad,life:.5,col:r.col});cast=null;}}
  else if(c.i===11){// trường ngưng đọng quanh tàu
   if(c.t<c.dur){try{for(const b of bullets){if(b.dead||b.__sl87)continue;if(Math.hypot(b.x-player.x,b.y-player.y)<c.rad){b.__sl87=1;if(b.vx!=null)b.vx*=k.slow;if(b.vy!=null)b.vy*=k.slow;if(b.speed)b.speed*=k.slow;}}}catch{}}
   let left=0;for(const L of c.blades){if(L.done)continue;L.t+=dt;if(L.t<0){left++;continue;}const tg=L.tg;if(!alive(tg)&&tg!==boss){L.done=1;continue;}const dx=tg.x-L.x,dy=tg.y-L.y,dd=Math.hypot(dx,dy);
    if(dd<18||L.t>.9){const d=k.per*c.v;if(tg===boss||tg.bossPart||(boss&&(boss.parts||[]).includes(tg)))dealB(d,tg,true);else{dealE(tg,d);for(const e of mobs())if(e!==tg&&Math.hypot(e.x-tg.x,e.y-tg.y)<k.boom)dealE(e,d*.5);}FX.push({ring:1,x:tg.x,y:tg.y,r:k.boom,life:.3,col:r.col});L.done=1;}
    else{const sp=900*dt;L.x+=dx/dd*sp;L.y+=dy/dd*sp;left++;}}
   if(!left&&c.t>=c.dur)cast=null;}
  else{// 12 tia hội tụ từ 2 cổng
   if(c.tg&&alive(c.tg)){c.x=c.tg.x;c.y=c.tg.y;}const iv=c.dur/k.beams;while(c.n<k.beams&&c.t>=c.n*iv){const side=c.n%2?1:-1,px=player.x+side*70,py=player.y-30,d=k.per*c.v;c.n++;
    const ex=c.x,ey=c.y,len=Math.hypot(ex-px,ey-py)||1;for(const e of mobs()){const t=((e.x-px)*(ex-px)+(e.y-py)*(ey-py))/(len*len);if(t<0||t>1.15)continue;const qx=px+(ex-px)*t,qy=py+(ey-py)*t;if(Math.hypot(e.x-qx,e.y-qy)<20+((e.hitW||24)/2)||Math.hypot(e.x-ex,e.y-ey)<k.focus)dealE(e,d);}
    hitBossIn(ex,ey,k.focus,d,false,c);FX.push({beam:1,x:px,y:py,x2:ex,y2:ey,life:.28,col:r.col});}
   if(c.t>=c.dur)cast=null;}}
 function hitBossIn(x,y,rad,d,pierce,cst){if(!bossOn())return;let best=null,bd=1e9;for(const p of (boss.parts||[]).filter(alive)){const q=Math.hypot(p.x-x,p.y-y);if(q<rad+(p.hitW||30)/2&&q<bd){bd=q;best=p;}}
  if(!best&&Math.hypot(boss.x-x,boss.y-y)<rad+(boss.hitW||70)/2)best=boss;if(!best)return;
  if(cst&&cst.hits){const n=cst.hits.get(best)|0;cst.hits.set(best,n+1);const fb=(rOf(12)||{sk:{}}).sk.focusBonus||1;if(n>=1)d*=fb;}// hội tụ: từ tia thứ 2 trúng cùng bộ phận +25%
  dealB(d,best,pierce);}
 function update(dt){if(!on())return;track(dt);if(!playing())return;for(const f of FX)f.life-=dt;FX=FX.filter(f=>f.life>0);
  if(!active()){cast=null;return;}const r=rOf(cur());if(!r)return;
  if(cast){stepCast(dt,r);return;}cd-=dt;if(cd<=0){const ok=(bossOn()||mobs().length>=3)&&startCast(r);cd=ok?(sup()?r.sk.cdS:r.sk.cd):.5;}}
 function draw(){if(!on()||(!cast&&!FX.length))return;try{const g=ctx,r=rOf(cur()),col=r?r.col:'#fff';g.save();g.globalCompositeOperation='lighter';
  if(cast){const c=cast;if(c.i===10){const a=Math.min(1,c.t*4);const gr=g.createRadialGradient(c.x,c.y,4,c.x,c.y,c.rad);gr.addColorStop(0,'rgba(0,0,0,.9)');gr.addColorStop(.35,'rgba(120,0,30,.55)');gr.addColorStop(1,'rgba(255,40,70,0)');g.globalAlpha=.85*a;g.fillStyle=gr;g.beginPath();g.arc(c.x,c.y,c.rad,0,6.283);g.fill();
    g.strokeStyle=col;g.lineWidth=2;for(let j=0;j<6;j++){const an=c.t*3+j*1.047;g.beginPath();for(let q=0;q<=12;q++){const rr=c.rad*(1-q/12),aa=an+q*.35;g.lineTo(c.x+Math.cos(aa)*rr,c.y+Math.sin(aa)*rr);}g.stroke();}}
   else if(c.i===11){if(c.t<c.dur&&window.RING122===true){g.globalAlpha=.25*(1-c.t/c.dur)+.1;g.strokeStyle=col;g.lineWidth=2;g.setLineDash([6,6]);g.beginPath();g.arc(player.x,player.y,c.rad,0,6.283);g.stroke();g.setLineDash([]);}
    g.globalAlpha=.95;g.fillStyle=col;for(const L of c.blades){if(L.done||L.t<0)continue;const a=Math.atan2((L.tg.y-L.y),(L.tg.x-L.x));g.save();g.translate(L.x,L.y);g.rotate(a);g.beginPath();g.moveTo(14,0);g.lineTo(-10,5);g.lineTo(-6,0);g.lineTo(-10,-5);g.closePath();g.fill();g.restore();}}
   else{for(const s of [-1,1]){const px=player.x+s*70,py=player.y-30;const gq=g.createRadialGradient(px,py,0,px,py,20);gq.addColorStop(0,'#ffffffcc');gq.addColorStop(.35,col+'aa');gq.addColorStop(1,col+'00');g.globalAlpha=.8;g.fillStyle=gq;g.fillRect(px-20,py-20,40,40);}/* V125: cổng sáng mềm, không vẽ viền elip */
    g.globalAlpha=.35;g.fillStyle=col;g.beginPath();g.arc(c.x,c.y,26+Math.sin(c.t*20)*4,0,6.283);g.fill();}}
  for(const f of FX){g.globalAlpha=Math.min(1,f.life*3);if(f.beam){g.strokeStyle=f.col;g.lineWidth=7*f.life/.28+1;g.beginPath();g.moveTo(f.x,f.y);g.lineTo(f.x2,f.y2);g.stroke();g.strokeStyle='#fff';g.lineWidth=1.5;g.stroke();}
   else if(f.ring){if(window.RING122!==true)continue;g.strokeStyle=f.col;g.lineWidth=3;g.beginPath();g.arc(f.x,f.y,f.r*(1.2-f.life),0,6.283);g.stroke();}
   else if(f.txt){if(window.TEXT125!==true)continue;g.globalCompositeOperation='source-over';g.fillStyle=f.col;g.font='700 13px system-ui,sans-serif';g.textAlign='center';g.fillText('✦ '+f.txt,f.x,f.y-(1.2-f.life)*20);g.globalCompositeOperation='lighter';}}
  g.restore();}catch{}}
 function reset(){cast=null;FX=[];cd=3;V=0;RATE=0;acc=0;accT=0;}
 let H87=false;function install(){try{if(H87||typeof Equipment25==='undefined')return;H87=true;const u=Equipment25.update,d=Equipment25.draw,r=Equipment25.reset;
   Equipment25.update=function(dt){const v=u.apply(this,arguments);try{update(dt);}catch{}return v;};
   Equipment25.draw=function(){const v=d.apply(this,arguments);try{draw();}catch{}return v;};
   Equipment25.reset=function(){const v=r.apply(this,arguments);try{reset();}catch{}return v;};}catch{}}
 install();setTimeout(install,300);
 return {on,open,fuse,check,hull,mult,active,fused,volley:()=>V,rate:()=>RATE,R:D.R,state:()=>({...JSON.parse(JSON.stringify(S)),cd,cast:cast&&cast.i,nCast,dealt:Math.round(dealt),V,RATE}),_set:o=>{Object.assign(S,o);save();},_cd:x=>{cd=x;}};
})();
window.SSS87=SSS87;
