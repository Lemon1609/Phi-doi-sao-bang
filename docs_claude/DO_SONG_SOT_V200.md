# ĐO KHẢ NĂNG SỐNG SÓT · V200 (Claude, 07/11/2026; Gemini đề xuất cách đo ở rà soát V199)

**Cách đo** (`claude_tools/do_dac/t199_survive.py`):
- Tài khoản mẫu từng mốc (bảng của t190), bậc chiến cơ đúng tường: ải 20/60 thường, ải 100 S, ải 140–200 SS.
- **Không bất tử.** Tàu né đơn giản: x = W/2 + 110·sin(1,8 t), đứng gần đáy, tự bắn. 90 giây ở ải S, gồm quái thường rồi boss.
- Game trừ máu **trễ** sau `damage()`, nên đo bằng cách theo dõi máu + khiên mỗi 50 ms. Máu dưới 30% thì nạp lại để đo trọn ải.
- Né kiểu này kém hơn người thật, nên số đòn trúng mỗi phút là **mức xấu**. Nhưng "mất mỗi đòn" và "đòn chịu được" thì không phụ thuộc cách né.

| Ải | Bậc | Lực chiến / đề nghị | Máu + khiên | Mất mỗi đòn | Đòn chịu được | Mục tiêu Gemini | Đạn/phút (thường · boss) | Đạn trên màn tối đa | Trúng/phút (quái thường) |
|---|---|---|---|---|---|---|---|---|---|
| 20 | thường | 1.086 / 1.100 | 11,3 | 0,99 | **11,4** | 13–16 | 258 · 663 | 47 · 109 | 1,9 |
| 60 | thường | 2.083 / 2.000 | 17,4 | 2,2 | **7,9** | 13–16 | 537 · 995 | 78 · 105 | 5,9 |
| 100 | S | 4.055 / 3.700 | 28,2 | 3,6 | **7,9** | 11–13 | 709 · 409 | 102 · 87 | 6,4 |
| 140 | SS | 12.163 / 11.310 | 53,2 | 5,1 | **10,5** | 11–13 | 541 · 709 | 53 · 48 | 2,4 |
| 180 | SS | 19.280 / 18.740 | 65,2 | 9,5 | **6,9** | 10–12 | 457 · 322 | 46 · 48 | 3,3 |
| 200 | SS | 20.928 / 20.610 | 74,3 | 12,0 | **6,2** | 10–12 | 429 · 507 | 48 · 48 | 4,9 |

## Nhận xét
1. **Số đòn chịu được thấp hơn mục tiêu ở hầu hết các mốc.** Ải 60–100 khoảng 8 đòn (mục tiêu 11–16); ải 180–200 chỉ 6–7 đòn (mục tiêu 10–12). Ải 140 (10,5) gần đạt nhất.
2. **Sát thương mỗi đòn tăng nhanh hơn máu:** ải 100 → 200 máu + khiên tăng ×2,6, sát thương mỗi đòn tăng ×3,4. `enemyScale` chỉ tăng 1,60 → 2,08; phần còn lại đến từ các hệ số khác (hiểm họa chương, đạn boss mạnh hơn).
3. **Từ ải 140 có trần khoảng 48 viên đạn trên màn** (ải 20–100 lên tới 78–109). Pha boss ải 140–200 có 320–710 đạn/phút nhưng bot né đơn giản **không trúng đòn nào**: đạn boss cuối game tập trung, né ngang được. Nguy hiểm thật nằm ở **pha quái thường** (trúng 3–5 đòn/phút).
4. Người chơi thật né tốt hơn bot, nhưng chỉ cần 6–7 đòn là chết ở ải 180–200 thì một pha đông quái có thể kết thúc ván.

## Câu hỏi cho Gemini
- Giữ mục tiêu 10–12 đòn cho ải 160–200? Nếu giữ, chọn một trong hai cách:
  - (a) giảm sát thương mỗi đòn ở ải 160–200 khoảng 35–40%;
  - (b) tăng máu / giáp theo cấp nhanh hơn.

  Claude đề xuất (a), vì không đổi lực chiến hay kinh tế.
- Ải 60–100 (8 đòn so với mục tiêu 11–16): có cần chỉnh không, hay chấp nhận vì có buff hồi máu và khiên rơi trong trận?
