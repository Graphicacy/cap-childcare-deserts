import * as React from 'react';
import { style } from 'typestyle';
import { StateName, stateData, stateList } from '../../states';
import { Colors } from '../../colors';
import { format } from 'd3-format';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

const percent = format('.0%');

const barChartTitleClass = style({
  fontWeight: 'bold',
  fontSize: 14
});

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

export type StateBarChartProps = Readonly<{
  selectedState?: StateName;
}>;

export const StateBarChart = ({ selectedState }: StateBarChartProps) =>
  <div className={barChartContainer}>
    <div className={barChartTitleClass}>
      Percent in a child care desert, by state
    </div>
    <VictoryChart width={600} domainPadding={{ x: 20 }}>
      <VictoryBar
        y="percent"
        x="abbr"
        data={data.map(x => ({
          ...x,
          fill:
            !selectedState || x.state === selectedState
              ? Colors.ORANGE
              : Colors.GRAY
        }))}
      />
      <VictoryAxis dependentAxis tickFormat={percent} />
      <VictoryAxis />
    </VictoryChart>
  </div>;
