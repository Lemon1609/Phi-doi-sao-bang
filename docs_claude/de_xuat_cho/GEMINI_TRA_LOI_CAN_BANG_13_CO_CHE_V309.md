### A. MỐC ƯU TIÊN CÂN BẰNG (VÌ SAO KHÔNG THỂ GIỮ CẢ 3 KỊCH BẢN = 100%)

Các cơ chế nổ lan, mảnh vỡ, xuyên giáp và khúc xạ tự nhiên tăng sát thương theo số mục tiêu trên màn hình, nhưng không tăng (hoặc tăng rất ít) khi gặp 1 Boss đơn mục tiêu. Nếu ép **Bia 15 = 100%** chỉ bằng cách giảm mạnh `DK_mới` (như hạ Tàu 5 xuống `0,75` hay Tàu 3 xuống `0,83`), tàu đó sẽ bị thọt `17%–25%` sát thương khi đánh Boss — rất bất lợi cho mục tiêu 3 sao hạ Boss theo thời gian.

**Mốc ưu tiên đề xuất cho toàn dự án:**

1. **Ưu tiên 1 — 1 Boss đứng yên (đơn mục tiêu):** Giữ **`92% – 100%`** DPS gốc (không tàu nào bị dưới `90%`).
2. **Ưu tiên 2 — Bia 15 (đa mục tiêu chuẩn):** Giữ trong biên **`98% – 106%`** (nằm gọn trong sai số đo `±6%`).
3. **Ưu tiên 3 — Bầy quái thường dày đặc:** Cho phép nhóm chuyên dọn bầy (nổ lan, xuyên, khúc xạ) đạt **`110% – 120%`** *(ước lượng)* để đổi lại mốc Boss ở `90% – 96%`, tạo đúng vai trò chiến thuật của từng tàu.

---

### B. BẢNG `DK_mới` & THAM SỐ CƠ CHẾ ĐỀ XUẤT CHO 13 TÀU

Nguyên tắc: **Chỉnh tham số cơ chế trước** để kéo tỉ lệ Bia 15 về gần `1,00 – 1,12`, sau đó chỉ dùng **`DK_mới` nhẹ tay (`0,85 – 1,00`)** để không làm hụt sát thương đánh Boss.

| Tàu | Cơ chế mới | Tham số cũ $\rightarrow$ **Đề xuất chỉnh** *(thay vì ép DK)* | **`DK_mới` chốt** | Boss đơn *(ước lượng)* | Bia 15 *(ước lượng)* | Bầy quái dày *(ước lượng)* |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | Lông Vũ Lửa Lan | Nổ lan `35%` $\rightarrow$ **`30%`** (giữ bán kính `34 px`, `+14` quái to) | **`0,96`** | `96%` | `101%` | `112%–118%` |
| **2** | Laser liền cũ | Giữ nguyên | **`1,00`** | `100%` | `100%` | `100%` |
| **3** | Mảnh Băng Vỡ | 3 mảnh `25%` / `0,28 s` $\rightarrow$ **`18%` / `0,24 s**` *(giữ không tách trên Boss)* | **`0,92`** | `92%` | `103%` | `112%–116%` |
| **4** | Thương Xuyên Giáp | Thêm **suy hao theo lần xuyên**: mục tiêu 1 `100%` $\rightarrow$ 2 **`70%`** $\rightarrow$ 3 **`45%`** | **`0,98`** | `98%` | `101%` | `112%–118%` |
| **5** | Khúc Xạ Nảy | Nảy `40%`, tầm `150 px` $\rightarrow$ **`22%`**, tầm **`120 px`** *(giữ tối đa 2 lần)* | **`0,90`** | `90%` | `104%` | `112%–115%` |
| **6** | Khóa Mục Tiêu | Nón `30°`, quay `5,5 rad/s` $\rightarrow$ **`22°`**, quay **`4,0 rad/s`** | **`0,85`** | `95%–100%` | `100%` | `102%` |
| **7** | Trăng Khuyết | Giữ bán kính `×1,5` & chém đạn địch `≤ 7 px` | **`0,96`** | `96%–100%` | `100%` | `100%` |
| **8** | Hạt Nhân Mini | Nổ lan `50%` $\rightarrow$ **`35%`** (giữ bán kính `48 px`, `+14` quái to để giữ cảm giác nổ to) | **`0,96`** | `96%` | `98%–100%` | `115%–122%` |
| **9** | Tên Lửa Truy Đuổi | Giảm nhẹ tốc độ quay `7` $\rightarrow$ **`6,0 rad/s`** (vòng cung mượt hơn) | **`0,94`** | `98%–102%` | `98%` | `98%` |
| **10** | Hạm Đội Hộ Tống | Đổi vị trí `±62 px`, góc `15°` $\rightarrow$ **`±48 px`**, góc **`5,5°`** *(xem mục C)* | **`1,00`** | `100%` | `98%–102%` | `100%` |
| **11** | Cầu Hấp Dẫn | `95 px`, `70 px/s`, `0,3 s` $\rightarrow$ **`80 px`**, **`55 px/s`**, **`0,22 s`** + ICD *(xem mục D)* | **`0,96`** | `96%` | `96%` *(bia khóa)* | `102%–106%` |
| **12** | Đĩa Cưa | Giữ nguyên `62,5%` trúng + `37,5%` cưa trong `0,6 s` | **`1,00`** | `100%` | `102%` | `96%–100%` |
| **13** | Lốc Cắt Gió | Giảm biên độ sin `240` $\rightarrow$ **`150`** *(giữ hiệu ứng đan chéo, bớt trượt Boss)* | **`0,92`** | `92%–96%` | `99%` | `105%` |

**Giải thích nhanh 3 điểm chỉnh quan trọng nhất:**

* **Tàu 6 (`DK = 0,85`):** Khác với nổ lan/khúc xạ, đạn khóa mục tiêu kéo cả các viên rìa quạt đập trúng **Boss đơn mục tiêu**, nên hạ `DK` xuống `0,85` vẫn giữ DPS đánh Boss ở mức `95%–100%` *(ước lượng)* mà không bị thiệt.


* **Tàu 8 (`35%` thay vì `50%`):** Trên Bia 15 (bia cách nhau `70 px`), bán kính nổ `48 px + 20 px = 68 px` gần như không chạm bia kế bên nên số đo chỉ là `1,02`; nhưng vào ải thật khi quái dồn cách nhau `45–55 px`, mức `50%` sẽ vọt lên `1,45–1,60` *(ước lượng)*. Hạ xuống `35%` giúp giữ bán kính nổ to đẹp mắt mà vẫn an toàn khi dọn bầy.


* **Tàu 3 & Tàu 5:** Hạ sát thương mảnh/nảy thay vì ép `DK` xuống `0,83` và `0,75` giúp giữ DPS đánh Boss ở mức `90%–92%` (chơi thực chiến không bị cảm giác "tịt ngòi" khi gặp Boss).

---

### C. PHÂN TÍCH TÀU 10 (VÌ SAO LỆCH `0,91` & CÁCH SỬA)

**Đúng là do 2 viên chéo trượt bia** — có thể thấy rõ qua cả tính toán hình học lẫn ảnh chụp thực tế ở cột 5 (`T10 ho tong`):

* Với khoảng cách hộ tống `x = ±62 px` và góc bắn vào trong `15°` ($\tan 15^\circ \approx 0,268$), 2 tia đạn cắt nhau tại tâm ở khoảng cách chỉ `62 / 0,268 ≈ 231 px` ngay trước mũi tàu.


* Khi bay lên nửa trên màn hình (nơi đặt bia 15 hoặc Boss, cách tàu `450 – 700 px`), 2 tia đã giao nhau xong và **tỏa ngược ra hai bên từ `∓59 px` đến `∓125 px**`, lọt đúng khe trống giữa các cột bia (cột cách nhau `70 px`) hoặc trượt hẳn khỏi thân Boss.



**Cách sửa chuẩn (giữ `DK_mới = 1,00`):**

* Đưa 2 chiến cơ hộ tống vào gần nhẹ: `±62 px` $\rightarrow$ **`±48 px`**.
* Giảm góc bắn chéo vào trong: `15°` $\rightarrow$ **`5,5°`** ($\tan 5,5^\circ \approx 0,096$).
* Khi đó, điểm hội tụ nằm ở khoảng cách `48 / 0,096 ≈ 500 px` — đúng tâm khu vực Boss và giữa đội hình quái, biên độ lệch từ `300 px` đến `700 px` chỉ trong phạm vi `±19 px`, giúp tỉ lệ Bia 15 tự hồi về **`~0,98 – 1,02` *(ước lượng)*** mà không cần buff bù `DK`.

---

### D. TÀU 11 — CÁCH ĐO & THAM SỐ AN TOÀN CHO CẦU HẤP DẪN

Số đo dao động `2.700 – 11.700` xảy ra vì lực hút đang **kéo dịch chuyển chính 15 bia cố định**, làm bia dồn cục hoặc lệch khỏi luồng đạn một cách ngẫu nhiên.

1. **Cách đo chuẩn cho Claude:**
* **Bước 1 (Đo sát thương thuần):** Gắn cờ `immovable: true` (miễn nhiễm lực hút) cho 15 bia đo để xác nhận DPS thuần của đạn khớp `DK_mới`.
* **Bước 2 (Đo tác động thực chiến của lực hút):** Chạy kịch bản **20 quái thường có HP hữu hạn rơi theo đội hình** (chạy 3 lần lấy trung bình), so sánh tổng thời gian dọn sóng (`clear time`) giữa bật và tắt lực hút; mục tiêu là bật hút dọn nhanh hơn **`≤ 8%`**.


2. **Tham số an toàn & chống cộng dồn lực hút:**
* Giảm nhẹ vùng và tốc độ kéo: bán kính **`80 px`** (từ `95 px`), tốc độ hút **`55 px/s`** (từ `70 px/s`), thời gian **`0,22 s`** (từ `0,3 s`).


* **Khóa chống cộng dồn (bắt buộc):** Mỗi quái chỉ nhận **1 hiệu ứng hút tại một thời điểm** (không cộng dồn vận tốc khi trúng liên tiếp nhiều viên), thêm **ICD miễn nhiễm hút `0,4 s**` sau khi kết thúc kéo, **không hút Boss**, và **dừng kéo khi khoảng cách tới điểm hút `< 18 px**` để tránh quái chồng đè thành 1 điểm rồi ăn toàn bộ loạt đạn.
* Đặt **`DK_mới = 0,96`** để bù nhẹ lợi thế gom quái trong thực chiến mà vẫn giữ `96%` sức mạnh khi đánh Boss.



---

### Gợi ý kiểm tra nhanh sau khi Claude cập nhật

Chỉ cần chạy lại Bia 15 cho 5 tàu vừa đổi tham số mạnh nhất (**Tàu 3, Tàu 5, Tàu 6, Tàu 10, Tàu 13**) và xác nhận cả 5 đều rơi vào vùng **`0,95 – 1,06`** là có thể chốt luôn bản V309c.