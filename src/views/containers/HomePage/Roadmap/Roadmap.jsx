import React from 'react'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import {Text} from "../../../widgets/Text/Text.jsx";

require("style-loader!./Roadmap.scss");


const CheckPoint = ({header, content, status}) => {
  return (
    <div className={`roadmap__checkpoint ${status}`}>
      <Text className={'roadmap__checkpoint-header'} type={Text.types.H3}>{header}</Text>
      <div className={'roadmap__checkpoint-line'}/>
      <div className={'roadmap__checkpoint-ball'}>
        <div className={'ball-wrapper'}>
        </div>
      </div>
      <div className={'roadmap__checkpoint-content'}>{content}</div>
    </div>
  );
};


class Roadmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {_t} = this.props;

    return(
      <div className={'roadmap'}>
        <div className={'roadmap__line'}>
        </div>
        <div className={'roadmap__checkpoints'}>
          {[1, 2, 3, 4, 5, 6, 7].map((key) => (
            <CheckPoint header={_t(`roadmap.${key}_header`)}
                        content={_t(`roadmap.${key}_content`)}
                        status={key === 1 ? 'present' : (key < 1 ? 'past' : 'future')}
                        key={key}/>
          ))}
        </div>
      </div>
    );
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Roadmap));
