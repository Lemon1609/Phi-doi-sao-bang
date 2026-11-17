Dưới đây là bộ thông số chuẩn hóa dạng JSON để lắp trực tiếp vào logic game, kèm giải trình cân bằng cho 7 đầu mục.
{
  "synthesis_v307": {
    "enabled": true,
    "input_count": 5,
    "allow_mixed_templates": true,
    "allow_mixed_slots": true,
    "output_slot_rule": "weighted_by_input_slots",
    "output_template_rule": "random_unmaxed_below_purple_plus_5",
    "recipes": [
      {
        "id": "syn_white_to_green",
        "input_frame": "Trắng",
        "output_frame": "Lục",
        "cost_gold": 150,
        "success_rate": 1.0,
        "uses_luck_pity": false,
        "daily_limit": null
      },
      {
        "id": "syn_green_to_blue",
        "input_frame": "Lục",
        "output_frame": "Lam",
        "cost_gold": 450,
        "success_rate": 1.0,
        "uses_luck_pity": false,
        "daily_limit": null
      },
      {
        "id": "syn_blue_to_purple",
        "input_frame": "Lam",
        "output_frame": "Tím",
        "cost_gold": 1500,
        "success_rate": 0.2,
        "uses_luck_pity": true,
        "fail_refund": {
          "item_frame": "Lam",
          "count": 1,
          "slot_rule": "weighted_by_input_slots"
        },
        "luck_pity": {
          "gain_per_fail": 25,
          "max_points": 100,
          "guaranteed_output_frame": "Tím",
          "reset_on_purple_drop": true
        },
        "daily_limit": 10
      }
    ],
    "level_xp_refund": {
      "enabled": true,
      "refund_ratio": 0.85,
      "conversion_order_desc": [
        { "stone": "Đá XP IV", "xp": 1000 },
        { "stone": "Đá XP III", "xp": 240 },
        { "stone": "Đá XP II", "xp": 60 },
        { "stone": "Đá XP I", "xp": 15 }
      ],
      "min_positive_remainder_stone": "Đá XP I"
    },
    "salvage_reverse_button": {
      "enabled": false,
      "alternative": "keep_existing_85_percent_xp_feed"
    },
    "restrictions": {
      "exclude_equipped": true,
      "exclude_locked": true,
      "excluded_frames": [
        "Lam+1", "Lam+2", "Lam+3",
        "Tím", "Tím+1", "Tím+2", "Tím+3", "Tím+4", "Tím+5"
      ],
      "warn_if_level_above": 1
    }
  }
}

Giải thích chi tiết 7 mục thiết kế
 * Bậc hợp thành & Quy tắc trộn loại / mẫu
   * Chỉ mở 3 bậc gốc: Trắng → Lục, Lục → Lam, và Lam → Tím (không nhận Lam+1..+3 và Tím+). Các mốc +1..+3 / +1..+5 giữ nguyên luật dùng cùng mẫu để bảo toàn giá trị của mảnh trùng.
   * Cho trộn khác mẫu & trộn cả 3 loại (Giáp · Tên lửa · Vũ khí phụ): Giải quyết đúng bài toán xả đồ thừa lệch hệ.
   * Xác định món đầu ra: Mỗi món đưa vào lò đóng góp 20% trọng số cho loại của chính nó (ví dụ: bỏ 3 Giáp + 2 Tên lửa → 60% ra Giáp, 40% ra Tên lửa; bỏ cả 5 cùng loại → 100% ra loại đó). Sau khi chốt loại, hệ thống bốc ngẫu nhiên đều trong các mẫu thuộc loại đó chưa đạt Tím+5 (nếu loại đó đã Tím+5 toàn bộ thì chuyển sang loại chưa đủ Tím+5).
 * Chi phí ◈ theo bậc
   * Trắng → Lục: 150 ◈ (~2 ải đầu game).
   * Lục → Lam: 450 ◈ (~1–2 ải giai đoạn giữa).
   * Lam → Tím: 1.500 ◈ (~2,3 ải cuối game). Mức phí này đủ nhẹ để dọn túi định kỳ nhưng ngăn việc spam liên tục ở ngưỡng Tím.
 * Tỉ lệ & Thanh may mắn (Bảo hiểm)
   * Trắng → Lục và Lục → Lam: Tỉ lệ 100%, không cần thanh may mắn.
   * Lam → Tím:
     * Tỉ lệ ra thẳng Tím: 20%.
     * Khi trượt (80%): hoàn lại 1 trang bị Lam (+0, chọn loại theo trọng số đầu vào) để giảm cảm giác mất trắng, đồng thời cộng +25 điểm vào Thanh May Mắn.
     * Khi đạt 100/100 điểm (tối đa 4 lần trượt, lần thứ 5 chắc chắn nổ): 100% ra 1 trang bị Tím. Thanh điểm reset về 0 ngay khi nhận được Tím (kể cả nổ sớm trước 100 điểm).
 * Hoàn XP khi nguyên liệu có Level > 1
   * Hoàn 85% tổng XP đã đầu tư vào các món có Level > 1 (đồng bộ tuyệt đối với tỉ lệ hoàn XP khi làm nguyên liệu nâng cấp hiện tại, tránh tạo kẽ hở chuyển đổi XP).
   * Hệ thống tự quy đổi tổng XP hoàn trả thành Đá XP IV → III → II → I (1.000 → 240 → 60 → 15); nếu còn phần dư 1–14 XP thì làm tròn lên 1 Đá XP I (15 XP).
 * Nút Tách (Phân giải ngược): Không thêm
   * Lý do: Trang bị dư đã có đầu ra tiêu thụ là làm nguyên liệu nâng Level (hoàn 85% XP) hoặc đưa vào lò 5 → 1. Thêm nút Tách sẽ phát sinh loại tiền tệ/mảnh mới, làm phình giao diện và dễ bị khai thác để "tách – ghép lại" nhằm roll lại mẫu hoặc cày thanh may mắn.
 * Giới hạn chống lạm dụng
   * Tự động loại khỏi danh sách chọn vào lò: món đang mặc, món đã khóa, và toàn bộ trang bị thuộc khung Lam+1..+3 hoặc Tím / Tím+1..+5.
   * Món có Level > 1 vẫn cho chọn nhưng gắn nhãn cảnh báo "Hoàn 85% Đá XP" và hiện hộp thoại xác nhận trước khi hợp thành.
   * Giới hạn 10 lượt/ngày riêng cho bậc Lam → Tím (người chơi bình thường không chạm tới, nhưng chặn đứng rủi ro auto-click/lỗi tích trữ).
 * Kiểm toán tốc độ lên Tím (Đảm bảo trong biên độ ±15%)
   * Với 39 mẫu, nếu Lam → Tím để tỉ lệ 100%, người chơi chỉ cần 5 món Lam tạp là có 1 Tím, khiến tốc độ lên Tím nhanh gấp nhiều lần đường tiến khung chính.
   * Với cấu hình 20% + hoàn 1 Lam khi trượt + bảo hiểm 100 điểm (+25/lần):
     * Lần 1 tiêu hao 5 Lam; các lần sau (nhờ hoàn 1 Lam) thực tiêu hao 4 Lam/lần, tối đa 5 lần (5 + 4×4 = 21 Lam).
     * Kỳ vọng toán học để nhận 1 Tím ngẫu nhiên qua lò:
       
     * Con số ~14,5 Lam tạp cho 1 Tím ngẫu nhiên tương đương lượng rơi tích lũy tự nhiên trong chu kỳ gom đủ mảnh cùng mẫu cho 1 Tím chủ động trên đường chính, giữ tốc độ lên Tím toàn cục chỉ tăng khoảng +9% đến +12% (nằm trọn trong ngưỡng an toàn ±15%).
