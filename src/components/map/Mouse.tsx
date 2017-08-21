import { GeoJSONSource, MapMouseEvent } from 'mapbox-gl';
import { Component, createElement } from 'react';
import { StateName } from '../../data';
import { Colors } from '../colors';
import { HoverSources, mapboxStyle } from './constants';
import { FeatureQuery, FeatureQueryResult } from './FeatureQuery';
import { getTractLayerForState } from './tracts';

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
    this.initHover('All states');
    this.initHandlers();
  }

  public componentDidUpdate() {
    const { tractMode, selectedState } = this.props;
    if (tractMode) {
      // remove state highlight if dropped to tract mode
      this.highlight('All states');
      this.initHover(selectedState);
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

  private registered: { [K in StateName]?: boolean } = {};
  private initHover(state: StateName) {
    if (this.registered[state]) return;
    this.registered[state] = true;
    const { map } = this.context;

    const sourceData = hoverSources[state];
    if (sourceData) {
      map.addSource(hoverSourceName(state), {
        type: 'vector',
        url: `mapbox://${sourceData.source}`
      });

      map.addLayer({
        id: hoverLayerName(state),
        type: 'line',
        source: hoverSourceName(state),
        'source-layer': sourceData.sourceLayer,
        paint: {
          'line-color': Colors.HOVER_COLOR,
          'line-width': 2
        },
        filter: ['==', hoverId(state), '']
      });
    }
  }

  private highlight(state: StateName, id = '') {
    if (this.hoverPolygonId === id || !this.registered[state]) return;
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

export const hoverSources: { [key in StateName]?: HoverSource } = {
  'All states': {
    sourceLayer: 'allstates',
    source: 'bsouthga.bkxp0vhq'
  },
  California: {
    sourceLayer: 'tl_2016_06_tract',
    source: 'bsouthga.4820m6au'
  }
};

function hoverId(state: StateName) {
  switch (state) {
    case 'All states':
      return 'id';
    default:
      return 'GEOID';
  }
}

function hoverLayerName(state: StateName) {
  return allCapSnake(state) + '-HOVER';
}

function hoverSourceName(state: StateName) {
  return allCapSnake(state) + '-HOVER-SOURCE';
}

function allCapSnake(str: string) {
  return str.split(/\s+/).map(s => s.toUpperCase()).join('-');
}
