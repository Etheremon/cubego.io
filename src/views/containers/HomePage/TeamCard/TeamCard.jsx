import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import * as Utils from "../../../../utils/utils";

require("style-loader!./TeamCard.scss");

class TeamCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { _t, img, name, desc, twitter, linkedin } = this.props;

    return (
      <div className="team-card__container">
        <div className="avatar">
          <div className="border">
            <div className={'img'} style={{
              backgroundImage: `url(${img})`
            }}/>
          </div>
        </div>
        <div className="name">
        {name}
        </div>
        <div className="description">
          <div className={'desc-content'}>{_t(desc)}</div>
        </div>
        <div className="portfolio">
          {linkedin ? <i className="fab fa-linkedin" onClick={() => Utils.OpenInNewTab(linkedin)}/> : null}
          {twitter ? <i className="fab fa-twitter-square" onClick={() => Utils.OpenInNewTab(twitter)}/> : null}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamCard);
