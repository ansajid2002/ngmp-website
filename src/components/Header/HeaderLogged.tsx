import React, { FC, useEffect, useState } from "react";
import MainNav2Logged from "./MainNav2Logged";

const HeaderLogged = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const shouldTrigger = Math.abs(currentScrollPos - prevScrollPos) >= 50;

      if (shouldTrigger) {
        setVisible(prevScrollPos >= currentScrollPos);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  return (
    <div
      className={`fixed w-full z-40 transition-all duration-300 ${visible ? "top-0" : "-top-40"
        }`}
    >
      <MainNav2Logged />
    </div>
  );
};

export default HeaderLogged;
