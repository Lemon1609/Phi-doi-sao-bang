Chào GPT, chủ dự án góp ý: **"Các tàu bậc cao đẹp là hợp lý, nhưng các tàu bậc thấp đừng đơn sắc, nhỏ gọn, xấu quá."** Nhờ vẽ lại thân bậc thấp của các tàu đã làm.

## Nguyên tắc mới cho bậc thấp
- **Không đơn sắc**: ít nhất 2 màu giáp (giáp chủ + giáp phụ có màu) và một màu đèn riêng. Không để cả tàu xám bạc.
- **Không nhỏ**: cỡ thân ≥ 90 % bậc tím của chính tàu đó.
- **Chi tiết dày như bậc tím**: tấm giáp, khe, đèn, động cơ.
- Phân bậc bằng **số bộ phận, độ lớn lõi, độ rực đèn**; không phân bậc bằng cách bỏ màu hay thu nhỏ.
- Bậc cao vẫn phải đẹp hơn: nhiều bộ phận hơn, lõi lớn hơn, đèn rực hơn.

## Cần vẽ lại (Claude đo độ bão hòa màu trung bình của thân; dưới 0,2 là gần như một màu)

| Tàu | Bậc | Hiện tại | Yêu cầu |
|---|---|---|---|
| 2 Cực Quang | thuong | 0,08 · 159 × 331 px, rất nhỏ và xám | ≥ 280 × 380 px; giáp bạc + hổ phách, đèn vàng |
| 3 X-Dực Băng | thuong | 0,12 · xám thép | giáp thép + lơ băng nhạt, đèn trắng sương |
| 3 X-Dực Băng | luc | 0,18 · bạc lẫn lục nhạt | giáp bạc + lục rêu rõ, đèn lục chanh |
| 6 U Linh | thuong | 0,25 · xám than | giáp than + lam xám, đèn lơ |
| 6 U Linh | luc | 0,10 · ô liu xám | giáp than + ô liu vàng, đèn vàng chanh |
| 7 Đao Phong | thuong | 0,09 · 245 × 334 px, xám và nhỏ | ≥ 355 × 410 px; giáp thép + lơ, đèn lơ |
| 10 Tinh Hà | thuong | bạc hồng nhạt, gần một màu | giáp bạc + hồng đào, đèn trắng hồng, lõi mắt rõ |

Mỗi bậc gồm **bản thường và `_bt`**:
- Vẽ ở khung 1254 × 1254, cùng tỉ lệ với các bậc cũ GPT đã vẽ cho tàu đó.
- `_bt` = chính bản thường + phần mở ra như bậc cũ; không vẽ lại thân giữa.
- Giữ dáng tàu đã chốt.

## Gửi kèm
- `bac_thap_hien_tai.jpg`: thân bậc thấp và bậc tím của tàu 2, 3, 6, 7, 8 hiện tại (kèm số đo).
- `V238_bac_thap_5_tau.jpg`: cánh bung bậc thường và lục trong trận. Claude đã đổi cánh sang hai màu và to gần bậc tím.
- `tau10_6bac.jpg`: tàu 10 hiện tại.
- Thư mục `than_hien_tai/`: các PNG thân 512 đang dùng của những bậc cần vẽ lại, cùng bậc tím của tàu đó để so.

## Nộp
Một zip `V238_BAC_THAP.zip`: 14 PNG (`tauN_{bac}.png` và `tauN_{bac}_bt.png`), ảnh ghép trước / sau.
