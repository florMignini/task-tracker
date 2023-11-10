import { Link } from "react-router-dom";
import { useProjects } from "../../hooks";
import { HashLoader } from "react-spinners";

const Projects = () => {
  const { projects, loading } = useProjects();
  console.log(projects);
  return (
    <main className="w-full flex flex-col items-center justify-center gap-1">
      {/* add project link section */}
      <div className="w-[99%] bg-white flex items-center justify-end p-2 rounded-lg">
        <Link
          to="new-project"
          className="w-[150px] flex items-center justify-center py-2 gap-2 rounded-lg bg-[#3dcbb1] hover:bg-blue-400 text-white text-center font-md"
        >
          Add Project
        </Link>
      </div>
      {/* show projects section */}
      <div className="w-[99%] h-screen bg-white flex items-start justify-center p-2 rounded-lg">
        {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
        <HashLoader color="#1ea7fd" />
      </div>
        ): (
          <>
          {projects.length > 0 ? <h1>Si, hay proyectos</h1> : <h1 className="text-start pt-10 capitalize text-gray-600 font-thin text-2xl">No projects yet? Let's create!</h1>}
          </>
          )
        }
      </div>
    </main>
  );
};

export default Projects;
