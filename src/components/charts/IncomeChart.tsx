import { createElement } from 'react';
import { style } from 'typestyle';
import { flex, horizontal } from 'csstips';

import { StateName, stateData } from '../../states';
import ChartContainer from './ChartContainer';
import Donut from './Donut';

function data(state: StateName | null) {
  const name = state || 'All states';
  return stateData[name];
}

const IncomeChart = ({ selectedState }: { selectedState: StateName | null }) =>
  <ChartContainer title="Children in a child care desert, by income">
    <div className={style(flex, horizontal)}>
      <div className={style(flex)}>
        <Donut
          n={data(selectedState).percentInDesertsBlack}
          title="BELOW AVG. INCOME"
        />
      </div>
      <div className={style(flex)}>
        <Donut
          n={data(selectedState).percentInDesertsWhite}
          title="ABOVE AVG. INCOME"
        />
      </div>
    </div>
  </ChartContainer>;

export default IncomeChart;
