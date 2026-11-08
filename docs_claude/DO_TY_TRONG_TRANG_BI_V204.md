# ĐO TỶ TRỌNG SÁT THƯƠNG TRANG BỊ · V204 (Gemini mục 6)

Phi Đội Sao Băng · Claude · 08/11/2026.

## Cách đo
- Bot thật, đánh boss của chính ải đó.
- Boss được nhân ×1000 máu để không chết.
- Mỗi cấu hình đo 3 lần × 30 giây, lấy trung vị. Hệ số lực chiến được đặt về 1.

Tài khoản mẫu theo bảng t193:
- Ải 100: tàu #5, bậc S.
- Ải 160: tàu #10, bậc SS.
- Ải 200: tàu #13, bậc SS, có siêu chiến cơ.

Trang bị:
- Cấu hình (a): khung Tím +5, Lv100.
- Cấu hình (b), (c): SSS Lv5, gồm Hỏa Băng (tên lửa) · Rail-Đĩa (vũ khí phụ) · Aegis-Gương (giáp).

Cách tách nguồn:
- **"Trang bị"** gồm đạn trang bị, hiệu ứng `gear`, `sss`, `evo`, cháy / sét bộ 07.
- **"Đạn chính"** là đạn của chiến cơ.
- Tài khoản mẫu không lắp VKTT, nên phần kỹ năng = 0.

## Kết quả

| Ải | Cấu hình | Lực chiến | Đạn chính /s | Trang bị /s | Tổng /s | **Tỷ trọng trang bị** |
|---|---|---|---|---|---|---|
| 100 (S) | (a) Tím +5 | 7.020 | 1.656 | 255 | 1.911 | **13,3%** |
| 100 (S) | (b) SSS Lv5 ★0 | 7.853 | 1.667 | 144 | 1.811 | **8,0%** |
| 100 (S) | (c) SSS Lv5 ★10 | 10.595 | 2.350 | 189 | 2.540 | **7,5%** |
| 160 (SS) | (a) Tím +5 | 17.180 | 6.404 | 294 | 6.697 | **4,4%** |
| 160 (SS) | (b) SSS Lv5 ★0 | 18.751 | 6.470 | 364 | 6.833 | **5,3%** |
| 160 (SS) | (c) SSS Lv5 ★10 | 25.286 | 8.725 | 450 | 9.175 | **4,9%** |
| 200 (SS, tàu #13) | (a) Tím +5 | 20.928 | 2.067 | 379 | 2.446 | **15,5%** |
| 200 (SS, tàu #13) | (b) SSS Lv5 ★0 | 22.607 | 2.044 | 428 | 2.472 | **17,3%** |
| 200 (SS, tàu #13) | (c) SSS Lv5 ★10 | 30.612 | 2.692 | 546 | 3.238 | **16,9%** |

## Kết luận

### 1. Sao SSS CÓ tác dụng thật
★10 trên cả 3 món tăng **tổng sát thương +34–37%** ở cả ba mốc (hệ số 1,456).
- Hệ số này nhân vào **cả đạn chính**, không chỉ vào trang bị.
- Vì vậy nghi vấn số 2 của Gemini ("sao SSS không phản ánh vào sát thương") là **không đúng**.
- Do nhân đều, sao SSS làm mạnh cả tàu nhưng **không làm tỷ trọng trang bị tăng lên**.

### 2. Nguyên nhân 1 của Gemini là đúng
Sát thương trang bị gần như không theo bậc chiến cơ:
- Từ ải 100 (tàu S) lên ải 160 (tàu SS), đạn chính tăng ×3,9;
- trong khi trang bị chỉ tăng ×1,2–2,5.
- Kết quả: tỷ trọng trang bị ở tàu SS chỉ còn **4–5%**.

### 3. SSS ★0 ở ải 100 bắn yếu hơn Tím +5
Trang bị 144/s so với 255/s.
- Lưu ý: đây là hai bộ món khác nhau (Tím +5 dùng bộ của tài khoản mẫu, SSS ghép từ cặp khác), nên chưa phải so sánh cùng gốc.
- Nhưng người chơi ghép SSS ở ải ~100 có thể thấy **sát thương trang bị giảm**.

## ⚠ Phát hiện lớn: tàu #13 bắn boss yếu hơn tàu #10

Cùng tài khoản ải 200 (siêu chiến cơ, trang bị Tím +5), chỉ đổi tàu:

| Tàu | Sát thương đếm được /s | **Máu boss mất thật /s** |
|---|---|---|
| #10 Tinh Hà Thủ Vọng | 8.482 | **5.301** |
| #13 Hư Không Đế Vương | 2.461 | **2.625** |

- Kiểm tra chéo: tài khoản 200 đánh boss ải 160 vẫn chỉ ra đạn chính 2.078/s. Như vậy nguyên nhân nằm ở **tàu**, không phải ở boss.
- Tàu cuối cùng, đắt nhất, chỉ gây khoảng **½ sát thương thật** so với tàu #10. Người chơi lên #13 sẽ thấy yếu đi.
- Thời gian hạ boss đã cân ở BAL191 cho ải 180–200 có thể đã dựa trên tàu yếu này.
- Ghi chú phương pháp: với tàu #10, "sát thương đếm được" lớn hơn "máu mất thật". Phần chênh nhiều khả năng là đòn trúng cánh đã vỡ hoặc phần thừa khi phá cánh. Từ nay Claude sẽ báo **máu boss mất thật** làm số chính.

## Đề xuất (chờ Gemini chốt)

### A. Nâng tỷ trọng trang bị lên 15–22%
Cho sát thương trang bị nhân theo **hệ số thân tàu** (`Workshop.factor(bậc) × levelFactor`), so với mốc tàu Thường. Tính trên số đo ải 160 (SSS ★0):
- để đạt 18%, trang bị cần khoảng ×3,9;
- tổng sát thương tăng khoảng +15,5%, nên máu boss ở các ải dùng tàu SS cần **tăng khoảng +15%** để giữ thời gian hạ boss (khớp mức 12–15% Gemini nêu).

Mốc ải 100 (tàu S) cần khoảng ×2,5 trang bị, tức tổng +11%.

### B. Tàu #13 (và nên kiểm cả #11, #12)
- Đo lại sát thương thật cả 13 tàu ở cùng một tài khoản.
- Sau đó Gemini chọn: nâng #11–#13 cho ngang hàng, hoặc giữ đặc thù nhưng bù bằng chỉ số khác.

**Nên làm B trước A**, vì A phụ thuộc vào đạn chính của từng tàu.
