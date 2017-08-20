import { createElement } from 'react';
import { style } from 'typestyle';
import { supported } from 'mapbox-gl';

import { Colors } from '../colors';

/**
 * TODO: move to redux state
 */
export const VISUALS_SUPPORTED = supported();

const supportMessageContainerClass = style({
  position: 'relative',
  width: '100%',
  height: 300
});

const supportMessageClass = style({
  fontSize: 20,
  color: Colors.FONT_GRAY,
  lineHeight: '1.5em',
  textAlign: 'center',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
});

const SupportMessage = () =>
  <div className={supportMessageContainerClass}>
    <div className={supportMessageClass}>
      Sorry, your browser unable to load the graphics on this site.<br />
      If possible, try{' '}
      <a href="https://browser-update.org/update.html">
        upgrading your browser
      </a>.
    </div>
  </div>;

export default SupportMessage;
