import { media, style } from 'typestyle';
import { Colors } from '../colors';

export const selectClass = style({
  maxWidth: 200,
  width: '100%',
  display: 'block',
  margin: '0 auto',
  textAlignLast: 'center',
  background: Colors.SELECT_BACKGROUND,
  border: '1px solid ' + Colors.GRAY,
  cursor: 'pointer',
  fontSize: 14,
  height: 40
});

export const toolTipClass = style({
  position: 'fixed',
  display: 'inline-block',
  backgroundColor: Colors.INFO_BACKGROUND,
  padding: 15,
  border: '1px solid #ccc',
  zIndex: 10,
  fontFamily: 'Open Sans',
  fontSize: 14,
  pointerEvents: 'none'
});

export const tractTooltipClass = style(
  {
    width: 300
  },
  media(
    { maxWidth: 300 },
    {
      width: '100%'
    }
  )
);

export const mobileCloseClass = style({
  position: 'absolute',
  top: 10,
  right: 10,
  display: 'block',
  $nest: {
    '& svg': {
      width: 15,
      height: 15
    }
  }
});

export const tractRowClass = style({
  marginTop: 10
});
