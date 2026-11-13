# Gửi Gemini: làm tươi sáng, bắt mắt 12 chiến cơ (giữ nguyên dáng)

**Dán kèm:** `hien_tai_12_tau_xep_toi_den_sang.jpg`, `tham_khao/phong_cach_1.png`, `tham_khao/tau4_mau_gemini.png`.

---

Chào Gemini, Claude đây. Chủ dự án nhận xét: **thiết kế chiến cơ, trang bị, hợp thể vẫn đang khá u tối.** Chủ dự án muốn **tươi sáng, bắt mắt, thu hút** như dòng game bắn máy bay mobile mà game lấy cảm hứng (chỉ học phong cách, không chép tàu nào). Làm dần: **chiến cơ trước**, sau đó tàu con, tàu hợp thể, tàu con hợp thể, robot và icon.

## Claude đo độ sáng thân (bậc Tím, 0–255; ảnh phong cách 1 khoảng 143)

| Tàu | Sáng TB | Phần tối (< 60) | Nhận xét |
|---|---|---|---|
| 4 Thần Ma (mẫu mới) | 58 | 63 % | rất tối |
| 11 Thôn Tinh | 60 | 64 % | rất tối |
| 6 U Linh | 72 | 55 % | tối |
| 13 Hư Không | 80 | 51 % | tối (chủ ý đen gương) |
| 8 Phần Thiên | 85 | 37 % | hơi tối |
| 7 Đao Phong | 91 | 44 % | hơi tối |
| 12 Thời Không | 100 | 35 % | vừa |
| 2 Cực Quang | 122 | 28 % | sáng nhưng ít màu |
| 5 Thự Quang | 126 | 15 % | đạt |
| 3 X-Dực Băng | 131 | 24 % | đạt |
| 10 Tinh Hà | 131 | 18 % | sáng nhưng ít màu |
| 9 Thiên Khung | 142 | 16 % | đạt (chuẩn) |

Tàu 1 đang thiết kế lại thân, làm sau.

## Cách làm: "sơn lại", không vẽ lại dáng
- Mỗi tàu có 2 ảnh khung trong `khung/`:
  - `tauN_tim_thuong.png` (1024);
  - `tauN_tim_bao_tau.png` (khung ~1300–1400).
- **Giữ đúng 100 % đường viền, dáng, cỡ, vị trí, từng bộ phận.** Claude sẽ giữ nguyên viền thân cũ khi ghép, nên nét vẽ tràn ra ngoài viền sẽ bị cắt. Năng lượng bung cũng đang khớp theo viền này.
- Chỉ đổi **màu, chất liệu, ánh sáng**:
  - **nền giáp sáng**: trắng ngọc trai, bạc sáng, hoặc màu tươi bão hòa;
  - **viền kim loại quý** mảnh tách khối: vàng kim, bạc, đồng hồng;
  - **mảng màu chủ tươi** của từng tàu;
  - **đèn / ngọc / khe sáng rực** (bậc Tím giữ màu đèn riêng của tàu);
  - **bóng sáng phản chiếu** trên giáp;
  - **lõi năng lượng ở ngực** sáng rõ.
- **Phần tối chỉ còn ở khe, lỗ thông gió, họng động cơ: khoảng ≤ 20 %** diện tích thân. Độ sáng trung bình nhắm khoảng 120–150.
- Nền đen giữ nguyên. Không chữ, không dấu hình mờ.

## Gợi ý màu (giữ nhận diện, chỉ sáng và tươi hơn)

| Tàu | Gợi ý |
|---|---|
| 4 Thần Ma | đỏ son tươi + bạc trắng + viền vàng kim, mắt lam / lục ngọc rực; đen chỉ ở khe |
| 11 Thôn Tinh | tím sáng + bạc + viền đồng / vàng ánh sao, lõi hố đen viền tím rực |
| 6 U Linh | xám titan sáng + xanh ma trơi + tím nhạt, gai cánh sáng viền |
| 13 Hư Không | giữ chất đen gương nhưng **phản chiếu nhiều** (vệt sáng crôm dài), giáp crôm bạc sáng hơn, đèn tím điện rực; phần tối ≤ 35 % |
| 8 Phần Thiên | đỏ son + vàng kim + trắng, lông giáp ánh cam sáng |
| 7 Đao Phong | thân bạc sáng, lưỡi đỏ tươi / vàng kim, lõi hồng tím rực |
| 12 Thời Không | lam sáng + vàng kim bóng + trắng |
| 2 Cực Quang | thân bạc giữ, thêm mảng lục ngọc / hồng phấn tươi (hợp cực quang) |
| 10 Tinh Hà | tím oải hương sáng + bạc + điểm vàng ánh sao, mắt hồng rực |
| 3, 5, 9 | đã đạt, chỉ tăng bóng sáng và độ rực đèn nếu cần |

## Bước 1 (làm ngay): vẽ thử 2 tàu tối nhất để chủ dự án duyệt hướng
- **Tàu 11 Thôn Tinh** và **tàu 6 U Linh**: mỗi tàu 2 ảnh (thường + Bạo Tẩu), cùng tên tệp, cùng khung.
- Tàu 4 là mẫu chủ dự án vừa thiết kế. Bạn gửi kèm **một bản tươi thử** (thường + Bạo Tẩu) để chủ dự án tự chọn.

Duyệt hướng xong sẽ làm các tàu còn lại. Các bậc khác (Thường, Lục, Lam, Tím+, SS) theo mã màu bậc: thường trắng bạc, lục, lam, Tím+ hồng tím, SS vàng kim. Bậc cao lộng lẫy hơn, bậc thấp không đơn sắc.
