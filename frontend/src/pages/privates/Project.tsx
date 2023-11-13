import { useParams } from "react-router-dom";
import { useProjects } from "../../hooks";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";

export const Project = () => {
  // get single project ID from params;
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { getSingleProject, project, loading }:any = useProjects();

  useEffect(() => {
    getSingleProject(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <HashLoader color="#39c7ad" />
      </div>
    );
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div
       className="w-full flex items-center justify-between px-4 h-10 text-violet-500"
      >
        <h3 className="font-bold text-lg"> {project.name}</h3>
      </div>
      {/* card section */}
      <div className="w-full h-screen bg-white grid grid-cols-3 gap-2 text-violet-500">
        {/* each card */}
        <div className="bg-slate-100 m-2 rounded-lg">
          <div className="flex items-center justify-center p-1 bg-white border rounded-lg">
            <p className="text-lg font-thin"> To do</p>
          </div>
        </div>
        {/* each card */}
        <div className="bg-slate-100 m-2 rounded-lg">
        <div className="flex items-center justify-center p-1 bg-white border rounded-lg">
            <p className="text-lg font-thin"> In progress</p>
          </div>
        </div>
        {/* each card */}
        <div className="bg-slate-100 m-2 rounded-lg">
        <div className="flex items-center justify-center p-1 bg-white border rounded-lg">
            <p className="text-lg font-thin"> Completed</p>
          </div>
        </div>
      </div>
    </main>
  )
};
