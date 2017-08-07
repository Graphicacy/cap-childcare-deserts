import { createElement } from 'react';
import { connect } from 'react-redux';
import {
  State,
  TooltipState,
  ToolTipData,
  StateToolTipData,
  TractToolTipData,
  ChartToolTipData
} from '../../store';
import { stateData } from '../../data';
import { style } from 'typestyle';
import { Colors } from '../colors';
import { percent } from '../charts/format';

const toolTipClass = style({
  position: 'fixed',
  display: 'block',
  backgroundColor: Colors.INFO_BACKGROUND,
  padding: 10,
  borderRadius: 5,
  border: '1px solid #ccc',
  transform: 'translate(-50%, -100%)',
  zIndex: 10
});

type ToolTipProps = Readonly<{
  state: TooltipState;
  x: number;
  y: number;
}>;

export const ToolTip = ({ state, x, y }: ToolTipProps) =>
  !state.show
    ? <div style={{ display: 'none' }} />
    : <div className={toolTipClass} style={{ left: x, top: y - 10 }}>
        {getTooltipContent(state.data)}
      </div>;

export default connect((state: State) => {
  return {
    ...state.mouse,
    state: state.tooltip
  };
})(ToolTip);

const StateTooltip = ({ properties }: StateToolTipData) => {
  const state = properties.state;
  const data = stateData[state];

  return (
    <div>
      <div>
        <b>{percent(data.percentInDesertsAll)}</b> of people in {state} live in
        a childcare desert.
      </div>
      <div style={{ fontStyle: 'italic', marginTop: 5, opacity: 0.8 }}>
        Click for detail
      </div>
    </div>
  );
};

const TractTooltip = ({ properties }: TractToolTipData) => <div>Tract</div>;
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
