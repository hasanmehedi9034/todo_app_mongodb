const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routHandler/todoHandler');
const userHandler = require('./routHandler/userHandler');
const dotenv = require('dotenv');


// express app initialization
const app = express();

// env file access
dotenv.config();

// json parser
app.use(express.json());

// /todo route
app.use('/todo', todoHandler);

// user route
app.use('/user', userHandler);

// database connection with mongoose
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/todos')
    .then(() => console.log('Connection successful'))
    .catch(err => console.log(err))


// express error handling router
function errorHandler(err, req, res, next) {
    if (res.headerSent) {
        return next(err);
    }
    res.status(500).json({error: err});
}


// create server and run server
app.listen(3000, () => {
    console.log('app listening at port 3000');
});











