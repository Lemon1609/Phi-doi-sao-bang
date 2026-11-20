Dựa trên toàn bộ ảnh chụp 10 chương (01_quai_10_chuong, 02_boss_ch01→ch10, 03_zoom_ch1/5/9), bảng 18 sprite cũ (00_sprite_dan_quai_18) và đối chiếu trực tiếp với đạn địch trong video gameplay tham khảo, dưới đây là bản thiết kế lại toàn diện Hệ Thống Đạn Quái, Đạn Boss & Laser Địch (V309).
A. CHẤM NHANH ĐẠN ĐỊCH HIỆN TẠI
 * Độ tách lớp & độ rõ:
   * Đạn tròn hiện tại (red_round): Lõi trắng chiếm tới ~80% diện tích còn viền hồng quá mỏng và bị răng cưa nhẹ, đặt cạnh tàu mới 3D và tia 3 lớp của người chơi nhìn bị phẳng, đơn điệu.
   * Đạn kim hiện tại (red_needle): Quá mảnh và tối ở phần đuôi (03_zoom_ch5, 03_zoom_ch9), rất dễ bị chìm vào tia lửa nổ hoặc lẫn vào nền tối khi bắn dày.
 * Đơn điệu & trùng màu giữa các chương:
   * Dù có 18 sprite 6 màu nhưng thực tế cả 10 chương đều gần như chỉ bắn 1 kiểu chấm hồng-đỏ (01_quai_10_chuong, 02_boss_ch01→ch10), không phân biệt được đâu là đạn thường, đâu là đạn nhanh nguy hiểm hay đạn nảy.
   * Màu hồng tươi hiện tại hơi gần với Bậc 5 (Tím+5 #d946ef) của người chơi khi vào Bạo Tẩu.
 * Các chương đang dễ rối mắt nhất:
   * Chương 6 & Chương 8: Nền có tông đỏ sẫm/nâu tối và cấu trúc tàu dày, đạn kim đỏ mảnh dễ bị chìm.
   * Chương 9 & Chương 10: Quái Hư Không/Thánh Đường bắn chùm kim dày kết hợp nhiều vụ nổ vàng/đỏ, nếu bật cả đạn chính người chơi sẽ khó nhìn khoảng trống để lách.
 * Bài học từ game gốc (qua video tham khảo 87970.mp4, 87934.mp4):
   * Game gốc không dùng chấm tròn trắng bệt mà dùng giọt lửa/đạn thuôn cam-đỏ có độ bóng khối, kết hợp cầu năng lượng lớn có vòng xoáy/lõi hoa văn rõ rệt cho đạn nguy hiểm — nhìn vào là phân biệt ngay lập tức trong 0,05 giây.
B. BẢNG MÀU ĐẠN ĐỊCH MỚI (TÁCH BIỆT 100% VỚI 6 MÀU ĐẠN NGƯỜI CHƠI)
Nguyên tắc khóa màu 2 phe:
 * Người chơi giữ dải màu lạnh/rực: Bạc Thép Xanh (#5bc0eb), Lục Bảo (#10b981), Cobalt (#0284c7), Hồng Tím (#d946ef), Hoàng Kim Hổ Phách (#f59e0b).
 * Quái & Boss khóa chặt vào 4 tông Nguy Hiểm (Đỏ Thẫm – Cam Đỏ Lửa – Đỏ Tía Hư Không – Đỏ Chu Sa Quá Tải), tuyệt đối không dùng Xanh Lam, Xanh Lục sáng hay Vàng tươi làm màu chủ đạo cho đạn địch (tránh trùng đạn người chơi và vật phẩm nhặt).
| Nhóm đạn địch / Vai trò | Tên tông màu | Lõi sáng (Core — 35%) | Thân bão hòa (Body — 45%) | Quầng ngoài (Glow — 20%) | Viền tách nền (Dark Rim) | Gán cho phe / loại đòn |
|---|---|---|---|---|---|---|
| 1. Đạn chuẩn (Quái & Boss) | Đỏ Huyết Quang (Crimson Pulse) | #ffe4e6 | #ff1e42 | #b91c1c | #240008 | Quái thường các phe, đạn tròn/giọt cơ bản (FAN_BURST, RING_PULSE). |
| 2. Đạn nhanh / Bắn tỉa | Cam Đỏ Hỏa Diệm (Molten Vermilion) | #ffedd5 | #ff4d00 | #c2410c | #2b0a00 | Đạn kim dày, đạn ngắm thẳng (AIMED_BURST), phe Lò Rèn / Huyết Giác. |
| 3. Đạn đặc biệt / Hư không | Đỏ Tía Mận (Abyssal Berry) | #fce7f3 | #e11d74 | #7e1248 | #1f0012 | Đạn nảy (RICOCHET_ORBS), xoắn kép (DOUBLE_HELIX), phe Nhật Thực / Hư Không / Thánh Đường. |
| 4. Đạn chí mạng / Laser / Mìn | Đỏ Rực Quá Tải (Hyper Scarlet) | #fff1f2 | #ff002b | #99001a | #1a0004 | Cầu năng lượng lớn, sóng cung, mìn hẹn giờ (TIMED_BOMB), Laser Boss. |
(Lưu ý: Màu Đỏ Tía Mận #e11d74 lệch hẳn sang đỏ thẫm so với Hồng Tím #d946ef của người chơi; còn Cam Đỏ #ff4d00 đậm và rực đỏ hơn hẳn Hoàng Kim Hổ Phách #f59e0b của bậc SS.)
C. HỆ THỐNG 8 HÌNH DẠNG ĐẠN ĐỊCH & PHÂN BỔ CHO 30 ĐÒN BOSS
Giữ nguyên hitbox vật lý hiện tại (r = 3–10 px), nâng cấp 3 dạng cũ và bổ sung 5 dạng mới để mỗi đòn Boss nhìn có bản sắc riêng và dễ đọc quỹ đạo:
| STT | Dạng đạn | Mô tả hình khối | Tỉ lệ cỡ vẽ / Hitbox (r) | Áp dụng cho đòn Boss & Quái |
|---|---|---|---|---|
| 1 | Cầu Huyết Quang (nâng cấp round) | Viên bi năng lượng 3D có lõi sáng gọn, viền đỏ dày bóng mượt. | 2,2 × r (r = 4–6 px) | Quái thường, RING_PULSE, ROSETTE_BLOOM, GAP_COLUMNS. |
| 2 | Giọt Lửa / Mũi Nhọn Dày (nâng cấp needle) | Dạng giọt nước thuôn nhọn (như game gốc 87970), bầu ở đầu, nhọn đuôi, dày gấp 1,8× kim cũ. | Rộng 2,0 × r, dài 4,2 × r (r = 3,5–5 px) | Quái bắn tỉa, AIMED_BURST, FAN_BURST, GAP_ARC. |
| 3 | Thoi Tinh Thể Xoay (nâng cấp diamond) | Hình thoi sắc cạnh có đường gân sáng, xoay nhẹ theo hướng bay. | Rộng 2,1 × r, dài 3,2 × r (r = 4,5–6 px) | DOUBLE_HELIX, CHECKERBOARD_GRID, X_CROSS. |
| 4 | Cầu Năng Lượng Lớn (mới — học game gốc) | Quả cầu lớn có vòng năng lượng xoáy bên trong và hào quang đỏ tía, di chuyển chậm nhưng áp lực cao. | 2,1 × r (r = 9–12 px) | RICOCHET_ORBS, đạn mở màn pha 2–3, Boss lớn. |
| 5 | Sóng Cung Chém (mới) | Vệt trăng khuyết đỏ cam sắc lẹm, tạo tường chắn cần lách khe hở. | Rộng 3,2 × r, dày 1,6 × r (r = 6–8 px) | PURGE_WALL, GAP_ARC (pha 3). |
| 6 | Phi Tiêu / Bánh Răng Xoay (mới) | Đạn 4 cánh chữ thập xoay tròn liên tục 6 rad/s (ước lượng), nhìn rõ độ xoáy. | 2,3 × r (r = 6–7 px) | GEAR_SPIRAL, phe Lò Rèn / Giáp Trùng. |
| 7 | Tia Đạn Ngắn (Energy Bolt) (mới) | Thanh plasma ngắn 2 đầu bo tròn, tốc độ bay cao hơn đạn tròn 25%. | Rộng 1,7 × r, dài 4,5 × r (r = 4–5 px) | Loạt bắn nhanh pha 2–3, ụ pháo cánh Boss. |
| 8 | Mìn Hẹn Giờ (Timed Mine) (mới) | Lõi cầu gai kim loại đen có vòng đếm ngược đỏ nhấp nháy nhanh dần trước khi nổ bung thành vòng đạn. | 2,0 × r (r = 10–12 px) | TIMED_BOMB. |
D. QUY TẮC "DỄ NÉ" CHUẨN GAME ARCADE MOBILE (MÀN 480 × 1040)
 * Tỉ lệ Lõi / Thân / Viền tách nền (Sửa dứt điểm lỗi bệt trắng):
   * Lõi sáng (Core): Chỉ chiếm 35% – 45% đường kính viên đạn (giảm từ ~80% hiện tại) để vẫn sáng rực nhưng không bị chói.
   * Thân màu bão hòa (Body): Chiếm 35% – 45% — đây là phần giúp mắt nhận diện màu nguy hiểm ở tầm nhìn ngoại vi.
   * Viền tối tách nền (Dark Rim): Giữ vòng tối #240008 dày 1,5 – 2,0 px (alpha = 0,75) bọc sát rìa ngoài thân màu, sau đó mới tới quầng sáng mỏng bên ngoài. Nhờ đó đạn địch nổi bần bật ngay cả khi bay cắt ngang luồng đạn Bạo Tẩu rực sáng của người chơi.
   * Tuyệt đối vẽ đạn địch ở lớp trên cùng (z-index cao hơn đạn người chơi và hiệu ứng nổ) bằng chế độ source-over (không dùng lighter cho thân đạn địch).
 * Chớp báo trước khi bắn (Muzzle Telegraph):
   * Trước khi Boss hoặc quái lớn nhả loạt đạn nhanh (AIMED_BURST, RICOCHET_ORBS), vẽ 1 vòng tròn tụ năng lượng thu nhỏ từ 24 px → 6 px tại nòng súng trong 0,28 – 0,35 s (ước lượng) màu #ff1e42. Người chơi có phản xạ né trước khi đạn rời nòng.
 * Giới hạn tốc độ theo kích cỡ (màn logic 480 × 1040):
   * Đạn nhỏ / đạn kim (r ≤ 4,5 px): tối đa 380 – 440 px/s (ước lượng).
   * Đạn vừa (r = 5–7 px): tối đa 260 – 330 px/s (ước lượng).
   * Cầu lớn / sóng cung (r ≥ 8 px): tối đa 170 – 230 px/s (ước lượng).
 * Mật độ & khe né tối thiểu:
   * Khe hở tối thiểu giữa 2 viên đạn trong các đòn tường/vòng (PURGE_WALL, GAP_COLUMNS, RING_PULSE) phải ≥ 42 px (gấp ~2,5× đường kính hitbox tâm tàu người chơi) để tay người chơi trên màn cảm ứng luôn có đường lách công bằng.
E. CÔNG THỨC LASER BOSS BẢN ĐỊCH (TRIPLE_LASER, PARTITION_LASERS, TWIN_PILLAR)
Áp dụng cấu trúc 3 giai đoạn rõ ràng, tách biệt hẳn với tia xanh/tím của người chơi:
 * Giai đoạn 1 — Báo trước (Telegraph: 0,85 s cho Boss thường / 0,70 s cho Pha 3) (ước lượng):
   * Vẽ dải băng cảnh báo mờ màu #ff002b (alpha = 0,14, rộng bằng 100% bề rộng tia thật sắp bắn) + 2 đường biên nét đứt rộng 1,5 px chạy dọc theo chiều tia.
   * Ở 0,25 s cuối cùng: 2 đường biên thu hẹp nhanh vào tâm + chớp nhanh 16 Hz + vòng tụ sáng tại nòng Boss phình to 32 px báo hiệu sắp khai hỏa.
 * Giai đoạn 2 — Khai hỏa (Active Beam — Tia 3 lớp bản địch):
   * Quầng ngoài (Outer Glow): Rộng 1,8 × W (W = bề rộng hitbox laser, thường 18 – 28 px cho TRIPLE_LASER / PARTITION_LASERS, 36 – 48 px cho TWIN_PILLAR), màu #99001a, alpha = 0,35.
   * Thân Plasma Đỏ (Body): Rộng 1,0 × W, màu #ff002b \rightarrow #ff4d00 với vân sóng năng lượng chảy dọc xuống dưới (tốc độ cuộn texture 900 px/s).
   * Lõi Siêu Nhiệt (Core): Rộng 0,28 × W, màu #fff1f2, rung biên độ ±1,5 px theo Math.sin(t * 35).
   * Đầu nòng: Sprite vòng xoáy đỏ rực xoay tại vị trí miệng pháo Boss.
 * Giai đoạn 3 — Tắt tia (Fade Out: 0,18 s):
   * Tắt hitbox ngay lập tức khi bắt đầu Fade Out, thu hẹp bề rộng tia từ 100% → 0% (tránh tình trạng tia mờ rồi mà người chơi chạm vào vẫn mất máu).
F. NGÂN SÁCH HIỆU NĂNG (ĐẢM BẢO \ge 50\text{ FPS} MÁY TẦM TRUNG)
 * Số viên đạn địch tối đa trên màn: Giới hạn cứng 140 viên cùng lúc (thực chiến đẹp nhất ở mức 45 – 95 viên). Nếu Boss gọi đòn vượt ngưỡng 140, tự động bỏ qua viên cũ nhất ngoài rìa màn.
 * Kỹ thuật vẽ tối ưu cho Claude:
   * Toàn bộ đạn địch vẽ từ 1 ảnh Sprite Sheet duy nhất (fx_enemy_bullets_4x4.png) bằng drawImage() ở chế độ source-over — 0 lần dùng shadowBlur, 0 lần đổi globalCompositeOperation = 'lighter' trong vòng lặp đạn địch.
   * Phần viền tối tách nền (#240008) và quầng sáng được vẽ sẵn trực tiếp trong sprite PNG nên mỗi viên đạn chỉ tốn đúng 1 lệnh drawImage() (140 viên tốn < 0,8 ms mỗi frame).
   * Chỉ dùng lighter cho tối đa 4 cột Laser Boss và 12 vòng tụ nòng cùng lúc.
G. PROMPT TIẾNG ANH CHO GPT VẼ TRỌN BỘ ĐẠN & LASER ĐỊCH (2 LƯỢT GỌN)
Lượt 1 — Bộ 16 Sprite Đạn Quái & Boss (fx_enemy_bullets_4x4.png)
Kích thước: Ảnh vuông 2048×2048 (lưới 4×4, mỗi ô 512×512 có lề đen rộng), nền #000000. Tất cả đạn hướng mũi XUỐNG DƯỚI (6 giờ).
Create a clean 4x4 grid VFX sprite sheet (4 columns x 4 rows = 16 equal square tiles, generous black margin around each projectile) isolated on a solid pitch-black background (#000000) for a top-down 2D sci-fi vertical arcade shooter.
CRITICAL READABILITY & ANTI-GLARE RULE: Every enemy projectile MUST have a compact bright core (35-40% size), a deeply saturated glowing crimson/vermilion/berry body (45%), and a crisp subtle dark rim separating it cleanly so it pops over busy space battles. ALL directional projectiles MUST point straight DOWN (6 o'clock). Style: Ultra-crisp modern 3D-shaded arcade plasma bullets (matching top-tier mobile bullet-hell quality). No text, no numbers, no borders.

- Row 1 (Standard Crimson Pulse - Core #ffe4e6, Body #ff1e42, Glow #b91c1c):
  1. [e_round_red] Glossy 3D crimson plasma sphere orb with tight bright core
  2. [e_drop_red] Plump sharp-tipped crimson energy teardrop/dart pointing straight down
  3. [e_diamond_red] Faceted glowing crimson crystal diamond lozenge pointing vertically
  4. [e_bolt_red] Sleek short vertical crimson plasma energy bolt with rounded fiery head pointing down

- Row 2 (Fast Molten Vermilion - Core #ffedd5, Body #ff4d00, Glow #c2410c):
  5. [e_round_orange] Fiery molten vermilion-orange plasma orb with crisp glowing rim
  6. [e_drop_orange] Aerodynamic fiery orange-red flame teardrop bullet pointing straight down
  7. [e_shuriken_orange] 4-bladed spinning dark-metal & molten-orange plasma gear-star
  8. [e_arc_orange] Razor-sharp downward-curving molten orange-red crescent energy wave slash

- Row 3 (Special Abyssal Berry-Crimson - Core #fce7f3, Body #e11d74, Glow #7e1248):
  9. [e_orb_heavy_berry] Large high-threat crimson-magenta energy orb with intricate glowing swirling vortex rings inside
  10. [e_diamond_berry] Sharp abyssal berry-red crystal diamond with bright inner spine
  11. [e_shuriken_berry] 4-pointed spinning abyssal berry-crimson energy cross-blade
  12. [e_arc_berry] Wide downward-curving berry-crimson plasma wave arc

- Row 4 (Hyper Scarlet Lethal & Boss Specials - Core #fff1f2, Body #ff002b, Glow #99001a):
  13. [e_orb_heavy_scarlet] Massive lethal hyper-scarlet plasma sphere with crackling dark-red energy rings inside
  14. [e_mine_idle] Spiked dark-obsidian spherical sci-fi space mine with glowing red warning nodes
  15. [e_mine_arming] Same spiked sci-fi mine in critical overdrive with blazing red-white core and expanding red danger ring
  16. [e_muzzle_flash] Crisp glowing crimson-scarlet 6-point energy charge starburst & ring for enemy gun telegraph

Lượt 2 — Bộ 3 Dải Tia Laser Boss Bản Địch (fx_enemy_lasers_3col.png)
Kích thước: Ảnh vuông 1536×1536 (hoặc 2048×2048, chia lưới 3 cột dọc thẳng hàng, nền #000000), cấu trúc y hệt tấm fx_beams_6tiers.png lần trước để Claude dùng chung 1 hàm cắt.
Create a clean 3-column vertical VFX sprite sheet (3 equal vertical strips side-by-side) isolated on a solid pitch-black background (#000000), showing menacing enemy Boss laser beams for a top-down vertical sci-fi arcade shooter.
CRITICAL COLOR & ANTI-GLARE RULE: Each beam strip MUST have a crisp thin hot core (25% width), a deeply saturated menacing plasma body (50% width), and a smooth dark-colored outer glow (25% width) with internal flowing energy ripples.
Each of the 3 columns contains: 1 vertical flowing plasma beam texture on top (y: 0%-72%) + 1 matching glowing energy starburst muzzle flare in the middle (y: 73%-85%) + 1 matching crackling energy impact ring at the bottom (y: 86%-100%):
1. Column 1 (Hyper Scarlet Boss Laser): Core #fff1f2, Body #ff002b, Outer #99001a
2. Column 2 (Molten Vermilion Siege Laser): Core #ffedd5, Body #ff4d00, Outer #c2410c
3. Column 3 (Abyssal Berry-Crimson Void Laser): Core #fce7f3, Body #e11d74, Outer #7e1248
Style: Ultra-crisp modern 2D sci-fi arcade VFX, zero pure-white blowout. No text, no numbers, no borders.

Bạn gửi 2 prompt này cho GPT xong cứ quăng ảnh kết quả vào đây mình nghiệm thu nhanh trước khi chuyển Claude nhé!
