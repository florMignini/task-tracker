import { Link } from "react-router-dom"
import {AiOutlineProject} from "react-icons/ai"
import {LuLayoutDashboard} from "react-icons/lu"
export const Sidebar = () => {
  return (
    <aside className="md:w-56 lg:w-72 pt-5 p-2 bg-slate-400 m-[6px] rounded-l-lg">
        <h2 className="text-3xl lg:text-4xl text-white font-black text-center">Task Tracker</h2>
        {/* links section */}
        <div className="w-full h-screen mt-10 py-2 gap-2 flex items-center justify-start flex-col text-white">
          
        <Link
            to=""
            className="w-[90%] flex items-center justify-center p-2 mb-2 gap-2 rounded-md 
            hover:bg-slate-500"
            >
              <LuLayoutDashboard/>
              Dashboard</Link>
              <Link
            to="projects"
            className="w-[90%] flex items-center justify-center p-2 mb-2 gap-2 rounded-md hover:bg-slate-500"
            >
              <AiOutlineProject/>
              Projects</Link>
  
        </div>
        {/* actions section */}
        {/* settings */}
        {/* log out */}
    </aside>
  )
}
