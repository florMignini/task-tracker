/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// import { useAuth } from "../../hooks"

import { useEffect } from "react";
import { useProjects } from "../../hooks";
import { IProject, IProjectProvider } from "../../context/ProjectProvider";
import { HashLoader } from "react-spinners";
import { differenceInBusinessDays } from "date-fns";
import { DeleteIcon, PencilSquare } from "../../icons";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    resetSingleProjectState,
    projects,
    loading,
    getProjectsByUser,
    deleteProject,
  }: IProjectProvider = useProjects();

  // const {auth} = useAuth()
  useEffect(() => {
    getProjectsByUser();
    resetSingleProjectState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // today date
  const date = new Date();

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
                  className="w-[50%] xl:w-1/4 h-[160px] bg-[#5E1914]/60 px-2 flex flex-col rounded-lg items-center shadow-2xl hover:scale-[1.01] transition-transform text-[#5E1914] border-[1px]"
                >
                  <div className="w-[90%] h-[90%] flex items-center justify-start flex-col">
                    <h1 className="w-[90%] flex items-center justify-start text-2xl font-semibold py-2 capitalize">
                      {project?.name}
                    </h1>
                    <div className="w-[90%] flex flex-col items-center justify-start gap-2 py-2">
                      {/* project content */}
                      <div className="w-[100%] h-8 text-left font-thin text-wrap truncate pb-5">
                        <p>{project?.description}</p>
                      </div>
                      <div className="w-[100%] flex items-center justify-between">
                        {/* project remaining days and tasks */}
                        <div className="w-[70%] flex flex-col gap-2">
                          <div className="w-fit p-1 h-[20px] rounded-md bg-emerald-600 flex items-center justify-center font-semibold text-zinc-700 truncate text-xs gap-1">
                            <p className="flex">
                              {differenceInBusinessDays(
                                new Date(
                                  Number(
                                    project
                                      ?.deadline!.split("T")[0]
                                      .split("-")[0]
                                  ),
                                  Number(
                                    project
                                      ?.deadline!.split("T")[0]
                                      .split("-")[1]
                                  ),
                                  Number(
                                    project
                                      ?.deadline!.split("T")[0]
                                      .split("-")[2]
                                  )
                                ),
                                new Date(
                                  Number(
                                    date.toJSON().split("T")[0].split("-")[0]
                                  ),
                                  Number(
                                    date.toJSON().split("T")[0].split("-")[1]
                                  ),
                                  Number(
                                    date.toJSON().split("T")[0].split("-")[2]
                                  )
                                )
                              )}
                            </p>
                            <p>days to complete</p>
                          </div>
                          <div className="w-fit p-1 h-[20px] rounded-md bg-[#E1BDB5]/40 flex items-center justify-center font-semibold text-[#5E1914] text-xs gap-1">
                            {project && project?.tasks && (
                              <p>
                                {project?.tasks?.length < 2
                                  ? `${project?.tasks?.length} task`
                                  : `${project?.tasks?.length} tasks`}{" "}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* delete and edit section */}
                        <div className="w-[30%] flex items-end justify-end">
                          <button
                            onClick={async () => {
                              if (
                                confirm(`Are you sure to delete this project?`)
                              ) {
                                deleteProject(project._id);
                              }
                            }}
                          >
                            <DeleteIcon />
                          </button>
                          <Link to={`/dashboard/projects/edit/${project?._id}`}>
                            <PencilSquare />
                          </Link>
                        </div>
                      </div>
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
