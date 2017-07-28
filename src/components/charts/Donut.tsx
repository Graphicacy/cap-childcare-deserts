import { createElement, ReactNode } from 'react';
import { VictoryPie, VictoryLabel } from 'victory';
import { style } from 'typestyle';

import { Colors } from '../../colors';
import { percent } from '../../utils';

const donutTitleClass = style({
  textAlign: 'center',
  width: '100%'
});

export type DonutProps = Readonly<{
  n: number;
  size?: number;
  title?: string | ReactNode;
}>;

const Donut = ({ n, title = 'Title', size = 130 }: DonutProps) =>
  <div>
    <svg
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%' }}
    >
      <VictoryPie
        padding={10}
        width={size}
        height={size}
        innerRadius={35}
        labels={x => ''}
        data={[{ y: n, fill: Colors.ORANGE }, { y: 1 - n, fill: Colors.GRAY }]}
        standalone={false}
      />
      <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">
        {percent(n)}
      </text>
    </svg>
    <div className={donutTitleClass}>
      {title}
    </div>
  </div>;

export default Donut;
