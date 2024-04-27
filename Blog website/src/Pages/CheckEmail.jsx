import React from "react";
import image from "/New message-amico.svg";
const CheckEmail = (props) => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-70px)]">
      <div className="text-4xl text-[#af7152] font-bold">
        {props.t("checkEmail")}
      </div>
      <img src={image} alt="" className="w-full md:w-1/3" />
    </div>
  );
};

export default CheckEmail;
