# V2.1.42 · tắt nét vẽ vector cũ (V2.0) nằm trong base khi V2.1 bật (window.__L42 do src/v2142.js đặt; EVO21=false / V2142=false → giữ nguyên)
PAIRS=[
 # Fix A: 2 cặp vệt chéo xanh sau đuôi chiến cơ #01 (base Equipment-draw)
 ("if(selected===0&&!activeRobot){ctx.save();ctx.strokeStyle='#71cfff'","if(selected===0&&!activeRobot&&!window.__L42){ctx.save();ctx.strokeStyle='#71cfff'"),
 # lục giác khiên cũ (tb309 vẽ khiên mới)
 ("function draw(){if(shield>0){ctx.save();ctx.translate(player.x,player.y);ctx.rotate(time*.24);","function draw(){if(shield>0&&!window.__L42){ctx.save();ctx.translate(player.x,player.y);ctx.rotate(time*.24);"),
 # vệt dải cong (ribbon) sau tàu con
 ("function ribbon(points,color,width,ox=0,oy=0){if(reduced()||points.length<2)return;","function ribbon(points,color,width,ox=0,oy=0){if(reduced()||points.length<2||window.__L42)return;"),
 # tia sét nối giữa các viên đạn cấp 4 (vẽ chồng lên quạt đạn)
 ("if(!VisualFX.reduced()){const list=shots.filter(s=>s.level30===4&&s.element30==='lightning'&&!s.dead).slice(-72);","if(!VisualFX.reduced()&&!window.__L42){const list=shots.filter(s=>s.level30===4&&s.element30==='lightning'&&!s.dead).slice(-72);"),

 # V2.1.42 · tàu con dạt ra +18 % (cả điểm bắn) để đứng cạnh chiến cơ đã phóng to ×1,22
 ("space=window.SPREAD134===false?(upper?29:59):(upper?46:(window.SIDE138===false?86:100))","space=(window.SPREAD134===false?(upper?29:59):(upper?46:(window.SIDE138===false?86:100)))*(window.__L42&&window.SCALE42!==false?1.18:1)"),
]
