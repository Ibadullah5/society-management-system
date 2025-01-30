import React from "react";
import "animate.css";

const HelloUser = ({ username }) => {
  return (
    <h1 className="text-foreground text-5xl font-bold">
      Hello{" "}
      <span className="animate__animated animate__fadeIn bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        {username}
      </span>
    </h1>
  );
};

export default HelloUser;
