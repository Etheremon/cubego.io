import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {getTranslate} from 'react-localize-redux'

import Home from '../HomePage/Home.jsx'

import * as Tracker from '../../../services/tracker'
import * as LS from '../../../services/localStorageService';

// import TxnBar from '../../components/bars/TxnBar/TxnBar.jsx'
import Footer from '../../components/bars/Footer/Footer.jsx'
import {URLS} from "../../../constants/general";
import {ModelEditor} from "../ModelEditor/ModelEditor.jsx";
import ComingSoon from '../../components/ComingSoon/ComingSoon.jsx';
import {GetLocalizationData} from '../../../reducers/selectors';
import Loading from '../../components/Loading/Loading.jsx';
import ReviewPage from '../ReviewPage/ReviewPage.jsx';
import ModelDetail from '../ModelDetail/ModelDetail.jsx';
import {GetValues} from "../../../utils/objUtils";
import MyCubegoes from '../MyCubegoes/MyCubegoes.jsx';
import {AuthActions} from "../../../actions/auth";
import SignUp from '../SignIn/SigInForm/SignInForm.jsx';
import SignInPage from "../SignIn/SignInPage/SignInPage.jsx";
import {BattlePage} from "../BattlePage/BattlePage.jsx";

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
    let acc = undefined;

    setInterval(function() {
      if (window.account === undefined) return;

      if (window.account !== acc) {
        if (acc === undefined) this.props.dispatch(AuthActions.LOGIN.init.func({userId: LS.GetItem(LS.Fields.account) || window.account}));
          else this.props.dispatch(AuthActions.LOGIN.init.func({userId: window.account}));

        acc = window.account;
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
        <div className={'app-page-loader'}>
          <Loading className={'main__page-loader'} type={Loading.types.DOG}/>
        </div>
      );
    }

    return (
      <div className={'page-container-wrapper'}>
        <Switch history={history}>
          <Route path={`/${URLS.BUILD_GON}`} component={ModelEditor}/>
          <Route path={`/${URLS.REVIEW_GON}`} component={ReviewPage}/>

          <Route path={`/${URLS.CUBEGONS}/:id`} component={ModelDetail}/>
          <Route path={`/${URLS.CUBEGONS}`} component={MyCubegoes}/>

          <Route path={`/${URLS.BATTLE}`} component={BattlePage}/>
          <Route path={`/${URLS.STORE}`} component={ComingSoon}/>
          <Route path={`/${URLS.MARKET}`} component={ComingSoon}/>

          <Route path={`/${URLS.ABOUT_US}`} component={SignUp}/>
          <Route path={`/${URLS.GUIDE}`} component={ComingSoon}/>

          <Route path={`/${URLS.SIGN_IN}`} component={SignInPage}/>

          <Route component={Home}/>
        </Switch>

        {/*<TxnBar/>*/}
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
