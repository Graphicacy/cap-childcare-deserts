import { createElement, Component } from 'react';
import { Map } from 'mapbox-gl';
import { stateModeLayers } from './constants';
import { StateName } from '../../data';

type LayerToggleProps = {
  tractMode: boolean;
  selectedState: StateName;
};

type MapInteraction =
  | 'scrollZoom'
  | 'boxZoom'
  | 'dragRotate'
  | 'dragPan'
  | 'keyboard'
  | 'doubleClickZoom'
  | 'touchZoomRotate';

class LayerToggle extends Component<LayerToggleProps> {
  context: { map: Map };

  componentDidMount() {
    this.toggleInteraction(false);
  }

  componentDidUpdate() {
    const { tractMode } = this.props;
    this.toggleStateLayers(!tractMode);
    this.toggleInteraction(tractMode);
  }

  toggleStateDots(state: StateName) {
    const { map } = this.context;
  }

  toggleStateLayers(visible: boolean) {
    const { map } = this.context;

    /**
     * hide state-mode layers
     */
    stateModeLayers.forEach(layer => {
      map.setLayoutProperty(layer, 'visibility', visible ? 'visible' : 'none');
    });
  }

  toggleInteraction(enable: boolean) {
    const { map } = this.context;
    const toggle = enable ? 'enable' : 'disable';

    const methods: MapInteraction[] = [
      'scrollZoom',
      'boxZoom',
      'dragRotate',
      'dragPan',
      'keyboard',
      'doubleClickZoom',
      'touchZoomRotate'
    ];

    /**
     * disable / enable interaction
     */
    methods.forEach(method => {
      map[method][toggle]();
    });
  }

  render() {
    return null;
  }
}

export default LayerToggle;
