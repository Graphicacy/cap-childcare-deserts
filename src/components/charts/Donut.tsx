import * as React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';
import { format } from 'd3-format';
import { Colors } from '../../colors';

const percent = format('.0%');

export type DonutProps = Readonly<{
  n: number;
  size?: number;
  title?: string;
}>;

const padding = {
  top: 10,
  right: 10,
  left: 10,
  bottom: 30
};

const Donut = ({ n, title = 'Title', size = 130 }: DonutProps) =>
  <svg
    viewBox={`0 0 ${size} ${size}`}
    preserveAspectRatio="xMidYMid meet"
    style={{ width: '100%' }}
  >
    <VictoryPie
      padding={padding}
      width={size}
      height={size}
      innerRadius={30}
      labels={x => ''}
      data={[{ y: n, fill: Colors.ORANGE }, { y: 1 - n, fill: Colors.GRAY }]}
      standalone={false}
    />
    <text
      x="50%"
      y={(size - padding.bottom - 5) / 2}
      alignmentBaseline="middle"
      textAnchor="middle"
    >
      {percent(n)}
    </text>
    <text
      x="50%"
      y={size - padding.bottom + 15}
      alignmentBaseline="middle"
      textAnchor="middle"
    >
      {title}
    </text>
  </svg>;

export default Donut;
