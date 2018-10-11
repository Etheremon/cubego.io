import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from "react-router-dom/es/withRouter";
import {EDITOR_COLORS} from "../../../../constants/general";
import * as ObjUtils from "../../../../utils/objUtils";

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
    this.props.onChange && this.props.onChange(c);
  }

  render() {
    let {value, options} = this.props;

    return (
      <div className={'color-tool'}>
        <div className={'color-tool__list'}>
          {ObjUtils.GetValues(options).map((c, idx) => (
            <div className={`color-tool__cell ${value['material_id'] === c['material_id'] && value['variant_id'] === c['variant_id'] ? 'selected' : ''}`}
                 key={idx} onClick={() => {this.onColorChange(c)}}>
              <img src={c.img}/>
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
