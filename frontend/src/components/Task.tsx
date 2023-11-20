import { DragEvent } from "react";
import { format, parseISO } from "date-fns";
import { BsCalendar2Date } from "react-icons/bs";
import { ITask } from "../../interfaces";
import { useProjects } from "../hooks";
import { IProjectProvider } from "../context/ProjectProvider";

export const Task = ({ _id, name, description, deadline, priority }: ITask) => {
  const { startDragging, endDragging }: IProjectProvider = useProjects();

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer?.setData("item", _id);
    startDragging();
  };
  const handleDragEnd = () => {
    endDragging();
  };
  return (
    <div
      className="w-[99%] lg:w-[70%] h-[200px] flex flex-col items-end justify-between rounded-lg shadow-md mt-2 text-gray-500 p-2"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="w-[100%] h-[100px] flex flex-col gap-2">
        <h3 className="text-sm lg:text-lg font-bold">{name}</h3>
        <p className="text-sm font-thin">{description}</p>
      </div>
      <div className="w-[100%] flex items-center justify-between pt-2">
        {/* priority */}
        <div className="w-[30%] rounded-md border text-center border-yellow-400 bg-yellow-300 text-yellow-500">
          <p>{priority}</p>
        </div>
        {/* deadline */}
        <div className="w-[50%] flex items-center justify-evenly text-end lg:gap-2">
          <BsCalendar2Date />
          <p className="text-xs text-gray-400">
            {format(parseISO(deadline.split("T")[0]), "MM/dd/yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};
