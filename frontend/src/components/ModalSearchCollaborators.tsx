import { Fragment, useState } from "react";
import { useProjects } from "../hooks";
import { Dialog, Transition } from "@headlessui/react";
import { IProjectProvider } from "../context/ProjectProvider";
import { Toaster } from ".";
import { MagnifyingGlass } from "../icons";

export const ModalSearchCollaborators = () => {
  const { handleCollaboratorsModal, collaboratorsModal, alert, collaborators,searchCollaborators, showAlert }: IProjectProvider =
    useProjects();
    console.log(collaborators)
const [email, setEmail] = useState<string>('')

const handleSubmit = async(e: { preventDefault: () => void; }) => {
  e.preventDefault();

  // form validations
  if (email === " ") {
    showAlert({
      msg: `All fields are required`,
      error: true,
    });
    return;
  }
  await searchCollaborators(email);

}
  return (
    <Transition.Root show={collaboratorsModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 backdrop-blur-sm inset-0 overflow-y-auto"
        onClose={handleCollaboratorsModal}
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
                  onClick={handleCollaboratorsModal}
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
              {/* CONTENT */}
              <form
                  className="w-full bg-white py-3 px-5 md:w-[90%] rounded-lg"
                  onSubmit={handleSubmit}
                >
                  {alert?.msg && <Toaster {...alert} />}
                  <div className="flex items-center justify-center mt-5">
                    <MagnifyingGlass/>
                    <input
                      id="email"
                      type="search"
                      placeholder="Enter collaborator email"
                      className="flex items-start justify-start border-none w-full p-2  placeholder-gray-400 rounded-md outline-none text-gray-950"
                      autoComplete="off"
                      value={email}
                      onChange={({ target }) => setEmail(target.value)}
                    />
                  </div>

                </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
