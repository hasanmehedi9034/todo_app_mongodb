const mongoose = require('mongoose');



const todoSchema = new mongoose.Schema({
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


todoSchema.methods = {
    findActive: function() {
        return mongoose.model('Todo').find( {status: 'active'} )
        .select({
            _id: 0,
            __v: 0,
            date: 0
        })
    }
}

todoSchema.statics = {
    findByJs: function() {
        return this.find({ title: /js/i })
    }
}

module.exports = todoSchema;


