// V84 · DANH HIỆU + HÀO QUANG (Gemini REVIEW84 §C) — vẽ bằng canvas 2D, 0 KB ảnh.
//  • Kẻ Thôn Tinh (Xoáy Thôn Tinh): mốc 5 Boss cuối tuần, 7 ngày, +2% sát thương. Nhận lại khi còn hạn → làm mới đủ 7 ngày + 15.000 ◈.
//  • Bá Chủ Thiên Hà (Nhật Thực Hoàng Kim): hạng 1 BXH tuần — danh hiệu V79D có sẵn (+3% sức công, 7 ngày); V84 thêm hào quang + 3% máu.
//  • Đế Vương Hư Không (Ấn Triện Thứ Nguyên): vượt ải 180 (Chương 9), vĩnh viễn, +3% sát thương, +2% máu.
//  V86 (Gemini REVIEW85 G6): chỉ 1 vòng hào quang quanh tàu. Thứ tự tự động: Danh hiệu (Đế Vương > Bá Chủ > Kẻ Thôn Tinh) > hào quang skin (Bạo Tẩu) > Lễ hội.
//   Người chơi chọn tay ở thẻ danh hiệu (khóa saobang-aura-pref: auto/title84/skin/fest78/off). Chỉ số luôn cộng dồn dù tắt hình.
//   Nhãn danh hiệu nhỏ dưới đuôi tàu (+34 px). Đạn địch > 25 viên → hào quang và nhãn mờ xuống 0,22 (bình thường 0,75).
//  Có nhiều hào quang: chỉ số cộng dồn, chạm vào thẻ danh hiệu ở sảnh để đổi hào quang hiển thị. Khóa lưu mới: saobang-title84. Tắt: window.TITLE84=false
const TITLE84={
 items:{
  AURA_STAR_DEVOURER:{title:'Kẻ Thôn Tinh',aura:'Xoáy Thôn Tinh',days:7,dmg:.02,hp:0,c1:'#9D4EDD',c2:'#FF0055',r:44,spin:1.8},
  AURA_GALAXY_OVERLORD:{title:'Bá Chủ Thiên Hà',aura:'Nhật Thực Hoàng Kim',days:7,dmg:0,hp:.03,c1:'#FFD166',c2:'#FF9F1C',r:48,spin:2.2,note:'+3% sức công có sẵn từ BXH tuần'},
  AURA_VOID_MONARCH:{title:'Đế Vương Hư Không',aura:'Ấn Triện Thứ Nguyên',days:0,dmg:.03,hp:.02,c1:'#00F5D4',c2:'#7209B7',r:46,spin:-1.5}},
 order:['AURA_VOID_MONARCH','AURA_GALAXY_OVERLORD','AURA_STAR_DEVOURER'],dupAlloy:15000,
 modes:[['auto','Tự động'],['title84','Danh hiệu'],['skin','Skin Bạo Tẩu'],['fest78','Lễ hội'],['off','Tắt hình']],normalA:.75,crowdA:.22,crowdN:25};
const Title84=(()=>{
 const on=()=>window.TITLE84!==false;const C=TITLE84,KEY='saobang-title84',DAY=86400000;
 let S={own:{},show:''};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const PK='saobang-aura-pref';let pref='auto';try{const v=localStorage.getItem(PK);if(C.modes.some(m=>m[0]===v))pref=v;}catch{}
 function festOn(){try{const f=JSON.parse(localStorage.getItem('saobang-fest78')||'{}');return !!(f.on&&f.aura&&f.aura[f.on]);}catch{return false;}}
 function chosen(){if(pref==='off')return null;if(pref!=='auto')return pref;if(on()&&list().length)return 'title84';let sup=false;try{sup=superTime>0;}catch{}if(sup)return 'skin';return festOn()?'fest78':null;}
 window.AURA85={allow:k=>chosen()===k,pref:()=>pref,set:v=>{if(C.modes.some(m=>m[0]===v)){pref=v;try{localStorage.setItem(PK,v);}catch{}}}};
 const crowdA=()=>{let n=0;try{for(const b of bullets)if(!b.dead&&++n>C.crowdN)break;}catch{}return n>C.crowdN?C.crowdA:C.normalA;};
 function overlord(){try{const W=JSON.parse(localStorage.getItem('saobang-wk79')||'{}')||{};const t=W.title;return t&&t.until>Date.now()&&(t.rank|0)===1?t.until:0;}catch{return 0;}}
 function cleared180(){try{return (Progress.getState().cleared||[]).includes(180);}catch{return false;}}
 // hạn dùng: 0 = không có · -1 = vĩnh viễn · số = mốc ms
 function until(id){if(id==='AURA_GALAXY_OVERLORD')return overlord();const o=S.own[id];if(!o)return 0;if(o.until===-1)return -1;return o.until>Date.now()?o.until:0;}
 const act=id=>until(id)!==0;
 const list=()=>C.order.filter(act);
 function grant(id,days){const it=C.items[id];if(!it)return '';const now=Date.now();
  if(id==='AURA_VOID_MONARCH'){if(S.own[id])return '';S.own[id]={until:-1};save();return 'Danh hiệu «'+it.title+'» vĩnh viễn';}
  const d=(days||it.days)*DAY,still=act(id);S.own[id]={until:now+d};if(!S.show)S.show=id;save();
  if(still){try{Progress.grantCredits(C.dupAlloy);}catch{}return 'Danh hiệu «'+it.title+'» làm mới '+(days||it.days)+' ngày + '+fmt(C.dupAlloy)+' ◈ bù';}
  return 'Danh hiệu + hào quang «'+it.title+'» '+(days||it.days)+' ngày';}
 function bonus(k){let v=0;for(const id of list())v+=C.items[id][k]||0;return v;}
 function shown(){const L=list();if(!L.length)return null;return L.includes(S.show)?S.show:L[0];}
 function cycle(){const L=list();if(L.length<2)return;const i=L.indexOf(shown());S.show=L[(i+1)%L.length];save();chip(true);try{toast('✦ HÀO QUANG · '+C.items[S.show].aura.toUpperCase());}catch{}}
 const left=u=>u===-1?'vĩnh viễn':(()=>{const h=Math.max(0,(u-Date.now())/3600000);return h>=24?'còn '+Math.ceil(h/24)+' ngày':'còn '+Math.ceil(h)+' giờ';})();
 // ---------- thẻ ở sảnh ----------
 let lastTxt='';
 function chip(force){try{const b=document.querySelector('#hgr41 .h1-badge');let el=document.getElementById('tt84');const id=on()?shown():null;
  // V84: thẻ danh hiệu BXH tuần (#tt79, V79D) trước đây nằm dưới sân khấu, bị thẻ phi công che → đưa lên trên nhãn kỹ năng
  try{const t79=document.getElementById('tt79');if(b&&t79){t79.style.top=Math.max(4,b.offsetTop-50)+'px';}}catch{}
  if(!b||!id){if(el)el.remove();lastTxt='';return;}
  if(!el){el=document.createElement('button');el.id='tt84';el.type='button';el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();picker();});b.after(el);}
  const it=C.items[id],n=list().length,st=[it.dmg?'+'+Math.round(it.dmg*100)+'% sát thương':'',it.hp?'+'+Math.round(it.hp*100)+'% máu':''].filter(Boolean).join(' · ');
  const txt='✦ ['+it.title+'] '+st+' · '+left(until(id))+' · chạm để chọn';
  if(force||txt!==lastTxt){el.textContent=txt;el.style.setProperty('--tc',it.c1);lastTxt=txt;}
  const low=!!document.getElementById('tt79');el.style.top=Math.max(4,b.offsetTop-(low?76:50))+'px';}catch{}}
 // ---------- chỉ số ----------
 const done={};
 function install(){if(!on())return;
  try{if(!done.f&&Combat.factor){done.f=1;const o=Combat.factor;Combat.factor=function(){const v=o.apply(this,arguments);let b=0;try{b=bonus('dmg');}catch{}return b?v*(1+b):v;};}}catch{}
  try{if(!done.r&&window.reset){done.r=1;const o=window.reset;const f=function(){const r=o.apply(this,arguments);try{if(mode==='play'){const b=bonus('hp');if(b>0&&maxHp>0){const k=hp/maxHp;maxHp=Math.round(maxHp*(1+b)*10)/10;hp=Math.min(maxHp,Math.max(hp,maxHp*k));}}}catch{}return r;};window.reset=f;try{reset=f;}catch{}}}catch{}
  try{if(!done.u&&typeof FX40!=='undefined'&&FX40.under){done.u=1;const o=FX40.under;FX40.under=function(){const r=o.apply(this,arguments);try{draw();}catch{}return r;};}}catch{}}
 // ---------- hào quang dưới tàu ----------
 function draw(){let m='';try{m=mode;}catch{}if(m!=='play'&&m!=='pause')return;const id=shown();if(!id)return;const it=C.items[id];let t=0;try{t=time;}catch{t=performance.now()/1000;}
  const GA=crowdA();if(window.AURA85.allow('title84'))ring(id,it,t,GA);
  // nhãn danh hiệu dưới đuôi tàu
  if(pref==='off'||window.V100!==false)return;/* V100 (REVIEW98 §1.3): bỏ nhãn danh hiệu dưới đuôi tàu trong trận */ctx.save();ctx.globalAlpha=GA;ctx.font="800 10px system-ui,sans-serif";ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#06101ccc';ctx.strokeText('['+it.title+']',player.x,player.y+46);ctx.fillStyle=it.c1;ctx.fillText('['+it.title+']',player.x,player.y+46);ctx.restore();}
 function ring(id,it,t,GA){
  // vẽ thành vòng phẳng dưới chân tàu (ép dẹt 0,42) để không lẫn với bong bóng khiên tròn quanh tàu
  const x=0,y=0,R=it.r*1.3,a=t*it.spin;ctx.save();ctx.translate(player.x,player.y+30);ctx.scale(1,.42);ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
  const glow=ctx.createRadialGradient(x,y,R*.2,x,y,R*1.15);glow.addColorStop(0,it.c1+'00');glow.addColorStop(.65,it.c1+'40');glow.addColorStop(1,it.c2+'00');ctx.globalAlpha=GA;ctx.fillStyle=glow;ctx.beginPath();ctx.arc(x,y,R*1.15,0,Math.PI*2);ctx.fill();
  if(id==='AURA_STAR_DEVOURER'){// xoáy kép tím – đỏ
   for(let k=0;k<2;k++){const col=k?it.c2:it.c1,rr=k?R:R*.72,dir=k?1:-1;ctx.strokeStyle=col;ctx.globalAlpha=GA*.85;ctx.lineWidth=k?5:4;
    for(let j=0;j<3;j++){const s=a*dir+j*Math.PI*2/3;ctx.beginPath();ctx.arc(x,y,rr,s,s+1.25);ctx.stroke();}}}
  else if(id==='AURA_GALAXY_OVERLORD'){// nhật thực 8 tia vàng kim, xung sáng nhẹ
   const p=.75+.25*Math.sin(t*3);ctx.strokeStyle=it.c1;ctx.globalAlpha=GA*.8*p;ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,R*.78,0,Math.PI*2);ctx.stroke();
   ctx.strokeStyle=it.c2;ctx.lineWidth=4;for(let j=0;j<8;j++){const s=a*.4+j*Math.PI/4;ctx.globalAlpha=GA*.85*p;ctx.beginPath();ctx.moveTo(x+Math.cos(s)*R*.86,y+Math.sin(s)*R*.86);ctx.lineTo(x+Math.cos(s)*R*(1.05+.08*p),y+Math.sin(s)*R*(1.05+.08*p));ctx.stroke();}}
  else{// hai lục giác xanh băng – tím ngược chiều
   for(let k=0;k<2;k++){const col=k?it.c2:it.c1,rr=k?R:R*.8,s=k?-a:a;ctx.strokeStyle=col;ctx.globalAlpha=GA*(k?.9:.8);ctx.lineWidth=4;ctx.beginPath();
    for(let j=0;j<=6;j++){const q=s+j*Math.PI/3;const px=x+Math.cos(q)*rr,py=y+Math.sin(q)*rr;j?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();}}
  ctx.restore();}
 function picker(){let el=document.getElementById('au86');if(!el){el=document.createElement('div');el.id='au86';el.className='m63';document.body.appendChild(el);
   el.addEventListener('click',e=>{const b=e.target.closest('[data-au]');if(!b){if(e.target===el)el.hidden=true;return;}const [k,v]=b.dataset.au.split(':');if(k==='m')window.AURA85.set(v);if(k==='t'){S.show=v;save();}if(k==='x'){el.hidden=true;return;}chip(true);picker();});}
  const L=list();el.innerHTML=`<div class="m63-card au86"><div class="m63-eye">DANH HIỆU & HÀO QUANG</div>${window.V100!==false?'':`<h3>Hào quang hiển thị</h3><div class="au86-row">${C.modes.map(([k,n])=>`<button data-au="m:${k}" class="${pref===k?'on':''}">${n}</button>`).join('')}</div>`}
   <p class="ev83n">Chỉ hiện 1 vòng hào quang. Chỉ số của mọi danh hiệu đang có luôn được cộng, kể cả khi tắt hình. Đạn địch dày thì hào quang tự mờ để dễ né.</p>
   ${L.length?`<div class="adv-req-t">DANH HIỆU ĐANG CÓ</div>${L.map(id=>{const it=C.items[id];return `<button class="au86-t ${shown()===id?'on':''}" data-au="t:${id}" style="--tc:${it.c1}"><b>[${it.title}]</b><small>${it.aura} · ${[it.dmg?'+'+Math.round(it.dmg*100)+'% sát thương':'',it.hp?'+'+Math.round(it.hp*100)+'% máu':''].filter(Boolean).join(' · ')} · ${left(until(id))}</small></button>`;}).join('')}`:''}
   <div class="adv-btns"><button class="adv-x" data-au="x:x">ĐÓNG</button></div></div>`;el.hidden=false;}
 function tick(){if(!on())return;try{if(cleared180()&&!S.own.AURA_VOID_MONARCH){const t=grant('AURA_VOID_MONARCH');if(t)try{toast('✦ '+t.toUpperCase()+' · +3% SÁT THƯƠNG · +2% MÁU');}catch{}}}catch{}chip(false);}
 install();setTimeout(install,350);setTimeout(install,2200);setInterval(tick,1500);
 return {grant,list,bonus,shown,cycle,until,picker,state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();}};
})();
window.Title84=Title84;
