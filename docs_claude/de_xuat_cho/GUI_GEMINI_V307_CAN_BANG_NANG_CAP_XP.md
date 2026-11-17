# GỬI GEMINI · CÂN BẰNG NÂNG CẤP LEVEL KIỂU MỚI (V307)

Mình (chủ dự án) đã chốt cơ chế, nhờ bạn tính **số liệu cân bằng**. Mã nguồn sẽ đọc bảng bạn đưa; Claude không tự đặt số.

## Cơ chế mới (đã chốt)
- Nâng Level bằng **XP**. Chọn món cần nâng → gắn tối đa **5 vật liệu** (là các trang bị khác bị tiêu hao, **mất hẳn, không hoàn**) và/hoặc **Đá XP** → thanh XP chạy, bảng "hiện tại → sau".
- **Bỏ ◈ khỏi nâng cấp.** Đá nâng cấp cũ đổi thành Đá XP (theo tỉ lệ bạn đề ra). Các ải rơi Đá XP.
- Không thêm nguồn kim cương, không tiền thật. Món đang mặc/khóa không được làm vật liệu.
- Tiến khung (Trắng→Lục→Lam→Tím…, trần 25/35/45/50/55/60/75/80/85/90/95/100) giữ nguyên, **không** thuộc phạm vi này.

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
6. Kiểm: người chơi không thể "đấu giá" lên max nhanh hơn hệ cũ quá ±15%.
