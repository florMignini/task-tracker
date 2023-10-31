import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <main className="container mx-auto md:mt-20 md:flex md:justify-center">
      <div className="md:w-2/3 lg:1/2">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
