import React from 'react';

require('style-loader!./Text.scss');

export const TextImage = ({
  className, text, imgSource, uppercase, capitalize, onClick, order,
}) => (
  <div
    className={
      // eslint-disable-next-line max-len
      `widget__text-image ${className !== undefined ? className : ''} ${uppercase !== undefined ? 'uppercase' : ''} ${capitalize !== undefined ? 'capitalize' : ''}`
    }
    onClick={(e) => {
      e.stopPropagation();
      onClick && onClick(e);
    }}
  >
    <span style={{ order: `${order === TextImage.order.REVERSE ? '1' : '0'}` }}>{text}</span>
    <img src={imgSource} />
  </div>
);

TextImage.order = {
  NORMAL: 'normal',
  REVERSE: 'reverse',
};

TextImage.defaultProps = {
  order: TextImage.order.NORMAL,
};
