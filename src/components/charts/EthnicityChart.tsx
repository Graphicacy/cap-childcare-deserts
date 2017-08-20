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
  style: React.CSSProperties;
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
}>;

const EthnicityChart = (props: EthnicityChartProps) =>
  <ChartContainer
    title="Children in a child care desert, by race"
    style={props.style}
  >
    <div className={style(flex, horizontal)}>
      <div className={style(flex)}>
        <Donut
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
          n={data(props.selectedState).percentInDesertsWhite}
          title="White"
        />
      </div>
      <div className={style(flex)}>
        <Donut
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
          n={data(props.selectedState).percentInDesertsBlack}
          title="Black"
        />
      </div>
      <div className={style(flex)}>
        <Donut
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
          n={data(props.selectedState).percentInDesertsHispanic}
          title="Hispanic"
        />
      </div>
    </div>
  </ChartContainer>;

export default EthnicityChart;
