import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineProject } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { useAdmin, useAuth, useProjects } from "../hooks";
import { IProjectProvider } from "../context/ProjectProvider";
import { ICollaborator } from "../../interfaces";
import { SignOutIcon } from "../icons";
import { useAuthType } from "../hooks/useAuth";

export const Sidebar = () => {
  //sidebar state
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { project, deleteCollaborator, logOut }: IProjectProvider =
    useProjects();

  //user profile
  const { auth }: useAuthType = useAuth();

  const { logOutSession }: useAuthType = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = useAdmin();

  const handleDelete = async (collaborator: ICollaborator) => {
    if (confirm(`Are you sure to delete collaborator?`)) {
      deleteCollaborator(collaborator);
    }
  };

  const handleLogOutSession = () => {
    logOutSession();
    logOut();
    localStorage.removeItem("token");
  };
  return (
    <>
      <nav className="bg-[#5E1914] text-gray-500/80">
        {/* mobile sizes */}
        <aside className="MOBILE-MENU bg-white w-full flex md:hidden">
          <div
            className="HAMBURGER-ICON bg-inherit space-y-2 mt-5 ml-5 cursor-pointer transition-all duration-1000"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <ul className="NAVIGATION-MOBILE-OPEN flex flex-col text-2xl md:text-3xl items-center justify-around min-h-[350px]">
              <Link
                to=""
                className="w-[90%] flex items-center justify-center p-2 mb-2 gap-2 
               text-gray-500/80 hover:underline max-w-10 group-hover:max-w-full transition-all duration-300 h-0.5
               "
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <LuLayoutDashboard className="h-10 w-10" />
                Dashboard
              </Link>
              <Link
                to="projects"
                className="w-[90%] flex items-center justify-center p-2 mb-2 gap-2  text-gray-500/80 hover:underline max-w-10 group-hover:max-w-full transition-all duration-300 h-0.5"
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <AiOutlineProject className="h-10 w-10" />
                Projects
              </Link>
            </ul>
          </div>
        </aside>
        {/* desktop sizes */}
        <aside className="hidden h-screen md:flex md:flex-col md:w-60 xl:w-80 pt-5 p-2 ">
          <div className="h-[30%] flex flex-col items-center justify-center ">
            <h2 className="text-3xl text-[#ED1703] lg:text-4xl font-medium px-2">
              Task Tracker
            </h2>
            {/* links section */}
            <div className="w-full text-[#FF908B] h-[150px] mt-10 py-2 gap-2 flex items-center justify-start flex-col">
              <Link
                to=""
                className="w-[90%] flex items-center justify-center p-2 mb-2 gap-2 rounded-md 
            hover:bg-[#572522]"
              >
                <LuLayoutDashboard />
                Dashboard
              </Link>
              <Link
                to="projects"
                className="w-[90%] flex items-center justify-center p-2 mb-2 gap-2 rounded-md hover:bg-[#572522]"
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
          <button
            className="w-[90%] h-[10%] text-[#FF908B] flex items-center justify-center gap-2"
            onClick={handleLogOutSession}
          >
            <SignOutIcon />
            <p>Sign out</p>
          </button>
          {/* user avatar section */}
          <div className="w-[90%] flex items-center justify-center gap-2 p-1 ">
            <img src={auth?.profilePicture} alt="profileAvatar" 
            className="rounded-full h-9 w-9"
            />
            <div>
              <p className="text-sm font-semibold">{auth?.name}</p>
              <p className="text-xs">{auth?.email}</p>
            </div>
          </div>
        </aside>
      </nav>
      <style>{`
     .hideMenuNav {
       display: none;
     }
     .showMenuNav {
       display: block;
       position: absolute;
       width: 100%;
       height: 100vh;
       top: 0;
       left: 0;
       background: white;
       z-index: 10;
       display: flex;
       flex-direction: column;
       justify-content: space-evenly;
       align-items: center;
     }
   `}</style>
    </>
  );
};
