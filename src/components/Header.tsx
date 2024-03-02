/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { format } from "date-fns";
import useAuth, { useAuthType } from "../hooks/useAuth";
import { CiSearch } from "react-icons/ci";
import { IProjectProvider } from "../context/ProjectProvider";
import { useProjects } from "../hooks";
import { Link } from "react-router-dom";

const Header = () => {
  const { auth }: useAuthType = useAuth();
  const { projects }: IProjectProvider = useProjects();
  const [search, setSearch] = useState<string>("");

  const filteredProjects =
    search === ""
      ? []
      : projects?.filter((project) =>
          project.name?.toLowerCase().includes(search.toLowerCase())
        );
  //reset search box state after redirect
  const handleResetSearch = () => {
    setSearch("");
  };
  return (
    <header className="lg:flex items-center lg:justify-between px-10 py-3">
      {/* user welcome */}
      <div className="flex ">
        <div className="w-[90%] flex flex-col ">
          <div className="flex items-center justify-start gap-2">
            {/* input search */}
            <div className="w-1/2 md:w-60 lg:w-80 bg-slate-200/90 flex h-[90%] p-2 items-center justify-center gap-2 rounded-xl  text-gray-500">
              <CiSearch />
              <input
                value={search}
                type="search"
                placeholder="search projects..."
                className="outline-none bg-transparent text-sm font-thin"
                onChange={({ target }) => setSearch(target.value)}
              />
            </div>
            <h5 className="text-xs font-semibold text-end text-gray-400">
              {format(new Date(), "PPP")}
            </h5>
          </div>
          {filteredProjects && filteredProjects?.length > 0 && (
            <div className="flex items-center justify-start scroll-py-2 overflow-y-auto p-2 text-sm text-gray-700">
              {filteredProjects.map((project) => (
                <Link
                  to={`/dashboard/projects/${project._id}`}
                  key={project._id}
                  className={`cursor-default select-none px-4 py-2`}
                  onClick={handleResetSearch}
                >
                  {project.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="hidden lg:flex  gap-2 items-center  lg:text-xl justify-end lg:w-96 text-gray-500">
          <strong>Hello,</strong>
          <h3 className="capitalize">{auth?.name}!</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
