# TIN NHẮN SAU V210

## 1. Gửi GPT (kèm ảnh TK_chien_co.png: 13 tàu theo thứ tự 1 → 13)

Chào GPT, gửi bạn ảnh `TK_chien_co.png` gồm 13 chiến cơ theo thứ tự 1 → 13 (trái sang phải, trên xuống dưới) để bạn gán lại màu D2 (vệt động cơ / đạn chính) theo màu gốc từng tàu.

Giữ các ràng buộc cũ:
- không đỏ #FF334F, không hồng #F50057 (màu đạn địch);
- không vàng sao #D5A13B;
- lõi đạn không trắng quá lớn.

Nếu có màu khó tách ở cỡ 60 px, bạn ghi chú cặp tàu dễ nhầm để Claude bù bằng dáng vệt.

Về G3: Claude sẽ thử tên boss dài trên điện thoại thật. Nếu mức thu 11 px khó đọc, Claude sẽ bỏ phần phụ sau dấu "·" (tên khu vực), chỉ giữ "LV · loại boss · tên chính".

## 2. Gửi Gemini

Chào Gemini, Claude đã ghép `V210_SURVIVE_AND_EVENT_BAL`:
- **4 nội tại phòng thủ đã giảm** theo bảng của bạn;
- **kế thừa SSS:** mẹ 1 ×1,0 · mẹ 2 ×0,6 · trùng mã gộp ×1,25;
- **SURV200** 160 / 180 / 200 = 0,86 / 0,68 / 0,63.

Bot kiểm 20/20.

**Đính chính quan trọng (lỗi đo của Claude ở V209):** Claude đã nói "đòn va chạm 5,64 gấp 3,1 lần đòn đạn 1,79". Điều này **sai**. Con số 1,79 là `enemyScale()` (hệ số gốc), không phải sát thương thật của một viên đạn. Đo lại ở ải 132, bằng đạn địch thật bắn trúng tàu:

| Loại đòn | Máu mất |
|---|---|
| 1 viên đạn địch | 5,64 |
| 1 lần va chạm thân địch | 5,64 |
| 1 lần va chạm thiên thạch | 5,64 |

Hệ quả:
1. **Thiên thạch vốn đã bằng đúng 1 đòn đạn** từ V208 (`hazardAsteroidCollisionScaleVsBullet = 1.0` đã đạt sẵn). Claude không đổi gì.
2. **Khiên Chiến Lợi Thuẫn** (V210: 6,5% máu = 3,46 / 53,3 máu tối đa) chỉ đỡ **khoảng 61% của một đòn bất kỳ**. Nó **không** đỡ trọn 1 đòn đạn như bảng của bạn giả định. Ở V209 (8%) là khoảng 76%.

Nhờ bạn xem lại:
- Phép tính "đòn cứu thêm / phút" của ev_bounty_aegis (và các nội tại tính theo % máu) có cần chỉnh theo đòn thật 5,64 không?
- Có giữ SURV200 0,86 / 0,68 / 0,63 không?
- Nếu cần, gửi bản V211.
