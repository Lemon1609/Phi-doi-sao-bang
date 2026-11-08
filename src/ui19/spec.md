# UI19 — thông số bàn giao V79

## Phạm vi và trạng thái

Bộ gồm **49 PNG**: 4 phôi, 25 mảnh ngọc, 3 khung quà bộ, 4 huy hiệu, 3 icon thành tựu, 4 tiêu đề phó bản, 1 nền sảnh nhẹ và 5 tài nguyên màn tải/app. Kèm báo cáo rà soát 46 màn và 3 ảnh ghép tổng, preview offline, thông số và hai prompt bàn giao.

**Ánh xạ năm hệ ngọc chưa chốt.** Người dùng yêu cầu cả năm màu lẫn năm hệ. Prompt V79 chưa nêu tên hệ; tài liệu Đợt 13 chỉ mô tả năm phẩm màu. Vì vậy, 25 ảnh dùng ma trận **5 hình tạm S01–S05 × 5 phẩm màu**. Các hình chưa được gán tên, chức năng hay mã hệ thật. Claude cần đối chiếu nguồn theo `PROMPT_CLAUDE_CHOT_HE_NGOC.md`, rồi cập nhật các trường null trong `system_mapping.json`. Không suy diễn hệ từ màu.

Tất cả PNG không chứa chữ hoặc số. Logo là biểu trưng; tên game, “3★”, “Tím +5”, số lượng và phần trăm tải được hiển thị bằng DOM/canvas text. Hai nền là ảnh kín; 47 ảnh còn lại có alpha ngoài vật thể. Gói đầu vào không chứa HTML game: chưa ghép vào game hoặc đo FPS.

## Bảng màu

| Vai trò | Màu |
|---|---|
| Nền chính | #0b1220 |
| Kính tối | #101d30 |
| Bạc ngà, chữ chính | #e8e4d9 |
| Chữ phụ | #b9ccdf |
| Chữ ở trạng thái khóa | #8fa8bf |
| Lam UI | #5ab8ff |
| Cam UI | #ff9a3d |
| Vàng UI | #f3d48a |
| Phẩm Trắng | #d6e0ea |
| Phẩm Lục | #3ee08f |
| Phẩm Lam | #3aa8ff |
| Phẩm Tím | #b45cff |
| Phẩm Cam | #ff9a3d |

Đây là màu chuẩn để vẽ viền và nhãn bằng code; vật thể có các sắc độ sáng/tối theo chất liệu. Phẩm Cam nối tiếp hệ Đá của Đợt 13 và dùng tông cam UI trong V79. Kết hợp màu với tên phẩm và hình dáng hệ, không dùng màu làm tín hiệu duy nhất.

## Danh mục PNG và 9-slice

Mọi cỡ CSS dưới đây dành cho màn rộng **393 px**. Slice được ghi theo thứ tự **trên / phải / dưới / trái**, đo bằng pixel trong ảnh nguồn. “—” nghĩa là không dùng 9-slice. Icon giữ tỷ lệ bằng contain; nền dùng cover. Không kéo giãn cả khung khi đã có thông số slice.

| Tệp | PNG (px) | Cỡ CSS tham chiếu (px) | Slice nguồn T/R/B/L |
|---|---|---|---|
| `blank_white.png` | 128×128 | 28×28 (ô thưởng 40×40) | — |
| `blank_green.png` | 128×128 | 28×28 (ô thưởng 40×40) | — |
| `blank_blue.png` | 128×128 | 28×28 (ô thưởng 40×40) | — |
| `blank_purple.png` | 128×128 | 28×28 (ô thưởng 40×40) | — |
| `gem_s01_white.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s01_green.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s01_blue.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s01_purple.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s01_orange.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s02_white.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s02_green.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s02_blue.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s02_purple.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s02_orange.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s03_white.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s03_green.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s03_blue.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s03_purple.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s03_orange.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s04_white.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s04_green.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s04_blue.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s04_purple.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s04_orange.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s05_white.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s05_green.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s05_blue.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s05_purple.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `gem_s05_orange.png` | 128×128 | 28×28; mẫu lớn 40×40 | — |
| `set_card_green.png` | 256×160 | 112×88 | 24 / 24 / 44 / 24 |
| `set_card_blue.png` | 256×160 | 112×88 | 24 / 24 / 44 / 24 |
| `set_card_purple.png` | 256×160 | 112×88 | 24 / 24 / 44 / 24 |
| `rank_bronze.png` | 96×96 | 24×24; nổi bật 32×32 | — |
| `rank_silver.png` | 96×96 | 24×24; nổi bật 32×32 | — |
| `rank_gold.png` | 96×96 | 24×24; nổi bật 32×32 | — |
| `rank_diamond.png` | 96×96 | 24×24; nổi bật 32×32 | — |
| `achievement_stars.png` | 128×128 | 40×40; danh sách 32×32 | — |
| `achievement_forge.png` | 128×128 | 40×40; danh sách 32×32 | — |
| `achievement_hunter.png` | 128×128 | 40×40; danh sách 32×32 | — |
| `result_title_gold.png` | 512×128 | 345×64 | 24 / 64 / 24 / 104 |
| `result_title_materials.png` | 512×128 | 345×64 | 24 / 64 / 24 / 104 |
| `result_title_gems.png` | 512×128 | 345×64 | 24 / 64 / 24 / 104 |
| `result_title_equipment.png` | 512×128 | 345×64 | 24 / 64 / 24 / 104 |
| `lobby_light.png` | 720×1560 | 393×852; object-fit:cover | — |
| `loading_logo.png` | 512×256 | 224×112 | — |
| `loading_background.png` | 720×1560 | 393×852; object-fit:cover | — |
| `loading_track.png` | 512×48 | 297×28 | 12 / 32 / 12 / 32 |
| `loading_fill.png` | 448×16 | 257×10 (clip theo tiến độ) | — |
| `app_icon.png` | 512×512 | 96×96 preview; nguồn 512×512 | — |

## Vùng đặt nội dung và viền đích

| Nhóm | Cỡ đích | Viền đích T/R/B/L | Vùng nội dung |
|---|---|---|---|
| set_card_* | 112×88 hoặc 112×100 | 12/12/22/12 | Ảnh 40–44 px ở giữa phần trên; tên một dòng 11/14 px, đặt tại y=h−16 trong dải dưới. |
| result_title_* | 345×64 | 12/32/12/52 | Chữ trong vùng x=60…305, y=20, cao 24 px; font 17/22 px. |
| loading_track | 297×28 | 7/18,67/7/18,67 | Khe nạp x=20, y=9, rộng 257 px, cao 10 px. |
| loading_fill | 257×10 | Không slice | Vẽ toàn dải, rồi clip từ trái theo tiến độ. Không scaleX theo phần trăm. |
| loading_logo | 224×112 | Không slice | Giữ tỷ lệ, tên game là chữ riêng ở dưới. |
| app_icon | Nguồn 512×512 | Không slice | Tile navy có góc trong suốt; hình chính nằm trong vùng trung tâm 80%. |

Đặt skin trong lớp riêng có `position:absolute; inset:0; pointer-events:none`; nội dung thuộc container bên ngoài. Tránh để border-image của container làm lệch tọa độ ảnh/chữ. Nếu dùng canvas, `renderer.js` có hàm `nine(ctx, images, name, x, y, w, h, sourceSlices, destinationWidths)`.

Khung quà bộ là viền rỗng, cả hai vùng ảnh và tên đều trong suốt. Game đặt một lớp nền #101d30 phía sau viền (inset khoảng 4 px ở cỡ 112×100), rồi đặt ảnh món và chữ ở trên. Cách này giữ nền phẳng, không có mảng tối loang. Khung không có ảnh món dựng sẵn. Khi ghép bốn món trên màn 393 px, dùng lưới 2×2, gap 8 px, thẻ khoảng 140×96 px tùy padding của modal. Ảnh món 40–44 px; tên trong dải dưới dùng một dòng 11/14 px. Với tên dài, rút gọn trong thẻ và đặt tên đầy đủ ở khối DOM bên dưới khung hoặc trong phần chi tiết; không ép hai dòng vào dải tên hẹp. Preview dùng ảnh phôi để thử vùng ảnh; game phải thay bằng ảnh chiến cơ, giáp, tên lửa và tàu con đúng bộ.

Font preview là Arial/sans-serif có sẵn để chạy offline. Khi ghép, giữ font game hỗ trợ tiếng Việt: tựa 18/24 px, tên mục 14/20 px, nội dung 12–13/18–20 px. Không giãn chữ mô tả. Vùng chạm tối thiểu 44×44 px, kể cả khi hình nút nhỏ hơn.

## Ma trận mảnh ngọc

| Mã hình tạm | Hình dáng | Trạng thái dữ liệu |
|---|---|---|
| S01 | Mảnh tam giác nhọn | Chưa có system_id hoặc tên hệ thật |
| S02 | Mảnh cong khuyết lớn | Chưa có system_id hoặc tên hệ thật |
| S03 | Mảnh trụ lục giác dọc | Chưa có system_id hoặc tên hệ thật |
| S04 | Mảnh vuông sứt góc | Chưa có system_id hoặc tên hệ thật |
| S05 | Mảnh chạc đôi, rãnh chữ V | Chưa có system_id hoặc tên hệ thật |

Mỗi hình có white, green, blue, purple, orange tương ứng Trắng, Lục, Lam, Tím, Cam. Các biến thể được tạo riêng theo cùng mô tả hình, không giống hệt từng pixel. Nếu nguồn chỉ có năm phẩm hoặc số hệ khác năm, Claude phải báo khác biệt; không tự sửa gameplay để khớp bộ ảnh. Nếu hình tạm chưa phù hợp chức năng, dùng prompt bàn giao để yêu cầu vẽ thay sau khi đã biết hệ.

Phôi là khối lõi thô; mảnh ngọc là lát tinh thể vỡ. Không thêm vỏ hộp hoặc halo lớn làm chúng giống buff. Trong ô thưởng, đặt icon 28–32 px, tên/phẩm màu và số lượng ở dòng riêng; không đè số lên ảnh. Nhãn “Tím +5” của thành tựu Thợ rèn được viết bằng giao diện, không nằm trong PNG.

## Sảnh ở chế độ NHẸ

`lobby_light.png` có kích thước 720×1560, tỷ lệ 6:13, gần khớp 393×852. Dùng cover hoặc drawImage giữ tỷ lệ. Nền không có tàu, HUD, tia hay hạt; vùng giữa dành cho sprite chiến cơ.

Đổi nền không đủ để bảo đảm tăng FPS. Khi bật NHẸ, dừng emitter tia, halo và hạt của sảnh; chỉ giữ nền, sprite tàu và bóng tĩnh nhỏ nếu cần. Tạm dừng cập nhật khi modal che kín hoặc tab bị ẩn. Không áp việc bỏ hiệu ứng cho đạn/nguy hiểm trong trận khi chưa có xác nhận gameplay. Đo frame time, FPS và bộ nhớ trên cùng thiết bị, cùng cảnh trước/sau.

## Màn tải online

Bốn lớp riêng gồm `loading_background`, `loading_logo`, `loading_track`, `loading_fill`. Tên game và trạng thái là chữ do giao diện hiển thị. `app_icon` là PNG nguồn 512×512, chưa phải gói manifest/PWA/favicon.

Bootstrap chỉ tải các lớp cần cho màn chờ; không chờ toàn bộ 49 PNG mới hiển thị splash. Khoảng 30 MB là ước tính của yêu cầu, không phải tổng byte đã đo. Tính phần trăm từ byte tải thực tế và tổng byte đáng tin cậy. Nếu không biết tổng, hiển thị “Đang tải tài nguyên…” với trạng thái không xác định; không chạy timer giả đến 100%. Chỉ báo sẵn sàng sau khi tài nguyên cần thiết đã tải và giải mã xong. Cần trạng thái lỗi, thử lại và cache theo phiên bản.

Slider 0–100 trong preview chỉ mô phỏng bố cục và được ghi rõ là mô phỏng. Không dùng logic này làm tiến độ tải thật.

## Chạy preview và kiểm tra

Giải nén rồi mở `preview.html` trực tiếp. HTML dùng script thường và ảnh cùng thư mục, không cần CDN, font mạng hoặc build. Có năm tab, thanh trượt tiến độ trong tab Màn tải và bộ lọc ảnh. Toàn bộ chữ được vẽ khi chạy, không nằm trong PNG.

Mỗi ảnh thường tối đa **300.000 byte**, mỗi nền tối đa **600.000 byte**; đây là ngưỡng thập phân, chặt hơn 300/600 KiB. PNG dùng palette và tRNS khi có alpha để giảm dung lượng. Nếu engine cần RGBA32, giải mã PNG thành RGBA khi tải; không bỏ alpha. `validation.json` ghi kích thước, dung lượng, alpha và kết quả thử chuyển WebP lossless.

QA cục bộ gồm kiểm tra đủ 49 PNG, kích thước, giới hạn dung lượng, alpha, bảng ảnh tổng và mẫu 28 px; dựng năm màn bằng chính `renderer.js` với Canvas ở 393 px; thử các nút/tab/bộ lọc/slider của preview và kiểm tra ZIP CRC. Môi trường không có trình duyệt: chưa thử bố cục CSS trên Chrome/Safari hoặc game thật. Hai prompt Claude/Gemini nêu các bước kiểm tra sau khi ghép, đặc biệt là ánh xạ hệ, vùng cuộn và FPS.

## Nguồn và phương thức

Đối chiếu `GOI_RA_SOAT_V79.zip`, `PROMPT_GPT_DO_HOA_V79.md` và tài liệu Đợt 13 về năm phẩm của hệ Đá. Ảnh được tạo bằng imagegen tích hợp, mỗi asset/biến thể một lệnh riêng. `generation_prompts.json` lưu bộ prompt đã dùng. Sau khi tạo ảnh, thực hiện crop alpha, chuẩn hóa kích thước và nén palette để bàn giao.
