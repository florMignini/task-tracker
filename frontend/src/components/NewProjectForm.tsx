import { useState } from "react";
import { useProjects } from "../hooks";
import { Toaster } from ".";
import { IProjectProvider } from "../context/ProjectProvider";

export const NewProjectForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [client, setClient] = useState<string>("");

  const { showAlert, alert, submitProject }: IProjectProvider = useProjects();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    /* all fields validation */
    if ([name, description, deadline, client].includes("")) {
      showAlert({
        msg: `All fields are required`,
        error: true,
      });
      return;
    }
    //send data to project provider
    submitProject({ name, description, deadline, client });
  };

  return (
    <form
      className="w-full bg-white py-10 px-5 md:w-1/2 rounded-lg"
      onSubmit={handleSubmit}
    >
      {alert?.msg && <Toaster {...alert} />}
      <div className="mt-5">
        <label
          className="text-gray-700 capitalize font-thin text-lg"
          htmlFor="name"
        >
          Project name
        </label>
        <input
          id="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
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
          Project description
        </label>
        <textarea
          id="name"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          autoComplete="off"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>
      {/* deadline */}
      <div className="mt-5">
        <label
          className="text-gray-700 capitalize font-thin text-lg"
          htmlFor="deadline"
        >
          Deadline
        </label>
        <input
          id="name"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          value={deadline}
          onChange={({ target }) => setDeadline(target.value)}
        />
      </div>
      {/* client */}
      <div className="mt-5">
        <label
          className="text-gray-700 capitalize font-thin text-lg"
          htmlFor="client"
        >
          Client name
        </label>
        <input
          id="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          autoComplete="off"
          value={client}
          onChange={({ target }) => setClient(target.value)}
        />
      </div>
      <input
        type="submit"
        value="Create project"
        className="w-full mt-3 p-2 uppercase text-white rounded cursor-pointer bg-[#3dcbb1] hover:bg-[#5dc7b3] transition-colors"
      />
    </form>
  );
};
