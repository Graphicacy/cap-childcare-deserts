import { createElement, Component } from 'react';
import { Map, Point, Layer } from 'mapbox-gl';
import { StateName } from '../../data';

export type FeatureQueryResult = TractFeature | StateFeature;

export type TractFeature = {
  kind: 'tract';
  feature: FeatureLayer;
  properties: any;
};

export type StateFeature = {
  kind: 'state';
  feature: FeatureLayer;
  properties: {
    name: StateName;
  };
};

type FeatureQueryProps = {
  zoom: number[];
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
    const layers = getDataLayers(this.getZoom());
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
  getZoom() {
    return this.props.zoom;
  }
}

export function getDataLayers(zoom: number[]) {
  return zoom[0] > 6 ? ['tl-2016-06-tract'] : ['allstates'];
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
