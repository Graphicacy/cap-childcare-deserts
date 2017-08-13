import 'react-select/dist/react-select.css';

import { createElement } from 'react';
import { connect } from 'react-redux';
import { style, cssRaw } from 'typestyle';
import * as Select from 'react-select';
import { Dispatch, State, setSelectedState } from '../../store';
import { stateList, StateName, stateData } from '../../data';
import { Colors } from '../colors';

const selectClass = style({
  maxWidth: 200,
  width: '100%',
  display: 'block',
  margin: '0 auto',
  textAlignLast: 'center',
  $nest: {
    '.Select-control': {
      backgroundColor: Colors.SELECT_BAKGROUND
    }
  }
});

const options = stateList.map(s => ({ label: s, value: s }));

type StateSelectProps = Readonly<{
  above?: boolean;
  className?: string;
  selectedState: StateName;
  onSelectState: (o: Select.Option<StateName>) => void;
}>;

const StateSelect = (props: StateSelectProps) =>
  <Select
    className={selectClass + ' select-up ' + (props.className || '')}
    clearable={false}
    value={props.selectedState}
    options={options}
    onChange={props.onSelectState}
  />;

const mapStatesToProps = (
  state: State,
  ownProps: { above?: boolean; className?: string }
) => ({
  selectedState: state.selectedState,
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSelectState: (o: Select.Option<StateName> | null) => {
    dispatch(setSelectedState(!o ? 'All states' : o.value as StateName));
  }
});

export default connect(mapStatesToProps, mapDispatchToProps)(StateSelect);

/**
 * hack for menu to show above if embedding
 */
cssRaw(`
.select-up .Select-menu-outer {
    position: absolute !important;
    top: auto !important;
    bottom: calc(100% - 1px) !important;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
}

.select-up .is-open .Select-control {
    border-top-right-radius: 0 !important;
    border-top-left-radius: 0 !important;
    border-bottom-right-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
}
`);
