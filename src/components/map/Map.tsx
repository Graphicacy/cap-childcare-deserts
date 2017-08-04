import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import {
  Map as ReactMapboxGl,
  Layer,
  Feature,
  ZoomControl
} from 'react-mapbox-gl';
import { Map as MapboxMap } from 'mapbox-gl';
import { style, cssRaw } from 'typestyle';

import { StateName } from '../../data';
import { State, Dispatch, setZoomLevel } from '../../store';
import Controls from './Controls';
import StateSelect from '../_shared/StateSelect';
import Geocoder from './Geocoder';
import Legend from './Legend';
import { accessToken } from './token';

const startZoom = [3];
const startCenter = [-100.343107, 38.424848];

const MapBoxMap = ReactMapboxGl({
  accessToken,
  minZoom: 3,
  dragRotate: false
});

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

const legendStyles = (embed: boolean, zoom: number) =>
  ({
    display: zoom < 6 ? 'block' : 'none',
    position: 'absolute',
    top: embed ? 10 : 87,
    right: 40,
    zIndex: 3
  } as React.CSSProperties);

type MapProps = Readonly<{
  selectedState: StateName;
  embed: boolean;
  zoom: [number];
  setZoom: (zoom: [number]) => void;
}>;

const Map = (props: MapProps) =>
  <div className={mapContainerClass}>
    <MapBoxMap
      style="mapbox://styles/bsouthga/cj5vvqe531xrr2stlbkoqrtmr"
      containerStyle={{
        height: props.embed ? '100vh' : 500,
        width: '100vw'
      }}
      center={startCenter}
      zoom={startZoom}
      onZoom={(map: MapboxMap) => {
        console.log(map);
        props.setZoom([(map as any).style.z]);
      }}
    >
      <ZoomControl style={zoomStyles(props.embed)} />
      <Geocoder
        onResult={({ result }) => console.log(result.geometry.coordinates)}
        style={geocoderStyles(props.embed)}
      />
      <Legend style={legendStyles(props.embed, props.zoom[0])} />
    </MapBoxMap>
    <Controls />
    {props.embed
      ? <div className={stateSelectClass}>
          <StateSelect above />
        </div>
      : <div className={`fade-out ${fadeClass}`} />}
  </div>;

const mapStateToProps = (state: State) => ({
  selectedState: state.selectedState,
  embed: state.embed,
  zoom: state.zoom
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setZoom(zoom: [number]) {
    dispatch(setZoomLevel(zoom));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

cssRaw(`${''
/**
 * gradient above banner
 */
}
.fade-out {
  background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
}
`);
