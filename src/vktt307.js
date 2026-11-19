'use strict';
// V307 · Vũ khí tối thượng theo 3 hệ (chỉ thị Gemini 19/11; chủ dự án chọn "ráp 4 món cũ trước", 5 món mới làm sau khi có bài game gốc).
//  4 món hiện có gắn tranh GPT + hệ: Săn Sao → Thánh Kiếm Hư Không (TẤN CÔNG #FF5252) · Lưới Điện Laser → Pháo Laser Mặt Trời (TẤN CÔNG) ·
//  Pháo Đài → Pháo Đài Phản Xạ Quang (PHÒNG THỦ #00E676) · Thế Giới → Đồng Hồ Thời Không (ĐA DỤNG #00E5FF). Không đổi số / cơ chế.
//  Màn VKTT: thanh lọc TẤT CẢ | TẤN CÔNG | PHÒNG THỦ | ĐA DỤNG (‹ › chỉ chạy trong hệ đang lọc), huy hiệu hệ, 2 dòng Chủ động (Tuyệt kỹ) / Bị động.
//  Trong trận: nút VKTT (#ult72-btn) và góc nút TUYỆT KỸ mang tranh vũ khí chủ chiến + vòng viền màu hệ. Tắt: window.VKTT307=false
(()=>{const I=window.VKTT307_IMG||{};
 const W={hunter:{img:'void_greatsword',g:'atk',nm:'Thánh Kiếm Hư Không',act:'Vòng sao xoay cắt quái quanh tàu, tiến hóa theo thời gian'},
  web:{img:'solar_orbital_laser',g:'atk',nm:'Pháo Laser Mặt Trời',act:'Bốn neo laser đan lưới: sát thương liên tục + làm chậm địch'},
  fortress:{img:'prism_bastion',g:'def',nm:'Pháo Đài Phản Xạ Quang',act:'Dựng tháp chắn đạn và pháo tự bắn quanh tàu'},
  world:{img:'chronos_astrolabe',g:'uti',nm:'Đồng Hồ Thời Không',act:'Ngưng đọng thời gian: địch và đạn địch đứng yên vài giây'}};
 const G={atk:['TẤN CÔNG','#FF5252'],def:['PHÒNG THỦ','#00E676'],uti:['ĐA DỤNG','#00E5FF']};
 const byName=n=>{try{const nm=ULT72.nm;return Object.keys(nm).find(k=>nm[k]===n.trim());}catch{return null;}};
 let filt='all';
 // dạng tranh theo nấc (GPT 19/11): Trắng–Lam+3 → d1 · Tím–Tím+3 → d2 · Huyền thoại–HT+4 → d3 · HT+5 → d4
 const rOf=id=>{try{return (Ult72.state().w[id]||{}).r|0;}catch{return 0;}};const form=r=>r>=15?4:r>=10?3:r>=6?2:1;
 const src=(id,r)=>{if(!W[id])return null;const k=W[id].img+'_d'+form(r==null?rOf(id):r);return I[k]||I[W[id].img];};
 const badge=g=>'<span class="vk7-b" style="--vk:'+G[g][1]+'">'+G[g][0]+'</span>';
 function picks(){for(const b of document.querySelectorAll('.u72-pick button')){const nb=b.querySelector('b');const id=nb&&byName(nb.textContent);if(!id||!W[id])continue;const im=b.querySelector('img');const s0=src(id,0);if(im&&s0&&im.getAttribute('src')!==s0)im.src=s0;if(!b.querySelector('.vk7-b'))b.insertAdjacentHTML('beforeend',badge(W[id].g));}}
 function main(){const root=document.querySelector('.u72.srm .sr');if(!root)return;let id=null;try{id=Ult72.cur();}catch{}if(!id||!W[id]){const nb=root.querySelector('.sr-name b');id=nb&&byName(nb.textContent);}if(!id||!W[id])return;const w=W[id];
  const wi=root.querySelector('.sr-wpn img');if(wi&&src(id)&&wi.getAttribute('src')!==src(id))wi.src=src(id);
  let st={};try{st=Ult72.state();}catch{}for(const sl of root.querySelectorAll('.sr-slot')){const im=sl.querySelector('img');if(!im)continue;const k=sl.classList.contains('main')?st.main:null;if(k&&src(k)&&im.getAttribute('src')!==src(k))im.src=src(k);}
  root.style.setProperty('--vk',G[w.g][1]);root.classList.add('vk7');{let r=0;try{r=(Ult72.state().w[id]||{}).r|0;}catch{}let tc='#d6e0ea';try{tc=ULT72.fcol[ULT72.rf[r]];}catch{}root.style.setProperty('--vkt',tc);root.dataset.vkr=r;}/* màu nấc (Trắng→Huyền thoại) làm quầng sáng quanh tranh: tranh tiến hóa theo nấc chờ GPT */
  const nm=root.querySelector('.sr-name');if(nm){let bd=nm.querySelector('.vk7-b');if(!bd||bd.dataset.id!==id){if(bd)bd.remove();nm.insertAdjacentHTML('beforeend',badge(w.g));nm.querySelector('.vk7-b').dataset.id=id;}
   let ln=root.querySelector('.vk7-ln');if(!ln){ln=document.createElement('div');ln.className='vk7-ln';nm.insertAdjacentElement('afterend',ln);}
   const up=root.querySelector('.sr-st b.up');const pv=up?up.textContent.trim():'';let sub='';try{sub=ULT72.sub[id];}catch{}
   const h='<p><b>CHỦ ĐỘNG · TUYỆT KỸ</b> '+(sub?'<i>'+sub+'</i> — ':'')+w.act+'</p><p><b>BỊ ĐỘNG · KHI TRANG BỊ</b> '+(pv||'—')+' tấn công / máu / giáp (Chủ chiến 100 %, Trợ chiến 25 %)</p>';if(ln.__h!==h){ln.innerHTML=h;ln.__h=h;}}
  let tb=root.querySelector('.vk7-tabs');if(!tb){tb=document.createElement('div');tb.className='vk7-tabs';tb.innerHTML=[['all','TẤT CẢ'],['atk','TẤN CÔNG'],['def','PHÒNG THỦ'],['uti','ĐA DỤNG']].map(([k,t])=>'<button type="button" data-vk="'+k+'">'+t+'</button>').join('');const top=root.querySelector('.sr-top');(top||root.firstChild).insertAdjacentElement('afterend',tb);
   tb.addEventListener('click',e=>{const b=e.target.closest('[data-vk]');if(!b)return;filt=b.dataset.vk;seek(1);});}
  for(const b of tb.querySelectorAll('button'))b.classList.toggle('on',b.dataset.vk===filt);
  for(const nb of root.querySelectorAll('.sr-nav')){if(nb.__vk)continue;nb.__vk=1;nb.addEventListener('click',()=>setTimeout(()=>seek(nb.classList.contains('l')?-1:1),30));}}
 let seeking=0;function seek(dir){if(filt==='all'||seeking)return;seeking=1;let n=0;const step=()=>{let id=null;try{id=Ult72.cur();}catch{}if((W[id]&&W[id].g===filt)||n++>4){seeking=0;main();return;}const b=document.querySelector('.u72.srm .sr-nav.'+(dir<0?'l':'r'));if(!b){seeking=0;return;}b.click();setTimeout(step,40);};step();}
 function battle(){let id=null;try{id=Ult72.mainW();}catch{}const ok=id&&W[id]&&src(id);
  const ub=document.getElementById('ult72-btn');if(ub&&ok){ub.style.setProperty('--vk',G[W[id].g][1]);ub.style.setProperty('--vki','url('+src(id)+')');ub.classList.add('vk7u');}
  const rs=document.getElementById('robot-skill');if(rs){let c=rs.querySelector('.vk7-c');if(ok){if(!c){c=document.createElement('i');c.className='vk7-c';rs.appendChild(c);}c.style.setProperty('--vk',G[W[id].g][1]);c.style.backgroundImage='url('+src(id)+')';}else if(c)c.remove();}}
 function tick(){const on=window.VKTT307!==false;document.documentElement.classList.toggle('vktt307',on);if(!on)return;try{picks();}catch{}try{main();}catch{}try{battle();}catch{}}
 tick();setInterval(tick,400);})();
