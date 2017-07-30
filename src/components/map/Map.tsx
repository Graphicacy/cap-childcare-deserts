import { createElement } from 'react';
import { connect } from 'react-redux';
import { Map as ReactMapboxGl, Layer, Feature } from 'react-mapbox-gl';
import { style } from 'typestyle';
import { content, height } from 'csstips';

import { StateName } from '../../data';
import { State } from '../../store';

declare const __ACCESS_TOKEN__: string;

const MapBoxMap = ReactMapboxGl({ accessToken: __ACCESS_TOKEN__ });

const mapContainerClass = style(content, height(200), {
  marginTop: -10,
  backgroundColor: 'green'
});

const Map = ({ selectedState }: { selectedState: StateName | null }) =>
  <div className={mapContainerClass}>
    {/* <MapBoxMap
      style="mapbox://styles/bsouthga/cj5ci49b504wq2todg2cjvw7w"
      containerStyle={{
        height: '400px',
        width: '100vw'
      }}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </MapBoxMap> */}
  </div>;

export default connect((state: State) => ({
  selectedState: state.selectedState
}))(Map);
