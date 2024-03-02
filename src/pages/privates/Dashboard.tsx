// import { useAuth } from "../../hooks"

import { useEffect } from "react";
import { useProjects } from "../../hooks";
import { IProjectProvider } from "../../context/ProjectProvider";

const Dashboard = () => {
  const { resetSingleProjectState }: IProjectProvider = useProjects();
  // const {auth} = useAuth()
  useEffect(() => {
    resetSingleProjectState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
