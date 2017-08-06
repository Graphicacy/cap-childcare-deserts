import { createElement } from 'react';
import { connect } from 'react-redux';
import {
  State,
  TooltipState,
  ToolTipData,
  StateToolTip,
  TractToolTip,
  ChartToolTip
} from '../../store';
import { style } from 'typestyle';

const toolTipClass = style({
  position: 'fixed',
  backgroundColor: 'rgba(255,255,255,0.8)',
  width: 150,
  padding: 15,
  borderRadius: 5,
  border: '1px solid #ccc'
});

type ToolTipProps = Readonly<{
  state: TooltipState;
}>;

export const ToolTip = ({ state }: ToolTipProps) =>
  !state.show
    ? <div style={{ display: 'none' }} />
    : <div className={toolTipClass} style={{ left: state.x, top: state.y }}>
        {getTooltipContent(state.data)}
      </div>;

export default connect((state: State) => ({
  state: state.tooltip
}))(ToolTip);

const StateTooltip = (props: StateToolTip) => <div>State</div>;
const TractTooltip = (props: TractToolTip) => <div>Tract</div>;
const ChartTooltip = (props: ChartToolTip) => <div>Chart</div>;

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
