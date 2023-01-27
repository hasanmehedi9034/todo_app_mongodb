const express = require('express');
const mongoose = require('mongoose');


// express app initialization
const app = express();
app.use(express.json());


// database connection with mongoose
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/todos')
    .then(() => console.log('Connection successful'))
    .catch(err => console.log(err))



// application route


function errorHandler(err, req, res, next) {
    if (res.headerSent) {
        return next(err);
    }
    res.status(500).json({error: err});
}


app.listen(3000, () => {
    console.log('app listening at port 3000');
});











