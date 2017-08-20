import { AttributionControl, Map } from 'mapbox-gl';
import * as PropTypes from 'prop-types';
import { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';
import { style } from 'typestyle';

const attributionClass = style({
  position: 'absolute',
  right: 15,
  bottom: 0,
  zIndex: 10
});

interface AttributionProps {
  style?: React.CSSProperties;
  tractMode?: boolean;
}

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
    const { tractMode } = this.props;
    return (
      <div
        className={attributionClass}
        style={{
          bottom: tractMode ? 30 : 0
        }}
      />
    );
  }
}
