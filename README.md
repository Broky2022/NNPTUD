# NNPTUD_ST2
> link classroom: [Link](https://classroom.google.com/u/0/c/NzYwMTcwMTU4NTU3)

> link git của thầy: [Link](https://github.com/nguyenthanhtunghutechsg/NNPTUD_S2/tree/main)
---
## Điểm:
### QT:
- Điểm danh đủ 9 buổi, vắng 1 buổi - 0.5đ (30% QT)
- Điểm bài tập (đẩy lên github nộp link) 70%
- Điểm thưởng tối đa 2
- Nếu đang thực tập và đang đi làm, cung cấp minh chứng (cc quản lý, hoặc sử dụng email cty để gửi)
### CK:
- BE: bắt buộc viết theo **mô hình service**, không viết theo MVC 60% 
- FE: html thuần, framework của js, android, ios,... (40%) cover được 70% chức năng

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
- npm update # Cập nhật tất cả package trong package.json lên phiên bản mới nhất
- npm i nodemon # Cài đặt Nodemon (một công cụ tự động khởi động lại server khi có thay đổi trong code)
- npm i mongoose # Cài đặt Mongoose (một thư viện để kết nối và làm việc với MongoDB trong Node.js)
- npm start # chạy dự án