import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] bg-transparent">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/55 to-primary/15 animate-ping"></div>

        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin shadow-[0_0_20px_#286a25]"></div>
      </div>
    </div>
  );
};

export default Loader;
