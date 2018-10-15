import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import {getTranslate} from 'react-localize-redux'

import Home from '../HomePage/Home.jsx'

import {Actions} from '../../../actions/index.js'
import * as Tracker from '../../../services/tracker'
import * as LS from '../../../services/localStorageService';

import TxnBar from '../../components/bars/TxnBar/TxnBar.jsx'
import Footer from '../../components/bars/Footer/Footer.jsx'
import {URLS} from "../../../constants/general";
import {ModelEditor} from "../ModelEditor/ModelEditor.jsx";
import ComingSoon from '../../components/ComingSoon/ComingSoon.jsx';
import {GetLocalizationData} from '../../../reducers/selectors';
import Loading from '../../widgets/Loading/Loading.jsx';
import ReviewPage from '../ReviewPage/ReviewPage.jsx';
import ModelDetail from '../ModelDetail/ModelDetail.jsx';
import {Battle} from "../../../games/react_views/Battle/Battle.jsx";
import {GetValues} from "../../../utils/objUtils";
import MyCubegoes from '../MyCubegoes/MyCubegoes.jsx';

require("style-loader!./App.scss");

class App extends React.Component {

  constructor(props) {
    super(props);
    this.maintenance = false;

    // Set window onload
    window.onLoadFunctions = {};
    window.onload = () => {
      GetValues(window.onLoadFunctions).forEach(func => {
        func && func()
      })
    }
  }

  componentDidMount() {
    Tracker.VisitPage();
    if (window.rpcConnected) Tracker.EnableMetamask();

    // Check for Ether Account from window.core
    let acc = undefined, test_acc = undefined;
    window.test_account = LS.GetItem(LS.Fields.account) || undefined;

    setInterval(function() {
      if (window.account === undefined) return;

      if (window.account !== acc || window.test_account !== test_acc) {
        let selected_acc;
        if (window.account) {
          selected_acc = window.account;
          acc = window.account;
          test_acc = null;
          window.test_account = null;
        } else if (!window.account && account) {
          selected_acc = null;
          acc = window.account;
          window.test_account = null;
          test_acc = null;
        } else {
          selected_acc = window.test_account || null;
          test_acc = window.test_account;
          acc = window.account;
        }
        this.props.dispatch(Actions.auth.login(selected_acc));
        if (selected_acc)
          LS.SetItem(LS.Fields.account, selected_acc);
        else
          LS.DeleteItem(LS.Fields.account);
      }
    }.bind(this), 1000);

    // Scroll to hash-link on page load
    window.onLoadFunctions['general-hash'] = () => {
      let { hash } = window.location;
      if (hash !== '') {
        const id = hash.replace('#', '');
        let element =  document.getElementById(id);
        if (element) element.scrollIntoView();
      }
    };
  }

  componentWillUnmount() {
    window.onLoadFunctions['general-hash'] = undefined;
  }

  render () {
    const {alreadyFetchedLocalization} = this.props;

    if (this.maintenance) {
      return (
        <div className={'page-container-wrapper'}>
          <div style={{paddingTop: "80px"}}>
            <ul className="ui list">
              We are under maintenance. Please come back later ....
            </ul>
          </div>
          <Footer/>
        </div>
      );
    }

    if (!alreadyFetchedLocalization) {
      return (
        <div className={'page-loading'} style={{
          width: '100%',
          textAlign: 'center',
          paddingTop: '300px',
        }}>
          <Loading className={'main__page-loading'} dark/>
        </div>
      );
    }

    return (
      <div className={'page-container-wrapper'}>
        <Switch history={history}>
          <Route path={`/${URLS.BUILD_GON}`} component={ModelEditor}/>
          <Route path={`/${URLS.REVIEW_GON}`} component={ReviewPage}/>

          <Route path={`/${URLS.CUBEGONS}`} component={ModelDetail}/>
          <Route path={`/${URLS.CUBEGONS}/:id`} component={ModelDetail}/>
          <Route path={`/${URLS.MY_CUBEGOES}`} component={MyCubegoes}/>

          <Route path={`/${URLS.BATTLE}`} component={ComingSoon}/>
          <Route path={`/${URLS.STORE}`} component={ComingSoon}/>
          <Route path={`/${URLS.MARKET}`} component={ComingSoon}/>

          <Route path={`/${URLS.ABOUT_US}`} component={ComingSoon}/>
          <Route path={`/${URLS.GUIDE}`} component={ComingSoon}/>

          <Route path={`/battle_dev`} component={Battle}/>


          <Route component={Home}/>
        </Switch>

        <TxnBar/>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
  alreadyFetchedLocalization: GetLocalizationData(store),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
