import React from "react"
import PropTypes from 'prop-types';

require("style-loader!./SVGManager.scss");

export const Pentagon = ({active}) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 138 94" preserveAspectRatio="none">
        <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                <stop stopColor="#6EB2DC" offset="0%"></stop>
                <stop stopColor="#3647E8" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path d="M9,1 L129,1 C133.418278,1 137,4.581722 137,9 L137,65.6378803 C137,69.1270294 134.738671,72.2137316 131.411867,73.2656519 L71.4118667,92.2373787 C69.8422534,92.7336833 68.1577466,92.7336833 66.5881333,92.2373787 L6.58813335,73.2656519 C3.26132931,72.2137316 1,69.1270294 1,65.6378803 L1,9 C1,4.581722 4.581722,1 9,1 Z" id="Rectangle" stroke="#0B4270" strokeWidth="2" fill="#0B4270"></path>
            <path d="M13,5 L125,5 C129.418278,5 133,8.581722 133,13 L133,62.7941847 C133,66.317072 130.695496,69.4253278 127.324616,70.4489977 L71.3246158,87.4550939 C69.8090436,87.9153433 68.1909564,87.9153433 66.6753842,87.4550939 L10.6753842,70.4489977 C7.30450383,69.4253278 5,66.317072 5,62.7941847 L5,13 C5,8.581722 8.581722,5 13,5 Z" id="Rectangle" stroke="#F4FBFD" strokeWidth={`${active ? "2" : "0"}`} fill="url(#linearGradient-1)"></path>
        </g>
    </svg>
  )
}

Pentagon.defaultProps = {
  active: false,
};

export const CustomRectangle = ({tier, fill, strokeWidth}) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 692 206" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <defs>
            <linearGradient x1="99.0617944%" y1="99.3010462%" x2="0%" y2="10.3323555%" id="customrectangle-gradient-pack">
                <stop stopColor="#C30D46" offset="0%"></stop>
                <stop stopColor="#FFFF00" offset="50%"></stop>
                <stop stopColor="#C30D46" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="99.0617944%" y1="99.3010462%" x2="0%" y2="10.3323555%" id="customrectangle-gradient-epic">
                <stop stopColor="#FF4F02" offset="0%"></stop>
                <stop stopColor="#FFFF00" offset="50%"></stop>
                <stop stopColor="#FF6D00" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="99.0617944%" y1="99.3010462%" x2="0%" y2="10.3323555%" id="customrectangle-gradient-rare">
                <stop stopColor="#9DF2F1" offset="0%"></stop>
                <stop stopColor="#9DF2F1" offset="50%"></stop>
                <stop stopColor="#9DF2F1" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path d="M5,23.6432469 L5,200.162356 L687,200.162356 L687,23.6432469 C573.176134,11.222086 459.509728,5.01159184 346,5.01159184 C232.490272,5.01159184 118.823866,11.222086 5,23.6432469 Z" id="Rectangle-2" stroke={`url(#customrectangle-gradient-${tier})`} fill={fill} strokeWidth={strokeWidth}></path>
        </g>
    </svg>
  )
}

CustomRectangle.defaultProps = {
  tier: 'pack',
  fill: '#12314F',
  strokeWidth: 15,
};

export const QuantityBar = ({nextOnClick, prevOnClick}) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 742 233" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
      <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
              <stop stopColor="#57EDFF" offset="0%"></stop>
              <stop stopColor="#074FD0" offset="100%"></stop>
          </linearGradient>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect id="Rectangle-3" fill="#283440" x="163" y="0" width="415" height="233"></rect>
          <polygon onClick={() => {prevOnClick && prevOnClick()}} id="quantity-bar__prev-button" fill="url(#linearGradient-1)" transform="translate(81.734304, 116.500000) scale(-1, 1) translate(-81.734304, -116.500000) " points="0 0 102.434225 0 163.468608 116.5 102.434225 233 0 233"></polygon>
          <polygon onClick={() => {nextOnClick && nextOnClick()}} id="quantity-bar__next-button" fill="url(#linearGradient-1)" points="578 0 680.434225 0 741.468608 116.5 680.434225 233 578 233"></polygon>
          <path d="M55.5,117.25 L124.5,117.25" id="subtract" stroke="#283440" strokeWidth="8" strokeLinecap="square"></path>
          <path d="M611.5,117.25 L680.5,117.25" id="plus" stroke="#283440" strokeWidth="8" strokeLinecap="square"></path>
          <path d="M646,83 L646,152" id="plus" stroke="#283440" strokeWidth="8" strokeLinecap="square"></path>
      </g>
  </svg>
  )
}