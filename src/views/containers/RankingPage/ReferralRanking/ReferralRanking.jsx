import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import ListView from '../../../widgets/ListView/ListView.jsx';
import { TextImage } from '../../../widgets/Text/Text.jsx';

require("style-loader!./ReferralRanking.scss");

const sampleData = [{rank: 1, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 2, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 3, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 4, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 5, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 6, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 7, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 8, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 9, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 10, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 11, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 12, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}},
{rank: 13, playerName: 'doreamon', numReferrals: 100, point: 100, reward: {eth: 0.5, emont: 150}}]

const RANKING_TERM = ['first', 'second', 'third'];

class ReferralRanking extends React.Component {
  constructor(props) {
    super(props);
    this.handleGenerateListView = this.handleGenerateListView.bind(this);
  }

  handleGenerateListView(listItems) {
    const {_t} = this.props;
    return (
      <div className="list-item__container">
        <table className={`ranking-table`}>
          <thead>
            <tr className={'header'}>
              <th>{_t('rank')}</th>
              <th>{_t('player')}</th>
              <th>{_t('referral')}</th>
              <th>{_t('point')}</th>
              <th>{_t('ether')}</th>
              <th>{_t('emont')}</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((item, idx) => 
              <tr className={`row ${idx < 3 ? RANKING_TERM[item.rank - 1] : ''}`}>
                <td className={'rank'}>{item.rank}</td>
                <td className={'player'}>{item.playerName}</td>
                <td className={'number-referral'}>{item.numReferrals}</td>
                <td className={'point'}>{item.point}</td>
                <td className={'eth'}>{
                  <TextImage
                  text={item.reward.eth}
                  imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}
                  />
                  }</td>
                <td className={'emont'}>{
                   <TextImage
                   text={item.reward.emont}
                   imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}
                   />
                  }</td>
              </tr>
            )}
            
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    let {_t, query, handleFilter} = this.props;

    return(
      <div className="referral-ranking__container">
        <ListView
          itemList={sampleData}
          listItemName={_t('cubegons')}
          handleGenerateCardView={this.handleGenerateListView}
          filters={[
            // FilterSearch({_t, searchFields: ['name'], value: query.search}),
            // FilterType({_t, value: query.type, right: true}),
            // FilterSort({_t, sortTypes: [
            //   ['-create_time', _t('sort.recent_cubegons')],
            //   ['-total_level -create_time', _t('sort.highest_level')],
            //   ['+total_level -create_time', _t('sort.lowest_level')],
            //   ['-total_bp -create_time', _t('sort.highest_bp')],
            //   ['+total_bp -create_time', _t('sort.lowest_bp')],
            //   ['+name -create_time', _t('sort.name_az')],
            //   ['-name -create_time', _t('sort.name_za')],
            // ], defaultSort: '-level -create_time', value: query.sort, right: true})
          ]}
          page={query.page}
          handleFilter={(filterValues) => {handleFilter && handleFilter(filterValues)}}
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
)(ReferralRanking);
