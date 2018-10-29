import React from "react"
import PropTypes from 'prop-types';

require("style-loader!./ScrollSelector.scss");


export class ScrollSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: -1
    }
    this.handleScrollElement = this.handleScrollElement.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleScrollElement (idx) {
    const {listData} = this.props;
    let element = document.getElementById(listData[idx].id);
    element.scrollIntoView();
    this.setState({
      activeItem: idx
    })
  }

  onChange(changes, observer) {
    const {listData} = this.props;
    console.log(changes)
    changes.forEach(change => {
      if (change.intersectionRatio > 0) {
        if (change.target.id !== undefined && change.target.id !== '') {
          let idx = listData.map(ele => ele.id).indexOf(change.target.id)
          this.setState({
            activeItem: idx
          })
        }
      }
    });
  }

  componentDidMount() {
    let options = {
      root: null, // relative to document viewport 
      rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.0 // visible amount of item shown in relation to root
    };
    let observer = new IntersectionObserver(this.onChange, options);
    const {listData} = this.props;

    listData.forEach(ele => {
      let dom = document.getElementById(ele.id);
      observer.observe(dom)
    })
  }

  render() {
    const { _t, listData } = this.props;

    return (
      <div className="scroll-selector">
        {
          listData.map((item,idx) => 
            <div className={`indicator__container ${this.state.activeItem === idx ? 'active' : ''}`} key={idx} onClick={() => {this.handleScrollElement(idx)}}>
              <div className={`indicator`}></div>
              <span>{_t(item.key)}</span>
            </div>
          )
        }
      </div>
    )
  }

}
