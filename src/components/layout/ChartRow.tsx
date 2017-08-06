import { createElement } from 'react';
import { connect } from 'react-redux';
import { style, media } from 'typestyle';
import { flex, horizontal, vertical } from 'csstips';

import { StateName } from '../../data';
import { State, Dispatch, showTooltip, hideTooltip } from '../../store/';
import { EthnicityChart, IncomeChart, UrbanicityChart } from '../charts/';

/**
 * break between charts in columns and rows at 780px
 */
const responsiveRowClass = style(
  flex,
  { padding: 40, maxWidth: 1200, margin: '0 auto' },
  media({ minWidth: 780 }, horizontal),
  media({ maxWidth: 780 }, vertical, {
    $nest: {
      '& div': {
        marginBottom: 10
      }
    }
  })
);

const flexClass = style(flex);

export type ChartsProps = Readonly<{
  selectedState: StateName;
  onMouseOut(): void;
  onMouseOver(value: string, label: string): void;
}>;

export const ChartRow = (props: ChartsProps) =>
  <div className={responsiveRowClass}>
    <div className={flexClass}>
      <EthnicityChart {...props} />
    </div>
    <div className={flexClass}>
      <UrbanicityChart {...props} />
    </div>
    <div className={flexClass}>
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
