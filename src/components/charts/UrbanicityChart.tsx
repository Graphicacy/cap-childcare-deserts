import { createElement } from 'react';
import { style } from 'typestyle';
import {
  VictoryChart,
  VictoryBar,
  VictoryStack,
  VictoryAxis,
  VictoryLabel
} from 'victory';
import { connect } from 'react-redux';
import { State, Dispatch, showTooltip, hideTooltip } from '../../store';

import { Colors } from '../colors';
import { StateName, stateData } from '../../data';
import ChartContainer from './ChartContainer';
import { niceNumber } from './format';

type DataArray = { type: string; value: number }[];

type UrbanicityChartProps = {
  selectedState: StateName;
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
};

const cache: {
  [key in StateName]?: { desert: DataArray; nonDesert: DataArray }
} = {};

const colorScale = [Colors.ORANGE, Colors.GRAY];

const strokeStyle = {
  data: {
    strokeWidth: 2,
    stroke: 'white'
  }
};

const UrbanicityChart = (props: UrbanicityChartProps) =>
  <ChartContainer title="Children in a child care desert, by ubanicity">
    <VictoryChart
      domainPadding={{ y: 30 }}
      padding={{
        top: 0,
        left: 100,
        right: 30,
        bottom: 50
      }}
      height={200}
    >
      <VictoryStack
        horizontal
        colorScale={colorScale}
        labels={datum => datum.type}
        labelComponent={<VictoryLabel x={90} textAnchor="end" />}
      >
        <VictoryBar
          x="type"
          y="value"
          style={strokeStyle}
          events={createEvents(props, false)}
          data={getData(props.selectedState).nonDesert}
        />
        <VictoryBar
          x="type"
          y="value"
          style={strokeStyle}
          events={createEvents(props, true)}
          data={getData(props.selectedState).desert}
        />
      </VictoryStack>
      <VictoryAxis tickFormat={niceNumber} tickCount={4} />
    </VictoryChart>
  </ChartContainer>;

export default UrbanicityChart;

/**
 * create event handlers for chart
 */
function createEvents(props: UrbanicityChartProps, inDesert: boolean) {
  const { onMouseOut, onMouseOver } = props;
  return [
    {
      target: 'data' as 'data',
      eventHandlers: {
        onMouseOver() {
          return {
            target: 'data' as 'data',
            mutation(props: any) {
              const value = niceNumber(props.datum.value);
              const type = props.datum.type;
              const label = `${!inDesert ? 'not ' : ''}in desert (${type})`;
              onMouseOver(value, label);
              return props;
            }
          };
        },
        onMouseOut() {
          return {
            target: 'data' as 'data',
            mutation(props: any) {
              onMouseOut();
              return props;
            }
          };
        }
      }
    }
  ];
}

/**
 * memoized function to get state data
 *
 * @param name state name
 */
function getData(name: StateName | null) {
  const stateName: StateName = name || 'All states';

  if (stateName in cache) return cache[stateName]!;

  const data = stateData[stateName];

  const desert = [
    {
      type: 'RURAL',
      value: data.chidrenUnder5InDesertsRural
    },
    {
      type: 'SUBURBAN',
      value: data.childrenUnder5InDesertsSuburban
    },
    {
      type: 'URBAN',
      value: data.childrenUnder5InDesertsUrban
    }
  ];

  const nonDesert = [
    {
      type: 'RURAL',
      value: data.childrenUnder5NotInDesertsRural
    },
    {
      type: 'SUBURBAN',
      value: data.childrenUnder5NotInDesertsSuburban
    },
    {
      type: 'URBAN',
      value: data.childrenUnder5NotInDesertsUrban
    }
  ];

  const result = { nonDesert, desert };

  return (cache[stateName] = result);
}
