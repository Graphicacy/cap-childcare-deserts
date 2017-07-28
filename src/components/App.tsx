import { createElement } from 'react';
import { style } from 'typestyle';
import { fillParent, vertical, content, height, flex } from 'csstips';

import { Header, Banner, ChartRow, Article } from './layout';
import { Map } from './map/';

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
