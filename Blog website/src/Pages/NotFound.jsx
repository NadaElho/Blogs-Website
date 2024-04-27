import React from "react";
import img from "/not-found.svg";
const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-70px)]">
      <img src={img} className="w-1/2 md:w-1/3" alt="" />
    </div>
  );
};

export default NotFound;
