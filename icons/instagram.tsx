import Link from "next/link";
import { BsInstagram } from "react-icons/bs";

export const Instagram = () => {
  return (
    <Link
      className="flex items-center justify-center"
      href="https://github.com/florMignini"
      target="_blank"
    >
              <BsInstagram className="h-5 w-5 hover:text-slate-700" />
    </Link>
  );
};
