# Ghi chú màu sắc + hiệu ứng trận của game gốc (16/11/2026) — chỉ học phong cách, KHÔNG chép hình/chữ

Nguồn: video chủ dự án gửi 87742 (nền hẻm núi băng xanh), 87741 (cùng chủ đề + boss), 87934 (nền dung nham). 87969/87970/87934_1 trùng từng byte với 87742/87741/87934. Khung hình KHÔNG lưu vào repo.
Cách đo: lấy 1 khung / 5 s (27 + 9 + 25 khung), bỏ 10% trên/dưới (HUD). Số đo gồm cả đạn/hiệu ứng nên KHÔNG phải nền thuần.

## Độ sáng và độ bão hòa (đo)
| | p10 | p50 (trung vị) | p90 | bão hòa trung vị |
|---|---|---|---|---|
| Game gốc · hẻm núi xanh (87742) | 25 | 58 | 165 | 0,73 |
| Game gốc · dung nham (87934) | 15 | 40 | 147 | 0,51 |
| Nền chương 1 của ta · GPT nguyên bản (ghép 3 lớp) | 10 | 14 | 65 | 0,96 |
| Nền chương 1 của ta · bản sáng thử | 39 | 54 | 114 | 0,85 |
=> Nền ta tối hơn game gốc khoảng 3–4 lần ở trung vị (14 so với 40–58). Bản sáng thử đã gần trung vị nhưng vùng tối sâu (p10) quá cao (39 so với 15–25) và vùng sáng (p90) thấp hơn → nhìn "phẳng". Game gốc có TƯƠNG PHẢN: mảng tối sâu xen mảng địa hình sáng.

## Màu chủ đạo nền (lượng tử hóa, ước lượng)
- Hẻm núi xanh: xanh đêm (16,16,48) chiếm ~32%, xanh biển thẫm (16,48,80) ~15%, điểm sáng đá xanh xám (80,112,176).
- Dung nham: đỏ nâu thẫm (48,16,16) và (80,16,16), cam (144,80,16) ~10%, tím chàm rải rác.

## Cấu trúc nền (nhìn bằng mắt)
- Nền có KẾT CẤU địa hình phủ cả chiều ngang (vách đá, khe, sông dung nham), không phải khoảng trống ở giữa. Tàu ở giữa vẫn nổi nhờ hiệu ứng sáng của tàu/đạn và vùng tối giữa các mảng địa hình.
- Mỗi chương có 1 gam màu riêng, độ bão hòa cao, bóng tối đen thẫm ở khe.

## Hiệu ứng (nhìn bằng mắt)
- Đạn ta: mũi tên/lông vũ xanh lam xếp quạt; chùm tia tím–hồng dày dọc giữa; lúc vào trận ngọn lửa đẩy vàng rất lớn.
- Đạn địch: giọt lệ cam–đỏ; vòng hạt tím/hồng; đường tia đỏ cam cắt chéo (boss). Đạn địch cam/đỏ vẫn nổi trên nền dung nham nhờ viền sáng.
- Nổ: bùng trắng–vàng; chữ X2 vàng; tinh thể xanh lục/lam rơi; khiên bong bóng xanh lam.
- Cảnh báo boss: dải đỏ sọc chéo + chữ V đỏ ở mép trên (đã làm tam giác đỏ V307).
- Màn kết quả: nền hành tinh xanh, 3 sao vàng, nút cam; bản đồ: nền dải ngân hà + chấm nút theo đường.

## Giới hạn
- Mỗi 5 giây một khung, nên bỏ sót hiệu ứng ngắn. Màu đạn địch trong game ta CHƯA đo.
- Số p10/p50/p90 của "nền ta" đo trên ảnh ghép tĩnh 360×780, chưa phải trận thật.
