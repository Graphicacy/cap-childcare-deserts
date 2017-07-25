import * as React from 'react';
import Header from './Header';
import Article from './Article';
import Map from './Map';
import ChartRow from './ChartRow';
import Banner from './Banner';
import { style } from 'typestyle';
import { StateName } from '../states';

const contentClass = style({
  paddingLeft: 50,
  paddingRight: 50,
  textAlign: 'center'
});

const App = () =>
  <div>
    <Header />
    <Map />
    <div className={contentClass}>
      <Banner />
      <ChartRow />
      <Article />
    </div>
  </div>;

export default App;
