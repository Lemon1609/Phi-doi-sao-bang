# ĐỊNH HƯỚNG MỸ THUẬT · V212B · SỬA SAU ĐỢT MẪU 01 / 07 / 13

Gửi GPT. Chủ dự án nhận xét đợt mẫu: **"thiết kế tàu chưa đẹp, chưa ra phong cách game gốc"**. Claude đối chiếu với ảnh tham khảo và thấy 4 lỗi.

## 1. Lỗi của đợt mẫu

| Lỗi | Hiện tại | Cần đạt |
|---|---|---|
| Ba tàu giống nhau | Cùng thân bạc + lõi cyan, cùng bố cục đối xứng 2 động cơ | **Mỗi tàu một dáng và một bộ màu riêng**, nhìn bóng đen cũng nhận ra |
| Siêu cấp = dán cánh | Cả 3 tàu chung một cặp cánh pha lê tím | **Mỗi tàu một kiểu siêu cấp riêng**, mọc ra từ chính thân tàu, đổi hẳn dáng |
| Thiếu cá tính | Chi tiết đều, không có điểm nhấn | Mỗi tàu 1–2 **điểm nhấn lớn**: mắt kính tròn, khối vai, lưỡi bên, vòng năng lượng, gai sừng… |
| Tối thượng = tô vàng | Phủ vàng toàn bộ, mất chi tiết | Vàng kim **làm giáp chính**, giữ lõi và đường năng lượng màu riêng của tàu, thêm hào quang và tia sáng phía sau |

**Kỹ thuật vẽ cần đạt:**
- tranh 2.5D tô bóng kiểu game mobile, độ tương phản cao;
- viền sáng (rim light) theo màu năng lượng;
- kim loại bóng, khối sắc cạnh;
- hiệu ứng năng lượng rực (tia sét, pha lê, lửa plasma) **gắn liền vào thân**, không phải lớp dán.

**Ranh giới bản quyền giữ nguyên:**
- chỉ học phong cách chung;
- không chép, không đồ lại tàu nào của game gốc;
- không dùng logo hay tên riêng của game gốc.

**Về nền:** không cần vẽ nền trưng bày nữa. Claude vẽ bằng mã nền bản vẽ navy có lưới và hình nét tàu, giống bố cục game gốc hơn căn phòng sân khấu. GPT chỉ giao **tàu nền trong suốt**.

## 2. Bảng thiết kế 13 tàu (theo tên trong game)

| # | Tên | Chủ đề | Bộ màu thân / năng lượng | Dáng & điểm nhấn (dạng thường) | Siêu cấp (đổi dáng) | Tối thượng |
|---|---|---|---|---|---|---|
| 1 | Nộ Hỏa Phượng Hoàng | Chim lửa | Đỏ thẫm – đen / lửa cam | Thân chim, mũi mỏ nhọn, 2 cánh xếp lông vũ kim loại, đuôi 3 dải | Cánh bung thành **đôi cánh lửa lông vũ** lớn, đuôi lửa dài | Giáp vàng, lửa cam – trắng, hào quang hình tròn sau lưng |
| 2 | Cực Quang Ảo Ảnh | Cực quang | Trắng ngọc – bạc / lục – lam | Thân mảnh, 2 vây đuôi cong như dải lụa | Mọc **các dải cực quang** uốn lượn hai bên, có bóng ảnh mờ chồng lớp | Giáp vàng trắng, dải cực quang 7 màu dịu |
| 3 | X-Dực Băng Hà | Băng tuyết | Bạc trắng – xanh băng / cyan | Cánh chữ X, 4 mũi cánh băng | **Cánh băng nhiều lớp** tỏa ra, tia sét lạnh, bông tuyết lơ lửng | Giáp vàng, băng xanh trong, gai băng vàng |
| 4 | Thần Ma Dị Hình | Sinh vật ngoài hành tinh | Tím than – đen / lục độc | Thân sinh học, gân, 2 càng phía trước | **Càng và xúc tu** dài ra, vỏ giáp mở như cánh bọ | Giáp vàng đen, lõi lục |
| 5 | Trí Tuệ Thự Quang | Bình minh / trí tuệ | Trắng – lam / vàng nhạt | Thân tam giác, vòng hào quang mảnh sau mũi | **Gai pha lê tỏa tròn** như mặt trời mọc | Gai vàng, lõi trắng |
| 6 | Siêu Nghiệm U Linh | Bóng ma | Đen – tím / tím lạnh | Thân mờ một phần, áo choàng đuôi | **Áo choàng năng lượng** bung, bóng ma phân thân hai bên | Giáp vàng, áo choàng tím – vàng |
| 7 | Ma Vương Đao Phong | Lưỡi đao | Tím đậm – đen / lam điện | Thân hẹp có **2 lưỡi đao bên** cong | Lưỡi đao phình thành **2 lưỡi liềm khổng lồ** ôm quanh thân | Lưỡi liềm vàng rực, thân đỏ – tím |
| 8 | Phần Thiên Chiến Chuẩn | Pháo nhiệt áp | Cam – xám thép / cam plasma | Thân rộng, 2 nòng pháo vai lớn | Nòng **mở rộng thành 4 nòng**, ống tản nhiệt phát sáng | Giáp vàng, plasma trắng |
| 9 | Thiên Khung Lược Ảnh | Song cánh | Xanh biển – trắng / lam | Cánh kép trên dưới, đuôi đôi | **Hai cặp cánh** tách rời bay quanh thân như tàu con | Cánh vàng, vệt lam |
| 10 | Tinh Hà Thủ Vọng | Quân đoàn | Xanh lục quân – bạc / lục ngọc | Thân giáp dày, khiên trước mũi | **Khiên mở thành bệ phóng**, nhiều tên lửa mini dựng quanh | Giáp vàng, ánh lục |
| 11 | Thôn Tinh | Nuốt sao | Đen – vàng đồng / tím | Thân tròn, **lỗ hút ở giữa** như hố đen | Lỗ hút thành **xoáy hố đen** có vành ánh sáng; **biến Mecha** | Mecha vàng – đen, xoáy tím |
| 12 | Thời Không | Thời gian | Bạc – lam / lam kim | Vành **bánh răng đồng hồ** sau thân | Bánh răng thành **vòng thời gian** quay quanh; **biến Mecha** | Mecha vàng, vòng lam |
| 13 | Hư Không | Hư vô | Đen tuyền – trắng / tím trắng | Thân góc cạnh tối giản, vết nứt không gian | **Vết nứt không gian** mở thành cánh ánh sáng trắng; **biến Mecha** | Mecha vàng trắng, vết nứt tím |

Luật màu trong trận (giữ):
- hiệu ứng năng lượng **không dùng đỏ #FF334F / hồng #F50057** (màu đạn địch);
- thân tàu màu đỏ thẫm (tàu 1) được, nhưng lửa / đạn của tàu này phải là cam – vàng.

## 3. Quy cách giao
- `tau_XX_thuong.png`, `tau_XX_sieucap.png`, `tau_XX_toithuong.png`:
  - 512 × 512, nền trong suốt;
  - nhìn từ trên xuống, mũi lên, căn giữa;
  - phần thân chiếm khoảng 60% chiều cao ở dạng thường.
- Mecha (tàu 11–13): `mecha_XX_sieucap.png`, `mecha_XX_toithuong.png`, 512 × 640.
- **Đợt thử lại:** tàu **1, 7, 11** (đủ 3 kiểu: chim lửa, lưỡi liềm, Mecha), mỗi tàu 3 nấc. Chủ dự án duyệt xong mới vẽ phần còn lại.

## 4. Mẫu lời nhắc (ví dụ tàu 7, GPT tự chỉnh)

> Top-down mobile shmup fighter, nose up, centered, transparent background, 512x512. **Original design.**
> Deep violet and black armored hull, narrow fuselage with two curved side blades, electric-blue energy lines, glossy metal, strong rim light, high-contrast 2.5D painted game art.
>
> **SUPER form:** the side blades grow into two huge crescent energy scythes wrapping around the ship, crackling blue lightning, glowing violet edges.
>
> **ULTIMATE:** same silhouette as super, scythes and armor turn radiant gold, hull accents crimson-violet, golden light rays behind.
