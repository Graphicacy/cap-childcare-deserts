import { createElement } from 'react';
import { connect } from 'react-redux';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryStack
} from 'victory';
import { Dispatch, hideTooltip, showTooltip, State } from '../../store';

import { stateData, StateName } from '../../data';
import { Colors } from '../colors';
import ChartContainer from './ChartContainer';
import { niceNumber } from './format';

type DataArray = Array<{ type: string; value: number }>;

interface UrbanicityChartProps {
  style: React.CSSProperties;
  selectedState: StateName;
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
}

const eventCache: { [key: string]: any } = {};
const dataCache: {
  [key in StateName]?: {
    desert: DataArray;
    nonDesert: DataArray;
  }
} = {};

const colorScale = [Colors.ORANGE, Colors.GRAY];

const strokeStyle = {
  data: {
    strokeWidth: 2,
    stroke: 'white'
  }
};

const labelStyles = { fontFamily: 'Open Sans' };
const tickStyles = { tickLabels: labelStyles };
const stackLabel = (datum: { type: string }) => datum.type;
const animate = { duration: 500 };
const domainPadding = { y: 30 };
const padding = {
  top: 0,
  left: 100,
  right: 30,
  bottom: 50
};

const UrbanicityChart: React.StatelessComponent<UrbanicityChartProps> = props =>
  <ChartContainer
    title="Children in a child care desert, by urbanicity"
    style={props.style}
  >
    <VictoryChart domainPadding={domainPadding} padding={padding} height={200}>
      <VictoryStack
        horizontal
        colorScale={colorScale}
        labels={stackLabel}
        labelComponent={
          <VictoryLabel style={labelStyles} x={90} textAnchor="end" />
        }
      >
        <VictoryBar
          x="type"
          y="value"
          style={strokeStyle}
          events={createEvents(props, true)}
          animate={animate}
          data={getData(props.selectedState).desert}
        />
        <VictoryBar
          x="type"
          y="value"
          style={strokeStyle}
          events={createEvents(props, false)}
          animate={animate}
          data={getData(props.selectedState).nonDesert}
        />
      </VictoryStack>
      <VictoryAxis style={tickStyles} tickFormat={niceNumber} tickCount={3} />
    </VictoryChart>
  </ChartContainer>;

export default UrbanicityChart;

/**
 * create event handlers for chart
 */
function createEvents(props: UrbanicityChartProps, inDesert: boolean): any {
  const key = inDesert.toString();
  if (key in eventCache) return eventCache[key];

  const { onMouseOut, onMouseOver } = props;
  return (eventCache[key] = [
    {
      target: 'data' as 'data',
      eventHandlers: {
        onMouseOut,
        onMouseOver(event: any, { datum }: any) {
          const value = niceNumber(datum.value);
          const type = datum.type;
          const label = `${!inDesert ? 'not ' : ''}in desert (${type})`;
          onMouseOver(value, label);
        }
      }
    }
  ]);
}

function addWidth(x: { type: string; value: number }) {
  return {
    ...x,
    width: 35
  };
}

/**
 * memoized function to get state data
 *
 * @param name state name
 */
function getData(name: StateName) {
  const stateName: StateName = name || 'All states';

  if (stateName in dataCache) return dataCache[stateName]!;

  const data = stateData[stateName];

  const desert = [
    {
      type: 'Rural',
      value: data.ruralInDeserts
    },
    {
      type: 'Suburban',
      value: data.suburbanInDeserts
    },
    {
      type: 'Urban',
      value: data.urbanInDeserts
    }
  ].map(addWidth);

  const nonDesert = [
    {
      type: 'Rural',
      value: data.ruralNondeserts
    },
    {
      type: 'Suburban',
      value: data.suburbanNondeserts
    },
    {
      type: 'Urban',
      value: data.urbanNondeserts
    }
  ].map(addWidth);

  const result = { nonDesert, desert };

  return (dataCache[stateName] = result);
}
