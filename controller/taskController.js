const Tasks = require('../models/tasks');

//get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.status(200).json({ numOftasks: tasks.length, tasks})
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred'});
    }
};


//get a single task 
const getTask = async (req, res) => {
    const {taskId} = req.params
    try {
        const task = await Tasks.findOne({_id: taskId})
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred'});
    }
};


//create a new task
const createTask = async (req, res) => {
    try {
        const {title, priority} = req.body
        if(!title || !priority){
            return res.status(400).json({message: 'Please provide necessary information'})
        }
        const task = await Tasks.create(req.body)
        res.status(201).json({msg: 'task created successfully', task})
        
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred'});
    }
};


//update a single task
const updateTask = async (req, res) => {
    const {title, priority} = req.body
    const {taskId} = req.params
    try {
        const task = await Tasks.findOneAndUpdate({_id: taskId}, req.body, {new:true, runValidators: true,})
        res.status(200).json({msg: 'Task Updated Succesfully', task })
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred'});
    }
};


//delete a single task
const deleteTask = async (req, res) => {
    const {taskId} = req.params
    try {
        const task = await Tasks.findOneAndDelete({_id: taskId})
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({msg: 'Task Deleted Succesfully', task })
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred'});
    }
};


module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask}