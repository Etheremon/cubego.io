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
import {ToolManager, Tools, ToolTypes} from "../../../services/toolManager";
import {CloneDeep} from "../../../utils/objUtils";
import * as modelUtils from "../../../utils/modelUtils";
import Navbar from "../../components/bars/Navbar/Navbar.jsx";
import { SlideBar } from '../../widgets/SliderBar/SlideBar.jsx';
import * as Utils from "../../../utils/utils";

require("style-loader!./ModelEditor.scss");


class _ModelEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.tools = {
      move: Tools.move({value: true, hotKey: 'M', onClick: () => {
          let currentVal = this.toolManager.getToolValue(this.tools.move.key);
          this.onToolChange(this.tools.move.key, !currentVal);
        }}),
      draw: Tools.draw({value: false, hotKey: 'D', onClick: () => {
          let currentVal = this.toolManager.getToolValue(this.tools.draw.key);
          this.onToolChange(this.tools.draw.key, !currentVal);
      }}),
      paint: Tools.paint({value: false, hotKey: 'P', onClick: () => {
          let currentVal = this.toolManager.getToolValue(this.tools.paint.key);
          this.onToolChange(this.tools.paint.key, !currentVal);
        }}),
      erase: Tools.erase({value: false, hotKey: 'E', onClick: () => {
          let currentVal = this.toolManager.getToolValue(this.tools.erase.key);
          this.onToolChange(this.tools.erase.key, !currentVal);
      }}),
      copyLayer: Tools.copyLayer({
        hotKey: 'I',
        onClick: () => {this.onToolChange(this.tools.copyLayer.key, true);},
      }),
      pasteLayer: Tools.pasteLayer({
        hotKey: 'O',
        onClick: () => {this.onToolChange(this.tools.pasteLayer.key, true);},
      }),
      clear: Tools.clear({
        hotKey: 'A',
        onClick: () => {this.onToolChange(this.tools.clear.key, true);}
      }),
      clearLayer: Tools.clearLayer({
        hotKey: 'C',
        onClick: () => {this.onToolChange(this.tools.clearLayer.key, true);},
      }),
      undo: Tools.undo({
        hotKey: 'U',
        onClick: () => {this.onToolChange(this.tools.undo.key, true);}
      }),
      redo: Tools.redo({
        hotKey: 'R',
        onClick: () => {this.onToolChange(this.tools.redo.key, true);}
      }),

      color: Tools.color({}),
      view2D: Tools.view2D({
        hotKey: 'R',
        onClick: (val) => {this.onToolChange(this.tools.view2D.key, val)},
      }),
      layerIndex: Tools.layerIndex({value: 1}),
    };

    // NOTE: Tool Manager does not touch UI Component. It is only managing the tools & model history.
    this.toolManager = new ToolManager({
      tools: CloneDeep(this.tools),
      models: [],
    });

    this.onToolChange = this.onToolChange.bind(this);
    this.onCellClicked = this.onCellClicked.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    let parser = new window.vox.Parser();
    parser.parse(require('../../../games/data/2.vox')).then((voxelData) => {
      this.toolManager.addModel({model: modelUtils.ReformatModel(voxelData)});
      this.forceUpdate();
    });

    window.addEventListener("keydown", this.onKeyDown, false);
    window.addEventListener("keyup", this.onKeyUp, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyDown(key) {
    Utils.ObjGetValues(this.tools).forEach(tool => {
      if (tool.hotKey && tool.onClick && key.key === tool.hotKey.toLowerCase() && tool.type === ToolTypes.mode) {
        this.toolManager.onModeChangeTempStart({key: tool.key});
        this.forceUpdate();
      }
    });
  }

  onKeyUp(key) {
    Utils.ObjGetValues(this.tools).forEach(tool => {
      if (tool.hotKey && tool.onClick && key.key === tool.hotKey.toLowerCase() && tool.type === ToolTypes.mode) {
        this.toolManager.onModeChangeTempStop({key: tool.key});
        this.forceUpdate();
      } else if (tool.hotKey && tool.onClick && key.key === tool.hotKey.toLowerCase() && tool.type !== ToolTypes.mode) {
        tool.onClick();
      }
    });
  }

  onToolChange(key, value) {
    this.toolManager.onToolClicked({key, value});
    this.forceUpdate();
  }

  onCellClicked(cell) {
    if (Array.isArray(cell))
      this.toolManager.onCellClicked(cell);
    else
      this.toolManager.onCellClicked([cell]);
    this.forceUpdate();
  }

  render() {
    let {_t} = this.props;

    return (
      <PageWrapper className={'model-editor'} type={PageWrapper.types.NORMAL}>

        <Navbar big/>

        <Container className={'model-editor__container'} size={Container.sizes.BIG}>

          <div className={'model-editor__tool-bar'}>
            <div className={'group'}>
              <div className={'item'}>
                <ToggleTool label={_t('move')} img={require('../../../shared/img/Icons/icon-move.png')}
                            active={this.toolManager.getToolValue(this.tools.move.key)}
                            onClick={this.tools.move.onClick}
                            hotKey={this.tools.move.hotKey}
                />
              </div>
              <div className={'item'}>
                <ToggleTool label={_t('add')} img={require('../../../shared/img/Icons/icon-draw.png')}
                            active={this.toolManager.getToolValue(this.tools.draw.key)}
                            onClick={this.tools.draw.onClick}
                            hotKey={this.tools.draw.hotKey}
                />
              </div>
              <div className={'item'}>
                <ToggleTool label={_t('paint')} img={require('../../../shared/img/Icons/icon-draw.png')}
                            active={this.toolManager.getToolValue(this.tools.paint.key)}
                            onClick={this.tools.paint.onClick}
                            hotKey={this.tools.paint.hotKey}
                />
              </div>
              <div className={'item'}>
                <ToggleTool label={_t('erase')} img={require('../../../shared/img/Icons/icon-erase.png')}
                            active={this.toolManager.getToolValue(this.tools.erase.key)}
                            onClick={this.tools.erase.onClick}
                            hotKey={this.tools.erase.hotKey}
                />
              </div>
            </div>

            <div className={'group'}>
              <div className={'item'}>
                <ToggleTool label={_t('undo')} img={require('../../../shared/img/Icons/icon-undo.png')}
                            disabled={!this.toolManager.isToolAvailable(this.tools.undo.key)}
                            onClick={this.tools.undo.onClick}
                            hotKey={this.tools.undo.hotKey}
                />
              </div>
              <div className={'item'}>
                <ToggleTool label={_t('redo')} img={require('../../../shared/img/Icons/icon-redo.png')}
                            disabled={!this.toolManager.isToolAvailable(this.tools.redo.key)}
                            onClick={this.tools.redo.onClick}
                            hotKey={this.tools.redo.hotKey}
                />
              </div>
            </div>

            <div className={'group'}>
              <div className={'item'}>
                <ToggleTool label={_t('copy_layer')} img={require('../../../shared/img/Icons/icon-copy.png')}
                            disabled={!this.toolManager.isToolAvailable(this.tools.copyLayer.key)}
                            onClick={this.tools.copyLayer.onClick}
                            hotKey={this.tools.copyLayer.hotKey}
                />
              </div>
              <div className={'item'}>
                <ToggleTool label={_t('paste_layer')} img={require('../../../shared/img/Icons/icon-paste.png')}
                            disabled={!this.toolManager.isToolAvailable(this.tools.pasteLayer.key)}
                            onClick={this.tools.pasteLayer.onClick}
                            hotKey={this.tools.pasteLayer.hotKey}
                />
              </div>
              <div className={'item'}>
                <ToggleTool label={_t('clear_all')} img={require('../../../shared/img/Icons/icon-clear-all.png')}
                            disabled={!this.toolManager.isToolAvailable(this.tools.clear.key)}
                            onClick={this.tools.clear.onClick}
                            hotKey={this.tools.clear.hotKey}
                />
              </div>
              <div className={'item'}>
                <ToggleTool label={_t('clear_layer')} img={require('../../../shared/img/Icons/icon-clear.png')}
                            disabled={!this.toolManager.isToolAvailable(this.tools.clearLayer.key)}
                            onClick={this.tools.clearLayer.onClick}
                            hotKey={this.tools.clearLayer.hotKey}
                />
              </div>
            </div>

            <div className={'group'}>
              <ToggleTool label={_t(this.toolManager.getToolValue(this.tools.view2D.key).label)}
                          img={require('../../../shared/img/Icons/icon-camera.png')}
                          disabled={!this.toolManager.isToolAvailable(this.tools.clearLayer.key)}
                          onClick={() => {this.tools.view2D.onClick()}}
                          hotKey={this.tools.clearLayer.hotKey}
              />
            </div>

            {/*<div className={'group'}>*/}
            {/*<div className={'item'}>*/}
              {/*<ButtonNew color={ButtonNew.colors.ORANGE} label={_t('save')} onClick={() => {*/}

                {/*}}/>*/}
              {/*</div>*/}
            {/*</div>*/}

          </div>

          {/*<div className="model-editor__header">*/}
            {/*<Dropdown className={'dropdown'} list={this.tools.view2D.options.map(option => ({*/}
              {/*content: <div className={'model-editor__2d-view-option'}>{_t(option.label)}</div>,*/}
              {/*onClick: () => {this.onToolChange(this.tools.view2D.key, option)},*/}
              {/*}))}>*/}
              {/*<div className={'model-editor__2d-view-option'}>*/}
                {/*{_t(this.toolManager.getToolValue(this.tools.view2D.key).label)}*/}
              {/*</div>*/}
            {/*</Dropdown>*/}
          {/*</div>*/}

          <div className={'model-editor__canvas'}>
            <div className={'model-editor__left'}>
              <div className={'model-editor__3d'}>
                <Model3D model={this.toolManager.model} tools={CloneDeep(this.toolManager.tools)} onCellClicked={this.onCellClicked}/>
              </div>
            </div>

            <div className={'model-editor__right'}>
              <div className={'model-editor__2d'}>
                <Layer2D layer={this.toolManager.layer} tools={CloneDeep(this.toolManager.tools)} onCellClicked={this.onCellClicked}/>
              </div>
            </div>
          </div>

          <div className="model-editor__tool">
            <div className={'model-editor__colors'}>
              <ColorTool toolKey={this.tools.color.key}
                          value={this.toolManager.getToolValue(this.tools.color.key)}
                          options={this.tools.color.options}
                          onChange={(val) => {this.onToolChange(this.tools.color.key, val)}}/>
            </div>

            <div className={'model-editor__layer'}>
              <SlideBar valMin={1} valMax={this.toolManager.numLayers}
                        value={this.toolManager.getToolValue(this.tools.layerIndex.key)}
                        onChange={(val) => {this.onToolChange(this.tools.layerIndex.key, val)}}
                        label={_t('select_layer')}
              />
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
