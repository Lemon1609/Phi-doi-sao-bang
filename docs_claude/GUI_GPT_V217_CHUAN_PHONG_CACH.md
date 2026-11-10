# GỬI GPT · V217 · Bộ chuẩn phong cách "hiện đại – tương lai" + đợt vẽ 1

Chủ dự án nhận xét: tranh hiện **chưa đồng bộ**, có tàu **quá dẹt**, có tàu **quá to**, hiệu ứng Bạo Tẩu **lòe loẹt**. Từ đợt này mọi tranh (chiến cơ, trang bị, hợp thể, giao diện) theo đúng bộ chuẩn dưới đây. Tựa game gốc chỉ là tham khảo về **cảm giác** (sắc nét, cánh nhiều lớp, điểm sáng năng lượng nổi trên nền tối); **không chép** dáng, tranh, tên hay logo của game nào.

## A. Bộ chuẩn (áp cho mọi tranh)

1. **Khung và tỉ lệ**
   - PNG 512×512, nền trong suốt, nhìn thẳng từ trên xuống, mũi hướng lên, đối xứng trái – phải.
   - Thân tàu (không tính lửa động cơ) có **rộng / cao từ 0,85 đến 1,25**. Không dẹt như đĩa, không gầy như que.
   - Cỡ thân tăng dần theo bậc, tính bằng căn(rộng × cao): thường 345 · lục 355 · lam 368 · tím 380 · tím+ 392 · SS 405 (px). Cạnh dài nhất không quá 456 px.
   - Tâm thân trùng tâm ảnh. Lề trống mỗi phía ≥ 28 px.
2. **Dáng**
   - Nhận ra được ở cỡ 100 px: 3 khối lớn rõ ràng (thân giữa, cánh, cụm động cơ). Ít gai, không chi tiết vụn.
   - Mỗi tàu một dáng riêng; hai tàu không được na ná nhau khi tô đen toàn bộ.
3. **Chất liệu và ánh sáng**
   - Kim loại cứng kiểu dựng 3D: tấm giáp phẳng lớn, cạnh vát, đường chia tấm mảnh. Không hoa văn rối, không vân loang.
   - Một nguồn sáng từ trên – trái; viền sáng mảnh ở cạnh; bóng đổ nhẹ giữa các lớp tấm.
4. **Màu 60 / 30 / 10**
   - 60 % kim loại trung tính (thép, titan, xám súng) · 30 % màu chủ đạo của tàu · 10 % đèn năng lượng phát sáng.
   - Mỗi tàu chỉ **một** màu chủ đạo và **một** màu đèn. Không vàng kim, không cầu vồng.
   - Tuyệt đối không dùng đỏ #FF334F và hồng #F50057 (màu đạn địch).
5. **Phát sáng**
   - Chỉ phát sáng ở: lõi, buồng lái, khe năng lượng, họng động cơ. Lửa động cơ ngắn (≤ 40 px), màu lam – trắng.
   - **Không vẽ** lửa, sét, quầng sáng, hạt bụi, vòng tròn quanh tàu. Toàn bộ hiệu ứng do game vẽ bằng mã, có chuyển động.
6. **Tiến hóa 6 bậc** (`thuong / luc / lam / tim / tim5 / ss`)
   - Cùng một thân lõi. Bậc sau thêm tấm giáp, cánh phụ, họng pháo; lớn dần đúng cỡ ở mục 1. Không đổi màu chủ đạo.
7. **Bản Bạo Tẩu** (`_bt`, mỗi bậc một bản)
   - **Chỉ là thân và cánh bung ra**: cánh mở rộng, tấm giáp tách lớp, họng pháo lộ ra, khe năng lượng sáng hơn.
   - Thân lõi **cùng cỡ, cùng vị trí** với bản thường cùng bậc. Phần bung rộng hơn bản thường 15–35 %. Lề ≥ 12 px.
   - Không lửa, không sét, không quầng (mục 5).

## B. Đợt vẽ 1 (28 tranh)

| Việc | Tệp | Yêu cầu |
|---|---|---|
| **Tàu 8 vẽ lại dáng** | `tau8_{thuong,luc,lam,tim,tim5,ss}.png` + 6 bản `_bt` | Hiện rộng / cao = 1,47–1,85 (quá dẹt). Mục tiêu **1,05–1,25**: kéo dài thân theo chiều trước – sau (mũi nhô ra, cụm động cơ lùi về sau), giữ đặc trưng pháo hạm cam thép với pháo plasma lam. Bậc thấp 2 pháo, bậc cao 4 pháo. |
| **Tàu 6 vẽ lại dáng** | `tau6_{thuong,luc,lam,tim,tim5,ss}.png` + 6 bản `_bt` | Hiện rộng / cao = 0,44–0,75 (quá gầy). Mục tiêu **0,85–1,00**: thêm vai và cánh rộng hơn, giữ màu tím oải hương và nét thanh thoát. |
| **Tàu 4 nới dáng 2 bậc** | `tau4_thuong.png`, `tau4_lam.png` + 2 bản `_bt` | Hiện 0,48 và 0,62. Mục tiêu ≥ 0,85, cùng họ dáng với 4 bậc còn lại. |

Bản Bạo Tẩu của cả ba tàu theo mục A.7 (thân bung, không hiệu ứng).

## C. Các đợt sau (chưa vẽ, để biết trước)

1. Tàu 11, 12, 13 theo bộ chuẩn.
2. Bản Bạo Tẩu "sạch" (A.7) cho tàu 1, 2, 3, 4, 5, 7.
3. Icon trang bị: cùng chất liệu kim loại, cùng nguồn sáng, khung 256×256, màu theo bộ trang bị.
4. Hợp thể: ghép đặc trưng của hai tàu thành phần sau khi cả hai có tranh chuẩn.
5. Quái, boss, nền, khung giao diện.

## D. Cách nộp

Một tệp zip, đúng tên tệp ở trên, PNG RGBA 512×512. Kèm một ảnh ghép 6 bậc × 2 hàng (thường / Bạo Tẩu) cho mỗi tàu để duyệt nhanh.
