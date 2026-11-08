# Rà soát đồ họa V78.6

Đã xem đủ **19 ảnh game và 3 ảnh tham chiếu**. Gói không có HTML game nên đây là rà soát thị giác; các cỡ CSS dưới đây là đề xuất cho màn 393 px, không phải số đo từ mã nguồn. Các ảnh p393 rộng 786 px được quy đổi theo DPR 2. Không kết luận tốc độ đạn, hitbox hay độ khó thực tế từ ảnh tĩnh.

- **P0:** ảnh hưởng đọc trận và né đạn.
- **P1:** khó đọc hoặc che nội dung.
- **P2:** thiếu đồng bộ, bố cục cần gọn hơn.
- **P3:** lỗi đã sửa, chỉ kiểm tra hồi quy.

## Bảng rà soát đủ 19 ảnh

| Mức | Tên ảnh | Vị trí và vấn đề | Đề xuất cụ thể ở màn 393 px |
|---|---|---|---|
| P0 | `bug_dan_day.png` | Các cụm đạn đỏ lớn tụ sát chiến cơ; viền nhiều vòng, vật phẩm hỏa lực cam cũng rất nổi. | Dùng đạn V2 trần: tròn 14–16 px, thoi 16 px, kim 18 px; buff hộp lục giác 36 px. Đạn đỏ `#ff525d`, lõi trắng, viền mảnh, không quầng. Nếu vẫn bít đường né, cần thử điều chỉnh nhịp đợt bắn, không chỉ thu nhỏ ảnh. Đối chiếu hitbox với vùng hình thực sự thấy được; Gemini chốt lại cơ chế va chạm. |
| P0 | `p393_adm_battle.jpg` | Hai cột vệt liềm đỏ của ta lấp giữa màn. Banner mục tiêu và thông báo FPS nằm trên vùng chơi. | Vệt ta dùng `#b7779b`, alpha 0,18–0,28, giảm quầng 60%; đạn địch alpha 1. Banner 369×64 px, cách HUD 8 px; mở đầy đủ khi tạm dừng đầu trận rồi thu thành một dòng khi chơi. Chuyển thông báo FPS thành nút 18 px ngoài vùng né, không giữ cả câu giữa màn. |
| P1 | `p393_adm_fleet_ships.jpg` | Thanh trang trí xuyên tiêu đề; tên, hệ và chỉ số in lên hangar sáng. Tàu nhỏ trong khung xem lớn. | Dùng thanh tiêu đề 369×48 px; tài nguyên xuống hàng riêng cách 8 px. Đặt khối thông tin trên `#101d30` alpha 0,96, padding 12 px; tên 18 px/700, nội dung 13 px, line-height 20 px. Khung xem cao 190–220 px, tàu rộng 130–160 px. Nút cao 44–48 px, chữ đứng. |
| P1 | `p393_adm_fleet_sss.jpg` | Thanh xuyên tiêu đề; công thức và chú thích nằm thẳng trên hangar. Nhiều lưới và ba tầng tab. | Thanh tiêu đề cao 48 px. Công thức vào hàng kính tối cao 40 px, chữ 13 px. Chú thích có nền tối và padding 12 px. Dùng một hàng chip cao 32 px cho nhánh SSS, cách tab trang 8 px; tên thẻ tối đa hai dòng, gap 8 px. Không thêm khung lớn quanh mọi nhóm. |
| P1 | `p393_adm_Cloud78.jpg` | Tab “Hạt giống hôm…” bị cắt; nút X còn kiểu vát cũ. Số tài nguyên phía sau bị cắt thành chuỗi dấu chấm. | Rút tên tab thành “Hạt giống”, mô tả đặt bên dưới; hoặc cuộn ngang có chỉ báo. Tab cao 32 px, rộng tối thiểu 88 px, gap 8 px. X hiển thị 36 px, vùng chạm 44 px. Rút số thành 99,9M trước khi cắt chuỗi; dùng chữ số tabular. |
| P1 | `p393_adm_BK78.jpg` | “Chơi / Ấn Chú” và X là nút HTML trắng mặc định. Hướng dẫn nổi ở đầu màn có glyph lạ. | Dùng chip 88–116×32 px, gap 8 px, chữ 13 px/600; thay X chung. Hướng dẫn chuyển vào trong bảng, sau tiêu đề, tối đa hai dòng 12 px/18 px. Bỏ emoji/glyph không hỗ trợ. Giữ nguyên cơ chế Phá Vây hiện tại. |
| P1 | `p393_adm_fleet_pilot.jpg` | Toast hướng dẫn che tiêu đề. Tab tím, thẻ bo tròn và nút Lên cấp khác UI18. | Hướng dẫn inline dưới tiêu đề, cách 8 px. Hai tab dùng chip lam/navy cao 32 px. Bốn ô đội hình 64–68 px, gap 8 px. Lên cấp dùng nút UI18 đã có; chữ điều kiện 13 px, không làm mờ toàn bộ nội dung bị khóa. |
| P1 | `p393_new_lose.jpg` | Hai khối cùng giải thích thiếu lực chiến. Khung thua và nút vàng đặc khác UI18; hành động nằm xa phần giải thích. | Gộp lý do vào một khối trong khung thua, padding 16 px: tiêu đề 16 px, số liệu 14 px, mô tả 13 px. Một nút chính “Nâng trang bị”, một nút phụ “Về sảnh”, cao 48 px, gap 12 px. Nếu bảng dưới là coachmark có chủ ý, chỉ hiện một lần, không giữ cả hai lời nhắc. |
| P1 | `p393_adm_equip_armory.jpg` | Bậc, phẩm chất, cấp và tên lặp trong lẫn ngoài ba ô. Chữ phụ “Phân giải nhanh” quá tối. | Tàu rộng 120–144 px; đưa ba ô đang dùng xuống một hàng dưới tàu, mỗi ô 108 px, gap 8 px, ảnh 52 px. Mỗi ô chỉ một tên tối đa hai dòng, cấp và một nhãn phẩm chất. Giữ ba loại trang bị đang có, không tự thêm ô thứ tư. Chữ nút `#e8e4d9` 13 px, chú thích 12 px. |
| P1 | `p393_new_gear0.jpg` | Nhãn trần cấp chạm viền ảnh; nút đúc phôi/tái chế vẫn bo tròn. Thông tin nguyên liệu dày. | Chừa dưới ảnh 16 px riêng cho cấp. Bốn ô nguyên liệu rộng 64 px, gap 8 px; số thiếu `#ff6670`. Nút phôi dùng nút phụ UI18 cao 44 px; chỉ hành động nâng chính dùng cam. Điều kiện khóa 13 px đặt trên nút, không chồng lên chữ nút. |
| P1 | `p393_adm_combat_dungeon.jpg` | Thanh xuyên tiêu đề; mô tả dài đẩy danh sách xuống. Thẻ và nút gradient chưa đồng bộ. | Thanh tiêu đề 48 px. Tóm tắt thành ba dòng 13 px, quy tắc dài chuyển vào “Chi tiết”. Thẻ hàng 369×96 px: tên 15 px/700, mô tả 12–13 px, nút 88×40 px với vùng chạm 44 px. Dùng lại nút UI18 cho Mua vé. |
| P1 | `p393_adm_home.jpg` | Sảnh vẫn chạy vệt liềm, hạt đạn và nhiều quầng quanh tàu. Võ Tận nhấn đỏ gần ngang tầm Xuất kích. | Dừng đường đạn kéo dài trên sảnh; động cơ/khiên alpha 0,25–0,4, chỉ nháy khi chọn tàu. Xuất kích là nút chính cam; Võ Tận là nút phụ lam. Giảm quầng sân đáp 35–45%. Chữ nút 18 px/700, không nghiêng. Chưa cần vẽ lại chiến cơ. |
| P2 | `p393_new_home.jpg` | Tên tàu bị cắt; điều kiện khóa và chú thích nhỏ lẫn nhau. Vệt đạn vẫn chạy trên sảnh. | Tên tối đa hai dòng 14 px, cấp/hệ 12 px. Điều kiện mở khóa đặt dưới nút bằng nhãn 76×24 px, chữ 12 px. Không đè lên tên nút. Tài khoản mới có hai tab có thể là cơ chế mở khóa, chưa đủ căn cứ gọi là lỗi. |
| P2 | `p393_adm_combat_map.jpg` | Nhãn boss sát mép phải; nút Tuần tra/Phó bản còn hai kiểu cũ, nhiều tầng điều hướng. | Nhãn boss max-width 148 px, chữ 12 px, padding 6×8 px; đổi phía khi còn dưới 12 px đến mép. Dùng nút phụ UI18/chip nhỏ. Giữ tối đa hai hàng điều hướng, mỗi hàng 44–56 px; không thêm khung lớn mới. |
| P2 | `p393_adm_equip_stones.jpg` | ĐÓNG/TẨY ĐÁ đã là UI18; bốn ô tự hợp vẫn bo tròn nhiều màu, có thể trông như bốn nút chính. Trạng thái trống sơ sài. | Dùng chip hoặc hàng công thức cao 36 px, gap 8 px; nền `#101d30`, màu hiếm chỉ ở chữ/viền. Thêm hướng dẫn trống 13 px, cách 16 px. Giữ lại các nút UI18 đã đúng. |
| P2 | `p393_adm_V77.jpg` | X vuông trắng, hàng danh dự bo tròn, biểu tượng tiền có glyph lạ. | X chung 36 px, vùng chạm 44 px. Hàng 369×88–96 px, tên 14 px, giá 13 px, nút 88×40 px. Thay glyph tiền bằng icon PNG. Khóa nút và ghi điều kiện, không làm mờ toàn bộ hàng. |
| P2 | `p393_adm_win.jpg` | Nền tia vàng/ruy băng phẳng khác giáp UI18; hạng A dùng khối bo tròn riêng, nhiều ô quà cùng loại. | Khung thắng 345×520–600 px tùy số quà. Tiêu đề 22 px, điểm 32 px, tên ải 14 px. Ô quà 56 px, gap 8 px. Có thể gộp quà cùng loại nếu cơ chế cho phép, không đổi giá trị thưởng. Nút Về sảnh UI18 đã đúng, giữ lại. |
| P2 | `pc_adm_fleet_ships.jpg` | Khung mobile nhỏ giữa nền hangar tràn rộng; hai lớp không gian cạnh tranh. Lặp lỗi tiêu đề và chữ trên nền. | Container desktop `width:min(100vw,480px)`, cao 100dvh, canh giữa. Phần ngoài dùng `#0b1220`, không phóng lớn hangar. Không scale toàn bộ chữ theo chiều cao. Kiểm tra lại ở 393 và 480 CSS px. |
| P3 · đã sửa | `bug_tran_kieu_cu.png` | Prompt xác nhận giao diện trận cũ đã sửa, không phải bằng chứng lỗi hiện hành. | Giữ làm ảnh hồi quy: HUD không trở lại kiểu cũ, tên boss/điểm không chồng nhau. Không mở thêm việc sửa chỉ dựa vào ảnh này. |

## Đối chiếu các nhận xét QA tự động

| Nhận xét | Kết luận từ ảnh |
|---|---|
| Nút X có nhiều kiểu | Xác nhận: V77/BK78 dùng trắng HTML, Cloud78 dùng nút vát lam. |
| Chip/tab cũ | Xác nhận ở BK78, phi công và các nhóm công thức. Một số tab đá khảm đã dùng ảnh kim loại. |
| Thẻ Phó bản gradient | Xác nhận, phù hợp thay bằng thẻ hàng mới. |
| Nút vàng/gradient | Xác nhận một phần: Lên cấp và các nút phôi/phụ còn khác họ. ĐÓNG trong ảnh đá khảm đã dùng UI18; không cần thay lại. Không khẳng định mọi ĐÓNG/ĐÚC PHÔI đều vàng. |
| Thanh xuyên tiêu đề, chữ trên hangar | Xác nhận ở Chiến cơ, Hợp thể, Kho và Phó bản. |
| Khung thắng/thua khác phong cách | Xác nhận cả hai ảnh. |
| Đạn và buff khó phân biệt | Xác nhận về phân cấp thị giác. Mật độ, tốc độ và hitbox cần playtest; đổi PNG chưa đủ chứng nhận dễ né. |

## Cách áp dụng ảnh tham chiếu

Học cấu trúc **ảnh trái – tên/Lv/chỉ số giữa – nút phải**, cùng phân cấp một hành động chính. Không sao chép chữ, biểu tượng hoặc toàn bộ skin của tựa game tham chiếu; không kéo mọi bảng thành gradient rực. Vùng chữ vẫn kính tối UI18, giáp bạc có khối ở viền, lam cho thông tin và cam cho hành động.

Thứ tự ghép: **đạn/buff/banner → tiêu đề và nền chữ → X/chip → hàng danh sách → khung kết quả**. Các thông số là điểm bắt đầu kiểm thử, không thay cho thử trên máy thật. Chưa sửa code game.
