import { Request, Response } from "express";

const createProject = async (req: Request, res: Response) => {};

const getAllProjects = async (req: Request, res: Response) => {};
const getSingleProject = async (req: Request, res: Response) => {};

const editProject = async (req: Request, res: Response) => {};

const deleteProject = async (req: Request, res: Response) => {};

const addCollaborator = async (req: Request, res: Response) => {};

const deleteCollaborator = async (req: Request, res: Response) => {};

const getTasksByProject = async (req: Request, res: Response) => {};

export {
  createProject,
  getAllProjects,
  getSingleProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  getTasksByProject,
};
