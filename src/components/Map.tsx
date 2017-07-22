import * as React from 'react';
import { Map as ReactMapboxGl, Layer, Feature } from 'react-mapbox-gl';

declare const __ACCESS_TOKEN__: string;

const accessToken = __ACCESS_TOKEN__;
const MapBoxMap = ReactMapboxGl({ accessToken });

export const Map = () =>
  <div className="columns">
    <div className="column col-12">
      <MapBoxMap
        style="mapbox://styles/mapbox/streets-v9"
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
