import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  classname?: string;
}
export const ContainerMain: React.FC<ContainerProps> = ({
  children,
  classname,
  style,
}) => {
  return (
    <div className={`container-main ${classname || ""}`} style={style}>
      {children}
    </div>
  );
};
