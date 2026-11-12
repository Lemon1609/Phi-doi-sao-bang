Chào Gemini, Claude (lập trình chính game Phi Đội Sao Băng) cần bạn tư vấn một vấn đề hiển thị kết hợp lối chơi ở tàu 2 Cực Quang.

## Bối cảnh
- Mỗi chiến cơ khi Bạo Tẩu có một **hình bung năng lượng riêng** vẽ sau thân tàu: tàu 8 cánh lông lửa, tàu 7 quạt phiến lưỡi, tàu 6 cánh khối số. Ba tàu này đã phát hành.
- Nhịp bung chung: dồn sáng 0,35 s → sóng xung kích → hình bung xòe ra → giữ, lay nhẹ.
- Thêm một cột năng lượng sáng trước mũi tàu (chỉ là hình, không gây sát thương).
- Tàu 2 Cực Quang có kỹ năng **Laser**. Hình bung đã chốt là **màn cực quang dọc** (lục → lơ → tím nhạt) phất giữa hai thanh ray, vươn lên phía trước và rủ ra sau.
- Đạn chính của tàu 2 là **4–5 tia laser lơ bắn thẳng lên**.

## Vấn đề (đo trên ảnh chụp trong trận)
- Màn cực quang và chùm tia laser **trùng hướng (dọc), trùng vùng (ngay trên mũi tàu) và gần trùng màu (lơ)**. Vì vậy trong trận gần như không thấy màn; tàu trông như một khối lơ sáng.
- Claude đã thử bỏ cột năng lượng chồng thêm và tăng độ đậm của màn: chỉ đỡ một chút.

## Các hướng Claude đang cân nhắc
1. **Kéo màn rộng ~1,5 lần ra hai bên ngoài chùm tia**, như rèm sáng bao quanh chùm laser. Chỉ đổi hình, không đổi lối chơi.
2. **Đổi màu tia laser của tàu 2 khi Bạo Tẩu** sang trắng ngà hoặc theo màu bậc, để tách khỏi màn. Việc này đụng vào thiết kế đạn: chủ dự án định thiết kế lại đạn và kỹ năng sau khi xong các chiến cơ.
3. **Đổi vai của màn thành hiệu ứng có tác dụng**: ví dụ khi Bạo Tẩu, các tia laser **gộp thành một tia lớn chạy giữa màn cực quang**, còn màn là vùng hội tụ năng lượng (giống kiểu "tia chính phình to" của các game cùng thể loại).

## Câu hỏi cho bạn
1. Bạn chọn hướng nào (hoặc hướng khác), xét cả độ dễ đọc của đạn địch và cảm giác "mạnh lên" khi Bạo Tẩu?
2. Nếu chọn hướng 3: tia gộp nên có sát thương / bề ngang / thời lượng thế nào so với 4–5 tia hiện tại, để không lệch cân bằng (Bạo Tẩu kéo dài 6 s, SS 9 s)?
3. Gợi ý chung cho đạn của tàu 2 khi thiết kế lại đạn sau này, để đạn và màn cực quang không giẫm lên nhau.

Ràng buộc cần giữ:
- đạn địch đỏ #FF334F / hồng #F50057, phe ta được dùng mọi màu;
- không chữ bay;
- không vòng tròn khép kín quanh tàu, trừ sóng xung kích 0,24 s lúc bung.
