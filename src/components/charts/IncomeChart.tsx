import { createElement } from 'react';
import { style } from 'typestyle';
import { flex, horizontal } from 'csstips';

import { StateName, stateData } from '../../data';
import ChartContainer from './ChartContainer';
import Donut from './Donut';

const flexClass = style(flex);

const containerClass = style(flex, horizontal, {
  $nest: {
    '>:first-child': {
      paddingLeft: '11.11%',
      paddingRight: '5.55%'
    },
    '>:last-child': {
      paddingRight: '11.11%',
      paddingLeft: '5.55%'
    }
  }
});

const data = (state: StateName | null) => {
  const name = state || 'All states';
  return stateData[name];
};

const IncomeChart = ({ selectedState }: { selectedState: StateName | null }) =>
  <ChartContainer title="Children in a child care desert, by income">
    <div className={containerClass}>
      <div className={flexClass}>
        <Donut
          n={data(selectedState).percentInDesertsBlack}
          title={
            <span>
              {' '}BELOW AVG.<br /> INCOME{' '}
            </span>
          }
        />
      </div>
      <div className={flexClass}>
        <Donut
          n={data(selectedState).percentInDesertsWhite}
          title={
            <span>
              {' '}ABOVE AVG.<br /> INCOME{' '}
            </span>
          }
        />
      </div>
    </div>
  </ChartContainer>;

export default IncomeChart;
