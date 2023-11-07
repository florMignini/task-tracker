import { Link } from "react-router-dom"
import {AiOutlineAppstoreAdd} from "react-icons/ai"
export const Sidebar = () => {
  return (
    <aside className="md:w-56 lg:w-72 pt-5 p-1">
        <h2 className="text-4xl text-gray-400 font-black text-center">Task Tracker</h2>
        {/* links section */}
        <div className="w-full mt-20 flex items-center justify-center flex-col">
          
            <Link
            to="new-project"
            className="w-[80%] flex items-center justify-center py-2 gap-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-center font-md"
            >
              <AiOutlineAppstoreAdd/>
              Add Project</Link>
  
        </div>
        {/* actions section */}
        {/* settings */}
        {/* log out */}
    </aside>
  )
}
