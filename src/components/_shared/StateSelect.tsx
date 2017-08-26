import { createElement } from 'react';
import { connect } from 'react-redux';
import { stateData, stateList, StateName } from '../../data';
import { Dispatch, selectStateAndCenter, State } from '../../store';
import { selectClass } from './styles';

type StateSelectProps = Readonly<{
  above?: boolean;
  className?: string;
  selectedState: StateName;
  onSelectState: (e: React.ChangeEvent<{ value: string }>) => void;
}>;

const StateSelect = (props: StateSelectProps) =>
  <select
    className={selectClass + (props.className ? ' ' + props.className : '')}
    value={props.selectedState}
    onChange={props.onSelectState}
  >
    {stateList.map(s =>
      <option key={s} value={s}>
        {s}
      </option>
    )}
  </select>;

const mapStatesToProps = (
  state: State,
  ownProps: { above?: boolean; className?: string }
) => ({
  selectedState: state.selectedState,
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSelectState: (e: React.ChangeEvent<{ value: string }>) => {
    dispatch(selectStateAndCenter(e.target.value as StateName));
  }
});

export default connect(mapStatesToProps, mapDispatchToProps)(StateSelect);
