/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, /* useEffect */ useState } from "react";
import { alertType } from "../pages/Register";
import axios from "axios";
type Props = {
  children: ReactNode;
};
interface IProject {
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
  const [projects /* setProjects */] = useState([]);
  const [loading /* setLoading */] = useState(true);
  const [alert, setAlert] = useState<alertType>({});
  const showAlert = (alert: alertType) => {
    setAlert(alert);

    setTimeout(() => {
      showAlert({});
    }, 4000);
  };

  const submitProject = async (project:IProject) => {

    try {
      const token = localStorage.getItem("token")
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/projects`,
        project,
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  };
  /*  const fetchProjects = async () => {
      try {
        const {data} = await axios.get(`${
      import.meta.env.VITE_SERVER_URL
    }/projects`);
        setProjects(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchProjects();
    }, []);
 */
  return (
    <ProjectContext.Provider
      value={{ projects, loading, showAlert, alert, submitProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
