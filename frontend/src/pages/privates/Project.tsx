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
  }, [getSingleProject, id]);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <HashLoader color="#39c7ad" />
      </div>
    );
  return <div>Project</div>;
};
