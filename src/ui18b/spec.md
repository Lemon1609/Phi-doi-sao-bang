# UI18b — Bộ bổ sung sau rà soát V78.6

## Phạm vi và nhận diện

37 PNG mới: nút X3 trạng thái, chip2 trạng thái, thẻ hàng3 độ hiếm, thanh tiêu đề1, khung kết quả2, đạn6màu×3dạng=18, buff7 và banner1. Tên tệp là khóa đề xuất để Claude ánh xạ vào game. Báo cáo đủ19ảnh nằm ở `ra_soat_V78_6.md`. Ảnh `bug_tran_kieu_cu.png` được đánh dấu đã sửa, chỉ dùng kiểm tra hồi quy. Không sửa mã game trong gói này.

Giữ navy `#0b1220`, kính tối `#101d30`, bạc ngà `#e8e4d9`, lam `#5ab8ff`, cam `#ff9a3d`, vàng `#f3d48a`. Khung thắng dùng lam/vàng; thua dùng viền đỏ, nội dung vẫn trên kính tối. Ánh sáng trên-trái, góc vát, đèn nằm trong khe; không quầng lớn phủ nội dung.

## Chữ và vùng đọc

Chỉ dấu X được vẽ sẵn theo ngoại lệ của prompt. Tiêu đề, tên, Lv, số liệu và chữ W của hỏa lực do DOM/canvas in lúc chạy. PNG hỏa lực dùng cụm pháo; máu dùng thập y tế dạng pictogram. Bảy hộp buff có sáu cạnh chính, đỉnh nhọn trái/phải, không dùng khung tám cạnh.

Font theo UI18: **Be Vietnam Pro**, dự phòng Arial/sans-serif. Gói không kèm font và preview không tải mạng. Ở393CSSpx: tiêu đề18–22px; tên hàng14–15px; nội dung13px/20px; chú thích12px/18px. Chữ bạc ngà/vàng nhạt trên mặt kính tối. Giữ các dấu tiếng Việt bằng line-height đủ cao, không dùng giãn chữ cho đoạn mô tả.

## Slice nguồn và cỡ CSS

Thứ tự **TRÊN/PHẢI/DƯỚI/TRÁI**, đơn vị pixel PNG nguồn. `0/0/0/0` là ảnh cố định, không dùng9-slice. Icon giữ tỉ lệ contain. Chỉ kéo các dải giữa; không kéo méo góc hoặc chữ X.

| PNG | Kích thước nguồn | SliceT/R/B/L | Cỡ CSS đề xuất ở393px |
|---|---|---|---|
| `enemy_bullet_red_round.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_red_diamond.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_red_needle.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_orange_round.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_orange_diamond.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_orange_needle.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_purple_round.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_purple_diamond.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_purple_needle.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_blue_round.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_blue_diamond.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_blue_needle.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_green_round.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_green_diamond.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_green_needle.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_white_round.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_white_diamond.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `enemy_bullet_white_needle.png` | 64×64 | 0/0/0/0 | 14–18×14–18; giữ tỉ lệ |
| `buff_firepower.png` | 128×128 | 0/0/0/0 | 36×36; vùng nhặt riêng theo code |
| `buff_health.png` | 128×128 | 0/0/0/0 | 36×36; vùng nhặt riêng theo code |
| `buff_shield.png` | 128×128 | 0/0/0/0 | 36×36; vùng nhặt riêng theo code |
| `buff_bomb.png` | 128×128 | 0/0/0/0 | 36×36; vùng nhặt riêng theo code |
| `buff_drone.png` | 128×128 | 0/0/0/0 | 36×36; vùng nhặt riêng theo code |
| `buff_weapon_swap.png` | 128×128 | 0/0/0/0 | 36×36; vùng nhặt riêng theo code |
| `buff_super.png` | 128×128 | 0/0/0/0 | 36×36; vùng nhặt riêng theo code |
| `close_normal.png` | 128×128 | 0/0/0/0 | 36×36; vùng chạm44×44 |
| `close_pressed.png` | 128×128 | 0/0/0/0 | 36×36; vùng chạm44×44 |
| `close_disabled.png` | 128×128 | 0/0/0/0 | 36×36; vùng chạm44×44 |
| `chip_normal.png` | 256×96 | 24/64/24/64 | 76–116×32; viền trên8px |
| `chip_selected.png` | 256×96 | 24/64/24/64 | 76–116×32; viền trên8px |
| `list_row_common.png` | 768×192 | 0/64/0/192 | 369×96; riêng ổ ảnh bên trái giữ72×72CSS |
| `list_row_rare.png` | 768×192 | 0/64/0/192 | 369×96; riêng ổ ảnh bên trái giữ72×72CSS |
| `list_row_legendary.png` | 768×192 | 0/64/0/192 | 369×96; riêng ổ ảnh bên trái giữ72×72CSS |
| `page_title.png` | 768×128 | 24/160/24/160 | 369×48; viền trên8px |
| `result_win.png` | 512×768 | 224/96/128/96 | 345×520; giữ dải tiêu đề, xem spec |
| `result_lose.png` | 512×768 | 224/96/128/96 | 345×520; giữ dải tiêu đề, xem spec |
| `objective_banner.png` | 768×160 | 24/128/24/128 | 369×64; viền trên8px |

### Cách ghép từng họ

- **Thẻ hàng:** trường hợp3-slice ngang của9-slice, T=B=0, R=64,L=192. Khóa chiều cao96CSSpx: phần trái nguồn192×192 thành96×96; phần phải64×192 thành32×96; vùng giữa kéo ngang để đạt369px. Không kéo chiều cao tùy ý. Nếu đổi chiều cao, nhân cả vùng cố định theo cùng tỉ lệ nguồn/đích. Ổ ảnh overlay64×64px tại x16,y16; chữ bắt đầu khoảng x98; nút bên phải rộng76–88px, padding10–12px.
- **Chip:** viền đích8/21,33/8/21,33CSSpx. Ví dụ “Chơi” và “Ấn Chú” ở116×32px. Nhãn dài cần rút gọn hoặc tăng rộng, không ép chữ nhỏ. Có thể để số lượng ở nhãn phụ riêng.
- **Tiêu đề:** viền8/53,33/8/53,33CSSpx, tên18px nằm giữa vùng trống. Đặt tài nguyên ở hàng riêng cách8px. Không chồng thanh trang trí khác lên thanh này.
- **Kết quả:** top224px nguồn giữ cả ruy băng; bottom128px, hai bên96px. Ví dụ345×520 dùng viền112/48/64/48CSSpx, thân giữa kéo dọc. Khi đổi chiều rộng lớn, cần điều chỉnh viền theo cùng tỉ lệ; không kéo bẹp cảPNG. `preview.html` cho xem vị trí nhãn so với dải trống của từng ảnh.
- **Banner:** viền8/42,67/8/42,67CSSpx, mặc định369×64. Chữ13px, dòng19px, cáchHUD8px. Chỉ mở đầy đủ khi tạm dừng giới thiệu mục tiêu; thu gọn khi giao chiến để không che đạn.
- **X:** hiển thị36×36px, vùng chạm44×44px. Không9-slice ảnh chứaX; đổi tệp thường/nhấn/khóa theo trạng thái.

Trong preview, mỗi khung có lớp skin riêng và lớp nội dung không mangborder. Nhờ vậy tọa độ ảnh/chữ đo từ mép ngoài, không bị border trái96px đẩy lệch ổ ảnh. Các nhãn là DOM, không nằm trong PNG.

## Đạn, buff và va chạm

Đạn nguồn64×64 có lề trong suốt; cạnh hình chính tối đa56px. Hiển thị16px toànPNG cho phần hình thấy được khoảng14px. Preview cho chọn14/16/18px và đổi nền thử. Dạngkim có thể xoay bằngcode theo hướng bay.

Sáu màu: đỏ `#ff525d`, cam `#ff9a3d`, tím `#b06cff`, lam `#5ab8ff`, lục `#54df93`, trắng `#edf8ff`. Lõi trắng, viền màu mảnh. Bản trắng đã tách khỏi lam/cyan, dùng đường ngoài navy để rõ trên nền tối. Các mãhex là hướng dẫn màu, không khẳng định mọi pixel chuyển sắc cùng một giá trị.

Buff nguồn128×128, hiển thị36×36px, là hộp vật lý lục giác có hình chức năng bên trong. Không giảm buff xuống bằng cỡ đạn; không dùng hình tròn/thoi trần làm buff. Nếu cần chữW, game in riêng ngoài hoặc trên lớp nhãn phù hợp.

PNG không tự xác định hitbox. Claude/Gemini cần đối chiếu vùng va chạm với hìnhalpha thực sự thấy được, thử nhịp và mật độ đạn ởải11. Không để viền trang trí tạo cảm giác va chạm vô hình. Không làm mờ đạn địch để bớt rối; giảm vệt ta/nền riêng. Rà soát ảnh tĩnh chưa đủ chứng nhận đường né hợp lý.

## Định dạng và kiểm tra

Có alpha ngoài hình; mặt kính của khung là đục. PNG dùng bảng màu+tRNS khi phù hợp để mỗi tệp≤300.000bytes, không tuyên bố tất cả làRGBA32. Đã kiểm tra kích thước, alpha, số lượng, dung lượng, thử WebP và mởZIP/CRC. `validation.json` ghi số đo từng tệp.

`preview.html` mởoffline bằng ảnh cùng thư mục. Ví dụ ảnh tàu/nút phụ được nhúng từUI18 trước chỉ để minh họa ghép, không phải PNG mới. Màu chữ và phần thưởng mẫu không thay cơ chế game.

Bộ ảnh được tạo bằng công cụ tạo ảnh tích hợp, từng tài sản. Hậu xử lý chỉ bỏ nhiễu alpha nhỏ, cắt lề thừa, resize và giảm màu. Prompt chung: đạn trần lõi trắng/viền màu mảnh, không giống vật phẩm; buff hộp sáu cạnh; UI giáp bạc và kính tối, vùng chữ để trống, chỉX được vẽ sẵn. Hai họ trắng/buff đã có lượt chỉnh màu và đường bao riêng. Cần duyệt lại ở cỡ thật và ghép game trước khi chốt.

Kiểm tra bố cục thực hiện bằng Canvas/Node và kiểm tra JavaScript; chưa chạy file game hoặc kiểm thử điện thoại thật. Không sửa gameplay hay mật độ đạn trong gói này.
