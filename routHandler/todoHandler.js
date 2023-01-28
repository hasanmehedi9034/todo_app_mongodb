const express = require('express');
const todoSchema = require('../schemas/todoSchema');
const mongoose = require('mongoose');

const router = express.Router();


// / Todo Model
const Todo = new mongoose.model('Todo', todoSchema);

// GET All the todos
router.get('/', async (req, res) => {
    try {
        const data = await Todo.find()
        .select({
            _id: 0,
            __v: 0,
            date: 0
        })
        .clone();

        res.status(200).json({
            result: data,
            message: 'Successfully data received'
        })
    }
    catch (err) {
        res.status(500).json({
            result: data,
            error: 'server side error'
        })
    }
})


router.get('/js', async (req, res) => {
    const data = await Todo.findByJs();
    res.status(200).json({
        data: data
    })
})

// show active status todos
router.get('/active-todos', async (req, res) => {
    try {
        const newTodos = new Todo();
        const allActiveTodos = await newTodos.findActive();

        res.status(200).json({
            data: allActiveTodos
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: 'There was a server side error!!',
        })
    }
})



// GET a todo by ID
router.get('/:id', async (req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id })
        .select({
            _id: 0,
            __v: 0,
            date: 0
        })
        .clone();

        res.status(200).json({
            result: data,
            message: 'Successfully data received'
        })
    }
    catch (err) {
        res.status(500).json({
            error: 'server side error'
        })
    }
})



// POST a todo
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body)
        await newTodo.save();

        res.status(200).json({
            message: 'Todo saved successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            error: 'There was a server side error!',
        })
    }
})


// POST Multiple todo
router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body);

        res.status(200).json({
            message: 'Todos were successfully uploaded!'
        })
    }
    catch (err) {
        res.status(500).json({
            error: 'There was a server side error!'
        })
    }
});


// PUT todo
router.put('/:id', async (req, res) => {
    try {
        const data = await Todo.findByIdAndUpdate(
            {
                _id: req.params.id
            }, 
            {
                $set: {
                    status: 'active'
                }
            }, 
            {
                useFindAndModify: false,
                new: true
            })

        res.status(200).json({
            message: 'Todo was updated successfully updated',
            updatedData: data
        })
    }
    catch (err) {
        res.status(500).json({
            error: 'There was a server side error!',
        })
    }
})


// Delete todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.deleteOne({_id: req.params.id })

        res.status(200).json({
            message: 'Todo was deleted successfully'
        })
    }
    catch {
        res.status(500).json({
            error: 'There was a server side error!'
        })
    }
})


module.exports = router;
