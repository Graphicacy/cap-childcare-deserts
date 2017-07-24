import * as React from 'react';
import { StateName } from '../states';
import { EthnicityChart, IncomeChart, UrbanicityChart } from './charts/';

export type ChartsProps = Readonly<{
  selectedState?: StateName;
}>;

export const ChartRow = (props: ChartsProps) =>
  <div className="columns">
    <div className="column col-4">
      <EthnicityChart selectedState={props.selectedState} />
    </div>
    <div className="column col-4">
      <UrbanicityChart selectedState={props.selectedState} />
    </div>
    <div className="column col-4">
      <IncomeChart selectedState={props.selectedState} />
    </div>
  </div>;
