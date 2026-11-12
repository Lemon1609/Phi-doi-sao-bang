Chào GPT, chủ dự án đã duyệt ảnh tàu 8 Phần Thiên bung cánh và chốt lấy ảnh đó làm chuẩn chất lượng cho cả 13 tàu. Bản phân tích đầy đủ: `DE_XUAT_V231_HUONG_MY_THUAT_13_TAU.md` (gửi kèm). Đợt này cần 2 việc, **chưa vẽ bộ 12 tranh**.

## Quyết định mới của chủ dự án (12/11)
- Phe ta **được dùng đỏ, hồng thoải mái** cho cả giáp, hiệu ứng, đạn.
- Cánh trong trận **giữ đúng cỡ ảnh mẫu** (sải ≈ 5,3 lần bề rộng thân).
- Mỗi tàu một kiểu bung riêng, không dùng chung cánh chim.
- Vẫn khóa: không vòng tròn khép kín quanh tàu, không chữ, không chép tàu / logo / tên game khác; Robot V196B và icon trang bị hợp thể giữ nguyên.

## Việc 1 · Tàu 8 bậc tím tách lớp (mẫu kỹ thuật, 4 tệp)

Tách chính ảnh đã duyệt thành các lớp, nền trong suốt:

| Tệp | Khổ | Nội dung |
|---|---|---|
| `tau8_tim.png` | 512 × 512 | Thân lúc thường: cánh cứng gập gọn, **không** có năng lượng |
| `tau8_tim_bt.png` | 512 × 512 | **Chính tệp trên** + hai sống cánh giáp đỏ viền vàng dang ra. Không lửa, không quầng, không lông năng lượng |
| `tau8_fx_bung.png` | 1024 × 768 | Chỉ phần lông năng lượng, vẽ **thang xám**: gốc lông trắng, ngọn xám tối và trong mờ dần. Claude sẽ tô màu bằng mã (trắng vàng → cam → cam đỏ) |
| `tau8_fx_bung2.png` | 1024 × 768 | Chỉ hai lưỡi plasma ở đầu sống cánh, thang xám |

Yêu cầu bắt buộc:
1. **Thân giữa của `tau8_tim_bt` trùng khít `tau8_tim`** (vị trí lệch ≤ 1 px, cỡ lệch ≤ 2%). Cách chắc nhất: vẽ thêm sống cánh lên chính tệp bản thường, không vẽ lại thân.
2. Tâm thân ở (256, 256) trên tệp 512; lề ≥ 24 px.
3. Hai tệp `fx` **cùng tỉ lệ điểm ảnh với tranh thân** (không thu phóng), tâm thân đặt tại (512, 384). Khi chồng lên `tau8_tim_bt`, gốc lông phải bám đúng vào sống cánh.
4. Ghi kèm **tọa độ hai điểm gốc cánh** (vai trái, vai phải) trên tệp 512.
5. Lông: 8–10 dải mỗi bên như ảnh đã duyệt, không viền cứng, không nền, không quầng tròn.

## Việc 2 · Bốn ảnh mẫu hướng (mỗi tàu 1 ảnh bậc tím đang bung)

Trình bày như ảnh tàu 8 đã duyệt: một ảnh hoàn chỉnh, nền tối, thân + hiệu ứng bung. Mục đích là chốt hình bung, **chưa cần tách lớp**.

| Tàu | Kỹ năng | Thân (bậc tím) | Hình bung | Màu giáp · LED · năng lượng |
|---|---|---|---|---|
| **2 · Cực Quang** | Laser | Mẫu bậc tím đã chốt (nhiều ray thẳng) | **Màn cực quang dọc** phất giữa các thanh ray, vươn cao lên phía trước. Hình dọc, không xòe ngang | Bạc trắng · lơ · lục – lơ – tím nhạt |
| **3 · X-Dực Băng** | Đóng Băng | Mẫu bậc tím đã chốt | **4 cánh tinh thể băng** nở theo chữ X, mặt cắt phẳng, có cạnh cứng, trong như kính | Bạc · lơ băng · trắng – lơ |
| **10 · Tinh Hà** | Quân Đoàn | Mẫu bậc tím đã chốt (dáng rộng) | **Hai tấm khiên chiến thuật** mở sang hai bên, ghép từ ô lục giác, **không khép vòng**; 2–4 tàu con xếp đội hình | Tím nhạt – bạc · hồng · lục ngọc |
| **11 · Thôn Tinh** | Hố đen | **Thiết kế mới của riêng game này** (mẫu cũ trùng tàu 1): thân tối, lõi tròn hút sáng ở giữa thân | **Cánh tách lớp bị hút về lõi**, đĩa sáng xoắn quanh lõi, hạt bay vào. Chuyển động hướng **vào trong**, ngược mọi tàu khác | Tím đen · vàng kim · tím → lơ |

Chuẩn chung cho cả 4 ảnh:
- Thân cứng, giáp bóng, viền LED mảnh; năng lượng trong mờ, sáng nhất ở gốc, tan dần ở ngọn.
- Năng lượng phải **mọc ra từ một bộ phận cứng** của thân.
- Hình bung lớn (rộng khoảng 4–5 lần bề rộng thân), nhìn ở cỡ nhỏ vẫn phân biệt được 4 tàu với nhau và với tàu 8.
- Thân có một điểm nhận diện đọc được ở cỡ 64 px.

## Chưa làm đợt này
Bộ 12 tranh của từng tàu, tàu 1, 4, 5, 6, 9, 12, 13. Hướng đã chốt cho các tàu đó nằm ở mục 4 và mục 7 của tài liệu gửi kèm; riêng tàu 13 sẽ cần GPT đề xuất một mẫu bậc tím riêng ở đợt sau.
