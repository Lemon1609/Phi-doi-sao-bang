# ĐỀ CHO GPT · NỀN TRẬN 3 LỚP THEO CHƯƠNG (V192)

**Mục đích:** mỗi chương có cảnh nền riêng, trôi chậm theo 3 tầng (xa / giữa / gần) để tạo chiều sâu.
- Chương 1–7 hiện chỉ có nền sao vẽ bằng mã, tức đổi màu nhưng không có cảnh.
- Chương 8, 9, 10 đã có 1 tranh nền (`bg_ch8`, `ch9_bg`, `bg_ch10_abyss`), nhưng chỉ 1 lớp.

## Luật màu (quan trọng nhất)
Nền phải **tối và ít tương phản**, để 4 thứ sau luôn nổi rõ:

| Vật | Màu |
|---|---|
| Đạn địch | đỏ #FF334F / hồng #F50057, tâm trắng |
| Sao điểm | vàng dịu #D5A13B |
| Huy chương | xanh ngọc lục giác |
| Đạn ta | tím / lam sáng |

Từ đó, quy định cho nền:
- Độ sáng trung bình mỗi lớp **≤ 25%**. Không có mảng nào sáng hơn 45%.
- **Không dùng đỏ tươi, hồng, vàng sáng hay xanh ngọc sáng** ở mảng lớn. Màu chương chỉ dùng ở dạng tối, ngả xám.
- Không vẽ tàu, quái, người, chữ, logo, giao diện.
- Không có vòng tròn hay vành sáng (luật trận: không vòng quanh tàu/quái).

## 10 chương

Dùng màu chủ đạo ở cột "Nền / ánh" làm gốc, giữ đúng tông.

| Ch. | Tên (game mình) | Hiểm họa | Nền / ánh | Gợi ý cảnh |
|---|---|---|---|---|
| 1 | Vành Đai Thức Tỉnh | trinh sát | #081923 / #23596C | Rìa hệ sao, tinh vân lam nhạt, trạm phao tín hiệu hỏng ở xa |
| 2 | Mỏ Sao Đổ Nát | thiên thạch | #231B15 / #805522 | Vành đá vụn, giàn khoan mỏ gãy, bụi nâu |
| 3 | Mắt Bão Ion | bão ion | #191327 / #783991 | Mây ion tím sẫm xoáy, tia sét **mờ, rất xa** |
| 4 | Vườn Máy Tĩnh Lặng | bầy máy | #0B2420 / #338451 | Khung kim loại phủ rêu-máy lục sẫm, cột tháp im lặng |
| 5 | Biển Băng Vỡ | băng giá | #102337 / #5A9EB6 | Mảng băng trôi, tinh thể lam xám |
| 6 | Lò Rèn Thiên Không | pháo đài | #2B141A / #9C392D | Xưởng đúc khổng lồ, ánh lò **đỏ sẫm nâu**, không đỏ tươi |
| 7 | Vực Tối Không Tên | bão ion | #1C142C / #7145AA | Khoảng trống tím đen, mảnh vỡ hình học trôi |
| 8 | Bình Minh Cuối Cùng | pháo đài | #252018 / #B28A43 | Chỉ cần **lớp giữa + lớp gần**, khớp tông tranh `bg_ch8` có sẵn |
| 9 | Tinh Vân Đen | — | theo `ch9_bg` | Chỉ cần **lớp giữa + lớp gần** |
| 10 | Vực Thẳm Hư Không | — | theo `bg_ch10_abyss` | Chỉ cần **lớp giữa + lớp gần** |

Chương 8–10: Claude sẽ gửi kèm 3 tranh nền có sẵn để GPT khớp màu.

## Quy cách 3 lớp

| Lớp | Tệp | Cỡ | Nội dung | Ghép nối |
|---|---|---|---|---|
| Xa | `ch{N}_xa.webp` hoặc `.png` | 720×1560, RGB (không trong suốt) | Bầu trời + tinh vân + vật thể rất xa | **Nối liền trên–dưới** (mép trên khớp mép dưới) |
| Giữa | `ch{N}_giua.png` | 720×1560, RGBA nền trong suốt | 3–5 vật thể cỡ vừa (giàn, đá, khối băng…) rải thưa, phần lớn trong suốt | Nối liền trên–dưới |
| Gần | `ch{N}_gan.png` | 720×1560, RGBA nền trong suốt | 2–3 mảnh to, mờ nhòe như ở sát ống kính, chỉ ở **mép trái/phải** (không đè vào giữa màn, nơi tàu bay) | Nối liền trên–dưới |

**Độ đậm:**
- lớp giữa: phần có hình phủ ≤ 30% diện tích;
- lớp gần: phủ ≤ 15%, độ trong 40–60%.

**Hướng:** màn dọc, tàu bay lên, nền trôi xuống. Ánh sáng từ trên chiếu xuống.

**Phong cách:** cùng họ tranh với các tranh GPT đã vẽ cho game (vũ trụ khoa học viễn tưởng, chi tiết kim loại, sắc nét), nhưng dịu hơn vì là nền.

## Giao hàng
- Đợt 1: `NEN_CHUONG_V192_A.zip` gồm chương 1–5 (15 tệp).
- Đợt 2: `NEN_CHUONG_V192_B.zip` gồm chương 6–10 (3 + 3 + 2 + 2 + 2 = 12 tệp).
- Không cần ảnh xem trước. Claude tự ghép, cho trôi theo 3 tốc độ, chụp trong trận có đạn đỏ và sao vàng để duyệt độ nổi.
