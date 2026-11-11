# PROMPT THIẾT KẾ CHO GPT · PHI ĐỘI SAO BĂNG · V222

Dán nguyên văn tài liệu này cho GPT. Nó thay thế mọi tài liệu chuẩn trước (kể cả V221). Bản này đã gộp góp ý của Gemini (giám đốc mỹ thuật) và các quyết định của chủ dự án.

---

## 0. Vai trò

Bạn là họa sĩ chính của game bắn máy bay dọc màn hình **Phi Đội Sao Băng**. Chủ dự án chưa hài lòng: tranh **chưa đồng bộ, chưa đẹp, chưa ngầu**; có tàu quá dẹt, có tàu quá to; hiệu ứng lòe loẹt. Nhiệm vụ là nâng chất lượng, không chỉ làm đủ số lượng. **Thà ít tranh mà đẹp và đồng bộ.**

## 1. Hướng mỹ thuật: "neon khoa học viễn tưởng"

Một chiến cơ tương lai nhìn từ trên xuống, bay trong vũ trụ tối: thân kim loại cứng, sắc cạnh, sạch; trên thân có những **rãnh đèn LED phát sáng** như ống neon. Khi vào trạng thái mạnh nhất (Bạo Tẩu), các rãnh đèn bừng sáng, thân mở ra; lửa và sét cũng là **nét neon mảnh**, không phải mảng màu đặc.

| | Phe ta (chiến cơ, trang bị, hợp thể) | Phe địch (quái, tinh anh, boss) |
|---|---|---|
| Ba chữ | **Gọn · sắc · phát sáng** | **Hầm hố · đồ sộ · ác mộng** |
| Cỡ | Vừa phải, không quá to, kể cả lúc Bạo Tẩu | To và nặng hơn hẳn phe ta |
| Hình khối | Thanh, nhọn, khí động, đối xứng, ít chi tiết | Khối lớn gồ ghề: giáp dày, gai, càng, hàm, sinh – cơ ghép |
| Kim loại | **Sáng**: bạc, titan, thép lạnh | **Sẫm**: than, thép gỉ, tím đen, xù xì |
| Đèn | Một màu đèn riêng cho mỗi tàu | Đỏ #FF334F và hồng #F50057 (chỉ phe địch được dùng) |

Tô đen toàn bộ vẫn phải phân biệt được hai phe, và phân biệt được từng tàu phe ta với nhau.

Tựa game gốc mà chủ dự án đưa ảnh chỉ là tham khảo về **cảm giác** (viền sáng neon, cánh nhiều lớp, nổi trên nền tối). Không chép dáng, tranh, tên hay logo của bất kỳ game nào.

## 2. Quy tắc kỹ thuật (bắt buộc, sai là phải vẽ lại)

1. **Hai loại tệp, hai loại nền, không lẫn:**
   - **Tranh thân tàu** (mục 2–5): PNG RGBA 512×512, **nền trong suốt**.
   - **8 tệp mảnh hiệu ứng rời** (mục 6): **nền đen đặc #000000**, không trong suốt.
2. Tranh thân: nhìn thẳng từ trên xuống, mũi hướng lên, đối xứng trái – phải, tâm thân trùng tâm ảnh.
3. **Tỉ lệ thân** (không tính lửa động cơ): rộng / cao từ **0,85 đến 1,25**.
4. **Cỡ thân theo bậc**, tính bằng căn(rộng × cao): thường 345 · lục 355 · lam 368 · tím 380 · tím+ 392 · SS 405 px. Không chiều nào vượt 456 px, để lề trống mỗi phía ≥ 28 px.
5. **Màu 60 / 30 / 10**:
   - 60 % **kim loại sáng** ba sắc độ: khe tối #2B3440 · mặt phẳng chính #8D9BAD · cạnh vát bắt sáng #E3EAF2. Không xám bệt, không bóng loáng như gương. (Tàu 11 và 13 có thân sẫm hơn theo bảng mục 7, nhưng cạnh vát vẫn phải bắt sáng và không tối bằng tàu địch.)
   - 30 % màu chủ đạo của tàu · 10 % đèn. Mỗi tàu một màu chủ đạo, một màu đèn.
6. **Cấm với phe ta**: đỏ #FF334F, hồng #F50057, vàng kim, cầu vồng, chữ, logo, số.
7. **Không vẽ dính vào tranh thân**: lửa bao quanh, sét, quầng sáng, hạt bụi, vòng tròn. Chỉ được có lửa động cơ ngắn (≤ 40 px) màu lam – trắng ở họng đốt.
8. Một nguồn sáng từ góc trên – trái của khung ảnh cho mọi tranh, cả hai phe. Không viền đen dày kiểu hoạt hình.

## 3. Cách vẽ thân phe ta cho đẹp

- **Ba khối, đọc được ở cỡ 100 px**: thân giữa, cánh, cụm động cơ. Bỏ mọi chi tiết không nhìn thấy khi thu nhỏ còn 100 px.
- **Tấm giáp lớn, ít mà rõ**: mỗi cánh 2–3 tấm, cạnh vát bắt sáng. Không rải đường kẻ vụn.
- **Rãnh đèn LED là linh hồn của tàu.** Vẽ 3–6 rãnh LED rộng 3–5 px, **liền nét**: chính giữa là lõi trắng #FFFFFF rộng 1 px, hai bên là viền màu đèn bão hòa tối đa, cả rãnh nằm lọt trong một khe giáp tối để nổi bật. Đặt dọc mép cánh, sống lưng và quanh lõi. Game sẽ tự làm các rãnh này bừng sáng và thêm viền neon khi Bạo Tẩu, nên chúng phải rõ và sạch.
- **Một điểm nhấn duy nhất**: lõi năng lượng hoặc buồng lái phát sáng ở giữa.
- Bóng đổ nhẹ giữa các lớp tấm để tạo chiều sâu. Tương phản cao: mặt kim loại sáng cạnh khe tối.

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

| Tàu · kỹ năng | Dáng | Màu chủ đạo → màu đèn | Lớn dần qua 6 bậc | Kiểu mở khi Bạo Tẩu | Lửa · sét | Ánh sáng sau lưng |
|---|---|---|---|---|---|---|
| 1 Phượng Hoàng · Thiêu Đốt | Chim ưng | Cam lửa #E65100 → cam #FF9A3D | Thêm tầng lông cánh | Cánh ưng xòe ngang, lông đuôi tỏa về sau | Lửa vát nhọn · tia lửa điện ngắn | Đôi cánh ưng ba tầng |
| 2 Cực Quang · Laser | Thon, hai ray | Ngọc lục → #3DE0A0 | Ray dài, nhiều đoạn hơn | Hai thanh ray trượt ra trước, song song | Plasma thẳng như kim · sét thẳng dọc nòng | Hai thanh quang học song song |
| 3 X-Dực Băng · Đóng Băng | Tinh thể (tàu duy nhất vốn có dáng cánh chéo) | Lam băng #0288D1 → #67D7FF | Thêm cụm gai băng | Gai băng mọc dài thêm ở đầu cánh | Sương băng đa diện · sét gãy vuông như vết nứt | Cụm gai băng chĩa chéo xuống |
| 4 Thần Ma · Xuyên Thấu | Mũi khoan | Lục axit #689F38 → #9BE83A | Mũi dài, nhọn dần | Mũi khoan vươn về trước, lưỡi phụ dựng sát thân | Lửa axit răng cưa · hồ quang ngắn ôm mũi | Mũi giáo tam giác ngược |
| 5 Thự Quang · Tán Xạ | Rẻ quạt | Lam nhạt #4FC3F7 → xanh lơ #00E5FF | 2 → 3 → 5 nan | Nan quạt xòe ngang | Xung hạt ngắt quãng · chùm tia mảnh tản ngang | Rẻ quạt năm nan |
| 6 U Linh · Laser | Lông vũ | Tím oải hương #7E57C2 → #B9A6FF | Thêm lớp lông, lông dài dần | Lông xòe xuống và ra sau như đuôi công | Lửa lăng kính phẳng · lưới điện đối xứng | Lớp lông vũ sáng |
| 7 Đao Phong · Trảm Kích | Lưỡi liềm | Tím sẫm #512DA8 → chàm #7C4DFF | Lưỡi dài, thêm lưỡi phụ | Hai lưỡi liềm bật rộng ra hai bên | Lửa lưỡi liềm · chớp phân nhánh | Hai lưỡi liềm sáng ôm hai bên thân |
| 8 Phần Thiên · Thiêu Đốt | Pháo hạm | Cam thép #D84315 → lam plasma #29B6F6 | 2 → 4 pháo, giáp vai dày dần | Pháo trượt lên trước, giáp vai mở ngang, tản nhiệt bật ra sau | Lửa thép lõi lam · hồ quang đôi nối hai pháo | Khung phản lực chữ V ngược |
| 9 Thiên Khung · Song Vũ | Cánh đôi | Bạc #CFD8DC – lam → lam biển #2979FF | Phân cánh lớn, xa dần | Tách hai phân cánh sang hai bên | Dải lụa mềm · sét xoắn kép | Đôi cánh nhạn vuốt về sau |
| 10 Tinh Hà · Quân Đoàn | Tàu mẹ khung chữ H | Thép lục quân #3B4D3B → **lục #8FD94A** (chủ dự án chốt, không dùng lam) | Thêm khoang, thêm đội hình | Mở khoang, tên lửa và máy bay con tách quanh thân | Vòi phản lực vuông vức · sét mạch điện bẻ góc 90° | Khung chiến thuật chữ H |
| 11 Thôn Tinh | Càng cua | Thép than #2C3A40 → ngọc thẫm #00BFA5 | Càng dày, dài dần | Hai càng cong khép vào trong | Lửa hút vào tâm · sét cong hướng nội | Hai cánh cung khuyết |
| 12 Thời Không | Mảnh ghép rời | Trắng titan #DCE4EC → cực quang #18FFFF | Thêm mảnh | Các mảnh thân tách rời, lệch nhau quanh lõi | Lửa đứt đoạn như lưu ảnh · sét nhịp xung | Bốn mũi kim lệch góc |
| 13 Hư Không | Vương miện | Xám tím than #3A3650 → tím #B388FF | Thêm gai, khe nứt rộng dần | Gai vương miện mở lên trước, thân nứt hở lõi | Vết rách tối viền sáng lạnh · sét song hành | Sáu gai vương miện hở xòe lên |

Được đề xuất khác nếu hợp dáng tàu hơn, miễn giữ ba nguyên tắc: riêng từng tàu, gọn, neon.

**Đã đạt, giữ nguyên, lấy làm mẫu:** thân tàu 8 và tàu 6 (bản thường), thân tàu 4 bậc thường và lam, bộ mảnh tàu 9, tàu 10 và lửa – sét – hạt của tàu 7.

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

1. **Mỗi tàu vẽ một ảnh chủ trước**: bản thường bậc tím, theo lời tả ở phụ lục A. Gửi duyệt.
2. Khi ảnh chủ được duyệt, **sửa trên chính ảnh chủ** để ra 5 bậc còn lại (bớt chi tiết cho bậc thấp, thêm cho bậc cao). Không vẽ mới từ đầu từng bậc.
3. Bản `_bt` của bậc nào thì **sửa trên bản thường của bậc đó**.
4. Bộ mảnh hiệu ứng vẽ sau cùng, nhìn vào thân đã duyệt để lấy đúng màu đèn và dáng cánh.
5. **Vẽ từng tệp lẻ đúng khổ trước**, rồi dùng mã Python ghép thành tấm 6 bậc × 2 hàng (thường / Bạo Tẩu) trên nền xanh đen để duyệt nhanh. Không vẽ trực tiếp tấm ghép.

## 11. Tự kiểm trước khi gửi

- [ ] Thu ảnh còn 100 px vẫn đọc được ba khối và nhận ra là tàu nào.
- [ ] Rộng / cao trong 0,85–1,25; đúng cỡ theo bậc; không chiều nào quá 456 px.
- [ ] Kim loại sáng ba sắc độ; có 3–6 rãnh LED liền nét, lõi trắng, đúng màu đèn.
- [ ] Không đỏ, hồng, vàng kim, cầu vồng; không lửa sét dính vào thân.
- [ ] Bản `_bt` trùng thân lõi với bản thường, mở 1,2–1,4 lần, cùng kiểu mở với các bậc khác của tàu đó, không phải chữ X.
- [ ] Mảnh hiệu ứng: đúng khổ, nền đen đặc, gốc lửa và hai đầu sét đúng tọa độ, tâm ánh sáng sau lưng để trống, dải hạt không có vạch chia ô.
- [ ] Đặt cạnh tàu khác thì không na ná nhau.

## 12. Việc đợt này (theo thứ tự)

1. **Tàu 7**: 6 bản `_bt` thân mở sạch (hiện là khối cầu plasma che mất thân) và `tau7_fx_sang.png` mới (hai lưỡi liềm).
2. **Tàu 8**: 5 bản `_bt` (lục, lam, tím, tím+, SS) theo kiểu pháo hạm, mở vừa phải, bậc cao rõ 4 pháo.
3. **Tàu 6**: `tau6_tim_bt.png` theo kiểu lông vũ như năm bậc kia.
4. **Bộ mảnh hiệu ứng** cho tàu 1, 2, 3, 4, 5, 6, 8 (7 bộ × 8 tệp), nền đen.
5. **Ảnh ý tưởng tàu địch**: một tấm gồm 1 quái thường, 1 tinh anh, 1 boss đặt cạnh một chiến cơ phe ta, để duyệt phong cách trước khi vẽ hàng loạt.
6. Sau khi các mục trên được duyệt: ảnh chủ tàu 11, 12, 13; rồi thân Bạo Tẩu sạch cho tàu 1, 2, 3, 5.

Nếu chạm hạn mức tạo ảnh, gửi từng phần theo đúng thứ tự trên; không cần chờ đủ.

---

## Phụ lục A. Lời tả ảnh chủ (bản thường, bậc tím) của 13 chiến cơ

Mỗi đoạn dùng làm lời tả cho một ảnh. Nền kim loại là bộ ba sắc độ sáng ở mục 2.5.

1. **Phượng Hoàng.** Chim ưng săn mồi góc cạnh, sải cánh vát xuôi thành hình mũi tên. Thân giữa thuôn nhọn như mỏ ưng; mỗi cánh ba lớp tấm giáp cam lửa #E65100 xếp bậc thang; hai ống xả đa giác sát đuôi. Bốn rãnh LED cam #FF9A3D chạy dọc mép trước của ba tầng lông cánh rồi hội tụ về sống lưng. Lõi hình thoi phát sáng cam giữa ngực. Khác biệt: ba tầng cánh như lông vũ kim loại vát nhọn.
2. **Cực Quang.** Chiến cơ bắn tỉa như một khẩu pháo điện từ bay, thon nhưng vẫn giữ rộng / cao ≥ 0,85 nhờ hai cánh phụ. Thân trung tâm lùi về sau; cặp thanh ray từ trường dài vươn thẳng lên trước, kẹp một khe hở dọc ở mũi; hai cánh phụ gọn. Hai rãnh LED ngọc lục #3DE0A0 chạy song song suốt lòng máng hai thanh ray. Buồng tụ quang hình trụ pha lê ở giữa thân. Khác biệt: khe hở dọc ở mũi giữa hai ray.
3. **X-Dực Băng.** Tinh thể sắc nhọn với các mặt vát kim cương đối xứng. Thân lăng trụ lục giác; hai cánh chính vươn chéo lên trước, hai cánh phụ chĩa chéo xuống, màu lam băng #0288D1; đuôi thu gọn. Mạch LED #67D7FF gãy khúc 60° chạy theo gờ vát của các khối tinh thể. Lõi đông lạnh lam – trắng ở tâm. Khác biệt: bề mặt vát đa diện như băng cắt gọt.
4. **Thần Ma.** Đầu mũi giáo, trọng tâm dồn về mũi khoan phía trước. Mũi khoan cơ khí lớn chiếm nửa trước; hai cánh tam giác vát xuôi ôm sát sườn, lục axit #689F38; động cơ kép. Bốn rãnh LED #9BE83A từ hai cánh hội tụ về chóp mũi thành chữ V nhọn. Lõi sinh hóa lục chanh ngay gốc mũi khoan. Khác biệt: mũi nhọn vươn xa khỏi hai cánh.
5. **Thự Quang.** Rẻ quạt xòe ngang, bề ngang nhỉnh hơn chiều dọc (rộng / cao ≤ 1,25). Thân giữa ngắn; hai cánh chia thành năm nan pháo tách rời màu lam nhạt #4FC3F7; ba họng đốt xếp ngang ở đuôi. Năm rãnh LED xanh lơ #00E5FF chạy giữa năm nan, tỏa từ tâm. Đĩa phân phối xung hình lục giác giữa lưng. Khác biệt: cánh xẻ thành năm nan hướng ra năm góc.
6. **U Linh.** Chim công cơ khí thanh thoát, cánh xếp lớp mềm nhưng sắc cạnh. Thân mảnh như mũi kiếm; hai cánh là các phiến lông vũ quang học tím oải hương #7E57C2 vuốt dài về sau; động cơ chìm dưới đuôi. Sợi LED tím phấn #B9A6FF viền quanh từng phiến lông và đan trên sống lưng. Lăng kính hình giọt nước tím – trắng giữa ngực. Khác biệt: các phiến cánh xếp chồng vuốt về đuôi.
7. **Đao Phong.** Đôi lưỡi liềm uốn cong ôm lấy thân chính. Thân giữa nhỏ gọn; hai cánh là hai lưỡi đao cong, mũi hướng vào nhau, tím sẫm #512DA8; một động cơ lớn. Hai dải LED chàm #7C4DFF chạy đúng lưỡi cắt cong phía ngoài. Lõi xoáy tím đậm ở tâm. Khác biệt: đường cong lưỡi liềm duy nhất trong 13 tàu.
8. **Phần Thiên.** Pháo hạm vững chãi, vai rộng, nòng pháo lộ thiên. Thân trung tâm bọc giáp cam thép #D84315; hai khối giáp vai mang bốn nòng pháo plasma hướng lên; bốn ống xả vuông ở đuôi. Rãnh LED lam plasma #29B6F6 chạy vuông góc trên giáp vai và dọc rãnh nạp của bốn nòng, tương phản với vỏ cam. Lò phản ứng lam giữa ngực. Khác biệt: dáng khối chữ nhật và đối lập vỏ cam – đèn lam.
9. **Thiên Khung.** Chiến cơ tốc độ, cánh kép tách lớp, đuôi cánh nhạn kéo dài. Thân thon bạc #CFD8DC phối lam; cặp cánh trong liền thân, cặp phân cánh ngoài tách qua một khe hẹp; hai đuôi gió dài. Rãnh LED lam biển #2979FF uốn liền mạch từ mũi qua hai phân cánh xuống chóp đuôi. Buồng lái pha lê lam dọc sống lưng. Khác biệt: khe hở tách mỗi bên cánh thành hai lớp.
10. **Tinh Hà.** Mẫu hạm chỉ huy khung chữ H, hai khoang phóng chạy dọc hai sườn. Cầu chỉ huy trung tâm lùi nhẹ về sau; hai thân phụ hình hộp màu thép lục quân #3B4D3B; bốn vòi phun vuông. Đường băng LED **lục #8FD94A** bẻ góc 90° chạy trên mặt hai khoang phóng và nối ngang qua cầu chỉ huy. Trạm radar lục giác phát sáng lục ở giữa cầu nối. Khác biệt: hai đường băng vuông vức song song hai bên thân.
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
