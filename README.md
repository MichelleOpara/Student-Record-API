# Student Record API

A RESTful Student Management API built with Node.js and Express.js. The API allows users to create, retrieve, update, and delete student records using standard HTTP methods.

## Features

- Create a new student record
- Retrieve all students
- Retrieve a student by ID
- Update student information
- Delete a student record
- Input validation using middleware
- Environment variable configuration with dotenv

## Technologies Used

- Node.js
- Express.js
- Dotenv
- Nodemon
- Git & GitHub
- Postman

## Project Structure

```
Student-Record-API/
│
├── middleware/
│   └── validateStudent.js
│
├── app.js
├── package.json
├── package-lock.json
├── README.md
├── .env
└── .gitignore
```

## Installation

Clone the repository

```bash
git clone https://github.com/MichelleOpara/Student-Record-API.git
```

Navigate into the project folder

```bash
cd Student-Record-API
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
```

Start the server

```bash
npm start
```

For development mode

```bash
npm run dev
```

The server runs at

```
http://localhost:5000
```

## API Endpoints

### Health Check

| Method | Endpoint |
|--------|----------|
| GET | / |

Response

```json
{
  "success": true,
  "message": "Students API is running"
}
```

### Create Student

| Method | Endpoint |
|--------|----------|
| POST | /students |

Example Request

```json
{
  "firstName": "Eugene",
  "lastName": "Williams",
  "email": "eugene@example.com",
  "course": "Computer Science",
  "yearOfStudy": 3
}
```

### Get All Students

| Method | Endpoint |
|--------|----------|
| GET | /students |

### Get Student by ID

| Method | Endpoint |
|--------|----------|
| GET | /students/:id |

Example

```
GET /students/1
```

### Update Student

| Method | Endpoint |
|--------|----------|
| PUT | /students/:id |

Example

```json
{
  "course": "Software Engineering",
  "yearOfStudy": 4
}
```

### Delete Student

| Method | Endpoint |
|--------|----------|
| DELETE | /students/:id |

Example

```
DELETE /students/1
```

## Testing

All endpoints were tested successfully using Postman.

The following operations were verified:

- Create Student
- Get All Students
- Get Student by ID
- Update Student
- Delete Student

## Future Improvements

- MongoDB database integration
- User authentication
- Search functionality
- Pagination
- Input validation enhancements

## Author

Student Record API

Backend Development Project

Developed using Node.js, Express.js and Postman.