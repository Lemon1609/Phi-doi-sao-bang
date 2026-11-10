// V218 · Bạo Tẩu: lửa, sét, ánh sáng do GPT THIẾT KẾ thành mảnh rời theo từng chiến cơ (BTFX218_ART), game làm CHUYỂN ĐỘNG.
//  Bộ mảnh của một tàu (src/btfx218/tauN_fx_*.png, quy ước ở docs_claude/GUI_GPT_V217_CHUAN_PHONG_CACH.md mục A.8):
//    lua_1..3  192×384  ngọn lửa, gốc ở giữa cạnh đáy, ngọn hướng lên (3 dáng luân phiên)
//    set_1..3  384×128  tia sét ngang từ giữa cạnh trái đến giữa cạnh phải (3 dáng)
//    sang      512×512  hình ánh sáng sau lưng, tâm ảnh = tâm tàu
//    hat       256×64   4 ô 64×64: hạt lấp lánh
//  Tàu chưa có bộ mảnh thì mô-đun này không vẽ gì (giữ nguyên V118). v118.js gọi back() trước thân, front() sau thân.
//  Mỏ neo (họng động cơ, mũi cánh, mép thân) tự dò từ tranh Bạo Tẩu của tàu. Bậc càng cao càng nhiều lửa / sét.
//  Tắt: window.BTFX218=false
(()=>{
  const ART=()=>{try{return (typeof BTFX218_ART!=='undefined'&&BTFX218_ART)||null;}catch{return null;}};
  const IM={},TAU=Math.PI*2,T=['thuong','luc','lam','tim','tim5','ss'];
  const img=(id,k)=>{const A=ART();if(!A||!A[id]||!A[id][k])return null;const key=id+'|'+k;let im=IM[key];if(!im){im=new Image();im.src=A[id][k];IM[key]=im;}return im.complete&&im.naturalWidth?im:null;};
  const has=id=>window.BTFX218!==false&&!!(ART()&&ART()[id]);
  // khung phần vẽ thật của một mảnh (bỏ lề trong suốt GPT để thừa) → ghép đúng gốc lửa / hai đầu tia sét dù tranh lệch lề
  const BB=new WeakMap();
  function bb(im){let b=BB.get(im);if(b)return b;const w=im.naturalWidth,h=im.naturalHeight;b={x:0,y:0,w,h};try{const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(im,0,0);const d=g.getImageData(0,0,w,h).data;let x0=w,x1=-1,y0=h,y1=-1;
      for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(d[(y*w+x)*4+3]>26){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}if(x1>x0&&y1>y0)b={x:x0,y:y0,w:x1-x0+1,h:y1-y0+1};}catch{}BB.set(im,b);return b;}
  const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  const back_=x=>{x=Math.max(0,Math.min(1,x));const c=1.70158;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2);};
  // Bảng tăng theo 6 bậc (Gemini, 10/11): [số dải lửa, dài lửa, số tia sét, nhịp sét (giây), cỡ ánh sáng, alpha ánh sáng, số hạt]
  //  Trần: bề ngang ánh sáng ≤ 1,35 × sải cánh; alpha ≤ 0,58; ánh sáng và lửa luôn vẽ DƯỚI thân tàu.
  //  V219: nâng sàn các bậc thấp (bảng gốc Gemini làm bậc thường gần như không thấy gì: ánh sáng 70 % nấp sau thân, 0 tia sét).
  //  Gốc Gemini: dài lửa .60/.75/.85/.95/1.05/1.15 · sét 0/1/2/3/4/5 · cỡ sáng .70/.80/.90/1/1.10/1.20 · alpha .25/.32/.38/.45/.52/.58
  const LV=[[2,.72,1,1.4,.86,.40,3],[2,.80,1,1.1,.93,.44,4],[4,.88,2,.9,1,.48,5],[4,.96,3,.6,1.07,.52,6],[6,1.05,4,.4,1.14,.56,7],[6,1.15,5,.25,1.20,.60,8]];
  // 18:32 chủ dự án: NỚI trần cho rực hơn → bề ngang ánh sáng tối đa 1,9 × sải cánh (Gemini: 1,35), alpha × 1,45 và trần 0,85 (Gemini: 0,58)
  const SPAN_MAX=1.9,SPAN_K=1.5,A_K=1.45,A_MAX=.85,FLASH=.2;
  // ---- mỏ neo: dò từ ô Bạo Tẩu của atlas, tọa độ chuẩn hóa theo khung tàu (−0,5 … 0,5) ----
  const AN=new WeakMap(),N=96;
  function anchors(a,cell,cw,ch){let m=AN.get(a);if(m&&m.cell===cell)return m.ok?m:null;m={cell,ok:false};AN.set(a,m);
    try{const c=document.createElement('canvas');c.width=c.height=N;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(a,cell%5*cw,Math.floor(cell/5)*ch,cw,ch,0,0,N,N);
      const d=g.getImageData(0,0,N,N).data,op=(x,y)=>x>=0&&y>=0&&x<N&&y<N&&d[(y*N+x)*4+3]>110;let sx=0,sy=0,n=0;const edge=[];
      for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(op(x,y)){sx+=x;sy+=y;n++;if(!op(x-1,y)||!op(x+1,y)||!op(x,y-1)||!op(x,y+1))edge.push([x,y]);}
      if(n<40||edge.length<12)return null;const cx=sx/n,cy=sy/n,nm=([x,y])=>[x/N-.5,y/N-.5];
      // mũi cánh: điểm mép xa tâm nhất trong 10 cung
      const tip=[];for(let s=0;s<10;s++){let b=null;for(const e of edge){const k=Math.floor((Math.atan2(e[1]-cy,e[0]-cx)+Math.PI)/TAU*10)%10;if(k!==s)continue;const q=(e[0]-cx)**2+(e[1]-cy)**2;if(!b||q>b[0])b=[q,e];}if(b)tip.push(nm(b[1]));}
      // họng động cơ: điểm thấp nhất của thân ở nửa trái và nửa phải quanh trục giữa
      const eng=[];for(const [x0,x1] of [[cx-N*.2,cx-1.5],[cx+1.5,cx+N*.2]]){let b=null;for(let x=Math.round(x0);x<=Math.round(x1);x++)for(let y=N-1;y>cy;y--)if(op(x,y)){if(!b||y>b[1])b=[x,y];break;}if(b)eng.push(nm([b[0],b[1]-N*.05]));}
      if(eng.length===2&&Math.abs(eng[0][0]-eng[1][0])<.05){eng.length=1;eng[0][0]=cx/N-.5;}
      m.edge=edge.filter((e,i)=>i%3===0).map(nm);m.tip=tip;m.eng=eng;m.c=[cx/N-.5,cy/N-.5];m.ok=true;return m;}catch{return null;}}
  const st={id:-1,k:0,last:-1};
  function env(id,on,now){if(st.id!==id){st.id=id;st.k=0;st.last=-1;}const dt=st.last<0?0:Math.max(0,Math.min(.1,now-st.last));st.last=now;st.k+=((on?1:0)-st.k)*Math.min(1,dt*7);return st.k;}
  const lvOf=a=>{const i=T.indexOf(a&&a.__f);return LV[i<0?3:i];};
  // ---- lớp SAU thân: ánh sáng bật xòe + lửa ----
  function back(ctx,a,cell,cw,ch,size,on,now,ta,id,lite){
    if(!has(id))return;const k=env(id,on,now);if(k<.02)return;const m=anchors(a,cell,cw,ch),L=lvOf(a);
    ctx.save();ctx.globalCompositeOperation='lighter';
    const sg=img(id,'sang');if(sg){const q=bb(sg),span=m?Math.max(.5,Math.max(...m.tip.map(p=>p[0]))-Math.min(...m.tip.map(p=>p[0]))):.9,
        cwid=Math.min(SPAN_MAX,SPAN_K*L[4])*span*size,sc=cwid/q.w,pr=back_((ta-.03)/.42),W=sg.naturalWidth*sc*(.5+.5*pr),H=sg.naturalHeight*sc*(.92+.08*pr);
      ctx.globalAlpha=Math.min(A_MAX,k*L[5]*A_K*(1+.14*Math.sin(now*3.1)));ctx.drawImage(sg,-W/2,-H/2+size*.03,W,H);}
    const F=[img(id,'lua_1'),img(id,'lua_2'),img(id,'lua_3')].filter(Boolean);
    if(F.length&&m){const ref=Math.max(...F.map(im=>bb(im).h))/* V219: lấy dáng lửa cao nhất làm chuẩn, các dáng khác giữ đúng tỉ lệ GPT vẽ */;const flame=(x,y,w,h,seed,ang)=>{const ph=now*11+seed*1.37,f=Math.floor(ph)%F.length,u=ph-Math.floor(ph),hh=h*(.86+.14*Math.sin(now*23+seed*2.1));
        ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI+ang+Math.sin(now*7+seed)*.04);const put=(im,al)=>{const sc=hh/ref,ww=im.naturalWidth*sc*Math.max(1,w/(size*.10)),h2=im.naturalHeight*sc;ctx.globalAlpha=al;ctx.drawImage(im,-ww/2,-h2,ww,h2);};if(x<m.c[0]*size-1)ctx.scale(-1,1);put(F[f],k*(1-u*.55));put(F[(f+1)%F.length],k*u*.85);ctx.restore();};
      m.eng.forEach((e,i)=>flame(e[0]*size,e[1]*size,size*.10,size*.60*L[1],i*3+1,0));
      const nt=lite?0:Math.max(0,L[0]-m.eng.length);if(nt){const low=m.tip.filter(p=>p[1]>m.c[1]-.02&&Math.abs(p[0]-m.c[0])>.14).sort((p,q)=>q[1]-p[1]).slice(0,nt);low.forEach((p,i)=>flame(p[0]*size,p[1]*size,size*.10,size*.34*L[1],i*5+9,(p[0]<m.c[0]?1:-1)*.22));}}
    ctx.restore();}
  // ---- lớp TRƯỚC thân: sét giữa các mũi cánh + hạt lấp lánh ----
  function front(ctx,a,cell,cw,ch,size,on,now,ta,id,lite){
    if(!has(id))return;const k=st.id===id?st.k:0;if(k<.05)return;const m=anchors(a,cell,cw,ch);if(!m)return;const L=lvOf(a);
    ctx.save();ctx.globalCompositeOperation='lighter';
    const B=[img(id,'set_1'),img(id,'set_2'),img(id,'set_3')].filter(Boolean),n=m.tip.length;
    if(B.length&&n>=2&&L[2]){const nb=lite?Math.min(2,L[2]):L[2],per=L[3],fr=Math.floor(now/.07);
      for(let b=0;b<nb;b++){const tt=now+b*per/nb,slot=Math.floor(tt/per)+b*57,lt=tt%per;if(lt>FLASH)continue;const life=lt/FLASH*.62;
        const i0=Math.floor(rnd(slot*3.1)*n),P=m.tip[i0],Q=rnd(slot*5.9)<.22?m.c:m.tip[(i0+1)%n],x0=P[0]*size,y0=P[1]*size,dx=Q[0]*size-x0,dy=Q[1]*size-y0,len=Math.hypot(dx,dy);if(len<size*.12)continue;
        const im=B[(fr+b)%B.length],q=bb(im),h=Math.max(size*.09,Math.min(size*.3,len*q.h/q.w*1.7));ctx.save();ctx.translate(x0,y0);ctx.rotate(Math.atan2(dy,dx));ctx.scale(1,rnd(slot+fr)<.5?1:-1);ctx.globalAlpha=k*(1-life/.62)*(.6+.4*rnd(fr+b));ctx.drawImage(im,q.x,q.y,q.w,q.h,0,-h/2,len,h);ctx.restore();}}
    const H=img(id,'hat');if(H&&m.edge.length){const hw=H.naturalWidth/4,hh=H.naturalHeight,nq=lite?3:L[6];
      for(let q=0;q<nq;q++){const tt=now+q*.13,slot=Math.floor(tt/.5),u=(tt%.5)/.5,e=m.edge[Math.floor(rnd(slot*9.7+q*3)*m.edge.length)],s=size*(.10+.08*rnd(slot+q))*Math.sin(u*Math.PI);if(s<1)continue;
        ctx.globalAlpha=k*Math.sin(u*Math.PI)*.95;ctx.drawImage(H,((slot+q)%4)*hw,0,hw,hh,e[0]*size-s/2,e[1]*size-s/2,s,s);}}
    ctx.restore();}
  window.BtFx218={back,front,has,state:()=>({...st,ships:Object.keys(ART()||{})}),anchors};
})();
