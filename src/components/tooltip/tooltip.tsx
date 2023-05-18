import React from "react";

interface toolTipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<toolTipProps> = ({ ...props }) => {
  return (
    <div className="tooltip" data-tip={props.text}>
      {props.children}
    </div>
  );
};

export default Tooltip;
