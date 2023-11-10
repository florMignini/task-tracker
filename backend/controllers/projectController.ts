import { Request, Response } from "express";
import Project from "../models/Project";
import { Task } from "../models/Task";

const createProject = async (req: any, res: Response) => {

  const newProject = new Project(req.body);
  newProject.creator = req.user._id;
  console.log(req.body.deadline);

  try {
    const newProjectSaved = await newProject.save();
    console.log(newProjectSaved)
    res.status(201).json(newProjectSaved);
  } catch (error) {
    console.log(error);
  }
};

const getAllProjects = async (req: any, res: Response) => {
  const projectsByUser = await Project.find().where("creator").equals(req.user);
  res.status(200).json(projectsByUser);
};

const getSingleProject = async (req: any, res: Response) => {
  const { id } = req.params;

  const singleProject = await Project.findById(id);
  if (!singleProject) {
    const error = new Error(`Project not found`);
    return res.status(404).json({ msg: error.message });
  }
  //only owner have access
  if (singleProject.creator.toString() !== req.user._id.toString()) {
    const error = new Error(`user unauthorized`);
    return res.status(401).json({ msg: error.message });
  }

  //get project tasks
  const tasks = await Task.find().where("project").equals(singleProject._id);

  res.status(200).json({ singleProject, tasks });
};

const editProject = async (req: any, res: Response) => {
  const { id } = req.params;

  const singleProject = await Project.findById(id);
  if (!singleProject) {
    const error = new Error(`Project not found`);
    return res.status(404).json({ msg: error.message });
  }
  //only owner can edit projects
  if (singleProject.creator.toString() !== req.user._id.toString()) {
    const error = new Error(`user unauthorized`);
    return res.status(401).json({ msg: error.message });
  }

  singleProject.name = req.body.name || singleProject.name;
  singleProject.description = req.body.description || singleProject.description;
  singleProject.deadline = req.body.deadline || singleProject.deadline;
  singleProject.client = req.body.client || singleProject.client;

  try {
    const updatedProject = await singleProject.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
  }
};

const deleteProject = async (req: any, res: Response) => {
  const { id } = req.params;

  const projectToDelete = await Project.findById(id);
  if (!projectToDelete) {
    const error = new Error(`Project not found`);
    return res.status(404).json({ msg: error.message });
  }
  //only owner can edit projects
  if (projectToDelete.creator.toString() !== req.user._id.toString()) {
    const error = new Error(`user unauthorized`);
    return res.status(401).json({ msg: error.message });
  }
  try {
    await projectToDelete.deleteOne();
    res.status(200).json({ msg: `Project deleted` });
  } catch (error) {
    console.log(error);
  }
};

const addCollaborator = async (req: Request, res: Response) => {};

const deleteCollaborator = async (req: Request, res: Response) => {};

export {
  createProject,
  getAllProjects,
  getSingleProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
};
  function ISODate(): any {
    throw new Error("Function not implemented.");
  }

