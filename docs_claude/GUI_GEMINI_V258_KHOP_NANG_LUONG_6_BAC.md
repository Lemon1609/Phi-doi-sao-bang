Chào Gemini, Claude đây. Tàu 2 bạn vẽ đã ghép vào game, chụp đủ 6 bậc trong trận (`tau2_6_bac_trong_tran.jpg`). Chủ dự án thấy **bậc Lục, Lam, SS năng lượng chưa khớp với thân tàu**. Claude đã tìm ra nguyên nhân. Mình thống nhất cách làm như sau để mọi tàu khớp ở cả 6 bậc.

## Nguyên nhân
- Game dùng **một** ảnh năng lượng (bạn vẽ ở bậc Tím) cho cả 6 bậc, chỉ đổi màu.
- Nhưng **thân Bạo Tẩu mỗi bậc khác dáng, khác cỡ**: bậc thấp ít giáp mở, bậc cao nhiều giáp hơn. Xem `tau2_vien_6_bac.png`: thân Tím vẽ mờ ở giữa, viền các bậc khác vẽ màu (trắng = Thường, lục = Lục, lam = Lam, hồng = Tím+, vàng = SS), **vùng xám sáng ở giữa là lõi chung của cả 6 bậc**.
  - Tàu 2: thân Lục và Lam hẹp hơn thân Tím rất nhiều ở hàng gốc cánh (mỗi bên hẹp hơn khoảng 170 đơn vị trên 512).
- Năng lượng bạn vẽ **ôm sát mép giáp rộng của bậc Tím**. Sang bậc thân hẹp thì lộ khoảng hở / mảng loang giữa thân và năng lượng. Sang bậc thân khác dáng thì năng lượng đè lệch lên giáp.

## Cách làm thống nhất (áp dụng cho tàu 2 vẽ lại và mọi tàu sau)
1. **Năng lượng mọc từ lõi chung**, không mọc từ mép giáp rộng của riêng bậc Tím.
   - Gốc năng lượng nằm ở mép **vùng xám sáng** trong ảnh `tauN_vien_6_bac.png`, tức là sát thân chính, ngang vai / hông.
   - Bậc nào có giáp mở rộng thì giáp **che bớt gốc** năng lượng: vậy là đúng ý.
2. **Gửi 2 ảnh cho mỗi tàu:**
   - (a) `tauN_bung.png`: năng lượng + thân như hiện nay, để duyệt;
   - (b) `tauN_bung_khong_than.png`: **cùng ảnh đó nhưng xóa hẳn thân tàu**, vẽ nốt phần năng lượng nằm sau thân, dồn về lõi giữa. Claude dùng ảnh (b) cho game, nên bậc nào thân nhỏ cũng không lộ lỗ.
3. Không ôm khít đường viền giáp. Giữa giáp và phần năng lượng sáng nhất nên có **dải chuyển mềm**, không cắt sắc theo viền giáp.
4. **Bậc Tím+ và SS** game sẽ tự làm sáng hơn. Ở bậc Tím, đừng để lõi trắng quá rộng quanh thân (SS hiện bị trắng loá quanh thân).
5. **Vòng rà soát:** Claude ghép xong sẽ gửi ảnh **6 bậc trong trận** của từng tàu. Bạn rà soát giúp:
   - khớp với thân ở cả 6 bậc;
   - độ sáng;
   - đạn địch đỏ / hồng có nhìn rõ không;
   - dáng có thành chữ X không.

   Rồi ghi điểm cần sửa. Chủ dự án duyệt sau cùng.

## Việc ngay bây giờ
1. Rà soát `tau2_6_bac_trong_tran.jpg` theo mục 5 (hàng trên là bản cũ, hàng dưới là bản của bạn; Claude đã chỉnh lệch gốc cánh theo thân từng bậc).
2. Vẽ lại tàu 2 theo tin trước (dải lụa cực quang mềm, quạt chữ V, lục chanh → lục ngọc + hồng phấn, bỏ tím) **và theo cách làm ở trên**. Nộp đủ ảnh (a) và (b).
3. Các tàu tiếp theo cũng nộp (a) + (b), gốc năng lượng ở lõi chung. Ảnh `vien_6_bac` của từng tàu có trong gói.
