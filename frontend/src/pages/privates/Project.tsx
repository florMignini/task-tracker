import { useParams } from "react-router-dom";
import { useProjects } from "../../hooks";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { LuFilePlus2 } from "react-icons/lu";
import { ModalTaskForm } from "../../components";

export const Project = () => {

  const [modalTask, setModalTask] = useState(false);
  // get single project ID from params;
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { getSingleProject, project, loading }:any = useProjects();

  useEffect(() => {
    getSingleProject(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <HashLoader color="#39c7ad" />
      </div>
    );
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div
       className="w-full flex items-center justify-between px-4 h-10 text-slate-500"
      >
        <h3 className="font-bold text-lg"> {project?.name}</h3>
        <button
        onClick={()=> setModalTask(true)}
       className="flex items-center justify-end p-1 mb-2 gap-2 border border-slate-500 rounded-xl hover:bg-slate-200"
      >
        <p className="flex font-light text-sm w-auto"> New task</p>

        <LuFilePlus2  className="flex" />
      </button>
      </div>
      {/* card section */}
      <div className="w-full h-screen bg-white grid grid-cols-3 gap-2 text-slate-500">
        {/* each card */}
        <div className="bg-slate-100 m-2 rounded-lg">
          <div className="flex items-center justify-center p-1 bg-white border rounded-lg">
            <p className="text-lg font-light"> Pending</p>
          </div>
        </div>
        {/* each card */}
        <div className="bg-slate-100 m-2 rounded-lg">
        <div className="flex items-center justify-center p-1 bg-white border rounded-lg">
            <p className="text-lg font-light"> In progress</p>
          </div>
        </div>
        {/* each card */}
        <div className="bg-slate-100 m-2 rounded-lg">
        <div className="flex items-center justify-center p-1 bg-white border rounded-lg">
            <p className="text-lg font-light"> Completed</p>
          </div>
        </div>
      </div>
      <ModalTaskForm
      modalTask={modalTask}
      setModalTask={setModalTask}
      />
    </main>
  )
};
