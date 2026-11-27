'use strict';
// V2.3 U4 (v23-ui-meta): BỆ TRƯNG BÀY 3D cho Vũ Khí Tối Thượng + MÔ-ĐUN SIÊU DUY.
//  Chủ dự án chọn 27/11: "Khoác áo Chip thành Mô-đun" — MÔ-ĐUN SIÊU DUY là giao diện mới của CHIP GIAO THỨC (Chip72) có sẵn:
//  cùng 6 ô / VKTT (Hỏa lực ×2 · Cấu trúc ×2 · Liên kết ×2), cùng chỉ số, trần (+6 %/chỉ số, module +18 %), giá sản xuất / nâng cấp / phân giải.
//  0 chỉ số mới, 0 nguồn tài nguyên mới (trừ 3 chip Lục khởi đầu nhận 1 lần), không chạm hệ số điểm Vô tận (multiplier()).
//  Màn chip cũ (Luyện / Tái tạo / Ghép / Tẩy) vẫn mở được bằng nút NÂNG CAO.
//  Lưu riêng: saobang-u4-v1 {gift}. Tắt toàn bộ: window.U4V23=false.
const U4V23M=(()=>{
 const on=()=>window.U4V23!==false;
 const KEY='saobang-u4-v1';let G={gift:0};try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o)G=Object.assign(G,o);}catch{}
 const saveG=()=>{try{localStorage.setItem(KEY,JSON.stringify(G));}catch{}};
 const fmt=n=>Number(n).toLocaleString('vi-VN');const pc=v=>(v*100).toFixed(1).replace('.',',').replace(/,0$/,'')+'%';
 const T=s=>{try{toast(s);}catch{}};
 const CH=()=>typeof Chip72!=='undefined'?Chip72:null;
 const CC=()=>(CH()||{}).C||{};
 const FR=q=>q<=0?'f0':q===1?'f1':q<=3?'f2':'f3';/* Chế thức Lục · Cải lương Lam · Nguyên mẫu (+Giao ước) Tím · Chiến lược / Giao ước CL / Tuyệt mật Cam */
 const QN=['Lục','Lam','Tím','Cam'];
 const CO={fire:'cf',frame:'cs',link:'cl'},SN={fire:'Hỏa lực',frame:'Cấu trúc',link:'Liên kết'};
 const ST={atk:'Công',hp:'Máu',armor:'Giáp',skill:'ST kỹ năng VKTT',charge:'Tốc sạc',boss:'ST lên boss',crit:'ST chí mạng',elite:'ST tinh anh'};
 const S=()=>{try{return Chip72.state();}catch{return {ch:[],mat:{cry:0,coder:0,core:0}};}};
 const mval=(c,st)=>((CC().sh[c.sh].main[st]||0)*CC().q[c.q].k*(c.lv/50));
 const mainTxt=c=>['atk','hp','armor'].filter(st=>CC().sh[c.sh].main[st]).map(st=>ST[st]+' +'+pc(mval(c,st))).join(' · ');
 const hexHTML=(c,cls='')=>c?`<span class="u4h ${cls} ${FR(c.q)}"><i class="${CO[c.sh]}"></i><em>Lv.${c.lv}</em></span>`:`<span class="u4h ${cls} e"></span>`;
 const ART=()=>{try{return (typeof ULT72_ART!=='undefined'?ULT72_ART:window.ULT72_ART)||{};}catch{return {};}};
 const VIM={hunter:'void_greatsword',web:'solar_orbital_laser',fortress:'prism_bastion',world:'chronos_astrolabe'};/* như vktt307 */
 const vIcon=id=>{try{const I=window.VKTT307_IMG||{},r=(Ult72.state().w[id]||{}).r|0,f=r>=15?4:r>=10?3:r>=6?2:1;return (VIM[id]&&(I[VIM[id]+'_d'+f]||I[VIM[id]]))||ART()['ult_icon_'+id]||'';}catch{return '';}};

 // ================= MÔ-ĐUN SIÊU DUY =================
 let box=null,W=null,arm=-1,sel=null,tab='fire';
 const onW=w=>S().ch.filter(c=>c.eq&&c.eq.w===w);
 const slotChip=(w,i)=>S().ch.find(c=>c.eq&&c.eq.w===w&&c.eq.s===i)||null;
 function canFill(w){try{if(!Chip72.unlocked())return false;const L=S().ch,sl=CC().slots;for(let i=0;i<6;i++){if(slotChip(w,i))continue;if(L.some(c=>!c.eq&&c.sh===sl[i]))return true;}}catch{}return false;}
 function gift(){if(G.gift||!CH()||!Chip72.unlocked())return;try{for(const sh of ['fire','frame','link'])Chip72._give(Chip72.gen({q:0,sh,lv:10}));G.gift=1;saveG();T('QUÀ KHỞI ĐẦU · 3 MÔ-ĐUN LỤC (mỗi cụm 1 viên)');}catch(e){console.warn('U4 quà',e);}}
 const score=c=>c.q*1000+c.lv;
 function quickFit(w){const sl=CC().slots,used=new Set();let n=0;/* mỗi khe: mô-đun cùng loại phẩm/cấp cao nhất chưa lắp ở VKTT khác */
  for(let i=0;i<6;i++){const cur=slotChip(w,i);const cand=S().ch.filter(c=>c.sh===sl[i]&&!used.has(c.id)&&(!c.eq||c.eq.w===w)).sort((a,b)=>score(b)-score(a));
   const best=cand[0];if(!best)continue;if(cur&&score(cur)>=score(best)){used.add(cur.id);continue;}
   if(best.eq)Chip72.unequip(best.id);if(Chip72.equip(best.id,w,i)){used.add(best.id);n++;}}
  return n;}
 function quickOff(w){let n=0;for(const c of onW(w))if(Chip72.unequip(c.id))n++;return n;}
 function rates(){try{const D=CC().drop[Chip72.dropLv()];return D.q.map((v,i)=>QN[i]+' '+Math.round(v*100)+'%').join(' · ');}catch{return '';}}
 function sumTxt(w){try{const A=Chip72.agg(w);return ['atk','hp','armor','skill','charge','boss','crit','elite'].filter(k=>A[k]>0).map(k=>ST[k]+' +'+pc(A[k])).join(' · ')||'Chưa lắp mô-đun';}catch{return '';}}
 function html(){const st=S(),C=CC(),cap=C.cap||500,sl=C.slots||[];const isMain=(()=>{try{return Ult72.mainW()===W;}catch{return false;}})();
  const slot=i=>{const c=slotChip(W,i);return `<button type="button" class="u4s ${arm===i?'arm':''}" data-u4="slot" data-i="${i}" aria-label="Khe ${i+1} ${SN[sl[i]]}">${hexHTML(c)}</button>`;};
  const cl=(k,a,b,lab)=>`<div class="u4cl ${k}"><div class="u4cr">${slot(a)}${slot(b)}</div><b>${lab}</b></div>`;
  const L=st.ch.filter(c=>c.sh===tab).sort((a,b)=>(b.eq&&b.eq.w===W)-(a.eq&&a.eq.w===W)||score(b)-score(a)).slice(0,60);
  const sc=sel?st.ch.find(c=>c.id===sel):null;const up=sc&&sc.lv<50?C.up[sc.lv/10-1]:null;
  const nG=st.ch.filter(c=>c.q===0&&!c.eq&&!c.lock).length;
  const dCry=st.dday!==(Math.floor((Date.now()+7*3600000)/86400000))?C.prod.daily:C.prod.cry;
  return `<div class="u4c"><div class="u4hd"><b>MÔ-ĐUN SIÊU DUY</b><button type="button" class="u4x" data-u4="x" aria-label="Đóng">×</button></div>
  <p class="u4w">${esc(name(W))}${isMain?' · <span class="ok">CHỦ CHIẾN</span>':' · <span class="no">chỉ có tác dụng khi là CHỦ CHIẾN</span>'}</p>
  <div class="u4hx">${cl('fire',0,1,'HỎA LỰC')}${cl('link',4,5,'LIÊN KẾT')}${cl('struct',2,3,'CẤU TRÚC')}
   <div class="u4core"><i style="background-image:url('${vIcon(W)}')"></i></div>
   <button type="button" class="u4q l u3p u3pb" data-u4="off">THÁO<br>NHANH</button><button type="button" class="u4q r u3p u3pg" data-u4="fit">LẮP<br>NHANH</button></div>
  <p class="u4sum">${sumTxt(W)}</p>
  <div class="u4tabs">${['fire','frame','link'].map(k=>`<button type="button" data-u4="tab" data-k="${k}" aria-pressed="${k===tab}">${SN[k]}</button>`).join('')}<span class="u4cap">${st.ch.length}/${cap}</span></div>
  <div class="u4g">${L.map(c=>`<button type="button" class="u4t ${c.id===sel?'on':''} ${c.eq?(c.eq.w===W?'eq':'eo'):''}" data-u4="pick" data-id="${c.id}">${hexHTML(c)}${c.eq?`<s>${c.eq.w===W?'ĐANG LẮP':'VKTT KHÁC'}</s>`:''}${c.lock?'<u>🔒</u>':''}</button>`).join('')||'<p class="u4em">Chưa có mô-đun loại này · bấm SẢN XUẤT</p>'}</div>
  <p class="u4det">${sc?`<b class="${FR(sc.q)}">${esc(C.q[sc.q].n)}${sc.set?' · '+esc(C.sets[sc.set].n):''}</b> · ${SN[sc.sh]} Lv.${sc.lv}/50 · ${mainTxt(sc)}${sc.ln&&sc.ln.length?' · '+sc.ln.map(l=>esc(Chip72.LN(l,1))).join(' · '):''}`:arm>=0?`Chọn mô-đun <b>${SN[sl[arm]]}</b> bên dưới để lắp vào khe ${arm+1}`:'Chạm khe để chọn · chạm mô-đun để xem / lắp'}</p>
  <p class="u4res">Tinh thể <b>${fmt(st.mat.cry)}</b> · Lõi chip <b>${fmt(st.mat.core)}</b> · Sản xuất ${dCry} tinh thể + ${C.prod.cr} ◈ · <span class="u4rt">Tỉ lệ: ${rates()}</span></p>
  <div class="u4bar"><button type="button" class="u3p u3pb" data-u4="sal">PHÂN GIẢI<small>${sc&&!sc.eq&&!sc.lock?'mô-đun đang chọn':'Lục thừa ×'+nG}</small></button>
   <button type="button" class="u3p u3pg" data-u4="prod">SẢN XUẤT<small>×1</small></button>
   <button type="button" class="u3p ${up?'u3pg':'u3ps'}" data-u4="up" ${up?'':'disabled'}>CẢI TẠO<small>${up?up[0]+' lõi · '+up[1]+' ◈':sc?'Lv 50':'chưa chọn'}</small></button>
   <button type="button" class="u3p u3pb" data-u4="back">VỀ<small>Vũ khí</small></button></div>
  <button type="button" class="u4adv" data-u4="adv">NÂNG CAO › Luyện · Tái tạo · Ghép · Tẩy dòng</button></div>`;}
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[m]);
 const name=w=>{try{return ULT72.nm[w];}catch{return w;}};
 function render(){if(!box||box.hidden)return;const y=(box.querySelector('.u4g')||{}).scrollTop||0;box.innerHTML=html();const g=box.querySelector('.u4g');if(g)g.scrollTop=y;}
 function open(w){if(!on()||!CH())return false;if(!Chip72.unlocked()){T('MÔ-ĐUN SIÊU DUY mở ở ải '+CC().unlock);return false;}
  W=w||(()=>{try{return Ult72.cur()||Ult72.mainW();}catch{return null;}})()||'fortress';arm=-1;sel=null;gift();
  if(!box){box=document.createElement('div');box.id='u4m';document.body.appendChild(box);box.addEventListener('click',onBox);}box.hidden=false;render();return true;}
 function close(){if(box){box.hidden=true;box.innerHTML='';}try{Ult72.render();}catch{}}
 function onBox(e){if(e.target===box){close();return;}const b=e.target.closest('[data-u4]');if(!b||b.disabled)return;const k=b.dataset.u4,sl=CC().slots;
  if(k==='x'||k==='back'){close();return;}
  if(k==='adv'){close();try{Chip72.open(W);}catch{}return;}
  if(k==='tab'){tab=b.dataset.k;sel=null;}
  else if(k==='slot'){const i=+b.dataset.i,c=slotChip(W,i);if(arm===i&&c){Chip72.unequip(c.id);T('THÁO · '+SN[sl[i]]);arm=-1;}else{arm=i;tab=sl[i];sel=c?c.id:null;}}
  else if(k==='pick'){const id=b.dataset.id,c=S().ch.find(x=>x.id===id);if(!c)return;
   if(arm>=0&&sl[arm]===c.sh&&!(c.eq&&c.eq.w===W&&c.eq.s===arm)){if(c.eq)Chip72.unequip(c.id);if(Chip72.equip(c.id,W,arm)){T('LẮP · '+SN[c.sh]+' Lv.'+c.lv+' vào khe '+(arm+1));arm=-1;}sel=c.id;}
   else sel=sel===id?null:id;}
  else if(k==='fit'){const n=quickFit(W);T(n?'LẮP NHANH · '+n+' mô-đun':'Đã lắp tốt nhất');}
  else if(k==='off'){const n=quickOff(W);T(n?'THÁO NHANH · '+n+' mô-đun':'Chưa lắp mô-đun nào');arm=-1;}
  else if(k==='prod'){const r=Chip72.produce(1);if(r&&r.length){const c=r[0];sel=c.id;tab=c.sh;T('SẢN XUẤT · '+QN[FR(c.q)[1]]+' '+SN[c.sh]+' Lv.'+c.lv);}}
  else if(k==='up'){if(sel&&Chip72.upgrade(sel)){const c=S().ch.find(x=>x.id===sel);T('CẢI TẠO · Lv.'+(c?c.lv:''));}}
  else if(k==='sal'){const st=S();const c=sel&&st.ch.find(x=>x.id===sel);let ids=[];if(c&&!c.eq&&!c.lock)ids=[c.id];else ids=st.ch.filter(x=>x.q===0&&!x.eq&&!x.lock).map(x=>x.id);
   if(!ids.length){T('Không có mô-đun thừa để phân giải (đang lắp / đã khóa giữ lại)');}else{const g=Chip72.salvage(ids);sel=null;T('PHÂN GIẢI '+g.n+' mô-đun · +'+g.cry+' tinh thể'+(g.core?' · +'+g.core+' lõi':''));}}
  render();}

 // ================= BỆ TRƯNG BÀY 3D (màn VKTT showroom của Ult72) =================
 function deco(){const sr=document.querySelector('.u72.srm .sr');if(!sr||sr.dataset.u4)return;sr.dataset.u4=1;sr.classList.add('u4sr');
  let st={},cur=null,w=null,C={};try{st=Ult72.state();cur=Ult72.cur();C=Ult72.C;w=st.w[cur];}catch{}
  // dải chọn VKTT đã có + ô tóm tắt chỉ số
  const own=(C.ids||[]).filter(id=>st.w&&st.w[id]&&st.w[id].own);
  const strip=document.createElement('div');strip.className='u4sel';
  strip.innerHTML=`<button type="button" class="u4n" data-a="nav" data-v="-1" aria-label="Trước">‹</button><div class="u4ow">${own.map(id=>`<button type="button" class="${id===cur?'on':''} ${id===st.main?'mn':''}" data-a="sel" data-v="${id}" aria-label="${esc(C.nm[id])}"><i style="background-image:url('${vIcon(id)}')"></i></button>`).join('')}</div><button type="button" class="u4n" data-a="nav" data-v="1" aria-label="Sau">›</button>`;
  const top=sr.querySelector('.sr-top');if(top)top.after(strip);
  if(w&&w.own){let P=0,b=0;try{P=Ult72.P(cur);b=Ult72.bonus();}catch{}
   const sum=document.createElement('div');sum.className='u4box';sum.innerHTML=`<b>Lv.${w.lv}/${C.cap[w.r]}</b><span>Chủ chiến +${pc(P)}</span><span>Đội +${pc(b)}</span>`;
   const stg=sr.querySelector('.sr-stage');if(stg)stg.appendChild(sum);
   const inf=document.createElement('p');inf.className='u4inf';inf.innerHTML=`<b>Lv.${w.lv}/${C.cap[w.r]}</b> · +${pc(P)} công · máu · giáp (chủ chiến) · <span>Mô-đun: ${esc(sumTxt(cur))}</span>`;
   const nm=sr.querySelector('.sr-name');if(nm)nm.after(inf);
   // thanh đáy: CƯỜNG HÓA · MÔ-ĐUN SIÊU DUY · VỀ (nút gốc ẩn, bấm hộ)
   const bot=sr.querySelector('.sr-bot');if(bot){const lv=bot.querySelector('[data-a="lv"]'),pro=bot.querySelector('[data-a="pro"]');
    const canLv=lv&&!lv.disabled,canPro=pro&&!pro.disabled;const dot=canFill(cur);const lock=!(CH()&&Chip72.unlocked());
    bot.classList.add('u4bot');const nb=document.createElement('div');nb.className='u4bb';
    nb.innerHTML=`<button type="button" class="u3p u3pb u4mod ${dot?'dot':''}" data-u4b="mod">MÔ-ĐUN SIÊU DUY<small>${lock?'mở ở ải '+(CC().unlock||110):(CH()?Chip72.summary(cur).replace('chip','khe'):'')}</small>${dot?'<i class="u4dot">!</i>':''}</button>
     <button type="button" class="u3p ${canLv||canPro?'u3pg':'u3ps'}" data-u4b="up" ${canLv||canPro?'':'disabled'}>CƯỜNG HÓA<small>${canLv?(lv.querySelector('small')||{}).textContent||'':canPro?(pro.firstChild.textContent||'').trim():'Tối đa'}</small></button>
     <button type="button" class="u3p u3pb" data-u4b="back">VỀ<small>Sảnh</small></button>`;
    bot.after(nb);nb.addEventListener('click',e=>{const x=e.target.closest('[data-u4b]');if(!x||x.disabled)return;e.stopPropagation();const k=x.dataset.u4b;
     if(k==='mod')open(cur);else if(k==='up'){(canLv?lv:pro).click();}else if(k==='back'){const c=bot.querySelector('[data-a="close"]');if(c)c.click();}});}}
 }
 function tick(){if(!on())return;document.documentElement.classList.add('u4v23');try{deco();}catch(e){console.warn('U4 bệ',e);}}
 // chặn vẽ lại liên tục: chỉ quét khi DOM .u72 đổi
 let mo=null;function watch(){const el=document.querySelector('.u72');if(!el||el.__u4)return;el.__u4=1;mo=new MutationObserver(()=>tick());mo.observe(el,{childList:true,subtree:false});}
 setTimeout(()=>{if(on()){document.documentElement.classList.add('u4v23');watch();tick();}},0);
 setInterval(()=>{if(!on())return;let m='menu';try{m=mode;}catch{}if(m==='play'||m==='pause')return;watch();tick();},800);
 return {open,close,quickFit,quickOff,canFill,state:()=>JSON.parse(JSON.stringify(G)),_set:o=>{Object.assign(G,o);saveG();},cur:()=>W};
})();window.U4V23S=U4V23M;
