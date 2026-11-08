// V115 · REVIEW115 (Gemini): 5 âm hiệu mới · chớp sáng 90 ms khi hạ quái thường · giãn đạn liên thanh ×1,4 trong pha boss (sát thương ×1,4)
//  Tắt từng phần: window.SFX115=false · window.FLASH115=false · window.SPACE115=false
(()=>{
  // ---------- âm hiệu ----------
  let ac=null,out=null;const soundOn=()=>/BẬT/.test((document.getElementById('sound')||{}).textContent||'');
  function A(){if(ac)return ac;const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;try{ac=new C();out=ac.createGain();out.gain.value=.5;out.connect(ac.destination);}catch{ac=null;}return ac;}
  ['pointerdown','touchstart','keydown'].forEach(e=>window.addEventListener(e,()=>{try{const c=A();if(c&&c.state!=='running')c.resume();}catch{}},{passive:true,capture:true}));
  function o(type,f0,f1,t,d,v){const c=ac;const x=c.createOscillator(),g=c.createGain();x.type=type;x.frequency.setValueAtTime(f0,t);if(f1&&f1!==f0)x.frequency.exponentialRampToValueAtTime(f1,t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+Math.min(.008,d/3));g.gain.exponentialRampToValueAtTime(.0001,t+d);x.connect(g);g.connect(out);x.start(t);x.stop(t+d+.02);}
  const SND={
    wingHit:t=>o('triangle',320,300,t,.04,.07),
    coreHit:t=>o('sine',680,680,t,.045,.08),
    pickup:t=>o('triangle',520,880,t,.07,.09),
    lowHp:t=>{o('square',440,440,t,.06,.05);o('square',440,440,t+.11,.06,.05);},
    ui:t=>o('sine',900,900,t,.025,.04)};
  const CD={wingHit:250,coreHit:200,pickup:90,lowHp:2400,ui:60};const last={},n={};
  function play(id){if(window.SFX115===false)return;const now=performance.now();if(now-(last[id]||-1e9)<CD[id])return;last[id]=now;n[id]=(n[id]||0)+1;
    if(!soundOn())return;const c=A();if(!c||c.state!=='running')return;try{SND[id](c.currentTime+.01);}catch{}}
  // trúng boss: còn cánh → tiếng đục; lõi đã lộ (hết cánh) → tiếng trong
  function hookBoss(){try{const od=damageBoss;if(od.__s115)return;const nb=function(amount,source,part){const r=od.apply(this,arguments);try{if(mode==='play'&&boss&&!boss.dead&&(r==null||r>0)){const alive=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0).length;play(alive>0?'wingHit':'coreHit');}}catch{}return r;};nb.__s115=1;window.damageBoss=nb;try{damageBoss=nb;}catch{}}catch{}}
  function hookCollect(){try{const oc=collect;if(oc.__s115)return;const nc=function(d){const r=oc.apply(this,arguments);try{if(mode==='play')play('pickup');}catch{}return r;};nc.__s115=1;window.collect=nc;try{collect=nc;}catch{}}catch{}}
  // máu dưới 25%: bíp kép mỗi 2,5 s, tối đa 3 lần mỗi đợt tụt máu
  let lowCount=0,wasLow=false;setInterval(()=>{try{if(mode!=='play'){wasLow=false;lowCount=0;return;}const low=maxHp>0&&hp>0&&hp/maxHp<.25;if(low&&!wasLow)lowCount=0;wasLow=low;if(low&&lowCount<3){const b=performance.now()-(last.lowHp||-1e9)>=2500;if(b){lowCount++;play('lowHp');}}}catch{}},250);
  // nút giao diện (ngoài trận)
  document.addEventListener('pointerdown',e=>{try{if(typeof mode!=='undefined'&&mode==='play')return;if(e.target.closest('button,[role=button],.n74card,.l74-b'))play('ui');}catch{}},{capture:true,passive:true});
  // ---------- chớp sáng 90 ms khi hạ quái thường ----------
  const FL=[];
  function hookKill(){try{const ok=kill;if(ok.__f115)return;const nk=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(window.FLASH115!==false&&was&&e.dead&&mode==='play'&&!e.boss&&!e.bossPart&&!e.isBoss&&!e.rescue28&&FL.length<24)FL.push({x:e.x,y:e.y,r:Math.max(10,Math.min(34,e.r||18)),t0:performance.now()});}catch{}return r;};nk.__f115=1;window.kill=nk;try{kill=nk;}catch{}}catch{}}
  function drawFL(){if(!FL.length)return;const now=performance.now();ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle='#ffffff';
    for(let i=FL.length-1;i>=0;i--){const f=FL[i],u=(now-f.t0)/90;if(u>=1){FL.splice(i,1);continue;}ctx.globalAlpha=(1-u)*.45;ctx.beginPath();ctx.arc(f.x,f.y,f.r*(.6+.7*u),0,Math.PI*2);ctx.fill();}ctx.restore();}
  function hookDraw(){try{const vd=VisualFX.draw;if(vd.__f115)return;const nd=function(){const r=vd.apply(this,arguments);try{if(mode==='play'||mode==='pause')drawFL();}catch{}return r;};nd.__f115=1;VisualFX.draw=nd;}catch{}}
  // ---------- giãn đạn liên thanh trong pha boss: giữ 5/7 viên đạn chính mới, viên giữ lại ST ×1,4 ----------
  const seen=new WeakSet();let cnt=0;const sp={drop:0,keep:0};
  function space(){let arr;try{arr=shots;}catch{return;}if(!Array.isArray(arr))return;let on=false;try{on=window.SPACE115!==false&&mode==='play'&&!!boss&&!boss.dead;}catch{}
    for(const s of arr){if(seen.has(s))continue;seen.add(s);if(!on||s.dead||s.ray28||s.gearKind||s.art28==null||s.type==='drone'||s.ally)continue;
      const k1=Math.floor(cnt/1.4),k2=Math.floor((cnt+1)/1.4);cnt++;if(k2>k1){s.damage=(s.damage||0)*1.4;sp.keep++;}else{s.dead=true;sp.drop++;}}}
  function hookUpd(){try{const ou=update;if(ou.__p115)return;const nu=function(dt){const r=ou.apply(this,arguments);try{space();}catch{}return r;};nu.__p115=1;window.update=nu;try{update=nu;}catch{}}catch{}}
  // chủ dự án: đạn trúng địch không vẽ vòng tròn — chỉ vài tia lửa nhỏ
  let lastImp=0;function hookImpact(){try{const oi=VisualFX.impact;if(oi.__h115)return;const ni=function(x,y,c,s){if(window.HITRING115===false)return oi.apply(this,arguments);const now=performance.now();if(now-lastImp<35)return;lastImp=now;try{VisualFX.emitBurstA(x,y,c||'#ffc782',2);}catch{}};ni.__h115=1;VisualFX.impact=ni;}catch{}}
  setTimeout(()=>{hookImpact();hookBoss();hookCollect();hookKill();hookDraw();hookUpd();},0);
  // ---------- Sảnh: đạn trình diễn mờ dần trước khi chạm vùng chữ TỔNG LỰC CHIẾN ----------
  try{const st=document.createElement('style');st.id='v115-css';st.textContent=`html body #hgr41 .h1-stage canvas{-webkit-mask-image:linear-gradient(to bottom,transparent 0,transparent 22%,#000 40%);mask-image:linear-gradient(to bottom,transparent 0,transparent 22%,#000 40%)}`;document.head.appendChild(st);}catch{}
  window.V115={state:()=>({sfx:{...n},flash:FL.length,space:{...sp}})};
})();
