# Rà soát hình cũ trong game · V309 (20/11/2026)

Cách đo:
1. Kiểm kê mọi ảnh nhúng (data URI) theo khối script/style: `/home/claude/sc/inv309.py <html> <ra.json>`.
2. Ghi ảnh thật sự hiện ra màn hình khi đi 45 màn + 12 trận (chương 1–10, boss) + 7 robot + Vô tận + kết quả: `/home/claude/sc/trace_walk.py` (móc `drawImage` lan theo canvas trung gian + ảnh nền CSS của phần tử đang hiện).
3. Thay ảnh nghi cũ bằng màu hồng đặc rồi chụp lại các màn / trận, tìm điểm ảnh hồng (`/tmp/magenta.html`, `/home/claude/sc/mag_tran.py`).

## Đã sửa
| Hình cũ còn hiện | Ở đâu | Cách sửa |
|---|---|---|
| Thân tàu tiến hóa cũ (atlas `fighters_evo2` / `fighters-v28`) | TRONG TRẬN với người chơi có skin tiến hóa (skin69 tự mặc cho ai từng cường hóa +1…+5), Tủ skin | `skin69.js`: skin = thân SHIP118 hiện tại + lọc màu (Ngọc Lam / Bạch Kim / Hoàng Kim / Cầu Vồng). Tắt `window.SKIN309=false` |
| Ảnh nhỏ chiến cơ từ atlas cũ | Màn Hợp thể (2 chiến cơ thành phần), các ô dùng `thumb()` của Hub | rep `function thumb(i)` → SHIP118 theo bậc. Tắt `window.THUMB309=false` |
| Cánh chiến giáp nữ V132 (`canh132`) chồng lên robot cơ khí mới | Robot khi Bạo Tẩu, sân khấu sảnh | `v132.js` không vẽ (bật lại `window.WING309=true` + dựng `WING_CU=1`) |
| Bộ mảnh lửa/sét Bạo Tẩu cũ (`btfx218-art`, 15 MB) | Không còn hiện (aura307 thay toàn bộ lớp back/front) | Không nhúng nữa (dựng `BTFX_CU=1` để nhúng lại) |

Kết quả: bản dựng 97,4 → 80,1 MB; chụp lại 5 tàu × (trận, Bạo Tẩu, kết quả, sảnh) không còn điểm ảnh của atlas cũ.

## Còn lại (đã đo là hiện, cùng phong cách nhưng là bản cũ hơn — chờ chủ dự án chọn có vẽ lại không)
- Quái thường: atlas `foes-v2-asset` (24 mẫu, V2) — hiện ở mọi trận.
- Boss chương: `boss82-art` (7 boss, GPT V82) + `boss78-art`, ảnh chân dung boss trên bản đồ.
- Biểu tượng chức năng `icon74` (nhiệm vụ, thành tựu, điểm danh, vòng quay, cài đặt, quà, tuần tra, viễn chinh…), nút trong trận `skin15` (tên lửa / bom / kỹ năng), nền kho `--u15-bgkho`, nền bản đồ `--u15-bgmap`.
- Atlas cũ chỉ còn làm khung/dự phòng (không hiện): `fighters-v28`, `fusions-v27` (robot cũ, chỉ hiện nếu SSSGame lỗi), `gear-r11`, `tier69-art` (3 MB), `ship83-art`, `ult72-art` (1,45 MB, VKTT cũ — vktt307 đã thay), `sk121-art`, `ui19-*`. Có thể bỏ nhúng sau khi kiểm từng đường dự phòng.
