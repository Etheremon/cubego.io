import React from "react"
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getTranslate} from "react-localize-redux";
import { Image } from "../../components/Image/Image.jsx";
import { ButtonNew } from "../Button/Button.jsx";

require("style-loader!./Carousel.scss");

const containerStyle = (state) => {
  let transformValue;
  const coord = state.orientation === Carousel.orientation.HORIZONTAL ? 'X' : 'Y';
  const direction = { flexDirection: state.orientation === Carousel.orientation.HORIZONTAL ? 'row' : 'column' };
  const width = { width: state.orientation === Carousel.orientation.HORIZONTAL ? '100%' : '60%' };

  if (!state.sliding) {
    transformValue = `translate${coord}(calc(-100%))`;
    return { transition: state.sliding ? 'none' : 'transform 1s ease',
        transform: transformValue, ...direction, ...width }
  }

  if (!state.isNext) {
    transformValue = `translate${coord}(calc(-200%))`;
    return { transition: state.sliding ? 'none' : 'transform 1s ease',
        transform: transformValue, ...direction, ...width }
  }

  transformValue = `translate${coord}(0%)`;
  return { transition: state.sliding ? 'none' : 'transform 1s ease',
          transform: transformValue, ...direction, ...width }
}

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      isNext: true,
      sliding: false,
      orientation: this.props.orientation,
    };

    this.selectItem = this.selectItem.bind(this);
    this.resetInterval = this.resetInterval.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
    this.getOrder = this.getOrder.bind(this);
  }

  componentDidMount() {
    // this.resetInterval();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  getOrder(itemIndex) {
    const { position } = this.state;
    const { list } = this.props;
    const numItems = list.length || 1;
    const offset = this.state.isNext ? 1 : 1;
    if (itemIndex < position) {
      return (numItems - Math.abs(itemIndex - position) + offset) % numItems ;
    }
    return (itemIndex - position + offset) % numItems;
  }

  selectItem(idx) {
    this.setState({position: idx});
    this.resetInterval();
  }

  resetInterval() {
    // this.clearInterval();
    // this.interval = window.setInterval(() => {
    //   this.handleChangeSlide(true);
    // }, 10000)
  }

  handleChangeSlide(isNext) {
    const offSet = isNext ? 1 : -1;
    const position = (this.state.position + offSet + this.props.list.length) % this.props.list.length;

    this.setState({
              position: position, 
              isNext: isNext, 
              sliding: true,
    });
    setTimeout(() => {
      this.setState({
        sliding: false
      })
    }, 50)
  }

  clearInterval() {
    if (this.interval) window.clearInterval(this.interval);
  }

  render() {
    let {className, list, customIndicators, orientation} = this.props;
    let {position} = this.state;
    const carouselStyle = { flexDirection: orientation === Carousel.orientation.HORIZONTAL ? 'column' : 'row' };
    const indicatorStyle = { order: orientation === Carousel.orientation.HORIZONTAL ? '2' : '0',
                            flexDirection: orientation === Carousel.orientation.HORIZONTAL ? 'row' : 'column',
                            height: '100%'  }

    return (

      <div className={`widget__carousel ${className}`} style={carouselStyle}>
        <div className="widget__carousel-list" style={containerStyle(this.state)}>
          {list.map((item, idx) => (
            <div className={`item ${position === idx ? 'active' : ''}`} key={idx} style={{ 'order': this.getOrder(idx)}}>
              {item.component ? item.component : item}
            </div>
          ))}
        </div>

        <div className={`indicators ${customIndicators ? 'custom' : ''}`} style={indicatorStyle}>
          {customIndicators ? customIndicators.map((indicator, idx) => 
            <div className={`indicator__container ${position === idx ? 'active' : ''}`} onClick={() => {this.selectItem(idx)}} key={idx} >
              {indicator}
            </div>
          ) : 
            list.map((item, idx) => {
              return  <div className={`indicator__container ${position === idx ? 'active' : ''}`} onClick={() => {this.selectItem(idx)}} key={idx} >
                        <div className={`indicator__text`} >{item.text}</div>
                        <div className="indicator"/>
                      </div>
            })
          }
          <Image img={'padding_indicator_left'} className={`padding-left ${customIndicators && 'disabled'}`} />
          <Image img={'padding_indicator_right'} className={`padding-right ${customIndicators && 'disabled'}`}/>
          
        </div>

        <div className={`nav-arrow next ${orientation}`} onClick={() => this.handleChangeSlide(true)}>
          <Image img={'icon_right_arrow'} />
        </div>

        <div className={`nav-arrow prev ${orientation}`} onClick={() => this.handleChangeSlide(false)}>
          <Image img={'icon_left_arrow'} />
        </div>
      </div>
    );
  }

}

Carousel.orientation = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

Carousel.defaultProps = {
  className: '',
  list: [],
  orientation: Carousel.orientation.HORIZONTAL,
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