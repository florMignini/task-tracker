/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useState } from "react";
import { alertType } from "../pages/Register";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ITask } from "../../interfaces";
type Props = {
  children: ReactNode;
};
export interface IProject {
  _id: string;
  id?: string;
  name?: string;
  description?: string;
  deadline?: string;
  client?: string;
  tasks: ITask[];
}
export interface IProjectProvider {
  projects?: IProject[];
  loading?: boolean;
  showAlert?: any;
  alert?: alertType;
  isDragging?: boolean;
  getProjectsByUser?:any;
  submitProject?: any;
  EditProject?: any;
  getSingleProject?: any;
  submitTask?: any;
  project?: IProject;
  modalTask?: boolean;
  handleModalTask?: any;
  startDragging?: any;
  endDragging?: any;
  updateTaskStatus?: any;
}
const ProjectContext = createContext({});

export const ProjectProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  //project states
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<alertType>();
  const [project, setProject] = useState<IProject>();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  //task states
  const [modalTask, setModalTask] = useState(false);

  const handleModalTask = () => {
    setModalTask(!modalTask);
  };

  const showAlert = (alert: alertType) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 3000);
  };
  // GET ALL PROJECTS

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


  // CREATE NEW PROJECT
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
      setProjects([...projects, data]);
      showAlert({
        msg: "Project successfully created",
        error: false,
      });
      setTimeout(() => {
        showAlert({});
        navigate("/dashboard/projects");
      }, 3000);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT PROJECT
  const EditProject = async (project: IProject) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data }: any = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/projects/${project.id}`,
        project,
        config
      );

      // update state once project is edited
      const updatedProjects = projects.map((projectToUpdate: IProject) =>
        projectToUpdate._id === data._id ? data : projectToUpdate
      );

      setProjects(updatedProjects);
      showAlert({
        msg: "Project successfully updated",
        error: false,
      });
      setTimeout(() => {
        showAlert({});
        navigate("/dashboard/projects");
      }, 3000);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //GET SINGLE PROJECT
  const getSingleProject = async (id: string) => {
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
        `${import.meta.env.VITE_SERVER_URL}/projects/${id}`,
        config
      );
      setProject(data?.singleProject);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE PROJECT
  const deleteProject = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/projects/${id}`,
        config
      );
      //sync the new state
      const updatedState = projects.filter(
        (project: IProject) => project._id !== id
      );
      setProjects(updatedState);
      showAlert({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => {
        showAlert({});
        navigate("/dashboard/projects");
      }, 3000);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //CREATE NEW TASK
  const submitTask = async (task: ITask) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/tasks`,
        task,
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const startDragging = () => {
    setIsDragging(true);
  };
  const endDragging = () => {
    setIsDragging(false);
  };
  const updateTaskStatus = (draggedTask: ITask) => {
    console.log(draggedTask)
    const tasks = project?.tasks.map((task: ITask) => {
      if (task._id === draggedTask._id) {
        return draggedTask;
      }
      return task;
    });
    return tasks;
  };
  return (
    <ProjectContext.Provider
      value={{
        //project state
        projects,
        loading,
        showAlert,
        project,
        alert,
        //project actions
        getProjectsByUser,
        submitProject,
        EditProject,
        getSingleProject,
        deleteProject,
        //modal state
        modalTask,
        handleModalTask,
        //task state
        isDragging,
        //task actions
        submitTask,
        startDragging,
        endDragging,
        updateTaskStatus,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
