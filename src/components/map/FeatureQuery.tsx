import { Layer, Map, Point } from 'mapbox-gl';
import * as PropTypes from 'prop-types';
import { Component, createElement } from 'react';
import { StateName } from '../../data';
import { TractProperties } from '../../store';

export type FeatureQueryResult = TractFeature | StateFeature;

export interface TractFeature {
  kind: 'tract';
  feature: FeatureLayer;
  properties: TractProperties;
}

export interface StateFeature {
  kind: 'state';
  feature: FeatureLayer;
  properties: {
    name: StateName;
    id: string;
  };
}

interface FeatureQueryProps {
  tractMode: boolean;
}

export type FeatureLayer = GeoJSON.Feature<GeoJSON.GeometryObject> & {
  layer: Layer;
};

export class FeatureQuery<P extends {} = {}, S = {}> extends Component<
  FeatureQueryProps & P,
  S
> {
  public static contextTypes = {
    map: PropTypes.object
  };

  public context: {
    map: Map;
  };

  public queryFeatures(p: Point) {
    const { map } = this.context;
    const layers = getDataLayers(this.getMode());
    const features = map.queryRenderedFeatures(p, { layers }) as FeatureLayer[];
    if (features.length) {
      const [feature] = features;
      return normalizeFeature(feature);
    }
  }

  /**
   * query current zoom property, so we don't close
   * over zoom in callbacks to events
   */
  public getMode() {
    return this.props.tractMode;
  }
}

export function getDataLayers(tractMode: boolean) {
  return tractMode ? ['tl-2016-06-tract'] : ['allstates'];
}

export function normalizeFeature(
  feature: FeatureLayer
): FeatureQueryResult | void {
  switch (feature.layer.id) {
    /**
       * state-level data
       */
    case 'allstates': {
      return {
        kind: 'state',
        feature,
        properties: feature.properties as any
      };
    }

    /**
       * individual tract features
       */
    case 'tl-2016-06-tract': {
      return {
        kind: 'tract',
        feature,
        properties: feature.properties as any
      };
    }
  }
}
