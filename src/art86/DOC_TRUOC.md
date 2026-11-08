# Đồ họa Phi Đội Sao Băng · V85

76 PNG đã hoàn thành theo PROMPT_GPT_V85.md:

| Thư mục | Số PNG | Nội dung |
|---|---:|---|
| gear85 | 42 | Bộ 6–12; giáp 384, bệ tên lửa một bên 256, drone 256; mỗi món evo1/evo2 |
| boss85 | 12 | Boss 120/140/160; mỗi boss p1/p2/p3 và portrait, đều 768×768 |
| skin85 | 6 | Một skin mỗi tàu #11–#13, thường và Bạo Tẩu; 500×500 |
| ebullet85 | 16 | 4 hình × 4 màu; 64×64 |

## Căn tâm và ghép tranh

- Tọa độ tính bằng px, gốc trên trái. Pivot ở tâm khung: 384 → (191.5,191.5); 256 → (127.5,127.5); 768 → (383.5,383.5); 500 → (249.5,249.5); 64 → (31.5,31.5).
- Giáp giữ vùng giữa rỗng bán kính 90 px. Xem ảnh ghép thử `xem_truoc/giap_dat_quanh_tau.jpg` và kết quả alpha trong manifest.
- Bệ tên lửa chỉ một bên; mấu gắn ở bên trái ảnh. Claude tự lật để dùng phía đối diện. Drone là vật thể bay kèm độc lập.
- Tên tệp áp dụng nguyên văn `<id>` + hậu tố V85. Ví dụ `forge_armor_armor_shell_idle_evo1.png` và `forge_missile_missile_pod_evo1.png` là chủ ý, do id đã chứa chữ armor/missile. Manifest liệt kê đủ đường dẫn để ghép.
- Boss quay xuống. `boss85/<ải>/registration.json` có pivot chung, tâm lõi và tâm hai cánh từng pha; ba pha dùng chung một hệ số tỉ lệ. Cả hai cánh vẫn được vẽ trong mọi pha hư hỏng để Claude xử lý trạng thái phá cánh.
- Skin quay lên; mũi/thân sau ở y=49.5/449.5, trục x=249.5, khớp registration q1 trong nguồn V83. `skin85/registration.json` ghi từng ảnh.
- Đạn kim hướng lên; tâm sáng ở giữa ảnh. Orb nhỏ và orb lớn có vòng khác nhau, kích thước hình trong khung cũng khác nhau. Bốn màu theo đúng lava/hunter/omega/void.
- Các PNG giữ alpha, không atlas. Mục `completed` trong manifest ghi kích thước, pivot, checksum và kết quả kiểm tra. `generation_prompts.json` lưu bộ prompt tạo ảnh bằng công cụ tích hợp.

## Phần còn chờ

6 ảnh SSS chưa vẽ: Huyết Tinh Thôn Phệ Giả, Vĩnh Hằng Thời Không, Chân Thần Hư Không; mỗi chiếc thường/Bạo Tẩu. Chờ REVIEW85.md của Gemini mô tả hình ảnh.

## Duyệt hình

Thư mục `xem_truoc` có bảng ghép để xem nhanh. Đã kiểm tra kích thước, alpha, khoảng giữa giáp, đăng ký tâm boss/skin, tâm sáng đạn và số lượng tệp. Gói này là đồ họa; Claude ghép và chụp màn hình trong game để duyệt kích thước hiển thị thực tế.
