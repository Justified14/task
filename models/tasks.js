//task title, task priority, completed task.

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
       type: "String",
       unique: true,
       required: true,
    },
    priority: {
        type: "String",
        required: true,
     },
     completed: {
        type: Boolean,
        default: false,
     },
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema);