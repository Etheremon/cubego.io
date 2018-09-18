import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from "react-router-dom/es/withRouter";
import {EditorTool} from "../../../games/react_views/EditorTool/EditorTool.jsx";

require("style-loader!./ModelEditor.scss");


class _ModelEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="model-editor">
        <EditorTool/>
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
