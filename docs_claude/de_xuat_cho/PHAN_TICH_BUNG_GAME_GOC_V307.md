# Phân tích Bạo Tẩu (bung) của game gốc — V307
Nguồn: video 87976–87986 (màn xem tàu, 360×884), lấy 24 khung/video. Chỉ nhìn bằng mắt, chưa đo số. Học kỹ thuật, KHÔNG sao chép dáng/hiệu ứng cụ thể.

## Quy luật chung
1. Thân tàu KHÔNG đổi khi bung. Không tay máy, không khớp nối, không bộ phận cứng bung ra.
2. Bung = khối năng lượng trong mờ, cộng sáng (additive), mọc từ thân/động cơ, mép mờ, lõi trắng. Mỗi dòng tàu một HÌNH khác nhau.
3. Màu bung đổi theo bậc (vàng/lục → lam → tím/hồng → cam-vàng rực); kích thước và độ dày tăng theo bậc.
4. Đạn: giọt dài theo chùm; số giọt tăng theo bậc (3 → 5–7); màu đạn theo màu bậc, lõi trắng, đuôi mờ dài.
5. Thân tiến hóa theo bậc: to dần, thêm cánh phụ/giáp/pod, sọc màu, mũi sáng hơn.

## Các kiểu bung quan sát được
- 87976: chùm tia LED xòe chéo hai bên từ ống xả (lam → tím → cam-đỏ).
- 87977: bùng sao gai: nhiều gai nhọn tỏa quanh thân (vàng → lam → tím), bậc cao nhiều gai hơn.
- 87978: cánh gai vàng-cam rộng như cánh nhện; bậc thấp là chùm gai nhỏ xanh/vàng quanh thân.
- 87979: vòm tia xòe hình quạt/vỏ sò (lam ngọc), bậc cao thêm lớp lông cánh nhiều tầng.
- 87980: gai nhọn dài quanh thân (vàng, lục, lam, tím-hồng), chùm đạn quạt rộng phía trước.
- 87981: cánh băng pha lê: hàng lông cánh dài nhọn xòe ngang (trắng-lam), 2 tia sáng chéo phía trước.
- 87982: hai cánh năng lượng lớn dạng lưỡi liềm/lá bao hai bên thân (lam → lục-vàng → tím → vàng-cam).
- 87983: vòm bán cầu năng lượng phía trước (lục-vàng → lam ngọc → cam), đạn đỏ-cam dài.
- 87984: cột sáng khổng lồ phía trước + vòng sáng (halo) quanh thân + cánh cánh bướm hồng-tím khi bung.
- 87985: tấm tinh thể lam dạng cánh hình thoi dưới thân, nhiều cột sáng xanh phía trước.
- 87986: cánh hoa/cánh bướm lớn nhiều tầng (hồng, tím, lam) bao quanh thân.

## Hệ quả cho game
- Giữ 13 hiệu ứng bung đã duyệt (V293) làm HÌNH; điều chỉnh THEO BẬC bằng mã: màu, kích thước, mật độ gai/lông, độ sáng.
- GPT chỉ vẽ thân thường 6 bậc (đã sửa prompt). Không vẽ bung cơ khí.
- Hạn chế: độ phân giải thấp, 24 khung/video nên chưa đo chính xác tỉ lệ; chưa ghép từng video với đúng 13 tàu của game mình.

## Phân tích chi tiết theo bậc (lần 2, nhìn bằng mắt + đo độ sáng khung; video 360×884)
Chu kỳ xem tàu: thường → bung → thường → bung… ; mỗi hình thái (Lv25/30/45/…/100) có cả hai trạng thái.
Quy luật tăng theo bậc (lặp lại ở hầu hết dòng tàu):
- B1–B2 (thường/lục): bung nhỏ, ~4–6 tia hoặc gai ngắn, màu đơn (vàng, lục, lam), vùng sáng rộng ≈ 1,2–1,4 × sải cánh.
- B3 (lam): thêm lớp thứ hai (tia dài + tia ngắn), đổi sang lam/ngọc, rộng ≈ 1,6 ×.
- B4 (tím): thêm lõi trắng, mật độ gai/lông tăng gấp đôi, tím/hồng, rộng ≈ 1,8–2 ×.
- B5 (tím+): lớp thứ ba, viền sáng trắng, thêm nhiều tia nhỏ chéo; rộng ≈ 2–2,3 ×.
- B6 (SS): cam-vàng rực, hai tầng gai/cánh chồng nhau, rộng ≈ 2,3–2,5 ×, đạn đổi sang cột sáng dày.
Đạn trong màn xem: 3 giọt (B1–B2) → 5 → 7 giọt dài ở bậc cao; bung kèm đạn dày hơn, sáng hơn.
Nhóm hình bung (mẫu): (a) sao gai radial (87977, 87980), (b) cánh nhện/hoa (87978, 87986), (c) cánh băng/lông (87981, 87979), (d) vòm quạt (87979, 87983), (e) cánh lưỡi liềm (87982), (f) cột sáng + halo (87984), (g) tinh thể (87985).
Hạn chế: chọn khung tự động dính nhiều khung màn danh sách; chưa đo chính xác từng tỉ lệ; một số số liệu "rộng ≈ n × sải" là ước lượng bằng mắt.
