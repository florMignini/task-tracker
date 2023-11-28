import { useParams } from "react-router-dom";
import { ProjectForm } from "../../components";
import { useEffect } from "react";
import { useProjects } from "../../hooks";
import { BsTrash } from "react-icons/bs";
import { IProjectProvider } from "../../context/ProjectProvider";

export const EditProject = () => {
  const params = useParams();
  const { getSingleProject, deleteProject, project }:IProjectProvider = useProjects();
  useEffect(() => {
    getSingleProject(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleDelete = async () => {
    if (confirm(`Are you sure to delete this project?`)) {
      deleteProject(params.id);
    }
  };
  
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div
       className="w-full flex items-center justify-between px-4 h-10 text-violet-500"
      >
        <h3> {project?.name}</h3>
      <button
        onClick={handleDelete}
       className="flex items-center justify-end p-1 mb-2 gap-2 border border-violet-500 rounded-xl hover:bg-violet-200"
      >
        <p className="flex font-light text-sm w-auto"> Delete</p>

        <BsTrash className="flex" />
      </button>
      </div>
      <ProjectForm />
    </main>
  );
};
