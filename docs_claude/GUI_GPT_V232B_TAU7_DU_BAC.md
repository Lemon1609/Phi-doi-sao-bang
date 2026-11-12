Chào GPT, chủ dự án đã duyệt ảnh tàu 7 Đao Phong bậc tím đang bung (quạt 3 phiến lưỡi mỗi bên). Claude đã tách lớp và ghép thử vào game. Đợt này vẽ **5 bậc còn lại** dựa đúng trên bộ bậc tím.

## Gửi kèm
- `tau7_tim.png`: 512 × 512, thân 397 × 456 px, tâm (256, 256). **Chuẩn tỉ lệ và vị trí** cho cả 6 bậc.
- `tau7_fx_kiem.png`: lớp phiến lưỡi thang xám, 1280 × 1280, tâm thân ở giữa, cùng tỉ lệ điểm ảnh với thân 512. Gốc chùm phiến ở mép tấm lưỡi cứng ngoài cùng, quanh điểm (57, 248) và (454, 248) trên khung 512.
- `tau7_bung_DA_DUYET.png`: ảnh đã duyệt.
- `tau8_6bac_trong_tran.jpg`: cách tàu 8 lên bậc trong game (cỡ cánh, số lớp, độ rực tăng dần) để tham khảo cách phân bậc.

## 1. Mười tranh thân: `tau7_{thuong,luc,lam,tim5,ss}.png` và `_bt`
Vẽ ở **cùng tỉ lệ với `tau7_tim.png`** (đặt chồng lên tệp đó khi vẽ).

| Bậc | Thân thường | Bản Bạo Tẩu |
|---|---|---|
| thuong | Gọn nhất: chỉ 1 cặp lưỡi cứng, thân ngắn hơn bậc tím ~15% | Lưỡi cứng mở rộng ra hai bên một chút |
| luc | 1 cặp lưỡi + mầm cặp thứ hai ngắn | Như trên, lưỡi mở rộng hơn |
| lam | 2 cặp lưỡi, cặp ngoài ngắn hơn bậc tím | Hai cặp lưỡi mở ra |
| tim5 | Như bậc tím + lưỡi phụ nhỏ ở đuôi, rãnh sáng nhiều hơn; cao không quá 456 px | Lưỡi mở + lưỡi phụ dựng lên |
| ss | Mạnh nhất: 3 cặp lưỡi, giáp nhiều lớp, lõi lớn; cao không quá 456 px | Ba cặp lưỡi mở như vương miện kiếm |

Bắt buộc:
- **Bản `_bt` = chính bản thường cùng bậc + phần lưỡi cứng mở ra.** Không vẽ lại thân giữa.
- Mọi chi tiết cách mép khung ≥ 24 px.
- Không lửa, quầng hay năng lượng trong tranh thân.

## 2. Lớp phiến theo bậc
- Bậc thấp không cần tranh riêng: game dùng lớp phiến bậc tím, thu nhỏ và bớt phiến theo bậc.
- Vẽ thêm **một tranh lớp phiến thứ hai** `tau7_fx_kiem_tang2.png` cho tím+ và SS:
  - thang xám, 1280 × 1280, cùng hệ tọa độ với `tau7_fx_kiem.png`;
  - 2 phiến dài hơn mỗi bên, xen giữa các phiến chính, gốc ở cùng mép lưỡi cứng;
  - không vòng tròn khép kín.

## 3. Bảng màu 6 bậc (theo nguyên tắc phương án C đã chốt ở tàu 8)
- Mỗi bậc một màu riêng; bậc thấp mờ, ít phiến; bậc cao rực, nhiều lớp; SS sáng nhất.
- Bậc tím giữ đúng ảnh duyệt: thân tím; phiến đỏ → vàng, mép trắng.
- **Khác bảng tàu 8.** Tàu 8 đi: than đỏ → tím hồng → lam tím → cam lửa → vàng hồng → trắng vàng + lớp sau tím lam.

Nộp bảng theo mẫu:

| Bậc | Giáp chủ | Đèn / LED | Phiến: gốc → giữa → mép | Lớp phiến 2 (tím+, SS) |
|---|---|---|---|---|

## 4. Nộp
Một zip `V232B_TAU7_DU_BAC.zip`:
- 10 PNG thân;
- `tau7_fx_kiem_tang2.png`;
- bảng màu;
- ảnh ghép 6 bậc × 2 hàng (thường / Bạo Tẩu) trên nền tối.

Nếu chạm hạn mức tạo ảnh: gửi trước 5 bản thường và bảng màu.
