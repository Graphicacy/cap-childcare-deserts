import { supported } from 'mapbox-gl';
import { createElement } from 'react';
import { supportMessageClass, supportMessageContainerClass } from './styles';

/**
 * TODO: move to redux state
 */
export const VISUALS_SUPPORTED = supported();

const SupportMessage: React.StatelessComponent<{}> = () =>
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
