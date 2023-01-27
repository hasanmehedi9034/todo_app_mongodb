const { Schema } = require('mongoose');

const todoSchema = Schema({
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = todoSchema;


