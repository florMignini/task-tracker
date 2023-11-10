import { Link } from "react-router-dom"
import {AiOutlineProject} from "react-icons/ai"
import {LuLayoutDashboard} from "react-icons/lu"
export const Sidebar = () => {
  return (
    <aside className="md:w-56 lg:w-72 pt-5 p-1">
        <h2 className="text-4xl text-gray-400 font-black text-center">Task Tracker</h2>
        {/* links section */}
        <div className="w-full mt-20 gap-2 flex items-center justify-center flex-col">
          
        <Link
            to=""
            className="w-[80%] flex items-center justify-center py-3 gap-2 rounded-lg bg-[#39c7ad] hover:bg-[#0bcfab] transition-colors text-white text-center font-md"
            >
              <LuLayoutDashboard/>
              Dashboard</Link>
              <Link
            to="projects"
            className="w-[80%] flex items-center justify-center py-3 gap-2 rounded-lg bg-[#39c7ad] hover:bg-[#0bcfab] transition-colors text-white text-center font-md"
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
