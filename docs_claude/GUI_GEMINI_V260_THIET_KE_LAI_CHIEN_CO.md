# Gửi Gemini: góp ý và thiết kế lại toàn bộ 13 chiến cơ (thay tin V259 "sơn lại")

**Dán kèm:**
- `hien_tai/13_tau_bac_tim_thuong_va_bao_tau.jpg`
- `CAU_CHUYEN_13_CHIEN_CO.md`
- `tham_khao/phong_cach_1.png`, `tham_khao/phong_cach_2_canh_bung.png`, `tham_khao/tau4_mau_gemini.png`

---

Chào Gemini, Claude đây. Chủ dự án muốn nhờ bạn **góp ý và thiết kế lại cả con tàu** (dáng, khối, bộ phận, màu, chi tiết), không chỉ sơn lại. Mục tiêu:
- **tươi sáng, bắt mắt, thu hút, hấp dẫn** như dòng game bắn máy bay mobile mà game lấy cảm hứng (chỉ học phong cách, không chép tàu nào);
- mỗi chiến cơ **kể được câu chuyện riêng** của nó: xem `CAU_CHUYEN_13_CHIEN_CO.md`, gồm xuất xứ, chế tạo, thời điểm, lõi và truyện.

Hiện các tàu còn **u tối**. Claude đo độ sáng thân bậc Tím (0–255): tàu 4 là 58, tàu 11 là 60, tàu 6 là 72, tàu 13 là 80, tàu 8 là 85, tàu 7 là 91. Ảnh phong cách 1 khoảng 143.

## Luật chủ dự án đã chốt (bắt buộc)
1. **Khối dày**:
   - bản thường rộng/cao **0,8–1,05**;
   - **không chữ X**, không dáng tỏa tròn / ngôi sao, không thân que quá thon.
2. **Bạo Tẩu khác rõ bản thường**:
   - rộng/cao **1,25–1,6**, rộng ≥ 1,25 lần bản thường;
   - **giáp cứng mở ra ngoài viền thân** (cánh, vai, gai mở ra), thân giữa giữ nguyên.
3. **Sáng**:
   - độ sáng thân trung bình khoảng **120–150**;
   - mảng tối chỉ ở khe, họng động cơ (**≤ 20 %** diện tích);
   - giáp sáng, viền kim loại quý mảnh, đèn / ngọc / lõi rực, bóng phản chiếu.
4. **Bậc** (vẽ bậc Tím trước, các bậc khác làm sau):
   - Thường → Lục → Lam → Tím → Tím+ → SS: bậc cao lộng lẫy, hiện đại, công nghệ cao hơn;
   - bậc thấp không đơn sắc, cỡ ≥ 90 % bậc Tím;
   - đèn / neon / ngọc theo mã bậc: Thường trắng bạc, Lục lục, Lam lam, Tím màu riêng của tàu, Tím+ hồng tím, SS vàng kim.
5. **Mỗi tàu một dáng và một màu chủ riêng, không trùng nhau** (bảng màu năng lượng V256B là gợi ý màu chủ).
6. Không chữ, không logo, không dấu hình mờ (kể cả ✦). Nội dung phổ thông.
7. Đạn địch đỏ `#FF334F` / hồng `#F50057` phải luôn nhìn rõ trên nền và cạnh tàu.

## Bước 1 (làm ngay): góp ý + ý tưởng, chưa vẽ
Trả về **bảng 13 dòng**:

| Tàu | Bản hiện tại: mạnh / yếu | Ý tưởng thân mới (dáng, khối, 2–3 bộ phận đặc trưng lấy từ câu chuyện) | Màu thân (chính, phụ, viền, đèn) | Bạo Tẩu mở ra thế nào | Tiến bậc Thường → SS |
|---|---|---|---|---|---|

Ghi chú:
- **Tàu 4** là mẫu chủ dự án vừa thiết kế cùng bạn. Giữ ý chính, đề xuất bản **sáng hơn** và **Bạo Tẩu mở rộng hơn** (hiện Bạo Tẩu chỉ rộng hơn 1,02 lần).
- **Tàu 9 và 13** vừa được duyệt dáng. Có thể nâng cấp nhưng nên giữ ý chính (tàu 9: đài quan sát trắng ngọc trai, đĩa radar; tàu 13: đen gương + crôm, nhưng phải phản chiếu nhiều, sáng hơn).
- **Tàu 1** đang chờ thiết kế lại thân, bạn làm luôn.

## Bước 2 (sau khi chủ dự án duyệt bảng): vẽ từng tàu, bậc Tím
Mỗi tàu 2 ảnh, **nền đen**:
- `tauN_tim.png`: bản thường, vẽ trong `khung_co/khung_thuong_1024.png`. Tàu nằm giữa, **cạnh dài nhất chạm khung vuông nét đứt** (khoảng 730 px).
- `tauN_tim_bt.png`: Bạo Tẩu, vẽ trong `khung_co/khung_bao_tau_1400.png`.
  - **Cùng tỉ lệ** với bản thường: ô mờ ở giữa đúng bằng khung bản thường, thân giữa trùng đúng chỗ.
  - Phần mở ra nằm trong khung nét đứt lớn.

## Bước 3: cánh bung Bạo Tẩu
Duyệt thân xong, Claude dựng khung bung từ thân mới. Bạn vẽ năng lượng theo cách đã thống nhất ở V258:
- gốc ở lõi chung;
- nộp ảnh (a) có thân và ảnh (b) đã xóa thân.

Các tàu đổi thân thì cánh bung vẽ **sau** khi thân mới được duyệt.

## Bước 4: các bậc còn lại
10 ảnh mỗi tàu (Thường, Lục, Lam, Tím+, SS × thường / Bạo Tẩu), theo luật bậc ở mục 4.
