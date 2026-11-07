# Phi Đội Sao Băng
Game bắn máy bay dọc màn hình, chạy trên trình duyệt và Android.

- `www/` – bản game (HTML + JS), dựng từ mã nguồn của dự án.
- `.github/workflows/apk.yml` – mỗi lần cập nhật `www/`, GitHub Actions tự đóng gói APK (Capacitor). Tải APK ở tab **Actions** → lần chạy mới nhất → mục **Artifacts**.

APK hiện là bản debug (chưa ký phát hành), cài trực tiếp được trên Android khi cho phép "cài ứng dụng không rõ nguồn".

## Cập nhật bản mới
1. Thay `www/` bằng bản game mới, sửa `VERSION` (ví dụ `V199`).
2. Đẩy lên GitHub → Actions tự build `PhiDoiSaoBang-V199.<số lần build>.apk`.
3. Cài đè lên bản cũ trên điện thoại: **giữ nguyên dữ liệu chơi**, vì mọi bản đều ký bằng cùng khóa `signing/debug.keystore`.

**Không xóa hay thay `signing/debug.keystore`**: đổi khóa thì Android bắt gỡ bản cũ, gỡ là mất dữ liệu lưu. Kho phải để Private vì khóa nằm trong kho.
