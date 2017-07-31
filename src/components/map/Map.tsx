import { createElement } from 'react';
import { connect } from 'react-redux';
import { Map as ReactMapboxGl, Layer, Feature } from 'react-mapbox-gl';
import { style, cssRaw } from 'typestyle';

import { StateName } from '../../data';
import { State } from '../../store';

declare const __ACCESS_TOKEN__: string;

const MapBoxMap = ReactMapboxGl({ accessToken: __ACCESS_TOKEN__ });

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

cssRaw(`
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

const Map = ({ selectedState }: { selectedState: StateName | null }) =>
  <div className={mapContainerClass}>
    <MapBoxMap
      style="mapbox://styles/bsouthga/cj5ci49b504wq2todg2cjvw7w"
      containerStyle={{
        height: 500,
        width: '100vw'
      }}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </MapBoxMap>
    <div className={`fade-out ${fadeClass}`} />
  </div>;

export default connect((state: State) => ({
  selectedState: state.selectedState
}))(Map);
