import { content, flex, horizontal } from 'csstips';
import { createElement } from 'react';
import { style } from 'typestyle';

import { stateData, StateName } from '../../data/';
import ChartContainer from './ChartContainer';
import Donut from './Donut';

type EthnicityChartProps = Readonly<{
  selectedState: StateName;
  style: React.CSSProperties;
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
}>;

const chartContainerClass = style(flex, horizontal);
const chartClass = style(flex);

const EthnicityChart: React.StatelessComponent<EthnicityChartProps> = props =>
  <ChartContainer
    title="Children in a child care desert, by race"
    style={props.style}
  >
    <div className={chartContainerClass}>
      <div className={chartClass}>
        <Donut
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
          n={stateData[props.selectedState].WhiteInDeserts}
          title="White"
          name="white"
        />
      </div>
      <div className={chartClass}>
        <Donut
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
          n={stateData[props.selectedState].BlackInDeserts}
          title="Black"
          name="black"
        />
      </div>
      <div className={chartClass}>
        <Donut
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
          n={stateData[props.selectedState].LatinoInDeserts}
          title="Latino"
          name="latino"
        />
      </div>
    </div>
  </ChartContainer>;

export default EthnicityChart;
