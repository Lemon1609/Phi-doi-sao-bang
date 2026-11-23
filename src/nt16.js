'use strict';
// V309 LƯỢT 16 (V2.0) · HỆ ĐÁ NỘI TẠI — 3 ô kỹ năng bị động (Gemini, chủ dự án chuyển 22/11). Tắt: window.NT16=false
//  Ô 1 Công kích (vượt ải 40) · Ô 2 Sinh tồn (ải 80) · Ô 3 Chiến thuật (ải 120): mở ô = có sẵn 3 viên Lv1 (không gacha), mỗi ô lắp 1 viên, đổi tự do.
//  Nâng Lv1→5 bằng Hợp kim + Tinh Thể Nội Tại (nguồn: Ải Anh Hùng + càn quét AH, Tháp Boss tầng ≥ 10, mốc tuần 400/600, Tiệm Danh Dự). Không 💎.
//  Hiệu ứng chạy ở mọi chế độ chơi; số liệu ghi trong NT16.stat để bài kiểm đọc (tests/t_nt16.py).
//  Giao diện: tab ĐÁ NỘI TẠI trong màn ĐÁ KHẢM (Kho › ĐÁ KHẢM). Chưa tới ải 70 (Đá khảm còn khóa) thì nút ĐÁ KHẢM mở thẳng tab ĐÁ NỘI TẠI.
//  Lưu theo Bộ trang bị (LOAD7 trong l7309.js gọi NT16.loadout / NT16.setLoadout).
const NT16=(()=>{
 const on=()=>window.NT16!==false;
 const KEY='saobang-nt16';
 const fmt=n=>Number(n).toLocaleString('vi-VN');
 const T=s=>{try{toast(s);}catch{}};
 // ---------- bảng số (Gemini) ----------
 const SLOTS=[{id:'atk',n:'CÔNG KÍCH',st:40,ic:'slot_atk'},{id:'def',n:'SINH TỒN',st:80,ic:'slot_def'},{id:'tac',n:'CHIẾN THUẬT',st:120,ic:'slot_tac'}];
 const P=v=>(v*100).toLocaleString('vi-VN',{maximumFractionDigits:1})+'%';
 const STONES=[
  {id:'pha_giap',s:0,n:'Phá Giáp',v:[.04,.055,.07,.085,.10],d:v=>`+${P(v)} sát thương lên boss khi boss còn trên 50% máu`},
  {id:'phan_cong',s:0,n:'Phản Công',v:[.05,.065,.085,.10,.12],d:v=>`Mất khiên hoặc dưới 50% máu: +${P(v)} sát thương trong 8 s (hồi 15 s)`},
  {id:'xung_kich',s:0,n:'Xung Kích',v:[1.2,1.45,1.7,1.95,2.2],d:v=>`Mỗi 10 s phát một sóng nổ trước mũi tàu: ${P(v)} sát thương một loạt bắn chính`},
  {id:'hap_thu',s:1,n:'Hấp Thụ',v:[25,22,20,17,15],d:v=>`Hạ mỗi ${v} quái hồi 1% máu tối đa (tối đa 10%/trận)`},
  {id:'xung_chan',s:1,n:'Xung Chấn',v:[120,140,160,180,200],d:v=>`Khiên vỡ: xóa đạn địch trong bán kính ${v} px (hồi 20 s)`},
  {id:'vo_nl',s:1,n:'Vỏ Năng Lượng',v:[.3,.4,.5,.6,.7],d:v=>`+${String(v).replace('.',',')} s bất tử sau khi trúng đòn`},
  {id:'duy_tri',s:2,n:'Duy Trì Bạo Tẩu',v:[1,1.3,1.7,2.1,2.5],d:v=>`Bạo Tẩu kéo dài thêm ${String(v).replace('.',',')} s`},
  {id:'tu_truong',s:2,n:'Từ Trường',v:[.20,.27,.35,.42,.50],v2:[.06,.08,.10,.125,.15],d:(v,i)=>`+${P(v)} tầm hút vật phẩm · +${P(STONES[7].v2[i])} điểm Vô tận`},
  {id:'nap_nhanh',s:2,n:'Nạp Nhanh',v:[.05,.075,.10,.125,.15],d:v=>`−${P(v)} thời gian hồi tên lửa và tuyệt kỹ robot`}];
 const BY={};STONES.forEach(x=>BY[x.id]=x);
 const COST=[null,{hk:5000,c:10},{hk:10000,c:20},{hk:18000,c:35},{hk:30000,c:55}];// COST[lv] = nâng lv → lv+1
 // ---------- lưu ----------
 let S={v:1,c:0,lv:{},eq:[null,null,null],ann:[0,0,0]};
 try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&o.v===1)S=Object.assign(S,o);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}try{DeviceSave.flush();}catch{}};
 const lv=id=>Math.max(1,Math.min(5,S.lv[id]|0||1));
 const val=id=>BY[id].v[lv(id)-1];
 const maxStage=()=>{try{const c=Progress.getState().cleared||[];return c.length?Math.max(...c):0;}catch{return 0;}};
 const slotOpen=i=>maxStage()>=SLOTS[i].st;
 const anyOpen=()=>slotOpen(0);
 function checkUnlock(){let ch=false;for(let i=0;i<3;i++)if(slotOpen(i)&&!S.ann[i]){S.ann[i]=1;if(!S.eq[i])S.eq[i]=STONES.find(x=>x.s===i).id;ch=true;setTimeout(()=>T('MỞ Ô ĐÁ NỘI TẠI · '+SLOTS[i].n+' · 3 viên Lv1 (Kho › Đá khảm › Đá Nội Tại)'),600);}if(ch)save();}
 // viên đang có hiệu lực
 const eq=id=>{if(!on())return 0;const s=BY[id].s;return S.eq[s]===id&&slotOpen(s);};
 // ---------- tinh thể ----------
 function add(n,why){n=Math.max(0,Math.round(n));if(!n)return 0;S.c=(S.c|0)+n;save();return n;}
 const have=()=>S.c|0;
 const icon=()=>{try{return UI_ICONS.src('crystal');}catch{return '';}};
 // nâng cấp
 function canUp(id){const l=lv(id);if(l>=5)return {ok:false,why:'Đã tối đa Lv5'};const c=COST[l];if(have()<c.c)return {ok:false,why:'Thiếu Tinh Thể Nội Tại',c};let b=0;try{b=Progress.balance();}catch{}if(b<c.hk)return {ok:false,why:'Thiếu Hợp kim',c};return {ok:true,c};}
 function upgrade(id){if(!BY[id])return false;const r=canUp(id);if(!r.ok){T(r.why.toUpperCase());return false;}let ok=false;try{ok=!!Progress.spendCredits(r.c.hk);}catch{}
  if(!ok){T('KHÔNG TRỪ ĐƯỢC HỢP KIM');return false;}S.c-=r.c.c;S.lv[id]=lv(id)+1;save();try{Progress.render();}catch{}T('ĐÁ NỘI TẠI · '+BY[id].n+' LÊN Lv'+lv(id));return true;}
 function equip(id){const x=BY[id];if(!x||!slotOpen(x.s))return false;S.eq[x.s]=id;save();return true;}
 // ---------- trận ----------
 const st={fresh:1,broke:0,buff:0,bcd:0,xk:10,xcd:0,kills:0,healed:0,lastShield:0,lastRC:0,lastScore:null,frac:0,lastT:null,volley:0,run:0};
 const stat={xk:0,xkDmg:0,xkLast:0,xc:0,xcCleared:0,heal:0,buffN:0,vo:0,dt:0,bossMul:1};
 const mode_=()=>{try{return mode;}catch{return '';}};
 const endless=()=>{try{return document.getElementById('gamemode').value==='endless';}catch{return false;}};
 function newRun(){st.buff=0;st.bcd=0;st.xk=10;st.xcd=0;st.kills=0;st.healed=0;st.frac=0;st.lastScore=null;try{st.lastRC=robotCooldown;}catch{}}
 function tick(){if(!on())return;const m=mode_(),t=performance.now()/1000;
  if(m!=='play'){if(m!=='pause')st.fresh=1;st.lastT=null;return;}/* đồng hồ thật, chỉ đếm khi đang chơi (biến time của game không chạy đều) */
  if(st.fresh){st.fresh=0;newRun();st.run++;}
  if(st.lastT==null){st.lastT=t;return;}
  const dt=Math.min(.1,t-st.lastT);st.lastT=t;if(dt<=0)return;stat.dt+=dt;
  // đạn ta mới bắn: tính loạt bắn chính + nhân Phản Công
  let vol=0;const mul=st.buff>0&&eq('phan_cong')?1+val('phan_cong'):1;
  try{for(const s of shots){if(s.__nt16)continue;s.__nt16=1;if(!(s.damage>0))continue;if(!s.gearKind&&!s.gearItem&&!s.ally)vol+=s.damage;if(mul!==1)s.damage*=mul;}}catch{}
  if(vol>0)st.volley=vol;
  // Phản Công
  st.buff=Math.max(0,st.buff-dt);st.bcd=Math.max(0,st.bcd-dt);
  let h=0,mh=1;try{h=hp;mh=maxHp;}catch{}
  const broke=st.broke;st.broke=0;/* khiên chặn 1 đòn (Shield78) vừa vỡ vì trúng đòn — bắt trong bọc damage() */
  if(eq('phan_cong')&&st.bcd<=0&&(broke||h<mh*.5)&&h>0){st.buff=8;st.bcd=15;stat.buffN++;}
  st.xcd=Math.max(0,st.xcd-dt);
  // Xung Kích
  if(eq('xung_kich')){st.xk-=dt;if(st.xk<=0){st.xk=10;wave();}}
  // Nạp Nhanh: tuyệt kỹ robot vừa vào hồi
  try{const rc=robotCooldown;if(eq('nap_nhanh')&&rc>st.lastRC+1)robotCooldown=rc*(1-val('nap_nhanh'));st.lastRC=robotCooldown;}catch{}
  // Từ Trường: điểm Vô tận
  try{if(eq('tu_truong')&&endless()){if(st.lastScore!=null&&score>st.lastScore){st.frac+=(score-st.lastScore)*BY.tu_truong.v2[lv('tu_truong')-1];const a=Math.floor(st.frac);if(a>0){st.frac-=a;score+=a;}}st.lastScore=score;}else st.lastScore=null;}catch{}}
 function wave(){let x=0,y=0;try{x=player.x;y=player.y-190;}catch{return;}const R=150,d=val('xung_kich')*(st.volley||0);if(!(d>0))return;let hit=0;
  try{for(const e of enemies){if(e.dead||e===boss||e.bossPart)continue;if(Math.hypot(e.x-x,e.y-y)>R+(e.r||16))continue;const a=Math.min(e.hp,d);e.hp-=d;hit++;try{Report392.hit(a,'nt16');}catch{}try{Feedback31.damage(e,d,{nt16:1});}catch{}if(e.hp<=0)kill(e);}}catch{}
  try{if(boss&&!boss.dead&&Math.hypot(boss.x-x,boss.y-y)<R+120){damageBoss(d,'nt16',null);hit++;}}catch{}
  stat.xk++;stat.xkDmg+=d*hit;stat.xkLast=d;try{ring(x,y,'#7fe7ff',R);ring(x,y,'#ffd56a',R*.55);VisualFX.impact(x,y,'#7fe7ff',1.2);}catch{}}
 // ---------- móc vào game ----------
 const hk={};
 function hooks(){
  try{if(typeof Safety31!=='undefined'&&!hk.fr){hk.fr=1;const o=Safety31.frame;Safety31.frame=function(){const r=o.apply(this,arguments);try{tick();}catch(e){}return r;};}}catch{}
  try{if(typeof damageBoss==='function'&&!hk.db){hk.db=1;const o=damageBoss;const f=function(a,src,part){try{if(eq('pha_giap')&&Number.isFinite(a)&&boss&&!boss.dead){const cur=boss.coreMax?boss.coreHp:boss.hp,mx=boss.coreMax||boss.max;if(mx>0&&cur/mx>.5){a*=1+val('pha_giap');stat.bossMul=1+val('pha_giap');}else stat.bossMul=1;}}catch{}return o.call(this,a,src,part);};f.__nt16=1;damageBoss=f;}}catch{}
  try{if(typeof kill==='function'&&!hk.kill){hk.kill=1;const o=kill;const f=function(e){const was=e&&!e.dead;const r=o.apply(this,arguments);try{if(was&&e.dead&&eq('hap_thu')&&mode_()==='play'&&e!==boss&&!e.bossPart&&!e.meteor&&!e.rescue28){st.kills++;const N=val('hap_thu');if(st.kills>=N){st.kills=0;const cap=maxHp*.10;if(st.healed<cap-1e-9&&hp>0&&hp<maxHp){const g=Math.min(maxHp*.01,cap-st.healed,maxHp-hp);hp+=g;st.healed+=g;stat.heal+=g;try{hud();}catch{}}}}}catch{}return r;};f.__nt16=1;kill=f;}}catch{}
  try{if(typeof damage==='function'&&!hk.dmg){hk.dmg=1;const o=damage;const f=function(){const i0=invuln;let b0=0,R0;try{b0=bulletShieldTime>0&&mode_()==='play'?1:0;}catch{}
    /* Xung Chấn: khiên sắp vỡ → nâng bán kính xóa đạn sẵn có của Shield78 (window.SH78R, mặc định 90 px) */const xc=b0&&eq('xung_chan')&&st.xcd<=0;if(xc){R0=window.SH78R;window.SH78R=Math.max(90,val('xung_chan'));}
    let n0=0;try{if(xc)n0=bullets.filter(b=>!b.dead).length;}catch{}
    let r;try{r=o.apply(this,arguments);}finally{if(xc){if(R0===undefined)delete window.SH78R;else window.SH78R=R0;}}
    try{const popped=b0&&!(bulletShieldTime>0);if(popped){st.broke=1;if(xc){st.xcd=20;stat.xc++;try{stat.xcCleared+=n0-bullets.filter(b=>!b.dead).length;}catch{}try{const R=val('xung_chan');ring(player.x,player.y,'#7fe7ff',R);ring(player.x,player.y,'#ffffff',R*.6);}catch{}}}
     if(eq('vo_nl')&&invuln>i0+.05&&mode_()==='play'){invuln+=val('vo_nl');stat.vo++;}}catch{}return r;};f.__nt16=1;damage=f;}}catch{}
  try{if(typeof activateSuper==='function'&&!hk.sup){hk.sup=1;const o=activateSuper;const f=function(){const b=superTime;const r=o.apply(this,arguments);try{if(eq('duy_tri')&&superTime>b+.5)superTime+=val('duy_tri');}catch{}return r;};f.__nt16=1;activateSuper=f;}}catch{}
  try{if(typeof Pilot67!=='undefined'&&!Pilot67.__nt16){const o=Pilot67.gearRate;Pilot67.gearRate=function(k){let r=o.apply(this,arguments);try{if(k==='missiles'&&eq('nap_nhanh'))r*=1-val('nap_nhanh');}catch{}return r;};Pilot67.__nt16=1;}}catch{}
  // tầm hút: nhân vào hệ số __mag91 mà vòng nhặt đồ đọc
  try{if(!hk.mag){hk.mag=1;let raw=window.__mag91;Object.defineProperty(window,'__mag91',{configurable:true,get(){const b=(raw==null||raw==='')?1:raw;return eq('tu_truong')&&mode_()==='play'?b*(1+val('tu_truong')):raw;},set(v){raw=v;}});}}catch{}
  // Tháp Boss tầng ≥ 10
  try{if(typeof Progress!=='undefined'&&!hk.rw&&typeof Meta40!=='undefined'){hk.rw=1;const o=Progress.rewardStage;Progress.rewardStage=function(){let run=null,best=0;try{const m=Meta40.state();run=m.run;best=m.S.tower.best|0;}catch{}const r=o.apply(this,arguments);
    try{if(on()&&run&&run.floor>=10){const f=run.floor,n=f>best?towerAmt(f):1;add(n);if(r&&Array.isArray(r.materials))r.materials.push('+'+n+' Tinh Thể Nội Tại');setTimeout(()=>T('THÁP BOSS · +'+n+' TINH THỂ NỘI TẠI'),1200);}}catch{}return r;};}}catch{}
  // tab trong màn Đá khảm + nút Kho
  try{if(typeof Nav74!=='undefined'&&Nav74.F&&Nav74.F.stones&&!hk.nav){hk.nav=1;const F=Nav74.F.stones,olk=F.lk,ogo=F.go;F.__olk=olk;F.lk=()=>{try{if(olk&&olk())return true;}catch{}return on()&&anyOpen();};
    F.go=()=>{let base=true;try{base=!olk||olk();}catch{}if(!base&&on()&&anyOpen()){open();return;}pendTab=null;ogo();};}}catch{}
  checkUnlock();}
 const towerAmt=f=>f>=25?6:f>=20?5:f>=15?4:3;
 // Ải Anh Hùng (l11309 heroReward / heroSweep gọi)
 const heroAmt=n=>{const ch=Math.ceil((n|0)/20);return ch>=6?3:ch>=3?2:1;};
 function heroGain(n,sweep){if(!on())return 0;return add(heroAmt(n));}
 // ---------- giao diện ----------
 let pendTab=null;
 const I=(k,cls='')=>{try{const u=UI_ICONS.src(k);if(u)return `<img class="nt16i ${cls}" src="${u}" alt="">`;}catch{}return '';};
 const css=`.st71 .nt16tabs{display:flex;gap:6px;margin:0 0 10px}.st71 .nt16tabs button{flex:1;min-height:38px;font:800 12px/1 inherit;letter-spacing:1px;color:#cfe3f5;background:linear-gradient(#123a6e,#0b2448);border:1px solid #2f6bb3;clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
.st71 .nt16tabs button[aria-pressed=true]{color:#2a1700;text-shadow:0 1px 0 #fff4c0;background:linear-gradient(#fff6c4 0,#ffdc63 42%,#f2a91d 56%,#ffcc45 100%);border:1px solid #fff0b0;box-shadow:inset 0 1px 0 #fffbe6,inset 0 -3px 0 #b9730a,0 2px 0 #4a2c00,0 0 10px #ffc84a44}
.st71 .nt16tabs button.lk{opacity:.55}
.nt16{color:#dbeeff}.nt16 .nt16r{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:0 0 8px;padding:6px 8px;background:#071a33;border:1px solid #1f4d86;font-size:12px}
.nt16 .nt16r b{color:#7fe7ff;font-size:14px}.nt16 img.nt16i{width:20px;height:20px;object-fit:contain;vertical-align:-5px;margin-right:4px}
.nt16 .nt16s{margin:0 0 10px;padding:8px;background:linear-gradient(#0d2c58,#081d3d);border:1px solid #2a64a8;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px)}
.nt16 .nt16s h4{margin:0 0 6px;font:900 12px/1.2 inherit;letter-spacing:1.2px;color:#ffd56a;display:flex;align-items:center;gap:4px;white-space:nowrap;min-width:0}.nt16 .nt16s h4 small{margin-left:auto;color:#9fe9ff;font-weight:800;letter-spacing:.3px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;min-width:0}.nt16 .nt16s h4 small.off{color:#8fb3d6;font-weight:600}
.nt16 .nt16s.lk{opacity:.6}.nt16 .nt16g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.nt16 .nt16g button{position:relative;min-height:74px;padding:6px 4px;color:#dbeeff;background:#0a2347;border:1px solid #23558f;font:700 10.5px/1.2 inherit;display:flex;flex-direction:column;align-items:center;gap:3px}
.nt16 .nt16g button .hx{position:relative;width:38px;height:38px;display:grid;place-items:center;clip-path:polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%);background:linear-gradient(160deg,#ffffff,#9fb6cc 45%,#5d7590 55%,#e6f0fa)}.nt16 .nt16g button .hx::before{content:'';position:absolute;inset:2px;clip-path:inherit;background:radial-gradient(circle at 50% 35%,var(--c1),var(--c2) 70%)}.nt16 .nt16g button .hx img.nt16i{position:relative;width:26px;height:26px;margin:0;filter:drop-shadow(0 1px 1px #000a)}.nt16 .nt16g.t0{--c1:#ff8a4a;--c2:#7a1f0c}.nt16 .nt16g.t1{--c1:#3fe0c8;--c2:#0b4a52}.nt16 .nt16g.t2{--c1:#c88bff;--c2:#4a2380}.nt16 .nt16g.t2 button .hx{background:linear-gradient(160deg,#fff6c4,#ffd04a 45%,#b77a0e 55%,#ffe9a0)}.nt16 .nt16g button.eq{border-color:#ffd56a;box-shadow:inset 0 0 0 1px #ffd56a,0 0 10px #ffd56a55;background:#1a2f52}
.nt16 .nt16g button.sel{outline:2px solid #7fe7ff;outline-offset:-2px}.nt16 .nt16g button i{font-style:normal;font-size:9.5px;color:#7fe7ff}
.nt16 .nt16g button em{position:absolute;top:4px;right:4px;width:15px;height:15px;border-radius:50%;background:linear-gradient(#fff3b0,#ffc53d 55%,#c47a00);box-shadow:0 0 0 1px #3a2200,0 0 6px #ffd56a99;font-size:0}.nt16 .nt16g button em::after{content:'';position:absolute;left:5px;top:2.5px;width:3.5px;height:7px;border:solid #2a1700;border-width:0 2px 2px 0;transform:rotate(45deg)}
.nt16 .nt16d{margin:8px 0 0;padding:8px;background:#06152b;border:1px solid #2a64a8;font-size:11.5px;line-height:1.45}
.nt16 .nt16d b{color:#ffd56a}.nt16 .nt16d .nx{color:#46ffb2}.nt16 .nt16d .cost{display:flex;gap:10px;align-items:center;margin:6px 0}.nt16 .nt16d .cost span.no{color:#ff7a7a}
.nt16 .nt16bt{display:flex;gap:6px;margin-top:6px}.nt16 .nt16bt button{flex:1;min-height:40px;font:900 12px/1 inherit;letter-spacing:1px;color:#2a1700;text-shadow:0 1px 0 #fff4c0;background:linear-gradient(#fff6c4 0,#ffdc63 42%,#f2a91d 56%,#ffcc45 100%);border:1px solid #fff0b0;box-shadow:inset 0 1px 0 #fffbe6,inset 0 -3px 0 #b9730a,0 2px 0 #4a2c00,0 0 10px #ffc84a44}.nt16 .nt16bt button:not(:disabled):active{transform:translateY(1px);box-shadow:inset 0 1px 0 #fffbe6,inset 0 -1px 0 #b9730a,0 1px 0 #4a2c00}
.nt16 .nt16bt button.alt{color:#dbeeff;background:linear-gradient(#1b4d8c,#10325f);border-color:#4f8fd8}.nt16 .nt16bt button:disabled{filter:grayscale(.8) brightness(.7)}
.nt16 .nt16f{font-size:10.5px;line-height:1.45;color:#c4dcf2;margin:10px 0 64px;padding:6px 8px;background:#06152b99;border-left:2px solid #2f6bb3}.m63.st71 .adv-btns .adv-x{background:linear-gradient(#1f5799 0,#163f73 48%,#0d2a52 52%,#123a6b 100%)!important;background-image:linear-gradient(#1f5799 0,#163f73 48%,#0d2a52 52%,#123a6b 100%)!important;border:1px solid #9cc4ea!important;border-radius:0!important;color:#eaf5ff!important;text-shadow:0 1px 0 #000a!important;box-shadow:inset 0 1px 0 #d6ebff88,inset 0 -2px 0 #061a33,0 0 0 1px #0a2140!important;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);animation:none!important;filter:none!important}.m63.st71 .adv-btns .adv-x::before,.m63.st71 .adv-btns .adv-x::after{display:none!important}`;
 function ensureCss(){if(document.getElementById('nt16css'))return;const s=document.createElement('style');s.id='nt16css';s.textContent=css;document.head.appendChild(s);}
 let sel=null;
 function tabs(cur){const lkS=!stoneOpen();return `<div class="nt16tabs"><button type="button" data-nt="tab-stone" aria-pressed="${cur==='stone'}" class="${lkS?'lk':''}">ĐÁ KHẢM${lkS?' · ẢI 70':''}</button><button type="button" data-nt="tab-nt" aria-pressed="${cur==='nt'}">ĐÁ NỘI TẠI</button></div>`;}
 const stoneOpen=()=>{try{return Nav74.F.stones.__olk?Nav74.F.stones.__olk():maxStage()>=70;}catch{return maxStage()>=70;}};
 function body(){checkUnlock();const b=(()=>{try{return Progress.balance();}catch{return 0;}})();
  if(!sel||!BY[sel])sel=S.eq.find(Boolean)||'pha_giap';
  const slots=SLOTS.map((sl,i)=>{const open=slotOpen(i);return `<div class="nt16s ${open?'':'lk'}"><h4>${I(sl.ic)}Ô ${i+1} · ${sl.n}<small class="${open?'':'off'}">${open?(S.eq[i]?BY[S.eq[i]].n:'—'):'mở ở ải '+sl.st}</small></h4><div class="nt16g t${i}">${STONES.filter(x=>x.s===i).map(x=>`<button type="button" data-nt="sel" data-id="${x.id}" class="${S.eq[i]===x.id&&open?'eq':''} ${sel===x.id?'sel':''}" ${open?'':'disabled'}>${S.eq[i]===x.id&&open?'<em title="Đang lắp"></em>':''}<span class="hx">${I(x.id)}</span><span>${x.n}</span><i>Lv${lv(x.id)}</i></button>`).join('')}</div></div>`;}).join('');
  const x=BY[sel],l=lv(sel),i=STONES.indexOf(x),open=slotOpen(x.s),c=COST[l],cu=canUp(sel);
  const det=`<div class="nt16d"><b>${x.n} · Lv${l}/5</b> — ${x.d(x.v[l-1],l-1)}${l<5?`<br><span class="nx">Lv${l+1}: ${x.d(x.v[l],l)}</span>`:''}
   ${l<5?`<div class="cost">Chi phí: <span class="${b<c.hk?'no':''}">${I('alloy')}${fmt(c.hk)}</span><span class="${have()<c.c?'no':''}">${I('crystal')}${c.c}</span></div>`:'<div class="cost">Đã tối đa.</div>'}
   <div class="nt16bt"><button type="button" class="alt" data-nt="eq" data-id="${sel}" ${open&&S.eq[x.s]!==sel?'':'disabled'}>${S.eq[x.s]===sel?'ĐANG LẮP':'LẮP VÀO Ô '+(x.s+1)}</button><button type="button" data-nt="up" data-id="${sel}" ${cu.ok?'':'disabled'}>${l>=5?'TỐI ĐA':'NÂNG CẤP'}</button></div></div>`;
  return `<div class="nt16"><div class="nt16r"><span>${I('crystal')}Tinh Thể Nội Tại: <b>${fmt(have())}</b></span><span>${I('alloy')}${fmt(b)}</span></div>${slots}${det}
   <p class="nt16f">Nguồn Tinh Thể: Ải Anh Hùng 1–3 / lượt (cả càn quét) · Tháp Boss tầng ≥ 10: 3–6 lần đầu, 1 khi vượt lại · mốc năng động tuần 400 (+5) và 600 (+10) · Tiệm Danh Dự. Bộ trang bị (BỘ 1/2/3) lưu kèm 3 viên đang lắp.</p></div>`;}
 let host=null;
 function hostEl(){let el=document.querySelector('.st71');if(!el){el=document.createElement('div');el.className='m63 adv69 st71 nt16host';el.hidden=true;document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target===el)el.hidden=true;});}return el;}
 function open(){if(!on())return;ensureCss();const el=hostEl();host=el;el.dataset.nt16='1';render();el.hidden=false;}
 function render(){const el=host||hostEl();el.innerHTML=`<div class="m63-card adv-card nt16card"><div class="m63-eye">KHO · ĐÁ NỘI TẠI</div>${tabs('nt')}${body()}<div class="adv-btns"><button class="adv-x" data-h7="1" data-nt="close">ĐÓNG</button></div></div>`;}
 // bắt click (pha bắt trước để không lọt xuống bộ xử lý của stone71)
 document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-nt]');if(!t||!on())return;const el=t.closest('.st71');if(!el)return;e.stopPropagation();e.preventDefault();const a=t.dataset.nt,id=t.dataset.id;
  if(a==='tab-nt'){host=el;el.dataset.nt16='1';ensureCss();render();}
  else if(a==='tab-stone'){if(!stoneOpen()){T('ĐÁ KHẢM MỞ Ở ẢI 70');return;}el.dataset.nt16='';el.hidden=true;try{Nav74.F.stones.go();}catch{}}
  else if(a==='sel'){sel=id;render();}else if(a==='eq'){equip(id);render();}else if(a==='up'){upgrade(id);render();}else if(a==='close'){el.hidden=true;el.dataset.nt16='';}},true);
 // chèn hàng tab vào màn Đá khảm của stone71
 function injectTabs(){if(!on())return;const el=document.querySelector('.st71:not([hidden])');if(!el||el.dataset.nt16==='1')return;const card=el.querySelector('.m63-card');if(!card||card.querySelector('.nt16tabs'))return;ensureCss();
  const w=document.createElement('div');w.innerHTML=tabs('stone');const eye=card.querySelector('.m63-eye');(eye||card.firstChild)?(eye?eye.after(w.firstChild):card.prepend(w.firstChild)):card.appendChild(w.firstChild);}
 /* L16 chỉnh UI: nút đáy màn Đá khảm / Đá Nội Tại dùng kiểu Chrome/Royal Blue thay skin tím hop307 */
 function chromeBtns(){if(!on())return;document.querySelectorAll('.st71').forEach(el=>{if(el.__nt16mo)return;el.__nt16mo=1;try{new MutationObserver(()=>{el.querySelectorAll('.adv-btns .adv-x.h307s').forEach(b=>{b.dataset.h7='1';b.classList.remove('h307s');});}).observe(el,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});}catch{}});document.querySelectorAll('.st71 .adv-btns .adv-x').forEach(b=>{b.dataset.h7='1';b.classList.remove('h307s');});}
 setInterval(()=>{try{hooks();injectTabs();ensureCss();chromeBtns();}catch{}},400);

 // ---------- bộ trang bị ----------
 const loadout=()=>S.eq.slice();
 function setLoadout(a){if(!Array.isArray(a))return false;for(let i=0;i<3;i++){const id=a[i];if(id&&BY[id]&&BY[id].s===i)S.eq[i]=id;}save();return true;}
 return {STONES,SLOTS,COST,add,have,icon,lv,val,eq,equip,upgrade,canUp,open,render,loadout,setLoadout,heroGain,heroAmt,towerAmt,stat,st,wave,slotOpen,
  state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();}};
})();window.NT16=NT16;
