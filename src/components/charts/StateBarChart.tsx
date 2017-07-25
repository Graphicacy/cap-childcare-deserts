import * as React from 'react';
import { style } from 'typestyle';
import { StateName, stateData, stateList } from '../../states';
import { Colors } from '../../colors';
import { format } from 'd3-format';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import ChartTitle from './ChartTitle';

const percent = format('.0%');

const barChartContainer = style({
  margin: '0 auto',
  textAlign: 'center',
  maxWidth: 700,
  height: 230,
  width: '100%'
});

const data = stateList.filter(s => s !== 'All states').map(s => ({
  percent: stateData[s].percentInDesertsAll,
  abbr: stateData[s].abbr,
  state: s
}));

data.sort((a, b) => {
  return a.percent - b.percent;
});

type StateBarChartProps = Readonly<{
  selectedState: StateName | null;
}>;

const StateBarChart = ({ selectedState }: StateBarChartProps) =>
  <div className={barChartContainer}>
    <ChartTitle>Percent in a child care desert, by state</ChartTitle>
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
  </div>;

export default StateBarChart;
