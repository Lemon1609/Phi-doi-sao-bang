'use strict';
// V309 Lượt 9B · BỎ THANH 5 TAB · ĐẦU TRANG 2 TẦNG DÙNG CHUNG · BUỒNG LÁI SẢNH · KHO ĐỒ RỘNG KIỂU ẢNH MẪU
//  Tắt toàn bộ: window.UX9B=false (quay về bố cục Lượt 9 + thanh 5 tab).
//  - #hdr9 (mọi màn ngoài trận: Sảnh / Kho / Bản đồ / Hub): tầng 1 = Thể lực · Hợp kim · Kim cương;
//    tầng 2 = SẢNH · NHIỆM VỤ · PHÚC LỢI · BỘ SƯU TẬP + CỬA HÀNG (vàng). SẢNH về Sảnh từ mọi màn.
//  - Sảnh: sân khấu rộng (bỏ bảng lực chiến, nhãn Bạo Tẩu, nút nền), 1 dòng tên tàu + Tổng Lực Chiến · Sát thương;
//    dải mỏng Avatar · Danh hiệu · Phi công + BỘ 1|2|3|LƯU; buồng lái 2 tầng: Bách khoa · PHI CÔNG | KHO ĐỒ · Cài đặt,
//    VÔ TẬN (đỏ cam) · CHIẾN ĐẤU (vàng → bảng chọn Ải / Tháp Boss / Thử thách ngày / Tuần tra / Viễn chinh / Phó bản).
//  - Kho: sân khấu canvas tàu bắn đạn + 2 tàu con + tên lửa, ‹ › đổi tàu, lực chiến + 4 dòng chỉ số có icon, TRANG PHỤC ›,
//    1 dòng huy hiệu Cộng hưởng/Đá khảm (chạm mở chi tiết), 3 nút VKTT · CHIẾN THẦN · ĐÁ KHẢM, 4 ô Lv.XX/YY (chạm = Cường hóa),
//    đáy TÚI ĐỒ · CƯỜNG HÓA · CẢI TẠO.
const L9B309=(()=>{
 const on=()=>window.UX9B!==false&&window.UX9!==false;const $=s=>document.querySelector(s);
 const IC=k=>typeof ICON74!=='undefined'&&ICON74[k]?`<img src="${ICON74[k]}" alt="">`:'';
 const toastS=s=>{try{toast(s);}catch{}};
 const modeOf=()=>{try{return mode;}catch{return 'menu';}};
 const vis=e=>!!e&&!e.hidden&&getComputedStyle(e).display!=='none';
 const shortN=v=>{v=+v||0;const f=(x,u)=>(Math.floor(x*10)/10).toLocaleString('vi-VN')+u;return v>=1e9?f(v/1e9,'B'):v>=1e6?f(v/1e6,'M'):v>=1e5?f(v/1e3,'K'):Math.floor(v).toLocaleString('vi-VN');};
 const fgo=id=>{try{const f=Nav74.F[id];if(!f)return;if(f.lk&&!f.lk()){toastS(f.n+' MỞ Ở ẢI '+f.lv);return;}f.go();}catch{}};
 const closeAll=()=>{try{Nav74.closeAll();}catch{}try{NC307.close();}catch{}try{KHO307.close();}catch{}document.querySelectorAll('.m63:not(.g74keep),#m40,#nav74p,#w74,#cd9,#cp9').forEach(e=>e.hidden=true);const h=$('#hub9');if(h){h.hidden=true;document.documentElement.classList.remove('hub9on');}};
 // ---------- đầu trang 2 tầng ----------
 let hdr=null,hk='';
 function header(){const H=document.documentElement;const ok=on();H.classList.toggle('ux9b',ok);
   let cur='home';try{cur=Nav74.state().cur;}catch{}H.classList.toggle('n9strip',ok&&(cur==='equip'||cur==='combat'));
   if(!ok){if(hdr)hdr.hidden=true;return;}
   if(!hdr){hdr=document.createElement('div');hdr.id='hdr9';hdr.hidden=true;document.body.appendChild(hdr);
     hdr.innerHTML=`<div class="r9a"><div class="ch9 en"><i>${IC('icon_stamina')||IC('res_da_nang_cap')}</i><b data-v="en">0</b><button type="button" data-h9b="en">+</button></div><div class="ch9 cr"><i>${IC('res_hop_kim')}</i><b data-v="cr">0</b><button type="button" data-h9b="cr">+</button></div><div class="ch9 dm"><i>${IC('res_kim_cuong')}</i><b data-v="dm">0</b><button type="button" data-h9b="dm">+</button></div></div>
      <div class="r9b"><button type="button" class="q9" data-h9b="home"><i>${IC('tab_sanh')}</i><small>SẢNH</small></button><button type="button" class="q9" data-h9b="mis"><i>${IC('ic_nhiem_vu')}</i><small>NHIỆM VỤ</small><em></em></button><button type="button" class="q9" data-h9b="pl"><i>${IC('ic_qua')}</i><small>PHÚC LỢI</small><em></em></button><button type="button" class="q9" data-h9b="bst"><i>${IC('ic_thanh_tuu')}</i><small>BỘ SƯU TẬP</small></button><button type="button" class="sh9" data-h9b="shop"><i>${IC('tab_cua_hang')}</i><b>CỬA HÀNG</b></button></div>`;
     try{const im=(window.UI307_IMG||{});for(const [c,k] of [['en','icon_stamina'],['dm','icon_diamond']])if(im[k])hdr.querySelector('.ch9.'+c+' i').innerHTML=`<img src="${im[k]}" alt="">`;}catch{}
     hdr.addEventListener('click',e=>{const b=e.target.closest('[data-h9b]');if(!b)return;e.stopPropagation();const k=b.dataset.h9b;
       if(k==='en'){const x=document.querySelector('.en75');if(x)x.click();}
       else if(k==='cr'||k==='dm'){try{Trade67.open();}catch{}}
       else if(k==='home'){closeAll();try{Nav74.tab('home');}catch{}}
       else if(k==='mis'){closeAll();if(window.UX11!==false&&window.HUB11!==false&&typeof L9309!=='undefined'&&L9309.H.mis){try{NC307.close();KHO307.close();}catch{}try{L9309.open('mis');}catch{}}else try{Q77.open('d');}catch{}}
       else if(k==='pl'||k==='bst'){try{NC307.close();KHO307.close();}catch{}try{L9309.open(k);}catch{}}
       else if(k==='shop'){closeAll();if(window.UX11!==false&&window.HUB11!==false&&typeof L9309!=='undefined'&&L9309.H.shop){try{NC307.close();KHO307.close();}catch{}try{L9309.open('shop');}catch{}}else try{Nav74.tab('shop');}catch{}}});}
   const show=modeOf()==='menu'&&(vis($('#hgr41'))||vis($('#hub40'))||vis($('#cmap')));hdr.hidden=!show;H.classList.toggle('hdr9on',show);if(!show)return;
   let en='',cr=0,dm=0;try{const e=document.querySelector('#hgr41 .gem74 [data-en75]');en=e?e.textContent+'/120':'';}catch{}if(!en)try{en=document.querySelector('#hgr41 .en8v').textContent;}catch{}
   try{cr=Progress.balance();}catch{}try{dm=Econ74.gems();}catch{}
   let I=[];try{I=Cot307.items();}catch{}const d=k=>{const x=I.find(y=>y.k===k);return !!(x&&x.dot&&!x.lk);};
   const key=en+'|'+cr+'|'+dm+'|'+d('missions')+(d('daily')||d('gifts')||d('wheel')||d('season'))+cur;if(key===hk)return;hk=key;
   hdr.querySelector('[data-v=en]').textContent=en;hdr.querySelector('[data-v=cr]').textContent=shortN(cr);hdr.querySelector('[data-v=dm]').textContent=shortN(dm);
   const u11=window.UX11!==false&&window.HUB11!==false;hdr.querySelector('[data-h9b=mis] em').hidden=!(d('missions')||(u11&&d('season')));hdr.querySelector('[data-h9b=pl] em').hidden=!(d('daily')||d('gifts')||(!u11&&(d('wheel')||d('season'))));
   hdr.querySelector('[data-h9b=home]').classList.toggle('on',cur==='home'&&vis($('#hgr41')));}
 // ---------- Sảnh: dòng tên tàu + buồng lái ----------
 let pass=false;
 function lobby(){if(!on())return;const r=$('#hgr41');if(!r||!vis(r))return;const stg=r.querySelector('.h1-stage'),lb=r.querySelector('#lb68');if(!stg||!lb)return;
   let nm=stg.querySelector('.nm9');if(!nm){nm=document.createElement('div');nm.className='nm9';stg.appendChild(nm);}
   const sn=(()=>{try{return document.getElementById('lb68-ship').textContent;}catch{return '';}})(),cp=(()=>{try{return document.getElementById('h1-cp').textContent;}catch{return '';}})(),dg=(()=>{try{return document.getElementById('h1-dmg').textContent;}catch{return '';}})();
   const t=`<b>${sn}</b><small>Tổng Lực Chiến <i>${cp}</i> · Sát thương <i>${dg}</i></small>`;if(nm.dataset.k!==t){nm.dataset.k=t;nm.innerHTML=t;}
   let ck=lb.querySelector('.ck9');if(!ck){ck=document.createElement('div');ck.className='ck9';
     ck.innerHTML=`<button type="button" class="rd9" data-ck9="codex"><i>${IC('ic_thanh_tuu')}</i><small>BÁCH KHOA</small></button><button type="button" class="bv9 l" data-ck9="pilot"><i>${IC('ic_phi_cong')}</i><b>PHI CÔNG</b></button><button type="button" class="bv9 r" data-ck9="kho"><i>${IC('tab_kho')}</i><b>KHO ĐỒ</b></button><button type="button" class="rd9" data-ck9="gear"><i>${IC('ic_cai_dat')}</i><small>CÀI ĐẶT</small></button>`;
     ck.addEventListener('click',e=>{const b=e.target.closest('[data-ck9]');if(!b)return;e.stopPropagation();const k=b.dataset.ck9;
       if(k==='codex'){try{L7309.open();}catch{}}else if(k==='pilot')fgo('pilot');else if(k==='kho'){try{Nav74.tab('equip');}catch{}}else if(k==='gear'){try{Nav74.page('gear');}catch{}}});
     const cta=lb.querySelector('.lb68-cta');lb.insertBefore(ck,cta||null);}
   const cc=lb.querySelector('.lb68-cta .cta.c');if(cc&&!cc.dataset.b9){cc.dataset.b9=1;cc.addEventListener('click',e=>{if(pass||!on())return;e.stopPropagation();e.stopImmediatePropagation();e.preventDefault();if(window.QOL10!==false){try{Nav74.tab('combat');}catch{}return;}chooser();},true);}}
 // ---------- bảng chọn CHIẾN ĐẤU ----------
 let cd=null;
 function chooser(){if(!cd){cd=document.createElement('div');cd.id='cd9';cd.hidden=true;document.body.appendChild(cd);
     cd.addEventListener('click',e=>{if(e.target===cd||e.target.closest('[data-cd9x]')){cd.hidden=true;return;}const b=e.target.closest('[data-cd9]');if(!b)return;e.stopPropagation();const k=b.dataset.cd9;
       if(b.classList.contains('lk')){toastS(b.dataset.msg||'Chưa mở');return;}cd.hidden=true;
       if(k==='go'){const c=$('#lb68 .lb68-cta .cta.c');pass=true;try{c&&c.click();}finally{pass=false;}}else if(k==='map'){try{Nav74.tab('combat');}catch{}}else if(k==='chal'){try{Nav74.page('challenge');}catch{}}else fgo(k);});}
   const st=(()=>{try{return document.getElementById('lb68-stage').textContent;}catch{return '';}})();
   const F=(()=>{try{return Nav74.F;}catch{return {};}})(),lk=id=>{const f=F[id];return !!(f&&f.lk&&!f.lk());};
   const card=(k,ic,n,d)=>{const L=lk(k);return `<button type="button" data-cd9="${k}" class="${L?'lk':''}" data-msg="${L?(F[k].n+' MỞ Ở ẢI '+F[k].lv):''}"><i>${IC(ic)}</i><b>${n}</b><small>${L?'🔒 Mở ở ải '+F[k].lv:d}</small></button>`;};
   cd.innerHTML=`<div class="cd9c"><div class="cd9h"><b>CHIẾN ĐẤU</b><button type="button" data-cd9x="1" aria-label="Đóng">✕</button></div>
    <button type="button" class="cd9go" data-cd9="go"><b>XUẤT KÍCH</b><small>${st||'Ải kế tiếp'} · vào trận ngay</small></button>
    <div class="cd9g">${card('map','tab_ban_do','BẢN ĐỒ ẢI','Chọn ải · gom sao')}${card('tower','ic_thap_boss','THÁP BOSS','Leo tầng · boss mạnh dần')}${card('daily','ic_thu_thach','THỬ THÁCH NGÀY','Luật đặc biệt mỗi ngày')}${card('patrol','ic_tuan_tra','TUẦN TRA','Thưởng treo theo giờ')}${card('expedition','ic_vien_chinh','VIỄN CHINH','Phái đội làm nhiệm vụ')}${card('dungeon','ic_nguyen_lieu','PHÓ BẢN','Hợp kim · trang bị · vật liệu')}</div>
    <button type="button" class="cd9more" data-cd9="chal">Mọi chế độ thử thách ›</button></div>`;
   cd.hidden=false;}
 // ---------- Kho ----------
 const FORM=['thuong','luc','lam','lam','lam','lam','tim','tim','tim','tim','tim','tim5'];
 let K={c:null,raf:0,b:[],pb:[],m:[],fx:[],sh:0,ps:0,ms:.4,lt:0,im:null,src:'',pod:null,mis:null,st:null};
 const lcOf=()=>{try{return typeof launchCraft==='number'?launchCraft:(selected|0);}catch{return 0;}};
 const owned=()=>{const o=[];for(let i=0;i<13;i++){try{if(Campaign36.ownsCraft(i))o.push(i);}catch{}}return o;};
 function shipSrc(i){try{const n=V70.craftN(i)|0,S=SHIP118[String(i)];return S[FORM[n]]||S.tim||S.thuong||'';}catch{return '';}}
 function gearIm(kind){try{const it=(gear.equipment||[]).find(x=>x.kind===kind);const v=it&&it.variant;if(!window.TB309)return null;if(kind==='sidearm')return TB309.img('pod_'+v)||TB309.img('pod_disc');const M={inferno:'c_m_inferno',cryo:'c_m_cryo',thunder:'c_m_thunder',singularity:'c_m_singularity',spiral:'c_m_spiral',stellar:'c_m_stellar'};return TB309.img(M[v]||'c_m_inferno');}catch{return null;}}
 const okIm=im=>im&&im.complete!==false&&(im.naturalWidth||im.width);
 function shipCol(i){try{return Fighters28.profiles[i].color||'#7dd3fc';}catch{return '#7dd3fc';}}
 function loop(){const c=K.c;if(!c||!c.isConnected||!vis($('#hub40'))||!on()){K.raf=0;return;}K.raf=requestAnimationFrame(loop);
   const W=c.clientWidth,H=c.clientHeight;if(!W||!H)return;const dpr=Math.min(2,window.devicePixelRatio||1);if(c.width!==Math.round(W*dpr)){c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);}
   const g=c.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);const t=performance.now()/1000,dt=Math.min(.05,K.lt?t-K.lt:.016);K.lt=t;
   if(!K.st)K.st=Array.from({length:46},()=>({x:Math.random(),y:Math.random(),v:.03+Math.random()*.09,a:.25+Math.random()*.6,s:Math.random()<.2?2:1}));
   for(const s of K.st){s.y+=s.v*dt;if(s.y>1)s.y=0;g.fillStyle=`rgba(205,228,255,${s.a})`;g.fillRect(s.x*W,s.y*H,s.s,s.s);}
   const lc=lcOf(),src=shipSrc(lc);if(src!==K.src){K.src=src;K.im=new Image();K.im.src=src;K.pod=gearIm('sidearm');K.mis=gearIm('missiles');}
   const col=shipCol(lc),x=W/2+Math.sin(t*.9)*W*.06,y=H*.66+Math.sin(t*1.9)*5,S=Math.min(W*.46,H*.5);
   // nền bệ
   g.save();g.globalAlpha=.55;g.strokeStyle=col;g.lineWidth=1.5;g.beginPath();g.ellipse(W/2,H*.66+S*.42,S*.7,S*.13,0,0,Math.PI*2);g.stroke();g.globalAlpha=.25;g.beginPath();g.ellipse(W/2,H*.66+S*.42,S*.95,S*.18,0,0,Math.PI*2);g.stroke();g.restore();
   K.sh-=dt;if(K.sh<=0){K.sh=.12;K.b.push({x:x-S*.07,y:y-S*.36},{x:x+S*.07,y:y-S*.36});}
   K.ps-=dt;if(K.ps<=0){K.ps=.3;K.pb.push({x:x-S*.62,y:y-S*.1},{x:x+S*.62,y:y-S*.1});}
   K.ms-=dt;if(K.ms<=0){K.ms=1.3;K.m.push({x:x-S*.3,y:y-S*.2,vx:-110,vy:-120,a:0},{x:x+S*.3,y:y-S*.2,vx:110,vy:-120,a:0});}
   g.save();g.globalCompositeOperation='lighter';
   for(const b of K.b){b.y-=620*dt;const L=26;const gr=g.createLinearGradient(b.x,b.y-L/2,b.x,b.y+L/2);gr.addColorStop(0,'#ffffff');gr.addColorStop(.35,col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.ellipse(b.x,b.y,3.4,L/2,0,0,Math.PI*2);g.fill();if(b.y<20){b.dead=1;K.fx.push({x:b.x,y:22,t:0});}}
   for(const b of K.pb){b.y-=480*dt;g.fillStyle='rgba(125,211,252,.9)';g.beginPath();g.ellipse(b.x,b.y,2.6,8,0,0,Math.PI*2);g.fill();if(b.y<10)b.dead=1;}
   for(const f of K.fx){f.t+=dt;g.globalAlpha=Math.max(0,1-f.t/.25);g.strokeStyle=col;g.lineWidth=2;g.beginPath();g.arc(f.x,f.y,4+f.t*60,0,Math.PI*2);g.stroke();if(f.t>.25)f.dead=1;}
   g.globalAlpha=1;g.restore();K.b=K.b.filter(b=>!b.dead);K.pb=K.pb.filter(b=>!b.dead);K.fx=K.fx.filter(f=>!f.dead);
   const mim=okIm(K.mis)?K.mis:null;for(const m of K.m){m.a+=dt;const k=Math.min(1,m.a*2);m.vx+=((W/2-m.x)*2.5-m.vx)*dt*k*2;m.vy+=(-460-m.vy)*dt*k*2;m.x+=m.vx*dt;m.y+=m.vy*dt;
     g.save();g.translate(m.x,m.y);g.rotate(Math.atan2(m.vy,m.vx)+Math.PI/2);g.globalCompositeOperation='lighter';g.fillStyle='rgba(251,146,60,.55)';g.beginPath();g.ellipse(0,14,4,12,0,0,Math.PI*2);g.fill();g.globalCompositeOperation='source-over';
     if(mim){const iw=mim.naturalWidth||mim.width,ih=mim.naturalHeight||mim.height,L=30,w=L*iw/ih;g.drawImage(mim,-w/2,-L/2,w,L);}else{g.fillStyle='#fde68a';g.fillRect(-2,-9,4,18);}g.restore();if(m.y<16){m.dead=1;K.fx.push({x:m.x,y:20,t:0});}}K.m=K.m.filter(m=>!m.dead);
   const pim=okIm(K.pod)?K.pod:null;if(pim){const iw=pim.naturalWidth||pim.width,ih=pim.naturalHeight||pim.height,s=S*.24/Math.max(iw,ih);for(const sd of [-1,1]){const px=x+sd*S*.62,py=y+S*.02+Math.sin(t*2.4+sd)*3;g.drawImage(pim,px-iw*s/2,py-ih*s/2,iw*s,ih*s);}}
   if(okIm(K.im)){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.5;g.fillStyle=col;g.beginPath();g.ellipse(x-S*.08,y+S*.4,4,14+Math.sin(t*30)*3,0,0,Math.PI*2);g.ellipse(x+S*.08,y+S*.4,4,14+Math.cos(t*30)*3,0,0,Math.PI*2);g.fill();g.restore();g.drawImage(K.im,x-S/2,y-S/2,S,S);}}
 function switchShip(d){const o=owned();if(o.length<2)return;const i=o.indexOf(lcOf());const n=o[((i<0?0:i)+d+o.length)%o.length];try{selectCraft(n);}catch{}}
 let pop=null;
 function badgePop(){const card=document.querySelector('#hb-body.k307 .m7-card');if(!card)return;if(!pop){pop=document.createElement('div');pop.id='cp9';pop.hidden=true;document.body.appendChild(pop);pop.addEventListener('click',e=>{if(e.target===pop||e.target.closest('[data-cp9x]'))pop.hidden=true;});}
   pop.innerHTML=`<div class="cp9c"><div class="cd9h"><b>CỘNG HƯỞNG · ĐÁ KHẢM</b><button type="button" data-cp9x="1" aria-label="Đóng">✕</button></div><div class="cp9b">${card.innerHTML}</div></div>`;pop.hidden=false;}
 function kho(){if(!on())return;const body=document.getElementById('hb-body');if(!body||!body.classList.contains('k307'))return;const doll=body.querySelector(':scope>.hb-doll');if(!doll)return;
   doll.classList.add('d9b');
   let sg=doll.querySelector('.stg9');if(!sg){sg=document.createElement('div');sg.className='stg9';sg.innerHTML='<canvas></canvas><button type="button" class="ar9 l" data-ar9="-1">‹</button><button type="button" class="ar9 r" data-ar9="1">›</button><div class="np9"></div>';doll.insertBefore(sg,doll.firstChild);K.c=sg.querySelector('canvas');
     sg.addEventListener('click',e=>{const b=e.target.closest('[data-ar9]');if(b){e.stopPropagation();switchShip(+b.dataset.ar9);}});
     doll.addEventListener('click',e=>{const s=e.target.closest('.hb-slot');if(!s||!on())return;const cs=s.classList.contains('c9ship'),k=s.dataset.k307k;setTimeout(()=>{try{if(cs)NC307.open('craft:'+lcOf());else{const id=(Progress.v70.equipped()||{})[k];if(id)NC307.open(id);}}catch{}},30);});}
   for(const c of ['.c9st','.c9tp'])if(doll.querySelector(':scope>'+c))sg.appendChild(doll.querySelector(':scope>'+c));
   if(window.WING10&&window.ANIM10!==false){if(!K.s10||K.s10.c!==K.c){const pod={},gi=k=>{const i=gearIm(k);return i;};K.s10=WING10.Stage(K.c,{visible:()=>vis($('#hub40'))&&on()&&window.ANIM10!==false,get:()=>{const lc=lcOf();return {src:shipSrc(lc),col:shipCol(lc),pod:gi('sidearm'),mis:gi('missiles'),bb:WING10.bbOf(lc),arc:!!window.__arc10,key:'kho'};}});}if(vis($('#hub40')))K.s10.start();}
   else if(!K.raf&&vis($('#hub40')))K.raf=requestAnimationFrame(loop);
   let tn='';try{tn=TIER70.name[V70.craftN(lcOf())|0]||'';}catch{}let nm='';try{nm=Fighters28.profiles[lcOf()].name;}catch{}const np=sg.querySelector('.np9'),nt=`${nm}${tn?' · '+tn:''}`;if(np.textContent!==nt)np.textContent=nt;
   const st=sg.querySelector('.c9st');if(st&&!st.dataset.b9){st.dataset.b9=1;}
   if(st){let cp=0;try{cp=Combat.stats().cp;}catch{}const ics=['tab_chien_co','ic_trang_bi_sss','hud_missile','ic_phu_tro'];let h=st.querySelector('.cp9');if(!h){h=document.createElement('div');h.className='cp9';st.insertBefore(h,st.firstChild);}const ht=`<small>TỔNG LỰC CHIẾN</small><b>${Math.round(cp).toLocaleString('vi-VN')}</b>`;if(h.innerHTML!==ht)h.innerHTML=ht;
     [...st.querySelectorAll(':scope>span')].forEach((s,i)=>{if(s.querySelector('.ic9'))return;let src='';try{src=ICON74[ics[i]]||'';}catch{}if(!src&&i===2)try{const m=TB309.img('c_m_inferno');src=m&&(m.src||(m.toDataURL&&m.toDataURL()))||'';}catch{}s.insertAdjacentHTML('afterbegin',src?`<img class="ic9" src="${src}" alt="">`:'<i class="ic9"></i>');});}
   // huy hiệu cộng hưởng
   const card=body.querySelector(':scope>.m7-card');let bd=doll.querySelector(':scope>.cb9');if(card){if(!bd){bd=document.createElement('button');bd.type='button';bd.className='cb9';bd.addEventListener('click',e=>{e.stopPropagation();badgePop();});doll.appendChild(bd);}
     const set=(card.querySelector('.m7-h span')||{}).textContent||'',on_=card.querySelectorAll('.m7-list li.on').length,sn=(card.querySelector('.m7-h.sub span')||{}).textContent||'';const t=`<i>◆</i><span>Cộng hưởng: <b>${set||'—'}</b> · ${on_} hiệu ứng</span><span>Đá khảm <b>${sn||'0 viên'}</b></span><em>›</em>`;if(bd.dataset.k!==t){bd.dataset.k=t;bd.innerHTML=t;}}
   const bar=body.querySelector(':scope>.c9bar');if(bar&&!bar.dataset.b9){bar.dataset.b9=1;const u=bar.querySelector('.up');if(u)u.innerHTML='CƯỜNG HÓA';const c=bar.querySelector('.cai');if(c)c.innerHTML='CẢI TẠO';const g=bar.querySelector('.bag small');if(g)g.textContent='TÚI ĐỒ';}
   const sc=doll.querySelector('.c9sc');if(sc&&!sc.dataset.b9){sc.dataset.b9=1;const bs=sc.querySelectorAll('button');if(bs[0])bs[0].querySelector('small').textContent='VKTT';}
   // ô đang mặc: nhãn Lv.XX/YY
   doll.querySelectorAll('.hb-slot small').forEach(s=>{const t=s.textContent;if(/^Lv \d/.test(t))s.textContent=t.replace(/^Lv (\d+)(\/\d+)?/,(m,a,b)=>'Lv.'+a+(b||''));});}
 setInterval(()=>{try{header();lobby();kho();}catch(e){}},300);
 function quick(){const c=$('#lb68 .lb68-cta .cta.c');pass=true;try{c&&c.click();}finally{pass=false;}}
 return {header,lobby,kho,chooser,switchShip,badgePop,quick};
})();
