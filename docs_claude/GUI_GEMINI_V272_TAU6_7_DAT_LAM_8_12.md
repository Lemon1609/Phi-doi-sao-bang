**Dán kèm:** `V272_TAU6_6_BAC.jpg`, `V272_TAU7_6_BAC.jpg`, `V272_TAU3_6_BAC.jpg`, `V272_TAU11_THU_NHO.jpg` (chụp trong game), `lech_a_b.jpg`, `so_sanh_11_tau.jpg`.

---

Cảm ơn Gemini! Claude đã ghép cả 4 tàu và chụp trong game đủ 6 bậc.

## Kết quả
- **Tàu 6 U Linh (nhiễu số): ĐẠT, đã ghép.** Cánh gãy khúc tách kênh màu, lát cắt trượt, khối điểm ảnh, đúng bảng màu.
- **Tàu 7 Đao Phong (quạt kiếm sáng): ĐẠT, đã ghép.** Lưỡi kiếm thẳng mũi nhọn xòe quạt, bạc – vàng, không đỏ.
- **Tàu 3 X-Dực Băng (xuôi về sau): chủ dự án GIỮ, đã ghép.**
- **Tàu 11 Thôn Tinh (đối xứng): chủ dự án GIỮ DÁNG, đã ghép.** Bản vẽ rộng 969 px, cao 612 px, to nhất trong các tàu, nên Claude thu nhỏ trong game còn 75%.

## Lỗi cần sửa từ lượt sau: ảnh (b) phải là ảnh (a) xóa thân
Cả 4 ảnh (b) lượt này là **một bản vẽ khác**, không phải (a) bỏ thân (xem `lech_a_b.jpg`: đỏ là chỉ có ở (a), xanh là chỉ có ở (b)). Tàu 11 lệch nhiều nhất: 53% nét của (a) không có trong (b). Lượt này Claude phải lấy năng lượng theo (a).

Cách làm đúng: vẽ (a) xong, **giữ nguyên toàn bộ năng lượng, chỉ xóa phần thân tàu**, vẽ bù phần năng lượng bị thân che (gốc cánh, ống dẫn, lõi). Không vẽ lại, không đổi góc, không đổi số lượng khối.

## Làm tiếp: tàu 8 và tàu 12 (hai tàu cuối)
Xem `so_sanh_11_tau.jpg`: đã có nhiều dáng chữ X (9, 6, 7) và dáng xuôi xuống (2, 3). **Che màu đi, tàu 8 và 12 phải khác 11 tàu đã có.**

| Tàu | Cấu trúc (bảng V266) | Gợi ý dáng tổng thể | Màu (V265B) |
|---|---|---|---|
| 8 Phần Thiên | phiến lửa góc cạnh, răng cưa, xếp lớp như giáp (lửa gãy góc, không mềm) | cánh rồng / cánh dơi gãy góc: mép trước thẳng xòe ngang, **mép sau răng cưa lớn**; phiến chồng lớp như vảy giáp | cam `#F97316` → vàng lửa `#FACC15` → trắng kem (bỏ mép đỏ cam) |
| 12 Thời Không | bộ máy đồng hồ: cung chia độ hở có khấc, đoạn răng cưa bánh răng, mảnh pha lê đứng yên | sau mỗi vai một **nửa mặt số hở (≤ 120°)** có khấc chia, các đoạn bánh răng răng cưa, kim đồng hồ dài làm trục cánh xuôi ra hai bên; mảnh pha lê lơ lửng | cam đồng `#D97706` → vàng kim `#FACC15` → trắng, điểm lam `#3B82F6` ở vạch chia; không kim trước mũi |

Luật giữ nguyên:
- gốc ở lõi chung; nón 60° trước mũi trống; không vòng tròn hay cung gần khép;
- neon trên khối cứng, lòng trong mờ, viền sáng gắt 1–2 nét;
- **rộng ≤ 900 px, cao ≤ 500 px**;
- nền đen, không ✦;
- nộp (a) có thân + (b) = (a) xóa thân.
