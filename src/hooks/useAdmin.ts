import { useAuth } from ".";
import { useProjects } from ".";
import { IProjectProvider } from "../context/ProjectProvider";
import { useAuthType } from "./useAuth";

export const useAdmin = () => {
const {project}:IProjectProvider = useProjects()
const {auth}:useAuthType = useAuth()

return project?.creator === auth?._id
} 