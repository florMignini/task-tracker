import { FC, useMemo } from "react";
import { Task } from ".";
import { ITask, TaskStatus } from "../../interfaces";
import { useProjects } from "../hooks";
import { IProjectProvider } from "../context/ProjectProvider";
interface Props {
  status: TaskStatus;
}
export const TaskList: FC<Props> = ({ status }) => {
  const { project, isDragging }: IProjectProvider =
    useProjects();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const taskByStatus = useMemo(
    () => project?.tasks?.filter((task: ITask) => task.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [project?.tasks]
  );
 

  return (
    <div
      className="w-full flex items-center justify-center"
    >
      {/* list */}
      {taskByStatus && (
        <div
          className={`w-full flex flex-col gap-2 items-center justify-center ${
            isDragging ? "opacity-20" : "opacity-100"
          } transition-opacity`}
        >
          {taskByStatus.map((task: ITask) => (
            <Task key={task._id} {...task} />
          ))}
        </div>
      )}
    </div>
  );
};
