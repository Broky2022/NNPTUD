# Dự án Quản lý RESTful API với Node.js, Express, MongoDB và React

## Tổng quan

Dự án này xây dựng hệ thống quản lý người dùng, sản phẩm, danh mục, menu, vai trò và xác thực người dùng. Backend sử dụng Node.js, Express, MongoDB (Mongoose), cung cấp các API RESTful cho frontend hoặc ứng dụng bên ngoài. Frontend mẫu sử dụng React để minh họa cách giao tiếp với backend.

## Kiến trúc thư mục

```
NNPTUD/
├── backend/
│   ├── app.js                # Khởi tạo app Express, middleware, kết nối MongoDB, khai báo route
│   ├── package.json          # Thông tin package và dependencies backend
│   ├── bin/www               # Khởi động server
│   ├── controllers/          # Xử lý logic cho user, sản phẩm, v.v.
│   ├── public/               # Tài nguyên tĩnh (CSS, ảnh...)
│   ├── routes/               # Định nghĩa các endpoint API (auth, users, products, ...)
│   ├── schemas/              # Định nghĩa schema MongoDB (user, product, ...)
│   └── utils/                # Tiện ích: xác thực, phân quyền, gửi mail, validate, hằng số
├── frontend/
│   ├── package.json          # Thông tin package và dependencies frontend
│   ├── public/               # Tài nguyên tĩnh React
│   └── src/                  # Source code React (giao diện, gọi API, context, ...)
└── README.md                 # Tài liệu mô tả dự án
```

## Backend
- **Node.js + Express:** Xây dựng API RESTful.
- **MongoDB + Mongoose:** Lưu trữ và truy vấn dữ liệu.
- **JWT:** Xác thực và phân quyền người dùng.
- **express-validator:** Kiểm tra dữ liệu đầu vào.
- **bcrypt:** Mã hóa mật khẩu.
- **nodemailer:** Gửi email (quên mật khẩu).
- **CORS:** Cho phép frontend truy cập API.

### Các chức năng chính
- Đăng ký, đăng nhập, đổi mật khẩu, quên mật khẩu (qua email)
- CRUD người dùng, sản phẩm, danh mục, menu, vai trò
- Phân quyền theo vai trò (admin, user, ...)
- Tìm kiếm, lọc sản phẩm

### Các route tiêu biểu
- `POST /auth/login` – Đăng nhập
- `POST /auth/signup` – Đăng ký
- `GET /products` – Lấy danh sách sản phẩm
- `POST /products` – Thêm sản phẩm
- `PUT /products/:id` – Sửa sản phẩm
- `DELETE /products/:id` – Xóa sản phẩm
- `GET /categories` – Lấy danh mục
- ...

## Frontend (React)
- Giao diện đăng nhập, hiển thị danh sách sản phẩm, CRUD sản phẩm.
- Sử dụng axios để gọi API backend.
- Quản lý trạng thái đăng nhập bằng React Context.

## Hướng dẫn chạy dự án

### 1. Cài đặt backend
```bash
cd backend
npm install
npm start
```
Backend mặc định chạy ở http://localhost:5000

### 2. Cài đặt frontend
```bash
cd frontend
npm install
npm start
```
Frontend mặc định chạy ở http://localhost:3000

### 3. Cấu hình kết nối
- Đảm bảo MongoDB đang chạy local (mặc định: mongodb://localhost:27017/S2)
- Có thể chỉnh sửa baseURL trong `frontend/src/utils/axios.js` nếu backend chạy cổng khác.

## Đóng góp
- Fork, tạo branch mới, pull request để đóng góp code.

## Bản quyền
- Sử dụng cho mục đích học tập, nghiên cứu và phát triển hệ thống quản lý RESTful API.