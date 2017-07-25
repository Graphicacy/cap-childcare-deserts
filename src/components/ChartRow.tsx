import * as React from 'react';
import { StateName } from '../states';
import { connect } from 'react-redux';
import { State } from '../reducers';
import { EthnicityChart, IncomeChart, UrbanicityChart } from './charts/';

export type ChartsProps = Readonly<{
  selectedState: StateName | null;
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

export default connect((state: State) => ({
  selectedState: state.selectedState
}))(ChartRow);
