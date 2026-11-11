# PROMPT THIẾT KẾ CHO GPT · PHI ĐỘI SAO BĂNG · V225

Dán nguyên văn tài liệu này cho GPT. Nó thay thế mọi tài liệu chuẩn trước (kể cả V224). Bản này đã gộp góp ý của Gemini (giám đốc mỹ thuật) và các quyết định của chủ dự án.

> **Tình hình (đọc trước):** bộ 12 tranh **tàu 7** vẽ theo V223 đã đạt và được chủ dự án khen đẹp. Chủ dự án chốt: **vẽ lại lần lượt các chiến cơ còn lại theo đúng cách của tàu 7.** Tàu 7 là **mẫu phong cách**: dáng sạch và gọn, màu rực nhiều lớp, mép cánh là dải năng lượng, kính phát sáng, sáu bậc cùng một họ, bản Bạo Tẩu dựng trên bản thường. Bài học trước đó vẫn giữ: bản vẽ "60 % kim loại, một màu" bị chê đơn sắc.

> **Bổ sung V225 · CHẤT CƠ KHÍ (chủ dự án, 11/11):** các tranh mới đẹp màu nhưng **"chưa đem lại cảm giác máy móc, cơ khí"**. Đo lại: khung kim loại tối chỉ 3–6 % (tàu 6, tàu 7), giáp sơn màu chiếm 50–59 %, nên trông như kính và năng lượng. Tranh tàu 8 (khung tối 21 %, ống dẫn, nòng pháo lộ) là tàu gần chất cơ khí nhất. **Từ nay mỗi chiến cơ phải nhìn ra là một cỗ máy lắp ráp**, xem mục 3A. Màu rực và dải năng lượng vẫn giữ.
>
> **Chủ dự án chốt (15:17): VẼ LẠI TOÀN BỘ 13 chiến cơ theo V225, kể cả tàu 7 (vừa vẽ ở V223) và tàu 8.** Tàu 7 V223 không còn là mẫu phong cách; nó chỉ còn là tham chiếu về dáng và độ rực màu. **Ảnh chủ đầu tiên đạt chuẩn V225 và được chủ dự án duyệt sẽ thành mẫu phong cách mới** cho các tàu sau.

---

## 0. Vai trò

Bạn là họa sĩ chính của game bắn máy bay dọc màn hình **Phi Đội Sao Băng**. Chủ dự án chưa hài lòng: tranh **chưa đồng bộ, chưa đẹp, chưa ngầu**; có tàu quá dẹt, có tàu quá to; hiệu ứng lòe loẹt. Nhiệm vụ là nâng chất lượng, không chỉ làm đủ số lượng. **Thà ít tranh mà đẹp và đồng bộ.**

## 1. Hướng mỹ thuật: "neon khoa học viễn tưởng"

Một chiến cơ tương lai nhìn từ trên xuống, bay trong vũ trụ tối: thân crôm sắc cạnh, giáp màu rực, **mép cánh và rãnh đèn phát sáng** như ống neon. Khi vào trạng thái mạnh nhất (Bạo Tẩu), các rãnh đèn bừng sáng, thân mở ra; lửa và sét cũng là **nét neon mảnh**, không phải mảng màu đặc.

| | Phe ta (chiến cơ, trang bị, hợp thể) | Phe địch (quái, tinh anh, boss) |
|---|---|---|
| Ba chữ | **Gọn · sắc · phát sáng** | **Hầm hố · đồ sộ · ác mộng** |
| Cỡ | Vừa phải, không quá to, kể cả lúc Bạo Tẩu | To và nặng hơn hẳn phe ta |
| Hình khối | Thanh, nhọn, khí động, đối xứng, ít chi tiết | Khối lớn gồ ghề: giáp dày, gai, càng, hàm, sinh – cơ ghép |
| Kim loại | **Crôm sáng**, phản chiếu màu năng lượng | **Sẫm**: than, thép gỉ, tím đen, xù xì |
| Màu | Rực, nhiều lớp; mỗi tàu một cặp màu năng lượng riêng | Đỏ #FF334F và hồng #F50057 (chỉ phe địch được dùng) |

Tô đen toàn bộ vẫn phải phân biệt được hai phe, và phân biệt được từng tàu phe ta với nhau.

Tựa game gốc mà chủ dự án đưa ảnh chỉ là tham khảo về **cảm giác** (viền sáng neon, cánh nhiều lớp, nổi trên nền tối). Không chép dáng, tranh, tên hay logo của bất kỳ game nào.

## 2. Quy tắc kỹ thuật (bắt buộc, sai là phải vẽ lại)

1. **Hai loại tệp, hai loại nền, không lẫn:**
   - **Tranh thân tàu** (mục 2–5): PNG RGBA 512×512, **nền trong suốt**.
   - **8 tệp mảnh hiệu ứng rời** (mục 6): **nền đen đặc #000000**, không trong suốt.
2. Tranh thân: nhìn thẳng từ trên xuống, mũi hướng lên, đối xứng trái – phải, tâm thân trùng tâm ảnh.
3. **Tỉ lệ thân** (không tính lửa động cơ): rộng / cao từ **0,85 đến 1,25**.
4. **Cỡ thân theo bậc**, tính bằng căn(rộng × cao): thường 345 · lục 355 · lam 368 · tím 380 · tím+ 392 · SS 405 px. Không chiều nào vượt 456 px, để lề trống mỗi phía ≥ 28 px.
5. **Màu: rực và nhiều lớp, không đơn sắc.** Tính trên diện tích thân:
   - **Kim loại crôm sáng: 15–40 %** (tàu 7 đạt 10–19 %, hơi ít; tàu thiên về kim loại như tàu 8, tàu 10 nên ở 25–40 %). Crôm phải **phản chiếu màu năng lượng của tàu** (vệt ánh tím, lam trên mặt kim loại), chuyển sắc từ trắng ở cạnh bắt sáng xuống lam than ở khe tối. Cấm xám bệt một màu.
   - **Giáp sơn màu chủ đạo: khoảng 35 %**, tô **chuyển sắc hai tông** (đậm ở gốc, sáng ở mép), không tô phẳng.
   - **Phần phát sáng: ít nhất 20 %**, gồm mép năng lượng của cánh, rãnh LED, buồng lái kính, lõi, họng động cơ.
   - Mỗi tàu có **một cặp màu năng lượng** (bảng mục 7): màu đèn chính và màu đèn phụ. Phần phát sáng chuyển sắc giữa hai màu này. Không dùng màu thứ ba.
   - (Tàu 11 và 13 có giáp sẫm hơn theo bảng, nhưng vẫn phải đạt tỉ lệ phát sáng và không tối bằng tàu địch.)
6. **Cấm với phe ta**: đỏ #FF334F, hồng #F50057, vàng kim, cầu vồng, chữ, logo, số.
7. **Không vẽ dính vào tranh thân**: lửa bao quanh, sét, quầng sáng, hạt bụi, vòng tròn. Chỉ được có lửa động cơ ngắn (≤ 40 px) màu lam – trắng ở họng đốt.
8. Một nguồn sáng từ góc trên – trái của khung ảnh cho mọi tranh, cả hai phe. Không viền đen dày kiểu hoạt hình.

## 3. Cách vẽ thân phe ta cho đẹp

- **Ba khối, đọc được ở cỡ 100 px**: thân giữa, cánh, cụm động cơ.
- **Ba chất liệu rõ ràng trên mỗi tàu**: crôm phản chiếu · giáp sơn chuyển sắc · kính / năng lượng phát sáng. Chính sự đối lập ba chất liệu làm tàu đẹp.
- **Mép cánh là dải năng lượng**: dọc mép trước (hoặc lưỡi cắt) của mỗi cánh có một dải sáng rộng 6–12 px, chuyển sắc từ màu đèn chính sang màu đèn phụ, lõi gần trắng. Không chỉ là một sợi chỉ mảnh.
- **Buồng lái và lõi là kính phát sáng**, có chuyển sắc và một điểm phản quang trắng.
- **Tấm giáp nhiều lớp, có chiều sâu**: mỗi cánh 2–3 lớp tấm chồng nhau, bóng đổ giữa các lớp, khớp nối và khe thông gió ở các điểm giao. Chi tiết dồn vào quanh lõi và khớp; mặt lớn để thoáng.
- **Hai họng động cơ** phun lửa lam – trắng ngắn, sáng.
- **Rãnh đèn LED là linh hồn của tàu.** Vẽ 3–6 rãnh LED rộng 3–5 px, **liền nét**: chính giữa là lõi trắng #FFFFFF rộng 1 px, hai bên là viền màu đèn bão hòa tối đa, cả rãnh nằm lọt trong một khe giáp tối để nổi bật. Đặt dọc mép cánh, sống lưng và quanh lõi. Game sẽ tự làm các rãnh này bừng sáng và thêm viền neon khi Bạo Tẩu, nên chúng phải rõ và sạch.
- Tương phản cao: mặt crôm sáng cạnh khe tối, vùng phát sáng cạnh giáp đậm màu. Thêm một viền sáng mảnh màu đèn ở phía khuất sáng của thân.
- **Phép thử**: đặt cạnh `tau7_tim_MAU_PHONG_CACH.png`, ảnh mới phải cùng một chất: rực, sâu màu, sạch, gọn.

## 3A. Chất cơ khí (bắt buộc từ V225)

Mỗi chiến cơ là **một cỗ máy lắp ráp từ nhiều bộ phận**, không phải một khối đúc trơn hay một sinh vật.

1. **Khung thép tối 20–30 % diện tích**: thép súng xanh than (#1C2430 → #3A4656), lộ ra ở khung xương thân, khớp nối cánh, cụm động cơ, chân pháo. Đây là "bộ xương" mà giáp màu được gắn lên.
2. **Giáp màu là các tấm rời bắt lên khung**: có khe hở tối giữa các tấm, mép tấm dày (thấy được bề dày 2–4 px), không liền một mảng. Giáp màu còn khoảng 30–40 %.
3. **Bộ phận cơ khí nhìn thấy được**, mỗi tàu chọn ít nhất 5 loại hợp với dáng: cửa hút gió có lá chắn, turbin / quạt động cơ, ống xả nhiều tầng, nòng pháo có ống làm mát, ống dẫn và dây cáp, piston và khớp thủy lực ở gốc cánh, lỗ thông gió có nan, bu lông và đinh tán ở góc tấm, ray trượt, bánh răng hoặc vòng xoay ở khớp.
4. **Vũ khí lộ thiên**: thấy rõ họng pháo, bệ pháo, ổ tên lửa. Chiến cơ phải trông như có thể bắn.
5. **Năng lượng nằm TRONG máy**: lõi, buồng lái, rãnh LED, khe tản nhiệt phát sáng sau lớp lưới hoặc giữa các tấm giáp; không để cả mảng cánh tự phát sáng như kính.
6. **Hạn chế dáng hữu cơ mềm** (lông vũ mềm, tua, lụa). Tàu có dáng lông vũ hay cánh bướm thì vẽ thành **phiến kim loại xếp lớp có khớp xoay**, không phải lông thật.
7. Mép sắc, góc vát cứng, đối xứng cơ khí; chi tiết dày quanh lõi, khớp và động cơ, mặt giáp lớn để thoáng để vẫn đọc được ở 100 px.

Tỉ lệ màu thay mục 2.5: **khung thép tối 20–30 % · crôm sáng 10–20 % · giáp màu 30–40 % · phát sáng 15–25 %.**

Ảnh tựa game gốc chủ dự án đưa chỉ để tham khảo cảm giác "cỗ máy chiến đấu" (cụm động cơ tròn lộ turbin, giáp nhiều lớp, nòng pháo vươn dài). Không chép dáng, màu hay chi tiết của nó.

## 3B. Rút ra từ bộ ảnh tham chiếu thứ hai (chủ dự án gửi 15:20)

Bộ ảnh gồm năm chiến cơ ở màn kho và một cảnh đánh boss. Đây là những **cách làm** cần học; không lấy dáng, màu, tên hay chi tiết riêng của tàu nào.

1. **Dáng chiến đấu cơ thật, nâng lên khoa học viễn tưởng.** Thân có mũi, buồng lái kính, cánh, cánh đuôi, ống hút gió và cụm động cơ đúng vị trí như máy bay phản lực, rồi mới thêm giáp và đèn. Người xem nhận ra ngay "đây là máy bay chiến đấu", không phải đồ trang sức hay sinh vật.
2. **Vũ khí treo ngoài nhiều và rõ.** Nòng pháo đôi hoặc bốn vươn dài về phía trước (dài tới 30–45 % chiều cao thân ở bậc cao), ổ tên lửa treo dưới cánh, đầu đạn có khoang và vạch sơn. Bậc cao tăng số nòng, số tên lửa.
3. **Đĩa động cơ / lò phản ứng hình tròn** là điểm nhấn: vành kim loại, lá turbin bên trong, đèn vòng phát sáng. Dùng cho tàu nào hợp dáng, không bắt buộc mọi tàu.
4. **Khối nhiều lớp, sáng tối rõ.** Mặt trên tấm giáp sáng bóng có vệt phản chiếu trắng; mặt bên và khe dưới tối sâu. Đường chia tấm, đinh tán, nắp bảo dưỡng, vạch cảnh báo nhỏ làm thân "đặc" và nặng như máy thật.
5. **Đèn ít mà đắt.** Đèn chỉ ở rãnh mảnh, mắt cảm biến, lõi tròn và họng động cơ; phần lớn thân là kim loại có màu. Đèn càng ít thì chỗ có đèn càng nổi.
6. **Lửa động cơ hai luồng gọn, sáng lõi trắng** (thuộc phần hiệu ứng của game, không vẽ dính vào thân).
7. **Bạo Tẩu kiểu "quạt lưỡi năng lượng"**: sau lưng tàu xòe ra các lưỡi / cánh sáng xếp đều quanh thân, như nan quạt hoặc lưỡi dao ánh sáng; thân chỉ mở vừa phải theo mục 5, phần xòe lớn nằm ở các lưỡi sáng. Cách này hợp với tệp `tauN_fx_sang.png` (mục 6): mỗi tàu một dáng lưỡi riêng, theo màu đèn của tàu, nét mảnh kiểu neon. Không dùng vàng.
8. **Tỉ lệ trong trận**: chiến cơ phe ta nhỏ và gọn (khoảng 1/8 bề ngang màn hình), boss chiếm gần nửa màn hình. Boss là cỗ máy nặng: càng kẹp lớn, giáp đồng thau / thép cũ trầy xước, ống xả, piston, mắt đèn đỏ. Áp vào Phụ lục B khi vẽ địch.
9. **Màu**: các ảnh tham chiếu dùng đỏ và vàng cho phe ta; game mình **không** dùng hai màu đó cho phe ta (đỏ, hồng là màu đạn địch; không vàng kim). Giữ bảng màu mục 7.

Phép thử nhanh cho mỗi ảnh chủ: thu ảnh về 100 px, che phần đèn đi. Nếu vẫn thấy rõ mũi, buồng lái, cánh, động cơ và ít nhất hai cụm vũ khí thì đạt chất cơ khí.

## 3C. Cơ khí công nghệ cao + cánh neon LED (chủ dự án 18:13, thay bản 3C lúc 17:58; ưu tiên hơn 3A khi vênh nhau)

Đích: **nửa đường giữa** ảnh mẫu tàu 7 V225 (cơ khí, khung tối, nhiều khớp) và ảnh thử V226 (gốm trắng sạch). Bản V226 bị **quá sạch, mất chất máy móc, gần như không có đèn** (khung tối 10,6 %, phát sáng 2,8 %); bản V225 hơi nặng chất xưởng.

1. **Vẫn là cỗ máy**: giữ khung thép tối, khớp xoay, tay đòn, bệ pháo, đĩa động cơ có turbin, khe tản nhiệt, ít nhất 5 bộ phận cơ khí nhìn thấy. Truyền động đặt trong vỏ nhưng **để lộ khớp, trục, rãnh trượt**.
2. **Hoàn thiện hiện đại**: giáp tấm composite / gốm bóng cạnh vát sắc, đường chia tấm mảnh chính xác; giảm đinh tán to, ống dầu và dây cáp lộn xộn, vết trầy (để cho phe địch). Được giữ bu lông nhỏ, chốt khóa gọn.
3. **Cánh kiểu neon LED** (chủ dự án yêu cầu): cánh / lưỡi / phiến cánh là **khung kim loại mảnh + ống đèn LED phát sáng** chạy theo mép và sống cánh, có thể có màng năng lượng trong mờ giữa các thanh khung. Nét đèn mảnh, đều, sáng rực ở lõi, quầng mờ quanh nét, giống dải LED. Không phải mảng màu đặc. Mỗi tàu chọn cách làm cánh LED hợp dáng của nó.
4. **Đèn và năng lượng nhiều hơn**: rãnh LED theo đường chia tấm, lõi, cảm biến quang học, họng động cơ, khớp xoay có vòng sáng.
5. **Tỉ lệ màu (Claude đo)**: khung tối 18–25 % · crôm / gốm sáng 12–20 % · giáp màu 25–35 % · phát sáng 20–30 %.
6. **Hai phe**: phe ta sạch, chính xác, rực đèn; phe địch thô, trầy, nặng.
7. **Màu theo bậc**: màu giáp phải **trong, rực, sang** (bão hòa và sáng vừa đủ, như sơn kim loại bóng), không đục kiểu nâu bùn, rêu, đỏ đô xỉn. Màu đèn LED đổi theo bậc, tương phản rõ với giáp.

## 3D. Cánh năng lượng + thân cơ khí công nghệ cao (chủ dự án 18:35, thay bản 3D trước)

- **Cánh chiến cơ là cánh năng lượng / tinh thể phát sáng** theo kiểu bộ tàu 7 V223 (lưỡi sáng chuyển màu từ lưỡi cắt gần trắng sang sống cánh đậm, vân sáng chạy dọc, mép sắc, bậc cao nhân lớp). **Dáng cánh theo thiết kế từng tàu** (lưỡi liềm, lông vũ, nan quạt, ray, khung chữ H…, xem bảng mục 7); Bạo Tẩu tách / xòe cánh theo đúng dáng đó.
- **Thân giữa và tay đòn là cỗ máy công nghệ cao**: giáp tối bóng + mạch neon mảnh, vòng phản ứng tròn sáng ở khớp và động cơ, khớp – trục – nòng pháo lộ ra; gốc cánh có bộ phát cánh kim loại có khe sáng.
- **Màu theo bậc** (bảng V227): thân theo màu giáp của bậc, cánh năng lượng theo màu đèn của bậc.
- Cánh nằm ngay trong tranh thân; game thêm lấp lánh, neon chạy viền bằng mã. Không khép thành vòng tròn kín quanh tàu.

## 4. Tiến hóa 6 bậc: mỗi tàu lớn lên theo cách riêng

`thuong → luc → lam → tim → tim5 → ss`. Cùng một thân lõi, cùng màu. Mỗi tàu có **một cách lớn dần riêng** (bảng mục 7): tàu mũi khoan thì mũi dài và nhọn dần, tàu lông vũ thì thêm lớp lông, pháo hạm thì thêm pháo. Không dùng chung một công thức. Bậc sau phải nhìn ra là mạnh hơn bậc trước nhưng **không phình to** (cỡ theo mục 2.4).

## 5. Bản Bạo Tẩu (`_bt`): thân mở ra, vừa phải

- **Dựng trên chính tranh bản thường cùng bậc** rồi vẽ thêm phần mở; không vẽ lại thân. Thân lõi phải trùng khít.
- **Kiểu mở theo dáng và kỹ năng của chính tàu đó** (bảng mục 7). Sáu bậc của một tàu dùng cùng một kiểu mở, bậc cao mở mạnh hơn.
- **Không mặc định chữ X.** Không dùng chung một kiểu cho nhiều tàu.
- **Vừa phải**: diện tích **1,2–1,4 lần** bản thường; không chiều nào vượt 456 px (lề ≥ 28 px).
- Rãnh LED ở bản `_bt` nhiều hơn và sáng hơn (khe giáp hé lộ đèn bên trong).
- Không lửa, sét, quầng dính vào tranh.

## 6. Bộ mảnh hiệu ứng Bạo Tẩu: 8 tệp cho mỗi tàu

Game ghép các mảnh này vào tàu và làm chúng chuyển động. Mỗi tàu một bộ, dùng chung cho 6 bậc.

| Tệp | Khổ | Nội dung |
|---|---|---|
| `tauN_fx_lua_1.png`, `_2`, `_3` | 192×384 | Một ngọn lửa. **Gốc ở đúng điểm (96, 383)**, tức giữa cạnh đáy; ngọn hướng lên. Ba dáng nhỏ → vừa → cao của cùng một ngọn |
| `tauN_fx_set_1.png`, `_2`, `_3` | 384×128 | Một tia sét chạy ngang, **hai đầu chạm đúng (0, 64) và (383, 64)**. Ba dáng khác nhau, gãy khúc rõ (dao động dọc ≥ 60 px), có 1–2 nhánh phụ |
| `tauN_fx_sang.png` | 512×512 | Ánh sáng sau lưng tàu, tâm ảnh là tâm tàu, đối xứng. **Vùng tâm bán kính 100 px để đen tuyền**; nét sáng chỉ nằm trong vành từ 100 px đến 230 px |
| `tauN_fx_hat.png` | 256×64 | 4 ô 64×64 xếp ngang: 4 hạt lấp lánh khác nhau, mỗi hạt nằm gọn giữa ô. **Không vẽ đường kẻ chia ô** |

**Cách vẽ:**
- **Nền đen đặc #000000**, không trong suốt, không xám, không sao trời. Game tự tách nền đen.
- **Chất neon**: nét ống mảnh, lõi trắng, viền đúng màu đèn của tàu, quầng mờ hẹp quanh nét. Không mảng màu đặc, không khói, không tàn lửa rơi vãi.
- Chỉ hai màu: màu đèn của tàu và trắng.
- **Ánh sáng sau lưng nối dài chính dáng cánh của tàu đó** (bảng mục 7). Không chữ X, không vòng tròn kín. Nét đủ dày để còn thấy khi thu nhỏ (mẫu tốt: khung chữ H của tàu 10).
- Mỗi tàu một chất lửa và một kiểu sét riêng. Hai tàu không được giống nhau.

## 7. Bảng 13 chiến cơ

| Tàu · kỹ năng | Dáng | Màu giáp → cặp màu năng lượng (chính + phụ) | Lớn dần qua 6 bậc | Kiểu mở khi Bạo Tẩu | Lửa · sét | Ánh sáng sau lưng |
|---|---|---|---|---|---|---|
| 1 Phượng Hoàng · Thiêu Đốt | Chim ưng | Cam lửa #E65100 → cam #FF9A3D + lam lửa #5CC8FF | Thêm tầng lông cánh | Cánh ưng xòe ngang, lông đuôi tỏa về sau | Lửa vát nhọn · tia lửa điện ngắn | Đôi cánh ưng ba tầng |
| 2 Cực Quang · Laser | Thon, hai ray | Ngọc lục #00897B → ngọc #3DE0A0 + xanh lơ #5FE8FF | Ray dài, nhiều đoạn hơn | Hai thanh ray trượt ra trước, song song | Plasma thẳng như kim · sét thẳng dọc nòng | Hai thanh quang học song song |
| 3 X-Dực Băng · Đóng Băng | Tinh thể (tàu duy nhất vốn có dáng cánh chéo) | Lam băng #0288D1 → lam băng #67D7FF + trắng tím #C9D6FF | Thêm cụm gai băng | Gai băng mọc dài thêm ở đầu cánh | Sương băng đa diện · sét gãy vuông như vết nứt | Cụm gai băng chĩa chéo xuống |
| 4 Thần Ma · Xuyên Thấu | Mũi khoan | Lục axit #689F38 → lục axit #9BE83A + vàng chanh #E6FF6B | Mũi dài, nhọn dần | Mũi khoan vươn về trước, lưỡi phụ dựng sát thân | Lửa axit răng cưa · hồ quang ngắn ôm mũi | Mũi giáo tam giác ngược |
| 5 Thự Quang · Tán Xạ | Rẻ quạt | Lam nhạt #4FC3F7 → xanh lơ #00E5FF + lam #4F8BFF | 2 → 3 → 5 nan | Nan quạt xòe ngang | Xung hạt ngắt quãng · chùm tia mảnh tản ngang | Rẻ quạt năm nan |
| 6 U Linh · Laser | Lông vũ | Tím oải hương #7E57C2 → tím phấn #B9A6FF + lam nhạt #9FD8FF | Thêm lớp lông, lông dài dần | Lông xòe xuống và ra sau như đuôi công | Lửa lăng kính phẳng · lưới điện đối xứng | Lớp lông vũ sáng |
| 7 Đao Phong · Trảm Kích | Lưỡi liềm | Tím sẫm #512DA8 → chàm #7C4DFF + lam điện #3FD8FF | Lưỡi dài, thêm lưỡi phụ | Hai lưỡi liềm bật rộng ra hai bên | Lửa lưỡi liềm · chớp phân nhánh | Hai lưỡi liềm sáng ôm hai bên thân |
| 8 Phần Thiên · Thiêu Đốt | Pháo hạm | Cam thép #D84315 → lam plasma #29B6F6 + cam nhiệt #FF9A3D | 2 → 4 pháo, giáp vai dày dần | Pháo trượt lên trước, giáp vai mở ngang, tản nhiệt bật ra sau | Lửa thép lõi lam · hồ quang đôi nối hai pháo | Khung phản lực chữ V ngược |
| 9 Thiên Khung · Song Vũ | Cánh đôi | Bạc #CFD8DC – lam → lam biển #2979FF + xanh lơ #6FE3FF | Phân cánh lớn, xa dần | Tách hai phân cánh sang hai bên | Dải lụa mềm · sét xoắn kép | Đôi cánh nhạn vuốt về sau |
| 10 Tinh Hà · Quân Đoàn | Tàu mẹ khung chữ H | Thép lục quân #3B4D3B → **lục radar #5BE35B** + lam radar #45D2FF (chủ dự án chốt: đèn chính là lục, không phải lam) | Thêm khoang, thêm đội hình | Mở khoang, tên lửa và máy bay con tách quanh thân | Vòi phản lực vuông vức · sét mạch điện bẻ góc 90° | Khung chiến thuật chữ H |
| 11 Thôn Tinh | Càng cua | Thép than #2C3A40 → ngọc thẫm #00BFA5 + tím #9C7BFF | Càng dày, dài dần | Hai càng cong khép vào trong | Lửa hút vào tâm · sét cong hướng nội | Hai cánh cung khuyết |
| 12 Thời Không | Mảnh ghép rời | Trắng titan #DCE4EC → cực quang #18FFFF + tím nhạt #C7B8FF | Thêm mảnh | Các mảnh thân tách rời, lệch nhau quanh lõi | Lửa đứt đoạn như lưu ảnh · sét nhịp xung | Bốn mũi kim lệch góc |
| 13 Hư Không | Vương miện | Xám tím than #3A3650 → tím #B388FF + lục nhạt #69F0AE | Thêm gai, khe nứt rộng dần | Gai vương miện mở lên trước, thân nứt hở lõi | Vết rách tối viền sáng lạnh · sét song hành | Sáu gai vương miện hở xòe lên |

Được đề xuất khác nếu hợp dáng tàu hơn, miễn giữ ba nguyên tắc: riêng từng tàu, gọn, neon.

**Mẫu phong cách:** `tau7_tim_MAU_PHONG_CACH_V225.png` (ảnh chủ tàu 7 V225 bản sửa, chủ dự án duyệt 17:25 ngày 11/11). Mọi tàu sau phải cùng chất: khung thép tối, giáp tấm rời có khe, nòng pháo lộ, đĩa động cơ, LED mảnh. **Giữ nguyên:** 8 mảnh hiệu ứng tàu 7, bộ mảnh tàu 9 và tàu 10 (xem lại sau khi thân tàu vẽ lại). Mọi tranh thân đều vẽ lại.

## 8. Trang bị và hợp thể

- **Trang bị**: cùng chất kim loại sáng, cùng nguồn sáng, cùng kiểu rãnh LED với chiến cơ. Mỗi bộ một màu đèn, một hình khối chủ đạo, một cách mở riêng khi lên siêu cấp (phụ lục C). Gọn, vừa phải.
- **Hợp thể** (ghép tàu A với tàu B), công thức "chia đôi trong – ngoài":
  1. **Thân giữa và mũi của A, cánh ngoài và cụm vũ khí của B.** Không trộn nhuyễn thành một dáng chung chung; tô đen vẫn chỉ ra được nửa trong là A, nửa ngoài là B.
  2. Giáp thân trong sơn màu chủ đạo của A; giáp cánh ngoài sơn màu chủ đạo của B.
  3. Rãnh LED trên thân theo màu đèn của A, trên cánh theo màu đèn của B; **lõi ở tâm chuyển sắc từ màu đèn A sang màu đèn B** (chỉ hợp thể được dùng hai màu đèn).
  - Khung 512×512, cỡ căn(rộng × cao) tối đa 435 px, lề ≥ 24 px.
  - Ví dụ: Phượng Hoàng + X-Dực Băng = thân mỏ ưng và hai lớp cánh trong cam lửa; rìa ngoài là cánh tinh thể vát và gai băng lam; LED cam dọc sống lưng gặp LED lam băng gãy khúc ở rìa cánh tại một lõi nửa băng nửa lửa.

## 9. Tàu địch

Hầm hố, đồ sộ, ác mộng. Kim loại sẫm, gai, càng, hàm răng, mắt đỏ, khe nứt phát sáng đỏ – hồng. Bất đối xứng nhẹ được phép. **Vẽ sẵn mũi hướng xuống** ngay trong tệp, vẫn chiếu sáng từ góc trên – trái của khung ảnh. Chi tiết các họ quái ở phụ lục B.

## 10. Cách làm việc để tranh đồng bộ

**Mỗi lần chỉ làm một tàu, theo đúng dây chuyền đã thành công với tàu 7:** ảnh chủ bậc tím → duyệt → 5 bậc còn lại → 6 bản Bạo Tẩu → 8 mảnh hiệu ứng. Xong một tàu mới sang tàu kế.

**Hai loại tham chiếu trong gói `THAM_CHIEU_DANG_BAC_TIM.zip`:**
- `tau7_tim_MAU_PHONG_CACH.png`: (tên tệp cũ) nay **chỉ là tham chiếu dáng tàu 7 và độ rực màu**, KHÔNG phải mẫu chất liệu: nó thiếu chất cơ khí.
- `tauN_tim_tham_chieu_dang.png`: **chỉ tham chiếu dáng** và đặc trưng nhận diện của tàu N (đã sạch quầng, đúng cỡ chuẩn bậc tím). Không giữ màu, chất liệu, mức chi tiết của ảnh này.
- **Khi lời tả ở phụ lục A khác với dáng trong ảnh tham chiếu, ưu tiên dáng trong ảnh tham chiếu**: người chơi đã quen các tàu này, chỉ làm sạch và làm gọn dáng, không đổi thành tàu khác. (Cách này đã làm với tàu 7.)

1. **Mỗi tàu vẽ một ảnh chủ trước**: bản thường bậc tím, theo lời tả ở phụ lục A. Gửi duyệt.
2. Khi ảnh chủ được duyệt, **sửa trên chính ảnh chủ** để ra 5 bậc còn lại (bớt chi tiết cho bậc thấp, thêm cho bậc cao). Không vẽ mới từ đầu từng bậc.
3. Bản `_bt` của bậc nào thì **sửa trên bản thường của bậc đó**.
4. Bộ mảnh hiệu ứng vẽ sau cùng, nhìn vào thân đã duyệt để lấy đúng màu đèn và dáng cánh.
5. **Vẽ từng tệp lẻ đúng khổ trước**, rồi dùng mã Python ghép thành tấm 6 bậc × 2 hàng (thường / Bạo Tẩu) trên nền xanh đen để duyệt nhanh. Không vẽ trực tiếp tấm ghép.

## 11. Tự kiểm trước khi gửi

- [ ] Thu ảnh còn 100 px vẫn đọc được ba khối và nhận ra là tàu nào.
- [ ] Rộng / cao trong 0,85–1,25; đúng cỡ theo bậc; không chiều nào quá 456 px.
- [ ] **Không đơn sắc**: crôm ≤ 40 %, phần phát sáng ≥ 20 %, thấy rõ cả hai màu năng lượng; crôm có ánh phản chiếu màu, giáp tô chuyển sắc.
- [ ] Mép cánh có dải năng lượng 6–12 px; có 3–6 rãnh LED liền nét lõi trắng; buồng lái và lõi là kính phát sáng.
- [ ] **Chất cơ khí**: khung thép tối 20–30 %; giáp là tấm rời có khe; thấy ít nhất 5 loại bộ phận cơ khí; vũ khí lộ thiên; năng lượng nằm trong máy.
- [ ] Đặt cạnh `tau7_tim_MAU_PHONG_CACH.png`: rực màu ngang nhau, nhưng **cơ khí hơn**.
- [ ] Mép thân sắc: không quầng mờ, không bóng đổ ra ngoài thân.
- [ ] Không đỏ, hồng, vàng kim, cầu vồng; không lửa sét dính vào thân.
- [ ] Bản `_bt` trùng thân lõi với bản thường, mở 1,2–1,4 lần, cùng kiểu mở với các bậc khác của tàu đó, không phải chữ X.
- [ ] Mảnh hiệu ứng: đúng khổ, nền đen đặc, gốc lửa và hai đầu sét đúng tọa độ, tâm ánh sáng sau lưng để trống, dải hạt không có vạch chia ô.
- [ ] Đặt cạnh tàu khác thì không na ná nhau.

## 12. Việc cần làm (theo thứ tự, mỗi lần một tàu)

**A. Vẽ lại toàn bộ 10 chiến cơ đang có theo V225** (mỗi tàu: ảnh chủ bậc tím → chủ dự án duyệt → 5 bậc → 6 `_bt` → 8 mảnh hiệu ứng nền đen). Giữ dáng nhận diện của từng tàu theo ảnh tham chiếu, thêm chất cơ khí mục 3A.

| Thứ tự | Tàu | Ghi chú riêng |
|---|---|---|
| 1 | **7 Đao Phong** | **Ảnh chủ V225 đã đạt chỉ số** (khung tối 28,8 %, crôm 11,8 %, phát sáng 19,3 %, cỡ 380). Vẽ bản sửa theo 6 điểm ở phụ lục D.1 rồi mới làm 5 bậc, 6 `_bt` theo D.2–D.3 |
| 2 | **8 Phần Thiên** | Gần chất cơ khí nhất; giữ dáng, chỉnh tỉ lệ màu theo 3A, làm rõ 4 pháo và ống dẫn |
| 3 | **6 U Linh** | Lông vũ thành phiến thép xếp lớp có khớp xoay; lăng kính ở ngực đặt trong vỏ máy |
| 4 | **2 Cực Quang** | Tua ngọc thành cần cơ khí có khớp; giữ dáng cánh bướm |
| 5 | **4 Thần Ma** | Một dáng mũi khoan cho cả sáu bậc; mũi khoan có rãnh xoắn, mô tơ lộ ở gốc; rộng / cao ≥ 0,85 |
| 6 | **10 Tinh Hà** | Tàu mẹ: khoang phóng có cửa trượt, ray phóng; đèn chính lục radar #5BE35B |
| 7 | **5 Thự Quang** | Nan quạt là tấm thép có khớp bản lề; đưa rộng / cao về ≤ 1,25 |
| 8 | **3 X-Dực Băng** | Tinh thể băng gắn trên khung thép, không phải khối băng trơn |
| 9 | **9 Thiên Khung** | Phân cánh ngoài nối thân bằng tay đòn cơ khí; rộng / cao ≤ 1,25 |
| 10 | **1 Phượng Hoàng** | Lông cánh thành phiến thép vát; cụm động cơ lộ turbin |

**B.** (gộp vào A)

**C. Tàu mới:** ảnh chủ tàu 11, 12, 13 theo phụ lục A.

**D. Ảnh ý tưởng tàu địch:** một tấm gồm 1 quái thường, 1 tinh anh, 1 boss đặt cạnh tàu 7 mới, để duyệt phong cách.

Làm A trước. Nếu chạm hạn mức tạo ảnh, gửi từng phần (ví dụ chỉ ảnh chủ của một tàu); không cần chờ đủ.

---

## Phụ lục A. Lời tả ảnh chủ (bản thường, bậc tím) của 13 chiến cơ

Mỗi đoạn dùng làm lời tả cho một ảnh. Mọi tàu đều áp mục 2.5 và mục 3: crôm phản chiếu màu, giáp chuyển sắc, mép cánh là dải năng lượng chuyển giữa hai màu của cặp màu năng lượng (bảng mục 7), buồng lái và lõi là kính phát sáng. Các rãnh LED nêu dưới đây là phần thêm vào, không phải toàn bộ phần phát sáng.

1. **Phượng Hoàng.** Chim ưng săn mồi góc cạnh, sải cánh vát xuôi thành hình mũi tên. Thân giữa thuôn nhọn như mỏ ưng; mỗi cánh ba lớp tấm giáp cam lửa #E65100 xếp bậc thang; hai ống xả đa giác sát đuôi. Bốn rãnh LED cam #FF9A3D chạy dọc mép trước của ba tầng lông cánh rồi hội tụ về sống lưng. Lõi hình thoi phát sáng cam giữa ngực. Khác biệt: ba tầng cánh như lông vũ kim loại vát nhọn.
2. **Cực Quang.** Chiến cơ bắn tỉa như một khẩu pháo điện từ bay, thon nhưng vẫn giữ rộng / cao ≥ 0,85 nhờ hai cánh phụ. Thân trung tâm lùi về sau; cặp thanh ray từ trường dài vươn thẳng lên trước, kẹp một khe hở dọc ở mũi; hai cánh phụ gọn. Hai rãnh LED ngọc lục #3DE0A0 chạy song song suốt lòng máng hai thanh ray. Buồng tụ quang hình trụ pha lê ở giữa thân. Khác biệt: khe hở dọc ở mũi giữa hai ray.
3. **X-Dực Băng.** Tinh thể sắc nhọn với các mặt vát kim cương đối xứng. Thân lăng trụ lục giác; hai cánh chính vươn chéo lên trước, hai cánh phụ chĩa chéo xuống, màu lam băng #0288D1; đuôi thu gọn. Mạch LED #67D7FF gãy khúc 60° chạy theo gờ vát của các khối tinh thể. Lõi đông lạnh lam – trắng ở tâm. Khác biệt: bề mặt vát đa diện như băng cắt gọt.
4. **Thần Ma.** Đầu mũi giáo, trọng tâm dồn về mũi khoan phía trước. Mũi khoan cơ khí lớn chiếm nửa trước; hai cánh tam giác vát xuôi ôm sát sườn, lục axit #689F38; động cơ kép. Bốn rãnh LED #9BE83A từ hai cánh hội tụ về chóp mũi thành chữ V nhọn. Lõi sinh hóa lục chanh ngay gốc mũi khoan. Khác biệt: mũi nhọn vươn xa khỏi hai cánh.
5. **Thự Quang.** Rẻ quạt xòe ngang, bề ngang nhỉnh hơn chiều dọc (rộng / cao ≤ 1,25). Thân giữa ngắn; hai cánh chia thành năm nan pháo tách rời màu lam nhạt #4FC3F7; ba họng đốt xếp ngang ở đuôi. Năm rãnh LED xanh lơ #00E5FF chạy giữa năm nan, tỏa từ tâm. Đĩa phân phối xung hình lục giác giữa lưng. Khác biệt: cánh xẻ thành năm nan hướng ra năm góc.
6. **U Linh.** Chim công cơ khí thanh thoát, cánh xếp lớp mềm nhưng sắc cạnh. Thân mảnh như mũi kiếm; hai cánh là các phiến lông vũ quang học tím oải hương #7E57C2 vuốt dài về sau; động cơ chìm dưới đuôi. Sợi LED tím phấn #B9A6FF viền quanh từng phiến lông và đan trên sống lưng. Lăng kính hình giọt nước tím – trắng giữa ngực. Khác biệt: các phiến cánh xếp chồng vuốt về đuôi.
7. **Đao Phong.** Đôi lưỡi liềm uốn cong ôm lấy thân chính. Thân giữa nhỏ gọn; hai cánh là hai lưỡi đao cong, mũi hướng vào nhau, tím sẫm #512DA8; một động cơ lớn. Hai dải LED chàm #7C4DFF chạy đúng lưỡi cắt cong phía ngoài. Lõi xoáy tím đậm ở tâm. Khác biệt: đường cong lưỡi liềm duy nhất trong 13 tàu.
8. **Phần Thiên.** Pháo hạm vững chãi, vai rộng, nòng pháo lộ thiên. Thân trung tâm bọc giáp cam thép #D84315; hai khối giáp vai mang bốn nòng pháo plasma hướng lên; bốn ống xả vuông ở đuôi. Rãnh LED lam plasma #29B6F6 chạy vuông góc trên giáp vai và dọc rãnh nạp của bốn nòng, tương phản với vỏ cam. Lò phản ứng lam giữa ngực. Khác biệt: dáng khối chữ nhật và đối lập vỏ cam – đèn lam.
9. **Thiên Khung.** Chiến cơ tốc độ, cánh kép tách lớp, đuôi cánh nhạn kéo dài. Thân thon bạc #CFD8DC phối lam; cặp cánh trong liền thân, cặp phân cánh ngoài tách qua một khe hẹp; hai đuôi gió dài. Rãnh LED lam biển #2979FF uốn liền mạch từ mũi qua hai phân cánh xuống chóp đuôi. Buồng lái pha lê lam dọc sống lưng. Khác biệt: khe hở tách mỗi bên cánh thành hai lớp.
10. **Tinh Hà.** Mẫu hạm chỉ huy khung chữ H, hai khoang phóng chạy dọc hai sườn. Cầu chỉ huy trung tâm lùi nhẹ về sau; hai thân phụ hình hộp màu thép lục quân #3B4D3B; bốn vòi phun vuông. Đường băng LED **lục radar #5BE35B** bẻ góc 90° chạy trên mặt hai khoang phóng và nối ngang qua cầu chỉ huy. Trạm radar lục giác phát sáng lục ở giữa cầu nối. Khác biệt: hai đường băng vuông vức song song hai bên thân.
11. **Thôn Tinh.** Chiến cơ săn mồi với cặp càng cơ khí vươn lên trước thành gọng kìm. Thân ngắn và bè, thép than #2C3A40 (cạnh vát vẫn bắt sáng); hai cánh là đôi càng dày uốn cong khép mũi về trước. Rãnh LED ngọc thẫm #00BFA5 chạy dọc mép răng cưa bên trong đôi càng và cuốn về tâm. Lõi tối viền ngọc rực sáng giữa họng kìm. Khác biệt: càng kẹp vươn cao hơn cả mũi tàu.
12. **Thời Không.** Các mảnh giáp hình thoi lơ lửng quanh lõi, không có khớp nối. Trục giữa mảnh như kim đồng hồ, trắng titan #DCE4EC; bốn tấm cánh hình thoi tách rời, đối xứng, cách thân bằng khe sáng; đuôi mũi kim. Viền LED cực quang #18FFFF bọc các cạnh trong của từng mảnh, như từ trường giữ chúng lại. Quả cầu thời gian phát sáng ở tâm bốn mảnh cánh. Khác biệt: các khe trống xuyên thấu giữa thân và mảnh cánh.
13. **Hư Không.** Dáng vương miện gai uy quyền. Thân bọc giáp xám tím than #3A3650 có khe nứt lộ năng lượng; hai cánh xòe thành sáu mũi gai vương miện hướng lên; đuôi giáp dài. Mạch LED tím #B388FF chạy dọc sáu mũi gai và len trong khe nứt trên sống lưng. Lõi đa diện tím – trắng giữa lồng ngực hé mở. Khác biệt: vòm sáu gai nhọn ở nửa trên thân.

## Phụ lục B. Tàu địch (định hướng; danh sách tệp và khổ ảnh sẽ gửi khi vào đợt vẽ địch)

| Họ quái | Hình khối | Chất liệu | Cách phát sáng đỏ – hồng | Chi tiết "ác mộng" |
|---|---|---|---|---|
| Thiết giáp hạng nặng (chương 1–3) | Khối hộp chữ V ngược, vai phình, mũi tù bọc lưỡi ủi | Thép đen xước, gang gỉ, đinh tán lớn | Mắt đỏ hẹp ngang, khe thông gió nung đỏ ở ngực | Hàm nghiền răng cưa ở mũi, cụm pháo đa nòng thô |
| Tinh thể ký sinh (chương 4–5) | Bất đối xứng nhẹ, khung tàu bị gai khoáng đâm xuyên | Đá hắc diện nhám, kim loại bị ăn mòn | Mạch dung nham rỉ sáng qua vết nứt | Khối u tinh thể hồng mọc lệch một bên cánh |
| Cơ sinh thực thể (chương 6–8) | Bọ cạp, sâu bọ vũ trụ, lồng xương sườn kim loại | Kitin tím đen bóng, ống dẫn dịch, cáp lộ thiên | Cụm nhiều mắt đỏ xếp vòng cung, túi năng lượng hồng | Càng kẹp gai chĩa xuống, hàm dưới tách đôi lộ họng pháo |
| Cỗ máy hư không (chương 9–10) | Hình học dị giới: tháp nhọn, vòng cắt hở | Hợp kim đen hút sáng, rãnh khắc sắc cạnh | Nét khắc neon hồng và đỏ quanh hố tối ở bụng | Cánh tay pháo lơ lửng tách khỏi thân, một con mắt lớn ở lõi |

Tương quan cỡ trong trận so với chiến cơ phe ta: quái thường 1,15–1,35 lần · tinh anh 1,75–2,1 lần · boss rộng 75–85 % chiều ngang màn hình, tách rõ **một lõi giữa và hai cánh hai bên**.

## Phụ lục C. 13 bộ trang bị (định hướng)

| Bộ | Hình khối chủ đạo | Màu đèn | Kiểu rãnh LED | Cách mở khi lên siêu cấp |
|---|---|---|---|---|
| 01 Thành Trì | Khiên lục giác, tháp pháo vuông | Cam đồng #FF8A65 | Viền dọc mép vát lục giác | Hai tấm chắn hông trượt ngang, lộ rãnh phóng điện |
| 02 Kính Băng | Lăng kính thoi, đĩa cắt | Lam băng #80D8FF | Đường thẳng cắt qua mặt gương | Các mảnh lăng kính tách nhẹ theo hướng tâm |
| 03 Quỹ Đạo | Cánh cung hở, vòng tụ điện | Xanh lơ #26C6DA | Dải cong theo lòng máng cung | Hai đầu cung mở rộng, lõi cầu nhô lên trước |
| 04 Dịch Pha | Khối đa diện lệch, mũi tiêu | Tím khói #9575CD | Mạch đứt đoạn ở góc nhọn | Vỏ trượt lệch về sau, lộ lõi tím |
| 05 Long Viêm | Đầu rồng cơ khí, ống xoắn | Cam lửa #FF7043 | Răng cưa dọc sống hàm | Hai hàm giáp mở sang hai bên |
| 06 Nano | Tổ ong lục giác | Lục ngọc #26A69A | Lưới nối các mắt lục giác | Các ô giáp nâng lên, lộ khe sáng bên dưới |
| 07 Thánh Quang | Mũi thương, đôi cánh | Trắng lam #B3E5FC | Nét mảnh dọc lông cánh | Đôi cánh xòe dọc về trước ôm mũi thương |
| 08 Vực Tối | Mỏ neo, ngư lôi | Tím sẫm #7E57C2 | Hai đường hội tụ về mũi | Hai ngạnh neo bật xuống, mở cổng năng lượng |
| 09 Thiên Ân | Đôi cánh, vòng hở | Xanh ngọc #4DD0E1 | Nét mềm viền từng tầng lông | Ba tầng cánh xòe lên như cánh cung hở |
| 10 Kỳ Hạm | Boong tàu sân bay, bệ phóng | Lam hạm #42A5F5 | Đường băng kẻ vạch vuông góc | Nắp hầm trượt sang hai mạn, nâng dàn tên lửa |
| 11 Phệ Tinh | Hàm bọ cánh cứng | Lục #66BB6A | Gân phân nhánh như mạch sinh học | Cặp ngàm mở về trước, lộ họng phóng |
| 12 Nghịch Thời | Đồng hồ cát, kim góc cạnh | Lam cực #00E5FF | Vạch chia độ quanh tâm | Hai nửa khung tách dọc, bốn mũi kim nhô ra |
| 13 Hoàng Đế | Ấn vuông, kiếm bản rộng | Tím đế #AB47BC | Mạch vuông vức | Vỏ bao kiếm tách hai bên, lưỡi kiếm tím và ấn trắng trồi lên |


## Phụ lục D. Góp ý Gemini V225 đã lọc (Claude và chủ dự án dùng làm chuẩn)

### D.1 Sửa ảnh chủ tàu 7 V225 (giữ nguyên dáng, màu, bố cục; chỉ sửa 6 điểm)

1. **Tay đòn nối cánh**: đang cùng tông xám tối với nền trận nên ở cỡ nhỏ lưỡi liềm trông như bay rời. Thêm một gờ crôm sáng và một rãnh LED lam điện #3FD8FF mảnh chạy dọc mỗi thanh giằng.
2. **Hai nòng pháo cạnh lõi ngực**: kéo nhô mũi nòng lên ngang khớp mũi tàu, mạ vành crôm sáng ở miệng nòng.
3. **Mũi tàu**: đang trơn như mũi tên đúc liền. Xẻ thành 2 lớp lưỡi dao kim loại kẹp một khe sáng lam điện ở giữa sống mũi.
4. **Hai họng động cơ đuôi**: đang lộ cả lòng ống như nhìn nghiêng 45°. Thu hẹp elip cho đúng góc nhìn thẳng từ trên xuống.
5. **Viền lam ở mép ngoài hai lưỡi liềm**: làm mảnh hơn khoảng một nửa, chỉ sáng ở lưỡi cắt; trong trận viền dày trông giống một vòng cung bao quanh tàu.
6. **Khử 2,3 % sắc đỏ – hồng ở gờ giáp tím**: vùng bắt sáng trên mặt giáp tím cạnh khe tản nhiệt và đuôi cánh đang ngả tím hồng (magenta); kéo lạnh về chàm #7C4DFF hoặc lam #3FD8FF.

### D.2 Tiến hóa 6 bậc tàu 7 (cùng thân lõi, lớn dần theo cỡ mục 2.4)

| Bậc | Thêm gì |
|---|---|
| thuong | Thân ngắn; mỗi bên 1 lưỡi liềm đơn bản hẹp gắn qua 1 thanh giằng thẳng; 1 họng xả; chưa có ống dẫn crôm ở bụng |
| luc | Lưỡi liềm dày hơn, có gờ crôm ở sống đao; đuôi tách 2 họng xả tròn nhỏ; 2 khe tản nhiệt ngang ở ngực |
| lam | Tay đòn thành khung chữ Y có chốt xoay tròn đèn lam #3FD8FF; 2 nòng pháo lộ thiên hai bên lõi |
| tim | Như ảnh chủ đã sửa: lưỡi liềm lớn có lưỡi cắt plasma lam, ống thủy lực crôm dưới bụng, lõi ngực hình thoi |
| tim5 | Trên lưng mỗi lưỡi liềm thêm 1 lưỡi đao phụ ngắn xếp lớp (đao kép 2 tầng); 2 chốt tụ điện ở đầu mũi đao |
| ss | Đao kép tách khe sáng xuyên giữa 2 lớp lưỡi; đầu tay đòn có cặp bánh răng hãm crôm; mũi tàu vươn dài thành đầu đao 3 ngạnh |

### D.3 Bạo Tẩu tàu 7

- **Thân (`_bt`, diện tích 1,25–1,35 lần bản thường)**: khớp tròn trên tay đòn xoay khoảng 15°, đẩy hai lưỡi liềm vươn rộng sang hai bên và nhô mũi đao lên trước; mỗi lưỡi liềm trượt tách thành 2 lớp trong – ngoài, giữa là khe sáng lam điện #3FD8FF. Hai tấm giáp tím ốp lõi ngực trượt xuống khoảng 8 px để lộ buồng lõi, đẩy 2 nòng pháo nhô hẳn lên trước.
- **Ánh sáng sau lưng (`tau7_fx_sang.png`, làm lại khi tới lượt bộ hiệu ứng)**: 3 cặp lưỡi sáng mảnh hình lưỡi liềm (viền chàm #7C4DFF, lõi lam điện #3FD8FF pha trắng) xòe ra từ phía sau hai tay đòn theo thế cánh quạt ôm vòng lấy sườn tàu, mũi các lưỡi sáng đều uốn cong hướng lên trên, song song với cánh đao kim loại.

### D.4 Ý tưởng cơ khí cho 12 tàu còn lại (dùng khi tới lượt từng tàu; bổ sung cho bảng mục 7 và mục 12.A)

| Tàu | Khung · 3 bộ phận nhận diện | Vũ khí lộ thiên · cơ khí hóa chi tiết mềm |
|---|---|---|
| 1 Phượng Hoàng | Khung xương cánh gập chữ Z · 3 tầng phiến cánh xếp ngói · buồng đốt giữa lộ lưới tản nhiệt cam · 2 ống xả đa giác có cánh chỉnh hướng | 2 súng máy nòng đôi dưới nách cánh · lông vũ thành lá thép vát nhọn gắn trục bản lề crôm dọc xương cánh |
| 2 Cực Quang | Khung chữ H hẹp dọc · cặp thanh ray từ trường dài kẹp khe mũi · 4 cuộn cảm crôm dọc hai ray · lõi tụ quang hình trụ | Lòng máng giữa hai ray là nòng laser · dải sáng mềm thành các đốt khóa ray chữ U bằng thép xếp đều |
| 3 X-Dực Băng | Khung lục giác 4 nhánh chéo · 4 cụm cánh tản nhiệt vát mặt kim cương · bình nén nitơ crôm hai hông · buồng lạnh lục giác ở tâm | 2 bệ phóng đạn băng ở khớp gập cánh trước · gai băng thành phiến giáp đa diện cắt góc 60° ghép chốt thép |
| 4 Thần Ma | Khung tam giác ngược dồn về mũi · mũi khoan xoắn 3 rãnh · 2 xi-lanh thủy lực đẩy mũi khoan · cặp cánh hộ vệ vát xuôi ôm sườn | Mũi khoan + 2 pháo axit sát gốc mũi · axit thành ống lõi kính sáng lục #9BE83A trong khung thép |
| 5 Thự Quang | Khung vòm ngang · đĩa xoay chia độ giữa lưng · 5 cụm nòng dẹt xếp nan quạt · 3 họng phản lực dàn ngang | Đầu mỗi nan là miệng pháo tán xạ · nan quạt thành thanh giá pháo có rãnh trượt nối mâm xoay bánh răng ở tâm |
| 6 U Linh | Khung thoi mảnh · 6 thanh lăng kính kim loại vuốt về đuôi · vòng gá bán nguyệt giữ các thanh · lõi hội tụ giọt nước vát cạnh | 2 đầu phát laser mảnh hai bên mũi · đuôi lông công thành thanh kiếm quang học bọc crôm nối khớp xoay |
| 8 Phần Thiên | Khung chữ nhật hạng nặng · vai giáp hộp dày · 4 nòng plasma dài trên vai · 4 cửa xả nhiệt vuông ở đuôi | 4 trọng pháo có rãnh nạp đạn lam #29B6F6 · giáp phẳng bắt ốc, khớp giảm giật lò xo, thanh tản nhiệt thép |
| 9 Thiên Khung | Khung hai lớp cánh · cánh trong gắn thân, cánh ngoài tách qua thanh chống · 2 đuôi gió dài · buồng lái dọc sống lưng | 2 cụm tên lửa ở khe giữa hai lớp cánh · cánh mềm thành cánh cụp – xòe có bản lề crôm ở gốc |
| 10 Tinh Hà | Khung tàu sân bay chữ H · 2 boong phóng hình hộp song song · cửa hầm tên lửa nắp gập · đĩa radar lục giác đèn #5BE35B | Đầu tên lửa nhô khỏi giàn phóng ở vai, 2 máy bay con trên ray trượt · vạch đường băng LED #5BE35B, cần cẩu khóa trên boong |
| 11 Thôn Tinh | Khung bệ ngang hạng nặng · đôi càng kẹp vươn qua mũi · 2 piston thủy lực lớn đẩy càng · lõi hút viền ngọc #00BFA5 | Mép trong càng có răng cưa plasma, họng phóng ở giữa hàm · càng thành kìm công nghiệp ghép tấm thép than có chốt xoay |
| 12 Thời Không | Trục kim đồng hồ + 4 mô-đun cánh rời · 4 khối cánh hình thoi tách qua khe hở · đầu cực từ trường giữ cánh · lõi cầu bánh răng | 4 mũi kim phóng tia ở 4 khối cánh · "lơ lửng" thành khớp khóa từ tính crôm, giữa có hồ quang #18FFFF mảnh |
| 13 Hư Không | Khung pháo đài nhiều tầng · 6 trụ gai cơ khí xếp vương miện · lồng ngực tách đôi có gông giữ lõi · rãnh nứt lộ mạch lục #69F0AE | Đầu 6 gai là đầu phát tia + pháo chính ở ngực · vết nứt thành khe trượt giữa các tấm giáp nối cáp thép |

Mỗi tàu vẫn giữ màu ở mục 7 và các luật mục 2. Đèn, hồ quang, khe sáng đều mảnh.

### D.5 Ba họ tàu địch kiểu cỗ máy nặng (cho phụ lục B; đèn đỏ #FF334F, hồng #F50057)

1. **Máy khai khoáng – nghiền phế liệu**: khối hộp chữ V ngược đồ sộ, giáp gang sẫm trầy xước; phía trước là càng kẹp thủy lực hoặc trục lăn răng cưa đẩy bằng piston crôm lộ thiên; (tương tự kết cấu càng cơ khí của boss trong ảnh tham chiếu); mắt cảm biến tròn đỏ #FF334F nằm sâu trong hốc thép giữa trán và dọc hai vai, khe lò đốt sáng hồng #F50057.
2. **Pháo đài thủy lực – khiên chắn**: bè ngang như bức tường thép di động; hai tấm khiên khổng lồ hai mạn đóng mở bằng tay đòn chữ X và ống dầu áp lực; khi khiên mở lộ ổ pháo xoay nhiều nòng và lõi lò đỏ – hồng ở bụng.
3. **Giáp trùng cơ giới nhiều chân**: bọ cạp hoặc nhện máy công nghiệp; lồng xương thép đen quanh khoang lõi; 4–6 chân gấp khúc gắn lưỡi cưa hoặc nòng pháo; đầu có 6–8 mắt kính quang học đỏ, cáp năng lượng hồng chạy dọc khớp chân.

Boss không đặt tên riêng trong tranh.
