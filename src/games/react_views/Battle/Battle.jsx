import React, { Component } from 'react';
import { getTranslate } from 'react-localize-redux';
import withRouter from 'react-router-dom/es/withRouter';
import connect from 'react-redux/es/connect/connect';
import vox from 'vox.js';
import BabylonX from '../../babylonX';
import VoxBattle from '../../3d/VoxBattle.jsx';
import Popup from '../../../views/widgets/Popup/Popup.jsx';
import {
  GetCubegonInfo,
  GetSavedModel,
} from '../../../reducers/selectors';

require('style-loader!./Battle.scss');

const TEMPLATES = [
  [
    require('../../../shared/sample_models/batman.vox'),
    require('../../../shared/img/game_ui/batman.png'),
  ],
  [
    require('../../../shared/sample_models/iron_man.vox'),
    require('../../../shared/img/game_ui/ironman.png'),
  ],
  [
    require('../../../shared/sample_models/momotaro.vox'),
    require('../../../shared/img/game_ui/momotoro1.png'),
  ],
  [
    require('../../../shared/sample_models/cat.vox'),
    require('../../../shared/img/game_ui/cat.png'),
  ],
];

class _Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battle: {},
      showWebglError: false,
      showCubegonSelect: false,
      gonSelectionIdx: 0,
    };
    this.toggleCubegonSelect = this.toggleCubegonSelect.bind(this);
    this.onModelSelect = this.onModelSelect.bind(this);
    this.parser = new vox.Parser();
  }

  onModelSelect(item) {
    if (item.model) {
      const playerData = {
        image: item.image,
        model: item.model,
      };
      this.voxel.setPlayer(this.state.gonSelectionIdx, playerData);
      this.setState({ showCubegonSelect: false });
    } else {
      this.parser.parse(item[0]).then((data) => {
        this.voxel.setPlayer(this.state.gonSelectionIdx, {
          model: data,
          image: item[1],
          type: 'magical_voxel',
        });
        this.setState({ showCubegonSelect: false });
      });
    }
  }

  componentDidMount() {
    this.voxel = BabylonX.render(<VoxBattle
      battle={this.state.battle}
      changeCubegon={this.toggleCubegonSelect}
    />, document.getElementById('battle'), { width: 960, height: 540 });
    if (this.voxel) {
      this.loadModel();
    } else {
      this.setState({ showWebglError: true });
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
    const i1 = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
    this.parser.parse(i1[0]).then((data) => {
      this.voxel.setPlayer(1, {
        model: data,
        image: i1[1],
        type: 'magical_voxel',
      });
    });

    let i2 = i1;
    while (i2 === i1) i2 = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
    this.parser.parse(i2[0]).then((data) => {
      this.voxel.setPlayer(0, {
        model: data,
        image: i2[1],
        type: 'magical_voxel',
      });
    });
  }

  toggleCubegonSelect(idx) {
    this.setState({ gonSelectionIdx: idx, showCubegonSelect: true });
  }

  renderListModel(listModel) {
    return (
      <React.Fragment>
        {listModel.map((item, idx) => (
          <div
            className="template"
            key={idx}
            onClick={() => {
              this.onModelSelect(item);
            }}
          >
            <img
              className="img"
              src={item.image}
            />
            <div className="name">
              {item.name}
            </div>
          </div>
        ))}

        {TEMPLATES.map((item, idx) => (
          <div
            className="template"
            key={idx}
            onClick={() => {
              this.onModelSelect(item);
            }}
          >
            <img
              className="img"
              src={item[1]}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { _t, history, savedModel } = this.props;

    return (
      <div
        className="battle-3d-view"
        onWheel={(e) => {
          e.preventDefault();
        }}
      >
        {this.state.showWebglError ? (
          <div className="battle-3d-view__webgl-error">
            WebGL not supported by your browser
            {' '}
            <a href="https://get.webgl.org">More information</a>
          </div>
        ) : null}

        {this.state.showCubegonSelect
          ? (
            <Popup
              onUnmount={() => {
                this.setState({ showCubegonSelect: false });
              }}
              open={this.state.showCubegonSelect}
              size="large"
            >
              <div className="battle-3d-view__select-cubegons">
                {this.renderListModel(savedModel, _t, history)}
              </div>
            </Popup>
          ) : null}

        <canvas id="battle" width="960" height="540" />
      </div>
    );
  }
}

const mapStateToProps = (store, props) => ({
  _t: getTranslate(store.localeReducer),
  savedModel: GetSavedModel(store),
  selectedGon1Info: GetCubegonInfo(store, props.match.params.gon1Id),
  selectedGon2Info: GetCubegonInfo(store, props.match.params.gon2Id),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export const Battle = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Battle));
