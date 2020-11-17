const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const auth_routes = require('./routes/auth');
const user_routes = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 9091;

dotenv.config();

//Initialize database connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Database connection established!')
);

//express body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Routes Middlewares
app.use('/api/v1/auth/', auth_routes);
app.use('/api/v1/user/', user_routes);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
