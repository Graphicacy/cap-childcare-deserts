import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';

import { stateData, StateName } from '../../data';
import { accessToken } from './constants';
import { FeatureQuery, FeatureQueryResult } from './FeatureQuery';
import { geocoderClass } from './styles';
import { EMBED_TRACT_CONTROL_INDENT, TRACT_CONTROL_INDENT } from './tracts';

type GeocoderProps = Readonly<{
  style?: React.CSSProperties;
  embed?: boolean;
  onResult?(result: StateName | void): void;
}>;

type GeocoderState = Readonly<{
  selection?: GeocoderResultEvent;
}>;

const embedGeocoderStyles: React.CSSProperties = {
  left: EMBED_TRACT_CONTROL_INDENT + 40
};

const geocoderStyles = {};

export default class Geocoder extends FeatureQuery<
  GeocoderProps,
  GeocoderState
> {
  private geocoder = new MapboxGeocoder({
    accessToken,
    placeholder: 'Search for an address or city',
    country: 'us'
  });

  public componentDidMount() {
    const { map } = this.context;
    const geocoder = this.geocoder;
    const { onResult } = this.props;

    const node = findDOMNode(this);
    node.appendChild(geocoder.onAdd(map));

    geocoder
      .on('error', console.error)
      .on('result', (e: GeocoderResultEvent) => {
        const center = e.result.center.toString();
        if (onResult)
          map.once('moveend', () => {
            const state = getStateIfExists(e.result);
            onResult(state);
          });
      });
  }

  public render() {
    const { embed } = this.props;
    return (
      <div
        className={geocoderClass}
        style={embed ? embedGeocoderStyles : geocoderStyles}
      />
    );
  }
}

const STATE_CODE_MATCH = /^US-.*/g;
function getStateIfExists(result: Result) {
  const context = result.context;
  const stateContainer =
    context && context.filter(s => STATE_CODE_MATCH.test(s.short_code));
  const state = stateContainer.length && stateContainer[0].text;
  if (state && state in stateData) return state as StateName;
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
