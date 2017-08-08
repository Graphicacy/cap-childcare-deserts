import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import {
  Map as ReactMapboxGl,
  Layer,
  ZoomControl,
  Source
} from 'react-mapbox-gl';
import { Map as MapboxMap } from 'mapbox-gl';
import { style, cssRaw } from 'typestyle';

import { StateName, stateData } from '../../data';
import {
  State,
  Dispatch,
  showLegend,
  hideLegend,
  setSelectedState,
  showTooltip,
  hideTooltip,
  TractProperties
} from '../../store';
import Controls from './Controls';
import StateSelect from '../_shared/StateSelect';
import Geocoder from './Geocoder';
import Legend from './Legend';
import Mouse from './Mouse';
import LayerToggle from './LayerToggle';
import { accessToken, mapboxStyle, TRACT_CONTROL_INDENT } from './constants';
import { FeatureQueryResult } from './FeatureQuery';

const MapBoxMap = ReactMapboxGl({
  accessToken,
  minZoom: 3,
  dragRotate: false,
  logoPosition: 'top-left'
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
    left: TRACT_CONTROL_INDENT + 40,
    top: embed ? 10 : 87,
    right: 'auto'
  } as React.CSSProperties);

const zoomStyles = (embed: boolean) => {
  return {
    left: TRACT_CONTROL_INDENT,
    top: embed ? 10 : 80,
    right: 'auto'
  };
};

const legendStyles = (embed: boolean, stateMode: boolean) =>
  ({
    display: stateMode ? 'block' : 'none',
    position: 'absolute',
    top: embed ? 10 : 87,
    right: TRACT_CONTROL_INDENT,
    zIndex: 3
  } as React.CSSProperties);

type MapProps = Readonly<{
  selectedState: StateName;
  embed: boolean;
  zoom: [number] | null;
  center: [number, number] | null;
  bounds: number[][] | null;
  tractMode: boolean;
  onMouseMove(feature?: FeatureQueryResult): void;
  onClick(feature?: FeatureQueryResult): void;
  onResult(feature?: FeatureQueryResult): void;
}>;

const Map = (props: MapProps) =>
  <div className={mapContainerClass}>
    <MapBoxMap
      style={mapboxStyle}
      containerStyle={{
        height: props.embed ? '100vh' : 500,
        width: '100vw'
      }}
      scrollZoom={props.tractMode}
      dragPan={props.tractMode}
      zoom={props.zoom}
      center={props.center}
    >
      {!props.tractMode
        ? null
        : <ZoomControl style={zoomStyles(props.embed)} />}
      {!props.tractMode
        ? null
        : <Geocoder
            tractMode={props.tractMode}
            style={geocoderStyles(props.embed)}
            onResult={props.onResult}
          />}
      <Mouse
        tractMode={props.tractMode}
        onMouseMove={props.onMouseMove}
        onClick={props.onClick}
      />
      <Legend style={legendStyles(props.embed, !props.tractMode)} />
      <LayerToggle tractMode={props.tractMode} />
    </MapBoxMap>
    {!props.tractMode ? null : <Controls />}
    {props.embed
      ? <div className={stateSelectClass}>
          <StateSelect above />
        </div>
      : <div className={`fade-out ${fadeClass}`} />}
  </div>;

const mapStateToProps = (state: State) => {
  return {
    selectedState: state.selectedState,
    embed: state.embed,
    zoom: state.zoom,
    center: state.center,
    bounds: state.bounds,
    tractMode: state.selectedState !== 'All states'
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onMouseMove(feature?: FeatureQueryResult) {
    if (!feature) return dispatch(hideTooltip());
    switch (feature.kind) {
      case 'state': {
        const state = feature.properties.name;
        if (!(state in stateData)) return dispatch(hideTooltip());
        return dispatch(
          showTooltip({
            kind: 'state',
            properties: { state }
          })
        );
      }
      case 'tract': {
        return dispatch(
          showTooltip({
            kind: 'tract',
            properties: feature.properties as TractProperties
          })
        );
      }
    }
  },
  onClick(feature?: FeatureQueryResult) {
    if (!feature) return;
    if (feature.kind === 'state') {
      const state = feature.properties.name;
      if (!(state in stateData)) return;
      dispatch(setSelectedState(state));
    }
  },
  onResult(feature?: FeatureQueryResult) {
    console.log(feature);
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
