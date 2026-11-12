Chào GPT, tàu 2, 6, 7, 8 đã xong đủ 6 bậc. Làm tiếp **tàu 3 X-Dực Băng**. Mẫu hướng bậc tím (thân bạc, 4 cánh tinh thể băng xòe chữ X, tay đòn có càng kẹp giữ gốc tinh thể) đã được chủ dự án chốt ở V231D.

## Gửi kèm
- `03_x_duc_bang.png`: mẫu đã chốt (nền tối).
- `tau3_tim_bt_claude_tach.png`: thân Bạo Tẩu Claude tách thử từ mẫu, 512 × 512. **Chưa sạch**: tay đòn và càng kẹp bị đứt đoạn vì lẫn với tinh thể. Chỉ dùng để xem tỉ lệ và vị trí.
- `tau3_fx_tt.png`: lớp 4 tinh thể thang xám, 1536 × 1536, tâm thân ở giữa, cùng tỉ lệ điểm ảnh với thân 512.
- `tau3_tach_xem.jpg`: ghép thử thân + tinh thể.
- `tau7_6bac_trong_tran.jpg`, `tau6_6bac.jpg`, `tau2_6bac.jpg`: cách các tàu trước lên bậc.

## 1. Hai thân bậc tím sạch (quan trọng nhất)
Vẽ lại đúng mẫu 03_x_duc_bang, **nền trong suốt, không có tinh thể**, cùng khung, vị trí và tỉ lệ với `tau3_tim_bt_claude_tach.png`:
- `tau3_tim_bt.png`: thân + đủ 4 tay đòn, khớp xoay và càng kẹp đang mở (đúng chỗ đang giữ gốc tinh thể trong mẫu).
- `tau3_tim.png` (lúc bay thường): **chính thân đó**, tay đòn gập sát thân, càng kẹp khép. Không vẽ lại thân giữa.

## 2. Mười tranh thân `tau3_{thuong,luc,lam,tim5,ss}.png` và `_bt`
Vẽ ở **cùng tỉ lệ với `tau3_tim.png`**.

| Bậc | Thân thường | Bản Bạo Tẩu |
|---|---|---|
| thuong | Gọn nhất: thân giữa và mũi, cánh bên ngắn | **Chỉ 2 tay đòn trên** mở ra (bậc này chỉ bung 2 tinh thể, hình chữ V) |
| luc | Cánh bên dài hơn | 2 tay đòn trên, dài hơn bậc thường |
| lam | Gần đủ như bậc tím, gọn hơn | Đủ 4 tay đòn (chữ X) |
| tim5 | Như bậc tím + giáp vai và gai đuôi lớn hơn; cao ≤ 456 px | 4 tay đòn, càng kẹp lớn, thêm khớp phụ |
| ss | Mạnh nhất: giáp nhiều lớp, lõi lớn; cao ≤ 456 px, **tỉ lệ thân giống bậc tím+** (không vẽ dẹt ngang) | 4 tay đòn kép |

Bắt buộc:
- `_bt` = chính bản thường cùng bậc + tay đòn và càng kẹp mở ra; không vẽ lại thân giữa.
- Càng kẹp vẽ rõ, đầu càng hướng ra ngoài theo đường chéo chữ X (để Claude đo điểm gắn tinh thể).
- Lề ≥ 24 px; không vẽ tinh thể hay năng lượng trong tranh thân.

## 3. Lớp tinh thể thứ hai `tau3_fx_tt_tang2.png` (cho tím+ và SS)
- Thang xám, 1536 × 1536, cùng hệ tọa độ với `tau3_fx_tt.png`.
- Thêm 4–6 mảnh tinh thể nhỏ, ngắn, mọc kề gốc 4 cánh chính hoặc xen giữa hai cánh cùng bên; có cạnh và mặt cắt như cánh chính.
- Không đè lên thân; không vòng tròn khép kín.
- Lưu ý: game vẽ lớp này kiểu **cộng sáng**, nên phần tối trong tinh thể sẽ thành trong suốt. Mặt cắt và cạnh phải sáng hơn nền rõ ràng.

## 4. Bảng màu 6 bậc (phương án C)
- Mỗi bậc một màu riêng; bậc thấp mờ, ít tinh thể; bậc cao rực, nhiều tầng; SS sáng nhất.
- Bậc tím giữ mẫu: thân bạc trắng; tinh thể trắng → lơ băng → lam sáng.
- Khác bảng các tàu 2, 6, 7, 8 (tàu 2 đã dùng hổ phách, bạc hà, hồng, vàng). Gợi ý của Claude, GPT chỉnh cho đẹp:

| Bậc | Giáp chủ | Đèn / LED | Tinh thể: lõi → thân → cạnh | Lớp 2 |
|---|---|---|---|---|
| thuong | xám thép | trắng sương | trắng đục → xám lơ → lơ nhạt (băng đục) | — |
| luc | bạc, xanh rêu nhạt | lục chanh | trắng → lục chanh nhạt → lục băng | — |
| lam | bạc, lam đậm | lam | trắng → lam ngọc bích → lam đậm | — |
| tim | bạc trắng | lơ băng | trắng → lơ băng → lam sáng (theo mẫu) | — |
| tim5 | bạc, tím than | tím hồng | trắng → tím oải hương → tím, ánh xà cừ | hồng tím nhạt |
| ss | bạc trắng, viền vàng kim | vàng kim | trắng kim cương → vàng nhạt, cạnh ánh cầu vồng mảnh | trắng vàng |

## 5. Nộp
Một zip `V235_TAU3_DU_BAC.zip`:
- `tau3_tim.png`, `tau3_tim_bt.png` sạch;
- 10 PNG thân;
- `tau3_fx_tt_tang2.png`;
- bảng màu;
- ảnh ghép 6 bậc × 2 hàng.
