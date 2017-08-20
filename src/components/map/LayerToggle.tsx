import { Map } from 'mapbox-gl';
import * as PropTypes from 'prop-types';
import { Component, createElement } from 'react';
import { stateData, StateName } from '../../data';
import { UrbanicityFilter } from '../../store';
import { stateModeLayers } from './constants';
import { tractLayers } from './tracts';

interface LayerToggleProps {
  tractMode: boolean;
  selectedState: StateName;
  urbanicityFilter: UrbanicityFilter;
}

type MapInteraction =
  | 'scrollZoom'
  | 'boxZoom'
  | 'dragRotate'
  | 'dragPan'
  | 'keyboard'
  | 'doubleClickZoom'
  | 'touchZoomRotate';

class LayerToggle extends Component<LayerToggleProps> {
  public static contextTypes = {
    map: PropTypes.object
  };

  public context: {
    map: Map;
  };

  public componentDidMount() {
    this.toggleInteraction(false);
    this.toggleStateDots('');
  }

  public componentDidUpdate() {
    const { tractMode, selectedState, urbanicityFilter } = this.props;
    this.toggleStateLayers(!tractMode);
    this.toggleInteraction(tractMode);
    this.toggleTractUrbanicity(urbanicityFilter);
    this.toggleStateDots(selectedState === 'All states' ? '' : selectedState);
  }

  public toggleTractUrbanicity(urbanicity: UrbanicityFilter) {
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

  public toggleStateDots(state: StateName | '') {
    const { map } = this.context;
    map.setFilter('locations-with-state', [
      '==',
      'abbr',
      state ? stateData[state].abbr : ''
    ]);
  }

  public toggleStateLayers(visible: boolean) {
    const { map } = this.context;

    /**
     * hide state-mode layers
     */
    stateModeLayers.forEach(layer => {
      map.setLayoutProperty(layer, 'visibility', visible ? 'visible' : 'none');
    });
  }

  public toggleInteraction(enable: boolean) {
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

  public render() {
    return null;
  }
}

export default LayerToggle;
