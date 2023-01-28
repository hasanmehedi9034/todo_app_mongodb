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


// instance method
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


// instance method
todoSchema.statics = {
    findByJs: function() {
        return this.find({ title: /js/i })
    }
}


// quary helpers
todoSchema.query = {
    byLanguage: function(language) {
        return this.find({ title: new RegExp(language, 'i') })
        .select({
            _id: 0,
            __v: 0,
            date: 0,
            description: 0,
            status: 0
        });
    }
}

module.exports = todoSchema;


