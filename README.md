## Mô tả

Dự án này là một hệ thống API server xây dựng bằng Node.js, Express và MongoDB, phục vụ cho việc quản lý người dùng, phân quyền, sản phẩm, danh mục, menu và xác thực người dùng. Dự án hướng tới việc cung cấp backend cho các ứng dụng web hoặc mobile cần chức năng quản lý tài khoản, sản phẩm, phân quyền và các thao tác CRUD cơ bản.

### Kiến trúc tổng thể
- **Backend:** Node.js với Express framework.
- **Cơ sở dữ liệu:** MongoDB, sử dụng Mongoose để định nghĩa schema và thao tác dữ liệu.
- **Xác thực & phân quyền:** Sử dụng JWT (JSON Web Token) để xác thực, phân quyền theo vai trò (admin, mod, user).
- **Quản lý người dùng:** Đăng ký, đăng nhập, đổi mật khẩu, quên mật khẩu (gửi email reset), phân quyền, CRUD user.
- **Quản lý sản phẩm & danh mục:** CRUD sản phẩm, danh mục, tìm kiếm sản phẩm theo tên, lọc theo giá, liên kết sản phẩm với danh mục.
- **Quản lý menu:** CRUD menu, hỗ trợ menu cha-con.
- **Quản lý vai trò:** CRUD role, gán role cho user.
- **Kiểm tra dữ liệu đầu vào:** Sử dụng express-validator để validate dữ liệu như email, password, username.
- **Gửi email:** Sử dụng nodemailer để gửi email (ví dụ: reset mật khẩu).
- **Mã hóa mật khẩu:** Sử dụng bcrypt để hash mật khẩu trước khi lưu vào database.

### Các module chính
- **app.js:** Khởi tạo app Express, kết nối MongoDB, cấu hình middleware, khai báo các route chính.
- **controllers/:** Xử lý logic cho từng đối tượng (user, sản phẩm, v.v.).
- **routes/:** Định nghĩa các endpoint API cho từng chức năng (auth, users, products, categories, roles, menus).
- **schemas/:** Định nghĩa các schema MongoDB cho user, role, product, category, menu.
- **utils/:** Các tiện ích như xác thực, phân quyền, gửi mail, validate dữ liệu, hằng số.

### Đối tượng quản lý
- **User:** Đăng ký, đăng nhập, đổi mật khẩu, quên mật khẩu, phân quyền, CRUD.
- **Role:** Quản lý vai trò, phân quyền cho user.
- **Product:** CRUD sản phẩm, liên kết với danh mục.
- **Category:** CRUD danh mục, liên kết với sản phẩm.
- **Menu:** CRUD menu, hỗ trợ menu cha-con.

### Đặc điểm nổi bật
- Xác thực và phân quyền bảo mật bằng JWT.
- Hỗ trợ gửi email reset mật khẩu.
- Kiểm tra dữ liệu đầu vào chặt chẽ.
- Mã hóa mật khẩu an toàn.
- Kiến trúc rõ ràng, dễ mở rộng.

## Cài server API 
> [Git](https://github.com/typicode/json-server)
- cài: npm install json-server
- run: npx json-server db.json
- ko có node_modules: npm update (cần package.json)

## Một vài lệnh terminal
- npm ls -g --depth=0   # Hiển thị danh sách package
- npm uninstall -g <package-name>  # Gỡ từng package
- npm cache clean --force # Xóa cache của npm

## Khởi tạo dự án Express với MongoDB
- npm i express-generator # khởi tạo Express 
- npx express --view=pub # tạo một project Express với template engine Pug
- npm i nodemon # Cài đặt Nodemon (một công cụ tự động khởi động lại server khi có thay đổi trong code)
- npm i mongoose # Cài đặt Mongoose (một thư viện để kết nối và làm việc với MongoDB)
- npm i bcrypt # Cài đặt bcrypt (một thư viện dùng để mã hóa (hash) mật khẩu)
- npm i slugify # chuyển chuỗi thành "slug" – dạng URL thân thiện, không dấu, không ký tự lạ.
- npm i cors # Dùng trong server Node.js/Express để bật CORS (Cross-Origin Resource Sharing) – cho phép frontend ở domain khác gọi API.
- npm i express-validator # kiểm tra đầu vào như email, password, username, phone, v.v... để đảm bảo đúng định dạng, tránh lỗi hoặc dữ liệu xấu.
- npm i nodemailer #  giúp gửi email dễ dàng từ server
- npm i multer
- npm update # Cập nhật tất cả package trong package.json lên phiên bản mới nhất
- npm start # chạy dự án