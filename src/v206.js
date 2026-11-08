'use strict';
// V206 · Gemini + GPT chốt 08/11 (từ rà soát 6 repo tham khảo). Tách lớp: CFG (dữ liệu thuần) · hệ thống · vẽ giao diện.
//  1) BẢNG TỔNG KẾT SAU TRẬN (ý tưởng 3): cơ cấu sát thương 3 nguồn, ST/giây, thời gian hạ boss, sượt đạn, trúng đòn / khiên đỡ,
//     tỉ lệ loạt đạn trúng (1 loạt tính trúng nếu ≥1 viên chạm địch). So với lần trước cùng ải / chế độ (khóa mới saobang-v206).
//  2) PHẢN HỒI HẠ BOSS (ý tưởng 4): vỡ cánh chậm 0,2 s ×0,4 · hạ lõi xóa đạn địch + chậm 0,45 s ×0,3 · rung nhẹ (3 px / 180 ms).
//     2 công tắc trong Cài đặt: Rung màn hình · Chậm cảnh hạ boss. Không thêm chớp trắng.
//  3) LUYỆN TẬP BOSS (ý tưởng 8): chọn ải boss đã qua, 0 năng lượng, Bất tử / Máu thật, không thưởng, không tính nhiệm vụ.
//  4) PHẢN CHẤN VỠ CÁNH (Gemini phần A-b): mỗi cánh vỡ lần đầu trừ 12% máu lõi tối đa (không bao giờ tự kết liễu).
//  Tắt toàn bộ: window.V206=false · tắt riêng phản chấn: window.WING206=false
const V206_CFG={
 key:'saobang-v206',
 gearSrc:['gear','sss','evo','burn07','thunder07','awaken07','gungnir','bastion','pair','set77'],
 wing:{slow:[.20,.40],coreDmg:.12},
 death:{slow:[.45,.30],shake:{amp:3,ms:180}},
 shakeOff:{amp:0,ms:0},
 pracUnlock:10
};
const V206=(()=>{
 const C=V206_CFG,on=()=>window.V206!==false;
 let S={shake:true,slow:true,last:{}};try{Object.assign(S,JSON.parse(localStorage.getItem(C.key)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(C.key,JSON.stringify(S));}catch{}};
 const host=()=>document.fullscreenElement||document.webkitFullscreenElement||document.body;
 const T=m=>{try{toast(m);}catch{}};
 const nf=n=>n>=1e6?(n/1e6).toFixed(2).replace('.',',')+'M':n>=1e4?(n/1e3).toFixed(1).replace('.',',')+'K':String(Math.round(n));
 const calm=()=>{try{return VisualFX.reduced();}catch{return false;}};
 // ================= 1) THU SỐ LIỆU =================
 let R=null,LAST=null;
 function begin(){let gz=0;try{gz=Combat26.state().grazes|0;}catch{}R={el:0,bS:null,bT:null,sv:new Set(),svH:new Set(),blk:0,gz0:gz,stage:+level||0,mode:String(typeof gameMode!=='undefined'?gameMode:'')};}
 try{const o=Report392.reset;Report392.reset=function(){const r=o.apply(this,arguments);try{if(on())begin();}catch{}return r;};}catch{}
 try{const o=Report392.hit;Report392.hit=function(a,s){if(on()&&typeof s==='string'&&s!=='gear'&&C.gearSrc.includes(s))return o.call(this,a,'gear');return o.apply(this,arguments);};}catch{}
 try{const o=Battle28.armorHit;Battle28.armorHit=function(){if(R)R.blk++;return o.apply(this,arguments);};}catch{}
 const isMain=s=>s&&s.art28!=null&&!s.gearKind&&!s.ally&&s.type!=='drone'&&!s.escort40;
 function scan(){if(!R||mode!=='play')return;try{R.el+=Math.max(0,Math.min(.1,+frameDtC||0));}catch{}try{for(const s of shots){if(!isMain(s))continue;const k=svKey(s);R.sv.add(k);if(s.hit&&s.hit.size)R.svH.add(k);}}catch{}
  try{if(boss&&boss.bossHealthReady&&R.bS==null)R.bS=R.el;}catch{}}
 try{const o=runGameFrameC;runGameFrameC=function(){const r=o.apply(this,arguments);try{if(on())scan();}catch{}return r;};}catch{}
 // đạn không xuyên biến mất ngay khung trúng → ghi 'trúng' tại lúc va chạm (boss qua damageBoss, quái thường qua Arsenal30.hit)
 const svKey=s=>s.p120?s.p120.i+'@'+s.p120.born:(s.__k206||(s.__k206=Math.random()));
 const markHit=s=>{try{if(R&&isMain(s)){const k=svKey(s);R.sv.add(k);R.svH.add(k);}}catch{}};
 try{const od=window.damageBoss||damageBoss;const nb=function(a,src){markHit(src);return od.apply(this,arguments);};window.damageBoss=nb;try{damageBoss=nb;}catch{}}catch{}
 try{const o=Arsenal30.hit;Arsenal30.hit=function(s){markHit(s);return o.apply(this,arguments);};}catch{}
 function snap(){if(!R)return null;const st=Report392.state(),d=st.dealt,sec=Math.max(1,R.el);let gz=0;try{gz=(Combat26.state().grazes|0)-R.gz0;}catch{}
  const src={chinh:d.main||0,tb:d.gear||0,kn:(d.skill||0)+(d.bomb||0)},tot=src.chinh+src.tb+src.kn;
  let cfg='';try{cfg=[launchCraft,...Object.values(Progress.v70.equipped()).sort()].join(',');}catch{}
  return {stage:R.stage,mode:R.mode,sec,src,tot,dps:tot/sec,bossT:R.bT,hits:st.totalHits|0,blk:R.blk,gz:Math.max(0,gz),rate:R.sv.size?R.svH.size/R.sv.size:null,cfg};}
 // ================= 2) PHẢN HỒI HẠ BOSS + 4) PHẢN CHẤN VỠ CÁNH =================
 function applyShake(){try{const sh=FX16.feedback.screenShake;if(!sh.__o206)sh.__o206={e:sh.onEliteKill,p:sh.onPartOrBomb,h:sh.onPlayerHit,b:sh.onBossDestroy};
  if(!on()){Object.assign(sh,{onEliteKill:sh.__o206.e,onPartOrBomb:sh.__o206.p,onPlayerHit:sh.__o206.h,onBossDestroy:sh.__o206.b});return;}
  if(S.shake){sh.onEliteKill=sh.__o206.e;sh.onPartOrBomb=sh.__o206.p;sh.onPlayerHit=sh.__o206.h;sh.onBossDestroy=C.death.shake;}else{sh.onEliteKill=sh.onPartOrBomb=sh.onPlayerHit=sh.onBossDestroy=C.shakeOff;}}catch{}}
 applyShake();
 const slow=(a)=>{if(!on()||!S.slow||calm())return;try{Core407.slowmo(a[0],a[1]);}catch{}};
 try{const o=Combat26.breakWing;Combat26.breakWing=function(p){const first=p&&!p.__w206;const r=o.apply(this,arguments);
   try{if(on()&&first&&p){p.__w206=1;slow(C.wing.slow);const b=boss;if(window.WING206!==false&&b&&b.coreMax&&b.coreHp>0){const cut=b.coreMax*C.wing.coreDmg;b.coreHp=Math.max(Math.min(b.coreHp,b.coreMax*.02),b.coreHp-cut);try{syncBossHealth(b);}catch{}}}}catch{}return r;};}catch{}
 try{const o=defeatBoss;const f=function(){const b=boss;const ok=b&&mode==='play'&&b.bossHealthReady&&!b.defeatStarted&&b.coreHp<=0;
   if(ok&&on()){try{if(R&&R.bS!=null)R.bT=R.el-R.bS;}catch{}try{bullets=[];beams=[];}catch{}slow(C.death.slow);}
   return o.apply(this,arguments);};defeatBoss=f;}catch{}
 // ================= GIAO DIỆN TỔNG KẾT (GPT: 4 ô + 1 thanh + chi tiết) =================
 function cmp(n,o,better,unit,fmt){if(o==null||n==null)return '';const d=n-o;if(Math.abs(d)<(unit==='%'?.005:unit==='s'?.05:.5))return '<i class="eq">= như lần trước</i>';
  const good=better==='up'?d>0:d<0;const v=unit==='%'?Math.abs(d*100).toFixed(1).replace('.',',')+' điểm':unit==='s'?Math.abs(d).toFixed(1).replace('.',',')+' giây':fmt?fmt(Math.abs(d)):String(Math.round(Math.abs(d)));
  return `<i class="${good?'up':'dn'}">${d>0?'▲':'▼'} ${v} — ${good?(unit==='s'?'nhanh hơn':'tốt hơn'):(unit==='s'?'chậm hơn':'kém hơn')}</i>`;}
 function html(x){if(!x)return '';const k=x.mode+':'+x.stage,L=S.last[k]||null,same=L&&L.cfg===x.cfg;const p=v=>x.tot?Math.round(v/x.tot*100):0;
  const tile=(n,v,c)=>`<div class="t206"><span>${n}</span><b>${v}</b>${c||''}</div>`;
  const head=L?`<p class="h206">So với lần trước${same?'':' · đã đổi cấu hình'}</p>`:`<p class="h206">Lần ghi nhận đầu tiên</p>`;
  return `<div class="s206">${head}<div class="g206">
   ${tile('Hạ boss',x.bossT!=null?x.bossT.toFixed(1).replace('.',',')+' giây':'Chưa hạ',L&&x.bossT!=null?cmp(x.bossT,L.bossT,'down','s'):'')}
   ${tile('Sát thương / giây',nf(x.dps),L?cmp(x.dps,L.dps,'up','',nf):'')}
   ${tile('Sượt đạn',String(x.gz),L?cmp(x.gz,L.gz,'up'):'')}
   ${tile('Trúng đòn',String(x.hits)+(x.blk?` <small>(khiên đỡ ${x.blk})</small>`:''),L?cmp(x.hits,L.hits,'down'):'')}</div>
   <div class="b206" title="Cơ cấu sát thương"><i style="width:${p(x.src.chinh)}%" class="c1"></i><i style="width:${p(x.src.tb)}%" class="c2"></i><i style="width:${p(x.src.kn)}%" class="c3"></i></div>
   <p class="l206"><span class="c1">■</span> Đạn chiến cơ ${p(x.src.chinh)}% · <span class="c2">■</span> Trang bị & SSS ${p(x.src.tb)}% · <span class="c3">■</span> Kỹ năng & VKTT ${p(x.src.kn)}%</p>
   ${x.rate!=null?`<p class="l206">Loạt đạn chính trúng đích: <b>${Math.round(x.rate*100)}%</b> <small>(một loạt tính là trúng nếu có ít nhất 1 viên chạm địch)</small></p>`:''}</div>`;}
 function detail(x){if(!x)return '';const r=(n,v)=>`<div><span>${n}</span><b>${nf(v)}</b><em>${x.tot?Math.round(v/x.tot*100):0}%</em></div>`;
  return `<div class="d206">${r('Đạn chiến cơ',x.src.chinh)}${r('Trang bị & SSS',x.src.tb)}${r('Kỹ năng & VKTT (kể cả bom)',x.src.kn)}<div><span>Tổng · ${Math.round(x.sec)} giây</span><b>${nf(x.tot)}</b><em>100%</em></div></div>`;}
 function record(x){if(!x)return;const k=x.mode+':'+x.stage;S.last[k]={bossT:x.bossT,dps:x.dps,gz:x.gz,hits:x.hits,rate:x.rate,cfg:x.cfg};const ks=Object.keys(S.last);if(ks.length>60)delete S.last[ks[0]];save();}
 // Chèn vào thẻ kết quả ResultFX (#rs): 4 ô ngay trên phần "Chi tiết sát thương"; chi tiết thay bằng bảng 4 dòng.
 try{const o=Report392.html;Report392.html=function(){if(!on())return o.apply(this,arguments);const x=snap();LAST=x;return detail(x)||o.apply(this,arguments);};}catch{}
 const mo=new MutationObserver(()=>{if(!on()||!LAST)return;const rs=document.getElementById('rs');if(!rs||rs.querySelector('.s206'))return;const d=rs.querySelector('details');const box=document.createElement('div');box.innerHTML=html(LAST);const el=box.firstElementChild;if(!el)return;if(d)d.before(el);else rs.appendChild(el);record(LAST);});
 try{mo.observe(document.body,{childList:true,subtree:true});}catch{}
 // ================= CÀI ĐẶT: 2 công tắc =================
 function setBox(){return `<div class="st206"><div class="st66-l">HÌNH ẢNH & CẢM GIÁC</div><div class="st66-row"><button type="button" data-s206="shake" aria-pressed="${S.shake}">Rung màn hình: ${S.shake?'BẬT':'TẮT'}</button><button type="button" data-s206="slow" aria-pressed="${S.slow}">Chậm cảnh hạ boss: ${S.slow?'BẬT':'TẮT'}</button></div><p class="st66-d">Chế độ hình ảnh Nhẹ / giảm hiệu ứng tự tắt cảnh chậm.</p></div>`;}
 setInterval(()=>{try{if(!on())return;const card=document.querySelector('.st66:not([hidden]) .m63-card');if(card&&!card.querySelector('.st206')){const seg=card.querySelector('.st66-seg');const w=document.createElement('div');w.innerHTML=setBox();(seg?seg.parentNode:card).insertBefore(w.firstElementChild,seg?seg.nextSibling:null);}}catch{}},700);
 document.addEventListener('click',e=>{const b=e.target.closest('[data-s206]');if(!b)return;const k=b.dataset.s206;S[k]=!S[k];save();applyShake();const box=b.closest('.st206');if(box){const w=document.createElement('div');w.innerHTML=setBox();box.replaceWith(w.firstElementChild);}},true);
 // ================= 3) LUYỆN TẬP BOSS =================
 let P=null,piv=null;
 const cleared=()=>{try{const c=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}').cleared||[];return c.length?Math.max(...c):0;}catch{return 0;}};
 function bossStages(){const mx=cleared(),L=[];for(let s=1;s<=Math.min(200,mx);s++){try{if(Campaign36.bossKind(s))L.push(s);}catch{}}return L;}
 function pracOpen(){if(!on())return;if(cleared()<C.pracUnlock){T('VƯỢT ẢI '+C.pracUnlock+' ĐỂ MỞ LUYỆN TẬP');return;}const L=bossStages();if(!L.length){T('CHƯA CÓ BOSS ĐÃ VƯỢT');return;}
  const el=document.createElement('div');el.className='p206';el.innerHTML=`<div class="p206-b"><h3>🎯 LUYỆN TẬP BOSS</h3><p>Đánh lại boss ải đã vượt · không tốn năng lượng · không nhận thưởng · không tính nhiệm vụ.</p>
   <label>Ải boss<select data-p="st">${L.slice().reverse().map(s=>`<option value="${s}">Ải ${s}</option>`).join('')}</select></label>
   <div class="p206-r"><button type="button" data-p="imm" aria-pressed="true">Bất tử</button><button type="button" data-p="real" aria-pressed="false">Máu thật</button></div>
   <div class="p206-a"><button type="button" data-p="go" class="go">BẮT ĐẦU</button><button type="button" data-p="x">Đóng</button></div></div>`;
  let imm=true;el.addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b){if(e.target===el)el.remove();return;}const k=b.dataset.p;
   if(k==='imm'||k==='real'){imm=k==='imm';el.querySelectorAll('[data-p=imm],[data-p=real]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.p===(imm?'imm':'real'))));}
   else if(k==='x')el.remove();else if(k==='go'){const st=+el.querySelector('[data-p=st]').value;el.remove();pracStart(st,imm);}});host().appendChild(el);}
 function pracStart(stage,imm){if(P)return;let en0=0,cr0=0;try{en0=V75.energy();}catch{}try{cr0=Progress.balance();}catch{}
  try{document.querySelectorAll('#hub40,.c72,#g44').forEach(e=>e.hidden=true);mode='menu';Lobby.show();const sel=document.getElementById('mission-select');if(![...sel.options].some(o=>o.value==String(stage))){const o=document.createElement('option');o.value=String(stage);o.textContent='Luyện tập';sel.appendChild(o);}
   document.getElementById('gamemode').value='campaign';sel.value=String(stage);Lobby.hide();reset();if(mode==='pause')mode='play';}catch(e){T('CHƯA VÀO ĐƯỢC LUYỆN TẬP');return;}
  P={stage,imm,en0,cr0,done:false};window.__prac206=true;setTimeout(()=>{try{enemies=[];startBoss();}catch{}},700);
  piv=setInterval(()=>{if(!P)return;try{if(P.imm&&mode==='play'){invuln=Math.max(invuln,1);hp=maxHp;}if(mode==='play'){for(const e of enemies)if(!e.boss&&!e.bossPart)e.dead=true;}
   const ov=document.getElementById('overlay');if(!P.done&&(mode==='over'||(ov&&!ov.hidden&&ov.dataset.state==='over')))pracEnd(false);}catch{}},120);
  T('LUYỆN TẬP · ẢI '+stage+(imm?' · BẤT TỬ':' · MÁU THẬT'));}
 function pracEnd(won){if(!P||P.done)return;P.done=true;const x=snap();clearInterval(piv);piv=null;
  try{Revive393.close();}catch{}try{Combat26.cancelSkill();}catch{}try{superTime=0;bullets=[];beams=[];enemies=[];boss=null;}catch{}try{if(typeof PlayScreen!=='undefined')PlayScreen.exit(false);}catch{}try{mode='menu';}catch{}try{document.getElementById('overlay').hidden=true;}catch{}try{Lobby.show();}catch{}
  try{const d=V75.energy()-P.en0;if(d<0)V75.addEn(-d);}catch{}try{const g=Progress.balance()-P.cr0;if(g>0){try{if(mode!=='play')Progress.setLocked(false);}catch{}Progress.spendCredits(Math.floor(g));}}catch{}const st=P.stage;P=null;window.__prac206=false;
  setTimeout(()=>{const el=document.createElement('div');el.className='p206';el.innerHTML=`<div class="p206-b"><h3>${won?'✅ ĐÃ HẠ BOSS':'⏹ KẾT THÚC'} · LUYỆN TẬP ẢI ${st}</h3>${html(x)}${detail(x)}<p class="nt">Không tính thưởng, không tính nhiệm vụ.</p><div class="p206-a"><button type="button" data-q="again" class="go">Luyện lại</button><button type="button" data-q="x">Đóng</button></div></div>`;
   if(x)record(x);el.addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(!b&&e.target!==el)return;el.remove();if(b&&b.dataset.q==='again')pracOpen();});host().appendChild(el);},350);}
 try{const o=finishStage36;const f=function(){if(P&&!P.done){try{if(R&&R.bS!=null&&R.bT==null)R.bT=R.el-R.bS;}catch{}pracEnd(true);return;}return o.apply(this,arguments);};finishStage36=f;}catch{}
 try{const o=Missions393.add;Missions393.add=function(){if(P)return;return o.apply(this,arguments);};}catch{}
 // nút mở: trong màn Chiến dịch (cạnh Càn quét) + mọi phần tử có data-p206
 setInterval(()=>{try{if(!on())return;const c=document.getElementById('campaign');if(c&&!c.querySelector('.pb206')){const b=document.createElement('button');b.type='button';b.className='pb206';b.dataset.p206='1';b.textContent='🎯 LUYỆN TẬP BOSS · không tốn năng lượng';c.appendChild(b);}}catch{}},1500);
 document.addEventListener('click',e=>{const b=e.target.closest('[data-p206]');if(!b)return;e.preventDefault();e.stopPropagation();pracOpen();},true);
 return {C,state:()=>({...S,R:R&&{bS:R.bS,bT:R.bT,sv:R.sv.size,svH:R.svH.size,blk:R.blk}}),snap,html,pracOpen,pracStart,pracEnd,active:()=>!!P,_set:o=>{Object.assign(S,o);save();applyShake();}};
})();
window.V206X=V206;
