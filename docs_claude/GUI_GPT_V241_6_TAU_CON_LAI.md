Chào GPT, chủ dự án muốn **đẩy nhanh: thiết kế cả 6 tàu còn lại trong một lượt**, rồi duyệt một lần. Đã xong: tàu 2, 3, 6, 7, 8, 10, 12. Còn: **1 Phượng Hoàng · 4 Thần Ma · 5 Thự Quang · 9 Thiên Khung · 11 Thôn Tinh · 13 Hư Không**.

Mỗi tàu nộp **một zip riêng** (`V241_TAU1.zip`, `V241_TAU4.zip`, …). Làm xong tàu nào gửi tàu đó, không cần chờ đủ 6.

---

## A. Quy cách chung (rút từ 7 tàu đã làm, áp cho mọi tàu)

### A1. Phong cách
- Học phong cách game gốc: giáp kim loại chi tiết, khung thép tối, bộ phận máy lộ ra; năng lượng cộng sáng (lõi trắng → màu đậm → mép trong mờ, không viền đen). Hình bung rộng 4–5 lần thân, lệch về phía sau, phía trước mũi để trống.
- **Không chép dáng hay bố cục hình bung của game gốc.** Mục B ghi rõ từng tàu cần tránh gì.
- Không vòng tròn khép kín quanh tàu. Không chữ trong tranh.

### A2. Mười hai tranh thân `tauN_{thuong,luc,lam,tim,tim5,ss}.png` và `_bt`
- Khung 1254 × 1254, nền trong suốt, **cùng tỉ lệ cho cả 6 bậc**, thân ở giữa, lề ≥ 24 px.
- **Bậc thấp không đơn sắc, không nhỏ**: ít nhất 2 màu giáp (giáp chủ + giáp phụ có màu) + màu đèn; cỡ ≥ 90 % bậc tím; chi tiết dày như bậc tím. Phân bậc bằng số bộ phận, độ lớn lõi, độ rực đèn.
- **Thường và Bạo Tẩu phải khác rõ**:
  - `_bt` = chính bản thường + **giáp cứng mở ra nằm ngoài viền thân** (thò ra, xòe ra, dựng lên). Không vẽ lại thân giữa: Claude ghép thân thường đè lên, nên chi tiết vẽ bên trong thân sẽ bị che.
  - Bề ngang `_bt` ≥ **1,25 lần** bản thường, hoặc diện tích ≥ **1,2 lần**.
- Không vẽ năng lượng, cánh bung hay mảnh rời trong tranh thân.

### A3. Ảnh bung bậc tím `tauN_bung_tim.png`
- Nền **một màu tối, phẳng**. Thân **đúng như `tauN_tim_bt.png`** (không vẽ khác), đặt giữa ảnh, cạnh dài thân khoảng 1/3 ảnh.
- Cánh bung phải **bám vào thân** (mọc từ vai, chân cánh, bệ mở ra), không lơ lửng tách rời.

### A4. Lớp thứ hai `tauN_bung_tang2.png` (cho tím+ và SS)
- Thang xám trên nền đen, **cùng khung và vị trí với ảnh bung bậc tím**, không có thân.
- Thêm tầng phụ (mảnh, dải, hạt) quanh cánh chính, mỏng hơn cánh chính.
- Game vẽ kiểu cộng sáng nên phần tối thành trong suốt: cạnh và chi tiết phải sáng hơn nền rõ ràng.

### A5. Bảng màu năng lượng 6 bậc (mép → thân → lõi)
- Mỗi bậc một màu riêng, bậc cao rực hơn, SS sáng nhất.
- **Bậc thấp hai sắc**: mép một màu, thân một màu khác.
- Kèm một ảnh ghép 6 bậc × 2 hàng (thường / Bạo Tẩu).

### A6. Chất liệu bung đã dùng, không lặp lại
| Tàu | Chất liệu bung |
|---|---|
| 8 | lông lửa |
| 7 | phiến lưỡi |
| 6 | vảy kính số tan thành điểm ảnh |
| 2 | màn cực quang dọc |
| 3 | tinh thể băng nạp năng lượng cho súng |
| 10 | khiên lục giác + tàu con |
| 12 | mảnh giáp ngưng thời gian + mặt đồng hồ hở |

---

## B. Từng tàu

### Tàu 1 Phượng Hoàng (dáng `86540A`)
- Thân tím – bạc, lõi vàng kim. Đèn vàng kim.
- **Bung: quạt lông tròn đầu** xòe lên hai bên vai + **3–5 dải đuôi dài** rủ sau (như đuôi công). Lửa vàng kim ở gốc → tím ở ngọn.
- Khác tàu 8: lông **tròn đầu**, không nhọn; không có sống cánh ngang; đuôi dài là chính.
- Tránh: lưỡi vàng tỏa ngang như mặt trời / chân nhện của video 86540.
- `_bt`: hai cánh tam giác dựng chếch lên, động cơ đuôi xòe ra.

### Tàu 4 Thần Ma (dáng `86541`)
- Giáp **đỏ sẫm – đen**, hai "mắt" vòng lam; năng lượng **lơ – lục**.
- **Bung: hai móng vuốt năng lượng lớn** (3–4 ngón, có khớp) vươn ra hai bên từ vai; xích sáng nối móng vào vai; sau lưng một **ấn chú hình học hở** (đường gãy, không chữ, không khép vòng).
- Khác tàu 6 (cánh dơi tan rã) và tàu 7 (phiến lưỡi): đây là **móng vuốt có khớp**.
- Tránh: vây lưỡi lơ mọc quanh thân chĩa xuống của video 86541.
- `_bt`: hai khối mắt tròn tách ra hai bên, càng giáp dưới mở như hàm.

### Tàu 5 Thự Quang (dáng `86542`)
- Thân bạc – hồng tím (theo mẫu); năng lượng **trắng – vàng nhạt** (bình minh).
- **Bung: "lăng kính bình minh"**:
  - các phiến kính chữ nhật mỏng xếp bậc thang chéo ra sau hai bên, như ô cửa đón nắng;
  - ánh sáng tán sắc mảnh ở mép phiến;
  - **nửa vành mặt trời** mọc sau lưng (nửa cung, không khép vòng).
- Tránh: quạt gai tinh thể khổng lồ tỏa ngang của video 86542; không làm gai nhọn tỏa tia.
- `_bt`: các gai giáp hai bên xòe rộng ra ngoài.

### Tàu 9 Thiên Khung (dáng `86548`)
- Thân hồng tím, lõi lam (giữ màu đã chốt).
- **Bung: "chòm sao và tinh vân"**:
  - mỗi cánh là một **chòm sao**: các điểm sao sáng nối bằng đường sáng mảnh;
  - bên trong là **mây tinh vân** hồng tím mờ;
  - vài sao băng nhỏ rơi chéo.
- Tránh: cánh hoa nhiều lớp nở hai bên của video 86548. **Không vẽ cánh hoa, không vẽ bóng mờ lệch.**
- `_bt`: các lưỡi giáp cong hai bên xòe ra, dựng thêm cặp anten sao ở vai.

### Tàu 11 Thôn Tinh (dáng `86538`, mẫu bung đã chốt `11_thon_tinh.png`)
- Thân **tím đen – lơ**, lõi hút sáng (lỗ đen) ở giữa thân.
- **Bung đã chốt**: các dải năng lượng tím – lơ **xoáy hút vào lõi**. Không cần vẽ ảnh bung mới.
- Cần:
  - `tau11_tim.png` và `tau11_tim_bt.png` sạch (nền trong suốt), đúng thân trong mẫu;
  - 10 tranh các bậc khác;
  - lớp thứ hai `tau11_bung_tang2.png`: thêm hạt sáng bay vào lõi và một vòng xoáy mảnh lệch pha, cùng khung với `11_thon_tinh.png`, không có thân.
- Khác tàu 1: cùng gốc dáng nhưng tàu 11 tím đen – lơ, tàu 1 tím – vàng kim.
- `_bt`: hai cánh tam giác mở rộng, các ống động cơ hai bên dựng ra.

### Tàu 13 Hư Không (thiết kế riêng, chưa có dáng)
- Tự thiết kế dáng: tàu **vương miện**, thân tối có **khe nứt sáng dọc thân** (ánh sáng từ bên trong). Màu đèn tím (đã chốt chỉ một màu đèn). Thân sáng hơn tàu địch để không lẫn.
- **Bung: gai vương miện** bung ra sau lưng thành hình quạt hở + khe nứt trên thân sáng rực, các mảnh vỡ hư không trôi chậm ra ngoài.
- Học cách tiến bậc từ các video (bậc cao đổi sang tông rực và nhiều tầng), nhưng không lấy dáng.
- Gửi **dáng bậc tím trước** (thân + ảnh bung) để chủ dự án duyệt, rồi mới vẽ 10 tranh còn lại.

---

## C. Nộp mỗi tàu
- 12 PNG thân;
- `tauN_bung_tim.png` (trừ tàu 11);
- `tauN_bung_tang2.png`;
- bảng màu 6 bậc;
- ảnh ghép 6 bậc × 2 hàng.
