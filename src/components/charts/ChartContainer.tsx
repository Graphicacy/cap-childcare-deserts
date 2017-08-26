import { createElement, StatelessComponent } from 'react';
import { barChartTitleClass, contentClass } from './styles';

/**
 * Generic container for charts, with title + padding
 */
const ChartContainer: StatelessComponent<{
  title: string;
  style?: React.CSSProperties;
}> = props =>
  <div className={contentClass} style={props.style}>
    <div className={barChartTitleClass}>
      {props.title}
    </div>
    {props.children}
  </div>;

export default ChartContainer;
