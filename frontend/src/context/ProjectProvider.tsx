/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  createContext,
  useEffect,
  /* useEffect */ useState,
} from "react";
import { alertType } from "../pages/Register";
import axios from "axios";
import { useNavigate } from "react-router-dom";
type Props = {
  children: ReactNode;
};
export interface IProject {
  _id:string;
  name?: string;
  description?: string;
  deadline?: string;
  client?: string;
}
export interface IProjectProvider {
  projects?: IProject[];
  loading?: boolean;
  showAlert?: any;
  alert?: alertType;
  submitProject?: any;
}
const ProjectContext = createContext({});

export const ProjectProvider = ({ children }: Props) => {
const navigate = useNavigate()

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<alertType>({});
  const showAlert = (alert: alertType) => {
    setAlert(alert);
    setTimeout(() => {
      showAlert({});
    }, 4000);
  };
  // get all projects by user action
  useEffect(() => {
    const getProjectsByUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/projects`,
          config
        );
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectsByUser();
  }, []);

  // submit project action
  const submitProject = async (project: IProject) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data }: never = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/projects`,
        project,
        config
      );
      // update state once project is added
      setProjects([...projects, data])
      setAlert({
        msg: "Project created successfully",
        error: false,
      })
      setLoading(false);
      navigate("/dashboard/projects")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{ projects, loading, showAlert, alert, submitProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
