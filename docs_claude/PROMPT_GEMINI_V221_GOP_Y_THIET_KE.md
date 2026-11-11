# GỬI GEMINI · V221 · Nhờ làm giám đốc mỹ thuật: soát prompt và viết mô tả thiết kế

Kèm theo là tệp `PROMPT_GPT_V221_THIET_KE.md` (prompt Claude soạn cho GPT vẽ). Chủ dự án muốn tranh **đẹp hơn, ngầu hơn, đồng bộ hơn**. Hướng đã chốt:

- Phe ta: **gọn · sắc · phát sáng**; kích thước vừa phải; hiệu ứng siêu cấp kiểu **neon LED**.
- Phe địch: **hầm hố · đồ sộ · ác mộng**.
- Mỗi chiến cơ, trang bị, hợp thể **tiến hóa và mở ra theo dáng riêng**; không mặc định chữ X.
- Luật cứng: phe ta không dùng đỏ #FF334F, hồng #F50057, vàng kim, cầu vồng; trong trận không có vòng tròn bao quanh tàu.
- GPT vẽ tranh tĩnh và mảnh rời; Claude làm chuyển động bằng mã (viền neon ôm thân, vệt LED chạy, lửa luân phiên ba dáng, sét chớp giữa các mũi cánh).

Xin bạn làm 4 việc, trả lời bằng bảng, không viết mã, không đổi số cân bằng:

## 1. Soát prompt cho GPT
Đọc `PROMPT_GPT_V221_THIET_KE.md` và chỉ ra:
- Câu nào **mơ hồ hoặc mâu thuẫn** khiến mô hình tạo ảnh dễ làm sai. Ghi dạng: "Mục … : sửa '…' thành '…'".
- Điều gì **còn thiếu** để tranh đẹp và đồng bộ hơn (ánh sáng, độ tương phản, mật độ chi tiết, cách đặt đường LED…).
- Tối đa 12 góp ý, xếp theo mức quan trọng.

## 2. Mô tả ảnh chủ cho 13 chiến cơ
Mỗi tàu 3–4 câu ngắn, để dán thẳng làm lời tả ảnh cho GPT. Theo đúng khung:
`Dáng tổng thể · Ba khối chính · Vị trí và hình dạng các đường LED · Điểm nhấn ở giữa · Điều khiến tàu này khác 12 tàu còn lại`.
Dùng dáng, màu, kỹ năng ở bảng mục 7 của prompt. Riêng tàu 11, 12, 13 chưa có tranh mới: xin đề xuất luôn màu chủ đạo.

## 3. Ngôn ngữ thiết kế tàu địch
- Chia quái theo **các chương hiện có** của game thành 3–5 họ. Mỗi họ: hình khối chủ đạo, chất liệu, cách phát sáng đỏ – hồng, một chi tiết "ác mộng" đặc trưng.
- Mỗi boss hiện có: một câu tả hình dáng và một câu tả điều khiến người chơi thấy bị áp đảo.
- Tương quan cỡ so với chiến cơ phe ta (quái thường, tinh anh, boss).

## 4. Trang bị và hợp thể theo chất neon
- 13 bộ trang bị: mỗi bộ một dòng gồm hình khối chủ đạo, màu đèn, kiểu đường LED, cách món đó "mở ra" khi lên siêu cấp (theo dáng riêng, không chữ X).
- Hợp thể: quy tắc ngắn gọn để nhìn vào là thấy đặc trưng của **cả hai** tàu thành phần; cho 2 ví dụ cụ thể.

Claude sẽ gộp câu trả lời của bạn vào prompt bản tiếp theo cho GPT.
