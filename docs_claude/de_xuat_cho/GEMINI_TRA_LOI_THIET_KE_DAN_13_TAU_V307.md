Nhìn vào hai ảnh đối chiếu (`A4_dan_truoc_sau.jpg` và `dan_trong_tran_game_goc_10_khung.jpg`), nguyên nhân khiến bản hiện tại bị đánh giá "XẤU" nằm ở 3 điểm cốt lõi: **(1) Mật độ quá dày** khiến các viên đạn dính liền thành "dây xích/cột biểu tượng" tĩnh tại thay vì cảm giác đang lao đi; **(2) Góc bắn quá hẹp**, gần như chỉ đi thẳng 1–2 cột; **(3) Cháy sáng (`additive` quá tay)** làm mất độ bão hòa màu và dễ che khuất đạn địch.

Dưới đây là thiết kế lại toàn bộ hệ thống đạn chính (bỏ chuỗi hạt, chuyển sang vệt khí động học sắc nét, tách lớp rõ ràng, giữ nguyên DPS).

---

### A. Quy tắc chung cho đạn chính (Màn hình 393×852, tàu ~64×64 px)

| Thông số | Thông số chuẩn đề xuất | Cơ chế & Lý do thiết kế |
| --- | --- | --- |
| **Số viên trên màn (bậc Tím)** | **10 – 18 viên** (tối đa 24 với tàu tán xạ) | Giảm 60–80% số lượng so với hiện tại (40–140 viên). Tạo khoảng trống tối thiểu **45–70 px** theo chiều dọc giữa 2 loạt đạn để nhìn rõ đạn địch đỏ/hồng.

 |
| **Tốc độ bay ($V$)** | **1.250 – 1.750 px/s** (tên lửa tự tìm: 950–1.150 px/s) | Thời gian đạn đi hết màn (từ tàu lên đỉnh ~700 px) chỉ mất **0,40 – 0,55 giây**. Vận tốc cao giúp ít đạn tồn tại trên màn nhưng cảm giác bắn rất "gắt" và lực. |
| **Chiều dài vệt đạn ($L$)** | **48 – 96 px** (tỉ lệ **0,75× đến 1,5×** chiều dài tàu) | Thân đạn thực tế chỉ dài ~25–40 px, phần còn lại là đuôi khí động học mờ dần (`alpha` giảm từ 0.8 về 0). Đạn laser/kiếm khí có thể dài 110–140 px. |
| **Độ xòe quạt** | **±14° đến ±32°** (chia đều góc hoặc đối xứng 2 cánh) | Xóa bỏ hoàn toàn kiểu bắn 1–2 cột dọc song song. Quạt xòe mở không gian trung tâm, ôm trọn quái rộng mà không che tầm nhìn.

 |
| **Nhịp bắn (Fire Rate)** | **5,5 – 8,5 loạt/giây** (chu kỳ 120–180 ms/loạt) | Thay vì bắn 20 loạt/giây ra 1 viên, hãy bắn 6–7 loạt/giây nhưng mỗi loạt tỏa ra 3–5 tia đồng thời → tạo nhịp (rhythm) rõ rệt, tách bạch từng đợt đạn. |
| **Tăng tiến 6 bậc (Giữ nguyên DPS)** | **Bậc 1 (Thường):** 1–2 tia hẹp (±4°), vệt ngắn (0,7× tàu) |  |



**Bậc 2 (Lục):** 2–3 tia (±8°), vệt 0,85×



**Bậc 3 (Lam):** 3–4 tia (±14°), tăng tốc +10%



**Bậc 4 (Tím):** 4–5 tia (±20°), vệt 1,1×, thêm hiệu ứng rìa



**Bậc 5 (Tím+5):** 5–6 tia (±25°), vệt 1,25×, lõi sắc hơn



**Bậc 6 (SS):** 6–7 tia (±30°), vệt 1,4×, thêm tia phụ cắt chéo | **Công thức khóa DPS:**



$\text{DMG}_{\text{viên}} = \frac{\text{DPS}_{\text{bậc}}}{\text{Số tia} \times \text{Nhịp bắn}}$



Ví dụ: Bậc Lam 3 tia (100 DMG/viên) lên Bậc Tím 5 tia thì mỗi viên còn 60 DMG. Cảm giác mạnh lên đến từ **độ phủ quạt rộng hơn, vệt dài hơn và âm thanh/va chạm dày hơn**, không cần nhồi thêm hàng dọc. |
| **Trạng thái Bạo Tẩu (~8s)** | **Tăng 1,6× – 2,0× số tia** + **Góc mở tối đa ±38°** + **Chuyển tông Vàng Kim / Bạch Kim rực** | Lúc này mới kích hoạt hiệu ứng "bùng nổ" giống khung 6–9 của game gốc: mật độ tăng lên ~35–45 viên/màn, thêm hào quang cánh tàu và tia phụ bắn liên tục. |

---

### B. Thiết kế chi tiết đạn chính cho 13 chiến cơ (Mức chuẩn tại Bậc Tím)

*(Ghi chú: Sát thương/viên tính theo tỉ lệ tương đối so với 100% DPS của chính tàu đó ở Bậc Tím).*

| # | Chiến cơ (Hệ / Chủ đề) | Kiểu đạn & Hình dạng vẽ (Thay thế bản cũ) | Bố cục bắn theo 6 bậc (Tia × Góc tổng) | Tốc độ (px/s) | Nhịp bắn (loạt/s) | Viên trên màn (Tím) | DMG / viên (Tím) | Bảng màu tiến hóa (Thường → SS) | Hiệu ứng trúng đích & Đạn Bạo Tẩu |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **1** | **Nộ Hỏa Phượng Hoàng** |  |  |  |  |  |  |  |  |



*(Liên thanh / Thiêu đốt)* | **Lông Vũ Lửa (Fire Feather):** Đầu nhọn hình mũi giáo, thân thon như lông vũ rực cháy, đuôi tàn lửa kéo dài 75 px. | B1: 2×6°



B2: 3×12°



B3: 4×18°



B4: **5×26°**



B5: 6×32°



B6: 7×38° | 1.550 | 6,5 | ~16 | 3,08% DPS | Vàng cam → Cam đỏ → Đỏ thẫm lõi vàng → **Vàng trắng rực** | **Trúng:** Bùng tia lửa nhỏ + cháy xém.



**Bạo Tẩu:** 9 tia hình cánh phượng xòe ±42°, mỗi loạt kèm 2 lông vũ lớn lượn sóng ở rìa. |
| **2** | **Cực Quang Ảo Ảnh**



*(Laser xuyên / Laser)* | **Chùm Lăng Kính Khúc Xạ (Prism Ray):** Thay 1 cột đặc bằng 1 trục laser chính mảnh (rộng 14 px, alpha 0.55 nhìn xuyên quái) + các tia khúc xạ chéo mỏng đan lưới. | B1: 1 trục mảnh



B2: 1 trục + 2 tia cắt 10°



B3: 1 trục + 2 tia cắt 16°



B4: **1 trục + 4 tia cắt 22°**



B5: 2 trục song song hẹp + 4 tia



B6: 2 trục + 6 tia | 1.800 *(xung nhịp)* | 8,0 *(tick)* | ~9 *(xung)* | 2,50% DPS/tick | Xanh ngọc nhạt → Lục bảo → Cyan → **Xanh cực quang ánh tím** | **Trúng:** Vòng tròn sóng ánh sáng nở ra tại điểm chạm.



**Bạo Tẩu:** Chùm laser mở rộng thành dải lụa cực quang nhiều màu trong mờ, quét liên tục. |
| **3** | **X-Dực Băng Hà**



*(Cầu Plasma / Đóng băng)* | **Mũi Thương Băng Tinh (Ice Lance):** Bỏ khối băng vuông; vẽ tinh thể băng bát diện thuôn nhọn 2 đầu, viền sắc lạnh, đuôi sương giá dài 65 px. | B1: 1×0°



B2: 2×10°



B3: 3×16°



B4: **4×24°**



B5: 5×30°



B6: 6×36° | 1.400 | 6,0 | ~13 | 4,17% DPS | Xanh lơ nhạt → Xanh băng → Xanh coban → **Trắng xanh kim cương** | **Trúng:** Vỡ thành 3 mảnh băng nhỏ văng ngang.



**Bạo Tẩu:** Bắn 7 mũi thương băng cỡ đại xen kẽ mưa kim băng siêu mảnh. |
| **4** | **Thần Ma Dị Hình**



*(Tên lửa tự tìm / Xuyên thấu)* | **Nanh Vuốt Huyết Ảnh (Void Fang):** Đao năng lượng cong hình liềm nhọn lao theo quỹ đạo uốn cong nhẹ (arc) vào mục tiêu, để lại vệt khói năng lượng mảnh. | B1: 2×15° *(cong vào)*



B2: 2×24°



B3: 4×32°



B4: **4×40°**



B5: 6×46°



B6: 6×52° | 1.150 | 5,5 | ~14 | 4,55% DPS | Xanh lục độc → Lục bảo → Tím lục → **Tím đen viền neon xanh** | **Trúng:** Vết chém chữ X màu neon tại điểm trúng.



**Bạo Tẩu:** Triệu hồi 8 nanh vuốt phóng tỏa tròn rồi đồng loạt bẻ góc lao xuyên qua boss. |
| **5** | **Trí Tuệ Thự Quang**



*(Liên thanh / Tán xạ)* | **Quang Tiễn Kim Cương (Radiant Dart):** Mũi tên ánh sáng siêu mảnh (rộng 6 px, dài 85 px), đầu nhọn hình thoi sắc như kim, bay cực nhanh tạo cảm giác mưa ánh sáng thoáng. | B1: 3×12°



B2: 4×18°



B3: 5×24°



B4: **7×34°**



B5: 8×40°



B6: 9×46° | 1.750 | 7,0 | ~22 | 2,04% DPS | Vàng nhạt → Vàng nắng → Vàng kim → **Bạch kim ánh vàng** | **Trúng:** Chớp sao 4 cánh nhỏ.



**Bạo Tẩu:** Bắn quạt 13 quang tiễn vàng rực đan chéo nhau như nan quạt ánh sáng. |
| **6** | **Siêu Nghiệm U Linh**



*(Đạn tỏa / Lượng tử khúc xạ)* | **Mảnh Vỡ Lượng Tử (Quantum Shard):** Thay khối pixel bằng các mũi tên tam giác rỗng ruột (wireframe/hologram) bay theo đường gấp khúc ziczac biên độ nhỏ (8 px). | B1: 2×14°



B2: 3×20°



B3: 4×26°



B4: **5×32°**



B5: 6×38°



B6: 7×44° | 1.350 | 6,0 | ~16 | 3,33% DPS | Xanh lơ điện tử → Cyan → Xanh tím → **Xanh ngọc neon viền trắng** | **Trúng:** Hiệu ứng nhiễu sóng (glitch) vuông nhỏ.



**Bạo Tẩu:** Mỗi viên đạn tách làm đôi giữa đường bay (phân thân lượng tử). |
| **7** | **Ma Vương Đao Phong**



*(Laser xuyên / Trảm kích)* | **Trăng Khuyết Kiếm Khí (Crescent Slash):** Bỏ 4 đường ngoằn ngoèo; dùng các nhát chém hình bán nguyệt mỏng, sắc lẹm, nghiêng góc 15° bắn so le trái–phải theo nhịp. | B1: 1 nhát chém rộng 40 px



B2: 2 nhát so le 14°



B3: 3 nhát quạt 22°



B4: **3 nhát lớn + 2 kiếm khí rìa 28°**



B5: 5 nhát quạt 34°



B6: 5 nhát + 2 kiếm khí khổng lồ | 1.650 | 6,5 | ~14 | 3,08% DPS | Trắng bạc → Vàng nhạt → Vàng kim → **Vàng rực viền đỏ/tím** | **Trúng:** Tia lửa kim loại tóe theo chiều chém.



**Bạo Tẩu:** Liên hoàn trảm — các nhát kiếm khí khổng lồ đan chéo chữ V liên tục. |
| **8** | **Phần Thiên Chiến Chuẩn**



*(Cầu Plasma / Pháo nhiệt áp)* | **Đầu Đạn Xuyên Giáp Nhiệt Áp (Thermobaric Sabot):** Mũi đạn hình thoi kim loại đỏ rực, đuôi phụt luồng khí phản lực trắng-cam tách rời rõ ràng (dài 80 px). | B1: 1×0°



B2: 2×10°



B3: 3×18°



B4: **4×26°**



B5: 5×32°



B6: 6×38° | 1.450 | 5,5 | ~12 | 4,55% DPS | Cam đất → Cam lửa → Đỏ cam → **Vàng cam lõi trắng** | **Trúng:** Vòng sóng xung kích nhiệt nhỏ (shockwave ring).



**Bạo Tẩu:** Phóng 6 đầu đạn nhiệt áp hạng nặng kèm vệt khói lửa dày đặc. |
| **9** | **Thiên Khung Lược Ảnh**



*(Tên lửa tự tìm / Song vũ)* | **Phi Tiêu Cánh Chim (Wing Blade):** Bỏ hình mũi tên giao diện (HUD); thiết kế dạng phi tiêu 2 cánh én thanh thoát, bay theo quỹ đạo vòng cung ôm từ hai bên hông tàu khép vào mục tiêu. | B1: 2×20°



B2: 2×28°



B3: 4×34°



B4: **4×42°**



B5: 6×48°



B6: 6×54° | 1.250 | 6,0 | ~13 | 4,17% DPS | Nâu vàng → Vàng đồng → Cam vàng → **Vàng ánh kim rực** | **Trúng:** Chớp sáng hình chữ V ngược.



**Bạo Tẩu:** 8 phi tiêu cánh én tạo thành đôi cánh ánh sáng khổng lồ lao về phía trước. |
| **10** | **Tinh Hà Thủ Vọng**



*(Cầu Plasma / Quân đoàn)* | **Thoi Năng Lượng Tinh Hệ (Starlight Spindle):** Thay 140 viên lục giác chồng đống bằng các thoi năng lượng hình giọt nước thuôn dài (dài 60 px), xòe quạt rộng như dải ngân hà. | B1: 2×8°



B2: 3×14°



B3: 4×22°



B4: **5×30°**



B5: 6×36°



B6: 7×42° | 1.500 | 6,0 | ~15 | 3,33% DPS | Xanh dương nhạt → Xanh thiên thanh → Xanh lam đậm → **Lam ngọc lõi sao trắng** | **Trúng:** Bụi sao lấp lánh tản ra.



**Bạo Tẩu:** 9 thoi tinh hệ bắn theo nhịp sóng sin mềm mại. |
| **11** | **Thôn Tinh Chiến Cơ**



*(Cầu Plasma / Trọng lực thôn phệ)* | **Mũi Khoan Hấp Dẫn (Gravity Lance):** Bỏ 2 cột cầu tròn; vẽ đầu nhọn hình nón xoắn ốc màu tím sẫm hút ánh sáng vào lõi, kéo theo dải sóng trọng lực hình chữ V ngược phía sau. | B1: 1×0°



B2: 2×12°



B3: 3×20°



B4: **3×26° *(cỡ lớn)***



B5: 4×32°



B6: 5×38° | 1.300 | 5,0 | ~9 | 6,67% DPS | Tím nhạt → Tím hoa cà → Tím đậm → **Tím đen viền hồng tím** | **Trúng:** Hiệu ứng co rút không gian (implosion) tại điểm chạm.



**Bạo Tẩu:** Bắn ra 5 mũi khoan trọng lực lớn, mỗi mũi kéo theo 2 vệ tinh tím xoay quanh. |
| **12** | **Thời Không Lữ Khách**



*(Laser xuyên / Lưỡng cực thời gian)* | **Kim Đồng Hồ Thời Không (Chrono Needle):** Thay bánh răng xoay nặng nề bằng những thanh kim chỉ giờ siêu mảnh, sắc nhọn, bắn xen kẽ 2 màu Lưỡng Cực (Vàng thời gian & Xanh không gian) theo hình quạt. | B1: 2×8°



B2: 3×14°



B3: 4×20°



B4: **5×28°**



B5: 6×34°



B6: 7×40° | 1.700 | 6,5 | ~16 | 3,08% DPS | Vàng nhạt → Vàng đồng → Vàng + Cyan → **Vàng kim & Xanh lơ lưỡng cực** | **Trúng:** Vòng tròn mặt đồng hồ mờ nhạt nháy lên 0,1s.



**Bạo Tẩu:** Bắn 10 kim thời không đan xen 2 màu vàng–xanh tốc độ siêu thanh. |
| **13** | **Hư Không Đế Vương**



*(Đạn tỏa / Phán quyết thứ nguyên)* | **Lưỡi Hái Phán Quyết (Dimension Scythe):** Bỏ kiểu xếp tầng 1 cột; giữ hình lưỡi hái nhưng kéo dẹt khí động học (mỏng, sắc, vệt chém dài), bắn tỏa quạt 3–5 hướng và hơi xoay góc theo quỹ đạo quạt. | B1: 1×0°



B2: 2×14°



B3: 3×22°



B4: **4×30°**



B5: 5×36°



B6: 6×42° | 1.400 | 5,5 | ~12 | 4,55% DPS | Tím xám → Tím than → Tím hoàng gia → **Tím sẫm viền vàng kim** | **Trúng:** Vết rạch không gian màu tím đen.



**Bạo Tẩu:** Phóng 7 đại lưỡi hái hư không xòe quạt rộng quét sạch màn hình. |

---

### C. Cấu trúc 3 lớp hiển thị trên HTML5 Canvas (Chống cháy trắng)

Để đạt độ bão hòa màu đẹp như game gốc (0,55–0,85) và tuyệt đối không bị lóa trắng khi đạn chồng lên nhau hoặc đè lên đạn địch:

| Lớp vẽ (Thứ tự từ dưới lên) | Tỉ lệ kích thước (so với thân đạn) | Blend Mode (`globalCompositeOperation`) | Độ trong suốt (`globalAlpha`) | Quy tắc màu sắc |
| --- | --- | --- | --- | --- |
| **1. Quầng sáng ngoài (Outer Glow)** | Rộng **1,8× – 2,2×**, Dài **1,2×** | `'source-over'` *(Khuyên dùng)* hoặc `'screen'` *(chỉ dùng khi Bạo Tẩu)* | **0,18 – 0,28** *(thường)* |  |



**0,35 – 0,45** *(Bạo Tẩu)* | Dùng màu bão hòa sâu (Saturation 80–95%, Lightness 45–55%). Tuyệt đối **không dùng `'lighter'` (additive)** cho lớp này vì 3 viên chồng nhau sẽ cộng thành trắng xóa. |
| **2. Thân màu chính (Main Body / Sprite)** | **1,0×** (kích thước chuẩn của viên đạn) | `'source-over'` | **0,85 – 0,95** *(đuôi fade dần về 0,0)* | Giữ nguyên sắc độ đặc trưng của từng tàu (xanh băng, tím hư không, vàng kim). Đây là lớp quyết định độ "đẹp" và "rõ hình" của viên đạn. |
| **3. Lõi năng lượng (Core Streak)** | Rộng **0,25× – 0,35×**, Dài **0,55×** *(chỉ tập trung ở phần đầu và giữa thân)* | `'lighter'` (Additive) | **0,50 – 0,65** *(thường)*



**0,80** *(Bạo Tẩu)* | Dùng màu sáng pha trắng (Lightness 85–95%, ánh nhẹ tông màu chính chứ không trắng tinh `#FFFFFF` 100%). Lõi nhỏ giúp viên đạn sắc nét mà không làm chói mắt. |

---

### D. Danh sách tài nguyên ảnh (Sprites) cần vẽ mới

Tất cả sprite đạn nên xuất nền trong suốt (PNG), kích thước chuẩn **64×128 px** hoặc **96×192 px** (tỉ lệ dọc 1:2 để vệt đuôi mượt, không bị răng cưa khi xoay góc quạt), hướng mũi đạn quay thẳng lên trên (0°).

| # | Tên tàu | Sprite cần vẽ mới (Trạng thái Thường → SS) | Sprite bổ sung cho Bạo Tẩu (Nếu cần khác biệt mạnh) |
| --- | --- | --- | --- |
| 1 | **Nộ Hỏa Phượng Hoàng** | `bullet_phoenix_feather.png`: Lông vũ lửa thuôn dài, đầu nhọn rực sáng, rìa có tàn lửa tách rời. | Dùng chung sprite trên + tint vàng kim + thêm `bullet_phoenix_wing_wave.png` (sóng lửa hình cánh). |
| 2 | **Cực Quang Ảo Ảnh** | Không cần sprite phức tạp; vẽ bằng Canvas gradient + 1 texture sọc nhiễu `laser_aurora_noise.png` (64×256 px) để cuộn UV tạo hiệu ứng lụa cực quang. | Dùng chung texture, tăng độ rộng và thêm dải màu thứ cấp. |
| 3 | **X-Dực Băng Hà** | `bullet_ice_lance.png`: Mũi thương tinh thể băng bát diện dài, vát cạnh sắc như pha lê, đuôi sương mờ. | `bullet_ice_lance_ss.png`: Thương băng có thêm ngạnh pha lê hai bên thân. |
| 4 | **Thần Ma Dị Hình** | `bullet_void_fang.png`: Nanh vuốt năng lượng cong nhẹ hình lưỡi liềm nhọn, lõi tối viền sáng sắc. | Dùng chung, lật đối xứng trái/phải khi bắn tỏa tròn. |
| 5 | **Trí Tuệ Thự Quang** | `bullet_radiant_dart.png`: Mũi tên ánh sáng siêu mảnh, đầu hình thoi dài, đuôi vút nhọn như kim. | Dùng chung sprite, tăng chiều dài kéo giãn (`scaleY = 1.3`). |
| 6 | **Siêu Nghiệm U Linh** | `bullet_quantum_shard.png`: Đầu mũi tên tam giác rỗng lõi (phong cách công nghệ cao/hologram) kèm 2 vệt đứt đoạn phía sau. | Dùng chung sprite. |
| 7 | **Ma Vương Đao Phong** | `bullet_crescent_slash.png`: Vệt kiếm khí hình trăng khuyết mảnh, sắc như dao cạo, một đầu dày vuốt nhọn về đầu kia. | `bullet_crescent_slash_heavy.png`: Nhát chém đôi song song. |
| 8 | **Phần Thiên Chiến Chuẩn** | `bullet_thermobaric_sabot.png`: Đầu đạn xuyên giáp hình thoi kim loại nóng đỏ + luồng lửa phản lực tách làm 2 tầng phía sau. | Dùng chung sprite + thêm vòng khói xung kích nhỏ. |
| 9 | **Thiên Khung Lược Ảnh** | `bullet_wing_blade.png`: Phi tiêu 2 cánh én khí động học thanh mảnh (thay mũi tên HUD thô cứng cũ). | Dùng chung sprite. |
| 10 | **Tinh Hà Thủ Vọng** | `bullet_star_spindle.png`: Thoi ánh sáng hình giọt nước kéo dài, phần đầu tròn sáng, phần đuôi vuốt cực mảnh. | Dùng chung sprite. |
| 11 | **Thôn Tinh Chiến Cơ** | `bullet_gravity_lance.png`: Mũi khoan năng lượng hình nón xoắn ốc, kéo theo 2 vệt sóng hút vào tâm. | `bullet_gravity_lance_mega.png`: Mũi khoan lớn kèm 2 chấm vệ tinh xoay quanh. |
| 12 | **Thời Không Lữ Khách** | `bullet_chrono_needle.png`: Thanh kim đồng hồ cổ điển siêu mảnh, sắc nhọn ở đầu, đuôi có vòng tròn nhỏ trang trí. | Xuất 2 bản màu: `chrono_gold.png` và `chrono_cyan.png` để bắn xen kẽ. |
| 13 | **Hư Không Đế Vương** | `bullet_void_scythe.png`: Lưỡi hái năng lượng kéo dẹt theo chiều bay (khí động học), lưỡi sắc bén, đuôi mờ dần. | `bullet_void_scythe_emperor.png`: Lưỡi hái kép có viền hoa văn vàng kim. |

Nếu bạn muốn, mình có thể viết sẵn **bộ prompt tiếng Anh chuẩn** cho từng sprite ở Mục D để Claude gửi thẳng cho công cụ vẽ ảnh (GPT/Midjourney) đảm bảo đồng bộ góc nhìn, tỉ lệ và nền trong suốt.