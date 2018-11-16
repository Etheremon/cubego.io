import React from "react"
import {getTranslate} from "react-localize-redux"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loading from "../../components/Loading/Loading.jsx";
import * as Utils from "../../../utils/utils";
import { IsEqual } from '../../../utils/objUtils';
import FilterBar from "../../components/bars/FilterBar/FilterBar.jsx";
import Pagination from '../Pagination/Pagination.jsx';

require("style-loader!./ListView.scss");

const DEFAULT_PAGE_SIZE = 10;

class ListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredItems: undefined,
      toShowItems: undefined,
    };

    this.getItemsToShow = this.getItemsToShow.bind(this);
    this.changePage = this.changePage.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.processProps = this.processProps.bind(this);
  }

  componentDidMount() {
    this.processProps({}, this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.processProps(this.props, nextProps);
  }

  extractFilterValues(filters) {
    let val = {};
    (filters || []).map(filter => {
      val[filter.key] = filter.value !== undefined && filter.value !== null ? filter.value : filter.defaultValue
    });
    return val;
  }

  processProps(prevProps, nextProps) {
    let
      thisFilterValues = this.extractFilterValues(prevProps.filters),
      thisAdvanceFilterValues = this.extractFilterValues(prevProps.advanceFilters),
      nextFilterValues = this.extractFilterValues(nextProps.filters),
      nextAdvanceFilterValues = this.extractFilterValues(nextProps.advanceFilters);

    if (!IsEqual(thisFilterValues, nextFilterValues)
        || !IsEqual(thisAdvanceFilterValues, nextAdvanceFilterValues)
        || prevProps.page !== nextProps.page
        || !IsEqual(prevProps.itemList, nextProps.itemList)) {

      let allFilterValues = {
        ...(nextFilterValues || {}),
        ...(nextAdvanceFilterValues || {}),
        page: nextProps.page || 1,
      };

      this.getItemsToShow(nextProps, allFilterValues);
    }
  }

  getItemsToShow(props, filterValues) {
    let newState = {
      filteredItems: [...props.itemList],
      totalItems: props.totalItems,
      page: filterValues.page,
      itemsPerPage: props.itemsPerPage || DEFAULT_PAGE_SIZE,
    };

    // Start applying filters
    if (props.isDoingFilterInChild && newState.filteredItems) {
      let allFilters = [...(props.filters || []), ...(props.advanceFilters || [])];
      allFilters.forEach(filter => {
        newState.filteredItems = filter.filterFunc(newState.filteredItems, filterValues[filter.key]);
      });
    }

    if (newState.filteredItems) {
      newState.numPages = Math.ceil((newState.totalItems || newState.filteredItems.length) / newState.itemsPerPage);
      newState.toShowItems = newState.filteredItems.slice(
        newState.itemsPerPage * (filterValues.page - 1), newState.itemsPerPage * newState.page
      );
    }

    this.setState(newState);
  }

  changePage(page) {
    // Scroll if necessary
    let wrapperId = this.props.divWrapperId || this.randomId;
    let el = document.getElementById(wrapperId);
    if (el)
      window.scrollTo(el.offsetLeft, el.offsetTop-120);

    this.onFilterChange({page}, {
      ...this.refs['filter-bar'].wrappedInstance.getFilterValues(),
      page: page,
    });
  }


  onFilterChange(actions, values) {
    // If there is a handleFilter, let the parent handle it. Else, do filter itself.
    if (this.props.handleFilter) {
      this.props.handleFilter({page: 1, ...actions}, {page: 1, ...values});
    } else if (this.props.isDoingFilterInChild)
      this.getItemsToShow(this.props, {page: 1, ...values});
  }
  
  render() {
    let {filters, advanceFilters, dark, scrollable} = this.props;
    let {filteredItems, toShowItems, page, numPages} = this.state;

    return (
      <div className="list-view__wrapper" id={this.randomId}>
        <FilterBar ref={'filter-bar'} filters={filters}
                   advanceFilters={advanceFilters} onChange={this.onFilterChange}/>

        <div className="list-view__header">
          {!this.props['listItemName'] ? null :
            <div>
              {this.props.onRefresh
                ? <Icon className={'m--pointer'} name={'refresh'} onClick={() => {this.props.onRefresh()}}/>
                : null
              }
              <p className="list-view__num-cell">
                {`${this.props.totalItems || (filteredItems || []).length} ${this.props['listItemName']}`}
              </p>
            </div>
          }
        </div>

        <div className={`list-view__items-container ${scrollable ? 'scrollable' : ''}`}>
          {toShowItems === undefined
            ? <div className="list-view__items-container--extra">
                <Loading dark={!!dark}/>
              </div>
            : null
          }

          {(toShowItems === null || (toShowItems && toShowItems.length === 0))
            ? (
              this.props.emptyView
                ? this.props.emptyView
                : <div className={'list-view__items-container--extra'}>{this.props._t('txt.no_record_found')}</div>
            ) : null
          }

          {toShowItems && toShowItems.length > 0
            ? this.props.handleGenerateCardView(toShowItems)
            : null
          }
        </div>

        {toShowItems && toShowItems.length > 0 && numPages > 1 ?
          <div className={'list-view__pagination'}>
            <Pagination activeIdx={page}
                        fromIdx={1}
                        toIdx={numPages}
                        onBtnClick={this.changePage} />
          </div> : null
        }
      </div>

    );
  }
}

ListView.defaultProps = {
  filters: [],
  divWrapperId: undefined,
  handleFilter: undefined,
  isDoingFilterInChild: true,
  scrollable: false,
};

ListView.propTypes = {
  extraFilters: PropTypes.node,
  emptyView: PropTypes.element,
  itemList: PropTypes.array,
  filters: PropTypes.array,
  advanceFilters: PropTypes.array,
  divWrapperId: PropTypes.string,
  onRefresh: PropTypes.func,
  handleFilter: PropTypes.any,
  isDoingFilterInChild: PropTypes.bool,
};

const mapStateToProps = (store) => {
  return {
    _t: getTranslate(store.localeReducer)
  }
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListView);
