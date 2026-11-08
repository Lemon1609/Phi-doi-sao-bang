'use strict';
// V157 · PHẦN E3 · NỘI TẠI HỢP NHẤT + KỸ NĂNG + BẠO TẨU + TUYỆT KỸ cho 24 SSS (thiết kế: Gemini GEMINI_HOP_THE_E_CHOT_JSON)
//  Vũ khí (16 món): một phần hỏa lực SSS chuyển sang nội tại (SHARE), nên đánh 1 mục tiêu vẫn ≈ ×1,35 (+2%/Lv), còn đông quái thì nội tại lan ra.
//    Đạn thường của món mẹ đang lắp vẫn chạy (×1,35 × (1−SHARE−SK)); phần còn lại do nội tại (theo nhịp) và kỹ năng (theo hồi chiêu) gây ra.
//  Giáp (8 món): chạy nội tại hợp nhất thay cho nội tại của 2 giáp mẹ (nội tại giáp mẹ tạm tắt khi SSS xuất chiến).
//  Kỹ năng tự kích khi hồi xong và có mục tiêu (giáp: khi bị dồn ép). Tuyệt kỹ: mở đầu mỗi lần Bạo Tẩu.
//  Hình: tia, sét gấp khúc, cột sáng, vệt chém, mảnh vỡ, phù ấn hình thoi — KHÔNG vẽ vòng tròn / vành; không chữ nổi.
//  Tắt toàn bộ: window.SSSE3=false (SSS trở về "món mẹ ×1,35").
(()=>{
 const T=()=>{try{return time;}catch{return 0;}};
 const on=()=>window.SSSE3!==false;
 const SHARE=.30,SK=.08;                         // phần hỏa lực đơn mục tiêu do nội tại / kỹ năng gánh
 const L=(lv,a,b)=>a+(b-a)*(Math.max(1,Math.min(5,lv))-1)/4;
 const isBoss=e=>{try{return e===boss||!!e.bossPart;}catch{return false;}};
 const small=e=>!isBoss(e)&&!e.large&&!e.elite;
 const sup=()=>{try{return superTime>0;}catch{return false;}};
 const P=()=>{try{return {x:player.x,y:player.y};}catch{return {x:240,y:600};}};
 function alive(){const o=[];try{for(const e of enemies)if(!e.dead&&!e.rescue28&&e.y>-30&&e.y<H)o.push(e);if(boss&&!boss.dead)o.push(boss);}catch{}return o;}
 const d2=(a,b)=>(a.x-b.x)**2+(a.y-b.y)**2;
 function primary(){const L0=alive();if(!L0.length)return null;try{if(boss&&!boss.dead)return boss;}catch{}const p=P();return L0.filter(e=>e.y<p.y+20).sort((a,b)=>d2(a,p)-d2(b,p))[0]||L0[0];}
 const near=(c,R,ex)=>alive().filter(e=>e!==ex&&d2(e,c)<R*R).sort((a,b)=>d2(a,c)-d2(b,c)).slice(0,4);   // lan tối đa 4 quái → đông quái ≲ 2× đơn mục tiêu
 const pick=(n,ex)=>{const L0=alive().filter(e=>e!==ex);for(let i=L0.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[L0[i],L0[j]]=[L0[j],L0[i]];}return L0.slice(0,n);};
 // ---------- sát thương: cùng đường với gear45 (allyDamage × Combat.factor × nứt giáp nội tại) ----------
 const VU=new Map();const vul=e=>{const v=VU.get(e);return v&&v.until>T()?1+v.p:1;};
 const crack=(e,p,dur)=>{if(!e)return;const c=VU.get(e);VU.set(e,{p:Math.max(p,c&&c.until>T()?c.p:0),until:T()+dur});};
 const ST={dealt:0};
 function hurt(e,d){if(!e||e.dead||!(d>0))return;let a=d;try{a*=BALANCE.allyDamage*Combat.factor();}catch{}a*=vul(e);try{if(window.KN146API)a*=KN146API.vul(e);}catch{}ST.dealt+=a;
  try{if(isBoss(e)){damageBoss(a,'gear',e);return;}e.hp-=a;try{Feedback31.damage(e,a,{gearKind:'auxiliary'});}catch{}if(e.hp<=0)kill(e);}catch{}}
 const slow=(e,k,t)=>{try{KN146API.slow(e,k,t);}catch{}};
 const stun=(e,t)=>{try{KN146API.stun(e,t);}catch{}};
 function clearBul(f){let n=0;try{for(const b of bullets)if(!b.dead&&f(b)){b.dead=true;n++;}}catch{}return n;}
 const inFront=(w,h)=>{const p=P();return b=>b.y<p.y&&b.y>p.y-h&&Math.abs(b.x-p.x)<w;};
 const around=(c,R)=>b=>(b.x-c.x)**2+(b.y-c.y)**2<R*R;
 // ---------- hẹn giờ ----------
 const Q=[];const later=(t,f)=>Q.push({at:T()+t,f});
 // ---------- hình ----------
 const FX=[];const fx=o=>{if(FX.length>140)FX.shift();o.t0=T();if(o.fol){const p=P();o.p0x=p.x;o.p0y=p.y;}FX.push(o);return o;};
 const COL={};
 function bolt(a,b,c,w=2){const pts=[a];const n=6;for(let i=1;i<n;i++){const u=i/n;pts.push({x:a.x+(b.x-a.x)*u+(Math.random()-.5)*22,y:a.y+(b.y-a.y)*u+(Math.random()-.5)*22});}pts.push(b);fx({k:'poly',pts,c,w,life:.22});}
 const beam=(a,b,c,w=3,life=.25)=>fx({k:'line',a:{x:a.x,y:a.y},b:{x:b.x,y:b.y},c,w,life});
 const spark=(x,y,c,n=8,R=34)=>fx({k:'spark',x,y,c,n,R,rot:Math.random()*6.3,life:.32});
 const col=(x,w,c,life=.45)=>fx({k:'col',x,w,c,life});
 const slashFx=(y,w,c,life=.35)=>fx({k:'slash',y,w,c,life});
 const glyph=(e,c,life=.8)=>fx({k:'glyph',e,c,life});
 const shards=(c,n=6)=>{const p=P();fx({k:'shard',x:p.x,y:p.y,c,n,rot:Math.random()*6.3,life:.32});};
 // V158 · tranh GPT Phần E (GEAR44_ASSETS[<mã>_chan|kn|tk|in|is]): dải khung ngang, ô vuông
 const IM={};function img(k){if(k in IM){const m=IM[k];return m&&m.complete&&m.naturalWidth?m:null;}let u=null;try{u=GEAR44_ASSETS[k];}catch{}IM[k]=u?Object.assign(new Image(),{src:u}):null;return null;}
 const spr=(key,o)=>{const m=img(key);if(!m)return false;fx(Object.assign({k:'spr',m,n:Math.max(1,Math.round(m.naturalWidth/m.naturalHeight)),c:'#fff',al:1},o));return true;};
 function aFx(id,kind,c,n){const p=P();const ok=kind==='chan'?spr(id+'_chan',{x:p.x,y:p.y-34,sz:120,rot:-Math.PI/2,life:.3,fol:1}):kind==='kn'?spr(id+'_kn',{x:p.x,y:p.y-80,sz:190,life:.5,fol:1}):spr(id+'_tk',{x:p.x,y:p.y-130,sz:280,life:.85,fol:1});if(!ok)shards(c,n);}
 // ---------- trạng thái từng món ----------
 const defOf=k=>{try{const d=Gear44.activeDef(k);return d&&d.tier==='sss'&&/^sss_/.test(d.id)&&Gear44.defs().some(x=>x.id===d.id)?d:null;}catch{return null;}};
 const lvOf=id=>{try{return Gear44.lvOf(id)||1;}catch{return 1;}};
 // hỏa lực đầy đủ của SSS (trước khi trừ phần nội tại) — đơn vị như refDPS của gear45
 const full=k=>{try{const r=Gear44.refDPS(k);return r/Math.max(.2,1-SHARE-SK);}catch{return 0;}};
 window.SSSE_RED=(k,id)=>on()&&k!=='armor'?1-SHARE-SK:1;
 // hiệu chỉnh theo hỏa lực THẬT của món mẹ lên boss (đo V157: claude_tools/do_dac/t157.py, kẹp 0,3–3): phần nội tại / đạn thường = 0,46 / 0,62 ở Lv5
 const CAL={"sss_inferno_cryo": 0.85, "sss_thunder_singularity": 2.39, "sss_spiral_stellar": 0.66, "sss_comet_nova": 2.99, "sss_judgement_swarm": 0.79, "sss_devour_chrono_m": 0.94, "sss_chrono_monarch_m": 1.14, "sss_monarch_inferno": 0.89, "sss_rail_disc": 0.4, "sss_solar_gravity": 1.09, "sss_ricochet_prism": 1.47, "sss_lance_orbit": 2.32, "sss_halo_carrier": 0.81, "sss_devour_chrono_s": 1.65, "sss_chrono_monarch_s": 0.15, "sss_monarch_rail": 0.96};
 const S={w:{},a:null,lastSup:false,ins:false,pend:[]};
 // ================= VŨ KHÍ (16) =================
 // mỗi nhịp p giây: D = hỏa lực đầy × phần nội tại × p (dồn hết vào mục tiêu chính) + lan sang quái khác theo kiểu từng món
 const W={
  sss_inferno_cryo:{p:1.1,c:'#ff7a3a',c2:'#7fd8ff',proc(D,e,lv,s){const R=L(lv,50,80)*(s?1.3:1);hurt(e,D);slow(e,.3,2);crack(e,L(lv,.08,.16),2.5);spark(e.x,e.y,this.c,10,R*.6);spark(e.x,e.y,this.c2,6,R*.5);for(const m of near(e,R,e)){hurt(m,D*L(lv,.25,.45));slow(m,.3,2);}},
   skill(D,lv){const e=primary();if(!e)return;for(let i=0;i<6;i++)later(i*.08,()=>{const p=P();beam(p,e,i%2?this.c2:this.c,3,.2);});later(.55,()=>{hurt(e,D);for(const m of near(e,110,e))hurt(m,D*.35);spark(e.x,e.y,this.c,14,70);});},
   ult(D){for(const x of [140,340])col(x,90,x<240?this.c:this.c2,1.4);for(const e of alive())if(Math.abs(e.x-140)<70||Math.abs(e.x-340)<70){hurt(e,D*.5);slow(e,.4,2.5);}try{for(const b of bullets)if(!b.dead){b.vx*=.6;b.vy*=.6;}}catch{}}},
  sss_thunder_singularity:{p:1.2,c:'#b77bff',proc(D,e,lv,s){const n=Math.round(L(lv,2,4))+(s?1:0);hurt(e,D);try{KN146API.well(e.x,e.y,L(lv,45,65),1.2,'eat',s,0);}catch{}let a=e;for(const m of near(e,170,e).slice(0,n)){bolt(a,m,this.c);hurt(m,D*L(lv,.15,.35)*2);a=m;}},
   skill(D){const p=P();for(const dx of [-80,80]){try{KN146API.well(p.x+dx,p.y-230,70,2.5,'eat',true,0);}catch{}}const e=primary();if(e){for(let i=0;i<8;i++)later(i*.1,()=>{bolt({x:P().x,y:P().y-230},e,this.c,2.5);});hurt(e,D);for(const m of near(e,160,e).slice(0,6))hurt(m,D*.3);}},
   ult(D){const p=P();for(const dx of [-110,110])try{KN146API.well(p.x+dx,p.y-260,90,2.5,'eat',true,0);}catch{}for(let i=0;i<12;i++)later(i*.18,()=>{const a={x:P().x-110,y:P().y-260},b={x:P().x+110,y:P().y-260};bolt(a,b,this.c,3);for(const e of alive())if(e.y>a.y-60&&e.y<a.y+60)hurt(e,D/12);});}},
  sss_spiral_stellar:{p:1.0,c:'#2dd4bf',c2:'#ffd56a',proc(D,e,lv,s){const n=Math.round(L(lv,3,5))+(s?2:0);hurt(e,D*.6);spark(e.x,e.y,this.c,6,26);const T2=near(e,220,e)[0]||e;later(.12,()=>{beam(e,T2,this.c,2,.15);hurt(T2,D*.2);});for(let i=0;i<n;i++){const m=pick(1,null)[0]||e;later(.15+i*.05,()=>{fx({k:'star',a:{x:e.x,y:e.y},b:m,c:this.c2,life:.25});later(.2,()=>hurt(m,D*(m===e?.2:L(lv,.3,.4))/1.2));});}},
   skill(D){const e=primary();if(!e)return;for(let i=0;i<16;i++)later(.1+i*.04,()=>{const m=Math.random()<.5?e:(pick(1)[0]||e);fx({k:'star',a:P(),b:m,c:this.c2,life:.3});later(.25,()=>hurt(m,D/16*(m===e?1:.6)));});},
   ult(D){for(let i=0;i<20;i++)later(i*.1,()=>{const m=pick(1)[0]||primary();if(!m)return;fx({k:'star',a:{x:m.x+(Math.random()-.5)*80,y:-10},b:m,c:i%2?this.c:this.c2,life:.3});later(.25,()=>hurt(m,D/20));});}},
  sss_comet_nova:{p:1.3,c:'#d8a6ff',proc(D,e,lv,s){col(e.x,22,this.c,.3);const crit=e.maxHp&&e.hp>e.maxHp*.7&&lv>=5?1.2:1;later(.15,()=>{hurt(e,D*crit/1.1);const R=L(lv,55,95);clearBul(around(e,R));spark(e.x,e.y,this.c,10,R*.6);if(s)later(.5,()=>{clearBul(around(e,R));spark(e.x,e.y,this.c,8,R*.5);for(const m of near(e,R,e))hurt(m,D*.2);});for(const m of near(e,R,e))hurt(m,D*.35);});},
   skill(D){const e=primary();if(!e)return;for(let i=0;i<4;i++)later(i*.2,()=>{col(e.x+(i-1.5)*14,26,this.c,.35);hurt(e,D/4);clearBul(around(e,90));spark(e.x,e.y,this.c,8,50);});},
   ult(D){const p=P();clearBul(b=>b.y<p.y-200);for(let i=0;i<6;i++)later(i*.18,()=>{const e=pick(1)[0]||primary();if(!e)return;col(e.x,40,'#ffd56a',.5);hurt(e,D/6);for(const m of near(e,60,e))hurt(m,D/12);});}},
  sss_judgement_swarm:{p:.9,c:'#ffd54a',proc(D,e,lv,s){const k=s?3:4;e.js157=(e.js157||0)+Math.round(L(lv,2,3));const shot=(m)=>fx({k:'star',a:P(),b:m,c:this.c,life:.2});shot(e);hurt(e,D*.45);if(e.js157>=k){e.js157-=k;later(.2,()=>{const w=L(lv,40,52);col(e.x,w,this.c,.45);for(const m of alive())if(Math.abs(m.x-e.x)<w/2+(isBoss(m)?40:10))hurt(m,m===e?D*.55*1.7:D*.5);});}},
   skill(D){const e=primary();if(!e)return;for(let i=0;i<3;i++){const x=e.x+(i-1)*46;later(.3+i*.05,()=>{col(x,46,this.c,.5);for(const m of alive())if(Math.abs(m.x-x)<23+(isBoss(m)?40:10))hurt(m,D/3);});}},
   ult(D){for(let i=0;i<4;i++){const x=60+i*120;later(.6,()=>{col(x,70,this.c,.7);for(const m of alive())if(Math.abs(m.x-x)<35+(isBoss(m)?40:10))hurt(m,D/2);});}}},
  sss_devour_chrono_m:{p:1.2,c:'#f43f5e',proc(D,e,lv,s){glyph(e,this.c,2);crack(e,L(lv,.08,.16),2.2);for(let i=1;i<=4;i++)later(i*.5,()=>{if(!e.dead)hurt(e,D*.12);});later(.6,()=>{if(e.dead)return;hurt(e,D*.52);spark(e.x,e.y,this.c,10,40);if(s)slow(e,.3,1.5);const m=near(e,140,e)[0];if(m){beam(e,m,this.c,2,.2);glyph(m,this.c,1.5);hurt(m,D*L(lv,.3,.55));}});},
   skill(D){const e=primary();if(!e)return;glyph(e,this.c,2);for(const t of [.6,1.2])later(t,()=>{hurt(e,D/2);spark(e.x,e.y,this.c,12,60);for(const m of near(e,120,e))hurt(m,D*.15);});},
   ult(D){const e=primary();if(!e)return;glyph(e,this.c,2.4);[.5,1.1,1.7].forEach((t,i)=>later(t,()=>{hurt(e,D*(1+.2*i)/3.6);spark(e.x,e.y,this.c,14,70);}));}},
  sss_chrono_monarch_m:{p:1.2,c:'#38bdf8',c2:'#ffd56a',proc(D,e,lv,s){const w=L(lv,70,100),y=e.y;slashFx(y,w*.5,this.c);const hit=alive().filter(m=>Math.abs(m.y-y)<w*.35);for(const m of hit)hurt(m,m===e?D*.55:D*.3);const n=s?2:1;for(let i=1;i<=n;i++)later(.6*i,()=>{slashFx(y,w*.4,this.c2,.3);for(const m of alive())if(Math.abs(m.y-y)<w*.35){hurt(m,m===e?D*.45/n:D*.25/n);if(lv>=5)slow(m,.35,1.5);}});},
   skill(D){const e=primary();if(!e)return;slashFx(e.y,40,this.c);col(e.x,40,this.c,.35);hurt(e,D/2);later(.6,()=>{slashFx(e.y,36,this.c2);col(e.x,36,this.c2,.3);hurt(e,D/2);for(const m of near(e,140,e))hurt(m,D*.25);});},
   ult(D){const p=P();clearBul(b=>Math.abs(b.y-(p.y-260))<60||Math.abs(b.x-p.x)<40);slashFx(p.y-260,60,this.c2,.6);col(p.x,60,this.c2,.6);for(const t of [.6,1.2])later(t,()=>{for(const e of alive())if(Math.abs(e.y-(P().y-260))<70||Math.abs(e.x-P().x)<40)hurt(e,D/2);});}},
  sss_monarch_inferno:{p:1.2,c:'#fb923c',proc(D,e,lv,s){const w=L(lv,70,100)*(s?1.5:1),y=e.y;slashFx(y,w*.5,this.c);for(const m of alive())if(Math.abs(m.y-y)<w*.35)hurt(m,m===e?D*.6:D*.3);const dur=L(lv,1.5,2);fx({k:'slash',y,w:w*.25,c:'#ff5a2a',life:dur});const N=Math.round(dur/.25);for(let i=1;i<=N;i++)later(i*.25,()=>{for(const m of alive())if(Math.abs(m.y-y)<w*.3)hurt(m,m===e?D*.4/N:D*.15/N);});},
   skill(D){const e=primary();if(!e)return;slashFx(e.y,40,this.c);col(e.x,40,this.c,.35);for(let i=0;i<6;i++)later(.1+i*.07,()=>{beam(P(),e,'#ff5a2a',2,.15);hurt(e,D/6);});},
   ult(D){const p=P();for(let i=0;i<3;i++){const y=p.y-180-i*140;clearBul(b=>Math.abs(b.y-y)<45);slashFx(y,50,this.c,2.5);for(let j=1;j<=10;j++)later(j*.25,()=>{for(const e of alive())if(Math.abs(e.y-y)<55)hurt(e,D/30);});}}},
  sss_rail_disc:{p:1.0,c:'#38bdf8',c2:'#c084fc',proc(D,e,lv,s){const p=P();const n=s?2:1;for(let k=0;k<n;k++){const ox=k?40:-40;beam({x:p.x+ox,y:p.y},{x:e.x,y:-20},this.c,2.5,.18);}const hit=alive().filter(m=>Math.abs(m.x-e.x)<(lv>=5?18:12)+(isBoss(m)?40:0)&&m.y<p.y);for(const m of hit)hurt(m,m===e?D*.55:D*.2);later(.25,()=>{fx({k:'star',a:p,b:e,c:this.c2,life:.25});later(.2,()=>{hurt(e,D*.45*(1+L(lv,.2,.45))/1.3);for(const m of near(e,L(lv,30,45),e))hurt(m,D*.15);});});},
   skill(D){const e=primary();if(!e)return;for(let i=0;i<4;i++)fx({k:'star',a:{x:e.x+(i<2?-200:200),y:e.y+(i%2?-150:150)},b:e,c:this.c2,life:.35});later(.35,()=>{beam({x:e.x,y:H},{x:e.x,y:-20},this.c,6,.3);hurt(e,D);spark(e.x,e.y,this.c,12,60);});},
   ult(D){const e=primary();if(!e)return;for(let i=0;i<4;i++)later(i*.4,()=>{const x=e.x+(i-1.5)*30;beam({x,y:H},{x,y:-20},this.c,5,.35);for(const m of alive())if(Math.abs(m.x-x)<20+(isBoss(m)?40:0))hurt(m,D/4);});}},
  sss_solar_gravity:{p:1.2,c:'#f59e0b',c2:'#a855f7',proc(D,e,lv,s){const p=P();try{KN146API.deflect(p.x,p.y-120,s?120:90,L(lv,20,38));}catch{}fx({k:'star',a:p,b:e,c:this.c,life:.25});later(.2,()=>{const R=L(lv,35,60);hurt(e,D*.65);spark(e.x,e.y,this.c,s?8:6,R);for(const m of near(e,R,e))hurt(m,D*.3);for(let i=1;i<=4;i++)later(i*.5,()=>{if(!e.dead)hurt(e,D*.35/4);});});},
   skill(D){const p=P();try{for(const b of bullets)if(!b.dead&&b.y<p.y&&b.y>p.y-460){b.g146=0;KN146API.deflect(b.x,b.y,2,55);}}catch{}const e=primary();if(e)for(const dx of [-30,30])later(.3,()=>{fx({k:'star',a:{x:p.x+dx,y:p.y},b:e,c:this.c,life:.3});later(.25,()=>{hurt(e,D/2);spark(e.x,e.y,this.c,10,50);});});},
   ult(D){const p=P();clearBul(b=>b.y<p.y&&b.y>p.y-420&&Math.abs(b.x-p.x)<160);const e=primary();if(e)later(.8,()=>{hurt(e,D);spark(e.x,e.y,this.c2,16,90);for(const m of near(e,140,e))hurt(m,D*.3);});}},
  sss_ricochet_prism:{p:1.0,c:'#22d3ee',proc(D,e,lv,s){const b=Math.round(L(lv,1,2));hurt(e,D*.6);slow(e,L(lv,.15,.35),1.5);spark(e.x,e.y,this.c,6,24);let a=e;for(let i=0;i<b;i++){const wall={x:i%2?470:10,y:a.y-60-i*40};const m=s?(primary()||e):(near(a,320,a)[0]||e);later(.12*(i+1),()=>{beam(a,wall,this.c,2,.15);beam(wall,m,this.c,2,.15);hurt(m,D*(m===e?.4/b:.35));slow(m,L(lv,.15,.35),1.5);for(const x of near(m,40,m).slice(0,Math.round(L(lv,2,3))))hurt(x,D*.1);});a=m;}},
   skill(D){const p=P();for(let i=0;i<6;i++)later(i*.1,()=>{const y=p.y-120-i*60;beam({x:10,y},{x:470,y:y-40},this.c,2,.25);for(const e of alive())if(Math.abs(e.y-y)<40){slow(e,.5,3);hurt(e,D/6*(isBoss(e)?1:.5));}});},
   ult(D){for(let i=0;i<8;i++)later(i*.15,()=>{const y=80+Math.random()*420;beam({x:10,y},{x:470,y:y+(Math.random()-.5)*160},this.c,3,.3);for(const e of alive())if(Math.abs(e.y-y)<50){hurt(e,D/8);stun(e,.8);}clearBul(b=>Math.abs(b.y-y)<40);});}},
  sss_lance_orbit:{p:1.0,c:'#60a5fa',proc(D,e,lv,s){const p=P(),h=160*(s?1.4:1);const a={x:p.x-50,y:p.y-30},b={x:p.x+50,y:p.y-30};beam(a,{x:a.x,y:a.y-h},this.c,2,.2);beam(b,{x:b.x,y:b.y-h},this.c,2,.2);fx({k:'line',a:{x:a.x,y:a.y-h},b:{x:b.x,y:b.y-h},c:this.c,w:2,life:.2,al:.45});
    if(s)clearBul(bb=>bb.y<p.y-30&&bb.y>p.y-30-h&&Math.abs(bb.x-p.x)<55);for(const m of alive())if(m.y<p.y&&m.y>p.y-30-h&&Math.abs(m.x-p.x)<60){hurt(m,D*.35);slow(m,L(lv,0,.35),1);crack(m,L(lv,.1,.18),2);}beam(p,e,this.c,2,.15);hurt(e,D*.65);crack(e,L(lv,.1,.18),2);},
   skill(D){const e=primary();if(!e)return;const p=P();beam({x:p.x-50,y:p.y},{x:e.x-20,y:e.y},this.c,3,.4);beam({x:p.x+50,y:p.y},{x:e.x+20,y:e.y},this.c,3,.4);stun(e,1.2);hurt(e,D);for(const m of alive())if(m.y<p.y&&Math.abs(m.x-p.x)<60){hurt(m,D*.3);stun(m,1);}},
   ult(D){const e=primary();if(!e)return;for(let i=0;i<8;i++)later(i*.25,()=>{fx({k:'line',a:{x:e.x-60,y:e.y},b:{x:e.x+60,y:e.y},c:this.c,w:3,life:.25});hurt(e,D/8);});}},
  sss_halo_carrier:{p:.8,c:'#22d3ee',c2:'#ffd56a',proc(D,e,lv,s){if(S.focus!==e){S.focus=e;S.stk=0;}S.stk=Math.min(6,S.stk+1);const mx=L(lv,.16,.36),k=1+mx*S.stk/6;const n=Math.round(L(lv,2,4));const p=P();for(let i=0;i<n;i++)later(i*.05,()=>beam({x:p.x+(i-n/2)*30,y:p.y-40},e,i%2?this.c2:this.c,1.5,.12));hurt(e,D*k/(1+mx*.7));S.cnt=(S.cnt||0)+1;if(s&&S.cnt%5===0){col(e.x,20,this.c2,.25);slashFx(e.y,10,this.c2,.25);hurt(e,D*.3);}},
   skill(D){const e=primary();if(!e)return;for(let i=0;i<10;i++)later(i*.08,()=>{beam({x:P().x+(i%5-2)*30,y:P().y-40},e,this.c,2,.12);hurt(e,D/10);});},
   ult(D){const e=primary();if(!e)return;for(let i=0;i<12;i++)later(i*.2,()=>{const a=i*.52;beam({x:e.x+Math.cos(a)*120,y:e.y+Math.sin(a)*120},e,this.c2,2,.18);hurt(e,D/12);});}},
  sss_devour_chrono_s:{p:1.0,c:'#84cc16',proc(D,e,lv,s){const p=P(),R=L(lv,80,110);let eat=0;try{for(const b of bullets)if(!b.dead&&b.y<p.y&&b.y>p.y-R*2&&Math.abs(b.x-p.x)<R){if(!b.c157){b.c157=1;b.vx*=1-L(lv,.25,.45);b.vy*=1-L(lv,.25,.45);}else if(eat<3){b.dead=true;eat++;}}}catch{}S.eat=(S.eat||0)+eat;
    for(const m of alive())if(m.y<p.y&&m.y>p.y-R*2&&Math.abs(m.x-p.x)<R)slow(m,L(lv,.2,.45),1);fx({k:'sand',x:p.x,y:p.y-R,c:this.c,life:.6});hurt(e,D*.6);const need=s?2:Math.round(L(lv,6,3));if(S.eat>=need){S.eat-=need;beam(p,{x:e.x,y:-20},this.c,6,.3);for(const m of alive())if(Math.abs(m.x-e.x)<22+(isBoss(m)?40:0)){hurt(m,D*.4*need/3);if(s)stun(m,1.2);}}},
   skill(D){const p=P();try{for(const b of bullets)if(!b.dead&&Math.hypot(b.x-p.x,b.y-p.y)<200){b.vx*=.3;b.vy*=.3;}}catch{}const n=clearBul(around(p,140));const e=primary();if(e){beam({x:p.x-40,y:p.y},{x:e.x,y:-20},this.c,6,.35);beam({x:p.x+40,y:p.y},{x:e.x,y:-20},this.c,6,.35);hurt(e,D);}},
   ult(D){const p=P();try{for(const b of bullets)if(!b.dead&&b.y<p.y){b.vx*=.25;b.vy*=.25;}}catch{}const n=Math.min(12,clearBul(inFront(160,300)));const e=primary();if(e)later(.6,()=>{for(const dx of [-40,40])beam({x:p.x+dx,y:p.y},{x:e.x+dx/4,y:-20},this.c,9,.6);hurt(e,D*(1+n/24));});}},
  sss_chrono_monarch_s:{p:1.3,c:'#eab308',c2:'#a855f7',proc(D,e,lv,s){const n=Math.round(L(lv,2,4));const tg=[e,...near(e,260,e).slice(0,n-1)];for(const m of tg){glyph(m,this.c,.8);slow(m,L(lv,.25,.45),.8);}later(.8,()=>{let a=null;for(const m of tg){if(m.dead)continue;if(a)bolt(a,m,this.c2,2);a=m;hurt(m,m===e?D:D*.45);if(s)clearBul(around(m,50));}});},
   skill(D){const e=primary();if(!e)return;const tg=[e,...near(e,300,e).slice(0,4)];for(const m of tg){glyph(m,this.c,.8);slow(m,.6,1.5);}later(.8,()=>{let a=null;for(const m of tg){if(m.dead)continue;if(a)bolt(a,m,this.c2,2.5);a=m;hurt(m,m===e?D:D*.4);}});},
   ult(D){for(const e of alive()){if(!isBoss(e))stun(e,1.5);glyph(e,this.c,1.5);}const e=primary();if(e)later(1,()=>{hurt(e,D);for(const m of alive())if(m!==e){bolt(e,m,this.c2,2);hurt(m,D*.15);}});}},
  sss_monarch_rail:{p:1.1,c:'#a855f7',c2:'#ffd56a',proc(D,e,lv,s){const n=Math.round(L(lv,2,4));const tg=[e,...near(e,260,e).slice(0,n-1)];for(const m of tg)glyph(m,this.c,.5);const p=P();later(.2,()=>{beam(p,{x:e.x,y:-20},this.c2,3,.2);let a=null;for(const m of tg){if(m.dead)continue;if(a)bolt(a,m,this.c,2);a=m;hurt(m,m===e?D*(1+L(lv,.15,.35))/1.25:D*.4);}});},
   skill(D){const e=primary();if(!e)return;const tg=[e,...near(e,300,e).slice(0,4)];for(const m of tg)glyph(m,this.c,1.2);for(let i=0;i<4;i++)later(.3+i*.2,()=>{beam(P(),{x:e.x,y:-20},this.c2,4,.2);let a=null;for(const m of tg){if(m.dead)continue;if(a)bolt(a,m,this.c,2);a=m;hurt(m,m===e?D/4:D*.1);}});},
   ult(D){const e=primary();if(!e)return;glyph(e,this.c2,2);for(let i=0;i<4;i++)later(.2+i*.4,()=>{const x=e.x+(i-1.5)*26;beam({x,y:H},{x,y:-20},this.c2,6,.35);hurt(e,D/4);for(const m of near(e,120,e))hurt(m,D*.08);});}}};
 // ================= GIÁP (8) =================
 // hit = 1 đòn chuẩn (enemyScale); hồi máu tính theo % máu tối đa
 const AC={sss_aegis_mirror:'#7dd3fc',sss_orbital_phase:'#c084fc',sss_reactive_nanite:'#34d399',sss_aurora_void:'#f59e0b',sss_seraph_aegis9:'#fde047',sss_devour_chrono_a:'#ec4899',sss_chrono_monarch_a:'#fbbf24',sss_monarch_aegis:'#f59e0b'};
 const A0=()=>({id:null,lv:1,layer:0,cd:0,defer:[],red:0,redUntil:0,blockUntil:0,lastHit:-99,regenAcc:0,regenWin:0,graze:0,shieldCd:0,stealthCd:0,dodgeB:0,sideCd:0,heal:0,healWin:0,cheat:0,hurtLog:[],skCd:0,pick:0});
 const E195=()=>{try{return S.a&&window.CHIPARM195?window.CHIPARM195(S.a.id):1;}catch{return 1;}};/* V195: SSS giáp = max(2 giáp mẹ), áp vào giảm ST + hồi máu; V198: cả hồi chiêu (cd/eff) */
 const heal=f=>{try{hp=Math.min(maxHp,hp+maxHp*f*E195());}catch{}};
 const debt=a=>a.defer.reduce((s,z)=>s+z.left,0);
 const counter=(n,c,mult)=>{const p=P();let u=1;try{u=Math.max(1,Combat.stats().attack)*.25;}catch{}for(const m of pick(n)){beam(p,m,c,2,.2);hurt(m,u*mult);}};
 function aTick(a,dt){const t=T(),lv=a.lv,id=a.id,s=sup();let h=0;try{h=enemyScale();}catch{}
  // trả nợ máu dần
  if(a.defer.length){let tot=0;for(const z of a.defer){const k=Math.min(z.left,z.rate*dt);z.left-=k;tot+=k;}a.defer=a.defer.filter(z=>z.left>1e-4);try{if(tot>0)hp=Math.max(.3,hp-tot);}catch{}}
  if(id==='sss_aegis_mirror'||id==='sss_monarch_aegis'){const cd=id==='sss_aegis_mirror'?(s?13:L(lv,24,16)):(s?14:L(lv,28,18));if(a.layer<1&&t>=a.cd){a.layer=1;}}
  if(id==='sss_reactive_nanite'&&t-a.lastHit>2.5){if(t>a.regenWin){a.regenWin=t+60;a.regenAcc=0;}const cap=s?.35:.28;if(a.regenAcc<cap){const f=L(lv,.006,.01)*dt;a.regenAcc+=f;heal(f);}}
  if(id==='sss_aurora_void'&&a.layer<1&&t>=a.shieldCd){try{const p=P(),R=s?68:34;for(const b of bullets){if(b.dead||b.gz157)continue;const d=Math.hypot(b.x-p.x,b.y-p.y);if(d<R&&d>12){b.gz157=1;a.graze++;}}}catch{}if(a.graze>=Math.round(L(lv,9,5))){a.graze=0;a.layer=1;shards(AC[id],5);}}
  if(id==='sss_seraph_aegis9'&&s){try{for(const d of drops||[]){const p=P();d.x+=(p.x-d.x)*Math.min(1,dt*4);d.y+=(p.y-d.y)*Math.min(1,dt*4);}}catch{}}
  // kỹ năng giáp: tự kích khi bị dồn ép (≥5 đạn trong 130 px, hoặc máu < 60%)
  if(t>=a.skCd){let n=0;try{const p=P();for(const b of bullets)if(!b.dead&&Math.hypot(b.x-p.x,b.y-p.y)<130)n++;}catch{}let low=false;try{low=hp<maxHp*.6;}catch{}if(n>=5||low){a.skCd=t+(DEFS()[id]?.skill?.cooldown||15)/E195();aSkill(a);}}}
 function aSkill(a){const t=T(),id=a.id,c=AC[id],p=P();aFx(id,'kn',c,8);
  if(id==='sss_aegis_mirror'){a.blockUntil=t+2;clearBul(inFront(90,200));counter(3,c,1.6);}
  else if(id==='sss_orbital_phase'){a.blockUntil=t+2;clearBul(around(p,90));}
  else if(id==='sss_reactive_nanite'){heal(.12);a.red=.45;a.redUntil=t+2;counter(4,'#ff7a3a',1.2);}
  else if(id==='sss_aurora_void'){try{invuln=Math.max(invuln,2);}catch{}clearBul(inFront(110,260));}
  else if(id==='sss_seraph_aegis9'){a.red=.5;a.redUntil=t+2.5;heal(.08);clearBul(inFront(100,240));}
  else if(id==='sss_devour_chrono_a'){const lost=a.hurtLog.filter(z=>z.t>t-2).reduce((s,z)=>s+z.d,0);heal(.08);try{hp=Math.min(maxHp,hp+lost*.4);}catch{}try{for(const d of drops||[]){d.x=p.x;d.y=p.y;}}catch{}}
  else if(id==='sss_chrono_monarch_a'){a.defer=[];a.blockUntil=t+3;}
  else if(id==='sss_monarch_aegis'){a.blockUntil=t+2;for(const z of a.defer)z.left*=.5;clearBul(inFront(90,240));}}
 function aUlt(a){const t=T(),id=a.id,c=AC[id],p=P();aFx(id,'tk',c,10);
  if(id==='sss_aegis_mirror'){let n=0;clearBul(b=>{if(n<8&&b.y<p.y&&b.y>p.y-220&&Math.abs(b.x-p.x)<120){n++;return true;}return false;});const e=primary();if(e)for(let i=0;i<n;i++)later(i*.08,()=>{beam(P(),e,c,2,.2);counter(0,c,0);hurt(e,(()=>{let u=1;try{u=Combat.stats().attack*.25;}catch{}return u*.8;})());});}
  else if(id==='sss_orbital_phase'){a.blockUntil=t+2.2;try{KN146API.deflect(p.x-90,p.y-40,80,45);KN146API.deflect(p.x+90,p.y-40,80,45);}catch{}}
  else if(id==='sss_reactive_nanite'){for(let i=1;i<=5;i++)later(i*.5,()=>heal(.032));counter(6,'#ff7a3a',1.4);}
  else if(id==='sss_aurora_void'){try{invuln=Math.max(invuln,2.2);}catch{}a.layer=1;counter(8,c,1);}
  else if(id==='sss_seraph_aegis9'){try{for(const d of drops||[]){d.x=p.x;d.y=p.y;}}catch{}a.pick=3;clearBul(inFront(110,300));}
  else if(id==='sss_devour_chrono_a'){try{for(const b of bullets)if(!b.dead&&Math.hypot(b.x-p.x,b.y-p.y)<200){b.vx*=.35;b.vy*=.35;}}catch{}const lost=a.hurtLog.filter(z=>z.t>t-3).reduce((s,z)=>s+z.d,0);try{hp=Math.min(maxHp,hp+lost*.6);}catch{}counter(6,c,1);}
  else if(id==='sss_chrono_monarch_a'){a.defer=[];heal(.10);try{for(const b of bullets)if(!b.dead){b.vx*=.4;b.vy*=.4;}}catch{}}
  else if(id==='sss_monarch_aegis'){a.layer=1;a.defer=[];clearBul(inFront(120,320));counter(8,c,.8);}}
 // lớp bọc damage(): chạy NGOÀI cùng; khi giáp SSS xuất chiến thì nội tại giáp mẹ (nt144/nt147) bị tắt qua window.SSSE_A
 function installDamage(){if(S.ins||typeof damage!=='function')return;S.ins=true;const od=damage;
  const nd=function(source='collision'){const a=S.a;let m='';try{m=mode;}catch{}if(!a||!on()||m!=='play'||invuln>0||(source==='bullet'&&bulletShieldTime>0))return od.apply(this,arguments);
   const t=T(),lv=a.lv,id=a.id,c=AC[id],s=sup();let h=1;try{h=enemyScale();}catch{}
   const block=()=>{aFx(id,'chan',c,6);try{invuln=Math.max(invuln,.35);}catch{}};
   if(t<a.blockUntil){a.blockUntil=0;block();return;}
   if((id==='sss_aegis_mirror'||id==='sss_monarch_aegis'||id==='sss_aurora_void')&&a.layer>0){a.layer=0;block();
    if(id==='sss_aegis_mirror'){a.cd=t+(s?13:L(lv,24,16))/E195();counter(Math.round(L(lv,2,3)),c,L(lv,1.4,2.2));}
    else if(id==='sss_monarch_aegis'){a.cd=t+(s?14:L(lv,28,18))/E195();if(s)a.defer=[];}
    else{a.shieldCd=t+L(lv,22,14)/E195();if(t>=a.stealthCd){a.stealthCd=t+L(lv,24,16)/E195();try{invuln=Math.max(invuln,L(lv,1.2,1.8));}catch{}if(lv>=5)counter(4,c,1);}}
    return;}
   if(id==='sss_orbital_phase'){if(t>=a.sideCd){a.sideCd=t+(s?2:L(lv,4.5,2.5))/E195();a.dodgeB=L(lv,.12,.20);block();return;}const ch=L(lv,.14,.24)+a.dodgeB;a.dodgeB=0;if(Math.random()<ch){block();return;}}
   if(id==='sss_chrono_monarch_a'||id==='sss_devour_chrono_a'){let cur=0;try{cur=hp;}catch{}const dying=cur-h*(id==='sss_chrono_monarch_a'?L(lv,.65,.35):1)<=0&&!(typeof shield==='number'&&shield>0);
    if(dying&&t>=a.cheat){a.cheat=t+L(lv,80,55)/E195();try{hp=Math.max(hp,1);invuln=Math.max(invuln,id==='sss_devour_chrono_a'?L(lv,1.2,2):2);}catch{}a.defer=[];shards(c,10);if(id==='sss_devour_chrono_a'&&s)heal(.15);return;}}
   let red=0,defer=0;
   if(id==='sss_reactive_nanite')red=s?.28:L(lv,.14,.24);
   if(id==='sss_seraph_aegis9'){red=L(lv,.10,.20);try{const sd=Gear44.activeId('sidearm');if(s||sd==='carrier9'||sd==='sss_halo_carrier')red=L(lv,.18,.32);}catch{}if(a.pick>0){const ab=Math.min(1,a.pick*L(lv,.03,.06)*((typeof maxHp==='number'?maxHp:9.5)/Math.max(.1,h)));red=Math.max(red,Math.min(1,ab));a.pick=0;}}
   if(id==='sss_chrono_monarch_a')defer=L(lv,.35,.65);
   if(id==='sss_monarch_aegis'&&a.layer<1){defer=L(lv,.35,.60);a.cd-=L(lv,1,2);}
   if(t<a.redUntil)red=Math.max(red,a.red);red=Math.min(.9,Math.max(red,defer)*E195());
   const h0=(typeof hp==='number'?hp:0);let r;
   if(red>0&&typeof enemyScale==='function'){const oe=enemyScale;enemyScale=function(){return oe.apply(this,arguments)*(1-red);};try{r=od.apply(this,arguments);}finally{enemyScale=oe;}}else r=od.apply(this,arguments);
   try{const took=h0-hp;if(took>1e-6){a.lastHit=t;a.hurtLog.push({t,d:took});a.hurtLog=a.hurtLog.filter(z=>z.t>t-4);
     if(defer>0)a.defer.push({left:h*defer,rate:h*defer/4});
     if(id==='sss_reactive_nanite'&&t>=a.heal){a.heal=t+L(lv,10,8)/E195();heal(L(lv,.015,.03));if(lv>=5)counter(3,'#ff7a3a',1);}
     if(id==='sss_aurora_void'&&hp<maxHp*.35&&t>=a.stealthCd){a.stealthCd=t+L(lv,24,16)/E195();invuln=Math.max(invuln,L(lv,1.2,1.8));shards(c,8);}
     if(id==='sss_aegis_mirror'&&Math.random()<(s?.35:L(lv,.15,.25)))counter(1,c,1);}}catch{}
   return r;};
  damage=nd;}
 function installHooks(){
  try{if(!kill.__e157){const ok=kill;kill=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{const a=S.a;if(was&&e.dead&&a&&a.id==='sss_devour_chrono_a'&&on()){const t=T();if(t>a.healWin){a.healWin=t+10;a.healAcc=0;}const cap=sup()?.16:L(a.lv,.07,.12);const f=(!small(e)?.06:L(a.lv,.004,.01));if((a.healAcc||0)<cap){a.healAcc=(a.healAcc||0)+f;heal(f);}let full_=false;try{full_=hp>=maxHp-1e-6;}catch{}if(full_)a.cheat=Math.max(t+L(a.lv,0,42)-80,a.cheat-.5);}if(was&&e.dead&&a&&a.id==='sss_chrono_monarch_a'&&sup())for(const z of a.defer)z.left*=.65;}catch{}return r;};kill.__e157=1;}}catch{}
  try{if(!collect.__e157){const oc=collect;collect=function(d){const r=oc.apply(this,arguments);try{const a=S.a;if(a&&a.id==='sss_seraph_aegis9'&&on()&&d&&d.type!=='craft'){a.pick=Math.min(3,a.pick+1);if(a.pick>=3){heal(L(a.lv,0,.015));clearBul(inFront(100,220));shards(AC[a.id],6);}}}catch{}return r;};collect.__e157=1;}}catch{}
  try{const ou=Equipment25.update;Equipment25.update=function(dt){const all=gear.equipment;if(all&&S.a&&on())gear.equipment=all.filter(i=>i.kind!=='armor');try{return ou.apply(this,arguments);}finally{gear.equipment=all;}};}catch{}
  try{const od=Equipment25.draw;Equipment25.draw=function(){const r=od.apply(this,arguments);try{draw();}catch{}return r;};}catch{}}
 // ================= vòng lặp =================
 let last=-1,inst=false;
 const DEFS=()=>{const o={};try{for(const d of Gear44.defs())o[d.id]=d;}catch{}return o;};
 function tick(){let m='';try{m=mode;}catch{}if(!inst){try{if(typeof Gear44==='object'&&typeof Equipment25==='object'){installHooks();inst=true;}}catch{}}
  if(m!=='play'){if(m!=='pause'){S.w={};S.a=null;window.SSSE_A=false;Q.length=0;FX.length=0;VU.clear();last=-1;S.lastSup=false;}return;}
  installDamage();const t=T(),dt=last<0?0:Math.max(0,Math.min(.05,t-last));last=t;
  if(!on()){S.a=null;window.SSSE_A=false;return;}
  for(let i=Q.length-1;i>=0;i--)if(t>=Q[i].at){const q=Q[i];Q.splice(i,1);try{q.f();}catch{}}
  const s=sup(),edge=s&&!S.lastSup;S.lastSup=s;
  // giáp
  const ad=defOf('armor');if(ad){if(!S.a||S.a.id!==ad.id){S.a=Object.assign(A0(),{id:ad.id,lv:lvOf(ad.id),cd:t+3,shieldCd:t,skCd:t+4});}S.a.lv=lvOf(ad.id);window.SSSE_A=true;aTick(S.a,dt);if(edge)aUlt(S.a);}else{S.a=null;window.SSSE_A=false;}
  // vũ khí
  for(const k of ['missiles','sidearm']){const d=defOf(k),w=d&&W[d.id];if(!w){delete S.w[k];continue;}let st=S.w[k];if(!st||st.id!==d.id)st=S.w[k]={id:d.id,next:t+.8,sk:t+3};const lv=lvOf(d.id),F=full(k)*(CAL[d.id]||1);if(!(F>0))continue;
   const p=w.p*(s?.8:1);if(t>=st.next){st.next=t+p;const e=primary();if(e){const D=F*(SHARE+.02*(lv-1))*p;try{w.proc(D,e,lv,s);}catch(er){}spr(d.id+(s?'_is':'_in'),{x:e.x,y:e.y,sz:isBoss(e)?110:80,life:.4});}}
   const cd=(d.skill&&d.skill.cooldown)||10;if(t>=st.sk&&primary()){st.sk=t+cd;try{w.skill(F*SK*cd,lv);}catch{}}
   if(edge){try{w.ult(F*4,lv);}catch{}const e=primary();spr(d.id+'_tk',{x:e?e.x:240,y:e?e.y:300,sz:300,life:.9});}}
  for(const [e,v] of VU)if(e.dead||t>v.until)VU.delete(e);}
 function draw(){let g=null;try{g=ctx;}catch{}if(!g||!FX.length)return;const t=T();g.save();g.globalCompositeOperation='lighter';
  for(let i=FX.length-1;i>=0;i--){const f=FX[i],u=(t-f.t0)/f.life;if(u>=1||u<0){FX.splice(i,1);continue;}const al=(1-u)*(f.al||.85);g.globalAlpha=al;g.strokeStyle=g.fillStyle=f.c;g.lineCap='round';
   if(f.k==='line'){g.lineWidth=f.w;g.beginPath();g.moveTo(f.a.x,f.a.y);g.lineTo(f.b.x,f.b.y);g.stroke();g.globalAlpha=al*.6;g.strokeStyle='#fff';g.lineWidth=Math.max(1,f.w*.35);g.stroke();}
   else if(f.k==='poly'){g.lineWidth=f.w;g.beginPath();f.pts.forEach((q,j)=>j?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y));g.stroke();}
   else if(f.k==='spark'){g.lineWidth=2;g.beginPath();for(let j=0;j<f.n;j++){const a=f.rot+j*6.283/f.n,r0=f.R*.2+f.R*.5*u,r1=f.R*.45+f.R*.75*u;g.moveTo(f.x+Math.cos(a)*r0,f.y+Math.sin(a)*r0);g.lineTo(f.x+Math.cos(a)*r1,f.y+Math.sin(a)*r1);}g.stroke();}
   else if(f.k==='col'){const k190=window.COL190===false?1:.82;/* V190: Gemini — cột ≤72 px, mờ hơn để không che đạn địch */g.globalAlpha=al*.55*k190;/* V155: chống lóa */const w=(window.COL190===false?f.w:Math.min(72,f.w))*(1-u*.4),gr=g.createLinearGradient(f.x-w/2,0,f.x+w/2,0);gr.addColorStop(0,f.c+'00');gr.addColorStop(.5,f.c);gr.addColorStop(1,f.c+'00');g.fillStyle=gr;g.fillRect(f.x-w/2,0,w,H);g.globalAlpha=al*.35;g.fillStyle='#fff';g.fillRect(f.x-w*.08,0,w*.16,H);}
   else if(f.k==='slash'){const w=f.w*(1-u*.3),gr=g.createLinearGradient(0,f.y-w/2,0,f.y+w/2);gr.addColorStop(0,f.c+'00');gr.addColorStop(.5,f.c);gr.addColorStop(1,f.c+'00');g.fillStyle=gr;g.globalAlpha=al*.8;g.fillRect(0,f.y-w/2,W,w);}
   else if(f.k==='star'){const k=Math.min(1,u*1.2),x=f.a.x+(f.b.x-f.a.x)*k,y=f.a.y+(f.b.y-f.a.y)*k,r=5;g.beginPath();g.moveTo(x,y-r*2);g.lineTo(x+r*.6,y);g.lineTo(x,y+r*2);g.lineTo(x-r*.6,y);g.closePath();g.fill();g.beginPath();g.moveTo(x-r*1.6,y);g.lineTo(x,y+r*.5);g.lineTo(x+r*1.6,y);g.lineTo(x,y-r*.5);g.closePath();g.fill();}
   else if(f.k==='glyph'){const e=f.e;if(!e||e.dead){FX.splice(i,1);continue;}const r=12+4*Math.sin(t*8);g.lineWidth=2;g.beginPath();g.moveTo(e.x,e.y-r-6);g.lineTo(e.x+r,e.y-6);g.lineTo(e.x,e.y+r-6);g.lineTo(e.x-r,e.y-6);g.closePath();g.stroke();g.beginPath();g.moveTo(e.x,e.y-r*.5-6);g.lineTo(e.x,e.y+r*.5-6);g.stroke();}
   else if(f.k==='shard'){const p=P();for(let j=0;j<f.n;j++){const a=f.rot+j*6.283/f.n,r=26+30*u,x=p.x+Math.cos(a)*r,y=p.y+Math.sin(a)*r;g.save();g.translate(x,y);g.rotate(a);g.beginPath();g.moveTo(7,0);g.lineTo(0,3);g.lineTo(-7,0);g.lineTo(0,-3);g.closePath();g.fill();g.restore();}}
   else if(f.k==='spr'){g.globalCompositeOperation='source-over';g.globalAlpha=1;const fr=Math.min(f.n-1,Math.floor(u*f.n)),fw=f.m.naturalWidth/f.n,fh=f.m.naturalHeight;let x=f.x,y=f.y;if(f.fol){const p=P();x=p.x+(f.x-f.p0x);y=p.y+(f.y-f.p0y);}g.save();g.translate(x,y);if(f.rot)g.rotate(f.rot);const h=f.sz,w=h*fw/fh;g.drawImage(f.m,fr*fw,0,fw,fh,-w/2,-h/2,w,h);g.restore();g.globalCompositeOperation='lighter';}
   else if(f.k==='sand'){for(let j=0;j<10;j++){const x=f.x+((j*37)%120-60),y=f.y+((j*53+u*80)%90)-45;g.fillRect(x,y,2,2);}}}
  g.restore();}
 setInterval(()=>{try{tick();}catch(e){}},16);
 // mô tả trong Xưởng / API cho test
 window.SSSE3_API={state:()=>({a:S.a&&{id:S.a.id,lv:S.a.lv,layer:S.a.layer,debt:debt(S.a)},w:Object.fromEntries(Object.entries(S.w).map(([k,v])=>[k,v.id])),fx:FX.length,dealt:ST.dealt}),reset:()=>{ST.dealt=0;},SHARE,SK,full};
})();
