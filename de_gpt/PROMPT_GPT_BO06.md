BỘ 06 — nanite (giáp) · stellar (tên lửa) · prism (vũ khí phụ)

Bộ 05 đã ghép vào game xong (V146), cảm ơn bạn. Giờ làm Bộ 06 theo đúng cách giao Bộ 05: chỉ gửi **bảng ảnh nền trong suốt**, Claude tự cắt, thu cỡ và ghép.

Dáng của 3 món theo **đúng bóng đã duyệt** (PHAC_36 / PHAC_SUA_13): nanite, stellar, prism mỗi món một dáng riêng, không trùng dáng các bộ trước.

## Gói giao: `Bo_06_bang_anh_cho_Claude.zip` (22 PNG + DOC_TRUOC.txt)
- `nanite/` (7 tệp), `stellar/` (7 tệp): icons, projectile_normal, projectile_super, impact, muzzle, trail, beams
- `prism/` (8 tệp): 7 tệp như trên + `tran_1_2_3_bt.png`

## Quy cách từng bảng
- **icons.png:** 3 cấp, xếp trái → phải. Cấp sau phải **thêm bộ phận / đổi khối**, không chỉ đổi màu. Cấp 3 không được nhỏ hơn cấp 2.
- **tran_1_2_3_bt.png (prism):** dạng 1, 2, 3, Bạo Tẩu, nhìn từ trên xuống, mũi hướng lên. Bạo Tẩu sáng và rực hơn dạng 3, không được nhạt hơn.
- **projectile_normal / projectile_super:** mỗi bảng 4 khung, viên đạn **bay thẳng lên** (mũi hướng lên trên).
  - Dáng **thon dọc**: bề ngang không quá 60% chiều cao, kể cả quầng sáng. Ô đạn trong game là ô dọc hẹp, đạn bè ngang sẽ bị thu nhỏ.
  - Đạn super phải **to hơn** đạn thường và khác dáng đầu đạn, không chỉ sáng hơn.
- **impact.png:** 8 khung: nhỏ → bùng lớn nhất ở khung 4–5 → tan dần; khung 8 gần tắt hẳn.
- **muzzle.png:** chớp nòng **phụt thẳng lên trên** (Bộ 05 có 2 món vẽ nằm ngang, Claude phải xoay lại).
- **trail.png:** 1 vệt dọc, đầu đậm ở trên, nhạt dần xuống dưới.
- **beams.png:** 2 tia dọc, trái là thường, phải là super. Mép trên và mép dưới phải **liền mạch để lặp nối**: không bo đầu, không chóp nhọn, không tắt sáng ở hai đầu.

## Quy tắc chung (rút từ Bộ 05)
1. Nền **trong suốt thật** (alpha), không nền đen, không nền trắng.
2. Các khung trong một bảng xếp **một hàng ngang**, **cách nhau ít nhất 40 px**; quầng sáng của khung này không được chạm khung kia. Ở Bộ 05, nổ của reactive và spiral bị dính quầng.
3. Không có chữ, số, viền khung hay lưới trong ảnh.
4. Mỗi món một tông màu riêng, đồng bộ giữa icon, đạn, nổ, tia.
5. Không vẽ vòng tròn hay vành bao quanh (game đã bỏ vòng tròn trong trận).
6. Không cần cắt, căn hay thu cỡ; chỉ cần đủ khung, đúng thứ tự, đúng hướng.

## DOC_TRUOC.txt
Liệt kê những chỗ bạn chưa chắc: khung nào sát nhau, ảnh nào thử 2 bản, món nào lệch bóng đã duyệt.

Xong Bộ 06 thì chuyển tiếp sang **Bộ 07** (aurora36 · comet36 · lance36) với cùng quy cách.
