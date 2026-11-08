// V78.5 · tranh GPT 17.1: Thiết Giáp Hạm Phá Không (boss cuối chương 2, ải 40) 3 pha + chân dung bản đồ · Tàu Vận Tải Tinh Ngân (quái thưởng)
//  Tâm thân 3 pha trùng tâm ảnh (registration.json) → đổi pha tại chỗ không nhảy. Phần thân rộng ~240 px logic (bbox 608/768 khung).
const Boss78=(()=>{
 const A=typeof BOSS78_ART!=='undefined'?BOSS78_ART:{};const IM={};
 for(const k in A){const im=new Image();im.src=A[k];IM[k]=im;}
 const ok=k=>IM[k]&&IM[k].complete&&IM[k].naturalWidth>0;
 const isCH2=b=>{try{return b&&b===boss&&!b.bossPart&&B75.state()&&B75.state().kd==='CH2';}catch{return false;}};
 let shown=0,lastPh=0;
 function drawCH2(b){let ph=0;try{ph=B75.state().ph|0;}catch{}const k='p'+(ph+1);if(!ok(k))return false;
  if(ph!==lastPh){lastPh=ph;shown=0;}shown=Math.min(1,shown+.08);
  const S=240*768/608,x=b.x,y=b.y;ctx.save();
  if(shown<1&&ok('p'+ph)){ctx.globalAlpha=1-shown;ctx.drawImage(IM['p'+ph],x-S/2,y-S/2,S,S);}
  ctx.globalAlpha=shown<1?shown:1;ctx.drawImage(IM[k],x-S/2,y-S/2,S,S);ctx.restore();return true;}
 function install(){if(window.BOSS78===false)return;
  for(const name of ['Major36','BossBake3D']){try{const M=window[name]||eval(name);const o=M.draw;M.draw=function(b){try{if(isCH2(b)&&drawCH2(b))return true;}catch{}return o.apply(this,arguments);};}catch{}}
  try{const de=EnemyFleet.drawEnemy;EnemyFleet.drawEnemy=function(e){try{if(e&&e.carrier76&&ok('carrier')){const s=78,flip=(e.vx||0)<0||(e.x>W/2&&!(e.vx>0)&&e.age<.2);ctx.save();ctx.translate(e.x,e.y);if(e.cflip78===undefined)e.cflip78=e.x>W/2;if(e.cflip78)ctx.scale(-1,1);ctx.drawImage(IM.carrier,-s,-s,s*2,s*2);ctx.restore();return true;}}catch{}return de.apply(this,arguments);};}catch{}
 }
 // chân dung boss ải 40 trên bản đồ
 function map(){if(!A.portrait)return;const n=document.querySelector('.cm-node[data-stage="40"]');if(!n||n.querySelector('.bp78'))return;const im=document.createElement('img');im.className='bp78';im.src=A.portrait;im.alt='';n.appendChild(im);}
 setTimeout(install,30);setInterval(()=>{try{map();}catch{}},800);
 return {ok,state:()=>({loaded:Object.keys(IM).filter(ok)})};
})();
