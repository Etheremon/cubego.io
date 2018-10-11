import React from "react"
import {getTranslate} from "react-localize-redux"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Input } from '../../../widgets/Input/Input.jsx';

require("style-loader!./FilterBar.scss");

class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdvanceFiltersOpen: false,
    };

    this.values = {};
    let allFilters = props.advanceFilters ? [...props.filters, ...props.advanceFilters] : props.filters;
    allFilters.map(f => {
      this.values[f.key] = f.value !== undefined && f.value !== null ? f.value : f.defaultValue
    });

    this.onAdvanceFiltersClicked = this.onAdvanceFiltersClicked.bind(this);
    this.getFilterValues = this.getFilterValues.bind(this);
  }

  onAdvanceFiltersClicked() {
    this.setState({isAdvanceFiltersOpen: !this.state.isAdvanceFiltersOpen});
  }

  getFilterValues() {
    return this.values;
  }

  renderAdvanceFilters(advanceFilters, onChange) {
    let advanceFilterLeftEls = [], advanceFilterRightEls = [];
    if (advanceFilters && advanceFilters.length > 0) {
      advanceFilters.forEach((filter) => {
        let res = this.getFilterElement(filter, onChange);
        if (filter.right) advanceFilterRightEls.push(res);
        else advanceFilterLeftEls.push(res);
      });
      return (
        <div>
          <div className={`filter-bar__advance ${this.state.isAdvanceFiltersOpen ? 'open' : 'close'}`}>
            <div className={`filter-bar__basic`}>
              <div className='filter-bar__left'>
                {advanceFilterLeftEls}
              </div>
              <div className='filter-bar__right'>
                {advanceFilterRightEls}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderBasicFilters(filters, hasAdvanceFilters, onChange) {
    let filterLeftEls = [], filterRightEls = [];
    filters.forEach((filter) => {
      let res = this.getFilterElement(filter, onChange);
      if (filter.right) filterRightEls.push(res);
      else filterLeftEls.push(res);
    });

    if (hasAdvanceFilters) {
      filterRightEls.push(
        <div key={-1} className={`filter-bar__filter-toggle filter-bar__filter ${this.state.isAdvanceFiltersOpen ? 'open' : 'close'}`} onClick={this.onAdvanceFiltersClicked}>
          <Icon name={'filter'}/>
          {this.props._t('txt.filters')}
        </div>
      );
    }

    return (
      <div className={`filter-bar__basic`}>
        <div className='filter-bar__left'>
          {filterLeftEls}
        </div>
        <div className='filter-bar__right'>
          {filterRightEls}
        </div>
      </div>
    );
  }

  getFilterElement(filter, onChange) {
    if (filter.type === 'input') {
      return (
        <div key={filter.key} className={'filter-bar__filter'}>
          <Input size={'small'}
                 placeholder={filter.placeholder}
                 icon={filter.icon}
                 defaultValue={filter.value || filter.defaultValue}
                 value={filter.value || filter.defaultValue}
                 onChange={v => {
                   this.values[filter.key] = v;
                   onChange && onChange({[filter.key]: v}, this.values);
                 }}/>
        </div>
      );
    }
    else if (filter.type === 'checkbox')
      return (
        <div key={filter.key} className={'filter-bar__filter'}>
          
        </div>
      );
    else if (filter.type === 'advanceCheckbox') 
      return (
        <div key={filter.key} className={'filter-bar__filter'}>
          
        </div>
      );
    else if (filter.type === 'select') {
      return (
        <div key={filter.key} className={'filter-bar__filter'}>
          
        </div>
      );
    } else if (filter.type === 'range-input') {
      let vv = filter.value || filter.defaultValue;
      return (
        <div key={filter.key} className={'filter-bar__filter'}>
          <div className={'filter-bar__filter-range'}>
  
          </div>
        </div>
      );
    }
  }

  render() {
    let {filters, advanceFilters, onChange} = this.props;

    return (
      <div className={`filter-bar`}>
        {this.renderBasicFilters(filters, advanceFilters && advanceFilters.length, onChange)}
        {this.renderAdvanceFilters(advanceFilters, onChange)}
      </div>
    );
  }

}

const mapStateToProps = (store) => ({_t: getTranslate(store.localeReducer)});

const mapDispatchToProps = (dispatch) => ({});

FilterBar.defaultProps = {
  filters: [],
  advanceFilters: []
};

FilterBar.propTypes = {
  filters: PropTypes.array,
  advanceFilters: PropTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(FilterBar);