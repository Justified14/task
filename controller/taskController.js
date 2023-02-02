const Tasks = require('../models/tasks');
const asyncWrapper = require('../middleware/async')

//get all tasks
const getAllTasks =asyncWrapper( async (req, res) => {
        const tasks = await Tasks.find();
        res.status(200).json({ numOftasks: tasks.length, tasks})
});


//get a single task 
const getTask = asyncWrapper(async (req, res) => {
    const {taskId} = req.params
        const task = await Tasks.findOne({_id: taskId})
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({ task })

});


//create a new task
const createTask = asyncWrapper( async (req, res) => {
        const {title, priority} = req.body
        if(!title || !priority){
            return res.status(400).json({message: 'Please provide necessary information'})
        }
        const task = await Tasks.create(req.body)
        res.status(201).json({msg: 'task created successfully', task})
});


//update a single task
const updateTask = asyncWrapper( async (req, res) => {
    const {title, priority} = req.body
    const {taskId} = req.params
        const task = await Tasks.findOneAndUpdate({_id: taskId}, req.body, {new:true, runValidators: true,})
        res.status(200).json({msg: 'Task Updated Succesfully', task })
});


//delete a single task
const deleteTask = asyncWrapper(async (req, res) => {
    const {taskId} = req.params
        const task = await Tasks.findOneAndDelete({_id: taskId})
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({msg: 'Task Deleted Succesfully', task })
});


module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask}