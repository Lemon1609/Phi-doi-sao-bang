# Robot / chiến cơ hợp thể game gốc · 9 video (19/11/2026, V307)
Nguồn: 9 clip chủ dự án gửi 19/11 tối (88766–88774, 1080×2652, 10–14 s, không lưu video vào repo). Cách xem: 1 khung/giây cho cả clip (bảng `sheet_<số>.jpg`) + 3 khung/giây đoạn biến hình (`tf_<số>.jpg`). **Mọi nhận xét là NHÌN BẰNG MẮT.** Chỉ học cách làm; không chép hình robot / tên cụ thể.

## 1. Màn hình
- Đều là **Đồ giám (图鉴), tab Chiến cơ**: lưới thẻ 4 cột (5 sao, khung màu theo hạng, góc số +N / MAX). Chạm thẻ → hộp xem trước.
- Đầu hộp: chân dung nhỏ có tem MAX + 5 sao, **tên +10**, **Lv 100/100**, **Tấn công "4444 + 1582"** (gốc + cộng thêm), **"Thưởng điểm 124 %"** (分数加成), **Đặc kỹ = 2 nhãn** (ví dụ "Xuyên thấu + Tỏa"), chữ ⓘ để xem chi tiết.
- Giữa: **sân khấu xem trước** (nền lưới xanh, vòng tròn đế) chạy vòng lặp hoạt cảnh. Dưới: đoạn văn giới thiệu (cốt truyện 3–4 dòng).

## 2. Vòng lặp hoạt cảnh (cả 9 clip giống nhau, ~10–14 s)
1. **Dạng chiến cơ** (~3–4 s): máy bay bay tại chỗ, bắn đạn chính đặc trưng (cột lửa, chùm thoi tím, tia băng, đạn kim…).
2. **Biến hình** (~0,5–1 s): quầng sáng trắng/màu bùng ở thân, thân tách ra / dựng đứng; có khi bóng chớp mờ.
3. **Dạng robot (người máy đứng)** (~3–4 s): cao gần gấp đôi máy bay, **cánh năng lượng khổng lồ** xòe ra (lông vũ, phiến pha lê, lưỡi liềm, lông lửa), tung **chiêu đặc trưng toàn khung** (chùm tia tỏa nan quạt, chữ X lửa, cột băng, lưỡi liềm vàng hai bên, ma trận laser).
4. Thu cánh → trở về máy bay → lặp lại.

| Clip | Tên (gốc) | Đặc kỹ | Dạng máy bay | Dạng robot / chiêu |
|---|---|---|---|---|
| 88766 | 幻翎千影 | Phân giải + Cộng vũ | lông vũ hồng–tím, 2 cột sáng | vũ công/thiên thần hồng, 6 cánh lông vũ, bóng phân thân cyan |
| 88767 | 游星骇客 | Thiêu đốt + Phân giải | phi cơ đen–cyan, 2 luồng lửa đỏ | robot giáp đen, cánh pha lê hồng–cyan, nón tia đỏ tỏa từ trên |
| 88768 | 永烬荒炎 | Quân đoàn + Thiêu đốt | chiến cơ đỏ–vàng, 3 pháo phụ, cột lửa | chiến thần mặt trời, hào quang tia chữ X bùng nổ |
| 88769 | 群星意志 | Đóng băng + Quân đoàn | mẫu hạm bạc–tím + đội tiêm kích nhỏ bay quanh | robot phán quan, sấm tím, cảnh nền đổi sang không gian tím |
| 88770 | 冰河领主 | Trảm kích + Đóng băng | tiêm kích băng, cột tia trắng | kỵ sĩ băng, 8 cánh tinh thể xòe xuống như váy, tia chùm từ trên |
| 88771 | 暗夜神锋 | Tỏa + Trảm kích | chiến cơ tím, 2 sừng vàng | robot tím, 2 **lưỡi liềm vàng khổng lồ** hai bên, cánh phiến tím |
| 88772 | 自由悍将 | Xuyên thấu + Tỏa | chiến cơ đỏ–tím, 4 nòng | robot đỏ, cánh bướm hồng + tia chữ X hồng |
| 88773 | 强袭斗士 | Phạm vi + Laser | chiến cơ vàng–đen, cột laser tím | robot vàng, cánh tia xanh lơ tỏa xuống |
| 88774 | 雷霆无双 | Thường + Xuyên thấu | chiến cơ tím, 3–5 phiến pha lê | robot tím, cánh pha lê nhọn chữ V |

**Đặc kỹ nối thành chuỗi**: Thường+Xuyên → Xuyên+Tỏa → Tỏa+Trảm → Trảm+Băng → Băng+Quân đoàn → Quân đoàn+Thiêu → Thiêu+Phân giải → Phân giải+Cộng vũ (+ Phạm vi+Laser riêng). Mỗi robot lấy 2 "hệ đạn" kề nhau → dễ hiểu, dễ ghép đội.

## 3. Bậc / nâng cấp
- Clip chỉ quay bản **+10, Lv 100/100, 5 sao, MAX**, nên KHÔNG thấy trực tiếp các bậc thấp. Lưới đồ giám có thẻ +1…+9 và MAX, khung màu khác nhau (tím, vàng, đỏ) → robot cũng có cấp sao + mức cường hóa như chiến cơ.
- Chủ dự án xác nhận 19/11: **robot giống tàu, trang bị: nâng bậc càng cao càng đẹp**.

## 4. Đối chiếu game mình (đo từ mã)
- Đã có **robot siêu hợp thể** (`Fusion`, khóa `saobang-robots-v1`): 7 mẫu `SSS_MODELS`, công thức 2 chiến cơ +1 → robot (miễn phí), dạng chiến cơ ↔ **dạng MAX khi Bạo Tẩu** (tia MAX ≈ +50 % DPS robot), **Tuyệt kỹ E** (tụ 0,6 s bất tử → 2,4 s đòn toàn màn, xóa đạn, hồi 18 s), màn Hợp thể có sân khấu chạm để biến hình (V307 thêm vòng ma trận, bắn thử, hiệu ứng hợp thể).
- Tranh hiện tại (`src/hop131`, `robot_hien_tai_7_mau.jpg`): **chiến giáp nữ** (nữ chiến binh mặc giáp cánh), mỗi mẫu 2 hình: chân dung (sảnh) + dạng bay (trong trận). 7 mẫu: Ảo Vũ Thiên Ảnh (tàu 6+9, Phân Giải + Song Vũ) · Du Tinh Hách Khách (8+6, Thiêu Đốt + Phân Giải) · Vĩnh Tẫn Hoang Viêm (10+8, Quân Đoàn + Thiêu Đốt) · Quần Tinh Ý Chí (3+10, Đóng Băng + Quân Đoàn) · Băng Hà Lĩnh Chủ (7+3, Trảm Kích + Đóng Băng) · Phượng Viêm Thương Đế (1+4, Thiêu Đốt + Xuyên Thấu) · Tử Diệu Quang Hoàng (2+5, Laser + Tán Xạ) (số tàu đếm từ 1).
- Tên + 2 đặc kỹ của 6 mẫu đang dịch gần sát tên game gốc (Ảo Vũ Thiên Ảnh ≈ 幻翎千影, Du Tinh Hách Khách ≈ 游星骇客, Vĩnh Tẫn Hoang Viêm ≈ 永烬荒炎, Quần Tinh Ý Chí ≈ 群星意志, Băng Hà Lĩnh Chủ ≈ 冰河领主…). **Rủi ro với luật "không chép"** → nên đổi tên / chủ đề khi làm lại.
- **Chưa có**: bậc / sao robot, hình robot đổi theo bậc, dạng robot đứng riêng (hiện chỉ "MAX" = phóng to + hiệu ứng), đồ giám xem trước vòng lặp, mô tả cốt truyện, chỉ số "thưởng điểm %".

## 5. Đề xuất (CHỈ ĐỀ XUẤT, chờ Gemini thiết kế số + chủ dự án chọn)
1. Robot có **6 bậc hình ảnh như chiến cơ** (Thường · Lục · Lam · Tím · Tím+5 · SS/MAX): bậc thấp cánh nhỏ, ít phiến; bậc cao thêm phiến cánh, hào quang, vũ khí phụ (lưỡi liềm, phù du), MAX có chiêu toàn khung.
2. **Hai dạng thật**: máy bay (bắn thường) ↔ robot đứng (khi Bạo Tẩu / Tuyệt kỹ), có 0,6–1 s biến hình. Cần GPT vẽ mỗi mẫu: máy bay 6 bậc + robot 6 bậc (hoặc robot 3 mốc: Lam / Tím+5 / MAX để giảm số tranh).
3. **Đặc kỹ 2 hệ đạn kề nhau** theo một vòng hệ riêng của game mình (ví dụ 8 hệ), ghép đội có cộng hưởng.
4. Màn **Đồ giám robot**: lưới thẻ + hộp xem trước vòng lặp 4 pha + cốt truyện; dùng lại sân khấu sss307.
5. Chọn hướng hình: giữ **chiến giáp nữ** (bản sắc riêng hiện có) hay chuyển sang **robot cơ khí** như game gốc, hoặc trộn (một số mẫu nữ, một số cơ khí). → hỏi chủ dự án.
