// import { Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const DealBar = ({ title, icon, bgimage }) => {
  const styling = {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: "cover",
    padding: "15px",
    color: "white",
  };

  return (
    <Link href={"/"}>
      <div style={styling}>
        <span className="flex items-center gap-1 justify-center transition-all duration-500 hover:scale-105">
          {icon}
          <h2 className="text-[1.7rem] italic font-extrabold">{title}</h2>
        </span>
      </div>
    </Link>
  );
};

export default DealBar;
