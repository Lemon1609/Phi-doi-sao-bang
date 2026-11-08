// V85 · DỌN CHỮ "PHÔI" CÒN SÓT TRÊN GIAO DIỆN (V82 đã bỏ phôi: mọi "phôi" được Evo82 đổi thành BẢN SAO Lv1 cùng màu)
//  Hơn 20 chỗ (Chợ Đen, Vượt Hạn, Mùa giải, Năng động, quà nguyên bộ, lộ trình…) vẫn ghi "phôi Lam/Tím…" dù thứ nhận được là bản sao.
//  Chỉ chạy khi KHÔNG ở trong trận, chỉ thay cụm có màu đi kèm ("phôi Lam" → "bản sao Lam Lv1"), không đụng lời thoại cốt truyện.
//  Tắt: window.FIX85=false
const Fix85=(()=>{
 const on=()=>window.FIX85!==false&&!!(window.Evo82&&Evo82.on&&Evo82.on());
 const RX=[[/([Pp])hôi (Trắng|Lục|Lam|Tím)/g,(m,p,c)=>(p==='P'?'Bản sao ':'bản sao ')+c+' Lv1'],[/PHÔI (TRẮNG|LỤC|LAM|TÍM)/g,(m,c)=>'BẢN SAO '+c],[/Phôi Đột Phá/g,()=>'Bản sao Đột Phá']];
 const SKIP=new Set(['SCRIPT','STYLE','TEXTAREA','INPUT']);
 function fixNode(n){let t=n.nodeValue;if(!t||t.indexOf('hôi')<0&&t.indexOf('HÔI')<0)return 0;let u=t;for(const [r,f] of RX)u=u.replace(r,f);if(u!==t){n.nodeValue=u;return 1;}return 0;}
 function scan(){if(!on())return 0;let m='';try{m=mode;}catch{}if(m==='play'||m==='pause')return 0;let k=0;
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||SKIP.has(p.tagName)||p.closest('#st80,[data-nofix]'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}});
  let n;while((n=w.nextNode()))k+=fixNode(n);return k;}
 setInterval(()=>{try{scan();}catch{}},900);
 return {scan};
})();
window.Fix85=Fix85;
