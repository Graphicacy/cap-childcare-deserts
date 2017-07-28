import { createElement, StatelessComponent } from 'react';
import { style } from 'typestyle';
import { content } from 'csstips';

const barChartTitleClass = style({
  fontWeight: 'bold',
  fontSize: 14,
  width: '100%',
  textAlign: 'center',
  marginBottom: 20
});

const ChartContainer: StatelessComponent<{ title: string }> = ({
  children,
  title
}) =>
  <div className={style(content)}>
    <div className={barChartTitleClass}>
      {title}
    </div>
    {children}
  </div>;

export default ChartContainer;
