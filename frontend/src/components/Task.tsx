import { DragEvent /* , useEffect */ } from "react";
import { format, parseISO } from "date-fns";
import { BsCalendar2Date } from "react-icons/bs";
import { ITask } from "../../interfaces";
import { useProjects } from "../hooks";
import { IProjectProvider } from "../context/ProjectProvider";
import { PencilSquare } from "../icons/PencilSquare";
import { DeleteIcon } from "../icons";

export const Task = (task: ITask) => {
  const {
    startDragging,
    endDragging,
    handleEditTask,
    handleDeleteModalTask,
  }: IProjectProvider = useProjects();
  const { _id, name, description, deadline, priority } = task;
  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer?.setData("item", _id);
    startDragging();
  };
  const handleDragEnd = () => {
    endDragging();
  };

  return (
    <div
      className="w-[95%] lg:w-[80%] h-[200px] flex flex-col items-center justify-between rounded-lg shadow-md mt-2 text-gray-500 py-5 px-3"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="w-[100%] h-[100px] flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <h3 className="text-xs lg:text-lg font-bold">{name}</h3>
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => handleEditTask(task)}>
              <PencilSquare />
            </button>
            <button onClick={() => handleDeleteModalTask(task)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
        <p className="truncate text-sm font-thin px-1">{description}</p>
      </div>
      <div className="w-[100%] flex items-center justify-between pt-2">
        {/* priority */}
        <div className="w-[30%] rounded-md border text-center text-xs truncate border-yellow-400 bg-yellow-300 text-yellow-500">
          <p>{priority}</p>
        </div>
        {/* deadline */}
        <div className="w-[50%] gap-1 flex items-center justify-center text-end text-xs lg:gap-2">
          <BsCalendar2Date />
          <p className="text-gray-400">
            {format(parseISO(deadline.split("T")[0]), "MM/dd/yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};
