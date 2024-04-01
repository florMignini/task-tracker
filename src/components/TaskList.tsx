import { FC, useMemo, DragEvent } from "react";
import { Task } from ".";
import { ITask, TaskStatus } from "../../interfaces";
import { useProjects } from "../hooks";
import { IProjectProvider } from "../context/ProjectProvider";
interface Props {
  status: TaskStatus;
}
export const TaskList: FC<Props> = ({ status }) => {
  const {
    project,
    isDragging,
    updateTaskStatus,
    endDragging,
  }: IProjectProvider = useProjects();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const taskByStatus = useMemo(
    () => project?.tasks?.filter((task: ITask) => task.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [project?.tasks, status]
  );

  const onDropTask = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("item");

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const draggedTask = project?.tasks?.find((e) => e._id === id)!;
    draggedTask.status = status;

    updateTaskStatus(draggedTask);
    endDragging();
  };
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

  };

  return (
    <div
      className="w-full h-[100%] flex items-start justify-start"
      onDragOver={allowDrop}
      onDrop={onDropTask}
    >
      {/*task list by status */}
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
