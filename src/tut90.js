// V90 · HƯỚNG DẪN TRONG TRẬN ẢI 1 (Gemini REVIEW89 D-A2 · ONBOARD_STAGE1_SCRIPT_V90) — chỉ chạy LẦN ĐẦU vào ải 1 khi chưa qua ải 1.
//  0,5 s: bàn tay chỉ vuốt + vòng sáng điểm trúng đạn giữa thân tàu · 5 s: thả 4 vật phẩm mẫu kèm nhãn · 11 s: bật Giáp/Tên lửa/Vũ khí phụ
//  (trước đó trang bị nghỉ để người mới không bị ngợp) · 18 s: thả 1 ★ nâng đạn và nhắc Bạo Tẩu. Thoại dùng khung thoại cốt truyện (tạm dừng trận khi nói).
//  Khóa lưu mới: saobang-tut90. Tắt: window.TUT90=false
const TUT90={key:'saobang-tut90',
 ev:[{t:.5,who:'Lâm Phương',line:'Chào Chỉ huy! Chạm và trượt ngón tay để điều khiển chiến cơ!',act:'hand'},
     {t:5,who:'Hạ Vy',line:'Nhặt vật phẩm rơi ra! Buff nhặt trong trận giữ đến hết ải!',act:'items'},
     {t:11,who:'Kiều An',line:'Đã kết nối Giáp, Tên Lửa và Vũ Khí Phụ! Hỏa lực tăng tốc!',act:'gear'},
     {t:18,who:'Lâm Phương',line:'Nhặt ★ để nâng đạn, đầy cấp sẽ kích hoạt Bạo Tẩu!',act:'star'}]};
const Tut90=(()=>{
 const on=()=>window.TUT90!==false;let S={};try{S=JSON.parse(localStorage.getItem(TUT90.key)||'{}')||{};}catch{}
 const save=()=>{try{localStorage.setItem(TUT90.key,JSON.stringify(S));}catch{}};
 let run=null,hand=null,labels=[];
 function eligible(){try{if(!on()||S.done||gameMode!=='campaign'||level!==1)return false;if((Progress.getState().cleared||[]).includes(1))return false;if(typeof Dungeons!=='undefined'&&Dungeons.active())return false;return true;}catch{return false;}}
 function start(){if(!eligible())return;run={t:0,i:0,gearOn:false};S.seen=1;save();}
 function showHand(){if(hand)return;hand=document.createElement('div');hand.id='tut90h';hand.style.cssText='position:fixed;left:50%;bottom:22%;z-index:99970;font-size:46px;pointer-events:none;filter:drop-shadow(0 0 8px #3fd2ff)';hand.textContent='👆';document.body.appendChild(hand);
  try{hand.animate([{transform:'translateX(-90px)'},{transform:'translateX(30px)'},{transform:'translateX(-90px)'}],{duration:1600,iterations:3});}catch{}setTimeout(()=>{try{hand.remove();}catch{}hand=null;},4800);}
 function drop(type,x,label){try{Safety31.push(drops,100,{x,y:(typeof H==='number'?H:1000)*.32,type,t:0,vx:0,vy:60,ph:0,v40:true,tut90:label});}catch{}labels.push({x,y0:(typeof H==='number'?H:1000)*.32,t:0,label});}
 function act(a){const Wd=typeof W==='number'?W:480;
  if(a==='hand')showHand();
  if(a==='items'){drop('power',Wd*.2,'▲ Nâng đạn');drop('heal',Wd*.4,'+ Hồi máu');drop('shield',Wd*.6,'◆ Khiên');drop('star',Wd*.8,'★ Điểm');}
  if(a==='gear'){run.gearOn=true;}
  if(a==='star'){drop('power',Wd*.5,'★ Bạo Tẩu');}}
 function tick(dt){if(!run)return;let m='';try{m=mode;}catch{}if(m!=='play'||window.__st80)return;run.t+=dt;for(const l of labels)l.t+=dt;labels=labels.filter(l=>l.t<5);
  const e=TUT90.ev[run.i];if(e&&run.t>=e.t){run.i++;act(e.act);try{Story80.show([{who:e.who,line:e.line}]);}catch{}}
  if(run.i>=TUT90.ev.length&&run.t>24){run=null;S.done=1;save();}}
 function draw(){if(!run&&!labels.length)return;try{const g=ctx;g.save();
   if(run&&run.t<6){const a=.5+.5*Math.sin(run.t*8);g.strokeStyle='#ffffff';g.globalAlpha=.6+.4*a;g.lineWidth=2;g.beginPath();g.arc(player.x,player.y,8+a*4,0,6.283);g.stroke();g.font="700 11px system-ui,sans-serif";g.textAlign='center';const T90='Chỉ điểm sáng này trúng đạn mới mất máu';if(window.HINT221!==false){/* V2.2.1: chữ xuống dưới hàng tàu con + nền viên thuốc tối, kẹp trong màn */const tw=g.measureText(T90).width+18,ch=(typeof H==='number'?H:g.canvas.height),ty=Math.min(player.y+70,ch-16),tx=Math.max(tw/2+4,Math.min((typeof W==='number'?W:g.canvas.width)-tw/2-4,player.x));g.save();g.globalAlpha=.78;g.fillStyle='rgba(4,10,22,.82)';g.beginPath();if(g.roundRect)g.roundRect(tx-tw/2,ty-13,tw,19,9.5);else g.rect(tx-tw/2,ty-13,tw,19);g.fill();g.restore();g.fillStyle='#bff2ff';g.fillText(T90,tx,ty);}else{g.fillStyle='#bff2ff';g.fillText(T90,player.x,player.y+46);}}
   g.globalAlpha=1;g.font="800 11px system-ui,sans-serif";g.textAlign='center';for(const l of labels){const d=(drops||[]).find(q=>q.tut90===l.label&&!q.dead);const x=d?d.x:l.x,y=(d?d.y:l.y0)-22;g.fillStyle='#ffd36a';g.fillText(l.label,x,y);}
   g.restore();}catch{}}
 // trang bị nghỉ tới giây 11 trong lần hướng dẫn
 let H=false;function hook(){if(H||typeof Equipment25==='undefined')return;H=true;const u=Equipment25.update,d=Equipment25.draw;
  Equipment25.update=function(dt){try{tick(dt);}catch{}if(run&&!run.gearOn)return;return u.apply(this,arguments);};
  Equipment25.draw=function(){const r=d.apply(this,arguments);try{draw();}catch{}return r;};
  try{const r0=reset;const f=function(){const r=r0.apply(this,arguments);try{run=null;labels=[];setTimeout(start,50);}catch{}return r;};window.reset=f;try{reset=f;}catch{}}catch{}}
 hook();setTimeout(hook,500);
 return {state:()=>({...S,run:run&&{t:run.t,i:run.i,gearOn:run.gearOn}}),_reset:()=>{S={};save();}};
})();
window.Tut90=Tut90;
