Chào GPT, chủ dự án yêu cầu **rà soát lại một lượt 9 tàu** (2, 3, 5, 6, 7, 8, 10, 11, 12; tàu 1, 4, 9, 13 đang có gói riêng):

> "Các bậc tàu sẽ thay đổi cả về màu LED, màu neon, ngọc… thêm các chi tiết để lộ rõ vẻ bậc cao."
> "Chiến cơ bậc cao đẹp hơn, lộng lẫy hơn, hiện đại, công nghệ cao hơn bậc thấp."

Mỗi tàu một thư mục / một zip (`V244_TAUn.zip`). Làm xong tàu nào gửi tàu đó.

## 1. Mã màu bậc chung: đèn LED, ngọc, khe sáng
Claude đã cho **viền neon trong game** đổi theo mã này. Thân tàu cần khớp.

| Bậc | Đèn LED / ngọc / khe sáng |
|---|---|
| thuong | trắng bạc ánh lơ `#DDE8F5` |
| luc | lục `#4CFF7A` |
| lam | lam `#3FA9FF` |
| tim | **giữ màu đèn riêng** của tàu (tranh bậc tím đã duyệt) |
| tim5 | hồng tím `#FF4FD8` |
| ss | vàng kim `#FFD24A`, lõi trắng |

**Claude đo hiện tại**: nhiều bậc đèn gần như cùng màu bậc tím (lệch dưới 30° sắc độ). Ví dụ:
- tàu 5: cả 5 bậc lệch 3–15°;
- tàu 8: lệch 1–18°;
- tàu 11: thường, lam, tím+, SS lệch 1–21°.

Nhìn đèn không phân biệt được bậc.

## 2. Chi tiết lộ rõ bậc cao
- **tim5**: thêm ngọc khảm (màu bậc) ở mũi và vai; viền kim loại quý mảnh dọc mép giáp; thêm ống dẫn sáng.
- **ss**: giáp nhiều lớp hơn; ngọc lớn ở lõi; viền vàng kim; khe sáng dài, rực hơn; thêm cảm biến, khớp máy tinh xảo.
- **thuong / luc / lam**: vẫn nhiều màu, đủ chi tiết, cỡ ≥ 90 % bậc tím. Ít ngọc và ít viền quý hơn bậc cao. Đèn dịu hơn.

## 3. Cách sửa (quan trọng: giữ đúng dáng và vị trí)
- Vẽ đè trên **đúng tệp trong thư mục tàu**:
  - `tauN_{bac}.png`: khung 1254, thân ở giữa;
  - `tauN_{bac}_bt.png`: khung **1400**, thân ở giữa.
- **Không đổi dáng, cỡ, vị trí**. Chỉ:
  - đổi màu đèn, ngọc, khe sáng theo mã;
  - thêm chi tiết bậc cao nằm trong viền thân;
  - làm sạch mép.
- **Mép sạch**: không viền màu lạ (hồng / đỏ / tím loang quanh mép), không răng cưa, không quầng mờ. Nền trong suốt hoàn toàn.
- `THAM_KHAO_tauN_tim.png` chỉ để so màu riêng của tàu, không sửa.

## 4. Bổ sung sau khi Gemini rà soát (chủ dự án duyệt 13/11)
Gemini chấm **bậc thấp** của nhiều tàu còn tối và đơn sắc, chìm vào nền vũ trụ. Bậc thấp ở đây là bậc thường, lục; với tàu 6 và tàu 11 thì cả bậc lam.

Cách sửa: thêm **giáp phụ sáng màu** và **viền kim loại sáng tách khối**, tách tông rõ giữa giáp chính và giáp phụ. Dáng, cỡ, vị trí vẫn giữ nguyên. Đèn LED vẫn theo mã bậc ở mục 1; màu dưới đây là màu **giáp**.

| Tàu | Bậc | Sửa |
|---|---|---|
| 2 Cực Quang | thường, lục | giáp phụ xanh bạc, viền kim loại sáng dọc hai thanh ray |
| 3 X-Dực Băng | thường, lục | giáp phụ xanh băng đậm `#1E3A5F`, viền kim loại sáng |
| 6 U Linh | thường, lục, lam | giáp chính **xám titan sáng** (sáng hơn hiện tại rõ rệt), giáp phụ / khe ánh **xanh ma trơi** nhạt |
| 7 Đao Phong | thường | giáp phụ bạc sáng; đèn sống cánh rực hơn |
| 7 Đao Phong | lục | giáp phụ lục bảo; đèn sống cánh rực hơn |
| 8 Phần Thiên | lục | đèn và mảng năng lượng trên thân đang **ngả cam**, đổi hẳn sang lục |
| 10 Tinh Hà | thường | thân đang nhợt: tăng tương phản giữa kim loại tối và bạc sáng |
| 11 Thôn Tinh | thường, lục, lam | giáp chính **tím than**, giáp phụ / viền **đồng – vàng ánh sao**, sáng hơn hiện tại |

Tàu 6, 11 và 13 đang cùng tông đen / xám chì nên dễ lẫn nhau. Sau khi sửa:
- tàu 6 xám titan + xanh ma trơi;
- tàu 11 tím than + đồng;
- tàu 13 giữ đen gương + bạc crôm, đã làm ở gói khác.

Tàu 5: xem thêm `tau5/RIENG_TAU5.md` (đổi cả màu giáp theo bậc).

## 5. Nộp mỗi tàu
- Các PNG đã sửa, **cùng tên, cùng khung** với tệp gửi kèm;
- ảnh ghép trước / sau.
