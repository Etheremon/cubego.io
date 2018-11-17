import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { CustomRectangle, CubegoFooter } from '../../widgets/SVGManager/SVGManager.jsx';
import { CUBE_TIER } from '../../../constants/cubego';

require("style-loader!./CubegoCard.scss");

const CUBEGO_COLORS = {'legend': { fill: '#70155B', stroke: '#75C3F5', shadow: '#9976D4' }, 'epic': { fill: '#F67F0A', stroke: '#75C3F5', shadow: '#EBF130' }, 'rare': { fill: '#0078FF', stroke: '#75C3F5', shadow: '#00E9FF' }, 'common': { fill: '#12314F', stroke: '#75C3F5' , shadow: '#1E5F9C'}, 'basic': { fill: '#1D3445', stroke: '#316587', shadow: '#2E5D7C' }};

export const CubegoCard = ({_t, img, name, point, tier, amount, className}) => {
  return(
    <div className={`cubego-card__container ${className && className}`}>
      <div className="border-1">
        <div className="border-2">
          <img src={img}/>
          <div className="quantity">
            <i className="fas fa-times"/>
            {amount}
          </div>
          <div className="stats">
            <div className="item">
              {_t('type')}
              <div className="value">
                {_t(CUBE_TIER[tier].name)}
              </div>
            </div>
            <div className="item">
              {_t('power_score')}
              <div className="value">
                {point}
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="type">
              <CubegoFooter shadow={CUBEGO_COLORS[CUBE_TIER[tier].name].shadow} stroke={CUBEGO_COLORS[CUBE_TIER[tier].name].stroke} fill={CUBEGO_COLORS[CUBE_TIER[tier].name].fill} />
              <span>{_t(name)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

