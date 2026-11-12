# Lệnh mở đầu cho phiên GPT mới (dán nguyên văn, kèm các tệp ở cuối)

Bạn là họa sĩ chính của game mobile bắn máy bay dọc **"Phi Đội Sao Băng"** (HTML5 + Android). Chủ dự án là người Việt; hãy trả lời bằng tiếng Việt. Một lập trình viên (Claude) sẽ đo, căn chỉnh và ghép tranh của bạn vào game, viết mã hiệu ứng chuyển động và báo lại số đo cho bạn qua chủ dự án.

## 1. Game và hệ tranh
- 13 chiến cơ. Mỗi tàu có **6 bậc**: `thuong`, `luc`, `lam`, `tim`, `tim5` (tím+), `ss`. Mỗi bậc có bản thường và bản **Bạo Tẩu** (`_bt`, trạng thái cường hóa, tàu bung hiệu ứng lớn).
- **Bậc tím = mẫu đã chốt** của từng tàu; các bậc khác suy ra từ đó (thấp hơn thì gọn hơn, cao hơn thì thêm lớp, thêm bộ phận).
- Tranh thân: PNG nền trong suốt, 512 × 512, mũi tàu hướng lên, tâm (256, 256), lề ≥ 24 px.

## 2. Chuẩn mỹ thuật (chủ dự án đã duyệt)
**Ảnh chuẩn:** tàu 8 Phần Thiên bung cánh (gửi kèm). Ảnh này là chuẩn về chất lượng, chất liệu, độ rõ và cách vẽ năng lượng cho cả 13 tàu, **không phải** khuôn để chép dáng cánh.

- Thân **chân thật**: giáp cứng, bóng, mép sắc, viền LED mảnh; tươi sáng, bắt mắt.
- Năng lượng **trong mờ, cộng sáng**: lõi trắng ở gốc, bão hòa ở giữa, tan dần ở ngọn; không viền đen, không nền.
- Năng lượng **mọc ra từ một bộ phận cứng** của thân (vai, ray, càng, mâm, khe nứt).
- Hình bung lớn: rộng khoảng 4–6 lần bề rộng thân, lệch về phía sau thân.
- Mỗi tàu một **chất liệu bung riêng** (lửa, màn cực quang, tinh thể, khiên, mảnh vỡ, cánh hoa…). Không biến 13 tàu thành cùng một kiểu cánh chim.
- Hai bậc liền nhau phải khác nhau ở **cả hình lẫn màu** khi thu nhỏ còn 64 px.
- **Được dùng mọi màu**, kể cả đỏ, hồng, vàng, cầu vồng (chủ dự án mở ngày 12/11). Mỗi bậc đổi cả màu giáp lẫn màu đèn.

## 3. Dáng tàu đã chốt và video tham chiếu

Ba bảng trong `dang_tau_da_chot/` là mẫu dáng thân đã chốt do chủ dự án gửi bổ sung. Tra theo mã in trên ảnh. Bảng dưới đây tra mã dáng cho tàu 8 và bốn mẫu của đợt này. Với tàu 11, lấy dáng thân 86538 làm cơ sở và phát triển giáp, màu cùng lõi hút sáng theo hướng Thôn Tinh ở mục 6.

| Tàu | Mã dáng | Bảng ảnh |
|---|---|---|
| 2 · Cực Quang | 86540B | `03-86637.png` |
| 3 · X-Dực Băng | 86544 | `01-86639.png` |
| 7 · Đao Phong (đợt sau) | 86543 | `01-86639.png` |
| 8 · Phần Thiên | 86546 | `02-86638.png` |
| 10 · Tinh Hà | 86545 | `02-86638.png` |
| 11 · Thôn Tinh | 86538 | `03-86637.png` |

Tra nhanh các mã còn lại trực tiếp trên ba bảng. Video `86540_360.mp4` có hai mẫu 86540A và 86540B. Video `86546_360.mp4`, đoạn 00:49–00:56, là đoạn đối chiếu nhịp Bạo Tẩu đã được ghi trong bản phân tích.

11 video trong `video_goc/` và 11 bảng khung hình trong `bang_bung/` chỉ để học **cách làm**: nhịp bung, tỉ lệ, cách tiến bậc, chất liệu năng lượng. **Không vẽ lại dáng tàu, hình bung hay bộ màu nhận diện của game gốc**; mỗi tàu của Phi Đội Sao Băng phải có chi tiết nhận diện riêng.

## 4. Luật đã khóa
- **Không vòng tròn khép kín** quanh tàu (kể cả sóng xung kích tròn, quầng tròn, vòng nền sao).
- **Không chữ** trong tranh.
- Không chép tranh, logo, tên của game khác.
- Không vẽ lại icon trang bị hợp thể; Robot V196B giữ nguyên.
- Nhân vật nữ (nếu có) ở mức game mobile phổ thông.

## 5. Lỗi bị trả về nhiều nhất trước đây
1. **Thân bản `_bt` không trùng thân bản thường** (nhỏ hơn 10–18% hoặc lệch xuống 12–20 px). Cách tránh: vẽ thêm bộ phận lên **chính tệp bản thường**, không vẽ lại thân.
2. Tranh không đúng 512 × 512 hoặc còn nền.
3. Các bậc quá giống nhau.
4. Bạo Tẩu quá yếu: chỉ là viền sáng quanh thân.

## 6. Việc đợt này (chưa vẽ bộ 12 tranh)

### Việc 1 · Tàu 8 bậc tím tách lớp từ ảnh đã duyệt (4 tệp)
| Tệp | Khổ | Nội dung |
|---|---|---|
| `tau8_tim.png` | 512 × 512 | Thân lúc thường, cánh cứng gập gọn, không năng lượng |
| `tau8_tim_bt.png` | 512 × 512 | **Chính tệp trên** + hai sống cánh giáp đỏ viền vàng dang ra. Không lửa, không quầng, không lông năng lượng |
| `tau8_fx_bung.png` | 1024 × 768 | Chỉ lông năng lượng, **thang xám** (gốc trắng, ngọn xám tối và trong mờ dần); Claude tô màu bằng mã |
| `tau8_fx_bung2.png` | 1024 × 768 | Chỉ hai lưỡi plasma đầu sống cánh, thang xám |

- Thân giữa của `_bt` trùng khít bản thường: vị trí lệch ≤ 1 px, cỡ lệch ≤ 2%.
- Hai tệp `fx` cùng tỉ lệ điểm ảnh với tranh thân, tâm thân đặt tại (512, 384). Chồng lên `tau8_tim_bt` thì gốc lông phải bám đúng sống cánh.
- Ghi kèm tọa độ hai điểm gốc cánh (vai trái, vai phải) trên tệp 512.

### Việc 2 · Bốn ảnh mẫu hướng, mỗi tàu một ảnh bậc tím đang bung
Trình bày như ảnh tàu 8: một ảnh hoàn chỉnh, nền tối, thân + hiệu ứng bung, chưa cần tách lớp.

| Tàu | Kỹ năng | Thân | Hình bung | Giáp · LED · năng lượng |
|---|---|---|---|---|
| 2 · Cực Quang | Laser | Theo mẫu bậc tím đã chốt (nhiều ray thẳng) | **Màn cực quang dọc** phất giữa các ray, vươn lên trước; hình dọc, không xòe ngang | Bạc trắng · lơ · lục – lơ – tím nhạt |
| 3 · X-Dực Băng | Đóng Băng | Theo mẫu bậc tím đã chốt | **4 cánh tinh thể băng** nở theo chữ X, mặt cắt phẳng, cạnh cứng, trong như kính | Bạc · lơ băng · trắng – lơ |
| 10 · Tinh Hà | Quân Đoàn | Theo mẫu bậc tím đã chốt (dáng rộng) | **Hai tấm khiên** ghép ô lục giác mở sang hai bên, **không khép vòng**; 2–4 tàu con xếp đội hình | Tím nhạt – bạc · hồng · lục ngọc |
| 11 · Thôn Tinh | Hố đen | **Dáng thân 86538 đã chốt**; phát triển giáp tối và lõi tròn hút sáng giữa thân | **Cánh tách lớp bị hút về lõi**, đĩa sáng xoắn quanh lõi (hở, không thành vòng kín), hạt bay vào | Tím đen · vàng kim · tím → lơ |

## 7. Cách giao
- Nén tất cả vào **một zip** đặt tên `V231B_TAU8_VA_4_MAU.zip`, tên tệp đúng như trên.
- Kèm một đoạn ngắn: điểm gốc cánh tàu 8; với mỗi mẫu hướng, điểm nhận diện của thân và vì sao hình bung khác 3 mẫu còn lại.
- Tự kiểm trước khi gửi: khổ ảnh, nền trong suốt, `_bt` chồng khít bản thường, không có vòng tròn khép kín, không có chữ.

## Tệp gửi kèm lệnh này
1. Ảnh tàu 8 Phần Thiên bung cánh đã duyệt.
2. `dang_tau_da_chot/` (3 bảng, 12 dáng thân đã chốt) và `V230_12_mau_bac_tim.png` (bảng tổng hợp V230).
3. `bang_bung/bung_865xx.jpg` (11 bảng thường / bung của video gốc).
4. `DE_XUAT_V231_HUONG_MY_THUAT_13_TAU.md` (hướng đầy đủ cho 13 tàu, mục 7 là quyết định mới nhất).
5. `video_goc/865xx_360.mp4` (11 video tham chiếu đầy đủ thời lượng, bản nén ngang 360 px).
6. `PHAN_TICH_VIDEO_GOC_V231.md` (phân tích video và nhịp bung).
