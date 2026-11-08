// V82 · tranh GPT gói V80–V81 cho 12 trang bị: bộ 6 (Lò Rèn), bộ 7 (Vực Tối), bộ 8 (Bình Minh), bộ 9 (Kỳ Hạm)
//  • Icon kho riêng từng món (thay tranh mượn), đạn riêng (beam thường / siêu), vệt đuôi, lóe nòng.
//  • Bộ 9: bệ tên lửa và tàu con dùng icon của chính món (bệ phóng, drone).
//  • Chỉ đổi HÌNH: sát thương, hitbox, tốc độ đạn giữ nguyên. Tắt: window.ART82=false
const ART82_MAP={aegis9:'fleet_armor',swarm9:'fleet_missile',carrier9:'fleet_aux',aurora36:'forge_armor',comet36:'forge_missile',lance36:'forge_aux',
 void36:'void_armor',nova36:'void_missile',orbit36:'void_aux',seraph36:'dawn_armor',judgement36:'dawn_missile',halo36:'dawn_aux',
 devour10_a:1,devour10_m:1,devour10_s:1,chrono11_a:1,chrono11_m:1,chrono11_s:1,monarch12_a:1,monarch12_m:1,monarch12_s:1};
const Art82=(()=>{
 const on=()=>window.ART82!==false&&typeof GEAR44_ASSETS!=='undefined';
 const IM={};const img=k=>{if(!(k in IM)){const u=GEAR44_ASSETS[k];IM[k]=u?Object.assign(new Image(),{src:u}):null;}const m=IM[k];return m&&m.complete&&m.naturalWidth?m:null;};
 // icon kho: CSS theo biến thể (như gear44 làm cho món gốc)
 function css(){if(document.getElementById('art82-css'))return;const R=[];for(const v in ART82_MAP){const u=GEAR44_ASSETS[v+'_icon'];if(u)R.push(`.gear25-art.a82-${v}{background-image:url(${u})!important;background-size:82% auto!important;background-position:50% 42%!important;filter:drop-shadow(0 0 8px var(--rank-color))!important}`);}
  const s=document.createElement('style');s.id='art82-css';s.textContent=R.join('\n');document.head.appendChild(s);}
 function hookArt(){try{if(Progress.art.__a82)return;const o=Progress.art;const f=function(i,extra){const h=o.apply(this,arguments);try{if(on()&&i&&ART82_MAP[i.variant]&&GEAR44_ASSETS[i.variant+'_icon'])return String(h).replace('class="gear25-art','class="gear25-art a82-'+i.variant).replace(/ g81 g81-[a-z0-9]+/,'');}catch{}return h;};f.__a82=1;Progress.art=f;}catch{}}
 // đạn: vẽ ảnh beam theo hướng bay + vệt đuôi phía sau
 const sup=()=>{try{return superTime>0;}catch{return false;}};
 // V181 · SSS đang lắp có món mẹ v → đạn dùng tranh SSS (<sss>_pn/_ps 4 khung + g_trail + g_muzzle). Tắt: window.SSSART=false
 let SC={},SCt=0;function sssOf(v){const n=performance.now();if(n-SCt>300){SC={};SCt=n;}if(v in SC)return SC[v];return SC[v]=sssOf0(v);}
 function sssOf0(v){try{if(window.SSSART===false||typeof Gear44==='undefined')return null;for(const k of ['sidearm','missiles']){const sid=Gear44.activeId(k);if(!sid||sid===v)continue;const d=Gear44.defs().find(x=>x.id===sid);if(d&&d.parents&&d.parents.includes(v)&&GEAR44_ASSETS[sid+'_pn'])return sid;}}catch{}return null;}
 function drawSSS(s,sid){const sp=sup()||s.superShot,b=img(sid+(sp?'_ps':'_pn'))||img(sid+'_pn');if(!b)return false;const cw=b.naturalWidth/4,ch=b.naturalHeight,fi=Math.floor((s.age||0)*12)%4;
  const a=Math.atan2(s.vy||-1,s.vx||0)+Math.PI/2,mis=s.gearItem.kind==='missiles',h=mis?(sp?50:42):(sp?44:36),w=h*cw/ch,tr=img(sid+'_g_trail');
  ctx.save();ctx.translate(s.x,s.y);ctx.rotate(a);ctx.globalCompositeOperation='lighter';
  if(tr){ctx.globalAlpha=.7;ctx.drawImage(tr,-w*.3,h*.2,w*.6,h*.9);}
  ctx.globalAlpha=1;ctx.drawImage(b,fi*cw,0,cw,ch,-w/2,-h/2,w,h);
  if((s.age||0)<.07){const mz=img(sid+'_g_muzzle');if(mz){ctx.globalAlpha=.9;ctx.drawImage(mz,-14,-14,28,28);}}
  ctx.restore();return true;}
 function drawShot(s){if(!on()||!s||!s.gearItem)return false;const v=s.gearItem.variant;if(!ART82_MAP[v])return false;{const sid=sssOf(v);if(sid&&drawSSS(s,sid))return true;}const b=img(v+(sup()||s.superShot?'_beam81s':'_beam81n'))||img(v+'_beam81n');if(!b)return false;
  const tr=img(v+'_trail81'),a=Math.atan2(s.vy||-1,s.vx||0)+Math.PI/2,mis=s.gearItem.kind==='missiles',H0=mis?38:34,nw=b.naturalWidth||1,nh=b.naturalHeight||1,sc=Math.min(30/nw,H0/nh),w=Math.max(6,nw*sc),h=Math.max(10,nh*sc);
  ctx.save();ctx.translate(s.x,s.y);ctx.rotate(a);ctx.globalCompositeOperation='lighter';
  if(tr){ctx.globalAlpha=.75;const tw=Math.min(w,h*.5*(tr.naturalWidth||1)/(tr.naturalHeight||1)+4);ctx.drawImage(tr,-tw/2,h*.25,tw,h*.9);}
  ctx.globalAlpha=1;ctx.drawImage(b,-w/2,-h/2,w,h);
  if((s.age||0)<.07){const mz=img(v+'_muzzle81');if(mz){ctx.globalAlpha=.9;ctx.drawImage(mz,-14,-14,28,28);}}
  ctx.restore();return true;}
 function install(){css();hookArt();
  try{if(!Equipment25.drawShot.__a82){const o=Equipment25.drawShot;const f=function(s){try{if(drawShot(s))return true;}catch{}return o.apply(this,arguments);};f.__a82=1;Equipment25.drawShot=f;}}catch{}}
 install();setTimeout(install,300);setTimeout(install,1600);
 return {state:()=>({on:on(),icons:Object.keys(ART82_MAP).filter(v=>GEAR44_ASSETS[v+'_icon']).length})};
})();
window.Art82=Art82;
