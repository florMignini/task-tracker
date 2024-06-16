import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";

export const X = () => {
  return (
    <Link
      className="flex items-center justify-center"
      href="https://github.com/florMignini"
      target="_blank"
    >
              <BsTwitterX className="h-5 w-5 hover:text-slate-700" />
    </Link>
  );
};
