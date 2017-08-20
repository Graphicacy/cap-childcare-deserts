import { content } from 'csstips';
import { createElement, StatelessComponent } from 'react';
import { style } from 'typestyle';

const barChartTitleClass = style({
  fontWeight: 'bold',
  fontSize: 14,
  width: '100%',
  textAlign: 'center',
  marginBottom: 20
});

const chartContainerClass = style(content);

const ChartContainer: StatelessComponent<{
  title: string;
  style?: React.CSSProperties;
}> = props =>
  <div className={chartContainerClass} style={props.style}>
    <div className={barChartTitleClass}>
      {props.title}
    </div>
    {props.children}
  </div>;

export default ChartContainer;
