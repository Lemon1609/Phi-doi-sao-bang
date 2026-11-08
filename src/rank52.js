'use strict';
// V52 · TIẾN HÓA HÌNH ẢNH theo mốc cường hóa (chỉ hình ảnh, KHÔNG đổi sát thương / cân bằng).
//  Mốc (bậc 0–3):
//   • Trang bị thường & chiến cơ (+0…+5): +0 → 0 · +1–2 → 1 SÁNG · +3–4 → 2 LẤP LÁNH · +5 → 3 HOÀN MỸ
//   • Trang bị SSS (+0…+10):             +0–2 → 0 · +3–5 → 1 · +6–8 → 2 · +9–10 → 3 TỐI THƯỢNG
//  Hiệu ứng:
//   • Đạn tên lửa / tàu con (GEAR_FX): bậc 1 quầng sáng màu trang bị · bậc 2 + vệt sao lấp lánh · bậc 3 + viền vàng xoay quanh đầu đạn.
//   • Đạn chính chiến cơ: bậc 2 vệt sao · bậc 3 quầng vàng ở từng viên.
//   • Giáp: vòng hào quang quanh chiến cơ (bậc 1 mảnh · 2 + 3 tinh thể quay · 3 vòng đôi + 6 tinh thể vàng).
//   • Kho chiến cơ: ô trang bị có viền sáng / vệt quét / viền vàng theo bậc; lên bậc → thông báo.
//  Chất lượng NHẸ (mặc định trên điện thoại): vệt sao thưa một nửa, tối đa 40 hạt; không viền vàng xoay. Giảm chuyển động: không quay, không vệt sao.
const Rank52=(()=>{
 const TAU=Math.PI*2,GOLD='#ffe08a',NAME=['CƠ BẢN','SÁNG','LẤP LÁNH','HOÀN MỸ'],NAME_SSS=['CƠ BẢN','SÁNG','LẤP LÁNH','TỐI THƯỢNG'];
 const tierN=e=>e>=5?3:e>=3?2:e>=1?1:0,tierS=e=>e>=9?3:e>=6?2:e>=3?1:0;
 const cache=new Map();
 const light=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}},quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 function cv(n){const c=document.createElement('canvas');c.width=c.height=n;return [c,c.getContext('2d')];}
 const rgb=h=>{const n=parseInt(h.slice(1,7),16);return [n>>16&255,n>>8&255,n&255];};
 function halo(col){const k='h'+col;if(cache.has(k))return cache.get(k);const [c,g]=cv(64),[r,gg,b]=rgb(col),gr=g.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,`rgba(${r},${gg},${b},.75)`);gr.addColorStop(.35,`rgba(${r},${gg},${b},.28)`);gr.addColorStop(1,`rgba(${r},${gg},${b},0)`);g.fillStyle=gr;g.fillRect(0,0,64,64);cache.set(k,c);return c;}
 function star(col){const k='s'+col;if(cache.has(k))return cache.get(k);const [c,g]=cv(24);g.translate(12,12);g.fillStyle=col;g.beginPath();
  for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,r=i%2?2:11;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();g.fill();g.fillStyle='#fff';g.beginPath();g.arc(0,0,2.2,0,TAU);g.fill();cache.set(k,c);return c;}
 // ---------- bậc hiện tại ----------
 function itemOf(kind){try{const P=Progress.getState();return P.items.find(x=>x.id===P.equipped[kind])||null;}catch{return null;}}
 function gearTier(kind){try{const d=Gear44.activeDef(kind);if(d&&d.tier==='sss')return {t:tierS(Gear44.sssEnh(d.id)),sss:true,col:d.color||'#9fe8ff',e:Gear44.sssEnh(d.id)};
   const it=itemOf(kind);if(!it)return {t:0,sss:false,col:'#9fe8ff',e:0};const e=it.enhance||0;return {t:tierN(e),sss:false,col:(d&&d.color)||'#9fe8ff',e};}catch{return {t:0,sss:false,col:'#9fe8ff',e:0};}}
 function craftTier(){try{const g=activeRobot||Workshop.craftProgress(selected),e=g.enhance||0;return {t:tierN(e),sss:false,e};}catch{return {t:0,e:0};}}
 let T={craft:{t:0},armor:{t:0},missiles:{t:0},sidearm:{t:0}},tAt=-1;
 function refresh(){T={craft:craftTier(),armor:gearTier('armor'),missiles:gearTier('missiles'),sidearm:gearTier('sidearm')};}
 // ---------- hạt sao ----------
 const P=[];let acc=0;
 function emit(x,y,col,vx,vy){if(P.length>=(light()?40:90))P.shift();P.push({x,y,vx:vx*.08+(Math.random()-.5)*20,vy:vy*.08+(Math.random()-.5)*20,t:0,life:.38+Math.random()*.2,col,rot:Math.random()*TAU,sz:9+Math.random()*7});}
 function pools(){const out=[];try{for(const k of ['missiles','sidearm']){const st=Gear44.fxState&&Gear44.fxState(k);if(st)out.push([k,st]);}}catch{}return out;}
 function update(dt){if(time-tAt>.5||tAt<0||time<tAt){tAt=time;refresh();}
  const L=light(),Q=quiet();for(const p of P){p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;}for(let i=P.length-1;i>=0;i--)if(P[i].t>=P[i].life)P.splice(i,1);
  if(Q)return;acc+=dt;if(acc<(L?.09:.045))return;acc=0;
  for(const [k,st] of pools()){const g=T[k];if(!g||g.t<2)continue;let n=0;for(const p of st.pool){if(!p.on||p.type!=='shot')continue;if(Math.random()<.7){emit(p.x,p.y,Math.random()<.5?'#ffffff':(g.t>=3?GOLD:g.col),-p.vx,-p.vy);if(++n>=(g.t>=3?10:6))break;}}}
  if(T.craft.t>=2){let n=0;for(const s of shots){if(s.dead||Math.random()>.3)continue;emit(s.x,s.y+6,Math.random()<.4?'#ffffff':T.craft.t>=3?GOLD:'#bff6ff',-(s.vx||0),-(s.vy||-600));if(++n>=(T.craft.t>=3?7:4))break;}}}
 function draw(){const L=light(),Q=quiet();ctx.save();ctx.globalCompositeOperation='lighter';
  // đạn trang bị
  for(const [k,st] of pools()){const g=T[k];if(!g||g.t<1)continue;const h=halo(g.col),hs=g.t>=3?46:g.t>=2?38:30;
   for(const p of st.pool){if(!p.on||p.type!=='shot')continue;ctx.globalAlpha=g.t>=3?.75:g.t>=2?.62:.5;ctx.drawImage(h,p.x-hs/2,p.y-hs/2,hs,hs);
    if(g.t>=3&&!L){ctx.globalAlpha=.85;ctx.strokeStyle=GOLD;ctx.lineWidth=1.8;const a=Q?0:time*7+(p.phase||0);ctx.beginPath();ctx.ellipse(p.x,p.y,13,6,a,0,TAU*.7);ctx.stroke();}}}
  // đạn chính
  {const c=T.craft.t;if(c>=1){const col=c>=3?GOLD:'#9feeff',h=halo(col),hs=c>=3?30:c>=2?24:18;ctx.lineCap='round';
   for(const s of shots){if(s.dead)continue;ctx.globalAlpha=c>=3?.55:c>=2?.42:.3;ctx.drawImage(h,s.x-hs/2,s.y-hs/2,hs,hs);
    if(c>=2){const vx=s.vx||0,vy=s.vy||-600,v=Math.hypot(vx,vy)||1,len=c>=3?26:16;ctx.globalAlpha=c>=3?.55:.35;ctx.strokeStyle=col;ctx.lineWidth=c>=3?3:2;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-vx/v*len,s.y-vy/v*len);ctx.stroke();}}}}
  // hạt sao
  for(const p of P){const u=p.t/p.life;ctx.globalAlpha=(1-u)*.9;const sz=p.sz*(1-u*.5);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot+u*2);ctx.drawImage(star(p.col),-sz/2,-sz/2,sz,sz);ctx.restore();}
  // hào quang giáp
  const a=T.armor;if(a&&a.t>=1&&mode==='play'){const x=player.x,y=player.y,r=58,spin=Q?0:time*.9;ctx.globalAlpha=.25+.1*a.t;ctx.strokeStyle=a.col;ctx.lineWidth=1.6+.3*a.t;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.stroke();
   if(a.t>=3){ctx.globalAlpha=.3;ctx.strokeStyle=GOLD;ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,r+6,0,TAU);ctx.stroke();}
   if(a.t>=2){const n=a.t>=3?6:3,sp=star(a.t>=3?GOLD:a.col);ctx.globalAlpha=.85;for(let i=0;i<n;i++){const q=spin+i*TAU/n,sz=a.t>=3?15:12;ctx.drawImage(sp,x+Math.cos(q)*r-sz/2,y+Math.sin(q)*r-sz/2,sz,sz);}}}
  ctx.restore();}
 // ---------- kho chiến cơ: viền theo bậc + thông báo lên bậc ----------
 const KEY='saobang-rank-v52';let seen=null;try{seen=JSON.parse(localStorage.getItem(KEY)||'null');}catch{}
 function ui(){if(['play','pause'].includes(mode))return;refresh();
  const root=document.getElementById('hgr41');if(root&&!root.hidden)for(const k of ['craft','armor','missiles','sidearm']){const el=root.querySelector(`.h1-slot[data-slot="${k}"]`);if(el){const v=String(T[k].t||0);if(el.dataset.t52!==v)el.dataset.t52=v;}}
  const cur={};for(const k in T)cur[k]=(T[k].sss?'s':'n')+(T[k].t||0);
  if(seen){for(const k in cur){if(cur[k]!==seen[k]&&cur[k][0]===(seen[k]||'n0')[0]&&+cur[k].slice(1)>+(seen[k]||'n0').slice(1)){const t=+cur[k].slice(1),nm=(T[k].sss?NAME_SSS:NAME)[t],lbl={craft:'CHIẾN CƠ',armor:'GIÁP',missiles:'VŨ KHÍ',sidearm:'TÀU CON'}[k];try{toast('★ TIẾN HÓA HÌNH ẢNH · '+lbl+' · '+nm);}catch{}}}}
  seen=cur;try{localStorage.setItem(KEY,JSON.stringify(cur));}catch{}}
 setInterval(()=>{try{ui();}catch{}},700);
 // ---------- gắn vào game ----------
 const ov=VisualFX.draw;VisualFX.draw=function(){const v=ov.apply(this,arguments);try{if(mode==='play'||mode==='pause')draw();}catch(e){}return v;};
 const oup=Waves30.update;Waves30.update=function(dt){const r=oup.apply(this,arguments);try{if(mode==='play')update(dt);}catch(e){}return r;};
 return {tiers:()=>{refresh();return JSON.parse(JSON.stringify(T));},tierN,tierS,particles:()=>P.length,names:{NAME,NAME_SSS}};
})();
