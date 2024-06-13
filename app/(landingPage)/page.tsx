const LandingPage = () => {
    return (
      <div className="flex items-center justify-start flex-col">
        <div className="w-[80%] h-[120px] md:h-[100px] mx-auto">
          {/* main title */}
          <h1 className="text-3xl text-center md:text-4xl font-bold">
            Manage your tasks, schedule and activities easily with Task Tracker.
          </h1>
          <div className="w-[70%] mx-auto flex items justify-center">
              {/* second title */}
              <h4 className="text-center text-gray-200 font-thin text-sm">
                  Quickly write down tasks, notes, activities and have them organized the way you prefer. 
              </h4>
          </div>
          {/* button section */}
          <div className="w-[80%] h-[100px] mx-auto flex items-center justify-center gap-5">
              <button className="bg-gradient-to-r from-purple-500 to-purple-900 p-2 h-11 rounded-lg shadow-slate-300 shadow-sm text-white font-semibold hover:opacity-80 hover:shadow-inner">
                  Get started for free
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-purple-900 p-2 h-11 rounded-lg shadow-slate-300 shadow-sm text-white font-semibold hover:opacity-80 hover:shadow-inner">
                  See demo
              </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LandingPage;