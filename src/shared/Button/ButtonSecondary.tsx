import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps { }

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " border border-gray-300 dark:border-gray-700 ",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
