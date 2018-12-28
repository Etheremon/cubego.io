import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from "react-router-dom/es/withRouter";

import Navbar from '../../components/bars/Navbar/Navbar.jsx'
import Footer from '../../components/bars/Footer/Footer.jsx'
import Slider from '../../widgets/Slider/Slider.jsx';
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import { Container } from '../../widgets/Container/Container.jsx';
import { Text } from '../../widgets/Text/Text.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import InviewMonitor from '../../widgets/InviewMonitor/InviewMonitor.jsx';
import * as Utils from "../../../utils/utils";
import {GetHomeBanners, GetLoggedInUserId, GetPresalePerformance, GetUserInfo} from "../../../reducers/selectors";
import {getActiveLanguage} from "react-localize-redux/lib/index";
import {URLS, REFERRAL_EXPIRED} from "../../../constants/general";
import * as Config from "../../../config";
import Countdown from "../../widgets/Countdown/Countdown.jsx";
import {PresaleActions} from "../../../actions/presale";

require("style-loader!./RefundPage.scss");

class RefundPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.props.dispatch(PresaleActions.GET_PRESALE_PERFORMANCE.init.func({forceUpdate: true}))
  }

  componentWillUnmount() {
    this.props.dispatch(PresaleActions.GET_PRESALE_PERFORMANCE.stop.func({forceUpdate: true}))
  }

  render() {
    const { _t, userId, performance } = this.props;

    return (
      <PageWrapper type={PageWrapper.types.BLUE_NEW}>
        <Navbar/>

        <div className={'refund-page'}>

          <div className={'user'}>
            {_t('address')}: {userId || _t('no account')}
          </div>

          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>{_t('eth used for presale')}</td>
                <td>{performance["purchase_eth"] || 0}</td>
              </tr>

              <tr>
                <td>{_t('emont used for presale')}</td>
                <td>{performance["purchase_emont"] || 0}</td>
              </tr>

              <tr>
                <td>{_t('eth used for building cubegon')}</td>
                <td>{performance["cubegons_total_fee"] || 0}</td>
              </tr>

              <tr>
                <td>{_t('referred friends')}</td>
                <td>{performance["referred_count"] || 0}</td>
              </tr>

              <tr>
                <td>{_t('referred eth')}</td>
                <td>{performance["referred_eth"] || 0}</td>
              </tr>

              <tr>
                <td>{_t('referred emont')}</td>
                <td>{performance["referred_emont"] || 0}</td>
              </tr>

              <tr className={'total first'}>
                <td>{_t('total eth refund')}</td>
                <td>{Utils.RoundToDecimalFloat((performance["purchase_eth"] + performance["referred_eth"]*5/100 + performance["cubegons_total_fee"]) || 0, 4)}</td>
              </tr>
              <tr className={'total'}>
                <td>{_t('total emont refund')}</td>
                <td>{Utils.RoundToDecimalFloat((performance["purchase_emont"] + performance["referred_emont"]*5/100) || 0, 4)}</td>
              </tr>

            </tbody>
          </table>
        </div>

        <Footer type={Footer.types.DARK} />
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  let userId = GetLoggedInUserId(store);
  return {
    _t: getTranslate(store.localeReducer),
    userId,
    performance: GetPresalePerformance(store, userId) || {},
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RefundPage));
