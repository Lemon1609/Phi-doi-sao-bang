'use strict';
// V74 · SỔ TAY HƯỚNG DẪN — mỗi tính năng mở khóa / mở lần đầu: hướng dẫn nhiều trang (Là gì · Cách dùng · Cơ chế & mẹo).
//  • Hiện tự động 1 lần: khi vừa MỞ KHÓA (vượt ải mốc) hoặc khi MỞ BẢNG tính năng lần đầu.
//  • Xem lại bất cứ lúc nào: TIỆN ÍCH › SỔ TAY. Có nút tắt hướng dẫn tự động.
//  • Số liệu lấy từ code thật (V66 UNLOCK66, V70, V71, V72, V72b, V67…). Đổi số ở module gốc thì sửa chữ ở đây.
const Guide74=(()=>{
 const KEY='saobang-guide74-v1';
 let S={};try{S=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{}
 const first=!S.v;S.v=1;S.seen=S.seen||{};S.known=S.known||{};S.off=!!S.off;
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const cleared=()=>{try{return Onboard66.cleared();}catch{}try{return Math.max(0,...Progress.getState().cleared);}catch{return 0;}};
 const ob=k=>{try{return Onboard66.open(k);}catch{return true;}};
 const B=(t)=>`<b>${t}</b>`,L=a=>'<ul>'+a.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
 // ---------- nội dung ----------
 const G=[
  {k:'basic',n:'Cơ bản trận đấu',ic:'✈',c:'#4cc9f0',lv:0,open:()=>true,p:[
   ['Điều khiển',L(['Giữ và kéo ngón tay để lái chiến cơ. Chiến cơ '+B('tự bắn')+'.','Chấm sáng ở giữa thân tàu là '+B('điểm trúng đạn')+'. Chỉ khi đạn chạm chấm này mới mất máu, nên có thể lách rất sát.','Nút '+B('BOM')+': xóa sạch đạn địch, gây sát thương toàn màn và bất tử 2 giây. '+B('TÊN LỬA')+' bắn theo bệ đang lắp.'])],
   ['Graze & Bạo Tẩu',L(['Bay '+B('sát đạn địch mà không chạm')+' sẽ nạp thanh GRAZE.','Đầy thanh: '+B('tăng 1 cấp đạn')+'. Đạn tối đa cấp 4, đầy thêm lần nữa sẽ kích '+B('BẠO TẨU')+': đạn mạnh nhất, mỗi lần tối đa 12 giây.','Đang Bạo Tẩu thì Graze chỉ nạp 30%.'])],
   ['Sao ★ mỗi ải',L(['★1: qua ải.','★2: qua ải mà còn đủ máu: ≥ 60% (chương 1–2), 55% (ch.3), 50% (ch.4), 45% (ch.5–6), 40% (ch.7–8).','★3: mục tiêu riêng ghi ở đầu ải. Ải boss: hạ boss trong thời gian quy định. Ải thường lần lượt: không dùng bom / lách sát đạn đủ số lần / hạ ≥ 65% tinh anh / kích Bạo Tẩu 1 lần (hoặc kết thúc ải với hỏa lực tối đa).','Lượt có Van hỗ trợ chỉ được tối đa 2★.'])]]},
  {k:'nav',n:'Bố cục mới · 5 tab',ic:'🧭',c:'#ffd166',lv:0,open:()=>true,p:[
   ['5 tab dưới đáy',L([B('SẢNH')+': chiến cơ, Xuất kích, Vô tận.',B('CHIẾN ĐẤU')+': Bản đồ · Phó bản · Thử thách (Ngày, Tháp, Vô tận) · Viễn chinh.',B('PHI ĐỘI')+': Chiến cơ · Phi công · Hợp thể (mọi thứ SSS) · Tối thượng.',B('TRANG BỊ')+': Kho đồ · Đá khảm · Vật liệu.',B('CỬA HÀNG')+': Kho báu · Chợ đen · Tiệm skin.'])],
   ['Ở sảnh',L(['Hàng trên: '+B('QUÀ')+' (Nhiệm vụ, Điểm danh, Thành tựu) · '+B('KHO BÁU')+' · '+B('HỆ THỐNG')+' (Cài đặt, Sao lưu, Sổ tay, Xem chiến cơ).','Hai bên chiến cơ là 4 lối tắt việc hằng ngày. Lối tắt tự đổi theo chặng chơi.','Chạm thẻ phi công để mở Phi công. Quà treo máy '+B('Tuần tra')+' nằm ở góc Bản đồ.'])],
   ['Chấm đỏ',L(['Chấm đỏ chỉ hiện khi '+B('có quà nhận được ngay')+', hoặc việc trong ngày chưa mở.','Tab dưới đáy có chấm khi có ít nhất một mục bên trong cần xem.','Ô mờ "Ải X" là tính năng sắp mở.'])]]},
  {k:'gem',n:'Kim cương 💎',ic:'💎',c:'#7df9ff',lv:0,open:()=>true,p:[
   ['Kiếm ở đâu',L(['Qua ải lần đầu: '+B('+10')+' (ải boss lớn '+B('+25')+'). Đủ 50★ một chương: '+B('+80')+'.','Mốc '+B('năng động ngày')+' (20→100 điểm): tổng 50 💎 + hợp kim, 20 🔋/ngày. Mốc '+B('năng động tuần')+' (100→500): tổng 150 💎/tuần.','Quà 7 ngày đầu: tổng 3.400 💎. Thẻ tháng: 70 💎 mỗi ngày.','Điểm danh ngày 3: +30, ngày 7: +70. Thử thách ngày: +15. Tháp Boss: +20 mỗi 5 tầng. Vòng quay may mắn có ô 50 💎.'])],
   ['Tiêu vào đâu',L(['Quay thêm '+B('Vòng quay may mắn')+': giá leo thang 40 💎 (lượt 1–3), 70 💎 (4–6), 120 💎 (7–10); ×10 là 810 💎 khi chưa quay trả phí trong ngày.','Mua thêm lượt '+B('Phó bản giới hạn')+': 30 💎 rồi 60 💎.','Mua '+B('Thể lực')+' (+100 🔋): 60/90/120 💎, 3 lần/ngày. '+B('Thẻ tháng')+': 1.200 💎.','Chợ Đen: làm mới ngay 50 💎 (5 lần/ngày), quầy kim cương bán mảnh phi công, bản sao Lam/Tím Lv1, vé càn quét, vé phó bản, '+B('Đá Tinh Luyện SSS')+'.',B('Tinh luyện SSS')+' (HỢP THỂ → TINH LUYỆN): món SSS +5, 150 💎 hoặc 1 đá + 20K ◈, +0,5–1,5% mỗi lần, trần +15%.'])],['Thể lực 🔋',L(['Tối đa '+B('120')+', hồi 1 mỗi 5 phút kể cả khi tắt game.','Chỉ tốn khi '+B('chơi lại ải đã qua')+' (thường 6, boss 10), vào '+B('phó bản tài nguyên')+' (15) và '+B('càn quét')+' (6 mỗi ải). Lần đầu qua ải luôn miễn phí.','Hết 10 lượt càn quét miễn phí thì dùng '+B('vé càn quét 🎫')+'.'])]]},
  {k:'wheel',n:'Vòng quay may mắn',ic:'🎡',c:'#ff2a6d',lv:45,open:()=>{try{return Econ74.wOpen();}catch{return false;}},sel:'#w74:not([hidden])',p:[
   ['Là gì','Sự kiện quay thưởng hằng ngày. Đây là '+B('nguồn chính của mảnh Vũ khí tối thượng')+', ngoài ra còn ra linh kiện, mảnh skin, hợp kim và kim cương.'],
   ['Lượt & bảo hiểm',L([B('2 lượt free/ngày')+': lượt đầu có ngay, lượt 2 mở khi qua 3 ải trong ngày.','Quay thêm: 40 💎 (lượt 1–3), 70 💎 (4–6), 120 💎 (7–10); ×10 giá 810 💎, tối đa 10 lượt trả phí mỗi ngày.',B('Bảo hiểm')+': cứ 10 lượt chắc chắn trúng ≥ 5 mảnh tự chọn; 50 lượt chắc chắn trúng JACKPOT 20 mảnh.','Chủ Nhật: ô mảnh skin ×2. Vũ khí tối thượng mở ở ải 90, nhưng mảnh nhận trước đó vẫn được giữ.'])]]},
  {k:'limited',n:'Phó bản giới hạn',ic:'⏱',c:'#ff7b00',lv:45,open:()=>{try{return Econ74.lOpen();}catch{return false;}},sel:'#l74x:not([hidden])',p:[
   ['Luật chơi',L(['Vào thẳng trận boss. Hạ boss trong '+B('60 giây')+' là thắng; hết giờ hoặc bị hạ là thua.',B('1 lượt free/ngày')+', mua thêm 2 lượt bằng 💎 (30 rồi 60). Vào trận là tính lượt.'])],
   ['4 cấp',L(['Dễ (⚡3.200): 3 mảnh tự chọn · 2 linh kiện · 1.500 ◈.','Vừa (⚡5.800): 5 · 4 · 2.500 ◈. Khó (⚡9.500): 8 · 6 · 4.000 ◈.','Ác mộng (⚡14.000): 12 mảnh · 10 linh kiện · 6.000 ◈.','Vào ở '+B('CHIẾN ĐẤU › Thử thách')+' hoặc '+B('PHI ĐỘI › Tối thượng')+'.'])]]},
  {k:'quality',n:'Nâng khung phẩm chất',ic:'⬆',c:'#b45cff',lv:0,sel:'.adv70:not([hidden])',open:()=>true,p:[
   ['Là gì','Mỗi chiến cơ và trang bị có '+B('12 nấc')+' theo 4 khung màu: '+B('Trắng → Lục → Lam → Lam+1..+3 → Tím → Tím+1..+5')+'.<br>Khung càng cao thì '+B('trần cấp')+' càng cao (25 → 100), chỉ số mỗi nấc tăng thêm khoảng 3,6%, và ngoại hình đổi theo khung.'],
   ['Cách nâng',L(['Đạt '+B('trần cấp')+' của nấc hiện tại thì mới nâng được.',B('Đổi khung')+' (→Lục, →Lam, →Tím): cần '+B('mỗi loại 1')+' nguyên liệu cùng màu khung đích (Lõi Hợp Kim, Tinh Thể, Mạch Lượng Tử, Sợi Plasma), cộng hợp kim ◈ và đá ⬢. Nguyên liệu chỉ rơi ở '+B('ải mini boss ◆ và ải boss ♛')+', mỗi ải '+B('một loại cố định')+': ải 5 Lõi Hợp Kim, ải 10 Tinh Thể, ải 15 Mạch Lượng Tử, ải 20 Sợi Plasma, rồi lặp lại (25 Lõi Hợp Kim…). Lần đầu vượt rơi 2 cái; đánh lại: mini boss 1, boss 1 (50% thêm 1); càn quét 1. Icon nhỏ trên nút ải boss ở bản đồ cho biết loại sẽ rơi. Màu nguyên liệu theo dải ải. Phó bản vật liệu cũng rơi. '+B('Trang bị và bản sao chiến cơ/trang bị')+' không rơi ở ải chiến dịch thường — chỉ có ở '+B('Vô tận')+' và '+B('phó bản trang bị')+'. Bù lại, '+B('Thành tựu')+' tặng lần lượt từng '+B('bộ chiến cơ + trang bị')+' theo tiến độ: Lục → Lam → Tím rồi sang bộ kế tiếp.',B('Nấc cộng')+' (Lam+n, Tím+n): cần '+B('bản sao thật')+' đúng mẫu (xem Kho bản sao), cộng hợp kim.'])],
   ['Bản sao & đột phá',L(['V82: '+B('không còn phôi')+'. Mọi chiến cơ, trang bị rơi ra là '+B('bản sao Level 1')+' (khung Trắng / Lục / Lam), cất ở '+B('Kho bản sao')+' (tối đa 250).','Đột phá 11 bước Trắng → Tím+5: món chính đạt '+B('trần cấp')+' + bản sao '+B('cùng mẫu')+' hoặc món '+B('cùng loại')+' đã nâng đủ khung/cấp + bộ nguyên liệu màu ở các bước đổi khung.','Bản sao tự nâng cấp và đột phá như món thật. Dùng làm nguyên liệu được '+B('hoàn 85% ◈ · 90% ⬢')+' đã nâng; tách đồ hoàn 80% · 85%.','Đồ bậc S/SS thiếu bản sao cùng mẫu: mỗi bản thiếu thay bằng 2 món cùng loại. Bấm 🔒 để giữ bản sao không bị dùng.','Nguồn: Vô tận (30 món/ngày, món chưa có thì mở khóa), phó bản trang bị, ải boss ÷10, quà Thành tựu (bản sao + bộ nguyên liệu).','Trang bị SSS không dùng bản sao, mà đột phá ★ bằng '+B('Tinh Hạch Siêu Việt')+'.'])]]},
  {k:'daily',n:'Điểm danh',ic:'📅',c:'#ffd166',lv:3,open:()=>ob('daily'),p:[
   ['Là gì','Vào game mỗi ngày để nhận quà theo chuỗi ngày đăng nhập.'],
   ['Cách dùng',L(['Bấm '+B('ĐIỂM DANH')+' trên thanh trên cùng của sảnh. Chấm đỏ ! nghĩa là hôm nay chưa nhận.','Giữ chuỗi ngày liên tục để nhận quà mốc lớn hơn.'])]]},
  {k:'chest',n:'Kho báu',ic:'🎁',c:'#ffb703',lv:5,open:()=>ob('chest'),p:[
   ['Là gì','Trang '+B('Rương')+': mở rương để nhận hợp kim, đá nâng cấp và mảnh trang bị.'],
   ['Cách dùng',L(['Bấm '+B('KHO BÁU')+' ở góc phải trên cùng sảnh, hoặc nút '+B('RƯƠNG')+' trên thanh dưới.','Cùng trang có tab '+B('Phó bản')+' và '+B('Hệ thống')+'.'])]]},
  {k:'dungeon_gold',n:'Phó bản',ic:'⛏',c:'#ffd166',lv:8,open:()=>ob('dungeon_gold'),p:[
   ['Là gì','Các ải phụ để '+B('cày tài nguyên')+', không ảnh hưởng tiến độ chiến dịch.'],
   ['Các loại',L([B('Phó bản Vàng')+' (ải 8): hợp kim ◈.',B('Phó bản Trang bị')+' (ải 12): bản sao Lv1, có thể rơi trang bị/chiến cơ bậc S–SS.',B('Phó bản Vật liệu')+' (ải 15): đá nâng cấp và nguyên liệu nâng khung.',B('Phó bản Ngọc')+' (ải 20): mảnh ngọc (ghép ngọc mở ở ải 35).']),],
   ['Mẹo',L(['Vào ở '+B('Bản đồ › Phó bản · Nhiệm vụ')+'.','Kẹt ở ải boss thì vào phó bản cày đồ trước. Vài phó bản mở sớm nếu thua boss nhiều lần.'])]]},
  {k:'challenge',n:'Thử thách ngày',ic:'⚑',c:'#ff5d8f',lv:10,open:()=>ob('challenge'),p:[
   ['Là gì','Mỗi ngày một '+B('luật đặc biệt')+' (có 10 luật xoay vòng), ví dụ đạn địch nhanh hơn 30%, chỉ 1 mạng, hay không có bom.'],
   ['Thưởng & cơ chế',L(['Không tính sao chiến dịch, không có Van hỗ trợ, thua không bị đếm.','Thưởng: hợp kim theo ải và chương, vật liệu ×2.','Chơi '+B('nhiều ngày liên tiếp')+': thưởng +10% mỗi ngày, tối đa +40%.'])]]},
  {k:'patrol',n:'Tuần tra (treo máy)',ic:'⌖',c:'#4cc9f0',lv:10,open:()=>cleared()>=10,p:[
   ['Là gì','Phi đội tự đi tuần khi bạn '+B('không chơi')+'. Quay lại sẽ nhận hợp kim và đá khảm.'],
   ['Cơ chế',L(['Tích tối đa '+B('12 giờ')+'. Quá 12 giờ không tích thêm, nên hãy nhận thường xuyên.','Ải đã vượt càng cao thì mỗi giờ nhận càng nhiều.','Cứ 2 giờ được 1 đá phẩm thấp, cứ 6 giờ được 1 đá Lam.'])]]},
  {k:'elite76',n:'Quái tinh anh & Graze combo',ic:'★',c:'#ff5500',lv:20,open:()=>true,p:[
   ['4 ấn tố tinh anh',L([B('Thiết Giáp Từ Tính')+' (lục giác xanh): 3,5 s đầu chặn đạn chính. Tên lửa, tàu con và bom vẫn trúng; bom phá khiên ngay.',B('Lôi Đình Bộc Phá')+' (vòng cam nhịp tim): chết thì nổ 12 viên đạn chậm, sượt qua để ăn Graze.',B('Huyễn Ảnh Tốc Biến')+' (tàn ảnh tím): lượn zíc-zắc, mỗi 2,2 s lướt ngang 100 px.',B('Hắc Động Trọng Lực')+' (xoáy tối): đứng cùng hàng ngang với nó bị chậm 25% và bị hút nhẹ.','Ải 20–59: 1 con mỗi đợt · ải 60–119: 1–2 · ải 120+ và Vô tận: 2–3. Hạ tinh anh được thêm hợp kim.'])],
   ['Graze combo',L(['Mỗi viên sượt qua cộng combo, giữ 3,5 s; hết giờ combo tụt 10/giây. Trúng đạn mất hết combo.','Điểm sượt ×1 → ×5 theo combo; nạp thanh Graze thêm tới +50% ở combo 100.',B('×20')+': sóng điện xóa đạn quanh tàu + 5% giáp · '+B('×50')+': xóa đạn rộng hơn, bất tử 0,8 s · '+B('×100')+': đại xung chấn 300% sát thương toàn màn + 3 s Bạo Tẩu.'])],
   ['Boss chương 1 & 3',L(['Boss ải 20 và ải 60 có 3 pha mới (đổi ở 70% và 30% máu), mỗi lần đổi pha xóa đạn 0,5 s.','Chương 1: quạt 5 tia + laser báo trước → xoắn ốc có khe 50 px → 2 drone hộ vệ + vòng đạn 18 viên.','Chương 3: đạn đan chéo + mìn nổ chữ thập → xoáy kép ngược chiều → mưa sét báo trước + dòng đạn quét.'])]]},
  {k:'overlimit',n:'Boss Vượt Hạn',ic:'☠',c:'#ff2a6d',lv:90,open:()=>{try{return O78.unlocked();}catch{return false;}},sel:'.o78p:not([hidden])',p:[
   ['Là gì',L(['10 bậc boss, vượt bậc trước mới mở bậc sau. Đặt lại '+B('0 giờ thứ Hai')+'.','3 lượt miễn phí/ngày, mua thêm 100 rồi 150 💎. Mỗi trận tối đa 150 giây.','Bậc 1–3 có 1 từ tố, 4–7 có 2, 8–10 có 3 (xoay mỗi tuần).'])],
   ['Phá giáp',L(['Thanh '+B('xanh ngọc')+' dưới máu boss là Giáp Hộ Thể (20% máu).','Phá hết: boss '+B('choáng 4 s')+', xóa đạn trên màn, nhận '+B('+50% sát thương')+'.'])],
   ['Thưởng',L([B('Lần đầu')+' vượt mỗi bậc (trọn đời): 150–400 💎, 30K–100K hợp kim, 300–1.000 huy hiệu.','Mỗi tuần vượt lại: 10–23 💎, 10K–40K hợp kim, 70–230 huy hiệu.','Đổi huy hiệu ở tab CỬA HÀNG: bản sao Tím, Lõi Siêu Hợp, bản sao Lam, danh hiệu.'])]]},
  {k:'bk78',n:'Phá Vây & Hạt giống',ic:'⛓',c:'#ff9e2c',lv:10,open:()=>{try{return Progress.getState().cleared.length>=10;}catch{return true;}},sel:'.bk78p:not([hidden])',p:[
   ['Phá Vây',L(['12 chặng ngẫu nhiên quanh tiến độ của bạn, '+B('không tốn thể lực')+'. Chết là hết lượt.','Chọn 1/3 '+B('Ấn Chú')+' trước chặng 1 và sau chặng 2, 4, 6, 8, 10. Ráp đúng cặp → '+B('Cộng Hưởng')+'.','Máu mang sang chặng sau (+10% máu, +15% giáp). Sau chặng 4 và 8: Sửa chữa hoặc lấy 40 Mảnh.'])],
   ['Thưởng Phá Vây',L(['2 lượt/ngày có thưởng: chặng 4 / 8 / 12 → 25 / 55 / 100 Mảnh, 2 / 5 / 10 Xu Tinh Anh, 5K / 12K / 25K ◈.','Mảnh mở khóa Ấn Chú Cam (100 / 150). Phá đảo 10 lần: danh hiệu Kẻ Phá Vây Thiên Hà.'])],
   ['Hạt giống',L(['Mỗi ngày mọi máy cùng '+B('1 ải + 2 Ấn Chú')+'. Điểm: hạ quái, Graze, chuỗi huy chương, máu còn, tốc độ, trừ lần trúng.','Bảng 50 phi công mô phỏng. Gửi '+B('mã khoe')+' cho bạn bè, nhập mã của họ để đua cùng.','Thưởng theo hạng 1 lần/ngày (nâng hạng được bù phần chênh).'])]]},
  {k:'fest78',n:'Lễ hội',ic:'🎉',c:'#ff8a1f',lv:0,open:()=>{try{return !!Fest78.active();}catch{return false;}},sel:'.f78p:not([hidden])',p:[
   ['Lịch',L(['Lễ hội tự mở theo lịch thật: '+B('Bí Ngô')+' (20/10–3/11), '+B('Giáng Sinh & Năm Mới')+' (20/12–4/1), '+B('Tết Nguyên Đán')+', '+B('Trung Thu')+', '+B('30/4')+' và '+B('2/9')+'.','Mở ở bảng QUÀ, dòng đầu tiên.'])],
   ['Nhận gì',L(['Mỗi ngày: '+B('20 💎 + 3.000 ◈')+'.','Hạ quái có 4% rơi vật phẩm lễ hội (quái lớn/tinh anh ×3), tối đa 60/ngày.','Đổi: hợp kim, kim cương, mảnh phi công, bản sao Lam Lv1, và '+B('danh hiệu + hào quang')+' quanh chiến cơ (bật/tắt).'])]]},
  {k:'rank77',n:'Hạng ải · Huy chương · Danh dự',ic:'🏅',c:'#00f5d4',lv:6,open:()=>{try{return Progress.getState().cleared.length>=6;}catch{return true;}},sel:'.v77p:not([hidden])',p:[
   ['Huy chương',L(['Hạ '+B('trọn 1 đội hình')+' trước khi có chiếc nào thoát → rơi huy chương lục giác ×1…×10.','Huy chương '+B('không tự hút')+', bay lên đón trong khi né đạn. Để rơi khỏi đáy: chuỗi về 0.','Mỗi bậc cộng 100 → 2.000 điểm.'])],
   ['Hạng ải',L([B('S+')+': diệt 100%, không trúng đạn, chuỗi huy chương ≥ ×5 (ải boss: hạ boss nhanh).',B('S')+': diệt ≥ 92%, trúng ≤ 1, Graze ≥ 30. '+B('A')+': diệt ≥ 85%, trúng ≤ 3.','Thưởng: +10% / +25% / +40% hợp kim của trận, kèm đá ⬢.'])],
   ['Xu Tinh Anh 🎖',L(['Lần đầu S (+1), S+ (+3) mỗi ải; 3 trận tự lái mỗi ngày đạt S/S+ (+3/+4).','Hoàn thành Thử thách ngày +4, mỗi 5 tầng Tháp +10.','Đổi ở '+B('CỬA HÀNG › DANH DỰ')+': vệt đuôi vàng, vòng Graze, danh hiệu +2% tốc độ bay, đá khảm, mảnh phi công, phôi Lam tự chọn. Không dùng 💎.'])],
   ['Mid-Boss & boss phụ',L(['Từ ải 61, sau đợt 3 có '+B('Mid-Boss')+' 20 giây: hạ kịp được +1.500 điểm, xóa đạn, rơi huy chương.','Boss ải ÷5 (không phải cuối chương) có 2 pha; dưới 50% máu đổi đòn.'])]]},
  {k:'codex',n:'Đồ giám & Cộng hưởng SSS',ic:'📚',c:'#7df9ff',lv:40,open:()=>true,sel:'.cx77p:not([hidden])',p:[
   ['Đồ giám',L(['Sưu tầm cộng chỉ số '+B('vĩnh viễn')+': mỗi chiến cơ +1% Công (Tím +1,5% Máu), mỗi mẫu trang bị Tím +0,3% Giáp, mỗi món SSS +0,67% Công & Giáp, mỗi phi công Tím+5 +0,75% Công & Máu.','Mốc 25%: +5% hợp kim/đá · 50%: hồi sinh miễn phí 1 lần/ngày · 75%: −10% thể lực · 100%: +5% mọi chỉ số + danh hiệu.'])],
   ['Cộng hưởng SSS',L(['4 hệ: 🔥 Hỏa · ❄ Băng · ⚡ Lôi · 🌀 Hư Vô. Lắp 2 hoặc 3 món SSS cùng hệ ở 3 ô để mở hiệu ứng trong trận.','Huy hiệu hệ đang kích hoạt hiện dưới thanh máu.'])],
   ['Bộ skin',L(['Đủ 3 skin cùng chủ đề (đạn + khung + nổ) nhận danh hiệu dưới tên ở sảnh và 1 đặc quyền nhỏ.'])]]},
  {k:'tower',n:'Tháp Boss',ic:'♜',c:'#ff7b00',lv:15,open:()=>ob('tower'),p:[
   ['Là gì','Leo tầng, mỗi tầng một boss ngày càng mạnh.'],
   ['Mẹo',L(['Vào ở nút '+B('THÁP BOSS')+' trên sảnh.','Thưởng theo tầng cao nhất đã vượt. Mạnh lên rồi quay lại leo tiếp.'])]]},
  {k:'endless',n:'Vô tận',ic:'∞',c:'#00f5d4',lv:25,open:()=>ob('endless'),p:[
   ['Là gì','Chế độ '+B('sống sót qua nhiều đợt')+', càng về sau càng khó. Ghi kỷ lục đợt cao nhất.'],
   ['Rương & mẹo',L(['Mỗi boss Vô tận rơi 1 '+B('rương')+'. Hết lượt, rương '+B('tự mở')+' và hiện bảng kết quả.','Rương ra '+B('chiến cơ / trang bị Lv1')+' bất kỳ (trừ SSS): chưa có thì mở khóa, đã có thành bản sao. Rương B: 1 món, rương A: 2 món. Tối đa 30 món mỗi ngày. Bậc S ~1%, SS rất hiếm.','Bấm nút cam '+B('VÔ TẬN')+' ở cuối sảnh.','Dùng bom lúc đạn dày. Một số đá hiệu ứng cho vào trận vượt sẵn vài đợt.'])]]},
  {k:'sss',n:'Trang bị SSS & Hợp thể',ic:'★',c:'#ffd166',lv:40,open:()=>ob('sss'),p:[
   ['Là gì','Bậc trang bị cao nhất. '+B('Hợp thể')+' ghép trang bị và chiến cơ thành món SSS hoặc '+B('siêu chiến cơ')+'.'],
   ['Đột phá ★',L(['Đồ SSS không nâng khung, mà '+B('đột phá ★1 → ★10')+' bằng '+B('Tinh Hạch Siêu Việt')+' cộng hợp kim.','Mỗi ★ cho món đó +4% sát thương; siêu chiến cơ được +5% toàn bộ sát thương.','Tinh Hạch rơi ở màn khó: '+B('Nguyệt Thực')+' và '+B('Chương 9')+'.'])]]},
  {k:'eclipse',n:'Nguyệt Thực',ic:'◐',c:'#c77dff',lv:60,open:()=>{try{return Progress.getState().cleared.includes(60);}catch{return false;}},p:[
   ['Là gì','Bản '+B('khó')+' của các ải chiến dịch (E1–E160): quái khỏe và bắn mạnh hơn, đổi lại thưởng tốt hơn.'],
   ['Mở & thưởng',L(['Mở khi đã vượt '+B('ải 60')+' và có ít nhất một món cường hóa từ +3 trở lên.','Lực chiến đề nghị khoảng 1,6 lần ải thường cùng số.','Rơi nhiều nguyên liệu '+B('Tím')+', Tinh Hạch Siêu Việt và '+B('Bụi Tinh Vân')+'.','Vào bằng nút '+B('VIỄN CHINH')+' bên trái sảnh.'])]]},
  {k:'stone',n:'Đá khảm',ic:'◆',c:'#00f59b',lv:70,sel:'.st71:not([hidden])',open:()=>cleared()>=70,p:[
   ['Là gì','Khảm đá vào '+B('Chiến cơ · Giáp · Tên lửa · Tàu con')+' để tăng chỉ số hoặc có hiệu ứng trong trận. Đá có 5 phẩm: Trắng · Lục · Lam · Tím · Cam.'],
   ['Ô khảm',L(['Mỗi món 5 ô, mở theo khung phẩm chất: '+B('Lam · Lam+2 · Tím · Tím+3 · Tím+5')+'. Đồ SSS mở theo ★1/3/5/7/9.',B('Đá chỉ số')+': % tấn công của chính món đó, hoặc % máu và giáp (với Giáp).',B('Đá hiệu ứng')+': tác dụng trong trận, không cộng lực chiến.',B('Ω / Σ')+': chỉ lắp đúng mẫu, mỗi món 1 viên mỗi loại. '+B('α / β')+' ở ô 4–5.'])],
   ['Nâng & nguồn',L([B('Tụ hợp')+': 5 viên cùng loại cùng phẩm ghép thành 1 viên phẩm cao hơn.',B('Tẩy đá')+' (Tím, Cam): đổi lại dòng hiệu ứng.',B('Tinh hóa')+' trang bị Lam/Tím thừa thành đá.','Nguồn đá: Tuần tra, ải boss, phân giải. Đủ đá Cam ở cả 4 vị trí ≈ +19% lực chiến.'])]]},
  {k:'ult',n:'Vũ khí tối thượng',ic:'✸',c:'#ff7b00',lv:90,sel:'.u72.srm:not([hidden])',open:()=>cleared()>=90,p:[
   ['Là gì','4 vũ khí: '+B('Pháo Đài')+' (trụ laser chặn đạn), '+B('Thế Giới')+' (dừng thời gian), '+B('Săn Sao')+' (lưỡi cưa tiến hóa), '+B('Lưới Điện Laser')+' (lưới làm chậm). Vượt ải 90 được chọn 1 vũ khí miễn phí.'],
   ['Ô & chỉ số',L([B('1 ô Chủ chiến')+': nhận 100% chỉ số và có kỹ năng.',B('2 ô Trợ chiến')+' (mở ở ải 100 và 120): mỗi ô nhận 25% chỉ số, không có kỹ năng.','Chỉ số là % tấn công, máu và giáp cho cả đội, '+B('trần 12%')+'.'])],
   ['Nâng cấp & kỹ năng',L(['Cấp 1–100. Mỗi 10 cấp '+B('lên đời')+' bằng mảnh, linh kiện và hợp kim: Trắng → … → Tím+3 → '+B('Huyền thoại')+' → +5.','Kỹ năng cơ bản '+B('tự kích')+'. Từ Huyền thoại mở '+B('kỹ năng tối thượng')+': bấm nút tròn trong trận khi đã sạc đầy.','Mảnh lấy từ '+B('NHIỆM VỤ')+' ngày, tuần và một lần. Mảnh tự chọn gắn được vào vũ khí nào cũng được.'])]]},
  {k:'chip',n:'Chip giao thức',ic:'▣',c:'#c77dff',lv:110,sel:'.c72:not([hidden])',open:()=>cleared()>=110,p:[
   ['Là gì','Chip lắp vào vũ khí tối thượng. Mỗi vũ khí có '+B('6 ô')+': 2 Hỏa lực (vuông), 2 Cấu trúc (lục giác), 2 Mạch liên kết (tròn). '+B('Chỉ chip trên vũ khí Chủ chiến có tác dụng')+'.'],
   ['Phẩm & bộ',L(['7 phẩm, từ Chế thức đến Tuyệt mật. Chip có chỉ số chính và 1–3 dòng phụ ngẫu nhiên.','Mỗi chip tối đa +6% mỗi chỉ số; cả bộ chip tối đa +18%.',B('Bộ')+': mỗi vũ khí có 2 bộ riêng, thưởng khi đủ 3 và 6 chip. Chỉ chip bản Giao ước và Tuyệt mật mới tính bộ.'])],
   ['Thao tác',L([B('Sản xuất')+' bằng tinh thể (đảm bảo ra chip tốt sau 10 lần), '+B('Luyện')+' 20 lần, '+B('Tái tạo')+' 30 lần (khóa được 1 dòng), '+B('Ghép')+' 5 thành 1, Nâng cấp, Phân giải.'])]]},
  {k:'pilot',n:'Phi công',ic:'👩‍✈️',c:'#00f5d4',lv:0,sel:'.pl67:not([hidden])',open:()=>true,p:[
   ['Là gì','Phi công cộng chỉ số và có '+B('nội tại')+' riêng (ví dụ nạp Graze nhanh, Bạo Tẩu lâu hơn, hồi giáp, chí mạng…).'],
   ['Đội hình',L([B('1 phi công chính')+': đủ chỉ số và nội tại.',B('3 phi công phụ')+': mỗi người góp 5% chỉ số cơ bản, không có nội tại.','Đủ 4 người: '+B('Cộng hưởng')+', +10% nạp Graze.','Nâng cấp phi công và cây '+B('Tiềm năng')+' để tăng chỉ số.'])],['12 nấc phẩm chất',L(['Trắng → Lục → Lam (+1…+3) → Tím (+1…+5). Mỗi nấc mở trần cấp mới (10 → 60).','Đạt trần cấp thì '+B('NÂNG NẤC')+' bằng mảnh đúng phi công đó + hợp kim. Nấc càng cao chỉ số và nội tại càng mạnh.','Hạng A vào nấc Trắng, S vào nấc Lam, SS (Tử Dạ) vào nấc Tím.','Mảnh: qua ải, Chợ Đen, nhiệm vụ năng động, Tháp Boss (mỗi 5 tầng 1 hộp 5–12 mảnh), Vô tận đợt 20/30.'])]]},
  {k:'trade',n:'Giao dịch & Skin',ic:'⇄',c:'#ffd166',lv:0,sel:'.tr67:not([hidden])',open:()=>true,p:[
   ['Chợ Đen',L(['Có '+B('6 ô hàng, làm mới mỗi ngày')+'. Thứ Bảy và Chủ Nhật có '+B('Phiên Chợ Hiếm giảm 30%')+'.','Đổi đá, hợp kim, vé càn quét và lõi. Hàng làm mới mỗi 6 giờ.'])],
   ['Skin',L(['Skin '+B('chỉ đổi hình ảnh')+', không cộng chỉ số: hình đạn và khung hào quang quanh chiến cơ.'])]]},
  {k:'ch9',n:'Chương 9 · Tinh Vân Đen',ic:'✦',c:'#9d4edd',lv:160,open:()=>cleared()>=160,p:[
   ['Là gì','Ải 161–180, sau ải 160. Có '+B('xoáy hút')+' và '+B('thiên thạch báo trước')+' trên đường bay.'],
   ['Mở & thưởng',L(['Cần vượt ải 160, và có ≥ 1 món SSS hoặc siêu chiến cơ, hoặc lực chiến ≥ 12.000.','Rơi '+B('Bụi Tinh Vân')+' và Tinh Hạch Siêu Việt.'])]]}];
 const byK=k=>G.find(g=>g.k===k);
 const GIC={basic:'tab_chien_co',nav:'tab_sanh',quality:'ic_cuong_hoa',daily:'ic_diem_danh',chest:'tab_ruong',dungeon_gold:'ic_nguyen_lieu',challenge:'ic_thu_thach',patrol:'ic_tuan_tra',tower:'ic_thap_boss',sss:'ic_trang_bi_sss',eclipse:'ic_vien_chinh',stone:'ic_da_kham',ult:'ic_vu_khi_tt',chip:'ic_hop_the',pilot:'ic_phi_cong',trade:'ic_giao_dich',ch9:'ic_cot_truyen',gem:'res_kim_cuong'};
 const gIc=g=>{const k=GIC[g.k];return k&&typeof ICON74!=='undefined'&&ICON74[k]?`<img class="ic74" src="${ICON74[k]}" alt="">`:g.ic;};
 // ---------- giao diện ----------
 let el=null,cur=null,pi=0,queue=[];
 function ensure(){if(el)return;el=document.createElement('div');el.id='g74';el.className='g74';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-g]');if(!t){return;}const a=t.dataset.g;
   if(a==='next'){pi=Math.min(cur.p.length-1,pi+1);draw();}else if(a==='prev'){pi=Math.max(0,pi-1);draw();}
   else if(a==='close'){done();}else if(a==='off'){S.off=!S.off;save();draw();}
   else if(a==='lib'){library();}else if(a==='open'){show(t.dataset.k,true);}
   else if(a==='dot'){pi=+t.dataset.i;draw();}});}
 function draw(){const g=cur,pg=g.p[pi],last=pi===g.p.length-1;
  el.innerHTML=`<div class="g74c" style="--gc:${g.c}"><div class="g74h"><i>${gIc(g)}</i><div><small>${g.unl?'★ MỞ KHÓA MỚI':'HƯỚNG DẪN'}</small><b>${g.n}</b></div><button type="button" data-g="close" class="g74x">✕</button></div>
   <div class="g74t">${pi+1}/${g.p.length} · ${pg[0]}</div><div class="g74b">${pg[1]}</div>
   <div class="g74d">${g.p.map((_,i)=>`<i data-g="dot" data-i="${i}" class="${i===pi?'on':''}"></i>`).join('')}</div>
   <div class="g74f"><button type="button" data-g="prev" ${pi?'':'disabled'}>‹ TRƯỚC</button>${last?`<button type="button" class="go" data-g="close">ĐÃ HIỂU</button>`:`<button type="button" class="go" data-g="next">TIẾP ›</button>`}</div>
   <label class="g74o"><button type="button" data-g="off" class="${S.off?'on':''}">${S.off?'☐':'☑'}</button> Tự hiện hướng dẫn khi mở tính năng mới · <a data-g="lib">Sổ tay</a></label></div>`;el.hidden=false;}
 function show(k,manual){const g=byK(k);if(!g)return false;ensure();cur=Object.assign({},g,{unl:!manual&&g.unlNow});pi=0;S.seen[k]=1;S.rd=S.rd||{};if(!S.rd[k]){S.rd[k]=1;try{Econ74.add(20,'đọc Sổ tay · '+g.n);}catch{}}save();draw();return true;}
 // REVIEW75: không tự bật bảng che màn hình — chỉ hiện băng thông báo nhỏ 4 giây, chạm để đọc (lần đầu đọc mỗi bài +20 💎)
 let bn=null,bnT=0;
 function banner(k){const g=byK(k);if(!g)return;S.seen[k]=1;save();if(!bn){bn=document.createElement('button');bn.type='button';bn.className='g75b';document.body.appendChild(bn);bn.addEventListener('click',()=>{const kk=bn.dataset.k;bn.hidden=true;show(kk,true);});}
  bn.dataset.k=k;bn.innerHTML=`<i>${g.ic||'📘'}</i><span><b>${g.unlNow?'ĐÃ MỞ':'HƯỚNG DẪN'} · ${g.n}</b><small>Chạm để xem${S.rd&&S.rd[k]?'':' · +20 💎 lần đầu'}</small></span>`;bn.hidden=false;clearTimeout(bnT);bnT=setTimeout(()=>{if(bn)bn.hidden=true;},4200);}
 function done(){el.hidden=true;cur=null;const nx=queue.shift();if(nx)setTimeout(()=>show(nx),250);}
 function library(){ensure();cur=null;const c=cleared();
  el.innerHTML=`<div class="g74c lib" style="--gc:#4cc9f0"><div class="g74h"><i>📖</i><div><small>PHI ĐỘI SAO BĂNG</small><b>SỔ TAY</b></div><button type="button" data-g="close" class="g74x">✕</button></div>
   <div class="g74lib">${G.map(g=>{const op=g.open();return `<button type="button" data-g="${op?'open':'x'}" data-k="${g.k}" class="${op?'':'lk'}" style="--gc:${g.c}"><i>${gIc(g)}</i><b>${g.n}</b><small>${op?(S.seen[g.k]?'Đã xem':'<em>MỚI</em>'):'Mở ở ải '+g.lv}</small></button>`;}).join('')}</div>
   <label class="g74o"><button type="button" data-g="off" class="${S.off?'on':''}">${S.off?'☐':'☑'}</button> Tự hiện hướng dẫn khi mở tính năng mới</label></div>`;el.hidden=false;
  el.querySelectorAll('[data-g="off"]').forEach(b=>b.addEventListener('click',()=>setTimeout(library,0),{once:true}));}
 // ---------- kích hoạt tự động ----------
 const busy=()=>{try{return typeof mode!=='undefined'&&['play','pause','reward'].includes(mode);}catch{return false;}};
 function tick(){if(busy())return;
  const fresh=[];for(const g of G){let op=false;try{op=g.open();}catch{}
   if(op&&!S.known[g.k]){S.known[g.k]=1;save();if(!first&&!S.seen[g.k]&&!S.off&&g.lv>0)fresh.push(g);}}
  if(fresh.length>2){try{toast('📖 CÓ '+fresh.length+' HƯỚNG DẪN MỚI · TIỆN ÍCH › SỔ TAY');}catch{}}
  else for(const g of fresh){g.unlNow=1;queue.includes(g.k)||queue.push(g.k);}
  if(!S.off&&(!el||el.hidden)){for(const g of G){if(!g.sel||S.seen[g.k])continue;const p=document.querySelector(g.sel);if(p&&p.getClientRects().length){g.unlNow=0;(window.G75MODAL?show:banner)(g.k);return;}}}
  if((!el||el.hidden)&&queue.length){const lb=document.getElementById('hgr41');if(lb&&!lb.hidden&&!document.querySelector('.m63:not([hidden]),.l74pg:not([hidden])'))(window.G75MODAL?show:banner)(queue.shift());}}
 if(first){try{for(const g of G)if(g.open())S.known[g.k]=1;}catch{}save();}
 // nút SỔ TAY vào cột ẩn của sảnh (Lobby74 gom vào trang TIỆN ÍCH)
 setInterval(()=>{try{const sd=document.querySelector('#hgr41 .h1-side');if(sd&&!sd.querySelector('[data-g74]')){const b=document.createElement('button');b.dataset.g74=1;b.textContent='SỔ TAY';b.addEventListener('click',e=>{e.stopPropagation();library();});sd.appendChild(b);}tick();}catch(e){}},900);
 return {show:k=>show(k,true),banner,library,list:()=>G.map(g=>g.k),state:()=>JSON.parse(JSON.stringify(S)),reset:()=>{S={v:1,seen:{},known:{},off:false};save();}};
})();
