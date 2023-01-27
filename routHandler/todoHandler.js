const express = require('express');
const todoSchema = require('../schemas/todoSchema');
const mongoose = require('mongoose');

const router = express.Router();


// / Todo Model
const Todo = new mongoose.model('Todo', todoSchema);

// GET All the todos
router.get('/', async (req, res) => {

})


// GET a todo by ID
router.get('/:id', async (req, res) => {

})

// POST a todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);

    await newTodo.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: 'There was a server side error!'
            })
        }
        else {
            res.status(200).json({
                message: 'Todo was inserted successfully'
            })
        }
    })
})


// POST Multiple todo
router.post('/all', async (req, res) => {
    
});


// PUT todo
router.put('/', async (req, res) => {

})


// Delete todo
router.delete('/:id', async (req, res) => {

})


module.exports = router;