# BÀN GIAO DỰ ÁN PHI ĐỘI SAO BĂNG · V145 (2026-10-30)

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
