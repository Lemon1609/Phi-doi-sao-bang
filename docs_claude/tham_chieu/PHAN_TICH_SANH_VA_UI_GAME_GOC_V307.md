# Phân tích sảnh và giao diện game gốc (video 87965.mp4, 17/11/2026)
Chỉ ghi nguyên tắc bố cục / cách làm để học. KHÔNG sao chép hình, biểu tượng, khung, chữ của game gốc. Không lưu khung hình vào repo.
Video 6,5 phút, 49 khung mẫu xem bằng mắt (không đo số).

## 1. Sảnh
- Cả màn là sân khấu cho chiếc tàu to ở giữa (chiếm ~45 % chiều cao), nền tối có cột sáng đạn bắn lên; tên tàu + lực chiến + % điểm viết nhỏ ngay dưới tàu.
- Thanh trên CỐ ĐỊNH ở mọi màn: 1 hàng tiền (3 loại) + 1 hàng 5 biểu tượng tab nhỏ đều nhau (có chấm đỏ) + 1 nút vàng nổi bật bên phải (Tìm báu).
- Hai cột biểu tượng nhỏ hai bên (4 bên trái, 3–4 bên phải: sự kiện, quà, điểm danh, diễn đàn): chỉ icon + chữ 1 từ, chấm đỏ góc.
- Dải thông tin người chơi (huy hiệu, tên, đội) là 1 hàng mỏng sát đáy; không có đoạn văn.
- Đáy sảnh là "bàn điều khiển kim loại": 2 nút nhỏ (Phi công, Kho) + 2 nút lớn bằng nhau (Vô tận màu cam / Chiến dịch màu vàng). Chỉ có HAI hành động chính.
- Áp dụng cho ta: giữ tàu lớn là trung tâm; gom mọi nút phụ vào 2 cột icon nhỏ; chỉ 2 nút lớn ở đáy; bỏ chữ giải thích trên sảnh.

## 2. Khung chung các màn con
Thanh trên giữ nguyên, tiêu đề nhỏ ở giữa khung, nút "Giải thích (?)" nhỏ bên phải, tab con ở đáy, nút "Quay lại" xanh dương cố định góc dưới phải. Người chơi luôn biết mình ở đâu và thoát bằng một chỗ cố định.
- Áp dụng: một mẫu khung duy nhất (tiêu đề giữa, ? phải, quay lại phải dưới); mọi đoạn giải thích dài chuyển vào hộp thoại "?".

## 3. Các màn quà / thưởng
- Điểm danh: băng tranh nhân vật ở trên, lưới 4 + 3 ô NHỎ ngang hàng (ô cuối to hơn), ô chỉ có icon + số, nút nhận vàng ở đáy. Ô đã nhận có dấu tick xanh.
- Mùa / lệnh bài: bảng có đường mốc dọc ở giữa (số mốc trên vòng tròn), hai cột thưởng hai bên (thường / cao cấp), ô vuông viền theo hạng, tick xanh khi đã nhận, nút "Nhận một lần" ở đáy. Một trục dọc, không văn bản dài.
- Danh sách nhiệm vụ: mỗi dòng 1 icon + 1 câu ngắn + thanh tiến độ + nút nhỏ; tab dưới (Hằng ngày, Nhiệm vụ, Thành tựu, Hoạt động).
- Áp dụng: Mùa giải dùng trục mốc dọc + 2 cột ô; điểm danh dùng ô vuông nhỏ (đã thử), bỏ văn bản "nhận XP thế nào" khỏi màn chính.

## 4. Cửa hàng / tìm báu / vòng quay
Hai thẻ rương lớn (thường / cao cấp) mỗi thẻ 1 nút giá; vòng quay 12 ô quanh nút giữa; cửa hàng gồm hàng "miễn phí" nhỏ trên và 3 gói tiền to dưới (giá tăng dần, gói to bắt mắt hơn). Mỗi màn 1–2 nhóm lớn.

## 5. Nâng cấp / trang bị
- Màn nâng: HAI thẻ (trước | sau) có mũi tên xanh giữa các chỉ số, một dải ô vật liệu bên dưới, một nút cam to "Nâng cấp".
- Kho: lưới ô vuông viền theo hạng, sao nhỏ phía trên; bấm vào mở hộp thoại chi tiết có ảnh + chỉ số + mô tả 2–3 dòng.
- Skin: tranh lớn gần full màn + tên + một hàng thẻ nhỏ chọn skin + nút xanh lá "Dùng" / nút cam "Đổi".

## 6. Phi công
Hàng 3 chân dung nhỏ trên cùng (ô khóa hiển thị mờ), chân dung bán thân lớn ở giữa có bảng kỹ năng nằm chồng trên mép tranh, chỉ số 2 cột, nút "Mở khóa" (xanh lá) / "Huấn luyện" (cam) ở đáy.

## 7. Bản đồ chiến dịch
Nền sao, đường nối các nút ải (ải đã qua, ải boss có đầu lâu), tên chương ở giữa; nút "Quét nhanh" góc trái, tab Boss / Sự kiện dưới; bấm ải mở hộp thoại nhỏ (ảnh địch, lực chiến, tiêu hao thể lực, rơi đồ, nút Xuất kích vàng).

## 8. Xếp hạng
Danh sách dòng cao: hạng (huy chương top 3 / số), avatar, tên, điểm lớn; tab Bạn bè | Thế giới.

## 9. Nguyên tắc rút ra (áp dụng toàn game)
1. Một màn = một việc chính; chữ dài vào hộp thoại "?".
2. Màu hạng nhất quán trên mọi khung ô; ô nhỏ cùng cỡ.
3. Một nút hành động chính to (cam / vàng); phụ xanh dương nhỏ.
4. Thanh trên + nút quay lại cố định.
5. Dữ liệu dạng số + icon, không đoạn văn.
6. Chấm đỏ chỉ cho việc nhận được ngay.

## 10. Bổ sung 17/11 (xem lại khung độ phân giải cao: nâng cấp trang bị, kho, bản đồ, chọn đồng đội)
- Chi tiết một món trong game gốc KHÔNG có đoạn mô tả. Một dòng danh sách chỉ gồm: ảnh + sao, tên, "Lv x/y", 2 chỉ số (Công, % cộng điểm), 1 từ "đặc tính", ô chọn. Mô tả dài chỉ có ở hộp thoại riêng khi bấm vào ảnh.
- Màn nâng cấp: ô trung tâm lớn đặt món + hàng 5 ô vật liệu + dòng "tiêu hao" + MỘT nút vàng "Nâng cấp"; nút phụ (Tiến cấp, Quay lại) xanh nhỏ nằm hai góc đáy. Màn tiến cấp: hai thẻ trước | sau, mỗi thẻ ảnh + tên + sao; dưới là bảng "chỉ số hiện tại → sau" từng dòng, số sau màu xanh lá.
- Chọn món từ túi: popup danh sách dòng cao 1 dòng, thanh cuộn, tab loại ở đáy popup.
- Bản đồ: chỉ nút số ải tròn, sao dưới nút, đường chấm; chương ghi chữ lớn mờ ở nền; không văn bản.
- Chọn đồng đội: dòng cao có avatar, tên, "+% điểm" số to màu xanh lá/vàng, lực chiến; một nút "Xuất kích" vàng.
- Quy tắc chung: số lớn + icon thay câu; tối đa 3 mức chữ (tiêu đề, giá trị, nhãn nhỏ); mọi ô có cùng cỡ và cùng khoảng cách.

## 11. Cơ chế nâng cấp / tiến cấp trang bị (video 88040.mp4, 93 s, xem 31 khung, nhìn bằng mắt)
Chỉ học nguyên lý; không chép số, hình, chữ.
- **Nâng cấp (cấp Lv):** chọn món từ popup túi (dòng: ảnh, tên, Lv, chỉ số, ô chọn). Giữa màn: thẻ món lớn + sao. Dưới thẻ: bảng 3 dòng chỉ số "hiện tại → sau" (số sau màu xanh lá). Thanh kinh nghiệm + dòng "kinh nghiệm nhận được" cập nhật ngay khi chọn vật liệu. Hàng 5 ô vật liệu (là các trang bị khác bị tiêu hao) + nút "tự chọn". Dòng tiêu hao tiền ở góc. MỘT nút vàng "Nâng cấp".
- **Cảnh báo trước khi lãng phí:** nếu kinh nghiệm vượt cấp tối đa, hiện popup "dư X kinh nghiệm, không hoàn lại, tiếp tục?" có nút Hủy / Tiếp tục và ô "hôm nay không nhắc nữa".
- **Tiến cấp (mở trần Lv):** hai thẻ trước | sau (+1 → +2), mũi tên sáng giữa hai thẻ; cùng kiểu bảng chỉ số "→"; trần Lv tăng theo cấp tiến (50 → 55 → 60). Vật liệu tiến cấp là bản cùng loại (nhận từ hợp thành).
- **Kho:** popup danh sách theo tab loại; hàng nút đáy popup: tiến nhanh / hợp thành / bán. Mỗi dòng có chữ rất ít.
- **Áp dụng cho ta (đề xuất, chưa làm):** (1) bảng "trước → sau" cho nâng cấp; (2) popup cảnh báo khi nâng quá trần hoặc phí lãng phí; (3) nút "tự chọn vật liệu"; (4) màn tiến cấp dạng hai thẻ + mũi tên; (5) cân bằng ta giữ nguyên (đá + hợp kim), không thêm nguồn kim cương.
