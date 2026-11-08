// V78.4 · bỏ nút Kho báu (rương Vô tận tự mở khi hết lượt) · hiện số rương đã nhận hôm nay /30 ngay trên nút Vô tận
const UI78=(()=>{
 function count(){try{const s=Chests.getState();if(s.day!==Chests.dayKey())return 0;return s.equipmentCount|0;}catch{return null;}}
 function paint(){
  for(const b of document.querySelectorAll('[data-lb68="endless"],#quick-endless36')){let t=b.querySelector('.ch78');const n=count();if(n==null)continue;
   if(!t){t=document.createElement('span');t.className='ch78';b.appendChild(t);}const txt='📦 '+n+'/30 rương hôm nay';if(t.textContent!==txt)t.textContent=txt;}}
 setInterval(()=>{try{paint();}catch{}},1000);
 // V78.8 · bấm cấp độ phó bản (Vàng / Vật liệu / Ngọc / Trang bị) → vào trận ngay, không nhảy sang trang cũ
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-dungeon][data-difficulty]');if(!b||b.disabled)return;const hub=document.getElementById('hub40');if(!hub||hub.hidden)return;
  setTimeout(()=>{try{if(document.getElementById('gamemode').value!==b.dataset.dungeon)return;try{Nav74.closeAll();}catch{}hub.hidden=true;window.scrollTo(0,0);document.getElementById('start').click();
   setTimeout(()=>{try{if(mode!=='play'){hub.hidden=false;}}catch{}},400);}catch{}},30);},false);
 return {paint,count};
})();
