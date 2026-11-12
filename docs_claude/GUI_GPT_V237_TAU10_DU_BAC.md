Chào GPT, tàu 2, 3, 6, 7, 8 đã xong đủ 6 bậc. Làm tiếp **tàu 10 Tinh Hà**. Mẫu hướng bậc tím (thân bạc – hồng tím, mắt lõi hồng, hai tấm khiên lục giác cong hai bên, 3 tàu con phía sau) đã được chủ dự án chốt ở V231D.

## Học phong cách game gốc
Được học phong cách (giáp kim loại chi tiết, năng lượng cộng sáng, bung rộng 4–6 lần thân, lên bậc đổi màu và số bộ phận), nhưng **không chép dáng hay bố cục hình bung của game gốc**. Video 86545 có mái vòm khiên úp kín qua đầu tàu và đàn tàu hộ tống bay phía trước. **Tránh cả hai**: khiên chỉ ở hai bên, không nối thành vòm qua mũi; tàu con ở phía sau.

## Gửi kèm
- `10_tinh_ha.png`: mẫu đã chốt (nền tối).
- `tau10_tim_bt_claude_tach.png`: thân Claude tách từ mẫu, 512 × 512, khá sạch. Dùng làm chuẩn tỉ lệ và vị trí.
- `tau10_fx_khien.png`: lớp khiên thang xám, 1536 × 1536, tâm thân ở giữa, cùng tỉ lệ điểm ảnh với thân 512.
- `tau10_tach_xem.jpg`: ghép thử thân + khiên.
- `tau3_6bac.jpg`, `tau6_6bac.jpg`: cách các tàu trước lên bậc.

## 1. Thân bậc tím
- `tau10_tim.png`: lúc bay thường. Đúng thân trong `tau10_tim_bt_claude_tach.png`; hai đầu cánh có **bệ phát khiên gập sát**.
- `tau10_tim_bt.png`: **chính thân đó**, bệ phát khiên ở hai đầu cánh **mở ra**, khoang tàu con dưới bụng mở. Không vẽ lại thân giữa.
- Nền trong suốt, cùng khung, vị trí và tỉ lệ với tệp Claude tách. **Thân giữ nguyên dáng, không thêm bộ phận lớn** (không thêm súng, tay đòn).

## 2. Mười tranh thân `tau10_{thuong,luc,lam,tim5,ss}.png` và `_bt`
Vẽ ở **cùng tỉ lệ với `tau10_tim.png`**.

| Bậc | Thân thường | Bản Bạo Tẩu |
|---|---|---|
| thuong | Gọn nhất: cánh ngắn, mắt lõi nhỏ | Bệ khiên nhỏ mở |
| luc | Cánh dài hơn | Bệ khiên mở |
| lam | Gần đủ như bậc tím, gọn hơn | Bệ khiên + khoang tàu con mở |
| tim5 | Như bậc tím + giáp vai và cánh phụ; cao ≤ 456 px | Bệ khiên kép |
| ss | Mạnh nhất: giáp nhiều lớp, mắt lõi lớn; cao ≤ 456 px, **tỉ lệ thân giống bậc tím+** (không vẽ dẹt ngang) | Bệ khiên kép + khoang lớn |

Bắt buộc:
- `_bt` = chính bản thường cùng bậc + phần mở ra; không vẽ lại thân giữa.
- Lề ≥ 24 px; không vẽ khiên, tàu con hay năng lượng trong tranh thân.

## 3. Tàu con `tau10_tau_con.png`
- Một tàu con, nền trong suốt, 256 × 256, mũi hướng lên, cùng phong cách với thân (xem 3 tàu con trong mẫu).
- Không vẽ vệt lửa đuôi (game tự vẽ).

## 4. Lớp khiên thứ hai `tau10_fx_khien_tang2.png` (cho tím+ và SS)
- Thang xám, 1536 × 1536, cùng hệ tọa độ với `tau10_fx_khien.png`.
- Một lớp khiên lục giác mỏng hơn, nằm **trong** hai khiên chính, lệch pha; vài ô lục giác rời bay ra ở mép khiên.
- Không nối hai khiên qua mũi; không vòng tròn khép kín.
- Game vẽ kiểu cộng sáng, nên phần tối thành trong suốt. Đường lưới và mép khiên phải sáng rõ hơn nền.

## 5. Bảng màu 6 bậc (phương án C)
- Mỗi bậc một màu riêng; bậc thấp mờ, ít lớp; bậc cao rực, nhiều tầng; SS sáng nhất.
- Bậc tím giữ mẫu: thân bạc – hồng tím, mắt lõi hồng; khiên lục ngọc → lục bảo.
- Gợi ý của Claude, GPT chỉnh cho đẹp:

| Bậc | Giáp chủ | Đèn / LED | Khiên: mép → lưới → lõi | Lớp 2 |
|---|---|---|---|---|
| thuong | bạc xám | trắng hồng nhạt | lục xám mờ → trắng lục | — |
| luc | bạc, lục lá | lục chanh | lục đậm → lục lá → trắng | — |
| lam | bạc, lam | lơ | lam ngọc → lơ → trắng | — |
| tim | bạc, hồng tím | hồng | lục bảo → lục ngọc → trắng (theo mẫu) | — |
| tim5 | bạc, tím | hồng tím | tím → tím hồng → trắng | lục ngọc mảnh |
| ss | bạc trắng, viền vàng kim | vàng kim | cam nhạt → vàng kim → trắng | trắng lục |

## 6. Nộp
Một zip `V237_TAU10_DU_BAC.zip`:
- `tau10_tim.png`, `tau10_tim_bt.png`;
- 10 PNG thân;
- `tau10_tau_con.png`;
- `tau10_fx_khien_tang2.png`;
- bảng màu;
- ảnh ghép 6 bậc × 2 hàng.
