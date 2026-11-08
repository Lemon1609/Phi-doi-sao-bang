# BÁO CÁO V210 · Phi Đội Sao Băng · 08/11/2026

## Đã ghép (Gemini `V210_SURVIVE_AND_EVENT_BAL`)

| Hạng mục | V209 → V210 |
|---|---|
| Khiên Siêu Cấp | tỉ lệ 50–100% → 40–80% · hồi 12 → 16 s · trần 3 → 2 lần/phút |
| Tiếp Tế Mạch | hồi máu 2,0–3,5% → 1,5–2,5% · giáp 3–4% → 2–3% · trần 18% → 12% máu/phút · hồi 3 → 3,5 s |
| Lách Đạn Phản | 5 → 6 lần sượt · giáp 5–8% → 3,5–6% · hồi 5 → 6 s · trần 8 → 6 lần/phút |
| Chiến Lợi Thuẫn | xóa nợ 20–35% → 15–25% · khiên 5–8% → 4–6,5% máu · trần 12% → 10% |
| Phá Chướng Nạp, Xung Phá Vây | giữ nguyên |
| Giáp SSS (2 món mẹ) | mẹ 1 ×1,0 · mẹ 2 ×0,6 · nếu trùng nội tại thì gộp 1 và ×1,25. Chi tiết SSS ghi "hiệu lực 60%" / "125%" |
| Sát thương địch SURV200 | ải 160 / 180 / 200: 0,82 / 0,65 / 0,60 → 0,86 / 0,68 / 0,63 |
| Mô tả nội tại | thời gian hồi, trần, số lần sượt hiển thị theo số V210 |

Tắt toàn bộ phần cân bằng V210 bằng `window.BAL210=false` (trả về số V209).

## Đính chính số đo V209
- **Va chạm không gấp 3,1 lần đòn đạn.** Đo bằng đạn địch thật ở ải 132: đạn = va chạm = thiên thạch = 5,64 máu. Trước đó Claude đã so nhầm với hệ số gốc `enemyScale` (1,79).
- **Thiên thạch đã bằng đúng 1 đòn đạn** từ V208, không cần sửa.
- **Khiên Chiến Lợi Thuẫn 6,5% máu đỡ khoảng 61% một đòn.** Đã gửi Gemini xem lại.

## Kiểm tra (bot)
- Hồi quy t156: **14/14**.
- Test V209 + V210: **20/20**:
  - các nội tại đúng số V210 (hồi 2,5% máu, 6 lần sượt hồi 6% giáp, khiên 6,5%);
  - hồi nội bộ 16 s;
  - kế thừa SSS 1,0 / 0,6 / 1,25;
  - SURV200 0,86 / 0,68 / 0,63;
  - thiên thạch = 1 đòn đạn thật.
- Test V204 **8/8** · V206 **7/7** · V207 **8/8**.
  - Khi chạy nhiều test cùng lúc (máy chậm), test V206 một lần thấy luyện tập boss bị cộng thêm 3 ◈, do bộ hẹn giờ thu hồi Hợp kim trễ nhịp. Chạy lại riêng thì đạt.
  - Cần để ý trên máy yếu; nếu lặp lại, Claude sẽ đổi sang chặn cộng Hợp kim ngay từ đầu thay vì thu hồi sau.
