# BÀN GIAO DỰ ÁN "PHI ĐỘI SAO BĂNG" — dành cho Claude Opus 5.5 (phiên trên máy tính của người dùng)

Bạn tiếp nhận vai **lập trình viên chính + người duyệt kỹ thuật** của dự án từ một phiên Claude chạy trên cloud. Đọc hết tài liệu này trước khi làm gì.

## 1. Dự án và quy tắc bắt buộc
- Game bắn máy bay dọc (vertical shmup) HTML5, **một file HTML duy nhất, chạy offline**. Phong cách học theo "Chiến Cơ Huyền Thoại", nhưng **không được sao chép tranh, icon, tên hay chữ Trung của game gốc**. Chỉ học bố cục, cảm giác và cơ chế.
- **Mọi chữ trong game và mọi câu trả lời cho người dùng đều bằng tiếng Việt.** Prompt gửi GPT/Gemini thì viết bằng tiếng Anh, kèm vài dòng giải thích tiếng Việt.
- **Phải giữ tương thích file lưu (localStorage)**: không đổi cấu trúc key cũ. Dữ liệu mới thì lưu vào key mới.
- Người dùng phối hợp nhiều AI:
  - **GPT** vẽ tranh và làm "file giám định" (review HTML) để duyệt trước.
  - **Gemini** làm module giao diện và tranh ý tưởng.
  - **Claude** kiểm tra, chỉ ra lỗi bằng ảnh chụp, viết prompt chuyên sâu cho GPT, rồi **tích hợp vào game**.
- Cách làm việc người dùng ưa: kiểm tra thật (chạy trình duyệt, chụp màn hình) trước khi kết luận. Báo ngắn gọn bằng tiếng Việt, có ảnh minh họa lỗi, và luôn đề xuất bước tiếp theo.

## 2. Bộ tài liệu bàn giao (thư mục V44_kit)
| Đường dẫn | Nội dung |
|---|---|
| `Phi_Doi_Sao_Bang_V44.html` | **Bản game mới nhất** (18,35 MB), bản người dùng đang chơi |
| `base/Phi_Doi_Sao_Bang_V42.html` | Bản gốc để dựng V44, gồm V42 cùng toàn bộ hệ thống trước đó |
| `src/gear_fx_v3.js` | Bộ máy GEAR_FX của GPT (dữ liệu 36 mẫu + vẽ/cập nhật Canvas2D), lấy từ bản giám định V6 |
| `src/gear_assets.json` | 280 tranh trang bị đã nén WebP (data URI) → biến `GEAR44_ASSETS` |
| `src/gear44.js` | **Cầu nối Gear44**: đưa GEAR_FX vào trận + hợp thể/lắp trang bị SSS + Xưởng SSS |
| `src/g44.css` | CSS của Xưởng SSS (chỉ dùng bộ chọn `#g44`) và ô SSS |
| `src/ccht_lobby44.js` + `ccht_base.css` + `ccht_extra.css` | Sảnh SSS (module Gemini "Sanh_Nang_Cap_CCHT_V4" đã viết lại để nối dữ liệu thật) |
| `build44.py` | Dựng lại V44 từ `base/` + `src/`. Chạy `python build44.py` sẽ ra `Phi_Doi_Sao_Bang_V44_rebuilt.html`, giống hệt V44 từng byte |
| `tests/` | `harness.js`, `t44.js` (kiểm tra đầu-cuối trang bị SSS), `tbal.js` (so cân bằng). Cần `npm i playwright` và `npx playwright install chromium` |

Cách dựng file trong `build44.py`:
- Hàm `rep(old,new)` thay chuỗi và có `assert` bắt buộc chuỗi cũ phải xuất hiện đúng 1 lần.
- Các module được chèn trước `</body>`.

Khi sửa, giữ đúng nguyên tắc này: **không chỉnh tay file HTML đã dựng**. Hãy sửa `src/`, sửa `build44.py`, rồi dựng lại.

## 3. Lịch sử phiên bản (tóm tắt)
- **V40.7 → V40.9:**
  - Thêm Thức Tỉnh, lõi/sao SSS, Tháp mùa.
  - Đổi cơ chế hợp thể: **bỏ robot**, 2 chiến cơ thành phần ghép thẳng thành 1 **chiến cơ SSS**, có 7 SSS (`SSS_MODELS`, `FusionBlueprints`, khóa `sss:N`).
  - Cường hóa SSS = 2×min(cường hóa 2 chiến cơ thành phần).
  - Có Lễ Hợp Thể (`SSSRite`).
- **V41/V42:** Kho chiến cơ kiểu kim loại (`Hangar41` trong hangar42.js, phần tử `#hgr41`). Sân khấu chạy **chính bộ máy trận đấu** khi có `window.HANGAR_DEMO=true`: bắn thường → kỹ năng → Bạo Tẩu/MAX.
- **V43 (2026-10-20):** Gắn Sảnh SSS của Gemini (`#ccht-lobby-root`, `window.CCHT_LOBBY_API`).
  - Mở bằng nút **SẢNH SSS** trong Kho chiến cơ.
  - Nút **XUẤT KÍCH** (trước đây ghi "TRỞ VỀ") phát sự kiện `ccht:lobby-close`: ẩn sảnh, chọn bộ đang xem rồi bấm `#lb-go` để vào trận.
  - Nút ✕ chỉ đóng sảnh.
  - `SSS_SETS` (getter trên window) dựng từ dữ liệu thật: chiến cơ SSS sở hữu + chiến cơ thường + 3 trang bị đang lắp.
  - Đã bỏ nút "+" cộng tài nguyên miễn phí.
- **V44 (2026-10-20): Hệ trang bị SSS**, xem mục 4.
- **V45 (2026-10-20, Claude): sửa lỗi**, dựng bằng `build45.py` (= build44 + 4 sửa đổi, dùng `src/gear45.js` thay `src/gear44.js`; `build44.py` vẫn dựng ra V44 y hệt):
  - B-V44-01: Lực chiến (`Combat.stats`) nay nhân hệ số SSS của Tên lửa/Vũ khí phụ (`Gear44.dmgMult`). Ví dụ bộ test: 1.654 → 1.790 sau khi lắp 3 SSS. Lưu ý: `Combat.factor` chỉ tăng khi lực chiến < yêu cầu ải.
  - B-V44-02: Thanh Vũ khí/Tàu con của Kho chiến cơ (`statsRow`) nhân hệ số SSS, khớp với Sảnh SSS.
  - B-V44-03: Ô trang bị SSS ở Kho ghi cường hóa SSS thật (+2/+2/+4) thay vì +N của món gốc.
  - B-V44-04 (người dùng chốt: giống game gốc): Giáp SSS nay được ×1,35×(1+3%/cấp cường hóa SSS) phần máu + khiên của giáp. Bọc `Progress.stats` trong `src/gear45.js`, gắn cờ `gear.armorSSS`. Bộ test (SSS +2): máu tối đa trong trận 8 → 8,3; khiên tối đa 7,58 → 8,69; lực chiến 1.654 → 1.874 khi lắp đủ 3 SSS.
  - B-V44-05: Người chơi mới: bong bóng hướng dẫn `#tutorial392` nay ẩn khi hộp Điểm danh/Thành tựu (`#m40`), Sảnh SSS hoặc Xưởng SSS đang mở, và chờ 2,2 s đầu (lúc hộp điểm danh tự bật); bong bóng được căn giữa, rộng tối đa 420 px nên khớp khung game ở màn ngang. Mô-đun `src/onboard45.js` + `src/onboard45.css` (chỉ đọc DOM, không đụng save). Test: `tests/tonboard.py`.
  - DX-V45-01: Nút trong trận làm lại đồ họa bằng CSS thuần (`src/hudbtn45.css`, khối `<style id="hudbtn-v45">`), không đổi JS: TÊN LỬA/BOM là nút tròn 66 px viền kim loại + lõi bóng (xanh/cam) + icon SVG; hồi chiêu tên lửa hiện số giây giữa nút; số bom là huy hiệu đỏ; chữ "SPACE" chỉ hiện trên máy tính; nút tạm dừng/toàn màn hình là nút bọc kim loại 42×40 với icon SVG (đổi icon theo `aria-label`). Lưu ý: game ghi lại `innerHTML` của #missile-action mỗi khung → chỉ được tạo kiểu bằng CSS. SVG trong `url("data:...")` phải mã hóa dấu `"`. Test: `tests/thud.py`.
  - B-V45-07: Nút tạm dừng luôn vẽ ‖ kể cả khi đang tạm dừng → `src/hudbtn45.js` theo dõi chữ của #pause (Ⅱ/▶) và gắn `data-ic="pause|play"`; CSS vẽ icon tương ứng.
  - Kiểm tra: t44 (đầu-cuối, 0 lỗi Safety31), tcp.js (lực chiến/nhãn Kho–Sảnh), tbal45.js (V44 và V45 hạ cùng số địch 36/44), tfresh.py (người chơi mới, dọc/ngang, 0 lỗi).

- **V46 (2026-10-20, Claude, GPT hết lượt): giao diện**, dựng bằng `build46.py` (= build45 + 3 phần):
  - DX-V46-01 Sảnh SSS: skin V2 của GPT (`src/lobby_skin_v2.css`, nguyên văn) + `src/lobby46.css`. Lưu ý: ảnh viền `button_accent.png`/`tile_crystal.png` của GPT có lõi xám đục dù ghi chú là bán trong suốt → đã thay ảnh lõi bán trong suốt để `--cc-accent` lộ ra; ô menu bỏ gai, mỗi ô 1 màu ngọc (`--tile`); nút KHO/GHÉP rộng hơn.
  - DX-V46-02 `src/ccht_lobby46.js`: `--cc-accent` = `cur.primary` của chiến cơ đang xem; nhãn ô SSS "+N"; tia sáng sau chiến cơ giảm alpha (.55→.3, .7→.32, .6→.24).
  - DX-V46-03 Nút trận: CSS GPT V1 (`review_nut/btn_v1.css`) + 4 sửa trạng thái → `src/hudbtn46.css` (sẵn sàng sáng hơn hồi chiêu, hồi chiêu vệt tối + số giây, hết bom xám, icon tạm dừng 2 vạch, icon bom pha lê). `src/hudbtn45.js` (data-ic) vẫn dùng.
  - Test mới: `tests/tbtn.py` (trạng thái nút), `tests/tlobby46.js` (sảnh dữ liệu thật, màu nhấn, nhãn).

- **V47 (2026-10-20, Claude): cơ chế** theo người dùng chốt (độ khó MẠNH, qua ải MẤT HẾT, buff SIÊU CẤP chỉ từ tinh anh/boss), dựng bằng `build47.py` (= build46 + các `rep` V47 + `src/play47.js`):
  - DX-V47-01 `Waves30`: số biên đội ải = 4 (chương 1–2) / 5 (3–5) / 6 (6–8), phó bản 4 (trước 2/2). Quái mỗi biên đội = min(34, min(19, 14+(ải−1)/16) + 3×đợt), luôn tăng theo đợt. Ví dụ ải 1: 14/17/20/23 (74 quái, trước 30); ải 101: 19→34 (159, trước 44). Đo (đứng yên, bất tử): ải 3 dài 15 s → 32 s, sát thương phải chịu ×5.
  - DX-V47-02 Thanh máu boss: `#bossbar` ẩn bằng CSS (logic cũ vẫn chạy), `src/play47.js` vẽ thanh 124×7 trên đầu boss (×N ống máu, chấm cánh, tên 3 s đầu) qua `VisualFX.draw`; nhãn "LÕI ĐANG ĐƯỢC BẢO VỆ" chuyển xuống dưới khung (b.y+52).
  - DX-V47-03 `nextStage`: làm lại từ đầu — power=1, powerUpgrades=0, superTime=0, drone=0, bulletShieldTime=0, súng gốc, máu đầy, giáp đầu trận, bom=3, dọn drops, `Loot40.reset()`; toast "KHỞI ĐẦU LẠI · W1". (Thanh graze `charge` nằm trong closure, chưa reset.)
  - DX-V47-04 `Loot40`: vật phẩm `super` (SIÊU CẤP, vàng–tím). Rơi: hạ quái tinh anh 20% (không khi Bạo Tẩu, tối đa 1 trên màn), phá giáp boss, phá cánh boss. Nhặt = `activateSuper()` + tối thiểu 8 s.
  - Test mới: `tests/t47.py` (4 cơ chế + ảnh boss/vật phẩm), `tests/tdur.py` (đo thời lượng ải), `tests/seed_full.js`.

- **V48 (2026-10-20, Claude): cân đối phần thưởng**, dựng bằng `build48.py` (= build47 + `src/balance48.js`, khối `<script id="balance-v48">`):
  - Quà theo đợt: dọn sạch 1 biên đội (chưa phải cuối) → 1 món hỗ trợ đúng thứ thiếu (máu <75% → máu; giáp chưa đầy → giáp; W<5 → hỏa lực; bom<3 → bom).
  - Tiếp tế trước boss (máu nếu thiếu + 1 bom) và giữa trận boss (mỗi 25% máu boss mất → 1 món).
  - Vật liệu ải chiến dịch × round(số biên đội/2) (bọc `Workshop.rollStage`): ải 4 đợt ×2, 5–6 đợt ×3 → vật liệu/phút giữ như trước V47. Hợp kim/phút đã tự tương đương nhờ +3/quái (ải 41: ~455 → ~522/phút).
  - Van an toàn (key mới `saobang-assist-v48` {stage,fails}): thua cùng ải 2 lần → lần sau W2 +1 bom; 4 lần → W3 +2 bom; qua ải thì xóa.
  - Đo bằng bot né đạn `tests/bot.js` + `tests/tsurv.py` (né theo dự đoán đạn 0,4 s, nhặt quà, dùng bom khi nguy hiểm, bấm tên lửa; Combat.factor=1 = đủ lực chiến; `NATURAL=1` để dùng lực chiến thật; `ASSIST='{"stage":140,"fails":2}'` để thử van an toàn). 9 ải × 2 lượt: V47 qua 16/18 (chết 1, ải 60 và 121 suýt chết); V48 qua 17/18 (không chết, 1 lượt boss ải 60 quá 220 s còn 65% máu); máu còn TB 76% → 89%. Ải khó nhất: boss lớn ải 60 và 140.

- **V49 (2026-10-20, Claude): duyệt Sảnh SSS V3 của GPT** (`review_sanh3/`). V3 = V2 + `v3-polish.css`; ảnh `button_accent.png`/`tile_crystal.png` vẫn lõi xám đục, GPT né bằng lớp `:after` phủ màu. Gắn thử vào game: ô menu V3 xám bạc, ngọc màu rất mờ, chữ nhãn đè mép ô; nút phụ vẫn tối → **giữ bản ghép V2 + `lobby46.css` của Claude**, chỉ lấy 3 chi tiết tốt của V3 vào `src/lobby46.css`: viền trong theo `--cc-accent` (`#ccht-lobby-root:after`), gạch chân trong tấm tên, chấm đỏ nút top:-9px. Dựng bằng `build49.py`. Sảnh SSS coi như hoàn tất.
- **V50 (2026-10-21, Claude): duyệt nút trận GPT V2** (`review_nut2/`, `Nut_Tran_Tinh_The_V2.css`). Đạt hợp đồng (đủ id, `.cd07/--cd07/.rdy07/.empty07`, data-ic, reduced-motion, giữ khối "V46 · Claude"); thứ bậc sẵn sàng > hồi chiêu giữ đúng, hết bom xám rõ, icon TÊN LỬA/BOM/tạm dừng cùng họ pha lê, không sáng hơn đạn. Claude sửa 1 điểm: icon toàn màn hình mảnh và nhạt hơn nút tạm dừng → vẽ lại góc đậm có viền tối (thêm cuối `src/hudbtn50.css`). Dựng bằng `build50.py` (thẻ `<style id="hudbtn-v50">`). Nút trận coi như hoàn tất.
- **V51 (2026-10-21, Claude): buff rơi tự trôi về quanh chiến cơ + tranh SIÊU CẤP của GPT.**
  - `src/drift51.js` (Drift51.step): buff bật lên 0,45 s tại chỗ địch chết, rồi trôi (tối đa 420 px/s) tới 1 trong 6 chỗ đậu quanh chiến cơ, cách tâm 76–116 px, và bám theo chiến cơ hơi trễ. Mép màn thì chỗ đậu lật sang bên kia. Nam châm gốc 70 px nên chỉ cần nhích nhẹ là nhặt được; người có nâng cấp nam châm thì tự hút. Sao điểm giữ cách rơi cũ; mảnh chiến cơ (craft) cũng trôi về. Bỏ kiểu đứng lơ lửng ở H*.88.
  - `src/pickup51.js` (Pickup51) + `src/pickups/*.webp`: có tranh thì vẽ tranh 62 px (idle 4 ô, burst 8 ô lúc nhặt), chưa có tranh thì dùng capsule cũ. `build51.py` tự nạp mọi tệp theo khóa: super (sieu_cap), power, heal, shield, bomb, drone, magnet, star, weapon0..4. Hiện đã có SIÊU CẤP V1 của GPT (đã duyệt).
  - Prompt bộ tranh V2 cho GPT: `PROMPT_GPT_VAT_PHAM_V2.md` (đổi màu BOM sang đỏ hồng, NAM CHÂM sang chàm để khỏi lẫn với SIÊU CẤP; khi có tranh nhớ đổi SPEC.bomb/magnet trong Loot40 và gắn tranh sao điểm, vì sao vẽ ở nhánh riêng, chưa qua Pickup51).
  - Test: `tests/t51.py` (đường trôi, chia chỗ, không tự nhặt khi nam châm 0), `tests/t51b.py` (tranh SIÊU CẤP + burst).
- **V52 (2026-10-21, Claude): sửa lỗi + Tiến hóa hình ảnh.** Dựng bằng `build52.py`.
  - Graze: nextStage gọi `Combat26.reset()` → thanh Graze về 0 khi sang ải (trước đây dồn sang ải sau).
  - Buff đã đậu cạnh chiến cơ (`d.park51`) không vẽ cột sáng; có đạn địch trong 46 px thì buff mờ còn 40% (`d.fade51`, nhân vào mọi globalAlpha của buff trong Loot40.draw).
  - Tự giảm hiệu ứng khi FPS < 50 trong 2 s (BloomQuality có sẵn) trước đây bị TẮT trên máy DPR > 2, tức hầu hết điện thoại → đã bỏ điều kiện đó. Test CPU chậm ×20 ở DPR 3: high → light.
  - Nén ảnh: `tools/nen_anh.py` (chạy cuối build, cache ở `tools/.cache_nen`) nén lại webp khi giảm ≥ 10% và PSNR ≥ 40 dB. Kết quả chỉ 18,9 → 17,8 MB vì ảnh vốn đã nén tốt; base64 chiếm khoảng 33%. Muốn xuống ~10 MB thì phải giảm độ nét (PSNR 36 dB giảm được thêm 2 MB, vẫn không đủ) hoặc hạ độ phân giải các atlas lớn (fighters-v28 2500×2000, SSS_ATLAS 3584×1024, …) → chờ người dùng quyết.
  - Tiến hóa hình ảnh `src/rank52.js/.css` (Rank52): bậc 0–3 theo cường hóa (thường/chiến cơ: +1/+3/+5; SSS: +3/+6/+9). Chỉ đổi hình ảnh, không đổi sát thương. Gồm quầng đạn trang bị (Gear44.fxState → pool 'shot'), vệt sao, viền vàng xoay, quầng và vệt cho đạn chính, vòng hào quang giáp, ô Kho có `data-t52` (viền sáng / vệt quét / viền vàng), thông báo khi lên bậc (key 'saobang-rank-v52'). Trên điện thoại (chất lượng NHẸ) vệt sao thưa một nửa, tối đa 40 hạt.
  - `GEAR_FX` của trang bị thường luôn chạy với enhance 5 (chỉ cho hình ảnh; sát thương quy đổi về auxDamage ở refDPS) → không phải lỗi.
  - Prompt tranh cho GPT: `PROMPT_GPT_TIEN_HOA_V1.md` (quầng, sao, vòng giáp, khung ô Kho, huy hiệu bậc). Khi có tranh thì thay phần vẽ bằng code trong Rank52.
  - Test: `tests/t52.py` (4 bậc, ảnh shots/v52_t0..t3), `t52b.py` (Graze, buff đậu, tự giảm hiệu ứng), `t52c.py` (ô Kho).
- **V53 (2026-10-21, Claude): duyệt bộ ngọc vật phẩm V2 của GPT** (`review_vatpham2/`; 37 tệp, đo lại: kích thước đúng, 4 góc alpha 0, ô burst cuối trống, SIÊU CẤP giữ nguyên byte). Dựng bằng `build53.py`.
  - Tranh nằm ở `src/pickups/`, Pickup51 tự nạp. Sao điểm dùng tranh `star.webp` (vẽ source-over, không 'lighter').
  - SPEC.bomb đổi sang #ff5a8a/#b0123f, SPEC.magnet sang #7c8cff/#3a3fd0 (nhãn và vòng theo màu mới).
  - Buff có tranh mà đã đậu thì ẩn vòng quỹ đạo.
  - Nhãn ĐỔI SÚNG nay ghi tên súng (LIÊN THANH, …).
  - Chỗ đậu thứ 6 đổi (−100,−62) → (120,−95). Không đặt chỗ đậu dưới chiến cơ: buff bay xuyên qua chiến cơ sẽ bị nhặt ngoài ý muốn.
  - PHÁT HIỆN: vật phẩm ĐỔI SÚNG (type 'weapon') không còn rơi trong game. Loot40.weights không có, collect() không xử lý đổi súng (chỉ còn trong SPEC và code vẽ cũ). 5 tranh đổi súng hiện chưa dùng → chờ người dùng quyết có thêm lại cơ chế đổi súng hay không.
  - Test: `tests/t53.py`.
- **V54 (2026-10-21): người dùng chốt BỎ cơ chế đổi súng.** `build54.py` không nạp tranh weapon0..4 (cất ở `review_vatpham2/khong_dung/`), file nhẹ hơn khoảng 0,5 MB (18,35 MB). Mã vẽ ĐỔI SÚNG cũ còn trong Loot40 nhưng không bao giờ được gọi (không có nguồn rơi). Không giao thêm việc đổi súng cho GPT/Gemini.
- **V55 (2026-10-21, Claude): TIẾN HÓA NGOẠI HÌNH (người dùng chốt hướng).** Tiến hóa = chính chiến cơ và trang bị đổi ngoại hình, đạn đổi theo. Dựng bằng `build55.py`.
  - `src/evo53.js/.css` (Evo53) thay Rank52; `const Rank52=Evo53` giữ để test cũ chạy được.
  - 5 mức: 0 GỐC · 1 NGỌC LAM · 2 BẠCH KIM · 3 HOÀNG KIM · 4 CẦU VỒNG PHA LÊ. Thường/chiến cơ: +1/+3/+4/+5; SSS: +3/+6/+8/+10. Người dùng nói "bậc 3 max = cầu vồng 7 sắc, lấp lánh pha lê".
  - Thân chiến cơ: `Evo53.hull(id)` tô lại 2 ô (id, id+10) của fighterAtlasV22 trên 1 canvas cùng cỡ atlas (gắn naturalWidth/complete). Thay `hull:fighterAtlasV22` ở 4 chỗ: trận, SuperHangar, sảnh, khung xuất kích. Mức 4 tô lại 10 lần/s (6 lần/s ở chất lượng NHẸ).
  - Có tranh hình dáng của GPT (`src/evo/fighters_evo1.webp` cho +3/+4, `fighters_evo2.webp` cho +5) thì dùng làm gốc rồi mới tô màu. Ô trống dùng ô gốc (cellHas). Đã thử bằng atlas giả.
  - Trang bị: gear45 `GEAR_FX.create(...assets:Evo53.gearAssets(k,assets))` → Proxy tô lại mọi tranh (bệ, đạn, nổ, giáp) theo mức của món đó, có cache.
  - Đạn chính: ShotV2.sprites được hoán đổi tạm sang bản đã tô khi vẽ (bọc Arsenal30.draw + PlayerFXB.laser). Từ mức 3 có tia sét (hình ảnh, không gây sát thương).
  - Ô Kho: data-t52 0–4 (viền + CSS filter cho tranh trong ô; mức 4 viền chuyển 7 sắc).
  - Hiệu năng (đồ họa phần mềm headless, không phải số thật trên máy): mức 4 chậm hơn mức 0 khoảng 15%. Cơ chế tự giảm hiệu ứng vẫn hoạt động.
  - HỦY bộ "Tiến Hóa Hình Ảnh" V1 của GPT (quầng/khung, `review_tienhoa/`) và prompt sửa V2 của nó.
  - Prompt mới: `PROMPT_GPT_HINH_DANG_TIEN_HOA_V1.md` (2 atlas cùng bố cục fighters-v28, giao từng đợt).
  - Test: `tests/t55.py` (5 mức), `t55c.py` (Kho), `t55perf.py`.
- **V56 (2026-10-21): hình dáng tiến hóa V2 của GPT, đợt thử (ô 0, ô 2) → DUYỆT, cho làm tiếp.** Dựng bằng `build56.py`.
  - V1 bị loại: đa giác phẳng dán đè, thân mờ do GPT dùng atlas 2048 (khung chat thu nhỏ ảnh > 2048 px).
  - Từ nay gửi/nhận ảnh lớn qua ZIP: `Atlas_goc_chien_co_2500x2000.zip` có atlas và 20 ô PNG 500×400.
  - Đóng gói: `tools/dong_goi_evo.py <thư mục o_XX_evo1/2.png>` → `src/evo/fighters_evo1/2.webp`, tự thu khung bao về ≤ +15% rộng / +12% cao so với ô gốc (đợt thử lớn hơn khoảng 25%, có ô chạm mép).
  - Tranh gốc của đợt thử: `review_hinhdang2/cells/`. Test: `tests/t56.py`.
- **V57 (2026-10-21): Đợt 2 hình dáng (ô 1, 3–9) → DUYỆT.** Dựng bằng `build57.py`.
  - LỖI CỦA CLAUDE đã sửa: ô atlas fighters-v28 là 500×500 (naturalHeight/4), KHÔNG phải 500×400. Zip cũ và prompt cũ ghi sai, nên ô 5–9 GPT vẽ từ ảnh cắt lệch (phần đuôi GPT tự vẽ thêm, nhìn vẫn hợp).
  - `tools/dong_goi_evo.py` viết lại: căn theo tâm khung bao chiến cơ gốc, co để rộng 1,00–1,15× / cao ≤ 1,12× gốc, nhận ảnh 500×400 hoặc 500×500. Tất cả ô của GPT: `review_hinhdang3/cells/`.
  - Zip đính chính cho Đợt 3: `Atlas_goc_chien_co_O500x500.zip` (ô 500×500 cắt đúng).
  - Ghi chú: ô 8 ở cả 2 chặng tiến hóa mất chiếc tàu con nhỏ bên phải của bản gốc.
  - Test: `tests/t57.py` (bảng 10 chiến cơ × +0/+3/+4/+5, vẽ bằng chính Evo53.hull).
- **V58 (2026-10-21): Đợt 3 hình dáng (Bạo Tẩu ô 10–19) → DUYỆT. ĐỦ 40 hình** (10 chiến cơ × thường/Bạo Tẩu × Tiến hóa I/II).
  - Dựng bằng `build58.py`. Mọi ô GPT nằm ở `review_hinhdang4/cells/`; đóng gói: `python3 tools/dong_goi_evo.py review_hinhdang4/cells`.
  - File game 22,65 MB (+4,3 MB do 2 atlas tiến hóa). Test: `tests/t58.py` (bảng Bạo Tẩu), `t58b.py` (trong trận, Bạo Tẩu ở +4/+5).
- **V59 (2026-10-21): chuẩn bị hình dáng tiến hóa TRANG BỊ.** `build59.py` nạp `src/evo/gear/<khóa tranh>_evo1|2.png|webp` → EVO53_ART['g:…'].
  - Evo53.gearAssets: chặng I từ +3 (SSS +6), chặng II ở +5 (SSS +10); có tranh thì dùng thay tranh gốc rồi mới tô màu. Tranh 2× vẫn chạy vì GEAR_FX vẽ theo kích thước đích. Đã thử bằng tranh giả (inferno_pod_normal_evo2).
  - Gửi GPT `Trang_bi_goc.zip` (12 pod_normal, 12 pod_super, 6 shell_idle + ảnh tổng quan + ảnh cỡ thật trong trận).
  - Đợt thử: inferno, rail, aegis.
- **V60 (2026-10-21): người dùng muốn làm hình dáng tiến hóa cho TOÀN BỘ trang bị (cả SSS và icon Kho).** Dựng bằng `build60.py`.
  - Evo53.slotEvo: ô Kho của chiến cơ vẽ thẳng ô thân đã tiến hóa và tô màu (khớp với trong trận, đã chạy).
  - Ô trang bị phủ icon 'g:<id>_icon_evo1|2' khi có tranh (id gốc như 'inferno', SSS như 'sss_aegis_mirror'). CSS `.pic.evo59on`.
  - Gói tham chiếu cho GPT: `Trang_bi_goc_TOAN_BO.zip` (1_thuong, 2_SSS, 3_icon_Kho, DANH_SACH_GIAO.tsv: 102 món × 2 chặng = 204 hình; thử + 7 đợt).
  - Ghép tranh: đặt các tệp `<khóa>_evo1|2.png` vào `src/evo/gear/` rồi dựng lại. Icon SSS gốc cắt từ atlas_<kind> hàng 0, ô = ring.
- **V61 (2026-10-21): đợt thử trang bị (inferno, rail, aegis; 10 hình) → DUYỆT có góp ý.** Dựng bằng `build61.py`; tranh ở `src/evo/gear/` (gốc của GPT: `review_tb1/`).
  - Góp ý: ở cỡ trong trận (40–60 px), Tiến hóa I và II của bệ gần như giống nhau → II phải đổi khung bao/dáng. Bệ inferno thon hơn gốc → bề ngang không được nhỏ hơn gốc.
  - Vòm giáp đạt (tâm trống, vương miện ở II). Test: `tests/t61.py`.
- **V62 (2026-10-21): LỖI CỦA CLAUDE về tỉ lệ bệ tên lửa.** Bệ tên lửa (thường và SSS) gốc là 80×112, game vẽ vào khung 40×56. DANH_SACH_GIAO cũ ghi 128×128/256×256 (vuông) → tranh vuông bị game ép ngang ×0,71, đó là lý do bệ trông "mỏng".
  - Evo53.gearAssets nay tự đặt tranh tiến hóa khác tỉ lệ vào khung đúng tỉ lệ gốc (giữ tỉ lệ, không ép méo).
  - Bộ "Tên lửa sửa lại V2" của GPT vẽ khối VUÔNG → giữ đúng tỉ lệ thì lùn, bè, khác dáng thuôn của gốc. Chưa dùng (cất ở `review_tb3/tam_cat/`).
  - Bệ inferno của đợt thử cũng gỡ khỏi game (bị ép mỏng); `src/evo/gear/` hiện còn rail và aegis.
  - `DANH_SACH_GIAO.tsv` làm lại: kích thước giao = 2× gốc, đúng tỉ lệ gốc. Gửi GPT `Trang_bi_goc_TOAN_BO_v2.zip`.
- **V63 (2026-10-21): lối chơi (người dùng chọn mục 1, 4, 5, 6).** Dựng bằng `build63.py`. Test: `tests/t63.py`.
  - (1) Tiến hóa có tác dụng thật (evo53 `perks`): HOÀNG KIM (+4) mỗi 0,5 s một tia sét đánh địch, sát thương = 4% sát thương thật (súng chính + trang bị) đo qua Report392 trong 0,5 s đó; CẦU VỒNG (+5) 5% + lá chắn pha lê chặn 1 viên đạn, hồi 12 s (bọc `damage()`). Đo thực tế: 3,8% / 4,9% tổng sát thương. `Evo53.perk()`.
  - (4) Gợi ý Graze: lần đầu lách đạn → dải thông báo; thanh Graze ≥ 50% lần đầu → nhắc. Key 'saobang-hint-v63'.
  - (5) Sao theo mục tiêu (Play63, ghi đè Report392.starScore): ★ qua ải · ★ không mất máu (giáp đỡ vẫn được) · ★ mục tiêu riêng: ải boss hạ boss ≤ 60 s (mini) / 100 s (major); ải thường lẻ: không dùng bom; ải thường chẵn: lách sát đạn ≥ 8. Đầu ải hiện dải mục tiêu, cuối ải có toast + dòng trong tổng kết. Đủ 3★ vẫn mở Càn quét như cũ.
  - (6a) Sao lưu: game ĐÃ CÓ sẵn DeviceSave (mã SB36 + file JSON) nhưng bảng cũ bị ẩn và THIẾU các key mới → bản sao lưu không giữ trang bị SSS. Đã thêm EXTRA63 (gear-sss, evo, assist, daily, meta-v40, hint) vào payload / validate / restore. Thêm nút "SAO LƯU" ở cột bên Kho (bảng m63, dùng lại DeviceSave).
  - (6b) Thử thách ngày (Play63.Daily, key 'saobang-daily-v63'): theo ngày chọn ải (≤ ải xa nhất đã qua, lùi 0–5) và 1 trong 5 luật (đạn nhanh ×1,35 / 1 máu / không bom / quái máu ×1,6 / đạn ×1,2 + quái ×1,25). Thưởng 150 + 12×ải hợp kim + vật liệu ×2, chuỗi ngày +10%/ngày (tối đa +40%). Nút "THỬ THÁCH NGÀY" có chấm đỏ khi chưa làm.
  - Chưa chạy bot đo độ khó cho mục (1); ước tính các ải dễ đi khoảng 4–5% về thời gian hạ địch.
- **V64 (2026-10-21): áp bộ số liệu Gemini đã chốt.** Dựng bằng `build64.py`. Test: `tests/t64.py`.
  - Tia sét: Hoàng kim 6%, Cầu vồng 8% + lan sang 1 địch (≤ 200 px); sàn mỗi tia = 30% sát thương 1 viên đạn chính ("ATK cơ bản" quy đổi). Lá chắn hồi 15 s. ĐO THỰC TẾ: +4 ≈ 7,3–7,7%, +5 ≈ 16,9% tổng sát thương (mạnh hơn hẳn bản V63; theo thiết kế Gemini).
  - Nội tại trang bị MAX (mức tiến hóa 4): Tên lửa ×1,2 sát thương (quy đổi "+1 tên lửa/loạt", qua dmgMult của gear45), Tàu con ×1,15 khi Bạo Tẩu, Giáp vỡ giáp → xóa đạn 120 px (1 lần/ải). Không thêm đạn hình ảnh.
  - Sao: ★2 = không mất máu VÀ giáp không tụt dưới 50% giáp đầu ải. ★3 theo chương ch=ceil(ải/20): boss mini 45+4ch s, major 75+6ch s. Ải thường xoay idx=(ải−floor(ải/5))%4: bom / lách đạn 6+2ch / hạ hết tinh anh / Bạo Tẩu ≥ 2. Lượt có hỗ trợ tối đa 2★.
  - Van hỗ trợ: chỉ đếm lần thua khi trụ ≥ 20 s (stageTime) hoặc qua đợt 1; không áp cho Thử thách ngày.
  - Thử thách ngày: 10 luật (5 cũ chỉnh hệ số + Bão Từ Trường, Quá Tải Nhiệt, Tử Chiến Tầm Gần, Đội Hình Cảm Tử, Khan Hiếm Tiếp Tế). Thưởng 200 + 18·ải + 50·ch. Không tính sao, không hỗ trợ. "Bão Từ Trường" chỉ tắt nam châm (rơi nhanh ×1,4 không còn ý nghĩa vì buff đã tự bay về chiến cơ).
  - LỖI CŨ ĐÃ SỬA: stopDemo của Kho chạy SAU khi trận bắt đầu và đặt lại power=1 → khởi đầu W2/W3 của Van hỗ trợ bị mất từ V48. Nay chỉ đặt lại khi không ở trong trận.
- **V65 (2026-10-21): bệ tên lửa dáng dọc V3 của GPT (24 hình, 160×224) → DUYỆT, đã ghép.** Dựng bằng `build65.py`; tranh PNG đổi sang WebP khi dựng. File 23,44 MB. Tranh: `review_tb4/`.

- **V66 (2026-10-21): Trạm Tiếp Tế Chiến Thuật + phá cánh boss có hệ quả + mở khóa dần + màn chờ tải + nhắc sao lưu.** Dựng bằng `build66.py`, module `src/v66.js/.css`, `src/boot66.html`, kiểm tra bằng `tests/t66.py`.
  - Gate66 (thiết kế B1 của Gemini):
    - Mỗi ải campaign (từ ải 3, không tính phó bản) có 2 lần thả cổng: sau đợt 2 và trước boss (ải không boss: trước đợt cuối).
    - Cổng trái và phải trôi xuống 170 px/s. Chạm trong 52 px thì nhận lõi; cổng trái được xét trước.
    - Khi có cổng, đợt quái và boss được giữ lại bằng `endlessRest`. Lõi bị xóa khi qua ải hoặc reset.
    - 8 lõi:
      - TỤ HỎA: đạn chính ×1,25, độ tỏa ×0,6.
      - ĐẠN NẢY: 35% nảy 60% sát thương trong 180 px.
      - HẤP HUYẾT: Graze nạp gấp đôi, hồi 4% giáp (đầy thì 2% máu), hồi chiêu 0,8 s.
      - TÊN LỬA ĐÔI: chu kỳ ×0,75, +2 quả. Chỉ xuất hiện khi có lắp tên lửa.
      - ĐẠN BĂNG: dùng `frozen` sẵn có 1,2 s; boss 1,5 s mỗi 4 s; đạn từ quái bị băng ×0,8.
      - CUỒNG NỘ: Bạo Tẩu +3,5 s, tốc bắn ×1,25 khi Bạo Tẩu.
      - GIÁP PHẢN XẠ: hồi 50% giáp; khi trúng đòn thì xóa đạn trong 160 px và gây 5× sát thương đạn chính trung bình, hồi chiêu 6 s.
      - LÕI KHO BÁU (đổi tên từ "Lõi Hoàng Kim" để khỏi trùng bậc tiến hóa): +60% hợp kim khi hạ quái, đạn địch ×1,12.
    - Móc vào game bằng cách gán lại các hàm toàn cục: `shot`, `shootWeapon`, `Arsenal30.hit`, `Combat26.graze`, `activateSuper`, `damage`, `kill`, `update`, `reset`, `nextStage`.
    - Thêm 3 chỗ `rep` trong mã gốc: chu kỳ tên lửa, số quả tên lửa, tốc bắn trong `shoot()`.
  - B2 (phá cánh boss):
    - Cánh vỡ thì boss choáng 3 s: không bắn, không laser, không kỹ năng. Có chữ "CHOÁNG" trên đầu boss.
    - Bom, tia sét tiến hóa (`'evo'`) và xung lõi chỉ gây 50% sát thương lên cánh.
    - Đã có từ trước: cánh vỡ thì mất kiểu bắn của cánh đó và rơi đồ.
  - Onboard66 + `UNLOCK66` (số Gemini chốt ngày 21/10):
    - Mốc mở: Điểm danh 3, Kho báu 5, Phó bản Vàng 8 (lối vào phó bản), Thử thách ngày 10, Phó bản Vật liệu 15, Tháp Boss 20, Vô tận 25, Phó bản Trang bị 30, Ngọc & Ghép + phó bản Ngọc 35, SSS + Hợp thể + Sảnh SSS 40.
    - Mở sớm khi kẹt boss:
      - Vật liệu: đã vượt ≥ 12 ải, thua ≥ 2 lần ở ải 15.
      - Ngọc: đã vượt ≥ 20 ải, thua ≥ 3 lần ở cùng 1 ải chia hết cho 5.
      - SSS: đã vượt ≥ 35 ải, thua ≥ 4 lần ở ải 40.
      - Chỉ tính lần thua khi boss đã xuất hiện và trận dài ≥ 20 s (bọc hàm `end`).
    - Quà khi mở (mỗi tính năng 1 lần): Phó bản Vàng +300 hợp kim; Ngọc +50 đá và 30 mảnh ngọc.
    - Dòng "▶ Vượt ải n: mở …" trong Kho chiến cơ báo mốc mở kế tiếp.
    - Chặn cả ở nút lẫn ở hàm mở: `Meta40.towerPanel`, `Hub40.openSeg('dungeon')`, `UI392.showTab('gems')`, `Gear44.open/fuse`, `Play63.Daily.open`, `Dungeons.choose/begin` theo loại.
    - Tính năng đã mở thì không khóa lại. Đã có SSS thì mở SSS luôn.
    - Phí hợp thể trang bị SSS `FEE66` = 8.000 hợp kim + 400 đá, vá vào gear45 lúc dựng; thêm `Workshop.spendExp/expBalance`.
      - Lý do: Claude KHÔNG theo đề nghị của Gemini tăng giá cấp, giá đá và mảnh +1 cho toàn game, vì sẽ đổi cân bằng của cả 160 ải lẫn chiến cơ.
    - Nhiệm vụ ngày chỉ có diệt quái, qua ải và hạ boss, nên không bị mất thưởng khi tính năng còn khóa.
  - Nhắc sao lưu: sau khi hạ boss lớn, nút SAO LƯU có chấm đỏ; mở bảng sao lưu thì chấm tắt.
  - Màn chờ tải `#boot66` ngay sau `<body>`, gỡ khi `load` (tối đa 45 s).
  - Đã kiểm tra lại: kéo tương đối (ngón tay không che chiến cơ), `touch-action:none`, `overscroll-behavior:none`, tự tạm dừng khi ẩn tab (đã có sẵn).
  - File 23,46 MB.

- **V66.1 (2026-10-21, cùng `build66.py`, xuất ra tệp `Phi_Doi_Sao_Bang_V66_1.html`):**
  - **Trạm Tiếp Tế: TẮT** theo ý người dùng ("chọn buff giữa ải là không cần thiết"). Code giữ lại, `Gate66` có `ENABLED=false`. Phần phá cánh boss (choáng 3 s) vẫn giữ.
  - **Mật độ đạn quái theo ải:**
    - `BULLET66` và `Bullet66` trong `src/v66.js` (số tạm, chờ Gemini chốt qua `PROMPT_GEMINI_DAN_C4_V66.md`). Quy định số viên mỗi loạt, quạt, nhịp nghỉ, tốc độ, trần đạn và máu quái theo ải.
    - Thêm 5 chỗ `rep` vào `Threat30.gun`, `prepare` và `velocity`.
    - Đo ở ải 1: trung bình 56 → 10 đạn, tối đa 162 → 28.
  - **Buff nảy khắp màn** (`src/drift51.js`, hàm `step` viết lại):
    - Không hút về chiến cơ nữa. Bay 125 px/s, nảy ở mép trái, phải, trên và dưới. Vùng nảy chừa 78 px trên và 150 px dưới.
    - Buff sống 12 s. Mảnh chiến cơ nảy 14 s rồi rơi khỏi đáy màn.
    - Nam châm 70 px và buff NAM CHÂM vẫn hút như cũ.
  - **CÀI ĐẶT** (`Gfx66`, nút ở cột phải Kho chiến cơ; trong bảng tạm dừng có nút "HÌNH ẢNH"):
    - TỰ ĐỘNG (mặc định, kể cả người cũ, vì bản cũ tự đặt NHẸ cho mọi điện thoại), ĐẸP (không tự hạ), NHẸ.
    - NHẸ: canvas DPR 1,25 (thay vì 2), tắt bloom.
    - ĐẸP: bloom bật cả trên máy DPR 3; bỏ điều kiện `devicePixelRatio>2` ở `BloomQualityC.draw`.
    - Bảng có thêm nút Âm thanh, Nhạc, Rung.
    - Lưu ở key `saobang-gfx-v66`.
  - **Gợi ý kẹt boss** khi thua: "Thua thêm n lần ở ải này sẽ mở sớm …".
  - Thử thách ngày không có cổng.
  - **GPT:** gói `GPT_HOAN_THIEN_V66.zip` cho khung chat mới:
    - 87 món tiến hóa còn lại, Đợt 2–7.
    - Đợt 8: tranh Chương 9 và Nguyệt Thực.
    - Có tranh gốc, mẫu đã duyệt và danh sách tên tệp.

- **V66.2 (2026-10-21): MÃ QUẢN TRỊ** (`Admin66` trong `src/v66.js`, test `tests/t662.py`).
  - Cách nhập: Kho chiến cơ → CÀI ĐẶT → MÃ QUẢN TRỊ, mã `SAOBANG-ADMIN-2026` (không phân biệt hoa thường). Code chỉ giữ giá trị băm FNV-1a `0xa5b325f7`.
  - Bấm KÍCH HOẠT 2 lần (lần đầu là cảnh báo ghi đè). Game ghi trực tiếp các key `campaign`, `hangar` (id phải theo `/^[a-z0-9-]+$/`), `workshop`, `gear-sss`, `meta-v407`, `unlock`, rồi tải lại trang. Trong lúc tải lại, mọi lệnh `setItem` khác bị chặn.
  - Sau khi tải lại (giai đoạn 2): hợp thể đủ 7 siêu chiến cơ (`Fusion.mergeSSS`) và nhận 3.600 mảnh ngọc cấp S.
  - Kết quả kiểm tra: 160 ải 3★, 10 chiến cơ SS +5 Lv.120, 27 trang bị SS +5 Lv.120, 18 SSS +10, lực chiến 36.008.
  - Tài nguyên vô hạn: cứ 2 giây, nếu hợp kim, đá hoặc lõi xuống dưới 50 triệu thì nạp lại 99.999.999. Có nhãn ADMIN ở Kho.
  - Nhập mã lần nữa thì TẮT nạp vô hạn.

- **V66.3 (2026-10-21):**
  - **Đợt 2 tàu con tiến hóa của GPT → DUYỆT.** 20 hình (disc, gravity, prism, ricochet, solar × normal/super × evo1/evo2), lưu ở `review_tb5/`, đã chép vào `src/evo/gear/`.
    - Số Claude tự đo: diện tích phủ 92–109% (ricochet thường 92–94%, hơi nhỏ nhưng chấp nhận), lệch tâm ≤ 0,8%, góc alpha 0.
  - **Bỏ hình siêu chiến cơ CŨ** (`fusions-v27`):
    - Khung "Thử hỏa lực / trực tiếp" (`Hangar28`) và hình dự phòng trong trận (`robotSprite`) nay vẽ từ `SSS_ATLAS` mới, qua hàm `sssCell66(r,max)` (dạng thường ở hàng 0, Bạo Tẩu/MAX ở hàng 1).
    - Ảnh nền DOM cũ dưới `#ship-preview` đã tắt bằng CSS.
  - File 23,95 MB.

- **V66.4 (2026-10-21):**
  - **Đợt 3 vòm giáp tiến hóa của GPT → DUYỆT.** 10 hình, lưu ở `review_tb6/`, đã chép vào `src/evo/gear`.
    - Orbital phủ 221–229% so với gốc, vì gốc chỉ là một vòng sáng mảnh còn bản tiến hóa thành vòm giáp. Claude chấp nhận.
  - **Chống lóa** (`Glow66` + `GLOW66` trong `src/v66.js`):
    - Bọc thuộc tính `globalAlpha` và `globalCompositeOperation` của `ctx`, có ngăn xếp cho `save/restore`.
    - Chỉ áp trong lúc vẽ các lớp của người chơi: `Fighters28.draw`, `Equipment25.drawShot`, `VisualFX.drawShot`, `PlayerFXB.tail/laser`, `GEAR_FX.draw`, `SSSGame.draw`, `SuperGame.drawShip`, `VisualFX.drawSuperAura`, `Rank36.draw`.
    - Hệ số: lớp cộng sáng ×0,62 (Bạo Tẩu ×0,48), đạn ×0,82 (Bạo Tẩu ×0,7). Tia MAX của siêu chiến cơ ×0,62.
    - Đo ở bộ max, ải 160, đang Bạo Tẩu: điểm ảnh gần trắng 12,8% → 5,0%, độ sáng trung bình 0,34 → 0,28.
  - **Cân đối cuối game** (`Endgame66` + `ENDGAME66`):
    - Lực chiến đề nghị: ải 1–60 giữ nguyên, sau đó tăng theo cấp số nhân tới 14.000 ở ải 160 (trước là 3.008).
    - Vượt đề nghị tới 1,5 lần thì không đổi; vượt hơn thì sát thương ×(tỉ lệ/1,5)^−0,6. Chỉ áp ở chiến dịch.
    - Máu quái và boss từ ải 61 ×(đề nghị mới / đề nghị ải 60), ải 160 ×7,7.
    - Sát thương địch từ ải 61 tăng tới ×3,5 ở ải 160.
    - Đo bằng bot né đạn rất giỏi:
      - Bộ max ở ải 160: trước 49 s, boss 13 s; sau 103 s, boss khoảng 50 s.
      - Hồ sơ yếu (`seed_all`) ở ải 80 suýt thua; ở ải 120 thua sau 37 s. Đây là bức tường lực chiến cuối game có chủ đích.

- **V66.5 (2026-10-21): Đợt 4 icon Kho tiến hóa của GPT → DUYỆT.**
  - Gồm 36 hình (18 món × evo1/evo2), diện tích phủ 97–109%, lưu ở `review_tb7/`, đã chép vào `src/evo/gear` với tên `<id>_icon_evo1|2`. Ô Kho tự dùng qua `Evo53.slotEvo`.
  - CSS: icon tiến hóa ở ô Kho thu còn 74% và nhích lên để nhãn +N không đè.
  - File 25,75 MB. Có thêm prompt `PROMPT_GEMINI_PHI_CONG_SKIN_V67.md` và `PROMPT_GPT_PHI_CONG_SKIN_V67.md` cho V67 (phi công + cửa hàng skin/Chợ Đen).

- **V66.6 (2026-10-21):**
  - **Bảng đạn quái CHỐT của Gemini** (`BULLET66`, mốc ải 1…180), câu trả lời lưu ở `GEMINI_TRA_LOI_DAN_C4.md`. Gồm:
    - viên/loạt, quạt (cách nhau 14°), nghỉ, giãn cách trong loạt;
    - tốc độ kẹp 260–480 px/s, gần tàu ≥ 200 px/s;
    - trần đạn, máu quái thường/tinh anh, sát thương mỗi viên, nhịp chiêu boss;
    - Graze nạp bù ×min(2, 120/trần).
  - Máu và sát thương của bảng giữ ở mức ải 60 cho ải 61–160; phần tăng tiếp do `Endgame66` lo, `dmg160` hạ còn 2,6 → tổng ×3,5 ở ải 160.
  - Thêm 2 cơ chế của Gemini:
    - Quái thường sống quá 9 s: viền cam 0,8 s rồi lao xuống 340 px/s.
    - Tinh anh có khiên trước từ ải 21: giảm 35% sát thương khi chiến cơ lệch ngang > 90 px.
  - Học từ clip game tham khảo:
    - Đạn địch tông nóng (`Warm66` đổi màu lạnh → đỏ/cam/vàng/hồng), lõi vẽ thường kèm viền tối.
    - Chí mạng 10% ×2 (`Crit66`, trung bình giữ nguyên), chữ "X2" bật lên.
    - Thanh máu boss luôn ghi "LV.n · tên".
  - Đo đạn: ải 10/20 đứng yên trúng 41/43 → 24/21 lần/phút.
  - **Đợt 8 Chương 9 của GPT → DUYỆT.** Thân boss, dạng cuồng nộ, 2 cánh, nền 960×2080 nối liền, huy hiệu Nguyệt Thực. Tranh ở `src/ch9/`, tọa độ lắp ghép ở `Lap_Ghep_Dot_8.json`. Chưa lập trình (để V67).

- **V67 (2026-10-21): C4 · Chương 9 "Tinh Vân Đen" + Nguyệt Thực + Bụi Tinh Vân.** Dựng bằng `build67.py`, module `src/v67.js/.css`, tranh `src/ch9/` (đổi sang WebP lúc dựng), test `tests/t67.py`. File 26,77 MB.
  - **Mở rộng 160 → 180 ải:**
    - 7 chỗ `rep`: `missionFor`, `canStart` (ải > 160 chỉ khi `Ch9.open()`), lọc `cleared`, kiểm tra của DeviceSave, sao, `nextStage`, nền Parallax.
    - Thêm `CHAPTERS36[8]` và 20 mục `MISSIONS`.
    - `Campaign36.chapter(n > 160) = 8`; `Campaign36.render` coi ải > 160 là 160.
  - **Mở Chương 9:** vượt ải 160 VÀ (có SSS hoặc siêu chiến cơ, HOẶC lực chiến ≥ 12.000).
  - **Lực chiến đề nghị:** nối tiếp `Endgame66`, ải 170 ≈ 17.180, ải 180 ≈ 21.000.
  - **Môi trường Chương 9:**
    - Xoáy hố đen mỗi 14 s, hút 55 px/s. Bắn vỡ thì xóa đạn trong 140 px và rơi Siêu Cấp; chạm vào thì không có thưởng.
    - Mưa phản vật chất mỗi 9 s, cảnh báo 1,2 s, rơi 420 px/s.
  - **Boss ải 180:**
    - Máu ×2,1 so với boss ải 180 thường. Tranh GPT vẽ ở tỉ lệ 0,4, cánh cách tâm ±143 px.
    - Dưới 65% máu: laser dọc mỗi 7 s, cảnh báo 0,9 s, rộng 64 px.
    - Dưới 30% máu: dạng cuồng nộ, tự hủy cánh mà không choáng (`noStun67`), cầu phân hạch mỗi 3,2 s (mỗi quả tách 8 viên), rơi Siêu Cấp ở mốc 20% và 10% máu.
  - **Thưởng thêm Chương 9** (`CH9.first/again`): hợp kim, đá, bụi. Lần đầu qua ải 180 nhận danh hiệu "Chúa Tể Tinh Vân".
  - **Nguyệt Thực** (`Eclipse67`, key `saobang-eclipse-v67`):
    - Mở khi vượt ải 60 và có ít nhất 1 món +3. Mỗi chương mở khi vượt đủ 20 ải thường và đạt ≥ 45★.
    - Hệ số: lực chiến đề nghị ×1,6; máu quái ×2,2, tinh anh ×2,6, boss ×2,4; sát thương ×1,5; tốc đạn ×1,18; +1 viên/loạt; trần đạn +30; tinh anh nổ ra 4 đạn tím.
    - Sao, phần thưởng và càn quét (5 lượt/ngày) tách riêng, không đụng tiến trình Chiến dịch. Có mốc 20/40/60★ mỗi chương.
    - Nền phủ màu tím đỏ, có nhãn "NGUYỆT THỰC · E n".
  - **Bụi Tinh Vân** (`Dust67`, key `saobang-nebula-v67`): mỗi 10 bụi cộng +1% sát thương và +1% giáp, tối đa +25%.
  - **Bảng VIỄN CHINH** (nút ở cột phải Kho chiến cơ): 2 tab Chương 9 và Nguyệt Thực.
  - **Đợt 5 (dở dang) của GPT:** đã ghép 24 bệ tên lửa SSS, lưu ở `review_tb9/`. 11 tranh thiếu diện tích đã được phóng lên tới mép khung (`/tmp` fix). Riêng `thunder_singularity_pod_super_evo1` vẫn chỉ 76%, cần GPT vẽ lại. Còn thiếu 12 icon SSS.

- **V67 (tiếp) · PHI CÔNG & TIỀM NĂNG** (`src/pilot67.js`, key `saobang-pilot-v67`, test `tests/t67p.py`):
  - **Đội:** 8 phi công theo bảng Gemini. Đội gồm 1 phi công CHÍNH (đủ chỉ số và nội tại) + 3 phi công PHỤ (mỗi người góp 5% chỉ số). Đủ 4 người thì cộng hưởng +10% nạp Graze.
  - **Cấp:** Lv1–30, tốn hợp kim + đá, mảnh ở các mốc 10/20/30, lõi ở mốc 20 và 30.
  - **Cây tiềm năng:** 8 nút. Nút 6 đổi thành +2% sát thương mỗi cấp.
  - **Mở hệ thống:** `UNLOCK66.pilot` ở ải 50 (mở sớm khi đã vượt ≥ 42 ải và thua 3 lần ở cùng 1 ải boss), tặng sẵn Lâm Phong.
  - **Chỉ số:** cộng vào `Combat.stats` (lực chiến) và vào trận (máu, giáp, ×sát thương theo tỉ lệ ATK).
  - **Nội tại:** Graze, Bạo Tẩu, hồi giáp, boss + chí mạng (`CRIT66.chance`), chống chịu, buff, tên lửa/tàu con (`rep` chu kỳ trong Equipment25), SSS + trường bóng tối khi dùng bom.
  - **Trần chung:** mỗi lần Bạo Tẩu ≤ 12 s; đang Bạo Tẩu thì Graze chỉ nạp 30%.
  - **Mảnh phi công:** rơi khi qua ải hoặc càn quét (25%, ải boss 100%), và mua ở Chợ Đen.
  - **Chân dung:** chờ GPT Đợt 9 (`src/pilots/pilot_N.png`, build tự nạp); chưa có thì hiện huy hiệu chữ cái.
  - Thêm `Meta407.spendCores` (rep).
- **V67 (tiếp) · TRẠM GIAO DỊCH** (`src/trade67.js`, key `saobang-trade-v67`, nút "GIAO DỊCH", test `tests/t67t.py`):
  - **Chợ Đen:** mở ở ải 18 (`UNLOCK66.market`). 6 ô mỗi ngày. Có `Workshop.spendFrag` (rep) để thu mua mảnh trang bị thừa. Chặn lùi giờ máy hơn 1 giờ. Thứ 7 và CN giảm 30%, ô 6 bán skin hiếm.
  - **Kho Skin:** mở ở ải 25 (`UNLOCK66.skins`).
    - 6 skin đạn vẽ bằng canvas, thay hình đạn chính trong phạm vi `Glow66`; skin tông nóng có viền lạnh.
    - 6 skin khung chiến cơ.
    - 6 skin nổ hiện "SẮP CÓ", chờ GPT Đợt 10.
    - 2 skin thưởng: 3★ toàn 160 ải, và hạ boss ải 180.
    - Danh hiệu sưu tầm ở mốc 3/9/15/18 skin.
  - Các key mới đã thêm vào bản sao lưu: pilot, trade, eclipse, nebula.
  - Ba nút VIỄN CHINH / PHI CÔNG / GIAO DỊCH là một hàng biểu tượng (`dock67btn`, `.dk67`) ở góc trái dưới của khung chiến cơ, ngay trên thanh chỉ số. Dòng "Vượt ải n" (`.nx66`) dời lên `bottom:150px`. Cột nút phải vẫn giữ 8 nút như cũ.

## 4. Hệ trang bị SSS trong V44 (mô-đun Gear44)
- **18 mẫu gốc**: 6 Giáp (aegis, mirror, orbital, phase, reactive, nanite), 6 Tên lửa (inferno, cryo, thunder, singularity, spiral, stellar), 6 Vũ khí phụ (rail, disc, solar, gravity, ricochet, prism). `item.variant` trong save chính là id này.
- **18 trang bị SSS** ghép theo **vòng dây chuyền cùng loại**: A+B, B+C, …, F+A, ví dụ `sss_aegis_mirror`, `sss_prism_rail`.
  - Điều kiện: có cả 2 món gốc, mỗi món **≥ +1**. Món gốc được giữ lại.
  - Cường hóa SSS = min(10, 2×min(cường hóa 2 món gốc)).
  - SSS mang **2 đặc kỹ** của 2 món gốc.
- **Lưu** ở key mới `saobang-gear-sss-v1`: `{v:1, owned:{id:{at}}, equip:{armor,missiles,sidearm}}`. SSS chỉ **hoạt động khi ô đó đang lắp 1 trong 2 món gốc**. Khi lắp SSS, game tự lắp món gốc mạnh hơn.
- **Tên lửa/Vũ khí phụ:**
  - Bắn bằng GEAR_FX (đường đạn, đuôi, nổ 8 khung, kỹ năng, siêu cấp, Tuyệt kỹ).
  - Địch thật được đưa vào GEAR_FX qua "ô mục tiêu" có hp=1e9. Sau mỗi khung, lượng máu GEAR_FX trừ được **quy đổi** sang sát thương thật theo tỉ lệ `refDPS/nominal`. Trong đó `refDPS` là sát thương phụ trợ cũ của Equipment25 (auxDamage, count, interval, powerUpgrades); với SSS nhân thêm ×1,35×(1+3%/cấp).
  - Đã đo cùng ải trên V43 và V44: số địch hạ bằng nhau, điểm chênh <3%.
  - Equipment25 vẫn chạy nhưng không bắn các ô đã chuyển sang GEAR_FX.
- **Giáp:**
  - Giữ nguyên cơ chế Equipment25 (đã cân bằng). Chỉ thay hình: vòm giáp vẽ tay, hòa trộn cộng sáng, phía sau tàu, tâm trong suốt r ≤ 40 px, cộng hoạt ảnh kích hoạt 8 khung.
  - Giáp SSS chạy thêm đặc kỹ của giáp gốc thứ hai qua `Equipment25.armorSkill({...item, variant: other})`. Riêng `reactive` đi qua `onDamage`.
- **Chế độ:**
  - Bạo Tẩu (`superTime>0`) → GEAR_FX 'super'.
  - `Rank36.activate` (kỹ năng) → 'skill'.
  - Nút TÊN LỬA (`Equipment25.barrage`) → kỹ năng tên lửa, hồi chiêu lấy theo GEAR_FX.
  - `activateSuper()` với trang bị SSS → **Tuyệt kỹ** ('ult', 30 s hồi): xóa đạn địch ở 0,55 s, vẽ trên lớp `VisualFX.draw`, chỉ trong vùng y < 453.
- **Giao diện:**
  - **Xưởng trang bị SSS** (`#g44`, `Gear44.open(kind)`): tab 3 loại, 6 món gốc (+cấp), 6 công thức, chi tiết (đặc kỹ, kỹ năng, siêu cấp, Tuyệt kỹ, mô tả), nút HỢP THỂ/LẮP/GỠ, nghi thức hợp thể.
  - Cách mở: nút **TRANG BỊ SSS** trong Kho chiến cơ, hoặc nút **GHÉP** trong Sảnh SSS khi đang chọn ô trang bị.
  - Ô trang bị ở Kho và Sảnh hiện tranh SSS.
  - `Progress.art` dùng **icon riêng cho từng mẫu** thay vì icon chung theo loại.
- **API:** `Gear44.open/close/fuse/equipSSS/activeId/activeDef/dmgMult/slotPic/canFuse/owns/sssEnh/state/runtime`.

## 5. Kiểm tra đã chạy (đều đạt, 0 lỗi Safety31)
- Đầu-cuối trên điện thoại (iPhone 13) và máy tính: hợp thể → lắp → vào trận → kỹ năng tên lửa → Tuyệt kỹ → Bạo Tẩu.
- Các bài cũ: th42 (Kho chiến cơ), r_t30 (Tháp/meta), tmeta, trite (Lễ Hợp Thể), t43 (Sảnh SSS vào trận).
- So cân bằng V43 và V44 (tbal.js).

## 6. Việc còn chờ / nên làm tiếp
1. **Chờ GPT gửi bản giám định "Giam_Dinh_Sanh_SSS_V1.html"**: khung giao diện mới cho Sảnh SSS, theo 2 ảnh mẫu của người dùng. Khi nhận được:
   - Kiểm tra GPT đã giữ đủ id/class/`data-cc` và mọi bộ chọn CSS đều bắt đầu bằng `#ccht-lobby-root`.
   - Chỉ nối khối CSS và tranh vào `ccht_extra.css` (hoặc một file CSS mới), **không đổi JS**.
   - Kiểm tra ở bề ngang 360–430 px.
2. **FPS trên điện thoại thật**: máy ảo chỉ đo được khoảng 25–30 FPS. Nhờ người dùng thử. Nếu chậm:
   - giảm `light:true`/giới hạn hạt;
   - chỉ vẽ 1 lớp Tuyệt kỹ;
   - nén tranh Tuyệt kỹ thêm.
3. **Dung lượng 18,35 MB** (V45 đã đo: nén lại WebP chỉ bớt 0,5–0,8 MB và ảnh xấu đi rõ, không có tranh trùng lặp → tạm giữ), trong đó tranh trang bị chiếm khoảng 9,3 MB. Có thể hạ chất lượng WebP Tuyệt kỹ, hoặc nạp từng loại khi cần.
4. ~~Ô trang bị SSS ở Kho ghi "+N" của món gốc~~ → đã sửa ở V45.
5. Có thể thêm **Đồ giám** đầy đủ, gồm thẻ trang bị và đoạn trình diễn lặp (tham khảo bản giám định V6 của GPT), và **Bộ Cộng Hưởng** (3 món SSS cùng tông nguyên tố).
6. ~~Hộp Điểm danh và bong bóng hướng dẫn chồng nhau~~ → đã sửa ở V45 (B-V44-05). Bước 1/3 nay ghi "Bấm XUẤT KÍCH để vào ải, hoặc BẢN ĐỒ để chọn ải khác…" (B-V44-06).
7. **(V45 phát hiện, có từ trước)** Máy tính 1280×720 không bật toàn màn hình: khung trận cao 793 px nên hàng nút TÊN LỬA/BOM nằm dưới mép màn hình (y≈852).
8. Trang bị SSS chưa có nghi thức hợp thể dùng chung `SSSRite` của chiến cơ; Gear44 có canvas nghi thức riêng.

## 7. Tài liệu tham khảo (người dùng giữ)
- `Giam_Dinh_Trang_Bi_SSS_V6.html` (29,7 MB): bản giám định đầy đủ tranh GPT. API thử nghiệm là `window.GEAR_REVIEW_V3`, có các tab Đồ giám, Trường thử, Hợp thể, SSS trong trận, Cân bằng, Kỹ thuật.
- Chuẩn tranh đã thống nhất với GPT:
  - icon 256 (game dùng 128);
  - vòm giáp 192/224, hoạt ảnh kích hoạt 8×224;
  - hiệu ứng nổ 8×128 (thường), 8×192 (siêu cấp);
  - đạn 4 khung;
  - bệ phóng 80×112, pod 64/128;
  - atlas SSS 3 tấm 3072×1024 (6 cột × 2 hàng thường/MAX, game dùng 2304×768);
  - Tuyệt kỹ 2 lớp × 2 khung 1024×512 (game dùng 768×384).
- Ghi chú về game gốc (người dùng nhờ ghi nhớ, rút từ 5 video):
  - Khung theo sao: 2★ xám, 3★ xanh lá, 4★ xanh dương, 5★ tím. Thường/S cường hóa đến +5, SSS đến +10.
  - SSS = "gốc + 35%", điểm thưởng 99% → 124%.
  - SSS mang 2 đặc kỹ của 2 món gốc, công thức nối dây chuyền, chỉ ghép cùng loại.
  - Giáp bên game gốc chỉ có kỹ năng bị động và icon; game mình làm thêm hiệu ứng trong trận.

## 8. Bài học kỹ thuật (tránh lặp lỗi)
- Game có quy tắc CSS toàn cục `body button:not(...)` có `!important` đè nút của module mới. Đã thêm `:not(#ccht-lobby-root button):not(#g44 button)`; module mới cũng phải được loại trừ tương tự.
- Module ngoài thường dùng tên trùng với game (`state`, `canvas`, `ctx`, `W`, `H`, `mode`). Luôn bọc trong IIFE.
- Các hàm toàn cục của game (`activateSuper`, `runGameFrameC`, `reset`, …) khai báo bằng `function` nên gán lại được để móc vào.
- Tranh từ AI thường sai kích thước hoặc bố cục, ví dụ hoạt ảnh kích hoạt xếp lưới 4×2 hoặc 1×8. Luôn tự chuẩn hóa: cắt, co, xóa tâm theo hình tròn, xóa viền.
- Số liệu "đạt chuẩn" do AI tự ghi trong file giám định có thể là chữ gõ sẵn (Gemini từng làm vậy). Luôn tự đo lại.

## V68-A (21/10/2026) · Giao diện trận đấu theo video game gốc
- Dựng: `python3 build68.py` → `Phi_Doi_Sao_Bang_V68.html` (= V67 + `src/hud68.css` + `src/hud68.js`). Test: `tests/t68a.py`.
- Hud68: (1) `toast()` trong lúc chơi → hàng đợi chữ nổi `#fq68` (đáy 31%, tối đa 3, cách nhau 0,42 s, chống trùng); ngoài trận giữ toast cũ.
  (2) `#tele07` một dòng: máu+giáp thanh đôi, ẩn số (hiện khi máu thấp), ẩn hệ phái; cảnh báo `⚠ ST x%` CHỈ khi lực chiến < đề nghị
  (dùng `Combat.multiplier(flight.cp, requirement)`; trước đây hiện "ST 19%" cho tài khoản mạnh do hệ số nén Endgame66 — nén vẫn giữ nguyên).
  (3) Laser: `warn` tối thiểu 0,9 s + tam giác ⚠ ở mép màn hình + vạch đỏ. (4) Màn thua: khung `.fx68` (lực chiến/đề nghị, nút CƯỜNG HÓA → `#lobby-back` rồi `#hgr41 [data-go=craft]`, PHI CÔNG nếu mở, THỬ LẠI).
- build68 rep: dải boss "⚠ CẢNH BÁO NGUY HIỂM ⚠" + "LV.n · BOSS LỚN/NHỎ ĐANG TIẾN VÀO". Loại trừ CSS nút: `:not(.fx68 button)`.
- Kế hoạch tiếp: B tách Sảnh/Kho · C xem trước trước➜sau + bảng "thiếu, lấy ở đâu" · D càn quét lọc theo nguyên liệu + Chuẩn bị Vô tận · E (chờ chân dung) thoại giữa trận, hồi sinh có phi công, bản đồ đường sao.
- V68-A2 đạn rực màu: `src/vivid68_pre.js` (VIVID68 {K:1.45 bão hòa, alpha:1.18, size:1.22}) chèn TRƯỚC `<script id="shots-v2">`; build68 rep: bảng DEF đậm hơn,
  `Vivid68Pre(SPR)` xử lý sprite 1 lần, thân đạn ShotV2 + tia + đạn SSSGame (`drawShots`) vẽ 'source-over' (không cộng dồn thành trắng), `hot` trộn trắng .6→.28,
  dải màu bán nguyệt đậm hơn; hud68 đặt GLOW66.shot=.96/.9. Đo: điểm ảnh rực màu 6%→20,6% (tàu thường), điểm trắng lóa không đổi (~0,2%). Tắt: VIVID68.on=false.
- V68-B Sảnh/Kho: `src/lobby68.{js,css}`. #hgr41 có 2 lớp `.lob68` (mặc định) / `.kho68`. Sảnh ẩn .h1-head/.h1-stats/.h1-label/.h1-fx/.h1-dock/.h1-btns/.h1-orbs,
  .h1-side thành lưới icon 2×4, .dk67 thành cột trái; thêm khối #lb68 (thẻ phi công + tàu, PHI CÔNG/KHO, VÔ TẬN/XUẤT KÍCH).
  XUẤT KÍCH = bấm `#lobby [data-lbmode=campaign]` rồi `[data-go=launch]`; VÔ TẬN tương tự với endless (khóa theo UNLOCK66.endless — đã thêm selector).
  Kho = bố cục V67 + nút `.bk68 ‹ SẢNH`. API: Lobby68.set('lobby'|'kho'). Test `tests/t68b.py`.
  Ghi chú: tài khoản mới bấm Xuất kích lần đầu bị popup #m40 chặn — có từ V67, không phải lỗi mới.
- V68 sửa lỗi (22/10): (1) `html body .m63{display:flex}` đè thuộc tính hidden → bảng Viễn chinh/Nguyệt Thực không đóng được (có từ V67): thêm `.m63[hidden]{display:none!important}` (lobby68.css).
  (2) Hub40 `holdable.stop` gọi render() → closeSheet() → nhấn NÂNG CẤP trang bị xong bảng chi tiết tắt: build68 rep giữ và mở lại `gearSheet(id)`. Kiểm: /tmp script gs.py (V67 tắt, V68 giữ mở).

## V69 (22/10/2026) · ĐỘT PHÁ thay Cường hóa — `python3 build69.py` → Phi_Doi_Sao_Bang_V69.html (= V68 + src/adv69.{js,css})
- Bảng TẠM (chờ Gemini: PROMPT_GEMINI_DOT_PHA_V69.md): ADV69.gear/craft (+1..+5: bậc màu t, 4 loại q, mảnh f, hợp kim c), ADV69.sss ★1..★10 (Tinh Hạch k, ◈ c; +4%/★ trang bị SSS ÷3, +5%/★ siêu chiến cơ).
- Rơi DROP69: mini-boss 2 lượt, boss 4, ải thường 25%; bậc màu theo chương; càn quét ×0,5 (móc Workshop.rollStage, dòng chữ thêm vào kết quả). SSS: Chương 9 [2,3,5], Nguyệt Thực [1,2,3], càn quét Nguyệt Thực [1,1,2].
- Lõi: build69 rep cost() hỏi ADV69C (mảnh theo bảng, 0 ở bậc thấp), spendGear cho phép 0, promoteCraft/Progress.promote gọi ADV69G (kiểm) / ADV69P (trừ nguyên liệu + hợp kim).
- Giao diện: nút #sh-en/#hb-en trong Hub40 → "ĐỘT PHÁ +n" mở bảng .adv69 (2 thẻ +n➜+n+1, so sánh chỉ số, 4 ô nguyên liệu có/cần, mảnh, hợp kim; bấm ô → LẤY Ở ĐÂU có nút ĐI). Kho: 2 nút ĐỘT PHÁ SSS / NGUYÊN LIỆU ở .h1-fx. Lưu 'saobang-adv69-v1' (có trong sao lưu).
- Mô phỏng nhịp (số tạm): ngày 1 đủ 2 món +1; cả bộ +3 ~ngày 4–5; cả bộ +5 ~ngày 9–10 (~ải 130). Thừa Lục cuối game → đề xuất đổi 3 Lục → 1 Lam.
- Test: tests/t69.py.
- V69-B Skin (src/skin69.{js,css}, lưu 'saobang-skin69-v1'): Evo53 `craftE` → Skin69.evoE(id) (ngoại hình tiến hóa theo SKIN đang mặc), `perks` → Skin69.realT() (sét/khiên theo bậc thật).
  Đột phá không skin: Evo53.hull bọc → enhancedAtlas (giữ màu gốc: SKIN69.fx bão hòa/tương phản/ánh kim/viền sáng theo màu chủ đạo tự tính). Vệt đuôi đạn từ +2.
  Skin: evo1 Ngọc Lam (300 lõi), evo2 Bạch Kim/evo3 Hoàng Kim (10 mảnh), evo4 Cầu Vồng (12 mảnh); quà ải 40/80/120/160; quay 1 lượt miễn phí/ngày, thêm 60 lõi.
  Chuyển dữ liệu: ai đã có +1/+3/+4/+5 được tặng & mặc sẵn skin tương ứng. Nút TỦ SKIN ở Kho (.h1-fx) và cột trái Sảnh. Test tests/t69b.py.
- V69-C (theo video Đồ giám game gốc 22/10: mỗi dòng tàu 4 bậc trắng→lục→lam→tím+5; THÂN TÀU gần như giữ màu, ĐẠN đổi màu rõ theo bậc, bậc cao nhất vàng kim; Bạo Tẩu có hào quang/cánh sáng):
  skin69.js LADDER[art id] = [hue +1/+2, +3/+4, +5]; bọc Arsenal30.draw & PlayerFXB.laser đổi sprite ShotV2 sang bản tô hue (cache), đạn dày +4%/bậc; aura() khi Bạo Tẩu (tia + quầng màu bậc, +5 thêm 2 cánh sáng).
  Chỉ áp khi KHÔNG mặc skin (skin dùng màu tiến hóa của Evo53).
- V69-D (người dùng: "hình ảnh không khác biệt"): hình dáng theo bậc đột phá THẬT: Evo53 hull dùng stageOf(Skin69.realEOf(id)) → +3 evo1, +5 evo2 (tranh GPT, giữ màu gốc), skin chỉ còn là màu.
  SKIN69.fx mạnh hơn (viền sáng từ +1). Chỗ chờ tranh GPT Đợt 12 (src/tier/t1|t2|t4_ship<N>[ _super].png → TIER69_ART) cho +1/+2/+4. Prompt + gói tham khảo: GPT_DOT12_THAN_TAU.zip.

## V70 (đang thiết kế, 22/10/2026) · HỆ KHUNG MÀU theo game gốc — người dùng chốt:
- Rơi CẢ chiến cơ/trang bị (vô tận, rương, tân thủ, thành tích, điểm danh) → chiến cơ có nhiều bản; bản trùng = phôi.
- Thang 12 nấc cùng mẫu: Trắng → Lục (NL Lục) → Lam (NL Lam) → Lam+1,+2 (1 phôi Lam) → Lam+3 (2) → Tím (4 phôi Tím) → Tím+1,+2 (1) → Tím+3,+4 (2) → Tím+5 (3). Phôi = bản CÙNG MẪU cùng khung.
- Ngoại hình đổi ở Trắng/Lục/Lam/Tím và riêng Tím+5 (Lam+1..+3, Tím+1..+4 giữ hình). Map tranh: Trắng=gốc, Lục=q1 (GPT Đợt 12 sửa), Lam=evo1, Tím=evo2, Tím+5=q5 (GPT).
- Bậc S = mẫu riêng có đạn/kỹ năng/hiệu ứng riêng (cắt, nổ, xuyên…), rơi hiếm.
- Chờ: Gemini PROMPT_GEMINI_PHAM_CHAT_V70.md (trần level, hệ số chỉ số, tỉ lệ rơi, mẫu S, kỹ năng khung, mốc SSS, nhịp); GPT Đợt 12 (40 tệp q1/q5 + _super).
- Đổi dữ liệu dự kiến: +0 Trắng, +1–2 Lục, +3–4 Lam, +5 Tím.
- Người dùng chốt chi phí: nấc 1–2 = nguyên liệu + ◈; từ Lam+1 = phôi cùng mẫu + ◈ (không thêm nguyên liệu). Không cần video.
- 22/10 11:20 · Nhận GPT Đợt 12a (10 × q1_ship<N>.png, khung Lục): đạt về hình/màu (hue lệch 1–19°) nhưng GPT thu đều 66% theo mốc SAI trong prompt → Claude phóng lại theo từng tàu (giữa gốc & evo1, tâm trùng ô gốc), lưu src/tier/q1_ship<N>.png.
  skin69 tierImg: +1/+2 → 'q1', +5 → 'q5' (khi có). build69 nhúng src/tier/*.png → TIER69_ART. Prompt sửa cho 12b/12c: PROMPT_GPT_DOT12bc_SUA_KICH_THUOC.md (bảng chiều rộng theo từng tàu).
  LƯU Ý: đã từng làm hỏng skin69.js vì chèn chú thích // giữa dòng 1-dòng → luôn `node --check` sau khi sửa.
- 22/10 11:57 · Nhận GPT 12b (q5_ship0–9) + 12c (q1/q5 _super): đã chép vào src/tier (40 tệp, game 30,96 MB). 12b đạt (tàu 3 yếu), q5 BT đạt; q1 BT thiếu hào quang Bạo Tẩu → yêu cầu vẽ lại (PROMPT_GPT_DOT12d_VE_LAI.md: 10 q1_super + q5_ship3).
  q5 chưa bật trong V69 (SKIN69.q5on=false; V69 +5 = Tím → evo2). V70 bật khi có nấc Tím+5.
- 22/10 13:11 · GPT 12d đạt: 10 q1_ship<N>_super có hào quang Bạo Tẩu đúng kiểu gốc, q5_ship3 mới (70%, viền vàng). Đã chép src/tier. Đợt 12 HOÀN TẤT (40 tệp).
- 22/10 13:31 · Người dùng muốn thay hệ NGỌC bằng hệ ĐÁ game gốc (đá phổ thông theo vị trí: Trắng/Lục/Lam chỉ số, Lam/Tím/Cam hiệu ứng trong trận; đá chỉ định: 2 lực chiến (giáp 2 máu) + α/β riêng từng món; ghép 5→1; ô mở theo cấp nâng; nguồn: boss vượt hạn, tuần tra, tân thủ, rã trang bị).
  Prompt: PROMPT_GEMINI_DA_V70.md (gửi sau prompt V70 cùng khung chat), PROMPT_GPT_DOT13_DA.md (14 icon + 2 tùy chọn). Làm cùng V70.
- 22/10 13:33 · GPT Đợt 11 đạt (14 icon nguyên liệu, src/mat → MAT69_ART, cắt sát + đệm 12%, 128 px). mat_sss_shard chưa dùng (dự phòng cho phôi Tím / Nguyệt Thực).
- 13:43 · Bổ sung hệ Đá: TẨY ĐÁ ĐỊNH HƯỚNG (chọn đá mong muốn từ danh sách 4 tab: thường → α/β bộ mới→cũ → Ω/Σ SCC mới→cũ; phôi cùng khung, 5/5), màn đá 1 trang bị (ô quanh hình, Tụ hợp/Tinh hóa/Tẩy). Đã thêm vào 2 prompt (Gemini câu 9–11; GPT thêm mark_omega/sigma).
- 13:46 · Tài liệu Ngọc α/β (Google Slides): không tăng lực chiến, tăng nội tại; Cam có cả α+β, Tím 1 trong 2 bằng ½; nguồn ghép/tách S/tẩy; đã thêm câu 12–13 (chế độ khóa lực chiến, α/β từng món) vào prompt Gemini.
- 13:48 · PDF Ngọc α/β (39 tr.) → THAM_KHAO_NGOC_AB_GAME_GOC.md; prompt Gemini thêm bảng 10 kiểu nội tại α/β (Tím ≈ ½–0,55 Cam).
- 22/10 13:51 · GPT Đợt 13 (hệ Đá) đạt: 18 tệp (5 đá phổ thông, 3 đá chỉ định, 4 icon vị trí, α/β/Ω/Σ, 2 ô lắp). Lưu src/da/ — chưa nhúng (chờ Gemini để làm hệ Đá cùng V70). Hình đá phổ thông chiếm ~30–40% khung → cắt sát khi dùng.
- 13:55 · VŨ KHÍ TỐI THƯỢNG (V71): tài liệu → THAM_KHAO_VKTT_GAME_GOC.md; PROMPT_GEMINI_VKTT_V71.md (gửi sau 2 prompt V70), PROMPT_GPT_DOT14_VKTT.md (19 tệp: 3 mô hình ×2, hiệu ứng, icon).
- 13:56 · Chip VKTT (bộ 6, thưởng 3/6) cho 4 vũ khí (thêm Lưới Điện Laser) → đã thêm vào tham khảo + câu 7–8 Gemini + mục D/E GPT (31 tệp).
- 13:57 · Mô-đun Siêu Chiều (chip): 6 ô (vuông/lục giác/tròn ×2), tham số chủ + mã khuếch đại ngẫu nhiên + giao ước; Sản xuất/Cải tạo (Luyện 20 lần bằng Tinh thể năng lượng+vàng, Tái tạo reset)/Phân giải. Đã thêm vào tham khảo + prompt Gemini câu 7 + GPT mục D (37 tệp).
- 13:58 · Chip: Tái tạo (Bộ mã hóa + kim cương, 30 lần, khóa dòng), Sản xuất (Tinh thể năng lượng, thanh hiệu chuẩn bảo hiểm, cấp rơi theo leo tầng Khe nứt Hư không). GPT Đợt 14 = 40 tệp.
- 13:58 · Bảng Cấp rơi chip + thang phẩm chất/biến dị (Nguyên mẫu→Giao ước NM; Chiến lược→Giao ước CL→Tuyệt mật) đã thêm.
- 13:58 · Phân giải chip (3 nguyên liệu, lọc theo phẩm chất, loại trừ). Thang chip: Chế thức→Cải lương→Nguyên mẫu→(Giao ước)→Chiến lược→(Giao ước)→Tuyệt mật. GPT 14 = 41 tệp.
- 22/10 14:16 · GPT Đợt 9 (8 chân dung + khung) & Đợt 10 (thương nhân, 6 dải nổ, 12 icon skin) đạt. Gắn: src/pilots → PILOT_ASSETS 'p<id>' (sửa lobby68 dùng key 'p'+pid); src/trade → TRADE_ASSETS; trade67: icon skin trong Kho skin, thương nhân ở Chợ Đen, 6 skin NỔ mở bán (đổi tên theo tranh: Lôi Điện/Pháo Hoa/Băng/Hoa Anh Đào/Hố Đen/Hoàng Kim), hiệu ứng nổ áp cho nổ địch + bom. pilot_frame chưa dùng.
- 22/10 14:50 · GPT Đợt 5 bổ sung đạt: 12 icon SSS tên lửa (evo1/evo2) + vẽ lại sss_thunder_singularity_pod_super_evo1 (phủ 86×90%). Đã chép src/evo/gear (133 tệp). Đợt 5 HOÀN TẤT; còn Đợt 6 (vũ khí phụ SSS), 7 (giáp SSS).
- 22/10 15:03 · Người dùng: thích phong cách chiến cơ, trang bị lệch phong cách. Phân tích: giáp = vòng năng lượng mờ (không vật thể cứng), pod 64–128px ít chi tiết, icon đổ màu toàn thân. Prompt GPT Đợt 15 đồng bộ phong cách (8 quy tắc; đợt thử 15a 6 tệp ở 4× độ phân giải). Đề nghị TẠM DỪNG Đợt 6/7 tới khi 15a được duyệt.
- V69-E (15:05) GIÁP = MÀNG MỎNG: src/armor69.js; build69 thay nhánh vẽ giáp của GEAR_FX (shell/proc/vệ tinh/nano) bằng Armor69.draw; tắt vòng hào quang giáp Evo53.
  Màng hiện khi shield>0, độ mờ theo % giáp, lóe khi đỡ đạn, tắt dần khi giáp = 0. Tính năng/thông số giáp giữ nguyên.
- 15:06 · NGƯỜI DÙNG: ĐỂ VIỆC THIẾT KẾ ĐỒ HỌA LẠI SAU, khi game hoàn thiện mới xử lý. Danh sách chờ đồ họa: Đợt 15 đồng bộ phong cách trang bị (GPT_DOT15_DONG_BO_PHONG_CACH.zip),
  Đợt 6–7 SSS (làm theo phong cách mới), Đợt 14 VKTT, vẽ lại chân dung phi công 4 & 8 (kín đáo hơn – nếu muốn). Ưu tiên hiện tại: cơ chế (V70 khung màu + Đá, V71 VKTT) theo số Gemini.
- V69-F (15:19) viền hồng quanh SSS = RankArt.draw (khung hạng SS: tấm cánh + elip mảnh) → trong trận thay bằng vệt sáng dưới bụng + 2–4 đốm bay vòng (RankFx69, armor69.js); Kho giữ nguyên.
- V69-G (15:25, ảnh mẫu bong bóng): MỘT lớp bong bóng khiên duy nhất (Armor69.bubble qua VisualFX.draw): khiên chắn đạn có thời gian → sáng rõ, 2 s cuối nhấp nháy rồi tắt; điểm giáp → nhạt theo %, lóe khi trúng, tắt khi = 0.
  Đã tắt: sprite shieldArt (rep 'if(shield>0||bulletShieldTime>0){'), FX40.shieldBubble (kinh tuyến), màng V69-E. 
- 15:19 · Người dùng: vẽ lại 8 phi công TOÀN NỮ, gợi cảm hơn → PROMPT_GPT_DOT9b_PHI_CONG_NU.md (trưởng thành, không khỏa thân). Khi tranh về: đổi tên PILOTS67: 1 Lâm Phong→Lâm Phương, 5 Bảo Long→Bảo Ngọc (7 Hàn Sương giữ).
- 15:37 · Người dùng: phi công nữ 'phong cách đa dạng, hở bạo' → cập nhật PROMPT_GPT_DOT9b (8 phong cách thời trang khác nhau, hở mạnh hơn nhưng giữ giới hạn: trưởng thành, không khỏa thân). Viền hồng & giáp bong bóng đã xử lý ở V69-F/G.
- 22/10 16:15 · GPT Đợt 6 (36 tệp vũ khí phụ SSS evo1/evo2: pod normal/super + icon) đạt kỹ thuật; vẫn phong cách cũ (sẽ xét lại khi làm đồ họa cuối). Chép src/evo/gear (168 tệp). Còn Đợt 7 giáp SSS: KHÔNG CẦN (giáp đã bỏ đồ họa, chỉ còn icon kho → chỉ cần 12 icon nếu muốn).
- 22/10 16:36 · GPT Đợt 9b (8 phi công nữ, 8 phong cách) đạt → src/pilots; đổi tên PILOTS67: Lâm Phương (1), Bảo Ngọc (5).
- 16:48 · Gói GPT chat mới: GPT_CHAT_MOI_TONG_HOP.zip (00_DOC_TRUOC_GPT.md + Đợt 14 + tham khảo, mẫu đã duyệt, ảnh VKTT game gốc).
- 17:09 · Nhận Gemini V70 (GEMINI_TRA_LOI_PHAM_CHAT_V70.md). Đánh giá: cấu trúc tốt; cần chốt: Nấc6 (Gemini dùng NL Tím, người dùng nói 4 phôi Tím), nâng SSS (Gemini: phôi Tím; người dùng: NL riêng màn khó = Tinh Hạch), nguồn chiến cơ (mở theo ải vs rơi). Lỗi cân bằng: CP đầu game vượt đề nghị 1,6–2,2× (ngày 1–4) → Claude tự hiệu chỉnh; mảnh cũ 6→1 phôi quá hào phóng; SSS ngày 3–4 khó đạt (phôi Lam trùng mẫu).
- 17:15 · GPT 14a: duyệt 7/8 (lưu src/vktt). ult_web_legend.png cụt 688128B → PROMPT_GPT_DOT14a_SUA.md.
- 17:21 · NGƯỜI DÙNG CHỐT V70: Nấc Lam+3→Tím dùng 4 bộ NL Tím (theo Gemini, KHÔNG cần phôi Tím); nâng SSS dùng Tinh Hạch riêng màn khó (Gemini sai); cấp tối đa 100, Trắng cap 25 (theo Gemini) + quy đổi save cũ.

## V70 · HỆ PHẨM CHẤT 4 KHUNG MÀU (22/10 17:50) — build70.py → Phi_Doi_Sao_Bang_V70.html
- src/adv70.js/.css thay adv69.js (Adv69 = V70, giữ API). Nấc 0–11 lưu ở saobang-tier70-v1 {c:{idx:{n}},g:{id:{n}},ph,ms,first}; NL + sao SSS vẫn ở saobang-adv69-v1.
- Lõi giữ enhance cũ = floor(5n/11). Móc build: cap→V70CAP, levelFactor→V70LF, craftProgress có idx, hệ số cấp ×119/99 (V70K) và enhance phân số (V70EF) trong gearSpec/craftProfile/giáp; nhãn V70T/V70C; Workshop.set70/frag70/exp70; Progress.v70{items,get,set,remove,equipped,cleared}; promote/promoteCraft cũ → mở bảng V70; ghép trang bị cũ tắt.
- Quy đổi: n=max(round(2,2E), nấc nhỏ nhất có trần ≥ L·100/120). Sức mạnh: không ai bị giảm (tăng 0–7%); admin CP 33.067 vs V69 33.066.
- Phôi: token theo mẫu (c<idx>:2|3, g:<variant>:2|3). Đúc Lam 15 mảnh; Tím = 3 Lam + 3.000◈; tái chế 3 phôi mẫu khác cùng ô → 1. Phân giải trang bị (Trắng 6 mảnh, Lục 12, Lam+ 1 phôi Lam, Tím+ 1 phôi Tím, +½ đá). Phân giải nhanh giữ món tốt nhất mỗi mẫu.
- Rơi: NL theo dải ải (TIER70.band), phôi mini 40%/boss 60% (lần đầu chắc Lam), Nguyệt Thực boss lần đầu chắc Tím, Ch.9 25%; mốc 20/40/60 phôi Lam, 80–160 phôi Tím cho chiến cơ chính.
- Ngoại hình: V70.ve → Lục=1 (q1), Lam=3 (evo1), Tím=5 (evo2), Tím+5 → q5 (skin69 tierImg dùng V70.isMax).
- CHƯA LÀM (V70b): rương Kho Báu theo bảng Gemini + bảo hiểm, quà 7 ngày, điểm danh tuần, mẫu S mới, kỹ năng theo khung & kỹ năng Tím+5. Hợp thể SSS vẫn nâng bằng mảnh như cũ (+ ★ Tinh Hạch).
- Test: tests/t70.py <V70> [<V69>]; t68a/t68b/t67/t66 sạch lỗi. t69 cũ không còn khớp (đã thay bằng t70).
- 18:15 · GPT 14a sửa + 14b: duyệt hết (23 tệp src/vktt). ZIP 14b hỏng (3.000.607B, mất central dir) → lấy từ HTML giám định. Gửi PROMPT_GPT_DOT14c.md.
- 18:40 · GPT 14c: duyệt đủ 18 tệp (ZIP chia 2, mở tốt). ĐỢT 14 XONG: 41/41 tệp ở src/vktt. Chờ Gemini VKTT V71 để lập trình.
- 20:55 · Nhận Gemini ĐÁ V70 (GEMINI_TRA_LOI_DA_V70.md + GEMINI_DA_V70_DATA.js). Lỗi: thang CP sai (Gemini nghĩ max ~19k, thật 33k, ATK~1170 → đá cộng thẳng gần như vô nghĩa); danh sách α/β lệch với 3 bộ yếu (bộ 1–3 thật: Thành Trì/Hỏa Ngục/Điện Từ · Kính Phản/Hàn Sương/Đĩa · Quỹ Đạo/Lôi Kích/Thái Dương) → thiếu thiết kế cho Dịch Pha, Xoắn Ốc, Thiên Tinh, Thiên Kiếm, Lục Lăng, Chân Trời; khối lượng rất lớn (28 đá hiệu ứng + ~38 α/β cơ chế riêng + 2 chế độ mới). Chờ người dùng chốt.
- 21:00 · Người dùng chốt (b) khóa α/β bộ 1–3; thứ tự Đá-1 → VKTT → Đá-2. Gemini giới hạn → giao GPT thiết kế 6 α/β + VKTT V71 (GOI_GPT_THIET_KE_DA_VKTT.zip). Claude bắt đầu Đá-1.

## V71 · HỆ ĐÁ KHẢM Đá-1 (22/10 ~21:40) — build71.py → Phi_Doi_Sao_Bang_V71.html
- src/stone71.js/.css (Stone71), icon src/da → STONE71_ART. Lưu saobang-stone71-v1 {st:[{id,t,pos,ty,k,m,on:{h,s}}],mig,gift,pat,spity}.
- Chủ thể: 'c<idx>' chiến cơ · 'g:<itemId>' trang bị · 'r:<robotKey>' siêu chiến cơ (SSS mở ô theo ★1/3/5/7/9). Ô mở theo nấc [2,4,6,9,11].
- Số (Claude hiệu chỉnh): chỉ số công % của món [0,5/1/1,6/2,3/3%], thủ [1/2/3/4,5/6%]; Ω công Tím/Cam 2,5/4,5%, Σ 1,8/3,2%; Ω thủ 5/8%, Σ 3,5/6%; SSS ×1,3. Đầy Cam 4 vị trí: CP 33.067 → 39.044 (+18%).
- Công: trộn theo tỉ trọng thân chiến cơ/tên lửa/tàu con → Combat.stats (CP) & Combat.factor (trận). Thủ: craftProfile & Progress.stats.
- 14 đá hiệu ứng: s2 s5 s7 a2 a7 m2 m4 m6 m7 w2 w3 w4 w5 w7 (móc collect/bomb/activateSuper/damage). Còn lại (kỹ năng phi công, vượt đợt Vô Tận, hồi bom…) + Tẩy + α/β → Đá-2.
- Tụ hợp 5→1 (200/800/3.000/10.000◈, lên Tím/Cam 20% chuyên dụng), Tinh hóa trang bị Lam/Tím/Tím S, rơi đá ải boss 35%/mini 15% (từ ải 70), Nguyệt Thực boss 100%, quà mở 2 đá Lam, Tuần tra 12h (mở ải 10).
- Ngọc cũ: quy đổi 1 lần (D→Trắng… S→Cam Ω/Σ + 1 Tím; 5 mảnh→1 đá; lẻ 400◈), Gems.apply tắt, gemsOn trả []; nguồn Gems.rewardStage → đá. Ô "COMBO NGỌC" → tóm tắt ĐÁ KHẢM.
- Test: tests/t71.py; t70/t68a/t67 sạch lỗi.

## V72a · VŨ KHÍ TỐI THƯỢNG (22/10 ~22:30) — build72.py → Phi_Doi_Sao_Bang_V72.html
- Thiết kế GPT: THIET_KE_GPT_DA_AB_VKTT.md (Việc 2) — đã dùng số của GPT. src/ult72.js/.css (Ult72), tranh src/vktt → ULT72_ART. Lưu saobang-ult72-v1.
- 16 nấc, cấp 1–100, lên đời [mảnh, linh kiện, ◈]; cấp tốn ◈+⬢. Chủ chiến 100% · 2 trợ chiến 25% (mở ải 100/120), trần +12% tấn công/máu/giáp → CP 33.141 → 36.921 khi tối đa (chưa chip).
- Mở ải 90: chọn 1/4 vũ khí (tặng 100 mảnh). Nhiệm vụ ngày (boss lớn / Vô Tận đợt 10 / 3 ải), tuần (Nguyệt Thực), một lần (ải 120, ải 180, quà làm quen), chợ mảnh 400◈. Mảnh tự chọn → gắn vào vũ khí. CHƯA nối Tháp Boss tuần.
- Trận: D0 = 0,8 × tấn công (đo 22/10: ST thật/giây ≈ 0,64–1,06 × tấn công × hệ số) × hệ số trận. Ngân sách token 2%·D0/s, trần 60%·D0. Kỹ năng cơ bản 4 vũ khí + tối thượng (nút #ult72-btn gắn vào cha của #bomb). Khóa cứng boss ≤3 s/12 s. Dừng/làm chậm bằng ghim vị trí (stopE), dừng đạn bằng vx/vy=0.
- V72b (chưa làm): chip giao thức (7 phẩm, dòng khuếch đại, bộ 3/6, sản xuất/luyện/tái tạo/ghép/phân giải, cấp rơi theo Tháp). Đá-2: ALPHA_BETA_ADD trong THIET_KE_GPT (Việc 1) + remap ef_s1/w1/a1/m1 sang VKTT (Câu 6).
- Test: tests/t72.py; t71/t70/t68a/t67 sạch lỗi.

## V72b · CHIP (22/10 ~23:00) — gộp vào Phi_Doi_Sao_Bang_V72.html
- src/chip72.js (Chip72), lưu saobang-chip72-v1. Móc qua Ult72.X {stat,mod,has,crystal,onClaim}. Bộ 3/6 cài trong ult72.js (turrets/timeBomb/saw/net/evReq/cdOf). Trần chip 6%/chỉ số, module 18%.
- Cấp rơi theo XP chip (task ngày +20, Nguyệt Thực tuần +30) + ải 110/130/150/170 (thay Tháp Boss). Quà mở ải 110: 300 tinh thể, 2 mã hóa, 4 lõi.
- Test tests/t72b.py.
## 22/10 22:00 · Người dùng yêu cầu làm NGAY đồng bộ đồ họa toàn game → GOI_GPT_DOT15_DONG_BO_DO_HOA.zip (00_PROMPT_GPT_DOT15_DONG_BO_DO_HOA.md): 15a-mẫu 10 tệp → 15a UI kit → 15b icon 27 trang bị → 15c bệ → 15d tiến hóa → 15e vật phẩm.

## V73 · ĐÁ-2 (22/10 ~23:40) — build73.py → Phi_Doi_Sao_Bang_V73.html
- Trong src/stone71.js: STONE71.ab (25 mẫu: 7 chiến cơ 3–9, 6 giáp, 6 tên lửa, 6 tàu con; khóa bộ 1–3 & chiến cơ 0–2). Hiệu ứng quy về: ['dmg',p,cond] = +p ST của món (trộn theo tỉ trọng như đá chỉ số, CHỈ trong trận, không CP; trần +60%/món) · ['u',loại,v] tiện ích (superKill, shieldEvery, shieldPlus, bombConvert, buffAfterHit, pickBuff, healBoost, hpScale, killShield, grazeChain, grazeScore, hitInvuln, hitReduce, keepPower). Mô tả hiển thị đúng cái game làm (có ghi "trung bình" khi quy đổi).
- Ô 4 nhận α, ô 5 nhận β; Tím chỉ có viên purpleActive (½ số). Nguồn: Tinh hóa Tím/Tím S ('ex'), tụ hợp lên Tím/Cam 20% chuyên dụng, Tẩy đá.
- Tẩy đá: chuẩn 5→1 (8.000/25.000 ◈) ra viên ghim; lẻ 1 viên (2.500/8.000 ◈) 12%, chắc ở lần 15.
- 14 đá hiệu ứng mới: s1/w1 sạc sẵn VKTT (chung trần 20%), a1 giữ lượt VKTT, m1 rơi vật phẩm khi dùng VKTT (theo GPT Câu 6); s3 s4 s6 a3 a4 (diễn giải lại: hồi 1 bom mỗi 60/45 s vì game không có hồi chiêu bom) a5 (chỉ giảm ST, game không tụt cấp đạn khi trúng) a6 m3 (diễn giải: mỗi giây có khiên +điểm & +2◈, tối đa 60/ải) m5 w6.
- Chưa làm: chế độ Boss Vượt Hạn (khóa CP).
- Test tests/t73.py.
- 22/10 22:21 · Người dùng: CHỜ TRANH GPT Đợt 15 (15a-mẫu) rồi ghép. Chế độ BOSS VƯỢT HẠN (khóa CP, thiết kế ở GEMINI_TRA_LOI_DA_V70.md mục 8 + GEMINI_DA_V70_DATA.js overlimitBossMode) → LƯU LẠI, làm sau khi người dùng nhắc.
- 22/10 22:50 · GPT 15a-mẫu ĐẠT 10/10 (src/ui15). Ghép thử: build74_mau.py → Phi_Doi_Sao_Bang_V74_mau.html (skin15.css + SKIN15_BG, nền sảnh neo bệ 0,78; icon sảnh đặt bằng style inline vì luật nút neo-theme có độ ưu tiên cao). Sửa: nút gold/blue mỏng → PROMPT_GPT_DOT15a.md.
- 22/10 22:47 · Người dùng hỏi trang bị → PROMPT_GPT_DOT15b.md (15b-mẫu 5 tệp: 3 icon + 2 bệ, làm song song 15a).
- 22/10 23:10 · GPT 15b-mẫu: đạt 4/5 (src/gear15), rail_icon vẽ lại (giống khối đá). Ghép thử trong build74_mau.py (thay khóa gear_assets, giữ cỡ ảnh cũ ×2). → PROMPT_GPT_DOT15b_tiep.md

## Đợt 15a-1 (GPT) · ĐẠT, đã ghép thử vào V74_mau
- 31 PNG nằm trong src/ui15. build74_mau.py nạp thêm: nút nhấn/xám/đỏ/nhỏ, 7 khung phẩm chất, thẻ, tab, đầu panel, thanh, HUD pause/expand/skill/ring, bg_kho, bg_map (720×1280 webp).
- Ô Kho: thêm data-q từ V70F(it) (khung 0–3) trong adv70.js. ::after vẽ khung theo --u15-fq.
- #robot-skill thêm vào danh sách loại trừ nút toàn cục (dòng 60 build74_mau). Dùng hud_skill, nhãn nhỏ đặt dưới nút.
- Bản đồ chiến dịch vẽ cảnh theo chương (canvas .cm-bg), nên bg_map để dành cho màn Phó bản/Nhiệm vụ ở V74 chính thức.
- Đang chờ GPT 15a-2 (PROMPT_GPT_DOT15a_2.md): 6 tab + ui_tabbar + ui_tab_glow, 5 tài nguyên + kim cương/xu, 24 icon.

## Đợt 15b phần 1 (GPT giao 15/27, hết lượt vẽ đến khoảng 11:11 ngày 23/10)
- Đạt 10: aegis, mirror, reactive, inferno, cryo, thunder, rail, disc, solar, orbit36. Sửa 5: phase, orbital, singularity, spiral, lance36. Còn thiếu 12.
- Cả 15 tệp đã chép vào src/gear15 và ghép thử. build74_mau cắt icon theo vùng alpha trước khi thu nhỏ.
- Prompt tiếp: PROMPT_GPT_DOT15b_tiep2.md (độ phủ hạ xuống ≥35%, tên lửa hướng lên).

## Sảnh VKTT (showroom) · đã code (src/ult72.js showroom() + ult72.css, phần "SẢNH VŨ KHÍ TỐI THƯỢNG")
- Toàn màn hình: 3 ô (trợ chiến · chủ chiến tròn · trợ chiến), sân khấu với vòm, vòng xoay, hạt sáng, bệ viền cam, mũi tên đổi vũ khí, nút kỹ năng (mở hoặc thu chi tiết), CHIP, bảng chỉ số, nút LÊN BẬC / NÂNG CẤP / QUAY LẠI. Bản cũ vẫn giữ: đặt window.U72SR=false để dùng lại.
- Chuyển động riêng: hunter xoay 5 s, world xoay 24 s, web lắc, fortress phập phồng. Vũ khí chưa sở hữu bị tối màu và đứng yên.
- Biến tranh sẽ dùng: --u15-sr-bg, --u15-sr-plat (chờ GPT 15g).
- Đợt 16 hiệu ứng chiến đấu: đã gửi Gemini thiết kế (PROMPT_GEMINI_DOT16_HIEU_UNG.md).

## FX16 bước 1–3 (src/fx16.js, nạp trước skin69-css trong build74_mau)
- Đạn địch: thay Threat30.draw bằng stamp 3 vòng theo chương (level→chương). Đạn có tint30 dùng bảng màu gần nhất; đạn cưa (saw) vẫn vẽ bằng EnemyV2.
- Đạn ta: bọc Fighters28.draw để đặt globalAlpha (luồng phụ .62, chính .92, đông đạn ×.86/.72). Rep thêm trong drawShots V68 (FX16A).
- Trúng đòn: bọc Feedback31.damage (tia lửa + e.fx16f). Chớp sáng bằng cách vẽ lại quái ở chế độ lighter.
- Hạ quái: bọc kill và theo dõi boss.defeatStarted. Bọc damage và bomb để rung màn. Biên độ rung qua FX16S (rep thay rnd(-3,3)).
- Mặc định điện thoại đổi sang 'high' (rep matchMedia 700px). BloomQuality vẫn tự hạ xuống auto-light khi FPS thấp.
- Chờ Gemini sửa bảng E/F (PROMPT_GEMINI_DOT16_TRA_LOI.md), sau đó mới giao GPT tranh 16.1.
- Gemini đã sửa phần E/F (GEMINI_FX16_E_F.md, GEMINI_FX16_PATCH_E_F.js). Khi code, đổi mã: starhunter→hunter, lasergrid→web.
- 16.3: các thân trụ, cưa, trường và lưới đã có tranh từ Đợt 14 (ult_turret, ult_laser_tower, ult_saw_1..4, ult_time_field, ult_web_field). Chỉ đặt GPT vẽ phần hiệu ứng thêm (barrier, muzzle, clock/hand, shatter, grid_spark, cánh Bạo Tẩu, khiên, bom).
- Đã giao GPT 16.1 (PROMPT_GPT_DOT16_1_NO.md, 28 PNG nổ/tia lửa).

## Sảnh gọn + sáng (src/lobby74.js/.css)
- Ẩn .h1-side, .dk67 và .h1-fx. Cột trái giữ Viễn chinh, Giao dịch; cột phải giữ Hợp thể, Vũ khí TT, Thử thách ngày và nút TIỆN ÍCH. Trang #l74-more chia nhóm, mỗi ô gọi .click() của nút gốc.
- Sáng hơn: canvas filter brightness 1.16 / saturate 1.3, tia sáng CSS (mix-blend screen), nền xanh lam rực, thanh tài nguyên chia đều chiều ngang.
- Chiến cơ ở sảnh to hơn: Z 1.45→1.78, shipY .46→.5 (rep). Đạn demo ở sảnh mờ ×.62 (fx16 shotA2).
- Icon tạm dùng svg gốc hoặc ký tự; thay bằng icon 15a-2 khi có (ic_*).

## Sổ tay hướng dẫn (src/guide74.js/.css)
- 17 bài, mỗi bài 1–3 trang: basic, quality(V70), daily, chest, dungeon_gold, challenge, patrol, tower, endless, sss, eclipse, stone, ult, chip, pilot, trade, ch9. Nội dung viết theo số liệu trong code. Đổi số ở module gốc thì sửa chữ ở đây.
- Tự hiện 1 lần trong 2 trường hợp: (a) vừa mở khóa một tính năng (lần đầu cài thì các tính năng đã mở chỉ ghi nhận, không hiện; nếu >2 tính năng mở cùng lúc thì chỉ báo toast); (b) mở bảng tính năng lần đầu (sel: .adv70/.st71/.u72.srm/.c72/.pl67/.tr67).
- Xem lại: TIỆN ÍCH › SỔ TAY (nút ẩn [data-g74] trong .h1-side). Có ô tắt tự hiện. Lưu ở saobang-guide74-v1.

## Tư vấn bố cục (23/10)
- Đã gửi PROMPT_TU_VAN_BO_CUC.md cho Gemini và GPT (chỉ trả lời bằng chữ): kiểm kê lối vào, nháp 5 tab (SẢNH · CHIẾN ĐẤU · PHI ĐỘI · TRANG BỊ · CỬA HÀNG), xin khối JSON IA74.
- Các lối vào trùng đã thấy: Vô tận ×2, Rương ×2, Phó bản (Bản đồ + Rương), Cài đặt ×3, Chiến cơ ×2, Phi công ×2, Skin/Tủ skin, Kho/Phụ trợ, Hợp thể ×3, SSS tách 3 nơi.
- GPT đã trả lời tư vấn bố cục (GPT_TRA_LOI_BO_CUC.md). Đang chờ Gemini trả lời rồi gộp hai bản.

## Điều hướng 5 tab (src/nav74.js/.css), chốt 23/10 sau tư vấn GPT + Gemini (GPT_TRA_LOI_BO_CUC.md, GEMINI_TRA_LOI_BO_CUC.md)
- #nav74: SẢNH · CHIẾN ĐẤU · PHI ĐỘI · TRANG BỊ · CỬA HÀNG. #nav74s: dải tab con ngay trên thanh đáy, kèm hàng chip cho Chiến cơ (Skin, Khoe) và Hợp thể (Chiến cơ SSS, Trang bị SSS, Đột phá ★, Sảnh SSS). #tabbar cũ ẩn nhưng vẫn dùng để click hộ và đọc chấm đỏ.
- Tab con gọi màn cũ qua oldTab, Hub40.openSeg, hoặc proxy .click() nút gốc (Lobby74.src). Mọi lớp phủ chừa đáy bằng var(--n74h).
- Sảnh: hàng trên QUÀ · KHO BÁU · HỆ THỐNG; 2 trái + 2 phải đổi theo chặng (≤30 / ≤100 / >100); ẩn 2 nút Phi công / Kho chiến cơ (test t68b click nút này sẽ báo timeout, đúng như dự kiến); chạm thẻ phi công mở Phi công.
- Tuần tra nằm ở góc Bản đồ (.n74pat, hiện % trên 12 giờ). Thử thách, Quà và Hệ thống là trang phụ #nav74p.
- Chấm đỏ: Quà (chấm trên ribbon), Thử thách ngày (tắt khi đã mở 1 lần trong ngày), Tuần tra ≥ 6 giờ, VKTT có nhiệm vụ nhận được, và chấm cũ của #tabbar. Ô khóa hiện khi còn ≤ 15 ải hoặc là mốc kế tiếp.
- Bài Sổ tay 'nav' hiện 1 lần sau khi cập nhật (P.intro).

## Rương Vô tận tự mở + bảng kết quả (src/chest74.js/.css)
- Bọc reset, Chests.rewardBoss và end (có vòng kiểm tra mode dự phòng). Hết lượt Vô tận, mở các rương nhận trong lượt bằng Chests.open, rồi hiện #c74: thẻ có hình (trang bị qua Progress.art, chiến cơ cắt từ atlas) và mọi vật phẩm (so ảnh chụp trước/sau: hợp kim, đá, mảnh, nguyên liệu, phôi, đá khảm, đồ rơi, mảnh VKTT).
- Rương theo V70 (rep trong Chests.open → Chest74V70): không còn món Trắng + 2 mảnh. Mỗi lượt quay khung B [40,40,18,2], A [10,45,38,7] (A quay 2 lượt); Trắng/Lục → 6/12 mảnh; Lam/Tím → phôi đúng mẫu. SỐ TẠM, chờ Gemini cân.
- Mảnh giờ chỉ dùng để đúc phôi Lam (15 mảnh). Progress.merge (ghép đồ trùng kiểu cũ) bị chặn khi có V70, vì nó tăng enhance vượt qua hệ nấc. Ẩn nút #merge-btn, #quick-merge-btn, #clear-merge, #merge392, .material-btn trên trang chi tiết cũ.

## Bỏ mảnh chiến cơ / trang bị (23/10, người dùng chốt) · adv70.js + Frag74 (chest74.js)
- Phôi có 4 màu (0 Trắng · 1 Lục · 2 Lam · 3 Tím). forgeUp: 3 Trắng → Lục (0 ◈), 3 Lục → Lam (200 ◈), 3 Lam → Tím (3.000 ◈). Phôi Trắng/Lục rơi ra giữ nguyên là phôi (không còn biến thành mảnh). Phân giải món Trắng/Lục → phôi Trắng/Lục.
- Frag74: quy đổi mảnh cũ 15 → Lam, 5 → Lục, 2 → Trắng (chạy lại mỗi 4 giây). Workshop.grant bỏ qua fragments/gearFragments; grantCraft nhận trùng → +1 phôi Trắng; lọc dòng chữ "mảnh chiến cơ / trang bị" khỏi kết quả rollStage.
- Rương: phôi Trắng/Lục/Lam (không Tím), B 1 phôi [50,38,12], A 2 phôi [20,50,30]. SỐ TẠM.
- Bậc S/SS mới nhận (cấp 1, +0) → khung Lam (sync trong adv70).
- tests/t70 'forge' đã sửa theo cách đúc mới.
- Chờ Gemini: PROMPT_GEMINI_MANH_PHI_CONG.md (bậc phi công theo màu, nguồn mảnh phi công, cân rương, có bỏ mảnh của VKTT/Skin không).
- 23/10: VKTT giữ mảnh, nguồn mới là Vòng quay may mắn (free/ngày, thêm lượt bằng kim cương) và Phó bản giới hạn. Skin đổi mảnh như cũ + tặng skin theo mốc bộ trang bị. Kim cương là tiền mới chưa có trong game. Đã gộp tất cả vào prompt Gemini (PROMPT_GEMINI_KINH_TE_MANH_V74.md).

## Kinh tế V74 (src/econ74.js/.css), theo GEMINI_TRA_LOI_KINH_TE_V74.md
- Kim cương: lưu ở saobang-econ74-v1 (S.g). Nguồn: qua ải lần đầu 10 (ải chia hết cho 10: 25), 60★/chương 80, nhiệm vụ ngày 13/13/14, 15 nhiệm vụ trong tuần +100, điểm danh ngày 3 (+30) và ngày 7 (+70), thử thách ngày 15, tháp +20 mỗi 5 tầng. Chương và tháp được cộng bù cho tiến độ đã có. Ô 💎 hiện dưới lực chiến ở sảnh.
- Vòng quay (#w74, nút ribbon VÒNG QUAY): mở ở ải 45; 2 lượt free (lượt 2 cần 3 ải trong ngày); 40 💎/lượt, ×10 = 360 💎; trần 10 lượt trả phí mỗi ngày; bảo hiểm 10/50. Ult72.give({s,c,w}) mới thêm vào ult72.js.
- Phó bản giới hạn (#l74x): mở ở ải 45; 1 lượt free + mua thêm 30/60 💎; chọn ải boss có lực chiến đề nghị gần nhất, máu boss ×1,3; 60 giây (#l74timer). Thắng khi boss.defeatStarted → end(false) rồi hiện bảng thắng. Có ở trang Thử thách và hàng chip của Tối thượng.
- Quà skin theo bộ trang bị: 3 món đang mặc đạt mốc khung + cấp → Skin69.giveOwn/giveShard và danh hiệu (S.title, chưa hiện ở đâu).
- Rương: A [15,50,35], thêm hợp kim (B 150–250, A 300–500) và nguyên liệu Lục/Lam.
- CHƯA làm: phi công 12 nấc (PILOT74), nguồn mảnh phi công, làm mới Chợ Đen bằng 💎, gói càn quét 💎.
- 15b ĐỦ 27 icon, đã duyệt hết (lần 2: 17 tệp). Bộ 36 dùng icon riêng qua G36_ICONS (build74_mau thêm CSS .g44-<id> và bọc Progress.art). Việc tiếp của GPT: 16.1 (nổ).

## 23/10 · Đã ghép 15a-2 + 15g + 16.1
- 15a-2: 40 icon thu nhỏ còn 96px webp, nằm trong `<script id="icon74">ICON74`. nav74 dùng ICMAP74/IC74 cho tab, chip, thẻ, nút sảnh và ribbon. guide74 dùng GIC/gIc. Thanh tài nguyên thay `<i>` bằng res_da_nang_cap/res_hop_kim/res_loi, chip kim cương dùng res_kim_cuong. #nav74::before dùng --u15-tabbar (inset -5px -18px để cắt lề ảnh), tab đang chọn có --u15-tabglow.
- LỖI ĐÃ SỬA: script id="nav74" trùng id với thẻ nav#nav74, nên CSS #nav74 làm script hiện thành chữ. Đã đổi thành nav74-js. Không đặt id script trùng id phần tử.
- 15g: --u15-sr-bg (720×1280), sr-plat, sr-plate, sr-smain, sr-ssup, sr-arrow. CSS `.u72.srm` ở cuối ult72.css. .sr-dome bị ẩn vì nền đã có vòm.
- 16.1: src/fx16art/*.png → FX16_ART (script fx16-art, 522KB). fx16.js thêm addExp/addRing/addSpr/addDebris/drawSprites. Khung nổ vẽ source-over, vòng/tia vẽ lighter. Sóng 01/02 nhuộm màu bằng tinted(). onKill: nhỏ 380ms, tinh anh 500ms, boss 760ms + 2 nổ phụ. Ở chế độ lite bỏ tia sprite và mảnh vỡ. FX16_ART là const nên đọc bằng typeof, không qua window.
- Test t70–t73 đều errs [].
- Đã gửi GPT: GOI_GPT_DOT16_2.zip (PROMPT_GPT_DOT16_2_DAN_TA.md): 41 PNG đạn ta, chớp nòng và laser, cùng 5 icon 15a-3 (ic_vong_quay, ic_pho_ban_gh, ic_qua, tab_chien_dau, tab_cua_hang). Khi nhận: map ICMAP74 combat→tab_chien_dau, shop→tab_cua_hang, ribbon QUÀ→ic_qua, VÒNG QUAY→ic_vong_quay, limited→ic_pho_ban_gh.

## 23/10 chiều · Đã ghép 16.2 + 15a-3
- 16.2: src/fx16art/fx16_pb_*, fx16_beam_* → FX16_ART (tổng 69 tranh, 727KB). PB16 nằm trong fx16.js, cài sau FX16Run.
  - Bọc Arsenal30.draw ngoài cùng: đạn thường dùng pb_<id>_t<1..3> (nấc l0-1→t1, l2-3→t2, l4→t3). Không có nấc thì lùi về nấc thấp hơn. Cỡ HT={1:46,2:54,3:62}×k. Tàu bắn nhiều viên [0,2,4,7,8,9] nhân .88/.74/.6 theo nấc.
  - Tia ray28 (tàu 1, 5): luôn vẽ beam_<id>_body nối dọc, cuộn theo thời gian. Ở nấc thấp có thêm xung pb t1/t2 chạy dọc tia. Đầu chạm (tip) hiện ở quái gần nhất trong s.hit. Bản to (tàu 1 l4, tàu 5 l≥2) thì tip luôn hiện.
  - Chớp nòng: bọc Arsenal30.fire để ghi mz, bọc ShotV2.drawMuzzle vẽ pb_<id>_muzzle trong 0,07 giây.
  - Tắt: window.FX16PB=false. Màu đạn theo bậc phẩm chất (withTier/withShotTint) không áp lên tranh GPT.
- 15a-3: ICMAP74 combat→tab_chien_dau, shop→tab_cua_hang, gifts→ic_qua, wheel→ic_vong_quay, limited→ic_pho_ban_gh. Ribbon VÒNG QUAY dùng IC74('wheel').
- Test t70–t73 đều errs [].
- Đã gửi GPT: GOI_GPT_DOT16_3.zip (PROMPT_GPT_DOT16_3_KY_NANG.md), 18 PNG hiệu ứng VKTT, cánh Bạo Tẩu, khiên và bom. Thân trụ, cưa, trường và lưới dùng lại tranh Đợt 14.

## 23/10 · Đã ghép 16.3 (18 PNG, vào FX16_ART, tổng 87 tranh, 1062KB)
- fx16.js:
  - addFx(k,x,y,s0,s1,ms,{col,alpha,comp,vr,rot,ease,follow}) cho sprite một lần; addShards (mảnh văng, không trọng lực).
  - Bom: bọc bomb, khi bombs giảm thì vẽ lõi bomb_core và 2 vòng bomb_hexring nhuộm #00f5d4 / #9bffd4.
  - Khiên: bọc damage, so shield trước và sau. Khi shield giảm thì hiện shield_dome và shield_ripple bám theo tàu. Khi shield về 0 thì văng 8 mảnh shard.
  - Bạo Tẩu: drawWings() khi superTime>0. Mặc định cánh vàng, cánh cầu vồng khi Combat26 skill đang bật. Cánh xòe ra trong 0,22 giây, nhấp nháy ở giây cuối.
- ult72.js fx163() (tắt bằng window.FX163=false):
  - Pháo Đài: vách barrier cuộn giữa các trụ/tháp liền kề, muzzle khi có mục tiêu.
  - Thế Giới: đồng hồ world_clock và 2 kim quanh tàu (kim quay 1 vòng trong 0,26 giây rồi khựng). Khi hết thì vỡ thành shatter.
  - Săn Sao: saw_slash bám theo cưa ult hoặc cưa đã tiến hóa, nổ vệt chém khi cưa hết thời gian.
  - Lưới Điện: grid_beam chạy 4 cạnh và 2 đường chéo, grid_node ở 5 nút, grid_spark ngẫu nhiên mỗi 0,22 giây.
- Test t70–t73 đều errs [].
- Đã gửi GPT: GOI_GPT_DOT15c.zip (PROMPT_GPT_DOT15c_BE.md), 34 bệ tên lửa và tàu con normal/super. inferno_pod_normal và rail_pod_normal đã có trong src/gear15. Khi nhận: đưa vào src/gear15, build sẽ đè lên gear_assets theo khóa <mã>_pod_<normal|super>. Kiểm tra lại vòng lặp gear15 override có nhận khóa pod không.

## 23/10 · Đã ghép 15c (34 PNG vào src/gear15)
- build74_mau: vòng gear15 nay nhận cả khóa pod chưa có trong A. Bộ 36 lấy cỡ theo loại (tên lửa 80×112, tàu con 64/128, ×2). Mỗi khóa có tranh gear15 thì **xóa EVO 'g:<khóa>_evo1/2'** (tranh tiến hóa cũ khác phong cách). Món +3/+5 hiện tranh gốc cho tới khi có 15d.
- gear45.js: bộ 36 không có trong GEAR_FX BY nên chiến đấu vẫn đi đường cũ Equipment25. Chỉ thay phần vẽ: bọc Equipment25.draw, bỏ món 36 khỏi danh sách vẽ cũ rồi tự vẽ pod mới. Tên lửa đặt ở ±58, y+16, cỡ 40×56. Tàu con đặt ở ±78, cỡ 40/64. Ảnh super dùng khi superTime>0. Tắt bằng window.POD36=false.
- Bạo Tẩu: cánh giảm xuống alpha .4, rộng 196, thấp xuống 12 để đỡ che tàu.
- Test t70–t73 đều errs [].
- Thử trong trận: phải mở trang mới cho mỗi bộ đồ. Progress.equip trả false sau khi đã reset() một trận. Sau equip phải gán gear=Progress.stats().
- SSS ghép (sss_*) vẫn dùng icon, bệ và evo cũ. Cần một đợt GPT riêng sau 15d.
- Đã gửi GPT: GOI_GPT_DOT15d_1.zip (PROMPT_GPT_DOT15d_1_ICON_TIEN_HOA.md), 54 icon evo1/evo2 cho 27 món. Khi nhận: đặt vào src/evo/gear/<mã>_icon_evo1|2.png. Phải đổi build để vòng gear15 KHÔNG xóa khóa evo mới (chỉ xóa nếu tệp evo không nằm trong danh sách mới, hoặc nạp evo mới sau vòng gear15).
- Đã gửi Gemini: GOI_GEMINI_KE_HOACH_V75.zip (00_PROMPT_GEMINI_KE_HOACH_V75.md): phê bình, kế hoạch V75–V78, PLAN75, câu hỏi chốt.

## 23/10 · V75 theo PLAN75 + QUEST_CONFIG_V77 của Gemini
Người dùng chốt: thêm hệ Thể lực; phi công dùng PILOT74 kèm nguồn mảnh Tháp; giữ quà 7 ngày 3.400 💎; đạn địch giữ màu theo chương (không làm viền đỏ).
- **Tẩy tự động** (stone71): nút "TẨY TỰ ĐỘNG". Lặp Tẩy lẻ, mỗi lần cách 1 khung hình + 60 ms. Dừng khi trúng viên ghim, khi hết đá/◈, khi bấm DỪNG, hoặc ở trần 50 lần. Đã bỏ phần "tier ORANGE/RED" của Gemini vì game tẩy theo kiểu định hướng (ghim viên muốn nhận).
- **Chợ Đen** (trade67): ô thu mua mảnh trang bị (đã chết sau khi bỏ mảnh) đổi thành 2 phôi Trắng (V70.phList mới). Hàng làm mới mỗi 6 giờ; làm mới tay 50 💎 (5 lần/ngày). Thêm 1 ô "QUẦY KIM CƯƠNG" bốc theo trọng số: 10 mảnh phi công 250 💎, phôi Lam 200 💎, 5 vé càn quét 80 💎, vé Phó bản giới hạn 150 💎 (Econ74.addTry).
- **Phi công 12 nấc** (pilot67, PILOT75):
  - thêm S.tier; trần chỉ số giữ mức cũ (A 73/4/4, S/SS 100/6/6);
  - f = m/4,1 × (0,55 + 0,45·lv/60);
  - nâng nấc cần đạt trần cấp, tốn mảnh + ◈;
  - giá lên cấp theo cấp tương đương bản cũ × 0,6, lõi ở cấp 40 và 60;
  - đổi bản cũ: tìm nấc + cấp thấp nhất có CP ≥ bản cũ, rồi cộng bù theo bảng Gemini. Hệ quả: phi công cũ đã cao cấp nhảy lên nấc rất cao (A Lv30 → Tím+5 Lv58), vì đường tăng chỉ số cũ dồn nhiều ở đầu;
  - chiêu mộ vẫn theo điều kiện cũ;
  - nguồn mảnh: Tháp mỗi 5 tầng 5–12 (+30 ở tầng 50, +60 ở tầng 100), Vô tận đợt 20/30 cho 1–3.
- **V75** (src/v75.js/.css):
  - Thể lực: tối đa 120, +1 mỗi 6 phút. Chơi lại ải đã qua tốn 5 (chặn trước reset), càn quét tốn 5. Lần đầu qua ải và các chế độ khác miễn phí. Mua +100 với giá 60/90/120 💎, 3 lần/ngày.
  - Vé càn quét: rep trong Campaign36.sweep gọi V75.takeTk() khi đã dùng hết 10 lượt.
  - Thẻ tháng 1.200 💎: nhận ngay 300; mỗi ngày 70 💎 + 50 🔋 + 3 🎫; +10% ◈ và ⬢ từ ải.
  - Quà 7 ngày: phần thưởng map sang vật phẩm thật (phôi Lam chiến cơ, 20 mảnh Săn Sao, 3 phôi Lam trang bị, 30 mảnh phi công chính, 3 đá Lam, 1 skin chưa có).
  - Chip 🔋 nằm cạnh 💎 ở sảnh. Trang QUÀ có thêm 3 dòng: 7 ngày, Thẻ tháng, Thể lực.
- **Q77** (src/q77.js): nhiệm vụ ngày 8 việc / 140 điểm, mốc 20–100 (100 💎); nhiệm vụ tuần 7 việc / 600 điểm, mốc 100–500 (300 💎).
  - Hook: rewardStage (campaign/tháp), sweep, useEn, end (vô tận), V70.promote, Stone71.put, tẩy, Chợ Đen, boss.defeatStarted, Thử thách ngày xong (+2).
  - GEM74 dailyMission/weeklyMissions đặt về 0 (Missions393 vẫn tự trả ◈). Nút NHIỆM VỤ ở trang QUÀ mở Q77.
  - Quy đổi vật phẩm không có trong game: ghi ở đầu q77.js.
- Bạo Tẩu: đạn ta nấc 3 alpha .6 (PLAN75 PLAYER_RAMPAGE_ALPHA).
- Sổ tay: cập nhật bài gem (thêm trang Thể lực), pilot (thêm trang 12 nấc), trade.
- Chưa làm: RENDER.PARTICLE_CAPS (fx16 đã có trần riêng), GATING (đã khớp), Mùa giải 14 ngày (Gemini đang hỏi có làm tiếp không).
- Test: t67, t70–t73 đều errs []. Test tay: /tmp/claude-0/t75.py, t75b.py, tpil.py, tq77.py.

## 23/10 · Mùa giải 14 ngày (S77) + Độ sâu trận đấu V76 (C76)
- **S77** (src/s77.js): 20 cấp × 500 XP, Làn Tinh Anh 1.500 💎 (+1.000 XP). Chu kỳ = floor(now/14 ngày).
  - Hết mùa: tự gửi các thưởng đã đạt mà chưa nhận rồi đặt lại. Lùi giờ máy quá 5 phút thì tạm khóa.
  - XP: thể lực 1:1 (≤250/ngày, bọc Q77.track('energy')); mốc năng động 60/100 cho +100/+150 (bọc Q77.claim); tầng Tháp mới +30; Vô tận sống >90 s +40 (3 trận/ngày); Thử thách ngày +80.
  - Vật phẩm không có trong game được quy đổi, ghi ở đầu tệp. Skin độc quyền chưa có tranh nên tạm thay bằng skin chưa sở hữu.
  - Econ74.addSpin: vé vòng quay (S.wtk) cộng vào freeLeft.
- **C76** (src/c76.js):
  - Graze combo bọc Combat26.graze; giữ +5% gốc, nạp thêm tối đa +50% ở combo 100; điểm ×1→5; mốc 20/50/100 theo Gemini; trúng đạn thì về 0. HUD "GRAZE ×n" + vòng đếm ngược.
  - 4 ấn tố tinh anh: bọc addEnemy để gán (ưu tiên e.elite, thiếu thì 18% quái thường), số con theo ải. SHIELD chặn đạn chính bằng rep trong vòng va chạm (C76run.blocks), bom phá khiên. NOVA chết bắn 12 viên. DASHER lượn và lướt. GRAVITON làm chậm và hút theo dải ngang ±45. Hạ tinh anh +◈.
  - Boss ải 20 (ch1) và ải 60 (ch3) ở Chiến dịch: ghi đè b.fire/laser/skill=99, chạy 3 pha của Gemini, đổi pha ở 70/30% thì xóa đạn 0,5 s. Laser và cột sét đi qua beams (angle28). Drone hộ vệ dùng addEnemy (drone76).
  - emit nhân enemyScale nên eb() chia lại cho đúng px/s thiết kế.
- Sổ tay thêm bài 'elite76' (mở ở ải 20).
- Test t67, t70–t73 đều errs []. Test tay: /tmp/claude-0/ts77.py, t76.py, t76b.py.

## 23/10 chiều · Sửa trang cũ + yêu cầu người dùng + Đồ giám V77 + Boss Vượt Hạn V78
- **Lỗi trang cũ:** nút "Trang chi tiết đầy đủ"/"Khảm ngọc · Lò ghép" của Hub40 gọi UI392.showTab(…,true) nên mở màn cũ cuộn dọc (mảnh, cường hóa, ngọc). Đã chặn bằng listener capture trong nav74; ẩn hangar/arsenal bằng CSS; nút 'gems' chuyển sang Phi đội › SSS.
- **Boss tiến vào** (c76): trong lúc boss.y < 136/150 (tối đa 6 s) thì chặn Arsenal30.fire, Equipment25.update và damageBoss, hiện chữ cảnh báo. Khi boss vào vị trí thì toast "KHAI HỎA".
- **Siêu cấp xóa đạn** (c76): đạn quái được gắn own76 qua EnemyFleet.fire/enemyFire. Hạ quái khi superTime>0 thì xóa đạn own76===e (và b.turret===e), mỗi viên +10 điểm.
- **Codex77** (src/codex77.js):
  - 18 SSS chia 4 hệ (bảng ở đầu tệp). Hiệu ứng 2 và 3 món: Hỏa (bỏng/quầng/cầu lửa), Băng (chậm 12%, +10% giáp, đóng băng đạn), Lôi (CRIT77 cộng vào interval CRIT66 của pilot67, sét lan), Hư Vô (+2 s Bạo Tẩu, hút vật phẩm, hố đen).
  - Đồ giám 63 mục, nhân Công/Máu/Giáp qua Combat.stats + allyDamageScale + maxHp/maxShield khi reset.
  - Mốc 25%: +5% rơi · 50%: hồi sinh 1 lần/ngày (chặn damage chí tử) · 75%: window.ENERGY77 (v75 rc()) · 100%: +5%.
  - Bộ skin: HURT77 (rep 4,5 − 0,5), C76.GRAZE.WINDOW 4,2, tốc độ ×1,08. Danh hiệu .cx-title gắn vào thẻ phi công ở sảnh.
- **O78** (src/o78.js):
  - 10 bậc ở ải 80…160; máu ×2,5×1,38^(t−1); đề nghị 15.000×1,12^(t−1); 150 giây.
  - Giáp hộ thể 20%, bọc damageBoss; choáng 4 s, +50% sát thương.
  - 5 từ tố, chọn ngẫu nhiên 3 mỗi tuần: MIRROR, ECLIPSE (canvas sương riêng, source-over), OVERHEAT (chặn Arsenal30.fire), EMP (đảo chuyển động), GRAVITY.
  - Thưởng lần đầu mỗi tuần + huy hiệu, có cửa hàng. Vào trận bằng Lobby.hide()+reset() (không qua nút #start vì Meta40.gate chặn khi CP thấp). Ải 180 không khởi động được bằng reset trực tiếp nên trần là 160.
  - Thẻ "BOSS VƯỢT HẠN" ở trang Thử thách (nav F.overlimit). V75 không thu thể lực khi O78.run().
- Sổ tay thêm 2 bài: overlimit, codex.
- Test t67, t70–t73 đều errs []. Test tay: /tmp/claude-0/t76c.py, tcx.py, to78.py.

## 23/10 17:xx · Đã ghép 15d-1 (54 icon tiến hóa)
- Tệp nằm ở src/evo15/gear/<mã>_icon_evo1|2.png. Build nạp vào EVO SAU vòng gear15 nên không bị xóa; thu về 256px webp.
- src/evo15.js: Kho (Hub40) dùng Progress.art nên trước giờ không hiện icon tiến hóa (Evo53 chỉ phủ ô #hgr41 .h1-slot cũ). Đã thêm class .evo15-<mã>-<1|2> theo V70EF (+3 → evo1, +5 → evo2) cùng một stylesheet sinh từ EVO53_ART.
- Sao lưu: EXTRA63 thêm các khóa V74–V78 (econ74, guide74, nav74, v75, Q77, S77, codex77, O78). Trước đó các khóa này không được sao lưu.
- Đã gửi GPT: GOI_GPT_DOT15d_2.zip, 36 bệ tiến hóa <mã>_pod_normal_evo1|2. Khi nhận: đặt vào src/evo15/gear/ (EVO 'g:<mã>_pod_normal_evo1'). Evo53.gearAssets tự dùng theo bậc. Tỉ lệ khác tranh gốc thì có nhánh 'fit' tự xử lý.
- 23/10 17:40 · Mô phỏng kinh tế 30 ngày (/tmp/claude-0/sim/econ.py). 💎 thu 424/ngày (F2P mới) → 1.318/ngày (cuối game, Vượt Hạn chiếm 63%). Đã soạn PROMPT_GEMINI_CAN_BANG_V75.md.

## 23/10 18:00 · Ghép BALANCE75 (Gemini cân bằng kinh tế)
- q77.js: mốc ngày 5/10/10/10/15 💎 (+3K/5K ◈, 20 🔋 ở mốc 40) = 50 💎/ngày; mốc tuần 25×4+50 = 150 💎 (+10K ◈ ở mốc 100).
- v75.js ENERGY: hồi 1/5 phút; chơi lại ải thường 6, ải boss (n%5==0) 10, phó bản tài nguyên 15 (Dungeons.active → stN=-1), càn quét 6/ải. Lần đầu qua ải vẫn miễn phí (giữ thiết kế cũ, Gemini không ép).
- econ74.js: quay trả phí leo thang 40×3 / 70×3 / 120×4 (W.tiers, pPrice), ×10 = tổng 10 lượt kế = 810 💎, chỉ khi chưa quay trả phí trong ngày.
- o78.js: REWARD_FIRST (trọn đời, S.life) 150/250/400 💎 · 30K/60K/100K ◈ · 300/600/1000 huy hiệu (+phôi Lam T4–7, +3 lõi T8–10); REWARD_WEEK 10/12/23 💎 · 10K/20K/40K ◈ · 70/100/230. Người chơi cũ: S.life = 1..S.best (đã nhận thưởng lớn).
- trade67.js BM75: + PURPLE_FODDER_RANDOM 600 💎 (1/tuần), RARE_PILOT_BOX_15 350 💎 (2/tuần, mảnh S, thiếu thì A), SSS_OVERCLOCK_STONE 150 💎.
- oc75.js (MỚI) Khế Ước Tinh Luyện SSS: món SSS ≥ +5, 1 đá hoặc 150 💎 + 20K ◈ → +0,5–1,5%, trần +15%; nhân vào Gear44.dmgMult (rep trong build). Chip TINH LUYỆN trong HỢP THỂ. Key saobang-oc75-v1 (đã thêm backup). Chặn khi đang chơi.
- Mô phỏng 30 ngày (/tmp/claude-0/sim/econ_b75.py): A 424→354/ngày, B 447→377, C 870→499, D 1318→523 (gồm quà 7 ngày 3.400 💎 và thẻ tháng). Bỏ quà 7 ngày: A ~241/ngày.
- Test: t67, t70–t73, t75b (mới: wheel/energy/o78/oc75) đều errs [].

## 23/10 18:30 · Ghép 15d-2 (một phần)
- 22 PNG vào src/evo15/gear/: 18 bệ tên lửa evo1/2 (đủ 9 mã) + tàu con evo1 disc/rail/ricochet/solar. rail/ricochet evo2 (lõi bị tím) để ở src/evo15/gear/_cho_sua/, KHÔNG nạp.
- Bộ thường: GEAR_FX đã tự dùng EVO53_ART 'g:<mã>_pod_normal_evo1|2' qua Evo53.gearAssets (+3/+5; SSS +6/+10).
- Bộ 36: gear45.js pod36 nay chọn evo theo V70EF (+3 evo1, +5 evo2), chỉ dạng thường; tắt bằng window.EVO36=false. window._pod36 để test.
- Test t75c (bệ evo trong trận) + t67/t70–t73/t75b errs [].
- Gửi GPT: PROMPT_GPT_DOT15d_2b_BU_TAU_CON.md (12 thiếu + 2 làm lại).

## 23/10 19:xx · Phản hồi chơi thử trên điện thoại
- Kín màn hình: build rep clamp H 680..1400 (trước 1100) → canvas phủ hết máy dài.
- Đạn quái: fx16.js drawBullet vẽ to ×1.5 (window.BUL75), đế tối mờ + viền màu chương nhấp nháy (tắt: window.BUL75RIM=false). Hitbox không đổi.
- Độ khó: v66.js BULLET66 mới (burst/cd/cap/hp tăng); build rep Waves30 budget min(40,min(23,17+(l-1)/14)+w*3), nhóm 1 ≤10, nhóm 2 ≤13, gọi nhóm sau khi còn ≤3 (≥ải 20: ≤4).
- Giao diện: nav74.css — thẻ bảng max-height min(92dvh,100%) (trước 92vh tràn sau thanh URL Android), nút adv-btns dính đáy; #hub40 .hb-body chừa 28px cuối; hb-top nền đặc. econ74.css vòng quay zoom .86 ở ≤380px, tiêu đề chừa chỗ ✕.
- QA độc lập (agent Sonnet) 4 khung 360–430: chỉ lỗi vòng quay 360px (đã sửa); Cửa hàng tự kiểm: sạch. Script ở tests/qa75/ (dens.py đo mật độ đạn).
- Gửi Gemini: PROMPT_GEMINI_RA_SOAT_V75.md (đường cong độ khó, đội hình, độ đọc đạn, boss ch2/4–9, 30 phút đầu, 15 ca kiểm thử).

## 23/10 20:xx · Ghép REVIEW75 (Gemini rà soát toàn diện)
- v66.js BULLET66: mốc at 1/10/20/40/60/100/140/180 theo Gemini; burst/eliteExtra/fan/cd/gap/cap/bossCd đủ 100%; speed = px/s ÷300.
  hp/hpElite/dmg pha trộn với bảng cũ (_old) theo window.DIFF75 (mặc định .5 — Claude quyết, tránh tường kẹt; 1 = đủ Gemini).
- build reps Waves30: budget min(48,min(28,20+(l-1)/10)+w*4); nhóm .35/.40/còn lại (≤14/18/16); gọi nhóm sau khi còn ≤5/6/8 quái hoặc sau 5.5/4.8/4.2 s (gt75);
  số đợt 4/5/6/7 theo ải 20/60/120, ải ÷5 bớt 2 (≥2); hàng quái nhóm 1 co giãn ≤400 px (không tràn màn).
- rv75.js (mới): 3 đội hình PINCER_CROSS/VORTEX_ORBIT/SINE_WEAVE (40% nhóm thường từ ải 21, y×H/1100); chống tường đạn (>14 viên/110 px → đạn mới lệch 12°);
  cờ fix75 bỏ kẹp 260 px/s; vệt sáng (loot beam) dưới sao/vật phẩm. Tắt: RV75_FORM/RV75_DENS/RV75_BEAM=false.
- b75.js (mới): boss 3 pha chương 2/4/5/6/7/8/9 (ải 40/80/100/120/140/160/180), ~40 kiểu đòn; đổi pha xóa đạn + nghỉ .5 s; boss chỉ bắn khi đã vào vị trí.
  Test: window.__b75r = tỉ lệ máu giả. Tắt: window.B75=false.
- fx16.js đạn: 3 lớp (đế đen .78 × .95 bán kính vẽ, tranh màu chương, lõi trắng); vẽ ×1.3 (BUL75). Tắt lớp: BUL75RIM=false.
- ux75.js (mới): Càn quét ×5 (rep cm-sw5 trong bảng ải bản đồ), ẩn mềm tab TRANG BỊ<ải 3, CỬA HÀNG<ải 6, PHI ĐỘI<ải 12, thẻ "VÌ SAO THUA?" + nút dẫn tới Kho.
- q77.js: nút NHẬN TẤT CẢ (claimAll). guide74.js: không tự bật bảng — băng thông báo 4 s (banner), đọc lần đầu +20 💎; giới thiệu bố cục 5 tab cũng thành banner. window.G75MODAL=true để trả kiểu cũ.
- KHÔNG làm (ghi rõ): Prologue lái thử SSS ải 1; Đá khảm ở ải 25 (game mở ở 70); đổi quà ngày 4; slow-motion lúc chết.
- tests/t75d.py (15 mục Gemini phần tự động): tab người mới, vòng quay, thể lực, Vượt Hạn, Graze 20, nhóm quái sau 0,46 s, trần đạn 180, khe an toàn ≥131 px, đổi pha xóa đạn, đội hình, gợi ý thua, Nhận tất cả, càn quét ×5 — errs [].

## 23/10 21:40 · Nghiên cứu + giao việc định hướng
- Đọc: Game Developer 'Bright, slow and deadly'; shmups.wiki Boghog 101; changelog Galaxy Attack 73.6.
- Gửi Gemini: PROMPT_GEMINI_LO_TRINH_V76_V80.md (tự phản biện tốc độ đạn 420 px/s, nhịp lặng/mid-boss, công bằng trúng đòn + đệm bom, lớp điểm, sự kiện 2 tuần, NG+, lộ trình V76–V80).
- Gửi GPT: GOI_GPT_RA_SOAT_V75.zip (15 ảnh + PROMPT_GPT_RA_SOAT_HINH_ANH_V75.md: 15 vấn đề hình ảnh, đạn ta vs đạn địch, thân riêng cho 7 boss, kế hoạch đợt 17.x+, phác boss CH2 768×384).

## 23/10 22:xx · GPT rà soát hình ảnh + Gemini ROADMAP76_80 → ghép V76
- GPT (rà 15 ảnh): áp phần code ngay: đạn ta mờ hơn (PB16 ×0,6 — window.PB76A; hierarchy .78/.48/.62; sảnh HANGAR_DEMO ×0,5), nền trận phủ #071020 α .28 (rv75 bọc Report392.background — window.BG76),
  chấm hitbox khi đang kéo (fx16 drawDot dùng `pointer`), đạn liềm vẽ thành đạn tròn đặc (BUL76CR=false để trả lại), đế đen nhỏ .7 + viền trắng mảnh + lõi trắng, nội dung letter-spacing 0, rút gọn số chip sảnh (K/M, ux75 abbr).
- Gemini ROADMAP76_80 (V76): v66 BULLET66 mới (speed = px/s ÷ 408, 135→225; cap ≤180; cd/gap/hp/dmg mới), DIFF động .5→1 theo ải/120, ≤.75 nếu CP < 85% (window.__cp76 tính mỗi reset).
  build reps: Threat30 kẹp dưới 120 (đầu) / gần tàu = 80% (≥100); warning boss 3 s; nghỉ giữa đợt 1,8 s.
- fair76.js (mới): đệm bom 180 ms (damage('bullet') chờ; bomb trong lúc chờ = CỨU NGUY), sau trúng bất tử ≥1,5 s + xóa đạn 160 px + đẩy 160–240 px, viền đỏ 280 ms,
  nguy kịch <25% (vòng đứt 58 px + ! + viền đập 0,9 s + còi 880 Hz/2,5 s), hút vật phẩm khi màn sạch quái, đạn vận tốc kép (≥ải 40, viên lẻ 0,72×),
  Tàu Vận Tải Tinh Ngân (sau đợt 2, 5,5 s, pinata 25%, hạ = +1 cấp đạn 12 s + ◈×4 tinh anh; đang vẽ khung vàng chờ tranh). Tắt: FAIR76=false / BUF76=false.
- tests/t76.py: đệm, cứu nguy, nguy kịch, tốc độ (123/149/161 px/s), quái thưởng — errs []. Hồi quy t67, t70–73, t75b, t75d sạch.
- Chưa làm (V77+ theo lộ trình): huy chương liên hoàn, hạng B/A/S/S+, Tiệm Danh Dự, mid-boss, boss ÷5 2 pha (chờ PROMPT_GEMINI_V77_BO_SUNG.md); sự kiện 14 ngày (V78–79); Thăng Hoa (V80).
- Gửi GPT: PROMPT_GPT_DOT17_1_BOSS_PHA_KHONG.md (3 pha + chân dung + loot_carrier + 7 tàu con 18.1).

## 23/10 22:40 · Ghép V77_SPEC (Gemini)
- src/v77spec.js: khối V77_SPEC nguyên văn (18 boss phụ, 6 mid-boss, huy chương, hạng, Tiệm Danh Dự).
- b75.js: kindNow trả 'SUB:CHn:SUB_ODD|SUB_MID10' cho ải ÷5 không chia hết cho 20 (2 pha, ngưỡng 50%; tắt B77SUB=false); specOf() chuẩn hóa; boss cuối chương B75 nay nhân tốc độ ×0,72 (trần 230) cho khớp đường cong chậm; runOn() chạy đòn trên vật thể bất kỳ.
- v77.js (mới): huy chương liên hoàn (đội hình group30 hạ trọn, không chiếc nào thoát), mid-boss ải ≥61 không ÷5 khi bắt đầu đợt 4 (B75.runOn, 20 s rút lui, hạ kịp +1.500/xóa đạn/huy chương),
  xếp hạng B/A/S/S+ (bọc finishStage36; thẻ gắn vào bảng CHIẾN THẮNG), thưởng % runCredits + đá ⬢, Xu Tinh Anh (lần đầu S +1/S+ +3, 3 trận/ngày +3/+4, Thử thách ngày +4, Tháp mỗi 5 tầng +10),
  Tiệm Danh Dự (CỬA HÀNG › DANH DỰ, nav sub 'honor'): 6 món; "Đá tẩy khảm" → 1 đá khảm Lục ngẫu nhiên (game tẩy bằng đá cùng bậc); vệt đuôi vàng, vòng Graze lục bảo, danh hiệu +2% tốc độ (bật/tắt). Key saobang-v77r (đã backup).
- guide74: bài 'rank77'. tests/t77.py — errs []; toàn bộ hồi quy sạch.
- Còn lại: dấu sao bạch kim trên nút ải bản đồ (chỉ hiện trong thẻ hạng), sự kiện 14 ngày (V78–79), Thăng Hoa (V80), tranh boss/huy chương/mid-boss từ GPT.
- 23/10 23:xx: bỏ vòng tròn ::after quanh sao bảng CHIẾN THẮNG (#rs .rs-star::after display none, v75.css).

## 24/10 · Lễ hội + điểm danh + V78 (FEATURES_V78 của Gemini)
- fest78.js: lễ hội theo lịch thật (Bí Ngô 20/10–3/11, Noel 20/12–4/1, Tết & Trung Thu theo bảng âm lịch 2027–2031, 30/4, 2/9); quà ngày 20 💎 + 3K ◈; hạ quái 4% rơi vật phẩm (×3 quái lớn, trần 60/ngày);
  tiệm đổi (◈, 15 💎×5, mảnh phi công, phôi Lam, danh hiệu + hào quang); hạt trang trí nền trận (FEST78_FX=false). Dòng đầu bảng QUÀ (g_fest). Test: window.__fest78='noel'… Key saobang-fest78.
- build rep Meta40 DAYS: ngày 7 = 4.000 ◈ + 300 ⬢ + 10 mảnh (> tổng ngày 1–6).
- f78spec.js: FEATURES_V78 nguyên văn. bk78.js (mới): PHÁ VÂY + THỬ THÁCH HẠT GIỐNG (thẻ trong CHIẾN ĐẤU › THỬ THÁCH; mở ải 10/15).
  window.__m78 = đang trong lượt → V75 không thu thể lực, V77 không chấm hạng, FAIR76 không gọi Tàu Vận Tải; window.__bk78w ép số đợt (build rep waveTotal); window.HURT77_78 (rep hurtbox).
  Bọc finishStage36 (chặng xong → bảng Ấn Chú/tiếp tế/chặng sau, không gọi rewardStage), end(false) (hồi sinh Lõi Sinh Mệnh / kết lượt), damage (khiên Ấn Chú), Combat.factor (nhân sát thương Ấn Chú), damageBoss, Arsenal30.hit, Combat26.graze, kill, activateSuper, addEnemy (máu ×1→1,6 theo chặng), reset.
  Ấn Chú Claude quy đổi (engine không làm đúng được): F1 → +18% sát thương; F4/V3 → đòn lan; V5 → +30% sát thương + bóng mờ; I6 → +45% sát thương khi đứng yên; T5 phá đạn sát nòng; T6 → +1 bom/chặng; I1 bỏ phần giảm sát thương.
  Không dùng chuẩn hóa chỉ số cố định (BaseATK 1000…) của Gemini vì engine không có các chỉ số đó — độ khó lấy theo tiến độ người chơi.
- GPT trả lời 5 tính năng: 44 PNG (seal_icon_01–24 + 3 khung thẻ, ui_daily_rank_header + 3 huy chương, ui_stage_badge, mining_station_lv1–3, pilot_dialogue_01–08 + ui_bond_emblem). Đợt 17.1 vẫn ưu tiên.
- 24/10 07:40 · Phản hồi: (1) máy tính: dải nền full-width sau thanh tab (body.nav74on::after), tab chia đều khi bị ẩn (#nav74 grid-auto-flow column). (2) Đạn ta sáng lại: PB16 ×0,88, hierarchy .9/.6/.7.
  (3) Đạn quái nhỏ ~14%: BUL75 1,12. (4) Vật phẩm/buff/sao: rơi xuống, dừng ở dải đáy (90–93% H), không hết hạn (d.t kẹp 5,5), tự hút trong 160/200 px (fair76, tắt LOOT78=false). tests/t78c.py.
