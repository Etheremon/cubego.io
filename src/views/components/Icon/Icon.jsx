import React from 'react';

require('style-loader!./Icon.scss');

export const Icon = ({ name }) => (
  <i className={`${name}`} />
);
