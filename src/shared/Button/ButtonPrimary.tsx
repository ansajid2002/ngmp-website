import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps { }

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  bgcolor="",
  ...args
}) => {
  return (
    <Button
      className={` ${bgcolor ? bgcolor : "bg-gray-900 dark:bg-gray-100 hover:bg-gray-800"}  ttnc-ButtonPrimary disabled:bg-opacity-90  text-gray-50 dark:text-gray-800 shadow-xl ${className}`}
      {...args}

    />
  );
};

export default ButtonPrimary;
