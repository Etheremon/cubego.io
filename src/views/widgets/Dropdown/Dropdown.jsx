import React from "react"
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getTranslate} from "react-localize-redux";

require("style-loader!./Dropdown.scss");


class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      open: props.defaultOpen,
      searchValue: '',
    };

    this.onClick = this.onClick.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleOnOutsideClick = this.handleOnOutsideClick.bind(this);
    this.handleOnSearchInputChange = this.handleOnSearchInputChange.bind(this);
  }

  componentDidMount() {
    window.document.addEventListener('click', this.handleOnOutsideClick);
  }

  componentWillUnmount() {
    window.document.removeEventListener('click', this.handleOnOutsideClick);
  }

  handleOnOutsideClick(event) {
    if (this.dropdownNode && !this.dropdownNode.contains(event.target)) {
      this.setState({open: false});
    }
  }

  onClick(idx, onClickFunc) {
    onClickFunc && onClickFunc();
    this.setState({
      open: !this.state.open,
      selected: idx,
    })
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open,
    })
  }

  handleOnSearchInputChange(e) {
    this.setState({searchValue: e.target.value});
  }

  render() {
    let {enableSearch, className, children, list, position, _t} = this.props;

    if (enableSearch) {
      list = list.filter(item => item.search.toLowerCase().includes(this.state.searchValue));
    }

    return (
      <div className={`widget__dropdown ${className} widget__dropdown__${position}`}
           ref={(node) => {this.dropdownNode = node}}>
        <div className={`widget__dropdown__content`} onClick={this.toggleOpen}>
          {children}
        </div>
        <div className={`widget__dropdown__list ${this.state.open ? 'open' : ''}`}>
          {!enableSearch ? null :
            <div className={'widget__dropdown__search widget__dropdown__item'}>
              <i className="fas fa-search"/>
              <input type="text" placeholder={`${_t('txt.search')}...`} value={this.state.searchValue} onChange={this.handleOnSearchInputChange}/>
            </div>
          }

          {list.length
            ? list.map((item, idx) => (
                <div className={`widget__dropdown__item ${idx === this.state.selected ? 'active' : ''}`} key={idx} onClick={() => {this.onClick(idx, item.onClick)}}>
                  {item.content}
                </div>
              ))
            : <div className={`widget__dropdown__item`}>
                {_t('txt.no_result')}
              </div>
          }
        </div>
      </div>
    )
  }

}

Dropdown.defaultProps = {
  className: '',
  selected: -1,
  defaultOpen: false,
  position: 'left',
  enableSearch: false,
  icon: null,
};

Dropdown.propTypes = {
  className: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.any,
    onClick: PropTypes.func,
  })),
  selected: PropTypes.number,
  children: PropTypes.any,
  defaultOpen: PropTypes.bool,
  position: PropTypes.string,
  enableSearch: PropTypes.bool,
};

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown);