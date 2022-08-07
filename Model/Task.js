const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    priority: {
        type: Number,
        required: true,
        unique: true
    },
    taskName: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('task', taskSchema);