# So sánh tính năng + giao diện: game gốc (video 87965) với game của mình (16/11/2026)
Chỉ ghi cách làm / bố cục / nhịp, KHÔNG chép hình, icon, chữ. Nguồn: 49 khung lấy mẫu mỗi 8 giây của video 87965 (nhìn bằng mắt, chưa đo). Cột "Game mình hiện nay" lấy từ mã nguồn và các lần chụp trước, CHƯA chụp từng màn để so cạnh nhau.
Ký hiệu hành động: [MÃ] làm được bằng mã ngay · [TRANH] cần tranh GPT/Gemini · [QUYẾT] cần chủ dự án quyết (luật đã khóa hoặc đụng kinh tế game).

## Quy luật chung của game gốc (lý do "dễ thuộc, dễ nhìn")
1. Mọi màn có cùng một khung: thanh tài nguyên trên cùng + hàng 5 tab icon + thanh nút đáy; cửa sổ con luôn là bảng navy viền kim loại xanh + nút X ở góc phải trên.
2. Màu nút theo chức năng, nhất quán: vàng–cam = hành động chính; xanh lam = phụ; xanh lục = nhận/xác nhận/trang bị; đỏ = cảnh báo/boss.
3. Mỗi màn quan trọng có MỘT tranh lớn làm điểm nhìn (nhân vật phi công, chiến cơ, hộp quà) ở nửa trên, thông tin và nút ở nửa dưới.
4. Phần thưởng luôn hiện thành ô vuông có khung màu theo bậc, kèm số lượng nhỏ ở góc, có nút "nhận" vàng hoặc dấu ✓ khi đã nhận.
5. Chấm đỏ thông báo ở mọi tab/nút có việc chưa làm.

## Bảng so sánh từng mục
| Mục | Game gốc (nhìn từ video) | Game mình hiện nay | Hành động |
|---|---|---|---|
| Quà tân thủ / hộp thưởng | Hộp thoại có ảnh banner lớn ở trên, 3 cột ngày–quà, một nút vàng lớn. (Bản gốc là gói trả tiền; mình KHÔNG làm phần nạp tiền.) | Có hộp quà/điểm danh nhưng bố cục phẳng, không có tranh banner | [MÃ]+[TRANH] làm hộp "quà tân thủ miễn phí" bằng nguồn thưởng đã có, không thêm kim cương mới; banner cần tranh |
| Điểm danh tích lũy | Nhân vật nữ lớn phía trên, dải mốc ngày (32/34/…), lưới 7 ô ngày, nút nhận ở đáy | Có điểm danh (event83/Q77), không có nhân vật nổi bật | [MÃ]: sắp lại bố cục (dải mốc + lưới 7 ô); [TRANH]: banner nhân vật |
| Nhiệm vụ hoạt động | Thanh mốc 20/40/60/80/100 + danh sách việc kèm nút "đi tới" | Đã có tương tự (Q77, 8 nhiệm vụ ngày) | [MÃ] thêm nút "đi tới" từng nhiệm vụ nếu chưa có; chỉnh khung theo bộ mới |
| Chiến lệnh (mùa) | Hai đường (thường/cao cấp), cột mốc giữa, ô thưởng hai bên, dấu ✓ | Có mùa giải S77 (một đường miễn phí + làn Tinh Anh mua bằng kim cương) | [MÃ] đổi bố cục thành hai cột đối xứng + cột cấp giữa; đã làm 25 cấp + rương vượt cấp |
| Phi công | Hàng chân dung nhỏ trên cùng; TRANH nhân vật lớn nửa trên, bảng kỹ năng nổi bên phải; bảng chỉ số cấp trước→sau (số tăng màu xanh lục); mũi tên trái/phải duyệt; nút xanh lục lớn "mở/trang bị" ở đáy | Pilot67 mở ở ải 50, giao diện hộp thoại nhỏ, ít tranh | [QUYẾT] có hạ mốc mở khóa không; [MÃ] dựng lại bố cục (tranh lớn + chỉ số trước→sau + mũi tên duyệt); [TRANH] chân dung lớn từng phi công |
| Skin chiến cơ | Tranh chiến cơ lớn có cột sáng + cánh, hàng thẻ skin ở dưới, nút xanh lục "đang dùng" | Skin69 / Trade67 (hộp nhỏ) | [MÃ] bố cục; [TRANH] nền sân khấu skin |
| Thư viện | Lưới thẻ dày, mỗi thẻ có hàng 5 sao nhỏ + khung màu theo bậc | codex77 có lưới thẻ | [MÃ] thêm hàng sao nhỏ trên mỗi thẻ, viền màu theo bậc |
| Vòng quay | Khung vòng 12 ô quanh nút giữa, đồng hồ miễn phí kế tiếp | Có vòng quay (Econ74.addSpin) | [MÃ]+[TRANH] đổi khung vòng và nút giữa |
| Kho / trang bị | Danh sách hàng ngang (icon bậc, tên, cấp, thuộc tính, ô chọn); nâng bậc: 2 thẻ trước→sau + mũi tên + bảng chỉ số xanh lục + nút đáy; ghép: ô lớn giữa + 5 ô nguyên liệu | Đã có hangar/trang bị (gear25), chưa đồng nhất kiểu nâng bậc trước→sau | [MÃ] làm màn "nâng bậc" kiểu hai thẻ + mũi tên + chỉ số tăng |
| Bản đồ | Nền dải ngân hà theo chương, thiên hà xoắn ốc, đĩa ải + 3 sao, đường nối chấm, nút Boss/Sự kiện/Quét nhanh ở đáy | Bản đồ đã có đĩa + 3 sao + đường nối; nền chưa có ngân hà theo chương | [TRANH] nền ngân hà theo chương (prompt ảnh 5 đã soạn); [MÃ] chỉnh phần đáy 3 nút |
| Thẻ ải khi chạm | Thẻ giữa màn: tiêu đề + 3 sao, sức mạnh đề nghị, thể lực, lượt còn lại, vật phẩm rơi, nút vàng "xuất kích" | Đã làm thẻ ải (card306) | Giữ; [MÃ] rà thứ tự thông tin |
| Màn kết quả | Băng 3 sao lớn, điểm số lớn, hàng 3 ô thưởng, hai nút: vàng "tiếp tục" + xanh "nhân đôi thưởng" | Đã làm 3 ô thưởng (reward306), nút nhân đôi (x2) | Giữ; chỉnh theo bộ nút mới |
| Cảnh báo boss | Dải đỏ + tên/cấp boss | bw306 + tam giác đỏ warn307 | Giữ |
| Thông báo hệ thống | Hộp "tin nhắn" kiểu hộp thoại có tab | Có hộp thông báo (nhỏ) | [MÃ] thấp ưu tiên |
| Giải đấu/thi đấu vô tận có hạng | Cúp lớn, nền sáng rực, hạng tuần | Hạng Vô Tận (v92) có khung/rank nhỏ | [MÃ]+[TRANH] đổi giao diện hạng: cúp lớn, mức hạng theo tuần |
| Màn nạp (loading) | Hình HUD xoay + một câu mẹo | Đã có mẹo xoay (6 mẹo) | Giữ |

## Chỗ KHÔNG làm theo game gốc
- Mọi gói trả tiền, nút nạp, quảng cáo (quy tắc dự án: không tiền thật, không quảng cáo).
- Không thêm nguồn kim cương mới.

## Thứ tự đề xuất (độ ảnh hưởng người chơi / độ khó)
1. Bộ nút + khung + ô thưởng theo bậc (mọi màn) → cần tranh GPT.
2. Sảnh (nền, cột nút hai bên, hai nút chế độ lớn).
3. Phi công (màn nhân vật lớn) + skin.
4. Quà thưởng/điểm danh/chiến lệnh (bố cục hai cột).
5. Bản đồ ngân hà, kho/nâng bậc, thư viện, vòng quay, hạng Vô Tận.

## Giới hạn
Mới xem một video (87965, mỗi 8 giây một khung). Các chi tiết ngắn (animation nhận quà, hiệu ứng mở rương) chưa xem kỹ. Chưa chụp từng màn của game mình để đặt cạnh.
