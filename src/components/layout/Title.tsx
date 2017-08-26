import { createElement } from 'react';
import { titleClass } from './styles';

const Title: React.StatelessComponent = ({ children }) =>
  <div className={titleClass}>
    {children}
  </div>;

export default Title;
