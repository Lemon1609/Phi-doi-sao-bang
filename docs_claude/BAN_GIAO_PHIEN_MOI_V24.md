# BÀN GIAO CHO PHIÊN CLAUDE MỚI · Phi Đội Sao Băng · 28/11/2026 21:10

Đọc theo thứ tự: tệp này → `CLAUDE.md` (gốc repo: luật + trạng thái theo thời gian) → `docs_claude/CHUAN_PHONG_CACH_DA_CHOT.md` (mục QUY ĐỊNH HIỆN HÀNH) → `docs_claude/BAN_GIAO_V22.md` (đầu tệp = các đợt gần nhất).

## 0. Lời mở đầu dán cho phiên mới

> Em là Claude, tiếp quản dự án game HTML/APK "Phi Đội Sao Băng" của anh Bùi Doãn Bình. Gắn repo GitHub `Lemon1609/phi-doi-sao-bang` (quyền push), clone về `/home/claude/phi-doi-sao-bang`, checkout nhánh `v24-combat-feel`, đọc `docs_claude/BAN_GIAO_PHIEN_MOI_V24.md` rồi `CLAUDE.md`. Luôn trả lời tiếng Việt, ngắn, trung thực, nói rõ cái gì đo được / nhìn bằng mắt / chỉ đề xuất. Việc đang chờ: anh duyệt bảng `docs_claude/T34_v24c_xungkich_boss_ruong.jpg` (V2.4-C). Chưa dựng APK; chỉ xuất bản khi anh nói "duyệt xuất bản".

## 1. Repo, nhánh, mốc

- Repo: `https://github.com/Lemon1609/phi-doi-sao-bang` (Public; khóa ký APK CHỈ nằm ở GitHub Actions Secrets — không bao giờ commit/in/gửi khóa).
- Nhánh đang làm: **`v24-combat-feel` = `40a8dae`** (V2.4-C). Tách từ `v23-ui-meta` (`04eeadf`).
  - `e74ec94` V2.4-A + A2 — ĐÃ DUYỆT 100 % (T31, T32)
  - `b577b49` V2.4-B — ĐÃ DUYỆT 100 % (T33)
  - `40a8dae` V2.4-C — **CHỜ DUYỆT** (T34)
- Nhánh khác: `v23-ui-meta` (V2.3, bản thử APK V2.3.0-rc1.46), `v22-dang-lam` (V2.2.x đã xuất bản), `nguon-v212` (nguồn cũ V2.1), `build-apk-v198` (nhánh workflow dựng APK = `7728475`), `main`, `thu-v231-tau8`.
- Tag phát hành gần nhất: `V2.3.0-rc1.46` (bản thử), `V2.2.2.45` (bản chính gần nhất).
- Repo nặng (~1,6 GB .git): clone nông nếu cần `git clone --depth 30 -b v24-combat-feel …`.

## 2. Dựng và vá nhanh

- Dựng đầy đủ (~20 phút): `BAN_THU=1 python3 build74_mau.py` → `Phi_Doi_Sao_Bang_V74_mau.html` (+ `Phi_Doi_Sao_Bang_THU.html`). Build tự gọi `claude_tools/v24_rep.py` `apply_build` (chèn `perf24`, `v24`, `snd24`, `v24c` + ảnh `WING24_IMG` / `V24C_IMG`; `PKC26_IMG` gồm cả `src/nen24img`).
- APK: `claude_tools/ext22.py` đẩy ảnh ra `www/assets/` (V2.4-B nền → `bg/`, V2.4-C → `fx/` + `ui/`). Quy trình Release/ký: xem CLAUDE.md mục "Khóa cứng" + ghi chú V2.3.0-rc1.
- Vá nhanh lên bản đã dựng (không mất 20 phút), dùng LẦN LƯỢT:
  1. bản dựng V2.4-A sẵn có (`Phi_Doi_Sao_Bang_V74_mau.html` dựng 28/11 15:20 đã có V2.4-A)
  2. `python3 claude_tools/v24b_rep.py <A> /tmp/b.html`
  3. `python3 claude_tools/v24c_rep.py /tmp/b.html /home/claude/work/v24c.html` (chạy lại trên bản có v24c vẫn được: thay khối)
  - Hai tệp vá thay nguyên khối `music96` / `pkc26` / `v24-js` / `target307-js` — chỉ đúng khi khối trong HTML trùng nguồn trước đó (đã kiểm). Sau khi `git pull` thay đổi lớn, nên dựng sạch.

## 3. Kiểm tra (chạy LẦN LƯỢT, không song song)

| Bài | Lệnh | Kết quả gần nhất (bản v24c) |
|---|---|---|
| V2.4-C | `python3 tests/t_v24c.py <html>` (`CHUP=thư mục` để chụp) | 18/18 hai lượt liền |
| V2.4-B | `python3 tests/t_v24b.py <html>` | 20/20 |
| V2.4-A2 | `python3 tests/t_v24a2.py <html>` | 7/7 |
| U4 | `python3 tests/t_u4_v23.py <html>` | 27/27 |
| V2.2 | `python3 tests/t_v22.py <html>` | 22/22 |
| Cốt lõi | `python3 tests/t156.py <html> <thư mục>` | 14/14 |
| Nền | `python3 tests/t_pkc26.py <html>` | 9/9 |
| Giao diện | `python3 claude_tools/v22_kiem/audit_ui.py <html> <ra>` ×3 | 32/32 sạch ×3 |
| ms/khung | `CPU=1 ST=10 python3 tests/do_phan24.py <html> <ra.json>` | xem mục 5 |

Chụp bảng: `tests/chup_v24b.py` + `claude_tools/bang_t33.py`; `tests/chup_v24c.py` + `claude_tools/bang_t34.py`.

## 4. Đợt V2.4 — mô-đun, ảnh, cờ tắt

- **V2.4-A/A2** `src/perf24.js`, `src/v24.js/.css`, `src/wing24img/` (20 nửa cánh, gốc `src/ship118_cho/V24_canh_gpt_*.png`). Cờ: `V24 V24WING V24FX V24A2 DG24 BOSS24 PERF24 DOM24 NEN24`.
- **V2.4-B** `src/nen24img/` (4 webp 203 KB, cắt `claude_tools/nen24_cat.py`, gốc `src/ship118_cho/V24_nen_gpt_9064{6..9}.png`), `src/pkc26.js` (5 vùng), `src/snd24.js/.css` (12 tiếng dựng sẵn, nhãn nhạc, GO!), `music96.js` M24B, `l6309.js`/`dan307.js` định tuyến tiếng. Cờ: `NEN24B SND24 MUS24B MT24 GO24`.
- **V2.4-C** `src/v24cimg/` (6 webp 137,5 KB, cắt `claude_tools/v24c_cat.py <thư mục có 90657.png 90658.png> src/v24cimg`), `src/v24c.js/.css`, `v24.js` huy hiệu, `target307.js` thẻ Mục tiêu, `pkc26.js` ×2,4, boss `BOSSXL24` (rep trong `v24_rep.py`). Cờ: `V24C BLITZ24 LASER24 CORE24 CHEST24 BOSSXL24 TG24`; giữ pha để chụp: `__go24u`, `__vt24u`, `__c24hold`.
- Chi tiết từng mục: CLAUDE.md (3 dòng V2.4 ở đầu phần Trạng thái).

## 5. Số đo và giới hạn (nói thật với chủ dự án)

- Máy đo không có GPU → ms/khung dao động ±10 ms giữa các lượt; một số lượt `do_phan24` không vào được trận (≈17 ms, bỏ). V2.4-C so với V2.4-A (6 lượt mỗi bản, ms TB): quái 67,5→70,1 · cảnh báo 56,8→61,7 · Boss 57,2→53,0 → **chưa thấy tăng có ý nghĩa nhưng chưa chứng minh được**; cần số máy thật (bật Cài đặt › ĐO FPS).
- Nền 2 lớp: 2–3 lệnh `drawImage`/lớp (màn 480×1041 > ảnh 781), tô đè 2,00 màn — chủ dự án chấp nhận giữ.
- Điểm Vô tận 0 % đổi: hút tinh thể sau Xung Kích ở Vô tận chỉ là hình; tông quái cộng điểm như khi tắt V2.4-C (đo).
- Ở Chiến dịch, hút ★ thật 0,6 s sau Xung Kích (★ chỉ cho điểm trận) — đã nêu trong báo cáo.

## 6. Việc đang chờ / kế tiếp

1. Chủ dự án duyệt T34 (V2.4-C). Nếu duyệt: lưu ảnh gốc `/home/claude/goc_v24c/9065{7,8}.png` (có trong gói bàn giao `anh_goc_cho_duyet/`) vào `src/ship118_cho/V24_v24c_gpt_*.png` + ghi `CHUAN_PHONG_CACH_DA_CHOT.md` + cập nhật CLAUDE.md "ĐÃ DUYỆT".
2. Chưa dựng APK cho V2.4 (chủ dự án dặn "chưa cần"). Khi được yêu cầu: dựng sạch → hồi quy → quy trình Release như V2.3.0-rc1.
3. Chưa gộp `v24-combat-feel` vào nhánh nào khác.

## 7. Bẫy đã gặp (phiên này)

- Bài kiểm vào trận: dùng t193 `setup` + t209 `start`, đặt `window.__st80=0` (không thì hội thoại cốt truyện đứng trận), thêm option `mission-select`, `Progress.canStart=()=>true`, thử vào tối đa 3 lần.
- `finishStage36(true)` cần `boss.dead=true` và **ải trước đó đã qua**: `Progress.rewardStage` dùng `canStart` nội bộ (không phải `Progress.canStart` đã ghi đè) → trả null, màn kết quả không hiện. Bài kiểm gọi `Progress.rewardStage(1..29)` ở Sảnh trước khi vào ải 30.
- Quái giả phải đúng dạng `{x,y,hp,v:0,type:0,age:0,phase:0,fire:999,dead:false}`; dạng khác bị dọn ngay.
- `startBoss()` chỉ chạy ở ải boss (ải %10); boss vào sân mất ~8 s (đợi `boss.y≥110`).
- `dq309` tự vẽ tia laser khi bắn (không gọi hàm gốc) → lõi trắng laser vẽ trong lớp `VisualFX.draw`.
- Hoạt ảnh CSS trên máy đo chậm theo khung (~3–4 s mới xong lật rương) → bài kiểm chờ 4,5 s.
- Ảnh chụp DPR 2 trễ ~0,5 s → dùng cờ giữ pha (`__go24u`, `__vt24u`, `__c24hold`) và ghim `beam.age`.
- Lệnh `rm -rf` thư mục trong `/home/claude/anh/…` bị chặn bởi kiểm an toàn → ghi ra thư mục mới.
- Job dài chạy tách (`setsid nohup … &`) rồi đợi bằng các lệnh `sleep` ≤ 2 phút.

## 8. Tư liệu / prompt / dữ liệu

- Tin soạn sẵn cho Gemini/GPT: `docs_claude/de_xuat_cho/` (114 tệp) và các `docs_claude/GUI_GEMINI_*.md`; trả lời Gemini đã nhận: `docs_claude/de_xuat_cho/GEMINI_TRA_LOI_*.md`.
- Tham chiếu game gốc: `docs_claude/tham_chieu/`.
- Ảnh gốc đã chốt: `src/ship118_cho/` (V24_canh_gpt_*, V24_nen_gpt_*, các V307/V309 cũ).
- Bảng duyệt: `docs_claude/T31…T34_*.jpg`.
- Dữ liệu NGOÀI repo (máy phiên cũ, sẽ mất): bản HTML thử `/home/claude/work/v24c.html` (90 MB — dựng lại theo mục 2), ảnh chụp `/home/claude/anh/V24C7`, log đo `/home/claude/do24c`. Thứ cần giữ đã đưa vào gói zip bàn giao.
