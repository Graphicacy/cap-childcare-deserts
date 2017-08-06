import { createElement, Component } from 'react';
import { Map, Point } from 'mapbox-gl';
import { getDataLayers } from './constants';

export type FeatureQueryResult = TractFeature | StateFeature;

export type TractFeature = {
  kind: 'tract';
  properties: {
    id: string;
  };
};

export type StateFeature = {
  kind: 'state';
  properties: {
    abbr: string;
  };
};

export type FeatureQueryProps = {
  zoom: number[];
};

export class FeatureQuery<P extends {} = {}, S = {}> extends Component<
  FeatureQueryProps & P,
  S
> {
  context: {
    map: Map;
  };

  queryFeatures(p: Point) {
    const { map } = this.context;
    const layers = getDataLayers(this.getZoom());
    const features = map.queryRenderedFeatures(p, { layers });
    console.log(features);
  }

  /**
   * query current zoom property, so we don't close
   * over zoom in callbacks to events
   */
  getZoom() {
    return this.props.zoom;
  }
}
