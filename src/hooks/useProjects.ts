import { useContext } from "react";
import { ProjectContext } from "../context";

export const useProjects = () => {
    return useContext(ProjectContext);
}