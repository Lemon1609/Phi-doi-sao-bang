# ĐỊNH HƯỚNG MỸ THUẬT · V212C · SỬA SAU ĐỢT MẪU 01 / 07 / 11

Gửi GPT. Đợt 2 đã có dáng riêng (Phượng Hoàng lửa, lưỡi liềm sét, hố đen, Mecha): tiến bộ rõ. Chủ dự án nhận xét:

> "Thiết kế chiến cơ vẫn chưa được đẹp, nịnh mắt. Robot… không cần thiết tiến hóa sẽ màu vàng, mà sẽ thể hiện theo đặc trưng từng chiến cơ, trang bị, robot."

## 1. Vì sao chưa "nịnh mắt" (Claude đối chiếu ảnh tham khảo)

| Vấn đề ở đợt 2 | Cách sửa |
|---|---|
| **Thân quá tối:** đen / tím than / đỏ thẫm, bị chìm trên nền navy, nhìn nặng | Nền giáp **sáng**: trắng bạc, bạc lam, trắng ngà, hoặc màu sáng của tàu. Phần tối chỉ dùng làm khe, rãnh, viền mảnh. **Tối đa 25% diện tích là màu tối** |
| **Rối mắt:** gai nhọn dày đặc khắp thân và cánh | Ít chi tiết hơn: **mặt giáp lớn, phẳng, bóng** + vài đường gân năng lượng sạch. Gai chỉ ở 2–4 điểm nhấn |
| **Siêu cấp nặng nề:** cánh vẽ như giáp gai cứng | Năng lượng **trong suốt, phát sáng**: pha lê trong, cánh ánh sáng, lửa plasma mềm, dải sáng. Có độ trong (thấy mờ phía sau), mép sáng, lõi trắng |
| **Ánh sáng phẳng** | Đèn viền (rim light) màu năng lượng; điểm bóng trắng trên giáp; động cơ phát sáng mạnh; quầng sáng mềm phía sau tàu |
| **Bóng hình kém đẹp ở cỡ nhỏ** | Thử thu nhỏ còn 64 px: phải đọc được dáng, và có **1 khối màu nhấn lớn** dễ nhớ |

## 2. Luật tiến hóa mới (thay luật "tối thượng = vàng kim")

**Không tô vàng.** Mỗi nấc **phóng đại đặc trưng của chính món đó**:

| Nấc | Nguyên tắc |
|---|---|
| Thường | Dáng gốc, màu đặc trưng, năng lượng nhẹ |
| Siêu cấp | Đặc trưng **mọc ra và lớn lên** từ thân (cánh lửa, lưỡi liềm, xoáy…). Năng lượng trong suốt, phát sáng |
| Tối thượng | **Cùng đặc trưng, hoàn chỉnh nhất:** thêm lớp, thêm vòng, kích thước lớn hơn, màu năng lượng **nâng lên một tông sáng hơn hoặc thuần hơn** trong cùng họ màu. Giáp có hoa văn tinh xảo hơn |

Áp dụng cho **chiến cơ, trang bị (tàu con, vũ khí phụ) và robot**.

Ví dụ:
- **Phượng Hoàng:** lửa cam → cánh lửa lông vũ lớn → **lửa trắng – lam thánh** viền cam, đuôi lửa 5 dải, quầng mặt trời sau lưng. Thân giữ trắng bạc + đỏ cam, **không vàng kim**.
- **Đao Phong:** 2 lưỡi đao lam điện → 2 lưỡi liềm sét → **4 lưỡi liềm**, sét lam – trắng thành cơn bão xoáy quanh thân. Thân bạc lam + tím nhạt.
- **Thôn Tinh (hố đen):** lỗ hút tím → xoáy hố đen có vành sáng → **thiên hà xoáy** tím – cyan với 2 vành tinh tú quay. Thân trắng ngà + tím. Mecha giữ đúng tông này.
- **Robot / tàu con:** nấc cao hơn = thêm bộ phận đặc trưng của loại đó (laser thêm nòng phát sáng, tên lửa thêm bệ, khiên thêm lớp lục giác trong suốt…), cùng họ màu.

## 3. Giữ nguyên
- Bảng chủ đề 13 tàu ở bản V212B (phần chủ đề, dáng, điểm nhấn). **Bỏ cột "Tối thượng = vàng"**, thay bằng luật mục 2.
- Năng lượng **không dùng đỏ #FF334F / hồng #F50057** (màu đạn địch).
- Nền trong suốt, 512 × 512 (Mecha 512 × 640), mũi lên, căn giữa.
- Chỉ học phong cách chung, không chép tàu, logo hay tên của game gốc.
- **Đợt thử lại:** vẫn tàu **1, 7, 11**, mỗi tàu 3 nấc + Mecha 11 (siêu cấp, tối thượng).

## 4. Mẫu lời nhắc (tàu 1 · Phượng Hoàng, GPT tự chỉnh)

> Top-down mobile shmup fighter, nose up, centered, transparent background, 512x512, **original design**.
> Bright pearl-white and silver armored hull with large clean glossy plates and crimson-orange accent panels; bird-like silhouette, sharp beak nose, folded metal feather wings; glowing orange core and engines; strong warm rim light, soft glow halo behind, high-contrast polished 2.5D mobile game art.
> **Minimal dark areas, few spikes, clean readable shape at small size.**
>
> **SUPER:** same hull, large translucent phoenix wings of soft orange plasma flame with white-hot cores, feather shapes made of light, three flame tail ribbons.
>
> **ULTIMATE:** same silhouette, wings bigger and layered, flame shifts to holy white-blue fire with orange edges, five tail ribbons, radiant sun halo behind; armor gains finer engraved patterns. **No gold plating.**
