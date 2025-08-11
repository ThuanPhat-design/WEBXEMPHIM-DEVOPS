# WEBXEMPHIM

Một ứng dụng web xem phim trực tuyến mô phỏng giao diện và trải nghiệm giống Netflix.

## 📦 Mô tả

* Người dùng có thể đăng ký, đăng nhập, duyệt phim theo danh mục, tìm kiếm, xem chi tiết và đánh dấu phim yêu thích.
* Giao diện responsive, thiết kế tối giản, tập trung vào trải nghiệm hình ảnh.

## ⚙️ Công nghệ chính

* **Frontend**: React.js, Tailwind CSS
* **Backend**: Node.js, Express
* **Cơ sở dữ liệu**: MongoDB
* **Xác thực**: JSON Web Token (JWT)

## 🚀 Cài đặt và khởi chạy

### Yêu cầu

* Node.js ≥ 14.x
* MongoDB đang chạy cục bộ hoặc remote server

### Thiết lập

1. Clone repository:

   ```bash
   git clone https://github.com/QuangVinh2708/WEBXEMPHIM.git
   ```
2. Tạo file `.env` trong thư mục `server` với các biến môi trường:

   ```env
   MONGO_URI=<Chuỗi kết nối MongoDB>
   JWT_SECRET=<Chuỗi bí mật cho JWT>
   PORT=5000
   ```

### Chạy backend

```bash
cd WEBXEMPHIM/server
npm install
npm run dev
```

### Chạy frontend

```bash
cd WEBXEMPHIM/client
npm install
npm start
```

Sau khi cả hai server đều chạy, truy cập `http://localhost:3000` để trải nghiệm ứng dụng.

## 🎯 Tính năng

* **Đăng ký & Đăng nhập**: Bảo mật với JWT
* **Trang chủ & Banner phim**: Hiển thị phim nổi bật
* **Popular Movies**: Lưới poster, đánh dấu yêu thích
* **Tìm kiếm & Lọc**: Theo tên, thể loại
* **Trang chi tiết**: Thông tin phim, trailer
* **Yêu thích (Favorites)**: Lưu phim vào danh sách cá nhân

## 🗂️ Cấu trúc thư mục

```
WEBXEMPHIM/
├── client/            # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
└── server/            # Express backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo pull request hoặc mở issue để thảo luận.

## 📄 License

Dưới giấy phép MIT.
