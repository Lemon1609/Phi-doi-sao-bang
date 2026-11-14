# BÀN GIAO CHO PHIÊN CLAUDE MỚI · PHI ĐỘI SAO BĂNG · V212C · 08/11/2026

Đọc tệp này trước. Nhật ký chi tiết từng phiên bản (mới nhất ở trên) nằm ở `docs_claude/BAN_GIAO_CLAUDE_V202.md`. Các báo cáo và tin nhắn đã gửi GPT / Gemini nằm ở `docs_claude/`.

## 0. Vai trò và cách làm việc
- **Chủ dự án:** người Việt. **Luôn trả lời bằng tiếng Việt**, ngắn gọn, trung thực, nói rõ cái gì đã kiểm chứng.
- **Claude là lập trình viên chính.** Việc gồm:
  - ghép tranh của GPT và số liệu / thiết kế của Gemini;
  - đo mọi thứ bằng bot (Playwright);
  - đăng bản web (artifact), dựng APK, gửi bản HTML ngoại tuyến;
  - mỗi đợt viết báo cáo ngắn kèm **tin nhắn soạn sẵn để chủ dự án dán cho GPT / Gemini**. Chủ dự án tự chuyển tin, Claude không liên lạc trực tiếp.
- **Mỗi bản phát hành chỉ gửi:** HTML ngoại tuyến + APK + ảnh chụp + báo cáo khi cần. **Không** xuất bản thử `_THU`, gói nguồn hay gói bàn giao GPT/Gemini trừ khi được yêu cầu.

## 1. Luật đã khóa
- **Kinh tế:** không tiền thật, không thêm nguồn kim cương. **Không đổi tên khóa `saobang-*`** (được thêm khóa mới). Buff không hết hạn. Giữ 6 loại viên buff.
- **Màu:**
  - đạn địch đỏ #FF334F / hồng #F50057, tâm trắng;
  - sao điểm vàng #D5A13B;
  - hiệu ứng của người chơi không dùng 2 màu đạn địch.
- **Trong trận:**
  - không vẽ vòng quanh tàu / địch (chỉ được vòng khiên mờ);
  - không chữ bay, trừ thông báo boss.
- **Bản quyền:** game gốc (Chiến Cơ Huyền Thoại / omga) chỉ để lấy cảm hứng. **Không** chép tranh, mã, logo hay tên riêng của game gốc; không lấy tài nguyên từ repo hay game khác.
- **Nội dung:** nữ chiến giáp ở mức game mobile phổ thông. Chủ dự án từng hỏi bản 18+ và đã bị từ chối.
- **Bảo mật:**
  - không tự tạo tài khoản hay nhập mật khẩu trên trang bên thứ ba;
  - khóa ký APK nằm trong repo riêng tư, repo **phải giữ Private**.
- **Phiên làm việc:** đã bị chặn cài mã ngoài (pip spec-kit, npm REA, Craft Anything). **Không lách.**
- **Đã bỏ:** ý tưởng tay cầm (gamepad).

### Thay đổi lớn ở V212 (08/11)
- Chủ dự án chọn **"Đổi toàn bộ phong cách"** theo tinh thần game gốc. Luật cũ "giữ phong cách V196 / không vẽ lại 13 tàu / không V198" **đã bỏ**.
- Robot V196B và icon SSS **có thể** vẽ lại theo phong cách mới khi GPT gửi tranh.
- **Luật tiến hóa (chủ dự án yêu cầu):** lên nấc **không tô vàng**. Mỗi chiến cơ, trang bị, robot tiến hóa bằng cách **phóng đại đặc trưng riêng** của nó (cùng họ màu, thêm lớp hoặc bộ phận đặc trưng). Xem `docs_claude/DINH_HUONG_MY_THUAT_V212C.md`.
- Chủ dự án chê 2 đợt mẫu tàu của GPT: lần 1 giống nhau, lần 2 tối và rối. Bản yêu cầu V212C đã gửi; **đang chờ GPT gửi đợt 3** (tàu 1, 7, 11 × 3 nấc + Mecha 11).

## 2. Cấu trúc mã nguồn (nhánh `nguon-v212` của repo Lemon1609/Phi-doi-sao-bang)

| Đường dẫn | Nội dung |
|---|---|
| `build74_mau.py` | Dựng `Phi_Doi_Sao_Bang_V74_mau.html` (~72 MB) từ `base/Phi_Doi_Sao_Bang_V42.html` + `src/`. Chạy 3–4 phút. Mô-đun được chèn bằng `rep("</body>", "<style id=…>…<script id=…>…</script></body>")`. `rep(a, b, n=1)` **assert đúng n lần xuất hiện** |
| `src/*.js`, `src/*.css` | Các mô-đun theo phiên bản (v66 … v209, haz208, holo212 …) |
| `src/<thư mục>/` | Tranh (nền chương `nen194/`, boss `boss82/`, chướng ngại `haz208/`…) |
| `tests/t156.py` | Bộ hồi quy chính: **14/14** |
| `tests/v203_v212/` | Test từng phiên bản (chạy từ gốc mã nguồn), xem mục 3 |
| `claude_tools/split.py`, `wrap.py`, `smoke66.py` | Tách bản web thành nhiều tệp, bọc, kiểm thử khói |
| `claude_tools/do_dac/t193.py` | Bộ tạo tài khoản mẫu cho bot (`setup(br, 'SS')`); các test V209+ `exec` phần đầu của nó |
| `tools/` | Script phụ mà bản dựng gọi (`cat_sss.py`, `dong_goi_evo.py`, `nen_anh.py`) |

## 3. Quy trình

**Dựng và kiểm tra:**
```bash
python3 build74_mau.py                      # → Phi_Doi_Sao_Bang_V74_mau.html
H=$PWD/Phi_Doi_Sao_Bang_V74_mau.html
python3 tests/t156.py $H /tmp/t156          # 14/14
python3 -I tests/v203_v212/t209.py $H       # 20/20 (nội tại sự kiện, chướng ngại, SURV200, thiên thạch)
python3 -I tests/v203_v212/t204.py $H       # 8/8   (sự kiện tuần)
python3 -I tests/v203_v212/t206.py $H       # 7/7   (CHẠY RIÊNG — chạy song song dễ trượt mục luyện tập)
python3 -I tests/v203_v212/t207.py $H       # 8/8   (thử thách ngày, Boss Rush)
python3 -I tests/v203_v212/t205k.py $H <ải> on|off   # thời gian hạ boss
```
Nếu tệp cục bộ trùng tên thư viện Python, chạy `python3 -I` từ `/tmp`.

**Đăng web** (artifact riêng tư `https://claude.ai/artifact/U5HfBzLWPfPvtUECHaALbq`, đang ở bản 149):
1. `python3 claude_tools/split.py <OUT>` rồi `python3 claude_tools/wrap.py <OUT>`.
2. `(cd <OUT> && python3 -m http.server 8766 &)` rồi `python3 -I claude_tools/smoke66.py`. Xong thì xóa `wrapped.html`.
3. Đăng **2 đợt** với `root=<OUT>`, `file_path=<OUT>/index.html`:
   - đợt 1: `a/c01, c06, c14, c30, c31 (.css)` + `a/s02–s05, s07, s07a, s08–s13 (.js)`;
   - đợt 2: `a/s15–s29, s32, s33 (.js)`.

   Kiểm danh sách tệp trong `a/` trước, vì có thể đổi khi bản dựng lớn lên.
4. Phiên mới phải `Artifact action=read` URL trước khi đăng đè.

**APK** (repo **riêng tư** `Lemon1609/Phi-doi-sao-bang`, nhánh `build-apk-v198`):
1. Chép `<OUT>/a` vào `www/a`. Ghi `www/index.html` = doctype + meta viewport + `<body style="background:#06101f">` + nội dung `<OUT>/index.html`.
2. Ghi `VERSION` (ví dụ `V213`), commit (kèm dòng ghi công), push.
3. GitHub Actions tự dựng và tạo release `V213.<số lần chạy>`.
4. Tải về:
   ```bash
   gh api repos/Lemon1609/phi-doi-sao-bang/releases --jq '.[0]'
   gh api -H "Accept: application/octet-stream" repos/Lemon1609/phi-doi-sao-bang/releases/assets/<id> > x.apk
   ```
5. Kiểm `keytool -printcert -jarfile x.apk` phải ra **Owner CN=Phi Doi Sao Bang, O=Lemon1609**. Workflow cũng tự kiểm.

Lưu ý:
- GraphQL bị chặn, dùng REST.
- Ngày 08/11, GitHub Releases nhiều lần lỗi 504. Workflow đã có sẵn: thử lại `npm install`, ép `sharp` 0.33.5, Gradle 8.2.1-bin có SHA-256 chính thức + nguồn dự phòng Tencent. **Không đổi phần ký.**
- Remote hay bị báo "repository moved": dùng `https://github.com/Lemon1609/Phi-doi-sao-bang.git`.
- Hook của phiên yêu cầu nhánh có upstream: `git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'` rồi `git branch -u origin/<nhánh>`.

## 4. Kiến thức nội bộ của game (đã kiểm chứng)
- **Đồng hồ:** biến `time` về 0 khi `reset()`. Hiệu ứng dùng mốc `time` phải chặn tuổi âm (xem `clockGuard` trong `src/v120.js`). Mô-đun mới nên dùng đồng hồ riêng cộng dt.
- **Boss:**
  - chỉ chết khi **vỡ đủ 2 cánh** (lõi bị giữ ở 1 máu);
  - `boss.hp` = lõi + các phần (không cộng trùng);
  - vỡ cánh thì lõi −12% (`WING206`).
- **Hàm toàn cục gán lại được:** `damageBoss(amount, source, part)`, `defeatBoss`, `finishStage36`, `runGameFrameC`, `updateBoss`, `startBoss`, `damage(source)`, `kill(e)`, `emit(x, y, ang, speed, type)`, `collect(d)`.
- **Sát thương lên người chơi:** **đòn thật ở ải 132 = 5,64 máu** cho đạn, va chạm và thiên thạch như nhau. `enemyScale()` = 1,79 chỉ là hệ số gốc. Hàm `damage` đi qua nhiều lớp bọc: né của giáp, khiên chặn đạn `Equipment25.blocksBullet()`, SSS, V209.
- **Vật phẩm:**
  - rơi đồ: `Safety31.push(drops, 100, {x, y, type, t: 0, big?, val?})`, các loại buff `power / shield / super / heal / bomb / drone / magnet`;
  - nhặt đồ đi qua closure `collect40`, không bọc được: V209 nhận biết bằng cách quét viên biến mất trong 130 px;
  - huy chương: `V77._drop(x, y, soft)`, `V77.run()`.
- **Bạo Tẩu:** `Combat26.charge` (0–100) chạm 100 thì `activateSuper()`; `Combat26.addCharge07(n%)`; `superTime`; `Combat26.graze`, `Combat26.breakWing`.
- **Hợp kim:**
  - `Progress.grantCredits(n)`;
  - `Progress.spendCredits` thất bại khi đang khóa → gọi `Progress.setLocked(false)` trước;
  - thử thách / luyện tập dùng cơ chế **thu hồi** Hợp kim bằng hẹn giờ 300 / 1500 ms, có thể trễ trên máy yếu (đã ghi rủi ro).
- **Giáp:**
  - `gear.armorItem` (`variant`, `spec.rank` → Lv = rank + 1);
  - SSS: `window.SSSE_A` + `Gear44.activeDef('armor').parents`;
  - nội tại cũ: `NT144S.S` (`layer`, `skCd`), `NT147S.S` (`layer`, `voidCd`, `chronoCd`, `defer`).
- **Giao diện:**
  - sảnh = `hangar-v41`, vẽ trên canvas `.h1-stage`;
  - bảng trang bị `Hub40.openItem(id)` → `[data-item] p.hb-desc`;
  - xưởng SSS `Gear44.open()` → `#g44-det .g44-txt`, dòng chọn `.g44-r.sel[data-pick]`;
  - thanh máu boss vẽ canvas trong `src/play47.js` (G3);
  - cài đặt hình ảnh `Gfx66` (`.st66`).

## 5. Mô-đun phiên bản gần đây

| Bản | Mô-đun / thay đổi | Cờ tắt |
|---|---|---|
| V203 | Chip bảo hiểm trượt `E203` (`chip72.js`), giới hạn tuần 25 | `ECON203` |
| V204 | Cửa hàng endgame (`event83.js`), sự kiện cuối tuần `EV204X` (`v204.js`) | — |
| V205 | `K205` hệ số 13 tàu (`v120.js`), `BAL205X` máu boss theo mốc (`v205.js`) | `K205X` |
| V206 | Bảng tổng kết sau trận, cảm giác hạ boss, luyện tập boss (`v206.js`) | — |
| V207 | Thử thách ngày + Boss Rush (`v207.js`) | — |
| V208 | `clockGuard` (G1), thông báo không đè kết quả (G2), nhãn cơ chế `.kw208` (D4), viên rơi ×1,18 (D5), chuẩn hóa icon `_icon208` (D1), nền chương 6–10, chướng ngại `haz208.js` | `HAZ208`, `KW208`, `PICK208` |
| V209 | `v209cfg.js` (hằng số Gemini), chướng ngại theo chương + thưởng phá tháp, 6 nội tại giáp theo sự kiện `V209EV` (`v209.js`), G3 thanh máu boss | `HAZ209`, `ARMOR_EV209`, `G3_209` |
| V210–211 | Cân lại nội tại (`BAL_EV()` ưu tiên V211 > V210); SURV200 ải 160 / 180 / 200 = 0,84 / 0,66 / 0,61 (`v201.js`); màu tia trúng đích 13 tàu D2 (`v120.js`); rút gọn tên boss dài | `BAL211`, `BAL210`, `D2_211` |
| V212 | Phòng trưng bày hologram ở sảnh `holo212.js/.css`: nền lưới navy, hình nét tàu, bệ nét đứt; 3 nấc Thường / Siêu cấp / Tối thượng **màu theo chính tàu**; nút HOLOGRAM ⇄ XƯỞNG | `HOLO212` |

## 6. Việc đang chờ
1. **Tranh phong cách mới.** Chờ GPT gửi đợt 3 theo `DINH_HUONG_MY_THUAT_V212C.md`. Khi có tranh:
   - đưa tàu mới vào phòng trưng bày (`holo212.js`: thay `cell(i)` bằng tranh nấc tương ứng; hình nét `wire()` tự dò mép);
   - sau đó thay tranh trong trận (atlas `Evo53.hull` / `fighterAtlasV22`);
   - **đo độ dễ đọc trong trận**: đạn địch phải nổi; cánh siêu cấp trong trận thu nhỏ khoảng 60%.
2. **Gemini:** đã ghép V211, không còn câu hỏi treo.
3. **D3 (màu quái theo chương):** chưa làm. Với phong cách mới có thể làm cùng đợt tranh quái.
4. **G4 (giảm sáng đạn ta khi đạn địch dày):** chờ chủ dự án thử trên điện thoại.
5. **G5 (chấm tâm tàu khi đạn đến gần):** chờ chủ dự án duyệt.
6. **Lưu đám mây Firebase:** chờ chủ dự án tạo dự án Firebase.
7. **Phân tích game khác:**
   - web `http://180.93.193.152:81` không vào được (proxy chặn; Claude in Chrome chỉ chạy khi chủ dự án ngồi máy tính có Chrome + tiện ích);
   - REA (`morluto/rea`) đã đọc tài liệu nhưng không cài được;
   - nếu chủ dự án gửi APK thì chỉ phân tích tĩnh cấu trúc / số liệu dạng chữ, không chép tài sản, không phá bảo vệ.

## 7. Bản phát hành hiện tại
- Web: artifact bản 149 (V212C).
- APK mới nhất: release V212.25 trở lên trên nhánh `build-apk-v198`.
- HTML ngoại tuyến: dựng lại bằng `build74_mau.py`.
