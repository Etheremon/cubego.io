import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from "react-router-dom/es/withRouter";
import {EDITOR_COLORS} from "../../../../utils/constants";

require("style-loader!./ColorTool.scss");


class _ColorTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.onColorChange = this.onColorChange.bind(this);
  }

  componentDidMount() {
  }

  onColorChange(c) {

  }

  render() {
    return (
      <div className={'color-tool'}>
        <div className={'color-tool__list'}>
          {EDITOR_COLORS.map((c, idx) => (
            <div className={'color-tool__cell'} style={{backgroundColor: c.hex}} key={idx}
                 onClick={() => {this.onColorChange(c)}}>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store, props) => {
  let pathName = props.pathname;
  return {
    pathName,
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export const ColorTool = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ColorTool));
