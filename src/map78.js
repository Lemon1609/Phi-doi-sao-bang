// V78.3 · bản đồ: huy hiệu nguyên liệu cố định trên nút ải mini boss / boss (Gemini BALANCE78_2 · D)
const Map78=(()=>{
 function tierOf(stage){try{const b=TIER70.band.find(x=>stage<=x[0])||TIER70.band[TIER70.band.length-1];const p=b[1];let t=0;for(let i=1;i<p.length;i++)if(p[i]>p[t])t=i;return t+1;}catch{return 1;}}
 function paint(){if(window.MAP78===false)return;for(const n of document.querySelectorAll('.cm-node[data-stage]')){const st=+n.dataset.stage;if(!st||st%5||n.querySelector('.mt78'))continue;
  let ty=null;try{ty=V70.matOf(st);}catch{}if(!ty)continue;const t=tierOf(st),id=ty.id+t;let src='';try{src=V70.icon(id);}catch{}if(!src)continue;
  const i=document.createElement('i');i.className='mt78';i.style.setProperty('--mt',MAT69.tiers[t-1].c);const im=document.createElement('img');im.src=src;im.alt='';i.appendChild(im);n.appendChild(i);
  try{n.setAttribute('aria-label',(n.getAttribute('aria-label')||'')+' · rơi '+V70.matName(id));n.title='Rơi: '+V70.matName(id);}catch{}}}
 setInterval(()=>{try{paint();}catch{}},700);
 return {paint,tierOf};
})();
