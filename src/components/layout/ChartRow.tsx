import { createElement } from 'react';
import { connect } from 'react-redux';

import { StateName } from '../../data';
import { Dispatch, hideTooltip, showTooltip, State } from '../../store/';
import { EthnicityChart, IncomeChart, UrbanicityChart } from '../charts/';
import { chartClass, chartContainerClass } from './styles';

const urbanicityStyle: React.CSSProperties = {
  maxWidth: 370,
  margin: '0 auto'
};

export type ChartsProps = Readonly<{
  selectedState: StateName;
  onMouseOut(): void;
  onMouseOver(value: string, label: string): void;
}>;

export const ChartRow: React.StatelessComponent<ChartsProps> = props =>
  <div className={chartContainerClass}>
    <div className={chartClass}>
      <EthnicityChart {...props} style={urbanicityStyle} />
    </div>
    <div className={chartClass}>
      <UrbanicityChart {...props} style={urbanicityStyle} />
    </div>
    <div className={chartClass}>
      <IncomeChart {...props} />
    </div>
  </div>;

export default connect(
  (state: State) => ({
    selectedState: state.selectedState
  }),
  (dispatch: Dispatch) => {
    return {
      onMouseOver(value: string, label: string) {
        dispatch(showTooltip({ kind: 'chart', properties: { label, value } }));
      },
      onMouseOut() {
        dispatch(hideTooltip());
      }
    };
  }
)(ChartRow);
