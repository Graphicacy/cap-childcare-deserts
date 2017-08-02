import { createElement } from 'react';
import { style } from 'typestyle';
import { connect } from 'react-redux';
import { fillParent, vertical, content, height, flex } from 'csstips';

import { Header, Banner, ChartRow, Article } from './layout';
import { Map } from './map/';
import { State } from '../store/';

const contentClass = style(content);
const containerClass = style(fillParent, vertical, {
  fontFamily: 'Open Sans',
  fontSize: 14
});

type AppProps = Readonly<{
  embed: boolean;
}>;

const App = (props: AppProps) =>
  props.embed
    ? <Map />
    : <div>
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

export default connect((state: State) => ({ embed: state.embed }))(App);
