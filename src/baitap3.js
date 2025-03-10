const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

let students = [
    {
        "id": "1",
        "MSSV": "7677",
        "HoTen": "Nguyen Hoang Ky",
        "Lop": "21DTHD5",
        "isDeleted" : false
      }
];

// Hàm tạo chuỗi ngẫu nhiên (16 ký tự)
function genRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// Hàm tạo MSSV (11 số ngẫu nhiên)
function genRandomMSSV() {
    return Math.floor(10000000000 + Math.random() * 90000000000).toString();
}

// Constructor Student
class Student {
    constructor(HoTen, Lop) {
        this.id = genRandomString(16);
        this.MSSV = genRandomMSSV();
        this.HoTen = HoTen;
        this.Lop = Lop;
        this.isDeleted = false;
    }
}

// GET: Lấy danh sách student (chỉ lấy những student ko bị xóa)
app.get('/', (req, res) => {
    res.send(students.filter(student => !student.isDeleted));
});

// GET: Lấy thông tin một student theo id
app.get('/:id', (req, res) => {
    const student = students.find(s => s.id === req.params.id);
    if (!student || student.isDeleted) {
        return res.status(404).send({ message: "Không tìm thấy student" });
    }
    res.send(student);
});

// POST: Thêm mới student (chỉ nhận HoTen và Lop)
app.post('/students', (req, res) => {
    const { HoTen, Lop } = req.body;
    if (!HoTen || !Lop) {
        return res.status(400).send({ message: "HoTen và Lop không được để trống" });
    }
    const newStudent = new Student(HoTen, Lop);
    students.push(newStudent);
    res.send(newStudent);
});

// PUT: Cập nhật thông tin student (chỉ cập nhật HoTen và Lop)
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === req.params.id);
    if (!student || student.isDeleted) {
        return res.status(404).send({ message: "Không tìm thấy student" });
    }
    
    const { HoTen, Lop } = req.body;
    if (HoTen) student.HoTen = HoTen;
    if (Lop) student.Lop = Lop;
    
    res.send(student);
});

// DELETE: Đánh dấu student là đã xóa
app.delete('/students/:id', (req, res) => {
    const student = students.find(s => s.id === req.params.id);
    if (!student || student.isDeleted) {
        return res.status(404).send({ message: "Không tìm thấy student" });
    }
    student.isDeleted = true;
    res.send({ message: "Đã xóa student!", student });
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});