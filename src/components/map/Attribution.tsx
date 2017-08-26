import { AttributionControl, Map } from 'mapbox-gl';
import * as PropTypes from 'prop-types';
import { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';

import { attributionClass } from './styles';

interface AttributionProps {
  style?: React.CSSProperties;
  tractMode?: boolean;
  embed?: boolean;
}

const embedStyle = { top: 0, bottom: 'auto', right: 0 };

export default class Attribution extends Component<AttributionProps> {
  public static contextTypes = {
    map: PropTypes.object
  };

  public context: {
    map: Map;
  };

  public componentDidMount() {
    const { map } = this.context;
    const control = new AttributionControl();
    const node = findDOMNode(this);
    node.appendChild((control as any).onAdd(map));
  }

  public render() {
    const { tractMode, embed } = this.props;
    return (
      <div
        className={attributionClass}
        style={
          embed
            ? embedStyle
            : {
                bottom: tractMode ? 30 : 0
              }
        }
      />
    );
  }
}
