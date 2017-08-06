import { createElement, Component } from 'react';
import { Map, MapMouseEvent } from 'mapbox-gl';

type MouseProps = Readonly<{
  onMouseMove?(e: MapMouseEvent, map: Map): void;
  onClick?(e: MapMouseEvent, map: Map): void;
}>;

class Mouse extends Component<MouseProps> {
  context: {
    map: Map;
  };

  componentDidMount() {
    const { map } = this.context;
    const { onMouseMove, onClick } = this.props;
    onMouseMove &&
      map.on('mousemove', (e: MapMouseEvent) => onMouseMove(e, map));
    onClick && map.on('click', (e: MapMouseEvent) => onClick(e, map));
  }
}

export default Mouse;
