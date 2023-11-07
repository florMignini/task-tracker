import { Link } from "react-router-dom"
import {AiOutlineAppstoreAdd} from "react-icons/ai"
export const Sidebar = () => {
  return (
    <aside className="bg-slate-100 md:w-56 lg:w-72 pt-5 p-1">
        <h2 className="text-4xl text-gray-400 font-black text-center">Logo</h2>
        <div className="w-full mt-20 flex items-center justify-center flex-col">
          
            <Link
            to="new-project"
            className="w-[90%] flex items-center justify-center py-2 gap-2 rounded-lg bg-blue-500 text-white text-center font-md"
            >
              <AiOutlineAppstoreAdd/>
              Add Project</Link>
  
        </div>
    </aside>
  )
}
