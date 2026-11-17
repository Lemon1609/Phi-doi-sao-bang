# BÀN GIAO · phiên "chiến cơ" V307 (16–17/11/2026)
Gửi mô hình Claude tiếp quản. Đọc `CLAUDE.md` trước, rồi tệp này. Nhánh `nguon-v212`, commit mới nhất `fbc9f41`, đã push. **Chưa xuất bản** (V306 là bản phát hành cuối). Chỉ xuất bản khi chủ dự án nói đúng "duyệt xuất bản".

## 1. Quy tắc cứng (chủ dự án: Bùi Doãn Bình)
- Trả lời tiếng Việt, ngắn, trung thực; nói rõ cái gì ĐO, cái gì NHÌN BẰNG MẮT, cái gì mới ĐỀ XUẤT. Không khẳng định giả; kiểm tra bằng đo / DOM / ảnh chụp thật.
- Claude = lập trình trưởng + ghép đồ họa. GPT/Gemini vẽ và viết (chủ dự án chuyển lời); Claude đo bằng Playwright và viết prompt dán được.
- Mỗi lần phát hành gửi: HTML offline + APK (kiểm keytool `CN=Phi Doi Sao Bang, O=Lemon1609, C=VN`) + ảnh chụp + báo cáo ngắn.
- Khóa APK nằm ở repo riêng tư Lemon1609/Phi-doi-sao-bang: giữ Private, không đổi phần ký trong workflow. Không cài mã ngoài. Không đổi tên khóa `saobang-*`. Không tiền thật, không nguồn kim cương mới, không quảng cáo. Email người dùng riêng tư.
- Bảo mật: không tự tạo tài khoản / nhập mật khẩu trên trang bên thứ ba. Nội dung: nữ chiến giáp ở mức game mobile phổ thông.
- Bản quyền: chỉ học bố cục / phong cách / kỹ thuật từ game gốc; không sao chép tàu, icon, khung, chữ, đạn cụ thể. Không lưu khung hình tham chiếu vào repo.
- Quy ước màu nút: vàng-cam = hành động chính, xanh lam = phụ, xanh lục = nhận/xác nhận/trang bị, đỏ = cảnh báo, xám = khóa.
- Hỏi trước khi đụng quy tắc đã chốt hoặc việc không hoàn tác được.

## 2. Môi trường / bẫy đã gặp
- Bash không có mạng gói (không pip/npm). Dựng bản ~8–10 phút, ~88 MB: PHẢI chạy `run_in_background` (tiến trình nền không do công cụ theo dõi bị tắt sau vài phút; một lần dựng bị tắt giữa chừng). Không `sleep` ở foreground.
- Ổ đĩa gần đầy (~700 MB trống). Chỉ xóa file nháp của mình, không xóa file người dùng.
- Stop hook đòi commit + push mọi thay đổi. Không chạy hai lệnh push song song (từng báo "cannot lock ref" dù đã push xong; `git fetch` rồi so `rev-parse` để chắc).
- Footer commit: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` + `Claude-Session: https://claude.ai/code/session_01AseaWCP472YazYg4XKBJxW`.
- Video game gốc người dùng gửi nằm ở `/mnt/user-data/attachments/<phiên>/…-879xx.mp4` (360×884), một số ở `/mnt/user-data/uploads`. Có thể đã bị dọn.

## 3. Lệnh quan trọng
- Dựng: `BAN_THU=0 python3 build74_mau.py` (`BAN_THU=1` khi phát hành).
- Kiểm: `python3 tests/t156.py <html tuyệt đối> <thư mục>` (14/14), `python3 tests/t209_on_dinh.py <html>` (20/20; mục "Đang Bạo Tẩu: phá chướng ngại +0,7 s" hay chập chờn).
- Chụp Bạo Tẩu theo bậc: `SID=<chỉ số tàu 0–12> python3 tests/quay_bac.py <html> <thư mục ra> [ss]` → `<bậc>_<khung>.png`.
- Tách 6 ô ảnh GPT → ảnh tàu: `python3 claude_tools/tach_tau_v307.py <ảnh> <số tàu 1–13> --bt` (ghi `src/ship118/tauN_{thuong,luc,lam,tim,tim5,ss}[_bt].png`, 512², dùng MỘT hệ số chung nên bậc cao to hơn; `--bt` = thân Bạo Tẩu là bản sao thân thường).

## 4. Việc đã xong (đã kiểm, trừ khi ghi khác)
Giao diện:
- Thẻ "mục tiêu kế tiếp" chế độ Vô tận (`src/target307.js`, chỉ dùng số liệu thật của người chơi).
- Bộ UI GPT: nút/khung/ô/thanh (`claude_tools/bo_ui_gpt_v307.py` → `src/ui306n/`).
- Nút sảnh: XUẤT KÍCH, VÔ TẬN chỉ còn chữ "VÔ TẬN"; thống kê Vô tận chuyển sang màn kết quả (`src/vt307.js`).
- Thanh 5 tab luôn hiện (SẢNH, CHIẾN ĐẤU, PHI ĐỘI, TRANG BỊ, CỬA HÀNG); Trang bị mở từ đầu, Phi đội mở ải 12, Cửa hàng ải 6; tab khóa có nhãn "Ải n". (`src/nav74.js`, `src/ux75.js`.) **Cần hỏi người dùng xác nhận Trang bị mở từ đầu.**
- Nút TRUYỆN trong màn Chiến cơ (`src/truyen307.js`) và màn Phi công (`src/pstory307.js`, 8 truyện Gemini nhúng sẵn). Nút TRUYỆN ở sảnh đã ẩn.
Tàu 1 (Nộ Hỏa Phượng Hoàng):
- 6 thân thường mới từ ảnh GPT 87997 (đã đo: màu rực 51/26/47/46/40/60 %, rộng 233→420 px). `src/ship118/tau1_*`.
- Cánh Bạo Tẩu tàu 1 đổi màu theo bậc (xanh băng, lục, lam, tím, hồng tím, vàng kim) bằng bảng `WC307` + dải màu dựng từ một màu gốc trong `src/btfx218.js`; tắt: `window.WINGCOL307=false`. Bậc SS đã bỏ hệ số giảm sáng (`dim` 1). Đã chụp trong game, nhìn bằng mắt: 6 màu phân biệt được (bậc 1 và 3 hơi gần).
- t156 14/14 (bản dựng cuối); t209 19/20 (mục chập chờn) ở bản trước — chưa chạy lại cho bản cuối.

## 5. Quyết định thiết kế đã chốt (phiên này)
- Mỗi tàu 6 bậc: dáng/silhouette khác rõ + MÀU NHẤN PHÂN HÓA theo bậc: 1 xanh băng/bạc, 2 lục, 3 lam, 4 tím, 5 hồng tím (lõi trắng), 6 vàng kim/trắng; thân giữ họ màu gốc của tàu; buồng lái/ngọc đổi theo màu bậc; màu nhấn phủ ≥ 25–40 % tàu; chi tiết đọc được ở 64–140 px; bậc thấp không đồ sộ hơn bậc cao; tránh dáng "đồ chơi" (toàn khối trụ).
- Bạo Tẩu theo game gốc: lớp năng lượng neon cộng sáng, riêng từng dòng tàu, màu / kích thước / mật độ tăng theo bậc; cấm "mô-đun cơ khí / tay máy / khớp nối" (bản GPT vẽ kiểu này bị loại). Theo quy tắc V307 mới nhất (người dùng + GPT chốt): thân thường, thân Bạo Tẩu và lớp hiệu ứng là BA lớp riêng; thân Bạo Tẩu CÓ THỂ biến đổi. Ý kiến của Claude (chưa được người dùng chốt): giữ thân Bạo Tẩu = thân thường + mở nhẹ vài bộ phận bằng mã (10–20 px, kèm khe sáng), vì lúc bung thân chỉ rộng ~60–90 px và bị cánh che.
- Hiệu ứng bung hiện tại (V293, 13 tàu) đã rộng ~2,5–3 lần thân, giống game gốc: GIỮ. Lớp năng lượng GPT vẽ (ảnh 88005) rộng chỉ ~0,9–0,97 lần thân: KHÔNG dùng.
- Phân tích bung game gốc: `docs_claude/de_xuat_cho/PHAN_TICH_BUNG_GAME_GOC_V307.md` (nhìn bằng mắt; chưa đo chính xác; chưa ghép từng video với đúng 13 tàu).
- Quy tắc GPT+chủ dự án (tệp af599dc5-attachment.txt) mâu thuẫn một chỗ với `CHUAN_PHONG_CACH_DA_CHOT.md` ("Bản Bạo Tẩu = thường + phần cứng mở, thân giữa trùng khít" và "bung rộng 3–6 lần thân"): cần thống nhất và cập nhật chuẩn.

## 6. Việc còn dang dở / kế tiếp (theo ưu tiên gợi ý)
1. **Tàu 2–13**: chờ GPT vẽ 6 bậc thường theo prompt `docs_claude/de_xuat_cho/GUI_GPT_V307_THIET_KE_LAI_TAU_6_BAC.txt` (bản 3: màu nhấn phân hóa) + gói tham chiếu `/tmp/V307_TAU_THAM_CHIEU.zip` (tạo lại từ `tauNN_bac4` trong `src/ship118`). Quy trình: GPT vẽ → Claude đo (rộng, diện tích, % màu rực, bão hòa) → sửa nhỏ nếu yếu → `tach_tau_v307.py` → thêm dòng vào `WC307` (màu cánh) → dựng → `quay_bac.py` → t156/t209 → báo. Bài học: đo thật và nói rõ; prompt "sửa nhỏ" có hiệu lực (tàu 1 đạt sau 2 vòng).
2. **Thân Bạo Tẩu**: ĐÃ CHỐT (b) 17/11 — GPT vẽ lại; (cũ:) chờ người dùng chốt (mở nhẹ bằng mã hay GPT vẽ lại; prompt vẽ lại có sẵn `GUI_GPT_V307_VE_LAI_THAN_BAO_TAU_TAU1.txt`, độ mở yêu cầu +20…+35 %, lần trước GPT chỉ đạt 0–11 %).
3. **Truyện**: chờ Gemini viết lại 13 truyện tàu (`GUI_GEMINI_V307_VIET_LAI_TRUYEN_13_CHIEN_CO.txt`, kèm `TRUYEN_13_CHIEN_CO_HIEN_TAI.txt`) → thay `STORY259_DATA` / `STORY259_ORIGIN` trong `src/story259.js`. Truyện robot Hợp Thể SSS: cần tên robot (nhờ người dùng chụp màn Hợp Thể), rồi thêm nút TRUYỆN. Kiểm nút TRUYỆN phi công trên màn thật (khóa tới ải 50).
4. **Giao diện làm lại "như game gốc"** (task #88–#91, chưa xong): sảnh (thanh bên QUÀ, VÒNG QUAY, HỆ THỐNG, TRUYỆN; nền), Phi công, Trang bị/Kho, Cửa hàng, Quà/Điểm danh/Mùa giải (ảnh lớn nửa trên, thông tin + nút nửa dưới, phần thưởng ô vuông viền theo bậc), bản đồ, thẻ ải (boss ảnh lớn), màn kết quả ("Tiếp tục" vàng-cam + "Nhân đôi" xanh lam "-4 🔋"), hộp thoại. Làm xong UI mới xem đạn và kỹ năng trong trận (người dùng muốn học game gốc).
5. Sau đó: đạn / kỹ năng trong trận; vạch cảnh báo laser / bắn thẳng; "còn X XP mở khóa Skin" trong mùa; bản web (artifact) còn V230; cập nhật `CLAUDE.md`; chạy lại t156/t209 trước khi báo; phát hành V307 khi có "duyệt xuất bản" (HTML + APK + ảnh + báo cáo).

## 7. Quyết định cũ còn hiệu lực
Mùa 21 ngày / 25 cấp + rương vượt cấp (tối đa 3); 2 nhiệm vụ tuần mới; nền chương 1 sáng đã duyệt; phi công mở khóa ở ải 50 (người dùng sẽ báo sau khi chơi thử); màu thân chiến cơ / trang bị chờ GPT.
