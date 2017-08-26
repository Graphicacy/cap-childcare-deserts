import { createElement } from 'react';
import { media, style } from 'typestyle';
import StateSelect from '../_shared/StateSelect';
import { stateResponsive, stateSelectClass, tractResponsive } from './styles';

const MapStateSelect: React.StatelessComponent<{
  embed?: boolean;
  tractMode?: boolean;
}> = props =>
  props.embed
    ? <StateSelect
        above
        className={
          stateSelectClass +
          ' ' +
          (props.tractMode ? tractResponsive : stateResponsive)
        }
      />
    : null;

export default MapStateSelect;
