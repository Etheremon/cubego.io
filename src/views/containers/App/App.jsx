import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getTranslate } from 'react-localize-redux';
import { URLS } from '../../../constants/general';
import { ModelEditor } from '../ModelEditor/ModelEditor.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import { BattlePage } from '../BattlePage/BattlePage.jsx';
import { GetLocalizationData } from '../../../reducers/selectors';

require('style-loader!./App.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { alreadyFetchedLocalization } = this.props;

    if (!alreadyFetchedLocalization) {
      return (
        <div className="app-page-loading">
          <Loading className="main__page-loader" type={Loading.types.DOG} />
        </div>
      );
    }

    return (
      <div className="page-container-wrapper">
        {/* eslint-disable-next-line no-restricted-globals */}
        <Switch history={history}>
          <Route path={`/${URLS.BUILD_GON}`} component={ModelEditor} />
          <Route path={`/${URLS.BATTLE}/:gon1Id?/:gon2Id?`} component={BattlePage} />
          <Route component={ModelEditor} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
  alreadyFetchedLocalization: GetLocalizationData(store),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
