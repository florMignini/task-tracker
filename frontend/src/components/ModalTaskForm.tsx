import { Fragment, useState /* useEffect */ } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProjects } from "../hooks";
import { IProjectProvider } from "../context/ProjectProvider";
import { /* ITask,  */ TaskPriority, TaskStatus } from "../../interfaces";
import { Toaster } from ".";
import { BsCalendar2Date } from "react-icons/bs";
import { useParams } from "react-router-dom";

//status
const STATUS: TaskStatus[] = ["To do", "In-progress", "Done"];

//priority
const PRIORITY: TaskPriority[] = ["High", "Low", "Medium"];

export const ModalTaskForm = () => {
  const {
    modalTask,
    handleModalTask,
    showAlert,
    alert,
    submitTask,
  }: IProjectProvider = useProjects();

  //task form states
  //form states

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deadline, setDeadline] = useState<any>(new Date());
  const [status, setStatus] = useState<TaskStatus>();
  const [priority, setPriority] = useState<TaskPriority>();
  // get project id from params
const params = useParams()
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(`aca`)
    // form validations
    if ([name, priority, status, description, deadline].includes("")) {
      showAlert({
        msg: `All fields are required`,
        error: true,
      });
      return;
    }
   const result = await submitTask({ name, priority, status, description, deadline, project: params.id });
   console.log(result);
  };

  return (
    <Transition.Root show={modalTask} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 backdrop-blur-sm inset-0 overflow-y-auto"
        onClose={handleModalTask}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalTask}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start pt-4">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl leading-6 font-light text-gray-700 pl-10"
                  >
                    Create task
                  </Dialog.Title>
                  <form
                    className="w-full bg-white py-10 px-5 md:w-[90%] rounded-lg"
                    onSubmit={handleSubmit}
                  >
                    {alert?.msg && <Toaster {...alert} />}
                    <div className="mt-5">
                      <label
                        className="text-gray-700 capitalize font-thin text-lg"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none text-slate-600"
                        autoComplete="off"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                      />
                    </div>
                    {/* description */}
                    <div className="mt-5">
                      <label
                        className="text-gray-700 capitalize font-thin text-lg"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        id="name"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none text-slate-600"
                        autoComplete="off"
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                      />
                    </div>
                    {/* deadline */}
                    <div className="mt-5 flex flex-col">
                      <label
                        className="text-gray-700 capitalize font-thin text-lg"
                        htmlFor="deadline"
                      >
                        Deadline
                      </label>
                      <div className="border flex items-center justify-between w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none text-slate-600">
                        <DatePicker
                          id="deadline"
                          dateFormat="dd-MM-yyyy"
                          selected={deadline}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onChange={(date: any) => setDeadline(date)}
                        />
                        <BsCalendar2Date />
                      </div>
                    </div>
                    {/* status */}
                    <div className="mt-5">
                      <label
                        className="text-gray-700 capitalize font-thin text-lg"
                        htmlFor="client"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        className="border capitalize w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none text-slate-600"
                        value={status}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={({ target }:any) => setStatus(target.value)}
                      >
                        <option value=""> -- select -- </option>
                        {STATUS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* priority */}
                    <div className="mt-5">
                      <label
                        className="text-gray-700 capitalize font-thin text-lg"
                        htmlFor="priority"
                      >
                        Priority
                      </label>
                      <select
                        id="priority"
                        className="border capitalize w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none text-slate-600"
                        value={priority}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={({ target }:any) => setPriority(target.value)}
                      >
                        <option value="">-- select --</option>
                        {PRIORITY.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      value="Create task"
                      className="w-full mt-3 p-2 uppercase text-white rounded cursor-pointer bg-[#3dcbb1] hover:bg-[#5dc7b3] transition-colors"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
