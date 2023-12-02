import { format } from "date-fns";
import useAuth, { useAuthType } from "../hooks/useAuth";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const { auth }: useAuthType = useAuth();

  return (
    <header className="lg:flex items-center lg:justify-between px-10 py-3">
        {/* user welcome */}
        <div className="flex ">
        <div className="w-[90%] flex items-center justify-start gap-2">
          {/* input search */}
        <div className="w-1/2 md:w-60 lg:w-80 bg-slate-200/90 flex h-[90%] p-2 items-center justify-center gap-2 rounded-xl  text-gray-500">
          <CiSearch />
          <input
            type="search"
            placeholder="search projects..."
            className="outline-none bg-transparent text-sm font-thin"
          />
        </div>
        <h5 className="text-xs font-semibold text-end text-gray-400">
            {format(new Date(), "PPP")}
          </h5>
        </div>
        <div className="hidden lg:flex  gap-2 items-center  lg:text-xl justify-end lg:w-96 text-gray-500">
            <strong>Hello,</strong>
            <h3 className="capitalize">{auth?.name}!</h3>
          </div>
        </div>
    </header>
  );
};

export default Header;
