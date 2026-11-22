'use strict';
// V309 Lượt 11 (chủ dự án 22/11) · tắt toàn bộ: window.UX11=false
//  P1 Tiếp tế chiến thuật trước Vô tận (mua bằng Hợp kim ◈): Đột kích bỏ 15 đợt · Khiên khởi đầu · Hồi sinh khẩn cấp (tắt riêng EP11)
//  P2 Màn Phi công gọn: 4 ô đội trên · chân dung nửa người + tổng chỉ số đội · NÂNG CẤP / ĐỘT PHÁ (tắt riêng PL11)
//  P3 Gom thanh tab đầu trang: NHIỆM VỤ (Nhiệm vụ ngày + Chiến lệnh) · PHÚC LỢI (Điểm danh | Quà | Quỹ) · KHO BÁU (Rương | Vòng quay | Chợ Đen | Bách khoa) · BỘ SƯU TẬP (Trang phục | Cốt truyện | Thành tựu) (tắt riêng HUB11)
//  P4 Chế độ ANH HÙNG trên bản đồ chòm sao: ★ riêng, quái/boss trâu hơn, thưởng cao hơn (không kim cương), Càn quét nhanh nhận ải AH 3★ (tắt riêng HERO11)
//  + Tên lửa kiểu cũ (shot 'missile' không có art28: tên lửa phụ gear.missile / thiên thần / tinh thể) vẽ gọn theo màu tàu, bỏ lõi trắng + vệt trắng xoáy (tắt riêng SW11)
const L11309=(()=>{
 const on=()=>window.UX11!==false;
 const ok=k=>on()&&window[k]!==false;
 const $=s=>document.querySelector(s);
 const fmt=n=>Math.round(n||0).toLocaleString('vi-VN');
 const T=m=>{try{toast(m);}catch{}};
 const rd=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k)||'null');return v&&typeof v==='object'?v:d;}catch{return d;}};
 const wr=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};
 const vis=e=>!!(e&&!e.hidden&&e.getClientRects().length&&getComputedStyle(e).display!=='none');
 const md=()=>{try{return mode;}catch{return '';}};
 const gm=()=>{try{return gameMode;}catch{return '';}};
 const bal=()=>{try{return Progress.balance();}catch{return 0;}};
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 function modal(cls){let el=document.querySelector('.m63.'+cls);if(!el){el=document.createElement('div');el.className='m63 '+cls;el.hidden=true;el.innerHTML='<div class="m63-card"></div>';document.body.appendChild(el);}return el;}

 // =================== P1 · TIẾP TẾ CHIẾN THUẬT (Vô tận) ===================
 const EP=window.EP11CFG={
  skip:{n:'ĐỘT KÍCH',d:'Bỏ qua 15 đợt đầu, nhận đủ điểm 15 đợt đó',c:1200,need:20,ic:'⇧'},
  shield:{n:'KHIÊN KHỞI ĐẦU',d:'Vào trận với 1 lớp khiên chặn 1 đòn',c:300,ic:'⬡'},
  rev:{n:'HỒI SINH KHẨN CẤP',d:'Tự hồi sinh 1 lần (đầy máu) + xóa sạch đạn',c:600,ic:'✚'}};
 let epSel={skip:false,shield:false,rev:false},pend=null,bypass=0;
 const best=()=>{try{return Campaign36.getState().endlessBest|0;}catch{return 0;}};
 function skipScore(){let s=0;for(let l=1;l<=15;l++){s+=(l%5===0?2500:500)*l;let n=30;try{n=Waves30.budget(0,l)|0||30;}catch{}s+=n*100;}return s;}
 function epTotal(){let t=0;for(const k in EP)if(epSel[k])t+=EP[k].c;return t;}
 function epRender(){const el=modal('ep11'),c=el.querySelector('.m63-card'),b=best();let oc=null,h=0;try{oc=Q10309.oc();h=Q10309.ocHits();}catch{}
  if(b<EP.skip.need)epSel.skip=false;const tot=epTotal(),have=bal();
  c.innerHTML=`<div class="m63-eye">TIẾP TẾ CHIẾN THUẬT</div><button class="m63-x" data-ep="x" aria-label="Đóng">×</button>
   <div class="ep11h"><b>VÔ TẬN</b><small>KỶ LỤC ĐỢT <em>${b}</em></small></div>
   ${oc&&window.OC10!==false?`<button type="button" class="ep11oc" data-ep="oc"><i>ϟ</i><span><b>SIÊU TẦN TUẦN · ${h}/4 món</b><small>${h?'+'+(h*10)+'% điểm · +'+(Math.round(h*2.5*10)/10).toLocaleString('vi-VN')+'% công':'Dùng món ϟ của tuần để được thưởng điểm'}</small></span><u>XEM ›</u></button>`:''}
   <p class="ep11n">Chọn tối đa 3 tiếp tế, trả bằng Hợp kim trước khi xuất kích. Chỉ áp dụng cho 1 lượt.</p>
   <div class="ep11l">${Object.keys(EP).map(k=>{const e=EP[k],lk=k==='skip'&&b<e.need;return `<button type="button" class="ep11r${epSel[k]?' on':''}${lk?' lk':''}" data-ep="t" data-v="${k}" ${lk?'disabled':''}><i>${e.ic}</i><span><b>${e.n}</b><small>${lk?'Mở khi kỷ lục ≥ đợt '+e.need:e.d}</small></span><em>${fmt(e.c)} ◈</em><kbd class="ck11"></kbd></button>`;}).join('')}</div>
   <div class="ep11t"><span>TỔNG</span><b class="${tot>have?'no':''}">${fmt(tot)} ◈</b><small>Đang có ${fmt(have)} ◈</small></div>
   <div class="ep11a"><button type="button" class="ep11c" data-ep="x">HỦY</button><button type="button" class="ep11g" data-ep="go">XUẤT KÍCH</button></div>`;}
 function epOpen(btn){const el=modal('ep11');if(!el.__w){el.__w=1;el.addEventListener('click',e=>{if(e.target===el){el.hidden=true;return;}const b=e.target.closest('[data-ep]');if(!b)return;e.stopPropagation();const k=b.dataset.ep;
    if(k==='x'){el.hidden=true;return;}if(k==='oc'){try{Q10309.ocPop();}catch{}return;}
    if(k==='t'){const v=b.dataset.v;epSel[v]=!epSel[v];epRender();return;}
    if(k==='go'){const tot=epTotal();if(tot>bal()){T('THIẾU HỢP KIM CHO TIẾP TẾ');return;}let paid=true;if(tot>0){try{paid=Progress.spendCredits(tot)!==false;}catch{paid=false;}}if(!paid){T('KHÔNG TRỪ ĐƯỢC HỢP KIM');return;}
     pend=tot>0?{skip:epSel.skip,shield:epSel.shield,rev:epSel.rev,paid:tot,t:Date.now()}:null;el.hidden=true;try{Progress.render();}catch{}bypass=1;try{el.__btn.click();}finally{bypass=0;}setTimeout(()=>{if(pend&&!pend.live&&md()!=='play'){try{Progress.grantCredits(pend.paid);}catch{}pend=null;T('CHƯA VÀO TRẬN · ĐÃ HOÀN HỢP KIM');}},2500);}});}
  el.__btn=btn;epRender();el.hidden=false;}
 document.addEventListener('click',e=>{if(bypass||!ok('EP11'))return;const b=e.target.closest&&e.target.closest('#lb68 [data-lb68="endless"]');if(!b)return;
  try{if(md()==='play')return;}catch{}e.stopPropagation();e.preventDefault();epOpen(b);},true);
 function epTick(){if(!pend)return;const m=md();
  if(m==='play'&&gm()==='endless'){if(!pend.live){pend.live=1;
    if(pend.skip){try{if(level<16){const add=skipScore();level=16;enemies=[];bullets=[];try{beams=[];}catch{}try{Waves30.reset();}catch{}try{endlessWave=0;endlessSpawned=0;endlessGap=.5;}catch{}score+=add;try{Progress.render();}catch{}T('ĐỘT KÍCH · VÀO THẲNG ĐỢT 16 · +'+fmt(add)+' ĐIỂM');}}catch{}}
    if(pend.shield){try{Shield78.grant('start');}catch{}try{bulletShieldTime=Math.max(bulletShieldTime||0,600);}catch{}setTimeout(()=>T('KHIÊN KHỞI ĐẦU · CHẶN 1 ĐÒN'),pend.skip?1600:0);}
    if(pend.rev)setTimeout(()=>T('HỒI SINH KHẨN CẤP · SẴN SÀNG 1 LẦN'),pend.skip||pend.shield?3200:0);}}
  else if(pend.live&&(m==='menu'||m==='over'||m==='win'||(m==='play'&&gm()!=='endless')))pend=null;}
 function hookRev(){try{if(Revive393.offer.__l11)return;const o=Revive393.offer;const f=function(){try{if(on()&&pend&&pend.live&&pend.rev&&!pend.revUsed&&gm()==='endless'&&md()==='play'){pend.revUsed=1;hp=maxHp;bullets=[];try{beams=[];}catch{}invuln=3;try{VisualFX.ringA(player.x,player.y,'#7dffd0',180);}catch{}try{flash=.25;}catch{}T('HỒI SINH KHẨN CẤP!');try{hud();}catch{}return true;}}catch{}return o.apply(this,arguments);};f.__l11=1;Revive393.offer=f;}catch{}}

 // =================== P2 · MÀN PHI CÔNG GỌN ===================
 let plSlot=0,plPv=null,plMsg='';
 const P=id=>{try{return PILOTS67.find(p=>p.id===id);}catch{return null;}};
 const PS=()=>{try{return Pilot67.state();}catch{return {own:{},team:[],pieces:{},tier:{}};}};
 function art(id){try{const A=typeof TRANH307!=='undefined'?TRANH307:{};if(A['phi_cong_'+id])return A['phi_cong_'+id];}catch{}try{return PILOT_ART['p'+id]||'';}catch{return '';}}
 function face(id){try{return PILOT_ART['p'+id]||art(id);}catch{return art(id);}}
 const costTxt=c=>[c.c?fmt(c.c)+' ◈':'',c.e?fmt(c.e)+' ⬢':'',c.core?c.core+' lõi':''].filter(Boolean).join(' · ');
 function plRender(){const el=modal('pl11'),card=el.querySelector('.m63-card'),S=PS(),team=(S.team||[]).slice(0,4);while(team.length<4)team.push(null);
  const sel=plPv!=null?plPv:team[plSlot],p=sel!=null?P(sel):null,o=p?S.own[p.id]:null,t=(()=>{try{return Pilot67.teamStats();}catch{return {atk:0,hp:0,sh:0};}})(),cp=Math.round(t.atk*24+t.hp*55+t.sh*65);
  let tier=null,lv=0,cap=0,tc=null,lc=null,pcs=0,TI=null;if(p&&o){try{tier=Pilot67.tierOf(p.id);TI=PILOT75.tiers[tier];cap=Pilot67.capOf(p.id);tc=Pilot67.tierCost(p.id);lc=Pilot67.lvCost(o.lv);}catch{}lv=o.lv;pcs=(S.pieces||{})[p.id]|0;}
  const psk=(()=>{try{if(!p||!window.PSK307||!PSK307.TXT[p.id])return '';const tt=o?tier:-1,nm=['Lam','Tím','Tím+5'],need=[2,6,11];return PSK307.TXT[p.id].map((x,i)=>`<li class="${tt>=need[i]?'on':''}"><b>${tt>=need[i]?'◆':'◇'} ${nm[i]}</b>${esc(x)}</li>`).join('');}catch{return '';}})();
  const pas=(()=>{try{return p?p.txt(o?Pilot67.passive(p.id):p.a):'';}catch{return '';}})();
  const roster=(()=>{try{return PILOTS67.map(q=>{const own=!!S.own[q.id],inT=team.includes(q.id);return `<button type="button" data-pl="ro" data-v="${q.id}" class="${own?'own':'no'}${inT?' in':''}${q.id===sel?' on':''}" style="--c:${q.col}"><img src="${face(q.id)}" alt=""><small>${esc(q.name.split(' ').pop())}</small></button>`;}).join('');}catch{return '';}})();
  const BE=(window.PL307_IMG||{}).be_phi_cong;
  card.innerHTML=`<div class="m63-eye">ĐỘI PHI CÔNG</div><button class="m63-x" data-pl="x" aria-label="Đóng">×</button>
   <div class="pl11s">${team.map((id,i)=>{const q=id!=null?P(id):null;return `<button type="button" data-pl="slot" data-v="${i}" class="${i?'sub':'main'}${i===plSlot&&plPv==null?' on':''}" style="--c:${q?q.col:'#3b5a7a'}">${q?`<img src="${face(id)}" alt="">`:'<span>+</span>'}<small>${i?'PHỤ '+i:'CHÍNH'}</small></button>`;}).join('')}</div>
   <div class="pl11r">${roster}</div>
   <div class="pl11m">${p?`<div class="pl11a">${BE?`<img class="pl11be" src="${BE}" alt="">`:''}<img class="pl11p" src="${art(p.id)}" alt=""></div>
    <div class="pl11n" style="--c:${p.col}"><b>${esc(p.name)}</b><small>${esc(p.tag||'')} · ${esc(p.rank||'')}</small>${o&&TI?`<em style="--tc:${TI.col}">${TI.n} · Lv.${lv}/${cap}</em>`:'<em class="no">CHƯA CHIÊU MỘ</em>'}</div>
    <div class="pl11t"><b>ĐỘI CỘNG</b><span>+${fmt(cp)} <small>lực chiến</small></span><span>Công tàu <em>+${Math.round(t.atk)}</em></span><span>Máu / Giáp <em>+${(Math.round(t.hp*10)/10).toLocaleString('vi-VN')} / +${(Math.round(t.sh*10)/10).toLocaleString('vi-VN')}</em></span></div>`
    :`<div class="pl11e">Ô ${plSlot?'PHỤ '+plSlot:'CHÍNH'} đang trống.<br>Chạm 1 phi công ở hàng trên để xếp vào.</div>`}</div>
   ${p?`<div class="pl11k"><p><b>BỊ ĐỘNG</b>${esc(pas)}</p>${psk?`<ul><li class="hd"><b>KÍCH HOẠT THEO BẬC</b></li>${psk}</ul>`:''}</div>`:''}
   ${plMsg?`<p class="pl11g">${esc(plMsg)}</p>`:''}
   <div class="pl11b">${p&&o?`<button type="button" class="b11 bl" data-pl="lv" ${lv<cap?'':'disabled'}><b>NÂNG CẤP</b><small>${lv<cap&&lc?costTxt(lc):'Đã trần cấp'}</small></button>
     <button type="button" class="b11 gd" data-pl="tier" ${tc?'':'disabled'}><b>ĐỘT PHÁ</b><small>${tc?`Mảnh <em class="${pcs>=tc.pieces?'ok':'no'}">${fmt(pcs)}/${fmt(tc.pieces)}</em> · ${fmt(tc.c)} ◈`:'ĐÃ TỐI ĐA'}</small></button>`
    :p?`<button type="button" class="b11 gd w" data-pl="rec"><b>CHIÊU MỘ</b><small>Mảnh ${fmt((S.pieces||{})[p.id]|0)}</small></button>`:''}</div>
   <div class="pl11l"><button type="button" data-pl="tree">CÂY TIỀM NĂNG</button><button type="button" data-pl="core">LÕI PHI CÔNG</button>${p&&window.PStory307?`<button type="button" data-pl="story">TRUYỆN</button>`:''}<button type="button" data-pl="old">CHI TIẾT</button></div>`;}
 let oOpen=null;
 function plOpen(){const el=modal('pl11');if(!el.__w){el.__w=1;el.addEventListener('click',e=>{if(e.target===el){el.hidden=true;return;}const b=e.target.closest('[data-pl]');if(!b)return;e.stopPropagation();const k=b.dataset.pl,v=+b.dataset.v;plMsg='';
    const S=PS(),sel=plPv!=null?plPv:(S.team||[])[plSlot];
    if(k==='x'){el.hidden=true;return;}
    if(k==='slot'){plSlot=v;plPv=null;}
    else if(k==='ro'){if(S.own[v]){try{Pilot67.setSlot(plSlot,v);}catch{}plPv=null;}else plPv=v;}
    else if(k==='lv'&&sel!=null){let r;try{r=Pilot67.levelUp(sel);}catch{}plMsg=r||'LÊN CẤP!';}
    else if(k==='tier'&&sel!=null){let r;try{r=Pilot67.tierUp(sel);}catch{}plMsg=r||'ĐỘT PHÁ THÀNH CÔNG!';}
    else if(k==='rec'&&sel!=null){let r=false;try{r=Pilot67.recruit(sel);}catch{}plMsg=r?'ĐÃ CHIÊU MỘ!':'Chưa đủ điều kiện chiêu mộ (xem CHI TIẾT)';if(r)plPv=null;}
    else if(k==='tree'||k==='old'){el.hidden=true;try{oOpen.call(Pilot67);}catch{}if(k==='tree')setTimeout(()=>{const t=document.querySelector('.pl67 [data-x="tab"][data-v="tree"]');t&&t.click();},60);return;}
    else if(k==='core'){try{Core307.open();}catch{T('LÕI PHI CÔNG MỞ Ở ẢI 125');}return;}
    else if(k==='story'){const p=P(sel);try{PStory307.show(p.name);}catch{}return;}
    plRender();});}
  const S=PS();if((S.team||[])[0]==null)plSlot=0;plPv=null;plMsg='';plRender();el.hidden=false;}
 function hookPilot(){try{if(Pilot67.open.__l11)return;oOpen=Pilot67.open;const f=function(){if(ok('PL11')){try{const u=Pilot67.state();if(!u||!u.own||!Object.keys(u.own).length)return oOpen.apply(this,arguments);}catch{}return plOpen();}return oOpen.apply(this,arguments);};f.__l11=1;Pilot67.open=f;}catch{}}

 // =================== P3 · GOM THANH TAB ĐẦU TRANG ===================
 let hubDone=0;
 function hookHub(){if(hubDone||!ok('HUB11'))return;let H=null;try{H=L9309.H;}catch{}if(!H||!H.pl)return;hubDone=1;
  const pl=H.pl.t,find=k=>pl.find(t=>t.k===k);const daily=find('daily'),gifts=find('gifts'),wheel=find('wheel'),season=find('season'),fund=find('fund');
  H.__old={pl:pl.slice(),bst:H.bst&&H.bst.t.slice()};
  H.pl.t=[daily,gifts].filter(Boolean);if(fund)H.pl.t.push(fund);else{/* q10 thêm sau */}
  H.mis={n:'NHIỆM VỤ',t:[{k:'missions',n:'NHIỆM VỤ NGÀY',go:()=>{try{Q77.open('d');}catch{}}},season||{k:'season',n:'CHIẾN LỆNH',go:()=>{try{S77.open();}catch{}}}]};
  if(H.mis.t[1])H.mis.t[1]=Object.assign({},H.mis.t[1],{n:'CHIẾN LỆNH'});
  H.shop={n:'CỬA HÀNG',t:[{k:'chest',n:'MỞ RƯƠNG',go:()=>{try{Nav74.F.chest.go();}catch{}}},wheel||{k:'wheel',n:'VÒNG QUAY',lv:45,go:()=>{try{Nav74.F.wheel.go();}catch{}}},
   {k:'market',n:'CHỢ ĐEN',go:()=>{try{Trade67.open();}catch{try{Nav74.F.market.go();}catch{}}}},{k:'codex',n:'BÁCH KHOA',go:()=>{try{L7309.open();}catch{}}},
   {k:'shop2',n:'TIỆM KHÁC',sm:1,go:()=>{try{Nav74.tab('shop');}catch{}}}]};
  const sk=H.bst&&H.bst.t.find(t=>t.k==='skin'),st=H.bst&&H.bst.t.find(t=>t.k==='story');
  H.bst={n:'BỘ SƯU TẬP',t:[sk,st,{k:'ach',n:'THÀNH TỰU',go:()=>{const b=document.querySelector('#hgr41 [data-go="ach"]');if(b)b.click();else try{Nav74.page('gifts');}catch{}}}].filter(Boolean)};}
 // Quỹ do q10309 nạp vào H.pl sau: giữ thứ tự Điểm danh | Quà | Quỹ, và không để Vòng quay / Mùa giải quay lại thanh PHÚC LỢI
 function fixPl(){if(!hubDone)return;try{const H=L9309.H,t=H.pl.t;const bad=t.filter(x=>x&&(x.k==='wheel'||x.k==='season'||x.k==='codex'));if(bad.length)H.pl.t=t.filter(x=>!bad.includes(x));}catch{}}
 // Chiến lệnh mùa giải gắn ngay trong màn Nhiệm vụ (một màn)
 function seasonCard(){if(!ok('HUB11'))return;const q=$('.m63.q77p:not([hidden]) .m63-card');if(!q)return;const list=q.querySelector('.q77-list');if(!list)return;let c=q.querySelector('.sl11');
  let lv=0,xp=0,per=500,max=25,rdy=false;try{lv=S77.level();xp=S77.state().xp|0;rdy=!!S77.ready();}catch{}try{per=SEASON_CONFIG_V77.XP_PER_LEVEL||500;max=SEASON_CONFIG_V77.MAX_LEVEL||25;}catch{}
  const f=lv>=max?100:Math.round((xp%per)/per*100),html=`<i>CL</i><span><b>CHIẾN LỆNH MÙA GIẢI</b><small>Cấp <em>${lv}</em>/${max} · ${fmt(xp%per)}/${fmt(per)} XP</small><u><s style="width:${f}%"></s></u></span><button type="button" data-sl11="1">${rdy?'NHẬN THƯỞNG':'XEM'} ›</button>${rdy?'<em class="dt"></em>':''}`;
  if(!c){c=document.createElement('div');c.className='sl11';c.addEventListener('click',e=>{if(!e.target.closest('[data-sl11]'))return;e.stopPropagation();try{if(L9309&&L9309.H.mis)L9309.go('mis',1);else S77.open();}catch{try{S77.open();}catch{}}});}
  if(c.__h!==html){c.innerHTML=html;c.__h=html;}if(c.nextSibling!==list||c.parentNode!==q)q.insertBefore(c,list);}

 // =================== P4 · CHẾ ĐỘ ANH HÙNG ===================
 const HK='saobang-hero11-v1';const HS=rd(HK,{on:false,st:{},first:{}});HS.st=HS.st||{};HS.first=HS.first||{};
 const HC=window.HERO11CFG={hp:1.8,boss:1.8,cp:1.5,xp3:s=>1+Math.floor(s/40),firstCr:s=>500*Math.ceil(s/20),shard:.15};
 const hsave=()=>wr(HK,HS);
 const heroOn=()=>ok('HERO11')&&!!HS.on;
 const nCleared=n=>{try{return Progress.getState().cleared.includes(n);}catch{return false;}};
 const hStars=n=>HS.st[n]|0;
 let hPend=null,hRun=null;
 function heroToggle(){HS.on=!HS.on;hsave();hPaint(true);T(HS.on?'CHẾ ĐỘ ANH HÙNG · QUÁI & BOSS TRÂU HƠN, THƯỞNG CAO HƠN':'CHẾ ĐỘ THƯỜNG');}
 function hPaint(force){const cm=$('#cmap');const H=document.documentElement;const show=ok('HERO11')&&vis(cm);H.classList.toggle('hero11',show&&HS.on);if(!show)return;
  let tg=cm.querySelector('.hm11');if(!tg){tg=document.createElement('button');tg.type='button';tg.className='hm11';tg.addEventListener('click',e=>{e.stopPropagation();heroToggle();});cm.appendChild(tg);}
  const th=`<b class="${HS.on?'':'on'}">THƯỜNG</b><b class="${HS.on?'on':''}">ANH HÙNG</b>`;if(tg.__h!==th){tg.innerHTML=th;tg.__h=th;}cm.classList.toggle('sh11',!!cm.querySelector('.cm-sheet.open'));
  const nodes=cm.querySelectorAll('.cm-node[data-stage]');const world=cm.querySelector('.cm-world');
  if(!HS.on){cm.querySelectorAll('.hs11').forEach(e=>e.remove());nodes.forEach(n=>n.classList.remove('h11d','h11l','h11c'));return;}
  for(const n of nodes){const s=+n.dataset.stage,v=hStars(s),cl=nCleared(s);n.classList.toggle('h11d',v>0);n.classList.toggle('h11l',!cl);n.classList.toggle('h11c',cl&&!v);
   let st=world&&world.querySelector('.hs11[data-s="'+s+'"]');if(v>0&&world){if(!st){st=document.createElement('span');st.className='hs11';st.dataset.s=s;world.appendChild(st);}
     const kind=n.classList.contains('major')?'major':n.classList.contains('mini')?'mini':'';const L=parseFloat(n.style.left)||0,Tt=parseFloat(n.style.top)||0;st.style.left=L+'px';st.style.top=(Tt+(kind==='major'?50:kind==='mini'?44:28))+'px';
     const h='★'.repeat(v)+'<s>'+'★'.repeat(3-v)+'</s>';if(st.__h!==h){st.innerHTML=h;st.__h=h;}}else if(st)st.remove();}
  // dòng thông tin chương (lực chiến đề nghị)
  let inf=cm.querySelector('.hi11');if(!inf){inf=document.createElement('div');inf.className='hi11';cm.appendChild(inf);}let cnt=0,c3=0;for(const k in HS.st){cnt++;if((HS.st[k]|0)>=3)c3++;}
  const ih=`Máu quái ×${String(HC.hp).replace('.',',')} · ${c3} ải 3★`;if(inf.__h!==ih){inf.textContent=ih;inf.__h=ih;}}
 // thẻ ải (cm-sheet) khi đang ở Anh Hùng
 function hSheet(){if(!heroOn())return;const sh=document.querySelector('#cmap .cm-sheet.open');if(!sh||sh.__h11===sh.innerHTML)return;const h4=sh.querySelector('h4');if(!h4)return;
  const n=parseInt((h4.textContent.match(/Ải\s*(\d+)/)||[])[1],10);if(!n)return;const v=hStars(n),cl=nCleared(n);
  if(!h4.querySelector('.h11t'))h4.insertAdjacentHTML('beforeend',' <span class="h11t">ANH HÙNG</span>');
  let rq=0,me=0;try{rq=Math.round(Meta40.reqCP(n)*HC.cp);me=Math.round(Combat.stats().cp);}catch{}
  const req=sh.querySelector('.cm-req');const reqH=`<b style="color:${me>=rq?'#9ff0c8':'#ff9a9a'}">Lực chiến đề nghị (Anh Hùng): ${fmt(rq)}</b> · Bạn ${fmt(me)}`;if(req)req.innerHTML=reqH;else h4.insertAdjacentHTML('afterend','<p class="cm-req">'+reqH+'</p>');
  let box=sh.querySelector('.h11b');if(!box){box=document.createElement('p');box.className='h11b';const rq2=sh.querySelector('.cm-req');if(rq2)rq2.after(box);else (sh.querySelector('.cm-act')||sh).before(box);}
  const mat=(()=>{try{const m=V70.matOf(n);return m?V70.matName(m.id+'3'):'';}catch{return '';}})();
  box.innerHTML=`Sao Anh Hùng: <span class="y">${'★'.repeat(v)}</span><span class="g">${'★'.repeat(3-v)}</span><br>Thưởng: ◈ ×2 · ${HC.xp3(n)} Đá XP Cao Cấp${mat?' · '+(n%10===0?2:1)+' '+mat:' · 20% NL Tím'} · 15% mảnh phi công chính${HS.first[n]?'':` · <b>lần đầu +${fmt(HC.firstCr(n))} ◈</b>`}`;
  sh.querySelectorAll('.cm-sw').forEach(b=>b.hidden=true);
  const go=sh.querySelector('.cm-go');if(go){if(!cl){go.disabled=true;go.textContent='🔒 Qua ải '+n+' THƯỜNG trước';}else if(!go.__h11){go.__h11=1;go.addEventListener('click',()=>{if(heroOn())hPend={st:n,t:Date.now()};},true);go.textContent='XUẤT KÍCH · ANH HÙNG';}}
  sh.__h11=sh.innerHTML;}
 function hookHeroRun(){
  try{if(!window.__h11add){window.__h11add=1;const oa=addEnemy;const fn=function(e){const r=oa.apply(this,arguments);try{if(hRun&&e&&!e.__h11&&!e.bossPart&&e!==boss){e.__h11=1;e.hp*=HC.hp;e.maxHp=e.hp;if(e.guard)e.guard*=HC.hp;}}catch{}return r;};window.addEnemy=fn;try{addEnemy=fn;}catch{}}}catch{}
  try{if(!Progress.rewardStage.__l11){const o=Progress.rewardStage;const f=function(n){if(!(hRun&&gm()==='campaign'&&Number(n)===hRun.st))return o.apply(this,arguments);
    const orc=Campaign36.recordStars;let got=0;Campaign36.recordStars=function(s,v){if(Number(s)===hRun.st){got=Math.min(3,Math.max(1,v|0));HS.st[s]=Math.max(HS.st[s]|0,got);hsave();return HS.st[s];}return orc.apply(this,arguments);};
    let r;try{r=o.apply(this,arguments);}finally{Campaign36.recordStars=orc;}try{if(r)heroReward(Number(n),r);}catch(e){console.warn('hero11',e);}hRun.done=1;return r;};f.__l11=1;Progress.rewardStage=f;}}catch{}}
 function heroReward(n,r){const out=[];const cr=(r.credits|0);if(cr>0){try{Progress.grantCredits(cr);r.credits=cr*2;}catch{}out.push('+'+fmt(cr)+' ◈');}
  if(!HS.first[n]){HS.first[n]=1;hsave();const fc=HC.firstCr(n);try{Progress.grantCredits(fc);}catch{}out.push('lần đầu +'+fmt(fc)+' ◈');}
  const x3=HC.xp3(n);try{XPDA307.add(3,x3);out.push('+'+x3+' Đá XP Cao Cấp');}catch{}
  try{const m=V70.matOf(n);if(m){const k=n%10===0?2:1;V70.add(m.id+'3',k);out.push('+'+k+' '+V70.matName(m.id+'3'));}else if(Math.random()<.2){const ty=MAT69.types[Math.floor(Math.random()*MAT69.types.length)];V70.add(ty.id+'3',1);out.push('+1 '+V70.matName(ty.id+'3'));}}catch{}
  try{if(Math.random()<HC.shard){const S=Pilot67.state(),id=S.team&&S.team[0];if(id!=null){Pilot67._piece(id,1);out.push('+1 mảnh phi công chính');}}}catch{}
  setTimeout(()=>T('ANH HÙNG · '+out.join(' · ')),900);}
 function hTick(){const m=md();
  if(hPend&&m==='play'&&gm()==='campaign'){let lv=0;try{lv=level;}catch{}if(lv===hPend.st){hRun={st:lv,t:Date.now()};hPend=null;T('ẢI '+lv+' · ANH HÙNG');}}
  if(hPend&&Date.now()-hPend.t>8000)hPend=null;
  if(hRun){if(m==='menu'||m==='over'||(m==='play'&&(gm()!=='campaign'||(()=>{try{return level!==hRun.st;}catch{return true;}})())))hRun=null;
   else{try{if(boss&&!boss.__h11){boss.__h11=1;boss.max*=HC.boss;boss.hp*=HC.boss;for(const p of boss.parts||[]){p.max*=HC.boss;p.hp*=HC.boss;}}}catch{}}}}
 // Càn quét nhanh: ải Anh Hùng 3★ (q10309 gọi)
 function heroSweep(s){if(!heroOn()&&!(HS.st[s]>=3))return 'Chưa có 3★ Anh Hùng ở ải '+s;if((HS.st[s]|0)<3)return 'Chưa có 3★ Anh Hùng ở ải '+s;let r=null;
  const st=(()=>{try{return (Campaign36.getState().stars||{})[s]|0;}catch{return 0;}})();if(st<3)return 'Ải '+s+' cần 3★ THƯỜNG để càn quét';
  try{r=Campaign36.sweep(s);}catch{}if(!r)return 'Không càn quét được (hết lượt / đang trong trận)';
  const out=['+'+fmt(r.credits*2)+' ◈'];try{Progress.grantCredits(r.credits);}catch{}const x3=Math.max(1,Math.floor(HC.xp3(s)/2));try{XPDA307.add(3,x3);out.push('+'+x3+' Đá XP Cao Cấp');}catch{}
  try{const m=V70.matOf(s);if(m){V70.add(m.id+'3',1);out.push('+1 '+V70.matName(m.id+'3'));}}catch{}return 'CÀN QUÉT AH ẢI '+s+' · '+out.join(' · ');}

 // =================== Tên lửa kiểu cũ (vệt trắng xoáy) ===================
 function hookMis(){try{if(Fighters28.draw.__l11)return;const od=Fighters28.draw;const f=function(g,s){try{if(s&&ok('SW11')&&s.type==='missile'&&s.art28==null&&!s.gearItem&&!s.gearKind&&!s.d307)return misDraw(g,s);}catch{}return od.apply(this,arguments);};f.__l11=1;Fighters28.draw=f;}catch{}}
 function misCol(){try{return Fighters28.profiles[typeof selected!=='undefined'?selected:0].color||'#7dd3fc';}catch{return '#7dd3fc';}}
 function misDraw(g,s){const c=misCol(),a=Math.atan2(s.vy,s.vx);const tr=s.trail||[];
  g.save();if(tr.length>1){g.globalCompositeOperation='lighter';g.strokeStyle=c;g.lineCap='round';for(let i=1;i<Math.min(tr.length,5);i++){g.globalAlpha=.22*(1-i/5);g.lineWidth=2.2-i*.35;g.beginPath();g.moveTo(tr[i-1].x,tr[i-1].y);g.lineTo(tr[i].x,tr[i].y);g.stroke();}g.globalCompositeOperation='source-over';}
  g.translate(s.x,s.y);g.rotate(a+Math.PI/2);g.globalAlpha=1;g.fillStyle=c;g.beginPath();g.moveTo(0,-9);g.lineTo(3,1);g.lineTo(2,6);g.lineTo(-2,6);g.lineTo(-3,1);g.closePath();g.fill();
  g.fillStyle='rgba(255,236,200,.75)';g.beginPath();g.moveTo(-1.6,6);g.lineTo(0,10+Math.sin((s.age||0)*40)*2);g.lineTo(1.6,6);g.fill();g.restore();return true;}

 // =================== vòng lặp ===================
 function tick(){document.documentElement.classList.toggle('ux11',on());if(!on())return;hookRev();hookPilot();hookHub();fixPl();hookHeroRun();hookMis();
  try{epTick();}catch{}try{hTick();}catch{}if(md()!=='play'){try{seasonCard();}catch{}try{hPaint();}catch{}try{hSheet();}catch{}}}
 setInterval(tick,250);setTimeout(tick,600);
 return {epOpen,plOpen,heroToggle,heroSweep,hStars,HS,HC,EP,state:()=>({pend,hRun,hPend,HS:JSON.parse(JSON.stringify(HS))}),skipScore};
})();
window.L11309=L11309;
