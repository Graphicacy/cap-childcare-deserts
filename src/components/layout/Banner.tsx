import { content } from 'csstips';
import { createElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { style } from 'typestyle';

import { stateData, stateList, StateName } from '../../data';
import { selectStateAndCenter, State } from '../../store';
import StateSelect from '../_shared/StateSelect';
import { percent } from '../charts/format';
import { Colors } from '../colors';
import Title from './Title';

const bannerContainerClass = style(content, {
  padding: 40,
  paddingTop: 20,
  paddingBottom: 35
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

const paragraphClass = style({ marginTop: 0 });

const getPercentInDeserts = (state: StateName) =>
  percent(stateData[state || 'All states'].percentInDesertsAll);

const TitleText = ({ state }: { state: StateName }) =>
  <Title>
    <span className={desertPercentClass}>{getPercentInDeserts(state)}</span>
    of children in {state || 'these states'} live in a child care desert.
  </Title>;

type BannerProps = Readonly<{
  selectedState: StateName;
}>;

const Banner: React.StatelessComponent<BannerProps> = props =>
  <div className={bannerContainerClass}>
    <div className={bannerClassName}>
      <TitleText state={props.selectedState} />
      <p className={paragraphClass}>
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
