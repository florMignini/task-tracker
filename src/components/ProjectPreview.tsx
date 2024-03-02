import { Link } from "react-router-dom";
import { IProject } from "../context/ProjectProvider";
import { FaRegComments } from "react-icons/fa";
import { BsCalendarWeek, BsPencilSquare } from "react-icons/bs";
import { format, parseISO } from "date-fns";
import { useAuth } from "../hooks";
import { useAuthType } from "../hooks/useAuth";

export const ProjectPreview = (project: IProject) => {
  const { _id, name, description, client, deadline, creator }: IProject =
    project;
  const { auth }: useAuthType = useAuth();
  return (
    <Link
      to={`${_id}`}
      className="w-1/3 xl:w-1/4 h-auto flex flex-col rounded-lg shadow-md hover:scale-[1.01] transition-transform text-gray-500"
    >
      {/* title */}
      <div className="w-full h-[100px] flex items-center justify-between p-2 ">
        <div className="truncate w-[80%] gap-1 flex flex-col lg:flex-row items-start lg:items-center justify-start over">
          <p className="text-sm font-semibold">{name}</p>
          {auth?._id !== creator ? (
            <p className="w-auto text-violet-400 text-[11px] border rounded-xl p-1 bg-green-300/80 border-green-400">
              collaborator
            </p>
          ) : (
            <p className="w-auto text-violet-400 text-[11px] border rounded-xl p-1 bg-gray-300/80 border-gray-400">
              owner
            </p>
          )}
          <span className="w-auto text-violet-400 text-[11px] border rounded-xl p-1 bg-violet-300/80 border-violet-400">
            {client}
          </span>
        </div>

        <Link
          to={`/dashboard/projects/edit/${_id}`}
          className="w-[20%] h-[50%] flex items-center justify-end text-violet-400"
        >
          <BsPencilSquare className="flex items-center justify-center text-violet-400" />
        </Link>
      </div>
      {/* description */}
      <div className="w-full h-[150px]">
        <p className="px-3 py-2 text-sm font-light text-gray-500">
          {description}
        </p>
      </div>
      {/* date and comments section */}
      <div className="w-full h-[50px] flex items-center justify-between text-gray-400 font-semibold text-sm px-2">
        <div className="w-[80%] flex items-center justify-start gap-2">
          <BsCalendarWeek />
          <p className="text-xs">{format(parseISO(deadline!), "ho, eeee")}</p>
        </div>
        <FaRegComments className="text-sm w-[20%]" />
      </div>
    </Link>
  );
};
