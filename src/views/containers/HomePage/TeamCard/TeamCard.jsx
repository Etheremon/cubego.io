import React from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {getTranslate} from 'react-localize-redux'

require("style-loader!./TeamCard.scss");

class TeamCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { _t, img, name, desc } = this.props;

    return (
      <div className="team-card__container">
        <div className="avatar">
          <div className="border">
            <img src={img}/>
          </div>
        </div>
        <div className="name">
        {name}
        </div>
        <div className="description">
        {_t(desc)}
        </div>
        <div className="portfolio">
          {/* <i class="fab fa-twitter-square"></i>
          <i class="fab fa-linkedin"></i> */}
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
