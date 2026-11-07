# Phi Đội Sao Băng
Game bắn máy bay dọc màn hình, chạy trên trình duyệt và Android.

- `www/` – bản game (HTML + JS), dựng từ mã nguồn của dự án.
- `.github/workflows/apk.yml` – mỗi lần cập nhật `www/`, GitHub Actions tự đóng gói APK (Capacitor). Tải APK ở tab **Actions** → lần chạy mới nhất → mục **Artifacts**.

APK hiện là bản debug (chưa ký phát hành), cài trực tiếp được trên Android khi cho phép "cài ứng dụng không rõ nguồn".
