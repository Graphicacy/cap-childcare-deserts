import * as React from 'react';
import { style } from 'typestyle';
import { StateName, stateData } from '../../states';
import ChartTitle from './ChartTitle';
import Donut from './Donut';

const ethnicityChartContainer = style({
  margin: '0 auto',
  textAlign: 'center',
  maxWidth: 700,
  width: '100%'
});

function data(state: StateName | null) {
  const name = state || 'All states';
  return stateData[name];
}

const EthnicityChart = ({
  selectedState
}: {
  selectedState: StateName | null;
}) =>
  <div className={ethnicityChartContainer}>
    <ChartTitle>Children in a child care desert, by race</ChartTitle>
    <div className="container">
      <div className="columns col-gapless">
        <div className="column col-xs-4">
          <Donut n={data(selectedState).percentInDesertsWhite} title="WHITE" />
        </div>
        <div className="column col-xs-4">
          <Donut n={data(selectedState).percentInDesertsBlack} title="BLACK" />
        </div>
        <div className="column col-xs-4">
          <Donut
            n={data(selectedState).percentInDesertsHispanic}
            title="HISPANIC"
          />
        </div>
      </div>
    </div>
  </div>;

export default EthnicityChart;
