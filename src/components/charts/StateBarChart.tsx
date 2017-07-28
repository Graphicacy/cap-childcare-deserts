import { createElement } from 'react';
import { style } from 'typestyle';

import { StateName, stateData, stateList } from '../../states';
import { Colors } from '../../colors';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import ChartContainer from './ChartContainer';
import { percent } from '../../utils';

const data = stateList.filter(s => s !== 'All states').map(s => ({
  percent: stateData[s].percentInDesertsAll,
  abbr: stateData[s].abbr,
  state: s
}));

data.sort((a, b) => a.percent - b.percent);

type StateBarChartProps = Readonly<{
  selectedState: StateName | null;
}>;

const StateBarChart = ({ selectedState }: StateBarChartProps) =>
  <ChartContainer title="Percent in a child care desert, by state">
    <VictoryChart width={600} domainPadding={{ x: 20 }}>
      <VictoryBar
        y="percent"
        x="abbr"
        style={{ data: { width: 15 } }}
        data={data.map(x => ({
          ...x,
          fill:
            !selectedState || x.state === selectedState
              ? Colors.ORANGE
              : Colors.GRAY
        }))}
      />
      <VictoryAxis dependentAxis tickFormat={percent} tickCount={7} />
      <VictoryAxis />
    </VictoryChart>
  </ChartContainer>;

export default StateBarChart;
