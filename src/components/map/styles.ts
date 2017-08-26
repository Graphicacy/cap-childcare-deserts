import { media, style } from 'typestyle';
import { Colors } from '../colors';
import { HEADER_HEIGHT } from '../layout/styles';
import { EMBED_TRACT_CONTROL_INDENT, TRACT_CONTROL_INDENT } from './tracts';

export const attributionClass = style({
  position: 'absolute',
  right: 15,
  bottom: 0,
  zIndex: 10
});

export const controlClass = style({
  position: 'absolute',
  top: 110,
  left: TRACT_CONTROL_INDENT,
  zIndex: 2
});

export const buttonClass = style(
  {
    display: 'inline-block',
    textTransform: 'uppercase',
    width: 90,
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: 12,
    height: '26px',
    lineHeight: '26px'
  },
  media(
    { maxWidth: 768 },
    {
      fontSize: 10,
      width: 70
    }
  )
);

export const geocoderClass = style({
  position: 'absolute',
  left: TRACT_CONTROL_INDENT + 40,
  top: 40,
  right: 'auto',
  $nest: {
    '& .mapboxgl-ctrl-geocoder': {
      zIndex: 3
    },
    '& .mapboxgl-ctrl-geocoder input': {
      height: 35,
      padding: '7.5px 10px 7.5px 40px'
    },
    '& .mapboxgl-ctrl-geocoder .geocoder-icon-search': {
      top: '7.5px'
    }
  }
});

export const legendClass = style({
  backgroundColor: Colors.INFO_BACKGROUND,
  padding: 15,
  borderRadius: 5,
  lineHeight: '1em',
  display: 'block',
  zIndex: 3
});

export const legendItemClass = style({
  position: 'relative',
  height: 20
});

export const legendSquareClass = style({
  width: 20,
  height: 20,
  display: 'inline-block'
});

export const legendBinClass = style({
  marginLeft: 10,
  position: 'relative',
  top: '50%',
  display: 'inline-block'
});

export const legendTitleClass = style({
  fontWeight: 'bold',
  fontSize: 14,
  marginBottom: 10,
  lineHeight: '1.25em'
});

export const loadingContainerClass = style({
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 10,
  backgroundColor: 'white',
  marginTop: HEADER_HEIGHT
});

export const embededLoadingClass = style({
  width: '100vw',
  height: '100vh',
  marginTop: 0
});

export const nonEmbedClass = style(
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

export const mapContainerClass = style({
  position: 'relative',
  zIndex: 1
});

export const mapClass = style(
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

const selectWidth = 250;

export const stateSelectClass = style({
  position: 'absolute',
  bottom: 40,
  width: selectWidth,
  left: '50%',
  marginLeft: -(selectWidth / 2)
});

export const tractResponsive = style(
  media(
    { maxWidth: 768 },
    {
      bottom: 60
    }
  )
);

export const stateResponsive = style(
  media(
    { maxWidth: 768 },
    {
      bottom: 120
    }
  )
);

export const tractLegendClass = style({
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'rgba(255,255,255,0.7)',
  padding: 5,
  zIndex: 10,
  position: 'absolute',
  bottom: 0
});

export const tractLegendEntryClass = style({
  margin: 10
});

export const tractLegendEntryBlockClass = style({
  display: 'inline-block',
  width: 15,
  height: 15,
  marginBottom: -3
});

export const tractLegendEntryCircleClass = style({
  display: 'inline-block',
  width: 10,
  height: 10,
  borderRadius: '50%'
});

export const tractLegendEntryTextClass = style({
  marginLeft: 5
});
