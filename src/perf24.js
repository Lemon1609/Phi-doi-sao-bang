'use strict';
// V2.4-A · PERF24 — gỡ nghẽn khung hình trong trận (chế độ NHẸ · DPR 1,00 trên máy thật tụt 26–29 FPS, cảnh báo Boss 18–19 FPS).
//  Đo bằng tests/dem_ve24.py + tests/do_phan24.py (28/11): mỗi khung tính lại style 1,5–4 lần (HUD ghi lại cùng giá trị),
//  tô đè ≈ 10,6 lần diện tích màn (4 lớp nền nằm DƯỚI nền địa hình đục PKC26 + 2 lớp tối chồng nhau).
//  1) DOM24: ghi trùng giá trị không còn chạm DOM (hidden / textContent / className / setAttribute luôn luôn; innerHTML chỉ khi đang trận).
//  2) NEN24: khi PKC26 vẽ nền đục phủ kín → bỏ màu nền ải, hào quang gradient, nền chương (v32), ảnh parallax (rep trong build);
//     gộp lớp tối BG76 (#071020 α .28) vào lớp tối tran307 (1 lần tô thay 2): α = 1−(1−A)(1−.28).
//  Tắt toàn bộ: window.PERF24=false (đặt trước khi trang tải). Từng phần: DOM24 / NEN24 = false.
(()=>{
 if(window.PERF24===false)return;
 const play=()=>{try{return mode==='play'||mode==='pause';}catch{return false;}};
 // ---------- 0) Thanh chẩn đoán FPS/DPR/P:B: ẩn mặc định — lên V2.4 tắt 1 lần công tắc «HIỆN FPS KHI CHƠI» (người chơi bật lại được trong Cài đặt)
 try{if(!localStorage.getItem('saobang-fps24-mig')){localStorage.setItem('saobang-fps24-mig','1');const k='saobang-fps88',v=JSON.parse(localStorage.getItem(k)||'null');if(v&&v.on){v.on=false;localStorage.setItem(k,JSON.stringify(v));}}}catch{}
 // ---------- 1) DOM24 ----------
 if(window.DOM24!==false)try{
  const P=(o,k)=>Object.getOwnPropertyDescriptor(o,k);
  const hid=P(HTMLElement.prototype,'hidden');
  if(hid&&hid.set)Object.defineProperty(HTMLElement.prototype,'hidden',{configurable:true,enumerable:hid.enumerable,get:hid.get,
   set(v){if((v===true||v===false||v==null||v===0||v===1)&&!!v===this.hasAttribute('hidden'))return;hid.set.call(this,v);}});
  const tc=P(Node.prototype,'textContent');
  if(tc&&tc.set)Object.defineProperty(Node.prototype,'textContent',{configurable:true,enumerable:tc.enumerable,get:tc.get,
   set(v){const s=v==null?'':String(v);const t=this.nodeType;
    if(t===3||t===8){if(this.data===s)return;}
    else if(t===1||t===11){const f=this.firstChild;if(f){if(f===this.lastChild&&f.nodeType===3&&f.data===s)return;}else if(s==='')return;}
    tc.set.call(this,v);}});
  const cn=P(Element.prototype,'className');
  if(cn&&cn.set)Object.defineProperty(Element.prototype,'className',{configurable:true,enumerable:cn.enumerable,get:cn.get,
   set(v){if(this.getAttribute('class')===String(v))return;cn.set.call(this,v);}});
  const sa=Element.prototype.setAttribute;
  Element.prototype.setAttribute=function(n,v){if(this.getAttribute(n)===String(v))return;return sa.call(this,n,v);};
  const ih=P(Element.prototype,'innerHTML');
  if(ih&&ih.set)Object.defineProperty(Element.prototype,'innerHTML',{configurable:true,enumerable:ih.enumerable,get:ih.get,
   set(v){if(typeof v==='string'&&v.length<6000&&play()&&ih.get.call(this)===v)return;ih.set.call(this,v);}});
  window.DOM24S={on:true};
 }catch(e){window.DOM24S={on:false,err:String(e)};}
 // ---------- 2) NEN24 ----------
 // window.__n24: đặt ĐẦU mỗi lần vẽ (rep trong draw gốc) = nền PKC26 đục sẽ phủ kín khung này.
 window.N24F=()=>{if(window.NEN24===false)return false;try{return typeof PKC26!=='undefined'&&!!PKC26.full&&PKC26.full();}catch{return false;}};
 // sprite quầng / lửa dựng sẵn theo màu (thay gradient tạo mới mỗi khung trong tb309): kind 'q' quầng màu→trong · 'h' trắng→màu→trong · 'w' trắng→trong · 'f' lửa tam giác
 const G24={};const rgb=c=>{c=String(c||'#fff');if(c[0]==='#'){if(c.length===4)c='#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];return [parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];}const m=c.match(/[\d.]+/g)||[255,255,255];return m.slice(0,3).map(Number);};
 window.TB24G=(col,kind)=>{const k=kind+col;let c=G24[k];if(c)return c;c=document.createElement('canvas');const f=kind==='f';c.width=f?12:64;c.height=f?48:64;const g=c.getContext('2d'),[r,gg,b]=rgb(col),A=a=>'rgba('+r+','+gg+','+b+','+a+')';
  if(f){const gr=g.createLinearGradient(0,0,0,48);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(.35,A(.65));gr.addColorStop(1,A(0));g.fillStyle=gr;g.beginPath();g.moveTo(0,0);g.lineTo(12,0);g.lineTo(6,48);g.closePath();g.fill();}
  else{const gr=g.createRadialGradient(32,32,0,32,32,32);if(kind==='q'){gr.addColorStop(0,A(1));gr.addColorStop(1,A(0));}else if(kind==='h'){gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.5,A(.5));gr.addColorStop(1,A(0));}else{gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(1,'rgba(255,255,255,0)');}g.fillStyle=gr;g.fillRect(0,0,64,64);}
  return G24[k]=c;};
 // băng CẢNH BÁO (fx-v402): chữ phát sáng dựng sẵn 1 lần (shadowBlur chỉ dùng khi dựng), mỗi khung chỉ drawImage
 let W24=null;window.WARN24=(g,x,y)=>{if(!W24){const c=document.createElement('canvas');c.width=420;c.height=64;const q=c.getContext('2d');q.textAlign='center';q.textBaseline='middle';q.font='bold 24px Neo,sans-serif';q.fillStyle='#ff2a46';q.shadowColor='#ff2a46';q.shadowBlur=14;q.fillText('⚠ CẢNH BÁO NGUY HIỂM ⚠',210,32);q.shadowBlur=0;q.fillText('⚠ CẢNH BÁO NGUY HIỂM ⚠',210,32);W24=c;}
  const ta=g.textAlign,tb=g.textBaseline;g.drawImage(W24,x-210,y-32);g.textAlign=ta;g.textBaseline=tb;};
 // gộp lớp tối: tran307 tô 1 lần với α gộp và đánh dấu window.__dim24f = số khung (__f24, tăng đầu draw gốc); rv75 bỏ lớp BG76 khi trùng khung.
})();
