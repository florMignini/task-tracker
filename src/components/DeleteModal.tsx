import { Fragment } from "react";
import { useProjects } from "../hooks";
import { Dialog, Transition } from "@headlessui/react";
import { IProjectProvider } from "../context/ProjectProvider";
import { WarningIcon } from "../icons";

export const DeleteModal = () => {
  const { handleDeleteModalTask, modalDeleteTask, deleteTask }: IProjectProvider =
    useProjects();

  return (
    <Transition.Root show={modalDeleteTask} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 backdrop-blur-sm inset-0 overflow-y-auto"
        onClose={handleDeleteModalTask}
      >
        <div className="flex items-end justify-center pt-2 px-2 pb-10 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="h-screen fixed inset-0 bg-gray-700 bg-opacity-20 transition-opacity" />
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
                  onClick={handleDeleteModalTask}
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

              <div className="sm:flex sm:items-start pt-3 text-red-600">
                <div className="">
                  <WarningIcon/>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-thin leading-6 pl-10"
                  >
                    Delete task
                  </Dialog.Title>
                  {/* Main Content */}
                  <div>
                    {/* top section */}
                  <div className="h-[150px] font-light text-xl pt-5 mx-auto text-gray-600">
                    <p className="w-[90%]">This action cannot be undone</p>
                    <h3 className="w-[90%] uppercase pt-2 font-bold">
                      are you sure to delete the task?
                    </h3>
                  </div>
                  {/* button section */}
                  <div className="flex items-start justify-end gap-5">
                    <button className="border-2 border-gray-700 text-gray-700 bg-slate-500/80 hover:bg-slate-400 rounded-lg px-4 py-1 capitalize text-lg font-semibold"
                    onClick={handleDeleteModalTask}
                    >Cancel</button>
                    <button className="border-2 border-red-500 bg-red-400/80 hover:bg-red-300 rounded-lg px-4 py-1 capitalize text-lg font-semibold"
                    onClick={deleteTask}
                    >Delete</button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
