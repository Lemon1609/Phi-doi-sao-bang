// V105 · ĐỘ PHÂN GIẢI ĐỘNG: khung trận vẽ ở 2× (960×2080 điểm ảnh trên điện thoại). Khi FPS thấp kéo dài, giảm dần độ nét
// (2 → 1,7 → 1,45 → 1,2); khi mượt lâu thì nâng lại. Hiệu ứng giữ nguyên. window.RS105 là trần hệ số; DRS105=false để tắt.
(()=>{
  // V109: giữ nét — ĐẸP chỉ hạ tới 1,5×; NHẸ 1,5× → 1,25×. Chỉ hạ khi dưới 40 FPS liên tục 3 giây.
  const N42=window.V2142!==false;/* V2.1.42: trần DPR 1,75 → 1,5 → 1,35 khi trung bình 30 khung > 17,5 ms */
  const D22=window.DPR22!==false;/* V2.2.1: trần DPR trận ĐẸP 1,35 → 1,25 → 1,1 · NHẸ 1,0 (máy thật ~37 FPS ở 1,75). Tắt: window.DPR22=false */
  const LVH=D22?[1.35,1.25,1.1]:N42?[1.75,1.5,1.35]:[2,1.7,1.5],LVL=D22?[1.0]:N42?[1.35,1.25]:[1.5,1.25];const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};let LV=lite()?LVL:LVH;let i=0,fr=0,acc=0,lowS=0,hiS=0,hold=0,last=0,changes=0;
  /* V2.2.3 CLEAN23: DPR tính theo ĐIỂM ẢNH CSS của canvas trận (HUD chẩn đoán đo canvas.width / clientWidth). Trước đây hệ số nhân theo đơn vị game (W 480) mà canvas
     chỉ rộng ~369 px CSS → NHẸ 1,0 thực ra là 1,30. Nay trong trận: NHẸ đúng 1,00 · ĐẸP tối đa 1,20 (1,2 → 1,1 → 1,0). Ngoài trận (Sảnh) giữ như cũ. Tắt: window.CLEAN23=false */
  const C23=()=>window.CLEAN23!==false;let kc=1;const LVH23=[1.2,1.1,1.0],LVL23=[1.0];
  const inPlay=()=>{try{return mode==='play'||mode==='pause';}catch{return false;}};
  const kNow=()=>{try{const w=canvas.clientWidth;if(w>0)kc=w/W;}catch{}return kc;};
  const target=()=>{if(C23()&&inPlay()){const L=lite()?LVL23:LVH23;return L[Math.min(i,L.length-1)]*kNow();}return LV[i];};
  const apply=()=>{const v=target();if(window.RS105!==v){window.RS105=v;try{resize();}catch{}}};apply();setInterval(()=>{const L=lite()?LVL:LVH;if(L!==LV){LV=L;i=0;}apply();},300);
  function tick(t){requestAnimationFrame(tick);const dt=last?(t-last)/1000:0;last=t;let p=false;try{p=mode==='play';}catch{}
    if(!p||window.DRS105===false||document.hidden||!(dt>0&&dt<.5)){fr=0;acc=0;return;}
    if(N42){fr++;acc+=dt;if(fr<30)return;const ms=acc/fr*1000;fr=0;acc=0;if(hold>0){hold--;return;}
      if(ms>17.5){lowS++;hiS=0;}else if(ms<14.5){hiS++;lowS=0;}else{lowS=0;hiS=0;}
      if(lowS>=2&&i<LV.length-1){i++;lowS=0;hold=2;changes++;apply();}else if(hiS>=12&&i>0){i--;hiS=0;hold=4;changes++;apply();}return;}
    fr++;acc+=dt;if(acc<1)return;const f=fr/acc;fr=0;acc=0;if(hold>0){hold--;return;}
    if(f<40){lowS++;hiS=0;}else if(f>=50){hiS++;lowS=0;}else{lowS=0;hiS=0;}
    if(lowS>=3&&i<LV.length-1){i++;lowS=0;hold=3;changes++;apply();}
    else if(hiS>=8&&i>0){i--;hiS=0;hold=4;changes++;apply();}}
  requestAnimationFrame(tick);
  window.V105={apply,state:()=>({lv:i,scale:LV[i],changes,rs:window.RS105}),_set:k=>{i=Math.max(0,Math.min(LV.length-1,k));apply();}};
})();
