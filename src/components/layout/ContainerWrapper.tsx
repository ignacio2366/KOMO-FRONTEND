import React from "react";
interface ContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  classname?: string;
}
export const ContainerWrapper: React.FC<ContainerProps> = ({
  children,
  style,
  classname,
}) => {
  return (
    <div
      className={`flex-col-start  container-wrapper  ${classname || ""}`}
      style={style}
    >
      {children}
    </div>
  );
};
