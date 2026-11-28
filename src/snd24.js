'use strict';
// V2.4-B · GÓI ÂM THANH TRẬN + NHÃN TÊN NHẠC + MỞ MÀN RADAR "GO!"
//  Âm thanh: dựng sẵn AudioBuffer bằng OfflineAudioContext lúc khởi động (0 tệp âm thanh), lúc chơi chỉ tạo BufferSource → gain → bus nén
//  → loa. Giới hạn đa âm: tối đa CAP tiếng cùng lúc + trần riêng từng loại + hồi chiêu loại (chống vỡ tiếng trên WebView Android).
//  Tiếng: đạn chính dày (shot) · tia laser (laser) · tích trúng boss / quái lớn (hit) · nổ nhỏ / lớn / chuỗi nổ boss bass nặng
//  (boomS / boomL / boomBoss) · chuông nhặt tinh thể lên cao độ khi nhặt liên tiếp (chime) · bung cánh Bạo Tẩu (wing) · nâng cấp vũ khí (upg)
//  · còi CẢNH BÁO boss (siren) · bíp báo laser (beep) · radar mở màn (go).
//  l6309 (Lượt 6) vẫn giữ hồi chiêu + hạ nhạc; khi SND24 chạy, l6309 nhường các tiếng trùng (laser/boom/boomBig/boss/beep/pickup) → không kêu đôi.
//  Nhãn nhạc: ô nhỏ góc phải dưới "♪ <tên bài>" hiện 3,5 s lúc vào trận và lúc boss xuất hiện rồi mờ dần (không backdrop-filter).
//  GO!: 0,65 s đầu trận — vòng radar cyan quét 1 vòng rồi chữ GO! vàng nảy ra (vẽ trên lớp trên cùng Feedback31.draw, không tạo canvas, không shadowBlur).
//  Tắt: window.SND24=false (âm thanh) · window.MT24=false (nhãn nhạc) · window.GO24=false (mở màn).
const SND24=(()=>{
 const on=()=>window.SND24!==false&&window.V24!==false;
 const SR=44100,BUF={},stat={made:0,ended:0,live:0,maxLive:0,drop:0,play:0,render:0,err:0,by:{}};
 const CAP=8,KCAP={shot:2,laser:1,hit:2,boomS:3,boomL:2,boomBoss:1,chime:3,wing:1,upg:1,siren:1,beep:1,go:1};
 const CD={shot:90,laser:300,hit:55,boomS:80,boomL:110,boomBoss:900,chime:35,wing:900,upg:350,siren:2400,beep:220,go:1000};
 const VOL={shot:.16,laser:.22,hit:.30,boomS:.42,boomL:.55,boomBoss:.8,chime:.34,wing:.5,upg:.42,siren:.34,beep:.28,go:.4};
 const liveK={},last={};
 // ---------- dựng sẵn ----------
 function nz(oc,sec){const b=oc.createBuffer(1,Math.ceil(SR*sec),SR),d=b.getChannelData(0);let s=2424;for(let i=0;i<d.length;i++){s=(Math.imul(s,1664525)+1013904223)>>>0;d[i]=s/2147483648-1;}return b;}
 function mk(oc,out,N){
  const env=(g,t,a,v,d)=>{g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,v),t+a);g.gain.exponentialRampToValueAtTime(.0001,t+d);};
  const o=(type,f0,f1,t,d,v,a=.004,lp=0,q=1)=>{const x=oc.createOscillator(),g=oc.createGain();x.type=type;x.frequency.setValueAtTime(f0,t);if(f1&&f1!==f0)x.frequency.exponentialRampToValueAtTime(f1,t+d);let n=x;if(lp){const f=oc.createBiquadFilter();f.type='lowpass';f.frequency.value=lp;f.Q.value=q;x.connect(f);n=f;}n.connect(g);g.connect(out);env(g,t,a,v,d);x.start(t);x.stop(t+d+.02);};
  const n=(t,d,v,type,f,q=1,sw=null,a=.002)=>{const s=oc.createBufferSource(),fl=oc.createBiquadFilter(),g=oc.createGain();s.buffer=N;fl.type=type;fl.Q.value=q;if(sw){fl.frequency.setValueAtTime(sw[0],t);fl.frequency.exponentialRampToValueAtTime(sw[1],t+d);}else fl.frequency.value=f;s.connect(fl);fl.connect(g);g.connect(out);env(g,t,a,v,d);s.start(t);s.stop(t+d+.02);};
  return {o,n};}
 const DEF={
  shot:[.12,({o,n})=>{o('sine',190,62,0,.09,.9,.002);o('square',95,60,0,.06,.18,.002,900);n(0,.05,.35,'bandpass',2200,2);n(0,.03,.25,'highpass',6000);}],
  laser:[.26,({o,n})=>{o('sawtooth',420,180,0,.22,.35,.004,2400,4);o('sawtooth',423,182,0,.22,.25,.004,2400,4);o('sine',110,70,0,.18,.6);n(0,.2,.2,'bandpass',3000,5,[4200,1400]);}],
  hit:[.06,({o,n})=>{n(0,.025,.9,'highpass',5200,1,null,.001);o('square',1650,1250,0,.03,.35,.001,6000);o('sine',900,600,0,.045,.4,.001);}],
  boomS:[.3,({o,n})=>{o('sine',120,40,0,.2,.8,.002);n(0,.18,.7,'lowpass',0,1,[2400,300]);n(0,.06,.35,'bandpass',1600,1.5);}],
  boomL:[.62,({o,n})=>{o('sine',90,30,0,.5,1,.003);o('triangle',170,50,0,.3,.35,.003);n(0,.45,.85,'lowpass',0,1,[3000,180]);n(.06,.3,.4,'bandpass',900,1);n(0,.05,.4,'highpass',4000);}],
  boomBoss:[1.9,({o,n})=>{for(const [t,k] of [[0,1],[.2,.8],[.42,.9],[.7,1.1]]){o('sine',95*k,32,t,.55,.9,.003);n(t,.5,.75,'lowpass',0,1,[3200,160]);n(t,.06,.35,'highpass',3800);}
    o('sine',48,28,.7,1.15,1,.02);o('sine',62,30,.72,1.0,.6,.03);n(.7,1.1,.55,'lowpass',0,.8,[1400,90],.03);}],
  chime:[.42,({o})=>{o('sine',1320,1320,0,.35,.55,.002);o('sine',1980,1980,0,.28,.3,.002);o('triangle',2640,2640,.03,.2,.14,.002);o('sine',660,660,0,.12,.18,.002);}],
  wing:[.95,({o,n})=>{n(0,.7,.6,'bandpass',0,2,[350,5200],.05);o('sawtooth',220,880,0,.55,.22,.04,3000,2);o('sawtooth',223,886,0,.55,.18,.04,3000,2);o('sine',55,110,0,.4,.55,.01);
    for(let i=0;i<6;i++)o('sine',1760*Math.pow(1.122,i),0,.3+i*.06,.3,.08,.002);}],
  upg:[.6,({o,n})=>{const f=[523,659,784,1047];f.forEach((h,i)=>{o('square',h,h,i*.07,.16,.16,.003,3800);o('sine',h*2,h*2,i*.07,.2,.1,.003);});o('sine',130,260,0,.3,.4,.01);n(.2,.3,.2,'highpass',7000);}],
  siren:[1.7,({o})=>{for(let k=0;k<2;k++){const t=k*.8;const x=(f0,f1)=>o('triangle',f0,f1,t,.78,.7,.06,2600,2);x(560,900);x(565,905);o('sine',70,70,t,.7,.5,.05);}}],
  beep:[.22,({o})=>{o('square',1250,1250,0,.06,.6,.002,5000);o('square',1250,1250,.1,.06,.5,.002,5000);}],
  go:[.8,({o,n})=>{o('sine',1480,1480,0,.3,.5,.002);o('sine',1480,1480,.32,.12,.2,.002);n(.18,.45,.5,'bandpass',0,1.5,[600,6000],.08);o('sawtooth',196,392,.35,.4,.3,.01,2200);o('sine',98,98,.35,.4,.6,.01);}],
 };
 async function render1(k){const [sec,fn]=DEF[k];const oc=new OfflineAudioContext(1,Math.ceil(SR*sec),SR);const c=oc.createDynamicsCompressor();c.threshold.value=-10;c.ratio.value=6;c.attack.value=.002;c.release.value=.12;c.connect(oc.destination);
  const g=oc.createGain();g.gain.value=.9;g.connect(c);fn(mk(oc,g,nz(oc,Math.max(.6,sec))));const b=await oc.startRendering();
  // chuẩn hóa đỉnh 0,9
  const d=b.getChannelData(0);let m=0;for(let i=0;i<d.length;i++){const a=Math.abs(d[i]);if(a>m)m=a;}if(m>0){const s=.9/m;for(let i=0;i<d.length;i++)d[i]*=s;}BUF[k]=b;stat.render++;}
 let rendering=false;
 async function renderAll(){if(rendering||!window.OfflineAudioContext)return;rendering=true;for(const k of Object.keys(DEF)){try{await render1(k);}catch(e){stat.err++;}await new Promise(r=>setTimeout(r,30));}}
 setTimeout(()=>{if(on())renderAll();},1500);
 // ---------- phát ----------
 let ac=null,bus=null;
 const soundOn=()=>{try{if(typeof sound!=='undefined')return !!sound;}catch{}return /BẬT/.test((document.getElementById('sound')||{}).textContent||'');};
 function ctxA(){try{if(typeof audio!=='undefined'&&audio)return audio;}catch{}try{if(typeof Audio393!=='undefined')Audio393.unlock();}catch{}try{if(typeof audio!=='undefined'&&audio)return audio;}catch{}return null;}
 function busFor(c){if(ac===c&&bus)return bus;ac=c;const g=c.createGain();g.gain.value=.5;const cp=c.createDynamicsCompressor();cp.threshold.value=-16;cp.ratio.value=5;cp.attack.value=.003;cp.release.value=.15;g.connect(cp);cp.connect(c.destination);bus=g;return bus;}
 function play(k,rate,vol){if(!on())return false;const b=BUF[k];if(!b)return false;const n=performance.now();if(n-(last[k]||-1e9)<(CD[k]||0))return true;
  if(!soundOn()||document.hidden)return true;const c=ctxA();if(!c||c.state!=='running')return true;
  if(stat.live>=CAP||(liveK[k]||0)>=(KCAP[k]||2)){stat.drop++;return true;}
  last[k]=n;try{const s=c.createBufferSource(),g=c.createGain();s.buffer=b;if(rate&&rate!==1)s.playbackRate.value=rate;g.gain.value=(vol==null?1:vol)*(VOL[k]||.3);s.connect(g);g.connect(busFor(c));
   stat.live++;liveK[k]=(liveK[k]||0)+1;stat.made++;stat.play++;stat.by[k]=(stat.by[k]||0)+1;if(stat.live>stat.maxLive)stat.maxLive=stat.live;
   s.onended=()=>{try{s.disconnect();g.disconnect();}catch{}stat.live--;liveK[k]--;stat.ended++;};s.start();}catch(e){stat.err++;}return true;}
 // l6309 → SND24 (trả true = đã lo, l6309 không kêu nữa)
 const MAP={laser:'laser',boom:'boomS',boomBig:'boomL',boss:'boomBoss',beep:'beep'};
 function route(k){if(!on()||!MAP[k]||!BUF[MAP[k]])return false;let r=1;try{if(superTime>0&&k==='laser')r=1.08;}catch{}play(MAP[k],r);return true;}
 function chime(pn){if(!on()||!BUF.chime)return false;play('chime',Math.pow(2,Math.min(pn,12)/12));return true;}/* +1 nửa cung mỗi viên liên tiếp, tối đa 1 quãng tám */
 function shot(id){if(!on()||id===1)return;let r=1;try{if(superTime>0)r=1.1;}catch{}play('shot',r*(.97+Math.random()*.06));}
 // ---------- theo dõi trận ----------
 let lm='',pw0=-1,st0=false,pend0=false,goT=-1e9,mtLast='',mtBoss=false;
 const nowS=()=>performance.now()/1000;
 function tick(){if(!on()&&window.GO24===false&&window.MT24===false)return;let md='';try{md=mode;}catch{}
  const play_=md==='play';
  if(play_&&lm!=='play'&&lm!=='pause'){let st=9;try{st=stageTime;}catch{}if(st<1.5){goT=nowS();if(window.GO24!==false&&on())play('go');mtLast='';mtBoss=false;showMt('start');}pw0=-1;}
  lm=md;if(!play_)return;
  try{const p=power;if(pw0>=0&&p>pw0&&stageTime>1)play('upg');pw0=p;}catch{}
  try{const s=superTime>0;if(s&&!st0)play('wing');st0=s;}catch{}
  try{const p=!!Feedback31.state().pending;if(p&&!pend0)play('siren');pend0=p;}catch{}
  try{const b=!!(boss&&!boss.dead);if(b&&!mtBoss){mtBoss=true;showMt('boss');}if(!b)mtBoss=false;}catch{}}
 setInterval(()=>{try{tick();}catch{}},50);
 function hookHit(){try{if(typeof Feedback31==='undefined'||Feedback31.__s24)return;const od=Feedback31.damage;
  Feedback31.damage=function(e,amount){const r=od.apply(this,arguments);try{if(on()&&e&&amount>0&&mode==='play'&&(e===boss||e.bossPart||e.elite||e.large))play('hit',.96+Math.random()*.08);}catch{}return r;};Feedback31.__s24=1;}catch{}}
 // ---------- nhãn tên bài nhạc ----------
 const NAMES={battle:'Tinh Hà Xung Trận',endless:'Vô Tận Thiên Hà',eclipse:'Nguyệt Thực Huyết Sắc',boss:'Đối Đầu Bá Chủ'};
 const CHN=['Thung Lũng Khởi Hành','Quỹ Đạo Lửa','Thành Phố Mây','Vành Đai Thiên Thạch','Hẻm Băng Tinh','Lò Rèn Hư Không','Thánh Đường Sao','Vực Dung Nham','Băng Nguyên Tử Khí','Lõi Thiên Hà'];
 let mtEl=null,mtT=null;
 function trackName(kind){let cur='';try{cur=Music96.state().cur||'';}catch{}if(kind==='boss')return NAMES.boss;
  if(cur==='endless'||cur==='eclipse')return NAMES[cur];try{if(gameMode==='endless')return NAMES.endless;}catch{}
  let c=0;try{c=Campaign36.chapter(level)|0;}catch{}return NAMES.battle+' · '+(CHN[c%CHN.length]);}
 function showMt(kind){if(window.MT24===false||window.V24===false)return;let en=false;try{en=Music96.state().en;}catch{}if(!en)return;
  const name=trackName(kind);if(!name)return;
  if(!mtEl){mtEl=document.createElement('div');mtEl.id='mt24';mtEl.setAttribute('aria-live','polite');mtEl.innerHTML='<i>♪</i><b></b>';}
  const host=document.fullscreenElement||document.webkitFullscreenElement||document.body;if(mtEl.parentNode!==host)host.appendChild(mtEl);
  mtEl.querySelector('b').textContent=name;mtEl.classList.remove('on');void mtEl.offsetWidth;mtEl.classList.add('on');
  clearTimeout(mtT);mtT=setTimeout(()=>{try{mtEl.classList.remove('on');}catch{}},3500);mtLast=name;}
 setInterval(()=>{try{if(mtEl&&mtEl.classList.contains('on')){let md='';try{md=mode;}catch{}if(md!=='play'&&md!=='pause')mtEl.classList.remove('on');}}catch{}},400);
 // ---------- mở màn radar GO! ----------
 const GOD=.65;
 function drawGo(){if(window.GO24===false||window.V24===false)return;const u=window.__go24u!=null?window.__go24u:(nowS()-goT)/GOD;/* __go24u: giữ 1 pha để chụp */if(!(u>=0&&u<1))return;let md='';try{md=mode;}catch{}if(md!=='play')return;
  const g=ctx,cx=W/2,cy=H*.46;g.save();try{
   // vòng radar quét (0 → .55)
   if(u<.62){const v=Math.min(1,u/.55),R=40+v*Math.min(W,H)*.42,a=(1-v*.6);g.globalCompositeOperation='lighter';
    g.globalAlpha=.55*a;g.strokeStyle='#38e1ff';g.lineWidth=3;g.beginPath();g.arc(cx,cy,R,0,6.2832);g.stroke();
    g.globalAlpha=.3*a;g.lineWidth=1.5;g.beginPath();g.arc(cx,cy,R*.62,0,6.2832);g.stroke();g.beginPath();g.arc(cx,cy,R*.3,0,6.2832);g.stroke();
    const ang=-1.5708+v*6.2832;g.globalAlpha=.75*a;g.lineWidth=2.5;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(ang)*R,cy+Math.sin(ang)*R);g.stroke();
    g.globalAlpha=.18*a;g.fillStyle='#38e1ff';g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,R,ang-.9,ang);g.closePath();g.fill();}
   // chữ GO! (.38 → 1)
   if(u>.38){const v=(u-.38)/.62,s=v<.35?.55+(v/.35)*.7:v<.55?1.25-(v-.35)/.2*.25:1,al=v<.7?1:Math.max(0,1-(v-.7)/.3);
    g.globalCompositeOperation='source-over';g.globalAlpha=al;g.translate(cx,cy);g.scale(s,s);g.textAlign='center';g.textBaseline='middle';
    g.font='900 64px system-ui,Arial,sans-serif';g.lineJoin='round';g.lineWidth=9;g.strokeStyle='#3a1a00';g.strokeText('GO!',0,0);
    g.fillStyle='#ffd21f';g.fillText('GO!',0,0);g.lineWidth=2;g.strokeStyle='#fff6b0';g.strokeText('GO!',0,-1);}
  }catch{}g.restore();}
 function hookTop(){try{if(typeof Feedback31==='undefined'||Feedback31.__go24)return;const od=Feedback31.draw;Feedback31.draw=function(){const r=od.apply(this,arguments);try{drawGo();}catch{}return r;};Feedback31.__go24=1;}catch{}}
 function hooks(){hookHit();hookTop();}
 hooks();setTimeout(hooks,1200);setTimeout(hooks,4000);
 return {play,route,chime,shot,stat:()=>Object.assign({},stat,{buf:Object.keys(BUF).length,keys:Object.keys(DEF).length,by:Object.assign({},stat.by)}),renderAll,BUF,DEF,showMt,go:()=>{goT=nowS();},goT:()=>goT,GOD};
})();
window.SND24S=SND24;
