import { createElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Map, AttributionControl } from 'mapbox-gl';
import { style } from 'typestyle';
import * as PropTypes from 'prop-types';

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
  static contextTypes = {
    map: PropTypes.object
  };

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
    return <div className={attributionClass} style={this.props.style} />;
  }
}
