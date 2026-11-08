# Lôi Dực Phượng Hoàng — ải 60

Ba pha768×768, chân dung256×256, PNG nền trong suốt, không chữ. Mũi hướng xuống. Chân dung được thu trực tiếp từ pha 1. Màu nhấn #f3d48a; chủ đề Phoenix · bão điện.

## Pha và cơ chế

- Đạn đan chéo + mìn chữ thập
- Xoáy kép ngược chiều
- Mưa sét

Pha1 nguyên vẹn; pha 2 nứt giáp, lộ lõi; pha 3 bung giáp và lõi sáng mạnh. Ảnh giữ các cụm phát đạn; không dựng đạn/laser thật vào sprite. Đây là hình ảnh, chưa đổi tốc độ, sát thương hay hitbox trong game.

## Căn thân theo chuẩn17.1

`registration.json` là mảng 3 bản ghi, cùng các trường file, source_axis, source_hull_top, source_hull_bottom, uniform_scale, pivot, hull_rear, hull_prow, bbox như Phá Không. uniform_scale là hệ số đã dùng từ ảnh nguồn, không phải hệ số render trong game. Không áp lại nó lênPNG thành phẩm.

Pivot(383,5;383,5), đuôi(383,5;96), mũi(383,5;671), khoảng cách575 px ở cả 3 pha. Mỗi ảnh chỉ được scale đều và dịch chuyển theo hai mốc giữa thân; không scale riêng chiều ngang. bbox dùng tọa độ trái/trên/phải/dưới, phải/dưới không bao gồm pixel biên. Tâm độ phủ alpha có thể thay đổi theo giáp bung, không dùng làm pivot. Sai số đo lại ở dải giữa được ghi trong validation.json; chi tiết AI vẫn có biến thiên nhỏ, không khẳng định mọi tấm giáp trùng từng pixel.

Tọa độ dùng chỉ số tâm pixel: khi đưa vào canvas, cộng 0,5 để chuyển sang tọa độ cạnh. Nếu worldPivot=(X,Y), điểm phát đạn thế giới là (X+(px−383,5)×s, Y+(py−383,5)×s). Cùng s qua 3 pha. Để phần hình thực rộng240 px, dùng s=240/max(bbox_width của3 pha), không thay s theo từng pha. Nếu chỉ hiển thị toàn khung PNG240 px thì s=240/768 và phần thân nhỏ hơn240 px.

## Điểm phát đạn đề xuất từ tranh

Các điểm trong emitters.json được đo trên ảnh để ghép; chưa lấy từ code game. Dùng chung qua 3 pha nhằm giữ ổn định vị trí logic. Preview có lớp dấu để đối chiếu. Các tên nose/wing là mốc đầu mũi/cánh; origin là gốc tính mẫu xoắn hoặc vòng, không phải mọi viên đạn đã được vẽ lên thân. Chọn vị trí spawn phù hợp hướng bắn, tránh khởi tạo đạn phía trong hitbox. Không tự sửa thông số mẫu đạn.

| Điểm | x | y |
|---|---|---|
| nose | 383.5 | 671 |
| wing_left | 164 | 568 |
| wing_right | 603 | 568 |
| coil_left | 248 | 297 |
| coil_right | 519 | 297 |
| rod_left | 279 | 151 |
| rod_right | 488 | 151 |
| mine_ul | 345 | 307 |
| mine_ur | 423 | 307 |
| mine_ll | 345 | 337 |
| mine_lr | 423 | 337 |
| reactor | 383.5 | 322 |

## Kiểm tra và sử dụng

Giải nén rồi mở preview.html offline. Chọn pha, bật/tắt dấu emitter và mốc thân; xem thêm chân dung. Không cần mạng hoặc build. Mỗi PNG≤600.000 byte; nền ngoài trong suốt, góc alpha 0, ảnh RGBA. Có kiểm tra kích thước, alpha, lề, mốc thân vàCRC trong gói. Chưa chạy trên HTML game hoặc trình duyệt thiết bị; cần kiểm tra đổi pha và đạn sau khi Claude ghép.

Ảnh được tạo bằng imagegen tích hợp, pha 2/3 chỉnh từ pha 1 để giữ hình. Chỉ crop alpha, scale đều, dịch chuyển và nén PNG trong bước chuẩn hóa. Không có bộ phận vẽ thay bằng code.
