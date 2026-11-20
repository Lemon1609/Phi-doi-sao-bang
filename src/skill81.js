// V82 · ĐỢT 2 REVIEW81: 9 KỸ NĂNG MỚI CHO BỘ 6–8 (thay kỹ năng mượn bộ 0–5)
//  Bộ 6 Lò Rèn: aurora36 FORGE_PULSE · comet36 SWORD_RAIN · lance36 DRILL_LANCE
//  Bộ 7 Vực Tối: void36 SHADOW_CLOAK · nova36 RIFT_TORPEDO · orbit36 HORIZON_TETHER
//  Bộ 8 Bình Minh: seraph36 SERAPH_WINGS · judgement36 PILLAR_OF_DAWN · halo36 ECLIPSE_CHAKRAM
//  Số liệu khung W/G/B/P theo Gemini (số lượng, hồi chiêu, bán kính, độ rộng). Sát thương QUY về đường sát thương sẵn có:
//  mỗi lượt ≈ 1,1 × lượt bắn gốc cùng phẩm chất (đánh 1 mục tiêu); kỹ năng diện rộng mạnh hơn khi đông quái.
//  Hiệu ứng mức Siêu = khung Tím. Tắt: window.SKILL81=false (về kỹ năng mượn cũ)
const SKILL81={
 aurora36:{cd:[18,16,14,12],melt:[4,6,8,12],dmg:[1.2,1.6,2.1,2.8],skill:'Lò Phản Ứng Nhiệt Hạch'},
 void36:{cd:[18,16,14,12],cloak:[2.5,3,3.8,4.5],nova:[.9,1.3,1.8,2.4],skill:'Áo Choàng Bóng Tối'},
 seraph36:{cd:[22,20,18,15],red:[.35,.45,.55,.65],heal:[.06,.08,.10,.14],skill:'Đôi Cánh Thánh Dực'},
 comet36:{n:[2,2,3,4],skill:'Kiếm Vũ Thiên Không'},
 nova36:{n:[2,2,3,4],rad:[55,65,75,90],skill:'Ngư Lôi Không Gian'},
 judgement36:{n:[1,2,2,3],w:[32,38,44,52],skill:'Cột Sáng Phán Quyết'},
 lance36:{tick:[.25,.35,.45,.6],burst:[.9,1.2,1.6,2.1],skill:'Mũi Thương Xuyên Giáp'},
 orbit36:{w:[110,135,160,195],slow:[.15,.2,.25,.35],skill:'Dây Xích Sự Kiện'},
 halo36:{r:[24,28,32,38],skill:'Vòng Nhật Thực'},
 // V83 · bộ 10–12 (REVIEW81 §4B) — đi kèm chiến cơ #11–#13
 devour10_a:{cd:[18,16,14,12],req:[6,6,5,5],heal:[.05,.06,.07,.08],skill:'Hấp Thụ Tinh Năng'},
 devour10_m:{slow:[.06,.08,.10,.12],skill:'Truy Kích Huyết Tinh'},
 devour10_s:{cap:[1,2,2,3],skill:'Thôn Phệ Đạn'},
 chrono11_a:{cd:[45,42,38,35],rec:[.6,.75,.9,1],skill:'Tua Ngược Thời Gian'},
 chrono11_m:{echo:[.5,.6,.68,.75],skill:'Nổ Vọng Thời Gian'},
 chrono11_s:{r:[75,85,95,110],slow:[.2,.25,.3,.35],skill:'Trường Lực Thời Gian'},
 monarch12_a:{cd:[24,22,20,18],start:[1,1,2,2],clear:[100,115,125,140],skill:'Khiên Hoàng Quyền'},
 monarch12_m:{n:[1,1,2,2],w:[65,75,85,95],skill:'Trảm Không Gian'},
 monarch12_s:{n:[2,3,3,4],skill:'Ấn Triện Hắc Quang'}};
const GEAR83={devour10_a:{kind:'armor',name:'Giáp Phệ Tinh',behavior:'nanite',color:'#b45cff',set:10},devour10_m:{kind:'missiles',name:'Tên Lửa Huyết Tinh',behavior:'spiral',color:'#ff5a8a',set:10},devour10_s:{kind:'sidearm',name:'Hạt Nhân Thôn Phệ',behavior:'gravity',color:'#9b5cff',set:10},
 chrono11_a:{kind:'armor',name:'Giáp Nghịch Thời',behavior:'phase',color:'#5fe6ff',set:11},chrono11_m:{kind:'missiles',name:'Tên Lửa Quá Khứ',behavior:'stellar',color:'#7fe8ff',set:11},chrono11_s:{kind:'sidearm',name:'Đồng Hồ Cát Tinh Hà',behavior:'prism',color:'#9ff3ff',set:11},
 monarch12_a:{kind:'armor',name:'Giáp Hoàng Đế',behavior:'aegis',color:'#ffd36a',set:12},monarch12_m:{kind:'missiles',name:'Tên Lửa Trảm Không',behavior:'singularity',color:'#e9c86a',set:12},monarch12_s:{kind:'sidearm',name:'Ấn Triện Hư Không',behavior:'rail',color:'#c9a8ff',set:12}};
(()=>{try{for(const [id,d] of Object.entries(GEAR83)){if(!GearCatalog[id])GearCatalog[id]={...GearCatalog[d.behavior],kind:d.kind,name:d.name,color:d.color,skill:SKILL81[id].skill,behavior:d.behavior};
   if(typeof ACTIVE_GEAR_MODELS!=='undefined'&&!ACTIVE_GEAR_MODELS.includes(id))ACTIVE_GEAR_MODELS.push(id);(window.GEAR81_NODROP=window.GEAR81_NODROP||{})[id]=1;}
  const S=Campaign36.sets;S[10]=S[10]||['devour10_a','devour10_m','devour10_s'];S[11]=S[11]||['chrono11_a','chrono11_m','chrono11_s'];S[12]=S[12]||['monarch12_a','monarch12_m','monarch12_s'];
  const st83=()=>{if(typeof STONE71!=='undefined'&&STONE71.ab){const ab=STONE71.ab;for(const [id,d] of Object.entries(GEAR83)){if(ab[id])continue;const pos=d.kind;ab[id]={pos,pa:'alpha',a:{n:d.name.split(' ').slice(-2).join(' ')+' α',e:[['dmg',.30]],d:'+{p} sát thương món này'},b:{n:d.name.split(' ').slice(-2).join(' ')+' β',e:[['dmg',.30,'boss']],d:'Đánh boss: +{p} sát thương món này'}};}}};st83();setTimeout(st83,800);}catch(e){console.warn('gear83',e);}})();
const Skill81=(()=>{
 const on=()=>window.SKILL81!==false;
 const X=()=>window.__eq81||null;
 const tier=i=>{try{return Gear81.tierOf(i);}catch{return 0;}};
 const mul=()=>{let m=1;try{m*=gearBattleBoost().damage||1;}catch{}try{m*=gear.damage||1;}catch{}try{m*=BALANCE.allyDamage||1;}catch{}return m;};
 const base=i=>{const s=i.spec||{};let ex=0;try{ex=gearBattleBoost().extra|0;}catch{}return (i.auxDamage||s.damage||2)*Math.max(1,(s.count||1)+ex);};
 const armorBase=i=>(i.auxDamage||(i.spec&&i.spec.damage)||2.3);
 const sup=()=>{try{return superTime>0;}catch{return false;}};
 const alive=()=>{const L=[];try{for(const e of enemies)if(!e.dead&&e.y>-30&&e.y<H)L.push(e);if(boss&&!boss.dead)L.push(boss);}catch{}return L;};
 const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 // V148: đòn thường mang mã món → nội tại Đợt 2 (noi_tai147.js, window.NT147_PRE trả {d, post})
 function hurtV(i,e,d){const P=window.NT147_PRE;let post=null;if(P){try{const r=P(i,e,d);if(r){d=r.d;post=r.post;}}catch{}}hurt(e,d);if(post)try{post();}catch{}}
 function hurt(e,d){const x=X();if(!x||!e)return;try{x.hurt(e,d);}catch{}}
 function ring(x0,y0,c,r){const x=X();try{x&&x.ring(x0,y0,c,r);}catch{}}
 let Q=[],V=[],feathers=0,cloakT=0,cloakI=null,prevHp=null,haloCd=0,eat=0,slowT=0,slowK=0,rwCd=0,hpHist=[],fzT=0,mStart=0,prevSh=null;
 function checkEat(i,t){const D=SKILL81.devour10_a;if(eat<D.req[t])return;eat=0;try{hp=Math.min(maxHp,hp+maxHp*D.heal[t]);}catch{}ring(player.x,player.y,'#ff5a8a',70);if(t>=3){for(const e of alive())if(dist(e,player)<120)hurt(e,armorBase(i)*1.0*mul());fx({k:'pulse',x:player.x,y:player.y,r:120,life:.45,c:'#b45cff'});}}
 const later=(t,fn)=>Q.push({t,fn});
 const fx=(o)=>{V.push(o);if(V.length>40)V.shift();};
 const img=k=>{try{return Art82&&GEAR44_ASSETS[k]?(IMC[k]||(IMC[k]=Object.assign(new Image(),{src:GEAR44_ASSETS[k]}))):null;}catch{return null;}};
 // V149: đạn GPT Phần J (dải 4 khung <mã>_projectile_normal|super) cho đòn Skill81. Tắt: window.ART149=false
 /* V180 · SSS có món mẹ Bộ 07–13 → đạn / tia lấy tranh SSS (<sss>_pn/_ps 4 khung, <sss>_g_beam_*). Tắt: window.SSSART=false */let S8={},S8t=0;const s81=id=>{const n=performance.now();if(n-S8t>300){S8={};S8t=n;}if(id in S8)return S8[id];return S8[id]=s81x(id);};const s81x=id=>{try{if(window.SSSART===false||typeof Gear44==='undefined')return null;for(const k of ['sidearm','missiles']){const sid=Gear44.activeId(k);if(!sid||sid===id)continue;const d=Gear44.defs().find(x=>x.id===sid);if(d&&d.parents&&d.parents.includes(id))return sid;}}catch{}return null;};
 function pj(id,sup,age){if(window.ART149===false)return null;let u=null;const _s=s81(id);try{u=(_s&&GEAR44_ASSETS[_s+(sup?'_ps':'_pn')])||GEAR44_ASSETS[id+'_projectile_'+(sup?'super':'normal')];if(_s&&GEAR44_ASSETS[_s+(sup?'_ps':'_pn')])id=_s;}catch{}if(!u)return null;const k='pj:'+id+(sup?'s':'n');const im=IMC[k]||(IMC[k]=Object.assign(new Image(),{src:u}));if(!im.complete||!im.naturalWidth)return null;const cw=im.naturalWidth/4;return {im,sx:Math.floor((age||0)*12)%4*cw,cw,ch:im.naturalHeight};}
 // V150: tia GPT (ô lặp dọc <mã>_beam_normal|super) — vẽ lặp nối theo trục dọc của ô; xoay để vẽ ngang
 function bm(id,sup){if(window.ART149===false)return null;let u=null;const _s=s81(id);try{u=(_s&&GEAR44_ASSETS[_s+'_g_beam_'+(sup?'super':'normal')])||GEAR44_ASSETS[id+'_beam_'+(sup?'super':'normal')];if(_s&&GEAR44_ASSETS[_s+'_g_beam_'+(sup?'super':'normal')])id=_s;}catch{}if(!u)return null;const k='bm:'+id+(sup?'s':'n');const im=IMC[k]||(IMC[k]=Object.assign(new Image(),{src:u}));return im.complete&&im.naturalWidth?im:null;}
 /* V181 · khung tranh SSS: dải n ô vuông */function sfr(sid,key,n,p){if(!sid)return null;const u=GEAR44_ASSETS[sid+'_'+key];if(!u)return null;const k='sf:'+sid+key;const im=IMC[k]||(IMC[k]=Object.assign(new Image(),{src:u}));if(!im.complete||!im.naturalWidth)return null;const cw=im.naturalWidth/n;return {im,sx:Math.min(n-1,Math.max(0,Math.floor(p*n)))*cw,cw,ch:im.naturalHeight};}
 function sfDraw(g,f,x,y,w,al){if(!f)return;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=al;const h=w*f.ch/f.cw;g.drawImage(f.im,f.sx,0,f.cw,f.ch,x-w/2,y-h/2,w,h);g.restore();}
 function bmDraw(g,im,x,y0,len,w,rot,alpha){if(window.COL190!==false){w=Math.min(72,w);if(typeof superTime!=='undefined'&&superTime>0)alpha*=.8;}/* V190: tia ≤72 px, Bạo Tẩu mờ hơn */const th=w*im.naturalHeight/im.naturalWidth;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=alpha;g.translate(x,y0);if(rot)g.rotate(rot);for(let y=0;y<len;y+=th){const h=Math.min(th,len-y);g.drawImage(im,0,0,im.naturalWidth,im.naturalHeight*h/th,-w/2,y,w,h);}g.restore();}
 function pjDraw(g,f,x,y,h,rot){const w=h*f.cw/f.ch;g.save();g.globalCompositeOperation='source-over';g.translate(x,y);if(rot)g.rotate(rot);g.drawImage(f.im,f.sx,0,f.cw,f.ch,-w/2,-h/2,w,h);g.restore();}const IMC={};
 // ================= GIÁP =================
 function armor(i){if(!on()||!SKILL81[i.variant]||i.kind!=='armor')return false;const t=tier(i),D=SKILL81[i.variant];try{i.spec.cd=D.cd[t];}catch{}
  const P={x:player.x,y:player.y};
  if(i.variant==='aurora36'){// tan chảy đạn gần + xung bỏng
   let n=D.melt[t];try{const bs=bullets.filter(b=>!b.dead&&dist(b,P)<140).sort((a,b)=>dist(a,P)-dist(b,P)).slice(0,n);for(const b of bs)b.dead=true;}catch{}
   const d=armorBase(i)*D.dmg[t]*.5*mul();for(const e of alive())if(dist(e,P)<130)hurt(e,d);
   ring(P.x,P.y,'#ff9a3d',130);ring(P.x,P.y,'#ffe0a0',85);fx({k:'pulse',x:P.x,y:P.y,r:130,life:.45,c:'#ff9a3d'});
   if(t>=3){const x=X();for(let k=0;k<4;k++){const a=k*Math.PI/2+.4;try{x.emitGear(i,P.x,P.y,Math.cos(a)*360,Math.sin(a)*360,'rapid',armorBase(i)*.8,{piercing:true,gearItem:i});}catch{}}}
   return true;}
  if(i.variant==='void36'){// hóa bóng ma: né một phần đạn sát thân, kết thúc nổ bóng tối
   cloakT=D.cloak[t];cloakI=i;ring(P.x,P.y,'#815dff',60);fx({k:'cloak',life:cloakT});return true;}
  if(i.variant==='devour10_a'){// tích năng lượng thôn phệ: mỗi lần kích hoạt +2, khiên đỡ đòn +1 (xử lý trong update)
   eat+=2;ring(P.x,P.y,'#b45cff',50);checkEat(i,t);return true;}
  if(i.variant==='chrono11_a'){ring(P.x,P.y,'#5fe6ff',46);return true;}// bị động: tua ngược trong update
  if(i.variant==='monarch12_a'){try{shield=Math.min(maxShield,shield+1);}catch{}const R=D.clear[t];try{bullets=bullets.filter(b=>dist(b,P)>R);}catch{}ring(P.x,P.y,'#ffd36a',R);fx({k:'pulse',x:P.x,y:P.y,r:R,life:.45,c:'#ffd36a'});return true;}
  if(i.variant==='seraph36'){// tích lông vũ (tối đa 2)
   feathers=Math.min(2,feathers+1);ring(P.x,P.y,'#fff0b0',55);fx({k:'feather',life:.6});return true;}
  return false;}
 // ================= TÊN LỬA + VŨ KHÍ PHỤ =================
 // V149: 5 đòn có sẵn nội tại Gemini → số theo CẤP 1→5 (spec.rank+1) thay bậc khung W/G/B/P. Tắt: window.LV149=false (về D[t])
 const lv149=i=>{let r=0;try{r=(i.spec||gearSpec(i)).rank|0;}catch{}return Math.max(1,Math.min(5,r+1));};
 const G149=(i,a,b,old)=>window.LV149===false?old:a+(b-a)*(lv149(i)-1)/4;
 const slow149=(e,k,d)=>{try{if(k>0&&window.KN146API)KN146API.slow(e,k,d);}catch{}};
 function fire(i){if(!on()||!SKILL81[i.variant]||i.kind==='armor')return false;const t=tier(i),D=SKILL81[i.variant],B=base(i)*1.1*mul(),x=X();if(!x)return false;
  const o=x.origin(i),T=alive();
  const pickTop=()=>T.slice().sort((a,b)=>(b===boss?1e9:b.hp||0)-(a===boss?1e9:a.hp||0))[0];
  if(i.variant==='comet36'){// kiếm bay lên rồi cắm xuống mục tiêu máu cao nhất
   const n=D.n[t];for(let k=0;k<n;k++){const tg=pickTop()||null;fx({k:'swordUp',x:o.x+(k-(n-1)/2)*10,y:o.y,life:.4,v:i.variant});
    later(.4+k*.08,()=>{const e=tg&&!tg.dead?tg:pickTop();if(!e)return;hurtV(i,e,B/n);fx({k:'swordDown',x:e.x,y:e.y,life:.3,v:i.variant});
     if(t>=3)fx({k:'field',x:e.x,y:e.y,r:40,life:2,d:B/n*.4,c:'#ff9a3d'});});}
   return true;}
  if(i.variant==='nova36'){// ngư lôi lặn rồi trồi lên sát mục tiêu nổ chùm
   const n=D.n[t],R=D.rad[t];fx({k:'dive',x:o.x,y:o.y,life:.3,v:'nova36'});
   for(let k=0;k<n;k++){later(.5+k*.07,()=>{const L=alive();if(!L.length)return;const e=L.includes(boss)&&Math.random()<.6?boss:L[Math.floor(Math.random()*L.length)];
     for(const m of alive())if(dist(m,e)<R)hurtV(i,m,B/n*(m===e?1:.5));fx({k:'rift',x:e.x,y:e.y,r:R,life:.4});ring(e.x,e.y,'#b45cff',R);
     if(t>=3){try{const bs=bullets.filter(b=>!b.dead&&dist(b,e)<R).slice(0,3);for(const b of bs)b.dead=true;}catch{}}});}
   return true;}
  if(i.variant==='judgement36'){// ấn ký → cột sáng dọc màn
   const n=D.n[t],w=G149(i,32,55,D.w[t]);const L=T.slice().sort(()=>Math.random()-.5);const xs=[];for(let k=0;k<n;k++){const e=k===0&&L.includes(boss)?boss:L[k%Math.max(1,L.length)];xs.push(e?e.x:player.x+(k-(n-1)/2)*60);}
   for(const cx of xs){fx({k:'mark',x:cx,life:.6});later(.6,()=>{for(const e of alive())if(Math.abs(e.x-cx)<w/2+(e===boss?40:12)){hurtV(i,e,B/n);if(window.LV149!==false&&lv149(i)>=5&&e!==boss&&!e.large&&!e.elite)try{KN146API.stun(e,.5);}catch{}}fx({k:'pillar',x:cx,w,life:.45});
     if(t>=3&&xs.length>1){try{for(const b of bullets)if(!b.dead&&Math.abs(b.x-cx)<w/2)b.dead=true;}catch{}}});}
   return true;}
  if(i.variant==='lance36'){// mũi thương ghim quái lớn / boss, khoan 4 nhịp rồi nổ
   const e=T.filter(e=>e===boss||e.large||e.elite).sort((a,b)=>dist(a,o)-dist(b,o))[0]||T.sort((a,b)=>dist(a,o)-dist(b,o))[0];if(!e)return true;
   const tot=D.tick[t]*4+D.burst[t],k0=B/tot;fx({k:'lance',a:{x:o.x,y:o.y},e,life:.7});
   for(let k=0;k<4;k++)later(.12+k*.12,()=>{if(!e.dead)hurtV(i,e,k0*D.tick[t]);});
   later(.62,()=>{if(e.dead)return;hurtV(i,e,k0*D.burst[t]);ring(e.x,e.y,'#ffd36a',36);if(t>=3){e.crack81=3.5;}});
   return true;}
  if(i.variant==='orbit36'){// dây cáp tia tối quét lên cắt ngang đội hình
   const w=G149(i,120,200,D.w[t]),hit=new Set();const y0=player.y-30;fx({k:'tether',x:player.x,y0,w,life:.6});
   for(let k=1;k<=6;k++)later(k*.1,()=>{const y=y0-(y0+20)*k/6;for(const e of alive()){if(hit.has(e))continue;if(Math.abs(e.x-player.x)<w/2+(e===boss?40:10)&&Math.abs(e.y-y)<34){hit.add(e);hurtV(i,e,B*G149(i,.6,1,.6));try{if(e!==boss)e.frozen=Math.max(e.frozen||0,.2+D.slow[t]);}catch{}slow149(e,G149(i,0,.35,0),2);}}
     if(t>=3&&k===6&&hit.size>=3){for(const e of hit)if(e!==boss&&!e.large&&!e.dead)e.x+=(player.x-e.x)*.35;}});
   return true;}
  if(i.variant==='devour10_m'){// tên lửa sinh học bám mục tiêu, làm chậm đạn boss
   const n=Math.max(1,(i.spec&&i.spec.count)||1);for(let k=0;k<n;k++){try{const b=x.emitGear(i,o.x+(k-(n-1)/2)*8,o.y-12,(k-(n-1)/2)*60,-300,'missile',B/n/mul(),{homingSpeed:420,gearItem:i,blast:t>=2,blastRadius:40});if(b)b.d81=1;}catch{}}
   slowT=2;slowK=D.slow[t];if(t>=3)later(.8,()=>{const e=pickTop();if(e){hurtV(i,e,B*.25);fx({k:'rift',x:e.x,y:e.y,r:30,life:.3});}});return true;}
  if(i.variant==='devour10_s'){// quả cầu tối trước mũi tàu: nuốt đạn rồi bắn tia máu
   const O={x:player.x,y:player.y-100};let got=0;try{const bs=bullets.filter(b=>!b.dead&&dist(b,O)<60).sort((a,b)=>dist(a,O)-dist(b,O)).slice(0,D.cap[t]);for(const b of bs){b.dead=true;got++;}}catch{}
   const e=pickTop();fx({k:'orb',x:O.x,y:O.y,life:.5});if(e){hurtV(i,e,B*(1+(t>=3?.05*got:0)+got*.08));fx({k:'beam',a:O,b:{x:e.x,y:e.y},life:.25,c:'#ff4a7a',v:'devour10_s'});}return true;}
  if(i.variant==='chrono11_m'){// nổ rồi để lại bóng thời gian nổ lại sau 1 giây
   const n0=Math.max(1,(i.spec&&i.spec.count)||1),n=window.TB309QD===false?n0:Math.max(3,n0)/* V309 loạt ≥3 viên, chia đều sát thương */,ec=G149(i,.45,.9,D.echo[t]),f1=B/(1+ec);for(let k=0;k<n;k++){const e0=T.length?T[Math.floor(Math.random()*T.length)]:null;if(!e0)break;const px=e0.x,py=e0.y,dl=window.TB309QD===false?0:k*.12;later(dl,()=>fx({k:'dive',x:o.x,y:o.y,life:.35,v:'chrono11_m',tx:px,ty:py,sd:k%2?1:-1}));
    later(.35+dl,()=>{for(const m of alive())if(Math.hypot(m.x-px,m.y-py)<50)hurtV(i,m,f1/n);fx({k:'echo',x:px,y:py,life:1});ring(px,py,'#7fe8ff',50);});
    later(1.35+dl,()=>{for(const m of alive())if(Math.hypot(m.x-px,m.y-py)<50){hurtV(i,m,f1*ec/n);if(window.LV149!==false&&lv149(i)>=5)slow149(m,.3,1);}ring(px,py,'#c9f6ff',50);if(t>=3){try{for(const b of bullets)if(!b.dead&&Math.hypot(b.x-px,b.y-py)<50)b.dead=true;}catch{}}});}
   return true;}
  if(i.variant==='chrono11_s'){// trường lực thời gian: chậm đạn địch, gây sát thương quái bên trong
   const R=G149(i,75,120,D.r[t]),iv=Math.max(.4,i.interval||1);fx({k:'hg',x:player.x,y:player.y-150,r:R,life:iv*1.2,d:B/iv/1.2,sl:G149(i,.2,.45,D.slow[t])});return true;}
  if(i.variant==='monarch12_m'){// lưỡi đao bán nguyệt bay lên cắt xuyên
   const n=D.n[t],w=G149(i,65,100,D.w[t]),WV=window.TB309QD===false?1:2/* V309: mỗi cột 2 đợt cách 0,22 s, mỗi đợt 1/2 sát thương */;for(let k=0;k<n*WV;k++){const wv=Math.floor(k/n),kk=k%n,dl=wv*.22,cx=player.x+(n>1?(kk?1:-1)*30:0),hit=new Set(),y0=player.y-30;later(dl,()=>fx({k:'cleave',x:cx,y0,w,life:.55,x2:t>=3&&n>1?(kk?-1:1):0}));
     for(let j=1;j<=6;j++)later(dl+j*.09,()=>{const y=y0-(y0+20)*j/6;for(const e of alive()){if(hit.has(e))continue;if(Math.abs(e.x-cx)<w/2+(e===boss?40:10)&&Math.abs(e.y-y)<30){hit.add(e);hurtV(i,e,B*.7/n/WV);if(hit.size===1&&window.TB309)try{TB309.ring(e.x,e.y,'monarch12_m',46)}catch{}}}
      if(t>=3){try{for(const b of bullets)if(!b.dead&&Math.abs(b.x-cx)<w/2&&Math.abs(b.y-y)<30&&(b.needle||b.type==='needle'))b.dead=true;}catch{}}});}
   return true;}
  if(i.variant==='monarch12_s'){// ấn triện bắn chùm tia laze đen xuyên giáp
   const n=D.n[t];let pods=[];try{pods=Battle28.support();}catch{}if(!pods.length)pods=[{x:player.x-60,y:player.y},{x:player.x+60,y:player.y}];
   for(let k=0;k<n;k++){const e=k===0?pickTop():T[Math.floor(Math.random()*Math.max(1,T.length))];if(!e)break;const pd=pods[k%pods.length];hurtV(i,e,B/n*(t>=3&&e===boss?1.25:1));fx({k:'beam',a:{x:pd.x,y:pd.y-10},b:{x:e.x,y:e.y},life:.2,c:'#2a0f3d',c2:'#c9a8ff',v:'monarch12_s'});}
   return true;}
  if(i.variant==='halo36'){// cặp vòng boomerang: đi và về
   const r=D.r[t],tg=T.includes(boss)?boss:T.sort((a,b)=>dist(a,o)-dist(b,o))[0];const tx=tg?tg.x:player.x,ty=tg?tg.y-30:player.y-320;
   for(const side of [-1,1]){fx({k:'halo',sx:player.x+side*30,sy:player.y-20,tx:tx+side*40,ty,life:.9,side,r});
    for(const [tt,f] of [[.42,.45],[.88,.55]]){later(tt,()=>{const px=tt<.5?tx+side*40:player.x+side*20,py=tt<.5?ty:player.y-60;for(const e of alive())if(Math.hypot(e.x-px,e.y-py)<r+(e===boss?50:16))hurtV(i,e,B*f/2);});}}
   if(t>=3)later(.9,()=>{if(sup()&&haloCd<=0){try{superTime+=1.5;}catch{}haloCd=6;ring(player.x,player.y,'#fff0b0',50);}});
   return true;}
  return false;}
 // ================= cập nhật / vẽ =================
 function update(dt){if(!on())return;haloCd=Math.max(0,haloCd-dt);
  for(const q of Q)q.t-=dt;const due=Q.filter(q=>q.t<=0);Q=Q.filter(q=>q.t>0);for(const q of due){try{q.fn();}catch{}}
  for(const v of V){v.life-=dt;if(v.k==='field'&&v.life>0){for(const e of alive())if(dist(e,v)<v.r)hurt(e,v.d*dt);}}V=V.filter(v=>v.life>0);
  // Áo choàng bóng tối: 35% đạn lọt sát thân bị hút vào bóng tối
  if(cloakT>0){cloakT-=dt;try{for(const b of bullets)if(!b.dead&&!b.c81&&dist(b,player)<26){b.c81=1;if(Math.random()<.35)b.dead=true;}}catch{}
   if(cloakT<=0&&cloakI){const t=tier(cloakI),d=armorBase(cloakI)*SKILL81.void36.nova[t]*.5*mul();for(const e of alive())if(dist(e,player)<110)hurt(e,d);ring(player.x,player.y,'#815dff',110);
    if(t>=3){fx({k:'decoy',x:player.x,y:player.y,life:2.5});}cloakI=null;}}
  for(const v of V)if(v.k==='decoy'){try{for(const b of bullets)if(!b.dead&&dist(b,v)<48)b.dead=true;}catch{}}
  // Đôi cánh thánh dực: trúng đòn mất máu → tiêu 1 lông vũ, giảm sát thương + hồi máu
  let hpNow=null;try{hpNow=hp;}catch{}
  if(prevHp!=null&&hpNow!=null&&hpNow<prevHp&&feathers>0&&hpNow>0){const i=(gear.equipment||[]).find(x=>x.variant==='seraph36');if(i){const t=tier(i),D=SKILL81.seraph36,lost=prevHp-hpNow;feathers--;
    try{hp=Math.min(maxHp,hpNow+lost*D.red[t]+maxHp*D.heal[t]);hpNow=hp;}catch{}ring(player.x,player.y,'#fff0b0',60);fx({k:'feather',life:.6});}}
  if(feathers>=2){const i=(gear.equipment||[]).find(x=>x.variant==='seraph36');if(i&&tier(i)>=3){haloT=(haloT||0)-dt;if(haloT<=0){haloT=5;const x=X();for(let k=0;k<6;k++){const a=-Math.PI/2+(k-2.5)*.22;try{x.emitGear(i,player.x,player.y-10,Math.cos(a)*520,Math.sin(a)*520,'laser',armorBase(i)*.5,{piercing:true,gearItem:i});}catch{}}}}}
  // V83 bộ 10–12 (bị động)
  const eqv=v=>(gear.equipment||[]).find(x=>x.variant===v);
  let shNow=null;try{shNow=shield;}catch{}
  {const a=eqv('devour10_a');if(a&&prevSh!=null&&shNow!=null&&shNow<prevSh){eat++;checkEat(a,tier(a));}}
  if(slowT>0){slowT-=dt;try{for(const b of bullets)if(!b.dead&&!b.s83&&(b.boss75||b.fromBoss||boss)){b.s83=1;b.vx*=(1-slowK);b.vy*=(1-slowK);}}catch{}}
  {const a=eqv('chrono11_a');rwCd=Math.max(0,rwCd-dt);if(a&&hpNow!=null){hpHist.push([time,hpNow]);while(hpHist.length&&time-hpHist[0][0]>2)hpHist.shift();const top=Math.max(...hpHist.map(h=>h[1]));
    if(rwCd<=0&&hpNow>0&&top-hpNow>maxHp*.25){const t=tier(a),D=SKILL81.chrono11_a;try{hp=Math.min(maxHp,hpNow+(top-hpNow)*D.rec[t]);hpNow=hp;}catch{}rwCd=D.cd[t];hpHist=[];ring(player.x,player.y,'#5fe6ff',80);fx({k:'rewind',life:.8});
     if(t>=3){fzT=2;try{for(const b of bullets){b.fz83=[b.vx,b.vy];b.vx*=.08;b.vy*=.08;}}catch{}}}}}
  if(fzT>0){fzT-=dt;if(fzT<=0){try{for(const b of bullets)if(b.fz83){b.vx=b.fz83[0];b.vy=b.fz83[1];delete b.fz83;}}catch{}}}
  {const a=eqv('monarch12_a');if(a&&!mStart&&mode==='play'){mStart=1;const t=tier(a);try{shield=Math.min(maxShield,shield+SKILL81.monarch12_a.start[t]);}catch{}ring(player.x,player.y,'#ffd36a',60);}}
  for(const v of V)if(v.k==='hg'){try{for(const b of bullets)if(!b.dead&&!b.h83&&Math.hypot(b.x-v.x,b.y-v.y)<v.r){b.h83=1;b.vx*=(1-v.sl);b.vy*=(1-v.sl);}}catch{}for(const e of alive())if(Math.hypot(e.x-v.x,e.y-v.y)<v.r+(e===boss?40:0)){hurt(e,v.d*dt);if(window.LV149!==false)slow149(e,v.sl,.25);}}
  prevSh=shNow;prevHp=hpNow;}
 let haloT=0;
 function draw(){if(!on()||!V.length&&cloakT<=0&&!feathers)return;const g=ctx;try{g.save();g.globalCompositeOperation='lighter';
  for(const v of V){const a=Math.max(0,Math.min(1,v.life*3));g.globalAlpha=a;if(window.GearVK304&&GearVK304.fx81)try{if(GearVK304.fx81(g,v,a))continue;}catch{}/* V305 hình vũ khí phụ đợt 2 */
   if(v.k==='pulse'){g.strokeStyle=v.c;g.lineWidth=4;g.beginPath();g.arc(v.x,v.y,v.r*(1.1-v.life),0,6.283);g.stroke();}
   else if(v.k==='swordUp'){const y=v.y-(.4-v.life)*900,f=pj('comet36',sup(),v.life);if(f)pjDraw(g,f,v.x,y,52,0);else{const im=img('comet36_proj81n')||img(v.v+'_beam81n');if(im)g.drawImage(im,v.x-8,y-28,16,56);}}
   else if(v.k==='swordDown'){const y=v.y-v.life*400,f=pj('comet36',true,v.life);if(f)pjDraw(g,f,v.x,y,66,Math.PI);else{const im=img('comet36_proj81s')||img('comet36_beam81s');g.save();g.translate(v.x,y);g.rotate(Math.PI);if(im)g.drawImage(im,-11,-34,22,68);g.restore();}}
   else if(v.k==='field'){g.globalAlpha=.35*Math.min(1,v.life);g.strokeStyle=v.c;g.lineWidth=2;for(let k=0;k<3;k++){g.beginPath();g.moveTo(v.x-v.r+k*v.r*.66,v.y-v.r*.4);g.lineTo(v.x-v.r*.6+k*v.r*.66,v.y+v.r*.4);g.stroke();}}
   else if(v.k==='rift'&&s81('devour10_m')&&sfr(s81('devour10_m'),'in',6,0)){sfDraw(g,sfr(s81('devour10_m'),'in',6,1-v.life/.3),v.x,v.y,v.r*2.4,1);}
   else if(v.k==='rift'){g.strokeStyle='#b45cff';g.lineWidth=3;const s=v.r*.6;g.beginPath();g.moveTo(v.x-s,v.y-s);g.lineTo(v.x+s,v.y+s);g.moveTo(v.x+s,v.y-s);g.lineTo(v.x-s,v.y+s);g.stroke();g.fillStyle='#2a0f3d';g.globalAlpha=a*.5;g.beginPath();g.arc(v.x,v.y,v.r*.5,0,6.283);g.fill();}
   else if(v.k==='mark'&&pj('judgement36',sup(),v.life)){const f=pj('judgement36',sup(),v.life);pjDraw(g,f,v.x,(.6-v.life)/.6*H*.4,46,Math.PI);g.globalAlpha=.25*a;g.fillStyle='#fff0b0';g.fillRect(v.x-1,0,2,H);}
   else if(v.k==='mark'){g.strokeStyle='#ffd36a';g.lineWidth=2;g.beginPath();g.arc(v.x,H-80,22*(1.2-v.life),0,6.283);g.stroke();g.globalAlpha=.25*a;g.fillStyle='#fff0b0';g.fillRect(v.x-2,0,4,H);}
   else if(v.k==='pillar'&&bm('judgement36',sup())){bmDraw(g,bm('judgement36',sup()),v.x,0,H,v.w*1.3,0,Math.min(1,v.life*3));}
   else if(v.k==='pillar'){const gr=g.createLinearGradient(v.x-v.w/2,0,v.x+v.w/2,0);gr.addColorStop(0,'rgba(255,211,106,0)');gr.addColorStop(.5,'rgba(255,248,220,.9)');gr.addColorStop(1,'rgba(255,211,106,0)');g.fillStyle=gr;g.fillRect(v.x-v.w/2,0,v.w,H);}
   else if(v.k==='lance'){if(v.e&&!v.e.dead){g.strokeStyle='#ffd36a';g.lineWidth=3;g.beginPath();g.moveTo(v.e.x,v.e.y+30);g.lineTo(v.e.x,v.e.y);g.stroke();const f=pj('lance36',sup(),v.life);if(f)pjDraw(g,f,v.e.x,v.e.y+26,44,Math.sin(v.life*40)*.12);else{const im=img('lance36_proj81n')||img('lance36_beam81n');if(im){g.save();g.translate(v.e.x,v.e.y+22);g.rotate(Math.sin(v.life*40)*.15);g.drawImage(im,-9,-24,18,48);g.restore();}}}}
   else if(v.k==='tether'&&bm('orbit36',sup())){const prog=1-v.life/.6,y=v.y0-(v.y0+20)*prog;bmDraw(g,bm('orbit36',sup()),player.x+v.w/2,y,v.w,20,Math.PI/2,.95);}
   else if(v.k==='tether'){const prog=1-v.life/.6,y=v.y0-(v.y0+20)*prog;g.strokeStyle='#cbb8ff';g.lineWidth=3;g.beginPath();g.moveTo(player.x-v.w/2,y);g.lineTo(player.x+v.w/2,y);g.stroke();g.fillStyle='#160a28';for(const s of [-1,1]){g.beginPath();g.arc(player.x+s*v.w/2,y,7,0,6.283);g.fill();g.strokeStyle='#815dff';g.stroke();}}
   else if(v.k==='halo'){const p=1-v.life/.9,out=p<.5,q=out?p*2:(p-.5)*2;const px=out?v.sx+(v.tx-v.sx)*q:v.tx+(player.x+v.side*20-v.tx)*q,py=out?v.sy+(v.ty-v.sy)*q:v.ty+(player.y-60-v.ty)*q;
    const hf=pj('halo36',sup(),p);if(hf){pjDraw(g,hf,px,py,v.r*2.2,out?0:Math.PI);}else{const ci=img(sup()?'halo36_proj81s':'halo36_proj81n');if(ci){g.save();g.translate(px,py);g.rotate(p*18);g.drawImage(ci,-v.r,-v.r,v.r*2,v.r*2);g.restore();}else{g.strokeStyle='#fff0b0';g.lineWidth=3;g.beginPath();g.arc(px,py,v.r*.55,0,6.283);g.stroke();}}}
   else if(v.k==='dive'&&pj(v.v||'nova36',sup(),v.life)){const f=pj(v.v||'nova36',sup(),v.life),y=v.y-(.3-v.life)*500;g.save();g.globalAlpha=Math.min(1,v.life*4);pjDraw(g,f,v.x,y,40,0);g.restore();}
   else if(v.k==='dive'){const ti=img('nova36_proj81n');if(ti){const y=v.y-(.3-v.life)*500;g.globalAlpha=Math.min(1,v.life*4);g.drawImage(ti,v.x-7,y-18,14,36);}}
   else if(v.k==='orb'&&s81('devour10_s')&&sfr(s81('devour10_s'),'pn',4,0)){const f=sfr(s81('devour10_s'),sup()?'ps':'pn',4,1-v.life/.5);sfDraw(g,f,v.x,v.y,34,Math.min(1,v.life*4));}
   else if(v.k==='orb'){g.fillStyle='#2a0f3d';g.globalAlpha=.8*a;g.beginPath();g.arc(v.x,v.y,14,0,6.283);g.fill();g.strokeStyle='#b45cff';g.lineWidth=2;g.stroke();}
   else if(v.k==='beam'&&v.v&&bm(v.v,sup())){const dx=v.b.x-v.a.x,dy=v.b.y-v.a.y;bmDraw(g,bm(v.v,sup()),v.a.x,v.a.y,Math.hypot(dx,dy),18,Math.atan2(dy,dx)-Math.PI/2,Math.min(1,v.life*5));}
   else if(v.k==='beam'){g.strokeStyle=v.c2||v.c;g.lineWidth=5;g.beginPath();g.moveTo(v.a.x,v.a.y);g.lineTo(v.b.x,v.b.y);g.stroke();g.strokeStyle=v.c;g.lineWidth=2;g.stroke();}
   else if(v.k==='echo'&&s81('chrono11_m')&&sfr(s81('chrono11_m'),'in',6,0)){sfDraw(g,sfr(s81('chrono11_m'),'in',6,1-v.life),v.x,v.y,64,Math.min(1,v.life*2));}
   else if(v.k==='echo'){g.strokeStyle='#7fe8ff';g.globalAlpha=.5*Math.min(1,v.life);g.setLineDash([4,4]);g.beginPath();g.arc(v.x,v.y,26,0,6.283);g.stroke();g.setLineDash([]);}
   else if(v.k==='hg'&&s81('chrono11_s')&&sfr(s81('chrono11_s'),'is',6,0)){const T0=performance.now()/1000;sfDraw(g,sfr(s81('chrono11_s'),'is',6,(T0*1.6)%1*.84),v.x,v.y,v.r*2,.42*Math.min(1,v.life*2));}
   else if(v.k==='hg'){g.globalAlpha=.22*Math.min(1,v.life*2);g.fillStyle='#5fe6ff';g.beginPath();g.arc(v.x,v.y,v.r,0,6.283);g.fill();g.globalAlpha=.6*Math.min(1,v.life*2);g.strokeStyle='#c9f6ff';g.lineWidth=1.5;g.stroke();}
   else if(v.k==='cleave'){const prog=1-v.life/.55,y=v.y0-(v.y0+20)*prog;{const f=pj('monarch12_m',sup(),v.life);if(f)pjDraw(g,f,v.x,y,50,0);}g.strokeStyle='#ffe9a8';g.lineWidth=4;g.beginPath();g.ellipse(v.x,y,v.w/2,10,0,Math.PI,2*Math.PI);g.stroke();g.strokeStyle='#b45cff';g.lineWidth=1.5;g.stroke();}
   else if(v.k==='rewind'){g.globalAlpha=.35*a;g.strokeStyle='#5fe6ff';g.lineWidth=3;g.beginPath();g.arc(player.x,player.y,40+(.8-v.life)*60,0,6.283);g.stroke();}
   else if(v.k==='decoy'){g.globalAlpha=.35*Math.min(1,v.life);g.fillStyle='#815dff';g.beginPath();g.arc(v.x,v.y,22,0,6.283);g.fill();}}
  if(cloakT>0){g.globalAlpha=.28+.1*Math.sin(Date.now()/90);g.fillStyle='#4b2a8a';g.beginPath();g.arc(player.x,player.y,30,0,6.283);g.fill();}
  if(feathers){g.globalAlpha=.8;g.fillStyle='#fff0b0';for(let k=0;k<feathers;k++){const s=k?1:-1;g.beginPath();g.ellipse(player.x+s*30,player.y+4,5,13,s*.5,0,6.283);g.fill();}}
  g.restore();}catch{try{g.restore();}catch{}}}
 function reset(){Q=[];V=[];feathers=0;cloakT=0;cloakI=null;prevHp=null;haloCd=0;haloT=0;eat=0;slowT=0;rwCd=0;hpHist=[];fzT=0;mStart=0;prevSh=null;}
 // nhãn kỹ năng trong kho (tên kỹ năng mới thay kỹ năng mượn)
 function labels(){try{for(const v in SKILL81)if(GearCatalog[v]){GearCatalog[v].skill=SKILL81[v].skill;GearCatalog[v].skill81=1;}}catch{}}
 function install(){if(!on())return;labels();try{if(!Equipment25.__s81){const u=Equipment25.update,d=Equipment25.draw,r=Equipment25.reset;
   Equipment25.update=function(dt){const v=u.apply(this,arguments);try{if(mode==='play')update(dt);}catch{}return v;};
   Equipment25.draw=function(){const v=d.apply(this,arguments);try{draw();}catch{}return v;};
   Equipment25.reset=function(){const v=r.apply(this,arguments);try{reset();}catch{}return v;};Equipment25.__s81=1;}}catch{}}
 install();setTimeout(install,250);setTimeout(install,1700);
 return {armor,fire,state:()=>({on:on(),q:Q.length,v:V.length,feathers,cloak:cloakT}),DATA:SKILL81};
})();
window.Skill81=Skill81;
