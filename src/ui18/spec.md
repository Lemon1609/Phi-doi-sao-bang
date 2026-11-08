# UI18 — Giáp bạc và năng lượng

## Ngôn ngữ thiết kế

Sáu màu nền tảng: navy viền `#0b1220`, kính tối `#101d30`, bạc ngà/chữ sáng `#e8e4d9`, lam thông tin `#5ab8ff`, cam hành động `#ff9a3d`, vàng nhạt/huyền thoại `#f3d48a`. Ngoại lệ chức năng: đỏ thông báo và lục thể lực. PNG là tranh có độ chuyển sắc; mã hex là token giao diện, không giới hạn toàn ảnh còn sáu màu.

Khung là giáp kim loại chải, gờ có khối, ốc nhỏ ở góc; kính giữa tối và phẳng. Góc vát chéo, không dùng đồng thời nhiều họ góc. Đèn tập trung ở góc và khe giáp, không quầng lớn phủ nội dung. Cam ở viền nút chính; vùng đặt chữ navy tối. Thường dùng thép ít nhấn, hiếm tăng lam, huyền thoại thêm vàng. Phân biệt độ hiếm bằng nhãn do game in thêm khi cần.

## Font và chữ Việt

Đề xuất **Be Vietnam Pro** 400/600/700, không nghiêng. [Google Fonts](https://fonts.google.com/specimen/Be+Vietnam+Pro), [nguồn tác giả và hỗ trợ tiếng Việt](https://github.com/bettergui/BeVietnamPro). Khi ghép game offline, tự nhúng bản font có đầy đủ glyph tiếng Việt. Gói này không kèm font; preview chạy offline bằng font đã cài hoặc Arial/sans-serif dự phòng, vì vậy hình dáng chữ có thể khác giữa máy.

Ở màn393px: tiêu đề20–22px/700; nút chính19–21px/700; nội dung13–14px/400–600; tab10–11px/600. Nội dung không giãn chữ; chữ hoa ngắn có thể0,2–0,4px. Line-height1,25–1,45 để không cắt dấu. Chữ bạc ngà hoặc vàng nhạt trên kính tối. Không in chữ trực tiếp vào bất kỳ PNG nào, kể cả hai mock-up. Nội dung MỚI, ×, Ải N và con số đều do code/DOM hiển thị.

## Tệp và 9-slice

Các số slice theo thứ tự **trên / phải / dưới / trái**, tính bằng pixel của PNG nguồn. Ví dụ `128/128/128/128` giữ bốn góc128px; chỉ co giãn các dải giữa và mặt giữa. Dùng stretch, không repeat. Các góc/viền chỉ được thu nhỏ theo bề rộng viền đích, không kéo toàn ảnh. Biểu tượng, nền và mock-up có slice0: không dùng9-slice; icon giữ tỉ lệ contain, nền cover hoặc theo tỉ lệ gốc.

| Tệp PNG | Nguồn px | Slice T/R/B/L px | Cỡ CSS mong muốn ở393px |
|---|---|---|---|
| `panel_common.png` | 512×512 | 128/128/128/128 | 369×520 |
| `panel_rare.png` | 512×512 | 128/128/128/128 | 369×520; bảng Điểm danh369×570 |
| `panel_legendary.png` | 512×512 | 128/128/128/128 | 369×520; bảng Điểm danh369×570 |
| `card_common.png` | 256×256 | 64/64/64/64 | 108×136 |
| `card_rare.png` | 256×256 | 64/64/64/64 | 108×136 |
| `card_legendary.png` | 256×256 | 64/64/64/64 | 108×136 |
| `button_primary_normal.png` | 384×128 | 32/96/32/96 | 176×56 |
| `button_primary_pressed.png` | 384×128 | 32/96/32/96 | 176×56 |
| `button_primary_disabled.png` | 384×128 | 32/96/32/96 | 176×56 |
| `button_secondary_normal.png` | 384×128 | 32/96/32/96 | 132×48 |
| `button_secondary_pressed.png` | 384×128 | 32/96/32/96 | 132×48 |
| `button_secondary_disabled.png` | 384×128 | 32/96/32/96 | 132×48 |
| `button_close_normal.png` | 128×128 | 32/32/32/32 | 40×40 |
| `button_close_pressed.png` | 128×128 | 32/32/32/32 | 40×40 |
| `button_close_disabled.png` | 128×128 | 32/32/32/32 | 40×40 |
| `tabbar_bg.png` | 768×160 | 32/128/32/128 | 393×72 |
| `tab_selected.png` | 160×160 | 48/48/48/48 | 72×64 |
| `tab_normal.png` | 160×160 | 48/48/48/48 | 72×64 |
| `icon_tab_home.png` | 96×96 | 0/0/0/0 | 30×30 |
| `icon_tab_battle.png` | 96×96 | 0/0/0/0 | 30×30 |
| `icon_tab_equipment.png` | 96×96 | 0/0/0/0 | 30×30 |
| `icon_tab_store.png` | 96×96 | 0/0/0/0 | 30×30 |
| `icon_tab_fleet.png` | 96×96 | 0/0/0/0 | 30×30 |
| `resource_cell.png` | 384×128 | 32/96/32/96 | 116×36 |
| `icon_resource_alloy.png` | 96×96 | 0/0/0/0 | 20×20 |
| `icon_resource_diamond.png` | 96×96 | 0/0/0/0 | 20×20 |
| `icon_resource_stone.png` | 96×96 | 0/0/0/0 | 20×20 |
| `icon_resource_stamina.png` | 96×96 | 0/0/0/0 | 20×20 |
| `icon_resource_sweep_ticket.png` | 96×96 | 0/0/0/0 | 20×20 |
| `badge_new.png` | 192×96 | 24/48/24/48 | 38×20 |
| `notification_dot.png` | 48×48 | 0/0/0/0 | 8×8 |
| `badge_lock.png` | 256×96 | 24/48/24/48 | 76×24 |
| `bg_hangar.png` | 1080×2340 | 0/0/0/0 | 393×851,5; cover cho màn khác tỉ lệ |
| `bg_panels.png` | 1080×2340 | 0/0/0/0 | 393×851,5; cover cho màn khác tỉ lệ |
| `demo_ship.png` | 256×256 | 0/0/0/0 | 233×233, contain; chỉ minh họa |
| `mockup_lobby.png` | 1080×2340 | 0/0/0/0 | 393×851,5 |
| `mockup_daily.png` | 1080×2340 | 0/0/0/0 | 393×851,5 |

Bề rộng viền đích phía trên tham khảo (các phía còn lại nhân theo tỉ lệ slice nguồn để giữ đúng tỉ lệ góc; ví dụ nút32/96/32/96 với viền trên16px có viền trái/phải48px): panel18–24CSSpx; card12–14px; nút chính16px, nút phụ14px, đóng10px; tab và thanh tài nguyên10px; nhãn7px. `layout.json` ghi chính xác từng trường hợp dùng trong mock-up. Không dùng panel nhỏ hơn48×48CSSpx, card nhỏ hơn32×32, nút chính/phụ nhỏ hơn44px chiều cao. Nút đóng vẽ36–40px nhưng vùng chạm mở rộng tối thiểu44×44px.

Nền và hai mock-up là ảnh kín; các mảnh kit có nền trong suốt bên ngoài hình. Tâm panel/card/nút có mặt kính tối đục để đảm bảo đọc chữ. PNG dùng bảng màu+tRNS khi phù hợp, không phải tất cả đều là RGBA32; vẫn giải mã được alpha và xuất WebP. Nền lớn và PNG mock-up được giảm màu không dithering; nền xử lý nội bộ540×1170 rồi nhân đôi lên1080×2340 bằng nearest để giữ tệp gọn, vẫn có độ phân giải nội dung cao hơn màn393px. Đây là đánh đổi kỹ thuật đã ghi rõ. Các ảnh này tiếp tục được giảm màu để mỗi PNG≤300.000bytes; đánh đổi là có thể thấy bậc chuyển sắc khi phóng lớn. Xem ở cỡ điện thoại để duyệt chất lượng.

## Ráp lại đúng hai màn

1. Mở `preview.html` sau khi giải nén; không cần máy chủ hoặc Internet. Chữ là các phần tử DOM độc lập, nút ẩn/hiện chữ giúp đối chiếu PNG trống chữ.
2. `manifest.json` ghi kích thước, slice và dung lượng. `layout.json` ghi thứ tự lớp, tên mảnh, tọa độx/y/w/h theo CSS393px, viền đích và các nhãn chữ.
3. `renderer.js` là cùng hàm9-slice dùng để xuất hai mock-up1080×2340 và vẽ preview. Mỗi khung, thẻ, nút, thanh và biểu tượng đều lấy từ bộ PNG này, không có tranh giao diện riêng chỉ xuất hiện trong mock-up.
4. `demo_ship.png` tái dùng chiến cơ từ ảnh đã duyệt trước, chỉ để minh họa vị trí tàu; không phải tài sản chiến cơ mới. Không có ảnh Điểm danh mới đính kèm lần này nên bố cục7ngày được đề xuất mới. Giá trị tài nguyên/phần thưởng trong preview chỉ minh họa, không thay cơ chế game.
5. Trạng thái thường/nhấn/khóa của ba loại nút có đủPNG riêng. Game thay ảnh theo trạng thái; chữ, dấu×, nhãnMỚI, điều kiệnẢiN và dấuđãnhận do code dựng. Không thêm chấm đỏ vào mọi tab; bản mẫu chỉ có một điểm báo ở Điểm danh.

## Giới hạn đã kiểm tra

Kích thước và dung lượng từngPNG được kiểm tra tự động; đã thử mã hóa WebP lossless và giải mã lại; đã mởZIP/CRC. Hai màn được ráp và kiểm tra bằng Canvas/Node, chưa chạy trong filegame và chưa kiểm thử trên điện thoại thật. `preview.html` có thể dùng font dự phòng như nêu trên. Không sửa code game.
