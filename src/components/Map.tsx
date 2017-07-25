import * as React from 'react';
import { style } from 'typestyle';
import { connect } from 'react-redux';
import { StateName } from '../states';
import { State } from '../reducers';
import { Map as ReactMapboxGl, Layer, Feature } from 'react-mapbox-gl';

declare const __ACCESS_TOKEN__: string;

const accessToken = __ACCESS_TOKEN__;
const MapBoxMap = ReactMapboxGl({ accessToken });

const mapContainerClass = style({
  marginTop: -10
});

const Map = ({ selectedState }: { selectedState: StateName | null }) =>
  <div className={`columns ${mapContainerClass}`}>
    <div className="column col-12">
      <MapBoxMap
        style="mapbox://styles/bsouthga/cj5ci49b504wq2todg2cjvw7w"
        containerStyle={{
          height: '400px',
          width: '100vw'
        }}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </MapBoxMap>
    </div>
  </div>;

export default connect((state: State) => ({
  selectedState: state.selectedState
}))(Map);
