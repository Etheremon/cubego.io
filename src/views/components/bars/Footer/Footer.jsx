import React from 'react';
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from '../../../widgets/Container/Container.jsx';
import { GetValues } from '../../../../utils/objUtils';
import Popup from '../../../widgets/Popup/Popup.jsx';

require('style-loader!./Footer.scss');

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openContracts: false,
    };
  }

  render() {
    const { _t, size, type } = this.props;

    return (
      <div className={`footer__wrapper ${type}`}>

        <Popup
          className="footer__popup"
          canCloseOutside
          onUnmount={() => { this.setState({ openContracts: false }); }}
          open={this.state.openContracts}
        >
          <div className="footer__contracts">
            <div className="header">
              {_t('cubego contracts')}
            </div>
            <div className="list" />
          </div>
        </Popup>

        <Container size={size} className="footer__content">

          <div className="footer__main">
            <div className="footer__left">
              <img className="footer__logo" src={require('../../../../shared/img/logo/cubego.png')} />
              <div className="footer__copyright">
                {
                  `© Cubego. ${_t('all_rights_reserved')}.`
                }
              </div>
            </div>

            <div className="footer__right">
              <div className="footer__right-content">
                <a href="https://github.com/jarvis57/cubego.io" target="_blank" rel="noreferrer">
                  <p>{_t('github')}</p>
                </a>
                <a href="mailto:nvdung149@gmail.com?Subject=Hello"><p>{_t('email')}</p></a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Footer.types = {
  NORMAL: 'normal',
  DARK: 'dark',
  BRIGHT: 'bright',
};

Footer.defaultProps = {
  size: Container.sizes.NORMAL,
  type: Footer.types.NORMAL,
};

Footer.propTypes = {
  size: PropTypes.string,
  type: PropTypes.oneOf([...GetValues(Footer.types)]),
};

const mapStateToProps = (store) => ({ _t: getTranslate(store.localeReducer) });

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
