import React, { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:pl-10 lg:pr-20 ${className}`}>
      {children}
    </div>
  );
}
