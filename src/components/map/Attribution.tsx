import { createElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Map, AttributionControl } from 'mapbox-gl';
import { style } from 'typestyle';

const attributionClass = style({
  position: 'absolute',
  right: 15,
  bottom: 0,
  zIndex: 10
});

type AttributionProps = {
  style?: React.CSSProperties;
};

export default class Attribution extends Component<AttributionProps> {
  context: {
    map: Map;
  };

  componentDidMount() {
    const { map } = this.context;
    const control = new AttributionControl();
    const node = findDOMNode(this);
    node.appendChild((control as any).onAdd(map));
  }

  render() {
    const { style } = this.props;
    return <div className={attributionClass} style={style} />;
  }
}
