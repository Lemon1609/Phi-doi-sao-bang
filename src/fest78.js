'use strict';
// FEST78 · Lễ hội theo lịch thật (giờ VN), không cần mạng. Mỗi lễ hội:
//  • Quà lễ hội mỗi ngày (20 💎 + 3.000 ◈) · bảng QUÀ có dòng lễ hội nổi đầu.
//  • Hạ quái (Chiến dịch/Vô tận/Tháp…) 4% rơi 1 vật phẩm lễ hội (tối đa 60/ngày) → đổi ở tiệm lễ hội.
//  • Trận đấu có hạt trang trí nhẹ theo chủ đề trên nền (tắt: window.FEST78_FX=false).
//  • 120 vật phẩm: danh hiệu + hào quang lễ hội quanh chiến cơ (bật/tắt).
//  Kinh tế: tối đa ~28 💎/ngày trong mùa lễ (≈ +12% so với BALANCE75), chỉ trong vài ngày lễ.
//  Kiểm thử: window.__fest78 = 'halloween' | 'noel' | 'tet' | 'trungthu' | 'quockhanh' | 'thongnhat'.
const FEST78={
 GIFT:{gem:20,alloy:3000},DROP:.04,DAY_CAP:60,
 LIST:[
  {id:'halloween',n:'LỄ HỘI BÍ NGÔ',ic:'🎃',tok:'🎃',tn:'Bí ngô',col:'#ff8a1f',fx:['🎃','🦇','👻'],md:[['10-20','11-03']]},
  {id:'noel',n:'GIÁNG SINH & NĂM MỚI',ic:'🎄',tok:'❄',tn:'Bông tuyết',col:'#7ee8ff',fx:['❄','✦','🎁'],md:[['12-20','12-31'],['01-01','01-04']]},
  {id:'tet',n:'TẾT NGUYÊN ĐÁN',ic:'🧧',tok:'🧧',tn:'Lì xì',col:'#ff3b4e',fx:['🌸','🧧','🏮'],lunar:['2027-02-06','2028-01-26','2029-02-13','2030-02-03','2031-01-23'],pre:6,post:8},
  {id:'trungthu',n:'TẾT TRUNG THU',ic:'🏮',tok:'🥮',tn:'Bánh nướng',col:'#ffd166',fx:['🏮','🌕','✨'],lunar:['2027-09-15','2028-10-03','2029-09-22','2030-09-12','2031-10-01'],pre:5,post:3},
  {id:'thongnhat',n:'NGÀY HỘI PHI ĐỘI · 30/4',ic:'⭐',tok:'⭐',tn:'Sao vàng',col:'#ffdf5d',fx:['⭐','✦','🎆'],md:[['04-28','05-02']]},
  {id:'quockhanh',n:'NGÀY HỘI PHI ĐỘI · 2/9',ic:'⭐',tok:'⭐',tn:'Sao vàng',col:'#ffdf5d',fx:['⭐','✦','🎆'],md:[['08-31','09-03']]}],
 SHOP:[{id:'alloy',n:'2.000 hợp kim',cost:10,lim:10},{id:'gem',n:'15 kim cương',cost:25,lim:5},{id:'shard',n:'5 mảnh phi công chính',cost:40,lim:3},
  {id:'ph',n:'1 bản sao Lam Lv1 · chiến cơ đang dùng',cost:60,lim:2},{id:'aura',n:'Danh hiệu + Hào quang lễ hội',cost:120,lim:1}]};
const Fest78=(()=>{
 const C=FEST78,KEY='saobang-fest78',TAU=Math.PI*2;
 let S={tok:{},gift:'',day:{d:'',n:0},buy:{},aura:{},on:''};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const T=m=>{try{toast(m);}catch{}};const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const vn=()=>new Date(Date.now()+7*3600000);const today=()=>vn().toISOString().slice(0,10);
 function active(){if(window.__fest78)return C.LIST.find(f=>f.id===window.__fest78)||null;const d=vn(),md=d.toISOString().slice(5,10),t=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate());
  for(const f of C.LIST){if(f.md&&f.md.some(([a,b])=>md>=a&&md<=b))return f;if(f.lunar)for(const s of f.lunar){const x=Date.parse(s+'T00:00:00Z');if(t>=x-f.pre*864e5&&t<=x+f.post*864e5)return f;}}return null;}
 const key=f=>{const y=+today().slice(0,4),md=today().slice(5);if(f.lunar)return f.id+'@'+(f.lunar.find(s=>Math.abs(Date.parse(s)-Date.now())<40*864e5)||y);return f.id+'@'+(f.id==='noel'&&md<'06'?y-1:y);};
 const tok=f=>S.tok[key(f)]|0;
 const used=(f,id)=>S.buy[key(f)+'#'+id]|0;
 function claimGift(){const f=active();if(!f)return false;if(S.gift===today()){T('ĐÃ NHẬN QUÀ LỄ HỘI HÔM NAY');return false;}S.gift=today();save();try{Econ74.add(C.GIFT.gem,f.n.toLowerCase());}catch{}try{Progress.grantCredits(C.GIFT.alloy);}catch{}T(f.ic+' QUÀ LỄ HỘI · +'+C.GIFT.gem+' 💎 +'+fmt(C.GIFT.alloy)+' ◈');return true;}
 function buy(id){const f=active();if(!f)return false;const it=C.SHOP.find(x=>x.id===id);if(!it)return false;if(used(f,id)>=it.lim){T('ĐÃ ĐỔI ĐỦ');return false;}if(tok(f)<it.cost){T('THIẾU '+f.tn.toUpperCase());return false;}
  try{if(id==='alloy')Progress.grantCredits(2000);else if(id==='gem')Econ74.add(15,'tiệm lễ hội');else if(id==='shard'){const st=Pilot67.state();const p=st.team&&st.team[0]&&st.own[st.team[0]]?st.team[0]:Object.keys(st.own)[0];if(p==null){T('CHƯA CÓ PHI CÔNG');return false;}Pilot67._piece(+p,5);}
   else if(id==='ph'){let c=0;try{c=launchCraft|0;}catch{}V70.phAdd('craft',c,2,1);}else if(id==='aura'){S.aura[f.id]=1;S.on=f.id;}}catch{return false;}
  S.tok[key(f)]=tok(f)-it.cost;S.buy[key(f)+'#'+id]=used(f,id)+1;save();T('ĐÃ ĐỔI · '+it.n);return true;}
 // ---- rơi vật phẩm khi hạ quái ----
 const pops=[];
 function onKill(e){const f=active();if(!f||!e||e.rescue28)return;if(S.day.d!==today())S.day={d:today(),n:0};if(S.day.n>=C.DAY_CAP)return;if(Math.random()>=C.DROP*(e.large||e.elite?3:1))return;
  S.day.n++;S.tok[key(f)]=tok(f)+1;save();if(window.FEST103!==false){if(D.length<14)D.push({x:e.x,y:e.y,vx:(Math.random()-.5)*140,vy:-90-Math.random()*60,t:0,r:Math.random()*TAU});}else pops.push({x:e.x,y:e.y,t:0,s:'+1 '+f.tok});}
 // ---- V103 · vật phẩm lễ hội rơi thật: bay ra, tự hút về tàu, nhặt có tia sáng (vẫn cộng ngay khi hạ quái, không mất token) ----
 const D=[],SP=[],SPR={};
 function art(f,k){const A=window.FEST103_ART||{};const id=(f.id==='thongnhat'||f.id==='quockhanh')?'star':f.id;if(k.startsWith('fx')&&!A[id+'_'+k]&&f.fx[+k.slice(2)]===f.tok)k='token';return A[id+'_'+k]||null;}
 function sprite(f,k,ch,sz,orb){const id=f.id+'|'+k+'|'+sz;if(SPR[id])return SPR[id];const c=document.createElement('canvas');c.width=c.height=sz;const g=c.getContext('2d');const m=sz/2,src=art(f,k);
  const glow=()=>{const rg=g.createRadialGradient(m,m,0,m,m,m);rg.addColorStop(0,f.col+'aa');rg.addColorStop(.5,f.col+'44');rg.addColorStop(1,f.col+'00');g.fillStyle=rg;g.fillRect(0,0,sz,sz);};
  if(src){const im=new Image();im.onload=()=>{g.clearRect(0,0,sz,sz);if(orb)glow();const z=orb?sz*.78:sz;g.drawImage(im,m-z/2,m-z/2,z,z);};im.src=src;SPR[id]=c;return c;}
  if(orb){glow();g.strokeStyle='#ffffffcc';g.lineWidth=sz*.035;g.beginPath();g.arc(m,m,sz*.3,0,TAU);g.stroke();}
  g.textAlign='center';g.textBaseline='middle';g.font=Math.round(sz*(orb?.42:.8))+'px sans-serif';g.fillText(ch,m,m+sz*.03);SPR[id]=c;return c;}
 function stepDrops(dt){let px=240,py=900;try{px=player.x;py=player.y;}catch{}
  for(const d of D){d.t+=dt;d.r+=dt*3;if(d.t<.45){d.x+=d.vx*dt;d.y+=d.vy*dt;d.vy+=260*dt;d.vx*=.96;}else{const dx=px-d.x,dy=py-d.y,L=Math.hypot(dx,dy)||1,sp=260+(d.t-.45)*900;d.x+=dx/L*Math.min(L,sp*dt);d.y+=dy/L*Math.min(L,sp*dt);if(L<20){d.dead=1;for(let i=0;i<6;i++){const a=i/6*TAU+d.r;SP.push({x:px,y:py-6,vx:Math.cos(a)*120,vy:Math.sin(a)*120,t:0});}}}
   if(d.t>4)d.dead=1;}
  for(let i=D.length-1;i>=0;i--)if(D[i].dead)D.splice(i,1);for(const q of SP){q.t+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;}while(SP.length&&SP[0].t>.35)SP.shift();}
 function drawDrops(f){if(!D.length&&!SP.length)return;const im=sprite(f,'token',f.tok,112,true);ctx.save();
  for(const d of D){const s=1+Math.sin(d.t*9)*.08,z=38*s;ctx.save();ctx.translate(d.x,d.y);ctx.rotate(Math.sin(d.r)*.25);ctx.drawImage(im,-z/2,-z/2,z,z);ctx.restore();}
  ctx.globalCompositeOperation='lighter';ctx.fillStyle=f.col;for(const q of SP){ctx.globalAlpha=1-q.t/.35;ctx.fillRect(q.x-2,q.y-2,4,4);}ctx.restore();}

 // ---- trang trí trận ----
 const P=[];
 function fx(dt){const f=active();if(!f){D.length=0;return;}if(window.FEST78_FX===false){P.length=0;stepDrops(dt);return;}const Wd=typeof W==='number'?W:480,Hd=typeof H==='number'?H:1100;
  while(P.length<10)P.push({x:Math.random()*Wd,y:Math.random()*Hd,v:18+Math.random()*26,s:14+Math.random()*12,r:Math.random()*TAU,g:f.fx[Math.floor(Math.random()*f.fx.length)]});
  for(const p of P){p.y+=p.v*dt;p.r+=dt*.5;if(p.y>Hd+20){p.y=-20;p.x=Math.random()*Wd;}}stepDrops(dt);for(const q of pops)q.t+=dt;while(pops.length&&pops[0].t>1)pops.shift();}
 function drawBg(){const f=active();if(!f||window.FEST78_FX===false||!P.length)return;ctx.save();ctx.globalAlpha=.28;ctx.textAlign='center';ctx.textBaseline='middle';for(const p of P){const im=sprite(f,'fx'+f.fx.indexOf(p.g),p.g,72,false),z=p.s*1.15;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.sin(p.r)*.4);ctx.drawImage(im,-z/2,-z/2,z,z);ctx.restore();}ctx.restore();}
 function drawTop(){const f=active();if(!f)return;drawDrops(f);for(const q of pops){ctx.save();ctx.globalAlpha=1-q.t;ctx.fillStyle=f.col;ctx.font="900 13px 'Neo',sans-serif";ctx.textAlign='center';ctx.fillText(q.s,q.x,q.y-20-q.t*26);ctx.restore();}
  const id=S.on;if(id&&S.aura[id]&&!(window.AURA85&&!AURA85.allow('fest78'))){const a=C.LIST.find(x=>x.id===id);if(a){const t=performance.now()/1000;ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=a.col;ctx.globalAlpha=.35+.15*Math.sin(t*3);ctx.lineWidth=2;ctx.beginPath();ctx.arc(player.x,player.y+6,46,0,TAU);ctx.stroke();ctx.globalAlpha=.55;ctx.font='13px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';for(let i=0;i<3;i++){const an=t*.9+i*TAU/3;ctx.fillText(a.ic,player.x+Math.cos(an)*46,player.y+6+Math.sin(an)*46);}ctx.restore();}}}
 // ---- giao diện ----
 let el=null;
 function open(){const f=active();if(!f){T('HIỆN CHƯA CÓ LỄ HỘI');return;}if(!el){el=document.createElement('div');el.className='m63 f78p';document.body.appendChild(el);
   el.addEventListener('click',e=>{const b=e.target.closest('[data-f78]');if(!b){if(e.target===el)el.hidden=true;return;}const a=b.dataset.f78;if(a==='x')el.hidden=true;else if(a==='gift'){if(claimGift())render();}else if(a==='buy'){if(buy(b.dataset.id))render();}else if(a==='tg'){S.on=S.on===b.dataset.id?'':b.dataset.id;save();render();}});}
  render();el.hidden=false;}
 function render(){const f=active();if(!f){el.hidden=true;return;}const n=tok(f);
  const rows=C.SHOP.map(it=>{const u=used(f,it.id),own=it.id==='aura'&&S.aura[f.id];return `<div class="v77-it"><div><b>${it.id==='aura'?'Danh hiệu «'+f.n.replace(/ ·.*/,'')+'» + Hào quang':it.n}</b><small>${u}/${it.lim} · ${it.cost} ${f.tok}</small></div>${own?`<button data-f78="tg" data-id="${f.id}" class="${S.on===f.id?'on':''}">${S.on===f.id?'ĐANG BẬT':'BẬT'}</button>`:`<button data-f78="buy" data-id="${it.id}" ${u>=it.lim||n<it.cost?'disabled':''}>${it.cost} ${f.tok}</button>`}</div>`;}).join('');
  el.innerHTML=`<div class="m63-card v75-card0" style="--fc:${f.col}"><div class="v75-top"><b>${f.ic} ${f.n}</b><button data-f78="x" class="v75-x">✕</button></div>
   <p class="v75-s">${f.tn} đang có: <b>${fmt(n)} ${f.tok}</b> · hôm nay nhặt ${S.day.d===today()?S.day.n:0}/${C.DAY_CAP}. Hạ quái có cơ hội rơi ${f.tok} (quái lớn/tinh anh ×3).</p>
   <button class="m63-go ${S.gift===today()?'off':''}" data-f78="gift">${S.gift===today()?'ĐÃ NHẬN QUÀ HÔM NAY':'NHẬN QUÀ LỄ HỘI · '+C.GIFT.gem+' 💎 + '+fmt(C.GIFT.alloy)+' ◈'}</button>
   <div class="v77-l" style="margin-top:10px">${rows}</div></div>`;}
 const ready=()=>!!active()&&S.gift!==today();
 function install(){
  try{const ok=kill;kill=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(was&&e.dead&&typeof mode!=='undefined'&&mode==='play')onKill(e);}catch{}return r;};}catch{}
  try{const ou=update;update=function(dt){const r=ou.apply(this,arguments);try{if(typeof mode!=='undefined'&&mode==='play')fx(dt);}catch{}return r;};}catch{}
  try{const ob=Report392.background;Report392.background=function(){const r=ob.apply(this,arguments);try{if(mode==='play'||mode==='pause')drawBg();}catch{}return r;};}catch{}
  try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{if(mode==='play'||mode==='pause')drawTop();}catch{}return r;};}catch{}}
 setTimeout(()=>{try{install();}catch(e){console.warn('FEST78',e);}},0);
 return {_dbg:()=>({P:P.map(p=>p.y|0).slice(0,3),D:D.map(d=>[d.x|0,d.y|0,+d.t.toFixed(2)])}),drops:()=>D.length,_kill:onKill,active,open,claimGift,buy,ready,state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();}};
})();
