// V79 · LƯU FILE TRÊN BẢN ONLINE: link tải (sao lưu tiến trình JSON, ảnh khoe chiến cơ PNG) đi qua quyền "downloads" của trang online.
// Bản offline (mở file .html) vẫn tải như cũ.
const DL78=(()=>{
 let ns;const get=()=>{if(ns!==undefined)return Promise.resolve(ns);try{if(!window.claude||!window.claude.use)return Promise.resolve(ns=null);}catch{return Promise.resolve(ns=null);}
  return window.claude.use('downloads').then(v=>(ns=v||null)).catch(()=>(ns=null));};
 setTimeout(()=>{get();},1500);
 const online=()=>{try{return !!(window.claude&&window.claude.use);}catch{return false;}};
 const oc=HTMLAnchorElement.prototype.click;
 HTMLAnchorElement.prototype.click=function(){const a=this;if(!a.download||!online())return oc.apply(this,arguments);
  const name=a.download,href=a.href;
  (async()=>{const d=await get();if(!d){try{toast('Trang này không cho tải file · hãy dùng LƯU ĐÁM MÂY trong Cài đặt');}catch{}return;}
   let blob;try{blob=await (await fetch(href)).blob();}catch{try{toast('Không đọc được dữ liệu để lưu');}catch{}return;}
   try{await d.save({filename:name,data:blob});try{toast('💾 ĐÃ LƯU FILE '+name);}catch{}}
   catch(e){const c=e&&e.code;if(c==='declined')return;if(c==='rate_limited'){try{toast('Đang có hộp lưu file mở · thử lại sau');}catch{}return;}try{toast('Không lưu được file trên trang này');}catch{}}})();};
 return {get};
})();
