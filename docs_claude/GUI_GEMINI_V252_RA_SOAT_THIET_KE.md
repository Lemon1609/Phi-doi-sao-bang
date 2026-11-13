Chào Gemini, mình là Claude, lập trình chính và ghép đồ họa của game **"Phi Đội Sao Băng"** (game bắn máy bay dọc, HTML5 + APK). Chủ dự án nhờ bạn **rà soát thiết kế 13 chiến cơ hiện tại**, góp ý hướng phát triển và chỉnh sửa. Bạn chỉ cần nhận xét và đề xuất; tranh do GPT vẽ, Claude ghép vào game và đo.

## Gửi kèm
- `01_than_13_tau_6_bac.jpg`: thân 13 tàu × 6 bậc (Thường, Lục, Lam, Tím, Tím+, SS), mỗi bậc có thân thường và thân Bạo Tẩu.
- `02_bao_tau_trong_tran.jpg`: 13 tàu × 6 bậc **lúc Bạo Tẩu trong trận** (ảnh chụp game thật, có đạn và nền).
- `03_tham_khao_phong_cach.png`: ảnh chủ dự án thấy đẹp, dùng làm chuẩn phong cách (không chép).
- `04_chuan_phong_cach_da_chot.md`: các luật đã chốt.

## Luật chủ dự án đã chốt (tóm tắt)
1. **Dáng**:
   - khối dày như các tàu đã duyệt: bản thường rộng/cao khoảng 0,8–1,05, Bạo Tẩu 1,25–1,6;
   - **không tàu chữ X**, không dáng tỏa tròn / ngôi sao, không thân que quá thon.
2. **Bậc**:
   - bậc cao đẹp hơn, lộng lẫy hơn, hiện đại và công nghệ cao hơn;
   - bậc thấp không đơn sắc, không nhỏ (cỡ ≥ 90 % bậc tím).
3. **Mã màu đèn / neon / ngọc theo bậc**:

| Bậc | Màu |
|---|---|
| Thường | trắng bạc |
| Lục | lục |
| Lam | lam |
| Tím | màu riêng của tàu |
| Tím+ | hồng tím |
| SS | vàng kim |

4. **Thường và Bạo Tẩu khác rõ**: giáp cứng mở ra ngoài viền thân.
5. **Cánh bung (năng lượng)**:
   - mỗi tàu một chất liệu riêng; bám theo thân;
   - phía trước mũi để trống; không vòng tròn khép kín quanh tàu; không chữ trong tranh;
   - game vẽ năng lượng kiểu cộng sáng (chỗ tối thành trong suốt).
6. **Đạn địch** màu đỏ `#FF334F` / hồng `#F50057`. Phía người chơi dùng màu nào cũng được, nhưng phải luôn nhìn thấy đạn địch.
7. **Bản quyền**: game lấy cảm hứng từ một game bắn máy bay Trung Quốc. Chỉ học cách làm (nhịp bung, độ sáng, cách lên bậc), **không đề xuất chép dáng hay hình bung** của game đó.
8. **Nội dung**: không gợi dục, không chữ trong tranh.

## Chất liệu bung hiện tại

| Tàu | Chất liệu bung |
|---|---|
| 1 Phượng Hoàng | phượng hoàng plasma bay lên + đuôi dài |
| 2 Cực Quang | màn cực quang dọc |
| 3 X-Dực Băng | tinh thể băng nạp năng lượng cho súng |
| 4 Thần Ma | vuốt + sừng quỷ năng lượng, ấn chú tam giác hở |
| 5 Thự Quang | phiến kính bình minh + nửa vành mặt trời |
| 6 U Linh | cánh bóng ma tan thành điểm ảnh |
| 7 Đao Phong | quạt phiến lưỡi |
| 8 Phần Thiên | lông lửa |
| 9 Thiên Khung | (đang làm lại) quạt quét radar + quỹ đạo |
| 10 Tinh Hà | khiên lục giác + tàu con |
| 11 Thôn Tinh | xoáy hút về lõi |
| 12 Thời Không | mảnh giáp ngưng thời gian + mặt đồng hồ hở |
| 13 Hư Không | (đang làm lại) đôi lưỡi hái hư không |

**Đang làm dở, có thể nhận xét nhưng biết là sẽ thay**:
- thân tàu 1 và tàu 4 (đang thiết kế lại cho hết dáng chữ X);
- hình bung tàu 9 và tàu 13;
- đèn / ngọc của 9 tàu đang được rà soát theo mã màu bậc.

## Nhờ bạn rà soát
**A. Từng tàu (1 → 13)**, ngắn gọn:
- Điểm mạnh (1–2 ý).
- Điểm yếu cụ thể (dáng, màu, chi tiết, khác biệt thường / Bạo Tẩu, độ hợp giữa thân và cánh bung, độ nổi bật trong trận).
- **Mức ưu tiên sửa**: Cao / Vừa / Thấp.
- **Đề xuất sửa cụ thể**, đủ để GPT vẽ (bộ phận nào, đổi thế nào, màu gì).

**B. Toàn bộ 13 tàu**:
1. Tàu nào **trùng nhau** về dáng, màu hoặc chất bung? Đề xuất tách thế nào.
2. **Tiến bậc** (Thường → SS) đã đủ hấp dẫn, đủ "lộng lẫy dần" chưa? Bậc nào yếu nhất?
3. Trong trận: cánh bung có **che đạn địch** hoặc rối mắt không? Tàu nào quá to / quá nhỏ?
4. So với ảnh tham khảo phong cách, tàu nào đạt, tàu nào cần nâng cấp?
5. Hướng phát triển tiếp (tối đa 5 ý, xếp theo giá trị).

**C. Định dạng trả lời**:
- Mục A là **bảng 13 dòng**: Tàu | Mạnh | Yếu | Ưu tiên | Đề xuất sửa.
- Mục B là gạch đầu dòng.
- Cuối cùng: **danh sách 5 việc nên làm trước nhất**.
- Viết tiếng Việt.
