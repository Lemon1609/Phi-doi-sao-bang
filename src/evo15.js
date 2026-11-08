'use strict';
// V75 · icon tiến hóa GPT 15d trong Kho (Hub40 dùng Progress.art): +3 → evo1, +5 → evo2 (khung Lam/Tím do CSS)
setTimeout(()=>{try{const A=typeof EVO53_ART!=='undefined'?EVO53_ART:{};const R=[];for(const k in A){const m=k.match(/^g:(.+)_icon_evo([12])$/);if(m)R.push(`.gear25-art.evo15-${m[1]}-${m[2]}{background-image:url(${A[k]})!important;background-size:82% auto!important;background-position:center!important;background-repeat:no-repeat!important}`);}
 const st=document.createElement('style');st.id='evo15-css';st.textContent=R.join('');document.head.appendChild(st);
 const oa=Progress.art;Progress.art=function(i){let h=oa.apply(this,arguments);try{if(i&&i.kind!=='craft'&&i.variant){const e=typeof V70EF==='function'?V70EF(i):(i.enhance|0);const s=e>=5?2:e>=3?1:0;for(let q=s;q>=1;q--){if(A['g:'+i.variant+'_icon_evo'+q]){h=h.replace('class="gear25-art','class="gear25-art evo15-'+i.variant+'-'+q);break;}}}}catch(e){}return h;};}catch(e){console.warn('evo15',e);}},0);
