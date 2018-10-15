import React from "react"
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

require("style-loader!./SpriteSheet.scss");


export class SpriteSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.init = this.init.bind(this);
    this.startPlay = this.startPlay.bind(this);
    this.stopPlay = this.stopPlay.bind(this);

    this.pos = -1;
  }

  componentDidMount() {
    this.init();
    this.startPlay();
  }

  componentWillUnmount() {
    this.stopPlay();
  }

  init() {
    this.window.style.height = `${this.props.frameHeight}px`;
    this.window.style.width = `${this.props.frameWidth}px`;
  }

  startPlay() {
    this.stopPlay();
    this.interval = setInterval(() => {
      this.pos = (this.pos + 1) % this.props.steps;
      let row = Math.floor(this.pos / this.props.cols);
      let col = this.pos % this.props.cols;

      this.image.style.top = `${-row*this.props.frameHeight}px`;
      this.image.style.left = `${-col*this.props.frameWidth}px`;

      let wrapperNode = ReactDOM.findDOMNode(this.wrapper);
      this.window.style.transform = `scale(${wrapperNode.clientWidth/this.props.frameWidth})`;
      this.window.style.transformOrigin = `0 0`;
      this.wrapper.style.height = `${wrapperNode.clientWidth/this.props.frameWidth*this.props.frameHeight}px`;
    }, 1000 / this.props.fps)
  }

  stopPlay() {
    if (this.interval) window.clearInterval(this.interval);
  }

  render() {
    let {image, className} = this.props;

    return (
      <div className={`widget__sprite-sheet ${className}`} ref={(wrapper) => {this.wrapper = wrapper}}>
        <div className={`widget__sprite-window`} ref={(window) => {this.window = window}}>
          <div className={`widget__image-holder`} ref={(img) => {this.image = img}}>
            <img src={image}/>
          </div>
        </div>
      </div>
    )
  }
}

SpriteSheet.defaultProps = {
  className: '',
};

SpriteSheet.propTypes = {
  image: PropTypes.any,
  frameWidth: PropTypes.number,
  frameHeight: PropTypes.number,
  steps : PropTypes.number,
  cols: PropTypes.number,
  fps: PropTypes.number,
  className: PropTypes.string,
};