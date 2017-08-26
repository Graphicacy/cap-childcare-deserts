import { createElement } from 'react';
import { Colors } from '../colors';
import {
  legendBinClass,
  legendClass,
  legendItemClass,
  legendSquareClass,
  legendTitleClass
} from './styles';
import { TRACT_CONTROL_INDENT } from './tracts';

const bins = [
  ['60%+', Colors.STEP_60],
  ['50-60%', Colors.STEP_50_60],
  ['40-50%', Colors.STEP_40_50],
  ['30-40%', Colors.STEP_30_40],
  ['-30%', Colors.STEP_30]
];

interface LegendProps {
  style?: React.CSSProperties;
  horizontal?: boolean;
}

interface LegendEntryProps {
  color: string;
  range: string;
  horizontal?: boolean;
  style?: React.CSSProperties;
}

const LegendEntry: React.StatelessComponent<LegendEntryProps> = ({
  color,
  range,
  style: legendStyle,
  horizontal
}) =>
  <div
    className={legendItemClass}
    style={{
      ...legendStyle,
      display: horizontal ? 'inline-block' : 'block',
      marginLeft: horizontal ? 10 : 0,
      marginTop: horizontal ? 5 : 0
    }}
  >
    <span
      className={legendSquareClass}
      style={{
        backgroundColor: color
      }}
    />
    <span
      className={legendBinClass}
      style={{
        transform: horizontal ? 'translateY(-100%)' : 'translateY(-130%)'
      }}
    >
      {range}{' '}
    </span>
  </div>;

const Legend: React.StatelessComponent<LegendProps> = props =>
  <div
    className={legendClass}
    style={{
      ...props.style,
      ...props.horizontal
        ? {
            width: '100%',
            textAlign: 'center'
          }
        : {}
    }}
  >
    <div className={legendTitleClass}>
      Percent living in a child care desert{' '}
    </div>
    <div>
      {bins.map(([range, color]) =>
        <LegendEntry
          key={range}
          range={range}
          color={color}
          horizontal={props.horizontal}
        />
      )}
      <LegendEntry
        range={'(no data)'}
        color={Colors.STEP_NO_DATA_COLOR}
        horizontal={props.horizontal}
      />
    </div>
  </div>;

export default Legend;
