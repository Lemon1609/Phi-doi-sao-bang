Đã nhận được 2 tệp yêu cầu. Dưới đây là phần rà soát và cân đối chi tiết cho **Tệp 1 (`GEMINI_1_RA_SOAT_MUA_GIAI_VA_NHIEM_VU.txt`)**.

*(Lưu ý về **Tệp 2 `GEMINI_3_GOP_Y_PROMPT_GPT.txt**`: Trong yêu cầu có nhắc tới tệp đính kèm `GUI_GPT_V307_PROMPT_VE_NEN.txt` chứa 5 khối prompt và bảng màu 10 chương nhưng tệp này chưa có trong tin nhắn. Bạn hãy dán nội dung tệp đó ở lượt tiếp theo để mình sửa chuẩn từng khối và rà từng mã màu nhé).*

---

# PHẦN RÀ SOÁT MÙA GIẢI & NHIỆM VỤ (V307)

## Giả định tính toán (Baseline)

* **Thể lực (`🔋`):** Hồi tự nhiên `288 🔋/ngày` + thưởng mốc 20 điểm ngày (`20 🔋`) + nhiệm vụ tiêu 50🔋 (`20 🔋`) = tối đa **`328 🔋/ngày`** (nếu không tràn trần 120).
* **3 nhóm người chơi giả định:**
* **Chơi ít (~15 phút/ngày):** Đăng nhập, càn quét ~12 lần + đánh 1–2 ải (`~90 🔋/ngày`), đạt mốc **60 điểm** nhiệm vụ ngày, đánh 1 lượt Thử thách ngày, không đánh Vô tận/Tháp Boss.
* **Chơi vừa (~45 phút/ngày):** Tiêu gần hết thể lực tự nhiên (`~230 🔋/ngày`), đạt mốc **100 điểm** nhiệm vụ ngày, xong Thử thách ngày, đánh 2 trận Vô tận >90s, leo trung bình 0,5 tầng Tháp Boss/ngày.
* **Chơi nặng (~2 giờ/ngày):** Tiêu tối ưu thể lực (`≥250 🔋/ngày`), đạt mốc **100 điểm** nhiệm vụ ngày, xong Thử thách ngày, đánh đủ 3 trận Vô tận >90s, leo trung bình 1 tầng Tháp Boss/ngày.



---

## 1. Kiểm cân bằng Mùa giải "Chiến Dịch Sao Băng"

### Tốc độ tích lũy XP hiện tại (500 XP/cấp)

| Nhóm người chơi | XP Thể lực | XP Mốc ngày | XP Thử thách + Vô tận + Tháp | Tổng XP/ngày | Sau 14 ngày (20 cấp = 10.000 XP) | Sau 28 ngày (30 cấp = 15.000 XP) |
| --- | --- | --- | --- | --- | --- | --- |
| **Chơi ít (15p)** | ~90 | +100 (mốc 60) | +80 (Thử thách) | **~270 XP** | **3.780 XP** (Cấp 7/20 — *hụt sâu*) | **7.560 XP** (Cấp 15/30 — *đạt mốc Skin*) |
| **Chơi vừa (45p)** | ~230 | +250 (mốc 100) | +80 + 80 + 15 | **~655 XP** | **9.170 XP** (Cấp 18/20 — *thiếu 2 cấp*) | **18.340 XP** (*Đạt Cấp 30 vào ngày 23*) |
| **Chơi nặng (2h)** | 250 | +250 (mốc 100) | +80 + 120 + 30 | **~730 XP** | **10.220 XP** (*Đạt Cấp 20 đúng ngày 14*) | **20.440 XP** (*Đạt Cấp 30 vào ngày 21*) |

### Quy đổi tổng giá trị thưởng hiện tại (20 cấp) & Đánh giá làn Tinh Anh

* **Làn Miễn phí (20 cấp):** `500 💎` + `50.000 ◈` + `50 🔋` + `50 đá nâng` + `5 vé càn quét` + `1 vé may mắn` + `1 hộp khảm Lv1` + `1 hộp khảm Lv2` + `1 rương phôi Lam` + `10 mảnh phi công chọn` + `1 rương trang bị Tím`.
* **Làn Tinh Anh (giá 1.500 💎, tặng 1.000 XP):** Hoàn lại **`700 💎`** (`100+150+200+250`) → **Chi phí ròng thực tế = `800 💎**`. Đổi lấy: `60.000 ◈` + `50 🔋` + `3 vé càn quét` + `1 rương phôi Lục` + `15 đá tẩy` + `35 mảnh phi công (10 chọn + 25 ngẫu nhiên)` + `3 vé boss tối thượng` + `2 vé may mắn` + `1 hộp khảm Lv2` + `1 rương phôi Lam` + **Skin "Ảo Ảnh Thần Cơ"** + **1 Lõi SSS chọn** + **Danh hiệu Quán quân mùa**.
* **Kết luận:** Làn Tinh Anh **RẤT ĐÁNG GIÁ** (chi phí ròng 800 💎 tương đương ~4 ngày tích lũy nhiệm vụ ngày + tuần để đổi lấy Lõi SSS chọn + Skin độc quyền). **Không nên** tăng lượng 💎 hoàn lại vì game không có nạp tiền—nếu hoàn đủ 1.500 💎 thì Tinh Anh trở thành miễn phí vĩnh viễn, mất ý nghĩa bài toán tích trữ 💎 của người chơi.

### Đề xuất điều chỉnh thông số (Trước → Sau)

1. **Thời lượng mùa:** `14 ngày → 28 ngày` (khớp đúng 4 chu kỳ Nhiệm vụ tuần, giúp người chơi vừa không bị áp lực "cày hụt hơi" ở ngày 13–14).
2. **Số cấp tối đa:** `20 cấp (10.000 XP) → 30 cấp (15.000 XP)` (giữ nguyên `500 XP/cấp`).
3. **Quà kích hoạt Tinh Anh:** Giá giữ nguyên `1.500 💎`; XP tặng kèm tăng `1.000 XP (2 cấp) → 1.500 XP (3 cấp)` để tương xứng độ dài 30 cấp.
4. **Phân bổ lại 💎 trong 30 cấp:** Giữ nguyên tổng `500 💎` (Miễn phí) và `700 💎` (Tinh Anh), chỉ dãn đều các mốc nhận 💎 ra tới cấp 29 để **không tạo thêm bất kỳ nguồn 💎 mới nào**.
5. **Cơ chế XP dư sau cấp 30:** Mỗi `1.000 XP` dư sau cấp 30 nhận `1 Rương Vượt Cấp` (`5.000 ◈ + 5 đá nâng`, tối đa 10 rương/mùa) để nhóm chơi nặng vẫn có động lực làm nhiệm vụ tuần cuối.



---

## 2. Bảng phần thưởng Mùa giải 30 cấp (Giữ nguyên tổng 💎 cũ)

*(Các mốc giữ nguyên hệ vật phẩm hiện có, dãn nhịp 💎 và bổ sung tài nguyên nâng cấp cho cấp 21–30)*

| Cấp | Làn Miễn Phí | Làn Tinh Anh (1.500 💎) | Ghi chú thay đổi |
| --- | --- | --- | --- |
| **1** | 5.000 ◈ | **100 💎** + 10.000 ◈ | Giữ nguyên |
| **2** | Đá nâng ×5 | Vé càn quét ×3 | Giữ nguyên |
| **3** | **50 💎** | Phôi Lục (rương) ×1 | Giữ nguyên |
| **4** | 10.000 ◈ | Đá tẩy ×5 | Giữ nguyên |
| **5** | Vé may mắn ×1 | Mảnh phi công chọn ×10 | Giữ nguyên |
| **6** | 50 🔋 | **150 💎** | Giữ nguyên |
| **7** | Đá nâng ×10 | 20.000 ◈ | Giữ nguyên |
| **8** | Hộp khảm đá cấp 1 ×1 | Vé boss tối thượng ×1 | Giữ nguyên |
| **9** | **100 💎** | Mảnh phi công ngẫu nhiên ×15 | Điều chỉnh từ 25 → 15 (chia 10 sang cấp 23) |
| **10** | Rương phôi Lam ×1 | **Skin "Ảo Ảnh Thần Cơ"** | Giữ mốc Skin ở cấp 10 để kích thích mua Tinh Anh sớm |
| **11** | 15.000 ◈ | 20.000 ◈ | Chuyển 200 💎 sang cấp 17 |
| **12** | Vé càn quét ×5 | Hộp khảm đá cấp 2 ×1 | Giữ nguyên |
| **13** | Đá nâng ×15 | 50 🔋 | Giữ nguyên |
| **14** | 20.000 ◈ | **200 💎** | Dãn nhịp nhận 💎 |
| **15** | Mảnh phi công chọn ×10 | Vé may mắn ×2 | Giữ nguyên |
| **16** | **150 💎** | Đá tẩy ×10 | Dãn từ cấp 14 → 16 |
| **17** | Hộp khảm đá cấp 2 ×1 | 30.000 ◈ | Dãn từ cấp 17 → 24 |
| **18** | Đá nâng ×20 | Rương phôi Lam ×1 | Giữ nguyên |
| **19** | 25.000 ◈ | Vé boss tối thượng ×2 | Dãn 200 💎 sang cấp 25 |
| **20** | Rương trang bị Tím ×1 | Mảnh phi công chọn ×10 | Mốc chốt chặng 2/3 mùa |
| **21** | Đá tẩy ×10 | 35.000 ◈ | *Mốc mới* |
| **22** | Vé càn quét ×5 | Hộp khảm đá cấp 2 ×1 | *Mốc mới* |
| **23** | 50 🔋 | Mảnh phi công ngẫu nhiên ×15 | *Mốc mới* |
| **24** | Đá nâng ×25 | **250 💎** | *Mốc mới (dãn từ cấp 17 cũ)* |
| **25** | **200 💎** | Vé may mắn ×2 | *Mốc mới (dãn từ cấp 19 cũ)* |
| **26** | Rương phôi Lam ×1 | Đá tẩy ×15 | *Mốc mới* |
| **27** | 30.000 ◈ | Vé boss tối thượng ×2 | *Mốc mới* |
| **28** | Hộp khảm đá cấp 2 ×1 | Rương trang bị Tím ×1 | *Mốc mới* |
| **29** | Mảnh phi công chọn ×10 | 40.000 ◈ | *Mốc mới* |
| **30** | **Rương trang bị Tím ×1** | **Lõi SSS chọn ×1 + Danh hiệu Quán quân mùa** | Mốc đỉnh mùa (30 cấp) |

* **Tổng kiểm đối soát 💎:** Miễn phí = `50 + 100 + 150 + 200 = 500 💎` (Không đổi) · Tinh Anh = `100 + 150 + 200 + 250 = 700 💎` (Không đổi).

---

## 3. Bổ sung Nhiệm vụ Ngày & Tuần mới

*(Không thay đổi các mốc rương 20/40/60/80/100 ngày và 100/200/300/400/500 tuần nên **không phát sinh nguồn 💎 mới**. Các nhiệm vụ mới giúp người chơi có thêm lộ trình đạt mốc 100 điểm/ngày và 500 điểm/tuần mà không bị ép buộc 1 lối chơi duy nhất).*

### Bổ sung 3 Nhiệm vụ Ngày (Mỗi việc +15 điểm → Tổng trần điểm ngày tăng từ 140 → 185 điểm)

| ID | Tên nhiệm vụ | Điều kiện (Event) | Điểm | Thưởng trực tiếp | Chi tiết xác suất (nếu ngẫu nhiên) |
| --- | --- | --- | --- | --- | --- |
| `daily_endless_run` | Thử Lửa Vô Tận | Tham gia Vô tận 1 lần (sống ≥ 60s) | **15** | `1.500 ◈` + `1 Mảnh phi công ngẫu nhiên` | **70%** phi công thường · **25%** phi công hiếm · **5%** phi công chủ lực |
| `daily_boss_fight` | Săn Lùng Thủ Lĩnh | Thắng 1 ải Boss bất kỳ hoặc 1 tầng Tháp Boss | **15** | `2 Đá nâng` + `1 Hộp khảm đá cấp 1` | Cố định (ngẫu nhiên loại đá khảm Lv1 theo bảng chuẩn) |
| `daily_challenge_clear` | Chinh Phục Luật Lệ | Hoàn thành 1 lượt Thử thách ngày | **15** | `2.000 ◈` + `1 Phôi Lục ngẫu nhiên` | Ngẫu nhiên 1 trong các loại Phôi Lục hiện có (tỷ lệ đều nhau) |

### Bổ sung 2 Nhiệm vụ Tuần (Tổng +150 điểm tuần)

| ID | Tên nhiệm vụ | Điều kiện (Event) | Điểm | Thưởng trực tiếp | Chi tiết xác suất (nếu ngẫu nhiên) |
| --- | --- | --- | --- | --- | --- |
| `weekly_boss_slayer` | Diệt Trừ Hiểm Họa | Hạ gục 12 Boss (tính cả Chiến dịch, Tháp Boss, Boss Tối Thượng) | **80** | `10.000 ◈` + `3 Mảnh phi công ngẫu nhiên` | **65%** phi công thường · **28%** phi công hiếm · **7%** phi công chủ lực |
| `weekly_gear_forge` | Cường Hóa Vũ Trang | Nâng cấp trang bị, đột phá hoặc khảm đá 10 lần | **70** | `10 Đá nâng` + `1 Rương trang bị Tím (mảnh)` *(hoặc 1 Phôi Lam)* | **85%** nhận `1 Phôi Lam` · **15%** nhận `1 Rương trang bị Tím` |

---

## 4. Kiểm lạm phát: Thu nhập trung bình mỗi ngày (Trước → Sau)

*(Quy đổi tổng thu từ: Nhiệm vụ ngày + Nhiệm vụ tuần ÷ 7 + Mùa giải làn Miễn phí ÷ số ngày mùa. Không tính rớt trực tiếp khi đi ải).*

| Nhóm người chơi | Tài nguyên | Trước (Mùa 14 ngày) | Sau (Mùa 28 ngày + NV mới) | Đánh giá tác động |
| --- | --- | --- | --- | --- |
| **Chơi ít (15p)** *(Mốc 60 ngày, 200 tuần)* | 💎 Kim cương |  |  |  |



◈ Hợp kim



🔋 Thể lực | ~34,3 💎/ngày



~15.200 ◈/ngày



~41,4 🔋/ngày | **~33,2 💎/ngày** *(giảm nhẹ 1,1)*



**~17.100 ◈/ngày** *(+12,5%)*



**~41,8 🔋/ngày** *(~0%)* | **An toàn.** Giảm áp lực cày mùa nhưng tăng nhẹ ◈ giúp nâng cấp đều tay. |
| **Chơi vừa (45p)** *(Mốc 100 ngày, 500 tuần)* | 💎 Kim cương



◈ Hợp kim



🔋 Thể lực | ~107,1 💎/ngày



~22.000 ◈/ngày



~43,6 🔋/ngày | **~89,3 💎/ngày** *(giảm 16,6%)*



**~25.200 ◈/ngày** *(+14,5%)*



**~43,6 🔋/ngày** *(0%)* | **Chống lạm phát 💎 tốt.** Dãn mùa từ 14→28 ngày tự động giảm tốc độ bơm 500 💎 mùa đi một nửa. |
| **Chơi nặng (2h)** *(Mốc 100 ngày, 500 tuần)* | 💎 Kim cương



◈ Hợp kim



🔋 Thể lực | ~107,1 💎/ngày



~22.000 ◈/ngày



~43,6 🔋/ngày | **~89,3 💎/ngày** *(giảm 16,6%)*



**~27.700 ◈/ngày** *(+25,9%)*



**~43,6 🔋/ngày** *(0%)* | **Cân bằng.** Thêm ~5.700 ◈/ngày + đá nâng giúp người cày nặng nuôi thêm nhiều chiến cơ/trang bị. |

---

## 5. Khối dữ liệu JSON cho Claude tích hợp vào mã

```json
{
  "version": "V307_season_quest_balance",
  "season_pass": {
    "id": "chien_dich_sao_bang",
    "name": "Chiến Dịch Sao Băng",
    "duration_days": 28,
    "max_level": 30,
    "xp_per_level": 500,
    "overflow_xp_step": 1000,
    "overflow_max_claims": 10,
    "overflow_reward": { "alloy": 5000, "upgrade_stone": 5 },
    "elite_pass": {
      "cost_diamond": 1500,
      "instant_xp": 1500
    },
    "levels": [
      { "lv": 1, "free": { "alloy": 5000 }, "elite": { "diamond": 100, "alloy": 10000 } },
      { "lv": 2, "free": { "upgrade_stone": 5 }, "elite": { "sweep_ticket": 3 } },
      { "lv": 3, "free": { "diamond": 50 }, "elite": { "green_material_chest": 1 } },
      { "lv": 4, "free": { "alloy": 10000 }, "elite": { "refine_stone": 5 } },
      { "lv": 5, "free": { "lucky_ticket": 1 }, "elite": { "pilot_shard_select": 10 } },
      { "lv": 6, "free": { "energy": 50 }, "elite": { "diamond": 150 } },
      { "lv": 7, "free": { "upgrade_stone": 10 }, "elite": { "alloy": 20000 } },
      { "lv": 8, "free": { "gem_box_lv1": 1 }, "elite": { "supreme_boss_ticket": 1 } },
      { "lv": 9, "free": { "diamond": 100 }, "elite": { "pilot_shard_random": 15 } },
      { "lv": 10, "free": { "blue_material_chest": 1 }, "elite": { "skin_id": "ao_anh_than_co" } },
      { "lv": 11, "free": { "alloy": 15000 }, "elite": { "alloy": 20000 } },
      { "lv": 12, "free": { "sweep_ticket": 5 }, "elite": { "gem_box_lv2": 1 } },
      { "lv": 13, "free": { "upgrade_stone": 15 }, "elite": { "energy": 50 } },
      { "lv": 14, "free": { "alloy": 20000 }, "elite": { "diamond": 200 } },
      { "lv": 15, "free": { "pilot_shard_select": 10 }, "elite": { "lucky_ticket": 2 } },
      { "lv": 16, "free": { "diamond": 150 }, "elite": { "refine_stone": 10 } },
      { "lv": 17, "free": { "gem_box_lv2": 1 }, "elite": { "alloy": 30000 } },
      { "lv": 18, "free": { "upgrade_stone": 20 }, "elite": { "blue_material_chest": 1 } },
      { "lv": 19, "free": { "alloy": 25000 }, "elite": { "supreme_boss_ticket": 2 } },
      { "lv": 20, "free": { "purple_equip_chest": 1 }, "elite": { "pilot_shard_select": 10 } },
      { "lv": 21, "free": { "refine_stone": 10 }, "elite": { "alloy": 35000 } },
      { "lv": 22, "free": { "sweep_ticket": 5 }, "elite": { "gem_box_lv2": 1 } },
      { "lv": 23, "free": { "energy": 50 }, "elite": { "pilot_shard_random": 15 } },
      { "lv": 24, "free": { "upgrade_stone": 25 }, "elite": { "diamond": 250 } },
      { "lv": 25, "free": { "diamond": 200 }, "elite": { "lucky_ticket": 2 } },
      { "lv": 26, "free": { "blue_material_chest": 1 }, "elite": { "refine_stone": 15 } },
      { "lv": 27, "free": { "alloy": 30000 }, "elite": { "supreme_boss_ticket": 2 } },
      { "lv": 28, "free": { "gem_box_lv2": 1 }, "elite": { "purple_equip_chest": 1 } },
      { "lv": 29, "free": { "pilot_shard_select": 10 }, "elite": { "alloy": 40000 } },
      { "lv": 30, "free": { "purple_equip_chest": 1 }, "elite": { "sss_core_select": 1, "title_id": "quan_quan_mua" } }
    ]
  },
  "new_daily_quests": [
    {
      "id": "daily_endless_run",
      "name": "Thử Lửa Vô Tận",
      "event": "endless_survive_60s",
      "target": 1,
      "activity_points": 15,
      "reward": {
        "alloy": 1500,
        "pilot_shard_random": 1
      },
      "drop_rates": { "common": 0.70, "rare": 0.25, "epic": 0.05 }
    },
    {
      "id": "daily_boss_fight",
      "name": "Săn Lùng Thủ Lĩnh",
      "event": "boss_or_tower_clear",
      "target": 1,
      "activity_points": 15,
      "reward": {
        "upgrade_stone": 2,
        "gem_box_lv1": 1
      }
    },
    {
      "id": "daily_challenge_clear",
      "name": "Chinh Phục Luật Lệ",
      "event": "daily_challenge_clear",
      "target": 1,
      "activity_points": 15,
      "reward": {
        "alloy": 2000,
        "green_material_random": 1
      }
    }
  ],
  "new_weekly_quests": [
    {
      "id": "weekly_boss_slayer",
      "name": "Diệt Trừ Hiểm Họa",
      "event": "boss_kill_total",
      "target": 12,
      "activity_points": 80,
      "reward": {
        "alloy": 10000,
        "pilot_shard_random": 3
      },
      "drop_rates": { "common": 0.65, "rare": 0.28, "epic": 0.07 }
    },
    {
      "id": "weekly_gear_forge",
      "name": "Cường Hóa Vũ Trang",
      "event": "upgrade_or_socket_action",
      "target": 10,
      "activity_points": 70,
      "reward": {
        "upgrade_stone": 10,
        "bonus_box": {
          "blue_material": { "qty": 1, "rate": 0.85 },
          "purple_equip_chest": { "qty": 1, "rate": 0.15 }
        }
      }
    }
  ]
}

```

---

Bạn gửi tiếp nội dung tệp **`GUI_GPT_V307_PROMPT_VE_NEN.txt`** để mình rà 5 khối prompt và bảng màu 10 chương nhé!