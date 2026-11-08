// V79 · MÀN KẾT QUẢ PHÓ BẢN hiện đúng phần thưởng nhận được (thay dòng "chiến lợi phẩm đã về kho")
//  Chụp kho lúc vào phó bản → so với lúc kết thúc → thành các ô icon + số (cùng kiểu màn kết quả chiến dịch, end78.slim).
//  Áp dụng: Phó bản Vàng · Vật liệu · Ngọc · Trang bị. Tắt: window.DG79=false
const Dg79=(()=>{
 const on=()=>window.DG79!==false;
 const jget=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')||{};}catch{return {};}};
 const NAME={gold:'PHÓ BẢN VÀNG',materials:'PHÓ BẢN VẬT LIỆU',gems:'PHÓ BẢN NGỌC',bossdungeon:'PHÓ BẢN TRANG BỊ'};
 const COL=['Trắng','Lục','Lam','Tím'];
 let snap=null,last=null,kind='',diff=0;
 // V79B · bảng thưởng 4 phó bản × 4 cấp (Gemini REVIEW79B) — hợp kim · đá (Vật liệu: exp + 5×aux = 55/80/110/145) · mảnh ngọc
 window.DG79T={cr:{gold:[1800,3200,5200,8400],materials:[500,900,1500,2200],gems:[400,750,1200,1800],bossdungeon:[400,700,1100,1600]},mexp:[25,30,35,45],maux:[6,10,15,20],gem:[15,24,35,50]};
 // Phó bản Vật liệu: nguyên liệu nâng khung [màu, xác suất] · loại ưu tiên cái đang ít nhất trong kho (Gemini)
 //  Cấp 1: 1 Lục · Cấp 2: 1 Lục + 50% 1 Lam · Cấp 3: 50% 1 Lục + 1 Lam · Cấp 4: 1 Lam + 45% 1 Tím (chủ dự án đồng ý)
 const MATS79=[[[1,1]],[[1,1],[2,.5]],[[1,.5],[2,1]],[[2,1],[-1,.45]]];
 function leastType(tier){let best=null,bn=1e9;try{for(const t of MAT69.types){const n=V70.have(t.id+tier);if(n<bn||(n===bn&&Math.random()<.5)){bn=n;best=t.id;}}}catch{}return best||MAT69.types[0].id;}
 function matsBonus(){try{const T=MATS79[Math.max(0,Math.min(3,diff))];for(let [tier,p] of T){if(tier<0)tier=window.MATTIM79===false?2:3;if(Math.random()<p)V70.add(leastType(tier)+tier,1);}}catch{}}
 function snapshot(){const P=Progress.getState(),W=Workshop.getState();
  return {cr:P.credits|0,exp:W.exp|0,aux:W.aux|0,items:new Set((P.items||[]).map(i=>i.id)),m:{...(jget('saobang-adv69-v1').m||{})},ph:{...(jget('saobang-tier70-v1').ph||{})},crafts:(()=>{const o=[];for(let i=0;i<13;i++){try{o.push(Campaign36.ownsCraft(i));}catch{o.push(false);}}return o;})()};}
 const shipName=i=>{try{return Fighters28.profiles[i].name;}catch{try{return crafts[i].name;}catch{return 'Chiến cơ';}}};
 const phLabel=k=>{const [a,col]=k.split(/:(?=[0-3]$)/);let nm='';try{nm=a[0]==='c'?shipName(+a.slice(1)):GearCatalog[a.slice(2)].name;}catch{}return 'Phôi '+(COL[+col]||'Lam')+(nm?' · '+nm:'');};
 function lines(s0){const s1=snapshot(),out=[];
  const dc=s1.cr-s0.cr;if(dc>0)out.push('◈ +'+dc.toLocaleString('vi-VN')+' hợp kim');
  const de=(s1.exp-s0.exp)+5*(s1.aux-s0.aux);if(de>0)out.push('+'+de+' đá nâng cấp');
  for(const k in s1.m){const d=(s1.m[k]|0)-(s0.m[k]|0);if(d>0){let nm=k;try{nm=V70.matName(k);}catch{}out.push('+'+d+' '+nm);}}
  for(const k in s1.ph){const d=(s1.ph[k]|0)-(s0.ph[k]|0);if(d>0)out.push('+'+d+' '+phLabel(k));}
  try{for(let i=0;i<13;i++)if(!s0.crafts[i]&&Campaign36.ownsCraft(i))out.push('CHIẾN CƠ MỚI: '+shipName(i));}catch{}
  try{for(const it of (Progress.getState().items||[]))if(!s0.items.has(it.id)){let nm='Trang bị';try{nm=Progress.title(it);}catch{try{nm=GearCatalog[it.variant].name;}catch{}}out.push('TRANG BỊ MỚI: '+nm);}}catch{}
  try{if(last&&kind==='gems'){const L0=String(last.loot||'');const m=L0.match(/(\d+)\s*mảnh ngọc\s*([^·<]+)/);const gr=(L0.match(/cấp ngọc\s*([DCBAS])/)||[])[1]||'';if(m)out.push('+'+m[1]+' mảnh ngọc '+m[2].trim()+(gr?' ('+gr+')':''));}}catch{}
  return out;}
 function decorate(){if(!on())return;const rs=document.querySelector('#overlay #rs');if(!rs||rs.dataset.dg79)return;let dg=false;try{dg=!!(lastReward&&lastReward.dungeon);}catch{}if(!dg)return;rs.dataset.dg79=1;
  const s0=snap;snap=null;if(!s0)return;
  const t=rs.querySelector('.rs-t');if(t)t.textContent=(window.UI19_ART?'PHẦN THƯỞNG NHẬN ĐƯỢC':(NAME[kind]||'PHÓ BẢN')+' · PHẦN THƯỞNG');
  try{const TT={gold:'gold',materials:'materials',gems:'gems',bossdungeon:'equipment'}[kind];const rib=rs.querySelector('.rs-rib');if(rib&&TT&&window.UI19_ART&&UI19_ART['result_title_'+TT]){rib.textContent=NAME[kind]||'PHÓ BẢN';rib.classList.add('u19rib','u19rib-'+TT);}}catch{}
  const L=lines(s0);let loot=rs.querySelector('.rs-loot');if(!loot){loot=document.createElement('div');loot.className='rs-loot';const anchor=rs.querySelector('.rs-hint,details');anchor?rs.insertBefore(loot,anchor):rs.appendChild(loot);}
  if(!L.length){const p=document.createElement('div');p.className='rs-hint';p.textContent='Lượt này không nhận thêm vật phẩm.';loot.appendChild(p);return;}
  let d=.6;for(const x of L){const c=document.createElement('div');c.className='rs-chip';c.style.animationDelay=d.toFixed(2)+'s';d+=.1;c.textContent=x;loot.appendChild(c);}}
 function install(){
  try{const c0=Dungeons.complete;Dungeons.complete=function(){const r=c0.apply(this,arguments);try{last=r;if(r&&on()&&gameMode==='materials')matsBonus();}catch{}return r;};}catch{}
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-dungeon][data-difficulty]');if(b&&!b.disabled)diff=+b.dataset.difficulty|0;},true);
 }
 setTimeout(install,100);
 let lm='';setInterval(()=>{try{if(!on())return;let m='',act=false;try{m=mode;act=Dungeons.active();}catch{}
   if(m==='play'&&lm!=='play'&&lm!=='pause'&&act){try{snap=snapshot();kind=gameMode;last=null;}catch{snap=null;}}
   if(m==='reward')decorate();lm=m;}catch{}},120);
 return {state:()=>({on:!!snap,kind})};
})();
window.Dg79=Dg79;
