import { createElement } from 'react';
import { connect } from 'react-redux';
import { stateData } from '../../data';
import {
  ChartToolTipData,
  Dispatch,
  hideTooltip,
  State,
  StateToolTipData,
  ToolTipData,
  TooltipState,
  TractToolTipData
} from '../../store';

import { niceNumber, percent } from '../charts/format';
import { Colors } from '../colors';
import { Close } from '../layout/Icons';
import { HEADER_HEIGHT } from '../layout/styles';
import { mobileCloseClass, toolTipClass, tractRowClass } from './styles';

type ToolTipProps = Readonly<{
  state: TooltipState;
  embed: boolean;
  mobile: boolean;
  x: number;
  y: number;
  hideTooltip(): void;
}>;

function getToolTipPosition({ state, x, y, embed, mobile }: ToolTipProps) {
  // tract is fixed in corner
  if (state.show === true && state.data.kind === 'tract')
    return {
      right: mobile ? '50%' : 40,
      top: mobile ? '50%' : HEADER_HEIGHT + 30,
      transform: mobile ? 'translate(50%, -50%)' : '',
      pointerEvents: mobile ? 'all' : 'none'
    };

  // otherwise render above mouse
  return { left: x, top: y - 10, transform: 'translate(-50%, -100%)' };
}

export const ToolTip = (props: ToolTipProps) =>
  !props.state.show
    ? <div style={{ display: 'none' }} />
    : <div className={toolTipClass} style={getToolTipPosition(props)}>
        {props.mobile
          ? <span className={mobileCloseClass} onClick={props.hideTooltip}>
              <Close />
            </span>
          : null}
        {getTooltipContent(props.state.data)}
      </div>;

export default connect(
  (state: State) => {
    return {
      ...state.mouse,
      state: state.tooltip,
      embed: state.embed,
      mobile: state.mobile
    };
  },
  (dispatch: Dispatch) => ({
    hideTooltip() {
      dispatch(hideTooltip());
    }
  })
)(ToolTip);

const StateTooltip = ({ properties }: StateToolTipData) => {
  const state = properties.state;
  const data = stateData[state];

  return (
    <div>
      <div>
        <b>{percent(data.peopleLivingInDeserts)}</b> of people in {state} live
        in a childcare desert.
      </div>
      <div style={{ fontStyle: 'italic', marginTop: 5, opacity: 0.8 }}>
        Click for detail
      </div>
    </div>
  );
};

const titleStyle: React.CSSProperties = { fontWeight: 'bold' };
const italic: React.CSSProperties = { fontStyle: 'italic' };

const formatDisplay = (display: string) => {
  const [tract, county] = display.split(',');
  return (
    <div>
      {tract} <br /> {county}
    </div>
  );
};

const TractTooltip = ({ properties }: TractToolTipData) =>
  <div>
    <span style={titleStyle}>
      {formatDisplay(properties.geodisplaylabel)}
      {properties.ccdesert
        ? <div style={italic}>Child Care Desert </div>
        : <div> &nbsp; </div>}
    </span>
    <div className={tractRowClass}>
      Licensed child care providers: {properties.num_providers} <br />
      Total child care capacity: {properties.capacity}
    </div>
    <div className={tractRowClass}>
      Population (total): {properties.pop_total} <br />
      Population (under 5): {properties.pop_u5}
    </div>
    <div className={tractRowClass}>
      Median family income: ${niceNumber(properties.median_fam_inc)} <br />
      Maternal labor force participation: {percent(properties.LFP_mom / 100)}
    </div>
    <div className={tractRowClass}>
      Percent White: {percent(properties.per_white)} <br />
      Percent Black: {percent(properties.per_black)} <br />
      Percent Hispanic: {percent(properties.per_latino)}
    </div>
  </div>;

const ChartTooltip = ({ properties }: ChartToolTipData) =>
  <div>
    {properties.label}: <b>{properties.value}</b>
  </div>;

function getTooltipContent(data: ToolTipData): JSX.Element {
  switch (data.kind) {
    case 'state':
      return <StateTooltip {...data} />;
    case 'tract':
      return <TractTooltip {...data} />;
    case 'chart':
      return <ChartTooltip {...data} />;
  }
}
