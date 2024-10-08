import React from "react";

type Props = {
  children: React.ReactNode;
};

export const ComponentWrapper = ({ children }: Props) => {
  return <div className="py-20">{children}</div>;
};
