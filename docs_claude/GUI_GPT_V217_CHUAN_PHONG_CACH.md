# GỬI GPT · V217 · Bộ chuẩn phong cách "hiện đại – tương lai" + đợt vẽ 1

Chủ dự án nhận xét: tranh hiện **chưa đồng bộ**, có tàu **quá dẹt**, có tàu **quá to**, hiệu ứng Bạo Tẩu **lòe loẹt**. Từ đợt này mọi tranh (chiến cơ, trang bị, hợp thể, giao diện) theo đúng bộ chuẩn dưới đây. Tựa game gốc chỉ là tham khảo về **cảm giác** (sắc nét, cánh nhiều lớp, điểm sáng năng lượng nổi trên nền tối); **không chép** dáng, tranh, tên hay logo của game nào.

## A. Bộ chuẩn (áp cho mọi tranh)

1. **Khung và tỉ lệ**
   - PNG 512×512, nền trong suốt, nhìn thẳng từ trên xuống, mũi hướng lên, đối xứng trái – phải.
   - Thân tàu (không tính lửa động cơ) có **rộng / cao từ 0,85 đến 1,25**. Không dẹt như đĩa, không gầy như que.
   - Cỡ thân tăng dần theo bậc, tính bằng căn(rộng × cao): thường 345 · lục 355 · lam 368 · tím 380 · tím+ 392 · SS 405 (px). Cạnh dài nhất không quá 456 px.
   - Tâm thân trùng tâm ảnh. Lề trống mỗi phía ≥ 28 px.
2. **Dáng**
   - Nhận ra được ở cỡ 100 px: 3 khối lớn rõ ràng (thân giữa, cánh, cụm động cơ). Ít gai, không chi tiết vụn.
   - Mỗi tàu một dáng riêng; hai tàu không được na ná nhau khi tô đen toàn bộ.
3. **Chất liệu và ánh sáng**
   - Kim loại cứng kiểu dựng 3D: tấm giáp phẳng lớn, cạnh vát, đường chia tấm mảnh. Không hoa văn rối, không vân loang.
   - Một nguồn sáng từ trên – trái; viền sáng mảnh ở cạnh; bóng đổ nhẹ giữa các lớp tấm.
4. **Màu 60 / 30 / 10**
   - 60 % kim loại trung tính (thép, titan, xám súng) · 30 % màu chủ đạo của tàu · 10 % đèn năng lượng phát sáng.
   - Mỗi tàu chỉ **một** màu chủ đạo và **một** màu đèn. Không vàng kim, không cầu vồng.
   - Tuyệt đối không dùng đỏ #FF334F và hồng #F50057 (màu đạn địch).
5. **Phát sáng**
   - Chỉ phát sáng ở: lõi, buồng lái, khe năng lượng, họng động cơ. Lửa động cơ ngắn (≤ 40 px), màu lam – trắng.
   - **Không vẽ** lửa, sét, quầng sáng, hạt bụi dính vào tranh thân tàu. Hiệu ứng vẽ thành **mảnh rời** theo mục A.8 để game làm chuyển động.
6. **Tiến hóa 6 bậc** (`thuong / luc / lam / tim / tim5 / ss`)
   - Cùng một thân lõi. Bậc sau thêm tấm giáp, cánh phụ, họng pháo; lớn dần đúng cỡ ở mục 1. Không đổi màu chủ đạo.
   - **Mỗi tàu tiến hóa theo dáng riêng của nó** (chủ dự án, 11/11): tàu mũi khoan thì dài và nhọn dần, tàu lông vũ thì thêm lớp lông, tàu pháo hạm thì thêm pháo và giáp vai… Không dùng chung một công thức cho mọi tàu. Trang bị và hợp thể cũng vậy.
7. **Bản Bạo Tẩu** (`_bt`, mỗi bậc một bản)
   - **Chỉ là thân và cánh bung ra**: cánh mở rộng, tấm giáp tách lớp, họng pháo lộ ra, khe năng lượng sáng hơn.
   - **Kiểu bung phải hợp với dáng và kỹ năng của chính tàu đó**; không bắt buộc bung thành chữ X, không dùng chung một kiểu cho nhiều tàu. Sáu bậc của cùng một tàu dùng **cùng một kiểu bung**, bậc cao bung mạnh hơn.
   - Thân lõi **cùng cỡ, cùng vị trí** với bản thường cùng bậc (dựng trên chính tranh bản thường). Mức bung **vừa phải**, đo bằng diện tích: **1,25–1,5 lần bản thường** (chủ dự án: "đừng nới to quá"), theo hướng nào cũng được miễn hợp dáng tàu. Lề ≥ 28 px.
   - Không lửa, không sét, không quầng trong tranh thân (chúng nằm ở bộ hiệu ứng, mục 8).
8. **Bộ hiệu ứng Bạo Tẩu theo từng tàu** (GPT thiết kế, game làm chuyển động)
   - Bạo Tẩu vẫn có **lửa, sét, ánh sáng**. GPT thiết kế chúng **riêng cho từng chiến cơ**, hợp với chất và màu của tàu đó (plasma, băng, lửa thép, axit, hư không…). Game ghép các mảnh vào tàu và cho chúng chuyển động: luân phiên dáng, lắc, co giãn, chớp tắt, bật xòe.
   - Mỗi tàu **một bộ 8 tệp**, dùng chung cho cả 6 bậc (game tự tăng cỡ và số lượng theo bậc):

     | Tệp | Khổ | Quy ước |
     |---|---|---|
     | `tauN_fx_lua_1.png`, `_2`, `_3` | 192×384 | Một ngọn lửa, **gốc ở giữa cạnh đáy**, ngọn hướng lên. 3 dáng khác nhau của cùng một ngọn để game luân phiên. Mảnh: phần vẽ chiếm không quá 35 % khung. |
     | `tauN_fx_set_1.png`, `_2`, `_3` | 384×128 | Một tia sét chạy ngang **từ giữa cạnh trái đến giữa cạnh phải**. 3 dáng khác nhau. Lõi trắng mảnh, viền màu của tàu, 1–2 nhánh phụ ngắn. |
     | `tauN_fx_sang.png` | 512×512 | Hình ánh sáng đặc trưng nằm **sau lưng** tàu (cánh năng lượng, tia tản, quầng lõi…), tâm ảnh trùng tâm tàu, đối xứng, trong mờ. Không phải vòng tròn kín bao quanh tàu. |
     | `tauN_fx_hat.png` | 256×64 | 4 ô 64×64 xếp ngang: 4 hạt / tia lấp lánh nhỏ khác nhau. |

   - Cách vẽ để ghép được: nền trong suốt; **sáng ở lõi, mờ dần ra mép** cho đến trong suốt hẳn; không viền đen, không nền tối, không bóng đổ (game dùng chế độ cộng sáng). Chỉ dùng màu đèn của tàu và trắng; không đỏ #FF334F, hồng #F50057, vàng kim, cầu vồng.
   - **Không dày**: thà ít mà sắc. Game sẽ nhân số lượng lên khi cần.
   - Trang bị cũng theo cách này ở đợt sau (đạn, tia, chớp nòng, nổ: mỗi món một bộ mảnh rời, cùng quy ước).

## A2. Hai phe, hai tính cách (chủ dự án, 11/11)

- **Phe ta (chiến cơ, trang bị, hợp thể đồng minh): gọn, kích thước vừa phải, không quá to.** Sắc, tinh, công nghệ cao. Bản Bạo Tẩu cũng không được phình to.
- **Hiệu ứng siêu cấp của phe ta: kiểu NEON LED.** Ống sáng mảnh, nét đều, sáng rực ở lõi và có quầng mờ quanh nét; chạy theo cạnh thân, cạnh cánh, khe năng lượng như dải đèn LED. Lửa, sét, ánh sáng sau lưng (mục A.8) cũng vẽ theo chất này: **nét mảnh phát sáng**, không phải mảng màu đặc. Game sẽ thêm viền neon và vệt sáng chạy dọc viền bằng mã.
- **Tàu địch: hầm hố, đồ sộ, ác mộng.** To và nặng hơn hẳn phe ta; giáp dày sẫm màu, gai, càng, hàm, khối sinh – cơ ghép; đèn đỏ #FF334F và hồng #F50057 (màu của phe địch). Boss phải gây cảm giác áp đảo.
- Hai phe phải phân biệt được ngay cả khi tô đen: phe ta thanh và nhọn, phe địch khối và gồ ghề.

## B. Đợt vẽ 1 (28 tranh thân + 16 tranh hiệu ứng + 10 tranh đạn)

| Việc | Tệp | Yêu cầu |
|---|---|---|
| **Tàu 8 vẽ lại dáng** | `tau8_{thuong,luc,lam,tim,tim5,ss}.png` + 6 bản `_bt` | Hiện rộng / cao = 1,47–1,85 (quá dẹt). Mục tiêu **1,05–1,25**: kéo dài thân theo chiều trước – sau (mũi nhô ra, cụm động cơ lùi về sau), giữ đặc trưng pháo hạm cam thép với pháo plasma lam. Bậc thấp 2 pháo, bậc cao 4 pháo. |
| **Tàu 6 vẽ lại dáng** | `tau6_{thuong,luc,lam,tim,tim5,ss}.png` + 6 bản `_bt` | Hiện rộng / cao = 0,44–0,75 (quá gầy). Mục tiêu **0,85–1,00**: thêm vai và cánh rộng hơn, giữ màu tím oải hương và nét thanh thoát. |
| **Tàu 4 nới dáng 2 bậc** | `tau4_thuong.png`, `tau4_lam.png` + 2 bản `_bt` | Hiện 0,48 và 0,62. Mục tiêu ≥ 0,85, cùng họ dáng với 4 bậc còn lại. |

| **Bộ hiệu ứng Bạo Tẩu làm mẫu** | 8 tệp `tau9_fx_*` + 8 tệp `tau10_fx_*` (mục A.8) | Tàu 9: lam băng, sắc, lạnh, mảnh như lưỡi dao. Tàu 10: lục quân với đèn lam, khối, kiểu khí tài (tia khóa mục tiêu, tấm khiên năng lượng). Hai bộ này làm mẫu: game ghép và cho chạy thử để chủ dự án duyệt, rồi mới làm 11 tàu còn lại. |

| **Đạn chính tàu 8 và tàu 10 vẽ lại** | `fx16_pb_7_{t1,t2,t3,ss}.png`, `fx16_pb_9_{t1,t2,t3,ss}.png` (96×128) + `fx16_pb_7_muzzle.png`, `fx16_pb_9_muzzle.png` (128×128) | Bản thử vừa rồi màu đạt nhưng **cỡ không tăng theo bậc**. Phần vẽ của viên đạn phải cao dần: t1 ≈ 92 px, t2 ≈ 98, t3 ≈ 104, ss ≈ 110, rộng 22–34 px, căn giữa khung, mũi hướng lên. Chớp nòng: phần vẽ ≈ 85 px, căn giữa. Tàu 8: lõi plasma lam, vỏ cam thép. Tàu 10: lục quân, lõi cam tín hiệu. Vẽ theo cách ở A.8 (sáng ở lõi, mờ dần ra mép, không viền đen). |

Bản Bạo Tẩu của tàu 8, 6, 4 theo mục A.7 (thân bung, không hiệu ứng dính vào tranh).

## C. Các đợt sau (chưa vẽ, để biết trước)

1. Tàu 11, 12, 13 theo bộ chuẩn.
2. Bản Bạo Tẩu "sạch" (A.7) cho tàu 1, 2, 3, 4, 5, 7 và bộ hiệu ứng (A.8) cho 11 tàu còn lại.
3. Trang bị: icon cùng chất liệu kim loại, cùng nguồn sáng, khung 256×256, màu theo bộ trang bị; hiệu ứng của từng món (đạn, tia, chớp nòng, nổ) vẽ thành mảnh rời như A.8.
4. Hợp thể: ghép đặc trưng của hai tàu thành phần sau khi cả hai có tranh chuẩn.
5. Quái, boss, nền, khung giao diện.

## D. Cách nộp

Một tệp zip, đúng tên tệp ở trên, PNG RGBA; tranh thân 512×512, tranh hiệu ứng đúng khổ ở mục A.8. Kèm một ảnh ghép 6 bậc × 2 hàng (thường / Bạo Tẩu) cho mỗi tàu để duyệt nhanh.
