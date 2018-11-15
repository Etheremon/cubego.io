import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';
import withRouter from 'react-router/es/withRouter';
import { Container } from '../../widgets/Container/Container.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import Navbar from '../../components/bars/Navbar/Navbar.jsx';
import { HeaderBar } from '../../components/bars/HeaderBar/HeaderBar.jsx';
import * as Utils from "../../../utils/utils";
import TabsView from '../../widgets/TabsView/TabsView.jsx';
import ListView from '../../widgets/ListView/ListView.jsx';
import Footer from "../../components/bars/Footer/Footer.jsx";
import ReferralRanking from './ReferralRanking/ReferralRanking.jsx';

require("style-loader!./RankingPage.scss");

const rankingTabs = [ /* {key: 'my_league', content: 'my_league'},  */{key: 'referral', content: 'referral'}/* , {key: 'top_player', content: 'top_player'} */];

class RankingPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filterValues) {
    Utils.handleJoinQueryURL(this.props.history.push, this.props.query, filterValues)
  }

  render() {
    const {_t, query} = this.props;

    return (
      <PageWrapper type={PageWrapper.types.BLUE_NEW}>
        <Navbar minifying/>
        <div className="ranking-page__container">

          <Container className={'ranking-page__main'} size={Container.sizes.NORMAL}>
            <TabsView tabs={rankingTabs} centered 
              selectedTab={query.tab}
              handleOnTabSelect={(tab) => {
                Utils.handleJoinQueryURL(this.props.history.push, query, {tab: tab})
            }}/>
            
            {
              query.tab === rankingTabs[0].key ? 
                <ReferralRanking _t={_t} query={query} handleFilter={this.handleFilter} /> : null
            }
            
          </Container>
        </div>
        <Footer size={Container.sizes.NORMAL} type={Footer.types.DARK}/>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  let query = Utils.ParseQueryString(props.location.search);
  query = {
    ...query,
    tab: rankingTabs.map(tab => tab.key).includes(query.tab) ? query.tab : rankingTabs[0].key,
    page: query.page ? query.page : 1,
  }
  return {
    query,
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RankingPage));