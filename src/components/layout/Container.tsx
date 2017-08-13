import { createElement } from 'react';
import { style, media } from 'typestyle';
import { fillParent, vertical, content, height, flex } from 'csstips';
import Header from './Header';
import Banner from './Banner';
import ChartRow from './ChartRow';
import Article from './Article';
import { Map } from '../map';
import { Colors } from '../colors';

const contentClass = style(content);
const contentContainerClass = style(fillParent, vertical);

const containerClass = style({
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  color: Colors.FONT_GRAY,
  fontFamily: 'Open Sans',
  fontSize: 14
});

const Container = () =>
  <div>
    <Header />
    <div className={containerClass}>
      <div className={contentContainerClass}>
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

export default Container;
