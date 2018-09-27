import React from "react"
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import * as Utils from "../../../utils/utils";

require("style-loader!./InputRange.scss");

const constants = {
  orientation: {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      reverseDirection: 'right',
      coordinate: 'x'
    },
    vertical: {
      dimension: 'height',
      direction: 'top',
      reverseDirection: 'bottom',
      coordinate: 'y'
    }
  }
}

class InputRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      limit: 0,
      grab: 0
    };
  }

  componentDidMount () {
    this.handleUpdate();
    const resizeObserver = new ResizeObserver(this.handleUpdate);
    resizeObserver.observe(this.slider);
  }

  handleFormat (value) {
    const { format } = this.props;
    return format ? format(value) : value;
  }

  handleUpdate () {
    if (!this.slider) {
      // for shallow rendering
      return;
    }
    const { orientation } = this.props;
    const dimension = Utils.capitalize(constants.orientation[orientation].dimension);
    const sliderPos = this.slider[`offset${dimension}`];
    const handlePos = this.handle[`offset${dimension}`];

    this.setState({
      limit: sliderPos - handlePos,
      grab: handlePos / 2
    })

    this.handleStart = this.handleStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getPositionFromValue = this.getPositionFromValue.bind(this);
    this.getValueFromPosition = this.getValueFromPosition.bind(this);
    this.position = this.position.bind(this);
    this.coordinates = this.coordinates.bind(this);
    this.renderLabels = this.renderLabels.bind(this);
  };

  handleStart (e) {
    const { onChangeStart } = this.props;
    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleEnd);
    this.setState(
      {
        active: true
      },
      () => {
        onChangeStart && onChangeStart(e)
      }
    )
  };

  handleDrag (e) {
    e.stopPropagation()
    const { onChange } = this.props;
    const { target: { className, classList, dataset } } = e;
    if (!onChange || className === 'rangeslider__labels') return;

    let value = this.position(e)

    if (
      classList &&
      classList.contains('rangeslider__label-item') &&
      dataset.value
    ) {
      value = parseFloat(dataset.value)
    }

    onChange && onChange(value, e)
  };

  handleEnd (e) {
    const { onChangeComplete } = this.props;
    this.setState(
      {
        active: false
      },
      () => {
        onChangeComplete && onChangeComplete(e)
      }
    )
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleEnd);
  };

  handleKeyDown (e) {
    e.preventDefault();
    const { keyCode } = e;
    const { value, min, max, step, onChange } = this.props;
    let sliderValue;

    switch (keyCode) {
      case 38:
      case 39:
        sliderValue = value + step > max ? max : value + step
        onChange && onChange(sliderValue, e)
        break
      case 37:
      case 40:
        sliderValue = value - step < min ? min : value - step
        onChange && onChange(sliderValue, e)
        break
    }
  };

  getPositionFromValue (value) {
    const { limit } = this.state;
    const { min, max } = this.props;
    const diffMaxMin = max - min;
    const diffValMin = value - min;
    const percentage = diffValMin / diffMaxMin;
    const pos = Math.round(percentage * limit);

    return pos;
  };

  getValueFromPosition (pos) {
    const { limit } = this.state;
    const { orientation, min, max, step } = this.props;
    const percentage = Utils.clamp(pos, 0, limit) / (limit || 1);
    let baseVal = step * (percentage * (max - min) / step);
    baseVal = this.props.isContinous ? Math.round(baseVal) : baseVal;
    const value = orientation === 'horizontal' ? baseVal + min : max - baseVal;

    return Utils.clamp(value, min, max);
  };

  position (e) {
    const { grab } = this.state;
    const { orientation, reverse } = this.props;

    const node = this.slider;
    const coordinateStyle = constants.orientation[orientation].coordinate;
    const directionStyle = reverse
      ? constants.orientation[orientation].reverseDirection
      : constants.orientation[orientation].direction;
    const clientCoordinateStyle = `client${Utils.capitalize(coordinateStyle)}`;
    const coordinate = !e.touches
      ? e[clientCoordinateStyle]
      : e.touches[0][clientCoordinateStyle];

    const direction = node.getBoundingClientRect()[directionStyle];
    const pos = reverse
      ? direction - coordinate - grab
      : coordinate - direction - grab;
    const value = this.getValueFromPosition(pos);

    return value;
  };

  coordinates (pos) {
    const { limit, grab } = this.state;
    const { orientation } = this.props;
    const value = this.getValueFromPosition(pos);
    const position = this.getPositionFromValue(value);
    const handlePos = orientation === 'horizontal' ? position + grab : position;
    const fillPos = orientation === 'horizontal'
      ? handlePos
      : limit - handlePos;

    return {
      fill: fillPos,
      handle: handlePos,
      label: handlePos
    }
  };

  renderLabels (labels) {
    return <ul
            ref={sl => {
              this.labels = sl
            }}
            className={'rangeslider__labels'}
          >
            {labels}
          </ul>
  };

  render() {
    const {
      value,
      orientation,
      className,
      tooltip,
      reverse,
      labels,
      min,
      max,
      handleSliderLabel,
      fillColor,
      backgroundColor,
    } = this.props;
    const { active } = this.state;
    const dimension = constants.orientation[orientation].dimension;
    const direction = reverse
      ? constants.orientation[orientation].reverseDirection
      : constants.orientation[orientation].direction;
    const position = this.getPositionFromValue(value);
    const coords = this.coordinates(position);
    const fillStyle = { [dimension]: `${coords.fill}px`, 'background': fillColor ? fillColor : '#656663' };
    const handleStyle = { [direction]: `${coords.handle}px` };
    const rangesliderStyle = { 'background': backgroundColor ?  backgroundColor : '#EAE6E3'};

    let showTooltip = tooltip && active;

    let labelItems = [];
    let labelKeys = Object.keys(labels);

    if (labelKeys.length > 0) {
      labelKeys = labelKeys.sort((a, b) => (reverse ? a - b : b - a))
      
      for (let key of labelKeys) {
        const labelPosition = this.getPositionFromValue(key);
        const labelCoords = this.coordinates(labelPosition);
        const labelStyle = { [direction]: `${labelCoords.label}px` };

        labelItems.push(
          <li
            key={key}
            className={'rangeslider__label-item'}
            data-value={key}
            onMouseDown={this.handleDrag}
            onTouchStart={this.handleStart}
            onTouchEnd={this.handleEnd}
            style={labelStyle}
          >
            {this.props.labels[key]}
          </li>
        )
      }
    }

    return (
      <div
        ref={s => {
          this.slider = s
        }}
        className={`rangeslider rangeslider-${orientation} ${reverse ? 'rangeslider-reverse' : ''} ${className}`}
        onMouseDown={this.handleDrag}
        onMouseUp={this.handleEnd}
        onTouchStart={this.handleStart}
        onTouchEnd={this.handleEnd}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-orientation={orientation}
        style={rangesliderStyle}
      >
        <div className='rangeslider__fill' style={fillStyle} />
        <div
          ref={sh => {
            this.handle = sh
          }}
          className='rangeslider__handle'
          onMouseDown={this.handleStart}
          onTouchMove={this.handleDrag}
          onTouchEnd={this.handleEnd}
          onKeyDown={this.handleKeyDown}
          style={handleStyle}
          tabIndex={0}
        >
          {showTooltip
            ? <div
              ref={st => {
                this.tooltip = st
              }}
              className='rangeslider__handle-tooltip'
              >
              <span>{this.handleFormat(value)}</span>
            </div>
            : null}
          {handleSliderLabel && <div className='rangeslider__handle-label'>{handleSliderLabel(min, max, value)}</div>}
        </div>
        {labels ? this.renderLabels(labelItems) : null}
      </div>
    )
  }

}

InputRange.orientation = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

InputRange.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  orientation: 'horizontal',
  tooltip: true,
  reverse: false,
  labels: {},
  handleLabel: '',
  isContinous: false,
};

InputRange.propTypes = {
  isContinous: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  orientation: PropTypes.string,
  tooltip: PropTypes.bool,
  reverse: PropTypes.bool,
  labels: PropTypes.object,
  handleLabel: PropTypes.string,
  format: PropTypes.func,
  onChangeStart: PropTypes.func,
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
};

export default InputRange;