Dựa trên 5 video gameplay tham khảo cùng toàn bộ 26 bảng kiểm tra đạn/kỹ năng 6 bậc (`01_dan_*`, `02_ky_nang_*`) và 3 ảnh khoanh lỗi thực tế, dưới đây là bản thiết kế lại toàn diện **Hệ Thống Màu Bậc, Công Thức Tia 3 Lớp, Cơ Chế Đạn Đặc Trưng 13 Chiến Cơ & Kỹ Năng S/SS (V309)**.

---

### A. CHẤM NHANH TỪNG NHÓM HIỆN TẠI (SO VỚI CHUẨN GAME ARCADE GỐC)

1. **Đạn chính (Nhóm 1 — Bị lóa & thiếu cá tính từng tàu):**
* **Lỗi lóa màu:** Bậc **Thường** (trắng tinh `#ffffff`) và bậc **SS** (vàng kem `#fff3a1`) khi bật cộng sáng `globalCompositeOperation = 'lighter'` và bắn quạt 7–13 tia ở trạng thái Bạo Tẩu bị cộng dồn độ sáng thành một mảng trắng bệt, mất sạch đường nét của sprite đạn (thấy rõ ở `image_3168c5.png` và toàn bộ hàng dưới của `01_dan_*`).
* **Thiếu cơ chế riêng:** Hiện tại hầu hết các tàu đều chung 1 kiểu "bắn quạt N tia thẳng" nên cảm giác bắn giống nhau, chưa có sự khác biệt chiến thuật như game gốc (nơi mỗi tàu/vũ khí có bản sắc rõ rệt: chùm laser xuyên tâm, tên lửa truy đuổi vòng cung, đạn hạt nhân nổ lan, phi tiêu nảy bật, sóng điện từ...).


2. **Kỹ năng S/SS (Nhóm 2 — Đường nét quá mảnh, thiếu sức nặng):**
* **Tàu 5 (Lăng kính) & Tàu 6 (Lưới lượng tử):** Đang vẽ bằng `lineWidth = 2px` (`image_3168a6.png` và `02_ky_nang_tau06`), nhìn giống nét vẽ kỹ thuật rời rạc hơn là chùm năng lượng hủy diệt.
* **Tàu 1 (Phượng Hoàng) & Tàu 3 (Thập Tự Băng):** Bị tô màu bệt đơn sắc (`02_ky_nang_tau01`, `tau03`) nên bậc Thường và SS biến thành khối trắng/vàng phẳng lì, mất chi tiết vân lửa/băng bên trong.


3. **Tia Pháo Điện Từ & Sét nhảy (Nhóm 3 & 4 — Mảnh và chìm):**
* Hai tia chéo xanh từ 2 tàu con hai bên (`image_3168c1.jpg`) và tia sét nhảy (`1,6px`) có phần lõi quá mỏng, không có đầu nòng phát sáng (`muzzle flare`) và không có điểm nổ tại vị trí trúng mục tiêu (`impact spark`), nên nhìn như sợi chỉ đứt đoạn.



---

### B. BẢNG MÀU BẬC MỚI (CHỐNG LÓA 100% — THAY TRẮNG & VÀNG CHÓI)

#### 1. Quy tắc độ sáng chống lóa trên Canvas (`lighter`)

* **Tỷ lệ lõi sáng tối đa:** Phần lõi trắng pha màu (`Core`) chỉ chiếm **`≤ 25%`** bề ngang viên đạn/tia; **`75%`** còn lại phải là màu thân bão hòa (`Body`) và viền ngoài đậm (`Outer Glow`).
* **Độ bão hòa tối thiểu (`Saturation`):** Mọi màu thân phải giữ **độ bão hòa $\ge 75\%$** và **độ sáng `Lightness` $\le 62\%$**. Tuyệt đối không dùng màu pastel nhạt hay vàng kem nhạt.
* **Tương phản 2 chiều:** Tránh dải đỏ thuần `#ff0000` (dễ trùng đạn địch); tách rõ 6 bậc theo thang nhiệt độ năng lượng: **Bạc Thép Lam $\rightarrow$ Lục Bảo $\rightarrow$ Lam Điện $\rightarrow$ Màu Nguyên Bản Tàu $\rightarrow$ Hồng Tím Plasma $\rightarrow$ Vàng Cam Mặt Trời (Solar Amber-Gold)**.

#### 2. Bảng mã Hex chuẩn cho 6 bậc (Đạn & Kỹ năng)

| Bậc | Tên tông màu mới | Màu Lõi (`Core` — 25% giữa) | Màu Thân (`Body` — 50% chính) | Màu Viền/Quầng (`Outer` — 25% rìa) | Lý do & Độ tương phản |
| --- | --- | --- | --- | --- | --- |
| **1. Thường** *(Thay Trắng)* | **Bạc Thép Xanh** *(Steel Ice-Silver)* | `#d8f3ff` | `#5bc0eb` | `#1d4ed8` | Thay trắng bệt bằng xanh thép lạnh; rõ nét từng lông vũ/mũi tên ngay cả khi Bạo Tẩu. |
| **2. Lục** | **Lục Bảo Năng Lượng** *(Emerald Plasma)* | `#bbf7d0` | `#10b981` | `#047857` | Xanh lục đậm đà, tách biệt hoàn toàn nền không gian tối. |
| **3. Lam** | **Lam Điện Quang** *(Electric Cobalt)* | `#bae6fd` | `#0284c7` | `#1e3a8a` | Xanh cobalt sâu, có viền xanh hải quân giữ khối sắc nét. |
| **4. Tím** | **Màu Nguyên Bản Tàu** *(Signature Hue)* | Pha 25% trắng từ màu gốc tàu | Màu gốc đặc trưng của từng tàu | Tối hơn màu gốc 35% | Giữ đúng bản sắc riêng của từng trong 13 chiến cơ. |
| **5. Tím+5** | **Hồng Tím Vũ Trụ** *(Cosmic Magenta)* | `#f5d0fe` | `#d946ef` | `#86198f` | Giảm độ chói trắng ở tâm so với bản cũ, tăng độ rực cánh hoa/đạn. |
| **6. SS** *(Thay Vàng chói)* | **Hoàng Kim Hổ Phách** *(Solar Amber-Gold)* | `#fef08a` | `#f59e0b` | `#b45309` | Thay vàng nhạt bằng **vàng cam hổ phách hoàng gia** — uy lực, sang trọng và không bao giờ cháy trắng! |

*(Mẹo code cho Claude: Khi vẽ nhiều đạn chồng nhau trong Bạo Tẩu, chỉ bật `globalCompositeOperation = 'lighter'` cho lớp quầng ngoài với `globalAlpha = 0.35`, còn sprite đạn chính vẽ ở chế độ `source-over` bình thường — đảm bảo chồng 20 lớp đạn vẫn thấy rõ từng viên!)*

---

### C. CÔNG THỨC "TIA NGẦU" 3 LỚP (THAY THẾ TOÀN BỘ TIA MẢNH)

Áp dụng thống nhất cho **Tia Lăng Kính (Tàu 5), Lưới Lượng Tử (Tàu 6), Pháo Điện Từ (2 tàu con) và Sét Nhảy** trên màn logic `480 × 1040`:

1. **Cấu trúc 3 lớp đồng tâm (không bao giờ vẽ 1 nét đơn):**
* **Lớp 1 — Quầng ngoài (`Outer Aura`):** Độ rộng **`14–22 px`** (tia chính/kỹ năng) hoặc **`8–12 px`** (tia tàu con/sét), `alpha = 0.25–0.35`, màu `Outer` theo bậc, đầu tròn `lineCap = 'round'`.
* **Lớp 2 — Thân năng lượng (`Plasma Body`):** Độ rộng **`6–10 px`** (tia chính) hoặc **`4–5 px`** (tia phụ), dùng `LinearGradient` chạy dọc theo tia với dải sóng sáng tối xen kẽ (hiệu ứng dòng chảy năng lượng như chùm laser tím trong video gốc `87970.mp4`).
* **Lớp 3 — Lõi siêu nhiệt (`Hot Core`):** Độ rộng **`2–3 px`** ở chính giữa, màu `Core`, dao động độ rộng theo hàm sin thời gian `width = 2.5 + Math.sin(t * 28) * 0.8` để tia "rung" sống động.


2. **Đầu nòng & Điểm chạm (bắt buộc phải có để tia có "lực"):**
* **Đầu xuất phát (`Muzzle Flare`):** Vẽ 1 hình thoi/sao 4 cánh phát sáng (`bán kính 10–16 px`, xoay nhẹ theo thời gian) ngay tại nòng súng nơi tia bắn ra.
* **Điểm trúng quái (`Impact Burst`):** Tại tọa độ chạm mục tiêu, vẽ 1 vòng sóng xung kích nhỏ (`bán kính 12–20 px`) + **3–4 tia lửa văng ngược** (`spark particles`, tuổi thọ `0.15s`).


3. **Riêng Sét Nhảy (`Chain Lightning`):**
* Thay 1 đường zigzag `1,6px` bằng **2 đường sét bện xoắn vào nhau** (1 đường chính rộng `3,5px` + quầng `10px`, 1 đường phụ mảnh `1,5px` lệch pha ngẫu nhiên mỗi `0,05s` *(ước lượng)*) kèm chớp sáng tròn tại điểm nhảy trên thân quái.



---

### D. THIẾT KẾ CƠ CHẾ ĐẠN & KỸ NĂNG ĐẶC TRƯNG CHO 13 CHIẾN CƠ (HỌC TINH THẦN GAME GỐC)

Thay vì cả 13 tàu đều bắn đạn quạt giống nhau, chia 13 chiến cơ thành **5 nhóm cơ chế chiến đấu đặc trưng** (giữ nguyên sprite đạn đã có, chỉ nâng cấp hành vi bay + hiệu ứng va chạm và làm lại kỹ năng S/SS cho hoành tráng):

| Tàu | Cơ chế Đạn Chính Mới *(Hấp dẫn, khác biệt)* | Nâng cấp Kỹ Năng S/SS *(Sửa lỗi mảnh/bệt)* |
| --- | --- | --- |
| **Tàu 01** *(Phượng Hoàng)* | **Lông Vũ Lửa Lan (Splash Feather):** Đạn bay hình quạt; khi trúng quái tạo **vòng lửa nổ lan `32px**` *(ước lượng)* gây sát thương nhóm. | **Phượng Hoàng Niết Bàn:** Giữ chim phượng hoàng lớn nhưng tô lại 3 tầng màu (viền cam đỏ, thân màu bậc, lõi sáng) + rải **mưa lông vũ cháy** kéo dài `2,5s`. |
| **Tàu 02** *(Lôi Quang / Laser)* | **Chùm Laser Xuyên Thấu (Continuous Beam):** Đạn chính là **cột laser liên tục** xuyên thẳng từ đầu đến cuối màn hình (giống tia tím chủ lực trong video gốc `87934.mp4`), di chuyển theo tàu cực đã tay. | **Tam Trụ Hủy Diệt:** Mở rộng cột laser trung tâm lên **`44px`** *(ước lượng)* kèm 2 cột laser phụ hai bên xoắn ốc điện từ. |
| **Tàu 03** *(Băng Phách)* | **Mảnh Băng Vỡ Vụn (Shatter Frost):** Bắn mũi băng tốc độ cao; khi chạm quái **vỡ thành 3 mảnh băng nhỏ** văng hình chữ V ra phía sau. | **Thập Tự Băng Giá:** Tạo **2 luồng bão tuyết chéo chữ X** có vân tinh thể băng 3D (không tô trắng bệt) + đóng băng làm chậm toàn bộ quái trên màn. |
| **Tàu 04** *(Huyết Long / Xuyên Phá)* | **Mũi Thương Xuyên Giáp (Piercing Lance):** Đạn mũi nhọn bay cực nhanh, **xuyên thẳng qua tối đa 3 quái** trên một đường thẳng, để lại vệt khói năng lượng. | **Thiên Thương Phá Trận:** Triệu hồi 1 mũi thương khổng lồ ở giữa + **6 mũi thương vệ tinh** lao xuống theo đội hình mũi tên. |
| **Tàu 05** *(Lăng Kính)* | **Tia Khúc Xạ Nảy Bật (Ricochet Prism):** Đạn chạm vào 1 quái sẽ **tự động nảy chéo sang 1–2 quái lân cận** bằng tia sáng dày `6px` *(ước lượng)*. | **Đa Giác Quang Phổ *(Sửa tia mảnh)*:** Thay các đường thẳng `2px` bằng **3 viên pha lê lớn xoay tròn**, nối với nhau bằng **chùm tia laser 3 lớp rộng `14px**` quét thành mạng lưới ánh sáng rực rỡ. |
| **Tàu 06** *(Lưới Lượng Tử)* | **Đạn Khóa Mục Tiêu (Lock-on Dart):** Đạn bắn ra hơi cong nhẹ, tự bẻ lái bám theo quái gần nhất trong góc `30°` *(ước lượng)*. | **Ma Trận Lượng Tử *(Sửa tia mảnh)*:** Thay khung dây đa giác mảnh bằng **lưới laser plasma dày `12px**` có nút điện tích phát sáng ở các đỉnh, giật điện liên tục tất cả quái lọt vào vùng lưới. |
| **Tàu 07** *(Ảo Ảnh / Trảm Kích)* | **Lưỡi Liềm Chém Xoáy (Crescent Slash):** Đạn hình trăng khuyết xoay tròn, vùng chém rộng gấp `1,5×` đạn thường, chém bay đạn nhỏ của quái. | **Loạn Trảm Vô Ảnh *(Sửa đường mảnh)*:** Tàu lướt bóng để lại **5–7 vệt chém bán nguyệt khổng lồ dày `24px**` *(ước lượng)* có đuôi mờ dần (`motion trail`) chém ngang dọc toàn màn hình. |
| **Tàu 08** *(Hỏa Lực / Bom Hạt Nhân)* | **Đạn Pháo Nổ Hạt Nhân Mini (Micro-Nuke):** Tốc độ bắn vừa phải nhưng mỗi viên đạn nổ tạo **quả cầu lửa hạt nhân bán kính `48px**` *(ước lượng)* kèm sóng xung kích tròn. | **Oanh Tạc Hạt Nhân:** Thả **3 quả bom hạt nhân chiến thuật** vào tâm đội hình địch, tạo **vụ nổ nấm plasma + vòng sóng xung kích lan toàn màn hình** rung nhẹ camera. |
| **Tàu 09** *(Tinh Vân / Truy Đuổi)* | **Tên Lửa Truy Đuổi (Homing Swarm):** Hai bên cánh liên tục phóng **tên lửa mini có đuôi khói sáng** uốn lượn vòng cung lao chính xác vào mục tiêu máu cao nhất. | **Bão Tên Lửa Tinh Vân:** Mở khoang cánh phóng **24 tên lửa truy đuổi** vẽ thành 24 đường cong ánh sáng đan chéo tuyệt đẹp trút xuống Boss. |
| **Tàu 10** *(Tử Quang / Hắc Ám)* | **Cầu Hấp Dẫn (Gravity Orb):** Bắn cầu năng lượng tối viền neon; khi chạm địch tạo **xoáy hút nhẹ** kéo quái xung quanh tụ lại một điểm. | **Hố Đen Thôn Phệ:** Tạo **1 hố đen trung tâm** hút quái và đạn địch vào giữa trong `2s`, sau đó phát nổ tung ra 12 tia năng lượng. |
| **Tàu 11** *(Bão Tố / Cực Quang)* | **Lốc Xoáy Cắt Gió (Vortex Blade):** Đạn bay theo quỹ đạo hình sin đan chéo (`wave cross`), phủ kín bề ngang màn hình. | **Cuồng Phong Cực Quang:** Nâng cấp lốc xoáy hiện tại bằng cách thêm **3 vòng gió xoáy đồng tâm + các mảnh sấm sét** cuốn bay quái nhỏ. |
| **Tàu 12** *(Thời Không / Bánh Răng)* | **Đĩa Cưa Thời Gian (Chrono Saw):** Đạn hình bánh răng xoay tít, găm vào thân Boss xoay tại chỗ gây **sát thương nhiều hit liên tiếp trong `0,6s**` *(ước lượng)*. | **Ngưng Đọng Thời Không:** Triệu hồi mặt đồng hồ bánh răng khổng lồ (giảm độ chói trắng/vàng ở bậc Thường/SS), **làm chậm 70% tốc độ đạn địch** trong vùng ảnh hưởng. |
| **Tàu 13** *(Tối Thượng / Hạm Đội)* | **Hạm Đội Hộ Tống (Drone Volley):** Ngoài đạn chính, 2 chiến cơ hộ tống tự động tách ra hai bên bắn chéo góc hỗ trợ hỏa lực. | **Tổng Lực Hạm Đội:** Triệu hồi **6 chiến cơ hộ tống** bay lướt qua màn hình rải thảm bom laser + đồng loạt khai hỏa chùm pháo chính. |

---

### E. GIỚI HẠN HIỆU NĂNG (GIỮ $\ge 50$ FPS TRÊN ĐIỆN THOẠI TẦM TRUNG)

Để hiệu ứng dày và rực rỡ hơn nhưng không làm tụt FPS khi Bạo Tẩu + Boss xả đạn:

1. **Ngân sách `lighter` mỗi khung hình:** Giới hạn tối đa **`60` lượt vẽ** dùng `globalCompositeOperation = 'lighter'` trên 1 frame. Các viên đạn thường vẽ bằng `source-over` (dùng sẵn sprite có quầng sáng vẽ sẵn trong ảnh PNG).
2. **Ngân sách hạt hiệu ứng (`Particles`):** Tối đa **`80` hạt** tồn tại cùng lúc trên màn (vòng nổ, tia lửa chạm, đuôi tên lửa). Khi vượt quá `80`, tự động tái sử dụng hạt cũ nhất (`Object Pool`), tuyệt đối không `new Object()` mỗi frame để tránh giật khung hình do rác bộ nhớ (`GC`).
3. **Cache Gradient & Texture tia:** Tạo sẵn các dải texture tia (`offscreen canvas` kích thước `64 × 256 px`) cho 6 bậc màu ngay lúc tải game; trong trận chỉ gọi `drawImage()` kéo giãn theo chiều dài tia thay vì tạo lại `createLinearGradient()` mỗi khung hình.

---

### F. PROMPT TIẾNG ANH CHO GPT VẼ TEXTURE HIỆU ỨNG MỚI (2 LƯỢT GỌN)

Nếu bạn muốn Claude ghép các dải tia, đầu nòng và vụ nổ hạt nhân sắc nét như game gốc mà không tốn sức CPU vẽ bằng code, chỉ cần gửi **2 lượt prompt** dưới đây cho GPT:

#### Lượt 1 — Bộ 6 Dải Tia Laser / Năng Lượng & Đầu Nòng (`fx_beams_6tiers.png`)

*Kích thước: Ảnh vuông `2048×2048`, nền `#000000` (chia lưới 6 cột dọc tương ứng 6 bậc màu mới). Claude cắt mỗi cột làm texture tia 3 lớp.*

```text
Create a clean 6-column vertical sprite sheet (6 equal vertical strips side-by-side) isolated on a solid pitch-black background (#000000), showing high-energy sci-fi laser beam textures and circular muzzle-flare orbs for a vertical arcade shooter.
CRITICAL COLOR & ANTI-GLARE RULE: Each beam strip MUST have a crisp, thin bright core (only 20% width in the center) surrounded by a rich, deeply saturated plasma body (55% width) and a smooth outer glow (25% width) — DO NOT wash out into pure white.
6 Columns from Left to Right (each column contains 1 vertical flowing plasma beam texture on top + 1 matching 4-point star muzzle-flare & impact ring at the bottom):
1. Column 1 (Tier 1 - Steel Ice-Silver): Core #d8f3ff, Body #5bc0eb, Outer #1d4ed8
2. Column 2 (Tier 2 - Emerald Plasma): Core #bbf7d0, Body #10b981, Outer #047857
3. Column 3 (Tier 3 - Electric Cobalt): Core #bae6fd, Body #0284c7, Outer #1e3a8a
4. Column 4 (Tier 4 - Royal Violet): Core #e9d5ff, Body #9333ea, Outer #581c87
5. Column 5 (Tier 5 - Cosmic Magenta): Core #f5d0fe, Body #d946ef, Outer #86198f
6. Column 6 (Tier 6 - Solar Amber-Gold): Core #fef08a, Body #f59e0b, Outer #b45309
Style: Ultra-crisp 2D sci-fi mobile arcade VFX with subtle internal energy ripples along the beam. No text, no numbers, no borders.

```

#### Lượt 2 — Bộ 4 Hiệu Ứng Vụ Nổ Hạt Nhân / Sóng Xung Kích / Lưới Điện / Lưỡi Trảm (`fx_special_vfx_2x2.png`)

*Kích thước: Ảnh vuông `2048×2048` (lưới `2×2`, mỗi ô `1024×1024`), nền `#000000` — dùng cho Tàu 05, 06, 07, 08.*

```text
Create a clean 2x2 grid VFX sprite sheet (4 equal square tiles with generous black margins) isolated on a solid pitch-black background (#000000) for a top-down 2D sci-fi arcade shooter:
- Top-Left [fx_nuke_blast]: Top-down view of a dramatic fiery nuclear plasma explosion fireball with an intense amber-gold core (#f59e0b), molten orange shockwave ring, and flying hot embers.
- Top-Right [fx_prism_node]: Radiant faceted sci-fi energy prism crystal orb surrounded by geometric hexagonal light rings and cyan-violet refraction rays.
- Bottom-Left [fx_crescent_slash]: Sweeping razor-sharp energy crescent blade arc with layered plasma motion trails and bright electric edges (oriented upward).
- Bottom-Right [fx_shockwave_ring]: Crisp expanding sci-fi electromagnetic shockwave ring with intricate segmented energy ripples and electric arcs around the perimeter.
Style: High-contrast modern mobile arcade VFX, deeply saturated colors, zero pure-white blowout. No text, no numbers, no frame lines.

```