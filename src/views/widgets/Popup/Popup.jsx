import React from "react"
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getTranslate} from "react-localize-redux";

require("style-loader!./Popup.scss");


class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.defaultOpen,
    };

    this.toggleOpen = this.toggleOpen.bind(this);
    // this.handleOnOutsideClick = this.handleOnOutsideClick.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    if (this.props.defaultOpen) {
      $('body').css('overflow', 'hidden');
    }

    this.props.onMount && this.props.onMount();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.open !== nextProps.open && nextProps.open !== undefined) {
      const nextPropsValue = nextProps.open;
      this.setState({
        open: nextPropsValue,
      });
    }
  }

  componentWillUnmount() {
    $('body').css('overflow', 'auto');
    this.props.onUnmount && this.props.onUnmount();
  }

  toggleOpen() {
    // this.setState({
    //   open: !this.state.open,
    // });
  }

  open() {
    this.setState({open: true});
  }

  close() {
    
    this.setState({open: false});
  }

  componentDidUpdate() {
    let open = this.props.open !== undefined ? this.props.open : this.state.open;
    $('body').css('overflow', open ? 'hidden' : 'auto');
  }

  render() {
    let {size, scroll, children, className, onUnmount} = this.props;
    let open = this.props.open !== undefined ? this.props.open : this.state.open;

    return (
      <div className={`widget__popup ${className} ${size} ${open ? 'open' : 'close'} ${scroll ? 'scroll' : ''}`}>
        <div className={'widget__popup-wrap'}>
          <div className={'widget__popup-content'} ref={(node) => {this.popupNode = node}}>
            {children}
          </div>
          <div className={'widget__popup-close'}
               onClick={() => {
                 if (onUnmount !== undefined) onUnmount();
                 this.close();
               }}
          >
            x
          </div>
        </div>
      </div>
    )
  }

}

Popup.sizes = {
  SMALL: 'small',
  NORMAL: 'normal',
  BIG: 'big',
  LARGE: 'large',
  FULL: 'full',
};

Popup.defaultProps = {
  className: '',
  size: Popup.sizes.NORMAL,
  defaultOpen: false,
  scroll: false,
  // open: undefined,
};

Popup.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
  defaultOpen: PropTypes.bool,
  open: PropTypes.any,
  scroll: PropTypes.bool,
};

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {withRef: true},
)(Popup);