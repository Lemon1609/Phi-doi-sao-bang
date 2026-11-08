# PHI ĐỘI SAO BĂNG · ĐO ĐỘ KHÓ ẢI 20–200 (Claude, V187, 01/11/2026)

**Mục đích:** kiểm số liệu "tường độ khó" của Gemini (bản rà soát V182) bằng dữ liệu thật trong game.

**Cách đo:** dùng kịch bản `claude_tools/do_dac/t89p.py`.
- Dựng tài khoản mẫu theo từng mốc:
  - mốc 100–200: theo `STAGE_BENCHMARK_100_200_V89` của Gemini;
  - mốc 20–80: Claude giả định cho người chơi không nạp.
- Thử 3 bậc chiến cơ (thường / S / SS), giữ bậc có lực chiến gần mức đề nghị nhất.
- Đánh boss với tàu bất tử, luôn đứng thẳng dưới boss. Vì vậy thời gian hạ boss là **mức nhanh nhất**; chơi thật phải né đạn, ước lượng lâu hơn 1,5–2 lần.

## 1. Lực chiến: tài khoản mẫu so với mức đề nghị

| Ải | Đề nghị | Chiến cơ thường | Bậc S | Bậc SS | Máu boss | Hạ boss (nhanh nhất) |
|---|---|---|---|---|---|---|
| 20 | 1.328 | 1.086 (82%) · tài khoản mới tinh 904 (68%) | 2.045 | 3.436 | ≈1.000 | mới tinh 19,6 s · mẫu < 5 s |
| 40 | 1.568 | 1.145 (73%) | 2.159 | 3.649 | ≈1.000 | ≈ 5 s |
| 60 | 1.808 | 2.083 (115%) | 3.289 | 5.018 | — | < 5 s (chết trước khi kịp đo) |
| 80 | 2.551 | 2.318 (91%) | 3.554 | 5.346 | ≥ 3.200 | ≈ 8 s |
| 100 | 3.600 | 2.409 (67%) | **3.713 ✓** | 5.605 | 32.195 | 17,3 s |
| 120 | 5.100 | 3.475 (68%) | **4.934 (97%)** | 7.059 | 65.561 | 42,7 s |
| 140 | 8.200 | 4.468 (**54%**) | 6.134 (75%) | **8.527 ✓** | 179.589 | 22,3 s |
| 160 | 9.600 | 5.545 (58%) | 7.411 (77%) | **10.109 ✓** | 417.292 | 22,3 s |
| 180 | 12.800 | 8.330 (65%) | 10.260 (80%) | **13.099 ✓** | 387.725 | 26,4 s |
| 200 | 14.800 | 9.070 (61%) | 11.190 (76%) | **14.274 (96%)** | 478.946 | 25,5 s |

Sát thương mỗi đòn của địch bằng hệ số `enemyScale` của ải:

| Ải | 20 | 40 | 80 | 120 | 160 | 200 |
|---|---|---|---|---|---|---|
| ST/đòn | 0,91 | 0,98 | 1,13 | 1,27 | 1,42 | 1,56 |

## 2. Kết luận
1. **Tường thật nằm ở ải 100 và ải 140, không phải 20/40/80/120/160/200 như Gemini ghi.**
   - Từ ải 100 phải có chiến cơ **bậc S**: chiến cơ thường chỉ đạt 67%, sát thương bị phạt.
   - Từ ải 140 phải có **bậc SS**: bậc S chỉ đạt 75%. Mức đề nghị tăng vọt 61% từ ải 120 lên 140, là bước nhảy lớn nhất cả game.
   - Ải 200: kể cả bậc SS + siêu chiến cơ SSS cũng chỉ đạt 96%.
2. **Boss chương 1–4 quá yếu so với tài khoản đúng tiến độ.**
   - Boss ải 20–80 chỉ khoảng 1.000–3.000 máu, chết trong 5–8 giây (nhanh nhất), tức chơi thật khoảng 10–15 giây.
   - Gemini đặt mục tiêu đánh boss 50–70 giây.
   - Chỉ người chơi hoàn toàn chưa nâng cấp mới mất khoảng 20 giây (30–40 giây chơi thật) ở ải 20.
3. **Boss ải 100–200** chết trong 17–43 giây (nhanh nhất), tức chơi thật khoảng 30–80 giây: **gần đúng mục tiêu**. Ải 120 dài gấp đôi các ải lân cận (42,7 giây) vì bậc S ở đây chỉ vừa đủ (97%).
4. **Số "sát thương địch mỗi đòn" của Gemini** (ải 20: 0,9; ải 40: 1,1; ải 80: 1,5) **không có trong mã game**. Giá trị thật xem bảng ở mục 1.

## 3. Chưa trả lời được (cần làm tiếp)
- **Người chơi không nạp có kịp lên bậc S trước ải 100, và SS trước ải 140, không?** Phải tính nguồn mảnh chiến cơ mỗi ngày (điểm danh, rương, phó bản, sự kiện) so với lượng mảnh cần để nâng bậc. Claude có thể đo từ mã game nếu chủ dự án đồng ý.
- **Khả năng sống sót** (bao nhiêu đòn thì chết, lượng đạn dày ở từng ải) chưa đo, vì phép đo dùng tàu bất tử.

## 4. Đề xuất (chờ chủ dự án duyệt)

| # | Đề xuất | Ảnh hưởng |
|---|---|---|
| A | Tăng máu boss ải 20/40/60/80 lên khoảng ×3 (mục tiêu 15–25 s ở mức nhanh nhất) | Boss chương đầu có cảm giác "trùm"; người mới chưa nâng cấp sẽ mất khoảng 60 s, cần kiểm lại |
| B | Làm mượt bước nhảy ải 120 → 140: chia +61% thành hai nấc (130, 140) | Bớt cảm giác "tường" đột ngột |
| C | Đo nguồn mảnh chiến cơ cho người không nạp (mục 3) trước khi chỉnh A/B | Không đổi gì, chỉ đo |
