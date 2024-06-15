import Image from "next/image";
import Link from "next/link";

import LogoImg from "../public/task-tracker-favicon-white.png"

export const Logo = () => {
return (
    <Link href="/">
        <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex ">
            <Image
            src={LogoImg}
            alt="Logo Image"
            height={30}
            width={30}
            />
            <p
            className="text-lg flex items-center text-white pb-1 font-bold"
            >Task Tracker</p>
        </div>
    </Link>
)

}

export default Logo;