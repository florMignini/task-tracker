import { format, parseISO } from "date-fns";
import { BsCalendar2Date } from "react-icons/bs";
import { ITask } from "../../interfaces";

export const Task = ({name, description, deadline, status, priority}:ITask) => {
console.log(name, description, deadline, status, priority);
  return (
    <div className="w-[95%] lg:w-[70%] h-[200px] flex flex-col items-end justify-between rounded-lg shadow-md mt-2 text-gray-500 p-2">
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
            <p className="text-xs text-gray-400">{format(parseISO(deadline.split("T")[0]), "MM/dd/yyyy")}</p>
        </div>
      </div>
    </div>
  );
};
