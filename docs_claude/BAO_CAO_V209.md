# BÁO CÁO V209 · Phi Đội Sao Băng · 08/11/2026

## Đã ghép

| Hạng mục | Nguồn | Nội dung |
|---|---|---|
| Nền xa chương 8–10 | GPT | `ch8_xa`, `ch9_xa`, `ch10_xa`. Claude làm mượt 32 hàng cuối để nối liền khi cuộn (chênh lệch mép trên–dưới từ 0,5–1,1 còn 0,01–0,03). Chương 6–10 nay đủ 3 lớp |
| G3 · tên + thanh máu boss | GPT | Tên 15 px (tự thu nhỏ tới 11 px nếu dài, luôn một dòng) màu #F2F7FF trên nền #071726 90%; thanh cao 10 px, rãnh #132232, máu lõi lam #4DB8FF (các ống máu xen kẽ 2 sắc lam); ô cánh tím lam #A68AFF có viền. Vị trí giữ nguyên: trên đầu boss. Tắt: `G3_209=false` |
| Chướng ngại tăng dần chương 6–10 | Gemini | Máu đá 2,2× → 3,8×, máu tháp 3,5× → 6,0×. Nhịp đá 8–10 s → 5,5–7,5 s. Tháp mỗi 24 s → 18 s, bắn mỗi 2,6 s → 2,0 s. Tháp phải bắn lệch pha 1,2 s. Tối đa vẫn là 2 đá + 1 cặp tháp |
| Thưởng phá tháp | Gemini | Mỗi tháp: 1 sao lớn 140 điểm + 25 ◈, 25% rơi viên buff (Hỏa lực / Khiên / Siêu cấp). Phá trọn cặp: thêm 60 ◈ và 1 huy chương liên hoàn. Vật phẩm rơi được đẩy vào cách mép 36 px |
| D7 · 6 nội tại giáp theo sự kiện | Gemini | Khiên Siêu Cấp · Tiếp Tế Mạch · Phá Chướng Nạp · Lách Đạn Phản · Xung Phá Vây · Chiến Lợi Thuẫn. Đúng số, hồi nội bộ và trần mỗi phút theo cấu hình. Giáp SSS kế thừa nội tại của cả 2 giáp mẹ ở Lv5. Mô tả hiện trên chi tiết giáp và trong xưởng SSS. Tắt: `ARMOR_EV209=false` |

## Claude tự quyết khi cấu hình chưa nói rõ
- **Huy chương thưởng tháp** đánh dấu "mềm": nếu lỡ không nhặt, chuỗi huy chương **không bị đứt**, vì đây là phần thưởng thêm.
- **Nội tại sự kiện chạy thêm**, cộng với nội tại giáp cũ (V144 / V147 / SSS), không thay thế.
- **Tầng "Khiên chặn đòn" (Khiên Siêu Cấp)** chặn trọn 1 đòn. Khi đang có Khiên chắn đạn 10 giây thì không tiêu tầng này.
- **"Khiên vĩnh viễn" (Chiến Lợi Thuẫn)** đỡ phần máu / giáp bị mất cho tới khi hết lượng khiên.
- **"Giảm % hồi kỹ năng giáp" (Xung Phá Vây)** tính theo hồi chiêu chuẩn:
  - giáp V144: 16 s;
  - void36: 22 s;
  - chrono11_a: 75 s.
- **"Hạ 1 pha boss"** = vỡ 1 cánh boss.
- **Không có vòng tròn, không có chữ bay**: chỉ chớp sáng ≤ 0,3 s tại tàu.

## Kiểm tra (bot)
- Hồi quy t156: **14/14**.
- Test V209: **16/16**:
  - số theo chương ở ải 132 / 190;
  - tháp lệch pha 1,2 s;
  - thưởng 25 / 110 ◈, 2 sao lớn, rơi huy chương;
  - vật phẩm cách mép 36 px;
  - đủ 6 nội tại với số Lv5 khớp cấu hình (chặn đòn, hồi 3,5% máu, +20% thanh / +0,7 s Bạo Tẩu, hồi 8% giáp, xóa đạn 135 px, khiên 8% máu);
  - hồi nội bộ 12 s;
  - cờ tắt hoạt động;
  - không lỗi JS.
- Test V204 **8/8** · V206 **7/7** · V207 **8/8**.

## Chưa làm (chờ quyết định)
- **D2 · màu nhận diện 13 tàu**: GPT đã gửi bảng màu thử, nhưng tự nhận chưa gán theo màu gốc từng tàu và nhiều màu dễ trùng nhau ở cỡ 60 px.
- **D3 · màu quái theo chương**: phải nhuộm lại tranh quái, tức là đổi phong cách tranh đã chốt.
- **G4 · giảm sáng đạn ta khi đạn địch dày**: cần thử cảm giác trên điện thoại thật.
