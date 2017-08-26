import { createElement } from 'react';

import { Map } from '../map';
import Article from './Article';
import Banner from './Banner';
import ChartRow from './ChartRow';
import Footer from './Footer';
import Header from './Header';
import { containerClass, contentClass, contentContainerClass } from './styles';
import { default as SupportMessage, VISUALS_SUPPORTED } from './SupportMessage';

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
