import React from "react"
import PropTypes from "prop-types";
import * as Utils from "../../../utils/utils";
import { Icon } from '../../components/Icon/Icon.jsx';
import { OrderBy } from '../../../utils/arrayUtils';
import { CUBE_TYPES } from '../../../constants/cubego';
import { GetValues } from "../../../utils/objUtils";

require("style-loader!./Filters.scss");

export const FilterSearch = ({_t, searchFields, value, key}) => {
  return {
    key: key || 'search',
    type: 'input',
    placeholder: `${_t('search')}...`,
    defaultValue: '',
    value: Utils.ConvertNonNullToString(value),
    icon: <Icon name={'fas fa-search'} />,
    filterFunc: (objs, searchText) => {
      searchText = `${searchText}`.toLowerCase();
      return objs.filter(obj => searchFields.some(field => obj[field]
        && _t(`${obj[field]}`).toLowerCase
        && _t(`${obj[field]}`).toLowerCase().includes(searchText)));
    }
  };
};

export const FilterSort = ({_t, sortTypes, defaultSort, value, right, key}) => {
  let options = sortTypes.map(sortType => ({value: sortType[0], label: (sortType[1])}));

  return {
    key: key || 'sort',
    type: 'select',
    options: options,
    defaultValue: defaultSort,
    value: Utils.ConvertNonNullToString(value),
    right: right || false,
    icon: <Icon name={'fas fa-sort'}/>,
    filterFunc: (list, val) => {
      let keys = val.split(' ');
      list = list.map(e => ({...e}));
      return OrderBy(list, keys.map(key => key.slice(1)), keys.map(key => key[0] === '-' ? 'desc' : 'asc'))
    },
  }
};

export const FilterType = ({_t, key, value, right}) => {
  let types = OrderBy(GetValues(CUBE_TYPES), ['name'], ['asc']).map(k => {
    return {
      value: `${k.name}`,
      label: (
        <div className={'filter-cubegon-type'}>
          <img src={require(`../../../shared/img/types/${k.name}.png`)} />
          {_t(`${k.name}`)}
        </div>
      ),
    }
  });

  return {
    key: key || 'type',
    type: 'select',
    options: [
      {
        value: 'all',
        label: (
          <div className={'filter-cubegon-type'}>
            <img src={require(`../../../shared/img/icons/${'icon-emont'}.png`)} />
            {_t('all_types')}
          </div>
        ),
      },
      ...types,
    ],
    right: right || false,
    defaultValue: 'all',
    value: Utils.ConvertNonNullToString(value),
    filterFunc: (cubegons, typ) => {
      if (typ === 'all') return cubegons;
      return cubegons.filter(cubegon => CUBE_TYPES[cubegon.type_id].name === typ)
    }
  }
};