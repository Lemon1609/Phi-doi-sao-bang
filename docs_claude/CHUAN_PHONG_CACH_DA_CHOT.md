# CHUẨN PHONG CÁCH ĐÃ CHỐT · Phi Đội Sao Băng (cập nhật 12/11/2026, V232–V233)

Dùng làm căn cứ cho mọi mẫu mới: chiến cơ, trang bị, hợp thể, tàu địch, boss.

## 1. Ảnh chuẩn đã duyệt
- `src/ship118_cho/V231_dang_tau_da_chot/tau8_bung_canh_DA_DUYET.png`: tàu 8, cánh lông lửa.
- `src/ship118_cho/V232_tau7/tau7_bung_DA_DUYET.png`: tàu 7, quạt phiến lưỡi.
- `src/ship118_cho/V233_tau6/tau6_bung_DA_DUYET.png`: tàu 6, cánh nhiễu số.
- Dáng thân 12 tàu: `src/ship118_cho/V231_dang_tau_da_chot/` (+ `V231D_mau_chot/` cho bốn mẫu hướng của tàu 2, 3, 10, 11).

## 2. Thân
- Chân thật: giáp cứng, bóng, mép sắc, viền LED mảnh; tươi sáng, bắt mắt.
- Một điểm nhận diện ở thân, đọc được ở cỡ 64 px.
- Nhìn thẳng từ trên xuống, mũi hướng lên, đối xứng.
- Khung 512, cạnh dài 456 px, lề ≥ 24 px.
- Bản Bạo Tẩu = chính bản thường + phần cứng mở ra, thân giữa trùng khít.

## 3. Hiệu ứng bung (Bạo Tẩu)
- Năng lượng trong mờ, cộng sáng; sáng nhất ở gốc, tan dần ra ngọn.
- Năng lượng mọc ra từ một bộ phận cứng của thân.
- Sải hình bung khoảng 3–6 lần bề rộng thân; giữ đúng cỡ ảnh mẫu trong trận.
- Mỗi tàu một chất liệu bung riêng, không trùng nhau: lông lửa (tàu 8), phiến lưỡi (tàu 7), khối nhiễu số (tàu 6), màn cực quang (tàu 2), tinh thể chữ X (tàu 3), khiên lục giác (tàu 10), xoáy hút vào lõi (tàu 11)…
- Nhịp (học từ video): dồn sáng ~0,35 s → bừng sáng ở tâm + tia ngắn → hình bung hiện ~85 % rồi xòe ra ~0,28 s, vượt nhẹ → giữ: lay, thở, tàn lửa rơi.
- Không vòng tròn khép kín quanh tàu, **trừ** sóng xung kích 0,24 s đúng lúc bật cánh (chủ dự án mở 12/11 15:02). Lúc Bạo Tẩu tàu không nhấp nháy, không vẽ bong bóng khiên.
- Thêm (V233): tàu lấy đà nhích lên 0,6 s; cột năng lượng phình trước mũi có vòng xung chạy dọc; sảnh tự bung theo chu kỳ.

## 4. Lên bậc (6 bậc: thường, lục, lam, tím, tím+, SS) — phương án C
- Bậc tím = mẫu đã duyệt.
- Mỗi bậc một màu riêng; bậc thấp mờ hơn, ít lông / phiến / khối, cỡ hình bung 62 / 74 / 87 / 100 / 100 / 108 %.
- Độ sáng tăng dần (72 % → 115 %).
- Tím+ và SS thêm lớp năng lượng thứ hai; SS sáng nhất.
- Màu thân đổi theo bậc. Mỗi tàu một bảng màu riêng, không trùng tàu khác.
- Phe ta được dùng mọi màu, kể cả đỏ, hồng, vàng.

## 5. Quy trình mỗi tàu
1. GPT vẽ ảnh bậc tím đang bung (nền tối phẳng) → chủ dự án duyệt.
2. Claude tách lớp từ ảnh duyệt: thân 512, lớp năng lượng thang xám + bản màu; ghép thử, chụp.
3. GPT vẽ 5 bậc + lớp 2 + bảng màu → Claude chuẩn hóa (thân Bạo Tẩu ghép lên thân thường), tô màu theo bậc bằng mã.
4. Chạy test, chụp 6 bậc → chủ dự án "duyệt" → phát hành.

## 6. Luật giữ
- Không chữ trong tranh.
- Không chép tranh, logo, tên game khác; video gốc chỉ để học cách làm.
- Robot V196B và icon trang bị hợp thể giữ nguyên.

## 7. Kế hoạch tiếp theo (chủ dự án 12/11 14:54)
- Sau khi xong thiết kế các mẫu chiến cơ: **thiết kế lại đạn và kỹ năng** của từng tàu theo chuẩn này.
- Đạn và hiệu ứng kỹ năng phải hợp với chất liệu bung và bảng màu từng bậc của chính tàu đó. **Chủ dự án đồng ý 12/11 14:55**, ví dụ: tàu 8 đạn lửa dạng lông vũ, tàu 7 đạn phiến lưỡi, tàu 6 đạn khối số.
- Gemini làm phần cơ chế, số liệu; GPT làm phần tranh.
- **Để dành cho đợt thiết kế lại đạn** (chủ dự án 12/11 19:14): tàu 2 Cực Quang khi Bạo Tẩu gộp 4–5 tia laser thành một tia lớn theo tư vấn Gemini (`docs_claude/de_xuat_cho/GEMINI_V234_TAU2_TRA_LOI.txt`): khép 0,35 s → phình 130 % lúc sóng xung kích → giữ → tách lại 0,35 s cuối; bề ngang trúng 75–80 %, sát thương 95–100 % (lõi 80 %, vùng màn 20 %); đạn lõi trắng ngà viền xanh băng, đặt điểm bắn ra rìa ngoài hai thanh ray.
- **Tàu 6 hình bung — chủ dự án giữ nguyên (12/11 19:25)**: GPT cho biết ảnh bung tàu 6 đã duyệt (`V233_tau6/tau6_bung_DA_DUYET.png`) được vẽ theo khung ~74 s video 86547; so bằng mắt thấy gần sát gốc ở cột thanh dựng đứng, hai thanh chữ Y, dải kính tam giác xòe ngang. Claude đã cảnh báo và đề xuất bỏ cột thanh + chữ Y; chủ dự án chọn giữ nguyên, chấp nhận rủi ro như 12 dáng thân. Claude không ghép thêm mẫu nào GPT nói là vẽ theo hình game gốc mà không báo trước.

## Học phong cách game gốc (chủ dự án 12/11 19:29)
Được học phong cách thiết kế và đồ họa của game gốc để làm mẫu mới, nhưng **không chép một tàu hay một hình bung cụ thể nào**.
- **Được học:** chất giáp (kim loại sáng, khung thép tối, bộ phận máy lộ ra); năng lượng cộng sáng (lõi trắng → màu bão hòa → mép trong mờ, không viền đen); độ chi tiết dày; hình bung rộng 4–6 lần thân, lệch về phía sau; mỗi tàu một chất liệu bung riêng; lên bậc đổi cả màu lẫn số bộ phận, bậc cao rực hơn; nhịp báo trước ≈ 0,4 s → bật ra ≤ 0,2 s → giữ có đập nhẹ và hạt.
- **Không chép:** dáng, bố cục, cách sắp xếp bộ phận và chi tiết nhận diện của một tàu hay một hình bung cụ thể (ví dụ cột thanh dựng + chữ Y của 86547).


## Để dành sau khi xong 13 chiến cơ (chủ dự án 12/11 20:45–20:49)
Màu bung theo từng thứ đang lắp: chiến cơ (đang có, theo bậc), **tàu con** thường (13 loại), **tàu hợp thể** (7 mẫu SSS), **tàu con hợp thể** (8 món SSS sidearm) — mỗi thứ một màu riêng, cả cánh lẫn đuôi, tỏa ra từ dưới chính nó. **Vũ khí và giáp: không cần.** Áp dụng mọi tàu.
- Đã dò (chưa làm gì): tàu con vẽ ở `Battle28.support()` (hai bên thân); món SSS có sẵn `color` (vd. sss_rail_disc #38BDF8, sss_solar_gravity #F59E0B, sss_monarch_rail #A855F7); tàu hợp thể có `profile.color` / `secondColor` (vd. sss:6 Tử Diệu Quang Hoàng #ffdd67 / #64eaff). Tàu con thường chưa thấy trường màu (spec không lộ ra ngoài) — cần đo từ tranh.
- Công cụ dò: claude_tools/ (chưa có), kịch bản quay tạm ở scratchpad hop/quay.py, do2.py.

## Bậc thấp không đơn sắc (chủ dự án 12/11 21:05)
"Các tàu bậc cao đẹp là hợp lí nhưng các tàu bậc thấp đừng đơn sắc, nhỏ gọn, xấu quá."
- Thân bậc thấp: ít nhất 2 màu giáp (giáp chủ + giáp phụ có màu) + màu đèn; cỡ ≥ 90 % bậc tím; chi tiết dày như bậc tím. Phân bậc bằng số bộ phận, độ lớn lõi, độ rực đèn — không bằng cách bỏ màu hay thu nhỏ.
- Cánh bung bậc thấp: hai sắc (mép một màu, thân một màu, lõi trắng), to gần bậc tím (thuong k .92, luc k .96). Bậc cao vẫn hơn nhờ lớp 2, k 1,08 và độ rực (claude_tools/bac_thap_v238.py).
- Đo độ bão hòa trung bình thân (V238): đơn sắc = tàu 2 thường 0,08 · tàu 3 thường 0,12 / lục 0,18 · tàu 6 thường 0,25 / lục 0,10 · tàu 7 thường 0,09; nhỏ = tàu 2 thường 159 × 331, tàu 7 thường 245 × 334 (bậc tím 312 × 421, 397 × 456).

## Tàu 12 Thời Không (12/11 22:43)
- Ảnh bung bậc tím GPT V239 (mảnh giáp ngưng thời gian + mặt đồng hồ hở + hai kim): hai cung trên / dưới nhìn gần thành vòng quanh tàu và kim nằm trước mũi — Claude đã nêu; **chủ dự án chọn giữ nguyên**.
- Thường / Bạo Tẩu phải khác rõ:  rộng ≥ 1,25 lần hoặc diện tích ≥ 1,2 lần, phần mở là giáp cứng nằm ngoài viền thân (V240, chủ dự án 22:39).
