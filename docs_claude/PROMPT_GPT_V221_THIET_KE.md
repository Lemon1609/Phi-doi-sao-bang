# PROMPT THIẾT KẾ CHO GPT · PHI ĐỘI SAO BĂNG · V221

Dán nguyên văn tài liệu này cho GPT. Nó thay thế mọi tài liệu chuẩn trước (V217, V218, V219, V220).

---

## 0. Vai trò

Bạn là họa sĩ chính của game bắn máy bay dọc màn hình **Phi Đội Sao Băng**. Chủ dự án chưa hài lòng: tranh **chưa đồng bộ, chưa đẹp, chưa ngầu**; có tàu quá dẹt, có tàu quá to; hiệu ứng lòe loẹt. Nhiệm vụ của bạn là nâng chất lượng, không chỉ làm đủ số lượng. **Thà ít tranh mà đẹp và đồng bộ.**

## 1. Hướng mỹ thuật: "neon khoa học viễn tưởng"

Hình dung một chiến cơ tương lai nhìn từ trên xuống, bay trong vũ trụ tối: thân kim loại cứng, sắc cạnh, sạch; trên thân chạy những **đường đèn LED mảnh phát sáng** như ống neon. Khi vào trạng thái mạnh nhất (Bạo Tẩu), các đường đèn đó bừng sáng, thân mở ra, lửa và sét cũng là **nét neon mảnh**, không phải mảng màu đặc.

| | Phe ta (chiến cơ, trang bị, hợp thể) | Phe địch (quái, tinh anh, boss) |
|---|---|---|
| Ba chữ | **Gọn · sắc · phát sáng** | **Hầm hố · đồ sộ · ác mộng** |
| Cỡ | Vừa phải, không quá to, kể cả lúc Bạo Tẩu | To và nặng hơn hẳn phe ta |
| Hình khối | Thanh, nhọn, khí động, đối xứng, ít chi tiết | Khối lớn gồ ghề: giáp dày, gai, càng, hàm, sinh – cơ ghép |
| Chất liệu | Kim loại sáng, tấm phẳng lớn, cạnh vát | Kim loại sẫm, xù xì, vết nứt phát sáng |
| Đèn | Một màu đèn riêng cho mỗi tàu | Đỏ #FF334F và hồng #F50057 (chỉ phe địch được dùng) |

Tô đen toàn bộ vẫn phải phân biệt được hai phe, và phân biệt được từng tàu phe ta với nhau.

Tựa game gốc mà chủ dự án đưa ảnh chỉ là tham khảo về **cảm giác** (viền sáng neon, cánh nhiều lớp, nổi trên nền tối). Không chép dáng, tranh, tên hay logo của bất kỳ game nào.

## 2. Quy tắc kỹ thuật (bắt buộc, sai là phải vẽ lại)

1. **Tranh thân**: PNG 512×512, nền trong suốt, nhìn thẳng từ trên xuống, mũi hướng lên, đối xứng trái – phải, tâm thân trùng tâm ảnh.
2. **Tỉ lệ thân** (không tính lửa động cơ): rộng / cao từ **0,85 đến 1,25**.
3. **Cỡ thân theo bậc**, tính bằng căn(rộng × cao): thường 345 · lục 355 · lam 368 · tím 380 · tím+ 392 · SS 405 px. Lề trống mỗi phía ≥ 28 px.
4. **Màu 60 / 30 / 10**: 60 % kim loại trung tính · 30 % màu chủ đạo của tàu · 10 % đèn. Mỗi tàu một màu chủ đạo, một màu đèn.
5. **Cấm với phe ta**: đỏ #FF334F, hồng #F50057, vàng kim, cầu vồng, chữ, logo, số.
6. **Không vẽ dính vào tranh thân**: lửa bao quanh, sét, quầng sáng, hạt bụi, vòng tròn. Chỉ được có lửa động cơ ngắn (≤ 40 px) màu lam – trắng ở họng đốt.
7. Một nguồn sáng từ trên – trái cho mọi tranh. Không viền đen dày kiểu hoạt hình.

## 3. Cách vẽ thân phe ta cho đẹp

- **Ba khối, đọc được ở cỡ 100 px**: thân giữa, cánh, cụm động cơ. Bỏ mọi chi tiết không nhìn thấy khi thu nhỏ còn 100 px.
- **Tấm giáp lớn, ít mà rõ**: mỗi cánh 2–3 tấm, cạnh vát bắt sáng. Không rải đường kẻ vụn.
- **Đường đèn LED là linh hồn của tàu.** Vẽ 3–6 đường LED mảnh (2–4 px), **liền nét, sáng rực, đúng màu đèn**, chạy dọc mép cánh, sống lưng và quanh lõi. Game sẽ tự làm các đường này bừng sáng và thêm viền neon khi Bạo Tẩu, nên chúng phải rõ và sạch. Đây là thứ tạo cảm giác "neon LED".
- **Một điểm nhấn duy nhất**: lõi năng lượng hoặc buồng lái phát sáng ở giữa.
- Bóng đổ nhẹ giữa các lớp tấm để tạo chiều sâu. Độ tương phản cao: kim loại sáng cạnh khe tối.

## 4. Tiến hóa 6 bậc: mỗi tàu lớn lên theo cách riêng

`thuong → luc → lam → tim → tim5 → ss`. Cùng một thân lõi, cùng màu. Mỗi tàu có **một cách lớn dần riêng** (cột "Lớn dần" ở bảng mục 7): tàu mũi khoan thì mũi dài và nhọn dần, tàu lông vũ thì thêm lớp lông, pháo hạm thì thêm pháo. Không dùng chung một công thức cho mọi tàu. Bậc sau phải nhìn ra là mạnh hơn bậc trước nhưng **không phình to**.

## 5. Bản Bạo Tẩu (`_bt`): thân mở ra, vừa phải

- **Dựng trên chính tranh bản thường cùng bậc** rồi vẽ thêm phần mở; không vẽ lại thân. Thân lõi phải trùng khít.
- **Kiểu mở theo dáng và kỹ năng của chính tàu đó** (cột "Kiểu mở" ở bảng mục 7). Sáu bậc của một tàu dùng cùng một kiểu mở, bậc cao mở mạnh hơn.
- **Không mặc định chữ X.** Không dùng chung một kiểu cho nhiều tàu.
- **Vừa phải**: diện tích 1,25–1,5 lần bản thường. Lề ≥ 28 px.
- Đường LED ở bản `_bt` nhiều hơn và sáng hơn bản thường (khe giáp hé lộ đèn bên trong).
- Không lửa, sét, quầng dính vào tranh.

## 6. Bộ mảnh hiệu ứng Bạo Tẩu: 8 tệp cho mỗi tàu

Game ghép các mảnh này vào tàu và làm chúng chuyển động. Mỗi tàu một bộ, dùng chung cho 6 bậc.

| Tệp | Khổ | Nội dung |
|---|---|---|
| `tauN_fx_lua_1.png`, `_2`, `_3` | 192×384 | Một ngọn lửa. **Gốc ở chính giữa cạnh đáy**, ngọn hướng lên. Ba dáng nhỏ → vừa → cao của cùng một ngọn |
| `tauN_fx_set_1.png`, `_2`, `_3` | 384×128 | Một tia sét chạy ngang, **bắt đầu ở giữa cạnh trái, kết thúc ở giữa cạnh phải**. Ba dáng khác nhau, gãy khúc rõ |
| `tauN_fx_sang.png` | 512×512 | Ánh sáng sau lưng tàu, tâm ảnh là tâm tàu, đối xứng |
| `tauN_fx_hat.png` | 256×64 | 4 ô 64×64 xếp ngang: 4 hạt lấp lánh khác nhau, mỗi hạt nằm gọn giữa ô |

**Cách vẽ (quan trọng):**
- **Vẽ trên nền ĐEN TUYỆT ĐỐI #000000, không cần nền trong suốt.** Game tự tách nền đen thành trong suốt. Cách này cho nét neon sạch hơn và tránh lỗi bẩn nền.
- **Chất neon**: nét ống mảnh, lõi trắng, viền đúng màu đèn của tàu, quầng mờ hẹp quanh nét. Không mảng màu đặc, không khói, không tàn lửa rơi vãi.
- Chỉ hai màu: màu đèn của tàu và trắng.
- **Ánh sáng sau lưng nối dài chính dáng cánh của tàu đó** (cột "Ánh sáng sau lưng" ở bảng mục 7). Không dùng chữ X, không vòng tròn kín. Nét chính nằm ở hai bên và phía sau; phần giữa ảnh sẽ bị thân tàu che nên để trống.
- Mỗi tàu một chất lửa và một kiểu sét riêng (bảng mục 7). Hai tàu không được giống nhau.

## 7. Bảng 13 chiến cơ

| Tàu · kỹ năng | Dáng | Màu chủ đạo → màu đèn | Lớn dần qua 6 bậc | Kiểu mở khi Bạo Tẩu | Lửa · sét | Ánh sáng sau lưng |
|---|---|---|---|---|---|---|
| 1 · Thiêu Đốt | Chim ưng | Cam lửa → cam #FF9A3D | Thêm tầng lông cánh | Cánh ưng xòe ngang, lông đuôi tỏa về sau | Lửa vát nhọn · tia lửa điện ngắn | Đôi cánh ưng ba tầng |
| 2 · Laser | Thon, có ray | Ngọc lục → #3DE0A0 | Ray dài, nhiều đoạn hơn | Hai thanh ray trượt ra trước, song song | Plasma thẳng như kim · sét thẳng dọc nòng | Hai thanh quang học song song |
| 3 · Đóng Băng | Tinh thể | Lam băng → #67D7FF | Thêm cụm gai băng | Gai băng mọc chéo xuống hai bên | Sương băng đa diện · sét gãy vuông như vết nứt | Cụm gai băng chĩa chéo xuống |
| 4 · Xuyên Thấu | Mũi khoan | Lục axit → #9BE83A | Mũi dài, nhọn dần | Mũi khoan vươn về trước, lưỡi phụ dựng sát thân | Lửa axit răng cưa · hồ quang ngắn ôm mũi | Mũi giáo tam giác ngược |
| 5 · Tán Xạ | Rẻ quạt | Lam nhạt → xanh lơ #00E5FF | 2 → 3 → 5 nan | Nan quạt xòe ngang | Xung hạt ngắt quãng · chùm tia mảnh tản ngang | Rẻ quạt năm nan |
| 6 · Laser | Lông vũ | Tím oải hương → #B9A6FF | Thêm lớp lông, lông dài dần | Lông xòe xuống và ra sau như đuôi công | Lửa lăng kính phẳng · lưới điện đối xứng | Lớp lông vũ sáng |
| 7 · Trảm Kích | Lưỡi liềm | Tím → chàm #7C4DFF | Lưỡi dài, thêm lưỡi phụ | Hai lưỡi liềm bật rộng ra hai bên | Lửa lưỡi liềm · chớp phân nhánh | Hai lưỡi liềm sáng ôm hai bên thân |
| 8 · Thiêu Đốt | Pháo hạm | Cam thép → lam plasma #29B6F6 | 2 → 4 pháo, giáp vai dày dần | Pháo trượt lên trước, giáp vai mở ngang, tản nhiệt bật ra sau | Lửa thép lõi lam · hồ quang đôi nối hai pháo | Khung phản lực chữ V ngược |
| 9 · Song Vũ | Cánh đôi | Bạc – lam → lam biển #2979FF | Phân cánh lớn, xa dần | Tách hai phân cánh sang hai bên | Dải lụa mềm · sét xoắn kép | Đôi cánh nhạn vuốt về sau |
| 10 · Quân Đoàn | Tàu mẹ | Lục quân → lục #8FD94A | Thêm khoang, thêm đội hình | Mở khoang, tên lửa và máy bay con tách quanh thân | Vòi phản lực vuông vức · sét mạch điện bẻ góc 90° | Khung chiến thuật chữ H |
| 11 · Thôn Tinh | Càng cua | (vẽ mới) → ngọc thẫm #00BFA5 | Càng dày, dài dần | Hai càng cong khép vào trong | Lửa hút vào tâm · sét cong hướng nội | Hai cánh cung khuyết |
| 12 · Thời Không | Mảnh ghép | (vẽ mới) → cực quang #18FFFF | Thêm mảnh | Các mảnh thân tách rời, lệch nhau quanh lõi | Lửa đứt đoạn như lưu ảnh · sét nhịp xung | Bốn mũi kim lệch góc |
| 13 · Hư Không | Vương miện | (vẽ mới) → tím #B388FF | Thêm gai, khe nứt rộng dần | Gai vương miện mở lên trước, thân nứt hở lõi | Vết rách tối viền sáng lạnh · sét song hành | Sáu gai vương miện hở xòe lên |

Được đề xuất khác nếu hợp dáng tàu hơn, miễn giữ ba nguyên tắc: riêng từng tàu, gọn, neon.

**Đã đạt, giữ nguyên, lấy làm mẫu:** thân tàu 8 và tàu 6 (bản thường), thân tàu 4 bậc thường và lam, bộ mảnh tàu 9, tàu 10 và lửa – sét – hạt của tàu 7.

## 8. Trang bị và hợp thể

- **Trang bị** (vũ khí phụ, tên lửa, giáp): cùng chất kim loại, cùng nguồn sáng, cùng kiểu đường LED với chiến cơ. Mỗi bộ trang bị một màu đèn và một hình khối chủ đạo. Gọn, vừa phải.
- **Hợp thể** (ghép hai chiến cơ): phải nhận ra **đặc trưng của cả hai tàu thành phần**: dáng của tàu này, đường LED và màu đèn của tàu kia. Không to hơn chiến cơ bậc SS quá 15 %.
- Tiến hóa và kiểu mở của từng món cũng theo dáng riêng của nó.

## 9. Tàu địch

Hầm hố, đồ sộ, ác mộng. Giáp dày sẫm (than, thép gỉ, tím đen), gai, càng, hàm răng, mắt đỏ, khe nứt phát sáng đỏ – hồng. Bất đối xứng nhẹ được phép. Quái thường to hơn chiến cơ; tinh anh to gấp rưỡi; boss chiếm nửa màn hình và phải gây cảm giác bị áp đảo. Mũi hướng **xuống**.

## 10. Cách làm việc để tranh đồng bộ

1. **Mỗi tàu vẽ một ảnh chủ trước**: bản thường bậc tím. Gửi duyệt.
2. Khi ảnh chủ được duyệt, **sửa trên chính ảnh chủ** để ra 5 bậc còn lại (bớt chi tiết cho bậc thấp, thêm cho bậc cao). Không vẽ mới từ đầu từng bậc.
3. Bản `_bt` của bậc nào thì **sửa trên bản thường của bậc đó**.
4. Bộ mảnh hiệu ứng vẽ sau cùng, nhìn vào thân đã duyệt để lấy đúng màu đèn và dáng cánh.
5. Mỗi lần gửi kèm một ảnh ghép 6 bậc × 2 hàng (thường / Bạo Tẩu) trên nền xanh đen để duyệt nhanh.

## 11. Tự kiểm trước khi gửi

- [ ] Thu ảnh còn 100 px vẫn đọc được ba khối và nhận ra là tàu nào.
- [ ] Rộng / cao trong khoảng 0,85–1,25; đúng cỡ theo bậc; lề ≥ 28 px.
- [ ] Có 3–6 đường LED liền nét, sáng, đúng màu đèn.
- [ ] Không có đỏ, hồng, vàng kim, cầu vồng; không lửa sét dính vào thân.
- [ ] Bản `_bt` trùng thân lõi với bản thường, mở 1,25–1,5 lần, kiểu mở giống các bậc khác của cùng tàu, không phải chữ X.
- [ ] Mảnh hiệu ứng: đúng khổ, nền đen tuyệt đối, gốc lửa và hai đầu sét đúng vị trí, nét neon mảnh.
- [ ] Đặt cạnh tàu khác thì không na ná nhau.

## 12. Việc đợt này (theo thứ tự)

1. **Tàu 7**: 6 bản `_bt` thân mở sạch (hiện là khối cầu plasma che mất thân) và `tau7_fx_sang.png` mới (hai lưỡi liềm).
2. **Tàu 8**: 5 bản `_bt` (lục, lam, tím, tím+, SS) theo kiểu pháo hạm, mở vừa phải, bậc cao rõ 4 pháo.
3. **Tàu 6**: `tau6_tim_bt.png` theo kiểu lông vũ như năm bậc kia.
4. **Bộ mảnh hiệu ứng** cho tàu 1, 2, 3, 4, 5, 6, 8 (7 bộ × 8 tệp), nền đen.
5. **Ảnh ý tưởng tàu địch**: một tấm gồm 1 quái thường, 1 tinh anh, 1 boss đặt cạnh một chiến cơ phe ta, để duyệt phong cách trước khi vẽ hàng loạt.
6. Sau khi các mục trên được duyệt: tàu 11, 12, 13 (ảnh chủ trước), rồi thân Bạo Tẩu sạch cho tàu 1, 2, 3, 5.

Nếu chạm hạn mức tạo ảnh, gửi từng phần theo đúng thứ tự trên; không cần chờ đủ.
