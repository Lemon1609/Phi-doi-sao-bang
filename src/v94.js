'use strict';
// V94 · Gemini REVIEW94
//  §3 PERF_CAP_140_PLUS_V94 (ải chiến dịch ≥ 140): trần quái (hàng đợi sinh quái), quái thường tự rời màn sớm hơn, gộp đạn ta giữ nguyên tổng sát thương,
//     trần đạn quái thường (đạn boss không bị cắt), trần chữ số sát thương. Chế độ NHẸ (tự bật khi < 45 FPS từ V88) dùng trần thấp hơn.
//  §2 EARLY_GAME_UX_1_40_V94: chẩn đoán khi thua (ải 1–40) + cứu trợ tân thủ sau 2 lần thua liên tiếp cùng ải (đạn cấp 3 + khiên 2 đòn, miễn phí)
//     · dải "mục tiêu mở khóa kế tiếp" trên bản đồ (lấy đúng mốc mở thật của game) · gợi ý nâng cấp lần đầu sau ải 2 (nhấp nháy tab PHI ĐỘI, 1 lần).
//  Không chạy chữ trong trận. Tắt: window.V94=false · window.PERF94=false
const PERF94={from:140,
 pretty:{mobs:18,release:14,leave:18,shots:80,merge:60,eb:75,ebSoft:70,num:10},
 light:{mobs:13,release:10,leave:15,shots:50,merge:36,eb:50,ebSoft:46,num:4}};
const V94=(()=>{
 const on=()=>window.V94!==false;const pOn=()=>on()&&window.PERF94!==false;
 const KEY='saobang-ux94';let S={fail:{},up:0};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const g=f=>{try{return f();}catch{return null;}};
 // =================== §3 hiệu năng ===================
 const light=()=>g(()=>VisualFX.counts().quality==='light');
 const act=()=>{if(!pOn())return null;try{if(mode!=='play'||gameMode!=='campaign'||(level|0)<PERF94.from)return null;if(typeof Dungeons!=='undefined'&&Dungeons.active())return null;}catch{return null;}return light()?PERF94.light:PERF94.pretty;};
 const isNormal=e=>e&&!e.dead&&!e.boss&&!e.bossPart&&!e.elite&&!e.large&&!e.rescue28&&!e.vortex67&&e!==g(()=>boss);
 const nNormal=()=>{let n=0;try{for(const e of enemies)if(isNormal(e))n++;}catch{}return n;};
 let Q=[],oAdd=null,st={q:0,rel:0,merged:0,ebCut:0,left:0};
 function hookAdd(){if(oAdd||typeof addEnemy!=='function')return;oAdd=addEnemy;const f=function(e){try{const C=act();if(C&&isNormal(e)&&!(g(()=>boss&&!boss.dead))&&nNormal()>=C.mobs-2){Q.push(e);st.q++;return e;}}catch{}return oAdd.apply(this,arguments);};window.addEnemy=f;try{addEnemy=f;}catch{}}
 function release(C){if(!Q.length)return;const n=nNormal();let room=n<=C.release?C.mobs-2-n:0;if(n===0)room=Math.max(room,4);while(Q.length&&room-->0){const e=Q.shift();try{oAdd(e);st.rel++;}catch{}}}
 function leave(C){try{if(boss)return;for(const e of enemies){if(!isNormal(e))continue;if((e.age||0)>C.leave){e.dead=true;e.cap90=1;st.left++;}}}catch{}}
 const key=s=>(s.art28==null?'x':s.art28)+'|'+(s.type||'')+'|'+(s.gearKind||'')+'|'+(s.piercing?1:0);
 function mergeShots(C){let alive=0;try{for(const s of shots)if(!s.dead)alive++;}catch{return;}
  const fresh=[];for(const s of shots){if(s.__p94||s.dead)continue;s.__p94=1;if(s.ray28||!Number.isFinite(s.damage)||!s.__s85)continue;fresh.push(s);}
  if(alive<=C.merge||fresh.length<2&&alive<=C.shots)return;
  const by={};for(const s of fresh)(by[key(s)]=by[key(s)]||[]).push(s);const kill=new Set();
  for(const k in by){const L=by[k];for(let i=0;i+1<L.length&&alive-kill.size>C.merge;i+=2){const a=L[i],b=L[i+1];a.damage+=b.damage;if(a.r)a.r*=1.12;kill.add(b);}}
  if(alive-kill.size>C.shots){const keep=fresh.filter(s=>!kill.has(s));for(let i=keep.length-1;i>0&&alive-kill.size>C.shots;i--){keep[i-1].damage+=keep[i].damage;kill.add(keep[i]);}}
  if(kill.size){st.merged+=kill.size;const rest=shots.filter(s=>!kill.has(s));shots.length=0;for(const s of rest)shots.push(s);}}
 function capEB(C){let n=0;try{for(const b of bullets)if(!b.dead)n++;}catch{return;}const B=g(()=>boss&&!boss.dead?boss:null);const fresh=[];
  for(const b of bullets){if(b.__p94)continue;b.__p94=1;fresh.push(b);}if(n<=C.ebSoft)return;
  const nearBoss=b=>B&&Math.hypot(b.x-B.x,b.y-B.y)<170;const cut=new Set();
  for(let i=fresh.length-1;i>=0&&n-cut.size>C.ebSoft;i--){const b=fresh[i];if(!nearBoss(b))cut.add(b);}
  if(cut.size){st.ebCut+=cut.size;const rest=bullets.filter(b=>!cut.has(b));bullets.length=0;for(const b of rest)bullets.push(b);}}
 function capNum(C){try{if(numbers.length>C.num)numbers.splice(0,numbers.length-C.num);}catch{}}
 let oUpd=null;function hookUpd(){if(oUpd||typeof window.update!=='function')return;oUpd=window.update;const f=function(dt){const r=oUpd.apply(this,arguments);try{const C=act();if(C){release(C);leave(C);mergeShots(C);capEB(C);capNum(C);}else if(Q.length&&g(()=>mode!=='play'&&mode!=='pause'))Q=[];}catch{}return r;};window.update=f;try{update=f;}catch{}}
 // =================== §2 người mới ===================
 const camp=()=>g(()=>gameMode==='campaign'&&!(typeof Dungeons!=='undefined'&&Dungeons.active())&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active())&&!(window.BK78&&BK78.run())&&!(Meta40.state().run));
 let oEnd=null;function hookEnd(){if(oEnd||typeof end!=='function')return;oEnd=end;const f=function(win){let lv=0,c=false,w=-1,lost=false;try{lv=level|0;c=camp();w=boss?(boss.parts||[]).filter(p=>!p.dead&&p.hp>0).length:-1;lost=!win&&hp<=0;}catch{}
   const r=oEnd.apply(this,arguments);try{if(on()&&c&&lv>=1&&lv<=40){if(win){if(S.fail[lv]){delete S.fail[lv];save();}}else if(lost){S.fail[lv]=(S.fail[lv]|0)+1;save();setTimeout(()=>diag(lv,w),250);}}}catch{}return r;};window.end=f;try{end=f;}catch{}}
 function diag(lv,wings){const ov=document.getElementById('overlay');if(!ov||g(()=>mode)!=='over')return;ov.querySelectorAll('.dg94').forEach(x=>x.remove());let cp=0,req=0;try{cp=Combat.stats().cp;req=Meta40.reqCP(lv);}catch{}
  const L=[];/* V100: màn thua đã có ô THIẾU LỰC CHIẾN sẵn (nút CƯỜNG HÓA / PHI CÔNG) → bỏ dòng lực chiến trùng */
  if(wings>0)L.push(['💡 Bay lệch sang hai bên để phá 2 cánh boss trước — lõi chỉ nhận đủ sát thương khi cánh đã vỡ',null,null]);
  if((S.fail[lv]|0)>=2)L.push(['★ Lần vào ải '+lv+' tới được tặng CỨU TRỢ TÂN THỦ: đạn cấp 3 + khiên đỡ 2 đòn (miễn phí)',null,null]);
  if(!L.length)return;const d=document.createElement('div');d.className='dg94';d.style.cssText='margin:8px 0;padding:8px;border:1px solid #ffd36a;border-radius:8px;background:rgba(40,28,6,.85);font-size:12px;color:#ffe9a8;text-align:left';
  d.innerHTML=L.map(([t,b,r])=>`<p style="margin:3px 0">${esc(t)}${b?` <button data-dg94="${r}" style="margin-left:4px;padding:3px 8px;font-size:11px;font-weight:800;border-radius:6px;border:1px solid #ffd36a;background:#3a2a08;color:#ffd36a">${esc(b)}</button>`:''}</p>`).join('');
  d.addEventListener('click',e=>{const b=e.target.closest('[data-dg94]');if(!b)return;e.stopPropagation();try{End78.goLobby();}catch{try{document.getElementById('dock-return').click();}catch{}}setTimeout(()=>{try{Nav74.sub(b.dataset.dg94);}catch{}},400);});
  const rs=document.getElementById('rs');if(rs&&rs.offsetParent)rs.appendChild(d);else{const t=document.getElementById('ovtext');(t||ov.firstElementChild).after(d);}if(!d.offsetParent&&(arguments[2]|0)<12){d.remove();setTimeout(()=>diag(lv,wings,(arguments[2]|0)+1),300);}}
 // cứu trợ: thua ≥ 2 lần liên tiếp cùng ải 1–40 → lần vào kế tiếp tặng đạn cấp 3 + khiên 2 đòn (dùng đúng logic Tiếp tế trước trận)
 let oReset=null,aidOn=false;function hookReset(){if(oReset||typeof window.reset!=='function')return;oReset=window.reset;const f=function(){aidOn=false;try{document.querySelectorAll('#overlay .dg94').forEach(x=>x.remove());}catch{}try{if(on()&&g(()=>mode)!=='play'){const n=+document.getElementById('mission-select')?.value||0;const gm=document.getElementById('gamemode')?.value;
     if(gm==='campaign'&&n>=1&&n<=40&&(S.fail[n]|0)>=2&&window.UX90){const p=Object.assign({},UX90.state().p||{});if(!p.lv3||!p.shield){p.lv3=1;p.shield=1;UX90._set({p});aidOn=true;}}}}catch{}return oReset.apply(this,arguments);};window.reset=f;try{reset=f;}catch{}}
 function aidBanner(){const sh=document.getElementById('cm-sheet');if(!sh||!sh.classList.contains('open'))return;const n=+((sh.querySelector('h4')||{}).textContent||'').replace(/\D+/g,' ').trim().split(' ')[0]||0;
  const ex=sh.querySelector('.aid94');const want=n>=1&&n<=40&&(S.fail[n]|0)>=2;if(!want){if(ex)ex.remove();return;}if(ex)return;
  const p=document.createElement('p');p.className='aid94';p.style.cssText='grid-column:1/-1;margin:2px 0;padding:4px 6px;border-radius:6px;background:rgba(70,255,178,.12);color:#7dffb2;font-size:11px;font-weight:800;text-align:center';p.textContent='★ CỨU TRỢ TÂN THỦ: TẶNG ĐẠN CẤP 3 & KHIÊN 2 ĐÒN TRẬN NÀY ★';
  const act_=sh.querySelector('.cm-act');sh.insertBefore(p,act_||null);}
 // dải mục tiêu mở khóa kế tiếp trên bản đồ (mốc thật của game, kể cả Tàu đồng đội ở ải 40)
 function nextGoal(){let cl=0;try{cl=Progress.getState().cleared.length;}catch{return null;}const L=[];try{for(const id in Nav74.F){const f=Nav74.F[id];if(!f.lk||!f.lv)continue;let open=false;try{open=!!f.lk();}catch{}if(!open&&f.lv>cl)L.push([f.lv,f.n]);}}catch{}
  if(cl<40&&window.WING87===true)L.push([40,'TÀU ĐỒNG ĐỘI']);/* V154: đã bỏ đồng đội bay kèm */L.sort((a,b)=>a[0]-b[0]);if(!L.length)return null;const lv=L[0][0];return [lv,L.filter(x=>x[0]===lv).map(x=>x[1])];}
 function goalBar(){const map=document.getElementById('cmap');if(!map||map.hidden){return;}let bar=map.querySelector('.goal94');const G=nextGoal();if(!G){if(bar)bar.remove();return;}
  const t='🎯 Mục tiêu ải '+G[0]+': mở '+G[1].join(' · ');if(!bar){bar=document.createElement('div');bar.className='goal94';bar.style.cssText='position:absolute;left:50%;transform:translateX(-50%);top:92px;z-index:5;max-width:92%;padding:4px 10px;border-radius:999px;border:1px solid #ffd36a;background:rgba(30,20,4,.85);color:#ffe9a8;font-size:11px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none';map.appendChild(bar);}if(bar.textContent!==t)bar.textContent=t;}
 // gợi ý nâng cấp lần đầu sau ải 2: nhấp nháy tab PHI ĐỘI cho tới khi mở trang Chiến cơ
 let upA=null,flA=null;
 // V100 (REVIEW98 §2): vừa mở tab PHI ĐỘI ở ải 12 → nhấp nháy tab PHI ĐỘI tới khi người chơi mở tab đó 1 lần (cờ S.fleet)
 function fleetHint(){if(S.fleet||window.V100===false){if(flA){try{flA.cancel();}catch{}flA=null;}return;}let cl=0;try{cl=Progress.getState().cleared.length;}catch{return;}if(cl<12)return;const tb=document.querySelector('#nav74 [data-t="fleet"]');if(!tb||!tb.offsetParent)return;
  let cur='';try{cur=Nav74.state().cur;}catch{}if(cur==='fleet'){S.fleet=1;save();if(flA){try{flA.cancel();}catch{}flA=null;}return;}
  if((!flA||flA.effect&&flA.effect.target!==tb)&&g(()=>mode)!=='play'){try{if(flA)flA.cancel();}catch{}try{flA=tb.animate([{boxShadow:'0 0 0 0 #7fd8ff00'},{boxShadow:'0 0 14px 4px #7fd8ff'},{boxShadow:'0 0 0 0 #7fd8ff00'}],{duration:1200,iterations:Infinity});}catch{}}}
 function upHint(){try{fleetHint();}catch{}if(S.up){if(upA){try{upA.cancel();}catch{}upA=null;}return;}let cl=0;try{cl=Progress.getState().cleared.length;}catch{return;}const tb=document.querySelector('#nav74 [data-t="equip"]');if(!tb)return;
  let sub='';try{sub=Nav74.state().sub;}catch{}if(sub==='ships'){S.up=1;save();if(upA){try{upA.cancel();}catch{}upA=null;}return;}
  if(cl>=3&&g(()=>mode)!=='play'){if(!upA||!tb.dataset.up94||(upA.effect&&upA.effect.target!==tb)){tb.dataset.up94=1;try{if(upA)upA.cancel();}catch{}try{upA=tb.animate([{boxShadow:'0 0 0 0 #ffd36a00'},{boxShadow:'0 0 14px 4px #ffd36a'},{boxShadow:'0 0 0 0 #ffd36a00'}],{duration:1200,iterations:Infinity});}catch{}}}}
 function boot(){hookAdd();hookUpd();hookEnd();hookReset();}
 boot();setTimeout(boot,900);setTimeout(boot,3200);
 let lm94='';setInterval(()=>{try{const m=mode;if(lm94==='play'&&(m==='reward'||m==='win')&&camp()){const lv=level|0;if(S.fail[lv]){delete S.fail[lv];save();}}lm94=m;}catch{}},150);
 setInterval(()=>{if(!on())return;try{aidBanner();}catch{}try{goalBar();}catch{}try{upHint();}catch{}},600);
 return {state:()=>({S:JSON.parse(JSON.stringify(S)),Q:Q.length,st:{...st},aid:aidOn}),nextGoal,PERF94};
})();
window.V94=V94;
