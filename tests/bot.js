// Bot né đạn dùng để đo độ khó (chèn vào trang sau khi vào trận). Giả định người chơi ĐỦ lực chiến: Combat.factor = 1.
window.BOT=(()=>{const S={spawn:{},pick:{},live:new Map(),minHp:1,hits:0,lastHp:null,lastSh:null,dmg:0,t0:performance.now()};
 if(!window.__natural)Combat.factor=()=>1;
 const sp=()=>{try{return (pilotStats().speed||320)*.9;}catch{return 300;}};
 function danger(x,y){let d=0;for(const b of bullets){if(b.dead)continue;const dx0=b.x-x,dy0=b.y-y;if(dx0*dx0+dy0*dy0>200*200)continue;for(const t of [0,.12,.25,.4]){const bx=b.x+(b.vx||0)*t,by=b.y+(b.vy||0)*t,r=Math.hypot(bx-x,by-y)-(b.r||5)-10;d+=(t<.2?1.4:1)/Math.max(r,2)**2;}}
  for(const e of enemies){if(e.dead)continue;const r=Math.hypot(e.x-x,e.y-y)-(e.large?40:24);if(r<60)d+=.6/Math.max(r,2)**2;}
  for(const bm of (window.beams||[])){if(bm&&bm.x!=null&&Math.abs(bm.x-x)<(bm.w||18)+14)d+=.02;}
  if(boss&&!boss.dead){const r=Math.hypot(boss.x-x,boss.y-y)-80;if(r<60)d+=.5/Math.max(r,2)**2;}
  return d;}
 function want(x,y){let v=0;for(const dd of drops){if(dd.dead||dd.type==='star'||dd.type==='none'||dd.type==='craft')continue;v+=1/(1+Math.hypot(dd.x-x,dd.y-y)/40);}v+= -Math.abs(x-240)/2400-Math.max(0,H*.6-y)/900;return v*.012;}
 setInterval(()=>{if(mode!=='play')return;const step=sp()*.016;let best=null,bv=1e9;
  for(let i=-3;i<=3;i++)for(let j=-2;j<=2;j++){const x=clamp(player.x+i*step*1.6,20,W-20),y=clamp(player.y+j*step*1.6,H*.3,H-30);const v=danger(x,y)-want(x,y);if(v<bv){bv=v;best=[x,y];}}
  try{let close=0;for(const b of bullets){if(b.dead)continue;const r=Math.hypot(b.x+(b.vx||0)*.1-player.x,b.y+(b.vy||0)*.1-player.y);if(r<26)close++;}
   if((close>=2||(close>=1&&hp<maxHp*.4))&&bombs>0&&invuln<=0&&performance.now()-(S.lastBomb||0)>2500){S.lastBomb=performance.now();S.bombs=(S.bombs||0)+1;bomb();}
   const mb=document.getElementById('missile-action');if(mb&&!mb.disabled&&performance.now()-(S.lastMis||0)>1000){S.lastMis=performance.now();mb.click();}}catch(e){}
  const dx=best[0]-player.x,dy=best[1]-player.y,L=Math.hypot(dx,dy);if(L>step){player.x+=dx/L*step;player.y+=dy/L*step;}else{player.x=best[0];player.y=best[1];}
  const now=new Set();for(const dd of drops){if(dd.dead){if(S.live.has(dd)){const t=S.live.get(dd);S.live.delete(dd);if(Math.hypot(dd.x-player.x,dd.y-player.y)<90)S.pick[t]=(S.pick[t]||0)+1;}continue;}now.add(dd);if(!S.live.has(dd)&&dd.type!=='none'){S.live.set(dd,dd.type);S.spawn[dd.type]=(S.spawn[dd.type]||0)+1;}}for(const [dd,t] of [...S.live]){if(!now.has(dd)){S.live.delete(dd);if(Math.hypot(dd.x-player.x,dd.y-player.y)<90)S.pick[t]=(S.pick[t]||0)+1;}}
  if(S.lastHp!==null&&hp<S.lastHp-1e-6){S.hits++;S.dmg+=S.lastHp-hp;}if(S.lastSh!==null&&shield<S.lastSh-1e-6){S.hits++;S.dmg+=S.lastSh-shield;}S.lastHp=hp;S.lastSh=shield;S.minHp=Math.min(S.minHp,hp/maxHp);},16);
 return {state:()=>({mode,stageTime:+stageTime.toFixed(1),wave:endlessWave,boss:!!boss,hp:+hp.toFixed(1),maxHp,minHp:+S.minHp.toFixed(2),bombUsed:S.bombs||0,spawn:S.spawn,hits:S.hits,dmg:+S.dmg.toFixed(1),shield:+shield.toFixed(1),pick:S.pick,power,bombs,level})};})();
