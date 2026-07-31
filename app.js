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
let students = [];

let nextId = 1;

function findStudentsById(id) {
  return students.find((student) => student.id === id);
}
//Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Students API is running'
  });
});

//CREATE -POST /students
app.post('/students', (req, res) => {
  const { firstName, lastName, email, course, yearOfStudy } = req.body;

  if (!firstName || !lastName || !email || !course || !yearOfStudy) {
    return res.status(400).json({
      success: false,
      Message: 'Missing required fields!'
    });
  }
  const newStudent = {
    id: nextId++,
    firstName,
    lastName,
    email,
    course,
    yearOfStudy,
    createdAt: new Date().toISOString()
  };
  students.push(newStudent);
  res.status(201).json({
    success: true,
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

  const student = findStudentsById(id);

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

// UPDATE - PUT /students/:id
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student id — must be a number.',
    });
  }

  const student = findStudentsById(id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found.`,
    });
  }

  const { firstName, lastName, email, course, yearOfStudy } = req.body;

  if (firstName !== undefined) student.firstName = firstName;
  if (lastName !== undefined) student.lastName = lastName;
  if (email !== undefined) student.email = email;
  if (course !== undefined) student.course = course;
  if (yearOfStudy !== undefined) student.yearOfStudy = yearOfStudy;

  student.updatedAt = new Date().toISOString();

  return res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: student,
  });
});

// DELETE - DELETE /students/:id
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student id — must be a number.',
    });
  }

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found.`,
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  return res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent,
  });
});

//start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});