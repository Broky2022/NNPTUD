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