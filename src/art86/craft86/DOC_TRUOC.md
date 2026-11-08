# Phi Đội Sao Băng · Đồ họa V86

Đã hoàn thành **26 PNG** theo PROMPT_GPT_V86.md.

| Thư mục | Số ảnh | Quy cách |
|---|---:|---|
| craft86/sss11_huyettinh | 2 | Huyết Tinh Thôn Phệ Giả, thường + Bạo Tẩu, 500×500 |
| craft86/sss12_vinhhang | 2 | Vĩnh Hằng Thời Không, thường + Bạo Tẩu, 500×500 |
| craft86/sss13_chanthan | 2 | Chân Thần Hư Không, thường + Bạo Tẩu, 500×500 |
| ebullet86 | 20 | 4 kiểu đạn × 5 màu, 64×64 |

## Căn tâm chiến cơ

- Mũi hướng lên. Pivot chung `(249.5,249.5)`, tương đương tọa độ chuẩn hóa `(0.5,0.5)`.
- Mũi thân chính ở `(249.5,49.5)`, đuôi thân chính `(249.5,449.5)`; chiều dài đăng ký 400 px, cùng chuẩn skin V85.
- Huyết Tinh có mũi hai hàm kẹp: tọa độ mũi là trạm ngang tại đầu hai hàm, giữa hai đầu có thể trống. Lửa xoắn kép phía đuôi là hiệu ứng ngoài thân.
- Bản Bạo Tẩu mở giáp/hàm và thêm cánh năng lượng, vòng thời gian hoặc cổng không gian. Căn theo thân chính; phạm vi hiệu ứng có thể lớn hơn thân.
- Mỗi thư mục chiến cơ có `registration.json`, gồm tâm, mốc mũi/đuôi, bbox alpha và dữ liệu căn từ ảnh gốc. `xem_truoc/sss_can_tam.jpg` kẻ trục và ba trạm y=49.5/249.5/449.5 để đối chiếu.

## Đạn địch

| Mã màu | Chương | Màu |
|---|---:|---|
| wraith | 1 | Xanh ma trắng |
| titan | 2 | Thép cam |
| ion | 3 | Vàng điện |
| nebula | 4 | Tím hồng tinh vân |
| frost | 5 | Băng xanh trắng |

Mỗi màu gồm `orb`, `orb_big`, `needle`, `shard`. Tên tệp `ebullet_<kiểu>_<màu>.png`. Pivot/lõi sáng `(31.5,31.5)`; kim và mảnh tinh thể hướng lên. Kích thước khung 64×64, cỡ hình và quầng sáng theo bộ đạn V85 đã duyệt; orb nhỏ, orb_big lớn có vòng.

## Duyệt và kiểm tra

- `xem_truoc/sss_thuong_bao_tau.jpg`: mỗi hàng một chiến cơ, thường bên trái và Bạo Tẩu bên phải.
- `xem_truoc/dan_dich_chuong_1_5.jpg`: mỗi hàng một bảng màu, cột orb/orb_big/needle/shard, hiển thị ở cỡ PNG gốc.
- `manifest.json` liệt kê đủ 26 tệp, kích thước, pivot, SHA256, ánh xạ chương/màu và danh sách còn thiếu (rỗng).
- `validation.json` ghi kết quả kiểm tra số lượng, kích thước, alpha, viền khung, các mốc thân và tâm sáng đạn.
- `generation_prompts.json` lưu bộ prompt và lần làm rõ lõi con mắt và lõi mặt trời của Chân Thần. Tranh tạo bằng công cụ tạo ảnh tích hợp, sau đó chuẩn hóa kích thước và đăng ký tâm để xuất PNG.

Gói bàn giao đồ họa để Claude ghép và chụp duyệt trong game.
