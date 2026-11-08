# RÀ SOÁT HÌNH ẢNH & ĐỒ HỌA · V207

Phi Đội Sao Băng · Claude · 08/11/2026. Bước này chỉ rà soát: **chưa đổi tranh, chưa đổi phong cách**.

**Giữ nguyên các quyết định đã chốt:**
- phong cách mỹ thuật hiện tại;
- **không** áp luật mỹ thuật V198;
- **không** vẽ lại icon trang bị hợp thể;
- robot giữ bản V196B;
- trong trận không có vòng quanh tàu / địch và không chữ bay;
- đạn địch đỏ #FF334F / hồng #F50057.

Ký hiệu: **[KT]** = đã kiểm tra trực tiếp · **[NX]** = nhận xét / đề xuất của Claude · **[CKC]** = chưa kiểm chứng, cần thử thêm.

## 1. Cách rà soát

- **Chụp game V207 bằng trình duyệt tự động** [KT]: sảnh; trận chương 1, 5, 9 (đợt quái + boss); chế độ hình ảnh **Đẹp** và **Nhẹ (tự chuyển)**; màn kết quả. Ảnh: `RS_DOHOA_anh_tot.png`, `RS_DOHOA_anh_loi.png`.
  - Giới hạn: chụp trên máy ảo, độ nét ×1, **không phải điện thoại thật**. Độ mượt và độ sắc nét trên máy thật [CKC].
- **Đọc mã và tài liệu đồ họa của 12 repo trong phiên** [KT]: Sky Blaster, Weltkriegsimulator, Canvas Danmaku, Cosmos Wars, Learn HTML5 Shmup, html5shmup-template, Godot Shoot 'em Up, Office Hell, Chmood/shmup, OpenTyrian, spec-kit.
  - Giới hạn: Office Hell để ảnh / âm thanh trong Git LFS, nên chỉ đọc được mã, **không xem được tranh**.

## 2. Hiện trạng đồ họa PĐSB

| Hạng mục | Đánh giá |
|---|---|
| Sảnh, chiến cơ, robot, bệ đỡ, khung giao diện | **Tốt** [KT]: tranh vẽ chi tiết, đồng bộ phong cách. Không cần nâng cấp [NX] |
| Đạn địch (tròn đỏ / hồng, tâm trắng) | **Dễ đọc** [KT] ở cả chế độ Đẹp và Nhẹ |
| Nền chương 1–5 (nhiều lớp, có chiều sâu) | Tốt [KT]. Chương 6–10 vẫn **chờ GPT vẽ đợt B** |
| Chế độ Nhẹ tự chuyển (máy ảo dưới 45 FPS) | Hoạt động đúng [KT], hình vẫn rõ |

### Lỗi / điểm yếu thấy được
1. **Vệt sáng vàng-xanh khổng lồ bị vỡ điểm ảnh**, che khoảng 40% màn hình (`RS_DOHOA_anh_loi.png`, ảnh 1–2) [KT].
   - Xuất hiện khi chụp liên tiếp nhiều trận với tài khoản ải 180 (tàu #13).
   - Khi mở trận mới thì **không tái hiện được**, nên chưa xác định hiệu ứng nào gây ra [CKC]. Nghi là một hiệu ứng toàn màn hình vẽ từ ảnh độ phân giải thấp rồi phóng to.
   - **Ưu tiên cao**, vì nó che cả đạn địch.
2. **Thông báo nhận phi công / trang bị đè lên bảng tổng kết** ở màn kết quả (ảnh 3) [KT].
3. **Tên boss và thanh máu boss** ở mép trên: chữ rất nhỏ, tương phản thấp [KT], khó đọc trên điện thoại [NX].
4. **Đạn chính của người chơi rất dày** (chùm vàng phủ nửa trên màn hình) [KT]. Đạn địch vẫn nổi nhờ khác màu; khi boss bắn dày có thể rối mắt [CKC].
5. **Lỗi số liệu đã sửa ngay trong V207** [KT]: tỉ lệ loạt đạn trúng đích từng hiện 0%. Nguyên nhân là đạn không xuyên biến mất ngay khung trúng, nay ghi nhận ngay lúc va chạm.

## 3. Kỹ thuật đồ họa ở các repo

| Repo | Kỹ thuật đồ họa đã kiểm tra [KT] | Giấy phép tranh |
|---|---|---|
| Sky Blaster | Vẽ hoàn toàn bằng mã (không ảnh); vệt đuôi đạn bằng hạt (tối đa 600 hạt); rung màn hình; chậm cảnh; bối cảnh chương đổi màu theo bảng; chướng ngại vẽ bằng mã | Không có tranh |
| Weltkriegsimulator | Nhiều lớp cuộn (biển, đảo ghép ô, mây) tạo chiều sâu; bảng sprite hoạt họa; **giao diện HTML phủ lên canvas**; bể đối tượng cho hiệu ứng nổ | Không ghi giấy phép, **không dùng** |
| Canvas Danmaku | Hệ hạt, danh sách vẽ sắp theo lớp, camera | Không giấy phép |
| Office Hell | **Một tệp bảng màu trung tâm** cho mọi màu UI / đạn / cảnh báo; **đạn địch trắng để dễ đọc nhất**; chế độ tập trung (Shift) hiện điểm va chạm của tàu | Nhạc CC BY / CC BY-SA / CC0 (phải ghi công); tranh không xem được (LFS) |
| Godot Shoot 'em Up | Hiệu ứng CRT toàn màn hình; nền núi nhiều lớp | Gói itch.io / Freesound, giấy phép riêng |
| Chmood/shmup | Địa hình nền sinh ngẫu nhiên; lớp mây | **Dùng tranh của Tyrian / OpenTyrian, rủi ro bản quyền** |
| OpenTyrian | Sprite 8-bit theo bảng màu cố định | GPL v2 (mã), dữ liệu Tyrian 2.1 freeware riêng |
| Learn HTML5 Shmup / template, Cosmos Wars | Sprite cơ bản, Phaser 2/3 | Không rõ |

**Kết luận [NX]:** về chất lượng tranh, không repo nào vượt PĐSB. Giá trị tham khảo nằm ở **kỹ thuật**: độ dễ đọc của đạn, chiều sâu nhiều lớp, quản lý hạt và hiệu năng, cách tổ chức bảng màu. **Không lấy tranh, âm thanh từ bất kỳ repo nào.**

## 4. Đề xuất (để bạn, GPT và Gemini chọn)

| # | Đề xuất [NX] | Lợi ích | Độ khó | Rủi ro | Ai làm |
|---|---|---|---|---|---|
| G1 | **Tìm và sửa vệt sáng vỡ điểm ảnh**: chụp lại có ghi nhật ký hiệu ứng đang chạy, vẽ ở độ nét thật hoặc thu nhỏ hiệu ứng | Hết che đạn, hết xấu | Trung bình | Thấp | Claude |
| G2 | **Hoãn thông báo nhận phi công / trang bị** cho tới khi đóng màn kết quả (hoặc đưa lên đầu thẻ) | Không che bảng tổng kết | Thấp | Rất thấp | Claude |
| G3 | **Tên boss + thanh máu boss dễ đọc hơn**: chữ lớn hơn, nền tối sau chữ, giữ đúng vị trí cũ | Đọc được trên điện thoại | Thấp | Thấp | GPT thiết kế, Claude ghép |
| G4 | **Giảm sáng đạn chính khi đạn địch dày**: tự hạ độ đậm chùm đạn người chơi khi quanh tàu có nhiều đạn địch (game đã có thông số `playerSideBulletAlpha`) | Rõ đạn địch lúc khó nhất | Trung bình | Thấp; cần đo cảm giác | Claude + GPT duyệt |
| G5 | **Chấm điểm va chạm** (1 chấm 3–4 px ở tâm tàu, chỉ hiện khi đạn địch đến gần ≤ 60 px), theo kiểu Office Hell | Người chơi biết chính xác chỗ bị trúng | Thấp | **Cần chủ dự án duyệt** (không phải vòng, nhưng là dấu hiệu mới trên tàu) | Claude |
| G6 | **Nền chương 6–10 + 3 tranh chướng ngại** (prompt GPT đã có) | Hết lặp nền, chương cuối có bản sắc | Cao (tranh) | Thấp | GPT vẽ, Claude ghép |
| G7 | **Ngân sách hạt / hiệu ứng theo FPS** (giới hạn số hạt đồng thời, tái dùng), học từ Sky Blaster / WKS / Danmaku | Giữ 60 FPS trên máy yếu | Trung bình | Thấp | Claude, cần đo máy thật |
| G8 | **Tệp bảng màu trung tâm cho mô-đun mới** (V206 trở đi), học từ Office Hell | Màu đồng bộ, dễ chỉnh | Thấp | Rất thấp | Claude |
| G9 | Lớp mây / bụi **phía xa** (không phủ lên vùng đạn) cho chương 6–10 | Chiều sâu | Trung bình | Có thể che đạn nếu đặt sai, chỉ làm lớp xa | GPT + Claude |
| — | **Không đề xuất**: hiệu ứng CRT / quét dòng (Godot) vì đổi phong cách; **đạn địch màu trắng** (Office Hell) vì trái luật màu đạn đã khóa | — | — | — | — |

**Claude khuyến nghị làm trước:**
- **G1 + G2** (lỗi thấy rõ, không đổi phong cách);
- tiếp theo **G3** và **G6**;
- **G5** chờ bạn quyết.
