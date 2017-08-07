import { createElement } from 'react';
import { style } from 'typestyle';
import { flex, horizontal, content } from 'csstips';

import { StateName, stateData } from '../../data/';
import ChartContainer from './ChartContainer';
import Donut from './Donut';

function data(state: StateName) {
  const name = state || 'All states';
  return stateData[name];
}

type EthnicityChartProps = Readonly<{
  selectedState: StateName;
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
}>;

const EthnicityChart = ({
  selectedState,
  onMouseOut,
  onMouseOver
}: EthnicityChartProps) =>
  <ChartContainer title="Children in a child care desert, by race">
    <div className={style(flex, horizontal)}>
      <div className={style(flex)}>
        <Donut
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          n={data(selectedState).percentInDesertsWhite}
          title="WHITE"
        />
      </div>
      <div className={style(flex)}>
        <Donut
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          n={data(selectedState).percentInDesertsBlack}
          title="BLACK"
        />
      </div>
      <div className={style(flex)}>
        <Donut
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          n={data(selectedState).percentInDesertsHispanic}
          title="HISPANIC"
        />
      </div>
    </div>
  </ChartContainer>;

export default EthnicityChart;
