PHẦN 1 · CÂN BẰNG NÂNG CẤP TRANG BỊ & CHIẾN CƠ (V307)
1. Tỉ lệ quy đổi chuẩn & Công thức XP (Lv 1 → 100)
 * Tỉ lệ quy đổi hệ cũ sang XP: 1\text{ ◈} = 1\text{ XP} và 1\text{ Đá nâng cấp cũ} = 15\text{ XP}.
 * Tổng chi phí hệ cũ quy đổi (Lv 1 → 100): 16.830 \times 1 + 1.248 \times 15 = 35.550\text{ XP}.
 * Công thức XP cần để lên cấp (L \to L+1, với L \in [1, 99]):
   
 * Tổng XP từ Lv 1 → 100: \sum_{L=1}^{99} (50 + 6L) = 34.650\text{ XP} (lệch -2,53\% so với tổng giá trị quy đổi hệ cũ, làm mượt các bậc nhảy đột ngột ở mốc chia hết cho 5).
| Cấp (L \to L+1) | Chi phí cũ (◈ + Đá) | Quy đổi XP cũ | XP mới cần | XP cộng dồn từ Lv1 | Chênh lệch (%) |
|---|---|---|---|---|---|
| 1 → 2 | 23◈ + 2 đá | 53 | 56 | 56 | +5,66% |
| 5 → 6 | 35◈ + 3 đá | 80 | 80 | 340 | 0,00% |
| 10 → 11 | 50◈ + 4 đá | 110 | 110 | 830 | 0,00% |
| 24 → 25 | 92◈ + 11 đá | 257 | 194 | 3.000 | -24,51% |
| 25 → 26 | 95◈ + 7 đá | 200 | 200 | 3.200 | 0,00% |
| 34 → 35 | 122◈ + 13 đá | 317 | 254 | 5.270 | -19,87% |
| 44 → 45 | 152◈ + 15 đá | 377 | 314 | 8.140 | -16,71% |
| 49 → 50 | 167◈ + 16 đá | 407 | 344 | 9.800 | -15,48% |
| 59 → 60 | 197◈ + 18 đá | 467 | 404 | 13.570 | -13,49% |
| 74 → 75 | 242◈ + 21 đá | 557 | 494 | 20.350 | -11,31% |
| 99 → 100 | 317◈ + 26 đá | 707 | 644 | 34.650 | -8,91% |
2. Giá trị XP khi dùng Trang bị làm vật liệu & Quy tắc Chiến cơ / Phôi
 * Công thức XP nhận được khi hiến tế 1 trang bị:
   
   
   (Hoàn lại 85% lượng XP đã đập vào món đồ đó; món Lv1 có \text{XP}_{\text{đã\_đầu\_tư}} = 0).
| Khung màu | Trần cấp | \text{XP}_{\text{gốc}} (Lv1) | Ví dụ tổng XP nếu món ở Lv max khung | Cảnh báo khi chọn |
|---|---|---|---|---|
| Trắng | 25 | 15 | 2.565 XP (Lv25) | Không |
| Lục | 35 | 40 | 4.520 XP (Lv35) | Không |
| Lam | 45 | 100 | 7.019 XP (Lv45) | Không |
| Lam+1 | 50 | 180 | 8.510 XP (Lv50) | Không |
| Lam+2 | 55 | 280 | 10.175 XP (Lv55) | Không |
| Lam+3 | 60 | 400 | 11.935 XP (Lv60) | Không |
| Tím | 75 | 750 | 18.048 XP (Lv75) | Bật hộp thoại xác nhận |
| Tím+1 | 80 | 1.200 | 20.631 XP (Lv80) | Bật hộp thoại xác nhận |
| Tím+2 | 85 | 1.800 | 23.437 XP (Lv85) | Bật hộp thoại xác nhận |
| Tím+3 | 90 | 2.500 | 26.418 XP (Lv90) | Bật hộp thoại xác nhận |
| Tím+4 | 95 | 3.400 | 29.749 XP (Lv95) | Bật hộp thoại xác nhận |
| Tím+5 | 100 | 4.500 | 33.953 XP (Lv100) | Bật hộp thoại xác nhận |
 * Xử lý Phôi rơi ở ải (Phân giải vs Vật liệu XP):
   * Phôi Trắng: Tiếp tục tự động phân giải thành mảnh khi nhặt để giữ nguồn mảnh ghép/tiến khung cơ bản.
   * Phôi Lục trở lên (Lục, Lam, Tím...): Ngừng tự phân giải, lưu trực tiếp vào túi dưới dạng vật phẩm tiêu hao đa năng — người chơi được chọn dùng làm nguyên liệu tiến khung hoặc đưa vào 5 ô hiến tế lấy XP (có thêm nút "Chọn nhanh tất cả phôi Lục" trong giao diện nâng cấp).
 * Xử lý nâng Level Chiến cơ:
   * Chiến cơ dùng chung bảng XP (Lv 1 → 100) và chung Đá XP với trang bị.
   * Không cho đưa bản sao chiến cơ vào 5 ô vật liệu trực tiếp (vì bản sao chiến cơ ở dạng mảnh dùng để tăng sao/tiến bậc). Thay vào đó, mở tính năng Chuyển hóa mảnh dư: khi một chiến cơ đã đạt bậc tối đa (Tím+5), mảnh dư của chiến cơ đó cho phép đổi thành Đá XP Lớn (tỉ lệ: 1 mảnh chiến cơ max bậc = 1 Đá XP Lớn = 150 XP).
3. Hệ thống Đá XP & Tỉ lệ rơi theo nguồn
 * 3 cỡ Đá XP (bội số chuẩn của 15 XP):
   * Đá XP Nhỏ (xp_stone_s): 15 XP (tương đương đúng 1 viên đá nâng cấp cũ).
   * Đá XP Vừa (xp_stone_m): 60 XP (gấp 4 lần viên nhỏ).
   * Đá XP Lớn (xp_stone_l): 150 XP (gấp 10 lần viên nhỏ).
| Nguồn rơi / Hoạt động | Đá XP Nhỏ (15 XP) | Đá XP Vừa (60 XP) | Đá XP Lớn (150 XP) | Kỳ vọng XP / lượt |
|---|---|---|---|---|
| Ải thường Chương 1 – 3 | 1–2 viên (80%) | 0 | 0 | ~18 XP |
| Ải thường Chương 4 – 7 | 2–3 viên (90%) | 1 viên (25%) | 0 | ~49 XP |
| Ải thường Chương 8 – 10+ | 3–5 viên (100%) | 1–2 viên (45%) | 1 viên (10%) | ~116 XP |
| Mini-boss trong ải | 2 viên (100%) | 1 viên (50%) | 0 | ~60 XP |
| Boss cuối ải (lần đầu / farm) | 3–4 viên (100%) | 2 viên (70%) | 1 viên (25%) | ~174 XP |
| Quét ải nhanh (Sweep) | Lấy 100% kỳ vọng rơi của ải đó | Lấy 100% kỳ vọng rơi | Lấy 100% kỳ vọng rơi | Bằng đánh tay |
| Hầm ngục Tài nguyên (mỗi lượt) | 4–6 viên | 3–4 viên | 1–2 viên | ~480 XP |
| Nhiệm vụ ngày / Tuần / Mùa giải | Đổi 1 đá cũ = 1 Đá XP Nhỏ | Quy đổi gộp theo bội 4 | Quy đổi gộp theo bội 10 | Bảo toàn 100% |
4. Quy đổi tồn kho & Cảnh báo UI
 * Quy đổi tồn kho khi cập nhật bản V307:
   * 1 Đá nâng cấp cũ \to 1 Đá XP Nhỏ (15 XP). (Tự động quy đổi qua thư hệ thống hoặc lúc đăng nhập lần đầu; nếu số lượng \ge 100 có thể gộp hiển thị theo từng loại viên nhưng tổng XP bảo toàn tuyệt đối 15 \times N).
   * ◈ Hợp kim: Giữ nguyên 100% trong túi (dùng cho nâng cấp Phi công, tiến bậc, mua shop, cường hóa cây tiềm năng).
 * Quy tắc cảnh báo trên UI:
   * Cảnh báo dư XP (Overflow Warning): Kích hoạt khi XP_đang_có + XP_vật_liệu_chọn > XP_cần_đạt_trần_khung_hiện_tại vượt quá 30 XP (tương đương dư > 2 viên Đá XP Nhỏ), vì phần XP vượt trần khung hiện tại sẽ bị cắt bỏ (không cộng dồn sang khung sau khi chưa tiến khung). Hiển thị chữ đỏ: "Dư {excess_xp} XP sẽ bị mất do chạm trần Lv.{cap}. Hãy bỏ bớt vật liệu!"
   * Cảnh báo vật liệu quý (Rarity Warning): Kích hoạt ngay khi người chơi chạm chọn bất kỳ trang bị nào có khung từ Tím trở lên (rarity >= purple) hoặc trang bị có level >= 15. Hiển thị popup xác nhận riêng trước khi đưa vào ô nguyên liệu.
5. Kiểm chứng thời gian cày lên Lv 100 (±15% so với hệ cũ)
 * Hệ cũ: Tổng cần 1.248 đá + 16.830\text{ ◈}. Ở dải farm trung bình Chương 7–10 + Hầm ngục + Nhiệm vụ ngày, người chơi kiếm được trung bình ~18–20 đá/ngày (tương đương 270–300 XP/ngày), mất khoảng 62 – 69 ngày để max 1 món Lv 100 (tính cả thời gian cày ◈).
 * Hệ mới: Tổng cần 34.650\text{ XP}.
   * Nguồn Đá XP thay thế 1:1 nguồn đá cũ mang lại 270–300 XP/ngày.
   * Nguồn trang bị/phôi Lục–Lam dư rơi thêm từ ải + quét mang lại thêm ~190–220 XP/ngày (vốn trước đây người chơi phải chi thêm ◈ riêng biệt).
   * Tổng thu nhập XP thực tế: 460 – 520 XP/ngày \implies mất 66 – 75 ngày để đạt 34.650\text{ XP} (không còn bị nghẽn cổ chai vì thiếu ◈).
 * Kết luận kiểm thử: Thời gian hoàn thành Lv 100 ở hệ mới chênh lệch +4,8\% đến +8,6\% so với hệ cũ, nằm gọn trong ngưỡng cho phép \pm 15\%.
6. Dữ liệu JSON chuẩn cho mã nguồn (Phần 1)
{
  "version": "V307_UPGRADE_XP",
  "conversion": {
    "old_stone_to_xp": 15,
    "old_alloy_to_xp": 1,
    "invested_xp_refund_rate": 0.85,
    "max_material_slots": 5
  },
  "xp_stones": [
    { "id": "xp_stone_s", "name": "Đá XP Nhỏ", "xp": 15 },
    { "id": "xp_stone_m", "name": "Đá XP Vừa", "xp": 60 },
    { "id": "xp_stone_l", "name": "Đá XP Lớn", "xp": 150 }
  ],
  "level_xp_formula": {
    "min_level": 1,
    "max_level": 100,
    "base": 50,
    "per_level": 6,
    "total_xp_1_to_100": 34650
  },
  "rarity_base_feed_xp": {
    "white": 15,
    "green": 40,
    "blue": 100,
    "blue_1": 180,
    "blue_2": 280,
    "blue_3": 400,
    "purple": 750,
    "purple_1": 1200,
    "purple_2": 1800,
    "purple_3": 2500,
    "purple_4": 3400,
    "purple_5": 4500
  },
  "drop_rules": {
    "white_blank_auto_salvage": true,
    "green_plus_blank_keep_as_item": true,
    "max_tier_fighter_excess_shard_to_xp": 150,
    "stages": [
      { "chapter_range": [1, 3], "s": [1, 2, 0.80], "m": [0, 0, 0.0], "l": [0, 0, 0.0] },
      { "chapter_range": [4, 7], "s": [2, 3, 0.90], "m": [1, 1, 0.25], "l": [0, 0, 0.0] },
      { "chapter_range": [8, 99], "s": [3, 5, 1.00], "m": [1, 2, 0.45], "l": [1, 1, 0.10] }
    ],
    "mini_boss": { "s": [2, 2, 1.0], "m": [1, 1, 0.5], "l": [0, 0, 0.0] },
    "stage_boss": { "s": [3, 4, 1.0], "m": [2, 2, 0.7], "l": [1, 1, 0.25] },
    "dungeon_resource": { "s": [4, 6, 1.0], "m": [3, 4, 1.0], "l": [1, 2, 1.0] }
  },
  "warnings": {
    "xp_overflow_threshold": 30,
    "confirm_rarities": ["purple", "purple_1", "purple_2", "purple_3", "purple_4", "purple_5"],
    "confirm_min_invested_level": 15
  }
}

PHẦN 2 · CÂN BẰNG PHI CÔNG & KỸ NĂNG ĐA MỐC (src/pilot67.js)
7. Giá ◈ mỗi cấp mới của Phi công (Lv 1 → 60)
 * Quy đổi tổng chi phí hệ cũ (Lv 1 → 60):
   * Tổng ◈ cũ: 88.752\text{ ◈}
   * Tổng Đá cũ: 508\text{ viên} \times 15\text{ ◈} = 7.620\text{ ◈}
   * Tổng Lõi Siêu Hợp cũ: 7\text{ lõi} \times 1.500\text{ ◈} = 10.500\text{ ◈}
   * Tổng tương đương hệ cũ: 106.872\text{ ◈}
 * Công thức ◈ mới theo 3 dải cấp (L \to L+1, với L \in [1, 59]):
   * Dải 1 (L = 1 \dots 19): \text{Cost}(L) = 200 + 30 \cdot L \implies Tổng = 9.500\text{ ◈}
   * Dải 2 (L = 20 \dots 39): \text{Cost}(L) = 900 + 45 \cdot (L - 19) \implies Tổng = 27.450\text{ ◈}
   * Dải 3 (L = 40 \dots 59): \text{Cost}(L) = 2.000 + 150 \cdot (L - 39) \implies Tổng = 71.500\text{ ◈}
 * Tổng chi phí Lv 1 → 60 mới: 108.450\text{ ◈} (chênh +1,48\% so với tổng quy đổi cũ, đồng thời loại bỏ hoàn toàn cú sốc tăng giá đột ngột ở cấp 39→40 và 59→60).
| Cấp (L \to L+1) | Chi phí cũ (◈ + Đá + Lõi) | Quy đổi ◈ cũ | ◈ mới cần | ◈ cộng dồn mới |
|---|---|---|---|---|
| 1 → 2 | 228◈ + 2 đá | 258 | 230 | 230 |
| 10 → 11 | 468◈ + 4 đá | 528 | 500 | 3.650 |
| 19 → 20 | 660◈ + 5 đá | 735 | 770 | 9.500 |
| 20 → 21 | 810◈ + 6 đá | 900 | 945 | 10.445 |
| 39 → 40 | 1.620◈ + 9 đá + 2 lõi | 4.755 | 1.800 | 36.950 |
| 40 → 41 | 1.980◈ + 10 đá | 2.130 | 2.150 | 39.100 |
| 50 → 51 | 2.880◈ + 12 đá | 3.060 | 3.650 | 68.850 |
| 59 → 60 | 3.600◈ + 13 đá + 5 lõi | 11.295 | 5.000 | 108.450 |
8. Đánh giá bảng Tiến bậc (◈ + Mảnh)
 * Quyết định: Giữ nguyên bảng chi phí ◈ và Mảnh tiến bậc hiện tại (tổng 230.500\text{ ◈} và 470\text{ mảnh} từ Trắng lên Tím+5; 430\text{ mảnh} với hạng S từ Lam; 305\text{ mảnh} với hạng SS từ Tím).
 * Lý do & Ràng buộc bổ sung:
   * Với tốc độ nhận mảnh hiện tại (~35–45 mảnh/tuần từ Ngày, Tuần, Vô Tận, Tháp Boss), thời gian đẩy 1 phi công lên Tím+5 mất khoảng 7–10 tuần, cân bằng tốt giữa người chơi cày chay và người chơi đua top.
   * Thêm điều kiện khóa trần cấp: Bắt buộc pilot.level === currentTierMaxLevel (10 / 15 / 20 / 25 / 30 / 35 / 40 / 45 / 50 / 55 / 58 / 60) mới mở nút Tiến bậc.
9. Bảng Nội tại & Mốc mở hiệu ứng mới cho 8 Phi công
Để bảo toàn nghiêm ngặt trần lực chiến \le 15\% của bộ max, các chỉ số gốc tại Tím+5 được giữ nguyên biên độ tối đa cũ, còn các mốc mở khóa ở Lam, Tím, và Tím+5 tập trung vào hiệu ứng chiến thuật, hồi chiêu, điều kiện kích hoạt (không nhân thêm hệ số sát thương thuần vượt trần).
Bảng thông số 12 bậc (Chỉ số chính theo từng bậc)
| Bậc | Trần Lv | 1. Lâm Phương (Nạp Graze) | 2. Hạ Vy (Bạo Tẩu) | 3. Kiều An (Chu kỳ Giáp) | 4. Thiên Lam (ST Boss) | 5. Bảo Ngọc (Giảm ST máu ≤ 2) | 6. Mộc Miên (Hồi khi nhặt buff) | 7. Hàn Sương (Tốc tên lửa) | 8. Tử Dạ (ST mỗi món SSS) |
|---|---|---|---|---|---|---|---|---|---|
| Trắng | 10 | +15% | +1,0s | 18,0s | +10% | -15% | +20% | +12% | +3,0% |
| Lục | 15 | +18% | +1,1s | 17,2s | +11% | -16% | +22% | +13% | +3,3% |
| Lam (Mốc 1) | 20 | +20% | +1,3s | 16,5s | +13% | -18% | +25% | +15% | +3,6% |
| Lam+1 | 25 | +23% | +1,4s | 15,8s | +14% | -19% | +27% | +16% | +3,9% |
| Lam+2 | 30 | +25% | +1,5s | 15,0s | +15% | -20% | +29% | +17% | +4,2% |
| Lam+3 | 35 | +28% | +1,7s | 14,2s | +17% | -22% | +31% | +19% | +4,5% |
| Tím (Mốc 2) | 40 | +31% | +1,8s | 13,5s | +18% | -23% | +34% | +20% | +4,8% |
| Tím+1 | 45 | +34% | +2,0s | 12,8s | +20% | -25% | +36% | +22% | +5,1% |
| Tím+2 | 50 | +36% | +2,1s | 12,2s | +21% | -26% | +38% | +23% | +5,5% |
| Tím+3 | 55 | +39% | +2,2s | 11,6s | +22% | -27% | +40% | +24% | +5,8% |
| Tím+4 | 58 | +42% | +2,4s | 11,0s | +24% | -29% | +42% | +26% | +6,1% |
| Tím+5 (Mốc 3) | 60 | +45% | +2,5s | 10,5s | +25% | -30% | +45% | +27% | +6,5% |
Chi tiết 3 mốc mở khóa hiệu ứng mới của từng Phi công
 * Lâm Phương (Hạng A · Khởi điểm Trắng)
   * Mốc Lam: Mở Lướt Gió — Mỗi lần kích hoạt Graze tăng +12% tốc độ di chuyển trong 2,0s.
   * Mốc Tím: Mở Tụ Năng Chớp Nhoáng — Khi đầy thanh năng lượng, kỹ năng chủ động tiếp theo giảm 1,5s hồi chiêu.
   * Mốc Tím+5: Mở Bậc Thầy Né Đạn — Graze liên tiếp 3 lần trong 4s tạo ngay 1 lớp Khiên Chắn Đạn (tối đa 1 lớp mỗi 15s).
 * Hạ Vy (Hạng A · Khởi điểm Trắng)
   * Mốc Lam: Mở Xung Kích Nhiệt — Khi vào trạng thái Bạo Tẩu, bắn ra 1 vòng sóng xung kích xóa đạn thường trong bán kính 180px.
   * Mốc Tím: Mở Duy Trì Hưng Phấn — Tiêu diệt 1 mục tiêu tinh anh/boss khi đang Bạo Tẩu kéo dài thêm +0,8s thời gian Bạo Tẩu (tối đa 1 lần/đợt).
   * Mốc Tím+5: Mở Quá Tải Hỏa Lực — Trong 2,0s đầu của Bạo Tẩu, tốc độ bắn tăng thêm +15% (không cộng dồn vượt trần lực chiến).
 * Kiều An (Hạng A · Khởi điểm Trắng)
   * Mốc Lam: Mở Vỏ Bọc Phản Xạ — Khi hồi giáp thành công, đẩy lùi đạn địch trong phạm vi 150px quanh chiến cơ.
   * Mốc Tím: Mở Tái Tạo Khẩn Cấp — Khi giáp bị vỡ hoàn toàn, rút ngắn ngay 3,0s thời gian hồi giáp tiếp theo (hồi chiêu nội tại 25s).
   * Mốc Tím+5: Mở Pháo Đài Di Động — Khi đang có giáp, chiến cơ nhận +8% kháng hiệu ứng làm chậm/nhiễu.
 * Thiên Lam (Hạng S · Khởi điểm Lam)
   * Mốc Lam (Sẵn có): Mở Dấu Ấn Săn Mồi — Đòn đánh đầu tiên lên Boss đánh dấu mục tiêu, giúp đạn tự tìm mục tiêu (homing) chuẩn xác hơn +20%.
   * Mốc Tím: Mở Phá Giáp Trọng Điểm — Mỗi 8s bắn 1 phát đạn xuyên phá gây sát thương chuẩn bằng 1,2% máu hiện tại của Boss (giới hạn tối đa bằng 200% công cơ bản).
   * Mốc Tím+5: Mở Kết Liễu Bá Chủ — Khi máu Boss dưới 25%, toàn bộ sát thương kỹ năng của Thiên Lam tăng thêm +10% (nằm trong trần 15%).
 * Bảo Ngọc (Hạng S · Khởi điểm Lam)
   * Mốc Lam (Sẵn có): Mở Báo Động Sinh Tồn — Khi máu giảm xuống \le 2, tự động tạo 1 vòng trường lực làm chậm 35% tốc độ đạn địch trong 3,0s (hồi chiêu 30s).
   * Mốc Tím: Mở Ý Chí Thép — Khi máu \le 2, tăng +20% phạm vi hút vật phẩm/mảnh năng lượng.
   * Mốc Tím+5: Mở Bất Khuất — Miễn nhiễm 1 lần sát thương chí tử mỗi trận, giữ lại 1 HP và bất tử trong 1,5s.
 * Mộc Miên (Hạng S · Khởi điểm Lam)
   * Mốc Lam (Sẵn có): Mở Từ Trường Sinh Học — Tự động hút các vật phẩm rơi trong bán kính 220px.
   * Mốc Tím: Mở Thanh Tẩy — Nhặt vật phẩm hồi phục đồng thời xóa bỏ hiệu ứng bất lợi (nhiễu điều khiển/làm chậm) trên chiến cơ.
   * Mốc Tím+5: Mở Cộng Hưởng Dưỡng Chất — Khi đang đầy máu mà nhặt vật phẩm hồi phục, lượng hồi dư chuyển hóa thành Giáp Tạm Thời (tối đa 15% máu tối đa, tồn tại 8s).
 * Hàn Sương (Hạng SS · Khởi điểm Tím)
   * Mốc Lam (Mở sẵn khi nhận SS): Mở Đầu Đạn Băng Giá — Tên lửa làm chậm 20% tốc độ di chuyển của mục tiêu trúng đòn trong 2,0s.
   * Mốc Tím (Sẵn có): Mở Mưa Tên Lửa — Cứ mỗi 4 loạt tên lửa bắn ra, loạt thứ 5 bắn thêm +2 quả tên lửa phụ (gây 50% sát thương tên lửa gốc).
   * Mốc Tím+5: Mở Đông Cứng Tuyệt Đối — Tên lửa đánh trúng mục tiêu đang bị làm chậm có 15% xác suất đóng băng quái thường trong 1,2s (với Boss giảm tốc bắn 15% trong 1,5s).
 * Tử Dạ (Hạng SS · Khởi điểm Tím)
   * Mốc Lam (Mở sẵn khi nhận SS): Mở Hấp Thụ Hư Không — Tiêu diệt địch bằng kỹ năng hồi lại 3% thanh năng lượng.
   * Mốc Tím (Sẵn có): Mở Cộng Hưởng Hắc Ám — Nếu trang bị từ 3 món SSS trở lên, giảm 10% thời gian hồi chiêu kỹ năng chủ động của Phi công.
   * Mốc Tím+5: Mở Chúa Tể Bóng Đêm — Khi kích hoạt kỹ năng chủ động, triệu hồi 2 ảnh phân thân tự động bắn hỗ trợ trong 4,0s (gây 35% sát thương đạn chính, không vượt trần lực chiến 15%).
10. Số phận của Lõi Siêu Hợp sau V307
 * Vai trò mới: Sau khi rút khỏi nâng cấp Level phi công, Lõi Siêu Hợp trở thành tài nguyên chuyên biệt cao cấp (Endgame) cho 2 tính năng:
   * Cây Tiềm Năng (giữ nguyên): Nâng các nút lõi trung tâm và mở khóa nhánh tiềm năng tầng cao.
   * Đột phá Kỹ năng Phi công ở 2 mốc lớn (Tím và Tím+5): Cần thêm một lượng nhỏ Lõi Siêu Hợp (2 lõi ở mốc Tím, 5 lõi ở mốc Tím+5 — đúng bằng tổng 7 lõi của hệ cũ, chuyển từ bắt buộc theo Level sang gắn với mốc mở khóa kỹ năng bậc cao để giữ giá trị kinh tế cho Lõi Siêu Hợp).
 * Quy đổi: Không cần quy đổi Lõi Siêu Hợp sang ◈ hay Đá XP. Toàn bộ Lõi Siêu Hợp người chơi đang giữ trong túi vẫn nguyên giá trị sử dụng.
Dữ liệu JSON chuẩn cho mã nguồn (Phần 2 - pilot67)
{
  "version": "V307_PILOT_REWORK",
  "level_alloy_cost": {
    "min_level": 1,
    "max_level": 60,
    "brackets": [
      { "from": 1, "to": 19, "base": 200, "step": 30 },
      { "from": 20, "to": 39, "base": 900, "step": 45 },
      { "from": 40, "to": 59, "base": 2000, "step": 150 }
    ],
    "total_alloy_1_to_60": 108450
  },
  "tiers": [
    { "id": "white", "max_lv": 10, "alloy": 0, "shards": 0, "cores": 0, "stat_mult": 1.00 },
    { "id": "green", "max_lv": 15, "alloy": 2000, "shards": 15, "cores": 0, "stat_mult": 1.20 },
    { "id": "blue", "max_lv": 20, "alloy": 5000, "shards": 25, "cores": 0, "stat_mult": 1.45, "milestone": 1 },
    { "id": "blue_1", "max_lv": 25, "alloy": 7000, "shards": 20, "cores": 0, "stat_mult": 1.60 },
    { "id": "blue_2", "max_lv": 30, "alloy": 9500, "shards": 25, "cores": 0, "stat_mult": 1.75 },
    { "id": "blue_3", "max_lv": 35, "alloy": 12000, "shards": 30, "cores": 0, "stat_mult": 1.95 },
    { "id": "purple", "max_lv": 40, "alloy": 18000, "shards": 50, "cores": 2, "stat_mult": 2.30, "milestone": 2 },
    { "id": "purple_1", "max_lv": 45, "alloy": 22000, "shards": 35, "cores": 0, "stat_mult": 2.55 },
    { "id": "purple_2", "max_lv": 50, "alloy": 27000, "shards": 45, "cores": 0, "stat_mult": 2.85 },
    { "id": "purple_3", "max_lv": 55, "alloy": 33000, "shards": 55, "cores": 0, "stat_mult": 3.20 },
    { "id": "purple_4", "max_lv": 58, "alloy": 40000, "shards": 70, "cores": 0, "stat_mult": 3.60 },
    { "id": "purple_5", "max_lv": 60, "alloy": 55000, "shards": 100, "cores": 5, "stat_mult": 4.10, "milestone": 3 }
  ],
  "pilots": {
    "lam_phuong": {
      "rank": "A", "start_tier": "white",
      "passive_values": [15, 18, 20, 23, 25, 28, 31, 34, 36, 39, 42, 45],
      "milestones": {
        "blue": { "id": "wind_step", "move_speed_pct": 12, "duration": 2.0 },
        "purple": { "id": "flash_charge", "skill_cd_reduce_on_full": 1.5 },
        "purple_5": { "id": "graze_master", "graze_count": 3, "window": 4.0, "shield_layers": 1, "cd": 15.0 }
      }
    },
    "ha_vy": {
      "rank": "A", "start_tier": "white",
      "passive_values": [1.0, 1.1, 1.3, 1.4, 1.5, 1.7, 1.8, 2.0, 2.1, 2.2, 2.4, 2.5],
      "milestones": {
        "blue": { "id": "heat_pulse", "clear_bullet_radius": 180 },
        "purple": { "id": "thrill_extend", "kill_elite_extend_sec": 0.8, "max_per_wave": 1 },
        "purple_5": { "id": "overdrive_fire", "fire_rate_pct": 15, "duration": 2.0 }
      }
    },
    "kieu_an": {
      "rank": "A", "start_tier": "white",
      "passive_values": [18.0, 17.2, 16.5, 15.8, 15.0, 14.2, 13.5, 12.8, 12.2, 11.6, 11.0, 10.5],
      "milestones": {
        "blue": { "id": "repulse_shell", "knockback_radius": 150 },
        "purple": { "id": "emergency_regen", "on_break_cd_reduce": 3.0, "internal_cd": 25.0 },
        "purple_5": { "id": "mobile_fortress", "cc_resist_with_shield_pct": 8 }
      }
    },
    "thien_lam": {
      "rank": "S", "start_tier": "blue",
      "passive_values": [10, 11, 13, 14, 15, 17, 18, 20, 21, 22, 24, 25],
      "milestones": {
        "blue": { "id": "hunter_mark", "homing_accuracy_pct": 20 },
        "purple": { "id": "weakpoint_pierce", "interval": 8.0, "boss_cur_hp_pct": 1.2, "atk_cap_pct": 200 },
        "purple_5": { "id": "boss_executioner", "boss_hp_below_pct": 25, "skill_dmg_pct": 10 }
      }
    },
    "bao_ngoc": {
      "rank": "S", "start_tier": "blue",
      "passive_values": [15, 16, 18, 19, 20, 22, 23, 25, 26, 27, 29, 30],
      "milestones": {
        "blue": { "id": "survival_field", "hp_threshold": 2, "bullet_slow_pct": 35, "duration": 3.0, "cd": 30.0 },
        "purple": { "id": "iron_will", "low_hp_magnet_pct": 20 },
        "purple_5": { "id": "unyielding", "cheat_death_charges": 1, "invuln_sec": 1.5 }
      }
    },
    "moc_mien": {
      "rank": "S", "start_tier": "blue",
      "passive_values": [20, 22, 25, 27, 29, 31, 34, 36, 38, 40, 42, 45],
      "milestones": {
        "blue": { "id": "bio_magnet", "pickup_radius": 220 },
        "purple": { "id": "purify", "cleanse_debuff_on_heal": true },
        "purple_5": { "id": "overheal_shield", "max_temp_shield_hp_pct": 15, "duration": 8.0 }
      }
    },
    "han_suong": {
      "rank": "SS", "start_tier": "purple",
      "passive_values": [12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 26, 27],
      "milestones": {
        "blue": { "id": "frost_warhead", "slow_pct": 20, "duration": 2.0 },
        "purple": { "id": "missile_barrage", "every_n_salvos": 5, "extra_missiles": 2, "dmg_ratio": 0.5 },
        "purple_5": { "id": "absolute_zero", "freeze_chance": 0.15, "freeze_sec": 1.2, "boss_fire_slow_pct": 15 }
      }
    },
    "tu_da": {
      "rank": "SS", "start_tier": "purple",
      "passive_values": [3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.5, 5.8, 6.1, 6.5],
      "milestones": {
        "blue": { "id": "void_siphon", "energy_on_skill_kill_pct": 3 },
        "purple": { "id": "dark_resonance", "req_sss_count": 3, "pilot_skill_cd_reduce_pct": 10 },
        "purple_5": { "id": "shadow_lord", "clones": 2, "duration": 4.0, "clone_dmg_ratio": 0.35 }
      }
    }
  }
}

