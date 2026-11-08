# RÀ SOÁT 6 REPO THAM KHẢO CHO PHI ĐỘI SAO BĂNG

Claude · 08/11/2026. Bước này chỉ rà soát: **không sửa game, không chép mã, không đổi tài nguyên.**

## Cách làm và giới hạn

- **Truy cập:** cả 6 repo đều tải được (bản sao nông, nhánh mặc định, ngày 08/11/2026), lưu tại `/home/claude/<chủ>/<repo>`. Không repo nào bị chặn.
- **Đã làm:** đọc README, cây thư mục, file giấy phép, `package.json` / `project.godot`, và các file mã liên quan (điều khiển, đạn, va chạm, boss, chế độ chơi, lưu dữ liệu).
- **Chưa làm:**
  - Chưa cài thư viện và chưa chạy mã của các repo (hệ thống không cho chạy mã tải từ ngoài).
  - Chưa chơi thử bản demo trên web.
  - Vì vậy mọi nhận xét về cảm giác chơi, độ mượt hay hiệu năng thực tế đều là **chưa kiểm chứng**.

Ký hiệu dùng trong báo cáo:
- **[KT]** = đã đọc / kiểm tra trực tiếp trong mã hoặc tài liệu.
- **[NX]** = nhận xét, đề xuất của Claude.
- **[CKC]** = chưa kiểm chứng, cần thử nghiệm thêm.

---

## 1. Bảng tổng hợp

| # | Repo · công nghệ [KT] | Tính năng / kỹ thuật đã kiểm tra được [KT] | Áp dụng cho PĐSB [NX] | Ưu tiên [NX] | Giấy phép mã · tài nguyên [KT] |
|---|---|---|---|---|---|
| 1 | **phaethix/polished-arcade-shooter** (Sky Blaster) · React 19 + TypeScript, Canvas 2D, Vite, Vitest, PartyKit (co-op online) | Vòng lặp bước cố định 1/60 s, trần 0,1 s/khung (`use-game-loop.ts`) · Kéo cảm ứng tương đối ×1,5, tự bắn khi giữ tay, vùng chạm riêng cho kỹ năng (`player-controller.ts`, `use-pointer-input.ts`) · Tay cầm qua `navigator.getGamepads` (`gamepad.ts`) · Sượt đạn bán kính 22 px, +10 điểm/viên (`collision-system.ts`) · Boss bắn quạt 5 tia, mưa đạn, bắn mạn, vòng (`boss-ai.ts`) · Rung màn hình theo mức, chậm thời gian 0,6 s khi hạ boss (`combat.ts`) · 6 chế độ: Cốt truyện, Vô tận, **Boss Rush**, **Thử thách ngày có hạt giống cố định** (4 biến thể: tốc độ ×2, không vật phẩm, 1 máu, chỉ cảm tử), Luyện tập, Co-op · Chướng ngại riêng theo chương (thiên thạch, tháp pháo) (`hazards.ts`) · Thành tựu, tiền, bảng điểm lưu `localStorage` · Âm thanh tổng hợp bằng Web Audio | Cao: Boss Rush, Thử thách ngày, chướng ngại theo chương, cách tổ chức mã tách lớp. Không áp dụng co-op online (cần máy chủ) | **Cao** | **MIT** (2026, "cosmoli"). Tài nguyên: **không có file ảnh / âm thanh** (0 file png/ogg/mp3; hình vẽ bằng mã, âm tổng hợp) nên không có vấn đề bản quyền tài nguyên |
| 2 | **igorski/weltkriegsimulator** · JS thuần (ES6), thư viện zCanvas, GSAP, Handlebars, pubsub-js, Vite | Mô hình controller / model / view, giao tiếp kiểu phát tin–đăng ký (README) · **Bể đối tượng** cho đạn, vật phẩm, hiệu ứng (`Game.js`: `getActorFromPool`, cờ `pooled`) · README nêu kỹ thuật giảm cấp phát bộ nhớ trong vòng lặp · Điều khiển: phím, nút D-pad + nút bắn trên màn hình cảm ứng; tốc độ tăng dần khi giữ phím (`InputController.js`) · Nhiều tầng hiển thị, có nút đổi tầng bay · 3 kiểu bay của địch (thẳng, sin rộng, khối ngang) · Lưu cài đặt và bảng điểm bằng `localStorage` | Trung bình: tham khảo kỷ luật dùng bể đối tượng và giảm rác bộ nhớ. D-pad ảo kém hơn cách kéo tương đối PĐSB đang có | **Trung bình** | **MIT**, ghi trong `package.json` và đầu từng file mã (Igor Zinken 2016–2017); **không có file LICENSE riêng**. Tài nguyên (spritesheet, mp3, PSD): **không có tuyên bố giấy phép riêng**, coi như **không được dùng lại** |
| 3 | **andyp123/canvas_danmaku** · JS thuần (prototype), Canvas | **Lưới không gian** chia màn hình thành ô để lọc va chạm (`objectgrid.js`, ghi chú trong `todo.txt`) · Bể cố định: 1.024 đạn người chơi, 2.048 đạn địch, 128 hiệu ứng, 32 địch (`gamemanager.js`) · Bể vector tạm dùng lại, không cấp phát mỗi khung (`scratchpool.js`) · Vệ tinh bám theo tàu (`PlayerOption`) · **Thực tế chỉ có 1 kiểu địch bắn 1 viên thẳng** (`enemy.js`, 60 dòng); không có mẫu đạn boss hay danmaku phức tạp | Thấp–trung bình: chỉ đáng học lưới va chạm nếu sau này cần rất nhiều đạn. Mẫu đạn boss: **không có gì để học** | **Thấp** | **Không có file giấy phép**, nên mặc định tác giả giữ mọi quyền. **Chỉ học ý tưởng, không chép mã.** Tài nguyên: không rõ |
| 4 | **RaminMammadzada/js-shooter-game** (Cosmos Wars) · Phaser 3, esbuild, Jest | Game **góc nhìn trên xuống, bay tự do, không cuộn dọc** (README) · Chạm để di chuyển tới điểm; bắn bằng phím cách, hướng theo chuột · Bảng xếp hạng **gửi lên API trực tuyến** của bên thứ ba (`serviceApi.js`) · Nút tắt nhạc / âm thanh riêng · 17 bài kiểm thử Jest | Thấp: khác thể loại; cách chạm-để-đi kém hơn kéo tương đối | **Thấp** | **Mâu thuẫn:** README ghi MIT; `LICENSE.txt` là MIT nhưng tên bản quyền là người khác (Bereket A. Beshane 2017); `package.json` ghi **ISC**. Tài nguyên: chỉ ghi công chung chung (Freesound, OpenGameArt), không ghi giấy phép từng file, nên **không dùng lại** |
| 5 | **Phonbopit/learn-html5-shmup** · Phaser **2.0.7** (2014), JS thuần | Bài tập theo sách "HTML5 Shoot 'em Up in an Afternoon" · Màn khởi động → tải tài nguyên (thanh tiến trình) → menu → trận (`boot.js`, `preloader.js`, `mainMenu.js`) · Bể địch, bể đạn, bể nổ của Phaser · Điều khiển: phím, hoặc chạm/chuột để tàu bay tới con trỏ, giữ là bắn · Boss, vật phẩm, bom (`game.js`, 642 dòng) | Thấp: kiến thức cơ bản, PĐSB đã vượt xa. Phaser 2 đã cũ | **Thấp** | **MIT** (Bryan Bibat 2014, tác giả template gốc; repo này là bài làm theo sách). Phaser kèm theo: MIT. Tài nguyên ảnh / âm: **không có tuyên bố giấy phép**, nên **không dùng lại** |
| 6 | **juan-medina/godot-shootem-up** · **Godot 4.3**, GDScript | **Cơ chế 2 năng lượng:** đạn chỉ gây sát thương khi khác màu với tàu, người chơi đổi màu (`enemy_shot.gd`, `game.gd`) · Boss theo máy trạng thái (vào màn → lên/xuống → bắn) · 10 đợt địch dựng sẵn thành cảnh · Hiệu ứng CRT · Menu tùy chọn âm lượng, cửa sổ, CRT · Bản Windows / Mac / Linux | Thấp cho bản HTML (khác engine). Cơ chế 2 màu **xung đột luật màu đạn đã khóa** (đỏ #FF334F / hồng #F50057). Có vẻ là game **cuộn ngang** [CKC] | **Thấp** | **MIT** (Juan Medina 2024) **chỉ cho mã**. Tài nguyên từ bên thứ ba có ghi công trong README và `resources/credits/credits.json` (itch.io: Craftpix, vnitti, Abstraction; Freesound…), mỗi gói có giấy phép riêng, **không thuộc MIT**, nên **không dùng lại** |

Thêm 6 repo bạn gửi trước đó, cũng đã có trong phiên:
- **spec-kit**: MIT, công cụ quy trình.
- **abbradar/office-hell**: MIT.
- **Chmood/shmup**: MIT.
- **bryanbibat/html5shmup-template**: MIT, là bản gốc của repo số 5.
- **opentyrian**: **GPL v2**, chỉ tham khảo ý tưởng; chép mã thì buộc cả game phải theo GPL.
- **weltkriegsimulator**: chính là repo số 2 ở trên.

---

## 2. Đối chiếu với Phi Đội Sao Băng hiện tại

Claude đã tìm trong bản dựng V204 để không đề xuất trùng những gì game đã có:

| Kỹ thuật ở các repo | PĐSB V204 [KT] | Kết luận [NX] |
|---|---|---|
| Vòng lặp bước cố định 1/60 s | **Đã có** (`STEP393 = 1/60`, tối đa 4 bước/khung) | Không cần đổi |
| Kéo cảm ứng tương đối | **Đã có** (giữ mốc kéo, `setPointerCapture`) | Tốt hơn D-pad ảo (WKS) và chạm-để-đi (Cosmos, Learn) |
| Tự dừng khi rời tab / mất tiêu điểm | **Đã có** (`visibilitychange`, `blur`, nút Back APK V199) | Không cần đổi |
| Sượt đạn | **Đã có** (`Combat26.graze`) | Không cần đổi |
| Chậm thời gian toàn cục | **Đã có hàm** `slowmo(sec, k)` | Chưa kiểm tra đang dùng vào lúc hạ boss hay không [CKC] |
| Rung điện thoại | **Đã có** (`navigator.vibrate`) | Không cần đổi |
| Bể đối tượng | **Có một phần** (nhiều chỗ "Pool", trần đạn `Safety31`) | Có thể rà lại [NX] |
| Báo cáo sát thương theo nguồn | **Đã có dữ liệu** (`Report392`: chính / trang bị / kỹ năng, độ chính xác) | Chưa thấy hiện cho người chơi sau trận [CKC] |
| Tay cầm (gamepad) | Chưa có | **Chủ dự án loại bỏ (08/11)** |
| **Boss Rush** | **Chưa có** (Gemini đã xếp "để sau V204") | Ý tưởng mới |
| **Thử thách ngày có biến thể** | Chưa có. Đã có sự kiện tuần và lễ hội | Ý tưởng mới |
| **Chướng ngại theo chương** | Chưa thấy [CKC] | Ý tưởng mới |
| Lưới va chạm không gian | Chưa có | Hiện trần ~48 đạn địch nên chưa cần [NX] |

---

## 3. Ý tưởng đáng giá nhất (để bạn chọn) · đã bỏ tay cầm theo yêu cầu 08/11

Mọi ý tưởng dưới đây đều **tự viết lại theo mã và luật của PĐSB, không chép mã repo nào**, và:
- giữ nguyên mỹ thuật hiện tại (không áp luật V198, không vẽ lại icon trang bị hợp thể, robot V196B giữ nguyên);
- không thêm nguồn 💎, không chữ bay, không vòng quanh tàu.

| # | Ý tưởng [NX] | Lấy cảm hứng từ | Lợi ích | Độ khó | Rủi ro với game hiện tại |
|---|---|---|---|---|---|
| 1 | **Chế độ Boss Rush:** đánh liên tiếp 3–5 boss đã mở, giữ nguyên máu tàu, tính thời gian | Sky Blaster (`modes.ts`) · Gemini đã đề xuất | Lý do chơi lại cho người cuối game; dùng lại boss có sẵn, không cần tranh mới | Trung bình | Phải cân phần thưởng (dễ lạm phát Bộ mã hóa / Lõi chip, mục C Gemini đã hoãn). Cần đo lại sống sót và thời gian hạ boss |
| 2 | **Thử thách ngày** theo ngày hệ thống: cùng một ải và một biến thể cho mọi người (ví dụ: không rơi viên buff, đạn địch nhanh ×1,3, 1 lần trúng là thua) | Sky Blaster (Daily + 4 biến thể) | Nội dung mới mỗi ngày, chạy offline, hợp luật không nạp tiền; khi có Firebase thì thêm bảng xếp hạng ngày | Trung bình | Biến thể phải không trái luật đã khóa (vẫn 6 viên buff, đạn đỏ / hồng). Quà phải nhỏ để không lệch kinh tế |
| 3 | **Bảng tổng kết sau trận:** sát thương theo nguồn, độ chính xác, số lần sượt đạn, số đòn bị trúng, thời gian hạ boss | Sky Blaster (`run-stats.ts`, `gameover.ts`) | Người chơi tự thấy chip / trang bị / tàu có tác dụng; dữ liệu đã có sẵn trong `Report392` | Thấp | Rất thấp: chỉ thêm bảng sau trận, không chạm cân bằng |
| 4 | **Phản hồi khi hạ boss:** rung màn hình theo mức (nhỏ khi hạ quái, lớn khi hạ boss) + chậm thời gian ~0,5 s khi boss nổ, có nút tắt trong Cài đặt | Sky Blaster (`combat.ts`: `shake`, `slowMotionTimer`) | Tăng cảm giác "đã tay"; dùng lại hàm `slowmo` có sẵn | Thấp | Rung màn hình có thể gây chóng mặt, nên phải có nút tắt. Cần kiểm tra không chồng với hiệu ứng hiện có [CKC] |
| 5 | **Chướng ngại riêng theo chương** cho chương 6–10 (thiên thạch trôi bắn vỡ được, tháp pháo cố định hai bên) | Sky Blaster (`hazards.ts`) | Mỗi chương có bản sắc riêng; đi cùng nền chương 6–10 GPT đang vẽ | Trung bình–cao | Thay đổi độ khó: phải đo lại SURV200. Cần tranh mới, chưa có |
| 6 | **Rà bể đối tượng và giảm rác bộ nhớ** cho đạn, hạt hiệu ứng, số sát thương nội bộ (tạo sẵn, dùng lại, không tạo mảng mới mỗi khung) | WKS (README "Object pooling"), Canvas Danmaku (`objectmanager.js`, `scratchpool.js`) | Giảm giật khung khi dọn rác bộ nhớ trên điện thoại yếu | Trung bình | Dễ phát sinh lỗi "đạn ma" nếu trả về bể sai. Phải có bộ đo FPS trước / sau trên máy thật [CKC] |
| 7 | **Lưới va chạm không gian** cho đạn người chơi × địch (chỉ bật khi số đạn lớn) | Canvas Danmaku (`objectgrid.js`) | Dự phòng cho Boss Rush / sự kiện nhiều đạn | Trung bình | Hiện chưa cần (trần ~48 đạn địch, ~140 đạn người chơi). Chỉ làm nếu đo thấy va chạm tốn thời gian [NX] |
| 8 | **Chế độ Luyện tập** mở rộng từ Phòng tập bắn V200: chọn ải đã qua, bất tử, không thưởng | Sky Blaster (Practice) | Học đường đạn boss trước khi đánh thật; dùng lại mã V200 | Thấp | Thấp, nếu vẫn không thưởng và không tính tiến trình như V200 |
| 9 | **Tách lớp mã theo hướng "dữ liệu / hệ thống / vẽ"** cho các mô-đun mới (cấu hình thuần, không tác dụng phụ; phần vẽ không đổi trạng thái), kèm kiểm thử hàm thuần | Sky Blaster (`ARCHITECTURE.md`) | Mô-đun mới dễ kiểm thử, ít lỗi chồng chéo | Trung bình (chỉ áp cho phần mới) | Nếu tái cấu trúc mã cũ thì rủi ro cao. Đề xuất **chỉ áp cho mô-đun mới**, không đụng mã đang chạy |

### Không đề xuất (và lý do)
- **Hỗ trợ tay cầm**: chủ dự án đã loại bỏ (08/11).
- **Co-op online** (Sky Blaster): cần máy chủ thời gian thực; trái hướng offline của dự án.
- **Cơ chế 2 năng lượng** (Godot): buộc đạn địch có 2 màu theo phe, **trái luật màu đạn đã khóa**.
- **D-pad ảo** (WKS) và **chạm-để-đi** (Cosmos, Learn): kém cách kéo tương đối PĐSB đang có.
- **Dùng bất kỳ ảnh / âm thanh nào** từ 6 repo: không repo nào cấp giấy phép rõ ràng cho tài nguyên, trừ Sky Blaster vốn không có tài nguyên.

---

## 4. Việc cần bạn quyết định
1. Chọn các ý tưởng muốn làm (theo số 1–9).
2. Với ý tưởng 1, 2, 5: Claude sẽ soạn thông số để Gemini cân phần thưởng và độ khó trước, rồi mới viết mã và đo bằng bot (đúng quy trình hiện tại).
