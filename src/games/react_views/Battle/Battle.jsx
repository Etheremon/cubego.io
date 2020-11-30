import React, { Component } from 'react';
import { getTranslate } from 'react-localize-redux';
import withRouter from 'react-router-dom/es/withRouter';
import connect from 'react-redux/es/connect/connect';
import BabylonX from '../../babylonX';
import VoxBattle from '../../3d/VoxBattle.jsx';
import Popup from '../../../views/widgets/Popup/Popup.jsx';
import {
  GetCubegonInfo,
  GetLoggedInUserId,
  GetSavedModel,
  GetUserCubegons,
} from '../../../reducers/selectors';
import { EmptyCubegonList } from '../../../views/containers/EmptyView/EmptyView.jsx';
import { GetImageFromGonID, GetModelFromStructure } from '../../../utils/logicUtils';
import Loading from '../../../views/components/Loading/Loading.jsx';
import { URLS } from '../../../constants/general';

require('style-loader!./Battle.scss');

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
  }

  onModelSelect(item) {
    this.setState({ showCubegonSelect: false });
    let gon1Id = this.props.match.params.gon1Id || -1;
    let gon2Id = this.props.match.params.gon2Id || -1;
    if (this.state.gonSelectionIdx === 1) {
      gon1Id = item.id;
    } else {
      gon2Id = item.id;
    }
    this.props.history.push(`/${URLS.BATTLE}/${gon1Id}/${gon2Id}`);
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

  componentWillReceiveProps(nextProps) {
    if (!this.props.selectedGon1Info || nextProps.match.params.gon1Id !== this.props.match.params.gon1Id) {
      this.setPlayer1Data(nextProps);
    }
    if (!this.props.selectedGon2Info || nextProps.match.params.gon2Id !== this.props.match.params.gon2Id) {
      this.setPlayer2Data(nextProps);
    }
  }

  setPlayer1Data(props) {
    if (props.match.params.gon1Id && props.selectedGon1Info) {
      const playerData = {
        image: GetImageFromGonID(props.match.params.gon1Id),
        model: GetModelFromStructure(props.selectedGon1Info.structure),
      };
      this.voxel.setPlayer(1, playerData);
    }
  }

  setPlayer2Data(props) {
    if (props.match.params.gon2Id && props.selectedGon2Info) {
      const playerData = {
        image: GetImageFromGonID(props.match.params.gon2Id),
        model: GetModelFromStructure(props.selectedGon2Info.structure),
      };
      this.voxel.setPlayer(0, playerData);
    }
  }

  loadModel() {
    const parser = new window.vox.Parser();

    if (
      !this.props.match.params.gon1Id
      || this.props.match.params.gon1Id === '-1'
      || Number.isNaN(this.props.match.params.gon1Id)
    ) {
      parser.parse(require('../../../shared/sample_models/batman.vox')).then((data) => {
        this.voxel.setPlayer(1, {
          model: data,
          image: require('../../../shared/img/game_ui/batman.png'),
          type: 'magical_voxel',
        });
      });
    } else {
      this.setPlayer1Data(this.props);
    }

    if (
      !this.props.match.params.gon2Id
      || this.props.match.params.gon2Id === '-1'
      || Number.isNaN(this.props.match.params.gon2Id)
    ) {
      parser.parse(require('../../../shared/sample_models/iron_man.vox')).then((data) => {
        this.voxel.setPlayer(0, {
          model: data,
          image: require('../../../shared/img/game_ui/ironman.png'),
          type: 'magical_voxel',
        });
      });
    } else {
      this.setPlayer2Data(this.props);
    }
  }

  toggleCubegonSelect(idx) {
    this.setState({ gonSelectionIdx: idx, showCubegonSelect: true });
  }

  renderListModel(listModel, _t, history) {
    if (!listModel) {
      return <Loading />;
    }
    if (listModel.length > 0) {
      return listModel.map((item, idx) => (
        <div
          className="template"
          key={idx}
          onClick={() => {
            this.onModelSelect(item);
          }}
        >
          <img
            className="img"
            src={GetImageFromGonID(item.id)}
          />
          <div className="name">
            {item.name}
          </div>
        </div>
      ));
    }
    return <EmptyCubegonList _t={_t} history={history} />;
  }

  render() {
    const { userCubegons, _t, history } = this.props;

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
                {this.renderListModel(userCubegons, _t, history)}
              </div>
            </Popup>
          ) : null}

        <canvas id="battle" width="960" height="540" />
      </div>
    );
  }
}

const mapStateToProps = (store, props) => {
  const userId = GetLoggedInUserId(store);
  return {
    _t: getTranslate(store.localeReducer),
    savedModel: GetSavedModel(store),
    userCubegons: GetUserCubegons(store, userId),
    selectedGon1Info: GetCubegonInfo(store, props.match.params.gon1Id),
    selectedGon2Info: GetCubegonInfo(store, props.match.params.gon2Id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export const Battle = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Battle));
