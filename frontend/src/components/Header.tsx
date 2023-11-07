import { CiSearch } from "react-icons/ci";
import useAuth, { useAuthType } from "../hooks/useAuth";
const Header = () => {
  const { auth }: useAuthType = useAuth();

  return (
    <header className="pl-10 p-2 bg-white border-b">
      <div className="md:flex md:justify-between">
        {/* user welcome */}
        <div className="flex flex-col">
          <div className="flex gap-2 items-center text-2xl justify-start lg:w-96">
            <strong>Hello,</strong>
            <h3 className="capitalize">{auth?.name}!</h3>
          </div>
          <h5 className="text-sm text-gray-500">Today is {new Date().toLocaleString() + ""}</h5>
        </div>
        {/* input search */}
        <div className="flex p-0 items-center justify-center gap-2 rounded-xl lg:w-80 border">
          <CiSearch />
          <input
            type="search"
            placeholder="search projects..."
            className="outline-none"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
