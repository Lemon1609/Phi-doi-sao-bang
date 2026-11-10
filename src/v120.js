// V120 · REVIEW120 (Gemini): 13 đường đạn độc bản + cơ chế riêng + hiệu ứng trúng riêng
//  Cách làm: bọc Arsenal30.fire → bỏ loạt gốc, sinh loạt mới theo bảng; TỔNG sát thương mỗi loạt giữ bằng loạt gốc
//  (chia lại theo số viên mới, nhịp bắn mới và phần thưởng cơ chế dự kiến trên boss) → DPS lên boss giữ ±5% (Claude đo bằng bot).
//  Cơ chế khi trúng bám Arsenal30.hit(s,e). Không vẽ vòng tròn quanh quái (quyết định chủ dự án).
//  Tắt toàn bộ: window.PAT120=false · tắt 1 tàu: window.PAT120_OFF=[chỉ số]
(()=>{
  if(window.PAT120===false)return;
  const D2R=Math.PI/180;
  // cấp vũ khí game p() 0..4 → cấp thiết kế 1..4
  const LV=[1,2,2,3,4];
  const p120i=i=>i===1&&window.THIN122!==false;
  const pr=(dx,deg,o)=>Object.assign({dx,deg,w:1},o||{});
  const pairs=(dxs,degs,o)=>{const a=[];dxs.forEach((d,i)=>{a.push(pr(-d,-(degs[i]||0),Object.assign({side:-1},o)));a.push(pr(d,degs[i]||0,Object.assign({side:1},o)));});return a;};
  const fan=(degs,o)=>degs.map(d=>pr(0,d,o));
  // ---------- bảng 13 tàu (chỉ số game 0..12) ----------
  const C={
   0:{name:'Phượng Hoàng',rate:1,sp:720,bonus:0,col:'#ff7a2e',hit:'phoenix',
      b:L=>{const c=[pr(0,0,{w:L===4?1.4:1,big:L===4})];const W={1:[[18],[6]],2:[[16,30],[6,10]],3:[[14,26,38],[5,9,13]],4:[[15,28,42],[5,10,15]]}[L];return c.concat(pairs(W[0],W[1],{k:'curve',ax:L===4?70:65}));},
      on:{burn:{ratio:.2,sec:1.5,R:45}}},
   1:{name:'Cực Quang',rate:1,ray:true,bonus:0,col:'#3dffa0',hit:'aurora',
      b:L=>({1:[[-14,3],[14,-3]],2:[[-20,6],[0,0],[20,-6]],3:[[-28,10],[-12,-5],[12,5],[28,-10]],4:[[-32,14],[-16,-7],[0,0],[16,7],[32,-14]]}[L]).map(([dx,a])=>pr(dx,0,{sweep:a})),
      hz:{1:.85,2:1.1,3:1.25,4:1.4}},
   2:{name:'X-Dực',rate:1,sp:780,bonus:0,col:'#5fd2ff',hit:'frost',pierce:true,
      b:L=>{const o={1:26,2:28,3:28,4:30}[L],A={1:[8],2:[7,11],3:[6,9,12],4:[5,8,11,14]}[L];const a=[];for(const g of A){a.push(pr(-o,g));a.push(pr(o,-g));}return a;}},
   3:{name:'Thần Ma',rate:.5,sp:920,bonus:0,col:'#e040fb',hit:'impale',pierce:true,big:1.55,
      b:L=>({1:[[0,0]],2:[[-16,0],[16,0]],3:[[-24,40],[0,0],[24,40]],4:[[-28,40],[-10,0],[10,0],[28,40]]}[L]).map(([dx,d])=>pr(dx,0,{delay:d/1000}))},
   4:{name:'Thự Quang',rate:.92,sp:740,bonus:.15,col:'#ffd640',hit:'prism',
      b:L=>fan({1:[-7,0,7],2:[-11,-4,4,11],3:[-13,-6,0,6,13],4:[-15,-10,-5,0,5,10,15]}[L],{split:{1:.25,2:.28,3:.3,4:.35}[L]})},
   5:{name:'U Linh',rate:1,sp:860,bonus:.35,col:'#9c7cff',hit:'arc',toBullet:true,
      b:L=>({1:[-20,20],2:[-22,22],3:[-26,0,26],4:[-32,-14,14,32]}[L]).map((dx,i)=>pr(dx,0,{k:'zig',ph:i%2,chain:{1:[.4],2:[.5,.3],3:[.5,.35],4:[.5,.35,.2]}[L]}))},
   6:{name:'Đao Phong',rate:1,sp:680,bonus:.15,col:'#ff3b5c',hit:'slash',pierce:true,
      b:L=>{const g={1:[0.75,1.25],2:[.75,1.3],3:[.72,1.4],4:[.7,1.45]}[L],o={k:'grow',s0:g[0],s1:g[1],bleed:.15};
        if(L===1)return [pr(0,0,o)];if(L===2)return [pr(-18,0,o),pr(18,0,o)];
        if(L===3)return [pr(0,0,o),pr(-24,0,Object.assign({delay:.075},o)),pr(24,0,Object.assign({delay:.075},o))];
        return [pr(-8,-4,o),pr(8,4,o),pr(-14,-9,Object.assign({delay:.075},o)),pr(14,9,Object.assign({delay:.075},o))];}},
   7:{name:'Nhiệt Áp',rate:.68,sp:420,bonus:.28,col:'#ff8a1e',hit:'blast',big:1.3,
      b:L=>fan({1:[-3,3],2:[-6,0,6],3:[-9,-3,3,9],4:[-10,-5,0,5,10]}[L],{k:'accel',v1:760,aoe:{R:{1:55,2:65,3:75,4:85}[L],ratio:{1:.45,2:.5,3:.55,4:.6}[L]}})},
   8:{name:'Song Vũ',rate:1,sp:760,bonus:0,col:'#5aa8ff',hit:'feather',
      b:L=>{const n={1:1,2:2,3:3,4:4}[L],tr={1:45,2:60,3:75,4:95}[L],a=[];for(const sd of [-1,1])for(let k=0;k<n;k++)a.push(pr(sd*(24+k*7),sd*(12-k*2),{k:'home',turn:tr,hd:.12}));return a;}},
   9:{name:'Quân Đoàn',rate:1,sp:800,bonus:0,col:'#ff5aa8',hit:'cross',drones:true,
      b:L=>{const m={1:[-8,8],2:[-12,0,12],3:[-12,0,12],4:[-18,-6,6,18]}[L].map(dx=>pr(dx,0));const nd={1:1,2:1,3:2,4:2}[L],a=[];
        for(const sd of [-1,1])for(let k=0;k<nd;k++)a.push(pr(sd*(42+(k?8:0)),-sd*(5+k*3),{delay:.08,drone:sd}));return m.concat(a);}},
   10:{name:'Thôn Tinh',rate:.75,sp:580,bonus:0,col:'#b45cff',hit:'vortex',
      b:L=>{const orb={k:'orb',vortex:{R:{1:60,2:70,3:80,4:90}[L],sec:{1:.6,2:.7,3:.8,4:.8}[L]}};
        const o=L===1?[pr(0,0,orb)]:L===2?[pr(-14,0,orb),pr(14,0,orb)]:[pr(0,0,orb),pr(0,-(L===4?7:6),orb),pr(0,(L===4?7:6),orb)];
        const sideDeg=L>=3?(L===4?13:12):0,sideDx=L===1?18:L===2?28:0;return o.concat([pr(-sideDx,-sideDeg,{w:.6,pierceOne:true}),pr(sideDx,sideDeg,{w:.6,pierceOne:true})]);}},
   11:{name:'Thời Không',rate:1,sp:760,bonus:0,col:'#ffc23d',hit:'chrono',
      b:L=>{const s=(A,ph,c)=>pr(0,0,{k:'sine',A,ph,c});
        if(L===1)return [s(22,0,'#ffc23d'),s(22,Math.PI,'#3de6ff')];
        if(L===2)return [s(26,0,'#ffc23d'),s(26,Math.PI,'#3de6ff'),pr(0,0)];
        if(L===3)return [s(18,0,'#ffc23d'),s(18,Math.PI,'#3de6ff'),s(34,Math.PI/2,'#ffc23d'),s(34,-Math.PI/2,'#3de6ff')];
        return [s(18,0,'#ffc23d'),s(18,Math.PI,'#3de6ff'),s(36,Math.PI/2,'#ffc23d'),s(36,-Math.PI/2,'#3de6ff'),pr(-4,0),pr(4,0)];}},
   12:{name:'Hư Không',rate:1,sp:840,bonus:.14,col:'#c55cff',hit:'pillar',
      b:L=>fan({1:[-3,3],2:[-5,0,5],3:[-8,-3,3,8],4:[-9,-4.5,0,4.5,9]}[L]),pil:{1:[7,1.5],2:[6,2],3:[5,2.6],4:[5,3.5]}}
  };
  // V211 · D2 (GPT): màu tia trúng đích theo màu lõi/động cơ từng tàu; bỏ đỏ #ff3b5c (tàu 7) và hồng #ff5aa8 (tàu 10) dễ lẫn đạn địch. Tắt: window.D2_211=false
  const D2P={0:'#FF9A3D',1:'#3DE0A0',/* V213: tàu 1 cam lửa, tàu 2 ngọc lục theo tranh mới */2:'#67D7FF',3:'#9BE83A',4:'#7FD6FF',5:'#B9A6FF',/* V213: tàu 4 lục acid, tàu 5 lam trời, tàu 6 tím oải hương theo tranh mới */6:'#8568E8',7:'#B0A0FF',8:'#76AAFF',9:'#9678ED',10:'#7865DB',11:'#45C4DF',12:'#C2B1FF'};
  for(const k in C){const o=C[k],c0=o.col;Object.defineProperty(o,'col',{get:()=>(window.D2_211!==false&&D2P[k])?D2P[k]:c0,configurable:true});}
  // hiệu chỉnh sau đo bot (DPS boss ±5%)
  const FUDGE=window.FUDGE120||{"0": 1.513, "1": 0.943, "2": 1.326, "3": 0.844, "4": 0.782, "5": 0.859, "6": 0.818, "7": 1.12, "8": 0.927, "9": 0.96, "10": 1.937, "11": 1.205, "12": 0.77};/* đo đứng yên dưới boss 160, 2 vòng (V120) */
  // V205 · BƯỚC B (Gemini 08/11): hệ số cân 13 tàu theo máu boss mất thật (bot, TK ải 200, bậc SS). Tắt: window.BAL205=false
  const K205={0:.92,1:.68,2:1.07,3:.82,4:.95,5:.96,6:.87,7:1.04,8:1.00,9:1.45,10:1.04,11:2.58,12:2.70};/* Gemini chốt: neo trung vị, #2/#4/#7 giảm ½ mức */
  const k205=i=>window.BAL205===false?1:((window.K205X&&window.K205X[i])||K205[i]||1);
  const st={acc:{},salvo:{},pend:[],fx:[],dots:[],vort:[],delay:[],stats:{}};
  const now=()=>typeof time==='number'?time:performance.now()/1000;
  const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
  const isMain=s=>s&&s.art28!=null&&!s.gearKind&&!s.ally&&s.type!=='drone'&&!s.escort40;
  function clone(t){const s=Object.assign({},t);s.hit=new Set();s.age=0;s.dead=false;s.blast=false;s.chain=false;/* V122: nổ/nảy cũ vẽ vòng tròn → dùng cơ chế riêng */delete s.trailPoints;delete s.__c117;delete s.__ss90;delete s.__v87;delete s.__s90;return s;}
  // ---------- gây sát thương phụ (nổ lan, nảy, cháy, xoáy, cột sáng) ----------
  function hurt(e,d,src){if(!e||e.dead||!(d>0))return;try{if(e===boss||e.bossPart){damageBoss(d,src,e);return;}const h0=e.hp;e.hp-=d;try{Feedback31.damage(e,h0-e.hp,src);}catch{}try{Render27.hit(e);}catch{}if(e.hp<=0)kill(e);}catch{}}
  function targets(){let a=[];try{a=boss?[...Combat26.targets(),...enemies,boss]:enemies.slice();}catch{try{a=enemies.slice();}catch{}}return a.filter(e=>e&&!e.dead&&!(e.hp<=0&&!e.bossPart&&e!==boss));}
  const dist2=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  // ---------- tạo loạt đạn ----------
  function build(i,L,tmpl,D){const c=C[i];let list=c.b(L);const wsum=list.reduce((a,p)=>a+(p.w||1),0);
    const per=D/(c.rate*wsum*(1+c.bonus))*(FUDGE[i]||1)*k205(i);const out=[];const t0=now();
    for(const p of list){const s=clone(tmpl);const sp=c.ray?0:(c.sp||1000);s.p120={i,L,k:p.k,born:t0,ox:p.dx,...p};
      s.damage=per*(p.w||1);s.x=player.x+p.dx;s.y=player.y-27;
      if(c.ray){s.p120.bx=p.dx;if(p120i(i)){s.p120.vw=.45;s.p120.va=.65;}}
      else{if(c.toBullet||s.ray28){delete s.ray28;delete s.life28;s.type='rapid';s.r=Math.max(3.5,s.r||4);}
        const a=p.deg*D2R;s.vx=Math.sin(a)*sp;s.vy=-Math.cos(a)*sp;}
      if(c.pierce)s.piercing=true;else if(!c.ray)s.piercing=false;
      if(p.k==='orb'){s.piercing=false;s.scale30=(s.scale30||1)*1.25;s.r=(s.r||4)*1.3;}
      if(c.big||p.big){s.scale30=(s.scale30||1)*(c.big||1.25);s.r=(s.r||4)*1.2;}
      if(p.k==='sine'){s.p120.bx=s.x;s.vx=0;}
      if(p.k==='grow'){s.p120.sc=s.scale30||1;s.scale30=(s.scale30||1)*p.s0;}
      if(p.k==='zig'){s.p120.flip=t0;s.p120.dir=p.ph?1:-1;const a=15*D2R*s.p120.dir;s.vx=Math.sin(a)*sp;s.vy=-Math.cos(a)*sp;}
      if(p.drone){s.p120.fromDrone=p.drone;}
      if(p.delay>0)st.delay.push({at:t0+p.delay,s,dx:p.dx});else out.push(s);}
    return out;}
  function cap(){return lite()?18:24;}
  function pushCapped(list){let n=0;for(const s of shots)if(!s.dead&&s.p120&&!s.p120.frag)n++;
    if(n+list.length>cap()&&list.length>1){const m=[];for(let k=0;k<list.length;k+=2){const a=list[k],b=list[k+1];if(b){a.damage+=b.damage;a.x=(a.x+b.x)/2;a.vx=(a.vx+b.vx)/2;}m.push(a);}list=m;}
    for(const s of list)shots.push(s);}
  // ---------- bọc hàm bắn ----------
  function hookFire(){try{const A=Arsenal30;if(A.__p120)return;const o=A.fire;A.fire=function(fusion=false){
      let i=-1;try{i=fusion||activeRobot?-1:selected;}catch{}const off=window.PAT120_OFF||[];
      if(!C[i]||off.includes(i))return o.apply(this,arguments);
      const n0=shots.length;const r=o.apply(this,arguments);let made=[];try{made=shots.splice(n0);}catch{return r;}
      const keep=[],main=[];for(const s of made)(isMain(s)?main:keep).push(s);for(const s of keep)shots.push(s);
      if(!main.length)return r;const D=main.reduce((a,s)=>a+(s.damage||0),0);const c=C[i];
      st.acc[i]=(st.acc[i]||0)+c.rate;if(st.acc[i]<1-1e-6)return r;st.acc[i]-=1;
      let L=4;try{L=LV[Math.max(0,Math.min(4,A.p()))];}catch{}
      const tmpl=main[Math.floor(main.length/2)];const list=build(i,L,tmpl,D);pushCapped(list);
      st.stats[i]=(st.stats[i]||0)+1;
      // tàu 13: cột sáng phán quyết
      if(c.pil){const [every,mult]=c.pil[L];st.salvo[i]=(st.salvo[i]||0)+1;if(st.salvo[i]>=every){st.salvo[i]=0;pillar(mult*(list[0]?list[0].damage:D/5),tmpl);}}
      return r;};A.__p120=1;}catch(e){console.warn('V120 fire',e);}}
  function pillar(d,src){const T=targets();if(!T.length)return;let t=null;try{if(boss&&!boss.dead){const parts=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0);t=parts.sort((a,b)=>b.hp-a.hp)[0]||boss;}}catch{}
    if(!t)t=T.sort((a,b)=>(b.hp||0)-(a.hp||0))[0];if(!t)return;hurt(t,d,src);st.fx.push({k:'pillar',x:t.x,y:t.y,t:now(),life:.2});}
  // ---------- khi trúng ----------
  function onHit(s,e){const p=s.p120;if(!p)return;const c=C[p.i];const t=now();
    if(!lite()||Math.random()<.5)if(!e.__v120||t-e.__v120>.09){e.__v120=t;st.fx.push({k:c.hit,x:s.x,y:s.y,t,life:.11,col:c.col});}
    if(p.burn&&!(e===boss||e.bossPart)){st.dots.push({e,d:s.damage*p.burn.ratio/1.5,end:t+p.burn.sec,src:s});for(const n of targets())if(n!==e&&!n.bossPart&&n!==boss&&dist2(n,e)<p.burn.R){hurt(n,s.damage*.15,s);break;}}
    if(p.split&&!p.frag){for(const sd of [-1,1]){const f=clone(s);f.p120={i:p.i,frag:true,k:null,born:t};f.hit=new Set([e]);f.damage=s.damage*p.split;f.scale30=(s.scale30||1)*.6;f.r=(s.r||4)*.7;const a=sd*35*D2R,v=620;f.vx=Math.sin(a)*v;f.vy=-Math.cos(a)*v;f.p120.life=200/v;f.piercing=false;let nf=0;for(const q of shots)if(q.p120&&q.p120.frag&&!q.dead)nf++;if(nf<(lite()?6:10))shots.push(f);}}
    if(p.chain){let from=e;const seen=new Set([e]);for(const ratio of p.chain){const n=targets().filter(q=>!seen.has(q)&&dist2(q,from)<180).sort((a,b)=>dist2(a,from)-dist2(b,from))[0];if(!n)break;seen.add(n);hurt(n,s.damage*ratio,s);st.fx.push({k:'chain',x:from.x,y:from.y,tx:n.x,ty:n.y,t,life:.12,col:c.col});from=n;}}
    if(p.bleed)st.dots.push({e,d:s.damage*p.bleed,at:t+.4,once:true,src:s});
    if(p.aoe){for(const n of targets())if(n!==e&&dist2(n,s)<p.aoe.R)hurt(n,s.damage*p.aoe.ratio,s);st.fx.push({k:'blast',x:s.x,y:s.y,t,life:.12,R:p.aoe.R,col:c.col});}
    if(p.vortex&&st.vort.length<4){st.vort.push({x:s.x,y:s.y,R:p.vortex.R,end:t+p.vortex.sec,next:t+.2,d:s.damage*.2,src:s,t0:t});}}
  function hookHit(){try{const A=Arsenal30;if(A.__h120)return;const o=A.hit;A.hit=function(s,e){const r=o.apply(this,arguments);try{if(s&&s.p120&&e)onHit(s,e);}catch{}return r;};A.__h120=1;}catch{}}
  // ---------- mỗi khung: chuyển động riêng + hàng chờ ----------
  let last=-1;
  function step(){clockGuard();let t=now();const dt=last<0?0:Math.max(0,Math.min(.05,t-last));last=t;if(typeof mode==='undefined'||mode!=='play')return;
    // loạt trễ (tàu ảo, lớp đao 2, thương hộ vệ)
    for(let k=st.delay.length-1;k>=0;k--){const q=st.delay[k];if(t>=q.at){st.delay.splice(k,1);q.s.x=player.x+q.dx;q.s.y=player.y-27-(q.s.p120.fromDrone?6:0);q.s.p120.born=t;if(q.s.p120.k==='sine')q.s.p120.bx=q.s.x;pushCapped([q.s]);}}
    if(st.delay.length>40)st.delay.splice(0,st.delay.length-40);
    for(const s of shots){const p=s.p120;if(!p||s.dead)continue;const age=t-p.born;
      if(p.frag&&p.life&&age>p.life){s.dead=true;continue;}
      if(C[p.i].ray){const c=C[p.i];s.x=player.x+p.bx+Math.sin(t*2*Math.PI*c.hz[p.L]+(p.bx<0?0:Math.PI))*(p.sweep||0)*2.4;continue;}
      switch(p.k){
        case 'curve':{const dir=-Math.sign(p.ox||0);s.vx+=dir*p.ax*dt;s.vx=Math.max(-160,Math.min(160,s.vx));break;}
        case 'sine':{p.bx+=0;s.x=p.bx+Math.sin(10*age+p.ph)*p.A;if(p.c)s.color=p.c;break;}
        case 'zig':{if(t-p.flip>=.12){p.flip=t;p.dir=-p.dir;const sp=Math.hypot(s.vx,s.vy)||860,a=15*D2R*p.dir;s.vx=Math.sin(a)*sp;s.vy=-Math.cos(a)*sp;}break;}
        case 'grow':{const d=(C[p.i].sp||680)*age,k=Math.min(p.s1,p.s0+d/450);s.scale30=p.sc*k;s.r=Math.max(s.r||4,4*k*1.6);break;}
        case 'accel':{const sp=Math.hypot(s.vx,s.vy)||1,v=Math.min(p.v1,420+(p.v1-420)*Math.min(1,age/.35));s.vx*=v/sp;s.vy*=v/sp;break;}
        case 'home':{if(age<p.hd)break;const T=targets();if(!T.length)break;let tg=null;try{if(boss&&!boss.dead){const w=(boss.parts||[]).filter(q=>!q.dead&&q.hp>0);tg=w.sort((a,b)=>dist2(a,s)-dist2(b,s))[0]||boss;}}catch{}
          if(!tg)tg=T.filter(q=>q.y<s.y+20).sort((a,b)=>dist2(a,s)-dist2(b,s))[0];if(!tg)break;const sp=Math.hypot(s.vx,s.vy)||760,cur=Math.atan2(s.vy,s.vx),want=Math.atan2(tg.y-s.y,tg.x-s.x);let da=((want-cur+Math.PI*3)%(Math.PI*2))-Math.PI;const mx=p.turn*D2R*dt;da=Math.max(-mx,Math.min(mx,da));s.vx=Math.cos(cur+da)*sp;s.vy=Math.sin(cur+da)*sp;break;}
      }}
    // sát thương theo thời gian
    for(let k=st.dots.length-1;k>=0;k--){const q=st.dots[k];if(q.once){if(t>=q.at){hurt(q.e,q.d,q.src);st.dots.splice(k,1);}continue;}if(t>=q.end||q.e.dead){st.dots.splice(k,1);continue;}hurt(q.e,q.d*dt,q.src);}
    if(st.dots.length>60)st.dots.splice(0,st.dots.length-60);
    for(let k=st.vort.length-1;k>=0;k--){const v=st.vort[k];if(t>=v.end){st.vort.splice(k,1);continue;}
      for(const e of targets()){if(e===boss||e.bossPart)continue;const d=dist2(e,v);if(d<v.R&&d>2){const m=Math.min(d,95*dt);e.x+=(v.x-e.x)/d*m;e.y+=(v.y-e.y)/d*m;}}
      if(t>=v.next){v.next+=.2;for(const e of targets())if(!(e===boss||e.bossPart)&&dist2(e,v)<v.R)hurt(e,v.d,v.src);}}
    st.fx=st.fx.filter(f=>t-f.t<f.life&&t>=f.t);if(st.fx.length>40)st.fx.splice(0,st.fx.length-40);}
  function hookUpd(){try{const ou=update;if(ou.__p120)return;const nu=function(){const r=ou.apply(this,arguments);try{step();}catch(e){}return r;};nu.__p120=1;window.update=nu;try{update=nu;}catch{}}catch{}}
  // ---------- vẽ: hiệu ứng trúng (V125: tranh GPT hit_*.png; code dự phòng) + tàu ảo + xoáy + cột sáng ----------
  const ART=()=>typeof HIT120_ART!=='undefined'?HIT120_ART:null;const IMG={};
  function art(k){const A=ART();if(!A||!A[k])return null;let im=IMG[k];if(!im){im=new Image();im.src=A[k];IMG[k]=im;}return im.complete&&im.naturalWidth?im:null;}
  function star(x,y,r,n,col,rot,al){ctx.save();ctx.translate(x,y);ctx.rotate(rot||0);ctx.globalAlpha=al;ctx.fillStyle=col;ctx.beginPath();for(let k=0;k<n*2;k++){const a=k*Math.PI/n,rr=k%2?r*.28:r;k?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(rr,0);}ctx.closePath();ctx.fill();ctx.restore();}
  function zig(x,y,tx,ty,col,al){ctx.save();ctx.globalAlpha=al;ctx.strokeStyle=col;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);for(let k=1;k<=6;k++){const u=k/6,w=k===6?0:(Math.random()-.5)*14;ctx.lineTo(x+(tx-x)*u+w,y+(ty-y)*u+w);}ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=.8;ctx.stroke();ctx.restore();}
  // V208 (G1): đồng hồ trận 'time' về 0 khi sang ải mới → hiệu ứng cũ có tuổi ÂM: alpha >1 và kích thước âm khổng lồ (vệt sáng vỡ điểm ảnh che màn).
  //  Khi phát hiện đồng hồ lùi, xóa toàn bộ hiệu ứng / hiệu ứng kéo dài còn treo; bỏ qua mọi mục có tuổi âm.
  let lastT207=0;function clockGuard(){const t=now();if(t<lastT207-.25){st.fx.length=0;st.dots.length=0;st.vort.length=0;st.delay.length=0;st.pend.length=0;}lastT207=t;return t;}
  function drawFx(){const t=clockGuard();let GS=1,GA=1;try{const g=Rank36.grade();GS=g==='SS'?1.3:g==='S'?1.15:1;GA=g==='SS'?1:g==='S'?.9:.8;}catch{}/* V121: hiệu ứng trúng theo bậc */ctx.save();ctx.globalCompositeOperation='lighter';
    for(const f of st.fx){const u=(t-f.t)/f.life;if(!(u>=0&&u<1))continue;const al=Math.max(0,1-u)*GA;const im=art('hit_'+f.k);
      if(f.k==='chain'){zig(f.x,f.y,f.tx,f.ty,f.col,al);continue;}
      if(f.k==='pillar'){const cot=art('hit_pillar_cot');if(cot){const w=34,th=w*8;ctx.globalAlpha=al*.8;for(let yy=f.y;yy>-th;yy-=th)ctx.drawImage(cot,f.x-w/2,yy-th,w,th);const z=60*GS*(1+.2*u);ctx.globalAlpha=al;const ip=art('hit_pillar');if(ip)ctx.drawImage(ip,f.x-z/2,f.y-z/2,z,z);continue;}const w=38;ctx.globalAlpha=al*.85;const g=ctx.createLinearGradient(f.x-w/2,0,f.x+w/2,0);g.addColorStop(0,'#aa00ff00');g.addColorStop(.5,'#ffe9a0');g.addColorStop(1,'#aa00ff00');ctx.fillStyle=g;ctx.fillRect(f.x-w/2,0,w,f.y+10);star(f.x,f.y,30,4,'#ffd740',Math.PI/4,al);continue;}
      if(im){const z=(f.k==='blast'?96:f.k==='vortex'?96:56)*(1+.25*u)*GS;ctx.globalAlpha=al;ctx.drawImage(im,f.x-z/2,f.y-z/2,z,z);continue;}
      const r=Math.min(21,(f.k==='blast'?f.R*.55:16)*(.7+.5*u)*GS);ctx.globalAlpha=.75;
      if(f.k==='blast')star(f.x,f.y,r,8,f.col,0,al*.8);else if(f.k==='frost')star(f.x,f.y,r,4,f.col,Math.PI/4,al);else if(f.k==='slash'){ctx.save();ctx.globalAlpha=al;ctx.strokeStyle=f.col;ctx.lineWidth=3;ctx.beginPath();ctx.arc(f.x,f.y,r,-2.4,-.6);ctx.stroke();ctx.restore();}else star(f.x,f.y,r,f.k==='aurora'?4:f.k==='cross'?4:5,f.col,f.k==='cross'?0:t*3,al);}
    // xoáy hố đen
    for(const v of st.vort){const im=art('hit_vortex'),al=.5;if(im){const R=v.R*.8;ctx.save();ctx.translate(v.x,v.y);ctx.rotate((t-v.t0)*4);ctx.globalAlpha=al;ctx.drawImage(im,-R,-R,R*2,R*2);/* V125: xoáy tranh GPT nhỏ và trong hơn để không che đạn địch */ctx.restore();}else{for(let k=0;k<3;k++){ctx.save();ctx.translate(v.x,v.y);ctx.rotate((t-v.t0)*4+k*2.09);ctx.globalAlpha=.5;ctx.strokeStyle='#ea80fc';ctx.lineWidth=2;ctx.beginPath();for(let a=0;a<2.6;a+=.2){const rr=v.R*(1-a/2.6);a?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(rr,0);}ctx.stroke();ctx.restore();}}}
    ctx.restore();
    // tàu ảo quân đoàn (tàu 10)
    try{if(selected===9&&!activeRobot&&!(window.PAT120_OFF||[]).includes(9)&&(mode==='play'||mode==='pause')){const a=Evo53.hull(9),W0=a.naturalWidth||a.width,cw=W0/5,ch=(a.naturalHeight||a.height)/4,z=46;
      ctx.save();ctx.globalAlpha=.42+.08*Math.sin(t*5);ctx.globalCompositeOperation='lighter';for(const sd of [-1,1])ctx.drawImage(a,9%5*cw,0,cw,ch,player.x+sd*44-z/2,player.y+8-z/2,z,z);ctx.restore();}}catch{}}
  function hookDraw(){try{const vd=VisualFX.draw;if(vd.__p120)return;const nd=function(){const r=vd.apply(this,arguments);try{if(mode==='play'||mode==='pause')drawFx();}catch{}return r;};nd.__p120=1;VisualFX.draw=nd;}catch{}}
  setTimeout(()=>{hookFire();hookHit();hookUpd();hookDraw();},0);
  window.V120={C,state:()=>({stats:{...st.stats},fx:st.fx.length,dots:st.dots.length,vort:st.vort.length,delay:st.delay.length})};
})();
