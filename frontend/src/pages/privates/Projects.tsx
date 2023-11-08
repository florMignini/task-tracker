// import { useProjects } from "../../hooks"

import { Link } from "react-router-dom"

const Projects = () => {
  // const {projects} = useProjects()
  return (
    <main className="w-full flex items-center justify-center">
        <div className="w-[90%] bg-white">
          <Link
          to="new-project"
          className=" flex items-center justify-center py-3 gap-2 rounded-lg bg-[#3dcbb1] hover:bg-blue-400 text-white text-center font-md"
          >Add Project</Link>
        </div>
    </main>
  )
}

export default Projects