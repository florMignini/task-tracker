import {IProject} from "../src/context/ProjectProvider"
export interface ITask {
_id: string;
description: string;
deadline: string;
status: TaskStatus;
priority: TaskPriority;
project: IProject;
}

export type TaskStatus = 'pending' | 'in-progress' | 'complete';

export type TaskPriority = "Low"| "High"| "Medium"