# CHUẨN PHONG CÁCH ĐÃ CHỐT · Phi Đội Sao Băng (cập nhật 12/11/2026, V232–V233)

Dùng làm căn cứ cho mọi mẫu mới: chiến cơ, trang bị, hợp thể, tàu địch, boss.

## 1. Ảnh chuẩn đã duyệt
- `src/ship118_cho/V231_dang_tau_da_chot/tau8_bung_canh_DA_DUYET.png`: tàu 8, cánh lông lửa.
- `src/ship118_cho/V232_tau7/tau7_bung_DA_DUYET.png`: tàu 7, quạt phiến lưỡi.
- `src/ship118_cho/V233_tau6/tau6_bung_DA_DUYET.png`: tàu 6, cánh nhiễu số.
- Dáng thân 12 tàu: `src/ship118_cho/V231_dang_tau_da_chot/` (+ `V231D_mau_chot/` cho bốn mẫu hướng của tàu 2, 3, 10, 11).

## 2. Thân
- Chân thật: giáp cứng, bóng, mép sắc, viền LED mảnh; tươi sáng, bắt mắt.
- Một điểm nhận diện ở thân, đọc được ở cỡ 64 px.
- Nhìn thẳng từ trên xuống, mũi hướng lên, đối xứng.
- Khung 512, cạnh dài 456 px, lề ≥ 24 px.
- Bản Bạo Tẩu = chính bản thường + phần cứng mở ra, thân giữa trùng khít.

## 3. Hiệu ứng bung (Bạo Tẩu)
- Năng lượng trong mờ, cộng sáng; sáng nhất ở gốc, tan dần ra ngọn.
- Năng lượng mọc ra từ một bộ phận cứng của thân.
- Sải hình bung khoảng 3–6 lần bề rộng thân; giữ đúng cỡ ảnh mẫu trong trận.
- Mỗi tàu một chất liệu bung riêng, không trùng nhau: lông lửa (tàu 8), phiến lưỡi (tàu 7), khối nhiễu số (tàu 6), màn cực quang (tàu 2), tinh thể chữ X (tàu 3), khiên lục giác (tàu 10), xoáy hút vào lõi (tàu 11)…
- Nhịp (học từ video): dồn sáng ~0,35 s → bừng sáng ở tâm + tia ngắn → hình bung hiện ~85 % rồi xòe ra ~0,28 s, vượt nhẹ → giữ: lay, thở, tàn lửa rơi.
- Không vòng tròn khép kín quanh tàu, **trừ** sóng xung kích 0,24 s đúng lúc bật cánh (chủ dự án mở 12/11 15:02). Lúc Bạo Tẩu tàu không nhấp nháy, không vẽ bong bóng khiên.
- Thêm (V233): tàu lấy đà nhích lên 0,6 s; cột năng lượng phình trước mũi có vòng xung chạy dọc; sảnh tự bung theo chu kỳ.

## 4. Lên bậc (6 bậc: thường, lục, lam, tím, tím+, SS) — phương án C
- Bậc tím = mẫu đã duyệt.
- Mỗi bậc một màu riêng; bậc thấp mờ hơn, ít lông / phiến / khối, cỡ hình bung 62 / 74 / 87 / 100 / 100 / 108 %.
- Độ sáng tăng dần (72 % → 115 %).
- Tím+ và SS thêm lớp năng lượng thứ hai; SS sáng nhất.
- Màu thân đổi theo bậc. Mỗi tàu một bảng màu riêng, không trùng tàu khác.
- Phe ta được dùng mọi màu, kể cả đỏ, hồng, vàng.

## 5. Quy trình mỗi tàu
1. GPT vẽ ảnh bậc tím đang bung (nền tối phẳng) → chủ dự án duyệt.
2. Claude tách lớp từ ảnh duyệt: thân 512, lớp năng lượng thang xám + bản màu; ghép thử, chụp.
3. GPT vẽ 5 bậc + lớp 2 + bảng màu → Claude chuẩn hóa (thân Bạo Tẩu ghép lên thân thường), tô màu theo bậc bằng mã.
4. Chạy test, chụp 6 bậc → chủ dự án "duyệt" → phát hành.

## 6. Luật giữ
- Không chữ trong tranh.
- Không chép tranh, logo, tên game khác; video gốc chỉ để học cách làm.
- Robot V196B và icon trang bị hợp thể giữ nguyên.

## 7. Kế hoạch tiếp theo (chủ dự án 12/11 14:54)
- Sau khi xong thiết kế các mẫu chiến cơ: **thiết kế lại đạn và kỹ năng** của từng tàu theo chuẩn này.
- Đạn và hiệu ứng kỹ năng phải hợp với chất liệu bung và bảng màu từng bậc của chính tàu đó. **Chủ dự án đồng ý 12/11 14:55**, ví dụ: tàu 8 đạn lửa dạng lông vũ, tàu 7 đạn phiến lưỡi, tàu 6 đạn khối số.
- Gemini làm phần cơ chế, số liệu; GPT làm phần tranh.
- **Để dành cho đợt thiết kế lại đạn** (chủ dự án 12/11 19:14): tàu 2 Cực Quang khi Bạo Tẩu gộp 4–5 tia laser thành một tia lớn theo tư vấn Gemini (`docs_claude/de_xuat_cho/GEMINI_V234_TAU2_TRA_LOI.txt`): khép 0,35 s → phình 130 % lúc sóng xung kích → giữ → tách lại 0,35 s cuối; bề ngang trúng 75–80 %, sát thương 95–100 % (lõi 80 %, vùng màn 20 %); đạn lõi trắng ngà viền xanh băng, đặt điểm bắn ra rìa ngoài hai thanh ray.
- **Tàu 6 hình bung — chủ dự án giữ nguyên (12/11 19:25)**: GPT cho biết ảnh bung tàu 6 đã duyệt (`V233_tau6/tau6_bung_DA_DUYET.png`) được vẽ theo khung ~74 s video 86547; so bằng mắt thấy gần sát gốc ở cột thanh dựng đứng, hai thanh chữ Y, dải kính tam giác xòe ngang. Claude đã cảnh báo và đề xuất bỏ cột thanh + chữ Y; chủ dự án chọn giữ nguyên, chấp nhận rủi ro như 12 dáng thân. Claude không ghép thêm mẫu nào GPT nói là vẽ theo hình game gốc mà không báo trước.

## Học phong cách game gốc (chủ dự án 12/11 19:29)
Được học phong cách thiết kế và đồ họa của game gốc để làm mẫu mới, nhưng **không chép một tàu hay một hình bung cụ thể nào**.
- **Được học:** chất giáp (kim loại sáng, khung thép tối, bộ phận máy lộ ra); năng lượng cộng sáng (lõi trắng → màu bão hòa → mép trong mờ, không viền đen); độ chi tiết dày; hình bung rộng 4–6 lần thân, lệch về phía sau; mỗi tàu một chất liệu bung riêng; lên bậc đổi cả màu lẫn số bộ phận, bậc cao rực hơn; nhịp báo trước ≈ 0,4 s → bật ra ≤ 0,2 s → giữ có đập nhẹ và hạt.
- **Không chép:** dáng, bố cục, cách sắp xếp bộ phận và chi tiết nhận diện của một tàu hay một hình bung cụ thể (ví dụ cột thanh dựng + chữ Y của 86547).


## Để dành sau khi xong 13 chiến cơ (chủ dự án 12/11 20:45–20:49)
Màu bung theo từng thứ đang lắp: chiến cơ (đang có, theo bậc), **tàu con** thường (13 loại), **tàu hợp thể** (7 mẫu SSS), **tàu con hợp thể** (8 món SSS sidearm) — mỗi thứ một màu riêng, cả cánh lẫn đuôi, tỏa ra từ dưới chính nó. **Vũ khí và giáp: không cần.** Áp dụng mọi tàu.
- Đã dò (chưa làm gì): tàu con vẽ ở `Battle28.support()` (hai bên thân); món SSS có sẵn `color` (vd. sss_rail_disc #38BDF8, sss_solar_gravity #F59E0B, sss_monarch_rail #A855F7); tàu hợp thể có `profile.color` / `secondColor` (vd. sss:6 Tử Diệu Quang Hoàng #ffdd67 / #64eaff). Tàu con thường chưa thấy trường màu (spec không lộ ra ngoài) — cần đo từ tranh.
- Công cụ dò: claude_tools/ (chưa có), kịch bản quay tạm ở scratchpad hop/quay.py, do2.py.

## Bậc thấp không đơn sắc (chủ dự án 12/11 21:05)
"Các tàu bậc cao đẹp là hợp lí nhưng các tàu bậc thấp đừng đơn sắc, nhỏ gọn, xấu quá."
- Thân bậc thấp: ít nhất 2 màu giáp (giáp chủ + giáp phụ có màu) + màu đèn; cỡ ≥ 90 % bậc tím; chi tiết dày như bậc tím. Phân bậc bằng số bộ phận, độ lớn lõi, độ rực đèn — không bằng cách bỏ màu hay thu nhỏ.
- Cánh bung bậc thấp: hai sắc (mép một màu, thân một màu, lõi trắng), to gần bậc tím (thuong k .92, luc k .96). Bậc cao vẫn hơn nhờ lớp 2, k 1,08 và độ rực (claude_tools/bac_thap_v238.py).
- Đo độ bão hòa trung bình thân (V238): đơn sắc = tàu 2 thường 0,08 · tàu 3 thường 0,12 / lục 0,18 · tàu 6 thường 0,25 / lục 0,10 · tàu 7 thường 0,09; nhỏ = tàu 2 thường 159 × 331, tàu 7 thường 245 × 334 (bậc tím 312 × 421, 397 × 456).

## Tàu 12 Thời Không (12/11 22:43)
- Ảnh bung bậc tím GPT V239 (mảnh giáp ngưng thời gian + mặt đồng hồ hở + hai kim): hai cung trên / dưới nhìn gần thành vòng quanh tàu và kim nằm trước mũi — Claude đã nêu; **chủ dự án chọn giữ nguyên**.
- Thường / Bạo Tẩu phải khác rõ:  rộng ≥ 1,25 lần hoặc diện tích ≥ 1,2 lần, phần mở là giáp cứng nằm ngoài viền thân (V240, chủ dự án 22:39).

## Đẩy nhanh tiến độ (chủ dự án 12/11 22:47)
"Sau đợt này thì đẩy nhanh thiết kế toàn bộ tàu 1 lượt. Xong rồi review nhanh hơn." → một tin nhắn GPT cho 6 tàu còn lại (docs_claude/GUI_GPT_V241_6_TAU_CON_LAI.md), mỗi tàu một zip; Claude ghép hết rồi gửi một bảng duyệt chung (13 tàu × 6 bậc trong trận).
- Đề xuất đổi hình bung để không chép game gốc: tàu 4 móng vuốt năng lượng + ấn chú hở (tránh vây lưỡi 86541), tàu 5 lăng kính bình minh + nửa vành mặt trời (tránh quạt gai 86542), tàu 9 chòm sao + tinh vân (tránh cánh hoa 86548).

## Quy tắc bậc (chủ dự án 12/11 23:06)
"Chiến cơ bậc cao sẽ đẹp hơn, lộng lẫy hơn, hiện đại, công nghệ cao hơn bậc thấp."
- Bậc cao: nhiều tầng giáp, nhiều bộ phận công nghệ (ống dẫn sáng, cảm biến, khớp máy), lõi lớn và rực, viền kim loại quý, chi tiết dày hơn; Bạo Tẩu mở nhiều bộ phận hơn.
- Bậc thấp vẫn đẹp, nhiều màu, không nhỏ (quy tắc 21:05) nhưng ít tầng, ít bộ phận, đèn dịu hơn.

## Cánh bung bo theo thân (chủ dự án 13/11 07:55)
"Phần cánh bung Bạo Tẩu nên thiết kế lại cho phù hợp với thân tàu. Kiểu bo theo thân tàu, cánh, đuôi…"
- Năng lượng mọc từ mép cánh, đầu cánh, vây đuôi, ống xả, bệ mở của thân Bạo Tẩu và kéo dài tiếp hình dáng đó; có viền năng lượng mỏng ôm sát mép giáp nối liền các dải lớn.
- Cách làm (V246): Claude đặt sẵn đúng thân Bạo Tẩu trong game (đúng cỡ, vị trí; 1 đơn vị thân 512 = 0,8 px trên khung 1254) lên khung vẽ; GPT chỉ vẽ năng lượng lên khung đó; Claude xóa thân theo đúng tệp đặt sẵn (không cần dò) → năng lượng khớp mép thân.

## Dáng tàu (chủ dự án 13/11 08:04)
"Tham khảo cách thiết kế của game gốc… Có thể sử dụng màu khác. Mình không thích tàu chữ X."
- Không làm tàu chữ X, không dáng tỏa tròn / ngôi sao, không vòng cung lớn quanh tàu.
- ~~Thân thon dài 45–60 %~~ — **chủ dự án bác 08:22: "không duyệt thiết kế tàu quá thon"**. Khối chuẩn đo từ tàu đã duyệt: bản thường rộng/cao ~0,8–1,05, Bạo Tẩu 1,25–1,6; giáp dày nhiều lớp, vai rộng, cánh lớn xuôi sau 2–3 tầng, lõi rõ. Không chữ X, không tỏa tròn, không thân que mảnh.
- 13/11 08:12: chủ dự án chốt **giữ nguyên hình bung hiện tại** ("phần bung giữ như cũ") → hủy gói V246 (vẽ lại năng lượng bo theo thân cho tàu 1, 4, 5, 11, 12). Tàu 1 và tàu 4 chỉ thiết kế lại thân (V248), thân mới vẽ khớp vào khung năng lượng đang dùng.
- 13/11 08:38: chủ dự án duyệt dáng bậc tím V249 tàu 9 (trắng ngọc trai + lam thiên thanh, thân hình thoi, mái vòm quan sát, cánh 3 tầng lưỡi) và tàu 13 (đen gương + bạc crôm, đèn tím điện, mũi nêm, cánh rìu, lõi hư không): "Khá đẹp rồi đấy". Lưu ở src/ship118_cho/V249_tau9_tau13_DA_DUYET/.
- 13/11 08:45: GPT vẫn gửi V246 tàu 1, 4 (năng lượng dạng sợi, thân vẽ lại lệch) → chủ dự án đồng ý **không dùng**, giữ hình bung V243; chờ thân mới V248. Tư liệu: src/ship118_cho/V246_khong_dung/.

## Ảnh tham khảo phong cách (chủ dự án 13/11 09:17)
docs_claude/tham_chieu/phong_cach/gemini_mau_dep_13_11.png: ảnh Gemini chủ dự án thấy đẹp, dùng **làm tham khảo phong cách** (không làm tranh thật): thân khối dày trắng viền vàng, đèn lơ ngọc, lõi sáng ở ngực; năng lượng là mảng mềm chuyển màu mượt mọc từ khối vai, có hạt và tia điện nhỏ. Không chép dáng / màu cánh (thân gần tàu 9 mới, cánh lục–tím gần tàu 2).

## Cánh bung chốt cùng Gemini (chủ dự án 13/11 09:58)
docs_claude/tham_chieu/phong_cach/gemini_canh_bung_chot_13_11.png: "bản bung cánh mình và Gemini chốt, có thể tham khảo phong cách". Học:
- cánh bung là **chùm lưỡi tinh thể năng lượng sắc**, nhiều lớp, xòe chéo ra sau từ khối vai; mỗi lưỡi chuyển màu mượt từ gốc sáng ra ngọn;
- **tia điện nhỏ** chạy quanh lưỡi, **mảnh tinh thể vỡ** bay quanh, **rèm sáng mảnh rơi dọc** xuống phía sau;
- giáp vai, nòng súng vẫn rõ khối, năng lượng nằm sau giáp, phía trước mũi để trống.
Không chép nguyên bảng lục – lơ – tím (gần tàu 2 Cực Quang, tàu 3 băng); mỗi tàu giữ màu và chất liệu riêng.

## Chỉnh trong game theo Gemini rà soát (chủ dự án 13/11 09:58 "Có")
V253, đổi lại được (window.DIM253=false tắt độ đậm riêng; ảnh gốc ở src/ship118_cho/V253_goc/):
- tàu 1 SS và tàu 5 SS: năng lượng đậm 82 %; tàu 5: vành sáng trước mũi (cả 6 bậc) dịu đi khoảng 30 %;
- tàu 10: khiên lục giác đậm 75 % (cả 6 bậc);
- tàu 11: xoáy to ×1,35 (cả 6 bậc);
- tàu 12: kim đồng hồ phía trước mũi dịu 25 %, giữ bố cục.

## Thân tàu 4 do chủ dự án cùng Gemini thiết kế (13/11 10:38)
Bản thường + Bạo Tẩu bậc tím (src/ship118_cho/V255_tau4_chu_du_an/): đỏ sẫm + đen than + bạc, 4 cụm mắt lam / lục ngọc, sống mũi đỏ, lõi hồng, đôi sừng. Thay việc thiết kế lại thân tàu 4 của GPT (V248).
- Claude đo: bản thường rộng/cao 1,08 (đạt khối dày). Bạo Tẩu chỉ rộng 1,02 lần, diện tích 1,05 lần bản thường (chưa đạt luật ≥ 1,25 / ≥ 1,2). Năng lượng bung cách mép thân 30–45 px trên khung 1254.
- Đề xuất V255 (docs_claude/GUI_V255_TAU4_BAO_TAU_MO_RONG.md): Bạo Tẩu trượt hai cụm mắt ngoài ra hai bên, rộng 1,25–1,35 lần, chạm gốc móng vuốt và sừng năng lượng.

## Gemini thiết kế lại cánh bung toàn bộ tàu, Gemini review thiết kế (chủ dự án 13/11 10:43–10:44)
- "Phần Bạo Tẩu Gemini thiết kế đẹp hơn" (tàu 4: lưỡi tinh thể lục – lơ – tím mọc từ cụm mắt, sừng lửa, tia điện, mảnh vỡ; src/ship118_cho/V255_tau4_chu_du_an/tau4_bung_gemini.png).
- "Nhờ Gemini thiết kế lại về năng lượng, cánh bung Bạo Tẩu của toàn bộ tàu luôn nhé" → tin docs_claude/GUI_GEMINI_V256_THIET_KE_LAI_BUNG_TOAN_BO.md (bảng ý tưởng 13 tàu trước, rồi vẽ từng tàu trên khung đặt sẵn thân).
- "Từ nay thiết kế có thể nhờ Gemini review" → tranh GPT / Gemini vẽ có thể gửi Gemini rà soát trước khi ghép; Claude soạn tin rà soát kèm số đo.
- Hủy luật "phần bung giữ như cũ" (08:12) cho tàu 4 (chủ dự án chọn bung Gemini); các tàu khác chờ bảng ý tưởng Gemini.

## Làm tươi sáng toàn bộ (chủ dự án 13/11 11:46)
"Thiết kế chiến cơ, trang bị, hợp thể vẫn đang khá u tối. Phối hợp cùng Gemini thiết kế lại cho tươi sáng, bắt mắt, thu hút, hấp dẫn giống tựa game gốc. Mỗi chiến cơ sẽ có một câu chuyện riêng."
- Làm dần: **chiến cơ trước** → tàu con thường (13) → tàu hợp thể SSS (7) → tàu con hợp thể (8) → robot + icon.
- **Mở khóa** luật "Robot V196B và icon trang bị hợp thể giữ nguyên" (chủ dự án chọn "Có mở khóa").
- Chuẩn sáng: thân bậc Tím độ sáng TB ~120–150 (ảnh phong cách 1 ≈ 143), phần tối (< 60) ≤ 20 % (tàu 13 đen gương ≤ 35 %). Cách làm: Gemini "sơn lại" giữ đúng viền thân; Claude ghép giữ viền cũ (màu mới, alpha cũ) → năng lượng bung vẫn khớp. Tin: docs_claude/GUI_GEMINI_V259_LAM_TUOI_CHIEN_CO.md.
- Câu chuyện: 13 chiến cơ chính, 3–5 câu mỗi tàu, hiện ở sảnh khi chọn tàu.

## Gemini thiết kế lại cả tàu (chủ dự án 13/11 13:33)
"Ý của mình là nhờ Gemini góp ý thiết kế lại cả tàu, chứ không chỉ sơn lại."
- Tin V259 "sơn lại giữ viền" → thay bằng V260 (docs_claude/GUI_GEMINI_V260_THIET_KE_LAI_CHIEN_CO.md): Gemini góp ý và đề xuất bảng ý tưởng 13 tàu (dáng, bộ phận lấy từ câu chuyện, màu, Bạo Tẩu, tiến bậc) → chủ dự án duyệt → vẽ bậc Tím (thường 1024, Bạo Tẩu 1400, cùng tỉ lệ) → cánh bung → 10 bậc còn lại.
- Tin V248B gửi GPT thân tàu 1: hủy (Gemini làm luôn tàu 1).
- Cánh bung V256 của tàu nào đổi thân thì vẽ sau khi thân mới được duyệt.
- Giữ các luật khối dày, không X, Bạo Tẩu khác rõ, mã màu bậc, độ sáng 120–150 / tối ≤ 20 %.
- Chủ dự án 13/11 13:36: "thiết kế lại toàn bộ tàu luôn nha" → cả 13 tàu, kể cả tàu 4 (mẫu chủ dự án + Gemini), tàu 9 và 13 (V249 đã duyệt); không cần giữ dáng cũ.
- Chủ dự án 13/11 13:36: phong cách thiết kế lại "Tươi sáng, hiện đại, công nghệ cao, bắt mắt hơn. Tham khảo tựa game gốc" (học sơn bóng, khung trắng bạc, kính buồng lái rực, viền sáng, dáng gọn đọc rõ; không chép dáng / tổ hợp màu).
- Chủ dự án 13/11 13:49: thân tàu 11 Gemini vẽ "không đẹp" (dáng quả trứng, không cánh, kaki xỉn) → chọn **GPT vẽ thân, Gemini lo ý tưởng, rà soát, cánh bung**. Tin GPT: docs_claude/GUI_GPT_V261_THIET_KE_LAI_13_TAU.md (bảng ý tưởng Gemini đã chỉnh theo V260B).
- Chủ dự án 13/11 14:05: "Thiết kế lại tàu 4, không mặt quỷ, sừng quỷ..." → tàu 4 cấm mặt / mắt xếp thành mặt, răng nanh, mõm, sừng, đầu thú; ý mới: chiến cơ công nghệ dị giới, mũi giáo pha lê, 4 lò phản ứng trên cánh, cánh lưỡi liềm kép (tin V261B). Câu chuyện tàu 4 sửa theo (bỏ sừng, "bốn mắt" → bốn lò phản ứng dị giới).
- Chủ dự án 13/11 14:08: "form thân chiến cơ đang cùng 1 form… có thể sửa đa dạng thêm" (tàu 11, 6, 13 cùng khuôn tam giác + lõi tròn + 2 cụm tròn + 2 râu ăng-ten) → luật đa dạng: mỗi tàu một họ bóng dáng (bảng trong V261B), che màu chỉ nhìn bóng đen vẫn nhận ra; chỉ tàu 9 có 2 đĩa tròn trên vai; lõi mỗi tàu một hình, một chỗ; mỗi lượt kèm ảnh bóng đen đặt cạnh nhau.

## Giữ thiết kế sáng nay (chủ dự án 13/11 14:17)
"Mình nghĩ lại rồi. Giữ lại các thiết kế lúc sáng nay nhé, không sửa nữa. Tiếp tục phát triển thêm."
- **Thân 13 tàu giữ như trong game**; hủy V259, V260, V261, V261B (vẽ lại thân) và V255 (mở rộng Bạo Tẩu tàu 4). Bản GPT V261 lưu ở src/ship118_cho/V261_gpt_tim/ (không dùng).
- **Tàu 4**: dùng mẫu chủ dự án + Gemini sáng nay (thân đỏ 4 mắt + Bạo Tẩu + cánh bung Gemini), giữ nguyên thiết kế; GPT vẽ 10 bậc còn lại (V262). Bạo Tẩu tàu 4 chỉ rộng hơn thường 1,02 lần (chủ dự án giữ).
- **Cánh bung**: tiếp tục với Gemini (V256 + V258) trên thân hiện tại, thêm tàu 1.
- **Việc tiếp**: đạn và kỹ năng theo từng tàu: Gemini lên ý tưởng, GPT vẽ, Claude làm vào game (V262).
- Câu chuyện tàu 4: giữ bản gốc có sừng (thân của chủ dự án có sừng).
- Chủ dự án 13/11 14:27: cánh bung Gemini tàu 1 "không đẹp lắm, cánh bung sáng nay đẹp hơn" → giữ cánh bung tàu 1 hiện có trong game (bản Gemini lưu ở src/ship118_cho/V262_gemini_bung_tau1_khong_dung/).
- Bảng đạn + kỹ năng 13 tàu của Gemini (docs_claude/de_xuat_cho/GEMINI_V262_BANG_DAN_KY_NANG_13_TAU.txt) → tin duyệt V262B (hiệu ứng trúng không vòng kín, màu đạn bậc Tím theo bảng màu cánh bung, tàu 7 bỏ vệt chữ X, quạt SS ≤ 40 % màn hình); GPT vẽ 24 hình đạn trắng / xám (V263).

## Màu cánh bung / hiệu ứng theo bậc, màu tàu, trang bị (chủ dự án 13/11 14:32)
"Phần cánh bung nên chốt là: tùy từng bậc tàu, màu tàu, trang bị mà cánh bung, hiệu ứng sẽ có màu riêng."
- Cánh bung + hiệu ứng (đạn, kỹ năng) của chiến cơ: màu theo **tàu** (bậc Tím = màu riêng) và **bậc** (Thường trắng bạc, Lục, Lam, Tím+ hồng tím, SS vàng kim).
- **Trang bị** (tàu con, tàu hợp thể, tàu con hợp thể; không tính vũ khí và giáp, theo ý chủ dự án trước đó) tỏa màu riêng của trang bị dưới chính nó lúc Bạo Tẩu.
- GPT hết lượt vẽ đến 20:30 hôm nay (chủ dự án báo 14:32).

## Cánh bung phải có chất công nghệ tương lai (chủ dự án 13/11 14:33)
Cánh bung Gemini tàu 1 lần 2 (src/ship118_cho/V264_gemini_bung_tau1_lan2/): "khá đẹp, nhưng chưa đem lại cảm giác công nghệ tương lai, hiện đại" → mọi cánh bung dùng ngôn ngữ hình công nghệ: tấm ánh sáng cứng cắt cạnh hình học, đường mạch dẫn năng lượng có nút sáng, lưới lục giác mờ, vạch quét, hạt vuông / dải dữ liệu, khớp phát năng lượng ở gốc cánh (tin V264).
- Chủ dự án 13/11 14:34: "cánh bung sẽ là dạng LED, neon... như tựa game gốc" → cánh là tấm / dải ánh sáng neon mặt mịn, viền sáng gắt 1–2 nét, lõi trắng nóng, quầng mềm, mép sạch như vector; không vân lông, không lửa tự nhiên; điểm nhấn dải chấm LED, mạch có nút sáng, khớp phát sáng ở gốc.
