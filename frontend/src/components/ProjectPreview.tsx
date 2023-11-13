import { Link } from "react-router-dom";
import { IProject } from "../context/ProjectProvider";
import { FaRegComments } from "react-icons/fa";
import { BsCalendarWeek } from "react-icons/bs";
import { format, parseISO } from "date-fns";
export const ProjectPreview = (project: IProject) => {
  const { _id, name, description, client, deadline } = project;
  return (
    <Link
      to={`${_id}`}
      className="w-1/3 h-auto flex flex-col rounded-lg shadow-md hover:scale-[1.01] transition-transform text-gray-500"
    >
      {/* title */}
      <div className="w-full flex-col h-[100px] flex justify-start items-center md:justify-between p-2 md:flex-row ">
        <p className="text-sm font-semibold">{name}</p>
        <span className="text-violet-400 text-[11px] border rounded-xl p-1 bg-violet-300/80 border-violet-400">
          {client}
        </span>
      </div>
      {/* description */}
      <div className="w-full h-[120px]">
        <p className="px-3 py-2 text-sm font-light text-gray-500">
          {description}
        </p>
      </div>
      {/* date and comments section */}
      <div className="w-full h-[50px] flex items-center justify-between text-gray-400 font-semibold text-sm px-2">
        <div className="w-[80%] flex items-center justify-start gap-2">
          <BsCalendarWeek />
          <p className="text-xs">{format(parseISO(deadline), "ho, eeee")}</p>
        </div>
        <FaRegComments
        className="text-sm w-[20%]" 
        />
      </div>
    </Link>
  );
};
