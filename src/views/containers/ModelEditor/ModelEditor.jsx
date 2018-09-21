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
import Dropdown from "../../widgets/Dropdown/Dropdown.jsx";
import {RangeInput} from "../../widgets/RangeInput/RangeInput.jsx";
import * as modelUtils from "../../../utils/modelUtils";

require("style-loader!./ModelEditor.scss");


class _ModelEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.tools = {
      draw: Tools.draw({value: true}),
      color: Tools.color({}),
      view2D: Tools.view2D({}),
      layerIndex: Tools.layerIndex({value: 1}),
    };

    // NOTE: Tool Manager does not touch UI Component. It is only managing the tools & model history.
    this.toolManager = new ToolManager({
      tools: CloneDeep(this.tools),
      models: [],
    });

    this.onToolChange = this.onToolChange.bind(this);
  }

  componentDidMount() {
    let parser = new window.vox.Parser();
    parser.parse(require('../../../games/data/3.vox')).then((voxelData) => {
      this.toolManager.addModel({model: modelUtils.ReformatModel(voxelData)});
      this.forceUpdate();
    });
  }

  onToolChange(key, value) {
    console.log("on Tool Change", key, value);
    this.toolManager.onToolClicked({key, value});
    this.forceUpdate();
  }

  render() {
    let {_t} = this.props;

    return (
      <PageWrapper>
        <Container className={'model-editor'} size={Container.sizes.LARGE}>

          <div className={'model-editor__tool-bar'}>
            <ToggleTool toolKey={this.tools.draw.key}
                        value={this.toolManager.getToolValue(this.tools.draw.key)}
                        onChange={(val) => {this.onToolChange(this.tools.draw.key, val)}}/>
          </div>

          <div className={'model-editor__canvas'}>
            <div className={'model-editor__left'}>
              <div className={'model-editor__3d'}>
                <Model3D model={this.toolManager.model}/>
              </div>

              <div className={'model-editor__colors'}>
                <ColorTool toolKey={this.tools.color.key}
                           value={this.toolManager.getToolValue(this.tools.color.key)}
                           options={this.tools.color.options}
                           onChange={(val) => {this.onToolChange(this.tools.color.key, val)}}/>
              </div>
            </div>

            <div className={'model-editor__right'}>
              <div className={'model-editor__2d'}>
                <Layer2D layer={this.toolManager.layer}/>
              </div>
              <div className={'model-editor__layer-tool'}>
                <Dropdown list={this.tools.view2D.options.map(option => ({
                  content: <div className={'model-editor__2d-view-option'}>{_t(option.label)}</div>,
                  onClick: () => {this.onToolChange(this.tools.view2D.key, option)},
                }))}>
                  <div className={'model-editor__2d-view-option'}>
                    {_t(this.toolManager.getToolValue(this.tools.view2D.key).label)}
                  </div>
                </Dropdown>

                <RangeInput valMin={1} valMax={this.toolManager.numLayers} valSteps={1}
                            value={this.toolManager.getToolValue(this.tools.layerIndex.key)}
                            onInput={(val) => {this.onToolChange(this.tools.layerIndex.key, val)}}
                />
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
