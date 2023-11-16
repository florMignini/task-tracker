/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProjects } from "../hooks";
import { Toaster } from ".";
import { IProjectProvider } from "../context/ProjectProvider";
import { format, parseISO } from "date-fns";
import { BsCalendar2Date } from "react-icons/bs";

export const ProjectForm = () => {
  //context project import
  const {
    showAlert,
    alert,
    submitProject,
    EditProject,
    project,
  }: IProjectProvider = useProjects();

  //form states
  const [id, setId] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deadline, setDeadline] = useState<any>(new Date());
  const [client, setClient] = useState<string>("");

  // checking if editing or creating a project
  const params = useParams();

  useEffect(() => {
    if (
      params.id &&
      project?.name &&
      project?.description &&
      project.deadline &&
      project.client
    ) {
      setId(project?._id);
      setName(project?.name);
      setDescription(project?.description);
      setClient(project?.client);
      setDeadline(
        new Date(
          format(parseISO(project?.deadline.split("T")[0]), "MM-dd-yyyy")
        )
      );
    }
  }, [
    params,
    project?._id,
    project?.client,
    project?.deadline,
    project?.description,
    project?.name,
  ]);

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

    if (params.id) {
      await EditProject({
        id,
        name,
        description,
        deadline,
        client,
      });
    } else {
      await submitProject({
        name,
        description,
        deadline,
        client,
      });
    }
    setName("");
    setDescription("");
    setDeadline("");
    setClient("");
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
        value={id ? "Update project" : "Create project"}
        className="w-full mt-3 p-2 uppercase text-white rounded cursor-pointer bg-[#3dcbb1] hover:bg-[#5dc7b3] transition-colors"
      />
    </form>
  );
};
