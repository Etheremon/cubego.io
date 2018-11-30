import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import Loading from '../../../components/Loading/Loading.jsx';
import ListView from '../../../widgets/ListView/ListView.jsx';
import { EmptyCubegonList } from '../../EmptyView/EmptyView.jsx';
import GalleryCubegonCard from '../GalleryCubegonCard/GalleryCubegonCard.jsx';
import { Link } from 'react-router-dom/';
import { URLS } from '../../../../constants/general.js';
import { FilterSearch, FilterSort, FilterType } from '../../../widgets/Filters/Filters.jsx';
import * as Utils from "../../../../utils/utils";

require("style-loader!./ShowRoom.scss");

class ShowRoom extends React.Component {
  constructor(props) {
    super(props);

    this.handleGenerateCubegonView = this.handleGenerateCubegonView.bind(this);
  }

  handleGenerateCubegonView(cubegons) {
    return (
      <div className="list-item__container">
        {cubegons.map((item, idx) => 
          <div className="card-item" key={idx}>
            <Link to={`/${URLS.CUBEGONS}/${item.id}`}>
              <GalleryCubegonCard key={idx} {...item} />
            </Link>
          </div>
        )}
      </div>
    )
  }


  render() {

    const {_t, query, listCubegons, history} = this.props;
    
    if (!listCubegons) {
      return (
        <div className="list-item__container">
          <Loading/>
        </div>
      )
    }

    return (
      <div className="show-room__wrapper">
        <ListView
          emptyView={<EmptyCubegonList _t={_t} history={history}/>}
          itemList={listCubegons}
          listItemName={_t('cubegons')}
          handleGenerateCardView={this.handleGenerateCubegonView}
          filters={[
            FilterSearch({_t, searchFields: ['name', 'id', 'token_id'], value: query.search}),
            FilterType({_t, value: query.type, right: true}),
            FilterSort({_t, sortTypes: [
                ['-id', _t('sort.newest_cubegon')],
                ['-total_stats', _t('sort.highest_stats')],
                ['-total_cubego', _t('sort.highest_cubegoes')],
                ['+type_id', _t('sort.type')],
                ['+name', _t('sort.name')],
            ], defaultSort: '-id', value: query.sort, right: true})
          ]}
          page={query.page}
          handleFilter={(filterValues) => {Utils.handleJoinQueryURL(history.push, query, filterValues)}}
        />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowRoom);
