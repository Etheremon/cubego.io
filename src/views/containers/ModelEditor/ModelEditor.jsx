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
      erase: Tools.erase({value: false}),

      clear: Tools.clear({}),
      clearLayer: Tools.clearLayer({}),
      undo: Tools.undo({}),
      redo: Tools.redo({}),

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
    this.onCellClicked = this.onCellClicked.bind(this);
  }

  componentDidMount() {
    let parser = new window.vox.Parser();
    parser.parse(require('../../../games/data/2.vox')).then((voxelData) => {
      this.toolManager.addModel({model: modelUtils.ReformatModel(voxelData)});
      this.currentModel = modelUtils.ReformatModel(voxelData);
      this.forceUpdate();
    });
  }

  onToolChange(key, value) {
    this.toolManager.onToolClicked({key, value});
    this.forceUpdate();
  }

  onCellClicked(cell, cells) {
    this.toolManager.onCellClicked({cell, cells});
    this.forceUpdate();
  }

  render() {
    let {_t} = this.props;

    return (
      <PageWrapper type={PageWrapper.types.DARK}>
        <Container className={'model-editor'} size={Container.sizes.LARGE}>

          <div className={'model-editor__tool-bar'}>
            <div className={'group'}>
              <div className={'item'}>
                <ToggleTool label={_t('draw')} img={require('../../../shared/img/Icons/heart.png')}
                            active={this.toolManager.getToolValue(this.tools.draw.key)}
                            onClick={() => {
                              let currentVal = this.toolManager.getToolValue(this.tools.draw.key);
                              this.onToolChange(this.tools.draw.key, !currentVal);
                            }}
                />
              </div>
              <div className={'item'}>
                <ToggleTool label={_t('erase')} img={require('../../../shared/img/Icons/heart.png')}
                            active={this.toolManager.getToolValue(this.tools.erase.key)}
                            onClick={() => {
                              let currentVal = this.toolManager.getToolValue(this.tools.erase.key);
                              this.onToolChange(this.tools.erase.key, !currentVal);
                            }}
                />
              </div>
            </div>

            <div className={'group'}>
              <div className={'item'}>
                <ToggleTool label={_t('undo')} img={require('../../../shared/img/Icons/heart.png')}
                            disabled={!this.toolManager.isToolAvailable(this.tools.undo.key)}
                            onClick={() => {this.onToolChange(this.tools.undo.key, true);}}/>
              </div>
              <div className={'item'}>
                <ToggleTool label={_t('redo')} img={require('../../../shared/img/Icons/heart.png')}
                            disabled={!this.toolManager.isToolAvailable(this.tools.redo.key)}
                            onClick={() => {this.onToolChange(this.tools.redo.key, true);}}/>
              </div>
            </div>

            <div className={'group'}>
              <div className={'item'}>
                <ToggleTool label={_t('clear')} img={require('../../../shared/img/Icons/heart.png')}
                            disabled={!this.toolManager.isToolAvailable(this.tools.clear.key)}
                            onClick={() => {this.onToolChange(this.tools.clear.key, true);}}/>
              </div>
              <div className={'item'}>
                <ToggleTool label={_t('clear_current_layer')} img={require('../../../shared/img/Icons/heart.png')}
                            disabled={!this.toolManager.isToolAvailable(this.tools.clearLayer.key)}
                            onClick={() => {this.onToolChange(this.tools.clearLayer.key, true);}}/>
              </div>
            </div>


          </div>

          <div className={'model-editor__canvas'}>
            <div className={'model-editor__left'}>
              <div className={'model-editor__3d'}>
                <Model3D model={this.toolManager.model} tools={CloneDeep(this.toolManager.tools)} onCellClicked={this.onCellClicked}/>
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
                <Layer2D layer={this.toolManager.layer} tools={CloneDeep(this.toolManager.tools)} onCellClicked={this.onCellClicked}/>
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
