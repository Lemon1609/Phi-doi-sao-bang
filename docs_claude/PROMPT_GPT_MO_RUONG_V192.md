# ĐỀ CHO GPT · TRANH MỞ RƯƠNG CÓ CỘT SÁNG THEO PHẨM (V192)

**Mục đích:** khi mở rương (ngoài trận, ở màn hình Rương và bảng kết quả Vô tận), chiếu một đoạn ngắn khoảng 1,2 giây:
1. rương rung;
2. nắp bật;
3. **cột sáng** phóng lên, màu theo phẩm cao nhất trong rương;
4. món đồ hiện ra.

Màn hình này nằm **ngoài trận**, nên luật "không vòng / không chữ trong trận" không áp. Tuy vậy vẫn **không vẽ chữ** vào tranh, vì chữ do game tự viết.

## Phẩm và màu cột sáng
Game mình: Trắng → Lục → Lam → Tím → Cam → S → SS → SSS. Chỉ từ **Lam** trở lên mới có cột sáng.

| Phẩm | Màu cột | Cảm giác |
|---|---|---|
| Lam | lam #3BA4FF | gọn, mảnh |
| Tím | tím #A45CFF | rộng hơn, có hạt lấp lánh |
| Cam | cam #FF8A2A | rộng, tia nhiệt |
| S / SS | vàng #FFC93C | rộng, 2 lớp (lõi trắng + vàng) |
| SSS | vàng kim #FFD86A + **tia nắng tỏa** phía sau | rực nhất, có tia nắng xoay chậm |

## Danh sách tranh

| Tệp | Cỡ | Nội dung |
|---|---|---|
| `ruong_dong.png` | 512×512 RGBA | Rương kim loại khoa học viễn tưởng **đóng**, nhìn chéo 3/4 từ trên, có khe sáng mờ |
| `ruong_mo.png` | 512×512 RGBA | Cùng rương, **nắp bật mở**, bên trong rỗng, lòng rương phát sáng trắng nhẹ (game tự nhuộm màu) |
| `ruong_nap.png` | 512×512 RGBA | Riêng nắp rương, để game cho bật lên và xoay (cùng góc nhìn) |
| `cot_sang_{lam,tim,cam,vang}.png` | 256×1024 RGBA | Cột sáng thẳng đứng, đáy rộng, ngọn mờ dần lên trên, lõi trắng, mép mềm. 4 màu theo bảng trên |
| `tia_nang_sss.png` | 1024×1024 RGBA | 12–16 tia nắng vàng kim tỏa từ tâm, mờ dần ra ngoài; game sẽ xoay chậm phía sau cột sáng SSS |
| `hat_sang.png` | 128×128 RGBA, dải ngang 4 khung 32×32 | 4 kiểu hạt lấp lánh (sao 4 cánh, chấm tròn mềm…), **màu trắng** để game nhuộm |

**Quy cách chung:**
- nền trong suốt, căn giữa, không chữ, không logo, không bóng đổ ra ngoài ô;
- rương và nắp phải **khớp nhau**: đặt `ruong_nap` lên `ruong_dong` phải trùng khít;
- phong cách: cùng họ tranh giao diện GPT đã vẽ cho game (`ui15` / `ui18`: kim loại xám đậm, viền lam/vàng, chi tiết sắc nét).

## Giao hàng
Một tệp `MO_RUONG_V192.zip` gồm 10 PNG ở trên. Claude tự dựng hoạt cảnh (rung → bật nắp → cột sáng → món đồ), có nút chạm để bỏ qua, rồi chụp cả 5 mức phẩm để duyệt.
