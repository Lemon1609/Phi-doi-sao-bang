# BÀN GIAO DỰ ÁN PHI ĐỘI SAO BĂNG · V202 (2026-11-08)

### 11/11 09:35 · Chủ dự án CHỐT: vẽ lại cả bộ tàu 7 theo prompt V222
- Lý do: 6 bậc tàu 7 chưa cùng họ (lục lẫn xanh lá, lam thêm cụm động cơ, tím+ khép vòng kín). Tàu 7 KHÔNG còn là "tàu mẫu chuẩn" như ghi ở bàn giao V214; mẫu hiện nay là thân tàu 8, tàu 6 (bản thường) và bộ mảnh tàu 9, 10, 7.
- PROMPT_GPT_V222 mục 12.1 đã đổi: ảnh chủ tau7_tim → 5 bậc → 6 _bt. Khi tranh về: thay cả 12 tệp tau7_* trong src/ship118 (KHÔNG dùng src/ship118_goc_sach nữa, thư mục đó chỉ còn là tham chiếu đã gửi GPT).

### 11/11 09:21 · GPT gửi ánh sáng sau lưng mới của tàu 7 + xin tranh gốc sạch
- tau7_fx_sang.png mới (512×512, NỀN ĐEN, hai lưỡi liềm hở trái – phải, bán kính 202–231, tâm trống) → src/btfx218; bản dựng tự tách nền đen ("tach nen den: tau7_fx_sang" trong log dựng) — lần đầu dùng đường này, chạy đúng. Trong trận trông như hai dấu ngoặc ôm thân, gọn. Chưa phát hành.
- GPT báo: 6 thân _bt tàu 7 CHƯA đạt vì tranh thường gốc có quầng / nhiễu và không còn chỗ để mở 1,2 lần. Đo lại: tranh tàu 7 trong game có 15–30 % điểm mờ (bậc lam tới 103 %) và thân rộng 408–448 px.
- Claude xuất src/ship118_goc_sach/tau7_{6 bậc}.png = tranh đang dùng, ĐÃ đưa về cỡ chuẩn theo bậc (345 → 405) và xóa quầng (chỉ giữ thân alpha > 110 nở 2 px). Gửi GPT dạng zip TAU7_BAN_THUONG_SACH_6_PNG.zip.
- QUAN TRỌNG khi bộ _bt tàu 7 về: chép CẢ 6 bản thường trong src/ship118_goc_sach/ đè vào src/ship118/ cùng lúc với 6 bản _bt mới (vì _bt mới dựng trên thân đã thu về cỡ chuẩn; nếu giữ bản thường cũ, candoi217 sẽ thu nhỏ _bt thêm lần nữa và thân lệch nhau).
- Nên làm tương tự cho các tàu khác trước khi GPT vẽ _bt sạch (tàu 1, 2, 3, 5): xuất bản thường sạch + đúng cỡ chuẩn rồi mới giao.
- t156 14/14.

### 11/11 08:55 · Gemini soát prompt → PROMPT_GPT_V222_THIET_KE.md (THAY V221; đây là bản chuẩn hiện hành để gửi GPT)
- NHẬN từ Gemini: tách rõ hai loại nền (thân trong suốt / mảnh hiệu ứng nền đen); _bt mở 1,2–1,4 lần và không chiều nào quá 456 px; rãnh LED 3–5 px có lõi trắng 1 px nằm trong khe tối; tọa độ gốc lửa (96,383), hai đầu sét (0,64)–(383,64); tâm fx_sang để trống bán kính 100 px; dải hạt không vạch chia ô; tàu địch vẽ sẵn mũi xuống, sáng từ trên – trái; hợp thể tối đa 435 px + công thức "thân A, cánh B, LED hai màu, lõi chuyển sắc"; ghép tấm duyệt bằng Python; màu chủ đạo tàu 11–13; lời tả ảnh chủ 13 tàu (phụ lục A); 4 họ quái (B); 13 bộ trang bị (C).
- KHÔNG NHẬN (lý do): (1) đổi đèn tàu 10 sang lam #00B0FF — chủ dự án đã chốt GIỮ LỤC; (2) bỏ lửa động cơ trong tranh thân — lúc bay thường game không vẽ lửa bằng mã nên tàu sẽ như tắt máy; (3) bảng kim loại trung tính tối (#1E242B / #3A4452 / #7A889B) — phe ta phải SÁNG, đổi thành #2B3440 / #8D9BAD / #E3EAF2; (4) tàu 13 hai màu đèn → chỉ giữ tím; thân tàu 11, 13 làm sáng hơn đề xuất để không lẫn với địch; (5) "ấn triện vàng" của bộ Hoàng Đế → trắng (cấm vàng kim).
- Đã đối chiếu mã: tên 13 tàu và 13 bộ trang bị của Gemini KHỚP dữ liệu game; tên 10 boss Gemini đặt KHÔNG có trong game (boss thật: bang_gia, dung_nham, hoangde, loi_duc, omega, san_moi, thaico, thietgiap, thuc_the_thon_tinh, tinh_van, u_anh, pha_khong) → phần boss chỉ dùng làm định hướng, chưa đưa vào prompt; ví dụ hợp thể số 2 của Gemini tự mâu thuẫn tên bộ → bỏ.
- ĐÃ CHỐT 08:58 (chủ dự án đồng ý): tàu 10 đổi đèn sang LỤC RADAR #5BE35B. Đã sửa NEWC[9] (fx215), NEW213[9] (holo212), D2P[9] (v120), hit_cross 120°, prompt V222; build74_mau.py quay tông +30° cho các mảnh tau10_fx_* lúc dựng (bảng _dh). Đã dựng + chụp trong trận + t156 14/14, CHƯA PHÁT HÀNH (web và APK vẫn V220) — gộp vào bản kế. Nếu GPT vẽ lại bộ mảnh tàu 10 đúng màu #5BE35B thì xóa mục '10' khỏi _dh.

### V220 · 11/11 · PHÁT HÀNH: viền neon LED cho CẢ 13 TÀU · bộ hiệu ứng tàu 7 · ánh sáng sau lưng thu nhỏ · bỏ thân chữ X
- Chủ dự án 08:09 (CHỐT): neon "áp dụng cho mọi tàu"; ánh sáng sau lưng "thu bé hơn, đang quá to"; "cánh lựa theo từng loại chiến cơ, trang bị, hợp thể; không phải cánh nào cũng chữ X". 08:27: nhờ soạn prompt để GPT thiết kế đẹp hơn, có thể nhờ Gemini.
- Mã: (1) tàu 11–13 (id 10–12) vẽ qua craftSprite trong ship83.js → thêm BtFx218.neonAt() sau frameSprite khi Bạo Tẩu; màu đèn LAMP3 theo bảng Gemini; (2) SPAN_MAX 1,35, SPAN_K 1,12 (ánh sáng sau lưng ≤ 1,35 × sải cánh ở SS); (3) lớp bừng sáng bỏ qua điểm đỏ / hồng (tông ≥ 285° hoặc ≤ 20°) còn sót trong tranh cũ tàu 11, 13.
- Tranh: 6 thân chữ X của V219 (tàu 8 × 5, tau6_tim_bt) TRẢ VỀ bản V218 (git 686e667) chờ GPT vẽ lại; tau7_fx_sang.png (hai lưỡi đao chữ X) cất sang src/btfx218_cho/ → tàu 7 hiện có lửa, sét, hạt, viền neon, chưa có ánh sáng sau lưng.
- Prompt mới: docs_claude/PROMPT_GPT_V221_THIET_KE.md (THAY mọi tài liệu chuẩn trước; có bảng 13 tàu, quy trình "ảnh chủ bậc tím → sửa ra 5 bậc → _bt sửa trên bản thường", danh sách tự kiểm, việc đợt này) + docs_claude/PROMPT_GEMINI_V221_GOP_Y_THIET_KE.md (soát prompt, mô tả ảnh chủ 13 tàu, họ quái, trang bị / hợp thể). Khi Gemini trả lời: gộp vào prompt bản kế.
- build74_mau.py: mảnh hiệu ứng vẽ trên NỀN ĐEN (không có vùng trong suốt) được tự tách nền (alpha = kênh sáng nhất) — đã dặn GPT vẽ nền đen để hết lỗi bẩn nền.
- SỰ CỐ: container khởi động lại giữa lúc chạy test (08:2x). Tệp còn nguyên, chỉ mất tiến trình nền. Bài học: commit + push nguồn TRƯỚC khi chạy chuỗi test dài.
- Test (chạy lần lượt): t156 14/14; t209 20/20; t204 8/8; t207 8/8; t206 7/7. Web: artifact 9gvh… bản 10.

### (ghi chú cũ của bản chờ duyệt, giữ để tra)
- Chủ dự án 07:39 (CHỐT): (1) tau6_tim_bt vẽ lại; (2) tàu 8 _bt vẽ lại, "đừng nới to quá"; (3) phe ta (chiến cơ, trang bị, hợp thể) KÍCH THƯỚC VỪA PHẢI, không quá to; hiệu ứng siêu cấp kiểu NEON LED (ảnh minh họa tựa game gốc: viền sáng lam, tia có sét quấn), được đề xuất thêm; (4) TÀU ĐỊCH: hầm hố, đồ sộ, ác mộng.
- Tài liệu: GUI_GPT_V217 thêm mục A2 "Hai phe, hai tính cách", mức bung _bt đổi thành diện tích 1,25–1,5 lần, lề ≥ 28 px; GUI_GPT_V220 thêm 3 tiêu chí + việc 4 (ảnh ý tưởng tàu địch để duyệt phong cách).
- Mã: btfx218.js thêm lớp NEON (neon / neonDraw, gọi trong front() cho MỌI tàu id ≤ 9, kể cả tàu chưa có bộ mảnh): viền neon ôm mép thân màu đèn tàu (Fighters28.profiles[id].color) + quầng mờ + vệt trắng chạy dọc viền + các điểm phát sáng sẵn có trên thân bừng theo nhịp. Hệ số m.bk giảm độ bừng với tranh _bt cũ có lửa vẽ sẵn (tàu 1, 7… vẫn hơi lóa vì tranh nền đã là khối lửa). Tắt: window.NEON220=false. env() nay chạy cho mọi tàu.
- Gói GPT "V219_FX_TAU7" (8 mảnh, tím 255–264°, lửa lưỡi liềm, sét phân nhánh, ánh sáng hai lưỡi đao chéo): đúng khổ, đúng neo → src/btfx218. Tranh thân _bt của tàu 7 vẫn là khối cầu plasma cũ, cần GPT vẽ thân bung sạch.
- GPT báo: còn 80 mảnh cho 10 tàu, đang chạm hạn mức tạo ảnh; dải hạt tàu 1 còn bẩn nền nên chưa gửi.
- Lưu ý công cụ: lệnh `rm -rf` trên thư mục làm việc bị chặn → quay / chụp vào thư mục MỚI thay vì xóa thư mục cũ.
- t156 14/14. Chưa chạy t209 / t204 / t207 / t206; chưa phát hành (web và APK vẫn V219).

### 11/11 07:35 · Chủ dự án góp ý (CHỐT HƯỚNG): bung và tiến hóa theo dáng riêng
- "Tùy theo hình dạng của từng chiến cơ, trang bị, hợp thể mà bậc tiến hóa sẽ khác. Không cần thiết lên siêu cấp là bung thành chữ X."
- Nguyên nhân chữ X ở V219: lời dặn GPT của Claude ("bung theo chiều dọc và chéo") quá chung. Đã sửa bộ chuẩn GUI_GPT_V217 (A.6, A.7): kiểu bung theo dáng + kỹ năng từng tàu; 6 bậc một tàu cùng một kiểu; mức bung đo bằng DIỆN TÍCH 1,3–1,8 lần (bỏ tiêu chí bề ngang 15–35 %).
- Tin gửi GPT: docs_claude/GUI_GPT_V220_BUNG_THEO_DANG_RIENG.md (bảng gợi ý kiểu bung 13 tàu; vẽ lại 5 bản _bt tàu 8 và tau6_tim_bt). Game vẫn là V219 cho đến khi có tranh thay.
- Khi kiểm tranh _bt về sau: đo diện tích, và so kiểu bung giữa 6 bậc của cùng một tàu.

### V219 · 11/11 · PHÁT HÀNH: thân Bạo Tẩu bung chéo cho tàu 8 (lục, lam, tím, tím+, SS) và tàu 6 bậc tím
- Gói GPT "V219_SUA_TAU_6_8" (6 tranh _bt) chép vào src/ship118. Đo (alpha > 128, so với bản thường): ngang +7–14 % như cũ nhưng DỌC +10–22 % và diện tích ×1,60–1,81 (trước ×1,17–1,31) → đạt; lề 12 px. Dáng chữ X, tàu 8 ss_bt đã tách rõ 4 pháo.
- Mẹo test: muốn chụp một tàu ở bậc SS thì `Workshop.craftGrade=()=>'SS'` trước khi vào trận (form118 trong skin69.js là hàm cục bộ, đè ART118S.form không có tác dụng). Bậc khác phụ thuộc mức tiến hóa e truyền vào Evo53.hull.
- Test (chạy lần lượt): t156 14/14; t209 20/20; t204 8/8; t207 8/8; t206 7/7. Web: artifact 9gvh… bản 8.
- Còn chờ GPT: 88 mảnh hiệu ứng cho 11 tàu còn lại (yêu cầu ở GUI_GPT_V219_KET_QUA_DOT_2.md mục 3).

### V218 · 10/11 (22:xx) · PHÁT HÀNH: tàu 8, 6 dáng mới · tàu 4 thuong / lam · đạn tàu 8, 10 · Bạo Tẩu mảnh rời cho tàu 9, 10
- Gói GPT "V218_DOT_2_BAN_THU" (25 tranh thân + 16 mảnh hiệu ứng) đã chép đè lên tranh đợt 1 trong src/ship118 và src/btfx218. Số đo: work/tranh219/do.py; nhận xét + việc đợt 3: docs_claude/GUI_GPT_V219_KET_QUA_DOT_2.md.
- Đạt: tàu 8 rộng/cao 1,01–1,17; tàu 6 0,86–1,04; tàu 4 _bt bung +26 / +21 %; bộ hiệu ứng tàu 9 (lam biển 215°) và tàu 10 (lục 90°) khác nhau rõ, sét dao động 120 px. Còn tồn: tàu 8 _bt bung +7–14 % ở 5 bậc, ss_bt pháo chồng; tàu 6 tim_bt +10 %.
- btfx218.js: (1) lửa giữ tỉ lệ thật giữa 3 dáng (dáng cao nhất làm chuẩn `ref`), lật gương cho bên trái; (2) NÂNG SÀN bậc thấp so với bảng Gemini (bậc thường: cỡ sáng 0,86, alpha 0,40, 1 tia sét) vì bảng gốc làm bậc thường gần như không thấy gì — phát hiện khi tàu 9 trong bộ lưu test đang ở bậc 'thuong'.
- Bản tách web nay có 35 tệp (thêm a/s34.js = BTFX218_ART + btfx218.js). Đăng artifact 9gvh… bản 6.
- Lưu ý test: KHÔNG chạy bot khác song song với t209 (mục "phá chướng ngại khi Bạo Tẩu +0,7 s" trượt khi máy tải nặng); không dựng lại khi test đang đọc tệp HTML.
- Test (chạy lần lượt): t156 14/14; t209 20/20; t204 8/8; t207 8/8; t206 7/7.
- Việc kế: GPT đợt 3 = sửa tồn tàu 8 / tàu 6 + bộ hiệu ứng 11 tàu còn lại. Bảng 13 bộ trang bị của Gemini chưa dùng. Tàu 11–13 chưa nối BtFx218.

### V218b (CHỜ DUYỆT, chưa phát hành) · 10/11 · Gói GPT "V217_DOT_1_BAN_THU" + bảng số Gemini
- Đã chép vào nguồn: src/ship118 tàu 8 (12), tàu 6 (12), tàu 4 thuong + lam (4) — cũ ở src/ship118_cu_v217/; src/btfx218 = 16 mảnh hiệu ứng tàu 9, tàu 10 của GPT. → BẢN DỰNG TỪ NGUỒN HIỆN KHÁC BẢN PHÁT HÀNH V217 (web v4, APK V217.30). Chủ dự án chưa duyệt.
- Đo thân (bỏ lửa động cơ, work/tranh218): tàu 4 đạt 1,20 / 1,22; tàu 8 chuyển từ dẹt sang THON 0,72–0,88 (mục tiêu 1,05–1,25); tàu 6 0,66–0,78 ở 5 bậc, SS 0,91. Bạo Tẩu bung chưa đủ ở nhiều bậc (tàu 6 tim −2 %, ss −1 %; tàu 4 +1–2 %). Chi tiết + yêu cầu sửa: docs_claude/GUI_GPT_V218_KET_QUA_DOT_1.md.
- Mảnh hiệu ứng: đúng khổ, đúng điểm neo (gốc lửa lệch ≤ 1 px, hai đầu sét y = 64). Nhược: hai tàu cùng tông 200° và cùng kiểu sao tỏa; sét quá thẳng.
- btfx218.js: bb() cắt lề trong suốt của từng mảnh; bảng LV theo Gemini [số dải lửa 2/2/4/4/6/6, dài 0,60 → 1,15, số tia sét 0 → 5, nhịp 1,2 → 0,25 s, cỡ ánh sáng 0,70 → 1,20, alpha 0,25 → 0,58]; trần bề ngang ánh sáng 1,35 × sải cánh, alpha 0,58.
- Gemini (tệp chủ dự án gửi 18:06): bảng đặc trưng 13 tàu (đã chép vào GUI_GPT_V218 mục 3), bảng 6 bậc (đã vào mã), 13 bộ trang bị (chưa dùng). Lưu ý của Claude: theo bảng Gemini có 6 tàu đèn lam / lơ (3, 5, 8, 9, 10, 12) — chờ chủ dự án quyết có giữ tàu 10 đèn lục không.
- Đạn chính tàu 8 và tàu 10 (gói V217_DAN_TAU_8_10, 10 tệp): ĐẠT quy cách (phần vẽ cao 91 / 96 / 104 / 107 px, căn giữa, không đỏ hồng) → đã chép vào src/fx16art (cũ: src/fx16art_cu_v217/). Claude lật dọc fx16_pb_9_muzzle.png vì GPT vẽ lửa chớp nòng chĩa xuống. Tia trúng đích tàu 10 (D2P #45D2FF, hit_cross 192°) nay lệch màu với đạn cam — chờ chốt màu đèn tàu 10.
- CHỦ DỰ ÁN CHỐT 18:32: (1) KHÔNG phát hành V218 bây giờ, chờ GPT sửa đợt 2; (2) tàu 10 GIỮ ĐÈN LỤC #8FD94A (D2P 9 và hit_cross 95° đã đổi; bảng gửi GPT đã sửa); (3) Bạo Tẩu NỚI rực hơn mức trần Gemini: SPAN_MAX 1,9, SPAN_K 1,5, A_K 1,45, A_MAX 0,85 trong btfx218.js.
- t156 14/14 (bản dựng có tranh mới). Chưa chạy t209 / t204 / t206 / t207 cho bản này.

### V218 (chưa phát hành, không đổi gì khi chưa có tranh) · 10/11 · Máy chuyển động Bạo Tẩu cho mảnh rời GPT
- src/btfx218.js (BtFx218.back / front) + v118.js gọi trước và sau khi vẽ thân + skin69.js ghi bậc a.__f lên atlas + build74_mau.py nạp src/btfx218/tauN_fx_*.png thành BTFX218_ART. Thư mục src/btfx218 đang RỖNG → game y như V217. Tắt: window.BTFX218=false.
- Mỏ neo tự dò từ ô Bạo Tẩu của atlas (96×96): họng động cơ = điểm thấp nhất nửa trái / phải quanh trục giữa; mũi cánh = điểm mép xa tâm nhất trong 10 cung; mép thân cho hạt lấp lánh. Bảng tăng theo bậc LV trong btfx218.js (số lửa mũi cánh, dài lửa, số tia sét, số hạt, cỡ ánh sáng) — chờ Gemini góp số.
- Chỉ áp cho tàu 1–10 (đường vẽ v118, id ≤ 9). Tàu 11–13 vẽ theo đường khác, chưa nối.
- Thử bằng bộ mảnh TẠM vẽ bằng mã: python3 claude_tools/demo217/kit_tam.py <thư mục> rồi BTFX218_DIR=<thư mục> python3 build74_mau.py; quay trong game: claude_tools/demo217/quay218.py. Bộ tạm KHÔNG nằm trong repo phát hành.
- Chủ dự án (17:40): nhịp chuyển động như bản mẫu 3 là vừa; đạn tàu 8 / tàu 10 làm lại theo chuẩn mới (đã thêm vào GUI_GPT_V217); cho phép hỏi ý Gemini và GPT về thiết kế → docs_claude/GUI_GEMINI_V217_DAC_TRUNG_HIEU_UNG.md.
- t156 14/14 (bản dựng mặc định).

### V217 · 10/11 · Cân đối cỡ 13 chiến cơ + chốt hướng mỹ thuật mới
- Chủ dự án: hiệu ứng siêu cấp của GPT "lòe loẹt, chưa ngầu"; chiến cơ "cái quá dẹt, cái quá to"; toàn bộ đồ họa "chưa đồng bộ" → sửa theo phong cách hiện đại – tương lai (tham khảo CẢM GIÁC tựa game gốc, không chép).
- ĐÃ LÀM: claude_tools/candoi217.py + build74_mau.py — cân đối lúc dựng (tệp gốc src/ship118 giữ nguyên): cỡ chuẩn theo bậc G = căn(rộng×cao) 345 → 405; nắn tỉ lệ tối đa 12 % nếu rộng/cao > 1,30 hoặc < 0,75; bản _bt dùng cùng hệ số với bản thường. Tắt: CANDOI217=0 khi dựng. Số đo gốc: tàu 8 dẹt 1,47–1,85; tàu 6 gầy 0,44–0,75; tàu 4 thuong/lam 0,48/0,62; tàu 1, 3, 7, 11–13 chiếm 85–97 % khung.
- CHỐT Bạo Tẩu (chủ dự án): vẫn có lửa, sét, cánh và thân bung ra, nhưng lửa / sét / lấp lánh là HIỆU ỨNG ĐỘNG vẽ bằng mã, không dày; GPT chỉ vẽ thân bung, không vẽ hiệu ứng. Bản mẫu (chưa vào game): claude_tools/demo217/demo3.html — cánh năng lượng trong suốt xòe sau lưng (blade), vệt lửa mũi cánh (tail), sét giữa các mũi cánh (bolt), sao lấp lánh (glint), vệt bóng quét thân, lửa đẩy có kim cương sốc. Chủ dự án yêu cầu "thiết kế lại cho đẹp hơn" → còn phải duyệt bản mẫu 3 rồi mới đưa vào v118.js.
- SỬA CHỐT Bạo Tẩu (17:34): lửa, sét, ánh sáng do GPT THIẾT KẾ theo từng chiến cơ / trang bị thành MẢNH RỜI (bộ 8 tệp tauN_fx_lua_1..3, _set_1..3, _sang, _hat; quy ước ở mục A.8 của GUI_GPT_V217), Claude làm CHUYỂN ĐỘNG bằng mã. Mẫu đầu: tàu 9, tàu 10. Bản mẫu demo3 (hiệu ứng vẽ hoàn toàn bằng mã) chỉ còn là tham khảo cách chuyển động.
- CHỐT vẽ lại: tàu 8 và tàu 6 (dáng), tàu 4 bậc thuong + lam. Bộ chuẩn + yêu cầu gửi GPT: docs_claude/GUI_GPT_V217_CHUAN_PHONG_CACH.md.
- CHƯA GHÉP: 28 tranh đợt "TAU_8_9_10_BAN_THU" (18 bản _bt có lửa vẽ sẵn → trái hướng mới; 10 tranh đạn tàu 8 / tàu 10 màu ổn nhưng cỡ không tăng theo bậc, chủ dự án chưa trả lời).
- Test: t156 14/14; t209 20/20; t204 8/8; t207 8/8; t206 7/7 (chạy lần lượt).

### V216 · 10/11 · Tranh mới tàu 4 (Bạo Tẩu), 8, 9, 10
- src/ship118: tau4_*_bt (6) + tau8/9/10_* (36) = tranh GPT (cũ: src/ship118_cu_v215/). Không căn bằng mã.
- Đo (tranh216/do.py, chuẩn kiểm duyệt): tàu 4 _bt ĐẠT (diện tích ×1,48–2,52; số đo thân +9% là nhiễu do mũi khoan trắng). Tàu 8/9/10 bản thường ĐẠT (thân 6 bậc lệch ≤1–2%; tàu 8 ss +10%, tàu 10 ss +24% vì có vòng pháo đài — xem bằng mắt thì thân giữa cùng cỡ).
- CÒN YẾU, đã nhờ GPT vẽ lại: Bạo Tẩu 8/9/10 diện tích chỉ ×0,55–1,37 (chuẩn ≥1,5), thiếu quầng năng lượng; tàu 9 phân cánh mảnh hơn cánh thường; tàu 10 ss_bt mất vòng pháo đài.
- Màu: NEW213 7/8/9 = #FF8A2A / #5CC8FF / #8FD94A; D2P 7/8/9 = #4FC8FF / #5FD0FF / #45D2FF; fx215 NEWC 8/9 = #6cc8ff / #8fd94a; hit_cross quay về 192°.

### V215 · 10/11 · Mục B: phe ta không còn đỏ / hồng của đạn địch
- Dò bằng bọc hàm vẽ canvas (work/probe/probe_red.py; hook phải gắn bằng add_init_script trước khi game nạp, và imgRed phải gọi drawImage gốc để khỏi đệ quy).
- Nguồn tìm ra: (1) "đạn kim hồng" = VisualFX.drawShot (base V42) đạn Bạo Tẩu dự phòng đổi vòng ['#fff0b0','#ff9454','#ff84b0'] — tàu 6, 7, 10; (2) "vạch đỏ dọc" = tia cảnh báo chướng ngại PHE ĐỊCH (hazardBeam → __beam122) — giữ; (3) đạn + chớp nòng tàu 4 tranh fx16_pb_3_* tông 305°; (4) Evo53 mức 4 vẫn cầu vồng (đuôi đạn, hạt sao, quầng trang bị, tia sét, vòng khiên); (5) tranh trúng đích hit_slash/hit_cross/hit_impale/hit_pillar(_cot)/hit_vortex/hit_phoenix/hit_blast có đỏ/hồng; (6) Fighters28.profiles[].color cũ (vệt tàu con, quầng Bạo Tẩu v118, wing87): tàu 8 #ff8167, tàu 9 #ef8bff.
- Sửa: src/fx215.js mới (Fx215.ship/tint/lime/hit; màu hồ sơ tàu theo tranh mới); fx16.js đạn + chớp nòng tàu 4 quay tông → lục acid 85°; v120.js art() quay tông tranh trúng đích; evo53.js hue() → màu tàu, tia sét MỌI mức theo màu tàu (bỏ vàng #ffd54a ở mức 1–3 — chủ dự án giao Claude cân đối); build74_mau.py rep đạn Bạo Tẩu dự phòng. Tắt toàn bộ: window.FX215=false.
- Đạn tàu 4: chủ dự án giao Claude chọn → hướng 1 (đổi bằng mã); tranh đạn mới gộp vào đợt GPT vẽ tàu con hộ tống.
- base/Phi_Doi_Sao_Bang_V42.html + src/boot66.html nay có trong repo (ngoại lệ .gitignore) — trước đây thiếu nên phiên mới không dựng được.
- Artifact cũ U5HfBzLWPfPvtUECHaALbq KHÔNG đọc được từ tài khoản phiên này → đăng artifact MỚI https://claude.ai/artifact/9gvhFjgUcET4MsYQNncNmC, khai báo quyền db (lb/{self}, tele/{self}) + user + downloads cho cloud78/dl78.
- Test: t156 14/14; t209 20/20 (chạy riêng; chạy song song từng trượt mục "phá chướng ngại khi Bạo Tẩu +0,7 s"); t204 8/8; t206 7/7; t207 8/8. Quét màu 13 tàu: phe ta 0 điểm đỏ/hồng.

### V214 · 10/11 · Tranh mới tàu 4, 5, 6 + bỏ nhuộm màu tiến hóa
- src/ship118/tau{4,5,6}_* + tau2_thuong_bt = tranh GPT (cũ: work/sao_luu_tau456_cu). Claude căn bằng mã: tau4_luc_bt ×1,12; tau4_ss_bt ×1,13 (đáng ra ×1,21 nhưng tràn khung → thân vẫn nhỏ ~6%); tau6_thuong_bt dịch −18 px; tau6_luc_bt ×1,06; tau6_ss_bt ×1,15. Tàu 4: 6 bản _bt yếu → đã yêu cầu GPT vẽ lại (out/GUI_GPT_TAU_8_9_10.md mục A).
- evo53.js paint(): t 1..4 → nhánh t>=11 (giữ màu gốc, chỉ sáng/óng theo mức) cho MỌI tranh (trang bị, thân tàu atlas cũ, đạn chính ShotV2); Fighters28.draw không đổi s.color nữa. Chủ dự án duyệt bỏ nhuộm trang bị; Claude mở rộng sang đạn chính/thân theo luật "tiến hóa theo đặc trưng". Cờ EVO213=false.
- D2P + NEW213: tàu 4 #9BE83A, tàu 5 #7FD6FF, tàu 6 #B9A6FF.
- CÒN LỆCH: đạn chính tàu 4 vẫn là mũi tên HỒNG CÁNH SEN (tranh fx16_pb cũ) trong khi tàu mới màu lục → cần tranh đạn mới hoặc đổi màu bằng mã. Tàu con hộ tống vẫn tranh cũ.
- t156 14/14. Web v155. Tiếp: tàu 8, 9, 10.

### V213b · 10/11 · Tia / đạn trang bị giữ màu riêng ở +4, +5
- Phát hiện: "tia tím hồng" là tia vũ khí phụ rail (gốc lam ngọc) bị Evo53 (script evo-v55, src/evo53.js) NHUỘM LẠI theo mức cường hóa: +1 cyan · +3 bạc · +4 VÀNG (#e0a72a) · +5 CẦU VỒNG (tierN; SSS: +3/+6/+8/+10). gearAssets() là Proxy bọc mọi tranh trang bị (pod, shell, tia, đạn).
- Sửa (chủ dự án đồng ý tách tia khỏi màu đạn địch): khóa có _(beam|projectile|impact|muzzle|trail) ở t>=3 → t+10 → paint() nhánh t>=13 chỉ làm sáng + óng, GIỮ MÀU GỐC. Cờ EVO213=false trả về cũ.
- CHƯA đổi: pod / shell (tàu con, bệ, giáp) vẫn bị nhuộm vàng ở +4 và cầu vồng ở +5 → trái luật "tiến hóa không tô vàng"; chờ chủ dự án quyết.
- Còn thấy trong trận: đạn kim đỏ-hồng nhỏ và vạch đỏ dọc mảnh của phe ta (chưa xác định mô-đun) → cần dò tiếp.
- Web v153.

### V213 · 10/11 · Tranh mới tàu 1, 2, 3, 7 (phong cách V212E) đã phát hành
- src/ship118/tau{1,2,3,7}_* = tranh GPT V212E (bản cũ: work/sao_luu_tau7_cu, work/sao_luu_tau123_cu). Tàu 1: 6 tranh GPT vẽ lại (thuong, luc, tim5 + _bt) thân nhỏ 12% → Claude phóng ×1,136 (tim5_bt còn lề 7 px). Còn lỗi: tau2_thuong_bt gần như không có hiệu ứng (chờ GPT).
- v120.js D2P tàu 1/2 = #FF9A3D / #3DE0A0; holo212.js NEW213 màu hào quang tàu 1,2,3,7; holo212_art.js rỗng (bỏ mẫu hoạt hình đợt 3).
- Rà soát toàn bộ: out/RA_SOAT_MY_THUAT_V213.md (9 tàu cũ + 7 hợp thể + 3 SSS riêng cần vẽ lại; icon trang bị phần lớn giữ; tàu con hộ tống cần vẽ lại). Cặp hợp thể (0-index): [5,8] [7,5] [9,7] [2,9] [6,2] [0,3] [1,4]. Kỹ năng 13 tàu: Thiêu Đốt, Laser, Đóng Băng, Xuyên Thấu, Tán Xạ, Laser, Trảm Kích, Thiêu Đốt, Song Vũ, Quân Đoàn, Trọng Lực Thôn Phệ, Lưỡng Cực Thời Gian, Phán Quyết Thứ Nguyên.
- Tin nhắn GPT kế tiếp: out/GUI_GPT_TAU_4_5_6.md. Test chụp tàu trong trận: selectCraft(i);launchCraft=i sau pg.reload() (xem /tmp/claude-0/s203/t212f.py → đã chép vào tests/v203_v212/).
- t156 14/14. Web v151. APK V213.26.

### V212C–E · 08/11 · Phong cách mới: chủ dự án DUYỆT tàu #7 (V212E)
- Luật chủ dự án: tiến hóa KHÔNG tô vàng (theo đặc trưng); đồ họa nâng cấp THEO HỆ BẬC CŨ (chiến cơ 6 bậc thuong/luc/lam/tim/tim5/ss × _bt; trang bị icon1-3/tran1-3/tranbt; SSS hop*_tau/chandung/bay/canh); hợp thể = 2 thành phần, kết hợp đồ họa + kỹ năng; phong cách chân thật (hard-surface) nhưng TƯƠI SÁNG, phối màu 60/30/10 (bảng 13 tàu trong DINH_HUONG_MY_THUAT_V212E.md mục 6).
- src/ship118/tau7_* đã thay bằng bộ V212E-SỬA (00:01 09/11: thân _bt khớp, lề ≥32 px, Bạo Tẩu quầng plasma lam; ĐẠT) (bản cũ sao lưu ở work/sao_luu_tau7_cu/). Chưa đăng web/APK (chờ thêm tàu để đồng bộ).
- holo212: HOLO212_ART (src/holo212_art.js) còn mẫu đợt 3 cho tàu 0 và 10 (+ mecha 10); đã bỏ mẫu tàu 6. Lớp mẫu vẽ trong HOLO212Tint, có nhãn "MẪU TRANH V212C".
- Chờ GPT: sửa 3 lỗi tàu 7 (thân _bt co nhỏ, tim5/ss chạm mép, Bạo Tẩu rực hơn) + vẽ tàu 1, 2, 3 theo V212E.

### V212 · 08/11 · ĐỔI ĐỊNH HƯỚNG MỸ THUẬT (chủ dự án chọn "đổi toàn bộ phong cách")
- Luật cũ "giữ phong cách V196 / không vẽ lại 13 tàu" ĐÃ BỎ theo chủ dự án. Học phong cách chung dòng game bắn máy bay cũ (nền bản vẽ navy, 3 nấc thường/siêu cấp/tối thượng, mecha) — KHÔNG chép tranh/logo/tên game gốc.
- out/DINH_HUONG_MY_THUAT_V212.md = brief cho GPT (đợt thử 3 tàu #1/#7/#13 × 3 nấc + nền trưng bày).
- src/holo212.js/.css: HOLO212 phòng trưng bày hologram trên sân khấu sảnh (hangar-v41): rep thay `if(bg){const BGA=` bằng HOLO212Draw(...) + HOLO212Tint sau khung trận. Nút NỀN HOLOGRAM⇄XƯỞNG, 3 nấc; lưu 'saobang-holo212'. Cờ HOLO212.
- Web v147, APK V212.24.

### V210–V211 · 08/11 · Gemini cân nội tại + GPT D2/G3
- v209cfg.js: thêm V210_SURVIVE_AND_EVENT_BAL, V211_ARMOR_EVENT_AND_SURV_FIX + hàm BAL_EV() (V211 > V210 > null). v209.js eff()/listFor(): số đã cân + kế thừa SSS 1/.6/1.25 (k210 hiện "hiệu lực x%"); mô tả lấy icd/trần/số sượt động. v201.js SURV200 anc() đọc BAL_EV().anchors (V211: .84/.66/.61).
- ĐÍNH CHÍNH: đòn thật ở ải 132 = 5,64 máu cho đạn / va chạm / thiên thạch (enemyScale 1,79 chỉ là hệ số gốc). Thiên thạch giữ damage('collision').
- v120.js D2: getter col theo D2P (bảng GPT), cờ D2_211. play47.js G3: tên dài >13 px bỏ phần sau " · " cuối rồi mới thu tới 11 px.
- Test t209.py 20/20 (đã cập nhật số V211). Web v145. APK V211.23.
- REA (morluto/rea, MIT) đã clone đọc tài liệu; không cài (npm bị chặn). Web game IP 180.93.193.152:81 không truy cập được (proxy chặn, Chrome không nối).

### V209 · 08/11 · Gemini V209_ARMOR_EVENT_CONFIG + GPT G3/nền xa
- src/v209cfg.js (hằng số Gemini, ghép TRƯỚC haz208). haz208.js: chCfg() theo chương ceil(level/20), lệch pha tháp phải 1,2 s, turReward (sao lớn 140 + 25 ◈ + 25% buff; cặp +60 ◈ + V77._drop mềm), inX lề 36 px, S9, ev9→V209EV. Cờ HAZ209.
- v77.js: xuất _drop(x,y,soft); huy chương soft lỡ rơi không đứt chuỗi.
- src/v209.js V209EV (D7): 6 nội tại; đồng hồ riêng S.clk; gate icd + trần/phút; bọc damage (tầng chặn S.layer, pool khiên vĩnh viễn, phát hiện shield>0→0), kill (tinh anh), Combat26.breakWing/graze; nhặt buff = viên biến mất trong 130 px (quét drops mỗi khung); huy chương = V77.run().tier tăng. Mô tả .ev209 trên [data-item] giáp + #g44-det SSS (Lv5 cả 2 mẹ). Móc thử window.__arm209. Cờ ARMOR_EV209.
- play47.js G3 (G3_209); bỏ rep dòng 739 build (đã gộp 84 px).
- nen194 ch8–10_xa (làm mượt 32 hàng nối). Test /tmp/claude-0/s203/t209.py 16/16. Web v141.
- CI APK: npm install thử lại; overrides sharp 0.33.5; Gradle 8.2.1-bin + SHA-256 chính thức + mirror Tencent dự phòng (GitHub Releases 504 ngày 08/11). APK V208.20 OK.

### V208 đầy đủ · 08/11 · D1 D4 D5 + nền 6–10 + chướng ngại
- D1: build74_mau.py _icon208 (cắt trong suốt, xoay 45° món dài, lấp 90–96%) cho icon tb133; sửa lỗi vòng G36 (chú thích nuốt mã → 9 icon trùng).
- D4: v208.js nhãn cơ chế .kw208 (regex textContent, tối đa 4). D5: pickup51 sz×1.18 (PICK208).
- Nền đợt B: src/nen194 ch6/7 đủ 3 lớp, ch8–10 chỉ giữa+gần (chap() nhận xa HOẶC giữa). Chờ GPT ch8–10_xa.
- Chướng ngại haz208: ải >100, chỉ đợt quái; đá 6–9 s ≤2, máu 2,5× quái, va = damage('collision'), vỡ rơi sao; tháp đôi 22 s, máu 4×, emit orb 150 mỗi 2,4 s. Đồng hồ trận, xóa khi reset. Cờ HAZ208.
- Web v139. CI: thêm vòng thử lại npm install (sharp/libvips 504).

### V208 · 08/11 · G1 + G2
- G1: v120.js hiệu ứng trúng dùng đồng hồ 'time' (về 0 khi reset) → mục cũ tuổi âm: alpha ~71, kích thước -1202 → vệt sáng vỡ điểm ảnh che màn sau mỗi lần hạ boss sang ải mới. Sửa: clockGuard() xóa st.fx/dots/vort/delay/pend khi đồng hồ lùi + bỏ mục tuổi âm. Tìm bằng hook drawImage (/tmp/claude-0/s208/trace3.py).
- G2: src/v208.js/.css body.rs208 → #st80 lên mép trên khi thẻ kết quả hiện.
- Rà thiết kế: RA_SOAT_THIET_KE_V208.md (D1–D7). Repo thêm: storytold/craft-anything. Blog chiencohuyenthoai chỉ đọc RSS. Web v137, APK V208.15.

## V207 · 08/11 · Gemini V207_DAILY_AND_BOSSRUSH_CONFIG
- src/v207.js (V207_CFG + V207X): Thử thách ngày (5 biến thể; start(kind,mi) ép biến thể khi test), Boss Rush 4 boss (next(): đổi level, Bosses28.reset, startBoss sau 2,5 s). Bọc finishStage36, Missions393.add, damageBoss, updateBoss(tempo), Combat26.bulletFactor/addCharge07. Hợp kim nhặt trong trận thu lại (Progress khóa trong trận → setLocked(false) rồi spendCredits). Khóa saobang-v207.
- Sửa V206: tỉ lệ loạt trúng ghi tại va chạm (damageBoss + Arsenal30.hit). Test t207.py 8/8, t207m.py 5 biến thể. Web v135, APK V207.14.
- Rà đồ họa: RA_SOAT_DO_HOA_V207.md (vệt sáng vỡ điểm ảnh chưa tái hiện; toast đè thẻ kết quả).

## V206 · 08/11 · Gemini+GPT (từ rà soát repo)
- src/v206.js (V206_CFG dữ liệu thuần + V206X): tổng kết sau trận (chèn .s206 vào #rs qua MutationObserver; Report392.hit gom sss/evo/burn07… vào gear; đồng hồ riêng R.el theo frameDtC), phản hồi hạ boss (Core407.slowmo, FX16.feedback.screenShake, xóa đạn ở defeatBoss), công tắc trong Gfx66 (.st206), luyện tập boss (pracStart: bọc finishStage36, Missions393.add, hoàn năng lượng + hợp kim), phản chấn vỡ cánh 12% coreMax (WING206).
- Đường cong máu boss v205.js: [[1,1],[20,2.13],[40,.82],[60,1.00],[80,1.18],[100,1.25],[120,1.33],[140,1.90],[160,2.53],[180,3.84],[200,1.51]].
- PHÁT HIỆN: boss chỉ chết khi 2 cánh vỡ (lõi bị giữ ở 1). Bot đo cũ chọn cánh XA nhất (lỗi) → mọi thời gian cũ dài ảo; t205k.py nay đánh cánh yếu nhất. Test t206.py 7/7. Web v131, APK V206.12.

## V205 · 08/11 · BAL205 (Gemini chốt neo trung vị, #2/#4/#7 giảm ½)
- v120.js K205 (index 0..12) nhân vào per mỗi loạt; window.K205X ghi đè khi đo. v205.js BAL205X: trang bị ×1/2,2/3,9 theo bậc (Progress.stats auxDamage), máu boss chiến dịch theo bảng [[1,1],[20,.92],[40,.60],[60,1],[80,.82],[100,1.05],[120,1.19],[140,1.20],[160,1.67],[180,2.76],[200,2.81]] (vi chỉnh theo đo).
- PHÁT HIỆN: boss chết khi hết máu LÕI dù cánh còn đầy. Số đo cũ "máu mất thật" bị đếm ×2 (boss.hp = lõi+cánh). Thời gian hạ boss thật V204: 40=18,7s · 80=39,9 · 120=33 · 160=59,7 · 180=89,8 · 200=151,6. Bộ đo /tmp/claude-0/s203/t205k.py (power 5).
- Web v129, APK V205.11. Repo tham khảo: 12 bản sao dưới /home/claude/<chủ>/<repo>; báo cáo RA_SOAT_6_REPO_THAM_KHAO.md (đã bỏ tay cầm).

## V204 · 08/11 · EV204 (Gemini chốt sự kiện tuần)
- event83: E204 (tiệm cuối game ≥160: ev_coder_pack/ev_core_pack/ev_hach_pack), grant coder/core/sssCore/chipQ, S.c204 chip q4 mỗi tuần + q6 mỗi 4 tuần (từ ải 110).
- src/v204.js EV204X: T7 onClaim ×1,5 ceil; CN rollStage/Eclipse67.sweep +1 hạch ×3 (khóa saobang-ev204-v1); Chiến cơ tuần rot [[0,7],[5,9],[6,10],[2,12]] ×1,1 shipM chỉ khi Event83.inRaid(). Test /tmp/claude-0/s203/t204.py 8/8 (__ev204dow giả lập thứ).
- Đo tỷ trọng trang bị /tmp/claude-0/s203/t204g.py (+t204h đo máu boss mất thật): SS 4–5%, ★10 +36% tổng; tàu #13 ≈ ½ sát thương thật của #10. Web v127, APK V204.10.

## V203 · 08/11 · ECON203 (Gemini chốt A+B+D)
- chip72: E203/grp203/roll203/hit203/grpBox203, S.pity203 (khóa mới trong state chip cũ), retype dùng nhóm (+1 coder khi khóa), export _t203 để đo.
- adv69/adv70: eclSweep 1/2/3 (adv70 TIER70.sssDrop là bản đang chạy). gear45: weeklyLimit 25. v202.css thêm .g203. tests/t156 sửa mốc 25→24.
- Đo /tmp/claude-0/s203/t203.py (2000 lần/chế độ): ngẫu nhiên 17,8% · khóa 26–31% · chuỗi trượt tối đa 10. t156 14/14. Web v125, APK V203.9.

## V201 · SURVIVE_BAL_V200 (Gemini chốt)
- `src/v201.js` `SURV200.m()`: hệ số sát thương mỗi đòn của địch theo mốc ải, nội suy giữa các mốc. Chỉ áp cho Chiến dịch, không áp khi Dungeons đang chạy.

  | Ải | 1–20 | 40 | 60–100 | 120 | 140 | 160 | 180 | 200 |
  |---|---|---|---|---|---|---|---|---|
  | Hệ số | 1 | 0,90 | 0,80 | 0,90 | 1 | 0,82 | 0,65 | 0,60 |

- Rep ngay tại 2 chỗ trừ khiên / máu trong `damage()` gốc. Tắt: `SURV200=false`.
- Đo lại (t199, quái thường), số đòn chịu được:

  | Ải | 60 | 100 | 140 | 180 | 200 |
  |---|---|---|---|---|---|
  | Đòn chịu | 9,4 | 9,6 | 9,1 | 9,7 | 10,6 |

  Mục tiêu khoảng 10 → đạt.
- **Lưu ý build:** lệnh `replace('V20x','V20y')` trong build đổi nhầm cả tên `SURV200`, nên đã khôi phục bằng tay. Từ nay khi đổi số phiên bản, tránh đặt tên biến có dạng `V2xx`.

### V202 · So sánh khi thay đồ (GPT rà soát V199 mục 3–4)
- **Màn chọn chip:**
  - mỗi chip hiện "▲/▼ lực chiến" nếu lắp vào ô đó (lắp thử trong bộ nhớ rồi hoàn lại, qua `cpIf202`);
  - hiện "x/y dòng có tác dụng" với tàu và trang bị đang dùng;
  - dòng gắn tên có ★ khi trúng món đang dùng;
  - nếu vũ khí không phải chủ chiến thì có lời nhắc.
- **Bảng trang bị (Hub40 `gearSheet`):** dòng "Lực chiến nếu trang bị A → B (▲/▼)", qua `Progress.cpWith202` (rep vào đối tượng xuất `v70:` của Progress).
- Tắt: `CMP202=false`.
- APK `V202.8`.


### V200 · Phòng tập bắn + đo sống sót
**Phòng tập** (`src/v200.js` `TapBan200`, cờ `TAPBAN200`).
- Nút "🎯 TẬP BẮN 30 GIÂY" ở: màn Chip (đầu màn), màn Hợp thể, chi tiết Trang bị SSS. Bấm qua `[data-tb200]`, bắt ở pha capture của document.
- Diễn biến một lần tập:
  - vào ải boss cao nhất đã mở (≤ 160);
  - `enemies=[]; startBoss()` để vào thẳng boss;
  - boss sẵn sàng thì máu ×1e4; tàu bất tử;
  - đo 30 s theo nguồn ở `damageBoss` (đạn chính / trang bị / kỹ năng + bom).
- Kết thúc: thoát bằng chuỗi chuẩn `Revive393.close → Combat26.cancelSkill → PlayScreen.exit(false) → mode='menu' → Lobby.show`, hoàn năng lượng (`V75`).
- Bảng kết quả so với lần trước (khóa mới `saobang-tapban-v200`, tách thường / Bạo Tẩu).
- Kiểm: năng lượng, số ải đã qua và tiền không đổi.

**Bài học:**
- Khi trận chạy, game bật **fullscreen** cho vùng chơi, và có luật `body.play-screen > :not(main){display:none}`. Phần tử nổi phải gắn vào `document.fullscreenElement || body`. Đã sửa luôn hộp thoát của APK199.
- `backToLobby` không phải hàm toàn cục.

**Đo sống sót** (`claude_tools/do_dac/t199_survive.py`): kết quả và câu hỏi cho Gemini ở `DO_SONG_SOT_V200.md`.
- Game trừ máu **trễ** sau `damage()`, nên phải theo dõi máu + khiên liên tục (đo trước/sau `damage()` cho ra 0).

**APK** `V200.7` (Releases).


### V199 · Hoàn thiện APK (`src/v199.js` `APK199`, chỉ chạy khi `Capacitor.isNativePlatform()`)
- **Nút Back:** đang chơi → tạm dừng; đang tạm dừng → chơi tiếp; có bảng mở → bấm nút đóng trên cùng (theo z-index); ở màn con → `Nav74.tab('home')`; ở Sảnh → hộp "Thoát Phi Đội Sao Băng?" rồi `App.exitApp()`.
- **Rời app** (`appStateChange` / `pause`): tạm dừng trận, `Progress.flush` + `DeviceSave.flush`.
- Ẩn StatusBar.
- **Kho GitHub `Lemon1609/phi-doi-sao-bang`, nhánh `build-apk-v198`:**
  - `www/` = bản online đã tách;
  - Capacitor 6 + plugin app / status-bar;
  - `assets/` = biểu tượng + màn chờ dựng từ `ui19/loading_logo.png` (capacitor-assets);
  - quyền VIBRATE;
  - khóa ký cố định `signing/debug.keystore` (androiddebugkey / android), kiểm chữ ký sau build;
  - versionCode = số lần chạy;
  - APK đăng vào Releases (`V199.6`, 62 MB).
- **Cập nhật bản mới:** chép `work/online` vào `www/` (index bọc `<!doctype…>`), sửa `VERSION`, đẩy lên. Máy Claude không tải được Artifacts (chặn blob) nhưng tải được Release asset qua `gh api -H Accept:application/octet-stream`.
- **Còn chờ:** chủ dự án tự chuyển khóa sang Secrets (khi có máy tính); xóa Release `V198.3` (ký sai, Claude không có quyền xóa).


### V198 · Sửa nhỏ
- **Số gọn thêm ở:** tiêu đề Hub (`#hb-res i`), màn Kho (`.arsenal-link`, `.arsenal-heading .wallet`) và thẻ sao SSS.
- **Chip giáp áp cả hồi chiêu giáp SSS** (`sss_e3.js`): mọi mốc `t + cd` của 8 giáp SSS chia cho `E195()` (= max 2 giáp mẹ + TỔNG mọi giáp, trần 1,25). Áp cho tầng chặn, khiên / tàng hình, né sườn, chí tử, hồi máu, kỹ năng. Kiểm: Hoàng Thành Bất Hoại với chip dồn vào giáp mẹ cho eff 1,25, tức hồi tầng 18 s còn 14,4 s; giáp khác vẫn 1,0.
- **Quyết định của chủ dự án (07/11):**
  - giữ nguyên tranh hiện tại;
  - **bỏ** luật mỹ thuật V198 và bộ vẽ thử (chê xấu);
  - dừng việc vẽ lại icon 24 trang bị SSS.


### V197 · Làm gọn khu Hợp thể (chủ dự án: "rối mắt")
**1. Màn Hợp thể chiến cơ** (`src/v197.js` `HT197V`, rep đầu `fusionView` của Hub40). Tắt: `HT197=false`.
- Bố cục mới:
  - 1 robot lớn (tranh chân dung V196B) + tên + nhãn trạng thái;
  - công thức chiến cơ A + chiến cơ B → SSS;
  - 1 nút chính;
  - dải chọn ngang 7 robot.
- Kỹ năng / MAX / tuyệt kỹ / thẻ sao (Meta407) gập trong "Kỹ năng & chi tiết".
- Bỏ lưới 13 chiến cơ thành phần và link "trang đầy đủ".

**2. Điều hướng** (`nav74.js` `NAV197`). Ở mục có chip (Hợp thể), hàng chip **thay** hàng tab con: nút "‹ HỢP THỂ" để quay lại. Còn 2 thanh thay vì 3.
- Lưu ý: tên lớp `.n74x` đã có sẵn (nút đóng), nên dùng `.n197`.

**3. Trang bị SSS** (`gear45.js` `DET197`).
- Nút hành động đưa lên ngay dưới tên món.
- Thông tin rút thành 4 dòng ngắn: Nội tại / Kỹ năng / Bạo Tẩu / Tuyệt kỹ.
- Đoạn mô tả đầy đủ gập trong "Chi tiết".

**4. Số gọn** (`NUM197`): thanh tài nguyên sảnh và tiêu đề Hub hiện 104,5M thay vì 104.504.399; con số đầy đủ để trong title.

**Ghi chú:** bảng "Chiến lợi phẩm thủ lĩnh lần đầu" (`#dr87`, `drop85.js`) hiện ở sảnh khi dùng mã admin (mở khóa boss hàng loạt). Bảng tự mờ đi, người chơi thường chỉ thấy sau khi hạ boss.


### V196B · 7 robot hợp thể vẽ lại lần 2 (GPT, `HOP_THE_V196B_ROBOT.zip`)
- Màu, lõi ngọc và cánh lấy theo dạng chiến cơ (ảnh mẫu `GOI_GPT_CHIEN_CO_MAU_V196B.zip`), giáp kín, dáng nữ tính hơn. Đã thay `src/hop131/`.
- Làm sạch: alpha ≥ 240 → 255 (GPT để thân đục 246–253), alpha < 18 → 0, mép ngoài 40 px mờ dần.

### V196 · 7 robot hợp thể vẽ lại (GPT, `HOP_THE_V196_ROBOT.zip`, đã thay bằng V196B)
- 14 tranh 1024 → `src/hop131/` (bản cũ lưu ở bản nguồn V195).
- Đã làm sạch quầng mờ sát mép tranh: alpha < 18 về 0, mép ngoài 48 px mờ dần, phần thân giữ nguyên.
- Atlas sảnh (hàng 2 = chân dung) và atlas trong trận (hàng 2 = bay úp) dựng lại. Tâm lưng đặt ở 44% chiều cao, chung cho cả 7 robot.
- Sửa lỗi build: chú thích chèn giữa dòng 67 từng làm mất bước thu nhỏ tranh bay.
- Nội dung: giáp mecha kín toàn thân, đạt mức game mobile phổ thông.
- Chờ GPT: 24 trang bị hợp thể × 3 bậc icon (3 đợt).


### V195 · Dòng chip cho 13 giáp (Gemini xác nhận 06/11). Cờ tắt: `CHIP195=false`
**Gemini chốt:**
- giữ tỉ lệ 50/50 giữa dòng gắn tên và 6 dòng cũ;
- đích chia đều 4 nhóm 25% (chiến cơ / tên lửa / vũ khí phụ / giáp); đo 3.000 chip ra 26,2 / 24,5 / 24,6 / 24,8%;
- TỔNG mọi VKTT có trần ×1,35.

**Hiệu lực giáp:**
- Công thức: eff = 1 + min(0,25, Σ dòng của giáp + TỔNG mọi giáp). Dòng Bạo Tẩu chỉ tính khi đang Bạo Tẩu.
- Thang phẩm riêng 0,30 / 0,42 / 0,55 / 0,68 / 0,80 / 0,90 / 1.
- Hàm `window.CHIPARM195(variant)`, có cache 250 ms.

**Móc theo từng giáp:**

| Giáp | Áp hiệu lực vào |
|---|---|
| aegis | Tầng chặn tích nhanh ×eff, kỹ năng hồi /eff |
| mirror | Tỉ lệ phản ×eff, sát thương phản ×eff |
| orbital | Hồi chặn sườn /eff, kỹ năng /eff |
| phase | Tỉ lệ vô hiệu ×eff |
| reactive | % giảm sát thương ×eff |
| nanite | Tốc độ hồi ×eff, trần hồi ×eff |
| aurora36 | Hồi khiên /eff |
| void36 | Hồi chiêu /eff, tàng hình ×√eff (≤ 2,5 s) |
| seraph36 | Khiên mỗi tầng ×eff |
| aegis9 | Giảm sát thương ×eff, trần 36% |
| devour10_a | Lượng hồi ×eff, trần hồi ×eff |
| chrono11_a | Hồi chí tử /eff |
| monarch12_a | Tỉ lệ hoãn ×eff, trần 72% |
| 8 giáp SSS | eff = max(2 giáp mẹ) + TỔNG mọi giáp; áp vào giảm sát thương / hoãn (trần 0,9) và mọi lần hồi máu. **Hồi chiêu SSS chưa áp**: SSS dùng mốc thời gian tuyệt đối riêng của từng chiêu, không có bộ đếm chung để nhân dt như gợi ý của Gemini |

**Kiểm:**
- Giáp reactive, 6 chip dồn tối đa (eff 1,25): mất máu mỗi đòn từ 0,393 xuống 0,387.
- t156 14/14.

**Đề vẽ GPT V196** (`gpt_hopthe196/`): thiết kế lại 7 robot hợp thể + 24 trang bị SSS theo phong cách nữ chiến giáp mecha, giáp kín, mức game mobile phổ thông.


### V194 · Chip theo món (Gemini Phần II-B) + tranh GPT nền chương 1–5 + hoạt cảnh mở rương + bỏ vòng elip quanh đạn
**1. Chip theo món** (`src/chip72.js`, cờ `CHIP193`). Chi tiết và số đo: xem `V194_PHAN_HOI_GEMINI_IIB.md`.
- Dòng có thêm trường `t` (đích): `s0..s12` là chiến cơ, `m:<variant>` là tên lửa, `d:<variant>` là vũ khí phụ, `ships|missiles|sidearms|vktt` là đích của dòng TỔNG. Chip cũ không đổi.
- Móc trong trận:
  - đạn chính: rep loạt `mainVolley` × `Chip72.shipM()`;
  - trang bị: bọc `Progress.stats`, `auxDamage` thành getter × `Chip72.gearM(it)` (chỉ khi `mode` là play/pause);
  - VKTT: `X.mod('skill')`.
- Bộ đo mới: `claude_tools/do_dac/t193.py` (đo bật/tắt ×2).

**2. Nền chương 1–5** (`src/v194.js` `NEN194`, ảnh `src/nen194/`, WebP thêm khoảng 0,3 MB). Tắt: `NEN194=false`.
- Lớp xa thay nền sao vẽ bằng mã (qua `im67` của Parallax). Lớp giữa trôi 22 px/s, lớp gần 44 px/s, alpha 0,85; lớp gần tắt ở chế độ nhẹ.
- Khi có tranh thì tắt hành tinh + đá vẽ bằng mã (hành tinh có vành elip); vẫn giữ bụi tốc độ.
- Chương 6–10: chờ đợt B của GPT.

**3. Mở rương** (`Ruong194`, ảnh `src/ruong194/`). Tắt: `RUONG194=false`.
- Móc ở cuối `Chests.open` gốc. Các rương mở cùng lúc (Vô tận, mở tất cả) gộp thành 1 hoạt cảnh theo phẩm cao nhất.
- Màu cột sáng:

  | Phẩm | Cột sáng |
  |---|---|
  | APEX | vàng + tia nắng xoay |
  | S / SS | vàng |
  | Mở khóa món mới | tím |
  | Phôi Lam | lam |
  | Còn lại | chỉ bật nắp |

- Thời lượng 0,9–1,9 s, chạm để bỏ qua; không chạy khi đang trong trận; tôn trọng chế độ giảm chuyển động. Ảnh `cot_sang_cam` đã nạp nhưng chưa dùng (rương không ra phẩm Cam).

**4. Vòng elip quanh đạn** (chủ dự án báo từ V192): nguồn là hiệu ứng "cường hóa" trong mã gốc, vẽ elip xoay quanh mỗi viên đạn của món đã cường hóa. Đã tắt (`ENH194=true` để bật lại).

**Kiểm:** t156 14/14; chụp trận ải 3/43/83 có nền mới, đạn đỏ và sao vàng nổi rõ, không còn elip; chụp 5 mức rương; không lỗi.


### V192 · Cảm giác bắn (ý tưởng #1 của Claude, chủ dự án đồng ý 06/11)
Mô-đun mới `src/v192.js` (`FEEL192`), chèn trong `build74_mau.py` ngay trước mô-đun v191. Chỉ đổi phần hình, không đổi sát thương, máu hay va chạm.

| Hiệu ứng | Cách làm | Giới hạn |
|---|---|---|
| Quái chớp sáng khi trúng đạn | Bọc `Render27.hit` → `e.f192`; bọc `EnemyFleet.drawEnemy` vẽ lại sprite chế độ `lighter`, alpha 0,55, trong 60 ms | Tối đa 1 lần / 150 ms / quái; không áp cho boss (boss có chớp riêng V117); chạy cả ở chế độ nhẹ, tắt khi giảm chuyển động |
| Quái chết vỡ mảnh | Bọc `kill`: 7 mảnh (10 với quái lớn/tinh anh, 4 ở chế độ nhẹ), văng – rơi – xoay – mờ; vẽ dưới vật phẩm rơi (bọc `Loot40.draw`) | Tối đa 140 mảnh trên màn; màu kim loại xám + cam, **không vòng, không chữ** |
| Khựng hình | Bọc `update`: `dt×0,08` khi còn `hs` | Phá cánh boss 70 ms + rung 0,15; hạ tinh anh/quái lớn 45 ms + rung 0,08. Tôn trọng công tắc Rung màn (V78) và giảm chuyển động |

- Tắt cả: `window.FEEL192=false`. Trạng thái: `V192.state()`.
- Lưu ý mã: `Render27`, `EnemyFleet`, `Loot40`, `Combat26` là hằng toàn cục, **không** nằm trên `window` → kiểm bằng `typeof`.

**Đo (máy thử không GPU):**
- Chớp: độ sáng vùng quái tăng từ RGB (43,41,57) lên (81,85,107), tức sáng gần gấp đôi trong 60 ms.
- Mảnh vỡ: tối đa 93 mảnh cùng lúc ở ải 4 (bộ admin), không lỗi.
- t156: 14/14.

**Ghi chú:** máy thử headless tự rơi vào chế độ hiệu ứng nhẹ (FPS thấp), nên mảnh vỡ ở đó chỉ 4/quái. Trên điện thoại khỏe sẽ là 7–10.

**Đề vẽ đã gửi GPT cùng đợt:**
- `PROMPT_GPT_NEN_CHUONG_V192.md`: nền 3 lớp trôi chậm cho 10 chương;
- `PROMPT_GPT_MO_RUONG_V192.md`: tranh mở rương có cột sáng theo phẩm.


### V191 · Lực chiến theo bậc (Gemini attack_moi, chỉ cộng vào lực chiến) + chip: tẩy thông số / tẩy dòng
- **`src/v191.js` (`BAL191`):**
  - bọc `Combat.stats`: `cp += (k.s·hull + k.g·gear) × 0,81 × m × 24`, với m = `r.attack / ((hull+gear) × 0,81)`; **không đổi `r.attack`**;
  - bọc `Combat.stageRequirement` (chiến dịch, không Nguyệt Thực) bằng bảng neo nội suy; đặt cờ `__188` để v188 không bọc chồng (v188 vẫn nhân máu boss);
  - đo lại bằng `claude_tools/do_dac/t191cp.py` (lực chiến 3 bậc, không đánh).
- **`src/chip72.js`:**
  - `calib()` (tẩy thông số, `c.cal[idx]`), `retype()` (tẩy dòng, giữ `u`, `c.reb`);
  - bảng giá `CAL191` / `RRT191`, `UNL191` (110 / 125 / 145);
  - nút mới `data-a="cal" / "typ"` thay `ref` / `reb` khi `CHIP191` bật (hàm cũ giữ nguyên);
  - q = 6 (Tuyệt mật) rơi ngẫu nhiên bị hạ thành q = 5 trước ải 145;
  - khóa nút 0,6 s khi `q190 ≥ 0,8`; ngang nhau hiện "=".
- **`tests/t156.py`:** bước 7 tự cấp món mẹ thiếu (admin không có `swarm9` → trước đó trượt theo ngày, cả trên V190).
- Phản hồi Gemini: `V191_PHAN_HOI_GEMINI.md`.
- t156 14/14 · smoke sạch · artifact phiên bản 103.

### V190 · Chip VKTT chống bấm nhầm · cột / tia SSS gọn · đo đủ 6 mốc sức bắn
- **`chip72.js` `candPanel`:**
  - `q190` = giá trị dòng / giá trị tối đa của chính dòng đó;
  - dòng mới tốt hơn: `up ▲` xanh; kém hơn: `.dn190 ▼` đỏ (CSS ở `adv69.css`);
  - bỏ dòng tốt hơn (GIỮ CŨ khi mới tốt hơn, hoặc NHẬN MỚI khi mới kém hơn) phải bấm 2 lần, có cảnh báo đỏ;
  - cờ tắt `CHIP190=false`.
- **Cột SSS E3** (`sss_e3.js` `k==='col'`): rộng tối đa 72 px, alpha ×0,82.
- **`skill81.js` `bmDraw`:** rộng tối đa 72 px, Bạo Tẩu alpha ×0,8.
  - Cờ tắt cả hai: `COL190=false`.
- **`claude_tools/do_dac/t190.py`:** đo boss 3 lần × 30 s, Combat.factor = 1, tách nguồn tại `damageBoss`.
  - Kết quả 6 mốc trong `BAN_GIAO_GPT_GEMINI_V190.md` mục 6.1, số thô `ban_giao_v189/so_do_t190/`.
- t156 14/14 · smoke sạch · artifact phiên bản 101.

### V189 · D2: hạ ngưỡng lộ trình chiến cơ S/SS (Gemini) · D3 chưa áp
- `ship79.js` ROUTE (cờ `D2_189`):
  - #6 S: 240 sao / Tháp 20;
  - #7 S: 300 sao / mùa 12;
  - #8 SS: 360 sao / 35 lượt quay.
- D3 (lực chiến × hệ số bậc ×1/×2/×9) **chưa áp**, xem `out/DO_KHO_V189.md`:
  - tỉ lệ DPS theo bậc đổi theo ải: ải 100 thường→S ×4,3, S→SS ×1,7; ải 200 thường→S ×1,0, S→SS ×4,3;
  - đo boss một lần nhiễu ×3;
  - lực chiến được đọc ở 60 chỗ / 27 mô-đun.
- Bước tiếp: đo lặp trên ải thường, rồi Gemini cộng phần đặc thù bậc vào `attack`.
- t156 14/14 · smoke sạch · artifact phiên bản 99.

### V188 · Cân bằng độ khó theo số đo V187 + bảng Gemini
- **`src/v188.js` (`BAL188`):**
  - bọc ngoài cùng `Combat.stageRequirement` (bọc lại mỗi giây nếu bị thay), chỉ áp chiến dịch, Nguyệt Thực giữ nguyên;
  - hệ số = đề nghị Gemini / giá trị gốc tại các mốc 20/40/60/80/90/100/110/120/130/140/150/200, nội suy tuyến tính, ải 1/160/180 hệ số 1;
  - máu boss ải 10–80 nhân khi `bossHealthReady`;
  - `BOSSHP87` 100 ×1,09 / 120 ×0,69 / 140 ×0,86;
  - tắt bằng `BAL188=false`.
- **Nguồn bậc S/SS:**
  - rơi ngẫu nhiên: Phó bản Trang bị / Vô tận, bảo hiểm 149, chiến cơ chỉ khoảng 20% bể;
  - lộ trình chắc chắn `ship79.js` ROUTE (sao 330/390/450, Tháp 25/32, mùa 15, vòng quay 40, ải 160).
- **Đo lại:** ải 20 mới tinh 10,1 s · 40: 11,0 s · 80: 17,2 s · 120: 25,7 s · 140 bậc S: **91,9 s** (DPS bậc S = 22% bậc SS dù lực chiến bằng 72%).
  - Báo cáo `out/DO_KHO_V188.md`; quyết định D1/D2/D3 đang chờ.
- **Kịch bản đo:** `t89p.py` (thêm mốc 20–80, chờ boss 150 s) · `t187_moitinh.py`.
- t156 14/14 · smoke sạch · artifact phiên bản 97.

### V187 · Đạn GPT cho mọi chế độ + đo độ khó ải 20–200
- **`art86.js` pal():** ngoài chiến dịch (Vô tận / phó bản) dùng bộ `do`; raid sự kiện dùng `hong`. Tắt bằng `DAN185B=false`.
- **Đo độ khó:** báo cáo `out/DO_KHO_V187.md`.
  - `t89p.py` thêm tài khoản mẫu 20/40/60/80 (Claude giả định) và chờ boss tới 150 s.
  - `t187_moitinh.py`: tài khoản mới tinh, gieo `hangar.cleared`.
  - Kết quả chính:
    - tường thật ở ải 100 (cần bậc S) và ải 140 (cần SS, mức đề nghị +61% so với ải 120);
    - boss ải 20–80 chết dưới 10 s ở mức nhanh nhất;
    - boss ải 100–200 chết trong 17–43 s;
    - sát thương mỗi đòn = `enemyScale` (0,91 → 1,56).
  - Đề xuất A (máu boss sớm ×3), B (chia nấc ải 130), C (đo nguồn mảnh): chờ duyệt.
- t156 14/14 · smoke sạch · artifact phiên bản 95.

### V186 · Bộ đạn địch GPT (đỏ / hồng tâm trắng)
- Gói `DAN_DICH_V185.zip` (8 PNG 128²) → `src/ebullet115/ebullet_<needle|orb|orb_big|shard>_<do|hong>.png` (build thu về 64 px như bộ cũ).
- `art86.js` PAL: ải 1–100 `do`, ải 101–200 `hong`. Quay về bản tạm V185 bằng `DAN185B=false`; về bộ 10 màu gốc bằng `DAN185=false`.
- Ảnh soát: `out/SOAT_V186_dan_dich.png` (boss chương 1, 5, 9).
- t156 14/14 · smoke sạch · artifact phiên bản 93.

### V185 · Tranh GPT sao điểm + mảnh chiến cơ · đạn địch tạm đỏ tâm trắng
- **Gói GPT `V184_SAO_MANH_CHIEN_CO.zip`** → `src/v185/`:
  - `sao_diem_32.png`: `STAR183` dùng thẳng, không phủ màu; tắt bằng `SAO185=false`;
  - `manh_chien_co_ngay4_128.png`: ô Ngày 4 điểm danh, 44 px; tắt bằng `MANH185=false`;
  - nạp qua script `v185-art` (`SAO185`, `MANH185` dạng data PNG).
- **Đạn địch (`art86.js` PAL):**
  - 10 chương tạm map sang bộ đỏ có sẵn: frost / omega / nebula xoay vòng, chương 10 abyss (hồng);
  - bỏ wraith (cam), ion và void (vàng), lava (cam), hunter (tím), titan (cam đỏ);
  - tắt bằng `DAN185=false`. Chỉ áp chiến dịch (Vô tận / phó bản / raid giữ đạn cũ).
- **Đề cho GPT:** `out/GOI_GPT_DAN_DICH_V185.zip`, gồm `PROMPT_GPT_DAN_DICH_V185.md` (8 PNG: 4 dáng × đỏ / hồng, 128²) và `DAN_DICH_HIEN_TAI_40.png`.
  - Khi nhận: thay `src/ebullet115/ebullet_<dáng>_<theme>.png`, hoặc thêm theme mới `do` / `hong` vào PAL.
- t156 14/14 · smoke sạch · artifact phiên bản 91.

### V184 · Áp 5 quyết định của chủ dự án + boss vào màn tuần tự + sửa popup điểm danh
- **Quyết định chốt 01/11 (cập nhật luật khóa):**
  - sao điểm **vàng dịu** (#D5A13B, lõi #FFE49A), nhỏ hơn (cỡ = s×0,92);
  - khiên **giữ tròn nhưng mờ, mảnh** (`armor69.js`: alpha ×0,55, viền 1,1 px; tắt `SH183=false`);
  - **bộ buff 6 viên** (bỏ drone);
  - **đạn địch đỏ tâm trắng** (chờ GPT vẽ bộ đạn);
  - **huy chương liên hoàn tự hút** trong 120 px, 520 px/s (`v77.js`; tắt `MEDAL183=false`).
- **Boss vào màn (`BOSS183`):**
  - băng tên boss giữa màn (Feedback31) tắt;
  - dải cảnh báo fx-v402 dời lên y = H×0,16, sọc 12 px, dòng 2 là "LV.x · BOSS LỚN · <TÊN>" (`BOSSNM183` lấy BOSSNAME80 nếu có);
  - tắt viền đỏ nhấp nháy `#game-field.boss-warn::after`;
  - xóa đạn địch khi bắt đầu cảnh báo;
  - lời đe dọa (story80 → Row79) chờ hết `pending` mới hiện.
- **Popup điểm danh lần đầu:** do tệp 70 MB parse chậm, bộ hẹn giờ Meta40 chạy khi `Onboard66` chưa có, nên điều kiện cũ `typeof==='undefined'` cho qua. Nay bắt buộc `Onboard66.open('daily')` (mở ở ải 3). Đã thử người mới: không bật; người cũ (`seen` có `daily`): vẫn bật.
- **Hào quang Danh hiệu (title84, lục giác dưới tàu):** không vẽ trong trận / tạm dừng (`AURA184=false` để bật lại). Sảnh giữ nguyên.
- **Kịch bản đo:** `claude_tools/do_dac/t184.py` (popup lần đầu + chụp boss vào màn).
- t156 14/14 · smoke sạch · artifact phiên bản 89.
- **Còn lại từ đối chiếu:**
  - Bạo Tẩu hạ chói tia SSS;
  - bảng mở khóa bổ sung (phi công, đá, VKTT, danh hiệu, Lv SSS, OC — UNLOCK66 đã có điểm danh 3, kho báu 5, phó bản 8/12/15/20, thử thách 10, tháp 15, Vô tận 25, ngọc 35, SSS 40);
  - mô phỏng độ khó;
  - tách tranh thành tệp riêng + APK.
- **Ghi chú:** sao lưu mã / tệp .json đã có từ V63 (nút SAO LƯU ở sảnh).

### V183 · Hiệu năng + đọc trận (việc 1 sau kiểm tra tổng thể V182)
- **Kiểm tra tổng thể:** `out/review183/` (báo cáo, đề Gemini/GPT, ảnh, `DOI_CHIEU_GEMINI_GPT_V183.md`). Kịch bản `claude_tools/do_dac/t183_audit.py` (tải/heap/FPS/ảnh), `t183_prof.py` (hồ sơ CPU + hàm gọi native), `t183_dem.py` (save/gradient mỗi khung), `t183_ve.py` (đo riêng vẽ vật phẩm), `t183_dung.py` (dò tranh được vẽ — chưa tin cậy).
- **`src/v183.js` + vá build:**
  - tắt `RV75_BEAM` (vệt sáng dọc dưới sao);
  - sao: thường 25% rơi 1 sao giá trị 56, lớn/tinh anh 1 sao lớn 120/180 (`d.val`), trần 10 sao trên màn (vượt thì cộng điểm thẳng); vẽ bằng canvas dựng sẵn `STAR183`;
  - buff: bỏ cột sáng, 2 cung elip, vòng lan, nhãn chữ; bỏ vòng lan khi nhặt (Pickup51 burst vẫn còn);
  - tự bật hiệu ứng nhẹ (`auto-light`, không lưu) khi V105 đã hạ độ phân giải ≤ 1,5 mà vẫn < 30 FPS 4 giây.
- **`src/fair76.js`:**
  - Tàu Vận Tải rơi 2 sao lớn (140) thay 8 sao nhỏ mỗi nấc;
  - bỏ vòng đệm bom, chữ "CỨU NGUY!", vòng nét đứt + "!" khi nguy kịch (giữ viền đỏ mép màn), vòng + chữ quanh Tàu Vận Tải.
  - Tắt cả V183: `window.DROP183=false`.
- **Đo:** sao 64 → 14/phút; vẽ 30 sao + 4 buff 3,0 → 1,9 ms. FPS toàn trận trên máy không GPU dao động ±20%, không dùng để so sánh; chờ số FPS thật trên điện thoại (Cài đặt → đo FPS).
- **Dung lượng:** chưa giảm (70,3 MB). Nén lại cùng cỡ chỉ được 1–4%; `sss-v40`, `evo53-art`, `canh132-art` vẫn còn được gọi. Hướng thật: tách tranh thành tệp riêng + nạp theo nhu cầu (cùng đợt APK).
- **Phát hiện:** lục giác xanh có sao = huy chương liên hoàn V77 (không hút); lục giác vàng 2 bệ = buff hỏa lực.
- t156 14/14 · smoke sạch · artifact phiên bản 87.

### V182 · Bỏ hẳn buff DRONE HỘ TỐNG (2 chiến cơ phụ trợ xám bay kèm)
- Nguồn: mã gốc V42 (`Loot40.weights()` có `drone:.45`; nhặt → `drone=15` → `escorts()` vẽ 2 tàu bắn kèm 15 giây). Chủ dự án thấy còn rơi trong trận (V181).
- `build74_mau.py` 3 vá: trọng số `drone:0`; `spawn()` đổi mọi drop 'drone' thành 'shield'; nhặt 'drone' (nếu nguồn khác lọt) → +50% giáp, không bật hộ tống.
- Đo `claude_tools/do_dac/t182.py`: 60 giây ải 5 → drop {power, star, bomb}, `drone` luôn 0, 0 lỗi.
- t156 14/14 · smoke sạch · artifact phiên bản 85.

### V181 · Bộ 10/11 (devour, chrono) vẽ bằng tranh SSS
- `src/art82.js`: `sssOf(v)` (đệm 300 ms) + `drawSSS()` — đạn `emitGear` của món mẹ Bộ 07–12 khi có SSS lắp → `<sss>_pn/_ps` (4 khung, 12 hình/giây), `_g_trail`, `_g_muzzle`. Áp cho mọi SSS có món mẹ trong `ART82_MAP` (vd devour10_m, các tên lửa gear81).
- `src/skill81.js`: `sfr()/sfDraw()` khung tranh; `orb` (devour10_s, trước là hình tròn viền) → `pn/ps` SSS; `echo` (chrono11_m, trước là vòng nét đứt) → `in` SSS; `rift` (devour10_m) → `in`; `hg` (trường chrono11_s, trước là đĩa tròn viền) → `is` SSS chạy vòng, alpha 0,42. `s81` có đệm 300 ms.
- Đo `claude_tools/do_dac/t180.py` (tự cấp + hợp thể món mẹ thiếu): devour_chrono_s → g_beam, ps, g_pod; devour_chrono_m → pn, ps, g_trail, g_muzzle, in; chrono_monarch_m → in, ps; chrono_monarch_s → is, g_pod. 0 lỗi. Tắt cả: `window.SSSART=false`.
- t156 14/14 · smoke sạch · artifact phiên bản 83.

### V180 · SSS monarch_rail (24/24 — ĐỦ TRANH) + móc tranh SSS vào đường Skill81
- Gói `SSS_sss_monarch_rail.zip` (Đế Quang Điện Pháo, vũ khí phụ, món mẹ monarch12_s + rail) → `src/sss_art/sss_monarch_rail/` 24 tệp, cắt đúng ngay. **Cả 24 SSS đã có tranh.**
- `src/skill81.js`: thêm `s81(id)` — nếu một SSS đang lắp (sidearm/missiles) có món mẹ = id → `pj()` dùng `<sss>_pn/_ps` (4 khung), `bm()` dùng `<sss>_g_beam_normal/super`. Tắt: `window.SSSART=false`.
- Đo (`claude_tools/do_dac/t180.py`, chặn drawImage, 4 giây Bạo Tẩu): ps SSS hiện cho lance_orbit, halo_carrier, comet_nova, judgement_swarm, chrono_monarch_m; is/tk/g_pod như trước. 0 lỗi.
- Giới hạn còn lại: món mẹ Bộ 10/11 (devour/chrono) vẽ đạn bằng hình khối chứ không qua pj() → chrono_monarch_s, devour_chrono_m/s chỉ hiện in/is/tk/bệ, không đổi đạn. Admin không có devour10_s nên t180 bỏ qua devour_chrono_s.
- t156 14/14 · smoke sạch · đăng 2 đợt, artifact phiên bản 81.

### V179 · Tích hợp tranh SSS chrono_monarch_s (23/24)
- Gói `SSS_sss_chrono_monarch_s.zip` (Pháp Ấn Thời Gian, vũ khí phụ, món mẹ chrono11_s + monarch12_s) → `src/sss_art/sss_chrono_monarch_s/` 24 tệp, cắt đúng ngay.
- Món mẹ Bộ 11/12 (đường Skill81) → trong trận dùng in/is/tk; g_* chờ móc Skill81.
- t156 14/14 · smoke sạch · đăng 2 đợt, artifact phiên bản 79.
- Còn 1: monarch_rail.

### V178 · Tích hợp tranh SSS devour_chrono_s (22/24)
- Gói `SSS_sss_devour_chrono_s.zip` (Thời Không Thôn Phệ, vũ khí phụ, món mẹ devour10_s + chrono11_s) → `src/sss_art/sss_devour_chrono_s/` 24 tệp, cắt đúng ngay.
- Món mẹ thuộc Bộ 10/11 (đường Skill81) → trong trận mới dùng in/is/tk; đạn/tia/bệ g_* chưa thay (việc treo: móc g_* vào Skill81 pj()/bm()).
- t156 14/14 · smoke sạch · đăng 2 đợt, artifact phiên bản 77.
- Còn 2: chrono_monarch_s, monarch_rail.

### V177 · Tích hợp tranh SSS halo_carrier (21/24)
- Gói `SSS_sss_halo_carrier.zip` (Thiên Hoàn Mẫu Hạm, vũ khí phụ, món mẹ halo36 + carrier9) → `src/sss_art/sss_halo_carrier/` 24 tệp. Vòng "halo" vẽ thành 2 cánh cung hở (đúng luật). Cắt đúng ngay.
- t156 14/14 · smoke sạch · đăng 2 đợt, artifact phiên bản 75.
- Còn 3: devour_chrono_s, chrono_monarch_s, monarch_rail.

### V176 · Tích hợp tranh SSS lance_orbit (20/24)
- Gói `SSS_sss_lance_orbit.zip` (Chân Trời Quang Thương, vũ khí phụ, món mẹ lance36 + orbit36) → `src/sss_art/sss_lance_orbit/` 24 tệp. beams 2 tia, tuyet_ky 6 pha + 2 trống: cắt đúng ngay.
- t156 14/14 · smoke sạch · đăng 2 đợt, artifact phiên bản 73.
- Còn 4: halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.

### V175 · Tích hợp tranh SSS ricochet_prism (19/24)
- Gói `SSS_sss_ricochet_prism.zip` (Lục Lăng Băng Đế, vũ khí phụ, món mẹ ricochet + prism) → `src/sss_art/sss_ricochet_prism/` 24 tệp. beams đủ 2 tia, tuyet_ky 6 pha + 2 ô trống: cắt đúng, không cần sửa công cụ.
- t156 14/14 · smoke sạch · đăng 2 đợt, artifact phiên bản 71.
- Còn 5: lance_orbit, halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.

### V174 · Tích hợp tranh SSS solar_gravity (18/24)
- Gói `SSS_sss_solar_gravity.zip` (Nhật Uyên Thần Pháo, vũ khí phụ, món mẹ solar + gravity) → `src/sss_art/sss_solar_gravity/` 24 tệp (có pod, bm, g_pod1–4, g_beam).
- tuyet_ky: 5 pha + 3 ô trống cuối → `even()` V173 nhận đúng.
- `cat_sss.py`: `beams.png` chỉ có **1 tia** (GPT) → dùng cho cả tia thường và tia mạnh (tia mạnh nới rộng 1,3× rồi cắt về 64 px); trước đó bị chia đôi sai.
- Xuất bản: tổng 65MB > giới hạn 64MB/lần → **đăng 2 đợt** cùng url (đợt 1: index + c* + s02–s13; đợt 2: s15–s32). Artifact phiên bản 69.
- t156 14/14 · smoke sạch. Còn 6: ricochet_prism, lance_orbit, halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.

### V173 · Tích hợp tranh SSS monarch_inferno (17/24)
- Gói `SSS_sss_monarch_inferno.zip` → `src/sss_art/sss_monarch_inferno/` (16 tệp: icon1–3, tk, pn/ps, in/is, mz, tr, g_* theo GEAR_FX).
- Món mẹ monarch12_m + inferno → nhánh inferno dùng tranh `g_*` của SSS khi xuất chiến.
- `claude_tools/cat_sss.py` · `even()`: cho phép **nhiều ô trống cuối** (GPT để 2 ô cuối trống ở tuyet_ky 8×448) → tk cắt đúng 6 khung + 2 trống.
- t156 14/14 · smoke online sạch · artifact phiên bản 67.
- Còn 7 SSS vũ khí phụ: solar_gravity, ricochet_prism, lance_orbit, halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.

**Đọc trước:** `out/TONG_HOP_VA_BUOC_TIEP_V142.md` (5 luồng việc A–E, ai làm gì, bước tiếp theo).

Tài liệu cho phiên Claude kế tiếp. Đọc kèm `BAN_GIAO_CLAUDE.md` (lịch sử V44–V116, chi tiết từng hệ thống cũ).

**Mới ở V138:** module `src/v138.js` (gắn ngay sau `<script id="tb133">` trong build):
- Kho trang bị: tàu nằm trên, 3 ô Giáp / Tên lửa / Vũ khí phụ xếp **một hàng** bên dưới (CSS lưới `.hb-doll`). Tắt: `window.DOLL138=false`.
- Chợ Đen / Trạm giao dịch: dải mờ dính đáy `.tr67-wrap` khi còn hàng bên dưới, cuộn tới cuối thì tắt. Bù phần đệm đáy 58 px của v117 qua biến `--f138b`. Tắt: `window.FADE138=false`.
- Viên "Giải cứu" gần boss: chính là kén đồng minh `rescue28`, đã tắt từ V134 (`RESCUE134`), nên không cần sửa thêm.

**16:44 · Gemini trả bản 1 về kỹ năng và nội tại 39 món** (`out/gemini_ky_nang/GEMINI_TRA_V1.txt`; JSON đã tách ở `GEMINI_TRA_V1_items.json`, đủ 39 món; 5 cơ chế `[MỚI]`). Claude duyệt: `DUYET_GEMINI_KY_NANG_V1.md`.
- **Thang máu đo thật:** máu ≈ 9,5, giáp ≈ 5,2; mỗi đòn trừ `enemyScale` 0,9 (ải 20) → 1,5 (từ ải 80), không phân biệt loại đạn; bất tử 1,5 s sau mỗi đòn → khoảng 10 đòn là chết.
- Gemini dùng HP tuyệt đối (aegis chặn 4,2 mỗi viên, nanite 8,5 HP/s), sẽ thành bất tử nên phải đổi sang **% / số đòn**. Mốc đề xuất: giáp cấp 5 cứu 6–8 đòn mỗi phút.
- **Trùng cơ chế:**
  - halo36 ~ disc → halo36 thành "tập trung một mục tiêu";
  - monarch12_s ~ rail → thành "khóa dây chuyền";
  - gravity ~ chrono11_s → gravity thành "đẩy lệch đạn";
  - devour10_s → "nuốt đạn rồi bắn tia";
  - aegis9 cần hiệu ứng tự đứng được.
- **Vi phạm quy tắc:** `formChange` của giáp và tên lửa không được có vật thể lâu quanh tàu; reactive không gây sát thương toàn màn; chrono11_a không hồi sinh (đã có `Revive393`).

**V155 (31/10 10:00) · artifact `U5Hf…` bản 49 · lóa và nóng máy:**
- **Ảnh chủ dự án chụp** (Z Fold 6, bản web Claude): nửa trên màn nhòe trắng cam, cột đỏ dọc theo đạn chính, quái chìm vào nền. Ngoài ra máy nóng.
- **Nguồn:**
  - nền tinh vân tự sinh theo chương (`parallax-v399`, bảng `NEB`, 3 bảng cam đỏ);
  - **bloom** (`BloomQualityC`): chụp cả màn, làm mờ, cộng sáng 14% mỗi khung; chạy khi DPR ≤ 2 và chất lượng cao;
  - màn 120 Hz vẽ 120 khung/s.
- **Sửa** (`build74_mau.py`, các `rep` V155):
  - `BLOOM155`: bloom TẮT mặc định (bật lại: `BLOOM155=true`);
  - `FPS155`: `loop()` bỏ lượt nếu cách lượt trước < 10,5 ms, nên 120 Hz → 60 khung/s; vật lý vốn là bước cố định 1/60 (tắt: `FPS155=false`);
  - `NEB155`: tinh vân nền nén vùng sáng (v > 110 → 110 + (v − 110) × 0,35); cụm sáng ×0,5 (tắt: `NEB155=false`);
  - lớp phủ trắng toàn màn ≤ 0,12 (từ V154).
- **Đo nền** (`claude_tools/do_dac/t155.py` chặn `drawImage` lấy cả dải tinh vân): ải 105 điểm sáng > 150 giảm từ 0,47% → 0,25%, p99 137 → 118.
  - Chưa tái hiện được đúng khung hình nhòe trắng của chủ dự án; cần chủ dự án chơi lại để xác nhận.
- **Gemini Phần E JSON chốt:** `de_gpt/GEMINI_HOP_THE_E_CHOT_JSON.txt` (24 SSS).
  - Nhóm I: 0 Tinh Hạch, 46 nguyên liệu Tím, 115k ◈.
  - Nhóm II–III: 50 Tinh Hạch, 56 nguyên liệu Tím, 200k ◈.
  - `activeSssBinding`; `items_fusion` (ghép đá, quy đổi Tinh Hạch).
  - **CHƯA LẬP TRÌNH.**

**V154 (31/10 09:40) · artifact `U5Hf…` bản 48:**
- **Bỏ hẳn đồng đội bay kèm** (chủ dự án 31/10):
  - `bal86.js` `w134`: tắt phần bù +30% sát thương đạn chính từ ải 40 (bật lại bằng `W134=true`);
  - `v94.js`: bỏ mục tiêu "TÀU ĐỒNG ĐỘI" ở ải 40 trên bản đồ;
  - `ux90.js`: bỏ 2 mẹo và 1 dòng mô tả;
  - `story80.js`: sửa câu thoại "Gọi chiến cơ Đồng Đội".
  - `Wing87` vẫn tắt (`WING87===true` mới chạy); `mate()` trả `null` nên lực chiến không cộng.
  - **LƯU Ý cân bằng:** từ ải 40, đạn chính mất 30% (≈ −23% so với trước) → cần chủ dự án chơi thử ải 40+.
- **Giảm lóa** (chủ dự án bị lóa ở ải 12): build `rep` lớp phủ toàn màn `rgba(190,255,230,flash)` → tối đa 0,12 (tắt bằng `FLASH155=false`).
  - Trước: bom 0,4 · boss chết 0,35 · phá bộ phận cuối 0,2.
  - Đo (`claude_tools/do_dac/t154d.py`, độ sáng trung bình màn 0–255, nền ải 12 ≈ 35): bom 100 → 62; trúng đòn 41; vỡ khiên 68 (chỉ cục bộ tại tàu, giữ); Bạo Tẩu 37–53.
  - Chưa xác nhận đúng nguồn chủ dự án gặp; đã hỏi.
- **Gemini Phần E bản 1** lưu ở `de_gpt/GEMINI_TRA_HOP_THE_E_V1.txt`: 24 SSS (8 / 8 / 8).
  - Nhóm I giữ 9 cặp Bộ 01+02 / 03+04 / 05+06.
  - Nhóm II: Bộ 07+08, 09+10, 11+12, 12+13.
  - Nhóm III: Bộ 13+01.
  - Đã gửi nhận xét (xem tin nhắn): chi phí Tinh Hạch quá nặng và khóa Nhóm I tới ải 160; một số bộ ghép 2 lần.

**V153 (31/10 09:00) · PHẦN K VẬT PHẨM xong · artifact `U5Hf…` bản 47:**
- **Đề:** `de_gpt/PROMPT_GPT_VAT_PHAM_K.md` + `HIEN_TRANG_VAT_PHAM.png`.
  - Bản phác `PHAC_K` đã duyệt; 2 hình sửa: alloy_3 thành tháp đứng, circuit_3 thành khối thoi có ăng-ten.
  - IoU 40 px: alloy 2/3 0,67, circuit 2/3 0,68 → đã sửa.
- **Công cụ cắt:** `claude_tools/cat_vp.py <K1> <K2> <ra>`.
  - Nguyên liệu / đá tách theo cụm (`groups`), vì khoảng trống rộng làm `gaps` đặt 2 nhát vào cùng một khe.
  - Hiệu ứng khung: chia 4 CỘT ĐỀU vùng có hình, dùng cùng khung cắt cho cả 4 ô.
  - Nổ: khung 8 giảm alpha còn 45%.
- **Đã thay** (bản cũ để ở `work/nhan/vp_cu`, gốc GPT ở `work/nhan/vp_k`):
  - `src/mat` alloy / crystal / circuit / plasma 1–3;
  - `src/da` stone_c1–5, stone_x3–5;
  - `src/trade` skin_bullet_1–6, skin_frame_1–6, boom_skin_1–6.
- **Mới:**
  - `src/trade/skin_dan_N.png`: 4 ô 64×128; build thu về 256×128.
  - `src/trade/skin_hieu_ung_N.png`: 4 ô 256; build thu về 768×192.
  - Build loại 2 nhóm này khỏi lệnh thu `skin_*` → 128.
- **`trade67.js`** (tắt bằng `K153=false`):
  - `drawBul` dùng dải `skin_dan_N` động (14 khung/s), bỏ nghiêng 45° của icon cũ;
  - `drawFrame` dùng `skin_hieu_ung_N` (8 khung/s, 168 px, lighter) thay các nét vẽ cũ. Nét cũ có vòng tròn quanh tàu, trái quy tắc.
- **Chụp** (`t153.py`): đạn hoa / cầu tím / lông vàng, khung mạch hồng, nổ pháo hoa / sét / hố đen hiện đúng. 5 bài kiểm thử đạt.
- **Còn lại:**
  - `sss_core` / `sss_shard` (để cho Phần E hợp thể);
  - màn Kho skin chưa chụp (lệnh `Trade67.open` không ăn khi đang trong trận; cần về sảnh trước).
- **Tiếp theo theo lộ trình: PHẦN E — thiết kế lại hợp thể trang bị và vật phẩm** (Gemini: cơ chế + số liệu; GPT: tranh 18 món SSS "ghép bộ phận đặc trưng" của 2 món mẹ, vỏ giáp SSS dạng hở).

**V152 (31/10 08:20) · tranh Bộ 12 + Bộ 13 · XONG PHẦN J (13 bộ × 37 tệp) · artifact `U5Hf…` bản 46:**
- **Bộ 12** (chrono11_a/m/s) và **Bộ 13** (monarch12_a/m/s) vào `src/tb133` (492 tệp), gốc ở `work/nhan/bo12`, `work/nhan/bo13`.
- **Đạn super của chrono11_m** GPT vẽ chúc xuống → cắt với `XOAY_chrono11_m_super=180`.
- **`skill81`:**
  - fx `dive` có thêm `v` (nova36 / chrono11_m dùng chung);
  - `cleave` của monarch12_m vẽ đạn GPT ở giữa nhát chém;
  - tia monarch12_s dùng `<mã>_beam_*` (từ V151).
- **Chụp** (`t152.py`): tàu con đồng hồ cát, tàu con ấn triện vàng, tia tím vàng, nhát chém đều hiện. 5 bài kiểm thử đạt.
  - Vùng `hg` của chrono11_s vẫn là hình tròn mờ có từ V83, chưa đổi (quyết định đã khóa: không vòng tròn quanh tàu/quái; đây là vùng làm chậm — hỏi chủ dự án).
- **Lộ trình tiếp:**
  - Phần K vật phẩm (Phụ lục K: `VP_K1` mat + đá, `VP_K2` skin đạn);
  - sau đó thiết kế lại hợp thể (E).

**V151 (31/10 07:45) · tranh Bộ 10 + Bộ 11 · artifact `U5Hf…` bản 45:**
- **Bộ 10** (aegis9 · swarm9 · carrier9) và **Bộ 11** (devour10_a · devour10_m · devour10_s): mỗi bộ 37 tệp vào `src/tb133`, gốc ở `work/nhan/bo10`, `work/nhan/bo11`.
- **Build:** khối V82 (`_A82`, chạy SAU khối TB133) từng ghi đè `<mã>_icon` và `_pod_*` của Bộ 10–13 bằng tranh `gear81art`.
  - Nay: có `tb133/<mã>_icon1.png` thì giữ icon Phần J; có `tran1` thì giữ tàu con Phần J.
  - Đã kiểm: icon aegis9 / swarm9 trong build có tỉ lệ ≈ 3:1 (tranh mới).
- **`noi_tai147` `drawArt`:** cỡ đạn riêng (swarm9 22 px, carrier9 18 px, devour10_m 32 px).
- **`skill81`:** `fx` beam có thêm `v`. Tia của devour10_s (và monarch12_s khi có tranh) vẽ bằng `<mã>_beam_*` dọc theo hướng a→b.
- **Chụp** (`t151.py`): tàu con carrier9, tên lửa vi mô swarm9, vòng răng devour10_s, tia xanh devour10_s hiện đúng. 5 bài kiểm thử đạt.
- **Đề GPT Bộ 12:** `PROMPT_GPT_BO12.md` (chrono11, sau đó Bộ 13 monarch12 là bộ cuối Phần J).
- **Gói nguồn > 400 MB:** gửi tách `NGUON_V1xx.zip` (bỏ `work/nhan`) + `NHAN_GOC_V1xx.zip`.

**V150 (31/10 07:15) · tranh Bộ 08 + Bộ 09 · artifact `U5Hf…` bản 44:**
- **Bộ 08** (void36 · nova36 · orbit36) và **Bộ 09** (seraph36 · judgement36 · halo36): bản v2 của GPT, mỗi bộ 37 tệp vào `src/tb133`, gốc ở `work/nhan/bo08`, `work/nhan/bo09`.
- **`cat_bo.py`:** thêm `muzzle_peak`.
  - `muzzle.png` dạng dải nhiều trạng thái (rộng > 2× cao) được tách theo khe tối, chọn khung sáng nhất không dính.
  - orbit36 / halo36 là ảnh đơn nên giữ nguyên.
- **`skill81.js`** (`bm()` / `bmDraw()`: tia GPT lặp nối; tắt chung bằng `ART149=false`):
  - nova36: ngư lôi lặn dùng đạn GPT;
  - halo36: vòng bay dùng đạn GPT (lượt về lật 180°);
  - judgement36: mũi định vị rơi xuống, cột sáng = tia `judgement36_beam_*` lặp dọc, rộng 1,3 × w;
  - orbit36: xích = tia `orbit36_beam_*` xoay ngang dài w.
- **`noi_tai147`:** mọi đòn `Skill81` của món có tranh đều phát dải nổ GPT (tối đa 1 lần / 0,12 s mỗi món), không riêng nhóm HIT.
- Chụp trong trận (`t150.py`): xích tia xanh, cột sáng vàng, tàu con mỏ neo và cầu xanh ngọc hiện đúng. 5 bài kiểm thử đạt.
- **Đề GPT Bộ 10:** `PROMPT_GPT_BO10.md` (aegis9 · swarm9 · carrier9; muzzle chỉ 1 hình).
  - Lưu ý: swarm9 / carrier9 bắn đạn thật (GEAR81 `emitGear`). Đạn có nhãn `v147` sẽ tự vẽ bằng `<mã>_projectile_*` qua `drawArt` của `noi_tai147`, cần chụp kiểm tra cỡ (tên lửa 40 px, có thể quá to với tên lửa vi mô của swarm9).

**V149 (31/10 06:30) · artifact `U5Hf…` bản 43:**
- **Tranh GPT cho đòn `Skill81`** (`skill81.js`: `pj()` / `pjDraw()`, tắt bằng `ART149=false`): dùng dải 4 khung `<mã>_projectile_normal|super`.
  - Kiếm comet36: bay lên 52 px; cắm xuống dùng bản super, 66 px, xoay 180°.
  - Mũi thương lance36: 44 px dưới mục tiêu.
  - Khi chưa có tranh thì về khóa cũ `*_proj81n`. Các món Bộ 08–13 khi có tranh: thêm nhánh tương tự (`halo`, `pillar`, `cleave`…).
- **5 đòn có sẵn nội tại → số theo CẤP 1→5** (`G149` / `lv149` = `spec.rank + 1`, tắt bằng `LV149=false` → `D[t]` cũ):
  - judgement36: cột 32→55 px, cấp 5 choáng quái thường 0,5 s;
  - orbit36: xích 120→200 px, 60→100% mỗi quái, chậm 0→35%;
  - chrono11_m: tiếng vọng 45→90% (tổng đòn giữ nguyên B), cấp 5 chậm 30%;
  - chrono11_s: vùng 75→120 px, chậm 20→45% cả quái lẫn đạn;
  - monarch12_m: nhát chém 65→100 px.
- **Đo LV149 với boss bất tử** (`t149b.py`, chặng ổn định):
  - judgement36 + orbit36: 1,19×. Chân Trời trước chỉ đánh boss 60% mỗi lượt, nay về ngang các món khác.
  - monarch12_m + chrono11_s: 1,12× (vùng rộng hơn, trúng boss nhiều hơn).
- 5 bài kiểm thử đạt.
- **Còn lại:**
  - cấp 5 của chrono11_s (+15% sát thương tàu ta) và vết rách chân không của monarch12_m chưa làm;
  - GPT Bộ 08.

**V148 (22:45) · ĐỢT 2 nội tại Bộ 07–13 + tranh Bộ 06, Bộ 07 · artifact `U5Hf…` bản 42:**
- **Phát hiện quan trọng:** Bộ 07–13 KHÔNG bắn đạn qua `Equipment25`.
  - Đòn thường là `Skill81.fire(i)` (đòn riêng từ V83, gây sát thương qua `hurt`); chỉ swarm9, carrier9 (GEAR81) và devour10_m (`emitGear`) có đạn thật.
  - Nhiều nội tại Gemini **đã có sẵn** trong đòn `Skill81`, nên KHÔNG cộng lần 2: judgement36 cột sáng · orbit36 xích · chrono11_m tiếng vọng · chrono11_s trường thời gian · monarch12_m nhát chém.
- **`src/skill81.js`:** 13 lệnh `hurt(` trong `fire(i)` đổi thành `hurtV(i,…)`, gọi `window.NT147_PRE(i,e,d)` → `{d, post}`.
- **`src/noi_tai147.js`** (`NT147`, tắt bằng `NT147=false`; nạp sau `kn147`, id `nt148`):
  - **Vũ khí:**
    - comet36: chí mạng +15→60% khi mục tiêu còn > 70% máu;
    - lance36: +10→35% lên boss / tinh anh, cấp 5 nứt giáp +9%;
    - halo36: dồn tầng 2→6% mỗi đòn, trần 12→36%;
    - nova36: xóa đạn trong 55→100 px;
    - monarch12_s: phù ấn 2→4 mục tiêu, nổ sau 0,8 s, có xích nối;
    - swarm9: trúng dồn +5→25%;
    - devour10_m: bào tử rút 15→40%/s trong 2 s (tối đa 6 bào tử mỗi mục tiêu), +3→7,5% nhận sát thương; cấp 5 lây khi chết;
    - devour10_s: tàu con nuốt đạn trong 45 px, đủ 8→4 viên bắn tia (hồi 3 s, 60→90% DPS tàu con).
  - **Phần cộng thêm** được trừ trước vào sát thương gốc (`norm`), nên đánh 1 mục tiêu giữ ngân sách.
  - **Khuếch đại** (nứt giáp, bào tử) CHỈ nhân sát thương trang bị, vì đạn chính chiếm ≈ 99%; nếu nhân cả đạn chính sẽ thành buff toàn đội.
  - **Giáp (7):**
    - aurora36: 10→6 lần sượt đạn tạo 1 tầng chặn (hồi 25→15 s);
    - void36: máu < 30→35% thì tàng hình 1,2→2 s (hồi 26→18 s);
    - seraph36: nhặt đồ nhận khiên 2,5→5% máu (2→3 tầng, 4 s);
    - aegis9: giảm 8→18% (+ carrier9, tối đa 30%);
    - devour10_a: diệt quái hồi 0,3→0,8% máu (trần 6→10% / 10 s), tinh anh 3→5%;
    - chrono11_a: đòn chí tử giữ 1 máu + bất tử 1→2 s (hồi 90→60 s);
    - monarch12_a: nhận ngay 70→40%, phần còn lại rút dần trong 4 s (sàn 0,3 máu).
  - **Mô tả:** màn chi tiết ghi nội tại cho đủ 39 món (`ky_nang_1b.js` NT).
- **Lỗi đã sửa:** hàm bọc `damage` bị bọc 3 lần.
  - Nguyên nhân: các lần khởi động lặp (sau 0 ms, 1,5 s) không nhận ra hàm của mình khi module khác đã bọc chồng lên sau.
  - Hậu quả: aegis9 giảm 45% thay vì 18%.
  - Đã thêm cờ chỉ cài 1 lần cho cả `noi_tai147` VÀ `noi_tai144` (Đợt 1a có cùng nguy cơ).
- **Tranh Bộ 06** (nanite · stellar · prism) và **Bộ 07** (aurora36 · comet36 · lance36): mỗi bộ 37 tệp vào `src/tb133`, gốc ở `work/nhan/bo06`, `work/nhan/bo07`.
  - Build: icon món "…36" ưu tiên `tb133/<mã>_icon1.png` (khối G36). Khóa hiệu ứng của món chưa có trong GEAR_FX được thêm mới.
  - `noi_tai147` vẽ dải nổ `<mã>_impact_*` khi nội tại kích, và đạn `<mã>_projectile_*` cho đạn thật có gắn nhãn.
  - **Chưa làm:** đòn `Skill81` của comet36 / lance36 vẫn vẽ bằng khóa riêng (`comet36_proj81n`…), chưa dùng dải đạn GPT.
- **Đo:**
  - `claude_tools/do_dac/t148.py`: boss bất tử (sát thương ×1e-4), bật / tắt `NT147` xen kẽ; nhiễu ±10–20%, bỏ chặng đầu.
    - Chặng ổn định nằm trong 0,90–1,06.
    - comet36 cao hơn trong phép đo vì boss luôn > 70% máu; trong trận thật ước khoảng 0,98.
  - `t148e2.py`: thử trực tiếp 7 giáp + phase, phải tắt `SHIELD78` / `BK78` / `FAIR76` (tài khoản admin có nhiều lớp chặn khác).
- **Còn lại:**
  - Số liệu của 5 đòn `Skill81` "đã có sẵn" vẫn theo `SKILL81` (bậc W/G/B/P), chưa khớp số Gemini theo cấp 1→5;
  - kiểm tra phần rút máu dần của monarch12_a trong trận dài;
  - GPT Bộ 08 (đề `PROMPT_GPT_BO08.md`).

**V147 (21:40) · ĐỢT 1b xong · artifact `U5Hf…` bản 41:**
- **12 nội tại tên lửa và vũ khí phụ Bộ 01–06** theo `ky_nang_39_chot.json`. Cấp 1→5 = `spec.rank + 1`, tức ⌊cường hóa/2⌋ + 2 × bậc; món SS ra cấp 5.
  - **Mô phỏng** (`gear_fx_v3.js`, khối V147: `K146` / `L146` / `impact146` / `burn146`; tắt bằng `KN146=false`):
    - inferno: cháy 15→38% trong 35→45 px;
    - solar: nổ lan 30→55 px, phụ 20→35%;
    - thunder: chuyền 2→4 mục tiêu (×0,30→0,35), Bạo Tẩu +2 và tê liệt 0,5 s;
    - rail: mục tiêu sau ×0,5→0,8;
    - cryo: xuyên 1→2 (×0,6);
    - disc: lượt về chém mục tiêu khác 60→100%;
    - spiral: quái chết thì bẻ góc 20→100% (×0,6);
    - ricochet: nảy 1→2 lần, +10→35%;
    - stellar: tách ở quãng 220 px thành 3→5 sao (Bạo Tẩu 7), sao con đi mục tiêu khác nhau, tổng sát thương giữ nguyên;
    - prism: 2→4 mảnh vỡ (×0,12→0,2);
    - singularity / gravity: hố 40→65 px trong 0,8→1,2 s.
  - **Hiệu ứng thật** (`src/ky_nang_1b.js`, `KN146API`, nạp sau `noi_tai144`):
    - làm chậm thật cho cryo / prism (boss nhận ½);
    - cryo phá giáp +0→10% sát thương trang bị (nhân trong `gear45.hurt`);
    - singularity nuốt 6→10 viên đạn mỗi hố và hút quái nhỏ;
    - gravity đẩy lệch đạn 15→38°; Bạo Tẩu mở hành lang 120 px;
    - kỹ năng: cryo giảm tốc đạn 30%, prism trận băng 50%, gravity đẩy dạt đạn, singularity đặt 2 hố.
  - **Màn chi tiết:** nối thêm "Nội tại · tên (cấp n/5): mô tả" cho 18 món Bộ 01–06 (bọc `gearDescription`).
  - `gear45.js`: `st.lv146`, `st.kk146`, nhân `KN146API.vul` trong `hurt`.
  - **Sửa lỗi:** `alloc` phải xóa các trường mới (`pierced`, `hitSet`, `dist146`, `ticks`…), vì bể đạn dùng lại viên cũ.
- **Ngân sách** (`claude_tools/do_dac/bench147.js <gear_fx> <cấp> on`, mô phỏng 60 s × 3 seed):
  - đơn mục tiêu lệch ≤ 1% so với bản cũ ở cấp 1/3/5;
  - đông quái tối đa 2,0× (thunder cấp 5), cryo 1,8×, rail và prism 1,5×, disc 1,4×.
- **Thử trong trận:** `t147.py` (6 cặp) và `t147c.py` (thunder SS): đẩy lệch 71 viên, nuốt 39 viên, tê liệt có kích, không lỗi JS. 5 bài kiểm thử đạt.
- **Còn lại:**
  - kỹ năng riêng của inferno / rail / disc / thunder / solar / spiral / ricochet / stellar vẫn là khuôn chung (×1,35);
  - dòng mô tả cũ phía trước (ví dụ aegis "Mỗi 16s quét đạn") chưa viết lại;
  - Đợt 2: Bộ 07–13 qua `SKILL81`.
- **Đề GPT Bộ 06:** `out/PROMPT_GPT_BO06.md` (nanite · stellar · prism).

**V146 (19:50) · xuất bản artifact `https://claude.ai/artifact/U5HfBzLWPfPvtUECHaALbq` (bản 40):**
- **Artifact:** đường dẫn cũ `5cPJydT8P4CKtRB5ZTjePM` không mở được từ tài khoản phiên này. Đã đè lên `U5Hf…` (trước đó đang ở đời V83, giữ quyền db/bảng xếp hạng). Lần sau xuất bản vào `U5Hf…`, trừ khi chủ dự án chỉ lại.
- **VKTT L3 · dải kích hoạt:** `src/vktt/ult_act_{fortress,world,hunter,web}.png`, dải 8 ô 192 px (1536×192), build giữ cỡ 1536 (`_SZ`).
  - Mã trong `ult72.js`, khối "V146": `flashText()` gọi `act146()`; `drawAct146()` vẽ sau fx163, mỗi khung 0,07 s.
  - Vị trí: Pháo Đài trên tàu (230 px), Săn Sao ở tàu (250 px), Thế Giới giữa màn (0,8 × cạnh ngắn), Lưới Điện ở tâm lưới.
  - Tắt: `L3_146=false`.
  - Đã chọn bản 1 của Thế Giới (có kim đồng hồ) và Lưới Điện (có tia điện). Bản 2 cùng 6 bảng gốc để ở `work/nhan/vktt_l3_goc/`.
  - **Phần L xong.**
- **Bộ 05** (reactive · spiral · gravity): 37 tệp, gốc ở `work/nhan/bo05/`.
  - `cat_bo.py` mới:
    - nhận `muzzle.png` + `trail.png` riêng;
    - dải nổ cắt theo 7 khe tối nhất (`gaps`, tắt bằng `IMPACT_KHE=0`);
    - đạn super thu theo chiều cao (`sheet_cao`, tắt bằng `SUPER_CAO=0`). Trước đó super bị nhỏ hơn đạn thường vì khung rộng;
    - xoay chớp nòng bằng `XOAY_<mã>_muzzle=90` (reactive và spiral cần xoay 90).
  - Chụp trong trận bằng `claude_tools/do_dac/t89inv_b05.py … 100 '' gear`.
- 5 bài kiểm thử đạt, smoke đạt.

**V145 (19:00) · xuất bản artifact phiên bản 65:**
- **VKTT L2** (`src/vktt`, bản cũ ở `work/nhan/vktt_cu2`), mã trong `ult72.js` (khối "V145", tắt bằng `L2_145=false`):
  - ụ pháo `ult_turret_1/2/3` theo bậc (Trắng–Lam / Tím / Huyền thoại); tháp laser mới;
  - `ult_block_flash` chỉ hiện lúc chặn (bỏ vành khiên 0,35 thường trực);
  - trường thời gian: bỏ `ult_time_field` + `vktt_world_clock` + kim lớn của fx163, thay bằng `shards()` (10 cụm `ult_time_shard` cỡ 64 cho tối thượng, 6 cụm cỡ 44 cho bom thời gian; mảnh vỡ khi tắt vẫn giữ);
  - `ult_frozen` trên đầu quái bị ngưng (`B.stopE`);
  - lưới điện: `webAnchors()` vẽ 4 neo + nút, thay `ult_web_field` (dây vẫn là `vktt_grid_beam` của fx163; `ult_web_line` có sẵn nhưng chưa dùng);
  - 4 lưỡi cưa và dấu dễ tổn thương mới.
  - **Còn lại:** L3 (4 dải kích hoạt).
- **Bộ 04** (phase · singularity · ricochet): 37 tệp bằng `cat_bo.py`; `phase_trail` cắt riêng dải dọc giữa (bảng gốc có tia ngang dài).

**V144 (18:00) · đã xuất bản artifact phiên bản 64:**
- **VKTT 5 dạng (GPT L1):**
  - `src/vktt/ult_<mã>_f1..f5.png`: khung vuông 1024, cùng tỉ lệ thu theo f5 (f5 chiếm 86%), nên các dạng thấp nhỏ hơn.
  - `ult72.js` `model()` chọn `_f(fi(r)+1)`; tắt bằng `FORM144=false` → về `base`/`legend`.
  - Icon mới thay `ult_icon_*` (bản cũ để ở `work/nhan/vktt_cu`).
  - Lưới Điện f2–f4 đã đổi sắc bằng code cho đúng mốc màu (lam→lục, tím→lam, vàng→tím), giữ lõi xanh lá.
  - Build cho `_f[1-5]` cỡ 320.
  - **Còn lại Phần L:** L2 (vật thể trong trận) và L3 (dải kích hoạt).
- **Bộ 03** (orbital · thunder · solar): 37 tệp cắt bằng `claude_tools/cat_bo.py` (công cụ dùng lại cho mọi bộ, quy ước tên bảng trong đầu tệp).
  - Build sửa: loại món theo `_MIS139` (danh sách mã tên lửa), không đoán theo tỉ lệ tranh. Trước đó `solar` bị nhận nhầm là tên lửa.
- **Đợt 1a kỹ năng mới: 6 giáp Bộ 01–06** (`src/noi_tai144.js`, tắt bằng `NT144=false`):
  - **Cách làm:** bọc `damage()` (chặn/phản/vô hiệu/giảm; giảm bằng cách tạm bọc `enemyScale`); `Equipment25.update` lọc giáp cũ khỏi trang bị và chạy `tick` (tầng giáp, hồi máu, kỹ năng tự kích khi đạn cách tàu < 70 px hoặc máu < 50%); `Equipment25.onDamage` bị bỏ qua khi giáp mới hoạt động.
  - **Đo bằng đòn va chạm**, vì đạn bị khiên khởi đầu `bulletShieldTime` khoảng 22 s chặn: mirror chặn 26,5%, phase 27%, reactive giảm 24%, nanite hồi 25% máu/phút (đúng trần), orbital chặn sườn/sau và không chặn trước mặt, aegis có tầng thì chặn hẳn 1 đòn.
- **Việc tiếp Đợt 1b:** 12 món tên lửa / vũ khí phụ Bộ 01–06 trong `gear_fx_v3.js` (`fire` / `update` theo từng mã) + hiệu ứng thật lên quái/đạn qua `gear45` (cryo làm chậm thật, gravity đẩy lệch đạn thật…). Sát thương tổng đã được `gear45` quy về `refDPS`.

**V143 (17:15):** Bộ 02 đủ 37 tệp hiệu ứng thật (không còn tạm), đã chụp trong trận, 5 bài kiểm thử đạt, xuất bản artifact phiên bản 63. Bộ 02 coi như **xong**; GPT chuyển sang Bộ 03 (orbital · thunder · solar).

**17:30 · Gemini xác nhận chốt** (`src/ky_nang_39_ngan_sach_giap.txt`): bảng ngân sách 13 giáp đều trong chuẩn (1,8–2,4 đòn ở 6 đòn/phút; 5,2–6,5 đòn ở 20 đòn/phút) + lộ trình 2 đợt. Không có số liệu mới so với `ky_nang_39_chot.json`.
- **Lưu ý khi đo:** orbital giả định 25–30% số đòn đến từ sườn/sau. Trong game, phần lớn đạn địch bay từ trên xuống, nên phải đếm thật tỉ lệ đòn sườn/sau trong trận; nếu thấp hơn nhiều thì nới góc chặn.
- **Đang chờ chủ dự án** trả lời "làm" để bắt đầu lập trình Đợt 1 (Bộ 01–06).

**17:02 · CHỐT kỹ năng và nội tại 39 món:** Gemini bản 3 sửa 5 giáp (aegis 1 tầng/20 s; orbital chặn theo hướng sườn/sau, hồi 3 s; nanite hồi khi 3 s không trúng đòn, trần 25%/phút; aurora36 khiên hồi 15 s; devour10_a trần 10%/10 s). Đều đạt chuẩn 1,5–2,5 đòn (ở 6 đòn/phút) và 5–7 đòn (ở 20 đòn/phút).
- **Dữ liệu chốt:** `src/ky_nang_39_chot.json` (cũng ở `out/gemini_ky_nang/KY_NANG_39_CHOT.json`).
- **Việc tiếp của Claude:** lập trình theo đợt (Bộ 01–06 trước, nạp vào `GEAR_FX DATA` trong `src/gear_fx_v3.js` + hành vi mới; sau đó Bộ 07–13 qua `SKILL81` / `GEAR81` / `GEAR83`, thay `behavior` mượn).
- **VKTT L1:** bóng 4 vũ khí × 5 dạng đã duyệt (`out/vktt/PHAC_L1_DUYET.png`, bản thứ 2 của lần sửa 1). GPT tô màu L1.
- **Bộ 02 hiệu ứng:** GPT gửi 21 bảng (`work/nhan/bo02_v3`), Claude cắt đủ (đạn 4 ô tách theo khoảng trống, nổ 8 ô, tia lặp liền có pha trộn 48 px, cryo Bạo Tẩu xoay 90°) → `src/tb133` Bộ 02 đủ 37 tệp chính thức.

**16:56 · Gemini trả bản 2** (`GEMINI_TRA_V2.txt`, sửa 18 món). Đã gộp thành bộ đủ 39 món: `out/gemini_ky_nang/GEMINI_GOP_V2_39mon.json`. Claude duyệt `DUYET_GEMINI_KY_NANG_V2.md`:
- **Đạt và sẵn sàng lập trình:** 26 món tên lửa / vũ khí phụ + 8 giáp (mirror, phase, reactive, void36, seraph36, chrono11_a, monarch12_a, aegis9).
- **Chờ Gemini sửa lần 3:** aegis, orbital, nanite, aurora36, devour10_a. Gemini giả định 28–30 đòn/phút (sai). Chuẩn mới: giáp cấp 5 cứu 1,5–2,5 đòn ở mức 6 đòn/phút và 5–7 đòn ở mức 20 đòn/phút. Giáp hẹn giờ và hồi máu cần trần; orbital đang trùng họ với aegis → đổi thành "chặn đòn theo hướng".
- **Cơ chế cần mã mới:** orbit36 xích, devour10_m ký sinh, chrono11_m vọng, monarch12_a rút dần, gravity đẩy lệch đạn, devour10_s nuốt đạn, halo36 dồn tầng, monarch12_s ấn nổ, aurora36 khiên từ sượt đạn.

**Mới ở V142:**
- **VKTT** (`src/ult72.js`):
  - bỏ chữ nổi `ftxt` giữa trận (bật lại: `FTXT142=true`);
  - bỏ vòng nổ loang `o.boom` (bật lại: `RING142=true`).
- **`v138.js`:** `body:has(.sr-bot) .n74c{display:none}`. Chip VÒNG QUAY / PHÓ BẢN GIỚI HẠN không còn đè hàng nút của màn trưng bày VKTT. Đây chính là mục tồn REVIEW122 "khung thừa dưới nút NÂNG CẤP". Tắt: `CHIP142=false`.
- **Bộ 02:** GPT gửi bảng tranh nền trong suốt; Claude tự cắt.
  - mirror, cryo, disc icon1-3;
  - disc tran1-3 = disc icon1-3 (dáng nhìn từ trên), disc tranbt = ảnh Bạo Tẩu cũ (tạm);
  - disc impact normal/super = dải nổ lưỡi liềm, chia 8 ô theo khe tối (nguồn gốc ở `work/nhan/bo02_v2/`);
  - đã xóa `mirror_tran*` / `cryo_tran*` (giáp và tên lửa ẩn trong trận);
  - `src/tb133` Bộ 02 có đúng 37 tệp.
- **Cách làm mới với GPT:** GPT chỉ gửi bảng tranh nền trong suốt, Claude cắt, thu cỡ, chia ô. Kịch bản cắt nằm trong lịch sử phiên: tách cụm theo cột alpha; dải 8 khung tách theo 7 khe nhỏ nhất cách nhau ≥ 90 px.
- **VKTT Phần L:** đề `out/GOI_GPT_VKTT_L.zip`, 3 đợt:
  - L1: 4 vũ khí × 5 dạng `f1-f5` + 4 icon;
  - L2: vật thể trong trận, gồm `ult_time_shard` (thay vòng đồng hồ khổng lồ), `ult_frozen`, 4 lưỡi cưa khác dáng, `ult_web_anchor` / `line` / `node`, 3 ụ pháo;
  - L3: 4 dải kích hoạt.
  - Mã cần làm khi có tranh: 5 dạng theo mốc màu (hiện chỉ `base` / `legend`); vẽ trường thời gian bằng 6–10 cụm mảnh; lưới điện 4 neo + dây kéo giãn.
- **Gemini kỹ năng và nội tại:** `out/GOI_GEMINI_KY_NANG.zip` (chưa gửi).

**Mới ở V141 · chủ dự án đồng ý làm như game gốc: giáp cũng KHÔNG có hình trong trận.**
- `armor69.js`: `Armor69.draw` return ngay khi `window.ARM140!==false` (2 module hông TB133 không vẽ).
- Build rep: vòng vẽ `Equipment25.draw` của mã gốc bỏ sprite giáp. Khiên tròn (`bubble`) và lớp `hits` của giáp vẫn giữ.
- Khối TB133 trong build: món không có `_tran1.png` thì bỏ qua phần tranh trong trận (giáp và tên lửa giờ chỉ cần icon + hiệu ứng).
- **Trong trận hiện chỉ còn: chiến cơ + khiên tròn + 2 tàu con vũ khí phụ ±100 px.** Tên lửa và giáp chỉ có icon (Kho) và hiệu ứng.
- Đề GPT V2 (đã gửi cho đoạn chat GPT mới, tin nhắn mở đầu ở `goi_j2/TIN_NHAN_MO_DAU_GPT.md`):
  - giáp và tên lửa 11 tệp, vũ khí phụ 15 tệp → mỗi bộ 37 tệp;
  - GPT giao `so_sanh_39_phac.png` trước để duyệt độ đa dạng.

**Mới ở V140 · quyết định của chủ dự án: trong trận không hiện hình tên lửa; đạn và kỹ năng tên lửa bắn ra từ thân chiến cơ** (tắt: `window.MIS139=false`):
- `gear_fx_v3.js`: điểm bắn tên lửa từ ±58 px đổi thành ±14 px, cao −22 px (biến `mb`).
- `gear45.js`: bỏ vẽ `GEAR_FX 'hardware'` của tên lửa; `draw36` bỏ nhánh tên lửa (bộ 7–13).
- `build74_mau.py`:
  - rep `origin()` của mã gốc: tên lửa bắn từ (x tàu, y−14);
  - rep `Equipment25.draw` để không vẽ sprite tên lửa dưới đuôi tàu;
  - khối TB133 chấp nhận tên lửa không có `tran*.png` (`_MIS139`), khi đó giữ bệ cũ.
- Đề GPT V2 đã sửa: tên lửa **chỉ 11 tệp** (icon1-3 + 8 hiệu ứng, không `tran*`), mỗi zip bộ 41 tệp; sự đa dạng của tên lửa nằm ở icon và **đầu đạn khác hình**.
- Trong trận hiện còn: giáp 2 module ±58 px · drone vũ khí phụ ±100 px. Đã chốt ở V141: ẩn luôn giáp.

**Mới ở V139:**
- **Bộ 02 (`mirror` giáp · `cryo` tên lửa · `disc` vũ khí phụ)**, bản kiểm tra của GPT, đã ghép vào `src/tb133/` (45 tệp, kỹ thuật đạt hết).
  - Chủ dự án yêu cầu **hình dạng trang bị và vật phẩm phải đa dạng**. Bộ 02 cả 3 món cùng dáng "pha lê nhọn", `disc` lại là dáng mũi tên trùng với `rail` → **chỉ là bản tạm**.
  - Đề mới: `out/trang_bi/goi_j2/PROMPT_GPT_BO02_13_V2.md` (gói `out/GOI_J2_DA_DANG.zip`), gồm bảng dáng gốc 36 món, quy tắc thử bóng đen 40 px, và Phụ lục K (thang cấp vật phẩm không được chỉ đổi màu).
- **Sửa lỗi drone vũ khí phụ không hiện trong trận** (có từ khi trang bị chuyển sang `GEAR_FX`, Bộ 01 `rail` cũng bị):
  - Nguyên nhân: `gear45.js` lọc món đã bắc cầu khỏi `Equipment25.draw`, mà `GEAR_FX` chỉ vẽ lớp `hardware` cho tên lửa.
  - Cách sửa: hàm `side138()` trong `gear45.js` vẽ thân vũ khí phụ tại `Battle28.support()` (40 px, Bạo Tẩu 56 px + quầng). Ảnh lấy theo `_pod36` nên nhận đủ evo1/evo2/super.
  - Tàu con (nơi đạn vũ khí phụ bắn ra) dời từ 86 px ra **100 px** (rep `space=` trong build), để không đè bệ tên lửa 72 px.
  - Tắt cả hai: `window.SIDE138=false`.
- Khoảng cách trong trận hiện tại: giáp 58 px · tên lửa 72 px · vũ khí phụ / tàu con 100 px (nửa trên màn: 46 px).

**Lưu ý:** gói nguồn **không có** thư mục `/home/claude/work/out/` (các đề GPT/Gemini, zip đề). Phiên mới cần chủ dự án gửi kèm nếu muốn sửa đề cũ.

**V172 (31/10) · artifact `U5Hf…` bản 66 · SSS 16/24 có tranh (thêm chrono_monarch_m)**
- Đạt. Dạng 1 và dạng 2 còn giống nhau, chấp nhận. Món mẹ thuộc Bộ 12–13, nên đạn chưa đổi sang tranh SSS.
- **Còn 8 món:** monarch_inferno, solar_gravity, ricochet_prism, lance_orbit, halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.

**V171 (31/10) · artifact `U5Hf…` bản 65 · SSS 15/24 có tranh (thêm devour_chrono_m)**
- Đạt. Món mẹ thuộc Bộ 10–12, nên đạn chưa đổi sang tranh SSS.
- **Còn 9 món:** chrono_monarch_m, monarch_inferno, solar_gravity, ricochet_prism, lance_orbit, halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.

**V170 (31/10) · artifact `U5Hf…` bản 64 · SSS 14/24 có tranh (thêm judgement_swarm)**
- Đạt, 3 dạng đổi khối rõ, nổ không có vành.
- Món mẹ thuộc Bộ 07–09 (judgement36, swarm9), nên đạn chưa đổi sang tranh SSS (xem mục tồn ở V169).
- **Còn 10 món:** devour_chrono_m, chrono_monarch_m, monarch_inferno, solar_gravity, ricochet_prism, lance_orbit, halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.

**V169 (31/10) · artifact `U5Hf…` bản 63 · SSS 13/24 có tranh (thêm comet_nova) + sửa spiral_stellar**
- **spiral_stellar:** GPT vẽ lại `icon2` (6 nòng đầu sao vàng) và `impact_super` (bỏ vành tròn). Bản cũ giữ ở `*_cu.png`.
- **comet_nova:**
  - Đạt, 3 dạng đổi khối rõ.
  - Món mẹ (comet36, nova36) chạy Skill81, không qua GEAR_FX, nên tranh đạn `g_*` **chưa** thay vào đạn thường. Hiện chỉ dùng nổ `_in` / `_is` và Tuyệt kỹ `_tk` qua `sss_e3`.
  - Tương tự cho các SSS có món mẹ thuộc Bộ 07–13. Việc tồn: nối `g_*` vào `pj()` / `bm()` của Skill81.
- **Còn 11 món:** judgement_swarm, devour_chrono_m, chrono_monarch_m, monarch_inferno, solar_gravity, ricochet_prism, lance_orbit, halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.

**V168 (31/10) · artifact `U5Hf…` bản 62 · SSS 12/24 có tranh (thêm spiral_stellar)**
- **Đã báo GPT, chờ vẽ lại** (tạm vẫn dùng bản hiện có):
  - icon1 và icon2 gần như giống hệt nhau;
  - `impact_super` khung 4–5 có vành tròn loang, trái quy tắc.
- **Còn 12 món:** comet_nova, judgement_swarm, devour_chrono_m, chrono_monarch_m, monarch_inferno, solar_gravity, ricochet_prism, lance_orbit, halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.

**V167 (31/10) · artifact `U5Hf…` bản 61 · SSS 11/24 có tranh (thêm monarch_aegis, thunder_singularity)**
- **Đủ 8 giáp SSS.** Tên lửa có inferno_cryo và thunder_singularity; vũ khí phụ có rail_disc.
- **Bản web:** `s07.js` (GEAR44_ASSETS) vượt 16 MB/tệp, giới hạn của artifact.
  - `claude_tools/split.py` nay tự tách khối `const X={…}` lớn hơn 14 MB thành nhiều tệp ≤ 12 MB: `s07.js` (`const X={…}`), rồi `s07a.js`, `s07b.js`… (`Object.assign(X,{…})`).
  - **Khi publish phải gửi thêm `a/s07a.js`**; lệnh `ls a/` sẽ thấy tệp này. Đã kiểm khói ổn.
- **Còn 13 món:** spiral_stellar, comet_nova, judgement_swarm, devour_chrono_m, chrono_monarch_m, monarch_inferno, solar_gravity, ricochet_prism, lance_orbit, halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.
- **Cần theo dõi dung lượng bản offline**, hiện khoảng 62 MB.

**V166 (31/10) · artifact `U5Hf…` bản 60 · SSS 9/24 có tranh (thêm chrono_monarch_a) + sửa icon devour_chrono_a**
- **devour_chrono_a:** GPT vẽ lại icon1 (ngàm hở đáy ngoạm nửa bánh răng vỡ) và icon2 (ngàm lớn ôm mặt đồng hồ, có trụ). Hai ảnh dán trực tiếp, không zip.
  - Xếp thứ tự theo mô tả dạng trong đề.
  - Bản cũ giữ ở `sss_mau/.../icon1_cu.png` và `icon2_cu.png`.
- **chrono_monarch_a:**
  - Đạt.
  - Mặt đồng hồ tròn ở giữa là **lõi**, không phải vỏ bao quanh tàu, nên chấp nhận.
  - Tuyệt kỹ khá nhỏ trong ô.
- **Còn 15 món:** monarch_aegis, thunder_singularity, spiral_stellar, comet_nova, judgement_swarm, devour_chrono_m, chrono_monarch_m, monarch_inferno, solar_gravity, ricochet_prism, lance_orbit, halo_carrier, devour_chrono_s, chrono_monarch_s, monarch_rail.

**V165 (31/10) · artifact `U5Hf…` bản 59 · SSS 8/24 có tranh (thêm devour_chrono_a)**
- Cắt theo lưới đều, không lỗi.
- **Lỗi đã báo GPT, chờ vẽ lại** (tạm thời vẫn dùng bản hiện có):
  - icon1 có vành răng nanh khép kín quanh mặt đồng hồ, trái quy tắc "vỏ giáp hở";
  - icon2 dẹt ngang, nên ở 96 px trông nhỏ hơn dạng 1.
- **Tiến độ:** đủ 8 giáp trừ chrono_monarch_a và monarch_aegis; tên lửa có inferno_cryo; vũ khí phụ có rail_disc. Còn 16 món.

**V164 (31/10) · artifact `U5Hf…` bản 58 · SSS 7/24 có tranh (thêm seraph_aegis9)**
- GPT nay đặt khung theo lưới đều (362 / 272 px mỗi ô); `even()` cắt thẳng, không cần sửa gì.
- Độ nhòe icon 3,1–3,7, cao hơn các món trước vì nhiều chi tiết pháo. Phóng 100% vẫn sắc, chỉ vùng tối có chút hạt; chấp nhận.
- Gói zip có thư mục con; `nhan_sss` tự tìm.
- **Tiến độ tranh SSS:** aegis_mirror, inferno_cryo, rail_disc, orbital_phase, reactive_nanite, aurora_void, seraph_aegis9. Còn 17 món.

**V163 (31/10) · artifact `U5Hf…` bản 57 · SSS 6/24 có tranh (thêm aurora_void)**
- **`cat_sss`:** thêm biến môi trường `XOAY_<tệp>=90` để xoay dải hình mà GPT vẽ nằm ngang.
  - Lệnh đã dùng cho aurora_void: `XOAY_kn=90 python3 claude_tools/cat_sss.py ... sss_aurora_void`, vì quạt tia kỹ năng cần hướng lên mũi tàu.
  - **Cắt lại aurora_void thì phải đặt lại biến này.**
- **Tiến độ tranh SSS:** aegis_mirror, inferno_cryo, rail_disc, orbital_phase, reactive_nanite, aurora_void. Còn 18 món.

**V162 (31/10) · artifact `U5Hf…` bản 56 · SSS 5/24 có tranh (thêm reactive_nanite)**
- **`cat_sss.split_old` dùng `widest()`:** cắt tại k−1 khe trống rộng nhất. Lý do: khung GPT đặt không đều, khe chỉ rộng 22–36 px.
  - Nhận biết ô cuối trống: nếu không có hình nào trong 80% ô cuối của lưới đều thì cắt n−1 hình và thêm 1 ô trống.
  - Thứ tự thử: `even()` → `widest()` → `split_older()` (cách cũ).
  - Đã cắt lại cả 5 món; kết quả đúng.
- **Tiến độ tranh SSS:** aegis_mirror, inferno_cryo, rail_disc, orbital_phase, reactive_nanite. Còn 19 món.

**V161 (31/10) · artifact `U5Hf…` bản 55 · SSS 4/24 có tranh (thêm orbital_phase)**
- **Công cụ mới `claude_tools/nhan_sss.py <zip>`:** chạy trọn một lượt nhận gói: giải nén, đo độ nét, cắt, rồi xuất ảnh soát `/tmp/claude-0/soat_<mã>.png`.
- **`cat_sss.split` dùng `even()` trước:** GPT xếp khung cách đều theo bề ngang ảnh, kể cả ô trống cuối.
  - Chia đều n ô khi mọi ranh giới (±3 px) đều trống; nếu không thì quay về cách cũ `split_old`.
  - Sửa được `chan_don` của orbital: mỗi pha gồm 2 mảnh rời, trước bị cắt thành 12 khung.
  - Đã cắt lại cả 3 món mẫu; kết quả không đổi.
- **Tiến độ tranh SSS:** aegis_mirror, inferno_cryo, rail_disc, orbital_phase. Còn 20 món.

**V160 (31/10) · artifact `U5Hf…` bản 54 · tranh mẫu SSS thứ 3 (rail_disc) · xong 3 món mẫu**
- Gói GPT gồm 12 PNG, độ nhòe đo được 0,2–2,3, nét. Icon dạng 1 và dạng 2 còn khá giống nhau, đã báo GPT.
- **`cat_sss.py`:**
  - đếm cụm hình (`runs`): nếu bằng n−1 thì cắt n−1 và thêm 1 ô trống. Lý do: `tuyet_ky` 7+1 trước bị cắt sai thành 8;
  - thêm `g_beam_normal` / `g_beam_super` 64×256, đã cắt 12% mỗi đầu thon để lặp liền;
  - thêm `g_pod1..4` 128².
- **`gear45`:**
  - `GSUF` thêm `beam_normal` / `beam_super`;
  - `pod36` dùng tàu con SSS: dạng 1 ở Lv1–2, dạng 2 ở Lv3–4, dạng 3 ở Lv5, dạng 4 khi Bạo Tẩu;
  - đã chụp trong trận: tàu con và tia mới hiện đúng, tia lặp liền.
- **Tiếp theo:** GPT làm 21 món còn lại, mỗi lượt 1 món. Mỗi gói: `python3 claude_tools/cat_sss.py <thư_mục> <mã>` → build → `t156` → xuất bản.

**V159 (31/10) · artifact `U5Hf…` bản 53 · tranh mẫu SSS thứ 2 (inferno_cryo)**
- Gói GPT gồm 10 PNG. Độ nhòe đo được 0,6–1,6, nét. Icon 3 dạng đổi khối và đọc rõ ở 96 px.
- **`cat_sss.py`:**
  - nếu GPT để ô cuối trống hẳn (`tuyet_ky` 7 hình + 1 ô trống) thì cắt n−1 hình rồi thêm ô trống;
  - thêm bản `g_*` theo quy cách GEAR_FX `tb133`:

    | Tệp | Quy cách |
    |---|---|
    | `g_projectile_normal` / `g_projectile_super` | 3 khung 64×128, mỗi khung fit riêng |
    | `g_impact_normal` | 8×128, khung 6 alpha 0,45, 2 khung tắt dần |
    | `g_impact_super` | 8×192, khung 6 alpha 0,45, 2 khung tắt dần |
    | `g_muzzle` | 96 |
    | `g_trail` | 32×96 |

- **`gear45 sssArt(k,pid,base)`:** khi SSS xuất chiến và có `GEAR44_ASSETS[<sss>_g_*]`, Proxy tài nguyên của GEAR_FX món mẹ trả tranh SSS cho đạn, nổ, chớp nòng và đuôi. Đã kiểm `inferno_projectile_normal` trả đúng tranh SSS. Tắt bằng `window.SSSART=false`.
  - `R[k]` lưu thêm `sid`, nên đổi SSS thì dựng lại GEAR_FX.
  - Chỉ áp cho món mẹ chạy GEAR_FX (Bộ 01–06). Bộ 07–13 (Skill81 / nt147) chưa thay đạn bằng tranh SSS; mới dùng `_in` / `_is` / `_tk` qua `sss_e3`.

**V158 (31/10) · artifact `U5Hf…` bản 52 · tranh mẫu SSS (aegis_mirror) đạt độ nét**
- Gói GPT `SSS_sss_aegis_mirror.zip` gồm: icon1–3 1024², `chan_don` 6 khung, `ky_nang` 6 khung, `tuyet_ky` 8 khung.
- **Độ nét:** đo bằng cách thu nhỏ ×1,5 rồi phóng lại. Sai lệch giảm từ 4,3 (bản cũ) xuống 1,6–2,1, ngang tranh Phần J (1,5).
- **`claude_tools/cat_sss.py <thư_mục> <mã>`:** cắt gói tranh vào `src/sss_art/<mã>/`. Kết quả gồm icon1..3 256², `chan`, `kn`, `tk`, `pn`, `ps`, `in`, `is`, `mz`, `tr`, `bm` và `pod`. Alpha < 12 đưa về 0.
- **Build:** nạp `src/sss_art/*/*.png` thành `GEAR44_ASSETS[<mã>_<tệp>]`.
- **Hiển thị:**
  - Xưởng, sảnh và nghi thức hợp thể tự dùng `_icon1`/`_icon3`.
  - **`sss_e3.js`** (kiểu fx `spr`):
    - giáp: chặn đòn dùng `_chan` (xoay −90°, bám tàu), kỹ năng dùng `_kn`, Tuyệt kỹ dùng `_tk`;
    - vũ khí: va chạm nội tại dùng `_in` (`_is` khi Bạo Tẩu), Tuyệt kỹ dùng `_tk`.
  - Chưa có tranh thì vẫn vẽ hình tự sinh như V157.
- **Thanh điều hướng `#nav74`** (z-index 2147483100) bị ẩn khi mở Xưởng (`body.g44-on`).
- **Chờ:** GPT làm 2 món mẫu còn lại (`sss_inferno_cryo`, `sss_rail_disc`), rồi 21 món còn lại theo cùng quy cách.

**V157 (31/10) · artifact `U5Hf…` bản 51 · Phần E3: nội tại / kỹ năng / Tuyệt kỹ 24 SSS**
- **Module mới `src/sss_e3.js`** (`<script id="sss-e3">`, ngay sau `gear44`). Tắt bằng `window.SSSE3=false`.
- **16 vũ khí:**
  - Đạn thường của món mẹ đang lắp nhận ×1,35×(1+3%/cấp) × **0,62** (qua `SSSE_RED` trong `sssM`).
  - Nội tại theo nhịp `p` (0,8–1,3 s) gánh 30% (+2%/Lv), kỹ năng (tự kích theo hồi chiêu JSON) gánh 8%. Như vậy đơn mục tiêu ≈ ×1,35, Lv5 +8%.
  - Tuyệt kỹ chạy lúc bắt đầu Bạo Tẩu, sát thương = 4 giây hỏa lực.
  - Lan sang tối đa 4 quái mỗi đòn (đông quái ≲ 2×).
  - Hiệu chỉnh `CAL[id]` theo hỏa lực THẬT của món mẹ lên boss (`claude_tools/do_dac/t157.py`). Sau hiệu chỉnh, tỉ lệ nội tại/đạn thường đo được nằm trong 0,69–0,87 (đích 0,742, tức ±7,5% tổng). Ghi chú:
    - `sss_rail_disc` 0,4 và `sss_chrono_monarch_s` 0,15 vì món mẹ (rail, chrono11_s) đánh boss rất yếu;
    - CAL đo với món mẹ thứ nhất; lắp món mẹ thứ hai có thể lệch hơn.
- **8 giáp:**
  - Lớp bọc `damage()` riêng: chặn tầng khiên, giảm %, hoãn máu 4 s, giữ mạng, né, sượt đạn → khiên, tàng hình, hồi máu khi hạ quái hoặc khi nhặt đồ.
  - Khi giáp SSS xuất chiến (`window.SSSE_A`): nội tại giáp mẹ (nt144, nt147), Equipment25 armor và GEAR_FX armor đều tắt.
  - Kỹ năng tự kích khi có ≥5 đạn trong 130 px hoặc máu < 60%.
  - Kiểm bằng `claude_tools/do_dac/t157g.py`. Đo ở Lv5:

    | Món | Kết quả |
    |---|---|
    | reactive | giảm khoảng 24% (cộng hồi khi trúng) |
    | seraph | giảm 20% |
    | orbital | né 20% |
    | chrono_monarch_a | nhận ngay 35% |
    | monarch_aegis | nhận ngay 40% |
    | devour_chrono_a / chrono_monarch_a | giữ mạng |

  - **Chưa đo "số đòn cứu được / phút"** theo ngân sách Gemini.
- **Hình:** tia, sét gấp khúc, cột sáng (alpha 0,55 để khỏi lóa), vệt chém, mảnh, phù ấn thoi, cát. Không vòng tròn, không chữ.
- **gear45:**
  - SSS (24) luôn chạy GEAR_FX của **món mẹ**; 9 SSS cũ không còn chạy GEAR_FX SSS def cũ, tránh chồng Tuyệt kỹ;
  - `refDPS` đã xuất ra API.
- **Test:** `t156.py` 14/14 (thêm mục E3). Bộ cũ đều ✓.
- **Còn lại:**
  - 4 cơ chế `[MỚI]` mới làm ở mức xấp xỉ:
    - inferno_cryo: kỹ năng khoan;
    - devour_chrono_a: hút mảnh;
    - rail_disc: đĩa nạp điện là tia + sao bay, chưa phải đĩa hồi hoàn thật;
    - lance_orbit: xích là đoạn thẳng mảnh.
  - Tranh GPT (đang vẽ lại vì mờ: `out/PROMPT_GPT_SSS_E_SUA_NET.md`).

**V156 (31/10) · artifact `U5Hf…` bản 50 · Phần E đợt 1: Xưởng SSS mới + hợp thể vật phẩm**
- **Dữ liệu:** `src/hop_the_e.json` (JSON chốt của Gemini), build nhúng thành `const SSS_E` (`<script id="sss-e">`, ngay trước `gear44`).
- **`src/gear45.js` (Gear44):** thay luật cũ; sao lưu ở `work/nhan/cu156/gear45.js`. Mã chèn nằm ở `tools/gear156_data.js` và `tools/gear156_ui.js`; `tools/sua_gear156.py` chỉ chạy 1 lần.
  - **24 công thức:** 8 giáp, 8 tên lửa, 8 vũ khí phụ. Điều kiện: 2 món mẹ ≥ **Tím +1** (`V70.nOf ≥ 7`). Món mẹ được giữ lại.
  - **Chi phí:** mở Lv1 và nâng Lv2–5 theo `cost.lvSteps` (nguyên liệu Tím, `sss_core`, hợp kim).
  - **Cường hóa** = 2 × min(n của Tím +n), tối đa +10.
  - **Chọn SSS xuất chiến** cho từng món mẹ: `S.bind[parent]`; `'-'` = dùng món thường. Mặc định lấy Lv cao hơn, rồi nhóm cao hơn.
  - **Khóa lưu mới** `saobang-gear-sss-v2`; khóa v1 giữ nguyên, chỉ đọc 1 lần để chuyển:
    - 9 món còn trong danh sách → Lv1;
    - 9 món bị bỏ → tặng SSS chung món mẹ chưa có; hết chỗ thì hoàn chi phí mở (`S.pay`, trả khi V70 sẵn sàng).
  - **Hỏa lực ×1,35×(1+3%/cấp):** nay nhân thẳng vào `auxDamage` trong `Progress.stats`, nên phủ cả Skill81 / Equipment25 / GEAR_FX.
    - `refDPS` chia lại `sssM` để không nhân 2 lần;
    - `MULT` trong build (lực chiến) cũng chia `sssM`.
  - **SSS chưa có GEAR_FX riêng** (15 món mới) chạy hiệu ứng của món mẹ đang lắp.
  - **API mới:** `upgrade`, `lvOf`, `toCore`, `fromCore`, `wkLeft`, `sssFor`, `defs`, `sssM`, `plusOf`.
- **Xưởng (giao diện):** 4 thẻ Giáp / Tên lửa / Vũ khí phụ / Vật phẩm. Tranh tạm ghép 2 icon món mẹ cho tới khi có tranh GPT (`<id>_icon1`/`_icon3` trong `GEAR44_ASSETS`). `#g44` có z-index 300 (đè thanh điều hướng).
- **Vật phẩm** (`src/stone71.js`):
  - tụ hợp đá **3 → 1** (300 / 900 / 2.500 / 6.000 ◈), có nút GHÉP TẤT CẢ;
  - rèn đá đặc biệt Tím: 4 Lam + 1 Lục thường + 9 Tinh Hạch + 8.000 ◈. Game chưa có đá đặc biệt phẩm Lam, nên gộp 2 bước của Gemini thành một;
  - nâng Tím → Cam: 1 đặc biệt Tím + 2 Tím thường + 12 Tinh Hạch + 10.000 ◈;
  - đổi 3 nguyên liệu Tím + 2.000 ◈ → 1 Tinh Hạch (15 lượt/tuần), và 1 Tinh Hạch + 500 ◈ → 1 nguyên liệu Tím tự chọn.
- **Phụ:**
  - `oc75.js` nhận 15 SSS mới;
  - admin (`v66.js`) mở đủ 24 SSS Lv5;
  - `EXTRA63` sao lưu thêm khóa v2.
- **Test:** `tests/t156.py` đạt 13/13. Bộ cũ (t110, t115, t107, t113, t102) đều ✓.
- **CHƯA LÀM (đợt E3):** nội tại hợp nhất, kỹ năng, Bạo Tẩu, Tuyệt kỹ riêng cho 24 SSS và 4 cơ chế `[MỚI]`. Hiện SSS chỉ là món mẹ ×1,35; Xưởng ghi rõ điều này. Thêm vào đó là tranh GPT theo `out/PROMPT_GPT_SSS_E.md` + `SSS_ME_24.png` (3 gói SSS_E1/E2/E3).

## 0. Vai trò và quy tắc làm việc
- **Ngôn ngữ:** luôn trả lời **tiếng Việt**. Mọi chữ trong game cũng là tiếng Việt.
- **Claude là lập trình viên chính.** Nhiệm vụ:
  - viết đề (prompt) cho **GPT** (vẽ tranh) và **Gemini** (thiết kế, số liệu, duyệt);
  - ghép kết quả của họ vào game;
  - đo trong trận thật;
  - xuất bản artifact;
  - gửi 2 bản HTML offline (thường + `_THU`);
  - báo cáo ngắn, trung thực, kết thúc bằng **bước tiếp theo**.
- **Đề GPT:** viết tự đủ bối cảnh, đóng gói zip kèm ảnh tham chiếu.
- **Kiểm tra mọi tranh GPT trước khi ghép.** GPT hay mắc 3 lỗi: giao ảnh chưa căn khung, giao zip cụt, giao dạng 3 nhỏ hơn dạng 2.
- **Bảo mật:** không tự tạo tài khoản hay nhập mật khẩu trên trang bên thứ ba.
- **Nội dung nhân vật:** nữ chiến giáp giữ ở mức game mobile phổ thông (không khỏa thân, không gợi dục). Chủ dự án từng hỏi bản 18+ và đã được từ chối.

## 1. Quyết định đã khóa (không tự đổi)
- **Buff và cơ chế chơi:**
  - buff không hết hạn;
  - không có phôi;
  - Vô tận không rơi đá;
  - hết ải về sảnh;
  - quà là bộ đầy đủ.
- **Dữ liệu và kinh tế:**
  - không đổi khóa lưu cũ (`saobang-*`);
  - không thêm nguồn kim cương;
  - không có tiền thật.
- **Trong trận:**
  - chỉ còn **thông báo boss xuất hiện**, không chữ nổi nào khác (V125 đã tắt hết);
  - **không vòng tròn hay vành** quanh tàu và quanh quái. Khiên tròn quanh tàu và boss được giữ vì là thông tin chơi;
  - giữ icon viên nhặt buff cũ (7 viên: bom, drone, máu, nam châm, nâng đạn, khiên, siêu cấp);
  - không chặn tàu ở góc màn;
  - nút nhỏ bằng nhau: tên lửa góc trái dưới, kỹ năng nằm trên bom ở bên phải;
  - không có ảnh phi công trong trận.
- **Đã bỏ hẳn:**
  - **cánh S/SS** vẽ quanh tàu (V125);
  - **đồng đội bay kèm** Wing87 (V134). Sát thương bù +30% vào đạn chính từ ải 40 (`bal86.js`, hàm `w134`);
  - **kén giải cứu đồng minh** (V134).

  Hai tàu con hộ tống thì giữ.
- **Tham khảo game gốc** (Chiến Cơ Huyền Thoại): chỉ lấy cảm hứng, không sao chép.

## 2. Nguồn, build, xuất bản
- **Nguồn:** `/home/claude/work/V83_nguon`. Build: `python3 build74_mau.py` (khoảng 2 phút). Tạo ra:
  - `Phi_Doi_Sao_Bang_V74_mau.html` (khoảng 53 MB);
  - `Phi_Doi_Sao_Bang_THU.html`.
- **Sửa mã:**
  - Ưu tiên sửa tệp `src/*.js`.
  - Đoạn nằm trong `base/Phi_Doi_Sao_Bang_V42.html` thì dùng `rep(a,b)` trong build. Chèn **trước** dòng `rep("function text(x,y,s,c){st.texts.push…`, hoặc trước `rep("Math.min(value, window.GFX66…`.
  - `rep` báo lỗi `assert` nếu chuỗi không khớp đúng 1 lần.
  - Một số module có tệp `src` riêng nên `rep` không bắt được, ví dụ `src/ccht_lobby46.js`. Khi đó sửa thẳng tệp `src`.
- **Thứ tự script sau `v116-js`:** v117 → ship118-art → bg117 → v118 → hit120-art → v120 → sk121-art → v121 → v122 → canh132-art → v132 → admin136 → tb133 (biến `TB133`) → v138 → raid83 …
- **Xuất bản lên artifact `https://claude.ai/artifact/5cPJydT8P4CKtRB5ZTjePM`:**
  ```
  ls /home/claude/work/online/a > /tmp/old.txt; rm -rf /home/claude/work/online/a
  python3 claude_tools/split.py /home/claude/work/online
  python3 claude_tools/wrap.py /home/claude/work/online
  (cd /home/claude/work/online && python3 -m http.server 8765 &) ; python3 claude_tools/do_dac/smoke.py ; fuser -k 8765/tcp
  ```
  Sau đó gọi Artifact publish với:
  - `file_path`: `/home/claude/work/online/index.html`;
  - `url`: artifact ở trên;
  - `root`: `/home/claude/work/online`;
  - `files`: mọi tệp `a/*`, và tệp nào có trong danh sách cũ mà nay không còn thì đặt `null`.

  Nếu publish báo "not read", gọi Artifact `read` với `paths` các tệp đó rồi publish lại.
- **Bản offline:** chép sang `/home/claude/work/out/Phi_Doi_Sao_Bang_V1xx.html` và `_THU.html`, gửi bằng SendUserFile.
- **Kiểm thử bắt buộc trước khi xuất bản:**
  - `tests/t110.py`, `t115.py`, `t107.py` chạy với HTML thường;
  - `tests/t113.py`, `t102.py` chạy với THU.

  Cú pháp: `python3 tests/tXXX.py <html> <thư_mục_ra>`. Lần chạy đầu đôi khi lỗi ngẫu nhiên, nên chạy lại.

## 3. Kịch bản đo (`claude_tools/do_dac/`, đầu ra `/tmp/sb_do/`)
Cú pháp chung: `python3 <script> <html> <ải> <bậc '' | S | SS> <phần>`.

| Kịch bản | Biến môi trường / phần | Việc làm |
|---|---|---|
| `t89b5.py` | `GAL=N,SS` (`GALI=0,1` chọn tàu) | chụp 13 tàu trong trận |
| `t89b5.py` | `PBP=1` | đếm tranh đạn được vẽ |
| `t89b5.py` | `BENCH=1` | DPS cũ / mới, đứng yên dưới boss |
| `t89b5.py` | `SKL=i` | sát thương kỹ năng S/SS |
| `t89inv.py` | `inv` | chụp các màn Trang bị / Vật liệu / Đá / Chợ |
| `t89inv.py` | `inv2` | chụp các màn SSS |
| `t89inv.py` | `rob` | hợp thể rồi chụp robot trong trận |
| `t89inv.py` | `lab` | chụp màn hợp thể và sảnh |
| `t89inv.py` | `gear` | trang bị Bộ 01, chụp ở cấp +0 / +3 / +5 / Bạo Tẩu |
| `t89inv.py` | `probe` (biến `PT=tab,sub`) | đo màn đó đang vẽ tranh nào |
| `tadm.py` | — | thử mã admin |

**Lưu ý khi đo:**
- Lần tải trang mất khoảng 60 giây vì tệp 53 MB. Timeout điều hướng đặt 180 giây.
- Đo DPS cùng lúc sai số tới khoảng 40%, nên dùng `BENCH`.

## 4. Hệ thống hình ảnh hiện tại

### 4.1 Chiến cơ (13 tàu, xong)
- **Tranh:** `src/ship118/tau{N}_{thuong|luc|lam|tim|tim5|ss}[_bt].png`, 512 px, tâm (256, 256).
  - Tàu 1–10 đi qua `skin69 form118 / atlas118`.
  - Tàu 11–13 đi qua `ship83 h118` (dạng theo `V70.craftN`).
- **Đạn:**
  - `src/fx16art/fx16_pb_{id}_t1-3 / muzzle / ss.png`. Riêng tàu 11–13 dùng `src/craft81/{11,12}/pb_*`.
  - Tàu 12: dòng đạn thứ hai được đổi màu đỏ ↔ xanh lam ngay trong code (`swapRB` trong `fx16.js`).
  - Tàu 2 (tia): có hạt đạn tranh chạy dọc tia.
- **Đường đạn riêng** `v120.js`:
  - 13 kiểu đường đạn, sát thương được chia lại từ loạt bắn gốc;
  - bảng `FUDGE` giữ DPS trong khoảng ±8%;
  - hiệu ứng trúng dùng tranh `src/hit120/hit_*.png`.
- **Kỹ năng S/SS** `v121.js`:
  - tranh `src/sk121/ult_NN.png`;
  - sát thương = Gemini mult × K × DPS gốc.

### 4.2 Hợp thể SSS (7 tàu + 3 SSS riêng, xong)
- **Dạng tàu:** `src/hop129/hopN_tau.png`. Build ghép vào `SSS_ATLAS` (hàng 0).
- **Chiến giáp** (7 nữ, bản H3 đã chốt), `src/hop131/`:
  - `hopN_chandung.png` (ngửa mặt): vào `SSS_ATLAS` hàng 1, dùng ở menu, màn hợp thể và sảnh;
  - `hopN_bay.png` (úp mặt): vào `SSS_ATLAS_BAY` hàng 1, dùng trong trận.

  Build căn **giữa lưng = tâm chiến cơ** theo tỉ lệ `_fr`. Cỡ trong trận được cộng thêm 0,16 × bloom.
- **Cánh:** `src/canh132/canh_hopN[_sang].png`, mã ở `v132.js` (`__wing132`, hệ số k = 0,236).
  - Cánh bung, vỗ nhẹ, lớp sáng nhấp nháy, có hạt sao lấp lánh.
  - Cánh code cũ (RIG) đã tắt.
- **SSS riêng tàu 11–13:** `src/art86/craft86/sss1x_*/`, đã thay bằng tranh GPT Đợt H.
- **Sảnh:** `craftImg` trong `ccht_lobby46.js` đã dùng tranh tàu mới. Trước đây tàu 11–13 bị hiện nhầm thành tàu 1–3.

### 4.3 Trang bị (đang làm, Phần J)
- **Bộ 01** (`aegis` / `inferno` / `rail`) **bản kiểm tra** nằm ở `src/tb133/`. Đã ghép ở V137.
- **Build (khối `TB133` trong `build74_mau.py`):**
  - `icon1-3` → `A[m_icon]`, `EVO g:m_icon_evo1/2`;
  - `tran1-3` → `pod_normal` / `_evo1` / `_evo2`;
  - `tranbt` → `pod_super`;
  - **giáp** = 2 module ghép gương thành ô 384 → `shell_idle` / `_evo` / `shell_bt`;
  - hiệu ứng đạn thay đúng khóa cùng cỡ.
  - `_fit133` cắt sát và căn đều mọi dạng, nên GPT vẽ dạng 3 nhỏ hơn cũng không sao.
- **Giáp vẽ bởi `Armor69.draw`** (`src/armor69.js`), chỉ cho món có trong `TB133`.
- **Bản nháp V2** để ở `src/tb133_nhap_v2/`, không dùng.
- **Khoảng cách tính từ tâm tàu** (V134, `SPREAD134`):

| Thành phần | Khoảng cách |
|---|---|
| Tên lửa | 72 px |
| Drone (vũ khí phụ) | 100 px |
| Tàu con hộ tống | 86 px (khi tàu ở nửa trên màn: 46 px) |

- **Bộ 7–9:** khóa `…36`, tranh nằm ở `src/gear15` và `src/evo15/gear`.
- **Bộ 10–13:** trong catalog dùng `aegis9 / devour10_* / chrono11_* / monarch12_*`, nhưng đang **mượn hình** của bộ khác (`GEAR81_DATA.art`, `GEAR83.behavior`). Khi có tranh mới:
  - đặt vào `src/tb133/<mã>_*.png`;
  - kiểm tra code vẽ có lấy theo `d.id` hay theo `list[0]` (`behavior`). Nếu theo `behavior` thì phải thêm ánh xạ.
- **Danh sách món theo bộ:** `Campaign36.sets` (13 bộ × giáp / tên lửa / vũ khí phụ). Màu lấy từ `GearCatalog[m].color`.

### 4.4 Mã admin
- **Mã:** `SAOBANG-ADMIN-2026`.
- **Cách nhập:** Kho → CÀI ĐẶT → MÃ QUẢN TRỊ, bấm KÍCH HOẠT 2 lần trong 8 giây.
- **Tác động:** ghi đè tiến trình. `src/admin136.js` bổ sung tàu 11–13, ải 161–200, trang bị bộ 10–13 và SSS riêng; game tự tải lại 2 lần.
- **Mã phụ:**
  - `ADMIN-VOHAN`: chỉ tài nguyên vô hạn;
  - `TANTHU2026`: quà tân thủ.

## 5. Việc đang chờ
1. **GPT Phần J trang bị (đề V2 đa dạng hình dạng):**
   - đề `out/GOI_J2_DA_DANG.zip` / `PROMPT_GPT_BO02_13_V2.md` (thay đề cũ `PROMPT_GPT_BO02_13.md`);
   - GPT giao **Bộ 02 làm lại + `so_sanh_39_phac.png` (bóng đen phác 36 món)** trước. Claude và chủ dự án duyệt độ đa dạng rồi GPT mới vẽ tiếp Bộ 03–13;
   - khi duyệt: chạy lại ảnh bóng đen (mẫu ở `goi_j2/02_bong_den_bo01_bo02.png`), kiểm tra `tranbt` không nhạt hơn `tran3`;
   - mỗi bộ 45 tranh, giao `TB_BO02.zip` … `TB_BO13.zip`;
   - Bộ 01 bản hoàn thiện có thể về lại, thay `src/tb133/` bằng bản đó.
2. **GPT Phần K vật phẩm** (Phụ lục K của đề V2: `VP_K1.zip` gồm mat + đá, `VP_K2.zip` gồm skin đạn):
   - tài nguyên, nguyên liệu, đá, vũ khí tối thượng, skin;
   - đề gốc `out/trang_bi/PROMPT_GPT_TRANG_BI_VAT_PHAM.md`;
   - giữ đúng tên tệp trong `src/ui15/res_*`, `src/mat`, `src/da`, `src/vktt`, `src/trade`.
2b. **Duyệt bản phác bóng đen của GPT (30/10 15:36):** 13 chỗ cần sửa, gồm 8 dáng trùng và 5 đầu đạn. Chi tiết ở `out/trang_bi/DUYET_PHAC_GPT.md` và `DUYET_PHAC_36.png`.
   - GPT gửi lại riêng 13 ô đã sửa; sau khi duyệt mới làm `TB_BO02.zip` (37 tệp).
   - **15:41 · Duyệt vòng 2:** đạt 12/13. Chỉ còn `ricochet` (Bộ 04) chưa phải lục giác đều. Đã cho GPT làm `TB_BO02.zip` song song. Ảnh phác lưu ở `out/trang_bi/PHAC_36_GPT.png` và `PHAC_SUA_13_GPT.png`: đây là **bóng chuẩn** để đối chiếu khi nhận tranh màu.
   - Kịch bản kiểm tra: cắt lưới 13×4, thu mỗi ô về 40 px, đo IoU từng cặp (cặp > 0,6 là đáng ngờ). Vẫn phải nhìn bằng mắt, vì IoU không bắt được 2 dáng dẹt ngang giống nhau.
2c. **Đa dạng kỹ năng và nội tại (chủ dự án yêu cầu 30/10 16:06):** đã gửi Gemini `out/GOI_GEMINI_KY_NANG.zip` (`PROMPT_GEMINI_KY_NANG_NOI_TAI_V141.md` + `HIEN_TRANG_39.md` trích từ mã + ảnh bóng đã duyệt).
   - Vấn đề đo được:
     - 12 món tên lửa và vũ khí phụ Bộ 01–06 chung đúng một nội tại (15% đạn cường hóa, +4%);
     - kỹ năng và Bạo Tẩu theo khuôn "tăng nhịp / ×2";
     - Bộ 07–13 mượn đánh thường và nội tại (`behavior`);
     - SSS chỉ 1 nội tại.
   - Gemini trả: bảng 39 dòng (duyệt trước), rồi JSON Phần A (Bộ 01–06) và Phần B (Bộ 07–13); cơ chế cần mã mới đánh `[MỚI]`.
   - Khi nhận: kiểm tra trùng họ cơ chế, ngân sách DPS ±8% (đo bằng `BENCH`), giới hạn số đạn trên màn. Nạp vào `GEAR_FX DATA` (`src/gear_fx_v3.js`) + `SKILL81` / `GEAR81` / `GEAR83`.
3. **Chủ dự án chốt lộ trình (30/10):** xong trang bị và vật phẩm (Phần J + K) thì **thiết kế và nâng cấp lại toàn bộ hợp thể trang bị và vật phẩm** (cơ chế, số liệu cho Gemini, tranh cho GPT). Đã dặn GPT vẽ mỗi món có 1 bộ phận đặc trưng tách được để món SSS ghép bộ phận của 2 món mẹ.
   **Trang bị hợp thể SSS (18 món):**
   - làm **sau** Phần J;
   - vỏ giáp SSS hiện vẫn là vòng tròn, cần vẽ lại dạng hở;
   - đề cũ để tham khảo `out/hop_the/PROMPT_GPT_DOT_I.md`, cần cập nhật theo chuẩn "nhỏ, thanh".
4. **Đợt H4 tăng sức hút robot:**
   - đề `out/GOI_DOT_H4.zip`, giới hạn mức phổ thông;
   - khi có tranh: thay `src/hop131/hopN_bay.png` và `hopN_chandung.png`, rồi kiểm tra lại tâm giữa lưng (`_fr` trong build).
5. **Còn tồn từ REVIEW122:**
   - ~~3 ô trang bị trong một hàng~~ (xong V138);
   - ~~viên nhặt "Giải cứu" rơi gần boss~~ (hết từ V134);
   - ~~làm mờ đáy danh sách Chợ Đen~~ (xong V138);
   - **cắt khung thừa dưới nút NÂNG CẤP**: chưa làm, đang chờ chủ dự án chỉ rõ vị trí. Ứng viên:
     - (a) nút NÂNG CẤP ở màn Chiến cơ: dòng phụ "2 ⬢ · GIỮ ĐỂ NÂNG LIÊN TỤC" xuống 2 dòng làm nút cao 77 px (`#hb-lv small`);
     - (b) ô trống bên phải nút KHẢM ĐÁ trong lưới `.hb-acts`;
     - (c) phần khung trống dưới hàng nút cuối của bảng chi tiết (`#hb-sheet` / `#hb-info`, `hb-body` padding-bottom 46 px).

## 6. Thư mục đầu ra
`/home/claude/work/out/`:

| Thư mục / tệp | Nội dung |
|---|---|
| `thiet_ke_lai/` | đề các đợt chiến cơ A–G, SS, kỹ năng |
| `hop_the/` | đề H, H2, H3, H4, cánh, bảng tham chiếu |
| `trang_bi/` | đề J, K, ảnh kiểm kê J1 / J2 / K, ảnh trong trận |
| `Phi_Doi_Sao_Bang_V1xx*.html` | các bản offline đã giao (mới nhất V141) |
