import * as React from 'react';
import { Header } from './Header';
import { Article } from './Article';
import { Map } from './Map';
import { Charts } from './Charts';
import { Banner } from './Banner';
import { style } from 'typestyle';
import { StateName } from '../states';

const contentClass = style({
  paddingLeft: 50,
  paddingRight: 50,
  textAlign: 'center'
});

export type AppState = Readonly<{
  selectedState?: StateName;
}>;

export class App extends React.Component<{}, AppState> {
  state: AppState = {};

  selectState = (state: StateName | null) => {
    this.setState({
      selectedState: state || undefined
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Map />
        <div className={contentClass}>
          <Banner
            selectedState={this.state.selectedState}
            onSelectState={this.selectState}
          />
          <Charts />
          <Article />
        </div>
      </div>
    );
  }
}
