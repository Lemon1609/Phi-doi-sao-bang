# Phi Đội Sao Băng · ghi nhớ dự án cho Claude (đọc trước mọi việc)

Thay cho 52 tệp BAN_GIAO cũ (đã chuyển vào `docs_claude/luu_tru/ban_giao/`, chỉ đọc khi cần tra lịch sử).
Luật phong cách chi tiết + nhật ký quyết định: `docs_claude/CHUAN_PHONG_CACH_DA_CHOT.md` (mục "QUY ĐỊNH HIỆN HÀNH" ở đầu tệp).

## Vai trò, giao tiếp
- Chủ dự án: Bùi Doãn Bình. **Luôn trả lời tiếng Việt**, ngắn, trung thực; nói rõ cái gì **đo được**, cái gì **nhìn bằng mắt**, cái gì **chỉ đề xuất**.
- Claude: lập trình chính + ghép tranh. Gemini / GPT vẽ (chủ dự án chuyển tin). Claude soạn tin dán được cho Gemini / GPT, đo bằng Playwright.
- **Chỉ xuất bản khi chủ dự án nói "duyệt xuất bản"** ("Duyệt" một thiết kế = chỉ duyệt thiết kế).
- Hỏi trước khi đụng luật đã khóa hoặc việc không đảo ngược được.
- Mỗi lần xuất bản gửi: HTML offline + APK (kiểm chữ ký) + ảnh chụp + báo cáo ngắn. Không gửi bản thử / zip nguồn / gói bàn giao nếu không được hỏi.

## Khóa cứng
- Không tự tạo tài khoản hay nhập mật khẩu trên trang bên thứ ba. Email chủ dự án là riêng tư.
- Nhân vật nữ chiến giáp ở mức game mobile phổ thông (không khỏa thân, không gợi dục); bản 18+ đã bị từ chối.
- Khóa ký APK nằm trong repo riêng Lemon1609/Phi-doi-sao-bang: **repo phải giữ Private**; không đổi phần ký của workflow.
- Không đổi tên khóa `saobang-*`. Không tiền thật. Không thêm nguồn kim cương mới.
- Không cài mã ngoài để lách hạn chế. Game gốc chỉ học phong cách / cách làm, **không chép** tàu, cánh, đạn cụ thể.
- Tăng số lượng đạn theo bậc giữ nguyên tổng sát thương, trừ khi chủ dự án quyết khác.

## Dựng và kiểm tra
- Repo: `/home/claude/nguon_push`, nhánh `nguon-v212` (push origin sau mỗi mốc).
- Dựng: `python3 build74_mau.py` → `Phi_Doi_Sao_Bang_V74_mau.html` (gốc phát hành, dùng để kiểm tra). Thêm `BAN_THU=1` để dựng cả `Phi_Doi_Sao_Bang_THU.html` (bản thử có thu100) — bắt buộc khi xuất bản. Cả hai bị .gitignore.
  - Mô-đun chèn bằng `rep(a,b)` (khẳng định đúng số lần xuất hiện); chèn mới đặt trước dòng `open('Phi_Doi_Sao_Bang_V74_mau.html','w'...)`.
- Kiểm tra hồi quy: `python3 tests/t156.py <html tuyệt đối> <thư mục>` (14/14) và `python3 tests/t209_on_dinh.py <html>` (chạy t209 tối đa 3 lần, in mọi lần trượt).
- Chụp cánh bung 6 bậc: `SID=<0-based> python3 tests/quay_bac.py <html> <ra> [bậc]` → `<bậc>_<t*100>.png`; ghép bảng trước/sau: `python3 claude_tools/bang_truoc_sau.py <trước> <sau> "<tiêu đề>" <ra.jpg>`.
- Chụp đạn 6 bậc: `SID=<0-based> python3 tests/quay_dan.py <html> <ra> [bậc]`; dò kiểu đạn một tàu: `python3 tests/do_dan.py <html> <id> <bậc>`.
- Chụp đạn trang bị: `python3 tests/quay_tb.py <html> <ra> [món,...]` (mỗi món một trình duyệt, màn 12 vì màn boss Bầy Đàn không bắn; `CHUOI=1` chụp thêm chuỗi khung). Đo sát thương bia cố định: `SID=<0-based> CO=1|0 [HS='{"4":1.3}'] python3 tests/do_st_codinh.py <html>` (dao động giữa các lần ~±6 %).
- Trang bị có 3 đường vẽ: 12 món gốc qua `GEAR_FX` (gear45); bộ 9 / 10–12 là đạn thường trong `shots` (có `gearItem`, vẽ qua `Fighters28.draw` → art82); bộ 36 bắn qua `skill81` (đọc `GEAR44_ASSETS[id_projectile_*]`). Hình đạn mới: `src/gearvk304.js`.

## Quy trình tranh
- Cánh bung (Bạo Tẩu): khung chuẩn `claude_tools/khung_bung/khung/tauN_than_bao_tau.png` (1024, thân bậc Tím đúng cỡ game, U=0,75), viền 6 bậc ở `khung_bung/vien_6_bac/`.
  - Gemini (ảnh đúng khung): `KHONGTHAN=<b> PIVBAND=80 python3 claude_tools/bung_gemini.py N <a> <ra> <tên>`.
  - GPT (ảnh vuông bất kỳ, thân lệch): `python3 claude_tools/bung_gpt.py N <a> <b> <ra> <tên>`.
  - Rồi chép fx.png / fx_mau.png / fx3.png vào `src/btfx218/tauN_fx_<tên>{,_mau,3}.png` và chạy `python3 claude_tools/cai_bung_gemini.py N <ra> <tên>`; kiểm PIV đối xứng.
- Hình vũ khí: tranh trắng/xám nền đen → tách alpha theo độ sáng, xóa ✦ → `python3 claude_tools/chuan_hoa_sprite.py <vào> <ra>` → `src/vu_khi295/` (bộ Gemini, 34 tệp). Màu theo bậc + hiệu ứng vẽ bằng mã trong `src/dan299.js`.
- Thân tàu: `claude_tools/tau_v241.py`.
- Chỉ lưu ảnh gốc của bản ĐÃ CHỐT vào `src/ship118_cho/V<số>_*` (lượt bị loại không lưu); ghi quyết định vào `CHUAN_PHONG_CACH_DA_CHOT.md`.

## Trạng thái (16/11/2026)
- Bản phát hành gần nhất: web + APK **V306** (offline `Phi_Doi_Sao_Bang_V306.html`). Chưa xuất bản gì sau đó; V307 đang làm (chưa "duyệt xuất bản").
- V307 (nhánh `nguon-v212`, chưa xuất bản): mùa giải **21 ngày / 25 cấp** + rương vượt cấp (tối đa 3, 1.000 XP/rương) trong `src/s77.js` (bảng thưởng theo Gemini; mùa cũ 14 ngày/20 cấp tự gửi bù rồi mở mùa mới; `v92.js` hạng Vô Tận ép chốt mùa 1 lần); 2 nhiệm vụ tuần mới `W_ENDLESS_RUN`, `W_SWEEP_OPS` trong `src/q77.js` (tổng điểm tuần 720, mốc cao nhất vẫn 500); tam giác đỏ cảnh báo `warn307`; tinh vân sảnh + chip gợi ý `.nx66` chuyển sang phải; mẹo nạp (loading tips) trong `claude_tools/split.py`.
- **V307 phiên chiến cơ (16–17/11)**: tàu 1 đã có 6 thân thường mới (GPT) + cánh Bạo Tẩu đổi màu theo bậc (`WC307` trong `src/btfx218.js`); tàu 2–13 chờ GPT. Thẻ Vô tận, nút UI GPT, 5 tab, nút TRUYỆN tàu/phi công đã xong. Chi tiết, việc dang dở và bẫy: `docs_claude/BAN_GIAO_PHIEN_CHIEN_CO_V307.md` (đọc đầu tiên).
- Nền chương 1 tạm (V307): 3 lớp từ ảnh GPT, làm sáng bằng `claude_tools/nen_ch1_tu_gpt_v307.py` (mục tiêu độ sáng gần game gốc: p10≈15–25, p50≈40–55). Chờ tranh GPT bản 3 (`docs_claude/de_xuat_cho/GUI_GPT_V307_PROMPT_VE_NEN_V3_LOP_XA_CH1.txt`). Ghi chú màu/hiệu ứng game gốc: `docs_claude/tham_chieu/GHI_CHU_MAU_SAC_HIEU_UNG_GAME_GOC_V307.md`.
- Nền sảnh tạm bằng mã `src/sanh307.js` (SVG: xưởng giàn thép, dải ngân hà, hố đen, cột sáng); `holo212.js` để trong suốt khi có `.sk307`. Tắt: `window.SANH307=false`. Chủ dự án muốn sảnh học theo game gốc toàn diện (bối cảnh, màu, bố cục, đồ họa, tính năng) — chưa xong.
- Script id mô-đun có hậu tố `-js` (tránh trùng id phần tử DOM, từng làm opt306 không gắn nút).
- Giao diện neon (V305–V306): bộ ảnh `src/ui306n/` + `src/ui306.css`, ghi đè CSS cũ bằng id lặp (`#cmap#cmap#cmap`) hoặc ≥26 `:not(#_u79)`. Mô-đun JS nhỏ chèn trước dòng `ui306-css` trong `build74_mau.py`: `icon306`, `bw306`, `uisnd306`, `stars306`, `x2_306`, `opt306`, `card306`, `reward306`, `tier306`, `bar306`.
- t209 mục "Đang Bạo Tẩu: phá chướng ngại +0,7 s" hay trượt (đo 16/11: có lần trượt cả 3 lượt đầu rồi đạt 20/20 khi chạy lại; chưa rõ nguyên nhân). Cách chụp màn kết quả: campaign → `end(true)`, ẩn `lk90/cmap/nav74/.m63/#super-buff`.
- Chưa nối khung neon: hộp thoại `adv69/pl67/tr67/sk69`; phần còn lại bộ biểu tượng.
