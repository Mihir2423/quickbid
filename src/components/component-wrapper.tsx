import React from "react";

type Props = {
  children: React.ReactNode;
};

export const ComponentWrapper = ({ children }: Props) => {
  return <div className="bg-gray-50 max-md:mt-16 pb-5 border rounded-md md:h-[calc(100vh-32px)] md:overflow-y-scroll">{children}</div>;
};
