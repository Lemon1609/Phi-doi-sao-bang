Chào GPT, bộ 36 tranh tàu 1, 2, 3 đúng hướng và đúng chuẩn kỹ thuật (đủ tệp, 512 × 512, lề ≥ 32 px). **Tàu 3 đạt, giữ nguyên.** Nhờ bạn sửa tàu 1 và tàu 2 như sau.

## Tàu 1 · Nộ Hỏa Phượng Hoàng (sửa 2 điểm, các tranh khác giữ nguyên)

1. **Bậc `tim5` và `tim5_bt` bị vẽ nhỏ hơn các bậc khác.**
   - Claude đo: thân cao khoảng 224 px (bản Bạo Tẩu 280 px), trong khi các bậc khác khoảng 305–365 px.
   - Cần: vẽ lại `tau1_tim5.png` và `tau1_tim5_bt.png` với **thân tàu cùng kích thước và vị trí như bậc `tim`**; đặc trưng lớn hơn bậc `tim`, nhỏ hơn bậc `ss`.
2. **Đầu lông cánh ở bậc `thuong` và `luc` ngả đỏ.**
   - Đỏ dễ lẫn với đạn địch (#FF334F).
   - Cần: đổi phần đầu lông sang **cam đậm / cam cháy**, không dùng đỏ. Áp dụng cho `tau1_thuong`, `tau1_luc` và 2 bản `_bt` tương ứng.

## Tàu 2 · Cực Quang Ảo Ảnh (vẽ lại cho các bậc khác nhau rõ)

Hiện tại `thuong`, `luc`, `lam`, `tim` gần như một tranh, chỉ khác vài nét viền; 5 bản Bạo Tẩu đầu cũng gần như giống nhau. Giữ nguyên màu (ngọc lục bảo · trắng bạc · nhấn tím nhạt óng ánh), chất liệu và thân chính. **Mỗi bậc thêm một bộ phận nhìn thấy ngay**, như đã làm ở tàu #7:

| Bậc | Thân tàu | Bạo Tẩu (`_bt`) |
|---|---|---|
| `thuong` | Dáng gốc, 2 dải cực quang đuôi ngắn | Quầng cực quang nhỏ ôm sát thân |
| `luc` | Thêm **2 vây cánh nhỏ** phía trước, gân năng lượng lục sáng | Quầng lớn hơn, thêm 2 dải bay sang hai bên |
| `lam` | Thêm **cặp động cơ phụ**, dải đuôi thành 4 dải, gân lam | Dải cực quang 2 màu lục – lam |
| `tim` | Thêm **cặp cánh lụa thứ hai** phía trên, gân tím nhạt | Dải cực quang 3 màu lục – lam – tím |
| `tim5` | Cánh lụa **xòe rộng, nhiều lớp**, có hoa văn sáng | Màn cực quang rộng như rèm sáng, có hạt sao |
| `ss` | Dạng hoàn chỉnh: sừng cong (đã có), 6 dải lụa, lõi sáng nhất | Vòm cực quang nhiều màu bao quanh, rực nhất |

- Bậc cao hơn phải **nhận ra ngay khi đặt cạnh bậc thấp hơn**, kể cả khi thu nhỏ còn 64 px.
- Thân tàu giữ cùng kích thước, tâm (256, 256), lề ≥ 32 px.

## Giữ nguyên cho cả hai tàu
- Tên tệp `tau{N}_{thuong|luc|lam|tim|tim5|ss}[_bt].png`, 512 × 512, nền trong suốt.
- Thân tàu ở bản `_bt` giữ đúng kích thước và vị trí của bản thường cùng bậc.
- Không tô vàng; năng lượng không dùng đỏ #FF334F / hồng #F50057; không chép tàu, logo hay tên game gốc.

Nhờ bạn gửi lại: tàu 1 chỉ cần 6 tranh sửa (`thuong`, `luc`, `tim5` và 3 bản `_bt` của chúng), tàu 2 đủ 12 tranh.
