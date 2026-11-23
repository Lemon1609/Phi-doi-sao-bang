'use strict';
// V2.1 · EVO21_SFX — âm thanh động tổng hợp bằng WebAudio (0 tệp âm thanh, chủ dự án 23/11):
//  · tên lửa / tàu con / va chạm theo HỆ (lửa · băng · điện · hư không · thiên giới), độ giàu bồi âm theo bậc, Bạo Tẩu nâng cao độ + thêm bồi âm
//  · Chiến Thần: khóa cơ khí + sub-bass khi biến robot, quét sóng xung kích lúc Tuyệt kỹ E (hạ nhạc)
//  · Kho / Xưởng SSS: tiếng bấm kim loại khi đổi mốc, năng lượng khi cường hóa, hợp âm khi hợp thể SSS
// Dùng chung AudioContext của Audio393 (không tạo thêm), theo nút ÂM THANH (`sound`); nhạc nền hạ qua Music96.duckFx.
// Chống vỡ tiếng loa: trần 10 tiếng cùng lúc, hồi chiêu theo loại, nén DynamicsCompressor riêng. Tắt: window.EVO21SFX=false · window.EVO21=false.
(()=>{
 const ON=()=>window.EVO21!==false&&window.EVO21SFX!==false;
 let ac=null,bus=null,nb=null,voices=0;const MAXV=10;
 const sfxOn=()=>{try{return !!sound;}catch{return false;}};
 function ctxA(){try{if(typeof audio!=='undefined'&&audio)return audio;}catch{}return null;}
 function A(){const a=ctxA();if(!a)return null;if(a!==ac){ac=a;bus=null;}if(!bus){try{const c=ac.createDynamicsCompressor();c.threshold.value=-18;c.knee.value=8;c.ratio.value=6;c.attack.value=.003;c.release.value=.12;bus=ac.createGain();bus.gain.value=.42;bus.connect(c);c.connect(ac.destination);
   nb=ac.createBuffer(1,Math.ceil(ac.sampleRate*.5),ac.sampleRate);const d=nb.getChannelData(0);let s=2109;for(let i=0;i<d.length;i++){s=(Math.imul(s,1664525)+1013904223)>>>0;d[i]=s/2147483648-1;}}catch{bus=null;return null;}}return ac;}
 // mở khóa âm thanh ở cử chỉ đầu tiên (Android WebView cần resume trong sự kiện chạm)
 const unlock=()=>{try{if(!ON())return;if(typeof Audio393!=='undefined'&&Audio393.unlock)Audio393.unlock();const a=A();if(a&&a.state!=='running')a.resume().catch(()=>{});}catch{}};
 ['pointerdown','touchstart','keydown'].forEach(ev=>window.addEventListener(ev,unlock,{passive:true,capture:true}));
 const ready=()=>ON()&&sfxOn()&&!document.hidden&&A()&&ac.state==='running'&&bus;
 const CD={},now=()=>performance.now();function cd(k,ms){const n=now();if(n-(CD[k]||-1e9)<ms)return false;CD[k]=n;return true;}
 let played=0,dropped=0,peak=0;function V(){if(voices>=MAXV){dropped++;return false;}voices++;played++;if(voices>peak)peak=voices;return true;}
 function osc(type,f0,f1,t,d,v,det){if(!V())return;const x=ac.createOscillator(),g=ac.createGain();x.type=type;x.frequency.setValueAtTime(f0,t);if(det)x.detune.value=det;if(f1&&f1!==f0)x.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+d);
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d);x.connect(g);g.connect(bus);x.start(t);x.stop(t+d+.02);x.onended=()=>{voices--;try{x.disconnect();g.disconnect();}catch{}};}
 function noi(t,d,v,type,f,q,f1){if(!V())return;const s=ac.createBufferSource(),fl=ac.createBiquadFilter(),g=ac.createGain();s.buffer=nb;fl.type=type;fl.frequency.setValueAtTime(f,t);if(f1)fl.frequency.exponentialRampToValueAtTime(f1,t+d);if(q)fl.Q.value=q;
   g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);g.connect(bus);s.start(t,Math.random()*.2);s.stop(t+d+.02);s.onended=()=>{voices--;try{s.disconnect();fl.disconnect();g.disconnect();}catch{}};}
 // ---------- hệ theo tên món ----------
 const EL=k=>{k=String(k||'');if(/inferno|solar|stellar|comet|nova|monarch_inferno|flame/.test(k))return 'fire';if(/cryo|prism|ricochet|frost|ice/.test(k))return 'ice';if(/thunder|rail|lance|monarch_rail/.test(k))return 'zap';
   if(/void|singular|devour|chrono|gravity|swarm|monarch12/.test(k))return 'void';return 'sky';};
 const TT={thuong:0,luc:1,lam:2,tim:3,tim5:3,ss:3,sss:3};
 const tierIdx=(k,t,sss)=>sss?3:Number.isInteger(t)&&t>=0?Math.min(3,t):(()=>{try{return TT[TB309.info(k,'sidearm').tier]??2;}catch{return 2;}})();
 const supNow=()=>{try{return superTime>0;}catch{return false;}};
 // bồi âm: số lớp = 1 + bậc (+1 khi Bạo Tẩu), cao độ ×1,12 khi Bạo Tẩu
 function partials(type,f,t,d,v,n,ratios){for(let i=0;i<n;i++){const r=ratios[i]||i+1;osc(type,f*r,f*r*.98,t,d*(1-.12*i),v/(1+i*1.3));}}
 const P={
  fire:{fire:(t,k,n)=>{osc('sine',190*k,70*k,t,.15,.10);noi(t,.12,.05,'lowpass',1100,0,400);partials('sawtooth',95*k,t,.1,.018,n,[1,2,3,4]);},
        hit:(t,k,big)=>{osc('sine',(big?95:130)*k,40,t,big?.3:.18,big?.16:.09);noi(t,big?.28:.15,big?.09:.05,'lowpass',big?900:1200,0,250);}},
  ice:{fire:(t,k,n)=>{partials('triangle',1500*k,t,.18,.05,n+1,[1,2.76,5.4,8.9]);noi(t,.05,.02,'highpass',6000);},
       hit:(t,k,big)=>{partials('sine',2100*k,t,big?.32:.2,big?.06:.04,big?4:3,[1,2.76,5.4,8.9]);noi(t,.06,.03,'highpass',5200);}},
  zap:{fire:(t,k,n)=>{osc('square',900*k,2800*k,t,.05,.035);noi(t,.07,.04,'bandpass',4200,4);if(n>2)osc('sawtooth',1800*k,600*k,t+.02,.06,.015);},
       hit:(t,k,big)=>{noi(t,big?.12:.06,big?.08:.05,'highpass',2800);osc('sawtooth',1300*k,280,t,big?.12:.06,.03);}},
  void:{fire:(t,k,n)=>{osc('sine',240*k,80*k,t,.26,.08);osc('sine',243*k,81*k,t,.26,.05);if(n>1)osc('triangle',480*k,160*k,t,.2,.015*n);},
        hit:(t,k,big)=>{osc('sine',(big?80:110)*k,32,t,big?.45:.28,big?.14:.08);noi(t,big?.4:.2,big?.05:.03,'lowpass',380,0,120);}},
  sky:{fire:(t,k,n)=>{partials('sine',880*k,t,.24,.04,n+1,[1,1.5,2,3]);},
       hit:(t,k,big)=>{partials('sine',1320*k,t,big?.35:.22,big?.05:.035,big?4:3,[1,1.5,2,3]);}},
 };
 function fire(key,t0,sss,sup,mis){if(!mis||!ON())return;const el=EL(key);if(!cd('f'+el,85))return;if(!ready())return;const n=tierIdx(key,t0,sss)+1+(sup||supNow()?1:0),k=(sup||supNow())?1.12:1;try{P[el].fire(ac.currentTime+.005,k,Math.min(5,n));}catch{}}
 function pod(key,sss,sup){if(!ON())return;const el=EL(key);if(!cd('p',120))return;if(!ready())return;const n=tierIdx(key,null,sss),k=sup?1.12:1,t=ac.currentTime+.005;
   try{/* tàu con: phiên bản nhẹ của tiếng phóng theo hệ */if(el==='fire')osc('sine',260*k,120*k,t,.06,.035);else if(el==='ice')partials('triangle',2200*k,t,.08,.02,1+(n>1?1:0),[1,2.76]);else if(el==='zap')noi(t,.04,.025,'bandpass',4800,5);else if(el==='void')osc('sine',300*k,140*k,t,.09,.03);else partials('sine',1200*k,t,.09,.018,1+(n>1?1:0),[1,1.5]);}catch{}}
 function hit(key,big,mis){if(!ON())return;const el=EL(key);if(!cd('h'+el+(big?'B':''),big?120:70))return;if(!ready())return;const k=supNow()?1.08:1;try{P[el].hit(ac.currentTime+.005,k,!!big);}catch{}if(big&&mis)duck(.2,.25);}
 // ---------- V2.1.42: chuông nhặt [P] / [+] riêng + sóng dâng vào Bạo Tẩu ----------
 function pick(type){if(!ON())return;if(type!=='power'&&type!=='heal'&&type!=='shield'&&type!=='super')return;if(!cd('pk'+type,90))return;if(!ready())return;const t=ac.currentTime+.005;
   if(type==='power'){/* [P]: hợp âm rải đi lên sáng, kim loại */for(const [i,f] of [[0,784],[1,1046.5],[2,1318.5]])osc('square',f,f,t+i*.045,.09,.022);partials('triangle',1568,t+.13,.22,.035,3,[1,2,3]);}
   else if(type==='heal'){/* [+]: quãng ba trưởng êm, ngân dài */osc('sine',659.25,659.25,t,.32,.05);osc('sine',830.6,830.6,t+.07,.36,.045);osc('sine',1318.5,1318.5,t+.14,.3,.02);}
   else if(type==='shield'){partials('triangle',1046.5,t,.25,.035,3,[1,1.5,2]);}
   else {osc('sawtooth',300,1200,t,.25,.03);partials('sine',1200,t+.2,.35,.04,3,[1,1.5,2]);}}
 function surge(){if(!ON()||!cd('surge',600))return;if(!ready())return;const t=ac.currentTime+.01;
   noi(t,.42,.08,'bandpass',300,1.4,4200);/* quét nhiễu dâng 0,4 s */osc('sawtooth',110,440,t,.38,.035);osc('sawtooth',111.5,446,t,.38,.025);
   osc('sine',55,38,t+.36,.55,.2);/* sub-bass khi bung */partials('sine',880,t+.36,.4,.035,3,[1,1.5,2]);duck(.25,.6);}
 // ---------- hạ nhạc (V2.1.42: tối đa 25 % khi nổ lớn / Tuyệt kỹ E) ----------
 function duck(a,d){if(!ON())return;if(window.V2142!==false)a=Math.min(a,.25);try{if(window.Music96&&Music96.duckFx)Music96.duckFx(a,d);}catch{}}
 // ---------- Chiến Thần: biến hình + Tuyệt kỹ E ----------
 function transform(m){if(!ready())return;const t=ac.currentTime+.01;
   osc('square',2300,2300,t,.025,.05);osc('square',1700,1700,t+.07,.025,.05);/* khóa cơ khí 2 nhịp */noi(t+.03,.08,.05,'bandpass',2600,6);
   osc('sawtooth',260,980,t+.1,.26,.03);/* nạp năng lượng */osc('sine',62,36,t+.18,.8,.22);osc('sine',124,72,t+.18,.5,.05);/* sub-bass */
   if(m>=3)partials('sine',660,t+.3,.5,.04,3,[1,1.5,2]);duck(.4,.9);}
 function ult(){if(!ready())return;const t=ac.currentTime+.01;noi(t,.45,.11,'bandpass',260,1.2,3600);/* quét sóng 0,4 s */osc('sawtooth',90,420,t,.4,.03);
   osc('sine',72,30,t+.38,.7,.24);noi(t+.38,.55,.12,'lowpass',700,0,160);/* nổ ở đỉnh bùng neon */duck(.6,1.2);}
 let wasRob=false,lastU=0;
 setInterval(()=>{if(!ON())return;let rob=false,U=0;try{rob=!!(activeRobot&&activeRobot.super&&superTime>0&&mode==='play');}catch{}try{U=SSSGame.state().ult||0;}catch{}
   if(rob&&!wasRob){let m=0;try{m=window.Evo21?Evo21.robM():0;}catch{}transform(m);}wasRob=rob;if(U>0&&!(lastU>0))ult();lastU=U;},50);
 // ---------- giao diện Kho / Xưởng SSS ----------
 function ui(kind){if(!ON()||!cd('ui'+kind,60))return;if(!ready())return;const t=ac.currentTime+.005;
   if(kind==='tick'){osc('square',3400,3400,t,.012,.03);osc('triangle',1500,1100,t,.05,.035);}
   else if(kind==='tier'){osc('square',2800,2800,t,.015,.03);partials('triangle',1100,t,.12,.035,2,[1,2.76]);}
   else if(kind==='enh'){osc('sine',480,1500,t,.2,.05);partials('sine',1500,t+.16,.25,.03,3,[1,1.5,2]);noi(t,.15,.02,'bandpass',3000,3,6000);}
   else if(kind==='fuse'){for(const [i,f] of [[0,523.25],[1,659.25],[2,783.99],[3,1046.5]])osc('sine',f,f,t+i*.06,.7,.045);osc('sine',65,40,t,.6,.12);noi(t,.5,.04,'bandpass',800,1,5000);duck(.35,.8);}}
 document.addEventListener('click',e=>{try{const b=e.target&&e.target.closest&&e.target.closest('button,[data-pick],.e21t span,[data-g],.k307-ic,.c9ship,.hb-slot');if(!b||!ON())return;
   const g=b.getAttribute('data-g');if(g==='fuse')ui('fuse');else if(g==='up'||g==='forge')ui('enh');else if(b.matches('[data-pick],.e21t span'))ui('tier');else if(b.closest('#hub40,.g44,#nc307,#k307,#hdr9'))ui('tick');}catch{}},{capture:true,passive:true});
 window.addEventListener('nc10',e=>{try{ui(e.detail==='adv'?'fuse':'enh');}catch{}});
 window.EvoSFX={pick,surge,fire,pod,hit,duck,transform,ult,ui,unlock,state:()=>({ctx:ac&&ac.state,voices,played,dropped,peak,on:ON(),sfx:sfxOn(),bus:!!bus})};
})();
