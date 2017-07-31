import { createElement } from 'react';
import { connect } from 'react-redux';
import { style, media } from 'typestyle';
import { flex, horizontal, vertical } from 'csstips';

import { StateName } from '../../data';
import { State } from '../../store/';
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
  selectedState: StateName | null;
}>;

export const ChartRow = ({ selectedState }: ChartsProps) =>
  <div className={responsiveRowClass}>
    <div className={flexClass}>
      <EthnicityChart selectedState={selectedState} />
    </div>
    <div className={flexClass}>
      <UrbanicityChart selectedState={selectedState} />
    </div>
    <div className={flexClass}>
      <IncomeChart selectedState={selectedState} />
    </div>
  </div>;

export default connect((state: State) => ({
  selectedState: state.selectedState
}))(ChartRow);
