import { createElement } from 'react';
import { style } from 'typestyle';
import { fillParent, vertical, content, height, flex } from 'csstips';

import { Header, Banner, ChartRow, Article } from './layout';
import { Map } from './map/';

const contentClass = style(content);
const containerClass = style(fillParent, vertical, {
  fontFamily: 'Open Sans',
  fontSize: 14
});

const App = () =>
  <div>
    <Header />
    <div className={containerClass}>
      <div className={contentClass}>
        <Map />
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
