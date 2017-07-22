import * as React from 'react';
import { Header } from './Header';
import { Article } from './Article';
import { Map } from './Map';
import { Charts } from './Charts';

export const App = () =>
  <div>
    <Header />
    <Map />
    <Charts />
    <Article />
  </div>;
