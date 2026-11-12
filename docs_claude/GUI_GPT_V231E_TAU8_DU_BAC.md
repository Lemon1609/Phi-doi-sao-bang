Chào GPT, chủ dự án đã chốt tàu 8 Phần Thiên bậc tím: thân thường, thân Bạo Tẩu (sống cánh bản V231D) và cánh năng lượng. Bản ghép đã chạy trong game. Đợt này vẽ **5 bậc còn lại** dựa đúng trên bộ bậc tím.

## Gửi kèm (Claude đã chuẩn hóa)
- `tau8_tim.png`, `tau8_tim_bt.png`: 512 × 512, thân 252 × 456 px, tâm (256, 256). **Đây là chuẩn tỉ lệ và vị trí** cho cả 6 bậc.
- `tau8_fx_bung.png`, `tau8_fx_bung2.png`: lông năng lượng và lưỡi plasma thang xám, 1024 × 1024, tâm thân (512, 512), cùng tỉ lệ điểm ảnh với thân.
- Ảnh chồng lớp bậc tím trong game.

## 1. Mười tranh thân: `tau8_{thuong,luc,lam,tim5,ss}.png` và `_bt`

Vẽ ở **cùng tỉ lệ với `tau8_tim.png`** (đặt chồng lên tệp đó khi vẽ). Claude tự căn cỡ theo bậc lúc dựng.

| Bậc | Thân thường | Bản Bạo Tẩu (sống cánh) |
|---|---|---|
| thuong | Gọn nhất: mặt nạ đơn giản, mỗi bên 1 tầng phiến, đuôi 2 gai ngắn; ngắn hơn bậc tím ~20% | Sống cánh ngắn (~60% bậc tím), không khớp phụ |
| luc | Thêm 1 phiến nhỏ mỗi bên, mũi dài hơn | Sống cánh ~70%, 1 khớp vàng |
| lam | 2 tầng phiến rõ, 2 nòng nhỏ ở vai | Sống cánh ~85%, mép trước có rãnh sáng |
| tim5 | Như bậc tím + phiến cánh phụ phía sau, rãnh sáng nhiều hơn; **cao không quá 456 px** (bằng bậc tím), lớn lên theo bề ngang và số lớp | Sống cánh như bậc tím + 1 lưỡi phụ bên dưới |
| ss | Mạnh nhất: 3 tầng phiến, mặt nạ nhiều lớp, đuôi gai dài nhất; cao không quá 456 px | Sống cánh kép (2 lưỡi mỗi bên), khớp vai lớn |

Bắt buộc:
- **Bản `_bt` = chính bản thường cùng bậc + sống cánh.** Không vẽ lại thân: Claude đo, lệch là bị trả.
- Chân sống cánh ở vai trên, ngang tầm mặt nạ; chĩa ra ngoài và lên ~17–25° như bậc tím.
- Mũi sống cánh và mọi chi tiết cách mép khung ≥ 24 px.
- Không lửa, quầng hay năng lượng trong tranh thân.

## 2. Một tranh cánh lớp sau: `tau8_fx_bung_tang2.png` (cho tim5 và ss)
- Thang xám, 1024 × 1024, nền trong suốt, tâm thân (512, 512), **cùng tỉ lệ** với `tau8_fx_bung.png`.
- Nội dung: **một lớp lông thứ hai nằm sau lớp chính**: dải lông dài hơn, rủ xuống và xòe xa hơn khoảng 15%, cộng thêm 2–3 dải đuôi dài phía sau.
- Gốc lớp sau cũng bám vai, không khép vòng tròn.
- Bậc thấp không cần tranh riêng: game dùng lớp chính thu nhỏ theo bậc (thuong 70%, luc 78%, lam 88%).

## 3. Bảng màu 6 bậc
Mỗi bậc đổi **màu giáp** và **màu năng lượng**; hai bậc liền nhau phải khác rõ ở cỡ 64 px. Bậc tím giữ đúng ảnh đã duyệt. Được dùng mọi màu, kể cả đỏ, hồng, vàng.

Nộp bảng theo mẫu (Claude dùng để tô cánh bằng mã):

| Bậc | Giáp chủ | Đèn / LED | Lông: gốc → giữa → ngọn | Lưỡi plasma |
|---|---|---|---|---|
| tim | đỏ | vàng kim | trắng vàng → cam → cam đỏ | lam |
| … | | | | |

## 4. Nộp
Một zip `V231E_TAU8_DU_BAC.zip`:
- 10 PNG thân;
- `tau8_fx_bung_tang2.png`;
- bảng màu;
- ảnh ghép 6 bậc × 2 hàng (thường / Bạo Tẩu) trên nền tối.

Nếu chạm hạn mức tạo ảnh: gửi trước 5 bản thường và bảng màu.
