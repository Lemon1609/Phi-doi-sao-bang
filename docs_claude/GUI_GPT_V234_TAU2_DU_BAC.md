Chào GPT, tàu 6, 7, 8 đã xong và phát hành (V233). Làm tiếp **tàu 2 Cực Quang**. Mẫu hướng bậc tím (thân 86540B, màn cực quang dọc giữa hai thanh ray) đã được chủ dự án chốt ở V231D.

## Gửi kèm
- `02_cuc_quang.png`: mẫu đã chốt (nền tối).
- `tau2_tim_claude_tach.png`: thân Claude tách thử từ mẫu. **Chưa sạch**: thiếu giáp tối hai bên khoang và gai tím ở đáy, vì màu của chúng lẫn với màn cực quang. Chỉ dùng để xem tỉ lệ và vị trí.
- `tau2_fx_cq.png`: lớp màn cực quang thang xám, 1280 × 1280, tâm thân ở giữa, cùng tỉ lệ điểm ảnh với thân 512.
- `tau7_6bac_trong_tran.jpg`, `tau6_6bac.jpg`: cách các tàu trước lên bậc.

## 1. Thân bậc tím sạch (quan trọng nhất)
`tau2_tim.png` vẽ lại đúng mẫu 02_cuc_quang:
- **nền trong suốt**, không có màn cực quang;
- đủ hai thanh ray, thân giữa, hai khoang bên có giáp tối, hai cánh vây, gai tím ở đáy;
- cùng khung, cùng vị trí và tỉ lệ với `tau2_tim_claude_tach.png`.

## 2. Mười tranh thân `tau2_{thuong,luc,lam,tim5,ss}.png` và `_bt`
Vẽ ở **cùng tỉ lệ với `tau2_tim.png`**.

| Bậc | Thân thường | Bản Bạo Tẩu |
|---|---|---|
| thuong | Gọn nhất: 2 thanh ray ngắn, chưa có cánh vây | Ray nhô dài thêm |
| luc | Ray dài hơn, cánh vây nhỏ | Ray dài + vây mở |
| lam | Gần đủ như bậc tím, gọn hơn | Ray và vây mở |
| tim5 | Như bậc tím + ray phụ thứ hai mỗi bên; cao ≤ 456 px | Bốn ray dựng cao |
| ss | Mạnh nhất: ray kép, khoang lớn, lõi lớn; cao ≤ 456 px, **tỉ lệ thân giống bậc tím+** (không vẽ dẹt ngang) | Ray kép mở như cổng |

Bắt buộc:
- `_bt` = chính bản thường cùng bậc + phần ray / vây mở ra; không vẽ lại thân giữa.
- Lề ≥ 24 px; không năng lượng trong tranh thân.

## 3. Lớp màn thứ hai `tau2_fx_cq_tang2.png` (cho tím+ và SS)
- Thang xám, 1280 × 1280, cùng hệ tọa độ với `tau2_fx_cq.png`.
- Thêm hai dải cực quang mảnh hơn ở **ngoài** hai thanh ray, gợn sóng lệch pha với màn chính.
- Không vòng tròn khép kín.

## 4. Bảng màu 6 bậc (phương án C)
- Mỗi bậc một màu riêng; bậc thấp mờ, ít dải; bậc cao rực, nhiều tầng; SS sáng nhất.
- Bậc tím giữ mẫu: thân bạc trắng; màn lục → lơ → tím nhạt.
- Khác bảng các tàu 6, 7, 8.

| Bậc | Giáp chủ | Đèn / LED | Màn: gốc → giữa → ngọn | Lớp 2 |
|---|---|---|---|---|

## 5. Nộp
Một zip `V234_TAU2_DU_BAC.zip`:
- `tau2_tim.png` sạch;
- 10 PNG thân;
- `tau2_fx_cq_tang2.png`;
- bảng màu;
- ảnh ghép 6 bậc × 2 hàng.
