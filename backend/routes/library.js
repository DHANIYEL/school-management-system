const express = require('express');
const LibraryHistory = require('../models/LibraryHistory');
const auth = require('../middleware/auth');
const router = express.Router();

// Borrow a Book (Librarian Only)
router.post('/borrow', auth(['Librarian']), async (req, res) => {
  try {
    const { studentId, bookName, borrowDate } = req.body;

    // Check if the student already has the book borrowed
    const activeBorrow = await LibraryHistory.findOne({
      studentId,
      bookName,
      returnDate: null,
    });

    if (activeBorrow) {
      return res.status(400).json({ message: 'Book is already borrowed by this student.' });
    }

    const record = new LibraryHistory({ studentId, bookName, borrowDate });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Return a Book (Librarian Only)
router.post('/return/:id', auth(['Librarian']), async (req, res) => {
  try {
    const { returnDate } = req.body;

    const record = await LibraryHistory.findByIdAndUpdate(
      req.params.id,
      { returnDate },
      { new: true }
    );

    if (!record) return res.status(404).json({ message: 'Borrowing record not found.' });

    res.json({ message: 'Book returned successfully!', record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View Borrowing History (Librarian, Office Staff)
router.get('/', auth(['Librarian', 'Office Staff']), async (req, res) => {
  try {
    const records = await LibraryHistory.find()
      .populate('studentId', 'name')
      .sort({ borrowDate: -1 }); // Sort by latest borrow

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
