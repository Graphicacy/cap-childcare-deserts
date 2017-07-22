import * as React from 'react';
import {} from 'recharts';
import { StateName, stateData } from '../states';

export type ChartsState = Readonly<{
  selectedState?: StateName;
}>;

export const Charts = () =>
  <div className="columns">
    <div className="column col-4" />
    <div className="column col-4" />
    <div className="column col-4" />
  </div>;
