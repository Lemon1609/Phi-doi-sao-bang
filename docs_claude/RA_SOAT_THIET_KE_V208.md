# RÀ SOÁT THIẾT KẾ CHIẾN CƠ · TRANG BỊ · VẬT PHẨM · QUÁI ĐỊCH · V208

Phi Đội Sao Băng · Claude · 08/11/2026. **Chỉ rà soát, chưa đổi tranh.**

**Giữ nguyên các quyết định đã chốt:**
- phong cách mỹ thuật hiện tại (chủ dự án đã từ chối bản "tiết chế" V198);
- **không** vẽ lại icon trang bị hợp thể;
- robot giữ bản V196B;
- trong trận không vòng quanh tàu / địch, không chữ bay;
- đạn địch đỏ / hồng.

Ký hiệu: **[KT]** = đã xem trực tiếp · **[NX]** = nhận xét / đề xuất · **[CKC]** = cần thử trên điện thoại thật.

## Đã xem
- **Bảng ghép tranh gốc lấy từ mã nguồn** [KT]:
  - 13 chiến cơ bậc SS: `TK_chien_co.png`;
  - 39 icon trang bị: `TK_trang_bi.png`;
  - vật phẩm rơi trong trận và icon HUD: `TK_vat_pham.png`;
  - 11 boss: `TK_boss.png`;
  - quái trong trận chương 5: `TK_quai_trong_tran.png`.
- **12 repo tham khảo** (báo cáo trước) và **blog chiencohuyenthoai.blogspot.com**:
  - Blog dùng giao diện động nên chỉ đọc được qua nguồn RSS: 5 bài văn bản, gồm 6 bộ giáp, 6 vũ khí, 2 bài mẹo Thách Đấu, 1 bài bị cắt.
  - **Không xem được ảnh trong blog** (công cụ chỉ đọc chữ) [KT].

## Đánh giá

| Nhóm | Điểm mạnh [KT] | Điểm cần cải thiện |
|---|---|---|
| **Chiến cơ (13 tàu)** | Tranh chi tiết, sắc nét, đồng bộ phong cách | Khoảng 8/13 tàu cùng tông **vàng + tím**, hình dáng tổng thể giống nhau (đối xứng, cánh xòe) [KT]. Trong trận tàu chỉ ~60 px, nên khó nhận ra đang lái tàu nào [NX / CKC] |
| **Icon trang bị (39)** | Mỗi món có hình riêng, màu rõ | **Kích thước trong ô không đều** [KT]: nhóm mảnh (Aegis9, Aegis, Inferno, Rail, Lance) chỉ chiếm ~30–40% ô, nhóm khối (Aurora, Monarch, Stellar) chiếm ~90%. **Không có nền / khung chung**, nên khi đặt cạnh nhau trông lộn xộn và icon mảnh gần như biến mất ở cỡ nhỏ [NX] |
| **Vật phẩm rơi** | Mỗi loại một màu riêng (Bom đỏ, Drone ngọc, Máu xanh lá, Nam châm tím, Đạn cam, Khiên xanh, Siêu cấp tím-vàng), dễ phân biệt | Viên trong trận nhỏ (~24 px) [KT]. Icon HUD (Khiên, Máu…) đẹp hơn hẳn viên trong trận [NX] |
| **Boss (11)** | Đa dạng hình khối và màu, đọc rõ phần cánh / lõi | 1 boss xám quân sự (Thiết Giáp) hơi lệch tông so với nhóm còn lại [NX]; chấp nhận được nếu là chủ ý |
| **Quái thường** | Rõ khối | **Quái màu trắng-vàng lẫn với chùm đạn vàng của người chơi và sao điểm vàng** [KT, ảnh 1–2], nhất là khi bắn chùm dày [NX] |

## Ý tưởng từ blog Chiến Cơ Huyền Thoại (chỉ phần chữ) [KT] và cách áp dụng [NX]
1. **Nội tại giáp kích hoạt theo sự kiện trong trận**:
   - Ánh Trăng: vào Siêu cấp thì có tỉ lệ tạo khiên;
   - Nguyên Sinh: nhặt kim cương thì hồi máu;
   - Sen Đỏ: nhặt gói hỗ trợ thì tạo khiên.

   PĐSB đã có nội tại giáp (V144/147/195). Có thể **thêm điều kiện kích hoạt kiểu "khi nhặt viên buff / khi vào Siêu cấp"** để người chơi cảm nhận rõ hơn. Cần Gemini cân số.
2. **Món ghép = ghép đúng 2 kỹ năng mẹ** (ví dụ Bảo hộ + Chuyển hóa). PĐSB đã làm theo hướng này với SSS → giữ nguyên.
3. **Vũ khí theo "chữ ký cơ chế"**: Theo dõi / Sinh sản (sát thương theo thời gian) / Phản xạ. Hữu ích để đặt tên và mô tả trang bị ngắn gọn bằng một từ khóa cơ chế (đề xuất D4).
4. **Siêu cấp nhân đôi điểm**, Thách Đấu tính điểm theo mốc boss. Có thể dùng cho bảng điểm Boss Rush / Thử thách ngày sau khi có Firebase.

## Đề xuất (để bạn, GPT, Gemini chọn)

| # | Đề xuất [NX] | Lợi ích | Độ khó | Rủi ro / ràng buộc | Ai làm |
|---|---|---|---|---|---|
| D1 | **Chuẩn hóa icon trang bị bằng mã**: tự cắt phần trong suốt, phóng cho món chiếm ~80% ô, thêm nền khung tròn / lục giác mờ theo màu phẩm chất (Lục / Lam / Tím / SSS). **Không vẽ lại tranh** | Kho đồ gọn, icon mảnh hết "biến mất" | Thấp | Không đổi tranh gốc; icon SSS chỉ được phóng to / căn giữa, không vẽ lại | Claude |
| D2 | **Nhận diện tàu trong trận**: thêm màu riêng cho **vệt động cơ / đạn chính** từng tàu (đã có màu riêng trong bảng V120), làm đậm hơn ở cỡ nhỏ | Biết đang lái tàu nào mà không vẽ lại tàu | Thấp–trung bình | Không chạm tranh tàu; không được trùng đỏ / hồng của đạn địch | Claude, GPT duyệt màu |
| D3 | **Tách màu quái thường khỏi đạn người chơi**: quái dùng viền / lõi theo bảng màu chương đã có (FX16 `enemyPalettes`) thay vì trắng-vàng; hoặc giảm sáng đạn người chơi khi chồng lên quái (G4 cũ) | Dễ nhìn quái và né hơn | Trung bình | Cần GPT duyệt bảng màu; không dùng đỏ / hồng đạn địch cho thân quái | GPT + Claude |
| D4 | **Mô tả trang bị theo "từ khóa cơ chế"** (Theo dõi · Xuyên · Nổ lan · Sinh sản · Phản xạ · Làm chậm) hiển thị như nhãn nhỏ trên chi tiết trang bị | Hiểu nhanh món làm gì | Thấp | Chỉ thêm chữ ngoài trận | Claude (Gemini duyệt nhãn) |
| D5 | **Viên rơi trong trận to thêm ~15–20%** và có đường viền tối để nổi trên nền sáng | Dễ thấy viên buff | Thấp | Không thêm vòng sáng quanh viên; chỉ đổi cỡ | Claude |
| D6 | **Làm lại silhouette 13 tàu cho khác biệt** | — | Cao | **Không khuyến nghị**: chủ dự án đã từ chối đổi phong cách; rủi ro lặp lại phản hồi V198 | — |
| D7 | **Nội tại giáp theo sự kiện** (ý tưởng blog mục 1) | Giáp có "chất" hơn | Trung bình | Cần Gemini cân số; luật buff vĩnh viễn giữ nguyên | Gemini + Claude |

**Claude khuyến nghị:**
- làm **D1 + D5 + D4** trước (chỉ bằng mã, không đổi tranh);
- **D2 / D3** cần GPT duyệt màu;
- **D7** cần Gemini;
- **D6 không làm**.

## Về việc học theo link game, link web
- **Đọc được [KT]:** trang web công khai có chữ (bài viết, wiki, RSS). Riêng blog này chỉ đọc được qua RSS.
- **Không làm được:** chơi thử game trên web, xem tranh / ảnh trong trang, xem video. Công cụ hiện chỉ đọc chữ; hệ thống chặn cài phần mềm ngoài để "nhái" game.
- **Hiệu quả nhất:** bạn gửi **ảnh chụp màn hình hoặc vài khung hình video**. Claude xem được ảnh và phân tích bố cục, cơ chế, cách phân bậc, rồi **tự thiết kế lại theo phong cách PĐSB**, không chép tranh / mã / tên riêng của game gốc.
- **Craft Anything** (repo vừa thêm, MIT / Apache-2.0): là ứng dụng máy tính viết bằng Rust, dùng AI dựng lại "phiên bản của bạn" từ một trang web / game.
  - Không chạy được trong phiên này (chặn cài mã ngoài).
  - Dùng nó để sao chép một game có bản quyền là **rủi ro pháp lý**.
  - Chỉ nên tham khảo cách nó "quan sát → dựng → so sánh → chỉnh", mà quy trình đo bằng bot hiện tại của PĐSB đang làm tương tự.
