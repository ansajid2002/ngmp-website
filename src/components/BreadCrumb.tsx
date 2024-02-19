import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const BreadCrumb = ({ label1, label2 }) => {
  return (
    <div className="py-3 md:py-5 px-5    md:px-10">
      <ul className="flex gap-1 text-sm items-center font-medium text-gray-700">
        <li>
          <Link href={"/"}>{label1}</Link>
        </li>
        <ChevronRight size={20} />
        <li>{label2}</li>
      </ul>
    </div>
  );
};

export default BreadCrumb;
