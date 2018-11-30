import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { CustomRectangleWithShadow } from '../../../widgets/SVGManager/SVGManager.jsx';
import { SubBgr } from '../../HomePage/SubBgr/SubBgr.jsx';

require("style-loader!./Tutorial.scss");

const youtubeURL = "https://www.youtube.com/embed/JzuqvnA4Jq8";

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {_t} = this.props;
    const tutorialContent = [
      {img: require('../../../../shared/img/build_tutorial/dog.png'), title: 'tutorial.template'},
      {img: require('../../../../shared/img/build_tutorial/tier.png'), title: 'tutorial.tier'},
      {img: require('../../../../shared/img/build_tutorial/stats.png'), title: 'tutorial.estimated_stats'},
      {img: require('../../../../shared/img/build_tutorial/type.png'), title: 'tutorial.type'},
      {img: require('../../../../shared/img/build_tutorial/material.png'), title: 'tutorial.material'},
      {img: require('../../../../shared/img/build_tutorial/color.png'), title: 'tutorial.color'},
    ]

    return(
      <div className="tutorial__wrapper">
        <SubBgr position={SubBgr.positions.LEFT} color={SubBgr.colors.BLUE}/>
        <div className="header">
          <CustomRectangleWithShadow />
          <div className="header__label">
            {_t('tutorial')}
          </div>
        </div>
        <div className="main-title">
          {_t('tutorial.title')}
        </div>
        {
          tutorialContent.map((item, idx) => (
            <div key={idx} className={`section ${item.title}`}>
              <img className={`content-${idx}`} src={item.img}/>
              <div className={`title ${item.title}`}>
                {_t(item.title)}
              </div>
              <p>{_t(`desc.${item.title}`)}</p>
              {
                idx === 2 ? <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.BLUE}/> : null
              }
            </div>
          ))
        }

        <iframe ref={this.videoRef} className="iframe__popup" width="100%" height="100%"
              src={youtubeURL}>
        </iframe>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutorial);
