# GỬI GEMINI · V217 · Xin ý kiến thiết kế: đặc trưng hiệu ứng theo từng chiến cơ

Bối cảnh: chủ dự án thấy hiệu ứng Bạo Tẩu hiện tại lòe loẹt và đồ họa chưa đồng bộ. Hướng mới đã chốt:
- Bạo Tẩu vẫn có **lửa, sét, ánh sáng, thân và cánh bung ra**.
- GPT vẽ thân bung và vẽ lửa / sét / ánh sáng thành **mảnh rời riêng cho từng tàu**; game (Claude) làm chúng **chuyển động** bằng mã. Hiệu ứng phải mảnh, sắc, không dày.
- Phong cách chung: hiện đại, tương lai; kim loại cứng; màu 60 / 30 / 10; mỗi tàu một màu chủ đạo và một màu đèn.
- Luật cứng: phe ta không dùng đỏ #FF334F, hồng #F50057 (màu đạn địch), không vàng kim, không cầu vồng; trong trận không có vòng tròn bao quanh tàu.

Xin bạn (vai trò thiết kế) trả lời 3 việc, ngắn gọn, dạng bảng:

## 1. Bảng đặc trưng hiệu ứng cho 13 chiến cơ
Mỗi tàu một dòng: **chất lửa** (plasma, băng, lửa thép, axit, hư không…), **kiểu sét** (mảnh thẳng, phân nhánh, xoắn, hồ quang ngắn…), **hình ánh sáng sau lưng** (cánh năng lượng, tia tản, lưỡi quang…), **một mã màu đèn**. Yêu cầu: 13 tàu phải khác nhau rõ khi nhìn lướt, và khớp với kỹ năng của tàu.

Dữ kiện đã có (màu theo tranh mới, kỹ năng theo bảng hợp thể):

| Tàu | Màu hiện tại | Kỹ năng đặc trưng |
|---|---|---|
| 1 | cam lửa #FF9A3D | Thiêu Đốt |
| 2 | ngọc lục #3DE0A0 | Laser |
| 3 | lam băng #67D7FF | Đóng Băng |
| 4 | lục acid #9BE83A | Xuyên Thấu |
| 5 | lam nhạt #7FD6FF | Tán Xạ |
| 6 | tím oải hương #B9A6FF | Laser |
| 7 | tím #9C7BFF | Trảm Kích |
| 8 | cam thép, pháo plasma lam | Thiêu Đốt |
| 9 | bạc – lam biển | Song Vũ |
| 10 | lục quân, đèn lam | Quân Đoàn |
| 11, 12, 13 | chưa vẽ lại | (xin đề xuất) |

Lưu ý: tàu 3, 5, 9 đang cùng tông lam; tàu 2, 4, 10 cùng tông lục; tàu 6, 7 cùng tông tím. Xin đề xuất cách tách (đổi màu đèn, đổi chất lửa, đổi hình ánh sáng) mà không phải vẽ lại thân.

## 2. Quy tắc tăng theo bậc
6 bậc (thường → SS) dùng chung một bộ mảnh. Game nên tăng cái gì theo bậc để người chơi **thấy rõ mình mạnh lên** mà màn hình không rối: số ngọn lửa, độ dài, số tia sét, tần suất chớp, cỡ ánh sáng? Xin một bảng số gợi ý cho 6 bậc, có trần để không che đạn địch.

## 3. Trang bị
Cùng câu hỏi cho trang bị (vũ khí phụ, tên lửa, giáp): mỗi bộ trang bị nên có đặc trưng hiệu ứng gì để **đồng bộ với chiến cơ** nhưng vẫn phân biệt được bộ nào với bộ nào?

Không cần viết mã. Không đổi số cân bằng trong đợt này.
