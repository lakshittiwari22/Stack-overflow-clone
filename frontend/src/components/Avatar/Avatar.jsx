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
    width: px,
    height: py,
    color: color || "black",
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration: "none",
  };

  return (
    <div style={style} className="avatar-outer">
      {children}
    </div>
  );
};

export default Avatar;
