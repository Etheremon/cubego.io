import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from "react-router-dom/es/withRouter";
import {Model3D} from "../../../games/react_views/Model3D/Model3D.jsx";
import {Layer2D} from "../../../games/react_views/Layer2D/Layer2D.jsx";

import {ColorTool} from "./ColorTool/ColorTool.jsx";
import {Container} from "../../widgets/Container/Container.jsx";
import {PageWrapper} from "../../widgets/PageWrapper/PageWrapper.jsx";
import {ToggleTool} from "./ToggleTool/ToggleTool.jsx";
import {ToolManager, Tools} from "../../../services/toolManager";
import {CloneDeep} from "../../../utils/objUtils";

require("style-loader!./ModelEditor.scss");


class _ModelEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.tools = {
      draw: Tools.draw({value: true}),
      color: Tools.color({}),
    };

    // NOTE: Tool Manager does not touch UI Component. It is only managing the tools & model history.
    this.toolManager = new ToolManager({
      tools: CloneDeep(this.tools),
      models: [],
    });
  }

  componentDidMount() {
    let parser = new window.vox.Parser();
    parser.parse(require('../../../games/data/3.vox')).then((voxelData) => {
      this.toolManager.addModel({model: voxelData});
      this.forceUpdate();
    });
  }

  render() {
    return (
      <PageWrapper>
        <Container className={'model-editor'} size={Container.sizes.LARGE}>

          <div className={'model-editor__tool-bar'}>
            <ToggleTool toolKey={this.tools.draw.key}
                        value={this.toolManager.getToolValue(this.tools.draw.key)}
                        onChange={() => {}}/>
          </div>

          <div className={'model-editor__canvas'}>
            <div className={'model-editor__left'}>
              <div className={'model-editor__3d'}>
                <Model3D model={this.toolManager.model}/>
              </div>

              <div className={'model-editor__colors'}>
                <ColorTool toolKey={this.tools.color.key}
                           value={this.toolManager.getToolValue(this.tools.color.key)}
                           onChange={() => {}}/>
              </div>
            </div>

            <div className={'model-editor__right'}>
              <div className={'model-editor__2d'}>
                <Layer2D/>
              </div>
            </div>
          </div>

        </Container>
      </PageWrapper>
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
  mapDispatchToProps,
)(_ModelEditor));
