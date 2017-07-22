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

export type AppState = Readonly<{
  selectedState?: string;
}>;

export class App extends React.Component<{}, AppState> {
  selectState = (state: string) => {
    this.setState({
      selectedState: state
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Map />
        <div className={contentClass}>
          <Banner onSelectState={this.selectState} />
          <Charts />
          <Article />
        </div>
      </div>
    );
  }
}
