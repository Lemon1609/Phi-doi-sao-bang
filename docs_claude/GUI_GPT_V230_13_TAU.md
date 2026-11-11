# GỬI GPT · V230 · Vẽ đủ bộ 13 chiến cơ theo 12 mẫu đã chốt

Chủ dự án và GPT đã chốt (23:37, 11/11). Chủ dự án quyết thêm (23:40):
- **Mỗi mẫu là bậc tím** (`tauN_tim.png`). 5 bậc còn lại đổi dáng và màu theo từng bước: thường, lục, lam nhỏ và đơn giản hơn; tím+, SS thêm chi tiết.
- **Tàu 7** dùng bản tím chốt 23:24 (`tau7_tim_V229_512.png`); mẫu 86543 (lưỡi đỏ – vàng) làm gợi ý cho bậc SS của tàu 7.
- Mẫu **86538** thành dáng mới của **tàu 11 Thôn Tinh**, mẫu **86539** thành dáng mới của **tàu 12 Thời Không**. **Tàu 13 Hư Không** giữ thiết kế riêng.

## 1. Bảng gán

| Tàu | Mẫu bậc tím | Kỹ năng / Bạo Tẩu của game (giữ) | Gợi ý hình bung khi Bạo Tẩu |
|---|---|---|---|
| 1 Phượng Hoàng | 86540A | Thiêu Đốt · Phượng Hoàng Liệu Nguyên | Đôi cánh lửa bung rộng |
| 2 Cực Quang | 86540B | Laser · Bão Từ Cực Quang | Màn cực quang dọc giữa các ray |
| 3 X-Dực Băng | 86544 | Đóng Băng · Thập Tự Băng Phong | Cánh tinh thể băng nở lớn |
| 4 Thần Ma | 86541 | Xuyên Thấu · Phá Giáp Thương | Càng sáng chĩa xuống + mũi thương |
| 5 Thự Quang | 86542 | Tán Xạ · Lăng Kính Vạn Hoa | Chùm gai tinh thể xòe quạt |
| 6 U Linh | 86547 | Laser · Mạng Lưới Lượng Tử | Cánh "nhiễu số" xòe ngang |
| 7 Đao Phong | bản tím 23:24 | Trảm Kích · Bách Quỷ Trảm Kích | Lưỡi tách thành 3–5 phiến xòe (đã gửi `GUI_GPT_V229_TAU7_6_BAC.md`) |
| 8 Phần Thiên | 86546 | Thiêu Đốt · Mưa Pháo Nhiệt Hạch | Đôi cánh chim cắt bung |
| 9 Thiên Khung | 86548 | Song Vũ · Vạn Vũ Truy Hồn | Cánh hoa năng lượng nhiều lớp |
| 10 Tinh Hà | 86545 | Quân Đoàn · Hạm Đội Tập Kích | Tấm khiên chiến thuật mở hai bên (không khép vòng) |
| 11 Thôn Tinh | 86538 | Hố đen · Hố Đen Vĩnh Hằng | Cánh tách lớp, lõi hút sáng giữa thân |
| 12 Thời Không | 86539 | Thời gian · Ngưng Đọng Thời Không | Cánh tách thành mảnh lơ lửng quanh thân |
| 13 Hư Không | thiết kế riêng (vương miện, thân nứt hở lõi) | Thiên Phạt Thứ Nguyên | Gai vương miện bung, khe nứt sáng |

## 2. Màu theo bậc

- **Bậc tím giữ đúng màu của mẫu.**
- Các bậc khác: mỗi bậc đổi nhóm màu giáp và đèn, hai bậc liền nhau khác nhau rõ. GPT đề xuất dải 6 màu cho từng tàu, hài hòa với màu mẫu (bảng V227 làm điểm xuất phát, được sửa). Claude đo: cùng bậc không hai tàu trùng màu giáp; bậc liền nhau khác rõ ở cỡ 100 px.

## 3. Tiến hóa (chung, mỗi tàu áp theo dáng của mình)

| Bậc | Dáng |
|---|---|
| thường | Thân gọn nhất, ít bộ phận; cánh / lưỡi / gai nhỏ và ít lớp |
| lục | Cánh dài hơn, thêm một bộ phận đặc trưng nhỏ (vai, cánh mũi, bệ pháo) |
| lam | Thêm lớp cánh hoặc tách lớp; chi tiết sáng nhiều hơn |
| tím | **Mẫu đã chốt** |
| tím+ | Thêm cánh phụ / gai phụ; giáp nhiều lớp hơn |
| SS | Hình thái mạnh nhất: cánh lớn nhất, thêm chi tiết đầu mũi, rãnh sáng nhiều nhất |

Cỡ căn(rộng × cao): thường 345 · lục 355 · lam 368 · tím 380 · tím+ 392 · SS 405 px; cạnh dài ≤ 456 px (dáng cao hẹp như tàu 2, 7, 11 lớn lên theo bề ngang khi chạm trần).

## 4. Bạo Tẩu (`tauN_<bậc>_bt.png`, mỗi bậc một bản)

Dựng trên chính bản thường cùng bậc, thân giữa giữ y nguyên. Cánh / lưỡi / gai tách lớp và xòe theo **cột "Gợi ý hình bung"**. Diện tích 1,25–1,35 lần, cạnh dài tới 480 px. Không lửa, sét, vệt chém, quầng dính vào tranh.

## 5. Quy cách, thứ tự, cách nộp

- PNG RGBA **nền trong suốt** (các ảnh mẫu hiện nền tối, Claude không tách sạch được), 512×512, căn giữa, nhìn thẳng từ trên xuống, mũi hướng lên, đối xứng. Không chữ, logo, nền, đạn, lửa động cơ, vòng tròn quanh tàu. Đọc rõ ở 64–100 px.
- **Mỗi lượt một tàu**, 12 PNG (`tauN_{thuong,luc,lam,tim,tim5,ss}.png` + 6 `_bt`) + 1 ảnh ghép 6 bậc × 2 hàng.
- Thứ tự: 7 (đang làm) → 8 → 6 → 2 → 4 → 10 → 5 → 3 → 9 → 1 → 11 → 12 → 13.
- Lượt đầu mỗi tàu nộp kèm **bảng dải 6 màu** của tàu đó.
