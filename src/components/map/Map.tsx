import { createElement } from 'react';
import { connect } from 'react-redux';
import {
  Map as ReactMapboxGl,
  Layer,
  Feature,
  ZoomControl
} from 'react-mapbox-gl';
import { style, cssRaw } from 'typestyle';

import { StateName } from '../../data';
import { State } from '../../store';
import Controls from './Controls';
import StateSelect from '../_shared/StateSelect';
import Geocoder from './Geocoder';
import { accessToken } from './token';

const MapBoxMap = ReactMapboxGl({ accessToken });

const mapContainerClass = style({
  position: 'relative',
  zIndex: 1
});

const fadeClass = style({
  position: 'absolute',
  display: 'block',
  zIndex: 2,
  bottom: 0,
  height: 100,
  marginTop: -100,
  width: '100vw'
});

const selectWidth = 250;

const stateSelectClass = style({
  position: 'absolute',
  bottom: 20,
  width: selectWidth,
  left: '50%',
  marginLeft: -(selectWidth / 2)
});

const geocoderStyles = (embed: boolean) =>
  ({
    position: 'absolute',
    left: 50,
    top: embed ? 10 : 87,
    right: 'auto'
  } as React.CSSProperties);

const zoomStyles = (embed: boolean) => {
  return {
    left: 10,
    top: embed ? 10 : 80,
    right: 'auto'
  };
};

type MapProps = Readonly<{
  selectedState: StateName;
  embed: boolean;
}>;

const Map = (props: MapProps) =>
  <div className={mapContainerClass}>
    <MapBoxMap
      style="mapbox://styles/bsouthga/cj5vvqe531xrr2stlbkoqrtmr"
      containerStyle={{
        height: props.embed ? '100vh' : 500,
        width: '100vw'
      }}
      center={[-122.41, 37.77]}
    >
      <ZoomControl style={zoomStyles(props.embed)} />
      <Geocoder
        onResult={({ result }) => console.log(result.geometry.coordinates)}
        style={geocoderStyles(props.embed)}
      />
    </MapBoxMap>
    <Controls />
    {props.embed
      ? <div className={stateSelectClass}>
          <StateSelect above />
        </div>
      : <div className={`fade-out ${fadeClass}`} />}
  </div>;

export default connect((state: State) => ({
  selectedState: state.selectedState,
  embed: state.embed
}))(Map);

cssRaw(`${''
/**
 * gradient above banner
 */
}
.fade-out {
  background: url(data:image/svg+xml;base64,alotofcodehere);
  background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0)), color-stop(70%,rgba(255,255,255,1)));
  background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%);
  background: -o-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%);
  background: -ms-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%);
  background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%);
}
`);
