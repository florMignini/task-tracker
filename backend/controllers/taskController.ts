import { Request, Response } from "express";

import { Task } from "../models/Task";
import { Project } from "../models/Project";

const addTask = async (req:any, res:Response) => {
const {project} = req.body;

const projectFound = await Project.findById(project)

if(!projectFound){
    const error = new Error(`Project not found`)
    return res.status(404).json({msg: error.message})
}
//if creator is not user
if(projectFound.creator.toString() !== req.user._id.toString()) {
    const error = new Error(`access denied`)
    return res.status(403).json({msg: error.message})
}

try {
    const newTask = await Task.create(req.body)
    res.status(201).json(newTask)
} catch (error) {
    console.log(error)
}
};

const getTask = async () => {};

const updateTask = async () => {};

const deleteTask = async () => {};

const updateTaskStatus = async () => {};

export { addTask, getTask, deleteTask, updateTask, updateTaskStatus };
