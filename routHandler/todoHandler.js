const express = require('express');
const todoSchema = require('../schemas/todoSchema');
const mongoose = require('mongoose');

const router = express.Router();


// / Todo Model
const Todo = new mongoose.model('Todo', todoSchema);

// GET All the todos
router.get('/', async (req, res) => {
    try {
        const data = await Todo.find( {} )
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
        res.status(200).json({
            result: data,
            error: 'server side error'
        })
    }

    // /Todo.find({}, (err, data) => {
    //     if (err) {
    //         res.status(500).json({
    //             error: 'There was a server side error!'
    //         })
    //     }
    //     else {
    //         res.status(200).json({
    //             result: data,
    //             message: 'Todos Get success'
    //         })
    //     }
    // })
    // .select({
    //     _id: 0,
    //     __v: 0,
    //     date: 0
    // })
    // .limit(2)
    // .clone()
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
        res.status(200).json({
            result: data,
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
            error: 'There was a server side error!'
        })
    }


    // const newTodo = new Todo(req.body);
    // await newTodo.save((err) => {
    //     if (err) {
    //         res.status(500).json({
    //             error: 'There was a server side error!'
    //         })
    //     }
    //     else {
    //         res.status(200).json({
    //             message: 'Todo was inserted successfully'
    //         })
    //     }
    // })
})


// POST Multiple todo
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error!'
            })
        }
        else {
            res.status(200).json({
                message: 'Todos were successfully updated'
            })
        }
    })
});


// PUT todo
router.put('/:id', async (req, res) => {
    const result = await Todo.findByIdAndUpdate(
    {
        _id: req.params.id
    }, 
    {
        $set: {
            title: 'Peace Todo'
        }
    }, 
    {
        useFindAndModify: false,
        new: true
    },
    (err) => {
        if(err) {
            console.log(err)
            res.status(500).json({
                error: 'There was a server side error!'
            })
        }
        else {
            res.status(200).json({
                message: 'Todo was updated successfully updated'
            })
        }
    }).clone();

    console.log(result);
})


// Delete todo
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({_id: req.params.id}, (err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error!'
            })
        }
        else {
            res.status(200).json({
                message: 'Todo was deleted successfully'
            })
        }
    })
    .select({
        _id: 0,
        __v: 0,
        date: 0
    })
    .clone()
})


module.exports = router;
