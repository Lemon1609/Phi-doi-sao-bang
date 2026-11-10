# ĐỊNH HƯỚNG MỸ THUẬT · V212E · SỬA SAU BỘ 12 TRANH TÀU #7

Gửi GPT. Bộ 12 tranh tàu #7 đạt được:
- chất kim loại chân thật;
- đủ 6 bậc × Bạo Tẩu, đúng tên tệp và khổ tranh.

Chủ dự án nhận xét:

> "Đồ họa nên tươi sáng, bắt mắt hơn."

**Giữ nguyên dáng và độ chân thật**, sửa 3 điểm sau.

## 1. Màu tươi, bắt mắt (quan trọng nhất)

| Hiện tại | Cần |
|---|---|
| Thép xám đậm chiếm gần hết thân; tím trầm; gần như một tông lam | **Sơn màu tươi, bóng loáng chiếm 40–50% thân**: tấm giáp sơn tím sáng / lam điện / ngọc (theo màu tàu) |
| Kim loại xám tối | Kim loại **chrome sáng, bạc trắng** có phản chiếu trời xanh, chiếm 30–40% |
| Phần tối nhiều | Phần tối (khe, rãnh) **≤ 15%** |
| Ánh sáng đều, hơi mờ | Điểm bóng **trắng chói** trên mép giáp; đèn viền màu năng lượng rõ; lõi và đèn phát sáng có quầng tỏa (bloom) |
| Năng lượng chỉ ở mép lưỡi | Năng lượng là **điểm rực nhất**: đường gân sáng chạy dọc thân, lõi trước buồng lái sáng, lửa động cơ dài và chói |

Tham chiếu cảm giác: tàu game mobile bắn máy bay đời 2014–2016, kiểu **"kim loại thật nhưng sơn màu như siêu xe"**. Màu bão hòa cao, tương phản mạnh, sáng sủa trên nền navy.

## 2. Các bậc khác nhau rõ ràng

Mỗi bậc phải **thêm ít nhất một bộ phận nhìn thấy ngay** và **màu bậc chiếm khoảng 15% diện tích** (đèn, đường gân năng lượng, viền giáp), không chỉ vài chấm.

| Bậc | Ví dụ cho tàu #7 Đao Phong |
|---|---|
| `thuong` | Dáng gốc, 2 lưỡi liềm ngắn, gân năng lượng trắng – lam |
| `luc` | Gân năng lượng **lục**, thêm 2 vây đuôi |
| `lam` | Gân năng lượng **lam đậm**, thêm cặp động cơ phụ, lưỡi dài hơn |
| `tim` | Gân **tím sáng**, lưỡi liềm có lớp thứ hai |
| `tim5` | Lưỡi liềm lớn ôm gần kín, thêm khắc rune phát sáng tím |
| `ss` | Dạng hoàn chỉnh: 4 lưỡi, giáp khắc tinh xảo, quầng sáng lam – trắng phía sau |

- **Cùng tỉ lệ:** thân tàu ở mọi bậc **giữ đúng một kích thước** và tâm (256, 256).
- Bậc cao hơn **lớn ra ngoài** nhờ lưỡi, cánh, hiệu ứng, **không thu nhỏ thân** (bản SS vừa rồi bị nhỏ hơn).

## 3. Bạo Tẩu phải bùng nổ
- Ngoài viền sét: thêm **quầng sáng lớn trong suốt** sau tàu, **tia sét nhiều nhánh** tỏa ra, lưỡi liềm thành **plasma sáng rực** (lõi trắng), lửa động cơ dài gấp đôi.
- Bậc càng cao, phần bùng phát càng lớn và rực.

## 4. Giữ nguyên
- Tiến hóa theo đặc trưng (không tô vàng).
- Năng lượng không dùng đỏ #FF334F / hồng #F50057.
- Đúng tên tệp `tau7_{bac}[_bt].png`, 512 × 512, nền trong suốt.
- Không chép tàu, logo hay tên của game gốc.

## 5. Mẫu lời nhắc (bậc `tim`)

> Top-down original sci-fi fighter for a mobile shoot-'em-up, nose up, centered at 256,256, transparent background, 512x512.
> Realistic hard-surface 3D render but **vibrant and eye-catching**: glossy candy-violet and electric-blue painted armor plates covering about half the hull, bright polished chrome metal, very few dark areas, crisp white specular highlights, strong cyan rim light, glowing bright-violet energy lines along the hull, two-layer crescent blades of polished metal with glowing edges, long brilliant blue-white engine flames, bloom glow.
> **High saturation, high contrast, bright and clean on a dark navy background.**
>
> **_bt version:** add a large translucent glowing aura behind the ship, branching lightning radiating outward, blades turn into blazing plasma with white-hot cores, engine flames twice as long.

## 6. Tông màu tươi sáng hơn, phối màu đẹp hơn (chủ dự án bổ sung)

### 6.1 Nguyên tắc phối
- **Tỉ lệ 60 / 30 / 10:**
  - 60% màu chủ (sơn giáp tươi + chrome sáng);
  - 30% màu phụ hòa hợp;
  - 10% màu nhấn **tương phản** (lõi, đèn, đường gân) để mắt bị hút vào.
- **Tông tổng thể sáng:** giá trị trung bình của tàu sáng hơn hẳn nền navy. Mọi màu đều **trong và sạch**, không pha xám, không đục.
- **Mỗi tàu một cặp màu đẹp, dễ nhớ.** Dùng cặp bổ túc hoặc liền kề (lam – ngọc, tím – cyan, cam – lam…). Tránh trộn quá 3 màu chính.
- **Chuyển màu mượt** trên tấm giáp (gradient sáng → đậm theo ánh đèn), có **ánh óng ánh nhẹ** (iridescent) ở mép giáp cao cấp.
- Năng lượng **sáng hơn thân 1 bậc**, lõi gần trắng, viền màu nhấn.

### 6.2 Bảng phối gợi ý cho 13 tàu (màu chủ · màu phụ · màu nhấn)

| # | Tàu | Chủ | Phụ | Nhấn |
|---|---|---|---|---|
| 1 | Phượng Hoàng | Cam lửa sáng | Chrome trắng | Lam ngọc (lõi) |
| 2 | Cực Quang | Ngọc lục bảo | Trắng bạc | Tím hồng nhạt óng ánh (không dùng hồng #F50057) |
| 3 | X-Dực Băng Hà | Lam băng | Trắng tuyết | Cyan chói |
| 4 | Thần Ma Dị Hình | Lục acid | Tím than nhẹ | Vàng chanh |
| 5 | Trí Tuệ Thự Quang | Trắng ngọc | Lam trời | Cam bình minh |
| 6 | Siêu Nghiệm U Linh | Tím oải hương | Bạc | Cyan ma |
| 7 | Ma Vương Đao Phong | Tím sáng | Lam điện | Trắng chói (lõi plasma) |
| 8 | Phần Thiên Chiến Chuẩn | Cam thép | Xám bạc sáng | Lam plasma |
| 9 | Thiên Khung Lược Ảnh | Lam biển | Trắng | Vàng nhạt |
| 10 | Tinh Hà Thủ Vọng | Lục quân sáng | Bạc | Cam tín hiệu |
| 11 | Thôn Tinh | Tím vũ trụ | Ngà | Cyan tinh vân |
| 12 | Thời Không | Lam kim loại | Bạc | Vàng đồng nhạt (chỉ đèn, không phủ giáp) |
| 13 | Hư Không | Trắng tinh | Tím nhạt | Lam tím chói |

Màu bậc (Lục / Lam / Tím…) vẫn là đèn và gân năng lượng khoảng 15% diện tích, đặt **hài hòa** với bảng trên.
