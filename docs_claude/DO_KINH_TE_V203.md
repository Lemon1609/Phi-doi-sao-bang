# ĐO KINH TẾ CUỐI GAME · V203 (mục 4)

Phi Đội Sao Băng · Claude · 08/11/2026.
Số liệu lấy từ **mã nguồn bản V202**: bảng rơi, chi phí, giới hạn ngày. Đây là phép tính, chưa phải đo bằng bot trong trận.
Giả định người chơi:
- không mua thể lực bằng 💎;
- không có thẻ tháng.

## 1. Thể lực (giới hạn chung)

| Mục | Giá trị |
|---|---|
| Hồi thể lực | 1 / 5 phút → **288 / ngày** (trần 120) |
| Càn quét | 6 🔋, miễn phí 10–15 lượt / ngày (SWEEP92), sau đó tốn vé |
| Chơi lại ải thường | 6 🔋 |
| Chơi lại ải boss | 10 🔋 |

## 2. Tinh Hạch Siêu Việt (sss_core)

### Nguồn

| Nguồn | Lượng | Điều kiện |
|---|---|---|
| Chiến dịch ải 161–200 (chơi hoặc càn quét) | thường **2** · mini-boss **3** · boss **5** | Càn quét **không bị giảm** (khác Nguyệt Thực) |
| Nguyệt Thực, chơi | 1 / 2 / 3 | Mở khi đã qua ải 60 + có món Tiến hóa 3 |
| Nguyệt Thực, càn quét | 1 / 1 / 2 | Tối đa 5 lượt / ngày |
| Đổi 3 nguyên liệu Tím + 2.000 ◈ | 1 | Tối đa 15 lượt / tuần (≈ 2 / ngày) |

### Thu mỗi ngày (ước tính)

| Giai đoạn | Chơi thường | Cày tối đa |
|---|---|---|
| Ải 110–160 (chỉ có Nguyệt Thực và đổi) | **≈ 8–10** | ≈ 15 |
| Sau ải 160 | **≈ 77** (15 lượt càn quét ải boss × 5, cộng đổi) | ≈ 170 (cộng 19 lần chơi lại ải boss) |

### Chi

| Mục chi | Số Tinh Hạch |
|---|---|
| Mở SSS, Lv1 → Lv5 | 50 / món |
| Đột phá SSS ★1 → ★10 | 10 + 15 + 20 + 30 + 40 + 55 + 70 + 90 + 115 + 140 = **585 / món** |
| Rèn đá đặc biệt | 9 |
| Nâng đá đặc biệt | 12 |

Một bộ đang dùng (1 siêu chiến cơ + 3 trang bị SSS) cần **≈ 2.540 Tinh Hạch**.

| Giai đoạn | Thời gian đủ một bộ |
|---|---|
| Chơi thường sau ải 160 | ≈ **33 ngày** |
| Cày tối đa | ≈ 15 ngày |
| Nếu chỉ ở ải 110–160 | ≈ 250+ ngày |

### Nhận xét

1. Ổn ở cuối game.
2. Có **bậc nhảy ×8** khi qua ải 160: thu tăng từ ~10 lên ~77 mỗi ngày.
3. Ở ải 110–160 gần như chỉ đủ mở SSS và lên ★1–★3.
4. Càn quét ải boss 161+ cho đủ 5 hạch. Nên giữ như vậy, vì đây là phần thưởng cho việc qua chương cuối.

## 3. Vật liệu Chip (Tinh thể · Bộ mã hóa · Lõi chip)

### Thu mỗi ngày sau ải 110

| Nguồn | Tinh thể (cry) | Bộ mã hóa (coder) | Lõi chip (core) |
|---|---|---|---|
| Nhiệm vụ VKTT ngày (boss, vô tận, nhiệm vụ) | 90 | 1 | 2 |
| Nhiệm vụ tuần Nguyệt Thực, chia 7 | 14 | 0,3 | 0,7 |
| **Tổng / ngày** | **≈ 104** | **≈ 1,3** | **≈ 2,7** |

Thêm:
- phân rã chip (q2+ cho 1–3 coder / core);
- quà một lần (cry 300 · coder 2 · core 4).

### Chi

| Mục chi | Chi phí |
|---|---|
| Chế tạo 1 chip | cry 100 (lần đầu trong ngày 50) + 150 ◈ |
| Tẩy chỉ số (CAL191) | cry 20 / 40 (+1 core) / 80 (+1 core + 25💎) |
| Tẩy dòng (RRT191) | coder 2 / 3 / 4 + core 2 / 3 / 4 (+15 / 30💎) |

### Vấn đề chính: tẩy dòng có tên gần như không thể nhắm

Để ra đúng một **dòng có tên cho đúng món đang dùng** (ví dụ: "+x% ST tên lửa Phán Quyết"), xác suất mỗi lần tẩy là:

> 50% ra dòng có tên × 25% đúng nhóm × 1/13 đúng món ≈ **1%**

| Chỉ số | Giá trị |
|---|---|
| Số lần tẩy trung bình | ~100 lần (mức rẻ nhất) |
| Bộ mã hóa cần | ~200 |
| Thời gian | **~150 ngày**, chỉ để có **một** dòng đúng món |

Người chơi sẽ bỏ cuộc. Chip vì thế chỉ đạt khoảng +11% DPS đã đo, và hệ "dòng có tên" (V193) gần như không có tác dụng thực tế.

## 4. Đề xuất (chờ Gemini / chủ dự án chốt, chưa làm)

| # | Đề xuất | Tác động | Rủi ro |
|---|---|---|---|
| A | **Khóa nhóm khi tẩy dòng.** Người chơi chọn nhóm (Chiến cơ / Vũ khí / Giáp / Toàn bộ) trước khi tẩy, tốn thêm +1 coder. Khi đã chọn nhóm, dòng có tên **ưu tiên món đang trang bị** với tỷ lệ 50%. | Xác suất ra đúng món: 1% → **≈ 25%** (50% ra dòng có tên × 50% đúng món; ~4 lần tẩy) | Thấp. Không thêm 💎, không đổi khóa lưu |
| B | Bảo hiểm tẩy dòng: sau 10 lần không ra dòng có tên đúng món đang dùng thì lần thứ 11 chắc chắn ra | Trần chi phí ~10 lần tẩy | Thấp |
| C | Thêm coder vào nguồn có sẵn: boss Chiến dịch 161+ cho coder ×1, thêm vào **hộp mục tiêu tuần** (không thêm nguồn 💎) | coder 1,3 → ~2,5 / ngày | Trung bình (lạm phát) |
| D | Tinh Hạch ở ải 110–160: tăng lượt đổi tuần 15 → 25, **hoặc** Nguyệt Thực càn quét 1/1/2 → 1/2/3 | Giảm bậc nhảy ×8 xuống khoảng ×5 | Thấp |

Claude khuyến nghị:
- **A + B** (giải quyết gốc vấn đề, không lạm phát tài nguyên);
- **D** bản nhẹ (tăng lượt đổi tuần lên 25);
- chưa làm C.

Sau khi được chốt, Claude sẽ dùng bot thật để đo lại:
- số lần tẩy trung bình;
- DPS chip tăng bao nhiêu (giữ trần ≤ 15%).

## 5. ĐÃ LÀM V203 (Gemini chốt 08/11 · A + B + D) · cờ tắt `window.ECON203=false`

| Hạng mục | Kết quả |
|---|---|
| A · Nhắm dòng khi tẩy | 5 lựa chọn: Ngẫu nhiên (+0) · Chiến cơ / Tên lửa / Vũ khí phụ / Giáp (+1 Bộ mã hóa) |
| B · Bảo hiểm | Sau 10 lần trượt, lần thứ 11 chắc chắn ra dòng có tên của món đang dùng. Bộ đếm hiện ngay trên màn chip. |
| D · Tinh Hạch | Càn quét Nguyệt Thực 1/1/2 → **1/2/3** · đổi Tinh Hạch **15 → 25 lượt/tuần** |
| Bảng chọn kết quả | Dòng mới hiện "★ ĐANG DÙNG" nếu trúng món đang mặc |

### Đo thật bằng bot · 2.000 lần tẩy mỗi chế độ (tài khoản mẫu ải 160)

| Chế độ | Trúng dòng món đang dùng | Chuỗi trượt dài nhất |
|---|---|---|
| Ngẫu nhiên (đúng 1 trong 4 món) | 17,8% | 10 |
| Khóa Chiến cơ | 26,4% | 10 |
| Khóa Tên lửa | 30,7% | 10 |
| Khóa Vũ khí phụ | 29,3% | 10 |
| Khóa Giáp | 28,1% | 10 |

- Mục tiêu là 25%. Đo được cao hơn vài điểm vì có bảo hiểm cộng thêm.
- Trước V203: khoảng 1%.
- Không đổi giá trị % của dòng nên trần DPS chip ≤ +15% giữ nguyên.
- Kiểm thử t156: 14/14. Đã sửa mục đổi Tinh Hạch theo giới hạn mới 25.
