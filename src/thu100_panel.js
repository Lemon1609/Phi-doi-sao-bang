'use strict';
// V100 · BẢNG NẠP TÀI KHOẢN MẪU (chỉ bản thử): nút 🧪 ở sảnh → chọn mốc → game tải lại 2 lần rồi sẵn sàng đánh ải mốc.
//  Cấu hình giống bộ đo STAGE_BENCHMARK (V89) của Claude. Không ảnh hưởng dữ liệu chơi thật (tiền tố thu100:).
const THU100_CFG={
 20:{n:'Ải 20 · người mới',cleared:19},
 120:{n:'Ải 120 · bậc S',cleared:119,grade:'S',ships:[1,7],sf:'P',sl:60,set:6,gf:'B+3',gl:55,gem:[[2,6]],main:30,subs:[15],wing:3},
 160:{n:'Ải 160 · bậc SS + đồng đội',cleared:159,grade:'SS',ships:[10,1],sf:'P+3',sl:85,set:9,gf:'P+2',gl:80,gem:[[3,4],[2,4]],main:50,subs:[30,30],wing:8},
 200:{n:'Ải 200 · bậc SS + Thần Hóa (đã qua 200 → mở Nguyệt Thực 161–200)',cleared:200,grade:'SS',ships:[13,1],sf:'P+5',sl:100,set:12,gf:'P+5',gl:100,gem:[[3,8]],main:60,subs:[60,60],wing:10,sss:1}};
const Thu100=(()=>{
 if(!window.THU100)return {};
 const FR={'W':0,'G':1,'B':2,'B+1':3,'B+2':4,'B+3':5,'P':6,'P+1':7,'P+2':8,'P+3':9,'P+4':10,'P+5':11},PCAP=[10,15,20,25,30,35,40,45,50,55,58,60];
 const T=m=>{try{toast(m);}catch{}};
 const step=()=>{try{return JSON.parse(sessionStorage.getItem('thu100-step')||'null');}catch{return null;}};
 const setStep=o=>{try{if(o)sessionStorage.setItem('thu100-step',JSON.stringify(o));else sessionStorage.removeItem('thu100-step');}catch{}};
 function wipe(){const ks=[];for(let i=0;i<window.localStorage.length;i++){const k=THU100RAW.key(i);if(k&&k.startsWith('thu100:'))ks.push(k);}for(const k of ks)try{THU100RAW.remove(k);}catch{}}
 function start(id){const c=THU100_CFG[id];if(!c)return;if(!confirm('Nạp tài khoản mẫu "'+c.n+'"? Dữ liệu BẢN THỬ hiện tại sẽ bị thay. (Dữ liệu chơi thật không bị ảnh hưởng.)'))return;
  window.__thuNoSave=1;wipe();
  setStep({id,phase:1,cl:c.cleared});location.reload();}
 function phase1(id){const c=THU100_CFG[id];document.getElementById('tutorial392')?.remove();Progress.setLocked(false);Progress.grantCredits(5e8);try{Workshop.exp70(1e8);}catch{}try{V75.addEn(500);}catch{}
  if(!c.grade){setStep(null);T('🧪 ĐÃ NẠP: '+c.n);return;}
  for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story');}catch{}
  for(const sh of c.ships)try{V70.setTier('craft',sh-1,FR[c.sf]);}catch{}
  const ids=[];for(const m of Campaign36.sets[c.set]){try{Campaign36.acquire('gear',m,'','story');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];V70.setTier('gear',it.id,FR[c.gf]);Progress.equip(it.id);ids.push(it.id);
   for(let k=0;k<200;k++){const g=Progress.v70.get(it.id);if(!g||g.level>=c.gl)break;if(Progress.upgrade(it.id)===false)break;}}catch{}}
  const tierFor=lv=>{for(let i=0;i<PCAP.length;i++)if(PCAP[i]>=lv)return i;return PCAP.length-1;};
  try{const team=[[4,c.main],...c.subs.map((lv,k)=>[[7,6,5][k],lv])];team.forEach(([pid,lv],k)=>{Pilot67._give(pid,lv);Pilot67._tier(pid,tierFor(lv));Pilot67.setSlot(k,pid);});}catch{}
  setStep({id,phase:2,cl:c.cleared,clDone:1,ws:c.ships.map(sh=>[sh-1,c.sl,c.grade])});setTimeout(()=>location.reload(),900);}
 function phase3(id){const c=THU100_CFG[id];document.getElementById('tutorial392')?.remove();const ci=c.ships[0]-1;
  try{const eq=Progress.v70.equipped();const ids=Object.values(eq);const hosts=['c'+ci,...ids.map(i=>'g:'+i)];const posOf=k=>k[0]==='c'?'ship':Progress.v70.get(k.slice(2)).kind;const q=[];for(const [t,n] of c.gem)for(let i=0;i<n;i++)q.push(t);
   const used={};let gd=0;while(q.length&&gd<50){gd++;for(const k of hosts){if(!q.length)break;const u=used[k]|0;if(u>=3)continue;const s=Stone71.make(q[0],posOf(k),{ty:'stat'});Stone71.give(s);if(Stone71.put(k,u,s.id)!==false){used[k]=u+1;q.shift();}else used[k]=9;}}}catch{}
  try{SSS87._set({done:c.sss?{[ci]:1}:{},off:{}});}catch{}try{Wing87._set({id:c.wing?c.wing-1:null});}catch{}try{selectCraft(ci);}catch{}
  setStep(null);let cp=0;try{cp=Math.round(Combat.stats().cp);}catch{}setTimeout(()=>T('🧪 ĐÃ NẠP: '+c.n+' · lực chiến '+cp.toLocaleString('vi-VN')),600);}
 function resume(){const st=step();if(!st)return;if(st.phase===1)phase1(st.id);else if(st.phase===3)phase3(st.id);}
 function panel(){let el=document.getElementById('thu100p');if(!el){el=document.createElement('div');el.id='thu100p';el.className='m63';document.body.appendChild(el);
   el.addEventListener('click',e=>{const b=e.target.closest('[data-thu]');if(!b){if(e.target===el)el.hidden=true;return;}const v=b.dataset.thu;if(v==='x'){el.hidden=true;return;}if(v==='wipe'){if(confirm('Xóa toàn bộ dữ liệu BẢN THỬ?')){wipe();location.reload();}return;}start(+v);});}
  el.innerHTML=`<div class="m63-card"><div class="m63-eye">BẢN THỬ · KHÔNG ẢNH HƯỞNG DỮ LIỆU THẬT</div><h3>🧪 Nạp tài khoản mẫu</h3><p class="ev83n">Chọn mốc để kiểm thử 10 bước. Game sẽ tải lại 2 lần (khoảng 10–20 giây).</p>
   ${Object.entries(THU100_CFG).map(([k,c])=>`<button class="m63-go" style="display:block;width:100%;margin:6px 0" data-thu="${k}">${c.n}</button>`).join('')}
   <div class="adv-btns"><button class="adv-x" data-thu="wipe">XÓA DỮ LIỆU BẢN THỬ</button><button class="adv-x" data-thu="x">ĐÓNG</button></div></div>`;el.hidden=false;}
 function fab(){if(document.getElementById('thu100b'))return;const b=document.createElement('button');b.id='thu100b';b.textContent='🧪';b.title='BẢN THỬ';b.style.cssText='position:fixed;left:2px;top:46%;opacity:.55;z-index:99990;padding:3px 5px;font-size:13px;font-weight:800;border-radius:8px;border:1px solid #ffd36a;background:#3a2a08;color:#ffd36a';
  b.addEventListener('click',e=>{e.stopPropagation();panel();});document.body.appendChild(b);}
 setInterval(()=>{const b=document.getElementById('thu100b');let m='';try{m=mode;}catch{}if(b)b.hidden=(m==='play'||m==='pause');},700);
 setTimeout(()=>{fab();resume();},4000);
 return {start,panel,CFG:THU100_CFG};
})();
window.Thu100=Thu100;
