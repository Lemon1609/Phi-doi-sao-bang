# BÁO CÁO V211 · Phi Đội Sao Băng · 08/11/2026

## Đã ghép

| Hạng mục | Nguồn | Nội dung |
|---|---|---|
| Cân lại nội tại theo đòn thật 5,64 máu | Gemini `V211_ARMOR_EVENT_AND_SURV_FIX` | Khiên Siêu Cấp giữ mức V210. Tiếp Tế Mạch và Lách Đạn Phản trả về mức V209. Chiến Lợi Thuẫn: khiên 6–10% máu (Lv5 đỡ ~95% một đòn), trần 15%, xóa nợ 20–35%. Kế thừa SSS giữ 1,0 / 0,6 / 1,25 |
| Sát thương địch ở ải 160 / 180 / 200 | Gemini | 0,86 / 0,68 / 0,63 → 0,84 / 0,66 / 0,61 |
| D2 · màu tia trúng đích 13 tàu | GPT | Theo màu lõi / động cơ từng tàu, toàn tông lam – tím – lục. Bỏ tia đỏ #ff3b5c của tàu 7 và tia hồng #ff5aa8 của tàu 10, vì dễ lẫn với đạn địch. Tắt bằng `D2_211=false` |
| G3 · tên boss dài | GPT | Nếu không vừa ở cỡ 13 px thì bỏ phần khu vực sau dấu "·" cuối cùng, giữ "LV · loại boss · tên chính"; vẫn dài mới thu tiếp xuống 11 px |

Các cờ bật/tắt:
- `BAL211=false`: quay về số V210;
- `BAL210=false` (khi đã tắt `BAL211`): quay về số V209.

## Ghi chú về D2
- Vệt động cơ là một phần **tranh tàu**, không vẽ bằng mã, nên Claude **không đổi** (giữ luật không vẽ lại tàu).
- Hai thứ mang màu riêng theo từng tàu trong trận là **tia trúng đích** và hiệu ứng nổ lan / xích điện; giờ đã theo bảng của GPT.
- Dáng vệt riêng cho từng tàu (đề xuất của GPT) chưa làm, vì đó là vẽ lại phần tranh đạn / vệt.

## Kiểm tra (bot)
- Hồi quy t156: **14/14**.
- Test V209–V211: **20/20**. Các số Lv5 đo được:
  - hồi 3,5% máu;
  - 5 lần sượt hồi 8% giáp;
  - khiên 10% máu = 5,33, đỡ được 5,33 trong một đòn 5,64;
  - SURV200 0,84 / 0,66 / 0,61;
  - SSS mẹ 2 hồi 2,1% (60%).
- Test V204 **8/8** · V206 **7/7** · V207 **8/8** (V206 chạy riêng).
- Ảnh boss ải 140: tên dài vẫn vừa một dòng ở cỡ chữ lớn.
