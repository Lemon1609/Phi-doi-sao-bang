# Thực Thể Thôn Tinh — ải sự kiện cuối tuần

Ba pha768×768, chân dung256×256, PNG nền trong suốt, không chữ. Mũi hướng xuống. Chân dung được thu trực tiếp từ pha 1. Màu nhấn #b45cff; chủ đề Khe nứt Hư Không · sinh học/kim loại đen tím.

## Pha và cơ chế

- 90 giây gây sát thương; boss không chết.
- Đổi pha ở giây 30 và 60.
- Cứ 25 giây lõi mở 6 giây; phá lõi: choáng 5 giây, nhận gấp đôi sát thương và rơi 3 Đá Năng Lượng.

Pha1 nguyên vẹn; pha 2 nứt giáp, lộ lõi; pha 3 bung giáp và lõi sáng mạnh. Ảnh giữ các cụm phát đạn; không dựng đạn/laser thật vào sprite. Đây là hình ảnh, chưa đổi tốc độ, sát thương hay hitbox trong game.

## Căn thân theo chuẩn17.1

`registration.json` là mảng 3 bản ghi, cùng các trường file, source_axis, source_hull_top, source_hull_bottom, uniform_scale, pivot, hull_rear, hull_prow, bbox như Phá Không. uniform_scale là hệ số đã dùng từ ảnh nguồn, không phải hệ số render trong game. Không áp lại nó lênPNG thành phẩm.

Boss sự kiện dùng pivot(383,5;383,5), đuôi(383,5;133,5), mũi(383,5;633,5), dài 500px để chừa chỗ cho xúc tu/quầng hút. Ba pha scale đều theo cùng hai mốc, khác bộ boss chương dài 575px. registration.json ghi tâm lõi(383,5;357,5) cho từng pha và lớp phủ.

Ba core_*.png đều 768×768, đặt chồng cùng góc và cùng scale với thân; không crop rồi tự căn giữa lại. Chỉ vẽ MỘT trạng thái lõi. Cả ba thân dùng socket tối để lõi mở/đóng/choáng đổi độc lập pha. PNG core có vùng hình khoảng104px, không phải fullboss. hull_rear/prow ở bản ghi lớp phủ là null vì đó không phải thân tàu. Các điểm phát/hiệu ứng là neo tranh đề xuất, chưa phải hitbox lõi trong code.

energy_shard128×128 hiển thị24px; hình tinh thể vỡ, không hộp buff/quả cầu đạn. event_banner768×256 hiển thị369×123; vùng chữ an toàn bên trái x=32…470,y=40…210 nguồn; tên/số/trạng thái là DOM, không có trong PNG. Tựa16/22px, mô tả 12/18px. Lịch sự kiện và mốc thời gian theo prompt, không được coi preview là triển khai game.

Tọa độ dùng chỉ số tâm pixel: khi đưa vào canvas, cộng 0,5 để chuyển sang tọa độ cạnh. Nếu worldPivot=(X,Y), điểm phát đạn thế giới là (X+(px−383,5)×s, Y+(py−383,5)×s). Cùng s qua 3 pha. Để phần hình thực rộng240 px, dùng s=240/max(bbox_width của3 pha), không thay s theo từng pha. Nếu chỉ hiển thị toàn khung PNG240 px thì s=240/768 và phần thân nhỏ hơn240 px.

## Điểm phát đạn đề xuất từ tranh

Các điểm trong emitters.json được đo trên ảnh để ghép; chưa lấy từ code game. Dùng chung qua 3 pha nhằm giữ ổn định vị trí logic. Preview có lớp dấu để đối chiếu. Các tên nose/wing là mốc đầu mũi/cánh; origin là gốc tính mẫu xoắn hoặc vòng, không phải mọi viên đạn đã được vẽ lên thân. Chọn vị trí spawn phù hợp hướng bắn, tránh khởi tạo đạn phía trong hitbox. Không tự sửa thông số mẫu đạn.

| Điểm | x | y |
|---|---|---|
| core_origin | 383.5 | 357.5 |
| nose | 383.5 | 633.5 |
| tentacle_left | 150 | 495 |
| tentacle_right | 617 | 495 |

## Kiểm tra và sử dụng

Giải nén rồi mở preview.html offline. Chọn pha, bật/tắt dấu emitter và mốc thân; xem thêm chân dung. Không cần mạng hoặc build. Mỗi PNG≤600.000 byte; nền ngoài trong suốt, góc alpha 0, ảnh RGBA. Có kiểm tra kích thước, alpha, lề, mốc thân vàCRC trong gói. Chưa chạy trên HTML game hoặc trình duyệt thiết bị; cần kiểm tra đổi pha và đạn sau khi Claude ghép.

Ảnh được tạo bằng imagegen tích hợp, pha 2/3 chỉnh từ pha 1 để giữ hình. Chỉ crop alpha, scale đều, dịch chuyển và nén PNG trong bước chuẩn hóa. Không có bộ phận vẽ thay bằng code.
