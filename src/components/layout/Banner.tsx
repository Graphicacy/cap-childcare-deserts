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
  Math.round(stateData[state || 'All states'].peopleLivingInDeserts * 100);

const TitleText = ({ state }: { state: StateName }) =>
  <Title>
    <span className={desertPercentClass}>
      {getPercentInDeserts(state)}
    </span>{' '}
    percent of people in {state === 'All states' ? 'these states' : state} live
    in a child care desert.
  </Title>;

type BannerProps = Readonly<{
  selectedState: StateName;
}>;

const Banner: React.StatelessComponent<BannerProps> = props =>
  <div className={bannerContainerClass}>
    <div className={bannerClassName}>
      <TitleText state={props.selectedState} />
      <p>
        A child care desert is any census tract with more than 50 children under
        age 5. that contains either no child care providers or so few options
        that there are more than three times as many children as licensed child
        care slots.
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
