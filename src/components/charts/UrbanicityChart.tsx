import * as React from 'react';
import { style } from 'typestyle';
import { VictoryChart, VictoryBar, VictoryStack, VictoryAxis } from 'victory';
import { format } from 'd3-format';
import { Colors } from '../../colors';
import { StateName, stateData } from '../../states';
import ChartTitle from './ChartTitle';

const numbers = format(',.0f');

type DataArray = { type: string; value: number }[];

const cache: {
  [key in StateName]?: { desert: DataArray; nonDesert: DataArray }
} = {};

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

const colorScale = [Colors.ORANGE, Colors.GRAY];

const UrbanicityChart = ({
  selectedState
}: {
  selectedState: StateName | null;
}) =>
  <div>
    <ChartTitle>Children in a child care desert, by ubanicity</ChartTitle>
    <VictoryChart domainPadding={{ y: 30 }} height={250}>
      <VictoryStack horizontal colorScale={colorScale}>
        <VictoryBar x="type" y="value" data={getData(selectedState).desert} />
        <VictoryBar
          x="type"
          y="value"
          data={getData(selectedState).nonDesert}
        />
      </VictoryStack>
      <VictoryAxis tickFormat={numbers} />
    </VictoryChart>
  </div>;

export default UrbanicityChart;
