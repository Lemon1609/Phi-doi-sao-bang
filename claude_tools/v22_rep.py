# V2.2 · thay chuỗi trong mã lõi (build74_mau.py exec; va22.py dùng khi vá nhanh). Mỗi cặp phải khớp đúng 1 lần.
PAIRS22=[
 # 1) đội hình chữ V gọn: tàu con sát mép cánh thật (l3309 ghi window.__half22) + 18 px, trong [62, 96] (nửa trên [52, 96]), lùi sau thêm 14 px (40 thay 26). Tắt: window.FORM22=false
 ("space=(window.SPREAD134===false?(upper?29:59):(upper?46:(window.SIDE138===false?86:100)))*(window.__L42&&window.SCALE42!==false?1.18:1)",
  "space=(window.V22!==false&&window.FORM22!==false)?Math.min(96,Math.max(upper?52:62,(window.__half22||0)*(window.__L42&&window.SCALE42!==false?1.22:1)+(upper?12:18))):(window.SPREAD134===false?(upper?29:59):(upper?46:(window.SIDE138===false?86:100)))*(window.__L42&&window.SCALE42!==false?1.18:1)"),
 ("pods[i].y+=(player.y+(window.FORM122!==false?26:12)+",
  "pods[i].y+=(player.y+((window.V22!==false&&window.FORM22!==false)?40:window.FORM122!==false?26:12)+"),
 # 2) nhặt P khi đang Bạo Tẩu: +2,5 s (trần 6 / 9 s) thay vì nạp lại đầy. Tắt: window.OD22=false
 ("if(d.type==='power'){if(power<5){power++;powerUpgrades=power-1;toast('NÂNG ĐẠN W · LV '+power+(power===5?' · BẠO TẨU':''));}else activateSuper();}",
  "if(d.type==='power'){if(power<5){power++;powerUpgrades=power-1;toast('NÂNG ĐẠN W · LV '+power+(power===5?' · BẠO TẨU':''));}else if(superTime>0&&window.V22!==false&&window.OD22!==false){const cap=Rank36.grade()==='SS'?9:6;superTime=Math.min(cap,superTime+2.5);toast('BẠO TẨU +2,5 GIÂY');}else activateSuper();}"),
 # 3) hết Bạo Tẩu: luôn về cấp ngay dưới (P4/4, power 5) — nhặt thêm 1 P là Bạo Tẩu lại
 ("if(wasSuper&&superTime<=0)toast('SUPER KẾT THÚC · GIỮ P4');",
  "if(wasSuper&&superTime<=0){if(window.V22!==false&&window.OD22!==false&&power<5&&!window.HANGAR_DEMO){power=5;powerUpgrades=4;}toast('SUPER KẾT THÚC · GIỮ P4');}"),
]
