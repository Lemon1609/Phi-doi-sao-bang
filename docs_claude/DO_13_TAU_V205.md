# ĐO SÁT THƯƠNG THẬT 13 CHIẾN CƠ · V205 bước B1

Phi Đội Sao Băng · Claude · 08/11/2026.

## Cách đo
- Tài khoản mẫu ải 200, mọi tàu bậc SS, trang bị Tím +5, không VKTT.
- Bot bám cánh boss. Mỗi tàu đo 3 lần × 25 giây, lấy trung vị.
- Thước đo: **máu boss mất thật mỗi giây**, tính bằng lõi + hai cánh.
- Đo trên **2 boss**: ải 200 và ải 160.

> **Sửa số cũ:** ở báo cáo trước, số "máu mất thật" bị đếm **gấp đôi**, vì `boss.hp` đã là tổng lõi + cánh mà mình cộng thêm lần nữa. Tàu #10 thật ra là **2.650/s**, không phải 5.301/s; tàu #13 là ~1.350/s. Tỷ lệ giữa các tàu không đổi, nên kết luận "#13 ≈ ½ #10" vẫn đúng.

## Kết quả

| Tàu | Boss ải 200 /s | Boss ải 160 /s | **Trung bình nhân** | So với #10 |
|---|---|---|---|---|
| #1 Phượng Hoàng | 3.240 | 4.142 | **3.663** | 1,38× |
| #2 Cực Quang | 7.541 | 6.357 | **6.924** | **2,61×** |
| #3 X-Dực | 4.185 | 2.249 | **3.068** | 1,15× |
| #4 Thần Ma | 5.445 | 5.044 | **5.241** | **1,97×** |
| #5 Thự Quang | 3.234 | 3.607 | **3.415** | 1,29× |
| #6 U Linh | 3.577 | 3.739 | **3.657** | 1,38× |
| #7 Đao Phong | 5.231 | 4.419 | **4.808** | **1,81×** |
| #8 Phần Thiên | 2.605 | 4.901 | **3.573** | 1,34× |
| #9 Thiên Khung | 2.691 | 5.086 | **3.699** | 1,39× |
| #10 Tinh Hà | 2.664 | 2.651 | **2.657** | 1,00× |
| #11 Thôn Tinh | 3.737 | 3.999 | **3.866** | 1,45× |
| #12 Thời Không | 1.597 | 1.633 | **1.615** | **0,61×** |
| #13 Hư Không | 1.350 | 1.958 | **1.626** | **0,61×** |

## Nhận xét

1. **Giả định của Gemini "tàu #10 = 1,15× nhóm I" không đúng.** Thực tế #10 thuộc nhóm **yếu**: 9 tàu đầu đều mạnh hơn #10 từ 1,15× đến 2,61×.
2. **Mạnh vượt trội:** #2 Cực Quang (tia quét trúng cả hai cánh cùng lúc), #4 Thần Ma, #7 Đao Phong.
3. **Yếu rõ:** #12 và #13 (0,61× #10). #10 cũng yếu so với mặt bằng chung.
4. **Phụ thuộc boss:** #3, #8, #9 chênh nhau tới 2 lần giữa boss 160 và boss 200, do hình dạng boss và vị trí cánh. Vì vậy Claude dùng trung bình nhân của 2 boss.

## Hai phương án hệ số (nhân vào sát thương mỗi loạt đạn của từng tàu)

| Tàu | Mục tiêu Gemini | **(1) Neo #10 = 1,00 (đúng chữ Gemini)** | **(2) Neo trung vị (Claude đề xuất)** |
|---|---|---|---|
| #1 | 0,87 | ×0,63 | ×0,92 |
| #2 | 0,83 | **×0,32** | **×0,46** |
| #3 | 0,85 | ×0,74 | ×1,07 |
| #4 | 0,90 | **×0,46** | **×0,66** |
| #5 | 0,84 | ×0,65 | ×0,95 |
| #6 | 0,91 | ×0,66 | ×0,96 |
| #7 | 0,93 | ×0,51 | ×0,75 |
| #8 | 0,96 | ×0,71 | ×1,04 |
| #9 | 0,96 | ×0,69 | ×1,00 |
| #10 | 1,00 | ×1,00 | **×1,45** |
| #11 | 1,04 | ×0,71 | ×1,04 |
| #12 | 1,08 | **×1,78** | **×2,58** |
| #13 | 1,14 | **×1,86** | **×2,70** |

### Phương án (1): giữ #10 làm neo
- **11/13 tàu bị giảm 26–68%.** Toàn bộ game yếu đi rất nhiều.
- Phải tăng tốc độ hạ boss ở mọi chương bằng cách giảm máu boss diện rộng.
- Claude **không khuyến nghị**.

### Phương án (2): neo theo trung vị
Giữ nguyên mặt bằng sức mạnh chung, chỉ kéo các tàu lệch về đúng tỷ lệ Gemini.
- Giảm mạnh: #2 (−54%), #4 (−34%), #7 (−25%).
- Tăng mạnh: #10 (+45%), #12 (+158%), #13 (+170%).

### Ảnh hưởng tới các ải đã cân
Cân bằng chiến dịch (BAL191) đo bằng một tàu chuẩn cho mỗi mốc ải:

| Ải | Tàu chuẩn | Thời gian hạ boss sau (2) |
|---|---|---|
| 40 | #2 | **chậm ~2,2 lần** |
| 80 | #4 | chậm ~1,5 lần |
| 120 | #7 | chậm ~1,3 lần |
| 160 | #10 | nhanh hơn ~1,45 lần |
| 180 | #12 | nhanh hơn ~2,6 lần |
| 200 | #13 | nhanh hơn ~2,7 lần |

Để thời gian hạ boss không đổi, Claude đề xuất **nhân máu boss mỗi mốc ải theo đúng hệ số của tàu chuẩn ở mốc đó**:
- ải 40 ×0,46 · ải 80 ×0,66 · ải 120 ×0,75 · ải 160 ×1,45 · ải 180 ×2,58 · ải 200 ×2,70;
- nội suy giữa các mốc;
- sau đó đo lại bằng bot cho thời gian hạ boss 22–26 giây.

Khi đó tàu chuẩn giữ nguyên trải nghiệm, còn các tàu khác về đúng tỷ lệ.

## Bước A (trang bị theo bậc tàu) đã viết mã, đang tắt chờ bước B
- Trang bị ×1,00 / ×2,20 / ×3,90 theo bậc tàu.
- Bù máu boss ải 100–139 ×1,10, ải 140–170 ×1,15.

Bước A phải đo lại sau khi chốt bước B, vì tỷ trọng trang bị phụ thuộc đạn chính của từng tàu.
