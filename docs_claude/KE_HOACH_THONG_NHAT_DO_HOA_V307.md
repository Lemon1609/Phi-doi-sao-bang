# Kế hoạch thống nhất đồ họa + rà soát gameplay V307 (18/11/2026 21:37)

Nguồn: dựng lại bản V307 hiện tại (t156 14/14, t209 20/20), chụp 31 màn giao diện (`/home/claude/anh/rs307/ui/`) và 12 cảnh trong trận (`/home/claude/anh/rs307/tran/`: 6 ải ở chương 1–8, 3 boss, Bạo Tẩu, tạm dừng, hồi sinh).
Chuẩn đồ họa đã chốt: khung neon bạc–xanh B4–B11, tàu 1 (giáp bạc gờ vát, neon mảnh), nền chương 1 (độ sáng p10 ≈ 15–25, p50 ≈ 40–55 như game gốc).

## Phần A · Trong trận (ưu tiên cao nhất, người chơi nhìn nhiều nhất)
| # | Hiện trạng (đo / nhìn) | Đề xuất | Ai làm |
|---|---|---|---|
| A1 | Nền chương: ch1 p50 = 50 (đạt); ch2–7 p50 = 25–35, ch8–10 p50 = 15–21 → tối hơn hẳn, phong cách tranh khác nhau | Tăng sáng ch2–10 về cùng dải với ch1 bằng mã (`nen_ch1_tu_gpt_v307.py`); sau đó GPT vẽ lại lần lượt từng chương theo tin nền ch1 | Claude (sáng) + GPT (vẽ) |
| A2 | Thanh máu / thanh Bạo Tẩu / số P0/4 trên cùng vẽ bằng canvas kiểu cũ, lệch với khung B10 | Vẽ lại bằng ảnh B10 (`thanh_mau`, `thanh_bao_tau` đã có) | Claude |
| A3 | Băng "CẢNH BÁO NGUY HIỂM" đỏ sọc + hộp thoại cốt truyện boss kiểu cũ | Khung hộp thoại B5 + băng cảnh báo mới (xin GPT 1 ảnh băng cảnh báo) | Claude + GPT |
| A4 | Đạn chính tàu (chuỗi lục giác vàng) chiếm gần hết cột giữa, che đạn địch | Kiểm độ mờ / cỡ đạn ở bậc cao; đề xuất giảm 15–20 % độ phủ (giữ sát thương) — chờ chủ dự án xem ảnh | Claude (đề xuất) |
| A5 | Địch thường / boss nhiều kiểu vẽ khác nhau | Rà riêng từng chương, chỉ vẽ lại con lệch nhất (không vẽ lại toàn bộ) | Lập danh sách trước |
| A6 | Ảnh "tạm dừng" và "hồi sinh" chưa chụp được đúng (lệnh thử không mở) | Kiểm lại bằng tay; khung hồi sinh B6 đã có | Claude kiểm |

## Phần B · Sảnh và các màn
| # | Hiện trạng | Đề xuất |
|---|---|---|
| B1 | Hộp hướng dẫn "1/3 Bấm XUẤT KÍCH…" (TIẾP THEO / BỎ QUA) đè lên hầu hết các màn khi chụp | Kiểm xem có hiện lại sai chỗ với người chơi thật không; nếu có thì chỉ hiện ở sảnh |
| B2 | Chợ Đen, Thẻ ải, Sự kiện tuần: chữ dày, nút trắng bạc kiểu cũ | Dùng khung hàng B4 + nút B9 |
| B3 | 4 hộp thoại cũ (cố vấn adv69, phi công pl67, truyện tr67, kỹ năng sk69) chưa có khung neon | Áp khung B5 (đã có ảnh) |
| B4 | Chữ "⬢" còn 59 chỗ trong 18 tệp (nay nghĩa là ◈×15) | Đổi hết sang ◈ hoặc "Đá XP" đúng nghĩa |
| B5 | Bệ tàu ở sảnh: nền GPT đã có bệ, bệ B11 chưa dùng | Giữ như hiện tại (đã hợp) |

## Phần C · Gameplay / cân bằng (rà soát, chỉ đề xuất)
| # | Mục | Đề xuất |
|---|---|---|
| C1 | Đá XP IV chỉ rơi ở hầm ngục | Thêm vào mốc mùa giải, điểm danh ngày 7, nhiệm vụ tuần (số lượng xin Gemini duyệt) |
| C2 | 24 mốc kỹ năng phi công chưa kiểm trong trận (Thiên Lam, Hàn Sương, Tử Dạ, Kiều An) | Viết bài kiểm tự động như t209 |
| C3 | Mốc kỹ năng phi công chưa hiện trên màn phi công | Thêm dòng mô tả mốc dưới chân dung |

## Thứ tự làm đề xuất
1. **Đợt 1 (Claude tự làm, không cần tranh):** B4 (⬢), B3 (4 hộp thoại), B1 (hướng dẫn), A1 phần tăng sáng nền, A2 (HUD trên), C2, C3, A6.
2. **Đợt 2 (cần chủ dự án xem):** A4 đạn, B2 các màn chữ dày.
3. **Đợt 3 (cần GPT / Gemini):** A3 băng cảnh báo, A1 vẽ lại nền từng chương, A5 địch lệch, C1 số Đá XP IV.
Sau mỗi đợt: dựng, t156 → t209, chụp lại, báo cáo; chỉ xuất bản khi chủ dự án nói "duyệt xuất bản".
