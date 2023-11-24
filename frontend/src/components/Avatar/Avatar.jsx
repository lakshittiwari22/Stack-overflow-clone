import React from "react";
import "./avatar.css";
const Avatar = ({
  children,
  backgroundColor,
  px,
  py,

  color,
  borderRadius,
  fontSize,
  cursor,
}) => {
  const style = {
    backgroundColor,
    padding: `${py} ${px}`,
    color: color || "black",
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration: "none",
  };

  return (
    <div style={style}>
      <div className="inner">{children}</div>
    </div>
  );
};

export default Avatar;
