import { createElement } from 'react';
import { style } from 'typestyle';
import { connect } from 'react-redux';
import {
  State,
  Dispatch,
  showTooltip,
  hideTooltip,
  setSelectedState
} from '../../store';

import { StateName, stateData, stateList } from '../../data';
import { Colors } from '../colors';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
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

const StateBarChart = ({
  selectedState,
  onClick,
  onMouseOut,
  onMouseOver
}: StateBarChartProps) =>
  <ChartContainer title="Percent in a child care desert, by state">
    <VictoryChart
      padding={{ top: 0, left: 50, bottom: 50 }}
      width={600}
      domainPadding={{ x: 20 }}
    >
      <VictoryBar
        y="percent"
        x="abbr"
        animate={{
          duration: 500
        }}
        style={{ data: { width: 15, cursor: 'pointer' } }}
        data={data.map(x => ({
          ...x,
          fill:
            !selectedState ||
            selectedState === 'All states' ||
            x.state === selectedState
              ? Colors.ORANGE
              : Colors.GRAY
        }))}
        events={
          [
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
          ] as any // hack for typings
        }
      />
      <VictoryAxis dependentAxis tickFormat={percent} tickCount={7} />
      <VictoryAxis />
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
        dispatch(setSelectedState(state));
      }
    };
  }
)(StateBarChart);
