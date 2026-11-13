# Gói khung cánh bung đủ bộ (gửi Gemini)

## Trong gói
- `khung/tauN_than_bao_tau.png`: 11 tàu (2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13).
  - Khung 1024, nền đen, thân Bạo Tẩu bậc Tím đặt đúng cỡ trong game, tâm thân = tâm khung.
  - Claude vừa dựng lại từ thân hiện tại trong game.
- `vien_6_bac/tauN_vien_6_bac.png`:
  - thân Tím vẽ mờ, viền thân Bạo Tẩu các bậc khác vẽ màu (trắng = Thường, lục = Lục, lam = Lam, hồng = Tím+, vàng = SS);
  - **vùng xám sáng ở giữa = lõi chung 6 bậc**, nơi gốc năng lượng nên mọc ra.
- `tau4/`:
  - `tau4_bung_da_chot_sang_nay.png`: cánh bung tàu 4 bạn vẽ sáng nay, chủ dự án đã chốt;
  - 2 ảnh thân Tím (thường, Bạo Tẩu) để tham chiếu.
  - Tàu 4 chỉ cần **ảnh (b)**: cùng ảnh đó, xóa thân, vẽ nốt năng lượng sau thân, **mở khe tam giác ở các góc**. Giữ đúng khung và tỉ lệ của ảnh này.
- `BANG_Y_TUONG_V256.txt`: bảng ý tưởng của bạn.

## Bảng màu chốt (V256 + chỉnh V256B), mép → thân → lõi
| Tàu | Màu |
|---|---|
| 1 | đỏ tím trầm → cam rực → vàng kem (đã xong, neon) |
| 2 | **lục chanh `#A3E635` → lục ngọc `#00E676` → trắng**, điểm hồng phấn nhạt ở mép; **bỏ tím** |
| 3 | **lơ nhạt `#BAE6FD` → trắng băng → trắng** (băng ít màu); 4 cụm kiếm đều xuôi về sau |
| 4 | giữ bản đã vẽ |
| 5 | **mép hồng đào nhạt `#F9A8D4`** → vàng đào `#FBBF24` → trắng ngà; vành mặt trời ở **sau** thân |
| 6 | chàm `#312E81` → xanh ma trơi `#14B8A6` → trắng bạc hà |
| 7 | **trắng bạc → vàng nhạt**, viền vàng kim mảnh, vệt chém gió trắng; **không đỏ** |
| 8 | **cam `#F97316`** → vàng lửa `#FACC15` → trắng kem (bỏ mép đỏ cam) |
| 9 | lam coban `#2563EB` → lam thiên thanh `#0EA5E9` → trắng |
| 10 | tím tinh vân `#9333EA` → xanh sao băng `#22D3EE` → vàng ánh sao; lưới lục giác mảnh, trong mờ |
| 11 | tím đen `#4C1D95` → hồng tím `#D946EF` → vàng kim lõi; xoắn ốc đứt đoạn, **rộng tối đa ~900 px** |
| 12 | cam đồng `#D97706` → vàng kim `#FACC15` → trắng, **điểm lam `#3B82F6`** ở vạch chia; mặt đồng hồ hở, không kim trước mũi |
| 13 | tím điện `#7C3AED` → tím hoa cà `#C084FC` → trắng ánh sao; lưỡi hái cong **về sau** |

Chất liệu: **LED / neon công nghệ** như bản tàu 1 đã duyệt. Nộp mỗi tàu (a) có thân + (b) xóa thân, tên `tauN_bung.png` và `tauN_bung_khong_than.png`.
