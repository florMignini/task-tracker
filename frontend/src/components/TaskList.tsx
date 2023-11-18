import { DragEvent, FC, useMemo } from "react";
import { Task } from ".";
import { ITask, TaskStatus } from "../../interfaces";
import { useProjects } from "../hooks";
import { IProjectProvider } from "../context/ProjectProvider";
interface Props {
status: TaskStatus;
}
export const TaskList:FC<Props> = ({status}) => {

    const {project}:IProjectProvider = useProjects()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const taskByStatus = useMemo(()=>project?.tasks?.filter((task:ITask)=> task.status === status), [project?.tasks]);
    const onDropTask = (event:DragEvent) => {
      const id = event.dataTransfer.getData('item')
    }
    const allowDrop = (event: DragEvent) => {
      event.preventDefault()
    }
  return (
    <div className="w-full flex items-center justify-center"
    onDrop={onDropTask}
    onDragOver={allowDrop}
    >
        {/* list */}
      {
     taskByStatus && taskByStatus.length > 0 ? (
        
      <div className="w-full flex flex-col gap-2 items-center justify-center opacity-100">
      {
      taskByStatus.map((task:ITask)=>(
          <Task key={task._id} {...task} />
          ))
      }
    </div>
    //!Implement something better here
        ) : null
      }
    </div>
  );

};
