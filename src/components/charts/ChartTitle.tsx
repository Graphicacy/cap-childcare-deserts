import * as React from 'react';
import { style } from 'typestyle';

const barChartTitleClass = style({
  fontWeight: 'bold',
  fontSize: 14
});

const ChartTitle: React.StatelessComponent = ({ children }) =>
  <div className={barChartTitleClass}>
    {children}
  </div>;

export default ChartTitle;
