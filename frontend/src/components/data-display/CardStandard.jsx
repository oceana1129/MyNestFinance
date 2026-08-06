import React from "react";

const CardStandard = ({ content, size = "medium" }) => {
  const paddingY = {
    small: "py-6",
    medium: "py-10",
    large: "py-16",
  };
  const styling = `flex flex-col gap-6 rounded-2xl bg-white px-10 shadow-xl max-w-4xl ${paddingY[size]} h-max justify-center`;
  return <div className={styling}>{content}</div>;
};

export default CardStandard;
