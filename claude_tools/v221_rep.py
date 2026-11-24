# V2.2.1 · cặp thay chuỗi trong bản dựng (rep khẳng định đúng 1 lần). Dùng: exec trong build74_mau.py sau PAIRS22.
# Trần hạt máy cảm ứng 90 (pointer:coarse); máy tính giữ 400/120. Tắt: window.PCAP22=false
PCAP="(window.__pcap22||(quality==='light'?120:400))"
PAIRS221=[
 ("const cap=quality==='light'?120:400;","const cap="+PCAP+";"),
 ("const cap=quality==='light'?120:400,decay","const cap="+PCAP+",decay"),
 ("function trimA(){if(quality==='light')for(let i=120;i<400;i++)ppA[i].life=0;}",
  "function trimA(){const c="+PCAP+";if(c<400)for(let i=c;i<400;i++)ppA[i].life=0;}"),
 # Sảnh cũ (lobby-v397): #lobby bị CSS ẩn nhưng vòng vẽ vẫn gọi getBoundingClientRect mỗi khung → ép tính lại style (trace: 144 lần/3 s ở Sảnh).
 # Theo dõi bằng IntersectionObserver (không ép bố cục); khung không hiện thì bỏ qua. Tắt: window.LOB221=false
 ("canvas=root.querySelector('#lb-canvas');g=canvas.getContext('2d');",
  "canvas=root.querySelector('#lb-canvas');g=canvas.getContext('2d');try{root.__io22=true;new IntersectionObserver(es=>{for(const e of es)root.__io22=e.isIntersecting&&e.boundingClientRect.width>0;}).observe(canvas);}catch(e){}"),
 ("if(!root||root.hidden||document.hidden)return;clock+=dt;",
  "if(!root||root.hidden||document.hidden||(window.LOB221!==false&&root.__io22===false))return;clock+=dt;"),
]
PRE221="<script id=\"pcap22-js\">try{if(window.PCAP22!==false&&matchMedia('(pointer:coarse)').matches)window.__pcap22=90;}catch(e){}</script>"
