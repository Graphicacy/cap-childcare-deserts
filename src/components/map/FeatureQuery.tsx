import { createElement, Component } from 'react';
import { Map, Point, Layer } from 'mapbox-gl';
import { TractProperties } from '../../store';
import { StateName } from '../../data';

export type FeatureQueryResult = TractFeature | StateFeature;

export type TractFeature = {
  kind: 'tract';
  feature: FeatureLayer;
  properties: TractProperties;
};

export type StateFeature = {
  kind: 'state';
  feature: FeatureLayer;
  properties: {
    name: StateName;
    id: string;
  };
};

type FeatureQueryProps = {
  tractMode: boolean;
};

type FeatureLayer = GeoJSON.Feature<GeoJSON.GeometryObject> & { layer: Layer };

export class FeatureQuery<P extends {} = {}, S = {}> extends Component<
  FeatureQueryProps & P,
  S
> {
  context: {
    map: Map;
  };

  queryFeatures(p: Point) {
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
  getMode() {
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
