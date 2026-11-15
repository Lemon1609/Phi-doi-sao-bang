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
- Bản phát hành gần nhất: web + APK **V233** (chưa xuất bản gì sau đó).
- Bản thử: cánh bung mới đủ 13 tàu (V293); đạn mới 13 tàu (V299–V302) + cơ chế thật tàu 3/4/9/12 (V303); hình đạn trang bị mới cho 13 tên lửa + 3 vũ khí phụ (V304). Còn 10 vũ khí phụ dùng hình cũ.
- Giao diện neon (V305–V306t, chưa xuất bản): bộ ảnh `src/ui306n/` + `src/ui306.css`, ghi đè CSS cũ bằng id lặp (`#cmap#cmap#cmap`) hoặc ≥26 `:not(#_u79)`. Mô-đun JS nhỏ chèn trước dòng `ui306-css` trong `build74_mau.py`: `icon306` (emoji→biểu tượng), `bw306` (cảnh báo boss, chỉ boss), `uisnd306` (âm thanh UI CC0 Kenney, `docs_claude/giay_phep/`), `stars306` (băng 3 sao kết quả), `x2_306` (nhân đôi hợp kim: trần 1500, 3 lượt/ngày, −4 thể lực, mở sau ải 5; nhật ký đo `saobang-x2log306`), `opt306` (tùy chọn ĐẠN TA mờ / CHỮ lớn / GIAO DIỆN dịu, khóa `saobang-opt306`, đạn mờ bọc `Fighters28.draw`/`Equipment25.drawShot`/`VisualFX.drawShot` chỉ cho đạn trong `shots`), `card306` (3 sao thẻ ải), `reward306` (3 ô thưởng kết quả: runCredits/runItems/runChests), `tier306` (khung ô trang bị theo bậc qua `--u15-fq`).
- Bố cục màn hình học theo game gốc (chủ dự án chốt 15/11); ba tùy chọn thị giác là thiết kế riêng. Chưa nối khung neon: hộp thoại `adv69/pl67/tr67/sk69`, thanh tiến độ, phần còn lại bộ biểu tượng.
- t209 mục "Đang Bạo Tẩu: phá chướng ngại +0,7 s" hay trượt lượt đầu (đo 16/11: V306m 1/4, V306q 2/4 trượt; chưa rõ nguyên nhân). Cách chụp màn kết quả: campaign → `end(true)`, ẩn `lk90/cmap/nav74/.m63/#super-buff`.
