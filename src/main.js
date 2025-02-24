let keyScore1 = "Toan";
let keyScore2 = "Tin";
let student = function student(id, name, age, diem1, diem2) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.diems = {
        [keyScore1]: diem1,
        [keyScore2]: diem2
    }
}
let students = [];
students.push(new student(3, 'Nguyen Van A', 17, 8, 9));
students.push(new student(1, 'Nguyen Van B', 19, 6, 7));
students.push(new student(2, 'Nguyen Van C', 22, 3, 4));

let result = students.map(function(student){
    if(student.diems[keyScore1] + student.diems[keyScore2] >= 16){
        return "Gioi";
    }
    else {
        if(student.diems[keyScore1] + student.diems[keyScore2] >= 13){
            return "Kha";
        }else{
            return "Trung binh";
        }
    }
});

let max = students.reduce(function(max, student){
    return max<student.age ? student.age : max;
}, students[0].age);

//hiện hs dưới 18t 
let duoi18 = students.filter(function(student){
    return student.age < 18;
});

//hiện hs có điểm trung bình <8
let checkDup = students.some(
    function(student){
    return student.diems[keyScore1] + student.diems[keyScore2] <8;
});

//sắp xếp hs theo tuổi, nếu = nhau thì xếp theo id
students.sort(Compare)

function Compare(student1,student2){
    if(student1.age==student2.age){
        return student1.id-student2.id;
    }
    return student1.age-student2.age;
}