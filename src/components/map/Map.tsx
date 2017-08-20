import { createElement, Component } from 'react';
import { connect } from 'react-redux';

import {
  Map as ReactMapboxGl,
  Layer,
  ZoomControl,
  Source
} from 'react-mapbox-gl';

import { Map as MapboxMap, supported } from 'mapbox-gl';
import { style, media } from 'typestyle';

import { StateName, stateData } from '../../data';
import {
  State,
  Dispatch,
  showLegend,
  hideLegend,
  setSelectedState,
  showTooltip,
  hideTooltip,
  TractProperties,
  mapReady,
  UrbanicityFilter
} from '../../store';

import { HEADER_HEIGHT } from '../layout/Header';
import Controls from './Controls';
import StateSelect from '../_shared/StateSelect';
import Geocoder from './Geocoder';
import Legend from './Legend';
import Mouse from './Mouse';
import LayerToggle from './LayerToggle';
import TractLegend from './TractLegend';
import Attribution from './Attribution';
import Loading from './Loading';
import { accessToken, mapboxStyle, HoverSources } from './constants';
import { TRACT_CONTROL_INDENT } from './tracts';
import { FeatureQueryResult } from './FeatureQuery';
import { Colors } from '../colors';

export const MAP_CAN_RENDER = supported();

const MapBoxMap = ReactMapboxGl({
  accessToken,
  dragRotate: false,
  scrollZoom: false,
  attributionControl: false
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

const loadingContainerClass = style({
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 10,
  backgroundColor: 'white',
  marginTop: HEADER_HEIGHT
});

const embededLoadingClass = style({
  width: '100vw',
  height: '100vh',
  marginTop: 0
});

const mapClass = style(
  {
    height: 475
  },
  media(
    { maxWidth: 768 },
    {
      height: 300
    }
  )
);

const notSupportedClass = style({
  fontSize: 20,
  color: Colors.FONT_GRAY,
  textAlign: 'center',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
});

const getMapStyles = (props: MapProps) => {
  const out: React.CSSProperties = {
    width: '100vw',
    marginTop: props.embed ? 0 : HEADER_HEIGHT
  };

  if (props.embed) {
    out.height = '100vh';
  }

  return out;
};

type MapProps = Readonly<{
  selectedState: StateName;
  embed: boolean;
  zoom: [number] | null;
  center: [number, number] | null;
  bounds: number[][] | null;
  tractMode: boolean;
  mobile: boolean;
  loaded: boolean;
  urbanicityFilter: UrbanicityFilter;
  onMouseMove(feature?: FeatureQueryResult): void;
  onClick(feature?: FeatureQueryResult): void;
  onReady(): void;
}>;

const LoadingIndicator = ({
  loaded,
  embed
}: {
  loaded: boolean;
  embed: boolean;
}) =>
  loaded
    ? null
    : <div
        className={
          loadingContainerClass + ' ' + (embed ? embededLoadingClass : mapClass)
        }
      >
        <Loading />
      </div>;

const Map = (props: MapProps) =>
  !MAP_CAN_RENDER
    ? <div className={mapContainerClass}>
        <div className={mapClass}>
          <div className={notSupportedClass}>
            Sorry, your browser unable to load this map.<br />
            If possible, try{' '}
            <a href="https://browser-update.org/update.html">
              upgrading your browser
            </a>.
          </div>
        </div>
      </div>
    : <div className={mapContainerClass}>
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
          <Attribution
            style={{
              bottom: props.tractMode ? 30 : 0
            }}
          />
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
                <ZoomControl style={zoomStyles} />
                <Geocoder tractMode={props.tractMode} />
              </span>
            : (!props.mobile || props.embed) &&
              <Legend style={desktopLegendStyles} />}
        </MapBoxMap>
        {props.embed
          ? <StateSelect above className={stateSelectClass} />
          : null}
        {!props.embed && props.mobile
          ? <Legend horizontal style={mobileLegendStyles} />
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
  onReady() {
    dispatch(mapReady());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
