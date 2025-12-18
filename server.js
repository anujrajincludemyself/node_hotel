const express = require('express');
const app = express();
require('dotenv').config();
const bcrypt = require('bcryptjs');


app.use(express.json());

// logger middleware
const logrequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} request to ${req.originalUrl}`);
  next();
};
app.use(logrequest);

// routes
const personRoutes = require('./routes/personRoute');
app.use('/person', personRoutes);

// test route
app.get('/', (req, res) => {
  res.send('Server running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
