import { ReactNode, createContext } from "react";
type Props = {
    children: ReactNode;
  };
const ProjectContext = createContext({});

export const ProjectProvider = ({ children }:Props) => {
    return(
        <ProjectContext.Provider value={{/* projects:[] */}}>
            {children}
        </ProjectContext.Provider>
    )
};


export default ProjectContext;