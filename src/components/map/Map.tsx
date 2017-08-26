import { Component, createElement } from 'react';
import { connect } from 'react-redux';

import {
  Layer,
  Map as ReactMapboxGl,
  Source,
  ZoomControl
} from 'react-mapbox-gl';

import { Map as MapboxMap } from 'mapbox-gl';
import { stateData, StateName } from '../../data';
import {
  Dispatch,
  hideTooltip,
  mapReady,
  selectState,
  selectStateAndCenter,
  showTooltip,
  State,
  TractProperties,
  UrbanicityFilter
} from '../../store';
import { HEADER_HEIGHT } from '../layout/styles';
import { mapClass, mapContainerClass } from './styles';

import { Colors } from '../colors';
import Attribution from './Attribution';
import { accessToken, mapboxStyle } from './constants';
import Controls from './Controls';
import { FeatureQueryResult } from './FeatureQuery';
import Geocoder from './Geocoder';
import LayerToggle from './LayerToggle';
import Legend from './Legend';
import LoadingIndicator from './LoadingIndicator';
import MapStateSelect from './MapStateSelect';
import Mouse from './Mouse';
import TractLegend from './TractLegend';
import { EMBED_TRACT_CONTROL_INDENT, TRACT_CONTROL_INDENT } from './tracts';

const MapBoxMap = ReactMapboxGl({
  accessToken,
  dragRotate: false,
  scrollZoom: false,
  attributionControl: false
});

const zoomStyles: React.CSSProperties = {
  left: TRACT_CONTROL_INDENT,
  top: 30,
  right: 'auto'
};

const zoomEmbedStyles: React.CSSProperties = {
  ...zoomStyles,
  left: EMBED_TRACT_CONTROL_INDENT
};

const desktopLegendStyles: React.CSSProperties = {
  position: 'absolute',
  bottom: 100,
  right: TRACT_CONTROL_INDENT,
  width: 150
};

const mobileLegendStyles: React.CSSProperties = {
  margin: '0 auto',
  width: 300
};

const embedMobileLegendStyles: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  bottom: 0
};

const statesByAbbrResult: { [key: string]: StateName } = {};
const statesByAbbr = Object.keys(stateData).reduce((out, state: StateName) => {
  out[stateData[state].abbr] = state;
  return out;
}, statesByAbbrResult);

const mapStyleCache: { [key: string]: React.CSSProperties } = {};
const getMapStyles = (props: MapProps) => {
  const { embed } = props;
  const key = `${embed}`;
  if (key in mapStyleCache) return mapStyleCache[key];

  const out: React.CSSProperties = {
    width: '100vw',
    marginTop: embed ? 0 : HEADER_HEIGHT
  };

  if (embed) {
    out.height = '100vh';
  }

  return (mapStyleCache[key] = out);
};

type MapProps = Readonly<{
  selectedState: StateName;
  embed: boolean;
  zoom: [number];
  center: [number, number];
  tractMode: boolean;
  mobile: boolean;
  loaded: boolean;
  urbanicityFilter: UrbanicityFilter;
  onMouseMove(feature?: FeatureQueryResult): void;
  onClick(feature?: FeatureQueryResult): void;
  onReady(): void;
  onGeocoderResult(state?: StateName): void;
}>;

const Map: React.StatelessComponent<MapProps> = props =>
  <div className={mapContainerClass}>
    <LoadingIndicator loaded={props.loaded} embed={props.embed} />
    <MapBoxMap
      style={mapboxStyle}
      containerStyle={getMapStyles(props)}
      scrollZoom={props.tractMode}
      dragPan={props.tractMode}
      zoom={props.zoom}
      center={props.center}
      className={mapClass}
      onStyleLoad={(map: MapboxMap) => {
        // hack for https://github.com/alex3165/react-mapbox-gl/issues/130
        map.resize();
        props.onReady();
      }}
    >
      <Attribution embed={props.embed} tractMode={props.tractMode} />
      <Mouse
        tractMode={props.tractMode}
        selectedState={props.selectedState}
        onMouseMove={props.onMouseMove}
        onClick={props.onClick}
      />
      <LayerToggle
        selectedState={props.selectedState}
        tractMode={props.tractMode}
        urbanicityFilter={props.urbanicityFilter}
      />
      {props.tractMode
        ? <span>
            <Controls />
            <TractLegend />
            <ZoomControl style={props.embed ? zoomEmbedStyles : zoomStyles} />
            <Geocoder
              embed={props.embed}
              tractMode={props.tractMode}
              onResult={props.onGeocoderResult}
            />
          </span>
        : !props.mobile && <Legend style={desktopLegendStyles} />}
    </MapBoxMap>
    <MapStateSelect embed={props.embed} tractMode={props.tractMode} />
    {props.mobile && !props.tractMode
      ? <Legend
          horizontal
          style={props.embed ? embedMobileLegendStyles : mobileLegendStyles}
        />
      : null}
  </div>;

const mapStateToProps = (state: State) => {
  return {
    urbanicityFilter: state.urbanicityFilter,
    loaded: state.mapReady,
    mobile: state.mobile,
    selectedState: state.selectedState,
    embed: state.embed,
    zoom: state.mapTarget.zoom,
    center: state.mapTarget.center,
    tractMode: state.selectedState !== 'All states'
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onGeocoderResult(state?: StateName) {
    if (state) {
      dispatch(selectState(state));
    } else {
      dispatch(selectStateAndCenter('All states'));
    }
  },
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
      dispatch(selectStateAndCenter(state));
    }
  },
  onReady() {
    dispatch(mapReady());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
