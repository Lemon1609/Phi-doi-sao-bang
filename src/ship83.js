// V83 · ĐỢT 3 REVIEW81: CHIẾN CƠ #11–#13 (chỉ số 10–12) + lộ trình nhận NGUYÊN BỘ (bộ 10–12)
//  #11 Thôn Tinh Chiến Cơ (SS) · Trọng Lực Thôn Phệ: 3 cầu trọng lực xuyên, nổ lan · Bạo Tẩu: hút đạn thường quanh mũi tàu, mỗi viên bắn trả 1 tia vào mục tiêu
//  #12 Thời Không Lữ Khách (SS) · Lưỡng Cực Thời Gian: thương thời gian nhanh, xuyên · Bạo Tẩu: đạn địch chậm 60%, trang bị hồi chiêu nhanh gấp đôi
//  #13 Hư Không Đế Vương (SS) · Phán Quyết Thứ Nguyên: quạt đạn cắt chéo; chỉ còn boss → chụm 1 tia · Bạo Tẩu: thêm luồng cắt chéo
//  Chỉ số và cách nhận theo Gemini REVIEW81 (chủ dự án chốt: tuyến B của #11, #13 phải đủ CẢ HAI điều kiện).
//  Hình thân tàu / đạn: tranh GPT gói REVIEW81 hoàn chỉnh. Tắt: window.SHIP83=false
const SHIP83={
 list:[{i:10,name:'Thôn Tinh Chiến Cơ',rank:'SS',set:10,n:4,color:'#b45cff',pilot:'Mộc Miên'},
       {i:11,name:'Thời Không Lữ Khách',rank:'SS',set:11,n:4,color:'#5fe6ff',pilot:'Thiên Lam'},
       {i:12,name:'Hư Không Đế Vương',rank:'SS',set:12,n:6,color:'#ffd36a',pilot:'Tử Dạ'}]};
const Ship83=(()=>{
 const on=()=>window.SHIP83!==false;
 const A=typeof SHIP83_ART!=='undefined'?SHIP83_ART:{};const IM={};
 const img=k=>{if(!(k in IM)){IM[k]=A[k]?Object.assign(new Image(),{src:A[k]}):null;}const m=IM[k];return m&&m.complete&&m.naturalWidth?m:null;};
 for(const k in A)img(k);
 const isNew=i=>Number.isInteger(i)&&i>=10&&i<=12;
 // ảnh thân theo khung: Trắng/Lục = q1 · Lam = evo1 · Tím = evo2 · Tím+5 = q5 · Bạo Tẩu: q1_super (dưới Tím) / q5_super (từ Tím)
 function hullKey(i,sup){let n=0;try{n=V70.craftN(i)|0;}catch{}if(sup)return 's'+i+(n>=6?'_q5s':'_q1s');return 's'+i+(n>=11?'_q5':n>=6?'_e2':n>=2?'_e1':'_q1');}
 function hull(i,sup){try{const q=window.SSS87&&SSS87.hull(i,sup);if(q)return q;}catch{}try{const k=window.Art86&&Art86.hull(i,sup);if(k)return k;}catch{}try{const q=h118(i,sup);if(q)return q;}catch{}return img(hullKey(i,sup))||img('s'+i+'_q1');}// V86: skin riêng (art86) · V118: tranh thiết kế lại
 const I118={};function h118(i,sup){if(window.ART118===false||typeof SHIP118==='undefined'||!SHIP118[i])return null;let n=0;try{n=V70.craftN(i)|0;}catch{}let ss=false;try{ss=!!SHIP118[i].ss&&window.SS122!==false&&Workshop.craftGrade(i)==='SS';}catch{}const f=(ss?'ss':n<=0?'thuong':n===1?'luc':n<=5?'lam':n<=10?'tim':'tim5')+(sup?'_bt':'');const src=SHIP118[i][f]||SHIP118[i][f.replace('_bt','')];if(!src)return null;let im=I118[f+i];if(!im){im=new Image();im.src=src;I118[f+i]=im;}return im.complete&&im.naturalWidth?im:null;}
 const TH={};function thumb(i){const k=hullKey(i,false)+'|'+((window.Art86&&Art86.eqOf(i))||'');if(TH[k])return TH[k];const im=hull(i,false);if(!im)return '';const c=document.createElement('canvas');c.width=c.height=112;c.getContext('2d').drawImage(im,0,0,112,112);return TH[k]=c.toDataURL();}
 // ---------- đạn chính ----------
 function volley(id,internal,rage,levels,element){const l=rage?4:Math.max(0,Math.min(4,Math.floor(internal)-1)),spec=levels[l],out=[],c=(Fighters28.profiles[id]||{}).color||'#fff';
  function add(x,a=0,opt={}){out.push({x,y:0,vx:Math.sin(a)*spec.speed,vy:-Math.cos(a)*spec.speed,type:'rapid',damage:1+l*.16,r:3.5+spec.scale*1.8,scale30:spec.scale,level30:l,element30:element(id),art28:id,color:c,superShot:l===4,piercing:false,blast:false,blastRadius:42+l*8,freeze:false,homing:false,age:0,...opt});}
  const n=spec.n;
  if(id===10){const k=Math.max(2,Math.min(5,Math.ceil(n*.6)));for(let j=0;j<k;j++)add((j-(k-1)/2)*14,(j-(k-1)/2)*.06,{type:'plasma',r:6+l*1.2,piercing:true,blast:true,blastRadius:38+l*6,damage:(1+l*.16)*n/k*.98});}
  else if(id===11){const k=Math.max(2,Math.min(4,Math.ceil(n*.5)));for(let j=0;j<k;j++)add((j-(k-1)/2)*10,(j-(k-1)/2)*.025,{type:'rapid',piercing:l>=2,vy:-spec.speed*1.15,damage:(1+l*.16)*n/k*.98});}
  else if(id===12&&(()=>{try{return superTime>0;}catch{return false;}})()){// V86 · Gemini REVIEW85 G8: Bạo Tẩu 12 luồng (6 trục chính + 6 cắt chéo chữ X, hội tụ ~230 px trước mũi)
   const T=(1+l*.16)*n,sp=920,D=Math.PI/180;
   [-20,-12,-4,4,12,20].forEach((x,j)=>add(x,[-8,-4,-1,1,4,8][j]*D,{type:'crystal',damage:T*.155,vx:Math.sin([-8,-4,-1,1,4,8][j]*D)*sp,vy:-Math.cos([-8,-4,-1,1,4,8][j]*D)*sp}));
   for(const s of [-1,1])[16,22,28].forEach(g=>{const a=-s*g*D;add(s*42,a,{type:'crystal',piercing:true,damage:T*.14,vx:Math.sin(a)*sp,vy:-Math.cos(a)*sp});});}
  else{let solo=false;try{solo=!!boss&&!boss.dead&&!enemies.some(e=>!e.dead&&e.y>-20&&e.y<H*.8);}catch{}
   if(solo){add(0,0,{type:'ray28',ray28:true,vx:0,vy:0,r:4+l*1.6,offset28:0,life28:.12,piercing:true,damage:(1+l*.16)*n*.55});}
   else{const k=Math.max(2,Math.min(5,Math.ceil(n*.6)));for(let j=0;j<k;j++){const s=j%2?1:-1,k2=Math.floor(j/2);add(k%2&&j===k-1?0:s*(6+k2*8),k%2&&j===k-1?0:s*(.06+k2*.09),{type:'crystal',piercing:l>=3,damage:(1+l*.16)*n/k*.98});}}}
  return out;}
 // ---------- Bạo Tẩu riêng ----------
 let absT=0;
 function update(dt){if(!on())return;let sup=false,id=-1;try{sup=superTime>0;id=selected|0;if(typeof activeRobot!=='undefined'&&activeRobot)id=-1;}catch{}if(!sup||!isNew(id))return;
  const x=window.__eq81;
  if(id===10){absT-=dt;if(absT<=0){absT=.45;try{const P={x:player.x,y:player.y-40};const bs=bullets.filter(b=>!b.dead&&Math.hypot(b.x-P.x,b.y-P.y)<130).slice(0,6);const tg=boss&&!boss.dead?boss:enemies.filter(e=>!e.dead).sort((a,b)=>a.y-b.y)[0];
    for(const b of bs){b.dead=true;if(tg&&x)x.hurt(tg,.85*(1+Arsenal30.p()*.16));}if(bs.length)x&&x.ring(P.x,P.y,'#b45cff',130);}catch{}}}
  if(id===11){try{for(const b of bullets)if(!b.dead&&!b.t83){b.t83=1;b.vx*=.4;b.vy*=.4;}}catch{}}}
 // ---------- lộ trình nhận nguyên bộ (gắn thêm vào Ship79) ----------
 const KEY='saobang-ship83';let S={seasons:{},ev:0,raid:0};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const g=(fn,d=0)=>{try{const v=fn();return typeof v==='number'&&isFinite(v)?v:d;}catch{return d;}};
 const tower=()=>g(()=>Meta40.state().S.tower.best),badge=()=>g(()=>O78.state().badge),stars=()=>g(()=>{const o=Campaign36.getState().stars||{};let t=0;for(const k in o)t+=o[k]|0;return t;});
 const best=()=>g(()=>{const c=Progress.getState().cleared||[];return c.length?Math.max(...c):0;});
 const ovBest=()=>g(()=>{const s=O78.state();return Math.max(s.best|0,s.max|0,...(s.life||[0]));});
 function trackSeason(){try{const lv=S77.level();const st=S77.state();const id=st.sid||st.season||st.id||st.start||'cur';if(lv>=20&&!S.seasons[id]){S.seasons[id]=1;save();}}catch{}}
 const both=(lab,a,ta,b,tb)=>[lab,Math.floor(Math.min(1,a/ta,b/tb)*100),100,null,`${lab} (${Math.min(a,ta)}/${ta} · ${Math.min(b,tb)}/${tb})`];
 const ROUTES=[
  {i:10,g:10,rank:'SS',n:4,a:()=>['Điểm boss cuối tuần tích lũy',S.raid|0,120000000],b:()=>both('Tháp tầng 150 + 800 huy hiệu',tower(),150,badge(),800)},
  {i:11,g:11,rank:'SS',n:4,a:()=>['Sự kiện tuần hoàn thành',S.ev|0,4],b:()=>['Mùa giải đạt cấp 20',Object.keys(S.seasons).length,2]},
  {i:12,g:12,rank:'SS',n:6,a:()=>['Vượt ải',best(),180],b:()=>both('480★ + thắng Vượt Hạn bậc 10',stars(),480,ovBest(),10)}];
 function addRoutes(){try{if(!window.Ship79||!Ship79.ROUTE)return;for(const r of ROUTES)if(!Ship79.ROUTE.some(x=>x.i===r.i))Ship79.ROUTE.push(r);}catch{}}
 function install(){if(!on())return;addRoutes();
  try{if(!window.craftSprite.__s83){const o=window.craftSprite;const f=function(index,x,y,size,rotation=0){if(isNew(index)){const sup=(()=>{try{return Fighters28.overdrive();}catch{return false;}})();const im=hull(index,sup);if(im){frameSprite(im,[0,0,im.naturalWidth,im.naturalHeight],x,y,size*1.4,rotation);return;}}return o.apply(this,arguments);};f.__s83=1;window.craftSprite=f;try{craftSprite=f;}catch{}}}catch{}
  try{if(typeof SuperHangar!=='undefined'&&!SuperHangar.__s83){const o=SuperHangar.draw;SuperHangar.draw=function(id,g2,w,h,t,sup){if(isNew(id)){const im=hull(id,!!sup);if(im){const s=sup?290:250;g2.drawImage(im,w/2-s/2,h/2-s/2-8,s,s);return;}}return o.apply(this,arguments);};SuperHangar.__s83=1;}}catch{}
  try{if(!Equipment25.__s83){const u=Equipment25.update;Equipment25.update=function(dt){const v=u.apply(this,arguments);try{if(mode==='play')update(dt);}catch{}return v;};Equipment25.__s83=1;}}catch{}}
 install();setTimeout(install,150);setTimeout(install,1200);setInterval(()=>{try{trackSeason();addRoutes();}catch{}},5000);
 return {on,isNew,hull,thumb,volley,ROUTES,state:()=>({...S,routes:ROUTES.map(r=>[r.i,r.a(),r.b()])}),_set:o=>{Object.assign(S,o);save();}};
})();
window.Ship83=Ship83;
