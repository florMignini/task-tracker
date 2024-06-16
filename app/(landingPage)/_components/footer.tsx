import { Github, Instagram, X } from "@/icons";

export const Footer = () => {
    let year = new Date().getFullYear();
  return (
    <div className="fixed bottom-0 w-full h-16 px-4 bg-[#dae6da] shadow-inner rounded-t-lg">
      <div className="md:max-w-screen-2xl mx-auto flex flex-col items-center w-full justify-center text-slate-500 py-3">
        <div className="flex items-center justify-center space-x-4 mb-2">
            <Github />
            <Instagram />
            <X />
        </div>
        <div>
        <p className="text-xs text-center">
          {`Copyright \u00A9 ${year} Task Tracker. All rights reserved.`}
        </p>
      </div>
      </div>
      
    </div>
  );
};
