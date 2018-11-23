import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import {PageWrapper} from "../../widgets/PageWrapper/PageWrapper.jsx";
import {Container} from "../../widgets/Container/Container.jsx";
import Navbar from "../bars/Navbar/Navbar.jsx";
import Footer from "../bars/Footer/Footer.jsx";
import {ButtonNew} from "../../widgets/Button/Button.jsx";
import {URLS} from "../../../constants/general";

require("style-loader!./ComingSoon.scss");

class ComingSoon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let {_t} = this.props;

    return(
      <PageWrapper type={PageWrapper.types.BLUE_DARK}>
        <Navbar/>

        <Container className={'coming-soon'}>
          {_t('coming_soon_presale_note')}
          <br/><br/>
          <ButtonNew label={'go to store'} onClick={() => {this.props.history.push(`/${URLS.STORE}`)}}/>
        </Container>

        <Footer type={Footer.types.DARK}/>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComingSoon);
