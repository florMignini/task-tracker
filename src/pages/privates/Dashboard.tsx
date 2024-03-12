// import { useAuth } from "../../hooks"

import { useEffect } from "react";
import { useProjects } from "../../hooks";
import { IProject, IProjectProvider } from "../../context/ProjectProvider";
import { HashLoader } from "react-spinners";
import { format, parseISO } from "date-fns";
import { BsCalendarWeek } from "react-icons/bs";

const Dashboard = () => {
  const {
    resetSingleProjectState,
    projects,
    loading,
    getProjectsByUser,
  }: IProjectProvider = useProjects();

  // const {auth} = useAuth()
  useEffect(() => {
    getProjectsByUser();
    resetSingleProjectState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log(projects)
  return (
    <main className="w-full flex flex-col items-center justify-center gap-1">
      {/* project section */}
      <div className="w-[99%] flex items-center justify-between p-2 rounded-lg">
        <div className="w-[50%] pl-5 ">
          <h1 className="text-xl font-bold text-[#5E1914]">Projects</h1>
        </div>
      </div>
      {/* show projects preview section */}
      <div className="w-[99%] h-auto flex items-start justify-center py-2 pt-5 rounded-lg">
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <HashLoader color="#5E1914" />
          </div>
        ) : (
          <div className="w-[95%] md:w-[99%] flex flex-wrap items-center justify-start gap-2 ">
            {projects &&
              projects.map((project: IProject) => (
                <div
                  key={project?._id}
                  className="w-[35%] xl:w-1/4 h-[150px] px-2 flex flex-col rounded-lg shadow-2xl hover:scale-[1.01] transition-transform text-gray-800 border-[1px]"
                >
                 <div className="w-[75%] h-[75%] flex items-center justify-center flex-col">
                 <h1 className="w-[75%] flex items-center justify-start text-2xl font-semibold py-2 capitalize">
                    {project?.name}
                  </h1>
                  <div className="w-[80%] flex items-center justify-start gap-2 py-2">
                    <BsCalendarWeek />
                    <p className="text-xs">
                      {format(parseISO(project.deadline!), "ho, eeee")}
                    </p>
                  </div>
                 </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
