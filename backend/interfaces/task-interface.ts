
import { project } from "./project-interface";

export interface task extends Document{
    name: String,
    description: String,
    deadline: Date | null,
    status: TaskStatus,
    priority: String,
    project: project
}

export type TaskStatus = 'pending' | 'In-Progress' | 'Completed'