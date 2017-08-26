import { createElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { stateData, stateList, StateName } from '../../data';
import { selectStateAndCenter, State } from '../../store';
import StateSelect from '../_shared/StateSelect';
import { percent } from '../charts/format';
import { Colors } from '../colors';
import {
  bannerClassName,
  bannerContainerClass,
  desertPercentClass,
  selectContainerClass
} from './styles';
import Title from './Title';

const getPercentInDeserts = (state: StateName) =>
  percent(stateData[state || 'All states'].peopleLivingInDeserts);

const TitleText = ({ state }: { state: StateName }) =>
  <Title>
    <span className={desertPercentClass}>{getPercentInDeserts(state)}</span>
    of children in {state === 'All states' ? 'these states' : state} live in a
    child care desert.
  </Title>;

type BannerProps = Readonly<{
  selectedState: StateName;
}>;

const Banner: React.StatelessComponent<BannerProps> = props =>
  <div className={bannerContainerClass}>
    <div className={bannerClassName}>
      <TitleText state={props.selectedState} />
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
