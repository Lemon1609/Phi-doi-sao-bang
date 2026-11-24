// V2.2.0 · Giao diện & Xưởng (chủ dự án 24/11): Sảnh hangar (nền mới + bụi sáng + vòng xoay), khung hộp thoại viền kép,
//  Kho 2 tầng (TỔNG LỰC CHIẾN · TRANG PHỤC · ← TRỞ LẠI · CÔNG/MÁU/GIÁP · tab PHI CÔNG | VŨ KHÍ TỐI THƯỢNG · thẻ trang bị arcade + 3 ô VKTT),
//  HỒ SƠ PHI CÔNG (chạm chân dung ở Sảnh), TRANG PHỤC & KHUNG AVATAR GIỚI HẠN (6 khung giới hạn có chỉ số thưởng nhỏ).
//  Khóa mới: saobang-hoso22-v1. Không backdrop-filter / shadowBlur / ctx.filter; xem trước dùng CSS (không canvas mỗi khung).
//  Tắt: window.V22=false · từng phần: V22LOBBY / V22MODAL / V22KHO / V22HS =false
const V22=(()=>{
 const on=k=>window.V22!==false&&(!k||window[k]!==false);
 const K='saobang-hoso22-v1';
 let S={name:'',av:null,fr:'none',unl:{},bk:0,uid:''};
 try{Object.assign(S,JSON.parse(localStorage.getItem(K)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(K,JSON.stringify(S));}catch{}};
 const I=k=>(window.UI22_IMG||{})[k]||'';
 const T=m=>{try{toast(m);}catch{}};
 const g=(f,d)=>{try{const v=f();return v==null||Number.isNaN(v)?d:v;}catch{return d;}};
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const nf=n=>Math.round(n||0).toLocaleString('vi-VN');
 // ---------------- chiến tích ----------------
 const robots=()=>g(()=>{const s=Fusion.getState();return s.robots||s.list||s.owned||[];},[]);
 const ST={
  cleared:()=>g(()=>{const c=Progress.getState().cleared;return c.length?Math.max(...c):0;},0),
  tower:()=>g(()=>Meta40.state().S.tower.best|0,0),
  endless:()=>g(()=>V92.rank().best|0,0),
  stars3:()=>g(()=>Object.values(Campaign36.getState().stars||{}).filter(v=>v>=3).length,0),
  bosses:()=>Math.max(g(()=>+Progress.getState().bosses||0,0),S.bk|0),
  ships:()=>g(()=>[...Array(13).keys()].filter(i=>Campaign36.ownsCraft(i)).length,0),
  sss:()=>g(()=>{const o=Gear44.state().owned||{};return Object.keys(o).filter(k=>o[k]).length;},0),
  gods:()=>g(()=>robots().length,0),
  god10:()=>g(()=>robots().some(r=>{try{return Hop309.enh(r)>=10;}catch{return false;}}),false),
  awake1:()=>g(()=>!!SSS87.state().done[0],false),
 };
 // đếm boss hạ (chiến dịch + mọi chế độ có defeatBoss)
 try{const o=defeatBoss;const f=function(){try{if(!window.HANGAR_DEMO){S.bk=(S.bk|0)+1;save();}}catch{}return o.apply(this,arguments);};defeatBoss=f;}catch{}
 // ---------------- khung avatar ----------------
 const FR=[
  {id:'none',n:'Không khung',k:'base',d:'Chân dung không viền.'},
  {id:'steel',n:'Thép Lam',k:'base',d:'Khung thép mặc định của phi đội.'},
  {id:'royal',n:'Hoàng Gia',k:'base',need:()=>ST.cleared()>=20,cond:'Vượt ải 20',d:'Viền vàng hoàng gia.'},
  {id:'phoenix',n:'Phượng Hoàng Lửa',k:'lim',img:'frame_phoenix',need:()=>ST.awake1()||ST.cleared()>=30,cond:'Thức tỉnh chiến cơ #01 hoặc vượt ải 30',b:{atk:.02}},
  {id:'ice',n:'Hàn Băng Tinh Thể',k:'lim',img:'frame_ice',need:()=>ST.tower()>=20,cond:'Tháp Boss tầng 20',b:{hp:.03}},
  {id:'thunder',n:'Lôi Đình Ánh Sáng',k:'lim',img:'frame_thunder',need:()=>ST.sss()>=5,cond:'Sở hữu 5 trang bị SSS',b:{atk:.03}},
  {id:'void',n:'Hư Không Chân Lý',k:'lim',img:'frame_void',need:()=>ST.god10(),cond:'Một Chiến Thần đạt +10',b:{atk:.03,hp:.02}},
  {id:'holy',n:'Thánh Quang',k:'lim',img:'frame_holy',need:()=>ST.stars3()>=100,cond:'100 ải đạt 3★',b:{hp:.04}},
  {id:'jade',n:'Lục Bảo',k:'lim',img:'frame_jade',need:()=>ST.bosses()>=200,cond:'Hạ 200 boss',b:{atk:.02,hp:.02}},
 ];
 const frOf=id=>FR.find(f=>f.id===id)||FR[0];
 const owned=f=>!f.need||!!S.unl[f.id];
 const ready=f=>!owned(f)&&g(()=>!!f.need(),false);
 const bonusTxt=b=>!b?'Không có chỉ số':[b.atk?'+'+Math.round(b.atk*100)+'% Công':'',b.hp?'+'+Math.round(b.hp*100)+'% Máu':''].filter(Boolean).join(' · ');
 function curB(){const f=frOf(S.fr);return owned(f)&&f.b?f.b:null;}
 function hookBonus(){try{if(typeof Combat==='undefined'||Combat.__v22)return;Combat.__v22=1;
   const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);try{const b=on('V22HS')&&curB();return b&&b.atk?v*(1+b.atk):v;}catch{return v;}};
   const os=Combat.stats;Combat.stats=function(){const r=os.apply(this,arguments);try{const b=on('V22HS')&&curB();if(b&&r){if(b.atk){const a0=r.attack;r.attack*=1+b.atk;r.cp=Math.round(r.cp+(r.attack-a0)*24);}if(b.hp&&r.hp){const h0=r.hp;r.hp*=1+b.hp;r.cp=Math.round(r.cp+(r.hp-h0)*30);}}}catch{}return r;};}catch{}
  try{if(!window.reset||window.reset.__v22)return;const orr=window.reset;const f=function(){const r=orr.apply(this,arguments);try{const b=on('V22HS')&&curB();if(b&&b.hp&&mode==='play'){maxHp=Math.round(maxHp*(1+b.hp)*10)/10;hp=maxHp;}}catch{}return r;};f.__v22=1;window.reset=f;try{reset=f;}catch{}}catch{}}
 // ---------------- chân dung + khung ----------------
 const pilotImg=id=>{try{return (typeof PILOT_ASSETS!=='undefined'&&PILOT_ASSETS&&(PILOT_ASSETS['p'+id]||PILOT_ASSETS[id]))||'';}catch{return '';}};
 const pilots=()=>g(()=>PILOTS67,[]);
 const ownP=id=>g(()=>!!Pilot67.state().own[id],false);
 const avId=()=>S.av&&ownP(S.av)?S.av:g(()=>Pilot67.main(),null);
 function avatar(px,fr,id){id=id==null?avId():id;fr=fr||S.fr;const p=pilots().find(x=>x.id===id),im=id?pilotImg(id):'',f=frOf(fr);
  const face=im?`<img src="${im}" alt="">`:`<b>${esc(p?p.name.split(' ').pop()[0]:'?')}</b>`;
  return `<span class="av22 fr22-${f.id}" style="--s:${px}px;--pc:${p?p.col:'#5d7894'}">${face}${f.img&&I(f.img)?`<i class="fi22" style="background-image:url(${I(f.img)})"></i>`:''}</span>`;}
 const uid=()=>{if(S.uid)return S.uid;let id='';try{id=(JSON.parse(localStorage.getItem('saobang-meta-v407')||'{}').id||'');}catch{}if(!id)id=Math.random().toString(36).slice(2,10);S.uid=String(id).toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,10)||'SB'+Date.now().toString(36).toUpperCase();save();return S.uid;};
 const cp=()=>g(()=>Combat.stats().cp,0);
 const RK=[[0,'Tân Binh','#9fb3c8'],[20,'Đồng','#d08a4a'],[50,'Bạc','#cfe0f0'],[90,'Vàng','#ffd23f'],[130,'Bạch Kim','#7fe8ff'],[160,'Kim Cương','#c58bff'],[190,'Huyền Thoại','#ff7a59']];
 const rank=()=>{const c=ST.cleared();let r=RK[0];for(const x of RK)if(c>=x[0])r=x;return r;};
 const nameOf=()=>S.name||g(()=>{const p=pilots().find(x=>x.id===avId());return p?p.name:'Phi công';},'Phi công');
 const titleOf=()=>g(()=>{const t=L8309.cur('title');return t&&t.id!=='none'?t.n:'';},'');
 // ---------------- thẻ trang bị arcade ----------------
 const TIER=['tr','luc','lam','tim','tim5','ss'];
 const W7={hunter:'void_greatsword',web:'solar_orbital_laser',fortress:'prism_bastion',world:'chronos_astrolabe'};
 const form=r=>r>=15?4:r>=10?3:r>=6?2:1;
 function vkImg(id,r){const m=window.VKTT307_IMG||{};return m[W7[id]+'_d'+form(r)]||m[W7[id]]||'';}
 function gems(key){try{const h=Stone71.hostOf(key);if(!h)return '';const n=Stone71.C.slotN.length,st=Stone71.on(key),tc=Stone71.C.tc;let s='';
   for(let i=0;i<n;i++){const x=st.find(z=>z.on&&z.on.s===i);const t=x?(x.q!=null?x.q:x.t!=null?x.t:x.tier!=null?x.tier:0):-1;s+=i>=h.open?'<i class="gx"></i>':x?`<i class="gf" style="--gc:${tc[Math.max(0,Math.min(tc.length-1,t|0))]}"></i>`:'<i class="ge"></i>';}
   return `<span class="gm22">${s}</span>`;}catch{return '';}}
 const crest='<i class="cr22" aria-hidden="true"><svg viewBox="0 0 40 26"><defs><linearGradient id="cg22" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c4"/><stop offset=".5" stop-color="#ffd23f"/><stop offset="1" stop-color="#c47a0c"/></linearGradient></defs><path d="M20 25 9 8 1 6l6-4 7 1 6 11 6-11 7-1 6 4-8 2z" fill="url(#cg22)" stroke="#5a3200" stroke-width="1.2" stroke-linejoin="round"/><path d="M20 21l-5-9h10z" fill="#fff8d6" opacity=".7"/></svg></i>';
 function decorSlot(b){const t=Math.max(0,Math.min(5,+(b.dataset.f17||0)));for(const c of TIER)b.classList.remove('r22-'+c);b.classList.add('r22-'+TIER[t],'c22');
  const kind=b.dataset.k307k,it=b.dataset.it;let sss=false,key='';
  if(kind){sss=g(()=>String(Gear44.activeId(kind)||'').startsWith('sss_'),false);if(it)key='g:'+it;}
  else if(b.classList.contains('c9ship')){const i=g(()=>launchCraft!=null?launchCraft:selected,0);sss=g(()=>!!SSS87.state().done[i],false);key='c'+i;}
  b.classList.toggle('aw22',sss);
  if(sss&&!b.querySelector('.cr22'))b.insertAdjacentHTML('beforeend',crest);else if(!sss)b.querySelector('.cr22')?.remove();
  // +N / MAX (theo bậc trong khung: Tím +3 …)
  let plus='';if(key){const h=g(()=>Stone71.hostOf(key),null);const tag=h&&h.tag?String(h.tag):'';const m=tag.match(/\+\s*(\d+)/);const mx=kind?g(()=>{const x=Progress.v70.get(it);return V70.isMax(x);},false):g(()=>V70.isMax(key.slice(1)|0),false);plus=mx?'MAX':m?'+'+m[1]:'';}
  if(plus)for(const el of b.querySelectorAll('*:not(.pl22)'))if(!el.children.length&&/^\s*\+\s*\d+\s*$/.test(el.textContent))el.classList.add('h22');
  let pl=b.querySelector('.pl22');if(plus){if(!pl){pl=document.createElement('em');pl.className='pl22';b.appendChild(pl);}if(pl.textContent!==plus)pl.textContent=plus;}else pl?.remove();
  const gh=key?gems(key):'';let gm=b.querySelector('.gm22');if(gh){if(!gm||gm.outerHTML!==gh){gm?.remove();b.insertAdjacentHTML('beforeend',gh);}}else gm?.remove();}
 // ---------------- 3 ô VKTT ----------------
 function vkRow(){let st=null;try{st=Ult72.state();}catch{}const C=window.ULT72||(typeof Ult72!=='undefined'&&Ult72.C)||{};/* ULT72 là const, không có trên window */const lv=ST.cleared();const supU=Array.isArray(C.sup)?C.sup:[100,120];
  const cell=(id,idx)=>{const main=idx===0;const shape=main?'ci':'hx';
   const lockAt=main?((C.unlock&&C.unlock.lv)||0):(Array.isArray(supU)?supU[idx-1]:[100,120][idx-1]);
   if(!main&&lv<(lockAt|0))return `<button type="button" class="vk22 ${shape} lk" data-v22vk="1"><span class="vb"><i class="lock22"></i></span><small>MỞ Ở ẢI ${lockAt}</small></button>`;
   if(!id)return `<button type="button" class="vk22 ${shape} em" data-v22vk="1"><span class="vb"><i class="plus22">+</i></span><small>${main?'CHỦ CHIẾN':'HỖ TRỢ'}</small></button>`;
   const w=(st&&st.w&&st.w[id])||{r:0,lv:1};const r=w.r|0,f=C.rf?C.rf[r]:0,col=C.fcol?C.fcol[f]:'#9fd2ff';
   return `<button type="button" class="vk22 ${shape}" data-v22vk="1" style="--vc:${col}"><span class="vb"><img src="${vkImg(id,r)}" alt=""></span><small>${esc((C.nm&&C.nm[id])||id)}</small><em>${esc((C.rn&&C.rn[r])||'')} · Lv.${w.lv|0}</em></button>`;};
  return `<div class="vkr22">${cell(st&&st.sup&&st.sup[0],1)}${cell(st&&st.main,0)}${cell(st&&st.sup&&st.sup[1],2)}</div><button type="button" class="vgo22" data-v22vk="1">MỞ VŨ KHÍ TỐI THƯỢNG ›</button>`;}
 // ---------------- KHO ----------------
 let tabB=false;
 function kho(){const d=document.querySelector('#hub40 .hb-doll.d9');const hub=document.getElementById('hub40');if(!d||!hub||hub.hidden){return;}
  if(!on('V22KHO')){d.classList.remove('k22');return;}
  d.classList.add('k22');d.classList.toggle('tb22B',tabB);
  const kh=d.querySelector('.kh42');if(kh){const sm=kh.querySelector('.cp42 small');if(sm&&sm.textContent!=='TỔNG LỰC CHIẾN')sm.textContent='TỔNG LỰC CHIẾN';
   if(!kh.querySelector('.bk22')){const b=document.createElement('button');b.type='button';b.className='bk22';b.textContent='← TRỞ LẠI';b.setAttribute('aria-label','Trở lại sảnh');b.addEventListener('click',e=>{e.stopPropagation();try{Nav74.tab('home');}catch{}});kh.appendChild(b);}
   const tp=d.querySelector('.c9tp');if(tp&&tp.parentElement!==kh)kh.appendChild(tp);}
  // dải CÔNG / MÁU / GIÁP
  const s42=d.querySelector('.st42');if(s42){const sp=s42.querySelectorAll('span');const v=i=>sp[i]?.querySelector('b')?.textContent||'';const mg=v(1).split('·').map(x=>x.trim());
   const html=`<span><small>CÔNG</small><b>${esc(v(0))}</b></span><span><small>MÁU</small><b>${esc(mg[0]||'')}</b></span><span><small>GIÁP</small><b>${esc(mg[1]||'')}</b></span>`;
   let s22=d.querySelector('.st22');if(!s22){s22=document.createElement('div');s22.className='st22';s42.after(s22);}if(s22.dataset.h!==html){s22.dataset.h=html;s22.innerHTML=html;}}
  // tab
  const first=d.querySelector('.cb9')||d.querySelector('.c9sc');
  let tb=d.querySelector('.tb22');if(!tb&&first){tb=document.createElement('div');tb.className='tb22';tb.innerHTML='<button type="button" data-t22="a">PHI CÔNG</button><button type="button" data-t22="b">VŨ KHÍ TỐI THƯỢNG</button>';first.before(tb);
   tb.addEventListener('click',e=>{const b=e.target.closest('[data-t22]');if(!b)return;e.stopPropagation();tabB=b.dataset.t22==='b';kho();});}
  if(tb)for(const b of tb.querySelectorAll('button'))b.setAttribute('aria-pressed',String((b.dataset.t22==='b')===tabB));
  let vk=d.querySelector('.vkw22');if(!vk){vk=document.createElement('div');vk.className='vkw22';(tb||d).after(vk);}
  if(tabB){const h=vkRow();if(vk.dataset.h!==h){vk.dataset.h=h;vk.innerHTML=h;}}
  for(const b of d.querySelectorAll('.hb-slot'))try{decorSlot(b);}catch{}}
 document.addEventListener('click',e=>{const b=e.target.closest('[data-v22vk]');if(!b)return;e.preventDefault();e.stopPropagation();try{Ult72.open();}catch{T('VŨ KHÍ TỐI THƯỢNG CHƯA MỞ');}},true);
 // ---------------- HỒ SƠ PHI CÔNG ----------------
 let hsTab='tb';
 function stats(){return [['ic_trophy','KỶ LỤC VÔ TẬN',nf(ST.endless())+' điểm'],['ic_core','THÁP BOSS',ST.tower()?'Tầng '+ST.tower():'Chưa leo'],['ic_map','ẢI ĐẠT 3★',ST.stars3()+' ải'],['ic_core','BOSS ĐÃ HẠ',nf(ST.bosses())],['ic_chest','CHIẾN CƠ',ST.ships()+' / 13'],['ic_chest','TRANG BỊ SSS',ST.sss()+' món'],['ic_trophy','CHIẾN THẦN',ST.gods()+' robot'],['ic_map','ẢI CAO NHẤT',ST.cleared()?'Ải '+ST.cleared():'—']];}
 function gearMini(){const d=document.querySelector('#hub40 .hb-doll.d9');let s='';
  const eq=g(()=>Progress.getState().equipped,{})||{};const art=k=>{try{const id=eq[k];if(!id)return '';const it=Progress.v70.get(id);return typeof Progress.art==='function'?Progress.art(it):'';}catch{return '';}};
  const ship=g(()=>{const i=launchCraft!=null?launchCraft:selected;return window.SHIPCUR17?SHIPCUR17(i):'';},'');
  s+=`<div class="hg22">${[['ship','CHIẾN CƠ'],['armor','GIÁP'],['missiles','TÊN LỬA'],['sidearm','TÀU CON']].map(([k,n])=>`<div class="hgc"><span class="hgi">${k==='ship'?(ship?`<img src="${ship}" alt="">`:''):art(k)}</span><small>${n}</small></div>`).join('')}</div>`;
  return s+vkRow();}
 function hsHtml(){const r=rank(),t=titleOf();
  return `<div class="hs22b"><div class="hd22"><b>HỒ SƠ PHI CÔNG</b><button type="button" class="x22" data-hs="x" aria-label="Đóng">✕</button></div>
  <div class="hs22top">${t?`<div class="tt22"><span>${esc(t.toUpperCase())}</span></div>`:''}
   <div class="hs22row"><button type="button" class="hsav" data-hs="fr" aria-label="Đổi khung avatar">${avatar(92)}<i class="rk22" style="--rc:${r[2]}" title="${r[1]}"></i></button>
    <div class="hs22inf"><div class="nm22"><input type="text" maxlength="16" value="${esc(nameOf())}" aria-label="Tên phi công" data-hs="nm"><button type="button" data-hs="ed" aria-label="Sửa tên">✎</button></div>
     <div class="uid22">UID: <b>${esc(uid())}</b><button type="button" data-hs="cp" aria-label="Chép UID">⧉</button></div>
     <div class="rkn22" style="--rc:${r[2]}">HẠNG ${esc(r[1].toUpperCase())}</div>
     <div class="cp22"><small>LỰC CHIẾN</small><b>${nf(cp())}</b></div></div></div>
   <button type="button" class="fbt22" data-hs="fr">TRANG PHỤC & KHUNG AVATAR ›</button></div>
  <div class="hstab22"><button type="button" data-hs="t:tb" aria-pressed="${hsTab==='tb'}">TRANG BỊ</button><button type="button" data-hs="t:ct" aria-pressed="${hsTab==='ct'}">CHIẾN TÍCH</button></div>
  <div class="hsbody22">${hsTab==='tb'?gearMini():`<div class="ctg22">${stats().map(([ic,n,v])=>`<div class="ct22"><img src="${I(ic)}" alt=""><span><small>${n}</small><b>${esc(v)}</b></span></div>`).join('')}</div>`}</div></div>`;}
 function hsOpen(){if(!on('V22HS'))return;let el=document.getElementById('hs22');if(!el){el=document.createElement('div');el.id='hs22';el.className='m22';document.body.appendChild(el);
   el.addEventListener('click',e=>{const b=e.target.closest('[data-hs]');if(!b){if(e.target===el)hsClose();return;}const k=b.dataset.hs;
    if(k==='x')hsClose();else if(k==='fr')frOpen();else if(k.startsWith('t:')){hsTab=k.slice(2);paintHs();}
    else if(k==='ed'){const i=el.querySelector('[data-hs=nm]');i.focus();i.select();}
    else if(k==='cp'){try{navigator.clipboard.writeText(uid());T('ĐÃ CHÉP UID');}catch{T('UID: '+uid());}}});
   el.addEventListener('change',e=>{if(e.target.dataset.hs==='nm'){const v=e.target.value.trim().slice(0,16);S.name=v;save();T(v?'ĐÃ ĐỔI TÊN':'DÙNG TÊN PHI CÔNG');}});
   el.addEventListener('keydown',e=>{if(e.target.dataset.hs==='nm'&&e.key==='Enter')e.target.blur();});}
  paintHs();el.hidden=false;document.documentElement.classList.add('m22on');}
 function paintHs(){const el=document.getElementById('hs22');if(el)el.innerHTML=hsHtml();}
 function hsClose(){const el=document.getElementById('hs22');if(el)el.hidden=true;if(!document.querySelector('.m22:not([hidden])'))document.documentElement.classList.remove('m22on');}
 // ---------------- TRANG PHỤC & KHUNG AVATAR ----------------
 let frTab='lim',frPick=null;
 function frCards(){if(frTab==='pc')return `<div class="pc22"><p>Trang phục chiến cơ, tàu con, tên lửa và danh hiệu nằm ở màn Trang phục cũ (giữ nguyên dữ liệu).</p><button type="button" class="tl22" data-fr="o8">MỞ TRANG PHỤC CHIẾN CƠ ›</button><button type="button" class="st22b" data-fr="pl">MỞ MÀN PHI CÔNG ›</button></div>`;
  if(frTab==='av'){return `<div class="gr22">${pilots().map(p=>{const own=ownP(p.id),sel=(frPick!=null?frPick:avId())===p.id;return `<button type="button" class="cd22${sel?' on':''}${own?'':' lk'}" data-fr="a:${p.id}">${avatar(64,'none',p.id)}<small>${esc(p.name)}</small>${own?'':'<i class="lock22"></i>'}</button>`;}).join('')}</div>`;}
  const list=FR.filter(f=>frTab==='lim'?f.k==='lim':f.k==='base');
  return `<div class="gr22">${list.map(f=>{const own=owned(f),sel=(frPick||S.fr)===f.id;return `<button type="button" class="cd22${sel?' on':''}${own?'':ready(f)?' rd':' lk'}" data-fr="f:${f.id}">${avatar(64,f.id)}<small>${esc(f.n)}</small>${S.fr===f.id&&own?'<em>ĐANG DÙNG</em>':''}${own?'':'<i class="lock22"></i>'}</button>`;}).join('')}</div>`;}
 function frDetail(){if(frTab==='pc')return '';
  if(frTab==='av'){const id=frPick!=null?frPick:avId();const p=pilots().find(x=>x.id===id);if(!p)return '';const own=ownP(id),use=avId()===id;
   return `<div class="dt22"><b>${esc(p.name)}</b><small>${own?'Chân dung phi công đã chiêu mộ':'Chiêu mộ phi công để dùng chân dung'}</small>${own?(use?'<button type="button" class="tl22 dis" disabled>ĐANG DÙNG</button>':`<button type="button" class="tl22" data-fr="ua:${id}">SỬ DỤNG</button>`):''}</div>`;}
  const f=frOf(frPick||S.fr),own=owned(f),rd=ready(f);
  return `<div class="dt22"><b>${esc(f.n)}</b><small>${esc(f.d||(f.cond?'Điều kiện: '+f.cond:''))}</small>${f.k==='lim'?`<small class="bn22">Chỉ số khi đeo: <i>${bonusTxt(f.b)}</i></small>`:''}${!own&&f.cond?`<small class="cd">Điều kiện: ${esc(f.cond)}</small>`:''}
   ${own?(S.fr===f.id?'<button type="button" class="tl22 dis" disabled>ĐANG DÙNG</button>':`<button type="button" class="tl22" data-fr="u:${f.id}">SỬ DỤNG</button>`):rd?`<button type="button" class="tl22" data-fr="m:${f.id}">MỞ KHÓA</button>`:'<button type="button" class="tl22 dis" disabled>CHƯA ĐẠT</button>'}</div>`;}
 function frHtml(){const pv=frTab==='av'?avatar(110,S.fr,frPick!=null?frPick:avId()):frTab==='pc'?avatar(110):avatar(110,frPick||S.fr);
  return `<div class="hs22b fr22b"><div class="hd22"><b>TRANG PHỤC & KHUNG AVATAR</b><button type="button" class="x22" data-fr="x" aria-label="Đóng">✕</button></div>
  <div class="rd22"><i class="rr1"></i><i class="rr2"></i><i class="pt"></i><i class="pt p2"></i><i class="pt p3"></i>${pv}</div>
  <div class="ftab22">${[['pc','PHI CÔNG'],['av','AVATAR'],['base','KHUNG AVATAR'],['lim','KHUNG GIỚI HẠN']].map(([k,n])=>`<button type="button" data-fr="t:${k}" aria-pressed="${frTab===k}">${n}</button>`).join('')}</div>
  <div class="frb22">${frCards()}</div>${frDetail()}</div>`;}
 function frOpen(){let el=document.getElementById('fr22');if(!el){el=document.createElement('div');el.id='fr22';el.className='m22';document.body.appendChild(el);
   el.addEventListener('click',e=>{const b=e.target.closest('[data-fr]');if(!b){if(e.target===el)frClose();return;}const k=b.dataset.fr;const v=k.slice(k.indexOf(':')+1);
    if(k==='x')frClose();else if(k.startsWith('t:')){frTab=v;frPick=null;}
    else if(k.startsWith('f:'))frPick=v;else if(k.startsWith('a:'))frPick=+v;
    else if(k.startsWith('u:')){S.fr=v;save();T('ĐÃ ĐEO KHUNG '+frOf(v).n.toUpperCase());}
    else if(k.startsWith('ua:')){S.av=+v;save();T('ĐÃ ĐỔI CHÂN DUNG');}
    else if(k.startsWith('m:')){const f=frOf(v);if(ready(f)){S.unl[f.id]=1;save();T('MỞ KHÓA KHUNG '+f.n.toUpperCase());}}
    else if(k==='o8'){frClose();hsClose();try{L8309.open();}catch{}return;}
    else if(k==='pl'){frClose();hsClose();try{Pilot67.open();}catch{}return;}
    paintFr();paintHs();lobby();});}
  frPick=null;paintFr();el.hidden=false;document.documentElement.classList.add('m22on');}
 function paintFr(){const el=document.getElementById('fr22');if(el)el.innerHTML=frHtml();}
 function frClose(){const el=document.getElementById('fr22');if(el)el.hidden=true;if(!document.querySelector('.m22:not([hidden])'))document.documentElement.classList.remove('m22on');}
 // tự mở khóa khung khi đạt điều kiện (giữ mãi)
 function autoUnlock(){let ch=false;for(const f of FR)if(f.need&&!S.unl[f.id]&&g(()=>!!f.need(),false)){S.unl[f.id]=1;ch=true;if(f.k==='lim')T('KHUNG GIỚI HẠN MỚI · '+f.n.toUpperCase());}if(ch)save();}
 // ---------------- SẢNH ----------------
 function lobby(){if(!on('V22LOBBY'))return;const sk=document.querySelector('#hgr41 .h1-stage .sk307');
  if(sk&&!sk.querySelector('.du22')){const d=document.createElement('div');d.className='du22';let s='';for(let i=0;i<14;i++){const x=(i*37+11)%100,y=20+(i*53)%70,dl=-(i*.83).toFixed(2),du=(7+(i%5)*1.6).toFixed(1),sz=1+(i%3);s+=`<i style="left:${x}%;top:${y}%;--sz:${sz}px;animation-delay:${dl}s;animation-duration:${du}s"></i>`;}d.innerHTML=s;sk.appendChild(d);
   const r=document.createElement('div');r.className='rg22';r.innerHTML='<i></i><i class="b"></i>';sk.appendChild(r);}
  // khung avatar ở thẻ phi công
  const pp=document.getElementById('lb68-pp');if(pp){const f=frOf(S.fr);pp.dataset.fr22=f.id;let fi=pp.querySelector('.fi22');if(f.img&&I(f.img)){if(!fi){fi=document.createElement('i');fi.className='fi22';pp.appendChild(fi);}const u=`url(${I(f.img)})`;if(fi.style.backgroundImage!==u)fi.style.backgroundImage=u;}else fi?.remove();
   const im=pp.querySelector('img'),want=S.av&&ownP(S.av)?pilotImg(S.av):'';if(im&&want&&im.getAttribute('src')!==want)im.src=want;}
  const nm=document.getElementById('lb68-pnm');if(nm&&S.name){const v=S.name.toUpperCase();if(nm.textContent!==v)nm.textContent=v;}}
 document.addEventListener('click',e=>{if(!on('V22HS'))return;const t=e.target.closest('#lb68-pp,#lb68 .lb68-pn');if(!t)return;e.preventDefault();e.stopPropagation();hsOpen();},true);
 // ---------------- TIẾN BẬC THÀNH CÔNG (VKTT) ----------------
 let lastR=null;
 function asWatch(){const u=document.querySelector('.u72');if(!u||u.hidden||getComputedStyle(u).display==='none'){lastR=null;return;}let st;try{st=Ult72.state();}catch{return;}
  const now={};for(const k in st.w)now[k]=st.w[k].r|0;if(lastR)for(const k in now)if(st.w[k].own&&now[k]>(lastR[k]|0)){asShow(k,lastR[k]|0,now[k]);break;}lastR=now;}
 function asShow(id,r0,r1){if(!on('V22HS'))return;const C=window.ULT72||(typeof Ult72!=='undefined'&&Ult72.C)||{};/* ULT72 là const, không có trên window */let tx={};try{tx=Ult72.skillText(id,r1)||{};}catch{}
  const col=C.fcol?C.fcol[C.rf[r1]]:'#ffd23f',nm=(C.nm&&C.nm[id])||id,st=g(()=>Ult72.state().w[id],{lv:1});
  let el=document.getElementById('as22');if(!el){el=document.createElement('div');el.id='as22';el.className='m22';document.body.appendChild(el);el.addEventListener('click',e=>{if(!e.target.closest('.as22b')||e.target.closest('[data-as=x]')){el.hidden=true;if(!document.querySelector('.m22:not([hidden])'))document.documentElement.classList.remove('m22on');}});}
  const cell=(n,a,b)=>`<div><small>${n}</small><b>${esc(a)}${b!=null?` <i>→</i> <em>${esc(b)}</em>`:''}</b></div>`;
  el.innerHTML=`<div class="as22b" style="--vc:${col}"><div class="wm22">${esc(nm.toUpperCase())}</div><div class="ash22">TIẾN BẬC THÀNH CÔNG</div>
   <div class="asi22"><img src="${vkImg(id,r1)}" alt=""></div><div class="asn22"><b>${esc(nm)}</b><span>${esc((C.rn&&C.rn[r0])||'')} → <em>${esc((C.rn&&C.rn[r1])||'')}</em></span></div>
   <div class="asg22">${cell('BẬC',(C.rn&&C.rn[r0])||'',(C.rn&&C.rn[r1])||'')}${cell('CẤP TỐI ĐA',C.cap?C.cap[r0]:'',C.cap?C.cap[r1]:'')}${cell('CẤP HIỆN TẠI','Lv.'+(st.lv|0))}${cell('DẠNG TRANH','Dạng '+form(r0),form(r1)!==form(r0)?'Dạng '+form(r1):null)}</div>
   <div class="asc22"><div><small>KÍCH HOẠT THƯỜNG</small><p>${tx.base||''}</p></div><div class="od"><small>QUÁ TẢI · TỐI THƯỢNG</small><p>${tx.ult||''}</p></div></div>
   <button type="button" class="tl22" data-as="x">TIẾP TỤC</button><small class="as22h">Chạm ra ngoài để đóng</small></div>`;
  el.hidden=false;document.documentElement.classList.add('m22on');}
 // ---------------- CSS ----------------
 const NOT=':not(#_v22)'.repeat(90),P='html.v22 body'+NOT+' ';
 const CHAM='polygon(12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px),0 12px)';
 const MOD=`background:linear-gradient(180deg,#0a1e42 0,#0a1e42 44px,#2496ff 44px,#2496ff 45px,transparent 45px) padding-box,repeating-linear-gradient(0deg,rgba(36,150,255,.05) 0 1px,transparent 1px 24px) padding-box,linear-gradient(180deg,#071634,#040d21) padding-box,linear-gradient(180deg,#2a6bb0,#164e87 40%,#0e3864) border-box!important;border:3px solid transparent!important;border-image:none!important;border-radius:0!important;clip-path:${CHAM}!important;box-shadow:inset 0 0 0 1px #2496ff,inset 0 0 0 3px rgba(4,13,33,.6)!important`;
 const css=`
/* ---- SẢNH ---- */
${P}#hgr41 .h1-stage .sk307{background:url(${I('hangar_bg')}) 50% 100%/cover no-repeat,linear-gradient(180deg,#040d21,#0a1e42)!important}
${P}#hgr41 .l74-rays{display:none!important}
${P}#hgr41 .du22{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0}
${P}#hgr41 .du22 i{position:absolute;width:var(--sz);height:var(--sz);border-radius:50%;background:#bfe6ff;opacity:0;animation:du22 8s linear infinite;will-change:transform,opacity}
@keyframes du22{0%{transform:translate3d(0,30px,0);opacity:0}20%{opacity:.55}80%{opacity:.4}100%{transform:translate3d(8px,-60px,0);opacity:0}}
${P}#hgr41 .rg22{position:absolute;left:50%;top:71%;width:68%;aspect-ratio:1;transform:translate(-50%,-50%) scaleY(.26);pointer-events:none;z-index:0}
${P}#hgr41 .rg22 i{position:absolute;inset:0;border-radius:50%;border:2px dashed rgba(36,150,255,.55);animation:rg22 14s linear infinite}
${P}#hgr41 .rg22 i.b{inset:9%;border:1px solid rgba(125,211,252,.35);border-top-color:rgba(255,214,120,.7);animation-duration:9s;animation-direction:reverse}
@keyframes rg22{to{transform:rotate(360deg)}}
${P}#lb68-pp{position:relative;overflow:visible!important}
${P}#lb68-pp .fi22{position:absolute;inset:-26%;background:center/contain no-repeat;pointer-events:none}
${P}#lb68 .lb68-pn{cursor:pointer}
/* ---- KHUNG HỘP THOẠI VIỀN KÉP ---- */
html.v22.v22m body${NOT} .m63 > .m63-card::before{${MOD}}
html.v22.v22m body${NOT} :is(#nav74p .n74pc,#m40 .mm,.e74p .e74c,#k307 .k307-in,#cd9 .cd9c,#ch10 .ch10c,#cp9 .cp9c){${MOD}}
html.v22.v22m body${NOT} :is(.m63 .m63-x,#k307 [data-k="x"],#hub9 .h9x,#m40 .mm > .x){width:36px!important;height:36px!important;border:0!important;border-radius:0!important;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)!important;background:linear-gradient(180deg,#2a6bb0,#164e87)!important;box-shadow:inset 0 0 0 1px #2496ff!important;color:#eaf4ff!important}
/* ---- KHO 2 TẦNG ---- */
${P}#hub40 .hb-doll.d9.k22{grid-template-rows:minmax(0,1fr) 34px 26px 38px 96px!important}
${P}#hub40 .k22 .stg9{grid-row:1!important;height:auto!important}
${P}#hub40 .k22 .tb22{grid-row:2!important;grid-column:1/-1!important}
${P}#hub40 .k22 .cb9{grid-row:3!important}
${P}#hub40 .k22 .c9sc{grid-row:4!important}
${P}#hub40 .k22 .hb-slot{grid-row:5!important}
${P}#hub40 .k22 .vkw22{grid-row:3/span 3!important;grid-column:1/-1!important;align-self:center}
${P}#hub40 .k22 .kh42{display:grid!important;grid-template-columns:1fr auto;grid-template-rows:auto auto;align-items:start;gap:2px 6px}
${P}#hub40 .k22 .kh42 .r42{grid-column:1;grid-row:1;justify-self:start}
${P}#hub40 .k22 .kh42 .l42{grid-column:1;grid-row:2}
${P}#hub40 .k22 .kh42 :is(.r42,.cp42){width:auto!important;min-width:0!important;white-space:nowrap}
${P}#hub40 .k22 .kh42 .cp42{background:none!important;border:0!important;box-shadow:none!important;padding:0!important;text-align:left!important;clip-path:none!important}
${P}#hub40 .k22 .kh42 .cp42 :is(small,b){display:block!important;text-align:left!important;width:auto!important;margin:0!important;transform:none!important}
${P}#hub40 .k22 .kh42 .cp42 small{color:#ffe08a!important;font:800 9px/1 inherit!important;letter-spacing:.14em}
${P}#hub40 .k22 .kh42 .cp42 b{font:900 24px/1.05 inherit!important;background:linear-gradient(180deg,#fff6c4,#ffd23f 50%,#e0900c);-webkit-background-clip:text;background-clip:text;color:transparent!important}
${P}#hub40 .k22 .kh42 .c9tp,${P}#hub40 .k22 .kh42 .bk22{grid-column:2;position:static!important;height:28px;min-width:104px;padding:0 10px;border:0;clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px);font:800 11px/1 inherit;color:#eaf4ff;cursor:pointer}
${P}#hub40 .k22 .kh42 .c9tp{grid-row:1;background:linear-gradient(180deg,#7ff5e6,#18b4aa 45%,#0c827d)!important;color:#03231f!important}
${P}#hub40 .k22 .kh42 .bk22{grid-row:2;background:linear-gradient(180deg,#6f97d2,#3561a8 45%,#1f437f)!important}
${P}#hub40 .k22 .st42{display:none!important}
${P}#hub40 .k22 .st22{position:absolute;left:8px;right:8px;bottom:6px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;z-index:2}
${P}#hub40 .k22 .st22 span{display:flex;flex-direction:column;align-items:center;padding:4px 0;background:linear-gradient(180deg,rgba(10,30,66,.92),rgba(4,13,33,.92));box-shadow:inset 0 0 0 1px #2496ff;clip-path:polygon(6px 0,calc(100% - 6px) 0,100% 6px,100% 100%,0 100%,0 6px)}
${P}#hub40 .k22 .st22 small{font:700 9px/1 inherit;color:#9fd2ff;letter-spacing:.12em}
${P}#hub40 .k22 .st22 b{font:900 15px/1.2 inherit;color:#fff}
${P}#hub40 .k22 .tb22{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:2px 0}
${P}#hub40 .k22 .tb22 button{height:30px;border:0;background:linear-gradient(180deg,#14305e,#0a1e42);box-shadow:inset 0 0 0 1px #164e87;color:#9fb8d8;font:800 11px/1 inherit;letter-spacing:.08em;clip-path:polygon(8px 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%,0 8px)}
${P}#hub40 .k22 .tb22 button[aria-pressed="true"]{background:linear-gradient(180deg,#2a6bb0,#164e87);box-shadow:inset 0 0 0 1px #2496ff,inset 0 -3px 0 #ffd23f;color:#fff}
${P}#hub40 .k22.tb22B :is(.hb-slot,.c9sc,.cb9){display:none!important}
${P}#hub40 .k22:not(.tb22B) .vkw22{display:none!important}
${P}#hub40 .k22 .vkw22{grid-column:1/-1;width:100%}
/* thẻ trang bị arcade: nền theo độ hiếm, huy hiệu cánh vàng, +N giữa đáy, thanh ngọc */
${P}#hub40 .k22 .hb-slot.c22{position:relative;overflow:visible}
${P}#hub40 .k22 .hb-slot.c22::before{content:"";position:absolute;inset:5px;z-index:0;clip-path:polygon(8px 0,calc(100% - 8px) 0,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0 calc(100% - 8px),0 8px);background:var(--rf22)}
${P}#hub40 .k22 .hb-slot.c22 > *{position:relative;z-index:1}
${P}#hub40 .k22 .hb-slot.c22 > i.f17x{position:absolute!important;z-index:2}
${P}#hub40 .k22 .r22-tr{--rf22:linear-gradient(160deg,#5c6b7d,#2a3442)}
${P}#hub40 .k22 .r22-luc{--rf22:linear-gradient(160deg,#1f9d63,#0b3d2a)}
${P}#hub40 .k22 .r22-lam{--rf22:linear-gradient(160deg,#2a7fe0,#0c2c5e)}
${P}#hub40 .k22 .r22-tim{--rf22:linear-gradient(160deg,#9b4dff,#341166)}
${P}#hub40 .k22 .r22-tim5{--rf22:linear-gradient(160deg,#d946ef,#4a0f5c)}
${P}#hub40 .k22 .r22-ss{--rf22:linear-gradient(160deg,#ffb733,#6b3300)}
${P}#hub40 .k22 .hb-slot .cr22{position:absolute!important;left:-4px;top:-6px;width:30px;height:20px;z-index:4!important;pointer-events:none}
${P}#hub40 .k22 .hb-slot .cr22 svg{width:100%;height:100%;display:block}
${P}#hub40 .k22 .hb-slot .pl22{position:absolute!important;left:50%;bottom:9px;transform:translateX(-50%);z-index:4!important;padding:1px 7px;font:900 10px/1.25 inherit;font-style:normal;color:#2b1300;background:linear-gradient(180deg,#fff3c4,#f8c95a 45%,#dc951c);clip-path:polygon(5px 0,calc(100% - 5px) 0,100% 50%,calc(100% - 5px) 100%,5px 100%,0 50%)}
${P}#hub40 .k22 .hb-slot small{z-index:3!important;position:absolute!important;left:0;right:0;top:7px;bottom:auto!important;text-align:center;font-size:9px!important;background:none!important}
${P}#hub40 .k22 .hb-slot .h22{display:none!important}
${P}#hub40 .k22 .hb-slot .gm22{position:absolute!important;left:12%;right:12%;bottom:-5px;display:flex;gap:2px;z-index:4!important}
${P}#hub40 .k22 .hb-slot .gm22 i{flex:1;height:4px;clip-path:polygon(2px 0,100% 0,calc(100% - 2px) 100%,0 100%)}
${P}#hub40 .k22 .hb-slot .gm22 .gf{background:var(--gc)}
${P}#hub40 .k22 .hb-slot .gm22 .ge{background:rgba(159,210,255,.28)}
${P}#hub40 .k22 .hb-slot .gm22 .gx{background:rgba(0,0,0,.55)}
${P}#hub40 .k22 .hb-slot .bd42.dot{display:none!important}
/* 3 ô VKTT: lục giác – tròn – lục giác */
${P} .vkr22{display:grid;grid-template-columns:1fr 1.15fr 1fr;gap:8px;align-items:end;padding:6px 10px 2px}
${P} .vk22{display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:0;color:#cfe6ff;cursor:pointer;min-width:0}
${P} .vk22 .vb{width:72px;aspect-ratio:1;display:grid;place-items:center;background:radial-gradient(circle at 50% 40%,color-mix(in srgb,var(--vc,#2496ff) 45%,#0a1e42),#040d21 72%);box-shadow:inset 0 0 0 2px var(--vc,#2496ff)}
${P} .vk22.ci .vb{width:84px;border-radius:50%;box-shadow:inset 0 0 0 3px var(--vc,#ffd23f),0 0 0 2px rgba(255,210,63,.35)}
${P} .vk22.hx .vb{clip-path:polygon(25% 2%,75% 2%,99% 50%,75% 98%,25% 98%,1% 50%)}
${P} .vk22 .vb img{width:86%;height:86%;object-fit:contain}
${P} .vk22 small{font:800 9.5px/1.15 inherit;text-align:center;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
${P} .vk22 em{font:700 9px/1 inherit;font-style:normal;color:var(--vc,#9fd2ff)}
${P} .vk22.lk,${P} .vk22.em{opacity:.75}
${P} .lock22{width:22px;height:22px;display:block;background:center/contain no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 10V7a6 6 0 0 1 12 0v3h1v12H5V10zm2 0h8V7a4 4 0 0 0-8 0z' fill='%23cbd5e1'/%3E%3C/svg%3E")}
${P} .plus22{font:900 28px/1 inherit;font-style:normal;color:#7fc8ff}
${P} .vgo22{display:block;margin:6px auto 0;height:30px;padding:0 16px;border:0;background:linear-gradient(180deg,#6f97d2,#3561a8 45%,#1f437f);color:#fff;font:800 11px/1 inherit;clip-path:polygon(8px 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%,0 8px);cursor:pointer}
/* ---- HỒ SƠ + KHUNG (hộp riêng V2.2) ---- */
${P}.m22{position:fixed;inset:0;z-index:2147483300;display:flex;align-items:center;justify-content:center;background:rgba(2,6,16,.78);padding:calc(var(--sat42,var(--safe-top,0px)) + 10px) 10px calc(var(--sab42,var(--safe-bottom,0px)) + 10px)}
${P}.m22[hidden]{display:none!important}
${P}.m22 .hs22b{position:relative;width:min(100%,430px);max-height:100%;overflow:auto;padding:0 12px 14px;color:#e5f3ff;${MOD.replace(/!important/g,'')};background:linear-gradient(180deg,#0a1e42 0,#0a1e42 44px,#2496ff 44px,#2496ff 45px,transparent 45px) padding-box,radial-gradient(1px 1px at 12% 28%,#fff9 50%,transparent 51%) padding-box,radial-gradient(1px 1px at 78% 18%,#fff8 50%,transparent 51%) padding-box,radial-gradient(1.5px 1.5px at 40% 70%,#bfe9ff99 50%,transparent 51%) padding-box,radial-gradient(ellipse at 50% 20%,#123a78,#040d21 70%) padding-box,linear-gradient(180deg,#2a6bb0,#164e87 40%,#0e3864) border-box}
${P}.m22 .hd22{display:flex;align-items:center;justify-content:space-between;height:45px;margin:0 -12px 10px;padding:0 6px 0 14px}
${P}.m22 .hd22 b{font:900 15px/1 inherit;letter-spacing:.12em;color:#fff}
${P}.m22 .x22{width:36px;height:36px;border:0;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px);background:linear-gradient(180deg,#2a6bb0,#164e87);box-shadow:inset 0 0 0 1px #2496ff;color:#fff;font:900 16px/1 inherit;cursor:pointer}
${P}.av22{position:relative;display:inline-grid;place-items:center;width:var(--s);height:var(--s);flex:none}
${P}.av22 > img,${P}.av22 > b{width:76%;height:76%;object-fit:cover;border-radius:12%;background:linear-gradient(160deg,var(--pc),#0a1e42);display:grid;place-items:center;font:900 calc(var(--s)*.35)/1 inherit;color:#fff}
${P}.av22 .fi22{position:absolute;inset:-6%;background:center/contain no-repeat;pointer-events:none}
${P}.av22.fr22-steel > :is(img,b){box-shadow:0 0 0 3px #4f8fd6,0 0 0 5px #0e2a52}
${P}.av22.fr22-royal > :is(img,b){box-shadow:0 0 0 3px #ffd23f,0 0 0 5px #6b3c00}
${P}.tt22{display:flex;justify-content:center;margin-bottom:6px}
${P}.tt22 span{padding:4px 22px;font:900 11px/1 inherit;letter-spacing:.16em;color:#2b1300;background:linear-gradient(180deg,#fff3c4,#f8c95a 45%,#dc951c);clip-path:polygon(10px 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,10px 100%,0 50%)}
${P}.hs22row{display:flex;gap:12px;align-items:center}
${P}.hsav{position:relative;padding:0;border:0;background:none;cursor:pointer}
${P}.rk22{position:absolute;right:-2px;bottom:-2px;width:22px;height:22px;transform:rotate(45deg);background:linear-gradient(135deg,#fff,var(--rc) 45%,#111 120%);box-shadow:0 0 0 2px #040d21}
${P}.hs22inf{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}
${P}.nm22{display:flex;gap:4px}
${P}.nm22 input{flex:1;min-width:0;height:30px;padding:0 8px;border:0;background:rgba(4,13,33,.8);box-shadow:inset 0 0 0 1px #164e87;color:#fff;font:900 16px/1 inherit}
${P}.nm22 button,${P}.uid22 button{width:30px;height:30px;border:0;background:linear-gradient(180deg,#2a6bb0,#164e87);color:#fff;font:900 14px/1 inherit;cursor:pointer;clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)}
${P}.uid22{display:flex;align-items:center;gap:6px;font:700 11px/1 inherit;color:#9fb8d8}
${P}.uid22 b{color:#e5f3ff;letter-spacing:.08em}
${P}.uid22 button{width:24px;height:22px;font-size:12px}
${P}.rkn22{font:900 11px/1 inherit;letter-spacing:.12em;color:var(--rc)}
${P}.cp22 small{display:block;font:800 9px/1 inherit;letter-spacing:.14em;color:#ffe08a}
${P}.cp22 b{font:900 24px/1.05 inherit;background:linear-gradient(180deg,#fff6c4,#ffd23f 50%,#e0900c);-webkit-background-clip:text;background-clip:text;color:transparent}
${P}.fbt22{display:block;width:100%;margin:10px 0 0;height:34px;border:0;background:linear-gradient(180deg,#7ff5e6,#18b4aa 45%,#0c827d);color:#03231f;font:900 12px/1 inherit;letter-spacing:.06em;clip-path:polygon(9px 0,calc(100% - 9px) 0,100% 9px,100% calc(100% - 9px),calc(100% - 9px) 100%,9px 100%,0 calc(100% - 9px),0 9px);cursor:pointer}
${P}:is(.hstab22,.ftab22){display:flex;gap:4px;margin:12px 0 8px}
${P}:is(.hstab22,.ftab22) button{flex:1;height:32px;border:0;background:linear-gradient(180deg,#14305e,#0a1e42);box-shadow:inset 0 0 0 1px #164e87;color:#9fb8d8;font:800 10.5px/1.1 inherit;letter-spacing:.04em;cursor:pointer}
${P}:is(.hstab22,.ftab22) button[aria-pressed="true"]{background:linear-gradient(180deg,#2a6bb0,#164e87);box-shadow:inset 0 0 0 1px #2496ff,inset 0 -3px 0 #ffd23f;color:#fff}
${P}.hg22{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
${P}.hgc{display:flex;flex-direction:column;align-items:center;gap:3px}
${P}.hgi{width:100%;aspect-ratio:1;display:grid;place-items:center;background:linear-gradient(160deg,#173f7a,#071634);box-shadow:inset 0 0 0 1px #2496ff;clip-path:polygon(7px 0,calc(100% - 7px) 0,100% 7px,100% calc(100% - 7px),calc(100% - 7px) 100%,7px 100%,0 calc(100% - 7px),0 7px);overflow:hidden}
${P}.hgi img{width:88%;height:88%;object-fit:contain}
${P}.hgi > span{max-width:90%;max-height:90%}
${P}.hgc small{font:800 9px/1 inherit;color:#9fd2ff;letter-spacing:.08em}
${P}.ctg22{display:grid;grid-template-columns:1fr 1fr;gap:6px}
${P}.ct22{display:flex;align-items:center;gap:8px;padding:6px 8px;background:linear-gradient(180deg,rgba(18,48,96,.85),rgba(4,13,33,.85));box-shadow:inset 0 0 0 1px #164e87;clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)}
${P}.ct22 img{width:30px;height:30px;object-fit:contain}
${P}.ct22 small{display:block;font:700 8.5px/1.1 inherit;color:#9fb8d8;letter-spacing:.08em}
${P}.ct22 b{font:900 14px/1.2 inherit;color:#fff}
${P}.rd22{position:relative;height:170px;display:grid;place-items:center;margin:0 -12px;background:radial-gradient(circle at 50% 50%,rgba(36,150,255,.22),transparent 60%);overflow:hidden}
${P}.rd22 .rr1,${P}.rd22 .rr2{position:absolute;width:150px;height:150px;border-radius:50%;border:1px dashed rgba(36,150,255,.6);animation:rg22 12s linear infinite}
${P}.rd22 .rr2{width:118px;height:118px;border:2px solid transparent;border-top-color:rgba(255,214,120,.8);border-bottom-color:rgba(125,211,252,.6);animation-duration:5s;animation-direction:reverse}
${P}.rd22 .pt{position:absolute;width:150px;height:150px;animation:rg22 4s linear infinite}
${P}.rd22 .pt::before{content:"";position:absolute;left:50%;top:-2px;width:5px;height:5px;border-radius:50%;background:#bfe6ff}
${P}.rd22 .p2{animation-duration:6.5s;transform:rotate(120deg)}
${P}.rd22 .p3{width:118px;height:118px;animation-duration:3s;animation-direction:reverse}
${P}.gr22{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
${P}.cd22{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 4px 6px;border:0;background:linear-gradient(180deg,rgba(18,48,96,.8),rgba(4,13,33,.9));box-shadow:inset 0 0 0 1px #164e87;color:#cfe6ff;cursor:pointer;clip-path:polygon(7px 0,calc(100% - 7px) 0,100% 7px,100% calc(100% - 7px),calc(100% - 7px) 100%,7px 100%,0 calc(100% - 7px),0 7px)}
${P}.cd22.on{box-shadow:inset 0 0 0 2px #ffd23f,inset 0 0 12px rgba(255,210,63,.35)}
${P}.cd22.lk > .av22{opacity:.45}
${P}.cd22.rd{box-shadow:inset 0 0 0 2px #18b4aa}
${P}.cd22 small{font:800 9.5px/1.15 inherit;text-align:center}
${P}.cd22 em{position:absolute;top:4px;right:4px;padding:1px 4px;font:900 7.5px/1.3 inherit;font-style:normal;background:#18b4aa;color:#03231f}
${P}.cd22 .lock22{position:absolute;top:6px;left:6px;width:16px;height:16px}
${P}.dt22{display:flex;flex-direction:column;gap:4px;align-items:center;margin-top:10px;padding:10px;background:rgba(4,13,33,.7);box-shadow:inset 0 0 0 1px #164e87;text-align:center}
${P}.dt22 b{font:900 15px/1.2 inherit;color:#fff}
${P}.dt22 small{font:600 11px/1.35 inherit;color:#9fb8d8}
${P}.dt22 .bn22 i{font-style:normal;color:#7ff5e6;font-weight:800}
${P}.dt22 .cd{color:#ffb35c}
${P}.tl22{margin-top:6px;min-width:150px;height:36px;padding:0 18px;border:0;background:linear-gradient(180deg,#7ff5e6,#18b4aa 45%,#0c827d);color:#03231f;font:900 13px/1 inherit;letter-spacing:.08em;clip-path:polygon(9px 0,calc(100% - 9px) 0,100% 9px,100% calc(100% - 9px),calc(100% - 9px) 100%,9px 100%,0 calc(100% - 9px),0 9px);cursor:pointer}
${P}.tl22.dis{filter:saturate(.3) brightness(.7);cursor:default}
${P}.st22b{margin-top:6px;min-width:150px;height:34px;border:0;background:linear-gradient(180deg,#6f97d2,#3561a8 45%,#1f437f);color:#fff;font:800 12px/1 inherit;clip-path:polygon(9px 0,calc(100% - 9px) 0,100% 9px,100% calc(100% - 9px),calc(100% - 9px) 100%,9px 100%,0 calc(100% - 9px),0 9px);cursor:pointer}
${P}.pc22{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;text-align:center}
${P}.pc22 p{margin:0;font:600 12px/1.4 inherit;color:#9fb8d8}
${P}#as22{z-index:2147483400}
${P}.as22b{position:relative;width:min(100%,410px);padding:18px 14px 14px;text-align:center;color:#e5f3ff;overflow:hidden;${MOD.replace(/!important/g,'')};background:radial-gradient(ellipse at 50% 30%,color-mix(in srgb,var(--vc) 35%,#0a1e42),#040d21 70%) padding-box,linear-gradient(180deg,#2a6bb0,#164e87 40%,#0e3864) border-box}
${P}.wm22{position:absolute;left:-10%;right:-10%;top:42px;font:900 54px/1 inherit;letter-spacing:.06em;color:rgba(255,255,255,.06);white-space:nowrap;pointer-events:none}
${P}.ash22{position:relative;display:inline-block;padding:6px 26px;font:900 16px/1 inherit;letter-spacing:.14em;color:#2b1300;background:linear-gradient(180deg,#fff3c4,#f8c95a 45%,#dc951c);clip-path:polygon(12px 0,calc(100% - 12px) 0,100% 50%,calc(100% - 12px) 100%,12px 100%,0 50%)}
${P}.asi22{position:relative;width:150px;height:150px;margin:8px auto 2px;display:grid;place-items:center;background:radial-gradient(circle,color-mix(in srgb,var(--vc) 40%,transparent),transparent 65%)}
${P}.asi22 img{width:92%;height:92%;object-fit:contain}
${P}.asn22 b{display:block;font:900 17px/1.2 inherit;color:#fff}
${P}.asn22 span{font:700 12px/1.4 inherit;color:#9fb8d8}
${P}.asn22 em,${P}.asg22 em{font-style:normal;color:var(--vc)}
${P}.asg22{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:10px 0}
${P}.asg22 > div{padding:6px;background:rgba(4,13,33,.75);box-shadow:inset 0 0 0 1px #164e87}
${P}.asg22 small{display:block;font:800 9px/1 inherit;letter-spacing:.12em;color:#9fd2ff}
${P}.asg22 b{font:900 12.5px/1.5 inherit;color:#fff}
${P}.asg22 i{font-style:normal;color:#ffd23f}
${P}.asc22{display:grid;grid-template-columns:1fr 1fr;gap:6px;text-align:left}
${P}.asc22 > div{padding:8px;background:linear-gradient(180deg,rgba(18,48,96,.85),rgba(4,13,33,.9));box-shadow:inset 0 0 0 1px #2496ff}
${P}.asc22 > .od{box-shadow:inset 0 0 0 1px #ffd23f}
${P}.asc22 small{display:block;font:900 9.5px/1.2 inherit;letter-spacing:.1em;color:#7ff5e6}
${P}.asc22 .od small{color:#ffd23f}
${P}.asc22 p{margin:4px 0 0;font:600 10.5px/1.4 inherit;color:#cfe6ff}
${P}.as22h{display:block;margin-top:6px;font:600 10px/1 inherit;color:#7f93ad}`;
 function init(){if(!on())return;const h=document.documentElement;h.classList.add('v22');if(on('V22MODAL'))h.classList.add('v22m');
  const st=document.createElement('style');st.id='v22-css';st.textContent=css;document.head.appendChild(st);
  hookBonus();setTimeout(hookBonus,1500);
  setInterval(()=>{try{lobby();}catch{}try{kho();}catch{}},350);
  setInterval(()=>{try{autoUnlock();}catch{}},4000);
  setInterval(()=>{try{asWatch();}catch{}},500);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 return {asShow,S,ST,FR,hsOpen,frOpen,hsClose,frClose,kho,lobby,bonus:curB,_save:save};
})();
window.V22UI=V22;
