import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { alertType } from "./Register";
import axios from "axios";
import { Toaster } from "../components/Toaster";

const ChangePassword = () => {
  const [alert, setAlert] = useState<alertType>({});
  const [validToken, setValidToken] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  //get token from url
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const tokenParam = query.get("token");
  //new password state
  const [password, setPassword] = useState<string>("");
  //verify if token is valid
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/user/recover-password/${tokenParam}`
        );
        setValidToken(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    verifyToken();
  }, [tokenParam]);
  //submit new password action
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    /* minimal password length validation */
    if (password.length < 8) {
      setAlert({
        msg: "The password must be at least 8 characters",
        error: true,
      });
      return;
    }
    try {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/user/recover-password/${tokenParam}`,
        { password }
      );
      setAlert({
      msg: data.msg,
      error: false,
      })
      setVerified(true)
      setValidToken(false)
      setPassword('')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Reset password!</h1>
              </div>
              <div className="divide-y divide-gray-200">
                {/* toast msg */}
                {alert.msg && <Toaster {...alert} />}
                {validToken && (
                  <form
                    className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                    onSubmit={handleSubmit}
                  >
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Set new password"
                        value={password}
                        onChange={({ target }) => {
                          setPassword(target.value);
                        }}
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        New password
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        className="bg-blue-500 w-full text-white text-sm font-bold rounded-md px-2 py-1 hover:cursor-pointer
							hover:bg-blue-600 transition-colors uppercase"
                        type="submit"
                      >
                        save new password
                      </button>
                    </div>
                  </form>
                )}
                <nav className="justify-center lg:flex lg:justify-between">
                  {/* signIn redirect link */}
                  {
                   verified && (
                    <Link
                    className="block lg:text-center font-bold text-sm my-5 cursor-pointer hover:underline-8"
                    to="/"
                  >
                    Let's login!
                  </Link>
                    )
                   }
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
