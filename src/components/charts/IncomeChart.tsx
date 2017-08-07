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
      paddingLeft: '16.66%'
    },
    '>:last-child': {
      paddingRight: '16.66%'
    }
  }
});

const data = (state: StateName) => {
  const name = state || 'All states';
  return stateData[name];
};

type IncomeChartProps = Readonly<{
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
  selectedState: StateName;
}>;

const IncomeChart = ({
  selectedState,
  onMouseOut,
  onMouseOver
}: IncomeChartProps) =>
  <ChartContainer title="Children in a child care desert, by income">
    <div className={containerClass}>
      <div className={flexClass}>
        <Donut
          onMouseOut={onMouseOut}
          onMouseOver={onMouseOver}
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
          onMouseOut={onMouseOut}
          onMouseOver={onMouseOver}
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
