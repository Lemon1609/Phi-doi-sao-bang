// V79C · GHÉP BỘ ĐỒ HỌA UI19 CỦA GPT
//  • Ô thưởng: phôi 4 màu (blank_*) · mảnh ngọc theo HỆ × PHẨM (gem_sNN_màu)
//    Hệ ngọc thật trong code (Gems, kinds = GEAR_KINDS): armor · missiles · sidearm = 3 hệ (không phải 5) → S04 · S01 · S05
//    Phẩm thật: D C B A S (màu #9eacb8 #79dba3 #75baff #ce99ff #ffd577) → white · green · blue · purple · orange
//  • Thành tựu: icon 3 dòng mới + huy hiệu bậc (đồng · bạc · vàng · kim cương)
//  • Chế độ NHẸ: nền sảnh tĩnh lobby_light, tắt tia sáng sảnh + tự diễn bắn thử, bỏ lọc sáng canvas
//  Tắt: window.UI19=false
const Ui19=(()=>{
 const A=()=>window.UI19_ART||{};
 const on=()=>window.UI19!==false&&!!window.UI19_ART;
 const GEM_SHAPE={armor:'s04',missiles:'s01',sidearm:'s05'};
 const GEM_COL={D:'white',C:'green',B:'blue',A:'purple',S:'orange'};
 const PH_COL={'Trắng':'white','Lục':'green','Lam':'blue','Tím':'purple'};
 function gemKindOf(t){t=t.toLowerCase();if(t.includes('giáp'))return 'armor';if(t.includes('tên lửa'))return 'missiles';if(t.includes('vũ khí phụ')||t.includes('phụ'))return 'sidearm';return 'missiles';}
 function iconFor(t){const a=A();const m=t.match(/Phôi (Trắng|Lục|Lam|Tím)/);if(m)return a['blank_'+PH_COL[m[1]]];
  if(/mảnh ngọc/i.test(t)){const g=(t.match(/\(([DCBAS])\)/)||[])[1]||'D';return a['gem_'+GEM_SHAPE[gemKindOf(t)]+'_'+GEM_COL[g]];}return null;}
 function tiles(){for(const d of document.querySelectorAll('.rw78:not([data-u19])')){d.dataset.u19=1;const src=iconFor(d.title||d.textContent||'');if(src){const im=d.querySelector('img');if(im)im.src=src;}}}
 // ---------- thành tựu ----------
 const ACH_IC={star3:'achievement_stars',tim5:'achievement_forge',bossrun:'achievement_hunter'};
 const RANK=['rank_bronze','rank_silver','rank_gold','rank_diamond'];
 function ach(){const a=A();for(const r of document.querySelectorAll('#m40 .ach:not([data-u19])')){const btn=r.querySelector('[data-a]');if(!btn)continue;r.dataset.u19=1;const id=btn.dataset.a;const b=r.querySelector('b');if(!b)continue;
   const stars=(b.textContent.match(/★/g)||[]).length;const fin=r.classList.contains('done');
   if(ACH_IC[id]&&a[ACH_IC[id]]){const im=document.createElement('img');im.className='u19ai';im.src=a[ACH_IC[id]];im.alt='';r.insertBefore(im,r.firstChild);r.classList.add('u19has');}
   const t=Math.min(3,stars-(fin?1:0)>=0?stars-(fin?1:0):0);const rk=a[RANK[fin?3:t]];if(rk){b.textContent=b.textContent.replace(/\s*★+\s*$/,'');const im=document.createElement('img');im.className='u19rk';im.src=rk;im.alt='';im.title=fin?'Hoàn thành':'Bậc '+(t+1);b.appendChild(im);}}}
 // ---------- ảnh món cho quà bộ ----------
 const TH={};
 function shipArt(i){const n17=(window.UI17!==false&&typeof window.SHIPCUR17==='function'&&SHIPCUR17(i));if(n17)return n17;/* V309 L17B */if(TH[i])return TH[i];try{const im=(typeof Evo53!=='undefined'&&Evo53.hull)?Evo53.hull(i):fighterAtlasV22;const w=(im.naturalWidth||im.width)/5,h=(im.naturalHeight||im.height)/4;if(!w||!h)return '';const c=document.createElement('canvas');c.width=c.height=96;c.getContext('2d').drawImage(im,i%5*w,Math.floor(i/5)*h,w,h,0,0,96,96);return TH[i]=c.toDataURL();}catch{return '';}}
 function gearArt(model){try{const it=(Progress.getState().items||[]).find(x=>x.variant===model);return Progress.art(it||{variant:model,kind:GearCatalog[model].kind,level:1,rarity:'normal'});}catch{return '';}}
 function pieceArt(kind,model){if(kind==='craft'){const s=shipArt(model);return s?`<img src="${s}" alt="">`:'✈';}return gearArt(model)||'⚙';}
 // ---------- chế độ NHẸ ở sảnh ----------
 let liteWas=null;
 function lite(){let l=false;try{l=window.GFX66==='light'||(typeof VisualFX!=='undefined'&&VisualFX.counts().quality==='light');}catch{}
  document.body.classList.toggle('lite79',l&&on());
  if(l!==liteWas&&typeof window.__h41setBg==='function'){try{window.__h41setBg(l&&on()?A().lobby_light:null);}catch{}}
  if(l&&liteWas!==true){try{const au=document.getElementById('h1-au')||[...document.querySelectorAll('#hgr41 button')].find(b=>/TỰ DIỄN: BẬT/.test(b.textContent));if(au&&/BẬT/.test(au.textContent))au.click();}catch{}}
  liteWas=l;}
 // ---------- ô quà Điểm danh / Quà 7 ngày: ký hiệu → icon tài nguyên thật (ICON74) ----------
 const EM={'◈':'res_hop_kim','⬢':'res_da_nang_cap','💎':'res_kim_cuong'};
 const ic=k=>{try{return ICON74[k]||'';}catch{return '';}};
 function emo(){for(const i of document.querySelectorAll('#m40 .day i:not([data-u19])')){i.dataset.u19=1;const t=i.textContent.trim();const k=EM[t]||(t==='✈'?'ic_phu_tro':t==='🎁'?'ic_qua':null);if(k&&ic(k))i.innerHTML='<img alt="" src="'+ic(k)+'">';}
  for(const el of document.querySelectorAll('#m40 .day:not([data-u19e]),.v75-d:not([data-u19e]) b,.v75-d:not([data-u19e]) small')){const host=el.closest('.v75-d')||el;
   const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
   for(const n of nodes){if(n.parentElement&&n.parentElement.tagName==='I')continue;if(!/[◈⬢💎]/.test(n.nodeValue))continue;const f=document.createDocumentFragment();for(const part of n.nodeValue.split(/([◈⬢💎])/)){if(EM[part]&&ic(EM[part])){const im=document.createElement('img');im.className='u19e';im.alt=part;im.src=ic(EM[part]);f.appendChild(im);}else if(part)f.appendChild(document.createTextNode(part));}n.replaceWith(f);}
   if(host.classList.contains('v75-d')){if(el.tagName==='SMALL')host.dataset.u19e=1;}else host.dataset.u19e=1;}}
 setInterval(()=>{try{if(!on())return;tiles();ach();lite();emo();}catch{}},400);
 return {iconFor,pieceArt,shipArt,state:()=>({on:on(),n:Object.keys(A()).length,lite:document.body.classList.contains('lite79')})};
})();
window.Ui19=Ui19;
