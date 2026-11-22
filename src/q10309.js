'use strict';
// V309 Lượt 10 · KHỐI B "CÀY NHÀN · BẢN ĐỒ CHÒM SAO · POLISH" (tắt toàn bộ: window.QOL10=false)
//  QS10  Càn quét nhanh theo vật liệu (nút góc trái Bản đồ + chạm ô nguyên liệu "Thiếu" ở Cường hóa → Tiến bậc): 2 nhóm Vật liệu tiến bậc / Đá XP,
//        chọn món → các ải đã 3★ rơi đúng món (vật liệu: ải ÷5 đúng loại + đúng bậc theo Map78.tierOf; Đá XP: xếp theo số kỳ vọng trong XP307CFG) + nút Càn quét 1 chạm.
//  QA10  Tiến bậc nhanh có hộp xác nhận: mỗi dòng (món chính + bản sao / phôi sẽ dùng) có ô tick; chỉ tiến 1 bậc cho dòng được tick.
//  CS10  Bản đồ chòm sao: mỗi 10 ải 1 chòm sao (đường nối mảnh + tên chòm), ô ải thành sao sáng, ải boss lớn đầu lâu đỏ; đáy: XUẤT KÍCH NHANH + THÁP BOSS + THỬ THÁCH / VIỄN CHINH.
//  PT10  Tuần tra AFK mini góc trái Sảnh (chấm đỏ khi tích ≥ 6 giờ). CHIẾN ĐẤU ở Sảnh mở thẳng Bản đồ (l9b309).
//  OC10  Siêu Tần Tuần (Vô Tận, theo tuần hệ thống, chạy offline): 1 chiến cơ + 1 giáp + 1 tên lửa + 1 tàu con; mỗi món đang dùng +10 % điểm và +2,5 % Công
//        trong Vô Tận (đủ 4 món = +40 % điểm, +10 % Công). Huy hiệu ϟ ở nút VÔ TẬN, ô Kho, hàng Túi đồ.
//  QF10  Quỹ Tiến Trình 160 ải (tab trong PHÚC LỢI): 16 mốc ải 10…160, thưởng Kim cương 50→150 (tổng 1.440, chủ dự án duyệt NGOẠI LỆ 22/11 vì nhận 1 lần;
//        tắt riêng window.QF10GEM=false) + Hợp kim + Đá XP + mảnh phi công.
//  BN10  Banner NÂNG CẤP / TIẾN BẬC THÀNH CÔNG 0,5 s + chớp icon + số xanh nhảy.
//  PV10  Bách khoa: khung xem bắn đạn thật (WING10.Stage) cho chiến cơ / Chiến Thần / trang bị SSS.
const Q10309=(()=>{
 const on=()=>window.QOL10!==false;const $=s=>document.querySelector(s);
 const IC=k=>typeof ICON74!=='undefined'&&ICON74[k]?`<img src="${ICON74[k]}" alt="">`:'';
 const toastS=s=>{try{toast(s);}catch{}};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const vis=e=>!!e&&!e.hidden&&getComputedStyle(e).display!=='none';
 const modeOf=()=>{try{return mode;}catch{return 'menu';}};
 const stars0=n=>{try{return Campaign36.getState().stars[n]|0;}catch{return 0;}};
 const cleared=()=>{try{return Progress.getState().cleared||[];}catch{return [];}};
 const html=document.documentElement;
 // ================= QS10 · càn quét nhanh =================
 const XPN={1:'Đá XP I',2:'Đá XP II',3:'Đá XP III'};
 function matList(){const L=[];try{for(const ty of MAT69.types)for(let t=1;t<=MAT69.tiers.length;t++)L.push({id:ty.id+t,t,n:V70.matName(ty.id+t),have:V70.have(ty.id+t),im:(typeof MAT69_ART!=='undefined'&&MAT69_ART[ty.id+t])||''});}catch{}return L;}
 function xpIcon(t){try{return (window.UI307_IMG||{})['icon_xp_crystal_'+['','white','green','purple'][t]]||'';}catch{return '';}}
 function stagesFor(id,hs){const out=[];const cl=cleared();const stars=hs||stars0;
   if(/^xp\d$/.test(id)){const t=+id[2];let B=[];try{B=XP307CFG.bands;}catch{}
     for(let s=1;s<=160;s++){if(stars(s)!==3||!cl.includes(s))continue;let k='n';try{const bk=Campaign36.bossKind(s)||'';k=bk==='mini'?'mini':bk?'boss':'n';}catch{}const band=(B.find(r=>s<=r[0])||B[B.length-1]||[0,{}])[1]||{};let e=0;for(const [tt,a,b,p] of (band[k]||[]))if(tt===t)e+=(a+b)/2*p;if(e>0)out.push({s,e});}
     return out.sort((a,b)=>b.e-a.e||b.s-a.s).slice(0,10);}
   const ty=id.replace(/\d$/,''),t=+id.slice(-1);
   for(let s=5;s<=160;s+=5){let m=null;try{m=V70.matOf(s);}catch{}if(!m||m.id!==ty)continue;let tt=1;try{tt=Map78.tierOf(s);}catch{}if(tt!==t)continue;if(stars(s)===3&&cl.includes(s))out.push({s,e:s%10===0?1.5:1});}
   return out.sort((a,b)=>b.s-a.s).slice(0,10);}
 let qs=null,qsTab='mat',qsSel=null,qsMsg='';
 function swInfo(){try{const st=Campaign36.getState().sweep||{};const day=ChestsDay392();const used=st.day===day?st.used|0:0;let tk=0;try{tk=V75.state().tk|0;}catch{}return {used,max:(window.SWEEP92?SWEEP92():10),tk};}catch{return {used:0,max:10,tk:0};}}
 function qsRender(){if(!qs)return;const M=matList(),X=[1,2,3].map(t=>({id:'xp'+t,t,n:XPN[t],have:(()=>{try{return XPDA307.have(t);}catch{return 0;}})(),im:xpIcon(t)}));
   const L=qsTab==='mat'?M:X;if(!qsSel||!L.find(x=>x.id===qsSel))qsSel=L[0]&&L[0].id;const S=qsSel?stagesFor(qsSel):[],sw=swInfo(),cur=L.find(x=>x.id===qsSel)||{};
   qs.querySelector('.m63-card').innerHTML=`<div class="m63-eye">CÀN QUÉT NHANH</div><button class="m63-x" data-qs="x" aria-label="Đóng">×</button>
    <div class="qs10t"><button data-qs="tab" data-v="mat" class="${qsTab==='mat'?'on':''}">VẬT LIỆU TIẾN BẬC</button><button data-qs="tab" data-v="xp" class="${qsTab==='xp'?'on':''}">ĐÁ XP</button></div>
    <div class="qs10g">${L.map(x=>`<button data-qs="pick" data-v="${x.id}" class="${x.id===qsSel?'on':''} t${x.t}"><i>${x.im?`<img src="${x.im}" alt="">`:'◆'}</i><small>${x.n}</small><b>${fmt(x.have)}</b></button>`).join('')}</div>
    <div class="qs10h"><b>${cur.n||''}</b><span>Lượt hôm nay ${sw.used}/${sw.max}${sw.tk?` · vé ${sw.tk}`:''}</span></div>
    <div class="qs10l">${S.length?S.map(r=>`<div class="qs10r"><span><b>ẢI ${r.s}</b><em>★★★</em><small>${/^xp/.test(qsSel)?'~'+(Math.round(r.e*10)/10)+' viên / lượt':(r.s%10===0?'Ải boss':'Ải mini boss')+' · rơi chắc chắn'}</small></span><button data-qs="sw" data-v="${r.s}">CÀN QUÉT</button></div>`).join(''):'<p class="qs10e">Chưa có ải 3★ nào rơi món này. Vượt ải với 3★ để mở càn quét.</p>'}</div>
    ${(()=>{try{if(!window.L11309||window.UX11===false||window.HERO11===false)return '';const H=stagesFor(qsSel,s=>L11309.hStars(s));if(!H.length)return '';return `<div class="qs10hh">ANH HÙNG ★★★</div><div class="qs10l h11">${H.map(r=>`<div class="qs10r h11"><span><b>ẢI ${r.s} · AH</b><em>★★★</em><small>◈ ×2 · Đá XP Cao Cấp · NL Tím</small></span><button data-qs="hsw" data-v="${r.s}">CÀN QUÉT AH</button></div>`).join('')}</div>`;}catch{return '';}})()}${qsMsg?`<p class="qs10m">${qsMsg}</p>`:''}`;}
 function qsOpen(id){if(!on())return;if(!qs){qs=document.createElement('div');qs.className='m63 qs10';qs.hidden=true;qs.innerHTML='<div class="m63-card"></div>';document.body.appendChild(qs);
     qs.addEventListener('click',e=>{if(e.target===qs){qs.hidden=true;return;}const b=e.target.closest('[data-qs]');if(!b)return;e.stopPropagation();const k=b.dataset.qs,v=b.dataset.v;
       if(k==='x'){qs.hidden=true;return;}if(k==='tab'){qsTab=v;qsSel=null;qsMsg='';}else if(k==='pick'){qsSel=v;qsMsg='';}
       else if(k==='hsw'){try{qsMsg=L11309.heroSweep(+v);}catch{qsMsg='';}try{window.dispatchEvent(new CustomEvent('nc10',{detail:'sweep'}));}catch{}}else if(k==='sw'){let r=null;try{r=Campaign36.sweep(+v);}catch{}if(r){const m=Array.isArray(r.materials)?r.materials.filter(x=>typeof x==='string').slice(0,3).join(' · '):'';qsMsg='CÀN QUÉT ẢI '+v+' · +'+fmt(r.credits||0)+' ◈'+(m?' · '+m:'');try{window.dispatchEvent(new CustomEvent('nc10',{detail:'sweep'}));}catch{}}else qsMsg='Không càn quét được (hết lượt hôm nay / chưa 3★ / đang trong trận).';}
       qsRender();});}
   if(id){qsTab=/^xp/.test(id)?'xp':'mat';qsSel=id;}qsMsg='';qsRender();qs.hidden=false;}
 // nối từ Cường hóa → Tiến bậc: chạm ô nguyên liệu Thiếu
 document.addEventListener('click',e=>{if(!on())return;const n=e.target.closest&&e.target.closest('#nc307 .nc307-ns.no[data-mat]');if(!n)return;e.stopPropagation();e.preventDefault();qsOpen(n.dataset.mat);},true);
 // ================= QA10 · tiến bậc nhanh có xác nhận =================
 let qa=null,qaOff={};
 const shipNm=i=>{try{return Fighters28.profiles[i].name;}catch{return 'Chiến cơ '+(i+1);}};
 const TN=n=>{try{return TIER70.name[n];}catch{return '';}};
 function qaRows(){const rows=[];const eq=(()=>{try{return Progress.v70.equipped()||{};}catch{return {};}})();
   const add=(K,ref,name)=>{let p=null;try{p=Evo82.plan(K,ref);}catch{}if(!p||p.max||!p.ok)return;const picks=(p.pick||[]).map(c=>{if(c.vi){try{const it=Progress.v70.get(c.vi);return {n:Progress.title(it).split(' · ')[0],t:TN(c.t),lv:c.lv,item:1};}catch{return {n:'Trang bị',t:TN(c.t),lv:c.lv,item:1};}}return {n:'Bản sao',t:TN(c.t),lv:c.lv};});
     const key=K+':'+ref;rows.push({key,K,ref,name,from:TN(p.x.t),to:TN(p.x.t+1),picks,cr:p.cr,mats:(p.mats||[]).map(q=>{try{return V70.matName(q.id);}catch{return q.id;}})});};
   try{const lc=typeof launchCraft==='number'?launchCraft:0;add('craft',lc,shipNm(lc));}catch{}
   for(const k of Object.keys(eq)){const id=eq[k];if(!id)continue;let nm=id;try{nm=Progress.title(Progress.v70.get(id)).split(' · ')[0];}catch{}add('gear',id,nm);}return rows;}
 function qaRender(){if(!qa)return;const R=qaRows();qa.querySelector('.m63-card').innerHTML=`<div class="m63-eye">TIẾN BẬC NHANH · XÁC NHẬN</div><button class="m63-x" data-qa="x" aria-label="Đóng">×</button>
   <p class="qa10p">Bỏ tick dòng có bản sao / trang bị bạn muốn giữ. Mỗi dòng tick tiến <b>1 bậc</b>.</p>
   <div class="qa10l">${R.length?R.map(r=>`<label class="qa10r ${qaOff[r.key]?'off':''}"><input type="checkbox" data-qa="tk" data-v="${r.key}" ${qaOff[r.key]?'':'checked'}><span class="qa10m"><b>${r.name}</b><small>${r.from} ➤ <i>${r.to}</i> · ${fmt(r.cr)} ◈${r.mats.length?' · '+r.mats.length+' nguyên liệu':''}</small></span><span class="qa10c">${r.picks.length?r.picks.map(c=>`<em class="${c.item?'it':''}">${c.n} · ${c.t} Lv${c.lv}</em>`).join(''):'<em class="no">Không dùng bản sao</em>'}</span></label>`).join(''):'<p class="qs10e">Chưa có món đang dùng nào đủ điều kiện tiến bậc.</p>'}</div>
   <div class="qa10b"><button data-qa="x" class="no">HỦY</button><button data-qa="go" class="go" ${R.some(r=>!qaOff[r.key])?'':'disabled'}>TIẾN BẬC (${R.filter(r=>!qaOff[r.key]).length})</button></div>`;}
 function qaOpen(){if(!qa){qa=document.createElement('div');qa.className='m63 qa10';qa.hidden=true;qa.innerHTML='<div class="m63-card"></div>';document.body.appendChild(qa);
     qa.addEventListener('click',e=>{if(e.target===qa){qa.hidden=true;return;}const b=e.target.closest('[data-qa]');if(!b)return;e.stopPropagation();const k=b.dataset.qa;
       if(k==='x'){qa.hidden=true;return;}if(k==='tk'){qaOff[b.dataset.v]=!b.checked;qaRender();return;}
       if(k==='go'){let n=0;for(const r of qaRows()){if(qaOff[r.key])continue;try{if(Evo82.doBreak(r.K,r.ref))n++;}catch{}}if(n){qa.hidden=true;banner('adv');try{Progress.render();}catch{}}else{qaRender();toastS('Không tiến bậc được món nào.');}}});}
   qaOff={};qaRender();qa.hidden=false;}
 document.addEventListener('click',e=>{if(!on())return;const b=e.target.closest&&e.target.closest('#k307 [data-k="qadv"]');if(!b)return;e.stopPropagation();e.preventDefault();qaOpen();},true);
 // ================= BN10 · banner thành công =================
 let bn=null,bnT=0;
 function banner(k){if(!on()||k==='xp'||k==='sweep')return;if(!bn){bn=document.createElement('div');bn.id='bn10';document.body.appendChild(bn);}
   bn.textContent=k==='adv'?'TIẾN BẬC THÀNH CÔNG':'NÂNG CẤP THÀNH CÔNG';bn.className='';void bn.offsetWidth;bn.className='go '+(k==='adv'?'adv':'up');clearTimeout(bnT);bnT=setTimeout(()=>{bn.className='';},1300);
   setTimeout(()=>{document.querySelectorAll('#nc307 .nc307-art').forEach(a=>{a.classList.remove('fl10');void a.offsetWidth;a.classList.add('fl10');});document.querySelectorAll('#nc307 .nc307-tb td.up,#nc307 .nc307-tb td:nth-child(2)').forEach(t=>{t.classList.remove('nb10');void t.offsetWidth;t.classList.add('nb10');});},60);}
 window.addEventListener('nc10',e=>{try{banner(e.detail);}catch{}});
 // ================= OC10 · Siêu Tần Tuần =================
 function week(){const d=new Date();const t=Date.UTC(d.getFullYear(),d.getMonth(),d.getDate());const day=(new Date(t).getUTCDay()+6)%7;const th=t-day*864e5+3*864e5;const y=new Date(th).getUTCFullYear();return y*100+Math.ceil(((th-Date.UTC(y,0,1))/864e5+1)/7);}
 function rnd(seed){let s=seed>>>0||1;return ()=>{s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296;};}
 let ocC=null;
 function oc(){const w=week();if(ocC&&ocC.w===w)return ocC;const r=rnd(w*2654435761);const kinds={armor:[],missiles:[],sidearm:[]};try{for(const k of Object.keys(GearCatalog)){const g=GearCatalog[k];if(g&&kinds[g.kind]&&!/^sss/.test(k))kinds[g.kind].push(k);}}catch{}
   for(const k in kinds)kinds[k].sort();const pick=a=>a.length?a[Math.floor(r()*a.length)]:null;ocC={w,ship:Math.floor(r()*13),armor:pick(kinds.armor),missiles:pick(kinds.missiles),sidearm:pick(kinds.sidearm)};return ocC;}
 function ocHits(){const o=oc();let n=0;try{if((typeof launchCraft==='number'?launchCraft:selected)===o.ship)n++;}catch{}try{const eq=Progress.v70.equipped()||{};for(const k of ['armor','missiles','sidearm']){const it=eq[k]&&Progress.v70.get(eq[k]);if(it&&it.variant===o[k])n++;}}catch{}return n;}
 const inEndless=()=>{try{return gameMode==='endless'&&modeOf()==='play';}catch{return false;}};
 try{const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);try{if(on()&&window.OC10!==false&&inEndless())return v*(1+.025*ocHits());}catch{}return v;};}catch{}
 let ocLast=-1,ocHitsNow=0,ocT=0;
 setInterval(()=>{try{if(!on()||window.OC10===false||!inEndless()){ocLast=-1;return;}const now=performance.now();if(now-ocT>2000){ocT=now;ocHitsNow=ocHits();}const sc=score;if(ocLast<0||sc<ocLast){ocLast=sc;return;}const d=sc-ocLast;if(d>0&&ocHitsNow>0){score=sc+Math.round(d*.1*ocHitsNow);}ocLast=score;}catch{}},120);
 const gName=v=>{try{return GearCatalog[v].name;}catch{return v||'—';}};
 function ocPop(){let el=$('#oc10p');if(!el){el=document.createElement('div');el.className='m63 oc10p';el.id='oc10p';el.hidden=true;el.innerHTML='<div class="m63-card"></div>';document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target===el||e.target.closest('[data-oc]'))el.hidden=true;});}
   const o=oc(),h=ocHits(),it=(k,n)=>`<li class="${(k==='ship'?((()=>{try{return launchCraft===o.ship;}catch{return false;}})()):(()=>{try{const eq=Progress.v70.equipped()||{};const x=eq[k]&&Progress.v70.get(eq[k]);return x&&x.variant===o[k];}catch{return false;}})())?'on':''}"><i>ϟ</i><b>${n}</b><small>${k==='ship'?'Chiến cơ':k==='armor'?'Giáp':k==='missiles'?'Tên lửa':'Tàu con'}</small></li>`;
   el.querySelector('.m63-card').innerHTML=`<div class="m63-eye">ϟ SIÊU TẦN TUẦN</div><button class="m63-x" data-oc="x" aria-label="Đóng">×</button><p class="oc10d">Tuần này 4 món dưới đây được tăng sức mạnh khi đánh <b>VÔ TẬN</b>: mỗi món đang dùng <b>+10 % điểm</b> và <b>+2,5 % Công</b> (đủ 4 món: +40 % điểm, +10 % Công). Đổi món vào thứ Hai.</p>
    <ul class="oc10l">${it('ship',shipNm(o.ship))}${it('armor',gName(o.armor))}${it('missiles',gName(o.missiles))}${it('sidearm',gName(o.sidearm))}</ul><p class="oc10s">Đang dùng <b>${h}/4</b> món → <b>+${h*10} % điểm · +${(h*2.5).toLocaleString('vi-VN')} % Công</b></p><button data-oc="x" class="oc10ok">ĐÃ HIỂU</button>`;el.hidden=false;}
 function ocBadges(){if(window.OC10===false)return;const o=oc();const cta=$('#hgr41 #lb68 .lb68-cta .cta.e');if(cta&&!cta.querySelector('.oc10b')){const b=document.createElement('span');b.className='oc10b';b.textContent='ϟ SIÊU TẦN';b.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();ocPop();},true);cta.appendChild(b);}
   const mark=(el,yes)=>{if(!el)return;const x=el.querySelector(':scope>.oc10i');if(yes&&!x){const i=document.createElement('i');i.className='oc10i';i.textContent='ϟ';el.appendChild(i);}else if(!yes&&x)x.remove();};
   document.querySelectorAll('#hb-body.k307 .hb-slot').forEach(s=>{const k=s.dataset.k307k;if(s.classList.contains('c9ship')){let lc=-1;try{lc=launchCraft;}catch{}mark(s,lc===o.ship);return;}if(!k)return;let v=null;try{const id=(Progress.v70.equipped()||{})[k];v=id&&Progress.v70.get(id).variant;}catch{}mark(s,v&&v===o[k]);});
   document.querySelectorAll('#k307 .k307-row[data-id]').forEach(r=>{const id=r.dataset.id,k=r.dataset.k;let yes=false;if(k==='ship')yes=+id===o.ship;else if(k==='item'){try{const it=Progress.v70.get(id);yes=!!it&&it.variant===o[it.kind];}catch{}}mark(r.querySelector('.k307-ic'),yes);});}
 // ================= QF10 · Quỹ tiến trình =================
 const QK='saobang-quy10-v1';let QS={got:{}};try{QS=Object.assign({got:{}},JSON.parse(localStorage.getItem(QK)||'{}'));}catch{}
 const qsave=()=>{try{localStorage.setItem(QK,JSON.stringify(QS));}catch{}};
 const QF=Array.from({length:16},(_,i)=>{const k=i+1,s=k*10;return {s,dm:[50,50,60,60,70,70,80,80,90,90,100,100,120,120,150,150][i],cr:2000*k+(k%5===0?10000:0),xp:k<=5?[2,4+k]:k<=11?[3,k-3]:[3,k],psh:2+Math.floor(k/2)};});
 const fundDot=()=>{const cl=cleared();return QF.some(m=>cl.includes(m.s)&&!QS.got[m.s]);};
 function giveFund(m){if(m.dm&&window.QF10GEM!==false)try{Econ74.add(m.dm,'Quỹ Tiến Trình ải '+m.s);}catch{}try{Progress.grantCredits(m.cr);}catch{}try{XPDA307.add(m.xp[0],m.xp[1]);}catch{}try{const st=Pilot67.state(),own=Object.keys(st.own).map(Number),mp=st.team[0]&&st.own[st.team[0]]?st.team[0]:own[0];if(mp)Pilot67._piece(mp,m.psh);else Progress.grantCredits(m.psh*900);}catch{}}
 let qf=null;
 function qfRender(){if(!qf)return;const cl=cleared();const xn=['','I','II','III','IV'];
   qf.querySelector('.m63-card').innerHTML=`<div class="m63-eye">QUỸ TIẾN TRÌNH</div><button class="m63-x" data-qf="x" aria-label="Đóng">×</button><p class="qf10p">Vượt mốc ải chiến dịch để nhận quỹ — mốc đã vượt tự mở nhận. Đã vượt <b>${Math.max(0,...cl.filter(n=>n<=160),0)}</b>/160 ải.</p>
    <div class="qf10l">${QF.map(m=>{const ok=cl.includes(m.s),got=!!QS.got[m.s];return `<div class="qf10r ${got?'got':ok?'ok':'lk'}"><b>ẢI ${m.s}</b><span>${m.dm&&window.QF10GEM!==false?`<em class="dm">${m.dm} 💎</em>`:''}<em>${fmt(m.cr)} ◈</em><em>${m.xp[1]} Đá XP ${xn[m.xp[0]]}</em><em>${m.psh} mảnh phi công</em></span>${got?'<s>ĐÃ NHẬN</s>':ok?`<button data-qf="get" data-v="${m.s}">NHẬN</button>`:'<s class="l">🔒</s>'}</div>`;}).join('')}</div>
    <button class="qf10all" data-qf="all" ${fundDot()?'':'disabled'}>NHẬN TẤT CẢ</button>`;}
 function qfOpen(){if(!on())return;if(!qf){qf=document.createElement('div');qf.className='m63 qf10';qf.hidden=true;qf.innerHTML='<div class="m63-card"></div>';document.body.appendChild(qf);
     qf.addEventListener('click',e=>{if(e.target===qf){qf.hidden=true;return;}const b=e.target.closest('[data-qf]');if(!b)return;e.stopPropagation();const k=b.dataset.qf;if(k==='x'){qf.hidden=true;return;}const cl=cleared();
       const take=m=>{if(QS.got[m.s]||!cl.includes(m.s))return 0;QS.got[m.s]=1;giveFund(m);return 1;};let n=0;if(k==='get')n=take(QF.find(m=>m.s===+b.dataset.v)||{});else if(k==='all')for(const m of QF)n+=take(m);if(n){qsave();toastS('QUỸ TIẾN TRÌNH · nhận '+n+' mốc');}qfRender();});}
   qfRender();qf.hidden=false;}
 function hubTab(){try{if(typeof L9309==='undefined'||!L9309.H)return;const t=L9309.H.pl.t;if(!t.find(x=>x.k==='fund'))t.push({k:'fund',n:'QUỸ TIẾN TRÌNH',go:()=>qfOpen()});}catch{}}
 // ================= CS10 · bản đồ chòm sao + nút đáy =================
 const CN=['THIÊN ƯNG','THẦN NỎ','THỦY XÀ','KIẾM VƯƠNG','PHƯỢNG HOÀNG','LĂNG KÍNH','HẮC LONG','BĂNG HÀ','THIÊN CẦM','CHIẾN XA','LIỆT DIỄM','HẢI VƯƠNG','LÔI THẦN','NGUYỆT HỒ','KIM SƯ','TINH VÂN'];
 let csKey='';
 function cons(){const m=$('#cmap');const ok=on()&&vis(m);html.classList.toggle('cs10',ok&&window.CS10!==false);if(!ok)return;const w=m.querySelector('#cm-world');if(!w)return;
   const N=[...w.querySelectorAll(':scope>.cm-node')].map(n=>({n,s:parseInt((n.querySelector('b')||{}).textContent,10)})).filter(x=>x.s>0).sort((a,b)=>a.s-b.s);
   N.forEach(x=>{x.n.classList.toggle('sk10',x.s%20===0||(x.n.classList.contains('major')));});
   const key=N.map(x=>x.s+':'+x.n.offsetLeft+','+x.n.offsetTop).join('|')+w.offsetHeight;
   if(key!==csKey&&window.CS10!==false){csKey=key;let sv=w.querySelector(':scope>svg.cs10s');if(!sv){sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('class','cs10s');w.insertBefore(sv,w.firstChild.nextSibling);}
     sv.setAttribute('width',w.offsetWidth);sv.setAttribute('height',w.offsetHeight);sv.setAttribute('viewBox',`0 0 ${w.offsetWidth} ${w.offsetHeight}`);
     const P=N.map(x=>({s:x.s,x:x.n.offsetLeft+x.n.offsetWidth/2,y:x.n.offsetTop+x.n.offsetHeight/2,done:x.n.classList.contains('done')}));let out='';
     for(let i=1;i<P.length;i++){const a=P[i-1],b=P[i];const same=Math.floor((a.s-1)/10)===Math.floor((b.s-1)/10);out+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="${same?(b.done?'d':'u'):'g'}"/>`;}
     const G={};for(const p of P){const g=Math.floor((p.s-1)/10);(G[g]=G[g]||[]).push(p);}
     for(const g in G){const L=G[g],cx=L.reduce((a,p)=>a+p.x,0)/L.length,top=Math.min(...L.map(p=>p.y)),bot=Math.max(...L.map(p=>p.y));const side=cx>w.offsetWidth/2?-1:1;out+=`<text x="${side>0?16:w.offsetWidth-16}" y="${(top+bot)/2}" text-anchor="${side>0?'start':'end'}" class="cn">CHÒM ${CN[g%CN.length]}</text><text x="${side>0?16:w.offsetWidth-16}" y="${(top+bot)/2+13}" text-anchor="${side>0?'start':'end'}" class="cs">Ải ${g*10+1}–${g*10+10}</text>`;}
     for(let i=0;i<70;i++){const x=(Math.sin(i*12.9898+key.length)*43758.5453%1+1)%1*w.offsetWidth,y=(Math.sin(i*78.233)*12345.678%1+1)%1*w.offsetHeight;out+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i%7===0?1.4:.7}" class="st"/>`;}
     sv.innerHTML=out;}
   // nút
   let qb=m.querySelector('.qs10b');if(!qb){qb=document.createElement('button');qb.type='button';qb.className='qs10b';qb.innerHTML='<i>ϟ</i><b>CÀN QUÉT<br>NHANH</b>';qb.addEventListener('click',e=>{e.stopPropagation();qsOpen();});m.appendChild(qb);}
   let mb=m.querySelector('.mb10');if(!mb){mb=document.createElement('div');mb.className='mb10';
     mb.innerHTML=`<button type="button" data-mb="go" class="go10"><b>XUẤT KÍCH NHANH</b><small></small></button><div class="mb10r"><button type="button" data-mb="tower" class="tw10"><i>${IC('ic_thap_boss')}</i><b>THÁP BOSS</b></button><button type="button" data-mb="chal" class="ch10"><i>${IC('ic_thu_thach')}</i><b>THỬ THÁCH · VIỄN CHINH</b></button></div>`;
     mb.addEventListener('click',e=>{const b=e.target.closest('[data-mb]');if(!b)return;e.stopPropagation();const k=b.dataset.mb;
       if(k==='go'){try{L9B309.quick();}catch{}}else if(k==='tower'){try{const f=Nav74.F.tower;if(f.lk&&!f.lk()){toastS('THÁP BOSS MỞ Ở ẢI '+f.lv);return;}f.go();}catch{}}else if(k==='chal')chal();});m.appendChild(mb);}
   const st=(()=>{try{return document.getElementById('lb68-stage').textContent;}catch{return '';}})();const sm=mb.querySelector('.go10 small');if(sm.textContent!==st)sm.textContent=st+' · ải mới nhất';}
 let ch=null;
 function chal(){if(!ch){ch=document.createElement('div');ch.id='ch10';ch.hidden=true;document.body.appendChild(ch);ch.addEventListener('click',e=>{if(e.target===ch){ch.hidden=true;return;}const b=e.target.closest('[data-ch]');if(!b)return;e.stopPropagation();ch.hidden=true;const k=b.dataset.ch;
     if(k==='x')return;if(k==='page'){try{Nav74.page('challenge');}catch{}return;}try{const f=Nav74.F[k];if(f.lk&&!f.lk()){toastS(f.n+' MỞ Ở ẢI '+f.lv);return;}f.go();}catch{}});}
   const F=(()=>{try{return Nav74.F;}catch{return {};}})(),c=(k,ic,n,d)=>{const L=F[k]&&F[k].lk&&!F[k].lk();return `<button type="button" data-ch="${k}" class="${L?'lk':''}"><i>${IC(ic)}</i><b>${n}</b><small>${L?'🔒 Mở ở ải '+F[k].lv:d}</small></button>`;};
   ch.innerHTML=`<div class="ch10c"><div class="cd9h"><b>THỬ THÁCH · VIỄN CHINH</b><button type="button" data-ch="x">✕</button></div><div class="cd9g">${c('expedition','ic_vien_chinh','VIỄN CHINH','Phái đội làm nhiệm vụ')}${c('daily','ic_thu_thach','THỬ THÁCH NGÀY','Luật đặc biệt mỗi ngày')}${c('dungeon','ic_nguyen_lieu','PHÓ BẢN','Hợp kim · trang bị · vật liệu')}<button type="button" data-ch="page"><i>${IC('ic_thu_thach')}</i><b>MỌI THỬ THÁCH</b><small>Sự kiện · Phá vây · Khe Nứt…</small></button></div></div>`;ch.hidden=false;}
 // ================= PT10 · tuần tra mini ở Sảnh =================
 function patrol(){const r=$('#hgr41');if(!r||!vis(r))return;const stg=r.querySelector('.h1-stage');if(!stg)return;let b=stg.querySelector('.pt10');
   let open=true;try{const f=Nav74.F.patrol;open=!(f.lk&&!f.lk());}catch{}if(!open){if(b)b.remove();return;}
   if(!b){b=document.createElement('button');b.type='button';b.className='pt10';b.innerHTML=`<i>${IC('ic_tuan_tra')}</i><small>TUẦN TRA</small><em></em><s></s>`;b.addEventListener('click',e=>{e.stopPropagation();try{Nav74.F.patrol.go();}catch{}});stg.appendChild(b);}
   let h=0;try{h=Stone71.patrolPreview().h;}catch{}b.querySelector('em').hidden=h<6;const pct=Math.min(100,Math.round(h/12*100))+'%';const s=b.querySelector('s');if(s.textContent!==pct){s.textContent=pct;b.style.setProperty('--p',pct);}}
 // ================= PV10 · Bách khoa bắn thử =================
 let pvS=null;
 function codex(){if(!window.WING10)return;const box=$('.m63.cx7:not([hidden]) .cx7-big');if(!box)return;let c=box.querySelector('canvas.pv10');
   if(!c){c=document.createElement('canvas');c.className='pv10';box.appendChild(c);box.classList.add('pv10on');
     pvS=WING10.Stage(c,{visible:()=>c.isConnected&&vis($('.m63.cx7')),get:()=>{const sel=(($('.m63.cx7 .cx7-c.sel')||{}).dataset||{}).cx7||'';const im0=box.querySelector('img');
       if(sel[0]==='s'){const i=+sel.slice(1);let src='';try{const S=SHIP118[String(i)];src=S.tim||S.thuong;}catch{}return {src,col:WING10.colOf(i),bb:WING10.bbOf(i),sw:.3,sh:.55,cy:.62,key:'cx'+i,arc:(performance.now()%3600)<1100};}
       if(sel[0]==='r'){let col='#c4b5fd';try{col=SSS_MODELS[+sel.slice(1)].color||col;}catch{}return {src:im0&&im0.src,col,wing:true,sw:.36,sh:.78,cy:.55,arc:(performance.now()%3000)<1000,key:'rb'};}
       let lc=0;try{lc=launchCraft;}catch{}let src='';try{const S=SHIP118[String(lc)];src=S.tim||S.thuong;}catch{}let d=null;try{d=Gear44.defs().find(x=>'x'+x.id===sel);}catch{}const o={src,col:WING10.colOf(lc),bb:WING10.bbOf(lc),sw:.26,sh:.45,cy:.64,key:'sx'};
       if(d){if(d.kind==='sidearm'){try{o.pod=TB309.img('pod_'+d.id);}catch{}}else if(d.kind==='missiles'){try{o.mis=im0;}catch{}}else o.shield='#fde68a';}return o;}});}
   if(pvS)pvS.start();}
 // ================= Sảnh: CHIẾN ĐẤU, sửa nhỏ =================
 setInterval(()=>{try{html.classList.toggle('frame10',window.FRAME10!==false);html.classList.toggle('qol10',on());if(!on())return;hubTab();cons();patrol();ocBadges();codex();}catch(e){}},400);
 return {qsOpen,qaOpen,qfOpen,ocPop,oc,ocHits,banner,stagesFor,week,QF,fundDot};
})();
window.Q10309=Q10309;
