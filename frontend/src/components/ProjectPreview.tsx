import { Link } from "react-router-dom";
import { IProject } from "../context/ProjectProvider"
// import {ImPencil2} from "react-icons/im"
// import {BsCalendarWeek} from "react-icons/bs"
export const ProjectPreview = (project:IProject) => {
   const {_id,name, description, client} = project;
  return (
    <Link 
    to={`${_id}`}
    className="w-1/3 h-auto flex flex-col rounded-lg shadow-md">
        {/* title */}
        <div className="w-full flex items-center justify-between p-2">
            <p className="text-sm font-semibold">{name}</p>
            <span
            className="text-violet-400 text-[11px] border rounded-xl p-1 bg-violet-300/80 border-violet-400"
            >{client}</span>
        </div>
        {/* description */}
        <div className="w-full h-[200px]">
            <p className="px-3 py-2 text-sm font-light text-gray-500">
                {description}
            </p>
        </div>
    </Link>
  )
}
