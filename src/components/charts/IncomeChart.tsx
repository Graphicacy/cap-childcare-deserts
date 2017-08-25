import { flex, horizontal } from 'csstips';
import { createElement } from 'react';
import { style } from 'typestyle';

import { stateData, StateName } from '../../data';
import ChartContainer from './ChartContainer';
import Donut from './Donut';

const flexClass = style(flex);

const containerClass = style(flex, horizontal, {
  maxWidth: 370,
  margin: '0 auto',
  $nest: {
    '>:first-child': {
      paddingLeft: '16.66%'
    },
    '>:last-child': {
      paddingRight: '16.66%'
    }
  }
});

type IncomeChartProps = Readonly<{
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
  selectedState: StateName;
}>;

const IncomeChart: React.StatelessComponent<IncomeChartProps> = ({
  selectedState,
  onMouseOut,
  onMouseOver
}) =>
  <ChartContainer title="Children in a child care desert, by income">
    <div className={containerClass}>
      <div className={flexClass}>
        <Donut
          onMouseOut={onMouseOut}
          onMouseOver={onMouseOver}
          n={stateData[selectedState].InDesertsLowIncome}
          name="belowavg"
          title={
            <span>
              {' '}Below Avg.<br /> Income{' '}
            </span>
          }
        />
      </div>
      <div className={flexClass}>
        <Donut
          onMouseOut={onMouseOut}
          onMouseOver={onMouseOver}
          n={stateData[selectedState].InDesertsHighIncome}
          name="aboveavg"
          title={
            <span>
              {' '}Above Avg.<br /> Income{' '}
            </span>
          }
        />
      </div>
    </div>
  </ChartContainer>;

export default IncomeChart;
