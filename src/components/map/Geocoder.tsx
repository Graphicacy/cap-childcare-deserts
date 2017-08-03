import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { createElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Map } from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { accessToken } from './token';

export default class Geocoder extends Component {
  context: {
    map: Map;
  };

  props: {
    onResult?: (result: GeocoderResult) => void;
    onError?: (error: any) => void;
    style?: React.CSSProperties;
    className?: string;
  };

  geocoder = new MapboxGeocoder({
    accessToken,
    country: '1', // restrict to us
    flyTo: false // don't automatically go to point
  });

  componentDidMount() {
    const { map } = this.context;
    const { onResult, onError } = this.props;
    const geocoder = this.geocoder;
    const node = findDOMNode(this);

    if (onResult) geocoder.on('result', onResult);
    if (onError) geocoder.on('error', onError);

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

export interface GeocoderResult {
  result: Result;
}
