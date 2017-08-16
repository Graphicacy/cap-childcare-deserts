import { createElement, ReactNode } from 'react';

import {
  VictoryPie,
  VictoryLabel,
  EventPropTypeInterface,
  StringOrNumberOrCallback
} from 'victory';

import { style } from 'typestyle';

import { Colors } from '../colors';
import { percent } from './format';

const donutTitleClass = style({
  textAlign: 'center',
  width: '100%'
});

const percentClass = style({
  fontFamily: 'Open Sans'
});

export type DonutProps = Readonly<{
  n: number;
  size?: number;
  title?: string | ReactNode;
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
}>;

const noLabel = (x: any) => '';

const Donut = ({
  n,
  title = 'Title',
  size = 130,
  onMouseOut,
  onMouseOver
}: DonutProps) =>
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
        innerRadius={38}
        labels={noLabel}
        animate={{
          duration: 500
        }}
        data={[
          {
            y: n,
            fill: Colors.ORANGE,
            inDesert: true,
            stroke: 'white',
            strokeWidth: 2
          },
          {
            y: 1 - n,
            fill: Colors.GRAY,
            inDesert: false,
            stroke: 'white',
            strokeWidth: 2
          }
        ]}
        events={
          [
            {
              target: 'data',
              eventHandlers: {
                onMouseOut,
                onMouseOver(event: any, props: any) {
                  const { datum: { inDesert, y } } = props;
                  onMouseOver(percent(y), `${inDesert ? '' : 'not '}in desert`);
                }
              }
            }
          ] as any // hack for typings
        }
        standalone={false}
      />
      <text
        className={percentClass}
        x="50%"
        y="50%"
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {percent(n)}
      </text>
    </svg>
    <div className={donutTitleClass}>
      {title}
    </div>
  </div>;

export default Donut;
