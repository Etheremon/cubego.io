import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { ConvertTimeUnix } from '../../../utils/utils';

require("style-loader!./Countdown.scss");

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {days: 0, hours: 0, minutes: 0, seconds: 0};
  }

  componentDidMount() {
    const { presaleDate } = this.props;
    this.interval = setInterval( () => {
      let now = Date.now();
      this.setState(
        ConvertTimeUnix(now, presaleDate)
      )
    }, 1000 );
  }

  componentWillUnmount() {
    if (this.interval)
      window.clearInterval(this.interval);
  }

  render() {
    let {_t, className} = this.props;
    let { days, hours, minutes, seconds } = this.state;

    return(
      <div className={`widget__countdown ${className && className}`}>
        <div className="group">
          <div className="days">
          {days}
          </div>
          <div className="label">
            {_t('days')}
          </div>
        </div>
        <div className="group">:</div>
        <div className="group">
          <div className="hours">
          {hours}
          </div>
          <div className="label">
            {_t('hours')}
          </div>
        </div>
        <div className="group">:</div>
        <div className="group">
          <div className="min">
          {minutes}
          </div>
          <div className="label">
            {_t('min')}
          </div>
        </div>
        <div className="group">:</div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Countdown);
