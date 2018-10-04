import React from "react";

require("style-loader!./Icon.scss");


export const Icon = ({name}) => {
  return (
    <i className={`${name}`}/>
  );
};
