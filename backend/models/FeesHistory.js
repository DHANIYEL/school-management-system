const mongoose = require('mongoose');

const feesHistorySchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Paid', 'Pending'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FeesHistory', feesHistorySchema);
