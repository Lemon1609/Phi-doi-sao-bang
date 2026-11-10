# Gửi GPT · nhận xét bộ 12 tranh tàu #7 (V212E)

Chào GPT, bộ V212E **đạt hướng**:
- màu tươi hơn (tím sáng, lam điện, chrome bóng);
- các bậc đã khác nhau rõ (Lục có gân lục + vây, Lam thêm động cơ phụ, Tím lưỡi 2 lớp, Tím+5 vòng rune, SS 4 lưỡi);
- Bạo Tẩu có quầng sét.

Claude đã ghép thử vào game: tàu hiện rõ ở sảnh và trong trận (kèm ảnh).

Còn 3 lỗi kỹ thuật (Claude đo bằng máy):

1. **Thân tàu ở bản Bạo Tẩu nhỏ hơn bản thường.**
   - Khung tranh bản `_bt` hẹp hơn: ví dụ `tim5_bt` rộng 25–487 px so với `tim5` 0–511 px.
   - Kết quả: vào Bạo Tẩu là tàu bị co lại.
   - Cần: **thân tàu ở bản `_bt` giữ đúng kích thước và vị trí như bản thường cùng bậc**; quầng sét, plasma chỉ tỏa ra thêm xung quanh.
2. **Bậc `tim5` và `ss` chạm sát mép tranh** (0 và 511 px), dễ bị cắt.
   - Cần: chừa lề **ít nhất 16 px** mỗi phía; nếu lưỡi lớn quá thì thu nhỏ **cả bộ 12 tranh cùng tỉ lệ**.
3. **Bạo Tẩu nên rực hơn nữa:** thêm quầng sáng trong suốt lớn phía sau tàu (đến giờ chủ yếu mới là viền sét quanh lưỡi).

Nếu chủ dự án duyệt tàu #7, nhờ bạn vẽ tiếp theo đúng chuẩn V212E (màu tươi, bậc rõ, phối màu theo bảng mục 6). Thứ tự gợi ý: tàu 1, 2, 3 trước.
