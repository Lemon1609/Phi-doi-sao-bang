# Rà soát quà thưởng · mảnh chiến cơ / trang bị (17/11/2026, V307)

Luật hiện hành (chủ dự án nhắc lại 17/11): rơi đồ và nâng cấp dùng **trang bị / chiến cơ thật (bản sao)**, KHÔNG dùng mảnh. Chỉ **phi công** và **Vũ khí tối thượng** dùng mảnh.

Lịch sử trong mã: V74 bỏ mảnh chiến cơ/trang bị → phôi (`chest74.js` Frag74: `Workshop.grant` xóa `fragments`/`gearFragments`); V82 bỏ phôi → bản sao Lv1 (`evo82.js`: `V70.phAdd(+n)` đổi hướng thành bản sao); V85 `fix85.js` đổi chữ "phôi …" trên giao diện thành "bản sao … Lv1".

## Đo (Playwright, bản dựng 17/11)
`Workshop.grant({craft:0,fragments:4})`, `{fragments:10}`, `{model:'aegis',gearFragments:2}` → mảnh 0, bản sao 0, hợp kim không đổi. **Mọi phần thưởng "mảnh chiến cơ / trang bị" đang là quà rỗng.**

## Đã sửa
| Chỗ | Trước | Sau |
|---|---|---|
| Điểm danh ngày 4 (`build74_mau.py`, DAYS) | 4 mảnh chiến cơ đang dùng → nhận 0 | **2 bản sao Trắng Lv1** chiến cơ đang dùng (đo: +2) |
| Điểm danh ngày 7 | 4.000 ◈ · 300 ⬢ · 10 mảnh → mảnh nhận 0 | 4.000 ◈ · 300 ⬢ · **2 bản sao Lục Lv1** (đo: +2) |
| Thưởng ải Nguyệt Thực (`v67.js`) | ghi "mảnh trang bị (80%)", cộng 0 | bỏ dòng hứa suông (giá trị thực không đổi) |
| Sổ tay › Rương (`guide74.js`) | "… và mảnh trang bị" | "… và bản sao trang bị / chiến cơ Lv1" |

Quy đổi theo bảng chính thức đã có trong game (Frag74: 2 mảnh = 1 Trắng, 5 = 1 Lục, 15 = 1 Lam). Muốn ngày 7 hấp dẫn hơn (ví dụ 1 bản sao Lam) thì đổi `copy:[1,2]` → `copy:[2,1]` trong `build74_mau.py`.

## Không phải lỗi (đã kiểm)
- Quà ghi "phôi …" (Quà 7 ngày, Chợ Đen, Vượt Hạn, Năng động, Mùa giải…): thực nhận bản sao Lv1 (Evo82), chữ đã được fix85 đổi khi hiển thị.
- Mảnh phi công (nhiệm vụ, mùa giải, quà 7 ngày, Chợ Đen) và mảnh / linh kiện VKTT (vòng quay, phó bản giới hạn): đúng luật.
- `codes78.js` (mã quản trị "tài nguyên vô hạn") còn gọi cộng mảnh: chỉ là mã chết cho quản trị, không ảnh hưởng người chơi.

## Chờ chủ dự án quyết
1. **Sự kiện tuần (`event83.js`)**: tiệm sự kiện có món "mảnh bản sao Tím", đủ 3 mảnh ghép thành 1 bản sao Tím Lv1. Cơ chế CHẠY ĐƯỢC nhưng là kiểu mảnh cho trang bị. Phương án: (a) giữ; (b) đổi thành 1 bản sao Tím Lv1 nguyên với giá ×3, giới hạn tuần giữ tương đương.
2. **Mảnh skin** (vòng quay ô "2 mảnh skin", mốc ải tặng mảnh skin trong `skin69.js`): skin hiện mở bằng mảnh. Luật mới không nhắc skin. Giữ hay đổi?
