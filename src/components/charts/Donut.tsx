import { createElement, ReactNode } from 'react';

import {
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryLabel,
  VictoryPie
} from 'victory';

import { style } from 'typestyle';
import { Colors } from '../colors';
import { percent } from './format';

export type DonutProps = Readonly<{
  n: number;
  name: string;
  size?: number;
  title?: string | ReactNode;
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
}>;

interface DonutDatum {
  y: number;
  fill: Colors;
  inDesert: boolean;
  stroke: string;
  strokeWidth: number;
}

const donutTitleClass = style({
  textAlign: 'center',
  width: '100%'
});

const percentClass = style({
  fontFamily: 'Open Sans'
});

const svgStyle = { width: '100%' };
const animate = { duration: 500 };

/**
 * need to have empty string function to hide labels
 */
const noLabel = (x: any) => '';

const dataCache: { [key: string]: DonutDatum[] } = {};
function generateData(n: number) {
  const key = `donut-${n}`;
  if (key in dataCache) return dataCache[key];

  return (dataCache[key] = [
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
  ]);
}

const hoverHandlerCache: { [key: string]: any } = {};
function getHoverHandlers(
  key: string,
  onMouseOver: DonutProps['onMouseOver'],
  onMouseOut: DonutProps['onMouseOut']
) {
  if (key in hoverHandlerCache) return hoverHandlerCache[key];

  const handler = [
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
  ]; // hack for typings;

  return (hoverHandlerCache[key] = handler);
}

const Donut: React.StatelessComponent<DonutProps> = ({
  n,
  name,
  title = 'Title',
  size = 130,
  onMouseOut,
  onMouseOver
}) =>
  <div>
    <svg
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMidYMid meet"
      style={svgStyle}
    >
      <VictoryPie
        padding={10}
        width={size}
        height={size}
        innerRadius={38}
        labels={noLabel}
        animate={animate}
        data={generateData(n)}
        events={getHoverHandlers(name, onMouseOver, onMouseOut)}
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
