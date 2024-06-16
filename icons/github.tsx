import Link from "next/link";
import { VscGithub } from "react-icons/vsc";

export const Github = () => {
  return (
    <Link
      className="flex items-center justify-center "
      href="https://github.com/florMignini"
      target="_blank"
    >
      <VscGithub className="h-5 w-5 hover:text-slate-700" />
    </Link>
  );
};
