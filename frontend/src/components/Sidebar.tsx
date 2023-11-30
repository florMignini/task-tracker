import { Link } from "react-router-dom";
import { AiOutlineProject } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { useAdmin, useProjects } from "../hooks";
import { IProjectProvider } from "../context/ProjectProvider";
import { ICollaborator } from "../../interfaces";
import { SignOutIcon } from "../icons";

export const Sidebar = () => {
  const { project, deleteCollaborator }: IProjectProvider = useProjects();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const  admin  = useAdmin();

  const handleDelete = async (collaborator: ICollaborator) => {
    if (confirm(`Are you sure to delete collaborator?`)) {
      deleteCollaborator(collaborator);
    }
  };
  return (
    <aside className="md:w-56 lg:w-72 pt-5 p-2 bg-[#f3e8e2] text-gray-500/80">
      <div className="h-[30%] flex flex-col items-center justify-center ">
        <h2 className="text-3xl lg:text-4xl font-medium px-2">Task Tracker</h2>
        {/* links section */}
        <div className="w-full h-[150px] mt-10 py-2 gap-2 flex items-center justify-start flex-col text-white">
          <Link
            to=""
            className="w-[90%] flex items-center justify-center p-2 mb-2 gap-2 rounded-md 
            hover:border-[1px] hover:border-[#ecc8b4] text-gray-500/80"
          >
            <LuLayoutDashboard />
            Dashboard
          </Link>
          <Link
            to="projects"
            className="w-[90%] flex items-center justify-center p-2 mb-2 gap-2 rounded-md hover:border-[1px] hover:border-[#ecc8b4] text-gray-500/80"
          >
            <AiOutlineProject />
            Projects
          </Link>
        </div>
      </div>
      {/* project collaborators list only if admin*/}
      <div className="h-[50%] flex flex-col px-2">
      {admin && (
         <>
          <h6 className="text-gray-500/80 font-light ">
            {" "}
            Project Collaborators List
          </h6>
          <div className="mt-5">
            {project?.collaborator?.map((collaborator: ICollaborator) => (
              <div className="w-full lg:w-[95%] rounded-xl bg-[#F1F5F9] flex items-center justify-between px-2 py-1">
                <div className="flex items-center justify-center gap-1">
                  {/* avatar */}
                  <div className="w-8 h-8 rounded-full bg-[#3dcbb1]" />
                  <div className="flex flex-col items-start justify-center">
                    <p>{collaborator.name}</p>
                    <p className="hidden lg:flex font-thin text-sm">
                      {collaborator.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => handleDelete(collaborator)}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
         </>
      )}
      </div>
      {/* log out */}
      <button className="w-[95%] h-[10%] flex items-center justify-center  gap-1">
        <SignOutIcon />
        <p>Sign out</p>
      </button>
    </aside>
  );
};
