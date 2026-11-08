// V87 · ĐỒNG ĐỘI OFFLINE (Gemini REVIEW86 H5 · offlineWingman): chọn 1 chiến cơ khác trong kho bay kèm, AI tự bắn.
//  • Mở khi vượt ải 40. Bay lệch sau tàu chính (±55 px ngang, +30 px dọc), bám theo với độ trễ 0,18 giây, không nhận đạn.
//  • Sát thương = 30% sát thương đạn chính THỰC SỰ trúng mục tiêu của tàu chính (đo liên tục trong trận, 38% nếu 2 tàu nằm cùng 1 công thức hợp thể.
//  • Khóa lưu mới: saobang-wingman-slot. Tắt: window.WING87=false
const WING87_DATA={unlock:40,ratio:.30,bond:.38,   // V87 REVIEW87 Câu 3 (trước .25/.32)
 dx:55,dy:30,lag:.18,fire:.2};
const Wing87=(()=>{
 const on=()=>window.WING87===true;/* V134: bỏ đồng đội bay kèm theo chủ dự án — sát thương bù vào đạn chính (bal86) */const D=WING87_DATA,KEY='saobang-wingman-slot';
 let S={id:null,side:-1};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const nm=i=>{try{return Fighters28.profiles[i].name;}catch{return '#'+(i+1);}};
 const owns=i=>{try{return Campaign36.ownsCraft(i);}catch{return false;}};
 const playing=()=>{try{return mode==='play';}catch{return false;}};
 function cur(){try{if(playing()&&typeof launchCraft!=='undefined'&&launchCraft!=null)return launchCraft|0;}catch{}try{return selected|0;}catch{return -1;}}
 function unlocked(){try{const c=Progress.getState().cleared||[];return c.includes(D.unlock)||c.length>=D.unlock;}catch{return false;}}
 function pairs(){const L=[];try{for(const r of SSS87_DATA.R)L.push([r.i,r.sub]);}catch{}try{for(const p of FusionBlueprints.pairs)L.push(p);}catch{}return L;}
 const bonded=(a,b)=>pairs().some(p=>(p[0]===a&&p[1]===b)||(p[0]===b&&p[1]===a));
 function mate(){if(!on()||!unlocked())return null;const i=S.id;if(i==null||i===cur()||!owns(i))return null;try{if(activeRobot)return null;}catch{}return i;}
 const ratio=()=>{const m=mate();return m==null?0:bonded(cur(),m)?D.bond:D.ratio;};
 // ---------- hình ----------
 const TH={};function sprite(i){try{if(i>=10&&window.Ship83&&Ship83.hull){const h=Ship83.hull(i,false);if(h)return {im:h,sx:0,sy:0,sw:h.naturalWidth||h.width,sh:h.naturalHeight||h.height};}}catch{}
  try{const im=(typeof Evo53!=='undefined'&&Evo53.hull)?Evo53.hull(i):fighterAtlasV22;const w=(im.naturalWidth||im.width)/5,h=(im.naturalHeight||im.height)/4;if(!w)return null;return {im,sx:i%5*w,sy:Math.floor(i/5)*h,sw:w,sh:h};}catch{return null;}}
 function thumb(i){if(TH[i])return TH[i];const s=sprite(i);if(!s)return '';try{const c=document.createElement('canvas');c.width=c.height=72;c.getContext('2d').drawImage(s.im,s.sx,s.sy,s.sw,s.sh,0,0,72,72);return TH[i]=c.toDataURL();}catch{return '';}}
 // ---------- trận ----------
 // sát thương đồng đội = tỉ lệ × sát thương đạn chính THỰC SỰ trúng mục tiêu (đo liên tục), đạn riêng tự dẫn, không suy giảm theo tầm
 let P={x:0,y:0,init:0},fireT=0,dealt=0,nShot=0,B=[],MD=0,mAcc=0,mT=0;
 const isMain=src=>src&&typeof src==='object'&&src.art28!=null&&!src.gearKind&&!src.wing87&&!src.rescued28;
 let HK=false;function hookDmg(){if(HK)return;try{const ob=window.damageBoss;if(typeof ob!=='function')return;const fb=Feedback31.damage;HK=true;
   const nb=function(a,src,part){try{if(on()&&isMain(src)&&a>0)mAcc+=a*effK(part);}catch{}return ob.apply(this,arguments);};window.damageBoss=nb;try{damageBoss=nb;}catch{}
   Feedback31.damage=function(e,a,src){try{if(on()&&e&&e!==boss&&!e.bossPart&&isMain(src)&&a>0)mAcc+=a;}catch{}return fb.apply(this,arguments);};}catch{}}
 const alive=q=>q&&!q.dead&&!(q.hp<=0);
 // đạn chính bắn vào lõi khi boss còn cánh chỉ gây 25%/55% → tính theo phần gây thật, để đồng đội (ưu tiên cánh) không vượt tỉ lệ thiết kế
 function effK(part){try{if(boss&&(part==null||part===boss)){const n=(boss.parts||[]).filter(alive).length;const C=Bal86.C.wing;return n>=2?C.two:n===1?C.one:1;}}catch{}return 1;}
 function target(){try{if(boss&&!boss.dead&&!boss.defeatStarted){const w=(boss.parts||[]).filter(alive);return w.length?w.reduce((a,b)=>Math.abs(b.x-P.x)<Math.abs(a.x-P.x)?b:a):boss;}}catch{}
  let tg=null,bd=1e9;try{for(const e of enemies){if(e.dead||e.rescue28||e.y>P.y-30||e.y<0)continue;const d=Math.hypot(e.x-P.x,e.y-P.y);if(d<bd){bd=d;tg=e;}}}catch{}return tg;}
 function hit(t,d){if(t===boss||t.bossPart||(boss&&(boss.parts||[]).includes(t))){try{damageBoss(d,{wing87:1},t);}catch{}}
  else{if(t.dead||!Number.isFinite(t.hp))return;try{Report392.hit(Math.min(t.hp,d),'wing87');}catch{}t.hp-=d;try{Feedback31.damage(t,d,{wing87:1,__x85:1});}catch{}if(t.hp<=0)try{kill(t);}catch{}}dealt+=d;}
 let LT=-1;function update(dt0){hookDmg();if(!playing()){LT=-1;return;}let now=0;try{now=time;}catch{}const dt=LT<0?0:Math.max(0,Math.min(.6,now-LT));LT=now;if(dt<=0)return;mT+=dt;if(mT>=.5){const r=mAcc/mT;MD=MD?MD+(r-MD)*.3:r;mAcc=0;mT=0;}
  // đạn bay
  for(const b of B){b.t+=dt;const t=b.tg;if(t&&(alive(t)||t===boss)&&!(t===boss&&(!boss||boss.dead))){const dx=t.x-b.x,dy=t.y-b.y,dd=Math.hypot(dx,dy)||1;const r=(t.hitW||(t===boss?70:t.large?40:24))/2;
    if(dd<r+8){hit(t,b.d);b.dead=1;continue;}const sp=900;b.vx+=(dx/dd*sp-b.vx)*Math.min(1,dt*10);b.vy+=(dy/dd*sp-b.vy)*Math.min(1,dt*10);}
   b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.t>2||b.y<-40||b.x<-40||b.x>(typeof W!=='undefined'?W:480)+40)b.dead=1;}
  B=B.filter(b=>!b.dead);
  const m=mate();if(m==null){P.init=0;return;}
  const tx=player.x+S.side*D.dx,ty=player.y+D.dy;if(!P.init){P.x=tx;P.y=ty;P.init=1;}const k=1-Math.exp(-dt/D.lag);P.x+=(tx-P.x)*k;P.y+=(ty-P.y)*k;
  fireT-=dt;if(fireT>0)return;const nv=Math.min(3,1+Math.floor(-fireT/D.fire));fireT+=nv*D.fire;if(!(MD>0))return;const tg=target();if(!tg)return;
  const tot=MD*D.fire*nv*ratio(),col=(()=>{try{return Fighters28.profiles[m].color||'#9fe8ff';}catch{return '#9fe8ff';}})();
  for(const s of [-1,1]){B.push({x:P.x+s*7,y:P.y-16,vx:s*40,vy:-700,d:tot/2,tg,t:0,col});nShot++;}}
 function draw(){if(!playing())return;try{if(B.length){const g=ctx;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=window.ALPHA115===false?1:.7;for(const b of B){g.strokeStyle=b.col;g.lineWidth=3;g.beginPath();g.moveTo(b.x,b.y);g.lineTo(b.x-b.vx*.02,b.y-b.vy*.02);g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(b.x,b.y,2,0,6.283);g.fill();}g.restore();}}catch{}const m=mate();if(m==null||!P.init)return;const s=sprite(m);if(!s)return;try{const g=ctx,z=m>=10?56:50;g.save();g.globalAlpha=.92;g.drawImage(s.im,s.sx,s.sy,s.sw,s.sh,P.x-z/2,P.y-z/2,z,z);
   if(window.RING108===false&&bonded(cur(),m)){g.globalCompositeOperation='lighter';g.globalAlpha=.35+.15*Math.sin((typeof time!=='undefined'?time:0)*5);g.strokeStyle='#ffd36a';g.lineWidth=1.5;g.beginPath();g.arc(P.x,P.y,z*.55,0,6.283);g.stroke();}g.restore();}catch{}}
 function reset(){P.init=0;fireT=.3;B=[];MD=0;mAcc=0;mT=0;}
 let H87=false;function install(){try{if(H87||typeof Equipment25==='undefined')return;H87=true;const u=Equipment25.update,d=Equipment25.draw,r=Equipment25.reset;
   Equipment25.update=function(dt){const v=u.apply(this,arguments);try{if(on())update(dt);}catch{}return v;};
   Equipment25.draw=function(){const v=d.apply(this,arguments);try{if(on())draw();}catch{}return v;};
   Equipment25.reset=function(){const v=r.apply(this,arguments);try{reset();}catch{}return v;};}catch{}}
 install();setTimeout(install,300);
 // ---------- giao diện ----------
 let el=null;
 function render(){if(!el){el=document.createElement('div');el.className='m63 wing87';el.hidden=true;document.body.appendChild(el);
   el.addEventListener('click',e=>{const t=e.target.closest('[data-k]');if(!t)return;const k=t.dataset.k;if(k==='close'){el.hidden=true;return;}if(k==='pick'){S.id=t.dataset.v==='none'?null:+t.dataset.v;save();}if(k==='side'){S.side=-S.side;save();}render();});}
  const me=cur(),L=[];for(let i=0;i<13;i++)if(owns(i)&&i!==me)L.push(i);
  el.innerHTML=`<div class="m63-card"><div class="m63-eye">ĐỒNG ĐỘI · KHÔNG CẦN MẠNG</div><h3>Chọn chiến cơ bay kèm</h3>
   ${unlocked()?`<p style="font-size:12px;color:#bcd6ec;margin:4px 0 8px">Đồng đội bay sau tàu chính, tự bắn bằng <b>${Math.round(D.ratio*100)}%</b> sát thương đạn chính của bạn (<b>${Math.round(D.bond*100)}%</b> nếu 2 tàu cùng công thức hợp thể). Không bị trúng đạn.</p>
   <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(86px,1fr));gap:6px">
    <button data-k="pick" data-v="none" style="padding:8px 4px;font-size:11px;border:1px solid ${S.id==null?'#ffd36a':'rgba(120,200,255,.3)'};background:rgba(8,20,38,.8);color:#cfe6ff">Không dùng</button>
    ${L.map(i=>{const b=bonded(me,i),sel=S.id===i;const src=thumb(i);return `<button data-k="pick" data-v="${i}" style="padding:6px 4px;font-size:10px;line-height:1.3;border:1px solid ${sel?'#ffd36a':'rgba(120,200,255,.3)'};background:${sel?'rgba(60,44,10,.85)':'rgba(8,20,38,.8)'};color:#e8f4ff">${src?`<img src="${src}" alt="" style="width:48px;height:48px;display:block;margin:0 auto">`:''}#${i+1} ${esc(nm(i).split(' ').slice(-2).join(' '))}${b?'<br><b style="color:#ffd36a">✦ CỘNG HƯỞNG</b>':''}</button>`;}).join('')}</div>
   <div class="adv-btns" style="display:flex;margin-top:10px;gap:8px"><button class="m63-go" data-k="side">Vị trí: ${S.side<0?'TRÁI':'PHẢI'} ⇄</button><button class="m63-go" data-k="close">ĐÓNG</button></div>`
   :`<p style="font-size:13px;color:#ffd36a">🔒 Vượt ải ${D.unlock} để mở Đồng đội.</p><div class="adv-btns" style="display:flex;margin-top:10px"><button class="m63-go" data-k="close">ĐÓNG</button></div>`}</div>`;el.hidden=false;}
 function open(){render();}
 setInterval(()=>{try{if(!on())return;const fx=document.querySelector('#hgr41 .h1-fx');if(fx&&!fx.querySelector('[data-w87]')){const b=document.createElement('button');b.dataset.w87=1;b.className='adv69b';b.textContent='ĐỒNG ĐỘI';b.addEventListener('click',e=>{e.stopPropagation();open();});fx.appendChild(b);}}catch{}},1500);
 return {on,open,mate,ratio,bonded,state:()=>({...S,unlocked:unlocked(),mate:mate(),ratio:ratio(),dealt:Math.round(dealt),nShot,mainDps:Math.round(MD*10)/10,pos:{...P}}),_set:o=>{Object.assign(S,o);save();}};
})();
window.Wing87=Wing87;
