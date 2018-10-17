import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from "react-router-dom/es/withRouter";

import {Container} from "../../widgets/Container/Container.jsx";
import {PageWrapper} from "../../widgets/PageWrapper/PageWrapper.jsx";
import Navbar from "../../components/bars/Navbar/Navbar.jsx";
import Footer from "../../components/bars/Footer/Footer.jsx";
import {GetLoggedInUserId} from "../../../reducers/selectors";
import {Battle} from "../../../games/react_views/Battle/Battle.jsx";

require("style-loader!./BattlePage.scss");

class _BattlePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let {_t} = this.props;

    return (
      <PageWrapper type={PageWrapper.types.BLUE_DARK}>
        <Navbar size={Container.sizes.BIG} minifying label={_t('build_cubegon')} />

        <div className={'battle-page'}>

          <Container size={Container.sizes.BIG} className={'battle-page__container'}>
            <Battle/>
          </Container>

        </div>

        <Footer size={Container.sizes.BIG} type={Footer.types.DARK} />
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  return {
    _t: getTranslate(store.localeReducer),
    userId: GetLoggedInUserId(store),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export const BattlePage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(_BattlePage));
