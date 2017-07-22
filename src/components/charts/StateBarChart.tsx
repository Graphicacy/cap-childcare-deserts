import * as React from 'react';
import { style } from 'typestyle';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from 'recharts';
import { StateName, stateData, stateList } from '../../states';
import { Colors } from '../../colors';

const barChartContainer = style({
  margin: '0 auto',
  textAlign: 'center',
  maxWidth: 800,
  width: '100%'
});

const data = stateList.map(s => ({
  percent: stateData[s].percentInDesertsAll,
  state: s
}));

data.sort((a, b) => {
  return a.percent - b.percent;
});

/**
 * hack get around typings bug by casting viewBox prop to any
 */
export const StateBarChart = () =>
  <div className={barChartContainer}>
    <ResponsiveContainer height={200}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <XAxis dataKey="state" />
        <YAxis />
        <Tooltip isAnimationActive={false} viewBox={undefined as any} />
        <Bar
          isAnimationActive={false}
          dataKey="percent"
          {...{ fill: Colors.ORANGE }}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>;
