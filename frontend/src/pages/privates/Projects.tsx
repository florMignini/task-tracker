import { Link } from "react-router-dom";
import { useProjects } from "../../hooks";
import { HashLoader } from "react-spinners";
import { ProjectPreview } from "../../components";
import { IProject } from "../../context/ProjectProvider";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

const Projects = () => {
  const { projects, loading } = useProjects();

  return (
    <main className="w-full flex flex-col items-center justify-center gap-1">
      {/* add & search project section */}
      <div className="w-[99%] bg-white flex items-center justify-between p-2 rounded-lg">
        {/* input search */}
        <div className="bg-slate-200/90 flex h-[50%] p-2 items-center justify-center gap-2 rounded-xl lg:w-80 text-gray-500">
          <CiSearch />
          <input
            type="search"
            placeholder="search projects..."
            className="outline-none bg-transparent text-sm font-thin"
          />
        </div>
        <Link
          to="new-project"
          className="w-[150px] flex items-center justify-center py-2 gap-2 rounded-lg bg-[#39c7ad] hover:bg-[#0bcfab] transition-colors text-white text-center font-md"
        >
          <AiOutlinePlusCircle className="text-lg" />
          Create new
        </Link>
      </div>
      {/* show projects section */}
      <div className="w-[99%] h-screen bg-white flex items-start justify-center py-2 pt-5 rounded-lg">
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <HashLoader color="#39c7ad" />
          </div>
        ) : (
          <div className="w-[95%] flex gap-2">
            {projects.length > 0 ? (
              projects.map((project: IProject) => (
                <ProjectPreview key={project._id} {...project} />
              ))
            ) : (
              <h1 className="text-start pt-10 capitalize text-gray-600 font-thin text-2xl">
                No projects yet? Let's create!
              </h1>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Projects;
