import * as React from 'react';
import { style } from 'typestyle';
import { StateName, stateData } from '../../states';
import ChartTitle from './ChartTitle';
import Donut from './Donut';

const incomeChartContainer = style({
  margin: '0 auto',
  textAlign: 'center',
  maxWidth: 700,
  width: '100%'
});

function data(state: StateName | null) {
  const name = state || 'All states';
  return stateData[name];
}

const IncomeChart = ({ selectedState }: { selectedState: StateName | null }) =>
  <div className={incomeChartContainer}>
    <ChartTitle>Children in a child care desert, by income</ChartTitle>
    <div className="container">
      <div className="columns col-gapless">
        <div className="column col-xs-6">
          <Donut
            n={data(selectedState).percentInDesertsBlack}
            title="BELOW AVG. INCOME"
          />
        </div>
        <div className="column col-xs-6">
          <Donut
            n={data(selectedState).percentInDesertsWhite}
            title="ABOVE AVG. INCOME"
          />
        </div>
      </div>
    </div>
  </div>;

export default IncomeChart;
