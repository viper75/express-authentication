const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const auth_routes = require('./routes/auth');

const app = express();

const PORT = process.env.PORT || 9091;

dotenv.config();

//Initialize database connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Database connection established!')
);

//Use express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth/', auth_routes);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
