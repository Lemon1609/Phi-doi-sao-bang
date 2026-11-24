import os,glob
# V73 = V72 + ĐÁ-2 (α/β, tẩy đá, 14 đá hiệu ứng còn lại) trong src/stone71.js. Chạy: python build73.py
# V72 = V71 + VŨ KHÍ TỐI THƯỢNG V72a (src/ult72.js/.css). Chạy: python build72.py
# V71 = V70 + HỆ ĐÁ KHẢM Đá-1 (src/stone71.js/.css). Chạy: python build71.py
# V70 = V69 + HỆ PHẨM CHẤT 4 KHUNG MÀU 12 nấc (src/adv70.js/.css). Chạy: python build70.py
# Dựng V68 = V67 + V68-A HUD trận đấu (src/hud68.*). Trước đó: V67 = V66.6 + C4: Chương 9 "Tinh Vân Đen" (ải 161–180) + Nguyệt Thực + Bụi Tinh Vân (src/v67.js, tranh src/ch9). Chạy: python build67.py
# (V66 = V65 + Trạm Tiếp Tế Chiến Thuật (8 lõi), phá cánh boss có hệ quả, người mới mở khóa dần, màn chờ tải, nhắc sao lưu. Chạy: python build66.py
# (V65 = V64 + 6 bệ tên lửa tiến hóa dáng dọc V3 của GPT (160×224). Chạy: python build65.py
# (V64 = V63 + bộ chỉnh số liệu Gemini đã chốt (tia sét 6%/8%+lan, lá chắn 15 s, nội tại trang bị +5, sao theo chương & xoay vòng 4 mục tiêu, van hỗ trợ chặt hơn, thử thách ngày 10 luật). Chạy: python build64.py
# (V63 = V62 + tiến hóa có tác dụng thật (evo53) + src/play63.js/.css: sao theo mục tiêu, gợi ý Graze, sao lưu nhanh ở Kho (thêm key mới vào bản sao lưu), Thử thách ngày. Chạy: python build63.py
# (V62 = V61 + 6 bệ tên lửa tiến hóa (bản sửa V2 của GPT) + giữ đúng tỉ lệ tranh khi tranh mới khác tỉ lệ gốc. Chạy: python build62.py
# (V61 = V60 + hình dáng tiến hóa trang bị đợt thử (inferno, rail, aegis). Chạy: python build61.py
# (V60 = V59 + ô Kho hiện hình tiến hóa (chiến cơ vẽ từ Evo53.hull; icon trang bị 'g:<id>_icon_evo1|2' khi có). Chạy: python build60.py
# (V59 = V58 + chỗ nạp hình dáng tiến hóa TRANG BỊ (src/evo/gear/<khóa tranh>_evo1|2.png|webp → EVO53_ART['g:…']). Chạy: python build59.py
# (V58 = V57 + hình dáng tiến hóa Đợt 3 (Bạo Tẩu ô 10–19) → đủ 40 hình. Chạy: python build58.py
# (V57 = V56 + hình dáng tiến hóa Đợt 2 (ô 0–9 dạng thường, đóng gói lại đúng ô 500×500). Chạy: python build57.py
# (V56 = V55 + hình dáng tiến hóa đợt thử của GPT (ô 0, ô 2; src/evo/ đóng gói bằng tools/dong_goi_evo.py). Chạy: python build56.py
# (V55 = V54 + TIẾN HÓA NGOẠI HÌNH (src/evo53.js/.css thay Rank52): thân chiến cơ & trang bị đổi màu/chất liệu theo mức cường hóa (lam → bạch kim → hoàng kim → cầu vồng pha lê), đạn đổi màu, tia sét. Chạy: python build55.py
# (V54 = V53 bỏ hẳn vật phẩm ĐỔI SÚNG (theo người dùng): không nạp 5 tranh weapon0..4 (cất ở review_vatpham2/khong_dung/). Chạy: python build54.py
# (V53 = V52 + bộ ngọc vật phẩm V2 của GPT (src/pickups/*.webp), đổi màu BOM/NAM CHÂM, tranh sao điểm, ẩn vòng quỹ đạo khi buff có tranh đã đậu. Chạy: python build53.py
# (V52 = V51 + sửa lỗi (Graze về 0 khi sang ải, buff mờ khi gần đạn, tự giảm hiệu ứng cả trên máy DPR>2) + Tiến hóa hình ảnh theo mốc cường hóa (src/rank52.js/.css) + nén ảnh an toàn (tools/nen_anh.py). Chạy: python build52.py
# (V51 = V50 + buff rơi tự trôi về quanh chiến cơ (src/drift51.js). Chạy: python build51.py
# (V50 = V49 + nút trận GPT V2 (src/hudbtn50.css = Nut_Tran_Tinh_The_V2.css + icon toàn màn hình đậm hơn). Chạy: python build50.py
# (V49 = V48 + 3 chi tiết lấy từ Sảnh SSS V3 của GPT trong src/lobby46.css)
# V45 (2026-10-20, Claude):
#  B-V44-01  Lực chiến (Combat.stats) chưa tính hệ số trang bị SSS (×1,35×(1+3%/cấp)) → lắp SSS không tăng lực chiến.
#  B-V44-02  Thanh Vũ khí/Tàu con ở Kho chiến cơ (statsRow) chưa nhân hệ số SSS → lệch số với Sảnh SSS.
#  B-V44-03  Ô trang bị SSS ở Kho ghi "+N" của món gốc → ghi "+N" là cường hóa SSS thật (tag SSS đã có ở góc ô).
#  B-V44-04  Giáp SSS nay được ×1,35×(1+3%/cấp) phần máu + khiên của giáp (bọc Progress.stats trong src/gear45.js), đúng như mô tả Xưởng SSS — giống game gốc.
#  B-V44-05  Người chơi mới: bong bóng hướng dẫn chồng lên hộp Điểm danh; màn ngang lệch khỏi khung game → src/onboard45.js/.css.
#  B-V44-06  Bước 1/3 hướng dẫn ghi "Chọn ải trên bản đồ" khi người chơi đang ở Kho chiến cơ → chỉ đúng nút XUẤT KÍCH / BẢN ĐỒ.
#  DX-V45-01  Nút trong trận (tạm dừng, toàn màn hình, TÊN LỬA, BOM) làm lại đồ họa: khung kim loại + lõi bóng + icon SVG; hồi chiêu hiện số giây rõ; BOM có huy hiệu số → src/hudbtn45.css.
#  B-V45-07  (lỗi do DX-V45-01) Nút tạm dừng luôn vẽ icon ‖ kể cả khi đang tạm dừng (game hiện ▶) → src/hudbtn45.js gắn data-ic, CSS vẽ icon tiếp tục.
# V46 (2026-10-20, Claude, GPT đang hết lượt):
#  DX-V46-01  Sảnh SSS: skin V2 của GPT (src/lobby_skin_v2.css, nguyên văn) + src/lobby46.css (Claude): ảnh viền nút phụ/ô menu
#             có lõi xám đục (GPT ghi là bán trong suốt) → làm lại để --cc-accent lộ ra; ô menu bỏ gai, mỗi ô một màu ngọc;
#             màu nhấn rõ ở viền khung/tấm tên/ô chọn; nút KHO/GHÉP rộng hơn, chấm đỏ không đè chữ.
#  DX-V46-02  src/ccht_lobby46.js: đặt --cc-accent = màu chiến cơ đang xem; nhãn ô SSS "+N" (bỏ chữ SSS lặp); tia sáng sau chiến cơ dịu hơn.
#  DX-V46-03  Nút trận: bản GPT V1 (đã thử trong trận) + 4 sửa trạng thái (src/hudbtn46.css): sẵn sàng sáng hơn hồi chiêu,
#             hồi chiêu = vệt tối quét + số giây to không khung, hết bom xám hẳn + huy hiệu xám, icon tạm dừng 2 vạch, icon bom pha lê.
# V47 (Claude, người dùng chốt: độ khó MẠNH, qua ải MẤT HẾT, buff SIÊU CẤP chỉ từ tinh anh/boss):
#  DX-V47-01  Đợt quái: ải chương 1–2 = 4 biên đội, chương 3–5 = 5, chương 6–8 = 6; phó bản 4 (trước: 2/2).
#             Quái mỗi biên đội: min(34, min(19, 14 + (ải−1)/16) + 3×đợt) → luôn tăng theo đợt (trước: min(22, 14 + 2×đợt + (ải−1)/2)).
#  DX-V47-02  Thanh máu boss: bảng to đầu màn ẩn, thay bằng thanh nhỏ trên đầu boss (src/play47.js + CSS).
#  DX-V47-03  Qua ải mới: làm lại từ đầu — W1, mất Bạo Tẩu/drone/khiên chắn đạn/nam châm/nạp siêu cấp, đổi súng về súng gốc,
#             máu đầy, giáp về mức đầu trận, bom = 3; dọn vật phẩm còn rơi.
#  DX-V47-04  Vật phẩm SIÊU CẤP (Loot40): chỉ rơi khi hạ quái tinh anh (20%, không khi đang Bạo Tẩu, tối đa 1 trên màn)
#             và khi phá giáp / phá cánh boss; nhặt = vào Bạo Tẩu ngay, tối thiểu 8 giây.
# V48 (Claude): cân đối phần thưởng — quà theo đợt, tiếp tế trước boss, vật liệu × độ dài ải, van an toàn thua 2/4 lần (xem src/balance48.js).
import json
h=open('base/Phi_Doi_Sao_Bang_V42.html',encoding='utf-8').read()
# ---- V129 · Đợt H: atlas chiến cơ hợp thể SSS mới (7 cột × 2 hàng, ô 512) từ src/hop129 ----
import glob as _gh,re as _rh,io as _ih,base64 as _bh
_H4=os.environ.get('HOP4','1')!='0' and os.path.isdir('src/hop4309')  # V309 Lượt 4: 7 chiến thần mới (claude_tools/cat_l4309.py)
if len(_gh.glob('src/hop129/hop*_*.png'))>=14:
    from PIL import Image as _IH
    _A=_IH.new('RGBA',(7*512,1024),(0,0,0,0))
    for _i in range(7):
        for _r,_f in enumerate(['tau','toida']):
            _im=_IH.open(('src/hop4309/hop%d_tau.png'%(_i+1)) if _H4 else ('src/hop129/hop%d_%s.png'%(_i+1,_f))).convert('RGBA').resize((512,512),_IH.LANCZOS);_A.alpha_composite(_im,(_i*512,_r*512))
    _bay=None
    if len(_gh.glob('src/hop131/hop*_*.png'))>=14:
        # V131 (H3): menu = chân dung ngửa mặt · trong trận = bay úp mặt
        _B=_A.copy()
        for _i in range(7):
            _A.paste((0,0,0,0),(_i*512,512,_i*512+512,1024));_B.paste((0,0,0,0),(_i*512,512,_i*512+512,1024))
            _A.alpha_composite(_IH.open(('src/hop4309/' if _H4 else 'src/hop131/')+'hop%d_chandung.png'%(_i+1)).convert('RGBA').resize((512,512),_IH.LANCZOS),(_i*512,512))
            _bi=_IH.open(('src/hop4309/' if _H4 else 'src/hop131/')+'hop%d_bay.png'%(_i+1)).convert('RGBA');_bb=_bi.getchannel('A').getbbox();_bi=_bi.crop(_bb);_fr=([.30,.46,.32,.32,.28,.32,.30] if _H4 else [.31,.33,.32,.30,.30,.32,.29])[_i];_hh=int(254/.71);_k=min(_hh/_bi.height,500/_bi.width);_bi=_bi.resize((round(_bi.width*_k),round(_bi.height*_k)),_IH.LANCZOS)  # V196: tranh GPT mới (nữ chiến giáp kín), tâm lưng ≈ 44% chiều cao  # V309 (chủ dự án 20/11): tâm = LƯNG robot (đo 7 tranh robot_max: 29–33 % chiều cao), cùng cỡ 7 mẫu, cỡ vẽ bù ở SSSGame .16→.36
            _B.alpha_composite(_bi,(_i*512+(512-_bi.width)//2,512+256-round(_fr*_bi.height)))  # V132: giữa lưng = tâm ô = tâm chiến cơ
        _bf=_ih.BytesIO();_B.save(_bf,'WEBP',quality=88);_bay='data:image/webp;base64,'+_bh.b64encode(_bf.getvalue()).decode()
    _bf=_ih.BytesIO();_A.save(_bf,'WEBP',quality=88);_new='data:image/webp;base64,'+_bh.b64encode(_bf.getvalue()).decode()
    h,_n=_rh.subn(r'const SSS_ATLAS="data:image/webp;base64,[A-Za-z0-9+/=]+"',lambda m:'const SSS_ATLAS="'+_new+'"'+((';const SSS_ATLAS_BAY="'+_bay+'"') if _bay else ''),h,count=1);print('V129 SSS_ATLAS thay:',_n,len(_new)//1024,'KB','bay' if _bay else '')
    if _bay:
        h=h.replace("const SSSGame=(()=>{\n const im=new Image();im.src=SSS_ATLAS;","const SSSGame=(()=>{\n const im=new Image();im.src=SSS_ATLAS_BAY;const imL=new Image();imL.src=SSS_ATLAS;/* V131: trong trận bay úp, sảnh chân dung */",1)
        h=h.replace("f.draw(g,w,h,t,on,{...opts(),cx,cy,S:S*.62,duration:1.1});","f.draw(g,w,h,t,on,{...opts(),hull:(imL.complete&&imL.naturalWidth?imL:im),cx,cy,S:S*.62,duration:1.1});",1)
def rep(a,b,n=1):
    global h;c=h.count(a);assert c==n,(a[:80],c);h=h.replace(a,b)
# ---- giữ nguyên các bước của build44.py ----
rep("return {init,paint,cycle,demo:()=>({...D}),phase:setPhase,show:()=>setShown(true),","return {init,paint,cycle,stop:stopDemo,demo:()=>({...D}),phase:setPhase,show:()=>setShown(true),")
rep("<title>Phi Đội Sao Băng V42</title>","<title>Phi Đội Sao Băng V67</title>")
rep("const key=it?it.id+':'+it.level+':'+(it.enhance||0)+':'+it.grade:'none';if(p&&p.dataset.k!==key){p.dataset.k=key;p.innerHTML=it?Progress.art(it):'<span class=\"empty\">＋</span>';}",
 "const g4=typeof Gear44!=='undefined'?Gear44.slotPic(k):'',key=(it?it.id+':'+it.level+':'+(it.enhance||0)+':'+it.grade:'none')+(g4?':'+Gear44.activeId(k):'');if(p&&p.dataset.k!==key){p.dataset.k=key;p.innerHTML=it?(g4||Progress.art(it)):'<span class=\"empty\">＋</span>';}")
rep("set('h1-r'+n,it?(it.grade||RK[it.rarity]||''):'');root.querySelector(`[data-slot=\"${k}\"]`).className='h1-slot r-'+(it?it.rarity:'none');",
 "const g5=typeof Gear44!=='undefined'&&Gear44.slotPic(k);set('h1-r'+n,g5?'SSS':it?(it.grade||RK[it.rarity]||''):'');root.querySelector(`[data-slot=\"${k}\"]`).className='h1-slot r-'+(g5?'sss':it?it.rarity:'none');")
h=h.replace(':not(.stage-grid36 button)',':not(.stage-grid36 button):not(#ccht-lobby-root button):not(#g44 button):not(.m63 button):not(#pz66):not(.ex67 button):not(.pl67 button):not(.tr67 button):not(.dk67 button):not(.fx68 button):not(#lb68 button):not(.bk68):not(.adv69 button):not(.st71 button):not(.u72 button):not(#ult72-btn):not(#robot-skill):not(.l74 button):not(.l74pg button):not(.g74 button):not(#nav74 button):not(#nav74s button):not(.n74p button):not(.n74rib):not(.n74pat):not(.c74ok):not(.e74p button):not(.adv69b):not(.sk69 button)')
# ---- V47 ----
rep("const budget=(w,l)=>Math.min(22,14+w*2+Math.floor((l-1)/2));","const budget=(w,l)=>Math.min(34,Math.min(19,14+Math.floor((l-1)/16))+w*3);")
rep("const waveTotal=()=>Dungeons.active()?2:gameMode==='endless'?1:2;","const waveTotal=()=>{if(window.__bk78w)return window.__bk78w;if(Dungeons.active())return 4;if(gameMode==='endless')return 1;const n=level,b=n<=20?4:n<=60?5:n<=120?6:7;return n%5===0?Math.max(2,b-2):b;};")  # REVIEW75 số đợt theo chương, ải boss bớt 2
rep("hp=Math.min(maxHp,hp+1);shield=Math.min(maxShield,shield+1);bombs=Math.min(5,bombs+1);",
    "{const c0=pilotStats();hp=maxHp;shield=Math.min(maxShield,(c0.shield+gear.startShield)*BALANCE.allyStats);bombs=3;power=1;powerUpgrades=0;superTime=0;drone=0;bulletShieldTime=0;weapon=c0.weapon;drops=[];try{Loot40.reset();}catch{}}")
rep("else toast('ẢI '+level+' · TIẾP TẾ +1');","else toast('ẢI '+level+' · KHỞI ĐẦU LẠI · W1');")
rep("weapon:{c:'#ffffff',c2:'#3fe6ff',label:'ĐỔI SÚNG',icon:'?'}};","weapon:{c:'#ffffff',c2:'#3fe6ff',label:'ĐỔI SÚNG',icon:'?'},\n  super:{c:'#ffd84a',c2:'#b04cff',label:'SIÊU CẤP',icon:'S'}};")
rep("st.meter+=e.elite?4:e.large?2:1;","if(e.elite&&superTime<=0&&!drops.some(d=>!d.dead&&d.type==='super')&&Math.random()<.2)spawn('super',e.x,e.y,{vy:-80});\n  st.meter+=e.elite?4:e.large?2:1;")
rep("if(d.type==='power'&&power>=5){st.superCharge+=.5;","if(d.type==='super'){fxPickup(d);d.type='none';collect(d);activateSuper();superTime=Math.max(superTime,8);text(d.x,d.y,'SIÊU CẤP!',s.c);toast('✦ SIÊU CẤP · BẠO TẨU '+Math.round(superTime)+' GIÂY');return;}\n  if(d.type==='power'&&power>=5){st.superCharge+=.5;")
SUP="{x:%s,y:%s,type:'super',t:0,vx:0,vy:-90,ph:0,v40:true}"
rep("Safety31.push(drops,100,{x:b.x,y:b.y+50,type:'power',t:0});","Safety31.push(drops,100,{x:b.x,y:b.y+50,type:'power',t:0});if(superTime<=0)Safety31.push(drops,100,"+SUP%("b.x+34","b.y+50")+");")
rep("Safety31.push(drops,100,{x:p.x-12,y:p.y,type:'power',t:0},{x:p.x+12,y:p.y,type:'heal',t:0});","Safety31.push(drops,100,{x:p.x-12,y:p.y,type:'power',t:0},{x:p.x+12,y:p.y,type:'heal',t:0});if(superTime<=0)Safety31.push(drops,100,"+SUP%("p.x","p.y-14")+");")
rep("ctx.fillText('LÕI ĐANG ĐƯỢC BẢO VỆ',b.x,b.y-49);","ctx.fillText('LÕI ĐANG ĐƯỢC BẢO VỆ',b.x,b.y+52);")  # nhãn xuống dưới khung, nhường chỗ thanh máu boss
# ---- V45 ----
rep("'1/3 · Chọn ải trên bản đồ. Ải tiếp theo mở khi vượt ải trước.'","'1/3 · Bấm XUẤT KÍCH để vào ải, hoặc BẢN ĐỒ để chọn ải khác. Ải tiếp theo mở khi vượt ải trước.'")  # B-V44-06
# hệ số SSS của 1 trang bị phụ trợ (Gear44 nạp sau Combat/Hangar41 nhưng chỉ được gọi lúc chạy)
MULT="(typeof Gear44!=='undefined'?Gear44.dmgMult(i.kind)/(Gear44.sssM?Gear44.sssM(i.kind):1):1)"  # V156: ×SSS đã nằm trong auxDamage
rep("(g.auxiliary||[]).reduce((n,i)=>n+i.auxDamage*i.spec.count/i.interval,0)",
    "(g.auxiliary||[]).reduce((n,i)=>n+i.auxDamage*i.spec.count/i.interval*"+MULT+",0)")              # B-V44-01
rep("for(const it of gs.auxiliary||[]){const d=it.auxDamage*it.spec.count/it.interval*.81*24;",
    "for(const it of gs.auxiliary||[]){const d=it.auxDamage*it.spec.count/it.interval*.81*24*"+MULT.replace('i.kind','it.kind')+";")  # B-V44-02
rep("set('h1-e'+n,it?'+'+(it.enhance||0):'');",
    "const g6=typeof Gear44!=='undefined'&&Gear44.slotPic(k)?Gear44.activeId(k):null;set('h1-e'+n,g6?'+'+Gear44.sssEnh(g6):it?'+'+(it.enhance||0):'');")  # B-V44-03
# ---- V51 · buff rơi trôi về quanh chiến cơ ----
rep("const fall=isStar?95:46;d.vy+=(fall-d.vy)*Math.min(1,dt*2.2);d.vx*=Math.exp(-dt*1.5);d.x+=(d.vx+(isStar?0:Math.sin(d.t*2+(d.ph||0))*18))*dt;d.y+=d.vy*dt;",
    "if(!isStar&&typeof Drift51!=='undefined')Drift51.step(d,dt);else{const fall=isStar?95:46;d.vy+=(fall-d.vy)*Math.min(1,dt*2.2);d.vx*=Math.exp(-dt*1.5);d.x+=(d.vx+(isStar?0:Math.sin(d.t*2+(d.ph||0))*18))*dt;d.y+=d.vy*dt;}")
rep("if(!isStar&&d.y>H*.88){d.y=H*.88;d.vy=0;}","if(!isStar&&typeof Drift51==='undefined'&&d.y>H*.88){d.y=H*.88;d.vy=0;}")
rep("if(d.type==='craft'){d.y+=72*dt;if(dist(d,player)<28)collect(d);continue;}",
    "if(d.type==='craft'){d.t=(d.t||0);if(typeof Drift51!=='undefined')Drift51.step(d,dt);else d.y+=72*dt;if(dist(d,player)<28)collect(d);continue;}")
# ---- V51 · tranh vật phẩm mới (Pickup51) ----
rep("const sz=62*pulse;ctx.drawImage(capsule(d.type,s.c,s.c2,s.icon),d.x-sz/2,y-sz/2,sz,sz);",
    "const sz=62*pulse;if(!(typeof Pickup51!=='undefined'&&Pickup51.draw(d,y,sz)))ctx.drawImage(capsule(d.type,s.c,s.c2,s.icon),d.x-sz/2,y-sz/2,sz,sz);")
rep("function fxPickup(d){","function fxPickup(d){try{if(typeof Pickup51!=='undefined')Pickup51.burst(d);}catch{}")
rep("  // hiệu ứng nhặt\n  ctx.globalCompositeOperation='lighter';for(const f of st.fx)",
    "  // hiệu ứng nhặt\n  try{if(typeof Pickup51!=='undefined')Pickup51.drawFx();}catch{}\n  ctx.globalCompositeOperation='lighter';for(const f of st.fx)")
import base64,os
def uri(p): return 'data:image/webp;base64,'+base64.b64encode(open(p,'rb').read()).decode()
PK={}
for k,stem in [('super','sieu_cap')]+[(t,t) for t in ['power','heal','shield','bomb','drone','magnet','star']]:
    base='src/pickups/'+stem
    if os.path.exists(base+'.webp'):PK[k]={'base':uri(base+'.webp'),'idle':uri(base+'_idle.webp') if os.path.exists(base+'_idle.webp') else '','burst':uri(base+'_burst.webp') if os.path.exists(base+'_burst.webp') else ''}
print('vat pham co tranh:',list(PK))
# V78.8 · buff V2 (GPT ui18b): hộp năng lượng lục giác, khác hẳn đạn quái — thay ảnh nền, bỏ hoạt ảnh idle cũ
import io as _io8
from PIL import Image as _I8
def _w8(path,mx):
    _im=_I8.open(path).convert('RGBA');_im.thumbnail((mx,mx),_I8.LANCZOS);_bf=_io8.BytesIO();_im.save(_bf,'WEBP',quality=90);return 'data:image/webp;base64,'+base64.b64encode(_bf.getvalue()).decode()
if os.environ.get('UI18B','1')!='0':
    for _k,_f in [('power','firepower'),('heal','health'),('shield','shield'),('bomb','bomb'),('drone','drone'),('super','super')]+[('weapon%d'%i,'weapon_swap') for i in range(5)]:
        _pp='src/ui18b/buff_'+_f+'.png'
        if os.path.exists(_pp):
            _o=PK.get(_k,{'burst':''});PK[_k]={'base':_w8(_pp,128),'idle':'','burst':_o.get('burst','')}
# V113 · vật phẩm rơi bộ mới của GPT (không còn khung lục giác, khác hẳn huy chương); bom giữ tranh cũ
if os.environ.get('PK113','0')!='0':  # V116: chủ dự án muốn giữ biểu tượng buff cũ
    for _k in ['power','heal','shield','drone','super','bomb']:
        _pp='src/pickup113/'+_k+'.png'
        if os.path.exists(_pp):
            _o=PK.get(_k,{'burst':''});PK[_k]={'base':_w8(_pp,128),'idle':'','burst':_o.get('burst','')}
# V309 Lượt 5 · 8 vật phẩm rơi mới (GPT 89280) thay hộp lục giác bạc V51/V78. Tắt: DROP5=0 khi dựng
DROP309={}
if os.environ.get('DROP5','1')!='0':
    for _k in ['power','heal','shield','bomb','drone','super','magnet','star']+['weapon%d'%_i for _i in range(5)]:  # Lượt 6: + 5 hộp đổi súng
        _pp='src/drop309/'+_k+'.png'
        if os.path.exists(_pp):
            DROP309[_k]=_w8(_pp,128)
            if _k!='star':_o=PK.get(_k,{'burst':''});PK[_k]={'base':DROP309[_k],'idle':'','burst':_o.get('burst','')}
print('vat pham L5:',len(DROP309))
HUD113={k:_w8('src/hud113/'+k+'.png',64) for k in ['graze','warn'] if os.path.exists('src/hud113/'+k+'.png')}
BUL78A={}
for _c in ['red','orange','purple','blue','green','white']:
    for _s in ['round','diamond','needle']:
        _pp='src/ui18b/enemy_bullet_%s_%s.png'%(_c,_s)
        if os.path.exists(_pp):BUL78A[_c+'_'+_s]=_w8(_pp,64)
print('dan V2:',len(BUL78A))

# ---- V52 ----
rep("try{Loot40.reset();}catch{}}","try{Loot40.reset();}catch{}try{Combat26.reset();}catch{}}")  # Graze về 0 khi sang ải
rep("if(!L){ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.7;ctx.drawImage(pillar","if(!L&&!d.park51){ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.7;ctx.drawImage(pillar")
_i=h.find("const s=specOf(d);if(!s)continue;const rem=LIFE-d.t");_j=h.find("// hiệu ứng nhặt",_i);assert _i>0 and _j>_i
_seg=h[_i:_j];assert _seg.count('blink?.35:1')==4;h=h[:_i]+_seg.replace('blink?.35:1','(blink?.35:1)*(d.fade51||1)')+h[_j:]
rep("if (VisualFX.counts().quality==='light'||window.devicePixelRatio>2||document.hidden","if (VisualFX.counts().quality==='light'||document.hidden")  # tự giảm hiệu ứng cả trên máy DPR 3
# ---- V53 · bộ ngọc vật phẩm V2 ----
rep("  bomb:{c:'#ff6ad5',c2:'#a01cff',label:'BOM',icon:'B'},","  bomb:{c:'#ff5a8a',c2:'#b0123f',label:'BOM',icon:'B'},")
rep("  magnet:{c:'#a88cff',c2:'#5a3cff',label:'NAM CHÂM',icon:'U'},","  magnet:{c:'#7c8cff',c2:'#3a3fd0',label:'NAM CHÂM',icon:'U'},")
rep("const specOf=d=>d.type==='weapon'?{...SPEC.weapon,c:(weapons[d.weapon||0]?.color)||'#ffffff',icon:(weapons[d.weapon||0]?.tag)||'?'}:SPEC[d.type];",
    "const specOf=d=>d.type==='weapon'?{...SPEC.weapon,c:(weapons[d.weapon||0]?.color)||'#ffffff',icon:(weapons[d.weapon||0]?.tag)||'?',label:(weapons[d.weapon||0]?.name)||SPEC.weapon.label}:SPEC[d.type];")  # nhãn ghi tên súng
rep("ctx.strokeStyle=s.c;ctx.lineWidth=1.4;","ctx.strokeStyle=(d.park51&&typeof Pickup51!=='undefined'&&Pickup51.hasD(d))?'rgba(0,0,0,0)':s.c;ctx.lineWidth=1.4;")
rep("ctx.globalCompositeOperation='lighter';ctx.drawImage(spr,-s/2,-s/2,s,s);",
    "const pk51=typeof Pickup51!=='undefined'&&Pickup51.img('star');if(pk51){ctx.globalCompositeOperation='source-over';ctx.drawImage(pk51,-s*.68,-s*.68,s*1.36,s*1.36);}else{ctx.globalCompositeOperation='lighter';ctx.drawImage(spr,-s/2,-s/2,s,s);}")
# ---- V55 · tiến hóa ngoại hình ----
rep("reduced:VisualFX.reduced(),hull:fighterAtlasV22,cx:player.x","reduced:VisualFX.reduced(),hull:(typeof Evo53!=='undefined'?Evo53.hull(id):fighterAtlasV22),cx:player.x")
rep("reduced:VisualFX.reduced(),hull:fighterAtlasV22,duration:1.0","reduced:VisualFX.reduced(),hull:(typeof Evo53!=='undefined'?Evo53.hull(id):fighterAtlasV22),duration:1.0")
rep("f.draw(g,W,H,clock,on,{hull:fighterAtlasV22,","(window.Ship83&&Ship83.isNew(launchCraft)&&(()=>{try{const im=Ship83.hull(launchCraft,on);if(!im||!(im.naturalWidth||im.width))return false;const s=250*S;g.drawImage(im,cx-s/2,cy-s/2+(VisualFX.reduced()?0:Math.sin(clock*1.6)*4),s,s);return true;}catch{return false;}})())||f.draw(g,W,H,clock,on,{hull:(typeof Evo53!=='undefined'?Evo53.hull(launchCraft):fighterAtlasV22),")  # V129: sảnh vẽ đúng tàu 11–13 (trước lấy nhầm ô atlas của tàu 1–3)
rep("shipFx.draw(g,148,148,clock,false,{hull:fighterAtlasV22,","shipFx.draw(g,148,148,clock,false,{hull:(typeof Evo53!=='undefined'?Evo53.hull(launchCraft):fighterAtlasV22),")
import base64 as _b64,os as _os
EVO={}
for _k in ['fighters_evo1','fighters_evo2']:
    _p='src/evo/'+_k+'.webp'
    if _os.path.exists(_p):EVO[_k]='data:image/webp;base64,'+_b64.b64encode(open(_p,'rb').read()).decode()
import glob as _gl
for _p in sorted(_gl.glob('src/evo/gear/*_evo[12].png')+_gl.glob('src/evo/gear/*_evo[12].webp')):
    _k='g:'+_os.path.splitext(_os.path.basename(_p))[0]
    if _p.endswith('.png'):
        import io as _io
        from PIL import Image as _Im
        _bio=_io.BytesIO();_Im.open(_p).convert('RGBA').save(_bio,'WEBP',quality=92,alpha_quality=95,method=6);_raw=_bio.getvalue()
    else:_raw=open(_p,'rb').read()
    EVO[_k]='data:image/webp;base64,'+_b64.b64encode(_raw).decode()
print('tranh hinh dang tien hoa:',len(EVO),'tep',[k for k in EVO if not k.startswith('g:')],sum(1 for k in EVO if k.startswith('g:')),'trang bi')
# ---- V63 · bản sao lưu gồm cả các key mới (SSS, tiến hóa, hỗ trợ vượt ải, thử thách ngày, đăng nhập ngày) ----
rep("function payload(){return {format:'saobang-backup',version:2,createdAt:new Date().toISOString(),deviceId:meta.id,data:snapshot()};}",
    "const EXTRA63=['saobang-gear-sss-v1','saobang-gear-sss-v2','saobang-evo-v55','saobang-assist-v48','saobang-daily-v63','saobang-meta-v40','saobang-hint-v63','saobang-pilot-v67','saobang-trade-v67','saobang-eclipse-v67','saobang-nebula-v67','saobang-unlock-v66','saobang-backup-remind-v66','saobang-telemetry-v66','saobang-adv69-v1','saobang-tier70-v1','saobang-stone71-v1','saobang-ult72-v1','saobang-chip72-v1','saobang-skin69-v1','saobang-econ74-v1','saobang-guide74-v1','saobang-nav74-v1','saobang-chest74-v1','saobang-v75','saobang-oc75-v1','saobang-v77r','saobang-fest78','saobang-bk78','PLAYER_QUESTS_V77','PLAYER_SEASON_PASS_V77','saobang-codex77','PLAYER_OVERLIMIT_V78'];const SK63=new Set(['saobang-device-v1','saobang-cloud78','saobang-tele78','saobang-telemetry-v66','saobang-backup','saobang-before-new-v36']);const P63=k=>(k.startsWith('saobang-')||k.startsWith('PLAYER_'))&&!SK63.has(k);function X63(o){const s=new Set(EXTRA63);try{for(const k of Object.keys(localStorage))if(P63(k))s.add(k);}catch{}try{for(const k of Object.keys(o||{}))if(P63(k))s.add(k);}catch{}return [...s];}function extra63(){const o={};for(const k of X63()){try{const v=localStorage.getItem(k);if(v!=null)o[k]=JSON.parse(v);}catch{}}return o;}function payload(){return {format:'saobang-backup',version:2,createdAt:new Date().toISOString(),deviceId:meta.id,data:Object.assign(snapshot(),extra63())};}")
rep(" return Object.fromEntries(keys.filter(k=>d[k]!==undefined).map(k=>[k,d[k]]));}",
    " const out=Object.fromEntries(keys.filter(k=>d[k]!==undefined).map(k=>[k,d[k]]));for(const k of X63(d))if(!keys.includes(k)&&d[k]!==undefined&&d[k]!==null)out[k]=d[k];return out;}")
rep("for(const k of keys)if(pending[k]!==undefined)localStorage.setItem(k,JSON.stringify(pending[k]));pending=null;restoring=true;",
    "for(const k of keys)if(pending[k]!==undefined)localStorage.setItem(k,JSON.stringify(pending[k]));for(const k of X63(pending))if(!keys.includes(k)&&pending[k]!==undefined)localStorage.setItem(k,JSON.stringify(pending[k]));pending=null;restoring=true;")
# ---- V64 · LỖI CŨ: hangar tắt màn diễn thử (stopDemo) SAU khi trận đã bắt đầu → đặt lại power=1, làm mất khởi đầu W2/W3 của Van hỗ trợ ----
rep("window.HANGAR_DEMO=false;shots=[];rings=[];superTime=0;power=1;powerUpgrades=0;robotCooldown=0;",
    "window.HANGAR_DEMO=false;shots=[];rings=[];if(!['play','pause','reward'].includes(mode)){superTime=0;power=1;powerUpgrades=0;}robotCooldown=0;")
# ---- V66 ----
rep("i.interval/(BALANCE.allyStats*gearBattleBoost().rate)","i.interval/(BALANCE.allyStats*gearBattleBoost().rate)*(i.kind==='missiles'&&typeof Gate66!=='undefined'?Gate66.misRate():1)")
rep("count=(i.variant==='prism'?3+r:s.count)+buff.extra","count=(i.variant==='prism'?3+r:s.count)+buff.extra+(i.kind==='missiles'&&typeof Gate66!=='undefined'?Gate66.misExtra():0)")
rep("function shoot(){fire+=Arsenal30.levels[Arsenal30.p()].delay/(gear.rate*pilotRate());","function shoot(){fire+=Arsenal30.levels[Arsenal30.p()].delay/(gear.rate*pilotRate()*(typeof Gate66!=='undefined'?Gate66.rate():1));")
rep("const dpr = Number.isFinite(value) && value > 0 ? Math.min(value, 2) : 1;","const dpr = Number.isFinite(value) && value > 0 ? Math.min(value, window.GFX66==='light'?1.25:2) : 1;")
rep("if (VisualFX.counts().quality==='light'||window.devicePixelRatio>2||tier===0||motion.matches||","if (VisualFX.counts().quality==='light'||tier===0||motion.matches||")
# ---- V66.2 · bỏ hình siêu chiến cơ CŨ (fusions-v27) ở khung "Thử hỏa lực" và hình dự phòng trong trận → dùng tranh SSS mới (SSS_ATLAS 7 cột × 2 hàng) ----
SSSC="function sssCell66(r,max){if(typeof SSS_ATLAS==='undefined')return null;const A=window.__ssa66||(window.__ssa66=Object.assign(new Image(),{src:(typeof SSS_ATLAS_BAY!=='undefined'?SSS_ATLAS_BAY:SSS_ATLAS)}));if(!A.complete||!A.naturalWidth)return null;let i=0;try{i=SSSGame.indexFor(r);}catch{i=(r.artIndex||0)%7;}if(!(i>=0))i=(r.artIndex||0)%7;const cw=A.naturalWidth/7,ch=A.naturalHeight/2;return [A,i*cw,(max?1:0)*ch,cw,ch];}"
rep("function robotSprite(r,x,y,size,rotation=0){if(fusionAtlasV22.complete&&fusionAtlasV22.naturalWidth){",SSSC+"\nfunction robotSprite(r,x,y,size,rotation=0){const q66=sssCell66(r,Fighters28.overdrive());if(q66){const s=size*1.5;ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.drawImage(q66[0],q66[1],q66[2],q66[3],q66[4],-s/2,-s/2*q66[4]/q66[3],s,s*q66[4]/q66[3]);ctx.restore();return;}if(fusionAtlasV22.complete&&fusionAtlasV22.naturalWidth){")
rep("if(!robot&&typeof SuperHangar!=='undefined'){SuperHangar.draw(id,g,300,400,t,superView);}","const q66=robot&&typeof sssCell66==='function'?sssCell66(robot,superView):null;if(q66){const s=superView?290:250;g.drawImage(q66[0],q66[1],q66[2],q66[3],q66[4],x-s/2,y-s/2*q66[4]/q66[3]-8,s,s*q66[4]/q66[3]);}else if(!robot&&typeof SuperHangar!=='undefined'){SuperHangar.draw(id,g,300,400,t,superView);}")
rep("const list=SSSGun.beams(ctx,i,true,player.x,player.y,S,time,ua,0,VisualFX.counts().quality==='light'?.7:.9);","const list=SSSGun.beams(ctx,i,true,player.x,player.y,S,time,ua,0,(VisualFX.counts().quality==='light'?.7:.9)*(typeof GLOW66!=='undefined'?GLOW66.beam:1));")
rep("const stageRequirement=n=>1100+(n-1)*12;","const stageRequirement=n=>typeof Endgame66!=='undefined'?Endgame66.req(n)*(typeof Eclipse67!=='undefined'&&Eclipse67.active()?ECL.req:1):1100+(n-1)*12;")
rep("function draw(b){const c=b.tint30||colors[(b.enemyStyle||0)%4],r=b.r||5,a=Math.atan2(b.vy,b.vx);","function draw(b){const c=(typeof Warm66!=='undefined'?Warm66.map(b.tint30||colors[(b.enemyStyle||0)%4],b.enemyStyle||0):(b.tint30||colors[(b.enemyStyle||0)%4])),r=b.r||5,a=Math.atan2(b.vy,b.vx);")
rep("ctx.globalAlpha=1;ctx.fillStyle=c;ctx.strokeStyle=c;\n if(b.type==='needle')","ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.fillStyle='#1a0408';ctx.globalAlpha=.75;ctx.beginPath();safeArc(ctx,0,0,r+3.4,0,TAU);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle=c;ctx.strokeStyle=c;\n if(b.type==='needle')")
B66="(typeof Bullet66!=='undefined'?Bullet66.cur():null)"
rep("if(!e.burst30){e.burst30=3+(e.elite?2:0);e.aim30=aim(e);}if(bullets.filter(b=>!b.dead).length<180){","const B6="+B66+";if(!e.burst30){e.burst30=B6?B6.burst+(e.elite?B6.eliteExtra:0):3+(e.elite?2:0);e.aim30=aim(e);}if(bullets.filter(b=>!b.dead).length<(B6?B6.cap:180)){")
rep("if(e.large)fanSafe(e.x,e.y+15,e.aim30,5,.12,type);else emit(e.x,e.y+15,e.aim30,408,type);","if(e.large)fanSafe(e.x,e.y+15,e.aim30,B6?B6.fan:5,B6?.244:.12,type);else emit(e.x,e.y+15,e.aim30,408,type);")
rep("e.burst30--;e.fire=e.burst30>0?.13:.85;}","e.burst30--;e.fire=e.burst30>0?(B6?B6.gap:.13):(B6?B6.cd*(.85+Math.random()*.3):.85);}")
rep("const t=clamp((b.y/H-.28)/.37,0,1),target=408-(408-216)*t*t*(3-2*t);","const t=clamp((b.y/H-.28)/.37,0,1),sp6=(b.sp66||1),v0=clamp(408*sp6,120,480),v1=Math.max(100,v0*.8),target=v0-(v0-v1)*t*t*(3-2*t);")  # ROADMAP76: đạn chậm 135→225 px/s, gần tàu còn 80%
rep("const target=b.aimed30?408:Math.min(speed,260);","if(b.aimed30&&b.sp66===undefined){const B7="+B66+";b.sp66=B7?B7.speed:1;}const target=b.aimed30?clamp(408*(b.sp66||1),120,480):Math.min(speed,260);")
rep("<body>","<body>"+open('src/boot66.html',encoding='utf-8').read())
# V202 · bỏ buff DRONE HỘ TỐNG (2 chiến cơ phụ trợ bay kèm) — luật: không chiến cơ phụ trợ, chỉ 2 bệ vũ khí phụ
rep("   drone:dr>0?0:.45,","   drone:0,")
rep("function spawn(type,x,y,extra={}){Safety31.push(","function spawn(type,x,y,extra={}){if(type==='drone')type='shield';Safety31.push(")
rep("if(d.type==='drone'){drone=15;toast('DRONE HỘ TỐNG · 15 GIÂY');}","if(d.type==='drone'){try{shield=Math.min(maxShield,shield+maxShield*.5);}catch{}toast('GIÁP +');}")
rep("return {quality,normalize,enhancement,cap,cost,ready,mastered,tier,levelFactor,craftProgress,","return {spendExp:n=>{n=Math.max(0,Math.floor(n));if(locked||state.exp<n)return false;state.exp-=n;save();render();return true;},spendFrag:(m,n)=>{n=Math.max(0,n|0);if(locked||(state.gearFragments[m]||0)<n)return false;state.gearFragments[m]-=n;save();render();return true;},expBalance:()=>state.exp,quality,normalize,enhancement,cap,cost,ready,mastered,tier,levelFactor,craftProgress,")
# ---- V67 · Chương 9 + Nguyệt Thực ----
rep("return {init,cores:()=>S.cores,addCores,","return {init,cores:()=>S.cores,spendCores:n=>{n=Math.max(0,n|0);if(S.cores<n)return false;S.cores-=n;save();return true;},addCores,")
rep("i.interval/(BALANCE.allyStats*gearBattleBoost().rate)*(i.kind==='missiles'&&typeof Gate66!=='undefined'?Gate66.misRate():1)","i.interval/(BALANCE.allyStats*gearBattleBoost().rate)*(i.kind==='missiles'&&typeof Gate66!=='undefined'?Gate66.misRate():1)*(typeof Pilot67!=='undefined'?Pilot67.gearRate(i.kind):1)")
rep("const missionFor=level=>MISSIONS[Math.max(0,(Math.floor(level)-1)%160)];","const missionFor=level=>MISSIONS[Math.max(0,(Math.floor(level)-1)%MISSIONS.length)];")
rep("function canStart(n){return Number.isInteger(n)&&n>=1&&n<=160&&(n===1||state.cleared.includes(n-1));}","function canStart(n){return Number.isInteger(n)&&n>=1&&n<=(n>180&&typeof Ch10!=='undefined'&&Ch10.open()?200:n>160&&typeof Ch9!=='undefined'&&Ch9.open()?180:160)&&(n===1||state.cleared.includes(n-1));}")
rep("cleared:[...new Set((Array.isArray(saved.cleared)?saved.cleared:[]).filter(n=>Number.isInteger(n)&&n>=1&&n<=160))]};","cleared:[...new Set((Array.isArray(saved.cleared)?saved.cleared:[]).filter(n=>Number.isInteger(n)&&n>=1&&n<=200))]};")
rep("h.cleared.some(n=>!Number.isInteger(n)||n<1||n>160)","h.cleared.some(n=>!Number.isInteger(n)||n<1||n>200)")
rep("Number(k)>=1&&Number(k)<=160&&Number.isInteger(n)&&n>=1&&n<=3","Number(k)>=1&&Number(k)<=200&&Number.isInteger(n)&&n>=1&&n<=3")
rep("if(level>=160){end(true);return;}","if(level>=((level>=160&&typeof Ch9!=='undefined'&&Ch9.open()&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active()))?((typeof Ch10!=='undefined'&&Ch10.open())?200:180):160)){end(true);return;}")
rep("function draw(){const th=theme(),key=th.seed+'|'+th.glow+'|'+W+'|'+H;if(key!==farKey){farKey=key;rebuild(th);}",
    "function draw(){const th=theme(),im67=((typeof Ch9!=='undefined'?Ch9.bgFor(level):null)||(typeof Ch10!=='undefined'?Ch10.bgFor(level):null)),ecl67=typeof Eclipse67!=='undefined'&&Eclipse67.active(),key=th.seed+'|'+th.glow+'|'+W+'|'+H+'|'+(im67?1:0)+'|'+(ecl67?1:0);if(key!==farKey){farKey=key;rebuild(th);try{if(im67){far={c:im67,h:Math.round(W*im67.naturalHeight/im67.naturalWidth)};farH=far.h;}if(ecl67){const src=far.c;far={...far,c:Eclipse67.tint(src),big:null};}}catch{}}")
# tranh Chương 9 (GPT Đợt 8) → WebP
import io as _io9
from PIL import Image as _Im9
CH9A={}
for _k,_f,_q in [('body','ch9_boss_body.png',90),('rage','ch9_boss_rage.png',90),('wl','ch9_wing_left.png',90),('wr','ch9_wing_right.png',90),('bg','ch9_bg.png',82),('badge','nguyet_thuc_badge.png',90)]:
    _im=_Im9.open('src/ch9/'+_f);_im=_im.convert('RGB') if _k=='bg' else _im.convert('RGBA');_bio=_io9.BytesIO();_im.save(_bio,'WEBP',quality=_q,method=6);CH9A[_k]='data:image/webp;base64,'+_b64.b64encode(_bio.getvalue()).decode()
PILA={}
for _i in range(1,9):
    _p='src/pilots/pilot_%d.png'%_i
    if _os.path.exists(_p):
        _im=_Im9.open(_p).convert('RGBA').resize((256,256),_Im9.LANCZOS);_bio=_io9.BytesIO();_im.save(_bio,'WEBP',quality=88,method=6);PILA['p%d'%_i]='data:image/webp;base64,'+_b64.b64encode(_bio.getvalue()).decode()
print('chan dung phi cong:',len(PILA))
print('tranh chuong 9:',{k:len(v)//1024 for k,v in CH9A.items()},'KB')
css=open('src/ccht_base.css').read()+'\n'+open('src/ccht_extra.css').read()
A=json.load(open('src/gear_assets.json'))
# V74 · tranh trang bị GPT Đợt 15b (src/gear15): thay đúng khóa, giữ kích thước ảnh cũ ×2 cho nét
import glob as _gl2
from PIL import Image as _I
import io as _io,base64 as _b64
for _p in sorted(_gl2.glob('src/gear15/*.png')):
    _k=os.path.splitext(os.path.basename(_p))[0]
    if _k not in A:
        if _k.endswith('_pod_normal') or _k.endswith('_pod_super'):
            # bộ 7–9 (…36) chưa có khóa: lấy cỡ theo loại (tên lửa 80×112, tàu con 64/128)
            _w,_h=(80,112) if _k.split('_pod_')[0] in ('comet36','nova36','judgement36') else ((128,128) if _k.endswith('_super') else (64,64))
        else: continue
    else:
        _old=_I.open(_io.BytesIO(_b64.b64decode(A[_k].split(',')[1])));_w,_h=_old.size
    # tranh tiến hóa cũ (khác phong cách) bị bỏ cho món đã có tranh 15b/15c — chờ Đợt 15d
    for _s in ('_evo1','_evo2'):EVO.pop('g:'+_k+_s,None)
    _im=_I.open(_p).convert('RGBA')
    if _k.endswith('_icon'):
        _bb=_im.split()[3].point(lambda v:255 if v>16 else 0).getbbox();_im=_im.crop(_bb);_m=max(_im.size);_sq=_I.new('RGBA',(int(_m*1.06),int(_m*1.06)),(0,0,0,0));_sq.paste(_im,((_sq.width-_im.width)//2,(_sq.height-_im.height)//2),_im);_im=_sq
    _im.thumbnail((_w*2,_h*2),_I.LANCZOS);_cv=_I.new('RGBA',(_w*2,_h*2),(0,0,0,0));_cv.paste(_im,((_w*2-_im.width)//2,(_h*2-_im.height)//2),_im)
    _bf=_io.BytesIO();_cv.save(_bf,'WEBP',quality=88);A[_k]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode();print('gear15',_k,_w,_h)

# V75 · tranh tiến hóa mới GPT 15d (src/evo15/gear/<khóa>_evo1|2.png) — nạp SAU vòng gear15 nên không bị xóa
for _p in sorted(_gl2.glob('src/evo15/gear/*_evo[12].png')):
    _k='g:'+os.path.splitext(os.path.basename(_p))[0];_im=_I.open(_p).convert('RGBA');_im.thumbnail((256,256),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=88);EVO[_k]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
print('evo15:',len(_gl2.glob('src/evo15/gear/*_evo[12].png')))
# V133 · trang bị thiết kế lại (src/tb133/<mã>_icon1-3 · _tran1-3 · _tranbt) — Phần J
TB133={}
def _fit133(p,W0,H0,fill=.92):
    _im=_I.open(p).convert('RGBA');_bb=_im.getchannel('A').point(lambda v:255 if v>12 else 0).getbbox();_im=_im.crop(_bb)
    _k=min(W0*fill/_im.width,H0*fill/_im.height);_im=_im.resize((max(1,round(_im.width*_k)),max(1,round(_im.height*_k))),_I.LANCZOS)
    _cv=_I.new('RGBA',(W0,H0),(0,0,0,0));_cv.paste(_im,((W0-_im.width)//2,(H0-_im.height)//2),_im);return _cv
def _icon208(p,S=256):
    # V208 · D1 (chủ dự án duyệt 08/11): món dài/mảnh (tỉ lệ dài ≥ 2,4) xoay chéo 45° hướng lên phải rồi mới vừa ô → hiện to bằng các món khác.
    _im=_I.open(p).convert('RGBA');_bb=_im.getchannel('A').point(lambda v:255 if v>12 else 0).getbbox();_im=_im.crop(_bb)
    if max(_im.size)/max(1,min(_im.size))>=2.4:
        _im=_im.rotate(45 if _im.width>_im.height else -45,resample=_I.BICUBIC,expand=True)
        _bb=_im.getchannel('A').point(lambda v:255 if v>12 else 0).getbbox();_im=_im.crop(_bb);_f=.96
    else:_f=.9
    _k=min(S*_f/_im.width,S*_f/_im.height);_im=_im.resize((max(1,round(_im.width*_k)),max(1,round(_im.height*_k))),_I.LANCZOS)
    _cv=_I.new('RGBA',(S,S),(0,0,0,0));_cv.paste(_im,((S-_im.width)//2,(S-_im.height)//2),_im);return _cv
def _u133(im):
    _bf=_io.BytesIO();im.save(_bf,'WEBP',quality=88);return 'data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
def _armor133(p,big=False):
    # 2 module khiên hai bên hông: khung 384 (= 192 px trong trận ×2), module cao ≈ 84 (42 px trong trận), tâm ±124
    _m=_I.open(p).convert('RGBA');_bb=_m.getchannel('A').point(lambda v:255 if v>12 else 0).getbbox();_m=_m.crop(_bb);_h=96 if big else 84;_k=_h/_m.height;_m=_m.resize((max(1,round(_m.width*_k)),_h),_I.LANCZOS)
    _cv=_I.new('RGBA',(384,384),(0,0,0,0));_cv.alpha_composite(_m,(192-118-_m.width//2,192-_h//2+10));_r=_m.transpose(_I.FLIP_LEFT_RIGHT);_cv.alpha_composite(_r,(192+118-_r.width//2,192-_h//2+10));return _cv
for _ic in sorted(_gl2.glob('src/tb133/*_icon1.png')):
    _m=os.path.basename(_ic)[:-10];_d='src/tb133/'+_m;TB133[_m]=1
    for _n,_key in [('icon1',_m+'_icon'),('icon2','g:'+_m+'_icon_evo1'),('icon3','g:'+_m+'_icon_evo2')]:
        _v=_u133(_icon208(('src/icon309/'+_m+'.png') if (os.environ.get('ICON4','1')!='0' and os.path.exists('src/icon309/'+_m+'.png')) else (_d+'_'+_n+'.png')))  # V309 Lượt 4: 26 icon giáp/tên lửa mới (cùng 1 hình mọi bậc). Tắt: ICON4=0  # V208 · D1: icon dài/mảnh xoay chéo 45° để hiện to, đều cỡ (không vẽ lại tranh)
        if _key.startswith('g:'):EVO[_key]=_v
        else:A[_key]=_v
    _MIS139={'inferno','cryo','thunder','singularity','spiral','stellar','comet36','nova36','judgement36','swarm9','devour10_m','chrono11_m','monarch12_m'}
    if not os.path.exists(_d+'_tran1.png'):
        print('V133 trang bi moi:',_m,'(V140: khong co tranh trong tran - giap/ten lua an trong tran)')
    else:
     _kind='armor' if os.path.exists('src/tb133/'+_m+'_tran1.png') and _I.open('src/tb133/'+_m+'_tran1.png').size==(128,128) and _m in ('aegis','mirror','orbital','phase','reactive','nanite','aurora36','void36','seraph36','aegis9','devour10_a','chrono11_a','monarch12_a') else ('missiles' if _m in _MIS139 else 'sidearm')  # V144: theo mã, không đoán theo tỉ lệ tranh
     if _kind=='armor':
         A[_m+'_shell_idle']=_u133(_armor133(_d+'_tran1.png'));EVO['g:'+_m+'_shell_idle_evo1']=_u133(_armor133(_d+'_tran2.png'));EVO['g:'+_m+'_shell_idle_evo2']=_u133(_armor133(_d+'_tran3.png'));A[_m+'_shell_bt']=_u133(_armor133(_d+'_tranbt.png',True))
     else:
         _W,_H=(160,224) if _kind=='missiles' else (128,128)
         A[_m+'_pod_normal']=_u133(_fit133(_d+'_tran1.png',_W,_H));EVO['g:'+_m+'_pod_normal_evo1']=_u133(_fit133(_d+'_tran2.png',_W,_H));EVO['g:'+_m+'_pod_normal_evo2']=_u133(_fit133(_d+'_tran3.png',_W,_H))
         A[_m+'_pod_super']=_u133(_fit133(_d+'_tranbt.png',_W,_H) if _kind=='missiles' else _fit133(_d+'_tranbt.png',256,256))
     print('V133 trang bi moi:',_m,_kind)
    for _ef in ['projectile_normal','projectile_super','impact_normal','impact_super','muzzle','trail','beam_normal','beam_super']:
        _pe=_d+'_'+_ef+'.png'
        if os.path.exists(_pe) and (_m+'_'+_ef) in A:
            _old=_I.open(_io.BytesIO(_b64.b64decode(A[_m+'_'+_ef].split(',')[1])));_ni=_I.open(_pe).convert('RGBA')
            if _ni.size!=_old.size:_ni=_ni.resize(_old.size,_I.LANCZOS)
            A[_m+'_'+_ef]=_u133(_ni)
        elif os.path.exists(_pe):A[_m+'_'+_ef]=_u133(_I.open(_pe).convert('RGBA'))  # V148: món bộ 07–13 (không thuộc GEAR_FX) → khóa mới, noi_tai147 vẽ
G36={}
for _p in sorted(_gl2.glob('src/gear15/*36_icon.png')):
    _k=os.path.splitext(os.path.basename(_p))[0][:-5]
    # V208: dòng cũ để chú thích '# V148…' nuốt mất đoạn cắt/dựng ảnh → cả 9 icon dòng 36 dùng chung 1 ảnh cũ (_sq sót lại). Tách dòng + dùng _icon208.
    _sq=_icon208(('src/icon309/'+_k+'.png') if (os.environ.get('ICON4','1')!='0' and os.path.exists('src/icon309/'+_k+'.png')) else ('src/tb133/'+_k+'_icon1.png' if os.path.exists('src/tb133/'+_k+'_icon1.png') else _p))
    _bf=_io.BytesIO();_sq.save(_bf,'WEBP',quality=88);G36[_k]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
print('icon bo 36:',len(G36))
G36JS='<script id="g36">const G36_ICONS='+json.dumps(G36)+';setTimeout(()=>{try{const st=document.createElement("style");st.textContent=Object.entries(G36_ICONS).map(([k,v])=>`.gear25-art.g44-${k}{background-image:url(${v})!important;background-size:82% auto!important;background-position:center!important;background-repeat:no-repeat!important}`).join("");document.head.appendChild(st);const oa=Progress.art;Progress.art=function(i){const h=oa.apply(this,arguments);return i&&G36_ICONS[i.variant]&&!h.includes("g44-"+i.variant)?h.replace(\'class="gear25-art\',\'class="gear25-art g44-ic g44-\'+i.variant):h;};}catch(e){}},0);</script>'
fx=open('src/gear_fx_v3.js',encoding='utf-8').read()
_ao="if(layer==='armor'&&d.kind==='armor'){"
assert fx.count(_ao)==1
fx=fx.replace(_ao,"if(layer==='armor'&&d.kind==='armor'&&typeof Armor69!=='undefined'){try{Armor69.draw(c,s);}catch(e){}}else if(layer==='armor'&&d.kind==='armor'){",1)  # V69-E giáp = màng mỏng
import glob as _g,base64 as _b64,io as _io
TIER69={}
for _p in sorted(_g.glob('src/tier/*.png'))+sorted(_g.glob('src/tier/*.webp')):
    try:
        from PIL import Image as _I
        _im=_I.open(_p).convert('RGBA');_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=90);TIER69[os.path.splitext(os.path.basename(_p))[0]]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
    except Exception as _e:print('loi tranh bac',_p,_e)
print('tranh than tau theo bac:',len(TIER69))
SHIP118={}
# V217 · cân đối cỡ / tỉ lệ thân tàu lúc dựng (claude_tools/candoi217.py); tệp gốc trong src/ship118 giữ nguyên. Tắt: CANDOI217=0
if os.environ.get('SHIP309','1')!='0' and os.path.isdir('src/ship309'):  # V309 Lượt 3: bộ 13 chiến cơ v4 (claude_tools/cat_tau309v4.py), mọi bậc cùng 1 dáng, cỡ theo bậc. Tắt: SHIP309=0
    _S118={os.path.splitext(os.path.basename(_p))[0]:_I.open(_p).convert('RGBA') for _p in sorted(_g.glob('src/ship309/tau*.png'))}
elif os.environ.get('CANDOI217','1')!='0':
    import sys as _sys;_sys.path.insert(0,'claude_tools');import candoi217 as _cd;_S118=_cd.can_doi('src/ship118')
else:
    _S118={os.path.splitext(os.path.basename(_p))[0]:_I.open(_p).convert('RGBA') for _p in sorted(_g.glob('src/ship118/tau*.png'))}
for _n in sorted(_S118):
    _num,_f=_n[3:].split('_',1);_im=_S118[_n]
    if os.environ.get('SHIP256','1')!='0' and _im.width>256:_im=_im.resize((256,256),_I.LANCZOS)  # V307 (19/11): thu ảnh tàu về 256 để nhẹ bản dựng; SHIP256=0 giữ 512
    _bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=int(os.environ.get('SHIPQ','85')))  # V2.1 Đợt 3: thân tàu trận q85
    SHIP118.setdefault(str(int(_num)-1),{})[_f]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
SHIP309COL={};SHIP309BB={}  # V309 Lượt 3: điểm phản lực / mép cánh / mũi theo tranh v4 (đơn vị = cạnh khung, gốc = tâm khung)
if os.environ.get('SHIP309','1')!='0' and os.path.isdir('src/ship309'):
    import numpy as _np
    for _n in sorted(_S118):
        if _n.endswith('_bt'):continue
        _num,_f=_n[3:].split('_',1);_A=_np.asarray(_S118[_n])[...,3]>128;_ys,_xs=_np.where(_A);_W=_A.shape[1]
        _x0,_x1,_y0,_y1=int(_xs.min()),int(_xs.max()),int(_ys.min()),int(_ys.max());_cx=(_x0+_x1)/2;_w=_x1-_x0
        _best=(-1,0)
        for _dx in range(int(_w*.06),int(_w*.26)+1):
            _c=[int(_cx-_dx),int(_cx+_dx)];_b=[(_np.where(_A[:,_q])[0].max() if _A[:,_q].any() else 0) for _q in _c];_bb=min(_b)
            if _bb>_best[0]:_best=(_bb,_dx)
        _ly=int(_np.where(_A[:,_x0])[0].mean())
        _R=_np.asarray(_S118[_n])[...,:3].astype(float);_h=_y1-_y0;_V=_R.max(2);_bx=_np.zeros_like(_A);_bx[int(_y0+.2*_h):int(_y1-.2*_h),int(_cx-.18*_w):int(_cx+.18*_w)]=True;_m=_A&_bx
        _thr=_np.percentile(_V[_m],98.5) if _m.any() else 255;_gy,_gx=_np.where(_m&(_V>=_thr));_gx=_gx.mean() if len(_gx) else _cx;_gy=_gy.mean() if len(_gy) else 256
        SHIP309BB.setdefault(str(int(_num)-1),{})[_f]=[round(v/_W,4) for v in (_x0-256,_y0-256,_x1-256,_y1-256,_best[1],_best[0]-256,_ly-256,_gx-256,_gy-256)]
        if _f=='thuong':
            _S=(_V-_R.min(2))/_np.maximum(_V,1);_mm=_A&(_S>.5)&(_V>140)
            _P=_R[_mm];_c=_np.array([160,210,255.])
            if len(_P):
                _mx=_P.max(1);_mn=_P.min(1);_d=_np.maximum(_mx-_mn,1);_r,_gg,_bb=_P[:,0],_P[:,1],_P[:,2]
                _hu=_np.where(_mx==_r,((_gg-_bb)/_d)%6,_np.where(_mx==_gg,(_bb-_r)/_d+2,(_r-_gg)/_d+4))*60
                _hist=_np.histogram(_hu,bins=24,range=(0,360))[0].astype(float);_gold=(_np.arange(24)*15>=30)&(_np.arange(24)*15<60)
                if _hist[~_gold].sum()>_hist.sum()*.25:_hist[_gold]=0
                _bi=int(_hist.argmax());_sel=(_hu>=_bi*15-15)&(_hu<_bi*15+30);_c=_P[_sel].mean(0) if _sel.any() else _P.mean(0)
            _c=_c*(235/max(1,_c.max()))
            SHIP309COL[str(int(_num)-1)]='#%02x%02x%02x'%tuple(int(v) for v in _c)
print('V118 chien co thiet ke lai:',{k:len(v) for k,v in SHIP118.items()})
BOSS78A={}
for _k,_f,_s in [('p1','boss_pha_khong_phase1',640),('p2','boss_pha_khong_phase2',640),('p3','boss_pha_khong_phase3',640),('portrait','boss_pha_khong_portrait',192),('carrier','loot_carrier',224)]:
    _im=_I.open('src/boss78/'+_f+'.png').convert('RGBA');_im.thumbnail((_s,_s),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=86);BOSS78A[_k]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
print('boss78:',len(BOSS78A))

# ---- V82 · tranh GPT gói V80–V81: 12 trang bị bộ 6–9 (icon / đạn / vệt / lóe) + boss ải 20/60/80/100 ----
_A82={'aegis9':'fleet_armor','swarm9':'fleet_missile','carrier9':'fleet_aux','aurora36':'forge_armor','comet36':'forge_missile','lance36':'forge_aux','void36':'void_armor','nova36':'void_missile','orbit36':'void_aux','seraph36':'dawn_armor','judgement36':'dawn_missile','halo36':'dawn_aux'}
for _v in ['devour10_a','devour10_m','devour10_s','chrono11_a','chrono11_m','chrono11_s','monarch12_a','monarch12_m','monarch12_s']:_A82[_v]=_v
def _w82(path,mx,q=88,trim=False):
    _im=_I.open(path).convert('RGBA')
    if trim:
        _bb=_im.getbbox()
        if _bb:_im=_im.crop(_bb)
    _im.thumbnail((mx,mx),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=q);return 'data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
# V158 · tranh SSS Phần E (claude_tools/cat_sss.py → src/sss_art/<mã>/): icon1..3 + dải hiệu ứng → GEAR44_ASSETS[<mã>_<tệp>]
if os.path.isdir('src/sss_art'):
    for _sid in sorted(os.listdir('src/sss_art')):
        for _fn in sorted(os.listdir('src/sss_art/'+_sid)):
            if _fn.endswith('.png'):
                _k=_fn[:-4];_pp=('src/sss309/'+_sid+'.png') if (_k in ('icon1','icon2','icon3') and os.environ.get('SSS4','1')!='0' and os.path.exists('src/sss309/'+_sid+'.png')) else ('src/sss_art/'+_sid+'/'+_fn);A[_sid+'_'+_k]=_w82(_pp,4096 if _k not in ('icon1','icon2','icon3') else 256,q=90)  # V309 Lượt 4: 21 icon SSS mới. Tắt: SSS4=0
for _v,_gg in _A82.items():
    _d='src/gear81art/'+_gg+'/'+_gg
    _tbj=os.path.exists('src/tb133/'+_v+'_icon1.png')  # V151: đã có tranh GPT Phần J → không ghi đè icon / tàu con bằng tranh V82
    if not _tbj:A[_v+'_icon']=_w82(_d+'_icon.png',192)
    A[_v+'_beam81n']=_w82(_d+'_beam_normal.png',128,trim=True);A[_v+'_beam81s']=_w82(_d+'_beam_super.png',128,trim=True)
    A[_v+'_trail81']=_w82(_d+'_trail.png',96,trim=True);A[_v+'_muzzle81']=_w82(_d+'_muzzle.png',64)
    if _tbj and os.path.exists('src/tb133/'+_v+'_tran1.png'):pass
    elif _v in ('swarm9','carrier9'):
        _pp=_d+'_shell_idle_evo1.png'
        A[_v+'_pod_normal']=_w82(_pp,192) if os.path.exists(_pp) else A[_v+'_icon'];A[_v+'_pod_super']=A[_v+'_pod_normal']
    elif _v.endswith('_m') or _v.endswith('_s'):A[_v+'_pod_normal']=A[_v+'_icon'];A[_v+'_pod_super']=A[_v+'_icon']
for _v,_pj in [('comet36','sword'),('lance36','drill'),('nova36','torpedo'),('halo36','chakram')]:
    A[_v+'_proj81n']=_w82('src/gear81art/proj/'+_pj+'_normal.png',128,trim=True);A[_v+'_proj81s']=_w82('src/gear81art/proj/'+_pj+'_super.png',128,trim=True)
print('art82 gear:',len(_A82))
BOSS82A={'meta':{}}
for _st,_id,_src in [(20,'u_anh','c76'),(60,'loi_duc','c76'),(80,'tinh_van','b75'),(100,'bang_gia','b75')]:
    _reg=json.load(open('src/boss82/'+_id+'/registration.json'))
    BOSS82A['meta'][_st]={'id':_id,'src':_src,'w':max(r['bbox'][2]-r['bbox'][0] for r in _reg)}
    for _ph in (1,2,3):BOSS82A[_id+'_p'+str(_ph)]=_w82('src/boss82/'+_id+'/phase'+str(_ph)+'.png',640,86)
    BOSS82A[_id+'_portrait']=_w82('src/boss82/'+_id+'/portrait.png',192,86)
# V86 · trang bị bộ 6–12 vẽ bằng tranh riêng (art86.gearSprite) thay cho tấm hình chung r11Gear
rep("function sprite(i,x,y,size,g=ctx){const im=r11Gear;","function sprite(i,x,y,size,g=ctx){if(window.Art86&&Art86.gearSprite(i,x,y,size,g))return;const im=r11Gear;")
# V86 · boss ải 120/140/160 (tranh GPT đợt V85)
for _st,_id in [(120,'dung_nham'),(140,'san_moi'),(160,'omega')]:
    _reg=json.load(open('src/boss82/'+_id+'/registration.json'))
    BOSS82A['meta'][_st]={'id':_id,'src':'b75','w':max(r['bbox'][2]-r['bbox'][0] for r in _reg),'wings':[_reg[0]['left_wing_center'],_reg[0]['right_wing_center']]}
    for _ph in (1,2,3):BOSS82A[_id+'_p'+str(_ph)]=_w82('src/boss82/'+_id+'/phase'+str(_ph)+'.png',640,86)
    BOSS82A[_id+'_portrait']=_w82('src/boss82/'+_id+'/portrait.png',192,86)
# V87 · boss ải 200 (tranh GPT đợt V87; registration dạng {phases:[...]}) — pha 3 = cánh gãy (w3)
# V87/V89 · boss 200 / 40 / 180 (tranh GPT; registration dạng {phases:[...]}) — pha 3 = cánh gãy (w3)
for _st,_id in [(200,'thaico'),(40,'thietgiap'),(180,'hoangde')]:
    _r=json.load(open('src/boss82/'+_id+'/registration.json'));_reg=_r['phases'] if isinstance(_r,dict) else _r
    BOSS82A['meta'][_st]={'id':_id,'src':'b75','w':max(r['bbox'][2]-r['bbox'][0] for r in _reg),'wings':[_reg[0]['left_wing_center'],_reg[0]['right_wing_center']],'w3':1}
    for _ph in (1,2,3):BOSS82A[_id+'_p'+str(_ph)]=_w82('src/boss82/'+_id+'/phase'+str(_ph)+'.png',640,86)
    BOSS82A[_id+'_portrait']=_w82('src/boss82/'+_id+'/portrait.png',192,86)
CH10A={'bg':_w82('src/ch10/bg_ch10_abyss.png',720,80),'frigate':_w82('src/ch10/enemy_ch10_phantom_frigate.png',192,86),'weaver':_w82('src/ch10/enemy_ch10_nebula_weaver.png',192,86)}
print('boss82:',len(BOSS82A)-1)
# V86 · tranh GPT đợt V85: trang bị bộ 6–12, skin #11–#13, đạn địch chương 6–9
ART86A={}
import glob as _gl
for _f in sorted(_gl.glob('src/art86/gear85/*/*.png')):
    _k=os.path.basename(_f)[:-4];ART86A[_k]=_w82(_f,256 if 'armor_shell' in _k else 128,86)
for _f in sorted(_gl.glob('src/art86/skin85/*.png')):
    ART86A[os.path.basename(_f)[:-4]]=_w82(_f,320,88)
for _f in sorted(_gl.glob('src/art86/ebullet85/*.png')+_gl.glob('src/art86/ebullet86/*.png')):
    ART86A[os.path.basename(_f)[:-4]]=_w82(_f,64,90)
# REVIEW115 · đạn địch nhuộm màu nóng theo chương (bảng ENEMY_BULLET_PALETTE_V115), tránh dải xanh ngọc của đạn ta
if os.environ.get('EB115','1')!='0':
    for _f in sorted(_gl.glob('src/ebullet115/*.png')):
        ART86A[os.path.basename(_f)[:-4]]=_w82(_f,64,90)
for _f in sorted(_gl.glob('src/art86/craft86/*/*.png')):
    ART86A[os.path.basename(_f)[:-4]]=_w82(_f,448,88)  # V129: tranh SSS mới nét hơn
print('art86:',len(ART86A))

# ---- V83 · chiến cơ #11–#13 (chỉ số 10–12): tranh thân 6 trạng thái + đạn chính pb_t1..t3 + lóe nòng ----
SHIP83A={};PB83={}
for _i,_d in [(10,'11'),(11,'12'),(12,'13')]:
    for _k,_f in [('q1','q1'),('q1s','q1_super'),('q5','q5'),('q5s','q5_super'),('e1','evo1'),('e2','evo2')]:
        SHIP83A['s%d_%s'%(_i,_k)]=_w82('src/craft81/'+_d+'/'+_f+'.png',500,86)
    for _t in (1,2,3):PB83['pb_%d_t%d'%(_i,_t)]=_w82('src/craft81/'+_d+'/pb_t%d.png'%_t,128,90)
    PB83['pb_%d_muzzle'%_i]=_w82('src/craft81/'+_d+'/pb_muzzle.png',128,90)
print('ship83:',len(SHIP83A))

# ---- V83 · boss cuối tuần Thực Thể Thôn Tinh (tranh GPT) ----
RAID83A={}
_rd='src/boss82/thuc_the_thon_tinh/'
for _k,_f,_m in [('p1','phase1',640),('p2','phase2',640),('p3','phase3',640),('cc','core_closed',640),('co','core_open',640),('cs','core_stunned',640),('shard','energy_shard',96),('portrait','portrait',192)]:RAID83A[_k]=_w82(_rd+_f+'.png',_m,86)
RAID83A['banner']=_w82(_rd+'event_banner.png',768,84)
_reg=json.load(open(_rd+'registration.json'))
RAID83A['meta']={'w':max(r['bbox'][2]-r['bbox'][0] for r in _reg[:3]),'core':_reg[0].get('core_center',[383.5,357.5])}
print('raid83:',len(RAID83A))
MAT69A={}
for _p in sorted(_g.glob('src/mat/*.png')):
    _im=_I.open(_p).convert('RGBA');_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=90);MAT69A[os.path.splitext(os.path.basename(_p))[0]]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
ST71A={}
for _p in sorted(_g.glob('src/da/*.png')):
    _im=_I.open(_p).convert('RGBA');_im.thumbnail((96,96),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=88);ST71A[os.path.splitext(os.path.basename(_p))[0]]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
U72A={}
_SZ={'ult_act_fortress':1536,'ult_act_world':1536,'ult_act_hunter':1536,'ult_act_web':1536,'ult_web_line':256,'ult_time_shard':160,'ult_block_flash':160,'ult_web_anchor':128,'ult_turret_1':128,'ult_turret_2':128,'ult_turret_3':128,'ult_turret':128,'ult_turret_shield':128,'ult_laser_tower':192,'ult_time_bomb':128,'ult_time_field':512,'ult_vulnerable':64,'ult_web_field':384}
for _p in sorted(_g.glob('src/vktt/ult_*.png')+_g.glob('src/vktt/chip_*.png')+_g.glob('src/vktt/mod_slot_*.png')):
    _k=os.path.splitext(os.path.basename(_p))[0];_im=_I.open(_p).convert('RGBA')
    _n=_SZ.get(_k,320 if (_k.endswith('_base') or _k.endswith('_legend') or _rh.search(r'_f[1-5]$',_k)) else 256 if _k=='chip_forge' else 128);_im.thumbnail((_n,_n),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=86);U72A[_k]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
print('tranh vktt:',len(U72A),sum(len(v) for v in U72A.values())//1024,'KB')
U15={}
_M15={'ui_panel':('panel',512),'ui_btn_gold':('gold',384),'ui_btn_blue':('blue',384),'hud_bomb':('bomb',256),'hud_missile':('missile',256),'ic_nhiem_vu':('ic-missions',128),'ic_vo_tan':('ic-endless',128),'ic_kho_bau':('ic-chest',128),'ui_frame_purple':('frame-purple',256),'ui_btn_gold_press':('gold-p',384),'ui_btn_blue_press':('blue-p',384),'ui_btn_red':('red',384),'ui_btn_gray':('gray',384),'ui_btn_small_gold':('sgold',192),'ui_btn_small_blue':('sblue',192),'ui_frame_white':('frame-white',256),'ui_frame_green':('frame-green',256),'ui_frame_blue':('frame-blue',256),'ui_frame_orange':('frame-orange',256),'ui_frame_gold':('frame-gold',256),'ui_frame_sss':('frame-sss',256),'ui_card':('card',256),'ui_tab_on':('tab-on',256),'ui_tab_off':('tab-off',256),'ui_panel_header':('phead',1024),'ui_bar_frame':('bar',768),'hud_hp_frame':('hpf',768),'hud_pause':('pause',256),'hud_expand':('expand',256),'hud_skill':('skill',256),'hud_ult_ring':('ring',256)}
for _k,(_n,_sz) in _M15.items():
    _im=_I.open('src/ui15/'+_k+'.png').convert('RGBA');_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=90,lossless=_k.startswith('ui_btn'));U15[_n]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
_im=_I.open('src/ui15/bg_lobby.png').convert('RGB');_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=82);U15BG='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
for _k,_n in (('bg_kho','bgkho'),('bg_map','bgmap')):
    _im=_I.open('src/ui15/'+_k+'.png').convert('RGB');_im=_im.resize((720,1280),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=80);U15[_n]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
ICON74={}
for _p in sorted(_gl2.glob('src/ui15/ic_*.png')+_gl2.glob('src/ui15/tab_*.png')+_gl2.glob('src/ui15/res_*.png')):
    _k=os.path.splitext(os.path.basename(_p))[0];_im=_I.open(_p).convert('RGBA');_im.thumbnail((96,96),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=88);ICON74[_k]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
for _k,_n in (('ui_tabbar','tabbar'),('ui_tab_glow','tabglow')):
    _im=_I.open('src/ui15/'+_k+'.png').convert('RGBA');_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=88);U15[_n]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
for _k,_n,_sz in (('sr_platform','sr-plat',640),('sr_name_plate','sr-plate',512),('sr_slot_main','sr-smain',192),('sr_slot_sup','sr-ssup',160),('sr_arrow','sr-arrow',96)):
    _im=_I.open('src/ui15/'+_k+'.png').convert('RGBA');_im.thumbnail((_sz,_sz),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=88);U15[_n]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
_im=_I.open('src/ui15/bg_vktt.png').convert('RGB').resize((720,1280),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=80);U15['sr-bg']='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
FX16ART={}
for _p in sorted(_gl2.glob('src/fx16art/fx16_*.png')):
    _k=os.path.splitext(os.path.basename(_p))[0][5:];_im=_I.open(_p).convert('RGBA');_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=82);FX16ART[_k]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
FX16ART.update(PB83)
print('fx16 art:',len(FX16ART),sum(len(v) for v in FX16ART.values())//1024,'KB')
print('icon74:',len(ICON74),sum(len(v) for v in ICON74.values())//1024,'KB')
U15CSS=':root{'+';'.join('--u15-'+k+':url('+v+')' for k,v in U15.items())+'}'
print('ui15:',len(U15),round((sum(len(v) for v in U15.values())+len(U15BG))/1024),'KB')
print('icon da:',len(ST71A))
print('icon nguyen lieu:',len(MAT69A))
TRA={}
for _p in sorted(_g.glob('src/trade/*.png')):
    _k=os.path.splitext(os.path.basename(_p))[0];_im=_I.open(_p).convert('RGBA')
    if _k.startswith('skin_dan_'):_im=_im.resize((256,128),_I.LANCZOS)  # V153: dải đạn 4 ô 64×128 → 4 ô 64×... giữ tỉ lệ
    elif _k.startswith('skin_hieu_ung_'):_im=_im.resize((768,192),_I.LANCZOS)  # V153: dải hiệu ứng khung 4 ô 192
    elif _k.startswith('skin_') or _k=='pilot_frame':_im=_im.resize((128,128),_I.LANCZOS)
    elif _k=='merchant':_im=_im.resize((256,256),_I.LANCZOS)
    _bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=88);TRA[_k]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
print('tranh giao dich:',len(TRA))
parts=['<style id="ccht-lobby-css">'+css+'</style>','<style id="ccht-lobby-skin-v2">'+open('src/lobby_skin_v2.css',encoding='utf-8').read()+'</style>','<style id="ccht-lobby-v46">'+open('src/lobby46.css',encoding='utf-8').read()+'</style>','<style id="g44-css">'+open('src/g44.css').read()+'</style>',
 '<script id="gear44-assets">const GEAR44_ASSETS='+json.dumps(A,separators=(',',':'))+';</script>',
 '<script id="armor69">'+open('src/armor69.js',encoding='utf-8').read()+'</script>','<script id="gear-fx-v3">'+fx+'</script>',
 '<script id="sss-e">const SSS_E='+json.dumps(json.load(open('src/hop_the_e.json',encoding='utf-8')),ensure_ascii=False,separators=(',',':')).replace('</','<\\/')+';</script>'+'<script id="gear44">'+open('src/gear45.js',encoding='utf-8').read().replace('runtime:()=>Object.fromEntries','fxState:k=>R[k]?R[k].st:null,runtime:()=>Object.fromEntries',1).replace('const st=GEAR_FX.create(id,{assets,glows,','const st=GEAR_FX.create(id,{assets:sssArt(k,id,(typeof Evo53!=="undefined"?Evo53.gearAssets(k,assets):assets)),glows,',1).replace("if(ea<1||eb<1)return {ok:false,why:'Cần cả hai món ≥ +1'};return {ok:true,why:''};}","if(ea<1||eb<1)return {ok:false,why:'Cần cả hai món ≥ +1'};const F=typeof FEE66!=='undefined'?FEE66:{c:0,e:0};try{if(Progress.balance()<F.c)return {ok:false,why:'Cần '+F.c.toLocaleString('vi-VN')+' hợp kim'};if(Workshop.expBalance()<F.e)return {ok:false,why:'Cần '+F.e+' đá nâng cấp'};}catch{}return {ok:true,why:''};}",1).replace("const c=canFuse(id);if(!c.ok)return false;S.owned[id]={at:Date.now()};","const c=canFuse(id);if(!c.ok)return false;{const F=typeof FEE66!=='undefined'?FEE66:{c:0,e:0};if(F.c&&!Progress.spendCredits(F.c))return false;if(F.e&&!Workshop.spendExp(F.e)){Progress.grantCredits(F.c);return false;}}S.owned[id]={at:Date.now()};",1).replace("${c.ok?'HỢP THỂ':c.why}","${c.ok?'HỢP THỂ'+(typeof FEE66!=='undefined'&&FEE66.c?' · '+FEE66.c.toLocaleString('vi-VN')+' ◈ · '+FEE66.e+' ⬢':''):c.why}",1).replace("const dmgMult=kind=>{const d=activeDef(kind);return d&&d.tier==='sss'?1.35*(1+.03*sssEnh(d.id)):1;};","const dmgMult=kind=>{const d=activeDef(kind);return (d&&d.tier==='sss'?1.35*(1+.03*sssEnh(d.id)):1)*(typeof Evo53!=='undefined'&&Evo53.gearBonus?Evo53.gearBonus(kind):1)*(d&&d.tier==='sss'&&typeof OC75!=='undefined'?OC75.mult(d.id):1);};",1)+'</script>'+'<script id="sss-e3">'+open('src/sss_e3.js',encoding='utf-8').read()+'</script>',
 '<script id="ccht-lobby-v43">'+open('src/ccht_lobby46.js',encoding='utf-8').read()+'</script>',
 '<style id="onboard-v45-css">'+open('src/onboard45.css',encoding='utf-8').read()+'</style>',
 '<script id="onboard-v45">'+open('src/onboard45.js',encoding='utf-8').read()+'</script>',  # B-V44-05
 '<style id="hudbtn-v50">'+open('src/hudbtn50.css',encoding='utf-8').read()+'</style>',  # DX-V45-01
 '<script id="hudbtn-v45-js">'+open('src/hudbtn45.js',encoding='utf-8').read()+'</script>',
 '<style id="play-v47-css">#bossbar,#bossbar.bb2{display:none!important}</style>',
 '<script id="play-v47">'+open('src/play47.js',encoding='utf-8').read()+'</script>',
 '<script id="balance-v48">'+open('src/balance48.js',encoding='utf-8').read()+'</script>','<script id="pickup51-assets">const PICKUP51_ASSETS='+json.dumps(PK,separators=(',',':'))+';</script><script id="pickup-v51">'+open('src/pickup51.js',encoding='utf-8').read()+'</script>','<script id="drift-v51">'+open('src/drift51.js',encoding='utf-8').read()+'</script>','<script id="evo53-art">const EVO53_ART='+json.dumps(EVO)+';</script>','<style id="evo-v55-css">'+open('src/evo53.css',encoding='utf-8').read()+'</style>','<script id="evo-v55">'+open('src/evo53.js',encoding='utf-8').read()+'</script>','<style id="play-v63-css">'+open('src/play63.css',encoding='utf-8').read()+'</style>','<script id="play-v63">'+open('src/play63.js',encoding='utf-8').read()+'</script>','<style id="v66-css">'+open('src/v66.css',encoding='utf-8').read()+'</style>','<script id="v66">'+open('src/v66.js',encoding='utf-8').read()+'</script>','<script id="ch9-assets">const CH9_ASSETS='+json.dumps(CH9A)+';</script>','<style id="v67-css">'+open('src/v67.css',encoding='utf-8').read()+'</style>','<script id="v67">'+open('src/v67.js',encoding='utf-8').read()+'</script>','<script id="pilot-assets">const PILOT_ASSETS='+json.dumps(PILA)+';</script>','<script id="pilot67">'+open('src/pilot67.js',encoding='utf-8').read()+'</script>','<script id="trade-art">const TRADE_ASSETS='+json.dumps(TRA)+';</script><script id="trade67">'+open('src/trade67.js',encoding='utf-8').read()+'</script>','<style id="hud68-css">'+open('src/hud68.css',encoding='utf-8').read()+'</style>','<script id="hud68">'+open('src/hud68.js',encoding='utf-8').read()+'</script>','<style id="lobby68-css">'+open('src/lobby68.css',encoding='utf-8').read()+'</style>','<script id="lobby68">'+open('src/lobby68.js',encoding='utf-8').read()+'</script>','<style id="adv69-css">'+open('src/adv69.css',encoding='utf-8').read()+open('src/adv70.css',encoding='utf-8').read()+open('src/stone71.css',encoding='utf-8').read()+open('src/ult72.css',encoding='utf-8').read()+'</style><style id="skin15">'+U15CSS+open('src/skin15.css',encoding='utf-8').read()+'</style><script>const SKIN15_BG='+json.dumps(U15BG)+';setInterval(()=>{try{for(const [k,v] of [["missions","ic-missions"],["endless","ic-endless"],["chest","ic-chest"]]){const e=document.querySelector(\'#hgr41 .h1-ribbon [data-go="\'+k+\'"]\');if(e&&!e.dataset.u15){e.dataset.u15=1;e.style.setProperty("background","var(--u15-"+v+") "+(k==="chest"?"8px center/auto 66%":"center 3px/auto 58%")+" no-repeat,linear-gradient(#1c4a70e6,#0a2038e6)","important");}}}catch(_){}},700);</script>','<script id="mat69-art">const MAT69_ART='+json.dumps(MAT69A)+';</script><script id="adv69">'+open('src/adv70.js',encoding='utf-8').read()+'</script>'+'<script id="stone71-art">const STONE71_ART='+json.dumps(ST71A)+';</script><script id="stone71">'+open('src/stone71.js',encoding='utf-8').read()+'</script><script id="ult72-art">const ULT72_ART='+json.dumps(U72A)+';</script><script id="ult72">'+open('src/ult72.js',encoding='utf-8').read()+'</script><script id="chip72">'+open('src/chip72.js',encoding='utf-8').read()+'</script>','<style id="lobby74-css">'+open('src/lobby74.css',encoding='utf-8').read()+'</style><script id="lobby74">'+open('src/lobby74.js',encoding='utf-8').read()+'</script>','<style id="econ74-css">'+open('src/econ74.css',encoding='utf-8').read()+'</style><script id="econ74">'+open('src/econ74.js',encoding='utf-8').read()+'</script>','<style id="v75-css">'+open('src/v75.css',encoding='utf-8').read()+'</style><script id="v75-js">'+open('src/v75.js',encoding='utf-8').read()+'</script>','<script id="v77spec-js">'+open('src/v77spec.js',encoding='utf-8').read()+'</script>','<script id="rv75-js">'+open('src/rv75.js',encoding='utf-8').read()+'</script><script id="b75-js">'+open('src/b75.js',encoding='utf-8').read()+'</script>','<script id="ux75-js">'+open('src/ux75.js',encoding='utf-8').read()+'</script>','<script id="fair76-js">'+open('src/fair76.js',encoding='utf-8').read()+'</script>','<script id="v77-js">'+open('src/v77.js',encoding='utf-8').read()+'</script>','<script id="fest103-art">window.FEST103_ART='+json.dumps({os.path.basename(k)[:-5]:'data:image/webp;base64,'+base64.b64encode(open(k,'rb').read()).decode() for k in sorted(glob.glob('src/fest103/*.webp'))})+';</script><script id="fest78-js">'+open('src/fest78.js',encoding='utf-8').read()+'</script>','<script id="f78spec-js">'+open('src/f78spec.js',encoding='utf-8').read()+'</script><script id="bk78-js">'+open('src/bk78.js',encoding='utf-8').read()+'</script>','<script id="fs78-js">'+open('src/fs78.js',encoding='utf-8').read()+'</script>','<script id="cloud78-js">'+open('src/cloud78.js',encoding='utf-8').read()+'</script>','<script id="boss78-art">const BOSS78_ART='+json.dumps(BOSS78A)+';</script><script id="boss78-js">'+open('src/boss78.js',encoding='utf-8').read()+'</script>','<script id="bal787-js">'+open('src/bal787.js',encoding='utf-8').read()+'</script>','<script id="ui78-js">'+open('src/ui78.js',encoding='utf-8').read()+'</script>','<script id="map78-js">'+open('src/map78.js',encoding='utf-8').read()+'</script>','<script id="shield78-js">'+open('src/shield78.js',encoding='utf-8').read()+'</script>','<script id="shake78-js">'+open('src/shake78.js',encoding='utf-8').read()+'</script>','<script id="end78-js">'+open('src/end78.js',encoding='utf-8').read()+'</script>','<script id="row79-js">'+open('src/row79.js',encoding='utf-8').read()+'</script>','<script id="ach79-js">'+open('src/ach79.js',encoding='utf-8').read()+'</script>','<script id="nav79-js">'+open('src/nav79.js',encoding='utf-8').read()+'</script>','<script id="dg79-js">'+open('src/dg79.js',encoding='utf-8').read()+'</script>','<script id="ship79-js">'+open('src/ship79.js',encoding='utf-8').read()+'</script>','<script id="story80-js">'+open('src/story80.js',encoding='utf-8').read()+'</script>','<script id="boss82-art">const BOSS82_ART='+json.dumps(BOSS82A)+';</script><script id="boss82-js">'+open('src/boss82.js',encoding='utf-8').read()+'</script>','<script id="ship83-art">const SHIP83_ART='+json.dumps(SHIP83A)+';</script><script id="ship83-js">'+open('src/ship83.js',encoding='utf-8').read()+'</script>','<script id="ss90-js">'+open('src/ss90.js',encoding='utf-8').read()+'</script><script id="bal86-js">'+open('src/bal86.js',encoding='utf-8').read()+'</script><script id="art86-art">const ART86_ASSETS='+json.dumps(ART86A)+';</script><script id="art86-js">'+open('src/art86.js',encoding='utf-8').read()+'</script><script id="sss87-js">'+open('src/sss87.js',encoding='utf-8').read()+'</script><script id="wing87-js">'+open('src/wing87.js',encoding='utf-8').read()+'</script><script id="ch10-art">const CH10_ASSETS='+json.dumps(CH10A)+';</script><script id="ch10-js">'+open('src/ch10.js',encoding='utf-8').read()+'</script><script id="fps88-js">'+open('src/fps88.js',encoding='utf-8').read()+'</script><script id="perf88-js">'+open('src/perf88.js',encoding='utf-8').read()+'</script><script id="msg88-js">'+open('src/msg88.js',encoding='utf-8').read()+'</script><script id="ux90-js">'+open('src/ux90.js',encoding='utf-8').read()+'</script><script id="tut90-js">'+open('src/tut90.js',encoding='utf-8').read()+'</script><script id="v91-js">'+open('src/v91.js',encoding='utf-8').read()+'</script><script id="v92-js">'+open('src/v92.js',encoding='utf-8').read()+'</script><script id="v93-js">'+open('src/v93.js',encoding='utf-8').read()+'</script><script id="v94-js">'+open('src/v94.js',encoding='utf-8').read()+'</script><script id="fr93-art">const FRAME93_ART='+json.dumps({k:'data:image/webp;base64,'+base64.b64encode(open('src/frame93/'+k+'.webp','rb').read()).decode() for k in ['gold','platinum','diamond']})+';</script><script id="fr93-js">'+open('src/fr93.js',encoding='utf-8').read()+'</script><script id="v95-js">'+open('src/v95.js',encoding='utf-8').read()+'</script><script id="music96-js">'+open('src/music96.js',encoding='utf-8').read()+'</script><script id="v96-js">'+open('src/v96.js',encoding='utf-8').read()+'</script><script id="v98-js">'+open('src/v98.js',encoding='utf-8').read()+'</script><script id="v100-js">'+open('src/v100.js',encoding='utf-8').read()+'</script><script id="v102-js">'+open('src/v102.js',encoding='utf-8').read()+'</script><script id="v105-js">'+open('src/v105.js',encoding='utf-8').read()+'</script><script id="v111-js">'+open('src/v111.js',encoding='utf-8').read()+'</script><script id="v112-js">'+open('src/v112.js',encoding='utf-8').read()+'</script><script id="v113-art">window.HUD113_ART='+json.dumps(HUD113)+';</script><script id="v113-js">'+open('src/v113.js',encoding='utf-8').read()+'</script><script id="v114-js">'+open('src/v114.js',encoding='utf-8').read()+'</script><script id="v115-js">'+open('src/v115.js',encoding='utf-8').read()+'</script><script id="v116-js">'+open('src/v116.js',encoding='utf-8').read()+'</script><script id="ship118-art">const SHIP118='+json.dumps(SHIP118)+';</script><script id="bg117-art">const BG117_ART='+json.dumps({'ch8':_w82('src/ch8/bg_ch8.png',1560,80)})+';</script><script id="v117-js">'+open('src/v117.js',encoding='utf-8').read()+'</script><script id="v118-js">'+open('src/v118.js',encoding='utf-8').read()+'</script><script id="hit120-art">const HIT120_ART='+json.dumps({os.path.splitext(os.path.basename(_p))[0]:_w82(_p,512 if _p.endswith('_cot.png') else 128,86) for _p in sorted(glob.glob('src/hit120/hit_*.png'))})+';</script><script id="v120-js">'+open('src/v120.js',encoding='utf-8').read()+'</script><script id="sk121-art">const SK121_ART='+json.dumps({os.path.splitext(os.path.basename(_p))[0]:_w82(_p,512,86) for _p in sorted(glob.glob('src/sk121/*.png'))})+';</script><script id="v121-js">'+open('src/v121.js',encoding='utf-8').read()+'</script><script id="v122-js">'+open('src/v122.js',encoding='utf-8').read()+'</script><script id="canh132-art">const CANH132_ART='+(json.dumps({os.path.splitext(os.path.basename(_p))[0]:_w82(_p,768,86) for _p in sorted(glob.glob('src/canh132/canh_hop*.png'))}) if os.environ.get('WING_CU')=='1' else '{}')+';</script><script id="v132-js">'+open('src/v132.js',encoding='utf-8').read()+'</script><script id="admin136">'+open('src/admin136.js',encoding='utf-8').read()+'</script><script id="tb133">window.TB133='+json.dumps(TB133)+';</script><script id="v138-js">'+open('src/v138.js',encoding='utf-8').read()+'</script><script id="noi-tai144">'+open('src/noi_tai144.js',encoding='utf-8').read()+'</script><script id="kn147">'+open('src/ky_nang_1b.js',encoding='utf-8').read()+'</script><script id="nt148">'+open('src/noi_tai147.js',encoding='utf-8').read()+'</script><script id="raid83-art">const RAID83_ART='+json.dumps(RAID83A)+';</script><script id="event83-js">'+open('src/event83.js',encoding='utf-8').read()+'</script>','<style id="v84-css">'+open('src/v84.css',encoding='utf-8').read()+'</style><script id="rule84-js">'+open('src/rule84.js',encoding='utf-8').read()+'</script><script id="title84-js">'+open('src/title84.js',encoding='utf-8').read()+'</script><script id="drop85-js">'+open('src/drop85.js',encoding='utf-8').read()+'</script><script id="fix85-js">'+open('src/fix85.js',encoding='utf-8').read()+'</script>','<script id="skill81-js">'+open('src/skill81.js',encoding='utf-8').read()+'</script>','<script id="art82-js">'+open('src/art82.js',encoding='utf-8').read()+'</script>','<script id="evo82-js">'+open('src/evo82.js',encoding='utf-8').read()+'</script>','<script id="endless81-js">'+open('src/endless81.js',encoding='utf-8').read()+'</script>','<script id="gear81-js">'+open('src/gear81.js',encoding='utf-8').read()+'</script>','<script id="set79-js">'+open('src/set79.js',encoding='utf-8').read()+'</script>','<script id="dl78-js">'+open('src/dl78.js',encoding='utf-8').read()+'</script>','<script id="codes78-js">'+open('src/codes78.js',encoding='utf-8').read()+'</script>','<script id="oc75-js">'+open('src/oc75.js',encoding='utf-8').read()+'</script>','<script id="q77-js">'+open('src/q77.js',encoding='utf-8').read()+'</script>','<script id="s77-js">'+open('src/s77.js',encoding='utf-8').read()+'</script>','<script id="c76-js">'+open('src/c76.js',encoding='utf-8').read()+'</script>','<script id="codex77-js">'+open('src/codex77.js',encoding='utf-8').read()+'</script>','<script id="o78-js">'+open('src/o78.js',encoding='utf-8').read()+'</script>','<style id="chest74-css">'+open('src/chest74.css',encoding='utf-8').read()+'</style><script id="chest74">'+open('src/chest74.js',encoding='utf-8').read()+'</script>','<script id="icon74">const ICON74='+json.dumps(ICON74)+';</script><style id="nav74-css">'+open('src/nav74.css',encoding='utf-8').read()+'</style><script id="nav74-js">'+open('src/nav74.js',encoding='utf-8').read()+'</script>','<style id="guide74-css">'+open('src/guide74.css',encoding='utf-8').read()+'</style><script id="guide74">'+open('src/guide74.js',encoding='utf-8').read()+'</script>',G36JS+'<script id="evo15-js">'+open('src/evo15.js',encoding='utf-8').read()+'</script><script id="bul78-art">const BUL78_ART='+json.dumps(BUL78A)+';</script><script id="fx16-art">const FX16_ART='+json.dumps(FX16ART)+';</script><script id="fx16">'+open('src/fx16.js',encoding='utf-8').read()+'</script>','<style id="skin69-css">'+open('src/skin69.css',encoding='utf-8').read()+'</style>','<script id="tier69-art">const TIER69_ART='+json.dumps(TIER69)+';</script><script id="skin69">'+open('src/skin69.js',encoding='utf-8').read()+'</script>']  # V48  # B-V45-07
rep("ctx.fillText('⚠ CẢNH BÁO · '+(level%10===0?'MAJOR':'MINI')+' BOSS ⚠',W/2,y-4)","ctx.fillText('⚠ CẢNH BÁO NGUY HIỂM ⚠',W/2,y-4)")
rep("ctx.fillText('BOSS ĐANG TIẾN VÀO VÙNG CHIẾN · CHUẨN BỊ NÉ ĐẠN',W/2,y+18)","ctx.fillText('LV.'+level+' · '+(level%10===0?'BOSS LỚN':'BOSS NHỎ')+' ĐANG TIẾN VÀO · CHUẨN BỊ NÉ ĐẠN',W/2,y+18)")
# V68-A2 · đạn rực màu (src/vivid68_pre.js)
rep('<script id="shots-v2">','<script id="vivid68-pre">'+open('src/vivid68_pre.js',encoding='utf-8').read()+'</script><script id="shots-v2">')
for a,b in [("{kind:'plume',c:['#fff6d0','#ffb23a','#ff4a1f']}","{kind:'plume',c:['#ffe08a','#ff9a1f','#ff3a12']}"),
 ("{kind:'beam',c:['#ffffff','#ffe36b','#ff9d1f']}","{kind:'beam',c:['#fff3b0','#ffcf2e','#ff8a0f']}"),
 ("{kind:'shard',c:['#e9ffff','#8ceaff','#3a7bff']}","{kind:'shard',c:['#c4f6ff','#3fd0ff','#2a5cff']}"),
 ("{kind:'needle',c:['#e9ffff','#62eeff','#ff3c5a']}","{kind:'needle',c:['#c8fbff','#22e4ff','#ff2a4e']}"),
 ("{kind:'shard',c:['#ffe6ff','#ed66ff','#8f45f3']}","{kind:'shard',c:['#ffc4ff','#e040ff','#7a2cf0']}"),
 ("{kind:'beam',c:['#ffffff','#49cfff','#41edb1']}","{kind:'beam',c:['#d8f6ff','#1fb8ff','#22e0a0']}"),
 ("{kind:'crescent',c:['#fffbe0','#ffdd69','#ff6a3a']}","{kind:'crescent',c:['#ffe680','#ffb52e','#ff4f1a']}"),
 ("{kind:'plume',c:['#fff0c0','#ff8167','#c0124a']}","{kind:'plume',c:['#ffd0a0','#ff5a3c','#c0103f']}"),
 ("{kind:'petal',c:['#ffe6ff','#ef8bff','#8f45f3'],alt:['#e9ffff','#66efff','#2f3ad0']}","{kind:'petal',c:['#ffc6ff','#e866ff','#7a2cf0'],alt:['#c4f8ff','#33e2ff','#2633d0']}"),
 ("{kind:'orb',c:['#f2ecff','#bd9bff','#3cf2d0']}","{kind:'orb',c:['#dccfff','#9a6bff','#1fe0c0']}")]:
  rep(a,b)
rep("const SPR=DEF.map(d=>({main:MAKE[d.kind](d.c),alt:d.alt?MAKE[d.kind](d.alt):null,beam:d.kind==='beam'?beamTex(d.c[1]):null,star:star(d.c[1])}));","const SPR=DEF.map(d=>({main:MAKE[d.kind](d.c),alt:d.alt?MAKE[d.kind](d.alt):null,beam:d.kind==='beam'?beamTex(d.c[1]):null,star:star(d.c[1])}));try{Vivid68Pre(SPR);}catch(e){}")
rep("g.rotate(a+(D.kind==='crescent'?Math.sin((s.age||0)*8)*.12:0));g.globalCompositeOperation='lighter';\n  g.globalAlpha*=l===4?(D.kind==='plume'||D.kind==='petal'?.58:.75):1;","g.rotate(a+(D.kind==='crescent'?Math.sin((s.age||0)*8)*.12:0));g.globalCompositeOperation=VIVID68.on?'source-over':'lighter';\n  g.globalAlpha*=l===4?(VIVID68.on?(D.kind==='plume'||D.kind==='petal'?.82:.92):(D.kind==='plume'||D.kind==='petal'?.58:.75)):1;")
rep("speed=Math.hypot(s.vx||0,s.vy||0),stretch=1+Math.min(.55,speed/2200),size=(D.kind==='orb'?.3:D.kind==='crescent'?.5:.34)*(.75+.5*Math.min(scale,l===4?1.5:9))","speed=Math.hypot(s.vx||0,s.vy||0),stretch=1+Math.min(.55,speed/2200),size=(D.kind==='orb'?.3:D.kind==='crescent'?.5:.34)*(.75+.5*Math.min(scale,l===4?1.5:9))*(VIVID68.on?VIVID68.size:1)")
rep("g.save();g.globalCompositeOperation='lighter';g.globalAlpha=fade*(light()?.5:.75);","g.save();g.globalCompositeOperation=VIVID68.on?'source-over':'lighter';g.globalAlpha=fade*(light()?.5:.75);")
rep("const hot=mix(col,'#ffffff',.6);","const hot=mix(col,'#ffffff',VIVID68.on?.28:.6);")
rep("function drawShots(ctx,k){ctx.save();ctx.globalCompositeOperation='lighter';","function drawShots(ctx,k){ctx.save();ctx.globalCompositeOperation=VIVID68.on?'source-over':'lighter';")
rep("gr.addColorStop(0,'#ffffff');gr.addColorStop(.3,hi);gr.addColorStop(.7,mid);gr.addColorStop(1,lo+'00');","gr.addColorStop(0,'#ffffff');gr.addColorStop(.1,hi);gr.addColorStop(.34,mid);gr.addColorStop(.78,lo);gr.addColorStop(1,lo+'00');")
# V68 sửa lỗi: giữ/nhấn NÂNG CẤP trang bị xong bảng chi tiết bị đóng (render() gọi closeSheet) → mở lại đúng món
rep("const stop=()=>{if(holdT){clearTimeout(holdT);holdT=null;render();}};","const stop=()=>{if(holdT){clearTimeout(holdT);holdT=null;const keep68=view==='gear'&&sheet&&sheet.dataset.item;render();if(keep68)gearSheet(keep68);}};")
# V70 · HỆ PHẨM CHẤT 4 KHUNG MÀU (src/adv70.js): móc lõi Workshop / Progress
rep("const cap=i=>45+15*(typeof i==='object'?enhancement(i):0),","const cap=i=>{if(typeof V70CAP==='function'&&i&&typeof i==='object'){const c=V70CAP(i);if(c!=null)return c;}return 45+15*(typeof i==='object'?enhancement(i):0);},")
rep("const craftProgress=i=>({rank:quality(state.crafts[i]),grade:quality(state.crafts[i]),enhance:state.craftEnhancements[i]||0,level:state.craftLevels[i]||1});","const craftProgress=i=>({rank:quality(state.crafts[i]),grade:quality(state.crafts[i]),enhance:state.craftEnhancements[i]||0,level:state.craftLevels[i]||1,idx:i});")
rep("const levelFactor=i=>(1+(i.level-1)*.006)*(1+enhancement(i)*.08),","const levelFactor=i=>{if(typeof V70LF==='function'){const f=V70LF(i);if(f!=null)return f;}return (1+(i.level-1)*.006)*(1+enhancement(i)*.08);},")
rep("function promoteCraft(i){if(!Number.isInteger(i)||i<0||i>9||!Campaign36.ownsCraft(i))return false;","function promoteCraft(i){if(typeof V70!=='undefined'){V70.open('craft',i);return false;}if(!Number.isInteger(i)||i<0||i>9||!Campaign36.ownsCraft(i))return false;")
rep(" function setLocked(v){locked=v;render();}\n return {spendExp:"," function setLocked(v){locked=v;render();}\n function set70(i,p){if(!Number.isInteger(i)||i<0||i>9||!p)return false;if(Number.isInteger(p.enhance))state.craftEnhancements[i]=Math.max(0,Math.min(5,p.enhance));if(Number.isInteger(p.level))state.craftLevels[i]=Math.max(1,p.level);refresh();return true;}\n function frag70(kind,k,d){const o=kind==='craft'?state.craftFragments:state.gearFragments;if(kind==='craft'&&!(Number.isInteger(k)&&k>=0&&k<10))return false;const v=(o[k]||0)+(d|0);if(v<0)return false;o[k]=v;save();return true;}\n function exp70(d){d=d|0;if(state.exp+d<0)return false;state.exp+=d;save();render();return true;}\n return {set70,frag70,exp70,spendExp:")
# Progress: chặn ghép/cường hóa cũ, mở API cho V70
rep("function promote(itemId){const i=get(itemId);","function promote(itemId){if(typeof V70!=='undefined'){V70.open('gear',itemId);return false;}const i=get(itemId);")
rep("function preview(ids=picks){if(ids.length!==2||ids[0]===ids[1])return null;","function preview(ids=picks){if(typeof V70!=='undefined')return null;if(ids.length!==2||ids[0]===ids[1])return null;")
rep("function quickMerge(options={}){if(locked)return false;","function quickMerge(options={}){if(locked)return false;if(typeof V70!=='undefined'){message('Ghép trang bị đã thay bằng Phân giải (V70).');return false;}")
rep("return {balance:()=>state.credits,spendRevive,","return {v70:{items:()=>state.items,get:id=>get(id),set:(id,p)=>{const i=get(id);if(!i||!p)return false;if(Number.isInteger(p.enhance))i.enhance=Math.max(0,Math.min(5,p.enhance));if(Number.isInteger(p.level))i.level=Math.max(1,p.level);save();return true;},remove:id=>{const i=get(id);if(!i||Object.values(state.equipped).includes(id))return false;state.items=state.items.filter(x=>x!==i);picks=picks.filter(x=>x!==id);save();return true;},equipped:()=>state.equipped,cleared:()=>state.cleared},balance:()=>state.credits,spendRevive,")
# hệ số cấp theo thang 100 (×119/99) + hệ số nấc phân số cho trang bị / chiến cơ thường
rep("baseRank=Math.min(4,Math.floor((i.enhance||0)/2)),r=Math.min(4,baseRank+Workshop.index(i.grade)*2),lv=i.level-1,e=i.enhance||0,","baseRank=Math.min(4,Math.floor((i.enhance||0)/2)),r=Math.min(4,baseRank+Workshop.index(i.grade)*2),lv=(i.level-1)*(typeof V70K==='function'?V70K(i):1),e=typeof V70EF==='function'?V70EF(i):(i.enhance||0),")
rep("function craftProfile(index){const c=crafts[index],v=Workshop.craftProgress(index),lv=v.level-1,f=Campaign36.factor(v.grade);return {...c,...v,hp:Math.round((c.hp+lv*.04+v.enhance*.2)*f*100)/100,shield:Math.round((c.shield+lv*.015+v.enhance*.15)*f*100)/100,","function craftProfile(index){const c=crafts[index],v=Workshop.craftProgress(index),lv=(v.level-1)*(typeof V70K==='function'?V70K(v):1),ef=typeof V70EF==='function'?V70EF(v):v.enhance,f=Campaign36.factor(v.grade);return {...c,...v,hp:Math.round((c.hp+lv*.04+ef*.2)*f*100)/100,shield:Math.round((c.shield+lv*.015+ef*.15)*f*100)/100,")
rep("armor=(g.maxShield+(4+(r?2:0)+(v.level-1)*.015+(v.enhance||0)*.3)*Campaign36.factor(v.grade)-4)*.9;","armor=(g.maxShield+(4+(r?2:0)+(v.level-1)*(typeof V70K==='function'?V70K(v):1)*.015+(typeof V70EF==='function'?V70EF(v):(v.enhance||0))*.3)*Campaign36.factor(v.grade)-4)*.9;")
rep("Bonus(){const v=activeRobot||Workshop.craftProgress(selected);return (4+(activeRobot?2:0)+(v.level-1)*.015+(v.enhance||0)*.3)*Campaign36.factor(v.grade)-4;}","Bonus(){const v=activeRobot||Workshop.craftProgress(selected);return (4+(activeRobot?2:0)+(v.level-1)*(typeof V70K==='function'?V70K(v):1)*.015+(typeof V70EF==='function'?V70EF(v):(v.enhance||0))*.3)*Campaign36.factor(v.grade)-4;}")
# nhãn khung màu thay "+n"
V70T="(typeof V70T==='function'?V70T(%s):'+'+(%s.enhance||0))"
rep("function title(i){return (catalogFor(i)?.name||kindName(i.kind))+(i.grade?' · BẬC '+i.grade:'')+' +'+(i.enhance||0);}","function title(i){return (catalogFor(i)?.name||kindName(i.kind))+(i.grade?' · BẬC '+i.grade:'')+' · '+"+V70T%('i','i')+";}")
rep("`Level ${v.level}/${cap} · Cường hóa +${v.enhance} · ${weapons[c.weapon].name}`","`Level ${v.level}/${cap} · Khung ${"+V70T%('v','v')+"} · ${weapons[c.weapon].name}`")
rep("${it.enhance?`<span class=\"en\">+${it.enhance}</span>`:''}","${(typeof V70!=='undefined'?V70.nOf(it)>0:it.enhance)?`<span class=\"en fr70\" style=\"--fc:${typeof V70C==='function'?V70C(it):'#fff'}\">${"+V70T%('it','it')+"}</span>`:''}")
rep("<small style=\"color:${v.enhance>=1?'#46ffb2':'#9fc0da'}\">+${v.enhance}</small>","<small style=\"color:${v.enhance>=1?'#46ffb2':'#9fc0da'}\">${"+V70T%("{...v,idx:i}","v")+"}</small>")
rep("'Level '+v.level+' · Cường hóa +'+v.enhance+'. Đạt <b>+1</b> để làm thành phần hợp thể SSS.'","'Level '+v.level+' · Khung '+"+V70T%("{...v,idx:i}","v")+"+'. Đạt <b>Lam +1</b> để làm thành phần hợp thể SSS.'")
rep("${componentReady(i)?'Sẵn sàng':'Cần +1'}","${componentReady(i)?'Sẵn sàng':'Cần Lam +1'}")
rep("name=crafts[c.i].name+' +'+v.enhance;lv='Lv. '+v.level+'/'+Workshop.cap(v);enh='+'+v.enhance;","name=crafts[c.i].name+' · '+"+V70T%('v','v')+";lv='Lv. '+v.level+'/'+Workshop.cap(v);enh="+V70T%('v','v')+";")
rep("set('h1-e'+n,g6?'+'+Gear44.sssEnh(g6):it?'+'+(it.enhance||0):'');","set('h1-e'+n,g6?'+'+Gear44.sssEnh(g6):it?"+V70T%('it','it')+":'');")
rep("' · LV '+c.level+'/'+Workshop.cap(c)+' · +'+(c.enhance||0)+' · '","' · LV '+c.level+'/'+Workshop.cap(c)+' · '+"+V70T%('c','c')+"+' · '")
i=h.rindex('</body>');h=h[:i]+''.join(parts)+h[i:]
# V69-B: ngoại hình tiến hóa theo SKIN; hiệu ứng có sức mạnh theo bậc đột phá thật
rep("const craftE=id=>{try{return (Workshop.craftProgress(id).enhance)||0;}catch{return 0;}};","const craftE=id=>{try{if(typeof Skin69!=='undefined')return Skin69.evoE(id);return (Workshop.craftProgress(id).enhance)||0;}catch{return 0;}};")
rep("function perks(dt){const c=T.craft.t;","function perks(dt){const c=(typeof Skin69!=='undefined'?Skin69.realT():T.craft.t);")
rep("const a=T.armor;if(a&&a.t>=1&&mode==='play'){","const a=(typeof Armor69!=='undefined')?null:T.armor;if(a&&a.t>=1&&mode==='play'){")
rep("  if(shield>0||bulletShieldTime>0){\n   const d=bulletShieldTime>0?102:76;","  if(typeof Armor69==='undefined'&&(shield>0||bulletShieldTime>0)){\n   const d=bulletShieldTime>0?102:76;")
rep("const e=craftE(id),t=tierN(e),src=stageOf(e)||base;","const e=craftE(id),t=tierN(e),src=stageOf(typeof Skin69!=='undefined'?Skin69.realEOf(id):e)||base;")

rep("--rank-color:${Workshop.color(i.grade)}\"><b>${i.grade?'BẬC '+i.grade+' · ':''}+${i.enhance||0}</b></span>`;}","--rank-color:${Workshop.color(i.grade)}\"><b>${i.grade?'BẬC '+i.grade+' · ':''}${typeof V70T==='function'?V70T(i):'+'+(i.enhance||0)}</b></span>`;}")
rep("· Mảnh ${fr}${need?'/'+need:''}</div>","· Mảnh ${fr}</div>")
rep("pill:g&&g.tier==='sss'?'+'+Gear44.sssEnh(g.id):'+'+(it.enhance||0)+((it.enhance||0)>=1?' · ghép được':''),","pill:g&&g.tier==='sss'?'+'+Gear44.sssEnh(g.id):(typeof V70T==='function'?V70T(it):'+'+(it.enhance||0)),")
# V70 · ngoại hình trang bị theo KHUNG (Evo53) + chữ ở sảnh CCHT
rep("const it=itemOf(kind);if(!it)return {t:0,sss:false,e:0};const e=it.enhance||0;return {t:tierN(e),sss:false,e};","const it=itemOf(kind);if(!it)return {t:0,sss:false,e:0};const e=typeof V70!=='undefined'?V70.ve('g',it):(it.enhance||0);return {t:tierN(e),sss:false,e};")
rep("'Lv.'+v.level+'/'+Workshop.cap(v)+' · Cường hóa +'+v.enhance","'Lv.'+v.level+'/'+Workshop.cap(v)+' · Khung '+(typeof V70T==='function'?V70T(v):'+'+v.enhance)")

# V71 · Đá khảm: combo ngọc cũ → tóm tắt đá; ngọc cũ không còn cộng combo
rep("<div class=\"m7-h sub\"><b>COMBO NGỌC</b><span>${b.combos.length}/4</span></div><ul class=\"m7-list\">${all.map(c=>`<li class=\"${on.has(c[0])?'on':''}\"><b>${c[0]}</b> · ${c[1]} → ${c[2]}</li>`).join('')}</ul>","${typeof Stone71!=='undefined'?Stone71.cardHtml():`<div class=\"m7-h sub\"><b>COMBO NGỌC</b><span>${b.combos.length}/4</span></div><ul class=\"m7-list\">${all.map(c=>`<li class=\"${on.has(c[0])?'on':''}\"><b>${c[0]}</b> · ${c[1]} → ${c[2]}</li>`).join('')}</ul>`}")
rep("gemsOn(items){try{","gemsOn(items){if(typeof Stone71!=='undefined')return [];try{")

# V74-mẫu · nền sảnh mới (bệ ở 55% chiều cao ảnh)
rep('class="hb-it" data-it="${it.id}" style="--rc:${Workshop.color(it.grade)}"','class="hb-it" data-it="${it.id}" data-q="${typeof V70F==="function"?V70F(it):0}" style="--rc:${Workshop.color(it.grade)}"')
rep("const Z=SW<420?1.45:1.25,k=SW/W*Z,shipY=SH*.46,","const Z=SW<420?1.78:1.5,k=SW/W*Z,shipY=SH*.5,")
rep("(window.matchMedia?.('(max-width: 700px)').matches?'light':'high')","'high'")
rep("if(shake>0&&mode==='play'&&!VisualFX.reduced())ctx.translate(rnd(-3,3),rnd(-3,3));","if(shake>0&&mode==='play'&&!VisualFX.reduced()){const A=typeof FX16S==='function'?FX16S():3;ctx.translate(rnd(-A,A),rnd(-A,A));}")
rep("for(const s of st.shots){const spr=bulletSpr(s.kind,s.col),sc=k*s.s*.5;ctx.save();","for(const s of st.shots){const spr=bulletSpr(s.kind,s.col),sc=k*s.s*.5;ctx.save();if(typeof FX16A==='function')ctx.globalAlpha=FX16A(s,st.shots,k);")
rep("const owned=Campaign36.getState();let reward;if(c.type==='gear'){","const owned=Campaign36.getState();let reward;if(typeof Chest74V70==='function'&&typeof V70!=='undefined'){reward=Chest74V70(c);if(!reward)return false;}else if(c.type==='gear'){")
rep(" if(reward.type==='gear'&&reward.item){"," if(reward.v70){}else if(reward.type==='gear'&&reward.item){")
rep("· ${it.grade?'Bậc '+it.grade:'Cơ bản'} · Mảnh ${fr}</div>","· ${it.grade?'Bậc '+it.grade:'Cơ bản'} · Phôi ${typeof V70!=='undefined'?[0,1,2,3].map(c=>['Trắng','Lục','Lam','Tím'][c]+' '+V70.phHave('gear',it.variant,c)).join(' · '):''}</div>")
rep("function merge(ids=picks){if(locked)return false;","function merge(ids=picks){if(locked)return false;if(typeof V70!=='undefined'){message('Ghép trang bị đã thay bằng Nâng khung phẩm chất (V70) · dùng phôi.');return false;}")
rep("Rương trang bị cho một món cơ bản và 2 mảnh đúng mẫu; rương chiến cơ cho 2 mảnh đúng chiến cơ. Rương A cho gấp đôi mảnh (4), không tăng phẩm chất món đồ.","Rương mở ra PHÔI Trắng / Lục / Lam (không có Tím) của mẫu đã mở: rương B 1 phôi, rương A 2 phôi. 3 phôi Trắng đúc 1 Lục, 3 Lục đúc 1 Lam. Hết lượt Vô tận rương tự mở.")
rep("function build(){const im=new Image();im.src=HANGAR_BG;","function build(){const im=new Image();im.src=(typeof SKIN15_BG!=='undefined'&&SKIN15_BG)||HANGAR_BG;")
rep("padY/(bg.naturalHeight*.81),(SH-padY)/(bg.naturalHeight*.19));const bw=bg.naturalWidth*s,bh=bg.naturalHeight*s;g.drawImage(bg,SW/2-bw/2,padY-bh*.81,bw,bh);","padY/(bg.naturalHeight*BGA),(SH-padY)/(bg.naturalHeight*(1-BGA)));const bw=bg.naturalWidth*s,bh=bg.naturalHeight*s;g.drawImage(bg,SW/2-bw/2,padY-bh*BGA,bw,bh);")
rep("if(bg){const padY=shipY+40*k,s=Math.max(","if(bg){const BGA=typeof SKIN15_BG!=='undefined'?.78:.81;const padY=shipY+40*k,s=Math.max(")
# ---- REVIEW75 (Gemini 23/10): mật độ quái ----
rep("const budget=(w,l)=>Math.min(34,Math.min(19,14+Math.floor((l-1)/16))+w*3);","const budget=(w,l)=>Math.min(48,Math.min(28,20+Math.floor((l-1)/10))+w*4);const th75=l=>l<20?[5,5.5]:l<=80?[6,4.8]:[8,4.2];")
rep("let sub=0,seq=0,phase=[],lastWave=-1;","let sub=0,seq=0,phase=[],lastWave=-1,gt75=0;")
rep("x:step===1?(side<0?25:455):W/2+(k-(n-1)/2)*42,","x:step===1?(side<0?25:455):W/2+(k-(n-1)/2)*Math.min(42,400/Math.max(1,n-1)),")
rep("originX30:W/2+(k-(n-1)/2)*42});","originX30:W/2+(k-(n-1)/2)*Math.min(42,400/Math.max(1,n-1))});")
rep("endlessGap-=dt;const living=phase.filter(e=>!e.dead&&e.y<H+45).length;","endlessGap-=dt;gt75+=dt;const living=phase.filter(e=>!e.dead&&e.y<H+45).length;")
rep("if(sub<3&&endlessGap<=0&&(sub===0||living<=2)){const count=budget(endlessWave,level),first=Math.min(8,6+Math.floor((level-1)/4)),middle=Math.min(10,Math.ceil((count-first)/2)),last=count-first-middle;","if(sub<3&&endlessGap<=0&&(sub===0||living<=th75(level)[0]||gt75>=th75(level)[1])){const count=budget(endlessWave,level),first=Math.min(14,Math.floor(count*.35)),middle=Math.min(18,Math.floor(count*.4)),last=Math.min(16,Math.max(4,count-first-middle));gt75=0;")
rep("(v===3?'<button class=\"cm-sw\">Càn quét ('+Math.max(0,10-(sw.used||0))+'/10)</button>':'')","(v===3?'<button class=\"cm-sw\">Càn quét ('+Math.max(0,10-(sw.used||0))+'/10)</button><button class=\"cm-sw cm-sw5\">×5</button>':'')")  # REVIEW75 càn quét ×5
rep("const swb=sheet.querySelector('.cm-sw');if(swb)swb.onclick=","const sw5=sheet.querySelector('.cm-sw5');if(sw5)sw5.onclick=()=>{if(typeof UX75!=='undefined'&&UX75.sweep5(n))openSheet(n);};const swb=sheet.querySelector('.cm-sw:not(.cm-sw5)');if(swb)swb.onclick=")
rep("pending=true;warning=1.5;","pending=true;warning=3.0;")  # ROADMAP76 lặng 3 s trước boss
rep("endlessWave++;endlessSpawned=0;endlessGap=.5;","endlessWave++;endlessSpawned=0;endlessGap=1.8;")  # ROADMAP76 nghỉ 1,8 s giữa đợt
rep("const DAYS=[{credits:300},{stones:40},{credits:600,stones:20},{frag:4},{credits:1000},{stones:120},{credits:2000,stones:150,frag:6}];","const DAYS=[{credits:300},{stones:40},{credits:600,stones:20},{copy:[0,2]},{credits:1000},{stones:120},{credits:4000,stones:300,copy:[2,1],xp4:2}];")  # V78 điểm danh: ngày 7 > tổng ngày 1–6 · V307: mảnh chiến cơ (đã bỏ từ V74, cộng ra 0) → bản sao theo bảng Frag74: 4 mảnh=2 Trắng, 10 mảnh=2 Lục; chủ dự án 17/11: ngày 7 = 1 bản sao Lam
rep("if(r.frag)Workshop.grant({craft:launchCraft,fragments:r.frag});","if(r.copy){try{V70.phAdd('craft',launchCraft,r.copy[0],r.copy[1]);}catch{}}if(r.xp4){try{XPDA307.add(4,r.xp4);}catch{}}")  # V307 Gemini: ngày 7 +2 Đá XP IV  # V307: bản sao Lv1 qua Evo82
rep("r.frag?r.frag+' mảnh chiến cơ đang dùng':''","r.copy?r.copy[1]+' bản sao '+['Trắng','Lục','Lam','Tím'][r.copy[0]]+' Lv1':'',r.xp4?r.xp4+' Đá XP IV':''")
rep("clamp(Math.round(W*fh/Math.max(1,fw)),680,1100)","clamp(Math.round(W*fh/Math.max(1,fw)),680,1400)")  # V75 máy dài: phủ kín màn hình khi chơi
rep("if(state.sweep.used>=10)return false;state.sweep.used++;save();const credits=missionFor(n).credits;","if(state.sweep.used>=10){if(!(typeof V75!=='undefined'&&V75.takeTk()))return false;}else state.sweep.used++;save();const credits=missionFor(n).credits;")  # V75 vé càn quét
rep("if(e.guard>0&&!s.ignoreGuard){const blocked=Math.min(e.guard,s.damage);","if(typeof C76run!=='undefined'&&C76run.blocks(s,e)){}else if(e.guard>0&&!s.ignoreGuard){const blocked=Math.min(e.guard,s.damage);")  # V76 khiên từ tính
rep("shield:shield>=maxShield-.01?(bulletShieldTime>0?0:.5):1+2*(1-shield/maxShield),","shield:window.SHIELD78===false?(shield>=maxShield-.01?(bulletShieldTime>0?0:.5):1+2*(1-shield/maxShield)):((bulletShieldTime>0||(window.__shLock78||0)>performance.now())?0:.45),")
rep("if(hp<h0)S.hpLost=true;","if(hp<h0&&(window.SHIELD78===false||(S.lv||0)<61||(maxHp-hp)>maxHp*.15+1e-6))S.hpLost=true;")  # V78.3 từ ải 61 mất ≤15% máu vẫn giữ sao 2  # V78.2 khiên chặn 1 đòn
rep("if(S.sh0>0&&shield<S.sh0*.5-1e-6)S.shLow=true;","if(window.SHIELD78===false&&S.sh0>0&&shield<S.sh0*.5-1e-6)S.shLow=true;")  # V78.2 bỏ điều kiện giáp
# V79: bỏ rep "Không mất máu" (play63 tự ghi điều kiện máu theo chương)
rep('Hỏa lực ${power}<br>Giáp ${shield.toFixed(1)} · Máu ${hp.toFixed(1)}/${maxHp.toFixed(1)}','Hỏa lực ${power}<br>Máu ${hp.toFixed(1)}/${maxHp.toFixed(1)}${bulletShieldTime>0?" · Khiên "+bulletShieldTime.toFixed(0)+"s":""}')  # V78.4
rep("if(st.meter>=st.need/scale&&supportOnScreen()<CAP){const t=pick();if(t){st.meter=0;st.need=7+Math.floor(Math.random()*5);","if(st.meter>=st.need/scale&&supportOnScreen()<(window.Bal787?Bal787.buffCap():2)&&(!window.Bal787||Bal787.buffOk())){const t=pick();if(t){st.meter=0;st.need=window.Bal787?Bal787.buffNeed():13+Math.floor(Math.random()*7);try{Bal787.buffSpawned();}catch{}")  # V78.6 buff rơi thưa hơn, tối đa 2 trên màn
rep("if(e.elite&&superTime<=0&&!drops.some(d=>!d.dead&&d.type==='super')&&Math.random()<.2)spawn('super'","if(e.elite&&superTime<=0&&!drops.some(d=>!d.dead&&d.type==='super')&&Math.random()<(window.Bal787?Bal787.superRate():.1))spawn('super'")  # V78.6
rep("grantCredits(n){state.credits+=Math.max(0,Math.floor(n));save();","grantCredits(n){n=Number(n);if(!Number.isFinite(n))return;state.credits+=Math.max(0,Math.floor(n));save();")  # V78.6 QA: chặn NaN
rep("if(!unlocked&&roll<.2){","if(!unlocked&&roll<.2&&window.CAMPGEAR78===true){")  # V78.8 ải thường không rơi trang bị
rep("magnet:st.magnetT>0?0:.45};","magnet:0};")  # V78.2 bỏ buff nam châm rơi ra
rep("const R=st.magnetT>0?420:isStar?(od?260:120):70+(gear.magnet||0)","const R=isStar?(od?72:60):(59.4+Math.min(19.8,(gear.magnet||0)*.132))*(window.__mag91||1)")  # V78.9 buff hút xa hơn 10%  # V78.2 chỉ hút khi sát thân tàu
rep("d.type==='star'?(Fighters28.overdrive()?260:140):90+gear.magnet","d.type==='star'?60:(59.4+Math.min(19.8,(gear.magnet||0)*.132))*(window.__mag91||1)")  # V78.2
rep("else if(!b.dead&&Combat26.near(b,oldX,oldY,oldPlayer)<=b.r+4.5){b.dead=true;damage('bullet');","else if(!b.dead&&Combat26.near(b,oldX,oldY,oldPlayer)<=b.r+4.5-(window.HURT77||0)-(window.HURT77_78||0)){b.dead=true;damage('bullet');")  # V77 bộ skin Hoàng Kim

import sys;sys.path.insert(0,'tools');import nen_anh;h=nen_anh.nen_html(h)
# ---------- V78.5 · UI18 (GPT): khung giáp bạc + nút + tab + ô tài nguyên đồng bộ phong cách chiến cơ ----------
if os.environ.get('UI18','1')!='0':
    U18={}
    for _f,_k,_mx in [('button_primary_normal','pri',384),('button_primary_pressed','pri-p',384),('button_primary_disabled','dis',384),('button_secondary_normal','sec',384),('button_secondary_pressed','sec-p',384),('button_secondary_disabled','sec-d',384),
                      ('button_close_normal','close',128),('panel_common','panel',512),('panel_rare','panel-r',512),('panel_legendary','panel-l',512),('card_common','card',256),('card_rare','card-r',256),('card_legendary','card-l',256),
                      ('tabbar_bg','tabbar',768),('tab_selected','tab-on',160),('tab_normal','tab-off',160),('resource_cell','res',384),
                      ('icon_tab_home','t-home',96),('icon_tab_battle','t-combat',96),('icon_tab_fleet','t-fleet',96),('icon_tab_equipment','t-equip',96),('icon_tab_store','t-shop',96),
                      ('icon_resource_alloy','r-alloy',96),('icon_resource_diamond','r-dia',96),('icon_resource_stone','r-stone',96),('icon_resource_stamina','r-en',96),('icon_resource_sweep_ticket','r-tk',96),('badge_lock','lock',256),('badge_new','new',192)]+[('../ui18b/'+_f,_k,_m) for _f,_k,_m in [('close_normal','x',128),('close_pressed','x-p',128),('chip_normal','chip',256),('chip_selected','chip-on',256),('page_title','title',768),('result_win','win',512),('result_lose','lose',512),('objective_banner','banner',768),('list_row_common','row',768),('list_row_rare','row-r',768),('list_row_legendary','row-l',768)]]:
        _im=_I.open('src/ui18/'+_f+'.png').convert('RGBA');_im.thumbnail((_mx,_mx),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=90);U18[_k]='url(data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()+')'
    _im=_I.open('src/ui18/bg_hangar.png').convert('RGB').resize((720,1560),_I.LANCZOS);_bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=80);U18['bg']='url(data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()+')'
    for _a,_b,_n in [('var(--u15-gold) 40 52 40 52 fill / 12px 16px stretch','var(--u18-pri) 32 96 32 96 fill / 12px 34px stretch',5),('var(--u15-blue) 40 52 40 52 fill / 12px 16px stretch','var(--u18-sec) 32 96 32 96 fill / 12px 34px stretch',2),
                     ('var(--u15-red) 40 52 40 52 fill / 12px 16px stretch','var(--u18-pri) 32 96 32 96 fill / 12px 34px stretch',1),('border-image-slice:40 52 40 52 fill','border-image-slice:32 96 32 96 fill',1),
                     ('border-image-source:var(--u15-gray)','border-image-source:var(--u18-dis)',None),('border-image-source:var(--u15-blue)','border-image-source:var(--u18-sec)',None),
                     ('var(--u15-gold-p)','var(--u18-pri-p)',None),('var(--u15-blue-p)','var(--u18-sec-p)',None),
                     ('var(--u15-panel) 96 fill / 28px stretch','var(--u18-panel) 128 fill / 28px stretch',1),('var(--u15-panel) 96 fill / 22px stretch','var(--u18-panel) 128 fill / 22px stretch',1),
                     ('var(--u15-sgold) 32 fill / 10px stretch','var(--u18-pri) 32 96 32 96 fill / 10px 30px stretch',1),('var(--u15-sblue) 32 fill / 10px stretch','var(--u18-sec) 32 96 32 96 fill / 10px 30px stretch',1)]:
        _c=h.count(_a)
        if _n is not None and _c!=_n:print('UI18 canh bao',_a,_c,'/',_n)
        h=h.replace(_a,_b)
    # nút dùng khung UI18 có lõi kính tối → chữ sáng (thay chữ nâu trên nền vàng cũ)
    import re as _re
    def _lite(m):
        t=m.group(0)
        if 'var(--u18-pri)' in t or 'var(--u18-sec)' in t:t=t.replace('color:#2a1400','color:#ffe6b0').replace('text-shadow:0 1px 0 #ffe9a8','text-shadow:0 1px 2px #000')
        return t
    h=_re.sub(r'\{[^{}]*var\(--u18-(?:pri|sec)\)[^{}]*\}',_lite,h)
    _css=':root{'+';'.join('--u18-'+k+':'+v for k,v in U18.items())+'}'+open('src/ui18.css',encoding='utf-8').read()+open('src/ui79.css',encoding='utf-8').read()
    h=h.replace('</body>','<style id="ui18-css">'+_css+'</style></body>',1)
    print('UI18:',len(U18),'manh')
rep("if(camp&&starsNow<3)h+='<div class=\"rs-hint\">'+(starsNow===1?'2★: kết thúc còn ≥50% máu':'3★: còn ≥80% máu và không trúng đòn')+'</div>';","if(camp&&starsNow<3)h+='<div class=\"rs-hint\">'+(window.STAR79TXT?'Để đủ 3★: '+STAR79TXT(level).hp+' · '+STAR79TXT(level).o3:(starsNow===1?'2★: kết thúc còn ≥50% máu':'3★: còn ≥80% máu và không trúng đòn'))+'</div>';")  # V79 gợi ý sao theo luật mới
# ---- V79C · bộ đồ họa UI19 của GPT (phôi 4 màu, mảnh ngọc, khung quà bộ, huy hiệu, icon thành tựu, tiêu đề phó bản, sảnh nhẹ, màn tải) ----
if os.environ.get('UI19','1')!='0':
    import io as _io19,base64 as _b6419,glob as _g19
    from PIL import Image as _I19
    U19={}
    for _p in sorted(_g19.glob('src/ui19/*.png')):
        _k=os.path.basename(_p)[:-4];_im=_I19.open(_p).convert('RGBA')
        _big=_k in('lobby_light','loading_background')
        if _big:_im=_im.convert('RGB')
        _bf=_io19.BytesIO();_im.save(_bf,'WEBP',quality=(80 if _big else 90),method=6);U19[_k]='data:image/webp;base64,'+_b6419.b64encode(_bf.getvalue()).decode()
    _css19=':root{'+';'.join('--u19-'+k.replace('_','-')+':url('+v+')' for k,v in U19.items() if k.startswith(('set_card','result_title','lobby_light','loading','rank_')))+'}'
    h=h.replace('</body>','<style id="ui19-vars">'+_css19+'</style><script id="ui19-art">window.UI19_ART='+json.dumps(U19,separators=(',',':'))+';</script><script id="ui19-js">'+open('src/ui19.js',encoding='utf-8').read()+'</script></body>',1)
    print('UI19:',len(U19),'anh',round(sum(len(v) for v in U19.values())/1e6,2),'MB')
rep("im.src=(typeof SKIN15_BG!=='undefined'&&SKIN15_BG)||HANGAR_BG;im.onload=()=>{bg=im;};","im.src=(typeof SKIN15_BG!=='undefined'&&SKIN15_BG)||HANGAR_BG;im.onload=()=>{bg=im;};window.__h41bg0=im.src;window.__h41setBg=src=>{const j=new Image();j.onload=()=>{bg=j;};j.src=src||window.__h41bg0;};")  # V79C: chế độ NHẸ đổi nền sảnh sang lobby_light (UI19)
# ---- V79B · thưởng phó bản theo Gemini REVIEW79B (bảng DG79T trong src/dg79.js) ----
rep("let credits=120*n,loot=[],reward=null;","let credits=(window.DG79T&&DG79T.cr[run.type]?DG79T.cr[run.type][run.d]:120*n),loot=[],reward=null;")
rep("else if(run.type==='gold'){credits=400*n;","else if(run.type==='gold'){credits=(window.DG79T?DG79T.cr.gold[run.d]:400*n);")
rep("else{Workshop.grant({exp:25*n,aux:6*n,","else{Workshop.grant({exp:(window.DG79T?DG79T.mexp[run.d]:25*n),aux:(window.DG79T?DG79T.maux[run.d]:6*n),")
rep("return rewardStage([0,2,4,5][d]+1,Math.random(),Math.random(),12+d*6);","return rewardStage([0,2,4,5][d]+1,Math.random(),Math.random(),(window.DG79T?DG79T.gem[d]:12+d*6));")
rep("const equipmentRates=[[1.2,.3,0],[2,.8,.15],[3,1.8,.45],[4,3.2,1.2]]","const equipmentRates=[[1.2,.6,0],[2,.8,.05],[3,1,.12],[4,1.2,.2]]")  # V81 chủ dự án: S ≈1% (100 lượt may ra 1 món), SS 0–0.2%
rep("const endlessRates=[[5,9,.2,0],[10,19,.9,.2],[20,29,2.2,.6],[30,Infinity,4,1.5]];","const endlessRates=[[5,9,.5,0],[10,19,.8,.05],[20,29,1,.12],[30,Infinity,1.2,.2]];")
rep("const forced=Dungeons.pityCount(source)>=9,","const forced=Dungeons.pityCount(source)>=(window.PITY81||149),")  # V79B Gemini: S 2/3.5/5/7% · SS 0/0.3/0.8/1.5%
# ---- V79 · Thành tựu theo Gemini REVIEW79 (src/ach79.js) ----
rep("function achRows(){const out=[];for(const [id,name,th,get,desc] of ACH){","function achRows(){const out=[];for(const [id,name,th,get,desc] of ACH.concat(window.Ach79&&window.ACH79!==false?Ach79.ROWS:[])){")
rep("can:!fin&&v>=n,fin,tier:t,r:achReward(t)});","can:!fin&&v>=n,fin,tier:t,r:(window.Ach79&&Ach79.reward(id,t))||achReward(t)});")
rep("if(!row||!row.can)return;give(row.r);S.ach[id]=(S.ach[id]|0)+1;save();","if(!row||!row.can)return;give(row.r);try{window.Ach79&&Ach79.bonus(id,row.tier);}catch{}S.ach[id]=(S.ach[id]|0)+1;save();")
rep("'Nhận ◈ hợp kim và ⬢ đá nâng cấp theo mốc'","'Nhận ◈ hợp kim, ⬢ đá và phôi theo mốc · Quà bộ chiến cơ ở trên cùng'")
# ---- V78.9 · boss: phá cánh / phá giáp chỉ rơi tối đa 1 buff, có ngân sách buff mỗi boss (Bal787.bossDrop) ----
rep("Safety31.push(drops,100,{x:p.x-12,y:p.y,type:'power',t:0},{x:p.x+12,y:p.y,type:'heal',t:0});if(superTime<=0)Safety31.push(drops,100,{x:p.x,y:p.y-14,type:'super',t:0,vx:0,vy:-90,ph:0,v40:true});toast((p.side<0?'CÁNH TRÁI':'CÁNH PHẢI')+' ĐÃ PHÁ · W + HỒI MÁU');",
    "{const k78=(window.Bal787&&Bal787.bossDrop)?Bal787.bossDrop(p.x,p.y,'wing'):(Safety31.push(drops,100,{x:p.x,y:p.y,type:'power',t:0}),'power');toast((p.side<0?'CÁNH TRÁI':'CÁNH PHẢI')+' ĐÃ PHÁ'+(k78==='heal'?' · HỒI MÁU':k78==='power'?' · W':''));}")
rep("Safety31.push(drops,100,{x:b.x,y:b.y+50,type:'power',t:0});if(superTime<=0)Safety31.push(drops,100,{x:b.x+34,y:b.y+50,type:'super',t:0,vx:0,vy:-90,ph:0,v40:true});for(let k=0;k<7;k++)",
    "if(window.Bal787&&Bal787.bossDrop)Bal787.bossDrop(b.x,b.y+50,'phase');else Safety31.push(drops,100,{x:b.x,y:b.y+50,type:'power',t:0});for(let k=0;k<7;k++)")
rep("toast('PHÁ GIÁP · GIAI ĐOẠN '+(n+1)+' · W + SAO');","toast('PHÁ GIÁP · GIAI ĐOẠN '+(n+1));")
rep("bossStep++;drop(need(),Math.max(60,Math.min(420,boss.x)),Math.min(320,boss.y+60));stats.bossGifts++;","bossStep++;if(!window.Bal787||!Bal787.bossTake||Bal787.bossTake()){drop(need(),Math.max(60,Math.min(420,boss.x)),Math.min(320,boss.y+60));stats.bossGifts++;}")  # V78.9 quà 25% máu boss cũng tính vào ngân sách
# ---- V81 · Vô tận: sang đợt mới không xóa đạn/buff, quái ra tiếp ngay, không nháy (bất tử nhấp nháy) ----
rep("score+=(hadBoss?2500:500)*Math.min(level,160);boss=null;bullets=[];beams=[];enemies=[];shots=[];drops=[];keys.clear();pointer=null;pointerTarget=null;Combat26.cancelSkill();","score+=(hadBoss?2500:500)*Math.min(level,160);boss=null;if(gameMode==='endless'&&window.ENDLESS81!==false){if(hadBoss){bullets=[];beams=[];}}else{bullets=[];beams=[];enemies=[];shots=[];drops=[];keys.clear();pointer=null;pointerTarget=null;Combat26.cancelSkill();}")
rep("endlessGap=.8;endlessRest=hadBoss?3:1;stageFinished36=false;hp=Math.min(maxHp,hp+(hadBoss?1:0));invuln=2;","endlessGap=window.ENDLESS81!==false?.25:.8;endlessRest=window.ENDLESS81!==false?(hadBoss?1.2:0):(hadBoss?3:1);stageFinished36=false;hp=Math.min(maxHp,hp+(hadBoss?1:0));if(window.ENDLESS81===false)invuln=2;")
rep("'ĐỢT '+level+' · BOSS KẾ TIẾP '+(Math.ceil(level/5)*5));hud();return;}","(Campaign36.bossKind(level)?'ĐỢT '+level+' · BOSS XUẤT HIỆN':'ĐỢT '+level+' · BOSS Ở ĐỢT '+(Math.ceil(level/5)*5)));hud();return;}")
rep("endlessWave++;endlessSpawned=0;endlessGap=1.8;toast(","endlessWave++;endlessSpawned=0;endlessGap=1.8;if(gameMode!=='endless'||window.ENDLESS81===false||Campaign36.bossKind(level))toast(")
# ---- V83 · mở rộng 10 → 13 chiến cơ ----
rep("desc:'Quân Đoàn · Chín phù du pháo hội tụ.'}];","desc:'Quân Đoàn · Chín phù du pháo hội tụ.'},{name:\"Thôn Tinh Chiến Cơ\",img:'playerShip3_orange.png',hp:6,shield:3,speed:330,weapon:4,desc:'Trọng Lực Thôn Phệ · Cầu trọng lực xuyên, nổ lan. Bạo Tẩu hút đạn địch bắn trả.'},{name:\"Thời Không Lữ Khách\",img:'playerShip2_green.png',hp:5,shield:3,speed:380,weapon:2,desc:'Lưỡng Cực Thời Gian · Thương thời gian tốc độ cao. Bạo Tẩu làm chậm 60% đạn địch.'},{name:\"Hư Không Đế Vương\",img:'playerShip1_red.png',hp:7,shield:3,speed:315,weapon:1,desc:'Phán Quyết Thứ Nguyên · Đạn cắt chéo; chỉ còn boss thì chụm thành 1 tia tối thượng.'}];")
rep('{"name": "Tinh Hà Thủ Vọng", "weapon": "Quân Đoàn", "color": "#bd9bff", "rate": 0.3}];','{"name": "Tinh Hà Thủ Vọng", "weapon": "Quân Đoàn", "color": "#bd9bff", "rate": 0.3}, {"name": "Thôn Tinh Chiến Cơ", "weapon": "Trọng Lực Thôn Phệ", "color": "#b45cff", "rate": 0.3}, {"name": "Thời Không Lữ Khách", "weapon": "Lưỡng Cực Thời Gian", "color": "#5fe6ff", "rate": 0.2}, {"name": "Hư Không Đế Vương", "weapon": "Phán Quyết Thứ Nguyên", "color": "#ffd36a", "rate": 0.26}];')
rep("crafts:Array(10).fill(''),craftEnhancements:Array(10).fill(0),craftFragments:Array(10).fill(0),craftLevels:Array(10).fill(1)","crafts:Array(13).fill(''),craftEnhancements:Array(13).fill(0),craftFragments:Array(13).fill(0),craftLevels:Array(13).fill(1)")
rep("w[k]||=Array(10).fill(v);while(w[k].length<10)w[k].push(v);","w[k]||=Array(13).fill(v);while(w[k].length<13)w[k].push(v);")
rep("![9,10].includes(w.crafts.length)","![9,10,13].includes(w.crafts.length)")
# V83 · sao lưu/khôi phục: 13 chiến cơ → mảng dài 13 phải hợp lệ (trước đó khôi phục báo "Tiến trình không hợp lệ")
for _k in ['w.craftFragments','w.craftEnhancements','w.craftLevels']:
    rep("![9,10].includes(%s.length)"%_k,"![9,10,13].includes(%s.length)"%_k)
rep("for(let i=0;i<10;i++){const v=normalize({grade:s.crafts?.[i],level","for(let i=0;i<13;i++){const v=normalize({grade:s.crafts?.[i],level")
rep(".filter(i=>Number.isInteger(i)&&i>0&&i<10)",".filter(i=>Number.isInteger(i)&&i>0&&i<13)")
rep("s.crafts.some(i=>!Number.isInteger(i)||i<0||i>9)","s.crafts.some(i=>!Number.isInteger(i)||i<0||i>12)")
rep("if(type==='craft'&&(!Number.isInteger(id)||id<0||id>9)","if(type==='craft'&&(!Number.isInteger(id)||id<0||id>12)")
rep("function upgradeCraft(i){if(!Number.isInteger(i)||i<0||i>9","function upgradeCraft(i){if(!Number.isInteger(i)||i<0||i>12")
rep("V70.open('craft',i);return false;}if(!Number.isInteger(i)||i<0||i>9","V70.open('craft',i);return false;}if(!Number.isInteger(i)||i<0||i>12")
rep("function grantCraft(i,g='',source='legacy'){const grade=quality(g);if(!Number.isInteger(i)||i<0||i>9","function grantCraft(i,g='',source='legacy'){const grade=quality(g);if(!Number.isInteger(i)||i<0||i>12")
rep("function set70(i,p){if(!Number.isInteger(i)||i<0||i>9","function set70(i,p){if(!Number.isInteger(i)||i<0||i>12")
rep("||d[keys[5]]>9)","||d[keys[5]]>12)")
rep("for(let i=0;i<10;i++)if(!ownership.crafts.includes(i))w.craftFragm","for(let i=0;i<13;i++)if(!ownership.crafts.includes(i))w.craftFragm")
rep("function roster(){const out=[];for(let i=0;i<10;i++)if(Campaign36.ownsCraft(i))","function roster(){const out=[];for(let i=0;i<13;i++)if(Campaign36.ownsCraft(i))")
rep("for(let i=0;i<10;i++){if(!Campaign36.ownsCraft(i))continue;const P","for(let i=0;i<13;i++){if(!Campaign36.ownsCraft(i))continue;const P")
rep("try{for(let i=0;i<10;i++)if(craftCan(i)){c=true;break;}","try{for(let i=0;i<13;i++)if(craftCan(i)){c=true;break;}")
rep("const ssCount=()=>{let n=0;for(let i=0;i<10;i++)","const ssCount=()=>{let n=0;for(let i=0;i<13;i++)")
rep("function ownedList(){return Array.from({length:10},","function ownedList(){return Array.from({length:13},")
rep("function volley(id,internal=1,rage=false){","function volley(id,internal=1,rage=false){if(id>=10&&id<=12&&window.Ship83)return Ship83.volley(id,internal,rage,levels,element);")
rep("const id=(s.art28??0)%10;let [im,t]=spr(id,s.level30||0);","const id=((s.art28??0)>=10&&(s.art28??0)<=12)?s.art28:(s.art28??0)%10;let [im,t]=spr(id,s.level30||0);")
rep("id:(fusion&&activeRobot?activeRobot.artIndex%9:selected)%10,l:Arsenal30.p()","id:(fusion&&activeRobot?activeRobot.artIndex%9:(selected>=10&&selected<=12?selected:selected%10)),l:Arsenal30.p()")
rep("many=[0,2,4,7,8,9].includes(id)","many=[0,2,4,7,8,9,10,11,12].includes(id)")
rep("const T=cfg.theme||SUPER_V2_THEMES[id];","const T=cfg.theme||SUPER_V2_THEMES[id]||SUPER_V2_THEMES[[5,1,9][id-10]??0];")
rep("const thumbs=[];function thumb(i){if(thumbs[i])return thumbs[i];","const thumbs=[];function thumb(i){if(i>=10&&window.Ship83)return Ship83.thumb(i);if(thumbs[i])return thumbs[i];")
# ---- V81 · bộ 9 Kỳ Hạm + kiểu bắn #6/#8 (src/gear81.js): móc vào Equipment25, chặn rơi ngẫu nhiên bộ 9 ----
rep("function armorSkill(i){const s=i.spec,","function armorSkill(i){if(window.Gear81&&Gear81.armor(i))return;if(window.Skill81&&Skill81.armor(i))return;const s=i.spec,")
rep("function fire(i){if(i.kind==='sidearm'&&i.variant==='rail'){","function fire(i){if(window.Gear81&&Gear81.fire(i))return;if(window.Skill81&&Skill81.fire(i))return;if(i.kind==='sidearm'&&i.variant==='rail'){")
rep(" return {supportSprite,barrage,cooldown:()=>barrageCooldown,"," window.__eq81={clear:(...a)=>clear(...a),ring:(...a)=>ring(...a),emitGear:(...a)=>emitGear(...a),hurt:(...a)=>hurt(...a),origin:(...a)=>origin(...a)};\n return {supportSprite,barrage,cooldown:()=>barrageCooldown,")
rep("for(const v of ACTIVE_GEAR_MODELS)if(r||!ownsModel(v))pool.push({type:'gear',id:v});","for(const v of ACTIVE_GEAR_MODELS)if(!(window.GEAR81_NODROP||{})[v]&&(r||!ownsModel(v)))pool.push({type:'gear',id:v});")
rep("if(!pool.length)for(const v of ACTIVE_GEAR_MODELS)pool.push({type:'gear',id:v});","if(!pool.length)for(const v of ACTIVE_GEAR_MODELS)if(!(window.GEAR81_NODROP||{})[v])pool.push({type:'gear',id:v});")
rep("const reqCP=n=>Combat.stageRequirement(Math.max(1,Math.min(160,n)));","const reqCP=n=>Combat.stageRequirement(Math.max(1,Math.min(200,n)));")  # V87: đường đề nghị kéo tới ải 200
rep("if(warnBand>.02){","if(warnBand>.02&&window.MSG88===false){")  # V88: bỏ dải WARNING (giữ vùng đỏ)
rep("if(AW.t<0||quiet()&&!AW.sss)return;","if(AW.t<0||quiet()&&!AW.sss||window.MSG88!==false)return;")  # V88: bỏ dải cut-in thức tỉnh
# V89 · bản đồ chương + nút xuất kích + chủng tộc quái: 8 → 10 chương (chương 9/10 hiện khi đã mở)
MAXC="(typeof Ch10!=='undefined'&&Ch10.open()?10:typeof Ch9!=='undefined'&&Ch9.open()?9:8)"
rep("CH_RACE=[0,1,2,3,4,5,2,0];","CH_RACE=[0,1,2,3,4,5,2,0,5,4];",2)
rep("function nextStage(){const c=Progress.getState().cleared;return Math.min(160,","function nextStage(){const c=Progress.getState().cleared;return Math.min("+MAXC+"*20,",2)
rep("$q('#cm-small').textContent='CHƯƠNG '+(chap+1)+' / 8 · BỘ '+ch.set;","$q('#cm-small').textContent='CHƯƠNG '+(chap+1)+' / '+"+MAXC+"+(chap<8?' · BỘ '+ch.set:'');")
rep("function setChapter(c){if(c<0||c>7||c===chap)return;","function setChapter(c){if(c<0||c>"+MAXC+"-1||c===chap)return;")
rep("$q('#cm-next').disabled=chap===7;","$q('#cm-next').disabled=chap>="+MAXC+"-1;")
rep("$q('#cm-dots').innerHTML=CHAPTERS36.map(","$q('#cm-dots').innerHTML=CHAPTERS36.slice(0,"+MAXC+").map(")
# ---- V92 · đặc quyền thành tựu (src/v92.js): lượt càn quét miễn phí, hồi sinh miễn phí/giảm giá, giảm chi phí nâng cấp ----
rep("if(state.sweep.used>=10){if(!(typeof V75","if(state.sweep.used>=(window.SWEEP92?SWEEP92():10)){if(!(typeof V75")
rep("state.credits<300)return false;","state.credits<(window.REVFREE92&&REVFREE92(false)?0:(window.REVC92?REVC92():300)))return false;if(window.REVFREE92&&REVFREE92(true))return true;")
rep("state.credits-=300;save();return true;","state.credits-=(window.REVC92?REVC92():300);save();return true;")
rep("'HỒI SINH · 300 HỢP KIM'","(window.REVFREE92&&REVFREE92(false)?'HỒI SINH · MIỄN PHÍ (ĐẶC QUYỀN)':'HỒI SINH · '+(window.REVC92?REVC92():300)+' HỢP KIM')")
rep("$('start').disabled=Progress.balance()<300;","$('start').disabled=!(window.REVFREE92&&REVFREE92(false))&&Progress.balance()<(window.REVC92?REVC92():300);")
rep("function cost(i){return i.level>=Workshop.cap(i)?0:20+i.level*3;}","function cost(i){return i.level>=Workshop.cap(i)?0:Math.round((20+i.level*3)*(window.GDISC92?GDISC92():1));}")
rep("const enabled=settings.music&&mode==='play'&&!document.hidden&&audio.state==='running';","const enabled=settings.music&&mode==='play'&&!document.hidden&&audio.state==='running'&&window.MUSIC96===false;")  # V96 nhạc mới thay nhạc 8 nốt
rep("pointerTarget={x:clamp(pointerAnchor.px+(e.clientX-pointerAnchor.x)/r.width*W,pilotEdge(),W-pilotEdge()),y:clamp(pointerAnchor.py+(e.clientY-pointerAnchor.y)/r.height*H,pilotEdge(),H-pilotEdge())}","pointerTarget={x:clamp(pointerAnchor.px+(e.clientX-pointerAnchor.x)/r.width*W*(window.SENS98?SENS98(e):1),pilotEdge(),W-pilotEdge()),y:clamp(pointerAnchor.py+(e.clientY-pointerAnchor.y)/r.height*H*(window.SENS98?SENS98(e):1),pilotEdge(),H-pilotEdge())}")  # V98 độ nhạy kéo
rep("VisualFX.explode(e.x,e.y,e.elite?1.4:1,'enemy');ring(e.x,e.y,'#e9b080');","if(window.FX100===false){VisualFX.explode(e.x,e.y,e.elite?1.4:1,'enemy');ring(e.x,e.y,'#e9b080');}")  # V100 chủ dự án: bỏ nổ khi hạ quái thường
rep("if(e.meteor){score+=20;VisualFX.explode(e.x,e.y,.65,'enemy');return;}","if(e.meteor){score+=20;if(window.FX100===false)VisualFX.explode(e.x,e.y,.65,'enemy');return;}")
rep("if(e.elite){ctx.strokeStyle=e.guard>0?'#ffd47c':'#c783ee';","if(e.elite&&window.RING108===false){ctx.strokeStyle=e.guard>0?'#ffd47c':'#c783ee';")  # V109 bỏ vòng + sao quanh quái tinh anh
rep("if(b.phase){ctx.strokeStyle='#ff577c';ctx.lineWidth=2;ctx.beginPath();safeArc(ctx,b.x,b.y,78,0,TAU);ctx.stroke();}","if(b.phase&&window.RING108===false){ctx.strokeStyle='#ff577c';ctx.lineWidth=2;ctx.beginPath();safeArc(ctx,b.x,b.y,78,0,TAU);ctx.stroke();}")  # V109 bỏ vòng đỏ quanh boss
rep("function pilotEdge(){if(Fighters28.overdrive())return 84;return activeRobot?.super?74:activeRobot?56:gear.wingsTier?64:42;}","function pilotEdge(){if(window.EDGE110!==false)return 26;if(Fighters28.overdrive())return 84;return activeRobot?.super?74:activeRobot?56:gear.wingsTier?64:42;}")  # V110 bay sát mép màn hình
rep("function begin(req){requirement=req;flight=stats();}","function begin(req){requirement=req;let f=null;try{f=(window.CP113!==false&&typeof Combat!=='undefined'&&Combat.stats)?Combat.stats():null;}catch{}flight=f||stats();}")  # V113 lực chiến trong trận dùng đúng lực chiến ở sảnh (đủ phi công, đá, đồng đội…)
rep("function drawStageDecor(){","function drawStageDecor(){if(window.DECOR113!==false)return;")  # V113 bỏ ô chữ nhật / vòng trang trí vẽ bằng code ở hai mép nền
rep("(cool>0?Math.ceil(cool)+'s':'KỸ NĂNG / E')","(cool>0?Math.ceil(cool)+'s':'KỸ NĂNG')")  # V113 nhãn ngắn, không bị số bom che
# V209: đã gộp vào src/play47.js · rep("y=Math.max(62,b.y-(b.major36?92:58))","y=Math.max(84,b.y-(b.major36?92:58))")  # V113 hạ tên + máu boss để không bị ô cảnh báo đè
rep("const v='⚠ ST '+Math.round(f*100)+'%';","const v='ST −'+(100-Math.round(f*100))+'%';")  # V113 ô cảnh báo: biểu tượng GPT + 'ST −18%'
rep("txt(cp,'⚠ ST '+Math.round(f*100)+'%');","txt(cp,'ST −'+(100-Math.round(f*100))+'%');")
rep("<b>GRAZE</b>","<b class=\"gz113\" title=\"Sượt đạn: bay sát đạn địch để nạp Bạo Tẩu\"></b>")  # V113 thay chữ GRAZE bằng biểu tượng
rep("lo===0?' (đang có món Thường)':''","lo===0?' (có món phẩm Thường — tính theo phẩm gốc của món, không theo khung Lục/Lam/Tím)':''")
rep("txt(q('.t7-gz b'),gz.mult>1?'GRAZE ×'+gz.mult:(sk?'KỸ NĂNG '+sk.left.toFixed(1)+'s':'GRAZE'));","txt(q('.t7-gz b'),gz.mult>1?'×'+gz.mult:(sk?sk.left.toFixed(1)+'s':''));")  # V113 bỏ chữ GRAZE (đã có biểu tượng)
rep("'Bay sát đạn địch (không chạm) để nạp thanh GRAZE'","'Bay sát đạn địch (không chạm) để nạp thanh SƯỢT ĐẠN'")
rep("'MAJOR BOSS · ':'MINI-BOSS · '","'BOSS LỚN · ':'BOSS NHỎ · '",2)  # V113 Việt hóa nhãn boss
rep("'MAJOR BOSS · '","'BOSS LỚN · '")
# REVIEW114 cộng hưởng theo khung
rep("if(items.length===3){const lo=Math.min(...items.map(i=>RANK.indexOf(i.rarity)));const tier=RANK[lo];if(lo>=1){out.set=tier;const b=SET[tier];out.damage+=b.damage;out.rate+=b.rate;out.shield+=b.shield;if(tier==='legendary')out.thunder=true;}","if(items.length===3){if(window.RES114!==false){try{RN.frame1='Khung Lục';RN.frame2='Khung Lam';RN.frame3='Khung Tím';SET.frame1={damage:.03,rate:.02,shield:0};SET.frame2={damage:.05,rate:.03,shield:0};SET.frame3={damage:.08,rate:.05,shield:0};}catch{}const n=Math.min(...items.map(i=>{try{const it=(Progress.getState().items||[]).find(x=>x.id===i.id)||i;return V70.nOf(it)|0;}catch{return 0;}}));const t=n>=6?3:n>=2?2:n>=1?1:0;out.frame114=t;if(t){out.set='frame'+t;out.damage+=SET[out.set].damage;out.rate+=SET[out.set].rate;out.armorPct114=[0,0,.05,.08][t];}}else{const lo=Math.min(...items.map(i=>RANK.indexOf(i.rarity)));const tier=RANK[lo];if(lo>=1){out.set=tier;const b=SET[tier];out.damage+=b.damage;out.rate+=b.rate;out.shield+=b.shield;if(tier==='legendary')out.thunder=true;}}")
rep("${SET[b.set].shield?' · +1 giáp':''}","${SET[b.set].shield?' · +1 giáp':''}${b.armorPct114?' · +'+Math.round(b.armorPct114*100)+'% giáp':''}")
rep("mặc đủ 3 món cùng phẩm chất từ Hiếm trở lên${items.length<3?' (đang thiếu '+(3-items.length)+' món)':lo===0?' (có món phẩm Thường — tính theo phẩm gốc của món, không theo khung Lục/Lam/Tím)':''}","${window.RES114!==false?'mặc đủ 3 món từ Khung Lục trở lên (Lục +3% ST · Lam +5% ST · Tím +8% ST)':'mặc đủ 3 món cùng phẩm chất từ Hiếm trở lên'}${items.length<3?' (đang thiếu '+(3-items.length)+' món)':window.RES114!==false?' (đang có món Khung Trắng)':lo===0?' (có món phẩm Thường)':''}")
rep('out.hp+=b.hp;out.m7=',"out.hp+=b.hp;if(b.armorPct114){for(const k of ['armor','armour','def'])if(typeof out[k]==='number')out[k]*=1+b.armorPct114;}out.m7=")
rep("b.set==='legendary'?'MAX':b.set==='epic'?'SỬ':b.set==='rare'?'HIẾM':'—'","b.set==='legendary'?'MAX':b.set==='frame3'?'TÍM':b.set==='epic'?'SỬ':b.set==='frame2'?'LAM':b.set==='rare'?'HIẾM':b.set==='frame1'?'LỤC':'—'")
rep("${craftCan(i)?'<i class=\"hb-dot\"></i>':''}","${craftCan(i)&&(window.DOT114===false||i===cur)?'<i class=\"hb-dot\"></i>':''}")  # REVIEW114 chấm đỏ chỉ trên chiến cơ đang chọn
rep("${gearCan(it)?'<i class=\"hb-dot\"></i>':''}</button>`).join('')||","${gearCan(it)&&(window.DOT114===false||eq.has(it.id))?'<i class=\"hb-dot\"></i>':''}</button>`).join('')||")  # chỉ trên đồ đang mặc
rep("bay <b>sát đạn</b> để nạp GRAZE","bay <b>sát đạn</b> để nạp SƯỢT ĐẠN")
rep("toast('GRAZE · NÂNG ĐẠN LV '+power)","toast('SƯỢT ĐẠN · NÂNG ĐẠN LV '+power)")
rep("ctx.save();ctx.globalAlpha=dist(s,player)>85?.75:1;if(!Fighters28.draw(ctx,s)","ctx.save();ctx.globalAlpha=(window.ALPHA115!==false&&(s.gearKind||s.type==='drone'||s.ally||s.escort40))?.7:dist(s,player)>85?.75:1;if(!Fighters28.draw(ctx,s)")  # REVIEW115 đạn phụ/đồng đội mờ 0,7
rep("invuln=2;ring(player.x,player.y,'#d6fff0',120);VisualFX.explode(player.x,player.y,3,'bomb');","invuln=2;if(window.BRING115===false){ring(player.x,player.y,'#d6fff0',120);VisualFX.explode(player.x,player.y,3,'bomb');}")  # chủ dự án: thả bom không vẽ vòng quanh tàu ta
rep("addFx('bomb_hexring',x,y,60*k,R,720,{col:'#00f5d4',alpha:.95,ease:'out'});addFx('bomb_hexring',x,y,30*k,R*.6,560,{col:'#9bffd4',alpha:.7,rot:.5});","if(window.BRING115===false){addFx('bomb_hexring',x,y,60*k,R,720,{col:'#00f5d4',alpha:.95,ease:'out'});addFx('bomb_hexring',x,y,30*k,R*.6,560,{col:'#9bffd4',alpha:.7,rot:.5});}")
rep("function draw(){const r=grade();if(!r)return;","function draw(){if(window.__clean118)return;const r=grade();if(!r)return;")  # V118: tàu vẽ lại không có quầng hạng tròn
# V117 · REVIEW117 dòng đạn chính / tia nối / chớp quái
rep("stretch=1+Math.min(.55,speed/2200),","stretch=1+Math.min(window.SHOT117&&SHOT117.on?SHOT117.st(D.kind)-1:.55,speed/2200),")
rep("*(VIVID68.on?VIVID68.size:1),a=","*(VIVID68.on?VIVID68.size:1)*(window.SHOT117&&SHOT117.on&&l===4?SHOT117.l4(scale):1),a=")
rep("g.globalAlpha*=l===4?(VIVID68.on?(D.kind==='plume'||D.kind==='petal'?.82:.92):(D.kind==='plume'||D.kind==='petal'?.58:.75)):1;","g.globalAlpha*=(window.SHOT117&&SHOT117.on&&SHOT117.boss())?SHOT117.al(s,D.kind):l===4?(VIVID68.on?(D.kind==='plume'||D.kind==='petal'?.82:.92):(D.kind==='plume'||D.kind==='petal'?.58:.75)):1;")
rep("g.scale(size,size*stretch);g.drawImage(frame.img,-frame.ax,-frame.ay);g.restore();","{const q117=window.SHOT117&&SHOT117.on&&l===4?SHOT117.ws(D.kind):null;g.scale(size*(q117?q117[0]:1),size*stretch*(q117?q117[1]:1));}g.drawImage(frame.img,-frame.ax,-frame.ay);g.restore();")
rep("ctx.globalAlpha=.45;for(let i=1;i<list.length;i+=3)","ctx.globalAlpha=window.SHOT117===false?.45:.25;for(let i=1;i<list.length;i+=3)")
rep("e.hitFlashTimer=.045;e.hitFlashUntil=clock+.045;","e.hitFlashTimer=.055;e.hitFlashUntil=clock+.055;")
# V122 · bỏ các vòng tròn còn sót (chủ dự án: không vòng tròn quanh tàu / quái); bật lại: window.RING122=true
rep("const m=gear&&gear.m7;const st5=stars(curIdx())>=5;if((m&&m.set||st5)&&(mode==='play'||mode==='pause')){","const m=gear&&gear.m7;const st5=stars(curIdx())>=5;if(window.RING122===true&&(m&&m.set||st5)&&(mode==='play'||mode==='pause')){")
rep("if(invuln>0&&mode==='play'){ctx.strokeStyle='#e5fff2';","if(window.RING122===true&&invuln>0&&mode==='play'){ctx.strokeStyle='#e5fff2';")
rep("if(gear.legendCannon||gear.legendArmor||gear.legendEngine||gear.legendReactor||gear.legendMissiles||gear.legendMagnet){ctx.strokeStyle='#ffd68477'","if(window.RING122===true&&(gear.legendCannon||gear.legendArmor||gear.legendEngine||gear.legendReactor||gear.legendMissiles||gear.legendMagnet)){ctx.strokeStyle='#ffd68477'")
rep("safeArc(ctx,440,150,100,0,TAU);ctx.strokeStyle='#96ccb818';","safeArc(ctx,440,150,100,0,TAU);ctx.strokeStyle=window.RING122===true?'#96ccb818':'#96ccb800';")
rep('function drawAwaken(){if(AW.wave>=0){','function drawAwaken(){if(AW.wave>=0&&window.RING122===true){')
rep('for(const b of beams){if(!(b.age<b.warn))continue;const u=clamp01(b.age/b.warn);','for(const b of beams){if(!(b.age<b.warn)||window.BEAM122!==false)continue;const u=clamp01(b.age/b.warn);')
# V122 · REVIEW122 nhóm 1: laser boss gọn, khung lõi boss → 4 góc ngắm, tàu hỗ trợ lùi xuống
rep("function beam(b,angle,length){const color=(b.color||'#ff7a4d').slice(0,7),w=b.width,clock=time;","function beam(b,angle,length){if(window.__beam122&&window.__beam122(b,angle,length))return;const color=(b.color||'#ff7a4d').slice(0,7),w=b.width,clock=time;")
rep('ctx.beginPath();ctx.roundRect(b.x-67,b.y-38,134,76,12);ctx.stroke();','if(window.BOX122===false){ctx.beginPath();ctx.roundRect(b.x-67,b.y-38,134,76,12);ctx.stroke();}else{ctx.globalAlpha=Math.min(ctx.globalAlpha,.35);ctx.lineWidth=1.5;ctx.beginPath();for(const [cx,cy,sx,sy] of [[b.x-67,b.y-38,1,1],[b.x+67,b.y-38,-1,1],[b.x-67,b.y+38,1,-1],[b.x+67,b.y+38,-1,-1]]){ctx.moveTo(cx+sx*8,cy);ctx.lineTo(cx,cy);ctx.lineTo(cx,cy+sy*8);}ctx.stroke();}')
rep('pods[i].y+=(player.y+12+4*Math.sin(time*4.8+i*Math.PI)-pods[i].y)*k;','pods[i].y+=(player.y+(window.FORM122!==false?26:12)+4*Math.sin(time*4.8+i*Math.PI)-pods[i].y)*k;')
rep("stampA(3,e.row,e.x,e.y,r*2,r*2,fade*(quiet?.2:.6));","if(window.RING122===true)stampA(3,e.row,e.x,e.y,r*2,r*2,fade*(quiet?.2:.6));")  # V125: bỏ vòng sóng khi Bạo Tẩu
rep("for(const s of shock){const u=s.t/.7,r=30+u*(s.big?260:120);","for(const s of (window.RING122===true?shock:[])){const u=s.t/.7,r=30+u*(s.big?260:120);")  # V125: bỏ vòng sóng boss chết
rep("ctx.globalAlpha=a*.28;ctx.save();ctx.translate(player.x,player.y-40);ctx.rotate(s*.25);ctx.drawImage(r,-230,-230,460,460);if(!lt){ctx.rotate(-s*.6);ctx.globalAlpha=a*.18;ctx.drawImage(r,-130,-130,260,260);}ctx.restore();","if(window.RING122===true){ctx.globalAlpha=a*.28;ctx.save();ctx.translate(player.x,player.y-40);ctx.rotate(s*.25);ctx.drawImage(r,-230,-230,460,460);if(!lt){ctx.rotate(-s*.6);ctx.globalAlpha=a*.18;ctx.drawImage(r,-130,-130,260,260);}ctx.restore();}")  # V131: bỏ pháp trận tròn quanh robot SSS
rep("const eng=makeSuperV2(100+i,{theme:T,hullSize:250,","const eng=makeSuperV2(100+i,{theme:((window.RIG131===false||(typeof CANH132_ART!=='undefined'&&window.WING132!==false&&window.RIG131!==true))?{...T,rig:T.rig.map(p=>({...p,l:0})),wing:null}:{...T,rig:T.rig.map(p=>({...p,l:p.l*1.45,w:(p.w||.5)*1.25,ox:(p.ox||0)*1.2}))}),hullSize:250,")  # V131: cánh robot SSS bung to hơn ×1,45 (chờ tranh cánh GPT)
rep("f.draw(ctx,W,H,time,on,{...opts(),cx:player.x,cy:player.y,S,rot:(bank||0)*.5,duration:.9,","try{window.__wing132&&window.__wing132(ctx,i,player.x,player.y,S,f.bloom(),phase,time);}catch(e){}f.draw(ctx,W,H,time,on,{...opts(),cx:player.x,cy:player.y,S,rot:(bank||0)*.5,duration:.9,")  # V132: cánh tranh GPT sau robot
rep("const f=get(i),uon=ultOn(),on=superTime>0||uon,S=S_GAME+.04*f.bloom(),","const f=get(i),uon=ultOn(),on=superTime>0||uon,S=S_GAME+.04*f.bloom()+(typeof SSS_ATLAS_BAY!=='undefined'?(window.ROB134===false?.08:.36)*f.bloom():0),")  # V132: bù cỡ robot sau khi đặt tâm giữa lưng
rep("if(rescueTimer<=0){rescueTimer+=45;","if(window.RESCUE134===true&&rescueTimer<=0){rescueTimer+=45;")  # V134: bỏ kén giải cứu đồng minh
rep("const upper=player.y<H/2,space=upper?29:59,","const upper=player.y<H/2,space=window.SPREAD134===false?(upper?29:59):(upper?46:(window.SIDE138===false?86:100)),")  # V134: tàu con hộ tống tách xa hơn
# V139/V140 · chủ dự án: trong trận không hiện hình tên lửa và giáp (như game gốc; tắt: MIS139=false / ARM140=false); đạn + kỹ năng tên lửa bắn ra từ thân chiến cơ (tắt: window.MIS139=false)
rep("const origin=i=>({x:clamp(player.x+(i.kind==='sidearm'?-43:i.kind==='missiles'?43:0),24,W-24),y:player.y+8});","const origin=i=>({x:clamp(player.x+(i.kind==='sidearm'?-43:i.kind==='missiles'?(window.MIS139===false?43:0):0),24,W-24),y:player.y+(i.kind==='missiles'&&window.MIS139!==false?-14:8)});")
rep("if(i.kind==='missiles'){sprite(i,player.x,player.y+38,30+Workshop.index(i.grade)*3);continue;}","if(i.kind==='armor'&&window.ARM140!==false)continue;if(i.kind==='missiles'){if(window.MIS139===false)sprite(i,player.x,player.y+38,30+Workshop.index(i.grade)*3);continue;}")
rep("D[k+i]=Math.min(255,base[i]+col*dd*.72+cc[i]*fil*.45+cb[i]*Math.pow(dd,3)*.28);","{const v=base[i]+col*dd*.72+cc[i]*fil*.45+cb[i]*Math.pow(dd,3)*.28;D[k+i]=window.NEB155===false?Math.min(255,v):(v<110?v:Math.min(255,110+(v-110)*.35));}")  # V155: nén vùng sáng tinh vân nền (chủ dự án bị lóa ở ải 12). Tắt: NEB155=false
rep("for(let k=0;k<5;k++)blob(R()*cw,R()*ch,40+R()*70,.12+R()*.1,pal[1+(k%2)]);","for(let k=0;k<5;k++)blob(R()*cw,R()*ch,40+R()*70,(.12+R()*.1)*(window.NEB155===false?1:.5),pal[1+(k%2)]);")  # V155: cụm sáng nền ×0,5
rep('function loop(t) {\n  frameDtC=Number.isFinite(t)&&last>0?clamp((t-last)/1000,0,.25):0;','function loop(t) {\n  if(window.FPS155!==false&&Number.isFinite(t)&&last>0&&t-last<10.5){requestAnimationFrame(loop);return;}/* V155: màn 120 Hz (Z Fold 6) → vẽ tối đa ~60 khung/s, đỡ nóng máy. Tắt: FPS155=false */\n  frameDtC=Number.isFinite(t)&&last>0?clamp((t-last)/1000,0,.25):0;')
rep("  function draw() {\n    if (VisualFX.counts().quality==='light'||","  function draw() {\n    if (window.BLOOM155!==true||VisualFX.counts().quality==='light'||")  # V155: tắt bloom mặc định (gây nhòe sáng + nặng máy). Bật: BLOOM155=true
rep("ctx.fillStyle=`rgba(190,255,230,${flash})`;ctx.fillRect(0,0,W,H);","ctx.fillStyle=`rgba(190,255,230,${window.FLASH155===false?flash:Math.min(flash,.12)})`;ctx.fillRect(0,0,W,H);")  # V154: chủ dự án bị lóa ở ải 12 → lớp phủ trắng toàn màn tối đa 12% (bom 40%, boss chết 35% trước đây). Tắt: FLASH155=false
rep("function text(x,y,s,c){st.texts.push({x,y,s,c,t:0});","function text(x,y,s,c){if(window.TEXT125!==true)return;st.texts.push({x,y,s,c,t:0});")  # V125: bỏ chữ nổi khi nhặt đồ trong trận
rep("Math.min(value, window.GFX66==='light'?1.25:2) : 1;","Math.min(value, window.GFX66==='light'?1.5:2, window.RS105||9) : 1;")  # V105 độ phân giải động
rep("if(s&&s.crit66&&e&&(mode==='play')&&","if(s&&s.crit66&&e&&(mode==='play')&&window.TXT102===false&&")  # V105 bỏ tính chữ X2 khi đã ẩn
# ---- V202 · hiệu năng + đọc trận: vật phẩm rơi (xem src/v183.js) ----
rep("const n=e.elite?3:e.large?2:Math.random()<.4?1:0;for(let k=0;k<n;k++)spawn('star',e.x+(k-(n-1)/2)*12,e.y,{big:e.elite||e.large,vy:-60-Math.random()*40});",
 "if(window.DROP183===false){const n=e.elite?3:e.large?2:Math.random()<.4?1:0;for(let k=0;k<n;k++)spawn('star',e.x+(k-(n-1)/2)*12,e.y,{big:e.elite||e.large,vy:-60-Math.random()*40});}else{const big=!!(e.elite||e.large),val=e.elite?180:e.large?120:56;if(big||Math.random()<.25){let ns=0;for(const q of drops)if(!q.dead&&q.type==='star')ns++;if(ns>=10)score+=val;else spawn('star',e.x,e.y,{big,val,vy:-60-Math.random()*40});}}")
rep("score+=d.big?60:35;","score+=d.val||(d.big?60:35);")
rep("ctx.save();ctx.translate(d.x,d.y);ctx.rotate(rot);const pk51=typeof Pickup51!=='undefined'&&Pickup51.img('star');","{const c183=typeof STAR183!=='undefined'&&STAR183(!!d.big,s);if(c183){ctx.globalCompositeOperation='source-over';ctx.drawImage(c183,d.x-c183.w/2,d.y-c183.w/2,c183.w,c183.w);continue;}}ctx.save();ctx.translate(d.x,d.y);ctx.rotate(rot);const pk51=typeof Pickup51!=='undefined'&&Pickup51.img('star');")
rep("if(!L&&!d.park51){ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.7;","if(!L&&!d.park51&&window.DROP183===false){ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.7;")
rep("const ra=Q?0:T*2.4+(d.ph||0);ctx.beginPath();ctx.ellipse(d.x,y,23,8,0,ra,ra+Math.PI*1.25);ctx.stroke();","const ra=Q?0:T*2.4+(d.ph||0),o183=window.DROP183===false;if(o183){ctx.beginPath();ctx.ellipse(d.x,y,23,8,0,ra,ra+Math.PI*1.25);ctx.stroke();}")
rep("ctx.globalCompositeOperation='lighter';ctx.beginPath();ctx.ellipse(d.x,y,23,8,0,ra+Math.PI*1.25,ra+TAU);ctx.stroke();","if(o183){ctx.globalCompositeOperation='lighter';ctx.beginPath();ctx.ellipse(d.x,y,23,8,0,ra+Math.PI*1.25,ra+TAU);ctx.stroke();}")
rep("if(!Q&&!L){const k=(T*1.3+(d.ph||0))%1;ctx.globalAlpha=(1-k)*.6*((blink?.35:1)*(d.fade51||1));","if(!Q&&!L&&o183){const k=(T*1.3+(d.ph||0))%1;ctx.globalAlpha=(1-k)*.6*((blink?.35:1)*(d.fade51||1));")
rep("ctx.font='bold 9px Neo,sans-serif';ctx.textAlign='center';ctx.fillStyle='#04070e';ctx.fillText(s.label,d.x+1,y+29);ctx.fillStyle=s.c;ctx.fillText(s.label,d.x,y+28);","if(o183){ctx.font='bold 9px Neo,sans-serif';ctx.textAlign='center';ctx.fillStyle='#04070e';ctx.fillText(s.label,d.x+1,y+29);ctx.fillStyle=s.c;ctx.fillText(s.label,d.x,y+28);}")
rep("ctx.globalCompositeOperation='lighter';for(const f of st.fx){","ctx.globalCompositeOperation='lighter';if(window.DROP183===false)for(const f of st.fx){")
rep("if(pending){ctx.globalAlpha=VisualFX.reduced()?.9:.65+.25*Math.sin(warning*12);ctx.fillStyle='#780f27dd';","if(pending&&window.BOSS183===false){ctx.globalAlpha=VisualFX.reduced()?.9:.65+.25*Math.sin(warning*12);ctx.fillStyle='#780f27dd';")
rep("const a=warnT,y=H*.56,hh=40,","const b183=window.BOSS183!==false,a=warnT,y=b183?H*.16:H*.56,hh=b183?12:40,")
rep("ctx.fillText('LV.'+level+' · '+(level%10===0?'BOSS LỚN':'BOSS NHỎ')+' ĐANG TIẾN VÀO · CHUẨN BỊ NÉ ĐẠN',W/2,y+18);","ctx.fillText(b183&&typeof BOSSNM183==='function'&&BOSSNM183()?'LV.'+level+' · '+(level%10===0?'BOSS LỚN':'BOSS NHỎ')+' · '+BOSSNM183().toUpperCase():'LV.'+level+' · '+(level%10===0?'BOSS LỚN':'BOSS NHỎ')+' ĐANG TIẾN VÀO · CHUẨN BỊ NÉ ĐẠN',W/2,y+18);")
rep("if(!popped&&lb&&!lb.hidden&&!busy()&&root.hidden&&!dailyState().claimed&&","if(!popped&&lb&&!lb.hidden&&!busy()&&root.hidden&&!dailyState().claimed&&typeof Onboard66!=='undefined'&&Onboard66.open('daily')&&")
rep("</body>","<script id=\"v192-js\">"+open('src/v192.js',encoding='utf-8').read()+"</script></body>")
# V202 · tranh GPT: nền 3 lớp chương 1–5 + hoạt cảnh mở rương
import io as _io194, base64 as _b194
from PIL import Image as _I194
def _w194(path,q,size=None,rgb=False):
    im=_I194.open(path);im=im.convert('RGB') if rgb else im.convert('RGBA')
    if size:im=im.resize(size,_I194.LANCZOS)
    b=_io194.BytesIO();im.save(b,'WEBP',quality=q,method=6);return 'data:image/webp;base64,'+_b194.b64encode(b.getvalue()).decode()
NEN194A={}
for _c in range(1,11):  # V208: thêm đợt B (chương 6–10; chương 8–10 chưa có lớp xa → giữ nền xa cũ)
    if os.path.exists('src/nen194/ch%d_xa.png'%_c):NEN194A['ch%d_xa'%_c]=_w194('src/nen194/ch%d_xa.png'%_c,88,rgb=True)
    if os.path.exists('src/nen194/ch%d_giua.png'%_c):NEN194A['ch%d_giua'%_c]=_w194('src/nen194/ch%d_giua.png'%_c,84)
    if os.path.exists('src/nen194/ch%d_gan.png'%_c):NEN194A['ch%d_gan'%_c]=_w194('src/nen194/ch%d_gan.png'%_c,84)
HAZ208A={_n:_w194('src/haz208/%s.png'%_n,88,(160,160)) for _n in ('thien_thach','thap_phao_de','thap_phao_nong')}
RUONG194A={}
for _n,_q,_sz in [('ruong_dong',88,(320,320)),('ruong_mo',88,(320,320)),('ruong_nap',88,(320,320)),('cot_sang_lam',85,None),('cot_sang_tim',85,None),('cot_sang_vang',85,None),('cot_sang_cam',85,None),('tia_nang_sss',82,(512,512)),('hat_sang',90,None)]:
    RUONG194A[_n]=_w194('src/ruong194/%s.png'%_n,_q,_sz)
rep("im67=((typeof Ch9!=='undefined'?Ch9.bgFor(level):null)||(typeof Ch10!=='undefined'?Ch10.bgFor(level):null))","im67=((typeof Ch9!=='undefined'?Ch9.bgFor(level):null)||(typeof Ch10!=='undefined'?Ch10.bgFor(level):null)||(typeof NEN194!=='undefined'?NEN194.far(level):null))")
rep("ctx.restore();\n  if(lightQ)return;","ctx.restore();try{if(typeof NEN194!=='undefined')NEN194.draw(dt,still);}catch{}\n  if(lightQ)return;")
rep("ctx.save();for(const m of mids){","ctx.save();for(const m of ((typeof NEN194!=='undefined'&&NEN194.on())?[]:mids)){")
rep("if(typeof DeviceSave!=='undefined')DeviceSave.flush();}return reward;}","if(typeof DeviceSave!=='undefined')DeviceSave.flush();}try{if(typeof Ruong194!=='undefined')Ruong194.note(reward);}catch{}return reward;}")
rep("</body>","<style id=\"v194-css\">"+open('src/v194.css',encoding='utf-8').read()+"</style><script id=\"v194-art\">const NEN194_ART="+json.dumps(NEN194A)+";const RUONG194_ART="+json.dumps(RUONG194A)+";</script><script id=\"v194-js\">"+open('src/v194.js',encoding='utf-8').read()+"</script></body>")
# V202 · so sánh lực chiến khi thay trang bị (bảng trang bị của Hub40)
rep("return {v70:{items:()=>state.items,","return {cpWith202,v70:{items:()=>state.items,")
rep(" function equip(itemId){if(locked)return false;"," function cpWith202(itemId){const i=get(itemId);if(!i)return null;const k=i.kind,o=state.equipped[k];let cp=null;try{state.equipped[k]=i.id;cp=Combat.stats().cp;}catch{}state.equipped[k]=o;try{Combat.stats();}catch{}return cp;}\n function equip(itemId){if(locked)return false;")
rep("<div class=\"hb-acts\"><button class=\"hb-btn ${isEq?'':'cyan'}\" id=\"sh-eq\"","${(!isEq&&window.CMP202!==false&&Progress.cpWith202)?(()=>{let a=null,b=null;try{a=Combat.stats().cp;b=Progress.cpWith202(it.id);}catch{}if(a==null||b==null)return '';const d=Math.round(b-a);return `<div class=\"g202\"><span>Lực chiến nếu trang bị</span><b>${Math.round(a).toLocaleString('vi-VN')} → ${Math.round(b).toLocaleString('vi-VN')}</b><i class=\"${d>0?'up':d<0?'dn':'eq'}\">${d>0?'▲ +'+d:d<0?'▼ '+d:'='}</i></div>`;})():''}<div class=\"hb-acts\"><button class=\"hb-btn ${isEq?'':'cyan'}\" id=\"sh-eq\"")
# V203 · ECON_AND_CHIP_PITY_V203 (Gemini 08/11): chip72 tẩy dòng khóa nhóm + bảo hiểm 10; adv69/adv70 càn quét Nguyệt Thực 1/2/3; gear45 đổi Tinh Hạch 25/tuần. Tắt: window.ECON203=false
rep("</body>","<style id=\"v202-css\">"+open('src/v202.css',encoding='utf-8').read()+"</style></body>")
# V204 · EVENT_ENDGAME_V204 (Gemini 08/11): cuối tuần + Chiến cơ của tuần (src/v204.js) · tiệm cuối game + chip tuần trong src/event83.js. Tắt: window.EV204=false
rep("</body>","<style id=\"v204-css\">"+open('src/v204.css',encoding='utf-8').read()+"</style><script id=\"v204\">"+open('src/v204.js',encoding='utf-8').read()+"</script></body>")
# V205 · SHIP_AND_GEAR_BAL_V205 (Gemini 08/11): bước B hệ số 13 tàu trong src/v120.js (K205) · bước A trang bị theo bậc tàu + bù máu boss (src/v205.js). Tắt: window.BAL205=false
rep("</body>","<script id=\"v205\">"+open('src/v205.js',encoding='utf-8').read()+"</script></body>")
# V206 · Gemini+GPT 08/11: bảng tổng kết sau trận, phản hồi hạ boss, luyện tập boss, phản chấn vỡ cánh (src/v206.js/.css). Tắt: window.V206=false
rep("</body>","<style id=\"v206-css\">"+open('src/v206.css',encoding='utf-8').read()+"</style><script id=\"v206\">"+open('src/v206.js',encoding='utf-8').read()+"</script></body>")
# V207 · Gemini 08/11: Thử thách ngày (5 biến thể) + Boss Rush 4 boss (src/v207.js/.css). Tắt: window.V207=false
rep("</body>","<style id=\"v207-css\">"+open('src/v207.css',encoding='utf-8').read()+"</style><script id=\"v207\">"+open('src/v207.js',encoding='utf-8').read()+"</script></body>")
# V208 · G1 (v120.js: hiệu ứng tuổi âm sau khi đồng hồ trận về 0) + G2 (thoại cốt truyện không đè thẻ kết quả, src/v208.js/.css)
rep("</body>","<style id=\"v208-css\">"+open('src/v208.css',encoding='utf-8').read()+"</style><script id=\"v208\">"+open('src/v208.js',encoding='utf-8').read()+"</script></body>")
# V208 · chướng ngại chương 6–10 (src/haz208.js + tranh GPT src/haz208/). Tắt: window.HAZ208=false
# V209 · hằng số Gemini (phải trước haz208)
rep("</body>","<script id=\"v209cfg\">"+open('src/v209cfg.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"haz208\">const HAZ208_ART="+json.dumps(HAZ208A)+";\n"+open('src/haz208.js',encoding='utf-8').read()+"</script></body>")
# V209 · D7 nội tại giáp theo sự kiện + G3 thanh máu boss (play47.js) + nền xa ch8–10. Tắt: window.ARMOR_EV209=false
rep("</body>","<style id=\"v209-css\">"+open('src/v209.css',encoding='utf-8').read()+"</style><script id=\"v209\">"+open('src/v209.js',encoding='utf-8').read()+"</script></body>")
# V212 · phòng trưng bày hologram (định hướng mỹ thuật mới). Tắt: window.HOLO212=false
rep("</body>","<script id=\"holo212-art\">"+open('src/holo212_art.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<style id=\"holo212-css\">"+open('src/holo212.css',encoding='utf-8').read()+"</style><script id=\"holo212\">"+open('src/holo212.js',encoding='utf-8').read()+"</script></body>")
# V215 · mục B: phe ta không dùng đỏ / hồng của đạn địch (đạn + chớp nòng tàu 4 → lục acid, tranh trúng đích, đạn Bạo Tẩu dự phòng, cầu vồng mức 4 Evo53, màu hồ sơ tàu 1–9). Tắt: window.FX215=false
rep("['#fff0b0','#ff9454','#ff84b0']","['#fff0b0','#ff9454',(window.Fx215&&window.FX215!==false?Fx215.ship():'#ff84b0')]")
rep("</body>","<script id=\"fx215-js\">"+open('src/fx215.js',encoding='utf-8').read()+"</script></body>")
# V218 · Bạo Tẩu: mảnh rời lửa / sét / ánh sáng theo từng tàu (GPT thiết kế) + máy chuyển động. Thư mục rỗng = không đổi gì. Tắt: window.BTFX218=false
_BT218={}
for _p in sorted(_g.glob(os.path.join(os.environ.get('BTFX218_DIR','src/btfx218'),'tau*_fx_*.png'))):
    _n=os.path.splitext(os.path.basename(_p))[0];_num,_k=_n[3:].split('_fx_',1);_im=_I.open(_p).convert('RGBA')
    # V221: mảnh hiệu ứng vẽ trên NỀN ĐEN (không có vùng trong suốt) → tự tách nền: alpha = kênh sáng nhất, màu chia lại cho alpha để giữ đúng độ rực khi cộng sáng
    import numpy as _np;_a=_np.asarray(_im).astype('float32')
    if _a[...,3].min()>250:
        _m=_a[...,:3].max(-1);_al=_np.clip((_m-6)/249*255,0,255);_rgb=_np.where(_m[...,None]>0,_a[...,:3]/_np.maximum(_m[...,None],1)*255,0)
        _im=_I.fromarray(_np.dstack([_rgb,_al]).clip(0,255).astype('uint8'),'RGBA');print('  tach nen den:',_n)
    # V221: quay tông bộ mảnh theo tàu (độ) khi màu đèn đổi sau lúc GPT đã vẽ. Tàu 10: lục vàng ~90° → lục radar ~120°
    _dh={'10':30}.get(str(int(_num)),0) if not _k.startswith(('khien','drone')) else 0  # V237: lớp khiên / tàu con mới đã đúng màu
    if _dh:
        _h=_np.asarray(_im.convert('RGB').convert('HSV')).copy();_h[...,0]=((_h[...,0].astype('int32')+round(_dh/360*255))%256).astype('uint8')
        _rgb2=_I.fromarray(_h,'HSV').convert('RGB');_im=_I.merge('RGBA',(*_rgb2.split(),_im.split()[3]))
    _bf=_io.BytesIO();_im.save(_bf,'WEBP',quality=90)
    _BT218.setdefault(str(int(_num)-1),{})[_k]='data:image/webp;base64,'+_b64.b64encode(_bf.getvalue()).decode()
print('V218 bo manh Bao Tau:',{k:len(v) for k,v in _BT218.items()})
# V231 · chủ dự án 12/11 13:17: lúc Bạo Tẩu tàu KHÔNG nhấp nháy (vẫn bất tử như cũ) để thân + cánh bung không bị tắt từng khung. Tắt: window.BLINK231=false
rep("invuln<=0||Math.floor(time*12)%2===0||mode==='menu'","invuln<=0||Math.floor(time*12)%2===0||mode==='menu'||(window.BLINK231!==false&&superTime>0)")
# V233 · 3) sảnh tự bung theo chu kỳ (học từ video đồ giám): 16 s = bung ở 3 s và 11 s (giữ 3,5 s), kỹ năng ở 8 s. Tắt: window.AUTO233=false
rep("if(D.auto){const c=D.t%15;if(c<dt&&D.t>1)setPhase('normal');if(c>=5&&c-dt<5)setPhase('skill');if(c>=8.5&&c-dt<8.5)setPhase('super');}","if(D.auto&&window.AUTO233!==false){const c=D.t%16,at=(x)=>c>=x&&c-dt<x;if(c<dt&&D.t>1)setPhase('normal');if(at(3)||at(11))setPhase('super');if(at(8))setPhase('skill');if(D.phase==='super'&&D.phaseT>3.5)setPhase('normal');}else if(D.auto){const c=D.t%15;if(c<dt&&D.t>1)setPhase('normal');if(c>=5&&c-dt<5)setPhase('skill');if(c>=8.5&&c-dt<8.5)setPhase('super');}")
rep("</body>","<script id=\"btfx218-art\">const BTFX218_ART="+(json.dumps(_BT218,separators=(',',':')) if os.environ.get('BTFX_CU')=='1' else '{}')+";</script><script id=\"btfx218-js\">"+open('src/btfx218.js',encoding='utf-8').read()+"</script></body>")
rep("if(bg){const BGA=typeof SKIN15_BG","if(window.HOLO212Draw&&HOLO212Draw(g,SW,SH,shipY+40*k,k,clock,current())){}else if(bg){const BGA=typeof SKIN15_BG")
rep("cut*k,ww*k,hh*k);}catch{}}\n  // nhãn pha","cut*k,ww*k,hh*k);}catch{}}\n  try{window.HOLO212Tint&&HOLO212Tint(g,SW,SH,shipY+40*k,k);}catch{}\n  // nhãn pha")
rep("shield=Math.max(0,shield-enemyScale())","shield=Math.max(0,shield-enemyScale()*(typeof SURV200!=='undefined'?SURV200.m():1))")  # V202 SURVIVE_BAL_V200
rep("hp=Math.max(0,hp-enemyScale())","hp=Math.max(0,hp-enemyScale()*(typeof SURV200!=='undefined'?SURV200.m():1))")
rep("</body>","<script id=\"v201-js\">"+open('src/v201.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<style id=\"v200-css\">"+open('src/v200.css',encoding='utf-8').read()+"</style><script id=\"v200-js\">"+open('src/v200.js',encoding='utf-8').read()+"</script></body>")  # V202 phòng tập bắn
rep("</body>","<style id=\"v199-css\">"+open('src/v199.css',encoding='utf-8').read()+"</style><script id=\"v199-js\">"+open('src/v199.js',encoding='utf-8').read()+"</script></body>")  # V202 hoàn thiện APK
rep("function fusionView(){","function fusionView(){if(typeof HT197V!=='undefined'&&HT197V.on())return HT197V.view({body,title,F_,toast:m=>toast(m),re:()=>fusionView(),timg,openCraft:k=>{cur=k;open('craft');document.querySelectorAll('#tabbar [data-tb]').forEach(x=>x.setAttribute('aria-current',String(x.dataset.tb==='hangar')));}});")  # V202 màn hợp thể gọn
rep("</body>","<style id=\"v197-css\">"+open('src/v197.css',encoding='utf-8').read()+"</style><script id=\"v197-js\">"+open('src/v197.js',encoding='utf-8').read()+"</script></body>")
rep("VisualFX.drawShot(s);if(s.enhance>0){","VisualFX.drawShot(s);if(s.enhance>0&&window.ENH194===true){")  # V196: bỏ vòng elip quanh đạn trang bị cường hóa (luật không vòng)
rep("type,damage:damage*allyDamageScale()*gear.damage*(activeRobot?1.25:1)*(","type,damage:damage*allyDamageScale()*gear.damage*(activeRobot?1.25:1)*(mainVolley&&typeof Chip72!=='undefined'&&Chip72.shipM?Chip72.shipM():1)*(")  # V196: dòng chip gắn tên chiến cơ (chỉ loạt đạn chính)
rep("</body>","<script id=\"v191-js\">"+open('src/v191.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"v188-js\">"+open('src/v188.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"v185-art\">const SAO185=\"data:image/png;base64,"+base64.b64encode(open('src/v185/sao_diem_32.png','rb').read()).decode()+"\",MANH185=\"data:image/png;base64,"+base64.b64encode(open('src/v185/manh_chien_co_ngay4_128.png','rb').read()).decode()+"\";</script><script id=\"v183-js\">"+open('src/v183.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<style id=\"story259-css\">"+open('src/story259.css',encoding='utf-8').read()+"</style><script id=\"story259-js\">"+open('src/story259.js',encoding='utf-8').read()+"</script></body>")  # V259 câu chuyện 13 chiến cơ ở sảnh
rep("for(const pod of Battle28.support()){ctx.save();sprite(i,pod.x,pod.y,38+i.spec.rank*2);","for(const pod of Battle28.support()){try{window.EqGlow264&&EqGlow264.under(ctx,i,pod,38+i.spec.rank*2)}catch{};ctx.save();sprite(i,pod.x,pod.y,38+i.spec.rank*2);")  # V264 trang bị tỏa màu riêng lúc Bạo Tẩu
rep("</body>","<script id=\"eqglow264-js\">"+open('src/eqglow264.js',encoding='utf-8').read()+"</script></body>")
# V299 đạn mới theo tranh Gemini (tàu 1 trước)
_d299={k:(n) for k,n in [('tau1_cau_lua',3),('tau1_cau_lua_bt',3),('tau3_khoi_bang',2),('tau3_manh_bang',2),('tau4_vuot',2),('tau4_vuot_bt',2),('tau5_quang_tien',2),('tau6_khoi_pixel',3),('tau7_kiem_khi',2),('tau7_kiem_khi_bt',2),('tau8_ten_lua_nhiet',2),('tau10_cau_luc_giac',2),('tau11_cau_ho_den',3),('tau12_dia_banh_rang',2),('tau13_luoi_hai',2),('tau13_luoi_hai_bt',2)]}  # V302: đạn 13 tàu
_d299js='window.DAN299_IMG={'+','.join('"%s":["data:image/png;base64,%s",%d]'%(k,base64.b64encode(open('src/vu_khi295/%s.png'%k,'rb').read()).decode(),n) for k,n in _d299.items())+'};'
rep("</body>","<script id=\"dan299-js\">"+_d299js+open('src/dan299.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"co303-js\">"+open('src/co303.js',encoding='utf-8').read()+"</script></body>")  # V303 cơ chế đạn
_vk304=['tl_01_hoa_nguc','tl_02_han_suong','tl_03_loi_kich','tl_04_ngu_loi','tl_05_xoan_oc','tl_06_thien_tinh','tl_07_thien_kiem','tl_08_diet_tinh','tl_09_phan_quyet','tl_10_bay_dan','tl_11_huyet_tinh','tl_12_qua_khu','tl_13_tram_khong','vp_nguyet_nhan','vp_quang_thuong','vp_dong_ho_cat','vp_luc_lang','vp_cau_trong_luc','vp_tinh_the_bang','vp_loi_thon_phe','vp_mui_an_trien','vp_an_trien']  # V305: +6 vũ khí phụ đợt 2
_vk304js='window.GEARVK304_IMG={'+','.join('"%s":["data:image/png;base64,%s",2]'%(k,base64.b64encode(open('src/vu_khi295/%s.png'%k,'rb').read()).decode()) for k in _vk304)+'};'
rep("</body>","<script id=\"gearvk304-js\">"+_vk304js+open('src/gearvk304.js',encoding='utf-8').read()+"</script></body>")  # V304 hình đạn trang bị
def _ui306css(c):
    for _f in sorted(glob.glob('src/ui306/*.png')):
        c=c.replace('url(ui306/%s)'%os.path.basename(_f),'url(data:image/png;base64,'+base64.b64encode(open(_f,'rb').read()).decode()+')')
    for _f in sorted(glob.glob('src/ui306n/*.png')):
        c=c.replace('url(ui306n/%s)'%os.path.basename(_f),'url(data:image/png;base64,'+base64.b64encode(open(_f,'rb').read()).decode()+')')
    return c
rep("</body>","<script id=\"bw306-js\">"+open('src/bw306.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"uisnd306-js\">"+open('src/ui_snd306.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"stars306-js\">"+open('src/stars306.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"x2-306\">"+open('src/x2_306.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"icon306-js\">"+open('src/icon306.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"bar306-js\">"+open('src/bar306.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"tier306-js\">"+open('src/tier306.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"reward306-js\">"+open('src/reward306.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"card306-js\">"+open('src/card306.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"opt306-js\">"+open('src/opt306.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"warn307-js\">"+open('src/warn307.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"sanh307-js\">"+open('src/sanh307.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"target307-js\">"+open('src/target307.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"vt307-js\">"+open('src/vt307.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"truyen307-js\">"+open('src/truyen307.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"pstory307-js\">"+open('src/pstory307.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<style id=\"ui306-css\">"+_ui306css(open('src/ui306.css',encoding='utf-8').read())+"</style></body>")  # V306 giao diện đợt 1
# V307 · tranh lớn nửa trên (GPT): src/tranh307/<khóa>.png|jpg|webp → TRANH307 (băng: nhiem_vu/mua_giai/diem_danh/qua, rộng ≤720; phi_cong_1..8 cao ≤720)
from PIL import Image as _Im307
import io as _io307
_T307={}
for _p in sorted(glob.glob('src/tranh307/*.png')+glob.glob('src/tranh307/*.jpg')+glob.glob('src/tranh307/*.webp')):
    _k=os.path.splitext(os.path.basename(_p))[0];_im=_Im307.open(_p).convert('RGBA')
    if _k.startswith('phi_cong_'):
        if _im.height>720:_im=_im.resize((round(_im.width*720/_im.height),720),_Im307.LANCZOS)
    elif _im.width>720:_im=_im.resize((720,round(_im.height*720/_im.width)),_Im307.LANCZOS)
    _b=_io307.BytesIO();_im.save(_b,'WEBP',quality=86,method=6);_T307[_k]='data:image/webp;base64,'+base64.b64encode(_b.getvalue()).decode()
print('tranh307:',sorted(_T307))
rep("</body>","<script id=\"tranh307-art\">const TRANH307="+json.dumps(_T307)+";</script><style id=\"tranh307-css\">"+_ui306css(open('src/tranh307.css',encoding='utf-8').read())+"</style><script id=\"tranh307-js\">"+open('src/tranh307.js',encoding='utf-8').read()+"</script></body>")  # V307 tranh nửa trên
rep("</body>","<style id=\"dd307-css\">"+_ui306css(open('src/dd307.css',encoding='utf-8').read())+"</style></body>")  # V307 điểm danh: ô ngày viền màu theo bậc
rep("</body>","<style id=\"hb307-css\">"+open('src/hb307.css',encoding='utf-8').read()+"</style><script id=\"hb307-js\">"+open('src/hb307.js',encoding='utf-8').read()+"</script></body>")  # V307 chi tiết trang bị gọn
rep("</body>","<script id=\"tn307-img-js\">window.TN307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/tainguyen307/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/tainguyen307'))})+";</script></body>")  # V307 biểu tượng tài nguyên (GPT 17/11)
rep("</body>","<script id=\"nc307-img-js\">window.NC307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/nc307img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/nc307img'))})+";</script></body>")  # V307 tranh GPT B3 màn nâng cấp/tiến khung
rep("</body>","<script id=\"daxp307-img-js\">window.DAXP307_IMG="+json.dumps({k:'data:image/webp;base64,'+base64.b64encode(open('src/da_xp307/da_xp_%d.webp'%k,'rb').read()).decode() for k in (1,2,3,4)})+";</script></body>")  # V307 biểu tượng Đá XP (GPT 17/11)
rep("</body>","<style id=\"nc307-css\">"+open('src/nc307.css',encoding='utf-8').read()+"</style><script id=\"nc307-js\">"+open('src/nc307.js',encoding='utf-8').read()+"</script></body>")  # V307 nâng cấp trang bị bằng XP
rep("state:()=>({view,seg,hidden:root.hidden","cur307:()=>cur,state:()=>({view,seg,hidden:root.hidden")  # V307 nc307 đọc chiến cơ đang xem
rep("</body>","<script id=\"xp307-js\">"+open('src/xp307.js',encoding='utf-8').read()+"</script></body>")  # V307 bảng rơi Đá XP
rep("</body>","<script id=\"da307-js\">"+open('src/da307.js',encoding='utf-8').read()+"</script></body>")  # V307 bỏ đá ⬢: chi phí đá → ◈×15, nguồn đá → Đá XP
rep("</body>","<script id=\"pskill307-js\">"+open('src/pskill307.js',encoding='utf-8').read()+"</script></body>")  # V307 24 mốc kỹ năng phi công
rep("</body>","<script id=\"hop307-img-js\">window.HOP307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/hop307img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/hop307img'))})+";</script><style id=\"hop307-css\">"+open('src/hop307.css',encoding='utf-8').read()+"</style><script id=\"hop307-js\">"+open('src/hop307.js',encoding='utf-8').read()+"</script></body>")  # V307 hộp thoại chung (GPT B5)
rep("</body>","<script id=\"kq307-img-js\">window.KQ307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/kq307img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/kq307img'))})+";</script><style id=\"kq307-css\">"+open('src/kq307.css',encoding='utf-8').read()+"</style><script id=\"kq307-js\">"+open('src/kq307.js',encoding='utf-8').read()+"</script></body>")  # V307 kết quả + hồi sinh (GPT B6)
rep("</body>","<script id=\"set307-img-js\">window.SET307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/set307img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/set307img'))})+";</script><style id=\"set307-css\">"+open('src/set307.css',encoding='utf-8').read()+"</style><script id=\"set307-js\">"+open('src/set307.js',encoding='utf-8').read()+"</script></body>")  # V307 hệ thống dạng lưới (GPT B7)
rep("</body>","<script id=\"pl307-img-js\">window.PL307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/pl307img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/pl307img'))})+";</script><style id=\"pl307b-css\">"+open('src/pl307b.css',encoding='utf-8').read()+"</style><script id=\"pl307b-js\">"+open('src/pl307b.js',encoding='utf-8').read()+"</script></body>")  # V307 tranh phi công (GPT B8)
rep("</body>","<script id=\"b9307-img-js\">window.B9307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/b9img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/b9img'))})+";</script><style id=\"b9307-css\">"+open('src/b9307.css',encoding='utf-8').read()+"</style><script id=\"b9307-js\">"+open('src/b9307.js',encoding='utf-8').read()+"</script></body>")  # V307 đồng bộ GPT B9
rep("</body>","<script id=\"b10307-img-js\">window.B10307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/b10img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/b10img'))})+";</script><style id=\"b10307-css\">"+open('src/b10307.css',encoding='utf-8').read()+"</style><script id=\"b10307-js\">"+open('src/b10307.js',encoding='utf-8').read()+"</script></body>")  # V307 tranh GPT B10 (bản thử)
_a307img='window.AURA307_IMG={'+','.join("'%s':'data:image/webp;base64,%s'"%(__import__('os').path.basename(f)[:-5],__import__('base64').b64encode(open(f,'rb').read()).decode()) for f in sorted(__import__('glob').glob('src/aura307img/*.webp')))+'};'
rep("</body>","<script id=\"aura307-js\">"+_a307img+open('src/aura307.js',encoding='utf-8').read()+"</script></body>")  # V307 cánh Bạo Tẩu 6 bậc
rep("</body>","<style id=\"tran307-css\">"+open('src/tran307.css',encoding='utf-8').read()+"</style><script id=\"tran307-js\">"+open('src/tran307.js',encoding='utf-8').read()+"</script></body>")  # V307 bước 2 trong trận
rep("</body>","<script id=\"ui307-img-js\">window.UI307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/ui307img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/ui307img'))})+";</script><style id=\"ui307-css\">"+_ui306css(open('src/ui307.css',encoding='utf-8').read())+"</style><script id=\"ui307-js\">"+open('src/ui307.js',encoding='utf-8').read()+"</script></body>")  # V307 bước 3 quy chuẩn giao diện
rep("</body>","<style id=\"ui307b-css\">"+open('src/ui307b.css',encoding='utf-8').read()+"</style><script id=\"ui307b-js\">"+open('src/ui307b.js',encoding='utf-8').read()+"</script></body>")  # V307 bước 4 gói UI GPT trên màn nhiều chữ
# V307 nhóm 4 (Gemini): chớp trúng đạn nhẹ hơn (alpha .7/.6 → .32/.28, phủ trắng b0 → 59 ≈ .35, 55 ms → 35 ms) + tàu nhấp nháy bất tử không biến mất hẳn (alpha .35). Tắt nhấp nháy mới: window.BLINK307=false
rep("ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.7;ctx.drawImage(sil(","ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.32;ctx.drawImage(sil(",2)
rep("ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.6;ctx.drawImage(sil(","ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.28;ctx.drawImage(sil(")
rep("sc.fillStyle=key?.hitFlashUntil>clock?'#ffffffb0':g","sc.fillStyle=key?.hitFlashUntil>clock?'#ffffff59':g")
rep("g.addColorStop(.5,key?.hitFlashUntil>clock?'#ffffff':'#dcfaff88')","g.addColorStop(.5,key?.hitFlashUntil>clock?'#ffffffa0':'#dcfaff88')")
rep("e.hitFlashTimer=.055;e.hitFlashUntil=clock+.055","e.hitFlashTimer=.035;e.hitFlashUntil=clock+.035")
rep("if(mode!=='over'&&(invuln<=0||Math.floor(time*12)%2===0||mode==='menu'","if(mode!=='over'&&(window.BLINK307!==false||invuln<=0||Math.floor(time*12)%2===0||mode==='menu'")
rep("(typeof SSSGame!=='undefined'&&SSSGame.state().ult>0))){flame(player.x,player.y+20);ctx.save();","(typeof SSSGame!=='undefined'&&SSSGame.state().ult>0))){flame(player.x,player.y+20);ctx.save();if(window.BLINK307!==false&&invuln>0&&Math.floor(time*12)%2!==0&&mode!=='menu'&&!(superTime>0))ctx.globalAlpha=.35;")
rep("</body>","<style id=\"ui307c-css\">"+open('src/ui307c.css',encoding='utf-8').read()+"</style><script id=\"ui307c-js\">"+open('src/ui307c.js',encoding='utf-8').read()+"</script></body>")  # V307 chỉ thị cuối Gemini: giao diện ngoài trận
rep("</body>","<style id=\"sss307-css\">"+open('src/sss307.css',encoding='utf-8').read()+"</style><script id=\"sss307-js\">"+open('src/sss307.js',encoding='utf-8').read()+"</script></body>")  # V307 màn Hợp thể SSS
# V307 (19/11 chủ dự án: "chỗ này không ổn"): lúc vào Bạo Tẩu cả thân tàu bị phủ trắng (bóng silhouette alpha tới 1) + quả cầu sáng bán kính 100 → giảm còn .35 và 64
rep("ctx.globalAlpha=clamp(flash);ctx.drawImage(sup?cells.silS:cells.silN","ctx.globalAlpha=clamp(flash)*(window.FLASH307===false?1:.35);ctx.drawImage(sup?cells.silS:cells.silN")
rep("VisualFX.ultimate(player.x,player.y,'#ffe28c',100);ring(player.x,player.y,'#ffb97c',75);","VisualFX.ultimate(player.x,player.y,'#ffe28c',window.FLASH307===false?100:64);ring(player.x,player.y,'#ffb97c',75);")
rep("</body>","<script id=\"core307-js\">"+open('src/core307.js',encoding='utf-8').read()+"</script></body>")  # V307 Lõi phi công
def _hop309img():
    o={os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/hop309img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/hop309img'))}
    if os.environ.get('HOP4','1')!='0' and os.path.isdir('src/hop4309'):  # V309 Lượt 4: mốc +3–9 / +10 dùng chung tranh chiến cơ mới
        from PIL import Image as _I4
        for f in sorted(os.listdir('src/hop4309')):
            if f.startswith('f') and f.endswith('.png'):
                _b=io.BytesIO() if 'io' in globals() else __import__('io').BytesIO();_I4.open('src/hop4309/'+f).convert('RGBA').resize((512,512),_I4.LANCZOS).save(_b,'WEBP',quality=90);o[f[:-4]]='data:image/webp;base64,'+base64.b64encode(_b.getvalue()).decode()
    return o
rep("</body>","<script id=\"hop309-img-js\">window.HOP309_IMG="+json.dumps(_hop309img())+";</script><script id=\"hop309-js\">"+open('src/hop309.js',encoding='utf-8').read()+"</script></body>")  # V309 tiến bậc robot hợp thể + phó bản vật liệu
rep("</body>","<script id=\"fx309-img-js\">window.FX309_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/fx309img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/fx309img'))})+";</script><script id=\"fx309-js\">"+open('src/fx309.js',encoding='utf-8').read()+"</script></body>")  # V309b tia 3 lớp + sprite hiệu ứng GPT (Gemini)
rep("Safety31.push(bullets,180","Safety31.push(bullets,(window.CAP309||140)",3)  # V309d trần 140 viên đạn địch cùng lúc (Gemini; bỏ viên cũ nhất). Đặt lại: window.CAP309=180
rep("</body>","<script id=\"dq309-img-js\">window.DQ309_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/dq309img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/dq309img'))})+";</script><script id=\"dq309-js\">"+open('src/dq309.js',encoding='utf-8').read()+"</script></body>")  # V309d đạn địch + laser boss mới (Gemini/GPT)
rep("</body>","<script id=\"tb309-img-js\">window.TB309_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/tb309img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/tb309img'))})+";</script><script id=\"tb309-js\">"+open('src/tb309.js',encoding='utf-8').read()+"</script></body>")  # V309 trang bị đồng bộ (Gemini/GPT 2 tấm)
rep("</body>","<script id=\"wing309-img-js\">window.WING309_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/wing309img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/wing309img')) if f.endswith('.webp')})+";window.WING309_PIV="+open('src/wing309img/piv.json').read()+";</script><script id=\"wing309-js\">"+open('src/wing309.js',encoding='utf-8').read()+"</script></body>")  # V309 Lượt 2 cánh năng lượng 6 mẫu (GPT)
rep("</body>","<script id=\"ui309-js\">"+open('src/ui309.js',encoding='utf-8').read()+"</script></body>")  # V309 Lượt 2 khung thẻ icon + khung bắn thử
rep("flame(player.x,player.y+20);","if(!(window.SHIP309V4&&window.L3309!==false))flame(player.x,player.y+20);")  # V309 Lượt 3: tàu v4 có 2 luồng phản lực riêng (l3309) → bỏ ngọn lửa xanh chung cũ
rep("</body>","<script id=\"hop4309-js\">"+open('src/hop4309.js',encoding='utf-8').read()+"</script></body>")  # V309 Lượt 4 chiến thần hợp thể: cỡ, hào quang, biến hình 3 pha, cut-in
rep("</body>","<script id=\"l3309-js\">window.SHIP309V4="+('true' if SHIP309BB else 'false')+";window.SHIP309BB="+json.dumps(SHIP309BB,separators=(',',':'))+";window.SHIP309COL="+json.dumps(SHIP309COL)+";"+open('src/l3309.js',encoding='utf-8').read()+"</script></body>")  # V309 Lượt 3 chiến cơ v4: hiệu ứng bậc + biến hình Bạo Tẩu
rep("</body>","<script id=\"rob309-js\">"+open('src/rob309.js',encoding='utf-8').read()+"</script></body>")  # V309 biến hình robot: sóng xung kích + vòng ma trận +6/+10
rep("</body>","<script id=\"rift307-js\">"+open('src/rift307.js',encoding='utf-8').read()+"</script></body>")  # V307 Khe Nứt Hư Không (Gemini 6 hệ thống)
rep("</body>","<style id=\"tb307-css\"></style><script id=\"tb307-js\">"+open('src/tb307.js',encoding='utf-8').read()+"</script></body>")  # V307 hiệu ứng + cơ chế trang bị (Gemini)
rep("</body>","<script id=\"vktt307-img-js\">window.VKTT307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/vktt307img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/vktt307img'))})+";</script><style id=\"vktt307-css\">"+open('src/vktt307.css',encoding='utf-8').read()+"</style><script id=\"vktt307-js\">"+open('src/vktt307.js',encoding='utf-8').read()+"</script></body>")  # V307 VKTT 3 hệ
import base64 as _b64d,glob as _gd,os as _od
_d307img='window.DAN307_IMG={'+','.join("'%s':'data:image/webp;base64,%s'"%(_od.path.basename(f)[:-5],_b64d.b64encode(open(f,'rb').read()).decode()) for f in sorted(_gd.glob('src/dan307img/*.webp')))+'};'
rep("</body>","<script id=\"dan307-js\">"+_d307img+open('src/dan307.js',encoding='utf-8').read()+"</script></body>")  # V307 đạn chính kiểu mới (bản thử tàu 1)
rep("</body>","<script id=\"co309-js\">"+open('src/co309.js',encoding='utf-8').read()+"</script></body>")  # V309c 13 cơ chế đạn riêng (Gemini mục D)
rep("</body>","<style id=\"b2307-css\">"+open('src/b2307.css',encoding='utf-8').read()+"</style><script id=\"b2307-js\">"+open('src/b2307.js',encoding='utf-8').read()+"</script></body>")  # V307 B2 đồng bộ Chợ Đen / thẻ ải / sự kiện
rep("</body>","<style id=\"hud307b-css\">"+open('src/hud307b.css',encoding='utf-8').read()+"</style><script id=\"hud307b-js\">"+open('src/hud307b.js',encoding='utf-8').read()+"</script></body>")  # V307 A2 thanh máu/Bạo Tẩu neon
rep("</body>","<style id=\"tut307-css\">"+open('src/tut307.css',encoding='utf-8').read()+"</style><script id=\"tut307-js\">"+open('src/tut307.js',encoding='utf-8').read()+"</script></body>")  # V307 bong bóng hướng dẫn chỉ ở sảnh
rep("</body>","<script id=\"b11307-img-js\">window.B11307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/b11img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/b11img'))})+";</script><style id=\"b11307-css\">"+open('src/b11307.css',encoding='utf-8').read()+"</style><script id=\"b11307-js\">"+open('src/b11307.js',encoding='utf-8').read()+"</script></body>")  # V307 tranh GPT B11 (bản thử)
rep("</body>","<script id=\"kho307-img-js\">window.KHO307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/kho307img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/kho307img'))})+";</script></body>")  # V307 tranh GPT B4 kho/túi đồ
rep("</body>","<style id=\"kho307-css\">"+open('src/kho307.css',encoding='utf-8').read()+"</style><script id=\"kho307-js\">"+open('src/kho307.js',encoding='utf-8').read()+"</script></body>")  # V307 kho 1 màn + túi đồ
rep("</body>","<script id=\"qua307-img-js\">window.QUA307_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/qua307/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/qua307'))})+";</script></body>")  # V307 tranh màn nhận quà (GPT 17/11)
rep("</body>","<style id=\"qua307-css\">"+open('src/qua307.css',encoding='utf-8').read()+"</style><script id=\"qua307-js\">"+open('src/qua307.js',encoding='utf-8').read()+"</script></body>")  # V307 màn chúc mừng nhận được
rep("</body>","<script id=\"max307-js\">"+open('src/max307.js',encoding='utf-8').read()+"</script></body>")  # V307 Tím+5 không rơi bản sao mẫu đó
rep("</body>","<style id=\"cot307-css\">"+_ui306css(open('src/cot307.css',encoding='utf-8').read())+"</style><script id=\"cot307-js\">"+open('src/cot307.js',encoding='utf-8').read()+"</script></body>")  # V307 sảnh: hàng ô vuông
rep("</body>","<script id=\"hud307-js\">"+open('src/hud307.js',encoding='utf-8').read()+"</script></body>")  # V307 HUD: bật chữ nổi nhặt đồ
# ---- V307 · 7 robot siêu hợp thể CƠ KHÍ (tranh GPT chốt 20/11, tên/đặc kỹ theo Gemini; atlas đã thay ở src/hop129 tau + src/hop131) ----
rep("const skills=['Phân Giải + Song Vũ','Thiêu Đốt + Phân Giải','Quân Đoàn + Thiêu Đốt','Đóng Băng + Quân Đoàn','Trảm Kích + Đóng Băng','Thiêu Đốt + Xuyên Thấu','Laser + Tán Xạ'];","const skills=['Phân Giải + Xung Kích','Thiêu Đốt + Phân Giải','Quân Đoàn + Thiêu Đốt','Hàn Băng + Quân Đoàn','Trảm Kích + Hàn Băng','Xuyên Phá + Tán Xạ','Tán Xạ + Trảm Kích'];")
rep("{name:'Ảo Vũ Thiên Ảnh',skills:'Phân Giải + Song Vũ'","{name:'Thiên Vũ Cơ Hoàng',skills:'Phân Giải + Xung Kích'")
rep("normal:'Chiến cơ lông vũ hồng-trắng kèm phân thân cyan; hai tia lăng kính uốn lượn và lông vũ quang.'","normal:'Dạng chiến cơ lông vũ quang tử tím–cyan; đạn phân tách thành lông vũ tự tìm mục tiêu.'")
rep("max:'Valkyrie hồng-vàng; sáu cánh quang vũ xòe rộng, mưa lông vũ và ba tia lăng kính.'","max:'Nữ cơ khí giáp bạc–titan, sáu cánh lông vũ quang tử xòe rộng; mưa mũi tên phân thân + sóng xung kích đẩy đạn địch.'")
rep('Ảo Vũ Thiên Ảnh','Thiên Vũ Cơ Hoàng')
rep("{name:'Du Tinh Hách Khách',skills:'Thiêu Đốt + Phân Giải'","{name:'Hắc Tinh Đột Kích',skills:'Thiêu Đốt + Phân Giải'")
rep("normal:'Phi cơ cyber đen-trắng-cyan; hai luồng khối dữ liệu nhiệt đỏ-cam.'","normal:'Chiến cơ đột kích đen cacbon sọc cam lửa và cyan; hai luồng nhiệt hạch.'")
rep("max:'Robot hacker giáp đen-tím; nón tia đỏ từ trời, cánh pha lê hồng-cyan, bảy luồng data-flame.'","max:'Nam cơ khí giáp đen nhám, cánh phản lực gập góc, vai gắn pháo hạt nhân; nón tia nhiệt đỏ từ trên đỉnh.'")
rep('Du Tinh Hách Khách','Hắc Tinh Đột Kích')
rep("{name:'Vĩnh Tẫn Hoang Viêm',skills:'Quân Đoàn + Thiêu Đốt'","{name:'Thái Dương Chiến Thần',skills:'Quân Đoàn + Thiêu Đốt'")
rep("normal:'Chiến cơ công kích đỏ-vàng-bạc, ba phù du pháo; cột lửa chính và ba tia nhiệt.'","normal:'Pháo hạm đỏ thẫm–vàng kim với lõi mặt trời và ụ pháo vệ tinh; cột lửa chính.'")
rep("max:'Chiến thần mặt trời; nhật miện xoay, hào quang tia sáng bùng nổ, sấm hồng và cột lửa khổng lồ.'","max:'Nam cơ khí giáp đỏ–vàng hoàng gia, ụ pháo vệ tinh quanh vai, hào quang mặt trời bùng nổ chữ X lửa.'")
rep('Vĩnh Tẫn Hoang Viêm','Thái Dương Chiến Thần')
rep("{name:'Quần Tinh Ý Chí',skills:'Đóng Băng + Quân Đoàn'","{name:'Tinh Vân Phán Quan',skills:'Hàn Băng + Quân Đoàn'")
rep("normal:'Mẫu hạm bạc-tím-cyan; phù du phía trên, interceptor phía dưới, tia băng hội tụ.'","normal:'Chiến cơ pha lê bạch kim–lam với đội tiêm kích vệ tinh; tia băng hội tụ.'")
rep("max:'Robot phán quan; khung sao pha lê bốn hướng, phù du quay quanh, sấm tím và hai đại pháo băng.'","max:'Nữ cơ khí giáp bạch kim–lam vũ trụ, vòng vệ tinh pha lê sau lưng; cột băng và đội tiêm kích tự động.'")
rep('Quần Tinh Ý Chí','Tinh Vân Phán Quan')
rep("{name:'Băng Hà Lĩnh Chủ',skills:'Trảm Kích + Đóng Băng'","{name:'Hàn Phong Kỵ Sĩ',skills:'Trảm Kích + Hàn Băng'")
rep("normal:'Tiêm kích băng trắng-cyan-tím; tia không độ và nhát chém băng.'","normal:'Tiêm kích băng xanh–thép trắng sắc nhọn; tia không độ và nhát chém băng.'")
rep("max:'Kỵ sĩ băng; tám đại cánh tinh thể xòe xuống, trụ băng trời, bán nguyệt trảm và mưa mảnh băng.'","max:'Nam cơ khí giáp băng sắc nhọn, tám phiến cánh tinh thể xòe như áo choàng; đại kiếm băng trảm dọc.'")
rep('Băng Hà Lĩnh Chủ','Hàn Phong Kỵ Sĩ')
rep("{name:'Phượng Viêm Thương Đế',skills:'Thiêu Đốt + Xuyên Thấu'","{name:'Xích Diễm Long Thương',skills:'Xuyên Phá + Tán Xạ'")
rep("normal:'Tiêm kích phượng hoàng giáp đỏ-trắng mang đôi lõi cyan; đạn lửa bao quanh thương quang xuyên thấu.'","normal:'Tiêm kích rồng lửa đỏ–đen; mũi thương xuyên thẳng và quạt đạn lửa.'")
rep("max:'Chiến thần phượng viêm mở đại cánh lửa, đôi vai lõi cyan dẫn hai cột thương quang xuyên tâm.'","max:'Nam cơ khí giáp đỏ rực–đen, đôi cánh phượng cơ khí ba tầng lửa; đại thương xuyên phá + quạt lửa tán xạ 120°.'")
rep('Phượng Viêm Thương Đế','Xích Diễm Long Thương')
rep("{name:'Tử Diệu Quang Hoàng',skills:'Laser + Tán Xạ'","{name:'Tử Diệu Quang Hoàng',skills:'Tán Xạ + Trảm Kích'")
rep("normal:'Tiêm kích trắng-vàng mở cánh nguyệt và cánh tinh thể tím; tia laser vàng dẫn chùm cầu tán xạ.'","normal:'Tiêm kích vàng kim–tím hoàng gia; chùm laser lăng kính tán xạ.'")
rep("max:'Quang hoàng giáp trắng-vàng triển khai quang hoàn lăng kính, hai đại pháo laser và vòng cầu tím tán xạ.'","max:'Nữ cơ khí giáp vàng kim–tím, mũ giáp vương miện, bốn cánh lăng kính pha lê; chín tia tán xạ + hai lưỡi liềm ánh sáng.'")
# ---- V309 · ảnh nhỏ chiến cơ ở Hub (Hợp thể: 2 chiến cơ thành phần…) dùng thân MỚI SHIP118 theo bậc thay atlas cũ fighters-v28. Tắt: window.THUMB309=false ----
rep("function thumb(i){if(i>=10&&window.Ship83)return Ship83.thumb(i);if(thumbs[i])return thumbs[i];const im=fighterAtlasV22;","function thumb(i){try{if(window.THUMB309!==false&&typeof SHIP118!=='undefined'&&SHIP118[i]){const S=SHIP118[i];let n=0;try{n=V70.craftN(i);}catch{}const k=['thuong','luc','lam','lam','lam','lam','tim','tim','tim','tim','tim','tim5'][Math.min(11,n|0)];const u=S[k]||S.tim||S.thuong;if(u)return u;}}catch{}if(i>=10&&window.Ship83)return Ship83.thumb(i);if(thumbs[i])return thumbs[i];const im=fighterAtlasV22;")
# ---- V309 · 18 quái mới (GPT, atlas 6 phe × 3 cỡ, ô 256×432) thay FOES_V2_ASSET cũ; bản cũ /home/claude/v309bk/foes_atlas_cu.png ----
if os.path.exists('src/foes309/atlas.png'):
    import io as _io9
    _fb=_io9.BytesIO();_I.open('src/foes309/atlas.png').save(_fb,'WEBP',quality=88);_fu='data:image/webp;base64,'+base64.b64encode(_fb.getvalue()).decode()
    _fi=h.find('const FOES_V2_ASSET={src:"');assert _fi>0 and h.count('const FOES_V2_ASSET={src:"')==1
    _fj=h.find('"',_fi+26);h=h[:_fi+26]+_fu+h[_fj:]
# ---- V309 · va chạm thân quái/boss tính theo TÂM tàu (chủ dự án 20/11): bán kính thân quái + 4,5 px (trước 27 / 55 px). Tắt: window.TAM309=false ----
rep("if(!e.rescue28&&!e.dead&&dist(e,player)<27)","if(!e.rescue28&&!e.dead&&dist(e,player)<(window.TAM309===false?27:(e.hitW||(e.large?40:24))/2+4.5))")
rep("if(dist(player,b)<55)damage();","if(dist(player,b)<(window.TAM309===false?55:(b.hitW||70)/2+4.5))damage();")
# ---- V309 · tiến bậc robot hợp thể bằng nguyên liệu riêng (Hop309), hình chiến cơ theo mốc ----
rep("const enhance=Math.max(2*Math.min(...parts.map(p=>p.enhance)),old?.enhance||0);","const enhance0=Math.max(2*Math.min(...parts.map(p=>p.enhance)),old?.enhance||0),enhance=(window.Hop309&&Hop309.enh)?Hop309.enh(i,enhance0):enhance0;")
rep("hull:im});","hull:(window.__hop309bay||im)});")
rep("hull:(imL.complete&&imL.naturalWidth?imL:im)","hull:(window.__hop309atlas||(imL.complete&&imL.naturalWidth?imL:im))")
rep("if(o.hull)hullIm=o.hull;prepareHull();","if(o.hull){if(o.hull!==hullIm&&(o.hull.__h309||(hullIm&&hullIm.__h309)))cells=null;hullIm=o.hull;}prepareHull();")
rep("core.addColorStop(.46,'rgba(255,255,255,.95)');core.addColorStop(.54,'rgba(255,255,255,.95)')","core.addColorStop(window.LOI309===false?.46:.485,'rgba(255,255,255,.95)');core.addColorStop(window.LOI309===false?.54:.515,'rgba(255,255,255,.95)')")  # V309 lõi trắng tia SSS hẹp ~25 % (mẫu 2 hết lóa). Tắt: window.LOI309=false
rep("const hot=mix(col,'#ffffff',VIVID68.on?.28:.6);","const hot=mix(col,'#ffffff',VIVID68.on?(window.LOI309===false?.28:.12):.6);")  # V309 đạn SSS bão hòa hơn
# ---- V309 Lượt 4 · công thức hợp thể 1–1 (chủ dự án 21/11): mẫu 1 Hắc Tinh → Thời Không Thôn Tinh (tàu 11 + 12), mẫu 3 Tinh Vân → Hư Không Đế Vương (tàu 13 tự thức tỉnh). Tắt: HOP4=0 khi dựng ----
if os.environ.get('HOP4','1')!='0':
    rep("const pairs=[[5,8],[5,7],[7,9],[2,9],[2,6],[0,3],[1,4]];","const pairs=[[5,8],[10,11],[7,9],[12,12],[2,6],[0,3],[1,4]];")
    rep("const find=(a,b)=>pairs.findIndex(p=>p.includes(a)&&p.includes(b)&&a!==b);","const find=(a,b)=>pairs.findIndex(p=>p.includes(a)&&p.includes(b)&&(a!==b||p[0]===p[1]));")
    rep("const names=['Thiên Vũ Cơ Hoàng','Hắc Tinh Đột Kích','Thái Dương Chiến Thần','Tinh Vân Phán Quan',","const names=['Thiên Vũ Cơ Hoàng','Thời Không Thôn Tinh','Thái Dương Chiến Thần','Hư Không Đế Vương',")
    rep("const skills=['Phân Giải + Xung Kích','Thiêu Đốt + Phân Giải','Quân Đoàn + Thiêu Đốt','Hàn Băng + Quân Đoàn',","const skills=['Phân Giải + Xung Kích','Hố Đen + Nghịch Thời','Quân Đoàn + Thiêu Đốt','Đế Vương Độc Tôn',")
    rep("colors=['#ff79e7','#ff8c52','#ffb34c','#bb9aff',","colors=['#ff79e7','#a78bfa','#ffb34c','#c084fc',")
    rep("{name:'Hắc Tinh Đột Kích',skills:'Thiêu Đốt + Phân Giải',color:'#ff8c52',second:'#56efff',pair:[7,5],ult:'MA TRẬN XÂM NHẬP',","{name:'Thời Không Thôn Tinh',skills:'Hố Đen + Nghịch Thời',color:'#a78bfa',second:'#2dd4bf',pair:[10,11],ult:'THÔN TINH NGHỊCH THỜI',")
    rep("normal:'Chiến cơ đột kích đen cacbon sọc cam lửa và cyan; hai luồng nhiệt hạch.'","normal:'Chiến cơ vòng khuyết hố đen, bánh răng thiên văn vàng cổ và lõi hố đen tím.'")
    rep("max:'Nam cơ khí giáp đen nhám, cánh phản lực gập góc, vai gắn pháo hạt nhân; nón tia nhiệt đỏ từ trên đỉnh.'","max:'Cơ thể vũ trụ: đồng hồ thiên văn khổng lồ quanh lõi hố đen, hai lưỡi liềm thời gian.'")
    rep("{name:'Tinh Vân Phán Quan',skills:'Hàn Băng + Quân Đoàn',color:'#bb9aff',second:'#7feeff',pair:[2,9],ult:'PHÁN QUYẾT TINH HÀ',","{name:'Hư Không Đế Vương',skills:'Đế Vương Độc Tôn',color:'#c084fc',second:'#fde047',pair:[12,12],ult:'ĐẾ VƯƠNG HƯ KHÔNG',")
    rep("normal:'Chiến cơ pha lê bạch kim–lam với đội tiêm kích vệ tinh; tia băng hội tụ.'","normal:'Hư Không Đế Vương tự thức tỉnh: chiến cơ tím–vàng hoàng gia.'")
    rep("max:'Nữ cơ khí giáp bạch kim–lam vũ trụ, vòng vệ tinh pha lê sau lưng; cột băng và đội tiêm kích tự động.'","max:'Nam cơ khí giáp đen–vàng, vương miện, áo choàng hoàng kỳ và cánh pha lê tím.'")
    rep("state=FusionBlueprints.sanitize(JSON.parse(localStorage.getItem(KEY)||'{}'),JSON.parse(localStorage.getItem('saobang-workshop-v1')||'{}'));","state=FusionBlueprints.sanitize(JSON.parse(localStorage.getItem(KEY)||'{}'),JSON.parse(localStorage.getItem('saobang-workshop-v1')||'{}'));try{if(!localStorage.getItem('saobang-hop4309-v1')){/* V309 Lượt 4: bỏ 2 robot mẫu 1 / 3 cũ (hợp thể không tốn chiến cơ), hoàn nguyên liệu + hợp kim tiến bậc đã tốn */const keep=state.supers.filter(q=>q.model!==1&&q.model!==3),lost=state.supers.length-keep.length;state.supers=keep;if(state.selected&&!keep.some(q=>q.key===state.selected)&&/^(sss|super):/.test(state.selected))state.selected=keep[0]?keep[0].key:null;let H={},cr=0;try{H=JSON.parse(localStorage.getItem('saobang-hop309-v1')||'null')||{};}catch{}if(H.adv){const C=[1,2,3,4,6,8,11,14,17,20],R=[2000,3500,5500,8000,11000,15000,20000,26000,33000,42000];for(const i of [1,3]){const a=H.adv[i]|0;let n=0;for(let k=0;k<a&&k<10;k++){n+=C[k];cr+=R[k];}if(n)H.m=(H.m||[0,0,0,0]).map(v=>(v|0)+n);H.adv[i]=0;}localStorage.setItem('saobang-hop309-v1',JSON.stringify(H));}localStorage.setItem('saobang-hop4309-v1',JSON.stringify({mig:1,lost,cr,paid:0}));localStorage.setItem(KEY,JSON.stringify(state));}}catch(e){}")
    rep("f.draw(ctx,W,H,time,on,{...opts(),cx:player.x,cy:player.y,S,rot:","f.draw(ctx,W,H,time,on,{...opts(),cx:player.x,cy:player.y,S:S*(window.HOP4309===false?1:(window.Hop4309?Hop4309.scale(f,on):1)),rot:")
# ---- V309 Lượt 5 · vật phẩm rơi mới, quái tinh anh, nổ quái ----
rep("for(const e of enemies){EnemyFleet.drawEnemy(e);if(e.elite&&window.RING108===false){",
    "for(const e of enemies){EnemyFleet.drawEnemy(e);if(e.elite&&typeof L5309!=='undefined'&&L5309.on())continue;if(e.elite&&window.RING108===false){")
rep("if(c183){ctx.globalCompositeOperation='source-over';ctx.drawImage(c183,d.x-c183.w/2,d.y-c183.w/2,c183.w,c183.w);continue;}",
    "if(c183){let w9=c183.w;if(typeof L5309!=='undefined'&&L5309.dOn()){w9*=L5309.kp(d);L5309.glow(d.x,d.y,w9,'#fbbf24',d.ph);}ctx.globalCompositeOperation='source-over';ctx.drawImage(c183,d.x-w9/2,d.y-w9/2,w9,w9);continue;}")
rep("</body>","<script>const DROP309_IMG="+json.dumps(DROP309)+";</script><script id=\"l5309-js\">"+open('src/l5309.js',encoding='utf-8').read()+"</script></body>")
# ---- V309 Lượt 6 · cảm giác bắn, âm thanh, boss, điện thoại ----
rep("if(shake>0&&mode==='play'&&!VisualFX.reduced()){const A=typeof FX16S==='function'?FX16S():3;ctx.translate(rnd(-A,A),rnd(-A,A));}",
    "{const k6=typeof L6309!=='undefined'?L6309.shk():null;if(k6===0){}else if(k6>0){ctx.translate(rnd(-k6,k6),rnd(-k6,k6));}else if(shake>0&&mode==='play'&&!VisualFX.reduced()){const A=typeof FX16S==='function'?FX16S():3;ctx.translate(rnd(-A,A),rnd(-A,A));}}")
rep("{const k78=(window.Bal787&&Bal787.bossDrop)?Bal787.bossDrop(p.x,p.y,'wing'):(Safety31.push(drops,100,{x:p.x,y:p.y,type:'power',t:0}),'power');toast((p.side<0?'CÁNH TRÁI':'CÁNH PHẢI')+' ĐÃ PHÁ'+(k78==='heal'?' · HỒI MÁU':k78==='power'?' · W':''));}",
    "{const k78=typeof L6309!=='undefined'?L6309.wingDrop(p.x,p.y):(window.Bal787&&Bal787.bossDrop)?Bal787.bossDrop(p.x,p.y,'wing'):(Safety31.push(drops,100,{x:p.x,y:p.y,type:'power',t:0}),'power');toast((p.side<0?'CÁNH TRÁI':'CÁNH PHẢI')+' ĐÃ PHÁ'+(k78==='heal'?' · HỒI MÁU':k78==='power'?' · W':k78==='shield'?' · HỒI KHIÊN':k78==='super'?' · SIÊU CẤP':''));}")
rep("</body>","<style id=\"l6309-css\">#auto6{position:absolute;z-index:30;white-space:nowrap;display:flex;align-items:center;gap:4px;height:24px;padding:0 9px 0 7px;border-radius:12px;border:1px solid rgba(125,211,252,.55);background:linear-gradient(180deg,rgba(15,30,52,.88),rgba(8,16,30,.88));color:#bfe6ff;font:800 10px/1 sans-serif;letter-spacing:.06em;pointer-events:auto;touch-action:none}#auto6 i{width:10px;height:10px;border-radius:50%;background:#334155;box-shadow:inset 0 0 0 1.5px #64748b}#auto6.on{border-color:#fbbf24;color:#ffe9a8;background:linear-gradient(180deg,rgba(66,42,6,.9),rgba(28,16,2,.9))}#auto6.on i{background:#fbbf24;box-shadow:0 0 6px #fbbf24}#auto6[hidden]{display:none}</style><script id=\"l6309-js\">"+open('src/l6309.js',encoding='utf-8').read()+"</script></body>")
# ---- V309 Lượt 7 · môi trường động, bộ trang bị nhanh, Bách Khoa, nhiệm vụ mới ----
CODEX7={}
for _i in range(7):
    for _s,_f in (('f','chandung'),('b','bay')):
        _pp='src/hop4309/hop%d_%s.png'%(_i+1,_f)
        if os.path.exists(_pp):CODEX7['r%d%s'%(_i,_s)]=_w8(_pp,224)
for _pp in sorted(_g.glob('src/sss309/*.png')):CODEX7['x_'+os.path.splitext(os.path.basename(_pp))[0]]=_w8(_pp,112)
print('codex7:',len(CODEX7))
L7CSS=open('src/l7309.css',encoding='utf-8').read()
rep("</body>","<style id=\"l7309-css\">"+L7CSS+"</style><script>const CODEX7_IMG="+json.dumps(CODEX7)+";</script><script id=\"l7309-js\">"+open('src/l7309.js',encoding='utf-8').read()+"</script></body>")
# ---- V309 Lượt 8 · Ngoại trang: xem trước + vệt phản lực + hiệu ứng đạn + khung avatar + danh hiệu ----
rep("</body>","<style id=\"l8309-css\">"+open('src/l8309.css',encoding='utf-8').read()+"</style><script id=\"l8309-js\">"+open('src/l8309.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 9 · UX9 (Sảnh 4 cụm, Kho 4 ô + Túi lưới) + THEME9 (Royal Blue)
_c9=open('src/l9309.css',encoding='utf-8').read().replace('@U9','html.ux9 body'+':not(#_u9)'*34).replace('@T9','html.theme9 body'+':not(#_t9)'*34)
rep("</body>","<style id=\"l9309-css\">"+_c9+"</style><script id=\"l9309-js\">"+open('src/l9309.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 9B: bỏ thanh 5 tab, đầu trang 2 tầng, buồng lái Sảnh, Kho rộng (tắt lúc chạy: window.UX9B=false)
_cb9=open('src/l9b309.css',encoding='utf-8').read().replace('@B9','html.ux9b body'+':not(#_b9)'*36)
rep("</body>","<style id=\"l9b309-css\">"+_cb9+"</style><script id=\"l9b309-js\">"+open('src/l9b309.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 10: Khối A chuyển động (a10309, tắt window.ANIM10=false) + Khối B cày nhàn / chòm sao / polish (q10309, tắt window.QOL10=false)
rep("</body>","<style id=\"a10309-css\">"+open('src/a10309.css',encoding='utf-8').read()+"</style><script id=\"a10309-js\">"+open('src/a10309.js',encoding='utf-8').read()+"</script></body>")
_cq=open('src/q10309.css',encoding='utf-8').read().replace('@Q10','html.qol10 body'+':not(#_q10)'*38)
rep("</body>","<style id=\"q10309-css\">"+_cq+"</style><script id=\"q10309-js\">"+open('src/q10309.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 10B: 1 chuẩn khung chrome vát góc + 1 kiểu nút X (tắt window.FRAME10=false)
_cf=open('src/f10309.css',encoding='utf-8').read().replace('@F10','html.frame10 body'+':not(#_f10)'*40)
rep("</body>","<style id=\"f10309-css\">"+_cf+"</style></body>")
# V309 Lượt 11: Tiếp tế Vô tận, Phi công gọn, gom tab đầu trang, chế độ Anh Hùng (tắt window.UX11=false)
_c11=open('src/l11309.css',encoding='utf-8').read().replace('@H11','html.ux11.hero11 body'+':not(#_l11)'*44).replace('@L11','html.ux11 body'+':not(#_l11)'*42)
rep("</body>","<style id=\"l11309-css\">"+_c11+"</style><script id=\"l11309-js\">"+open('src/l11309.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 12 (Chốt hạ V1): sửa 4 lỗi L11, HUD chrome, kết quả/tạm dừng, màn phụ, vùng chạm, buồng lái (tắt window.POLISH12=false)
_c12=open('src/l12309.css',encoding='utf-8').read().replace('@PH12','html.polish12.hero11 body'+':not(#_p12)'*48).replace('@HB12','html.polish12.hub9on body'+':not(#_p12)'*48).replace('@P12','html.polish12 body'+':not(#_p12)'*46)
rep("</body>","<style id=\"l12309-css\">"+_c12+"</style><script id=\"l12309-js\">"+open('src/l12309.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 14 · rương ngẫu nhiên (kho Chests) + đăng nhập tích lũy + thành tựu 5 bậc (src/l14309.js) · nối Meta40/Chests (cùng nội dung claude_tools/rep14.py)
rep("function claimDaily(){const d=today(),ds=dailyState();if(ds.claimed)return false;","function claimDaily(){const d=today(),ds=dailyState();if(ds.claimed)return false;if(window.Login14Hook&&Login14Hook.on()){if(!Login14Hook.claim())return false;S.daily={last:d,streak:ds.streak+1};save();return true;}/* V309 L14: đăng nhập tích lũy */")
rep("function rewardsPanel(tab='daily'){const ds=dailyState();","function rewardsPanel(tab='daily'){if(window.Login14Hook&&(tab==='ach'?Login14Hook.achOn():Login14Hook.on())){Login14Hook.panel(tab,{modal,closeM,claimDaily,again:rewardsPanel});return;}/* V309 L14 */const ds=dailyState();")
rep("const achReady=()=>achRows().some(r=>r.can);","const achReady=()=>(window.Login14Hook&&Login14Hook.achOn())?Login14Hook.achReady():achRows().some(r=>r.can);/* V309 L14 */")
rep("return {init,render,setLocked,rewardBoss,open,openAll,dayKey,rollover,mergeRestoreState,getState:","return {add14:c=>{rollover();state.crates.push(c);save();render();return c;}/* V309 L14: rương từ đăng nhập / nhiệm vụ / thành tựu, không tính trần ngày */,init,render,setLocked,rewardBoss,open,openAll,dayKey,rollover,mergeRestoreState,getState:")
rep("</body>","<script id=\"l14309-js\">"+open('src/l14309.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 15 · PERF_HUD (src/opt15.js)
rep("</body>","<script id=\"opt15-js\">"+open('src/opt15.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 15B · kho icon dùng chung UI_ICONS + thay emoji hình (src/l15b309.js, tắt window.ICON15B=false)
rep("</body>","<script id=\"l15b309-js\">"+open('src/l15b309.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 16 (V2.0) · Hệ Đá Nội Tại (src/nt16.js, tắt window.NT16=false). Móc thêm trong l11309 (Anh Hùng), q77 (mốc tuần), v77 (Tiệm Danh Dự), kho307 (Tài nguyên), l7309 (Bộ trang bị)
rep("</body>","<script id=\"nt16-js\">"+open('src/nt16.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 17 (chốt V2.0) · Hệ Ép Xung (src/oc17.js, tắt window.OC17=false) + đồng bộ UI: 12 icon + 6 khung 3D GPT, sửa ảnh cũ, nút/emoji (src/ui17.js, tắt window.UI17=false)
#  ảnh: src/ui17img/*.webp (tách nền bằng claude_tools/ui17_assets.py) · sửa nguồn trực tiếp: nc307.js (xuất cur/mode/get/render), evo82.js (ảnh chiến cơ SHIP118)
rep("</body>","<script id=\"oc17-js\">"+open('src/oc17.js',encoding='utf-8').read()+"</script></body>")
rep("</body>","<script id=\"ui17-img-js\">window.UI17_IMG="+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/ui17img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/ui17img'))})+";</script></body>")
rep("</body>","<script id=\"ui17-js\">"+open('src/ui17.js',encoding='utf-8').read()+"</script></body>")
# V309 L17 mục 4 · chuốt canvas dùng chung (src/fx18.js, tắt window.FX18=false): luồng đẩy tên lửa 3 nấc, đạn thử Kho theo tàu (Dan307.hangar), cánh plasma tàu con theo màu tàu, đĩa hologram Kho — sửa a10309, l9b309, tb309, l8309, dan307
rep("</body>","<script id=\"fx18-js\">"+open('src/fx18.js',encoding='utf-8').read()+"</script></body>")
# V309 L17B · 3 Chiến cơ Thần hóa tranh mới (src/th17img/*.webp, tách nền 2 lớp bằng claude_tools/th17_assets.py) ghi đè 6 khóa ART86_ASSETS TRƯỚC khi Art86 nạp ảnh; hiệu ứng LED lõi + lửa động cơ src/th17.js. Tắt: window.TH17=false
rep('<script id="art86-js">','<script id="th17-img-js">window.TH17_IMG='+json.dumps({os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open('src/th17img/'+f,'rb').read()).decode() for f in sorted(os.listdir('src/th17img'))})+';if(window.TH17!==false&&typeof ART86_ASSETS!=="undefined")Object.assign(ART86_ASSETS,window.TH17_IMG);</script><script id="art86-js">')
rep("</body>","<script id=\"th17-js\">"+open('src/th17.js',encoding='utf-8').read()+"</script></body>")
# V309 Lượt 9B: đổi tên hiển thị Vũ khí phụ → Tàu con, Tiến khung → Tiến bậc (dựng RENAME9=0 để giữ tên cũ)
if os.environ.get('RENAME9','1')!='0':
    for _a,_b in [('Vũ khí phụ','Tàu con'),('VŨ KHÍ PHỤ','TÀU CON'),('vũ khí phụ','tàu con'),('Vũ Khí Phụ','Tàu Con'),('TIẾN KHUNG','TIẾN BẬC'),('Tiến khung','Tiến bậc'),('tiến khung','tiến bậc'),('Tiến Khung','Tiến Bậc')]:
        h=h.replace(_a,_b)
# V309 Lượt 13 · chữ "giáp" còn sót → "khiên" (từ V78 giáp = khiên chặn 1 đòn). Cùng nội dung claude_tools/rep13.py
for _a,_b in [("hồi ${(.3+r*.15).toFixed(2)} giáp đã mất","bật khiên chặn 1 đòn"),("hồi ${(.5+r*.2).toFixed(1)} giáp đã mất","bật khiên chặn 1 đòn"),
  ("'hồi 1 giáp, miễn sát thương 1,3s","'bật khiên, miễn sát thương 1,3s"),("'hồi 1 máu, 1 giáp và xóa đạn gần'","'hồi 1 máu, bật khiên và xóa đạn gần'"),
  ("phản công tối đa 5 đạn, hồi 1 giáp'","phản công tối đa 5 đạn, bật khiên'"),("Tự hồi 1 giáp mỗi 14 giây","Tự bật khiên mỗi 14 giây"),
  ("làm chậm và hồi giáp để trụ lâu","làm chậm và bật khiên để trụ lâu"),("Bạo Tẩu lâu hơn, hồi giáp, chí mạng","Bạo Tẩu lâu hơn, khiên định kỳ, chí mạng")]:
  rep(_a,_b)
# V2.1 Đợt 1 · tiến hóa cơ chế & hiệu ứng theo bậc + bộ ảnh GPT mới (src/evo21.js, ảnh src/evo21img do claude_tools/evo21_cat.py tạo). Tắt: window.EVO21=false
# V2.1 Đợt 3: nén lại + thu cạnh dài ảnh V2.1 lúc dựng (claude_tools/evo21_nen.py; giữ q90 gốc: E21NEN=0)
_e21d='src/evo21img'
if os.path.isdir(_e21d) and os.environ.get('E21NEN','1')!='0':
  import subprocess as _sp21,sys as _sys21,tempfile as _tf21
  _e21q=_tf21.mkdtemp(prefix='e21q_');_sp21.run([_sys21.executable,'claude_tools/evo21_nen.py',_e21d,_e21q],check=True);_e21d=_e21q
_e21={os.path.splitext(f)[0]:'data:image/webp;base64,'+base64.b64encode(open(_e21d+'/'+f,'rb').read()).decode() for f in sorted(os.listdir(_e21d)) if f.endswith('.webp')} if os.path.isdir(_e21d) else {}
_e21h=json.load(open(_e21d+'/_h0.json')) if os.path.exists(_e21d+'/_h0.json') else {}
rep("</body>","<script id=\"evo21-img-js\">window.EVO21_IMG="+json.dumps(_e21)+";window.EVO21_H="+json.dumps(_e21h)+";</script><script id=\"evo21-js\">"+open('src/evo21.js',encoding='utf-8').read()+"</script><script id=\"evo21-led-js\">"+open('src/evo21_led.js',encoding='utf-8').read()+"</script><script id=\"evo21-sfx-js\">"+open('src/evo21_sfx.js',encoding='utf-8').read()+"</script></body>")  # V2.1 EVO21_LED (tắt window.EVO21LED=false)
# V2.1.42 · vùng an toàn Android: mọi env(safe-area-inset-top) → var(--sat42) (= max(env, --satn do MainActivity báo), định nghĩa trong v2142.js). Bỏ qua: SAFE42=0
import re as _re42
if os.environ.get('SAFE42','1')!='0':
  _n42=len(_re42.findall(r'env\(\s*safe-area-inset-top\s*(?:,\s*0(?:px)?\s*)?\)',h));h=_re42.sub(r'env\(\s*safe-area-inset-top\s*(?:,\s*0(?:px)?\s*)?\)','var(--sat42,0px)',h);print('SAFE42',_n42)
exec(open('claude_tools/v2142_rep.py',encoding='utf-8').read())
for _a,_b in PAIRS:rep(_a,_b)
# V2.1.42 · Final Polish (src/v2142.js, tắt window.V2142=false): dòng năng lượng viền cánh, FX −15 % khi dày, vệt sao tốc độ, tia lửa trúng, chớp nòng, rung nhẹ, tự hút [P]/[+], Kho không nháy, vùng an toàn
rep("</body>","<style id=\"v2142ui-css\">"+open('src/v2142ui.css',encoding='utf-8').read().replace('@V ','html.v2142.ui42 body'+':not(#_v42)'*72+' ')+"</style></body>")
h=h.replace('<head>','<head><script id="v2142pre-js">'+open('src/v2142pre.js',encoding='utf-8').read()+'</script>',1)
rep("</body>","<script id=\"v2142-js\">"+open('src/v2142.js',encoding='utf-8').read()+"</script></body>")
# V2.2.0 · đội hình chữ V + P trong Bạo Tẩu (claude_tools/v22_rep.py), màn kết quả gọn (src/end22.js), giao diện & xưởng (src/v22.js + src/ui22img)
exec(open('claude_tools/v22_rep.py',encoding='utf-8').read())
for _a,_b in PAIRS22:rep(_a,_b)
exec(open('claude_tools/v22_embed.py',encoding='utf-8').read())
rep("</body>",ui22_script('.')+"<script id=\"end22-js\">"+open('src/end22.js',encoding='utf-8').read()+"</script><script id=\"v22-js\">"+open('src/v22.js',encoding='utf-8').read()+"</script><script id=\"u22-js\">"+open('src/u22.js',encoding='utf-8').read()+"</script></body>")
open('Phi_Doi_Sao_Bang_V74_mau.html','w',encoding='utf-8').write(h)
# V309 Lượt 15 · giảm dung lượng sau khi dựng: PNG→WebP q90 + gộp ảnh trùng (claude_tools/opt15_assets.py). Bỏ qua: OPT15_ANH=0
if os.environ.get('OPT15_ANH','1')!='0':
  import subprocess as _sp,sys as _sys
  _sp.run([_sys.executable,'claude_tools/opt15_assets.py','Phi_Doi_Sao_Bang_V74_mau.html','Phi_Doi_Sao_Bang_V74_mau.html','--bao','opt15_bao.json'],check=True);print(round(len(h)/1e6,2),'MB')
# ---- V100 · BẢN THỬ cho chủ dự án: dữ liệu tách riêng (tiền tố thu100:) + bảng nạp tài khoản mẫu ----
# V301: chỉ dựng khi cần (BAN_THU=1 hoặc khi xuất bản) để mỗi lần dựng nhanh hơn, bớt một tệp 81 MB
if os.environ.get('BAN_THU')!='1':
    import sys; sys.exit(0)
h2=h.replace('<head>','<head><script id="thu100-js">'+open('src/thu100.js',encoding='utf-8').read()+'</script>',1).replace('</body>','<script id="thu100p-js">'+open('src/thu100_panel.js',encoding='utf-8').read()+'</script></body>',1)
assert h2.count('thu100-js')==1 and h2.count('thu100p-js')==1
open('Phi_Doi_Sao_Bang_THU.html','w',encoding='utf-8').write(h2);print('ban thu',round(len(h2)/1e6,2),'MB')
