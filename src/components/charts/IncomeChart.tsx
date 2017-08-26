import { createElement } from 'react';

import { stateData, StateName } from '../../data';
import ChartContainer from './ChartContainer';
import Donut from './Donut';
import { containerClass, flexClass } from './styles';

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
