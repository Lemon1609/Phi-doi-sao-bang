# BÀN GIAO DỰ ÁN PHI ĐỘI SAO BĂNG · V174 (2026-10-31)

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
