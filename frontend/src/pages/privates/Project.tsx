import { useParams } from "react-router-dom";
import { useProjects } from "../../hooks";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { LuFilePlus2 } from "react-icons/lu";
import { ModalTaskForm, TaskList } from "../../components";
import { IProjectProvider } from "../../context/ProjectProvider";

export const Project = () => {
  // get single project ID from params;
  const { id } = useParams();

  const {
    getSingleProject,
    project,
    loading,
    handleModalTask,
  }: IProjectProvider = useProjects();

  useEffect(() => {
    getSingleProject(id);
  }, [getSingleProject, id]);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <HashLoader color="#39c7ad" />
      </div>
    );
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-between px-4 h-10 text-slate-500">
        <h3 className="font-bold text-xl"> {project?.name}</h3>
        <button
          onClick={handleModalTask}
          className="flex items-center justify-end p-1 mb-2 gap-2 border border-slate-500 rounded-xl hover:bg-slate-200"
        >
          <p className="flex font-light text-sm w-auto"> New task</p>

          <LuFilePlus2 className="flex" />
        </button>
      </div>
      {/* card section */}
      <div className="w-full h-screen bg-white grid grid-cols-3 gap-2 text-slate-500">
        {/* each card */}
        <div className=" bg-slate-100 flex flex-col items-center m-2 rounded-lg">
          <div className="w-[99%] flex items-center justify-center m-1 p-1 bg-white border rounded-lg">
            <p className="text-lg font-light"> To do</p>
          </div>
          <TaskList status="To do" />
        </div>
        {/* each card */}
        <div className=" bg-slate-100 flex flex-col items-center m-2 rounded-lg">
          <div className="w-[90%] flex items-center justify-center m-1 p-1 bg-white border rounded-lg">
            <p className="text-lg font-light"> In Progress</p>
          </div>
          <TaskList status="In-Progress" />
        </div>
        {/* each card */}
        <div className=" bg-slate-100 flex flex-col items-center m-2 rounded-lg">
          <div className="w-[90%] flex items-center justify-center m-1 p-1 bg-white border rounded-lg">
            <p className="text-lg font-light"> Done</p>
          </div>
          <TaskList status="Done" />
        </div>
      </div>
      <ModalTaskForm />
    </main>
  );
};
