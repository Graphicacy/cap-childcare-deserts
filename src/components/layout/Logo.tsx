import { createElement } from 'react';
import { logoImageClass } from './styles';

export const Logo: React.StatelessComponent<{}> = () =>
  <img
    className={logoImageClass}
    src={require('../../../images/cap-logo-color-min.png')}
  />;
