import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { createElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { FeatureQueryResult, FeatureQuery } from './FeatureQuery';

import { accessToken } from './constants';

type GeocoderProps = Readonly<{
  style?: React.CSSProperties;
  className?: string;
}>;

type GeocoderState = Readonly<{
  selection?: GeocoderResultEvent;
}>;

export default class Geocoder extends FeatureQuery<
  GeocoderProps,
  GeocoderState
> {
  geocoder = new MapboxGeocoder({
    accessToken
  });

  componentDidMount() {
    const { map } = this.context;
    const { zoom } = this.props;
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
          this.queryFeatures(point);
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
