import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../../hooks";
import { IProject, IProjectProvider } from "../../context/ProjectProvider";
import { ProjectPreview } from "../../components";
import { HashLoader } from "react-spinners";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Projects = () => {
  const { projects, loading, getProjectsByUser }:IProjectProvider = useProjects();


  useEffect(() => {
    getProjectsByUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <main className="w-full flex flex-col items-center justify-center gap-1">
      {/* add & search project section */}
      <div className="w-[99%] flex items-center justify-between p-2 rounded-lg">
        <div className="w-[50%] pl-5 ">
        <h1 className="text-xl font-bold text-[#5E1914]">Projects</h1>
        </div>
       <div className="w-[50%] flex items-center justify-end pr-5">
       <Link
          to="new-project"
          className="w-[150px] flex items-center justify-center py-2 gap-2 rounded-lg border-[1px] border-[#E1BDB5]/90 text-[#5E1914] hover:bg-[#E1BDB5]/90 hover:text-white transition-colors text-center font-md"
        >
          <AiOutlinePlusCircle className="text-lg" />
          Create new
        </Link>
       </div>
      </div>
      {/* show projects section */}
      <div className="w-[99%] h-auto flex items-start justify-center py-2 pt-5 rounded-lg">
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <HashLoader color="#39c7ad" />
          </div>
        ) : (
          <div className="w-[95%] md:w-[99%] flex flex-wrap items-center justify-around lg:justify-evenly">
            {projects && (
              projects.map((project: IProject) => (
                <ProjectPreview key={project._id} {...project} />
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Projects;

