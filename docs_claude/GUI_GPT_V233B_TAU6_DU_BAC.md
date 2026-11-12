Chào GPT, chủ dự án đã duyệt ảnh tàu 6 U Linh bậc tím đang bung (cánh nhiễu số). Claude đã tách lớp và ghép thử vào game. Đợt này vẽ **5 bậc còn lại**. Chủ dự án cho phép **cân đối màu tùy bậc**.

## Gửi kèm
- `tau6_tim.png`: 512 × 512, thân 456 × 393 px, tâm (256, 256). **Chuẩn tỉ lệ và vị trí** cho cả 6 bậc.
- `tau6_fx_so.png`: lớp cánh nhiễu số, thang xám, 1536 × 1536, tâm thân ở giữa, cùng tỉ lệ điểm ảnh với thân 512. Gốc cánh ở hai mép thân, quanh (58, 236) và (453, 236) trên khung 512.
- `tau6_bung_DA_DUYET.png`: ảnh đã duyệt.
- `tau7_6bac_trong_tran.jpg`: cách tàu 7 lên bậc trong game.

## 1. Mười tranh thân `tau6_{thuong,luc,lam,tim5,ss}.png` và `_bt`
Vẽ ở **cùng tỉ lệ với `tau6_tim.png`** (đặt chồng lên tệp đó khi vẽ).

| Bậc | Thân thường | Bản Bạo Tẩu |
|---|---|---|
| thuong | Gọn nhất: ít tấm phẳng, ngắn hơn bậc tím ~15% | Hai tấm cánh mở ra một chút |
| luc | Thêm 1 tấm phẳng mỗi bên | Tấm cánh mở rộng hơn |
| lam | Đủ tấm như bậc tím nhưng gọn hơn | Tấm cánh mở, lộ khe sáng |
| tim5 | Như bậc tím + tấm phụ, nhiều đường LED hơn; rộng không quá 456 px | Tấm mở + tấm phụ dựng lên |
| ss | Mạnh nhất: nhiều tầng tấm, tinh thể mũi lớn, lõi lớn; rộng không quá 456 px | Các tầng tấm mở như cánh |

Bắt buộc:
- **Bản `_bt` = chính bản thường cùng bậc + phần tấm cứng mở ra.** Không vẽ lại thân giữa.
- Lề ≥ 24 px.
- Không năng lượng trong tranh thân.

## 2. Lớp cánh thứ hai `tau6_fx_so_tang2.png` (cho tím+ và SS)
- Thang xám, 1536 × 1536, cùng hệ tọa độ với `tau6_fx_so.png`.
- Thêm một tầng khối vuông / tấm kính xa hơn và cột dữ liệu dựng cao hơn.
- Không vòng tròn khép kín.

## 3. Bảng màu 6 bậc (phương án C, chủ dự án cho cân đối tùy bậc)
- Mỗi bậc một màu riêng; bậc thấp mờ, ít khối; bậc cao rực, nhiều tầng; SS sáng nhất.
- Bậc tím giữ ảnh duyệt: thân tối, năng lượng lơ ngọc / lam, điểm cam.
- **Khác bảng tàu 7** (lơ → lục → lam lơ → đỏ vàng → vàng đỏ → vàng kim + lơ ngọc) và **khác tàu 8** (than đỏ → tím hồng → lam tím → cam lửa → vàng hồng → trắng vàng + tím lam).

Nộp bảng theo mẫu:

| Bậc | Giáp chủ | Đèn / LED | Khối năng lượng: gốc → giữa → mép | Lớp 2 |
|---|---|---|---|---|

## 4. Nộp
Một zip `V233B_TAU6_DU_BAC.zip`:
- 10 PNG thân;
- `tau6_fx_so_tang2.png`;
- bảng màu;
- ảnh ghép 6 bậc × 2 hàng.
