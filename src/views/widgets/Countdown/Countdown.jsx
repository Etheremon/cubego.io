import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { ConvertTimeUnix } from '../../../utils/utils';
import PropTypes from "prop-types";

require("style-loader!./Countdown.scss");

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {days: 0, hours: 0, minutes: 0, seconds: 0};
  }

  componentDidMount() {
    const { targetTime, onFinishCountdown} = this.props;
    this.interval = setInterval( () => {
      let now = Date.now();
      this.setState(
        ConvertTimeUnix(now, targetTime, false)
      )

      if (this.state.days === 0 && this.state.hours === 0 && this.state.minutes === 0 && this.state.seconds === 0) {
        onFinishCountdown && onFinishCountdown()
        window.clearInterval(this.interval);
      }

    }, 1000 );
  }

  componentWillUnmount() {
    if (this.interval)
      window.clearInterval(this.interval);
  }

  render() {
    let {_t, className} = this.props;
    let { days, hours, minutes, seconds, showDays, showText } = this.state;

    return(
      <div className={`widget__countdown ${className && className} ${showText ? 'show-text' : ''}`}>
        {showDays ?
          <React.Fragment>
            <div className="group">
              <div className="days">
                {days}
              </div>
              <div className="label">
                {_t('days')}
              </div>
            </div>
            <div className="group colon">:</div>
          </React.Fragment> : null
        }

        <div className="group">
          <div className="hours">
          {hours}
          </div>
          <div className="label">
            {_t('hours')}
          </div>
        </div>
        <div className="group colon">:</div>
        <div className="group">
          <div className="min">
          {minutes}
          </div>
          <div className="label">
            {_t('mins')}
          </div>
        </div>
        <div className="group colon">:</div>
        <div className="group">
          <div className="sec">
          {seconds}
          </div>
          <div className="label">
            {_t('sec')}
          </div>
        </div>
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


Countdown.propTypes = {
  showDays: PropTypes.bool,
  showText: PropTypes.bool,
};

Countdown.defaultProps = {
  showDays: true,
  showText: true,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Countdown);
