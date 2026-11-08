 // ================= XƯỞNG TRANG BỊ SSS (giao diện) · V156 Phần E =================
 let root=null,tabK='armor',sel=null,rv=null,fpos='armor';
 const GN=['','I','II','III'],TABS=[...KINDS,'items'],TN={...KN,items:'Vật phẩm'};
 const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmtN=n=>{try{return Math.round(n).toLocaleString('vi-VN');}catch{return String(n);}};
 function atlasCell(d,row,size){const k='atlas_'+d.kind,src=GEAR44_ASSETS[k];return `<span class="g44-cell" style="--sz:${size}px;background-image:url(${src});background-position:${d.ring*20}% ${row*100}%"></span>`;}
 const iconOf=id=>{const u=GEAR44_ASSETS[id+'_icon'];return u?`<img class="g44-ico" alt="" src="${u}">`:`<span class="g44-ico g44-no"></span>`;};
 // tranh SSS: tranh GPT (khi có) → ô atlas cũ → tạm ghép 2 icon món mẹ
 function pic(d,size,row=0){const u=GEAR44_ASSETS[d.id+'_icon'+(row?3:1)];if(u)return `<img class="g44-ico" style="width:${size}px;height:${size}px" alt="" src="${u}">`;if(d.ring!=null&&GEAR44_ASSETS['atlas_'+d.kind])return atlasCell(d,row,size);
  const a=GEAR44_ASSETS[d.parents[0]+'_icon'],b=GEAR44_ASSETS[d.parents[1]+'_icon'];return `<span class="g44-pair" style="--sz:${size}px;--c:${d.color}">${a?`<img alt="" src="${a}">`:''}${b?`<img alt="" src="${b}">`:''}</span>`;}
 function buildUI(){root=document.createElement('section');root.id='g44';root.hidden=true;root.setAttribute('role','dialog');root.setAttribute('aria-label','Xưởng trang bị SSS');
  root.innerHTML=`<div class="g44-box"><header><h2>XƯỞNG TRANG BỊ SSS</h2><small>2 món mẹ cùng loại đạt Tím +1 · món mẹ được giữ lại</small><button class="g44-x" data-g="close" aria-label="Đóng">✕</button></header>
  <nav class="g44-nav4">${TABS.map(k=>`<button data-tab="${k}">${TN[k]}</button>`).join('')}</nav><div class="g44-list" id="g44-list"></div><div class="g44-det" id="g44-det"></div></div><canvas class="g44-rite" hidden></canvas>`;
  document.body.appendChild(root);rv=root.querySelector('.g44-rite');
  root.addEventListener('click',e=>{const t=e.target.closest('[data-tab]');if(t){tabK=t.dataset.tab;sel=null;render();return;}const c=e.target.closest('[data-pick]');if(c){sel=c.dataset.pick;render();return;}const b=e.target.closest('[data-g]');if(!b)return;const g=b.dataset.g,id=b.dataset.id;
   if(g==='close')close();else if(g==='fuse'){if(fuse(id))render();}else if(g==='up'){if(upgrade(id))render();}else if(g==='equip'){if(equipSSS(DEF2[id].kind,id))toastG('Xuất chiến: '+DEF2[id].name);render();}else if(g==='unequip'){equipSSS(DEF2[id].kind,null);render();}
   else if(g==='core'){if(toCore())toastG('+1 Tinh Hạch Siêu Việt');render();}else if(g==='mat'){if(fromCore(id))toastG('+1 '+MATN(id));render();}
   else if(g==='smerge'){let n=0;try{n=Stone71.mergeAll(null);}catch{}toastG(n?'Ghép đá · '+n+' lượt':'Chưa đủ đá hoặc hợp kim');render();}
   else if(g==='fpos'){fpos=id;render();}else if(g==='forge'){const [ty,m]=id.split('|');let s=null;try{s=Stone71.forgeX(fpos,ty,m);}catch{}if(s)toastG('Rèn xong · '+Stone71.label(s));render();}
   else if(g==='upx'){let s=null;try{s=Stone71.upX(id);}catch{}if(s)toastG('Nâng Cam · '+Stone71.label(s));render();}});
  root.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}
 function toastG(t){try{toast(t);}catch{}}
 const costTxt=st=>st?[...Object.entries(st.mats||{}).map(([k,v])=>`${MATN(k)} ${haveM(k)}/${v}`),st.sss_core?`Tinh Hạch ${haveM('sss_core')}/${st.sss_core}`:'',fmtN(st.credits)+' ◈'].filter(Boolean).join(' · '):'';
 const pTag=p=>{const n=tierN(p);return n<0?'<u>chưa có</u>':`<span style="color:${n>=7?'#46ffb2':'#fca5a5'}">${TNAME(n)}</span>`;};
 function render(){if(!root)return;for(const b of root.querySelectorAll('[data-tab]'))b.setAttribute('aria-pressed',String(b.dataset.tab===tabK));
  if(tabK==='items')return renderItems();
  const list=SSS2.filter(d=>d.kind===tabK).sort((a,b)=>a.group-b.group||a.ord-b.ord),it=equippedItem(tabK),cur=activeId(tabK);
  if(!sel||!DEF2[sel]||DEF2[sel].kind!==tabK)sel=(list.find(d=>d.id===cur)||list[0]).id;
  root.querySelector('#g44-list').innerHTML=list.map(d=>{const c=canFuse(d.id),own=owns(d.id),on=cur===d.id;return `<button class="g44-r ${own?'own':''} ${on?'on':''} ${d.id===sel?'sel':''}" data-pick="${d.id}">${iconOf(d.parents[0])}<i>+</i>${iconOf(d.parents[1])}<i>→</i>${pic(d,46)}<span><b>${esc(d.name)}</b><small>Nhóm ${GN[d.group]} · ${own?(on?'ĐANG XUẤT CHIẾN · ':'')+'Lv'+lvOf(d.id)+'/5 · +'+sssEnh(d.id):c.ok?'Sẵn sàng hợp thể':esc(c.why)}</small></span></button>`;}).join('');
  const d=DEF2[sel],c=canFuse(d.id),own=owns(d.id),lv=lvOf(d.id),on=cur===d.id,tl=d.trait.lv,shown=tl[Math.max(0,lv-1)],nx=lv&&lv<5?tl[lv]:null;
  const shared=d.parents.filter(p=>SSS2.some(x=>x!==d&&x.parents.includes(p)));
  let act='';if(!own)act=`<button class="main" data-g="fuse" data-id="${d.id}" ${c.ok?'':'disabled'}>${c.ok?'HỢP THỂ · '+esc(costTxt(d.steps[0])):esc(c.why)}</button>`;
  else{act=(lv<5?`<button class="main" data-g="up" data-id="${d.id}" ${costOk(d.steps[lv]).length?'disabled':''}>NÂNG Lv${lv+1} · ${esc(costTxt(d.steps[lv]))}</button>`:'<p class="g44-st">Đã đạt Lv5</p>')+(on?`<button data-g="unequip" data-id="${d.id}">GỠ SSS (dùng món mẹ thường)</button>`:`<button data-g="equip" data-id="${d.id}">CHỌN XUẤT CHIẾN</button>`);}
  root.querySelector('#g44-det').innerHTML=`<div class="g44-art">${pic(d,96,0)}${pic(d,96,1)}</div><div class="g44-txt"><h3 style="color:${d.color}">${esc(d.name)} <em>SSS · Nhóm ${GN[d.group]}</em></h3>
   <p>Món mẹ: <b>${esc(nameOf(d.parents[0]))}</b> ${pTag(d.parents[0])} + <b>${esc(nameOf(d.parents[1]))}</b> ${pTag(d.parents[1])}</p>
   <p class="g44-tr">Nội tại · <b>${esc(d.trait.name)}</b>${lv?' (Lv'+lv+')':' (Lv1)'}: ${esc(shown.desc)}</p>${nx?`<p class="g44-fl">Lv${lv+1}: ${esc(nx.desc)}</p>`:''}
   <p>Kỹ năng · <b>${esc(d.skill.name)}</b> (${d.skill.cooldown}s): ${esc(d.skill.effect)}</p><p>Bạo Tẩu · <b>${esc(d.super.name)}</b>: ${esc(d.super.effect)}</p><p>Tuyệt kỹ · <b>${esc(d.ult.name)}</b>: ${esc(d.ult.effect)}</p>
   <p class="g44-st">${tabK==='armor'?'Máu + khiên của giáp':'Hỏa lực'} ×1,35 · thêm 3%/cấp cường hóa · Cường hóa = 2 × min(Tím +n hai món mẹ) = <b>+${sssEnh(d.id)}</b></p>
   ${shared.length?`<p class="g44-fl">${esc(shared.map(nameOf).join(', '))} còn ghép được SSS khác — chọn SSS nào xuất chiến cho món mẹ này.</p>`:''}
   ${it&&!d.parents.includes(it.variant)&&own?`<p class="g44-fl">Đang lắp ${esc(nameOf(it.variant))} — chọn xuất chiến sẽ tự lắp món mẹ tốt nhất.</p>`:''}
   <p class="g44-fl">Nội tại hợp nhất, kỹ năng và Tuyệt kỹ riêng đang được lập trình (đợt sau). Hiện SSS dùng cơ chế của món mẹ đang lắp với hỏa lực ×1,35.</p>
   <div class="g44-act">${act}</div></div>`;}
 function renderItems(){const X=XC,wl=wkLeft(),core=haveM('sss_core'),P=P3();let stoneH='';
  let ok=false;try{ok=Stone71.unlocked();}catch{}
  if(!ok)stoneH='<p class="g44-fl">Đá khảm mở từ ải 70.</p>';else{const st=Stone71.state().st||[];const fr=t=>st.filter(s=>!s.on&&s.t===t).length;const C=Stone71.C;
   const need=Stone71.forgeNeed(),opts=Stone71.forgeOpts(fpos),ups=Stone71.upList();
   stoneH=`<p>Đá chưa khảm: ${C.tn.map((n,t)=>`<b style="color:${C.tc[t]}">${n} ${fr(t)}</b>`).join(' · ')}</p>
   <div class="g44-act"><button data-g="smerge">GHÉP TẤT CẢ ĐÁ (${C.merge.k} → 1 · ${C.merge.cr.map(fmtN).join(' / ')} ◈)</button></div>
   <h4>Rèn đá đặc biệt Tím</h4><p class="g44-fl">${C.forgeX.lam} đá Lam + ${C.forgeX.luc} đá Lục (thường, chưa khảm) + ${C.forgeX.core} Tinh Hạch + ${fmtN(C.forgeX.cr)} ◈ · có: Lam ${need.lam[0]} · Lục ${need.luc[0]} · Tinh Hạch ${need.core[0]}</p>
   <div class="g44-chips">${C.pos.map(p=>`<button data-g="fpos" data-id="${p}" aria-pressed="${p===fpos}">${C.pn[p]}</button>`).join('')}</div>
   <div class="g44-chips">${opts.map(o=>`<button data-g="forge" data-id="${o.ty}|${o.m}">${esc(o.label)}</button>`).join('')||'<small>Chưa có mẫu phù hợp ở vị trí này.</small>'}</div>
   <h4>Nâng đá đặc biệt Tím → Cam</h4><p class="g44-fl">1 đá đặc biệt Tím + ${C.upX.tim} đá Tím thường + ${C.upX.core} Tinh Hạch + ${fmtN(C.upX.cr)} ◈ (giữ nguyên hệ)</p>
   <div class="g44-chips">${ups.map(s=>`<button data-g="upx" data-id="${s.id}">${esc(Stone71.label(s))}</button>`).join('')||'<small>Chưa có đá đặc biệt Tím chưa khảm.</small>'}</div>`;}
  root.querySelector('#g44-list').innerHTML=`<div class="g44-it"><h4>Tinh Hạch Siêu Việt: <b>${core}</b></h4>
   <div class="g44-act"><button class="main" data-g="core" ${wl>0?'':'disabled'}>${X.purpleMatsToCore.anyPurpleMatLv3Count} nguyên liệu Tím + ${fmtN(X.purpleMatsToCore.credits)} ◈ → 1 Tinh Hạch · còn ${wl}/${X.purpleMatsToCore.weeklyLimit} lượt tuần này</button></div>
   <p class="g44-fl">Nguyên liệu Tím đang có: ${P.map(k=>MATN(k)+' '+haveM(k)).join(' · ')} (lấy loại nhiều nhất trước)</p>
   <h4>Đổi 1 Tinh Hạch + ${fmtN(X.coreToPurpleMat.credits)} ◈ → 1 nguyên liệu Tím tự chọn</h4><div class="g44-chips">${P.map(k=>`<button data-g="mat" data-id="${k}">${esc(MATN(k))}</button>`).join('')}</div>
   ${stoneH}</div>`;
  root.querySelector('#g44-det').innerHTML='<p class="g44-fl">Không tạo kim cương. Đổi Tinh Hạch giới hạn 15 lượt mỗi tuần để giữ giá Chợ Đen.</p>';}
 function open(kind){if(busy())return false;if(!root)buildUI();if(kind&&TABS.includes(kind))tabK=kind;sel=null;payBack();render();root.hidden=false;document.body.classList.add('g44-on');return true;}
 function close(){if(root){root.hidden=true;document.body.classList.remove('g44-on');}try{CCHT_LOBBY_API.refresh();}catch{}try{Hangar41.paint(true);}catch{}}
 // nghi thức hợp thể: 2 món gốc lao vào nhau → chớp → SSS
 function rite(id){if(!root)buildUI();const d=DEF2[id];const ld=u=>{const m=new Image();if(u)m.src=u;return m;};const pa=ld(GEAR44_ASSETS[d.parents[0]+'_icon']),pb=ld(GEAR44_ASSETS[d.parents[1]+'_icon']),ic=ld(GEAR44_ASSETS[d.id+'_icon1']),at=d.ring!=null?ld(GEAR44_ASSETS['atlas_'+d.kind]):null;rv.hidden=false;const t0=performance.now(),g=rv.getContext('2d');
  const okI=m=>m&&m.complete&&m.naturalWidth;
  const step=()=>{const t=(performance.now()-t0)/1000,r=rv.getBoundingClientRect(),dp=Math.min(2,devicePixelRatio||1);if(rv.width!==Math.round(r.width*dp)){rv.width=Math.round(r.width*dp);rv.height=Math.round(r.height*dp);}g.setTransform(dp,0,0,dp,0,0);const W2=r.width,H2=r.height,cx=W2/2,cy=H2*.42;g.clearRect(0,0,W2,H2);g.fillStyle='rgba(2,4,12,.92)';g.fillRect(0,0,W2,H2);
   const e=u=>u<0?0:u>1?1:1-Math.pow(1-u,3),u=e(t/1);if(t<1.05)[pa,pb].forEach((im,k)=>{const s=Math.min(130,W2*.3),x=cx+(k?1:-1)*(1-u)*W2*.3;g.save();g.translate(x,cy);g.rotate((k?-1:1)*(1-u)*.5);if(okI(im))g.drawImage(im,-s/2,-s/2,s,s);g.restore();});
   const fl=t>.95&&t<1.5?1-(t-.95)/.55:0;if(fl>0&&!quiet()){g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(cx,cy,0,cx,cy,60+(1-fl)*W2);gr.addColorStop(0,'rgba(255,255,255,'+Math.min(.5,fl)+')');gr.addColorStop(.4,d.color+'88');gr.addColorStop(1,d.color+'00');g.fillStyle=gr;g.fillRect(0,0,W2,H2);g.restore();}
   if(t>1){const v=e((t-1)/.6),s=Math.min(260,W2*.7)*(.7+.3*v);g.globalAlpha=v;if(okI(ic))g.drawImage(ic,cx-s/2,cy-s/2,s,s);else if(okI(at)){const cw=at.naturalWidth/6,ch=at.naturalHeight/2;g.drawImage(at,d.ring*cw,0,cw,ch,cx-s/2,cy-s/2,s,s);}else{const h=s*.62;if(okI(pa))g.drawImage(pa,cx-h*.8,cy-h/2,h,h);if(okI(pb))g.drawImage(pb,cx-h*.2,cy-h/2,h,h);}g.globalAlpha=1;}
   if(t>1.2){g.fillStyle='#ffd56a';g.textAlign='center';g.font="900 22px 'Be Vietnam Pro',sans-serif";g.fillText(d.name.toUpperCase(),cx,H2*.78);g.fillStyle='#bfe9ff';g.font="600 13px 'Be Vietnam Pro',sans-serif";g.fillText(d.parents.map(nameOf).join('  ✚  '),cx,H2*.78+24);g.fillText('Chạm để tiếp tục',cx,H2*.78+50);}
   if(t<4&&!rv.hidden)requestAnimationFrame(step);else rv.hidden=true;};
  rv.onclick=()=>{if(performance.now()-t0>600)rv.hidden=true;};requestAnimationFrame(step);}
 // ảnh SSS cho ô trang bị (sảnh, kho chiến cơ)
 function slotPic(kind){const d=activeDef(kind);if(!d||d.tier!=='sss')return '';return pic(d,52);}
