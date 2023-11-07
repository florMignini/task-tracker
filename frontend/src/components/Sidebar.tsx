import { Link } from "react-router-dom"

export const Sidebar = () => {
  return (
    <aside className="md:w-40 lg:w-60 p-5">
        <h1>Sidebar</h1>
        <div className="p-2 flex items-center justify-center flex-col">
          <div>
            <Link
            to="new-project"
            >Create Project</Link>
          </div>
        </div>
    </aside>
  )
}
