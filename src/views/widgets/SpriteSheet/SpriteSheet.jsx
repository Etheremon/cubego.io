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
    this.window.style.paddingTop = `${this.props.frameHeight/this.props.frameWidth*100}%`;
    let windowNode = ReactDOM.findDOMNode(this.window);
    this.realImage.style.width = `${windowNode.clientWidth * this.props.cols}px`;
  }

  startPlay() {
    this.stopPlay();
    this.interval = setInterval(() => {
      this.window.style.paddingTop = `${this.props.frameHeight/this.props.frameWidth*100}%`;
      let windowNode = ReactDOM.findDOMNode(this.window);
      this.realImage.style.width = `${windowNode.clientWidth * this.props.cols}px`;

      this.pos = (this.pos + 1) % this.props.steps;
      let row = Math.floor(this.pos / this.props.cols);
      let col = this.pos % this.props.cols;

      this.image.style.top = `${-row*100}%`;
      this.image.style.left = `${-col*100}%`;
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
            <img src={image} ref={(img) => {this.realImage = img}}/>
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