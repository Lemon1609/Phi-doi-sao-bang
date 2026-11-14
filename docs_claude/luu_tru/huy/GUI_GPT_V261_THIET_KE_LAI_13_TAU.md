> **HỦY (13/11 14:17)**: chủ dự án "Giữ lại các thiết kế lúc sáng nay nhé, không sửa nữa".

Chào GPT, Claude đây. Chủ dự án quyết định **thiết kế lại toàn bộ 13 chiến cơ**. Gemini đã lên ý tưởng, Claude đã rà, chủ dự án duyệt hướng. Chủ dự án muốn **GPT vẽ thân tàu** (các tàu 9, 13 bản V249 của GPT từng được khen "Khá đẹp rồi đấy"). Gemini sẽ lo cánh bung năng lượng sau.

## Phong cách chủ dự án yêu cầu
> **"Tươi sáng, hiện đại, công nghệ cao, bắt mắt hơn. Tham khảo tựa game gốc."**

Học từ ảnh `tham_khao/game_goc_*` và `tham_khao/phong_cach_1.png`:
- sơn bóng màu tươi, khung kết cấu trắng / bạc sáng;
- kính buồng lái rực, viền sáng ở mép giáp;
- đèn LED chạy theo mép giáp, giáp xếp lớp có khe sáng, lõi năng lượng phát sáng;
- dáng đối xứng, gọn, **đọc rõ ở cỡ nhỏ trên điện thoại**;
- động cơ phụt lửa sáng.

**Không chép** dáng, tổ hợp màu, chi tiết riêng của tàu nào trong game gốc. Nhiều tên tàu trùng ý với game gốc (Phượng Hoàng, Thần Ma, Phần Thiên), nên càng phải khác dáng.

`tham_khao/KHONG_DAT_gemini_tau11.png` là bản Gemini thử, **chủ dự án chê "không đẹp"**: dáng quả trứng, không có cánh, hai lon động cơ, màu kaki xỉn, ít chi tiết công nghệ. **Tránh kiểu này.**

## Luật bắt buộc
1. **Dáng**:
   - khối dày, bản thường **rộng/cao 0,8–1,05**;
   - không chữ X, không dáng tỏa tròn / ngôi sao, không thân que quá thon;
   - phải ra dáng **chiến cơ có cánh**.
2. **Bạo Tẩu**:
   - rộng/cao **1,25–1,6**, rộng ≥ 1,25 lần bản thường;
   - **giáp cứng mở ra ngoài viền thân**, thân giữa giữ nguyên chỗ.
3. **Sáng**:
   - độ sáng thân trung bình **120–150** (0–255);
   - mảng tối chỉ ở khe, họng động cơ, **≤ 20 %** diện tích.
4. **Bậc** (vẽ bậc Tím trước):
   - Thường → Lục → Lam → Tím → Tím+ → SS: bậc cao lộng lẫy, hiện đại hơn;
   - bậc thấp ít bộ phận hơn nhưng **không đơn sắc**, cỡ ≥ 90 % bậc Tím;
   - **Thường luôn có màu chủ của tàu ở dạng nhạt** làm màu phụ;
   - đèn / neon / ngọc: Thường trắng bạc, Lục lục, Lam lam, Tím màu riêng, Tím+ hồng tím (thêm tầng giáp, ngọc khảm), SS vàng kim (nhiều lớp nhất, viền vàng kim, lõi rực).
5. Mỗi tàu một dáng, một màu chủ riêng. Không chữ, không logo, không dấu hình mờ. Nội dung phổ thông.

## Ý tưởng 13 tàu (đã duyệt; câu chuyện đầy đủ ở `CAU_CHUYEN_13_CHIEN_CO.md`)
| Tàu | Dáng + bộ phận đặc trưng | Màu bậc Tím | Bạo Tẩu mở ra |
|---|---|---|---|
| 1 Nộ Hỏa Phượng Hoàng | phượng hoàng khối dày: mào lửa, mỏ giáp nhọn, kính buồng lái cam vàng hình mắt phượng, lò plasma ở ngực, cánh 2 tầng cong mềm xuôi sau, đuôi giáp lông dài xếp quạt | trắng sứ + cam lửa / hổ phách + vàng kim, đỏ son điểm nhỏ; đèn cam lửa | 2 tầng cánh vai trượt ngang, xòe 3 cặp phiến lông cơ khí, mở nắp lò plasma (+35 %) |
| 2 Cực Quang Ảo Ảnh | tiêm kích đánh chặn vai vuông: 2 thanh ray cao dọc lưng (rãnh giữa trống cho laser), kính buồng lái ngọc bích dài, 2 cụm tản nhiệt bọc bạc ở vai | bạc băng tuyết + ngọc bích `#10B981` + crôm; đèn lơ cực quang | ray trượt ra ngoài, vai mở 4 cánh lăng kính **ngang và xuôi sau** (+30 %) |
| 3 X-Dực Băng Hà | mũi tên tam giác dày: mũi khoan phá băng giáp trắng, lõi sao chổi băng sáng ở lưng, 4 nòng pháo hàn băng sau vai | trắng xà cừ + lơ băng rất nhạt + bạch kim; đèn băng lõi trắng | 4 cụm nòng + 2 giáp sườn trượt mở **xuôi về sau** 40°, lộ tinh thể dẫn nhiệt (+30 %) |
| 4 Thần Ma Dị Hình | chiến hạm đầu quỷ vai ngang khối nặng: sừng cơ khí cong, "bốn mắt" lò phản ứng đồng tâm trên 2 bệ vai, vuốt giáp ở đuôi | xám titan sáng `#94A3B8` + đỏ rượu vang `#BE123C` + đồng thau; đèn lục bảo, hồng ngọc | bệ vai 4 mắt trượt ra hai bên, sừng mở góc, vuốt đuôi bung ngang (+35 %) |
| 5 Trí Tuệ Thự Quang | phi thuyền hộ tống hình khiên vương miện: vương miện lăng kính xếp tầng quanh mũi, kính buồng lái vàng nắng, 6 cánh lăng kính hai bên sườn | trắng ngọc trai + hồng san hô `#FB7185` + vàng hồng; đèn vàng nắng | 6 cánh xòe như đóa hoa cơ khí, giáp lưng tách đôi lộ lõi bẻ sáng (+35 %) |
| 6 Siêu Nghiệm U Linh | tiêm kích tàng hình đa diện khối dày: lõi lệch pha hình thoi lơ lửng trong khung hở giữa ngực, kính xanh ma trơi, cánh giáp bậc thang sắc cạnh | bạch kim sáng + **xanh ma trơi `#2DD4BF`** + điểm tím oải hương; đèn xanh ma trơi | giáp cánh bậc thang tách lớp ra ngoài, khe sáng dọc sườn (+30 %) |
| 7 Ma Vương Đao Phong | đại đao công nghệ cao khối dày (**rộng/cao ≥ 0,8**): sống kiếm tinh thiết dọc trục, 4 lưỡi đao phụ gập sát sườn, kính hổ phách góc cạnh | bạc thép sáng + **vàng kim / vàng chanh**; đèn hổ phách | 4 lưỡi đao bật mở ngang như nan quạt thép, lộ khớp thủy lực phát sáng (+40 %) |
| 8 Phần Thiên Chiến Chuẩn | chim cắt giáp nặng mang cờ hiệu: lò nhiệt áp rực ở ngực, 2 pháo nhiệt áp lớn trên vai, cánh giáp 3 lớp gãy góc | đỏ tươi `#EF4444` + trắng ngà + vàng ròng; đèn vàng lửa | giáp vai mang pháo trượt ngang, 3 tầng cánh xòe về sau, mở khe tản nhiệt (+35 %) |
| 9 Thiên Khung Lược Ảnh | đài quan sát bay hình thoi dày: mái vòm pha lê ở buồng lái, 2 đĩa radar trên vai, 3 tầng cánh ăng-ten | trắng sứ + coban `#3B82F6` + **vàng nhạt** + viền bạc; đèn thiên thanh | đĩa radar nâng cao xoay hướng, 3 tầng cánh trượt mở hai bên (+30 %) |
| 10 Tinh Hà Thủ Vọng | pháo đài hộ vệ vai rộng, mũi tù chắc: mắt chỉ huy hồng ngọc lớn ở tâm, 2 bệ điều khiển tàu con ở hông, giáp vai khiên lục giác vát cạnh | bạc ánh trăng + tím hoa cà `#C084FC` + viền vàng nhạt; đèn hồng ngọc | 2 cụm giáp lục giác trượt ra theo tay đòn, mở khe dẫn sáng (+35 %) |
| 11 Thôn Tinh Chiến Cơ | tàu trọng lực khối nêm dày **có cánh**: vòng từ trường giam hố đen ở lõi ngực (tâm đen, viền sáng gắt), 2 tua-bin hút trọng lực ngang sườn, kính xanh ngọc | **đồng ánh kim / vàng đồng** + bạch kim, tím chỉ ở vòng từ trường; đèn tím neon, trắng vàng | 2 tua-bin trượt ra ngoài, 4 tấm giáp quanh lõi tách mở tạo khe sáng (+30 %) |
| 12 Thời Không Lữ Khách | phi thuyền vai rộng, **mũi kim đồng hồ ngắn** (rộng/cao ≥ 0,8): bộ máy bánh răng, vòng chia độ lưỡng cực lộ ở ngực, 2 cụm ổn định thời không hai bên cánh | nhiều khung **trắng bạc** + xanh hoàng gia `#2563EB` + vàng kim `#FACC15`; đèn ngọc, vàng | 2 cụm ổn định trượt ra hai bên, lộ vòng chia độ phát sáng (+30 %) |
| 13 Hư Không Đế Vương | chiến hạm hoàng gia mũi nêm + 2 cánh rìu bản rộng: giáp **crôm gương phản chiếu sáng**, lõi hư không tím điện ở ngực, kính tím sáng sắc cạnh | crôm gương sáng + tím điện `#9333EA` + bạch kim; đèn tử đinh hương | 2 cánh rìu trượt bung rộng, mở giáp che lõi (+35 %) |

## Cách nộp
- **Mỗi tàu trước tiên nộp bậc Tím**: `tauN_tim.png` (bản thường) + `tauN_tim_bt.png` (Bạo Tẩu).
  - Nền **trong suốt**, khung ≥ 1024.
  - Bạo Tẩu **cùng tỉ lệ** với bản thường, thân giữa trùng chỗ (có thể dùng `khung_co/` làm khung).
- Đóng `V261_TAUn_TIM.zip`, kèm ảnh ghép thường cạnh Bạo Tẩu.
- **Thứ tự**: 11, 6, 4, 13, 1, 8, 7, 12, 2, 3, 5, 9, 10. Làm được bao nhiêu tàu một lượt thì gửi bấy nhiêu.
- Chủ dự án duyệt bậc Tím xong mới vẽ 10 tranh các bậc còn lại.
