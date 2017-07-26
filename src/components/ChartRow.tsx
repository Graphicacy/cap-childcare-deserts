import * as React from 'react';
import { StateName } from '../states';
import { connect } from 'react-redux';
import { State } from '../reducers';
import { style } from 'typestyle';
import { EthnicityChart, IncomeChart, UrbanicityChart } from './charts/';

const rowContainerClass = style({
  width: '100%',
  maxWidth: 1200,
  margin: '0 auto'
});

export type ChartsProps = Readonly<{
  selectedState: StateName | null;
}>;

export const ChartRow = (props: ChartsProps) =>
  <div className="container">
    <div className={`columns ${rowContainerClass}`}>
      <div className="column col-lg-4 col-md-12">
        <EthnicityChart selectedState={props.selectedState} />
      </div>
      <div className="column col-lg-4 col-md-12">
        <UrbanicityChart selectedState={props.selectedState} />
      </div>
      <div className="column col-lg-4 col-md-12">
        <IncomeChart selectedState={props.selectedState} />
      </div>
    </div>
  </div>;

export default connect((state: State) => ({
  selectedState: state.selectedState
}))(ChartRow);
