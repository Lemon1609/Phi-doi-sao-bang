# Phân tích hiệu ứng Bạo Tẩu, đạn, kỹ năng trong video game gốc · và cách làm bằng mã (00:00, 12/11)

Xem từng khung hình (6 khung / giây) các đoạn bung kỹ năng của 6 dòng: 刀锋 (86543, 23,3–26 s), 怒火凤凰 (86540, 45–47,6 s), 冰河零式 (86544, 3,6–6,2 s), 残光掠影 (86548, 8–10,6 s), 曙光 (86542, 6,5–9 s), 守望零式 (86545, 5–7,6 s). Chỉ ghi điều nhìn thấy.

## 1. Cấu trúc chung một lần bung

| Pha | Thời gian (ước) | Thấy gì |
|---|---|---|
| Báo trước | 0,1–0,3 s | Đạn chính đổi dáng hoặc dày lên; tàu chưa đổi |
| Bung | 0,15–0,3 s | Hình năng lượng lớn **bật ra từ thân** (phóng to nhanh từ nhỏ đến đủ cỡ) |
| Giữ | 1,5–3 s | Hình lớn giữ dáng, **đập nhẹ** (co giãn vài %), sáng nhấp nháy; hiệu ứng phụ lặp lại (vệt chém, tia, hạt) |
| Thu | 0,2 s | Mờ dần, trở lại đạn thường |

Mọi hình đều **cộng sáng** (trong mờ, sáng ở lõi và mép), màu theo hình thái của tàu.

## 2. Từng dòng

| Dòng | Đạn chính | Hình bung (Bạo Tẩu) | Hiệu ứng phụ khi giữ |
|---|---|---|---|
| 刀锋 (Đao) | Một tia mảnh liên tục từ mũi | **Đôi cánh năng lượng lớn trong mờ** tím hồng có **vân tinh thể**, ôm hai bên từ vai xuống đuôi | **Vệt chém cung lơ** quét từ hai bên lên trên, lặp khoảng 3 lần / giây; tia sét nhỏ quanh lưỡi |
| 怒火凤凰 (Phượng) | Nhiều luồng lửa cam song song | **Chùm lông lửa vàng** tỏa nan quạt ra mọi phía phía sau tàu, bật ra rất nhanh | Luồng lửa phía trước dày lên |
| 冰河 (Băng) | Hai tia trắng song song | Đạn **tách thành quạt 8–10 tia** xòe rộng; **cánh tinh thể băng** xòe dưới thân | Sương băng ở chân tàu |
| 掠影 (Bóng) | Quạt tia mờ | **Bản sao bóng mờ** của tàu xuất hiện bên cạnh, nhấp nháy, nhiễu sọc | Bóng mờ dịch chuyển |
| 曙光 (Thự Quang) | Quạt kim lục tán xạ | **Chùm gai tinh thể** bùng quanh thân | Quạt kim dày hơn |
| 守望 (Tinh Hà) | Tên lửa nhiều hàng | **Cung khiên lơ** nửa trên quanh tàu, tàu con hai bên | Tên lửa bắn liên tục |

## 3. Game mình làm tương tự được không: **được**

Bộ máy Bạo Tẩu hiện có (`src/btfx218.js`) đã vẽ lớp sau và trước thân, cộng sáng, đổi dáng theo nhịp, tô màu theo đèn. Cần thêm:

| Thành phần | Cách làm | Ai làm |
|---|---|---|
| Hình bung lớn (cánh, quạt lông, cánh hoa, khiên) | Tranh **trắng / xám**, mỗi tàu 1–3 tệp; mã tô màu theo bậc, **phóng to bật ra** 0,2 s, **đập** khi giữ, mờ khi thu | GPT vẽ, Claude làm chuyển động |
| Vệt chém cung, tia tỏa, hạt, sét nhỏ | **Vẽ bằng mã** (đường cung, dải sáng có chuyển màu), lặp theo nhịp | Claude |
| Đạn đổi khi Bạo Tẩu (tách quạt, dày lên) | Sửa hàm đạn từng tàu khi đang Bạo Tẩu | Claude (số liệu theo Gemini) |
| Bản sao bóng mờ | Vẽ lại tranh tàu lệch vị trí, trong mờ, nhấp nháy | Claude |
| Màu theo bậc | Đã có cơ chế tô màu theo đèn; thêm bảng (tàu, bậc) | Claude |

**Bản thử bằng mã cho tàu 7** (`demo_bao_tau_tau7.gif`): tia đao mảnh từ mũi; sau 0,3 s đôi cánh năng lượng trong mờ bật ra và đập nhẹ; vệt chém cung lơ quét hai bên lặp lại. Toàn bộ vẽ bằng mã, chưa có tranh GPT, nên nét còn thô; khi có tranh cánh năng lượng của GPT (vân tinh thể, trong mờ) sẽ đẹp như video.

## 4. Đề xuất triển khai

1. Khi GPT nộp bộ 12 tranh mỗi tàu, nộp thêm **1–3 tranh hình bung** (trắng / xám, nền trong suốt, 512×512, tâm trùng tâm tàu), theo cột "Hình bung" mục 2 và bảng gán V230.
2. Claude viết lớp **BUNG230** trong bộ Bạo Tẩu: bật ra, đập, thu; hiệu ứng phụ vẽ bằng mã theo từng tàu; màu theo bậc.
3. Làm mẫu trên tàu 7 trước, chụp ảnh động cho chủ dự án duyệt, rồi nhân cho 12 tàu còn lại.
4. Đạn đổi khi Bạo Tẩu và số liệu: nhờ Gemini (mục 5 của V229).
