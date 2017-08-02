import { createElement } from 'react';
import { connect } from 'react-redux';
import { style } from 'typestyle';
import { Dispatch, State, setSelectedState } from '../../store';
import { stateList, StateName, stateData } from '../../data';

const selectClass = style({
  maxWidth: 300,
  width: '100%',
  display: 'block',
  margin: '0 auto',
  textAlignLast: 'center'
});

type StateSelectProps = Readonly<{
  selectedState: StateName;
  onSelectState: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}>;

const StateSelect = (props: StateSelectProps) =>
  <select
    className={selectClass}
    value={props.selectedState || undefined}
    onChange={props.onSelectState}
  >
    {stateList.map(s =>
      <option value={s}>
        {s}
      </option>
    )}
  </select>;

const mapStatesToProps = (state: State) => ({
  selectedState: state.selectedState
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSelectState: (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedState(e.currentTarget.value as StateName));
  }
});

export default connect(mapStatesToProps, mapDispatchToProps)(StateSelect);
