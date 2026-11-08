// V90 · VIỆC NHỎ THEO REVIEW89 MỤC D (Gemini) — Claude sửa các mẹo sai với game thật (ghi chú cuối mảng)
//  A3 · Bấm TIẾP TỤC sau tạm dừng → đếm 3 · 2 · 1 · CHIẾN! (1,8 s) rồi trận mới chạy.
//  A4 · 30 mẹo: hiện ở màn tạm dừng, màn tải bản online và bảng thông tin ải (KHÔNG hiện trong lúc đang bắn — chủ dự án đã bỏ dải chữ trong trận).
//  C4 · Tiếp tế trước trận (bảng ải trên bản đồ): mua bằng ◈ cho TRẬN KẾ TIẾP ở chiến dịch: Nạp sẵn đạn cấp 3 · Khiên đầu trận (chặn 2 đòn) · Thả Bạo Tẩu khi gặp boss.
//      Khóa lưu mới saobang-presupply90. Nhiệm vụ ngày mới "Mua tiếp tế trước trận 1 lần" (+15 năng động, 1.500 ◈).
//  A5 · Nút ĐI TỚI ở nhiệm vụ ngày/tuần (q77). A6 · Bảng ải thêm dòng thưởng boss lần đầu + mẹo.
//  Tắt: window.UX90=false
const TIPS90=[
 'Chỉ điểm sáng nhỏ ở giữa thân chiến cơ trúng đạn mới làm bạn mất máu.',
 'Vật phẩm nâng đạn nhặt trong trận giữ hiệu lực đến hết ải.',
 'Boss còn 2 cánh thì lõi chỉ nhận 25% sát thương: hãy bắn gãy cánh trước.',
 'Phá xong cả 2 cánh, lõi boss nhận 115% sát thương trong 5 giây.',
 'Đồ rơi là bản sao Lv1 thật, dùng để đột phá khung phẩm chất.',
 'Áp sát boss khi dùng chiến cơ bắn tầm gần như #10: đạn plasma bay không xa.',
 'Chiến cơ #11 mở miễn phí khi tích đủ 120 triệu điểm Boss Cuối Tuần.',
 'Mọi skin đều 0 chỉ số, chọn theo sở thích.',
 'Khi có hơn 25 viên đạn địch, hào quang quanh tàu tự mờ để dễ né.',
 'Chỉ số của danh hiệu luôn có hiệu lực dù bạn tắt hiển thị hào quang.',
 'Bộ 9 Kỳ Hạm: tiêm kích tự bám cánh và lõi boss.',
 'Bộ 6 Lò Rèn và bộ 12 Hư Không đánh boss mạnh nhất.',
 'Bộ 1, 4, 5 thiên về làm chậm và hồi giáp để trụ lâu.',
 'Lần đầu hạ boss ải 120, 140, 160, 180, 200 có cơ hội nhận bản sao Tím Lv1.',
 'Trượt bản sao Tím ở ải 120–160 lần đầu vẫn nhận quà bảo hiểm khung Lam.',
 'Quang Thương làm boss nứt giáp, nhận thêm 18% sát thương.',
 'Mỗi món có 5 ô đá khảm: 3 ô chỉ số và 2 ô hiệu ứng.',
 'Phi công chính và 3 phi công phụ đều cộng vào lực chiến.',
 'Chiến cơ #11–#13 khung Tím+5 có thể Thần Hóa SSS cùng 1 tàu phụ khung Tím.',
 'Kỹ năng Thần Hóa SSS tự tung khi hồi xong và có mục tiêu.',
 'Siêu Chiến Cơ SSS (7 công thức ghép) và Thần Hóa (#11–#13) là hai nhánh sức mạnh độc lập, hãy mở cả hai.',
 'Trước ải khó, mua Tiếp tế trước trận bằng ◈ để có sẵn khiên và đạn cấp 3.',
 'Vô Tận không rơi đá nâng cấp, chỉ để đua bảng xếp hạng.',
 'Nguyệt Thực là bản khó của các ải đã qua, rơi nhiều nguyên liệu hơn.',
 'Boss Cuối Tuần: ải boss càng cao, điểm mỗi sát thương càng lớn.',
 'Bay lại gần vật phẩm để tự hút chiến lợi phẩm vào tàu.',
 'Boss sắp bắn tia laser luôn có vạch đỏ cảnh báo trước: lách sang bên.',
 'Đạt 3★ một ải để mở Càn quét nhanh ải đó.'];
// Claude sửa so với REVIEW89: mẹo 6 (#9/#10 "gấp đôi" — đo thật #10 yếu nhất khi đứng xa), 19 (5 ô, không phải 8 viên), 20 (3 phụ, không phải 2),
//  23 (hệ cũ là Siêu chiến cơ SSS, không phải robot miễn nhiễm), 25 (chưa có bậc hạng), 26 (chưa chốt 3 lượt), 27, 29, 30 (đặc quyền chưa làm → mẹo càn quét).
window.TIPS90=TIPS90;
const UX90=(()=>{
 const on=()=>window.UX90!==false;const tip=()=>TIPS90[Math.floor(Math.random()*TIPS90.length)];
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 // ---------- A3 · đếm ngược ----------
 let cd=null;
 function countdown(done){if(cd)return;const el=document.createElement('div');el.id='cd90';el.style.cssText='position:fixed;inset:0;z-index:99985;display:flex;align-items:center;justify-content:center;pointer-events:none;font:900 96px/1 system-ui,sans-serif;color:#fff;text-shadow:0 0 24px #3fd2ff,0 4px 0 #04101c';document.body.appendChild(el);
  const steps=['3','2','1','CHIẾN!'];let k=0;const tick=()=>{if(k>=steps.length){el.remove();cd=null;done();return;}el.textContent=steps[k];el.style.fontSize=k===3?'56px':'96px';el.animate&&el.animate([{transform:'scale(1.6)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:220,easing:'ease-out'});k++;cd=setTimeout(tick,k===4?300:500);};tick();}
 function hookPause(){try{if(pause.__u90)return;const o=pause;const f=function(){try{if(on()&&mode==='pause'&&!f.__go){if(cd)return;try{$('overlay').hidden=true;}catch{}countdown(()=>{f.__go=1;try{o.apply(this,arguments);}finally{f.__go=0;}});return;}}catch{}const r=o.apply(this,arguments);try{if(on()&&mode==='pause')pauseTip();}catch{}return r;};f.__u90=1;window.pause=f;try{pause=f;}catch{}}catch{}}
 function pauseTip(){const p=document.getElementById('ovtext');if(!p)return;let t=p.querySelector('.tip90');if(!t){t=document.createElement('small');t.className='tip90';t.style.cssText='display:block;margin-top:10px;color:#9fd8ff;font-size:12px;line-height:1.4';p.appendChild(t);}t.textContent='💡 '+tip();}
 // ---------- C4 · tiếp tế trước trận ----------
 const SUP=[{id:'lv3',n:'Nạp sẵn đạn cấp 3',cost:1200,ic:'▲'},{id:'shield',n:'Khiên đầu trận (chặn 2 đòn)',cost:1500,ic:'🛡'},{id:'od',n:'Thả Bạo Tẩu khi gặp boss',cost:2000,ic:'★'}];
 const KEY='saobang-presupply90';let S={p:{}};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 function buy(id){const s=SUP.find(x=>x.id===id);if(!s||S.p[id])return false;if(!Progress.spendCredits(s.cost)){try{toast('KHÔNG ĐỦ ◈ HỢP KIM');}catch{}return false;}S.p[id]=1;save();try{Q77.track('supply',1);}catch{}return true;}
 function refund(id){const s=SUP.find(x=>x.id===id);if(!s||!S.p[id])return;delete S.p[id];save();try{Progress.grantCredits(s.cost);}catch{}}
 let odArmed=false,blocks=0;
 function applyStart(){try{if(!on()||gameMode!=='campaign'||Dungeons.active()||(typeof Eclipse67!=='undefined'&&Eclipse67.active()))return;}catch{return;}const P=S.p;if(!Object.keys(P).length)return;
  if(P.lv3){try{power=Math.max(power,3);}catch{}}
  if(P.shield)blocks=2;
  odArmed=!!P.od;S.p={};S.used=(S.used|0)+1;save();}
 function bossDrop(){if(!odArmed)return;odArmed=false;try{Safety31.push(drops,100,{x:(typeof W==='number'?W:480)/2,y:(typeof H==='number'?H:1000)*.45,type:'super',t:0,vx:0,vy:-90,ph:0,v40:true});}catch{}}
 function hookGame(){try{if(!reset.__u90){const r0=reset;const f=function(){const r=r0.apply(this,arguments);try{odArmed=false;blocks=0;let k=0;const w=()=>{k++;try{if(mode==='play'&&k>3){applyStart();return;}}catch{}if(k<40)setTimeout(w,100);};setTimeout(w,100);}catch{}return r;};f.__u90=1;window.reset=f;try{reset=f;}catch{}}}catch{}
  try{if(!damage.__u90){const d0=damage;const f=function(){try{if(blocks>0&&mode==='play'&&!(invuln>0)){blocks--;invuln=.8;try{ring(player.x,player.y,'#7fd8ff',46);}catch{}return;}}catch{}return d0.apply(this,arguments);};f.__u90=1;window.damage=f;try{damage=f;}catch{}}}catch{}
  try{if(!startBoss.__u90){const s0=startBoss;const f=function(){const r=s0.apply(this,arguments);try{setTimeout(bossDrop,400);}catch{}return r;};f.__u90=1;window.startBoss=f;try{startBoss=f;}catch{}}}catch{}}
 // nhiệm vụ ngày mới
 function addQuest(){try{if(typeof QUEST_CONFIG_V77!=='undefined'&&!QUEST_CONFIG_V77.DAILY_TASKS.D_SUPPLY)QUEST_CONFIG_V77.DAILY_TASKS.D_SUPPLY={target:1,points:15,title:'Mua tiếp tế trước trận 1 lần',ev:'supply',rw:{alloy:1500}};}catch{}}
 addQuest();setTimeout(addQuest,0);setTimeout(addQuest,1500);
 // bảng ải trên bản đồ: chèn hàng tiếp tế + thưởng lần đầu + mẹo
 const FIRST={120:'45%',140:'50%',160:'60%',180:'100%',200:'100%'};
 function sheetRow(){const sh=document.getElementById('cm-sheet');if(!sh||!sh.classList.contains('open')||sh.querySelector('.su90'))return;const go=sh.querySelector('.cm-go');if(!go)return;
  const n=+((sh.querySelector('h4')||{}).textContent||'').replace(/\D+/g,' ').trim().split(' ')[0]||0;
  const box=document.createElement('div');box.className='su90';box.style.cssText='grid-column:1/-1;margin:4px 0;font-size:11px;color:#cfe6ff';
  const paint=()=>{let bal=0;try{bal=Progress.balance();}catch{}
   box.innerHTML=(FIRST[n]?`<p style="margin:2px 0;color:#ffd36a">🎁 Lần đầu hạ boss: ${FIRST[n]} bản sao Tím Lv1${n<=160?' · trượt vẫn có quà bảo hiểm':''}</p>`:'')+
    `<p style="margin:2px 0 4px;color:#9fc0da">TIẾP TẾ TRƯỚC TRẬN · dùng cho trận kế tiếp · ◈ ${bal.toLocaleString('vi-VN')}</p><div style="display:flex;gap:4px">`+
    SUP.map(s=>{const got=!!S.p[s.id];return `<button data-su90="${s.id}" style="flex:1;padding:5px 3px;font-size:10px;line-height:1.25;border:1px solid ${got?'#46ffb2':'#3e6f98'};background:${got?'rgba(20,70,50,.85)':'rgba(11,29,51,.85)'};color:#e8f4ff;border-radius:6px">${s.ic} ${esc(s.n)}<br><b>${got?'✓ ĐÃ MUA':s.cost.toLocaleString('vi-VN')+' ◈'}</b></button>`;}).join('')+`</div><p style="margin:4px 0 0;color:#7fa6c4;font-size:10px">💡 ${esc(tip())}</p>`;};
  paint();box.addEventListener('click',e=>{const b=e.target.closest('[data-su90]');if(!b)return;e.stopPropagation();const id=b.dataset.su90;if(S.p[id])refund(id);else buy(id);paint();});
  const act=sh.querySelector('.cm-act');sh.insertBefore(box,act||null);}
 // ---------- A5 · nút ĐI TỚI ở nhiệm vụ ----------
 const ROUTE={stage:'map',sweep:'map',energy:'map',boss:'map',supply:'map',tower:'tower',towerf:'tower',upgrade:'evo',stone:'stone',endless:'combat',market:'market'};
 function go(r){try{document.querySelectorAll('.q77').forEach(e=>e.hidden=true);}catch{}
  try{if(r==='map')ChapterMap.open();else if(r==='tower')Meta40.towerPanel();else if(r==='evo')Evo82.open();else if(r==='stone')Stone71.inv();else if(r==='market')Trade67.open('bm');else if(r==='combat')Nav74.tab('combat');}catch(e){}}
 function questBtns(){for(const row of document.querySelectorAll('.q77-t')){if(row.classList.contains('done')||row.querySelector('.go90'))continue;const b=row.querySelector('b');if(!b)continue;let ev=null;try{const all={...QUEST_CONFIG_V77.DAILY_TASKS,...QUEST_CONFIG_V77.WEEKLY_TASKS};for(const k in all)if(all[k].title===b.textContent){ev=all[k].ev;break;}}catch{}const r=ROUTE[ev];if(!r)continue;
  const btn=document.createElement('button');btn.className='go90';btn.textContent='ĐI TỚI';btn.style.cssText='margin-left:6px;padding:4px 8px;font-size:10px;font-weight:800;border:1px solid #ffd36a;background:#3a2a08;color:#ffd36a;border-radius:6px';btn.addEventListener('click',e=>{e.stopPropagation();go(r);});const em=row.querySelector('em');(em||row).after?em.after(btn):row.appendChild(btn);}}
 // ---------- A4 · mẹo ở màn tải (bản online) ----------
 function loadTip(){const t=document.getElementById('sp79t');if(!t)return;}
 // ---------- REVIEW90 §3 · cộng lực chiến cho Thần Hóa (+1.800) và Đồng đội (+15% lực chiến tàu đồng đội, +20% nếu đúng cặp Thần Hóa) ----------
 let inCP=false,cpH=false;
 function hookCP(){if(cpH)return;try{const ost=Combat.stats;cpH=true;Combat.stats=function(){const r=ost.apply(this,arguments);if(inCP||!r)return r;try{let add=0;
   if(window.SSS87&&SSS87.active&&SSS87.active())add+=1800;
   const m=window.Wing87&&Wing87.mate&&Wing87.mate();if(m!=null){inCP=true;let mc=0;const lc=launchCraft;try{launchCraft=m;mc=ost.apply(this,arguments).cp||0;}finally{launchCraft=lc;inCP=false;}add+=Math.round(mc*((Wing87.ratio()>.3)?.20:.15));}
   if(add>0)return Object.assign({},r,{cp:Math.round(r.cp+add)});}catch{inCP=false;}return r;};}catch{}}
 // ---------- A1 · bấm tính năng còn khóa → thẻ giới thiệu lớn (thay dòng "MỞ Ở ẢI X") — câu giới thiệu theo FEATURE_ROADMAP_V89 của Gemini ----------
 const DESC90=[[/phi công|tiềm năng/i,'Chiêu mộ phi công tinh nhuệ: phi công chính có nội tại, 3 phụ cộng chỉ số.'],[/vô tận/i,'Sống sót qua các đợt quái bất tận để đua bảng xếp hạng mùa.'],[/tháp/i,'Leo từng tầng tháp, mỗi tầng thưởng 1 lần và đá khảm quý.'],
  [/đá|khảm/i,'Khảm đá tăng công, máu và hiệu ứng đặc biệt cho trang bị.'],[/phá vây/i,'Vượt chuỗi chặng liên hoàn, chọn tiếp tế chiến thuật sau mỗi chặng.'],
  [/siêu|sss/i,'Ghép 2 chiến cơ thành Siêu Chiến Cơ SSS có tia riêng và tuyệt kỹ.'],[/cuối tuần|thủ lĩnh/i,'Đánh boss bất tử theo luật tuần, tích điểm mở chiến cơ #11.'],[/nguyệt thực/i,'Bản khó của các ải đã qua, rơi đá khảm và nguyên liệu đột phá.'],
  [/skin|hào quang|danh hiệu|diện mạo/i,'Tùy chỉnh ngoại hình tàu, hào quang và danh hiệu.'],[/thần hóa/i,'Hợp thể chiến cơ #11–#13 với tàu phụ để lên bậc SSS.'],[/chợ đen|giao dịch/i,'Đổi bản sao trang bị và đá theo phiên làm mới.'],
  [/phó bản/i,'Ải chuyên biệt thu thập nhiều ◈ hợp kim và đá.'],[/đột phá|tiến hóa/i,'Ghép bản sao Lv1 cùng loại để nâng khung Trắng → Lục → Lam → Tím.'],[/nhiệm vụ|thành tựu/i,'Hoàn thành mục tiêu nhận ◈, 💎 và trang bị.'],
  [/vòng quay/i,'Quay thưởng mỗi ngày bằng vé có sẵn.'],[/viễn chinh|tuần tra/i,'Gửi phi đội đi tuần tra, nhận tài nguyên theo thời gian.']];
 let lastEl=null;document.addEventListener('click',e=>{try{lastEl=e.target.closest('button,[data-s],[data-go74],[data-n74],a')||null;}catch{}},true);
 function lockCard(lv){const el0=lastEl;const name=((el0&&(el0.getAttribute('aria-label')||el0.textContent))||'Tính năng').replace(/\s+/g,' ').replace(/🔒/g,'').trim().slice(0,40);
  const d=(DESC90.find(([re])=>re.test(name))||[null,'Tính năng mới đang chờ bạn ở chặng sau của chiến dịch.'])[1];let ic='';try{const i=el0&&el0.querySelector('i,img,svg');if(i)ic=i.outerHTML;}catch{}
  let c=document.getElementById('lk90');if(c)c.remove();c=document.createElement('div');c.id='lk90';c.className='m63';c.innerHTML=`<div class="m63-card" style="text-align:center"><div class="m63-eye">TÍNH NĂNG CHƯA MỞ</div>
   <div style="width:110px;height:110px;margin:6px auto;display:flex;align-items:center;justify-content:center;font-size:64px;border-radius:50%;background:radial-gradient(circle,#1d3b62,#071222);border:2px solid #ffd36a;box-shadow:0 0 24px #ffd36a55;overflow:hidden">${ic||'🔒'}</div>
   <h3 style="margin:6px 0">${esc(name)}</h3><p style="color:#cfe6ff;font-size:13px;margin:4px 0 10px">${esc(d)}</p><p style="color:#ffd36a;font-weight:800;font-size:15px;margin:0 0 12px">🔒 Vượt ải ${lv} để mở</p>
   <button class="m63-go" data-lk90="x">ĐÃ HIỂU</button></div>`;document.body.appendChild(c);c.hidden=false;c.addEventListener('click',e=>{if(e.target===c||e.target.closest('[data-lk90]'))c.remove();});
  try{const sv=c.querySelector('svg,img,i');if(sv){sv.style.width='64px';sv.style.height='64px';sv.style.fontSize='56px';}}catch{}}
 let TH=false;function hookToast(){if(TH)return;try{const o=toast;TH=true;const f=function(m){try{const s=String(m);const mm=/MỞ Ở ẢI\s*(\d+)/i.exec(s);let b=false;try{b=mode==='play'||mode==='pause';}catch{}if(on()&&mm&&!b){lockCard(mm[1]);return;}}catch{}return o.apply(this,arguments);};window.toast=f;try{toast=f;}catch{}}catch{}}
 function install(){hookPause();hookGame();hookCP();hookToast();}
 install();setTimeout(install,400);setTimeout(install,2000);
 setInterval(()=>{try{if(!on())return;sheetRow();questBtns();}catch{}},500);
 return {on,tip,buy,refund,blocks:()=>blocks,state:()=>JSON.parse(JSON.stringify(S)),applyStart,_set:o=>{Object.assign(S,o);save();}};
})();
window.UX90=UX90;
