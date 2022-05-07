import React from "react";
import clsx from "clsx";

interface WrapperProps {
  disablePadding?: boolean;
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ disablePadding, children }) => {
  return (
    <div
      className={clsx("w-full h-full bg-gray-700", !disablePadding && "p-8")}
    >
      {children}
    </div>
  );
};

export default Wrapper;
