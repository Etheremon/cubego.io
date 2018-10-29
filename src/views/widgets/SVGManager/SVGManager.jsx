import React from "react"
import PropTypes from 'prop-types';

require("style-loader!./SVGManager.scss");

export const Pentagon = ({active}) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 350 237" preserveAspectRatio="none">
        <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                <stop stopColor="#29B7CB" offset="0%"></stop>
                <stop stopColor="#3645E8" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2">
                <stop stopColor="#2ED0DD" offset="0%"></stop>
                <stop stopColor="#4488EF" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path d="M30,5 L320,5 C333.807119,5 345,16.1928813 345,30 L345,162.613613 C345,173.660948 337.749107,183.398531 327.165234,186.564801 L182.165234,229.942982 C177.490758,231.341397 172.509242,231.341397 167.834766,229.942982 L22.8347657,186.564801 C12.2508935,183.398531 5,173.660948 5,162.613613 L5,30 C5,16.1928813 16.1928813,5 30,5 Z" id="Rectangle" stroke="#0B4270" strokeWidth="10" fill="#37B4E4"></path>
            <path d="M28,14.3598675 L321,14.3598675 C328.731986,14.3598675 335,20.627881 335,28.3598675 L335,163.549549 C335,169.738482 330.936372,175.193063 325.00625,176.964092 L178.50625,220.716286 C175.892454,221.496896 173.107546,221.496896 170.49375,220.716286 L23.9937496,176.964092 C18.0636278,175.193063 14,169.738482 14,163.549549 L14,28.3598675 C14,20.627881 20.2680135,14.3598675 28,14.3598675 Z" id="innerlayer" stroke={active ? '#FFFFFF' : '#0B4270'} strokeWidth="10"></path>
            <rect id="Rectangle-3" fill="#DCE5FE" x="19" y="18" width="312" height="26" rx="10"></rect>
            <g id="Group" transform="translate(19.000000, 26.000000)">
                <path d="M13.9631204,125 L298.03688,125 C304.091644,125 309,129.908356 309,135.96312 L309,135.96312 C309,142.42755 304.652807,148.083881 298.406073,149.747362 L160.940704,186.353855 C157.703312,187.21596 154.296688,187.21596 151.059296,186.353855 L13.5939266,149.747362 C7.34719294,148.083881 3,142.42755 3,135.96312 L3,135.96312 C3,129.908356 7.90835617,125 13.9631204,125 Z" id="Rectangle" stroke="#5603D1" strokeWidth="6.72"></path>
                <path d="M16,0 L297,0 C305.836556,-1.623249e-15 313,7.163444 313,16 L313,130.846388 C313,138.028772 308.213881,144.331028 301.295127,146.259106 L160.795127,185.412829 C157.985242,186.195871 155.014758,186.195871 152.204873,185.412829 L11.7048733,146.259106 C4.78611925,144.331028 -8.96768454e-16,138.028772 -1.77635684e-15,130.846388 L0,16 C-1.082166e-15,7.163444 7.163444,8.72867636e-15 16,7.10542736e-15 Z" id="Rectangle" fill="url(#linearGradient-1)"></path>
                <path d="M147.062588,0 L297,0 C305.836556,-1.623249e-15 313,7.163444 313,16 L313,34.5005057 L138.402926,181.004846 L11.7172082,145.810032 C4.79233499,143.886219 -1.36631049e-14,137.581018 -1.77635684e-15,130.393882 L-1.6677554e-15,123.400163 L147.062588,0 Z" id="Combined-Shape" fill="url(#linearGradient-2)"></path>
            </g>
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
        <g id="CustomRectangle" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
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

export const ArrowDown = ({}) => {
    return (
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 752 363" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <defs></defs>
            <g class="arrow-down" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" stroke-linecap="square">
                <polyline class="line-1" stroke="#FFFFFF" stroke-width="10" points="5.5 119.5 376 357.275603 746.5 119.5"></polyline>
                <polyline class="line-2" stroke="#FFFFFF" stroke-width="10" points="102 5 376 181 650 5"></polyline>
            </g>
        </svg>
    )
}