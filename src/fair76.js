'use strict';
// FAIR76 · ROADMAP76 (Gemini 23/10) — công bằng khi trúng đòn + nhịp thở trong ải.
//  • Đệm bom 180 ms: đạn chạm tàu → chờ 180 ms (vòng trắng co vào tâm); bấm BOM trong lúc đó = miễn đòn ("CỨU NGUY!").
//  • Sau khi mất máu/giáp: bất tử ≥ 1,5 s, xóa đạn địch trong 160 px, đẩy lùi đạn ở vành 160–240 px trong 0,3 s.
//  • Phản hồi: viền đỏ 4 cạnh 280 ms; máu+giáp < 25%: vòng đỏ nét đứt quanh tàu + "!" + viền đập theo nhịp tim 0,9 s + còi 880 Hz mỗi 2,5 s.
//  • Khoảng lặng: màn không còn quái → hút toàn bộ sao/hợp kim về tàu (nghỉ 1,8 s giữa đợt và 3 s trước boss do build rep).
//  • Đạn vận tốc kép từ ải 40: viên lẻ trong loạt bay 0,72×.
//  • Tàu Vận Tải Tinh Ngân (quái thưởng): 1 lần/ải chiến dịch sau đợt 2, không bắn, bay ngang y≈300 trong 5,5 s;
//    mỗi 25% máu mất rơi 8 sao + nộ; hạ gục: +1 cấp đạn 12 s + hợp kim ×4 tinh anh. (Chờ tranh GPT loot_carrier — tạm vẽ khung vàng.)
//  Tắt: window.BUF76=false (đệm bom), window.FAIR76=false (cả mô-đun).
const ROADMAP76={BOMB_BUFFER_MS:180,IFRAME_MS:1500,CLEAR_R:160,PUSH_R:240,VIGNETTE_MS:280,CRIT:.25,CRIT_PULSE:.9,SIREN:2.5,
 CARRIER:{AFTER_WAVE:2,FLIGHT:5.5,Y:300,HP_MUL:4.5,STARS:8,BUFF_SEC:12}};
const FAIR76=(()=>{
 const C=ROADMAP76,TAU=Math.PI*2;
 const on=()=>window.FAIR76!==false;
 const playing=()=>typeof mode!=='undefined'&&mode==='play';
 let pend=null,vig=0,saved=0,siren=0,carrier=null,carrierDone=false,buffT=0,buffAdd=0,lastWave=-1;
 const now=()=>performance.now();
 function critical(){try{const sh=window.SHIELD78===false,tot=(maxHp||1)+(sh?(maxShield||0):0),cur=Math.max(0,hp)+(sh?Math.max(0,shield):0);return cur/tot<C.CRIT&&hp>0;}catch{return false;}}
 function postHit(){try{invuln=Math.max(invuln,C.IFRAME_MS/1000);}catch{}vig=C.VIGNETTE_MS/1000;
  try{const R2=C.CLEAR_R*C.CLEAR_R,P2=C.PUSH_R*C.PUSH_R;for(const b of bullets){if(b.dead)continue;const dx=b.x-player.x,dy=b.y-player.y,d2=dx*dx+dy*dy;
    if(d2<R2){b.dead=true;}else if(d2<P2){const d=Math.sqrt(d2)||1,sp=Math.max(80,Math.hypot(b.vx,b.vy));b.vx=dx/d*sp;b.vy=dy/d*sp;b.push76=.3;}}}catch{}
  try{VisualFX.impact(player.x,player.y,'#ff5566',1.1);}catch{}}
 function install(){
  // trúng đòn
  try{const od=damage;damage=function(source){if(!on())return od.apply(this,arguments);
    let h0=0,s0=0;try{h0=hp;s0=shield;}catch{}
    if(source==='bullet'&&window.BUF76!==false&&playing()){let blocked=false;try{blocked=bulletShieldTime>0||Equipment25.blocksBullet()||invuln>0;}catch{}
     if(!blocked){if(!pend)pend={t:C.BOMB_BUFFER_MS/1000,src:source,args:[...arguments]};return;}}
    const r=od.apply(this,arguments);try{if(hp<h0||shield<s0)postHit();}catch{}return r;};}catch{}
  try{const ob=bomb;bomb=function(){const had=bombs;const r=ob.apply(this,arguments);try{if(pend&&bombs<had){pend=null;saved=1.2;try{toast('✦ CỨU NGUY!');}catch{}}}catch{}return r;};}catch{}
  // đạn vận tốc kép
  try{const og=Threat30.gun;Threat30.gun=function(e){const n0=bullets.length,b0=e&&e.burst30;const r=og.apply(this,arguments);try{if(on()&&(level|0)>=40&&e&&bullets.length>n0&&b0!==undefined&&b0%2===0)for(let i=n0;i<bullets.length;i++){const b=bullets[i];if(b&&b.aimed30&&!b.dv76){b.dv76=1;b.sp66=(b.sp66||1)*.72;}}}catch{}return r;};}catch{}
  // nhịp: hết quái → hút vật phẩm; quái thưởng
  try{const ou=update;update=function(dt){const r=ou.apply(this,arguments);try{if(on()&&playing())tick(dt);}catch(e){console.warn('FAIR76',e);}return r;};}catch{}
  try{const ok=kill;kill=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(was&&e.dead&&e.carrier76)carrierKill(e);}catch{}return r;};}catch{}
  try{const ors=reset;reset=function(){pend=null;vig=0;carrier=null;carrierDone=false;lastWave=-1;if(buffAdd){try{power=Math.max(1,power-buffAdd);}catch{}buffAdd=0;}buffT=0;const r=ors.apply(this,arguments);
    try{const n=+document.getElementById('mission-select').value||level;window.__cp76=Combat.stats().cp/Math.max(1,Meta40.reqCP(n));}catch{window.__cp76=undefined;}return r;};}catch{}
  try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{if(on()&&(mode==='play'||mode==='pause'))draw();}catch{}return r;};}catch{}}
 function tick(dt){
  if(pend){pend.t-=dt;if(pend.t<=0){const p=pend;pend=null;let h0=hp,s0=shield;try{invuln=0;}catch{}try{rawDamage(p.src);}catch{}try{if(hp<h0||shield<s0)postHit();}catch{}}}
  if(vig>0)vig-=dt;if(saved>0)saved-=dt;
  for(const b of bullets)if(b.push76>0){b.push76-=dt;}
  if(critical()){siren-=dt;if(siren<=0){siren=C.SIREN;try{tone(880,.07,'square',.03);setTimeout(()=>{try{tone(880,.07,'square',.03)}catch{}},140);}catch{}}}else siren=0;
  // hút vật phẩm khi màn sạch quái
  let live=false;for(const e of enemies)if(!e.dead&&!e.rescue28&&!e.carrier76){live=true;break;}
  if(window.BREATH78===true&&!live&&!boss){for(const d of drops){if(d.dead||d.type==='craft')continue;const a=Math.atan2(player.y-d.y,player.x-d.x),dd=Math.hypot(player.x-d.x,player.y-d.y);if(dd>8){const s=Math.min(dd,900*dt);d.x+=Math.cos(a)*s;d.y+=Math.sin(a)*s;}}}
  // V78 (người chơi yêu cầu): vật phẩm/buff/sao giữ kiểu rơi + nảy va chạm cũ nhưng KHÔNG biến mất (không hết hạn, chạm đáy nảy lại), tới gần 160/200 px tự hút
  if(window.LOOT78!==false){const Hd=typeof H==='number'?H:1100;const BUFF=new Set(['power','heal','shield','bomb','drone','weapon','super']);for(const d of drops){if(d.dead||d.type==='craft')continue;const star=d.type==='star';
    /* V78.4: chỉ BUFF ở lại màn (nảy, không hết hạn, không nhấp nháy); sao/vật phẩm khác rơi hẳn xuống khỏi đáy màn */
    if(!BUFF.has(d.type)){if(d.t>5.5)d.t=5.5;if(d.y>Hd+30)d.dead=true;continue;}
    if(d.t>5.5)d.t=5.5;d.fade51=1;/* giữ chuyển động nảy/va chạm cũ; chạm đáy thì nảy lại thay vì rơi mất */const yMax=Hd-24;if(d.y>yMax){d.y=yMax;d.vy=-Math.max(60,Math.abs(d.vy||0)*.7);}if(d.y<30&&(d.vy||0)<0){d.y=30;d.vy=Math.abs(d.vy);}
    /* hút do Loot40 lo (tầm gần sát thân tàu) — bỏ lớp hút xa cũ */}}
  // tăng cấp đạn tạm thời
  if(buffT>0){buffT-=dt;if(buffT<=0&&buffAdd){try{power=Math.max(1,power-buffAdd);}catch{}buffAdd=0;}}
  carrierTick(dt);}
 // gọi damage gốc khi hết đệm (bỏ qua lớp đệm)
 let rawDamage=null;
 // ---- quái thưởng ----
 function carrierOk(){if(window.__m78)return false;try{if(gameMode!=='campaign'||Dungeons.active()||Meta40.state().run)return false;if(O78.run&&O78.run())return false;}catch{}return true;}
 function carrierTick(dt){let w=-1;try{w=Waves30.state().wave;}catch{}
  if(!carrier&&!carrierDone&&!boss&&carrierOk()&&w>=C.CARRIER.AFTER_WAVE){carrierDone=true;const side=Math.random()<.5?-1:1;const hpBase=4.5;
   const e=addEnemy({x:side<0?-40:W+40,y:C.CARRIER.Y*((typeof H==='number'?H:1100)/1100),v:0,type:2,large:true,elite:false,guard:0,hp:hpBase*C.CARRIER.HP_MUL,fire:1e9,age:0,phase:0,dead:false,carrier76:1});
   if(e){e.burst30=0;e.max76=e.maxHp||e.hp;e.step76=0;e.dir76=-side;carrier=e;}}
  const e=carrier;if(!e)return;if(e.dead){carrier=null;return;}e.fire=1e9;e.burst30=0;e.t76=(e.t76||0)+dt;const u=e.t76/C.CARRIER.FLIGHT;
  if(u<1){e.x=e.dir76>0?-40+(W+80)*u:W+40-(W+80)*u;e.y=C.CARRIER.Y*((typeof H==='number'?H:1100)/1100)+Math.sin(e.t76*2)*10;}else{e.y-=420*dt;if(e.y<-80){e.dead=true;carrier=null;}}
  const lost=1-(e.hp/(e.max76||e.hp||1)),stp=Math.min(3,Math.floor(lost/.25));while(e.step76<stp){e.step76++;pinata(e);}}
 function pinata(e){try{/* V183: 8 sao nhỏ → 2 sao lớn cùng tổng điểm (8×35=280) */const o=window.DROP183===false,n=o?C.CARRIER.STARS:2;for(let i=0;i<n;i++)Safety31.push(drops,100,o?{x:e.x+(Math.random()-.5)*50,y:e.y+(Math.random()-.5)*20,type:'star',t:0}:{x:e.x+(i-.5)*30,y:e.y,type:'star',t:0,big:true,val:140});}catch{}try{Combat26.addCharge07(6);}catch{}}
 function carrierKill(e){pinata(e);try{if(power<5){power++;buffAdd++;}buffT=C.CARRIER.BUFF_SEC;}catch{}let elite=200;try{elite=Math.round(60+(level|0)*6);}catch{}try{Progress.grantCredits(elite*4);}catch{}
  try{toast('✦ TÀU VẬN TẢI TINH NGÂN · +1 CẤP ĐẠN 12 GIÂY');VisualFX.explode(e.x,e.y,1.4,'enemy');}catch{}carrier=null;}
 // ---- vẽ ----
 function draw(){const Wd=typeof W==='number'?W:480,Hd=typeof H==='number'?H:1100;
  // vòng đệm bom
  const n183=window.DROP183!==false;/* V183: luật không vòng quanh tàu/quái, không chữ trong trận */
  if(pend&&!n183){const u=pend.t/(C.BOMB_BUFFER_MS/1000);ctx.save();ctx.strokeStyle='#ffffff';ctx.globalAlpha=.9;ctx.lineWidth=3;ctx.beginPath();ctx.arc(player.x,player.y,8+34*u,0,TAU);ctx.stroke();ctx.restore();}
  if(saved>0&&!n183){ctx.save();ctx.globalAlpha=Math.min(1,saved);ctx.fillStyle='#ffd166';ctx.font="900 16px 'Neo',sans-serif";ctx.textAlign='center';ctx.fillText('CỨU NGUY!',player.x,player.y-58-(1.2-saved)*20);ctx.restore();}
  // viền đỏ khi trúng / nguy kịch
  let a=0;if(vig>0)a=.75*(vig/(C.VIGNETTE_MS/1000));const crit=critical();if(crit){const ph=(performance.now()/1000)%C.CRIT_PULSE/C.CRIT_PULSE;a=Math.max(a,.35*Math.pow(1-ph,2));}
  if(a>0.01){ctx.save();ctx.globalCompositeOperation='source-over';const t=32;for(const [x,y,w,h,gx0,gy0,gx1,gy1] of [[0,0,Wd,t,0,0,0,t],[0,Hd-t,Wd,t,0,Hd,0,Hd-t],[0,0,t,Hd,0,0,t,0],[Wd-t,0,t,Hd,Wd,0,Wd-t,0]]){const g=ctx.createLinearGradient(gx0,gy0,gx1,gy1);g.addColorStop(0,`rgba(255,0,50,${a})`);g.addColorStop(1,'rgba(255,0,50,0)');ctx.fillStyle=g;ctx.fillRect(x,y,w,h);}ctx.restore();}
  if(crit&&!n183){ctx.save();ctx.strokeStyle='#ff2244';ctx.lineWidth=2;ctx.setLineDash([6,5]);ctx.lineDashOffset=-performance.now()/40;ctx.globalAlpha=.9;ctx.beginPath();ctx.arc(player.x,player.y,58,0,TAU);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle="#ff2244";ctx.font="900 18px sans-serif";ctx.textAlign="center";ctx.fillText("!",player.x+50,player.y-44);ctx.restore();}
  // khung vàng cho quái thưởng (chờ tranh GPT)
  if(carrier&&!carrier.dead&&!n183){const e=carrier;ctx.save();ctx.strokeStyle='#ffd166';ctx.lineWidth=2.5;ctx.globalAlpha=.85;ctx.beginPath();ctx.arc(e.x,e.y,40,0,TAU);ctx.stroke();ctx.fillStyle='#ffd166';ctx.font="800 10px sans-serif";ctx.textAlign='center';ctx.fillText('TÀU VẬN TẢI · BẮN ĐỂ RƠI SAO',e.x,e.y+54);ctx.restore();}}
 setTimeout(()=>{try{rawDamage=damage;install();}catch(e){console.warn('FAIR76 install',e);}},0);
 return {state:()=>({pend:!!pend,crit:critical(),carrier:!!(carrier&&!carrier.dead),carrierDone,buff:buffT}),C};
})();
