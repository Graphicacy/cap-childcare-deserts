import { createElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { style } from 'typestyle';
import { content } from 'csstips';

import Title from './Title';
import StateSelect from '../_shared/StateSelect';
import { Colors } from '../colors';
import { stateList, StateName, stateData } from '../../data';
import { setSelectedState, State } from '../../store';
import { percent } from '../charts/format';

const bannerContainerClass = style(content, {
  padding: 40,
  paddingTop: 20
});

const bannerClassName = style({
  margin: '0 auto',
  maxWidth: 800,
  textAlign: 'center',
  $nest: {
    '& p': {
      lineHeight: '24px',
      fontSize: 14,
      margin: '12px 0px'
    }
  }
});

const selectContainerClass = style({
  width: '100%'
});

const desertPercentClass = style({
  color: Colors.ORANGE,
  marginRight: 5
});

const getPercentInDeserts = (state: StateName) =>
  percent(stateData[state || 'All states'].percentInDesertsAll);

const titleText = (state: StateName) =>
  <Title>
    <span className={desertPercentClass}>{getPercentInDeserts(state)}</span>
    of children in {state || 'these states'} live in a child care desert.
  </Title>;

type BannerProps = Readonly<{
  selectedState: StateName;
}>;

const Banner = (props: BannerProps) =>
  <div className={bannerContainerClass}>
    <div className={bannerClassName}>
      {titleText(props.selectedState)}
      <p>
        A child care desert is any ZIP code with more than 30 children under age
        5 that contains either zero child care centers or so few centers that
        there are more than three times as many children as spaces in the
        centers.
      </p>
      <div className={selectContainerClass}>
        <StateSelect />
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

export default connect(mapStatesToProps)(Banner);
