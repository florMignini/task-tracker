/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useEffect, useState } from "react";
import { alertType } from "../pages/Register";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ICollaborator, ITask } from "../../interfaces";
import io, { Socket } from "socket.io-client"
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

type Props = {
  children: ReactNode;
};
export interface IProject {
  _id: string;
  id?: string;
  name?: string;
  description?: string;
  deadline?: string;
  creator?: string;
  client?: string;
  tasks?: ITask[];
  collaborator?: ICollaborator[]
}
export interface IProjectProvider {
  projects?: IProject[];
  deleteProject?:any;
  loading?: boolean;
  showAlert?: any;
  alert?: alertType;
  task?: ITask;
  isDragging?: boolean;
  getProjectsByUser?:any;
  submitProject?: any;
  EditProject?: any;
  getSingleProject?: any;
  submitTask?: any;
  searchCollaborators?:any;
  project?: IProject;
  modalTask?: boolean;
  deleteCollaborator?: any;
  modalDeleteTask?: boolean;
  handleModalTask?: any;
  handleDeleteModalTask?: any;
  startDragging?: any;
  endDragging?: any;
  updateTaskStatus?: any;
  handleEditTask?: any;
  deleteTask?:any;
  handleCollaboratorsModal?: any;
  collaboratorsModal?: boolean;
  collaborators?:ICollaborator;
  addCollaborator?:any;
  resetSingleProjectState?:any;
  logOut?:any;
  submitTaskProject?:any;
  deleteTaskProject?:any;
  updateTaskProject?:any;
  updateStatusTaskProject?:any;
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
  const [modalDeleteTask, setDeleteModalTask] = useState(false);
  const [task, setTask] = useState<any>({});
  //collaborators state
  const [collaborators, setCollaborators] = useState({});
  const [collaboratorsModal, setCollaboratorsModal] = useState<boolean>(false);

  //create socket connection
  useEffect(() => {
    socket = io(import.meta.env.VITE_SERVER_URL)
  }, [])
  
  

  const handleModalTask = () => {
    setModalTask(!modalTask);
    setTask({})
  };
const handleDeleteModalTask = (task:ITask)=>{
setDeleteModalTask(!modalDeleteTask);
setTask(task)
}
const handleCollaboratorsModal = () => {
setCollaboratorsModal(!collaboratorsModal);
setCollaborators({})
}
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
  const resetSingleProjectState = () => {
    setProject({} as IProject)
  }

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

  //HANDLE NEW/UPDATE TASK
  const submitTask = async (task: ITask) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if(task?.id !== ''){
   await editTask(task)
    }else{
   await createTask(task)
    }
  };

  
//create task
  const createTask = async (task: ITask) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, ...rest} = task
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
        rest,
        config
      );

      setTask({})
      setModalTask(false)
      //SOCKET IO
      socket.emit("new task", data)
    } catch (error) {
      console.log(error);
    }
  }
  const startDragging = () => {
    setIsDragging(true);
  };
  const endDragging = () => {
    setIsDragging(false);
  };

  const updateTaskStatus = async(draggedTask: ITask) => {
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
        `${import.meta.env.VITE_SERVER_URL}/tasks/${draggedTask._id}`,
        draggedTask,
        config
      );
      console.log(data)
      socket.emit('update state', data)
      setTask({})

    } catch (error) {
      console.log(error);
    }
}
const handleEditTask = (task:ITask)=>{
  setTask(task)
  setModalTask(true)
} 

//edit task
const editTask = async(task:ITask)=>{
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
    `${import.meta.env.VITE_SERVER_URL}/tasks/${task.id}`,
    task,
    config
  );
  socket.emit("update task", data);
  setTask({})
  setAlert({})
  setModalTask(false)
} catch (error) {
  console.log(error)
}
}

const deleteTask = async()=>{
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data }: any = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/tasks/${task?._id}`,
      config
    );
    showAlert({
      msg: data.msg,
      error: false
    })
    //SOCKET
    socket.emit(`delete task`, task)
    setDeleteModalTask(false)
  } catch (error) {
    console.log(error)
  }
}
//*COLLABORATORS
const addCollaborator = async(email:string) => {

  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data }: any = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/projects/collaborators/${project?._id}`,
      {email},
      config
    );

    const updatedProject:any = {...project}
    updatedProject.collaborator = [...project?.collaborator as [], data.userByEmail]
    setProject(updatedProject)
    showAlert({
       msg: data.msg,
       error: false
    })
    setCollaborators({})
    setCollaboratorsModal(false)
  } catch (error:any) {
    showAlert({
      msg: error?.response?.data?.msg,
      error: true
    })
  }
};

const searchCollaborators = async(email:string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data }: any = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/projects/collaborators`,
     {email},
      config
    );
    setCollaborators(data);

  } catch (error: any) {
    showAlert({
      msg: error?.response?.data?.msg,
      error: true
    })
  
  }
}
const deleteCollaborator = async(collaborator:ICollaborator)=>{
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data }: any = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/projects/delete-collaborator/${project?._id}`,
     {id: collaborator._id},
      config
    );
    const updatedProject:any = {...project}
    updatedProject.collaborator = updatedProject.collaborator.filter((collaboratorUpdate: any) => collaboratorUpdate._id !== collaborator._id);
    setProject(updatedProject);
    showAlert({
    msg: data.msg,
    error: false,
    })
  } catch (error: any) {
    showAlert({
      msg: error?.response?.data?.msg,
      error: true
    })
  
  }
}
const logOut = () => {
  setProjects([])
  setProject({} as IProject)
  showAlert({})
}

//SOCKET IO ACTIONS
const submitTaskProject = (newTask:ITask) => {
  const updatedProject:any = {...project}
  updatedProject.tasks = [...updatedProject?.tasks as [], newTask]
  setProject(updatedProject)
}
const deleteTaskProject = (taskToDelete:ITask)=>{
  const updatedProject:any = {...project}
  updatedProject.tasks = updatedProject?.tasks.filter((taskState:ITask) => taskState._id !== taskToDelete._id)
  setProject(updatedProject)
}
const updateTaskProject = (taskUpdated:ITask) => {
  const updatedProject:any = {...project}
  updatedProject.tasks = updatedProject?.tasks?.map((stateTask:ITask)=> stateTask._id === taskUpdated._id ? taskUpdated : stateTask);
  setProject(updatedProject)
}
const updateStatusTaskProject = (taskUpdated:ITask) => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const projectUpdated:any = {...project}
projectUpdated.tasks = project?.tasks?.map((task:ITask)=> task._id !== taskUpdated._id ? task : taskUpdated)
setProject(projectUpdated)
}
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
        resetSingleProjectState,
        //collaborators actions
        searchCollaborators,
        //modal state
        modalTask,
        modalDeleteTask,
        handleModalTask,
        handleDeleteModalTask,
        task,
        //collaborators
        handleCollaboratorsModal,
        addCollaborator,
        deleteCollaborator,
        collaboratorsModal,
        collaborators,
        //task state
        isDragging,
        //task actions
        submitTask,
        startDragging,
        endDragging,
        updateTaskStatus,
        handleEditTask,
        deleteTask,
        //session actions
        logOut,
        //socket.io
        submitTaskProject,
        deleteTaskProject,
        updateTaskProject,
        updateStatusTaskProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
