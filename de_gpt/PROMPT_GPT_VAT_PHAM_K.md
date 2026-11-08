# PHẦN K — VẬT PHẨM · game Phi Đội Sao Băng (bắn máy bay dọc, mobile)

Chào bạn. Phần J (13 bộ trang bị) đã xong và đã vào game, cảm ơn bạn. Phần K làm lại **vật phẩm**.

**Yêu cầu của chủ dự án:**
- **Lên cấp phải đổi hình**, không chỉ đổi màu.
- **Mỗi skin một dáng riêng.**

Xem ảnh kèm `HIEN_TRANG_VAT_PHAM.png`: tranh hiện có. Phần ghi "LÀM LẠI" đang chỉ khác màu; phần ghi "GIỮ NGUYÊN" thì không cần vẽ.

Cách giao giống Phần J: chỉ gửi **bảng ảnh nền trong suốt**, Claude tự cắt, thu cỡ, căn tâm và ghép.

---

## BƯỚC 1 — Bản phác bóng (duyệt trước, chưa tô màu)

Gửi **một** ảnh `PHAC_K.png`: bóng đen đặc trên nền trắng cho toàn bộ món dưới đây, mỗi họ một hàng, có ghi tên tệp dưới mỗi bóng.

Claude sẽ thu mỗi bóng về 40 px để kiểm:
- trong cùng một họ, 2 cấp liền nhau phải nhận ra khác nhau chỉ bằng bóng;
- 6 skin cùng loại phải khác dáng.

Duyệt xong mới tô màu (Bước 2).

---

## BƯỚC 2 — Gói K1: nguyên liệu và đá khảm → `VP_K1.zip`

Mỗi tệp là **một hàng ngang**, các cấp xếp **trái → phải**, các hình cách nhau **≥ 40 px** (kể cả quầng sáng).

| Tệp | Số hình | Món (tên trong game) | Hướng tiến hóa gợi ý |
|---|---|---|---|
| `mat_alloy.png` | 3 | Lõi Hợp Kim | khối lục giác thô → có vành gân và lõi → nhiều tầng, có cánh tản nhiệt |
| `mat_crystal.png` | 3 | Tinh Thể Năng Lượng | 1 tinh thể → cụm 3 → cụm lớn có đế và tia sáng |
| `mat_circuit.png` | 3 | Mạch Lượng Tử | bản mạch phẳng → bản 2 lớp có chip → khối mạch 3D có dây nối |
| `mat_plasma.png` | 3 | Sợi Plasma | ống đơn → ống đôi xoắn → ống có vòng hãm và tia điện |
| `stone_c.png` | 5 | Đá khảm phẩm Trắng → Lục → Lam → Tím → Cam | viên thô → mài 1 mặt → mài nhiều mặt → có khung kim loại → đá chạm khắc có hào quang |
| `stone_x.png` | 3 | Đá đặc biệt Lam / Tím / Cam (chứa ký hiệu α β Ω Σ) | **ô giữa trống** để game đặt ký hiệu; khung ngày càng cầu kỳ |

**Màu:**
- Nguyên liệu: cấp 1 lục, cấp 2 lam, cấp 3 tím (giữ như cũ).
- Đá: Trắng #d6e0ea · Lục #3ee08f · Lam #3aa8ff · Tím #b45cff · Cam #ff9a2e.

**Quy tắc:**
- Cấp sau **thêm bộ phận hoặc đổi khối**, không chỉ đổi màu.
- Cấp cao không được nhỏ hơn cấp thấp.

---

## BƯỚC 3 — Gói K2: skin → `VP_K2.zip`

Skin chỉ đổi hình ảnh (không có chỉ số). Mỗi skin một thư mục.

### 3a. Skin đạn (thay đạn chính của chiến cơ) — 6 thư mục `skin_bullet_1` … `skin_bullet_6`

Mỗi thư mục có:
- `icon.png`: 1 hình đại diện;
- `dan.png`: **4 khung** đạn bay **thẳng lên**, một hàng, mũi hướng lên. Dáng thon dọc: ngang ≤ 60% cao, kể cả quầng.

| Thư mục | Tên trong game | Dáng bắt buộc khác nhau |
|---|---|---|
| skin_bullet_1 | Huyết Nguyệt Laser (đỏ cam) | đoạn tia laze có lõi trắng |
| skin_bullet_2 | Băng Tinh Cực Hàn (xanh băng) | mũi băng nhiều cạnh |
| skin_bullet_3 | Lôi Điện Tím | tia sét gấp khúc |
| skin_bullet_4 | Anh Đào Thất Sắc (hồng, cầu vồng nhẹ) | cánh hoa xoay, có vệt |
| skin_bullet_5 | Hư Không Tím | cầu tối có vệt đuôi (không vẽ vành tròn) |
| skin_bullet_6 | Hoàng Kim Vũ (vàng) | lông vũ hoặc mũi tên vàng |

### 3b. Skin khung (hiệu ứng bám chiến cơ) — 6 thư mục `skin_frame_1` … `skin_frame_6`

**Quy tắc đã khóa của game: KHÔNG vẽ vòng tròn hay vành khép kín quanh tàu.** Hiệu ứng phải là cánh, luồng phản lực, hạt hoặc vệt **sau đuôi hoặc hai bên** tàu.

Mỗi thư mục có:
- `icon.png`
- `hieu_ung.png`: **4 khung lặp** nhìn từ trên xuống, KHÔNG vẽ chiến cơ, chừa trống phần giữa (chỗ tàu nằm).

| Thư mục | Tên trong game | Gợi ý |
|---|---|---|
| skin_frame_1 | Đôi Cánh Hỏa Phượng | cánh lửa hai bên |
| skin_frame_2 | Vòng Phản Lực Lam | 2–3 luồng phản lực xanh sau đuôi (không vẽ vòng) |
| skin_frame_3 | Lôi Vân Hộ Thể | mây sét lấp lóe hai bên sườn |
| skin_frame_4 | Mạch Điện Tử Hồng | đường mạch hồng chạy dọc hai bên |
| skin_frame_5 | Hào Quang Chúa Tể | tia sáng tím vàng tỏa ra sau lưng hình quạt |
| skin_frame_6 | Khiên Lục Giác Vàng | vài mảnh lục giác vàng rời bay quanh hai bên (không khép thành vòng) |

### 3c. Skin nổ (thay nổ của bom) — 6 tệp `boom_skin_1.png` … `boom_skin_6.png`

Mỗi tệp là **8 khung** một hàng: nhỏ → bùng lớn nhất ở khung 4–5 → tan dần, khung 8 gần tắt hẳn. **Không vẽ vành tròn loang.**

| Tệp | Tên trong game | Dáng bắt buộc khác nhau |
|---|---|---|
| boom_skin_1 | Pháo Hoa Vinh Quang | các vệt pháo hoa bay tỏa rồi rơi |
| boom_skin_2 | Băng Vỡ Tuyệt Đối | khối băng nứt rồi vỡ thành mảnh văng |
| boom_skin_3 | Lôi Điện Bùng Nổ | các nhánh sét đâm ra |
| boom_skin_4 | Hoa Anh Đào | cánh hoa bung rồi bay lả tả |
| boom_skin_5 | Hố Đen Nuốt Chửng | **hút vào trong** rồi lóe (xoáy, không vành) |
| boom_skin_6 | Hoàng Kim Siêu Tân Tinh | tia vàng dài tỏa hình sao nhiều cánh |

---

## Quy tắc chung (rút từ Phần J)

1. Nền **trong suốt thật** (alpha), không nền đen hay trắng (trừ ảnh phác Bước 1).
2. Các hình trong một bảng cách nhau **≥ 40 px**, quầng sáng không chạm nhau.
3. Không chữ, số, viền khung hay lưới trong ảnh.
4. Không tự cắt hay căn; chỉ cần đủ hình, đúng thứ tự, đúng hướng.
5. Phong cách đồng bộ với trang bị Phần J: kim loại sáng, phát quang, chi tiết rõ khi thu nhỏ.
6. Mỗi gói kèm `DOC_TRUOC.txt`: ghi chỗ chưa chắc (hình sát nhau, món lệch bóng đã duyệt…).

**Thứ tự giao:** `PHAC_K.png` → (Claude duyệt) → `VP_K1.zip` → `VP_K2.zip`.
