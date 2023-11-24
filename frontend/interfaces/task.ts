import {IProject} from "../src/context/ProjectProvider"
export interface ITask {
    id?: string;
_id: string;
name:string;
description: string;
deadline: string;
status: TaskStatus;
priority: TaskPriority;
project: IProject;
}

export type TaskStatus = 'To do' | 'In-Progress' | 'Done';

export type TaskPriority = "Low"| "High"| "Medium"