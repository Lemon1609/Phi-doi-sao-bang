# BÀN GIAO V2.1 · Phi Đội Sao Băng (23/11/2026 21:30)

Đọc tệp này TRƯỚC, sau đó `CLAUDE.md` (mục nhật ký cuối: V2.1 Đợt 1 → Đợt 3b + SFX).

## 1. Trạng thái (23/11 21:55) — V2.1 ĐÃ XUẤT BẢN
- Chủ dự án "Duyệt xuất bản" 21:31. **APK `PhiDoiSaoBang-V2.1.41.apk` = 72.739.835 byte (72,7 MB)**, Release https://github.com/Lemon1609/Phi-doi-sao-bang/releases/tag/V2.1.41 (tải: …/releases/download/V2.1.41/PhiDoiSaoBang-V2.1.41.apk), sha256 `b7b3cb4184aada4efb5f599e8bdfa4a0a30c61484fa8e4fe2d2009950b8e3e9d`, versionName V2.1.41, versionCode 41.
- Chữ ký: Owner `CN=Phi Doi Sao Bang, O=Lemon1609, C=VN`, SHA256 `B1:34:1B:9F:…:DC:0E` — **trùng V306.39** → cài đè giữ dữ liệu. `assets/public` trong APK trùng từng tệp với `www/` đã kiểm (59 tệp + index, 86,8 MB).
- Nhánh: `build-apk-v198` = `a986f14` (www V2.1 + `apk.yml` giữ artifact 1 ngày), `nguon-v212` = nguồn đầy đủ (gộp L13 → V2.1, không xóa tệp).
- Sự cố đã qua: run 40/41 lần 1 không khởi động vì lỗi thanh toán GitHub; chủ dự án sửa → rerun 41 (lần 2) xong 3 phút. Đã xóa 35 artifact cũ (~2,08 GB, APK vẫn ở Releases). Releases 33 bản (~2 GB, không tính phí Actions); repo git ~1,37 GB.
- Bước kế: chủ dự án cài thử máy thật (FPS, âm thanh, cảm ứng). Mọi lần xuất bản sau chỉ làm khi có câu "duyệt xuất bản".

## 2. Mã nguồn ở đâu
- GitHub `Lemon1609/Phi-doi-sao-bang` (PRIVATE), nhánh **`nguon-v212`** (`9ddb70f`) = nguồn đầy đủ mới nhất. Gói `nguon_V21_day_du.zip` chỉ là bản sao dự phòng (thiếu ảnh cũ).
- Bản phát hành: nhánh `build-apk-v198` (`www/` + `VERSION`). Bản thử HTML một tệp: `Phi_Doi_Sao_Bang_V21_thu.zip`.
- `claude_tools/split.py` đã sửa: dời `<link i15root>` / `<script vfx15b>` (opt15 chèn sau `<head>`) ra sau `<title>` để khớp khuôn đầu trang; khi tách cần `KIT=<thư mục có src/ui19/loading_*.png, app_icon.png>`.

## 3. V2.1 gồm gì (mô-đun mới / sửa)
| Mô-đun | Việc | Tắt |
|---|---|---|
| `src/evo21.js` | cơ chế + VFX theo bậc, ảnh GPT chiến cơ/CT/tên lửa/tàu con/SSS, vùng dư robot gây sát thương, Kho/Xưởng SSS theo mốc (`sssIcon`, `hangarImg`) | `EVO21=false` (tất cả V2.1), `EVO21G`, `EVO21HZ`, `EVO21IMG`, `EVO21FX`, `EVO21CO`, `EVO21ROB` |
| `src/evo21_led.js` | LED neon (chiến cơ, Chiến Thần, tàu con, tên lửa, Kho, Xưởng) | `EVO21LED=false` |
| `src/evo21_sfx.js` | âm thanh tổng hợp WebAudio theo hệ/bậc, biến hình, Tuyệt kỹ E, UI Kho/Xưởng, hạ nhạc | `EVO21SFX=false` |
| `src/evo21img/` | ~610 webp q90 gốc (build tự nén bằng `claude_tools/evo21_nen.py`, `E21NEN=0` giữ q90) | — |
| `src/ship309/` | thân 13 chiến cơ V2.1 (png 512) | `SHIP309=0` |
| sửa | `tb309, rob309, hop309, dan307, dan299, wing309, v121, co309, sss_e3, gear45, ui309, a10309, l9b309, music96 (duckFx), l6309 (duck khi nổ boss)` | — |
| công cụ | `evo21_cat.py, evo21_13.sh, evo21_ct.py, evo21_dot2.py, evo21_dot3.py, evo21_nen.py, inject_evo21.py`; kiểm/chụp: `claude_tools/v21_kiem/` | — |

Âm thanh: dùng chung AudioContext của `Audio393` (biến toàn cục `audio`), chỉ kêu khi nút ÂM THANH bật (`sound`), mở khóa ở cử chỉ đầu tiên (pointerdown/touchstart/keydown, gọi `Audio393.unlock` + `resume`); trần 10 tiếng + hồi chiêu theo loại + DynamicsCompressor riêng; nhạc hạ qua nút gain mới `dk21` trong `music96` (`Music96.duckFx(a,d)`), tôn trọng thanh âm lượng nhạc. Hệ: lửa (inferno/solar/stellar/comet/nova) · băng (cryo/prism/ricochet) · điện (thunder/rail/lance) · hư không (void/singularity/devour/chrono/gravity/swarm) · thiên giới (còn lại). 0 tệp âm thanh.

## 4. Kiểm đã chạy (đo được)
- Bản thử cuối `l21j` (có âm thanh): t156 14/14 + t209 20/20 khi bật V2.1 và khi `window.EVO21=false` (chạy lần lượt 23/11 21:20–21:50).
- Âm thanh (`claude_tools/v21_kiem/t_sfx.py`): trước chạm chưa có AudioContext → sau chạm `running`; 8 s Bạo Tẩu SSS: 16 tiếng, đỉnh 7 tiếng cùng lúc, 0 bị cắt; `EVO21=false`: 0 tiếng; 0 lỗi JS.
- LED: chi phí ≈0,5 ms/khung (CPU); FPS headless không GPU ~11 ở mọi cấu hình → **chưa có số ≥60 FPS trên máy thật**.
- Vùng dư robot: 1,5 × đơn vị/giây (đo 15–16/s với đơn vị 10), vệt lửa #6 4,00/nhịp 0,2 s.

## 5. Quy trình xuất bản APK (đã chạy được cho V2.1)
1. HTML phát hành: hiện dùng bản thử đã kiểm (`l21j`). Lần sau nên dựng đầy đủ từ `nguon-v212`: `BAN_THU=1 python3 build74_mau.py` → chạy LẦN LƯỢT t156 + t209 (cả bản chèn `window.EVO21=false`).
2. Tách: `KIT=<thư mục có src/ui19/{loading_background,loading_logo,loading_track,loading_fill,app_icon}.png> python3 claude_tools/split.py <www_ra> <html>` (split.py đã sửa cho đầu trang opt15). Mở thử `www/index.html` bằng Playwright: vào `mode==='menu'`, 0 lỗi.
3. Clone nhánh `build-apk-v198` (`git clone --depth 1 --single-branch --branch build-apk-v198 …`), thay `www/`, sửa `VERSION`, commit, push → workflow `apk.yml` tự build ~3 phút, ký `signing/debug.keystore` (KHÔNG đổi), kiểm "Lemon1609", tạo Release `<VERSION>.<run>`.
4. Theo dõi: `gh api "repos/Lemon1609/Phi-doi-sao-bang/actions/runs?branch=build-apk-v198&per_page=1"`; nếu job không khởi động, xem annotations của check-run (lỗi thanh toán). Lấy link + dung lượng: `gh api repos/Lemon1609/Phi-doi-sao-bang/releases --jq '.[0]|.html_url,(.assets[0]|.name,.size)'`. Tự kiểm chữ ký: tải asset (`gh api -H "Accept: application/octet-stream" repos/…/releases/assets/<id>`) rồi `keytool -printcert -jarfile` so SHA256 với bản trước.
5. Gửi chủ dự án: link + dung lượng APK, kết quả kiểm chữ ký, HTML offline, ảnh, báo cáo ngắn.

## 6. Còn mở / chưa làm
- Chưa đo FPS / âm thanh trên điện thoại thật (chủ dự án tự thử).
- Dung lượng: 86,7 MB thô / ~62,7 MB nén (mục tiêu chủ dự án ~63 MB). Muốn < 80 MB thô phải động ảnh cũ (`GEAR44_ASSETS` 19,9 MB) — đã khóa từ Lượt 15, cần chủ dự án quyết.
- SSS độc tôn (Trảm Không Đế Vương …): `Gear44.equipSSS` trả true nhưng `activeId` vẫn món thường trên hồ sơ thử → chưa kiểm hình trong trận.
- Thần hóa #11–#13 dùng LED riêng TH17, chưa nối EVO21_LED.
- Ảnh Kho 384 của tên lửa/tàu con thường (`src/evo21img_kho/tl_*/wg_*_i*`) chưa dùng (Kho dùng ảnh 4 bậc trận).

## 7. Quy trình vá nhanh bản thử (khi không dựng đầy đủ)
`claude_tools/v21_kiem/mk21.sh <ra.html>`: lấy `/home/claude/work/l17e.html` + thay khối gốc (`/home/claude/goc/<tệp>`, chép từ bản L17) bằng `src/<tệp>` (`pat21.py`, danh sách tệp trong đó) + vá chuỗi cho mô-đun bị build rep (`e21pairs.py`: l9b309, a10309, gear45) + `inject_evo21.py` (ảnh, SHIP118, evo21/led/sfx). Phiên mới KHÔNG có `/home/claude/goc` và `l17e.html` → dùng cách dựng đầy đủ (mục 5.1), hoặc lấy `l21j.html` làm gốc mới (khi đó "gốc" của mỗi mô-đun = nội dung `src/` hiện tại).
