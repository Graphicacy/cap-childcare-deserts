import * as React from 'react';
import { Header } from './Header';
import { Article } from './Article';
import { Map } from './Map';
import { Charts } from './Charts';
import { Banner } from './Banner';
import { style } from 'typestyle';

const contentClass = style({
  paddingLeft: 50,
  paddingRight: 50,
  textAlign: 'center'
});

export const App = () =>
  <div>
    <Header />
    <Map />
    <div className={contentClass}>
      <Banner />
      <Charts />
      <Article />
    </div>
  </div>;
