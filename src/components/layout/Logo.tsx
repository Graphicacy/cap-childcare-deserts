import { createElement } from 'react';
import { media, style } from 'typestyle';

const logoClass = style({
  width: 200,
  position: 'absolute',
  top: 5
});

export const Logo: React.StatelessComponent<{}> = () =>
  <img
    className={logoClass}
    src={require('../../../images/cap-logo-color-min.png')}
  />;
