import { CiSearch } from "react-icons/ci";
import useAuth, { useAuthType } from "../hooks/useAuth";
const Header = () => {
  const { auth }: useAuthType = useAuth();

  return (
    <header className="px-10 py-3">
      <div className="md:flex md:justify-between">
        {/* input search */}
        <div className="bg-white flex h-[50%] p-2 items-center justify-center gap-2 rounded-xl lg:w-80 bg-transparent">
          <CiSearch />
          <input
            type="search"
            placeholder="search projects..."
            className="outline-none bg-transparent text-sm font-thin text-gray-600"
          />
        </div>
        {/* user welcome */}
        <div className="flex flex-col">
          <div className="flex gap-2 items-center text-xl justify-end lg:w-96">
            <strong>Hello,</strong>
            <h3 className="capitalize">{auth?.name}!</h3>
          </div>
          <h5 className="text-xs text-end text-gray-500">Today is {new Date().toLocaleString() + ""}</h5>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
