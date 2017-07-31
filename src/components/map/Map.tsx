import { createElement } from 'react';
import { connect } from 'react-redux';
import { Map as ReactMapboxGl, Layer, Feature } from 'react-mapbox-gl';
import { style, cssRaw } from 'typestyle';

import { StateName } from '../../data';
import { State } from '../../store';

declare const __ACCESS_TOKEN__: string;

const MapBoxMap = ReactMapboxGl({ accessToken: __ACCESS_TOKEN__ });

const FADE_SIZE = 80;

const mapFadeClass = style({
  position: 'absolute',
  bottom: 0,
  zIndex: 2,
  height: FADE_SIZE,
  width: '100vw',
  marginTop: -FADE_SIZE
});

const mapContainerClass = style({
  position: 'relative'
});

const Map = ({ selectedState }: { selectedState: StateName | null }) =>
  <div className={mapContainerClass}>
    <MapBoxMap
      style="mapbox://styles/bsouthga/cj5ci49b504wq2todg2cjvw7w"
      containerStyle={{
        height: 400 + FADE_SIZE,
        width: '100vw',
        zIndex: 1
      }}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </MapBoxMap>
    <div className={`fade-top ${mapFadeClass}`} />
  </div>;

export default connect((state: State) => ({
  selectedState: state.selectedState
}))(Map);

/**
 * add fade css for map
 */
cssRaw(`
.fade-top {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjcwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=);
  background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0)), color-stop(70%,rgba(255,255,255,1)));
  background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%);
  background: -o-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%);
  background: -ms-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%);
  background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 );
}
`);
