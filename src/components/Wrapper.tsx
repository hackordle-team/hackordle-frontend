import React from "react";
import clsx from "clsx";

interface WrapperProps {
  disablePadding?: boolean;
  children?: React.ReactNode;
  center?: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({ disablePadding, children, center }) => {
  return (
    <div
      className={clsx("w-full h-full bg-gray-700", !disablePadding && "p-8", center && "m-auto")}
    >
      {children}
    </div>
  );
};

export default Wrapper;
