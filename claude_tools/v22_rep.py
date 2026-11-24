# V2.2 · thay chuỗi trong mã lõi (build74_mau.py exec; va22.py dùng khi vá nhanh). Mỗi cặp phải khớp đúng 1 lần.
PAIRS22=[
 # 1) đội hình chữ V: tâm tàu con = mép cánh thật (l3309 ghi window.__half22, ×1,22 thân) + nửa phần ĐẶC tàu con (tb309 ghi window.__podh22) + khe 10 px (chủ dự án chốt 24/11: khe 8–12), trong [62, 100] (nửa trên [52, 100]; trần 100 thay 96 để tàu 10 Bạo Tẩu cánh 71,7 px vẫn hở 10 px — đo 24/11); lùi sau 40 px (cũ 26). Tắt: window.FORM22=false; chỉnh khe window.GAP22, trần window.SPMAX22
 ("space=(window.SPREAD134===false?(upper?29:59):(upper?46:(window.SIDE138===false?86:100)))*(window.__L42&&window.SCALE42!==false?1.18:1)",
  "space=(window.V22!==false&&window.FORM22!==false)?Math.min(window.SPMAX22||100,Math.max(upper?52:62,(window.__half22||0)*(window.__L42&&window.SCALE42!==false?1.22:1)+(window.__podh22||20)+(window.GAP22||10))):(window.SPREAD134===false?(upper?29:59):(upper?46:(window.SIDE138===false?86:100)))*(window.__L42&&window.SCALE42!==false?1.18:1)"),
 ("pods[i].y+=(player.y+(window.FORM122!==false?26:12)+",
  "pods[i].y+=(player.y+((window.V22!==false&&window.FORM22!==false)?40:window.FORM122!==false?26:12)+"),
 # 2) nhặt P khi đang Bạo Tẩu: +2,5 s (trần 6 / 9 s) thay vì nạp lại đầy. Tắt: window.OD22=false
 ("if(d.type==='power'){if(power<5){power++;powerUpgrades=power-1;toast('NÂNG ĐẠN W · LV '+power+(power===5?' · BẠO TẨU':''));}else activateSuper();}",
  "if(d.type==='power'){if(power<5){power++;powerUpgrades=power-1;toast('NÂNG ĐẠN W · LV '+power+(power===5?' · BẠO TẨU':''));}else if(superTime>0&&window.V22!==false&&window.OD22!==false){const cap=Rank36.grade()==='SS'?9:6;superTime=Math.min(cap,superTime+2.5);toast('BẠO TẨU +2,5 GIÂY');}else activateSuper();}"),
 # 3) hết Bạo Tẩu: luôn về cấp ngay dưới (P4/4, power 5) — nhặt thêm 1 P là Bạo Tẩu lại
 ("if(wasSuper&&superTime<=0)toast('SUPER KẾT THÚC · GIỮ P4');",
  "if(wasSuper&&superTime<=0){if(window.V22!==false&&window.OD22!==false&&power<5&&!window.HANGAR_DEMO){power=5;powerUpgrades=4;}toast('SUPER KẾT THÚC · GIỮ P4');}"),
 # 4) trúng đòn khi KHÔNG có khiên (mất máu): hạ 1 cấp đạn (không khi đang Bạo Tẩu, tối thiểu Lv1). Chủ dự án chốt 24/11. Tắt: window.LV22=false
 ("flash=.13;VisualFX.impact(player.x,player.y,'#ffafa1');tone(110,.2,'sawtooth');}",
  "flash=.13;VisualFX.impact(player.x,player.y,'#ffafa1');tone(110,.2,'sawtooth');if(window.V22!==false&&window.LV22!==false&&superTime<=0&&power>1&&!window.HANGAR_DEMO){power--;powerUpgrades=power-1;toast('TRÚNG ĐÒN · ĐẠN LV '+power);}}"),
]
