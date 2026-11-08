# ĐỀ CHO GEMINI · NÂNG CẤP CHIP GIAO THỨC VŨ KHÍ TỐI THƯỢNG (V190)

Chủ dự án gửi 6 ảnh giao diện "Mô-đun siêu chiều" của game gốc kèm ghi chú của người chơi. Game gốc **chỉ để tham khảo**: không chép tên, không chép số.

## 1. Game mình đã có gì (`chip72.js`, V72b)

| Hạng mục | Game mình | Game gốc |
|---|---|---|
| Ô chip trên mỗi vũ khí | 6 ô: Hỏa lực ×2 · Cấu trúc ×2 · Mạch liên kết ×2 | Giống |
| Phẩm | 7 phẩm, từ Chế thức đến Tuyệt mật | Tương tự (Chiến lược, Tuyệt mật…) |
| Tham số chính | % tấn công / máu / giáp, trần +6%/chip, +18%/vũ khí | Số tuyệt đối (công +643, máu +4.280) |
| Dòng khuếch đại | 1–3 dòng: tấn công, máu, giáp, ST kỹ năng VKTT, tốc sạc tối thượng, ST kỹ năng lên boss | 1–3 dòng gắn với **từng món trang bị / chiến cơ có tên**, mỗi dòng thuộc 1 trong 4 loại (xem mục 2) |
| Bộ giao ước 3/6 | 8 bộ, mỗi vũ khí 2 bộ, **chỉ tính khi chip lắp đúng vũ khí của bộ** | Giống ("giao ước lắp sai vũ khí là hỏng") |
| Luyện | 20 lần: gieo lại **cả dòng** (loại + giá trị), tinh thể + hợp kim | Có 2 thao tác riêng: **tẩy dòng** (đổi loại dòng, tốn bộ chuyển đổi + kim cương, 20 lần) và **tẩy thông số** (chỉ đổi giá trị, tốn tinh thể, các lượt cuối tốn lõi vàng) |
| Tái tạo | 30 lần, khóa 1 dòng, tốn bộ mã hóa + lõi chip | (tương ứng tẩy dòng) |
| Giữ kết quả | Bảng CŨ / MỚI, nút GIỮ CŨ / NHẬN MỚI | Giống; người chơi hay bấm nhầm hủy mất dòng đẹp |
| Dòng "tổng" | Không có | Chỉ chip vàng có: tăng cho **toàn bộ** trang bị cùng loại |

## 2. 4 loại dòng khuếch đại của game gốc (theo ghi chú người chơi)
1. **Sát thương thường** của món X.
2. **Sát thương Bạo Tẩu** của món X.
3. **Sát thương cuối** của món X (cộng sau mọi hệ số, như "sát thương chuẩn").
4. **Sát thương cuối Bạo Tẩu** của món X (mạnh nhất).
5. Thêm: dòng **tổng** (chip vàng) áp cho mọi món cùng loại, ví dụ "mọi chiến cơ +5,44%".

## 3. Việc cần thiết kế (trả lời dạng bảng, có số)
1. **Dòng khuếch đại gắn với trang bị và chiến cơ của game mình.** 13 chiến cơ và 39 món (giáp / tên lửa / vũ khí phụ). Đề xuất:
   - các họ dòng: thường / Bạo Tẩu / cuối / cuối Bạo Tẩu;
   - dải giá trị theo phẩm;
   - trọng số rơi;
   - dòng "tổng" chỉ ở phẩm Tuyệt mật.

   Ràng buộc: tổng sát thương cộng thêm từ chip ở mức tối đa **không quá +15%** so với hiện tại. Claude sẽ đo lại bằng bộ đo ổn định V190 (đo boss 3 lần, lệch dưới 2%).
2. **Tách 2 thao tác:**
   - **Tẩy dòng**: đổi loại dòng, nguyên liệu hiếm;
   - **Tẩy thông số**: chỉ đổi giá trị, nguyên liệu dễ kiếm, các lượt cuối tốn nguyên liệu hiếm.

   Ghi rõ:
   - số lượt tối đa;
   - chi phí tăng dần theo lượt;
   - có được khóa dòng không.

   **Luật khóa:** không thêm nguồn kim cương mới, không tiền thật. Kim cương chỉ được dùng làm chỗ **tiêu**, ở mức vừa phải.
3. **Chống bấm nhầm:** khi kết quả mới **tốt hơn** dòng cũ mà người chơi bấm "Giữ cũ", hỏi lại một lần. Màu "MỚI" đổi xanh/đỏ theo tốt hơn/kém hơn.
4. **Tham số chính:** giữ dạng % (hợp với thang lực chiến hiện tại) hay đổi sang số tuyệt đối như game gốc? Nêu lý do. Lưu ý lực chiến đang được đọc ở 60 chỗ trong mã.
5. **Mốc mở khóa:** chip đang mở ở ải 110. Có nên mở từng phần (tẩy thông số trước, tẩy dòng sau) không?

## 4. Không làm
- Không chép tên món, tên bộ, số liệu của game gốc.
- Không vòng hay chữ nổi trong trận (luật đã khóa).
- Không đổi khóa lưu `saobang-*`; chip cũ phải tự đổi sang hệ mới mà không mất dòng.
