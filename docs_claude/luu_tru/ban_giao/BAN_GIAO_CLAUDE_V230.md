# BÀN GIAO CLAUDE · V230 (12/11/2026)

Đọc hết tệp này trước khi làm gì. Nhật ký chi tiết từng việc: `docs_claude/BAN_GIAO_CLAUDE_V202.md` (cuối tệp là mới nhất). Bản bàn giao trước: `BAN_GIAO_CLAUDE_V214.md`.

## 1. Vai trò và cách làm việc

- Chủ dự án giao Claude **toàn quyền hoàn thiện game** "Phi Đội Sao Băng" (HTML5 bắn máy bay dọc màn hình, có APK Android): mỹ thuật, lối chơi, cân bằng.
- **Trả lời bằng tiếng Việt, ngắn, thật.** Không hứa điều chưa làm, không khẳng định khi chưa đo.
- Phân công: **GPT vẽ tranh**, **Gemini đề xuất số liệu / thiết kế cơ chế**, chủ dự án chuyển lời. Claude soạn lời gửi GPT và Gemini (tệp `docs_claude/GUI_GPT_*.md`, `PROMPT_*`), nhận tranh, **đo theo chuẩn**, sửa được bằng mã thì sửa, ghép vào game, chụp sảnh / trận / Bạo Tẩu cho chủ dự án duyệt.
- Mỗi lần phát hành: bản web (artifact), APK (kiểm chữ ký), bản HTML offline, ảnh chụp, báo cáo ngắn. Sau mỗi bản: ghi nhật ký `docs_claude/BAN_GIAO_CLAUDE_V202.md`, đẩy nhánh `nguon-v212`.
- **Hỏi trước** khi đụng luật khóa hoặc việc khó đảo ngược. Phát hành chỉ khi chủ dự án nói "duyệt".

## 2. Luật khóa (giữ)

- Repo **Lemon1609/Phi-doi-sao-bang** phải **Private** (chứa khóa ký APK). Không sửa phần ký trong workflow.
- Không đổi tên khóa lưu `saobang-*`. Không tiền thật. Không thêm nguồn kim cương.
- Trong trận: không chữ bay (trừ thông báo boss).
- Không cài mã ngoài bị chặn; không tạo tài khoản, không nhập mật khẩu cho bên thứ ba. Email chủ dự án là riêng tư.
- **Bản quyền:** game lấy cảm hứng từ một game bắn máy bay Trung Quốc (11 video đồ giám chủ dự án gửi, phân tích ở `docs_claude/tham_chieu/PHAN_TICH_11_VIDEO_GAME_GOC.md`). Claude **không** soạn prompt / đo chỉnh để tranh giống sát tàu của game đó; chỉ học cách làm và đổi chi tiết nhận diện. Chủ dự án đã tự chốt 12 mẫu tàu do GPT vẽ (một số còn gần mẫu gốc); đã được nhắc rủi ro, chủ dự án quyết.

**Luật đã MỞ (chủ dự án 11/11 tối):**
- Phe ta **được dùng** đỏ, hồng, vàng kim, đổi sắc / cầu vồng, kể cả đạn và hiệu ứng (trước đây cấm). Đạn địch vẫn đỏ #FF334F / hồng #F50057; khi áp màu mới phải chụp trận cho chủ dự án xem có rối không.
- Mỗi bậc tiến hóa **đổi cả màu giáp lẫn màu đèn**; mỗi tàu / trang bị / hợp thể một dải màu riêng không trùng.
- Còn tồn: mã cũ vẫn chặn đỏ – hồng phía ta (`src/fx215.js` quay tông đạn ta; `NEON220` trong `src/btfx218.js` bỏ quầng sắc ≥ 285° hoặc ≤ 20°). Gỡ khi áp bảng màu mới.

## 3. Mã nguồn, dựng, kiểm thử

- Nhánh mã: **`nguon-v212`**. Dựng: `python3 build74_mau.py` → `Phi_Doi_Sao_Bang_V74_mau.html` (~68,5 MB) từ `base/Phi_Doi_Sao_Bang_V42.html` + `src/*` (chèn bằng `rep()`; `rep` báo lỗi nếu chuỗi không khớp đúng 1 lần).
- Tranh chiến cơ: `src/ship118/tauN_{thuong,luc,lam,tim,tim5,ss}.png` + `_bt` (Bạo Tẩu). Bậc theo cấp cường hóa: e=0 thường, 1–2 lục, 3–4 lam, ≥5 tím, max → tím5, Thức Tỉnh SS → ss (`src/skin69.js` `form118`).
- Cân cỡ lúc dựng: `claude_tools/candoi217.py` (cỡ chuẩn căn(rộng × cao): 345/355/368/380/392/405; cạnh dài ≤ 456; `_bt` cùng hệ số). **`NO_ASP={7}`**: tàu 7 không nắn tỉ lệ (dáng cao hẹp đã chốt). Tắt: `CANDOI217=0`.
- Bạo Tẩu: `src/btfx218.js` (gọi từ `src/v118.js` back/front; `neonAt` từ `src/ship83.js` cho tàu 11–13). Mảnh rời ở `src/btfx218/tauN_fx_*.png` (lua_1..3, set_1..3, sang, hat, **bung**). **V230 thêm lớp BUNG**: tranh cánh trắng `tauN_fx_bung.png` tô màu theo bậc (bảng `TC` theo id 0-based), bật 0,3 s, đập; **vệt chém cung** (`SLASH`), neon theo màu bậc. Tắt: `BUNG230=false`, `BTFX218=false`, `NEON220=false`.
- Kiểm thử, **chạy tuần tự, đường dẫn HTML tuyệt đối**, không dựng lại khi test đang đọc HTML:
  - `python3 tests/t156.py <html> /tmp/x` → 14/14
  - `python3 tests/v203_v212/t209.py <html>` → 20/20 (đôi khi lỡ 1 khi máy bận, chạy lại riêng); `t204` 8/8; `t207` 8/8; `t206` 7/7.
- Ghép thử / chụp: `claude_tools/demo217/chup_anh_chu.py <html tuyệt đối> <thư_mục>` (sảnh + trận tàu 7); probe Bạo Tẩu theo bậc: `/home/claude/work/probe/quay230.py <html> <out> <id 0-based>` (nằm ngoài repo; chép từ nhật ký nếu cần, mẫu ở `claude_tools/do_dac/t193.py`).
- Đo tranh: rộng/cao, cỡ căn(rộng × cao), lề, khung tối (V < 0,42, S < 0,45), crôm (S < 0,18, V > 0,6), phát sáng (S > 0,45, V > 0,85), quầng (alpha 1–40), độ khớp thân giữa thường / Bạo Tẩu. Làm sạch quầng: giữ alpha > 110 nở 7–11 px.

## 4. Phát hành

1. Web: `python3 claude_tools/split.py <OUT> <html tuyệt đối>` → `python3 claude_tools/wrap.py <OUT>` (35 tệp `a/`) → `(cd <OUT> && python3 -m http.server 8766 &)` → `python3 claude_tools/smoke66.py` → tắt server, dời `wrapped.html` ra ngoài.
2. Artifact **https://claude.ai/artifact/9gvhFjgUcET4MsYQNncNmC** (đang bản 14 = V230). Publish 2 đợt (`file_path` = `<OUT>/index.html`, `root` = `<OUT>`): đợt 1 `a/s34.js`, `c01 c06 c14 c30 c31`, `s02–s05`, `s07`, `s07a`, `s08–s13`; đợt 2 `s15–s29`, `s32`, `s33`. Nếu báo "not read as published", `read` đúng tệp đó rồi publish lại. Giữ capabilities (bỏ trống trường để mang theo).
3. APK: nhánh **`build-apk-v198`** (bản sao ở `/home/claude/apk-v198` nếu còn). Thay `www/a`, thay phần thân `www/index.html` (giữ tiền tố đến `<body style="background:#06101f">`), sửa `VERSION` (ví dụ `V231`), commit, push → GitHub Actions dựng → tải asset: `gh api repos/Lemon1609/Phi-doi-sao-bang/releases?per_page=2` rồi `gh api -H "Accept: application/octet-stream" repos/Lemon1609/Phi-doi-sao-bang/releases/assets/<ID> > x.apk`. Kiểm: `keytool -printcert -jarfile x.apk` → `CN=Phi Doi Sao Bang, O=Lemon1609, C=VN`. (GraphQL bị chặn: dùng `gh api` REST, không dùng `gh release list`.)
4. Offline: chép HTML dựng thành `Phi_Doi_Sao_Bang_V2xx.html`. Gửi APK + offline + ảnh sảnh / trận bằng SendUserFile.

## 5. Hiện trạng (V230, đã phát hành 12/11 06:35)

- Web bản 14, **APK V230.35** (asset 737310970).
- **Tàu 7 Đao Phong**: bộ 12 tranh mới (thân ngọn giáo tím, hai lưỡi năng lượng trên bệ khớp, đuôi hai gai) + cánh bung + vệt chém. Màu đèn từng bậc (TC[6]): lam, lục, đỏ, tím, lơ, vàng cam. Bộ V223 cũ ở `src/ship118_cu_v229/`.
- Hướng mỹ thuật chốt (**V230**): `docs_claude/GUI_GPT_V230_13_TAU.md` (bảng gán 13 tàu ↔ 12 mẫu, màu theo bậc, tiến hóa, Bạo Tẩu, quy cách, thứ tự). Mẫu cắt ở `src/ship118_cho/V230_12_mau/` (nền tối, chưa trong suốt).
  - Gán: 1←86540A · 2←86540B · 3←86544 · 4←86541 · 5←86542 · 6←86547 · 7←bản tím chốt 23:24 · 8←86546 · 9←86548 · 10←86545 · 11 Thôn Tinh←86538 · 12 Thời Không←86539 · 13 Hư Không thiết kế riêng. **Mỗi mẫu là bậc tím.**
  - Thứ tự: 7 (xong) → **8 (đang chờ GPT)** → 6 → 2 → 4 → 10 → 5 → 3 → 9 → 1 → 11 → 12 → 13.
- Phân tích tham khảo: `docs_claude/tham_chieu/` (11 video; hiệu ứng Bạo Tẩu, đạn, kỹ năng; `demo_bao_tau_tau7.gif`).

## 6. Việc tiếp theo

1. **Tàu 8 Phần Thiên**: lời gửi `docs_claude/GUI_GPT_V231_TAU8.md` (12 tranh + `tau8_fx_bung.png` + bảng 6 màu). Khi zip về: đo; làm sạch quầng; dán thân giữa bản thường lên `_bt` nếu lệch (mã mẫu trong nhật ký 00:10 ngày 12/11); chép vào `src/ship118/` (sao lưu bộ cũ); `src/btfx218/tau8_fx_bung.png`; thêm `TC[7]` (màu đèn 6 bậc) trong `btfx218.js`; hiệu ứng phụ riêng của tàu 8 nếu cần (vẽ bằng mã); dựng, chạy test, chụp sảnh / trận / 6 bậc Bạo Tẩu → chờ chủ dự án duyệt → phát hành V231.
2. Lần lượt các tàu còn lại theo thứ tự trên, mỗi tàu một lời gửi riêng như tàu 8.
3. Gỡ chặn đỏ – hồng phía ta (fx215, NEON220) khi áp màu mới; chụp trận kiểm độ rối.
4. Chờ Gemini trả lời cơ chế (mục 5 của `docs_claude/PROMPT_V229_THIET_KE_LAI_TOAN_BO.md`): đạn đổi theo bậc, đòn tự động nhỏ, 4 hình thái hay 6 bậc. Chưa đổi số liệu khi chủ dự án chưa duyệt.
5. Để sau: đề xuất 5 tàu + 5 boss của Gemini (`docs_claude/de_xuat_cho/`), trang bị, hợp thể, tàu địch, quy cách tranh boss cho phá cánh V206.
6. Việc chủ dự án còn treo: thử máy G4/G5, dự án Firebase.

## 7. Mẹo / bẫy đã gặp

- Container có thể khởi động lại giữa chừng: commit + push trước chuỗi test dài.
- `rm -rf` có lúc bị chặn: dùng thư mục ra mới.
- Script test cần đường dẫn HTML tuyệt đối (đường tương đối thành `file://...` sai).
- Ảnh GPT thường không đúng 512×512 hoặc có nền: tách nền / thu cỡ, báo chủ dự án.
- Hook canvas: dùng `add_init_script`, gọi `drawImage` gốc để tránh đệ quy.
