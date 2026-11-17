# Phân tích gameplay game gốc · 4 video (17/11/2026, V307)
Nguồn: 4 video chủ dự án gửi 17/11 (không lưu vào repo). Cách xem: lấy mẫu 1 khung / 3 giây (315 khung) + phóng to 9 khoảnh khắc. **Mọi nhận xét là NHÌN BẰNG MẮT**; thời gian / chu kỳ ước từ khung 3 giây (sai số ±3 s). Chỉ học cách làm / nhịp / bố cục, KHÔNG chép hình tàu, đạn, boss, icon cụ thể.

| Video | Thời lượng | Nội dung |
|---|---|---|
| v1 | 6:28 (1080×1922) | Chế độ vô tận theo "đợt" (sóng 249 → 334) có **chọn tăng ích kiểu roguelite** |
| v2 | 2:32 | Boss phi đội (Daybreak Thunder): đua sát thương, đổi tàu theo lượt 30 s |
| v3 | 3:47 | Ải chiến dịch 96 "quyết chiến" với skin Epic: đợt quái → boss Lv.165 |
| v4 | 2:58 | Boss phi đội (bản khác, nền dung nham), giống v2 |

## 1. Khung HUD trong trận (chung)
- **Trên cùng**: thanh máu boss mảnh, chữ "LV.xxx + tên boss" nhỏ ở đầu thanh. Chế độ đua sát thương thay bằng **số sát thương tổng rất lớn** ở giữa trên (chữ trắng viền xanh, tăng liên tục).
- **Cột trái dọc** (ô vuông nhỏ ~28 px, 5–7 ô): huy hiệu xếp hạng tàu (S), cấp vũ khí "Lv.12" kèm % tiến độ nhỏ bên dưới, số tầng cộng dồn (ví dụ "4/1", "22"), "攻击UP" ×100 (tầng tăng công), biểu tượng hiệu ứng đang có. Mỗi ô có số đếm ở góc.
- **Góc trên phải** (vô tận): ảnh đại diện + "249 đợt + tên người chơi" = **người kế tiếp trên bảng xếp hạng cần vượt**; đổi người khi vượt (249 → 269 → 300 → 310 → 334).
- **Mép phải**: thanh dọc mảnh + số (116, 119…) = tiến độ đợt / đồng hồ đợt.
- **Đáy trái**: nút bom tròn có **số đếm lớn ở giữa** (24 → 20 → 17 … = thời gian hồi), bên cạnh là ô thẻ tàu đang đánh + đồng hồ lượt "29.96" (chế độ phi đội). **Đáy phải**: nút kỹ năng tròn có vòng hồi chiêu quanh viền.
- Không có chữ thông báo lớn giữa màn, trừ: băng BOSS, chữ nổi nhỏ khi nhặt đồ ("生命恢复" xanh lục = hồi máu, "量子护盾" xanh lam = khiên, "x2" vàng = nhân đôi), chữ "暴走" (Bạo Tẩu) đỏ đặt ngay trên tàu khi kích hoạt, "击败" (hạ gục) góc phải trên khi boss chết.

## 2. Nhịp ra quái và boss (v1 vô tận, v3 chiến dịch)
- **v1 · nhịp đo từ khung**: 85 đợt trong ~6:15 (kể cả màn chọn tăng ích) → **~4–4,5 s/đợt**. Boss xuất hiện ở các mốc 0:03, 0:33, 1:06, 2:09, 3:09, 3:42, 4:12, 4:42, ~6:00 → **khoảng 30–35 s một boss (~10 đợt)**, boss có cấp tăng dần (LV.279 → 289 → 304 → 319 → 344 → 349 → 359 → 369 → 392) và đổi tên/loại luân phiên.
- **Mở đầu boss**: màn tối nhẹ, băng đỏ ngang có vạch chéo đen–đỏ và chữ lớn "危险警告" (cảnh báo nguy hiểm), dòng trên là "LV + tên boss"; kéo dài ~2–3 s rồi boss lướt xuống từ trên.
- **Đợt thường v1**: một **lỗ đen xoáy** (quái đặc biệt) lơ lửng giữa màn qua nhiều đợt; hàng quái tím-vàng đứng thành hàng ngang phía trên; nhiều quái nhỏ hình thoi đỏ rơi theo cột.
- **v3 chiến dịch**: "GO!" vàng → đội hình quái đỏ dạng ngôi sao vào từ trên theo chữ V, dừng lại bắn **chùm kim tỏa tròn 8–12 tia** (đạn cam đầu sáng), đổi chỗ, rồi đợt kế tiếp; ~45 s quái thường → boss chiếm 1/3 màn trên, đánh ~3 phút → "战斗胜利" (chiến thắng) chạy ngang màn.

## 3. Đạn địch / đòn boss (kiểu, nhìn từ video)
1. **Chùm kim tỏa tròn** từ quái sao (8–12 tia, đạn cam dài đầu trắng), bắn 2–3 nhịp liền.
2. **Kim rơi theo cột** (thoi đỏ dài) từ hàng quái phía trên, rơi thẳng.
3. **Laser có báo trước**: 1–3 **tam giác ⚠ đỏ ở mép trên** + **vạch đỏ mảnh** dọc màn ~1 s → cột laser đỏ dày bắn xuống (v1 1:33, 4:18; v3). Có lúc 3 cột cùng lúc, chừa khe giữa.
4. **Vòng tròn tím báo trước** quanh nòng boss (v3 3:21, 3:39) → **2 cột laser xanh lơ** bắn thẳng xuống, giữ 2–3 s.
5. **Hai đường laser chéo chữ X** (đỏ cam) có **hạt cầu cam ở giao điểm và dọc đường**, quét chéo cả màn (v3 0:48, 1:00, 1:12).
6. **Vòng cung hạt cầu** cam lan rộng từ boss (cung 180°, 20–30 hạt sát nhau), có khe để lách (v3 0:57, 1:27).
7. **Mưa hạt đỏ tỏa ngẫu nhiên** từ lõi boss khi lõi phát sáng đỏ (v3 1:18, 1:24, 2:36).
8. **Quạt "lông vũ" lửa đỏ** 6–10 phiến cong, bắn chéo xuống (v3 1:45, 2:12, 2:39).
9. **Ấn ▼▼▼ đỏ khổng lồ** phía trên tàu ta (v1 0:00, 1:36, 2:39) = báo đòn lao/ép xuống của boss.
10. Boss phi đội (v2/v4): **vòng tròn kim đỏ xoáy** quanh boss (bánh răng kim), **mưa thoi đỏ** dày rơi chéo, đốm cầu xanh lam rải.
Màu: đạn địch hầu hết **đỏ / cam / hồng** có lõi trắng; đạn ta xanh / tím / vàng → không lẫn.

## 4. Vũ khí, kỹ năng, Bạo Tẩu của người chơi
- **Đạn chính** đổi theo tàu: v3 = **2 cột laser tím rộng + tia giữa** từ tàu (rất dày, chiếm ~1/3 màn), v2/v4 = chùm kim vàng-cam dày + **cánh năng lượng khổng lồ** (tàu SSS hợp thể), v1 = cánh đỏ-hồng rất to (Bạo Tẩu kéo dài).
- **Phụ trợ / chim mồi (僚机)**: 2–3 pod bay quanh / dưới tàu, mỗi pod bắn đạn riêng (có tăng ích "僚机攻击 +%"). Ở v3 có **tên lửa xích bạc** (đoạn xoắn như sâu khoan) phóng từ hai bên chéo vào mục tiêu.
- **Bom "高能爆弹"** (bom năng lượng cao): quả cầu khổng lồ **vàng mặt trời** hoặc **xanh điện** nở giữa màn ~1/2 bề rộng, xóa đạn; số trên nút bom đếm hồi chiêu.
- **Kỹ năng/khiên**: "量子护盾" (khiên lượng tử) = bong bóng xanh quanh tàu + chữ nổi; quả cầu sét vàng-xanh có dây sét (v3 1:36, 2:45).
- **Bạo Tẩu "暴走"**: chữ đỏ trên tàu, tàu nở cánh năng lượng rộng gấp ~2,5–3 lần thân, sáng rực; trong vô tận có tăng ích kéo dài thời gian Bạo Tẩu.
- **Cấp vũ khí trong trận**: Lv.1 → Lv.13 tăng dần trong ải nhờ nhặt viên "S"/mũi tên vàng (ô Lv ở cột trái). Bị trúng có thể tụt cấp (có tăng ích "30% không tụt cấp khi trúng").

## 5. Vật phẩm rơi
Tinh thể (水晶, khối lục giác xanh lơ/xanh lục, rơi thành chuỗi dài) = tiền trong lượt; viên "S" tròn (lên cấp vũ khí); mũi tên kép vàng trong vòng (tăng lực); dấu "+" xanh lục (hồi máu); khiên xanh; biểu tượng phóng xạ (bom +1); "x2" vàng nổi khi nhân đôi. Vật phẩm có **vòng sáng quanh** và lắc nhẹ, rất dễ thấy.

## 6. Cơ chế "Chọn tăng ích" (v1, 选择增益方程)
- Sau **mỗi boss** (≈ 30–35 s) hiện bảng chọn: 3 thẻ dọc, khung màu theo bậc **II lục · III lam · IV tím · V vàng**; "còn N lượt chọn" (dồn được 1–5 lượt nếu boss chết liên tiếp); nút **làm mới (còn 1 lần)**; thẻ được chọn sáng viền + nút "chọn" vàng.
- Nửa dưới bảng có 2 thẻ: **方程** (các tăng ích đã có) và **属性** (thuộc tính cộng dồn, dạng danh sách dòng: "đòn đánh tàu +495 %", "khiên +2 s", "phạm vi hút tinh thể toàn màn", "−11 s hồi bom"…).
- Ví dụ tăng ích (nhóm theo cơ chế, để mình thiết kế bản riêng):
  - **Tích tinh thể**: mỗi 300 tinh thể → công +5 % vĩnh viễn (tối đa +50 %); mỗi 300 → phụ trợ +10 % (tối đa 150 %); mỗi 50 → hồi 3–6 % máu; nhu cầu tinh thể −10/−20 %; quái rơi tinh thể có 20 % rơi thêm 1–2.
  - **Bom**: sát thương bom +20 %; sau khi thả bom 50 % lên 1 cấp vũ khí; **đạn bị bom xóa biến thành tinh thể**; mỗi 400 tinh thể nhận 1 bom miễn phí.
  - **Vũ khí**: mỗi 45 s +1 cấp vũ khí; 30 % không tụt cấp khi trúng.
  - **Bạo Tẩu**: thời gian +0,2/0,3 s; công Bạo Tẩu +26 %.
  - **Mục tiêu**: sát thương boss +12 %; quái thường +24 %; mỗi boss hạ được công +5 % vĩnh viễn.
  - **Phòng thủ**: chịu sát thương −4/−6 %; khiên +1 s; máu < 50 % công +20 %; hồi sinh 1 lần.
  - **Hệ thống**: +1 lượt làm mới.
- **Màn kết thúc**: "本局波次 333 đợt", kỷ lục lịch sử 1.900, kỷ lục kỳ này 333, lưới biểu tượng tất cả tăng ích đã lấy (3 hàng, khung theo bậc), nút "tiếp tục" vàng.

## 7. Boss phi đội (v2, v4 · đua sát thương)
- Mục tiêu: **gây sát thương tối đa trong thời gian**, không cần giết boss. Số sát thương tổng lớn ở giữa trên.
- **Đội 3 tàu**: 1 "chủ chiến" + 2 "hỗ trợ"; mỗi tàu đánh **một lượt 30 s** (đồng hồ ở thẻ tàu góc dưới trái 30.00 → 00.00), hết giờ tự đổi sang tàu kế; lượt cuối dùng tàu SSS có cánh khổng lồ.
- Kết thúc "挑战完成": sân khấu tròn sáng, tàu đứng giữa, **sát thương từng tàu** + nhãn MVP / "đội hỗ trợ"/"đội chủ chiến", ‹ › chuyển tàu, tổng sát thương, thanh cấp boss (Lv.11 hoặc MAX), phần thưởng 1 ô, nút "xác nhận" vàng.
- Trước trận (v3): bảng **"预设方案" (bộ trang bị dựng sẵn)**: 4 ô trang bị S MAX, ô phi công, 1 tàu chủ chiến + 2 tàu hỗ trợ, nút "lưu bộ dựng sẵn"; thẻ ải có sao, lực chiến, lượt còn lại, vật phẩm rơi, nút "xuất kích" vàng + "càn quét".

## 8. Đối chiếu với game mình · đề xuất (CHỈ ĐỀ XUẤT, chờ chủ dự án chọn)
| Học được | Game mình đang có | Đề xuất |
|---|---|---|
| Laser báo trước bằng ⚠ mép trên + vạch mảnh 1 s | `warn307` tam giác đỏ (V307) | Thêm **vạch dọc mảnh nhấp nháy** + cho boss bắn 1–3 cột có khe; vòng tím báo trước quanh nòng trước tia thẳng |
| Hai laser chéo X có hạt ở giao điểm; vòng cung hạt có khe | Đạn boss chủ yếu tỏa / ngắm | Thêm 2 kiểu đạn boss mới (X quét chéo, cung hạt có khe) cho chương sau |
| Vô tận ~4–4,5 s/đợt, boss ~10 đợt, chọn tăng ích sau mỗi boss | Vô tận: boss mỗi 5 đợt; **Phá Vây (BK78) đã có Ấn Chú roguelite** | Gộp ý tưởng: sau mỗi boss vô tận cho chọn 1/3 tăng ích (khung màu theo bậc, 1 lần làm mới), tăng ích chỉ trong lượt; dùng lại hệ Ấn Chú của BK78 |
| Tinh thể trong lượt làm "tiền" cho tăng ích | Hợp kim nhặt trong trận | Thêm **đơn vị tinh thể trong lượt** (không ra ngoài lượt, không đụng kinh tế) để các tăng ích "mỗi 300 tinh thể" có nghĩa |
| Người cần vượt trên bảng xếp hạng ở góc phải trên | Hạng Vô Tận (v92) | Hiện "đợt X · tên" của mốc kế tiếp trong lúc chơi |
| Boss phi đội: đua sát thương, 3 tàu × 30 s, màn tổng kết từng tàu + MVP | Sự kiện tuần có boss cuối tuần (event83), Phó bản giới hạn 60 s | Biến boss cuối tuần thành **đua sát thương 3 tàu × 30 s** (dùng tàu người chơi sở hữu), tổng kết MVP; không cần phi đội nhiều người |
| Bộ trang bị dựng sẵn (preset) | Chưa có | Thêm 2–3 preset (tàu + trang bị + phi công) đổi nhanh ở thẻ ải |
| Chữ nổi nhỏ khi nhặt; không banner giữa màn | Đã bỏ banner (26/10) | Giữ; thêm chữ nổi nhỏ màu theo loại (xanh lục hồi máu, lam khiên, vàng x2) nếu chưa có |
| Đạn địch đỏ/cam/hồng, đạn ta xanh/tím/vàng | Đã có quy ước màu | Giữ; rà lại các tàu có đạn đỏ/cam (tàu 8) để không lẫn với đạn địch |
| Bom: cầu khổng lồ, số hồi chiêu lớn trên nút | Bom có số lượng | Cân nhắc hiện **số giây hồi** trên nút bom/kỹ năng |

## 9. Giới hạn
Chưa xem tốc độ khung đầy đủ (chỉ 1 khung / 3 s) nên chưa đo được tốc độ đạn, số đạn mỗi chùm chính xác, thời gian báo trước laser chính xác. Muốn đo kỹ một đòn: cắt đoạn đó ở 30 khung/s rồi đếm (Claude làm được khi cần).
