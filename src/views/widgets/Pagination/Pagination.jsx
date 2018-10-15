import React from "react"
import PropTypes from 'prop-types';

require("style-loader!./Pagination.scss");


class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: props.activeIdx,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeIdx !== nextProps.activeIdx) {
      this.setState({activeItem: nextProps.activeIdx});
    }
  }

  handleItemClick(btnIdx) {
    this.props.onBtnClick && this.props.onBtnClick(btnIdx);
    this.setState({ activeItem: btnIdx });
  };

  render() {
    let from = Math.max(this.props.fromIdx, this.state.activeItem - this.props.maxBtns);
    let to = Math.min(this.props.toIdx, this.state.activeItem + this.props.maxBtns);

    let btns = [];

    if (this.props.toIdx - this.props.fromIdx + 1 <= 5) {
      for (let i = this.props.fromIdx; i <= this.props.toIdx; i ++) btns.push(i);
    } else {
      for (let i = this.props.fromIdx; i <= Math.min(this.props.fromIdx, from - 2); i++) btns.push(i);
      if (this.props.fromIdx < from) btns.push('-');
      for (let i = from; i <= to; i++) btns.push(i);
      if (to < this.props.toIdx) btns.push('-');
      for (let i = Math.max(this.props.toIdx, to + 2); i <= this.props.toIdx; i++) btns.push(i);
    }

    return (
        <div className={'widget__pagination'}>
          {
            btns.map((btn, idx) => 
              btn === '-' ?
              <div className={'item disabled'} key={idx}>...</div>
              : <div className={`item ${this.state.activeItem === btn ? 'active' : ''}`} key={idx}  onClick={() => this.handleItemClick(btn)}>{`${btn}`}</div>
            )
          }
        </div>
    )
  }
}

Pagination.defaultProps = {
  maxBtns: 2,
  fromIdx: 1,
  activeIdx: 1,
};

Pagination.propTypes = {
  maxBtns: PropTypes.number,
  fromIdx: PropTypes.number,
  toIdx: PropTypes.number,
  activeIdx: PropTypes.number,
  onBtnClick: PropTypes.func,
};

export default Pagination;
