'use strict';
// V307 · NỀN SẢNH TẠM bằng mã (thiết kế riêng): xưởng chế tạo tương lai + dải ngân hà + hố đen vũ trụ.
// Chờ tranh GPT; khi có tranh thật chỉ cần tắt: window.SANH307=false. Không đổi logic game, không chặn bấm (pointer-events:none).
(()=>{try{
 if(window.SANH307===false)return;
 let seed=307;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
 let stars='';for(let i=0;i<130;i++){const x=(rnd()*418).toFixed(1),y=(rnd()*568).toFixed(1),r=(0.4+rnd()*0.9).toFixed(2),o=(0.25+rnd()*0.6).toFixed(2);stars+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#cfe6ff" opacity="${o}"/>`;}
 let sparks='';[[34,150],[40,152],[382,330],[376,326],[30,372],[388,170]].forEach(([x,y],i)=>{sparks+=`<circle class="sk-sp s${i%3}" cx="${x}" cy="${y}" r="1.7" fill="#ffb347"/>`;});
 const truss=(x0,w,flip)=>{ // giàn thép đứng + thanh chéo + đèn viền xanh
  let s=`<rect x="${x0}" y="0" width="${w}" height="568" fill="#070f23"/><rect x="${flip?x0:x0+w-2}" y="0" width="2" height="568" fill="#2fd0ff" opacity=".55"/>`;
  for(let y=-10;y<568;y+=58){const a=flip?x0:x0,b=x0+w;s+=`<path d="M${a} ${y} L${b} ${y+58} M${b} ${y} L${a} ${y+58}" stroke="#16335d" stroke-width="1.6" fill="none"/><rect x="${a}" y="${y}" width="${w}" height="2.2" fill="#10264a"/>`;}
  return s;};
 const arm=(x,y,len,dir)=>`<path d="M${x} ${y} h${dir*len} l${dir*-8} 14 h${dir*-(len-12)}z" fill="#0a1830" stroke="#2c6fa8" stroke-width="1"/><circle cx="${x+dir*len}" cy="${y+3}" r="2.6" fill="#ff9a3c" opacity=".9"/>`;
 let svg=`<svg viewBox="0 0 418 568" stroke="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
 <defs>
  <radialGradient id="sk-bg" cx="62%" cy="26%" r="95%"><stop offset="0" stop-color="#12285a"/><stop offset=".55" stop-color="#081431"/><stop offset="1" stop-color="#030816"/></radialGradient>
  <linearGradient id="sk-gal" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#7a3cff" stop-opacity="0"/><stop offset=".45" stop-color="#8fb4ff" stop-opacity=".42"/><stop offset=".7" stop-color="#ffd9a8" stop-opacity=".32"/><stop offset="1" stop-color="#ff7a2e" stop-opacity="0"/></linearGradient>
  <linearGradient id="sk-disc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff5a1a" stop-opacity="0"/><stop offset=".22" stop-color="#ff8a2a"/><stop offset=".5" stop-color="#fff2c8"/><stop offset=".78" stop-color="#ff9a3a"/><stop offset="1" stop-color="#ff5a1a" stop-opacity="0"/></linearGradient>
  <linearGradient id="sk-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6fd8ff"/><stop offset=".5" stop-color="#ffe2a0"/><stop offset="1" stop-color="#4a8cff"/></linearGradient>
  <radialGradient id="sk-halo"><stop offset=".35" stop-color="#ffb060" stop-opacity=".55"/><stop offset="1" stop-color="#ff6a20" stop-opacity="0"/></radialGradient>
  <radialGradient id="sk-floor" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#2fd0ff" stop-opacity=".35"/><stop offset="1" stop-color="#2fd0ff" stop-opacity="0"/></radialGradient>
  <linearGradient id="sk-beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b43cff" stop-opacity="0"/><stop offset=".5" stop-color="#c24dff" stop-opacity=".55"/><stop offset="1" stop-color="#b43cff" stop-opacity="0"/></linearGradient><linearGradient id="sk-beam2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff7aff" stop-opacity="0"/><stop offset=".5" stop-color="#ffd6ff" stop-opacity=".85"/><stop offset="1" stop-color="#ff7aff" stop-opacity="0"/></linearGradient><filter id="sk-b2" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
  <filter id="sk-b8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
 </defs>
 <rect width="418" height="568" fill="url(#sk-bg)"/>
 <g transform="rotate(-28 209 300)"><ellipse cx="209" cy="300" rx="330" ry="46" fill="url(#sk-gal)" filter="url(#sk-b8)"/></g>
 ${stars}
 <g transform="translate(262 140)">
  <circle r="74" fill="url(#sk-halo)" opacity=".5" style="stroke:none"/>
  <g transform="rotate(-16)">
   <ellipse rx="82" ry="18" fill="url(#sk-disc)" filter="url(#sk-b2)" opacity=".9"/>
   <circle r="27" fill="#000"/>
   <circle r="29.5" fill="none" stroke="url(#sk-ring)" stroke-width="1.6" opacity=".9"/>
   <path d="M-82 0 A82 18 0 0 0 82 0 Z" fill="url(#sk-disc)" filter="url(#sk-b2)"/>
   <path d="M-33 -9 A34 34 0 0 1 33 -9" fill="none" stroke="#ffe7b0" stroke-width="2" opacity=".75"/>
  </g>
 </g>
 ${truss(0,40,false)}${truss(378,40,true)}
 ${arm(40,70,34,1)}${arm(40,330,26,1)}${arm(378,200,30,-1)}${arm(378,410,36,-1)}
 <g stroke="#36d6ff" stroke-width="1.4" fill="none" opacity=".65"><path d="M16 0 V568"/><path d="M402 0 V568"/></g>
 ${sparks}
 <ellipse cx="209" cy="455" rx="150" ry="34" fill="url(#sk-floor)" style="stroke:none"/>
 <rect x="169" y="0" width="80" height="470" fill="url(#sk-beam)" opacity=".85"/><rect x="194" y="0" width="30" height="470" fill="url(#sk-beam2)" opacity=".9"/>
</svg>`;
 svg=svg.replace(/stroke="(#[0-9a-fA-F]{3,6}|url\([^)]+\))"/g,'class="st" style="--c:$1"').replace('<defs>','<defs><style>svg *{stroke:none!important}svg .st{stroke:var(--c)!important;stroke-width:1.6px!important;fill-opacity:1}</style>');
 function mount(){
  const st=document.querySelector('.h1-stage');if(!st||st.querySelector('.sk307'))return;
  const d=document.createElement('div');d.className='sk307';d.setAttribute('aria-hidden','true');d.innerHTML=svg;
  const sv=d.firstElementChild;if(sv){sv.style.setProperty('width','100%','important');sv.style.setProperty('height','100%','important');sv.style.setProperty('max-width','none','important');}
  st.insertBefore(d,st.firstChild);
 }
 mount();setInterval(mount,1500);
}catch(e){console.warn('SANH307',e);}})();
