import { createElement } from 'react';
import { style } from 'typestyle';

const titleClass = style({
  fontWeight: 'bold',
  textAlign: 'center',
  width: '100%',
  fontSize: 24,
  fontFamily: 'Roboto Slab',
  lineHeight: '3em'
});

const Title: React.StatelessComponent = ({ children }) =>
  <div className={titleClass}>
    {children}
  </div>;

export default Title;
