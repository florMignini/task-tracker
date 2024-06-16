import Logo from "@/components/logo";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 shadow-lg backdrop-blur-xl">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between text-black">
        <Logo />
        <div className=" h-auto space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <button className="bg-gradient-to-r from-purple-500 to-purple-900 py-auto px-2 h-9 rounded-lg shadow-slate-300 shadow-sm text-white font-normal hover:opacity-80 hover:shadow-inner">
            <Link href="/login">Login</Link>{" "}
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-purple-900 py-auto px-2 h-9 rounded-lg shadow-slate-300 shadow-sm text-white font-normal hover:opacity-80 hover:shadow-inner">
            <Link href="/sign-up">Get started</Link>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
