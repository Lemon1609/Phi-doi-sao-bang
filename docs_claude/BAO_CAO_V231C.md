# Báo cáo V231C · kiểm mẫu chiến cơ và thử tàu 8 trong game (12/11/2026)

Chưa phát hành. Bản thử nằm trên nhánh riêng `thu-v231-tau8`; nhánh nguồn chính `nguon-v212` không đổi tranh.

Ký hiệu: **[Đo]** số đo bằng mã · **[Nhìn]** nhận xét bằng mắt.

## 1. Tóm tắt

| Việc | Trạng thái |
|---|---|
| Thân thường `tau8_tim.png` 512 × 512 | **Đã hoàn thành** |
| Thân Bạo Tẩu `tau8_tim_bt.png`, thân giữa trùng khít | **Đã hoàn thành** (sống cánh vẫn nên vẽ lại, xem 2.3) |
| Lông năng lượng + lưỡi plasma thang xám | **Đã hoàn thành** (cắt từ ảnh đã duyệt) |
| Tọa độ gốc cánh | **Đã hoàn thành** |
| Ghép vào game: tô màu, bật cánh, đập nhẹ | **Đã thử, cần chỉnh** (thứ tự lớp so với đạn địch) |
| Đo đạn địch còn dễ thấy trong vùng cánh | **Chưa thể thực hiện** đáng tin (mục 3.3) |
| Đo khung hình/giây trên máy yếu | **Chưa thể thực hiện** (trình duyệt chạy ngầm không đại diện cho điện thoại) |
| Nhận xét 4 mẫu hướng | **Đã hoàn thành**; cả 4 cần họa sĩ sửa nhẹ (mục 4) |

## 2. Bộ tách lớp tàu 8

### 2.1 Kiểm ảnh thử của GPT (`tau8_thu`) [Đo]
- Khổ ảnh: thân 1254 × 1254, lông 1448 × 1086, plasma 1448 × 1086. Không đúng khổ yêu cầu; nền trong suốt có.
- Không bị cắt mép: thân cách mép ≥ 81 px.
- Thân thường và thân bung **cùng vị trí** (lệch 0 px), nhưng phần thân giữa bị vẽ lại:
  - khác màu trung bình 8,9 / 255;
  - 2,5% điểm khác hơn 40 / 255;
  - khác dáng 1,0% diện tích.
  Vượt ngưỡng đề xuất (≤ 6 / 255), nên không dùng thân của bản bung.
- Lông năng lượng của GPT: cánh chim trắng **vểnh lên trên**. Ảnh đã duyệt là các dải lông **rủ xuống, xòe chéo ra ngoài**. Khác dáng nên không dùng.

### 2.2 Cách chuẩn hóa (công cụ `claude_tools/tau8_v231.py`, chạy lại được)
1. **Thân thường:** lấy `than_thuong`, thu về cạnh dài 456 px (cạnh dài tối đa của bộ căn cỡ), tâm khung bao tại (256, 256).
   - Kết quả: thân 252 × 456 px, lề 28 px.
   - Bộ căn cỡ lúc dựng ra hệ số 1,000, tức trong game giữ đúng cỡ này. Mình đã thêm tàu 8 vào nhóm không nắn tỉ lệ, giống tàu 7.
2. **Thân Bạo Tẩu = chính thân thường + hai sống cánh** cắt từ `than_bung`. Sống cánh được chỉnh bằng mã cho gần ảnh duyệt:
   - dời lên 116 px (hệ ảnh GPT), vì GPT gắn sống cánh thấp hơn ảnh duyệt;
   - dời ngang 30 px vào trong cho chân sống cánh bám mép thân;
   - xoay lên 17,5°, đúng góc sống cánh của ảnh duyệt (đo trên ảnh cắt có thước);
   - rút ngắn còn 96% để mũi lọt khung 512 với lề 23 px.
3. **Lông và lưỡi plasma lấy thẳng từ ảnh đã duyệt:**
   - trừ nền (1, 9, 43), xóa vùng thân và giáp sống cánh;
   - tách phần lam thành lưỡi plasma;
   - đưa về khung 1024 × 1024, cùng tỉ lệ điểm ảnh với thân, tâm thân tại (512, 512);
   - lưu thang xám (độ chói); dải màu đo từ ảnh duyệt nằm ở `tau8_ramp.json`.

**Đổi so với yêu cầu:** khung `fx` là **1024 × 1024**, không phải 1024 × 768. Ở 768 px, ngọn lông bị cắt khoảng 40 px vì lông rủ xuống dưới thân nhiều.

### 2.3 Số đo kiểm tra [Đo, có ở `so_do.json`]
| Hạng mục | Kết quả |
|---|---|
| Thân giữa `_bt` so với thân thường | Lệch vị trí 0 px · lệch cỡ 0% · khác màu 0,0 / 255 (cùng một tranh) |
| Lề nhỏ nhất của `_bt` | 23 px (thấp hơn ngưỡng 24 px là 1 px) |
| Lông `fx_bung`: khung bao trên khung 1024 | x 65–958, y 349–931 |
| Lưỡi plasma `fx_bung2`: khung bao | x 100–895, y 342–686 |
| Sai số tái tạo màu lông so với ảnh duyệt | 8,3 / 255 mỗi kênh, trung bình trên 338 nghìn điểm |
| Gốc cánh, hệ 512 | trái (191,2; 183,0) · phải (320,8; 183,0) |
| Quy đổi sang hệ 1024 | x1024 = x512 + 256 · y1024 = y512 + 256 |

**Còn cần họa sĩ:** sống cánh của GPT **mảnh và phẳng hơn** sống cánh giáp dày trong ảnh duyệt; mình chỉ dời, xoay, rút ngắn được. Ảnh `tau8_chong_lop_canh_anh_duyet.png` đặt hai bản cạnh nhau để so.

## 3. Thử trong game (nhánh `thu-v231-tau8`)

### 3.1 Đã ghép
- `src/ship118/tau8_tim.png`, `tau8_tim_bt.png`; `src/btfx218/tau8_fx_bung.png`, `tau8_fx_bung2.png`.
- `src/btfx218.js` có thêm lớp **BUNG231** (tắt bằng `window.BUNG231=false`):
  - tô màu theo dải màu đo từ ảnh duyệt, vẽ cộng sáng;
  - hai nửa cánh phóng to quanh gốc vai;
  - lóe sáng mềm ở vai trong 0,25 s đầu, không thành vòng;
  - cánh bật trong 0,2 s (từ 0,08 đến 0,28 s sau khi vào Bạo Tẩu);
  - lúc giữ: đập nhẹ ±2,5%, lông lay, lưỡi plasma nhấp nháy.
- Chỉ bật cho bậc **tím** của tàu 8. Các bậc khác của tàu 8 giữ tranh cũ, không có cánh.
- `claude_tools/candoi217.py`: thêm tàu 8 vào nhóm không nắn tỉ lệ.

### 3.2 Kết quả chạy
- Dựng bản thử OK, 68,8 MB. **t156: 14 / 14.** Không có lỗi trang.
- Ảnh chụp sảnh, trong trận và chuỗi Bạo Tẩu: `tau8_sanh_tran_bao_tau.jpg`, `tau8_trong_tran_chuoi_bao_tau.jpg`.
- Trong trận [Đo theo mã]:
  - sải cánh khoảng 215 / 480 đơn vị màn hình (≈ 45% bề ngang);
  - thân Bạo Tẩu khoảng 60 đơn vị;
  - tỉ lệ cánh / thân giữ như ảnh duyệt.
- [Nhìn] Gốc lông trong trận ít trắng hơn ảnh duyệt, vì phần gốc sáng nhất nằm sau thân. Nhìn chung cam rực.
- Vòng tròn mờ quanh tàu trong ảnh chụp là **khiên có sẵn của game** (bộ chụp đặt khiên đầy), không phải lớp mới.

### 3.3 Vướng
1. **Thứ tự lớp:** trong mã gốc, đạn địch được vẽ **trước** tàu người chơi. Vì vậy cánh, vẽ cộng sáng, đang nằm **trên** đạn địch: đạn vẫn thấy nhưng bị cánh làm sáng lên và lệch màu. Muốn đạn địch nằm trên cánh phải sửa chỗ gọi vẽ trong vòng lặp chính. Việc này đổi được và đảo lại được, mình làm khi bạn đồng ý.
2. **Đo độ nổi của đạn địch:** đã viết bộ đo (`tests/do231_dan_dich.py`), nhưng kết quả nhiễu:
   - cánh luôn đập nên hai ảnh chụp liền nhau đã khác nhau;
   - đạn đặt tay bị game gỡ khỏi màn hình.
   Chưa có số đáng tin, nên mình không báo con số.

## 4. Nhận xét 4 mẫu hướng (V231C/mau_huong) [Nhìn]
Ảnh xem: `4_mau_huong.jpg` và `xem_64px.png` (thu còn 64 px rồi phóng lại để xem). Ở 64 px, cả 4 mẫu và tàu 8 đều khác nhau rõ về hình bung.

### Tàu 2 · Cực Quang
- **Đạt:**
  - thân đúng dáng 86540B, ray thẳng, lõi lơ;
  - màn cực quang dọc lục – lơ – tím đi giữa các ray, không xòe ngang;
  - ở 64 px đọc thành một cột dọc, không lẫn với tàu khác.
- **Cần sửa:**
  - màn vươn về phía trước dài gần 2 lần thân: trong trận sẽ phủ vùng đạn địch phía trên. Đề nghị dài tối đa khoảng 1,2 lần thân, thêm một phần rèm rủ ra sau đuôi;
  - thân chiếm ít khung hình, nên để thân lớn hơn trong ảnh mẫu.

### Tàu 3 · X-Dực Băng
- **Đạt:**
  - thân đúng 86544;
  - bốn cánh đọc rõ chữ X ở 64 px;
  - màu trắng – lơ băng đúng hướng.
- **Cần sửa:** cánh đang giống lông vũ mềm hoặc cánh bướm. Yêu cầu là **tinh thể mặt cắt phẳng, cạnh cứng, có mặt vát**. Gốc bốn cánh cần mọc ra từ khớp cứng ở vai và đuôi.

### Tàu 10 · Tinh Hà
- **Đạt:**
  - thân đúng 86545, lõi vòng hồng ở thân;
  - hai khiên ô lục giác màu lục ngọc;
  - ba tàu con xếp đội hình.
- **Cần sửa:**
  - hai khiên cong gần chạm nhau ở trên và dưới, nên ở 64 px nhìn như **một vòng tròn hở**. Đề nghị khiên phẳng hoặc ít cong hơn, khe hở trên dưới tối thiểu bằng một bề rộng thân, để không phạm luật "không vòng tròn khép kín";
  - tàu con hơi nhỏ, nên lớn hơn hoặc đặt sát thân hơn.

### Tàu 11 · Thôn Tinh
- **Đạt:** giữ dáng 86538; xoáy hở, không khép vòng.
- **Cần sửa:**
  1. **Màu thân vẫn y mẫu cũ** (tím, sọc vàng), trong khi đã chốt phối lại thành **tím đen – lơ**. Để nguyên thì lẫn với tàu 1 (86540A, cũng tím – vàng).
  2. Các tia năng lượng đang **bắn tỏa ra ngoài** như vụ nổ. Cần cảm giác **hút vào**: tia thon dần về lõi, hạt bay vào trong.
  3. Lõi hút sáng chưa rõ (mới là chấm cam nhỏ). Đề nghị lõi tối có viền sáng, xoáy cân đối quanh lõi thay vì lệch lên góc phải.

## 5. Tệp gửi kèm
- `tau8_chuan_hoa/`: 4 tệp tranh, `tau8_ramp.json`, `so_do.json`.
- `anh_xem/`: ảnh chồng lớp cạnh ảnh duyệt, hai thân trên nền ô cờ, 64 px, chuỗi Bạo Tẩu trong game, 4 mẫu hướng.
- `GUI_GPT_V231D.md`: tin nhắn sửa cho họa sĩ.
