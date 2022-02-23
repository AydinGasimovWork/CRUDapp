CREATE DATABASE school;

CREATE TABLE school.classes(
	className VARCHAR(5) PRIMARY KEY,
    numberOfStudents INT DEFAULT 0
);
CREATE TABLE school.students(
	studentId INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(15),
    lastName VARCHAR(20),
    className VARCHAR(5),
    birthday DATE,
    gender VARCHAR(1),
    averageGrade DECIMAL(4,2),
    FOREIGN KEY(class) REFERENCES school.classes(className)
);
CREATE TABLE school.teachers(
	teacherId INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(15),
    lastName VARCHAR(20),
    birthday DATE,
    gender VARCHAR(1),
    salary INT
);
CREATE TABLE school.subjects(
	subjectName VARCHAR(40) PRIMARY KEY
);

CREATE TABLE school.timetable(
	startTime TIMESTAMP,
    endTime TIMESTAMP,
    clasName VARCHAR(5),
    subjectName VARCHAR(40),
    teacherId INT,
    FOREIGN KEY(className) REFERENCES school.classes(className) ON DELETE CASCADE,
    FOREIGN KEY(subjectName) REFERENCES school.subjects(subjectName) ON DELETE CASCADE,
    FOREIGN KEY(teacherId) REFERENCES school.teachers(teacherId) ON DELETE CASCADE,
    PRIMARY KEY(startTime, endTime, class)
);


/* These triggers are supposed to change the value of numberOfStudents 
in a row in classes when a new student is added or removed with same class.
I don't know if they work, since I haven't tested them, but this is roughly
how it should be done */
CREATE TRIGGER studentsPerClass AFTER INSERT ON school.students
WHERE school.students.classNAme = school.classes.className
SET school.classes.numberOfStudents = school.classes.numberOfStudents + 1;

CREATE TRIGGER studentsPerClass AFTER DROP ON school.students
WHERE school.students.className = school.classes.className
SET school.classes.numberOfStudents = school.classes.numberOfStudents - 1;



INSERT INTO school.classes VALUES('A1', 0);
INSERT INTO school.students VALUES(1, 'A1', 'Kamal', 'Salahov', 'M', '2000-04-20', 12.05);
INSERT INTO school.students(className, firstName, lastName, gender, birthday, averageGrade)
VALUES('A1', 'Laman', 'Jalilova', 'F', '2000-11-05', 21.00);

SELECT * FROM school.students;