# BÀN GIAO V2.1 · Phi Đội Sao Băng (23/11/2026 21:30)

Đọc tệp này TRƯỚC, sau đó `CLAUDE.md` (mục nhật ký cuối: V2.1 Đợt 1 → Đợt 3b + SFX).

## 1. Trạng thái một dòng
V2.1 (tiến hóa đồ họa 13 chiến cơ · 7 Chiến Thần · 13 tên lửa · 13 tàu con · 14 SSS · LED neon · âm thanh động) **đã làm xong trên bản thử** `l21j.html`, hồi quy đạt. **CHƯA xuất bản**: chủ dự án đã nói "duyệt xuất bản" (23/11 21:12) rồi **tạm giữ** (21:14) để làm âm thanh; âm thanh đã xong → bước kế là xin chủ dự án xác nhận lại rồi đóng gói APK (mục 5).

## 2. Mã nguồn ở đâu (QUAN TRỌNG)
- GitHub `Lemon1609/phi-doi-sao-bang` (PRIVATE) nhánh **`nguon-v212`** vẫn ở `9cf4d28` (Lượt 12). **Mọi việc L13 → V2.1 CHƯA được push** (phiên cũ không có quyền / lệnh push bị chặn khi chưa được chủ dự án yêu cầu).
- Nguồn mới nhất nằm trong gói bàn giao **`nguon_V21_day_du.zip`** (= thư mục `/home/claude/nguon` của phiên cũ). Đây là bản nguồn RÚT GỌN: có đủ mã + ảnh mới (evo21img, ship309, ui17img, th17img…) nhưng THIẾU ~3.600 ảnh cũ chỉ có trong repo → muốn dựng đầy đủ phải: clone `nguon-v212` → chép đè nội dung zip lên (chỉ thêm/sửa, KHÔNG xóa tệp của repo; cách an toàn: `GIT_INDEX_FILE=/tmp/idx git read-tree HEAD && git --work-tree=<thư mục giải nén> add --ignore-removal -- . ':!**/__pycache__/**'`) → commit. Kiểm trước: 741 tệp thêm, 194 tệp sửa, 0 xóa. Chỉ push khi chủ dự án đồng ý.
- Bản thử đã dựng (vá từ L17): `Phi_Doi_Sao_Bang_V21_thu.html` trong gói `Phi_Doi_Sao_Bang_V21_thu.zip` (= `/home/claude/work/l21j.html`, 86,7 MB thô / ~62,7 MB nén). Bản tắt V2.1 để so: chèn `<script>window.EVO21=false</script>` ngay sau `<head>`.

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

## 5. XUẤT BẢN APK (việc kế tiếp, CHỈ khi chủ dự án xác nhận lại "duyệt xuất bản")
Quy trình phát hành thật nằm ở nhánh **`build-apk-v198`** (KHÔNG phải main — main chỉ có README):
1. Dựng HTML đầy đủ từ `nguon-v212` ĐÃ gộp zip nguồn (mục 2): `BAN_THU=1 python3 build74_mau.py` (cần mọi ảnh trong repo; phải checkout đủ — clone đang là partial `--filter=blob:none`, chỉ mục làm việc cũ bị hỏng: index toàn "D", chỉ có `src/` → nên clone mới vào thư mục khác). **Chưa từng dựng V2.1 bằng build74 đầy đủ** — các bản thử đều vá từ `l17e.html`. Phải chạy t156 + t209 trên bản dựng mới; nếu lệch thì dùng `l21j.html` (đã kiểm) làm bản phát hành.
2. `python3 claude_tools/split.py <thư mục www> <html>` → tách khối > 100 KB thành `www/a/*.js|css` (khối > 14 MB tách nhiều tệp).
3. Trên nhánh `build-apk-v198`: thay `www/` bằng kết quả, sửa `VERSION` (đang `V306`; đề xuất `V2.1` hoặc `V310` — hỏi chủ dự án), commit + push → workflow `.github/workflows/apk.yml` tự build, ký bằng `signing/debug.keystore` (KHÔNG đổi phần ký), kiểm chữ ký có "Lemon1609", tạo Release `<VERSION>.<số lần chạy>`.
4. Theo dõi: `gh api repos/Lemon1609/phi-doi-sao-bang/actions/runs --jq '.workflow_runs[0]|.status,.conclusion,.html_url'`; lấy link + dung lượng: `gh api repos/Lemon1609/phi-doi-sao-bang/releases --jq '.[0]|.html_url,(.assets[0]|.name,.size,.browser_download_url)'`. Release gần nhất: V306.39 (APK 74,3 MB).
5. Gửi chủ dự án: HTML offline + APK (đã kiểm chữ ký) + ảnh chụp + báo cáo ngắn (CLAUDE.md).

## 6. Còn mở / chưa làm
- Chưa đo FPS / âm thanh trên điện thoại thật (chủ dự án tự thử).
- Dung lượng: 86,7 MB thô / ~62,7 MB nén (mục tiêu chủ dự án ~63 MB). Muốn < 80 MB thô phải động ảnh cũ (`GEAR44_ASSETS` 19,9 MB) — đã khóa từ Lượt 15, cần chủ dự án quyết.
- SSS độc tôn (Trảm Không Đế Vương …): `Gear44.equipSSS` trả true nhưng `activeId` vẫn món thường trên hồ sơ thử → chưa kiểm hình trong trận.
- Thần hóa #11–#13 dùng LED riêng TH17, chưa nối EVO21_LED.
- Ảnh Kho 384 của tên lửa/tàu con thường (`src/evo21img_kho/tl_*/wg_*_i*`) chưa dùng (Kho dùng ảnh 4 bậc trận).

## 7. Quy trình vá nhanh bản thử (khi không dựng đầy đủ)
`claude_tools/v21_kiem/mk21.sh <ra.html>`: lấy `/home/claude/work/l17e.html` + thay khối gốc (`/home/claude/goc/<tệp>`, chép từ bản L17) bằng `src/<tệp>` (`pat21.py`, danh sách tệp trong đó) + vá chuỗi cho mô-đun bị build rep (`e21pairs.py`: l9b309, a10309, gear45) + `inject_evo21.py` (ảnh, SHIP118, evo21/led/sfx). Phiên mới KHÔNG có `/home/claude/goc` và `l17e.html` → dùng cách dựng đầy đủ (mục 5.1), hoặc lấy `l21j.html` làm gốc mới (khi đó "gốc" của mỗi mô-đun = nội dung `src/` hiện tại).
