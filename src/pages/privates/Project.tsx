import { useParams } from "react-router-dom";
import { useProjects } from "../../hooks";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { LuFilePlus2 } from "react-icons/lu";
import {
  DeleteModal,
  ModalSearchCollaborators,
  ModalTaskForm,
  TaskList,
  Toaster,
} from "../../components";
import { IProjectProvider } from "../../context/ProjectProvider";
import { UserPlus } from "../../icons";
import { useAdmin } from "../../hooks";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

//socket variable 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
export const Project = () => {
  // get single project ID from params;
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin  = useAdmin();
  const {
    getSingleProject,
    project,
    loading,
    handleModalTask,
    handleCollaboratorsModal,
    alert,
    submitTaskProject,
    deleteTaskProject,
    updateTaskProject,
    updateStatusTaskProject,
  }: IProjectProvider = useProjects();

  useEffect(() => {
    getSingleProject(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //open connection
    socket = io(import.meta.env.VITE_SERVER_URL)
    socket.emit("from project", id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    socket.on("task added", (newTask) =>{
      if(newTask.project === project?._id){
        submitTaskProject(newTask)
      }
    
    })

    socket.on("task deleted", (taskDeleted)=>{
      if(taskDeleted.project === project?._id){
        deleteTaskProject(taskDeleted)
      }
    })

    socket.on("task updated", (taskUpdated)=>{
    if(taskUpdated.project._id === project?._id){
    updateTaskProject(taskUpdated)
    }
    })

    socket.on("state updated", (stateUpdated)=>{
    if(stateUpdated.project._id === project?._id){
      updateStatusTaskProject(stateUpdated);
    }
    })
  })
  

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <HashLoader color="#39c7ad" />
      </div>
    );
  }
  return alert?.msg ? (
    <Toaster {...alert} />
  ) : (
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex items-start justify-between px-4 py-2 h-auto text-slate-500">
        <div className="flex flex-col h-auto items-center justify-center gap-1">
          <h3 className="font-bold text-xl"> {project?.name}</h3>
          {admin && (
            <button
              onClick={handleCollaboratorsModal}
              className="flex items-center justify-end p-1 mb-2 gap-2 border border-slate-500 rounded-xl hover:bg-slate-200"
            >
              <p className="flex font-light text-xs w-auto">
                {" "}
                invite collaborator
              </p>

              <UserPlus />
            </button>
          )}
        </div>
        {admin && (
          <button
            onClick={handleModalTask}
            className="flex items-center justify-end p-1 mb-2 gap-2 border border-slate-500 rounded-xl hover:bg-slate-200"
          >
            <p className="flex font-light text-xs w-auto"> New task</p>

            <LuFilePlus2 className="flex" />
          </button>
        )}
      </div>
      {/* card section */}
      <div className="w-full overflow-x-auto h-screen bg-white grid grid-cols-3 gap-2 text-slate-500">
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
      <DeleteModal />
      <ModalSearchCollaborators />
    </main>
  );
};
