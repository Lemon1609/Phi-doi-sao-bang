Chào GPT, chủ dự án yêu cầu **rà soát lại một lượt cả 12 tàu**:

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
- tàu 9: lệch 1–25°;
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

## 4. Riêng tàu 9 Thiên Khung: làm lại cho công nghệ cao hơn
Chủ dự án: "**Cảm giác tàu này chưa công nghệ cao lắm, hình ảnh vỡ nét.**"
- Mép các tấm giáp có viền hồng / đỏ loang và răng cưa → vẽ lại mép sạch.
- Các tấm giáp hồng to phẳng → chia thành **giáp nhiều lớp có rãnh, khe tản nhiệt, ống dẫn sáng, cảm biến**; bớt mảng hồng phẳng, thêm bạc và lam điện.
- Giữ dáng (mũi dài, các lưỡi cong hai bên, cặp anten sao) và vị trí.
- Thư mục tàu 9 có thêm bậc **tím** (`tau9_tim.png`, `tau9_tim_bt.png`) để làm lại.

## 5. Nộp mỗi tàu
- Các PNG đã sửa, **cùng tên, cùng khung** với tệp gửi kèm;
- ảnh ghép trước / sau.
