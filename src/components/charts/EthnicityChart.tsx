import { createElement } from 'react';

import { stateData, StateName } from '../../data/';
import ChartContainer from './ChartContainer';
import Donut from './Donut';
import { flexClass, horizontalFlexClass } from './styles';

type EthnicityChartProps = Readonly<{
  selectedState: StateName;
  style: React.CSSProperties;
  onMouseOver(value: string, label: string): void;
  onMouseOut(): void;
}>;

const EthnicityChart: React.StatelessComponent<EthnicityChartProps> = props =>
  <ChartContainer
    title="Children in a child care desert, by race"
    style={props.style}
  >
    <div className={horizontalFlexClass}>
      <div className={flexClass}>
        <Donut
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
          n={stateData[props.selectedState].WhiteInDeserts}
          title="White"
          name="white"
        />
      </div>
      <div className={flexClass}>
        <Donut
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
          n={stateData[props.selectedState].BlackInDeserts}
          title="Black"
          name="black"
        />
      </div>
      <div className={flexClass}>
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
