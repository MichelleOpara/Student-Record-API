require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Student Record API is running");
});
//In-memory "database"
let  students = [];

let nextId = 1;

function findStudentsById(id) {
  return students.find((s) => s.id === id);

};
//Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: trues,
    message:'Students API is running'
  });
} );

//CREATE -POST /students
app.post('/sutdents', (req,res) => {
  const{firstName, lastName, email, course, yearOfStudy } = req.body;

  if(!firstName || !lastName || !email || !course || !yearOfStudy) {
    return res.status(400).json({
      success:false,
      Message:'Missing required fields!'
    });
  }
  const newStudent ={
    id: nextId++,
    firstName,
    lastName,
    email,
    course,
    yearOfStudy,
    createdAt:new Date().toISOString()
  };
  students.push(newStudents);
  res.status(201).json({
    success:true,
    message: 'Student created successfully',
    data: newStudent
  });

});

//READ- GET /students
app.get('/students', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});


//READ - GET/students/:id
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
 
  // Guard against non-numeric IDs (e.g. /students/abc) —
  // without this, findStudentById just silently returns undefined
  // and you'd get a misleading 404 instead of a clear "bad input" error.
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student id — must be a number.',
    });
  }
 
  const student = findStudentById(id);
 
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found.`,
    });
  }
 
  res.status(200).json({
    success: true,
    data: student,
  });
});

//start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});