import { Map } from 'mapbox-gl';
import * as PropTypes from 'prop-types';
import { Component, createElement } from 'react';
import { stateData, StateName } from '../../data';
import { UrbanicityFilter } from '../../store';
import { stateModeLayers } from './constants';

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
    const { map } = this.context;
    this.toggleInteraction(false);
    this.toggleStateDots('All states');
    this.toggleStateTracts('All states');
  }

  public componentDidUpdate() {
    const { tractMode, selectedState, urbanicityFilter } = this.props;
    this.toggleStateLayers(!tractMode);
    this.toggleInteraction(tractMode);
    this.toggleTractUrbanicity(urbanicityFilter, selectedState);
    this.toggleStateDots(selectedState);
    this.toggleStateTracts(selectedState);
  }

  private lastUrbanicity?: string;
  private toggleTractUrbanicity(
    urbanicity: UrbanicityFilter,
    state: StateName
  ) {
    if (urbanicity === this.lastUrbanicity) return;
    this.lastUrbanicity = `${urbanicity}-${state}`;

    const { map } = this.context;
    const abbr = state === 'All states' ? '' : stateData[state].abbr;

    map.setPaintProperty(
      'locations-with-state',
      'circle-opacity',
      urbanicity === 'All' ? 1 : 0.2
    );

    map.setFilter(
      'alltracts',
      urbanicity === 'All'
        ? ['==', 'state', abbr]
        : ['all', ['==', 'urbanicity', urbanicity], ['==', 'state', abbr]]
    );
  }

  private lastStateTracts?: StateName;
  private toggleStateTracts(state: StateName) {
    if (state === this.lastStateTracts) return;
    this.lastStateTracts = state;
    const { map } = this.context;
    const abbr = state === 'All states' ? '' : stateData[state].abbr;

    map.setFilter('alltracts', ['==', 'state', abbr]);
  }

  private lastState?: StateName;
  private toggleStateDots(state: StateName) {
    if (state === this.lastState) return;
    this.lastState = state;

    const { map } = this.context;
    map.setFilter('locations-with-state', [
      '==',
      'abbr',
      state === 'All states' ? '' : stateData[state].abbr
    ]);
  }

  private lastStateLayerVisible?: boolean;
  private toggleStateLayers(visible: boolean) {
    if (this.lastStateLayerVisible === visible) return;
    this.lastStateLayerVisible = visible;

    const { map } = this.context;

    /**
     * hide state-mode layers
     */
    stateModeLayers.forEach(layer => {
      map.setLayoutProperty(layer, 'visibility', visible ? 'visible' : 'none');
    });
  }

  private lastInteractionState?: boolean;
  private toggleInteraction(enable: boolean) {
    if (this.lastInteractionState === enable) return;
    this.lastInteractionState = enable;

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
