'use strict';
// V309 · TIẾN BẬC ROBOT HỢP THỂ +1 → +10 bằng 4 nguyên liệu (Gemini robot lượt 2; chủ dự án chốt 19–20/11). Tắt: window.HOP309=false
//  • 1 bộ = 1 Lõi Phản Vật Chất + 1 Hợp Kim Siêu Kết + 1 Mạch Đồng Bộ + 1 Chip Điều Phối AI (không chia phẩm).
//  • +N cần bộ [1,2,3,4,6,8,11,14,17,20] + ◈ [2.000 … 42.000]; trần bậc = 2 × min(cường hóa 2 chiến cơ thành phần) (thành phần tối đa +5 → hợp thể +10).
//  • Đổi dữ liệu 1 lần: robot đang có giữ bậc cũ (= bậc cao nhất thành phần cho phép). Robot hợp thể mới bắt đầu +0.
//  • PHÓ BẢN VẬT LIỆU HỢP THỂ: 4 cấp mở ở ải 60/90/120/150, 2 lượt miễn phí/ngày (0 thể lực), rơi 2/4/6/8 nguyên liệu chia đều 4 loại;
//    cấp đã thắng thì càn quét được (tốn 1 lượt). Ải Khó (nguồn thứ 2) làm sau.
//  • Hình chiến cơ theo mốc: +0–2 → b1 · +3–9 → b2 · +10 → b3 (atlas SSS_ATLAS hàng trên được ghép lại lúc chạy).
const HOP309CFG={sets:[1,2,3,4,6,8,11,14,17,20],cr:[2000,3500,5500,8000,11000,15000,20000,26000,33000,42000],
 mats:['Lõi Phản Vật Chất','Hợp Kim Siêu Kết','Mạch Đồng Bộ','Chip Điều Phối AI'],ic:['⬣','▰','◉','▣'],
 dg:{names:['DỄ','THƯỜNG','KHÓ','CỰC HẠN'],stage:[60,90,120,150],drop:[2,4,6,8],free:2,warm:30,minWin:20,hp:[1,1.15,1.3,1.5]},
 sync:[0,1.5,3,4.5,6,7.5,9,10.5,12,13.5,15]};
window.Hop309=(()=>{
 const C=HOP309CFG,KEY='saobang-hop309-v1',ON=()=>window.HOP309!==false;
 const rd=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&typeof v==='object'?v:{};}catch{return {};}};
 const S=Object.assign({v:1,m:[0,0,0,0],adv:{},mig:0,day:'',used:0,clr:[0,0,0,0]},rd());
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const T=m=>{try{toast(m);}catch{}};
 const today=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 function roll(){if(S.day!==today()){S.day=today();S.used=0;save();}}
 const maxStage=()=>{try{const c=Progress.v70.cleared();return c.length?Math.max(...c):0;}catch{try{return Math.max(0,...Progress.getState().cleared);}catch{return 0;}}};
 const limit=i=>{try{return 2*Math.min(...FusionBlueprints.pairs[i].map(c=>Workshop.craftProgress(c).enhance));}catch{return 0;}};
 const owned=i=>{try{return Fusion.getState().supers.some(q=>q.model===i);}catch{return false;}};
 // ---------- đổi dữ liệu 1 lần (lúc này window.Hop309 chưa gán nên Fusion.resolve trả bậc cũ) ----------
 if(!S.mig){try{for(const q of Fusion.getState().supers){const r=Fusion.resolve(q.key);if(r)S.adv[q.model]=Math.max(S.adv[q.model]|0,r.enhance|0);}}catch{}S.mig=1;save();}
 function enh(i,derived){if(!ON())return derived;return Math.max(0,Math.min(S.adv[i]|0,derived));}
 const adv=i=>S.adv[i]|0;
 const sets=()=>Math.min(...S.m);
 function cost(n){return {sets:C.sets[n]||0,cr:C.cr[n]||0};}
 function why(i){const a=adv(i);if(!owned(i))return 'CHƯA HỢP THỂ';if(a>=10)return 'ĐÃ +10';if(a>=limit(i))return 'CẦN 2 CHIẾN CƠ THÀNH PHẦN +'+Math.ceil((a+1)/2);
  const c=cost(a);if(sets()<c.sets)return 'THIẾU NGUYÊN LIỆU · cần '+c.sets+' bộ';let b=0;try{b=Progress.balance();}catch{}if(b<c.cr)return 'THIẾU HỢP KIM · cần '+fmt(c.cr)+' ◈';return '';}
 function promote(i){const w=why(i);if(w){T(w);return false;}const a=adv(i),c=cost(a);if(!Progress.spendCredits(c.cr))return false;
  for(let k=0;k<4;k++)S.m[k]-=c.sets;S.adv[i]=a+1;save();try{Fusion.render();}catch{}try{SSSLab.paint();}catch{}refreshAtlas();
  T('✦ TIẾN BẬC +'+(a+1)+' · '+FusionBlueprints.names[i].toUpperCase());return true;}
 function add(n){n=Math.max(0,n|0);for(let j=0;j<n;j++){let k=0;for(let t=1;t<4;t++)if(S.m[t]<S.m[k])k=t;S.m[k]++;}save();}
 function addK(k,n){S.m[k]=(S.m[k]|0)+Math.max(0,n|0);save();}
 // ---------- hình chiến cơ theo mốc (ghép lại hàng trên của atlas) ----------
 const mark=e=>e>=10?3:e>=3?2:1;
 const bases={},cvs={};let sig='';
 const imgs={};function img(src){if(!imgs[src]){const im=new Image();im.onload=()=>{sig='';};im.src=src;imgs[src]=im;}return imgs[src];}
 function paint(name,src,s){const b=bases[name]||(bases[name]=img(src));if(!b.complete||!b.naturalWidth)return false;
  const W=b.naturalWidth,H=b.naturalHeight,cw=W/7,ch=H/2,c=cvs[name]||(cvs[name]=document.createElement('canvas'));c.width=W;c.height=H;
  c.naturalWidth=W;c.naturalHeight=H;c.complete=true;c.__h309=1;const g=c.getContext('2d');g.clearRect(0,0,W,H);g.drawImage(b,0,0);let ok=true;
  const E21=k=>(window.EVO21!==false&&window.EVO21IMG!==false&&window.EVO21_IMG&&EVO21_IMG[k])||null;/* V2.1: tranh GPT mới — chiến cơ ct<i>_f<m> (hàng trên) + robot ct<i>_r<m> (hàng dưới) theo mốc */
  s.split('').forEach((m,i)=>{const fs=E21('ct'+(i+1)+'_f'+m)||(m==='1'?null:HOP309_IMG['f'+i+'_b'+m]);if(fs){const im=img(fs);if(!im.complete||!im.naturalWidth){ok=false;}else{g.clearRect(i*cw,0,cw,ch);g.drawImage(im,i*cw,0,cw,ch);}}
   const rs=E21('ct'+(i+1)+'_r'+m);if(rs){const im=img(rs);if(!im.complete||!im.naturalWidth){ok=false;}else{g.clearRect(i*cw,ch,cw,ch);g.drawImage(im,i*cw,ch,cw,ch);}}});
  return ok;}
 function refreshAtlas(){if(!ON()||typeof HOP309_IMG==='undefined'||typeof SSS_ATLAS==='undefined'){window.__hop309atlas=window.__hop309bay=null;return;}
  const s=[0,1,2,3,4,5,6].map(i=>{try{const r=Fusion.resolve('sss:'+i);return r?mark(r.enhance|0):1;}catch{return 1;}}).join('');
  if(s===sig)return;if(!/[23]/.test(s)&&!(window.EVO21!==false&&window.EVO21_IMG&&EVO21_IMG.ct1_f1)){window.__hop309atlas=window.__hop309bay=null;sig=s;return;}
  const a=paint('a',SSS_ATLAS,s),b=typeof SSS_ATLAS_BAY==='undefined'||paint('b',SSS_ATLAS_BAY,s);
  if(!a||!b){setTimeout(refreshAtlas,300);return;}
  window.__hop309atlas=cvs.a;window.__hop309bay=cvs.b||cvs.a;sig=s;try{SSSLab.paint();}catch{}}
 setTimeout(refreshAtlas,1200);setInterval(()=>{try{refreshAtlas();}catch{}},3000);
 // ---------- phó bản vật liệu ----------
 const D=C.dg;
 const tierOpen=t=>maxStage()>=D.stage[t];
 let run=null;
 function start(t){roll();if(!ON())return;if(!tierOpen(t)){T('MỞ Ở ẢI '+D.stage[t]);return;}if(S.used>=D.free){T('HẾT LƯỢT HÔM NAY');return;}
  close();try{Nav74.closeAll();}catch{}try{Lobby.hide();ChapterMap.close();Hub40.close();}catch{}
  run={t,st:D.stage[t],t0:performance.now(),boss:false,done:false};
  try{document.getElementById('gamemode').value='campaign';syncModeSetup();}catch{}
  try{document.getElementById('mission-select').value=String(run.st);reset();}catch(e){console.warn('HOP309 start',e);}
  if(typeof mode==='undefined'||mode!=='play'){run=null;T('CHƯA VÀO ĐƯỢC TRẬN');return;}
  T('⬣ PHÓ BẢN VẬT LIỆU · '+D.names[t]);}
 try{const oc=Progress.canStart;Progress.canStart=function(n){try{if(run&&!run.done&&Number(n)===run.st)return true;}catch{}return oc.apply(this,arguments);};}catch{}
 try{const oa=addEnemy;const fn=function(e){const r=oa.apply(this,arguments);try{if(run&&!run.done&&e&&!e.__h309&&e!==boss){e.__h309=1;const m=D.hp[run.t];e.hp*=m;e.maxHp=e.hp;}}catch{}return r;};window.addEnemy=fn;try{addEnemy=fn;}catch{}}catch{}
 function tick(){if(!run||typeof mode==='undefined')return;
  if(mode!=='play'&&mode!=='pause'){if(!run.done){run.done=true;T('PHÓ BẢN VẬT LIỆU · CHƯA THẮNG · KHÔNG MẤT LƯỢT');}run=null;return;}
  if(mode==='pause')return;const el=(performance.now()-run.t0)/1000;
  if(!run.boss&&boss&&!boss.__h309){boss.__h309=1;run.boss=true;const m=D.hp[run.t];if(boss.max)boss.max*=m;if(boss.maxHp)boss.maxHp*=m;boss.hp*=m;}
  if(!boss&&el>=D.warm&&!run.called){run.called=true;try{enemies=enemies.filter(e=>e.elite);}catch{}try{startBoss();}catch{}}
  if(boss&&boss.defeatStarted&&!run.done&&el>=D.minWin){run.done=true;const r=run;run=null;const got=win(r.t);
   setTimeout(()=>{try{end(false);}catch{}setTimeout(()=>{try{End78.goLobby();}catch{}try{document.body.classList.remove('res78');}catch{}const hide=()=>document.querySelectorAll('.ux75d').forEach(e=>e.hidden=true);[200,600,1000,1500].forEach(t=>setTimeout(hide,t));setTimeout(()=>{open();showRes(r.t,got);},1100);},350);},900);}}
 setInterval(()=>{try{tick();}catch{}},200);
 function win(t){roll();S.used++;S.clr[t]=1;const n=D.drop[t];add(n);save();return n;}
 function sweep(t){roll();if(!S.clr[t]){T('THẮNG CẤP NÀY 1 LẦN ĐỂ CÀN QUÉT');return false;}if(S.used>=D.free){T('HẾT LƯỢT HÔM NAY');return false;}
  S.used++;add(D.drop[t]);save();T('CÀN QUÉT · +'+D.drop[t]+' NGUYÊN LIỆU HỢP THỂ');return true;}
 // ---------- giao diện ----------
 let el=null,resMsg='';
 const css=`.h309 .m63-card{max-width:440px}.h309-m{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:6px 0}
.h309-m div{padding:6px 4px;border:1px solid #b388ff55;border-radius:8px;background:#160f33cc;text-align:center;font-size:11px;line-height:1.3}
.h309-m b{display:block;font-size:16px;color:#e6d3ff}.h309-m i{font-style:normal;font-size:18px;color:#c9a2ff}
.h309-res{margin:6px 0;padding:8px 10px;border:1px solid #46ffb266;border-radius:8px;background:#0d2a22cc;font-size:12px}
div.h309-adv.h309-adv{display:block;margin:10px 0 6px;padding:9px 11px;border:1px solid #ffd56a77;border-radius:10px;background:linear-gradient(#2a2009e6,#170f04e6);font-size:12px;line-height:1.45;color:#f4e6c4;text-align:left}
div.h309-adv.h309-adv b.t{display:block;color:#ffd56a;font-size:14px;letter-spacing:.5px;margin-bottom:2px}
div.h309-adv.h309-adv small{display:block;opacity:.88;font-size:11.5px}div.h309-adv.h309-adv small b{color:#fff}
div.h309-adv.h309-adv .row{display:flex;gap:8px;align-items:stretch;margin-top:7px}
div.h309-adv.h309-adv .row button{all:unset;box-sizing:border-box;flex:1;min-height:38px;padding:0 10px;border-radius:9px;font-weight:900;font-size:13px;text-align:center;display:flex;align-items:center;justify-content:center;cursor:pointer;background:linear-gradient(#ffe48f,#e3a62b)!important;color:#2a1800!important;box-shadow:0 0 0 1px #fff3 inset,0 2px 8px #0008}
div.h309-adv.h309-adv .row button[disabled]{background:#3a3424!important;color:#b9ad8d!important;cursor:default;font-size:11.5px}
div.h309-adv.h309-adv .row button.g{flex:0 0 auto;padding:0 12px;background:#2a2150!important;color:#e0d2ff!important;border:1px solid #b388ff77}`;
 function build(){
  el=document.createElement('div');el.className='m63 adv69 h309';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const b=e.target.closest('[data-h]');if(!b){if(e.target===el)close();return;}const [a,t]=b.dataset.h.split(':');
   if(a==='x')close();else if(a==='go')start(+t);else if(a==='sw'){sweep(+t);resMsg='';render();}});}
 const MK=['mat_m1_phan_vat_chat','mat_m2_hop_kim_sieu_ket','mat_m3_mach_dong_bo','mat_m4_chip_ai'];const micon=k=>{try{const u=HOP309_IMG[MK[k]];if(u)return `<img src="${u}" style="width:34px;height:34px;display:block;margin:0 auto 2px" alt="">`;}catch{}return C.ic[k];};
 const matRow=()=>`<div class="h309-m">${C.mats.map((n,k)=>`<div><i>${micon(k)}</i><b>${fmt(S.m[k]|0)}</b>${n}</div>`).join('')}</div>`;
 function render(){roll();const left=Math.max(0,D.free-S.used);
  const rows=D.names.map((n,t)=>{const op=tierOpen(t);return `<div class="adv-s"><div><b>${n} · ải ${D.stage[t]}</b><small>${op?'+'+D.drop[t]+' nguyên liệu (chia đều 4 loại)'+(S.clr[t]?' · đã thắng':''):'🔒 mở ở ải '+D.stage[t]}</small></div>${op?`<button data-h="go:${t}" ${left?'':'disabled'}>ĐÁNH</button>${S.clr[t]?`<button data-h="sw:${t}" ${left?'':'disabled'}>CÀN QUÉT</button>`:''}`:'<em class="no">🔒</em>'}</div>`;}).join('');
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">PHÓ BẢN VẬT LIỆU HỢP THỂ</div>
   <p class="adv-sub" style="margin:4px 0;font-size:12px">Lượt hôm nay <b>${left}/${D.free}</b> · không tốn thể lực · thua không mất lượt · đủ bộ <b>${sets()}</b></p>
   ${matRow()}${resMsg?`<div class="h309-res">${resMsg}</div>`:''}<div class="adv-src">${rows}</div>
   <p class="adv-sub" style="font-size:11px;opacity:.8">Dùng để tiến bậc robot hợp thể +1 → +10 (1 bộ = 4 nguyên liệu khác nhau).</p>
   <div class="adv-btns"><button class="adv-x" data-h="x">ĐÓNG</button></div></div>`;}
 function showRes(t,n){resMsg='✓ THẮNG '+D.names[t]+' · +'+n+' nguyên liệu hợp thể';render();}
 function open(){if(!ON())return;if(!el)build();render();el.hidden=false;}
 function close(){if(el)el.hidden=true;}
 // ---------- khối tiến bậc trong màn Hợp thể (HT197) ----------
 function panel(i){const a=adv(i),L=limit(i),c=cost(a),w=why(i),nx=a+1;
  if(!owned(i))return '';
  const m=mark(a),mn=['','Dạng 1 (+0–2)','Dạng 2 (+3–9)','Dạng MAX (+10)'][m];
  return `<div class="h309-adv"><b class="t">TIẾN BẬC +${a}${a<10?' → +'+nx:' · TỐI ĐA'}</b>
   <small>Trần theo thành phần: +${L} · Đồng bộ ${C.sync[a].toFixed(1).replace('.',',')}% · ${mn}</small>
   ${a<10?`<small>Cần <b>${c.sets} bộ</b> (đang có ${sets()} bộ) + <b>${fmt(c.cr)} ◈</b></small>`:''}
   <div class="row">${a<10?`<button type="button" data-h309p="${i}" ${w?'disabled':''}>${w||'TIẾN BẬC +'+nx}</button>`:''}<button type="button" class="g" data-h309o="1">VẬT LIỆU</button></div></div>`;}
 try{const st=document.createElement('style');st.id='hop309-css';st.textContent=css;document.head.appendChild(st);}catch{}
 function decorate(){if(!ON())return;document.querySelectorAll('.ht197').forEach(box=>{
   const nm=box.querySelector('.ht-name b');if(!nm)return;let i=-1;try{i=SSS_MODELS.findIndex(m=>m.name===nm.textContent);}catch{}if(i<0)return;
   const k=i+':'+adv(i)+':'+sets()+':'+limit(i);if(box.__h309===k)return;box.__h309=k;box.querySelectorAll('.h309-adv').forEach(e=>e.remove());
   const h=document.createElement('div');h.innerHTML=panel(i);const p=h.firstElementChild;if(!p)return;
   const at=box.querySelector('.ht-main');(at?at.parentNode:box).insertBefore(p,at?at.nextSibling:null);
   p.querySelector('[data-h309p]')?.addEventListener('click',()=>{if(promote(i)){box.__h309='';const sm=box.querySelector('.ht-name small');if(sm)sm.textContent=sm.textContent.replace(/\+\d+/,'+'+adv(i));decorate();}});
   p.querySelector('[data-h309o]')?.addEventListener('click',open);});}
 setInterval(()=>{try{decorate();}catch{}},500);
 return {enh,adv,limit,cost,why,promote,add,addK,sets,mark,open,close,start,sweep,refreshAtlas,dot:()=>{roll();return tierOpen(0)&&S.used<D.free;},open_:()=>tierOpen(0),
  state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();sig='';refreshAtlas();},_run:()=>run,C};
})();
