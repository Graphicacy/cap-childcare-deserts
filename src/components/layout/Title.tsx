import { createElement } from 'react';
import { style } from 'typestyle';

const titleClass = style({
  fontWeight: 'bold',
  textAlign: 'center',
  width: '100%',
  fontSize: 20,
  marginBottom: 20
});

const Title: React.StatelessComponent = ({ children }) =>
  <div className={titleClass}>
    {children}
  </div>;

export default Title;
