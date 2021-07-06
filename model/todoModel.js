const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todoString: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: false
    }
})
const Todos = mongoose.model('Todos', todoSchema);
module.exports = Todos;