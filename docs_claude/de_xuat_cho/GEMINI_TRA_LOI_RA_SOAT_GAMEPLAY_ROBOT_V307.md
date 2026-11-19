Dưới đây là Bản Thiết Kế & Rà Soát Toàn Diện V307 gồm 2 Hồ Sơ Kỹ Thuật Độc Lập để Claude triển khai trực tiếp vào mã nguồn mà không vi phạm bất kỳ quy tắc khóa nào (saobang-*, giữ nguyên toàn bộ 18+ loại tài nguyên, không nguồn 💎 mới, cơ chế Khiên chặn đòn V78, trần lực chiến ~33.000 CP):
 * HỒ SƠ 1: Rà Soát Toàn Diện Gameplay · Định Hướng Lối Chơi · Kế Hoạch Cập Nhật (4 Phần A · B · C · D).
 * HỒ SƠ 2: Thiết Kế Lại Toàn Diện Robot Siêu Hợp Thể Cơ Khí — Bậc, Biến Hình, Vòng Hệ Đạn, Đồ Giám & Danh Sách Tranh GPT (6 Mục A · B · C · D · E · F).
HỒ SƠ 1 · RÀ SOÁT TOÀN DIỆN GAMEPLAY & ĐỊNH HƯỚNG LỐI CHƠI (V307)
PHẦN A · CHẤM ĐIỂM HIỆN TRẠNG (THANG 1–10)
| Hạng mục | Điểm | Vấn đề chính cần xử lý | So với game gốc | Mức ưu tiên |
|---|---|---|---|---|
| 1. Trận đấu cốt lõi (Đạn, Khiên, Bạo Tẩu, FAIR76) | 8,5/10 | Đạn 13 tàu tách bạch, lưới lục giác Khiên & vòng đếm Bạo Tẩu tốt; nhưng Tàu 11 (Thôn Tinh) sát thương dao động quá mạnh, thiếu Cấp vũ khí trong lượt, và đạn boss chương sau thiếu kiểu chéo X / cung có khe. | Đạt ~85% cảm giác bắn; thiếu nhịp tăng tiến sức mạnh ngay trong 1 lượt chơi. | Cao |
| 2. Chiến dịch (200 ải) | 8,0/10 | Bản đồ 10 chương đẹp, nhưng kết thúc ải ép về sảnh gây đứt nhịp cày; đầu trận vẫn kẹt lỗi ngắt dòng thoại 1 chữ (c ở ui_tran.jpg) và kẹt lớp phủ cài đặt ở ui_ket_qua.jpg. | Tốt, cần thêm nút "Ải kế tiếp" ngay tại bảng kết quả. | Vừa |
| 3. Chế độ Vô tận | 7,0/10 | Nhịp boss mỗi 5 đợt hơi dày, thiếu chọn tăng ích sau boss (Roguelite) và tinh thể trong lượt nên các lượt chơi dài dễ bị lặp lại nhàm chán. | Kém hơn rõ rệt do thiếu vòng lặp chọn tăng ích mỗi 10 đợt. | Cao |
| 4. Chế độ Thử thách & Phó bản (Phá Vây, Tháp Boss, Sự kiện tuần) | 7,5/10 | 8 chế độ đủ icon, nhưng phần thưởng chồng chéo (cùng rơi mảnh/hợp kim), Boss cuối tuần chưa có thể thức đua sát thương 3 tàu × 30s + MVP, và Cửa Hàng bấm vào vẫn mở nhầm sang Chợ Đen. | Đa dạng chế độ nhưng chưa phân vai trò tài nguyên rõ cho từng nơi. | Cao |
| 5. Hệ thống nuôi lực chiến (12+ hệ) | 6,5/10 | Quá nhiều hệ mở chồng chéo mà thiếu lộ trình hướng dẫn; 18+ loại tài nguyên không có bảng chỉ dẫn "kiếm ở đâu – dùng ở đâu"; Robot SSS đang dùng tranh chiến giáp nữ lệch phong cách cơ khí. | Đầy đủ chiều sâu nhưng dễ làm người chơi mới bị ngợp. | Cao |
| 6. Kinh tế & Cân bằng 💎 | 8,0/10 | Không nạp tiền thật, nguồn 💎 miễn phí ổn định (~50–80 💎/ngày từ nhiệm vụ + quà); nhưng cần khóa trần CP ~33.000 và tách rõ kinh tế VKTT (Linh kiện A/B/C/D + Thẻ EXP). | Rất thân thiện người chơi cày chay. | Vừa |
| 7. Giữ chân & FTUE (30 phút đầu) | 7,0/10 | Mùa giải 21 ngày (ui_mua_giai.jpg) và Nhiệm vụ (ui_nhiem_vu.jpg) đã gọn; nhưng 30 phút đầu mở dồn dập quá nhiều tab mà thiếu nhiệm vụ dẫn dắt theo mốc ải. | Cần khóa bớt tab phụ ở 15 ải đầu và mở dần theo cột mốc. | Vừa |
PHẦN B · ĐỊNH HƯỚNG LỐI CHƠI
1. Vòng Lặp Cốt Lõi 3 Tầng (Core Loop)
 * Tầng 1 — Một trận đấu (45 giây – 4 phút):
   * Vào trận (Cấp vũ khí khởi điểm Lv.1) \rightarrow Bắn hạ quái nhặt Viên Tăng Lực (nâng cấp vũ khí trong lượt Lv.1 → Lv.13) & Tinh Thể Trong Lượt \rightarrow Sượt đạn (Graze) nạp thanh nộ kích hoạt Bạo Tẩu (biến hình sang dạng Robot đứng nếu dùng Robot hợp thể) \rightarrow Hạ Boss (mỗi 10 đợt ở Vô tận) \rightarrow Chọn 1 trong 3 Tăng Ích bằng Tinh thể/lượt chọn \rightarrow Dùng Bom / Tuyệt kỹ VKTT vượt qua cao trào đạn dày \rightarrow Nhận rương/tài nguyên cuối trận.
 * Tầng 2 — Một ngày chơi (20 – 35 phút / ngày):
   * 5 phút đầu: Điểm danh ngày, nhận Quà tuần tra, quay 2 lượt Vòng quay may mắn miễn phí.
   * 10 phút cày tài nguyên chính: Đánh 1 lượt Phó bản Giới hạn (60s) lấy Mảnh/Linh kiện VKTT + 3 lượt Khe Nứt Hư Không lấy Tinh thể Chip & Mảnh Lõi Phi Công + càn quét nhanh Phó bản Vàng/Đá XP.
   * 10–15 phút chiến đấu cốt lõi: Đẩy thêm 3–5 ải Chiến dịch mới (0 thể lực) + chạy 1 lượt Vô tận (hoặc Tháp Boss / Sự kiện tuần) để hoàn thành 100 điểm Năng động ngày (50 💎).
 * Tầng 3 — Một Mùa Giải 21 Ngày (Mid-term Meta):
   * Tích lũy XP Mùa giải (25 cấp) + leo Hạng Vô Tận (Đồng \rightarrow Bạc \rightarrow Vàng \rightarrow Bạch Kim \rightarrow Kim Cương \rightarrow Huyền Thoại) + xoay vòng 3 chu kỳ Ép Xung Tuần để nâng 1 VKTT lên Huyền Thoại, mở khóa 1 Robot Siêu Hợp Thể và hoàn thiện 1 bộ Chip Giao Ước.
2. Ba Trụ Cột Bản Sắc Riêng Của "Phi Đội Sao Băng"
 * Chiến Đấu Khiên Năng Lượng & Sượt Đạn Chủ Động (Active Shield & Graze): Thay vì thanh máu/giáp cộng dồn thụ động, cơ chế Khiên chặn 1 đòn hồi theo thời gian (V78) kết hợp Sượt đạn (Graze) nạp Bạo Tẩu & kích Khiên (Lâm Phương) biến việc lách khe đạn sát sườn thành kỹ năng sinh tồn chủ chốt.
 * Hợp Thể Kép Đa Tầng (Tàu \rightarrow Chiến Thần Robot 2 Dạng + Vũ Khí Tối Thượng 3 Hệ): Người chơi vừa điều khiển Robot Cơ Khí biến hình 2 dạng (Máy bay \leftrightarrow Robot đứng khi Bạo Tẩu/Tuyệt kỹ), vừa kích hoạt độc lập Vũ Khí Tối Thượng theo 3 vai trò chiến thuật (Tấn công · Phòng thủ · Đa dụng).
 * Kinh Tế Offline Tự Cung Tự Cấp & Tiến Hóa Rõ Ràng: Mọi món từ 13 chiến cơ, 7 Robot cơ khí đến VKTT đều có lộ trình cày chay minh bạch (0 tiền thật), nâng bậc càng cao ngoại hình càng biến đổi rõ nét (thêm phiến cánh, hào quang, vũ khí phụ).
3. Lộ Trình Mở Khóa Theo Tiến Độ (Từ Ải 1 \rightarrow Ải 200 & Endgame)
| Mốc mở khóa | Tính năng / Hệ thống mở (Mới / Sửa) | Mục tiêu chính của người chơi ở giai đoạn này |
|---|---|---|
| Ải 1 – 15 (Ngày 1 · FTUE) | Chiến dịch · Kho Chiến Cơ · Trang bị cơ bản (Giáp, Tên lửa, Tàu con) · Nâng cấp Đá XP I–IV · Nhiệm vụ ngày (Sửa: ẩn bớt tab nâng cao) | Làm quen điều khiển, nâng bộ 3 trang bị lên Lục/Lam, mở khóa Phi công đầu tiên (Lâm Phương). |
| Ải 16 – 45 (Ngày 1–3) | Vô Tận (Ải 16) · Phó bản Tài nguyên (Ải 25) · Đội Phi Công & Cây Tiềm Năng (Ải 35) · Thử Thách Ngày / Hạt Giống (Ải 45) (Giữ) | Lập đội 4 Phi công (1 chính + 3 phụ), chạy Vô tận kiếm rương trang bị tiến khung lên Lam +3. |
| Ải 46 – 89 (Ngày 4–10) | Đá Khảm V71 (Ải 50) · Tháp Boss (Ải 60) · Phá Vây Roguelite (Ải 70) · Hợp Thể Robot SSS (Ải 80) (Sửa: đưa Hợp thể mở rõ ở Ải 80) | Ghép 2 tàu bậc Lam/Tím tạo Robot Siêu Hợp Thể đầu tiên; khảm bộ Đá Khảm 5 ô. |
| Ải 90 – 109 (Ngày 11–16) | Vũ Khí Tối Thượng — VKTT (Ải 90) · Kho Đá Nội Tại Riêng (Ải 95) · 2 ô VKTT Trợ Chiến (Ải 100 / 120) (Mới/Giữ) | Lắp VKTT Chủ chiến, mở ô Nội tại góc phải trang bị, cày Boss Hạn Giờ lấy Linh kiện A/B & Thẻ EXP VKTT. |
| Ải 110 – 150 (Ngày 17–25) | Chip VKTT (Ải 110) · Khe Nứt Hư Không 50 Tầng (Ải 110) · Ma Trận Lõi Phi Công (Ải 125) (Mới) | Leo Khe Nứt nâng Cấp Rơi Chip (Cấp 1 → 5), săn Mảnh Lõi Phi Công nâng Lõi Lv1–5. |
| Ải 151 – 200 & Endgame | Ép Xung Tuần (Ải 150) · Nguyệt Thực & Boss Vượt Hạn (Ải 160) · Đồ Giám Robot MAX & Chinh phục Ải 200 (Mới/Giữ) | Hoàn thiện bộ Chip Tuyệt mật, nâng Robot lên SS/MAX, đua top Vô tận & Boss cuối tuần. |
PHẦN C · ĐỀ XUẤT CẢI TIẾN CHI TIẾT & THÔNG SỐ CẤU HÌNH
1. Nâng Cấp Nhịp Trong Trận: Cấp Vũ Khí Trong Lượt + Tinh Thể + Chọn Tăng Ích Vô Tận (Mới — Chỉ trong lượt, 0 ảnh hưởng kinh tế & save)
 * Cấp Vũ Khí Trong Lượt (inRunWeaponLv: 1 → 13):
   * Đầu mỗi trận (Chiến dịch, Vô tận, Khe nứt), vũ khí khởi điểm ở Lv.1. Nhặt viên tăng lực (power) cộng +1 Lv (viên super cộng +3 Lv).
   * Mốc sát thương theo cấp trong lượt: Lv.1 = 75% tổng DPS chuẩn của tàu \rightarrow Lv.7 = 100% (chuẩn) \rightarrow Lv.13 = 125% (tối đa, quạt đạn dày nhất). Khi trúng đạn mất máu, tụt 2 Lv (tối thiểu Lv.1).
 * Tinh Thể Trong Lượt (runCrystal):
   * Quái hạ gục rơi chuỗi Tinh thể lục giác xanh lơ (khác hình với Hợp kim ◈). Tinh thể chỉ tồn tại trong lượt chơi Vô tận/Phá Vây, dùng làm điều kiện kích hoạt các tăng ích tích lũy và tự quy đổi thành điểm thưởng khi hết trận (không cộng ra kho ngoài).
 * Chọn Tăng Ích Sau Mỗi Boss Ở Vô Tận (Tái sử dụng hệ Ấn Chú của BK78):
   * Nhịp Vô tận mới (Sửa): Chuẩn hóa 4,5 giây / đợt, Boss xuất hiện mỗi 10 đợt (~45 giây/Boss; Boss mỗi 5 đợt cũ quá dồn dập làm ngắt mạch bắn).
   * Sau khi hạ mỗi Boss (Đợt 10, 20, 30…), hiện bảng chọn 1 trong 3 thẻ Tăng Ích (4 bậc khung: Lục 45% · Lam 32% · Tím 18% · Vàng 5%), có 1 lượt Làm mới miễn phí mỗi lần chọn (tối đa dồn 3 lượt chọn).
// CẤU HÌNH TĂNG ÍCH VÔ TẬN (TÁI DÙNG ENGINE ẤN CHÚ BK78 · KHÔNG LƯU VĨNH VIỄN)
{
  "endlessWaveDurationSec": 4.5,
  "endlessBossInterval": 10,
  "rerollPerDraft": 1,
  "rarityWeights": { "green": 45, "blue": 32, "purple": 18, "gold": 5 },
  "augments": [
    { "id": "aug_atk_crystal", "tier": "purple", "name": "Tụ Năng Tinh Thể", "effect": "Mỗi 300 tinh thể nhặt trong lượt: +5% ATK (tối đa +45%)" },
    { "id": "aug_sub_crystal", "tier": "blue",   "name": "Tiếp Sức Vệ Tinh", "effect": "Mỗi 300 tinh thể: +10% sát thương Tên lửa & Tàu con (tối đa +100%)" },
    { "id": "aug_heal_crystal","tier": "green",  "name": "Chuyển Hóa Sinh Lực", "effect": "Mỗi 150 tinh thể: hồi +1 tim máu (nếu đầy máu: +15% sạc VKTT)" },
    { "id": "aug_bomb_crystal","tier": "gold",   "name": "Phân Rã Lượng Tử", "effect": "Đạn địch bị Bom/Tuyệt kỹ xóa biến thành Tinh thể; +20% sát thương Bom" },
    { "id": "aug_bomb_up",     "tier": "purple", "name": "Quá Tải Đầu Đạn", "effect": "Sau khi thả Bom: 60% xác suất tăng ngay +1 Cấp vũ khí trong lượt" },
    { "id": "aug_wp_keep",     "tier": "blue",   "name": "Ổn Định Nòng Pháo", "effect": "Mỗi 40s tự tăng +1 Cấp vũ khí; 40% không tụt cấp khi trúng đạn" },
    { "id": "aug_overdrive",   "tier": "purple", "name": "Bạo Tẩu Vĩnh Cửu", "effect": "Thời gian Bạo Tẩu/Robot đứng +0,5s; sát thương trong Bạo Tẩu +25%" },
    { "id": "aug_boss_slayer", "tier": "blue",   "name": "Săn Thủ Lĩnh", "effect": "+15% sát thương lên Boss; hạ mỗi Boss tăng +4% ATK (tối đa +32%)" },
    { "id": "aug_shield_fast", "tier": "blue",   "name": "Tái Tạo Khiên Nhanh", "effect": "Giảm 2,5s thời gian hồi Khiên chặn đòn; vỡ khiên xóa đạn rộng hơn +30%" },
    { "id": "aug_revive_once", "tier": "gold",   "name": "Lõi Hồi Sinh Tạm", "effect": "Tự động hồi sinh 1 lần trong lượt với 2 tim máu + Khiên (1 lần/lượt)" }
  ]
}

2. Phân Vai & Chỉ Tiêu Cân Bằng 13 Chiến Cơ (Sửa — Vá lỗi dao động sát thương Tàu 11)
 * Sửa lỗi Tàu 11 (Thôn Tinh Chiến Cơ): Nguyên nhân dao động DPS lớn là hố đen hút quái tính sát thương theo từng khung hình (per-frame) thay vì theo nhịp cố định (tick = 0,25s) và cộng dồn không giới hạn khi nhiều mục tiêu chồng lên nhau. Cách sửa: Khóa nhịp gây sát thương của hố đen ở 4 tick/giây, giới hạn tối đa 5 mục tiêu/tick và cố định hệ số DPS chuẩn ở mức 1,08×.
| Vai trò chiến thuật | Các chiến cơ thuộc nhóm | Chỉ tiêu DPS bia cố định (So với chuẩn 1,00×) | Thời gian hạ Boss chuẩn (Cùng CP đề nghị) | Chỉ số sống sót / Đặc trưng |
|---|---|---|---|---|
| 1. Phá Boss Đơn Mục Tiêu | #2 Cực Quang Ảo Ảnh · #6 Siêu Nghiệm U Linh · #7 Ma Vương Đao Phong | 1,08× – 1,12× (Tập trung hẹp) | 26 – 29 giây | Tia laser / trảm kích tập trung tâm; yếu khi quái tràn hai cánh. |
| 2. Dọn Quái Diện Rộng | #1 Nộ Hỏa Phượng Hoàng · #5 Trí Tuệ Thự Quang · #8 Phần Thiên Chiến Chuẩn | 0,96× – 1,00× (Phủ rộng 65% màn) | 31 – 34 giây | Quạt đạn rộng + thiêu đốt/tán xạ; dọn đợt Vô tận nhanh nhất. |
| 3. Xuyên Phá & Khống Chế | #3 X-Dực Băng Hà · #4 Thần Ma Dị Hình · #10 Tinh Hà Thủ Vọng | 1,00× – 1,04× (Xuyên hàng dọc) | 30 – 32 giây | Làm chậm 25% (Tàu 3), đạn xuyên thấu (Tàu 4), vệ tinh quân đoàn (Tàu 10). |
| 4. Cơ Động & Sượt Đạn / SSS | #9 Thiên Khung Lược Ảnh · #11 Thôn Tinh · #12 Thời Không · #13 Hư Không Đế Vương | 1,05× – 1,10× (Đã khóa tick Tàu 11) | 27 – 30 giây | Vùng sượt đạn +15%, hút ngọc mạnh, hiệu ứng đặc biệt bậc SSS. |
3. Đánh Giá & Phân Vai Toàn Bộ Chế Độ Chơi (Giữ / Sửa / Gộp)
 * Giữ nguyên 100%: Chiến dịch (200 ải), Vô tận, Phá Vây (BK78), Khe Nứt Hư Không (50 tầng), Nguyệt Thực.
 * Sửa luật cho sắc nét:
   * Boss Cuối Tuần (Sự kiện tuần): Đổi sang thể thức Đua Sát Thương 3 Tàu × 30 giây (1 tàu chủ lực + 2 tàu hỗ trợ tự đổi sau mỗi 30s, hiển thị tổng sát thương lớn ở đỉnh màn hình + bảng tổng kết gắn nhãn MVP cho tàu gây sát thương cao nhất).
   * Tháp Boss: Rút gọn từ leo lại từ tầng 1 thành cho phép chọn bắt đầu từ mốc (Tầng kỷ lục − 5) để đỡ mất thời gian đánh lại các tầng quá yếu.
 * Gộp giao diện (Không bỏ chế độ, chỉ gom lối vào cho gọn):
   * Gom Thử Thách Ngày và Thử Thách Hạt Giống thành 2 tab con trong cùng 1 thẻ "Thử Thách Hằng Ngày" ở màn Thử Thách để giảm độ dài danh sách.
 * Thứ tự ưu tiên chơi hằng ngày: (1) Phó bản Giới hạn 60s \rightarrow (2) Khe Nứt Hư Không (3 lượt) \rightarrow (3) Phó bản Tài nguyên (càn quét) \rightarrow (4) Chiến dịch / Vô tận \rightarrow (5) Phá Vây / Tháp Boss (khi rảnh, 0 thể lực).
4. Bản Đồ Toàn Bộ 18 Loại Tài Nguyên: Nguồn \rightarrow Nơi Dùng (Không Gộp — Thêm Bảng Tra Cứu Trong Game)
> Đề xuất trình bày UI (Không gộp tài nguyên): Bổ sung nút ⓘ Nguồn & Công dụng trên popup chi tiết của mọi vật phẩm; gắn thẻ màu phân nhóm theo 4 nhóm hệ thống: Cơ bản (Xanh dương) · Trang bị & Đá (Xanh lục) · Phi công & Hợp thể (Tím) · VKTT & Chip (Vàng cam).
> 
| Nhóm | Tên tài nguyên (Giữ nguyên) | Nguồn kiếm chính | Nơi sử dụng duy nhất | Trạng thái cân đối |
|---|---|---|---|---|
| Cơ bản | 1. Hợp kim ◈ | Chiến dịch, Vô tận, Phó bản Vàng, Nhiệm vụ | Mọi nâng cấp cấp độ, Chợ Đen | Hơi thừa ở Endgame \rightarrow thêm gói đổi Thẻ EXP VKTT & Tinh thể Chip ở Chợ Đen. |
| Cơ bản | 2. Kim cương 💎 | Nhiệm vụ ngày/tuần, Thành tựu, Mùa giải, Điểm danh | Làn Tinh Anh (1.500), Vòng quay x10 (810), Lượt Phó bản giới hạn (30/60) | Cân bằng chuẩn (~2.100 💎 free / mùa 21 ngày). |
| Cơ bản | 3. Thể lực 🔋 & 4. Vé càn quét 🎫 | Hồi tự động (288/ngày), Quà 12h/18h, Nhiệm vụ | Chơi lại ải đã qua, Phó bản tài nguyên | Cân bằng. |
| Trang bị | 5. Đá XP I–IV | Phó bản Tiếp tế, Chiến dịch, Vô tận | Chỉ nâng cấp Chiến cơ & 3 Trang bị (không dùng cho VKTT) | Cân bằng. |
| Trang bị | 6. Bản sao tàu / trang bị | Rương Vô tận, Săn trang bị, Đồ giám | Tiến khung (Trắng \rightarrow Tím+5) & Nâng bậc Robot | Rất giá trị khi dùng thêm cho Robot hợp thể. |
| Trang bị | 7. Đá khảm V71 & 8. Đá tẩy | Phó bản Tài nguyên, Rương Vô tận, Mùa giải | Lắp vào 5 ô Đá khảm trên 4 món trang bị | Cân bằng. |
| Trang bị | 9. Kho Đá Nội Tại (20 viên) (Mới) | Khe Nứt Hư Không, Boss Vượt Hạn, Mùa giải | Lắp vào Ô Nội Tại hình thoi riêng trên 4 trang bị | Tách biệt hoàn toàn với Đá khảm V71. |
| Phi công | 10. Mảnh phi công | Vòng quay, Chợ Đen, Mùa giải, Chiến dịch | Mở khóa & tiến bậc Phi công (Lam / Tím / Tím+5) | Cân bằng. |
| Phi công | 11. Lõi Siêu Hợp & 12. Tinh Hạch | Tháp Boss, Chủ Nhật Siêu Hợp Thể, Chợ Đen | Mở nút Cây Tiềm Năng, tiến bậc Phi công & Nâng bậc Robot | Cân bằng. |
| Phi công | 13. Mảnh Lõi Phi Công (8 loại) (Mới) | Khe Nứt (tầng 15+), Mùa giải, Đổi điểm Tháp Boss | Nâng cấp 8 Lõi Cộng Hưởng Phi Công (Lv1–5) | Đủ nguồn nâng 4 lõi chính lên Lv4–5 sau 2 mùa. |
| VKTT | 14. Mảnh VKTT & 15. Linh kiện A/B/C/D | Nhiệm vụ ngày, Boss Hạn Giờ, Khe Nứt, Nguyệt Thực, Vòng quay | Lên đời 16 nấc VKTT (A: Trắng→Lam+3; B: Tím; C: HT; D: HT+3→5) | Hơi thiếu LK D \rightarrow đã bổ sung ở Khe Nứt tầng 36+ & Mùa giải. |
| VKTT | 16. Thẻ EXP VKTT (Mới) | Nhiệm vụ ngày, Boss Hạn Giờ, Khe Nứt, Chợ Đen | Tăng cấp VKTT (Lv1 \rightarrow Lv100) | Tách biệt hoàn toàn với Đá XP I–IV. |
| VKTT | 17. Tinh thể Chip · Bộ mã hóa · Lõi Chip | Khe Nứt Hư Không, Thứ Bảy Tiếp Tế Chip, Nhiệm vụ | Sản xuất, Luyện, Tái tạo & nâng cấp Chip VKTT | Cân bằng theo thang Cấp rơi 1–5. |
| Sự kiện | 18. Mảnh Sao Cổ · Danh dự · Xu Chợ Đen · Mảnh Skin | Sự kiện tuần, Hạng Vô tận, Phân giải đồ thừa | Tiệm Sự Kiện, Tiệm Danh Dự, Chợ Đen, Tủ Skin | Cân bằng. |
PHẦN D · KẾ HOẠCH CẬP NHẬT (CHIA 4 ĐỢT RÕ RÀNG)
Đánh giá thứ tự triển khai 6 hệ thống của Lượt 2:
 * Thứ tự Claude đang dự kiến: VKTT (đã xong) → Chip → Lõi phi công → Khe Nứt Hư Không → Đá nội tại → Ép xung tuần.
 * Đề xuất điều chỉnh thứ tự: Đưa Khe Nứt Hư Không lên làm NGAY SAU Chip (trước Lõi phi công và Đá nội tại).
   * Lý do: Khe Nứt Hư Không chính là nguồn cung cấp Mảnh Lõi Phi Công, Đá Nội Tại và quyết định Cấp Rơi Chip 1–5. Có Khe Nứt trước thì khi mở Lõi Phi Công và Đá Nội Tại ở đợt kế tiếp, người chơi sẽ có sẵn nơi cày nguyên liệu ngay lập tức.
Bảng Kế Hoạch 4 Đợt Cập Nhật
| Đợt phiên bản | Danh sách đầu việc kỹ thuật (\le 6 việc/đợt) | Mục tiêu đo được & Tiêu chí nghiệm thu | Tranh GPT cần vẽ thêm |
|---|---|---|---|
| V307.5 (Vá lỗi & Hoàn thiện nền) | 1. Fix ngắt dòng thoại lẻ chữ (ui_tran.jpg) & ẩn modal cài đặt đè ở ui_ket_qua.jpg.
2. Tách tab Cửa Hàng (mở Quầy Tiếp Tế trước, tách Chợ Đen) + xóa ô thứ 5 dư ở ui_skin.jpg.
3. Khóa nhịp tick 0,25s cân bằng sát thương Tàu 11 (Thôn Tinh).
4. Thêm nút Ải kế tiếp tại bảng thắng Chiến dịch.
5. Nén toàn bộ sprite Base64 sang WebP để giảm dung lượng HTML từ ~95MB xuống < 15MB. | • 0 lỗi đè lớp phủ/cắt chữ trên 30 màn UI.
• Sai lệch DPS thực tế Tàu 11 < 5% so với bia chuẩn.
• Dung lượng file HTML < 15MB, tải trên mobile < 1,5s. | Không cần (dùng sprite hiện có). |
| V308 (Chip + Khe Nứt + Nhịp Vô Tận) | 1. Cập nhật 8 Bộ Chip + 8 Dòng khuếch đại (Chí mạng, Tinh anh, Buff Tuyệt mật +1,5%).
2. Xây dựng chế độ Khe Nứt Hư Không 50 Tầng + Thang Cấp Rơi Chip 1–5 + Rương Hư Không.
3. Nâng cấp Vô Tận: nhịp 4,5s/đợt, Boss mỗi 10 đợt, Tinh thể trong lượt & Chọn 1/3 Tăng Ích sau Boss.
4. Thêm Cấp vũ khí trong lượt (Lv.1 → Lv.13). | • Vượt tầng 10/20/35/50 Khe Nứt mở đúng tỉ lệ rơi Chip Cấp 2–5.
• Bảng chọn 3 Tăng Ích hoạt động mượt sau mỗi Boss Vô tận, không lưu dữ liệu ra ngoài lượt. | 1 bảng 8 icon UI nhỏ (tinh thể trong lượt, 4 icon tăng ích, icon Khe Nứt). |
| V309 (Robot Cơ Khí Hợp Thể 2 Dạng + Đồ Giám) | 1. Thay thế 7 chiến giáp nữ bằng 7 Robot Cơ Khí (4 Nam · 3 Nữ) với 2 dạng Máy bay \leftrightarrow Robot đứng.
2. Cài đặt Vòng 8 Hệ Đạn & cộng hưởng đội hình.
3. Cài đặt 6 Bậc Robot (Thường → SS/MAX) + nâng cấp bằng bản sao 2 tàu mẹ & Lõi Siêu Hợp.
4. Dựng màn Đồ Giám Robot chạy vòng lặp xem trước 4 pha + cốt truyện. | • Biến hình Máy bay \leftrightarrow Robot đứng mượt trong 0,7s khi vào Bạo Tẩu & Tuyệt kỹ.
• Migrate 100% dữ liệu lưu saobang-robots-v1 của người chơi cũ sang bậc tương ứng mà không mất robot. | Bộ sprite 7 Robot Cơ Khí (chi tiết ở Mục F Hồ Sơ 2 bên dưới). |
| V310 (Lõi Phi Công + Đá Nội Tại + Ép Xung + Boss Cuối Tuần) | 1. Cài đặt Ma Trận 8 Lõi Phi Công (4 ô lục giác, Lv1–5).
2. Mở Ô Nội Tại riêng trên 4 trang bị + Kho 20 Đá Nội Tại (mở Ải 95).
3. Kích hoạt Ép Xung Tuần (4 món +180% điểm Vô tận, biến thiên +25% → −15%).
4. Đổi Boss Cuối Tuần sang thể thức Đua sát thương 3 tàu × 30s + tổng kết MVP.
5. Thêm nút tra cứu ⓘ Nguồn & Công dụng cho 18 loại tài nguyên. | • Tổng lực chiến tối đa khi full toàn bộ hệ thống đo thực tế đạt 32.500 – 33.200 CP (đúng trần ~33.000 CP).
• Hoàn chỉnh 100% vòng lặp Endgame. | 1 bảng icon 20 Đá Nội Tại (4 nhóm màu khung thoi). |
HỒ SƠ 2 · THIẾT KẾ LẠI ROBOT SIÊU HỢP THỂ CƠ KHÍ (7 MẪU · 2 DẠNG · 6 BẬC)
A. Hướng Hình Ảnh & Phân Bổ 7 Robot Cơ Khí (4 Dáng Nam · 3 Dáng Nữ)
 * Quy chuẩn tạo hình chung (Mới): Loại bỏ hoàn toàn kiểu chiến giáp nữ mặc váy/giày cao gót hiện tại (robot_hien_tai_7_mau.jpg). Toàn bộ 7 mẫu đều là Người Máy Cơ Khí (Mecha) chế tạo từ hợp kim vũ trụ có khớp nối cơ học rõ ràng, mũ giáp/mặt nạ kín hoàn toàn, vai rộng gắn động cơ phản lực và cánh năng lượng khổng lồ khi biến hình.
   * 4 Robot dáng Nam: Khung vai vuông vức, giáp ngực dày, góc cạnh hầm hố, cầm đại pháo/trường thương/song liềm.
   * 3 Robot dáng Nữ: Khung cơ khí thon gọn hơn (tỉ lệ chiến cơ cơ động), giáp kín toàn thân, mũ giáp có mào cánh thanh thoát, cầm cung năng lượng/song kiếm/pháp trượng cơ khí.
 * Giữ nguyên cặp 2 chiến cơ thành phần hiện có để bảo toàn 100% công thức ghép của người chơi cũ, chỉ đổi mới hoàn toàn Tên gọi, Chủ đề và Tuyệt kỹ để thoát khỏi tên dịch sát bản gốc.
| # | Tên Robot Mới (Mới) | Dáng & Chủ đề | 2 Chiến cơ thành phần (Giữ) | Bảng màu & Đặc trưng cơ khí (Khớp 2 tàu mẹ) |
|---|---|---|---|---|
| 1 | Thiên Vũ Cơ Hoàng (Thay Ảo Vũ Thiên Ảnh) | Nữ Cơ Khí · Ảo Ảnh & Lông Vũ Quang Tử | #6 Siêu Nghiệm U Linh + #9 Thiên Khung Lược Ảnh | Giáp bạc-đen titan viền tím-xanh cực quang; 6 cánh lông vũ quang tử xòe rộng; cầm cung cơ khí bắn mưa mũi tên phân thân. |
| 2 | Hắc Tinh Đột Kích (Thay Du Tinh Hách Khách) | Nam Cơ Khí · Lõi Nhiệt Hạch & Tin Tặc Không Gian | #8 Phần Thiên Chiến Chuẩn + #6 Siêu Nghiệm U Linh | Giáp đen nhám cacbon + sọc cam lửa & cyan; 2 cánh phản lực gập góc; vai gắn pháo hạt nhân, tạo nón tia nhiệt đỏ từ trên đỉnh. |
| 3 | Thái Dương Chiến Thần (Thay Vĩnh Tẫn Hoang Viêm) | Nam Cơ Khí · Hỏa Ngục & Hạm Đội Mặt Trời | #10 Tinh Hà Thủ Vọng + #8 Phần Thiên Chiến Chuẩn | Giáp đỏ thẫm & vàng kim hoàng gia; 3 ụ pháo vệ tinh bay quanh vai; cánh hào quang mặt trời 8 tia bùng nổ chữ X lửa. |
| 4 | Tinh Vân Phán Quan (Thay Quần Tinh Ý Chí) | Nữ Cơ Khí · Trọng Lực Băng & Quân Đoàn Tinh Tú | #3 X-Dực Băng Hà + #10 Tinh Hà Thủ Vọng | Giáp bạch kim & xanh lam vũ trụ; vòng hào quang 6 vệ tinh pha lê bay quanh lưng; triệu hồi cột băng và đội tiêm kích tự động. |
| 5 | Hàn Phong Kỵ Sĩ (Thay Băng Hà Lĩnh Chủ) | Nam Cơ Khí · Kiếm Khí Băng Giá Tuyệt Đối | #7 Ma Vương Đao Phong + #3 X-Dực Băng Hà | Giáp xanh băng & thép trắng sắc nhọn; 8 phiến cánh tinh thể băng xòe xuống như áo choàng chiến giáp; cầm đại kiếm băng trảm dọc. |
| 6 | Xích Diễm Long Thương (Thay Phượng Viêm Thương Đế) | Nam Cơ Khí · Hỏa Long Xuyên Giáp | #1 Nộ Hỏa Phượng Hoàng + #4 Thần Ma Dị Hình | Giáp đỏ rực & đen huyền vũ; đôi cánh phượng hoàng cơ khí 3 tầng lửa; tay phải cầm đại thương xuyên phá, tay trái gắn khiên pháo. |
| 7 | Tử Diệu Quang Hoàng (Giữ tên đã lên đẹp ở Sảnh, đổi sang Mecha) | Nữ Cơ Khí · Nữ Hoàng Ánh Sáng & Lăng Kính | #2 Cực Quang Ảo Ảnh + #5 Trí Tuệ Thự Quang | Giáp vàng kim & tím hoàng gia vát cạnh sắc sảo; mũ giáp vương miện phát sáng; 4 cánh lăng kính pha lê khổng lồ, bắn chùm laser tán xạ. |
B. Vòng 8 Hệ Đạn Riêng & Cộng Hưởng Đội Hình (Mới)
1. Vòng Khép Kín 8 Hệ Đạn Của "Phi Đội Sao Băng"
Mỗi Robot sở hữu 2 Đặc Kỹ là 2 hệ đạn đứng cạnh nhau trên vòng tròn 8 hệ khép kín dưới đây (tạo thành chuỗi liên kết rõ ràng, không dùng tên hệ dịch từ bản gốc):
> Vòng 8 Hệ: ① Xung Kích \rightarrow ② Xuyên Phá \rightarrow ③ Tán Xạ \rightarrow ④ Trảm Kích \rightarrow ⑤ Hàn Băng \rightarrow ⑥ Quân Đoàn \rightarrow ⑦ Thiêu Đốt \rightarrow ⑧ Phân Giải \rightarrow (quay lại ① Xung Kích)
> 
| Robot Cơ Khí | Đặc Kỹ 1 (Hệ đạn) | Đặc Kỹ 2 (Hệ đạn kề) | Hiệu ứng kết hợp đặc trưng trong trận |
|---|---|---|---|
| 1. Thiên Vũ Cơ Hoàng | ⑧ Phân Giải | ① Xung Kích | Đạn phân tách thành 6 lông vũ quang tử tự tìm mục tiêu + sóng xung kích đẩy lùi đạn địch. |
| 2. Hắc Tinh Đột Kích | ⑦ Thiêu Đốt | ⑧ Phân Giải | Nón tia nhiệt đốt cháy mục tiêu, khi mục tiêu nổ tung sẽ phân giải thành mảnh đạn lan sang địch bên cạnh. |
| 3. Thái Dương Chiến Thần | ⑥ Quân Đoàn | ⑦ Thiêu Đốt | Triệu hồi 4 vệ tinh pháo binh bắn đồng loạt kèm cột lửa thiêu đốt dọc tâm màn hình. |
| 4. Tinh Vân Phán Quan | ⑤ Hàn Băng | ⑥ Quân Đoàn | Tạo vùng sương băng làm chậm địch 35% để đội tiêm kích vệ tinh tập trung hỏa lực dứt điểm. |
| 5. Hàn Phong Kỵ Sĩ | ④ Trảm Kích | ⑤ Hàn Băng | Phóng lưỡi kiếm khí khổng lồ đóng băng kẻ địch trúng đòn trong 1,5 giây và gây thêm +20% sát thương chí mạng. |
| 6. Xích Diễm Long Thương | ② Xuyên Phá | ③ Tán Xạ | Mũi thương laser xuyên thẳng hàng dọc kèm quạt đạn lửa tán xạ 120° bao phủ hai cánh. |
| 7. Tử Diệu Quang Hoàng | ③ Tán Xạ | ④ Trảm Kích | Chùm lăng kính tán xạ 9 tia kết hợp 2 lưỡi liềm ánh sáng quét ngang hai bên sườn màn hình. |
2. Cộng Hưởng Hệ Đội Hình (Chiến Cơ Chính + Chiến Cơ Phụ + Robot)
Khi xuất trận, nếu Chiến cơ chính và Chiến cơ phụ (hỗ trợ) trùng với 1 trong 2 Đặc Kỹ của Robot đang dùng, kích hoạt Cộng Hưởng Hệ:
 * Trùng 1 hệ (1 tàu khớp đặc kỹ Robot): +8% Sát thương đạn chính & +5% Tốc độ nạp thanh biến hình.
 * Trùng cả 2 hệ (Cả 2 tàu khớp 2 đặc kỹ của Robot): +15% Sát thương toàn diện, +10% Tốc độ nạp biến hình và giảm −2 giây hồi chiêu Tuyệt kỹ Robot.
C. Hệ Thống 6 Bậc Robot Cơ Khí & Kinh Tế Nâng Bậc (Mới)
 * Thang 6 Bậc Thống Nhất Với Chiến Cơ: Dùng chung 6 mốc hình ảnh Thường \rightarrow Lục \rightarrow Lam \rightarrow Tím \rightarrow Tím +5 \rightarrow SS / MAX (đồng bộ 100% với 13 chiến cơ, người chơi nhìn màu khung là hiểu ngay sức mạnh).
 * Biến đổi ngoại hình theo bậc ("Nâng bậc càng cao càng đẹp"):
   * Thường & Lục: Dạng máy bay cơ bản (2 cánh gọn), dạng Robot đứng cánh ngắn (2 phiến cánh), chưa có vũ khí phụ bay quanh.
   * Lam & Tím: Dạng máy bay mở rộng giáp cánh + ống xả đôi; dạng Robot đứng mở rộng 4 phiến cánh năng lượng + cầm vũ khí chính trên tay.
   * Tím +5: Thêm hào quang vòng ma trận sau lưng và 2 vệ tinh/lưỡi liềm phụ lơ lửng hai bên vai.
   * SS / MAX: Bung 6–8 phiến cánh năng lượng khổng lồ, viền giáp mạ vàng kim rực sáng, hiệu ứng hạt năng lượng bay quanh và mở khóa Chiêu Toàn Khung MAX.
Bảng C1 — Chỉ Số & Chi Phí Nâng 6 Bậc Robot (Dùng Tài Nguyên Hiện Có — Không Thêm 💎)
| Bậc Robot | Trần cấp | Hệ số Công / Máu | Thời gian dạng Robot đứng | Hồi chiêu Tuyệt kỹ | Chi phí tiến bậc (Tài nguyên hiện có) |
|---|---|---|---|---|---|
| 1. Thường (Mở khóa) | Lv 30 | 1,00× (Gốc) | 5,0 giây | 22 giây | Sở hữu 2 chiến cơ thành phần đạt bậc Lam (miễn phí hợp thể) |
| 2. Lục | Lv 45 | 1,15× | 5,5 giây | 21 giây | 15 bản sao (mỗi tàu mẹ) + 5 Lõi Siêu Hợp + 2.000 ◈ |
| 3. Lam | Lv 60 | 1,32× | 6,0 giây | 20 giây | 30 bản sao (mỗi tàu mẹ) + 12 Lõi Siêu Hợp + 5.000 ◈ |
| 4. Tím | Lv 75 | 1,52× | 6,8 giây | 19 giây | 50 bản sao (mỗi tàu mẹ) + 25 Lõi Siêu Hợp + 12.000 ◈ |
| 5. Tím +5 | Lv 90 | 1,75× | 7,5 giây | 18 giây | 80 bản sao (mỗi tàu mẹ) + 45 Lõi Siêu Hợp + 25.000 ◈ |
| 6. SS / MAX | Lv 100 | 2,00× (+10% Thưởng điểm) | 8,5 giây | 16 giây | 120 bản sao (mỗi tàu mẹ) + 80 Lõi Siêu Hợp + 50.000 ◈ |
 * Kiểm soát trần CP (~33.000 CP): Hệ số 1,00× → 2,00× của Robot thay thế cho hệ số Cường hóa +1..+10 cũ trong saobang-robots-v1, giữ tổng CP tối đa của Robot ở mức ~4.200 CP (không làm vượt trần 33.000 CP của toàn game).
 * Quy tắc chuyển đổi dữ liệu lưu cũ (saobang-robots-v1):
   * Robot cũ chưa cường hóa (+0) \rightarrow Bậc Thường (Lv 30).
   * Robot cũ +1..+3 \rightarrow Bậc Lục; +4..+6 \rightarrow Bậc Lam; +7..+8 \rightarrow Bậc Tím; +9 \rightarrow Bậc Tím +5; +10 \rightarrow Bậc SS / MAX (Lv 100).
D. Cơ Chế Biến Hình Trong Trận: Máy Bay \leftrightarrow Robot Đứng (Mới)
Khắc phục nhược điểm bản cũ (chỉ phóng to sprite tàu khi Bạo Tẩu), Robot mới vận hành theo đúng chu kỳ 4 pha uy lực như bản gốc:
 * Trạng thái Mặc định — Dạng Máy Bay (Fighter Form):
   * Di chuyển linh hoạt, vùng hit-box nhỏ (r = 7px tại lõi buồng lái), bắn luồng đạn kép kết hợp của 2 tàu mẹ.
 * Kích hoạt Biến Hình (Transformation — 0,7 giây):
   * Xảy ra khi người chơi nạp đầy thanh Bạo Tẩu HOẶC bấm nút Tuyệt kỹ Robot.
   * Hiệu ứng 0,7s: Quầng sáng năng lượng bùng nổ tại tâm tàu, chiến cơ tách khớp giáp dựng đứng thành Người Máy Cơ Khí; miễn nhiễm 100% sát thương (bất tử) trong suốt 0,7s biến hình và xóa sạch đạn địch bán kính 180px quanh tàu.
 * Trạng thái Chiến Đấu — Dạng Robot Đứng (Mecha Form — 5,0s → 8,5s):
   * Robot đứng sừng sững, bung cánh năng lượng khổng lồ; vùng hit-box vẫn giữ nguyên r = 7px tại lõi ngực để người chơi không bị thiệt khi né đạn.
   * Hỏa lực Robot đứng: Tăng +45% DPS so với dạng máy bay; thay đạn thường bằng đòn đánh đặc trưng của Robot (chém kiếm khí trăng khuyết, bắn chùm laser tán xạ hoặc mưa tên lửa vệ tinh).
   * Nếu kích hoạt bằng Tuyệt kỹ: Ngay giây đầu tiên của dạng Robot đứng sẽ tung Đại Chiêu Toàn Màn Hình (2,2 giây) gây sát thương chuẩn diện rộng.
 * Thu Giáp Hồi Phục (Revert):
   * Hết thời gian (5,0s → 8,5s), cánh năng lượng thu gọn trong 0,3s, Robot gập giáp trở lại thành Dạng Máy Bay và nhận 0,5s bất tử ngắn để tránh dính đạn bất ngờ.
E. Bố Cục Màn Hình "Đồ Giám & Hợp Thể Robot" (Mới)
Hợp nhất trải nghiệm xem trước trực quan của bản gốc (big_88771.jpg) vào sân khấu hợp thể sẵn có:
 * Nửa trên — Sân Khấu Xem Trước Vòng Lặp 4 Pha (12 giây / chu kỳ):
   * Nền lưới hologram xanh đậm với vòng tròn đế xoay ở giữa.
   * Tự động chạy vòng lặp hoạt cảnh của Robot đang chọn: Máy bay bắn thử (3,5s) \rightarrow Chớp sáng biến hình (0,7s) \rightarrow Robot đứng bung cánh tung chiêu toàn khung (4,5s) \rightarrow Thu giáp về máy bay (3,3s).
   * Nút gạt nhanh [Xem bậc hiện tại] / [Xem trước SS MAX] ngay góc sân khấu để người chơi được chiêm ngưỡng trước ngoại hình tối thượng của cả 7 Robot dù chưa mở khóa.
 * Giữa màn hình — Bảng Thông Số & Cốt Truyện:
   * Hiển thị tên Robot + Bậc (Tím +5 / MAX), Tấn công: Gốc + Cộng thêm, Thưởng điểm Vô tận: +10%, 2 huy hiệu Đặc Kỹ (bấm vào hiện giải thích vòng 8 hệ & tàu cộng hưởng), và khung Hồ Sơ Cơ Khí (Cốt truyện 3 dòng).
 * Nửa dưới — Lưới Thẻ 7 Robot & Nút Hành Động:
   * Lưới thẻ hiển thị avatar đầu Robot có viền màu theo bậc (Xám / Lục / Lam / Tím / Vàng SS) + số bậc góc dưới; bên dưới là 2 nút TIẾN BẬC (hiện tiến độ bản sao 2 tàu mẹ & Lõi Siêu Hợp) và XUẤT CHIẾN / TẬP BẮN 30S.
F. Danh Sách Tranh Cần GPT Vẽ & Chiến Lược Giảm Số Lượng Ảnh (Tối Ưu Dung Lượng)
1. Chiến Lược Cắt Giảm Từ 84 Ảnh Xuống Chỉ Còn 35 Ảnh (Giảm 58% Dung Lượng)
Thay vì bắt GPT vẽ đủ 6 bậc × 2 dạng = 12 ảnh/robot (84 ảnh rất nặng và dễ lệch mặt giữa các bậc), áp dụng kỹ thuật kết hợp Sprite Mốc + Bộ Lọc Code Canvas:
 * Dạng Máy Bay (3 ảnh mốc / robot): Chỉ cần GPT vẽ 3 mốc hình khối:
   * fighter_base (Dùng cho Thường & Lục — Lục tô tint xanh nhẹ bằng CSS).
   * fighter_mid (Dùng cho Lam & Tím — thêm giáp cánh & nòng phụ; Tím tô viền ánh tím).
   * fighter_max (Dùng cho Tím +5 & SS/MAX — full giáp vàng kim & hào quang).
 * Dạng Robot Đứng (2 ảnh mốc / robot): Chỉ cần GPT vẽ 2 mốc:
   * mecha_base (Dùng cho Thường → Lam — người máy giáp cơ khí tiêu chuẩn, cánh vừa).
   * mecha_max (Dùng cho Tím → SS/MAX — giáp tiến hóa hoàng kim, bung cánh năng lượng khổng lồ + vũ khí phụ).
 * Chân dung Đồ Giám & Biểu tượng Chiêu: Cắt trực tiếp từ đầu mecha_max làm avatar thẻ Đồ giám (0 cần vẽ riêng), và vẽ 1 bảng sprite sheet duy nhất gồm 7 đòn Tuyệt kỹ toàn khung cho 7 Robot.
\rightarrow Tổng cộng toàn bộ gói mỹ thuật 7 Robot Cơ Khí chỉ cần đặt GPT xuất: 7 × 5 = 35 sprite + 1 bảng 7 hiệu ứng chiêu!
2. Bộ Prompt Chuẩn Gửi GPT (Xuất Từng Robot — Nền Đen #000000)
Claude có thể dùng mẫu prompt chuẩn hóa dưới đây, chỉ cần thay phần mô tả trong ngoặc [...] theo Bảng A cho từng Robot trong 7 mẫu:
> Prompt Mẫu Cho Từng Robot (Xuất 1 bảng ngang 5 hình 1280×256 px, nền đen #000000):
> Create a clean 5x1 horizontal sprite sheet (total 1280x256 px, five 256x256 px frames side-by-side) isolated on a solid pitch-black background (#000000), orthographic top-down view pointing straight UP (0 degrees), ultra-crisp glossy 3D-rendered sci-fi mecha armor with sharp metallic bevels and saturated neon energy cores (NO blown-out white clipping), no text:
>  * Frame 1 (Fighter Base — Tier 1-2): [Tên Robot] in compact starfighter jet form (pointed nose cone, armored cockpit canopy, swept wings, dual rear thrusters), [Màu chủ đạo + họa tiết cơ khí].
>  * Frame 2 (Fighter Evolved — Tier 3-4): Upgraded heavy starfighter jet form of Frame 1 with wider twin-layered mechanical wings, shoulder-mounted plasma cannons, and brighter energy vents.
>  * Frame 3 (Fighter Supreme SS/MAX — Tier 5-6): Colossal apex starfighter jet form with Imperial Gold trim, four sweeping crystal-energy wing blades, and glowing reactor halo.
>  * Frame 4 (Standing Mecha Base — Tier 1-3): Full-body mechanical [Male / Female] Gundam-style robot (fully armored helmet/visor, NO exposed human skin, mechanical joints, broad shoulder pauldrons, armored chest core, twin leg thrusters) with medium energy wings, holding [Vũ khí đặc trưng].
>  * Frame 5 (Standing Mecha Awakened MAX — Tier 4-6): Awakened Supreme [Male / Female] mechanical War-God robot with ornate golden-trimmed armor, SIX massive spread energy wings filling the frame, floating [Vũ khí phụ/vệ tinh], and blazing signature weapon ready to unleash an ultimate attack.
> 
> Prompt Bổ Sung: 1 Bảng 7 Hiệu Ứng Tuyệt Kỹ Robot (7×1, 1792×256 px, nền đen #000000):
> Create a clean 7x1 horizontal sprite sheet of 7 top-down 2D sci-fi mecha ultimate energy slash & beam effects (each 256x256 px, total 1792x256 px) on a solid pitch-black background (#000000), pointing straight UP, glossy glowing plasma waves, no text: (1) Violet-cyan feather-arrow barrage wave, (2) Crimson-orange nuclear thermal cone beam, (3) Blazing golden-red solar X-cross flare, (4) Glacial sapphire-silver orbital ice-crystal pillars, (5) Massive ice-blue giant greatsword crescent slash, (6) Crimson-gold dragon-lance piercing beam, (7) Twin giant golden-violet crescent scythes with prism rays.
> 
