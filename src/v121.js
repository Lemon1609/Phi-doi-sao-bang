// V121 · REVIEW121 (Gemini): bậc S / SS nổi bật — 13 kỹ năng S riêng, 13 Tuyệt Kỹ SS, đạn Thức Tỉnh, cánh sáng S/SS
//  Thay "Xung Hội Tụ" (Rank36.activate) bằng kỹ năng riêng theo tàu. Giữ nguyên nội tại cũ của S/SS (tên lửa 8 s, giáp SS 12 s).
//  Sát thương kỹ năng = hệ số Gemini × "ST cơ bản" (sát thương/giây của đạn chính đo trực tiếp 3 s gần nhất) × hệ số khớp mục tiêu
//  REVIEW121 §2 (S ≈ +5% tổng, SS ≈ +12–15% tổng): K_S=0,23 · K_SS=0,265 (bảng gốc của Gemini cho ra +54% nếu bấm liên tục).
//  Đánh boss: bộ phận chính nhận 100%, bộ phận phụ 15%. Không vẽ vòng tròn quanh tàu. Tắt: window.SK121=false
(()=>{
  if(window.SK121===false)return;
  const K_S=window.K121S||.23,K_SS=window.K121SS||.265,TAU=Math.PI*2,D2R=Math.PI/180;
  const SK=[
   {s:'Phượng Hoàng Liệu Nguyên',ss:'Chân Hỏa Niết Bàn',cd:14,d:[2.2,2.8],m:[7.5,10.5],col:'#ff6a2a',fx:'phoenix'},
   {s:'Bão Từ Cực Quang',ss:'Thiên Mạc Vĩnh Cực',cd:13,d:[2.0,2.6],m:[7.2,10.2],col:'#3dffa0',fx:'aurora'},
   {s:'Thập Tự Băng Phong',ss:'Tuyệt Độ Không Gian',cd:14,d:[1.8,2.4],m:[7.4,10.5],col:'#5fd2ff',fx:'xcross'},
   {s:'Thần Ma Phá Giáp Thương',ss:'Thí Thần Vạn Kiếp Thương',cd:15,d:[1.2,1.6],m:[8.2,11.5],col:'#e040fb',fx:'lance'},
   {s:'Lăng Kính Vạn Hoa',ss:'Thánh Quang Tinh Vân Trận',cd:13,d:[2.0,2.5],m:[7.2,10.2],col:'#ffd640',fx:'prism'},
   {s:'Mạng Lưới Lượng Tử',ss:'U Linh Lôi Ngục',cd:13,d:[1.8,2.4],m:[7.4,10.4],col:'#9c7cff',fx:'cage'},
   {s:'Bách Quỷ Trảm Kích',ss:'Ma Thần Nhất Đao Lưỡng Đoạn',cd:14,d:[1.5,2.0],m:[7.8,11.0],col:'#ff3b5c',fx:'slash'},
   {s:'Mưa Pháo Nhiệt Hạch',ss:'Phần Thiên Diệt Thế Pháo',cd:15,d:[2.2,2.6],m:[7.8,11.0],col:'#ff8a1e',fx:'shells'},
   {s:'Vạn Vũ Truy Hồn',ss:'Thiên Khung Thánh Vũ Phán Quyết',cd:13,d:[1.8,2.2],m:[7.5,10.6],col:'#5aa8ff',fx:'feathers'},
   {s:'Hạm Đội Tinh Hà Tập Kích',ss:'Tinh Hà Pháo Hạm Tổng Công Kích',cd:15,d:[2.8,3.2],m:[7.6,10.8],col:'#ff5aa8',fx:'fleet'},
   {s:'Hố Đen Vĩnh Hằng',ss:'Thôn Tinh Sụp Đổ Thứ Nguyên',cd:15,d:[3.0,3.2],m:[7.6,10.8],col:'#b45cff',fx:'hole'},
   {s:'Ngưng Đọng Thời Không',ss:'Vĩnh Hằng Luân Hồi Trận',cd:15,d:[2.5,3.0],m:[7.0,10.0],col:'#ffc23d',fx:'chrono'},
   {s:'Thiên Phạt Thứ Nguyên',ss:'Thần Phạt Hư Không · Thập Tự Phán Quyết',cd:15,d:[1.8,2.2],m:[8.0,11.2],col:'#c55cff',fx:'pillars'}];
  const now=()=>typeof time==='number'?time:performance.now()/1000;
  const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
  const calm=()=>{try{return VisualFX.reduced();}catch{return false;}};
  const gradeOf=()=>{try{return Rank36.grade()||'';}catch{return '';}};
  const shipId=()=>{try{return activeRobot?-1:selected;}catch{return -1;}};
  // ---------- ST cơ bản: sát thương/giây của đạn chính, đo 3 s gần nhất ----------
  const fired=[];function baseDPS(){const t=now();while(fired.length&&t-fired[0][0]>3)fired.shift();let s=0;for(const f of fired)s+=f[1];return Math.max(1,s/3);}
  // ---------- đạn Thức Tỉnh (SS) ----------
  const HEAVY={3:1,7:1,10:1};let salvo=0;
  function hookFire(){try{const A=Arsenal30;if(A.__s121)return;const o=A.fire;A.fire=function(fusion=false){const n0=shots.length;const r=o.apply(this,arguments);
      try{const made=shots.slice(n0).filter(s=>s&&s.art28!=null&&!s.gearKind&&!s.ally);const dmg=made.reduce((a,s)=>a+(s.damage||0),0);if(dmg>0)fired.push([now(),dmg]);
        const i=shipId();if(!fusion&&i>=0&&gradeOf()==='SS'&&made.length&&window.AWK121!==false){salvo++;const N=i===1?12:HEAVY[i]?5:8,M=i===1?2.0:HEAVY[i]?1.8:2.2;
          if(salvo>=N){salvo=0;const c=made[Math.floor(made.length/2)];c.damage*=M;c.scale30=(c.scale30||1)*1.35;c.awk121=1;c.color='#ffd700';if(HEAVY[i]&&c.p120&&c.p120.aoe)c.p120.aoe={...c.p120.aoe,R:c.p120.aoe.R*1.25};}}}catch{}
      return r;};A.__s121=1;}catch{}}
  // ---------- sát thương kỹ năng ----------
  function alive(){let a=[];try{a=enemies.filter(e=>!e.dead&&e.hp>0);}catch{}return a;}
  function bossMain(){try{if(!boss||boss.dead)return null;const w=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0);return w.sort((a,b)=>b.hp-a.hp)[0]||boss;}catch{return null;}}
  function bossOthers(m){try{if(!boss||boss.dead)return [];return [...(boss.parts||[]).filter(p=>!p.dead&&p.hp>0&&p!==m),...(m!==boss?[boss]:[])];}catch{return [];}}
  function dmg(e,d){if(!e||e.dead||!(d>0))return;try{if(e===boss||e.bossPart){damageBoss(d,'skill121',e);return;}const h0=e.hp;e.hp-=d;try{Feedback31.damage(e,h0-e.hp,'skill121');}catch{}try{Render27.hit(e);}catch{}if(e.hp<=0)kill(e);}catch{}}
  // 1 nhịp: boss chính 100% + phụ 15%, quái thường trong vùng nhận đủ
  function tick(d,inZone){const m=bossMain();if(m){const os=bossOthers(m),dm=d/(1+.15*os.length);/* tổng lên boss = d */dmg(m,dm);for(const o of os)dmg(o,dm*.15);}for(const e of alive())if(!inZone||inZone(e))dmg(e,d);}
  function clearBullets(test,max){let n=0,w=0;try{for(let k=0;k<bullets.length;k++){const b=bullets[k];if(n<max&&test(b)){n++;continue;}bullets[w++]=b;}bullets.length=w;}catch{}return n;}
  // ---------- trạng thái kỹ năng ----------
  let cur=null,cool=0,slowOn=null;
  function start(){const i=shipId(),g=gradeOf();if(i<0||!g||!SK[i])return false;if(mode!=='play'||cool>0||cur)return false;const S=SK[i],ss=g==='SS';
    const total=S.m[ss?1:0]*(ss?K_SS:K_S)*baseDPS(),dur=S.d[ss?1:0];
    cur={i,ss,t0:now(),dur,total,done:0,col:ss?'#ffd700':S.col,c2:S.col,x:player.x,y:player.y,seed:Math.random()*9,ticks:ss?14:10,tk:0,data:{}};cool=S.cd;
    try{toast((ss?'TUYỆT KỸ · ':'KỸ NĂNG · ')+(ss?S.ss:S.s).toUpperCase());}catch{}
    if(S.fx==='chrono')slow(ss?.85:.7,dur);
    if(S.fx==='phoenix'&&ss)cur.data.shield=now()+2.5;
    try{Audio393.sfx('explosion');}catch{}
    return true;}
  function slow(f,dur){if(slowOn)return;slowOn={f,end:now()+dur,seen:new WeakSet()};}
  function stepSlow(){if(!slowOn)return;const t=now();try{for(const b of bullets){if(slowOn.seen.has(b))continue;slowOn.seen.add(b);b.vx*=1-slowOn.f;b.vy*=1-slowOn.f;b.__sl121=1-slowOn.f;}}catch{}
    if(t>=slowOn.end){try{for(const b of bullets)if(b.__sl121){b.vx/=b.__sl121;b.vy/=b.__sl121;delete b.__sl121;}}catch{}slowOn=null;}}
  function skUpdate(){const t=now();if(cool>0)cool=Math.max(0,cool-(t-(skUpdate.l||t)));skUpdate.l=t;stepSlow();if(!cur)return;if(mode!=='play'){return;}
    const S=SK[cur.i],u=(t-cur.t0)/cur.dur;if(u>=1){finish();return;}
    // nhịp sát thương đều theo thời lượng
    const want=Math.min(cur.ticks,Math.floor(u*cur.ticks)+1);while(cur.tk<want){cur.tk++;const d=cur.total/cur.ticks;tick(d,zoneFor(S.fx,u));}
    // dọn đạn địch theo kỹ năng (REVIEW121)
    if(S.fx==='phoenix'&&!cur.data.cb){cur.data.cb=clearBullets(b=>Math.abs(b.y-(player.y-260))<170,cur.ss?16:12);}
    if(S.fx==='slash')clearBullets(b=>b.y>H*(1-u)-60&&b.y<H*(1-u)+60,6);
    if(S.fx==='hole'){const hx=W/2,hy=H*.35,R=cur.ss?175:140;cur.data.ab=(cur.data.ab||0)+clearBullets(b=>Math.hypot(b.x-hx,b.y-hy)<R,Math.max(0,(cur.ss?28:18)-(cur.data.ab||0)));
      for(const e of alive()){if(e===boss||e.bossPart)continue;const d=Math.hypot(e.x-hx,e.y-hy);if(d<R*1.6&&d>3){e.x+=(hx-e.x)/d*3;e.y+=(hy-e.y)/d*3;}}}
    if(S.fx==='cage'&&cur.ss&&!cur.data.para){cur.data.para=1;try{for(const e of alive())e.frozen=Math.max(e.frozen||0,1);}catch{}}
    if(S.fx==='xcross'&&!cur.data.fz){cur.data.fz=1;try{for(const e of alive())if(!(e===boss||e.bossPart))e.frozen=Math.max(e.frozen||0,2);}catch{}}}
  function zoneFor(fx,u){const px=player.x;switch(fx){
      case 'lance':return e=>Math.abs(e.x-px)<(cur.ss?70:34)&&e.y<player.y;
      case 'aurora':return e=>e.y<player.y;
      case 'slash':return e=>e.y<player.y;
      case 'hole':return e=>Math.hypot(e.x-W/2,e.y-H*.35)<(cur.ss?175:140);
      default:return e=>e.y<player.y+40;}}
  function finish(){cur=null;}
  // ---------- vẽ kỹ năng (tạm bằng code; GPT sẽ vẽ ult_*.png) ----------
  const ART=()=>typeof SK121_ART!=='undefined'?SK121_ART:null;const IMG={};
  function art(k){const A=ART();if(!A||!A[k])return null;let im=IMG[k];if(!im){im=new Image();im.src=A[k];IMG[k]=im;}return im.complete&&im.naturalWidth?im:null;}
  function rgba(h,a){const n=parseInt(h.slice(1,7),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;}
  function drawSkill(){if(!cur)return;const t=now(),u=Math.min(1,(t-cur.t0)/cur.dur),S=SK[cur.i],c=cur.col,c2=cur.c2,sc=cur.ss?1.25:1,fade=u<.1?u/.1:u>.85?(1-u)/.15:1,few=lite();
    ctx.save();ctx.globalCompositeOperation='lighter';const A=art('ult_'+String(cur.i+1).padStart(2,'0'));
    switch(S.fx){
     case 'phoenix':{const x=W/2+Math.sin(u*TAU)*W*.28,y=player.y-180-Math.sin(u*TAU*2)*90-u*120,s=210*sc;ctx.globalAlpha=fade;if(A)ctx.drawImage(A,x-s/2,y-s/2,s,s);else{ctx.fillStyle=rgba(c2,.55);for(const sd of [-1,1]){ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+sd*s*.6,y-s*.5,x+sd*s*.55,y+s*.05);ctx.quadraticCurveTo(x+sd*s*.3,y-s*.05,x,y+s*.2);ctx.fill();}ctx.fillStyle=rgba(c,.9);ctx.beginPath();ctx.ellipse(x,y,10*sc,26*sc,0,0,TAU);ctx.fill();}break;}
     case 'aurora':{const n=cur.ss?5:3;if(A){for(let k=0;k<n;k++){const ph=k*1.3+t*2.2,x=W/2+Math.sin(ph)*W*.3*(1-u*(cur.ss?.9:0))+(k-(n-1)/2)*34,w=92*sc;ctx.globalAlpha=fade*.85;ctx.drawImage(A,x-w/2,-20,w,player.y+20);}break;}for(let k=0;k<n;k++){ctx.globalAlpha=fade*.6;const ph=k*1.3+t*3;ctx.strokeStyle=k%2?c:c2;ctx.lineWidth=(cur.ss?34:26);ctx.beginPath();for(let y=0;y<=player.y;y+=24){const x=W/2+Math.sin(y*.012+ph)*W*.32*(1-u*(cur.ss?.9:0))+(k-(n-1)/2)*30;y?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}if(A){ctx.globalAlpha=fade*.8;ctx.drawImage(A,W/2-64*sc,0,128*sc,player.y);}break;}
     case 'xcross':{const cx=(boss&&!boss.dead)?boss.x:W/2,cy=(boss&&!boss.dead)?boss.y+20:H*.3,L=260*sc*Math.min(1,u*3);ctx.globalAlpha=fade;if(A)ctx.drawImage(A,cx-L,cy-L,L*2,L*2);else{ctx.strokeStyle=c2;ctx.lineWidth=24*sc;for(const r of (cur.ss?[45,-45,30,-30]:[45,-45])){ctx.save();ctx.translate(cx,cy);ctx.rotate(r*D2R);ctx.beginPath();ctx.moveTo(-L,0);ctx.lineTo(L,0);ctx.stroke();ctx.restore();}ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(cx,cy-18);ctx.lineTo(cx+8,cy);ctx.lineTo(cx,cy+18);ctx.lineTo(cx-8,cy);ctx.fill();}break;}
     case 'lance':{const w=(cur.ss?70:34)*Math.min(1,u*4);ctx.globalAlpha=fade;for(const dx of (cur.ss?[0,-60,60]:[0])){const ww=dx?w*.5:w;if(A){const aw=Math.max(ww*2.4,60*sc*(dx?.6:1));ctx.drawImage(A,player.x+dx-aw/2,0,aw,player.y-20);}else{const g=ctx.createLinearGradient(player.x+dx-ww,0,player.x+dx+ww,0);g.addColorStop(0,rgba(c2,0));g.addColorStop(.5,'#ffffff');g.addColorStop(1,rgba(c2,0));ctx.fillStyle=g;ctx.fillRect(player.x+dx-ww,0,ww*2,player.y-20);}}break;}
     case 'prism':{const cx=(boss&&!boss.dead)?boss.x:W/2,cy=player.y-200;const pts=cur.ss?[[cx-90,cy-40],[cx+90,cy-40],[cx,cy+70]]:[[player.x,player.y-140]];for(const [x,y] of pts){ctx.globalAlpha=fade;if(A)ctx.drawImage(A,x-40*sc,y-40*sc,80*sc,80*sc);else{ctx.fillStyle=rgba(c2,.85);ctx.beginPath();ctx.moveTo(x,y-34);ctx.lineTo(x+22,y);ctx.lineTo(x,y+34);ctx.lineTo(x-22,y);ctx.fill();}
        const n=few?6:12;ctx.strokeStyle=rgba(c,.7);ctx.lineWidth=2;for(let k=0;k<n;k++){const a=k/n*TAU+t*2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a)*300*u,y+Math.sin(a)*300*u);ctx.stroke();}}break;}
     case 'cage':{const cx=(boss&&!boss.dead)?boss.x:W/2,cy=(boss&&!boss.dead)?boss.y:H*.3,n=cur.ss?6:4,R=cur.ss?150:120;const P=[];for(let k=0;k<n;k++){const a=k/n*TAU+t*.8;P.push([cx+Math.cos(a)*R,cy+Math.sin(a)*R*.6]);}
        ctx.globalAlpha=fade;ctx.strokeStyle=c2;ctx.lineWidth=2.2;for(let k=0;k<n;k++){const [x,y]=P[k],[x2,y2]=P[(k+1)%n];ctx.beginPath();ctx.moveTo(x,y);for(let s=1;s<=6;s++){const v=s/6;ctx.lineTo(x+(x2-x)*v+(Math.random()-.5)*16,y+(y2-y)*v+(Math.random()-.5)*16);}ctx.stroke();if(Math.random()<.5){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(cx+(Math.random()-.5)*30,cy+(Math.random()-.5)*30);ctx.stroke();}}
        for(const [x,y] of P){if(A)ctx.drawImage(A,x-22,y-22,44,44);else{ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(x,y-10);ctx.lineTo(x+6,y);ctx.lineTo(x,y+10);ctx.lineTo(x-6,y);ctx.fill();}}break;}
     case 'slash':{const n=cur.ss?6:4,k=Math.min(n-1,Math.floor(u*n)),v=(u*n)%1,y=player.y-v*(player.y+80);ctx.globalAlpha=fade*(1-v*.3);const w=280*sc;if(A)ctx.drawImage(A,W/2-w/2,y-w*.33,w,w*.66);else{ctx.strokeStyle=c2;ctx.lineWidth=14;ctx.beginPath();ctx.ellipse(W/2+(k%2?40:-40),y+60,w/2,70,0,Math.PI*1.1,Math.PI*1.9);ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.stroke();}
        if(cur.ss&&u>.75){ctx.globalAlpha=(u-.75)*4*fade;ctx.fillStyle='#ffe9a0';ctx.fillRect(W/2-6,0,12,player.y);}break;}
     case 'shells':{const n=cur.ss?9:6;for(let k=0;k<n;k++){const tk=k/n,v=(u-tk)/.18;if(v<0||v>1.6)continue;const m=bossMain(),tx=(m?m.x:W/2)+((k*53)%140-70),ty=(m?m.y:H*.3)+((k*37)%60-30);if(v<1){ctx.globalAlpha=1;ctx.fillStyle=c2;ctx.beginPath();ctx.ellipse(tx,ty-200*(1-v),6,14,0,0,TAU);ctx.fill();}else{const R=(cur.ss&&k===n-1?160:110)*(.5+.5*(v-1)/.6);ctx.globalAlpha=(1.6-v)/.6;if(A)ctx.drawImage(A,tx-R,ty-R,R*2,R*2);else{ctx.fillStyle=rgba(c2,.6);ctx.beginPath();for(let q=0;q<16;q++){const a=q/16*TAU,rr=q%2?R*.45:R;q?ctx.lineTo(tx+Math.cos(a)*rr,ty+Math.sin(a)*rr):ctx.moveTo(tx+rr,ty);}ctx.fill();}}}break;}
     case 'feathers':{const n=few?(cur.ss?12:8):(cur.ss?24:16);const m=bossMain();const tx=m?m.x:W/2,ty=m?m.y:H*.25;for(let k=0;k<n;k++){const sd=k%2?1:-1,ph=k/n,v=Math.min(1,u*1.4-ph*.4);if(v<=0)continue;const sx=player.x+sd*30,cx=player.x+sd*(160+40*ph),cy=player.y-120;const x=(1-v)*(1-v)*sx+2*(1-v)*v*cx+v*v*(tx+sd*20*ph),y=(1-v)*(1-v)*player.y+2*(1-v)*v*cy+v*v*ty;
        ctx.globalAlpha=fade*(v<1?1:.3);ctx.fillStyle=k%3?c2:c;ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(ty-y,tx-x)+Math.PI/2);ctx.beginPath();ctx.ellipse(0,0,3,11,0,0,TAU);ctx.fill();ctx.restore();}
        if(cur.ss&&u>.5){ctx.globalAlpha=fade;for(const sd of [-1,1]){const x=tx+sd*60*(1-u),y=ty+80*(1-u);if(A)ctx.drawImage(A,x-20,y-60,40,120);else{ctx.fillStyle='#ffe9a0';ctx.fillRect(x-4,y-50,8,100);}}}break;}
     case 'fleet':{const n=cur.ss?4:2;let hull=null;try{hull=Evo53.hull(9);}catch{}for(let k=0;k<n;k++){const sd=k%2?1:-1,row=Math.floor(k/2),x=player.x+sd*(70+row*40),y=player.y+10+row*26;ctx.globalAlpha=.5*fade;if(hull){const W0=hull.naturalWidth||hull.width,cw=W0/5,ch=(hull.naturalHeight||hull.height)/4;ctx.drawImage(hull,9%5*cw,0,cw,ch,x-22,y-22,44,44);}
        if(Math.floor(t*12+k)%2===0){ctx.globalAlpha=.8*fade;ctx.fillStyle=c2;ctx.fillRect(x-1.5,y-60-((t*900)%200),3,22);}}
        if(cur.ss){ctx.globalAlpha=.25*fade;if(A)ctx.drawImage(A,player.x-110,player.y-60,220,220);ctx.globalAlpha=.7*fade;ctx.fillStyle='#ffe9a0';const m=bossMain();if(m&&u>.4)ctx.fillRect(player.x-5,m.y,10,player.y-m.y-30);}break;}
     case 'hole':{const hx=W/2,hy=H*.35,R=(cur.ss?175:140)*Math.min(1,u*4)*(cur.ss&&u>.85?1+(u-.85)*6:1);ctx.globalAlpha=fade;if(A){ctx.save();ctx.translate(hx,hy);ctx.rotate(t*2);ctx.drawImage(A,-R,-R,R*2,R*2);ctx.restore();}else{ctx.globalCompositeOperation='source-over';ctx.fillStyle='rgba(8,0,18,.75)';ctx.beginPath();ctx.ellipse(hx,hy,R*.28,R*.28,0,0,TAU);ctx.fill();ctx.globalCompositeOperation='lighter';
        for(let k=0;k<3;k++){ctx.save();ctx.translate(hx,hy);ctx.rotate(t*3+k*2.09);ctx.strokeStyle=k?c2:c;ctx.lineWidth=4;ctx.beginPath();for(let a=0;a<3.4;a+=.2){const rr=R*(1-a/3.4)+R*.25;a?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(rr,0);}ctx.stroke();ctx.restore();}}break;}
     case 'chrono':{ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.12*fade;ctx.fillStyle=cur.ss?'#ffd27a':'#7fb8ff';ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='lighter';const cx=W/2,cy=H*.4,R=150*sc;ctx.globalAlpha=fade*.8;if(A)ctx.drawImage(A,cx-R,cy-R,R*2,R*2);
        ctx.strokeStyle='#ffc23d';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(t*2.2-1.57)*R*.9,cy+Math.sin(t*2.2-1.57)*R*.9);ctx.stroke();ctx.strokeStyle='#3de6ff';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(t*.6)*R*.6,cy+Math.sin(t*.6)*R*.6);ctx.stroke();break;}
     case 'pillars':{const n=cur.ss?7:5,T=[bossMain(),...bossOthers(bossMain()),...alive()].filter(Boolean);for(let k=0;k<n;k++){const v=(u*n*1.2-k);if(v<0||v>1)continue;const tg=T[k%Math.max(1,T.length)]||{x:W/2,y:H*.3},w=52*(1-v*.5);ctx.globalAlpha=(1-v);if(A){ctx.drawImage(A,tg.x-w*1.4,0,w*2.8,tg.y+40);}else{const g=ctx.createLinearGradient(tg.x-w/2,0,tg.x+w/2,0);g.addColorStop(0,rgba(c2,0));g.addColorStop(.5,'#fff2c0');g.addColorStop(1,rgba(c2,0));ctx.fillStyle=g;ctx.fillRect(tg.x-w/2,0,w,tg.y+10);}}
        if(cur.ss&&u>.8){const m=bossMain()||{x:W/2,y:H*.3},w=110*(1-(u-.8)*2);ctx.globalAlpha=(1-u)*5;ctx.fillStyle='#ffe9a0';ctx.fillRect(m.x-w/2,0,w,m.y+20);}break;}}
    ctx.restore();}
  // ---------- cánh sáng S / SS sau lưng tàu (thay quầng tròn cũ của Rank36) ----------
  const WC=new Map();
  function wingCanvas(ss){const k=ss?'ss':'s';if(WC.has(k))return WC.get(k);const c=document.createElement('canvas');c.width=384;c.height=256;const g=c.getContext('2d');g.translate(192,150);g.globalCompositeOperation='lighter';
    const L=ss?[[1,'#fff59d','#ffb300'],[.82,'#ffe082','#ff8f00'],[.64,'#fff8e1','#ffca28']]:[[1,'#e1f5fe','#0288d1'],[.78,'#b3e5fc','#4fc3f7']];
    for(const [s,a,b] of L)for(const sd of [-1,1])for(let j=0;j<(ss?5:4);j++){const ang=(-.2-j*.22)*sd,len=(150-j*18)*s;g.save();g.rotate(ang+(sd<0?Math.PI:0));const gr=g.createLinearGradient(20,0,len,0);gr.addColorStop(0,a+'00');gr.addColorStop(.35,a+'aa');gr.addColorStop(1,b+'00');g.fillStyle=gr;g.beginPath();g.moveTo(20,-4);g.quadraticCurveTo(len*.6,-14,len,0);g.quadraticCurveTo(len*.6,10,20,5);g.closePath();g.fill();g.restore();}
    WC.set(k,c);return c;}
  function drawWings(){if(window.WING125!==true)return;/* V125: bỏ cánh S/SS theo chủ dự án */const g=gradeOf();if(!g||mode!=='play'&&mode!=='pause')return;let x,y;try{x=player.x;y=player.y;}catch{return;}const ss=g==='SS',im=art(ss?'canh_SS':'canh_S');const t=now(),br=.92+.08*Math.sin(t*TAU/1.5);
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=(ss?.85:.72)*(lite()?.85:1);if(im&&window.WING122!==false&&window.__wings122){ctx.globalAlpha=ss?.85:.75;window.__wings122(ctx,im,x,y,ss?.46:.42,ss,t);}else if(im){const k=(ss?.44:.4)*br;ctx.drawImage(im,x-384*k,y-300*k+6,768*k,512*k);}else{const c=wingCanvas(ss),w=(ss?230:200)*br,h=w*2/3;ctx.drawImage(c,x-w/2,y-h*.6,w,h);}ctx.restore();}
  function hookRank(){try{if(Rank36.__k121)return;const R=Rank36;
      R.activate=function(){return start();};
      R.draw=function(){if(window.WING121===false)return;try{drawWings();}catch{}};
      const oh=R.hud;R.hud=function(){const r=oh.apply(this,arguments);try{if(activeRobot)return r;const g=gradeOf(),i=shipId();if(!g||!SK[i])return r;const ss=g==='SS';const nm=document.getElementById('robot-skill-name');if(nm)nm.textContent=(ss?'TUYỆT KỸ · ':'KỸ NĂNG S · ')+(ss?SK[i].ss:SK[i].s);
        const b=document.getElementById('robot-skill');if(b){b.disabled=mode!=='play'||cool>0||!!cur;b.innerHTML='✦<small>'+(cool>0?Math.ceil(cool)+'s':ss?'TUYỆT KỸ':'KỸ NĂNG')+'</small>';}}catch{}return r;};
      const os=R.state;R.state=function(){const s=os.apply(this,arguments);return {...s,cool:cool};};
      R.__k121=1;}catch(e){console.warn('V121 rank',e);}}
  // khiên lửa SS tàu 1: chặn 1 đòn
  function hookUpd(){try{const ou=update;if(ou.__k121)return;const nu=function(){const r=ou.apply(this,arguments);try{if(typeof mode!=='undefined'&&mode==='play')skUpdate();}catch{}return r;};nu.__k121=1;window.update=nu;try{update=nu;}catch{}}catch{}}
  function hookDraw(){try{const vd=VisualFX.draw;if(vd.__k121)return;const nd=function(){const r=vd.apply(this,arguments);try{if(mode==='play'||mode==='pause')drawSkill();}catch{}return r;};nd.__k121=1;VisualFX.draw=nd;}catch{}}
  // làm mới khi vào trận
  function hookReset(){try{const o=Rank36.reset;Rank36.reset=function(){const r=o.apply(this,arguments);cur=null;cool=0;salvo=0;fired.length=0;if(slowOn){slowOn.end=0;stepSlow();}return r;};}catch{}}
  // V122 · chủ dự án: không vòng tròn quanh quái / quanh tàu → tắt vòng loang (ring, ringA) toàn trận; bật lại: window.RING122=true
  function noRings(){try{const oa=VisualFX.ringA;if(!oa.__r122){const f=function(){if(window.RING122===true)return oa.apply(this,arguments);};f.__r122=1;VisualFX.ringA=f;}}catch{}
    try{const og=ring;if(!og.__r122){const f=function(){if(window.RING122===true)return og.apply(this,arguments);};f.__r122=1;window.ring=f;try{ring=f;}catch{}}}catch{}}
  setTimeout(()=>{hookFire();hookRank();hookReset();hookUpd();hookDraw();noRings();},0);
  window.V121={SK,state:()=>({cur:cur?{i:cur.i,ss:cur.ss,total:Math.round(cur.total),tk:cur.tk}:null,cool,base:Math.round(baseDPS()),grade:gradeOf()}),start};
})();
