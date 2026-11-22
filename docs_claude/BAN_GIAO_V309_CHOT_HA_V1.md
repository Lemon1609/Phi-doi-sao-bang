# BÀN GIAO · Phi Đội Sao Băng · V309 "Chốt hạ V1" (22/11/2026 11:48)

Đọc tệp này TRƯỚC, rồi `CLAUDE.md` (luật + nhật ký chi tiết từng lượt), rồi `docs_claude/CHUAN_PHONG_CACH_DA_CHOT.md`.

## 1. Hiện trạng một câu
- Mã nguồn V309 đã xong 12 lượt (Lượt 1 → 12), chủ dự án **"Chốt"** Lượt 12 lúc 22/11 11:48 = bản V1 hoàn chỉnh về thiết kế.
- **CHƯA xuất bản** (bản phát hành gần nhất vẫn là web + APK **V306**). Chỉ xuất bản khi chủ dự án nói đúng câu **"duyệt xuất bản"**.
- Bước tiếp theo chủ dự án định làm: cài bản test lên điện thoại thật để đo FPS và cảm giác bấm, rồi mới quyết xuất bản.
- Commit cuối: `f8d2060` (Lượt 12) trên nhánh `nguon-v212`, đã push. Tag máy do chủ dự án tự tạo trên GitHub; tag có trong bản sao cục bộ: `v309-luot2/3/4`. Theo tin chủ dự án: `v309-luot8`, `v309-luot9`=`18dd66c`, `v309-luot10`=`3c7d524`, `v309-luot11`=`b4dd344`. Lượt 12 (`f8d2060`) chưa có tag (chủ dự án sẽ tạo `v309-luot12` nếu muốn).

## 2. Vai trò & luật (tóm tắt — bản đầy đủ ở CLAUDE.md "Khóa cứng")
- Luôn trả lời tiếng Việt, ngắn, trung thực; tách rõ **đo được / nhìn bằng mắt / chỉ đề xuất**.
- Claude = lập trình chính + ghép tranh. Gemini / GPT vẽ và góp ý thiết kế (chủ dự án chuyển tin qua lại; Claude soạn tin dán được, đóng zip trong `/home/claude/goi_gpt/`).
- Không tiền thật; không thêm nguồn kim cương (ngoại lệ đã duyệt duy nhất: Quỹ Tiến Trình 1.440 kim cương nhận 1 lần). Không đổi khóa `saobang-*`. Repo khóa ký APK phải Private, không sửa phần ký. Nhân vật nữ mức game phổ thông. Không chép tàu/cánh/đạn game gốc.
- Hỏi trước khi đụng luật khóa / việc không đảo ngược.

## 3. Dựng – kiểm – vá nhanh
- Dựng: `cd /home/claude/phi-doi-sao-bang && python3 build74_mau.py` (~5 phút, ~85 MB) → `Phi_Doi_Sao_Bang_V74_mau.html` (bị .gitignore). Xuất bản cần thêm `BAN_THU=1`.
- Hồi quy (CHẠY LẦN LƯỢT, không song song): `python3 tests/t156.py $PWD/Phi_Doi_Sao_Bang_V74_mau.html /tmp/t156o` (14/14) rồi `python3 tests/t209_on_dinh.py $PWD/Phi_Doi_Sao_Bang_V74_mau.html` (20/20; thỉnh thoảng trượt 1 mục lần đầu rồi đạt khi chạy lại — đã biết).
- Vá nhanh không dựng lại (chỉ thay JS/CSS mô-đun trong HTML đã dựng): `python3 /home/claude/sc/va11.py <html> <ra> l11309 l12309 ...` (CSS chỉ xử lý cho l11309, l12309). Có bản tương tự cho mô-đun cũ: `va_ui307.py`, `va_tb309.py`, `va_fx309.py`.
- Khung chụp Playwright dùng `tests/v203_v212/t209.py` (`setup(br,'SS')` tài khoản quản trị, `start(pg,ải)`); luôn chèn `<style>#q307{display:none!important}</style>` để ẩn popup quà.
- Script chụp lượt mới nhất: `/home/claude/sc/cap12m.py` (màn phụ, `ONLY=`), `cap12b.py` (HUD/thắng/thua/tạm dừng), `/tmp/cap_ar.py <html> <ra> W H tên` (tỉ lệ màn), `/home/claude/sc/cap11.py`, `cap11f.py` (kiểm Vô tận tiếp tế + Anh Hùng). Ảnh: `/home/claude/anh/L1…L12/`.
- Lưu ý `/tmp` và `/home/claude/sc` có thể mất khi đổi máy; mã nguồn thật ở repo.

## 4. Quy trình xuất bản (chỉ khi "duyệt xuất bản")
1. `BAN_THU=1 python3 build74_mau.py`; chạy t156 + t209.
2. Web: `python3 claude_tools/split.py <OUT> <html>` → `python3 claude_tools/wrap.py <OUT>` → server 8766 + `python3 claude_tools/smoke66.py` → publish artifact (chi tiết bước ở `docs_claude/luu_tru/ban_giao/BAN_GIAO_CLAUDE_V230.md` mục 4; artifact cũ https://claude.ai/artifact/9gvhFjgUcET4MsYQNncNmC).
3. APK: nhánh `build-apk-v198` — thay `www/a` + thân `www/index.html` (giữ tiền tố đến `<body style="background:#06101f">`), sửa `VERSION`, push → Actions dựng → tải asset bằng `gh api` REST → kiểm `keytool -printcert -jarfile x.apk` phải là `CN=Phi Doi Sao Bang, O=Lemon1609, C=VN`.
4. Offline: chép HTML thành `Phi_Doi_Sao_Bang_V3xx.html`. Gửi: HTML offline + APK + ảnh + báo cáo ngắn. Không gửi bản thử/zip nguồn nếu không được hỏi.
5. Cập nhật CLAUDE.md "Bản phát hành gần nhất".

## 5. 12 lượt V309 (mỗi mô-đun có cờ tắt `window.X=false`; chi tiết + bẫy ở CLAUDE.md)
| Lượt | Commit | Nội dung chính | Mô-đun / cờ |
|---|---|---|---|
| 1 | (trước 7a3db92) | màu bậc chống lóa, tia 3 lớp, 13 cơ chế đạn, đạn quái/boss, trang bị đồng bộ, Phương án A màu | dan307 `MAU309B`, fx309, co309 `CO309B`, dq309, tb309 |
| 2 | 7a3db92, 5883a92 | cánh năng lượng 6 mẫu, nghiêng tàu, tàu con lò xo, khung thẻ, bắn thử | wing309 `CANH309`, v118 `BANK309`, ui309 `THE309/PV309` |
| 3 | 065b0e6 | 13 chiến cơ v4 (Thường + Bạo Tẩu), hiệu ứng bậc | `src/ship309`, l3309 `L3309` |
| 4 | 07b5fbf | hợp thể 1–1, 7 Chiến Thần, 21 SSS, 26 icon | hop4309 `HOP4309`, gear45 `SSS4309` |
| 5 | ce4aa28 | vật phẩm rơi, quái tinh anh, nổ quái | l5309 `DROP309/ELITE309/NO309` |
| 6 | b50e2dc | rung, âm thanh, nhạc, boss báo laser/cánh vỡ, nút TỰ ĐỘNG | l6309 `FEEL6/BOSS6/TOUCH6` |
| 7 | 64bece8 | môi trường động, 3 bộ trang bị, Bách khoa, nhiệm vụ mới | l7309 `ENV7/LOAD7/CODEX7/QUEST7` |
| 8 | 4bafd46…6c36988 | Ngoại trang / Trang phục 4 hạng, sảnh 3 ô tài nguyên, sửa CP nhảy | l8309 `SKIN8/SANH8/CP8FIX` |
| 9 / 9B | ad28a79, 18dd66c | Sảnh mới, đầu trang 2 tầng, Kho trung tâm, Cường hóa 2-trong-1, Royal Blue | l9309 `UX9/THEME9`, l9b309 `UX9B` |
| 10 / 10B | b89253b, 3c7d524 | chuyển động cánh/LED/hồ quang; bản đồ chòm sao, càn quét nhanh, Siêu Tần Tuần, Quỹ; khung chrome thống nhất | a10309 `ANIM10`, q10309 `QOL10`, f10309 `FRAME10` |
| 11 | b4dd344 | Tiếp tế Vô tận, Phi công gọn, gom tab đầu trang, chế độ Anh Hùng | l11309 `UX11` (EP11/PL11/HUB11/HERO11/SW11) |
| 12 | f8d2060 | sửa 4 lỗi L11, HUD chrome, thắng/thua/tạm dừng, màn phụ, vùng chạm, buồng lái, màn rộng | l12309 `POLISH12` |

Con số đã chốt Lượt 11–12: tiếp tế 1.200 / 300 / 600 ◈ (Đột kích cần kỷ lục ≥ đợt 20); Anh Hùng máu ×1,8, sát thương ×1,25, lực chiến đề nghị ×1,5, thưởng lần đầu +500 ◈ mỗi 20 ải, 15 % mảnh phi công, 20 % nguyên liệu Tím, không kim cương.

## 6. Việc còn mở / đã biết (chưa ai yêu cầu làm)
- Đo FPS + cảm ứng trên máy thật (chủ dự án sẽ làm). Safe-area chỉ kiểm được trên máy thật.
- Thanh máu boss trong ảnh chụp trông rỗng dù boss còn máu (có từ trước Lượt 12, chưa rõ nguyên nhân).
- t209 thỉnh thoảng trượt 1 mục ở lần đầu (mục "Bạo Tẩu phá chướng ngại" / "Phá 1 tháp" đã biết là chập chờn).
- Từ các lượt trước (xem CLAUDE.md): 5 tranh VKTT chờ món mới; vật phẩm đổi súng không rơi từ V54; chưa đo boss đơn cho 13 cơ chế đạn; tàu 11 sát thương dao động lớn; chữ "giáp đã mất" ở mô tả món Giáp gốc; Rương HK từ nhiệm vụ tuần; đá nội tại / ép xung chưa làm.
- Chủ dự án đã bỏ khỏi kế hoạch: Boss Rush, Tàu Hộ Tống. Từ v2.0 chỉ giữ thẻ tăng ích Roguelike cho Vô tận và Sự kiện mùa offline.

## 7. Bẫy kỹ thuật hay gặp
- `const` toàn cục (Progress, L9309, Campaign36…) KHÔNG là thuộc tính `window` → dùng `typeof X!=='undefined'`, và tự gán `window.X=X` nếu cần.
- `#cmap`, `#hdr9` là `position:fixed` → `offsetParent` luôn null; kiểm hiển thị bằng `getClientRects().length`.
- CSS cũ có độ ưu tiên rất cao: mỗi lượt dùng tiền tố `html.<lớp> body` + 34…48 `:not(#_x)` (build thay `@P12`, `@L11`, …).
- Ký tự ✓ trong nút có thể bị ẩn bởi lớp CSS khác → vẽ bằng `::after`.
- `Onboard66.open(k)` có tác dụng phụ (mở hướng dẫn) — đừng gọi để kiểm khóa.
- Không dùng `ctx.filter` / `shadowBlur` trong vòng lặp trận (giữ ≥ 60 FPS).
- Popup quà `#q307` hay che ảnh chụp → ẩn bằng style `!important`.
