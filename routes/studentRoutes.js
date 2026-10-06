const express = require('express');
const router = express.Router();
let students = require('../data/students');
router.get('/', (req, res) => {
  res.status(200).json(students);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  res.status(200).json(student);
});

router.post('/', (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({ message: "Invalid Input: Name and course are required" });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name: name,
    course: course
  };

  students.push(newStudent);
  res.status(201).json({ message: "New Student Created", student: newStudent });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, course } = req.body;

  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  if (!name || !course) {
    return res.status(400).json({ message: "Invalid Input: Name and course are required" });
  }

  students[studentIndex] = {
    id: id,
    name: name,
    course: course
  };

  res.status(200).json({ message: "Student Updated Successfully", student: students[studentIndex] });
});


router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  const deletedStudent = students.splice(studentIndex, 1);
  res.status(200).json({ message: "Student Removed Successfully", student: deletedStudent[0] });
});

module.exports = router;