const SSS_ATLAS="assets/5220693ce347.webp";const SSS_ATLAS_BAY="assets/edb824b30ff2.webp";
'use strict';
// Siêu Chiến Cơ V2 — 5 mẫu SSS hợp thể. Dùng chung bộ máy SuperForms V2 (kính trong suốt, glow, dư ảnh, lấp lánh),
// thêm: hình thái MAX robot, tia sét, nhật miện, vũ khí Thường/MAX và tuyệt kỹ. Chỉ là hình ảnh, không đổi luật game.
const SSS_MODELS=[
 {name:'Thiên Vũ Cơ Hoàng',skills:'Phân Giải + Xung Kích',color:'#ff79e7',second:'#64eaff',pair:[5,8],ult:'VŨ ĐIỆU THIÊN VŨ',
  normal:'Dạng chiến cơ lông vũ quang tử tím–cyan; đạn phân tách thành lông vũ tự tìm mục tiêu.',
  max:'Nữ cơ khí giáp bạc–titan, sáu cánh lông vũ quang tử xòe rộng; mưa mũi tên phân thân + sóng xung kích đẩy đạn địch.'},
 {name:'Thời Không Thôn Tinh',skills:'Hố Đen + Nghịch Thời',color:'#a78bfa',second:'#2dd4bf',pair:[10,11],ult:'THÔN TINH NGHỊCH THỜI',
  normal:'Chiến cơ vòng khuyết hố đen, bánh răng thiên văn vàng cổ và lõi hố đen tím.',
  max:'Cơ thể vũ trụ: đồng hồ thiên văn khổng lồ quanh lõi hố đen, hai lưỡi liềm thời gian.'},
 {name:'Thái Dương Chiến Thần',skills:'Quân Đoàn + Thiêu Đốt',color:'#ffb34c',second:'#ff79da',pair:[9,7],ult:'NHẬT MIỆN THIÊU THIÊN',
  normal:'Pháo hạm đỏ thẫm–vàng kim với lõi mặt trời và ụ pháo vệ tinh; cột lửa chính.',
  max:'Nam cơ khí giáp đỏ–vàng hoàng gia, ụ pháo vệ tinh quanh vai, hào quang mặt trời bùng nổ chữ X lửa.'},
 {name:'Hư Không Đế Vương',skills:'Đế Vương Độc Tôn',color:'#c084fc',second:'#fde047',pair:[12,12],ult:'ĐẾ VƯƠNG HƯ KHÔNG',
  normal:'Hư Không Đế Vương tự thức tỉnh: chiến cơ tím–vàng hoàng gia.',
  max:'Nam cơ khí giáp đen–vàng, vương miện, áo choàng hoàng kỳ và cánh pha lê tím.'},
 {name:'Hàn Phong Kỵ Sĩ',skills:'Trảm Kích + Hàn Băng',color:'#83eaff',second:'#bd9bff',pair:[6,2],ult:'BĂNG HÀ VẠN KIẾM',
  normal:'Tiêm kích băng xanh–thép trắng sắc nhọn; tia không độ và nhát chém băng.',
  max:'Nam cơ khí giáp băng sắc nhọn, tám phiến cánh tinh thể xòe như áo choàng; đại kiếm băng trảm dọc.'},
 {name:'Xích Diễm Long Thương',skills:'Xuyên Phá + Tán Xạ',color:'#ff9655',second:'#62eeff',pair:[0,3],ult:'PHƯỢNG VIÊM PHÁ THIÊN',
  normal:'Tiêm kích rồng lửa đỏ–đen; mũi thương xuyên thẳng và quạt đạn lửa.',
  max:'Nam cơ khí giáp đỏ rực–đen, đôi cánh phượng cơ khí ba tầng lửa; đại thương xuyên phá + quạt lửa tán xạ 120°.'},
 {name:'Tử Diệu Quang Hoàng',skills:'Tán Xạ + Trảm Kích',color:'#ffdd67',second:'#d995ff',pair:[1,4],ult:'TỬ DIỆU VẠN QUANG',
  normal:'Tiêm kích vàng kim–tím hoàng gia; chùm laser lăng kính tán xạ.',
  max:'Nữ cơ khí giáp vàng kim–tím, mũ giáp vương miện, bốn cánh lăng kính pha lê; chín tia tán xạ + hai lưỡi liềm ánh sáng.'}];

const SSS_THEMES=(()=>{
 const sym=(list,key,inner,w=.85,extra={})=>{const out=[];for(const [a,l,d] of list){if(Math.abs(a)<1e-6||Math.abs(Math.abs(a)-Math.PI)<1e-6){out.push({k:key,a,l,w,d:d||0,inner,...extra,mirror:undefined});continue;}for(const s of [-1,1])out.push({k:key,a:s*a,l,w:w*(extra.mirror?s:1),d:d??Math.abs(a)*.06,inner,...extra,mirror:undefined});}return out;};
 return [
 {name:'THIÊN VŨ',shapes:{a:['feather',['#ffffff','#ff8ce8','#b13cff']],b:['feather',['#f0ffff','#6ff0ff','#2a7bff']]},
  rig:[...sym([[1.15,172],[1.42,192],[1.69,192],[1.96,172],[2.23,140]],'a',0,.56,{mirror:true,ox:36,oy:-40}),...sym([[.55,132],[.86,122]],'b',1,.5,{mirror:true,ox:26,oy:-46})],
  rays:{n:10,c:['#ff8ce8','#9ff6ff'],len:[230,160]},aura:['#fff0fb','#ff79e799','#6b3cff33'],stars:['#ffffff','#ffb6f2','#7ff0ff'],ring:'#ffc0f4',streak:'#ffd6fb',
  cols:{list:[[0,60,230,1],[-30,24,170,.6],[30,24,170,.6]],tex:'streak',colors:['#ff9cf0','#9ff6ff','#ffffff']},motes:{dir:-1,speed:46,rate:40},extras:['halos']},
 {name:'XÂM NHẬP',shapes:{a:['shard',['#ffffff','#ff4f9a','#7a12ff']],b:['shard',['#e8ffff','#56efff','#1450c8']]},
  rig:[...sym([[1.0,192],[1.3,204],[1.6,192],[1.9,166],[2.2,132]],'a',0,.4,{ox:34,oy:-36}),...sym([[.45,132],[.8,116]],'b',1,.38,{ox:24,oy:-46})],
  rays:{n:9,c:['#ff5a3a','#ffb36b'],len:[300,220],fan:.62},aura:['#ffe8e0','#ff6a4a99','#7a12ff33'],stars:['#ffffff','#ff9a6a','#56efff'],ring:'#ff9a6a',streak:'#ffc0a0',
  cols:{list:[[-36,34,220,1],[36,34,220,1]],tex:'pixel',colors:['#ff7a3a','#ff4f9a','#56efff']},motes:{dir:-1,speed:70,rate:34,kind:'pixel'},extras:['binary']},
 {name:'NHẬT MIỆN',shapes:{a:['flame',['#fff3c0','#ffb34c','#ff3a6a']],b:['shard',['#ffe6ff','#ff79da','#a020c0']]},
  rig:[...sym([[1.15,172],[1.5,182],[1.85,152]],'a',0,.7,{mirror:true,ox:36,oy:-40}),...sym([[2.35,232],[2.65,204]],'b',0,.24,{ox:30,oy:10}),...sym([[.4,152],[.75,132]],'b',1,.3,{ox:20,oy:-50})],
  rays:{n:16,c:['#ffb34c','#ff79da'],len:[290,200]},aura:['#fff6d8','#ffb34caa','#ff3a6a44'],stars:['#ffffff','#ffd36b','#ff79da'],ring:'#ffd36b',streak:'#ffe0a0',
  cols:{list:[[0,74,260,1.15]],tex:'flame',colors:['#ffb34c','#ff5a3a','#fff3c0']},motes:{dir:-1,speed:90,rate:46},extras:['sunring','halos','arcs'],arcs:{c:'#ff8ae6',n:5,r:200}},
 {name:'TINH HÀ',shapes:{a:['shard',['#ffffff','#c9a8ff','#6a3cff']],b:['shard',['#f0ffff','#7feeff','#2a7bff']]},
  rig:[{k:'a',a:0,l:224,w:.34,d:0,inner:0,oy:-64},...sym([[Math.PI/2,192]],'a',0,.34,{ox:30,oy:-24}),{k:'a',a:Math.PI,l:170,w:.34,d:.1,inner:0,oy:34},...sym([[.785,142],[2.36,132]],'b',1,.4,{ox:22,oy:-22})],
  rays:{n:8,c:['#bb9aff','#7feeff'],len:[230,160]},aura:['#f0e8ff','#bb9aff99','#2a3cff33'],stars:['#ffffff','#d8c8ff','#7feeff'],ring:'#d8c8ff',streak:'#e0d6ff',
  cols:{list:[[-44,22,200,1],[44,22,200,1]],tex:'streak',colors:['#bb9aff','#7feeff','#ffffff']},motes:{dir:-1,speed:40,rate:26},extras:['orbit','pods','arcs'],pods:{n:6,y:-128,span:1.15,r:92,color:'#bb9aff',jet:'#7feeff'},arcs:{c:'#c8a8ff',n:4,r:190}},
 {name:'VẠN KIẾM BĂNG',shapes:{a:['shard',['#ffffff','#9ff0ff','#2a7bff']],b:['shard',['#f4ffff','#c8b8ff','#7a5cff']]},
  rig:[...sym([[1.35,192],[1.65,212],[1.95,212],[2.25,192],[2.55,160]],'a',0,.38,{ox:34,oy:-40}),...sym([[.35,142],[.7,126]],'b',1,.32,{ox:22,oy:-50})],
  rays:{n:8,c:['#9ff0ff','#ffffff'],len:[250,170]},aura:['#f0ffff','#83eaff99','#2a5cff33'],stars:['#ffffff','#c8f8ff','#bd9bff'],ring:'#c8f8ff',streak:'#e0fbff',
  cols:{list:[[0,96,280,1.2]],tex:'streak',colors:['#e9ffff','#9ff0ff','#ffffff']},motes:{dir:1,speed:30,rate:16,kind:'snow'},extras:[]},
 {name:'PHƯỢNG VIÊM',shapes:{a:['flame',['#ffd27a','#ff6a2a','#c41a0a']],b:['shard',['#f0ffff','#62eeff','#1a7aff']]},
  rig:[...sym([[1.1,182],[1.4,204],[1.7,200],[2.0,174],[2.3,140]],'a',0,.62,{mirror:true,ox:36,oy:-40}),...sym([[.42,160],[.72,134]],'b',1,.3,{ox:22,oy:-52})],
  rays:{n:12,c:['#ff9655','#62eeff'],len:[290,200]},aura:['#ffe8d0','#ff6a2acc','#1a7aff44'],stars:['#ffffff','#ffc08a','#62eeff'],ring:'#ffc08a',streak:'#ffd8b0',
  cols:{list:[[0,40,280,1.15],[-46,26,200,.7],[46,26,200,.7]],tex:'flame',colors:['#ff9655','#ff3a2a','#fff3c0']},motes:{dir:-1,speed:84,rate:42},extras:['halos','arcs'],arcs:{c:'#62eeff',n:4,r:190}},
 {name:'TỬ DIỆU',shapes:{a:['shard',['#fffbe0','#ffdd67','#c08a20']],b:['feather',['#fbf0ff','#d995ff','#7a3cff']]},
  rig:[...sym([[1.2,196],[1.5,214],[1.8,206],[2.1,180],[2.4,146]],'a',0,.36,{ox:34,oy:-40}),...sym([[.5,150],[.82,130]],'b',1,.46,{mirror:true,ox:24,oy:-48})],
  rays:{n:14,c:['#ffdd67','#d995ff'],len:[280,190]},aura:['#fffbe8','#ffdd67aa','#7a3cff44'],stars:['#ffffff','#ffeaa0','#d995ff'],ring:'#ffeaa0',streak:'#fff0c0',
  cols:{list:[[0,56,270,1.1],[-40,20,190,.6],[40,20,190,.6]],tex:'streak',colors:['#ffdd67','#d995ff','#ffffff']},motes:{dir:-1,speed:50,rate:30},extras:['sunring','orbit','pods'],pods:{n:6,y:-120,span:1.1,r:90,color:'#d995ff',jet:'#ffdd67'}}];
})();

const makeSSS=(i)=>{
 const T=SSS_THEMES[i],M=SSS_MODELS[i],TAU=Math.PI*2;
 const eng=makeSuperV2(100+i,{theme:((window.RIG131===false||(typeof CANH132_ART!=='undefined'&&window.WING132!==false&&window.RIG131!==true))?{...T,rig:T.rig.map(p=>({...p,l:0})),wing:null}:{...T,rig:T.rig.map(p=>({...p,l:p.l*1.45,w:(p.w||.5)*1.25,ox:(p.ox||0)*1.2}))}),hullSize:250,revert:.55,cell:(im,form)=>{const w=im.naturalWidth/7,h=im.naturalHeight/2;return [i*w,form*h,w,h];},bake:{s:1.5,x0:-310,y0:-300,w:620,h:520}});
 let arcs=[],last=-1,arcAcc=0,seed=97+i*31;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 function bolt(x0,y0,x1,y1,depth){const pts=[[x0,y0],[x1,y1]];for(let d=0;d<depth;d++){for(let k=pts.length-1;k>0;k--){const a=pts[k-1],b=pts[k],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,len=Math.hypot(b[0]-a[0],b[1]-a[1]);pts.splice(k,0,[mx+(rnd()-.5)*len*.45,my+(rnd()-.5)*len*.45]);}}return pts;}
 function drawArcs(ctx,cx,cy,S,dt,str,o){if(!T.arcs||str<=.05||o.reduced)return;arcAcc+=dt*(o.quality==='light'?3:7)*str;while(arcAcc>=1){arcAcc--;const a=rnd()*TAU,r=T.arcs.r*(.6+rnd()*.5);arcs.push({pts:bolt(0,-20,Math.cos(a)*r,Math.sin(a)*r*.85-20,4),t:0,life:.12+rnd()*.12});if(arcs.length>14)arcs.shift();}
  ctx.save();ctx.translate(cx,cy);ctx.scale(S,S);ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';
  for(const b of arcs){b.t+=dt;const u=1-b.t/b.life;if(u<=0)continue;for(const [w,c,a] of [[7,T.arcs.c,.25],[2.6,T.arcs.c,.85],[1,'#ffffff',1]]){ctx.globalAlpha=u*a*str;ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();b.pts.forEach((p,k)=>k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();}}
  arcs=arcs.filter(b=>b.t<b.life);ctx.restore();}
 function drawBinary(ctx,cx,cy,S,t,str,o){if(str<=.05)return;ctx.save();ctx.translate(cx,cy);ctx.scale(S,S);ctx.globalCompositeOperation='lighter';ctx.font='bold 13px monospace';ctx.textAlign='center';
  for(let k=0;k<(o.quality==='light'?10:22);k++){const x=-250+(k*97)%500,y=((k*61+(o.reduced?0:t*120))%420)-300;ctx.globalAlpha=str*(.18+.25*((k*7)%3)/2);ctx.fillStyle=k%3?'#56efff':'#ff8c52';ctx.fillText(k%2?'1':'0',x,y);}ctx.restore();}
 // tuyệt kỹ: lãnh địa + nhật miện lớn + chuyển màn tối
 function drawDomain(ctx,cx,cy,S,t,amt,o){if(amt<=.01)return;ctx.save();ctx.translate(cx,cy);ctx.scale(S,S);ctx.globalCompositeOperation='lighter';const spin=o.reduced?0:t*.35;
  for(let k=0;k<3;k++){ctx.globalAlpha=amt*(.5-k*.12);ctx.strokeStyle=k%2?M.second:M.color;ctx.lineWidth=3-k*.6;ctx.setLineDash(k===1?[14,10]:[]);ctx.beginPath();ctx.ellipse(0,-10,210+k*36,210+k*36,spin*(k%2?-1:1),0,TAU);ctx.stroke();}ctx.setLineDash([]);
  ctx.globalAlpha=amt*.5;for(let k=0;k<24;k++){const a=k*TAU/24+spin*.5;ctx.strokeStyle=k%2?M.color:'#ffffff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(Math.cos(a)*226,Math.sin(a)*226-10);ctx.lineTo(Math.cos(a)*246,Math.sin(a)*246-10);ctx.stroke();}
  ctx.restore();}
 function draw(ctx,W,H,t,on,o={}){const dt=last<0?0:Math.max(0,Math.min(.1,t-last));last=t;const S=o.S??Math.min(W/340,H/440),cx=o.cx??W*.5,cy=o.cy??H*.62,b=eng.bloom();
  if(o.domain)drawDomain(ctx,cx,cy,S,t,o.domain,o);
  if(T.extras.includes('binary'))drawBinary(ctx,cx,cy,S,t,b,o);
  eng.draw(ctx,W,H,t,on,{...o,S,cx,cy});
  if(T.extras.includes('arcs'))drawArcs(ctx,cx,cy,S,dt,b,o);}
 return {draw,reset:()=>{eng.reset();arcs=[];last=-1;},bloom:eng.bloom,ready:eng.ready,stats:eng.stats,model:M,theme:T};
};

'use strict';
// SSS Gun — đường đạn Thường / MAX / Tuyệt kỹ cho 5 siêu chiến cơ (chỉ hình ảnh).
const SSSGun=(()=>{
 const TAU=Math.PI*2,cache=new Map();
 function cv(w,h){const c=document.createElement('canvas');c.width=Math.ceil(w);c.height=Math.ceil(h);return [c,c.getContext('2d')];}
 const hexA=(h,a)=>{const n=parseInt(h.slice(1,7),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;};
 const mix=(h1,h2,t)=>{const p=h=>{const n=parseInt(h.slice(1,7),16);return [n>>16&255,n>>8&255,n&255];};const a=p(h1),b=p(h2);return '#'+a.map((v,i)=>Math.round(v+(b[i]-v)*t).toString(16).padStart(2,'0')).join('');};
 let seed=1234;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 // ---------- kết cấu tia (dọc, lặp liền mạch) ----------
 function beamTex(kind,c1,c2){const key='b|'+kind+c1+c2;if(cache.has(key))return cache.get(key);const [c,g]=cv(64,256);g.globalCompositeOperation='lighter';
  if(kind==='flame'){for(let k=0;k<70;k++){const x=8+rnd()*48,w=4+rnd()*14,len=30+rnd()*120,y=rnd()*256,col=rnd()<.5?c1:c2;for(const yy of [y,y-256]){const gr=g.createLinearGradient(0,yy,0,yy+len);gr.addColorStop(0,hexA(col,0));gr.addColorStop(.5,hexA(col,.55));gr.addColorStop(1,hexA(col,0));g.fillStyle=gr;g.beginPath();g.ellipse(x,yy+len/2,w/2,len/2,0,0,TAU);g.fill();}}}
  else if(kind==='data'){for(let k=0;k<90;k++){const x=Math.floor(rnd()*8)*8,y=Math.floor(rnd()*32)*8,s=rnd()<.6?6:8;g.globalAlpha=.3+rnd()*.6;g.fillStyle=rnd()<.6?c1:c2;g.fillRect(x,y,s,s);}g.globalAlpha=1;}
  else{for(let k=0;k<60;k++){const x=10+rnd()*44,w=1+rnd()*5,len=40+rnd()*150,y=rnd()*256,col=rnd()<.5?c1:c2;for(const yy of [y,y-256]){const gr=g.createLinearGradient(0,yy,0,yy+len);gr.addColorStop(0,hexA(col,0));gr.addColorStop(.5,hexA(col,.6));gr.addColorStop(1,hexA(col,0));g.fillStyle=gr;g.fillRect(x,yy,w,len);}}}
  // lõi + mép
  g.globalCompositeOperation='source-over';const core=g.createLinearGradient(0,0,64,0);core.addColorStop(0,hexA(c1,0));core.addColorStop(.3,hexA(c1,.35));core.addColorStop(window.LOI309===false?.46:.485,'rgba(255,255,255,.95)');core.addColorStop(window.LOI309===false?.54:.515,'rgba(255,255,255,.95)');core.addColorStop(.7,hexA(c2,.35));core.addColorStop(1,hexA(c2,0));
  g.globalCompositeOperation='lighter';g.fillStyle=core;g.fillRect(0,0,64,256);
  g.globalCompositeOperation='destination-in';const m=g.createLinearGradient(0,0,64,0);m.addColorStop(0,'#fff0');m.addColorStop(.15,'#ffff');m.addColorStop(.85,'#ffff');m.addColorStop(1,'#fff0');g.fillStyle=m;g.fillRect(0,0,64,256);
  cache.set(key,c);return c;}
 function flareSpr(col){const key='f|'+col;if(cache.has(key))return cache.get(key);const [c,g]=cv(96,96);g.translate(48,48);const r=g.createRadialGradient(0,0,0,0,0,46);r.addColorStop(0,'#ffffff');r.addColorStop(.15,hexA(col,.95));r.addColorStop(.45,hexA(col,.3));r.addColorStop(1,hexA(col,0));g.fillStyle=r;g.fillRect(-48,-48,96,96);g.fillStyle='#fff';for(const [w,h] of [[3,44],[44,3]]){g.beginPath();g.moveTo(0,-h);g.lineTo(w,0);g.lineTo(0,h);g.lineTo(-w,0);g.closePath();g.fill();}cache.set(key,c);return c;}
 // đạn: lông vũ / mảnh pha lê / khối dữ liệu / bán nguyệt / kiếm băng
 function bulletSpr(kind,col){const key='p|'+kind+col;if(cache.has(key))return cache.get(key);const [c,g]=cv(64,128);g.translate(32,64);const hot=mix(col,'#ffffff',VIVID68.on?(window.LOI309===false?.28:.12):.6);
  const glow=(rx,ry)=>{g.save();g.scale(1,ry/rx);const r=g.createRadialGradient(0,0,0,0,0,rx);r.addColorStop(0,hexA(col,.7));r.addColorStop(1,hexA(col,0));g.fillStyle=r;g.beginPath();g.arc(0,0,rx,0,TAU);g.fill();g.restore();};
  if(kind==='feather'){glow(26,58);g.beginPath();g.moveTo(0,-46);g.bezierCurveTo(14,-26,12,18,0,40);g.bezierCurveTo(-10,14,-12,-24,0,-46);const lg=g.createLinearGradient(0,-46,0,40);lg.addColorStop(0,'#ffffff');lg.addColorStop(.4,hot);lg.addColorStop(1,hexA(col,.2));g.fillStyle=lg;g.fill();g.strokeStyle='#fff';g.lineWidth=1.2;g.beginPath();g.moveTo(0,-40);g.lineTo(0,34);g.stroke();g.globalAlpha=.6;for(let k=0;k<6;k++){g.beginPath();g.moveTo(0,-26+k*10);g.lineTo(8,-20+k*10);g.moveTo(0,-26+k*10);g.lineTo(-8,-20+k*10);g.stroke();}}
  else if(kind==='shard'||kind==='needle'){const L=kind==='needle'?50:34,W=kind==='needle'?6:11;glow(22,L+14);g.beginPath();g.moveTo(0,-L);g.lineTo(W,0);g.lineTo(0,L*.55);g.lineTo(-W,0);g.closePath();g.fillStyle='#08101e';g.globalAlpha=.6;g.fill();g.globalAlpha=1;g.beginPath();g.moveTo(0,-L+2);g.lineTo(W-2,0);g.lineTo(0,L*.5);g.closePath();g.fillStyle=hot;g.fill();g.beginPath();g.moveTo(0,-L+2);g.lineTo(-W+2,0);g.lineTo(0,L*.5);g.closePath();g.fillStyle=col;g.fill();g.strokeStyle='#fff';g.lineWidth=1.4;g.beginPath();g.moveTo(0,-L+4);g.lineTo(0,L*.4);g.stroke();}
  else if(kind==='data'){glow(24,40);for(let k=0;k<5;k++){g.fillStyle=k%2?col:hot;g.globalAlpha=.9-k*.12;g.fillRect(-6+(k%2)*3,-26+k*11,10,9);}g.globalAlpha=1;g.strokeStyle='#fff';g.lineWidth=1;g.strokeRect(-7,-28,14,14);}
  else if(kind==='crescent'){glow(30,30);g.beginPath();g.arc(0,8,26,Math.PI*1.08,Math.PI*1.92);g.arc(0,20,22,Math.PI*1.88,Math.PI*1.12,true);g.closePath();const lg=g.createLinearGradient(-26,0,26,0);lg.addColorStop(0,hexA(col,.3));lg.addColorStop(.5,'#ffffff');lg.addColorStop(1,hexA(col,.3));g.fillStyle=lg;g.fill();g.strokeStyle=hot;g.lineWidth=1.5;g.stroke();}
  else if(kind==='sword'){glow(18,60);g.beginPath();g.moveTo(0,52);g.lineTo(7,-30);g.lineTo(0,-44);g.lineTo(-7,-30);g.closePath();const lg=g.createLinearGradient(-7,0,7,0);lg.addColorStop(0,col);lg.addColorStop(.5,'#ffffff');lg.addColorStop(1,hot);g.fillStyle=lg;g.fill();g.fillStyle=mix(col,'#203060',.4);g.fillRect(-14,-34,28,5);g.fillRect(-3,-52,6,18);g.strokeStyle='#fff';g.lineWidth=.8;g.strokeRect(-14,-34,28,5);}
  else{glow(24,24);const r=g.createRadialGradient(0,0,0,0,0,10);r.addColorStop(0,'#fff');r.addColorStop(.6,hot);r.addColorStop(1,col);g.fillStyle=r;g.beginPath();g.arc(0,0,10,0,TAU);g.fill();}
  cache.set(key,c);return c;}

 // ---------- trạng thái ----------
 const st={shots:[],acc:0,hits:[],cd:0};
 function reset(){st.shots.length=0;st.hits.length=0;st.acc=0;}
 const patCache=new WeakMap();let BANDS=8;
 function beam(ctx,x,y,len,w,tex,t,speed,alpha=1,ang=0){if(len<=0||w<=0)return;let pat=patCache.get(tex);if(!pat){pat=ctx.createPattern(tex,'repeat');patCache.set(tex,pat);}
  const sc=w/64,L=len/sc,off=((t*speed/sc)%256+256)%256;ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.scale(sc,sc);
  try{pat.setTransform(new DOMMatrix([1,0,0,1,-32,off]));}catch{}ctx.fillStyle=pat;
  const N=BANDS;for(let k=0;k<N;k++){const y0=L*k/N,y1=L*(k+1)/N,v=(k+.5)/N,fade=Math.min(1,v/.06)*(v>.7?Math.max(0,1-(v-.7)/.3):1);if(fade<=.01)continue;ctx.globalAlpha=alpha*fade;ctx.fillRect(-32,-y1,64,y1-y0+.5);}
  ctx.restore();}
 function muzzle(ctx,x,y,col,s=1,t=0){const f=flareSpr(col),r=26*s*(1+.12*Math.sin(t*40));ctx.drawImage(f,x-r,y-r,r*2,r*2);}
 function add(x,y,vx,vy,kind,col,s=1,life=1.6,extra={}){if(st.shots.length>260)return;st.shots.push({x,y,vx,vy,kind,col,s,t:0,life,rot:Math.atan2(vy,vx)+Math.PI/2,spin:extra.spin||0,wob:extra.wob||0,ph:rnd()*TAU});}
 // volley theo mẫu: cx,cy = tâm tàu (đơn vị sân khấu), k = tỉ lệ
 function volley(i,max,cx,cy,k,ult){const p=ult?1.4:1;
  if(i===0){const n=max?9:3;for(let j=0;j<n;j++){const u=n===1?0:j/(n-1)-.5;add(cx+u*60*k,cy-40*k,u*(max?520:220),-620,'feather',j%2?'#7ff0ff':'#ff8ce8',(max?1:.8)*p,1.4,{wob:max?40:24});}}
  if(i===1){const n=max?7:2;for(let j=0;j<n;j++){const u=n===1?0:j/(n-1)-.5;add(cx+u*(max?40:56)*k,cy-40*k,u*(max?760:60),-700,'data',j%2?'#56efff':'#ff8c52',(max?1:.85)*p);}}
  if(i===2){const n=max?6:3;for(let j=0;j<n;j++){const u=n===1?0:j/(n-1)-.5;add(cx+u*(max?150:90)*k,cy-90*k,0,-760,'shard','#ffb34c',.8*p);}}
  if(i===3){for(let j=0;j<6;j++){const u=j/5-.5;add(cx+u*170*k,cy-110*k,-u*240,-640,'needle',j%2?'#c9a8ff':'#9ff0ff',.85*p);}if(max)for(let j=0;j<5;j++){const u=j/4-.5;add(cx+u*120*k,cy+40*k,u*420,-560,'shard','#bb9aff',.7*p);}}
  if(i===4){const n=max?7:3;for(let j=0;j<n;j++){const u=n===1?0:j/(n-1)-.5;add(cx+u*30*k,cy-50*k,u*300,-720,'needle','#9ff0ff',.75*p);}if(rnd()<(max?.7:.35))for(const s of [-1,1])add(cx+s*40*k,cy-30*k,s*90,-520,'crescent','#c8f8ff',(max?1.5:1)*p,1.4,{spin:0});}
  if(i===5){const n=max?7:3;for(let j=0;j<n;j++){const u=n===1?0:j/(n-1)-.5;add(cx+u*70*k,cy-40*k,u*(max?460:200),-660,'feather',j%2?'#ffd36b':'#ff9655',(max?1:.8)*p,1.4,{wob:max?30:18});}for(const s of [-1,1])add(cx+s*(max?54:36)*k,cy-50*k,0,-900,'needle','#62eeff',(max?.95:.75)*p);}
  if(i===6){const n=max?9:5;for(let j=0;j<n;j++){const u=j/(n-1)-.5;add(cx+u*30*k,cy-46*k,u*(max?820:520),-600,'orb',j%2?'#d995ff':'#ffeaa0',(max?.9:.7)*p,1.3);}}}
 function update(dt,targetY){for(const s of st.shots){s.t+=dt;s.x+=s.vx*dt+(s.wob?Math.sin(s.t*9+s.ph)*s.wob*dt:0);s.y+=s.vy*dt;if(targetY!==undefined&&s.y<targetY&&!s.dead){s.dead=true;st.hits.push({x:s.x,y:s.y,t:0,col:s.col});}}
  st.shots=st.shots.filter(s=>!s.dead&&s.t<s.life&&s.y>-80);for(const h of st.hits)h.t+=dt;st.hits=st.hits.filter(h=>h.t<.35);if(st.hits.length>40)st.hits.splice(0,st.hits.length-40);}
 function drawShots(ctx,k){ctx.save();ctx.globalCompositeOperation=VIVID68.on?'source-over':'lighter';for(const s of st.shots){const spr=bulletSpr(s.kind,s.col),sc=k*s.s*.5;ctx.save();if(typeof FX16A==='function')ctx.globalAlpha=FX16A(s,st.shots,k);ctx.translate(s.x,s.y);ctx.rotate(s.kind==='crescent'?0:s.rot);ctx.drawImage(spr,-32*sc,-64*sc,64*sc,128*sc);ctx.restore();}
  for(const h of st.hits){const u=h.t/.35,r=(14+u*34)*k;ctx.globalAlpha=1-u;ctx.drawImage(flareSpr(h.col),h.x-r,h.y-r,r*2,r*2);}ctx.restore();}
 // tia liên tục theo mẫu
 // mô tả tia (dùng chung cho vẽ và tính trúng đích trong game)
 function specs(i,max,cx,cy,k,t,ult,topY){const L=cy-topY,P=ult?1.35:1,o=[];const B=(x,y,len,w,tk,sp,al,ang,mz,hit=true)=>o.push({x,y,len,w,tk,sp,al,ang:ang||0,mz,hit});
  if(i===0){const xs=max?[-46,0,46]:[-30,30];for(const x of xs){const wob=Math.sin(t*3+x)*10*k;B(cx+x*k+wob,cy-50*k,L,(max?40:24)*k*P,['streak','#ff8ce8','#7ff0ff'],520,.95,0,[x<0?'#ff8ce8':'#7ff0ff',.7*k]);}}
  if(i===1){if(max){for(let j=0;j<7;j++){const a=(j/6-.5)*.75;B(cx,cy-50*k,L*1.25,26*k*P,['data','#ff6a3a','#ffb36b'],600,.85,a,j===3?['#ff8c52',1.2*k]:null);}}else for(const x of [-28,28]){B(cx+x*k,cy-40*k,L,30*k,['flame','#ff5a2a','#ffb36b'],560,.95,0,['#ff8c52',.7*k]);B(cx+x*k,cy-40*k,L,16*k,['data','#ff6a3a','#ffb36b'],640,.8,0,null,false);}}
  if(i===2){B(cx,cy-60*k,L,(max?96:50)*k*P,['flame','#ffb34c','#ff3a6a'],620,1,0,['#ffd36b',(max?1.6:1)*k]);const n=max?6:3;for(let j=0;j<n;j++){const u=n===1?0:j/(n-1)-.5,x=u*(max?200:110)*k;B(cx+x,cy-110*k,L-50*k,12*k,['streak','#ffd36b','#ff79da'],800,.9,0,null);}}
  if(i===3){if(max){for(const s2 of [-1,1]){const x0=cx+s2*120*k,y0=cy+10*k;B(x0,y0,L*1.15,30*k*P,['streak','#9ff0ff','#c9a8ff'],700,.8,-s2*.28,['#9ff0ff',1.1*k]);}}}
  if(i===4){B(cx,cy-56*k,L,(max?110:40)*k*P,['streak','#ffffff','#9ff0ff'],760,1,0,['#c8f8ff',(max?1.7:1)*k]);if(max)B(cx,cy-56*k,L,40*k,['streak','#ffffff','#c8b8ff'],900,.9,0,null,false);}
  if(i===5){B(cx,cy-60*k,L,(max?34:18)*k*P,['streak','#ffffff','#62eeff'],900,1,0,['#9ff8ff',(max?1.2:.7)*k]);const xs=max?[-58,58]:[-32,32];for(const x of xs)B(cx+x*k,cy-40*k,L,(max?44:24)*k*P,['flame','#ff6a2a','#ff2a10'],560,.92,max?(x<0?-.06:.06):0,['#ff9655',(max?.9:.6)*k]);if(max)for(const s of [-1,1])B(cx+s*96*k,cy-10*k,L*1.1,14*k,['streak','#ffffff','#62eeff'],1000,.85,-s*.16,null);}
  if(i===6){if(max){for(const x of [-34,34])B(cx+x*k,cy-56*k,L,40*k*P,['streak','#ffe27a','#ffb020'],820,1,0,['#ffdd67',1.1*k]);for(let j=0;j<6;j++){const a=(j/5-.5)*.9;B(cx,cy-70*k,L*1.2,12*k,['streak','#ffffff','#d995ff'],950,.8,a,j===0?['#d995ff',.9*k]:null);}}else{B(cx,cy-56*k,L,26*k,['streak','#ffe27a','#ffb020'],820,1,0,['#ffdd67',.8*k]);for(const s of [-1,1])B(cx+s*30*k,cy-40*k,L,10*k,['streak','#ffffff','#d995ff'],900,.7,-s*.08,null,false);}}
  return o;}
 function beams(ctx,i,max,cx,cy,k,t,ult,topY,alphaMul=1){const list=specs(i,max,cx,cy,k,t,ult,topY);ctx.save();ctx.globalCompositeOperation='lighter';
  for(const b of list){beam(ctx,b.x,b.y,b.len,b.w,beamTex(...b.tk),t,b.sp,b.al*alphaMul,b.ang);if(b.mz)muzzle(ctx,b.x,b.y,b.mz[0],b.mz[1],t);}ctx.restore();return list;}
 // tuyệt kỹ toàn màn
 function ultimate(ctx,i,W,H,cx,cy,k,t,u){// u: 0..1 tiến độ (sau giai đoạn tụ lực)
  ctx.save();ctx.globalCompositeOperation='lighter';const col=SSS_MODELS[i].color,sec=SSS_MODELS[i].second;
  if(i===0){for(let j=0;j<24;j++){const a=j*TAU/24+t*.4,len=Math.max(W,H)*1.1;beam(ctx,cx,cy-40*k,len,20*k,beamTex('streak',j%2?col:sec,'#ffffff'),t,500,.4,a);}}
  if(i===1){const tex=beamTex('data','#ff6a3a','#56efff');for(let j=0;j<12;j++){const x=(j+.5)*W/12+Math.sin(t*2+j)*10;beam(ctx,x,H,H,26*k,tex,t+j,900,.6);}}
  if(i===2){const r=(120+u*Math.max(W,H)*.6)*k/k;const gr=ctx.createRadialGradient(cx,cy-60*k,0,cx,cy-60*k,r);gr.addColorStop(0,'rgba(255,255,255,.55)');gr.addColorStop(.25,hexA(col,.3));gr.addColorStop(.7,hexA(sec,.1));gr.addColorStop(1,hexA(sec,0));ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);for(let j=0;j<12;j++){const a=j*TAU/12+t*.5;beam(ctx,cx,cy-60*k,Math.max(W,H),26*k,beamTex('flame',col,sec),t,600,.42,a);}}
  if(i===3){for(let j=0;j<14;j++){const x=((j*97+t*40)%W),y=((t*600+j*173)%(H+200))-100;ctx.drawImage(bulletSpr('shard',j%2?col:sec),x-24*k,y-48*k,48*k,96*k);}for(const s of [-1,1])beam(ctx,cx+s*W*.4,H,H*1.3,60*k,beamTex('streak','#ffffff',sec),t,800,.8,-s*.35);}
  if(i===4){for(let j=0;j<22;j++){const x=(j+.5)*W/22,y=((t*900+j*211)%(H+240))-120;ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI);ctx.drawImage(bulletSpr('sword','#9ff0ff'),-24*k,-48*k,48*k,96*k);ctx.restore();}beam(ctx,cx,cy-56*k,cy,160*k,beamTex('streak','#ffffff','#9ff0ff'),t,900,.9);}
  if(i===5){beam(ctx,cx,cy-60*k,cy+40,150*k,beamTex('flame','#ff6a2a','#ff2a10'),t,900,.85);for(const s of [-1,1])beam(ctx,cx,cy-40*k,Math.max(W,H)*1.2,36*k,beamTex('streak','#ffffff',sec),t,1100,.8,s*(.25+.35*Math.sin(t*2)));for(let j=0;j<16;j++){const x=((j*67+t*30)%W),y=H-((t*700+j*157)%(H+160))+80;ctx.drawImage(bulletSpr('feather',j%2?col:'#ffd36b'),x-22*k,y-44*k,44*k,88*k);}}
  if(i===6){const R=(90+u*60)*k,oy=cy-60*k;ctx.strokeStyle=hexA(col,.7);ctx.lineWidth=6*k;ctx.beginPath();ctx.arc(cx,oy,R,0,TAU);ctx.stroke();ctx.strokeStyle=hexA(sec,.6);ctx.lineWidth=3*k;ctx.beginPath();ctx.arc(cx,oy,R*1.18,0,TAU);ctx.stroke();for(let j=0;j<18;j++){const a=j*TAU/18+t*.9;beam(ctx,cx+Math.sin(a)*R,oy-Math.cos(a)*R,Math.max(W,H),(j%3?10:22)*k,beamTex('streak',j%2?col:sec,'#ffffff'),t,900,.55,a);}for(let j=0;j<12;j++){const x=(j+.5)*W/12,y=((t*500+j*190)%(H+200))-100;ctx.drawImage(bulletSpr('orb',j%2?sec:col),x-20*k,y-20*k,40*k,40*k);}}
  ctx.restore();}
 return {setBands:n=>{BANDS=n;},reset,volley,update,drawShots,beams,specs,ultimate,bulletSpr,flareSpr,state:()=>({shots:st.shots.length})};
})();

'use strict';
// Direct fusion: two component fighters create one SSS craft; MAX visuals are unchanged.
// ảnh SSS thay ảnh cũ trong bộ sưu tập. Save cũ giữ nguyên (siêu hợp thể cũ tự quy về mẫu SSS gần nhất).
const SSS_RECIPES=FusionBlueprints.pairs;
const SSSLab=(()=>{

 const css=`
#sss-lab{margin-top:22px;padding:16px;border:1px solid rgba(86,206,255,.35);background:linear-gradient(160deg,rgba(10,28,52,.85),rgba(6,16,30,.85))}
#sss-lab .sl-head{display:flex;justify-content:space-between;align-items:flex-end;gap:10px;flex-wrap:wrap;margin-bottom:10px}
#sss-lab .sl-head h3{margin:0}
#sss-lab .sl-head p{margin:2px 0 0;font-size:12px;color:#9fc0da}
#sss-lab .sl-body{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:12px}
#sss-lab .sl-stage{position:relative;min-height:320px;background:radial-gradient(ellipse at 50% 60%,#16305a,#050b18 70%);border:1px solid rgba(86,206,255,.4);clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);overflow:hidden}
#sss-lab .sl-stage canvas{display:block;width:100%;height:100%;min-height:320px}
#sss-lab .sl-cap{position:absolute;left:10px;right:10px;bottom:8px;text-align:center;pointer-events:none}
#sss-lab .sl-cap b{display:block;font-size:17px;letter-spacing:2px;color:#fff;text-shadow:0 0 12px #3fe6ff}
#sss-lab .sl-cap small{font-size:11px;color:#bfe6ff}
#sss-lab .sl-tag{position:absolute;top:8px;left:10px;font-size:10px;letter-spacing:2px;color:#3fe6ff;pointer-events:none}
#sss-lab .sl-list{display:grid;gap:8px}
#sss-lab .sl-card{display:grid;grid-template-columns:64px 1fr;gap:10px;align-items:center;padding:8px;text-align:left;background:linear-gradient(160deg,rgba(14,40,72,.85),rgba(6,16,30,.85));border:1px solid rgba(86,206,255,.28);cursor:pointer;clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)}
#sss-lab .sl-card[aria-current="true"]{border-color:#ffcf5a;box-shadow:inset 3px 0 #ffcf5a}
#sss-lab .sl-card.own .sl-por::after{content:'✓';position:absolute;right:2px;bottom:0;color:#46ffb2;font-weight:900;text-shadow:0 0 6px #000}
#sss-lab .sl-por{position:relative;width:64px;height:64px;background-image:var(--sss-atlas);background-size:700% 200%;background-repeat:no-repeat;filter:drop-shadow(0 0 6px rgba(255,255,255,.25))}
#sss-lab .sl-card b{display:block;font-size:13px;color:#fff;letter-spacing:1px}
#sss-lab .sl-card small{display:block;font-size:10.5px;color:#9fc0da;line-height:1.4}
#sss-lab .sl-req{display:flex;gap:4px;flex-wrap:wrap;margin-top:3px}
#sss-lab .sl-req span{font-size:10px;padding:1px 6px;border:1px solid #3a5a7a;color:#9fc0da}
#sss-lab .sl-req span.ok{border-color:#46ffb2;color:#9ff0c8}
#sss-lab .sl-act{display:flex;gap:8px;margin-top:10px}
#sss-lab .sl-act button{flex:1;min-height:42px}
#sss-lab .sl-info{font-size:12px;color:#b9d3e8;margin:8px 0 0;line-height:1.5}
@media(max-width:760px){#sss-lab .sl-body{grid-template-columns:1fr}#sss-lab .sl-stage,#sss-lab .sl-stage canvas{min-height:280px}}
.sss-por{display:block;width:96px;height:96px;margin:0 auto;background-image:var(--sss-atlas);background-size:700% 200%;background-repeat:no-repeat}
`;
 let focus=0,root,cv,g,fx={},raf=0,clock=0,last=0,tapAt=-9,im=null;

 function supers(){try{return Fusion.getState().supers;}catch{return [];}}
 function superKey(i){return FusionBlueprints.key(i);}
 function owned(i){return !!Fusion.ownedKey(i);}
 function ownedKey(i){return Fusion.ownedKey(i);}
 function selectedKey(){try{return Fusion.getState().selected;}catch{return null;}}
 const busy=()=>['play','pause','reward'].includes(mode);
 function por(i,row=0){return `background-position:${i*100/6}% ${row*100}%`;}
 function build(){const st=document.createElement('style');st.id='sss-lab-css';st.textContent=css+`:root{--sss-atlas:url(${SSS_ATLAS})}`;document.head.appendChild(st);
  const old=document.querySelector('#fusion-lab .super-lab');if(!old)return false;
  // giữ các ô chọn cũ (ẩn) để mã cũ không lỗi
  old.style.display='none';
  root=document.createElement('section');root.id='sss-lab';root.className='sss-lab-panel';
  root.innerHTML=`<div class="sl-head"><div><span class="eyebrow">SIÊU HỢP THỂ · BẬC SSS</span><h3>HAI CHIẾN CƠ → MỘT CHIẾN CƠ SSS</h3><p>7 công thức cố định — mọi chiến cơ đều có đích hợp thể. Hai chiến cơ thành phần đạt +1 và được giữ lại. Không cần robot trung gian; Bạo Tẩu hoặc E vẫn biến hình MAX.</p></div></div>
   <div class="sl-body"><div class="sl-stage"><canvas aria-label="Xem trước siêu chiến cơ · chạm để biến hình"></canvas><span class="sl-tag" id="sl-tag">DẠNG CHIẾN CƠ</span><div class="sl-cap"><b id="sl-name">—</b><small id="sl-sk">—</small></div></div>
   <div><div class="sl-list" id="sl-list"></div><p class="sl-info" id="sl-info"></p><div class="sl-act"><button class="gold-btn" id="sl-go">✦ SIÊU HỢP THỂ</button></div></div></div>`;
  old.after(root);cv=root.querySelector('canvas');g=cv.getContext('2d');
  cv.onclick=()=>{tapAt=clock;};
  root.querySelector('#sl-go').onclick=act;
  im=new Image();im.src=SSS_ATLAS;
  new MutationObserver(()=>decorate()).observe(document.getElementById('robot-collection'),{childList:true,subtree:false});
  return true;}
 function act(){if(busy())return;const i=focus,k=ownedKey(i),msg=document.getElementById('fusion-message');
  if(k){const ok=Fusion.select(k);if(msg)msg.textContent=ok?'Đã trang bị '+SSS_MODELS[i].name+' · SSS.':'Hãy kết thúc chuyến bay trước khi đổi chiến cơ.';paint();return;}
  const r=Fusion.mergeSSS(...SSS_RECIPES[i]);
  if(msg)msg.textContent=r?'✦ HỢP THỂ THÀNH CÔNG · '+SSS_MODELS[i].name+' · SSS đã trang bị.':'Cần hai chiến cơ thành phần đều được mở khóa và đạt +1.';
  if(r){tapAt=clock;try{tone(880,.3,'triangle');}catch{}}paint();}
 function paint(){if(!root)return;const sel=selectedKey();
  root.querySelector('#sl-list').innerHTML=SSS_MODELS.map((m,i)=>{const pair=SSS_RECIPES[i],own=owned(i),using=own&&sel===ownedKey(i);
   return `<button class="sl-card ${own?'own':''}" data-sl="${i}" aria-current="${i===focus}"><span class="sl-por" style="${por(i)}"></span><span><b>${m.name}${using?' · <span style="color:#46ffb2">ĐANG DÙNG</span>':''}</b><small>✦ ${m.skills} · Tuyệt kỹ: ${m.ult}</small><span class="sl-req">${pair.map(c=>`<span class="${Fusion.componentReady(c)?'ok':''}">${Fusion.componentReady(c)?'✓':'🔒'} ${crafts[c].name} +1</span>`).join('')}</span></span></button>`;}).join('');
  root.querySelectorAll('[data-sl]').forEach(b=>b.onclick=()=>{focus=Number(b.dataset.sl);tapAt=-9;paint();});
  const m=SSS_MODELS[focus],pair=SSS_RECIPES[focus],own=owned(focus),ready=pair.every(Fusion.componentReady),using=own&&sel===ownedKey(focus);
  root.querySelector('#sl-name').textContent=m.name.toUpperCase();root.querySelector('#sl-sk').textContent=m.skills+' · '+m.ult;
  root.querySelector('#sl-info').innerHTML=`<b>Thành phần:</b> ${pair.map(c=>crafts[c].name+' +1').join(' + ')}<br><b>Dạng chiến cơ:</b> ${m.normal}<br><b>Dạng MAX:</b> ${m.max}<br><b>Tuyệt kỹ (E):</b> ${m.ult} · tụ lực rồi đòn toàn màn, xóa đạn, bất tử khi thi triển · hồi chiêu 18 giây.`;
  const go=root.querySelector('#sl-go');go.disabled=busy()||(!own&&!ready)||using;go.textContent=using?'✓ ĐANG TRANG BỊ':own?'TRANG BỊ SSS':ready?'✦ 2 CHIẾN CƠ → SSS · MIỄN PHÍ':'🔒 CẦN '+pair.filter(c=>!Fusion.componentReady(c)).map(c=>crafts[c].name.toUpperCase()+' +1').join(' + ');
  decorate();}
 // thay ảnh/tên siêu hợp thể trong bộ sưu tập
 let decorating=false;
 function decorate(){if(decorating)return;decorating=true;try{document.querySelectorAll('#robot-collection [data-robot^="sss:"]').forEach(btn=>{const card=btn.closest('.robot-card'),r=Fusion.resolve(btn.dataset.robot);if(!card||!r)return;card.dataset.sss=r.model;const nm=card.querySelector('b');if(nm)nm.textContent=r.name.toUpperCase()+' · SSS';});}finally{decorating=false;}}
 function frame(ms){raf=requestAnimationFrame(frame);const dt=last?Math.min(.05,(ms-last)/1000):0;last=ms;if(!cv||!cv.offsetParent||document.hidden||!im.complete)return;clock+=dt;
  const r=cv.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1),w=Math.round(r.width*d),h=Math.round(r.height*d);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}
  g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,r.width,r.height);const f=fx[focus]||(fx[focus]=makeSSS(focus));
  const on=clock-tapAt<4||((clock%8)>4);const S=Math.min(r.width/420,r.height/460);
  f.draw(g,r.width,r.height,clock,on,{hull:im,quality:VisualFX.counts().quality==='light'?'light':'high',reduced:VisualFX.reduced(),cx:r.width/2,cy:r.height*.56,S,duration:1.1,domain:on?.45:0});
  const ph=f.stats().phase;document.getElementById('sl-tag').textContent=ph==='super'?'MAX · CHIẾN THẦN':ph==='transform'?'ĐANG BIẾN HÌNH…':ph==='revert'?'TRỞ VỀ…':'DẠNG CHIẾN CƠ · CHẠM ĐỂ BIẾN HÌNH';}
 function init(){if(!build())return;paint();raf=requestAnimationFrame(frame);
  // cập nhật khi Fusion đổi trạng thái
  try{for(const fn of ['mergeSSS','merge','select']){const o=Fusion[fn];Fusion[fn]=function(){const r=o.apply(Fusion,arguments);setTimeout(paint,0);return r;};}}catch{}
  setInterval(()=>{if(root&&root.offsetParent)paint();},2500);}
 return {init,paint};
})();

'use strict';
// V40.1 · Siêu Chiến Cơ V2 trong game: robot SIÊU HỢP THỂ dùng 5 mẫu SSS.
// - Bạo Tẩu → dạng MAX + tia MAX gây sát thương thật (≈ +50% DPS của robot, chia theo độ rộng tia).
// - Kỹ năng robot (E) → TUYỆT KỸ HỢP THỂ: tụ lực 0,6 s (bất tử) rồi 2,4 s đòn toàn màn, xóa đạn địch;
//   tổng sát thương mỗi địch ≈ 4 bom, boss ≈ 2,5 bom (nhân phẩm chất robot); hồi chiêu 18 s.
const SSSGame=(()=>{
 const im=new Image();im.src=SSS_ATLAS_BAY;const imL=new Image();imL.src=SSS_ATLAS;/* V131: trong trận bay úp, sảnh chân dung */const inst={},lob={};let cur=-1,lastT=-1,tickAcc=0,ultAcc=0,mainPrev=-1,mainRate=0;
 const U={t:0,charge:.6,active:2.4,idx:-1};// tuyệt kỹ
 const BEAM_DPS=9,ULT_ENEMY=4,ULT_BOSS=2.5,ULT_CD=18;
 const ready=()=>im.complete&&im.naturalWidth>0;
 function indexFor(r){return r&&r.super?FusionBlueprints.modelFor(r):-1;}
 const get=i=>inst[i]||(inst[i]=makeSSS(i));
 const opts=()=>({quality:VisualFX.counts().quality==='light'?'light':'high',reduced:VisualFX.reduced(),hull:(window.__hop309bay||im)});
 function unit(r){try{return allyDamageScale()*gear.damage*1.25*Workshop.factor(r.grade)*Workshop.levelFactor(r);}catch{return 1;}}
 const S_GAME=.54;
 function ultOn(){return U.t>0;}
 function ultActive(){return U.t>0&&U.t<=U.active;}
 // ---------- sát thương ----------
 function hitBeam(b,x,y,r){const dx=Math.sin(b.ang),dy=-Math.cos(b.ang),px=x-b.x,py=y-b.y,along=px*dx+py*dy;if(along<-r||along>b.len+r)return false;return Math.abs(px*dy-py*dx)<=b.w*.42+r;}
 function dealEnemy(e,d){d*=(typeof Meta407!=='undefined'?Meta407.sssMult():1);if(e.dead||e.rescue28||!Number.isFinite(e.hp))return;Report392.hit(Math.min(e.hp,d),'skill');e.hp-=d;if(e.hp<=0)kill(e);}
 function dealBoss(d,part){d*=(typeof Meta407!=='undefined'?Meta407.sssMult():1);try{damageBoss(d,'sss',part||boss);}catch{}}
 function beamDamage(list,dt,u){const dps=Math.max(BEAM_DPS*u,.35*mainRate);const hits=list.filter(b=>b.hit);if(!hits.length)return;const sw=hits.reduce((a,b)=>a+b.w,0);
  for(const b of hits){const d=dps*dt*b.w/sw;for(const e of enemies){if(e.dead||e===boss)continue;const r=(e.hitW||(e.large?40:24))/2;if(hitBeam(b,e.x,e.y,r))dealEnemy(e,d);}
   if(boss&&!boss.defeatStarted){const parts=(boss.parts||[]).filter(p=>!p.dead);let done=false;for(const p of parts)if(hitBeam(b,p.x,p.y,(p.hitW||30)/2)){dealBoss(d,p);done=true;break;}if(!done&&hitBeam(b,boss.x,boss.y,(boss.hitW||70)/2))dealBoss(d,boss);}}}
 function ultDamage(dt,u){const ticks=U.active/.15,de=ULT_ENEMY*110*allyDamageScale()*Workshop.factor(activeRobot.grade)/ticks,db=ULT_BOSS*110*allyDamageScale()*Workshop.factor(activeRobot.grade)/ticks;
  ultAcc+=dt;while(ultAcc>=.15){ultAcc-=.15;for(const e of enemies)if(!e.dead&&e!==boss&&e.y>-20&&e.y<H+20)dealEnemy(e,de);if(boss&&!boss.defeatStarted){const parts=(boss.parts||[]).filter(p=>!p.dead);dealBoss(db,parts.length?parts[Math.floor(Math.random()*parts.length)]:boss);}
   bullets=[];beams=[];}}
 // ---------- vẽ + cập nhật (gọi tại bước vẽ tàu) ----------
 function draw(r,bank){if(!ready())return false;const i=indexFor(r);if(i<0)return false;if(i!==cur){if(inst[cur])inst[cur].reset();cur=i;}
  const dt=lastT<0?0:Math.max(0,Math.min(.1,time-lastT));lastT=time;const playing=mode==='play';
  if(playing&&dt>0){try{const m=Report392.state().dealt.main;if(mainPrev>=0&&m>=mainPrev)mainRate+=((m-mainPrev)/dt-mainRate)*Math.min(1,dt*1.5);mainPrev=m;}catch{}}
  if(U.t>0&&(playing||window.HANGAR_DEMO)){U.t=Math.max(0,U.t-dt);invuln=Math.max(invuln,.25);}
  const f=get(i),uon=ultOn(),on=superTime>0||uon,S=S_GAME+.04*f.bloom()+(typeof SSS_ATLAS_BAY!=='undefined'?(window.ROB134===false?.08:.36)*f.bloom():0),phase=f.stats().phase,max=phase==='super',ua=ultActive();
  // màn tối + tia MAX (dưới tàu)
  if(uon){ctx.save();ctx.fillStyle='#000';ctx.globalAlpha=Math.min(.45,(U.charge+U.active-U.t)*.9);ctx.fillRect(0,0,W,H);ctx.restore();}
  if(ua)SSSGun.ultimate(ctx,i,W,H,player.x,player.y,S,time,1-U.t/U.active);
  if(max&&playing||max&&mode==='pause'||max&&window.HANGAR_DEMO){SSSGun.setBands(VisualFX.counts().quality==='light'?3:5);const list=SSSGun.beams(ctx,i,true,player.x,player.y,S,time,ua,0,(VisualFX.counts().quality==='light'?.7:.9)*(typeof GLOW66!=='undefined'?GLOW66.beam:1));if(playing)beamDamage(list,dt,unit(r));}
  if(ua&&playing)ultDamage(dt,unit(r));
  if(uon&&U.t>U.active){const u=1-(U.t-U.active)/U.charge;ctx.save();ctx.globalCompositeOperation='lighter';const rr=30+u*150,gr=ctx.createRadialGradient(player.x,player.y-20,0,player.x,player.y-20,rr);gr.addColorStop(0,'rgba(255,255,255,'+(.25+.5*u)+')');gr.addColorStop(.4,SSS_MODELS[i].color+'66');gr.addColorStop(1,SSS_MODELS[i].color+'00');ctx.fillStyle=gr;ctx.fillRect(player.x-rr,player.y-20-rr,rr*2,rr*2);ctx.restore();}
  try{window.__wing132&&window.__wing132(ctx,i,player.x,player.y,S,f.bloom(),phase,time);}catch(e){}f.draw(ctx,W,H,time,on,{...opts(),cx:player.x,cy:player.y,S:S*(window.HOP4309===false?1:(window.Hop4309?Hop4309.scale(f,on):1)),rot:(bank||0)*.5,duration:.9,domain:uon?Math.min(1,(U.charge+U.active-U.t)/U.charge)*.8:0});
  return f.ready();}
 // ---------- kỹ năng E ----------
 function useUlt(){if(!activeRobot||!activeRobot.super||mode!=='play'||robotCooldown>0||U.t>0)return false;const i=indexFor(activeRobot);U.idx=i;U.t=U.charge+U.active;ultAcc=0;
  robotCooldown=ULT_CD/BALANCE.allyStats/Campaign36.cooldown(activeRobot.grade)*(typeof Meta407!=='undefined'?Meta407.sssCd():1);invuln=Math.max(invuln,U.charge+U.active+.3);bullets=bullets.filter(b=>Math.hypot(b.x-player.x,b.y-player.y)>140);
  try{Rank36.shock();}catch{}tone(520,.25,'triangle');setTimeout(()=>{try{tone(980,.4,'sawtooth',.05);}catch{}},600);toast('⚡ '+SSS_MODELS[i].ult);try{Audio393.vibrate([20,30,60]);}catch{}hud();return true;}
 // sảnh
 function lobby(g,w,h,t,tap,cx,cy,S,r){if(!ready())return false;const i=indexFor(r);if(i<0)return false;const f=lob[i]||(lob[i]=makeSSS(i));const on=tap||((t%9)>4.5);
  f.draw(g,w,h,t,on,{...opts(),hull:(window.__hop309atlas||(imL.complete&&imL.naturalWidth?imL:im)),cx,cy,S:S*.62,duration:1.1});return true;}
 function name(r){const i=indexFor(r);return i<0?null:SSS_MODELS[i].name;}
 function reset(){U.t=0;lastT=-1;mainPrev=-1;mainRate=0;}
 function install(){try{const orig=Fusion.getSelected;Fusion.getSelected=function(){const r=orig.apply(Fusion,arguments);if(r&&r.super){const i=indexFor(r);r.sss=i;r.name=SSS_MODELS[i].name.toUpperCase();r.skill={...(r.skill||{}),name:SSS_MODELS[i].ult,cd:ULT_CD,desc:'Tuyệt kỹ hợp thể: tụ lực rồi tung đòn toàn màn, xóa đạn địch, bất tử khi thi triển.'};}return r;};}catch{}
  try{const origSkill=useRobotSkill;useRobotSkill=function(){if(activeRobot&&activeRobot.super)return useUlt();return origSkill.apply(this,arguments);};const btn=document.getElementById('robot-skill');if(btn)btn.onclick=useRobotSkill;}catch{}}
 return {install,draw,lobby,name,indexFor,ready,reset,useUlt,state:()=>({ult:U.t,cur})};
})();
SSSGame.install();

'use strict';
// V40.1 · Vật phẩm rơi: hình ảnh mới (viên pha lê phát sáng, cột sáng, vòng quỹ đạo, nhấp nháy sắp hết hạn,
// đường hút nam châm, hiệu ứng nhặt) + cơ chế rơi theo nhu cầu, có trần và chống trùng lặp.
const Loot40=(()=>{
 const TAU=Math.PI*2;
 const SPEC={
  power:{c:'#ffc23a',c2:'#ff7a1a',label:'HỎA LỰC',icon:'W'},
  heal:{c:'#5dff9a',c2:'#14b85a',label:'MÁU',icon:'+'},
  shield:{c:'#5fd8ff',c2:'#1f7bff',label:'GIÁP',icon:'hex'},
  bomb:{c:'#ff5a8a',c2:'#b0123f',label:'BOM',icon:'B'},
  drone:{c:'#46ffe0',c2:'#0aa6a0',label:'DRONE',icon:'D'},
  magnet:{c:'#7c8cff',c2:'#3a3fd0',label:'NAM CHÂM',icon:'U'},
  weapon:{c:'#ffffff',c2:'#3fe6ff',label:'ĐỔI SÚNG',icon:'?'},
  super:{c:'#ffd84a',c2:'#b04cff',label:'SIÊU CẤP',icon:'S'}};
 const LIFE=12,STAR_LIFE=9,CAP=3;
 const st={meter:0,need:9,last:'',magnetT:0,superCharge:0,fx:[],texts:[]};
 const cache=new Map();
 function cv(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return [c,c.getContext('2d')];}
 const hexA=(h,a)=>{const n=parseInt(h.slice(1,7),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;};
 const light=()=>VisualFX.counts().quality==='light',quiet=()=>VisualFX.reduced();
 // ---------- sprite ----------
 function capsule(type,col,col2,icon){const key=type+col;if(cache.has(key))return cache.get(key);const S=96,[c,g]=cv(S,S);g.translate(48,48);
  const glow=g.createRadialGradient(0,0,6,0,0,46);glow.addColorStop(0,hexA(col,.55));glow.addColorStop(.5,hexA(col,.18));glow.addColorStop(1,hexA(col,0));g.fillStyle=glow;g.fillRect(-48,-48,96,96);
  const hex=(r)=>{g.beginPath();for(let k=0;k<6;k++){const a=k*TAU/6-Math.PI/2;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();};
  hex(25);g.fillStyle='#04070e';g.fill();
  hex(23);const lg=g.createLinearGradient(0,-23,0,23);lg.addColorStop(0,hexA('#ffffff',.95));lg.addColorStop(.25,col);lg.addColorStop(1,col2);g.fillStyle=lg;g.fill();
  // mặt cắt
  g.save();hex(23);g.clip();g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.moveTo(-23,-23);g.lineTo(0,0);g.lineTo(23,-23);g.closePath();g.fill();g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.moveTo(-23,23);g.lineTo(0,0);g.lineTo(23,23);g.closePath();g.fill();g.restore();
  hex(16);g.fillStyle='rgba(4,8,18,.82)';g.fill();g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=1;g.stroke();
  hex(23);g.strokeStyle='#ffffff';g.lineWidth=1.6;g.stroke();
  // biểu tượng
  g.fillStyle='#ffffff';g.strokeStyle='#ffffff';g.shadowColor=col;g.shadowBlur=8;g.lineCap='round';g.lineJoin='round';
  if(icon==='+'){g.fillRect(-3,-10,6,20);g.fillRect(-10,-3,20,6);}
  else if(icon==='hex'){g.lineWidth=2.6;g.beginPath();g.moveTo(0,-11);g.lineTo(9,-6);g.lineTo(8,5);g.lineTo(0,11);g.lineTo(-8,5);g.lineTo(-9,-6);g.closePath();g.stroke();g.beginPath();g.moveTo(0,-5);g.lineTo(0,6);g.stroke();}
  else if(icon==='U'){g.lineWidth=4;g.beginPath();g.arc(0,1,8,Math.PI,0,true);g.moveTo(-8,1);g.lineTo(-8,-8);g.moveTo(8,1);g.lineTo(8,-8);g.stroke();g.fillStyle=col;g.fillRect(-10,-11,4,4);g.fillRect(6,-11,4,4);}
  else{g.font='bold 19px Neo,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(icon,0,1);}
  g.shadowBlur=0;
  // ánh lóe
  g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.ellipse(-9,-14,5,2.4,-.5,0,TAU);g.fill();
  cache.set(key,c);return c;}
 setTimeout(()=>{try{starSpr(false);starSpr(true);}catch(e){}},0);/* V2.2.3: dựng sẵn sao rơi (trước đây tạo canvas lần đầu giữa trận) */function starSpr(big){const key='star'+big;if(cache.has(key))return cache.get(key);const [c,g]=cv(48,48);g.translate(24,24);const r=g.createRadialGradient(0,0,0,0,0,22);r.addColorStop(0,'rgba(255,240,180,.85)');r.addColorStop(1,'rgba(255,190,60,0)');g.fillStyle=r;g.fillRect(-24,-24,48,48);
  const R=big?12:9;g.beginPath();for(let k=0;k<8;k++){const a=k*TAU/8-Math.PI/2,rr=k%2?R*.42:R;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}g.closePath();g.fillStyle='#3a2200';g.fill();g.save();g.scale(.84,.84);g.beginPath();for(let k=0;k<8;k++){const a=k*TAU/8-Math.PI/2,rr=k%2?R*.42:R;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}g.closePath();const lg=g.createLinearGradient(0,-R,0,R);lg.addColorStop(0,'#fffbe0');lg.addColorStop(.5,big?'#ffd23f':'#ffe27a');lg.addColorStop(1,'#e08a12');g.fillStyle=lg;g.fill();g.restore();
  g.fillStyle='#fff';g.beginPath();g.arc(-2,-3,1.8,0,TAU);g.fill();cache.set(key,c);return c;}
 function pillar(col){const key='pil'+col;if(cache.has(key))return cache.get(key);const [c,g]=cv(24,128);const h=g.createLinearGradient(0,0,24,0);h.addColorStop(0,hexA(col,0));h.addColorStop(.5,hexA(col,.55));h.addColorStop(1,hexA(col,0));g.fillStyle=h;g.fillRect(0,0,24,128);g.globalCompositeOperation='destination-in';const v=g.createLinearGradient(0,0,0,128);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,1)');g.fillStyle=v;g.fillRect(0,0,24,128);cache.set(key,c);return c;}
 const specOf=d=>d.type==='weapon'?{...SPEC.weapon,c:(weapons[d.weapon||0]?.color)||'#ffffff',icon:(weapons[d.weapon||0]?.tag)||'?',label:(weapons[d.weapon||0]?.name)||SPEC.weapon.label}:SPEC[d.type];
 // ---------- cơ chế rơi ----------
 function weights(){let dr=0;try{dr=drone;}catch{}const bossOn=!!boss,w={
   power:power<5?3:(superTime>0?.25:1.1),
   heal:hp>=maxHp-.01?0:1+4*(1-hp/maxHp),
   shield:window.SHIELD78===false?(shield>=maxShield-.01?(bulletShieldTime>0?0:.5):1+2*(1-shield/maxShield)):((bulletShieldTime>0||(window.__shLock78||0)>performance.now())?0:.45),
   bomb:bombs>=5?0:bombs<2?1.3:.55,
   drone:0,
   magnet:0};
  if(bossOn){w.heal*=1.4;w.shield*=1.4;w.power*=.8;}
  if(w[st.last])w[st.last]*=.35;return w;}
 function pick(){const w=weights();let sum=0;for(const k in w)sum+=w[k];if(sum<=0)return null;let r=Math.random()*sum;for(const k in w){r-=w[k];if(r<=0)return k;}return 'power';}
 const supportOnScreen=()=>drops.filter(d=>!d.dead&&d.type!=='star'&&d.type!=='craft').length;
 function spawn(type,x,y,extra={}){if(type==='drone')type='shield';Safety31.push(drops,100,{x,y,type,t:0,vx:(Math.random()-.5)*40,ph:Math.random()*TAU,v40:true,...extra});}
 function onKill(e){
  // sao điểm: không còn rơi mỗi lần hạ địch
  if(window.DROP183===false){const n=e.elite?3:e.large?2:Math.random()<.4?1:0;for(let k=0;k<n;k++)spawn('star',e.x+(k-(n-1)/2)*12,e.y,{big:e.elite||e.large,vy:-60-Math.random()*40});}else{const big=!!(e.elite||e.large),val=e.elite?180:e.large?120:56;if(big||Math.random()<.25){let ns=0;for(const q of drops)if(!q.dead&&q.type==='star')ns++;if(ns>=10)score+=val;else spawn('star',e.x,e.y,{big,val,vy:-60-Math.random()*40});}}
  // thanh tích lũy tiếp tế
  if(e.elite&&superTime<=0&&!drops.some(d=>!d.dead&&d.type==='super')&&Math.random()<(window.Bal787?Bal787.superRate():.1))spawn('super',e.x,e.y,{vy:-80});
  st.meter+=e.elite?4:e.large?2:1;const scale=BALANCE.supportDrop/.3;
  if(st.meter>=st.need/scale&&supportOnScreen()<(window.Bal787?Bal787.buffCap():2)&&(!window.Bal787||Bal787.buffOk())){const t=pick();if(t){st.meter=0;st.need=window.Bal787?Bal787.buffNeed():13+Math.floor(Math.random()*7);try{Bal787.buffSpawned();}catch{}st.last=t;spawn(t,e.x,e.y,{vy:-90});}}}
 // ---------- nhặt ----------
 function fxPickup(d){try{if(typeof Pickup51!=='undefined')Pickup51.burst(d);}catch{}const s=d.type==='star'?{c:'#ffd23f',label:''}:specOf(d)||{c:'#fff',label:''};if(quiet())return;st.fx.push({x:d.x,y:d.y,t:0,c:s.c,big:d.type!=='star'});if(st.fx.length>24)st.fx.shift();}
 function text(x,y,s,c){if(window.TEXT125!==true)return;st.texts.push({x,y,s,c,t:0});if(st.texts.length>6)st.texts.shift();}
 function collect40(d){const s=specOf(d);
  if(d.type==='star'){fxPickup(d);d.type='none';score+=d.val||(d.big?60:35);collect(d);return;}
  if(d.type==='shield'){if(shield<maxShield-.01){shield=Math.min(maxShield,shield+1);toast('GIÁP +1');text(d.x,d.y,'GIÁP +1',s.c);}else{bulletShieldTime=Math.max(bulletShieldTime,5);toast('KHIÊN CHẮN ĐẠN · 5 GIÂY');text(d.x,d.y,'KHIÊN 5s',s.c);}fxPickup(d);d.type='none';collect(d);return;}
  if(d.type==='super'){fxPickup(d);d.type='none';collect(d);activateSuper();superTime=Math.max(superTime,8);text(d.x,d.y,'SIÊU CẤP!',s.c);toast('✦ SIÊU CẤP · BẠO TẨU '+Math.round(superTime)+' GIÂY');return;}
  if(d.type==='power'&&power>=5){st.superCharge+=.5;fxPickup(d);d.type='none';score+=150;if(st.superCharge>=1){st.superCharge=0;collect(d);activateSuper();text(d.x,d.y,'BẠO TẨU!',s.c);}else{toast('NẠP BẠO TẨU · 50%');text(d.x,d.y,'BẠO TẨU 50%',s.c);collect(d);}return;}
  if(d.type==='magnet'){st.magnetT=8;toast('NAM CHÂM · 8 GIÂY');text(d.x,d.y,'NAM CHÂM',s.c);fxPickup(d);d.type='none';collect(d);return;}
  if(s)text(d.x,d.y,d.type==='heal'?'MÁU +2':d.type==='power'?'HỎA LỰC +1':d.type==='bomb'?'BOM +1':s.label,s.c);fxPickup(d);collect(d);}
 // ---------- cập nhật ----------
 function update(dt){if(st.magnetT>0)st.magnetT-=dt;const od=Fighters28.overdrive?.()?true:false;
  for(const d of drops){if(d.dead)continue;d.t+=dt;
   if(d.type==='craft'){d.t=(d.t||0);if(typeof Drift51!=='undefined')Drift51.step(d,dt);else d.y+=72*dt;if(dist(d,player)<28)collect(d);continue;}
   const isStar=d.type==='star',life=isStar?STAR_LIFE:LIFE;if(d.t>life){d.dead=true;continue;}
   if(d.vy===undefined)d.vy=0;if(d.vx===undefined)d.vx=0;
   // rơi: bật nhẹ lên rồi trôi xuống chậm, lắc ngang, dừng lơ lửng gần đáy để kịp nhặt
   if(!isStar&&typeof Drift51!=='undefined')Drift51.step(d,dt);else{const fall=isStar?95:46;d.vy+=(fall-d.vy)*Math.min(1,dt*2.2);d.vx*=Math.exp(-dt*1.5);d.x+=(d.vx+(isStar?0:Math.sin(d.t*2+(d.ph||0))*18))*dt;d.y+=d.vy*dt;}
   if(!isStar&&typeof Drift51==='undefined'&&d.y>H*.88){d.y=H*.88;d.vy=0;}if(d.x<20){d.x=20;d.vx=Math.abs(d.vx);}if(d.x>W-20){d.x=W-20;d.vx=-Math.abs(d.vx);}
   const R=isStar?(od?72:60):(59.4+Math.min(19.8,(gear.magnet||0)*.132))*(window.__mag91||1),D=dist(d,player);
   if(D<R){d.pull=(d.pull||0)+dt;const a=Math.atan2(player.y-d.y,player.x-d.x),sp=(isStar?380:Evolution.magnet(gear.magnetTier).pull)*(1+d.pull*2.5)*(st.magnetT>0?1.6:1);d.x+=Math.cos(a)*sp*dt;d.y+=Math.sin(a)*sp*dt;}else d.pull=0;
   if(dist(d,player)<30)collect40(d);}
  for(const f of st.fx)f.t+=dt;st.fx=st.fx.filter(f=>f.t<.45);for(const t of st.texts)t.t+=dt;st.texts=st.texts.filter(t=>t.t<1.1);return true;}
 // ---------- vẽ ----------
 function draw(){const L=light(),Q=quiet(),T=time;ctx.save();
  for(const d of drops){if(d.dead)continue;
   if(d.type==='craft'){ctx.fillStyle='#0c304b';ctx.strokeStyle='#9defff';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(d.x-23,d.y-23,46,46,9);ctx.fill();ctx.stroke();craftSprite(d.craft,d.x,d.y,40);ctx.fillStyle='#bcfaff';ctx.textAlign='center';ctx.font='bold 9px sans-serif';ctx.fillText(crafts[d.craft].name,d.x,d.y+36);continue;}
   if(d.type==='star'){const life=STAR_LIFE,blink=d.t>life-2&&Math.floor(d.t*10)%2===0;if(blink)continue;const spr=starSpr(!!d.big),s=d.big?30:24,rot=Q?0:T*3+(d.ph||0);{const c183=typeof STAR183!=='undefined'&&STAR183(!!d.big,s);if(c183){let w9=c183.w;if(typeof L5309!=='undefined'&&L5309.dOn()){w9*=L5309.kp(d);L5309.glow(d.x,d.y,w9,'#fbbf24',d.ph);}ctx.globalCompositeOperation='source-over';ctx.drawImage(c183,d.x-w9/2,d.y-w9/2,w9,w9);continue;}}ctx.save();ctx.translate(d.x,d.y);ctx.rotate(rot);const pk51=typeof Pickup51!=='undefined'&&Pickup51.img('star');if(pk51){ctx.globalCompositeOperation='source-over';ctx.drawImage(pk51,-s*.68,-s*.68,s*1.36,s*1.36);}else{ctx.globalCompositeOperation='lighter';ctx.drawImage(spr,-s/2,-s/2,s,s);}ctx.restore();continue;}
   const s=specOf(d);if(!s)continue;const rem=LIFE-d.t,blink=rem<3&&Math.floor(d.t*(rem<1.2?14:7))%2===0,bob=Q?0:Math.sin(T*3+(d.ph||0))*3,pulse=Q?1:1+.06*Math.sin(T*6+(d.ph||0)),y=d.y+bob;
   ctx.globalAlpha=(blink?.35:1)*(d.fade51||1);
   if(!L&&!d.park51&&window.DROP183===false){ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.7;ctx.drawImage(pillar(s.c),d.x-9,y-96,18,96);ctx.globalAlpha=(blink?.35:1)*(d.fade51||1);}
   // vòng quỹ đạo
   ctx.globalCompositeOperation='lighter';ctx.strokeStyle=(d.park51&&typeof Pickup51!=='undefined'&&Pickup51.hasD(d))?'rgba(0,0,0,0)':s.c;ctx.lineWidth=1.4;const ra=Q?0:T*2.4+(d.ph||0),o183=window.DROP183===false;if(o183){ctx.beginPath();ctx.ellipse(d.x,y,23,8,0,ra,ra+Math.PI*1.25);ctx.stroke();}
   ctx.globalCompositeOperation='source-over';const sz=62*pulse;if(!(typeof Pickup51!=='undefined'&&Pickup51.draw(d,y,sz)))ctx.drawImage(capsule(d.type,s.c,s.c2,s.icon),d.x-sz/2,y-sz/2,sz,sz);
   if(o183){ctx.globalCompositeOperation='lighter';ctx.beginPath();ctx.ellipse(d.x,y,23,8,0,ra+Math.PI*1.25,ra+TAU);ctx.stroke();}
   if(!Q&&!L&&o183){const k=(T*1.3+(d.ph||0))%1;ctx.globalAlpha=(1-k)*.6*((blink?.35:1)*(d.fade51||1));ctx.beginPath();ctx.arc(d.x,y,14+k*18,0,TAU);ctx.stroke();}
   ctx.globalAlpha=((blink?.35:1)*(d.fade51||1))*.95;ctx.globalCompositeOperation='source-over';if(o183){ctx.font='bold 9px Neo,sans-serif';ctx.textAlign='center';ctx.fillStyle='#04070e';ctx.fillText(s.label,d.x+1,y+29);ctx.fillStyle=s.c;ctx.fillText(s.label,d.x,y+28);}ctx.globalAlpha=1;}
  // hiệu ứng nhặt
  try{if(typeof Pickup51!=='undefined')Pickup51.drawFx();}catch{}
  ctx.globalCompositeOperation='lighter';if(window.DROP183===false)for(const f of st.fx){const u=f.t/.45,r=(f.big?16:8)+u*(f.big?46:22);ctx.globalAlpha=1-u;ctx.strokeStyle=f.c;ctx.lineWidth=f.big?3:2;ctx.beginPath();ctx.arc(f.x,f.y,r,0,TAU);ctx.stroke();if(f.big){ctx.fillStyle='#ffffff';for(let k=0;k<6;k++){const a=k*TAU/6+u*2,rr=r*.9;ctx.fillRect(f.x+Math.cos(a)*rr-1.5,f.y+Math.sin(a)*rr-1.5,3,3);}}}
  ctx.globalCompositeOperation='source-over';for(const t of st.texts){const u=t.t/1.1;ctx.globalAlpha=1-u*u;ctx.font='bold 13px Neo,sans-serif';ctx.textAlign='center';ctx.fillStyle='#04070e';ctx.fillText(t.s,t.x+1,t.y-18-u*34+1);ctx.fillStyle=t.c;ctx.fillText(t.s,t.x,t.y-18-u*34);}
  // nam châm đang chạy
  if(st.magnetT>0&&!Q){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.25+.15*Math.sin(T*8);ctx.strokeStyle=SPEC.magnet.c;ctx.lineWidth=2;ctx.setLineDash([6,8]);ctx.lineDashOffset=-T*40;ctx.beginPath();ctx.arc(player.x,player.y,70,0,TAU);ctx.stroke();ctx.setLineDash([]);}
  ctx.restore();return true;}
 function reset(){st.meter=0;st.need=9;st.last='';st.magnetT=0;st.superCharge=0;st.fx.length=0;st.texts.length=0;}
 return {onKill,update,draw,reset,state:()=>({...st,fx:st.fx.length,texts:st.texts.length})};
})();

SSSLab.init();