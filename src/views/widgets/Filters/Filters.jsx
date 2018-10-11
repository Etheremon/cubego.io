import React from "react"
import PropTypes from "prop-types";
import * as Utils from "../../../utils/utils";
import { Icon } from '../../components/Icon/Icon.jsx';
import { orderBy } from '../../../utils/arrayUtils';

require("style-loader!./Filters.scss");

export const FilterSearch = ({_t, searchFields, value, key}) => {
  return {
    key: key || 'search',
    type: 'input',
    placeholder: `${_t('txt.search')}...`,
    defaultValue: '',
    value: Utils.ConvertNonNullToString(value),
    icon: <Icon name={'search'} />,
    filterFunc: (objs, searchText) => {
      searchText = `${searchText}`.toLowerCase();
      return objs.filter(obj => searchFields.some(field => obj[field]
        && _t(`${obj[field]}`).toLowerCase
        && _t(`${obj[field]}`).toLowerCase().includes(searchText)));
    }
  };
};

export const FilterSort = ({_t, sortTypes, defaultSort, value, right, key}) => {
  let options = sortTypes.map(sortType => ({value: sortType[0], label: _t(sortType[1])}));

  return {
    key: key || 'sort',
    type: 'select',
    options: options,
    defaultValue: defaultSort,
    value: Utils.ConvertNonNullToString(value),
    right: right || false,
    icon: <Icon name={'sort'}/>,
    filterFunc: (list, val) => {
      let keys = val.split(' ');
      list = list.map(e => ({...e}));
      return orderBy(list, keys.map(key => key.slice(1)), keys.map(key => key[0] === '-' ? 'desc' : 'asc'))
    },
  }
};

export const FilterType = ({_t, key, value}) => {
  let types = sortBy(Utils.ObjGetValues(MONSTER_TYPES)).map(k => {
    return {
      value: `${k}`,
      label: (
        <div className={'filter-monster-type'}>
          <MonsterTypeImage type={k}/>
          {_t(`type.${GetTypeName(k)}`)}
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
          <div className={'filter-monster-type'}>
            <Image img={'ball32'}/>
            {_t('txt.all_types')}
          </div>
        ),
      },
      ...types,
    ],
    defaultValue: 'all',
    value: Utils.ConvertNonNullToString(value),
    filterFunc: (monsters, typ) => {
      if (typ === 'all') return monsters;
      return monsters.filter(monster => monster.types.includes(parseInt(typ)))
    }
  }
};