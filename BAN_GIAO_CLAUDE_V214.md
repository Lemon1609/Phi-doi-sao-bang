# BÀN GIAO CHO PHIÊN CLAUDE MỚI · PHI ĐỘI SAO BĂNG · V214 · 10/11/2026

**Đọc theo thứ tự:**
1. Tệp này (trạng thái mới nhất và việc cần làm).
2. `BAN_GIAO_CLAUDE_V212.md`: vai trò, luật đã khóa, cấu trúc mã nguồn, quy trình dựng / test / đăng web / APK, kiến thức nội bộ của game. **Vẫn đúng**, trừ các điểm ghi ở mục 1 dưới đây.
3. `docs_claude/PROMPT_BAN_GIAO_KIEM_DUYET_TRANH.md`: chuẩn kiểm duyệt tranh (cách đo, phong cách, bảng 13 tàu, 7 hợp thể).
4. `docs_claude/BAN_GIAO_CLAUDE_V202.md`: nhật ký chi tiết từng phiên bản, mới nhất ở trên.

Chủ dự án giao phiên này **hoàn thiện toàn bộ: tranh, lối chơi, mọi thứ.** Trả lời bằng tiếng Việt.

## 1. Thay đổi so với bản bàn giao V212

### Phong cách mỹ thuật (chủ dự án đã duyệt qua nhiều vòng)
- **Chân thật** (khối cứng kiểu 3D, kim loại thật) nhưng **tươi sáng, bắt mắt**; phối màu 60 / 30 / 10; ít gai; mỗi tàu một dáng và một bộ màu riêng.
- **Tiến hóa theo đặc trưng riêng** của từng chiến cơ / trang bị / robot. **Không tô vàng kim, không cầu vồng.**
- **Đồ họa nâng cấp theo hệ bậc cũ:**
  - chiến cơ 6 bậc `thuong / luc / lam / tim / tim5 / ss`, mỗi bậc có bản Bạo Tẩu `_bt`;
  - trang bị `icon1–3`, `tran1–3`, `tranbt`;
  - hợp thể `hopN_tau`, `hopN_chandung`, `hopN_bay`, `canh_hopN[_sang]`.
- **Hợp thể giữ quy tắc cũ:** ghép từ 2 thành phần, kết hợp đặc trưng đồ họa và kỹ năng của cả hai.
- Tàu mẫu chuẩn: **tàu 7**. Bản yêu cầu gốc: `docs_claude/DINH_HUONG_MY_THUAT_V212D.md` và `V212E.md`.

### Mã
| Tệp | Thay đổi |
|---|---|
| `src/ship118/tau{1..7}_*` | Tranh mới của GPT. Tàu 8–13 vẫn tranh cũ |
| `src/evo53.js` (script `evo-v55`) | `paint()`: mức tiến hóa 1–4 **không nhuộm màu nữa** (trước: +1 lam, +3 bạc, +4 vàng, +5 cầu vồng), chỉ sáng và óng theo mức. Áp cho trang bị, đạn chính, thân atlas cũ. Cờ `EVO213=false` trả về cũ |
| `src/v120.js` `D2P` | Màu tia trúng đích tàu 1–6 theo tranh mới |
| `src/holo212.js` | Phòng trưng bày hologram ở sảnh; `NEW213` = màu hào quang tàu 1–7; `holo212_art.js` để rỗng |

### Mẹo test mới
- Chọn tàu ra trận trong bot: `pg.reload()` rồi `selectCraft(i); launchCraft = i;` (i từ 0). Xem `tests/v203_v212/t212f.py`: chụp sảnh, trong trận, Bạo Tẩu.
- Tia / đạn của trang bị đi qua `Evo53.gearAssets()` (Proxy). Muốn biết hàm nào vẽ một hiệu ứng: bọc `CanvasRenderingContext2D.prototype.drawImage` / `stroke` và in `new Error().stack`.

## 2. Bản phát hành hiện tại
- Web: artifact `https://claude.ai/artifact/U5HfBzLWPfPvtUECHaALbq`, bản 155 (V214). Phiên mới phải `read` artifact trước khi đăng đè.
- APK: release **V214.28** (nhánh `build-apk-v198`), khóa Lemon1609.
- Test: t156 14/14; t209 20/20; t204 8/8; t206 7/7 (chạy riêng); t207 8/8.

## 3. Việc cần làm (theo thứ tự ưu tiên)

### A. Tranh chiến cơ (GPT vẽ, chủ dự án chuyển tin)
1. **Tàu 4: 6 bản `_bt` chờ GPT vẽ lại.** Hiện Claude đã phóng tạm; `tau4_ss_bt` vẫn nhỏ khoảng 6%.
2. **Tàu 8, 9, 10:** đã gửi yêu cầu (`docs_claude/GUI_GPT_TAU_8_9_10.md`).
3. **Tàu 11, 12, 13:** chưa giao. Hỏi chủ dự án về Mecha (có làm không, ở bậc nào) trước khi soạn yêu cầu.
4. Mỗi đợt tranh về: đo theo chuẩn kiểm duyệt → căn lại bằng mã nếu cần → chép vào `src/ship118/` (sao lưu bản cũ) → dựng → chụp sảnh / trận / Bạo Tẩu → cập nhật `D2P` và `NEW213` → t156 → phát hành.

### B. Lệch màu / hiệu ứng còn tồn
- **Đạn chính tàu 4** vẫn là mũi tên **hồng cánh sen** (tranh `fx16_pb` cũ): vừa lệch màu tàu mới (lục), vừa gần màu đạn địch. Đổi màu bằng mã hoặc nhờ GPT vẽ đạn mới. **Chủ dự án chưa quyết.**
- Trong trận phe ta còn **đạn kim nhỏ đỏ hồng** và **vạch đỏ dọc mảnh**: chưa xác định mô-đun nào vẽ. Dò bằng mẹo ở mục 1.
- Đạn chính của các tàu khác: rà lại cho khớp màu tranh mới.
- **Tàu con hộ tống** trong trận vẫn tranh trắng – lam cũ.

### C. Hợp thể và trang bị
- 7 hợp thể + 3 hợp thể riêng của tàu 11–13: vẽ lại **sau** khi 2 tàu thành phần có tranh mới. Băng Hà Lĩnh Chủ (tàu 7 + 3) vẽ được ngay.
- Cặp thành phần (đếm từ 0): `[5,8] [7,5] [9,7] [2,9] [6,2] [0,3] [1,4]`. Bảng tên trong `docs_claude/RA_SOAT_MY_THUAT_V213.md`.
- Icon trang bị: phần lớn giữ. Sửa lẻ `devour10_m`, `devour10_a` (đỏ / hồng) và các món quá mảnh.

### D. Lối chơi và cân bằng (Gemini thiết kế số, chủ dự án chuyển tin)
- Gemini **không còn câu hỏi treo** sau V211.
- Chờ chủ dự án thử máy thật:
  - **G4:** giảm sáng đạn ta khi đạn địch dày;
  - **G5:** chấm tâm tàu khi đạn đến gần;
  - độ dễ thấy của chướng ngại chương 6–10;
  - tên boss dài.
- **D3 (màu quái theo chương):** nay có thể làm cùng đợt tranh quái phong cách mới.
- **Rủi ro đã ghi:** luyện tập boss / thử thách thu hồi Hợp kim bằng hẹn giờ, có thể trễ trên máy yếu (+3 ◈). Nên đổi sang chặn cộng từ đầu.
- **Lưu đám mây Firebase:** chờ chủ dự án tạo dự án Firebase.

## 4. Nhắc lại điều không được làm
- Không đổi tên khóa `saobang-*`; không tiền thật; không thêm nguồn kim cương.
- Đạn địch đỏ #FF334F / hồng #F50057; phe ta tránh 2 màu này.
- Trong trận không vòng quanh tàu / địch, không chữ bay (trừ thông báo boss).
- Không chép tranh, mã, logo, tên của game khác. Không cài mã ngoài bị chặn. Không tự tạo tài khoản / nhập mật khẩu bên thứ ba.
- Repo phải giữ **Private** (có khóa ký APK). Không đổi phần ký trong workflow.
- Mỗi bản phát hành: HTML ngoại tuyến + APK + ảnh chụp + báo cáo ngắn + tin nhắn soạn sẵn cho GPT / Gemini.
