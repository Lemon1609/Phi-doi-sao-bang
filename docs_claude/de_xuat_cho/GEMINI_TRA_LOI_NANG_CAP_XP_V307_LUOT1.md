Dưới đây là bộ thông số cân bằng hoàn chỉnh cho hệ thống nâng cấp trang bị bằng **XP (V307)**, được thiết kế khớp với tổng chi phí tài nguyên của hệ cũ (sai số nhịp cày ải $< 2\%$, nằm gọn trong ngưỡng $\pm 15\%$) và kèm khối **JSON chuẩn hóa** để Claude đọc trực tiếp vào mã nguồn.

---

### 1. Quy đổi tỉ lệ & Công thức XP mỗi cấp ($1 \to 100$)

#### Tỉ lệ quy đổi giá trị từ hệ cũ

Để giữ nguyên độ dài vòng đời nâng cấp mà loại bỏ hoàn toàn ◈ khỏi trang bị:

* **1 Đá nâng cấp cũ = 100 XP** (tương đương **1 Đá XP Nhỏ**).
* **1 ◈ (Vàng/Bụi nâng cấp) = 5 XP** (phản ánh đúng độ khan hiếm tương đối: $1\text{ Đá cũ} \approx 20\text{ ◈}$).
* *Ưu đãi hạng Vô Tận $\ge 2$:* Thay vì giảm 8% giá ◈ như cũ, chuyển thành **+5% XP nhận được** khi ghép nguyên liệu (giữ nguyên mốc XP yêu cầu của bảng cấp độ).

#### Công thức XP cần cho cấp $L \to L+1$ ($L \in [1, 99]$)

Từ công thức hệ cũ ($\text{◈} = 20 + 3L$, $\text{Đá} = 2 + \lfloor L/5 \rfloor + \text{mốc}$), quy đổi sang XP và làm tròn bội số của **5** để số liệu đẹp trên UI:

$$\text{XP}_{\text{cần}}(L \to L+1) = 300 + 15L + 100 \cdot \left\lfloor \frac{L}{5} \right\rfloor + \text{BonusMốc}(L+1)$$

Trong đó $\text{BonusMốc}(L+1) = 500$ khi $(L+1) \bmod 5 = 0$ (các cấp mốc 5, 10, 15... 100), ngược lại $= 0$.

| Cấp ($L \to L+1$) | Chi phí cũ (◈ / Đá) | Giá trị quy đổi gốc | **XP cần (Chốt)** | **XP cộng dồn từ Lv1** | Chênh lệch so với hệ cũ |
| --- | --- | --- | --- | --- | --- |
| **1 → 2** | 23 ◈ / 2 Đá | 315 XP | **315** | **315** | 0,0% |
| **4 → 5** (Mốc) | 32 ◈ / 7 Đá | 860 XP | **860** | **2.210** | 0,0% |
| **5 → 6** | 35 ◈ / 3 Đá | 475 XP | **475** | **2.685** | 0,0% |
| **9 → 10** (Mốc) | 47 ◈ / 8 Đá | 1.035 XP | **1.035** | **6.405** | 0,0% |
| **24 → 25** (Mốc) | 92 ◈ / 11 Đá | 1.560 XP | **1.560** | **19.200** | 0,0% |
| **25 → 26** | 95 ◈ / 7 Đá | 1.175 XP | **1.175** | **20.375** | 0,0% |
| **34 → 35** (Mốc) | 122 ◈ / 13 Đá | 1.910 XP | **1.910** | **33.125** | 0,0% |
| **44 → 45** (Mốc) | 152 ◈ / 15 Đá | 2.260 XP | **2.260** | **50.550** | 0,0% |
| **49 → 50** (Mốc) | 167 ◈ / 16 Đá | 2.435 XP | **2.435** | **60.575** | 0,0% |
| **59 → 60** (Mốc) | 197 ◈ / 18 Đá | 2.785 XP | **2.785** | **83.250** | 0,0% |
| **74 → 75** (Mốc) | 242 ◈ / 21 Đá | 3.310 XP | **3.310** | **123.825** | 0,0% |
| **99 → 100** (Mốc) | 317 ◈ / 26 Đá | 4.185 XP | **4.185** | **208.950** | 0,0% |

*(Tổng từ Lv1 → Lv100: hệ cũ tốn $16.830\text{ ◈} + 1.248\text{ Đá} = 208.950\text{ XP}$ quy đổi — khớp tuyệt đối 100% với tổng XP tích lũy bảng trên).*

---

### 2. XP từ trang bị vật liệu & Xử lý luồng Phôi / Mảnh

#### Xử lý Phôi rơi từ ải (Tránh đứt gãy hệ thống Tiến khung)

Vì tiến khung vẫn cần **Phôi** (và tiêu hao mất hẳn khi tiến khung):

* **Phôi Trắng & Phôi Lục:** Giữ nguyên cơ chế **tự phân giải thành Mảnh** như cũ để người chơi dùng Mảnh ghép trang bị/đổi shop mà không làm rác túi đồ.
* **Trang bị hoàn chỉnh (từ Trắng đến Tím+5) & Phôi Lam trở lên:** Được phép đưa vào 5 ô vật liệu để ép XP (món đang mặc hoặc đang khóa tự động ẩn/mờ, không cho chọn).


* **Giữ nguyên Đá nâng cấp cũ cho Chiến cơ & Phi công:** Không nên gộp Chiến cơ sang Đá XP ở bản V307 này. Chiến cơ chỉ có 1 món duy nhất, không có hệ thống "đồ rác/phôi dư" để làm nguyên liệu ép như trang bị; giữ nguyên công thức cũ cho Chiến cơ và Pilot67 giúp tránh phải cân bằng lại toàn bộ phần thưởng Nhiệm vụ, Mùa giải và Hầm ngục.



#### Bảng XP gốc theo Khung màu & Công thức kế thừa Level

$$\text{XP}_{\text{vật liệu}} = \text{XP}_{\text{gốc}}(\text{Khung}) + \left\lfloor 0,80 \times \text{XP}_{\text{đã đầu tư}}(Lv) \right\rfloor$$

* **Hệ số kế thừa đầu tư = `0.80` (80%):** Đủ cao để người chơi thoải mái nâng đồ tạm dùng đầu game rồi "nuốt" sang đồ xịn sau này mà không tiếc, nhưng vẫn giữ mức hao hụt 20% để tránh lạm phát tài nguyên.

| Mã khung (`tier_id`) | Tên khung (Trần Lv) | XP gốc khi Lv1 | Ví dụ nếu món đang ở Lv25 | Ví dụ nếu món đang ở Lv50 |
| --- | --- | --- | --- | --- |
| `T0_WHITE` | **Trắng** (Trần 25) | **150** | 15.510 | — |
| `T1_GREEN` | **Lục** (Trần 35) | **350** | 15.710 | — |
| `T2_BLUE` | **Lam** (Trần 45) | **800** | 16.160 | — |
| `T3_BLUE_1` | **Lam +1** (Trần 50) | **1.400** | 16.760 | 49.860 |
| `T4_BLUE_2` | **Lam +2** (Trần 55) | **2.200** | 17.560 | 50.660 |
| `T5_PURPLE` | **Tím** (Trần 60) | **3.500** | 18.860 | 51.960 |
| `T6_PURPLE_1` | **Tím +1** (Trần 75) | **5.200** | 20.560 | 53.660 |
| `T7_PURPLE_2` | **Tím +2** (Trần 80) | **7.500** | 22.860 | 55.960 |
| `T8_PURPLE_3` | **Tím +3** (Trần 85) | **10.500** | 25.860 | 58.960 |
| `T9_PURPLE_4` | **Tím +4** (Trần 90) | **14.500** | 29.860 | 62.960 |
| `T10_PURPLE_5` | **Tím +5** (Trần 95) | **20.000** | 35.360 | 68.460 |
| `T11_GOLD` | **Vàng / Cam** (Trần 100) | **28.000** | 43.360 | 76.460 |

---

### 3. Đá XP, Tỉ lệ rơi theo ải & Quy đổi tồn kho

#### Phân loại Đá XP & Quy đổi tồn kho

* **Đá XP Nhỏ (`xp_stone_small`):** **100 XP** (= đúng 1 Đá nâng cấp cũ).
* **Đá XP Vừa (`xp_stone_medium`):** **500 XP** (= 5 Đá XP Nhỏ).
* **Đá XP Lớn (`xp_stone_large`):** **2.500 XP** (= 25 Đá XP Nhỏ).
* **Quy đổi tồn kho khi cập nhật V307:**
* **1 Đá nâng cấp cũ = 1 Đá XP Nhỏ (100 XP)** *(Lưu ý: chỉ quy đổi phần Đá dư hoặc cho người chơi tự đổi thủ công trong Shop Đổi Đá với tỉ lệ 1:1 không giới hạn, để người chơi vẫn giữ lại được Đá cũ nếu đang cần nâng Chiến cơ / Phi công)*.
* **◈ (Vàng/Bụi):** Giữ nguyên 100% số dư.





#### Tỉ lệ rơi Đá XP theo dải ải (Tính trung bình mỗi lượt đánh / quét)

Để tổng lượng XP thu được trên mỗi ải tương đương lượng Đá cũ + ◈ nâng cấp rơi ra trước đây:

| Nguồn rơi | Đá XP Nhỏ (100 XP) | Đá XP Vừa (500 XP) | Đá XP Lớn (2.500 XP) | XP kỳ vọng / lượt |
| --- | --- | --- | --- | --- |
| **Ải thường Ch.1 – Ch.3** | 100% (SL: 1–2) | 15% (SL: 1) | 0% | **225 XP** |
| **Ải thường Ch.4 – Ch.6** | 100% (SL: 2–3) | 35% (SL: 1) | 0% | **425 XP** |
| **Ải thường Ch.7 – Ch.9** | 100% (SL: 3–4) | 60% (SL: 1) | 8% (SL: 1) | **850 XP** |
| **Ải thường Ch.10+** | 100% (SL: 4–5) | 85% (SL: 1–2) | 20% (SL: 1) | **1.588 XP** |
| **Mini-Boss (Ải giữa chương)** | 100% (SL: 2–4) | 50% (SL: 1) | 5% (SL: 1) | **675 XP** |
| **Boss (Ải cuối chương)** | 100% (SL: 4–6) | 100% (SL: 1–2) | 30% (SL: 1) | **2.000 XP** |
| **Quét nhanh (Sweep)** | Giữ nguyên 100% bảng rơi của ải tương ứng | — | — | **= 100% ải gốc** |

---

### 4. Ngưỡng cảnh báo UI & Kiểm tra sai lệch tiến độ ($\pm 15\%$)

#### Ngưỡng cảnh báo trên giao diện

1. **Cảnh báo dư XP (Overflow Warning):**
* Khi tổng XP gắn vào vượt quá mức cần để đạt **Trần cấp hiện tại** (ví dụ: khung Lam trần Lv45) **hoặc** vượt quá **Lv100** hơn **`200 XP`** (tương đương $\ge 2$ Đá XP Nhỏ):
* Hệ thống **tự động hoàn trả phần dư** dưới dạng **Đá XP Nhỏ** (làm tròn xuống bội số 100 XP) nếu phần dư $\ge 100\text{ XP}$.
* Hiện popup xác nhận màu vàng nếu phần lẻ **bị thất thoát không thể hoàn** nằm trong khoảng **`50 – 99 XP`** (hoặc bất kỳ mức dư nào nếu logic game chọn không hoàn XP).




2. **Cảnh báo vật liệu quý (High-Tier Fodder Warning):**
* Kích hoạt hộp thoại xác nhận bắt buộc (`"Trang bị bậc Tím trở lên rất hiếm và sẽ biến mất vĩnh viễn. Bạn chắc chắn muốn dùng làm nguyên liệu?"`) ngay khi người chơi chạm chọn bất kỳ trang bị nào có `tier_id >= T5_PURPLE` (**Tím trở lên**).





#### Kiểm toán thời gian cày 1 món lên Lv100 (So sánh hệ cũ vs V307)

* **Hệ cũ:** Tổng chi phí lên Lv100 là $16.830\text{ ◈} + 1.248\text{ Đá}$. Với tốc độ farm trung bình giai đoạn mid-late game đạt khoảng $135\text{ ◈} + 10\text{ Đá/ải}$ (tính cả ải thường, Boss và phân giải đồ rơi), người chơi cần trung bình **124,8 ải** (khoảng **125 lượt chơi**) để max 1 trang bị.
* **Hệ mới (V307):** Tổng chi phí lên Lv100 là **208.950 XP**. Với tốc độ farm trung bình từ Ch.7–Ch.10+ kết hợp Boss ($~1.150\text{ XP/ải}$ từ Đá XP) cộng thêm trang bị Trắng/Lục/Lam rơi ra ép trực tiếp ($~500\text{ XP/ải}$), tổng thu nhập đạt **1.650 XP/ải**:

$$\text{Số ải cần thiết (V307)} = \frac{208.950}{1.650} \approx \mathbf{126,6\text{ ải}}$$

* **Độ lệch thực tế:** $+1,4\%$ so với hệ cũ — nằm hoàn toàn trong vùng an toàn **$\pm 15\%$** yêu cầu.



---

### 5. Dữ liệu JSON chuẩn hóa cho mã nguồn

```json
{
  "version": "V307_EQUIP_XP",
  "rules": {
    "max_material_slots": 5,
    "allow_equipped_or_locked": false,
    "consume_materials_permanently": true,
    "invested_xp_inherit_rate": 0.80,
    "infinite_rank_2_xp_bonus": 0.05,
    "auto_salvage_blueprints_max_tier": "T1_GREEN",
    "old_stone_to_small_xp_stone_rate": 1,
    "warnings": {
      "excess_xp_refund_unit": 100,
      "excess_xp_warn_threshold": 50,
      "rare_fodder_warn_min_tier": "T5_PURPLE"
    }
  },
  "level_up_formula": {
    "description": "XP from L to L+1 for L in 1..99",
    "base": 300,
    "per_level": 15,
    "per_5_levels_step": 100,
    "milestone_every_5_bonus": 500,
    "total_xp_1_to_100": 208950
  },
  "equipment_fodder_base_xp": {
    "T0_WHITE": { "cap": 25, "base_xp": 150 },
    "T1_GREEN": { "cap": 35, "base_xp": 350 },
    "T2_BLUE": { "cap": 45, "base_xp": 800 },
    "T3_BLUE_1": { "cap": 50, "base_xp": 1400 },
    "T4_BLUE_2": { "cap": 55, "base_xp": 2200 },
    "T5_PURPLE": { "cap": 60, "base_xp": 3500 },
    "T6_PURPLE_1": { "cap": 75, "base_xp": 5200 },
    "T7_PURPLE_2": { "cap": 80, "base_xp": 7500 },
    "T8_PURPLE_3": { "cap": 85, "base_xp": 10500 },
    "T9_PURPLE_4": { "cap": 90, "base_xp": 14500 },
    "T10_PURPLE_5": { "cap": 95, "base_xp": 20000 },
    "T11_GOLD": { "cap": 100, "base_xp": 28000 }
  },
  "xp_stones": {
    "xp_stone_small": { "xp": 100 },
    "xp_stone_medium": { "xp": 500 },
    "xp_stone_large": { "xp": 2500 }
  },
  "drop_tables": {
    "sweep_multiplier": 1.0,
    "stages": [
      {
        "id": "normal_ch1_3",
        "small": { "chance": 1.0, "min": 1, "max": 2 },
        "medium": { "chance": 0.15, "min": 1, "max": 1 },
        "large": { "chance": 0.0, "min": 0, "max": 0 }
      },
      {
        "id": "normal_ch4_6",
        "small": { "chance": 1.0, "min": 2, "max": 3 },
        "medium": { "chance": 0.35, "min": 1, "max": 1 },
        "large": { "chance": 0.0, "min": 0, "max": 0 }
      },
      {
        "id": "normal_ch7_9",
        "small": { "chance": 1.0, "min": 3, "max": 4 },
        "medium": { "chance": 0.60, "min": 1, "max": 1 },
        "large": { "chance": 0.08, "min": 1, "max": 1 }
      },
      {
        "id": "normal_ch10_plus",
        "small": { "chance": 1.0, "min": 4, "max": 5 },
        "medium": { "chance": 0.85, "min": 1, "max": 2 },
        "large": { "chance": 0.20, "min": 1, "max": 1 }
      },
      {
        "id": "mini_boss",
        "small": { "chance": 1.0, "min": 2, "max": 4 },
        "medium": { "chance": 0.50, "min": 1, "max": 1 },
        "large": { "chance": 0.05, "min": 1, "max": 1 }
      },
      {
        "id": "chapter_boss",
        "small": { "chance": 1.0, "min": 4, "max": 6 },
        "medium": { "chance": 1.0, "min": 1, "max": 2 },
        "large": { "chance": 0.30, "min": 1, "max": 1 }
      }
    ]
  }
}

```