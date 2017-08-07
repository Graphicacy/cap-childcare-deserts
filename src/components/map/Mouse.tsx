import { createElement, Component } from 'react';
import { MapMouseEvent } from 'mapbox-gl';
import { FeatureQueryResult, FeatureQuery } from './FeatureQuery';

type MouseProps = Readonly<{
  onMouseMove?(feature?: FeatureQueryResult | void): void;
  onClick?(feature?: FeatureQueryResult | void): void;
}>;

class Mouse extends FeatureQuery<MouseProps> {
  componentDidMount() {
    const { map } = this.context;
    const { onMouseMove, onClick, zoom } = this.props;

    if (onMouseMove) {
      map.on('mousemove', (e: MapMouseEvent) => {
        onMouseMove(this.queryFeatures(e.point));
      });
      map.on('mouseout', () => onMouseMove());
    }

    if (onClick) {
      map.on('click', (e: MapMouseEvent) => {
        onClick(this.queryFeatures(e.point));
      });
    }
  }

  render() {
    return null;
  }
}

export default Mouse;
