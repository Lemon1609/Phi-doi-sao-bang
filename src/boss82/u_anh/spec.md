# Trinh Sát Hạm U Ảnh — ải 20

Ba pha768×768, chân dung256×256, PNG nền trong suốt, không chữ. Mũi hướng xuống. Chân dung được thu trực tiếp từ pha 1. Màu nhấn #5ab8ff; chủ đề Wraith · tiền tiêu, trinh sát.

## Pha và cơ chế

- Pha 1: quạt 5 tia + laser báo trước
- Pha 2: xoắn ốc có khe
- Pha 3: thả 2 drone hộ vệ + vòng đạn 18 viên

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
| wing_left | 204 | 554 |
| wing_right | 563 | 554 |
| fan_1 | 331 | 463 |
| fan_2 | 354 | 477 |
| fan_3 | 383.5 | 486 |
| fan_4 | 413 | 477 |
| fan_5 | 436 | 463 |
| laser_socket | 383.5 | 543 |
| spiral_ring_origin | 383.5 | 315 |
| drone_left | 241 | 443 |
| drone_right | 526 | 443 |

## Kiểm tra và sử dụng

Giải nén rồi mở preview.html offline. Chọn pha, bật/tắt dấu emitter và mốc thân; xem thêm chân dung. Không cần mạng hoặc build. Mỗi PNG≤600.000 byte; nền ngoài trong suốt, góc alpha 0, ảnh RGBA. Có kiểm tra kích thước, alpha, lề, mốc thân vàCRC trong gói. Chưa chạy trên HTML game hoặc trình duyệt thiết bị; cần kiểm tra đổi pha và đạn sau khi Claude ghép.

Ảnh được tạo bằng imagegen tích hợp, pha 2/3 chỉnh từ pha 1 để giữ hình. Chỉ crop alpha, scale đều, dịch chuyển và nén PNG trong bước chuẩn hóa. Không có bộ phận vẽ thay bằng code.
