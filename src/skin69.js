'use strict';
// V69-B · Đột phá đổi NHẸ màu theo đúng tàu gốc + ngoại hình tiến hóa thành SKIN (người dùng 22/10/2026).
//  • Đột phá +1…+5 (không mặc skin): giữ tông màu gốc, chỉ rõ nét dần: +1 đậm & tương phản hơn · +2 phần trắng/xám ánh kim theo màu chủ đạo ·
//    +3 viền sáng mảnh · +4 viền rõ + đèn sáng hơn · +5 viền dày, màu rực nhất. Mỗi tàu tự lấy "màu chủ đạo" từ chính tranh của nó.
//  • Ngoại hình tiến hóa cũ (Ngọc Lam · Bạch Kim · Hoàng Kim · Cầu Vồng Pha Lê + 2 dạng thân GPT) → SKIN mặc tùy chọn, mở ở Tủ skin.
//  • Hiệu ứng có sức mạnh (sét đánh, khiên đỡ đạn của Evo53) vẫn theo bậc đột phá THẬT — skin chỉ đổi hình.
const SKIN69={q5on:false,// V70: bật khi có nấc Tím+5 (V69 +5 = Tím → dùng evo2)

 list:[{id:'evo1',n:'Ngọc Lam',e:1,cost:300,shards:0,col:'#56d8ff'},{id:'evo2',n:'Bạch Kim',e:3,cost:0,shards:10,col:'#e9eeff'},{id:'evo3',n:'Hoàng Kim',e:4,cost:0,shards:10,col:'#ffd54a'},{id:'evo4',n:'Cầu Vồng Pha Lê',e:5,cost:0,shards:12,col:'#ff7eb6'}],
 milestone:{40:{own:'evo1'},80:{sh:['evo2',5]},120:{sh:['evo3',5]},160:{sh:['evo4',6]}},
 spin:{free:1,cost:60,table:[[30,'sh','evo2',1],[22,'sh','evo3',1],[8,'sh','evo4',1],[25,'cr',1500],[15,'mat',2]]},
 // mức "nổi bật" theo bậc đột phá: bão hòa, tương phản, ánh kim, viền sáng
 fx:[null,{s:1.18,c:1.08,m:0,g:.25},{s:1.25,c:1.11,m:.2,g:.38},{s:1.28,c:1.12,m:.22,g:.6},{s:1.32,c:1.14,m:.26,g:.8,lit:1.14},{s:1.38,c:1.16,m:.3,g:1,lit:1.2}]};
// Hình dáng theo bậc đột phá THẬT (giống Đồ giám game gốc): +0–2 dáng gốc · +3/+4 dáng tiến hóa I · +5 dáng tiến hóa II (tranh GPT, giữ màu gốc).
const Skin69=(()=>{
 const KEY='saobang-skin69-v1';
 const load=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&typeof v==='object'?v:{};}catch{return {};}};
 const S=Object.assign({own:{},eq:{},sh:{},mile:{},spin:{d:'',n:0},mig:0},load());
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const day=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();};
 const byId=id=>SKIN69.list.find(x=>x.id===id);
 // V70: mức ngoại hình theo KHUNG (Trắng 0 · Lục 1 · Lam 3 · Tím 5), không theo enhance cũ
 const realEOf=id=>{try{if(typeof V70!=='undefined')return V70.ve('c',id);return Workshop.craftProgress(id).enhance|0;}catch{return 0;}};
 const realE=realEOf;
 const tierN=e=>e>=5?4:e>=4?3:e>=3?2:e>=1?1:0;
 let preview=null;// {id,skin}
 function evoE(id){if(preview&&preview.id===id){const k=byId(preview.skin);return k?k.e:0;}const k=byId(S.eq[id]);return k&&S.own[k.id]?k.e:0;}
 // ---------- chuyển dữ liệu cũ: ai đã có +1/+3/+4/+5 → tặng skin tương ứng & mặc sẵn (không mất ngoại hình) ----------
 function migrate(){if(S.mig)return;for(let i=0;i<10;i++){const e=realE(i);let k=null;if(e>=5)k='evo4';else if(e>=4)k='evo3';else if(e>=3)k='evo2';else if(e>=1)k='evo1';if(k){S.own[k]=1;S.eq[i]=k;}}S.mig=1;save();}
 // ---------- thân tàu theo bậc đột phá (giữ màu gốc) ----------
 const CACHE=new Map();
 function mk(w,h){const c=document.createElement('canvas');c.width=Math.max(1,w|0);c.height=Math.max(1,h|0);return c;}
 function rgb2hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h=0,s=0;const l=(mx+mn)/2;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h/=6;}return [h,s,l];}
 function hsl2rgb(h,s,l){if(!s)return [l*255,l*255,l*255];const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;const f=t=>{t=(t%1+1)%1;return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p;};return [f(h+1/3)*255,f(h)*255,f(h-1/3)*255];}
 function enhanceCell(src,sx,sy,w,h,e){const F=SKIN69.fx[e];const c=mk(w,h),g=c.getContext('2d');g.drawImage(src,sx,sy,w,h,0,0,w,h);if(!F)return c;
  let d;try{d=g.getImageData(0,0,w,h);}catch{return c;}const p=d.data;
  // màu chủ đạo: trung bình vector hue theo trọng số bão hòa
  let hx=0,hy=0;for(let i=0;i<p.length;i+=16){if(p[i+3]<120)continue;const [hh,ss,ll]=rgb2hsl(p[i],p[i+1],p[i+2]);if(ss<.25||ll<.12||ll>.9)continue;const wgt=ss*(1-Math.abs(ll-.5));hx+=Math.cos(hh*Math.PI*2)*wgt;hy+=Math.sin(hh*Math.PI*2)*wgt;}
  const dom=((Math.atan2(hy,hx)/(Math.PI*2))+1)%1,domRGB=hsl2rgb(dom,.85,.6);
  for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;let [hh,ss,ll]=rgb2hsl(p[i],p[i+1],p[i+2]);
   if(ss>=.18){ss=Math.min(1,ss*F.s);}else if(F.m&&ll>.45){hh=dom;ss=Math.min(.5,ss+F.m);}// trắng/xám → ánh kim theo màu chủ đạo
   ll=.5+(ll-.5)*F.c;if(F.lit&&ll>.78)ll=Math.min(1,ll*F.lit);ll=Math.max(0,Math.min(1,ll));const [r,gg,b]=hsl2rgb(hh,ss,ll);p[i]=r;p[i+1]=gg;p[i+2]=b;}
  g.putImageData(d,0,0);
  if(F.g){// viền sáng theo màu chủ đạo: bóng mờ của chính hình tàu
   const sil=mk(w,h),sg=sil.getContext('2d');sg.drawImage(c,0,0);sg.globalCompositeOperation='source-in';sg.fillStyle=`rgb(${domRGB[0]|0},${domRGB[1]|0},${domRGB[2]|0})`;sg.fillRect(0,0,w,h);
   const out=mk(w,h),og=out.getContext('2d');const px=Math.max(2,Math.round(w*(.012+.01*(e-3))));og.filter='blur('+px+'px)';og.globalAlpha=F.g;og.drawImage(sil,0,0);og.drawImage(sil,0,0);og.filter='none';og.globalAlpha=1;og.drawImage(c,0,0);return out;}
  return c;}
 // Tranh khung màu của GPT (Đợt 12): TIER69_ART['q1_ship0'], ['q1_ship0_super']…; chưa có thì dùng dạng hiện tại.
 const TIMG={};function tierImg(id,e,sup){const t=(e===1||e===2)?'q1':(e>=5&&(SKIN69.q5on||(typeof V70!=='undefined'&&V70.isMax(id))))?'q5':null;/* khung màu V70: +1/+2 = Lục (q1, GPT Đợt 12a) · +3/+4 = Lam (evo1) · +5 = Tím (evo2; q5 khi có tranh Tím+5) */if(!t||typeof TIER69_ART==='undefined'||!TIER69_ART)return null;const k=t+'_ship'+id+(sup?'_super':'');if(!TIER69_ART[k])return null;let im=TIMG[k];if(!im){im=new Image();im.src=TIER69_ART[k];TIMG[k]=im;}return im.complete&&im.naturalWidth?im:null;}
 function enhancedAtlas(id,e,base){const k=id+'|'+e+'|'+(base===fighterAtlasV22?'b':'s')+'|'+(tierImg(id,e,false)?'t':'')+(tierImg(id,e,true)?'u':'');let a=CACHE.get(k);if(a)return a;const W0=base.naturalWidth||base.width,H0=base.naturalHeight||base.height;if(!W0||!H0)return base;
  a=mk(W0,H0);const cw=W0/5,ch=H0/4,g=a.getContext('2d');g.drawImage(base,0,0);
  for(const i of [id,id+10]){const dx=i%5*cw,dy=Math.floor(i/5)*ch;let src=base,sx=dx,sy=dy,sw=cw,sh=ch;const ov=tierImg(id,e,i>=10);if(ov){src=ov;sx=0;sy=0;sw=ov.naturalWidth;sh=ov.naturalHeight;}
   const tmp=mk(cw,ch);tmp.getContext('2d').drawImage(src,sx,sy,sw,sh,0,0,cw,ch);const cell=enhanceCell(tmp,0,0,cw,ch,e);g.clearRect(dx,dy,cw,ch);g.drawImage(cell,dx,dy);}
  a.naturalWidth=W0;a.naturalHeight=H0;a.complete=true;CACHE.set(k,a);if(CACHE.size>12){const k0=CACHE.keys().next().value;CACHE.delete(k0);}return a;}
 // ---------- V118: tranh chiến cơ thiết kế lại ----------
 const IM118={},AT118=new Map();
 function img118(k){let im=IM118[k];if(!im){const [id,f]=k.split('|');const src=SHIP118[id]&&SHIP118[id][f];if(!src)return null;im=new Image();im.src=src;IM118[k]=im;}return im.complete&&im.naturalWidth?im:null;}
 function form118(id,e){try{if(SHIP118[id]&&SHIP118[id].ss&&window.SS122!==false&&Workshop.craftGrade(id)==='SS')return 'ss';}catch{}/* V122: Thức Tỉnh SS */if(!e||e<=0)return 'thuong';if(e<=2)return 'luc';if(e<=4)return 'lam';let mx=false;try{mx=SKIN69.q5on||(typeof V70!=='undefined'&&V70.isMax(id));}catch{}return mx?'tim5':'tim';}
 function atlas118(id,f,base){const S=SHIP118[id];let ff=f;if(!S[ff])ff=S.luc?'luc':null;if(!ff)return null;const n=img118(id+'|'+ff),b=img118(id+'|'+ff+'_bt')||n;if(!n)return null;
  const k=id+'|'+ff;let a=AT118.get(k);if(a&&a.__b===base)return a;const W0=base.naturalWidth||base.width,H0=base.naturalHeight||base.height,cw=W0/5,ch=H0/4;
  a=mk(W0,H0);const g=a.getContext('2d');g.drawImage(base,0,0);for(const [i,im] of [[id,n],[id+10,b]]){const dx=i%5*cw,dy=Math.floor(i/5)*ch;g.clearRect(dx,dy,cw,ch);g.imageSmoothingQuality='high';g.drawImage(im,dx,dy,cw,ch);}
  a.naturalWidth=W0;a.naturalHeight=H0;a.complete=true;a.__b=base;AT118.set(k,a);return a;}
 window.ART118S={form:form118};
 let oh=null;
 function hookHull(){if(typeof Evo53==='undefined'||!Evo53.hull||oh)return;oh=Evo53.hull;Evo53.hull=function(id){const h=oh.apply(this,arguments);try{if(!Number.isInteger(id)||id<0||id>9)return h;if(evoE(id))return h;const e=realE(id);/* V118: tranh thiết kế lại (GPT) — 5 dạng × thường/Bạo Tẩu */if(window.ART118!==false&&typeof SHIP118!=='undefined'&&SHIP118[id]&&h&&(h.naturalWidth||h.width)){const a=atlas118(id,form118(id,e),h);if(a)return a;}if(!e)return h;if(!h||!(h.naturalWidth||h.width))return h;return enhancedAtlas(id,Math.min(5,e),h);}catch{return h;}};}
 // ---------- đạn theo bậc đột phá: vệt đuôi bằng chính màu đạn từ +2, dài dần ----------
 function trails(){if(!(mode==='play'||mode==='pause'))return;let e=0;try{if(activeRobot)return;e=realE(selected);}catch{return;}if(e<2||evoE(selected))return;
  // V117 (REVIEW117): bỏ vệt khi có boss hoặc >16 đạn chính; ngoài ra tối đa 24 vệt, độ đậm .28
  const T117=window.SHOT117&&SHOT117.on;let CAP=140;if(T117){if(SHOT117.boss())return;let nm=0;for(const s of shots)if(!s.dead&&s.art28!=null&&!s.gearKind&&++nm>16)return;CAP=24;}
  const L=e>=5?30:e>=4?24:e>=3?19:14,A=T117?.28:e>=4?.5:.38;ctx.save();ctx.globalCompositeOperation='source-over';ctx.lineCap='round';let n=0;
  for(const s of shots){if(s.dead||s.ray28||!s.color)continue;const vx=s.vx||0,vy=s.vy||-600,v=Math.hypot(vx,vy)||1;ctx.globalAlpha=A;ctx.strokeStyle=s.color;ctx.lineWidth=e>=4?3:2;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-vx/v*L,s.y-vy/v*L);ctx.stroke();if(++n>CAP)break;}ctx.restore();}
 try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{trails();}catch{}return r;};}catch{}

 // ---------- ĐẠN theo bậc đột phá (theo video game gốc: thân tàu giữ màu, ĐẠN đổi màu rõ theo bậc, bậc cao nhất vàng kim) ----------
 //  thang màu theo loại đạn (art id 0–9) = [hue +1/+2, hue +3/+4, hue +5]; độ dày đạn +4%/bậc; Bạo Tẩu có hào quang màu bậc, +5 thêm cánh sáng vàng.
 const LADDER=[[15,340,45],[140,210,32],[175,270,45],[140,280,45],[320,205,45],[160,232,45],[190,280,12],[24,300,45],[330,190,45],[180,300,45]];
 const lvIdx=e=>e>=5?2:e>=3?1:0;
 const TS=new Map();
 function recolor(src,hue,sat=1.08){if(!src)return src;const w=src.width,h=src.height;if(!w||!h)return src;const c=mk(w,h),g=c.getContext('2d');g.drawImage(src,0,0);let d;try{d=g.getImageData(0,0,w,h);}catch{return src;}const p=d.data,H=hue/360;
  for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;let [hh,ss,ll]=rgb2hsl(p[i],p[i+1],p[i+2]);if(ss<.12)continue;const [r,gg,b]=hsl2rgb(H,Math.min(1,ss*sat),ll);p[i]=r;p[i+1]=gg;p[i+2]=b;}g.putImageData(d,0,0);return c;}
 function tierSet(id,sp,li){const k=id+'|'+li;let o=TS.get(k);if(o)return o;const hue=LADDER[id%10][li];
  const fr=l=>l?l.map(f=>({...f,img:recolor(f.img,hue)})):null;o={main:fr(sp.main),alt:fr(sp.alt),beam:sp.beam?recolor(sp.beam,hue):null,star:sp.star?recolor(sp.star,hue):null,hue};TS.set(k,o);return o;}
 function shotE(){try{if(activeRobot)return 0;if(evoE(selected))return 0;return Math.min(5,realE(selected));}catch{return 0;}}
 function withTier(s,fn){const e=shotE();if(!e||!s||typeof ShotV2==='undefined')return fn();const SP=ShotV2.sprites,id=s.art28??0,sp=SP[id]||SP[0];if(!sp)return fn();
  const o=tierSet(SP[id]?id:0,sp,lvIdx(e)),m0=sp.main,a0=sp.alt,b0=sp.beam,st0=sp.star,sc0=s.scale30;sp.main=o.main;if(a0)sp.alt=o.alt;if(b0&&o.beam)sp.beam=o.beam;if(st0&&o.star)sp.star=o.star;if(sc0!=null)s.scale30=sc0*(1+.04*e);
  try{return fn();}finally{sp.main=m0;sp.alt=a0;sp.beam=b0;sp.star=st0;if(sc0!=null)s.scale30=sc0;}}
 try{const oa=Arsenal30.draw;Arsenal30.draw=function(g,s){return withTier(s,()=>oa.apply(this,arguments));};}catch{}
 try{const ol=PlayerFXB.laser;PlayerFXB.laser=function(s){return withTier(s,()=>ol.apply(this,arguments));};}catch{}
 function aura(){if(mode!=='play'||!(superTime>0)||window.__clean118)return;if(window.AURA85&&!AURA85.allow('skin'))return;const e=shotE();if(!e)return;const hue=LADDER[(selected|0)%10][lvIdx(e)],q=(()=>{try{return VisualFX.reduced();}catch{return false;}})();
  const x=player.x,y=player.y,R=34+e*7,n=8+e*2;ctx.save();ctx.globalCompositeOperation='lighter';
  const g=ctx.createRadialGradient(x,y,4,x,y,R*1.4);g.addColorStop(0,`hsla(${hue},100%,70%,.42)`);g.addColorStop(1,`hsla(${hue},100%,50%,0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,R*1.4,0,Math.PI*2);ctx.fill();
  const rot=q?0:time*1.6;ctx.strokeStyle=`hsla(${hue},100%,72%,.55)`;ctx.lineWidth=2;for(let k=0;k<n;k++){const a=rot+k*Math.PI*2/n,r1=R*.7,r2=R*(1.05+.25*Math.sin(time*6+k));ctx.beginPath();ctx.moveTo(x+Math.cos(a)*r1,y+Math.sin(a)*r1);ctx.lineTo(x+Math.cos(a)*r2,y+Math.sin(a)*r2);ctx.stroke();}
  if(e>=5){ctx.fillStyle=`hsla(${hue},100%,62%,.32)`;for(const sd of [-1,1]){ctx.beginPath();ctx.moveTo(x+sd*14,y+6);ctx.quadraticCurveTo(x+sd*92,y-70,x+sd*58,y-120);ctx.quadraticCurveTo(x+sd*70,y-40,x+sd*14,y+18);ctx.closePath();ctx.fill();}}
  ctx.restore();}
 try{const vd2=VisualFX.draw;VisualFX.draw=function(){const r=vd2.apply(this,arguments);try{aura();}catch{}return r;};}catch{}
 // ---------- nguồn skin ----------
 function giveShard(id,n){const k=byId(id);if(!k||S.own[id])return;S.sh[id]=(S.sh[id]|0)+n;if(k.shards&&S.sh[id]>=k.shards){S.own[id]=1;S.sh[id]=0;try{toast('✦ MỞ SKIN '+k.n.toUpperCase()+'!');}catch{}}save();}
 function giveOwn(id){if(!byId(id)||S.own[id])return;S.own[id]=1;save();try{toast('✦ NHẬN SKIN '+byId(id).n.toUpperCase());}catch{}}
 try{const ors=Progress.rewardStage;Progress.rewardStage=function(stage){const r=ors.apply(this,arguments);try{const m=SKIN69.milestone[stage];if(m&&!S.mile[stage]&&r){S.mile[stage]=1;if(m.own)giveOwn(m.own);if(m.sh)giveShard(m.sh[0],m.sh[1]);save();if(Array.isArray(r.materials))r.materials.push(m.own?'Skin '+byId(m.own).n:'+'+m.sh[1]+' mảnh skin '+byId(m.sh[0]).n);}}catch{}return r;};}catch{}
 function spinLeft(){if(S.spin.d!==day())return SKIN69.spin.free;return Math.max(0,SKIN69.spin.free-S.spin.n);}
 function spin(){const free=spinLeft()>0;if(!free){let ok=false;try{ok=Meta407.spendCores(SKIN69.spin.cost);}catch{}if(!ok){toast('CẦN '+SKIN69.spin.cost+' LÕI ĐỂ QUAY THÊM');return null;}}
  if(S.spin.d!==day())S.spin={d:day(),n:0};S.spin.n++;const T=SKIN69.spin.table,tot=T.reduce((a,b)=>a+b[0],0);let r=Math.random()*tot,row=T[0];for(const t of T){if((r-=t[0])<0){row=t;break;}}
  let txt='';if(row[1]==='sh'){if(S.own[row[2]]){try{Meta407.addCores(15);}catch{}txt='+15 lõi (đã có skin '+byId(row[2]).n+')';}else{giveShard(row[2],row[3]);txt='+'+row[3]+' mảnh skin '+byId(row[2]).n;}}
  else if(row[1]==='cr'){try{Progress.grantCredits(row[2]);}catch{}txt='+'+row[2].toLocaleString('vi-VN')+' hợp kim';}
  else{try{const ty=['alloy','crystal','circuit','plasma'][Math.floor(Math.random()*4)];Adv69.add(ty+'1',row[2]);txt='+'+row[2]+' '+Adv69.matName(ty+'1');}catch{txt='+1000 hợp kim';try{Progress.grantCredits(1000);}catch{}}}
  // V91 · REVIEW91 GACHAPON_PITY_V91: bảo hiểm 50 lượt → 1 skin chưa có; đủ skin → 1 bản sao chiến cơ Tím Lv1 + 50.000 ◈ (trường phụ S.pity trong key cũ)
  if(window.PITY91!==false){S.pity=(S.pity|0)+1;if(S.pity>=50){S.pity=0;const L=SKIN69.list.filter(k=>k.shards&&!S.own[k.id]);
   if(L.length){const k=L[Math.floor(Math.random()*L.length)];giveShard(k.id,Math.max(1,k.shards-(S.sh[k.id]|0)));txt+=' · 🎁 BẢO HIỂM: skin '+k.n;}
   else{let nm='';try{const m=Math.floor(Math.random()*13);Evo82.addCopy('craft',m,6,1,true);nm='bản sao Tím Lv1';}catch{}try{Progress.grantCredits(50000);}catch{}txt+=' · 🎁 BẢO HIỂM: '+(nm?nm+' + ':'')+'50.000 hợp kim';}}}
  save();return txt;}
 // ---------- tủ skin ----------
 let el=null,cur=0;
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 function drawPrev(cv,id,skin){const g=cv.getContext('2d');g.clearRect(0,0,cv.width,cv.height);preview=skin==='__real'?null:{id,skin};let h;try{const save0=S.eq[id];if(skin==='__real'){h=Evo53.hull(id);}else if(skin==='__none'){S.eq[id]=null;preview=null;h=Evo53.hull(id);S.eq[id]=save0;}else h=Evo53.hull(id);}catch{h=fighterAtlasV22;}preview=null;
  if(!h)return;const w=(h.naturalWidth||h.width)/5,hh=(h.naturalHeight||h.height)/4;try{g.drawImage(h,id%5*w,Math.floor(id/5)*hh,w,hh,4,4,cv.width-8,cv.height-8);}catch{}}
 function build(){el=document.createElement('div');el.className='m63 sk69';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-k]');if(!t){if(e.target===el)close();return;}const a=t.dataset.k,v=t.dataset.v;
   if(a==='close')close();else if(a==='tr82'){close();try{Trade67.open('skin');}catch{}}else if(a==='ship'){cur=+v;render();}else if(a==='wear'){S.eq[cur]=v==='none'?null:v;save();render();}else if(a==='w86'){try{Art86.wear(cur,v==='on');}catch{}render();}else if(a==='b86'){try{Art86.buy(cur);}catch{}render();}
   else if(a==='buy'){const k=byId(v);let ok=false;try{ok=Meta407.spendCores(k.cost);}catch{}if(ok){S.own[v]=1;save();toast('✦ ĐÃ MUA SKIN '+k.n.toUpperCase());}else toast('CẦN '+k.cost+' LÕI');render();}
   else if(a==='spin'){const r=spin();if(r){const b=el.querySelector('.sk-res');if(b)b.textContent='🎁 '+r;}setTimeout(render,900);}});}
 function close(){if(el)el.hidden=true;}
 function owned(i){try{return Campaign36.ownsCraft(i);}catch{return i===0;}}
 function render(){if(!el)build();migrate();let cores=0;try{cores=Meta407.cores();}catch{}const e=realE(cur);let nm='Chiến cơ';try{nm=Fighters28.profiles[cur].name;}catch{}
  const ships=[...Array(window.Art86?13:10).keys()].filter(owned);if(!ships.includes(cur))cur=ships[0]||0;
  if(cur>=10&&window.Art86)return render86(ships,nm,e);
  const opts=[{id:'none',n:'Màu đột phá +'+e,own:1,desc:'Màu gốc, rõ nét theo bậc đột phá'}].concat(SKIN69.list.map(k=>({...k,own:!!S.own[k.id]})));
  el.innerHTML=`<div class="m63-card sk-card"><div class="m63-eye">TỦ SKIN · THÂN CHIẾN CƠ</div><h3>${esc(nm)} <small>+${e}</small></h3><p class="sk81">Đang xem skin cho chiến cơ <b>#${cur+1} ${esc(nm)}</b>. Mua 1 lần, mặc được cho mọi chiến cơ bạn có. Bấm tên chiến cơ bên dưới để đổi.</p>
   <div class="sk-ships">${ships.map(i=>`<button data-k="ship" data-v="${i}" aria-pressed="${i===cur}" title="${esc((()=>{try{return Fighters28.profiles[i].name;}catch{return '';}})())}">#${i+1} ${esc((()=>{try{return Fighters28.profiles[i].name.split(' ').slice(-2).join(' ');}catch{return '';}})())}</button>`).join('')}</div>
   <div class="sk-grid">${opts.map(o=>{const on=(S.eq[cur]||'none')===o.id;const prog=!o.own&&o.shards?`<small>Mảnh ${S.sh[o.id]|0}/${o.shards}</small>`:'';
    const act=o.own?(on?'<em>ĐANG MẶC</em>':`<button data-k="wear" data-v="${o.id}">MẶC</button>`):(o.cost?`<button data-k="buy" data-v="${o.id}" class="${cores>=o.cost?'hot':''}">${o.cost} lõi</button>`:'<em class="lk">🔒</em>');
    return `<div class="sk-it ${on?'on':''} ${o.own?'':'locked'}" style="--sc:${o.col||'#7fd0ff'}"><canvas width="120" height="120" data-pv="${o.id}"></canvas><b>${esc(o.n)}</b>${prog}${act}</div>`;}).join('')}</div>
   <p class="sk-note">Skin chỉ đổi ngoại hình. Sức mạnh và hiệu ứng tấn công vẫn theo bậc đột phá thật. Nhận skin: mua bằng lõi · quay thưởng · quà ải 40/80/120/160.</p>
   <div class="sk-spin"><div><b>QUAY THƯỞNG</b><small>${spinLeft()?'Miễn phí hôm nay: '+spinLeft():SKIN69.spin.cost+' lõi / lượt'} · Lõi: ${cores}${window.PITY91!==false?'<br>Bảo hiểm ngoại trang: '+(S.pity|0)+'/50':''}</small><span class="sk-res"></span></div><button data-k="spin" class="hot">QUAY</button></div>
   <div class="adv-btns" style="display:flex;margin-top:10px;gap:8px"><button class="m63-go" data-k="tr82">SKIN ĐẠN · KHUNG · NỔ ›</button><button class="m63-go" data-k="close">ĐÓNG</button></div></div>`;
  el.hidden=false;el.querySelectorAll('canvas[data-pv]').forEach(cv=>drawPrev(cv,cur,cv.dataset.pv==='none'?'__none':cv.dataset.pv));}
 // V86 · chiến cơ #11–#13: skin riêng (tranh GPT), 0 chỉ số
 function render86(ships,nm,e){const sk=Art86.SK.find(x=>x.i===cur);const own=Art86.own(sk.k),on=Art86.eqOf(cur)===sk.k;let tok=0;try{tok=V77.state().tok|0;}catch{}
  const shipBtns=ships.map(i=>`<button data-k="ship" data-v="${i}" aria-pressed="${i===cur}">#${i+1} ${esc((()=>{try{return Fighters28.profiles[i].name.split(' ').slice(-2).join(' ');}catch{return '';}})())}</button>`).join('');
  const pv=(k,sup)=>{const im=Art86.img('skin_'+k+(sup?'_super':''));return im?`<img src="${im.src}" alt="" style="width:110px;height:110px;object-fit:contain">`:'';};
  let base='';try{const im=Ship83.thumb(cur);base=im?`<img src="${im}" alt="" style="width:110px;height:110px;object-fit:contain">`:'';}catch{}
  const act=own?(on?'<em>ĐANG MẶC</em>':'<button data-k="w86" data-v="on">MẶC</button>'):(sk.cost?`<button data-k="b86" class="${tok>=sk.cost?'hot':''}">${sk.cost} Xu Tinh Anh</button>`:'<em class="lk">🔒</em>');
  el.innerHTML=`<div class="m63-card sk-card"><div class="m63-eye">TỦ SKIN · THÂN CHIẾN CƠ</div><h3>${esc(nm)}</h3><p class="sk81">Chiến cơ <b>#${cur+1}</b> có skin riêng. Skin chỉ đổi ngoại hình, 0 chỉ số.</p>
   <div class="sk-ships">${shipBtns}</div>
   <div class="sk-grid"><div class="sk-it ${on?'':'on'}" style="--sc:#7fd0ff">${base}<b>Mặc định</b>${on?'<button data-k="w86" data-v="off">MẶC</button>':'<em>ĐANG MẶC</em>'}</div>
    <div class="sk-it ${on?'on':''} ${own?'':'locked'}" style="--sc:${sk.col}">${pv(sk.k,false)}<b>${esc(sk.n)}</b><small>${own?'Đã có':esc(sk.how)+' · '+esc(Art86.progress(sk))}</small>${act}</div>
    <div class="sk-it ${own?'':'locked'}" style="--sc:${sk.col}">${pv(sk.k,true)}<b>Bạo Tẩu</b><small>Hình khi bật Bạo Tẩu</small></div></div>
   <div class="adv-btns" style="display:flex;margin-top:10px;gap:8px"><button class="m63-go" data-k="tr82">SKIN ĐẠN · KHUNG · NỔ ›</button><button class="m63-go" data-k="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function open(){try{cur=selected;}catch{}render();}
 // nút mở: Kho (.h1-fx) + cột trái Sảnh (.dk67)
 setInterval(()=>{try{hookHull();migrate();const fx=document.querySelector('#hgr41 .h1-fx');if(fx&&!fx.querySelector('[data-sk69]')){const b=document.createElement('button');b.dataset.sk69=1;b.className='adv69b';b.textContent='TỦ SKIN';b.addEventListener('click',e=>{e.stopPropagation();open();});fx.appendChild(b);}
  const dk=document.querySelector('#hgr41 .dk67');if(dk&&!dk.querySelector('[data-sk69]')){const b=document.createElement('button');b.dataset.sk69=1;b.className='dk67b';b.innerHTML='<i><svg viewBox="0 0 24 24"><path d="M8 3l4 2 4-2 5 4-3 3-2-1v12H8V9l-2 1-3-3z"/></svg></i><small>SKIN</small>';b.addEventListener('click',e=>{e.stopPropagation();open();});dk.appendChild(b);}}catch{}},700);
 hookHull();
 return {open,close,evoE,realEOf,realT:()=>{try{return activeRobot?0:tierN(realE(selected));}catch{return 0;}},state:()=>JSON.parse(JSON.stringify(S)),spin,giveShard,giveOwn,enhanceCell};
})();
