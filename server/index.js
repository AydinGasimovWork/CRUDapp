const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const http = require('http');
const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'school',
    insecureAuth : true
});


// These two are related to connecting back-end to front-end
app.use(cors());
app.use(express.json());


//Blocks of code underneath this line correspond to Create operation of the Crud app
app.post('/createClass', (req, res) => {
    const className = req.body.className;

    db.query('INSERT INTO school.classes(className) VALUES(?)',
    [className], (err, result) => {
        if(err) console.log(err);
        else res.send('Class created successfully');
    });
});
app.post('/createStudent', (req, res) => {
    const studentId = req.body.studentId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const className = req.body.className;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const average = req.body.average;

    db.query(`INSERT INTO school.students(studentId ,firstName, lastName,
        className, birthday, gender, averageGrade) VALUES(?,?,?,?,?,?,?)`,
    [studentId, firstName,lastName,className,birthday,gender,average], (err, result) => {
        if(err) console.log(err);
        else res.send('Student added successfully');
    });
});
app.post('/createTeacher', (req, res) => {
    const teacherId = req.body.teacherId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const salary = req.body.salary;

    db.query(`INSERT INTO school.teachers(teacherId,firstName, lastName, birthday, gender, salary)
    VALUES(?,?,?,?,?,?)`,
    [teacherId,firstName,lastName,birthday,gender,salary], (err, result) => {
        if(err) console.log(err);
        else res.send('Teacher added successfully');
    });
});
app.post('/createSubject', (req, res) => {
    const subjectName = req.body.subjectName;

    db.query('INSERT INTO school.subjects(subjectName) VALUES(?)',
    [subjectName], (err, result) => {
        if(err) console.log(err);
        else res.send('Subject created successfully');
    });
});
app.post('/createBlockInTimetable', (req, res) => {
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const className = req.body.className;
    const subjectName = req.body.subjectName;
    const teacherId = req.body.teacherId;

    console.log('ok');
    console.log(req.body);
    
    db.query(`INSERT INTO school.timetable(startTime, endTime, className, subjectName, teacherId)
    VALUES(?,?,?,?,?)`,
    [startTime, endTime, className, subjectName, teacherId], (err, result) => {
        if(err) console.log(err);
        else res.send('Block in the timetable added successfully');
    });
    res.send();
});





//Blocks of code underneath this line correspond to Read operation of the cRud app
app.get('/readClasses', (req, res) => {
    db.query('SELECT * FROM school.classes', (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});
app.get('/readStudents', (req, res) => {
    console.log('This is just a test');
    db.query('SELECT * FROM students;', (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});
app.get('/readTeachers', (req, res) => {
    db.query('SELECT * FROM school.teachers', (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});
app.get('/readSubjects', (req, res) => {
    db.query('SELECT * FROM school.subjects', (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});
app.get('/readTimetable', (req, res) => {
    db.query('SELECT * FROM school.timetable', (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});




//Blocks of code underneath this line correspond to Update operation of the crUd app
app.patch('/updateClass', (req, res) => {
    const oldClassName = req.body.oldClassName;
    const newClassName = req.body.newClassName;

    db.query('UPDATE school.classes SET  className = ? WHERE className = ?',
    [newClassName, oldClassName], (err, result) => {
        if(err) console.log(err);
        else res.send('Class updated successfully');
    });
});
app.patch('/updateStudent', (req, res) => {
    const studentId = req.body.studentId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const className = req.body.className;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const average = req.body.average;

    db.query(`UPDATE school.students SET  firstName = ?, lastName = ?, className = ?, birthday = ?, 
    gender = ?, average = ? WHERE studentId = ?`,
    [firstName,lastName,className,birthday,gender,average,studentId], (err, result) => {
        if(err) console.log(err);
        else res.send('Student updated successfully');
    });
});
app.patch('/updateTeacher', (req, res) => {
    const teacherId = req.body.teacherId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const salary = req.body.salary;

    db.query(`UPDATE school.teachers SET  firstName = ?, lastName = ?, birthday = ?, 
    gender = ?, salary = ? WHERE teacherId = ?`,
    [firstName,lastName,birthday,gender,salary,teacherId], (err, result) => {
        if(err) console.log(err);
        else res.send('Teacher updated successfully');
    });
});
app.patch('/updateSubject', (req, res) => {
    const oldSubjectName = req.body.oldSubjectName;
    const newSubjectName = req.body.newSubjectName;

    db.query('UPDATE school.subjects SET  className = ? WHERE className = ?',
    [newSubjectName, oldSubjectName], (err, result) => {
        if(err) console.log(err);
        else res.send('Subject updated successfully');
    });
});
app.patch('/updateBlockInTimetable', (req, res) => {
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const className = req.body.className;
    const subjectName = req.body.subjectName;
    const teacherId = req.body.teacherId;

    db.query(`UPDATE school.timetable SET  subjectName = ? , teacherId = ? WHERE startTime = ? 
    AND endTime = ? AND className = ?`,
    [subjectName,teacherId,startTime,endTime,className], (err, result) => {
        if(err) console.log(err);
        else res.send('Block in the timetable updated successfully');
    });
});





//Blocks of code underneath this line correspond to Delete operation of the cruD app
app.delete('/deleteClass', (req, res) => {
    const className = req.body.className;

    db.query('DELETE FROM school.classes WHERE className = ?',className, (err, result) => {
        if(err) console.log(err);
        else res.send('Class deleted succesfully');
    });
});
app.delete('/deleteStudent', (req, res) => {
    const studentId = req.body.studentId;

    db.query('DELETE FROM school.students WHERE studentId = ?',studentId, (err, result) => {
        if(err) console.log(err);
        else res.send('Student removed succesfully');
    });
});
app.delete('/deleteTeacher', (req, res) => {
    const teacherId = req.body.teacherId;

    db.query('DELETE FROM school.teachers WHERE teacherId = ?',teacherId, (err, result) => {
        if(err) console.log(err);
        else res.send('Teacher removed succesfully');
    });
});
app.delete('/deleteSubject', (req, res) => {
    db.query('SELECT * FROM school.subjects', (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});
app.delete('/deleteBlockInTimetable', (req, res) => {
    const startTime =  req.body.startTime;
    const endTime =  req.body.endTime;
    const className =  req.body.className;

    db.query('DELETE FROM school.timetable WHERE startTime = ? AND endTime = ? AND className = ?'
    [startTime, endTime, className], (err, result) => {
        if(err) console.log(err);
        else res.send('Block in timetable deleted succesfully');
    });
});



const port = 3000 || process.env.PORT ;
app.listen(port, () => console.log(`Server started on port ${port}`));