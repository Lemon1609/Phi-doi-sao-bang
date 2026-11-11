# GỬI GPT · V225 · Tàu 7 bước 2: 5 bậc còn lại + 6 bản Bạo Tẩu

**Chủ dự án đã duyệt** ảnh chủ tàu 7 bản sửa. Ảnh này giờ là **mẫu phong cách V225** cho mọi chiến cơ (gửi kèm: `tau7_tim_MAU_PHONG_CACH_V225.png`). Nó cũng chính là `tau7_tim.png`, không cần vẽ lại.

Đo trong game: khung tối 32 %, crôm 13 %, phát sáng 17,5 %, cỡ 380 px, rộng / cao 1,05. Các bậc khác giữ cùng tỉ lệ màu này.

## Cần vẽ (PNG RGBA 512×512, nền trong suốt, nhìn thẳng từ trên xuống, mũi hướng lên)

**A. 5 bậc bản thường** theo bảng phụ lục D.2 của prompt V225. Dựng từ chính ảnh mẫu: cùng thân lõi, cùng màu, cùng nguồn sáng; bậc thấp bớt bộ phận, bậc cao thêm bộ phận.

| Tệp | Cỡ căn(rộng × cao) | Thêm / bớt so với ảnh mẫu (bậc tím) |
|---|---|---|
| `tau7_thuong.png` | 345 px | Thân ngắn; mỗi bên 1 lưỡi liềm đơn bản hẹp gắn qua 1 thanh giằng thẳng; 1 họng xả; chưa có ống dẫn crôm ở bụng |
| `tau7_luc.png` | 355 px | Lưỡi liềm dày hơn, gờ crôm ở sống đao; 2 họng xả tròn nhỏ; 2 khe tản nhiệt ngang ở ngực |
| `tau7_lam.png` | 368 px | Tay đòn khung chữ Y có chốt xoay đèn lam #3FD8FF; 2 nòng pháo lộ thiên hai bên lõi |
| `tau7_tim5.png` | 392 px | Như ảnh mẫu + trên lưng mỗi lưỡi liềm 1 lưỡi đao phụ ngắn xếp lớp (đao kép 2 tầng); 2 chốt tụ điện ở đầu mũi đao |
| `tau7_ss.png` | 405 px | Đao kép tách khe sáng xuyên giữa 2 lớp lưỡi; đầu tay đòn có cặp bánh răng hãm crôm; mũi vươn dài thành đầu đao 3 ngạnh |

Cạnh dài nhất không quá 456 px, lề mỗi phía ≥ 28 px. Họng động cơ vẽ elip hẹp đúng góc nhìn thẳng từ trên xuống (ảnh mẫu còn hơi nghiêng).

**B. 6 bản Bạo Tẩu** `tau7_{thuong,luc,lam,tim,tim5,ss}_bt.png` theo phụ lục D.3:
- Dựng trên chính bản thường cùng bậc; thân lõi trùng khít vị trí và cỡ.
- Khớp tròn trên tay đòn xoay khoảng 15°, đẩy hai lưỡi liềm vươn rộng sang hai bên và nhô mũi đao lên trước; mỗi lưỡi liềm tách thành 2 lớp trong – ngoài, giữa là khe sáng lam điện #3FD8FF.
- Hai tấm giáp ốp lõi ngực trượt xuống khoảng 8 px, lộ buồng lõi, 2 nòng pháo nhô hẳn lên trước.
- Diện tích 1,25–1,35 lần bản thường cùng bậc. Bậc cao mở mạnh hơn, cùng một kiểu mở.
- Không lửa, sét, quầng, hạt dính vào tranh.

**C. Ảnh ghép duyệt nhanh:** 6 bậc × 2 hàng (thường / Bạo Tẩu).

Nếu chạm hạn mức tạo ảnh: gửi trước 5 bậc bản thường, Bạo Tẩu gửi sau.
