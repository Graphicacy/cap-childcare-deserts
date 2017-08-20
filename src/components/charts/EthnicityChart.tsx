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
          n={stateData[props.selectedState].percentInDesertsWhite}
          title="White"
          name="white"
        />
      </div>
      <div className={chartClass}>
        <Donut
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
          n={stateData[props.selectedState].percentInDesertsBlack}
          title="Black"
          name="black"
        />
      </div>
      <div className={chartClass}>
        <Donut
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
          n={stateData[props.selectedState].percentInDesertsHispanic}
          title="Hispanic"
          name="hispanic"
        />
      </div>
    </div>
  </ChartContainer>;

export default EthnicityChart;
