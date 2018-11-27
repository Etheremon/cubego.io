import React, {Component} from 'react';
import BabylonX from "../../babylonX";
import VoxBattle from "../../3d/VoxBattle.jsx";
import Popup from "../../../views/widgets/Popup/Popup.jsx";
import {GetLoggedInUserId, GetSavedModel, GetUserInfo, GetUserNumberOfMaterials} from "../../../reducers/selectors";
import {getTranslate} from "react-localize-redux";
import withRouter from "react-router-dom/es/withRouter";
import connect from "react-redux/es/connect/connect";

require("style-loader!./Battle.scss");


class _Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battle: {},
      showWebglError: false,
      showCubegonSelect: false,
    };
    this.toggleCubegonSelect = this.toggleCubegonSelect.bind(this);
    this.onModelSelect = this.onModelSelect.bind(this);
  }

  onModelSelect(item, idx) {
    this.setState({showCubegonSelect: false});
    this.voxel.setPlayer(1, item);
  }

  componentDidMount() {
    this.voxel = BabylonX.render(<VoxBattle battle={this.state.battle}
                                            changeCubegon={this.toggleCubegonSelect}/>, document.getElementById('battle'));
    if (this.voxel) {
      this.loadModel();
    } else {
      this.setState({showWebglError: true});
    }
  }

  componentWillUnmount() {
    if (this.voxel) {
      BabylonX.stopRender();
      this.voxel.destroy();
      this.voxel = null;
    }
  }

  loadModel() {
    let parser = new window.vox.Parser();

    let model2Parser = parser.parse(require('../../../shared/sample_models/cat.vox'));
    let model1Parser = parser.parse(require('../../../shared/sample_models/momotaro.vox'));
    Promise.all([model1Parser, model2Parser]).then((data) => {
      this.voxel.setPlayer(0, {model: data[0], image: require('../../../shared/img/game_ui/momotoro1.png'), type: 'magical_voxel'});
      this.voxel.setPlayer(1, {model: data[1], image: '', type: 'magical_voxel'});
    });
  }

  toggleCubegonSelect() {
    this.setState({showCubegonSelect: true});
  }

  render() {
    let {savedModel, _t} = this.props;

    return (
      <div className={'battle-3d-view'}
           onWheel={(e) => {
             e.preventDefault();
           }}>
        {this.state.showWebglError ? <div className={'battle-3d-view__webgl-error'}>
          WebGL not supported by your browser <a href="https://get.webgl.org">More information</a>
        </div> : null}
        {this.state.showCubegonSelect ?
          <Popup onUnmount={() => {
            this.setState({showCubegonSelect: false})
          }}
                 open={this.state.showCubegonSelect} size={'large'}>
            <div className={'battle-3d-view__select-cubegons'}>
              {
                savedModel.map((item, idx) => {
                  return <div className={'template'} key={idx} onClick={() => {
                    this.onModelSelect(item, idx)
                  }}>
                    <img className={'img'}
                         src={item.image ? item.image : require('../../../shared/sample_models/0.png')}/>
                    <div className={'name'}>
                      {_t(`saved model ${idx}`)}
                    </div>
                  </div>
                })
              }
            </div>
          </Popup> : null
        }

        <canvas id='battle' width="960" height="540"/>
      </div>
    );
  }
}

const mapStateToProps = (store, props) => {
  return {
    _t: getTranslate(store.localeReducer),
    savedModel: GetSavedModel(store)
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export const Battle = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Battle));

