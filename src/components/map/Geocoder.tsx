import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { createElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Map, MapBoxZoomEvent } from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { accessToken, dataLayers } from './constants';

export default class Geocoder extends Component {
  context: {
    map: Map;
  };

  state: {
    selection?: GeocoderResultEvent;
  };

  props: {
    style?: React.CSSProperties;
    className?: string;
  };

  geocoder = new MapboxGeocoder({
    accessToken
  });

  componentDidMount() {
    const { map } = this.context;
    const geocoder = this.geocoder;
    const node = findDOMNode(this);

    /**
     * Add listener on second invocation of result event,
     * deals with issue:
     * https://github.com/mapbox/mapbox-gl-geocoder/issues/99
     */
    let cache = '';
    geocoder.on('result', (e: GeocoderResultEvent) => {
      const center = e.result.center.toString();
      if (cache === center)
        map.once('moveend', () => {
          const point = map.project(e.result.center);
          const results = map.queryRenderedFeatures(point, {
            layers: dataLayers
          });
        });
      cache = center;
    });

    geocoder.on('error', console.error);

    node.appendChild(geocoder.onAdd(map));
  }

  render() {
    const { className, style } = this.props;
    return <div className={className} style={style} />;
  }
}

export interface Properties {
  wikidata: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Context {
  id: string;
  wikidata: string;
  text: string;
  short_code: string;
}

export interface Result {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface GeocoderResultEvent {
  result: Result;
}
