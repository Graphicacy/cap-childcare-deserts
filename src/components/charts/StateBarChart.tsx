import { createElement } from 'react';
import { connect } from 'react-redux';
import { style } from 'typestyle';
import {
  Dispatch,
  hideTooltip,
  selectStateAndCenter,
  showTooltip,
  State
} from '../../store';

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import { stateData, stateList, StateName } from '../../data';
import { Colors } from '../colors';
import ChartContainer from './ChartContainer';
import { percent } from './format';

const data = stateList.filter(s => s !== 'All states').map(s => ({
  percent: stateData[s].percentInDesertsAll,
  abbr: stateData[s].abbr,
  state: s
}));

data.sort((a, b) => a.percent - b.percent);

type StateBarChartProps = Readonly<{
  selectedState: StateName;
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
  onClick(state: StateName): void;
}>;

const tickStyles = { tickLabels: { fontFamily: 'Open Sans' } };
const barStyles = { data: { width: 15, cursor: 'pointer' } };
const animate = { duration: 500 };
const padding = { top: 0, left: 50, bottom: 50 };
const domainPadding = { x: 20 };

let handlerCache: any;
const handlers = (
  onMouseOut: StateBarChartProps['onMouseOut'],
  onMouseOver: StateBarChartProps['onMouseOver'],
  onClick: StateBarChartProps['onClick']
) => {
  if (handlerCache) return handlerCache;
  return (handlerCache = [
    {
      target: 'data' as 'data',
      eventHandlers: {
        onMouseOut,
        onMouseOver(event: any, props: any) {
          const { state, percent: value } = props.datum;
          onMouseOver(percent(value), state);
        },
        onClick(event: any, props: any) {
          const { state } = props.datum;
          onClick(state);
        }
      }
    }
  ] as any); // hack for typings;
};

const StateBarChart: React.StatelessComponent<StateBarChartProps> = ({
  selectedState,
  onClick,
  onMouseOut,
  onMouseOver
}) =>
  <ChartContainer title="Percent in a child care desert, by state">
    <VictoryChart padding={padding} width={600} domainPadding={domainPadding}>
      <VictoryBar
        y="percent"
        x="abbr"
        animate={animate}
        style={barStyles}
        data={data.map(x => ({
          ...x,
          fill:
            !selectedState ||
            selectedState === 'All states' ||
            x.state === selectedState
              ? Colors.ORANGE
              : Colors.GRAY
        }))}
        events={handlers(onMouseOut, onMouseOver, onClick)}
      />
      <VictoryAxis
        style={tickStyles}
        dependentAxis
        tickFormat={percent}
        tickCount={7}
      />
      <VictoryAxis style={tickStyles} />
    </VictoryChart>
  </ChartContainer>;

export default connect(
  (state: State, ownProps: { selectedState: StateName }) => ownProps,
  (dispatch: Dispatch) => {
    return {
      onMouseOver(value: string, label: string) {
        dispatch(showTooltip({ kind: 'chart', properties: { value, label } }));
      },
      onMouseOut() {
        dispatch(hideTooltip());
      },
      onClick(state: StateName) {
        dispatch(selectStateAndCenter(state));
      }
    };
  }
)(StateBarChart);
