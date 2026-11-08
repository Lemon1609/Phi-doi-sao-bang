'use strict';
// V96 · Gemini REVIEW96
//  §1 EARLY_BOSS_CURVE_1_20_V96 (Chiến dịch, không áp Nguyệt Thực): máu mini boss 5 ×0,65 · 10 ×0,72 · 15 ×0,80 · boss 20 ×0,85 (thân + lõi + cánh)
//     · ải 1–15: mỗi đòn trúng làm mất ít hơn 15% (đo theo khung hình vì FAIR76 trừ máu trễ 180 ms; không áp khi chỉ trúng giáp)
//  §2 AUDIO_HAPTIC_FEEDBACK_V96: 7 khoảnh khắc lớn có âm tổng hợp + rung (theo nút ÂM THANH / RUNG sẵn có), có thời gian nghỉ, không chữ trong trận.
//  Tắt: window.V96=false
const V96CFG={hp:{5:.325,10:.72,15:.80,20:1.1475}/* REVIEW114: ải 5 ×0,5 · ải 20 ×1,35 so với V112 */,dmg:{to:15,k:.85},
 fx:{warn:{v:[80,100,80],cd:10000},wing:{v:[50,30,90],cd:1000},wings:{v:[60,35,60,35,130],cd:3000},od:{v:[35,40,80],cd:3000},lv:{v:[],vMax:[25],cd:200},ult:{v:[65],vAuto:[30],cd:4000},win:{v:[70,45,70,45,160],cd:5000}},vibMin:800};
const V96=(()=>{
 const on=()=>window.V96!==false;const g=f=>{try{return f();}catch{return null;}};
 const camp=()=>g(()=>gameMode==='campaign'&&!(typeof Dungeons!=='undefined'&&Dungeons.active())&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active())&&!(window.BK78&&BK78.run())&&!(Meta40.state().run));
 // ---------- §1 máu boss sớm + giảm sát thương nhận ở ải 1–15 ----------
 function bossHp(){const b=g(()=>boss);if(!b||b.__v96||!b.bossHealthReady)return;b.__v96=1;const k=V96CFG.hp[g(()=>level|0)];if(!k||!camp())return;
  b.max*=k;b.hp=b.max;if(b.coreMax){b.coreMax*=k;b.coreHp=b.coreMax;}for(const p of (b.parts||[])){if(p.max){p.max*=k;p.hp=p.max;}}try{syncBossHealth&&syncBossHealth();}catch{}st.boss=k;}
 let lastHp=null;function soften(){const lv=g(()=>level|0)||0;if(!(lv>=1&&lv<=V96CFG.dmg.to)||!camp()){lastHp=null;return;}
  try{if(lastHp!=null&&hp<lastHp&&hp>0)hp=Math.min(lastHp,hp+(lastHp-hp)*(1-V96CFG.dmg.k));lastHp=hp;}catch{}}
 // ---------- §2 âm thanh + rung ----------
 let ctx=null,out=null;const soundOn=()=>/BẬT/.test((document.getElementById('sound')||{}).textContent||'');
 function ac(){if(ctx)return ctx;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;try{ctx=new AC();out=ctx.createGain();out.gain.value=.5;out.connect(ctx.destination);}catch{ctx=null;}return ctx;}
 ['pointerdown','touchstart','keydown'].forEach(e=>window.addEventListener(e,()=>{try{const c=ac();if(c&&c.state!=='running')c.resume();}catch{}},{passive:true}));
 function o(type,f0,f1,t,d,v){const c=ctx;const x=c.createOscillator(),gn=c.createGain();x.type=type;x.frequency.setValueAtTime(f0,t);if(f1&&f1!==f0)x.frequency.exponentialRampToValueAtTime(f1,t+d);gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(v,t+.01);gn.gain.exponentialRampToValueAtTime(.0001,t+d);x.connect(gn);gn.connect(out);x.start(t);x.stop(t+d+.03);x.onended=()=>{try{x.disconnect();gn.disconnect();}catch{}};}
 function nz(t,d,v,f){const c=ctx,n=c.sampleRate*d|0,buf=c.createBuffer(1,n,c.sampleRate),a=buf.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);const s=c.createBufferSource(),fl=c.createBiquadFilter(),gn=c.createGain();s.buffer=buf;fl.type='lowpass';fl.frequency.value=f;gn.gain.value=v;s.connect(fl);fl.connect(gn);gn.connect(out);s.start(t);s.onended=()=>{try{s.disconnect();gn.disconnect();}catch{}};}
 const SND={warn:t=>{o('sawtooth',260,260,t,.25,.12);o('sawtooth',390,390,t+.28,.27,.12);},
  wing:t=>{nz(t,.25,.5,600);o('triangle',1100,420,t,.26,.1);},
  wings:t=>{nz(t,.3,.55,500);nz(t+.12,.3,.5,400);o('sawtooth',950,110,t+.05,.35,.1);},
  od:t=>{o('triangle',440,440,t,.08,.12);o('triangle',660,660,t+.07,.08,.12);o('triangle',880,880,t+.14,.1,.12);},
  lv:(t,k)=>{const f=[523,587,659,698,784][Math.max(0,Math.min(4,k-1))];o('sine',f,f,t,.09,.1);},
  ult:t=>{o('sawtooth',240,1050,t,.18,.1);},
  win:t=>{nz(t,.4,.6,300);nz(t+.18,.4,.5,250);[523,659,784,1047].forEach((f,i)=>o('triangle',f,f,t+.25+i*.06,.3,.08));}};
 const last={};let lastVib=0;const st={n:{},boss:0};
 function fire(id,arg,vib){if(!on())return;const now=performance.now(),C=V96CFG.fx[id];if(now-(last[id]||-1e9)<C.cd)return;last[id]=now;st.n[id]=(st.n[id]||0)+1;
  if(soundOn()){const c=ac();if(c&&c.state==='running')try{SND[id](c.currentTime+.01,arg);}catch{}}
  const v=vib||C.v;if(v&&v.length&&(now-lastVib>=V96CFG.vibMin||id==='win'||id==='wings')){lastVib=now;try{Audio393.vibrate(v);}catch{}}}
 // theo dõi trạng thái trận
 let pW=-1,pSup=0,pPow=0,pUlt=0,pCast=-1,bossSeen=null;
 function watch(){let m='';try{m=mode;}catch{}if(m!=='play'){pW=-1;pCast=-1;return;}
  try{const b=boss;if(b&&!b.dead&&b.hp>0){bossSeen=b;const w=(b.parts||[]).filter(p=>!p.dead&&p.hp>0).length;if(pW>0&&w<pW)fire(w===0?'wings':'wing');pW=w;}
   else if(bossSeen){const k=bossSeen===b&&(b.dead||b.hp<=0);bossSeen=null;pW=-1;if(k)fire('win');}}catch{}
  try{if(superTime>0&&pSup<=0)fire('od');pSup=superTime;}catch{}
  try{if(power>pPow&&pPow>0)fire('lv',power,power>=5?V96CFG.fx.lv.vMax:null);pPow=power;}catch{}
  try{const c=Ult72.charge();if(pUlt>=1&&c<.5)fire('ult');pUlt=c;}catch{}
  try{const n=SSS87.state().nCast|0;if(n>pCast&&pCast>=0)fire('ult',0,V96CFG.fx.ult.vAuto);pCast=n;}catch{}}
 // cảnh báo boss: bắt thông báo «BOSS SẮP XUẤT HIỆN»
 let tH=false;function hookToast(){if(tH||typeof window.toast!=='function')return;tH=true;const ot=window.toast;const f=function(m){try{if(/BOSS SẮP XUẤT HIỆN/i.test(String(m)))fire('warn');}catch{}return ot.apply(this,arguments);};window.toast=f;try{toast=f;}catch{}}
 let uH=false;function hookUpd(){if(uH||typeof window.update!=='function')return;uH=true;const ou=window.update;const f=function(dt){const r=ou.apply(this,arguments);try{if(on()&&g(()=>mode)==='play'){bossHp();soften();watch();}}catch{}return r;};window.update=f;try{update=f;}catch{}}
 function boot(){hookUpd();hookToast();}
 boot();setTimeout(boot,800);setTimeout(boot,3000);
 return {fire,state:()=>({...st,n:{...st.n}}),CFG:V96CFG};
})();
window.V96=V96;
