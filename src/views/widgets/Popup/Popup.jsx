import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

require('style-loader!./Popup.scss');

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.defaultOpen,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    if (this.props.defaultOpen) {
      // eslint-disable-next-line no-undef
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
    // eslint-disable-next-line no-undef
    $('body').css('overflow', 'auto');
    this.props.onUnmount && this.props.onUnmount();
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  componentDidUpdate() {
    const open = this.props.open !== undefined ? this.props.open : this.state.open;
    // eslint-disable-next-line no-undef
    $('body').css('overflow', open ? 'hidden' : 'auto');
  }

  render() {
    const {
      size, scroll, children, className, onUnmount, align, canCloseOutside, contentColor,
    } = this.props;
    const open = this.props.open !== undefined ? this.props.open : this.state.open;

    return (
      <div
        className={`widget__popup ${align} ${className} ${size} ${open ? 'open' : 'close'} ${scroll ? 'scroll' : ''}`}
        onClick={() => {
          if (canCloseOutside) {
            if (onUnmount !== undefined) onUnmount();
            this.close();
          }
        }}
      >
        <div className="widget__popup-wrap" onClick={(e) => { e.stopPropagation(); }}>
          <div className={`widget__popup-content ${contentColor}`} ref={(node) => { this.popupNode = node; }}>
            {children}
          </div>
          <div
            className="widget__popup-close"
            onClick={() => {
              if (onUnmount !== undefined) onUnmount();
              this.close();
            }}
          >
            x
          </div>
        </div>
      </div>
    );
  }
}

Popup.align = {
  RIGHT: 'right',
  CENTER: 'center',
};

Popup.contentColor = {
  NORMAL: 'normal',
  BLUE_DARK: 'blue_dark',
};

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
  align: Popup.align.CENTER,
  contentColor: Popup.contentColor.NORMAL,
};

Popup.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
  defaultOpen: PropTypes.bool,
  open: PropTypes.any,
  scroll: PropTypes.bool,
  align: Popup.align,
  contentColor: Popup.contentColor,
};

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(Popup);
