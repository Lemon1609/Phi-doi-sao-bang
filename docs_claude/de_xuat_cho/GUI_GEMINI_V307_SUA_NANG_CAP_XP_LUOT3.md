# GỬI GEMINI · LƯỢT 3 NÂNG CẤP XP + PHI CÔNG (V307)

Lượt 2 được giữ phần lớn: công thức XP 50 + 6L (tổng 34.650), 1 ◈ = 1 XP, 1 đá cũ = 15 XP, hoàn 85 % XP đã đầu tư, bảng XP gốc 12 khung, cảnh báo dư XP (XP dư mất, chỉ cảnh báo), cảnh báo vật liệu Tím+ / Lv ≥ 15, giá ◈ ba dải cấp phi công, bảng nội tại 12 bậc. **Chủ dự án đồng ý giữ các mốc mạnh** (Bảo Ngọc miễn chết 1 lần, Thiên Lam 1,2 % máu boss). Cần sửa 5 điểm:

## 1. Thu nhập đá ĐO TRONG GAME (Claude đo bằng Playwright, phần thưởng cuối ải, chưa tính ◈ nhặt trong trận)
| Ải | Đá cũ / lượt | ◈ / lượt | Quy XP (15·đá + ◈) |
|---|---|---|---|
| 2–3 | 22 | 56–59 | ~390 |
| 5 (mini) | 11 | 66 | ~230 |
| 10 (boss) | 11 | 83 | ~250 |
| 25 | 34 | 132 | ~640 |
| 45 | 36 | 198 | ~740 |
| 65 | 48 | 264 | ~980 |
| 85 | 50 | 330 | ~1.080 |
| 105 | 62 | 396 | ~1.330 |
| 125–135 | 96 | 462–495 | ~1.900 |
| 140 (boss) | 96 | 512 | ~1.950 |
Mỗi ải cho đúng số này ở mọi lần chơi lại (3 lần đo như nhau). Chưa đo: ải > 140, hầm ngục, quét.

Bảng rơi Đá XP bạn đề xuất (18–174 XP/ải) chỉ bằng khoảng **5–15 % đá đang rơi**. Hãy làm lại bảng rơi bám theo thu nhập đá thật ở trên (đá cũ trước đây chia cho trang bị + chiến cơ + phi công; giờ phi công không dùng đá nữa, nên phần đá cho trang bị + chiến cơ có thể giảm nhẹ, nêu tỉ lệ).

## 2. Phi công: tổng đá cũ bị đếm thiếu
Từ mã: Lv1→60 tốn **88.750 ◈ + 2.142 đá** (không phải 508) + 7 lõi. Theo tỉ lệ của bạn (đá = 15 ◈, lõi = 1.500 ◈) tổng cũ ≈ **131.380 ◈**; bảng mới 108.450 ◈ đang rẻ hơn ~17 %. Chỉnh lại bảng ◈ ba dải cho đúng ±5 %.

## 3. Chiến cơ không còn mảnh
Mảnh chiến cơ đã bỏ từ V74; chiến cơ tiến bậc bằng **bản sao** (Trắng/Lục/Lam/Tím). Bỏ quy tắc "mảnh dư → Đá XP Lớn". Đề xuất: bản sao dư (khi chiến cơ đã Tím+5) có đổi ra Đá XP không, bao nhiêu.

## 4. Hạng phi công đúng (theo mã)
Lâm Phương A · Hạ Vy A · Kiều An A · Thiên Lam S · Bảo Ngọc A · Mộc Miên S · **Hàn Sương S (bắt đầu Lam)** · **Tử Dạ SS (bắt đầu Tím)**. A bắt đầu Trắng, S Lam, SS Tím. Sửa `rank` / `start_tier` trong JSON.

## 5. Chỉ dùng cơ chế game ĐÃ CÓ cho mốc kỹ năng
Game **không có**: kỹ năng chủ động của phi công, thanh năng lượng, hiệu ứng làm chậm/nhiễu lên tàu người chơi, đóng băng quái, phân thân, homing của đạn chính. Game **đã có**: Graze (nạp thanh Bạo Tẩu), Bạo Tẩu (thời gian, sát thương), bom, khiên chắn đạn, giáp/máu, tên lửa, tàu con (drone), nhặt buff + hút vật phẩm, chí mạng, sát thương boss, món SSS. Thay các mốc dùng cơ chế không có bằng cơ chế đã có, giữ mức mạnh tương đương:
- Lâm Phương Tím ("kỹ năng chủ động giảm hồi chiêu") · Kiều An Tím+5 ("kháng làm chậm") · Hàn Sương Lam + Tím+5 ("làm chậm", "đóng băng") · Tử Dạ cả 3 mốc ("năng lượng", "hồi chiêu kỹ năng", "phân thân") · Thiên Lam Lam ("homing").

Trả lại JSON đầy đủ cả 2 phần (cùng khóa như lượt 2).
