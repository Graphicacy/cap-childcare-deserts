import { content, fillParent, flex, height, vertical } from 'csstips';
import { createElement } from 'react';
import { media, style } from 'typestyle';

import { Colors } from '../colors';
import { Map } from '../map';
import Article from './Article';
import Banner from './Banner';
import ChartRow from './ChartRow';
import Footer from './Footer';
import Header from './Header';
import { default as SupportMessage, VISUALS_SUPPORTED } from './SupportMessage';

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

const Container: React.StatelessComponent<{}> = () =>
  <div>
    <Header />
    <div className={containerClass}>
      <div className={contentContainerClass}>
        {VISUALS_SUPPORTED ? <Map /> : <SupportMessage />}
        <Banner />
      </div>
      <div className={contentClass}>
        {VISUALS_SUPPORTED ? <ChartRow /> : null}
      </div>
      <div className={contentClass}>
        <Article />
      </div>
      <div className={contentClass}>
        <Footer />
      </div>
    </div>
  </div>;

export default Container;
