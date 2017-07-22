import * as React from 'react';
import { style } from 'typestyle';

const headerClass = style({
  height: 64,
  width: '100%',
  backgroundColor: 'white',
  boxShadow: '0 4px 2px 0px #ccc;'
});

const logoClass = style({
  height: '100%',
  marginLeft: 50
});

export const Header = () =>
  <div className="columns col-gapless">
    <div className={`column col-12 ${headerClass}`}>
      <img src="images/cap-logo-fullcolor.png" className={logoClass} />
    </div>
  </div>;
