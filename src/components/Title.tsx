import * as React from 'react';
import { style } from 'typestyle';

const headerClass = style({
  fontWeight: 'bold',
  textAlign: 'center',
  width: '100%',
  fontSize: 20,
  marginBottom: 20
});

const Title: React.StatelessComponent = ({ children }) =>
  <div className={headerClass}>
    {children}
  </div>;

export default Title;
