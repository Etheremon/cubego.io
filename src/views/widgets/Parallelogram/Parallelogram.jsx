import React from "react"
import PropTypes from 'prop-types';

require("style-loader!./Parallelogram.scss");


export const Parallelogram = ({ className, children }) => {
  return (
    <div className={`widget__parallelogram ${className && className}`}>
      <div className="main-content">
      
        <div className="border-layer">
        
          <div className="content">
            {
              children
            }
          </div>
        
        </div>
      </div>
      <div className="shadow-layer"></div>
    </div>
  )
}

Parallelogram.defaultProps = {
  className: '',

};