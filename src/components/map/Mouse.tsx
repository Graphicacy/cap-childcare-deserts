import { createElement, Component } from 'react';
import { MapMouseEvent } from 'mapbox-gl';
import { FeatureQueryResult, FeatureQuery } from './FeatureQuery';
import { getTractLayerForState } from './tracts';

type MouseProps = Readonly<{
  onMouseMove?(feature?: FeatureQueryResult | void): void;
  onClick?(feature?: FeatureQueryResult | void): void;
}>;

class Mouse extends FeatureQuery<MouseProps> {
  componentDidMount() {
    const { map } = this.context;
    const { onMouseMove, onClick } = this.props;
    // this.highlightTract();
    // this.higlightState();

    if (onMouseMove) {
      map.on('mousemove', (e: MapMouseEvent) => {
        const feature = this.queryFeatures(e.point);
        // if (feature) {
        //   switch (feature.kind) {
        //     case 'state':
        //       this.higlightState(feature.properties.id);
        //       break;
        //     // case 'tract':
        //     //   this.highlightTract(feature.properties.GEOID);
        //     //   break;
        //   }
        // }
        onMouseMove(feature);
      });
      map.on('mouseout', () => {
        // this.higlightState();
        // this.highlightTract();
        onMouseMove();
      });
    }

    if (onClick) {
      map.on('click', (e: MapMouseEvent) => {
        onClick(this.queryFeatures(e.point));
      });
    }
  }

  higlightState(stateId = '') {
    const { map } = this.context;
    map.setFilter('all-states-json-hover', ['==', 'id', stateId]);
  }

  // highlightTract(state: StateName, tractId = '') {
  //   const { map } = this.context;
  //   const layer = getTractLayerForState(state);
  //   map.setFilter(`${layer}-hover`, ['==', 'GEOID', tractId]);
  // }

  render() {
    return null;
  }
}

export default Mouse;
