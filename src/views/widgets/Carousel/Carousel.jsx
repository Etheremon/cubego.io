import React from "react"
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getTranslate} from "react-localize-redux";
import { Image } from "../../components/Image/Image.jsx";

require("style-loader!./Carousel.scss");


class Carousel extends React.Component {
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

  handleChangeSlide(isNext=true) {
    const offSet = isNext ? 1 : -1;
    this.setState((state, props) => {
      return {current: (this.state.current + offSet + this.props.list.length) % this.props.list.length};
    });
  }

  clearInterval() {
    if (this.interval) window.clearInterval(this.interval);
  }

  render() {
    let {className, list} = this.props;
    let {current} = this.state;

    return (
      <div className={`widget__carousel ${className}`}>
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

        <div className="nav-arrow next" onClick={() => this.handleChangeSlide(true)}>
          <Image img={'icon_right_arrow'} />
        </div>

        <div className="nav-arrow prev" onClick={() => this.handleChangeSlide(false)}>
          <Image img={'icon_left_arrow'} />
        </div>
      </div>
    );
  }

}

Carousel.defaultProps = {
  className: '',
  list: [],
};

Carousel.propTypes = {
  className: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carousel);