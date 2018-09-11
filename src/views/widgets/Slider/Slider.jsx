import React from "react"
import PropTypes from 'prop-types';
import {Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {getTranslate} from "react-localize-redux";

require("style-loader!./Slider.scss");


class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };

    this.selectItem = this.selectItem.bind(this);
    this.resetInterval = this.resetInterval.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  componentDidMount() {
    this.resetInterval();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  selectItem(idx) {
    this.setState({current: idx});
    this.resetInterval();
  }
  resetInterval() {
    this.clearInterval();
    this.interval = window.setInterval(() => {
      this.setState({current: (this.state.current+1) % this.props.list.length})
    }, 10000)
  }

  clearInterval() {
    if (this.interval) window.clearInterval(this.interval);
  }

  render() {
    let {className, list} = this.props;
    let {current} = this.state;

    return (
      <div className={`widget__slider ${className}`}>
        {list.map((item, idx) => (
          <div className={`item ${current === idx ? 'active' : ''}`} key={idx}>
            {item}
          </div>
        ))}
        <div className={'dots'}>
          {list.map((item, idx) => (
            <div className={`dot ${current === idx ? 'active' : ''}`} onClick={() => {this.selectItem(idx)}} key={idx}/>
          ))}
        </div>
      </div>
    );
  }

}

Slider.defaultProps = {
  className: '',
  list: [],
};

Slider.propTypes = {
  className: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);