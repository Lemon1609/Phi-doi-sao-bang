# Gửi Gemini: thiết kế lại năng lượng, cánh bung Bạo Tẩu cho toàn bộ chiến cơ

Gói này gồm **3 phần dán theo thứ tự**:
1. **Phần 1**: dán một lần, kèm 3 ảnh tham khảo.
2. **Phần 2**: Gemini trả về bảng ý tưởng cho 13 tàu. Chủ dự án duyệt bảng.
3. **Phần 3**: mỗi tàu một tin, kèm ảnh `khung/tauN_than_bao_tau.png` của tàu đó.

---

## PHẦN 1 (dán một lần, kèm `tham_khao/tau4_mau_gemini.png`, `tham_khao/phong_cach_1.png`, `tham_khao/phong_cach_2_canh_bung.png`)

Chào Gemini, mình là Claude, lập trình chính và ghép đồ họa của game bắn máy bay dọc **"Phi Đội Sao Băng"** (HTML5 + APK). Chủ dự án rất thích hình Bạo Tẩu tàu 4 Thần Ma bạn vừa thiết kế (`tau4_mau_gemini.png`), nên nhờ bạn **thiết kế lại năng lượng / cánh bung Bạo Tẩu cho toàn bộ các tàu còn lại** theo cùng đẳng cấp đó.

**Học từ mẫu tàu 4 của bạn:**
- năng lượng là **lưỡi / dải sáng sắc nét có khối**, chuyển màu mượt;
- có **tia điện nhỏ, mảnh vỡ, tàn sáng** bay quanh;
- mọc ra từ các bộ phận của thân (cụm mắt, sừng), ôm theo dáng tàu;
- giáp tàu vẫn rõ khối.

Hai ảnh `phong_cach_*` là phong cách chủ dự án đã chọn.

**Cách game vẽ năng lượng (quan trọng):**
1. Game vẽ năng lượng **kiểu cộng sáng**: chỗ đen là trong suốt.
   - Muốn có khối thì dùng **viền sáng + lòng sáng mờ**.
   - Không dùng mảng màu tối, không dùng nền màu.
2. **Thân tàu được vẽ đè lên trên năng lượng.**
   - Năng lượng nên mọc từ sau mép giáp, cánh, vai, động cơ.
   - Được phép vắt qua một phần giáp (Claude sẽ tách lớp trước thân).
3. Game tự làm chuyển động (bung ra trong 0,3 s, lay, thở) và tự đổi màu cho 6 bậc tàu (Thường, Lục, Lam, Tím, Tím+, SS). Bạn chỉ cần vẽ **bậc Tím**. Hãy để **độ sáng có cấu trúc rõ** (viền sáng, lõi rực, thân mờ) để đổi màu vẫn đẹp.

**Luật bắt buộc:**
- **Phía trước mũi tàu để trống**: một hình nón khoảng 60° ngay trước mũi. Đạn của người chơi bắn ra từ đó, đạn địch bay vào từ đó.
- **Không vòng tròn hay hình khép kín quanh tàu.** Ấn chú, cung, tam giác phải **hở** (có khe).
- Đạn địch màu đỏ `#FF334F` và hồng `#F50057` **luôn phải nhìn thấy**: không có mảng đặc lớn, không có năng lượng đỏ thuần hay hồng rực ở phía trước.
- Không chữ, không logo, **không dấu hình mờ** (kể cả dấu ✦ ở góc ảnh).
- Không chép dáng hay hình bung của game Trung Quốc mà game lấy cảm hứng; chỉ học cách làm.
- Nội dung phổ thông, không gợi dục.
- Mỗi tàu **một chất liệu, một dáng cánh riêng**, không trùng nhau.

**Cỡ:**
- Ảnh khung 1024 × 1024, nền đen, thân tàu đã đặt sẵn ở giữa **đúng cỡ trong game**.
- Năng lượng rộng nhất khoảng **2–2,3 lần bề ngang thân**, nằm gọn trong khung.
- Hướng chủ yếu **ra hai bên và về sau / chéo lên hai bên**, không lấp phía trước mũi.

**Giữ thân tàu (rất quan trọng):** **không vẽ lại, không dời, không đổi cỡ thân tàu** trong ảnh khung. Claude cần trừ thân ra theo đúng vị trí điểm ảnh. Mẫu tàu 4 của bạn giữ thân rất chuẩn, cứ làm như vậy.

**Trước khi vẽ, bạn trả lời giúp một bảng ý tưởng cho 13 tàu** (xem Phần 2), để chủ dự án duyệt. Chưa vẽ ở bước này.

---

## PHẦN 2 (dán ngay sau Phần 1)

Bảng hiện tại. Bạn đề xuất lại cột **"Ý tưởng mới"** và **"Bảng màu"**, giữ tinh thần tên tàu nhưng đẹp hơn và **không trùng nhau**.

| Tàu | Thân (nhìn ảnh khung) | Chất liệu bung hiện tại | Màu năng lượng hiện tại |
|---|---|---|---|
| 1 Phượng Hoàng | (đang thiết kế lại thân, làm sau) | phượng hoàng plasma + đuôi dài | đỏ tím → cam → kem |
| 2 Cực Quang | hai thanh ray cao trên lưng | màn cực quang dọc | lục ngọc → trắng |
| 3 X-Dực Băng | thân gọn màu lam, càng trước | tinh thể băng nạp năng lượng cho súng | lam sâu → lơ băng → trắng |
| 4 Thần Ma | **bạn đã thiết kế xong** | lưỡi tinh thể + sừng lửa + điện | lục – lơ – tím |
| 5 Thự Quang | vương miện gai hồng | phiến kính bình minh + nửa vành mặt trời (vành trước mũi bị chê gắt) | hồng tím → hồng đào → kem |
| 6 U Linh | gai tối màu lam tím | cánh bóng ma tan thành điểm ảnh | lam đêm → lơ → kem |
| 7 Đao Phong | nhiều lưỡi dọc đỏ / tím / vàng | quạt phiến lưỡi | đỏ cam → hổ phách → kem |
| 8 Phần Thiên | chim săn mồi màu đỏ | lông lửa (Gemini từng chấm đẹp nhất) | cam lửa → vàng → kem |
| 9 Thiên Khung | đĩa radar trên vai, trắng ngọc | quạt quét radar + cung quỹ đạo (vừa ghép) | lam thiên thanh → trắng |
| 10 Tinh Hà | mắt lõi giữa, hai cụm giáp bên | khiên lục giác + tàu con (khiên bị chê đặc, rối mắt) | lục ngọc → trắng |
| 11 Thôn Tinh | thân tím than, vòng lõi | xoáy hút về lõi (bị chê nhỏ) | tím → tím nhạt → trắng |
| 12 Thời Không | sao vàng – lam | mảnh giáp ngưng thời gian + mặt đồng hồ hở | hổ phách → vàng → kem |
| 13 Hư Không | đen gương + crôm, đèn tím | lưỡi hái hư không (vừa ghép) | tím → tím hồng → kem |

Đang trùng màu, cần tách:
- 7 và 8 cùng cam;
- 2 và 10 cùng lục;
- 3, 6, 9 cùng lơ / lam;
- 11 và 13 cùng tím.

Tàu 10 có 3 tàu con do game tự vẽ, không cần vẽ tàu con.

Trả về bảng:

| Tàu | Ý tưởng mới (1–2 câu) | Bảng màu (mép → thân → lõi) | Năng lượng mọc từ bộ phận nào |
|---|---|---|---|

---

## PHẦN 3 (mỗi tàu một tin, sau khi chủ dự án duyệt bảng; dán kèm `khung/tauN_than_bao_tau.png`)

> Tàu **N – [tên]**. Ảnh kèm là khung 1024 nền đen, thân Bạo Tẩu bậc Tím đã đặt đúng cỡ ở giữa. Vẽ năng lượng / cánh bung theo ý tưởng đã duyệt trong bảng: **[dán dòng của tàu này]**.
> - Giữ nguyên thân: không vẽ lại, không dời, không đổi cỡ.
> - Nền đen, cộng sáng (viền sáng + lòng mờ), phía trước mũi trống 60°, không hình khép kín quanh tàu, không chữ, không dấu hình mờ.
> - Rộng nhất khoảng 2–2,3 lần thân, ra hai bên và về sau.
> - Trả về PNG 1024 × 1024, tên `tauN_bung.png`.

Gợi ý riêng (đưa vào tin của tàu đó):
- **Tàu 2**: các dải cực quang mềm rẽ quạt chữ V ra ngoài hai thanh ray. Giữa hai ray trống cho tia laser.
- **Tàu 5**: nửa vành mặt trời đặt **sau** thân, không trước mũi; các phiến kính, tia nắng xòe ra hai bên và về sau.
- **Tàu 10**: lưới lục giác **mảnh, trong mờ**, chỉ sáng ở đỉnh lục giác, neo sau hai cụm vai, không dàn ngang trước mũi.
- **Tàu 11**: các dải xoắn ốc **đứt đoạn** hút vào lõi, rộng 2,5–3 lần thân, nằm sau / dưới tàu, không thành vòng kín.
- **Tàu 12**: giữ ý mặt đồng hồ **hở** và mảnh giáp thời gian. Không có kim đồng hồ vắt ngang trước mũi.
- **Tàu 13**: lưỡi hái hư không viền tím điện, lòng có sao li ti. Phải khác hẳn lưỡi tinh thể của tàu 4.
