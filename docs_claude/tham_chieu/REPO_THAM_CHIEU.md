# Repo tham khảo (V305 · 15/11/2026, chủ dự án yêu cầu thêm)

Clone chỉ đọc vào máy làm việc (KHÔNG chép vào repo game, không commit mã của họ). Khi mượn kỹ thuật thì viết lại bằng mã của mình và ghi nguồn.

| Repo | Đường dẫn trên máy | Giấy phép | Dùng gì | Không dùng |
|---|---|---|---|---|
| 0x0funky/agent-sprite-forge (v0.6.0) | /home/claude/0x0funky/agent-sprite-forge | MIT | Công cụ hậu kỳ chạy tại chỗ (numpy/Pillow/scipy): tách nền mềm `forge_matte.py`, kiểm tra tấm sprite `sheet_qc.py`, hiệu ứng vẽ bằng mã `codeart2d/fx_build.py` | Phần tạo ảnh / video (`generate2dmedia`) cần khóa API trả phí hoặc CLI đã đăng nhập (OpenAI, Gemini, xAI…) → không dùng (luật: không tạo tài khoản, không nhập mật khẩu). Các công cụ pixel-art ít hợp phong cách neon của game |
| Donchitos/Claude-Code-Game-Studios (1.3.0) | /home/claude/donchitos/claude-code-game-studios | MIT | Đọc làm danh mục kiểm tra: `perf-profile`, `soak-test`, `balance-check`, `asset-audit`, `smoke-check`, `release-checklist`, `playtest-report`; kỹ thuật chạy lại tất định (đồng hồ ảo + mulberry32) đã áp vào `tests/so_anh.py` | KHÔNG cài `.claude/settings.json`, hooks, agents của họ vào dự án (đổi quyền / hành vi phiên làm việc). Không chuyển game sang Vite/TypeScript |
| aseprite/aseprite | /home/claude/aseprite/aseprite | EULA riêng (mã nguồn mở xem được, KHÔNG được phân phối bản dựng) | Dựng bản dòng lệnh (`LAF_BACKEND=none`) để dùng cục bộ: xuất / ghép tấm sprite, đổi cỡ, chạy kịch bản Lua | Không đưa bản dựng vào repo, APK hay gửi cho ai |

## Trạng thái dựng Aseprite (15/11)
- Đã kéo đủ mã nguồn + thư viện con. Bước cấu hình CMake dừng: thiếu tệp tiêu đề phát triển của X11 (`libxcursor-dev`, `libxi-dev`); máy có thư viện chạy nhưng không có header, và mạng cài gói đang tắt nên không `apt install` được.
- Muốn dựng tiếp: bật quyền cài gói mạng trong cài đặt (có hiệu lực ở cuộc trò chuyện mới), rồi `apt install libxcursor-dev libxi-dev` và chạy lại cmake với `-DLAF_BACKEND=none`.
