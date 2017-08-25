import { GeoJSONSource, MapMouseEvent } from 'mapbox-gl';
import { Component, createElement } from 'react';
import { StateName } from '../../data';
import { Colors } from '../colors';
import {
  mapboxStyle,
  STATE_HOVER_ID,
  STATE_HOVER_LAYER,
  TRACT_HOVER_ID,
  TRACT_HOVER_LAYER
} from './constants';
import { FeatureQuery, FeatureQueryResult } from './FeatureQuery';

type MouseProps = Readonly<{
  selectedState: StateName;
  onMouseMove?(feature?: FeatureQueryResult | void): void;
  onClick?(feature?: FeatureQueryResult | void): void;
}>;

class Mouse extends FeatureQuery<MouseProps> {
  private hoverPolygonId = '';
  private hoverState: StateName = 'All states';

  public componentDidMount() {
    const { map } = this.context;
    this.initHandlers();
    this.initHover({
      sourceLayer: 'allstates',
      source: 'bsouthga.bkxp0vhq',
      id: STATE_HOVER_ID,
      layerName: STATE_HOVER_LAYER
    });
    this.initHover({
      sourceLayer: 'alltracts',
      source: 'bsouthga.3x5f8aeo',
      id: TRACT_HOVER_ID,
      layerName: TRACT_HOVER_LAYER
    });
  }

  public componentDidUpdate() {
    const { tractMode, selectedState } = this.props;
    if (tractMode) {
      // remove state highlight if dropped to tract mode
      this.highlight('All states');
    }
  }

  public initHandlers() {
    const { map } = this.context;
    const { onMouseMove, onClick } = this.props;

    if (onMouseMove) {
      map.on('mousemove', (e: MapMouseEvent) => {
        const feature = this.queryFeatures(e.point);
        const { selectedState, tractMode } = this.props;

        map.getCanvas().style.cursor =
          feature && feature.kind === 'state' ? 'pointer' : '';

        if (feature) {
          switch (feature.kind) {
            case 'state':
              if (!tractMode)
                this.highlight('All states', feature.properties.id);
              break;
            case 'tract':
              if (tractMode)
                this.highlight(selectedState, feature.properties.GEOID);
              break;
          }
        } else {
          this.highlight(this.hoverState);
        }
        onMouseMove(feature);
      });
      map.on('mouseout', () => {
        this.highlight(this.hoverState);
        onMouseMove();
      });
    }

    if (onClick) {
      map.on('click', (e: MapMouseEvent) => {
        onClick(this.queryFeatures(e.point));
      });
    }
  }

  private initHover(opts: {
    source: string;
    sourceLayer: string;
    id: string;
    layerName: string;
  }) {
    const { map } = this.context;

    map.addSource(opts.source, {
      type: 'vector',
      url: `mapbox://${opts.source}`
    });

    map.addLayer({
      id: opts.layerName,
      type: 'line',
      source: opts.source,
      'source-layer': opts.sourceLayer,
      paint: {
        'line-color': Colors.HOVER_COLOR,
        'line-width': 2
      },
      filter: ['==', opts.id, '']
    });
  }

  private highlight(state: StateName, id = '') {
    if (this.hoverPolygonId === id) return;
    const { map } = this.context;
    this.hoverPolygonId = id;
    this.hoverState = state;
    map.setFilter(hoverLayerName(state), ['==', hoverId(state), id]);
  }

  public render() {
    return null;
  }
}

export default Mouse;

export interface HoverSource {
  sourceLayer: string;
  source: string;
}

export const hoverSources = {
  'All states': {
    sourceLayer: 'allstates',
    source: 'bsouthga.bkxp0vhq'
  },
  tract: {
    sourceLayer: 'tl_2016_06_tract',
    source: 'bsouthga.4820m6au'
  }
};

function hoverId(state: StateName) {
  return state === 'All states' ? STATE_HOVER_ID : TRACT_HOVER_ID;
}

function hoverLayerName(state: StateName) {
  return state === 'All states' ? STATE_HOVER_LAYER : TRACT_HOVER_LAYER;
}
