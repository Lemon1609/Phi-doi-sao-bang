# ĐỀ XUẤT V231 · Hướng mỹ thuật 13 chiến cơ theo mẫu tàu 8 bung cánh (12/11/2026)

Claude soạn để **chủ dự án và GPT cùng chốt**. Đây là đề xuất: chưa thay tranh trong game, chưa triển khai.

Ký hiệu: **[Đo]** = Claude đo trên ảnh · **[Nhìn]** = quan sát bằng mắt · **[ĐX]** = đề xuất, chưa kiểm chứng · **[Thử]** = phải thử trong game mới kết luận được.

**Giới hạn nguồn:** phiên này Claude **không xem lại video 86546**. Phần đối chiếu dựa trên bản phân tích 11 video đã lưu (`tham_chieu/PHAN_TICH_11_VIDEO_GAME_GOC.md`, `PHAN_TICH_HIEU_UNG_BAO_TAU_DAN_KY_NANG.md`) và ảnh mẫu bậc tím `86546.png` trong repo.

---

## 1. Phân tích mẫu đã duyệt (tàu 8 Phần Thiên bung cánh)

### 1.1 Dáng, tỉ lệ, điểm nhận diện

| Hạng mục | Mô tả | Nguồn |
|---|---|---|
| Thân giữa | Mũi giáo nhọn, thân hẹp; rộng ≈ 228 px, cao ≈ 625 px trên ảnh 1254 px (tỉ lệ ≈ 1 : 2,7) | [Đo] |
| Mặt nạ buồng lái | Khối giáp đen – vàng, hai "mắt" sáng vàng. Đây là điểm nhận diện mạnh nhất | [Nhìn] |
| Đuôi | Ba gai: một gai giữa ngắn, hai "chân" dài hai bên, đầu chân có đèn lơ nhỏ | [Nhìn] |
| Phiến lam | Hai tấm lam bóng nằm sau vai, lộ ra giữa thân và cánh | [Nhìn] |
| Sải cánh | ≈ 1201 px, bằng **≈ 5,3 lần bề rộng thân**; cả hình rộng : cao ≈ 1,38 : 1 | [Đo] |
| Đầu lông cánh | Hạ thấp hơn mũi đuôi ≈ 243 px (≈ 40% chiều cao thân) | [Đo] |

### 1.2 Cách cánh bung

- **Gốc cánh là phần cứng** [Nhìn]: mỗi vai có một "sống cánh" giáp đỏ viền vàng, chĩa ngang hơi chếch lên (ước 15–20° so với phương ngang).
- **Đầu sống cánh** chuyển thành một lưỡi plasma **lam** mảnh, nhọn [Nhìn].
- **Lông năng lượng** treo từ sống cánh [Nhìn]:
  - khoảng 8–10 dải mỗi bên, hình lưỡi dao nhọn;
  - xòe nan quạt: dải trong ngắn và gần thẳng đứng, dải ngoài dài và chếch ra;
  - các dải chồng lên nhau, trong mờ.
- **Độ sáng giảm dần từ gốc ra ngọn** [Đo]: trung bình 0,68 (gần thân) → 0,66 → 0,50 (ngoài cùng). Gốc trắng vàng chói, giữa cam, ngọn cam đỏ trong mờ rồi tan vào nền.

### 1.3 Nét neon / LED

| Nét | Hình dạng, độ dày | Vị trí |
|---|---|---|
| Viền vàng kim | Nét mảnh (≈ 2–4 px trên ảnh 1254), chạy theo mép tấm giáp | Mũi, vai, sống cánh, mặt nạ |
| Mắt mặt nạ | Hai mảng vàng sáng, không viền | Giữa thân trên |
| Đèn lơ | Chấm / vạch ngắn | Đầu hai chân đuôi |
| Sống lông | Vệt trắng vàng dọc giữa mỗi dải lông, dày ở gốc, mảnh dần | Trong cánh năng lượng |
| Mép trước cánh | Vệt lam liền, sáng | Dọc đầu sống cánh |

### 1.4 Màu

- Tỉ lệ trong phần có hình [Đo]: giáp đỏ ≈ 11,5%; cam – vàng (cánh) ≈ 13%; lam ≈ 8,5%; trắng chói ≈ 3%; còn lại là vùng cánh trong mờ.
- Giáp: đỏ bóng, bão hòa cao, có điểm bóng trắng; chi tiết đen – xám ở mặt nạ và khớp.
- Lõi / đèn: vàng kim (mắt), lơ (chân).
- Cánh: trong mờ, cộng sáng; không có viền cứng.

### 1.5 Phần nào là tranh thân, phần nào là hiệu ứng

| Phần | Nên là | Lý do |
|---|---|---|
| Thân giữa, mặt nạ, phiến lam, đuôi | **Tranh thân** (dùng chung cho thường và Bạo Tẩu) | Phải y nguyên giữa hai trạng thái |
| Sống cánh giáp đỏ (phần cứng dang ra) | **Tranh thân Bạo Tẩu** (`_bt`) | Là bộ phận cơ khí mở ra, có chi tiết giáp |
| Lông năng lượng cam – vàng | **Lớp hiệu ứng PNG riêng**, mã tô màu và tạo chuyển động | Cần bật ra, đập, đổi màu theo bậc |
| Lưỡi plasma lam ở đầu cánh | **Lớp hiệu ứng** (cùng tệp hoặc tệp thứ hai) | Khác màu với lông, cần sáng nhấp nháy riêng |
| Lấp lánh, tàn lửa, vệt đầu lông | **Mã vẽ** | Hạt nhỏ, lặp, không cần tranh |

### 1.6 Đối chiếu với video 86546

| Điểm | Theo bản phân tích video | Ở mẫu đã duyệt | Loại |
|---|---|---|---|
| Dáng "chim cắt, cánh nhọn" | Có | Có | Quan sát được |
| Kỹ năng là "đôi cánh chim cắt bung" | Có | Có | Quan sát được |
| Bật ra nhanh (0,15–0,3 s), giữ 1,5–3 s, đập nhẹ, thu 0,2 s | Ghi chung cho các dòng đã soi khung hình; **dòng 86546 chưa được soi từng khung** | Ảnh tĩnh, không thể hiện | [ĐX] áp cùng nhịp, [Thử] |
| Màu bậc cao "vàng đỏ" | Có | Đỏ + cam vàng | Quan sát được |
| Đạn "tia sáng có vòng xung chạy dọc" | Có | Không có trong ảnh | Ngoài phạm vi ảnh |
| Số dải lông, góc sống cánh, lưỡi lam đầu cánh | **Không có trong bản phân tích** | Có | Chỉ khẳng định được cho mẫu của GPT |

**Về bản quyền:** thân tàu của mẫu giữ gần nguyên ảnh `86546.png` (mặt nạ, bộ màu đỏ – lam – vàng). Bản bàn giao V230 ghi chủ dự án đã được nhắc rủi ro và tự quyết. Claude giữ ranh giới cũ: không soạn lời nhắc hay đo chỉnh để tranh giống sát tàu của game gốc hơn; các đề xuất dưới đây chỉ theo hướng làm mỗi tàu khác đi.

---

## 2. Quy tắc chung đề xuất cho 13 tàu

### 2.1 Chuẩn lấy từ mẫu tàu 8 (áp cho mọi tàu) [ĐX]

1. **Thân cứng, năng lượng mềm.** Thân là giáp bóng, mép sắc, có viền LED mảnh. Năng lượng trong mờ, cộng sáng, sáng nhất ở gốc, tan dần ở ngọn, không viền cứng.
2. **Năng lượng mọc ra từ một bộ phận cứng** (vai, ray, càng, mâm, khe nứt…), không tự nhiên xuất hiện quanh tàu.
3. **Một điểm nhận diện ở thân** đọc được ở cỡ 64 px (tàu 8: mặt nạ hai mắt vàng).
4. **Ba nhóm màu:** giáp (1 màu chủ) · LED / lõi (1 màu) · năng lượng (1 dải chuyển màu 2–3 điểm). Tàu 8: đỏ · vàng kim · trắng vàng → cam → cam đỏ, thêm lam ở mép trước.
5. **Hình bung lớn hơn thân nhiều** (tàu 8: sải ≈ 5,3 lần bề rộng thân) nhưng **không khép vòng** quanh tàu.

### 2.2 Mỗi tàu một kiểu bung riêng

Không dùng chung kiểu cánh chim. Chia 13 tàu vào **6 họ hình** để không lẫn:

| Họ hình | Tàu |
|---|---|
| Cánh lông (dải treo từ sống cánh) | 8 Phần Thiên · 1 Phượng Hoàng (phải khác rõ, xem mục 4) |
| Màn / rèm dọc | 2 Cực Quang |
| Tinh thể cứng nở ra | 3 X-Dực Băng · 5 Thự Quang |
| Lưỡi / càng / mũi nhọn | 7 Đao Phong · 4 Thần Ma |
| Tấm phẳng, mảnh rời, bản sao | 10 Tinh Hà · 12 Thời Không · 6 U Linh · 9 Thiên Khung |
| Hút vào / nứt ra | 11 Thôn Tinh · 13 Hư Không |

### 2.3 Sáu bậc

- Giữ: thường, lục, lam, tím, tím+, SS. **Bậc tím = mẫu đã chốt của từng tàu.**
- Hai bậc liền nhau phải khác nhau ở **cả hình lẫn màu** khi thu nhỏ. Đề xuất mỗi bước thay đổi ít nhất 2 trong 3 thứ: số lớp / bộ phận, màu giáp, màu LED.
- Hình bung cũng lớn dần theo bậc [ĐX]:

| Bậc | Thân | Hình bung khi Bạo Tẩu (ví dụ tàu 8) |
|---|---|---|
| thường | Gọn nhất | Sống cánh ngắn, 3–4 dải lông ngắn |
| lục | Thêm 1 bộ phận nhỏ | 5 dải |
| lam | Thêm 1 lớp | 6–7 dải, có lưỡi đầu cánh |
| tím | **Mẫu chốt** | **Như ảnh đã duyệt** (8–10 dải) |
| tím+ | Thêm cánh / gai phụ | Thêm lớp lông thứ hai phía sau |
| SS | Mạnh nhất | Hai lớp lông + dải đuôi dài |

### 2.4 Các quyết định đã khóa (theo yêu cầu lần này)

- Không áp luật mỹ thuật V198.
- Không vẽ lại icon trang bị hợp thể.
- Robot V196B giữ nguyên.
- Không vòng tròn khép kín quanh tàu hoặc địch.
- Không chữ bay.
- Đạn địch giữ đỏ #FF334F / hồng #F50057.

### 2.5 Phân biệt với đạn địch [ĐX, Thử]

- **Giáp** được dùng đỏ (tàu 8 đã duyệt): thân là khối đặc, nhỏ, không lẫn với viên đạn tròn.
- **Năng lượng (cánh, đạn, vệt)** của phe ta: đề xuất tránh dải tông **325°–10°** (hồng – đỏ thuần). Cánh tàu 8 nằm ở 20°–55° (cam – vàng), cách tông đạn địch khoảng 30–60°.
- Cần chủ dự án xác nhận, vì bản bàn giao V230 ghi "phe ta được dùng đỏ, hồng kể cả đạn và hiệu ứng". Hai điều này vênh nhau ở phần **hiệu ứng** (xem mục 5, câu hỏi 1).
- **Rủi ro lớn nhất không phải màu mà là diện tích:** sải cánh ≈ 5,3 lần bề rộng thân. Thân tàu trong trận rộng khoảng 60 px, tức cánh rộng khoảng 300 px trên màn hình 393 px, phủ phần lớn vùng né đạn [Thử].

---

## 3. Hướng kỹ thuật

### 3.1 Tách lớp [ĐX]

| Lớp | Tệp | Ai làm | Ghi chú |
|---|---|---|---|
| A. Thân thường | `tauN_<bậc>.png` 512 × 512 | GPT | Như hiện nay |
| B. Thân Bạo Tẩu | `tauN_<bậc>_bt.png` 512 × 512 | GPT | = lớp A + bộ phận cứng mở ra (sống cánh, càng, ray…). **Không** có năng lượng dính vào |
| C. Hình bung năng lượng | `tauN_fx_bung.png` | GPT | Trắng / xám, nền trong suốt. **Khổ lớn hơn 512** (đề xuất 1024 × 768) vì sải cánh vượt khung thân |
| D. Màu và chuyển động của lớp C | mã (`btfx218.js`, lớp BUNG230 đã có) | Claude | Tô màu, bật ra, đập, thu |
| E. Vệt, hạt, tàn lửa, lấp lánh | mã | Claude | Không cần tranh |

**Vấn đề của lớp C:** mã hiện tại tô **một màu** cho cả tranh cánh trắng. Mẫu đã duyệt cần **dải chuyển màu** (trắng vàng → cam → cam đỏ) và một phần màu khác hẳn (lưỡi lam). Hai cách [ĐX]:

| Cách | Mô tả | Ưu | Nhược |
|---|---|---|---|
| **C1 · Tô theo độ sáng** | Tranh xám; mã đổi độ sáng thành màu theo bảng 3 điểm (sáng → gốc, vừa → giữa, tối → ngọn) của từng tàu, từng bậc. Lưỡi lam là tệp thứ hai `tauN_fx_bung2.png` | Một bộ tranh dùng cho 6 bậc; đổi màu tự do | Phải thử xem có giữ được độ trong của ảnh mẫu không |
| C2 · Tranh màu sẵn | GPT vẽ cánh có màu cho từng bậc (6 tệp) | Đẹp đúng như mẫu | 6 tệp lớn mỗi tàu; dung lượng tăng; sửa màu phải vẽ lại |

Claude đề nghị thử **C1** trên tàu 8 trước; không đạt mới dùng C2 cho riêng bậc tím và SS.

### 3.2 PNG hay mã

| Thành phần | PNG | Mã |
|---|---|---|
| Thân, giáp, mặt nạ, sống cánh cứng | ✔ | |
| Viền LED trên giáp | ✔ (vẽ sẵn trong thân) | Nhấp nháy nhẹ bằng lớp phủ sáng [ĐX] |
| Hình bung lớn (lông, màn, tinh thể, tấm) | ✔ (xám) | Tô màu, bật ra, đập, thu |
| Chuyển động từng dải lông | | Uốn theo sóng: cắt tranh thành dải dọc, dịch lệch pha [ĐX, Thử hiệu năng] |
| Vệt chém, tia, hạt, tàn lửa, sét nhỏ | | ✔ |
| Bản sao bóng mờ (tàu 9) | | ✔ (vẽ lại tranh thân, lệch, trong mờ) |

### 3.3 Giữ nguyên thân giữa hai trạng thái

Đây là lỗi GPT lặp lại nhiều nhất ở các đợt trước (tàu 4, 6, 7 lần đầu). Cách kiểm [ĐX ngưỡng]:

1. **Mặt nạ thân giữa:** lấy điểm ảnh alpha > 110 của bản thường trong dải cột giữa (bề rộng = bề rộng thân của tàu đó).
2. **Lệch vị trí:** tìm độ dịch khớp nhất giữa hai bản trong dải đó. Ngưỡng đề xuất ≤ 1 px.
3. **Lệch cỡ:** tỉ số chiều cao thân. Ngưỡng đề xuất ≤ 2%.
4. **Lệch chi tiết:** sai khác màu trung bình trong mặt nạ sau khi khớp. Ngưỡng đề xuất ≤ 6 / 255.
5. Không đạt 2–4: Claude **dán thân giữa bản thường lên bản `_bt`** bằng mã (đã làm ở tàu 7), miễn là phần cứng mở ra không đè lên thân.

Cách chắc nhất [ĐX]: GPT **vẽ bản `_bt` bằng cách thêm bộ phận lên chính tệp bản thường**, không vẽ lại từ đầu.

### 3.4 Điểm gốc của hình bung

Cánh tàu 8 xoay và phóng to **quanh vai**, không quanh tâm tàu. Mỗi tàu cần **tọa độ điểm gốc** (trái / phải) trên khung 512, theo từng bậc nếu vai đổi chỗ. Đề xuất: GPT ghi kèm; Claude đo lại từ tranh `_bt` (điểm ngoài cùng của sống cánh cứng).

### 3.5 Kiểm thử trong game [Thử]

| Việc | Cách |
|---|---|
| Đúng tâm, đúng cỡ | Chụp sảnh / trận / Bạo Tẩu cho 6 bậc (bộ chụp `quay230.py`) |
| Thân không nhảy khi vào Bạo Tẩu | Chụp 2 khung liền trước – sau, so dải giữa |
| **Đạn địch còn đọc được** | Chụp cùng một khung trận có và không có lớp cánh; đo độ tương phản của viên đạn địch nằm trong vùng cánh. Ngưỡng đề xuất: giảm không quá 25% |
| Thứ tự lớp | Kiểm lớp cánh vẽ **dưới** đạn địch. Hiện `back()` vẽ sau thân; so với lớp đạn thì chưa kiểm |
| Độ đục của cánh trong trận | Thử 3 mức (100%, 70%, 50% so với sảnh); chủ dự án chọn |
| Hiệu năng | Đo FPS máy yếu ở chế độ Nhẹ khi cánh khổ 1024 đang đập |
| Hồi quy | t156 14/14; t204, t206, t207, t209 |

---

## 4. Bảng 13 tàu

"Mẫu tím" là tệp trong `src/ship118_cho/V230_12_mau/`. Màu ghi theo quan sát trên mẫu [Nhìn]; cột hình bung lấy từ bảng V230 đã chốt, có chỉnh để không trùng nhau [ĐX].

| # | Tàu · mẫu tím | Hình bung đặc trưng | Giáp · lõi / LED · năng lượng | Điểm giữ để không lẫn | Cần chủ dự án xác nhận |
|---|---|---|---|---|---|
| 1 | Phượng Hoàng · 86540A | **Quạt lông tròn xòe lên trên + 3–5 dải đuôi dài** (như đuôi công). Lông đầu tròn, không nhọn | Tím – bạc · vàng kim · lửa ? | Đuôi dài là chính; cánh ngắn hơn tàu 8; không có sống cánh ngang | **(a)** Mẫu 86540A và 86538 (tàu 11) gần như cùng dáng, cùng màu tím – vàng. **(b)** Tàu 1 và tàu 8 cùng là "cánh chim lửa". **(c)** Màu lửa của tàu 1 |
| 2 | Cực Quang · 86540B | **Màn cực quang dọc** phất giữa các thanh ray, cao lên phía trước | Bạc trắng · lơ · lục – lơ – tím nhạt | Hình dọc, không xòe ngang; thân nhiều ray thẳng | Không |
| 3 | X-Dực Băng · 86544 | **4 cánh tinh thể băng** nở theo hình chữ X, mặt cắt phẳng, có cạnh | Bạc · lơ băng · trắng – lơ | Tinh thể có cạnh cứng, trong như kính; chữ X | Không |
| 4 | Thần Ma · 86541 | **Hai càng năng lượng chĩa xuống + mũi thương** phóng lên giữa | Đỏ đen · lam (vòng mắt) · lơ | Thân tròn hai "mắt" vòng lam; năng lượng lơ, không cam | **(d)** Giáp đỏ + lam trùng bộ màu tàu 8 |
| 5 | Thự Quang · 86542 | **Chùm gai tinh thể xòe quạt** thẳng, nhọn, từ mâm sau thân | Bạc · hồng tím · hồng tím → trắng | Gai **thẳng**, tỏa tia; thân bạc | **(e)** Hồng tím trùng tàu 9 và nằm sát tông đạn địch |
| 6 | U Linh · 86547 | **Cánh "nhiễu số"**: các khối chữ nhật lệch hàng xòe ngang, nhấp nháy | Đen xám · lơ ngọc + cam nhỏ · lơ ngọc | Tàu tối duy nhất; hiệu ứng hình khối vuông, không cong | Không |
| 7 | Đao Phong · **86543** (chốt 12/11) | Lưỡi tách 3–5 phiến + vệt chém cung; lưỡi cong ôm hai bên khi bung | Tím · đỏ – vàng (lưỡi) · theo bậc | Thân tím mảnh, hai cặp lưỡi đỏ viền vàng dọc thân | Tranh V230 giữ trong game tới khi có bộ mới |
| 8 | Phần Thiên · 86546 | **Cánh chim cắt: sống cánh ngang + 8–10 dải lông nhọn treo chếch xuống, lưỡi lam đầu cánh** (**mẫu đã duyệt**) | Đỏ · vàng kim · trắng vàng → cam → cam đỏ, mép lam | Mặt nạ hai mắt vàng; lông nhọn như lưỡi dao; lưỡi lam | Xem câu hỏi 1, 2 (mục 5) |
| 9 | Thiên Khung · 86548 | **Cánh hoa nhiều lớp** cong, xếp chồng + **bản sao bóng mờ** lệch hai bên | Hồng tím · lam (lõi) · hồng tím → lam | Cánh **cong**, tròn đầu, nhiều lớp; có bóng mờ | **(e)** như tàu 5 |
| 10 | Tinh Hà · 86545 | **Hai tấm khiên chiến thuật** mở sang hai bên (hình lục giác ghép, không khép vòng) + tàu con | Tím nhạt – bạc · hồng (vòng lõi) · lục ngọc | Dáng cá đuối rộng; tấm phẳng có lưới | Vòng tròn hồng ở **lõi thân** là chi tiết của thân, không phải vòng quanh tàu: giữ? |
| 11 | Thôn Tinh · 86538 | **Cánh tách lớp bị hút về lõi**; đĩa sáng xoắn ở giữa thân; hạt bay vào | Tím · vàng kim · tím → lơ | Chuyển động **hút vào** (ngược mọi tàu khác) | **(a)** như tàu 1 |
| 12 | Thời Không · 86539 | **Cánh vỡ thành mảnh lơ lửng**, đứng yên rồi giật về chỗ cũ; kim đồng hồ sáng | Lam – vàng · vàng kim · lam → trắng | Mảnh rời **đứng yên**, nhịp giật | Không |
| 13 | Hư Không · thiết kế riêng | **Gai vương miện bung + khe nứt sáng** dọc thân | Chưa có mẫu | Vương miện; ánh sáng từ **bên trong** thân | Cần chốt mẫu bậc tím |

**Bốn chỗ dễ lẫn cần quyết** (chi tiết ở mục 5):
- (a) tàu 1 ↔ tàu 11: hai mẫu gần như một.
- (b) tàu 1 ↔ tàu 8: cùng cánh chim lửa.
- (d) tàu 4 ↔ tàu 8: cùng đỏ + lam.
- (e) tàu 5 ↔ tàu 9: cùng hồng tím.

---

## 5. Câu hỏi cần chủ dự án quyết

1. **Màu năng lượng phe ta:** theo yêu cầu lần này ("chọn màu hiệu ứng để phân biệt rõ với đạn địch"), Claude đề xuất hiệu ứng và đạn phe ta tránh dải hồng – đỏ thuần; giáp thì được đỏ. Điều này thu hẹp luật mở ngày 11/11. Đồng ý?
2. **Độ lớn và độ đục của cánh trong trận:** giữ đúng tỉ lệ ảnh mẫu (cánh phủ khoảng 3/4 bề ngang màn hình) hay thu nhỏ / làm mờ trong trận, còn sảnh thì giữ nguyên? Claude đề nghị thử 3 mức rồi bạn chọn.
3. **(a) Tàu 1 và tàu 11** đang dùng hai mẫu gần giống nhau (86540A, 86538). Đề xuất: đổi màu chủ của một tàu ngay ở bậc tím (ví dụ tàu 11 sang tím đen – lơ), hoặc chọn mẫu khác cho tàu 11.
4. **(b) Tàu 1 và tàu 8:** chấp nhận cách tách "tàu 8 = cánh ngang lông nhọn, tàu 1 = quạt tròn + đuôi dài" không? Và lửa tàu 1 màu gì (đề xuất: vàng kim → tím, khác cam của tàu 8)?
5. **(d) Tàu 4:** đổi phần lam thành lơ – lục và giáp sang đỏ sẫm – đen để khác tàu 8?
6. **(e) Tàu 5 và tàu 9:** giữ hồng tím cho tàu 9 (cánh hoa), chuyển năng lượng tàu 5 sang trắng – vàng nhạt?
7. **Tàu 13:** cần một mẫu bậc tím để chốt.

---

## 6. Thứ tự và phạm vi bộ mẫu đầu tiên [ĐX]

**Bước 1 · Tàu 8 làm mẫu kỹ thuật** (chưa phát hành):
- GPT giao **3 tệp bậc tím**: `tau8_tim.png`, `tau8_tim_bt.png` (thân + sống cánh cứng, không năng lượng), `tau8_fx_bung.png` (lông xám, khổ lớn) và `tau8_fx_bung2.png` (lưỡi đầu cánh).
- Claude dựng bản thử trong game: tô màu theo độ sáng (cách C1), bật ra, đập; chụp sảnh và trong trận ở 3 mức độ đục.
- Chủ dự án so với ảnh đã duyệt, chốt cách C1 hay C2 và mức độ đục.

**Bước 2 · Bộ mẫu hướng cho 4 tàu khác họ hình**, mỗi tàu **một ảnh bậc tím đang bung** (như ảnh tàu 8):
- tàu 2 (màn dọc);
- tàu 3 (tinh thể);
- tàu 10 (tấm phẳng);
- tàu 11 (hút vào).

Mục đích: chốt rằng 13 tàu không thành cùng một kiểu cánh, trước khi vẽ bộ 12 tranh.

**Bước 3 · Vẽ đủ bộ**, mỗi lượt một tàu: 12 tranh thân + tệp hình bung + bảng 6 màu + tọa độ điểm gốc. Thứ tự đề xuất, đưa các tàu có câu hỏi treo xuống sau:

8 → 7 → 2 → 3 → 10 → 6 → 12 → 9 → 5 → 4 → 1 → 11 → 13

(Tàu 7 vẽ lại theo dáng 86543, chủ dự án chốt 12/11 09:31; tranh V230 giữ trong game tới khi bộ mới được duyệt.)

**Chưa làm cho tới khi được chốt:** thay tranh trong game, sửa `btfx218.js`, gỡ chặn màu, đổi số liệu.

---

## 7. ĐÃ CHỐT · chủ dự án trả lời 12/11/2026 08:00

Phần này **thay thế** các chỗ còn để ngỏ ở mục 2.5, 4 và 5.

| # | Câu hỏi | Quyết định của chủ dự án | Hệ quả |
|---|---|---|---|
| 1 | Màu hiệu ứng phe ta | **Hồng – đỏ dùng thoải mái, không hạn chế** | Bỏ đề xuất tránh dải 325°–10° ở mục 2.5. Khi ghép tranh mới sẽ gỡ chặn màu trong `fx215.js` và `NEON220`. Đạn địch vẫn đỏ / hồng; việc đọc đạn dựa vào thứ tự lớp và viền đạn [Thử] |
| 2 | Cỡ cánh trong trận | **Giữ đúng cỡ ảnh mẫu** | Không thu nhỏ, không làm mờ riêng cho trận. Vẫn đo độ tương phản đạn địch trong vùng cánh và báo số, không tự chỉnh |
| 3 | Tàu 1 ↔ tàu 11 | **Được phối lại màu, hoặc kết hợp phong cách các tàu khác thành một tàu mới** | **Cập nhật 12/11 09:29: dáng thân 12 mẫu đã chốt** (`src/ship118_cho/V231_dang_tau_da_chot/`). Tàu 11 giữ dáng 86538, chỉ phối lại màu tím đen – lơ và lõi hút sáng; tàu 1 giữ 86540A. Hai tàu khác nhau bằng màu và kiểu bung |
| 4 | Tàu 1 ↔ tàu 8 | **Đồng ý** | Tàu 1: quạt lông tròn + đuôi dài, lửa vàng kim → tím |
| 5 | Tàu 4 ↔ tàu 8 | **Đồng ý** | Tàu 4: giáp đỏ sẫm – đen, năng lượng lơ – lục |
| 6 | Tàu 5 ↔ tàu 9 | **Đồng ý** | Tàu 9 giữ hồng tím; tàu 5 năng lượng trắng – vàng nhạt |
| 7 | Tàu 13 | **Tham khảo cách tiến bậc của các mẫu rồi cải tiến thêm** | GPT đề xuất mẫu bậc tím riêng cho tàu 13 (vương miện, khe nứt sáng), chủ dự án duyệt trước khi vẽ bộ |

**Ghi chú của Claude:**
- "Tham khảo video mẫu" được hiểu là học **cách làm** (nhịp bung, cách tiến bậc, độ lớn hiệu ứng). Claude không soạn lời nhắc hay đo chỉnh để tranh giống sát tàu của game gốc; tàu 11 và 13 là thiết kế riêng.
- Vì hiệu ứng phe ta nay có thể đỏ / hồng và cánh giữ nguyên cỡ, Claude sẽ kiểm trước tiên rằng **đạn địch được vẽ trên lớp cánh** và báo số đo độ tương phản ở bản thử tàu 8.

Bước tiếp theo: tin nhắn cho GPT ở `docs_claude/GUI_GPT_V231B_MAU_KY_THUAT_VA_4_MAU_HUONG.md`.

| 8 | Dáng tàu 7 | **Mẫu 86543 dùng cho tàu 7** (12/11 09:31) | Vẽ lại bộ 12 tranh tàu 7 theo dáng 86543, xếp ngay sau tàu 8. Tranh V230 giữ trong game tới khi thay |

## 8. Chốt mẫu V231D (chủ dự án 12/11/2026 10:32)
- Chốt 4 mẫu hướng bậc tím đang bung: tàu 2 Cực Quang, tàu 3 X-Dực Băng, tàu 10 Tinh Hà, tàu 11 Thôn Tinh (`src/ship118_cho/V231D_mau_chot/`).
- Ghi chú đo: ảnh tàu 10 trùng từng điểm ảnh với bản V231C (chưa áp yêu cầu mở khe hai khiên); chủ dự án chốt nguyên như vậy.
- Tàu 8 bậc tím: chốt sống cánh vẽ lại `tau8_tim_bt_thu.png`; Claude ghép lên chính thân thường (thân giữa trùng khít), thu sống cánh 13% quanh chân để lọt khung 512. Bản thử trên nhánh `thu-v231-tau8`, chưa phát hành.
