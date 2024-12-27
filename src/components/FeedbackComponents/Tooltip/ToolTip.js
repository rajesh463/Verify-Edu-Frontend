// Tooltip.tsx
import React from "react";
import "./ToolTip.css"; // Update this CSS file for tooltip styles

const Tooltip = ({ children, text }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">{text}</span>
    </div>
  );
};

export default Tooltip;
