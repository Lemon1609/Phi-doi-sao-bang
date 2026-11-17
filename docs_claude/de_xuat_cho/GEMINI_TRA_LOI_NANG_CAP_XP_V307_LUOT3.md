## PHẦN 1 · CẬP NHẬT SỐ LIỆU TRANG BỊ & CHIẾN CƠ (V307 · LƯỢT 3)

### 1. Bảng rơi Đá XP bám theo thu nhập thực tế đo trong game

* **Tỉ lệ quy đổi mục tiêu:** Trước đây, lượng đá rơi từ ải phải nuôi cả **Trang bị + Chiến cơ + Phi công** (riêng 1 phi công tốn $2.142\text{ đá}$). Sau khi tách Phi công sang dùng thuần `◈`, bảng rơi Đá XP mới được thiết kế đạt **~75% – 82% tổng giá trị quy đổi `(15·đá + ◈)**` của hệ cũ (tương đương **~100% – 110% lượng đá cũ**, phần ~20% còn lại được bù bằng cơ chế dùng phôi Lục/Lam làm vật liệu XP).


* **3 cỡ Đá XP giữ nguyên:** Nhỏ = `15 XP`, Vừa = `60 XP`, Lớn = `150 XP`.

| Dải ải / Nguồn | Quy XP cũ đo được | Đá XP Nhỏ (`15`) | Đá XP Vừa (`60`) | Đá XP Lớn (`150`) | **Kỳ vọng XP / lượt** | Tỉ lệ so với quy XP cũ |
| --- | --- | --- | --- | --- | --- | --- |
| **Ải 1 – 10** (ải thường) | ~390 XP | 4–6 viên (100%) | 2–3 viên (90%) | 1 viên (60%) | **~300 XP** | 76,9% |
| **Ải 5** (Mini-boss) | ~230 XP | 2–4 viên (100%) | 2 viên (100%) | 0–1 viên (20%) | **~195 XP** | 84,8% |
| **Ải 10** (Boss) | ~250 XP | 3–5 viên (100%) | 1–2 viên (100%) | 0–1 viên (40%) | **~210 XP** | 84,0% |
| **Ải 11 – 30** (mốc 25) | ~640 XP | 4–6 viên (100%) | 3–4 viên (100%) | 1–2 viên (90%) | **~488 XP** | 76,2% |
| **Ải 31 – 50** (mốc 45) | ~740 XP | 5–7 viên (100%) | 3–5 viên (100%) | 2 viên (100%) | **~630 XP** | 85,1% |
| **Ải 51 – 70** (mốc 65) | ~980 XP | 6–8 viên (100%) | 4–6 viên (100%) | 2–3 viên (100%) | **~780 XP** | 79,6% |
| **Ải 71 – 90** (mốc 85) | ~1.080 XP | 6–10 viên (100%) | 5–6 viên (100%) | 3 viên (100%) | **~900 XP** | 83,3% |
| **Ải 91 – 115** (mốc 105) | ~1.330 XP | 8–10 viên (100%) | 5–7 viên (100%) | 3–4 viên (100%) | **~1.020 XP** | 76,7% |
| **Ải 116 – 140** (mốc 125–135) | ~1.900 XP | 10–14 viên (100%) | 7–9 viên (100%) | 5–6 viên (100%) | **~1.485 XP** | 78,2% |
| **Ải 140+ / Boss cuối** | ~1.950+ XP | 12–16 viên (100%) | 8–10 viên (100%) | 5–7 viên (100%) | **~1.650 XP** | 84,6% |
| **Hầm ngục Tài nguyên** | *(Chưa đo)* | 12–16 viên (100%) | 8–10 viên (100%) | 6–8 viên (100%) | **~1.800 XP** | Đề xuất chuẩn |
| **Quét ải (Sweep)** | Bằng ải gốc | Nhận 100% kỳ vọng rơi trung bình của ải | Nhận 100% kỳ vọng | Nhận 100% kỳ vọng | **Bằng đánh tay** | 100% |

---

### 2. Quy tắc bản sao dư Chiến cơ (khi đã đạt Tím+5)

* **Khi Chiến cơ chưa đạt Tím+5:** Bản sao chiến cơ **khóa cứng** dành cho tiến bậc, không hiển thị trong danh sách vật liệu XP để tránh người chơi hiến tế nhầm làm kẹt tiến độ.
* **Khi Chiến cơ đã đạt bậc tối đa (`Tím+5`):** Mở khóa nút **"Chuyển hóa bản sao dư"** thành Đá XP tương ứng theo phẩm chất gốc của bản sao chiến cơ đó:


* Bản sao dư phẩm chất **Trắng**: **`60 XP`** (quy đổi ra `1 Đá XP Vừa`).
* Bản sao dư phẩm chất **Lục**: **`150 XP`** (quy đổi ra `1 Đá XP Lớn`).
* Bản sao dư phẩm chất **Lam**: **`300 XP`** (quy đổi ra `2 Đá XP Lớn`).
* Bản sao dư phẩm chất **Tím**: **`750 XP`** (quy đổi ra `5 Đá XP Lớn`).



---

### 3. JSON Phần 1 (Trang bị & Chiến cơ)

```json
{
  "version": "V307_UPGRADE_XP",
  "conversion": {
    "old_stone_to_xp": 15,
    "old_alloy_to_xp": 1,
    "invested_xp_refund_rate": 0.85,
    "max_material_slots": 5
  },
  "xp_stones": [
    { "id": "xp_stone_s", "name": "Đá XP Nhỏ", "xp": 15 },
    { "id": "xp_stone_m", "name": "Đá XP Vừa", "xp": 60 },
    { "id": "xp_stone_l", "name": "Đá XP Lớn", "xp": 150 }
  ],
  "level_xp_formula": {
    "min_level": 1,
    "max_level": 100,
    "base": 50,
    "per_level": 6,
    "total_xp_1_to_100": 34650
  },
  "rarity_base_feed_xp": {
    "white": 15,
    "green": 40,
    "blue": 100,
    "blue_1": 180,
    "blue_2": 280,
    "blue_3": 400,
    "purple": 750,
    "purple_1": 1200,
    "purple_2": 1800,
    "purple_3": 2500,
    "purple_4": 3400,
    "purple_5": 4500
  },
  "drop_rules": {
    "white_blank_auto_salvage": true,
    "green_plus_blank_keep_as_item": true,
    "max_tier_fighter_excess_dupe_xp": {
      "white": 60,
      "green": 150,
      "blue": 300,
      "purple": 750
    },
    "stages": [
      { "stage_range": [1, 10], "s": [4, 6, 1.0], "m": [2, 3, 0.9], "l": [1, 1, 0.6] },
      { "stage_range": [11, 30], "s": [4, 6, 1.0], "m": [3, 4, 1.0], "l": [1, 2, 0.9] },
      { "stage_range": [31, 50], "s": [5, 7, 1.0], "m": [3, 5, 1.0], "l": [2, 2, 1.0] },
      { "stage_range": [51, 70], "s": [6, 8, 1.0], "m": [4, 6, 1.0], "l": [2, 3, 1.0] },
      { "stage_range": [71, 90], "s": [6, 10, 1.0], "m": [5, 6, 1.0], "l": [3, 3, 1.0] },
      { "stage_range": [91, 115], "s": [8, 10, 1.0], "m": [5, 7, 1.0], "l": [3, 4, 1.0] },
      { "stage_range": [116, 140], "s": [10, 14, 1.0], "m": [7, 9, 1.0], "l": [5, 6, 1.0] },
      { "stage_range": [141, 999], "s": [12, 16, 1.0], "m": [8, 10, 1.0], "l": [5, 7, 1.0] }
    ],
    "mini_boss": { "s": [2, 4, 1.0], "m": [2, 2, 1.0], "l": [0, 1, 0.2] },
    "stage_boss": { "s": [3, 5, 1.0], "m": [1, 2, 1.0], "l": [0, 1, 0.4] },
    "dungeon_resource": { "s": [12, 16, 1.0], "m": [8, 10, 1.0], "l": [6, 8, 1.0] }
  },
  "warnings": {
    "xp_overflow_threshold": 30,
    "confirm_rarities": ["purple", "purple_1", "purple_2", "purple_3", "purple_4", "purple_5"],
    "confirm_min_invested_level": 15
  }
}

```

---

## PHẦN 2 · CẬP NHẬT SỐ LIỆU & KỸ NĂNG PHI CÔNG (`src/pilot67.js`)

### 1. Bảng giá ◈ 3 dải cấp mới (khớp tổng cũ `131.380 ◈`)

* **Chi phí hệ cũ quy đổi:** $88.750\text{ ◈} + (2.142\text{ đá} \times 15) + (7\text{ lõi} \times 1.500) = \mathbf{131.380\text{ ◈}}$.


* **Công thức 3 dải cấp mới ($L \to L+1$, với $L \in [1, 59]$):**
* **Dải 1 ($L = 1 \dots 19$):** $\text{Cost}(L) = 250 + 35 \cdot L$ $\implies$ Tổng = **$11.400\text{ ◈}$**
* **Dải 2 ($L = 20 \dots 39$):** $\text{Cost}(L) = 1.100 + 55 \cdot (L - 19)$ $\implies$ Tổng = **$33.550\text{ ◈}$**
* **Dải 3 ($L = 40 \dots 59$):** $\text{Cost}(L) = 2.400 + 180 \cdot (L - 39)$ $\implies$ Tổng = **$85.800\text{ ◈}$**


* **Tổng cộng Lv 1 → 60:** **$130.750\text{ ◈}$** (chênh **$-0,48\%$** so với tổng cũ $131.380\text{ ◈}$, đạt chuẩn $\pm 5\%$).



| Cấp ($L \to L+1$) | 1 → 2 | 10 → 11 | 19 → 20 | 20 → 21 | 39 → 40 | 40 → 41 | 50 → 51 | 59 → 60 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **◈ mới cần** | **285** | **600** | **915** | **1.155** | **2.200** | **2.580** | **4.380** | **6.000** |
| **◈ cộng dồn** | **285** | **4.425** | **11.400** | **12.555** | **44.950** | **47.530** | **82.330** | **130.750** |

---

### 2. Chỉnh sửa Hạng & Mốc kỹ năng dùng 100% cơ chế có sẵn

* **Hạng chuẩn theo mã:** Lâm Phương (`A`/Trắng), Hạ Vy (`A`/Trắng), Kiều An (`A`/Trắng), Bảo Ngọc (`A`/Trắng), Thiên Lam (`S`/Lam), Mộc Miên (`S`/Lam), Hàn Sương (`S`/Lam), Tử Dạ (`SS`/Tím).


* Chi tiết các mốc kỹ năng đã thay thế sang cơ chế sẵn có (Graze, Bạo Tẩu, Bom, Khiên chắn đạn, Giáp/máu, Tên lửa, Tàu con/drone, Nhặt buff/hút vật phẩm, Chí mạng, Sát thương boss, Món SSS):


* **Lâm Phương (`A`):**
* **Lam:** *Dẫn Điện Graze* — Mỗi lần Graze nhận thêm **+10% điểm nạp thanh Bạo Tẩu**.
* **Tím:** *Bùng Nổ Bạo Tẩu* — Khi kích hoạt Bạo Tẩu, nhận ngay **1 lớp Khiên Chắn Đạn** (hồi chiêu `20s`).
* **Tím+5:** *Bậc Thầy Né Đạn* — Graze liên tiếp `3` lần trong `4,0s` tạo ngay **1 lớp Khiên Chắn Đạn** (hồi chiêu `15s`).


* **Hạ Vy (`A`):**
* **Lam:** *Xung Kích Nhiệt* — Khi vào trạng thái Bạo Tẩu, kích hoạt **1 sóng xung kích dạng Bom mini** xóa đạn địch trong bán kính `180px`.
* **Tím:** *Duy Trì Hưng Phấn* — Tiêu diệt địch tinh anh/boss khi đang Bạo Tẩu kéo dài thêm **`+0,8s` thời gian Bạo Tẩu** (tối đa 1 lần/đợt).
* **Tím+5:** *Quá Tải Bạo Tẩu* — Trong trạng thái Bạo Tẩu, sát thương Bạo Tẩu tăng thêm **+12%**.


* **Kiều An (`A`):**
* **Lam:** *Vỏ Bọc Phản Xạ* — Khi hồi giáp thành công, đẩy lùi và xóa đạn thường trong phạm vi `150px` quanh chiến cơ.
* **Tím:** *Tái Tạo Khẩn Cấp* — Khi mất giáp, rút ngắn ngay **`3,0s`** chu kỳ hồi giáp tiếp theo (hồi chiêu `25s`).
* **Tím+5:** *Pháo Đài Tàu Con* — Khi đang có giáp, **Tàu con (drone)** tăng **+15% tốc độ bắn**.


* **Bảo Ngọc (`A` · Khởi điểm Trắng):**
* **Lam:** *Báo Động Sinh Tồn* — Khi máu giảm xuống $\le 2$, tự động kích hoạt **1 lớp Khiên Chắn Đạn** (hồi chiêu `30s`).
* **Tím:** *Ý Chí Thép* — Khi máu $\le 2$, tăng **+25% phạm vi hút vật phẩm/buff**.
* **Tím+5:** *Bất Khuất* — Miễn nhiễm **1 lần sát thương chí tử** mỗi trận, giữ lại `1 HP` và bất tử trong `1,5s`.


* **Thiên Lam (`S` · Khởi điểm Lam):**
* **Lam:** *Ngắm Bắn Trọng Yếu* — Đòn đánh lên Boss tăng **+8% tỉ lệ chí mạng**.
* **Tím:** *Phá Giáp Trọng Điểm* — Mỗi `8,0s` bắn 1 phát đạn xuyên phá gây sát thương chuẩn bằng **`1,2%` máu hiện tại của Boss** (giới hạn tối đa `200%` công cơ bản).
* **Tím+5:** *Kết Liễu Bá Chủ* — Khi máu Boss dưới **`25%`**, sát thương lên Boss của Tên lửa và Tàu con tăng thêm **+12%**.


* **Mộc Miên (`S` · Khởi điểm Lam):**
* **Lam:** *Từ Trường Sinh Học* — Tăng phạm vi **hút vật phẩm/buff** thêm **`+220px`**.
* **Tím:** *Cộng Hưởng Buff* — Khi nhặt buff bất kỳ, tăng **+10% sát thương chí mạng** trong `5,0s`.
* **Tím+5:** *Dưỡng Chất Bảo Hộ* — Khi đầy máu mà nhặt vật phẩm hồi phục, lượng hồi dư chuyển hóa thành **Giáp Tạm Thời** (tối đa `15%` máu tối đa, tồn tại `8,0s`).


* **Hàn Sương (`S` · Khởi điểm Lam):**
* **Lam:** *Đầu Đạn Xuyên Phá* — Tên lửa tăng **+10% tỉ lệ chí mạng**.
* **Tím:** *Mưa Tên Lửa* — Cứ mỗi `4` loạt tên lửa bắn ra, loạt thứ `5` bắn thêm **`+2` quả tên lửa phụ** (gây `50%` sát thương tên lửa gốc).
* **Tím+5:** *Hỏa Lực Bão Táp* — Khi đang trong trạng thái **Bạo Tẩu**, tốc độ bắn tên lửa tăng thêm **+20%**.


* **Tử Dạ (`SS` · Khởi điểm Tím):**
* **Lam (Mở sẵn):** *Hấp Thụ Hư Không* — Tiêu diệt địch bằng **Bom** hoặc trong trạng thái **Bạo Tẩu** tăng thêm **+15% điểm nạp thanh Bạo Tẩu**.
* **Tím (Mở sẵn):** *Cộng Hưởng Hắc Ám* — Khi trang bị từ **3 món SSS trở lên**, sát thương **Tàu con (drone)** và **Tên lửa** tăng thêm **+12%**.
* **Tím+5:** *Chúa Tể Hư Không* — Khi kích hoạt **Bạo Tẩu**, triệu hồi thêm **1 Tàu con (drone) bóng tối** hỗ trợ bắn trong `4,0s` (gây `40%` sát thương đạn chính, không vượt trần 15% lực chiến).





---

### 3. JSON Phần 2 (`pilot67`)

```json
{
  "version": "V307_PILOT_REWORK",
  "level_alloy_cost": {
    "min_level": 1,
    "max_level": 60,
    "brackets": [
      { "from": 1, "to": 19, "base": 250, "step": 35 },
      { "from": 20, "to": 39, "base": 1100, "step": 55 },
      { "from": 40, "to": 59, "base": 2400, "step": 180 }
    ],
    "total_alloy_1_to_60": 130750
  },
  "tiers": [
    { "id": "white", "max_lv": 10, "alloy": 0, "shards": 0, "cores": 0, "stat_mult": 1.00 },
    { "id": "green", "max_lv": 15, "alloy": 2000, "shards": 15, "cores": 0, "stat_mult": 1.20 },
    { "id": "blue", "max_lv": 20, "alloy": 5000, "shards": 25, "cores": 0, "stat_mult": 1.45, "milestone": 1 },
    { "id": "blue_1", "max_lv": 25, "alloy": 7000, "shards": 20, "cores": 0, "stat_mult": 1.60 },
    { "id": "blue_2", "max_lv": 30, "alloy": 9500, "shards": 25, "cores": 0, "stat_mult": 1.75 },
    { "id": "blue_3", "max_lv": 35, "alloy": 12000, "shards": 30, "cores": 0, "stat_mult": 1.95 },
    { "id": "purple", "max_lv": 40, "alloy": 18000, "shards": 50, "cores": 2, "stat_mult": 2.30, "milestone": 2 },
    { "id": "purple_1", "max_lv": 45, "alloy": 22000, "shards": 35, "cores": 0, "stat_mult": 2.55 },
    { "id": "purple_2", "max_lv": 50, "alloy": 27000, "shards": 45, "cores": 0, "stat_mult": 2.85 },
    { "id": "purple_3", "max_lv": 55, "alloy": 33000, "shards": 55, "cores": 0, "stat_mult": 3.20 },
    { "id": "purple_4", "max_lv": 58, "alloy": 40000, "shards": 70, "cores": 0, "stat_mult": 3.60 },
    { "id": "purple_5", "max_lv": 60, "alloy": 55000, "shards": 100, "cores": 5, "stat_mult": 4.10, "milestone": 3 }
  ],
  "pilots": {
    "lam_phuong": {
      "rank": "A",
      "start_tier": "white",
      "passive_values": [15, 18, 20, 23, 25, 28, 31, 34, 36, 39, 42, 45],
      "milestones": {
        "blue": { "id": "graze_overcharge", "bonus_graze_gauge_pct": 10 },
        "purple": { "id": "berserk_shield", "shield_layers": 1, "cd": 20.0 },
        "purple_5": { "id": "graze_master", "graze_count": 3, "window": 4.0, "shield_layers": 1, "cd": 15.0 }
      }
    },
    "ha_vy": {
      "rank": "A",
      "start_tier": "white",
      "passive_values": [1.0, 1.1, 1.3, 1.4, 1.5, 1.7, 1.8, 2.0, 2.1, 2.2, 2.4, 2.5],
      "milestones": {
        "blue": { "id": "heat_pulse", "mini_bomb_clear_radius": 180 },
        "purple": { "id": "thrill_extend", "kill_elite_extend_sec": 0.8, "max_per_wave": 1 },
        "purple_5": { "id": "berserk_overdrive", "berserk_dmg_pct": 12 }
      }
    },
    "kieu_an": {
      "rank": "A",
      "start_tier": "white",
      "passive_values": [18.0, 17.2, 16.5, 15.8, 15.0, 14.2, 13.5, 12.8, 12.2, 11.6, 11.0, 10.5],
      "milestones": {
        "blue": { "id": "repulse_shell", "clear_bullet_radius": 150 },
        "purple": { "id": "emergency_regen", "on_break_cd_reduce": 3.0, "internal_cd": 25.0 },
        "purple_5": { "id": "drone_fortress", "drone_fire_rate_with_armor_pct": 15 }
      }
    },
    "bao_ngoc": {
      "rank": "A",
      "start_tier": "white",
      "passive_values": [15, 16, 18, 19, 20, 22, 23, 25, 26, 27, 29, 30],
      "milestones": {
        "blue": { "id": "survival_shield", "hp_threshold": 2, "shield_layers": 1, "cd": 30.0 },
        "purple": { "id": "iron_will", "low_hp_magnet_pct": 25 },
        "purple_5": { "id": "unyielding", "cheat_death_charges": 1, "invuln_sec": 1.5 }
      }
    },
    "thien_lam": {
      "rank": "S",
      "start_tier": "blue",
      "passive_values": [10, 11, 13, 14, 15, 17, 18, 20, 21, 22, 24, 25],
      "milestones": {
        "blue": { "id": "boss_crit_focus", "boss_crit_rate_pct": 8 },
        "purple": { "id": "weakpoint_pierce", "interval": 8.0, "boss_cur_hp_pct": 1.2, "atk_cap_pct": 200 },
        "purple_5": { "id": "boss_executioner", "boss_hp_below_pct": 25, "missile_drone_boss_dmg_pct": 12 }
      }
    },
    "moc_mien": {
      "rank": "S",
      "start_tier": "blue",
      "passive_values": [20, 22, 25, 27, 29, 31, 34, 36, 38, 40, 42, 45],
      "milestones": {
        "blue": { "id": "bio_magnet", "pickup_radius_bonus": 220 },
        "purple": { "id": "buff_resonance", "crit_dmg_on_buff_pct": 10, "duration": 5.0 },
        "purple_5": { "id": "overheal_armor", "max_temp_armor_hp_pct": 15, "duration": 8.0 }
      }
    },
    "han_suong": {
      "rank": "S",
      "start_tier": "blue",
      "passive_values": [12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 26, 27],
      "milestones": {
        "blue": { "id": "piercing_warhead", "missile_crit_rate_pct": 10 },
        "purple": { "id": "missile_barrage", "every_n_salvos": 5, "extra_missiles": 2, "dmg_ratio": 0.5 },
        "purple_5": { "id": "berserk_barrage", "berserk_missile_fire_rate_pct": 20 }
      }
    },
    "tu_da": {
      "rank": "SS",
      "start_tier": "purple",
      "passive_values": [3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.5, 5.8, 6.1, 6.5],
      "milestones": {
        "blue": { "id": "void_siphon", "bomb_or_berserk_kill_gauge_pct": 15 },
        "purple": { "id": "dark_resonance", "req_sss_count": 3, "drone_missile_dmg_pct": 12 },
        "purple_5": { "id": "shadow_drone", "extra_drones_in_berserk": 1, "duration": 4.0, "drone_dmg_ratio": 0.4 }
      }
    }
  }
}

```