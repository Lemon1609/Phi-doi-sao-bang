# PHẦN E · SỬA ĐỘ NÉT TRANH SSS (gửi kèm `SOI_NET_SSS.png`)

Cảm ơn bạn đã gửi 3 gói E1–E3 (bản dở). Dáng và màu nhìn chung đúng đề, nhưng **tranh bị mờ và vỡ nét**, nên chưa đưa vào game được.

## Claude đo được gì
1. **Phóng 100% thấy nhòe, bệt màu như vẽ sáp.** Chi tiết nhỏ (vân kim loại, tia lửa, hạt lấp lánh, hoa văn vàng) bị nhòe thành mảng. Nguyên nhân: mỗi bảng nhồi 3 dạng × rất nhiều chi tiết, trong khi công cụ tạo ảnh chỉ có độ phân giải giới hạn, rồi bị phóng lên 2172 px. Tranh Phần J cùng cỡ ảnh nhưng ít chi tiết vụn hơn nên sắc hơn (đo bằng cách thu nhỏ rồi phóng lại: sai lệch của SSS gấp khoảng 2–3 lần tranh Bộ 11).
2. **Thu về cỡ trong game (96–128 px) thì nhiễu**: quá nhiều gai và vụn sáng nhỏ nên mắt không bắt được khối chính, và 2 món mẹ khó nhận ra.
3. **Quanh hình có quầng khói xám nửa trong suốt** (lỗi tách nền), nên mép bẩn khi đặt lên nền tối.
4. **Dạng 3 của nhiều món cùng một kiểu** (vàng + tím + gai tỏa), nên các món na ná nhau.

## Cách vẽ lại (áp cho mọi tệp còn lại và các icon đã giao)
1. **Mỗi dạng icon một ảnh riêng, khung vuông 1024×1024**, đặt tên `icon1.png`, `icon2.png`, `icon3.png`. Không ghép 3 dạng vào 1 bảng nữa. Hình chiếm khoảng 80% khung, căn giữa.
2. **Khối to, ít chi tiết vụn:**
   - tối đa khoảng 5–7 khối lớn;
   - viền tối rõ quanh từng khối;
   - mặt kim loại chuyển sáng tối mượt;
   - **không** rắc hạt lấp lánh, vân nhiễu hay tia li ti.
3. **Thử thu nhỏ trước khi gửi:** ở 96 px vẫn phải nhận ra **cả 2 bộ phận của 2 món mẹ** (xem `SSS_ME_24.png`). Ở 96 px không thấy được thì bỏ chi tiết đó.
4. **Tách nền sạch:** mép rõ, không quầng khói xám, không nền tối nửa trong suốt. Muốn có quầng sáng thì để quầng màu sáng mảnh, sát hình.
5. **Mỗi món giữ màu chủ đạo của mình** (cột Màu trong đề). Vàng kim chỉ làm viền, không phủ cả thân. Dạng 3 thêm khối hoặc cánh **theo dáng món mẹ**, không dùng chung một kiểu "gai tỏa vàng tím".
6. **Dải hiệu ứng** (projectile, impact, tuyet_ky):
   - mỗi khung là một hình đơn giản, đọc rõ ở 64 px;
   - lõi sáng + 1–2 lớp màu;
   - không xơ lông vũ, không nhòe khói;
   - mỗi tệp chỉ 1 hàng khung, khung cách nhau ≥ 40 px.

## Thứ tự giao (để không chạm hạn mức giữa chừng)
- Mỗi lượt chỉ 1 món, gồm đủ tệp của món đó, gói `SSS_<mã>.zip`.
- Làm trước **3 món mẫu**: `sss_aegis_mirror` (giáp), `sss_inferno_cryo` (tên lửa), `sss_rail_disc` (vũ khí phụ). Claude duyệt độ nét xong mới làm 21 món còn lại.
- Giữ các quy tắc cũ: nền trong suốt, không chữ hay số, không vòng tròn khép kín trong hiệu ứng trận, nội dung mức game mobile phổ thông.
