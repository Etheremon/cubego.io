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
import {CloneDeep, GetValues} from "../../../utils/objUtils";
import * as modelUtils from "../../../utils/modelUtils";
import Navbar from "../../components/bars/Navbar/Navbar.jsx";
import {PickerBar} from '../../widgets/PickerBar/PickerBar.jsx';
import {HeaderBar} from "../../components/bars/HeaderBar/HeaderBar.jsx";
import {MODEL_TEMPLATES} from "../../../constants/model";
import * as ObjUtils from "../../../utils/objUtils";
import {CUBE_MATERIALS, CUBE_MATERIALS_NAME_TO_ID} from "../../../constants/cubego";
import Footer from "../../components/bars/Footer/Footer.jsx";
import {ButtonNew} from "../../widgets/Button/Button.jsx";
import {GetLoggedInUserId, GetSavedModel} from "../../../reducers/selectors";
import {ModelActions} from "../../../actions/model";

require("style-loader!./ModelEditor.scss");

class _ModelEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTemplates: false,
      scale2D: 1,
      selectedMaterial: CUBE_MATERIALS[CUBE_MATERIALS_NAME_TO_ID.plastic],
      saved: false,
      validating: false,
    };

    this.tools = {
      move: Tools.move({value: true, hotKey: 'W', onClick: () => {
          let currentVal = this.toolManager.getToolValue(this.tools.move.key);
          this.onToolChange(this.tools.move.key, !currentVal);
        }}),
      draw: Tools.draw({value: false, hotKey: 'A', onClick: () => {
          let currentVal = this.toolManager.getToolValue(this.tools.draw.key);
          this.onToolChange(this.tools.draw.key, !currentVal);
      }}),
      paint: Tools.paint({value: false, hotKey: 'S', onClick: () => {
          let currentVal = this.toolManager.getToolValue(this.tools.paint.key);
          this.onToolChange(this.tools.paint.key, !currentVal);
        }}),
      erase: Tools.erase({value: false, hotKey: 'D', onClick: () => {
          let currentVal = this.toolManager.getToolValue(this.tools.erase.key);
          this.onToolChange(this.tools.erase.key, !currentVal);
      }}),
      copyLayer: Tools.copyLayer({
        hotKey: 'V',
        onClick: () => {this.onToolChange(this.tools.copyLayer.key, true);},
      }),
      pasteLayer: Tools.pasteLayer({
        hotKey: 'B',
        onClick: () => {this.onToolChange(this.tools.pasteLayer.key, true);},
      }),
      clear: Tools.clear({
        hotKey: 'H',
        onClick: () => {this.onToolChange(this.tools.clear.key, true);}
      }),
      clearLayer: Tools.clearLayer({
        hotKey: 'G',
        onClick: () => {this.onToolChange(this.tools.clearLayer.key, true);},
      }),
      undo: Tools.undo({
        hotKey: 'Q',
        onClick: () => {this.onToolChange(this.tools.undo.key, true);}
      }),
      redo: Tools.redo({
        hotKey: 'E',
        onClick: () => {this.onToolChange(this.tools.redo.key, true);}
      }),

      nextLayer: {
        hotKey: 'C',
        onClick: () => {this.pickerBar && this.pickerBar.wrappedInstance.nextLayer()}
      },
      prevLayer: {
        hotKey: 'Z',
        onClick: () => {this.pickerBar && this.pickerBar.wrappedInstance.prevLayer()}
      },

      color: Tools.color({value: CUBE_MATERIALS[CUBE_MATERIALS_NAME_TO_ID.plastic].variants[1]}),
      view2D: Tools.view2D({
        hotKey: 'X',
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
    this.onTemplateSelect = this.onTemplateSelect.bind(this);
    this.onZoomIn = this.onZoomIn.bind(this);
    this.onZoomOut = this.onZoomOut.bind(this);
    this.onZoomReset = this.onZoomReset.bind(this);

    this.saveModel = this.saveModel.bind(this);
    this.reviewModel = this.reviewModel.bind(this);
    this.onSavedModelSelect = this.onSavedModelSelect.bind(this);

    this.isHoldingKey = {};
  }

  componentDidMount() {
    if (this.props.savedModel) {
      this.toolManager.addModel({model: this.props.savedModel});
      this.forceUpdate();
    } else {
      let parser = new window.vox.Parser();
      parser.parse(require('../../../shared/sample_models/3.vox')).then((voxelData) => {
        this.toolManager.addModel({model: modelUtils.ReformatModel(voxelData)});
        this.forceUpdate();
      });
    }

    window.addEventListener("keydown", this.onKeyDown, false);
    window.addEventListener("keyup", this.onKeyUp, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyDown(key) {
    if (this.isHoldingKey[key.keyCode]) return;
    this.isHoldingKey[key.keyCode] = true;
    GetValues(this.tools).forEach(tool => {
      if (tool.hotKey && tool.onClick && key.key === tool.hotKey.toLowerCase() && tool.type === ToolTypes.mode) {
        this.toolManager.onModeChangeTempStart({key: tool.key});
        this.forceUpdate();
      }
    });
  }

  onKeyUp(key) {
    this.isHoldingKey[key.keyCode] = false;
    GetValues(this.tools).forEach(tool => {
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

  onTemplateSelect(template) {
    let parser = new window.vox.Parser();
    parser.parse(template.model).then((voxelData) => {
      this.toolManager.addModel({model: modelUtils.ReformatModel(voxelData)});
      this.forceUpdate();
    });
    this.setState({showTemplates: false});
  }

  onSavedModelSelect() {
    let {savedModel} = this.props;
    if (savedModel) {
      this.toolManager.addModel({model: savedModel});
    }
    this.setState({showTemplates: false});
  }

  onZoomIn() {
    this.setState({scale2D: this.state.scale2D + 0.1});
  }

  onZoomOut() {
    this.setState({scale2D: Math.max(0.1, this.state.scale2D - 0.1)});
  }

  onZoomReset() {
    this.setState({scale2D: 1});
  }

  saveModel() {
    this.setState({saved: true});
    this.props.dispatch(ModelActions.SAVE_MODEL.init.func({model: this.toolManager.model}));
  }

  reviewModel() {
    this.setState({validating: true});
    this.props.dispatch(ModelActions.VALIDATE_MODEL.init.func({model: this.toolManager.model, history: this.props.history}));
  }

  render() {
    let {_t, savedModel} = this.props;
    let {selectedMaterial, saved} = this.state;

    let btns = [
      <ButtonNew label={saved ? _t('saved') : _t('save')} color={ButtonNew.colors.TURQUOISE} key={0} onClick={this.saveModel}
                 onMouseOut={() => {this.setState({saved: false})}}/>,
      <ButtonNew loading={this.state.validating}
                 label={_t('preview')} color={ButtonNew.colors.ORANGE} showDeco={ButtonNew.deco.RIGHT} key={1} onClick={this.reviewModel}/>,
    ];

    return (
      <PageWrapper type={PageWrapper.types.BLUE_DARK}>
        <Navbar size={Container.sizes.BIG} minifying label={_t('build_cubegon')} />

        <div className={'model-editor__container'}>

          <HeaderBar size={Container.sizes.BIG} label={_t('build_cubegon')} onBackClicked={() => {this.props.history.goBack()}}/>
          <Container size={Container.sizes.BIG} className={'main-tool'}>

            <div className={'model-editor__tool-bar'}>
              <div className={'group'}>
                <div className={'item'}>
                  <ToggleTool label={_t('template')} img={require('../../../shared/img/icons/icon-template.png')}
                              active={this.state.showTemplates}
                              onClick={() => {this.setState({showTemplates: !this.state.showTemplates})}}
                  />
                </div>
              </div>

              <div className={'group'}>
                <div className={'item'}>
                  <ToggleTool label={_t('move')} img={require('../../../shared/img/icons/icon-move.png')}
                              active={this.toolManager.getToolValue(this.tools.move.key)}
                              onClick={this.tools.move.onClick}
                              hotKey={this.tools.move.hotKey}
                  />
                </div>
                <div className={'item'}>
                  <ToggleTool label={_t('add')} img={require('../../../shared/img/icons/icon-draw.png')}
                              active={this.toolManager.getToolValue(this.tools.draw.key)}
                              onClick={this.tools.draw.onClick}
                              hotKey={this.tools.draw.hotKey}
                  />
                </div>
                <div className={'item'}>
                  <ToggleTool label={_t('paint')} img={require('../../../shared/img/icons/icon-paint.png')}
                              active={this.toolManager.getToolValue(this.tools.paint.key)}
                              onClick={this.tools.paint.onClick}
                              hotKey={this.tools.paint.hotKey}
                  />
                </div>
                <div className={'item'}>
                  <ToggleTool label={_t('erase')} img={require('../../../shared/img/icons/icon-erase.png')}
                              active={this.toolManager.getToolValue(this.tools.erase.key)}
                              onClick={this.tools.erase.onClick}
                              hotKey={this.tools.erase.hotKey}
                  />
                </div>
              </div>

              <div className={'group'}>
                <div className={'item'}>
                  <ToggleTool label={_t('undo')} img={require('../../../shared/img/icons/icon-undo.png')}
                              disabled={!this.toolManager.isToolAvailable(this.tools.undo.key)}
                              onClick={this.tools.undo.onClick}
                              hotKey={this.tools.undo.hotKey}
                  />
                </div>
                <div className={'item'}>
                  <ToggleTool label={_t('redo')} img={require('../../../shared/img/icons/icon-redo.png')}
                              disabled={!this.toolManager.isToolAvailable(this.tools.redo.key)}
                              onClick={this.tools.redo.onClick}
                              hotKey={this.tools.redo.hotKey}
                  />
                </div>
              </div>

              <div className={'group'}>
                <div className={'item'}>
                  <ToggleTool label={_t('copy_layer')} img={require('../../../shared/img/icons/icon-copy.png')}
                              disabled={!this.toolManager.isToolAvailable(this.tools.copyLayer.key)}
                              onClick={this.tools.copyLayer.onClick}
                              hotKey={this.tools.copyLayer.hotKey}
                  />
                </div>
                <div className={'item'}>
                  <ToggleTool label={_t('paste_layer')} img={require('../../../shared/img/icons/icon-paste.png')}
                              disabled={!this.toolManager.isToolAvailable(this.tools.pasteLayer.key)}
                              onClick={this.tools.pasteLayer.onClick}
                              hotKey={this.tools.pasteLayer.hotKey}
                  />
                </div>
                <div className={'item'}>
                  <ToggleTool label={_t('clear_all')} img={require('../../../shared/img/icons/icon-clear-all.png')}
                              disabled={!this.toolManager.isToolAvailable(this.tools.clear.key)}
                              onClick={this.tools.clear.onClick}
                              hotKey={this.tools.clear.hotKey}
                  />
                </div>
                <div className={'item'}>
                  <ToggleTool label={_t('clear_layer')} img={require('../../../shared/img/icons/icon-clear.png')}
                              disabled={!this.toolManager.isToolAvailable(this.tools.clearLayer.key)}
                              onClick={this.tools.clearLayer.onClick}
                              hotKey={this.tools.clearLayer.hotKey}
                  />
                </div>
              </div>

              <div className={'group'}>
                <ToggleTool label={_t(this.toolManager.getToolValue(this.tools.view2D.key).label)}
                            img={
                              require(`../../../shared/img/icons/icon-view-${this.toolManager.getToolValue(this.tools.view2D.key).viewKey}.png`)
                            }
                            onClick={() => {this.tools.view2D.onClick()}}
                            hotKey={this.tools.view2D.hotKey}
                />
              </div>

              {this.state.showTemplates ?
                <div className={'model-editor__templates'}>
                  {MODEL_TEMPLATES.map((template, idx) => (
                    <div key={idx} className={'template'} onClick={() => {this.onTemplateSelect(template)}}>
                      <img className={'img'} src={template.img}/>
                      <div className={'name'}>
                        {_t(template.name)}
                      </div>
                    </div>
                  ))}
                  {savedModel ?
                    <div className={'template'} onClick={this.onSavedModelSelect}>
                      <img className={'img'} src={require('../../../shared/sample_models/0.png')} />
                      <div className={'name'}>
                        {_t('saved model')}
                      </div>
                    </div> : null
                  }
                </div> : null
              }
            </div>

            <div className={'model-editor__stats'}>
              <div className={'material'}>
                <div className={'total'}>
                  {_t('total')}: <span>300</span>
                </div>
                {['diamond', 'glass', 'gold', 'iron', 'plastic', 'silver'].map((type, idx) => (
                  <div key={idx} className={'cube'} tooltip={_t(type)} tooltip-position="bottom">
                    <img src={require(`../../../shared/img/cubegoes/${'001'}.png`)}/>
                    50
                  </div>
                ))}
              </div>
              <div className={'stats'}>
                <div className={'stat'}>
                  <img src={require('../../../shared/img/icons/icon-stats.png')}/>
                  90 - 110
                </div>
                <div className={'stat'}>
                  <img src={require('../../../shared/img/icons/icon-ether.png')}/>
                  0.025
                </div>
              </div>
            </div>

            <div className={'model-editor__canvas'}>
              <div className={'model-editor__left'}>
                <div className={'model-editor__3d'}>
                  <Model3D model={this.toolManager.model} tools={CloneDeep(this.toolManager.tools)} onCellClicked={this.onCellClicked}/>
                </div>
              </div>

              <div className={'model-editor__right'}>
                <div className={'model-editor__2d'}>
                  <Layer2D layer={this.toolManager.layer}
                           style={{transform: `scale(${this.state.scale2D})`}}
                           tools={CloneDeep(this.toolManager.tools)} onCellClicked={this.onCellClicked}/>
                </div>
                <div className={'model-editor__2d-zoom'}>
                  <div className={'item'} onClick={this.onZoomIn}>
                    <img src={require('../../../shared/img/icons/icon-zoom-in.png')}/>
                  </div>
                  <div className={'item'} onClick={this.onZoomOut}>
                    <img src={require('../../../shared/img/icons/icon-zoom-out.png')}/>
                  </div>
                  <div className={'item'} onClick={this.onZoomReset}>
                    <img src={require('../../../shared/img/icons/icon-zoom-reset.png')}/>
                  </div>
                </div>
              </div>
            </div>

            <div className={'model-editor__material'}>
              {ObjUtils.GetValues(CUBE_MATERIALS).map((material, idx) => (
                <div key={idx} className={`cube ${selectedMaterial.name === material.name ? 'active' : ''}`}
                     tooltip={_t(material.name)} tooltip-position="bottom"
                     onClick={() => {
                       this.setState({selectedMaterial: material});
                       this.onToolChange(this.tools.color.key, material.variants[1]);
                     }}>
                  <img src={material.img}/>
                  50
                </div>
              ))}
              {/*<div className={'space-rest'}>*/}
              {/*</div>*/}
            </div>

            <div className="model-editor__tool">
              <div className={'model-editor__colors'}>
                <ColorTool toolKey={this.tools.color.key}
                           value={this.toolManager.getToolValue(this.tools.color.key)}
                           options={selectedMaterial.variants}
                           onChange={(val) => {this.onToolChange(this.tools.color.key, val)}}
                />
              </div>

              <div className={'model-editor__layer'}>
                <PickerBar ref={bar => {this.pickerBar = bar}}
                           valMin={this.toolManager.layer.fromZ} valMax={this.toolManager.layer.toZ}
                           valStep={this.toolManager.layer.fromZ < this.toolManager.layer.toZ ? 1 : -1}
                           value={this.toolManager.getToolValue(this.tools.layerIndex.key)}
                           onChange={(val) => {this.onToolChange(this.tools.layerIndex.key, val)}}
                           label={_t('select_layer')}
                />

                {selectedMaterial && Object.keys(selectedMaterial.variants).length >= 16 ?
                  <div className={'model-editor__layer-btns'}>
                    {btns}
                  </div> : null
                }
              </div>
            </div>

            {selectedMaterial && Object.keys(selectedMaterial.variants).length < 16 ?
              <div className={'model-editor__btns'}>
                {btns}
              </div> : null
            }

          </Container>

        </div>

        <Footer size={Container.sizes.BIG} type={Footer.types.DARK} />
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  let pathName = props.pathname;
  return {
    pathName,
    _t: getTranslate(store.localeReducer),
    savedModel: GetSavedModel(store),
    userId: GetLoggedInUserId(store),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export const ModelEditor = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ModelEditor));
