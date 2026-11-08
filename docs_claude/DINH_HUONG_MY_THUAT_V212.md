# ĐỊNH HƯỚNG MỸ THUẬT MỚI · V212 · Phi Đội Sao Băng

Chủ dự án quyết định **đổi toàn bộ phong cách** theo tinh thần dòng game bắn máy bay mobile đời đầu: nhiều màu neon trên nền xanh navy, các dạng "siêu cấp" rực rỡ. Luật cũ "giữ phong cách V196, không vẽ lại 13 tàu" **được bỏ**.

## Ranh giới bản quyền (bắt buộc)
- Chỉ học **phong cách chung**: bố cục, bảng màu, cách lên cấp có hiệu ứng.
- **Không** chép, đồ lại hay phối lại tranh của game gốc.
- **Không** dùng logo / watermark (omga…) và tên riêng của game gốc (Tia Chết Chóc, Lưu Tinh Pháo, Băng Dực, Lưỡi Rìu, Bình Minh, Cường Kích Đấu Sĩ, Tự Do Hạng Tướng…).
- Hình dáng tàu phải **tự thiết kế**: không làm tàu nào giống một tàu cụ thể của game gốc.
- Nữ chiến giáp giữ mức game mobile phổ thông, không khỏa thân, không gợi dục.

## 1. Ngôn ngữ hình ảnh

| Thành phần | Định hướng |
|---|---|
| Nền trưng bày (ngoài trận) | Xanh navy #06173A → #0B2A66. Lưới kỹ thuật mảnh #1E4FA8 độ đục 25%, chữ số liệu mờ ở góc. Bệ tròn hologram 3–4 vòng nét đứt #2F7BFF dưới chân |
| Bản vẽ nét (blueprint) | Mỗi tàu có một **hình nét phát sáng** xanh #3FA9FF (nét 2–3 px, không tô), dùng làm hình mờ trung tâm khi trưng bày tàu con / vũ khí |
| Vật liệu tàu | Kim loại bạc – xám đậm, khối sắc cạnh. Lõi năng lượng phát sáng (xanh / tím / lục). Động cơ có lửa dài |
| 3 nấc lên cấp | **Thường:** lam / bạc. **Siêu cấp:** mọc cánh năng lượng / gai pha lê lớn, tông tím – hồng. **Tối thượng:** cùng dáng siêu cấp, phủ vàng kim, hào quang mạnh. Dáng thân giữ nguyên qua 3 nấc, chỉ thêm phần năng lượng và đổi màu |
| Mecha | 3 tàu đầu bảng (#11, #12, #13) ở nấc siêu cấp **biến thành mecha** đứng, giữ màu và chi tiết lõi của dạng tàu |
| Tàu con (2 bên) | 1 cặp đối xứng; mỗi loại vũ khí phụ có một dáng tàu con riêng. 3 nấc màu như trên |

## 2. Luật dễ đọc trong trận (giữ nguyên)
- Đạn địch: đỏ #FF334F / hồng #F50057, tâm trắng. Đạn ta, cánh năng lượng và hiệu ứng **không dùng hai màu này**.
- Sao điểm: vàng #D5A13B.
  - Nấc tối thượng vàng kim **chỉ hiện đầy đủ ngoài trận**.
  - Trong trận, phần vàng được giảm sáng và cánh thu nhỏ còn khoảng 60% để không che đạn.
- Không vẽ vòng quanh tàu / địch trong trận, không có chữ bay.

## 3. Danh sách tranh cần vẽ (đợt 1, ưu tiên)

| # | Tệp | Quy cách |
|---|---|---|
| 1 | `tau_XX_thuong.png`, `tau_XX_sieucap.png`, `tau_XX_toithuong.png` (13 tàu × 3) | PNG nền trong suốt, 512 × 512, nhìn từ trên xuống, mũi hướng lên. Dạng siêu cấp và tối thượng được tràn khung bằng cánh |
| 2 | `tau_XX_net.png` (13) | Hình nét phát sáng xanh #3FA9FF, nền trong suốt, 512 × 512 |
| 3 | `tauCon_<loai>_<nac>.png` | 6 loại vũ khí phụ hiện có (tên lửa, laser, plasma, điện từ, sinh học, sóng) × 3 nấc, 256 × 256 |
| 4 | `mecha_11/12/13_sieucap.png`, `..._toithuong.png` | Mecha đứng thẳng, 512 × 640, nền trong suốt |
| 5 | `nen_trung_bay.png` | 1080 × 720: lưới navy + bệ hologram, **không có tàu** |

Thứ tự đề nghị: làm thử **3 tàu (#1, #7, #13) × 3 nấc** cùng nền trưng bày trước để chủ dự án duyệt phong cách, rồi mới vẽ đủ 13 tàu.

## 4. Mẫu lời nhắc vẽ (GPT tự chỉnh)

> Original mobile shoot-'em-up fighter jet, top-down view, nose up, centered, transparent background, 512x512. Sleek angular silver-and-gunmetal hull with a glowing [cyan/violet/green] energy core and long engine flames. Polished 2.5D game-art rendering, crisp edges, neon accents, dark navy display mood. Original design, not based on any existing game.
>
> **Siêu cấp:** same hull, add large crystalline / energy wings spreading sideways, violet-magenta glow, lightning arcs.
>
> **Tối thượng:** same as siêu cấp but gold-plated armor and golden energy wings, radiant aura.

## 5. Claude làm song song (code)
- **Phòng trưng bày hologram** trong chi tiết chiến cơ / trang bị:
  - nền lưới navy, bệ vòng, hình nét mờ ở giữa;
  - 2 tàu con đối xứng bắn mẫu theo loại vũ khí;
  - nút chọn nấc **Thường / Siêu cấp / Tối thượng**.
- Tạm dùng tranh hiện có kèm hiệu ứng vầng sáng theo nấc; khi có tranh GPT thì thay vào.
- Mỗi đợt tranh mới, Claude ghép rồi đo độ dễ đọc trong trận bằng bot (đạn địch vẫn nổi) trước khi chốt.
