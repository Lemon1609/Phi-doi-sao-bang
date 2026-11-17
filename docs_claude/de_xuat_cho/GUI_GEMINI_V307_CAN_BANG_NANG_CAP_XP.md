# GỬI GEMINI · CÂN BẰNG NÂNG CẤP KIỂU MỚI: TRANG BỊ, CHIẾN CƠ, PHI CÔNG (V307)

Mình (chủ dự án) đã chốt cơ chế, nhờ bạn tính **số liệu cân bằng**. Mã nguồn sẽ đọc bảng bạn đưa; Claude không tự đặt số.

## Cơ chế mới (đã chốt)
- Nâng Level bằng **XP**. Chọn món cần nâng → gắn tối đa **5 vật liệu** (là các trang bị khác bị tiêu hao, **mất hẳn, không hoàn**) và/hoặc **Đá XP** → thanh XP chạy, bảng "hiện tại → sau".
- **Bỏ ◈ khỏi nâng cấp.** Đá nâng cấp cũ đổi thành Đá XP (theo tỉ lệ bạn đề ra). Các ải rơi Đá XP.
- Không thêm nguồn kim cương, không tiền thật. Món đang mặc/khóa không được làm vật liệu.
- Tiến khung (Trắng→Lục→Lam→Tím…, trần 25/35/45/50/55/60/75/80/85/90/95/100) giữ nguyên, **không** thuộc phạm vi này.

## Lưu ý khi tính
- **Chủ dự án chốt: chiến cơ cũng nâng Level bằng XP** (cùng hệ với trang bị). Chiến cơ không có bản trùng trong túi như trang bị, nên đề xuất vật liệu XP cho chiến cơ (Đá XP; có dùng bản sao chiến cơ dư làm vật liệu không?).
- Đá nâng cấp cũ hiện còn được tặng ở nhiệm vụ, mùa giải, ải chương 10, hầm ngục: các nguồn này đổi sang Đá XP theo tỉ lệ bạn đề ra.
- Trang bị rơi ra ở ải hiện nay chủ yếu dưới dạng phôi; phôi Trắng/Lục tự phân giải thành mảnh. Hãy đề xuất: món nào thành vật liệu XP, món nào vẫn phân giải.
- Phôi dùng để tiến khung cũng mất hẳn khi dùng, không hoàn.

## Số đo của hệ CŨ (bậc cơ bản, từ mã)
Mỗi cấp L→L+1: ◈ = 20+3·L (×0,92 từ hạng Vô Tận ≥2); đá = 2+⌊L/5⌋, cộng 5·(1+bậc) ở cấp mốc (L+1 chia hết 5).

| Cấp | ◈ | Đá | ◈ cộng dồn từ Lv1 | Đá cộng dồn |
|---|---|---|---|---|
| 1→2 | 23 | 2 | 23 | 2 |
| 5→6 | 35 | 3 | 145 | 16 |
| 10→11 | 50 | 4 | 365 | 37 |
| 24→25 | 92 | 11 | 1380 | 123 |
| 25→26 | 95 | 7 | 1475 | 130 |
| 34→35 | 122 | 13 | 2465 | 208 |
| 44→45 | 152 | 15 | 3850 | 313 |
| 49→50 | 167 | 16 | 4655 | 373 |
| 59→60 | 197 | 18 | 6490 | 508 |
| 74→75 | 242 | 21 | 9805 | 748 |
| 99→100 | 317 | 26 | 16830 | 1248 |

## Cần bạn trả (bảng số, dạng JSON/bảng)
1. **XP cần để lên mỗi cấp** (1→100), sao cho tổng chi phí tương đương hệ cũ (quy đổi ◈ và đá về XP, nêu tỉ lệ).
2. **XP một trang bị cho khi làm vật liệu**, theo khung màu (Trắng…Tím+5) và level của nó (kèm hệ số đã đầu tư).
3. **Đá XP**: các cỡ (nhỏ/vừa/lớn) và XP mỗi viên; **tỉ lệ rơi theo dải ải / mini boss / boss / quét**.
4. **Quy đổi tồn kho**: 1 đá cũ = ? Đá XP; ◈ không đổi (vẫn dùng việc khác).
5. Ngưỡng **cảnh báo dư XP** và cảnh báo khi chọn vật liệu Tím trở lên.
6. Kiểm: thời gian (số ải) để một món lên Lv100 không lệch quá ±15% so với hệ cũ.

---

# PHẦN 2 · PHI CÔNG (chủ dự án chốt hướng, nhờ bạn hoàn thiện số và kỹ năng)

## Cơ chế mới
- **Nâng Level chỉ tốn ◈ hợp kim** (đơn vị tiền tệ chính của game, chủ dự án gọi là "vàng"). Bỏ đá và Lõi Siêu Hợp khỏi nâng level.
- **Tiến bậc tốn ◈ + mảnh đúng phi công**, cần đạt trần cấp của bậc hiện tại. Học theo tiến bậc của tàu và trang bị (Trắng → Lục → Lam → Lam+1..+3 → Tím → Tím+1..+5).
- **Mỗi bậc nâng kỹ năng và nội tại RÕ RỆT**: không chỉ tăng một con số đều đặn, mà có mốc mở hiệu ứng mới (ví dụ ở Lam, Tím, Tím+5).

## Hiện trạng (đọc từ mã `src/pilot67.js`)
- 8 phi công, hạng A/S/SS; A bắt đầu ở Trắng, S ở Lam, SS ở Tím.
- 12 bậc, trần cấp: 10/15/20/25/30/35/40/45/50/55/58/60. Tiến bậc (◈ / mảnh): Lục 2.000/15 · Lam 5.000/25 · Lam+1 7.000/20 · Lam+2 9.500/25 · Lam+3 12.000/30 · Tím 18.000/50 · Tím+1 22.000/35 · Tím+2 27.000/45 · Tím+3 33.000/55 · Tím+4 40.000/70 · Tím+5 55.000/100.
- Hệ số chỉ số theo bậc m: 1,00 · 1,20 · 1,45 · 1,60 · 1,75 · 1,95 · 2,30 · 2,55 · 2,85 · 3,20 · 3,60 · 4,10.
- Level hiện tốn ◈ + đá (cấp 39→40 cần thêm 2 lõi, 59→60 cần 5 lõi). Giá ◈ mỗi cấp, với n = ⌈(lv+1)/2⌉: n ≤ 10: (300+80n)×0,6 · n ≤ 20: (1.200+150(n−10))×0,6 · còn lại: (3.000+300(n−20))×0,6.
- Nội tại hiện chỉ là **một con số tăng tuyến tính** từ a đến b theo 6 nấc (pt 1–6) gắn với bậc:
  Lâm Phương +15→45 % nạp Graze · Hạ Vy Bạo Tẩu +1→2,5 s · Kiều An hồi giáp mỗi 18→10,5 s · Thiên Lam +10→25 % sát thương boss · Bảo Ngọc giảm 15→30 % sát thương khi máu ≤ 2 · Mộc Miên 20→45 % hồi khi nhặt buff · Hàn Sương tên lửa nhanh 12→27 % · Tử Dạ +3→6,5 % mỗi món SSS.
- Trần đã kiểm: phi công + cây tiềm năng + 3 phụ ≤ 15 % lực chiến của bộ max. **Giữ trần này.**
- Nguồn mảnh: ngày 2, tuần 5, Vô tận, Tháp Boss (mỗi 5 tầng 5–12, mốc 50/100: 30/60).

## Cần bạn trả
7. Giá ◈ mỗi cấp mới (bỏ đá, bỏ lõi), tổng chi phí tương đương hệ cũ (quy đá và lõi ra ◈, nêu tỉ lệ).
8. Có giữ hay chỉnh bảng tiến bậc (◈ + mảnh) không.
9. Cho từng phi công: bảng nội tại theo bậc, có **2–3 mốc mở hiệu ứng mới** (ghi rõ bậc nào mở gì), số dễ đo trong game. Không vượt trần 15 % lực chiến.
10. Lõi Siêu Hợp sau khi bỏ khỏi nâng level phi công: còn dùng ở đâu (cây tiềm năng vẫn dùng lõi), có cần quy đổi không.
