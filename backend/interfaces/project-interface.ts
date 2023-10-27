import { user } from "./user-interface";

export interface project extends Document{
    name: String,
    description: String,
    deadline: String | null,
    creator: user,
    collaborator: user[],
}