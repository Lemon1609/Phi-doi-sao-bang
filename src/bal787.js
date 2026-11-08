// V78.7 · cân bằng theo Gemini REVIEW78_6 (đã đối chiếu số thật trong game) + yêu cầu chủ dự án
//  • Buff: ngưỡng tích lũy theo chương 22–28 / 32–40 / 45–55 · trên màn tối đa 2/1/1 · cả ải tối đa 5/4/3 · siêu cấp từ tinh anh 5%/3%/1,5%
//    (KHÔNG cho buff tự biến mất — chủ dự án yêu cầu buff ở lại tới khi nhặt; số lượng được siết bằng trần thay thế)
//  • Hỏa lực đã tối đa mà nhặt thêm → Bạo Tẩu 6 s
//  • Lực chiến đề nghị ải 1–20 hạ dần từ 750 (tân thủ 904 không bị báo đỏ); vượt ≥115% đề nghị → Áp đảo hỏa lực +25% sát thương
//  • Đạn boss có trần riêng (bossCap); boss chương từ ải 41: mỗi lần đổi pha người chơi được sửa chữa +20% máu
//  • Khiên chặn đòn từ ải 121: vỡ khiên xóa đạn 110 px, bất tử 1 s
//  • Tiếp tế thể lực trưa 11–14h và tối 18–22h: +50 thể lực, +2 vé càn quét (mỗi khung 1 lần/ngày)
//  • Bảng nâng khung: chạm nguyên liệu → gợi ý ải boss rơi đúng loại + CÀN QUÉT ngay
//  • Màn kết quả: phần hợp kim thưởng ẩn (mở tính năng) hiện thành ô "Thưởng mở khóa"
//  Tắt: window.BAL787=false
const Bal787=(()=>{
 const on=()=>window.BAL787!==false;
 const stage=()=>{try{if(gameMode==='campaign')return +document.getElementById('mission-select').value||level||1;if(gameMode==='endless')return Math.min(160,(level||1)*4);}catch{}return 1;};
 const tier=()=>{const s=stage();return s<=40?0:s<=80?1:2;};
 const T={need:[[22,28],[32,40],[45,55]],cap:[2,1,1],total:[5,4,3],sup:[.05,.03,.015]};
 let spawned=0,lastPh=-1,lastBoss=null,cr0=null,ovShown=false;
 const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
 function buffNeed(){const [a,b]=T.need[tier()];return rnd(a,b);}
 function buffCap(){return on()?T.cap[tier()]:2;}
 function buffOk(){return !on()||spawned<T.total[tier()];}
 function buffSpawned(){spawned++;}
 function superRate(){return on()?T.sup[tier()]:.1;}
 // ---- lực chiến đề nghị ----
 function earlyReq(n,v){if(!on()||n>20)return v;let v20=v;try{v20=REQ0(20);}catch{}const a=750;return Math.round(a+(v20-a)*((n-1)/19));}
 let REQ0=null;
 // ---- V78.9 · buff khi đánh boss: phá cánh/phá giáp chỉ 1 buff, tối đa 3/2/2 buff mỗi boss (theo chương), không rơi siêu cấp ----
 const BB=[3,2,2],GAP=3.5;let bbBoss=null,bbUsed=0,bbAt=-99;
 function bossTake(){if(!on())return true;if(bbBoss!==boss){bbBoss=boss;bbUsed=0;bbAt=-99;}let t=0;try{t=time;}catch{}if(bbUsed>=BB[tier()]||t-bbAt<GAP)return false;bbUsed++;bbAt=t;return true;}
 function bossDrop(x,y,src){if(!bossTake())return '';let k='';try{const low=hp<maxHp*.55,pmax=typeof power==='number'&&power>=5;k=low?'heal':!pmax?'power':(hp<maxHp*.85?'heal':'');}catch{k='power';}
  if(!k){bbUsed--;bbAt=-99;return '';}try{Safety31.push(drops,100,{x,y,type:k,t:0});}catch{}return k;}
 function overpower(){try{if(!on()||gameMode!=='campaign'||(typeof Dungeons!=='undefined'&&Dungeons.active()))return false;const n=stage();return Combat.stats().cp>=1.15*Meta40.reqCP(n);}catch{return false;}}
 let opCache=false,opAt=-1;
 // ---- tiếp tế thể lực ----
 const KEY='saobang-bal787';let S={};try{S=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const today=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();};
 function supply(){if(!on())return;try{if(['play','pause','reward','over'].includes(mode))return;}catch{}const h=new Date().getHours(),w=h>=11&&h<14?'noon':h>=18&&h<22?'eve':null;if(!w)return;const k=today()+':'+w;if(S.sup===k)return;
  const lb=document.getElementById('hgr41');if(!lb||lb.hidden)return;S.sup=k;save();try{V75.addEn(50);}catch{}try{V75.addTk(2);}catch{}try{toast(w==='noon'?'🍱 TIẾP TẾ TRƯA · +50 thể lực · +2 vé càn quét':'🌙 TIẾP TẾ TỐI · +50 thể lực · +2 vé càn quét');}catch{}}
 // ---- quét nguyên liệu từ bảng nâng khung ----
 let lastOpen=null;
 function bestStageFor(id){const ty=id.replace(/\d$/,''),t=+id.slice(-1);let cl=[];try{cl=Progress.getState().cleared||[];}catch{}let best=null,any=null;
  for(let s=5;s<=160;s+=5){let m=null;try{m=V70.matOf(s);}catch{}if(!m||m.id!==ty)continue;const tt=(typeof Map78!=='undefined')?Map78.tierOf(s):1;if(!any&&tt===t)any=s;if(tt===t&&cl.includes(s))best=s;}
  return {best,any};}
 function sweepSheet(id){let el=document.getElementById('sw787');if(!el){el=document.createElement('div');el.id='sw787';document.body.appendChild(el);el.addEventListener('click',e=>{const b=e.target.closest('[data-sw]');if(!b){if(e.target===el)el.remove();return;}const k=b.dataset.sw,n=+b.dataset.n;
    if(k==='x'){el.remove();return;}if(k==='go'){el.remove();try{document.querySelectorAll('.m63').forEach(m=>m.hidden=true);Nav74.tab('combat');setTimeout(()=>{try{Nav74.sub('map');}catch{}},90);}catch{}return;}
    if(k==='sweep'){let r=null;try{r=Campaign36.sweep(n);}catch{}if(r){try{toast('CÀN QUÉT ẢI '+n+' · nhận nguyên liệu');}catch{}el.remove();if(lastOpen)setTimeout(()=>{try{V70.open(lastOpen[0],lastOpen[1]);}catch{}},120);}}});}
  const {best,any}=bestStageFor(id);let nm=id;try{nm=V70.matName(id);}catch{}let ic='';try{ic=V70.icon(id);}catch{}let en=0;try{en=V75.energy();}catch{}
  el.innerHTML=`<div class="sw787c"><img src="${ic}" alt=""><b></b><p></p><div class="sw787b">${best?`<button data-sw="sweep" data-n="${best}">CÀN QUÉT ẢI ${best}<small>−6 🔋 · còn ${en}</small></button>`:''}<button data-sw="go" data-n="${best||any||0}">ĐẾN BẢN ĐỒ</button><button data-sw="x">ĐÓNG</button></div></div>`;
  el.querySelector('b').textContent=nm;el.querySelector('p').textContent=best?('Rơi ở ải boss '+best+' (đã vượt). Càn quét để nhận ngay.'):any?('Rơi ở ải boss '+any+'. Hãy vượt ải đó trước.'):'Rơi ở các ải mini boss / boss và phó bản vật liệu.';}
 // ---- thưởng ẩn trên màn kết quả ----
 function hiddenBonus(){const rs=document.querySelector('#overlay #rs');if(!rs||rs.dataset.b787||cr0==null)return;const loot=rs.querySelector('.rs-loot');if(!loot)return;rs.dataset.b787=1;
  let now=0;try{now=Progress.balance();}catch{return;}let shown=0;for(const t of rs.querySelectorAll('.rw78,.rs-chip')){const s=(t.title||t.textContent||'');if(/hợp kim|◈/i.test(s)){const m=s.replace(/[.,]/g,'').match(/(\d+)/);if(m)shown+=+m[1];}}
  const extra=now-cr0-shown;if(extra>=500){const d=document.createElement('div');d.className='rw78';d.title='Thưởng mở khóa +'+extra.toLocaleString('vi-VN')+' hợp kim';let src='';try{src=ICON74.res_hop_kim;}catch{}d.innerHTML='<img alt="" src="'+src+'"><span class="n"></span>';d.querySelector('.n').textContent='+'+(extra>=1000?Math.round(extra/100)/10+'K':extra);loot.appendChild(d);
   try{toast('🎁 THƯỞNG MỞ KHÓA · +'+extra.toLocaleString('vi-VN')+' hợp kim');}catch{}}}
 function install(){
  try{const sr=Combat.stageRequirement;REQ0=sr;Combat.stageRequirement=function(n){const v=sr.apply(this,arguments);try{if(gameMode==='campaign'&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active()))return earlyReq(n,v);}catch{}return v;};}catch{}
  try{const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);try{if(time-opAt>.5||opAt<0){opAt=time;opCache=overpower();}}catch{}return opCache?v*1.25:v;};}catch{}
  try{const bc=Bullet66.cur;Bullet66.cur=function(){const r=bc.apply(this,arguments);try{if(on()&&boss&&r&&r.bossCap)return Object.assign({},r,{cap:Math.round(r.bossCap)});}catch{}return r;};}catch{}
  try{const r0=reset;reset=function(){const r=r0.apply(this,arguments);spawned=0;lastPh=-1;lastBoss=null;ovShown=false;opAt=-1;try{cr0=Progress.balance();}catch{cr0=null;}
    setTimeout(()=>{try{if(mode==='play'&&overpower()){toast('⚡ ÁP ĐẢO HỎA LỰC · sát thương +25%');}}catch{}},1600);return r;};}catch{}
  try{const c0=collect;collect=function(d){const maxP=d&&d.type==='power'&&typeof power==='number'&&power>=5;const r=c0.apply(this,arguments);try{if(on()&&maxP&&mode==='play'){if(superTime<=0){activateSuper();superTime=Math.min(superTime,6);try{toast('HỎA LỰC TỐI ĐA → BẠO TẨU 6 GIÂY');}catch{}}}}catch{}return r;};}catch{}
  try{const u0=update;update=function(){const r=u0.apply(this,arguments);try{if(on()&&mode==='play'&&stage()>40&&gameMode==='campaign'){const st=typeof B75!=='undefined'&&B75.state();if(st&&boss){if(lastBoss!==boss){lastBoss=boss;lastPh=st.ph;}else if(st.ph>lastPh){lastPh=st.ph;const add=maxHp*.2;hp=Math.min(maxHp,hp+add);try{ring(player.x,player.y,'#86ffb6',60);toast('🔧 SỬA CHỮA KHẨN · +20% MÁU');hud();}catch{}}}}
     window.SH78R=stage()>120?110:90;window.SH78I=stage()>120?1:.8;}catch{}return r;};}catch{}
  try{const vo=V70.open;V70.open=function(k,ref){lastOpen=[k,ref];return vo.apply(this,arguments);};}catch{}
  document.addEventListener('click',e=>{if(!on())return;const b=e.target.closest&&e.target.closest('.adv-req .adv-m[data-a="src"]');if(!b)return;const id=b.dataset.v;if(!id||!/^[a-z]+[123]$/.test(id))return;e.preventDefault();e.stopImmediatePropagation();sweepSheet(id);},true);
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#lobby-back');if(!b)return;if(b.dataset.lock787&&Date.now()-b.dataset.lock787<900){e.preventDefault();e.stopImmediatePropagation();return;}b.dataset.lock787=Date.now();},true);
  setInterval(()=>{try{supply();}catch{}},3000);setInterval(()=>{try{hiddenBonus();}catch{}},400);
 }
 setTimeout(install,70);
 return {bossDrop,bossTake,bossState:()=>({used:bbUsed,max:BB[tier()]}),buffNeed,buffCap,buffOk,buffSpawned,superRate,state:()=>({bb:bbUsed,tier:tier(),spawned,stage:stage(),op:opCache}),_sheet:sweepSheet,earlyReq};
})();
window.Bal787=Bal787;
