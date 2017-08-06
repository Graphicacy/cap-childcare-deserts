import { createElement } from 'react';
import { style } from 'typestyle';
import { connect } from 'react-redux';
import { fillParent, vertical, content, height, flex } from 'csstips';

import { Header, Banner, ChartRow, Article } from './layout';
import { Map } from './map/';
import { State } from '../store/';
import ToolTip from './_shared/ToolTip';

const contentClass = style(content);
const contentContainerClass = style(fillParent, vertical, {
  fontFamily: 'Open Sans',
  fontSize: 14
});

const containerClass = style({
  width: '100%',
  height: '100%',
  overflowX: 'hidden'
});

type AppProps = Readonly<{
  embed: boolean;
}>;

const Full = () =>
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
    <ToolTip />
  </div>;

const App = (props: AppProps) => (props.embed ? <Map /> : <Full />);

export default connect((state: State) => ({ embed: state.embed }))(App);
