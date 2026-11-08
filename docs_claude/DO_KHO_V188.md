# PHI ĐỘI SAO BĂNG · NGUỒN CHIẾN CƠ S/SS + CÂN BẰNG V188 (Claude, 02/11/2026)

Tiếp theo `DO_KHO_V187.md` và phản hồi của Gemini (01/11).

## 1. Việc C: người chơi không nạp lấy bậc S/SS từ đâu (quét mã game)
**Bậc S/SS của chiến cơ không lên bằng mảnh.** Muốn có bậc S/SS phải **nhận một bản chiến cơ bậc đó**, qua hai đường:

| Đường | Điều kiện / tỉ lệ | Ước lượng |
|---|---|---|
| **Rơi ngẫu nhiên** (Phó bản Trang bị từ ải 12, rương Vô tận từ ải 25) | Mỗi lượt quay: S 0,6–1,2%, SS 0–0,2%. Bảo hiểm 149 lượt thì chắc chắn ra S. Món rơi rút ngẫu nhiên từ **10 chiến cơ + 39 trang bị**, nên chỉ khoảng 20% là chiến cơ | Khoảng 700 lượt quay mới được 1 **chiến cơ** bậc S. Không nên tính vào lộ trình |
| **Lộ trình chắc chắn V79** (Thành tựu) | #6 bậc S: 330 sao **hoặc** Tháp tầng 25 · #7 bậc S: 390 sao hoặc mùa giải cấp 15 · #8 bậc SS: 450 sao hoặc 40 lượt vòng quay · #9 SS: Tháp tầng 32 hoặc huy hiệu · #10 SS: phá đảo ải 160 hoặc 1.000 mảnh Ấn Chú | Đường chính |

Quy đổi sao sang ải (tối đa 3 sao mỗi ải):
- **330 sao:** khoảng ải 110 nếu ải nào cũng 3 sao, khoảng ải 130 nếu trung bình 2,5 sao.
- **450 sao:** khoảng ải 150 / ải 180.

**Kết luận:** tường cũ (S ở ải 100, SS ở ải 140) đến **sớm hơn lộ trình chắc chắn 10–40 ải**. Bảng lực chiến mới của Gemini (dời yêu cầu SS sang ải 150–160) đi đúng hướng.

## 2. Đã áp vào V188 (số của Gemini)
- **Lực chiến đề nghị chiến dịch:**

  | Ải | 20 | 40 | 60 | 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 160 | 180 | 200 |
  |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
  | Đề nghị | 1.100 | 1.250 | 2.000 | 2.400 | 2.850 | 3.200 | 3.950 | 4.800 | 5.750 | 6.850 | 8.150 | 9.600 | 12.800 | 14.200 |

  Giữa các mốc thì nội suy. Nguyệt Thực giữ nguyên.
- **Máu boss:**
  - ải 20 ×1,8; ải 40 ×3,2; ải 60 ×4,0; ải 80 ×2,5;
  - mini-boss ải 10/30/50/70 nhận 60% mức tăng;
  - bảng boss ải 100 ×1,09; ải 120 ×0,69; ải 140 ×0,86.
- Tắt cả: `window.BAL188=false`.

## 3. Đo lại sau V188 (tàu bất tử, luôn đứng thẳng dưới boss = mức nhanh nhất)

| Ải | Tài khoản | Lực chiến / đề nghị | Hạ boss trước | Hạ boss sau | Mục tiêu Gemini |
|---|---|---|---|---|---|
| 20 | mới tinh | 904 / 1.100 (82%) | 19,6 s | 10,1 s | khoảng 22 s |
| 40 | mẫu, thường | 1.145 / 1.250 | khoảng 5 s | 11,0 s | 14–16 s |
| 80 | mẫu, thường | 2.318 / 2.400 | khoảng 8 s | 17,2 s ✓ | 18–20 s |
| 120 | mẫu, bậc S | 4.934 / 4.800 | 42,7 s | 25,7 s ✓ | khoảng 24 s |
| 140 | mẫu, **bậc S** | 6.134 / 6.850 (90%) | — | **91,9 s ✗** | khoảng 29 s |
| 140 | mẫu, bậc SS (V187) | 8.527 | 22,3 s | khoảng 19 s (ước) | khoảng 19 s |

## 4. Phát hiện quan trọng: lực chiến không phản ánh đúng sát thương
- Ở ải 140, tàu bậc S có lực chiến bằng **72%** tàu bậc SS, nhưng sát thương mỗi giây chỉ bằng **22%** (1.764 so với 8.053).
- Bậc chiến cơ (S → SS) mạnh lên khoảng ×4,5 về sát thương, trong khi chỉ số lực chiến chỉ tăng ×1,4.
- Hệ quả: người chơi bậc S thấy "đạt 90% đề nghị", nhưng đánh boss ải 140 mất khoảng 90 giây (bot), khoảng 150 giây chơi thật.

## 5. Cần quyết định

| # | Phương án | Hệ quả |
|---|---|---|
| D1 | Hạ máu boss ải 140 còn khoảng 90.000 (×0,47 so với gốc) | Bậc S khoảng 50 s (bot), bậc SS khoảng 11 s |
| D2 | Giữ ải 140 là tường bậc SS, nhưng dời ngưỡng lộ trình V79: #8 SS từ 450 sao xuống 390 sao (khoảng ải 130–150) | Đúng tinh thần "tường có lối thoát chắc chắn" |
| D3 | Sửa công thức lực chiến để bậc chiến cơ nặng hơn (gần ×4,5 thật) | Đúng gốc rễ nhưng làm đổi mọi con số lực chiến, phải đo lại toàn bộ. Nên giao Gemini thiết kế |

Claude đề xuất: **D2 ngay**. Đồng thời gửi D3 cho Gemini thiết kế; khi xong D3 thì bỏ được D1.
