# GỬI GPT · V220 · Bung và tiến hóa theo dáng riêng của từng tàu

Sáu bản Bạo Tẩu đợt vừa rồi (tàu 8 × 5, tàu 6 bậc tím) đã vào game V219 và đạt về mức bung. Nhưng chủ dự án góp ý:

> Tùy theo hình dạng của từng chiến cơ, trang bị, hợp thể mà bậc tiến hóa sẽ khác. Không cần thiết lên siêu cấp là bung thành chữ X.

Lỗi do lời dặn lần trước ("bung theo chiều dọc và chéo") quá chung, dẫn tới mọi bản đều thành chữ X và phình to. Từ nay áp ba quy tắc:

1. **Kiểu bung hợp với dáng và kỹ năng của chính tàu đó.** Không dùng chung một kiểu cho nhiều tàu.
2. **Sáu bậc của một tàu dùng cùng một kiểu bung**, bậc cao bung mạnh hơn. (Hiện tàu 6 bậc tím bung chữ X trong khi năm bậc kia xòe lông vũ; tàu 8 bậc thường nới ngang trong khi năm bậc kia chữ X.)
3. **Bung vừa phải, không phình to**: diện tích **1,25–1,5 lần bản thường** (sáu bản chữ X vừa rồi là 1,6–1,8 lần, quá to), hướng nào cũng được, lề ≥ 28 px. Vẫn dựng trên chính tranh bản thường để thân lõi trùng khít.

## Gợi ý kiểu bung cho 13 tàu (được đề xuất khác nếu hợp dáng hơn)

| Tàu · kỹ năng | Dáng | Kiểu bung khi Bạo Tẩu | Cách lớn dần qua 6 bậc |
|---|---|---|---|
| 1 · Thiêu Đốt | Chim ưng | Cánh ưng xòe rộng sang ngang, lông đuôi tỏa về sau | Thêm tầng lông cánh |
| 2 · Laser | Thon, có ray | Hai thanh ray trượt ra phía trước, song song | Ray dài và nhiều đoạn hơn |
| 3 · Đóng Băng | Tinh thể | Gai băng mọc chéo xuống hai bên | Thêm cụm gai, gai lớn dần |
| 4 · Xuyên Thấu | Mũi khoan | Mũi khoan vươn dài về trước, lưỡi phụ dựng lên sát thân | Mũi dài và nhọn dần |
| 5 · Tán Xạ | Rẻ quạt | Nan quạt xòe ngang | 2 → 3 → 5 nan |
| 6 · Laser | Lông vũ | Lông vũ xòe xuống và ra sau như đuôi công | Thêm lớp lông, lông dài dần |
| 7 · Trảm Kích | Lưỡi đao | Hai lưỡi đao bật chéo về trước như kéo mở (tàu này hợp dáng chéo) | Lưỡi dài, thêm lưỡi phụ |
| 8 · Thiêu Đốt | Pháo hạm | Pháo trượt vươn lên trước, giáp vai mở sang ngang, tấm tản nhiệt bật ra sau | 2 pháo → 4 pháo, giáp vai dày dần |
| 9 · Song Vũ | Cánh đôi | Tách thành hai phân cánh hai bên (đã đúng) | Phân cánh lớn và xa dần |
| 10 · Quân Đoàn | Tàu mẹ | Mở khoang, đội hình tên lửa và máy bay con tách quanh thân (đã đúng) | Thêm khoang, thêm đội hình |
| 11 · Thôn Tinh | Càng cua | Hai càng cong khép vào trong như cung khuyết | Càng dày và dài dần |
| 12 · Thời Không | Mảnh ghép | Các mảnh thân tách rời, lơ lửng lệch nhau quanh lõi | Thêm mảnh |
| 13 · Hư Không | Vương miện | Gai vương miện mở lên phía trước, thân nứt hở lõi | Thêm gai, khe nứt rộng dần |

## Thêm ba tiêu chí của chủ dự án (11/11)

- **Phe ta gọn, kích thước vừa phải, không quá to** (chiến cơ, trang bị, hợp thể đồng minh).
- **Hiệu ứng siêu cấp kiểu NEON LED**: ống sáng mảnh, nét đều, lõi rực, quầng mờ quanh nét; chạy theo cạnh thân, cạnh cánh, khe năng lượng như dải đèn LED. Bộ mảnh rời (lửa, sét, ánh sáng sau lưng, hạt) vẽ theo chất này: nét mảnh phát sáng, không phải mảng màu đặc. Hai bộ mẫu tàu 9 và tàu 10 đã gần đúng chất này; tàu 10 (khung chữ H nét ống) là mẫu tốt nhất.
- **Tàu địch: hầm hố, đồ sộ, ác mộng.** To, nặng, giáp dày sẫm, gai, càng, hàm, sinh – cơ ghép; đèn đỏ #FF334F / hồng #F50057.

## Ánh sáng sau lưng (`tauN_fx_sang.png`): chọn theo từng loại, không mặc định chữ X

Chủ dự án duyệt bộ mảnh tàu 7 trong game và góp ý: ánh sáng hai lưỡi đao bắt chéo **quá to và lại là chữ X**; "cánh sẽ lựa theo tùy loại chiến cơ, trang bị, hợp thể. Không phải cánh nào cũng chữ X".

- Hình ánh sáng sau lưng phải **nối dài chính dáng cánh của tàu đó**: tàu có cánh lưỡi liềm thì ánh sáng là hai lưỡi liềm; tàu lông vũ thì là lớp lông sáng; tàu pháo hạm thì là khung phản lực; tàu mẹ thì là khung chiến thuật.
- **Không dùng chữ X** trừ khi thân tàu vốn có dáng đó.
- Gọn: game vẽ ánh sáng rộng tối đa 1,35 lần sải cánh. Nét chính nên nằm ở **hai bên và phía sau** thân, đừng dồn vào giữa (phần giữa bị thân tàu che).
- Bộ mảnh tàu 7: lửa, sét, hạt **đạt và đã dùng**. Riêng `tau7_fx_sang.png` vẽ lại: hai lưỡi liềm sáng ôm hai bên thân, cong cùng chiều với cánh lưỡi liềm của tàu 7.

## Việc cần làm

1. **Tàu 8**: vẽ lại 5 bản `_bt` (lục, lam, tím, tím+, SS) theo kiểu pháo hạm ở bảng trên, cùng kiểu với bản `thuong_bt`, **bung vừa phải (1,25–1,5 lần)**. Giữ ý tách rõ 4 pháo ở bậc cao.
2. **Tàu 6**: vẽ lại `tau6_tim_bt.png` theo kiểu lông vũ như năm bậc còn lại.
3. **Bộ 88 mảnh hiệu ứng** cho 11 tàu còn lại: làm theo chất neon LED ở trên, đặc trưng từng tàu theo bảng đã gửi (tài liệu V218 mục 3).
4. **Ảnh ý tưởng tàu địch** (chỉ để duyệt phong cách, chưa cần đúng khổ tệp game): một tấm gồm 1 quái thường, 1 quái tinh anh, 1 boss, vẽ cạnh một chiến cơ phe ta để thấy tương quan cỡ và tính cách.
5. **Tàu 7**: vẽ lại `tau7_fx_sang.png` (xem mục ánh sáng sau lưng), và vẽ 6 bản thân Bạo Tẩu sạch (`tau7_*_bt.png`): hiện là khối cầu plasma che mất thân.
6. Áp các quy tắc này cho mọi tàu, trang bị, hợp thể về sau.
