import { format } from "date-fns";
import useAuth, { useAuthType } from "../hooks/useAuth";

const Header = () => {
  const { auth }: useAuthType = useAuth();

  return (
    <header className="md:flex items-end md:justify-end px-10 py-3">
        {/* user welcome */}
        <div className="flex flex-col">
          <div className="flex gap-2 items-center text-xl justify-end lg:w-96 text-gray-500">
            <strong>Hello,</strong>
            <h3 className="capitalize">{auth?.name}!</h3>
          </div>
          <h5 className="text-xs font-semibold text-end text-gray-400">
            Today is {format(new Date(), "PPP")}
          </h5>
        </div>
    </header>
  );
};

export default Header;
