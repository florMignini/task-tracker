export interface project extends Document{
    name: String,
    description: String,
    deadline: String | null,
    creator: String,
    collaborator: Boolean,
}