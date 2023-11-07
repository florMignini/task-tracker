import { ReactNode, createContext, useEffect, useState } from "react";
type Props = {
    children: ReactNode;
  };
const ProjectContext = createContext({});

export const ProjectProvider = ({ children }:Props) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
      <ProjectContext.Provider value={{ projects, loading, error }}>
        {children}
      </ProjectContext.Provider>
    );
   
};


export default ProjectContext;