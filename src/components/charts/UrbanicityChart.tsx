import { createElement } from 'react';
import { style } from 'typestyle';
import { VictoryChart, VictoryBar, VictoryStack, VictoryAxis } from 'victory';

import { Colors } from '../../colors';
import { StateName, stateData } from '../../states';
import ChartContainer from './ChartContainer';
import { niceNumber } from '../../utils';

type DataArray = { type: string; value: number }[];

type UrbanicityChartProps = {
  selectedState: StateName | null;
};

const cache: {
  [key in StateName]?: { desert: DataArray; nonDesert: DataArray }
} = {};

const colorScale = [Colors.ORANGE, Colors.GRAY];

const UrbanicityChart = ({ selectedState }: UrbanicityChartProps) =>
  <ChartContainer title="Children in a child care desert, by ubanicity">
    <VictoryChart domainPadding={{ y: 30 }} width={600}>
      <VictoryStack horizontal colorScale={colorScale}>
        <VictoryBar x="type" y="value" data={getData(selectedState).desert} />
        <VictoryBar
          x="type"
          y="value"
          data={getData(selectedState).nonDesert}
        />
      </VictoryStack>
      <VictoryAxis tickFormat={niceNumber} />
    </VictoryChart>
  </ChartContainer>;

export default UrbanicityChart;

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
      value: data.childrenUnder5InDesertsSuburban
    },
    {
      type: 'URBAN',
      value: data.childrenUnder5NotInDesertsUrban
    }
  ];

  const result = { nonDesert, desert };

  return (cache[stateName] = result);
}
