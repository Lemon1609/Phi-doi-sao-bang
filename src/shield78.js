// V78.2 · BỎ THANH GIÁP TRONG TRẬN
//  • Trúng đòn = mất máu; hết máu (và hết nội tại cứu sinh nếu có) là thua.
//  • Mọi nguồn "giáp" (vật phẩm giáp rơi ra, nội tại giáp/robot/lõi hồi giáp, giáp khởi đầu) → KHIÊN CHẶN 1 ĐÒN:
//    chặn đúng 1 đòn (đạn hoặc va chạm) rồi vỡ, hoặc tự tắt sau 8 giây.
//  • Chỉ số giáp tối đa của trang bị không mất đi: đổi 50% thành máu tối đa đầu trận.
//  • Tắt: window.SHIELD78=false
const Shield78=(()=>{
 // V78.3 (Gemini BALANCE78_2): thời lượng theo nguồn · nhặt 10s · đầu trận 25s · nội tại 6s (cách 6s sau khi khiên cũ tắt) · vỡ khiên xóa đạn 90px
 const DUR={pick:10,start:25,passive:6},GAP=6,CONV=.65,LOCK=12;let bub=false,extraDone=false,extra=0,startDone=false,endAt=-1e9,src='';
 const tnow=()=>performance.now()/1000;
 const on=()=>window.SHIELD78!==false;
 const playing=()=>typeof mode!=='undefined'&&mode==='play';
 function grant(kind){kind=kind||'passive';if(kind==='passive'&&!bub&&tnow()-endAt<Math.max(2,GAP-(+window.__core307gap||0)))return false;/* V307 lõi Kiều An */bulletShieldTime=Math.max(bulletShieldTime||0,DUR[kind]||6);bub=true;src=kind;if(kind==='pick')window.__shLock78=performance.now()+LOCK*1000;return true;}
 function install(){
  if(!on())return;
  try{const r0=reset;reset=function(){const r=r0.apply(this,arguments);extraDone=false;extra=0;bub=false;startDone=false;endAt=-1e9;return r;};}catch{}
  try{const u0=update;update=function(){
    let watch=null;try{if(playing())watch=drops.filter(d=>!d.dead&&d.type==='shield');}catch{}
    const r=u0.apply(this,arguments);
    try{if(!playing())return r;
     if(!extraDone){extra=Math.ceil((maxShield||0)*CONV);maxHp=Math.round((maxHp+extra)*10)/10;hp=Math.min(maxHp,hp+extra);extraDone=true;try{hud();}catch{}}
     if(watch)for(const d of watch)if(d.dead||d.type!=='shield'){if(Math.hypot(d.x-player.x,d.y-player.y)<90)grant('pick');}
     if(shield>0){grant(startDone?'passive':'start');shield=0;}startDone=true;
     if(bub&&!(bulletShieldTime>0)){bub=false;endAt=tnow();}
    }catch{}
    return r;};}catch{}
  try{const e0=enemyScale;enemyScale=function(){const v=e0.apply(this,arguments);try{if(gameMode==='campaign'&&!(typeof Dungeons!=='undefined'&&Dungeons.active())){const st=+document.getElementById('mission-select').value||level;if(st<=20)return v*.75;if(st<=40)return v*.85;}}catch{}return v;};}catch{}
  try{const d0=damage;damage=function(src){
    try{if(playing()&&invuln<=0){if(shield>0){grant(startDone?'passive':'start');shield=0;}
      if(bub&&bulletShieldTime>0){bub=false;bulletShieldTime=0;endAt=tnow();invuln=Math.max(invuln,window.SH78I||(src==='passive'?.6:.8));
       try{const R=window.SH78R||90;for(const b of bullets)if(!b.dead&&Math.hypot(b.x-player.x,b.y-player.y)<R)b.dead=true;}catch{}
       try{VisualFX.impact(player.x,player.y,'#a4ecff');}catch{}try{ring(player.x,player.y,'#79caff',46);}catch{}try{tone(520,.12,'triangle');}catch{}
       try{hud();}catch{}return;}}}catch{}
    return d0.apply(this,arguments);};}catch{}
 }
 setTimeout(install,40);
 return {state:()=>({bub,src,extra,bst:typeof bulletShieldTime==='number'?bulletShieldTime:0}),grant};
})();
