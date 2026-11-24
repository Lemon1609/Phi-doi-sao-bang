# BÀN GIAO V2.2.0 — ĐÃ XUẤT BẢN 24/11/2026 ~14:40

## Xuất bản (chủ dự án "Duyệt xuất bản V2.2.0" 13:24)
- Dựng sạch từ `v22-dang-lam` 59e374f (`BAN_THU=1 python3 build74_mau.py`, 86.679.545 byte). Hồi quy LẦN LƯỢT: t156 14/14 · t209 20/20 · t_v22 14/14, cả bản chèn `window.EVO21=false`.
- `www/` (split.py, 60 tệp + index, 81,3 MB) mở được: menu, Plume22 + U22 bật, 0 lỗi. Nhánh `build-apk-v198` = 0af1739, `VERSION`=`V2.2.0` → workflow run 43 → Release **`V2.2.0.43`** (tag = VERSION.run; versionCode 43, versionName V2.2.0.43).
- APK `PhiDoiSaoBang-V2.2.0.43.apk` 72.443.105 byte, sha256 `267bc75af447d9f9da4dc730f94d822b3b61b02429f677be3fce7d1bcb67483b`; chữ ký `CN=Phi Doi Sao Bang, O=Lemon1609, C=VN` SHA256 `B1:34:…:DC:0E` TRÙNG V2.1.42 → cài đè giữ dữ liệu. `assets/public` trùng từng tệp với `www/` đã kiểm.
- Nguồn: nhánh `v22-dang-lam` là lịch sử riêng (gốc dba3d9b, nội dung = 0ec531c + V2.2) nên KHÔNG đẩy nhanh vào `nguon-v212` được; chưa gộp (cần ghi đè, chờ chủ dự án).
- HTML offline: gửi trực tiếp trong chat (zip 62,7 MB) — phiên Claude không tải tệp nhị phân lên Release được (proxy chỉ nhận thân JSON).
- PHÁT HIỆN: repo `Lemon1609/Phi-doi-sao-bang` đang CÔNG KHAI (`visibility: public`), trái luật khóa — đã báo chủ dự án, chưa tự đổi.


Nền: V2.1.42 đã xuất bản (Release `V2.1.42`, APK 71.884.363 byte, chữ ký trùng V306.39). Nhánh nguồn V2.2: `v22-dang-lam` (tách từ `nguon-v212` 0ec531c). **Chưa dựng sạch, chưa chạy t156/t209 cho V2.2.** Chỉ kiểm trên bản vá nhanh (`claude_tools/v22_kiem/va22.py` vá lên HTML V2.1.42).

## 0b. Cập nhật 24/11 12:40 (phiên 2, tiếp) — U22 + Túi đồ + PLUME22 (CHƯA xuất bản, chưa tăng phiên bản)
- **U22** (`src/u22.js`): đồng bộ nút vát 45° / nền / khung toàn game, khung avatar 4 nền (phoenix/ice/thunder/void + holy/jade), audit 28 màn `claude_tools/v22_kiem/audit_ui.py` (biến `DBG='<js>'` in kết quả đo), bảng `bang_audit.py`.
- **Túi đồ (11:29)**: bỏ huy hiệu góc +X / ✦ trên ô, OC hiện ϟ sau tên, cột phải thoáng (hàng ≥86 px, nút không co), tag ĐANG DÙNG xanh + nút CƯỜNG HÓA vàng vát góc, "Phòng thủ", "2.09s" (commit 727a2a5).
- **PLUME22 đuôi lửa ion-plasma** (commit fc4f6ed, tắt `window.PLUME22=false`, bỏ khi dựng `PLUME22=0`): tranh gốc `assets/vfx/thruster_plumes.png` → `claude_tools/v22_plume_cat.py` → `src/plume22img/plume_{cyan,gold,crimson,void}.webp` 96×224 (alpha=max RGB, gỡ nhân alpha). Neo: `claude_tools/v22_plume_neo.py` → `src/plume22_anchors.json` (`THRUSTER_ANCHORS`: ship 13×bậc(+_bt), pod wg_/sw_, ctf/ctr tham khảo, el = hệ màu; chỉnh tay tàu 8 = 2 họng vàng). Chiến Thần / robot đo NGAY TRÊN Ô ATLAS ĐANG VẼ (ghi lệnh drawImage của SSSGame.draw khung trước → hàng/tâm/cỡ; atlas hop309 có lúc vẫn là tranh robot cũ nên bảng tĩnh không đủ), lưu `THRUSTER_ANCHORS.rt`. Móc: `l3309` back (chiến cơ), `tb309` → `window.__pim22` + podWing (tàu con, cả nhánh Bạo Tẩu cánh mini), `a10309` Kho (`__sid22`), `fx18` flame/engine/podFx → Plume22 (thần hóa, tên lửa Kho). Cỡ lớp: tàu con .45 · chiến cơ 1 · Chiến Thần 1,45 · robot 1,55; nhịp Y .90–1,14 X .95–1,05 lệch pha; Bạo Tẩu ×1,45 α .95 (thường .82); nghiêng ±4–7° ngược vận tốc ngang (trận). Đo CPU: ~0,03 ms/khung (184 luồng/47 khung, headless không GPU — chưa có số FPS máy thật). Kiểm: t156 14/14 · t209 20/20 · t_v22 14/14, cả `EVO21=false`. Bảng `docs_claude/T15_duoi_lua_dong_bo.jpg`; chụp `claude_tools/v22_kiem/p22_chup_tran.py` (JOBS, OFF=1), `p22_chup_ct.py`, `p22_do_atlas_ct.py`, `p22_chi_phi.py`.

## 0. Cập nhật 24/11 09:20 (phiên 2) — chủ dự án chốt 4 ý 07:01
- (1) ĐỒNG Ý luật trúng đòn: mất máu khi không khiên → hạ 1 cấp đạn (không khi Bạo Tẩu, tối thiểu Lv1; đòn bị nội tại giáp chặn không mất máu → giữ cấp). Cặp thứ 4 trong `claude_tools/v22_rep.py`, cờ `window.LV22=false`.
- (2) Thanh ngọc 5 ô (đúng số lỗ) — giữ như đã làm.
- (3) Đồng Hồ giữ "ngưng đọng thời gian", 2 tầng KÍCH HOẠT THƯỜNG / QUÁ TẢI (đã có; sửa lỗi màn `#as22` + tab VKTT Kho hiện mã "world" và ô Bậc/Cấp trống: `ULT72` là const → dùng `Ult72.C`, `src/v22.js`).
- (4) Đội hình tàu con: tâm = mép cánh thật (×1,22) + nửa phần ĐẶC tàu con (`tb309.js` ghi `window.__podh22`, quét alpha>60, đệm WeakMap) + khe `GAP22` 10 px, trong [62, 100] (trần 100 thay 96 vì tàu 10 Bạo Tẩu cánh 71,7 px — ưu tiên không đè cánh). Đo `claude_tools/v22_kiem/do_khe22.py`: khe Thường 10–23 px, Bạo Tẩu 10–16 px.
- VKTT đo (`job_vktt_do2.json`, Vô tận 120 s, cộng `spend()` thật qua bộ đếm `Ult72._B.sp22`): Lưới Điện cũ 0,122 / mới 0,670 d0 → `VKK` ×0,2 (đo ×0,3 = 0,225); Pháo Đài mới 0,31 (cũ không vào được trận trong job — bước `reset()` lúc được lúc không, không phải do VK22; tính ≈0,24 khi ném bom mỗi 20 s) → ×0,8; Săn Sao ×0,9 (đo 0,198 vs cũ 0,180); Đồng Hồ giữ. Chỉ kỹ năng cơ bản; đổi bằng `window.VKK22={web,fortress,hunter}`.
- Sửa nhãn TỔNG LỰC CHIẾN ở Kho bị cắt góc (clip-path `.cp42` của V2.1.42) → `clip-path:none` trong `v22.js`.
- Dựng sạch `BAN_THU=1 build74_mau.py` (86,6 MB / thử 100,2 MB): t156 14/14, t209 20/20, `tests/t_v22.py` 13/13 — cả EVO21 bật và tắt. (2 sửa v22.js sau đó vá thẳng vào HTML, đã có trong nguồn.)
- Bảng `docs_claude/T13_giao_dien_V22.jpg`, `T14_tong_hop_V22.jpg` (job `claude_tools/v22_kiem/job_t13.json`, ghép `bang_t13_t14.py`). Chờ chủ dự án duyệt / "duyệt xuất bản".

## 1. Đã làm (mã nằm trong nhánh)

### A. Lỗi màn kết quả (máy thật, video_1)
- **Nguyên nhân nảy ngược**: `End78.goLobby` bấm `#dock-return`; ở mode `reward` nút đó gọi `end(false)` → mode `over` (THẤT BẠI) → vòng 250 ms `apply()` bật lại màn kết quả.
- Sửa `src/end78.js`: hàm `clean(keepScreen)` dọn trận (Revive393.close, Missions393/Progress.flush, cancelSkill, Dungeons.finish, xóa đạn/quái/boss, PlayScreen.exit nếu không keepScreen, lockCraft(false), best, `mode='menu'`, Progress.setLocked(false), ẩn overlay/reward-display/dock-return, bỏ res78). VỀ SẢNH nay về `Nav74.tab('home')`. Tắt: `window.END22=false`.
- `src/end22.js` (mới): màn kết quả gọn — ẩn `.rs-grid,.rs-hint(3★),.s206(So với lần trước + 4 ô + 2 thanh tỉ lệ),details,.dps98,.q7tem, dòng nhỏ hạng`, bỏ ô vật phẩm = 0, ẩn hợp kim trùng ở lưới chi tiết; tiêu đề "VẬT PHẨM ĐẠT ĐƯỢC"; thua: ẩn điểm/hạng, khối lực chiến `fx68` chỉ hiện khi thanh < 100 % (đổi chữ "LỰC CHIẾN CHƯA ĐỦ"). Hàng nút `#e22a`: VỀ SẢNH (thép) + ẢI TIẾP (thắng) / CHƠI LẠI (thua) — chỉ khi lượt là chiến dịch thường (theo dõi lúc vào trận, loại phó bản/Khe Nứt/Anh Hùng/Tháp/…) và `Progress.canStart`. ẢI TIẾP/CHƠI LẠI = `End78.clean(true)` + đường vào ải chuẩn (gamemode campaign, mission-select, `#start.click()` → reset có trừ thể lực của v75). `keepScreen` cần thiết: thoát toàn màn hình rồi `fullscreenchange` tới muộn sẽ tạm dừng trận mới.
- Đo (bản thử): bấm VỀ SẢNH → mode `menu` suốt 4 s, overlay ẩn, không nảy lại; ẢI TIẾP → ải 13 mode play; CHƠI LẠI → ải 12 mode play.

### B. Đội hình / lửa đuôi / chống lóa / P Bạo Tẩu
- `claude_tools/v22_rep.py` (PAIRS22, build exec): tàu con `space = clamp(nửa sải cánh thật ×1,22 + 18, 62..96)` (nửa trên +12, tối thiểu 52) — nửa sải ghi từ `l3309` (`window.__half22`); lùi sau 40 px (cũ 26). Cờ `FORM22`. (Anh yêu cầu ±54–66, nhưng tàu đo rộng ±57–68 nên ±62 bị cánh che → dùng mép cánh thật; nói rõ khi báo.)
- Kho (`a10309.js`): tàu con ở `S×clamp(.43×tỉ lệ ảnh+.1, .4, .62)`, lùi `S×.1`; `l9b309.js` dự phòng `.44`.
- Lửa: `fx18.js` `plumeImg(col)` tính điểm ảnh 1 lần/màu (kim lõi trắng → màu, đuôi lông vũ mờ về 0), nhấp nháy 0,92–1,08; `l3309` flame dùng `FX18API.flame`; bỏ elip trắng ở miệng xả; `tb309.js` bỏ 2 tam giác phẳng dưới tàu con. Cờ `PLUME22`.
- Chống lóa: `evo21.js` cánh Bạo Tẩu α .9 → .66 + `feather22` (khoét mềm gốc cánh, dựng 1 lần/ảnh), cánh tàu con cùng cách; `l3309` viền hào quang ×.55. Cờ `AG22`. Đo khung trắng: tắt cánh giảm điểm trắng 0,52 → 0,18 %; sảnh vẫn còn sáng hơn trận (chưa đo lại sau sửa).
- P: hết Bạo Tẩu → luôn về power 5 (P4/4, ngay dưới Bạo Tẩu), nhặt 1 P → Bạo Tẩu; nhặt P khi đang Bạo Tẩu +2,5 s (trần 6/9 s) thay vì nạp đầy. Cờ `OD22`. Đo: P4→hết→power 5; power 2 → hết Bạo Tẩu → 5; 3 → 5,43; 5 → 7,43 (trần 9). **Game hiện KHÔNG hạ cấp đạn khi trúng đòn** (anh nói "như thường lệ") — chưa thêm, cần hỏi.

### C. Giao diện V2.2 (`src/v22.js`, ảnh `src/ui22img/`, gốc `assets/ui_v22/`)
- `claude_tools/v22_assets.py`: khung 4 ảnh tách nền đen (cả lòng trong), thêm 2 khung nhuộm (Thánh Quang vàng, Lục Bảo); icon 2×2 → ic_map/chest/trophy/core; hangar_bg 540 px webp. `claude_tools/v22_embed.py` → `window.UI22_IMG`.
- Sảnh: nền hangar_bg, 14 hạt bụi CSS, vòng xoay CSS dưới tàu, ẩn `.l74-rays`; khung avatar lên `#lb68-pp`; chạm chân dung / tên → HỒ SƠ.
- Hộp thoại viền kép (#040D21, viền ngoài #164E87, trong 1 px #2496FF, thanh đầu 44 px, ✕ vuông vát) cho `.m63`, trang phụ, Tháp, …(`html.v22m`). Chưa làm: tạm dừng canvas riêng (V2.1.42 đã có), nút Back Android chỉ có aria-label "Đóng" trên ✕ mới.
- Kho: lưới `minmax(0,1fr) 34 26 38 96`; TỔNG LỰC CHIẾN vàng trái trên, TRANG PHỤC (ngọc) + ← TRỞ LẠI phải; dải CÔNG/MÁU/GIÁP; tab PHI CÔNG (4 ô trang bị + lối tắt) | VŨ KHÍ TỐI THƯỢNG (3 ô VKTT lục giác–tròn–lục giác, khóa ải 100/120). Thẻ: nền gradient theo `data-f17`, huy hiệu cánh V vàng khi SSS/thức tỉnh, viên +N/MAX giữa đáy (đọc `Stone71.hostOf(key).tag`), thanh ngọc = **5 ô** theo `Stone71.C.slotN` (anh ghi 6, game chỉ có 5 lỗ — không bịa ô thứ 6).
- HỒ SƠ `#hs22`: avatar + khung + đá hạng (theo ải cao nhất), tên sửa được, UID (từ `saobang-meta-v407`.id) + chép, LỰC CHIẾN vàng, danh hiệu L8309, tab TRANG BỊ | CHIẾN TÍCH (8 ô). Đếm boss hạ bằng bọc `defeatBoss`. Khóa `saobang-hoso22-v1` {name, av, fr, unl, bk, uid}.
- TRANG PHỤC & KHUNG AVATAR `#fr22`: radar CSS xoay, tab PHI CÔNG (mở L8309 / Pilot67) | AVATAR (chân dung phi công đã có) | KHUNG AVATAR (Không, Thép Lam, Hoàng Gia ải 20) | KHUNG GIỚI HẠN 6 khung: Phượng Hoàng Lửa (thức tỉnh #01 hoặc ải 30, +2 % Công) · Hàn Băng (Tháp 20, +3 % Máu) · Lôi Đình (5 SSS, +3 % Công) · Hư Không (Chiến Thần +10, +3 % Công +2 % Máu) · Thánh Quang (100 ải 3★, +4 % Máu) · Lục Bảo (200 boss, +2/+2). Điều kiện + chỉ số 2 khung cuối do Claude đặt. Chỉ khung đang đeo có hiệu lực (bọc Combat.factor/stats + reset maxHp). Tắt `window.V22HS=false`.
- 5C (`src/ult72.js`, cờ `VK22`): Săn Sao 8 vật phẩm (cũ 10→8) · Lưới Điện sau 20 lần hạ địch, đặt lưới vào quái nhiều máu nhất (bỏ cd + kích khi Bạo Tẩu) · Pháo Đài khi trúng đòn (hồi 4 s) hoặc mỗi 18 s: pháo chắn đạn sống 6 s + xóa đạn bán kính 120 (bỏ kích bằng bom) · Đồng Hồ khi vào Bạo Tẩu (hồi 6 s, bỏ cd) · Tối thượng choáng boss 1,2 s (qua `stop()` có trần khống chế boss). Mô tả kỹ năng đổi theo. Xuất `Ult72.skillText(id,r)`. Màn TIẾN BẬC THÀNH CÔNG `#as22` (dò `Ult72.state().w[id].r` tăng khi màn VKTT mở): chữ chìm tên, ảnh dạng mới, 2×2 (Bậc, Cấp tối đa, Cấp, Dạng), thẻ KÍCH HOẠT THƯỜNG / QUÁ TẢI, chạm ngoài để đóng. Giữ nguyên tên kỹ năng cũ; "vùng chậm 45 %" của anh CHƯA làm (Đồng Hồ vẫn là ngưng đọng thời gian như cũ).
- **Ngân sách sát thương VKTT CHƯA đo**: đếm qua `Report392.hit(...,'ult72')` ra 0 (kể cả bản cũ) → không tin được. Lần đo kế: đếm kích hoạt bằng `Ult72._B.ents` (`_B` là ĐỐI TƯỢNG, không phải hàm), job `claude_tools/v22_kiem/job_vktt_do.json` (Vô tận, 45 s, tàu bất tử, bay tới vật phẩm; `pre` cấp VKTT Tím Lv60 làm chủ chiến; bản cũ thêm `window.VK22=false`). Chạy LẦN LƯỢT, 8 lượt ~10 phút, không dựng song song.

## 2. Việc còn lại (theo thứ tự)
1. Đo ngân sách VKTT (mục trên) → chỉnh dps nếu lệch > ~10 %.
2. Dựng sạch: `BAN_THU=1 python3 build74_mau.py` (~17 phút; build đã nối PAIRS22 + UI22_IMG + end22 + v22 ở cuối). Rồi `python3 tests/t156.py <abs html> <dir>` (14/14) và `python3 tests/t209_on_dinh.py <html>`, cả với `<script>window.EVO21=false</script>` sau `<head>`. Chạy lần lượt.
3. Thêm kiểm thử P Bạo Tẩu (Lv4 → Lv3 → +1 P → Lv4, +2,5 s) và màn kết quả (VỀ SẢNH không nảy) vào bộ hồi quy (tests/ mới).
4. Rà màn hình 390×844 với `--safe-top` giả (V2.1.42 có `--satn`), bảng `T13_giao_dien_V22.jpg` + `T14_tong_hop_V22.jpg` (bản nháp: `docs_claude/T14_tong_hop_V22_ban_thu.jpg`).
5. Chỉ xuất bản khi chủ dự án nói "duyệt xuất bản": build-apk-v198 đặt `VERSION` = `V2.2` (tag sẽ là `V2.2.<run>`), split.py, push, kiểm chữ ký.
6. Cập nhật CLAUDE.md + tài liệu này; hợp nhánh `v22-dang-lam` → `nguon-v212` khi xong.

## 3. Câu cần hỏi chủ dự án (ĐÃ CHỐT 24/11 07:01 — xem mục 0)
- Có thêm luật "trúng đòn không khiên hạ 1 cấp đạn" không (game hiện không có)?
- Thanh ngọc 5 ô (đúng số lỗ thật) thay 6 ô được không?
- Đồng Hồ: giữ "ngưng đọng" hay đổi thành "vùng chậm 45 %"?
- Khoảng cách tàu con: theo mép cánh (62–96) hay ép cứng ±54–66 (sẽ đè cánh)?

## 4. Công cụ
- Vá nhanh: `python3 claude_tools/v22_kiem/va22.py <html V2.1.42 sạch> <ra> end78 end22 evo21 fx18 l3309 a10309 l9b309 tb309 v22 ult72` (so khối mô-đun với `git show 0ec531c:src/…` = V2.1.42).
- Chụp: `python3 claude_tools/v2142_kiem/cap42.py <html> <ra> <jobs.json>`; job mẫu trong `claude_tools/v22_kiem/`.
- Bản thử đã vá: `Phi_Doi_Sao_Bang_V22_thu.html` (gửi cho chủ dự án 24/11, không phải bản phát hành).
