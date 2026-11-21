'use strict';
// V309 Lượt 8 · NGOẠI TRANG (SKIN8): nâng cấp ngay trên Tủ skin cũ (Skin69.open mở màn mới; nút "SKIN CHIẾN CƠ" vẫn mở tủ cũ, save skin cũ giữ nguyên).
//  Màn 2 tầng: khung xem trước chạy thật (canvas nhỏ, chỉ chạy khi màn mở) + 4 tab Vệt phản lực · Hiệu ứng đạn · Khung avatar · Danh hiệu.
//  Khóa lưu: saobang-skin8-v1 {trail,hit,frame,title,unl:{}} — mở khóa một lần là giữ mãi.
//  Trong trận: vệt phản lực ≤ 20 hạt cộng sáng sau đuôi tàu (vẽ ngay sau nền, uốn theo hướng lách), hiệu ứng trúng boss / tinh anh + vòng hạ quái đổi tông.
//  Sảnh: khung viền thẻ phi công (#lb68-pp) + danh hiệu dưới tên. Không dùng ctx.filter / shadowBlur. Tắt: window.SKIN8=false
const L8309=(()=>{
 const T0=performance.now();const TAU=Math.PI*2,now=()=>performance.now(),on=()=>window.SKIN8!==false;
 const KEY='saobang-skin8-v1';let S={trail:'def',hit:'def',frame:'def',title:'none',unl:{}};
 try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o)S=Object.assign(S,o);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const play=()=>{try{return mode==='play';}catch{return false;}};
 const quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 const light=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 // ---------- tiến độ mở khóa ----------
 const P={tower:()=>{try{return Meta40.state().S.tower.best|0;}catch{return 0;}},
  rob:()=>{try{const s=new Set((Fusion.getState().supers||[]).map(q=>q.model));return s.size;}catch{return 0;}},
  sss:()=>{try{return Gear44.defs().filter(d=>Gear44.owns(d.id)).length;}catch{return 0;}},
  tim5:()=>{try{let n=0;for(let i=0;i<13;i++)if(V70.isMax(i))n++;return n;}catch{return 0;}},
  esc:()=>{try{return V92.rank().best|0;}catch{return 0;}}};
 const U={tower:'tầng Tháp Boss',rob:'Chiến Thần',sss:'SSS',tim5:'chiến cơ Tím+5',esc:'điểm Vô Tận (1 trận)'};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const D={
  trail:[{id:'def',n:'Mặc định',d:'Phản lực gốc của chiến cơ.'},
   {id:'phoenix',n:'Lửa Phượng Hoàng',d:'Đuôi lửa cam–vàng lóe tia lửa.',req:[['tim5',1]],c:['#fde047','#fb923c','#ef4444']},
   {id:'galaxy',n:'Tinh Quang Ngân Hà',d:'Dải hạt trắng–lam lấp lánh.',req:[['esc',60000]],c:['#ffffff','#93c5fd','#3b82f6']},
   {id:'ice',n:'Băng Tinh Tuyệt Đối',d:'Mảnh tinh thể xanh băng tan dần.',req:[['tower',25]],c:['#e0f2fe','#67e8f9','#0ea5e9']},
   {id:'eclipse',n:'Nhật Thực Hư Không',d:'Khói tím – vàng cổ, vòng xoáy nhỏ.',req:[['rob',7]],c:['#fde68a','#a855f7','#4c1d95']}],
  hit:[{id:'def',n:'Mặc định',d:'Tia lóe gốc.'},
   {id:'gold',n:'Đế Vương Vàng Cổ',d:'Lóe vàng kim, vòng sóng vàng khi hạ quái.',req:[['sss',12]],c:['#fff7cc','#fbbf24','#b45309']},
   {id:'bolt',n:'Lôi Điện Xanh Băng',d:'Tia sét xanh băng nhảy quanh điểm trúng.',req:[['tower',15]],c:['#e0f2fe','#38bdf8','#0369a1']},
   {id:'hole',n:'Hố Đen Tím',d:'Lõi tối hút vào, viền tím.',req:[['rob',4]],c:['#f5d0fe','#a855f7','#3b0764']}],
  frame:[{id:'def',n:'Thép Xanh',d:'Khung mặc định.'},
   {id:'silver',n:'Bạc Lam',d:'Viền bạc vát cạnh ánh lam.',req:[['tower',10]]},
   {id:'gold',n:'Hoàng Kim',d:'Viền vàng kim vát cạnh.',req:[['tower',30]]},
   {id:'void',n:'Tím Hư Không',d:'Viền tím hư không.',req:[['rob',7]]},
   {id:'cosmic',n:'Vũ Trụ',d:'Viền sắc cầu vồng vũ trụ.',req:[['sss',21],['rob',7]]}],
  title:[{id:'none',n:'Không đeo',d:'Ẩn danh hiệu.'},
   {id:'boss',n:'Kẻ Diệt Boss',d:'Vượt tầng 30 Tháp Boss.',req:[['tower',30]]},
   {id:'lord',n:'Chúa Tể Tháp Boss',d:'Vượt tầng 50 Tháp Boss. Chữ vàng kim có ánh quét.',req:[['tower',50]]},
   {id:'fuse',n:'Bậc Thầy Hợp Thể',d:'Sở hữu đủ 7 Chiến Thần.',req:[['rob',7]]},
   {id:'emperor',n:'Đế Vương Vũ Trụ',d:'Đủ 21 Trang bị SSS + 7 Chiến Thần.',req:[['sss',21],['rob',7]]}]};
 const item=(t,id)=>D[t].find(x=>x.id===id)||D[t][0];
 function owned(t,x){if(!x.req)return true;const k=t+':'+x.id;if(S.unl[k])return true;if(x.req.every(([q,v])=>P[q]()>=v)){S.unl[k]=1;save();return true;}return false;}
 function cur(t){const x=item(t,S[t]);return owned(t,x)?x:D[t][0];}
 // ---------- sprite dựng 1 lần ----------
 const C={};function dot(col){const k='d'+col;if(C[k])return C[k];const n=32,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2,gr=g.createRadialGradient(h,h,0,h,h,h);
   gr.addColorStop(0,'#ffffff');gr.addColorStop(.25,col);gr.addColorStop(1,col+'00');g.fillStyle=gr;g.fillRect(0,0,n,n);return C[k]=c;}
 function gem(col){const k='g'+col;if(C[k])return C[k];const n=24,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d');g.beginPath();g.moveTo(12,1);g.lineTo(20,12);g.lineTo(12,23);g.lineTo(4,12);g.closePath();
   const gr=g.createLinearGradient(0,0,24,24);gr.addColorStop(0,'#ffffff');gr.addColorStop(.5,col);gr.addColorStop(1,'#0c4a6e');g.fillStyle=gr;g.fill();g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=1;g.stroke();return C[k]=c;}
 function ringS(col){const k='r'+col;if(C[k])return C[k];const n=96,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2,gr=g.createRadialGradient(h,h,h*.72,h,h,h);
   gr.addColorStop(0,col+'00');gr.addColorStop(.45,col);gr.addColorStop(.6,'#ffffff');gr.addColorStop(.75,col);gr.addColorStop(1,col+'00');g.fillStyle=gr;g.fillRect(0,0,n,n);return C[k]=c;}
 function holeS(){if(C.h)return C.h;const n=64,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2,gr=g.createRadialGradient(h,h,0,h,h,h);
   gr.addColorStop(0,'rgba(0,0,0,.95)');gr.addColorStop(.35,'rgba(20,0,40,.85)');gr.addColorStop(.55,'rgba(168,85,247,.9)');gr.addColorStop(.7,'rgba(245,208,254,.6)');gr.addColorStop(1,'rgba(168,85,247,0)');g.fillStyle=gr;g.fillRect(0,0,n,n);return C.h=c;}
 // ---------- vệt phản lực (dùng chung trận + xem trước) ----------
 function Trail(){return {p:[],lx:null,acc:0};}
 function trailStep(T,id,x,y,dt){const st=item('trail',id);if(id==='def'||!st.c)return;const vx=T.lx==null?0:(x-T.lx)/Math.max(dt,1e-3);T.lx=x;
   const max=light()?10:20;T.acc+=dt;const every=id==='eclipse'?.045:.028;while(T.acc>every){T.acc-=every;if(T.p.length>=max)T.p.shift();
     const s=id==='galaxy'?2+Math.random()*2.2:id==='ice'?8+Math.random()*5:id==='eclipse'?11+Math.random()*7:6+Math.random()*4;
     T.p.push({x:x+(Math.random()-.5)*8,y:y+2,vx:-vx*.25+(Math.random()-.5)*22,vy:130+Math.random()*60,t:0,l:id==='ice'?.6:id==='eclipse'?.65:.5,s,a:Math.random()*TAU,k:Math.random()});}
   for(const q of T.p){q.t+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=.96;q.a+=dt*3;}T.p=T.p.filter(q=>q.t<q.l);}
 function trailDraw(g,T,id,x,y,t){const st=item('trail',id);if(id==='def'||!st.c)return;const [c0,c1,c2]=st.c;g.save();g.globalCompositeOperation='lighter';
   if(id==='eclipse'){g.globalAlpha=.55;g.strokeStyle='#a855f7';g.lineWidth=2;g.beginPath();g.arc(x,y+6,13,t*4,t*4+TAU*.6);g.stroke();g.strokeStyle='#fde68a';g.lineWidth=1.2;g.beginPath();g.arc(x,y+6,9,-t*5,-t*5+TAU*.45);g.stroke();}
   for(const q of T.p){const u=q.t/q.l,a=1-u;
     if(id==='phoenix'){const col=u<.3?c0:u<.65?c1:c2,s=q.s*(1-u*.6)*2.4;g.globalAlpha=a*.9;g.drawImage(dot(col),q.x-s,q.y-s,s*2,s*2);if(q.k>.8){g.globalAlpha=a;g.strokeStyle=c0;g.lineWidth=1.2;g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.x-q.vx*.05,q.y-q.vy*.06);g.stroke();}}
     else if(id==='galaxy'){const tw=.55+.45*Math.sin(t*18+q.k*9),s=q.s*2.2;g.globalAlpha=a*tw;g.drawImage(dot(q.k>.5?c1:c0),q.x-s,q.y-s,s*2,s*2);if(q.k>.7){g.strokeStyle=c0;g.lineWidth=.8;g.beginPath();g.moveTo(q.x-s*1.4,q.y);g.lineTo(q.x+s*1.4,q.y);g.moveTo(q.x,q.y-s*1.4);g.lineTo(q.x,q.y+s*1.4);g.stroke();}}
     else if(id==='ice'){const s=q.s*(1-u*.5);g.globalAlpha=a;g.save();g.translate(q.x,q.y);g.rotate(q.a);g.drawImage(gem(c1),-s/2,-s/2,s,s);g.restore();}
     else if(id==='eclipse'){const s=q.s*(.7+u*.8);g.globalAlpha=a*.6;g.drawImage(dot(q.k>.75?c0:c1),q.x-s,q.y-s,s*2,s*2);}}
   g.restore();}
 // ---------- hiệu ứng trúng / hạ quái ----------
 function Fx(){return [];}
 function fxHit(L,id,x,y){if(id==='def')return;if(L.length>16)L.shift();L.push({k:'h',x,y,t:0,l:id==='bolt'?.16:.18,id,r:Math.random()*TAU});}
 function fxKill(L,id,x,y,r){if(id==='def')return;if(L.length>16)L.shift();L.push({k:'k',x,y,t:0,l:.26,id,s:r||22});}
 function fxDraw(g,L,dt){if(!L.length)return;g.save();g.globalCompositeOperation='lighter';
   for(const f of L){f.t+=dt;const u=f.t/f.l;if(u>=1)continue;const st=item('hit',f.id),[c0,c1]=st.c,a=1-u;
     if(f.k==='h'){if(f.id==='hole'){const s=26*(1-u*.6);g.globalCompositeOperation='source-over';g.globalAlpha=a*.85;g.drawImage(holeS(),f.x-s,f.y-s,s*2,s*2);g.globalCompositeOperation='lighter';}
       else{const s=18+14*u;g.globalAlpha=a;g.drawImage(dot(c1),f.x-s,f.y-s,s*2,s*2);}
       if(f.id==='bolt'){g.globalAlpha=a;g.strokeStyle=c0;g.lineWidth=1.4;for(let j=0;j<3;j++){const an=f.r+j*TAU/3;let px=f.x,py=f.y;g.beginPath();g.moveTo(px,py);for(let s=1;s<=3;s++){px+=Math.cos(an)*9+(Math.random()-.5)*8;py+=Math.sin(an)*9+(Math.random()-.5)*8;g.lineTo(px,py);}g.stroke();}}
       if(f.id==='gold'){g.globalAlpha=a*.9;g.strokeStyle=c0;g.lineWidth=1.5;const L2=10+16*u;g.beginPath();g.moveTo(f.x-L2,f.y);g.lineTo(f.x+L2,f.y);g.moveTo(f.x,f.y-L2);g.lineTo(f.x,f.y+L2);g.stroke();}}
     else{const e=1-(1-u)*(1-u),R=f.s*(.6+1.8*e);if(f.id==='hole'){const R2=f.s*(2.2-1.6*e);g.globalAlpha=a*.9;g.drawImage(ringS(c1),f.x-R2,f.y-R2,R2*2,R2*2);}else{g.globalAlpha=a*.85;g.drawImage(ringS(c1),f.x-R,f.y-R,R*2,R*2);}}}
   for(let i=L.length-1;i>=0;i--)if(L[i].t>=L[i].l)L.splice(i,1);g.restore();}
 // ---------- trong trận ----------
 const BT=Trail(),BF=Fx();let lt=0;
 function battleBack(){if(!on()||!play())return;const t=now()/1000,dt=Math.min(.05,lt?t-lt:.016);lt=t;const id=cur('trail').id;if(id==='def')return;
   let x=0,y=0;try{x=player.x;y=player.y+24;}catch{return;}trailStep(BT,id,x,y,dt);trailDraw(ctx,BT,id,x,y,t);}
 let lf=0;function battleFront(){if(!on())return;const t=now()/1000,dt=Math.min(.05,lf?t-lf:.016);lf=t;if(!play()){BF.length=0;return;}fxDraw(ctx,BF,dt);}
 const hcd=new WeakMap();
 function hooks(){
  // vệt vẽ ngay trước thân tàu (bọc SuperGame.drawShip ngoài cùng, sau l3309 / wing309; giữ cờ của 2 lớp đó để chúng không bọc lại)
  try{if(typeof SuperGame!=='undefined'&&SuperGame.drawShip&&!SuperGame.drawShip.__l8&&(SuperGame.drawShip.__l3||now()-T0>2500)){const od=SuperGame.drawShip;const f=function(){try{battleBack();}catch{}return od.apply(this,arguments);};f.__l8=1;f.__l3=od.__l3;f.__w309=od.__w309;SuperGame.drawShip=f;}}catch{}
  try{if(!VisualFX.__l8){VisualFX.__l8=1;const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{battleFront();}catch{}return r;};}}catch{}
  try{if(!Feedback31.__l8){Feedback31.__l8=1;const fd=Feedback31.damage;Feedback31.damage=function(e,amount){const r=fd.apply(this,arguments);try{if(on()&&play()&&e){let big=false;try{big=e===boss||e.bossPart||e.elite;}catch{}const id=cur('hit').id;
     if(big&&id!=='def'){const n=now();if((hcd.get(e)||0)<n){hcd.set(e,n+90);fxHit(BF,id,e.x+(Math.random()-.5)*30,e.y+(e===boss?30:8)+(Math.random()-.5)*16);}}}}catch{}return r;};}}catch{}
  try{if(typeof kill==='function'&&!kill.__l8){const ok=kill;const f=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(on()&&was&&e.dead&&play()){let isB=false;try{isB=e===boss;}catch{}const id=cur('hit').id;if(!isB&&id!=='def')fxKill(BF,id,e.x,e.y,(e.r||20)*(e.elite?1.4:1));}}catch{}return r;};f.__l8=1;kill=f;}}catch{}}
 hooks();setTimeout(hooks,0);setTimeout(hooks,1500);setTimeout(hooks,3000);setTimeout(hooks,6000);
 // ---------- Sảnh: khung + danh hiệu ----------
 function lobby(){const pp=document.getElementById('lb68-pp'),nm=document.getElementById('lb68-pnm');if(!pp||!nm)return;
   const fr=on()?cur('frame').id:'',tt=on()?cur('title'):null;
   pp.classList.forEach(c=>{if(/^fr8/.test(c)&&c!=='fr8'&&c!=='fr8-'+fr)pp.classList.remove(c);});if(fr){pp.classList.add('fr8','fr8-'+fr);}else pp.classList.remove('fr8');
   let el=nm.parentNode.querySelector('.tt8');if(!tt||tt.id==='none'){if(el)el.remove();return;}
   if(!el){el=document.createElement('i');el.className='tt8';nm.insertAdjacentElement('afterend',el);}if(el.dataset.id!==tt.id){el.dataset.id=tt.id;el.className='tt8 tt8-'+tt.id;el.textContent='★ '+tt.n.toUpperCase();}}
 // ---------- màn Ngoại trang ----------
 let el=null,tab='trail',pv=null,raf=0,origOpen=null,pick={};
 function progTxt(x){return x.req.map(([q,v])=>{const h=Math.min(P[q](),v);return `<span><em style="width:${Math.round(h/v*100)}%"></em><b>${fmt(h)}/${fmt(v)} ${U[q]}</b></span>`;}).join('');}
 function card(t,x){const own=owned(t,x),use=cur(t).id===x.id,sel=(pick[t]||cur(t).id)===x.id;const sw=x.c?`<i class="sw8" style="background:linear-gradient(90deg,${x.c.join(',')})"></i>`:t==='frame'?`<i class="sw8 fr8 fr8-${x.id}"></i>`:t==='title'?`<i class="sw8 tt8 tt8-${x.id}">${x.id==='none'?'—':'★'}</i>`:'<i class="sw8 def"></i>';
   return `<button type="button" class="it8 ${own?'':'lk'} ${use?'use':''} ${sel?'sel':''}" data-it8="${x.id}">${sw}<span class="nm"><b>${x.n}</b><small>${x.d}</small>${own?'':`<span class="pg8">${progTxt(x)}</span>`}</span><em class="st8">${use?'ĐANG DÙNG':own?'DÙNG':'🔒'}</em></button>`;}
 function render(){if(!el)return;el.querySelectorAll('[data-t8]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.t8===tab)));
   el.querySelector('.ls8').innerHTML=D[tab].map(x=>card(tab,x)).join('');
   const hd=el.querySelector('.hd8');const fr=pick.frame||cur('frame').id,tt=item('title',pick.title||cur('title').id);let nm='PHI CÔNG';try{nm=document.getElementById('lb68-pnm').textContent||nm;}catch{}
   let face='';try{const p=document.getElementById('lb68-pp');face=p?p.innerHTML:'';}catch{}
   hd.innerHTML=`<span class="av8 fr8 fr8-${fr}">${face}</span><span class="nm8"><b>${nm}</b>${tt.id==='none'?'':`<i class="tt8 tt8-${tt.id}">« ${tt.n.toUpperCase()} »</i>`}</span>`;
   const sum=el.querySelector('.sum8');const cnt=k=>D[k].filter(x=>owned(k,x)).length;sum.textContent=`Đã mở: vệt ${cnt('trail')}/5 · đạn ${cnt('hit')}/4 · khung ${cnt('frame')}/5 · danh hiệu ${cnt('title')-1}/4`;}
 function shipImg(){try{const i=selected,s=SHIP118[String(i)];const k=s&&(s.tim5||s.tim||Object.values(s)[0]);const im=new Image();im.src=k;return im;}catch{return null;}}
 function loop(){if(!el||el.hidden){raf=0;return;}raf=requestAnimationFrame(loop);const c=pv.c,g=c.getContext('2d'),W2=c.width,H2=c.height,t=now()/1000,dt=Math.min(.05,pv.lt?t-pv.lt:.016);pv.lt=t;
   g.globalCompositeOperation='source-over';g.globalAlpha=1;const bg=g.createLinearGradient(0,0,0,H2);bg.addColorStop(0,'#05081a');bg.addColorStop(1,'#0b1a33');g.fillStyle=bg;g.fillRect(0,0,W2,H2);
   for(const s of pv.st){s.y+=s.v*dt;if(s.y>H2)s.y=0;g.fillStyle=`rgba(200,225,255,${s.a})`;g.fillRect(s.x,s.y,s.s,s.s);}
   const x=W2/2+Math.sin(t*1.3)*W2*.28,y=H2*.7+Math.sin(t*2.1)*6;const tid=pick.trail||cur('trail').id,hid=pick.hit||cur('hit').id;
   trailStep(pv.T,tid,x,y+22,dt);trailDraw(g,pv.T,tid,x,y+22,t);
   const tx=W2/2+Math.sin(t*.7)*W2*.15,ty=34;g.save();g.translate(tx,ty);g.rotate(t*.6);g.strokeStyle='rgba(248,113,113,.85)';g.lineWidth=2;g.beginPath();for(let j=0;j<6;j++){const a=j/6*TAU;j?g.lineTo(Math.cos(a)*15,Math.sin(a)*15):g.moveTo(15,0);}g.closePath();g.stroke();g.fillStyle='rgba(127,29,29,.5)';g.fill();g.restore();
   pv.sh-=dt;if(pv.sh<=0){pv.sh=.16;pv.b.push({x,y:y-24});}
   g.save();g.globalCompositeOperation='lighter';for(const b of pv.b){b.y-=420*dt;b.x+=(tx-b.x)*dt*3;g.drawImage(dot('#7dd3fc'),b.x-6,b.y-10,12,20);if(b.y<ty+12){b.dead=true;fxHit(pv.F,hid,tx+(Math.random()-.5)*10,ty+10);}}g.restore();pv.b=pv.b.filter(b=>!b.dead);
   pv.kt-=dt;if(pv.kt<=0){pv.kt=1.6;fxKill(pv.F,hid,W2*(.2+Math.random()*.6),40+Math.random()*30,20);}
   fxDraw(g,pv.F,dt);
   if(pv.im&&pv.im.complete&&pv.im.naturalWidth){const s=84;g.globalCompositeOperation='source-over';g.globalAlpha=1;g.drawImage(pv.im,x-s/2,y-s/2,s,s);}}
 function apply(t,id){const x=item(t,id);pick[t]=id;if(owned(t,x)){S[t]=id;save();lobby();}render();}
 function open(){if(!on()){return origOpen&&origOpen.apply(this,arguments);}
   if(!el){el=document.createElement('div');el.className='m63 sk8';el.hidden=true;el.innerHTML=`<div class="m63-card"><div class="m63-eye">NGOẠI TRANG</div><button class="m63-x" data-x8="1" aria-label="Đóng">×</button>
     <div class="pv8"><canvas width="360" height="190"></canvas><div class="hd8"></div></div><p class="sum8"></p>
     <div class="tb8"><button data-t8="trail">VỆT PHẢN LỰC</button><button data-t8="hit">HIỆU ỨNG ĐẠN</button><button data-t8="frame">KHUNG AVATAR</button><button data-t8="title">DANH HIỆU</button></div>
     <div class="ls8"></div><button type="button" class="old8" data-old8="1">SKIN CHIẾN CƠ (MÀU THÂN) ›</button></div>`;
     el.addEventListener('click',e=>{const t=e.target;if(t===el||t.closest('[data-x8]')){close();return;}const b=t.closest('[data-t8]');if(b){tab=b.dataset.t8;render();return;}
       const it=t.closest('[data-it8]');if(it){apply(tab,it.dataset.it8);return;}if(t.closest('[data-old8]')){close();try{origOpen&&origOpen.call(Skin69);}catch{}}});
     document.body.appendChild(el);pv={c:el.querySelector('canvas'),T:Trail(),F:Fx(),b:[],sh:0,kt:.5,lt:0,st:Array.from({length:40},()=>({x:Math.random()*360,y:Math.random()*190,v:20+Math.random()*50,s:Math.random()<.2?2:1,a:.3+Math.random()*.6}))};}
   pick={};pv.im=shipImg();render();el.hidden=false;if(!raf)raf=requestAnimationFrame(loop);}
 function close(){if(el)el.hidden=true;pick={};}
 function hookOpen(){try{if(typeof Skin69!=='undefined'&&!Skin69.__l8){Skin69.__l8=1;origOpen=Skin69.open;Skin69.open=function(){return open.apply(this,arguments);};}}catch{}}
 hookOpen();setTimeout(hookOpen,0);setTimeout(hookOpen,1500);
 // nút TỦ SKIN cũ (data-sk69, kể cả lối tắt SKIN ở Sảnh / tab Phi đội) gọi open() nội bộ của Skin69 → chặn ở pha bắt để mở màn mới
 document.addEventListener('click',e=>{if(!on())return;const b=e.target&&e.target.closest&&e.target.closest('[data-sk69]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();open();},true);
 // ---------- Sảnh gọn (chủ dự án 21/11 16:42). Tắt: window.SANH8=false ----------
 //  (1) hàng tài nguyên trên cùng chỉ 3 ô: Thể lực · Hợp kim · Kim cương (ẩn ô Đá XP + Lõi Siêu Hợp; bỏ dòng 💎/🔋 dưới TỔNG LỰC CHIẾN)
 //  (2) bỏ hình viền bậc cũ (RankArt: cánh nét + elip hồng–tím) quanh chiến cơ khi KHÔNG trong trận (sân khấu sảnh)
 const sOn=()=>window.SANH8!==false;
 function res8(){const r=document.querySelector('#hgr41 .h1-res');if(!r)return;document.documentElement.classList.toggle('sanh8',sOn());if(!sOn())return;
   const U=window.UI307_IMG||{};const ic=(k)=>U[k]?`<i data-ic74="1"><img class="ic74r" src="${U[k]}" alt=""></i>`:'<i></i>';
   if(!r.querySelector('.en8')){const d=document.createElement('div');d.className='h1-chip stone en8';d.title='Thể lực';d.innerHTML=ic('icon_stamina')+'<b data-en75>0</b><button type="button" aria-label="Thể lực">+</button>';d.addEventListener('click',e=>{e.stopPropagation();const b=document.querySelector('.en75');if(b)b.click();},true);r.insertBefore(d,r.firstChild);}
   if(!r.querySelector('.dm8')){const d=document.createElement('div');d.className='h1-chip gem dm8';d.title='Kim cương';d.innerHTML=ic('icon_diamond')+'<b data-gem74>0</b><button type="button" aria-hidden="true" tabindex="-1" style="visibility:hidden">+</button>';r.appendChild(d);}
   const coin=r.querySelector('.h1-chip.coin');if(coin&&coin.previousElementSibling!==r.querySelector('.en8'))r.insertBefore(coin,r.querySelector('.dm8'));
   try{const g=document.querySelector('#hgr41 .gem74 [data-gem74]');if(g)r.querySelector('.dm8 b').textContent=g.textContent;const e=document.querySelector('#hgr41 .gem74 [data-en75]');if(e)r.querySelector('.en8 b').textContent=e.textContent+'/120';}catch{}}
 function rankHook(){try{if(typeof RankArt==='undefined'||RankArt.__l8)return;RankArt.__l8=1;const od=RankArt.draw;RankArt.draw=function(c,i){try{if(sOn()&&typeof mode!=='undefined'&&mode!=='play'&&mode!=='pause'&&i&&!i.kind)return;}catch{}return od.apply(this,arguments);};}catch{}}
 rankHook();setTimeout(rankHook,0);setTimeout(rankHook,1500);setTimeout(rankHook,4000);
 setInterval(()=>{try{lobby();res8();}catch{}},600);
 return {S,P,D,open,close,owned,cur,save,lobby,render};
})();
