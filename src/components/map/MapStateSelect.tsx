import { createElement } from 'react';
import { style } from 'typestyle';
import StateSelect from '../_shared/StateSelect';

const selectWidth = 250;

const stateSelectClass = style({
  position: 'absolute',
  bottom: 40,
  width: selectWidth,
  left: '50%',
  marginLeft: -(selectWidth / 2)
});

const MapStateSelect: React.StatelessComponent<{ embed?: boolean }> = props =>
  props.embed ? <StateSelect above className={stateSelectClass} /> : null;

export default MapStateSelect;
