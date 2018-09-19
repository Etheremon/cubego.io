import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from "react-router-dom/es/withRouter";
import {Model3D} from "../../../games/react_views/Model3D/Model3D.jsx";
import {Layer2D} from "../../../games/react_views/Layer2D/Layer2D.jsx";

require("style-loader!./ModelEditor.scss");


class _ModelEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: null,
    }
  }

  componentDidMount() {
    let parser = new window.vox.Parser();
    parser.parse(require('../../../games/data/3.vox')).then((voxelData) => {
      this.setState({model: voxelData});
    });
  }

  render() {
    return (
      <div className={'model-editor'}>
        <Model3D model={this.state.model}/>
        <Layer2D/>
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

export const ModelEditor = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(_ModelEditor));
