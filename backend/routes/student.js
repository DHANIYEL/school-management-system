const express = require('express');
const Student = require('../models/Student');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a Student (Office Staff Only)
router.post('/', auth(['Office Staff']), async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Students with Pagination and Search (Office Staff, Librarian)
router.get('/', auth(['Office Staff', 'Librarian']), async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {}; // Search by student name

    const students = await Student.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); // Sort by recent

    const total = await Student.countDocuments(query);

    res.json({ students, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Student by ID (Office Staff Only)
router.put('/:id', auth(['Office Staff']), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Student (Office Staff Only)
router.delete('/:id', auth(['Office Staff']), async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
