const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Import Routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const libraryRoutes = require('./routes/library');
const feesRoutes = require('./routes/fees');

// Use Routes
app.use('/api/', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/fees', feesRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
