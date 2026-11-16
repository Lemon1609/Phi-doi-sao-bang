Dưới đây là phần rà soát chi tiết cho tệp **`GPT_PROMPT_VE_NEN.txt`**, kèm bộ prompt đã tối ưu để bạn dán trực tiếp cho GPT vẽ và Claude hậu kỳ.

---

### 1. Những chỗ dễ khiến GPT vẽ sai & Danh sách thay đổi ngắn

* **Bẫy từ phủ định ("KHÔNG chữ, KHÔNG tàu, KHÔNG UI..."):** Bộ sinh ảnh của GPT thường bị "ngược tâm lý" — càng nhắc từ *tàu, nhân vật, UI* (dù có chữ KHÔNG), nó càng dễ vẽ nhầm vào. **Sửa:** Chuyển sang mô tả khẳng định (*"bối cảnh không gian trống hoàn toàn, không vật thể nhân tạo bay lơ lửng"*).
* **Bẫy mã màu HEX (`#0B1E3A`, `#000000`) & Khổ lẻ (`9:19,5`):** GPT không đọc chính xác mã HEX làm màu phẳng và dễ cắt cúp lỗi nếu ép tỷ lệ `9:19,5`. **Sửa:** Dùng từ khóa ánh sáng/chất liệu chuẩn của ngành ảnh, chọn khổ dọc tiêu chuẩn **`9:16` (1024×1792)** và chừa lề an toàn để Claude kéo/cắt lên `9:19,5`.
* **Lỗi tách nền đen `#000000` (Ảnh 2 & 3):** GPT luôn tự thêm sương mù hoặc viền mờ (vignette) khiến nền không đen tuyệt đối. **Sửa:** Yêu cầu *"các cụm vật thể cô lập hoàn toàn trong khoảng không đen kịt, không có sương mù nền phủ toàn màn hình"* để Claude dùng chế độ hòa trộn `Screen` / lọc độ sáng (Luma key) mượt mà.
* **Mâu thuẫn "xa mờ sáng, gần rõ tối":** Ở Ảnh 3 (lớp gần), nếu vật thể vừa tối vừa nằm trên nền đen thì sẽ tàng hình. **Sửa:** Lớp gần vẫn tối khối nhưng phải có **ánh sáng viền (rim-light) sắc nét** để tách khối.
* **Lặp dọc (Seamless):** GPT không tự tạo ảnh nối liền 100% được. **Sửa:** Bắt buộc cấm vẽ hành tinh hoặc khối kiến trúc lớn chạm mép trên và mép dưới ảnh, giữ hai đầu chỉ có nền sao/khói mịn để Claude ghép nối không lộ vết cắt.

---

### 2. Câu "Khóa Phong Cách" (Dán đầu mọi ảnh để đồng bộ 10 chương)

> **[KHÓA PHONG CÁCH CHUNG — DÁN ĐẦU MỖI LẦN]:**
> *"Tranh minh họa bối cảnh 2D cao cấp cho game bắn máy bay dọc di động, phong cách sci-fi điện ảnh hiện đại, độ chi tiết sắc nét, ánh sáng volumetric mềm, độ tương phản có kiểm soát, chiều sâu không gian 3 lớp rõ rệt. Bối cảnh thuần túy, trống trải, tuyệt đối chỉ có môi trường vũ trụ và kiến trúc tĩnh, góc nhìn từ trên cao nhìn thẳng xuống (top-down vertical view). Khổ dọc tiêu chuẩn 9:16."*

---

### 3. Bộ 5 khối Prompt đã chỉnh sửa (Sẵn sàng dán cho GPT)

#### ẢNH 1 · NỀN TRẬN CHƯƠNG 1 · LỚP XA (Nền đặc)

> **[Khóa phong cách chung]** + Bối cảnh vũ trụ sâu rực rỡ tông xanh ngọc lục bảo pha xanh đêm thẫm, điểm xuyết dải tinh vân ánh cam đồng ấm áp chỉ tập trung ở hai rìa trái và phải. Ở góc trên bên trái có một hành tinh khí khổng lồ mờ ảo trong sương vũ trụ với vành đai mỏng thanh mảnh. **Vùng trung tâm theo trục dọc (chiếm 40% bề ngang ở giữa màn hình) giữ độ tối sâu, ít ngôi sao và không có tinh vân sáng** để làm nền sạch. Rải rác các cụm sao li ti độ sáng vừa phải. Mép trên cùng và mép dưới cùng của bức ảnh chỉ là nền không gian tối đồng nhất, không có hành tinh hay vật thể lớn chạm mép.

#### ẢNH 2 · CHƯƠNG 1 · LỚP GIỮA (Để Claude tách nền)

> **[Khóa phong cách chung]** + Trên nền khoảng không đen kịt tuyệt đối không sương mù nền: chỉ vẽ 2–3 dải khói tinh vân mỏng bán trong suốt tông xanh ngọc nhạt và vài mảnh trạm không gian cổ bỏ hoang trôi dạt ở **hai bên rìa màn hình**. Mọi chi tiết có độ sáng thấp đến trung bình, ánh sáng viền mềm mại. **Dải trục dọc 45% ở chính giữa màn hình hoàn toàn trống trơn và đen kịt.** Không có vật thể nào chạm mép trên hoặc mép dưới ảnh.

#### ẢNH 3 · CHƯƠNG 1 · LỚP GẦN (Để Claude tách nền)

> **[Khóa phong cách chung]** + Trên nền khoảng không đen kịt tuyệt đối: chỉ vẽ các khối đá thiên thạch sắc cạnh, khung dầm kim loại vỡ và vệt bụi vũ trụ bay lướt qua ở **sát hai mép trái và phải (mỗi bên rộng không quá 15% chiều ngang)**. Vật thể tối màu, độ tương phản cao, có đường viền ánh sáng xanh ngọc – cam hắt nhẹ (rim-light) để nổi khối. **Toàn bộ 70% phần giữa bức ảnh hoàn toàn đen kịt và trống rỗng.** Không cắt ngang vật thể ở mép trên và mép dưới.

#### ẢNH 4 · NỀN SẢNH "XƯỞNG ĐÓNG TÀU TƯƠNG LAI" (Khổ dọc 3:4)

> **[Khóa phong cách chung, đổi góc nhìn thành phối cảnh chính diện hơi ngước nhẹ, khổ dọc 3:4]** + Bên trong khoang bảo trì của một xưởng đóng tàu vũ trụ khổng lồ mang phong cách công nghệ tương lai sạch sẽ. Phía sau lớp kính vòm cường lực lớn ở nửa trên bức ảnh là dải ngân hà lấp lánh và **một hố đen vũ trụ nằm lệch nhẹ về phía trên bên phải**, bao quanh bởi đĩa bồi tụ ánh cam vàng và vòng thấu kính hấp dẫn xanh lam rực rỡ. Hai bên rìa trái và phải là các giàn cẩu thép công nghiệp, cánh tay robot bảo trì và đường ống dẫn năng lượng phát sáng xanh lơ dịu nhẹ, rải rác vài tia lửa hàn cam nhỏ. Ở **1/3 phía dưới chính giữa** là một bệ đáp hình tròn bằng kim loại tối màu với vòng tròn năng lượng phát sáng xanh lam ở viền ngoài (lòng bệ tối để đặt vật thể lên trên). Từ trần xưởng chiếu xuống một luồng sáng mềm thẳng vào tâm bệ đáp. Phần 20% trên cùng và 18% dưới cùng có ánh sáng trầm, ít chi tiết rối.

#### ẢNH 5 · NỀN BẢN ĐỒ HÀNH TRÌNH (Khổ dọc 9:16)

> **[Khóa phong cách chung]** + Bản đồ không gian vũ trụ nhìn từ trên xuống: các cụm tinh vân nhiều tầng màu tím lam huyền ảo và hồng cánh sen dịu nhẹ, điểm xuyết 2 hành tinh nhỏ nằm sát hai rìa trái phải và các chòm sao mịn. **Chừa một hành lang không gian tối, quang đãng chạy uốn lượn hình chữ S nhẹ từ dưới đáy lên đỉnh ở khu vực giữa màn hình** (không có tinh vân sáng hay hành tinh nằm đè lên hành lang này). Mật độ chi tiết vừa phải, tạo cảm giác chiều sâu bản đồ chiến thuật.

---

### 4. Thiết kế bố cục chi tiết cho ẢNH 4 (Nền Sảnh)

Để chiến cơ ở giữa nổi bật khối 3D và các nút giao diện (thanh tài nguyên trên cùng, nút Xuất Kích / Kho / Nâng Cấp ở dưới) không bị lóa, bố cục ẢNH 4 được chia theo tỷ lệ dọc như sau:

```text
+-----------------------------------+
| [0% - 18%] TRẦN XƯỞNG TỐI MÀU     | -> Đặt Thanh Top UI (Vàng, 💎, 🔋, Avatar)
|   (Khung dầm thép chìm trong bóng)|    Nền tối giúp số & icon trắng/vàng cực rõ.
+-----------------------------------+
| [18% - 45%] VÒM KÍNH & HỐ ĐEN     | -> Hố đen đặt lệch phải (tọa độ X: 68%, Y: 30%)
|   (Luồng sáng trần rọi xuống giữa)|    để không bị đầu chiến cơ che mất đĩa bồi tụ.
+-----------------------------------+
| [45% - 68%] VÙNG ĐẶT CHIẾN CƠ     | -> Nền phía sau chiến cơ là khoảng không kính tối
|   (Chiến cơ nằm tại tâm X:50%,Y:56%)|  + luồng sáng đứng dịu => nổi bật cánh & đạn neon.
+-----------------------------------+
| [68% - 82%] BỆ ĐÁP TRÒN KIM LOẠI  | -> Lòng bệ TỐI MÀU, chỉ phát sáng VIỀN tròn xanh lam
|   (Nghiêng góc 25 độ tạo chiều sâu)|   (Nếu tâm bệ sáng trắng sẽ nuốt mất thân máy bay).
+-----------------------------------+
| [82% - 100%] SÀN XƯỞNG ĐỔ BÓNG TỐI| -> Đặt Cụm Nút Menu dưới & Nút "XUẤT KÍCH" rực sáng
|   (Góc tối vignette tự nhiên)     |    Nút bấm nổi bật hoàn toàn trên nền sàn tối.
+-----------------------------------+

```

---

### 5. Rà soát & Chỉnh sửa Bảng màu 10 Chương

**Vấn đề phát hiện ở bảng màu cũ:**

1. **Nguy cơ nuốt đạn địch (Trắng / Đỏ / Vàng):**
* *Ch3 (đỏ cam + vàng)* và *Ch9 (vàng đồng + nâu đỏ)* trùng hoàn toàn với màu đạn đỏ và vàng của địch, đồng thời 2 chương này quá giống nhau.
* *Ch5 (lam điện + trắng)* có dải sáng trắng dễ làm đạn lõi trắng tàng hình.


2. **Trùng lặp tông màu:** Có tới 3 chương thiên về tím/hồng (*Ch2 tím+hồng, Ch6 hồng cánh sen+xanh lơ, Ch8 tím đen+đỏ*) và 2 chương xanh ngọc (*Ch1, Ch7*).

**Bảng màu 10 chương đề xuất thay thế (Đã tách sắc độ & bảo vệ độ rõ của đạn):**

| Chương | Bảng màu cũ

 | Đề xuất chỉnh sửa (Nền chính + Điểm nhấn rìa) | Lý do & An toàn thị giác đạn |
| --- | --- | --- | --- |
| **Ch1** | Xanh ngọc + Cam | **Xanh đêm ngọc lục bảo + Cam hổ phách (ở rìa)** | Giữ bản sắc mở màn, ấm áp và dễ chịu mắt. |
| **Ch2** | Tím + Hồng | **Tím chàm sâu + Hồng tím hoa đăng (Magenta)** | Tách hẳn khỏi tông xanh Ch1; đạn vàng/trắng nổi bần bật. |
| **Ch3** | Đỏ cam + Vàng *(Lỗi nuốt đạn)* | **Đỏ rượu vang sẫm (Burgundy tối) + Đồng xỉn** | Hạ độ bão hòa và độ sáng nền xuống mức trầm để đạn đỏ tươi/vàng chanh vẫn rực sáng. |
| **Ch4** | Lục + Vàng chanh | **Xanh lục bảo thẫm + Xanh bạc hà (Mint) tinh vân** | Bỏ vàng chanh để không trùng đạn vàng; tạo cảm giác rừng tinh vân sinh học. |
| **Ch5** | Lam điện + Trắng *(Lỗi nuốt đạn)* | **Xanh coban đậm + Lam băng giá (Ice Cyan)** | Thay màu trắng bằng lam băng lạnh để lõi đạn trắng không bị hòa nền. |
| **Ch6** | Hồng cánh sen + Xanh lơ | **Hồng san hô trầm + Xanh mòng két (Teal) tối** | Giữ chất synthwave hiện đại nhưng nền tối hơn Ch2. |
| **Ch7** | Xanh biển sâu + Ngọc | **Xanh đại dương thẳm (Abyssal Navy) + Tím tử đinh hương** | Đổi điểm nhấn sang tím nhạt để không lặp lại xanh ngọc của Ch1. |
| **Ch8** | Tím đen + Đỏ | **Xám chì thép vũ trụ + Đỏ thẫm cơ khí (Rìa)** | Chuyển sang tông trạm chiến đấu cơ khí nặng nề, tạo nhịp nghỉ thị giác trước cao trào. |
| **Ch9** | Vàng đồng + Nâu đỏ *(Trùng Ch3)* | **Xanh chàm hoàng gia (Indigo) + Vàng kim sa (bụi sao mờ)** | Thay nâu đỏ bằng nền chàm tối sang trọng, bụi vàng chỉ là hạt nhỏ li ti ở rìa. |
| **Ch10** | Hố đen cam–xanh, nền tím | **Tím đen vô cực + Hố đen trung tâm (Viền cam cháy – xanh điện)** | Giữ nguyên ý tưởng đỉnh cao cho chương cuối, vòng sáng hố đen làm tâm điểm thị giác. |