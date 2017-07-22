import * as React from 'react';
import { StateName } from '../states';
import { EthnicityChart, IncomeChart, UrbanicityChart } from './charts/';

export type ChartsProps = Readonly<{
  selectedState?: StateName;
}>;

export const ChartRow = (props: ChartsProps) =>
  <div className="columns">
    <div className="column col-4">
      <EthnicityChart />
    </div>
    <div className="column col-4">
      <UrbanicityChart />
    </div>
    <div className="column col-4">
      <IncomeChart />
    </div>
  </div>;
