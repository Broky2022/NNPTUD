let Student = function Student(id, name, age, diem1, diem2) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.diem = {
        diem1: diem1,
        diem2: diem2
    }
    this.getInfo= function() {
        return id;
    }
}

let student1 = new Student(1, 'Nguyen Van A', 20, 8, 9);
let student2 = new Student(2, 'Nguyen Van B', 21, 7, 8);
let student3 = new Student(3, 'Nguyen Van C', 22, 6, 7);