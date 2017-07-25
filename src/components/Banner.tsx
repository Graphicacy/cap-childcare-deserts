import 'react-select/dist/react-select.css';
import * as React from 'react';
import * as Select from 'react-select';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { style } from 'typestyle';
import Title from './Title';
import { stateList, StateName, stateData } from '../states';
import { format } from 'd3-format';
import { setSelectedState } from '../actions';
import { State } from '../reducers';

const percent = format('.0%');

const bannerContainerClass = style({
  paddingLeft: 60,
  paddingRight: 60
});

const bannerClassName = style({
  margin: '0 auto',
  maxWidth: 800
});

const selectContainerClass = style({
  width: '100%'
});

const selectClass = style({
  maxWidth: 300,
  width: '100%',
  margin: '0 auto'
});

const options = stateList.map(s => ({ value: s, label: s }));

const getPercentInDeserts = (state: StateName | null) =>
  percent(stateData[state || 'All states'].percentInDesertsAll);

const titleText = (state: StateName | null) =>
  <Title>
    {getPercentInDeserts(state)} of children in {state || 'these states'} live
    in a child care desert.
  </Title>;

type BannerProps = Readonly<{
  selectedState: StateName | null;
  onSelectState: (state: StateName | null) => void;
}>;

const Banner = (props: BannerProps) =>
  <div className={`columns ${bannerContainerClass}`}>
    <div className={`column col-12 ${bannerClassName}`}>
      {titleText(props.selectedState)}
      <p>
        A child care desert is any ZIP code with more than 30 children under age
        5 that contains either zero child care centers or so few centers that
        there are more than three times as many children as spaces in the
        centers.
      </p>
      <div className={selectContainerClass}>
        <Select
          className={selectClass}
          options={options}
          value={props.selectedState || undefined}
          onChange={(s: { value: StateName } | null) =>
            props.onSelectState(s && s.value)}
        />
      </div>
    </div>
  </div>;

/**
 *
 * connect component to redux state
 *
 */

const mapStatesToProps = (state: State) => ({
  selectedState: state.selectedState
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSelectState(stateName: StateName) {
    dispatch(setSelectedState(stateName));
  }
});

export default connect(mapStatesToProps, mapDispatchToProps)(Banner);
