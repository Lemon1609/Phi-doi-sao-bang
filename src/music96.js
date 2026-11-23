'use strict';
// V96 · NHẠC NỀN SOẠN BẰNG CODE (WebAudio, 0 KB tệp nhạc, không bản quyền) — chủ dự án chọn hướng 1 (26/10).
//  3 bài: SẢNH (êm, 84 bpm, giọng trưởng) · TRẬN (dồn dập, 128 bpm, thứ, đổi giọng theo chương) · BOSS (căng, 140 bpm, thứ hòa âm).
//  Nhạc cụ tổng hợp: trống (kick/snare/hi-hat từ sóng + nhiễu), bass răng cưa qua lọc, pad 2 lớp lệch tông, lead vuông, chuông/arp.
//  Bật/tắt bằng nút NHẠC sẵn có (lần đầu cài V96 tự bật) · thanh âm lượng trong Cài đặt (khóa mới saobang-music96) · tạm dừng: nhỏ 40% · ẩn tab: tắt.
//  Nhạc 8 nốt cũ của Audio393 tự tắt khi bài mới chạy. Tắt hẳn: window.MUSIC96=false
const MUSIC96_TRACKS={
 lobby:{gain:6.2,bpm:92,root:50,chords:[[0,4,7,11,14],[2,6,9,14,18],[-3,4,7,11,14],[5,9,12,16,21]],scale:[0,2,4,6,7,9,11,12,14,16,18,19,21,23,24],
  gate:'x.xx.xx.x.xx.x.x',
  bell:[[4,-1,-1,-1,6,-1,-1,-1,5,-1,-1,-1,3,-1,-1,-1],[2,-1,-1,-1,4,-1,-1,-1,6,-1,-1,-1,7,-1,-1,-1],[5,-1,-1,-1,4,-1,-1,-1,2,-1,-1,-1,4,-1,-1,-1],[3,-1,-1,-1,2,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1]]},
 battle:{gain:2.3,bpm:128,roots:[45,47,48,50,52,43,44,46,49,51],chords:[[0,3,7],[8,12,15],[3,7,10],[10,14,17]],scale:[0,3,5,7,10,12,15,17,19,22,24,27],
  kick:'x...x...x...x...',kickB:'x...x...x...x.x.',snare:'....x.......x...',hat:'..x...x...x...x.',bass:'x.xxx.xxx.xxx.xx',
  lead:[[7,-1,6,-1,5,-1,6,7,8,-1,7,-1,5,-1,-1,-1],[5,-1,5,6,7,-1,5,-1,4,-1,5,-1,3,-1,-1,-1],[7,8,9,-1,8,7,-1,5,6,-1,7,-1,8,-1,-1,-1],[9,-1,8,-1,7,-1,6,-1,5,-1,4,-1,5,-1,-1,-1]]},
 boss:{gain:1.9,bpm:140,root:45,chords:[[0,3,7],[5,8,12],[8,12,15],[7,11,14]],scale:[0,2,3,5,7,8,11,12,14,15,17,19,20,23,24],
  kick:'x..x..x.x..x..x.',snare:'....x.......x..x',hat:'x.x.x.x.x.x.x.x.',bass:'xxxxxxxxxxxxxxxx',
  riff:[[7,-1,7,8,7,-1,6,-1,5,-1,5,6,5,-1,4,-1],[5,-1,5,6,7,-1,8,-1,9,-1,8,-1,7,-1,6,-1],[9,-1,9,10,9,-1,8,-1,7,-1,8,-1,6,-1,-1,-1],[6,-1,7,-1,8,-1,9,-1,10,-1,11,-1,13,-1,14,-1]]}};
// V100 (chủ dự án 27/10): soạn lại SẢNH + TRẬN theo hướng điện tử vũ trụ, công nghệ cao — pad lọc quét mở dần, arp 16 nốt có tiếng vọng (delay),
//  hồi âm không gian (reverb tự tạo), bass xung 16 nốt có bao lọc, trống "nén" theo nhịp kick (sidechain), tiếng chuông radar, tiếng "dữ liệu" bíp ngắn,
//  lead siêu cưa 3 lớp, tiếng hút lên (riser) cuối mỗi 16 ô nhịp. Bài BOSS giữ như cũ.
// V98 (Gemini REVIEW97): biến tấu Nguyệt Thực (132 bpm, hạ 3 bán cung, lọc 1.400 Hz) · Vô tận (124 → 144 bpm, +4 mỗi 3 phút sống)
//  · boss gãy cả 2 cánh: 148 bpm + lớp arp cao · nhạc hiệu Thắng (I–IV–V–I, 132 bpm, ~2,8 s) / Thua (i–VI–iv, 76 bpm, ~2,4 s)
MUSIC96_TRACKS.eclipse=Object.assign({},MUSIC96_TRACKS.battle,{bpm:132,shift:-3,lp:1400,gain:2.9});
MUSIC96_TRACKS.endless=Object.assign({},MUSIC96_TRACKS.battle,{bpm:124});
const Music96=(()=>{
 const on=()=>window.MUSIC96!==false;
 const KEY='saobang-music96';let S={vol:.55};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const hz=m=>440*Math.pow(2,(m-69)/12);
 let dly=null,rvb=null,pump=null,dlyT=null;
 let dk21=null,ctx=null,master=null,mlp=null,jg=null,comp0=null,noise=null,cur=null,trk=null,nextT=0,step=0,bar=0,timer=null,lastWant='',hold=0,lastMode='',stat={jw:0,jl:0};
 function init(){if(ctx||!on())return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;try{ctx=new AC();}catch{return;}
  master=ctx.createGain();master.gain.value=0;const comp=ctx.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=4;mlp=ctx.createBiquadFilter();mlp.type='lowpass';mlp.frequency.value=18000;dk21=ctx.createGain();dk21.gain.value=1;master.connect(dk21);dk21.connect(mlp);/* V2.1: nút hạ nhạc (ducking) cho nổ lớn / Tuyệt kỹ */mlp.connect(comp);comp.connect(ctx.destination);comp0=comp;jg=ctx.createGain();jg.gain.value=0;jg.connect(comp);
  const n=ctx.sampleRate;noise=ctx.createBuffer(1,n,n);const d=noise.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;
  buses(ctx,master);timer=setInterval(sched,40);}
 function buses(c,m){try{dly=c.createDelay(1.5);dlyT=dly;const fb=c.createGain(),dl=c.createBiquadFilter(),dg=c.createGain();dly.delayTime.value=.35;fb.gain.value=.38;dl.type='lowpass';dl.frequency.value=2800;dg.gain.value=.8;
   dly.connect(dl);dl.connect(fb);fb.connect(dly);dl.connect(dg);dg.connect(m);
   rvb=c.createConvolver();const len=Math.round(c.sampleRate*2.6),ir=c.createBuffer(2,len,c.sampleRate);for(let ch=0;ch<2;ch++){const a=ir.getChannelData(ch);for(let i=0;i<len;i++)a[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.4);}rvb.buffer=ir;const rg=c.createGain();rg.gain.value=.55;rvb.connect(rg);rg.connect(m);
   pump=c.createGain();pump.gain.value=1;pump.connect(m);}catch(e){dly=rvb=pump=null;}}
 // nhạc cụ thế hệ mới: bao lọc, gửi delay/reverb, chọn đường ra (pump để nén theo kick)
 function syn(type,f,t,d,v,o={}){const x=ctx.createOscillator(),g=ctx.createGain();x.type=type;x.frequency.setValueAtTime(f,t);if(o.det)x.detune.setValueAtTime(o.det,t);
  let n=x;if(o.filt){const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.Q.value=o.q||1;if(o.fenv){lp.frequency.setValueAtTime(o.fenv[0],t);lp.frequency.exponentialRampToValueAtTime(o.fenv[1],t+(o.fenv[2]||d));}else lp.frequency.setValueAtTime(o.filt,t);x.connect(lp);n=lp;}
  n.connect(g);g.connect(o.pump&&pump?pump:master);if(o.dl&&dly){const s1=ctx.createGain();s1.gain.value=o.dl;g.connect(s1);s1.connect(dly);}if(o.rv&&rvb){const s2=ctx.createGain();s2.gain.value=o.rv;g.connect(s2);s2.connect(rvb);}
  env(g,t,o.a||.005,v,d);x.start(t);x.stop(t+d+.05);x.onended=()=>{try{x.disconnect();g.disconnect();}catch{}};}
 function nz2(t,v,d,type,f,o={}){const s=ctx.createBufferSource(),fl=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noise;fl.type=type;fl.Q.value=o.q||.8;if(o.sweep){fl.frequency.setValueAtTime(o.sweep[0],t);fl.frequency.exponentialRampToValueAtTime(o.sweep[1],t+d);}else fl.frequency.value=f;
  s.loop=d>.9;s.connect(fl);fl.connect(g);g.connect(o.pump&&pump?pump:master);if(o.rv&&rvb){const s2=ctx.createGain();s2.gain.value=o.rv;g.connect(s2);s2.connect(rvb);}
  if(o.rise){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+d*.95);g.gain.exponentialRampToValueAtTime(.0001,t+d);}else env(g,t,o.a||.002,v,d);s.start(t,Math.random()*.4);s.stop(t+d+.05);s.onended=()=>{try{s.disconnect();g.disconnect();}catch{}};}
 function duck(t,sd){if(!pump)return;pump.gain.cancelScheduledValues(t);pump.gain.setValueAtTime(.22,t);pump.gain.linearRampToValueAtTime(1,t+sd*2.6);}
 function setDelay(sd){try{if(dlyT)dlyT.delayTime.setTargetAtTime(sd*3,ctx.currentTime,.1);}catch{}}
 function unlock(){init();try{if(ctx&&ctx.state!=='running')ctx.resume();}catch{}}
 ['pointerdown','keydown','touchstart'].forEach(ev=>window.addEventListener(ev,unlock,{passive:true}));
 const enabled=()=>{const b=document.getElementById('music393');return on()&&!!b&&b.getAttribute('aria-pressed')==='true';};
 function want(){if(!enabled()||document.hidden)return '';let m='menu';try{m=mode;}catch{}
  if(m==='play'||m==='pause'){let bs=false;try{bs=!!(boss&&!boss.dead&&boss.hp>0);}catch{}if(bs)return 'boss';let gm='';try{gm=gameMode;}catch{}
   try{if(typeof Eclipse67!=='undefined'&&Eclipse67.active())return 'eclipse';}catch{}if(gm==='endless')return 'endless';return 'battle';}return 'lobby';}
 const p3=()=>{try{return !!(boss&&!boss.dead&&(boss.parts||[]).length&&(boss.parts||[]).every(p=>p.dead||!(p.hp>0)));}catch{return false;}};
 function bpmNow(){const b=bpm0();try{return window.__bpm6?b*window.__bpm6():b;}catch{return b;}}/* V309 Lượt 6: nhanh hơn khi cảnh báo boss / Bạo Tẩu */
 function bpm0(){if(!trk)return 120;if(cur==='endless'){let t=0;try{t=time||0;}catch{}return Math.min(144,124+Math.floor(t/180)*4);}if(cur==='boss'&&p3())return 148;return trk.bpm;}
 // ---------- nhạc cụ ----------
 function env(g,t,a,v,d){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,v),t+a);g.gain.exponentialRampToValueAtTime(.0001,t+d);}
 function osc(type,f,t,d,v,a=.005,filt=null,q=1,det=0){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(det)o.detune.setValueAtTime(det,t);
  let n=o;if(filt){const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.setValueAtTime(filt,t);lp.Q.value=q;o.connect(lp);n=lp;}n.connect(g);g.connect(master);env(g,t,a,v,d);o.start(t);o.stop(t+d+.05);o.onended=()=>{try{o.disconnect();g.disconnect();}catch{}};}
 function kick(t,v){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(42,t+.12);o.connect(g);g.connect(master);env(g,t,.003,v,.28);o.start(t);o.stop(t+.32);o.onended=()=>{try{o.disconnect();g.disconnect();}catch{}};}
 function nz(t,v,d,type,f){const s=ctx.createBufferSource(),fl=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noise;fl.type=type;fl.frequency.value=f;s.connect(fl);fl.connect(g);g.connect(master);env(g,t,.002,v,d);s.start(t,Math.random()*.5);s.stop(t+d+.05);s.onended=()=>{try{s.disconnect();g.disconnect();}catch{}};}
 const snare=(t,v)=>{nz(t,v,.18,'bandpass',1800);osc('triangle',190,t,.1,v*.5);};
 const hat=(t,v,open)=>nz(t,v,open?.16:.04,'highpass',7500);
 function pad(t,notes,d,v){for(const m of notes)for(const det of [-8,8])osc('sawtooth',hz(m),t,d,v,.35,1300,.7,det);}
 // REVIEW115: nhạc sảnh lùi về sau khi đang mở tab con
 const subTab=()=>{try{const c=Nav74.state().cur;return !!c&&c!=='home';}catch{return false;}};
 // ---------- soạn theo bước (16 bước / ô nhịp) ----------
 function play(id,t,st,br,sdIn){const T=MUSIC96_TRACKS[id],sd=sdIn||60/T.bpm/4;const base=(id==='eclipse'||id==='endless')?'battle':id;
  if(id==='lobby'){const R=T.root,ch=T.chords[br%4],B=sd*16;
   if(st===0)for(const x of ch.slice(0,4))for(const det of [-11,11])syn('sawtooth',hz(R+12+x),t,B*1.02,.011,{a:.9,filt:1,fenv:[420,2200,B*.6],q:.9,det,rv:.6});
   if(st===0&&br%2===0)syn('sine',hz(R+36+ch[4]),t,B*1.6,.02,{a:1.2,rv:.8,dl:.3});
   if(st%4===0)syn('sine',hz(R-12+ch[0]),t,sd*3,st===0?.1:.06,{a:.01,filt:220});
   if(br>=2&&T.gate[st]==='x'){const ext=[ch[0],ch[1],ch[2],ch[3],ch[0]+12,ch[1]+12],seq=[0,2,1,3,4,2,5,3];const n=ext[seq[st%8]]+(st>=8&&br%4===3?12:0);const m115=window.MUS115!==false,sub=m115&&subTab();syn('triangle',hz(R+24+n),t,sd*.9,m115?.0192:.024,{filt:1,fenv:sub?[1800,700,sd*.9]:[3200,900,sd*.9],dl:.55,rv:.35});}
   if(br%4===0&&st===0)syn('sine',1760,t,.35,window.MUS115!==false?(subTab()?.008:.016):.02,{dl:.75,rv:.6});
   if((br%4===1&&(st===3||st===11))||(br%4===3&&(st===6||st===14)))syn('square',hz(R+48+ch[(st>>2)%4]),t,.035,.012,{filt:5200,dl:.6});
   if(br>=4){nz2(t,st%4===2?.012:.006,.03,'highpass',9000);}if(br>=8&&st===0)kick(t,.22);return;}
  if(base==='battle'){let ci=0;try{ci=Campaign36.chapter(level)|0;}catch{}const R=T.roots[ci%T.roots.length]+(T.shift||0),ch=T.chords[br%4],ph=br%16,B=sd*16;
   if(st%4===0){kick(t,.58);duck(t,sd);}
   if(ph>=2&&(st===4||st===12)){nz2(t,.16,.12,'bandpass',1500,{rv:.25});nz2(t+.012,.12,.1,'bandpass',1900);}
   nz2(t,st%2===1?.014:.007,.025,'highpass',9500);if(ph>=4&&st%4===2)nz2(t,.028,.14,'highpass',7000);
   const oc=(st%4===3)?12:0;syn('sawtooth',hz(R-12+ch[0]+oc),t,sd*.85,.06,{filt:1,fenv:[1800,240,sd*.8],q:6});
   if(st===0&&ph>=4)for(const x of ch)for(const det of [-12,12])syn('sawtooth',hz(R+12+x),t,B*.98,.009,{a:.05,filt:1900,pump:1,rv:.3,det});
   if((ph>=4&&ph<8)||ph>=12){const ext=[ch[0],ch[1],ch[2],ch[0]+12,ch[1]+12,ch[2]+12],seq=[0,1,2,3,4,5,4,3,1,2,3,4,5,4,2,1];syn('square',hz(R+12+ext[seq[st]]),t,sd*.7,.018,{filt:1,fenv:[3400,700,sd*.7],pump:1,dl:.4});}
   if(ph>=8&&ph<12){const n=T.lead[br%4][st];if(n>=0)for(const det of [-14,0,14])syn('sawtooth',hz(R+24+T.scale[n]),t,sd*1.8,.012,{a:.01,filt:3200,dl:.35,rv:.3,det});}
   if(ph===15&&st===0)nz2(t,.07,B,'highpass',0,{sweep:[300,9000],rise:1,rv:.3});
   if(ph===0&&br>0&&st===0)nz2(t,.09,1.6,'lowpass',6000,{rv:.5});
   if(ph===15&&st>=12)nz2(t,.08+(st-12)*.03,.1,'bandpass',1700);return;}
  if(id==='boss'){const R=T.root,ch=T.chords[br%4];
   if(T.kick[st]==='x')kick(t,.6);if(T.snare[st]==='x'){if(window.MUS115!==false){nz(t,.22,.16,'lowpass',2200);osc('triangle',190,t,.1,.12);}else snare(t,.24);}if(T.hat[st]==='x')hat(t,.04,false);
   osc('sawtooth',hz(R-12+ch[0]+(st%8===7?12:0)),t,sd*.8,.075,.003,420+st*12,6);
   if(st===0)pad(t,ch.map(x=>R+12+x),sd*16*.95,.014);if(st===0&&window.MUS115!==false)for(const x of ch.slice(0,3))syn('sawtooth',hz(R+x),t,sd*16*.98,.012,{a:.25,filt:650,rv:.45});
   const n=T.riff[br%4][st];if(n>=0&&br%8>=2)osc('sawtooth',hz(R+12+T.scale[n]+(window.MUS115!==false&&br%16===15&&st>=8?7:0)),t,sd*1.6,.03,.004,1800,3);
   if(br%8===7&&st%2===0)osc('square',hz(R+24+ch[(st/2)%3]),t,sd*.6,.02,.003,2600);
   if(p3()&&st%2===1)osc('square',hz(R+36+ch[(st>>1)%3]),t,sd*.5,.016,.002,4200);}}
 function vol(){let m='';try{m=mode;}catch{}return S.vol*.6*((trk&&trk.gain)||1)*(m==='pause'?.4:1);}
 function sched(){if(!ctx)return;const w=want();
  if(w!==lastWant){lastWant=w;const t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setTargetAtTime(0,t,.08);
   if(w){cur=w;trk=MUSIC96_TRACKS[w];step=0;bar=0;nextT=t+.35;master.gain.setTargetAtTime(vol(),t+.35,.4);}else cur=null;}
  if(!cur||ctx.state!=='running')return;master.gain.setTargetAtTime(vol(),ctx.currentTime,.3);
  try{mlp.frequency.setTargetAtTime(trk.lp||18000,ctx.currentTime,.2);}catch{}
  const sd=60/bpmNow()/4;setDelay(sd);if(nextT<ctx.currentTime-.3)nextT=ctx.currentTime+.05;
  let k=0;while(nextT<ctx.currentTime+.25&&k++<8){try{play(cur,nextT,step,bar,sd);}catch{}nextT+=sd;step++;if(step>=16){step=0;bar++;}}}
 // ---------- nhạc hiệu thắng / thua ----------
 function tone(type,f,t,d,v){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);o.connect(g);g.connect(jg);env(g,t,.02,v,d);o.start(t);o.stop(t+d+.05);o.onended=()=>{try{o.disconnect();g.disconnect();}catch{}};}
 function jingle(win){if(!ctx||ctx.state!=='running'||!enabled())return;const t=ctx.currentTime+.22;master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(0,ctx.currentTime,.06);
  jg.gain.cancelScheduledValues(ctx.currentTime);jg.gain.setValueAtTime(S.vol*.6*2.2,ctx.currentTime);
  if(win){stat.jw++;const b=60/132,R=60,C=[[0,4,7],[5,9,12],[7,11,14],[12,16,19]];C.forEach((c,i)=>{const d=i<3?b*.95:1.25;for(const x of c)tone('triangle',hz(R+x),t+i*b,d,.05);tone('sine',hz(R+12+c[2]),t+i*b,d,.04);tone('sine',hz(R-12+c[0]),t+i*b,d,.06);});hold=t+3*b+1.3;}
  else{stat.jl++;const b=60/76,R=57,C=[[0,3,7],[-4,0,3],[-7,-4,0]];C.forEach((c,i)=>{const d=i<2?b*.95:1.0;for(const x of c)tone('sine',hz(R+x),t+i*b,d,.05);tone('triangle',hz(R-12+c[0]),t+i*b,d,.06);});hold=t+2*b+1.05;}
  lastWant='__jingle';}
 function modeWatch(){let m='';try{m=mode;}catch{}if(m!==lastMode){if(lastMode==='play'){if(m==='reward'||m==='win')jingle(true);else if(m==='over')jingle(false);}lastMode=m;}}
 const _sched=sched;sched=function(){if(!ctx)return;modeWatch();if(ctx.currentTime<hold)return;if(lastWant==='__jingle'){lastWant='';}return _sched();};
 // ---------- cài đặt: thanh âm lượng cạnh nút NHẠC ----------
 function slider(){for(const b of document.querySelectorAll('[data-px="music393"],#music393')){if(!b.offsetParent)continue;const nx=b.nextElementSibling;if(nx&&nx.classList&&nx.classList.contains('mv96'))continue;
   const w=document.createElement('label');w.className='mv96';w.style.cssText='display:flex;align-items:center;gap:6px;margin:4px 0 6px;font-size:11px;color:#bfe3ff;width:100%';
   w.innerHTML='🎵 Âm lượng nhạc <input type="range" min="0" max="100" step="5" style="flex:1;min-width:0;width:auto"> <b></b>';if(b.closest('.st66')){w.style.flex='1 1 100%';w.style.minWidth='0';const rw=b.parentElement;if(rw)rw.style.flexWrap='wrap';}const r=w.querySelector('input'),o=w.querySelector('b');r.value=Math.round(S.vol*100);o.textContent=r.value+'%';
   r.addEventListener('input',()=>{S.vol=r.value/100;o.textContent=r.value+'%';save();unlock();});r.addEventListener('click',e=>e.stopPropagation());b.after(w);}}
 // lần đầu cài V96: bật nhạc (người chơi vẫn tắt được bằng nút NHẠC)
 function firstOn(){if(S.init)return;const b=document.getElementById('music393');if(!b)return;S.init=1;save();if(b.getAttribute('aria-pressed')!=='true')try{b.click();}catch{}}
 setTimeout(firstOn,1500);setInterval(()=>{try{slider();}catch{}},700);
 document.addEventListener('visibilitychange',()=>{try{sched();}catch{}});
 // kết xuất thử ra mảng mẫu (kiểm tra / nghe thử ngoài game)
 async function render(id,sec){const old=[ctx,master,noise];const oc=new OfflineAudioContext(1,Math.round(44100*sec),44100);ctx=oc;master=oc.createGain();master.gain.value=.6*S.vol*(MUSIC96_TRACKS[id].gain||1);
  const comp=oc.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=4;const lp=oc.createBiquadFilter();lp.type='lowpass';lp.frequency.value=MUSIC96_TRACKS[id].lp||18000;master.connect(lp);lp.connect(comp);comp.connect(oc.destination);noise=oc.createBuffer(1,44100,44100);const d=noise.getChannelData(0);for(let i=0;i<44100;i++)d[i]=Math.random()*2-1;
  const oldB=[dly,rvb,pump,dlyT];buses(oc,master);const T=MUSIC96_TRACKS[id],sd=60/T.bpm/4;try{dly.delayTime.value=sd*3;}catch{}let t=.05,st=0,br=0;while(t<sec-.3){play(id,t,st,br,sd);t+=sd;st++;if(st>=16){st=0;br++;}}
  const buf=await oc.startRendering();[ctx,master,noise]=old;[dly,rvb,pump,dlyT]=oldB;return Array.from(buf.getChannelData(0));}
 return {jingle,state:()=>({cur,bar,step,vol:S.vol,ctx:ctx&&ctx.state,en:enabled(),bpm:Math.round(bpmNow()),jw:stat.jw,jl:stat.jl,hold:ctx?Math.max(0,hold-ctx.currentTime):0}),unlock,render,setVol:v=>{S.vol=v;save();},duckFx:(a,d)=>{/* V2.1 EVO21_SFX: hạ nhạc a (0..1) trong d giây rồi trả lại 0,35 s */try{if(!ctx||!dk21||window.EVO21===false)return;const t=ctx.currentTime,g=dk21.gain;g.cancelScheduledValues(t);g.setTargetAtTime(Math.max(.2,1-a),t,.03);g.setTargetAtTime(1,t+Math.max(.1,d),.35);}catch{}},TR:MUSIC96_TRACKS};
})();
window.Music96=Music96;
