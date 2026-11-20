NHIỆM VỤ: CÀI ĐẶT HỆ THỐNG HÌNH ẢNH, BIẾN HÌNH, ĐẠN & TUYỆT KỸ CHO 7 ROBOT SIÊU HỢP THỂ (V309)

1. QUY TẮC TÀI NGUYÊN & BỎ ROBOT_BASE (ĐÃ CHỐT)
- Dạng Chiến cơ hợp thể (mặc định trong trận): đổi hình theo 3 mốc bậc tiến hóa +0 → +10:
  • +0 đến +2: fighter_base
  • +3 đến +9: fighter_mid
  • +10 MAX: fighter_max
- Dạng Robot đứng (quay lưng hướng lên trên): BỎ robot_base. Khi kích hoạt Bạo Tẩu hoặc Tuyệt kỹ (E), biến THẲNG sang sprite `robot_max` ngay từ bậc +0.
- Phân biệt bậc cao (+6 trở lên / +10) ở dạng Robot: vẽ thêm vòng ma trận năng lượng xoay sau lưng + hạt sáng bay quanh bằng Canvas (không dùng thêm ảnh).
- Giữ nguyên thang 5 cấp vũ khí trong lượt, khóa save `saobang-robots-v1`, trần CP ~33.000.

2. HOẠT ẢNH BIẾN HÌNH & NHỊP BAY (CANVAS 2D · `lighter` BLEND)
- Kích hoạt biến hình (0,6 giây):
  • Bất tử 100% trong 0,6s, xóa sạch đạn địch trong bán kính 180px quanh tàu.
  • Vẽ vòng sóng xung kích co lại (r: 65→15px) rồi bung nổ mạnh (r: 15→160px, alpha 0.9→0) kèm 16 tia sáng chói theo màu chủ đạo của Robot.
  • Chuyển sprite từ Fighter sang `robot_max` kèm hiệu ứng nảy trục dọc `scaleY: 0.85 → 1.08 → 1.0`.
- Trạng thái Robot đứng (kéo dài 5,0s ở +0 → 8,5s ở +10):
  • Giữ nguyên hitbox nhỏ (r = 7px) tại lõi tâm ngực.
  • Tạo nhịp đập cánh/lơ lửng: `scaleX = 1 + Math.sin(t * 8) * 0.035`.
  • Phun 2 luồng hạt lửa phản lực hướng thẳng xuống dưới từ vị trí 2 gót chân.
- Thu giáp về Chiến cơ: thu nhỏ nhẹ trong 0,3s + cấp 0,5s bất tử ngắn để tránh dính đạn bất ngờ.

3. THIẾT KẾ ĐẠN & TUYỆT KỸ TOÀN MÀN HÌNH (100% PROCEDURAL CANVAS)
Dùng chế độ hòa trộn `lighter` cho toàn bộ đạn/tia; tối ưu object-pool để giữ 60 FPS.
Khi ở dạng Robot đứng: DPS tăng +45% so với dạng Chiến cơ. Khi bấm Tuyệt kỹ (E): tung Đại chiêu toàn màn hình trong 2,2 giây, xóa đạn địch chạm vào hiệu ứng.

(1) THIÊN VŨ CƠ HOÀNG (Tím hoàng gia #c026d3 · Cyan #22d3ee | Phân Giải + Xung Kích)
- Đạn Chiến cơ: Bắn chùm mũi tên quang tử mảnh xếp hình cánh cung, trúng địch tách thành 2 lông vũ nhỏ tự tìm mục tiêu.
- Đạn Robot đứng: Mưa lông vũ quang tử 6 luồng xoáy rộng + cứ mỗi 1,2s phát 1 vòng xung kích đẩy lùi/xóa đạn địch gần thân.
- Tuyệt kỹ (2,2s): Phóng 2 cột ánh sáng tím-cyan dọc 2 bên màn hình kèm bão lông vũ phân thân quét kín toàn khung.

(2) HẮC TINH ĐỘT KÍCH (Đỏ cam #f97316 · Cyan #06b6d4 | Thiêu Đốt + Phân Giải)
- Đạn Chiến cơ: 2 luồng đạn nhiệt hạch đỏ-cam song song từ 2 mũi càng + tia sét dữ liệu cyan nối giữa 2 luồng.
- Đạn Robot đứng: Bắn nón tia nhiệt đỏ-cam mở rộng lên trên, mục tiêu bị thiêu đốt khi nổ sẽ văng 4 mảnh đạn cyan lan sang địch xung quanh.
- Tuyệt kỹ (2,2s): Bùng nổ nón năng lượng nhiệt hạch khổng lồ phủ 80% bề ngang màn hình kèm lưới mã hóa cyan chạy dọc.

(3) THÁI DƯƠNG CHIẾN THẦN (Vàng kim #facc15 · Đỏ thẫm #ef4444 | Quân Đoàn + Thiêu Đốt)
- Đạn Chiến cơ: 3 cột lửa mặt trời dày ở tâm + 2 ụ pháo phụ bắn đạn cầu lửa thiêu đốt.
- Đạn Robot đứng: Triệu hồi 4 vệ tinh mini bay 2 bên tự khóa mục tiêu bắn liên thanh, chính giữa bắn cột plasma mặt trời cỡ lớn.
- Tuyệt kỹ (2,2s): Bùng nổ hào quang chữ X lửa vàng-đỏ khổng lồ cắt chéo toàn màn hình, gây sát thương liên tục theo tick 0,15s.

(4) TINH VÂN PHÁN QUAN (Xanh lam #3b82f6 · Tím #a855f7 · Trắng | Hàn Băng + Quân Đoàn)
- Đạn Chiến cơ: Đạn tinh thể hình thoi xanh-bạc bắn theo đội hình chữ X + 2 drone hộ tống bắn tia laser mảnh.
- Đạn Robot đứng: 6 drone vệ tinh xoay quanh tạo lưới tia khóa mục tiêu, đạn chính gây hiệu ứng làm chậm 35% tốc độ địch.
- Tuyệt kỹ (2,2s): Nền tối nhẹ sang sắc không gian tím, giáng 5 cột băng pha lê khổng lồ kèm tia sét từ đỉnh màn hình xuống.

(5) HÀN PHONG KỴ SĨ (Xanh băng #38bdf8 · Trắng #f8fafc | Trảm Kích + Hàn Băng)
- Đạn Chiến cơ: 4 luồng phi tiêu băng sắc nhọn bay cực nhanh theo hàng dọc.
- Đạn Robot đứng: 2 đại kiếm băng bay 2 bên liên tục phóng các nhát chém trăng khuyết xanh băng cỡ lớn xuyên qua nhiều mục tiêu, đóng băng địch 1,5s (+20% chí mạng).
- Tuyệt kỹ (2,2s): Tung liên hoàn 3 nhát đại trảm chữ thập băng giá quét toàn màn hình, để lại mảnh băng vỡ lấp lánh.

(6) XÍCH DIỄM LONG THƯƠNG (Đỏ rực #dc2626 · Vàng #fbbf24 | Xuyên Phá + Tán Xạ)
- Đạn Chiến cơ: 1 mũi thương laser đỏ-vàng xuyên thẳng hàng dọc ở tâm + 4 tia đạn lửa tán xạ 2 cánh.
- Đạn Robot đứng: Quạt đạn lửa rồng tán xạ 120° dày đặc kết hợp chùm thương xuyên giáp cực mạnh ở trục giữa.
- Tuyệt kỹ (2,2s): Phóng 1 cột đại thương hỏa long khổng lồ xuyên thẳng từ lõi Robot lên đỉnh màn hình kèm sóng lửa lan rộng sang 2 bên.

(7) TỬ DIỆU QUANG HOÀNG (Vàng kim #eab308 · Tím #9333ea | Tán Xạ + Trảm Kích)
- Đạn Chiến cơ: Chùm tia lăng kính tím-vàng tán xạ 7 nhánh lấp lánh.
- Đạn Robot đứng: Bắn ma trận 9 tia laser lăng kính + 2 lưỡi liềm vàng khổng lồ chém vòng cung quét sạch 2 bên sườn màn hình.
- Tuyệt kỹ (2,2s): 2 đại lưỡi liềm ánh sáng vàng khổng lồ quét chéo từ 2 mép màn hình vào tâm, kích nổ chùm cầu vồng lăng kính toàn khung.

4. YÊU CẦU NGHIỆM THU
- Cài đặt xong kiểm tra không lỗi console, không tụt FPS dưới 55 khi bật Bạo Tẩu + Tuyệt kỹ cùng lúc trong màn Vô tận.
- Áp dụng luôn vòng lặp xem trước 4 pha (Chiến cơ bắn thử 3,5s → Biến hình 0,6s → Robot MAX bung cánh + Tuyệt kỹ 4,5s → Thu giáp) vào sân khấu Đồ giám Robot.