import { createElement } from 'react';
import { media, style } from 'typestyle';
import StateSelect from '../_shared/StateSelect';

const selectWidth = 250;

const stateSelectClass = style({
  position: 'absolute',
  bottom: 40,
  width: selectWidth,
  left: '50%',
  marginLeft: -(selectWidth / 2)
});

const tractResponsive = style(
  media(
    { maxWidth: 768 },
    {
      bottom: 60
    }
  )
);

const stateResponsive = style(
  media(
    { maxWidth: 768 },
    {
      bottom: 120
    }
  )
);

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
