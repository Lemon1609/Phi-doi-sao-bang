Chào GPT, Claude đây. Chủ dự án đã có bảng vũ khí mới (Gemini lập, Claude soát). Nhờ bạn vẽ **28 hình vũ khí**.

## Quy cách chung (bắt buộc)
- Mỗi tệp là **một dải ngang các khung bằng nhau**, đúng cỡ ghi bên dưới. Ví dụ 64×64, 3 khung → ảnh 192×64.
- **Nền trong suốt hoàn toàn**; mỗi khung chừa lề 4 px.
- **Mũi hướng lên trên**, tâm hình ở giữa khung.
- **Chỉ trắng / xám** (lõi trắng sáng, viền xám bạc mờ dần), để game tô màu theo bậc. Riêng thân kim loại tên lửa được vẽ xám bạc chi tiết, nhưng lửa đuôi và quầng sáng để trắng.
- Các khung là nhịp sáng / lửa đuôi / xoay nhẹ của cùng một hình, không đổi dáng.
- Không vòng tròn khép kín; không chữ, không dấu hình mờ.
- Nhìn lướt phải phân biệt được từng loại.

## A. Đạn chiến cơ (15 tệp)
| Tệp | Cỡ khung · số khung | Hình |
|---|---|---|
| `tau1_cau_lua.png` | 64×64 · 3 | cầu lửa plasma đầu tròn, đuôi lửa uốn nhẹ (không phải lông nhọn) |
| `tau1_cau_lua_bt.png` | 96×96 · 3 | cầu lửa lớn bản Bạo Tẩu |
| `tau3_khoi_bang.png` | 64×64 · 2 | khối băng lục giác ngắn, dày, cạnh cắt |
| `tau3_manh_bang.png` | 32×48 · 2 | mảnh dăm băng sắc (văng ra khi khối băng vỡ) |
| `tau4_vuot.png` | 64×96 · 2 | lưỡi vuốt năng lượng cong sắc |
| `tau4_vuot_bt.png` | 80×112 · 2 | vuốt lớn bản Bạo Tẩu |
| `tau5_quang_tien.png` | 48×96 · 2 | phiến lăng kính hình thoi dẹt |
| `tau6_khoi_pixel.png` | 48×64 · 3 | khối vuông / chữ nhật nhiễu số, lệch lớp |
| `tau7_kiem_khi.png` | 40×112 · 2 | **thanh kiếm khí ánh sáng thẳng, mũi nhọn** (cùng họ với cánh bung quạt kiếm của tàu 7; **không làm trăng khuyết**) |
| `tau7_kiem_khi_bt.png` | 56×128 · 2 | kiếm khí lớn bản Bạo Tẩu |
| `tau8_ten_lua_nhiet.png` | 48×96 · 2 | tên lửa nhiệt áp thân ngắn, đầu tù, có cánh đuôi |
| `tau10_cau_luc_giac.png` | 64×64 · 2 | cầu năng lượng bọc khung lục giác |
| `tau11_cau_ho_den.png` | 64×64 · 3 | cầu lõi tối viền sáng |
| `tau11_hat_xoan.png` | 32×48 · 2 | hạt năng lượng chữ nhật bo góc (bay xoắn) |
| `tau12_dia_banh_rang.png` | 64×64 · 2 | đĩa có khấc răng cưa đồng hồ (răng cưa đứt quãng, lòng đĩa rỗng không khép thành vòng liền) |
| `tau13_luoi_hai.png` | 64×112 · 2 | lưỡi hái hình học bản dày, lòng tối lấm tấm sao |
| `tau13_luoi_hai_bt.png` | 96×128 · 2 | lưỡi hái lớn bản Bạo Tẩu |

(Tàu 2 laser và tàu 9 tia HUD do Claude vẽ bằng mã.)

## B. Tên lửa trang bị (13 tệp, 48×96 · 2 khung lửa đuôi)
Dáng **đầu đạn** phải khác nhau rõ:
`tl_01_hoa_nguc` đầu nhọn nhiệt hạch · `tl_02_han_suong` chóp băng lục giác trong mờ · `tl_03_loi_kich` đầu 2 ngạnh kìm · `tl_04_ngu_loi` ngư lôi thân dày đầu bo tròn (64×112) · `tl_05_xoan_oc` tên lửa thon gọn · `tl_06_thien_tinh` tên lửa mảnh cánh đuôi chữ V · `tl_07_thien_kiem` thân dẹt như thanh kiếm · `tl_08_diet_tinh` đầu mũi khoan xoắn bậc thang · `tl_09_phan_quyet` cánh chữ thập · `tl_10_bay_dan` tên lửa tí hon đầu tròn (32×48) · `tl_11_huyet_tinh` đầu tinh thể lăng trụ · `tl_12_qua_khu` thân thắt eo đồng hồ cát · `tl_13_tram_khong` mũi gắn lưỡi liềm ngang.

## C. Vũ khí phụ (4 tệp)
| Tệp | Cỡ · số khung | Hình |
|---|---|---|
| `vp_nguyet_nhan.png` | 64×64 · 2 | đĩa lưỡi liềm 2 đầu nhọn (khung 2 xoay 45°) |
| `vp_quang_thuong.png` | 48×112 · 2 | mũi quang thương thuôn dài, ngạnh chữ V ở chuôi |
| `vp_drone_tau_me.png` | 64×64 · 2 | drone hộ vệ mini nhìn từ trên |
| `vp_dong_ho_cat.png` | 48×64 · 2 | cặp tam giác đối đỉnh (đồng hồ cát) |

Nộp một tệp zip `V274_HINH_VU_KHI.zip`, kèm một ảnh xem trước xếp cả 28 hình trên nền tối.
