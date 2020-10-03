class Student {

    constructor(name, address, phone, course) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.course = course;
    }

    getInfo() {
        return `Name: ${this.name}
        Address: ${this.address}
        Phone: ${this.phone}
        Course: ${this.course}`
    }

}

var student1 = new Student("Tim Johnson", "1620 S. Michigan Ave. #2B, Chicago IL 60601", "3121111111", "Geology");
var student2 = new Student("Amy Jones", "155 E. Wacker Dr. #2207, Chicago IL 60602", "3122222222", "Mathematics");
var student3 = new Student("George Anderson", "500 W. Addison #305, Chicago IL 60657", "3123333333", "Physics");


console.log(student1, student2, student3);
