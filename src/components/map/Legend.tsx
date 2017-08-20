import { createElement } from 'react';
import { style } from 'typestyle';
import { Colors } from '../colors';
import { TRACT_CONTROL_INDENT } from './tracts';

const bins = [
  ['60%+', Colors.STEP_60],
  ['50-60%', Colors.STEP_50_60],
  ['40-50%', Colors.STEP_40_50],
  ['30-40%', Colors.STEP_30_40],
  ['-30%', Colors.STEP_30]
];

const legendClass = style({
  backgroundColor: Colors.INFO_BACKGROUND,
  padding: 15,
  borderRadius: 5,
  lineHeight: '1em',
  display: 'block',
  zIndex: 3
});

const legendItemClass = style({
  position: 'relative',
  height: 20
});

const legendSquareClass = style({
  width: 20,
  height: 20,
  display: 'inline-block'
});

const legendBinClass = style({
  marginLeft: 10,
  position: 'relative',
  top: '50%',
  display: 'inline-block'
});

const legendTitleClass = style({
  fontWeight: 'bold',
  fontSize: 14,
  marginBottom: 10,
  lineHeight: '1.25em'
});

type LegendProps = {
  style?: React.CSSProperties;
  horizontal?: boolean;
};

type LegendEntryProps = {
  color: string;
  range: string;
  horizontal?: boolean;
  style?: React.CSSProperties;
};

const LegendEntry = ({ color, range, style, horizontal }: LegendEntryProps) =>
  <div
    className={legendItemClass}
    style={{
      ...style,
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

const Legend = (props: LegendProps) =>
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
