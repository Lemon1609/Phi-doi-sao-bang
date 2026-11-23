'use strict';
// V309 · Trang bị đồng bộ (Gemini 20/11): 2 tấm GPT trắng–xám (src/tb309img, global TB309_IMG) nhuộm theo bậc trên canvas phụ, lưu đệm (không ctx.filter).
//  Màu (Phương án A, Gemini 20/11 22:31): 8 hệ vật liệu 60–30–10 theo độ sáng — giáp nền / viền kim loại / lõi năng lượng; bậc KHÔNG đổi màu món,
//  bậc thể hiện bằng đuôi tên lửa (5 điểm 24 px → 8 điểm 34 px → 10 điểm 40 px + hạt), lõi +15 % ở Tím+5, vòng chân tàu con α .2/.3, SS viền ánh kim #fde047.
//  SSS: thân + lõi hệ mẹ A, đuôi / vòng ngoài hệ mẹ B.
//  Tên lửa dài 46 px (siêu 54) + đuôi 34 px mờ dần · đạn phụ 30 px (siêu 36) · tàu con 32 px (siêu 40) + vòng sáng r 16 α .3 ·
//  khiên 4 kiểu vành (lục giác / gương / quỹ đạo / sóng) r 40 α .6, 4 trạng thái bật / chặn / vỡ / hồi; vòng bất tử vàng–trắng r 46.
//  Chỉ đổi HÌNH: sát thương, đường bay, hitbox giữ nguyên.
//  Tắt: window.TB309=false · từng phần TB309DAN / TB309POD / TB309SH = false
(()=>{const D=window.TB309_IMG||{},IM={};for(const k in D){const im=new Image();im.src=D[k];IM[k]=im;}
 const ok=im=>im&&im.complete&&im.naturalWidth;
 const SIG={inferno:'#f97316',nova36:'#f59e0b',cryo:'#38bdf8',thunder:'#facc15',devour10_m:'#e11d74',singularity:'#9333ea',spiral:'#34d399',swarm9:'#38bdf8',
  stellar:'#60a5fa',comet36:'#fbbf24',judgement36:'#fef08a',monarch12_m:'#c084fc',chrono11_m:'#2dd4bf',
  rail:'#22d3ee',disc:'#c084fc',solar:'#fb923c',gravity:'#7c3aed',ricochet:'#38bdf8',prism:'#67e8f9',lance36:'#fde047',orbit36:'#f59e0b',halo36:'#fef9c3',
  carrier9:'#60a5fa',devour10_s:'#e11d74',chrono11_s:'#2dd4bf',monarch12_s:'#a855f7',
  aegis:'#22d3ee',aegis9:'#60a5fa',mirror:'#a5f3fc',aurora36:'#fbbf24',seraph36:'#fef08a',orbital:'#facc15',chrono11_a:'#2dd4bf',monarch12_a:'#c084fc',
  nanite:'#34d399',phase:'#818cf8',void36:'#9333ea',devour10_a:'#e11d74',reactive:'#f97316'};
 // Theo TÊN trong game: ricochet = Pháo Lục Lăng → kim lục giác; prism = Quang Pháo Hàn Băng → mảnh băng (Gemini ghi ngược tên 2 món này)
 const SPR={inferno:'m_standard',nova36:'m_standard',cryo:'m_crystal',thunder:'m_lightning',devour10_m:'m_lightning',singularity:'m_torpedo',spiral:'m_slim',swarm9:'m_slim',
  stellar:'m_comet',comet36:'m_sword',judgement36:'m_sword',monarch12_m:'m_sword',chrono11_m:'m_chrono',
  disc:'s_crescent',gravity:'s_orb',solar:'s_orb',ricochet:'s_prism',prism:'s_shard',lance36:'s_lance',halo36:'s_halo',orbit36:'s_halo',chrono11_s:'s_halo',monarch12_s:'s_sigil',carrier9:'s_mini_drone'};
 const SPIN={s_crescent:9,s_orb:3,s_halo:6,s_sigil:2,c_s_orb_gravity:3,c_s_halo36:3};
 // V309 lượt 2: tranh ĐA SẮC vẽ thẳng, không nhuộm (Gemini 22:57). Theo tên game: prism = Hàn Băng → mảnh băng (ô s_ricochet), ricochet = Pháo Lục Lăng → kim lục giác (ô s_prism)
 const CSPR={inferno:'c_m_inferno',nova36:'c_m_inferno',cryo:'c_m_cryo',thunder:'c_m_thunder',singularity:'c_m_singularity',devour10_m:'c_m_singularity',spiral:'c_m_spiral',swarm9:'c_m_spiral',
  stellar:'c_m_stellar',comet36:'c_m_sword_gold',judgement36:'c_m_sword_gold',monarch12_m:'c_m_sword_gold',chrono11_m:'c_m_chrono',disc:'c_s_disc',gravity:'c_s_orb_gravity',prism:'c_s_ricochet',ricochet:'c_s_prism',
  lance36:'c_s_lance36',halo36:'c_s_halo36',orbit36:'c_s_halo36',chrono11_s:'c_s_halo36',monarch12_s:'c_s_sigil_monarch',carrier9:'c_s_mini_drone'};
 const CTAIL={inferno:'#f97316',nova36:'#f59e0b',cryo:'#38bdf8',thunder:'#facc15',singularity:'#a855f7',devour10_m:'#e11d74',spiral:'#10b981',swarm9:'#38bdf8',stellar:'#38bdf8',comet36:'#fde047',judgement36:'#fde047',monarch12_m:'#c084fc',chrono11_m:'#2dd4bf'};
 const POD={rail:'pod_cannon',solar:'pod_cannon',prism:'pod_cannon',ricochet:'pod_cannon',disc:'pod_disc',gravity:'pod_disc',halo36:'pod_disc',chrono11_s:'pod_disc',
  lance36:'pod_wing',orbit36:'pod_wing',monarch12_s:'pod_wing',carrier9:'pod_void',devour10_s:'pod_void'};
 const SHF={aegis:'shield_hex',aegis9:'shield_hex',mirror:'shield_mirror',aurora36:'shield_mirror',seraph36:'shield_mirror',orbital:'shield_orbital',chrono11_a:'shield_orbital',monarch12_a:'shield_orbital',
  nanite:'shield_wave',phase:'shield_wave',void36:'shield_wave',devour10_a:'shield_wave',reactive:'shield_wave'};
 const SPINSH={shield_mirror:.6,shield_orbital:1,shield_wave:1.2,shield_hex:.25};
 const TP={thuong:['#e2f4ff','#7cc4e4','#3b5674'],luc:['#bbf7d0','#10b981','#047857'],lam:['#bae6fd','#0284c7','#1e3a8a'],tim5:['#f5d0fe','#d946ef','#86198f']};
 const on=k=>window.TB309!==false&&(!k||window[k]!==false);
 const rgb=c=>{c=String(c||'#fff').replace('#','');if(c.length===3)c=c.split('').map(x=>x+x).join('');const n=parseInt(c,16)||0;return [(n>>16)&255,(n>>8)&255,n&255];};
 const hex=a=>'#'+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
 const mix=(a,b,w)=>{const A=rgb(a),B=rgb(b);return hex(A.map((v,i)=>v+(B[i]-v)*w));};
 const rgba=(c,a)=>{const A=rgb(c);return `rgba(${A[0]},${A[1]},${A[2]},${a})`;};
 // ---- món đang lắp, bậc, SSS ----
 const eq=k=>{try{return (gear.equipment||[]).find(i=>i.kind===k)||null;}catch{return null;}};
 const byVar=v=>{try{return (gear.equipment||[]).find(i=>i.variant===v)||null;}catch{return null;}};
 function tierOf(it){if(!it)return 'lam';let rk=2;try{rk=(it.spec||gearSpec(it)).rank|0;}catch{}const en=it.enhance|0;return rk<=0?'thuong':rk===1?'luc':rk===2?'lam':(rk>=4||en>=5)?'tim5':'tim';}
 function sssOf(kind){try{const sid=Gear44.activeId(kind);if(sid&&/^sss_/.test(sid)){const d=Gear44.defs().find(x=>x.id===sid);if(d&&d.parents)return d;}}catch{}return null;}
 // Phương án A (Gemini 20/11 22:31): 8 hệ vật liệu 60–30–10 [giáp nền, viền kim loại, lõi, lõi sáng, đuôi]; bậc KHÔNG đổi màu món
 const FAM={ice:['#cbd5e1','#3b82f6','#22d3ee','#e0f2fe','#22d3ee'],bio:['#e2e8f0','#475569','#10b981','#bbf7d0','#10b981'],fire:['#334155','#b45309','#f97316','#fef08a','#f97316'],
  storm:['#334155','#94a3b8','#facc15','#fef9c3','#38bdf8'],grav:['#475569','#6b21a8','#c084fc','#f5d0fe','#c084fc'],gold:['#f1f5f9','#d97706','#fde047','#fefce8','#38bdf8'],
  void:['#1e1b4b','#64748b','#d946ef','#f5d0fe','#d946ef'],devour:['#1e1b4b','#64748b','#e11d74','#fbcfe8','#e11d74'],fleet:['#1e293b','#64748b','#38bdf8','#e0f2fe','#38bdf8'],
  chrono:['#0f172a','#ca8a04','#2dd4bf','#ccfbf1','#2dd4bf'],monarch:['#0f172a','#ca8a04','#a855f7','#f3e8ff','#a855f7']};
 const FOF=v=>/^chrono11/.test(v)?'chrono':/^monarch12/.test(v)?'monarch':/^devour10/.test(v)?'devour':/^(aegis9|swarm9|carrier9)$/.test(v)?'fleet':v==='void36'?'void':/36$/.test(v)?'gold':
  /^(nanite|spiral)$/.test(v)?'bio':/^(reactive|inferno|solar)$/.test(v)?'fire':/^(thunder|stellar)$/.test(v)?'storm':/^(orbital|phase|disc|gravity|singularity)$/.test(v)?'grav':'ice';
 // pal = [lõi sáng, lõi, viền, đuôi/vòng nổ, giáp nền]
 function palOf(v,tier,sss){if(sss){const A=FAM[FOF(sss.parents[0])],B=FAM[FOF(sss.parents[1])];return ['#fef08a',A[2],A[1],B[4],A[0]];}
  const F=FAM[FOF(v)];let c1=F[3],c0=F[2];if(tier==='tim5'||tier==='ss'){c0=mix(c0,'#ffffff',.15);}return [c1,c0,F[1],F[4],F[0]];}
 const TRAIL={thuong:[5,24],luc:[5,24],lam:[5,24],tim:[8,34],tim5:[8,34],ss:[10,40],sss:[10,40]};
 // món v đang bắn: bậc + SSS (nếu SSS đang lắp chứa v hoặc chính là v)
 function info(v,kind){const it=byVar(v)||eq(kind);kind=kind||(it&&it.kind);const sss=sssOf(kind);
  if(sss&&(sss.id===v||sss.parents.includes(v)||(it&&sss.parents.includes(it.variant))))return {v:sss.parents.includes(v)?v:sss.parents[0],tier:'sss',sss,pal:palOf(v,'sss',sss)};
  const t=tierOf(it);return {v,tier:t,sss:null,pal:palOf(v,t,null)};}
 // ---- nhuộm (gradient map 3 điểm theo độ sáng) ----
 const C={};
 function tint(key,pal,pod){const ck=key+'|'+pal.join(',')+(pod?'|p':'');if(C[ck])return C[ck];const im=IM[key];if(!ok(im))return null;
  const w=im.naturalWidth,h=im.naturalHeight,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(im,0,0);
  const d=g.getImageData(0,0,w,h),a=d.data,P=[rgb(pal[0]),rgb(pal[1]),rgb(pal[2])],A=rgb(pal[4]||pal[2]);
  for(let i=0;i<a.length;i+=4){if(!a[i+3])continue;const L=Math.max(a[i],a[i+1],a[i+2])/255;let o;
   const l=L*255;/* giáp nền 0–130 (đổ bóng theo độ sáng) · viền 130–165 · lõi 165–210 · lõi sáng 210–255 */
   if(l<130){const f=.18+.82*l/130;o=A.map(x=>x*f);}else if(l<165){const q=(l-130)/35;o=A.map((x,j)=>x+(P[2][j]-x)*q);}else if(l<210){const q=(l-165)/45;o=P[2].map((x,j)=>x+(P[1][j]-x)*q);}else{const q=(l-210)/45;o=P[1].map((x,j)=>x+(P[0][j]-x)*q);}
   a[i]=o[0];a[i+1]=o[1];a[i+2]=o[2];}
  g.putImageData(d,0,0);const keys=Object.keys(C);if(keys.length>160)delete C[keys[0]];return C[ck]=c;}
 // ---- đạn / tên lửa ----
 const SZ={mis:[46,54],side:[30,36],trail:34};
 function put(c,o,I,mis,sup,age,ref){const key0=SPR[I.v];if(!key0)return false;const ck=window.TB309MAU!==false&&CSPR[I.v],own=ck&&ok(IM[ck])?IM[ck]:null,key=own?ck:key0;const e21=(()=>{try{return window.Evo21?Evo21.gearImg(mis,I):null;}catch{return null;}})();/* V2.1 Đợt 2: tên lửa / đạn tàu con 4 bậc tranh GPT */let im=e21||own||tint(key0,I.pal);if(!im)return false;if(window.SK8B){const b8=window.SK8B(im,mis?'mis':'pod');if(b8)im=b8;}/* V309 Lượt 8: trang phục Tàu con / Tên lửa */
  if(own){const tc=I.sss?(CTAIL[I.sss.parents[1]]||I.pal[3]):(CTAIL[I.v]||I.pal[3]);if(tc!==I.pal[3])I={...I,pal:[I.pal[0],I.pal[1],I.pal[2],tc,I.pal[4]]};}{const p8=window.SK8P&&window.SK8P(mis?'mis':'pod');if(p8)I={...I,pal:[I.pal[0],p8[0],I.pal[2],p8[1],I.pal[4]]};}
  const iw=im.naturalWidth||im.width,ih=im.naturalHeight||im.height,ar=iw/ih,sq=ar>.8;let L=(mis?SZ.mis:SZ.side)[sup?1:0];if(L4())L*=mis?1.38*(TK4[I.tier]||1):(TS4[I.tier]||1);/* V309 Lượt 4: tên lửa to +38 %, cỡ theo bậc (tên lửa 1→1,18 · đạn tàu con 1→1,15) */if(!mis&&sq)L*=.85;if(I.v==='swarm9')L*=.72;const BIG=I.v==='devour10_m'||I.v==='chrono11_m'||I.v==='monarch12_m';if(BIG)L*=1.15;if(I.sss)L*=1.15;
  if(e21){L=(mis?SZ.mis[sup?1:0]*1.55:SZ.side[sup?1:0]*1.15)*(sup?1.08:1)*((e21.__h0||e21.naturalHeight||192)/192);}/* bản 4 bậc đã lớn dần trong ảnh → không nhân cỡ bậc lần nữa */
  const W=L*ar,ang=Math.atan2(o.vy||-1,o.vx||0)+Math.PI/2,spin=SPIN[key]||0;
  c.save();try{c.translate(o.x,o.y);c.rotate(ang);
   const h=ref&&mis?(ref.__h9||(ref.__h9=[])):null;let TR=TRAIL[I.tier]||TRAIL.lam;if(sup&&L3())TR=[Math.max(TR[0],10),44];/* V309 Lượt 3: Bạo Tẩu đuôi dài hơn */if(h){const n=h.length;if(!n||Math.hypot(h[n-2]-o.x,h[n-1]-o.y)>2){h.push(o.x,o.y);if(h.length>TR[0]*2)h.splice(0,2);}}
   if(h&&h.length>=6){c.restore();c.save();c.globalCompositeOperation='lighter';c.lineCap='round';const n=h.length/2;/* đuôi cong 8 điểm: rộng 5→0, α .65→0 (Gemini) */
    const ss=!!I.sss||(I.v==='devour10_m'||I.v==='chrono11_m'||I.v==='monarch12_m'),W0=5*(sup?1.25:1)*(ss?1.5:1);for(let k=1;k<n;k++){const q=k/(n-1),x1=k===n-1?o.x:h[k*2],y1=k===n-1?o.y:h[k*2+1];c.strokeStyle=rgba(I.pal[3],(ss?.85:.65)*q);c.lineWidth=Math.max(.5,W0*q);c.beginPath();c.moveTo(h[k*2-2],h[k*2-1]);c.lineTo(x1,y1);c.stroke();
     if(ss){c.strokeStyle=rgba(I.pal[1],.9*q);c.lineWidth=Math.max(.4,W0*.38*q);c.stroke();}}/* SSS: đuôi song sắc — viền mẹ B, lõi mẹ A */
    if((I.tier==='ss'||I.tier==='sss')&&Math.random()<.35){c.fillStyle=rgba('#fde047',.8);c.beginPath();c.arc(h[0]+(Math.random()-.5)*6,h[1]+(Math.random()-.5)*6,1.4,0,6.283);c.fill();}
    c.restore();c.save();c.translate(o.x,o.y);c.rotate(ang);}
   const f18=mis&&window.FX18!==false&&window.FX18API;
   if(mis&&!f18&&!(h&&h.length>=6)){const tl=TR[1]*(sup?1.2:1),y0=L*.32,gr=c.createLinearGradient(0,y0,0,y0+tl);gr.addColorStop(0,rgba(I.pal[3],.55));gr.addColorStop(1,rgba(I.pal[3],0));
    c.globalCompositeOperation='lighter';c.fillStyle=gr;c.beginPath();c.moveTo(-W*.22,y0);c.lineTo(W*.22,y0);c.lineTo(0,y0+tl);c.closePath();c.fill();}
   if(e21&&mis&&(()=>{try{return Evo21.gearTrail(c,I,sup,L,W);}catch{return false;}})()){}/* V2.1: vệt lửa đẩy GPT theo bậc */
   else if(f18){/* V309 L17 mục 4: luồng đẩy thuôn nhọn 3 nấc ở miệng ống thay quầng tròn bệt */FX18API.flame(c,0,L*.4,0,L*(sup?1.15:.9),Math.max(7,W*.5),I.pal[3],performance.now()/1000,o.x*.013,true);}
   else{c.globalCompositeOperation='lighter';const r=Math.max(W,L)*.62,q=c.createRadialGradient(0,0,0,0,0,r);const hc=own?I.pal[3]:I.pal[1];q.addColorStop(0,rgba(hc,own?.22:.30));q.addColorStop(1,rgba(hc,0));c.fillStyle=q;c.fillRect(-r,-r,r*2,r*2);}
   c.globalCompositeOperation=e21&&!mis?'lighter':'source-over';c.globalAlpha=e21?1:(mis?1:(own?.85:.9));if(spin||(e21&&!mis&&(I.v==='gravity'||(I.sss&&I.sss.id==='sss_solar_gravity'))))c.rotate((age||0)*(spin||3));c.drawImage(im,-W/2,-L/2,W,L);if(e21&&ref)try{Evo21.gearTrack(ref,o,I,mis,sup);}catch{}if(mis&&window.EvoLED)try{c.globalCompositeOperation='source-over';c.globalAlpha=1;EvoLED.mis(c,W,L,I,sup);}catch{}/* V2.1 EVO21_LED: đèn đầu đạn + mạch sống tên lửa */
   if(L4()&&mis){/* đầu đạn sáng gắt (Bạo Tẩu gắt hơn) */const hr=W*(sup?.42:.32),hy=-L*.36,hg=c.createRadialGradient(0,hy,0,0,hy,hr);hg.addColorStop(0,'rgba(255,255,255,'+(sup?.95:.75)+')');hg.addColorStop(.5,rgba(I.pal[0],.45));hg.addColorStop(1,rgba(I.pal[0],0));c.globalCompositeOperation='lighter';c.fillStyle=hg;c.fillRect(-hr,hy-hr,hr*2,hr*2);if(ref){const q=TRK.get(ref)||{};q.x=o.x;q.y=o.y;q.t=performance.now()/1000;q.ti=I.tier;q.c=I.pal[3];q.c0=I.pal[0];q.sp=sup;TRK.set(ref,q);}}}finally{c.restore();}return true;}
 const supNow=()=>{try{return superTime>0;}catch{return false;}};
 const VKIND=v=>/_m$|^(inferno|cryo|thunder|singularity|spiral|stellar|comet36|nova36|judgement36|swarm9)$/.test(v)?'missiles':'sidearm';
 // GEAR_FX (12 món gốc + SSS): vẽ cả hồ đạn của 1 st
 function has(id){if(SPR[id])return true;try{const d=Gear44.defs().find(x=>x.id===id);return !!(d&&d.parents&&SPR[d.parents[0]]);}catch{return false;}}
 function pool(c,st){const kind=VKIND(SPR[st.id]?st.id:((Gear44.defs().find(x=>x.id===st.id)||{}).parents||['x'])[0]);let n=0;
  for(const b of st.pool){if(!b.on||(b.type!=='shot'&&b.type!=='return'))continue;const I=info(SPR[b.id]?b.id:st.id,kind);if(put(c,b,I,kind==='missiles',b.variant==='super',b.age,b))n++;}if(kind==='missiles')fxDraw(c);return n;}
 // đạn thường bộ 9–12 / bộ 36 (shots có gearItem)
 function shot(c,s){if(!on('TB309DAN')||!s||!s.gearItem)return false;const v=s.gearItem.variant;if(!SPR[v])return false;try{weave(s);}catch{}const I=info(v,s.gearItem.kind);
  return put(c,{x:s.x,y:s.y,vx:s.vx,vy:s.vy},I,s.gearItem.kind==='missiles',s.superShot||supNow(),s.age||0,s);}
 // hiệu ứng skill81: dive (Diệt Tinh / Quá Khứ), cleave (Trảm Không), halo (Thiên Hoàn)
 function fx81(g,v,a){if(!on('TB309DAN'))return false;
  if(v.k==='dive'&&v.tx!=null){const id=v.v||'chrono11_m';const L0=v.L0??(v.L0=v.life),q=1-v.life/L0,mx=v.x+(v.sd||1)*46,my=v.y-70;let x,y,vx,vy;
   if(q<.3){const u=q/.3;x=v.x+(mx-v.x)*u;y=v.y+(my-v.y)*u;vx=mx-v.x;vy=my-v.y;}else{const u=(q-.3)/.7;x=mx+(v.tx-mx)*u;y=my+(v.ty-my)*u;vx=v.tx-mx;vy=v.ty-my;}
   v.__ref=v.__ref||{};g.save();const r=put(g,{x,y,vx,vy},info(id,'missiles'),true,supNow(),0,v.__ref);g.restore();if(q>=.3&&!v.__b){v.__b=1;BEND.push({x:mx,y:my,t:performance.now()/1000,id});}fxDraw(g);return r;}   // V309: bẻ góc 90° rồi lao vào mục tiêu
  if(v.k==='dive'){const id=v.v||'nova36';if(!SPR[id])return false;const y=v.y-(.3-v.life)*500;g.save();g.globalAlpha=Math.min(1,v.life*4);const r=put(g,{x:v.x,y,vx:0,vy:-1},info(id,'missiles'),true,supNow(),0);g.restore();return r;}
  if(v.k==='beam'&&v.v==='devour10_s'&&window.FX309){/* V309: tia Thôn Phệ đỏ tía #e11d74, lõi #fce7f3 (khớp tàu con) */try{FX309.beam(g,v.a.x,v.a.y,v.b.x,v.b.y,'e3',14+((()=>{try{return L3()&&superTime>0;}catch{return false;}})()?2:0),Math.min(1,v.life*5)*.9,{fs:16,rs:18});}catch{}return true;}
  if(v.k==='cleave'){fxDraw(g);const prog=1-v.life/.55,y=v.y0-(v.y0+20)*prog,I=info('monarch12_m','missiles');put(g,{x:v.x,y,vx:0,vy:-1},I,true,supNow(),0);
   g.save();g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,v.life*3);g.strokeStyle=rgba(I.pal[1],.85);g.lineWidth=3;g.beginPath();g.ellipse(v.x,y,v.w/2,10,0,Math.PI,2*Math.PI);g.stroke();g.strokeStyle=rgba(I.pal[3],.6);g.lineWidth=1.2;g.stroke();g.restore();return true;}
  if(v.k==='halo'){const p=1-v.life/.9,out=p<.5,q=out?p*2:(p-.5)*2;const px=out?v.sx+(v.tx-v.sx)*q:v.tx+(player.x+v.side*20-v.tx)*q,py=out?v.sy+(v.ty-v.sy)*q:v.ty+(player.y-60-v.ty)*q;
   const I=info('halo36','sidearm'),im=(window.TB309MAU!==false&&ok(IM.c_s_halo36))?IM.c_s_halo36:tint('s_halo',I.pal);if(!im)return false;const R=Math.max(16,v.r*1.1);g.save();g.translate(px,py);g.rotate(p*18);g.drawImage(im,-R,-R,R*2,R*2);g.restore();return true;}
  return false;}
 // dải 4 khung cho bộ 36 bắn qua skill81 (GEAR44_ASSETS[id_projectile_*])
 let stripKey='';function strip(){if(!on('TB309DAN')||typeof GEAR44_ASSETS==='undefined')return;const ids=['comet36','nova36','judgement36'],k=ids.map(i=>info(i,'missiles').pal.join()).join('|');if(k===stripKey)return;
  for(const id of ids){const I=info(id,'missiles'),im=tint(SPR[id],I.pal);if(!im)return;const fh=96,fw=Math.round(fh*im.width/im.height),c=document.createElement('canvas');c.width=fw*4;c.height=fh;const g=c.getContext('2d');
   for(let i=0;i<4;i++){g.globalAlpha=.85+.15*(i%2);g.drawImage(im,i*fw,0,fw,fh);}const u=c.toDataURL('image/png');GEAR44_ASSETS[id+'_projectile_normal']=u;GEAR44_ASSETS[id+'_projectile_super']=u;}stripKey=k;}
 // ---- đường bay tên lửa 4 nhóm (Gemini + phụ lục video). Tắt: window.TB309QD=false ----
 const QG={inferno:'fan',cryo:'fan',swarm9:'fan',thunder:'bend',chrono11_m:'bend',spiral:'spiral',devour10_m:'spiral',singularity:'straight',stellar:'straight',comet36:'straight',nova36:'straight',judgement36:'straight',monarch12_m:'straight'};
 function qd(p,q,dt,speed,a){if(window.TB309QD===false||!on())return;const g=QG[p.id];if(!g)return;if(!p.__sd)p.__sd=((p.phase||Math.random())*1e3|0)%2?1:-1;const sd=p.__sd;
  if(g==='fan'){if(!p.__qd){p.__qd=1;const sp=Math.hypot(p.vx,p.vy)||speed,an=Math.atan2(p.vy||-1,p.vx||0)+sd*.95;p.vx=Math.cos(an)*sp;p.vy=Math.sin(an)*sp;}}   // tỏa vòng cung rồi bám lại
  else if(g==='bend'){if(p.age<.18){p.vx=sd*speed*.72;p.vy=-speed*.72;}else if(!p.__qd){p.__qd=1;p.vx=Math.cos(a)*speed*1.15;p.vy=Math.sin(a)*speed*1.15;BEND.push({x:p.x,y:p.y,t:performance.now()/1000,id:p.id});}}   // chéo 0,18 s rồi gập góc lao thẳng
  else if(g==='straight'){if(p.age<.22){p.vx*=.6;p.vy=-speed;}if(!p.__qd){p.__qd=1;LIVE.set(p,{x:p.x,y:p.y,id:p.id});}}}
 const BEND=[],LIVE=new Map(),RINGS=[];
 function ring(x,y,id,r){let _b=1;try{if(L3()&&superTime>0)_b=L4()?1.35:1.3;}catch{}RINGS.push({x,y,r:(r||60)*_b,t:performance.now()/1000,I:info(id,VKIND(id))});if(RINGS.length>12)RINGS.shift();}
 const TRK=new Map(),BOOM=[],TIM4={tim:1,tim5:1,ss:1,sss:1};
 function fxDraw(c){const t=performance.now()/1000;
  if(L4()){for(const [r,q] of TRK){if(t-q.t<.09)continue;TRK.delete(r);if(TIM4[q.ti]&&q.y>-20&&q.y<900)BOOM.push({x:q.x,y:q.y,t0:t,c:q.c,c0:q.c0,k:q.sp?1.35:1});}if(BOOM.length>14)BOOM.splice(0,BOOM.length-14);
   c.save();c.globalCompositeOperation='lighter';for(let k=BOOM.length-1;k>=0;k--){const B=BOOM[k],q=(t-B.t0)/.28;if(q>1){BOOM.splice(k,1);continue;}if(q<.35){const fr=16*B.k*(1-q/.35)+4,fg=c.createRadialGradient(B.x,B.y,0,B.x,B.y,fr);fg.addColorStop(0,'rgba(255,255,255,.9)');fg.addColorStop(1,'rgba(255,255,255,0)');c.globalAlpha=1;c.fillStyle=fg;c.fillRect(B.x-fr,B.y-fr,fr*2,fr*2);}c.globalAlpha=.8*(1-q);c.strokeStyle=B.c;c.lineWidth=2*(1-q)+.8;c.beginPath();c.arc(B.x,B.y,(10+46*q)*B.k,0,6.283);c.stroke();}c.restore();}
  for(const [p,v] of LIVE){if(p.on&&p.id===v.id){v.x=p.x;v.y=p.y;continue;}LIVE.delete(p);if(v.y>-20&&v.y<900)ring(v.x,v.y,v.id,60);}   // phóng thẳng → vòng xung kích nổ rộng
  c.save();c.globalCompositeOperation='lighter';
  for(let k=RINGS.length-1;k>=0;k--){const R=RINGS[k],q=(t-R.t)/.3;if(q>1){RINGS.splice(k,1);continue;}c.globalAlpha=.85*(1-q);c.strokeStyle=R.I.pal[3];c.lineWidth=4*(1-q)+1;c.beginPath();c.arc(R.x,R.y,R.r*(.3+.7*q),0,6.283);c.stroke();c.strokeStyle=R.I.pal[0];c.lineWidth=1.2;c.beginPath();c.arc(R.x,R.y,R.r*(.22+.6*q),0,6.283);c.stroke();}
  for(let k=BEND.length-1;k>=0;k--){const B=BEND[k],q=(t-B.t)/.18;if(q>1){BEND.splice(k,1);continue;}const I=info(B.id,'missiles');c.globalAlpha=.9*(1-q);c.fillStyle=I.pal[0];c.beginPath();c.arc(B.x,B.y,5*(1-q)+2,0,6.283);c.fill();}   // chớp điểm gập góc
  c.restore();}
 // đạn thường xoắn ốc (Huyết Tinh): lệch ngang hình sin quanh đường bay, trung bình 0 → vẫn bám mục tiêu
 function weave(s){if(window.TB309QD===false||!s||!s.gearItem||QG[s.gearItem.variant]!=='spiral')return;const t=s.age||0;if(t>1.2)return;const v=Math.hypot(s.vx||0,s.vy||0)||1,px=-(s.vy||-1)/v,py=(s.vx||0)/v,ph=(s.phase||0)+(s.__ph9??(s.__ph9=Math.random()*6.283)),
   d=22*(Math.sin(t*9+ph)-Math.sin((s.__t9??t)*9+ph));s.__t9=t;s.x+=px*d;s.y+=py*d;}
 // ---- tàu con ----
 const SPR9={};
 function pod(c,i,p,sp,demo){if(!on('TB309POD')||!i)return false;const sss=sssOf('sidearm');const v=sss?sss.parents[0]:i.variant,own=ok(IM['pod_'+v])?IM['pod_'+v]:null,key=POD[v];if(!key&&!own)return false;
  if(window.SPRING309!==false&&!demo){/* V309 Lượt 2: bám trễ lò xo lerp .2 + nhấp nhô ±3 px + giật lùi 2,5 px mỗi nhịp bắn (chỉ hình). Tắt: window.SPRING309=false */const sdk=p.x<(typeof player!=='undefined'?player.x:240)?'L':'R',S=SPR9[sdk]||(SPR9[sdk]={x:p.x,y:p.y}),tn=performance.now()/1000,dt=Math.min(.05,Math.max(0,tn-(S.t||tn)));S.t=tn;
   const k=1-Math.pow(.8,dt*60);S.x+=(p.x-S.x)*k;S.y+=(p.y-S.y)*k;if(Math.abs(p.x-S.x)>90||Math.abs(p.y-S.y)>90){S.x=p.x;S.y=p.y;}
   let n=0;try{for(const q of shots)if(q.gearKind==='sidearm'&&(q.age||0)<.03)n++;}catch{}if(n>(S.n||0)){S.kick=2.5;S.f=tn;if(window.EvoSFX&&sdk==='L')try{EvoSFX.pod(sss?sss.id:v,!!sss,!!sp);}catch{}}/* EVO21_LED: mốc chớp nòng */S.n=n;S.kick=(S.kick||0)*Math.pow(.02,dt);
   p={x:S.x,y:S.y+Math.sin(tn*2.4+(sdk==='L'?0:1.6))*3+S.kick};}
  if(sp&&L3()&&!demo){/* V309 Lượt 3: Bạo Tẩu tách tàu con ra hai bên +9 px (chỉ hình) */const pxx=typeof player!=='undefined'?player.x:240;p={x:p.x+(p.x<pxx?-9:9),y:p.y};}
  const sssOwn=sss&&ok(IM['pod_'+sss.id])?IM['pod_'+sss.id]:null;/* V309 Lượt 4: tàu con SSS có tranh riêng */let I=info(v,'sidearm'),im=sssOwn||own||tint(key,I.pal,true);if(!im)return false;if(window.SK8B){const b8=window.SK8B(im,'pod');if(b8)im=b8;const p8=window.SK8P&&window.SK8P('pod');if(p8)I={...I,pal:[I.pal[0],p8[0],I.pal[2],p8[1],I.pal[4]]};}/* V309 Lượt 8 */const e21p=(()=>{try{return window.Evo21?Evo21.podImg(v,I):null;}catch{return null;}})();if(e21p)im=e21p;/* V2.1 Đợt 2: thân tàu con 4 bậc */let w=(own||sssOwn)?(sp?46:40):(sp?40:32);const t=performance.now()/1000;if(L4()&&!e21p)w*=(TP4[sss?'sss':I.tier]||1);if(e21p)w=52*(sp?1.1:1);
  if(own||sssOwn){/* lửa động cơ nhỏ sau đuôi (tranh riêng đã đa sắc, không nhuộm) */c.save();c.globalCompositeOperation='lighter';for(const dx of [-w*.16,w*.16]){const fl=7*(1.05+.2*Math.sin(t*Math.PI*2*22+dx))*(L4()?(TP4[I.tier]||1)*(sp?1.5:1):1),/* lửa co giãn .85→1.25 ở 22 Hz */y0=p.y+w*.36,gr=c.createLinearGradient(0,y0,0,y0+fl*1.6);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(.35,rgba(I.pal[3],.65));gr.addColorStop(1,rgba(I.pal[3],0));c.fillStyle=gr;c.beginPath();c.moveTo(p.x+dx-3,y0);c.lineTo(p.x+dx+3,y0);c.lineTo(p.x+dx,y0+fl*1.6);c.closePath();c.fill();}c.restore();}
  c.save();try{c.globalCompositeOperation='lighter';c.lineWidth=1.6;const lo=/^(thuong|luc|lam)$/.test(I.tier);if(L4()){/* V309 Lượt 4: vòng năng lượng xoay dưới chân từ bậc Tím (α .25 · SS/SSS .35) */if(!lo||sss){const hi=sss||I.tier==='ss';c.strokeStyle=rgba(I.pal[3],(hi?.35:.25)+(sp?.15:0));c.setLineDash([7,5]);c.lineDashOffset=-t*14;c.beginPath();c.arc(p.x,p.y+3,16*(w/40),0,6.283);c.stroke();c.setLineDash([]);}}else{c.strokeStyle=rgba(I.pal[3],(lo?.20:.30)+(sp?.15:0));c.beginPath();c.arc(p.x,p.y+3,16,0,6.283);c.stroke();}if(I.tier==='ss'){c.strokeStyle=rgba('#fde047',.35);c.beginPath();c.arc(p.x,p.y+3,19,0,6.283);c.stroke();}
   if(sss){for(const [r,d,col] of [[18,1,I.pal[1]],[21,-1,I.pal[3]]]){c.strokeStyle=rgba(col,.45);c.setLineDash([6,5]);c.lineDashOffset=d*t*20;c.beginPath();c.arc(p.x,p.y+3,r,0,6.283);c.stroke();}c.setLineDash([]);}
   const w21=e21p&&sp&&(()=>{try{return Evo21.podWings(c,v,p.x,p.y,w,t,I);}catch{return false;}})();/* V2.1: cánh mini Bạo Tẩu GPT */const pw10=!w21&&window.WING10&&window.ANIM10!==false&&window.PODW10!==false;if(pw10){try{let pc=null;const p8=window.SK8P&&window.SK8P('pod');if(p8)pc=[p8[0],p8[1]];c.restore();c.save();WING10.podWing(c,p.x,p.y,w,!!sp,pc);c.globalCompositeOperation='lighter';c.lineWidth=1.6;}catch{}}/* L10B: cánh năng lượng lông vũ thay cánh viền rỗng (tắt window.PODW10=false) */
   if(sss&&!pw10){const bob=Math.sin(t*3+p.x*.05)*2;c.lineWidth=2;for(const sd of [-1,1]){c.strokeStyle=rgba(sd<0?I.pal[1]:I.pal[3],.40);c.beginPath();c.arc(p.x+sd*(w*.38),p.y+bob,w*.55,sd<0?Math.PI*.6:-Math.PI*.4,sd<0?Math.PI*1.4:Math.PI*.4);c.stroke();}}/* 2 cánh năng lượng bán nguyệt cho tàu con SSS */
   if(sp&&L4()){/* Bạo Tẩu: viền hào quang màu hệ + chớp sóng xung kích nhỏ cùng pha tụ–bung tàu chính */if(!pw10){c.strokeStyle=rgba(I.pal[1],.55+.15*Math.sin(t*9));c.lineWidth=2.2;c.beginPath();c.arc(p.x,p.y,w*.58,0,6.283);c.stroke();}let ta=9;try{ta=(typeof time==='number'?time:t)-L3309S.st.tOn;}catch{}if(ta>=0&&ta<.45){const u=ta/.45;c.globalAlpha=.8*(1-u);c.strokeStyle='#ffffff';c.lineWidth=3*(1-u)+.6;c.beginPath();c.arc(p.x,p.y,8+40*u,0,6.283);c.stroke();c.globalAlpha=1;}}
   const q=c.createRadialGradient(p.x,p.y,0,p.x,p.y,w*.7);q.addColorStop(0,rgba(I.pal[1],sp?.35:.18));q.addColorStop(1,rgba(I.pal[1],0));c.fillStyle=q;c.fillRect(p.x-w,p.y-w,w*2,w*2);
   c.globalCompositeOperation='source-over';c.globalAlpha=1;{const iw=im.naturalWidth||im.width,ih=im.naturalHeight||im.height,k=w/Math.max(iw,ih);c.drawImage(im,p.x-iw*k/2,p.y-ih*k/2,iw*k,ih*k);}
   if(window.EvoLED){/* V2.1 EVO21_LED: lõi tàu con + chớp nòng 0,12 s */let fa=null;try{const s9=SPR9[p.x<(typeof player!=='undefined'?player.x:240)?'L':'R'];if(s9&&s9.f)fa=performance.now()/1000-s9.f;}catch{}EvoLED.pod(c,p.x,p.y,w,sss?{...I,sss}:I,!!sp,fa);}}finally{c.restore();}return true;}
 // ---- khiên ----
 let wasOn=false,regenT=-9,brk=null,hitArc=null,shards=[];
 function nearDir(){let best=null,bd=1e9;try{for(const b of bullets){const d=Math.hypot(b.x-player.x,b.y-player.y);if(d<bd){bd=d;best=b;}}}catch{}return best?Math.atan2(best.y-player.y,best.x-player.x):-Math.PI/2;}
 function armor(t,dt,isOn,mayBreak){if(!on('TB309SH'))return false;const a=eq('armor');const sss=sssOf('armor');const v=sss?sss.parents[0]:(a&&a.variant),key=SHF[v]||'shield_hex',I=info(v||'aegis','armor'),x=player.x,y=player.y,R=40;
  if(isOn&&!wasOn)regenT=t;
  if(!isOn&&wasOn&&mayBreak){const ang=nearDir();brk={t0:t,x,y,I};hitArc={t0:t,ang,I};shards=Array.from({length:7},(_,k)=>({a:k/7*6.283+Math.random()*.5,v:120+Math.random()*90,r:Math.random()*6.283,s:3+Math.random()*3}));}
  wasOn=isOn;
  if(isOn){const im=tint(key,I.pal),spin=SPINSH[key]||0;ctx.save();ctx.translate(x,y);
   const rg=ctx.createRadialGradient(0,0,R*.7,0,0,R);rg.addColorStop(0,rgba(I.pal[1],0));rg.addColorStop(1,rgba(I.pal[1],L3()?.06:.10));ctx.fillStyle=rg;ctx.beginPath();ctx.arc(0,0,R,0,6.283);ctx.fill();
   const _sp=L3(),_tf=_sp&&(()=>{try{return superTime>0;}catch{return false;}})();/* V309 Lượt 3: vành khiên trong suốt hơn (α .35), Bạo Tẩu xoay ×1,8 α .55 */if(im){ctx.save();ctx.rotate(t*spin*(_tf?1.8:1));if(_sp){/* lòng trong α .22, vành ngoài α .5 (Bạo Tẩu .62) */ctx.globalAlpha=.22;ctx.save();ctx.beginPath();ctx.arc(0,0,R*.74,0,6.283);ctx.clip();ctx.drawImage(im,-R-2,-R-2,R*2+4,R*2+4);ctx.restore();ctx.globalAlpha=(_tf?.62:.5)+(L4()&&/^(tim|tim5|ss|sss)$/.test(sss?'sss':I.tier)?.08:0);ctx.beginPath();ctx.arc(0,0,R+8,0,6.283);ctx.arc(0,0,R*.74,0,6.283,true);ctx.clip();}else ctx.globalAlpha=.6;ctx.drawImage(im,-R-2,-R-2,R*2+4,R*2+4);ctx.restore();
    if(sss){const im2=tint(SHF[sss.parents[1]]||key,palOf(sss.parents[1],'sss',{parents:[sss.parents[1],sss.parents[0]]}));if(im2){ctx.globalAlpha=.45;ctx.rotate(-t*spin*1.3);ctx.drawImage(im2,-R-9,-R-9,R*2+18,R*2+18);}}}
   if(I.tier==='ss'){ctx.globalAlpha=1;ctx.strokeStyle=rgba('#fde047',.35);ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,R+5,0,6.283);ctx.stroke();}
   if(v==='seraph36'){ctx.globalAlpha=.55;ctx.globalCompositeOperation='lighter';ctx.fillStyle=rgba(I.pal[0],.6);for(const s of [-1,1]){ctx.beginPath();ctx.ellipse(s*(R+6),2,5,14,s*.5,0,6.283);ctx.fill();}}
   if(v==='nanite'&&Math.random()<.3&&shards.length<24)shards.push({life:.6,nano:1,a:Math.random()*6.283,r0:R});
   ctx.restore();
   const p=(t-regenT)/.35;if(p>=0&&p<1.3){ctx.save();ctx.globalCompositeOperation='lighter';const r=70-30*Math.min(1,p);ctx.globalAlpha=p<1?.7*(1-p*.3):.9*(1.3-p)/.3;ctx.strokeStyle=I.pal[0];ctx.lineWidth=p<1?2:4;ctx.beginPath();ctx.arc(x,y,r,0,6.283);ctx.stroke();ctx.restore();}}
  if(hitArc){const p=(t-hitArc.t0)/.14;if(p>1)hitArc=null;else{ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.9*(1-p);ctx.strokeStyle=hitArc.I.pal[0];ctx.lineWidth=5;ctx.beginPath();ctx.arc(x,y,R,hitArc.ang-.52,hitArc.ang+.52);ctx.stroke();ctx.restore();}}
  if(brk){const p=(t-brk.t0)/.28;if(p>1.6)brk=null;else{const q=Math.min(1,p);ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.8*(1-q);ctx.strokeStyle=brk.I.pal[1];ctx.lineWidth=5*(1-q)+1.5;ctx.beginPath();ctx.arc(brk.x,brk.y,40+55*q,0,6.283);ctx.stroke();
   ctx.globalAlpha=Math.max(0,1-p/1.6);ctx.fillStyle=brk.I.pal[0];for(const s of shards){if(s.nano)continue;const d=s.v*(t-brk.t0);ctx.save();ctx.translate(brk.x+Math.cos(s.a)*(R+d),brk.y+Math.sin(s.a)*(R+d));ctx.rotate(s.r+p*6);ctx.beginPath();ctx.moveTo(0,-s.s);ctx.lineTo(s.s*.9,s.s*.6);ctx.lineTo(-s.s*.9,s.s*.6);ctx.closePath();ctx.fill();ctx.restore();}ctx.restore();}}
  if(shards.length){ctx.save();ctx.globalCompositeOperation='lighter';for(const s of shards){if(!s.nano)continue;s.life-=dt;const q=1-s.life/.6;ctx.globalAlpha=Math.max(0,s.life/.6);ctx.fillStyle='#86efac';ctx.beginPath();ctx.arc(x+Math.cos(s.a)*s.r0*(1-q),y+Math.sin(s.a)*s.r0*(1-q),1.8,0,6.283);ctx.fill();}ctx.restore();shards=shards.filter(s=>!s.nano||s.life>0);if(!brk)shards=shards.filter(s=>s.nano);}
  // vòng bất tử / biến hình: vàng–trắng r 46, dày 6, nhấp nháy 10 Hz
  let iv=0;try{iv=invuln;}catch{}if(iv>.25){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.65*(.55+.45*Math.sign(Math.sin(t*62.8)));ctx.strokeStyle='#fef08a';ctx.lineWidth=6;ctx.beginPath();ctx.arc(x,y,46,0,6.283);ctx.stroke();ctx.strokeStyle='#ffffff';ctx.lineWidth=2;ctx.stroke();ctx.restore();}
  return true;}
 function L3(){return !!window.SHIP309V4&&window.L3309!==false;}
 function L4(){return window.TB4309!==false;}/* V309 Lượt 4 · tên lửa / tàu con / khiên theo bậc + Bạo Tẩu. Tắt: window.TB4309=false */
 const TK4={thuong:1,luc:1,lam:1.06,tim:1.12,tim5:1.12,ss:1.18,sss:1.18},TP4={thuong:1,luc:1,lam:1.05,tim:1.1,tim5:1.1,ss:1.14,sss:1.14},TS4={thuong:1,luc:1,lam:1.05,tim:1.1,tim5:1.1,ss:1.15,sss:1.15};
 function railKey(){const it=eq('sidearm');const I=info((it&&it.variant)||'rail','sidearm');const k='tb_'+I.pal.join('_').replace(/#/g,'');try{if(window.FX309&&!FX309.PAL[k])FX309.PAL[k]=I.pal.slice(0,3);}catch{}return k;}
 function sig(kind){const it=eq(kind);if(!it)return null;const I=info(it.variant,kind);return [I.pal[3],I.pal[0]];}
 // quả cầu khiên cũ (FX40.shieldBubble, r 56 xanh lam chung mọi giáp) → nhường vành khiên theo dòng giáp
 function hookBubble(){try{if(typeof FX40==='undefined'||!FX40.shieldBubble||FX40.shieldBubble.__tb309)return;const o=FX40.shieldBubble;const f=function(){if(on('TB309SH'))return true;return o.apply(this,arguments);};f.__tb309=1;FX40.shieldBubble=f;}catch{}}
 setInterval(()=>{hookBubble();try{if(typeof mode!=='undefined'&&mode==='play')strip();}catch{}},1000);setTimeout(strip,600);
 window.TB309={on:()=>on(),img:k=>ok(IM[k])?IM[k]:null,qd,ring,QG,palOf,FAM,SPR,POD,SHF,SIG,info,tint,put,pool,has,shot,fx81,pod,armor,railKey,sig,strip,tierOf};
})();
