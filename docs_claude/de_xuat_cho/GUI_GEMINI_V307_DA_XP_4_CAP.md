# GỬI GEMINI · CHIA ĐÁ XP THÀNH CÁC LOẠI RIÊNG (V307 · LƯỢT 4)

Chủ dự án muốn chia lại Đá XP. Công thức XP cấp (50 + 6L), hoàn 85 %, bảng XP gốc 12 khung, phi công dùng ◈: **giữ nguyên lượt 3**. Chỉ làm lại phần đá.

## Yêu cầu của chủ dự án
1. Đá XP là **các loại riêng** (kho riêng từng loại), mỗi loại một lượng XP khác nhau.
2. **Tăng dần theo ải**: ải càng sâu rơi loại càng cao.
3. **Ải boss rơi loại cao hơn** ải thường và ải mini boss.
4. **Loại cao nhất chỉ có ở phó bản (hầm ngục), sự kiện, phần thưởng** (điểm danh, mùa giải, nhiệm vụ ngày/tuần, quà), không rơi ở ải thường.

## Cần bạn trả
A. Số loại (gợi ý 4: I · II · III · IV), tên, XP mỗi viên.
B. Bảng rơi theo dải ải (1–10, 11–30, 31–50, 51–70, 71–90, 91–115, 116–140, 141+), tách **ải thường / mini boss / boss**: loại nào, số lượng, xác suất. Giữ **XP kỳ vọng mỗi lượt ở ải thường ≈ bảng lượt 3** (300 · 488 · 630 · 780 · 900 · 1.020 · 1.485 · 1.650); boss cao hơn ải thường cùng dải (nêu %), mini boss ở giữa.
C. Nguồn loại cao nhất: hầm ngục (mỗi cấp độ khó), sự kiện tuần, điểm danh, mùa giải, nhiệm vụ: số lượng mỗi nguồn.
D. Quy đổi tồn kho (xem mục dưới).

## Vấn đề cần bạn quyết cùng (Claude phát hiện khi lắp)
"Đá nâng cấp ⬢" cũ **không chỉ dùng để nâng Level**, mà còn đang được trừ ở:
- **Tiến khung** (V70): mỗi lần đổi khung Lục/Lam/Tím: chiến cơ 40 / 80 / 150 đá, trang bị 25 / 60 / 110 đá.
- **Nâng cấp bản sao** (Evo82): mỗi cấp ⌈lv/13⌉ đá + 19·lv ◈, và đá khi nâng khung bản sao.
- **Cây tiềm năng phi công**: 25·l, 40·l, 60·l đá mỗi nút (nút cuối 500 đá).
- **Vũ khí tối thượng** (ult72) và **cửa hàng trao đổi** (trade67) cũng trừ đá.

Claude đề xuất (chủ dự án chưa chốt): **giữ "Đá nâng cấp ⬢" làm tiền riêng cho các việc trên**, Đá XP chỉ để nâng Level. Khi đó mỗi ải rơi **cả hai**: hãy cho tỉ lệ đá ⬢ còn rơi mỗi dải ải (bản đo trước đây: ải 2–3 = 22, ải 25 = 34, ải 45 = 36, ải 65 = 48, ải 85 = 50, ải 105 = 62, ải 125–140 = 96 đá/lượt; hầm boss 8n đá + 2n hợp kim phụ), đủ cho các việc trên nhưng không thừa vì Level đã sang Đá XP.
Tồn kho cũ: đề xuất **giữ nguyên số đá ⬢** (vẫn dùng được) và **tặng thêm** một lượng Đá XP bù cho phần trước đây dùng nâng Level; bạn cho công thức.

Trả JSON đầy đủ.
