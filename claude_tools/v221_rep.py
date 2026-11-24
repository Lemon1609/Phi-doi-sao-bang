# V2.2.1 · cặp thay chuỗi trong bản dựng (rep khẳng định đúng 1 lần). Dùng: exec trong build74_mau.py sau PAIRS22.
# Trần hạt máy cảm ứng 90 (pointer:coarse); máy tính giữ 400/120. Tắt: window.PCAP22=false
PCAP="(window.__pcap22||(quality==='light'?120:400))"
PAIRS221=[
 ("const cap=quality==='light'?120:400;","const cap="+PCAP+";"),
 ("const cap=quality==='light'?120:400,decay","const cap="+PCAP+",decay"),
 ("function trimA(){if(quality==='light')for(let i=120;i<400;i++)ppA[i].life=0;}",
  "function trimA(){const c="+PCAP+";if(c<400)for(let i=c;i<400;i++)ppA[i].life=0;}"),
]
PRE221="<script id=\"pcap22-js\">try{if(window.PCAP22!==false&&matchMedia('(pointer:coarse)').matches)window.__pcap22=90;}catch(e){}</script>"
