CREATE DATABASE school;

CREATE TABLE school.classes(
	className VARCHAR(5) PRIMARY KEY,
    numberOfStudents INT DEFAULT 0
);
CREATE TABLE school.students(
	studentId INT PRIMARY KEY,
    firstName VARCHAR(15),
    lastName VARCHAR(20),
    className VARCHAR(5),
    birthday DATE,
    gender VARCHAR(1),
    averageGrade DECIMAL(4,2),
    FOREIGN KEY(className) REFERENCES school.classes(className) ON DELETE SET NULL
);
CREATE TABLE school.teachers(
	teacherId INT PRIMARY KEY,
    firstName VARCHAR(15),
    lastName VARCHAR(20),
    birthday DATE,
    gender VARCHAR(1),
    salary INT,
    primaryTeacherTo VARCHAR(5) DEFAULT NULL,
    FOREIGN KEY(primaryTeacherTo) REFERENCES school.classes(className) ON DELETE SET NULL
);
CREATE TABLE school.subjects(
	subjectName VARCHAR(40) PRIMARY KEY
);
CREATE TABLE school.timetable(
	startTime TIMESTAMP,
    endTime TIMESTAMP,
    className VARCHAR(5),
    subjectName VARCHAR(40),
    teacherId INT,
    FOREIGN KEY(className) REFERENCES school.classes(className) ON DELETE CASCADE,
    FOREIGN KEY(subjectName) REFERENCES school.subjects(subjectName) ON DELETE CASCADE,
    FOREIGN KEY(teacherId) REFERENCES school.teachers(teacherId) ON DELETE CASCADE,
    PRIMARY KEY(startTime, endTime, className)
);

/* These triggers are supposed to change the value of numberOfStudents 
in a row in classes when a new student is added or removed with same class.
I don't know if they work, since I haven't tested them, but this is roughly
how it should be done */
/*CREATE TRIGGER studentsPerClass AFTER INSERT ON school.students
WHERE school.students.className = school.classes.className
SET school.classes.numberOfStudents = school.classes.numberOfStudents + 1;

CREATE TRIGGER studentsPerClass AFTER DELETE ON school.students
WHERE school.students.className = school.classes.className
SET school.classes.numberOfStudents = school.classes.numberOfStudents - 1;*/