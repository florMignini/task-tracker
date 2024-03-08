import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "../components/Toaster";
import axios from "axios";
export interface alertType {
  msg?: string;
  error?: boolean;
}
const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [alert, setAlert] = useState<alertType>({});

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //all fields are required validation
    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({
        msg: "All fields are required",
        error: true,
      });
      return;
    }
    /* comparing passwords and password confirm */
    if (password !== repeatPassword) {
      setAlert({
        msg: "Passwords do not match",
        error: true,
      });
      return;
    }
    /* minimal password length validation */
    if (password.length < 8) {
      setAlert({
        msg: "The password must be at least 8 characters",
        error: true,
      });
      return;
    }
    /* reset alert state */
    setAlert({});
    /* once all validation are successfully passed proceed to create user */
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/register`,
        {name, email, password}
      );
      setAlert({
        msg: data.msg,
        error: false,
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const { msg } = alert;
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">
                  Welcome to task tracker!
                </h1>
                <p className="text-sm font-thin">Create your account!</p>
              </div>
              <div className="divide-y divide-gray-200">
                <form
                  className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                  onSubmit={handleSubmit}
                >
                  {/* toast msg */}
                  <div className="mb-1">
                  {msg && <Toaster {...alert} />}
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="name"
                      value={name}
                      onChange={({ target }) => setName(target.value)}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="email"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email"
                      value={email}
                      onChange={({ target }) => setEmail(target.value)}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      value={password}
                      onChange={({ target }) => setPassword(target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="repeat-password"
                      name="repeat-password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      value={repeatPassword}
                      onChange={({ target }) => setRepeatPassword(target.value)}
                    />
                    <label
                      htmlFor="repeat-password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Repeat password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-blue-500 w-full text-white text-sm font-bold rounded-md px-2 py-1 hover:cursor-pointer
							hover:bg-blue-600 transition-colors uppercase"
                      type="submit"
                    >
                      create account
                    </button>
                  </div>
                </form>
                <nav className="justify-start lg:flex lg:justify-between">
                  <Link
                    className="block lg:text-center font-light text-sm my-5 text-slate-500"
                    to="/"
                  >
                    alredy registered?
                  </Link>
                  <Link
                    className="block lg:text-center font-light text-sm my-5 text-slate-500"
                    to="/forgotten-password"
                  >
                    forgotten password?
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
