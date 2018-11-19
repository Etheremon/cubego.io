import React from "react"
import PropTypes from 'prop-types';

require("style-loader!./SVGManager.scss");

export const Pentagon = ({active}) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 382 268" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <defs>
            <path d="M46,21 L336,21 C349.807119,21 361,32.1928813 361,46 L361,178.613613 C361,189.660948 353.749107,199.398531 343.165234,202.564801 L198.165234,245.942982 C193.490758,247.341397 188.509242,247.341397 183.834766,245.942982 L38.8347657,202.564801 C28.2508935,199.398531 21,189.660948 21,178.613613 L21,46 C21,32.1928813 32.1928813,21 46,21 Z" id="path-1"></path>
            <filter x="-8.5%" y="-12.8%" width="117.1%" height="125.5%" filterUnits="objectBoundingBox" id="filter-2">
                <feMorphology radius="8" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                <feColorMatrix values="0 0 0 0 0.745098039   0 0 0 0 0.952941176   0 0 0 0 0.996078431  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
            </filter>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-3">
                <stop stopColor="#29B7CB" offset="0%"></stop>
                <stop stopColor="#3645E8" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
                <stop stopColor="#2ED0DD" offset="0%"></stop>
                <stop stopColor="#4488EF" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Rectangle">
                <use fill="black" fillOpacity="1" filter="url(#filter-2)" href="#path-1"></use>
                <use stroke="#0B4270" strokeWidth="10" fill="#37B4E4" fillRule="evenodd" href="#path-1"></use>
            </g>
            <path d="M44,30.0375282 L338,30.0375282 C345.731986,30.0375282 352,36.3055417 352,44.0375282 L352,179.724467 C352,185.9134 347.936372,191.367981 342.00625,193.13901 L195.00625,237.040529 C192.392454,237.821139 189.607546,237.821139 186.99375,237.040529 L39.9937496,193.13901 C34.0636278,191.367981 30,185.9134 30,179.724467 L30,44.0375282 C30,36.3055417 36.2680135,30.0375282 44,30.0375282 Z" id="innerlayer" stroke={active ? '#FFFFFF' : '#0B4270'} strokeWidth="10"></path>
            <rect id="Rectangle-3" fill="#DCE5FE" x="35" y="34" width="312" height="26" rx="10"></rect>
            <path d="M48.9631204,167 L333.03688,167 C339.091644,167 344,171.908356 344,177.96312 L344,177.96312 C344,184.42755 339.652807,190.083881 333.406073,191.747362 L195.940704,228.353855 C192.703312,229.21596 189.296688,229.21596 186.059296,228.353855 L48.5939266,191.747362 C42.3471929,190.083881 38,184.42755 38,177.96312 L38,177.96312 C38,171.908356 42.9083562,167 48.9631204,167 Z" id="Rectangle" stroke="#5603D1" strokeWidth="6.72"></path>
            <path d="M51,42 L332,42 C340.836556,42 348,49.163444 348,58 L348,172.846388 C348,180.028772 343.213881,186.331028 336.295127,188.259106 L195.795127,227.412829 C192.985242,228.195871 190.014758,228.195871 187.204873,227.412829 L46.7048733,188.259106 C39.7861193,186.331028 35,180.028772 35,172.846388 L35,58 C35,49.163444 42.163444,42 51,42 Z" id="Rectangle" fill="url(#linearGradient-3)"></path>
            <path d="M182.062588,42 L332,42 C340.836556,42 348,49.163444 348,58 L348,76.5005057 L173.402926,223.004846 L46.7172082,187.810032 C39.792335,185.886219 35,179.581018 35,172.393882 L35,165.400163 L182.062588,42 Z" id="Combined-Shape" fill="url(#linearGradient-4)"></path>
        </g>
    </svg>
  )
}

Pentagon.defaultProps = {
  active: false,
};

export const CubegoFooter = ({stroke, fill, shadow}) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 692 261" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <defs>
            <path d="M0,19.1507638 C115.493567,6.38358794 230.8269,4.27055815e-15 346,0 C461.1731,0 576.506433,6.38358794 692,19.1507638 L692,205.150764 C576.666667,205.150764 461.333333,205.150764 346,205.150764 C230.666667,205.150764 115.333333,205.150764 0,205.150764 L0,19.1507638 Z" id="cubego-path-filter"></path>
            <filter x="-2.3%" y="-7.8%" width="104.6%" height="115.6%" filterUnits="objectBoundingBox" id="cubego-filter">
                <feMorphology radius="16" operator="erode" in="SourceAlpha" result="shadowSpreadInner1"></feMorphology>
                <feGaussianBlur stdDeviation="8" in="shadowSpreadInner1" result="shadowBlurInner1"></feGaussianBlur>
                <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
                <feColorMatrix values="0 0 0 0 0.857408588   0 0 0 0 0.857408588   0 0 0 0 0.857408588  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
            </filter>
        </defs>
        <g id="cubego-footer" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Rectangle-2">
                <use fill={fill} fillRule="evenodd" href="#cubego-path-filter"></use>
                <use fill={'blue'} fillOpacity="1" filter="url(#cubego-filter)" href="#cubego-path-filter"></use>
                <path stroke={stroke} strokeWidth="10" d="M5,23.631655 L5,200.150764 C173.016371,200.150764 174.682932,200.150764 346,200.150764 C517.317068,200.150764 518.983629,200.150764 687,200.150764 L687,23.631655 C573.176134,11.2104941 459.509728,5 346,5 C232.490272,5 118.823866,11.2104941 5,23.631655 Z" strokeLinejoin="square"></path>
            </g>
            <polygon id="Path-2" fill="#043E63" points="12.0456242 205 4.814599 260.354955 682.568042 205"></polygon>
        </g>
    </svg>
  )
}

CubegoFooter.defaultProps = {
  stroke: '#FFFFFF',
  fill: '#12314F',
  shadow: '#FFFFFF',
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
            <linearGradient x1="99.0617944%" y1="99.3010462%" x2="0%" y2="10.3323555%" id="customrectangle-gradient-referral">
                <stop stopColor="#75C3F5" offset="0%"></stop>
                <stop stopColor="#75C3F5" offset="50%"></stop>
                <stop stopColor="#75C3F5" offset="100%"></stop>
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

export const ArrowDown = ({}) => {
    return (
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 752 363" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <defs/>
            <g className="arrow-down" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
                <polyline className="line-1" stroke="#FFFFFF" strokeWidth="20" points="5.5 119.5 376 357.275603 746.5 119.5"/>
                <polyline className="line-2" stroke="#FFFFFF" strokeWidth="20" points="102 5 376 181 650 5"/>
            </g>
        </svg>
    )
}

export const DiscountFrame = ({text}) => {
    return (
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 3716 2243" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <defs>
                <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="discount-1">
                    <stop stopColor="#50457D" offset="0%"></stop>
                    <stop stopColor="#B1C250" offset="41.9594473%"></stop>
                    <stop stopColor="#891D48" offset="100%"></stop>
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="discount-2">
                    <stop stopColor="#542F44" offset="0%"></stop>
                    <stop stopColor="#CE000C" offset="52.4092305%"></stop>
                    <stop stopColor="#6C0A18" offset="100%"></stop>
                </linearGradient>
            </defs>
            <g id="discount-frame" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <polygon id="Path-3" fill="#50030E" points="2722.51663 0 2675 142.226793 2815 92.523309"></polygon>
                <polygon id="Path-3" fill="#50030E" transform="translate(3638.931388, 980.442734) rotate(118.000000) translate(-3638.931388, -980.442734) " points="3615.27297 900.765461 3565.27297 1060.12001 3712.5898 1004.43095"></polygon>
                <rect id="Rectangle-8" stroke="url(#discount-1)" strokeWidth="30" x="25" y="113" width="3552" height="2105"></rect>
                <polygon id="Rectangle-9" fill="url(#discount-2)" transform="translate(3340.002800, 382.002800) rotate(-45.000000) translate(-3340.002800, -382.002800) " points="3173.39029 1090.79245 3173.39029 -326.786846 3506.61531 18.0825465 3506.61531 749.258096"></polygon>
                <text id="Save-5%" transform="translate(3320.553391, 381.553391) rotate(45.000000) translate(-3320.553391, -381.553391) " fill="#E9C303">
                    <tspan x="2934.55339" y="421.553391">{text}</tspan>
                </text>
            </g>
        </svg>
    )
}