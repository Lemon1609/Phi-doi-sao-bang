# PHẦN E — THIẾT KẾ LẠI HỢP THỂ TRANG BỊ VÀ VẬT PHẨM · Phi Đội Sao Băng

Chào Gemini. Bạn đã chốt kỹ năng và nội tại cho 39 món (`ky_nang_39_chot.json`, gửi kèm). Cả 39 món đã được lập trình và đã có tranh riêng (`ICON_39_MON.png`).

Chủ dự án muốn **thiết kế lại toàn bộ hợp thể**: cơ chế, số liệu và danh sách món SSS. GPT sẽ vẽ tranh theo thiết kế của bạn.

Bạn làm **2 bước**:
1. Gửi **bảng tổng quan** để Claude và chủ dự án duyệt.
2. Duyệt xong mới gửi **JSON chi tiết**.

---

## 1. Hiện trạng (trích từ mã game)

### 1a. Hợp thể trang bị (Xưởng SSS)
- **18 món SSS, chỉ dùng Bộ 01–06.** Ghép **2 món cùng loại liền kề theo vòng**:
  - giáp: aegis→mirror→orbital→phase→reactive→nanite→aegis;
  - tên lửa: inferno→cryo→thunder→singularity→spiral→stellar→inferno;
  - vũ khí phụ: rail→disc→solar→gravity→ricochet→prism→rail.
- **Điều kiện:** có cả 2 món mẹ, cả hai ≥ +1. **Món mẹ được giữ lại.** Chỉ tốn lượt hợp thể, không tốn tài nguyên.
- **SSS chỉ hoạt động khi đang lắp 1 trong 2 món mẹ ở ô đó.**
- **Cường hóa SSS** = 2 × min(cường hóa 2 món mẹ), tối đa +10.
- **Chỉ số:**
  - vũ khí SSS: hỏa lực ×1,35 × (1 + 3% mỗi cấp cường hóa SSS);
  - giáp SSS: máu và khiên của giáp ×1,35 × (1 + 3%/cấp), chạy **cả 2 nội tại** của 2 giáp mẹ.
- **Mỗi SSS** có nội tại = ghép tên 2 nội tại mẹ, 1 kỹ năng, 1 dạng Bạo Tẩu và 1 **Tuyệt kỹ** (khi Bạo Tẩu).
  - Danh sách 18 món hiện có ở mục 4.
- **Bộ 07–13 (21 món) chưa có công thức hợp thể nào.**

### 1b. Hợp thể vật phẩm
- **Nguyên liệu** (Hợp Kim, Tinh Thể, Mạch, Sợi Plasma × 3 màu Lục / Lam / Tím): ghép 3 → 1 lên màu cao hơn (Lục→Lam 200 ◈, Lam→Tím 600 ◈).
- **Đá khảm:** 5 phẩm Trắng / Lục / Lam / Tím / Cam, cùng 4 loại đặc biệt α β Ω Σ (chỉ ở phẩm Lam trở lên). Hiện **chưa có cơ chế ghép đá**.
- **Tinh Hạch Siêu Việt** (sss_core): chỉ dùng nâng sao robot hợp thể của chiến cơ (10→140 viên mỗi sao). Rơi từ ải > 160 và Nhật Thực.
- **Phôi trang bị:** 3 Trắng→1 Lục · 3 Lục→1 Lam · 3 Lam→1 Tím.

### 1c. Thang sức mạnh và ngân sách (giữ nguyên)
- **Máu người chơi** ≈ 9,5, **giáp** ≈ 5,2; mỗi đòn trừ 0,9 → 1,5; khoảng 10 đòn là chết.
- **Vũ khí:** đánh 1 mục tiêu (boss) giữ trong ±8% so với ngân sách. Lợi thế riêng nằm ở đông quái, khống chế, phòng thủ. Đông quái tối đa khoảng 2× đơn mục tiêu.
- **Giáp cấp 5** cứu 1,5–2,5 đòn ở mức 6 đòn/phút và 5–7 đòn ở mức 20 đòn/phút.
- **Trang bị chỉ chiếm khoảng 1–5% tổng sát thương**; đạn chính của chiến cơ chiếm phần lớn. Hiệu ứng "tăng sát thương nhận vào" chỉ nhân sát thương trang bị, không thành buff toàn đội.

### 1d. Quyết định đã khóa (không được đổi)
- Không tiền thật, **không thêm nguồn kim cương**, không đổi khóa lưu `saobang-*`, buff không hết hạn, không phôi mới.
- **Trong trận:** chỉ thấy chiến cơ, khiên tròn, **2 tàu con vũ khí phụ**; giáp và tên lửa ẩn hình (chỉ hiện hiệu ứng).
- **Không vòng tròn hay vành** quanh tàu và quái. Không chữ nổi giữa trận (chỉ có thông báo boss).
- Tham khảo game gốc Chiến Cơ Huyền Thoại: chỉ lấy cảm hứng, không sao chép.

---

## 2. Yêu cầu thiết kế

**A. Phạm vi và công thức.** Đề xuất bộ công thức SSS **phủ cả 13 bộ**.
- Ràng buộc tranh: GPT vẽ khoảng 11–15 tệp cho mỗi món SSS. **Tổng số SSS nên 18–27 món** (không phải 39 × 2).
- Có thể dùng trường `pair` trong `ky_nang_39_chot.json` (bạn đã đề xuất cặp ghép đẹp cho từng món).
- Nói rõ: giữ vòng 6 món cũ hay thay toàn bộ; ghép cùng bộ hay khác bộ; có ghép giữa Bộ 01–06 và Bộ 07–13 không.

**B. Điều kiện và chi phí.**
- Nên dùng **Tinh Hạch Siêu Việt** và nguyên liệu Tím làm chi phí, cho Tinh Hạch có thêm chỗ dùng. Có giữ "món mẹ được giữ lại" không?
- SSS lên cấp thế nào: cường hóa 2 × min như cũ, hay đi theo thang phẩm chất 4 khung màu (Trắng→Tím+5) như món thường?

**C. Cơ chế của mỗi SSS.**
- Nội tại SSS phải là **một cơ chế hợp nhất mới** từ 2 món mẹ, không chỉ chạy song song 2 nội tại. Ví dụ: băng + lửa → "nứt giáp do sốc nhiệt" (quái vừa chậm vừa cháy thì nổ vỡ).
- Kèm 1 kỹ năng, 1 dạng Bạo Tẩu, 1 Tuyệt kỹ. Tuyệt kỹ phải **khác nhau giữa các SSS** (hiện 18 tuyệt kỹ khá giống nhau: quét màn, xóa đạn).
- Số liệu cấp 1→5 theo đúng ngân sách ở mục 1c:
  - vũ khí SSS: đơn mục tiêu ≈ 1,35× món thường;
  - giáp SSS cứu thêm bao nhiêu đòn.
- Đánh dấu `[MỚI]` cho cơ chế cần mã mới.

**D. Hợp thể vật phẩm.**
- **Ghép đá khảm:** 3 → 1 cùng phẩm? Có tỉ lệ thất bại không (khuyến nghị không)? Có rèn đá đặc biệt α β Ω Σ từ đá thường không?
- **Đổi Tinh Hạch Siêu Việt** (sss_core) ↔ nguyên liệu Tím có nên có không.
- Giữ kinh tế: **không tạo nguồn kim cương**, không làm trôi giá Chợ Đen.

**E. Mô tả tranh cho GPT.** Mỗi SSS ghi:
- **"bộ phận đặc trưng" của 2 món mẹ được ghép** (dùng trường `part` trong JSON chốt). Ví dụ: cụm 3 đầu đạn lửa của inferno + đầu đạn rocket cánh đuôi của cryo.
- Màu chủ đạo.
- Gợi ý 3 dạng icon: tiến hóa phải **đổi khối**, không chỉ đổi màu.
- **Vỏ giáp SSS dạng hở**, không phải vòng tròn kín.

---

## 3. Định dạng trả về

**Bước 1: bảng tổng quan** (gửi trước). Mỗi dòng một SSS:

| mã SSS | loại | món mẹ A + B | tên | nội tại hợp nhất (1 câu) | tuyệt kỹ (1 câu) | bộ phận ghép cho tranh |
|---|---|---|---|---|---|---|

Kèm:
- quy tắc mục B (điều kiện, chi phí, lên cấp);
- quy tắc hợp thể vật phẩm mục D.

**Bước 2: JSON** (sau khi duyệt), mảng các phần tử:

```json
{"id":"sss_…","kind":"armor|missiles|sidearm","parents":["a","b"],"name":"…",
 "cost":{"sss_core":0,"mats":{"alloy3":0},"credits":0},
 "trait":{"name":"…","ho":"họ cơ chế","lv":[{"lv":1,"desc":"…","value":0}, "… đến lv 5"]},
 "skill":{"name":"…","cooldown":0,"effect":"…","new":false},
 "super":{"name":"…","effect":"…"},
 "ult":{"name":"…","duration":0,"effect":"…","new":false},
 "budget":{"singleDPSvsBase":1.35,"crowdMax":2.0,"savesAt6":0,"savesAt20":0},
 "art":{"partsFrom":["phần của a","phần của b"],"color":"#…","icon3":"mô tả 3 dạng","note":"…"}}
```

Ngoài ra một khối `"items_fusion"` cho mục D (ghép đá, quy đổi Tinh Hạch).

---

## 4. Danh sách 18 SSS hiện có (để tham khảo, có thể thay)

| mã | món mẹ | tên | tuyệt kỹ |
|---|---|---|---|
| sss_aegis_mirror | aegis+mirror | Thành Kính Thiên Vệ | THIÊN THÀNH VẠN KÍNH |
| sss_mirror_orbital | mirror+orbital | Kính Hoàn Tinh Chủ | VẠN KÍNH TINH HÀ |
| sss_orbital_phase | orbital+phase | Hư Không Tinh Vệ | VÔ ẢNH TINH HOÀN |
| sss_phase_reactive | phase+reactive | Huyễn Long Viêm Đế | HƯ LONG PHẦN THIÊN |
| sss_reactive_nanite | reactive+nanite | Long Mạch Tái Sinh | LONG MẠCH BẤT DIỆT |
| sss_nanite_aegis | nanite+aegis | Sinh Mạch Thiên Thành | TRƯỜNG SINH THÀNH LŨY |
| sss_inferno_cryo | inferno+cryo | Băng Hỏa Song Long | BĂNG HỎA PHÁ THIÊN |
| sss_cryo_thunder | cryo+thunder | Băng Lôi Thiên Kiếp | HÀN LÔI VẠN KIẾP |
| sss_thunder_singularity | thunder+singularity | Lôi Uyên Thiên Phạt | LÔI UYÊN DIỆT GIỚI |
| sss_singularity_spiral | singularity+spiral | Uyên Long Hồi Không | HƯ UYÊN LONG QUYỂN |
| sss_spiral_stellar | spiral+stellar | Tinh Long Vạn Vũ | TINH LONG VẠN TIỄN |
| sss_stellar_inferno | stellar+inferno | Tinh Viêm Nhật Vũ | VẠN TINH THIÊU THIÊN |
| sss_rail_disc | rail+disc | Nguyệt Lôi Thiên Nhận | NGUYỆT LÔI VẠN TRẢM |
| sss_disc_solar | disc+solar | Nhật Nguyệt Luân Hoàng | NHẬT NGUYỆT ĐỒNG THIÊN |
| sss_solar_gravity | solar+gravity | Nhật Uyên Thần Pháo | NHẬT UYÊN THÔN THIÊN |
| sss_gravity_ricochet | gravity+ricochet | Huyền Lăng Trọng Đế | VẠN CHIẾT HƯ UYÊN |
| sss_ricochet_prism | ricochet+prism | Lục Lăng Băng Đế | BĂNG LĂNG VẠN QUANG |
| sss_prism_rail | prism+rail | Hàn Quang Điện Hoàng | CỰC QUANG ĐIỆN NGỤC |

**Tệp gửi kèm:**
- `ky_nang_39_chot.json`: nội tại, kỹ năng, `part`, `pair` của 39 món;
- `ICON_39_MON.png`: tranh 39 món hiện tại.
