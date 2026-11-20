'use strict';
// V307 · chỉ thị cuối của Gemini (19/11), phần giao diện ngoài trận (ui307c.css). Tắt cả mô-đun: window.UI307C=false
//  • ô tàu màn Chiến cơ dùng ảnh tàu mới đúng bậc (trước dùng atlas V22) · nút SKIN / KHOE tròn trên khung trưng bày, bỏ thanh ‹ CHIẾN CƠ | SKIN | KHOE
//  • Nhiệm vụ: ẩn 4–5 dòng chữ mốc, chạm hộp quà mốc hiện bóng chú thích · Vòng quay: icon GPT thay ✸ ★ ⚙ 👕
//  • Thử thách / Quà: icon chế độ GPT (Phá vây, Hạt giống, Thử thách ngày, Boss vượt hạn, Thẻ tháng, Thể lực) · thể lực dùng pin xanh
//  • Mùa giải: mỗi ô thưởng thành ô vật phẩm (khung phẩm chất + icon + số góc) · tiêu đề MÙA GIẢI 21 NGÀY
//  • Tủ skin: bỏ ô thừa không nhãn, 4 biến thể có lọc màu riêng · Đột phá đạt tối đa: thẻ tàu lớn + huy hiệu ĐẠT KHUNG TỐI ĐA
//  • Hội thoại cốt truyện không đè màn kết quả
(()=>{const I=window.UI307_IMG||{};
 const FORM=['thuong','luc','lam','lam','lam','lam','tim','tim','tim','tim','tim','tim5'];
 function shipSrc(i){try{const S=SHIP118[i];if(!S)return '';let f='';try{const h=Evo53.hull(i);f=String(h&&h.__f||'');}catch{}if(f.startsWith('f')&&S[f.slice(1)])return S[f.slice(1)];let n=0;try{n=V70.craftN(i);}catch{}return S[FORM[Math.min(11,n|0)]]||S.tim||S.thuong||'';}catch{return '';}}
 function thumbs(){for(const b of document.querySelectorAll('#hb-strip .hb-th[data-c]')){const im=b.querySelector('img');if(!im)continue;const s=shipSrc(+b.dataset.c);if(s&&im.getAttribute('src')!==s){im.src=s;im.style.imageRendering='auto';}}}
 function fleet(){const stg=document.querySelector('#hub40 .hb-stage');const n=document.querySelector('#nav74s .n197');const isShips=!!(stg&&stg.offsetParent&&document.querySelector('#hb-strip'));
  if(isShips&&n&&[...n.querySelectorAll('button[data-c]')].map(b=>b.dataset.c).join()==='skin,share'&&window.U7C_STRIP!==false){const bk=n.querySelector('[data-b197]');if(bk)bk.click();}/* thanh ‹ CHIẾN CƠ | SKIN | KHOE → về thanh phụ thường (CHIẾN CƠ | PHI CÔNG | HỢP THỂ | TỐI THƯỢNG); SKIN/KHOE thành nút tròn */
  if(!isShips)return;if(stg.querySelector('.u7c-rb'))return;const box=document.createElement('div');box.className='u7c-rb';
  const mk=(t,k,ic)=>{const b=document.createElement('button');b.type='button';b.innerHTML='<i>'+ic+'</i><small>'+t+'</small>';b.addEventListener('click',e=>{e.stopPropagation();try{Nav74.F[k].go();}catch(err){}});return b;};
  box.append(mk('SKIN','skin',I.icon_skin_token?'<img src="'+I.icon_skin_token+'" alt="">':'👕'),mk('KHOE','share','📸'));stg.appendChild(box);}
 // nhiệm vụ: chú thích mốc
 let tip=null,tipT=0;function showTip(el,html){if(!tip){tip=document.createElement('div');tip.className='u7c-tip';document.body.appendChild(tip);}tip.innerHTML=html;const r=el.getBoundingClientRect();tip.style.left=Math.max(8,Math.min(innerWidth-228,r.left+r.width/2-110))+'px';tip.style.top=(r.bottom+6)+'px';tip.hidden=false;clearTimeout(tipT);tipT=setTimeout(()=>{tip.hidden=true;},2600);}
 function quests(){const bar=document.querySelector('.q77-bar');const mrw=document.querySelector('.q77-mrw');if(!bar||!mrw)return;mrw.classList.add('u7c-hide');const ms=[...bar.querySelectorAll('.q77-ms')],sp=[...mrw.children];ms.forEach((m,i)=>{if(m.__u7c)return;m.__u7c=1;m.addEventListener('click',()=>{const s=[...document.querySelectorAll('.q77-mrw>*')][i];if(s)showTip(m,'<b>Mốc '+(m.textContent||'').trim()+'</b><br>'+s.innerHTML.replace(/<b>[^<]*<\/b>/,''));},true);});}
 // vòng quay
 const WH={'✸':'icon_crossed_swords','★':'icon_crossed_swords','⚙':'icon_fusion_core','👕':'icon_manh_skin'};
 function wheel(){for(const i of document.querySelectorAll('.w74wheel>span>i')){if(i.querySelector('img,.u7i'))continue;const t=i.textContent.trim();const k=WH[t];if(k&&I[k]){i.innerHTML='<img class="u7c-wi'+(t==='★'?' jack':'')+'" src="'+I[k]+'" alt="'+t+'">';}}}
 // icon chế độ
 const MODE=[[/PHÁ VÂY/,'icon_roguelite'],[/HẠT GIỐNG/,'icon_daily_seed'],[/THỬ THÁCH NGÀY/,'icon_daily_challenge'],[/BOSS VƯỢT HẠN/,'icon_boss_rush'],[/THẺ THÁNG/,'icon_monthly_pass'],[/THỂ LỰC/,'icon_stamina'],[/TIỆM SKIN|KHO SKIN/,'icon_skin_token']];
 function modes(){for(const c of document.querySelectorAll('.n74card')){const b=c.querySelector('b');const ic=c.querySelector(':scope>i');if(!b||!ic)continue;const m=MODE.find(([r])=>r.test(b.textContent));if(!m||!I[m[1]])continue;const im=ic.querySelector('img');if(im&&im.dataset.u7c===m[1])continue;ic.innerHTML='<img data-u7c="'+m[1]+'" src="'+I[m[1]]+'" alt="" style="width:100%;height:100%;object-fit:contain">';}}
 // mùa giải: ô vật phẩm
 const short=n=>n>=1e6?(Math.floor(n/1e5)/10).toLocaleString('vi-VN')+'M':n>=1e3?(Math.floor(n/100)/10).toLocaleString('vi-VN')+'K':String(n);
 function tokIcon(t,html){const T=t.toLowerCase();
  {const m=T.match(/linh kiện ([abcd])/);if(m){const k='lk_'+m[1];return [I['icon_'+k]?'icon_'+k:'icon_fusion_core',{a:'luc',b:'lam',c:'tim',d:'vang'}[m[1]]];}if(/thẻ exp vktt/.test(T))return [I.icon_the_exp_vktt?'icon_the_exp_vktt':null,'lam'];}/* V307: linh kiện A–D + Thẻ EXP VKTT (chờ icon GPT, tạm lõi hợp thể / chữ) */
  if(/đá xp iv/.test(T))return ['icon_xp_crystal_gold','vang'];if(/đá xp iii/.test(T))return ['icon_xp_crystal_purple','tim'];/* khớp màu Đá XP trong túi: I trắng · II lục · III tím · IV vàng */if(/đá xp ii/.test(T))return ['icon_xp_crystal_green','luc'];if(/đá xp/.test(T))return ['icon_xp_crystal_white','trang'];
  if(/vé vòng quay|vé quay/.test(T))return ['icon_spin_ticket','lam'];if(/🎫|vé càn quét/.test(T))return ['icon_sweep_ticket','trang'];if(/vé phó bản/.test(T))return ['icon_boss_rush','tim'];
  if(/mảnh pc|mảnh phi công/.test(T))return ['icon_pilot_shard','tim'];if(/mảnh skin/.test(T))return ['icon_skin_shard','tim'];if(/khung ảnh|skin/.test(T))return ['icon_skin_token','vang'];
  if(/đá tẩy|đá khảm|đá lục|đá lam|đá tím|ngọc/.test(T))return ['icon_socket_gem',/tím/.test(T)?'tim':/lam/.test(T)?'lam':'luc'];
  if(/bản sao/.test(T))return ['icon_fusion_core',/tím/.test(T)?'tim':/lam/.test(T)?'lam':/lục/.test(T)?'luc':'trang'];if(/lõi/.test(T))return ['icon_fusion_core','vang'];
  if(/ic306-kc|u7i-diamond|💎/.test(html))return ['icon_diamond','lam'];if(/ic306-nl/.test(html))return ['icon_stamina','luc'];if(/u7i-alloy|◈/.test(html))return ['icon_alloy','trang'];if(/rương/.test(T))return ['icon_monthly_pass','vang'];return [null,'trang'];}
 function season(){const top=document.querySelector('.s77-top>b');if(top&&top.textContent!=='MÙA GIẢI 21 NGÀY'&&/MÙA GIẢI/.test(top.textContent)){top.textContent='MÙA GIẢI 21 NGÀY';top.classList.add('u7c-t16');}
  for(const c of document.querySelectorAll('.s77-c')){const html=c.innerHTML;if(c.__u7h===html)continue;const lock=c.querySelector('.ic306-khoa');const parts=html.replace(/<i class="ic306 ic306-khoa"><\/i>/,'').split(/\s\+\s/);const out=[];
   for(const p of parts){const d=document.createElement('div');d.innerHTML=p;const txt=d.textContent.replace(/[◈💎🎫]/g,'').trim();const [k,r]=tokIcon(d.textContent,p);const m=txt.match(/^(\d[\d.]*)/);const n=m?+m[1].replace(/\./g,''):1;const nm=txt.replace(/^(\d[\d.]*)\s*/,'').replace(/\(.*?\)/,'').trim();
    out.push('<span class="u7c-slot r-'+r+'" title="'+d.textContent.trim().replace(/"/g,'')+'">'+(k&&I[k]?'<img src="'+I[k]+'" alt="">':'<em>'+(nm.slice(0,8)||'?')+'</em>')+'<b>×'+short(n)+'</b></span>');}
   c.innerHTML=(lock?lock.outerHTML:'')+out.join('');c.__u7h=c.innerHTML;c.classList.add('u7c-cell');}}
 // tủ skin
 const SKF={'Màu đột phá':'none','Ngọc Lam':'hue-rotate(155deg) saturate(1.25) brightness(1.05)','Bạch Kim':'saturate(.25) brightness(1.35) contrast(1.1)','Hoàng Kim':'hue-rotate(38deg) saturate(1.5) brightness(1.15)','Cầu Vồng':'hue-rotate(270deg) saturate(1.6) brightness(1.1)'};
 function skins(){for(const it of document.querySelectorAll('.sk-grid .sk-it')){const b=it.querySelector('b');const t=b?b.textContent.trim():'';if(!t){it.classList.add('u7c-hide');continue;}/* ô thứ 5 là Cầu Vồng Pha Lê (có nhãn, bị cắt dưới mép ảnh chụp) nên giữ */const k=Object.keys(SKF).find(x=>t.startsWith(x));const cv=it.querySelector('canvas');if(cv&&k)cv.style.filter=SKF[k];/* V309: tủ skin = thân mới (skin69) + lọc màu CSS */}}
 // đột phá đạt tối đa
 function evo(){const k=document.querySelector('.ev82k');if(!k)return;const mx=k.querySelector('.adv-max');if(!mx||k.querySelector('.u7c-max'))return;let id=0;try{id=launchCraft|0;}catch{}const nm=(k.querySelector('h3')||{}).firstChild;const src=shipSrc(id);
  const d=document.createElement('div');d.className='u7c-max';d.innerHTML=(src?'<img src="'+src+'" alt="">':'')+'<span class="u7c-badge">ĐẠT KHUNG TỐI ĐA</span>';mx.insertAdjacentElement('beforebegin',d);}
 // màn Thể lực: ⚡ → pin xanh (chỉ trong hộp có tiêu đề THỂ LỰC; ⚡ ở thẻ ải / tháp / phó bản là lực chiến nên giữ)
 function stamina(){if(!I.icon_stamina)return;for(const box of document.querySelectorAll('.m63:not([hidden]),#nav74p:not([hidden])')){const h=box.querySelector('.m63-eye,h3,h2,.n74pc>b,.n74pc h2');if(!h||!/THỂ LỰC/i.test(box.textContent.slice(0,200)))continue;const w=document.createTreeWalker(box,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeValue.includes('⚡')&&!n.parentElement.closest('.u7c-st')?1:2});const L=[];let n;while((n=w.nextNode()))L.push(n);for(const t of L){const f=document.createDocumentFragment();t.nodeValue.split(/(⚡)/).forEach(x=>{if(!x)return;if(x==='⚡'){const e=document.createElement('span');e.className='u7c-st u7i';e.textContent='⚡';f.appendChild(e);}else f.appendChild(document.createTextNode(x));});t.replaceWith(f);}}}
 // kết quả: ẩn hội thoại
 function result(){let m='';try{m=mode;}catch{}if(['reward','win','over'].includes(m)||document.body.classList.contains('res78')){const st=document.getElementById('st80');if(st&&!st.hidden){st.hidden=true;}}}
 // đá khảm + tẩy đá vẽ lại (GPT 19/11): thay ảnh STONE71_ART (cùng đối tượng stone71 đọc), biểu tượng tẩy đá ở hộp TẨY ĐÁ
 let stOK=0;function stones(){if(!stOK&&typeof STONE71_ART!=='undefined'){for(const k of ['stone_c1','stone_c2','stone_c3','stone_c4','stone_c5','stone_x3','stone_x4','stone_x5'])if(I['da_'+k])STONE71_ART[k]=I['da_'+k];stOK=1;}
  if(I.icon_tay_da)for(const e of document.querySelectorAll('.st71-card .m63-eye')){if(/TẨY/.test(e.textContent)&&!e.querySelector('.u7c-tay'))e.insertAdjacentHTML('afterbegin','<img class="u7c-tay" src="'+I.icon_tay_da+'" alt="">');}}
 function s(){const on=window.UI307C!==false;const r=document.documentElement;r.classList.toggle('ui307c',on);if(!on)return;
  if(I.icon_stamina&&!r.style.getPropertyValue('--u7c-sta')){r.style.setProperty('--u7c-sta','url('+I.icon_stamina+')');for(const [k,f] of [['trang','white'],['luc','green'],['lam','blue'],['tim','purple'],['vang','gold']])if(I['slot_rarity_'+f])r.style.setProperty('--u7c-s-'+k,'url('+I['slot_rarity_'+f]+')');}
  try{result();}catch{}try{stones();}catch{}let m='';try{m=mode;}catch{}if(m==='play')return;
  for(const f of [thumbs,fleet,quests,wheel,modes,season,skins,evo,stamina])try{f();}catch(e){}}
 s();setInterval(s,450);})();
