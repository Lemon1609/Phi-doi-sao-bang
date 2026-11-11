# V229 · THIẾT KẾ LẠI TOÀN BỘ 13 CHIẾN CƠ (gửi GPT vẽ, gửi Gemini phần cơ chế)

Chủ dự án (23:00, 11/11): **thiết kế lại toàn bộ tàu**, tham khảo thiết kế, cơ chế nâng cấp, đạn, kỹ năng của game trong hai video (86538, 86543), **thay đổi một số chi tiết** để thành tàu của mình. Bản này thay các mục 3A–3D cũ của prompt V225 khi vênh nhau. Bảng màu theo bậc dùng **bảng V227** (đã đo đạt).

## 1. Học gì từ video (chỉ phần nhìn thấy)

| Điều thấy trong video | Áp vào game mình |
|---|---|
| Mỗi dòng tàu có **4 hình thái** đổi tên ở cấp 25 / 30 / 45 / 75; giữa các hình thái có +1…+5 | 6 bậc `thuong / luc / lam / tim / tim5 / ss` = 6 hình thái; mỗi bậc **đổi dáng rõ** (không chỉ thêm chi tiết nhỏ) |
| Mỗi hình thái **đổi nhóm màu** (Đao: lơ trắng → lục → tím → vàng đỏ; Đột Kích: lam → lam đậm → ngọc → tím) | Đổi cả giáp và đèn theo bảng V227 |
| Thân thon, gọn, nhỏ trên màn hình; mũi nhọn, buồng lái / lõi sáng rõ | Cỡ trong trận giữ như hiện tại; mỗi tàu một **điểm sáng nhận diện** (lõi, buồng lái) |
| Cánh / lưỡi hai bên **phát sáng mảnh**, tách khỏi thân bằng bệ ngắn | Cánh năng lượng kiểu tàu 7 V223 (chủ dự án đã chọn), dáng cánh theo từng tàu |
| Đạn chính: Đao bắn **một tia mảnh liên tục**; Đột Kích bắn **5→9 viên giọt song song**, màu theo hình thái | Đạn chính đổi **màu theo bậc** và **dày dần** theo bậc |
| Kỹ năng định kỳ: Đao vung lưỡi bắn **vệt chém cung** rồi bung **quạt năng lượng lớn** sau lưng 2–3 giây; Đột Kích có đợt **lửa bùng** | Bạo Tẩu: bung **cánh năng lượng theo dáng tàu** + đòn đặc trưng; màu theo bậc |

**Không lấy**: tên, dáng tổng thể, tổ hợp màu và dấu hiệu riêng của từng tàu trong video (đuôi hai gai chẻ, lưỡi dựng đứng gắn bệ vuông, thân tím cánh sọc vàng chữ V, buồng lái hổ phách + mũi bạc…). Dáng gốc của 13 tàu vẫn là của game mình (cột "Dáng" ở mục 3).

## 2. Chuẩn vẽ chung (mọi tàu)

1. PNG RGBA 512×512, nền trong suốt, nhìn thẳng từ trên xuống, mũi hướng lên, đối xứng. Cỡ căn(rộng × cao): thường 345 · lục 355 · lam 368 · tím 380 · tím+ 392 · SS 405 px; cạnh dài ≤ 456 px; lề ≥ 28 px. Rộng / cao 0,8–1,2.
2. **Thân giữa thon, cơ khí công nghệ cao**: giáp nhiều lớp cạnh vát, mảng tối xen mảng màu, đường chia tấm mảnh, mạch LED mảnh, khớp và trục lộ ở vai; một **lõi sáng** dễ thấy.
3. **Cánh năng lượng / tinh thể phát sáng** (như tàu 7 V223): lưỡi cắt sáng gần trắng, sống cánh đậm màu đèn của bậc, vân sáng chạy dọc, mép sắc; nối thân bằng tay đòn / bệ phát có khớp. **Dáng cánh theo từng tàu** (bảng mục 3).
4. Đọc rõ ở 64–100 px. Không chữ, logo, nền; **không** đạn, vệt chém, lửa động cơ, quầng, vòng tròn quanh tàu trong tranh thân.
5. **6 bậc = 6 hình thái**: mỗi bậc thay đổi dễ thấy ở dáng (thêm lớp cánh, dài mũi, thêm bệ pháo…), cùng họ tàu.
6. **Bạo Tẩu (`_bt`)**: dựng trên chính bản thường cùng bậc (thân giữa giữ y nguyên), cánh tách lớp / xòe theo dáng tàu; diện tích 1,25–1,35 lần; cạnh dài tới 480 px.

## 3. 13 tàu: dáng, cánh, tiến hóa, đạn, Bạo Tẩu

Đạn và kỹ năng ghi ở đây là **hình ảnh**; số liệu (sát thương, hồi chiêu) giữ nguyên trong game cho đến khi Gemini đề xuất và chủ dự án duyệt (mục 5).

| Tàu | Dáng thân (giữ) | Cánh năng lượng | Tiến hóa 6 bậc | Đạn chính (hình) | Bạo Tẩu (hình) |
|---|---|---|---|---|---|
| 1 Phượng Hoàng | Chim ưng, thân ngắn ngực rộng | Tầng phiến lông sáng xòe ngang | 1 tầng → 3 tầng lông, SS thêm đuôi lông dài | Đạn lửa giữa + đạn cong hai bên (đang có), dày dần | Đôi cánh lông lửa bung rộng, rơi hạt lửa |
| 2 Cực Quang | Thon, hai thanh ray dọc thân | Hai ray sáng vươn trước mũi | Ray dài dần, SS 4 ray | Tia quét mảnh song song | Màn cực quang dọc giữa các ray |
| 3 X-Dực Băng | Tinh thể lục giác | 4 cánh tinh thể băng chéo | Thêm mảnh tinh thể mỗi bậc | Mũi băng xuyên | Cánh băng nở thành tinh thể lớn |
| 4 Thần Ma | Mũi khoan dài | Hai cánh hộ vệ vát xuôi sáng axit | Mũi dài dần, thêm vòng khoan | Thương năng lượng nặng | Mũi khoan xoay, cánh xòe ngược |
| 5 Thự Quang | Thân ngắn, mâm quạt sau lưng | Nan quạt ánh sáng 2 → 5 nan | Thêm nan mỗi bậc | Chùm lăng kính tỏa quạt | Quạt mở hết vòng nửa trên |
| 6 U Linh | Thoi mảnh | Phiến lông vũ năng lượng dài về đuôi | Thêm phiến, dài dần | Tia zíc zắc mảnh | Phiến lông tách lớp, gợn như sương |
| 7 Đao Phong | Thân thon mũi gai, lõi kim cương | Hai lưỡi liềm năng lượng ôm vào thân (bộ V223) | 1 lưỡi → đao kép → 2–3 lưỡi lồng nhau | Lưỡi đao lớn dần khi bay (đang có); *đề xuất*: thêm tia đao mảnh liên tục giữa như video, chờ Gemini | Vung lưỡi bắn vệt chém cung, lưỡi tách thành nhiều phiến xòe |
| 8 Phần Thiên | Pháo hạm vai rộng | Phiến tản nhiệt sáng sau vai | 2 → 4 nòng | Đạn pháo nhiệt to | Bệ pháo mở, phiến tản nhiệt bung |
| 9 Thiên Khung | Hai lớp cánh | Cánh ngoài tách rời bằng năng lượng | Cánh ngoài lớn dần | Lông vũ dẫn đường | Hai lớp cánh tách xa, lông sáng rơi |
| 10 Tinh Hà | Tàu mẹ khung chữ H | Khung chiến thuật sáng vuông vức | Thêm khoang, thêm máy bay con | Đạn thẳng + tàu con | Khung mở rộng, đội tàu con xuất kích |
| 11 Thôn Tinh | Càng cua | Càng năng lượng kẹp trước mũi | Càng lớn, thêm răng sáng | Cầu xoáy | Càng mở rộng, lõi hút sáng |
| 12 Thời Không | Mảnh ghép rời quanh lõi | Mảnh cánh lơ lửng nối tia năng lượng | Thêm mảnh mỗi bậc | Đạn sóng sin đôi | Mảnh xoay quanh lõi chậm lại |
| 13 Hư Không | Vương miện, thân nứt hở lõi | Gai vương miện sáng | Thêm gai, khe nứt sáng hơn | Đạn tỏa + cột sáng (đang có) | Vương miện bung, khe nứt lan sáng |

## 4. Thứ tự làm

1. **Tàu 7 làm mẫu** (bộ đã có V223 + chuẩn mục 2): GPT vẽ lại ảnh chủ bậc tím → chủ dự án duyệt → 6 bậc + 6 Bạo Tẩu.
2. Tàu 8, 6, 2, 4, 10, 5, 3, 9, 1 (như mục 12.A cũ), rồi 11, 12, 13.
3. Mỗi tàu: ảnh chủ → duyệt → 12 tranh → Claude đo, ghép, chụp → duyệt → phát hành.
4. Đạn theo bậc: sau khi xong thân tàu, GPT vẽ bộ đạn mỗi tàu 6 màu theo bảng V227 (hoặc 1 bộ trắng để game tô màu).

## 5. Câu hỏi cho Gemini (cơ chế, số liệu)

Game hiện có cho mỗi tàu: đạn chính 4 cấp (số tia / viên tăng dần), kỹ năng Bạo Tẩu (bản thường và bản SS, hồi chiêu 13–15 s, kéo dài 1,2–3,2 s), 6 bậc tiến hóa. Nhờ Gemini đề xuất, **không đổi luật khóa** (không tiền thật, không nguồn kim cương mới, không đổi tên khóa `saobang-*`):
1. Có nên tách **6 bậc thành 4 hình thái + sao +1…+5** như game tham khảo không, hay giữ 6 bậc? Ưu – nhược với tiến độ người chơi hiện tại.
2. **Đạn chính đổi theo bậc**: ngoài màu, bậc nào tăng số tia / độ dày / xuyên? Đề xuất bảng 13 tàu × 6 bậc, giữ cân bằng V205.
3. **Kỹ năng định kỳ kiểu "vung lưỡi + bung quạt"**: có nên thêm một đòn tự động nhỏ (mỗi 6–8 s) tách khỏi Bạo Tẩu cho từng tàu không? Nếu có, hình thức và số liệu từng tàu.
4. Ảnh hưởng đến cân bằng boss, chip, hợp thể.
