'use strict';
// V309 · Trang bị đồng bộ (Gemini 20/11): 2 tấm GPT trắng–xám (src/tb309img, global TB309_IMG) nhuộm theo bậc trên canvas phụ, lưu đệm (không ctx.filter).
//  Màu: Thường / Lục / Lam / Tím+5 theo bảng 6 bậc; Tím = màu chữ ký riêng món; SSS = song sắc 2 món mẹ (A thân, B viền/đuôi, lõi #fef08a).
//  70/30: thân đạn / đầu tên lửa / vành khiên theo màu bậc · đuôi / vòng nổ / hào quang chân tàu con theo màu chữ ký món.
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
 const SPIN={s_crescent:9,s_orb:3,s_halo:6,s_sigil:2};
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
 function palOf(v,tier,sss){if(sss){const A=SIG[sss.parents[0]]||'#fbbf24',B=SIG[sss.parents[1]]||'#22d3ee';return ['#fef08a',A,mix(B,'#000',.25),B];}
  const s=SIG[v]||'#7dd3fc';if(tier==='tim')return [mix(s,'#fff',.55),s,mix(s,'#000',.35),s];const p=TP[tier]||TP.lam;return [p[0],p[1],p[2],s];}
 // món v đang bắn: bậc + SSS (nếu SSS đang lắp chứa v hoặc chính là v)
 function info(v,kind){const it=byVar(v)||eq(kind);kind=kind||(it&&it.kind);const sss=sssOf(kind);
  if(sss&&(sss.id===v||sss.parents.includes(v)||(it&&sss.parents.includes(it.variant))))return {v:sss.parents.includes(v)?v:sss.parents[0],tier:'sss',sss,pal:palOf(v,'sss',sss)};
  const t=tierOf(it);return {v,tier:t,sss:null,pal:palOf(v,t,null)};}
 // ---- nhuộm (gradient map 3 điểm theo độ sáng) ----
 const C={};
 function tint(key,pal,pod){const ck=key+'|'+pal.join(',')+(pod?'|p':'');if(C[ck])return C[ck];const im=IM[key];if(!ok(im))return null;
  const w=im.naturalWidth,h=im.naturalHeight,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(im,0,0);
  const d=g.getImageData(0,0,w,h),a=d.data,P=[rgb(pal[0]),rgb(pal[1]),rgb(pal[2])];
  for(let i=0;i<a.length;i+=4){if(!a[i+3])continue;const L=Math.max(a[i],a[i+1],a[i+2])/255;let o;
   if(L<.35){const q=L/.35;o=P[2].map(x=>x*q);}else if(L<.76){const q=(L-.35)/.41;o=P[2].map((x,j)=>x+(P[1][j]-x)*q);}else{const q=(L-.76)/.24;o=P[1].map((x,j)=>x+(P[0][j]-x)*q);}
   if(pod){const k=.35+.65*Math.max(0,Math.min(1,(L-.7)/.25)),gy=L*255;o=o.map(x=>gy+(x-gy)*k);}
   a[i]=o[0];a[i+1]=o[1];a[i+2]=o[2];}
  g.putImageData(d,0,0);const keys=Object.keys(C);if(keys.length>160)delete C[keys[0]];return C[ck]=c;}
 // ---- đạn / tên lửa ----
 const SZ={mis:[46,54],side:[30,36],trail:34};
 function put(c,o,I,mis,sup,age,ref){const key=SPR[I.v];if(!key)return false;const im=tint(key,I.pal);if(!im)return false;
  const L=(mis?SZ.mis:SZ.side)[sup?1:0],ar=im.width/im.height,W=L*ar,ang=Math.atan2(o.vy||-1,o.vx||0)+Math.PI/2,spin=SPIN[key]||0;
  c.save();try{c.translate(o.x,o.y);c.rotate(ang);
   const h=ref&&mis?(ref.__h9||(ref.__h9=[])):null;if(h){const n=h.length;if(!n||Math.hypot(h[n-2]-o.x,h[n-1]-o.y)>2){h.push(o.x,o.y);if(h.length>16)h.splice(0,2);}}
   if(h&&h.length>=6){c.restore();c.save();c.globalCompositeOperation='lighter';c.lineCap='round';const n=h.length/2;/* đuôi cong 8 điểm: rộng 5→0, α .65→0 (Gemini) */
    for(let k=1;k<n;k++){const q=k/(n-1);c.strokeStyle=rgba(I.pal[3],.65*q);c.lineWidth=Math.max(.5,5*(sup?1.25:1)*q);c.beginPath();c.moveTo(h[k*2-2],h[k*2-1]);c.lineTo(k===n-1?o.x:h[k*2],k===n-1?o.y:h[k*2+1]);c.stroke();}
    c.restore();c.save();c.translate(o.x,o.y);c.rotate(ang);}
   if(mis&&!(h&&h.length>=6)){const tl=SZ.trail*(sup?1.2:1),y0=L*.32,gr=c.createLinearGradient(0,y0,0,y0+tl);gr.addColorStop(0,rgba(I.pal[3],.55));gr.addColorStop(1,rgba(I.pal[3],0));
    c.globalCompositeOperation='lighter';c.fillStyle=gr;c.beginPath();c.moveTo(-W*.22,y0);c.lineTo(W*.22,y0);c.lineTo(0,y0+tl);c.closePath();c.fill();}
   c.globalCompositeOperation='lighter';const r=Math.max(W,L)*.62,q=c.createRadialGradient(0,0,0,0,0,r);q.addColorStop(0,rgba(I.pal[1],.30));q.addColorStop(1,rgba(I.pal[1],0));c.fillStyle=q;c.fillRect(-r,-r,r*2,r*2);
   if(I.sss){c.strokeStyle=rgba(I.pal[3],.5);c.lineWidth=1.5;c.beginPath();c.arc(0,0,r*.62,0,6.283);c.stroke();}
   c.globalCompositeOperation='source-over';c.globalAlpha=mis?1:.9;if(spin)c.rotate((age||0)*spin);c.drawImage(im,-W/2,-L/2,W,L);}finally{c.restore();}return true;}
 const supNow=()=>{try{return superTime>0;}catch{return false;}};
 const VKIND=v=>/_m$|^(inferno|cryo|thunder|singularity|spiral|stellar|comet36|nova36|judgement36|swarm9)$/.test(v)?'missiles':'sidearm';
 // GEAR_FX (12 món gốc + SSS): vẽ cả hồ đạn của 1 st
 function has(id){if(SPR[id])return true;try{const d=Gear44.defs().find(x=>x.id===id);return !!(d&&d.parents&&SPR[d.parents[0]]);}catch{return false;}}
 function pool(c,st){const kind=VKIND(SPR[st.id]?st.id:((Gear44.defs().find(x=>x.id===st.id)||{}).parents||['x'])[0]);let n=0;
  for(const b of st.pool){if(!b.on||(b.type!=='shot'&&b.type!=='return'))continue;const I=info(SPR[b.id]?b.id:st.id,kind);if(put(c,b,I,kind==='missiles',b.variant==='super',b.age,b))n++;}return n;}
 // đạn thường bộ 9–12 / bộ 36 (shots có gearItem)
 function shot(c,s){if(!on('TB309DAN')||!s||!s.gearItem)return false;const v=s.gearItem.variant;if(!SPR[v])return false;const I=info(v,s.gearItem.kind);
  return put(c,{x:s.x,y:s.y,vx:s.vx,vy:s.vy},I,s.gearItem.kind==='missiles',s.superShot||supNow(),s.age||0,s);}
 // hiệu ứng skill81: dive (Diệt Tinh / Quá Khứ), cleave (Trảm Không), halo (Thiên Hoàn)
 function fx81(g,v,a){if(!on('TB309DAN'))return false;
  if(v.k==='dive'){const id=v.v||'nova36';if(!SPR[id])return false;const y=v.y-(.3-v.life)*500;g.save();g.globalAlpha=Math.min(1,v.life*4);const r=put(g,{x:v.x,y,vx:0,vy:-1},info(id,'missiles'),true,supNow(),0);g.restore();return r;}
  if(v.k==='cleave'){const prog=1-v.life/.55,y=v.y0-(v.y0+20)*prog,I=info('monarch12_m','missiles');put(g,{x:v.x,y,vx:0,vy:-1},I,true,supNow(),0);
   g.save();g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,v.life*3);g.strokeStyle=rgba(I.pal[1],.85);g.lineWidth=3;g.beginPath();g.ellipse(v.x,y,v.w/2,10,0,Math.PI,2*Math.PI);g.stroke();g.strokeStyle=rgba(I.pal[3],.6);g.lineWidth=1.2;g.stroke();g.restore();return true;}
  if(v.k==='halo'){const p=1-v.life/.9,out=p<.5,q=out?p*2:(p-.5)*2;const px=out?v.sx+(v.tx-v.sx)*q:v.tx+(player.x+v.side*20-v.tx)*q,py=out?v.sy+(v.ty-v.sy)*q:v.ty+(player.y-60-v.ty)*q;
   const I=info('halo36','sidearm'),im=tint('s_halo',I.pal);if(!im)return false;const R=Math.max(16,v.r*1.1);g.save();g.translate(px,py);g.rotate(p*18);g.drawImage(im,-R,-R,R*2,R*2);g.restore();return true;}
  return false;}
 // dải 4 khung cho bộ 36 bắn qua skill81 (GEAR44_ASSETS[id_projectile_*])
 let stripKey='';function strip(){if(!on('TB309DAN')||typeof GEAR44_ASSETS==='undefined')return;const ids=['comet36','nova36','judgement36'],k=ids.map(i=>info(i,'missiles').pal.join()).join('|');if(k===stripKey)return;
  for(const id of ids){const I=info(id,'missiles'),im=tint(SPR[id],I.pal);if(!im)return;const fh=96,fw=Math.round(fh*im.width/im.height),c=document.createElement('canvas');c.width=fw*4;c.height=fh;const g=c.getContext('2d');
   for(let i=0;i<4;i++){g.globalAlpha=.85+.15*(i%2);g.drawImage(im,i*fw,0,fw,fh);}const u=c.toDataURL('image/png');GEAR44_ASSETS[id+'_projectile_normal']=u;GEAR44_ASSETS[id+'_projectile_super']=u;}stripKey=k;}
 // ---- tàu con ----
 function pod(c,i,p,sp){if(!on('TB309POD')||!i)return false;const sss=sssOf('sidearm');const v=sss?sss.parents[0]:i.variant,key=POD[v];if(!key)return false;
  const I=info(v,'sidearm'),im=tint(key,I.pal,true);if(!im)return false;const w=sp?40:32,t=performance.now()/1000;
  c.save();try{c.globalCompositeOperation='lighter';c.lineWidth=1.6;c.strokeStyle=rgba(I.pal[3],.30+(sp?.15:0));c.beginPath();c.arc(p.x,p.y+3,16,0,6.283);c.stroke();
   if(sss){for(const [r,d,col] of [[18,1,I.pal[1]],[21,-1,I.pal[3]]]){c.strokeStyle=rgba(col,.45);c.setLineDash([6,5]);c.lineDashOffset=d*t*20;c.beginPath();c.arc(p.x,p.y+3,r,0,6.283);c.stroke();}c.setLineDash([]);}
   if(sss){const bob=Math.sin(t*3+p.x*.05)*2;c.lineWidth=2;for(const sd of [-1,1]){c.strokeStyle=rgba(sd<0?I.pal[1]:I.pal[3],.40);c.beginPath();c.arc(p.x+sd*(w*.38),p.y+bob,w*.55,sd<0?Math.PI*.6:-Math.PI*.4,sd<0?Math.PI*1.4:Math.PI*.4);c.stroke();}}/* 2 cánh năng lượng bán nguyệt cho tàu con SSS */
   const q=c.createRadialGradient(p.x,p.y,0,p.x,p.y,w*.7);q.addColorStop(0,rgba(I.pal[1],sp?.35:.18));q.addColorStop(1,rgba(I.pal[1],0));c.fillStyle=q;c.fillRect(p.x-w,p.y-w,w*2,w*2);
   c.globalCompositeOperation='source-over';c.drawImage(im,p.x-w/2,p.y-w/2,w,w);}finally{c.restore();}return true;}
 // ---- khiên ----
 let wasOn=false,regenT=-9,brk=null,hitArc=null,shards=[];
 function nearDir(){let best=null,bd=1e9;try{for(const b of bullets){const d=Math.hypot(b.x-player.x,b.y-player.y);if(d<bd){bd=d;best=b;}}}catch{}return best?Math.atan2(best.y-player.y,best.x-player.x):-Math.PI/2;}
 function armor(t,dt,isOn,mayBreak){if(!on('TB309SH'))return false;const a=eq('armor');const sss=sssOf('armor');const v=sss?sss.parents[0]:(a&&a.variant),key=SHF[v]||'shield_hex',I=info(v||'aegis','armor'),x=player.x,y=player.y,R=40;
  if(isOn&&!wasOn)regenT=t;
  if(!isOn&&wasOn&&mayBreak){const ang=nearDir();brk={t0:t,x,y,I};hitArc={t0:t,ang,I};shards=Array.from({length:7},(_,k)=>({a:k/7*6.283+Math.random()*.5,v:120+Math.random()*90,r:Math.random()*6.283,s:3+Math.random()*3}));}
  wasOn=isOn;
  if(isOn){const im=tint(key,I.pal),spin=SPINSH[key]||0;ctx.save();ctx.translate(x,y);
   const rg=ctx.createRadialGradient(0,0,R*.7,0,0,R);rg.addColorStop(0,rgba(I.pal[1],0));rg.addColorStop(1,rgba(I.pal[1],.10));ctx.fillStyle=rg;ctx.beginPath();ctx.arc(0,0,R,0,6.283);ctx.fill();
   if(im){ctx.globalAlpha=.6;ctx.save();ctx.rotate(t*spin);ctx.drawImage(im,-R-2,-R-2,R*2+4,R*2+4);ctx.restore();
    if(sss){const im2=tint(SHF[sss.parents[1]]||key,palOf(sss.parents[1],'sss',{parents:[sss.parents[1],sss.parents[0]]}));if(im2){ctx.globalAlpha=.45;ctx.rotate(-t*spin*1.3);ctx.drawImage(im2,-R-9,-R-9,R*2+18,R*2+18);}}}
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
 function railKey(){const it=eq('sidearm');const I=info((it&&it.variant)||'rail','sidearm');const k='tb_'+I.pal.join('_').replace(/#/g,'');try{if(window.FX309&&!FX309.PAL[k])FX309.PAL[k]=I.pal.slice(0,3);}catch{}return k;}
 function sig(kind){const it=eq(kind);if(!it)return null;const I=info(it.variant,kind);return [I.pal[3],I.pal[0]];}
 // quả cầu khiên cũ (FX40.shieldBubble, r 56 xanh lam chung mọi giáp) → nhường vành khiên theo dòng giáp
 function hookBubble(){try{if(typeof FX40==='undefined'||!FX40.shieldBubble||FX40.shieldBubble.__tb309)return;const o=FX40.shieldBubble;const f=function(){if(on('TB309SH'))return true;return o.apply(this,arguments);};f.__tb309=1;FX40.shieldBubble=f;}catch{}}
 setInterval(()=>{hookBubble();try{if(typeof mode!=='undefined'&&mode==='play')strip();}catch{}},1000);setTimeout(strip,600);
 window.TB309={on:()=>on(),SPR,POD,SHF,SIG,info,tint,put,pool,has,shot,fx81,pod,armor,railKey,sig,strip,tierOf};
})();
