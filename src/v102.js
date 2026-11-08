// V102 · bớt chữ trong trận: tắt số sát thương, CHOÁNG, ×n, nhãn vật phẩm, +1 lễ hội, tên quái tinh anh, nhãn tàu vận tải / lõi / khiên, CHUỖI.
// Giữ: băng thông báo boss, chương, cảnh báo "!", biểu tượng trên vật phẩm, tên kỹ năng tối thượng. window.TXT102=false để bật lại.
(()=>{
  const RX=[/^[+\-−]?\s*\d[\d.,]*\s*[kKMB%]?\s*!?$/,/^CHOÁNG\s/,/^[×xX]\s?\d/,/^\+\s?\d+\s/,/^(HỎA LỰC|SIÊU CẤP|BOM|DRONE|GIÁP|MÁU|NAM CHÂM|ĐỔI SÚNG)(!| ?[+×].*)?$/,
    /TÀU VẬN TẢI/,/LÕI ĐANG ĐƯỢC BẢO VỆ/,/KHIÊN ĐÃ TẮT/,/CHUỖI/,/^CHÍ MẠNG/,/^GRAZE/i,/^SƯỢT/,/^HUY CHƯƠNG/];
  let EL=null;const el=()=>{if(EL)return EL;EL=new Set();try{for(const k in C76)if(C76[k]&&typeof C76[k]==='object')for(const j in C76[k]){const v=C76[k][j];if(v&&typeof v.n==='string')EL.add(v.n);}}catch{}return EL;};
  const cache=new Map();let cut=0;
  const block=t=>{if(window.TXT102===false)return false;try{if(mode!=='play'&&mode!=='pause')return false;}catch{return false}
    const s=String(t);let r=cache.get(s);if(r===undefined){r=RX.some(x=>x.test(s))||el().has(s);if(cache.size>4000)cache.clear();cache.set(s,r);}if(r)cut++;return r;};
  const P=CanvasRenderingContext2D.prototype;
  for(const k of ['fillText','strokeText']){const o=P[k];P[k]=function(t){if(block(t))return;return o.apply(this,arguments);};}
  const wrapInst=()=>{try{for(const c of document.querySelectorAll('canvas')){const x=c.getContext?c.getContext('2d'):null;if(!x)continue;
    for(const k of ['fillText','strokeText'])if(Object.prototype.hasOwnProperty.call(x,k)&&!x[k].__w102){const o=x[k];const f=function(t){if(block(t))return;return o.apply(this,arguments);};f.__w102=1;x[k]=f;}}}catch{}};
  wrapInst();setTimeout(wrapInst,1500);setInterval(()=>{try{if(mode==='play')wrapInst();}catch{}},3000);
  window.V102={block,state:()=>({cut,on:window.TXT102!==false})};
})();
