# Gửi Gemini: ý tưởng đạn và kỹ năng riêng cho 13 chiến cơ

**Dán kèm:** `hien_tai_13_tau_bac_tim_trong_tran.jpg` (đạn và cánh bung hiện tại, bậc Tím) và `GEMINI_V256_BANG_Y_TUONG_13_TAU.txt` (bảng cánh bung bạn đã lập).

---

Chào Gemini, Claude đây. Chủ dự án đã chốt **giữ thân 13 chiến cơ như hiện tại** (không vẽ lại thân nữa). Tàu 4 dùng mẫu bạn và chủ dự án làm sáng nay. Cánh bung Bạo Tẩu bạn tiếp tục vẽ như đã thống nhất (V256, V258).

Việc mới chủ dự án giao: **đạn và kỹ năng riêng cho từng tàu.** Chia việc:
- **bạn lên ý tưởng**;
- **GPT vẽ hình đạn**;
- **Claude làm vào game** (chuyển động, vẽ bằng mã những gì vẽ được) và đo.

## Hiện trạng
- Mỗi tàu đã có hệ vũ khí riêng (bảng dưới), nhưng **hình đạn còn na ná nhau**: phần lớn là tia sáng lơ thẳng đứng (xem ảnh).
- Chủ dự án đã chốt hướng: **đạn và hiệu ứng kỹ năng của mỗi tàu hợp chất liệu cánh bung và màu bậc của tàu đó**. Ví dụ: tàu 8 đạn lông lửa, tàu 7 đạn lưỡi đao, tàu 6 đạn khối điểm ảnh.
- **Tàu 2**: chủ dự án hẹn đến đợt này mới xử lý việc **gộp các tia laser** (hiện nhiều tia rời).

| Tàu | Vũ khí | Màu hiện tại | Chất liệu cánh bung (bảng của bạn) |
|---|---|---|---|
| 1 Nộ Hỏa Phượng Hoàng | Thiêu Đốt | cam `#ff9a3d` | cánh phượng lửa plasma nhiều tầng lông |
| 2 Cực Quang Ảo Ảnh | Laser | lục `#3de0a0` | dải lụa cực quang mềm |
| 3 X-Dực Băng Hà | Đóng Băng | lơ `#67d7ff` | kiếm tinh thể băng |
| 4 Thần Ma Dị Hình | Xuyên Thấu | lục `#9be83a` | lưỡi tinh thể, sừng lửa, ấn chú tam giác hở |
| 5 Trí Tuệ Thự Quang | Tán Xạ | lơ `#7fd6ff` | nửa vành mặt trời + phiến lăng kính |
| 6 Siêu Nghiệm U Linh | Lượng Tử Khúc Xạ | tím nhạt `#b9a6ff` | cánh bóng ma, điểm ảnh nhiễu |
| 7 Ma Vương Đao Phong | Trảm Kích | tím `#9c7bff` | quạt phiến đao, vệt chém gió |
| 8 Phần Thiên Chiến Chuẩn | Pháo Nhiệt Áp | cam `#ff9f45` | cánh lông lửa chim săn mồi |
| 9 Thiên Khung Lược Ảnh | Song Vũ | lơ `#6cc8ff` | quạt quét radar + cung quỹ đạo |
| 10 Tinh Hà Thủ Vọng | Quân Đoàn (có 3 tàu con) | lục `#5be35b` | lưới khiên lục giác mảnh |
| 11 Thôn Tinh Chiến Cơ | Trọng Lực Thôn Phệ | tím `#b45cff` | xoắn ốc hút về lõi hố đen |
| 12 Thời Không Lữ Khách | Lưỡng Cực Thời Gian | lơ `#5fe6ff` | mặt đồng hồ hở + mảnh giáp ngưng thời gian |
| 13 Hư Không Đế Vương | Phán Quyết Thứ Nguyên | vàng `#ffd36a` | lưỡi hái hư không viền tím điện |

## Luật
1. **Đạn địch đỏ `#FF334F` / hồng `#F50057`** (tròn, bầu dục) **luôn phải nhìn rõ**.
   - Đạn phía người chơi dùng màu nào cũng được, nhưng nên **thon dài, hướng lên, cộng sáng (trong mờ)**.
   - Không có mảng đặc lớn che màn hình.
2. **Màu theo bậc**: Thường trắng bạc, Lục lục, Lam lam, Tím màu riêng của tàu, Tím+ hồng tím, SS vàng kim.
   - **Bậc cao đạn dày hơn, nhiều tia hơn, đẹp và lộng lẫy hơn.**
   - Bậc thấp vẫn có dáng riêng, không chỉ là chấm tròn.
3. **Bạo Tẩu** (học cấu trúc game gốc, không chép):
   - báo trước 0,1–0,3 s: đạn dày lên hoặc đổi dáng;
   - bung 0,15–0,3 s;
   - **suốt lúc Bạo Tẩu đạn đổi dáng** và có **một hiệu ứng phụ lặp lại** (vệt chém, tia, lông lửa…);
   - thu 0,2 s.
4. **Không đổi sát thương / DPS** ở đợt này: chỉ đổi hình, nhịp và cách tỏa. Nếu đổi nhịp bắn thì giữ nguyên DPS.
5. Không chép hình đạn của game gốc. Không chữ.

## Trả về: bảng 13 dòng (chưa vẽ)
| Tàu | Đạn chính (dáng, nhịp, hướng) | Lên bậc Thường → SS | Đạn khi Bạo Tẩu | Hiệu ứng phụ khi giữ Bạo Tẩu | Hiệu ứng trúng đích | Cần GPT vẽ (danh sách hình, cỡ) / Claude vẽ bằng mã |
|---|---|---|---|---|---|---|

**Gợi ý cột cuối:**
- **GPT vẽ**: hình đạn nhỏ **trắng / xám** (để game tô màu theo bậc), tối đa 128 × 128, tối đa 4 khung.
- **Claude vẽ bằng mã**: tia, cung, vệt sáng, hạt, sét nhỏ.

## Thêm: cánh bung tàu 1
Thân tàu 1 giữ nguyên, nên tàu 1 vào danh sách vẽ cánh bung luôn. Khung `tau1_than_bao_tau.png` và `tau1_vien_6_bac.png` ở trong gói. Ý tưởng theo bảng: cánh phượng lửa plasma, bảng màu đã chỉnh, nộp ảnh (a) + (b).
