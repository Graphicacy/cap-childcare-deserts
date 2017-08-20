import { createElement, Component } from 'react';
import { Map } from 'mapbox-gl';
import * as PropTypes from 'prop-types';
import { stateModeLayers } from './constants';
import { StateName, stateData } from '../../data';
import { UrbanicityFilter } from '../../store';
import { tractLayers } from './tracts';

type LayerToggleProps = {
  tractMode: boolean;
  selectedState: StateName;
  urbanicityFilter: UrbanicityFilter;
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
  static contextTypes = {
    map: PropTypes.object
  };

  context: {
    map: Map;
  };

  componentDidMount() {
    this.toggleInteraction(false);
    this.toggleStateDots('');
  }

  componentDidUpdate() {
    const { tractMode, selectedState, urbanicityFilter } = this.props;
    this.toggleStateLayers(!tractMode);
    this.toggleInteraction(tractMode);
    this.toggleTractUrbanicity(urbanicityFilter);
    this.toggleStateDots(selectedState === 'All states' ? '' : selectedState);
  }

  toggleTractUrbanicity(urbanicity: UrbanicityFilter) {
    const { map } = this.context;

    map.setPaintProperty(
      'locations-with-state',
      'circle-opacity',
      urbanicity === 'All' ? 1 : 0.2
    );

    tractLayers.forEach(layer => {
      map.setFilter(
        layer,
        urbanicity === 'All' ? ['all'] : ['==', 'urbanicity', urbanicity]
      );
    });
  }

  toggleStateDots(state: StateName | '') {
    const { map } = this.context;
    map.setFilter('locations-with-state', [
      '==',
      'abbr',
      state ? stateData[state].abbr : ''
    ]);
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
