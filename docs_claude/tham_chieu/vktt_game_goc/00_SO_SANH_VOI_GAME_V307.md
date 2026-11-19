# VKTT game gốc (chủ dự án gửi 19/11/2026) ↔ Phi Đội Sao Băng V307

Tư liệu: `bai_viet_vktt_ky_nang.txt`, `anh_01..24.png` (01–05 đội hình phi công / đá nội tại / trang bị ép xung, 06–07 bảng lên đời + tăng cấp VKTT, 08–11 bộ chip 6 món của 4 VKTT, 12–24 bài hướng dẫn Mô-đun Siêu Chiều), `video_chip.mp4` (màn Phối mô-đun).

## Đã có trong game (V72a `ult72.js`, V72b `chip72.js`, làm theo thiết kế GPT 22/10)
| Game gốc | Trong game |
|---|---|
| 4 VKTT: Pháo đài · Thế giới · Săn sao (lưỡi cưa) · Lưới điện laser | Đủ 4, đúng tên kỹ năng cơ bản / tối thượng (Mái vòm sắt, Rối loạn thời gian, Vòng sao hỗn loạn, Bốn neo điện) |
| 16 nấc Trắng → Lục → Lam → Lam+1..3 → Tím → Tím+1..3 → Huyền thoại → +1..5, mỗi 10 cấp lên đời | Đúng 16 nấc (`ULT72.rn`), cấp tối đa 10/20/…/100 |
| Kỹ năng tối thượng mở ở Huyền thoại, sạc theo số lần dùng / item nhặt, chủ động | Có (`sk.*.u.ev` 8→5 lần, nút trong trận `#ult72-btn`) |
| Chỉ ô chính có kỹ năng tối thượng, ô phụ chỉ chỉ số | 1 Chủ chiến + 2 Trợ chiến 25 % |
| Mô-đun: 6 ô (2 vuông Hỏa lực · 2 lục giác Cấu trúc · 2 tròn Mạch liên kết), chỉ lắp đúng loại ô | Đúng (`CHIP72.slots`) |
| Phẩm chip 5 bậc + bản Giao ước (Nguyên mẫu / Chiến lược) + Tuyệt mật, chỉ bản Giao ước tính bộ | 7 phẩm, đúng quy tắc |
| Tham số chủ + 1–3 dòng khuếch đại ngẫu nhiên, Luyện 20 lần (tinh thể + vàng), Tái tạo/tẩy dòng 30, Phân giải, Sản xuất có bảo hiểm, cấp rơi theo tiến độ | Có đủ (Luyện 20×, Tái tạo 30× khóa 1 dòng, bảo hiểm 10 lần, cấp rơi 1–5) |
| 2 bộ giao ước mỗi VKTT, thưởng 3 / 6 món (ví dụ Pháo đài: +1/+2 lần chịu đòn; −1 lần cần để kích tối thượng) | 8 bộ (2/vũ khí), thưởng 3 và 6 món |

## Khác / chưa có
1. **Hình VKTT lên đời**: game gốc đổi hình theo nấc. Game đang dùng tranh cũ có bản `_legend` / `_f1..5`; V307 vừa thay bằng 4 tranh GPT (1 hình cho mọi nấc, quầng sáng đổi màu theo nấc). Cần GPT vẽ thêm dạng tiến hóa → tin `docs_claude/de_xuat_cho/GUI_GPT_V307_VKTT_TIEN_HOA_4_DANG.txt`.
2. **Chi phí lên đời / tăng cấp**: game gốc 100–500 mảnh, 5–50 linh kiện ABCD, 100k–900k vàng mỗi lần lên đời; tăng cấp 40–310 Thẻ EXP + 2,5k–20k vàng mỗi cấp. Game đang: mảnh 40–350, linh kiện 8–80, ◈ 200–3.000; mỗi cấp ◈ 40–130 + ⬢ 2–11 (⬢ giờ = ◈×15). Thang ◈ của game nhỏ hơn vàng game gốc nhiều lần nên không chép số; nếu muốn chỉnh thì nhờ Gemini quy đổi theo thu nhập ◈ thực tế (đo được bằng `do_thu_nhap.py`).
3. **Linh kiện 4 loại A/B/C/D** (game gốc) — game đang dùng 1 loại linh kiện.
4. **Thẻ EXP VKTT** riêng (game gốc) — game dùng ◈ + ⬢.
5. **5 VKTT mới của Gemini** (Đầu Đạn Hủy Diệt, Khiên Cánh Thiên Thần, Lõi Hồi Sinh Phượng Vũ, Lõi Hấp Dẫn Lượng Tử, Ma Trận Băng) không có trong game gốc theo tư liệu này; tranh GPT đã có sẵn trong `src/vktt307img/`.
6. Phi công 4 ô + Lõi phi công (cộng hưởng), đá nội tại PVP theo chiến cơ / giáp / vũ khí / tàu con, trang bị ép xung theo tuần: tư liệu để tham khảo, chưa đối chiếu chi tiết.
