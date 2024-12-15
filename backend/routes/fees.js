const express = require('express');
const FeesHistory = require('../models/FeesHistory');
const auth = require('../middleware/auth');
const router = express.Router();

// Add a Fees Record (Office Staff Only)
router.post('/', auth(['Office Staff']), async (req, res) => {
  try {
    const { studentId, amount, date, status } = req.body;
    const record = new FeesHistory({ studentId, amount, date, status });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Fees Records with Filters (Office Staff Only)
router.get('/', auth(['Office Staff']), async (req, res) => {
  try {
    const { status, studentId } = req.query;

    const query = {};
    if (status) query.status = status;
    if (studentId) query.studentId = studentId;

    const fees = await FeesHistory.find(query)
      .populate('studentId', 'name class')
      .sort({ date: -1 }); // Latest first

    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Summary of Fees (Office Staff Only)
router.get('/summary', auth(['Office Staff']), async (req, res) => {
  try {
    const summary = await FeesHistory.aggregate([
      { $group: { _id: '$status', totalAmount: { $sum: '$amount' } } },
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
