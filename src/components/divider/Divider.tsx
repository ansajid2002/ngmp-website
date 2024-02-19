import React from "react";

const Divider = ({ label }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-5">
      <div className="border border-black w-[60px] lg:w-[200px]"></div>
      <div>
        <h2 className="lg:text-xl font-bold text-[#063b69] pb-1 uppercase">
          {label}
        </h2>
      </div>
      <div className="border border-black w-[60px] lg:w-[200px] "></div>
    </div>
  );
};

export default Divider;
