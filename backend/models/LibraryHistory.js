const mongoose = require('mongoose');

const libraryHistorySchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  bookName: { type: String, required: true },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date }, // Optional for books not yet returned
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LibraryHistory', libraryHistorySchema);
