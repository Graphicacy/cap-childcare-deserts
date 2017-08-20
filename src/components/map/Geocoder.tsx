import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { createElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { style } from 'typestyle';

import { FeatureQueryResult, FeatureQuery } from './FeatureQuery';
import { accessToken } from './constants';
import { TRACT_CONTROL_INDENT } from './tracts';

type GeocoderProps = Readonly<{
  style?: React.CSSProperties;
  onResult?(result: FeatureQueryResult | void): void;
}>;

type GeocoderState = Readonly<{
  selection?: GeocoderResultEvent;
}>;

const geocoderClass = style({
  position: 'absolute',
  left: TRACT_CONTROL_INDENT + 40,
  top: 40,
  right: 'auto',
  $nest: {
    '& .mapboxgl-ctrl-geocoder': {
      zIndex: 3
    },
    '& .mapboxgl-ctrl-geocoder input': {
      height: 35,
      padding: '7.5px 10px 7.5px 40px'
    },
    '& .mapboxgl-ctrl-geocoder .geocoder-icon-search': {
      top: '7.5px'
    }
  }
});

export default class Geocoder extends FeatureQuery<
  GeocoderProps,
  GeocoderState
> {
  geocoder = new MapboxGeocoder({
    accessToken,
    placeholder: 'Search for an address or city',
    country: 'us'
  });

  componentDidMount() {
    const { map } = this.context;
    const geocoder = this.geocoder;
    const { onResult } = this.props;

    const node = findDOMNode(this);
    node.appendChild(geocoder.onAdd(map));

    /**
     * Add listener on second invocation of result event,
     * deals with issue:
     * https://github.com/mapbox/mapbox-gl-geocoder/issues/99
     */
    let cache = '';
    geocoder
      .on('error', console.error)
      .on('result', (e: GeocoderResultEvent) => {
        const center = e.result.center.toString();
        if (cache === center && onResult)
          map.once('moveend', () => {
            const point = map.project(e.result.center);
            onResult(this.queryFeatures(point));
          });
        cache = center;
      });
  }

  render() {
    const { style } = this.props;
    return <div className={geocoderClass} style={style} />;
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
