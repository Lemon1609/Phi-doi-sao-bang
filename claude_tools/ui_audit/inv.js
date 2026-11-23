()=>{
 // Kiểm kê lớp đang hiện trên cùng: icon SVG (img data:svg, <svg> nội tuyến, nền CSS svg), ký tự/emoji làm icon, ảnh raster; nút/khung style cũ (tím, skin h307s)
 const W=innerWidth,H=innerHeight;
 const vis=e=>{const r=e.getBoundingClientRect();if(r.width<2||r.height<2||r.bottom<=0||r.top>=H||r.right<=0||r.left>=W)return null;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||+cs.opacity<.05)return null;
  const x=Math.min(W-1,Math.max(0,r.left+r.width/2)),y=Math.min(H-1,Math.max(0,r.top+r.height/2));const h=document.elementFromPoint(x,y);if(!h)return null;if(!(e===h||e.contains(h)||h.contains(e))){const p=e.closest('button,a,[role=button],li,label')||e.parentElement;if(!(p&&(p===h||p.contains(h)||h.contains(p))))return null;}return r;};
 const lab=e=>{const a=e.getAttribute&&(e.getAttribute('alt')||e.getAttribute('title')||e.getAttribute('aria-label'));if(a)return a;let p=e.closest('button,a,[role=button],li,label,h3,h4,h5,.row,div');for(let k=0;k<3&&p;k++){const t=(p.textContent||'').replace(/\s+/g,' ').trim();if(t&&t.length>1)return t.slice(0,34);p=p.parentElement;}return '';};
 const cls=e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(typeof e.className==='string'&&e.className?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):'');
 const out=[],seen=new Map();const push=(o)=>{const k=[o.type,o.key,o.w,o.h,o.label].join('|');if(seen.has(k)){seen.get(k).n++;return;}o.n=1;seen.set(k,o);out.push(o);};
 const hash=s=>{let h=0;for(let i=0;i<s.length;i+=7)h=(h*31+s.charCodeAt(i))|0;return (h>>>0).toString(36);};
 let raster=0,canv=0;const rev=new Map();try{for(const k of (window.__uiKeys||[])){const u=UI_ICONS.svg(k);if(u)rev.set(u,k);}}catch{}
 for(const e of document.querySelectorAll('img')){const r=vis(e);if(!r)continue;const s=e.getAttribute('src')||'';
  if(s.startsWith('data:image/svg'))push({type:'SVG (img)',key:rev.has(s)?'UI_ICONS.'+rev.get(s):hash(s),w:Math.round(r.width),h:Math.round(r.height),label:lab(e),el:cls(e)});else raster++;}
 for(const e of document.querySelectorAll('svg')){if(e.parentElement&&e.parentElement.closest('svg'))continue;const r=vis(e);if(!r)continue;push({type:'SVG nội tuyến',key:hash(e.innerHTML),w:Math.round(r.width),h:Math.round(r.height),label:lab(e),el:cls(e.parentElement||e)});}
 for(const e of document.body.querySelectorAll('*')){if(e.tagName==='IMG'||e.tagName==='svg')continue;const bi=getComputedStyle(e).backgroundImage;if(!bi||bi==='none')continue;
  if(bi.includes('svg+xml')){const r=vis(e);if(r)push({type:'SVG (nền CSS)',key:hash(bi),w:Math.round(r.width),h:Math.round(r.height),label:lab(e),el:cls(e)});}
  else if(/url\(/.test(bi)){if(vis(e))raster++;}}
 for(const e of document.querySelectorAll('canvas')){if(vis(e))canv++;}
 // ký tự / emoji dùng làm icon
 const SYM=/(\p{Extended_Pictographic}|[←-⇿⌀-⏿①-⓿■-➿⤀-⯿Ⅰ-ⅿϟ•×›‹»«★☆♥✦❖])/u;
 const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while((n=tw.nextNode())){const t=n.nodeValue;if(!t||!SYM.test(t))continue;const pe=n.parentElement;if(!pe||pe.closest('script,style'))continue;const r=vis(pe);if(!r)continue;
  const toks=[...t.matchAll(new RegExp(SYM.source+'️?','gu'))].map(m=>m[0]);const fs=parseFloat(getComputedStyle(pe).fontSize)||0;
  for(const c of [...new Set(toks)]){if('×›‹»«•'.includes(c)&&t.trim().length>2)continue;const emo=/\p{Extended_Pictographic}/u.test(c)&&!/[←-➿⬀-⯿]/.test(c)||/[\u{1F000}-\u{1FFFF}]/u.test(c);
   push({type:emo?'Emoji':'Ký tự',key:c,w:Math.round(fs),h:Math.round(fs),label:(t.trim().length<=3?lab(pe):t.replace(/\s+/g,' ').trim().slice(0,34)),el:cls(pe)});}}
 // nút / khung style cũ
 const old=[];const rgbs=s=>[...String(s).matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g)].map(m=>[+m[1],+m[2],+m[3],m[4]==null?1:+m[4]]);
 const hsl=([r,g,b])=>{r/=255;g/=255;b/=255;const M=Math.max(r,g,b),m=Math.min(r,g,b),l=(M+m)/2,d=M-m;let h=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));h=M===r?((g-b)/d)%6:M===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360;}return [h,s,l];};
 const seenB=new Set();
 for(const e of document.querySelectorAll('button,[role=button],.adv-x,.m63-go,a.btn,[data-a],[data-k],[data-nc],[data-h9b]')){const r=vis(e);if(!r||r.width<30)continue;const cs=getComputedStyle(e);const why=[];
  if(typeof e.className==='string'&&/\bh307s\b/.test(e.className))why.push('skin tím hop307 (nút phụ)');
  const cols=rgbs(cs.backgroundColor+' '+cs.backgroundImage).filter(c=>c[3]>.35);const pur=cols.filter(c=>{const [h,s,l]=hsl(c);return h>=255&&h<=320&&s>.35&&l>.15&&l<.8;});if(pur.length&&pur.length>=cols.length/2)why.push('nền tím');
  const rad=parseFloat(cs.borderTopLeftRadius)||0;if(rad>=16&&!cs.clipPath.includes('polygon')&&!/url\(/.test(cs.backgroundImage))why.push('bo tròn lớn '+Math.round(rad)+'px (không vát góc)');
  const tx=(e.textContent||'').replace(/\s+/g,' ').trim();if(/[\u{1F000}-\u{1FFFF}]/u.test(tx))why.push('nhãn có emoji');
  if(!why.length)continue;const k=tx.slice(0,30)+'|'+why.join();if(seenB.has(k))continue;seenB.add(k);old.push({text:tx.slice(0,34),w:Math.round(r.width),h:Math.round(r.height),why,el:cls(e)});}
 return {icons:out,old,raster,canvas:canv};}
