import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Toaster } from "../components/Toaster";
import axios from "axios";
import { alertType } from "./Register";

const ConfirmAccount = () => {

  const [alert, setAlert] = useState<alertType>({})
  const [verified, setVerified] = useState<boolean>(false)
  /* get token from url */
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/user/confirm/${token}`
        );
        setAlert({
        msg: data.msg,
        error: false
        })
        setVerified(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        setAlert({
        msg: error.response.data.msg,
        error: true
        })
      }
    };
    confirmAccount();
  }, [token]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Verify your account!</h1>
                <p className="text-sm font-thin">start enjoying task tracker</p>
                <div className="h-auto ">
                   {/* toast msg */}
                   {alert.msg && <Toaster {...alert} />}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmAccount;
