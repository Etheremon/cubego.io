import React from 'react';

require('style-loader!./ToggleTool.scss');

export const ToggleTool = ({
  label, hotKey, img, active, disabled, onClick,
}) => {
  let activeClass = '';
  if (active === true) activeClass = 'active';
  if (active === false) activeClass = 'inactive';
  if (disabled) activeClass = 'disabled';

  return (
    <div
      className={`toggle-tool ${activeClass}`}
      onClick={() => { onClick && onClick(); }}
    >
      <div className="toggle-tool__img">
        <img src={img} />

        <div className="toggle-tool__label">
          {label}
          <br />
          {hotKey ? `[${hotKey}] ` : ''}
        </div>
      </div>
    </div>
  );
};
