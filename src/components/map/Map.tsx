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

import { headerHeight } from '../layout/Header';
import Controls from './Controls';
import StateSelect from '../_shared/StateSelect';
import Geocoder from './Geocoder';
import Legend from './Legend';
import Mouse from './Mouse';
import LayerToggle from './LayerToggle';
import TractLegend from './TractLegend';
import { accessToken, mapboxStyle, TRACT_CONTROL_INDENT } from './constants';
import { FeatureQueryResult } from './FeatureQuery';

const MapBoxMap = ReactMapboxGl({
  accessToken,
  dragRotate: false,
  logoPosition: 'top-left'
});

const mapContainerClass = style({
  position: 'relative',
  zIndex: 1
});

const selectWidth = 250;

const stateSelectClass = style({
  position: 'absolute',
  bottom: 40,
  width: selectWidth,
  left: '50%',
  marginLeft: -(selectWidth / 2)
});

const zoomStyles = {
  left: TRACT_CONTROL_INDENT,
  top: 30,
  right: 'auto'
};

type MapProps = Readonly<{
  selectedState: StateName;
  embed: boolean;
  zoom: [number] | null;
  center: [number, number] | null;
  bounds: number[][] | null;
  tractMode: boolean;
  mobile: boolean;
  onMouseMove(feature?: FeatureQueryResult): void;
  onClick(feature?: FeatureQueryResult): void;
}>;

const Map = (props: MapProps) =>
  <div className={mapContainerClass}>
    <MapBoxMap
      style={mapboxStyle}
      containerStyle={{
        height: props.embed ? '100vh' : props.mobile ? 300 : 475,
        width: '100vw',
        marginTop: props.embed ? 0 : headerHeight
      }}
      scrollZoom={props.tractMode}
      dragPan={props.tractMode}
      zoom={props.zoom}
      center={props.center}
    >
      <Mouse
        tractMode={props.tractMode}
        onMouseMove={props.onMouseMove}
        onClick={props.onClick}
      />
      <LayerToggle
        selectedState={props.selectedState}
        tractMode={props.tractMode}
      />
      {props.mobile || props.tractMode
        ? null
        : <Legend
            style={{
              position: 'absolute',
              bottom: 100,
              right: TRACT_CONTROL_INDENT,
              width: 150
            }}
          />}
      {props.tractMode ? <ZoomControl style={zoomStyles} /> : null}
      {props.tractMode ? <Controls /> : null}
      {props.tractMode ? <TractLegend /> : null}
      {props.tractMode ? <Geocoder tractMode={props.tractMode} /> : null}
    </MapBoxMap>
    {props.embed
      ? <div className={stateSelectClass}>
          <StateSelect above />
        </div>
      : null}
    {props.mobile ? <Legend style={{ margin: '0 auto', width: 300 }} /> : null}
  </div>;

const mapStateToProps = (state: State) => {
  const mobile = state.screenSize <= 768;

  return {
    mobile,
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
