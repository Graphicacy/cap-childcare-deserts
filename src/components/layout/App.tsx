import { createElement } from 'react';
import { style } from 'typestyle';
import { fillParent, vertical, content, height, flex } from 'csstips';

import Header from './Header';
import Article from './Article';
import { Map } from '../Map/';
import ChartRow from './ChartRow';
import Banner from './Banner';

const contentClass = style(content);

const App = () =>
  <div className={style(fillParent, vertical)}>
    <Header />
    <div className={style(flex, vertical)}>
      <div className={contentClass}>
        <Map />
      </div>
      <div className={contentClass}>
        <Banner />
      </div>
      <div className={contentClass}>
        <ChartRow />
      </div>
      <div className={contentClass}>
        <Article />
      </div>
    </div>
  </div>;

export default App;
